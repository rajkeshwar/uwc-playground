import { registerBuiltinPlugins } from './plugins/index.js';

// Register all built-in framework plugins before any component boots
registerBuiltinPlugins();

// ── Import components (self-register as custom elements) ─────────────────────
import './components/uwc-playground.js';
import './components/uwc-render.js';

// ── Public exports for consumers embedding these components ──────────────────
export { UwcPlayground } from './components/uwc-playground.js';
export { UwcRender }     from './components/uwc-render.js';
export { registry }      from './plugins/index.js';
export type { FrameworkPlugin } from './plugins/plugin.interface.js';
export type { FrameworkId, LayoutId, ImportMap } from './types.js';
