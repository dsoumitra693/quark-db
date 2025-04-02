/**
 * A generic String class that can handle both string and Buffer data types.
 * This class provides methods for string manipulation, bit operations, and arithmetic operations.
 * 
 * @template T - The type of the string data, can be either string or Buffer
 */
export default class String<T extends string | Buffer> {
    private buffer: Buffer;
    private _length: number;

    /**
     * Creates a new String instance from either a string or Buffer.
     * 
     * @param value - The initial value to store, can be either a string or Buffer
     */
    constructor(value: T) {
        if (typeof value === 'string')
            this.buffer = Buffer.from(value);
        else
            this.buffer = value;

        this._length = Buffer.byteLength(this.buffer);
    }

    /**
     * Gets the length of the string in bytes.
     * 
     * @returns The length of the string in bytes
     */
    get length() {
        return this._length;
    }

    /**
     * Gets the current value of the string.
     * 
     * @returns The current value as either string or Buffer
     */
    public get() {
        return this.buffer as T;
    }

    /**
     * Sets a new value for the string.
     * 
     * @param value - The new value to set, can be either string or Buffer
     */
    public set(value: T) {
        if (typeof value === 'string') {
            this.buffer = Buffer.from(value);
            this._length = Buffer.byteLength(this.buffer);
        } else {
            this.buffer = value;
            this._length = Buffer.byteLength(this.buffer);
        }
    }

    /**
     * Appends a value to the end of the string.
     * 
     * @param value - The value to append, can be either string or Buffer
     */
    public append(value: T) {
        if (typeof value === 'string') {
            this.buffer = Buffer.concat([this.buffer, Buffer.from(value)]);
            this._length = Buffer.byteLength(this.buffer);
        } else {
            this.buffer = Buffer.concat([this.buffer, value]);
            this._length = Buffer.byteLength(this.buffer);
        }
    }

    /**
     * Gets a substring from a specified range.
     * Supports negative indexing (like Python).
     * 
     * @param start - The starting index (inclusive)
     * @param end - The ending index (exclusive)
     * @returns The substring as either string or Buffer
     * @throws Error if the range is invalid
     */
    public getRange(start: number, end: number) {
        if (start < 0) start = this._length + start;
        if (end < 0) end = this._length + end;

        if (start < 0 ||
            end < 0 ||
            start > this._length ||
            end > this._length ||
            start > end
        ) throw new Error("Invalid range");

        return this.buffer.subarray(start, end) as T;
    }

    /**
     * Sets a value within a specified range.
     * Supports negative indexing (like Python).
     * 
     * @param start - The starting index (inclusive)
     * @param end - The ending index (exclusive)
     * @param value - The new value to set, can be either string or Buffer
     * @throws Error if the range is invalid
     */
    public setRange(start: number, end: number, value: T) {
        if (start < 0) start = this._length + start;
        if (end < 0) end = this._length + end;

        if (start < 0 ||
            end < 0 ||
            start > this._length ||
            end > this._length ||
            start > end
        ) throw new Error("Invalid range");

        const valueBuffer = (typeof value === 'string')
            ? Buffer.from(value)
            : value as Buffer;

        this.buffer = Buffer.concat(
            [
                this.buffer.subarray(0, start),
                valueBuffer,
                this.buffer.subarray(end)
            ]
        );
        this._length = Buffer.byteLength(this.buffer);
    }

    /**
     * Converts the string to a regular JavaScript string.
     * 
     * @returns The string representation
     */
    public toString() {
        return this.buffer.toString();
    }

    /**
     * Converts the string to a Buffer.
     * 
     * @returns The Buffer representation
     */
    public toBuffer() {
        return this.buffer
    }

    /**
     * Increments the numeric value of the string by a specified amount.
     * If the string is not numeric, starts from 0.
     * 
     * @param value - The amount to increment by
     */
    public incrementBy(value: number) {
        const currentValue = parseInt(this.toString()) || 0;

        this.buffer = Buffer.from(
            (currentValue + value).toString()
        );
        this._length = Buffer.byteLength(this.buffer);
    }

    /**
     * Decrements the numeric value of the string by a specified amount.
     * 
     * @param value - The amount to decrement by
     * @returns The previous value before decrement
     */
    public decrementBy(value: number) {
        return this.incrementBy(-value);
    }

    /**
     * Increments the numeric value of the string by 1.
     * 
     * @returns The previous value before increment
     */
    public increment() {
        return this.incrementBy(1);
    }

    /**
     * Decrements the numeric value of the string by 1.
     * 
     * @returns The previous value before decrement
     */
    public decrement() {
        return this.decrementBy(1);
    }

    /**
     * Gets the value of a specific bit at the given offset.
     * 
     * @param offset - The bit position to get (0-based)
     * @returns The value of the bit (0 or 1)
     * @throws Error if the offset is out of bounds
     */
    public getBit(offset: number) {
        if (offset < 0 || offset >= this._length) throw new Error("Invalid offset");

        return (this.buffer[offset >> 3] >> (offset & 7)) & 1;
    }

    /**
     * Sets the value of a specific bit at the given offset.
     * 
     * @param offset - The bit position to set (0-based)
     * @param value - The new value of the bit (0 or 1)
     * @returns The previous value of the bit
     * @throws Error if the offset is out of bounds
     */
    public setBit(offset: number, value: 1 | 0) {
        if (offset < 0 || offset >= this._length) throw new Error("Invalid offset");

        const byteIndex = offset >> 3;
        const bitIndex = offset & 7;

        const oldBit = (this.buffer[byteIndex] >> bitIndex) & 1;

        this.buffer[byteIndex] = (this.buffer[byteIndex] 
            & ~(1 << bitIndex)
            | (value << bitIndex)
        );

        return oldBit;
    }
}
