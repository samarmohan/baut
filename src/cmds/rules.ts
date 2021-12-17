import { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } from 'discord.js';
import Command from '../structures/Command';

export default new Command({
	name: 'rules',
	description: 'View the server rules',
}, async (client, interaction) => {
	// Descructure constants
	const { rules, channels } = client.constants;

	// Check if the channel is the rules channel
	if (interaction.channel.id !== channels.rules) {
		// Direct users to the rules channel
		await interaction.reply({
			content: `Please go to <#${channels.rules}> to view the server rules.`,
			ephemeral: true,
		});

		return;
	}


	// Create the welcome embed
	const welcomeEmbed = new MessageEmbed()
		.setColor("#0099ff")
		.setTitle("Welcome To Buildergroop!")
		.setDescription(
			"We're a community full of ambitious young builders, striving to make the world a better place through innovation.");

	// Create the rules embed
	const rulesEmbed = new MessageEmbed()
		.setColor("#535061")
		.setTitle("Our Community Rules")
		.setDescription(rules);

	// Create the join embed
	const joinEmbed = new MessageEmbed()
		.setColor("#535061")
		.setTitle("What to do after joining")
		.setDescription(`
		- Change your nickname to the format: \`[name] - [what you're working on]\`
		
		- Choose some awesome roles over in <#${channels.roles}>.
		
		- Introduce yourself over in <#${channels.intros}>.
		
		- Go to <#${channels.info}> to learn more about the server.
		`);

	// Create the social action row
	const sociaRow = new MessageActionRow().addComponents(
		new MessageButton()
			.setLabel("GitHub")
			.setStyle("LINK")
			.setURL("https://github.com/buildergroop")
			.setEmoji("👨‍💻"),
		new MessageButton()
			.setLabel("Twitter")
			.setStyle("LINK")
			.setURL("https://twitter.com/buildergroop")
			.setEmoji("🐦"),
		new MessageButton()
			.setLabel("Website")
			.setStyle("LINK")
			.setURL("https://buildergroop.com")
			.setEmoji("🌐")
	);

	// create the header image attachment
	const headerImage = new MessageAttachment("https://media.discordapp.net/attachments/913702607510466651/913877293619904613/Rules_And_Info.png");

	// Send the embeds and action row
	await interaction.channel.send({ files: [headerImage], embeds: [welcomeEmbed, rulesEmbed, joinEmbed], components: [sociaRow] });
	await interaction.reply({
		content: "Rules posted!",
		ephemeral: true,
	})
});
