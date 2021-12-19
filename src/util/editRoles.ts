import { GuildMember } from 'discord.js';

/**
 * Allow the user to select multiple self-assigned roles
 * @param {GuildMember} member The member to select roles for
 * @param {string[]|object} avalible The avalible roles
 * @param {string[]} selected The selected roles
 */
export function multi_select(member: GuildMember, avalible: string[] | object, selected: string[]): void {
	// Check for array or object
	if (Array.isArray(avalible)) {
		// Loop through the avalible roles array
		for (const role of avalible) {
			// Check if the role is selected
			if (member.roles.cache.has(role) && !selected.includes(role)) {
				// Remove the role
				member.roles.remove(selected);
			} else if (!member.roles.cache.has(role) && selected.includes(role)) {
				// Add the role
				member.roles.add(selected);
			}
		}
	} else {
		// Loop through the avalible roles
		for (const [role, id] of Object.entries(avalible)) {
			// Check if the role is selected
			if (member.roles.cache.has(id) && (!selected.includes(role) || !selected.includes(id))) {
				// Remove the role
				member.roles.remove(id);
			} else if (!member.roles.cache.has(id) && (selected.includes(role) || selected.includes(id))) {
				// Add the role
				member.roles.add(id);
			}
		}
	}
}

/**
 * Allow the user to select a single self-assigned role from a list
 * @param {GuildMember} member The member to select roles for
 * @param {string[]|object} avalible The avalible roles
 * @param {string} selected The selected role
 */
export function single_select(member: GuildMember, avalible: string[] | object, selected: string): void {
	// Check for array or object
	if (Array.isArray(avalible)) {
		// Loop through the avalible roles array
		for (const role of avalible) {
			// Check if the role is selected
			if (member.roles.cache.has(role) && role !== selected) {
				// Remove the role
				member.roles.remove(selected);
			} else if (!member.roles.cache.has(selected) && role === selected) {
				// Add the role
				member.roles.add(selected);
			}
		}
	} else {
		// Loop through the avalible roles
		for (const [role, id] of Object.entries(avalible)) {
			// Check if the role is selected
			if (member.roles.cache.has(id) && (id !== selected || role !== selected)) {
				// Remove the role
				member.roles.remove(id);
			} else if (!member.roles.cache.has(selected) && (id === selected || role === selected)) {
				// Add the role
				member.roles.add(id);
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
export function toggle_select(member: GuildMember, selected: string): boolean {
	// Check if the role is selected
	if (member.roles.cache.has(selected)) {
		// Remove the role
		member.roles.remove(selected);
		return false;
	} else {
		// Add the role
		member.roles.add(selected);
		return true;
	}
}
