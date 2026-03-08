import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { FrameworkId, LayoutId } from '../types.js';
import { DEFAULT_IMPORTMAPS } from '../config/importmaps.js';
import { registry } from '../plugins/index.js';
import { CompilerService } from '../engine/compiler.service.js';
import { WorkspaceService } from '../workspace/workspace.service.js';
import { EditorService } from '../workspace/editor.service.js';

// ── Register sub-components ──────────────────────────────────────────────────
import './uwc-header.js';
import './uwc-settings.js';

const LS_KEY_IMPORTMAPS = 'uwcpen_importmaps_v1';
const LS_KEY_EDITORS    = 'uwcpen_editors_v1';

/**
 * uwc-playground — Full-featured code playground with editors + live preview.
 *
 * Properties let you pre-configure the playground when embedding it:
 *
 * @example
 *   <uwc-playground
 *     framework="react"
 *     view="split-left"
 *     typescript="..."
 *     scss="..."
 *   ></uwc-playground>
 */
@customElement('uwc-playground')
export class UwcPlayground extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    /* ── Workspace container ── */
    #workspace {
      flex: 1;
      overflow: hidden;
      position: relative;
      display: flex;
    }

    /* ── Panel layout ── */
    .dp-panel {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
    }
    .dp-panel-header {
      height: 34px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      padding: 0 14px;
      gap: 8px;
      flex-shrink: 0;
      user-select: none;
    }
    .dp-panel-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .dp-panel-dot.ts      { background: var(--blue);   box-shadow: 0 0 5px var(--blue); }
    .dp-panel-dot.scss    { background: #f472b6;        box-shadow: 0 0 5px #f472b6; }
    .dp-panel-dot.preview { background: var(--green);  box-shadow: 0 0 5px var(--green); }
    .dp-panel-label {
      font-size: 10px; font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--text-dim);
    }
    .dp-panel-body {
      flex: 1;
      overflow: hidden;
      position: relative;
      min-height: 0;
    }

    /* ── Editors column (split layouts) ── */
    .dp-editors-col {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-width: 0;
      min-height: 0;
    }

    /* ── CodeMirror overrides ── */
    .cm-editor { height: 100% !important; }
    .cm-scroller {
      overflow: auto !important;
      font-family: var(--mono) !important;
      font-size: 13px !important;
      line-height: 1.65 !important;
    }
    .cm-editor.cm-focused { outline: none !important; }

    /* ── Preview panel ── */
    #preview-frame {
      width: 100%; height: 100%;
      border: none; display: block;
      background: white;
    }
    #error-overlay {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      background: rgba(10, 2, 2, 0.97);
      border-top: 2px solid var(--red);
      padding: 10px 14px;
      font-size: 12px;
      color: var(--red);
      font-family: var(--mono);
      display: none;
      max-height: 140px;
      overflow-y: auto;
      white-space: pre-wrap;
      z-index: 20;
      line-height: 1.6;
    }
    #error-overlay.visible { display: block; }

    /* ── Split.js gutters ── */
    .gutter {
      background: var(--border);
      flex-shrink: 0;
      position: relative;
      z-index: 5;
      transition: background 0.15s;
    }
    .gutter::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0;
      background: var(--accent);
      transition: opacity 0.15s;
    }
    .gutter:hover::after, .gutter:active::after { opacity: 1; }
    .gutter.gutter-horizontal { cursor: col-resize; }
    .gutter.gutter-vertical   { cursor: row-resize; }
  `;

  // ── Public configurable properties ──────────────────────────────────────────
  /** Pre-load TypeScript content into the TS editor */
  @property({ type: String }) typescript = '';

  /** Pre-load SCSS content into the SCSS editor */
  @property({ type: String }) scss = '';

  /** Initial framework to activate */
  @property({ type: String }) framework: FrameworkId = 'lit';

  /** Initial layout view */
  @property({ type: String }) view: LayoutId = 'columns';

  /** Custom import map JSON string for the active framework */
  @property({ type: String }) importmap = '';

  // ── Internal reactive state ──────────────────────────────────────────────────
  @state() private _framework: FrameworkId = 'lit';
  @state() private _layout: LayoutId = 'columns';
  @state() private _status = 'idle';
  @state() private _settingsOpen = false;
  @state() private _userImportMaps: Partial<Record<FrameworkId, string>> = {};

  // ── Services ─────────────────────────────────────────────────────────────────
  private _compiler!:  CompilerService;
  private _workspace!: WorkspaceService;
  private _editors!:   EditorService;

  // ── Panel DOM refs (live inside shadow root, created imperatively) ───────────
  private _tsPanelEl!:      HTMLElement;
  private _scssPanelEl!:    HTMLElement;
  private _previewPanelEl!: HTMLElement;
  private _tsBodyEl!:       HTMLElement;
  private _scssBodyEl!:     HTMLElement;
  private _previewIframe!:  HTMLIFrameElement;
  private _errorOverlay!:   HTMLElement;

  private _compileTimer: ReturnType<typeof setTimeout> | null = null;
  private _propertiesApplied = false;

  // ──────────────────────────────────────────────────────────────────────────
  // Lifecycle
  // ──────────────────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this._loadPersistedState();
    this._readQueryString();
  }

  firstUpdated() {
    // Apply property values (may have been set before firstUpdated via attributes)
    this._applyExternalProperties();

    this._compiler  = new CompilerService();
    this._editors   = new EditorService();

    const wsEl = this.renderRoot.querySelector('#workspace') as HTMLElement;
    this._workspace = new WorkspaceService(wsEl);

    this._buildPanelElements();

    // Layout FIRST — panels must have real pixel sizes before CM mounts
    this._applyLayout();

    // Determine initial editor content (prop > localStorage > plugin default)
    const savedEditors = this._loadEditors(this._framework);
    const initTs   = this.typescript  || savedEditors?.ts   || this._currentPlugin.defaultTs;
    const initScss = this.scss        || savedEditors?.scss || this._currentPlugin.defaultScss;

    this._editors.init(this._tsBodyEl, this._scssBodyEl, initTs, initScss);
    this._editors.onContentChange(() => this._scheduleCompile());

    this._scheduleCompile(300);
    this._hideBoot();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._compiler.destroy();
    this._editors.destroy();
    this._workspace.destroy();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Property change reactions
  // ──────────────────────────────────────────────────────────────────────────

  updated(changed: Map<string, unknown>) {
    if (!this._propertiesApplied) return; // firstUpdated not yet done

    if (changed.has('framework') && this.framework !== this._framework) {
      this._switchFramework(this.framework as FrameworkId);
    }
    if (changed.has('view') && this.view !== this._layout) {
      this._layout = this.view as LayoutId;
      this._applyLayout();
    }
    if (changed.has('typescript') && this.typescript && this._editors) {
      this._editors.setTsValue(this.typescript);
    }
    if (changed.has('scss') && this.scss && this._editors) {
      this._editors.setScssValue(this.scss);
    }
  }

  private _applyExternalProperties() {
    if (this.framework && registry.has(this.framework)) this._framework = this.framework;
    const validLayouts: LayoutId[] = ['columns','split-left','split-right','editor-only','output-only'];
    if (this.view && validLayouts.includes(this.view as LayoutId)) this._layout = this.view as LayoutId;
    this._propertiesApplied = true;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────────────────

  render() {
    return html`
      <uwc-header
        .framework=${this._framework}
        .layout=${this._layout}
        .status=${this._status}
        .plugins=${registry.getAll()}
        @framework-change=${(e: CustomEvent) => this._onFrameworkChange(e.detail)}
        @layout-change=${(e: CustomEvent) => this._onLayoutChange(e.detail)}
        @settings-open=${() => { this._settingsOpen = true; }}
      ></uwc-header>

      <div id="workspace"></div>

      <uwc-settings
        ?open=${this._settingsOpen}
        .framework=${this._framework}
        .userImportMaps=${this._userImportMaps}
        @close-settings=${() => { this._settingsOpen = false; }}
        @save-importmap=${(e: CustomEvent) => this._onSaveImportmap(e.detail)}
        @reset-importmap=${(e: CustomEvent) => this._onResetImportmap(e.detail)}
      ></uwc-settings>
    `;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Panel DOM construction
  // ──────────────────────────────────────────────────────────────────────────

  private _buildPanelElements() {
    this._tsPanelEl      = this._makePanel('ts',      'TypeScript', 'ts');
    this._scssPanelEl    = this._makePanel('scss',    'SCSS',       'scss');
    this._previewPanelEl = this._makePanel('preview', 'Output',     'preview');

    this._tsBodyEl   = this._tsPanelEl.querySelector('.dp-panel-body')!  as HTMLElement;
    this._scssBodyEl = this._scssPanelEl.querySelector('.dp-panel-body')! as HTMLElement;

    const previewBody = this._previewPanelEl.querySelector('.dp-panel-body')! as HTMLElement;
    previewBody.style.position = 'relative';

    this._previewIframe = document.createElement('iframe');
    this._previewIframe.id = 'preview-frame';

    this._errorOverlay = document.createElement('div');
    this._errorOverlay.id = 'error-overlay';

    previewBody.append(this._previewIframe, this._errorOverlay);
  }

  private _makePanel(type: string, label: string, dotClass: string): HTMLElement {
    const wrap = document.createElement('div');
    wrap.className = 'dp-panel';
    wrap.dataset.panel = type;

    const hdr = document.createElement('div');
    hdr.className = 'dp-panel-header';

    const dot = document.createElement('div');
    dot.className = `dp-panel-dot ${dotClass}`;

    const lbl = document.createElement('div');
    lbl.className = 'dp-panel-label';
    lbl.textContent = label;

    hdr.append(dot, lbl);

    const body = document.createElement('div');
    body.className = 'dp-panel-body';
    body.style.cssText = 'flex:1;overflow:hidden;min-height:0;';

    wrap.append(hdr, body);
    return wrap;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Layout
  // ──────────────────────────────────────────────────────────────────────────

  private _applyLayout() {
    this._workspace.applyLayout(this._layout, {
      ts:      this._tsPanelEl,
      scss:    this._scssPanelEl,
      preview: this._previewPanelEl,
    });
    requestAnimationFrame(() => this._editors?.refreshLayout());
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Compilation
  // ──────────────────────────────────────────────────────────────────────────

  private _scheduleCompile(delay = 500) {
    if (this._compileTimer) clearTimeout(this._compileTimer);
    this._status = 'compiling';
    this._compileTimer = setTimeout(() => this._compile(), delay);
  }

  private _compile() {
    const plugin = this._currentPlugin;

    this._compiler.compile(
      this._editors.getTsValue(),
      this._editors.getScssValue(),
      this._framework,
      plugin.getCompilerOptions() as unknown as Record<string, unknown>,
      (result) => {
        if (!result.success) {
          this._errorOverlay.textContent = result.error ?? 'Unknown error';
          this._errorOverlay.classList.add('visible');
          this._status = 'error';
          return;
        }
        this._errorOverlay.classList.remove('visible');
        this._previewIframe.srcdoc = plugin.buildIframe(
          result.js!, result.css!, this._effectiveImportMap()
        );
        this._status = 'live';
        this._persistEditors();
      },
    );
  }

  private _effectiveImportMap() {
    // Priority: component importmap prop > user settings > plugin default
    if (this.importmap) {
      try { return JSON.parse(this.importmap); } catch { /* fall through */ }
    }
    const raw = this._userImportMaps[this._framework];
    if (raw) {
      try { return JSON.parse(raw); } catch { /* fall through */ }
    }
    return DEFAULT_IMPORTMAPS[this._framework];
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Event handlers
  // ──────────────────────────────────────────────────────────────────────────

  private _onFrameworkChange(fw: FrameworkId) {
    this._persistEditors();
    this._switchFramework(fw);
    this._updateUrl();
  }

  private _switchFramework(fw: FrameworkId) {
    if (fw === this._framework) return;
    this._framework = fw;
    const saved = this._loadEditors(fw);
    this._editors.setTsValue(saved?.ts   ?? this._currentPlugin.defaultTs);
    this._editors.setScssValue(saved?.scss ?? this._currentPlugin.defaultScss);
    this._scheduleCompile(100);
  }

  private _onLayoutChange(layout: LayoutId) {
    this._layout = layout;
    this._applyLayout();
    this._updateUrl();
  }

  private _onSaveImportmap({ framework, value }: { framework: FrameworkId; value: string | null }) {
    const updated = { ...this._userImportMaps };
    if (value === null) delete updated[framework];
    else updated[framework] = value;
    this._userImportMaps = updated;
    try { localStorage.setItem(LS_KEY_IMPORTMAPS, JSON.stringify(updated)); } catch { /* noop */ }
    this._scheduleCompile(0);
  }

  private _onResetImportmap({ framework }: { framework: FrameworkId }) {
    this._onSaveImportmap({ framework, value: null });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Persistence
  // ──────────────────────────────────────────────────────────────────────────

  private _persistEditors() {
    if (!this._editors) return;
    try {
      const stored: Record<string, { ts: string; scss: string }> =
        JSON.parse(localStorage.getItem(LS_KEY_EDITORS) ?? '{}');
      stored[this._framework] = {
        ts:   this._editors.getTsValue(),
        scss: this._editors.getScssValue(),
      };
      localStorage.setItem(LS_KEY_EDITORS, JSON.stringify(stored));
    } catch { /* noop */ }
  }

  private _loadEditors(fw: FrameworkId): { ts: string; scss: string } | null {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY_EDITORS) ?? '{}')[fw] ?? null;
    } catch { return null; }
  }

  private _loadPersistedState() {
    try {
      this._userImportMaps = JSON.parse(localStorage.getItem(LS_KEY_IMPORTMAPS) ?? '{}');
    } catch { /* noop */ }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // URL query-string
  // ──────────────────────────────────────────────────────────────────────────

  private _readQueryString() {
    const params = new URLSearchParams(location.search);
    const fw     = params.get('framework') as FrameworkId | null;
    const view   = params.get('view') as LayoutId | null;
    const validLayouts: LayoutId[] = ['columns','split-left','split-right','editor-only','output-only'];

    if (fw && registry.has(fw)) this._framework = fw;
    if (view && validLayouts.includes(view)) this._layout = view;
  }

  private _updateUrl() {
    try {
      const url = new URL(location.href);
      url.searchParams.set('framework', this._framework);
      url.searchParams.set('view', this._layout);
      history.replaceState(null, '', url.toString());
    } catch { /* noop in embedded contexts */ }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Helpers
  // ──────────────────────────────────────────────────────────────────────────

  private get _currentPlugin() { return registry.get(this._framework); }

  private _hideBoot() {
    const overlay = document.getElementById('boot-overlay');
    if (!overlay) return;
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.remove(), 450);
  }
}
