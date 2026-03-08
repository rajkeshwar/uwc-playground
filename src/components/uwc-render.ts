import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { FrameworkId, ImportMap } from '../types.js';
import { registry } from '../plugins/index.js';
import { DEFAULT_IMPORTMAPS } from '../config/importmaps.js';
import { CompilerService } from '../engine/compiler.service.js';

/**
 * uwc-render — Standalone renderer component.
 *
 * Accepts typescript + scss source code, compiles them internally via a Web
 * Worker, and renders the result in a sandboxed iframe.  No editor UI — this
 * is meant for embedding a live preview anywhere in your application.
 *
 * @example
 *   <uwc-render
 *     framework="react"
 *     typescript="..."
 *     scss="..."
 *   ></uwc-render>
 */
@customElement('uwc-render')
export class UwcRender extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    iframe {
      width: 100%; height: 100%;
      border: none;
      display: block;
      background: white;
    }

    .error-bar {
      display: none;
      position: absolute;
      bottom: 0; left: 0; right: 0;
      background: rgba(10, 2, 2, 0.96);
      border-top: 2px solid #f87171;
      color: #f87171;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      padding: 10px 14px;
      max-height: 130px;
      overflow-y: auto;
      white-space: pre-wrap;
      line-height: 1.6;
      z-index: 10;
    }
    .error-bar.visible { display: block; }

    .status-badge {
      position: absolute;
      top: 8px; right: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 99px;
      background: rgba(0,0,0,0.5);
      color: white;
      pointer-events: none;
      transition: opacity 0.3s;
      opacity: 0;
    }
    .status-badge.compiling { opacity: 1; }
  `;

  /** TypeScript source code to compile and render */
  @property({ type: String }) typescript = '';

  /** SCSS source code to compile and inject */
  @property({ type: String }) scss = '';

  /** Framework to use for rendering */
  @property({ type: String }) framework: FrameworkId = 'lit';

  /**
   * Custom import map as a JSON string.
   * If omitted, the default import map for the selected framework is used.
   */
  @property({ type: String }) importmap = '';

  @state() private _status: 'idle' | 'compiling' | 'live' | 'error' = 'idle';
  @state() private _error  = '';
  @state() private _srcdoc = '';

  private _compiler!: CompilerService;
  private _debounce: ReturnType<typeof setTimeout> | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._compiler = new CompilerService();
    this._scheduleCompile(100);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._compiler.destroy();
    if (this._debounce) clearTimeout(this._debounce);
  }

  updated(changed: Map<string, unknown>) {
    const watched = ['typescript', 'scss', 'framework', 'importmap'];
    if (watched.some(k => changed.has(k))) {
      this._scheduleCompile(300);
    }
  }

  private _scheduleCompile(delay = 400) {
    if (this._debounce) clearTimeout(this._debounce);
    this._status = 'compiling';
    this._debounce = setTimeout(() => this._compile(), delay);
  }

  private _compile() {
    if (!this.typescript && !this.scss) return;

    const pluginId = registry.has(this.framework) ? this.framework : 'lit';
    const plugin   = registry.get(pluginId);
    const opts     = plugin.getCompilerOptions();

    this._compiler.compile(
      this.typescript,
      this.scss,
      pluginId,
      opts as unknown as Record<string, unknown>,
      (result) => {
        if (!result.success) {
          this._error  = result.error ?? 'Unknown compilation error';
          this._status = 'error';
          return;
        }

        this._error  = '';
        this._status = 'live';
        const importMap = this._resolveImportMap(pluginId);
        this._srcdoc = plugin.buildIframe(result.js!, result.css!, importMap);
      },
    );
  }

  private _resolveImportMap(pluginId: FrameworkId): ImportMap {
    if (this.importmap) {
      try { return JSON.parse(this.importmap) as ImportMap; } catch { /* fall through */ }
    }
    return DEFAULT_IMPORTMAPS[pluginId];
  }

  render() {
    return html`
      <iframe .srcdoc=${this._srcdoc} sandbox="allow-scripts allow-same-origin"></iframe>
      <div class="error-bar ${this._error ? 'visible' : ''}">${this._error}</div>
      <div class="status-badge ${this._status === 'compiling' ? 'compiling' : ''}">Compiling…</div>
    `;
  }
}
