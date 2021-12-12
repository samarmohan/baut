import * as Discord from "discord.js";
import { INTRODUCTIONS_CHANNEL_ID } from "../../constants";

export class IntroductionManager {
  public constructor(private client: Discord.Client) {
    this.client.on("message", async (message: Discord.Message) => {
      if (message.channelId === INTRODUCTIONS_CHANNEL_ID) {
        await message.member?.roles.add("913766127451136002");
      }
    });
  }
}
