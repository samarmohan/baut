import { Mammot } from "@mammot/core";
import { RulesCommand, PingCommand, IntroCommand, RolesCommand } from "./cmds";
import { clientOptions } from "./config";
import 'dotenv/config';

export const mammot = Mammot.client({
  ...clientOptions,
});

mammot
  .addCommands([RulesCommand, PingCommand, IntroCommand, RolesCommand])
  .login(process.env.DISCORD_TOKEN);
