import { Interaction } from 'discord.js';
import Event from '../../structures/Event';

export default new Event({
	name: 'interactionCreate',
}, async (client, interaction: Interaction) => {

	// CHAT_INPUT commands
	if (interaction.isCommand()) {
		// if not in collection return
		if (!client.commands.has(interaction.commandName)) return;

		try {
			// execute command logic
			await client.commands.get(interaction.commandName).run(client, interaction);
		} catch (error) {
			// respond with error messsage
			console.log(error);
			await interaction.reply({
				content: `There was an error while executing this command!\n\`\`\`${error}\`\`\``,
				ephemeral: true,
			});
		}
	}
});