import 'dotenv/config';
import { Mammot } from '@mammot/core';
import {
	RulesCommand,
	PingCommand,
	IntroCommand,
	RolesCommand,
	Before1kmembers,
} from './cmds';
import { clientOptions } from './config';
import { token } from './constants';
import { loadComponents, loadEvents } from './util/fileLoader';

import { Collection } from 'discord.js';

export const mammot = Mammot.client({
	...clientOptions,
});

async function boot() {
	// @ts-expect-error yeah
	mammot.components = new Collection();
	await loadComponents(mammot, 'src/comps');
	mammot.addCommands([
		RulesCommand,
		PingCommand,
		IntroCommand,
		RolesCommand,
		Before1kmembers,
	]);
	await loadEvents(mammot, 'src/events');
	mammot.name
}

boot().then(() => mammot.login(token));
