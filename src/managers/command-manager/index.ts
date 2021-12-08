import * as fs from "fs";
import { CommandHandlerInterface } from "./interfaces/CommandHandlerInterface";
import * as Discord from "discord.js";
import MiscHelper from "../../helpers/MiscHelper";
import { COMMAND_PREFIX, ENABLE_UNKOWN_COMMAND_MESSAGE } from "../../constants";

export class CommandManager {
  private static readonly HANDLERS_FOLDER_NAME = "handlers";
  private static readonly HELP_COMMAND = "help";

  private commandHandlers: CommandHandlerInterface[];

  public constructor(private client: Discord.Client) {
    this.registerCommandHandlers();
  }

  private registerCommandHandlers() {
    this.commandHandlers = fs
      .readdirSync(`${__dirname}/${CommandManager.HANDLERS_FOLDER_NAME}`)
      .filter((filename) => filename.endsWith(".ts"))
      .map(
        (filename) =>
          `${__dirname}/${CommandManager.HANDLERS_FOLDER_NAME}/${filename}`
      )
      .map((filename) => new (require(filename).default)());

    if (this.commandHandlers.some((i) => i.aliases.length === 0)) {
      throw new Error(`There is a message handler with no aliases in it`);
    }

    this.commandHandlers.forEach((commandHandler) =>
      console.info(
        "Loaded '" +
          commandHandler.aliases.join(", ") +
          "' argument(s) listener"
      )
    );

    this.client.on("message", async (message: Discord.Message) =>
      this.commandArrived(message)
    );
  }

  private async commandArrived(message: Discord.Message) {
    if (message.author.bot) return;

    if (message.type !== "DEFAULT") return;

    const args = message.content.split(" ");

    if (args.length === 0) {
      console.log("args.length was 0, not processing the message");

      return;
    }

    let command = args[0];

    if (!command.startsWith(COMMAND_PREFIX)) return;

    command = command.substring(COMMAND_PREFIX.length);

    args.shift();

    console.log(`> ${message.author.username}: ${message.content}`);

    await this.executeCommand(message, command, args);
  }

  private async executeCommand(
    message: Discord.Message,
    command: string,
    args: string[]
  ) {
    if (command === CommandManager.HELP_COMMAND) {
      await this.helpCommandArrived(message);
      return;
    }

    const commandHandler = this.commandHandlers.find(
      (i) => i.aliases.indexOf(command) !== -1
    );

    if (!commandHandler) {
      await CommandManager.unknownCommandArrived(message);
      return;
    }

    try {
      await commandHandler.execute(message, args);
    } catch (error) {
      console.log(error);

      await MiscHelper.sendAndDelete(message, {
        content:
          "Failed to process your request, contact to the developers if this problem persists",
      });
    }
  }

  private async helpCommandArrived(message: Discord.Message) {
    const reply = new Discord.MessageEmbed();

    reply.setTitle("Available commands");

    for (let commandHandler of this.commandHandlers) {
      const aliasesJoined = commandHandler.aliases
        .map((i) => `${COMMAND_PREFIX}${i}`)
        .join(", ");

      reply.addField("**" + aliasesJoined + "**", commandHandler.description);
    }

    await message.reply(reply);
  }

  private static async unknownCommandArrived(message: Discord.Message) {
    if (!ENABLE_UNKOWN_COMMAND_MESSAGE) return;

    await message.reply(
      `Unknown command.\nType \`${COMMAND_PREFIX}help\` to get the list of commands`
    );
  }
}
