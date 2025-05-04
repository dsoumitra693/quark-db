import GlobalMap from "../globalMap";

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

    // Key Randomness
    RANDOMKEY: BasicCommand;       // Return a random key from the keyspace

    // Database Management
    FLUSHDB: BasicCommand;         // Remove all keys from the current database

    // Memory Management
    MEMORY: BasicCommand;          // Show memory usage details

    // Pub/Sub
    SUBSCRIBE: BasicCommand;       // Listen for messages published to the given channels
    UNSUBSCRIBE: BasicCommand;     // Stop listening for messages posted to the given channels
    PUBLISH: BasicCommand;         // Post a message to a channel
    PUBSUB: BasicCommand;          // Inspect the state of the Pub/Sub subsystem
}

const globalMap = GlobalMap.getInstance()

const commands: BasicCommands = {
    INFO: (args: string[]) => Promise.resolve(),
    CONFIG: (args: string[]) => Promise.resolve(),
    CLIENT: (args: string[]) => Promise.resolve(),
    KEYS: (args: string[]) => {
        const pattern = args[0]
        const keys = globalMap.keys()
        if (pattern.length > 0) {
            const reg = new RegExp(pattern.replace(/\*/g, '.*'))
            return Promise.resolve([keys].filter((key) => reg.test(key)))
        }
        return Promise.resolve(keys)
    },
    EXISTS: (args: string[]) => {
        const keys = args;
        let flag = 0;
        for (const key of keys) {
            if (globalMap.has(key)) {
                flag++;
            }
        }
        return Promise.resolve(flag)
    },
    DEL: (args: string[]) => {
        const keys = args;
        let flag = 0;
        for (const key of keys) {
            if (globalMap.has(key)) {
                globalMap.delete(key);
                flag++;
            }
        }
        return Promise.resolve(flag)
    },
    TYPE: (args: string[]) => {
        const key = args[0];
        const value = globalMap.get(key);
        if (!value) {
            return Promise.resolve('none');
        }
        const type = value.constructor.name;

        return Promise.resolve(type);
    },
    EXPIRE: (args: string[]) => {
        const key = args[0];
        if (!globalMap.has(key)) {
            return Promise.resolve(0);
        }
        const ex = parseInt(args[1]) * 1000 + Date.now();
        globalMap.expireat(key, ex);
        return Promise.resolve(ex/1000)
    },
    PEXPIRE: (args: string[]) => {
        const key = args[0];
        if (!globalMap.has(key)) {
            return Promise.resolve(0);
        }
        const ex = parseInt(args[1]) + Date.now();
        globalMap.expireat(key, ex);
        return Promise.resolve(ex)
    },
    TTL: (args: string[]) => {
        const key = args[0];
        const ttl = globalMap.ttl(key);
        return Promise.resolve(ttl)
    },
    PERSIST: (args: string[]) => {
        const key = args[0];
        
        const isPersisted = globalMap.persist(key);
        return Promise.resolve(isPersisted)
    },
    PERSISTEX: (args: string[]) => {
        const key = args[0];
        if (!globalMap.has(key)) {
            return Promise.resolve(0);
        }
        const ex = parseInt(args[1]) * 1000 + Date.now();
        globalMap.expireat(key, ex);
        return Promise.resolve(ex/1000)
    },
    PERSISTPX: (args: string[]) => {
        const key = args[0];
        if (!globalMap.has(key)) {
            return Promise.resolve(0);
        }
        const ex = parseInt(args[1]) + Date.now();
        globalMap.expireat(key, ex);
        return Promise.resolve(ex)
    },
    RENAME: (args: string[]) => {
        const oldKey = args[0];
        const newKey = args[1];
        if (!globalMap.has(oldKey)) {
            return Promise.resolve(0);
        }
        
        globalMap.set(newKey, globalMap.get(oldKey)!);
        globalMap.delete(oldKey);
        return Promise.resolve(1)
    },
    RENAMENX: (args: string[]) => {
        const oldKey = args[0];
        const newKey = args[1];
        if (!globalMap.has(oldKey)) {
            return Promise.resolve(0);
        }
        if (globalMap.has(newKey)) {
            return Promise.resolve(0);
        }
        globalMap.set(newKey, globalMap.get(oldKey)!);
        globalMap.delete(oldKey);
        return Promise.resolve(1)
    },
    RANDOMKEY: (args: string[]) => {
        const keys = globalMap.keys();
        if (keys.length === 0) {
            return Promise.resolve(null);
        }
        const randomIndex = ~~(Math.random() * keys.length);
        return Promise.resolve(keys[randomIndex]);
    },
    FLUSHDB: (args: string[]) => Promise.resolve(),
    MEMORY: (args: string[]) => Promise.resolve(),
    SUBSCRIBE: (args: string[]) => Promise.resolve(),
    UNSUBSCRIBE: (args: string[]) => Promise.resolve(),
    PUBLISH: (args: string[]) => Promise.resolve(),
    PUBSUB: (args: string[]) => Promise.resolve()
};

export default commands;
