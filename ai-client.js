const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

loadEnv();

const KEYGEN_URL = (process.env.KEYGEN_URL || '').replace(/\/$/, '');
const KEYGEN_TOKEN = process.env.KEYGEN_TOKEN || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const brief = fs.readFileSync(path.join(__dirname, 'BRIEF.md'), 'utf8');
let cachedKey;
let cachedExpiresAt = 0;

function keygenError(message, fix, code = 'KEYGEN_ERROR') {
  const error = new Error(message);
  error.fix = fix;
  error.code = code;
  return error;
}

async function getKey() {
  if (cachedKey && Date.now() < cachedExpiresAt) return cachedKey;
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'paste-here') {
    cachedKey = process.env.OPENAI_API_KEY;
    cachedExpiresAt = Number.MAX_SAFE_INTEGER;
    return cachedKey;
  }
  if (!KEYGEN_URL || !KEYGEN_TOKEN || KEYGEN_URL === 'paste-here' || KEYGEN_TOKEN === 'paste-here') {
    throw keygenError('The AI key service is not configured.', 'Add KEYGEN_URL and KEYGEN_TOKEN to the server .env file.', 'KEYGEN_CONFIG_MISSING');
  }
  try {
    const response = await fetch(`${KEYGEN_URL}/api/lookup-key`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${KEYGEN_TOKEN}` },
      body: '{}',
      signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) throw keygenError(`The AI key service returned HTTP ${response.status}.`, 'Check KEYGEN_URL, KEYGEN_TOKEN, and the MindDo key service.', 'KEYGEN_UNAVAILABLE');
    const data = await response.json();
    const expiresAt = Date.parse(data.expiresAt);
    if (typeof data.apiKey !== 'string' || !data.apiKey || !Number.isFinite(expiresAt)) {
      throw keygenError('The AI key service returned an invalid key response.', 'MindDo must return JSON with apiKey and expiresAt.', 'KEYGEN_BAD_RESPONSE');
    }
    cachedKey = data.apiKey;
    cachedExpiresAt = expiresAt;
    return cachedKey;
  } catch (error) {
    if (error.code?.startsWith('KEYGEN_')) throw error;
    throw keygenError('The AI key service could not be reached.', 'Check your internet connection and KEYGEN_URL.', 'KEYGEN_OFFLINE');
  }
}

async function callOpenAI(apiKey, message, context, history, formatJson) {
  const safeHistory = Array.isArray(history) ? history.slice(-8).filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string') : [];
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions: `${brief}\n\nYou are the Vocab Pathfinder assistant. You can explain learning topics, answer questions about how to use the website, and answer other harmless questions like a general assistant. Be kind, concise, specific, and age-appropriate. Never request private identifying information. ${context ? `Stay connected to this active learning context:\n${context}` : ''}`,
      input: [...safeHistory, { role: 'user', content: message }],
      ...(formatJson ? { text: { format: { type: 'json_object' } } } : {})
    }),
    signal: AbortSignal.timeout(60000)
  });
  if (!response.ok) {
    if (response.status === 401) throw keygenError('OpenAI rejected the AI key.', 'The key will be refreshed from MindDo once, then try your request again.', 'OPENAI_KEY_INVALID');
    throw keygenError('The online AI could not answer right now.', 'Try again in a moment and check the server logs if it continues.', 'OPENAI_ERROR');
  }
  const data = await response.json();
  return data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text || '').join('') || '';
}

async function openAiRequest(message, context = '', history = [], formatJson = false) {
  let apiKey = await getKey();
  try {
    return await callOpenAI(apiKey, message, context, history, formatJson);
  } catch (error) {
    if (error.code !== 'OPENAI_KEY_INVALID') throw error;
    cachedKey = undefined;
    cachedExpiresAt = 0;
    apiKey = await getKey();
    return callOpenAI(apiKey, message, context, history, formatJson);
  }
}

async function checkAI() {
  try {
    await getKey();
    return {
      ok: true,
      provider: 'OpenAI via key generator',
      model: OPENAI_MODEL
    };
  } catch (error) {
    console.error(error.fix || error.message);
    return { ok: false, provider: 'OpenAI via key generator', model: OPENAI_MODEL, error: { message: error.message, fix: error.fix }, code: error.code };
  }
}

const askAI = openAiRequest;

function fallbackPractice(weakSkills = {}, type = 'mixed') {
  if (type === 'reading') return [
    { skill: 'Reading', prompt: 'Where did Maya find the notebook?', choices: ['Beneath a bench at the library.', 'Inside a classroom desk.', 'Under a tree at home.', 'Beside a bus stop.'], answer: 0, explanation: 'The passage says Maya found it beneath a bench at the library.' },
    { skill: 'Reading', prompt: 'What did Maya read on the first page?', choices: ['A recipe.', 'A name.', 'A map.', 'A poem.'], answer: 1, explanation: 'Maya read the name written on the first page.' },
    { skill: 'Reading', prompt: 'Why did Maya carry the notebook to the front desk?', choices: ['She wanted to borrow it.', 'She wanted to draw in it.', 'She wanted to help return it.', 'She wanted to hide it.'], answer: 2, explanation: 'Taking it to the front desk helped the notebook reach its owner.' },
    { skill: 'Reading', prompt: 'What did the librarian do with the notebook?', choices: ['Placed it in a safe drawer.', 'Threw it away.', 'Took it home.', 'Gave it to Maya.'], answer: 0, explanation: 'The librarian placed it in a safe drawer.' },
    { skill: 'Reading', prompt: 'What can the reader infer about Maya?', choices: ['She is careless with other people’s things.', 'She makes a thoughtful choice.', 'She dislikes libraries.', 'She was looking for a notebook to buy.'], answer: 1, explanation: 'Maya made a careful choice by returning the lost notebook.' },
    { skill: 'Reading', prompt: 'What is the main idea of the passage?', choices: ['A library is always crowded.', 'A careful action can help someone.', 'Notebooks are difficult to read.', 'Maya wants to work at the library.'], answer: 1, explanation: 'The passage is mainly about Maya helping someone by returning a lost belonging.' }
  ];
  const focus = Object.entries(weakSkills).sort((a, b) => Number(b[1]) - Number(a[1]))[0]?.[0];
  const questions = [
    { skill: 'Vocabulary', prompt: 'In the sentence “The narrow path was difficult to cross,” what does “narrow” mean?', choices: ['Not wide', 'Very bright', 'Easy to find', 'Full of water'], answer: 0, explanation: 'Narrow means not wide, which fits the description of the path.' },
    { skill: 'Reading', prompt: 'Maya packed a flashlight before entering the shed. What can the reader infer?', choices: ['The shed may be dark.', 'Maya planned to paint.', 'The shed was full of food.', 'Maya was going swimming.'], answer: 0, explanation: 'A flashlight helps someone see in a dark place.' },
    { skill: 'Grammar', prompt: 'Which sentence has the correct subject-verb agreement?', choices: ['The group of hikers walks slowly.', 'The group of hikers walk slowly.', 'The group hikers walking slowly.', 'The group of hikers are walks slowly.'], answer: 0, explanation: 'The subject “group” is singular, so “walks” is correct.' },
    { skill: 'Spelling', prompt: 'Which word completes the sentence? “The scientist recorded the careful ___.”', choices: ['measurement', 'measurment', 'measurmentt', 'measurmentes'], answer: 0, explanation: 'Measurement is the correctly spelled word.' },
    { skill: 'Reading', prompt: 'A character checks the bus schedule twice before leaving. What does this detail show?', choices: ['The character wants to avoid missing the bus.', 'The character dislikes reading.', 'The bus has already left.', 'The schedule is a storybook.'], answer: 0, explanation: 'Checking the schedule helps the character plan the trip.' },
    { skill: 'Vocabulary', prompt: 'Which sentence uses “fortunate” in a way that shows its meaning?', choices: ['It was fortunate that the rain stopped before the game.', 'The fortunate pencil was placed under the desk.', 'He fortunate the answer on the page.', 'The word fortunate means extremely noisy.'], answer: 0, explanation: 'Fortunate means lucky, and the sentence describes a lucky event.' }
  ];
  if (!focus) return questions;
  const focused = questions.filter((question) => question.skill.toLowerCase().includes(focus.toLowerCase()));
  return [...focused, ...questions.filter((question) => !focused.includes(question))].slice(0, 6);
}

async function createPractice({ level, type, weakSkills = {} }) {
  const focus = type === 'reading' ? 'reading comprehension using one short passage' : type === 'vocabulary' ? 'vocabulary meaning and context' : 'a balanced mix of vocabulary, spelling, grammar, and reading';
  const weakFocus = Object.entries(weakSkills).filter(([, score]) => Number(score) > 0).sort((a, b) => Number(b[1]) - Number(a[1])).map(([skill, count]) => `${skill} (${count} missed)`).join(', ');
  const targetedInstruction = weakFocus ? `The student has struggled most with ${weakFocus}. Include at least 3 of the 6 questions about the most-missed skill, while still keeping the set varied.` : 'Spread the questions across the relevant skills.';
  const prompt = `Create exactly 6 ${focus} multiple-choice problems for a middle-school student at the estimated English level “${level}”. These should feel like real questions from a thoughtful school workbook: use short passages, clear situations, sentence editing, inference, context clues, or meaningful examples instead of repeated definitions. Every question must test a different idea, and all four choices must be plausible but clearly different; never repeat a choice or make two choices nearly identical. ${targetedInstruction} Return ONLY valid JSON with this shape: {"title":"short title","passage":"optional short passage, empty string if not needed","questions":[{"skill":"Vocabulary|Grammar|Reading|Spelling","prompt":"question","choices":["choice 1","choice 2","choice 3","choice 4"],"answer":0,"explanation":"short kind explanation"}]}. The answer must be a number from 0 to 3. Do not ask the student to type a response. Do not include markdown fences or any text outside the JSON.`;
  let lastError;
  for (const request of [prompt]) {
    try {
      const raw = await askAI(request, '', [], true);
      const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      const jsonText = firstBrace >= 0 && lastBrace > firstBrace ? cleaned.slice(firstBrace, lastBrace + 1) : cleaned;
      const practice = JSON.parse(jsonText);
      if (!practice || !Array.isArray(practice.questions) || practice.questions.length < 6) throw new Error('not enough questions');
      practice.questions = practice.questions.slice(0, 6).map((question) => ({
        skill: String(question.skill || (type === 'vocabulary' ? 'Vocabulary' : type === 'reading' ? 'Reading' : 'General English')),
        prompt: String(question.prompt || 'Choose the best answer.'),
        choices: Array.isArray(question.choices) ? question.choices.slice(0, 4).map((choice) => typeof choice === 'object' ? String(choice.option || choice.text || choice.label || choice.value || '') : String(choice)) : [],
        answer: Number(question.answer),
        explanation: String(question.explanation || 'Nice effort. Review the answer and try the next one.')
      }));
      if (practice.questions.some((question) => question.choices.length !== 4 || question.answer < 0 || question.answer > 3)) throw new Error('incomplete question');
      practice.questions = practice.questions.map((question, index) => {
        const shift = (index + 1) % question.choices.length;
        return { ...question, choices: question.choices.slice(shift).concat(question.choices.slice(0, shift)), answer: (question.answer - shift + question.choices.length) % question.choices.length };
      });
      return { title: String(practice.title || 'Your next practice'), passage: String(practice.passage || ''), questions: practice.questions, model: OPENAI_MODEL };
    } catch (error) {
      lastError = error;
    }
  }
  if (!lastError?.code?.startsWith('KEYGEN_') && lastError?.code !== 'OPENAI_KEY_INVALID') return { title: 'Practice set', passage: type === 'reading' ? 'Maya found a small notebook beneath a bench at the library. She read the name on the first page and carried the notebook to the front desk. The librarian thanked Maya and placed it in a safe drawer. Maya felt glad that a careful choice had helped someone find a lost belonging.' : '', questions: fallbackPractice(weakSkills, type).map((question, index) => { const shift = (index + 1) % question.choices.length; return { ...question, choices: question.choices.slice(shift).concat(question.choices.slice(0, shift)), answer: (question.answer - shift + question.choices.length) % question.choices.length }; }), model: OPENAI_MODEL, fallback: true };
  const error = new Error(lastError.message);
  error.code = lastError?.code || 'AI_BAD_PRACTICE';
  throw error;
}

module.exports = { askAI, checkAI, createPractice, getKey };
