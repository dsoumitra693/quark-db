import HashMap from "./hash";

/**
 * A generic Set implementation that maintains a collection of unique elements.
 * Utilizes a HashMap for storage and provides set theory operations.
 * @template T - The type of elements in the set.
 */
export default class Set<T> {
    private map: HashMap<T, boolean>;
    private _size: number;

    /**
     * Initializes a new instance of the Set.
     */
    constructor() {
        this.map = new HashMap<T, boolean>();
        this._size = 0;
    }

    /**
     * Adds a value to the set.
     * @param value - The value to add.
     * @returns True if the value was added, false if it already existed.
     */
    public add(value: T): boolean {
        if (this.map.has(value)) return false;
        this.map.set(value, true);
        this._size++;
        return true;
    }

    /**
     * Deletes a value from the set.
     * @param value - The value to delete.
     * @returns True if the value was deleted, false if it didn't exist.
     */
    public delete(value: T): boolean {
        if (!this.map.has(value)) return false;
        this.map.delete(value);
        this._size--;
        return true;
    }

    /**
     * Checks if the set contains a value.
     * @param value - The value to check.
     * @returns True if the value exists in the set.
     */
    public has(value: T): boolean {
        return this.map.has(value);
    }

    /**
     * Gets the number of elements in the set.
     */
    get size(): number {
        return this._size;
    }

    /**
     * Returns an iterator over the values in the set.
     * @returns An iterator over the values.
     */
    public values(): IterableIterator<T> {
        return this.map.keys();
    }

    /**
     * Returns an iterator over [value, value] pairs for each element.
     * @returns An iterator over entries.
     */
    public entries(): IterableIterator<[T, T]> {
        const entries: [T, T][] = [];
        for (const value of this.values())
            entries.push([value, value]);
        return entries[Symbol.iterator]();
    }

    /**
     * Returns an iterator over the keys in the set (same as values for a set).
     * @returns An iterator over the keys.
     */
    public keys(): IterableIterator<T> {
        return this.map.keys();
    }

    /**
     * Clears all elements from the set.
     */
    public clear(): void {
        this.map.clear();
        this._size = 0;
    }

    /**
     * Returns an iterator over the values in the set.
     */
    public [Symbol.iterator](): IterableIterator<T> {
        return this.map.keys();
    }

    /**
     * Returns a new set with all elements from both sets.
     * @param other - The other set to union with.
     * @returns A new set containing the union of both sets.
     */
    public union(other: Set<T>): Set<T> {
        const unionSet = new Set<T>();
        for (const value of this) {
            unionSet.add(value);
        }
        for (const value of other) {
            unionSet.add(value);
        }
        return unionSet;
    }

    /**
     * Returns a new set with elements common to both sets.
     * @param other - The other set to intersect with.
     * @returns A new set containing the intersection of both sets.
     */
    public intersection(other: Set<T>): Set<T> {
        const intersectionSet = new Set<T>();
        const [smallestSet, largestSet] = this.size < other.size ? [this, other] : [other, this];
        for (const value of smallestSet) {
            if (largestSet.has(value))
                intersectionSet.add(value);
        }
        return intersectionSet;
    }

    /**
     * Returns a new set with elements in this set but not in the other.
     * @param other - The other set to subtract from this set.
     * @returns A new set containing the difference of both sets.
     */
    public difference(other: Set<T>): Set<T> {
        const differenceSet = new Set<T>();
        for (const value of this) {
            if (!other.has(value))
                differenceSet.add(value);
        }
        return differenceSet;
    }

    /**
     * Checks if this set is a subset of another set.
     * @param other - The other set to compare against.
     * @returns True if this set is a subset of the other, false otherwise.
     */
    public isSubsetOf(other: Set<T>): boolean {
        if (this.size > other.size) return false;
        for (const value of this) {
            if (!other.has(value)) return false;
        }
        return true;
    }

    /**
     * Checks if this set is a superset of another set.
     * @param other - The other set to compare against.
     * @returns True if this set is a superset of the other, false otherwise.
     */
    public isSupersetOf(other: Set<T>): boolean {
        return other.isSubsetOf(this);
    }

    /**
     * Checks if this set is a proper subset of another set.
     * @param other - The other set to compare against.
     * @returns True if this set is a proper subset of the other, false otherwise.
     */
    public isProperSubsetOf(other: Set<T>): boolean {
        return this.isSubsetOf(other) && this.size < other.size;
    }

    /**
     * Converts the set to an array.
     * @returns An array containing all the values in the set.
     */
    public toArray(): T[] {
        return Array.from(this.map.keys());
    }

    /**
     * Returns the first element in the set.
     * @returns The first element, or undefined if the set is empty.
     */
    public first(): T | undefined {
        return this.map.keys().next().value;
    }

    /**
     * Returns the last element in the set.
     * @returns The last element, or undefined if the set is empty.
     */
    public last(): T | undefined {
        let last: T | undefined;
        for (const value of this) {
            last = value;
        }
        return last;
    }
}