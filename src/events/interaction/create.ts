import { Interaction } from 'discord.js';
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
		// component interactions
		if (
			interaction.isMessageComponent() ||
			interaction.isSelectMenu() ||
			interaction.isButton()
		) {
			// @ts-expect-error yeah
			const comp = mammot.components.get(interaction.customId);

			// if not in collection return
			if (!comp) return;

			if (!comp.update) {
				await interaction.deferReply({ ephemeral: comp.ephermal });
			} else {
				await interaction.deferUpdate();
			}

			try {
				// execute component logic
				await comp.run(mammot, interaction);
			} catch (error) {
				// respond with error messsage
				console.log(error);
				await interaction.editReply({
					content: `There was an error while executing this component!\n\`\`\`${error}\`\`\``,
				});
			}
		}
	}
);
