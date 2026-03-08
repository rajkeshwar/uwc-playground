import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { FrameworkId } from '../types.js';
import { DEFAULT_IMPORTMAPS } from '../config/importmaps.js';

@customElement('devpen-settings')
export class DevpenSettings extends LitElement {
  static styles = css`
    :host { display: none; }
    :host([open]) { display: block; }

    /* ── Overlay ── */
    .overlay {
      position: fixed; inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(6px);
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fade-in 0.15s ease;
    }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

    /* ── Modal ── */
    .modal {
      background: var(--surface);
      border: 1px solid var(--border-2);
      border-radius: 14px;
      width: min(780px, 95vw);
      max-height: 82vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,106,255,0.08);
      animation: slide-up 0.2s ease;
    }
    @keyframes slide-up { from { transform: translateY(14px); opacity: 0; } to { transform: none; opacity: 1; } }

    /* ── Modal header ── */
    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 20px 24px 16px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }
    .modal-title {
      font-family: var(--sans);
      font-size: 17px;
      font-weight: 700;
      color: var(--text-bright);
      letter-spacing: -0.02em;
    }
    .modal-subtitle {
      font-size: 12.5px;
      color: var(--text-dim);
      margin-top: 3px;
      line-height: 1.5;
    }
    .close-btn {
      background: var(--surface-2);
      border: 1px solid var(--border);
      color: var(--text);
      width: 30px; height: 30px;
      border-radius: 7px;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.12s;
      flex-shrink: 0;
    }
    .close-btn:hover { border-color: var(--red); color: var(--red); background: rgba(248,113,113,0.1); }

    /* ── Framework tabs ── */
    .fw-tabs {
      display: flex;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
      padding: 0 24px;
      gap: 0;
    }
    .fw-tab {
      padding: 11px 18px;
      font-family: var(--mono);
      font-size: 13px;
      font-weight: 500;
      background: none;
      border: none;
      color: var(--text);
      cursor: pointer;
      border-bottom: 2.5px solid transparent;
      transition: all 0.12s;
      outline: none;
    }
    .fw-tab:hover { color: var(--text-2); }
    .fw-tab.active { color: var(--accent); border-bottom-color: var(--accent); }

    /* ── Body ── */
    .modal-body {
      flex: 1;
      overflow-y: auto;
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .info-box {
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      border-radius: 7px;
      padding: 12px 16px;
      font-size: 13.5px;
      color: var(--text);
      line-height: 1.8;
    }
    .info-box code {
      color: var(--accent);
      background: var(--accent-soft);
      padding: 1px 6px;
      border-radius: 4px;
      font-family: var(--mono);
      font-size: 12.5px;
    }

    .editor-wrap {
      border: 1px solid var(--border-2);
      border-radius: 8px;
      overflow: hidden;
      background: var(--bg);
    }
    .editor-label {
      padding: 8px 14px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--text-dim);
      background: var(--surface-2);
      border-bottom: 1px solid var(--border);
    }
    textarea {
      display: block;
      width: 100%;
      min-height: 240px;
      background: var(--bg);
      color: var(--text-bright);
      border: none;
      padding: 16px;
      font-family: var(--mono);
      font-size: 14px;   /* bigger for readability */
      line-height: 1.75;
      resize: vertical;
      outline: none;
      tab-size: 2;
    }
    textarea::placeholder { color: var(--text-dim); }
    textarea:focus { background: var(--surface); }

    /* ── Footer ── */
    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      padding: 14px 24px;
      border-top: 1px solid var(--border);
      flex-shrink: 0;
    }

    .btn {
      font-family: var(--mono);
      font-size: 13px;
      font-weight: 500;
      padding: 8px 18px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.12s;
      border: 1.5px solid var(--border-2);
      background: var(--surface-2);
      color: var(--text);
      outline: none;
    }
    .btn:hover { color: var(--text-bright); border-color: var(--accent-glow); }
    .btn.primary {
      background: var(--accent-soft);
      border-color: var(--accent-glow);
      color: var(--accent);
    }
    .btn.primary:hover {
      background: rgba(124,106,255,0.25);
      box-shadow: 0 0 12px var(--accent-glow);
    }
    .btn.danger { color: var(--red); border-color: rgba(248,113,113,0.22); }
    .btn.danger:hover { background: rgba(248,113,113,0.1); }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) framework: FrameworkId = 'lit';
  @property({ type: Object }) userImportMaps: Partial<Record<FrameworkId, string>> = {};

  @state() private _activeFw: FrameworkId = 'lit';
  @state() private _textareaValue = '';

  updated(changed: Map<string, unknown>) {
    if (changed.has('open') && this.open) {
      this._activeFw = this.framework;
      this._loadValue();
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

  private _switchFw(fw: FrameworkId) {
    this._activeFw = fw;
    this._loadValue();
  }

  private _save() {
    const raw = this._textareaValue.trim();
    if (raw) {
      try { JSON.parse(raw); } catch(e) {
        alert('Invalid JSON:\n' + (e as Error).message);
        return;
      }
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
      detail: { framework: this._activeFw },
      bubbles: true, composed: true,
    }));
  }

  private _close() {
    this.dispatchEvent(new CustomEvent('close-settings', { bubbles: true, composed: true }));
  }

  render() {
    if (!this.open) return html``;
    const fws: FrameworkId[] = ['lit', 'react', 'vue', 'angular'];
    return html`
      <div class="overlay" @click=${(e: MouseEvent) => e.target === e.currentTarget && this._close()}>
        <div class="modal">
          <div class="modal-header">
            <div>
              <div class="modal-title">Import Map Settings</div>
              <div class="modal-subtitle">
                Configure which CDN URLs are used for each framework's dependencies.
                User overrides persist across sessions.
              </div>
            </div>
            <button class="close-btn" @click=${this._close}>✕</button>
          </div>

          <div class="fw-tabs">
            ${fws.map(fw => html`
              <button
                class="fw-tab ${this._activeFw === fw ? 'active' : ''}"
                @click=${() => this._switchFw(fw)}
              >${fw.charAt(0).toUpperCase() + fw.slice(1)}</button>
            `)}
          </div>

          <div class="modal-body">
            <div class="info-box">
              Set <code>"imports"</code> as a JSON object mapping specifier → URL.
              Leave empty to use the default. Changes apply on next compile.
              Example: <code>"lit": "https://esm.sh/lit@3?bundle-deps"</code>
            </div>
            <div class="editor-wrap">
              <div class="editor-label">importmap.json — ${this._activeFw}</div>
              <textarea
                spellcheck="false"
                .value=${this._textareaValue}
                @input=${(e: Event) => { this._textareaValue = (e.target as HTMLTextAreaElement).value; }}
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
      </div>
    `;
  }
}
