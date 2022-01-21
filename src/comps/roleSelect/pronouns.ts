import { GuildMember } from "discord.js";
import { multi_select } from "../../util/editRoles.js";
import Component from "../../structures/Component.js";

export default new Component("pronounSelect", async (client, interaction) => {
  // Check for component type
  if (!interaction.isSelectMenu()) return;

  // Check if the type of user is a member
  if (!(interaction.member instanceof GuildMember)) {
    // Get the member
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
  }

  // Get the select menu options
  const options = interaction.values;

  // Descructure constants
  const { roles } = client.constants;

  // Update the roles
  multi_select(interaction.member, roles.career, options);

  // Send the confirmation message
  await interaction.reply({
    content: "Your pronouns have been updated.",
    ephemeral: true,
  });
});
