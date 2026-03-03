import type { ComponentManifest } from '../schema.js';
import { inputCssTokens } from './shared.js';

export const duiNumberInputManifest: ComponentManifest = {
  tag: 'dui-number-input',
  title: 'Number Input',
  description: 'Numeric input built on dui-mask-input defaults with decimal mode and step key controls.',
  status: 'stable',
  attributes: [
    { name: 'value', description: 'Current numeric value as string.', type: 'string', default: '', control: 'text' },
    { name: 'min', description: 'Minimum numeric value.', type: 'number', control: 'number' },
    { name: 'max', description: 'Maximum numeric value.', type: 'number', control: 'number' },
    { name: 'step', description: 'Arrow key increment step.', type: 'number', default: 1, control: 'number' },
    { name: 'locale', description: 'Locale used for number formatting.', type: 'string', default: '', control: 'text' },
    { name: 'use-grouping', description: 'Enable thousands grouping.', type: 'boolean', default: true, control: 'boolean' },
    { name: 'min-fraction-digits', description: 'Minimum fraction digits.', type: 'number', control: 'number' },
    { name: 'max-fraction-digits', description: 'Maximum fraction digits.', type: 'number', control: 'number' },
    { name: 'label', description: 'Visible label text.', type: 'string', default: '', control: 'text' },
    {
      name: 'label-position',
      description: 'Label layout.',
      type: '"above" | "floating"',
      default: 'above',
      control: 'select',
      options: [
        { value: 'above', label: 'Above' },
        { value: 'floating', label: 'Floating' }
      ]
    }
  ],
  properties: [
    { name: 'value', description: 'Live value property.', type: 'string', default: '' },
    { name: 'mode', description: 'Number mode (defaults to decimal).', type: '"decimal" | "currency" | ""', default: 'decimal' }
  ],
  events: [
    { name: 'input', description: 'Dispatched on each edit.', bubbles: true, composed: true },
    { name: 'change', description: 'Dispatched on commit.', bubbles: true, composed: true },
    { name: 'complete', description: 'Dispatched when mask is fully complete.', bubbles: true, composed: true }
  ],
  parts: [{ name: 'input', description: 'Styles the internal native <input>.' }],
  cssTokens: inputCssTokens,
  builder: {
    groups: [
      { id: 'content', label: 'Content', order: 1 },
      { id: 'number', label: 'Number', order: 2 },
      { id: 'style', label: 'Style', order: 3 }
    ],
    controls: [
      { id: 'label', kind: 'attribute', ref: 'label', group: 'content', label: 'Label', order: 1 },
      { id: 'label-position', kind: 'attribute', ref: 'label-position', group: 'content', label: 'Label Position', order: 2 },
      { id: 'locale', kind: 'attribute', ref: 'locale', group: 'number', label: 'Locale', order: 1 },
      { id: 'step', kind: 'attribute', ref: 'step', group: 'number', label: 'Step', order: 2 },
      { id: 'min', kind: 'attribute', ref: 'min', group: 'number', label: 'Min', order: 3 },
      { id: 'max', kind: 'attribute', ref: 'max', group: 'number', label: 'Max', order: 4 },
      { id: 'token-padding', kind: 'cssToken', ref: '--ui-input-padding', group: 'style', label: 'Padding', order: 1 },
      { id: 'token-border', kind: 'cssToken', ref: '--ui-input-border', group: 'style', label: 'Border', order: 2 }
    ]
  }
};
