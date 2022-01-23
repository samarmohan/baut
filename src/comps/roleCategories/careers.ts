import { GuildMember } from "discord.js";
import { careerSelectMenu } from "../../util/components";
import Component from "../../structures/Component";
import { careerEmbed } from "../../util/embeds";

export default new Component("careers", async (client, interaction) => {
  // Check if the type of user is a member
  if (!(interaction.member instanceof GuildMember)) {
    // Get the member
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
  }

  // Create career select menu
  const selectMenu = careerSelectMenu(interaction.member);

  // Send the careers embed
  await interaction.reply({
    embeds: [careerEmbed],
    components: [selectMenu],
    ephemeral: true,
  });
});
