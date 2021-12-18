import { GuildMember, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import Component from '../../structures/Component';

export default new Component(
	'notifications',
	async (client, interaction) => {
		// Check if the type of user is a member
		if (!(interaction.member instanceof GuildMember)) {
			// Get the member
			interaction.member = interaction.guild.members.cache.get(interaction.user.id);
		}

		// Create notifications embed
		const notificationsEmbed = new MessageEmbed()
			.setTitle('Select Ping Roles')
			.setDescription('Choose which of the following you would like to be pinged for')
			.setColor('#535061')
			.setFooter('Multi Select');

		// Create notification buttons
		const notificationButtons = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('Server Inactivity Ping')
				.setCustomId('inactivity_ping')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setLabel('Assistance Ping')
				.setCustomId('assistance_ping')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setLabel('Poll Ping')
				.setCustomId('poll_ping')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setLabel('Announcement Ping')
				.setCustomId('announcement_ping')
				.setStyle('PRIMARY'),
		);

		// Send the experience embed
		await interaction.reply({ embeds: [notificationsEmbed], components: [notificationButtons], ephemeral: true });
	}
);
