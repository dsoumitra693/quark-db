interface SetCommand {
    (args: string[]): Promise<any>;
}

interface SetCommands {
    // Basic Set Operations
    SADD: SetCommand;           // Add one or more members to a set
    SREM: SetCommand;           // Remove one or more members from a set
    SISMEMBER: SetCommand;      // Determine if a given value is a member of a set
    SCARD: SetCommand;          // Get the number of members in a set
    
    // Set Operations
    SPOP: SetCommand;           // Remove and return one or multiple random members from a set
    SRANDMEMBER: SetCommand;    // Get one or multiple random members from a set
    SMOVE: SetCommand;          // Move a member from one set to another
    
    // Multi-Set Operations
    SINTER: SetCommand;         // Intersect multiple sets
    SINTERSTORE: SetCommand;    // Intersect multiple sets and store the resulting set in a key
    SUNION: SetCommand;         // Add multiple sets
    SUNIONSTORE: SetCommand;    // Add multiple sets and store the resulting set in a key
    SDIFF: SetCommand;          // Subtract multiple sets
    SDIFFSTORE: SetCommand;     // Subtract multiple sets and store the resulting set in a key
    
    // Set Information
    SMEMBERS: SetCommand;       // Get all the members in a set
    SSCAN: SetCommand;          // Incrementally iterate set elements
}

const commands: SetCommands = {
    SADD: (args: string[]) => Promise.resolve(),
    SREM: (args: string[]) => Promise.resolve(),
    SISMEMBER: (args: string[]) => Promise.resolve(),
    SCARD: (args: string[]) => Promise.resolve(),
    SPOP: (args: string[]) => Promise.resolve(),
    SRANDMEMBER: (args: string[]) => Promise.resolve(),
    SMOVE: (args: string[]) => Promise.resolve(),
    SINTER: (args: string[]) => Promise.resolve(),
    SINTERSTORE: (args: string[]) => Promise.resolve(),
    SUNION: (args: string[]) => Promise.resolve(),
    SUNIONSTORE: (args: string[]) => Promise.resolve(),
    SDIFF: (args: string[]) => Promise.resolve(),
    SDIFFSTORE: (args: string[]) => Promise.resolve(),
    SMEMBERS: (args: string[]) => Promise.resolve(),
    SSCAN: (args: string[]) => Promise.resolve()
};

export default commands;