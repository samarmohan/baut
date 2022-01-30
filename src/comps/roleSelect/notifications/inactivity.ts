import { GuildMember } from 'discord.js';
import { toggle_select } from '../../../util/editRoles';
import Component from '../../../structures/Component';
import { roles } from '../../../guild';

export default new Component(
	'inactivity_ping',
	false,
	async (client, interaction) => {
		// Check for component type
		if (!interaction.isButton()) return;

		// Check if the type of user is a member
		if (!(interaction.member instanceof GuildMember)) {
			// Get the member
			interaction.member = interaction.guild.members.cache.get(
				interaction.user.id
			);
		}

		// Toggle the role
		const change = await toggle_select(
			interaction.member,
			roles.notifications['inactivity_ping']
		).catch((e) => {
			console.error(e);
			return true;
		});

		// Send the confirmation message
		await interaction.editReply({
			content: `${
				change ? 'Added' : 'Removed'
			} the **Server Inactivity Ping** role.`,
		});
	}
);
