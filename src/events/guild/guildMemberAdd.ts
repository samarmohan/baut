import { GuildMember, WebhookClient, MessageEmbed } from "discord.js";
import Event from "../../structures/Event";
import { channels, roles } from "../../guild";

export default new Event(
  {
    name: "guildMemberAdd",
  },
  async (client, member) => {
    // Ignore bots
    if (member.user.bot) return;

    try {
      const embed = new MessageEmbed()
        .setTitle(`Welcome to buildergroop!`)
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
          "https://media.discordapp.net/attachments/924237532919627816/934456702676402186/MOSHED-2022-1-22-9-37-14.gif"
        )
        .setFooter(
          "We hope you enjoy your stay! If you have any questions, don't hesitate to DM an admin."
        );

      await member.send({
        embeds: [embed],
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
      username: `Member Logs`,
      avatarURL: `https://cdn.discordapp.com/icons/913668807015407646/a_f8271ba713d72cb11a66b4601b1b044e.webp`,
      embeds: [embed],
    });
  }
);
