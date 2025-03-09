class Config {
  private static instance: Config;
  private constructor() {}

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public getUsername(): string {
    return process.env.USERNAME!;
  }

  public getPassword(): string {
    return process.env.PASSWORD!;
  }

  public getDefaultPort(): number {
    return parseInt(process.env.DEFAULT_PORT!) || 6379;
  }

  public getBindAddress(): string {
    return process.env.BIND_ADDRESS! || "127.0.0.1";
  }

  public getMaxClients(): number {
    return parseInt(process.env.MAX_CLIENTS!) || 10000;
  }

  public getTimeout(): number {
    return parseInt(process.env.TIMEOUT!) || 0;
  }

  public getLogLevel(): string {
    return process.env.LOG_LEVEL! || "notice";
  }

  public getDatabases(): number {
    return parseInt(process.env.DATABASES!) || 16;
  }

  public getMaxMemory(): string {
    return process.env.MAX_MEMORY! || "0";
  }

  public getMaxMemoryPolicy(): string {
    return process.env.MAX_MEMORY_POLICY! || "noeviction";
  }
}

export default Config.getInstance();
