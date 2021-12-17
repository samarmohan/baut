import Component from '../structures/Component';

export default new Component(
	'ping',
	async (client, interaction) => {
		await interaction.reply({
			content: 'pong',
			ephemeral: true,
		});
	}
);