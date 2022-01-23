import { Mammot } from "@mammot/core";
import { RulesCommand, PingCommand, IntroCommand, RolesCommand } from "./cmds";
import { clientOptions } from "./config";
import { token } from "./constants";
import { loadEvents } from "./util/fileLoader";
import * as dotenv from "dotenv";

dotenv.config();

export const mammot = Mammot.client({
  ...clientOptions,
});

async function boot() {
  mammot.addCommands([RulesCommand, PingCommand, IntroCommand, RolesCommand]);
  await loadEvents(mammot, "src/events");
}

boot().then(() => mammot.login(token));
