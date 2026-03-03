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

export const ExampleGroupSchema = z
  .object({
    id: z.string().min(1),
    label: z.string().min(1),
    description: z.string().min(1).optional(),
    order: z.number().int().nonnegative()
  })
  .strict();

export const ExampleSnippetSchema = z
  .object({
    framework: z.enum(['vanilla', 'react', 'ember', 'vue', 'angular', 'svelte', 'webc', 'other']),
    lang: z.string().min(1),
    title: z.string().min(1).optional(),
    code: z.string().min(1)
  })
  .strict();

const ExamplePreviewValueSchema = z.union([z.string(), z.number(), z.boolean()]);

export const ExamplePreviewSchema = z
  .object({
    attributes: z.record(z.string(), ExamplePreviewValueSchema).optional(),
    tokens: z.record(z.string(), z.string()).optional(),
    value: z.string().optional(),
    notes: z.string().min(1).optional()
  })
  .strict();

export const ExampleItemSchema = z
  .object({
    id: z.string().min(1),
    group: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    order: z.number().int().nonnegative(),
    tags: z.array(z.string().min(1)).optional(),
    featured: z.boolean().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    requires: z.array(z.string().min(1)).optional(),
    related: z.array(z.string().min(1)).optional(),
    preview: ExamplePreviewSchema.optional(),
    snippets: z.array(ExampleSnippetSchema).min(1)
  })
  .strict();

function pushDuplicateIdIssues(
  ctx: z.RefinementCtx,
  kind: 'group' | 'item',
  ids: string[],
  pathPrefix: ['groups'] | ['items']
): void {
  const idToIndexes = new Map<string, number[]>();
  ids.forEach((id, index) => {
    const existing = idToIndexes.get(id);
    if (existing) {
      existing.push(index);
    } else {
      idToIndexes.set(id, [index]);
    }
  });

  for (const [id, indexes] of idToIndexes.entries()) {
    if (indexes.length < 2) continue;

    indexes.forEach((index) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate example ${kind} id "${id}"`,
        path: [...pathPrefix, index, 'id']
      });
    });
  }
}

export const ComponentExamplesSchema = z
  .object({
    groups: z.array(ExampleGroupSchema),
    items: z.array(ExampleItemSchema)
  })
  .strict()
  .superRefine((examples, ctx) => {
    const groupIds = examples.groups.map((group) => group.id);
    const itemIds = examples.items.map((item) => item.id);

    pushDuplicateIdIssues(ctx, 'group', groupIds, ['groups']);
    pushDuplicateIdIssues(ctx, 'item', itemIds, ['items']);

    const groupIdSet = new Set(groupIds);
    const itemIdSet = new Set(itemIds);

    examples.items.forEach((item, index) => {
      if (!groupIdSet.has(item.group)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Example item "${item.id}" references unknown group "${item.group}"`,
          path: ['items', index, 'group']
        });
      }

      (item.related ?? []).forEach((relatedId, relatedIndex) => {
        if (!itemIdSet.has(relatedId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Example item "${item.id}" references unknown related example "${relatedId}"`,
            path: ['items', index, 'related', relatedIndex]
          });
        }
      });
    });
  });

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
    builder: BuilderMetaSchema,
    examples: ComponentExamplesSchema.optional()
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
export type ExampleGroup = z.infer<typeof ExampleGroupSchema>;
export type ExampleSnippet = z.infer<typeof ExampleSnippetSchema>;
export type ExamplePreview = z.infer<typeof ExamplePreviewSchema>;
export type ExampleItem = z.infer<typeof ExampleItemSchema>;
export type ComponentExamples = z.infer<typeof ComponentExamplesSchema>;
export type ComponentManifest = z.infer<typeof ComponentManifestSchema>;
export type DragonManifest = z.infer<typeof ManifestSchema>;
