import {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
} from "discord.js";
import Command from "../structures/Command";

export default new Command(
  {
    name: "rules",
    description: "Send the server rules. (Admin Only Command)",
  },
  async (client, interaction) => {
    // Descructure constants
    const { rules, channels, thankyou } = client.constants;

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
      .setColor("#FFFFFF")
      .setTitle("Welcome To Buildergroop!")
      .setDescription(
        "We're a diverse and open community of ambitious gen-z builders, striving to build a better future."
      );

    // Create the rules embed
    const rulesEmbed = new MessageEmbed()
      .setColor("#40B9FD")
      .setTitle("Our Community Rules")
      .setDescription(rules);

    // Create the rules embed
    const infoEmbed = new MessageEmbed()
      .setColor("#C930FF")
      .setTitle("Thanks for joining!")
      .setDescription(thankyou);

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
    const headerImage = new MessageAttachment(
      "https://media.discordapp.net/attachments/913702607510466651/913877293619904613/Rules_And_Info.png"
    );

    // Send the embeds and action row
    await interaction.channel.send({
      files: [headerImage],
      embeds: [welcomeEmbed, rulesEmbed, infoEmbed],
      components: [sociaRow],
    });
    await interaction.reply({
      content: "Rules posted!",
      ephemeral: true,
    });
  }
);
