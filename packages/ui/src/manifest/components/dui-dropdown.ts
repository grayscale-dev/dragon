import type { ComponentManifest } from '../schema.js';
import { dropdownCssTokens } from './shared.js';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'done', label: 'Done' }
] as const;

const assigneeOptions = [
  { value: 'u-1', label: 'Ava Nguyen' },
  { value: 'u-2', label: 'Kai Patel' },
  { value: 'u-3', label: 'Mia Johnson' },
  { value: 'u-4', label: 'Noah Chen' }
] as const;

export const duiDropdownManifest: ComponentManifest = {
  tag: 'dui-dropdown',
  title: 'Dropdown',
  description: 'Hybrid select/combobox with searchable and multi-select modes.',
  status: 'stable',
  attributes: [
    {
      name: 'options',
      description: 'Options list. Pass JSON array in markup or assign an array to the property.',
      type: 'DropdownOption[] | string(JSON)',
      control: 'text'
    },
    { name: 'value', description: 'Selected value in single-select mode.', type: 'string', default: '', control: 'text' },
    {
      name: 'values',
      description: 'Selected values in multi-select mode (JSON array or comma-delimited string).',
      type: 'string[]',
      default: '[]',
      control: 'text'
    },
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
    },
    { name: 'placeholder', description: 'Placeholder text when no option is selected.', type: 'string', default: 'Select an option', control: 'text' },
    { name: 'searchable', description: 'Enables combobox filtering behavior.', type: 'boolean', default: false, control: 'boolean' },
    { name: 'multi-select', description: 'Allows selecting multiple options with checkboxes.', type: 'boolean', default: false, control: 'boolean' },
    { name: 'max-items-shown', description: 'Max visible options before the panel scrolls.', type: 'number', default: 6, control: 'number' },
    { name: 'name', description: 'Form field name for form-associated submission.', type: 'string', default: '', control: 'text' },
    { name: 'disabled', description: 'Disables the control.', type: 'boolean', default: false, control: 'boolean' },
    { name: 'required', description: 'Marks the field required.', type: 'boolean', default: false, control: 'boolean' }
  ],
  properties: [
    { name: 'options', description: 'Array of options with shape { value, label, disabled? }.', type: 'DropdownOption[]', default: '[]' },
    { name: 'value', description: 'Selected value in single-select mode.', type: 'string', default: '' },
    { name: 'values', description: 'Selected values in multi-select mode.', type: 'string[]', default: '[]' },
    { name: 'labelPosition', description: 'Current label layout.', type: '"above" | "floating"', default: 'above' }
  ],
  events: [
    { name: 'input', description: 'Dispatched whenever selection changes.', bubbles: true, composed: true },
    { name: 'change', description: 'Dispatched whenever selection is committed.', bubbles: true, composed: true }
  ],
  parts: [
    { name: 'control', description: 'Main clickable field container.' },
    { name: 'input', description: 'Selected-value text/input area inside the control.' },
    { name: 'chevron', description: 'Chevron icon on the right side.' },
    { name: 'panel', description: 'Dropdown options panel.' },
    { name: 'option', description: 'Each option row button.' },
    { name: 'chip', description: 'Selected item chip in multi-select mode.' },
    { name: 'chip-remove', description: 'Remove button inside a selected chip.' }
  ],
  cssTokens: dropdownCssTokens,
  builder: {
    groups: [
      { id: 'content', label: 'Content', order: 1 },
      { id: 'behavior', label: 'Behavior', order: 2 },
      { id: 'style', label: 'Style', order: 3 }
    ],
    controls: [
      { id: 'label', kind: 'attribute', ref: 'label', group: 'content', label: 'Label', order: 1 },
      { id: 'label-position', kind: 'attribute', ref: 'label-position', group: 'content', label: 'Label Position', order: 2 },
      { id: 'placeholder', kind: 'attribute', ref: 'placeholder', group: 'content', label: 'Placeholder', order: 3 },
      { id: 'searchable', kind: 'attribute', ref: 'searchable', group: 'behavior', label: 'Searchable', order: 1 },
      { id: 'multi-select', kind: 'attribute', ref: 'multi-select', group: 'behavior', label: 'Multi Select', order: 2 },
      { id: 'max-items-shown', kind: 'attribute', ref: 'max-items-shown', group: 'behavior', label: 'Max Items Shown', order: 3 },
      { id: 'disabled', kind: 'attribute', ref: 'disabled', group: 'behavior', label: 'Disabled', order: 4 },
      { id: 'required', kind: 'attribute', ref: 'required', group: 'behavior', label: 'Required', order: 5 },
      { id: 'token-padding', kind: 'cssToken', ref: '--ui-input-padding', group: 'style', label: 'Padding', order: 1 },
      { id: 'token-border', kind: 'cssToken', ref: '--ui-input-border', group: 'style', label: 'Border', order: 2 },
      { id: 'token-radius', kind: 'cssToken', ref: '--ui-input-radius', group: 'style', label: 'Radius', order: 3 },
      { id: 'token-panel-shadow', kind: 'cssToken', ref: '--ui-dropdown-panel-shadow', group: 'style', label: 'Panel Shadow', order: 4 },
      { id: 'token-option-hover', kind: 'cssToken', ref: '--ui-dropdown-option-hover-bg', group: 'style', label: 'Option Hover', order: 5 }
    ]
  },
  examples: {
    groups: [
      { id: 'basic', label: 'Basic', order: 1 },
      { id: 'search', label: 'Search', order: 2 },
      { id: 'multi', label: 'Multi Select', order: 3 },
      { id: 'styling', label: 'Styling', order: 4 }
    ],
    items: [
      {
        id: 'basic-single',
        group: 'basic',
        title: 'Single Select',
        order: 1,
        preview: {
          attributes: {
            label: 'Status',
            'label-position': 'above',
            placeholder: 'Select status'
          },
          options: [...statusOptions],
          value: 'in-progress'
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<dui-dropdown id="status"></dui-dropdown>\n<script>\n  const el = document.getElementById("status");\n  el.options = [\n    { value: "new", label: "New" },\n    { value: "open", label: "Open" },\n    { value: "closed", label: "Closed" }\n  ];\n</script>'
          },
          {
            framework: 'react',
            lang: 'tsx',
            code: '<dui-dropdown placeholder="Select status" />'
          }
        ]
      },
      {
        id: 'searchable-mode',
        group: 'search',
        title: 'Searchable Combobox',
        order: 1,
        preview: {
          attributes: {
            label: 'Status',
            'label-position': 'floating',
            searchable: true,
            'max-items-shown': 5
          },
          options: [...statusOptions],
          value: 'new'
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<dui-dropdown searchable max-items-shown="5"></dui-dropdown>'
          },
          {
            framework: 'react',
            lang: 'tsx',
            code: '<dui-dropdown searchable max-items-shown={5} />'
          }
        ]
      },
      {
        id: 'multi-select-chips',
        group: 'multi',
        title: 'Multi Select with Chips',
        order: 1,
        preview: {
          attributes: {
            label: 'Assignees',
            'label-position': 'floating',
            'multi-select': true,
            searchable: true,
            placeholder: 'Assign users'
          },
          options: [...assigneeOptions],
          values: ['u-1', 'u-3']
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<dui-dropdown multi-select searchable placeholder="Assign users"></dui-dropdown>'
          },
          {
            framework: 'ember',
            lang: 'hbs',
            code: '<dui-dropdown multi-select searchable placeholder="Assign users" />'
          }
        ]
      },
      {
        id: 'dropdown-tokens',
        group: 'styling',
        title: 'Style with Tokens',
        order: 1,
        preview: {
          attributes: {
            label: 'Status',
            'label-position': 'above',
            searchable: true
          },
          options: [...statusOptions],
          value: 'blocked',
          tokens: {
            '--ui-dropdown-panel-shadow': '0 18px 30px rgba(15, 23, 42, 0.18)',
            '--ui-dropdown-option-hover-bg': 'rgba(56, 189, 248, 0.14)'
          }
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'css',
            code: 'dui-dropdown.brand {\n  --ui-dropdown-panel-shadow: 0 18px 30px rgba(15, 23, 42, 0.18);\n  --ui-dropdown-option-hover-bg: rgba(56, 189, 248, 0.14);\n}'
          }
        ]
      }
    ]
  }
};
