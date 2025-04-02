import { RESP } from "../types/RESP";

/**
 * Singleton class to parse RESP (Redis Serialization Protocol) encoded strings.
 */
class Parser {
  private static instance: Parser;

  private constructor() {}

  /**
   * Retrieves the singleton instance of the Parser.
   * @returns {Parser} The singleton instance.
   */
  public static getInstance(): Parser {
    if (!Parser.instance) {
      Parser.instance = new Parser();
    }
    return Parser.instance;
  }

  /**
   * Deserializes a buffer stream into its corresponding data type.
   * @param {string} bufferStream - The RESP encoded string.
   * @returns {any} The deserialized data.
   */
  public deserialiser(bufferStream: string): any {
    const bufferArray = bufferStream.split(RESP.CRLF).filter(Boolean);
    bufferArray.reverse(); // Reverse for efficient pop()
    return this.parseNext(bufferArray);
  }

  /**
   * Parses the next element from the buffer array.
   * @param {string[]} bufferArray - The array of string buffers.
   * @returns {any} The parsed data.
   * @private
   */
  private parseNext(bufferArray: string[]): any {
    if (!bufferArray.length) return null;

    const buffer = bufferArray.pop();
    if (!buffer) throw new Error("Unexpected empty buffer");

    const parserFn = this.getParserFunction(buffer[0]);
    return parserFn.call(this, buffer.slice(1), bufferArray);
  }

  /**
   * Maps RESP type characters to their corresponding parsing functions.
   * @param {string} typeChar - The initial character indicating the RESP type.
   * @returns {(payload: string, bufferArray: string[]) => any} The parsing function.
   * @private
   */
  private getParserFunction(
    typeChar: string
  ): (payload: string, bufferArray: string[]) => any {
    switch (typeChar) {
      case RESP.SIMPLE_STRING:
        return this.parseSimpleString;
      case RESP.INTEGER:
        return this.parseInteger;
      case RESP.ERROR:
        return this.parseError;
      case RESP.BULK_STRING:
        return this.parseBulkString;
      case RESP.ARRAY:
        return this.parseArray;
      case RESP.BOOLEAN:
        return this.parseBoolean;
      case RESP.DOUBLE:
        return this.parseDouble;
      case RESP.NULL:
        return this.parseNull;
      case RESP.BULK_ERROR:
        return this.parseBulkError;
      case RESP.MAP:
        return this.parseMap;
      default:
        throw new Error(`Unknown RESP type: ${typeChar}`);
    }
  }

  /**
   * Parses a RESP simple string.
   * @param {string} payload - The payload to parse.
   * @returns {string} The parsed simple string.
   * @private
   */
  private parseSimpleString(payload: string): string {
    return payload;
  }

  /**
   * Parses a RESP integer.
   * @param {string} payload - The payload to parse.
   * @returns {number} The parsed integer.
   * @throws Will throw an error if the format is invalid.
   * @private
   */
  private parseInteger(payload: string): number {
    const result = parseInt(payload, 10);
    if (isNaN(result)) throw new Error(`Invalid integer format: ${payload}`);
    return result;
  }

  /**
   * Parses a RESP error.
   * @param {string} payload - The error message.
   * @throws Will throw an error with the provided message.
   * @private
   */
  private parseError(payload: string): never {
    throw new Error(`Redis error response: ${payload}`);
  }

  /**
   * Parses a RESP bulk string.
   * @param {string} payload - The length of the bulk string.
   * @param {string[]} bufferArray - The array of string buffers.
   * @returns {string | null} The parsed string or null if the bulk string is null.
   * @throws Will throw an error if the expected length does not match.
   * @private
   */
  private parseBulkString(
    payload: string,
    bufferArray: string[]
  ): string | null {
    const length = parseInt(payload, 10);
    if (length === -1) return null; // Null Bulk String
    if (bufferArray.length === 0)
      throw new Error("Unexpected end of input for Bulk String");

    const bulkString = bufferArray.pop();
    if (bulkString === undefined || bulkString.length !== length) {
      throw new Error(
        `Bulk String length mismatch. Expected ${length}, got ${bulkString?.length}`
      );
    }

    return bulkString;
  }

  /**
   * Parses a RESP array.
   * @param {string} payload - The length of the array.
   * @param {string[]} bufferArray - The array of string buffers.
   * @returns {any[] | null} The parsed array or null if the array is null.
   * @private
   */
  private parseArray(payload: string, bufferArray: string[]): any[] | null {
    const arrayLen = parseInt(payload, 10);
    if (arrayLen === -1) return null; // Null Array

    const arr = [];
    for (let i = 0; i < arrayLen; i++) {
      arr.push(this.parseNext(bufferArray));
    }

    return arr;
  }

  /**
   * Parses a RESP null type.
   * @returns {null} Always returns null.
   * @private
   */
  private parseNull() {
    return null;
  }

  /**
   * Parses a RESP boolean.
   * @param {string} payload - The payload to parse.
   * @returns {boolean} The parsed boolean value.
   * @throws Will throw an error if the boolean encoding is invalid.
   * @private
   */
  private parseBoolean(payload: string) {
    if (payload === RESP.TRUE) return true;
    else if (payload === RESP.FALSE) return false;
    else throw new Error("Invalid type of boolean encoding");
  }

  /**
   * Parses a RESP double.
   * @param {string} payload - The payload to parse.
   * @returns {number} The parsed floating point number.
   * @throws Will throw an error if the format is invalid.
   * @private
   */
  private parseDouble(payload: string) {
    const result = parseFloat(payload);
    if (isNaN(result)) throw new Error(`Invalid double format: ${payload}`);
    return result;
  }

  /**
   * Parses a RESP bulk error.
   * @param {string} payload - The length of the bulk error.
   * @param {string[]} bufferArray - The array of string buffers.
   * @throws Will throw an error with the bulk error message.
   * @private
   */
  private parseBulkError(
    payload: string,
    bufferArray: string[]
  ): string | null {
    const length = parseInt(payload, 10);
    if (length === -1) return null; // Null Bulk Error
    if (bufferArray.length === 0)
      throw new Error("Unexpected end of input for Bulk Error");

    const bulkError = bufferArray.pop();
    if (bulkError === undefined || bulkError.length !== length) {
      throw new Error(
        `Bulk Error length mismatch. Expected ${length}, got ${bulkError?.length}`
      );
    }

    throw new Error(bulkError);
  }

  /**
   * Parses a RESP map.
   * @param {string} payload - The length of the map.
   * @param {string[]} bufferArray - The array of string buffers.
   * @returns {Map<any, any>} The parsed map.
   * @throws Will throw an error if the map length is invalid.
   * @private
   */
  private parseMap(payload: string, bufferArray: string[]) {
    const mapLen = parseInt(payload, 10);
    if (mapLen < 0) throw new Error("Map length must be > 0");

    const map = new Map();
    for (let i = 0; i < mapLen; i++) {
      const key = this.parseNext(bufferArray);
      const value = this.parseNext(bufferArray);

      map.set(key, value);
    }
    return map;
  }
}

export const deserialiser = Parser.getInstance().deserialiser.bind(Parser.getInstance());
