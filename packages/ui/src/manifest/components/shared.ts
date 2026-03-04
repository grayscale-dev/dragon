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

export const dropdownCssTokens: CssTokenMeta[] = [
  ...inputCssTokens,
  {
    name: '--ui-dropdown-chevron-color',
    group: 'icon',
    description: 'Chevron icon color.',
    default: '#64748b',
    control: 'color'
  },
  {
    name: '--ui-dropdown-panel-border',
    group: 'panel',
    description: 'Dropdown panel border declaration.',
    default: '1px solid #d5dbe5',
    control: 'border'
  },
  {
    name: '--ui-dropdown-panel-radius',
    group: 'panel',
    description: 'Dropdown panel border radius.',
    default: '10px',
    control: 'number'
  },
  {
    name: '--ui-dropdown-panel-bg',
    group: 'panel',
    description: 'Dropdown panel background color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-dropdown-panel-shadow',
    group: 'panel',
    description: 'Dropdown panel shadow.',
    default: '0 12px 24px rgba(15, 23, 42, 0.12)',
    control: 'shadow'
  },
  {
    name: '--ui-dropdown-option-height',
    group: 'option',
    description: 'Minimum option row height.',
    default: '36px',
    control: 'number'
  },
  {
    name: '--ui-dropdown-option-padding',
    group: 'option',
    description: 'Option row padding.',
    default: '6px 10px',
    control: 'text'
  },
  {
    name: '--ui-dropdown-option-hover-bg',
    group: 'option',
    description: 'Option hover background color.',
    default: 'rgba(15, 23, 42, 0.06)',
    control: 'color'
  },
  {
    name: '--ui-dropdown-option-selected-bg',
    group: 'option',
    description: 'Option selected background color.',
    default: 'rgba(37, 99, 235, 0.12)',
    control: 'color'
  },
  {
    name: '--ui-dropdown-chip-bg',
    group: 'chip',
    description: 'Multi-select chip background.',
    default: 'rgba(15, 23, 42, 0.08)',
    control: 'color'
  },
  {
    name: '--ui-dropdown-chip-color',
    group: 'chip',
    description: 'Multi-select chip text color.',
    default: 'currentColor',
    control: 'color'
  },
  {
    name: '--ui-dropdown-chip-radius',
    group: 'chip',
    description: 'Multi-select chip radius.',
    default: '9999px',
    control: 'number'
  }
];

export const buttonCssTokens: CssTokenMeta[] = [
  {
    name: '--ui-button-padding',
    group: 'spacing',
    description: 'Button padding.',
    default: '10px 16px',
    control: 'text',
    examples: ['8px 14px']
  },
  {
    name: '--ui-button-padding-xs',
    group: 'size',
    description: 'Button padding for xs size.',
    default: '6px 10px',
    control: 'text'
  },
  {
    name: '--ui-button-padding-sm',
    group: 'size',
    description: 'Button padding for sm size.',
    default: '8px 12px',
    control: 'text'
  },
  {
    name: '--ui-button-padding-md',
    group: 'size',
    description: 'Button padding for md size.',
    default: '10px 16px',
    control: 'text'
  },
  {
    name: '--ui-button-padding-lg',
    group: 'size',
    description: 'Button padding for lg size.',
    default: '12px 18px',
    control: 'text'
  },
  {
    name: '--ui-button-padding-xl',
    group: 'size',
    description: 'Button padding for xl size.',
    default: '14px 22px',
    control: 'text'
  },
  {
    name: '--ui-button-font-size',
    group: 'typography',
    description: 'Base button text size.',
    default: '14px',
    control: 'number',
    placeholder: '14px'
  },
  {
    name: '--ui-button-font-size-xs',
    group: 'size',
    description: 'Button font size for xs size.',
    default: '12px',
    control: 'number',
    placeholder: '12px'
  },
  {
    name: '--ui-button-font-size-sm',
    group: 'size',
    description: 'Button font size for sm size.',
    default: '13px',
    control: 'number',
    placeholder: '13px'
  },
  {
    name: '--ui-button-font-size-md',
    group: 'size',
    description: 'Button font size for md size.',
    default: '14px',
    control: 'number',
    placeholder: '14px'
  },
  {
    name: '--ui-button-font-size-lg',
    group: 'size',
    description: 'Button font size for lg size.',
    default: '16px',
    control: 'number',
    placeholder: '16px'
  },
  {
    name: '--ui-button-font-size-xl',
    group: 'size',
    description: 'Button font size for xl size.',
    default: '18px',
    control: 'number',
    placeholder: '18px'
  },
  {
    name: '--ui-button-font-weight',
    group: 'typography',
    description: 'Button text weight.',
    default: '600',
    control: 'number',
    placeholder: '600'
  },
  {
    name: '--ui-button-border',
    group: 'border',
    description: 'Button border declaration override.',
    default: '1px solid #111827',
    control: 'border'
  },
  {
    name: '--ui-button-radius',
    group: 'shape',
    description: 'Button border radius.',
    default: '8px',
    control: 'number',
    placeholder: '8px'
  },
  {
    name: '--ui-button-round-radius',
    group: 'shape',
    description: 'Round variant border radius.',
    default: '50%',
    control: 'number',
    placeholder: '50%'
  },
  {
    name: '--ui-button-min-width',
    group: 'shape',
    description: 'Minimum width for non-block buttons.',
    default: '0px',
    control: 'number',
    placeholder: '0px'
  },
  {
    name: '--ui-button-bg',
    group: 'color',
    description: 'Standard/round variant background override.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-hover-bg',
    group: 'state',
    description: 'Standard/round variant hover background override.',
    default: '#0f172a',
    control: 'color'
  },
  {
    name: '--ui-button-active-bg',
    group: 'state',
    description: 'Standard/round variant active background override.',
    default: '#020617',
    control: 'color'
  },
  {
    name: '--ui-button-color',
    group: 'color',
    description: 'Standard/round variant text color override.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-focus-ring',
    group: 'state',
    description: 'Focus ring box-shadow.',
    default: '0 0 0 3px rgba(37, 99, 235, 0.35)',
    control: 'shadow'
  },
  {
    name: '--ui-button-disabled-opacity',
    group: 'state',
    description: 'Opacity while disabled.',
    default: '0.55',
    control: 'number',
    placeholder: '0.55'
  },
  {
    name: '--ui-button-ghost-border',
    group: 'variant',
    description: 'Ghost variant border override.',
    default: '1px solid transparent',
    control: 'border'
  },
  {
    name: '--ui-button-ghost-bg',
    group: 'variant',
    description: 'Ghost variant background override.',
    default: 'transparent',
    control: 'color'
  },
  {
    name: '--ui-button-ghost-hover-bg',
    group: 'variant',
    description: 'Ghost variant hover background override.',
    default: 'rgba(17, 24, 39, 0.1)',
    control: 'color'
  },
  {
    name: '--ui-button-ghost-active-bg',
    group: 'variant',
    description: 'Ghost variant active background override.',
    default: 'rgba(17, 24, 39, 0.18)',
    control: 'color'
  },
  {
    name: '--ui-button-ghost-color',
    group: 'variant',
    description: 'Ghost variant text color override.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-outline-border',
    group: 'variant',
    description: 'Outline variant border override.',
    default: '1px solid #111827',
    control: 'border'
  },
  {
    name: '--ui-button-outline-bg',
    group: 'variant',
    description: 'Outline variant background override.',
    default: 'transparent',
    control: 'color'
  },
  {
    name: '--ui-button-outline-hover-bg',
    group: 'variant',
    description: 'Outline variant hover background override.',
    default: 'rgba(17, 24, 39, 0.1)',
    control: 'color'
  },
  {
    name: '--ui-button-outline-active-bg',
    group: 'variant',
    description: 'Outline variant active background override.',
    default: 'rgba(17, 24, 39, 0.18)',
    control: 'color'
  },
  {
    name: '--ui-button-outline-color',
    group: 'variant',
    description: 'Outline variant text color override.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-plain-bg',
    group: 'severity',
    description: 'Plain background color.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-plain-hover-bg',
    group: 'severity',
    description: 'Plain hover background color.',
    default: '#0f172a',
    control: 'color'
  },
  {
    name: '--ui-button-plain-active-bg',
    group: 'severity',
    description: 'Plain active background color.',
    default: '#020617',
    control: 'color'
  },
  {
    name: '--ui-button-plain-color',
    group: 'severity',
    description: 'Plain text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-plain-border',
    group: 'severity',
    description: 'Plain border color.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-plain-soft-bg',
    group: 'severity',
    description: 'Plain soft hover background used by ghost/outline.',
    default: 'rgba(17, 24, 39, 0.1)',
    control: 'color'
  },
  {
    name: '--ui-button-plain-soft-active-bg',
    group: 'severity',
    description: 'Plain soft active background used by ghost/outline.',
    default: 'rgba(17, 24, 39, 0.18)',
    control: 'color'
  },
  {
    name: '--ui-button-primary-bg',
    group: 'severity',
    description: 'Primary background color.',
    default: '#2563eb',
    control: 'color'
  },
  {
    name: '--ui-button-primary-hover-bg',
    group: 'severity',
    description: 'Primary hover background color.',
    default: '#1d4ed8',
    control: 'color'
  },
  {
    name: '--ui-button-primary-active-bg',
    group: 'severity',
    description: 'Primary active background color.',
    default: '#1e40af',
    control: 'color'
  },
  {
    name: '--ui-button-primary-color',
    group: 'severity',
    description: 'Primary text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-primary-border',
    group: 'severity',
    description: 'Primary border color.',
    default: '#2563eb',
    control: 'color'
  },
  {
    name: '--ui-button-primary-soft-bg',
    group: 'severity',
    description: 'Primary soft hover background used by ghost/outline.',
    default: 'rgba(37, 99, 235, 0.12)',
    control: 'color'
  },
  {
    name: '--ui-button-primary-soft-active-bg',
    group: 'severity',
    description: 'Primary soft active background used by ghost/outline.',
    default: 'rgba(37, 99, 235, 0.2)',
    control: 'color'
  },
  {
    name: '--ui-button-secondary-bg',
    group: 'severity',
    description: 'Secondary background color.',
    default: '#64748b',
    control: 'color'
  },
  {
    name: '--ui-button-secondary-hover-bg',
    group: 'severity',
    description: 'Secondary hover background color.',
    default: '#475569',
    control: 'color'
  },
  {
    name: '--ui-button-secondary-active-bg',
    group: 'severity',
    description: 'Secondary active background color.',
    default: '#334155',
    control: 'color'
  },
  {
    name: '--ui-button-secondary-color',
    group: 'severity',
    description: 'Secondary text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-secondary-border',
    group: 'severity',
    description: 'Secondary border color.',
    default: '#64748b',
    control: 'color'
  },
  {
    name: '--ui-button-secondary-soft-bg',
    group: 'severity',
    description: 'Secondary soft hover background used by ghost/outline.',
    default: 'rgba(100, 116, 139, 0.12)',
    control: 'color'
  },
  {
    name: '--ui-button-secondary-soft-active-bg',
    group: 'severity',
    description: 'Secondary soft active background used by ghost/outline.',
    default: 'rgba(100, 116, 139, 0.2)',
    control: 'color'
  },
  {
    name: '--ui-button-success-bg',
    group: 'severity',
    description: 'Success background color.',
    default: '#16a34a',
    control: 'color'
  },
  {
    name: '--ui-button-success-hover-bg',
    group: 'severity',
    description: 'Success hover background color.',
    default: '#15803d',
    control: 'color'
  },
  {
    name: '--ui-button-success-active-bg',
    group: 'severity',
    description: 'Success active background color.',
    default: '#166534',
    control: 'color'
  },
  {
    name: '--ui-button-success-color',
    group: 'severity',
    description: 'Success text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-success-border',
    group: 'severity',
    description: 'Success border color.',
    default: '#16a34a',
    control: 'color'
  },
  {
    name: '--ui-button-success-soft-bg',
    group: 'severity',
    description: 'Success soft hover background used by ghost/outline.',
    default: 'rgba(22, 163, 74, 0.12)',
    control: 'color'
  },
  {
    name: '--ui-button-success-soft-active-bg',
    group: 'severity',
    description: 'Success soft active background used by ghost/outline.',
    default: 'rgba(22, 163, 74, 0.2)',
    control: 'color'
  },
  {
    name: '--ui-button-info-bg',
    group: 'severity',
    description: 'Info background color.',
    default: '#0ea5e9',
    control: 'color'
  },
  {
    name: '--ui-button-info-hover-bg',
    group: 'severity',
    description: 'Info hover background color.',
    default: '#0284c7',
    control: 'color'
  },
  {
    name: '--ui-button-info-active-bg',
    group: 'severity',
    description: 'Info active background color.',
    default: '#0369a1',
    control: 'color'
  },
  {
    name: '--ui-button-info-color',
    group: 'severity',
    description: 'Info text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-info-border',
    group: 'severity',
    description: 'Info border color.',
    default: '#0ea5e9',
    control: 'color'
  },
  {
    name: '--ui-button-info-soft-bg',
    group: 'severity',
    description: 'Info soft hover background used by ghost/outline.',
    default: 'rgba(14, 165, 233, 0.12)',
    control: 'color'
  },
  {
    name: '--ui-button-info-soft-active-bg',
    group: 'severity',
    description: 'Info soft active background used by ghost/outline.',
    default: 'rgba(14, 165, 233, 0.2)',
    control: 'color'
  },
  {
    name: '--ui-button-warning-bg',
    group: 'severity',
    description: 'Warning background color.',
    default: '#f59e0b',
    control: 'color'
  },
  {
    name: '--ui-button-warning-hover-bg',
    group: 'severity',
    description: 'Warning hover background color.',
    default: '#d97706',
    control: 'color'
  },
  {
    name: '--ui-button-warning-active-bg',
    group: 'severity',
    description: 'Warning active background color.',
    default: '#b45309',
    control: 'color'
  },
  {
    name: '--ui-button-warning-color',
    group: 'severity',
    description: 'Warning text color.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-warning-border',
    group: 'severity',
    description: 'Warning border color.',
    default: '#f59e0b',
    control: 'color'
  },
  {
    name: '--ui-button-warning-soft-bg',
    group: 'severity',
    description: 'Warning soft hover background used by ghost/outline.',
    default: 'rgba(245, 158, 11, 0.18)',
    control: 'color'
  },
  {
    name: '--ui-button-warning-soft-active-bg',
    group: 'severity',
    description: 'Warning soft active background used by ghost/outline.',
    default: 'rgba(245, 158, 11, 0.28)',
    control: 'color'
  },
  {
    name: '--ui-button-help-bg',
    group: 'severity',
    description: 'Help background color.',
    default: '#a855f7',
    control: 'color'
  },
  {
    name: '--ui-button-help-hover-bg',
    group: 'severity',
    description: 'Help hover background color.',
    default: '#9333ea',
    control: 'color'
  },
  {
    name: '--ui-button-help-active-bg',
    group: 'severity',
    description: 'Help active background color.',
    default: '#7e22ce',
    control: 'color'
  },
  {
    name: '--ui-button-help-color',
    group: 'severity',
    description: 'Help text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-help-border',
    group: 'severity',
    description: 'Help border color.',
    default: '#a855f7',
    control: 'color'
  },
  {
    name: '--ui-button-help-soft-bg',
    group: 'severity',
    description: 'Help soft hover background used by ghost/outline.',
    default: 'rgba(168, 85, 247, 0.12)',
    control: 'color'
  },
  {
    name: '--ui-button-help-soft-active-bg',
    group: 'severity',
    description: 'Help soft active background used by ghost/outline.',
    default: 'rgba(168, 85, 247, 0.2)',
    control: 'color'
  },
  {
    name: '--ui-button-danger-bg',
    group: 'severity',
    description: 'Danger background color.',
    default: '#dc2626',
    control: 'color'
  },
  {
    name: '--ui-button-danger-hover-bg',
    group: 'severity',
    description: 'Danger hover background color.',
    default: '#b91c1c',
    control: 'color'
  },
  {
    name: '--ui-button-danger-active-bg',
    group: 'severity',
    description: 'Danger active background color.',
    default: '#991b1b',
    control: 'color'
  },
  {
    name: '--ui-button-danger-color',
    group: 'severity',
    description: 'Danger text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-danger-border',
    group: 'severity',
    description: 'Danger border color.',
    default: '#dc2626',
    control: 'color'
  },
  {
    name: '--ui-button-danger-soft-bg',
    group: 'severity',
    description: 'Danger soft hover background used by ghost/outline.',
    default: 'rgba(220, 38, 38, 0.12)',
    control: 'color'
  },
  {
    name: '--ui-button-danger-soft-active-bg',
    group: 'severity',
    description: 'Danger soft active background used by ghost/outline.',
    default: 'rgba(220, 38, 38, 0.2)',
    control: 'color'
  },
  {
    name: '--ui-button-badge-size',
    group: 'shape',
    description: 'Badge circle size.',
    default: '18px',
    control: 'number',
    placeholder: '18px'
  },
  {
    name: '--ui-button-badge-padding-inline',
    group: 'shape',
    description: 'Horizontal badge padding; badge expands to pill as content grows.',
    default: '4px',
    control: 'number',
    placeholder: '4px'
  },
  {
    name: '--ui-button-badge-font-size',
    group: 'typography',
    description: 'Badge font size.',
    default: '11px',
    control: 'number',
    placeholder: '11px'
  },
  {
    name: '--ui-button-badge-font-weight',
    group: 'typography',
    description: 'Badge font weight.',
    default: '600',
    control: 'number',
    placeholder: '600'
  },
  {
    name: '--ui-button-badge-bg',
    group: 'variant',
    description: 'Badge background override.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-badge-color',
    group: 'variant',
    description: 'Badge text color override.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-badge-border',
    group: 'variant',
    description: 'Badge border color override.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-badge-plain-bg',
    group: 'severity',
    description: 'Badge plain background color.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-badge-plain-color',
    group: 'severity',
    description: 'Badge plain text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-badge-plain-border',
    group: 'severity',
    description: 'Badge plain border color.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-badge-primary-bg',
    group: 'severity',
    description: 'Badge primary background color.',
    default: '#2563eb',
    control: 'color'
  },
  {
    name: '--ui-button-badge-primary-color',
    group: 'severity',
    description: 'Badge primary text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-badge-primary-border',
    group: 'severity',
    description: 'Badge primary border color.',
    default: '#2563eb',
    control: 'color'
  },
  {
    name: '--ui-button-badge-secondary-bg',
    group: 'severity',
    description: 'Badge secondary background color.',
    default: '#64748b',
    control: 'color'
  },
  {
    name: '--ui-button-badge-secondary-color',
    group: 'severity',
    description: 'Badge secondary text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-badge-secondary-border',
    group: 'severity',
    description: 'Badge secondary border color.',
    default: '#64748b',
    control: 'color'
  },
  {
    name: '--ui-button-badge-success-bg',
    group: 'severity',
    description: 'Badge success background color.',
    default: '#16a34a',
    control: 'color'
  },
  {
    name: '--ui-button-badge-success-color',
    group: 'severity',
    description: 'Badge success text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-badge-success-border',
    group: 'severity',
    description: 'Badge success border color.',
    default: '#16a34a',
    control: 'color'
  },
  {
    name: '--ui-button-badge-info-bg',
    group: 'severity',
    description: 'Badge info background color.',
    default: '#0ea5e9',
    control: 'color'
  },
  {
    name: '--ui-button-badge-info-color',
    group: 'severity',
    description: 'Badge info text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-badge-info-border',
    group: 'severity',
    description: 'Badge info border color.',
    default: '#0ea5e9',
    control: 'color'
  },
  {
    name: '--ui-button-badge-warning-bg',
    group: 'severity',
    description: 'Badge warning background color.',
    default: '#f59e0b',
    control: 'color'
  },
  {
    name: '--ui-button-badge-warning-color',
    group: 'severity',
    description: 'Badge warning text color.',
    default: '#111827',
    control: 'color'
  },
  {
    name: '--ui-button-badge-warning-border',
    group: 'severity',
    description: 'Badge warning border color.',
    default: '#f59e0b',
    control: 'color'
  },
  {
    name: '--ui-button-badge-help-bg',
    group: 'severity',
    description: 'Badge help background color.',
    default: '#a855f7',
    control: 'color'
  },
  {
    name: '--ui-button-badge-help-color',
    group: 'severity',
    description: 'Badge help text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-badge-help-border',
    group: 'severity',
    description: 'Badge help border color.',
    default: '#a855f7',
    control: 'color'
  },
  {
    name: '--ui-button-badge-danger-bg',
    group: 'severity',
    description: 'Badge danger background color.',
    default: '#dc2626',
    control: 'color'
  },
  {
    name: '--ui-button-badge-danger-color',
    group: 'severity',
    description: 'Badge danger text color.',
    default: '#ffffff',
    control: 'color'
  },
  {
    name: '--ui-button-badge-danger-border',
    group: 'severity',
    description: 'Badge danger border color.',
    default: '#dc2626',
    control: 'color'
  }
];

export const buttonGroupCssTokens: CssTokenMeta[] = [
  {
    name: '--ui-button-group-radius',
    group: 'shape',
    description: 'Outer corner radius applied to grouped buttons.',
    default: '8px',
    control: 'number',
    placeholder: '8px'
  },
  {
    name: '--ui-button-group-border-overlap',
    group: 'layout',
    description: 'Border overlap between adjacent buttons.',
    default: '1px',
    control: 'number',
    placeholder: '1px'
  }
];
