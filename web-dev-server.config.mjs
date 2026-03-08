import { esbuildPlugin } from '@web/dev-server-esbuild';

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
    // ── Serve sw.js from project root with no-cache headers ──────────────────
    function swMiddleware(ctx, next) {
      if (ctx.path === '/sw.js') {
        ctx.set('Service-Worker-Allowed', '/');
        ctx.set('Cache-Control', 'no-store');
      }
      return next();
    },

    // ── Handle POST requests in dev mode (SW not yet installed on first hit) ──
    async function postMiddleware(ctx, next) {
      if (ctx.method === 'POST' && (ctx.path === '/' || ctx.path === '')) {
        // Redirect to GET — the SW will handle subsequent POSTs once installed.
        // For the very first POST, data is lost, but the SW installs on redirect load.
        ctx.redirect('/');
        return;
      }
      return next();
    },

    // ── Dev: serve /__uwcpen_post__ (SW handles this in production) ────────────
    function postDataMiddleware(ctx, next) {
      if (ctx.path === '/__uwcpen_post__') {
        ctx.body = 'null';
        ctx.type = 'application/json';
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
