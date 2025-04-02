import String from "../../../../core/dataStructures/string";

describe("String", () => {
    describe("constructor", () => {
        it("should create a string instance from string", () => {
            const str = new String<string>("hello");
            expect(str.get()).toBe("hello");
            expect(str.length).toBe(5);
        });

        it("should create a string instance from Buffer", () => {
            const buffer = Buffer.from("hello");
            const str = new String<Buffer>(buffer);
            expect(str.get()).toEqual(buffer);
            expect(str.length).toBe(5);
        });
    });

    describe("get/set", () => {
        it("should get and set string values", () => {
            const str = new String<string>("hello");
            expect(str.get()).toBe("hello");

            str.set("world");
            expect(str.get()).toBe("world");
            expect(str.length).toBe(5);
        });

        it("should get and set Buffer values", () => {
            const str = new String<Buffer>(Buffer.from("hello"));
            expect(str.get()).toEqual(Buffer.from("hello"));

            const newBuffer = Buffer.from("world");
            str.set(newBuffer);
            expect(str.get()).toEqual(newBuffer);
        });
    });

    describe("append", () => {
        it("should append string to string", () => {
            const str = new String<string>("hello");
            str.append(" world");
            expect(str.get()).toBe("hello world");
            expect(str.length).toBe(11);
        });

        it("should append Buffer to Buffer", () => {
            const str = new String<Buffer>(Buffer.from("hello"));
            str.append(Buffer.from(" world"));
            expect(str.get()).toEqual(Buffer.concat([Buffer.from("hello"), Buffer.from(" world")]));
        });
    });

    describe("range operations", () => {
        it("should get range with positive indices", () => {
            const str = new String<string>("hello world");
            const result = str.getRange(0, 5);
            expect(result).toBe("hello");
        });

        it("should get range with negative indices", () => {
            const str = new String<string>("hello world");
            const result = str.getRange(-6, -1);
            expect(result).toBe("world");
        });

        it("should set range", () => {
            const str = new String<string>("hello world");
            str.setRange(6, 11, "there");
            expect(str.get()).toBe("hello there");
        });

        it("should throw error for invalid range", () => {
            const str = new String<string>("hello");
            expect(() => str.getRange(0, 10)).toThrow("Invalid range");
            expect(() => str.setRange(0, 10, "too long")).toThrow("Invalid range");
        });
    });

    describe("conversion methods", () => {
        it("should convert to string", () => {
            const str = new String<string>("hello");
            expect(str.toString()).toBe("hello");
        });

        it("should convert to Buffer", () => {
            const str = new String<string>("hello");
            expect(str.toBuffer()).toEqual(Buffer.from("hello"));
        });
    });

    describe("arithmetic operations", () => {
        it("should increment numeric string", () => {
            const str = new String<string>("123");
            str.increment();
            expect(str.get()).toBe("124");
        });

        it("should decrement numeric string", () => {
            const str = new String<string>("123");
            expect(str.decrement()).toBe(122);
            expect(str.get()).toBe("122");
        });

        it("should incrementBy numeric string", () => {
            const str = new String<string>("123");
            str.incrementBy(10);
            expect(str.get()).toBe("133");
        });

        it("should decrementBy numeric string", () => {
            const str = new String<string>("123");
            expect(str.decrementBy(10)).toBe(113);
            expect(str.get()).toBe("113");
        });

        it("should handle non-numeric strings", () => {
            const str = new String<string>("abc");
            str.increment();
            expect(str.get()).toBe("1");
        });
    });

    describe("bit operations", () => {
        it("should get and set bits", () => {
            const str = new String<string>("A"); // 01000001 in binary
            expect(str.getBit(0)).toBe(1);
            expect(str.getBit(1)).toBe(0);
            
            const oldBit = str.setBit(1, 1);
            expect(oldBit).toBe(0);
            expect(str.getBit(1)).toBe(1);
        });

        it("should throw error for invalid bit offset", () => {
            const str = new String<string>("A");
            expect(() => str.getBit(-1)).toThrow("Invalid offset");
            expect(() => str.getBit(10)).toThrow("Invalid offset");
        });
    });
});
