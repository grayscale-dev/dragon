import { z } from 'zod';

const DefaultValueSchema = z.union([z.string(), z.number(), z.boolean()]);

const SelectOptionSchema = z
  .object({
    value: z.string().min(1),
    label: z.string().min(1).optional(),
    description: z.string().min(1).optional()
  })
  .strict();

export const AttributeMetaSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    type: z.string().min(1),
    required: z.boolean().optional(),
    default: DefaultValueSchema.optional(),
    control: z.enum(['text', 'number', 'boolean', 'select', 'color']).optional(),
    options: z.array(SelectOptionSchema).min(1).optional()
  })
  .strict();

export const PropertyMetaSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    type: z.string().min(1),
    default: DefaultValueSchema.optional(),
    readonly: z.boolean().optional()
  })
  .strict();

export const EventMetaSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    bubbles: z.boolean().optional(),
    composed: z.boolean().optional()
  })
  .strict();

export const PartMetaSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1)
  })
  .strict();

export const CssTokenMetaSchema = z
  .object({
    name: z.string().regex(/^--[a-z0-9-]+$/),
    group: z.string().min(1),
    description: z.string().min(1),
    default: z.string().min(1),
    control: z.enum(['text', 'color', 'number', 'border', 'shadow']),
    placeholder: z.string().min(1).optional(),
    examples: z.array(z.string().min(1)).min(1).optional()
  })
  .strict();

const BuilderGroupSchema = z
  .object({
    id: z.string().min(1),
    label: z.string().min(1),
    description: z.string().min(1).optional(),
    order: z.number().int().nonnegative()
  })
  .strict();

const BuilderControlSchema = z
  .object({
    id: z.string().min(1),
    kind: z.enum(['cssToken', 'attribute']),
    ref: z.string().min(1),
    group: z.string().min(1),
    label: z.string().min(1),
    description: z.string().min(1).optional(),
    order: z.number().int().nonnegative()
  })
  .strict();

export const BuilderMetaSchema = z
  .object({
    groups: z.array(BuilderGroupSchema),
    controls: z.array(BuilderControlSchema)
  })
  .strict();

export const ComponentManifestSchema = z
  .object({
    tag: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.enum(['stable', 'beta', 'experimental']).optional(),
    attributes: z.array(AttributeMetaSchema),
    properties: z.array(PropertyMetaSchema).optional(),
    events: z.array(EventMetaSchema).optional(),
    parts: z.array(PartMetaSchema).optional(),
    cssTokens: z.array(CssTokenMetaSchema),
    builder: BuilderMetaSchema
  })
  .strict();

export const ManifestSchema = z
  .object({
    version: z.literal(1),
    package: z.string().min(1),
    components: z.array(ComponentManifestSchema)
  })
  .strict();

export type AttributeMeta = z.infer<typeof AttributeMetaSchema>;
export type PropertyMeta = z.infer<typeof PropertyMetaSchema>;
export type EventMeta = z.infer<typeof EventMetaSchema>;
export type PartMeta = z.infer<typeof PartMetaSchema>;
export type CssTokenMeta = z.infer<typeof CssTokenMetaSchema>;
export type BuilderMeta = z.infer<typeof BuilderMetaSchema>;
export type BuilderControl = z.infer<typeof BuilderControlSchema>;
export type ComponentManifest = z.infer<typeof ComponentManifestSchema>;
export type DragonManifest = z.infer<typeof ManifestSchema>;
