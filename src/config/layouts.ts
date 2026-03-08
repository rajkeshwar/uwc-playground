import type { LayoutOption } from '../types.js';

export const LAYOUT_OPTIONS: LayoutOption[] = [
  {
    id: 'columns',
    label: 'Columns',
    icon: `<rect x="1" y="3" width="4" height="10" rx="1"/>
           <rect x="7" y="3" width="4" height="10" rx="1"/>
           <rect x="13" y="3" width="4" height="10" rx="1"/>`,
  },
  {
    id: 'split-left',
    label: 'Edit Left',
    icon: `<rect x="1" y="3" width="6" height="4.5" rx="1"/>
           <rect x="1" y="8.5" width="6" height="4.5" rx="1"/>
           <rect x="9" y="3" width="8" height="10" rx="1"/>`,
  },
  {
    id: 'split-right',
    label: 'Edit Right',
    icon: `<rect x="1" y="3" width="8" height="10" rx="1"/>
           <rect x="11" y="3" width="6" height="4.5" rx="1"/>
           <rect x="11" y="8.5" width="6" height="4.5" rx="1"/>`,
  },
  {
    id: 'editor-only',
    label: 'Editors',
    icon: `<rect x="1" y="3" width="7" height="10" rx="1"/>
           <rect x="10" y="3" width="7" height="10" rx="1"/>`,
  },
  {
    id: 'output-only',
    label: 'Preview',
    icon: `<rect x="1" y="3" width="16" height="10" rx="1"/>`,
  },
];
