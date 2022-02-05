import { Guild, GuildMember, MessageEmbed } from 'discord.js';
import { roles } from '../guild';
import { getRole } from '../util/getRole';
import { congratulatorWebhookClient } from '../webhookClients';

export async function thousandMemberSpecial(member: GuildMember, guild: Guild) {
	const thousandthMemberRole = getRole(roles.onethousandthmember, guild);

	if (
		member.guild.memberCount === 1000 &&
		thousandthMemberRole.members.size === 0
	) {
		// add role
		await member.roles.add(thousandthMemberRole);

		// send message
		const thousandthMemberEmbed = new MessageEmbed()
			.setTitle(
				`Congratulations ${member.user.username}! You're our 1000th member!`
			)
			.setDescription(
				`Welcome to Buildergroop! Enjoy your stay here, as well as a very special thousandth member role.`
			)
			.setFooter(
				'Tell all your friends about buildergroop and make them jelly of your exclusive role B)'
			)
			.setThumbnail(member.user.displayAvatarURL());

		congratulatorWebhookClient.send({
			content: `<@!${member.user.id}>`,
			embeds: [thousandthMemberEmbed],
		});
	}
}
