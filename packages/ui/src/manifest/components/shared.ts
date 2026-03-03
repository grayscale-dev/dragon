import type { CssTokenMeta } from '../schema.js';

export const inputCssTokens: CssTokenMeta[] = [
  {
    name: '--ui-input-padding',
    group: 'spacing',
    description: 'Default input padding.',
    default: '8px 12px',
    control: 'text',
    examples: ['10px 14px']
  },
  {
    name: '--ui-input-font-size',
    group: 'typography',
    description: 'Input text size.',
    default: '16px',
    control: 'number',
    placeholder: '16px'
  },
  {
    name: '--ui-input-label-font-size',
    group: 'label',
    description: 'Label text size for above and floating modes.',
    default: '14px',
    control: 'number',
    placeholder: '14px'
  },
  {
    name: '--ui-input-border',
    group: 'border',
    description: 'Complete input border declaration.',
    default: '1px solid #c6ccd5',
    control: 'border'
  },
  {
    name: '--ui-input-radius',
    group: 'shape',
    description: 'Input border radius.',
    default: '8px',
    control: 'number'
  },
  {
    name: '--ui-input-bg',
    group: 'color',
    description: 'Input background color and floating-label chip background.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-input-color',
    group: 'color',
    description: 'Input text color.',
    default: '#1f2937',
    control: 'color'
  },
  {
    name: '--ui-input-placeholder-color',
    group: 'color',
    description: 'Placeholder color and inactive floating label color.',
    default: '#9aa4b2',
    control: 'color'
  },
  {
    name: '--ui-input-label-color',
    group: 'label',
    description: 'Label color in above mode and active floating state.',
    default: '#475569',
    control: 'color'
  },
  {
    name: '--ui-input-focus-ring',
    group: 'state',
    description: 'Focus ring box-shadow.',
    default: '0 0 0 3px rgba(24, 98, 255, 0.25)',
    control: 'shadow'
  },
  {
    name: '--ui-input-floating-label-left',
    group: 'floating',
    description: 'Left offset of floating label.',
    default: 'var(--ui-input-floating-padding-left, 12px)',
    control: 'number'
  },
  {
    name: '--ui-input-floating-padding-top',
    group: 'floating',
    description: 'Top padding used in floating label mode.',
    default: '22px',
    control: 'number'
  },
  {
    name: '--ui-input-floating-padding-right',
    group: 'floating',
    description: 'Right padding used in floating label mode.',
    default: '12px',
    control: 'number'
  },
  {
    name: '--ui-input-floating-padding-bottom',
    group: 'floating',
    description: 'Bottom padding used in floating label mode.',
    default: '8px',
    control: 'number'
  },
  {
    name: '--ui-input-floating-padding-left',
    group: 'floating',
    description: 'Left padding used in floating label mode.',
    default: '12px',
    control: 'number'
  }
];
