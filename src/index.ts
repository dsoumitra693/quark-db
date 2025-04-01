import config from "./config";
import { Logger } from "./logger";
import server from "./networking/server";

const logger = new Logger("Main");

function main() {
  logger.info("Starting server...");
  server.start(config.getDefaultPort());
}
/**
 * Entry point of the application.
 * Initializes and starts the server using the default port from config.
 */

main();
