import { BaseSchema } from 'zod/v4/core/json-schema.cjs';
import { BaseSchemaZod } from '../types';
import { ISchemaValidator } from '../interfaces';

class SchemaValidator implements ISchemaValidator {
  /**
   * Validates the schema.
   * @param {unknown} schema - The schema to validate
   * @returns {BaseSchema} - The validated schema
   */
  validate(schema: unknown): BaseSchema {
    try {
      return BaseSchemaZod.parse(schema);
    } catch (error) {
      throw new Error(`Schema validation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export { SchemaValidator };
