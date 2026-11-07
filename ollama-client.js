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

async function askOllama(userMessage) {
  const response = await ollamaRequest('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      messages: [
        { role: 'system', content: `${brief}\n\nYou are the Vocab Pathfinder learning guide. Be kind, concise, specific, and age-appropriate. Never request private identifying information.` },
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

module.exports = { askOllama, checkOllama };
