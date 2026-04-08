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
 *
 * Vercel auto-parses application/x-www-form-urlencoded into req.body.
 * The HTML bridge approach avoids cookie size limits and external storage.
 */
export function POST(req, res) {

  // req.body is auto-parsed by Vercel for application/x-www-form-urlencoded
  const data = req.body ?? {};

  // Safely embed the JSON into the page — JSON.stringify produces valid JS string literal.
  const json = JSON.stringify(JSON.stringify(data));

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Loading UWCPen…</title>
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
