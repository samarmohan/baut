import { PathLike } from 'fs';
import { readdir } from 'fs/promises';
import { resolve, basename } from 'path';

import Client from '../structures/Client';
import Command from '../structures/Command';
import Component from '../structures/Component';

/**
 * Recursively load files
 * @param {string} dir The root dir
 */
export default async function* fileloader (dir: string) {
	const files = await readdir(dir, { withFileTypes: true });
	
	for (const file of files) {
		const res: PathLike = resolve(dir, file.name);

		if (file.isDirectory()) {
			yield * fileloader(res);
		} else {
			yield res;
		}
	}
}

/**
 * Load events from the events dir
 * @param {Client} client The Discord client
 * @param {string} dir The dir containing the event files
 */
export async function loadEvents (client: Client, dir: string) {
	const files = fileloader(dir);

	for await (const file of files) {
		
		const event = await import(file).then(m => m.default || m);
  
		if (event.once) {
			client.once(event.name, (...args) => event.execute(client, ...args));
		} else {
			client.on(event.name, (...args) => event.execute(client, ...args));
		}

		console.log(`Loaded event ${event.name}`);
	}
}

/**
 * Load all of the commands recursively
 * @param {Client} client The Discord client
 * @param {string} dir The root commands directory
 */
export async function loadCommands (client: Client, dir: string): Promise<void> {
	const files = fileloader(dir);

	for await (const file of files) {

		const command: Command = await import(file).then(m => m.default || m);
		if (!(command instanceof Command)) continue;
  
		if (!command.name) {
			console.error(`Failed to load command ${basename(file)} as it has no name`);
			continue;
		}
  
		client.commands.set(command.name, command);
		console.log(`Loaded command ${command.name}`);
	}
}

/**
 * Load all of the components recursively
 * @param {Client} client The Discord client
 * @param {string} dir The root components directory
 */
export async function loadComponents (client: Client, dir: string): Promise<void> {
	const files = fileloader(dir);

	for await (const file of files) {

		const component = await import(file).then(m => m.default || m);
		if (!(component instanceof Component)) continue;
  
		if (!component.id) {
			console.error(`Failed to load component ${basename(file)} as it has no id`);
			continue;
		}

		client.components.set(component.id, component);
		console.log(`Loaded component ${component.id}`);
	}
}
