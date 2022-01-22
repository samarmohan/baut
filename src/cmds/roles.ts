import {
  MessageActionRow,
  MessageButton,
  CommandInteraction,
  MessageAttachment,
} from "discord.js";
import { config, Command } from "@mammot/core";
import { verifyAdmin } from "../util/verifyAdmin";

@config("roles", {
  description: "Select your self-assigned roles (Admin Only Command)",
  inhibitors: [verifyAdmin()],
})
export class RolesCommand extends Command {
  public async run(interaction: CommandInteraction) {
    const rolesChannel = "934094517525676042";
    const rulesChannel = "913669662649237564";

    if (interaction.channel.id !== rolesChannel) {
      // Direct users to the rules channel
      return await interaction.reply({
        content: `Please go to <#${rulesChannel}> to view the server rules.`,
        ephemeral: true,
      });
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
}
