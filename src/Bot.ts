import * as Discord from "discord.js";
import * as dotenv from "dotenv";

import {
  ABOUT_CHANNEL_ID,
  COMMAND_PREFIX,
  INTRODUCTIONS_CHANNEL_ID,
  RULES,
} from "./constants";
import { PresenceData } from "discord.js";

export class Bot {
  private static client: Discord.Client;

  // starts the bot
  public static async start() {
    dotenv.config();
    await this.createClient();

    console.log("Bot up and running.");
  }

  // load the command modules for the bot
  private static async loadCommandModules() {
    this.client.on("message", async (message) => {
      // embeds
      async function rulesEmbeds() {
        if (
          message.content === `${COMMAND_PREFIX}rules` &&
          message.member.permissions.has(["ADMINISTRATOR"])
        ) {
          const socialRow = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setLabel("GitHub")
              .setStyle("LINK")
              .setURL("https://github.com/buildergroop")
              .setEmoji("👨‍💻"),
            new Discord.MessageButton()
              .setLabel("Twitter")
              .setStyle("LINK")
              .setURL("https://twitter.com/buildergroop")
              .setEmoji("🐦"),
            new Discord.MessageButton()
              .setLabel("Website")
              .setStyle("LINK")
              .setURL("https://buildergroop.com")
              .setEmoji("🌐")
          );

          await message.channel.send(
            "https://images-ext-2.discordapp.net/external/HVfpoZA4O_9xB5YO2lxtt1cr81xnxGgKdVZEA_S9eEM/%3Fwidth%3D1694%26height%3D430/https/media.discordapp.net/attachments/913702607510466651/913877293619904613/Rules_And_Info.png?width=1484&height=377"
          );
          await message.channel.send({
            embeds: [
              {
                color: "#0099ff",
                title: "Welcome To Buildergroop",
                description:
                  "We're a community full of ambitious young builders, striving to make the world a better place through innovation.",
              },
            ],
            components: [socialRow],
          });
          await message.channel.send({
            embeds: [
              {
                color: "#535061",
                title: "Our Community Rules",
                description: RULES,
              },
            ],
          });
          await message.channel.send({
            embeds: [
              {
                color: "#535061",
                title: "What to do after joining",
                description: `
      Firstly, We highly recommend choosing some awesome roles over in <#913709531442315324>.
      
      Next, you should go ahead and introduce yourself over in <#${INTRODUCTIONS_CHANNEL_ID}>. By introducing yourself, you get access to exclusive buildergroop events and perks!

      Go to <#${ABOUT_CHANNEL_ID}> to learn more about the server.
                    `,
              },
            ],
          });
        }
      }

      rulesEmbeds();

      // handlers
      async function handleIntroduction() {
        if (message.channelId === INTRODUCTIONS_CHANNEL_ID) {
          await message.member?.roles.add("913766127451136002");
        }
      }
      handleIntroduction();
    });
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

    Bot.client.user?.setPresence(presence);
  }

  private static async createClient() {
    // set the client
    Bot.client = new Discord.Client({
      intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
      ],
      partials: ["CHANNEL", "MESSAGE", "REACTION", "USER", "GUILD_MEMBER"],
    });

    // when the client is created
    Bot.client.on("ready", async () => {
      await this.loadCommandModules();
      await this.setPresence();
    });

    // activate the client
    await Bot.client.login(process.env.TOKEN || "");
  }
}
