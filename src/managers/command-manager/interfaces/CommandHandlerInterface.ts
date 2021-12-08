import * as Discord from "discord.js";

export interface CommandHandlerInterface {
  aliases: string[];
  description: string;

  execute(message: Discord.Message, args: string[]): Promise<void>;
}
