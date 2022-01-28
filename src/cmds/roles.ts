import {
  MessageActionRow,
  MessageButton,
  CommandInteraction,
  MessageAttachment,
} from "discord.js";
import {
  careerSelectMenu,
  experienceButtons,
  locationSelectMenu,
  notificationButtons,
  pronounSelectMenu,
} from "../util/components";
import {
  careerEmbed,
  experienceEmbed,
  locationEmbed,
  notificationEmbed,
  pronounsEmbed,
} from "../util/embeds";
import { config, Command } from "@mammot/core";
import { verifyAdmin } from "../util/verifyAdmin";

@config("roles", {
  description: "Select your self-assigned roles (Admin Only Command)",
  inhibitors: [verifyAdmin()],
})
export class RolesCommand extends Command {
  public async run(interaction: CommandInteraction) {
    const rolesChannel = "934094517525676042";

    // Invisible divider
    const divider = `_ _`;

    // Header image
    const headerImage = new MessageAttachment(
      "https://media.discordapp.net/attachments/913709531442315324/916712730713534494/Roles_Poster.png"
    );

    // Send career embed and select menu
    await interaction.channel.send({
      files: [headerImage],
      embeds: [careerEmbed],
      components: [careerSelectMenu()],
    });

    // Send location embed and select menu
    await interaction.channel.send({
      content: divider,
      embeds: [locationEmbed],
      components: [locationSelectMenu()],
    });

    // Send pronouns embed and select menu
    await interaction.channel.send({
      content: divider,
      embeds: [pronounsEmbed],
      components: [pronounSelectMenu()],
    });

    // Send experience embed and buttons
    await interaction.channel.send({
      content: divider,
      embeds: [experienceEmbed],
      components: [experienceButtons],
    });

    // Send notifications embed and buttons
    await interaction.channel.send({
      content: divider,
      embeds: [notificationEmbed],
      components: [notificationButtons],
    });

    await interaction.reply({
      content: "Roles message posted!",
      ephemeral: true,
    });
  }
}
