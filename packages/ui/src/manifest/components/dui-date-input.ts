import type { ComponentManifest } from '../schema.js';
import { inputCssTokens } from './shared.js';

export const duiDateInputManifest: ComponentManifest = {
  tag: 'dui-date-input',
  title: 'Date Input',
  description: 'Date-oriented masked input with YYYY-MM-DD defaults.',
  status: 'stable',
  attributes: [
    { name: 'value', description: 'Current date value.', type: 'string', default: '', control: 'text' },
    { name: 'input-mask', description: 'Date mask pattern.', type: 'string', default: '9999-99-99', control: 'text' },
    { name: 'placeholder', description: 'Date placeholder.', type: 'string', default: 'YYYY-MM-DD', control: 'text' },
    { name: 'label', description: 'Visible label text.', type: 'string', default: '', control: 'text' }
  ],
  properties: [
    { name: 'value', description: 'Live value property.', type: 'string', default: '' }
  ],
  events: [
    { name: 'input', description: 'Dispatched on each edit.', bubbles: true, composed: true },
    { name: 'change', description: 'Dispatched on commit.', bubbles: true, composed: true },
    { name: 'complete', description: 'Dispatched when date mask is complete.', bubbles: true, composed: true }
  ],
  parts: [{ name: 'input', description: 'Styles the internal native <input>.' }],
  cssTokens: inputCssTokens,
  builder: {
    groups: [
      { id: 'date', label: 'Date', order: 1 },
      { id: 'style', label: 'Style', order: 2 }
    ],
    controls: [
      { id: 'input-mask', kind: 'attribute', ref: 'input-mask', group: 'date', label: 'Mask', order: 1 },
      { id: 'placeholder', kind: 'attribute', ref: 'placeholder', group: 'date', label: 'Placeholder', order: 2 },
      { id: 'token-padding', kind: 'cssToken', ref: '--ui-input-padding', group: 'style', label: 'Padding', order: 1 },
      { id: 'token-border', kind: 'cssToken', ref: '--ui-input-border', group: 'style', label: 'Border', order: 2 }
    ]
  }
};
