import { EditorView } from '@codemirror/view';
import { oneDark }    from '@codemirror/theme-one-dark';
import type { EditorThemePlugin } from '../editor-theme.js';

const overlay = EditorView.theme({
  '&': { background: '#1e1e2e !important' },
  '.cm-content': { caretColor: '#cba6f7' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#cba6f7 !important' },
  '.cm-gutters': {
    background: '#181825 !important',
    borderRight: '1px solid #313244 !important',
    color: '#585b70',
  },
  '.cm-lineNumbers .cm-gutterElement': { minWidth: '38px', paddingRight: '12px' },
  '.cm-activeLineGutter': { background: 'rgba(203,166,247,0.08) !important', color: '#cba6f7' },
  '.cm-activeLine': { background: 'rgba(203,166,247,0.05) !important' },
  '.cm-selectionBackground': { background: 'rgba(203,166,247,0.22) !important' },
  '&.cm-focused .cm-selectionBackground': { background: 'rgba(203,166,247,0.28) !important' },
  '.cm-matchingBracket': { background: 'rgba(203,166,247,0.2) !important', outline: '1px solid #cba6f7' },
  '.cm-tooltip': { background: '#313244 !important', border: '1px solid #45475a !important', color: '#cdd6f4' },
  '.cm-tooltip-autocomplete ul li[aria-selected]': { background: '#45475a !important' },
  '.cm-searchMatch': { background: 'rgba(249,226,175,0.25) !important', outline: '1px solid #f9e2af' },
  '.cm-searchMatch.cm-searchMatch-selected': { background: 'rgba(249,226,175,0.45) !important' },
}, { dark: true });

export class CatppuccinTheme implements EditorThemePlugin {
  readonly id   = 'catppuccin';
  readonly name = 'Catppuccin Mocha';
  getExtensions() { return [oneDark, overlay]; }
}
