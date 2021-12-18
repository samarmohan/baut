import { GuildMember, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import Command from '../structures/Command';

export default new Command({
	name: 'roles',
	description: 'Select your self-assigned roles',
}, async (client, interaction) => {
	// Descructure constants
	const { roles, channels } = client.constants;

	// Check if the channel is the roles channel
	if (interaction.channel.id !== channels.roles) {
		// Create category buttons
		const categoryButtons = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Career')
					.setStyle('SECONDARY')
					.setEmoji('💼')
					.setCustomId('careers'),
				new MessageButton()
					.setLabel('Location')
					.setStyle('SECONDARY')
					.setEmoji('🗺')
					.setCustomId('location'),
				new MessageButton()
					.setLabel('Pronouns')
					.setStyle('SECONDARY')
					.setEmoji('🗣')
					.setCustomId('pronouns'),
				// TODO: Add experience roles
				new MessageButton()
					.setDisabled(true)
					.setLabel('Experience')
					.setStyle('SECONDARY')
					.setEmoji('📊')
					.setCustomId('experience'),
				// TODO: Add notification roles
				new MessageButton()
					.setDisabled(true)
					.setLabel('Notifications')
					.setStyle('SECONDARY')
					.setEmoji('🔔')
					.setCustomId('notifications'),
			);

		// Send the category buttons
		await interaction.reply({
			content: 'Please select a category to view the avalible roles.',
			components: [categoryButtons],
			ephemeral: true,
		});

		return;
	}


	// Check if the type of user is a member
	if (!(interaction.member instanceof GuildMember)) {
		// Get the member
		interaction.member = interaction.guild.members.cache.get(interaction.user.id);
	}

	// Create careers embed
	const careersEmbed = new MessageEmbed()


});
