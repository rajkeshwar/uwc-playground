import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { FrameworkId, LayoutId } from '../types.js';
import type { FrameworkPlugin } from '../plugins/plugin.interface.js';
import { LAYOUT_OPTIONS } from '../config/layouts.js';

@customElement('devpen-header')
export class DevpenHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      height: 52px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 0 14px;
      gap: 10px;
      flex-shrink: 0;
      position: relative;
      z-index: 50;
      user-select: none;
    }

    /* ── Logo ── */
    .logo {
      font-family: var(--sans);
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.04em;
      color: var(--text-bright);
      padding-right: 14px;
      border-right: 1px solid var(--border);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .logo-accent { color: var(--accent); }

    /* ── Framework tabs ── */
    .fw-group {
      display: flex;
      gap: 5px;
      align-items: center;
    }

    .fw-btn {
      position: relative;
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 0 14px;
      height: 32px;
      border-radius: var(--radius);
      border: 1.5px solid var(--border-2);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--mono);
      font-size: 11.5px;
      font-weight: 500;
      letter-spacing: 0.03em;
      cursor: pointer;
      transition: all 0.14s ease;
      white-space: nowrap;
      outline: none;
    }
    .fw-btn:hover {
      border-color: var(--accent-glow);
      color: var(--text-2);
      background: var(--surface-3);
    }
    .fw-btn.active {
      border-color: var(--fw-color, var(--accent));
      background: color-mix(in srgb, var(--fw-color, var(--accent)) 12%, transparent);
      color: var(--fw-color, var(--accent));
      box-shadow: 0 0 12px color-mix(in srgb, var(--fw-color, var(--accent)) 20%, transparent);
    }
    .fw-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: var(--fw-color, var(--accent));
      flex-shrink: 0;
    }

    /* ── Separator ── */
    .sep {
      width: 1px;
      height: 26px;
      background: var(--border-2);
      flex-shrink: 0;
    }

    /* ── Layout buttons ── */
    .layout-group {
      display: flex;
      gap: 3px;
      background: var(--surface-2);
      padding: 4px;
      border-radius: 9px;
      border: 1px solid var(--border);
    }

    .layout-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px; height: 26px;
      background: none;
      border: 1.5px solid transparent;
      border-radius: 5px;
      color: var(--text-dim);
      cursor: pointer;
      transition: all 0.12s;
      outline: none;
    }
    .layout-btn svg { width: 18px; height: 18px; pointer-events: none; }
    .layout-btn:hover { color: var(--text-2); background: var(--surface-3); }
    .layout-btn.active {
      background: var(--accent-soft);
      border-color: var(--accent-glow);
      color: var(--accent);
    }

    /* ── Spacer ── */
    .spacer { flex: 1; }

    /* ── Status ── */
    .status-row {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 11px;
      color: var(--text-dim);
    }
    .status-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: var(--text-dim);
      transition: background 0.25s, box-shadow 0.25s;
    }
    .status-dot.live     { background: var(--green); box-shadow: 0 0 7px var(--green); }
    .status-dot.compiling { background: var(--amber); animation: pulse 0.6s infinite; }
    .status-dot.error    { background: var(--red); box-shadow: 0 0 7px var(--red); }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    /* ── Settings button ── */
    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px; height: 32px;
      background: var(--surface-2);
      border: 1.5px solid var(--border-2);
      border-radius: var(--radius);
      color: var(--text-dim);
      cursor: pointer;
      transition: all 0.12s;
      outline: none;
      flex-shrink: 0;
    }
    .icon-btn svg { width: 15px; height: 15px; pointer-events: none; }
    .icon-btn:hover {
      border-color: var(--accent-glow);
      color: var(--accent);
      background: var(--accent-soft);
    }
  `;

  @property({ type: String }) framework: FrameworkId = 'lit';
  @property({ type: String }) layout: LayoutId = 'columns';
  @property({ type: String }) status: string = 'idle';
  @property({ type: Array }) plugins: FrameworkPlugin[] = [];

  private _fwColor(fw: FrameworkPlugin): string {
    return fw.color;
  }

  private _onFw(id: string) {
    this.dispatchEvent(new CustomEvent('framework-change', { detail: id, bubbles: true, composed: true }));
  }
  private _onLayout(id: string) {
    this.dispatchEvent(new CustomEvent('layout-change', { detail: id, bubbles: true, composed: true }));
  }
  private _onSettings() {
    this.dispatchEvent(new CustomEvent('settings-open', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="logo">Dev<span class="logo-accent">Pen</span></div>

      <div class="fw-group">
        ${this.plugins.map(fw => html`
          <button
            class="fw-btn ${this.framework === fw.id ? 'active' : ''}"
            style="--fw-color: ${this._fwColor(fw)}"
            @click=${() => this._onFw(fw.id)}
            title=${fw.name}
          >
            <span class="fw-dot"></span>
            ${fw.name}
          </button>
        `)}
      </div>

      <div class="sep"></div>

      <div class="layout-group">
        ${LAYOUT_OPTIONS.map(opt => html`
          <button
            class="layout-btn ${this.layout === opt.id ? 'active' : ''}"
            @click=${() => this._onLayout(opt.id)}
            title=${opt.label}
          >
            <svg viewBox="0 0 18 16" fill="currentColor">
              ${unsafeHTML(opt.icon)}
            </svg>
          </button>
        `)}
      </div>

      <div class="spacer"></div>

      <div class="status-row">
        <div class="status-dot ${this.status}"></div>
        <span>${this._statusLabel()}</span>
      </div>

      <button class="icon-btn" @click=${this._onSettings} title="Import map settings">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
        </svg>
      </button>
    `;
  }

  private _statusLabel(): string {
    const map: Record<string, string> = {
      idle:      'Ready',
      compiling: 'Compiling…',
      live:      'Live',
      error:     'Error',
    };
    return map[this.status] ?? this.status;
  }
}
