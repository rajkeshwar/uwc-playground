/**
 * UWCPen Service Worker
 * Intercepts POST requests to the playground root, extracts multipart/form-data,
 * stores it in Cache Storage as a synthetic JSON response, then redirects to GET /.
 * The page reads the stored data on load via a dedicated /__uwc_post_data__ fetch.
 */

const CACHE  = 'uwcpen-post-v1';
const STORE_URL = '/__uwc_post_data__';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // ── Serve stored POST data to the app ────────────────────────────────────
  if (request.method === 'GET' && url.pathname === STORE_URL) {
    event.respondWith(
      caches.open(CACHE).then(cache => cache.match(STORE_URL))
        .then(r => r ?? new Response('null', { headers: { 'Content-Type': 'application/json' } }))
    );
    return;
  }

  // ── Intercept POST to root ────────────────────────────────────────────────
  if (request.method === 'POST' && (url.pathname === '/' || url.pathname === '')) {
    event.respondWith(handlePost(request));
    return;
  }
});

async function handlePost(request) {
  try {
    const formData = await request.formData();
    const data = {};

    // Extract all form fields
    for (const [key, value] of formData.entries()) {
      data[key] = value instanceof File ? await value.text() : value;
    }

    // Store in cache so the page can read it
    const cache = await caches.open(CACHE);
    await cache.put(
      STORE_URL,
      new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      })
    );

    // Redirect to the app
    return Response.redirect('/', 302);
  } catch (err) {
    return new Response('Service Worker error: ' + err.message, { status: 500 });
  }
}
