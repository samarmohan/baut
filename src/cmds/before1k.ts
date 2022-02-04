import {
	MessageActionRow,
	MessageButton,
	CommandInteraction,
} from 'discord.js';
import { config, Command } from '@mammot/core';
import before1kmembers from '../comps/before1kmembers';
import { roles } from '../guild';

@config('before1kmembers', { description: 'yeah yeah' })
export class Before1kmembers extends Command {
	public async run(interaction: CommandInteraction) {
		if (!interaction.memberPermissions.has('ADMINISTRATOR')) return;

		const role =
			interaction.guild.roles.cache.get(roles.before1k) ||
			(await interaction.guild.roles.fetch(roles.before1k));

		const button = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('Before 1k members')
				.setStyle('SECONDARY')
				.setCustomId(before1kmembers.id)
		);

		await interaction.reply({
			content: `Show of your early support with this \`${role.name}\` role!. Once we reach over 1,000 members you wont be able to assign yourself that role ever again!\n_ _`,
			components: [button],
		});
	}
}
