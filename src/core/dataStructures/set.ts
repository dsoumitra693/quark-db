import HashMap from "./hash";

export default class Set<T> {
    private map: HashMap<T, boolean>;
    private _size: number;

    constructor() {
        this.map = new HashMap<T, boolean>();
        this._size = 0;
    }

    public add(value: T) {
        if (this.map.has(value)) return false;
        this.map.set(value, true);
        this._size++;

        return true
    }
    public delete(value: T) {
        if (!this.map.has(value)) return false;
        this.map.delete(value);
        this._size--;
        return true;
    }

    public has(value: T) {
        return this.map.has(value);
    }

    get size() {
        return this._size;
    }

    public values(): IterableIterator<T> {
        return this.map.keys();
    }

    public entries(): IterableIterator<[T, T]> {
        const entries: [T, T][] = [];
        for (const value of this.values())
            entries.push([value, value]);

        return entries[Symbol.iterator]();
    }

    public keys(): IterableIterator<T> {
        return this.map.keys();
    }

    public clear() {
        this.map.clear();
        this._size = 0;
    }
    public [Symbol.iterator](): IterableIterator<T> {
        return this.map.keys();
    }

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

    public intersection(other: Set<T>): Set<T> {
        const intersectionSet = new Set<T>();
        const [smallestSet, largestSet] = this.size < other.size ? [this, other] : [other, this];

        for (const value of smallestSet) {
            if (largestSet.has(value))
                intersectionSet.add(value);
        }

        return intersectionSet;
    }

    public difference(other: Set<T>): Set<T> {
        const differenceSet = new Set<T>();

        for (const value of this) {
            if (!other.has(value))
                differenceSet.add(value);
        }

        return differenceSet
    }

    public isSubsetOf(other: Set<T>): boolean {
        if (this.size > other.size) return false;
        for (const value of this) {
            if (!other.has(value)) return false;
        }

        return true;
    }

    public isSupersetOf(other: Set<T>): boolean {
        return other.isSubsetOf(this);
    }


    public isProperSubsetOf(other: Set<T>): boolean {
        return this.isSubsetOf(other) && this.size < other.size;
    }

    public toArray(): T[] {
        return Array.from(this.map.keys());
    }

    public first():T|undefined{
        return this.map.keys().next().value;
    }

    public last():T|undefined{
        let last: T | undefined;
        for (const value of this) {
            last = value;
        }
        return last;
    }
}