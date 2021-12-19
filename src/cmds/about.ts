import { MessageAttachment, MessageEmbed } from 'discord.js';
import Command from '../structures/Command';

export default new Command({
	name: 'about',
	description: 'Learn about the server!'
}, async (client, interaction) => {
	// Descructure constants
	const { channels } = client.constants;

	// Check if the channel is the about channel
	if (interaction.channel.id !== channels.about) {
		// Direct users to the about channel
		await interaction.reply({
			content: `Please go to <#${channels.about}> to learn more about the server.`,
			ephemeral: true,
		});

		return;
	}

	// Create community embed
	const communityEmbed = new MessageEmbed()
		.setTitle('The Community')
		.setColor('#535061')
		.setDescription("We're all members of gen-z, trying to build things that make an impact, whether it's a volunteer organization, talent agency, or a platform for the future. Our community members encourage and assist one another in all of their endeavors; We collectively form a large and supportive family.")

	// Create vibe embed
	const vibeEmbed = new MessageEmbed()
		.setTitle('The Vibe')
		.setColor('#535061')
		.setDescription('We aspire to be a casual hangout space, as well as an encouraging hub for progress and dream chasing with plenty of networking opportunities.')

	// Create name embed
	const nameEmbed = new MessageEmbed()
		.setTitle('The Name')
		.setColor('#535061')
		.setDescription(`
		Wtf is our name? It may look wonky, but it symbolizes a few notable things:

		Firstly, it incorporates the fact that we're all building things, collectively.

		The term also showcases that our community is specifically for young individuals due to the misspelling in the term "group".

		Finally, it signifies our community is quite chill due to our very casual name.
		`)

	// create welcome embed
	const welcomeEmbed = new MessageEmbed()
		.setTitle('Welcome to buildergroop - A community full of ambitious young builders, striving to make the world a better place through innovation.')
		.setColor('#535061')

	// create the header image attachment
	const headerImage = new MessageAttachment("https://cdn.discordapp.com/attachments/913702607510466651/917787070850793522/About_Poster.png");

	// send the embeds
	await interaction.channel.send({ files: [headerImage], embeds: [communityEmbed, vibeEmbed, nameEmbed, welcomeEmbed] });
	await interaction.reply({
		content: "About message posted!",
		ephemeral: true,
	})
});