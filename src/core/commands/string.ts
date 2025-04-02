interface StringCommand {
    (args: string[]): Promise<any>;
}

interface StringCommands {
    // Basic String Operations
    SET: StringCommand;            // Set the string value of a key
    GET: StringCommand;            // Get the value of a key
    DEL: StringCommand;            // Delete a key
    EXISTS: StringCommand;         // Determine if a key exists
    
    // String Modification
    SETNX: StringCommand;          // Set the value of a key, only if the key does not exist
    SETEX: StringCommand;          // Set the value and expiration of a key
    PSETEX: StringCommand;         // Set the value and expiration in milliseconds of a key
    MSET: StringCommand;           // Set multiple keys to multiple values
    MSETNX: StringCommand;         // Set multiple keys to multiple values, only if none of the keys exist
    
    // String Append/Prepend
    APPEND: StringCommand;         // Append a value to a key
    PREPEND: StringCommand;        // Prepend a value to a key
    
    // String Length
    STRLEN: StringCommand;         // Get the length of the value stored in a key
    
    // String Increment/Decrement
    INCR: StringCommand;           // Increment the integer value of a key by one
    DECR: StringCommand;           // Decrement the integer value of a key by one
    INCRBY: StringCommand;         // Increment the integer value of a key by the given amount
    DECRBY: StringCommand;         // Decrement the integer value of a key by the given number
    INCRBYFLOAT: StringCommand;    // Increment the float value of a key by the given amount
    
    // String Get/Set
    GETSET: StringCommand;         // Set the string value of a key and return its old value
    GETDEL: StringCommand;         // Get the value of a key and delete the key
    
    // String Bit Operations
    BITCOUNT: StringCommand;       // Count set bits in a string
    BITPOS: StringCommand;         // Find first bit set or clear in a string
    BITOP: StringCommand;          // Perform bitwise operations between strings
    BITFIELD: StringCommand;       // Perform arbitrary bitfield integer operations
    
    // String Range Operations
    GETRANGE: StringCommand;       // Get a substring of the string stored at a key
    SETRANGE: StringCommand;       // Overwrite part of a string at key starting at the specified offset
    
    // String Hash Operations
    DUMP: StringCommand;           // Return a serialized version of the value stored at the specified key
    RESTORE: StringCommand;        // Create a key using the provided serialized value, previously obtained using DUMP
}

const commands: StringCommands = {
    SET: (args: string[]) => Promise.resolve(),
    GET: (args: string[]) => Promise.resolve(),
    DEL: (args: string[]) => Promise.resolve(),
    EXISTS: (args: string[]) => Promise.resolve(),
    SETNX: (args: string[]) => Promise.resolve(),
    SETEX: (args: string[]) => Promise.resolve(),
    PSETEX: (args: string[]) => Promise.resolve(),
    MSET: (args: string[]) => Promise.resolve(),
    MSETNX: (args: string[]) => Promise.resolve(),
    APPEND: (args: string[]) => Promise.resolve(),
    PREPEND: (args: string[]) => Promise.resolve(),
    STRLEN: (args: string[]) => Promise.resolve(),
    INCR: (args: string[]) => Promise.resolve(),
    DECR: (args: string[]) => Promise.resolve(),
    INCRBY: (args: string[]) => Promise.resolve(),
    DECRBY: (args: string[]) => Promise.resolve(),
    INCRBYFLOAT: (args: string[]) => Promise.resolve(),
    GETSET: (args: string[]) => Promise.resolve(),
    GETDEL: (args: string[]) => Promise.resolve(),
    BITCOUNT: (args: string[]) => Promise.resolve(),
    BITPOS: (args: string[]) => Promise.resolve(),
    BITOP: (args: string[]) => Promise.resolve(),
    BITFIELD: (args: string[]) => Promise.resolve(),
    GETRANGE: (args: string[]) => Promise.resolve(),
    SETRANGE: (args: string[]) => Promise.resolve(),
    DUMP: (args: string[]) => Promise.resolve(),
    RESTORE: (args: string[]) => Promise.resolve()
};

export default commands;