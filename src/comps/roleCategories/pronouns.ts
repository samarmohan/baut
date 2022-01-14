import { GuildMember } from "discord.js";
import { pronounsEmbed } from "../../util/embeds";
import Component from "../../structures/Component";
import { pronounSelectMenu } from "../../util/components";

export default new Component("pronouns", async (client, interaction) => {
  // Check if the type of user is a member
  if (!(interaction.member instanceof GuildMember)) {
    // Get the member
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
  }

  // Create pronoun select menu
  const selectMenu = pronounSelectMenu(interaction.member);

  // Send the pronouns embed
  await interaction.reply({
    embeds: [pronounsEmbed],
    components: [selectMenu],
    ephemeral: true,
  });
});
