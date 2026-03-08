import { registerBuiltinPlugins } from './plugins/index.js';
import { registerBuiltinThemes }  from './config/themes/index.js';

// 1. Register framework plugins
registerBuiltinPlugins();

// 2. Register editor themes (must happen before any EditorService is constructed)
registerBuiltinThemes();

// 3. Import components (self-register as custom elements)
import './components/uwc-playground.js';
import './components/uwc-render.js';

// ── Public API for consumers embedding these components ──────────────────────
export { UwcPlayground } from './components/uwc-playground.js';
export { UwcRender }     from './components/uwc-render.js';
export { registry }      from './plugins/index.js';
export { themeRegistry } from './config/editor-theme.js';
export type { FrameworkPlugin } from './plugins/plugin.interface.js';
export type { EditorThemePlugin } from './config/editor-theme.js';
export type { FrameworkId, LayoutId, ImportMap } from './types.js';
