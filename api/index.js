const fs = require('fs');
const path = require('path');

const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const brief = fs.readFileSync(path.join(__dirname, '..', 'BRIEF.md'), 'utf8');

function sendJson(res, status, data) {
  res.status(status).json(data);
}

function openAiError(message, code = 'OPENAI_ERROR') {
  const error = new Error(message);
  error.code = code;
  return error;
}

async function askOpenAI(message, context = '', history = [], json = false) {
  if (!process.env.OPENAI_API_KEY) throw openAiError('The online AI is not configured yet. Add OPENAI_API_KEY in Vercel project settings.', 'OPENAI_KEY_MISSING');
  const safeHistory = Array.isArray(history) ? history.slice(-8).filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string') : [];
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions: `${brief}\n\nYou are the Vocab Pathfinder assistant. Be kind, concise, specific, and age-appropriate. You can explain learning topics, answer website-use questions, and answer harmless general questions. Never request private identifying information. ${context ? `Stay connected to this learning context:\n${context}` : ''}`,
      input: [...safeHistory, { role: 'user', content: message }],
      ...(json ? { text: { format: { type: 'json_object' } } } : {})
    }),
    signal: AbortSignal.timeout(60000)
  });
  if (!response.ok) {
    if (response.status === 401) throw openAiError('The online AI key was rejected. Check OPENAI_API_KEY in Vercel.', 'OPENAI_KEY_INVALID');
    throw openAiError('The online AI could not answer right now. Try again in a moment.');
  }
  const data = await response.json();
  return data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text || '').join('') || '';
}

function fallbackPractice(weakSkills = {}, type = 'mixed') {
  if (type === 'reading') return [
    { skill: 'Reading', prompt: 'Where did Maya find the notebook?', choices: ['Beneath a bench at the library.', 'Inside a classroom desk.', 'Under a tree at home.', 'Beside a bus stop.'], answer: 0, explanation: 'The passage says Maya found it beneath a bench at the library.' },
    { skill: 'Reading', prompt: 'What did Maya read on the first page?', choices: ['A recipe.', 'A name.', 'A map.', 'A poem.'], answer: 1, explanation: 'Maya read the name written on the first page.' },
    { skill: 'Reading', prompt: 'Why did Maya carry the notebook to the front desk?', choices: ['She wanted to borrow it.', 'She wanted to draw in it.', 'She wanted to help return it.', 'She wanted to hide it.'], answer: 2, explanation: 'Taking it to the front desk helped the notebook reach its owner.' },
    { skill: 'Reading', prompt: 'What did the librarian do with the notebook?', choices: ['Placed it in a safe drawer.', 'Threw it away.', 'Took it home.', 'Gave it to Maya.'], answer: 0, explanation: 'The librarian placed it in a safe drawer.' },
    { skill: 'Reading', prompt: 'What can the reader infer about Maya?', choices: ['She is careless with other people’s things.', 'She makes a thoughtful choice.', 'She dislikes libraries.', 'She was looking for a notebook to buy.'], answer: 1, explanation: 'Maya made a careful choice by returning the lost notebook.' },
    { skill: 'Reading', prompt: 'What is the main idea of the passage?', choices: ['A library is always crowded.', 'A careful action can help someone.', 'Notebooks are difficult to read.', 'Maya wants to work at the library.'], answer: 1, explanation: 'The passage is mainly about Maya helping someone by returning a lost belonging.' }
  ];
  const questions = [
    { skill: 'Vocabulary', prompt: 'In the sentence “The narrow path was difficult to cross,” what does “narrow” mean?', choices: ['Not wide', 'Very bright', 'Easy to find', 'Full of water'], answer: 0, explanation: 'Narrow means not wide, which fits the description of the path.' },
    { skill: 'Reading', prompt: 'Maya packed a flashlight before entering the shed. What can the reader infer?', choices: ['The shed may be dark.', 'Maya planned to paint.', 'The shed was full of food.', 'Maya was going swimming.'], answer: 0, explanation: 'A flashlight helps someone see in a dark place.' },
    { skill: 'Grammar', prompt: 'Which sentence has the correct subject-verb agreement?', choices: ['The group of hikers walks slowly.', 'The group of hikers walk slowly.', 'The group hikers walking slowly.', 'The group of hikers are walks slowly.'], answer: 0, explanation: 'The subject “group” is singular, so “walks” is correct.' },
    { skill: 'Spelling', prompt: 'Which word completes the sentence? “The scientist recorded the careful ___.”', choices: ['measurement', 'measurment', 'measurmentt', 'measurmentes'], answer: 0, explanation: 'Measurement is the correctly spelled word.' },
    { skill: 'Reading', prompt: 'A character checks the bus schedule twice before leaving. What does this detail show?', choices: ['The character wants to avoid missing the bus.', 'The character dislikes reading.', 'The bus has already left.', 'The schedule is a storybook.'], answer: 0, explanation: 'Checking the schedule helps the character plan the trip.' },
    { skill: 'Vocabulary', prompt: 'Which sentence uses “fortunate” in a way that shows its meaning?', choices: ['It was fortunate that the rain stopped before the game.', 'The fortunate pencil was placed under the desk.', 'He fortunate the answer on the page.', 'The word fortunate means extremely noisy.'], answer: 0, explanation: 'Fortunate means lucky, and the sentence describes a lucky event.' }
  ];
  const focus = Object.entries(weakSkills).sort((a, b) => Number(b[1]) - Number(a[1]))[0]?.[0];
  const focused = focus ? questions.filter((question) => question.skill.toLowerCase().includes(focus.toLowerCase())) : [];
  return [...focused, ...questions.filter((question) => !focused.includes(question))].slice(0, 6);
}

function shuffleQuestions(questions) {
  return questions.map((question, index) => {
    const shift = (index + 1) % question.choices.length;
    return { ...question, choices: question.choices.slice(shift).concat(question.choices.slice(0, shift)), answer: (question.answer - shift + question.choices.length) % question.choices.length };
  });
}

async function createPractice({ level, type, weakSkills = {} }) {
  const focus = type === 'reading' ? 'reading comprehension using one short passage' : type === 'vocabulary' ? 'vocabulary meaning and context' : 'a balanced mix of vocabulary, spelling, grammar, and reading';
  const weakFocus = Object.entries(weakSkills).filter(([, score]) => Number(score) > 0).sort((a, b) => Number(b[1]) - Number(a[1])).map(([skill, count]) => `${skill} (${count} missed)`).join(', ');
  const target = weakFocus ? `The student has struggled most with ${weakFocus}. Include at least 3 questions about the most-missed skill.` : 'Spread questions across relevant skills.';
  const prompt = `Create exactly 6 different ${focus} multiple-choice problems for a middle-school student at the English level “${level}”. Make them feel like real questions from a thoughtful school workbook: use short situations, context clues, sentence editing, inference, or a meaningful passage instead of repeated definitions. All four choices must be distinct and plausible. ${target} Return ONLY JSON with this shape: {"title":"short title","passage":"optional passage","questions":[{"skill":"Vocabulary|Grammar|Reading|Spelling","prompt":"question","choices":["choice 1","choice 2","choice 3","choice 4"],"answer":0,"explanation":"short explanation"}]}. The answer must be a number from 0 to 3. Do not use markdown or ask for typed responses.`;
  try {
    const raw = await askOpenAI(prompt, '', [], true);
    const parsed = JSON.parse(raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim());
    if (!Array.isArray(parsed.questions) || parsed.questions.length < 6) throw new Error('not enough questions');
    const questions = parsed.questions.slice(0, 6).map((question) => ({
      skill: String(question.skill || 'General English'),
      prompt: String(question.prompt || 'Choose the best answer.'),
      choices: Array.isArray(question.choices) ? question.choices.slice(0, 4).map((choice) => typeof choice === 'object' ? String(choice.option || choice.text || choice.label || choice.value || '') : String(choice)) : [],
      answer: Number(question.answer),
      explanation: String(question.explanation || 'Review the answer and try the next question.')
    }));
    if (questions.some((question) => question.choices.length !== 4 || question.answer < 0 || question.answer > 3)) throw new Error('incomplete question');
    return { title: String(parsed.title || 'Your next practice'), passage: String(parsed.passage || ''), questions: shuffleQuestions(questions), model: OPENAI_MODEL };
  } catch (error) {
    if (error.code === 'OPENAI_KEY_MISSING' || error.code === 'OPENAI_KEY_INVALID') throw error;
    return { title: 'Practice set', passage: type === 'reading' ? 'Maya found a small notebook beneath a bench at the library. She read the name on the first page and carried the notebook to the front desk. The librarian thanked Maya and placed it in a safe drawer. Maya felt glad that a careful choice had helped someone find a lost belonging.' : '', questions: shuffleQuestions(fallbackPractice(weakSkills, type)), model: OPENAI_MODEL, fallback: true };
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  const route = new URL(req.url, 'http://localhost').pathname;
  if (req.method === 'GET' && route === '/api/health') return sendJson(res, 200, { ok: Boolean(process.env.OPENAI_API_KEY), provider: 'OpenAI', model: OPENAI_MODEL, error: process.env.OPENAI_API_KEY ? undefined : 'Add OPENAI_API_KEY in Vercel project settings.' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (req.method === 'POST' && route === '/api/ai') {
      if (!body.message || typeof body.message !== 'string') return sendJson(res, 400, { error: 'Please send a learning question.' });
      return sendJson(res, 200, { answer: await askOpenAI(body.message, String(body.context || ''), body.history || []) });
    }
    if (req.method === 'POST' && route === '/api/practice') {
      if (!body.level || !body.type) return sendJson(res, 400, { error: 'A level and practice type are needed.' });
      return sendJson(res, 200, await createPractice({ level: String(body.level), type: String(body.type), weakSkills: body.weakSkills || {} }));
    }
    return sendJson(res, 404, { error: 'Not found.' });
  } catch (error) {
    const status = error.code === 'OPENAI_KEY_MISSING' ? 503 : error.code === 'OPENAI_KEY_INVALID' ? 401 : 500;
    return sendJson(res, status, { error: error.message || 'The online AI could not answer.' });
  }
};
