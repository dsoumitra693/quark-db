interface HashCommand {
    (args: string[]): Promise<any>;
}

interface HashCommands {
    // Basic Hash Operations
    HSET: HashCommand;          // Set field in hash
    HGET: HashCommand;          // Get value of field in hash
    HSETNX: HashCommand;        // Set field in hash only if field does not exist
    HGETALL: HashCommand;       // Get all fields and values in hash
    HEXISTS: HashCommand;       // Check if field exists in hash
    HDEL: HashCommand;          // Delete one or more hash fields
    HLEN: HashCommand;          // Get number of fields in hash
    
    // Increment/Decrement Operations
    HINCRBY: HashCommand;       // Increment the integer value of a hash field by the given number
    HINCRBYFLOAT: HashCommand;  // Increment the float value of a hash field by the given amount
    
    // Multiple Fields Operations
    HMSET: HashCommand;         // Set multiple hash fields to multiple values
    HMGET: HashCommand;         // Get the values of all the given hash fields
    
    // Scan Operations
    HSCAN: HashCommand;         // Incrementally iterate hash fields and associated values
    
    // Key Operations
    HKEYS: HashCommand;         // Get all the fields in a hash
    HVALS: HashCommand;         // Get all the values in a hash
}

const commands: HashCommands = {
    HSET: (args: string[]) => Promise.resolve(),
    HGET: (args: string[]) => Promise.resolve(),
    HSETNX: (args: string[]) => Promise.resolve(),
    HGETALL: (args: string[]) => Promise.resolve(),
    HEXISTS: (args: string[]) => Promise.resolve(),
    HDEL: (args: string[]) => Promise.resolve(),
    HLEN: (args: string[]) => Promise.resolve(),
    HINCRBY: (args: string[]) => Promise.resolve(),
    HINCRBYFLOAT: (args: string[]) => Promise.resolve(),
    HMSET: (args: string[]) => Promise.resolve(),
    HMGET: (args: string[]) => Promise.resolve(),
    HSCAN: (args: string[]) => Promise.resolve(),
    HKEYS: (args: string[]) => Promise.resolve(),
    HVALS: (args: string[]) => Promise.resolve()
};

export default commands;