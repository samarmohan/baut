import { MessageActionRow, MessageButton } from 'discord.js';
import Command from '../structures/Command';

export default new Command({
	name: 'ping',
	description: 'Ping the bot',
}, async (client, interaction) => {
	const button = new MessageActionRow().addComponents(
		new MessageButton()
			.setLabel('Pong!')
			.setStyle('SECONDARY')
			.setCustomId('ping'),
	);

	interaction.reply({ content: 'Pong!', components: [button] });
});
