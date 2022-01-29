import Component from '../structures/Component';

export default new Component(
	'ping',
	true,
	async (client, interaction) => {
		await interaction.editReply({
			content: 'pong',
		});
	},
	false
);
