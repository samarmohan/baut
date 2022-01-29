import type { Collection } from 'discord.js';
import type { default as Component } from '../../src/structures/Component';

declare module '@mammot/core' {
	export interface Mammot {
		components: Collection<string, Component>;
	}
}
