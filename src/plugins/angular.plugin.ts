import type { FrameworkPlugin }    from './plugin.interface.js';
import type { ImportMap, TsCompilerOptions } from '../types.js';
import { importMapTag, escTpl, CONSOLE_INTERCEPTOR, BUNDLE_LOADER } from '../engine/iframe-builder.js';
import { SNIPPETS }             from '../config/snippets.js';
import { DEFAULT_IMPORTMAPS }   from '../config/importmaps.js';

export class AngularPlugin implements FrameworkPlugin {
  readonly id    = 'angular';
  readonly name  = 'Angular';
  readonly color = '#dd0031';

  get defaultTs()        { return SNIPPETS.angular.ts; }
  get defaultScss()      { return SNIPPETS.angular.scss; }
  get defaultImportMap() { return DEFAULT_IMPORTMAPS.angular; }

  getCompilerOptions(): TsCompilerOptions {
    return {
      experimentalDecorators:  true,
      emitDecoratorMetadata:   false,
      useDefineForClassFields: false,
    };
  }

  buildIframe(js: string, css: string, importMap: ImportMap): string {
    const safeJs  = escTpl(js);
    const safeCss = escTpl(css);

    // Dynamically extract the component selector from the compiled JS.
    // Matches: selector: 'app-root' or selector: "app-root"
    const selectorMatch = js.match(/selector:\s*['"]([^'"]+)['"]/);
    const selector = selectorMatch ? selectorMatch[1] : 'app-root';

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/reflect-metadata/0.2.2/Reflect.min.js"><\/script>
  ${importMapTag(importMap)}
</head>
<body>
  <${selector}></${selector}>
  ${CONSOLE_INTERCEPTOR}
  ${BUNDLE_LOADER}
  <script type="module">
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

const styleEl = document.createElement('style');
styleEl.textContent = \`${safeCss}\`;
document.head.appendChild(styleEl);

const blob = new Blob([\`${safeJs}\`], { type: 'text/javascript' });
const url  = URL.createObjectURL(blob);

import(url).then(function(mod) {
  var Comp = Object.values(mod).find(function(v) {
    return v && typeof v === 'function' && v.ɵcmp;
  });
  if (!Comp) throw new Error('No Angular standalone component found. Ensure @Component is applied and the class is exported.');
  return bootstrapApplication(Comp, {
    providers: [provideExperimentalZonelessChangeDetection()]
  });
}).catch(function(err) {
  document.body.innerHTML = '<pre style="color:red;padding:1rem;font-family:monospace;white-space:pre-wrap">' + err + '</pre>';
});
  <\/script>
</body>
</html>`;
  }
}
