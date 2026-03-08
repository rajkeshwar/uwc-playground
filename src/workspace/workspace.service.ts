import Split from 'split.js';
import type { LayoutId } from '../types.js';

export interface PanelElements {
  ts:      HTMLElement;
  scss:    HTMLElement;
  preview: HTMLElement;
}

type SplitInstance = ReturnType<typeof Split>;

/**
 * WorkspaceService
 * Single Responsibility: all Split.js lifecycle and DOM layout building.
 */
export class WorkspaceService {
  private _container: HTMLElement;
  private _outerSplit: SplitInstance | null = null;
  private _innerSplit: SplitInstance | null = null;

  constructor(container: HTMLElement) {
    this._container = container;
  }

  applyLayout(layout: LayoutId, panels: PanelElements): void {
    this._destroySplits();
    this._clearContainer();
    this._buildLayout(layout, panels);
  }

  private _destroySplits(): void {
    try { this._outerSplit?.destroy(false); } catch { /* noop */ }
    try { this._innerSplit?.destroy(false); } catch { /* noop */ }
    this._outerSplit = null;
    this._innerSplit = null;
  }

  private _clearContainer(): void {
    // Remove only gutter elements; panels are kept in memory and re-appended
    Array.from(this._container.children).forEach(child => {
      if ((child as HTMLElement).classList.contains('gutter')) {
        this._container.removeChild(child);
      }
    });
    this._container.innerHTML = '';
  }

  private _buildLayout(layout: LayoutId, { ts, scss, preview }: PanelElements): void {
    const C = this._container;

    const gutterFn = (idx: number, dir: 'horizontal' | 'vertical') => {
      const g = document.createElement('div');
      g.className = `gutter gutter-${dir}`;
      return g;
    };

    switch (layout) {

      // ── 3 columns ──────────────────────────────────────────────────────────
      case 'columns': {
        C.style.cssText = 'display:flex;flex-direction:row;height:100%;overflow:hidden;';
        ts.style.cssText      = 'overflow:hidden;display:flex;flex-direction:column;';
        scss.style.cssText    = 'overflow:hidden;display:flex;flex-direction:column;';
        preview.style.cssText = 'overflow:hidden;display:flex;flex-direction:column;';
        C.append(ts, scss, preview);

        this._outerSplit = Split([ts, scss, preview], {
          sizes:      [33, 33, 34],
          minSize:    80,
          gutterSize: 5,
          direction:  'horizontal',
          gutter:     gutterFn,
        });
        break;
      }

      // ── Editors left, preview right ────────────────────────────────────────
      case 'split-left': {
        C.style.cssText = 'display:flex;flex-direction:row;height:100%;overflow:hidden;';
        const col = this._makeEditorsCol(ts, scss);

        preview.style.cssText = 'overflow:hidden;display:flex;flex-direction:column;';
        col.style.height      = '100%';
        C.append(col, preview);

        this._innerSplit = Split([ts, scss], {
          sizes: [50, 50], minSize: 60,
          gutterSize: 5, direction: 'vertical',
          gutter: gutterFn,
        });
        this._outerSplit = Split([col, preview], {
          sizes: [45, 55], minSize: 80,
          gutterSize: 5, direction: 'horizontal',
          gutter: gutterFn,
        });
        break;
      }

      // ── Preview left, editors right ────────────────────────────────────────
      case 'split-right': {
        C.style.cssText = 'display:flex;flex-direction:row;height:100%;overflow:hidden;';
        const col = this._makeEditorsCol(ts, scss);

        preview.style.cssText = 'overflow:hidden;display:flex;flex-direction:column;';
        col.style.height      = '100%';
        C.append(preview, col);

        this._innerSplit = Split([ts, scss], {
          sizes: [50, 50], minSize: 60,
          gutterSize: 5, direction: 'vertical',
          gutter: gutterFn,
        });
        this._outerSplit = Split([preview, col], {
          sizes: [55, 45], minSize: 80,
          gutterSize: 5, direction: 'horizontal',
          gutter: gutterFn,
        });
        break;
      }

      // ── Editors only ───────────────────────────────────────────────────────
      case 'editor-only': {
        C.style.cssText = 'display:flex;flex-direction:row;height:100%;overflow:hidden;';
        ts.style.cssText   = 'overflow:hidden;display:flex;flex-direction:column;';
        scss.style.cssText = 'overflow:hidden;display:flex;flex-direction:column;';
        C.append(ts, scss);

        this._outerSplit = Split([ts, scss], {
          sizes: [50, 50], minSize: 80,
          gutterSize: 5, direction: 'horizontal',
          gutter: gutterFn,
        });
        break;
      }

      // ── Output only ────────────────────────────────────────────────────────
      case 'output-only': {
        C.style.cssText = 'display:flex;flex-direction:row;height:100%;overflow:hidden;';
        preview.style.cssText = 'flex:1;overflow:hidden;display:flex;flex-direction:column;';
        C.append(preview);
        break;
      }
    }
  }

  private _makeEditorsCol(ts: HTMLElement, scss: HTMLElement): HTMLElement {
    const col = document.createElement('div');
    col.className = 'dp-editors-col';
    col.style.cssText = 'display:flex;flex-direction:column;overflow:hidden;';
    ts.style.cssText   = 'overflow:hidden;display:flex;flex-direction:column;';
    scss.style.cssText = 'overflow:hidden;display:flex;flex-direction:column;';
    col.append(ts, scss);
    return col;
  }

  destroy(): void {
    this._destroySplits();
  }
}
