import type { ComponentManifest } from '../schema.js';
import { buttonCssTokens } from './shared.js';

export const duiButtonManifest: ComponentManifest = {
  tag: 'dui-button',
  title: 'Button',
  description: 'Native-like button with form submit/reset support and themeable tokens.',
  status: 'stable',
  attributes: [
    {
      name: 'type',
      description: 'Button behavior type.',
      type: '"button" | "submit" | "reset"',
      default: 'button',
      control: 'select',
      options: [
        { value: 'button', label: 'Button' },
        { value: 'submit', label: 'Submit' },
        { value: 'reset', label: 'Reset' }
      ]
    },
    {
      name: 'disabled',
      description: 'Disables interaction.',
      type: 'boolean',
      default: false,
      control: 'boolean'
    },
    {
      name: 'name',
      description: 'Form field name for submit buttons.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'value',
      description: 'Form field value for submit buttons.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'label',
      description: 'Fallback label text when no slotted content is provided.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'badge',
      description: 'Optional badge text displayed to the right of the label.',
      type: 'string',
      default: '',
      control: 'text'
    },
    {
      name: 'block',
      description: 'When true, button fills available width.',
      type: 'boolean',
      default: false,
      control: 'boolean'
    },
    {
      name: 'size',
      description: 'Button size preset.',
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: 'md',
      control: 'select',
      options: [
        { value: 'xs', label: 'XS' },
        { value: 'sm', label: 'SM' },
        { value: 'md', label: 'MD' },
        { value: 'lg', label: 'LG' },
        { value: 'xl', label: 'XL' }
      ]
    },
    {
      name: 'severity',
      description: 'Visual severity preset.',
      type: '"plain" | "primary" | "secondary" | "success" | "info" | "warning" | "help" | "danger"',
      default: 'plain',
      control: 'select',
      options: [
        { value: 'plain', label: 'Plain' },
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'success', label: 'Success' },
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'help', label: 'Help' },
        { value: 'danger', label: 'Danger' }
      ]
    },
    {
      name: 'variant',
      description: 'Visual variant.',
      type: '"standard" | "ghost" | "outline" | "round"',
      default: 'standard',
      control: 'select',
      options: [
        { value: 'standard', label: 'Standard' },
        { value: 'ghost', label: 'Ghost' },
        { value: 'outline', label: 'Outline' },
        { value: 'round', label: 'Round' }
      ]
    },
    {
      name: 'badge-severity',
      description: 'Badge severity preset.',
      type: '"plain" | "primary" | "secondary" | "success" | "info" | "warning" | "help" | "danger"',
      default: 'plain',
      control: 'select',
      options: [
        { value: 'plain', label: 'Plain' },
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'success', label: 'Success' },
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'help', label: 'Help' },
        { value: 'danger', label: 'Danger' }
      ]
    }
  ],
  properties: [
    { name: 'type', description: 'Current button type.', type: '"button" | "submit" | "reset"', default: 'button' },
    { name: 'disabled', description: 'Disabled state.', type: 'boolean', default: false },
    { name: 'name', description: 'Form name.', type: 'string', default: '' },
    { name: 'value', description: 'Form value.', type: 'string', default: '' },
    { name: 'label', description: 'Fallback text label.', type: 'string', default: '' },
    { name: 'badge', description: 'Badge text.', type: 'string', default: '' },
    { name: 'block', description: 'Block display mode.', type: 'boolean', default: false },
    { name: 'size', description: 'Current size preset.', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: 'md' },
    { name: 'severity', description: 'Current severity preset.', type: '"plain" | "primary" | "secondary" | "success" | "info" | "warning" | "help" | "danger"', default: 'plain' },
    { name: 'variant', description: 'Current variant.', type: '"standard" | "ghost" | "outline" | "round"', default: 'standard' },
    { name: 'badgeSeverity', description: 'Current badge severity preset.', type: '"plain" | "primary" | "secondary" | "success" | "info" | "warning" | "help" | "danger"', default: 'plain' }
  ],
  events: [
    { name: 'click', description: 'Native click event from the host button.', bubbles: true, composed: true },
    { name: 'focus', description: 'Native focus event from internal button.', bubbles: true, composed: true },
    { name: 'blur', description: 'Native blur event from internal button.', bubbles: true, composed: true }
  ],
  parts: [{ name: 'button', description: 'Styles the internal native <button>.' }, { name: 'badge', description: 'Styles the internal badge.' }],
  cssTokens: buttonCssTokens,
  builder: {
    groups: [
      { id: 'content', label: 'Content', order: 1 },
      { id: 'behavior', label: 'Behavior', order: 2 },
      { id: 'style', label: 'Style', order: 3 }
    ],
    controls: [
      { id: 'type', kind: 'attribute', ref: 'type', group: 'behavior', label: 'Type', order: 1 },
      { id: 'disabled', kind: 'attribute', ref: 'disabled', group: 'behavior', label: 'Disabled', order: 2 },
      { id: 'block', kind: 'attribute', ref: 'block', group: 'behavior', label: 'Block Width', order: 3 },
      { id: 'size', kind: 'attribute', ref: 'size', group: 'behavior', label: 'Size', order: 4 },
      { id: 'severity', kind: 'attribute', ref: 'severity', group: 'behavior', label: 'Severity', order: 5 },
      { id: 'variant', kind: 'attribute', ref: 'variant', group: 'behavior', label: 'Variant', order: 6 },
      { id: 'badge-severity', kind: 'attribute', ref: 'badge-severity', group: 'behavior', label: 'Badge Severity', order: 7 },
      { id: 'value', kind: 'attribute', ref: 'value', group: 'content', label: 'Value', order: 1 },
      { id: 'label', kind: 'attribute', ref: 'label', group: 'content', label: 'Label', order: 2 },
      { id: 'badge', kind: 'attribute', ref: 'badge', group: 'content', label: 'Badge', order: 3 },
      { id: 'token-padding', kind: 'cssToken', ref: '--ui-button-padding', group: 'style', label: 'Padding', order: 1 },
      { id: 'token-bg', kind: 'cssToken', ref: '--ui-button-bg', group: 'style', label: 'Background', order: 2 },
      { id: 'token-color', kind: 'cssToken', ref: '--ui-button-color', group: 'style', label: 'Text Color', order: 3 },
      { id: 'token-border', kind: 'cssToken', ref: '--ui-button-border', group: 'style', label: 'Border', order: 4 },
      { id: 'token-radius', kind: 'cssToken', ref: '--ui-button-radius', group: 'style', label: 'Radius', order: 5 },
      { id: 'token-focus-ring', kind: 'cssToken', ref: '--ui-button-focus-ring', group: 'style', label: 'Focus Ring', order: 6 }
    ]
  },
  examples: {
    groups: [
      { id: 'basic', label: 'Basic', order: 1 },
      { id: 'forms', label: 'Forms', order: 2 },
      { id: 'styling', label: 'Styling', order: 3 }
    ],
    items: [
      {
        id: 'basic-button',
        group: 'basic',
        title: 'Default Button',
        order: 1,
        preview: {
          attributes: { type: 'button', size: 'md', severity: 'plain', variant: 'standard', badge: '3', 'badge-severity': 'plain' },
          notes: 'Button text can come from slot content or the label attribute.'
        },
        snippets: [
          { framework: 'vanilla', lang: 'html', code: '<dui-button label="Save" severity="plain" badge="3"></dui-button>' },
          { framework: 'react', lang: 'tsx', code: '<dui-button label="Save" severity="plain" badge="3" />' }
        ]
      },
      {
        id: 'form-submit',
        group: 'forms',
        title: 'Submit Button',
        order: 1,
        preview: {
          attributes: { type: 'submit', name: 'intent', value: 'save' }
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<form>\n  <dui-button type="submit" name="intent" value="save">Save</dui-button>\n</form>'
          }
        ]
      },
      {
        id: 'style-tokens',
        group: 'styling',
        title: 'Token Styling',
        order: 1,
        preview: {
          tokens: {
            '--ui-button-bg': '#0f766e',
            '--ui-button-hover-bg': '#115e59',
            '--ui-button-radius': '999px'
          }
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'css',
            code: 'dui-button.brand {\n  --ui-button-bg: #0f766e;\n  --ui-button-hover-bg: #115e59;\n  --ui-button-radius: 999px;\n}'
          }
        ]
      }
    ]
  }
};
