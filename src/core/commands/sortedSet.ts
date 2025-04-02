interface SortedSetCommand {
    (args: string[]): Promise<any>;
}

interface SortedSetCommands {
    // Basic Sorted Set Operations
    ZADD: SortedSetCommand;            // Add one or more members to a sorted set, or update its score if it already exists
    ZREM: SortedSetCommand;            // Remove one or more members from a sorted set
    ZCARD: SortedSetCommand;           // Get the number of members in a sorted set
    ZSCORE: SortedSetCommand;          // Get the score associated with the given member in a sorted set
    
    // Score Range Operations
    ZRANGE: SortedSetCommand;          // Return a range of members in a sorted set, by index
    ZRANGEBYSCORE: SortedSetCommand;   // Return a range of members in a sorted set, by score
    ZREVRANGE: SortedSetCommand;       // Return a range of members in a sorted set, by index, with scores ordered from high to low
    ZREVRANGEBYSCORE: SortedSetCommand;// Return a range of members in a sorted set, by score, with scores ordered from high to low
    
    // Score Count Operations
    ZCOUNT: SortedSetCommand;          // Count the members in a sorted set with scores within the given values
    ZLEXCOUNT: SortedSetCommand;       // Count the number of members in a sorted set between a given lexicographical range
    
    // Score Range with Scores
    ZRANGEWITHSCORES: SortedSetCommand;// Return a range of members in a sorted set, by index, with scores ordered from low to high
    ZREVRANGEWITHSCORES: SortedSetCommand;// Return a range of members in a sorted set, by index, with scores ordered from high to low
    
    // Score Range Removal
    ZREMRANGEBYRANK: SortedSetCommand; // Remove all members in a sorted set within the given indexes
    ZREMRANGEBYSCORE: SortedSetCommand;// Remove all members in a sorted set within the given scores
    ZREMRANGEBYLEX: SortedSetCommand;  // Remove all members in a sorted set between the given lexicographical range
    
    // Score Increment/Decrement
    ZINCRBY: SortedSetCommand;         // Increment the score of a member in a sorted set
    
    // Score Rank Operations
    ZRANK: SortedSetCommand;           // Determine the index of a member in a sorted set
    ZREVRANK: SortedSetCommand;        // Determine the index of a member in a sorted set, with scores ordered from high to low
    
    // Score Intersection/Union
    ZINTERSTORE: SortedSetCommand;     // Intersect multiple sorted sets and store the resulting sorted set in a new key
    ZUNIONSTORE: SortedSetCommand;     // Add multiple sorted sets and store the resulting sorted set in a new key
    
    // Score Scan Operations
    ZSCAN: SortedSetCommand;           // Incrementally iterate sorted sets elements and associated scores
}

const commands: SortedSetCommands = {
    ZADD: (args: string[]) => Promise.resolve(),
    ZREM: (args: string[]) => Promise.resolve(),
    ZCARD: (args: string[]) => Promise.resolve(),
    ZSCORE: (args: string[]) => Promise.resolve(),
    ZRANGE: (args: string[]) => Promise.resolve(),
    ZRANGEBYSCORE: (args: string[]) => Promise.resolve(),
    ZREVRANGE: (args: string[]) => Promise.resolve(),
    ZREVRANGEBYSCORE: (args: string[]) => Promise.resolve(),
    ZCOUNT: (args: string[]) => Promise.resolve(),
    ZLEXCOUNT: (args: string[]) => Promise.resolve(),
    ZRANGEWITHSCORES: (args: string[]) => Promise.resolve(),
    ZREVRANGEWITHSCORES: (args: string[]) => Promise.resolve(),
    ZREMRANGEBYRANK: (args: string[]) => Promise.resolve(),
    ZREMRANGEBYSCORE: (args: string[]) => Promise.resolve(),
    ZREMRANGEBYLEX: (args: string[]) => Promise.resolve(),
    ZINCRBY: (args: string[]) => Promise.resolve(),
    ZRANK: (args: string[]) => Promise.resolve(),
    ZREVRANK: (args: string[]) => Promise.resolve(),
    ZINTERSTORE: (args: string[]) => Promise.resolve(),
    ZUNIONSTORE: (args: string[]) => Promise.resolve(),
    ZSCAN: (args: string[]) => Promise.resolve()
};

export default commands;