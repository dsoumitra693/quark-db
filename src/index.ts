import config from "../config";
import server from "./networking/server";

function main() {
  server.start(config.getDefaultPort());
}

main();
