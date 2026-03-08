import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { FrameworkId, LayoutId } from '../types.js';
import { DEFAULT_IMPORTMAPS } from '../config/importmaps.js';
import { registry } from '../plugins/index.js';
import { CompilerService } from '../engine/compiler.service.js';
import { WorkspaceService } from '../workspace/workspace.service.js';
import { EditorService } from '../workspace/editor.service.js';

// ── import components so they self-register ──────────────────────────────────
import './header-bar.js';
import './settings-modal.js';

const LS_KEY_IMPORTMAPS = 'devpen_importmaps_v2';
const LS_KEY_EDITORS    = 'devpen_editors_v2';

@customElement('devpen-app')
export class DevpenApp extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100dvh;
      overflow: hidden;
    }

    /* ── Workspace ── */
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
    .dp-panel-dot.ts      { background: var(--blue); box-shadow: 0 0 5px var(--blue); }
    .dp-panel-dot.scss    { background: #f472b6; box-shadow: 0 0 5px #f472b6; }
    .dp-panel-dot.preview { background: var(--green); box-shadow: 0 0 5px var(--green); }
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
    .cm-editor {
      height: 100% !important;
    }
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
      background: rgba(12, 4, 4, 0.97);
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

    /* ── Split.js gutters (must live in shadow root too) ── */
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

  // ── Reactive state ─────────────────────────────────────────────────────────
  @state() private _framework: FrameworkId  = 'lit';
  @state() private _layout: LayoutId         = 'columns';
  @state() private _status                   = 'idle';
  @state() private _settingsOpen             = false;
  @state() private _userImportMaps: Partial<Record<FrameworkId, string>> = {};

  // ── Services ───────────────────────────────────────────────────────────────
  private _compiler!:  CompilerService;
  private _workspace!: WorkspaceService;
  private _editors!:   EditorService;

  // ── Panel DOM elements (live in workspace, outside shadow DOM tree) ─────────
  // Kept as direct class-level references — never use document.getElementById()
  // for these because they live outside this component's shadow root.
  private _tsPanelEl!:      HTMLElement;
  private _scssPanelEl!:    HTMLElement;
  private _previewPanelEl!: HTMLElement;
  private _tsBodyEl!:       HTMLElement;
  private _scssBodyEl!:     HTMLElement;
  private _previewIframe!:  HTMLIFrameElement;
  private _errorOverlay!:   HTMLElement;

  // ── Compile debounce ───────────────────────────────────────────────────────
  private _compileTimer: ReturnType<typeof setTimeout> | null = null;

  // ──────────────────────────────────────────────────────────────────────────
  // Lifecycle
  // ──────────────────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this._loadPersistedState();
    this._readQueryString();
  }

  firstUpdated() {
    this._compiler  = new CompilerService();
    this._editors   = new EditorService();

    const wsEl = this.renderRoot.querySelector('#workspace') as HTMLElement;
    this._workspace = new WorkspaceService(wsEl);

    this._buildPanelElements();

    // Attach panels to the DOM FIRST so CodeMirror can measure real dimensions
    this._applyLayout();

    // Now initialise editors into already-laid-out, visible elements
    const savedEditors = this._loadEditors(this._framework);
    this._editors.init(
      this._tsBodyEl,
      this._scssBodyEl,
      savedEditors?.ts   ?? this._currentPlugin.defaultTs,
      savedEditors?.scss ?? this._currentPlugin.defaultScss,
    );
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
  // Render
  // ──────────────────────────────────────────────────────────────────────────

  render() {
    return html`
      <devpen-header
        .framework=${this._framework}
        .layout=${this._layout}
        .status=${this._status}
        .plugins=${registry.getAll()}
        @framework-change=${(e: CustomEvent) => this._onFrameworkChange(e.detail)}
        @layout-change=${(e: CustomEvent) => this._onLayoutChange(e.detail)}
        @settings-open=${() => { this._settingsOpen = true; }}
      ></devpen-header>

      <div id="workspace"></div>

      <devpen-settings
        ?open=${this._settingsOpen}
        .framework=${this._framework}
        .userImportMaps=${this._userImportMaps}
        @close-settings=${() => { this._settingsOpen = false; }}
        @save-importmap=${(e: CustomEvent) => this._onSaveImportmap(e.detail)}
        @reset-importmap=${(e: CustomEvent) => this._onResetImportmap(e.detail)}
      ></devpen-settings>
    `;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Panel element construction (panels live outside Lit template, in workspace)
  // ──────────────────────────────────────────────────────────────────────────

  private _buildPanelElements() {
    this._tsPanelEl      = this._makePanel('ts',      'TypeScript',  'ts');
    this._scssPanelEl    = this._makePanel('scss',    'SCSS',        'scss');
    this._previewPanelEl = this._makePanel('preview', 'Output',      'preview');

    this._tsBodyEl   = this._tsPanelEl.querySelector('.dp-panel-body')!  as HTMLElement;
    this._scssBodyEl = this._scssPanelEl.querySelector('.dp-panel-body')! as HTMLElement;

    // Store direct element references — these live in the light DOM outside
    // this component's shadow root, so document.getElementById() cannot reach them.
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
    body.style.cssText = 'flex:1;overflow:hidden;';

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
    // Give CM a tick to recalculate after layout change
    requestAnimationFrame(() => this._editors.refreshLayout());
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
    const opts   = plugin.getCompilerOptions();

    this._compiler.compile(
      this._editors.getTsValue(),
      this._editors.getScssValue(),
      this._framework,
      opts as unknown as Record<string, unknown>,
      (result) => {
        // Use stored references — avoids document.getElementById() crossing shadow root
        if (!result.success) {
          this._errorOverlay.textContent = result.error ?? 'Unknown error';
          this._errorOverlay.classList.add('visible');
          this._status = 'error';
          return;
        }

        this._errorOverlay.classList.remove('visible');
        const importMap = this._effectiveImportMap();
        this._previewIframe.srcdoc = plugin.buildIframe(result.js!, result.css!, importMap);
        this._status = 'live';
        this._persistEditors();
      },
    );
  }

  private _effectiveImportMap() {
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
    if (fw === this._framework) return;
    // Persist current editor content before switching
    this._persistEditors();

    this._framework = fw;
    const plugin = this._currentPlugin;
    const saved  = this._loadEditors(fw);

    this._editors.setTsValue(saved?.ts   ?? plugin.defaultTs);
    this._editors.setScssValue(saved?.scss ?? plugin.defaultScss);
    this._scheduleCompile(100);
    this._updateUrl();
  }

  private _onLayoutChange(layout: LayoutId) {
    this._layout = layout;
    this._applyLayout();
    this._updateUrl();
  }

  private _onSaveImportmap({ framework, value }: { framework: FrameworkId; value: string | null }) {
    const updated = { ...this._userImportMaps };
    if (value === null) {
      delete updated[framework];
    } else {
      updated[framework] = value;
    }
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
      const stored = JSON.parse(localStorage.getItem(LS_KEY_EDITORS) ?? '{}');
      return stored[fw] ?? null;
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
    const layout = params.get('view') as LayoutId | null;

    if (fw && registry.has(fw)) this._framework = fw;
    const validLayouts: LayoutId[] = ['columns', 'split-left', 'split-right', 'editor-only', 'output-only'];
    if (layout && validLayouts.includes(layout)) this._layout = layout;
  }

  private _updateUrl() {
    const url = new URL(location.href);
    url.searchParams.set('framework', this._framework);
    url.searchParams.set('view',      this._layout);
    history.replaceState(null, '', url.toString());
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
