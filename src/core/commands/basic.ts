interface BasicCommand {
    (args: string[]): Promise<any>;
}

interface BasicCommands {
    // Server Management
    INFO: BasicCommand;            // Get information and statistics about the server
    CONFIG: BasicCommand;          // Get and set server configuration parameters
    CLIENT: BasicCommand;          // Control the connection of a client
    
    // Key Management
    KEYS: BasicCommand;            // Find all keys matching the given pattern
    EXISTS: BasicCommand;          // Determine if a key exists
    DEL: BasicCommand;             // Delete a key
    TYPE: BasicCommand;            // Determine the type stored at key
    
    // Key Expiration
    EXPIRE: BasicCommand;          // Set a key's time to live in seconds
    PEXPIRE: BasicCommand;         // Set a key's time to live in milliseconds
    TTL: BasicCommand;             // Get the time to live for a key
    
    // Key Persistence
    PERSIST: BasicCommand;         // Remove the expiration from a key
    PERSISTEX: BasicCommand;       // Set a key's time to live in seconds
    PERSISTPX: BasicCommand;       // Set a key's time to live in milliseconds
    
    // Key Renaming
    RENAME: BasicCommand;          // Rename a key
    RENAMENX: BasicCommand;        // Rename a key, only if the new key does not exist
    
    // Key Moving
    MOVE: BasicCommand;            // Move a key to another database
    
    // Key Scanning
    SCAN: BasicCommand;            // Incrementally iterate the keys space
    
    // Key Touching
    TOUCH: BasicCommand;           // Update the last access time of a key
    
    // Key Randomness
    RANDOMKEY: BasicCommand;       // Return a random key from the keyspace
    
    // Key Sorting
    SORT: BasicCommand;            // Sort the elements in a list, set or sorted set
    
    // Database Management
    SELECT: BasicCommand;          // Change the selected database for the current connection
    FLUSHDB: BasicCommand;         // Remove all keys from the current database
    FLUSHALL: BasicCommand;        // Remove all keys from all databases
    
    // Monitoring
    MONITOR: BasicCommand;         // Listen for all requests received by the server in real time
    SLOWLOG: BasicCommand;         // Access the Redis slow queries log
    
    // Debugging
    DEBUG: BasicCommand;           // Internal debugging command
    
    // Memory Management
    MEMORY: BasicCommand;          // Show memory usage details
    
    // Replication
    REPLICAOF: BasicCommand;       // Make the server a replica of another instance, or promote it as master
    
    // Cluster Management
    CLUSTER: BasicCommand;         // Manage Redis Cluster nodes and operations
    
    
    // Pub/Sub
    SUBSCRIBE: BasicCommand;       // Listen for messages published to the given channels
    UNSUBSCRIBE: BasicCommand;     // Stop listening for messages posted to the given channels
    PUBLISH: BasicCommand;         // Post a message to a channel
    PUBSUB: BasicCommand;          // Inspect the state of the Pub/Sub subsystem
}

const commands: BasicCommands = {
    INFO: (args: string[]) => Promise.resolve(),
    CONFIG: (args: string[]) => Promise.resolve(),
    CLIENT: (args: string[]) => Promise.resolve(),
    KEYS: (args: string[]) => Promise.resolve(),
    EXISTS: (args: string[]) => Promise.resolve(),
    DEL: (args: string[]) => Promise.resolve(),
    TYPE: (args: string[]) => Promise.resolve(),
    EXPIRE: (args: string[]) => Promise.resolve(),
    PEXPIRE: (args: string[]) => Promise.resolve(),
    TTL: (args: string[]) => Promise.resolve(),
    PERSIST: (args: string[]) => Promise.resolve(),
    PERSISTEX: (args: string[]) => Promise.resolve(),
    PERSISTPX: (args: string[]) => Promise.resolve(),
    RENAME: (args: string[]) => Promise.resolve(),
    RENAMENX: (args: string[]) => Promise.resolve(),
    MOVE: (args: string[]) => Promise.resolve(),
    SCAN: (args: string[]) => Promise.resolve(),
    TOUCH: (args: string[]) => Promise.resolve(),
    RANDOMKEY: (args: string[]) => Promise.resolve(),
    SORT: (args: string[]) => Promise.resolve(),
    SELECT: (args: string[]) => Promise.resolve(),
    FLUSHDB: (args: string[]) => Promise.resolve(),
    FLUSHALL: (args: string[]) => Promise.resolve(),
    MONITOR: (args: string[]) => Promise.resolve(),
    SLOWLOG: (args: string[]) => Promise.resolve(),
    DEBUG: (args: string[]) => Promise.resolve(),
    MEMORY: (args: string[]) => Promise.resolve(),
    REPLICAOF: (args: string[]) => Promise.resolve(),
    CLUSTER: (args: string[]) => Promise.resolve(),
    SUBSCRIBE: (args: string[]) => Promise.resolve(),
    UNSUBSCRIBE: (args: string[]) => Promise.resolve(),
    PUBLISH: (args: string[]) => Promise.resolve(),
    PUBSUB: (args: string[]) => Promise.resolve()
};

export default commands;
