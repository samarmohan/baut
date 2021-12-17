import { GuildMember, MessageActionRow, MessageEmbed, MessageSelectMenu } from 'discord.js';
import Component from '../../structures/Component';

export default new Component(
	'location',
	async (client, interaction) => {
		// Check if the type of user is a member
		if (!(interaction.member instanceof GuildMember)) {
			// Get the member
			interaction.member = interaction.guild.members.cache.get(interaction.user.id);
		}

		// Create location embed
		const locationEmbed = new MessageEmbed()
			.setTitle('Where are you located?')
			.setDescription('Choose which continent you live in.')
			.setColor('#535061')
			.setFooter('Single Select');

		// Create location select menu
		const locationSelectMenu = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.addOptions([
					{
						label: 'North America',
						value: 'north_america', // If in config using object, use id of role or key name for value
						emoji: '🇺🇸',
					},
					{
						label: 'South America',
						value: 'south_america',
						emoji: '🇧🇷',
					},
					{
						label: 'Europe',
						value: 'europe',
						emoji: '🇪🇺',
					},
					{
						label: 'Asia',
						value: 'asia',
						emoji: '🇮🇳',
					},
					{
						label: 'Africa',
						value: 'africa',
						emoji: '🇿🇦',
					},
					{
						label: 'Oceania',
						value: 'oceania',
						emoji: '🇦🇺',
					},
					{
						label: 'Antarctica',
						value: 'antarctica',
						emoji: '🇦🇶',
					}
				])
				.setCustomId('locationSelect')
		);

		// Send the careers embed
		await interaction.reply({ embeds: [locationEmbed], components: [locationSelectMenu], ephemeral: true });
	}
);


/*
south_america: '914062822491693076',
europe: '914062876480794634',
oceania: '914062934479605760',
asia: '914062611618889798',
africa: '914062909162803260',
antartica: '914063088960036915',
*/