import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('uwc-docs')
export class UwcDocs extends LitElement {
  static styles = css`
    :host { display: none; }
    :host([open]) { display: block; }

    .overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(8px);
      z-index: 200;
      display: flex; align-items: center; justify-content: center;
      animation: fade-in 0.15s ease;
    }
    @keyframes fade-in { from{opacity:0} to{opacity:1} }

    .modal {
      background: var(--surface);
      border: 1px solid var(--border-2);
      border-radius: 16px;
      width: min(880px, 96vw);
      height: min(700px, 92vh);
      display: flex; flex-direction: column;
      overflow: hidden;
      box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,106,255,0.1);
      animation: slide-up 0.2s ease;
    }
    @keyframes slide-up { from{transform:translateY(14px);opacity:0} to{transform:none;opacity:1} }

    .modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 22px 28px 16px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
      gap: 12px;
    }
    .header-left { display: flex; align-items: center; gap: 14px; }
    .header-icon {
      width: 40px; height: 40px; border-radius: 10px;
      background: var(--accent-soft); border: 1px solid var(--accent-glow);
      display: flex; align-items: center; justify-content: center;
      color: var(--accent); flex-shrink: 0;
    }
    .modal-title {
      font-family: var(--sans); font-size: 19px; font-weight: 700;
      color: var(--text-bright); letter-spacing: -0.02em;
    }
    .modal-subtitle { font-size: 13px; color: var(--text-dim); margin-top: 2px; }
    .close-btn {
      background: var(--surface-2); border: 1px solid var(--border);
      color: var(--text); width: 32px; height: 32px; border-radius: 7px;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all 0.12s; flex-shrink: 0; outline: none; font-size: 15px;
    }
    .close-btn:hover { border-color: var(--red); color: var(--red); background: rgba(248,113,113,0.1); }

    /* Sidebar tabs */
    .body { display: flex; flex: 1; overflow: hidden; }
    .sidebar {
      width: 190px; flex-shrink: 0;
      border-right: 1px solid var(--border);
      padding: 14px 8px;
      display: flex; flex-direction: column; gap: 2px;
      overflow-y: auto;
    }
    .tab-btn {
      display: flex; align-items: center; gap: 9px;
      padding: 9px 12px; border-radius: 8px;
      border: none; background: none; cursor: pointer;
      font-family: var(--mono); font-size: 12px; font-weight: 500;
      color: var(--text); transition: all 0.12s; outline: none;
      text-align: left; width: 100%;
    }
    .tab-btn:hover { background: var(--surface-2); color: var(--text-2); }
    .tab-btn.active { background: var(--accent-soft); color: var(--accent); }
    .tab-btn svg { flex-shrink: 0; }

    .content { flex: 1; overflow-y: auto; padding: 24px 28px; }

    /* Typography */
    h2 {
      font-family: var(--sans); font-size: 20px; font-weight: 700;
      color: var(--text-bright); margin: 0 0 8px;
      letter-spacing: -0.02em;
    }
    h3 {
      font-family: var(--sans); font-size: 15px; font-weight: 600;
      color: var(--text-bright); margin: 20px 0 8px;
      letter-spacing: -0.01em;
    }
    p { font-size: 13.5px; color: var(--text); line-height: 1.8; margin: 0 0 12px; }
    ul { padding-left: 20px; margin: 0 0 14px; }
    li { font-size: 13px; color: var(--text); line-height: 1.9; }

    /* Step badges */
    .steps { display: flex; flex-direction: column; gap: 16px; margin: 16px 0; }
    .step {
      display: flex; gap: 14px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 10px; padding: 14px 16px;
    }
    .step-num {
      width: 26px; height: 26px; border-radius: 50%;
      background: var(--accent-soft); border: 1px solid var(--accent-glow);
      color: var(--accent); font-family: var(--sans); font-size: 12px; font-weight: 700;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .step-body { flex: 1; }
    .step-title { font-size: 13px; font-weight: 600; color: var(--text-bright); margin-bottom: 4px; }
    .step-desc { font-size: 12.5px; color: var(--text); line-height: 1.7; }

    /* Code blocks */
    pre {
      background: var(--bg); border: 1px solid var(--border-2);
      border-radius: 8px; padding: 14px 16px;
      font-family: var(--mono); font-size: 12px; line-height: 1.7;
      color: var(--text-bright); overflow-x: auto; margin: 8px 0 16px;
      white-space: pre; tab-size: 2;
    }
    code { color: var(--accent); background: var(--accent-soft); padding: 1px 6px; border-radius: 4px; font-family: var(--mono); font-size: 12.5px; }
    .tag-name { color: #f472b6; }
    .attr-name { color: #60a5fa; }
    .attr-val  { color: #34d399; }
    .comment   { color: var(--text-dim); font-style: italic; }

    /* Schema table */
    .schema-table { width: 100%; border-collapse: collapse; margin: 12px 0 20px; font-size: 12.5px; }
    .schema-table th {
      text-align: left; padding: 8px 12px;
      background: var(--surface-2); color: var(--text-dim);
      border-bottom: 1px solid var(--border); font-weight: 600;
      font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;
    }
    .schema-table td {
      padding: 9px 12px; border-bottom: 1px solid var(--border);
      color: var(--text); vertical-align: top; line-height: 1.6;
    }
    .schema-table tr:last-child td { border-bottom: none; }
    .schema-table td:first-child { font-family: var(--mono); color: var(--accent); font-size: 12px; }
    .badge {
      display: inline-flex; align-items: center;
      padding: 2px 8px; border-radius: 99px;
      font-size: 10px; font-weight: 600; letter-spacing: 0.05em;
    }
    .badge.opt { background: rgba(96,165,250,0.12); color: #60a5fa; border: 1px solid rgba(96,165,250,0.25); }
    .badge.req { background: rgba(248,113,113,0.12); color: #f87171; border: 1px solid rgba(248,113,113,0.25); }

    .promo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 14px 0; }
    .promo-card {
      background: var(--surface-2); border: 1px solid var(--border);
      border-radius: 10px; padding: 14px 16px;
    }
    .promo-card-title { font-size: 13px; font-weight: 600; color: var(--text-bright); margin-bottom: 5px; }
    .promo-card p { font-size: 12px; color: var(--text-dim); line-height: 1.7; margin: 0; }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) private _tab = 'post';

  private _close() {
    this.dispatchEvent(new CustomEvent('close-docs', { bubbles: true, composed: true }));
  }

  private _tabs = [
    { id: 'post',       label: 'Form POST',        icon: `<svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v2H2V3zm0 4h12v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm4 2a1 1 0 000 2h4a1 1 0 000-2H6z"/></svg>` },
    { id: 'playground', label: 'uwc-playground',   icon: `<svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>` },
    { id: 'render',     label: 'uwc-render',        icon: `<svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><rect x="1" y="2" width="14" height="10" rx="1.5"/><rect x="5" y="13" width="6" height="1.5" rx="0.75"/></svg>` },
    { id: 'promote',    label: 'Promote UWCPen',    icon: `<svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><path d="M9.293 1.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-7 7a1 1 0 01-.707.293H3a1 1 0 01-1-1v-4a1 1 0 01.293-.707l7-7zM4 12h2.586l6-6L10 3.414l-6 6V12z"/></svg>` },
  ];

  render() {
    if (!this.open) return html``;
    return html`
      <div class="overlay" @click=${(e: MouseEvent) => e.target === e.currentTarget && this._close()}>
        <div class="modal">
          <div class="modal-header">
            <div class="header-left">
              <div class="header-icon">
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="modal-title">UWCPen Integration Guide</div>
                <div class="modal-subtitle">Form POST, component embedding, and promotion strategies</div>
              </div>
            </div>
            <button class="close-btn" @click=${this._close}>✕</button>
          </div>

          <div class="body">
            <div class="sidebar">
              ${this._tabs.map(t => html`
                <button class="tab-btn ${this._tab === t.id ? 'active' : ''}" @click=${() => { this._tab = t.id; }}>
                  ${t.icon ? unsafeHTML(t.icon) : ''}
                  ${t.label}
                </button>
              `)}
            </div>
            <div class="content">
              ${this._tab === 'post'       ? this._renderPost()       : ''}
              ${this._tab === 'playground' ? this._renderPlayground() : ''}
              ${this._tab === 'render'     ? this._renderRenderComp() : ''}
              ${this._tab === 'promote'    ? this._renderPromote()    : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderPost() {
    return html`
      <h2>Dynamic Playground via Form POST</h2>
      <p>Send a <code>POST</code> request to <code>/</code> to open UWCPen pre-loaded with your code. A <strong>Service Worker</strong> intercepts the request, stores the payload, and redirects to a GET. This is entirely client-side — no server needed.</p>

      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-body">
            <div class="step-title">Visit UWCPen first (installs the Service Worker)</div>
            <div class="step-desc">The browser registers <code>sw.js</code> on the first visit. After that, POST interception works for all subsequent requests from any origin.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-body">
            <div class="step-title">Build a form with the schema below</div>
            <div class="step-desc">Supply any combination of framework files. Only frameworks with code supplied will appear in the header.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-body">
            <div class="step-title">POST to UWCPen's URL</div>
            <div class="step-desc">Set <code>method="POST"</code> and <code>action="https://your-uwcpen-host/"</code>. The SW stores the data and the playground loads with your content.</div>
          </div>
        </div>
      </div>

      <h3>Form Schema</h3>
      <table class="schema-table">
        <thead><tr><th>Field</th><th>Status</th><th>Description</th></tr></thead>
        <tbody>
          ${[
            ['lit_typescript',     'opt', 'TypeScript source code for the Lit demo'],
            ['lit_scss',           'opt', 'SCSS styles for the Lit demo'],
            ['react_typescript',   'opt', 'TypeScript source code for the React demo'],
            ['react_scss',         'opt', 'SCSS styles for the React demo'],
            ['vue_typescript',     'opt', 'TypeScript source for the Vue demo'],
            ['vue_scss',           'opt', 'SCSS styles for the Vue demo'],
            ['angular_typescript', 'opt', 'TypeScript source for the Angular demo'],
            ['angular_scss',       'opt', 'SCSS styles for the Angular demo'],
            ['lit_importmap',      'opt', 'Custom import map JSON for Lit (overrides default)'],
            ['react_importmap',    'opt', 'Custom import map JSON for React'],
            ['vue_importmap',      'opt', 'Custom import map JSON for Vue'],
            ['angular_importmap',  'opt', 'Custom import map JSON for Angular'],
            ['framework',          'opt', 'Active framework on load: lit | react | vue | angular'],
            ['view',               'opt', 'Layout: columns | split-left | split-right | editor-only | output-only'],
          ].map(([f, badge, desc]) => html`
            <tr>
              <td>${f}</td>
              <td><span class="badge ${badge}">${badge === 'opt' ? 'optional' : 'required'}</span></td>
              <td>${desc}</td>
            </tr>
          `)}
        </tbody>
      </table>

      <h3>Example HTML Form</h3>
<pre><span class="comment">&lt;!-- Sends user to UWCPen with a React demo pre-loaded --&gt;</span>
<span class="tag-name">&lt;form</span> <span class="attr-name">method</span>=<span class="attr-val">"post"</span> <span class="attr-name">action</span>=<span class="attr-val">"https://uwcpen.dev/"</span>
      <span class="attr-name">enctype</span>=<span class="attr-val">"application/x-www-form-urlencoded"</span><span class="tag-name">&gt;</span>
  <span class="tag-name">&lt;input</span> <span class="attr-name">type</span>=<span class="attr-val">"hidden"</span> <span class="attr-name">name</span>=<span class="attr-val">"framework"</span>          <span class="attr-name">value</span>=<span class="attr-val">"react"</span>         <span class="tag-name">/&gt;</span>
  <span class="tag-name">&lt;input</span> <span class="attr-name">type</span>=<span class="attr-val">"hidden"</span> <span class="attr-name">name</span>=<span class="attr-val">"view"</span>              <span class="attr-name">value</span>=<span class="attr-val">"split-left"</span>   <span class="tag-name">/&gt;</span>
  <span class="tag-name">&lt;input</span> <span class="attr-name">type</span>=<span class="attr-val">"hidden"</span> <span class="attr-name">name</span>=<span class="attr-val">"react_typescript"</span> <span class="attr-name">value</span>=<span class="attr-val">"..."</span>           <span class="tag-name">/&gt;</span>
  <span class="tag-name">&lt;input</span> <span class="attr-name">type</span>=<span class="attr-val">"hidden"</span> <span class="attr-name">name</span>=<span class="attr-val">"react_scss"</span>       <span class="attr-name">value</span>=<span class="attr-val">"..."</span>           <span class="tag-name">/&gt;</span>
  <span class="tag-name">&lt;button</span> <span class="attr-name">type</span>=<span class="attr-val">"submit"</span><span class="tag-name">&gt;</span>Open in UWCPen<span class="tag-name">&lt;/button&gt;</span>
<span class="tag-name">&lt;/form&gt;</span></pre>

      <h3>Programmatic POST (JavaScript)</h3>
<pre>const form = new FormData();
form.set('framework',        'vue');
form.set('view',             'columns');
form.set('vue_typescript',   myVueCode);
form.set('vue_scss',         myScss);

fetch('https://uwcpen.dev/', { method: 'POST', body: form })
  .then(() => window.open('https://uwcpen.dev/'));</pre>
    `;
  }

  private _renderPlayground() {
    return html`
      <h2>Embedding uwc-playground</h2>
      <p>The <code>&lt;uwc-playground&gt;</code> component renders the full editor + preview experience. Embed it in any web app or documentation site.</p>

      <h3>Installation</h3>
<pre><span class="comment">// Via CDN (ES Module)</span>
import 'https://your-uwcpen-host/src/main.js';

<span class="comment">// Or via npm (coming soon)</span>
npm install uwcpen</pre>

      <h3>Basic Usage</h3>
<pre><span class="comment">&lt;!-- Minimal — uses Lit default, 3-column layout --&gt;</span>
<span class="tag-name">&lt;uwc-playground</span><span class="tag-name">&gt;&lt;/uwc-playground&gt;</span>

<span class="comment">&lt;!-- With framework and layout preset --&gt;</span>
<span class="tag-name">&lt;uwc-playground</span>
  <span class="attr-name">framework</span>=<span class="attr-val">"react"</span>
  <span class="attr-name">view</span>=<span class="attr-val">"split-left"</span>
<span class="tag-name">&gt;&lt;/uwc-playground&gt;</span></pre>

      <h3>Pre-loading Code via JavaScript</h3>
<pre>const pg = document.querySelector('uwc-playground');
pg.framework   = 'vue';
pg.view        = 'split-left';
pg.typescript  = \`export default {
  template: \\\`&lt;div&gt;{{ msg }}&lt;/div&gt;\\\`,
  data: () => ({ msg: 'Hello Vue!' })
};\`;
pg.scss = \`body { background: #e8f5e9; }\`;</pre>

      <h3>Properties</h3>
      <table class="schema-table">
        <thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          ${[
            ['framework',  'string', 'Active framework: lit | react | vue | angular'],
            ['view',       'string', 'Layout: columns | split-left | split-right | editor-only | output-only'],
            ['typescript', 'string', 'Pre-load TypeScript content into the TS editor'],
            ['scss',       'string', 'Pre-load SCSS content into the SCSS editor'],
            ['importmap',  'string', 'Custom import map JSON string for the active framework'],
          ].map(([p, t, d]) => html`<tr><td>${p}</td><td><code>${t}</code></td><td>${d}</td></tr>`)}
        </tbody>
      </table>

      <h3>Hosting Requirements</h3>
      <p>UWCPen requires a static host with HTTPS. The Service Worker needs to be served from the same origin. Works on Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any CDN.</p>
    `;
  }

  private _renderRenderComp() {
    return html`
      <h2>Embedding uwc-render</h2>
      <p><code>&lt;uwc-render&gt;</code> is a lightweight component that compiles and renders output only — no editor UI. Use it to embed live previews in documentation, tutorials, or component libraries.</p>

      <h3>Usage</h3>
<pre><span class="tag-name">&lt;uwc-render</span>
  <span class="attr-name">framework</span>=<span class="attr-val">"lit"</span>
  <span class="attr-name">typescript</span>=<span class="attr-val">"..."</span>
  <span class="attr-name">scss</span>=<span class="attr-val">"..."</span>
  <span class="attr-name">style</span>=<span class="attr-val">"width:100%;height:300px;display:block"</span>
<span class="tag-name">&gt;&lt;/uwc-render&gt;</span></pre>

      <h3>With Custom Import Map</h3>
<pre>const renderer = document.querySelector('uwc-render');
renderer.framework  = 'react';
renderer.typescript = myCode;
renderer.scss       = myStyles;
renderer.importmap  = JSON.stringify({
  imports: {
    react:            'https://esm.sh/react@18',
    'react-dom/client': 'https://esm.sh/react-dom@18/client',
  }
});</pre>

      <h3>Properties</h3>
      <table class="schema-table">
        <thead><tr><th>Property</th><th>Description</th></tr></thead>
        <tbody>
          ${[
            ['framework',  'Framework: lit | react | vue | angular (default: lit)'],
            ['typescript', 'TypeScript source to compile and render'],
            ['scss',       'SCSS styles to compile and inject'],
            ['importmap',  'Optional custom import map JSON string'],
          ].map(([p, d]) => html`<tr><td>${p}</td><td>${d}</td></tr>`)}
        </tbody>
      </table>

      <h3>Integration in Markdown / Docs sites</h3>
<pre><span class="comment">&lt;!-- Inside an Astro, Docusaurus, or VitePress page --&gt;</span>
<span class="tag-name">&lt;script</span> <span class="attr-name">type</span>=<span class="attr-val">"module"</span>
  <span class="attr-name">src</span>=<span class="attr-val">"https://your-uwcpen-host/src/main.js"</span><span class="tag-name">&gt;&lt;/script&gt;</span>

<span class="tag-name">&lt;uwc-render</span>
  <span class="attr-name">framework</span>=<span class="attr-val">"vue"</span>
  <span class="attr-name">typescript</span>=<span class="attr-val">"&lt;your component code here&gt;"</span>
  <span class="attr-name">style</span>=<span class="attr-val">"height: 400px; border-radius: 8px; overflow: hidden;"</span>
<span class="tag-name">&gt;&lt;/uwc-render&gt;</span></pre>
    `;
  }

  private _renderPromote() {
    return html`
      <h2>Promote UWCPen</h2>
      <p>Here's a battle-tested playbook for getting UWCPen in front of developers who'll love it.</p>

      <div class="promo-grid">
        <div class="promo-card">
          <div class="promo-card-title">🚀 Product Hunt Launch</div>
          <p>Schedule a Tuesday/Wednesday morning PST launch. Prepare a 60s screen-recording GIF showing the POST feature, shadow DOM CSS fix, and the console. Ask your network to hunt it.</p>
        </div>
        <div class="promo-card">
          <div class="promo-card-title">📦 Open Source on GitHub</div>
          <p>Add a gorgeous README with animated GIFs, badges, and a "Try it now" button that opens a form POST demo. Reach 100 stars in week 1 by posting to awesome-lit and awesome-webcomponents lists.</p>
        </div>
        <div class="promo-card">
          <div class="promo-card-title">✍️ Dev.to / Hashnode Articles</div>
          <p>Write "I built a CodePen that works offline — here's how the Service Worker POST trick works." Technical deep-dives perform extremely well. Cross-post to Medium's JavaScript publication.</p>
        </div>
        <div class="promo-card">
          <div class="promo-card-title">🎥 Short-form Video</div>
          <p>Record a 60-second demo on Twitter/X or LinkedIn showing the instant framework switching, live console output, and the form POST from an external app. Tag @lit_html, @reactjs, @vuejs.</p>
        </div>
        <div class="promo-card">
          <div class="promo-card-title">💬 Hacker News Show HN</div>
          <p>"Show HN: An offline-first, service-worker-powered multi-framework playground using Web Components." Post Monday 9am–12pm EST for maximum visibility. Respond to every comment within 2 hours.</p>
        </div>
        <div class="promo-card">
          <div class="promo-card-title">🧩 Web Component Ecosystem</div>
          <p>List on webcomponents.org. Add to the Lit Discord's #showcase channel. Submit to Shopify's Storefront Component Library and Salesforce's Lightning Web Components community.</p>
        </div>
        <div class="promo-card">
          <div class="promo-card-title">📚 Framework Docs PR</div>
          <p>Open PRs against Lit, Vue, Angular, and React documentation repos suggesting UWCPen as an online playground for their code examples — similar to how CodeSandbox and StackBlitz are linked.</p>
        </div>
        <div class="promo-card">
          <div class="promo-card-title">🌐 SEO &amp; Discoverability</div>
          <p>Target keywords: "online Lit playground", "Angular playground no install", "Web Components IDE". Create landing pages for each framework. Add structured data (JSON-LD) for SoftwareApplication.</p>
        </div>
      </div>

      <h3>Messaging that Works</h3>
      <ul>
        <li><strong>Zero-install</strong> — Works entirely in the browser, offline-capable via Service Worker</li>
        <li><strong>Real compilation</strong> — TypeScript and SCSS compiled in a Web Worker, not faked</li>
        <li><strong>Embeddable</strong> — Use <code>&lt;uwc-render&gt;</code> in your docs exactly like CodeSandbox embeds</li>
        <li><strong>Form POST API</strong> — Unique capability: deep-link to a playground from any server-rendered page</li>
        <li><strong>Four frameworks, one playground</strong> — Compare Lit vs React vs Vue vs Angular side-by-side</li>
      </ul>
    `;
  }
}
