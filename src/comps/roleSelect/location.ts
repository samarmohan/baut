import { GuildMember } from "discord.js";
import { single_select } from "../../util/editRoles";
import Component from "../../structures/Component";

export default new Component("locationSelect", async (client, interaction) => {
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
  single_select(interaction.member, roles.location, options[0]);

  // Send the confirmation message
  await interaction.reply({
    content: "Your location has been updated.",
    ephemeral: true,
  });
});
