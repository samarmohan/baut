import * as Discord from "discord.js";
import * as dotenv from "dotenv";

import {
  ABOUT_CHANNEL_ID,
  COMMAND_PREFIX,
  INTRODUCTIONS_CHANNEL_ID,
  roleIds,
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

  // load the modules for the bot
  private static async loadModules() {
    this.client.on("message", async (message) => {
      /** EMBEDS */

      // rules embed
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

      // roles embeds
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

        const addRole = async (
          roleId: string,
          collected: Discord.ButtonInteraction<Discord.CacheType>
        ) => {
          const guild = await this.client.guilds.fetch(collected.guildId);
          const member = await guild.members.fetch(collected.user.id);
          member.roles.add(roleId);

          collected.reply({
            ephemeral: true,
            content: `Gave you the **${
              (await guild.roles.fetch(roleId)).name
            }** role.`,
          });
        };

        const sendDivider = async () => {
          await message.channel.send(`
__
__
          `);
        };

        await message.channel.send(
          "https://media.discordapp.net/attachments/913709531442315324/916712730713534494/Roles_Poster.png"
        );

        const whoAreYouMessage = await message.channel.send({
          embeds: [
            {
              color: "#535061",
              title: "Who Are You?",
              description: "Choose what best defines your career.",
            },
          ],
          components: [whoAreYouRow],
        });
        const whoAreYouCollector =
          whoAreYouMessage.createMessageComponentCollector({
            componentType: "BUTTON",
          });

        whoAreYouCollector.on("collect", async (collected) => {
          if (collected.customId === "developer") {
            addRole(roleIds.developer, collected);
          }
          if (collected.customId === "designer") {
            addRole(roleIds.designer, collected);
          }
          if (collected.customId === "entrepreneur") {
            addRole(roleIds.entrepreneur, collected);
          }
          if (collected.customId === "creator") {
            addRole(roleIds.creator, collected);
          }
        });

        whoAreYouCollector.on("end", (collected) => {
          console.log(`Collected ${collected.size} interactions.`);
        });

        sendDivider();

        const locationMessage = await message.channel.send({
          embeds: [
            {
              color: "#535061",
              title: "Where are you located?",
              description: "Choose what continent you live in.",
            },
          ],
          components: [locationRow1, locationRow2],
        });
        const locationCollector =
          locationMessage.createMessageComponentCollector({
            componentType: "BUTTON",
          });

        locationCollector.on("collect", async (collected) => {
          if (collected.customId === "North America") {
            addRole(roleIds.north_america, collected);
          }
          if (collected.customId === "South America") {
            addRole(roleIds.south_america, collected);
          }
          if (collected.customId === "Europe") {
            addRole(roleIds.europe, collected);
          }
          if (collected.customId === "Oceania") {
            addRole(roleIds.oceania, collected);
          }
          if (collected.customId === "Asia") {
            addRole(roleIds.asia, collected);
          }
          if (collected.customId === "Antartica") {
            addRole(roleIds.antartica, collected);
          }
          if (collected.customId === "Africa") {
            addRole(roleIds.africa, collected);
          }
        });

        locationCollector.on("end", (collected) => {
          console.log(`Collected ${collected.size} interactions.`);
        });

        sendDivider();

        const pronounsMessage = await message.channel.send({
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
        const pronounsCollector =
          pronounsMessage.createMessageComponentCollector({
            componentType: "BUTTON",
          });

        pronounsCollector.on("collect", async (collected) => {
          if (collected.customId === "He/Him") {
            addRole(roleIds.he, collected);
          }
          if (collected.customId === "She/Her") {
            addRole(roleIds.she, collected);
          }
          if (collected.customId === "They/Them") {
            addRole(roleIds.they, collected);
          }
        });

        pronounsCollector.on("end", (collected) => {
          console.log(`Collected ${collected.size} interactions.`);
        });

        sendDivider();

        const experienceMessage = await message.channel.send({
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
        const experienceCollector =
          experienceMessage.createMessageComponentCollector({
            componentType: "BUTTON",
          });

        experienceCollector.on("collect", async (collected) => {
          if (collected.customId === "1-2yrs") {
            addRole(roleIds["exp1-2"], collected);
          }
          if (collected.customId === "3-5yrs") {
            addRole(roleIds["exp3-5"], collected);
          }
          if (collected.customId === "6-8yrs") {
            addRole(roleIds["exp6-8"], collected);
          }
          if (collected.customId === "9+yrs") {
            addRole(roleIds["exp9+"], collected);
          }
        });

        experienceCollector.on("end", (collected) => {
          console.log(`Collected ${collected.size} interactions.`);
        });

        sendDivider();

        const pingsMessage = await message.channel.send({
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
        const pingsCollector = pingsMessage.createMessageComponentCollector({
          componentType: "BUTTON",
        });

        pingsCollector.on("collect", async (collected) => {
          if (collected.customId === "Assistance Ping") {
            addRole(roleIds["assistance_ping"], collected);
          }
          if (collected.customId === "Announcement Ping") {
            addRole(roleIds["announcement_ping"], collected);
          }
          if (collected.customId === "Poll Ping") {
            addRole(roleIds["poll_ping"], collected);
          }
          if (collected.customId === "Server Inactivity Ping") {
            addRole(roleIds["inactivity_ping"], collected);
          }
        });
      }

      // about embeds
      if (
        message.content === `${COMMAND_PREFIX}about` &&
        message.member.permissions.has(["ADMINISTRATOR"])
      ) {
        await message.channel.send(
          "https://cdn.discordapp.com/attachments/913702607510466651/917787070850793522/About_Poster.png"
        );
        await message.channel.send({
          embeds: [
            {
              color: "#535061",
              title: "The Community",
              description:
                "We're all members of gen-z, trying to build things that make an impact, whether it's a volunteer organization, talent agency, or a platform for the future. Our community members encourage and assist one another in all of their endeavors; We collectively form a large and supportive family.",
            },
          ],
        });
        await message.channel.send({
          embeds: [
            {
              color: "#535061",
              title: "The Vibe",
              description:
                "We aspire to be a casual hangout space, as well as an encouraging hub for progress and dream chasing with plenty of networking opportunities.",
            },
          ],
        });
        await message.channel.send({
          embeds: [
            {
              color: "#535061",
              title: "The Name",
              description: `
Wtf is our name? It may look wonky, but it symbolizes a few notable things:

Firstly, it incorporates the fact that we're all building things, collectively.

The term also showcases that our community is specifically for young individuals due to the misspelling in the term "group".

Finally, it signifies our community is quite chill due to our very casual name.
`,
            },
          ],
        });
        await message.channel.send({
          embeds: [
            {
              color: "#0099ff",
              title:
                "Welcome to buildergroop - A community full of ambitious young builders, striving to make the world a better place through innovation.",
            },
          ],
        });
      }

      /** HANDLERS */
      async function handleIntroduction() {
        if (message.channelId === INTRODUCTIONS_CHANNEL_ID) {
          await message.member?.roles.remove(roleIds.not_eligible);
          await message.member?.roles.add(roleIds.eligible);
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
      await this.loadModules();
      await this.setPresence();
    });

    // activate the client
    await Bot.client.login(process.env.TOKEN || "");
  }
}
