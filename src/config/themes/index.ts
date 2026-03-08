import { themeRegistry } from '../editor-theme.js';
import { CatppuccinTheme } from './catppuccin.theme.js';

export function registerBuiltinThemes(): void {
  themeRegistry.register(new CatppuccinTheme());
  themeRegistry.setActive('catppuccin');
}
