import { CacheType, CommandInteraction, GuildMember } from "discord.js";

/** Check if the type of user is a member */

export async function checkMember(interaction: CommandInteraction<CacheType>) {
  if (!(interaction.member instanceof GuildMember)) {
    // Get the member
    interaction.member = await interaction.guild.members.fetch(
      interaction.user.id
    );
  }
}
