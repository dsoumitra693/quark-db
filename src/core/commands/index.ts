import { Logger } from "../../logger";
import hashCommands from "./hash";
import listCommands from "./list";
import setCommands from "./set";
import sortedSetCommands from "./sortedSet";
import stringCommands from "./string";
import basicCommands from "./basic";

const logger = new Logger("CommandExecutor");


export default class CommandExecutor {
    private static instance: CommandExecutor;
    private commandHandlers: Record<string, (args: string[]) => Promise<any>>;

    private constructor() {
        this.commandHandlers = {
            ...hashCommands,
            ...listCommands,
            ...setCommands,
            ...sortedSetCommands,
            ...stringCommands,
            ...basicCommands
        };
    }

    public static getInstance(): CommandExecutor {
        if (!CommandExecutor.instance) {
            CommandExecutor.instance = new CommandExecutor();
        }
        return CommandExecutor.instance;
    }

    public async execute(command: string[]): Promise<any> {
        const [commandName, ...args] = command;
        logger.log(`Executing command: ${commandName}`);
        const handler = this.commandHandlers[commandName];

        if (!handler) {
            throw new Error(`Unknown command: ${commandName}`);
        }

        try {
            return await handler(args);
        } catch (error) {
            throw error;
        }
    }
}
