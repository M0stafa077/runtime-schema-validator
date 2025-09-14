import { JsonParser, SchemaValidator, SchemaConverter, DataValidator, SchemaProcessor } from './services';

/**
 * Service factory.
 * @returns {SchemaProcessor} - The schema processor
 */
class ServiceFactory {
  static createSchemaProcessor(): SchemaProcessor {
    const jsonParser = new JsonParser();
    const schemaValidator = new SchemaValidator();
    const schemaConverter = new SchemaConverter();
    const dataValidator = new DataValidator();

    return new SchemaProcessor(jsonParser, schemaValidator, schemaConverter, dataValidator);
  }
}

/**
 * Validates the schema.
 * @param {string} schema - The schema to validate
 * @param {unknown} data - The data to validate
 */
function validateSchema(schema: string, data: unknown) {
  const schemaProcessor = ServiceFactory.createSchemaProcessor();
  schemaProcessor.processSchema(schema, data);
}

export { validateSchema };
