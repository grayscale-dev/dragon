import type { ComponentManifest } from '../schema.js';
import { inputCssTokens } from './shared.js';

export const duiCurrencyInputManifest: ComponentManifest = {
  tag: 'dui-currency-input',
  title: 'Currency Input',
  description: 'Currency-focused numeric input with currency defaults and locale formatting.',
  status: 'stable',
  attributes: [
    { name: 'value', description: 'Current numeric value.', type: 'string', default: '', control: 'text' },
    { name: 'currency', description: 'ISO 4217 currency code.', type: 'string', default: 'USD', control: 'text' },
    { name: 'currency-display', description: 'Currency display style.', type: '"symbol" | "code" | "name"', default: 'symbol', control: 'select', options: [
      { value: 'symbol', label: 'Symbol' },
      { value: 'code', label: 'Code' },
      { value: 'name', label: 'Name' }
    ] },
    { name: 'locale', description: 'Locale used for formatting.', type: 'string', default: '', control: 'text' },
    { name: 'min', description: 'Minimum numeric value.', type: 'number', control: 'number' },
    { name: 'max', description: 'Maximum numeric value.', type: 'number', control: 'number' },
    { name: 'step', description: 'Arrow key increment step.', type: 'number', default: 1, control: 'number' }
  ],
  properties: [
    { name: 'value', description: 'Live numeric value.', type: 'string', default: '' },
    { name: 'mode', description: 'Always defaults to currency mode.', type: '"decimal" | "currency" | ""', default: 'currency' }
  ],
  events: [
    { name: 'input', description: 'Dispatched on each edit.', bubbles: true, composed: true },
    { name: 'change', description: 'Dispatched on commit.', bubbles: true, composed: true }
  ],
  parts: [{ name: 'input', description: 'Styles the internal native <input>.' }],
  cssTokens: inputCssTokens,
  builder: {
    groups: [
      { id: 'currency', label: 'Currency', order: 1 },
      { id: 'style', label: 'Style', order: 2 }
    ],
    controls: [
      { id: 'currency', kind: 'attribute', ref: 'currency', group: 'currency', label: 'Currency', order: 1 },
      { id: 'currency-display', kind: 'attribute', ref: 'currency-display', group: 'currency', label: 'Currency Display', order: 2 },
      { id: 'locale', kind: 'attribute', ref: 'locale', group: 'currency', label: 'Locale', order: 3 },
      { id: 'token-padding', kind: 'cssToken', ref: '--ui-input-padding', group: 'style', label: 'Padding', order: 1 },
      { id: 'token-border', kind: 'cssToken', ref: '--ui-input-border', group: 'style', label: 'Border', order: 2 }
    ]
  }
};
