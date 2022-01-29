import {
	MessageActionRow,
	MessageButton,
	CommandInteraction,
	MessageAttachment,
} from 'discord.js';
import { config, Command } from '@mammot/core';
import { channels } from '../guild';

@config('roles', {
	description: 'Select your self-assigned roles (Admin Only Command)',
})
export class RolesCommand extends Command {
	public async run(interaction: CommandInteraction) {
		if (interaction.channel.id !== channels.roles) {
			// Direct users to the rules channel
			return await interaction.reply({
				content: `Please go to <#${channels.roles}> to send the server roles.`,
				ephemeral: true,
			});
		}

		// Invisible divider
		const divider = `
__
__`;

		// Header image
		const headerImage = new MessageAttachment(
			'https://cdn.discordapp.com/attachments/864826842707132446/931217059432525894/Roles_Poster.png'
		);

		// Create category buttons
		const categoryButtons = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('Career')
				.setStyle('PRIMARY')
				.setEmoji('🧑‍💼')
				.setCustomId('careers'),
			new MessageButton()
				.setLabel('Location')
				.setStyle('PRIMARY')
				.setEmoji('✈️')
				.setCustomId('location'),
			new MessageButton()
				.setLabel('Pronouns')
				.setStyle('PRIMARY')
				.setEmoji('💁')
				.setCustomId('pronouns'),
			new MessageButton()
				.setLabel('Experience')
				.setStyle('PRIMARY')
				.setEmoji('📊')
				.setCustomId('experience'),
			new MessageButton()
				.setLabel('Notifications')
				.setStyle('PRIMARY')
				.setEmoji('🔔')
				.setCustomId('notifications')
		);

		// Send career embed and select menu
		await interaction.channel.send({
			files: [headerImage],
		});

<<<<<<< HEAD
=======
		// Check button if was clicked if clicked return text

		const collector = interaction.channel.createMessageComponentCollector({
			time: 15000,
		});
		collector.on('collect', async (i) => {
			if (i.customId === 'notifications') {
				await i.deferUpdate();
				await i.followUp({
					content: 'notifications',
					components: [],
					ephemeral: true,
				});
			} else if (i.customId === 'location') {
				await i.deferUpdate();
				await i.followUp({
					content: 'location',
					components: [],
					ephemeral: true,
				});
			} else if (i.customId === 'pronouns') {
				await i.deferUpdate();
				await i.followUp({
					content: 'pronouns',
					components: [],
					ephemeral: true,
				});
			} else if (i.customId === 'experience') {
				await i.deferUpdate();
				await i.followUp({
					content: 'experience',
					components: [],
					ephemeral: true,
				});
			} else if (i.customId === 'careers') {
				await i.deferUpdate();
				await i.followUp({
					content: 'careers',
					components: [],
					ephemeral: true,
				});
			} else {
				return;
			}
		});

>>>>>>> 186d993 (feat: remove admin check)
		// send invisible divider
		await interaction.channel.send({
			content: divider,
		});

		// Send the category buttons
		await interaction.channel.send({
			content:
				'**Please select a category to view the available roles.** _ _',
			components: [categoryButtons],
		});

		await interaction.reply({
			content: 'Sent roles message',
			ephemeral: true,
		});
	}
}
