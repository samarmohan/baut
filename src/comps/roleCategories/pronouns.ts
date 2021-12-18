import { GuildMember, MessageActionRow, MessageEmbed, MessageSelectMenu } from 'discord.js';
import Component from '../../structures/Component';

export default new Component(
	'pronouns',
	async (client, interaction) => {
		// Check if the type of user is a member
		if (!(interaction.member instanceof GuildMember)) {
			// Get the member
			interaction.member = interaction.guild.members.cache.get(interaction.user.id);
		}

		// Descructure constants
		const { roles } = client.constants;

		// Create pronouns embed
		const pronounsEmbed = new MessageEmbed()
			.setTitle('What are your pronouns?')
			.setDescription("Select your pronouns (Skip if you'd rather not disclose).")
			.setColor('#535061')
			.setFooter('Single / Multi Select');

		// Create pronoun select menu
		const pronounSelectMenu = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.addOptions([
					{
						label: 'He/Him',
						value: 'he', // If in config using array, use id of role for value
						emoji: '♂',
						default: interaction.member.roles.cache.has(roles.pronouns.he),
					},
					{
						label: 'She/Her',
						value: 'she',
						emoji: '♀',
						default: interaction.member.roles.cache.has(roles.pronouns.she),
					},
					{
						label: 'They/Them',
						value: 'they',
						emoji: '⚧',
						default: interaction.member.roles.cache.has(roles.pronouns.they),
					},
					// {
					// 	label: 'Ask me!',
					// 	value: '',
					// 	emoji: '❓',
					// },
				])
				.setCustomId('pronounSelect')
				.setMinValues(0)
				.setMaxValues(3)
		);

		// Send the pronouns embed
		await interaction.reply({ embeds: [pronounsEmbed], components: [pronounSelectMenu], ephemeral: true });
	}
);