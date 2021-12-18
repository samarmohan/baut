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

		// Descructure constants
		const { roles } = client.constants;

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
						default: interaction.member.roles.cache.has(roles.location.north_america),
					},
					{
						label: 'South America',
						value: 'south_america',
						emoji: '🇧🇷',
						default: interaction.member.roles.cache.has(roles.location.south_america),
					},
					{
						label: 'Europe',
						value: 'europe',
						emoji: '🇪🇺',
						default: interaction.member.roles.cache.has(roles.location.europe),
					},
					{
						label: 'Asia',
						value: 'asia',
						emoji: '🇮🇳',
						default: interaction.member.roles.cache.has(roles.location.asia),
					},
					{
						label: 'Africa',
						value: 'africa',
						emoji: '🇿🇦',
						default: interaction.member.roles.cache.has(roles.location.africa),
					},
					{
						label: 'Oceania',
						value: 'oceania',
						emoji: '🇦🇺',
						default: interaction.member.roles.cache.has(roles.location.oceania),
					},
					{
						label: 'Antartica',
						value: 'antartica',
						emoji: '🇦🇶',
						default: interaction.member.roles.cache.has(roles.location.antartica),
					}
				])
				.setCustomId('locationSelect')
				.setPlaceholder('Select a continent')
		);

		// Send the careers embed
		await interaction.reply({ embeds: [locationEmbed], components: [locationSelectMenu], ephemeral: true });
	}
);