import { IJsonParser, ISchemaValidator, ISchemaConverter, IDataValidator, ISchemaProcessor } from '../interfaces';

// Single Responsibility: Orchestrates the schema processing workflow
// Follows Dependency Inversion Principle by depending on abstractions
export class SchemaProcessor implements ISchemaProcessor {
  constructor(
    private jsonParser: IJsonParser,
    private schemaValidator: ISchemaValidator,
    private schemaConverter: ISchemaConverter,
    private dataValidator: IDataValidator,
  ) {}

  /**
   * Processes the schema and data.
   * @param {string} schemaString - The schema string to process
   * @param {unknown} data - The data to process
   */
  processSchema(schemaString: string, data: unknown): void {
    try {
      // Step 1: Parse JSON schema string
      const schemaJson = this.jsonParser.parse(schemaString);

      // Step 2: Validate schema structure
      const validatedSchema = this.schemaValidator.validate(schemaJson);

      // Step 3: Convert to Zod schema
      const zodSchema = this.schemaConverter.convert(validatedSchema);

      // Step 4: Validate data against schema
      this.dataValidator.validate(data, zodSchema);
    } catch (error) {
      if (error instanceof Error && error.message.includes('parse JSON')) {
        process.exit(1);
      }
      // Re-throw other errors to be handled by caller
      throw error;
    }
  }
}
