import { GuildMember } from 'discord.js';
import { locationSelectMenu } from '../../util/components';
import { locationEmbed } from '../../util/embeds';
import Component from '../../structures/Component';

export default new Component(
	'location',
	async (client, interaction) => {
		// Check if the type of user is a member
		if (!(interaction.member instanceof GuildMember)) {
			// Get the member
			interaction.member = interaction.guild.members.cache.get(interaction.user.id);
		}

		// Create location select menu
		const selectMenu = locationSelectMenu(interaction.member);

		// Send the careers embed
		await interaction.reply({ embeds: [locationEmbed], components: [selectMenu], ephemeral: true });
	}
);