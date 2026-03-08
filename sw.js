/**
 * UWCPen Service Worker — POST interception
 * Intercepts form POST to /, stores data in Cache Storage as JSON,
 * then redirects to GET /. The app reads it via /__uwcpen_post__.
 *
 * POST form schema (multipart/form-data or application/x-www-form-urlencoded):
 *   lit_typescript      — TypeScript source for Lit
 *   lit_scss            — SCSS source for Lit
 *   react_typescript    — TypeScript source for React
 *   react_scss          — SCSS source for React
 *   vue_typescript      — TypeScript source for Vue
 *   vue_scss            — SCSS source for Vue
 *   angular_typescript  — TypeScript source for Angular
 *   angular_scss        — SCSS source for Angular
 *   lit_importmap       — Custom import map JSON for Lit (optional)
 *   react_importmap     — Custom import map JSON for React (optional)
 *   vue_importmap       — Custom import map JSON for Vue (optional)
 *   angular_importmap   — Custom import map JSON for Angular (optional)
 *   framework           — Initial active framework: lit | react | vue | angular
 *   view                — Initial layout: columns | split-left | split-right | editor-only | output-only
 */

const STORE_KEY = '/__uwcpen_post__';
const CACHE     = 'uwcpen-post-v1';

self.addEventListener('install',  () => self.skipWaiting());
self.addEventListener('activate', e  => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Serve stored POST data back to the app
  if (request.method === 'GET' && url.pathname === STORE_KEY) {
    event.respondWith(
      caches.open(CACHE)
        .then(c => c.match(STORE_KEY))
        .then(r => r ?? new Response('null', { headers: { 'Content-Type': 'application/json' } }))
    );
    return;
  }

  // Intercept POST to root
  if (request.method === 'POST' && (url.pathname === '/' || url.pathname === '')) {
    event.respondWith(handlePost(event, request));
    return;
  }
});

async function handlePost(event, request) {
  try {
    const data = {};
    const ct = request.headers.get('content-type') || '';

    if (ct.includes('multipart/form-data') || ct.includes('application/x-www-form-urlencoded')) {
      const form = await request.formData();
      for (const [k, v] of form.entries()) {
        data[k] = v instanceof File ? await v.text() : v;
      }
    } else if (ct.includes('application/json')) {
      Object.assign(data, await request.json());
    }

    const cache = await caches.open(CACHE);
    await cache.put(STORE_KEY, new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    }));

    return Response.redirect(new URL('/', request.url).href, 302);
  } catch (err) {
    return new Response('UWCPen SW error: ' + err.message, { status: 500 });
  }
}
