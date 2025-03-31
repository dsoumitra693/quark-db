import List from "../../../../src/core/dataStructures/list";

describe('List', () => {
  let list: List<number>;

  beforeEach(() => {
    list = new List<number>();
  });

  describe('constructor', () => {
    it('should create an empty list', () => {
      expect(list.length).toBe(0);
    });
  });

  describe('set', () => {
    it('should add an element at the beginning of the list', () => {
      list.set(0, 1);
      expect(list.length).toBe(1);
      expect(list.get(0)).toBe(1);
    });

    it('should add an element at the end of the list', () => {
      list.set(0, 1);
      list.set(1, 2);
      expect(list.length).toBe(2);
      expect(list.get(1)).toBe(2);
    });

    it('should add an element in the middle of the list', () => {
      list.set(0, 1);
      list.set(1, 3);
      list.set(1, 2);
      expect(list.length).toBe(3);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
      expect(list.get(2)).toBe(3);
    });

    it('should handle negative indices', () => {
      list.set(0, 1);
      list.set(1, 2);
      list.set(-1, 3);
      expect(list.length).toBe(3);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(3);
      expect(list.get(2)).toBe(2);
    });

    it('should throw an error for out of bounds indices', () => {
      expect(() => list.set(1, 1)).toThrow('Index out of bounds');
      expect(() => list.set(-1, 1)).toThrow('Index out of bounds');
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      list.set(0, 1);
      list.set(1, 2);
      list.set(2, 3);
    });

    it('should remove the first element', () => {
      list.remove(0);
      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(2);
    });

    it('should remove an element in the middle', () => {
      list.remove(1);
      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(3);
    });

    it('should handle negative indices', () => {
      list.remove(-1); // Remove the last element
      expect(list.length).toBe(2);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
    });

    it('should do nothing for out of bounds indices', () => {
      list.remove(5);
      expect(list.length).toBe(3);
    });
  });

  describe('get', () => {
    beforeEach(() => {
      list.set(0, 1);
      list.set(1, 2);
      list.set(2, 3);
    });

    it('should get the first element', () => {
      expect(list.get(0)).toBe(1);
    });

    it('should get the last element', () => {
      expect(list.get(2)).toBe(3);
    });

    it('should get an element in the middle', () => {
      expect(list.get(1)).toBe(2);
    });

    it('should handle negative indices', () => {
      expect(list.get(-1)).toBe(3); // Last element
      expect(list.get(-2)).toBe(2); // Second to last element
    });

    it('should throw an error for out of bounds indices', () => {
      expect(() => list.get(5)).toThrow('Index out of bounds');
      expect(() => list.get(-5)).toThrow('Index out of bounds');
    });
  });

  describe('clear', () => {
    it('should clear the list', () => {
      list.set(0, 1);
      list.set(1, 2);
      list.clear();
      expect(list.length).toBe(0);
    });
  });

  describe('toString', () => {
    it('should return an empty string for an empty list', () => {
      expect(list.toString()).toBe('');
    });

    it('should return a string representation of the list', () => {
      list.set(0, 1);
      list.set(1, 2);
      list.set(2, 3);
      expect(list.toString()).toBe('1->2->3');
    });
  });

  describe('iterator', () => {
    it('should iterate over all elements', () => {
      list.set(0, 1);
      list.set(1, 2);
      list.set(2, 3);
      
      const values: number[] = [];
      for (const value of list) {
        values.push(value);
      }
      
      expect(values).toEqual([1, 2, 3]);
    });
  });

  describe('generic types', () => {
    it('should work with string type', () => {
      const stringList = new List<string>();
      stringList.set(0, 'a');
      stringList.set(1, 'b');
      expect(stringList.get(0)).toBe('a');
      expect(stringList.get(1)).toBe('b');
    });

    it('should work with object type', () => {
      const objectList = new List<{id: number, name: string}>();
      objectList.set(0, {id: 1, name: 'John'});
      objectList.set(1, {id: 2, name: 'Jane'});
      expect(objectList.get(0)).toEqual({id: 1, name: 'John'});
      expect(objectList.get(1)).toEqual({id: 2, name: 'Jane'});
    });
  });
});
