import { GuildMember, Interaction } from "discord.js";
import Event from "../../structures/Event";

export default new Event(
  {
    name: "guildMemberAdd",
  },
  async (client, member: GuildMember) => {
    console.log(member);
  }
);
