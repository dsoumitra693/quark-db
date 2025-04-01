import Set from '../../../../core/dataStructures/set';

describe('Set', () => {
  let set: Set<number>;

  beforeEach(() => {
    set = new Set<number>();
  });

  describe('basic operations', () => {
    it('should add elements correctly', () => {
      expect(set.add(1)).toBe(true);
      expect(set.add(2)).toBe(true);
      expect(set.add(3)).toBe(true);
      expect(set.size).toBe(3);
    });

    it('should not add duplicate elements', () => {
      set.add(1);
      expect(set.add(1)).toBe(false);
      expect(set.size).toBe(1);
    });

    it('should delete elements correctly', () => {
      set.add(1);
      set.add(2);
      expect(set.delete(1)).toBe(true);
      expect(set.size).toBe(1);
      expect(set.has(1)).toBe(false);
      expect(set.has(2)).toBe(true);
    });

    it('should return false when deleting non-existent elements', () => {
      expect(set.delete(999)).toBe(false);
    });

    it('should check if elements exist correctly', () => {
      set.add(1);
      expect(set.has(1)).toBe(true);
      expect(set.has(2)).toBe(false);
    });

    it('should clear all elements', () => {
      set.add(1);
      set.add(2);
      set.clear();
      expect(set.size).toBe(0);
      expect(set.has(1)).toBe(false);
    });
  });

  describe('iteration methods', () => {
    beforeEach(() => {
      set.add(1);
      set.add(2);
      set.add(3);
    });

    it('should iterate over values', () => {
      const values = Array.from(set.values());
      expect(values).toContain(1);
      expect(values).toContain(2);
      expect(values).toContain(3);
      expect(values.length).toBe(3);
    });

    it('should iterate over keys (same as values)', () => {
      const keys = Array.from(set.keys());
      expect(keys).toContain(1);
      expect(keys).toContain(2);
      expect(keys).toContain(3);
      expect(keys.length).toBe(3);
    });

    it('should iterate over entries', () => {
      const entries = Array.from(set.entries());
      expect(entries).toContainEqual([1, 1]);
      expect(entries).toContainEqual([2, 2]);
      expect(entries).toContainEqual([3, 3]);
      expect(entries.length).toBe(3);
    });

    it('should be iterable with for...of', () => {
      const values: number[] = [];
      for (const value of set) {
        values.push(value);
      }
      expect(values).toContain(1);
      expect(values).toContain(2);
      expect(values).toContain(3);
      expect(values.length).toBe(3);
    });

    it('should convert to array correctly', () => {
      const array = set.toArray();
      expect(array).toContain(1);
      expect(array).toContain(2);
      expect(array).toContain(3);
      expect(array.length).toBe(3);
    });
  });

  describe('set operations', () => {
    let set1: Set<number>;
    let set2: Set<number>;

    beforeEach(() => {
      set1 = new Set<number>();
      set1.add(1);
      set1.add(2);
      set1.add(3);

      set2 = new Set<number>();
      set2.add(3);
      set2.add(4);
      set2.add(5);
    });

    it('should perform union correctly', () => {
      const union = set1.union(set2);
      expect(union.size).toBe(5);
      expect(union.has(1)).toBe(true);
      expect(union.has(2)).toBe(true);
      expect(union.has(3)).toBe(true);
      expect(union.has(4)).toBe(true);
      expect(union.has(5)).toBe(true);
    });

    it('should perform intersection correctly', () => {
      const intersection = set1.intersection(set2);
      expect(intersection.size).toBe(1);
      expect(intersection.has(3)).toBe(true);
    });

    it('should perform difference correctly', () => {
      const difference = set1.difference(set2);
      expect(difference.size).toBe(2);
      expect(difference.has(1)).toBe(true);
      expect(difference.has(2)).toBe(true);
      expect(difference.has(3)).toBe(false);
    });

    it('should check subset relation correctly', () => {
      const subset = new Set<number>();
      subset.add(1);
      subset.add(2);

      expect(subset.isSubsetOf(set1)).toBe(true);
      expect(set1.isSubsetOf(subset)).toBe(false);
    });

    it('should check superset relation correctly', () => {
      const subset = new Set<number>();
      subset.add(1);
      subset.add(2);

      expect(set1.isSupersetOf(subset)).toBe(true);
      expect(subset.isSupersetOf(set1)).toBe(false);
    });

    it('should check proper subset relation correctly', () => {
      const subset = new Set<number>();
      subset.add(1);
      subset.add(2);

      expect(subset.isProperSubsetOf(set1)).toBe(true);
      
      // Equal sets are not proper subsets
      const equalSet = new Set<number>();
      equalSet.add(1);
      equalSet.add(2);
      equalSet.add(3);
      
      expect(set1.isProperSubsetOf(equalSet)).toBe(false);
    });

  });

  describe('first and last methods', () => {
    it('should return first element correctly', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      
      const first = set.first();
      expect([1, 2, 3]).toContain(first); // Since HashMap doesn't guarantee order
    });

    it('should return last element correctly', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      
      const last = set.last();
      expect([1, 2, 3]).toContain(last); // Since HashMap doesn't guarantee order
    });

    it('should return undefined for first/last on empty set', () => {
      expect(set.first()).toBeUndefined();
      expect(set.last()).toBeUndefined();
    });
  });

  describe('generic types', () => {
    it('should work with string type', () => {
      const stringSet = new Set<string>();
      stringSet.add('a');
      stringSet.add('b');
      expect(stringSet.has('a')).toBe(true);
      expect(stringSet.size).toBe(2);
    });

    it('should work with object type', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      
      const objectSet = new Set<object>();
      objectSet.add(obj1);
      objectSet.add(obj2);
      
      expect(objectSet.has(obj1)).toBe(true);
      expect(objectSet.size).toBe(2);
    });
  });
});
