import { GuildMember } from 'discord.js';
import { single_select } from '../../../util/editRoles';
import Component from '../../../structures/Component';
import { roles } from '../../../guild';

export default new Component('1-2', false, async (client, interaction) => {
	// Check for component type
	if (!interaction.isButton()) return;

	// Check if the type of user is a member
	if (!(interaction.member instanceof GuildMember)) {
		// Get the member
		interaction.member = interaction.guild.members.cache.get(
			interaction.user.id
		);
	}

	// Check if the user already has the role
	if (interaction.member.roles.cache.has(roles.experience['1-2'])) {
		// Send the "already has role" message
		await interaction.editReply({
			content: 'Your experience is already set to **1 - 2 years**.',
		});

		return;
	}

	// Update the roles
	await single_select(
		interaction.member,
		roles.experience,
		interaction.customId
	).catch(console.error);

	// Send the confirmation message
	await interaction.editReply({
		content: 'Set your experience to **1 -2  years**.',
	});
});
