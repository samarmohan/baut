import { MammotOptions } from '@mammot/core';
import { Intents } from 'discord.js';

export const clientOptions: MammotOptions = {
	developmentGuild: process.env.DEVELOPMENT_GUILD_ID,
	partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],

	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	],

	allowedMentions: {
		parse: ['users'],
		repliedUser: false,
	},

	async onError(interaction, error) {
		console.warn(error);
		return Promise.resolve('Something went wrong!');
	},

	onReady(user) {
		console.log(`Bot up and running as ${user.username}#${user.discriminator}`);
	},

	presence: {
		status: 'online',
		activities: [
			{
				type: 'PLAYING',
				name: 'Buildergroop Support',
			},
		],
	},
};
