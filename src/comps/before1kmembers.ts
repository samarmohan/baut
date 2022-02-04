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
		)
			return;

		if (interaction.member.roles.cache.has(roles.before1k)) {
			await interaction.editReply(
				'You\'ve already claimed your role, thank you!'
			);
			return;
		}

		await interaction.member.roles.add(roles.before1k);

		const role =
			interaction.guild.roles.cache.get(roles.before1k) ||
			(await interaction.guild.roles.fetch(roles.before1k));

		await interaction.editReply(
			`You were given the \`${role.name}\` role!`
		);
	},
	true
);
