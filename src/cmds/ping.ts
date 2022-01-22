import {
  MessageActionRow,
  MessageButton,
  CommandInteraction,
} from "discord.js";
import { config, Command } from "@mammot/core";

@config("ping", { description: "Ping the bot" })
export class PingCommand extends Command {
  public async run(interaction: CommandInteraction) {
    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Pong!")
        .setStyle("SECONDARY")
        .setCustomId("ping")
    );

    interaction.reply({ content: "Pong!", components: [button] });
  }
}
