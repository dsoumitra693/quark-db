import config from "./config";
import server from "./networking/server";

function main() {
  server.start(config.getDefaultPort());
}
/**
 * Entry point of the application.
 * Initializes and starts the server using the default port from config.
 */

main();
