import { Guild } from 'discord.js';

export function getRole(roleId: string, guild: Guild) {
	return guild.roles.cache.get(roleId);
}
