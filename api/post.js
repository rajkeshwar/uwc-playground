/**
 * Vercel serverless function — handles cross-origin form POST to /.
 *
 * Vercel's static file server returns 405 for POST requests. The service worker
 * also cannot intercept a cross-origin form POST navigation on the first visit
 * (the SW isn't controlling the new tab yet). This function fills that gap:
 *
 *   remote.html  →  POST /  →  api/post  →  HTML bridge page
 *                                            (stores data in sessionStorage)
 *                                            →  window.location.replace('/')
 *                                            →  playground reads sessionStorage
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed');
    return;
  }

  // Read and parse the raw body — Vercel does NOT auto-parse
  // application/x-www-form-urlencoded for plain API functions.
  const raw = await readBody(req);
  const ct  = (req.headers['content-type'] || '').toLowerCase();

  let data = {};
  try {
    if (ct.includes('application/json')) {
      data = JSON.parse(raw);
    } else {
      // application/x-www-form-urlencoded (default HTML form encoding)
      data = Object.fromEntries(new URLSearchParams(raw).entries());
    }
  } catch {
    // malformed body — proceed with empty data so redirect still works
  }

  // Safely embed the JSON into the page — JSON.stringify produces valid JS string literal.
  const json = JSON.stringify(JSON.stringify(data));

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Loading UWCPen\u2026</title>
</head>
<body>
<script>
try {
  sessionStorage.setItem('uwcpen_post', ${json});
} catch (e) {
  // sessionStorage unavailable — playground will load with default content
}
window.location.replace('/');
</script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(html);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(Buffer.from(chunk)));
    req.on('end',  ()    => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
