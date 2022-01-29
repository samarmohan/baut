import { GuildMember } from 'discord.js';

/**
 * Allow the user to select multiple self-assigned roles
 * @param {GuildMember} member The member to select roles for
 * @param {string[]|object} available The available roles
 * @param {string[]} selected The selected roles
 */
export async function multi_select(
	member: GuildMember,
	available: string[] | object,
	selected: string[]
): Promise<void> {
	// Check for array or object
	if (Array.isArray(available)) {
		// Loop through the available roles array
		for (const role of available) {
			// Check if the role is selected
			if (member.roles.cache.has(role) && !selected.includes(role)) {
				// Remove the role
				await member.roles.remove(selected);
			} else if (
				!member.roles.cache.has(role) &&
				selected.includes(role)
			) {
				// Add the role
				await member.roles.add(selected);
			}
		}
	} else {
		// Loop through the available roles
		for (const [role, id] of Object.entries(available)) {
			// Check if the role is selected
			if (
				member.roles.cache.has(id) &&
				(!selected.includes(role) || !selected.includes(id))
			) {
				// Remove the role
				await member.roles.remove(id);
			} else if (
				!member.roles.cache.has(id) &&
				(selected.includes(role) || selected.includes(id))
			) {
				// Add the role
				await member.roles.add(id);
			}
		}
	}
}

/**
 * Allow the user to select a single self-assigned role from a list
 * @param {GuildMember} member The member to select roles for
 * @param {string[]|object} available The available roles
 * @param {string} selected The selected role
 */
export async function single_select(
	member: GuildMember,
	available: string[] | object,
	selected: string
): Promise<void> {
	// Check for array or object
	if (Array.isArray(available)) {
		// Loop through the available roles array
		for (const role of available) {
			// Check if the role is selected
			if (member.roles.cache.has(role) && role !== selected) {
				// Remove the role
				await member.roles.remove(selected);
			} else if (!member.roles.cache.has(selected) && role === selected) {
				// Add the role
				await member.roles.add(selected);
			}
		}
	} else {
		// Loop through the available roles
		for (const [role, id] of Object.entries(available)) {
			// Check if the role is selected
			if (
				member.roles.cache.has(id) &&
				(id !== selected || role !== selected)
			) {
				// Remove the role
				await member.roles.remove(id);
			} else if (
				!member.roles.cache.has(id) &&
				(id === selected || role === selected)
			) {
				// Add the role
				await member.roles.add(id);
			}
		}
	}
}

/**
 * Allow the user to toggle a single self-assigned role
 * @param member The member to toggle role of
 * @param selected The role to toggle
 * @returns
 */
export async function toggle_select(
	member: GuildMember,
	selected: string
): Promise<boolean> {
	// Check if the role is selected
	if (member.roles.cache.has(selected)) {
		// Remove the role
		await member.roles.remove(selected);
		return false;
	} else {
		// Add the role
		await member.roles.add(selected);
		return true;
	}
}
