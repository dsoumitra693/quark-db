import config from "./config";
import server from "./networking/server";
import { Logger } from "./utils/logger";

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
