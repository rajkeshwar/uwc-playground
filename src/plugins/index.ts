import { registry }      from './plugin-registry.js';
import { LitPlugin }     from './lit.plugin.js';
import { ReactPlugin }   from './react.plugin.js';
import { VuePlugin }     from './vue.plugin.js';
import { AngularPlugin } from './angular.plugin.js';

export function registerBuiltinPlugins(): void {
  registry.register(new LitPlugin());
  registry.register(new ReactPlugin());
  registry.register(new VuePlugin());
  registry.register(new AngularPlugin());
}

export { registry };
export type { FrameworkPlugin } from './plugin.interface.js';
