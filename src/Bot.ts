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

      async function rolesEmbeds() {
        if (
          message.content === `${COMMAND_PREFIX}roles` &&
          message.member.permissions.has(["ADMINISTRATOR"])
        ) {
          const whoAreYouRow = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setCustomId("developer")
              .setLabel("Developer")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("designer")
              .setLabel("Designer")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("entrepreneur")
              .setLabel("Entrepreneur")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("creator")
              .setLabel("Creator")
              .setStyle("SECONDARY")
          );

          const locationRow1 = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setCustomId("North America")
              .setLabel("North America")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("South America")
              .setLabel("South America")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("Europe")
              .setLabel("Europe")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("Oceania")
              .setLabel("Oceania")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("Asia")
              .setLabel("Asia")
              .setStyle("SECONDARY")
          );

          const locationRow2 = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setCustomId("Africa")
              .setLabel("Africa")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("Antartica")
              .setLabel("Antartica")
              .setStyle("SECONDARY")
          );

          const pronounsRow = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setCustomId("He/Him")
              .setLabel("He/Him")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("She/Her")
              .setLabel("She/Her")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("They/Them")
              .setLabel("They/Them")
              .setStyle("SECONDARY")
          );

          const experienceRow = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setCustomId("1-2yrs")
              .setLabel("1 - 2 Years")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("3-5yrs")
              .setLabel("3 - 5 Years")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("6-8yrs")
              .setLabel("6 - 8 Years")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("9+yrs")
              .setLabel("9+ Years")
              .setStyle("SECONDARY")
          );

          const pingsRow = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setCustomId("Server Inactivity Ping")
              .setLabel("Server Inactivity Ping")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("Assistance Ping")
              .setLabel("Assistance Ping")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("Poll Ping")
              .setLabel("Poll Ping")
              .setStyle("SECONDARY"),
            new Discord.MessageButton()
              .setCustomId("Announcement Ping")
              .setLabel("Announcement Ping")
              .setStyle("SECONDARY")
          );

          await message.channel.send(
            "https://media.discordapp.net/attachments/913709531442315324/916712730713534494/Roles_Poster.png"
          );
          await message.channel.send(`
__
__
          `);

          await message.channel.send({
            embeds: [
              {
                color: "#535061",
                title: "Who Are You?",
                description: "Choose what best defines your career.",
              },
            ],
            components: [whoAreYouRow],
          });
          await message.channel.send(`
__
__
          `);

          await message.channel.send({
            embeds: [
              {
                color: "#535061",
                title: "Where are you located?",
                description: "Choose what continent you live in.",
              },
            ],
            components: [locationRow1, locationRow2],
          });
          await message.channel.send(`
__
__
          `);

          await message.channel.send({
            embeds: [
              {
                color: "#535061",
                title: "What are your pronouns?",
                description:
                  "Select your pronouns (Skip if you'd rather not disclose).",
              },
            ],
            components: [pronounsRow],
          });
          await message.channel.send(`
__
__
          `);

          await message.channel.send({
            embeds: [
              {
                color: "#535061",
                title: "Choose your experience level",
                description:
                  "How much experience do you have in your current career(s)/hobby(s) (i.e Developer, Designer, Entrepreneur, Creator)?",
              },
            ],
            components: [experienceRow],
          });
          await message.channel.send(`
__
__
          `);

          await message.channel.send({
            embeds: [
              {
                color: "#535061",
                title: "Select Ping Roles",
                description:
                  "Choose which of the following you would like to be pinged for",
              },
            ],
            components: [pingsRow],
          });
        }
      }

      rulesEmbeds();
      rolesEmbeds();

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
