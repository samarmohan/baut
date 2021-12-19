import { Client, ClientOptions, Collection } from 'discord.js';
import Command from './Command';
import { constants } from '../config';
import { loadEvents, loadCommands, loadComponents } from '../util/fileloader';
import Component from './Component';

export default class extends Client {
	// The commands collection
	commands: Collection<string, Command> = new Collection();
	// The components collection
	components: Collection<string, Component> = new Collection();
	// Access constants on the client
	public constants = constants;

	constructor (options: ClientOptions) {
		// Call the parent constructor
		super(options);

		// Load the events, commands and components
		loadEvents(this, 'src/events');
		loadCommands(this, 'src/cmds');
		loadComponents(this, 'src/comps');

		// Register commands with the discord API
		this.once('ready', () => {
			// Put command data in an array
			const commands = this.commands.map((c) => c.data);

			// Set the commands
			this.guilds.cache.get(constants.guild).commands.set(commands).then(cmds => {
				cmds.forEach(cmd => {
					// Set the command's permission
					const permissions = this.commands.get(cmd.name).permissions;
					permissions && cmd.permissions.set({ permissions });
				});
			});
		});
	}
}