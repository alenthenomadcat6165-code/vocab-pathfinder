const { askAI, checkAI, createPractice } = require('../ai-client');

function sendJson(res, status, data) {
  res.status(status).json(data);
}

function sendError(res, status, error, fallback) {
  console.error(error.fix || error.message || fallback);
  return sendJson(res, status, { error: { message: error.message || fallback, fix: error.fix || 'Try again later.' } });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const route = new URL(req.url, 'http://localhost').pathname;
  if (req.method === 'GET' && route === '/api/health') {
    const result = await checkAI();
    return sendJson(res, result.ok ? 200 : 503, result);
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (req.method === 'POST' && route === '/api/ai') {
      if (!body.message || typeof body.message !== 'string') return sendJson(res, 400, { error: 'Please send a learning question.' });
      return sendJson(res, 200, { answer: await askAI(body.message, String(body.context || ''), body.history || []) });
    }
    if (req.method === 'POST' && route === '/api/practice') {
      if (!body.level || !body.type) return sendJson(res, 400, { error: 'A level and practice type are needed.' });
      return sendJson(res, 200, await createPractice({ level: String(body.level), type: String(body.type), weakSkills: body.weakSkills || {} }));
    }
    return sendJson(res, 404, { error: 'Not found.' });
  } catch (error) {
    const status = error.code?.startsWith('KEYGEN_') || error.code === 'OPENAI_KEY_INVALID' ? 503 : 500;
    return sendError(res, status, error, 'The online AI could not answer.');
  }
};
