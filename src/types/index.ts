import z from 'zod';
import { BaseSchema } from 'zod/v4/core/json-schema.cjs';

const BaseSchemaZod: z.ZodType<BaseSchema> = z.lazy(
  () =>
    z
      .object({
        $schema: z
          .union([
            z.literal('https://json-schema.org/draft/2020-12/schema'),
            z.literal('http://json-schema.org/draft-07/schema#'),
            z.literal('http://json-schema.org/draft-04/schema#'),
          ])
          .optional(),
        $id: z.string().optional(),
        $anchor: z.string().optional(),
        $ref: z.string().optional(),
        $dynamicRef: z.string().optional(),
        $dynamicAnchor: z.string().optional(),
        $vocabulary: z.record(z.string(), z.boolean()).optional(),
        $comment: z.string().optional(),
        $defs: z
          .record(
            z.string(),
            z.lazy(() => BaseSchemaZod),
          )
          .optional(),

        // Type specification
        type: z
          .union([
            z.literal('object'),
            z.literal('array'),
            z.literal('string'),
            z.literal('number'),
            z.literal('boolean'),
            z.literal('null'),
            z.literal('integer'),
          ])
          .optional(),

        // Array validation
        additionalItems: z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]).optional(),
        unevaluatedItems: z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]).optional(),
        prefixItems: z.array(z.union([z.boolean(), z.lazy(() => BaseSchemaZod)])).optional(),
        items: z
          .union([
            z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]),
            z.array(z.union([z.boolean(), z.lazy(() => BaseSchemaZod)])),
          ])
          .optional(),
        contains: z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]).optional(),

        // Object validation
        additionalProperties: z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]).optional(),
        unevaluatedProperties: z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]).optional(),
        properties: z.record(z.string(), z.union([z.boolean(), z.lazy(() => BaseSchemaZod)])).optional(),
        patternProperties: z.record(z.string(), z.union([z.boolean(), z.lazy(() => BaseSchemaZod)])).optional(),
        dependentSchemas: z.record(z.string(), z.union([z.boolean(), z.lazy(() => BaseSchemaZod)])).optional(),
        propertyNames: z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]).optional(),

        // Conditional schemas
        if: z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]).optional(),
        then: z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]).optional(),
        else: z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]).optional(),

        // Schema composition
        allOf: z.array(z.lazy(() => BaseSchemaZod)).optional(),
        anyOf: z.array(z.lazy(() => BaseSchemaZod)).optional(),
        oneOf: z.array(z.lazy(() => BaseSchemaZod)).optional(),
        not: z.union([z.boolean(), z.lazy(() => BaseSchemaZod)]).optional(),

        // Numeric validation
        multipleOf: z.number().positive().optional(),
        maximum: z.number().optional(),
        exclusiveMaximum: z.union([z.number(), z.boolean()]).optional(),
        minimum: z.number().optional(),
        exclusiveMinimum: z.union([z.number(), z.boolean()]).optional(),

        // String validation
        maxLength: z.number().int().nonnegative().optional(),
        minLength: z.number().int().nonnegative().optional(),
        pattern: z.string().optional(),

        // Array validation constraints
        maxItems: z.number().int().nonnegative().optional(),
        minItems: z.number().int().nonnegative().optional(),
        uniqueItems: z.boolean().optional(),
        maxContains: z.number().int().nonnegative().optional(),
        minContains: z.number().int().nonnegative().optional(),

        // Object validation constraints
        maxProperties: z.number().int().nonnegative().optional(),
        minProperties: z.number().int().nonnegative().optional(),
        required: z.array(z.string()).optional(),
        dependentRequired: z.record(z.string(), z.array(z.string())).optional(),

        // Value validation
        enum: z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
        const: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional(),

        // Legacy and metadata
        id: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        default: z.unknown().optional(),
        deprecated: z.boolean().optional(),
        readOnly: z.boolean().optional(),
        writeOnly: z.boolean().optional(),
        nullable: z.boolean().optional(),
        examples: z.array(z.unknown()).optional(),
        format: z.string().optional(),
        contentMediaType: z.string().optional(),
        contentEncoding: z.string().optional(),
        contentSchema: z.lazy(() => BaseSchemaZod).optional(),
        _prefault: z.unknown().optional(),
      })
      .passthrough(), // Allow additional properties
);

export { BaseSchemaZod };
