import type { ComponentManifest } from '../schema.js';

export const duiInputManifest: ComponentManifest = {
  tag: 'dui-input',
  title: 'Input',
  description: 'Text input field with optional above or floating label modes.',
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
      name: 'input-mask',
      description: 'Inputmask mask expression used to constrain user input.',
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
      description: 'Inputmask mask expression used for masking.',
      type: 'string',
      default: ''
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
        id: 'input-mask',
        kind: 'attribute',
        ref: 'input-mask',
        group: 'mask',
        label: 'Input Mask',
        order: 1
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
