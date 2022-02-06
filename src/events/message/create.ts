import { Message } from 'discord.js';
import { setUserEligible } from '../../functions/setUserEligible';
import { channels } from '../../guild';
import Event from '../../structures/Event';

export default new Event(
	{
		name: 'messageCreate',
	},
	async (mammot, message: Message) => {
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

		// aaryaman valentine builderbaut

		const aaryaman = mammot.client.users.cache.get('768075359651495956');
		if (
			message.author === aaryaman &&
			message.content.toLowerCase().replace(/\s+/g, '').includes('willyoubemyvalentine') ||
		) {
			await message.reply(
				"I'll be your valentine, Aaryaman! You are my one and only love. I am loyal to you and will forever be loyal to you. All these other b*tches got nothing against you cuz you my valentine. I love you Aaryaman!"
			);
		}
	}
);
