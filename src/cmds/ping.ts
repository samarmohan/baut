import Command from '../structures/Command';

export default new Command({
	name: 'ping',
	description: 'Ping the bot',
}, async (client, interaction) => {
	interaction.reply('Pong!');
});
