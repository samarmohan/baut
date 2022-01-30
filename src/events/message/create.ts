import { GuildMember } from 'discord.js';
import { channels, roles } from '../../guild';
import Event from '../../structures/Event';

export default new Event(
	{
		name: 'messageCreate',
	},
	async (client, message) => {
		// Ignore bots
		if (message.author.bot) return;

		// Introductions channel only
		if (message.channel.id === channels.intros) {
			try {
				setEligible(message.member);
			} catch (error) {
				console.error(error);
			}
		}

		// Handle user eligibility
		async function setEligible(member: GuildMember) {
			// Get the roles
			const notEligibleRole = member.guild.roles.cache.get(roles.not_eligible);
			const eligibleRole = member.guild.roles.cache.get(roles.eligible);

			// Check if the member is eligible already
			if (member.roles.cache.has(roles.eligible)) return;

			// Add the eligible role and remove the not eligible role
			await member.roles.remove(
				notEligibleRole,
				`[User Into] Removed Not Eligible from ${member.user.tag}`
			);
			await member.roles.add(
				eligibleRole,
				`[User Into] Added Eligible to ${member.user.tag}`
			);
		}
	}
);
