import { createServer, Server } from "net";
import { deserialiser} from "../parser/commandParser";
  import CommandExecutor from "../core/commands";
import serializer from "../serializers/respSerializer";
import { Logger } from "../utils/logger";

const logger = new Logger("Server");
const commandExecutor = CommandExecutor.getInstance();

class TCPServer {
  private static instance: TCPServer;
  private server: Server;
  private constructor() {
    this.server = createServer(this.connectionListener);
  }

  public static getInstance(): TCPServer {
    if (!TCPServer.instance) {
      TCPServer.instance = new TCPServer();
    }
    return TCPServer.instance;
  }

  public start(port: number): void {
    this.server.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  }

  private connectionListener(socket: any): void {
    socket.on("data", async (data: any) => {
      const bufferStream = new TextDecoder().decode(data);
      const command = deserialiser(bufferStream);
      try {
        const result = await commandExecutor.execute(command);
        socket.write(serializer.serialise(result))
      } catch (error) {
        socket.write(serializer.serialise(error as Error))
      }
    });
    socket.on("end", () => {
      logger.info("Client disconnected");
    });
  }
}

export default TCPServer.getInstance();
