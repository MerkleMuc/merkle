'use strict';
/* Minimaler Vorschau-Server für ./site — nur zur lokalen Abnahme. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, 'site');
const PORT = process.env.PORT || 4321;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
  '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(ROOT, url);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end('Forbidden'); return; }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) && fs.existsSync(file + '/index.html')) file = file + '/index.html';

  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    const nf = path.join(ROOT, '404.html');
    res.writeHead(404, { 'content-type': TYPES['.html'] });
    res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found');
    return;
  }

  const ext = path.extname(file).toLowerCase();
  const type = TYPES[ext] || 'application/octet-stream';

  /* Textformate komprimiert ausliefern — sonst misst Lighthouse zu pessimistisch. */
  const compressible = /^(text\/|application\/(json|xml|javascript)|image\/svg)/.test(type);
  const accept = String(req.headers['accept-encoding'] || '');
  let encoding = null;
  if (compressible && /\bbr\b/.test(accept)) encoding = 'br';
  else if (compressible && /\bgzip\b/.test(accept)) encoding = 'gzip';

  const headers = {
    'content-type': type,
    'cache-control': /\/assets\//.test(url) ? 'public, max-age=31536000, immutable' : 'no-cache',
    'vary': 'Accept-Encoding'
  };
  if (encoding) headers['content-encoding'] = encoding;

  res.writeHead(200, headers);
  const stream = fs.createReadStream(file);
  if (encoding === 'br') stream.pipe(zlib.createBrotliCompress()).pipe(res);
  else if (encoding === 'gzip') stream.pipe(zlib.createGzip()).pipe(res);
  else stream.pipe(res);
}).listen(PORT, () => console.log('Vorschau läuft auf http://localhost:' + PORT));
