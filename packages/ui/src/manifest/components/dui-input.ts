import type { ComponentManifest } from '../schema.js';
import { inputCssTokens } from './shared.js';

export const duiInputManifest: ComponentManifest = {
  tag: 'dui-input',
  title: 'Input',
  description: 'Plain text input with native-like events and form association.',
  status: 'stable',
  attributes: [
    { name: 'value', description: 'Current input value.', type: 'string', default: '', control: 'text' },
    { name: 'placeholder', description: 'Placeholder text.', type: 'string', default: '', control: 'text' },
    { name: 'name', description: 'Form field name.', type: 'string', default: '', control: 'text' },
    { name: 'disabled', description: 'Disables interaction.', type: 'boolean', default: false, control: 'boolean' },
    { name: 'required', description: 'Marks the field required.', type: 'boolean', default: false, control: 'boolean' },
    { name: 'type', description: 'Native input type.', type: 'string', default: 'text', control: 'text' },
    { name: 'autocomplete', description: 'Native autocomplete hint.', type: 'string', control: 'text' },
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
    { name: 'labelPosition', description: 'Current label layout.', type: '"above" | "floating"', default: 'above' }
  ],
  events: [
    { name: 'input', description: 'Dispatched on each keystroke.', bubbles: true, composed: true },
    { name: 'change', description: 'Dispatched on blur or Enter.', bubbles: true, composed: true },
    { name: 'focus', description: 'Forwarded focus event.', bubbles: true, composed: true },
    { name: 'blur', description: 'Forwarded blur event.', bubbles: true, composed: true }
  ],
  parts: [{ name: 'input', description: 'Styles the internal native <input>.' }],
  cssTokens: inputCssTokens,
  builder: {
    groups: [
      { id: 'content', label: 'Content', order: 1 },
      { id: 'behavior', label: 'Behavior', order: 2 },
      { id: 'style', label: 'Style', order: 3 }
    ],
    controls: [
      { id: 'label', kind: 'attribute', ref: 'label', group: 'content', label: 'Label', order: 1 },
      { id: 'placeholder', kind: 'attribute', ref: 'placeholder', group: 'content', label: 'Placeholder', order: 2 },
      { id: 'label-position', kind: 'attribute', ref: 'label-position', group: 'content', label: 'Label Position', order: 3 },
      { id: 'type', kind: 'attribute', ref: 'type', group: 'behavior', label: 'Type', order: 1 },
      { id: 'disabled', kind: 'attribute', ref: 'disabled', group: 'behavior', label: 'Disabled', order: 2 },
      { id: 'required', kind: 'attribute', ref: 'required', group: 'behavior', label: 'Required', order: 3 },
      { id: 'token-padding', kind: 'cssToken', ref: '--ui-input-padding', group: 'style', label: 'Padding', order: 1 },
      { id: 'token-border', kind: 'cssToken', ref: '--ui-input-border', group: 'style', label: 'Border', order: 2 },
      { id: 'token-radius', kind: 'cssToken', ref: '--ui-input-radius', group: 'style', label: 'Radius', order: 3 },
      { id: 'token-focus-ring', kind: 'cssToken', ref: '--ui-input-focus-ring', group: 'style', label: 'Focus Ring', order: 4 }
    ]
  },
  examples: {
    groups: [
      {
        id: 'basic',
        label: 'Basic',
        description: 'Simple usage and state binding patterns.',
        order: 1
      },
      {
        id: 'forms',
        label: 'Forms',
        description: 'Native form behavior and submission.',
        order: 2
      },
      {
        id: 'validation',
        label: 'Validation',
        description: 'Required fields and browser validation hooks.',
        order: 3
      },
      {
        id: 'styling',
        label: 'Styling',
        description: 'Token theming and part-based overrides.',
        order: 4
      }
    ],
    items: [
      {
        id: 'basic-plain',
        group: 'basic',
        title: 'Plain Input',
        description: 'Render a plain text input with label and placeholder.',
        order: 1,
        tags: ['label', 'placeholder'],
        featured: true,
        difficulty: 'beginner',
        preview: {
          attributes: {
            label: 'Full Name',
            placeholder: 'Jane Doe',
            'label-position': 'above'
          },
          value: ''
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<dui-input label="Full Name" placeholder="Jane Doe"></dui-input>'
          },
          {
            framework: 'react',
            lang: 'tsx',
            code: '<dui-input label="Full Name" placeholder="Jane Doe" />'
          }
        ]
      },
      {
        id: 'basic-floating-label',
        group: 'basic',
        title: 'Floating Label',
        description: 'Use floating label layout for compact forms.',
        order: 2,
        difficulty: 'beginner',
        related: ['basic-plain'],
        preview: {
          attributes: {
            label: 'Email',
            'label-position': 'floating',
            autocomplete: 'email'
          }
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<dui-input label="Email" label-position="floating" autocomplete="email"></dui-input>'
          },
          {
            framework: 'react',
            lang: 'tsx',
            code: '<dui-input label="Email" label-position="floating" autoComplete="email" />'
          },
          {
            framework: 'ember',
            lang: 'hbs',
            code: '<dui-input label="Email" label-position="floating" autocomplete="email" />'
          }
        ]
      },
      {
        id: 'basic-live-value',
        group: 'basic',
        title: 'Live Value Binding',
        description: 'Read host value from input event currentTarget.',
        order: 3,
        difficulty: 'intermediate',
        preview: {
          attributes: {
            label: 'Search',
            placeholder: 'Type to filter'
          }
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<dui-input id="search"></dui-input>\n<script>\n  const el = document.getElementById("search");\n  el.addEventListener("input", (e) => console.log(e.currentTarget.value));\n</script>'
          },
          {
            framework: 'react',
            lang: 'tsx',
            code: '<dui-input onInput={(e) => setValue((e.currentTarget as any).value)} />'
          }
        ]
      },
      {
        id: 'forms-submit',
        group: 'forms',
        title: 'Form Submission',
        description: 'Submit dui-input value through native FormData.',
        order: 1,
        tags: ['form-associated'],
        featured: true,
        difficulty: 'beginner',
        preview: {
          attributes: {
            name: 'username',
            label: 'Username'
          },
          value: 'dragon'
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<form id="f">\n  <dui-input name="username" value="dragon"></dui-input>\n</form>'
          },
          {
            framework: 'react',
            lang: 'tsx',
            code: '<form onSubmit={onSubmit}>\n  <dui-input name="username" defaultValue="dragon" />\n</form>'
          }
        ]
      },
      {
        id: 'forms-autocomplete',
        group: 'forms',
        title: 'Autocomplete and Name',
        description: 'Set native name and autocomplete attributes.',
        order: 2,
        difficulty: 'beginner',
        related: ['forms-submit'],
        preview: {
          attributes: {
            name: 'email',
            autocomplete: 'email',
            type: 'email',
            label: 'Email'
          }
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<dui-input name="email" autocomplete="email" type="email" label="Email"></dui-input>'
          }
        ]
      },
      {
        id: 'validation-required',
        group: 'validation',
        title: 'Required Field',
        description: 'Leverage native required validation with forms.',
        order: 1,
        tags: ['required'],
        difficulty: 'beginner',
        preview: {
          attributes: {
            required: true,
            label: 'Project Name'
          }
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<dui-input required label="Project Name"></dui-input>'
          },
          {
            framework: 'react',
            lang: 'tsx',
            code: '<dui-input required label="Project Name" />'
          },
          {
            framework: 'ember',
            lang: 'hbs',
            code: '<dui-input @required={{true}} label="Project Name" />'
          }
        ]
      },
      {
        id: 'styling-css-vars',
        group: 'styling',
        title: 'Theme with CSS Variables',
        description: 'Apply component tokens from host selector.',
        order: 1,
        featured: true,
        difficulty: 'intermediate',
        preview: {
          attributes: {
            label: 'Styled Input',
            placeholder: 'Token themed'
          },
          tokens: {
            '--ui-input-padding': '12px 16px',
            '--ui-input-border': '1px solid #0f766e',
            '--ui-input-focus-ring': '0 0 0 3px rgba(15, 118, 110, 0.25)'
          }
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'css',
            code: 'dui-input.brand {\n  --ui-input-padding: 12px 16px;\n  --ui-input-border: 1px solid #0f766e;\n}'
          },
          {
            framework: 'react',
            lang: 'tsx',
            code: '<dui-input class="brand" label="Styled Input" />'
          }
        ]
      },
      {
        id: 'styling-part-input',
        group: 'styling',
        title: 'Style Internal Input Part',
        description: 'Target the native input through part="input".',
        order: 2,
        difficulty: 'intermediate',
        related: ['styling-css-vars'],
        preview: {
          attributes: {
            label: 'Part Styling'
          },
          notes: 'Use ::part(input) for direct internal input styling.'
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'css',
            code: 'dui-input::part(input) {\n  font-weight: 600;\n  letter-spacing: 0.01em;\n}'
          }
        ]
      }
    ]
  }
};
