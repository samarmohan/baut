import * as DJS from "discord.js";
import * as dotenv from "dotenv";

import { PresenceData } from "discord.js";

import { IntroductionManager } from "./managers/introduction-manager";

export class Bot {
  private static client: DJS.Client;

  // starts the bot
  public static async start() {
    dotenv.config();
    await this.createClient();

    console.log("Bot up and running.");
  }

  // load the modules for the bot
  private static async loadManagers() {
    new IntroductionManager(Bot.client);
  }

  // set the bot presence
  private static async setPresence() {
    const presence: PresenceData = {
      status: "online",
      activities: [
        {
          type: "PLAYING",
          name: "Buildergroop Support",
        },
      ],
    };

    await Bot.client.user?.setPresence(presence);
  }

  private static async createClient() {
    // set the client
    Bot.client = new DJS.Client({
      intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
      ],
      partials: ["CHANNEL", "MESSAGE", "REACTION", "USER", "GUILD_MEMBER"],
    });

    // when the client is created
    Bot.client.on("ready", async () => {
      await this.loadManagers();
      await this.setPresence();
    });

    // activate the client
    await Bot.client.login(process.env.TOKEN || "");
  }
}
