import type { ImportMap, TsCompilerOptions } from '../types.js';

/**
 * FrameworkPlugin — the contract every framework adapter must satisfy.
 * Adding a new framework = implementing this interface and registering it.
 */
export interface FrameworkPlugin {
  /** Unique machine-readable identifier */
  readonly id: string;

  /** Human-readable display name */
  readonly name: string;

  /** Brand colour (hex) used in UI accents */
  readonly color: string;

  /** Default TypeScript code shown when framework is first selected */
  readonly defaultTs: string;

  /** Default SCSS code shown when framework is first selected */
  readonly defaultScss: string;

  /** Default import map shipped with this plugin */
  readonly defaultImportMap: ImportMap;

  /** TypeScript compiler options required for this framework */
  getCompilerOptions(): TsCompilerOptions;

  /**
   * Build the full HTML string that gets injected into the preview iframe.
   * @param js    Transpiled JavaScript (ESM)
   * @param css   Compiled CSS
   * @param importMap  Effective import map (default merged with user override)
   */
  buildIframe(js: string, css: string, importMap: ImportMap): string;
}
