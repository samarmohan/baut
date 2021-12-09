import * as Discord from "discord.js";
import { COMMAND_PREFIX, INTRODUCTIONS_CHANNEL_ID } from "../../../constants";
import { CommandHandlerInterface } from "../interfaces/CommandHandlerInterface";

export default class IntroduceCommandHandler
  implements CommandHandlerInterface
{
  aliases: string[] = ["introduce", "introduction", "intro"];
  description: string =
    "Introduce yourself to the community and obtain the 'Eligible' role, which would allow you to access cool perks and events.";

  async execute(message: Discord.Message, args: string[]): Promise<void> {
    if (!(await this.verifyCommand(message))) return;
    this.getIntroData(message);
  }

  private async verifyCommand(message: Discord.Message) {
    if (!(await this.validateChannel(message))) return false;
  }

  /** DM the user and collect their introduction data */
  private getIntroData(message: Discord.Message) {
    message.author.send("", {
      embed: {
        color: "#010101",
        title: "Welcome to buildergroop!",
        description:
          "It's lovely to have you! Please answer the questions here.",
      },
    });
    // assign role to the message author
    // message.member.roles.add("913766127451136002");
  }

  /** Form the intro and send it as an embed in the intros channel */
  private sendIntroEmbed(message: Discord.Message) {
    // assign role to the message author
    // message.member.roles.add("913766127451136002");
  }

  /** Check if the message is big enough */
  private async validateLength(message: Discord.Message) {
    if (message.content.length < 70) {
      const errorMessage = await message.channel.send(
        "Your introduction is too short. Please make sure it is over 70 characters. Deleting your message in 5 seconds."
      );
      errorMessage.delete({ timeout: 5000 });

      await message.delete({ timeout: 5000 });
      return false;
    }
  }

  /** Validate the channel the intro command was used in */
  private async validateChannel(message: Discord.Message) {
    if (message.channel.id !== INTRODUCTIONS_CHANNEL_ID) {
      const errorMessage = await message.channel.send(
        `Please use this command in the <#${INTRODUCTIONS_CHANNEL_ID}> channel`
      );

      await errorMessage.delete({ timeout: 3000 });

      await message.delete({ timeout: 3000 });
      return false;
    }
  }
}
