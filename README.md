# QuarkDB

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
  <img src="https://img.shields.io/badge/Redis_Compatible-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis Compatible" />
</div>

<div align="center">
  <h3>A high-performance, TypeScript-native in-memory database</h3>
  <p>Inspired by Redis, powered by modern JavaScript</p>
</div>

## Overview

QuarkDB is a lightweight, in-memory database built with TypeScript that provides Redis-compatible functionality with a modern developer experience. It implements efficient data structures and supports the RESP (Redis Serialization Protocol) for seamless communication.

## ✨ Features

### 🧰 Core Data Structures

- **HashMap**: Key-value storage with optional expiration (TTL)
  - O(1) lookup, insertion, and deletion
  - Automatic key expiration management
  - Memory-efficient implementation

- **List**: Linked list implementation with comprehensive operations
  - O(1) insertion at both ends
  - Negative index support (like Python lists)
  - Full iterator implementation

- **Set**: Collection of unique elements with set theory operations
  - O(1) lookup, insertion, and deletion
  - Comprehensive set operations (union, intersection, difference)
  - Subset and superset relationship testing

### 🔄 Protocol Support

- **RESP (Redis Serialization Protocol)**: Efficient binary-safe protocol for client-server communication
  - Compatible with existing Redis clients
  - Optimized serialization/deserialization
  - Support for all data types

- **Command Parser**: Handles serialization and deserialization of commands
  - Robust error handling
  - Extensible command system

### 👨‍💻 Developer Experience

- **Fully Typed**: Written in TypeScript for type safety and better developer experience
  - Complete type definitions for all APIs
  - Generics support for flexible data typing

- **Comprehensive Tests**: Extensive test coverage for all components
  - 96+ unit tests covering all functionality
  - Edge case handling

- **Fast Development**: Built with Bun for rapid development and testing
  - Quick startup time
  - Hot reloading support

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/dsoumitra693/quark-db.git
cd quark-db

# Install dependencies
bun install
```

## 🔧 Usage

### Running the Server

```bash
# Start the development server with hot-reloading
bun run dev
```

The server will start on the default port 6379. You can connect to it using any Redis client:

```bash
# Using redis-cli
redis-cli -p 6379

# Or connect programmatically using any Redis client library
```

### Running Tests

```bash
# Run all tests
bun run test

# Run specific test file
bun run test tests/unit/core/dataStructures/list.test.ts

# Run tests with coverage report
bun run test --coverage
```

### Quick Start Example

```typescript
// index.ts
import { HashMap, List, Set } from './src/core/dataStructures';

// Create a simple key-value store
const store = new HashMap<string, any>();

// Store different data types
store.set('greeting', 'Hello, QuarkDB!');
store.set('counter', 42);
store.set('tags', ['database', 'typescript', 'redis']);

// Create a list and populate it
const myList = new List<string>();
myList.set(0, 'first');
myList.set(1, 'second');

// Store the list in our HashMap
store.set('myList', myList);

console.log('Stored data:', store.get('greeting')); // Hello, QuarkDB!
console.log('List item:', myList.get(0)); // first
```

## 📚 API Reference

### HashMap

A generic key-value store with optional expiration support.

```typescript
// Create a new HashMap
const map = new HashMap<string, any>();

// Basic operations
map.set("key", "value");              // Set a value
const value = map.get("key");        // Get a value
const exists = map.has("key");       // Check if key exists (returns boolean)
map.delete("key");                   // Delete a value (returns boolean)
map.clear();                         // Remove all entries
const size = map.size();             // Get number of entries

// TTL operations
map.setex("key", "value", 60);       // Set with 60 second expiration
map.expireat("key", 60);             // Set expiration for existing key
const ttl = map.ttl("key");         // Get remaining time to live (seconds)
                                     // Returns -1 if no expiration set

// Iteration
for (const key of map.keys()) { }    // Iterate over keys
for (const value of map.values()) { } // Iterate over values
for (const [key, value] of map.entries()) { } // Iterate over key-value pairs
```

### List

A doubly linked list implementation with comprehensive operations.

```typescript
// Create a new List
const list = new List<number>();

// Basic operations
list.set(0, 1);                      // Set value at index 0
list.set(1, 2);                      // Set value at index 1
list.set(-1, 3);                     // Set value at end-1 (negative indices supported)

const value = list.get(0);           // Get value at index 0 (returns 1)
const lastValue = list.get(-1);      // Get last value (returns 3)

list.remove(0);                      // Remove value at index 0
list.clear();                        // Clear the list

const length = list.length;          // Get list length

// Iteration
for (const value of list) {          // Lists are iterable
  console.log(value);                
}

// String representation
console.log(list.toString());        // e.g., "1->2->3"
```

### Set

A collection of unique elements with set theory operations.

```typescript
// Create a new Set
const set = new Set<string>();
const set2 = new Set<string>();

// Basic operations
set.add("value");                    // Add a value (returns boolean)
set.delete("value");                 // Delete a value (returns boolean)
const exists = set.has("value");    // Check if value exists (returns boolean)
set.clear();                         // Clear the set
const size = set.size;               // Get number of elements

// Element access
const first = set.first();           // Get first element
const last = set.last();             // Get last element
const array = set.toArray();         // Convert to array

// Iteration
for (const value of set) { }         // Sets are iterable
for (const value of set.values()) { } // Iterate over values
for (const key of set.keys()) { }    // Same as values() (for compatibility)
for (const [key, value] of set.entries()) { } // Entries are [value, value] pairs

// Set operations
set.add("a").add("b").add("c");     // Method chaining
set2.add("c").add("d").add("e");

// Returns new Set with all elements from both sets
const unionSet = set.union(set2);    // {"a", "b", "c", "d", "e"}

// Returns new Set with elements common to both sets
const intersectionSet = set.intersection(set2); // {"c"}

// Returns new Set with elements in set but not in set2
const differenceSet = set.difference(set2); // {"a", "b"}

// Relationship testing
const isSubset = set.isSubsetOf(set2);       // false
const isSuperset = set.isSupersetOf(set2);   // false
const isProper = set.isProperSubsetOf(set2); // false
```

## 🏗️ Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────┐
│                      QuarkDB Server                      │
│                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │  RESP       │    │  Command    │    │  Data       │  │
│  │  Protocol   │◄──►│  Processor  │◄──►│  Structures │  │
│  │  Handler    │    │             │    │             │  │
│  └─────────────┘    └─────────────┘    └─────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
      ▲                                       ▲
      │                                       │
      │                                       │
      ▼                                       ▼
┌──────────┐                          ┌──────────────┐
│  Redis   │                          │  Custom      │
│  Clients │                          │  TypeScript  │
│          │                          │  API         │
└──────────┘                          └──────────────┘
```

### Project Structure

```
quark-db/
├── src/                      # Source code
│   ├── core/                 # Core components
│   │   ├── dataStructures/   # Data structure implementations
│   │   │   ├── hash.ts       # HashMap implementation
│   │   │   ├── list.ts       # List implementation
│   │   │   └── set.ts        # Set implementation
│   │   └── index.ts          # Core exports
│   ├── parser/               # Protocol parser
│   │   ├── commandParser.ts  # RESP protocol parser
│   │   └── index.ts          # Parser exports
│   ├── server/               # Server implementation
│   │   └── index.ts          # Server setup
│   └── index.ts              # Main exports
├── tests/                    # Test files
│   ├── unit/                 # Unit tests
│   │   ├── core/             # Core component tests
│   │   │   └── dataStructures/  # Data structure tests
│   │   │       ├── hash.test.ts
│   │   │       ├── list.test.ts
│   │   │       └── set.test.ts
│   │   ├── parser.test.js    # Parser tests
│   │   └── serialiser.test.ts # Serializer tests
│   └── integration/          # Integration tests
├── index.ts                  # Main entry point
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## 📊 Performance

QuarkDB is designed for high performance, with careful attention to algorithmic efficiency:

| Operation              | Time Complexity | Space Complexity |
|------------------------|----------------|------------------|
| HashMap Get/Set/Delete | O(1)           | O(n)             |
| List Access by Index   | O(n)           | O(n)             |
| List Insert/Delete     | O(n)           | O(1)             |
| Set Add/Delete/Has     | O(1)           | O(n)             |
| Set Union/Intersection | O(n+m)         | O(n+m)           |

### Redis Compatibility

QuarkDB implements a subset of Redis commands with compatible semantics:

| Feature                | Redis                   | QuarkDB                 |
|------------------------|-------------------------|-------------------------|
| Key-Value Operations   | GET, SET, DEL, EXISTS   | ✅ Full support         |
| Expiration             | EXPIRE, TTL, EXPIREAT   | ✅ Full support         |
| Lists                  | LPUSH, RPUSH, LINDEX    | ✅ Full support         |
| Sets                   | SADD, SREM, SMEMBERS    | ✅ Full support         |
| Sorted Sets           | ZADD, ZRANGE            | ⚠️ Planned              |
| Pub/Sub               | PUBLISH, SUBSCRIBE      | ⚠️ Planned              |
| Transactions          | MULTI, EXEC, WATCH      | ⚠️ Planned              |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Roadmap

- [ ] Implement Sorted Sets (ZSet)
- [ ] Add Pub/Sub mechanism
- [ ] Support for transactions
- [ ] Persistence options (RDB-like snapshots)
- [ ] Cluster mode for horizontal scaling

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Inspired by [Redis](https://redis.io/)
- Built with [TypeScript](https://www.typescriptlang.org/) and [Bun](https://bun.sh/)
- Tested with [Jest](https://jestjs.io/)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/dsoumitra693">Soumitra Das</a></p>
</div>