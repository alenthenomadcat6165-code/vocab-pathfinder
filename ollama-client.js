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
      signal: AbortSignal.timeout(30000)
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
        { role: 'system', content: `${brief}\n\nYou are the Vocab Pathfinder learning guide. Be kind, concise, specific, and age-appropriate. Never request private identifying information.` },
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

async function createPractice({ level, type }) {
  const focus = type === 'reading' ? 'reading comprehension using one short passage' : type === 'vocabulary' ? 'vocabulary meaning and context' : 'a balanced mix of vocabulary, spelling, grammar, and reading';
  const prompt = `Create exactly 6 ${focus} multiple-choice problems for a middle-school student at the estimated English level “${level}”. Return ONLY valid JSON with this shape: {"title":"short title","passage":"optional short passage, empty string if not needed","questions":[{"prompt":"question","choices":["choice 1","choice 2","choice 3","choice 4"],"answer":0,"explanation":"short kind explanation"}]}. The answer must be a number from 0 to 3. Make every question clear, age-appropriate, specific, and different. Do not ask the student to type a response. Do not include markdown fences or any text outside the JSON.`;
  const retryPrompt = `Return a JSON object with exactly 6 questions now. Each question must have a prompt, exactly 4 choices, a numeric answer from 0 to 3, and a short explanation. Topic: ${focus}. Student level: ${level}.`;
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
        prompt: String(question.prompt || 'Choose the best answer.'),
        choices: Array.isArray(question.choices) ? question.choices.slice(0, 4).map(String) : [],
        answer: Number(question.answer),
        explanation: String(question.explanation || 'Nice effort. Review the answer and try the next one.')
      }));
      if (practice.questions.some((question) => question.choices.length !== 4 || question.answer < 0 || question.answer > 3)) throw new Error('incomplete question');
      return { title: String(practice.title || 'Your next practice'), passage: String(practice.passage || ''), questions: practice.questions, model: OLLAMA_MODEL };
    } catch (error) {
      lastError = error;
    }
  }
  const error = new Error(lastError?.code === 'OLLAMA_OFFLINE' ? lastError.message : 'The local AI did not create six usable questions. Try generating the practice again.');
  error.code = lastError?.code || 'OLLAMA_BAD_PRACTICE';
  throw error;
}

module.exports = { askOllama, checkOllama, createPractice };
