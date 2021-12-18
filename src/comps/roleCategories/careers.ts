import { GuildMember, MessageActionRow, MessageEmbed, MessageSelectMenu } from 'discord.js';
import Component from '../../structures/Component';

export default new Component(
	'careers',
	async (client, interaction) => {
		// Check if the type of user is a member
		if (!(interaction.member instanceof GuildMember)) {
			// Get the member
			interaction.member = interaction.guild.members.cache.get(interaction.user.id);
		}

		// Descructure constants
		const { roles } = client.constants;

		// Create careers embed
		const careersEmbed = new MessageEmbed()
			.setTitle('What do you do?')
			.setDescription('Choose what best defines your career.')
			.setColor('#535061')
			.setFooter('Multi Select');

		// Create career select menu
		const careerSelectMenu = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.addOptions([
					{
						label: 'Developer',
						value: '913789663767040001', // If in config using array, use id of role for value
						emoji: '💻',
						default: interaction.member.roles.cache.has('913789663767040001'),
					},
					{
						label: 'Designer',
						value: '913791003633266729',
						emoji: '🎨',
						default: interaction.member.roles.cache.has('913791003633266729'),
					},
					{
						label: 'Entrepreneur',
						value: '913791069378990100',
						emoji: '💼',
						default: interaction.member.roles.cache.has('913791069378990100'),
					},
					{
						label: 'Creator',
						value: '913791371163336744',
						emoji: '🖌',
						default: interaction.member.roles.cache.has('913791371163336744'),
					},
				])
				.setCustomId('career')
				.setMinValues(0)
				.setMaxValues(4)
		);

		// Send the careers embed
		await interaction.reply({ embeds: [careersEmbed], components: [careerSelectMenu], ephemeral: true });
	}
);