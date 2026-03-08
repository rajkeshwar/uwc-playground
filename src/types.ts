// ── Compilation ────────────────────────────────────────────────────────────

export interface CompileRequest {
  id: number;
  tsCode: string;
  scssCode: string;
  framework: FrameworkId;
}

export interface CompileResult {
  id: number;
  success: boolean;
  js?: string;
  css?: string;
  error?: string;
}

// ── Import map ──────────────────────────────────────────────────────────────

export interface ImportMap {
  imports: Record<string, string>;
  scopes?: Record<string, Record<string, string>>;
}

// ── Frameworks ─────────────────────────────────────────────────────────────

export type FrameworkId = 'lit' | 'react' | 'vue' | 'angular';

// ── Layouts ─────────────────────────────────────────────────────────────────

export type LayoutId =
  | 'columns'
  | 'split-left'
  | 'split-right'
  | 'editor-only'
  | 'output-only';

export interface LayoutOption {
  id: LayoutId;
  label: string;
  icon: string; // SVG path data
}

// ── Editor state ────────────────────────────────────────────────────────────

export interface EditorState {
  ts: string;
  scss: string;
}

// ── App state ───────────────────────────────────────────────────────────────

export interface AppState {
  framework: FrameworkId;
  layout: LayoutId;
  editors: Record<FrameworkId, EditorState>;
  userImportMaps: Partial<Record<FrameworkId, string>>;
  statusState: 'idle' | 'compiling' | 'live' | 'error';
}

// ── Compiler options (subset used for worker) ───────────────────────────────

export interface TsCompilerOptions {
  experimentalDecorators: boolean;
  emitDecoratorMetadata: boolean;
  useDefineForClassFields: boolean;
  jsx?: 'react' | 'preserve' | 'none';
  jsxFactory?: string;
}
