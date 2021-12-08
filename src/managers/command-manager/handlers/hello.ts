import { CommandHandlerInterface } from "../interfaces/CommandHandlerInterface";
import * as Discord from "discord.js";
import ArrayHelper from "../../../helpers/ArrayHelper";

export default class HelloCommandHandler implements CommandHandlerInterface {
  private static readonly HELLO_MESSAGES: string[] = [
    "yo",
    "whats good",
    "how are you",
  ];

  aliases: string[] = ["greet", "hey", "hi"];
  description: string = "Builderbaut says hello";

  async execute(message: Discord.Message, args: string[]) {
    let helloMessage = ArrayHelper.getRandomItem<string>(
      HelloCommandHandler.HELLO_MESSAGES
    );

    await message.reply(helloMessage);
  }
}
