import type { FrameworkPlugin }    from './plugin.interface.js';
import type { ImportMap, TsCompilerOptions } from '../types.js';
import { importMapTag, escTpl, blobImportScript } from '../engine/iframe-builder.js';
import { SNIPPETS }           from '../config/snippets.js';
import { DEFAULT_IMPORTMAPS } from '../config/importmaps.js';

export class VuePlugin implements FrameworkPlugin {
  readonly id    = 'vue';
  readonly name  = 'Vue';
  readonly color = '#42b883';

  get defaultTs()        { return SNIPPETS.vue.ts; }
  get defaultScss()      { return SNIPPETS.vue.scss; }
  get defaultImportMap() { return DEFAULT_IMPORTMAPS.vue; }

  getCompilerOptions(): TsCompilerOptions {
    return {
      experimentalDecorators:  false,
      emitDecoratorMetadata:   false,
      useDefineForClassFields: true,
    };
  }

  buildIframe(js: string, css: string, importMap: ImportMap): string {
    const safeJs    = escTpl(js);
    const mountCode = `
  var config = module.default || {};
  // Ensure the config is treated as options API (not accidentally as a render fn)
  if (typeof config === 'object') {
    createApp(config).mount('#app');
  } else {
    document.body.innerHTML = '<pre style="color:red">Vue: default export must be a component options object</pre>';
  }`;

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>${css}</style>
  ${importMapTag(importMap)}
</head>
<body>
  <div id="app"></div>
  <script type="module">
import { createApp } from 'vue';
${blobImportScript(safeJs, mountCode)}
  <\/script>
</body>
</html>`;
  }
}
