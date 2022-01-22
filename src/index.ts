import { Mammot } from "@mammot/core";
import { RulesCommand, PingCommand, IntroCommand, RolesCommand } from "./cmds";
import { clientOptions } from "./config";
import { token } from "./constants";

export const mammot = Mammot.client({
  ...clientOptions,
});

mammot
  .addCommands([RulesCommand, PingCommand, IntroCommand, RolesCommand])
  .login(token);
