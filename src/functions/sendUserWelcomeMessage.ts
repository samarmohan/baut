import { GuildMember, MessageEmbed } from 'discord.js';
import { channels } from '../guild';

export async function sendUserWelcomeMessage(member: GuildMember) {
	const embed = new MessageEmbed()
		.setTitle('Welcome to buildergroop!')
		.setDescription(
			`
          Here are some things you can do:

          **Read the rules over in** <#${channels.rules}>
          Learn more about buildergroop and view our rules.

          **Introduce yourself in** <#${channels.intros}>
          Tell the community about yourself! Fun fact, you can run the \`/introduction\` slash command to view how you should structure your intro!     

          **Add what you're building to your nickname**
          Building a cool project? Make sure to add it to your nickname via the following format: \`[Name] - [Project]\` 

          **Tell your friends!**
          We're a friendly and welcoming community! Here's our invite link <https://buildergroop.com>.
          `
		)
		.setThumbnail(
			'https://media.discordapp.net/attachments/924237532919627816/934456702676402186/MOSHED-2022-1-22-9-37-14.gif'
		)
		.setFooter(
			"We hope you enjoy your stay! If you have any questions, don't hesitate to DM an admin."
		);

	await member.send({
		embeds: [embed],
	});
}
