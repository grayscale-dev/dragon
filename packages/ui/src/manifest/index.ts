import { duiInputManifest } from './components/dui-input.js';
import { ManifestSchema, type DragonManifest } from './schema.js';

export const manifest: DragonManifest = {
  version: 1,
  package: '@grayscale-dev/dragon',
  components: [duiInputManifest]
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
  ComponentManifestSchema
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
  BuilderControl
} from './schema.js';
