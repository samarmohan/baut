import { Inhibitor } from "@mammot/core";
import { CacheType, CommandInteraction, GuildMember } from "discord.js";

/** Check if the type of user is a member */
export function checkMember(): Inhibitor {
  return async (interaction) => {
    if (!(interaction.member instanceof GuildMember)) {
      // Get the member
      interaction.member = await interaction.guild.members.fetch(
        interaction.user.id
      );
    }
  };
}
