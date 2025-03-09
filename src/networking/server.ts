import { createServer, Server } from "net";

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
      console.log(`Server is running on port ${port}`);
    });
  }

  private connectionListener(socket: any): void {
    console.log("Client connected");
    socket.on("data", (data: any) => {
      console.log(data);
    });
    socket.on("end", () => {
      console.log("Client disconnected");
    });
  }
}

export default TCPServer.getInstance();
