# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm start            # dev server at http://localhost:8080 (no file watching)
npm run start:watch  # dev server with file watching
npm run build        # production build via Rollup → dist/
npm run build:tsc    # type-check only (no emit)
npm test             # run tests once
npm run test:watch   # run tests in watch mode
```

Tests use `@web/test-runner` with esbuild. Test files live in `test/**/*.test.ts`.

## Architecture

This is a browser-based live playground (CodePen-like) that compiles TypeScript + SCSS in a Web Worker and renders the output in an iframe. It is built as embeddable Web Components using Lit 3.

### Plugin system

Every supported framework (`lit`, `react`, `vue`, `angular`) is a plugin implementing `FrameworkPlugin` (`src/plugins/plugin.interface.ts`). Plugins are registered in `src/plugins/index.ts` and looked up via a singleton `registry`. To add a new framework: implement the interface, add default code to `src/config/snippets.ts` and `src/config/importmaps.ts`, and call `registry.register()` in `src/plugins/index.ts`. No other files need to change.

### Compilation pipeline

`CompilerService` (`src/engine/compiler.service.ts`) creates a Blob-URL Web Worker (classic, not module) that loads Sass.js and the TypeScript compiler via `importScripts` from CDN. The worker compiles SCSS → CSS and TS → ESM JS, then posts the result back. Only the most recent compile result is used (stale results are discarded by ID). User edits are debounced 500 ms before triggering compilation.

### Main components

- **`uwc-playground`** (`src/components/uwc-playground.ts`) — root component, orchestrates `CompilerService`, `EditorService` (CodeMirror 6), and `WorkspaceService` (Split.js panels). Persists editor content and import maps to `localStorage`. Reads initial framework/view from query string (`?framework=react&view=split-left`).
- **`uwc-render`** — lightweight standalone component for embedding just the rendered output.
- **`uwc-header`** — framework tabs + layout switcher.
- **`uwc-settings`** — import map editor modal (per-framework CDN overrides).

### Service worker & POST data

`public/sw.js` enables POST-based embedding: a host page can POST `{framework, typescript, scss, importmap}` fields and the SW stores them, returning them on the subsequent GET via `/__uwcpen_post__`. In dev mode, the `web-dev-server` middleware stubs this endpoint with `null`.

### Entry point & public API

`src/main.ts` registers plugins and themes, then imports the two public components. It also re-exports `UwcPlayground`, `UwcRender`, `registry`, `themeRegistry`, and key types for consumers embedding the components as a library.

### Build

The Rollup config (`rollup.config.mjs`) uses `@open-wc/building-rollup` with `createSpaConfig`, TypeScript plugin, and a copy plugin for the `assets/` directory. Output goes to `dist/`.

### `.js` extension on imports

All internal imports use `.js` extensions even though the source files are `.ts`. This is required for native ESM resolution in both the dev server and browser — do not change to `.ts` extensions.
