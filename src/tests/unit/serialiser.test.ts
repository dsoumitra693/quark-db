import respSerializer from "../../serializers/respSerializer";
import { RESP } from "../../types/RESP";
import { COMMON_RESP } from "../../utils/commonRes";

describe("respSerializer", () => {
  // Simple String Tests
  describe("Simple String Serialization", () => {
    test("should serialize common simple strings correctly", () => {
      // Assuming COMMON_RESP includes 'OK'
      expect(respSerializer.serialise("OK")).toBe(
        `${RESP.SIMPLE_STRING}OK${RESP.CRLF}`
      );
    });

    test("should handle empty simple string", () => {
      // Assuming empty string is in COMMON_RESP
      if (COMMON_RESP.includes("")) {
        expect(respSerializer.serialise("")).toBe(
          `${RESP.SIMPLE_STRING}${RESP.CRLF}`
        );
      } else {
        expect(respSerializer.serialise("")).toBe(
          `${RESP.BULK_STRING}0${RESP.CRLF}${RESP.CRLF}`
        );
      }
    });
  });

  // Bulk String Tests
  describe("Bulk String Serialization", () => {
    test("should serialize non-common strings as bulk strings", () => {
      const nonCommonString = "ThisIsNotACommonString";
      expect(respSerializer.serialise(nonCommonString)).toBe(
        `${RESP.BULK_STRING}${nonCommonString.length}${RESP.CRLF}${nonCommonString}${RESP.CRLF}`
      );
    });

    test("should handle special characters in bulk strings", () => {
      const specialString = "hello\r\nworld";
      expect(respSerializer.serialise(specialString)).toBe(
        `${RESP.BULK_STRING}${specialString.length}${RESP.CRLF}${specialString}${RESP.CRLF}`
      );
    });
  });

  // Integer Tests
  describe("Integer Serialization", () => {
    test("should serialize positive integers", () => {
      expect(respSerializer.serialise(1000)).toBe(
        `${RESP.INTEGER}1000${RESP.CRLF}`
      );
    });

    test("should serialize zero", () => {
      expect(respSerializer.serialise(0)).toBe(`${RESP.INTEGER}0${RESP.CRLF}`);
    });

    test("should serialize negative integers", () => {
      expect(respSerializer.serialise(-123)).toBe(
        `${RESP.INTEGER}-123${RESP.CRLF}`
      );
    });
  });

  // Double Tests
  describe("Double Serialization", () => {
    test("should serialize floating point numbers", () => {
      expect(respSerializer.serialise(3.14)).toBe(
        `${RESP.DOUBLE}3.14${RESP.CRLF}`
      );
    });

    test("should serialize negative floating point numbers", () => {
      expect(respSerializer.serialise(-2.5)).toBe(
        `${RESP.DOUBLE}-2.5${RESP.CRLF}`
      );
    });
  });

  // Boolean Tests
  describe("Boolean Serialization", () => {
    test("should serialize true value", () => {
      expect(respSerializer.serialise(true)).toBe(`${RESP.TRUE}${RESP.CRLF}`);
    });

    test("should serialize false value", () => {
      expect(respSerializer.serialise(false)).toBe(`${RESP.FALSE}${RESP.CRLF}`);
    });
  });

  // Null and Undefined Tests
  describe("Null and Undefined Serialization", () => {
    test("should serialize null value", () => {
      expect(respSerializer.serialise(null)).toBe(`${RESP.NULL}${RESP.CRLF}`);
    });

    test("should serialize undefined value", () => {
      expect(respSerializer.serialise(undefined)).toBe(
        `${RESP.NIL}${RESP.CRLF}`
      );
    });
  });

  // Array Tests
  describe("Array Serialization", () => {
    test("should serialize empty array", () => {
      expect(respSerializer.serialise([])).toBe(`${RESP.ARRAY}0${RESP.CRLF}`);
    });

    test("should serialize array of integers", () => {
      const arr = [1, 2, 3];
      const expected = `${RESP.ARRAY}${arr.length}${RESP.CRLF}${RESP.INTEGER}1${RESP.CRLF}${RESP.INTEGER}2${RESP.CRLF}${RESP.INTEGER}3${RESP.CRLF}${RESP.CRLF}`;
      expect(respSerializer.serialise(arr)).toBe(expected);
    });

    test("should serialize array of mixed types", () => {
      const arr = [1, "hello", 3.14, true, null];
      let expected = `${RESP.ARRAY}${arr.length}${RESP.CRLF}`;
      expected += `${RESP.INTEGER}1${RESP.CRLF}`;

      // Assuming 'hello' is not in COMMON_RESP
      expected += `${RESP.BULK_STRING}5${RESP.CRLF}hello${RESP.CRLF}`;

      expected += `${RESP.DOUBLE}3.14${RESP.CRLF}`;
      expected += `${RESP.TRUE}${RESP.CRLF}`;
      expected += `${RESP.NULL}${RESP.CRLF}`;
      expected += `${RESP.CRLF}`;

      expect(respSerializer.serialise(arr)).toBe(expected);
    });

    test("should serialize nested arrays", () => {
      const nestedArr = [
        [1, 2],
        ["a", "b"],
      ];
      let expected = `${RESP.ARRAY}2${RESP.CRLF}`;

      // First inner array
      expected += `${RESP.ARRAY}2${RESP.CRLF}${RESP.INTEGER}1${RESP.CRLF}${RESP.INTEGER}2${RESP.CRLF}${RESP.CRLF}`;

      // Second inner array (assuming 'a' and 'b' are not in COMMON_RESP)
      expected += `${RESP.ARRAY}2${RESP.CRLF}${RESP.BULK_STRING}1${RESP.CRLF}a${RESP.CRLF}${RESP.BULK_STRING}1${RESP.CRLF}b${RESP.CRLF}${RESP.CRLF}`;

      expected += `${RESP.CRLF}`;

      expect(respSerializer.serialise(nestedArr)).toBe(expected);
    });
  });

  // Map Tests
  describe("Map Serialization", () => {
    test("should serialize empty map", () => {
      const map = new Map();
      expect(respSerializer.serialise(map)).toBe(
        `${RESP.MAP}0${RESP.CRLF}${RESP.CRLF}`
      );
    });

    test("should serialize map with string keys and integer values", () => {
      const map = new Map([
        ["first", 1],
        ["second", 2],
      ]);

      let expected = `${RESP.MAP}2${RESP.CRLF}`;

      // Assuming 'first' and 'second' are not in COMMON_RESP
      expected += `${RESP.BULK_STRING}5${RESP.CRLF}first${RESP.CRLF}${RESP.INTEGER}1${RESP.CRLF}`;
      expected += `${RESP.BULK_STRING}6${RESP.CRLF}second${RESP.CRLF}${RESP.INTEGER}2${RESP.CRLF}`;
      expected += `${RESP.CRLF}`;

      expect(respSerializer.serialise(map)).toBe(expected);
    });
    test("should serialize map with mixed value types", () => {
      const map = new Map<string, string | number | boolean | null>([
        ["string", "value"],
        ["number", 123],
        ["boolean", true],
        ["null", null],
      ]);

      let expected = `${RESP.MAP}4${RESP.CRLF}`;

      // Assuming none of these keys are in COMMON_RESP
      expected += `${RESP.BULK_STRING}6${RESP.CRLF}string${RESP.CRLF}${RESP.BULK_STRING}5${RESP.CRLF}value${RESP.CRLF}`;
      expected += `${RESP.BULK_STRING}6${RESP.CRLF}number${RESP.CRLF}${RESP.INTEGER}123${RESP.CRLF}`;
      expected += `${RESP.BULK_STRING}7${RESP.CRLF}boolean${RESP.CRLF}${RESP.TRUE}${RESP.CRLF}`;
      expected += `${RESP.BULK_STRING}4${RESP.CRLF}null${RESP.CRLF}${RESP.NULL}${RESP.CRLF}`;
      expected += `${RESP.CRLF}`;

      expect(respSerializer.serialise(map)).toBe(expected);
    });
  });

  // Error Tests
  describe("Error Serialization", () => {
    test("should serialize error with message longer than 10 characters", () => {
      const error = new Error("This is a long error message");
      const message = error.message;
      expect(respSerializer.serialise(error)).toBe(
        `${RESP.BULK_ERROR}${message.length}${RESP.CRLF}${message}${RESP.CRLF}`
      );
    });

    test("should serialize error with short message", () => {
      const error = new Error("Short");
      expect(respSerializer.serialise(error)).toBe(
        `${RESP.ERROR}Unknown error${RESP.CRLF}`
      );
    });
  });

  // Invalid Type Tests
  describe("Invalid Type Handling", () => {
    test("should handle invalid data types", () => {
      const symbol = Symbol("test");
      expect(respSerializer.serialise(symbol)).toBe(
        `${RESP.BULK_ERROR}29${RESP.CRLF}Unsupported data type: symbol${RESP.CRLF}`
      );
    });
  });

  // Redis Command Serialization Tests
  describe("Redis Command Serialization", () => {
    test("should serialize PING command", () => {
      const pingCmd = ["PING"];
      let expected = `${RESP.ARRAY}1${RESP.CRLF}`;

      // Assuming 'PING' is not in COMMON_RESP
      expected += `${RESP.BULK_STRING}4${RESP.CRLF}PING${RESP.CRLF}`;
      expected += `${RESP.CRLF}`;

      expect(respSerializer.serialise(pingCmd)).toBe(expected);
    });

    test("should serialize SET command with arguments", () => {
      const setCmd = ["SET", "mykey", "hello"];
      let expected = `${RESP.ARRAY}3${RESP.CRLF}`;

      // Assuming these strings are not in COMMON_RESP
      expected += `${RESP.BULK_STRING}3${RESP.CRLF}SET${RESP.CRLF}`;
      expected += `${RESP.BULK_STRING}5${RESP.CRLF}mykey${RESP.CRLF}`;
      expected += `${RESP.BULK_STRING}5${RESP.CRLF}hello${RESP.CRLF}`;
      expected += `${RESP.CRLF}`;

      expect(respSerializer.serialise(setCmd)).toBe(expected);
    });
  });
});
