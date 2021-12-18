import { GuildMember } from 'discord.js';
import { toggle_select } from '../../../util/editRoles';
import Component from '../../../structures/Component';

export default new Component(
	'announcement_ping',
	async (client, interaction) => {
		// Check for component type
		if (!interaction.isButton()) return;

		// Check if the type of user is a member
		if (!(interaction.member instanceof GuildMember)) {
			// Get the member
			interaction.member = interaction.guild.members.cache.get(interaction.user.id);
		}

		// Toggle the role
		const change = toggle_select(interaction.member, interaction.customId)

		// Send the confirmation message
		await interaction.reply({
			content: `${change ? 'Added' : 'Removed'} the **Announcement Ping** role.`,
			ephemeral: true,
		})

	}
);
