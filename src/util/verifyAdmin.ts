import { CacheType, CommandInteraction, GuildMember } from "discord.js";

/** Verify that the user is an administrator in the guild */

export function verifyAdmin(interaction: CommandInteraction<CacheType>) {
  if (!(interaction.member as GuildMember).permissions.has("ADMINISTRATOR")) {
    interaction.reply({
      content: "You must be an administrator to use this command.",
      ephemeral: true,
    });
    return false;
  }

  return true;
}
