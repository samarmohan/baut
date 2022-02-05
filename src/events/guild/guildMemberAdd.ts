import { GuildMember } from 'discord.js';
import Event from '../../structures/Event';
import { congratulatorWebhookClient } from '../../webhookClients';
import { thousandMemberSpecial } from '../../functions/thousandMemberSpecial';
import { sendUserWelcomeMessage } from '../../functions/sendUserWelcomeMessage';
import { setRolesOnMemberJoin } from '../../functions/setRolesOnMemberJoin';
import { memberAddLogging } from '../../functions/memberAddRemoveLogging';

export default new Event(
	{
		name: 'guildMemberAdd',
	},
	async (_, member: GuildMember) => {
		const guild = member.guild;
		console.log(`[User Add] ${member.user.tag}`);

		// test message
		congratulatorWebhookClient.send({ content: 'this is a test' });

		// Ignore bots
		if (member.user.bot) return;

		try {
			await thousandMemberSpecial(member, guild);
			await sendUserWelcomeMessage(member);
			await setRolesOnMemberJoin(member);
			await memberAddLogging(member);
		} catch (error) {
			console.log(error);
		}
	}
);
