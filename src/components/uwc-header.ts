import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { FrameworkId, LayoutId } from '../types.js';
import type { FrameworkPlugin } from '../plugins/plugin.interface.js';
import { LAYOUT_OPTIONS } from '../config/layouts.js';
import { FRAMEWORK_LOGOS } from '../config/framework-logos.js';

@customElement('uwc-header')
export class UwcHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      height: 52px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 0 12px;
      gap: 8px;
      flex-shrink: 0;
      position: relative;
      z-index: 50;
      user-select: none;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
    }
    :host::-webkit-scrollbar { display: none; }

    /* ── Logo ── */
    .logo {
      font-family: var(--sans);
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.04em;
      color: var(--text-bright);
      padding-right: 12px;
      border-right: 1px solid var(--border-2);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .logo-accent { color: var(--accent); }

    /* ── Framework buttons ── */
    .fw-group {
      display: flex;
      gap: 4px;
      align-items: center;
      flex-shrink: 0;
    }

    .fw-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 11px;
      height: 30px;
      border-radius: 6px;
      border: 1.5px solid var(--border-2);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--mono);
      font-size: 11.5px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.12s, color 0.12s;
      white-space: nowrap;
      outline: none;
      flex-shrink: 0;
    }
    .fw-btn .logo-icon {
      display: flex;
      align-items: center;
      opacity: 0.7;
      transition: opacity 0.12s;
      flex-shrink: 0;
    }
    .fw-btn:hover {
      color: var(--text-bright);
      background: var(--surface-3);
    }
    .fw-btn:hover .logo-icon { opacity: 0.9; }

    /* Active: highlight text + icon, keep border same colour */
    .fw-btn.active {
      background: rgba(255,255,255,0.06);
      color: var(--text-bright);
    }
    .fw-btn.active .logo-icon { opacity: 1; }

    /* ── Separator ── */
    .sep {
      width: 1px;
      height: 24px;
      background: var(--border-2);
      flex-shrink: 0;
    }

    /* ── Layout group — CodePen-style prominent buttons ── */
    .layout-group {
      display: flex;
      gap: 3px;
      flex-shrink: 0;
    }

    .layout-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 0 9px;
      height: 30px;
      background: var(--surface-2);
      border: 1.5px solid var(--border-2);
      border-radius: 6px;
      color: var(--text-dim);
      cursor: pointer;
      transition: all 0.12s;
      outline: none;
      flex-shrink: 0;
      font-family: var(--mono);
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .layout-btn svg { width: 14px; height: 14px; pointer-events: none; flex-shrink: 0; }
    .layout-btn:hover {
      color: var(--text-bright);
      background: var(--surface-3);
      border-color: var(--border-2);
    }
    .layout-btn.active {
      background: var(--accent-soft);
      border-color: var(--accent);
      color: var(--accent);
    }

    /* ── Spacer ── */
    .spacer { flex: 1; min-width: 8px; }

    /* ── Status ── */
    .status-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--text-dim);
      flex-shrink: 0;
      white-space: nowrap;
    }
    .status-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--text-dim);
      transition: background 0.25s, box-shadow 0.25s;
      flex-shrink: 0;
    }
    .status-dot.live      { background: var(--green); box-shadow: 0 0 6px var(--green); }
    .status-dot.compiling { background: var(--amber); animation: pulse 0.6s infinite; }
    .status-dot.error     { background: var(--red); box-shadow: 0 0 6px var(--red); }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

    /* ── Settings icon button ── */
    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px; height: 30px;
      background: var(--surface-2);
      border: 1.5px solid var(--border-2);
      border-radius: 6px;
      color: var(--text-dim);
      cursor: pointer;
      transition: all 0.12s;
      outline: none;
      flex-shrink: 0;
    }
    .icon-btn svg { width: 14px; height: 14px; pointer-events: none; }
    .icon-btn:hover {
      color: var(--accent);
      background: var(--accent-soft);
      border-color: var(--accent);
    }
  `;

  @property({ type: String }) framework: FrameworkId = 'lit';
  @property({ type: String }) layout: LayoutId = 'columns';
  @property({ type: String }) status: string = 'idle';
  @property({ type: Array }) plugins: FrameworkPlugin[] = [];

  private _emit(name: string, detail: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="logo">UWC<span class="logo-accent">Pen</span></div>

      <!-- Framework buttons with official logos -->
      <div class="fw-group">
        ${this.plugins.map(fw => html`
          <button
            class="fw-btn ${this.framework === fw.id ? 'active' : ''}"
            @click=${() => this._emit('framework-change', fw.id)}
            title="Switch to ${fw.name}"
          >
            <span class="logo-icon">${unsafeHTML(FRAMEWORK_LOGOS[fw.id] ?? '')}</span>
            ${fw.name}
          </button>
        `)}
      </div>

      <div class="sep"></div>

      <!-- Layout buttons — full label + icon like CodePen -->
      <div class="layout-group">
        ${LAYOUT_OPTIONS.map(opt => html`
          <button
            class="layout-btn ${this.layout === opt.id ? 'active' : ''}"
            @click=${() => this._emit('layout-change', opt.id)}
            title=${opt.label}
          >
            <svg viewBox="0 0 18 16" fill="currentColor">
              ${unsafeHTML(opt.icon)}
            </svg>
            ${opt.label}
          </button>
        `)}
      </div>

      <div class="spacer"></div>

      <!-- Status indicator -->
      <div class="status-row">
        <div class="status-dot ${this.status}"></div>
        <span>${this._statusLabel()}</span>
      </div>

      <!-- Settings -->
      <button class="icon-btn" @click=${() => this._emit('settings-open', null)} title="Import map settings">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
        </svg>
      </button>
    `;
  }

  private _statusLabel(): string {
    return ({ idle:'Ready', compiling:'Compiling…', live:'Live', error:'Error' })[this.status] ?? this.status;
  }
}
