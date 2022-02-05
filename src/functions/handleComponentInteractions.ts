import { Mammot } from '@mammot/core';
import { Interaction } from 'discord.js';

export async function handleComponentInteractions(
	mammot: Mammot,
	interaction: Interaction
) {
	if (
		interaction.isMessageComponent() ||
		interaction.isSelectMenu() ||
		interaction.isButton()
	) {
		// @ts-expect-error
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
