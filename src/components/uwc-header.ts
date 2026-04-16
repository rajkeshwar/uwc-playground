import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { FrameworkId, LayoutId } from '../types.js';
import type { FrameworkPlugin } from '../plugins/plugin.interface.js';
import { LAYOUT_OPTIONS, LAYOUT_PREFIX_ICONS } from '../config/layouts.js';
import { FRAMEWORK_LOGOS } from '../config/framework-logos.js';

@customElement('uwc-header')
export class UwcHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      height: 56px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 0 14px;
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
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.05em;
      color: var(--text-bright);
      padding-right: 14px;
      border-right: 1px solid var(--border-2);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .logo-accent { color: var(--accent); }

    /* ── Framework buttons ── */
    .fw-group { display: flex; gap: 5px; align-items: center; flex-shrink: 0; }

    .fw-btn {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 0 14px;
      height: 34px;
      border-radius: 7px;
      border: 1.5px solid var(--border-2);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--mono);
      font-size: 12.5px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.13s ease;
      white-space: nowrap;
      outline: none;
      flex-shrink: 0;
    }
    .fw-btn .fw-icon {
      display: flex; align-items: center;
      opacity: 0.65;
      transition: opacity 0.13s;
      flex-shrink: 0;
    }
    .fw-btn:hover {
      color: var(--text-bright);
      background: var(--surface-3);
      border-color: rgba(255,255,255,0.12);
    }
    .fw-btn:hover .fw-icon { opacity: 0.9; }

    /* Active: accent border + background glow — same style as layout buttons */
    .fw-btn.active {
      border-color: var(--accent);
      background: var(--accent-soft);
      color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-glow);
    }
    .fw-btn.active .fw-icon { opacity: 1; }

    /* ── Separator ── */
    .sep { width: 1px; height: 26px; background: var(--border-2); flex-shrink: 0; }

    /* ── Layout group ── */
    .layout-group { display: flex; gap: 4px; flex-shrink: 0; }

    .layout-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 9px;
      height: 34px;
      background: var(--surface-2);
      border: 1.5px solid var(--border-2);
      border-radius: 7px;
      color: var(--text-dim);
      cursor: pointer;
      transition: all 0.12s;
      outline: none;
      flex-shrink: 0;
      font-family: var(--mono);
      font-size: 11.5px;
      font-weight: 500;
      white-space: nowrap;
    }
    .layout-btn svg { pointer-events: none; flex-shrink: 0; }
    .layout-btn:hover {
      color: var(--text-bright);
      background: var(--surface-3);
      border-color: rgba(255,255,255,0.12);
    }
    .layout-btn.active {
      border-color: var(--accent);
      background: var(--accent-soft);
      color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-glow);
    }

    /* ── Spacer ── */
    .spacer { flex: 1; min-width: 6px; }

    /* ── Status ── */
    .status-row {
      display: flex; align-items: center; gap: 6px;
      font-size: 11.5px; color: var(--text-dim);
      flex-shrink: 0; white-space: nowrap;
    }
    .status-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--text-dim);
      transition: background 0.25s, box-shadow 0.25s;
      flex-shrink: 0;
    }
    .status-dot.live      { background: var(--green); box-shadow: 0 0 6px var(--green); }
    .status-dot.compiling { background: var(--amber); animation: pulse 0.6s infinite; }
    .status-dot.error     { background: var(--red);   box-shadow: 0 0 6px var(--red); }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

    /* ── Responsive: mobile ── */
    @media (max-width: 640px) {
      :host { padding: 0 10px; gap: 6px; }
      .layout-group { display: none; }
      .sep { display: none; }
      .fw-label { display: none; }
      .fw-btn { padding: 0 10px; }
      .status-row span { display: none; }
      .logo-accent { display: none; }
    }

    /* ── Icon buttons (settings, docs) ── */
    .icon-btn {
      display: flex; align-items: center; justify-content: center;
      width: 34px; height: 34px;
      background: var(--surface-2);
      border: 1.5px solid var(--border-2);
      border-radius: 7px;
      color: var(--text-dim);
      cursor: pointer;
      transition: all 0.12s;
      outline: none;
      flex-shrink: 0;
    }
    .icon-btn svg { pointer-events: none; }
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

  private _emit(name: string, detail: unknown = null) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="logo">UWC<span class="logo-accent">Pen</span></div>

      <!-- Framework buttons -->
      <div class="fw-group">
        ${this.plugins.map(fw => html`
          <button
            class="fw-btn ${this.framework === fw.id ? 'active' : ''}"
            @click=${() => this._emit('framework-change', fw.id)}
            title="Switch to ${fw.name}"
          >
            <span class="fw-icon">${unsafeHTML(FRAMEWORK_LOGOS[fw.id] ?? '')}</span>
            <span class="fw-label">${fw.name}</span>
          </button>
        `)}
      </div>

      <div class="sep"></div>

      <!-- Layout buttons — icon-only for structural layouts, icon+label for Editors/Preview -->
      <div class="layout-group">
        ${LAYOUT_OPTIONS.map(opt => html`
          <button
            class="layout-btn ${this.layout === opt.id ? 'active' : ''}"
            @click=${() => this._emit('layout-change', opt.id)}
            title=${opt.label}
          >
            ${unsafeHTML(LAYOUT_PREFIX_ICONS[opt.id] ?? '')}
            ${(opt.id === 'editor-only' || opt.id === 'output-only') ? opt.label : ''}
          </button>
        `)}
      </div>

      <div class="spacer"></div>

      <!-- Status -->
      <div class="status-row">
        <div class="status-dot ${this.status}"></div>
        <span>${this._statusLabel()}</span>
      </div>

      <!-- Docs / Dynamic Usage button -->
      <button class="icon-btn" @click=${() => this._emit('docs-open')} title="Integration Guide &amp; Form POST Usage">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Import Map Settings -->
      <button class="icon-btn" @click=${() => this._emit('settings-open')} title="Import Map Settings">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
        </svg>
      </button>
    `;
  }

  private _statusLabel(): string {
    return ({ idle:'Ready', compiling:'Compiling…', live:'Live', error:'Error' })[this.status] ?? this.status;
  }
}
