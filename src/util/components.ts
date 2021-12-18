import { GuildMember, MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js';
import { constants } from '../config'

const { roles } = constants;

export function careerSelectMenu(member?: GuildMember) {
	return new MessageActionRow().addComponents(
		new MessageSelectMenu()
			.addOptions([
				{
					label: 'Developer',
					value: '913789663767040001', // If in config using array, use id of role for value
					emoji: '💻',
					default: member?.roles.cache.has('913789663767040001') || false,
				},
				{
					label: 'Designer',
					value: '913791003633266729',
					emoji: '🎨',
					default: member?.roles.cache.has('913791003633266729') || false,
				},
				{
					label: 'Entrepreneur',
					value: '913791069378990100',
					emoji: '💼',
					default: member?.roles.cache.has('913791069378990100') || false,
				},
				{
					label: 'Creator',
					value: '913791371163336744',
					emoji: '🖌',
					default: member?.roles.cache.has('913791371163336744') || false,
				},
			])
			.setCustomId('career')
			.setMinValues(0)
			.setMaxValues(4)
	);
}

export const experienceButtons = new MessageActionRow().addComponents(
	new MessageButton()
		.setLabel('1 - 2 years')
		.setCustomId('1-2')
		.setStyle('PRIMARY'),
	new MessageButton()
		.setLabel('3 - 5 years')
		.setCustomId('3-5')
		.setStyle('PRIMARY'),
	new MessageButton()
		.setLabel('6 - 8 years')
		.setCustomId('6-8')
		.setStyle('PRIMARY'),
	new MessageButton()
		.setLabel('9+ years')
		.setCustomId('9+')
		.setStyle('PRIMARY'),
);

export function locationSelectMenu(member?: GuildMember) {
	return new MessageActionRow().addComponents(
		new MessageSelectMenu()
			.addOptions([
				{
					label: 'North America',
					value: 'north_america', // If in config using object, use id of role or key name for value
					emoji: '🇺🇸',
					default: member?.roles.cache.has(roles.location.north_america) || false,
				},
				{
					label: 'South America',
					value: 'south_america',
					emoji: '🇧🇷',
					default: member?.roles.cache.has(roles.location.south_america) || false,
				},
				{
					label: 'Europe',
					value: 'europe',
					emoji: '🇪🇺',
					default: member?.roles.cache.has(roles.location.europe) || false,
				},
				{
					label: 'Asia',
					value: 'asia',
					emoji: '🇮🇳',
					default: member?.roles.cache.has(roles.location.asia) || false,
				},
				{
					label: 'Africa',
					value: 'africa',
					emoji: '🇿🇦',
					default: member?.roles.cache.has(roles.location.africa) || false,
				},
				{
					label: 'Oceania',
					value: 'oceania',
					emoji: '🇦🇺',
					default: member?.roles.cache.has(roles.location.oceania) || false,
				},
				{
					label: 'Antartica',
					value: 'antartica',
					emoji: '🇦🇶',
					default: member?.roles.cache.has(roles.location.antartica) || false,
				}
			])
			.setCustomId('locationSelect')
			.setPlaceholder('Select a continent')
	);
}

export const notificationButtons = new MessageActionRow().addComponents(
	new MessageButton()
		.setLabel('Server Inactivity Ping')
		.setCustomId('inactivity_ping')
		.setStyle('PRIMARY'),
	new MessageButton()
		.setLabel('Assistance Ping')
		.setCustomId('assistance_ping')
		.setStyle('PRIMARY'),
	new MessageButton()
		.setLabel('Poll Ping')
		.setCustomId('poll_ping')
		.setStyle('PRIMARY'),
	new MessageButton()
		.setLabel('Announcement Ping')
		.setCustomId('announcement_ping')
		.setStyle('PRIMARY'),
);

export function pronounSelectMenu(member?: GuildMember) {
	return new MessageActionRow().addComponents(
		new MessageSelectMenu()
			.addOptions([
				{
					label: 'He/Him',
					value: 'he', // If in config using array, use id of role for value
					emoji: '♂',
					default: member?.roles.cache.has(roles.pronouns.he) || false,
				},
				{
					label: 'She/Her',
					value: 'she',
					emoji: '♀',
					default: member?.roles.cache.has(roles.pronouns.she) || false,
				},
				{
					label: 'They/Them',
					value: 'they',
					emoji: '⚧',
					default: member?.roles.cache.has(roles.pronouns.they) || false,
				},
				// {
				// 	label: 'Ask me!',
				// 	value: '',
				// 	emoji: '❓',
				// },
			])
			.setCustomId('pronounSelect')
			.setMinValues(0)
			.setMaxValues(3)
	);
}