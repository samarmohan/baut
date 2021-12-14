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
- Change your nickname to the format: \`[name] - [what you're working on]\`

- Choose some awesome roles over in <#913709531442315324>.

- Introduce yourself over in <#${INTRODUCTIONS_CHANNEL_ID}>.

- Go to <#${ABOUT_CHANNEL_ID}> to learn more about the server.
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
          collected: Discord.ButtonInteraction<Discord.CacheType>,
          type: "single_select" | "multi_select" = "multi_select",
          roleIdArr: string[] = []
        ) => {
          const guild = await this.client.guilds.fetch(collected.guildId);
          const member = await guild.members.fetch(collected.user.id);

          const roleToAdd = member.guild.roles.cache.get(roleId);

          if (type === "multi_select") {
            member.roles.add(roleToAdd);

            await collected.reply({
              ephemeral: true,
              content: `Gave you the **${roleToAdd.name}** role.`,
            });
          }

          if (type === "single_select") {
            const existingRole = member.roles.cache.find((role) =>
              roleIdArr.includes(role.id)
            );

            if (existingRole) {
              await member.roles.remove(existingRole);
              await member.roles.add(roleToAdd);

              if (existingRole.id === roleId) {
                await collected.reply({
                  ephemeral: true,
                  content: `You already have that role!`,
                });
              } else {
                await collected.reply({
                  ephemeral: true,
                  content: `Gave you the **${roleToAdd.name}** role.`,
                });
              }
            } else {
              await member.roles.add(roleToAdd);
              await collected.reply({
                ephemeral: true,
                content: `Gave you the **${roleToAdd.name}** role.`,
              });
            }
          }
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
              footer: {
                text: "Multi Select",
              },
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
              footer: {
                text: "Single Select",
              },
            },
          ],
          components: [locationRow1, locationRow2],
        });
        const locationCollector =
          locationMessage.createMessageComponentCollector({
            componentType: "BUTTON",
          });

        locationCollector.on("collect", async (collected) => {
          // a variabe containing the role ids for all the continents
          const roleIdArr = [
            roleIds.africa,
            roleIds.antartica,
            roleIds.asia,
            roleIds.europe,
            roleIds.north_america,
            roleIds.oceania,
            roleIds.south_america,
          ];

          if (collected.customId === "North America") {
            await addRole(
              roleIds.north_america,
              collected,
              "single_select",
              roleIdArr
            );
          }
          if (collected.customId === "South America") {
            await addRole(
              roleIds.south_america,
              collected,
              "single_select",
              roleIdArr
            );
          }
          if (collected.customId === "Europe") {
            await addRole(
              roleIds.europe,
              collected,
              "single_select",
              roleIdArr
            );
          }
          if (collected.customId === "Oceania") {
            await addRole(
              roleIds.oceania,
              collected,
              "single_select",
              roleIdArr
            );
          }
          if (collected.customId === "Asia") {
            await addRole(roleIds.asia, collected, "single_select", roleIdArr);
          }
          if (collected.customId === "Antartica") {
            await addRole(
              roleIds.antartica,
              collected,
              "single_select",
              roleIdArr
            );
          }
          if (collected.customId === "Africa") {
            await addRole(
              roleIds.africa,
              collected,
              "single_select",
              roleIdArr
            );
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
              footer: {
                text: "Single/Multi Select",
              },
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
              footer: {
                text: "Single Select",
              },
            },
          ],
          components: [experienceRow],
        });
        const experienceCollector =
          experienceMessage.createMessageComponentCollector({
            componentType: "BUTTON",
          });

        experienceCollector.on("collect", async (collected) => {
          const roleIdArr = [
            roleIds["exp1-2"],
            roleIds["exp3-5"],
            roleIds["exp6-8"],
            roleIds["exp9+"],
          ];

          if (collected.customId === "1-2yrs") {
            addRole(roleIds["exp1-2"], collected, "single_select", roleIdArr);
          }
          if (collected.customId === "3-5yrs") {
            addRole(roleIds["exp3-5"], collected, "single_select", roleIdArr);
          }
          if (collected.customId === "6-8yrs") {
            addRole(roleIds["exp6-8"], collected, "single_select", roleIdArr);
          }
          if (collected.customId === "9+yrs") {
            addRole(roleIds["exp9+"], collected, "single_select", roleIdArr);
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
              footer: {
                text: "Multi Select",
              },
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

      if (
        message.content === `${COMMAND_PREFIX}intro_template` &&
        message.member.permissions.has(["ADMINISTRATOR"])
      ) {
        message.delete();

        await message.channel.send({
          embeds: [
            {
              title: "Your Introduction",
              description: `
In order to maintain consistency and include all necessary aspects of an intro, we recommend covering the following:

**Basics**
Mention your name, where you're located, and anything else you might want to add

**What you're working on**
List whatever you're building or creating at the moment

**What you use**
Mention the tools or technologies you work with on a daily basis

**Hobbies**
What you like to do in your free time

**Where people can find you**
Link your social media accounts

**Final Remarks**
Conclude your introduction with any final statements you might like to add.


`,
              footer: {
                text: "Feel free to make this as concise or elaborate as you want, while covering the necessary fields.",
              },
            },
          ],
        });
      }

      /** HANDLERS */
      async function handleIntroduction() {
        if (message.channelId === INTRODUCTIONS_CHANNEL_ID) {
          const member = message.member;

          const notEligibleRole = member.guild.roles.cache.get(
            roleIds.not_eligible
          );
          const eligibleRole = member.guild.roles.cache.get(roleIds.eligible);

          await member.roles.remove(notEligibleRole);
          await member.roles.add(eligibleRole);
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
