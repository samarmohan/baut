import { GuildMember } from 'discord.js';
import { roles } from '../guild';

export async function setRolesOnMemberJoin(member: GuildMember) {
	// Get the roles
	const memberRole = member.guild.roles.cache.get(roles.member);
	const notEligibleRole = member.guild.roles.cache.get(roles.not_eligible);

	await member.roles.add(
		memberRole,
		`[User Join] Added Member to ${member.user.tag}`
	);

	// Check if the member has the `not_eligible` role already
	if (member.roles.cache.has(roles.not_eligible)) return;

	// Add the not_eligible role
	await member.roles.add(
		notEligibleRole,
		`[User Join] Added Not Eligible to ${member.user.tag}`
	);
}
