import { basicSetup }           from 'codemirror';
import { EditorView }            from '@codemirror/view';
import { EditorState }           from '@codemirror/state';
import { javascript }            from '@codemirror/lang-javascript';
import { css as cssLang }        from '@codemirror/lang-css';
import { oneDark }               from '@codemirror/theme-one-dark';

// ── DevPen editor theme — warm dark, VS Code-adjacent palette ───────────────
// We intentionally leave the oneDark base background (~#282c34) intact so the
// editor has proper contrast. We only tweak accents, gutters and selection.
const devpenTheme = EditorView.theme({
  // Slightly warmer/lighter background than pure black
  '&': { background: '#1e1e2e !important' },
  '.cm-content': { caretColor: '#cba6f7' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#cba6f7 !important' },
  '.cm-gutters': {
    background: '#181825 !important',
    borderRight: '1px solid #313244 !important',
    color: '#585b70',
  },
  '.cm-lineNumbers .cm-gutterElement': { minWidth: '36px', paddingRight: '10px' },
  '.cm-activeLineGutter': { background: 'rgba(203,166,247,0.07) !important', color: '#cba6f7' },
  '.cm-activeLine': { background: 'rgba(203,166,247,0.05) !important' },
  '.cm-selectionBackground': { background: 'rgba(203,166,247,0.22) !important' },
  '&.cm-focused .cm-selectionBackground': { background: 'rgba(203,166,247,0.28) !important' },
  '.cm-matchingBracket': { background: 'rgba(203,166,247,0.2) !important', outline: '1px solid #cba6f7' },
  '.cm-tooltip': { background: '#313244 !important', border: '1px solid #45475a !important', color: '#cdd6f4' },
  '.cm-tooltip-autocomplete ul li[aria-selected]': { background: '#45475a !important' },
  '.cm-panels': { background: '#181825 !important', borderColor: '#313244 !important' },
  '.cm-searchMatch': { background: 'rgba(249,226,175,0.25) !important', outline: '1px solid #f9e2af' },
  '.cm-searchMatch.cm-searchMatch-selected': { background: 'rgba(249,226,175,0.45) !important' },
}, { dark: true });

type ChangeCallback = (value: string) => void;

/**
 * EditorService
 * Single Responsibility: create and manage two CodeMirror editor instances.
 */
export class EditorService {
  private _tsEditor!:   EditorView;
  private _scssEditor!: EditorView;
  private _onChange: ChangeCallback | null = null;

  /** Mount TS editor into `tsMount` and SCSS editor into `scssMount`. */
  init(tsMount: HTMLElement, scssMount: HTMLElement, initialTs: string, initialScss: string): void {
    this._tsEditor   = this._create(tsMount, javascript({ typescript: true, jsx: true }), initialTs);
    this._scssEditor = this._create(scssMount, cssLang(), initialScss);
  }

  onContentChange(cb: ChangeCallback): void {
    this._onChange = cb;
  }

  getTsValue():   string { return this._tsEditor.state.doc.toString(); }
  getScssValue(): string { return this._scssEditor.state.doc.toString(); }

  setTsValue(value: string):   void { this._setValue(this._tsEditor, value); }
  setScssValue(value: string): void { this._setValue(this._scssEditor, value); }

  // Called after the panels are re-parented so CM can recalculate dimensions
  refreshLayout(): void {
    this._tsEditor?.requestMeasure();
    this._scssEditor?.requestMeasure();
  }

  getEditorElements(): { tsEl: HTMLElement; scssEl: HTMLElement } {
    return {
      tsEl:   this._tsEditor.dom,
      scssEl: this._scssEditor.dom,
    };
  }

  private _create(mount: HTMLElement, lang: any, value: string): EditorView {
    const view = new EditorView({
      state: EditorState.create({
        doc: value.trim(),
        extensions: [
          basicSetup,
          lang,
          oneDark,
          devpenTheme,
          EditorView.lineWrapping,
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              this._onChange?.(update.state.doc.toString());
            }
          }),
        ],
      }),
      parent: mount,
    });
    view.dom.style.height = '100%';
    return view;
  }

  private _setValue(editor: EditorView, value: string): void {
    const current = editor.state.doc.toString();
    if (current === value) return;
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: value },
    });
  }

  destroy(): void {
    this._tsEditor?.destroy();
    this._scssEditor?.destroy();
  }
}
