type LogLevel = "log" | "debug" | "info" | "warn" | "error";

interface LogOptions {
    context?: string;
    error?: Error;
    [key: string]: any;
}

export class Logger {
    private namespace: string;
    private static debugNamespaces: string[] = (process.env.DEBUG || "*").split(",").map(ns => ns.trim());

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    private logger(mode: LogLevel, message: string, options: LogOptions = {}): void {
        const { context = '', error, ...extra } = options;
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} [${this.namespace}] ${context ? `[${context}] ` : ''}${mode}: ${message}`;

        // Error logs are always printed
        if (mode === 'error') {
            console.error(logMessage, error ? { error: error.stack || error.message, ...extra } : extra);
            return;
        }

        // Check if the namespace is enabled for logging
        if (Logger.debugNamespaces.includes("*") || Logger.debugNamespaces.includes(this.namespace)) {
            console[mode](logMessage, Object.keys(extra).length > 0 ? extra : '');
        }
    }

    public debug(message: string, options?: LogOptions): void {
        this.logger("debug", message, options);
    }

    public log(message: string, options?: LogOptions): void {
        this.logger("log", message, options);
    }

    public info(message: string, options?: LogOptions): void {
        this.logger("info", message, options);
    }

    public warn(message: string, options?: LogOptions): void {
        this.logger("warn", message, options);
    }

    public error(message: string, options?: LogOptions): void {
        this.logger("error", message, options);
    }

    public time(label: string): void {
        console.time(`${this.namespace}:${label}`);
    }

    public timeEnd(label: string): void {
        console.timeEnd(`${this.namespace}:${label}`);
    }
}
