import { GuildMember, MessageEmbed } from 'discord.js';
import { memberWebhookClient } from '../webhookClients';

export function memberAddLogging(member: GuildMember) {
	const embed = new MessageEmbed()
		.setTitle('Member Joined')
		.setDescription(
			`**${member.user.tag}** [<@!${
				member.user.id
			}>] joined buildergroop!\n\nTheir account was created on ${member.user.createdAt.toDateString()}.\n\nTheir account ID is ***${
				member.user.id
			}.***`
		);

	memberWebhookClient.send({
		username: 'Member Logs',
		avatarURL:
			'https://cdn.discordapp.com/icons/913668807015407646/a_f8271ba713d72cb11a66b4601b1b044e.webp',
		embeds: [embed],
	});
}

export function memberRemoveLogging(member: GuildMember) {
	const embed = new MessageEmbed()
		.setTitle('Member Left')
		.setDescription(
			`**${member.user.tag}** left buildergroop. \n\nTheir account ID is ***${member.user.id}***.`
		);

	memberWebhookClient.send({
		username: 'Member Logs',
		avatarURL:
			'https://cdn.discordapp.com/icons/913668807015407646/a_f8271ba713d72cb11a66b4601b1b044e.webp',
		embeds: [embed],
	});
}
