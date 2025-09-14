import { ZodType } from 'zod';
import { BaseSchema } from 'zod/v4/core/json-schema.cjs';
import { convertJsonSchemaToZod } from 'zod-from-json-schema';
import { ISchemaConverter } from '../interfaces';

class SchemaConverter implements ISchemaConverter {
  /**
   * Converts a JSON schema to a Zod schema.
   * @param {BaseSchema} schema - The JSON schema to convert
   * @returns {ZodType} - The converted Zod schema
   */
  convert(schema: BaseSchema): ZodType {
    try {
      return convertJsonSchemaToZod(schema);
    } catch (error) {
      throw new Error(`Schema conversion failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export { SchemaConverter };
