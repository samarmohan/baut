import { ClientOptions, Intents } from 'discord.js';
import 'dotenv/config';

export const token = process.env.TOKEN;

export const constants = {
	guild: '575001822998298642',
	channels: {
		about: '913729308676202506',
		intros: '913701412578418718',
		info: '913669662649237564',
		rules: '913669662649237564',
		roles: '913709531442315324',
	},
	roles: {
		// Career - Using as a test array, can be changed
		career: [
			'913789663767040001', // developer
			'913791003633266729', // designer
			'913791069378990100', // entrepreneur
			'913791371163336744', // creator
		],
		// Pronouns
		pronouns: {
			he: '914059764542095360',
			she: '914059977382043699',
			they: '914060117371125770',
		},
		// Location
		location: {
			north_america: '914062801331453952',
			south_america: '914062822491693076',
			europe: '914062876480794634',
			oceania: '914062934479605760',
			asia: '914062611618889798',
			africa: '914062909162803260',
			antartica: '914063088960036915',
		},
		// Experience
		experience: {
			'exp1-2': '913788809882251285',
			'exp3-5': '914060415997210644',
			'exp6-8': '914060591491063808',
			'exp9+': '914061049949458462',
		},
		// Notifications
		notifications: {
			inactivity_ping: '913788985036382268',
			assistance_ping: '913789046092886037',
			poll_ping: '913789194395074601',
			announcement_ping: '913789232311599128',
		},
		eligible: '913766127451136002',
		not_eligible: '920144177818390649',
	},
	rules: `
	Please read the following rules prior to interacting in the server.
	
	• Keep all messages and content SFW
	• Harassment and Hate Speech is prohibited
	• Do not share pirated/crack software and content
	• Discussing sensitive topics (civics, religion, health) or is frowned upon
	• No Spamming
	• No Doxxing
	• Send malicious links or viruses is prohibited
	• Refrain from using any language except English
	• Asking moderators for leniency in punishment is strictly disallowed
	• Use common sense
	• Follow Discord’s Terms of Service.
	
	The rules mentioned here only exist for the safety of members like you. They are subject to change at any time. Not being aware of the present list of rules is not a valid excuse to be protected from consequences.
	`
};

export const clientOptions: ClientOptions = {
	allowedMentions: {
		parse: ['users'],
		repliedUser: false,
	},
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
	partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],
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