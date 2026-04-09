import type { FrameworkPlugin }    from './plugin.interface.js';
import type { ImportMap, TsCompilerOptions } from '../types.js';
import { importMapTag, escTpl, blobImportScript, CONSOLE_INTERCEPTOR, BUNDLE_LOADER } from '../engine/iframe-builder.js';
import { SNIPPETS }           from '../config/snippets.js';
import { DEFAULT_IMPORTMAPS } from '../config/importmaps.js';

export class ReactPlugin implements FrameworkPlugin {
  readonly id    = 'react';
  readonly name  = 'React';
  readonly color = '#61dafb';

  get defaultTs()        { return SNIPPETS.react.ts; }
  get defaultScss()      { return SNIPPETS.react.scss; }
  get defaultImportMap() { return DEFAULT_IMPORTMAPS.react; }

  getCompilerOptions(): TsCompilerOptions {
    return {
      experimentalDecorators:  false,
      emitDecoratorMetadata:   false,
      useDefineForClassFields: true,
      jsx: 'react',
      jsxFactory: 'React.createElement',
    };
  }

  buildIframe(js: string, css: string, importMap: ImportMap): string {
    const safeJs    = escTpl(js);
    const mountCode = `
      const root = createRoot(document.getElementById('root'));
      root.render(React.createElement(module.default));`;

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>${css}</style>
  ${importMapTag(importMap)}
</head>
<body>
  <div id="root"></div>
  ${CONSOLE_INTERCEPTOR}
  ${BUNDLE_LOADER}
  <script type="module">
import React from 'react';
import { createRoot } from 'react-dom/client';
${blobImportScript(safeJs, mountCode)}
  <\/script>
</body>
</html>`;
  }
}
