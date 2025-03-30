import { createServer, Server } from "net";
import { deserialiser} from "../parser/commandParser";
import { Logger } from "../logger";

const logger = new Logger("Server");

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
    socket.on("data", (data: any) => {
      const bufferStream = new TextDecoder().decode(data);
      const command = deserialiser(bufferStream);
      logger.info(`Command received: ${command}`);
    });
    socket.on("end", () => {
      logger.info("Client disconnected");
    });
  }
}

export default TCPServer.getInstance();
