/**
 * Interface for items in the HashMap that support expiration
 * @template V - The type of the value stored in the map
 */
interface HashMapItem<V> {
    value: V;
    ex: number | null;
}

/**
 * A generic HashMap implementation that supports key-value storage with optional expiration
 * @template K - The type of the keys
 * @template V - The type of the values
 */
export default class HashMap<K = string, V = string> {
    private map: Map<K, HashMapItem<V>>;

    /**
     * Creates a new HashMap instance
     */
    constructor() {
        this.map = new Map<K, HashMapItem<V>>();
    }

    /**
     * Sets a value for the given key
     * @param key - The key to set
     * @param value - The value to store
     */
    public set(key: K, value: V) {
        this.map.set(key, {value, ex:null});
    }

    /**
     * Sets a value for the given key with expiration
     * @param key - The key to set
     * @param value - The value to store
     * @param ex - The expiration time in seconds
     * @returns The Map object for chaining
     */
    public setex(key: K, value: V, ex: number) {
        return this.map.set(key, { value, ex });
    }

    /**
     * Gets the value associated with the given key
     * @param key - The key to retrieve
     * @returns The value associated with the key
     */
    public get(key: K) {
        let item = this.map.get(key);
        if(!item) return null;

        if(item.ex &&  item.ex < Date.now()) {
            this.delete(key);
            return null;
        }
        return item.value;
    }

    /**
     * Deletes the entry for the given key
     * @param key - The key to delete
     * @returns true if the key was found and deleted, false otherwise
     */
    public delete(key: K) {
        return this.map.delete(key);
    }

    /**
     * Clears all entries from the map
     */
    public clear() {
        this.map.clear();
    }

    /**
     * Checks if the map contains the given key
     * @param key - The key to check
     * @returns true if the key exists, false otherwise
     */
    public has(key: K) {
        return this.map.has(key);
    }

    /**
     * Gets an iterator of the keys in the map
     * @returns An iterator of keys
     */
    public keys() {
        return this.map.keys() as K;
    }

    /**
     * Gets an iterator of the values in the map
     * @returns An iterator of values
     */
    public *values() {
        for (const [key, value] of this.map) {
            if(value.ex && value.ex < Date.now()) {
                this.delete(key);
                continue;
            }
            yield value.value;
        }
    }

    /**
     * Gets an iterator of the key-value pairs in the map
     * @returns An iterator of key-value pairs
     */
    public *entries() {
        for (const [key, value] of this.map) {
            if(value.ex && value.ex < Date.now()) {
                this.delete(key);
                continue;
            }
            yield [key, value.value];
        }
    }

    /**
     * Gets the size of the map
     * @returns The number of entries in the map
     */
    public size() {
        return this.map.size;
    }

    /**
     * Sets the expiration time for a key (alias for expire)
     * @param key - The key to set expiration for
     * @param ex - The expiration time in seconds
     */
    public expireat(key: K, ex: number) {
        (this.map.get(key) as HashMapItem<V>).ex = ex + Date.now();
    }

    /**
     * Gets the remaining time to live for a key
     * @param key - The key to check
     * @returns The remaining time to live in seconds
     */
    public ttl(key: K) {
        const item = this.map.get(key) as HashMapItem<V>;
        if (!item.ex) return -1;
        return item.ex - Date.now();
    }

    /**
     * Persists a key, removing its expiration time
     * @param key - The key to persist
     * @returns true if the key was found and persisted, false otherwise
     */
    public persist(key: K) {
        const item = this.map.get(key) as HashMapItem<V>;
        if (!item) return false;
        item.ex = null;
        return true;
    }
}