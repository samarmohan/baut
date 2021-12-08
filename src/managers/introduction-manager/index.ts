import * as Discord from "discord.js";
import { INTRODUCTIONS_CHANNEL_ID } from "../../constants";
import ArrayHelper from "../../helpers/arrayHelper";

export class IntroductionManager {
  public emojis: string[] = ["🤘", "🚀", "👋", "🤝", "😎", "👊"];

  public constructor(private client: Discord.Client) {
    this.handleIntroduction();
  }

  private handleIntroduction() {
    this.client.on("message", (message) => {
      if (message.channel.id === INTRODUCTIONS_CHANNEL_ID) {
        // greet the user
        message.react(ArrayHelper.getRandomItem<string>(this.emojis));

        // assign role to the message author
        message.member.roles.add("913766127451136002");
      }
    });
  }
}
