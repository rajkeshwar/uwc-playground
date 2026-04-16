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
 *
 * Key invariant: the preview panel (which contains the live <iframe>) is NEVER
 * removed from the document during a layout transition.  Moving a node within the
 * same document does not trigger an iframe navigation; removing it and re-inserting
 * it does.  All layout changes therefore use insertBefore / prepend / appendChild
 * to reorder elements in-place, and "hide" panels with zero-size flex CSS rather
 * than detaching them from the DOM.
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
    this._teardown(panels);
    this._buildLayout(layout, panels);
  }

  /**
   * Prepare the container for mobile single-panel view.
   * Destroys any Split.js instances and resets the container to a plain flex row.
   * The caller is responsible for showing/hiding individual panels.
   */
  prepareForMobile(panels: PanelElements): void {
    this._destroySplits();
    this._teardown(panels);
    const C = this._container;
    C.style.cssText = 'display:flex;flex-direction:row;height:100%;overflow:hidden;';
  }

  private _destroySplits(): void {
    // destroy(false) removes inline Split.js width styles and removes gutters.
    try { this._outerSplit?.destroy(false); } catch { /* noop */ }
    try { this._innerSplit?.destroy(false); } catch { /* noop */ }
    this._outerSplit = null;
    this._innerSplit = null;
  }

  /**
   * Prepare the container for a new layout WITHOUT disconnecting any panel from
   * the document.  Only gutters and the editors-column wrapper are removed; the
   * three panel elements stay in (or are added to) the container.
   */
  private _teardown(panels: PanelElements): void {
    const C = this._container;

    // 1. Remove any Split.js gutters still in the container (belt-and-suspenders
    //    alongside destroy(false) above).
    Array.from(C.children).forEach(child => {
      if ((child as HTMLElement).classList.contains('gutter')) child.remove();
    });

    // 2. Dissolve the editors-column wrapper used by split-left / split-right.
    //    Move ts and scss back into the container before removing the wrapper.
    const col = Array.from(C.children).find(
      c => (c as HTMLElement).classList.contains('dp-editors-col'),
    ) as HTMLElement | undefined;

    if (col) {
      // Remove vertical gutters inside the column.
      Array.from(col.children).forEach(child => {
        if ((child as HTMLElement).classList.contains('gutter')) child.remove();
      });
      // Pull editor panels back into the container (DOM move, no disconnection).
      if (col.contains(panels.ts))   C.insertBefore(panels.ts,   col);
      if (col.contains(panels.scss)) C.insertBefore(panels.scss, col);
      col.remove();
    }

    // 3. Ensure all three panels are direct children of C.
    //    On first mount they haven't been added yet; on output-only they may have
    //    been left in C but we still want to guarantee presence here.
    [panels.ts, panels.scss, panels.preview].forEach(p => {
      if (p.parentElement !== C) C.appendChild(p);
    });
  }

  private _buildLayout(layout: LayoutId, { ts, scss, preview }: PanelElements): void {
    const C = this._container;
    C.style.cssText = 'display:flex;flex-direction:row;height:100%;overflow:hidden;';

    const gutterFn = (_idx: number, dir: 'horizontal' | 'vertical') => {
      const g = document.createElement('div');
      g.className = `gutter gutter-${dir}`;
      return g;
    };

    switch (layout) {

      // ── 3 columns ─────────────────────────────────────────────────────────
      case 'columns': {
        ts.style.cssText      = 'overflow:hidden;display:flex;flex-direction:column;';
        scss.style.cssText    = 'overflow:hidden;display:flex;flex-direction:column;';
        preview.style.cssText = 'overflow:hidden;display:flex;flex-direction:column;';
        // Guarantee order [ts, scss, preview] by prepending editors.
        // prepend() moves nodes to the front; preview ends up last.
        C.prepend(ts, scss);

        this._outerSplit = Split([ts, scss, preview], {
          sizes:      [33, 33, 34],
          minSize:    80,
          gutterSize: 5,
          direction:  'horizontal',
          gutter:     gutterFn,
        });
        break;
      }

      // ── Editors left, preview right ───────────────────────────────────────
      case 'split-left': {
        // _makeEditorsCol moves ts/scss into a new column element.
        // C is left with only [preview] as a direct child.
        const col = this._makeEditorsCol(ts, scss);
        preview.style.cssText = 'overflow:hidden;display:flex;flex-direction:column;';
        col.style.height      = '100%';
        C.insertBefore(col, preview); // order: [col, preview]

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

      // ── Preview left, editors right ───────────────────────────────────────
      case 'split-right': {
        const col = this._makeEditorsCol(ts, scss);
        preview.style.cssText = 'overflow:hidden;display:flex;flex-direction:column;';
        col.style.height      = '100%';
        C.appendChild(col); // order: [preview, col]

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

      // ── Editors only ──────────────────────────────────────────────────────
      case 'editor-only': {
        ts.style.cssText   = 'overflow:hidden;display:flex;flex-direction:column;';
        scss.style.cssText = 'overflow:hidden;display:flex;flex-direction:column;';
        // Collapse preview to zero width — keeps it in the document so the
        // iframe is never reloaded.
        preview.style.cssText = 'flex:0 0 0px;width:0;min-width:0;overflow:hidden;pointer-events:none;';
        C.prepend(ts, scss); // order: [ts, scss, preview(collapsed)]

        this._outerSplit = Split([ts, scss], {
          sizes: [50, 50], minSize: 80,
          gutterSize: 5, direction: 'horizontal',
          gutter: gutterFn,
        });
        break;
      }

      // ── Output only ───────────────────────────────────────────────────────
      case 'output-only': {
        // Collapse editor panels to zero width — keeps them in the document.
        ts.style.cssText   = 'flex:0 0 0px;width:0;min-width:0;overflow:hidden;pointer-events:none;';
        scss.style.cssText = 'flex:0 0 0px;width:0;min-width:0;overflow:hidden;pointer-events:none;';
        preview.style.cssText = 'flex:1;overflow:hidden;display:flex;flex-direction:column;';
        // No split needed; preview fills the container.
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
    // col.append() moves ts and scss from C into col; they remain in the document
    // because col is immediately inserted into C in _buildLayout.
    col.append(ts, scss);
    return col;
  }

  destroy(): void {
    this._destroySplits();
  }
}
