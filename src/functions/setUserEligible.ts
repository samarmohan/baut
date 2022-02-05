import { GuildMember } from 'discord.js';
import { roles } from '../guild';

export async function setUserEligible(member: GuildMember) {
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
