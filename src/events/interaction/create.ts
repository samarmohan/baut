import { Interaction } from 'discord.js';
import { handleComponentInteractions } from '../../functions/handleComponentInteractions';
import Event from '../../structures/Event';

export default new Event(
	{
		name: 'interactionCreate',
	},
	async (mammot, interaction: Interaction) => {
		// // CHAT_INPUT commands
		// if (interaction.isCommand()) {
		// 	// if not in collection return
		// 	if (!mammot?.commands.has(interaction.commandName)) return;
		// 	try {
		// 		// execute command logic
		// 		await mammot.commands
		// 			.get(interaction.commandName)
		// 			.run(mammot, interaction);
		// 	} catch (error) {
		// 		// respond with error messsage
		// 		console.log(error);
		// 		await interaction.reply({
		// 			content: `There was an error while executing this command!\n\`\`\`${error}\`\`\``,
		// 			ephemeral: true,
		// 		});
		// 	}
		// }

		await handleComponentInteractions(mammot, interaction);
	}
);
