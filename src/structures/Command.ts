import { ApplicationCommandData, GuildApplicationCommandPermissionData } from 'discord.js';
import { CommandOptions, CommandFunction } from '../types';

export default class {
	public name: string;
	public data: ApplicationCommandData;
	public permissions: GuildApplicationCommandPermissionData[];

	constructor (
		private config: CommandOptions,
		public run: CommandFunction
	) {
		// Set the name
		this.name = this.config.name.toLowerCase();
		// Set the API data
		this.data = {
			name: this.name,
			description: this.config.description,
			defaultPermission: this.config.permissions ? false : true,
			options: this.config.options || null,
			type: this.config.type || 'CHAT_INPUT',
		};
		// Set the permissions
		this.permissions = this.config.permissions;
	}
}