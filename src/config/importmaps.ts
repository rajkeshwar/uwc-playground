import type { FrameworkId, ImportMap } from '../types.js';

// All Lit bare specifiers used by @uwckit/components (loaded via BUNDLE_LOADER in every iframe).
// CDN modules are unbundled ESM — every bare import must have an importmap entry.
// Trailing-slash keys are prefix mappings: 'lit/directives/' covers any lit/directives/*.js import.
const LIT_IMPORTS = {
  'lit':                   'https://esm.sh/lit@3?bundle-deps',
  'lit/':                  'https://esm.sh/lit@3/',
  '@lit/reactive-element': 'https://esm.sh/@lit/reactive-element@2?bundle-deps',
  '@lit/reactive-element/':'https://esm.sh/@lit/reactive-element@2/',
  '@lit/context':          'https://esm.sh/@lit/context@1?bundle-deps',
  '@lit/task':             'https://esm.sh/@lit/task@1?bundle-deps',
};

export const DEFAULT_IMPORTMAPS: Record<FrameworkId, ImportMap> = {

  lit: {
    imports: {
      ...LIT_IMPORTS,
    },
  },

  react: {
    imports: {
      'react':                    'https://esm.sh/react@18',
      'react-dom/client':         'https://esm.sh/react-dom@18/client',
      '@lit/react':               'https://esm.sh/@lit/react@1?bundle-deps',
      '@uwckit/components/react': 'https://cdn.jsdelivr.net/npm/@uwckit/components/dist/react.js',
      ...LIT_IMPORTS,
    },
  },

  vue: {
    imports: {
      'vue': 'https://esm.sh/vue@3/dist/vue.esm-browser.js',
      ...LIT_IMPORTS,
    },
  },

  angular: {
    imports: {
      '@angular/core':             'https://esm.sh/@angular/core@18',
      '@angular/compiler':         'https://esm.sh/@angular/compiler@18',
      '@angular/common':           'https://esm.sh/@angular/common@18',
      '@angular/platform-browser': 'https://esm.sh/@angular/platform-browser@18',
      'tslib':                     'https://esm.sh/tslib@2',
      ...LIT_IMPORTS,
    },
  },
};
