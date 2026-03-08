import type { FrameworkPlugin }    from './plugin.interface.js';
import type { ImportMap, TsCompilerOptions } from '../types.js';
import { importMapTag }             from '../engine/iframe-builder.js';
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
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>${css}</style>
  ${importMapTag(importMap)}
</head>
<body>
  <my-counter label="Clicks"></my-counter>
  <script type="module">
${js}
  <\/script>
</body>
</html>`;
  }
}
