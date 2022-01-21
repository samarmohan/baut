import { Mammot } from "@mammot/core";
import { commands } from "./commands";
import { clientOptions } from "./config";
import { token } from "./constants";

export const mammot = Mammot.client({
  ...clientOptions,
});

mammot.addCommands(commands).login(token);
