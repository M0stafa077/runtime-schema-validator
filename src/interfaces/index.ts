import { ZodType } from 'zod';
import { BaseSchema } from 'zod/v4/core/json-schema.cjs';

export interface IJsonParser {
  parse<T = unknown>(jsonString: string): T;
}

export interface ISchemaValidator {
  validate(schema: unknown): BaseSchema;
}

export interface ISchemaConverter {
  convert(schema: BaseSchema): ZodType;
}

export interface IDataValidator {
  validate<T>(data: unknown, schema: ZodType<T>): T;
}

export interface ISchemaProcessor {
  processSchema(schemaString: string, data: unknown): void;
}
