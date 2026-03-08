import type { LayoutOption } from '../types.js';

// Panel icon used in the panel header (prefix icon)
export const PANEL_ICONS: Record<string, string> = {
  ts: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
    <rect x="2" y="2" width="16" height="16" rx="2" fill="#60a5fa" opacity="0.18"/>
    <text x="10" y="14" text-anchor="middle" font-size="9" font-weight="700" fill="#60a5fa" font-family="monospace">TS</text>
  </svg>`,
  scss: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
    <rect x="2" y="2" width="16" height="16" rx="2" fill="#f472b6" opacity="0.18"/>
    <text x="10" y="14" text-anchor="middle" font-size="7.5" font-weight="700" fill="#f472b6" font-family="monospace">SC</text>
  </svg>`,
  preview: `<svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
    <rect x="2" y="4" width="16" height="11" rx="2" stroke="#34d399" stroke-width="1.5" fill="none"/>
    <path d="M2 17h16" stroke="#34d399" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="10" cy="18.5" r="1" fill="#34d399"/>
  </svg>`,
};

export const LAYOUT_OPTIONS: LayoutOption[] = [
  {
    id: 'columns',
    label: 'Columns',
    icon: `<g>
      <rect x="1.5" y="2" width="4" height="12" rx="1.2" fill="currentColor" opacity="0.9"/>
      <rect x="7" y="2" width="4" height="12" rx="1.2" fill="currentColor" opacity="0.9"/>
      <rect x="12.5" y="2" width="4" height="12" rx="1.2" fill="currentColor" opacity="0.9"/>
    </g>`,
  },
  {
    id: 'split-left',
    label: 'Edit Left',
    icon: `<g>
      <rect x="1.5" y="2" width="6.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.9"/>
      <rect x="1.5" y="8.5" width="6.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.9"/>
      <rect x="9.5" y="2" width="7" height="12" rx="1.2" fill="currentColor" opacity="0.5"/>
    </g>`,
  },
  {
    id: 'split-right',
    label: 'Edit Right',
    icon: `<g>
      <rect x="1.5" y="2" width="7" height="12" rx="1.2" fill="currentColor" opacity="0.5"/>
      <rect x="10" y="2" width="6.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.9"/>
      <rect x="10" y="8.5" width="6.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.9"/>
    </g>`,
  },
  {
    id: 'editor-only',
    label: 'Editors',
    icon: `<g>
      <rect x="1.5" y="2" width="6.5" height="12" rx="1.2" fill="currentColor" opacity="0.9"/>
      <rect x="10" y="2" width="6.5" height="12" rx="1.2" fill="currentColor" opacity="0.9"/>
    </g>`,
  },
  {
    id: 'output-only',
    label: 'Preview',
    icon: `<g>
      <rect x="1.5" y="2" width="15" height="12" rx="1.2" fill="currentColor" opacity="0.5"/>
      <rect x="4" y="5" width="10" height="1.5" rx="0.75" fill="currentColor"/>
      <rect x="4" y="8" width="7" height="1.5" rx="0.75" fill="currentColor"/>
    </g>`,
  },
];

// Layout icons used in the buttons — prefix SVG icons per layout
export const LAYOUT_PREFIX_ICONS: Record<string, string> = {
  'columns':     `<svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><rect x="1" y="1" width="3.5" height="14" rx="1"/><rect x="6.25" y="1" width="3.5" height="14" rx="1"/><rect x="11.5" y="1" width="3.5" height="14" rx="1"/></svg>`,
  'split-left':  `<svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="14" rx="1" opacity="0.5"/></svg>`,
  'split-right': `<svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><rect x="1" y="1" width="6" height="14" rx="1" opacity="0.5"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>`,
  'editor-only': `<svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><rect x="1" y="1" width="6" height="14" rx="1"/><rect x="9" y="1" width="6" height="14" rx="1"/></svg>`,
  'output-only': `<svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><rect x="1" y="1" width="14" height="14" rx="1.5" opacity="0.4"/><rect x="3" y="5" width="10" height="1.5" rx="0.75"/><rect x="3" y="8.5" width="7" height="1.5" rx="0.75"/></svg>`,
};
