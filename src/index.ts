import Client from "./structures/Client.js";
import { token, clientOptions } from "./config.js";

new Client(clientOptions).login(token).catch(console.error);
