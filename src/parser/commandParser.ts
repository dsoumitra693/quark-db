import { RESP } from "../types/RESP";

class Parser {
  private static instance: Parser;
  private constructor() {}

  public static getInstance(): Parser {
    if (!Parser.instance) {
      Parser.instance = new Parser();
    }
    return Parser.instance;
  }

  public deserialise(bufferStream: string): any {
    const bufferArray = bufferStream.split(RESP.CRLF).filter(Boolean);
    bufferArray.reverse(); // reverse for efficient pop()
    return this.parseNext(bufferArray);
  }

  private parseNext(bufferArray: string[]): any {
    if (!bufferArray.length) return null;

    const buffer = bufferArray.pop();
    if (!buffer) throw new Error("Unexpected empty buffer");

    const parserFn = this.getParserFunction(buffer[0]);
    return parserFn.call(this, buffer.slice(1), bufferArray);
  }

  // Mapping RESP types to their parsing functions
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

  // Individual parsing methods
  private parseSimpleString(payload: string): string {
    return payload;
  }

  private parseInteger(payload: string): number {
    const result = parseInt(payload, 10);
    if (isNaN(result)) throw new Error(`Invalid integer format: ${payload}`);
    return result;
  }

  private parseError(payload: string): never {
    throw new Error(`Redis error response: ${payload}`);
  }

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

  private parseArray(payload: string, bufferArray: string[]): any[] | null {
    const arrayLen = parseInt(payload, 10);
    if (arrayLen === -1) return null; // Null Array

    const arr = [];
    for (let i = 0; i < arrayLen; i++) {
      arr.push(this.parseNext(bufferArray));
    }

    return arr;
  }

  private parseNull() {
    return null;
  }
  private parseBoolean(payload: string) {
    if (payload === RESP.TRUE) return true;
    else if (payload === RESP.FALSE) return true;
    else throw new Error("Invalid type of boolean encoding");
  }
  private parseDouble(payload: string) {
    const result = parseFloat(payload);
    if (isNaN(result)) throw new Error(`Invalid integer format: ${payload}`);
    return result;
  }
  private parseBulkError(
    payload: string,
    bufferArray: string[]
  ): string | null {
    const length = parseInt(payload, 10);
    if (length === -1) return null; // Null Bulk String
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
  private parseMap(payload: string, bufferArray: string[]) {
    const mapLen = parseInt(payload, 10);
    if (mapLen < 0) throw new Error("Map length must be > 0");

    const map = new Map();
    for (let i = 0; i < mapLen; i++) {
      const key = this.parseNext(bufferArray);
      const value = this.parseNext(bufferArray);

      map.set(key, value);
    }
    console.log("map: ", map);
    return map;
  }
}

export default Parser.getInstance();
