import { GuildMember } from "discord.js";
import { experienceButtons } from "../../util/components.js";
import { experienceEmbed } from "../../util/embeds.js";
import Component from "../../structures/Component.js";

export default new Component("experience", async (client, interaction) => {
  // Check if the type of user is a member
  if (!(interaction.member instanceof GuildMember)) {
    // Get the member
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
  }

  // Send the experience embed
  await interaction.reply({
    embeds: [experienceEmbed],
    components: [experienceButtons],
    ephemeral: true,
  });
});
