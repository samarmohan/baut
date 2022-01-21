import { GuildMember } from "discord.js";
import { single_select } from "../../../util/editRoles.js";
import Component from "../../../structures/Component.js";

export default new Component("6-8", async (client, interaction) => {
  // Check for component type
  if (!interaction.isButton()) return;

  // Check if the type of user is a member
  if (!(interaction.member instanceof GuildMember)) {
    // Get the member
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
  }

  // Descructure constants
  const { roles } = client.constants;

  // Check if the user already has the role
  if (interaction.member.roles.cache.has(roles.experience["3-5"])) {
    // Send the "already has role" message
    await interaction.reply({
      content: "Your experience is already set to **6 - 8 years**.",
      ephemeral: true,
    });

    return;
  }

  // Update the roles
  single_select(interaction.member, roles.experience, interaction.customId);

  // Send the confirmation message
  await interaction.reply({
    content: "Set your experience to **6 - 8 years**.",
    ephemeral: true,
  });
});
