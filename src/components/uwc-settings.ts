import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import type { FrameworkId } from '../types.js';
import { DEFAULT_IMPORTMAPS } from '../config/importmaps.js';

/**
 * uwc-settings — Import Map Settings modal.
 *
 * Uses a native <dialog> element (showModal / close) for robust backdrop,
 * Escape-key handling and scroll-lock out of the box, while keeping full
 * custom styling.
 */
@customElement('uwc-settings')
export class UwcSettings extends LitElement {
  static styles = css`
    :host { display: contents; }

    /* ── Native dialog reset — we provide all visual chrome ourselves ── */
    dialog {
      /* Reset browser defaults */
      padding: 0;
      border: none;
      background: transparent;
      overflow: visible;
      /* Size the dialog to exactly wrap its content */
      width: fit-content;
      max-width: none;
      max-height: none;
    }

    /* Backdrop rendered by the browser via ::backdrop on showModal() */
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      animation: bd-in 0.15s ease;
    }
    @keyframes bd-in { from { opacity: 0; } to { opacity: 1; } }

    /* ── Modal panel ── */
    .modal {
      background: var(--surface);
      border: 1px solid var(--border-2);
      border-radius: 14px;
      width: min(780px, 92vw);
      max-height: min(560px, 88vh);
      min-width: 340px;
      min-height: 260px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(124,106,255,0.1);
      animation: slide-up 0.2s ease;
      /* Allow the panel to be resized by the user via CSS resize */
      resize: both;
    }
    @keyframes slide-up {
      from { transform: translateY(12px); opacity: 0; }
      to   { transform: none; opacity: 1; }
    }

    /* ── Modal header ── */
    .modal-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      padding: 20px 24px 14px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }
    .modal-title {
      font-family: var(--sans); font-size: 17px; font-weight: 700;
      color: var(--text-bright); letter-spacing: -0.02em;
    }
    .modal-subtitle {
      font-size: 12px; color: var(--text-dim); margin-top: 3px; line-height: 1.5;
    }
    .close-btn {
      background: var(--surface-2); border: 1px solid var(--border);
      color: var(--text); width: 30px; height: 30px; border-radius: 7px;
      cursor: pointer; font-size: 14px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.12s; flex-shrink: 0; outline: none;
    }
    .close-btn:hover { border-color: var(--red); color: var(--red); background: rgba(248,113,113,0.1); }

    /* ── Framework tabs ── */
    .fw-tabs {
      display: flex; border-bottom: 1px solid var(--border);
      flex-shrink: 0; padding: 0 20px;
    }
    .fw-tab {
      padding: 10px 16px;
      font-family: var(--mono); font-size: 12.5px; font-weight: 500;
      background: none; border: none; color: var(--text);
      cursor: pointer; border-bottom: 2.5px solid transparent;
      transition: all 0.12s; outline: none;
    }
    .fw-tab:hover { color: var(--text-2); }
    .fw-tab.active { color: var(--accent); border-bottom-color: var(--accent); }

    /* ── Body ── */
    .modal-body {
      flex: 1; overflow-y: auto; padding: 18px 24px;
      display: flex; flex-direction: column; gap: 12px;
    }
    .info-box {
      background: var(--surface-2); border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      border-radius: 7px; padding: 11px 15px;
      font-size: 13px; color: var(--text); line-height: 1.75;
      flex-shrink: 0;
    }
    .info-box code {
      color: var(--accent); background: var(--accent-soft);
      padding: 1px 6px; border-radius: 4px;
      font-family: var(--mono); font-size: 12px;
    }
    .editor-wrap {
      border: 1px solid var(--border-2); border-radius: 8px;
      overflow: hidden; background: var(--bg); flex: 1;
      display: flex; flex-direction: column;
    }
    .editor-label {
      padding: 7px 14px; font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.12em;
      color: var(--text-dim); background: var(--surface-2);
      border-bottom: 1px solid var(--border); flex-shrink: 0;
    }
    textarea {
      display: block; width: 100%; flex: 1;
      min-height: 200px;
      background: var(--bg); color: var(--text-bright);
      border: none; padding: 14px; box-sizing: border-box;
      font-family: var(--mono); font-size: 13.5px;
      line-height: 1.7; resize: none; outline: none; tab-size: 2;
    }
    textarea:focus { background: var(--surface); }
    textarea::placeholder { color: var(--text-dim); }

    /* ── Footer ── */
    .modal-footer {
      display: flex; align-items: center; justify-content: flex-end;
      gap: 8px; padding: 12px 24px;
      border-top: 1px solid var(--border); flex-shrink: 0;
    }
    .btn {
      font-family: var(--mono); font-size: 12.5px; font-weight: 500;
      padding: 8px 17px; border-radius: 8px; cursor: pointer;
      transition: all 0.12s; border: 1.5px solid var(--border-2);
      background: var(--surface-2); color: var(--text); outline: none;
    }
    .btn:hover { color: var(--text-bright); border-color: var(--accent-glow); }
    .btn.primary {
      background: var(--accent-soft); border-color: var(--accent-glow); color: var(--accent);
    }
    .btn.primary:hover { background: rgba(124,106,255,0.25); box-shadow: 0 0 12px var(--accent-glow); }
    .btn.danger { color: var(--red); border-color: rgba(248,113,113,0.2); }
    .btn.danger:hover { background: rgba(248,113,113,0.1); }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) framework: FrameworkId = 'lit';
  @property({ type: Object }) userImportMaps: Partial<Record<FrameworkId, string>> = {};

  @state() private _activeFw: FrameworkId = 'lit';
  @state() private _textareaValue = '';

  @query('dialog') private _dialog!: HTMLDialogElement;

  // ── Open / close via native dialog API ──────────────────────────────────────

  updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this._activeFw = this.framework;
        this._loadValue();
        // showModal() must be called after the dialog is in the DOM
        requestAnimationFrame(() => {
          if (this._dialog && !this._dialog.open) this._dialog.showModal();
        });
      } else {
        if (this._dialog?.open) this._dialog.close();
      }
    }
    if (changed.has('framework') && this.open) {
      this._activeFw = this.framework;
      this._loadValue();
    }
  }

  private _loadValue() {
    const user = this.userImportMaps[this._activeFw];
    this._textareaValue = user ?? JSON.stringify(DEFAULT_IMPORTMAPS[this._activeFw], null, 2);
  }

  private _save() {
    const raw = this._textareaValue.trim();
    if (raw) {
      try { JSON.parse(raw); }
      catch(e) { alert('Invalid JSON:\n' + (e as Error).message); return; }
    }
    this.dispatchEvent(new CustomEvent('save-importmap', {
      detail: { framework: this._activeFw, value: raw || null },
      bubbles: true, composed: true,
    }));
    this._close();
  }

  private _reset() {
    this._textareaValue = JSON.stringify(DEFAULT_IMPORTMAPS[this._activeFw], null, 2);
    this.dispatchEvent(new CustomEvent('reset-importmap', {
      detail: { framework: this._activeFw }, bubbles: true, composed: true,
    }));
  }

  private _close() {
    this.dispatchEvent(new CustomEvent('close-settings', { bubbles: true, composed: true }));
  }

  // Close on Escape (native dialog fires 'cancel' event on Escape key)
  private _onDialogCancel(e: Event) {
    e.preventDefault(); // prevent dialog from closing itself; let our state drive it
    this._close();
  }

  // Close when clicking directly on the <dialog> backdrop area
  private _onDialogClick(e: MouseEvent) {
    // The dialog element fills the viewport in modal mode; a click on the
    // backdrop (outside .modal) registers as a click on <dialog> itself.
    if (e.target === this._dialog) this._close();
  }

  render() {
    const fws: FrameworkId[] = ['lit', 'react', 'vue', 'angular'];
    return html`
      <dialog
        @cancel=${this._onDialogCancel}
        @click=${this._onDialogClick}
      >
        <div class="modal">

          <div class="modal-header">
            <div>
              <div class="modal-title">Import Map Settings</div>
              <div class="modal-subtitle">
                Configure which CDN URLs are used for each framework. Changes persist across sessions.
              </div>
            </div>
            <button class="close-btn" @click=${this._close}>✕</button>
          </div>

          <div class="fw-tabs">
            ${fws.map(fw => html`
              <button
                class="fw-tab ${this._activeFw === fw ? 'active' : ''}"
                @click=${() => { this._activeFw = fw; this._loadValue(); }}
              >
                ${fw.charAt(0).toUpperCase() + fw.slice(1)}
              </button>
            `)}
          </div>

          <div class="modal-body">
            <div class="info-box">
              Set <code>"imports"</code> as a JSON object mapping specifier → URL.
              Leave empty to use the default. Example:
              <code>"lit": "https://esm.sh/lit@3?bundle-deps"</code>
            </div>
            <div class="editor-wrap">
              <div class="editor-label">importmap.json — ${this._activeFw}</div>
              <textarea
                spellcheck="false"
                .value=${this._textareaValue}
                @input=${(e: Event) => {
                  this._textareaValue = (e.target as HTMLTextAreaElement).value;
                }}
                placeholder='{\n  "imports": {\n    "package": "https://esm.sh/package@version"\n  }\n}'
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn danger" @click=${this._reset}>↺ Reset to Default</button>
            <button class="btn" @click=${this._close}>Cancel</button>
            <button class="btn primary" @click=${this._save}>Apply &amp; Recompile</button>
          </div>

        </div>
      </dialog>
    `;
  }
}
