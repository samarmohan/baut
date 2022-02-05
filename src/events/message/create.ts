import { GuildMember, Message } from 'discord.js';
import { setUserEligible } from '../../functions/setUserEligible';
import { channels, roles } from '../../guild';
import Event from '../../structures/Event';

export default new Event(
	{
		name: 'messageCreate',
	},
	async (_, message: Message) => {
		// Ignore bots
		if (message.author.bot) return;

		// Introductions channel only
		if (message.channel.id === channels.intros) {
			try {
				await setUserEligible(message.member);
			} catch (error) {
				console.error(error);
			}
		}
	}
);
