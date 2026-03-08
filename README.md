# DevPen — Framework Playground

A CodePen-like live playground supporting **Lit**, **React**, **Vue 3**, and **Angular 18** with TypeScript + SCSS. Built with Lit 3, CodeMirror 6, Split.js, and `@web/dev-server`.

---

## Quick Start

```bash
npm install
npm start
```

Opens at **http://localhost:8080**

---

## URL Query Parameters

Shareable deep links via query string:

| Param       | Values                                                       |
|-------------|--------------------------------------------------------------|
| `framework` | `lit` · `react` · `vue` · `angular`                         |
| `view`      | `columns` · `split-left` · `split-right` · `editor-only` · `output-only` |

Example: `http://localhost:8080/?framework=react&view=split-left`

---

## Project Structure

```
devpen/
├── index.html                        # App shell + global styles + Split.js gutter CSS
├── package.json
├── tsconfig.json
├── web-dev-server.config.mjs
└── src/
    ├── main.ts                       # Entry: registers plugins, boots app
    ├── types.ts                      # Shared TypeScript types
    │
    ├── config/
    │   ├── snippets.ts               # Default TS + SCSS per framework
    │   ├── importmaps.ts             # Default CDN import maps per framework
    │   └── layouts.ts                # Layout definitions (icons, IDs)
    │
    ├── plugins/                      # Plugin architecture (Open/Closed)
    │   ├── plugin.interface.ts       # FrameworkPlugin contract
    │   ├── plugin-registry.ts        # Singleton registry
    │   ├── index.ts                  # Registers built-in plugins
    │   ├── lit.plugin.ts
    │   ├── react.plugin.ts
    │   ├── vue.plugin.ts
    │   └── angular.plugin.ts
    │
    ├── engine/
    │   ├── compiler.service.ts       # Web Worker manager (Sass + TypeScript)
    │   └── iframe-builder.ts         # Shared iframe HTML utilities
    │
    ├── workspace/
    │   ├── workspace.service.ts      # Split.js panel layout management
    │   └── editor.service.ts         # CodeMirror 6 editor instances
    │
    └── components/                   # Lit components
        ├── devpen-app.ts             # Root app, orchestrates all services
        ├── header-bar.ts             # Framework tabs + layout buttons
        └── settings-modal.ts         # Import map editor modal
```

---

## Adding a New Framework

1. Create `src/plugins/svelte.plugin.ts` implementing `FrameworkPlugin`
2. Add default snippets to `src/config/snippets.ts`
3. Add default import map to `src/config/importmaps.ts`
4. Register in `src/plugins/index.ts`:
   ```ts
   import { SveltePlugin } from './svelte.plugin.js';
   registry.register(new SveltePlugin());
   ```

No other files need to change. ✅

---

## Compilation Architecture

User code is compiled **off the main thread** in a Web Worker:

```
User types ──► debounce 500ms ──► CompilerService.compile()
                                       │
                                   Web Worker
                                   ├─ Sass.js (SCSS → CSS)
                                   └─ TypeScript (TS → ESM JS)
                                       │
                                  buildIframe() ──► iframe.srcdoc
```

The worker is created from a Blob URL so no additional file serving is needed.
