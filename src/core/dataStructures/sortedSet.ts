/**
 * A SortedSet implementation that maintains elements in sorted order.
 * This implementation uses a balanced binary search tree (AVL Tree) for efficient operations.
 * @template T - The type of elements in the set, must be comparable.
 */
export default class SortedSet<T> {
    private root: AVLNode<T> | null = null;
    private _size: number = 0;
    private comparator: (a: T, b: T) => number;

    /**
     * Creates a new SortedSet.
     * @param comparator - Optional custom comparator function. If not provided, uses default comparison.
     */
    constructor(comparator?: (a: T, b: T) => number) {
        this.comparator = comparator || this.defaultCompare;
    }

    /**
     * Default comparison function.
     * @private
     */
    private defaultCompare(a: T, b: T): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    /**
     * Adds a value to the set.
     * @param value - The value to add.
     * @returns True if the value was added, false if it already existed.
     * @complexity O(log n)
     */
    public add(value: T): boolean {
        const [newRoot, added] = this.insertNode(this.root, value);
        this.root = newRoot;
        if (added) this._size++;
        return added;
    }

    /**
     * Removes a value from the set.
     * @param value - The value to remove.
     * @returns True if the value was removed, false if it didn't exist.
     * @complexity O(log n)
     */
    public delete(value: T): boolean {
        const [newRoot, removed] = this.removeNode(this.root, value);
        this.root = newRoot;
        if (removed) this._size--;
        return removed;
    }

    /**
     * Checks if the set contains a value.
     * @param value - The value to check.
     * @returns True if the value exists in the set.
     * @complexity O(log n)
     */
    public has(value: T): boolean {
        return this.findNode(this.root, value) !== null;
    }

    /**
     * Removes all elements from the set.
     * @complexity O(1)
     */
    public clear(): void {
        this.root = null;
        this._size = 0;
    }

    /**
     * Returns the number of elements in the set.
     * @returns The size of the set.
     * @complexity O(1)
     */
    public size(): number {
        return this._size;
    }

    /**
     * Returns an iterator over the values in the set in ascending order.
     * @returns An iterator over the values.
     * @complexity O(n) for full iteration
     */
    public values(): IterableIterator<T> {
        const values: T[] = [];
        this.inOrderTraversal(this.root, values);
        return values[Symbol.iterator]();
    }

    /**
     * Returns an iterator over the keys in the set (same as values for a set).
     * @returns An iterator over the keys.
     * @complexity O(n) for full iteration
     */
    public keys(): IterableIterator<T> {
        return this.values();
    }

    /**
     * Returns an iterator over [value, value] pairs for each element.
     * @returns An iterator over entries.
     * @complexity O(n) for full iteration
     */
    public entries(): IterableIterator<[T, T]> {
        const entries: [T, T][] = [];
        const values: T[] = [];
        this.inOrderTraversal(this.root, values);
        values.forEach(value => entries.push([value, value]));
        return entries[Symbol.iterator]();
    }

    /**
     * Returns an iterator over the values in the set.
     * @returns An iterator over the values.
     */
    public [Symbol.iterator](): IterableIterator<T> {
        return this.values();
    }

    /**
     * Returns the minimum value in the set.
     * @returns The minimum value or undefined if the set is empty.
     * @complexity O(log n)
     */
    public min(): T | undefined {
        if (!this.root) return undefined;
        let current = this.root;
        while (current.left) {
            current = current.left;
        }
        return current.value;
    }

    /**
     * Returns the maximum value in the set.
     * @returns The maximum value or undefined if the set is empty.
     * @complexity O(log n)
     */
    public max(): T | undefined {
        if (!this.root) return undefined;
        let current = this.root;
        while (current.right) {
            current = current.right;
        }
        return current.value;
    }

    /**
     * Returns all values in the set as an array.
     * @returns An array of all values in sorted order.
     * @complexity O(n)
     */
    public toArray(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }

    /**
     * Returns the first value greater than or equal to the given value.
     * @param value - The value to find the ceiling for.
     * @returns The ceiling value or undefined if no such value exists.
     * @complexity O(log n)
     */
    public ceiling(value: T): T | undefined {
        let result: T | undefined = undefined;
        let current = this.root;
        
        while (current) {
            const cmp = this.comparator(value, current.value);
            if (cmp === 0) return current.value;
            
            if (cmp < 0) {
                result = current.value;
                current = current.left;
            } else {
                current = current.right;
            }
        }
        
        return result;
    }

    /**
     * Returns the greatest value less than or equal to the given value.
     * @param value - The value to find the floor for.
     * @returns The floor value or undefined if no such value exists.
     * @complexity O(log n)
     */
    public floor(value: T): T | undefined {
        let result: T | undefined = undefined;
        let current = this.root;
        
        while (current) {
            const cmp = this.comparator(value, current.value);
            if (cmp === 0) return current.value;
            
            if (cmp < 0) {
                current = current.left;
            } else {
                result = current.value;
                current = current.right;
            }
        }
        
        return result;
    }

    /**
     * Returns a subset of elements between the given range (inclusive).
     * @param fromValue - The lower bound (inclusive).
     * @param toValue - The upper bound (inclusive).
     * @returns An array of values within the range.
     * @complexity O(k + log n) where k is the number of elements in the range
     */
    public range(fromValue: T, toValue: T): T[] {
        const result: T[] = [];
        this.rangeTraversal(this.root, fromValue, toValue, result);
        return result;
    }

    // Private helper methods for AVL tree operations

    /**
     * Performs an in-order traversal of the tree, collecting values.
     * @private
     */
    private inOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
        if (!node) return;
        this.inOrderTraversal(node.left, result);
        result.push(node.value);
        this.inOrderTraversal(node.right, result);
    }

    /**
     * Collects values within a given range.
     * @private
     */
    private rangeTraversal(node: AVLNode<T> | null, fromValue: T, toValue: T, result: T[]): void {
        if (!node) return;
        
        const cmpFrom = this.comparator(fromValue, node.value);
        const cmpTo = this.comparator(toValue, node.value);
        
        if (cmpFrom < 0) {
            this.rangeTraversal(node.left, fromValue, toValue, result);
        }
        
        if (cmpFrom <= 0 && cmpTo >= 0) {
            result.push(node.value);
        }
        
        if (cmpTo > 0) {
            this.rangeTraversal(node.right, fromValue, toValue, result);
        }
    }

    /**
     * Finds a node with the given value.
     * @private
     */
    private findNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        if (!node) return null;
        
        const cmp = this.comparator(value, node.value);
        if (cmp === 0) return node;
        if (cmp < 0) return this.findNode(node.left, value);
        return this.findNode(node.right, value);
    }

    /**
     * Inserts a value into the tree.
     * @private
     * @returns A tuple of [new root node, whether value was added]
     */
    private insertNode(node: AVLNode<T> | null, value: T): [AVLNode<T>, boolean] {
        if (!node) return [new AVLNode<T>(value), true];
        
        const cmp = this.comparator(value, node.value);
        
        if (cmp === 0) return [node, false]; // Value already exists
        
        let added = false;
        
        if (cmp < 0) {
            const [newLeft, wasAdded] = this.insertNode(node.left, value);
            node.left = newLeft;
            added = wasAdded;
        } else {
            const [newRight, wasAdded] = this.insertNode(node.right, value);
            node.right = newRight;
            added = wasAdded;
        }
        
        if (added) {
            this.updateHeight(node);
            return [this.balance(node), true];
        }
        
        return [node, false];
    }

    /**
     * Removes a value from the tree.
     * @private
     * @returns A tuple of [new root node, whether value was removed]
     */
    private removeNode(node: AVLNode<T> | null, value: T): [AVLNode<T> | null, boolean] {
        if (!node) return [null, false];
        
        const cmp = this.comparator(value, node.value);
        
        if (cmp < 0) {
            const [newLeft, removed] = this.removeNode(node.left, value);
            node.left = newLeft;
            if (removed) {
                this.updateHeight(node);
                return [this.balance(node), true];
            }
            return [node, false];
        } else if (cmp > 0) {
            const [newRight, removed] = this.removeNode(node.right, value);
            node.right = newRight;
            if (removed) {
                this.updateHeight(node);
                return [this.balance(node), true];
            }
            return [node, false];
        } else {
            // Found the node to remove
            
            // Case 1: Leaf node
            if (!node.left && !node.right) {
                return [null, true];
            }
            
            // Case 2: Only one child
            if (!node.left) return [node.right, true];
            if (!node.right) return [node.left, true];
            
            // Case 3: Two children
            // Find the in-order successor (smallest value in right subtree)
            const successor = this.findMinNode(node.right);
            node.value = successor.value;
            
            // Remove the successor
            const [newRight, _] = this.removeNode(node.right, successor.value);
            node.right = newRight;
            
            this.updateHeight(node);
            return [this.balance(node), true];
        }
    }

    /**
     * Finds the minimum value node in a subtree.
     * @private
     */
    private findMinNode(node: AVLNode<T>): AVLNode<T> {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    /**
     * Updates the height of a node based on its children.
     * @private
     */
    private updateHeight(node: AVLNode<T>): void {
        const leftHeight = node.left ? node.left.height : 0;
        const rightHeight = node.right ? node.right.height : 0;
        node.height = Math.max(leftHeight, rightHeight) + 1;
    }

    /**
     * Gets the balance factor of a node.
     * @private
     */
    private getBalanceFactor(node: AVLNode<T>): number {
        const leftHeight = node.left ? node.left.height : 0;
        const rightHeight = node.right ? node.right.height : 0;
        return leftHeight - rightHeight;
    }

    /**
     * Balances a node if it's unbalanced.
     * @private
     */
    private balance(node: AVLNode<T>): AVLNode<T> {
        const balanceFactor = this.getBalanceFactor(node);
        
        // Left heavy
        if (balanceFactor > 1) {
            // Left-Right case
            if (this.getBalanceFactor(node.left!) < 0) {
                node.left = this.rotateLeft(node.left!);
            }
            // Left-Left case
            return this.rotateRight(node);
        }
        
        // Right heavy
        if (balanceFactor < -1) {
            // Right-Left case
            if (this.getBalanceFactor(node.right!) > 0) {
                node.right = this.rotateRight(node.right!);
            }
            // Right-Right case
            return this.rotateLeft(node);
        }
        
        return node;
    }

    /**
     * Performs a right rotation.
     * @private
     */
    private rotateRight(y: AVLNode<T>): AVLNode<T> {
        const x = y.left!;
        const T2 = x.right;
        
        x.right = y;
        y.left = T2;
        
        this.updateHeight(y);
        this.updateHeight(x);
        
        return x;
    }

    /**
     * Performs a left rotation.
     * @private
     */
    private rotateLeft(x: AVLNode<T>): AVLNode<T> {
        const y = x.right!;
        const T2 = y.left;
        
        y.left = x;
        x.right = T2;
        
        this.updateHeight(x);
        this.updateHeight(y);
        
        return y;
    }
}

/**
 * A node in the AVL tree.
 * @private
 */
class AVLNode<T> {
    value: T;
    left: AVLNode<T> | null = null;
    right: AVLNode<T> | null = null;
    height: number = 1;
    
    constructor(value: T) {
        this.value = value;
    }
}
