import { MessageActionRow, MessageAttachment, MessageButton } from "discord.js";
import Command from "../structures/Command";
import { checkMember } from "../util/checkMember.js";
import { verifyAdmin } from "../util/verifyAdmin.js";

export default new Command(
  {
    name: "roles",
    description: "Select your self-assigned roles (Admin Only Command)",
  },
  async (client, interaction) => {
    checkMember(interaction);
    if (!verifyAdmin(interaction)) return;

    const { channels } = client.constants;

    // Check if the channel is the rules channel
    if (interaction.channel.id !== channels.roles) {
      // Direct users to the rules channel
      await interaction.reply({
        content: `Please go to <#${channels.rules}> to view the server rules.`,
        ephemeral: true,
      });

      return;
    }

    // Invisible divider
    const divider = `
__
__`;

    // Header image
    const headerImage = new MessageAttachment(
      "https://cdn.discordapp.com/attachments/864826842707132446/931217059432525894/Roles_Poster.png"
    );

    // Create category buttons
    const categoryButtons = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Career")
        .setStyle("PRIMARY")
        .setEmoji("🧑‍💼")
        .setCustomId("careers"),
      new MessageButton()
        .setLabel("Location")
        .setStyle("PRIMARY")
        .setEmoji("✈️")
        .setCustomId("location"),
      new MessageButton()
        .setLabel("Pronouns")
        .setStyle("PRIMARY")
        .setEmoji("💁")
        .setCustomId("pronouns"),
      new MessageButton()
        .setLabel("Experience")
        .setStyle("PRIMARY")
        .setEmoji("📊")
        .setCustomId("experience"),
      new MessageButton()
        .setLabel("Notifications")
        .setStyle("PRIMARY")
        .setEmoji("🔔")
        .setCustomId("notifications")
    );

    // Send career embed and select menu
    await interaction.channel.send({
      files: [headerImage],
    });

    // send invisible divider
    await interaction.channel.send({
      content: divider,
    });

    // Send the category buttons
    await interaction.channel.send({
      content: `**Please select a category to view the available roles.** _ _`,
      components: [categoryButtons],
    });

    await interaction.reply({
      content: "Sent roles message",
      ephemeral: true,
    });
  }
);
