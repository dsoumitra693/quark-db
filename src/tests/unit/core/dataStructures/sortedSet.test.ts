import SortedSet from '../../../../core/dataStructures/sortedSet';

describe('SortedSet', () => {
    let sortedSet: SortedSet<number>;

    beforeEach(() => {
        sortedSet = new SortedSet<number>();
    });

    describe('Basic Operations', () => {
        it('should create an empty set', () => {
            expect(sortedSet.size()).toBe(0);
            expect([...sortedSet.values()]).toEqual([]);
        });

        it('should add elements and maintain sorted order', () => {
            sortedSet.add(5);
            sortedSet.add(3);
            sortedSet.add(7);
            
            expect([...sortedSet.values()]).toEqual([3, 5, 7]);
            expect(sortedSet.size()).toBe(3);
        });

        it('should not add duplicate elements', () => {
            sortedSet.add(5);
            const added = sortedSet.add(5);
            
            expect(added).toBe(false);
            expect(sortedSet.size()).toBe(1);
            expect([...sortedSet.values()]).toEqual([5]);
        });

        it('should delete elements', () => {
            sortedSet.add(5);
            sortedSet.add(3);
            sortedSet.add(7);
            
            expect(sortedSet.delete(3)).toBe(true);
            expect([...sortedSet.values()]).toEqual([5, 7]);
            
            expect(sortedSet.delete(10)).toBe(false);
        });

        it('should check for element existence', () => {
            sortedSet.add(5);
            sortedSet.add(3);
            
            expect(sortedSet.has(3)).toBe(true);
            expect(sortedSet.has(5)).toBe(true);
            expect(sortedSet.has(7)).toBe(false);
        });
    });

    describe('Special Operations', () => {
        it('should find minimum and maximum values', () => {
            sortedSet.add(5);
            sortedSet.add(3);
            sortedSet.add(7);
            
            expect(sortedSet.min()).toBe(3);
            expect(sortedSet.max()).toBe(7);
            
            sortedSet.clear();
            expect(sortedSet.min()).toBeUndefined();
            expect(sortedSet.max()).toBeUndefined();
        });

        it('should find ceiling values', () => {
            sortedSet.add(5);
            sortedSet.add(3);
            sortedSet.add(7);
            
            expect(sortedSet.ceiling(2)).toBe(3);
            expect(sortedSet.ceiling(4)).toBe(5);
            expect(sortedSet.ceiling(5)).toBe(5);
            expect(sortedSet.ceiling(8)).toBeUndefined();
        });

        it('should find floor values', () => {
            sortedSet.add(5);
            sortedSet.add(3);
            sortedSet.add(7);
            
            expect(sortedSet.floor(4)).toBe(3);
            expect(sortedSet.floor(6)).toBe(5);
            expect(sortedSet.floor(3)).toBe(3);
            expect(sortedSet.floor(2)).toBeUndefined();
        });

        it('should convert to array', () => {
            sortedSet.add(5);
            sortedSet.add(3);
            sortedSet.add(7);
            
            expect(sortedSet.toArray()).toEqual([3, 5, 7]);
        });

        it('should iterate over values', () => {
            sortedSet.add(5);
            sortedSet.add(3);
            sortedSet.add(7);
            
            const values = [...sortedSet];
            expect(values).toEqual([3, 5, 7]);
        });
    });

    describe('Custom Comparator', () => {
        it('should work with custom comparator', () => {
            const customSortedSet = new SortedSet<string>((a, b) => {
                return a.length - b.length;
            });

            customSortedSet.add('hello');
            customSortedSet.add('hi');
            customSortedSet.add('hey');
            
            expect([...customSortedSet.values()]).toEqual(['hi', 'hey', 'hello']);
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty set operations', () => {
            expect(sortedSet.has(5)).toBe(false);
            expect(sortedSet.delete(5)).toBe(false);
            expect(sortedSet.min()).toBeUndefined();
            expect(sortedSet.max()).toBeUndefined();
            expect(sortedSet.ceiling(5)).toBeUndefined();
            expect(sortedSet.floor(5)).toBeUndefined();
        });

        it('should handle clearing the set', () => {
            sortedSet.add(5);
            sortedSet.add(3);
            sortedSet.clear();
            
            expect(sortedSet.size()).toBe(0);
            expect([...sortedSet.values()]).toEqual([]);
        });

        it('should handle large sets', () => {
            const numbers = Array.from({ length: 1000 }, (_, i) => i);
            numbers.forEach(n => sortedSet.add(n));
            
            expect(sortedSet.size()).toBe(1000);
            expect([...sortedSet.values()]).toEqual([...Array(1000).keys()]);
        });
    });
});
