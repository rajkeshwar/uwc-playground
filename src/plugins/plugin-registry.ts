import type { FrameworkId } from '../types.js';
import type { FrameworkPlugin } from './plugin.interface.js';

/**
 * PluginRegistry — central store for framework plugins.
 * Open for extension (register new plugins), closed for modification.
 */
export class PluginRegistry {
  private static _instance: PluginRegistry;
  private readonly _plugins = new Map<string, FrameworkPlugin>();

  private constructor() {}

  static getInstance(): PluginRegistry {
    if (!PluginRegistry._instance) {
      PluginRegistry._instance = new PluginRegistry();
    }
    return PluginRegistry._instance;
  }

  register(plugin: FrameworkPlugin): void {
    if (this._plugins.has(plugin.id)) {
      console.warn(`[PluginRegistry] Plugin "${plugin.id}" is already registered – overwriting.`);
    }
    this._plugins.set(plugin.id, plugin);
  }

  get(id: string): FrameworkPlugin {
    const plugin = this._plugins.get(id);
    if (!plugin) throw new Error(`[PluginRegistry] No plugin registered for id "${id}"`);
    return plugin;
  }

  has(id: string): boolean {
    return this._plugins.has(id);
  }

  getAll(): FrameworkPlugin[] {
    return Array.from(this._plugins.values());
  }

  getIds(): string[] {
    return Array.from(this._plugins.keys());
  }
}

/** Convenience singleton accessor */
export const registry = PluginRegistry.getInstance();
