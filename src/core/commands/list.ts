interface ListCommand {
    (args: string[]): Promise<any>;
}

interface ListCommands {
    // Basic List Operations
    LPUSH: ListCommand;         // Insert all the specified values at the head of the list
    RPUSH: ListCommand;         // Insert all the specified values at the tail of the list
    LPOP: ListCommand;          // Remove and get the first element in a list
    RPOP: ListCommand;          // Remove and get the last element in a list
    LLEN: ListCommand;          // Get the length of the list
    
    // Index Operations
    LINDEX: ListCommand;        // Get an element from a list by its index
    LSET: ListCommand;          // Set the value of an element in a list by its index
    LINSERT: ListCommand;       // Insert an element before or after another element in a list
    
    // Range Operations
    LRANGE: ListCommand;        // Get a range of elements from a list
    LTRIM: ListCommand;         // Trim a list to the specified range
    
    // Blocking Operations
    BLPOP: ListCommand;         // Remove and get the first element in a list, or block until one is available
    BRPOP: ListCommand;         // Remove and get the last element in a list, or block until one is available
    BRPOPLPUSH: ListCommand;    // Pop a value from a list, push it to another list and return it; or block until one is available
    
    // Remove Operations
    LREM: ListCommand;          // Remove elements from a list
}

const commands: ListCommands = {
    LPUSH: (args: string[]) => Promise.resolve(),
    RPUSH: (args: string[]) => Promise.resolve(),
    LPOP: (args: string[]) => Promise.resolve(),
    RPOP: (args: string[]) => Promise.resolve(),
    LLEN: (args: string[]) => Promise.resolve(),
    LINDEX: (args: string[]) => Promise.resolve(),
    LSET: (args: string[]) => Promise.resolve(),
    LINSERT: (args: string[]) => Promise.resolve(),
    LRANGE: (args: string[]) => Promise.resolve(),
    LTRIM: (args: string[]) => Promise.resolve(),
    BLPOP: (args: string[]) => Promise.resolve(),
    BRPOP: (args: string[]) => Promise.resolve(),
    BRPOPLPUSH: (args: string[]) => Promise.resolve(),
    LREM: (args: string[]) => Promise.resolve()
};

export default commands;