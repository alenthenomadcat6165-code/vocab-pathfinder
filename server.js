const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { askAI, checkAI, createPractice } = require('./ai-client');

const PORT = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, 'public');

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': 'null' });
  res.end(JSON.stringify(data));
}

function sendError(res, status, error, fallback) {
  console.error(error.fix || error.message || fallback);
  return sendJson(res, status, { error: { message: error.message || fallback, fix: error.fix || 'Try again later.' } });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 100000) reject(new Error('Message is too large.'));
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function serveFile(req, res, pathname) {
  const requested = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.normalize(path.join(publicDir, requested));
  if (!filePath.startsWith(publicDir)) return sendJson(res, 404, { error: 'Not found.' });

  fs.readFile(filePath, (error, file) => {
    if (error) return sendJson(res, 404, { error: 'Page not found.' });
    const extension = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8'
    };
    res.writeHead(200, { 'Content-Type': contentTypes[extension] || 'application/octet-stream' });
    res.end(file);
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': 'null', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  if (req.method === 'GET' && requestUrl.pathname === '/api/health') {
    const result = await checkAI();
    return sendJson(res, result.ok ? 200 : 503, result);
  }

  if (req.method === 'POST' && requestUrl.pathname === '/api/ai') {
    try {
      const body = JSON.parse(await readBody(req));
      if (!body.message || typeof body.message !== 'string') {
        return sendJson(res, 400, { error: 'Please send a learning question.' });
      }
      const answer = await askAI(body.message, String(body.context || ''), body.history || []);
      return sendJson(res, 200, { answer });
    } catch (error) {
      const status = error.code?.startsWith('KEYGEN_') || error.code === 'OPENAI_KEY_INVALID' ? 503 : 500;
      return sendError(res, status, error, 'The learning guide could not answer.');
    }
  }

  if (req.method === 'POST' && requestUrl.pathname === '/api/practice') {
    try {
      const body = JSON.parse(await readBody(req));
      if (!body.level || !body.type) return sendJson(res, 400, { error: 'A level and practice type are needed.' });
      const practice = await createPractice({ level: String(body.level), type: String(body.type), weakSkills: body.weakSkills || {} });
      return sendJson(res, 200, practice);
    } catch (error) {
      const status = error.code?.startsWith('KEYGEN_') || error.code === 'OPENAI_KEY_INVALID' ? 503 : 500;
      return sendError(res, status, error, 'The AI could not create practice.');
    }
  }

  if (req.method === 'GET') return serveFile(req, res, requestUrl.pathname);
  sendJson(res, 405, { error: 'Method not allowed.' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Vocab Pathfinder is ready at http://127.0.0.1:${PORT}`);
});
