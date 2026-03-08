import type { Extension } from '@codemirror/state';

/**
 * EditorThemePlugin — contract for CodeMirror theme extensions.
 * Implement this to ship your own editor colour scheme.
 *
 * @example
 *   import { themeRegistry } from './editor-theme.js';
 *   themeRegistry.register(new MyTheme());
 *   themeRegistry.setActive('my-theme');
 */
export interface EditorThemePlugin {
  readonly id: string;
  readonly name: string;
  /** Return CodeMirror Extension(s) that apply this theme */
  getExtensions(): Extension[];
}

class ThemeRegistry {
  private static _i: ThemeRegistry;
  private _map = new Map<string, EditorThemePlugin>();
  private _activeId = 'catppuccin';

  static get(): ThemeRegistry {
    if (!ThemeRegistry._i) ThemeRegistry._i = new ThemeRegistry();
    return ThemeRegistry._i;
  }

  register(t: EditorThemePlugin): void { this._map.set(t.id, t); }
  setActive(id: string): void { if (this._map.has(id)) this._activeId = id; }
  getActive(): EditorThemePlugin | undefined { return this._map.get(this._activeId); }
  getAll(): EditorThemePlugin[] { return Array.from(this._map.values()); }
  has(id: string): boolean { return this._map.has(id); }
}

export const themeRegistry = ThemeRegistry.get();
