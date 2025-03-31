import { HashMap } from "../../../../src/core/dataStructures/hash";

describe("HashMap", () => {
  let hashMap: HashMap<string, string>;

  beforeEach(() => {
    hashMap = new HashMap<string, string>();
  });

  describe("Basic Operations", () => {
    test("should set and get a value", () => {
      hashMap.set("key1", "value1");
      expect(hashMap.get("key1")).toBe("value1");
    });

    test("should return null for non-existent key", () => {
      expect(hashMap.get("nonExistentKey")).toBeNull();
    });

    test("should check if a key exists", () => {
      hashMap.set("key1", "value1");
      expect(hashMap.has("key1")).toBe(true);
      expect(hashMap.has("nonExistentKey")).toBe(false);
    });

    test("should delete a key", () => {
      hashMap.set("key1", "value1");
      expect(hashMap.delete("key1")).toBe(true);
      expect(hashMap.get("key1")).toBeNull();
      expect(hashMap.delete("nonExistentKey")).toBe(false);
    });

    test("should clear all entries", () => {
      hashMap.set("key1", "value1");
      hashMap.set("key2", "value2");
      hashMap.clear();
      expect(hashMap.size()).toBe(0);
      expect(hashMap.get("key1")).toBeNull();
      expect(hashMap.get("key2")).toBeNull();
    });

    test("should return the size of the map", () => {
      expect(hashMap.size()).toBe(0);
      hashMap.set("key1", "value1");
      expect(hashMap.size()).toBe(1);
      hashMap.set("key2", "value2");
      expect(hashMap.size()).toBe(2);
      hashMap.delete("key1");
      expect(hashMap.size()).toBe(1);
    });
  });

  describe("Expiration Operations", () => {
    const originalDateNow = Date.now;
    beforeEach(() => {
      // Mock Date.now() for consistent testing
      Date.now = () => 1000;
    });

    afterEach(() => {
      Date.now = originalDateNow;
    });

    test("should set a value with expiration", () => {
      hashMap.setex("key1", "value1", 6000); // Expires at 6000
      expect(hashMap.get("key1")).toBe("value1");
      expect(hashMap.ttl("key1")).toBe(5000); // 6000 - 1000 = 5000
    });

    test("should expire a key after its TTL", () => {
      hashMap.setex("key1", "value1", 5000); // Expires at 6000
      
      // Time passes, now it's 7000 (after expiration)
      Date.now = () => 7000;
      
      expect(hashMap.get("key1")).toBeNull(); // Should be expired
      expect(hashMap.has("key1")).toBe(false); // Key should be removed
    });

    test("should set expiration time for a key", () => {
      hashMap.set("key1", "value1");
      expect(hashMap.ttl("key1")).toBe(-1); // No expiration
      
      hashMap.expireat("key1", 5000); // Expires at 6000
      expect(hashMap.ttl("key1")).toBe(5000); // 6000 - 1000 = 5000
    });

    test("should return -1 TTL for keys without expiration", () => {
      hashMap.set("key1", "value1");
      expect(hashMap.ttl("key1")).toBe(-1);
    });
  });

  describe("Iteration Operations", () => {
    const originalDateNow = Date.now;
    beforeEach(() => {
      // Mock Date.now() for consistent testing
      Date.now = () => 1000;
      
      hashMap.set("key1", "value1");
      hashMap.set("key2", "value2");
      hashMap.setex("key3", "value3", 5000); // Expires at 6000
      hashMap.setex("key4", "value4", -1000); // Already expired
    });

    afterEach(() => {
      Date.now = originalDateNow;
    });

    test("should get all keys", () => {
      const keys = Array.from(hashMap.keys());
      expect(keys).toContain("key1");
      expect(keys).toContain("key2");
      expect(keys).toContain("key3");
      expect(keys).toContain("key4"); // Still in keys() since we haven't accessed it yet
    });

    test("should get all values (filtering expired keys)", () => {
      const values = Array.from(hashMap.values());
      expect(values).toContain("value1");
      expect(values).toContain("value2");
      expect(values).toContain("value3");
      expect(values).not.toContain("value4"); // Filtered out because it's expired
    });

    test("should get all entries (filtering expired keys)", () => {
      const entries = Array.from(hashMap.entries());
      
      // Convert to object for easier testing
      const entriesObj = Object.fromEntries(entries);
      
      expect(entriesObj).toEqual({
        key1: "value1",
        key2: "value2",
        key3: "value3"
        // key4 should be filtered out because it's expired
      });
    });

    test("should filter out expired keys when accessing entries", () => {
      // Time passes, now it's 7000 (after key3 expiration)
      Date.now = () => 7000;
      
      const entries = Array.from(hashMap.entries());
      
      // Convert to object for easier testing
      const entriesObj = Object.fromEntries(entries);
      
      expect(entriesObj).toEqual({
        key1: "value1",
        key2: "value2"
        // key3 and key4 should be filtered out because they're expired
      });
    });
  });

  describe("Generic Type Support", () => {
    test("should work with number keys", () => {
      const numMap = new HashMap<number, string>();
      numMap.set(1, "one");
      numMap.set(2, "two");
      
      expect(numMap.get(1)).toBe("one");
      expect(numMap.get(2)).toBe("two");
    });

    test("should work with object values", () => {
      interface User {
        name: string;
        age: number;
      }
      
      const userMap = new HashMap<string, User>();
      userMap.set("user1", { name: "Alice", age: 30 });
      userMap.set("user2", { name: "Bob", age: 25 });
      
      expect(userMap.get("user1")).toEqual({ name: "Alice", age: 30 });
      expect(userMap.get("user2")).toEqual({ name: "Bob", age: 25 });
    });

    test("should work with complex objects as keys", () => {
      class CustomKey {
        constructor(public id: number, public name: string) {}
        
        toString() {
          return `${this.id}-${this.name}`;
        }
      }
      
      const complexMap = new HashMap<CustomKey, string>();
      const key1 = new CustomKey(1, "one");
      const key2 = new CustomKey(2, "two");
      
      complexMap.set(key1, "Value for key1");
      complexMap.set(key2, "Value for key2");
      
      expect(complexMap.get(key1)).toBe("Value for key1");
      expect(complexMap.get(key2)).toBe("Value for key2");
    });
  });
});
