import { isMap } from "util/types";
import { RESP } from "../types/RESP";
import { COMMON_RESP } from "../utils/commonRes";

/**
 * RespSerializer implements the RESP (Redis Serialization Protocol) serialization.
 * This class follows the Singleton pattern to ensure only one instance exists.
 */

/** Supported data types for serialization */
type SerializableData =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<SerializableData>
  | Map<SerializableData, SerializableData>
  | Error
  | Symbol;

class RespSerializer {
  private static instance: RespSerializer;
  private constructor() {}

  /**
   * Gets the singleton instance of RespSerializer
   * @returns The singleton instance of RespSerializer
   */
  public static getInstance(): RespSerializer {
    if (!RespSerializer.instance) {
      RespSerializer.instance = new RespSerializer();
    }
    return RespSerializer.instance;
  }

  /**
   * Serializes data into RESP format
   * @param data The data to serialize
   * @returns Serialized RESP string
   */
  public serialise(data: SerializableData): string {
    switch (typeof data) {
      case "string":
        return this.serialiseString(data);
      case "number":
        const str = String(data);
        return str.includes('.') || (str.includes('e') && str.match(/\d+\.\d+e[+-]?\d+/i) !== null)
          ? this.serialiseDouble(data)
          : this.serialiseInteger(data);
      case "boolean":
        return this.serialiseBoolean(data);
      case "undefined":
        return this.serialiseNIL();
      case "object":
        if (data === null) return this.serialiseNull();
        if (Array.isArray(data)) return this.serialiseArray(data);
        if (isMap(data)) return this.serialiseMap(data as Map<any, any>);
        if (data instanceof Error) return this.serialiseError(data);
        return this.serialiseUnsupportedType(data);
      default:
        return this.serialiseUnsupportedType(data);
    }
  }

  /**
   * Serializes a string as a RESP bulk string
   * @param data - The string to serialize
   * @returns RESP formatted bulk string
   * @private
   */
  private serialiseBulkString(data: string): string {
    return `${RESP.BULK_STRING}${Buffer.byteLength(data)}${RESP.CRLF}${data}${
      RESP.CRLF
    }`;
  }

  /**
   * Serializes an error message as a RESP bulk error
   * @param data - The error string to serialize
   * @returns RESP formatted bulk error
   * @private
   */
  private serialiseBulkError(data: string): string {
    return `${RESP.BULK_ERROR}${Buffer.byteLength(data)}${RESP.CRLF}${data}${
      RESP.CRLF
    }`;
  }

  /**
   * Serializes a string as a RESP simple string
   * @param data - The string to serialize
   * @returns RESP formatted simple string
   * @private
   */
  private serialiseSimpleString(data: string): string {
    return RESP.SIMPLE_STRING + data + RESP.CRLF;
  }

  /**
   * Serializes an Error object into RESP format
   * @param data - The Error object to serialize
   * @returns RESP formatted error string
   * @private
   */
  private serialiseError(error: Error): string {
    if (error.message.length < 10)
      return RESP.ERROR + "Unknown error" + RESP.CRLF;
    const message = error.message || "Unknown error";
    return this.serialiseBulkError(message);
  }

  /**
   * Serializes a string, choosing between simple string and bulk string format
   * @param data - The string to serialize
   * @returns RESP formatted string
   * @private
   */
  private serialiseString(data: string): string {
    if (data.length === 0)
      return RESP.BULK_STRING + "0" + RESP.CRLF + RESP.CRLF;
    if (COMMON_RESP.includes(data)) {
      return this.serialiseSimpleString(data);
    }
    return this.serialiseBulkString(data);
  }

  /**
   * Serializes an array into RESP format
   * @param data - The array to serialize
   * @returns RESP formatted array
   * @private
   */
  private serialiseArray(data: SerializableData[]): string {
    if (data.length === 0) return `${RESP.ARRAY}0${RESP.CRLF}`;

    const serializedItems = data.map((item) => this.serialise(item)).join("");
    return `${RESP.ARRAY}${data.length}${RESP.CRLF}${serializedItems}${RESP.CRLF}`;
  }

  /**
   * Serializes an integer into RESP format
   * @param data - The number to serialize
   * @returns RESP formatted integer
   * @private
   */
  private serialiseInteger(data: number): string {
    return RESP.INTEGER + data.toString() + RESP.CRLF;
  }

  /**
   * Serializes a floating point number into RESP format
   * @param data - The number to serialize
   * @returns RESP formatted double
   * @private
   */
  private serialiseDouble(data: number): string {
    return (
      RESP.DOUBLE +
      data.toLocaleString("fullwide", { useGrouping: false }) +
      RESP.CRLF
    );
  }

  /**
   * Serializes a boolean value into RESP format
   * @param data - The boolean to serialize
   * @returns RESP formatted boolean
   * @private
   */
  private serialiseBoolean(data: boolean): string {
    return data ? RESP.TRUE + RESP.CRLF : RESP.FALSE + RESP.CRLF;
  }

  /**
   * Serializes null into RESP format
   * @returns RESP formatted null
   * @private
   */
  private serialiseNull(): string {
    return RESP.NULL + RESP.CRLF;
  }

  /**
   * Serializes undefined into RESP format as NIL
   * @returns RESP formatted NIL
   * @private
   */
  private serialiseNIL(): string {
    return RESP.NIL + RESP.CRLF;
  }

  /**
   * Serializes a Map into RESP format
   * @param data - The Map to serialize
   * @returns RESP formatted map
   * @private
   */
  private serialiseMap(data: Map<SerializableData, SerializableData>): string {
    const entries = Array.from(data.entries())
      .map(([key, value]) => this.serialise(key) + this.serialise(value))
      .join("");

    return `${RESP.MAP}${data.size}${RESP.CRLF}${entries}${RESP.CRLF}`;
  }

  /**
   * Serializes a symbol or other unsupported type into RESP format as an error
   * @param data - The data to serialize
   * @returns RESP formatted error
   * @private
   */
  private serialiseUnsupportedType(data: any): string {
    return this.serialiseBulkError(`Unsupported data type: ${typeof data}`);
  }
}

export default RespSerializer.getInstance();
