import type { FrameworkPlugin }    from './plugin.interface.js';
import type { ImportMap, TsCompilerOptions } from '../types.js';
import { importMapTag, escTpl, CONSOLE_INTERCEPTOR, BUNDLE_LOADER } from '../engine/iframe-builder.js';
import { SNIPPETS }                 from '../config/snippets.js';
import { DEFAULT_IMPORTMAPS }       from '../config/importmaps.js';

export class LitPlugin implements FrameworkPlugin {
  readonly id    = 'lit';
  readonly name  = 'Lit';
  readonly color = '#c84b2f';

  get defaultTs()        { return SNIPPETS.lit.ts; }
  get defaultScss()      { return SNIPPETS.lit.scss; }
  get defaultImportMap() { return DEFAULT_IMPORTMAPS.lit; }

  getCompilerOptions(): TsCompilerOptions {
    return {
      experimentalDecorators:  true,
      emitDecoratorMetadata:   false,
      useDefineForClassFields: false, // Critical for Lit reactivity
    };
  }

  buildIframe(js: string, css: string, importMap: ImportMap): string {
    const safeCss = escTpl(css);

    // Dynamically extract the custom element tag name from the compiled JS.
    // @customElement('my-counter') compiles to customElement('my-counter')
    const tagMatch = js.match(/customElement\(\s*['"]([^'"]+)['"]\s*\)/);
    const tagName = tagMatch ? tagMatch[1] : 'my-counter';

    // Lit uses Shadow DOM — global <style> tags cannot penetrate shadow roots.
    // Solution: keep global styles (body, etc.) in <head>, AND adopt the same
    // stylesheet into every shadow root as it mounts, using the CSSStyleSheet API.
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>${css}</style>
  ${importMapTag(importMap)}
</head>
<body>
  <${tagName}></${tagName}>
  ${CONSOLE_INTERCEPTOR}
  ${BUNDLE_LOADER}
  <script>
  // Inject user CSS into Lit shadow roots via adoptedStyleSheets
  (function() {
    var __sheet = new CSSStyleSheet();
    __sheet.replace(\`${safeCss}\`);
    function __inject() {
      document.querySelectorAll('*').forEach(function(el) {
        if (el.shadowRoot && !el.__uwcStyled) {
          el.shadowRoot.adoptedStyleSheets = Array.from(el.shadowRoot.adoptedStyleSheets).concat([__sheet]);
          el.__uwcStyled = true;
        }
      });
    }
    var __mo = new MutationObserver(__inject);
    __mo.observe(document, { childList: true, subtree: true });
    requestAnimationFrame(__inject);
    setTimeout(__inject, 100);
  })();
  <\/script>
  <script type="module">
${js}
  <\/script>
</body>
</html>`;
  }
}
