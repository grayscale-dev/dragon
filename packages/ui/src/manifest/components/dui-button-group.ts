import type { ComponentManifest } from '../schema.js';
import { buttonGroupCssTokens } from './shared.js';

export const duiButtonGroupManifest: ComponentManifest = {
  tag: 'dui-button-group',
  title: 'Button Group',
  description: 'Groups multiple dui-button elements into one merged segmented control.',
  status: 'stable',
  attributes: [
    {
      name: 'block',
      description: 'When true, group fills available width and buttons flex equally.',
      type: 'boolean',
      default: false,
      control: 'boolean'
    }
  ],
  properties: [
    { name: 'block', description: 'Block display mode.', type: 'boolean', default: false }
  ],
  parts: [{ name: 'group', description: 'Styles the internal group container.' }],
  cssTokens: buttonGroupCssTokens,
  builder: {
    groups: [
      { id: 'layout', label: 'Layout', order: 1 },
      { id: 'style', label: 'Style', order: 2 }
    ],
    controls: [
      { id: 'block', kind: 'attribute', ref: 'block', group: 'layout', label: 'Block Width', order: 1 },
      {
        id: 'group-radius',
        kind: 'cssToken',
        ref: '--ui-button-group-radius',
        group: 'style',
        label: 'Group Radius',
        order: 1
      },
      {
        id: 'group-overlap',
        kind: 'cssToken',
        ref: '--ui-button-group-border-overlap',
        group: 'style',
        label: 'Border Overlap',
        order: 2
      }
    ]
  },
  examples: {
    groups: [{ id: 'basic', label: 'Basic', order: 1 }],
    items: [
      {
        id: 'basic-three-buttons',
        group: 'basic',
        title: 'Merged Button Set',
        order: 1,
        preview: {
          attributes: { block: false }
        },
        snippets: [
          {
            framework: 'vanilla',
            lang: 'html',
            code: '<dui-button-group>\n  <dui-button label="Left"></dui-button>\n  <dui-button label="Center"></dui-button>\n  <dui-button label="Right"></dui-button>\n</dui-button-group>'
          },
          {
            framework: 'react',
            lang: 'tsx',
            code: '<dui-button-group>\n  <dui-button label="Left" />\n  <dui-button label="Center" />\n  <dui-button label="Right" />\n</dui-button-group>'
          }
        ]
      }
    ]
  }
};
