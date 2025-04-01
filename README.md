<div align="center">

# QuarkDB

<img src="https://github.com/user-attachments/assets/231278ec-f7d8-4357-85e6-93e11300ea04" alt="QuarkDB Logo" width="180" />

### A high-performance, TypeScript-native in-memory database

<p>Inspired by Redis, powered by modern JavaScript</p>

<div>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
  <img src="https://img.shields.io/badge/Redis_Compatible-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis Compatible" />
</div>

<div>
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT" />
  <img src="https://img.shields.io/github/stars/dsoumitra693/quark-db?style=flat-square" alt="Stars" />
  <img src="https://img.shields.io/github/issues/dsoumitra693/quark-db?style=flat-square" alt="Issues" />
  <img src="https://img.shields.io/github/last-commit/dsoumitra693/quark-db?style=flat-square" alt="Last Commit" />
</div>

</div>

<br />

## 📋 Overview

QuarkDB is a lightweight, in-memory database built with TypeScript that provides Redis-compatible functionality with a modern developer experience. It implements efficient data structures and supports the RESP (Redis Serialization Protocol) for seamless communication.

> "QuarkDB combines the power of Redis with the type safety of TypeScript, making it perfect for modern JavaScript applications."

<details>
<summary><strong>Table of Contents</strong></summary>

- [Overview](#-overview)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Architecture](#-architecture)
- [Performance Considerations](#-performance-considerations)
- [Comparison](#-comparison-with-other-databases)
- [Contributing](#-contributing)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

</details>

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

- **SortedSet**: Self-balancing binary search tree (AVL tree) implementation for sorted data
  - O(log n) insertion, deletion, and lookup
  - Automatic sorting and duplicate removal
  - Full iterator implementation

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

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0
- [Node.js](https://nodejs.org/) >= 18.0.0 (if not using Bun)
- [TypeScript](https://www.typescriptlang.org/) >= 5.0.0

### From GitHub

```bash
# Clone the repository
git clone https://github.com/dsoumitra693/quark-db.git
cd quark-db

# Install dependencies with Bun (recommended)
bun install

# Or with npm
npm install
```

### Project Status

> ⚠️ **Early Development Phase**: QuarkDB is currently in early development and not yet available as a package dependency. The API may change significantly between versions.

In the future, once the project reaches a stable version, it will be published to package registries for easy installation as a dependency.

## 🔧 Usage

### Running the Server

```bash
# Start the development server with hot-reloading
bun run dev

# Build the TypeScript code
npm run build
```

The server will start on the default port 6379. You can connect to it using any Redis client:

```bash
# Using redis-cli
redis-cli -p 6379

# Or connect programmatically using any Redis client library
```

### Docker Support

QuarkDB comes with Docker support for easy deployment:

```bash
# Build the Docker image
docker build -t quarkdb .

# Run the container
docker run -p 6379:3000 quarkdb
```

The Dockerfile uses a multi-stage build process to create a minimal production image:
1. **BuilderStage**: Compiles TypeScript code to JavaScript
2. **RuntimeStage**: Contains only the necessary runtime dependencies and compiled code

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
import { HashMap, List, Set, SortedSet } from './src/core/dataStructures';

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

// Create a sorted set
const sortedSet = new SortedSet<number>();
const numbers = Array.from({ length: 1000 }, (_, i) => i);
numbers.forEach(n => sortedSet.add(n));

console.log('Stored data:', store.get('greeting')); // Hello, QuarkDB!
console.log('List item:', myList.get(0)); // first
console.log('Sorted values:', [...sortedSet.values()]); // [0, 1, 2, ..., 999]
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
```

### SortedSet

A self-balancing binary search tree (AVL tree) implementation for sorted data.

```typescript
// Create a new SortedSet
const sortedSet = new SortedSet<number>();

// Basic operations
sortedSet.add(5);                    // Add a value
sortedSet.delete(5);                 // Remove a value (returns boolean)
const exists = sortedSet.has(5);     // Check if value exists (returns boolean)
sortedSet.clear();                   // Clear the set
const size = sortedSet.size();       // Get number of elements

// Element access
const first = sortedSet.first();     // Get first (smallest) element
const last = sortedSet.last();       // Get last (largest) element
const array = [...sortedSet.values()]; // Convert to sorted array

// Iteration
for (const value of sortedSet) {     // SortedSets are iterable
  console.log(value);
}

// Bulk operations
const numbers = Array.from({ length: 1000 }, (_, i) => i);
numbers.forEach(n => sortedSet.add(n));

// Values are automatically sorted
console.log([...sortedSet.values()]); // [0, 1, 2, ..., 999]
```

## 🏗️ Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────┐
│                      QuarkDB Server                     │
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
│   │   │   ├── set.ts        # Set implementation
│   │   │   └── sortedSet.ts  # SortedSet implementation
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
│   │   │       ├── set.test.ts
│   │   │       └── sortedSet.test.ts
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
| SortedSet Add/Delete   | O(log n)       | O(n)             |

### Redis Compatibility

QuarkDB implements a subset of Redis commands with compatible semantics:

| Feature                | Redis                   | QuarkDB                 |
|------------------------|-------------------------|-------------------------|
| Key-Value Operations   | GET, SET, DEL, EXISTS   | ✅ Full support         |
| Expiration             | EXPIRE, TTL, EXPIREAT   | ✅ Full support         |
| Lists                  | LPUSH, RPUSH, LINDEX    | ✅ Full support         |
| Sets                   | SADD, SREM, SMEMBERS    | ✅ Full support         |
| Sorted Sets           | ZADD, ZRANGE            | ✅ Full support         |
| Pub/Sub               | PUBLISH, SUBSCRIBE      | ⚠️ Planned              |
| Transactions          | MULTI, EXEC, WATCH      | ⚠️ Planned              |

## 📈 Performance Considerations

QuarkDB is designed with performance in mind, though formal benchmarks have not yet been conducted as the project is in early development. Performance optimization is an ongoing focus area.

### Future Performance Goals

- Minimize memory footprint for stored data
- Optimize operation speed for common use cases
- Provide efficient scaling for large datasets
- Benchmark against similar solutions once the API stabilizes

> Performance benchmarks will be added in future releases as the project matures.

### When to Choose QuarkDB

- **TypeScript Projects**: Native TypeScript support with full type safety
- **Modern JavaScript**: Built for modern JS/TS ecosystems
- **Lightweight Needs**: When you need Redis-like features without the operational complexity
- **Learning**: Excellent for understanding in-memory database concepts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🔒 Security

QuarkDB is designed for use in trusted environments. As with any database:

- **Authentication**: Currently no built-in authentication. Use network-level security.
- **Network Security**: Bind to localhost or use a firewall to restrict access.
- **Input Validation**: All inputs are validated, but additional validation is recommended for production use.
- **Data Encryption**: No built-in encryption. Use TLS for network traffic.

### Security Best Practices

- Run QuarkDB behind a secure proxy in production
- Implement application-level authentication
- Regularly update to the latest version
- Follow the principle of least privilege when configuring access

## 🔧 Troubleshooting

### Common Issues

<details>
<summary><strong>Connection refused when trying to connect</strong></summary>

**Possible causes:**
- QuarkDB server is not running
- Server is running on a different port
- Firewall is blocking the connection

**Solutions:**
- Check if the server is running with `ps aux | grep quark`
- Verify the port configuration
- Check firewall settings
</details>

<details>
<summary><strong>Memory usage grows unexpectedly</strong></summary>

**Possible causes:**
- Keys with no expiration accumulating
- Large data structures

**Solutions:**
- Set TTL for keys that should expire
- Monitor memory usage with built-in commands
- Implement size limits for collections
</details>

<details>
<summary><strong>TypeScript compilation errors</strong></summary>

**Possible causes:**
- Incompatible TypeScript version
- Missing type definitions

**Solutions:**
- Ensure TypeScript >=5.0.0 is installed
- Run `bun install` to reinstall dependencies
- Check tsconfig.json settings
</details>

### Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and community support
- **Documentation**: Check the [official documentation](https://github.com/dsoumitra693/quark-db/wiki) (coming soon)

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Inspired by [Redis](https://redis.io/)
- Built with [TypeScript](https://www.typescriptlang.org/) and [Bun](https://bun.sh/)
- Tested with [Jest](https://jestjs.io/)
- Thanks to all [contributors](https://github.com/dsoumitra693/quark-db/graphs/contributors)

## 📚 Further Reading

- [In-Memory Database Systems](https://en.wikipedia.org/wiki/In-memory_database)
- [Redis Documentation](https://redis.io/documentation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Bun Documentation](https://bun.sh/docs)

---

<div align="center">
  <p>If you find QuarkDB useful, please consider giving it a ⭐ on GitHub!</p>
  <p>Made with ❤️ by <a href="https://github.com/dsoumitra693">Soumitra Das</a></p>
  <br />
  <a href="https://github.com/dsoumitra693/quark-db/issues">Report Bug</a> ·
  <a href="https://github.com/dsoumitra693/quark-db/issues">Request Feature</a> ·
  <a href="https://github.com/dsoumitra693/quark-db/discussions">Discussions</a>
</div>
