import { GuildMember } from "discord.js";
import Event from "../../structures/Event";

export default new Event(
  {
    name: "messageCreate",
  },
  async (client, message) => {
    // Ignore bots
    if (message.author.bot) return;

    // Destructure the constants
    const { roles, channels } = client.constants;

    // Introductions channel only
    message.channel.id === channels.intros && setEligible(message.member);

    // Handle user eligibility
    async function setEligible(member: GuildMember) {
      // Get the roles
      const notEligibleRole = member.guild.roles.cache.get(roles.not_eligible);
      const eligibleRole = member.guild.roles.cache.get(roles.eligible);

      // Check if the member is eligible already
      if (member.roles.cache.has(roles.eligible)) return;

      // Add the eligible role and remove the not eligible role
      await member.roles.remove(notEligibleRole);
      await member.roles.add(eligibleRole);
    }
  }
);
