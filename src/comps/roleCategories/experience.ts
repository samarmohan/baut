import { GuildMember, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import Component from '../../structures/Component';

export default new Component(
	'experience',
	async (client, interaction) => {
		// Check if the type of user is a member
		if (!(interaction.member instanceof GuildMember)) {
			// Get the member
			interaction.member = interaction.guild.members.cache.get(interaction.user.id);
		}

		// Descructure constants
		const { roles } = client.constants;

		// Create experience embed
		const experienceEmbed = new MessageEmbed()
			.setTitle('Choose your experience level')
			.setDescription('How much experience do you have in your current career(s)/hobby(s) (i.e Developer, Designer, Entrepreneur, Creator)?')
			.setColor('#535061')
			.setFooter('Single Select');

		// Create experience buttons
		const experienceButtons = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('1 - 2 years')
				.setCustomId('1-2')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setLabel('3 - 5 years')
				.setCustomId('3-5')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setLabel('6 - 8 years')
				.setCustomId('6-8')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setLabel('9+ years')
				.setCustomId('9+')
				.setStyle('PRIMARY'),
		);

		// Send the experience embed
		await interaction.reply({ embeds: [experienceEmbed], components: [experienceButtons], ephemeral: true });
	}
);
