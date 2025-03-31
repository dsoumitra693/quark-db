class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export default class List<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private _length: number = 0;

    constructor() {
        this.head = null;
        this.tail = null;
        this._length = 0;
    }

    public get length(): number {
        return this._length;
    }

    public set(index: number, value: T) {
        // Convert negative index to positive
        if (index < 0) index = this._length + index;

        // Check bounds
        if (index > this._length || index < 0) throw new Error("Index out of bounds");

        const node = new Node(value);

        // Case 1: Insert at the beginning
        if (index === 0) {
            node.next = this.head;
            this.head = node;
            if (this._length === 0) this.tail = node;
        }
        // Case 2: Insert at the end or in the middle
        else {
            let current = this.head;
            let position = 0;
            
            // Navigate to the node just before the insertion point
            while (current && position < index - 1) {
                current = current.next;
                position++;
            }
            
            if (current) {
                node.next = current.next;
                current.next = node;
                if (node.next === null) this.tail = node;
            }
        }
        
        this._length++;
    }

    public remove(index: number) {
        if (index < 0) index = this._length + index;

        if (index >= this._length || index < 0) return;

        if (index === 0) {
            const node = this.head;
            if (!node) return;
            this.head = node.next;
            if (this._length === 1) this.tail = null;
        } else {
            let current = this.head;
            if (!current) return;

            while (current.next && index > 1) {
                current = current.next;
                index--;
            }
            if (!current.next) return;
            current.next = current.next.next;
            if (current.next === null) this.tail = current;
        }
        this._length--;
    }

    public get(index: number): T | undefined {
        // Convert negative index to positive
        if (index < 0) index = this._length + index;
        
        // Check bounds
        if (index >= this._length || index < 0) throw new Error("Index out of bounds");
        ;

        // Handle empty list
        if (!this.head) return undefined;
        
        // Optimization for first and last elements
        if (index === 0) return this.head.value;
        if (index === this._length - 1) return this.tail!.value;

        // Navigate to the requested index
        let current: Node<T> | null = this.head;
        let position = 0;
        
        while (current && position < index) {
            current = current.next;
            position++;
        }
        
        return current ? current.value : undefined;
    }

    public clear() {
        this.head = null;
        this.tail = null;
        this._length = 0;
    }

    public toString() {
        let current = this.head;
        if (!current) return "";
        let str = "";
        while (current.next) {
            str += current.value + "->";
            current = current.next;
        }
        str += current.value;
        return str;
    }

    public [Symbol.iterator](): Iterator<T> {
        let current = this.head;
        return {
            next: () => {
                if (!current) return { done: true, value: undefined as any };
                const value = current.value;
                current = current.next;
                return { done: false, value };
            }
        };
    }

    public [Symbol.toStringTag]() {
        return "List";
    }
}
