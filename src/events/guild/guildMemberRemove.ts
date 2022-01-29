import { WebhookClient, MessageEmbed } from 'discord.js';
import Event from '../../structures/Event';

export default new Event(
	{
		name: 'guildMemberRemove',
	},
	async (client, member) => {
		console.log(`[User Leave] ${member.user.tag}`);
		const webhookClient = new WebhookClient({
			url: process.env.MEMBERS_WEBHOOK,
		});
		const embed = new MessageEmbed()
			.setTitle('Member Left')
			.setDescription(
				`**${member.user.tag}** left buildergroop! :pensive:\n\nTheir account ID is ***${member.user.id}***.`
			);

		webhookClient.send({
			content: 'User Removed',
			username: 'Member Logs',
			avatarURL: 'https://cdn.discordapp.com/icons/913668807015407646/a_f8271ba713d72cb11a66b4601b1b044e.webp',
			embeds: [embed],
		});
	}
);
