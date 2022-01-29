import { GuildMember, MessageEmbed } from 'discord.js';
import { CommandInteraction } from 'discord.js';
import { config, Command } from '@mammot/core';

@config('introduction', {
	description: 'View the recommended template for your introduction',
})
export class IntroCommand extends Command {
	public async run(interaction: CommandInteraction) {
		const introChannel = '913701412578418718';
		const eligibleRole = '913766127451136002';

		// Check if the channel is the intro channel
		if (interaction.channel.id !== introChannel) {
			// Check if the user has already written an introduction
			const complete = (
				interaction.member as GuildMember
			).roles.cache.has(eligibleRole);

			// Direct users to the intro channel
			reply({
				content: complete
					? `You can view everyone's introductions in <#${introChannel}>`
					: `Please go to <#${introChannel}> to write your introduction.`,
				ephemeral: true,
			});

			return;
		}

		// Create the introduction embed
		const introEmbed = new MessageEmbed()
			.setColor('#535061')
			.setTitle('Your Introduction').setDescription(`
        In order to maintain consistency and include all necessary aspects of an intro, we recommend covering the following:
    
        **Basics**
        Mention your name, where you're located, and anything else you might want to add
    
        **What you're working on**
        List whatever you're building or creating at the moment
    
        **What you use**
        Mention the tools or technologies you work with on a daily basis
    
        **Hobbies**
        What you like to do in your free time
    
        **Where people can find you**
        Link your social media accounts
    
        **Final Remarks**
        Conclude your introduction with any final statements you might like to add.
     `);

		// Check if the user is an admin
		if (
			(interaction.member as GuildMember).permissions.has('ADMINISTRATOR')
		) {
			// Send the embed
			await interaction.channel.send({ embeds: [introEmbed] });
			await interaction.reply({
				content: 'Intro message posted!',
				ephemeral: true,
			});
		} else {
			// Send ephemeral embed
			await interaction.reply({
				embeds: [introEmbed],
				ephemeral: true,
			});
		}
	}
}
