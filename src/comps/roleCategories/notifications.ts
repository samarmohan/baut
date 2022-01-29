import { GuildMember } from 'discord.js';
import { notificationButtons } from '../../util/components';
import Component from '../../structures/Component';
import { notificationEmbed } from '../../util/embeds';

export default new Component(
	'notifications',
	false,
	async (client, interaction) => {
		// Check if the type of user is a member
		if (!(interaction.member instanceof GuildMember)) {
			// Get the member
			interaction.member = interaction.guild.members.cache.get(
				interaction.user.id
			);
		}

		// Send the experience embed
		await interaction.editReply({
			embeds: [notificationEmbed],
			components: [notificationButtons],
		});
	}
);
