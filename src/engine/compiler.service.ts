import type { CompileRequest, CompileResult, FrameworkId } from '../types.js';

// ── Web Worker source ────────────────────────────────────────────────────────
// Classic worker (not module) so it can use importScripts for CDN deps.
const WORKER_SRC = /* javascript */ `
importScripts(
  'https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.js',
  'https://cdn.jsdelivr.net/npm/typescript@5.4.5/lib/typescript.js'
);

const JSX_MAP = {
  react: { jsx: ts.JsxEmit.React, jsxFactory: 'React.createElement' }
};

self.onmessage = function(e) {
  const { id, tsCode, scssCode, framework, compilerOptions } = e.data;

  // 1. Compile SCSS → CSS
  Sass.compile(scssCode, function(sassResult) {
    if (sassResult.status !== 0) {
      self.postMessage({
        id,
        success: false,
        error: 'SCSS Error\\n' + sassResult.message
      });
      return;
    }

    // 2. Transpile TypeScript → ESM
    try {
      const opts = {
        target:                  ts.ScriptTarget.ES2021,
        module:                  ts.ModuleKind.ES2022,
        experimentalDecorators:  !!compilerOptions.experimentalDecorators,
        emitDecoratorMetadata:   !!compilerOptions.emitDecoratorMetadata,
        useDefineForClassFields: !!compilerOptions.useDefineForClassFields,
        ...(JSX_MAP[framework] || {})
      };

      // React JSX requires a .tsx filename — TypeScript only processes
      // JSX syntax when the file extension is .tsx
      const fileName = framework === 'react' ? 'component.tsx' : 'component.ts';
      const result = ts.transpileModule(tsCode, {
        compilerOptions: opts,
        fileName,
      });

      self.postMessage({
        id,
        success: true,
        js:  result.outputText,
        css: sassResult.text,
      });
    } catch(err) {
      self.postMessage({
        id,
        success: false,
        error: 'TypeScript Error\\n' + (err.message || err)
      });
    }
  });
};
`;

type CompileCallback = (result: CompileResult) => void;

/**
 * CompilerService
 * Single Responsibility: manages a Web Worker that compiles TS + SCSS.
 * Dependency Inversion: callers depend on the abstract compile() interface.
 */
export class CompilerService {
  private _worker: Worker;
  private _pendingId   = 0;
  private _latestId    = 0;
  private _callback: CompileCallback | null = null;

  constructor() {
    const blob = new Blob([WORKER_SRC], { type: 'application/javascript' });
    this._worker = new Worker(URL.createObjectURL(blob));
    this._worker.onmessage  = (e) => this._onMessage(e.data as CompileResult);
    this._worker.onerror    = (e) => this._onError(e);
  }

  /**
   * Compile ts + scss for the given framework.
   * Only the result of the most recent call is delivered to the callback.
   */
  compile(
    tsCode: string,
    scssCode: string,
    framework: FrameworkId,
    compilerOptions: Record<string, unknown>,
    callback: CompileCallback,
  ): void {
    this._latestId = ++this._pendingId;
    this._callback = callback;
    this._worker.postMessage({
      id: this._latestId,
      tsCode,
      scssCode,
      framework,
      compilerOptions,
    } satisfies CompileRequest & { compilerOptions: Record<string, unknown> });
  }

  private _onMessage(result: CompileResult): void {
    // Discard stale results
    if (result.id !== this._latestId) return;
    this._callback?.(result);
  }

  private _onError(e: ErrorEvent): void {
    this._callback?.({
      id: this._latestId,
      success: false,
      error: `Worker error: ${e.message}`,
    });
  }

  destroy(): void {
    this._worker.terminate();
  }
}
