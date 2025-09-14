# Runtime Schema Validator

A powerful TypeScript runtime JSON schema validator and converter that uses Zod for validation.

## Features

- 🚀 **Runtime Validation**: Validate data against JSON schemas at runtime
- 🔄 **Schema Conversion**: Convert between different schema formats
- 📦 **TypeScript Support**: Full TypeScript support with type definitions
- 🎯 **Zod Integration**: Built on Zod for robust runtime validation
- 🛠️ **Modular Architecture**: Clean, modular service-based architecture
- 📝 **JSON Parsing**: Built-in JSON parsing capabilities

## Installation

```bash
npm install runtime-schema-validator
```

## Usage

### Basic Usage

```typescript
import { validateSchema } from 'runtime-schema-validator';

// Example schema
const schema = `{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number", "minimum": 0 }
  },
  "required": ["name", "age"]
}`;

// Example data
const data = {
  name: 'John Doe',
  age: 30,
};

// Validate the data against the schema
try {
  validateSchema(schema, data);
  console.log('Validation successful!');
} catch (error) {
  console.error('Validation failed:', error);
}
```

## API Reference

### `validateSchema(schema: string, data: unknown)`

The main function for validating data against a JSON schema.

**Parameters:**

- `schema` (string): The JSON schema as a string
- `data` (unknown): The data to validate

**Throws:** Various validation errors if the schema or data doesn't meet requirements

## Error Handling

The library can throw several types of errors during the validation process. All errors inherit from the standard JavaScript `Error` class and include descriptive messages.

### Error Types

#### 1. **JSON Parsing Errors**

```typescript
Error: 'Failed to parse JSON: [original error message]';
```

**When thrown:** When the schema string is not valid JSON
**Special behavior:** In the `SchemaProcessor.processSchema()` method, JSON parsing errors will cause the process to exit with code 1 instead of throwing an error
**Common causes:**

- Malformed JSON syntax (missing quotes, brackets, etc.)
- Invalid escape sequences
- Trailing commas
- Comments in JSON (not supported in standard JSON)

**Example:**

```typescript
try {
  validateSchema('{"type": "object",}', data); // Invalid JSON - trailing comma
} catch (error) {
  console.error(error.message); // "Failed to parse JSON: ..."
}
```

#### 2. **Schema Validation Errors**

```typescript
Error: 'Schema validation failed: [Zod validation error]';
```

**When thrown:** When the parsed JSON doesn't conform to JSON Schema specification
**Common causes:**

- Invalid schema structure
- Unsupported schema properties
- Invalid type definitions
- Malformed conditional schemas (if/then/else)
- Invalid composition schemas (allOf/anyOf/oneOf)

**Example:**

```typescript
try {
  validateSchema('{"type": "invalid-type"}', data); // Invalid type
} catch (error) {
  console.error(error.message); // "Schema validation failed: ..."
}
```

#### 3. **Schema Conversion Errors**

```typescript
Error: 'Schema conversion failed: [conversion error message]';
```

**When thrown:** When the JSON schema cannot be converted to a Zod schema
**Common causes:**

- Unsupported JSON Schema features that don't have Zod equivalents
- Complex schema patterns that exceed conversion capabilities
- Circular references in schema definitions
- Invalid schema references ($ref)

**Example:**

```typescript
try {
  validateSchema('{"$ref": "#/definitions/nonexistent"}', data);
} catch (error) {
  console.error(error.message); // "Schema conversion failed: ..."
}
```

#### 4. **Data Validation Errors**

```typescript
Error: 'Data validation failed: [Zod validation error]';
```

**When thrown:** When the provided data doesn't match the schema requirements
**Common causes:**

- Missing required properties
- Wrong data types
- Values outside allowed ranges (min/max)
- String patterns not matching regex
- Array/object constraints violations
- Enum value mismatches

**Example:**

```typescript
const schema = '{"type": "object", "required": ["name"], "properties": {"name": {"type": "string"}}}';
const data = {}; // Missing required 'name' property

try {
  validateSchema(schema, data);
} catch (error) {
  console.error(error.message); // "Data validation failed: Required at ..."
}
```

### Error Handling Best Practices

#### 1. **Always Use Try-Catch**

```typescript
try {
  validateSchema(schema, data);
  console.log('Validation successful!');
} catch (error) {
  if (error instanceof Error) {
    console.error('Validation failed:', error.message);

    // Handle specific error types
    if (error.message.includes('parse JSON')) {
      console.error('Invalid JSON schema format');
    } else if (error.message.includes('Schema validation failed')) {
      console.error('Invalid schema structure');
    } else if (error.message.includes('Schema conversion failed')) {
      console.error('Schema conversion error');
    } else if (error.message.includes('Data validation failed')) {
      console.error('Data does not match schema');
    }
  }
}
```

#### 2. **Validate Schema Before Use**

```typescript
function isValidSchema(schemaString: string): boolean {
  try {
    JSON.parse(schemaString);
    return true;
  } catch {
    return false;
  }
}

if (!isValidSchema(schema)) {
  throw new Error('Invalid JSON schema format');
}
```

#### 3. **Provide User-Friendly Error Messages**

```typescript
try {
  validateSchema(schema, data);
} catch (error) {
  const userMessage =
    error instanceof Error
      ? error.message.replace(/^.*?: /, '') // Remove technical prefixes
      : 'An unknown error occurred';

  console.error('Validation Error:', userMessage);
}
```

### Common Error Scenarios

#### **Invalid JSON Schema Format**

```typescript
// ❌ Bad: Malformed JSON
const badSchema = '{type: "object"}'; // Missing quotes around keys
validateSchema(badSchema, data);
// Error: "Failed to parse JSON: ..."
```

#### **Missing Required Properties**

```typescript
// ❌ Bad: Missing required field
const schema = '{"type": "object", "required": ["email"], "properties": {"email": {"type": "string"}}}';
const data = { name: 'John' }; // Missing email
validateSchema(schema, data);
// Error: "Data validation failed: Required at ..."
```

#### **Type Mismatch**

```typescript
// ❌ Bad: Wrong type
const schema = '{"type": "object", "properties": {"age": {"type": "number"}}}';
const data = { age: '25' }; // String instead of number
validateSchema(schema, data);
// Error: "Data validation failed: Expected number, received string"
```

#### **Constraint Violations**

```typescript
// ❌ Bad: Value outside allowed range
const schema = '{"type": "object", "properties": {"age": {"type": "number", "minimum": 18}}}';
const data = { age: 16 }; // Below minimum
validateSchema(schema, data);
// Error: "Data validation failed: Number must be greater than or equal to 18"
```

#### **Pattern Mismatch**

```typescript
// ❌ Bad: String doesn't match pattern
const schema =
  '{"type": "object", "properties": {"email": {"type": "string", "pattern": "^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$"}}}';
const data = { email: 'invalid-email' }; // Invalid email format
validateSchema(schema, data);
// Error: "Data validation failed: String must match pattern ..."
```

### Debugging and Troubleshooting

#### **Enable Source Maps**

The library includes source maps for easier debugging. Make sure your build process preserves them:

```typescript
// In your tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true,
    "declarationMap": true
  }
}
```

#### **Common Debugging Steps**

1. **Validate JSON Schema Syntax**

   ```typescript
   // Use a JSON validator to check your schema
   const schema = '{"type": "object", "properties": {...}}';
   try {
     JSON.parse(schema);
     console.log('Schema JSON is valid');
   } catch (error) {
     console.error('Invalid JSON:', error.message);
   }
   ```

2. **Test Schema with Simple Data**

   ```typescript
   // Start with minimal data to isolate issues
   const simpleSchema = '{"type": "object", "properties": {"name": {"type": "string"}}}';
   const simpleData = { name: 'test' };
   validateSchema(simpleSchema, simpleData);
   ```

3. **Use Zod's Built-in Debugging**

   ```typescript
   // For data validation errors, Zod provides detailed error information
   try {
     validateSchema(schema, data);
   } catch (error) {
     if (error instanceof Error && error.message.includes('Data validation failed')) {
       // The error message contains detailed information about what failed
       console.log('Detailed validation error:', error.message);
     }
   }
   ```

4. **Validate Schema Structure**
   ```typescript
   // Check if your schema conforms to JSON Schema specification
   // Since individual services aren't exported, use the main function with test data
   try {
     validateSchema(schemaString, {}); // Test with empty object
     console.log('Schema structure is valid');
   } catch (error) {
     if (error instanceof Error) {
       if (error.message.includes('parse JSON')) {
         console.error('Invalid JSON format:', error.message);
       } else if (error.message.includes('Schema validation failed')) {
         console.error('Schema structure error:', error.message);
       } else {
         console.error('Schema validation error:', error.message);
       }
     }
   }
   ```

#### **Performance Considerations**

- **Large Schemas**: Complex schemas with many nested objects and arrays may take longer to process
- **Deep Nesting**: Very deep object nesting (>10 levels) might cause performance issues
- **Array Validation**: Large arrays with complex item schemas can be slow to validate
- **Regex Patterns**: Complex regex patterns in string validation can impact performance

#### **Known Limitations**

1. **Circular References**: The library doesn't support circular references in schema definitions
2. **Custom Formats**: Some JSON Schema format validators might not be fully supported
3. **Complex Conditionals**: Very complex if/then/else schemas might not convert perfectly
4. **Schema References**: `$ref` references to external schemas are not supported

### Available Exports

The package exports the following:

#### `validateSchema(schema: string, data: unknown)`

The main validation function that processes JSON schemas and validates data against them.

**Note:** The individual service classes (`JsonParser`, `SchemaValidator`, `SchemaConverter`, `DataValidator`, `SchemaProcessor`) are not exported from the main package. They are internal implementation details. If you need access to individual services, you would need to fork the repository or request this feature.

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/m0stafa077/runtime-validator.git
cd runtime-validator
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Run tests:

```bash
npm test
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run clean` - Remove build artifacts
- `npm test` - Run the test suite
- `npm run format` - Format code using Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

**Mostafa Asaad**

- Email: mostafa.asaad022@gmail.com
- GitHub: [@m0stafa077](https://github.com/m0stafa077)

## Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/m0stafa077/runtime-validator/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the author directly via email

## Changelog

### v1.0.0

- Initial release
- Basic schema validation functionality
- TypeScript support
- Zod integration
