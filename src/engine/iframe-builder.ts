import type { ImportMap } from '../types.js';

/**
 * Escapes backticks and ${} for safe embedding inside JS template literals.
 */
export function escTpl(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

/**
 * Serialises an ImportMap to a <script type="importmap"> tag string.
 */
export function importMapTag(map: ImportMap): string {
  return `<script type="importmap">${JSON.stringify(map, null, 2)}<\/script>`;
}

/**
 * Console interceptor script — injected into every iframe.
 * Forwards console.log/warn/error/info to the parent via postMessage.
 * Also catches uncaught errors and unhandled rejections.
 */
export const CONSOLE_INTERCEPTOR = `
<script>
(function(){
  var __ul = { log:'log', warn:'warn', error:'error', info:'info', debug:'debug' };
  Object.keys(__ul).forEach(function(level) {
    var orig = console[level].bind(console);
    console[level] = function() {
      var args = Array.prototype.slice.call(arguments).map(function(a) {
        if (a === null) return 'null';
        if (a === undefined) return 'undefined';
        try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
        catch(e) { return String(a); }
      });
      try { parent.postMessage({ __uwc_console: true, level: level, args: args, t: Date.now() }, '*'); } catch(e) {}
      orig.apply(console, arguments);
    };
  });
  window.addEventListener('error', function(e) {
    var msg = e.message || 'Unknown error';
    if (e.filename) msg += '  (' + (e.filename.split('/').pop()) + ':' + e.lineno + ')';
    try { parent.postMessage({ __uwc_console: true, level: 'error', args: [msg], t: Date.now() }, '*'); } catch(ex) {}
  });
  window.addEventListener('unhandledrejection', function(e) {
    var reason = e.reason ? (e.reason.message || String(e.reason)) : 'Unhandled rejection';
    try { parent.postMessage({ __uwc_console: true, level: 'error', args: ['Unhandled Promise: ' + reason], t: Date.now() }, '*'); } catch(ex) {}
  });
})();
<\/script>`;

/**
 * Bundle loader script — injected into every iframe.
 * Reads __UWC_BUNDLE_URL__ from localStorage and appends it as a module script.
 */
export const BUNDLE_LOADER = `
<script>
(function() {
  var __UWC_BUNDLE_URL__ = localStorage.getItem('__UWC_BUNDLE_URL__');
  var s = document.createElement('script');
  s.type = 'module';
  s.src = __UWC_BUNDLE_URL__ === null 
    ? '/assets/js/uwc.bundle.js' 
    : __UWC_BUNDLE_URL__ + '/js/uwc.bundle.js';
  document.head.appendChild(s);
})();
<\/script>`;

/**
 * Wraps user JS in a blob URL dynamic import pattern.
 * Used by React, Vue and Angular where the component is imported at runtime.
 */
export function blobImportScript(safeJs: string, mountCode: string): string {
  return `
const __blob = new Blob([\`${safeJs}\`], { type: 'text/javascript' });
const __url  = URL.createObjectURL(__blob);
import(__url).then(module => {
  ${mountCode}
}).catch(err => {
  document.body.innerHTML = '<pre style="color:red;padding:1rem;font-family:monospace;white-space:pre-wrap">' + err + '</pre>';
});`;
}
