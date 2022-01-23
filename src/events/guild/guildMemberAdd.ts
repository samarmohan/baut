import { GuildMember, WebhookClient, MessageEmbed } from "discord.js";
import Event from "../../structures/Event";
import { channels, roles } from "../../guild";
import { webhook } from "../../constants";

export default new Event(
  {
    name: "guildMemberAdd",
  },
  async (client, member) => {
    // Ignore bots
    if (member.user.bot) return;

    try {
      await member.send({
        content: `Welcome to Buildergroop! Please read the rules in <#${channels.rules}> and then react with the checkmark to get started.`,
      });
    } catch (error) {
      console.log(error);
    }

    setEligible(member);

    // Handle user eligibility
    async function setEligible(member: GuildMember) {
      // Get the roles
      const memberRole = member.guild.roles.cache.get(roles.member);
      const notEligibleRole = member.guild.roles.cache.get(roles.not_eligible);

      // Check if the member has the `not_eligible` role already
      if (member.roles.cache.has(roles.not_eligible)) return;

      await member.roles.add(
        memberRole,
        `[User Join] Added Member to ${member.user.tag}`
      );
      // Add the not_eligible role
      await member.roles.add(
        notEligibleRole,
        `[User Join] Added Not Eligible to ${member.user.tag}`
      );
    }
    const webhookClient = new WebhookClient({
      url: process.env.MEMBERS_WEBHOOK,
    });
    const embed = new MessageEmbed()
      .setTitle(`Member Joined`)
      .setDescription(
        `**${member.user.tag}** [<@!${
          member.user.id
        }>] joined buildergroop!\n\nTheir account was created on ${member.user.createdAt.toDateString()}.\n\nTheir account ID is ***${
          member.user.id
        }.***`
      );

    webhookClient.send({
      content: `User Added`,
      username: `buildergroop Member Logs`,
      avatarURL: `https://cdn.discordapp.com/icons/913668807015407646/a_f8271ba713d72cb11a66b4601b1b044e.webp`,
      embeds: [embed],
    });
  }
);
