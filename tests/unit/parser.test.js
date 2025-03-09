import parser from "../../src/parser/commandParser";

describe("Parser Tests", () => {
  it("should parse simple string", () => {
    const bufferStream = "+Hello\r\n";
    expect(parser.deserialise(bufferStream)).toBe("Hello");
  });

  it("should parse integer", () => {
    const bufferStream = ":123\r\n";
    expect(parser.deserialise(bufferStream)).toBe(123);
  });

  it("should parse error", () => {
    const bufferStream = "-Error message\r\n";
    expect(() => parser.deserialise(bufferStream)).toThrow(
      "Redis error response: Error message"
    );
  });

  it("should parse bulk string", () => {
    const bufferStream = "$5\r\nWorld\r\n";
    expect(parser.deserialise(bufferStream)).toBe("World");
  });

  it("should parse array", () => {
    const bufferStream = "*2\r\n+Foo\r\n+Bar\r\n";
    expect(parser.deserialise(bufferStream)).toEqual(["Foo", "Bar"]);
  });

  it("should parse boolean", () => {
    const bufferStream = "#t\r\n";
    expect(parser.deserialise(bufferStream)).toBe(true);
  });

  it("should parse double", () => {
    const bufferStream = ",3.14\r\n";
    expect(parser.deserialise(bufferStream)).toBeCloseTo(3.14);
  });

  it("should parse null", () => {
    const bufferStream = "_\r\n";
    expect(parser.deserialise(bufferStream)).toBeNull();
  });

  it("should handle empty input", () => {
    const bufferStream = "";
    expect(parser.deserialise(bufferStream)).toBeNull();
  });
  it("should handle bulk error", () => {
    const bufferStream = "!21\r\nSYNTAX invalid syntax\r\n";
    expect(() => parser.deserialise(bufferStream)).toThrow(
      "SYNTAX invalid syntax"
    );
  });
  it("should handle map", () => {
    const bufferStream = "%2\r\n+first\r\n:1\r\n+second\r\n:2\r\n";
    const result = parser.deserialise(bufferStream);

    expect(result).toBeInstanceOf(Map);
    expect(result.get("first")).toEqual(1);
    expect(result.get("second")).toEqual(2);
  });
});
