import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type { FrameworkId, LayoutId } from '../types.js';
import { DEFAULT_IMPORTMAPS } from '../config/importmaps.js';
import { FrameworkPlugin, registry } from '../plugins/index.js';
import { CompilerService } from '../engine/compiler.service.js';
import { WorkspaceService } from '../workspace/workspace.service.js';
import { EditorService } from '../workspace/editor.service.js';
import { PANEL_ICONS } from '../config/layouts.js';

import './uwc-header.js';
import './uwc-settings.js';
import './uwc-docs.js';

const LS_KEY_IMPORTMAPS = 'uwcpen_importmaps_v1';
const LS_KEY_EDITORS    = 'uwcpen_editors_v1';
const POST_STORE_URL    = '/__uwcpen_post__';
const VALID_LAYOUTS: LayoutId[] = ['columns','split-left','split-right','editor-only','output-only'];

interface ConsoleEntry { level: string; args: string[]; t: number; }

@customElement('uwc-playground')
export class UwcPlayground extends LitElement {
  static styles = css`
    :host { display:flex; flex-direction:column; height:100%; overflow:hidden; }

    #workspace { flex:1; overflow:hidden; position:relative; display:flex; }

    /* ── Panel ── */
    .dp-panel { overflow:hidden; display:flex; flex-direction:column; min-width:0; min-height:0; }
    .dp-panel-header {
      height:36px; background:var(--surface); border-bottom:1px solid var(--border);
      display:flex; align-items:center; padding:0 14px; gap:8px; flex-shrink:0; user-select:none;
    }
    .dp-panel-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
    .dp-panel-dot.ts      { background:var(--blue);  box-shadow:0 0 5px var(--blue); }
    .dp-panel-dot.scss    { background:#f472b6;       box-shadow:0 0 5px #f472b6; }
    .dp-panel-dot.preview { background:var(--green); box-shadow:0 0 5px var(--green); }
    .dp-panel-label {
      font-size:10.5px; font-weight:600; text-transform:uppercase;
      letter-spacing:0.13em; color:var(--text-dim);
    }
    .dp-panel-body { flex:1; overflow:hidden; position:relative; min-height:0; }
    .dp-panel-icon { display:flex; align-items:center; flex-shrink:0; }

    /* ── Editors column ── */
    .dp-editors-col { display:flex; flex-direction:column; overflow:hidden; min-width:0; min-height:0; }

    /* ── CodeMirror ── */
    .cm-editor { height:100%!important; }
    .cm-scroller { overflow:auto!important; font-family:var(--mono)!important; font-size:13px!important; line-height:1.65!important; }
    .cm-editor.cm-focused { outline:none!important; }

    /* ── Preview panel — split into output + console ── */
    .preview-body {
      display:flex; flex-direction:column; height:100%; overflow:hidden; position:relative;
    }
    #preview-frame { width:100%; border:none; display:block; background:white; flex:1; min-height:0; }
    #error-overlay {
      position:absolute; bottom:0; left:0; right:0;
      background:rgba(10,2,2,0.97); border-top:2px solid var(--red);
      padding:10px 14px; font-size:12px; color:var(--red); font-family:var(--mono);
      display:none; max-height:140px; overflow-y:auto; white-space:pre-wrap;
      z-index:20; line-height:1.6;
    }
    #error-overlay.visible { display:block; }

    /* ── Console strip ── */
    .console-strip {
      flex-shrink:0; border-top:1px solid var(--border);
      background:var(--surface); display:flex; flex-direction:column;
      overflow:hidden; transition:height 0.18s ease;
    }
    .console-strip.open { }
    .console-tab-bar {
      display:flex; align-items:center; padding:0 10px; gap:2px;
      height:32px; flex-shrink:0; border-bottom:1px solid var(--border);
    }
    .console-tab {
      display:flex; align-items:center; gap:5px;
      padding:0 10px; height:24px; border-radius:5px;
      font-family:var(--mono); font-size:11px; font-weight:500;
      background:none; border:none; color:var(--text-dim); cursor:pointer;
      transition:all 0.12s; outline:none; white-space:nowrap;
    }
    .console-tab.active { background:var(--surface-3); color:var(--text-bright); }
    .console-tab:hover  { color:var(--text-2); }
    .console-badge {
      min-width:16px; height:15px; padding:0 4px;
      background:var(--red); border-radius:99px;
      font-size:9px; font-weight:700; color:white;
      display:flex; align-items:center; justify-content:center;
    }
    .console-badge.warn { background:var(--amber); color:#000; }
    .console-clear {
      margin-left:auto; padding:3px 9px; border-radius:5px;
      font-family:var(--mono); font-size:10px; font-weight:500;
      background:none; border:1px solid var(--border); color:var(--text-dim);
      cursor:pointer; transition:all 0.12s; outline:none;
    }
    .console-clear:hover { color:var(--red); border-color:var(--red); }
    .console-entries { flex:1; overflow-y:auto; padding:4px 0; }
    .console-entry {
      display:flex; align-items:baseline; gap:8px;
      padding:3px 12px; font-family:var(--mono); font-size:11.5px; line-height:1.55;
      border-bottom:1px solid rgba(255,255,255,0.03);
    }
    .console-entry.log   { color:var(--text); }
    .console-entry.info  { color:#60a5fa; }
    .console-entry.warn  { color:var(--amber); background:rgba(245,158,11,0.04); }
    .console-entry.error { color:var(--red);   background:rgba(248,113,113,0.05); }
    .console-entry.debug { color:var(--text-dim); }
    .entry-time { font-size:9.5px; color:var(--text-dim); flex-shrink:0; }
    .entry-icon { font-size:11px; flex-shrink:0; }
    .entry-text { flex:1; white-space:pre-wrap; word-break:break-all; }
    .no-logs { padding:18px 14px; font-size:12px; color:var(--text-dim); font-family:var(--mono); font-style:italic; }

    /* ── Gutters ── */
    .gutter { background:var(--border); flex-shrink:0; position:relative; z-index:5; transition:background 0.15s; }
    .gutter::after { content:''; position:absolute; inset:0; opacity:0; background:var(--accent); transition:opacity 0.15s; }
    .gutter:hover::after, .gutter:active::after { opacity:1; }
    .gutter.gutter-horizontal { cursor:col-resize; }
    .gutter.gutter-vertical   { cursor:row-resize; }

    /* ── Mobile tab bar ── */
    .mobile-tab-bar {
      height:52px; background:var(--surface); border-top:1px solid var(--border);
      flex-shrink:0; display:flex; align-items:stretch;
    }
    .mobile-tab {
      flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;
      background:none; border:none; border-top:2px solid transparent;
      color:var(--text-dim); font-family:var(--mono); font-size:10px; font-weight:500;
      cursor:pointer; transition:color 0.12s, border-color 0.12s; outline:none;
    }
    .mobile-tab.active { color:var(--accent); border-top-color:var(--accent); }
    .mobile-tab svg { pointer-events:none; }
  `;

  // ── Public properties ────────────────────────────────────────────────────────
  @property({ type: String }) typescript = '';
  @property({ type: String }) scss       = '';
  @property({ type: String }) framework: FrameworkId = 'lit';
  @property({ type: String }) view: LayoutId = 'columns';
  @property({ type: String }) importmap  = '';

  // ── Internal state ───────────────────────────────────────────────────────────
  @state() private _framework: FrameworkId = 'lit';
  @state() private _layout: LayoutId       = 'columns';
  @state() private _status                 = 'idle';
  @state() private _settingsOpen           = false;
  @state() private _docsOpen               = false;
  @state() private _userImportMaps: Partial<Record<FrameworkId, string>> = {};
  @state() private _consoleLogs: ConsoleEntry[] = [];
  @state() private _consoleTab: 'output' | 'console' = 'output';
  @state() private _consoleUnread = 0;
  @state() private _consoleOpen   = true;
  @state() private _isMobile      = false;
  @state() private _mobilePanel: 'ts' | 'scss' | 'preview' = 'preview';

  /** Frameworks with code supplied via POST (populated in firstUpdated after plugins are registered) */
  @state() private _activePlugins: FrameworkPlugin[] = [];

  // ── Services ─────────────────────────────────────────────────────────────────
  private _compiler!:  CompilerService;
  private _workspace!: WorkspaceService;
  private _editors!:   EditorService;

  // ── Panel DOM refs (live inside shadow root) ──────────────────────────────────
  private _tsPanelEl!:      HTMLElement;
  private _scssPanelEl!:    HTMLElement;
  private _previewPanelEl!: HTMLElement;
  private _tsBodyEl!:       HTMLElement;
  private _scssBodyEl!:     HTMLElement;
  private _previewIframe!:  HTMLIFrameElement;
  private _errorOverlay!:   HTMLElement;
  private _consoleEntriesEl!: HTMLElement;

  private _compileTimer: ReturnType<typeof setTimeout> | null = null;
  private _propsApplied = false;
  private _msgHandler!: (e: MessageEvent) => void;
  private _mql!: MediaQueryList;
  private _mqlHandler!: (e: MediaQueryListEvent) => void;

  // ──────────────────────────────────────────────────────────────────────────
  // Lifecycle
  // ──────────────────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this._loadPersistedState();
    this._readQueryString();
    this._isMobile = window.matchMedia('(max-width: 640px)').matches;
  }

  async firstUpdated() {
    // By the time firstUpdated runs (first Lit microtask), all synchronous module
    // top-level code — including registerBuiltinPlugins() in main.ts — has completed.
    this._activePlugins = registry.getAll();

    this._applyExternalProperties();

    // Try to read POST data delivered by service worker
    await this._loadPostData();

    this._compiler  = new CompilerService();
    this._editors   = new EditorService();

    const wsEl = this.renderRoot.querySelector('#workspace') as HTMLElement;
    this._workspace = new WorkspaceService(wsEl);

    this._buildPanelElements();
    this._applyLayout();

    const saved    = this._loadEditors(this._framework);
    const initTs   = this.typescript  || saved?.ts   || this._currentPlugin.defaultTs;
    const initScss = this.scss        || saved?.scss || this._currentPlugin.defaultScss;

    this._editors.init(this._tsBodyEl, this._scssBodyEl, initTs, initScss);
    this._editors.onContentChange(() => this._scheduleCompile());

    // Console: listen for messages from iframes
    this._msgHandler = (e: MessageEvent) => this._onIframeMessage(e);
    window.addEventListener('message', this._msgHandler);

    // Mobile breakpoint listener
    this._mql = window.matchMedia('(max-width: 640px)');
    this._mqlHandler = (e: MediaQueryListEvent) => {
      this._isMobile = e.matches;
      this._applyLayout();
    };
    this._mql.addEventListener('change', this._mqlHandler);

    this._scheduleCompile(300);
    this._hideBoot();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._compiler?.destroy();
    this._editors?.destroy();
    this._workspace?.destroy();
    window.removeEventListener('message', this._msgHandler);
    this._mql?.removeEventListener('change', this._mqlHandler);
  }

  updated(changed: Map<string, unknown>) {
    if (!this._propsApplied) return;
    if (changed.has('framework') && this.framework !== this._framework)
      this._switchFramework(this.framework as FrameworkId);
    if (changed.has('view') && VALID_LAYOUTS.includes(this.view as LayoutId) && this.view !== this._layout) {
      this._layout = this.view as LayoutId;
      this._applyLayout();
    }
    if (changed.has('typescript') && this.typescript && this._editors)
      this._editors.setTsValue(this.typescript);
    if (changed.has('scss') && this.scss && this._editors)
      this._editors.setScssValue(this.scss);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // POST data loading
  // ──────────────────────────────────────────────────────────────────────────

  private async _loadPostData() {
    try {
      // sessionStorage is populated by the Vercel API bridge (api/post.js) when the
      // form POST comes from a cross-origin page. Fall back to fetching from the SW
      // cache, which handles the local dev case via web-dev-server middleware.
      let data: unknown;
      const ssRaw = sessionStorage.getItem('uwcpen_post');
      if (ssRaw) {
        sessionStorage.removeItem('uwcpen_post');
        data = JSON.parse(ssRaw);
      } else {
        const res = await fetch(POST_STORE_URL);
        data = await res.json();
      }
      if (!data || typeof data !== 'object') return;
      const d = data as Record<string, unknown>;

      const fw = d['framework'] as FrameworkId;
      const vw = d['view'] as LayoutId;
      if (fw && registry.has(fw)) this._framework = fw;
      if (vw && VALID_LAYOUTS.includes(vw)) this._layout = vw;

      // Collect which frameworks have content supplied
      const fwIds: FrameworkId[] = ['lit', 'react', 'vue', 'angular'];
      const suppliedFws = fwIds.filter(id =>
        d[`${id}_typescript`] || d[`${id}_scss`]
      );
      if (suppliedFws.length > 0) {
        // Only show framework buttons for supplied frameworks
        this._activePlugins = registry.getAll().filter(p => suppliedFws.includes(p.id as FrameworkId));
        if (this._activePlugins.length > 0 && !suppliedFws.includes(this._framework)) {
          this._framework = this._activePlugins[0].id as FrameworkId;
        }
      }

      // Store all framework content for use when switching
      const stored: Record<string, { ts: string; scss: string }> = {};
      fwIds.forEach(id => {
        const ts   = d[`${id}_typescript`] as string | undefined;
        const scss = d[`${id}_scss`] as string | undefined;
        if (ts || scss) {
          stored[id] = { ts: ts ?? '', scss: scss ?? '' };
        }
      });
      if (Object.keys(stored).length > 0) {
        try {
          localStorage.setItem(LS_KEY_EDITORS, JSON.stringify(stored));
        } catch { /* noop */ }
      }

      // Override importmaps
      fwIds.forEach(id => {
        const im = d[`${id}_importmap`] as string | undefined;
        if (im) {
          try {
            JSON.parse(im); // validate
            this._userImportMaps = { ...this._userImportMaps, [id]: im };
          } catch { /* ignore invalid */ }
        }
      });

      // Override typescript/scss props if supplied for active framework
      if (d[`${this._framework}_typescript`]) this.typescript = d[`${this._framework}_typescript`] as string;
      if (d[`${this._framework}_scss`])       this.scss       = d[`${this._framework}_scss`] as string;

    } catch { /* no POST data or SW not installed yet */ }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Console message handling
  // ──────────────────────────────────────────────────────────────────────────

  private _onIframeMessage(e: MessageEvent) {
    const d = e.data;
    if (!d || !d.__uwc_console) return;
    const entry: ConsoleEntry = { level: d.level || 'log', args: d.args || [], t: d.t || Date.now() };
    this._consoleLogs = [...this._consoleLogs, entry];
    if (this._consoleTab === 'output') {
      if (entry.level === 'error') this._consoleUnread++;
      else if (entry.level === 'warn' && this._consoleUnread === 0) this._consoleUnread++;
      else if (this._consoleUnread === 0) this._consoleUnread++;
    }
    this._renderConsoleEntries();
  }

  private _renderConsoleEntries() {
    if (!this._consoleEntriesEl) return;
    const iconMap: Record<string, string> = {
      log: '›', info: 'ℹ', warn: '⚠', error: '✕', debug: '·'
    };
    const frag = document.createDocumentFragment();
    if (this._consoleLogs.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'no-logs';
      empty.textContent = 'No console output yet.';
      frag.appendChild(empty);
    } else {
      this._consoleLogs.forEach(entry => {
        const row = document.createElement('div');
        row.className = `console-entry ${entry.level}`;
        const t = new Date(entry.t);
        const timeStr = `${t.getHours().toString().padStart(2,'0')}:${t.getMinutes().toString().padStart(2,'0')}:${t.getSeconds().toString().padStart(2,'0')}`;
        row.innerHTML = `<span class="entry-time">${timeStr}</span><span class="entry-icon">${iconMap[entry.level] ?? '›'}</span><span class="entry-text">${entry.args.join(' ')}</span>`;
        frag.appendChild(row);
      });
    }
    this._consoleEntriesEl.innerHTML = '';
    this._consoleEntriesEl.appendChild(frag);
    this._consoleEntriesEl.scrollTop = this._consoleEntriesEl.scrollHeight;
  }

  private _switchConsoleTab(tab: 'output' | 'console') {
    this._consoleTab = tab;
    if (tab === 'console') {
      this._consoleUnread = 0;
      this._updateConsolePanelVisibility();
      this._renderConsoleEntries();
    } else {
      this._updateConsolePanelVisibility();
    }
    this._updateTabBadge();
  }

  private _updateConsolePanelVisibility() {
    if (!this._consoleEntriesEl) return;
    const strip = this._consoleEntriesEl.closest('.console-strip') as HTMLElement;
    if (!strip) return;
    const body = this._previewPanelEl?.querySelector('.preview-body') as HTMLElement;
    if (!body) return;
    if (this._consoleTab === 'console') {
      this._previewIframe.style.flex = '1';
      strip.style.height = '180px';
      this._consoleEntriesEl.style.display = 'block';
    } else {
      this._consoleEntriesEl.style.display = 'none';
      strip.style.height = '32px'; // just the tab bar
    }
    requestAnimationFrame(() => this._editors?.refreshLayout());
  }

  private _updateTabBadge() {
    const badge = this._previewPanelEl?.querySelector('.console-badge') as HTMLElement;
    if (!badge) return;
    badge.textContent = String(this._consoleLogs.length);
    badge.style.display = this._consoleLogs.length > 0 ? 'flex' : 'none';
    if (this._consoleLogs.some(e => e.level === 'error')) badge.className = 'console-badge';
    else if (this._consoleLogs.some(e => e.level === 'warn')) badge.className = 'console-badge warn';
    else badge.className = 'console-badge';
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
        .plugins=${this._activePlugins}
        @framework-change=${(e: CustomEvent) => this._onFrameworkChange(e.detail)}
        @layout-change=${(e: CustomEvent) => this._onLayoutChange(e.detail)}
        @settings-open=${() => { this._settingsOpen = true; }}
        @docs-open=${() => { this._docsOpen = true; }}
      ></uwc-header>

      <div id="workspace"></div>

      ${this._isMobile ? html`
        <div class="mobile-tab-bar">
          <button
            class="mobile-tab ${this._mobilePanel === 'ts' ? 'active' : ''}"
            @click=${() => this._switchMobilePanel('ts')}
          >
            ${unsafeHTML(PANEL_ICONS.ts)}
            <span>TypeScript</span>
          </button>
          <button
            class="mobile-tab ${this._mobilePanel === 'scss' ? 'active' : ''}"
            @click=${() => this._switchMobilePanel('scss')}
          >
            ${unsafeHTML(PANEL_ICONS.scss)}
            <span>SCSS</span>
          </button>
          <button
            class="mobile-tab ${this._mobilePanel === 'preview' ? 'active' : ''}"
            @click=${() => this._switchMobilePanel('preview')}
          >
            ${unsafeHTML(PANEL_ICONS.preview)}
            <span>Output</span>
          </button>
        </div>
      ` : ''}

      <uwc-settings
        ?open=${this._settingsOpen}
        .framework=${this._framework}
        .userImportMaps=${this._userImportMaps}
        @close-settings=${() => { this._settingsOpen = false; }}
        @save-importmap=${(e: CustomEvent) => this._onSaveImportmap(e.detail)}
        @reset-importmap=${(e: CustomEvent) => this._onResetImportmap(e.detail)}
      ></uwc-settings>

      <uwc-docs
        ?open=${this._docsOpen}
        @close-docs=${() => { this._docsOpen = false; }}
      ></uwc-docs>
    `;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Panel construction
  // ──────────────────────────────────────────────────────────────────────────

  private _buildPanelElements() {
    this._tsPanelEl      = this._makePanel('ts',      'TypeScript', 'ts');
    this._scssPanelEl    = this._makePanel('scss',    'SCSS',       'scss');
    this._previewPanelEl = this._makePreviewPanel();

    this._tsBodyEl   = this._tsPanelEl.querySelector('.dp-panel-body')!  as HTMLElement;
    this._scssBodyEl = this._scssPanelEl.querySelector('.dp-panel-body')! as HTMLElement;
  }

  private _makePanel(type: string, label: string, dotClass: string): HTMLElement {
    const wrap = document.createElement('div');
    wrap.className = 'dp-panel'; wrap.dataset.panel = type;

    const hdr = document.createElement('div');
    hdr.className = 'dp-panel-header';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'dp-panel-icon';
    iconSpan.innerHTML = PANEL_ICONS[dotClass] ?? '';

    const lbl = document.createElement('div');
    lbl.className = 'dp-panel-label'; lbl.textContent = label;
    hdr.append(iconSpan, lbl);

    const body = document.createElement('div');
    body.className = 'dp-panel-body';
    body.style.cssText = 'flex:1;overflow:hidden;min-height:0;';
    wrap.append(hdr, body);
    return wrap;
  }

  private _makePreviewPanel(): HTMLElement {
    const wrap = document.createElement('div');
    wrap.className = 'dp-panel'; wrap.dataset.panel = 'preview';

    const hdr = document.createElement('div');
    hdr.className = 'dp-panel-header';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'dp-panel-icon';
    iconSpan.innerHTML = PANEL_ICONS['preview'] ?? '';

    const lbl = document.createElement('div');
    lbl.className = 'dp-panel-label'; lbl.textContent = 'Output';
    hdr.append(iconSpan, lbl);

    const body = document.createElement('div');
    body.className = 'dp-panel-body';
    body.style.cssText = 'flex:1;overflow:hidden;min-height:0;';

    // Preview area + error overlay + console strip
    const previewBody = document.createElement('div');
    previewBody.className = 'preview-body';

    this._previewIframe = document.createElement('iframe');
    this._previewIframe.id = 'preview-frame';
    this._previewIframe.style.flex = '1';

    this._errorOverlay = document.createElement('div');
    this._errorOverlay.id = 'error-overlay';

    // Console strip
    const strip = document.createElement('div');
    strip.className = 'console-strip';
    strip.style.height = '32px';

    const tabBar = document.createElement('div');
    tabBar.className = 'console-tab-bar';

    const outputTab = document.createElement('button');
    outputTab.className = 'console-tab active'; outputTab.textContent = 'Output';
    outputTab.addEventListener('click', () => this._switchConsoleTab('output'));

    const consoleTab = document.createElement('button');
    consoleTab.className = 'console-tab';

    const consoleLbl = document.createElement('span'); consoleLbl.textContent = 'Console';
    const badge = document.createElement('span');
    badge.className = 'console-badge'; badge.style.display = 'none';

    consoleTab.append(consoleLbl, badge);
    consoleTab.addEventListener('click', () => this._switchConsoleTab('console'));

    const clearBtn = document.createElement('button');
    clearBtn.className = 'console-clear'; clearBtn.textContent = 'Clear';
    clearBtn.addEventListener('click', () => {
      this._consoleLogs = [];
      this._consoleUnread = 0;
      this._renderConsoleEntries();
      this._updateTabBadge();
    });

    tabBar.append(outputTab, consoleTab, clearBtn);

    this._consoleEntriesEl = document.createElement('div');
    this._consoleEntriesEl.className = 'console-entries';
    this._consoleEntriesEl.style.display = 'none';

    strip.append(tabBar, this._consoleEntriesEl);

    previewBody.append(this._previewIframe, this._errorOverlay, strip);
    body.append(previewBody);
    wrap.append(hdr, body);
    return wrap;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Layout
  // ──────────────────────────────────────────────────────────────────────────

  private _applyLayout() {
    if (this._isMobile) {
      this._workspace.prepareForMobile({
        ts:      this._tsPanelEl,
        scss:    this._scssPanelEl,
        preview: this._previewPanelEl,
      });
      this._applyMobilePanel();
      return;
    }
    this._workspace.applyLayout(this._layout, {
      ts:      this._tsPanelEl,
      scss:    this._scssPanelEl,
      preview: this._previewPanelEl,
    });
    requestAnimationFrame(() => this._editors?.refreshLayout());
  }

  private _applyMobilePanel() {
    const show = (el: HTMLElement) =>
      (el.style.cssText = 'flex:1;overflow:hidden;display:flex;flex-direction:column;');
    const hide = (el: HTMLElement) =>
      (el.style.cssText = 'flex:0 0 0px;width:0;min-width:0;overflow:hidden;pointer-events:none;');

    if (this._mobilePanel === 'ts') {
      show(this._tsPanelEl); hide(this._scssPanelEl); hide(this._previewPanelEl);
    } else if (this._mobilePanel === 'scss') {
      hide(this._tsPanelEl); show(this._scssPanelEl); hide(this._previewPanelEl);
    } else {
      hide(this._tsPanelEl); hide(this._scssPanelEl); show(this._previewPanelEl);
    }
    requestAnimationFrame(() => this._editors?.refreshLayout());
  }

  private _switchMobilePanel(panel: 'ts' | 'scss' | 'preview') {
    this._mobilePanel = panel;
    this._applyMobilePanel();
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

    // Clear console for fresh compile
    this._consoleLogs = [];
    this._consoleUnread = 0;
    this._renderConsoleEntries();
    this._updateTabBadge();

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
    if (fw === this._framework || !registry.has(fw)) return;
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
      const stored = JSON.parse(localStorage.getItem(LS_KEY_EDITORS) ?? '{}');
      const entry = stored[fw] ?? null;
      if (!entry) return null;
      // Cache-bust: if the Lit SCSS still has the old `my-counter {` wrapper, discard
      // it so the user gets the corrected shadow-DOM-compatible default snippet.
      if (fw === 'lit' && entry.scss && entry.scss.includes('my-counter {')) return null;
      return entry;
    } catch { return null; }
  }

  private _loadPersistedState() {
    try {
      this._userImportMaps = JSON.parse(localStorage.getItem(LS_KEY_IMPORTMAPS) ?? '{}');
    } catch { /* noop */ }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // URL + helpers
  // ──────────────────────────────────────────────────────────────────────────

  private _readQueryString() {
    const p = new URLSearchParams(location.search);
    const fw = p.get('framework') as FrameworkId;
    const vw = p.get('view') as LayoutId;
    if (fw && registry.has(fw)) this._framework = fw;
    if (vw && VALID_LAYOUTS.includes(vw)) this._layout = vw;
  }

  private _updateUrl() {
    try {
      const url = new URL(location.href);
      url.searchParams.set('framework', this._framework);
      url.searchParams.set('view', this._layout);
      history.replaceState(null, '', url.toString());
    } catch { /* noop in embedded contexts */ }
  }

  private _applyExternalProperties() {
    // Only override the query-string-derived values when the attribute is
    // explicitly present on the element.  Without this guard, Lit's default
    // property values (framework='lit', view='columns') would silently stomp
    // whatever _readQueryString() set moments earlier in connectedCallback.
    if (this.hasAttribute('framework') && registry.has(this.framework))
      this._framework = this.framework;
    if (this.hasAttribute('view') && VALID_LAYOUTS.includes(this.view as LayoutId))
      this._layout = this.view as LayoutId;
    this._propsApplied = true;
  }

  private get _currentPlugin() { return registry.get(this._framework); }

  private _hideBoot() {
    const overlay = document.getElementById('boot-overlay');
    if (!overlay) return;
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.remove(), 450);
  }
}
