import {
	MessageActionRow,
	MessageButton,
	CommandInteraction,
} from 'discord.js';
import { config, Command } from '@mammot/core';
import before1kmembers from '../comps/before1kmembers';
import { roles } from '../guild';

@config('before1k', { description: 'Send the Before 1k announcement.' })
export class Before1kmembers extends Command {
	public async run(interaction: CommandInteraction) {
		if (!interaction.memberPermissions.has('ADMINISTRATOR')) {
			interaction.reply(
				'You must be an administrator to run this command'
			);
			return;
		}

		const role =
			interaction.guild.roles.cache.get(roles.before1k) ||
			(await interaction.guild.roles.fetch(roles.before1k));

		const button = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('Before 1k members')
				.setStyle('PRIMARY')
				.setCustomId(before1kmembers.id)
		);

		await interaction.channel.send({
			embeds: [
				{
					title: "We're almost **ONE THOUSAND** members strong",
					description: `Buildergroop started as an initiative to empower builders and makers belonging to gen-z. We're humbled to announce that we're so close to a thousand members. Show of your early support with this exclusive \`${role.name}\` role!. Once we reach over 1,000 members you wont be able to assign yourself this role ever again!\n_ _`,
					footer: {
						text: 'tell your friends about buildergroop too!',
					},
				},
			],
			components: [button],
		});
	}
}
