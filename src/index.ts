import { Mammot } from '@mammot/core';
import { RulesCommand, PingCommand, IntroCommand, RolesCommand } from './cmds';
import { clientOptions } from './config';
import { token } from './constants';
import { loadComponents, loadEvents } from './util/fileLoader';
import * as dotenv from 'dotenv';
import { Collection } from 'discord.js';

dotenv.config();

// @ts-expect-error bruh
export const mammot = Mammot.client({
	...clientOptions,
}) as Mammot;

async function boot() {
	mammot.components = new Collection();
	await loadComponents(mammot, 'src/comps');
	mammot.addCommands([RulesCommand, PingCommand, IntroCommand, RolesCommand]);
	await loadEvents(mammot, 'src/events');
}

boot().then(() => mammot.login(token));
