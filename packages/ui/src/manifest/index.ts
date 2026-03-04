import { duiButtonGroupManifest } from './components/dui-button-group.js';
import { duiButtonManifest } from './components/dui-button.js';
import { duiCurrencyInputManifest } from './components/dui-currency-input.js';
import { duiDateInputManifest } from './components/dui-date-input.js';
import { duiDropdownManifest } from './components/dui-dropdown.js';
import { duiInputManifest } from './components/dui-input.js';
import { duiMaskInputManifest } from './components/dui-mask-input.js';
import { duiNumberInputManifest } from './components/dui-number-input.js';
import { ManifestSchema, type DragonManifest } from './schema.js';

export const manifest: DragonManifest = {
  version: 1,
  package: '@grayscale-dev/dragon',
  components: [
    duiInputManifest,
    duiButtonManifest,
    duiButtonGroupManifest,
    duiMaskInputManifest,
    duiNumberInputManifest,
    duiCurrencyInputManifest,
    duiDateInputManifest,
    duiDropdownManifest
  ]
};

export function getManifest(): DragonManifest {
  return ManifestSchema.parse(manifest);
}

export {
  ManifestSchema,
  AttributeMetaSchema,
  PropertyMetaSchema,
  EventMetaSchema,
  PartMetaSchema,
  CssTokenMetaSchema,
  BuilderMetaSchema,
  ComponentManifestSchema,
  ExampleGroupSchema,
  ExampleSnippetSchema,
  ExamplePreviewSchema,
  ExampleItemSchema,
  ComponentExamplesSchema
} from './schema.js';

export type {
  DragonManifest,
  ComponentManifest,
  AttributeMeta,
  PropertyMeta,
  EventMeta,
  PartMeta,
  CssTokenMeta,
  BuilderMeta,
  BuilderControl,
  ExampleGroup,
  ExampleSnippet,
  ExamplePreview,
  ExampleItem,
  ComponentExamples
} from './schema.js';
