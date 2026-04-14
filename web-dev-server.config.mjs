import { esbuildPlugin } from '@web/dev-server-esbuild';
import { readFile } from 'fs/promises';
import path from 'path';

/**
 * In-memory store for the most recent POST payload.
 * Cleared after being read once so a page refresh doesn't re-apply old data.
 * The Service Worker handles this path in production; this middleware fills
 * the same role during local development (including cross-origin POSTs from
 * remote.html running on a different port).
 */
let postStore = null;

/** Read the raw request body as a UTF-8 string. */
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(Buffer.from(chunk)));
    req.on('end',  ()    => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

export default {
  port: 8080,
  open: true,
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      tsconfig: './tsconfig.json',
      target: 'auto',
    }),
  ],
  middleware: [
    // ── Serve files from public/ directory ───────────────────────────────────
    async function publicDirMiddleware(ctx, next) {
      await next();
      if (ctx.status === 404) {
        const filePath = path.join(process.cwd(), 'public', ctx.path);
        try {
          ctx.body = await readFile(filePath);
          ctx.status = 200;
          // let koa set the type from the extension
          ctx.type = path.extname(ctx.path).slice(1) || 'bin';
        } catch {
          // not in public/ either — leave 404
        }
      }
    },

    // ── Serve assets/js/ vendor files directly (bypass nodeResolve) ──────────
    // Vendor bundles like uwc.bundle.react.js contain bare specifiers (e.g.
    // @lit/react) that are resolved at runtime via the browser importmap.
    // nodeResolve would try to rewrite them to node_modules paths, which fails
    // because these packages are not installed locally.
    async function vendorAssetsMiddleware(ctx, next) {
      if (ctx.path.startsWith('/assets/js/') && ctx.path.endsWith('.js')) {
        try {
          const filePath = path.join(process.cwd(), ctx.path);
          ctx.body = await readFile(filePath, 'utf8');
          ctx.type = 'application/javascript';
          ctx.set('Cache-Control', 'no-store');
          return;
        } catch {
          // file not found — fall through to normal handling
        }
      }
      return next();
    },

    // ── Serve sw.js from project root with no-cache headers ──────────────────
    function swMiddleware(ctx, next) {
      if (ctx.path === '/sw.js') {
        ctx.set('Service-Worker-Allowed', '/');
        ctx.set('Cache-Control', 'no-store');
      }
      return next();
    },

    // ── Handle POST to root ───────────────────────────────────────────────────
    // Parses the form body, stores it in postStore, then redirects to GET /.
    // Works for both same-origin navigation and cross-origin form POSTs (e.g.
    // from remote.html running on a different port).
    async function postMiddleware(ctx, next) {
      if (ctx.method === 'POST' && (ctx.path === '/' || ctx.path === '')) {
        try {
          const body = await readBody(ctx.req);
          const ct   = (ctx.get('content-type') || '').toLowerCase();

          if (ct.includes('application/json')) {
            postStore = JSON.parse(body);
          } else {
            // application/x-www-form-urlencoded (default HTML form encoding)
            postStore = Object.fromEntries(new URLSearchParams(body).entries());
          }
        } catch (e) {
          console.warn('[dev] Failed to parse POST body:', e.message);
        }
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.redirect('/');
        return;
      }
      return next();
    },

    // ── Serve stored POST data to the app ────────────────────────────────────
    // The app fetches /__uwcpen_post__ on every load. Return the stored payload
    // once (then clear it) so a subsequent plain refresh shows default content.
    function postDataMiddleware(ctx, next) {
      if (ctx.path === '/__uwcpen_post__') {
        const data = postStore;
        postStore  = null;           // consume once
        ctx.body   = JSON.stringify(data);
        ctx.type   = 'application/json';
        ctx.set('Cache-Control', 'no-store');
        ctx.set('Access-Control-Allow-Origin', '*');
        return;
      }
      return next();
    },

    // ── OPTIONS preflight for cross-origin requests ───────────────────────────
    function corsMiddleware(ctx, next) {
      if (ctx.method === 'OPTIONS') {
        ctx.set('Access-Control-Allow-Origin',  '*');
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type');
        ctx.status = 204;
        return;
      }
      return next();
    },

    // ── No-cache for TS/JS during development ─────────────────────────────────
    function noCacheMiddleware(ctx, next) {
      return next().then(() => {
        if (ctx.response.is('js') || ctx.response.is('ts')) {
          ctx.set('Cache-Control', 'no-store');
        }
      });
    },
  ],
};
