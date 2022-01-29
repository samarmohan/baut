import { GuildMember } from 'discord.js';
import { experienceButtons } from '../../util/components';
import { experienceEmbed } from '../../util/embeds';
import Component from '../../structures/Component';

export default new Component(
	'experience',
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
			embeds: [experienceEmbed],
			components: [experienceButtons],
		});
	}
);
