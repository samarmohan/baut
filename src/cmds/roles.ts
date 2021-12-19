import { GuildMember, MessageActionRow, MessageAttachment, MessageButton, MessageEmbed } from 'discord.js';
import { careerSelectMenu, experienceButtons, locationSelectMenu, notificationButtons, pronounSelectMenu } from '../util/components';
import { careerEmbed, experienceEmbed, locationEmbed, notificationEmbed, pronounsEmbed } from '../util/embeds';
import Command from '../structures/Command';

export default new Command({
	name: 'roles',
	description: 'Select your self-assigned roles',
}, async (client, interaction) => {
	// Descructure constants
	const { channels } = client.constants;

	// Check if the channel is the roles channel
	if (false && interaction.channel.id !== channels.roles) {
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
				new MessageButton()
					.setLabel('Experience')
					.setStyle('SECONDARY')
					.setEmoji('📊')
					.setCustomId('experience'),
				new MessageButton()
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

	// Invisible divider
	const divider = `_ _`;

	// Header image
	const headerImage = new MessageAttachment('https://media.discordapp.net/attachments/913709531442315324/916712730713534494/Roles_Poster.png');

	// Send career embed and select menu
	await interaction.channel.send({ files: [headerImage], embeds: [careerEmbed], components: [careerSelectMenu()] });

	// Send location embed and select menu
	await interaction.channel.send({ content: divider, embeds: [locationEmbed], components: [locationSelectMenu()] });

	// Send pronouns embed and select menu
	await interaction.channel.send({ content: divider, embeds: [pronounsEmbed], components: [pronounSelectMenu()] });

	// Send experience embed and buttons
	await interaction.channel.send({ content: divider, embeds: [experienceEmbed], components: [experienceButtons] });

	// Send notifications embed and buttons
	await interaction.channel.send({ content: divider, embeds: [notificationEmbed], components: [notificationButtons] });

	await interaction.reply({
		content: "Roles message posted!",
		ephemeral: true,
	})

});
