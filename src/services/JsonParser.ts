import { IJsonParser } from '../interfaces';

class JsonParser implements IJsonParser {
  /**
   * Parses a JSON string to an object.
   * @param {string} jsonString - The JSON string to parse
   * @returns {T} - The parsed object
   */
  parse<T = unknown>(jsonString: string): T {
    try {
      return JSON.parse(jsonString) as T;
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export { JsonParser };
