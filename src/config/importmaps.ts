import type { FrameworkId, ImportMap } from '../types.js';

export const DEFAULT_IMPORTMAPS: Record<FrameworkId, ImportMap> = {

  lit: {
    imports: {
      'lit':               'https://esm.sh/lit@3?bundle-deps',
      'lit/decorators.js': 'https://esm.sh/lit@3/decorators.js?bundle-deps',
    },
  },

  react: {
    imports: {
      'react':            'https://esm.sh/react@18',
      'react-dom/client': 'https://esm.sh/react-dom@18/client',
      '@lit/react':       'https://esm.sh/@lit/react@1?bundle-deps',
      '@uwc/components/react':       '/assets/js/uwc.bundle.react.js',
    },
  },

  vue: {
    imports: {
      'vue': 'https://esm.sh/vue@3/dist/vue.esm-browser.js',
    },
  },

  angular: {
    imports: {
      '@angular/core':             'https://esm.sh/@angular/core@18',
      '@angular/compiler':         'https://esm.sh/@angular/compiler@18',
      '@angular/common':           'https://esm.sh/@angular/common@18',
      '@angular/platform-browser': 'https://esm.sh/@angular/platform-browser@18',
      'tslib':                     'https://esm.sh/tslib@2',
    },
  },
};
