import { basicSetup }           from 'codemirror';
import { EditorView }            from '@codemirror/view';
import { EditorState }           from '@codemirror/state';
import { javascript }            from '@codemirror/lang-javascript';
import { css as cssLang }        from '@codemirror/lang-css';
import { themeRegistry }         from '../config/editor-theme.js';

type ChangeCallback = (value: string) => void;

/**
 * EditorService
 * Manages two CodeMirror instances (TS + SCSS).
 * Theme is resolved from themeRegistry — swap themes by calling
 *   themeRegistry.setActive('your-theme-id')
 * and then calling editor.service.reinit() (or hot-reload).
 */
export class EditorService {
  private _tsEditor!:   EditorView;
  private _scssEditor!: EditorView;
  private _onChange: ChangeCallback | null = null;

  init(tsMount: HTMLElement, scssMount: HTMLElement, initialTs: string, initialScss: string): void {
    this._tsEditor   = this._create(tsMount, javascript({ typescript: true, jsx: true }), initialTs);
    this._scssEditor = this._create(scssMount, cssLang(), initialScss);
  }

  onContentChange(cb: ChangeCallback): void { this._onChange = cb; }

  getTsValue():   string { return this._tsEditor?.state.doc.toString() ?? ''; }
  getScssValue(): string { return this._scssEditor?.state.doc.toString() ?? ''; }

  setTsValue(v: string):   void { this._setValue(this._tsEditor, v); }
  setScssValue(v: string): void { this._setValue(this._scssEditor, v); }

  refreshLayout(): void {
    this._tsEditor?.requestMeasure();
    this._scssEditor?.requestMeasure();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _create(mount: HTMLElement, lang: any, value: string): EditorView {
    const themePlugin = themeRegistry.getActive();
    const themeExts   = themePlugin?.getExtensions() ?? [];

    const view = new EditorView({
      state: EditorState.create({
        doc: value.trim(),
        extensions: [
          basicSetup,
          lang,
          ...themeExts,
          EditorView.lineWrapping,
          EditorView.updateListener.of(upd => {
            if (upd.docChanged) this._onChange?.(upd.state.doc.toString());
          }),
        ],
      }),
      parent: mount,
    });
    view.dom.style.height = '100%';
    return view;
  }

  private _setValue(editor: EditorView, value: string): void {
    if (!editor) return;
    const current = editor.state.doc.toString();
    if (current === value) return;
    editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: value } });
  }

  destroy(): void {
    this._tsEditor?.destroy();
    this._scssEditor?.destroy();
  }
}
