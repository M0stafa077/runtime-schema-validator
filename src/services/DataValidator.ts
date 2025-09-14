import { ZodType } from 'zod';
import { IDataValidator } from '../interfaces';

class DataValidator implements IDataValidator {
  /**
   * Validates the data against the schema.
   * @param {unknown} data - The data to validate
   * @param {ZodType<T>} schema - The schema to validate the data against
   * @returns {T} - The validated data
   */
  validate<T>(data: unknown, schema: ZodType<T>): T {
    try {
      return schema.parse(data);
    } catch (error) {
      throw new Error(`Data validation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export { DataValidator };
