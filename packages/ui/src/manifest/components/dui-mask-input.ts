import { DUI_INPUT_MASK_PRESETS } from '../../masks/presets.js';
import type { ComponentManifest } from '../schema.js';

const presetOptions = Object.keys(DUI_INPUT_MASK_PRESETS).map((value) => ({
  value,
  label: value
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}));

export const duiMaskInputManifest: ComponentManifest = {
  tag: 'dui-mask-input',
  title: 'Mask Input',
  description: 'Masked input component with Inputmask options, presets, templates, and numeric/currency helpers.',
  status: 'stable',
  attributes: [
    {
      name: 'value',
      description: 'Current text value for the input.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'placeholder',
      description: 'Placeholder text shown when value is empty. Hidden in floating label mode.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'prefix',
      description: 'Visual prefix always shown before the user value.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'suffix',
      description: 'Visual suffix always shown after the user value.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'template',
      description: 'Display template where each x is a value slot and literals stay visible.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'template-name',
      description: 'Name of a built-in mask preset. Useful for quick setup before custom overrides.',
      type: 'string',
      default: '',
      control: 'select',
      options: presetOptions
    },
    {
      name: 'mask',
      description: 'InputMask-compatible alias for input-mask.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'input-mask',
      description: 'Inputmask expression. Pattern-like values are treated as mask, word-like values are treated as alias.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'input-mask-config',
      description: 'JSON options object passed to Inputmask (alias, separators, digits, prefix, etc.).',
      type: 'string',
      default: '{}',
      control: 'text'
    },
    {
      name: 'slot-char',
      description: 'Mask placeholder character used for unfilled slots.',
      type: 'string',
      default: '_',
      control: 'text'
    },
    {
      name: 'auto-clear',
      description: 'Clears incomplete input when mask is not fully satisfied.',
      type: 'boolean',
      default: true,
      control: 'boolean'
    },
    {
      name: 'unmask',
      description: 'When true, value stores unmasked content. When false, stores masked text for mask mode.',
      type: 'boolean',
      default: true,
      control: 'boolean'
    },
    {
      name: 'mode',
      description: 'InputNumber-style mode for numeric formatting.',
      type: '"" | "decimal" | "currency"',
      default: '',
      control: 'select',
      options: [
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ]
    },
    {
      name: 'locale',
      description: 'Locale used for number and currency formatting.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'locale-matcher',
      description: 'Locale matching algorithm used by Intl.NumberFormat.',
      type: '"lookup" | "best fit"',
      default: 'best fit',
      control: 'select',
      options: [
        { value: 'best fit', label: 'Best Fit' },
        { value: 'lookup', label: 'Lookup' }
      ]
    },
    {
      name: 'currency',
      description: 'ISO 4217 currency code for currency mode.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'currency-display',
      description: 'Currency display style for currency mode.',
      type: '"symbol" | "code" | "name"',
      default: 'symbol',
      control: 'select',
      options: [
        { value: 'symbol', label: 'Symbol' },
        { value: 'code', label: 'Code' },
        { value: 'name', label: 'Name' }
      ]
    },
    {
      name: 'use-grouping',
      description: 'Enables thousand grouping for numeric formatting.',
      type: 'boolean',
      default: true,
      control: 'boolean'
    },
    {
      name: 'min-fraction-digits',
      description: 'Minimum fraction digits in number mode.',
      type: 'number',
      control: 'number'
    },
    {
      name: 'max-fraction-digits',
      description: 'Maximum fraction digits in number mode.',
      type: 'number',
      control: 'number'
    },
    {
      name: 'allow-empty',
      description: 'When false, empty numeric values normalize to 0.',
      type: 'boolean',
      default: true,
      control: 'boolean'
    },
    {
      name: 'step',
      description: 'Step value used by ArrowUp/ArrowDown in number mode.',
      type: 'number',
      default: 1,
      control: 'number'
    },
    {
      name: 'min',
      description: 'Minimum number value.',
      type: 'number',
      control: 'number'
    },
    {
      name: 'max',
      description: 'Maximum number value.',
      type: 'number',
      control: 'number'
    },
    {
      name: 'read-only',
      description: 'Makes the internal input read-only.',
      type: 'boolean',
      default: false,
      control: 'boolean'
    },
    {
      name: 'input-mode',
      description: 'Native inputmode hint.',
      type: 'string',
      control: 'text'
    },
    {
      name: 'pattern',
      description: 'Native validation pattern.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'size',
      description: 'Native input size attribute.',
      type: 'number',
      control: 'number'
    },
    {
      name: 'auto-focus',
      description: 'Auto-focuses the input on mount.',
      type: 'boolean',
      default: false,
      control: 'boolean'
    },
    {
      name: 'input-id',
      description: 'Id applied to the internal input element.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'name',
      description: 'Name used when submitting with a form.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'disabled',
      description: 'Disables user interaction and removes value from form submission.',
      type: 'boolean',
      default: false,
      control: 'boolean'
    },
    {
      name: 'required',
      description: 'Marks the input as required for form validation.',
      type: 'boolean',
      default: false,
      control: 'boolean'
    },
    {
      name: 'type',
      description: 'Native input type.',
      type: 'string',
      default: 'text',
      control: 'text'
    },
    {
      name: 'autocomplete',
      description: 'Native autocomplete hint passed to the internal input.',
      type: 'string',
      control: 'text'
    },
    {
      name: 'label',
      description: 'Visible label text.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'label-position',
      description: 'Controls whether label appears above the field or as an in-field floating label.',
      type: '"above" | "floating"',
      default: 'above',
      control: 'select',
      options: [
        {
          value: 'above',
          label: 'Above',
          description: 'Label is rendered above the input field.'
        },
        {
          value: 'floating',
          label: 'Floating',
          description: 'Label starts in-field and moves to the top-left on focus/value.'
        }
      ]
    }
  ],
  properties: [
    {
      name: 'value',
      description: 'Live value property kept in sync with the internal input.',
      type: 'string',
      default: ''
    },
    {
      name: 'prefix',
      description: 'Visual prefix shown before the user value.',
      type: 'string',
      default: ''
    },
    {
      name: 'suffix',
      description: 'Visual suffix shown after the user value.',
      type: 'string',
      default: ''
    },
    {
      name: 'template',
      description: 'Template string where x characters are value slots.',
      type: 'string',
      default: ''
    },
    {
      name: 'inputMask',
      description: 'Inputmask expression used for masking.',
      type: 'string',
      default: ''
    },
    {
      name: 'inputMaskConfig',
      description: 'Inputmask options object used during format/unmask operations.',
      type: 'Record<string, unknown>',
      default: '{}'
    },
    {
      name: 'templateName',
      description: 'Built-in mask preset name.',
      type: 'string',
      default: ''
    },
    {
      name: 'mask',
      description: 'Alias for inputMask.',
      type: 'string',
      default: ''
    },
    {
      name: 'slotChar',
      description: 'Mask slot placeholder character.',
      type: 'string',
      default: '_'
    },
    {
      name: 'autoClear',
      description: 'Clears incomplete masked input.',
      type: 'boolean',
      default: true
    },
    {
      name: 'unmask',
      description: 'Controls whether masked or unmasked value is stored for mask mode.',
      type: 'boolean',
      default: true
    },
    {
      name: 'mode',
      description: 'Number mode (decimal/currency).',
      type: '"" | "decimal" | "currency"',
      default: ''
    },
    {
      name: 'locale',
      description: 'Intl locale for number mode.',
      type: 'string',
      default: ''
    },
    {
      name: 'currency',
      description: 'Currency code for currency mode.',
      type: 'string',
      default: ''
    },
    {
      name: 'min',
      description: 'Minimum allowed numeric value.',
      type: 'number'
    },
    {
      name: 'max',
      description: 'Maximum allowed numeric value.',
      type: 'number'
    },
    {
      name: 'labelPosition',
      description: 'Reflects the label presentation mode.',
      type: '"above" | "floating"',
      default: 'above'
    }
  ],
  events: [
    {
      name: 'input',
      description: 'Dispatched on each keystroke with bubbles=true and composed=true.',
      bubbles: true,
      composed: true
    },
    {
      name: 'change',
      description: 'Dispatched when value is committed (blur or Enter) with bubbles=true and composed=true.',
      bubbles: true,
      composed: true
    },
    {
      name: 'complete',
      description: 'Dispatched when a mask is fully satisfied.',
      bubbles: true,
      composed: true
    },
    {
      name: 'focus',
      description: 'Forwarded focus event from internal input.',
      bubbles: true,
      composed: true
    },
    {
      name: 'blur',
      description: 'Forwarded blur event from internal input.',
      bubbles: true,
      composed: true
    }
  ],
  parts: [
    {
      name: 'input',
      description: 'Styles the internal native <input> element.'
    }
  ],
  cssTokens: [
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
  ],
  builder: {
    groups: [
      {
        id: 'content',
        label: 'Content',
        description: 'Input content and labels.',
        order: 1
      },
      {
        id: 'behavior',
        label: 'Behavior',
        description: 'Native input behavior options.',
        order: 2
      },
      {
        id: 'mask',
        label: 'Mask',
        description: 'Input mask controls.',
        order: 3
      },
      {
        id: 'typography',
        label: 'Typography',
        order: 4
      },
      {
        id: 'spacing',
        label: 'Spacing',
        order: 5
      },
      {
        id: 'floating',
        label: 'Floating Label',
        order: 6
      },
      {
        id: 'shape',
        label: 'Shape',
        order: 7
      },
      {
        id: 'color',
        label: 'Color',
        order: 8
      },
      {
        id: 'state',
        label: 'States',
        order: 9
      }
    ],
    controls: [
      {
        id: 'label',
        kind: 'attribute',
        ref: 'label',
        group: 'content',
        label: 'Label',
        order: 1
      },
      {
        id: 'placeholder',
        kind: 'attribute',
        ref: 'placeholder',
        group: 'content',
        label: 'Placeholder',
        order: 2
      },
      {
        id: 'label-position',
        kind: 'attribute',
        ref: 'label-position',
        group: 'content',
        label: 'Label Position',
        order: 3
      },
      {
        id: 'prefix',
        kind: 'attribute',
        ref: 'prefix',
        group: 'content',
        label: 'Prefix',
        order: 4
      },
      {
        id: 'suffix',
        kind: 'attribute',
        ref: 'suffix',
        group: 'content',
        label: 'Suffix',
        order: 5
      },
      {
        id: 'template',
        kind: 'attribute',
        ref: 'template',
        group: 'content',
        label: 'Template',
        order: 6
      },
      {
        id: 'template-name',
        kind: 'attribute',
        ref: 'template-name',
        group: 'content',
        label: 'Template Preset',
        order: 7
      },
      {
        id: 'type',
        kind: 'attribute',
        ref: 'type',
        group: 'behavior',
        label: 'Type',
        order: 1
      },
      {
        id: 'autocomplete',
        kind: 'attribute',
        ref: 'autocomplete',
        group: 'behavior',
        label: 'Autocomplete',
        order: 2
      },
      {
        id: 'disabled',
        kind: 'attribute',
        ref: 'disabled',
        group: 'behavior',
        label: 'Disabled',
        order: 3
      },
      {
        id: 'required',
        kind: 'attribute',
        ref: 'required',
        group: 'behavior',
        label: 'Required',
        order: 4
      },
      {
        id: 'read-only',
        kind: 'attribute',
        ref: 'read-only',
        group: 'behavior',
        label: 'Read Only',
        order: 5
      },
      {
        id: 'input-mode',
        kind: 'attribute',
        ref: 'input-mode',
        group: 'behavior',
        label: 'Input Mode',
        order: 6
      },
      {
        id: 'pattern',
        kind: 'attribute',
        ref: 'pattern',
        group: 'behavior',
        label: 'Pattern',
        order: 7
      },
      {
        id: 'input-mask',
        kind: 'attribute',
        ref: 'input-mask',
        group: 'mask',
        label: 'Input Mask',
        order: 1
      },
      {
        id: 'input-mask-config',
        kind: 'attribute',
        ref: 'input-mask-config',
        group: 'mask',
        label: 'Input Mask Config',
        order: 2
      },
      {
        id: 'mask',
        kind: 'attribute',
        ref: 'mask',
        group: 'mask',
        label: 'Mask Alias',
        order: 3
      },
      {
        id: 'slot-char',
        kind: 'attribute',
        ref: 'slot-char',
        group: 'mask',
        label: 'Slot Char',
        order: 4
      },
      {
        id: 'auto-clear',
        kind: 'attribute',
        ref: 'auto-clear',
        group: 'mask',
        label: 'Auto Clear',
        order: 5
      },
      {
        id: 'unmask',
        kind: 'attribute',
        ref: 'unmask',
        group: 'mask',
        label: 'Unmask Value',
        order: 6
      },
      {
        id: 'mode',
        kind: 'attribute',
        ref: 'mode',
        group: 'mask',
        label: 'Number Mode',
        order: 7
      },
      {
        id: 'currency',
        kind: 'attribute',
        ref: 'currency',
        group: 'mask',
        label: 'Currency',
        order: 8
      },
      {
        id: 'step',
        kind: 'attribute',
        ref: 'step',
        group: 'mask',
        label: 'Step',
        order: 9
      },
      {
        id: 'token-font-size',
        kind: 'cssToken',
        ref: '--ui-input-font-size',
        group: 'typography',
        label: 'Input Font Size',
        order: 1
      },
      {
        id: 'token-label-font-size',
        kind: 'cssToken',
        ref: '--ui-input-label-font-size',
        group: 'typography',
        label: 'Label Font Size',
        order: 2
      },
      {
        id: 'token-padding',
        kind: 'cssToken',
        ref: '--ui-input-padding',
        group: 'spacing',
        label: 'Padding',
        order: 1
      },
      {
        id: 'token-floating-padding-top',
        kind: 'cssToken',
        ref: '--ui-input-floating-padding-top',
        group: 'floating',
        label: 'Floating Padding Top',
        order: 1
      },
      {
        id: 'token-floating-padding-right',
        kind: 'cssToken',
        ref: '--ui-input-floating-padding-right',
        group: 'floating',
        label: 'Floating Padding Right',
        order: 2
      },
      {
        id: 'token-floating-padding-bottom',
        kind: 'cssToken',
        ref: '--ui-input-floating-padding-bottom',
        group: 'floating',
        label: 'Floating Padding Bottom',
        order: 3
      },
      {
        id: 'token-floating-padding-left',
        kind: 'cssToken',
        ref: '--ui-input-floating-padding-left',
        group: 'floating',
        label: 'Floating Padding Left',
        order: 4
      },
      {
        id: 'token-floating-label-left',
        kind: 'cssToken',
        ref: '--ui-input-floating-label-left',
        group: 'floating',
        label: 'Floating Label Left',
        order: 5
      },
      {
        id: 'token-border',
        kind: 'cssToken',
        ref: '--ui-input-border',
        group: 'shape',
        label: 'Border',
        order: 1
      },
      {
        id: 'token-radius',
        kind: 'cssToken',
        ref: '--ui-input-radius',
        group: 'shape',
        label: 'Radius',
        order: 2
      },
      {
        id: 'token-bg',
        kind: 'cssToken',
        ref: '--ui-input-bg',
        group: 'color',
        label: 'Background',
        order: 1
      },
      {
        id: 'token-color',
        kind: 'cssToken',
        ref: '--ui-input-color',
        group: 'color',
        label: 'Text Color',
        order: 2
      },
      {
        id: 'token-placeholder-color',
        kind: 'cssToken',
        ref: '--ui-input-placeholder-color',
        group: 'color',
        label: 'Placeholder Color',
        order: 3
      },
      {
        id: 'token-label-color',
        kind: 'cssToken',
        ref: '--ui-input-label-color',
        group: 'color',
        label: 'Label Color',
        order: 4
      },
      {
        id: 'token-focus-ring',
        kind: 'cssToken',
        ref: '--ui-input-focus-ring',
        group: 'state',
        label: 'Focus Ring',
        order: 1
      }
    ]
  }
};
