import { GuildMemberRoleManager } from 'discord.js';
import { roles } from '../guild';
import Component from '../structures/Component';

export default new Component(
	'before1kmembers',
	false,
	async (client, interaction) => {
		if (
			interaction.guild.memberCount > 1000 ||
			!(interaction.member.roles instanceof GuildMemberRoleManager)
		) {
			await interaction.editReply(
				"This role can't be assigned anymore! We've already hit a thousand members!"
			);
			return;
		}

		if (interaction.member.roles.cache.has(roles.before1k)) {
			await interaction.editReply(
				"You've already claimed your role, thank you!"
			);
			return;
		}

		await interaction.member.roles.add(roles.before1k);

		const role =
			interaction.guild.roles.cache.get(roles.before1k) ||
			(await interaction.guild.roles.fetch(roles.before1k));

		await interaction.editReply(
			`You were given the \`${role.name}\` role! Make sure to tell all your friends about buildergroop!`
		);
	},
	true
);
