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

const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gemma3:1b';
const brief = fs.readFileSync(path.join(__dirname, 'BRIEF.md'), 'utf8');

async function ollamaRequest(endpoint, options = {}) {
  try {
    return await fetch(`${OLLAMA_BASE_URL}${endpoint}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      signal: AbortSignal.timeout(90000)
    });
  } catch (error) {
    const offline = new Error('Ollama is not running. Start Ollama, then try again.');
    offline.code = 'OLLAMA_OFFLINE';
    throw offline;
  }
}

async function checkOllama() {
  try {
    const response = await ollamaRequest('/api/tags');
    if (!response.ok) return { ok: false, error: 'Ollama is not responding. Start Ollama, then refresh this page.' };
    const data = await response.json();
    const models = (data.models || []).map((model) => model.name);
    const hasModel = models.some((name) => name === OLLAMA_MODEL || name.startsWith(`${OLLAMA_MODEL}:`));
    return {
      ok: hasModel,
      model: OLLAMA_MODEL,
      models,
      error: hasModel ? undefined : `The ${OLLAMA_MODEL} model is not installed. Run: ollama pull ${OLLAMA_MODEL}`
    };
  } catch (error) {
    return { ok: false, model: OLLAMA_MODEL, error: error.message };
  }
}

async function askOllama(userMessage, context = '', history = [], formatJson = false) {
  const safeHistory = Array.isArray(history) ? history.slice(-8).filter((message) => message && (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string') : [];
  const response = await ollamaRequest('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      ...(formatJson ? { format: 'json' } : {}),
      messages: [
        { role: 'system', content: `${brief}\n\nYou are the Vocab Pathfinder assistant. You can explain learning topics, answer questions about how to use the website, and answer other harmless questions like a general assistant. Be kind, concise, specific, and age-appropriate. Never request private identifying information.` },
        ...safeHistory,
        { role: 'system', content: context ? `Stay connected to this active learning context:\n${context}\nAnswer the student's latest message about this context. If they ask for a hint, do not reveal the answer immediately.` : 'Keep the conversation connected to the student’s latest learning question.' },
        { role: 'user', content: userMessage }
      ]
    })
  });
  if (!response.ok) {
    const error = new Error(response.status === 404
      ? `The ${OLLAMA_MODEL} model is not installed. Run: ollama pull ${OLLAMA_MODEL}`
      : 'Ollama could not answer right now. Check that Ollama is running and try again.');
    error.code = response.status === 404 ? 'OLLAMA_MODEL_MISSING' : 'OLLAMA_ERROR';
    throw error;
  }
  const data = await response.json();
  return data.message?.content || 'I could not make a helpful answer this time. Let’s try again.';
}

function fallbackPractice(weakSkills = {}) {
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
  const retryPrompt = `Return a JSON object with exactly 6 different workbook-style questions now. Each question must have a skill, prompt, exactly 4 distinct choices, a numeric answer from 0 to 3, and a short explanation. Topic: ${focus}. Student level: ${level}. ${targetedInstruction}`;
  let lastError;
  for (const request of [prompt, retryPrompt]) {
    try {
      const raw = await askOllama(request, '', [], true);
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
      return { title: String(practice.title || 'Your next practice'), passage: String(practice.passage || ''), questions: practice.questions, model: OLLAMA_MODEL };
    } catch (error) {
      lastError = error;
    }
  }
  if (lastError?.code !== 'OLLAMA_OFFLINE') return { title: 'Practice set', passage: '', questions: fallbackPractice(weakSkills).map((question, index) => { const shift = (index + 1) % question.choices.length; return { ...question, choices: question.choices.slice(shift).concat(question.choices.slice(0, shift)), answer: (question.answer - shift + question.choices.length) % question.choices.length }; }), model: OLLAMA_MODEL, fallback: true };
  const error = new Error(lastError.message);
  error.code = lastError?.code || 'OLLAMA_BAD_PRACTICE';
  throw error;
}

module.exports = { askOllama, checkOllama, createPractice };
