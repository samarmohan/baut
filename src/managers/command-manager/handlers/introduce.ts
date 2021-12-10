import * as Discord from "discord.js";
import { INTRODUCTIONS_CHANNEL_ID } from "../../../constants";
import { CommandHandlerInterface } from "../interfaces/CommandHandlerInterface";

export default class IntroduceCommandHandler
  implements CommandHandlerInterface
{
  private data: {
    name?: string;
    location?: string;
    oneProject?: string;
    description?: string;
  } = {};

  aliases: string[] = ["introduce", "introduction", "intro"];
  description: string =
    "Introduce yourself to the community and obtain the 'Eligible' role, which would allow you to access cool perks and events.";

  async execute(message: Discord.Message, args: string[]): Promise<void> {
    // command verification functions
    if (!(await this.validateChannel(message))) return;

    // execute
    if (!(await this.startConvo(message))) return;
    await this.getIntroData(message);
    await this.endConvo(message);
  }

  /** Start conversation with user */
  private async startConvo(message: Discord.Message) {
    // send initial message
    await message.author.send({
      embed: {
        color: "#4D4AFA",
        title: "Welcome to buildergroop!",
        description:
          "It's lovely to have you! Please answer the questions I'm about to ask you in order to form an introduction.",
        footer: {
          text: 'Type "start" to start answering',
        },
        thumbnail: {
          url: "https://avatars.githubusercontent.com/u/95730312?s=200&v=4",
        },
      },
    });

    // get the conversation channel
    const convo = message.author.dmChannel;

    // wait for user to start

    let isExited = false;
    let reminderCount = 0;
    let success = false;

    while (!isExited) {
      const collected = await convo.awaitMessages(
        (m) => m.author.id === message.author.id,
        { max: 1, idle: 120000 }
      );

      // check to see if the user has started the convo
      if (collected?.first()?.content === "start") {
        isExited = true;
        success = true;
        reminderCount = 0;
      }

      if (!isExited) {
        // cancel the conversation if the user doesn't respond
        if (reminderCount >= 5) {
          isExited = true;
          success = false;
          await convo.send("Canceling introduction due to inactivity.");
        }

        // prompt the user to start if they dont send anything in 120 seconds
        reminderCount++;
        await convo.send("Please type 'start' to start answering");
      }
    }

    return success;
  }

  /** ask the user questions in their DM */
  private async getIntroData(message: Discord.Message) {
    // get the conversation channel
    const convo = message.author.dmChannel;

    // ask for users name
    const usersName = await this.askUserQuestion(
      convo,
      message,
      new Discord.MessageEmbed({
        title: "What is your name?",
        description:
          "If you'd prefer not to disclose your real identity, feel free to use an alias",
        color: "#ffffff",
      })
    );
    this.data.name = usersName;

    // ask for users location
    const usersLocation = await this.askUserQuestion(
      convo,
      message,
      new Discord.MessageEmbed({
        title: `Hey ${this.data.name}! Where are you from?`,
        description: "What is your location?",
        color: "#ffffff",
      })
    );
    this.data.location = usersLocation;

    // ask for one project the user is building
    const usersOneProject = await this.askUserQuestion(
      convo,
      message,
      new Discord.MessageEmbed({
        title: `Looking good! Now, name one thing you're working on.`,
        description:
          "What is the most significant thing you are working on right now? We use this to assign you a nickname.",
        footer: {
          text: " If there's nothing, type 'skip'.",
        },
        color: "#ffffff",
      })
    );
    if (usersOneProject != "skip") this.data.oneProject = usersOneProject;

    // ask for users description
    const usersDescription = await this.askUserQuestion(
      convo,
      message,
      new Discord.MessageEmbed({
        title: `Cool! Now, tell me a little more about yourself.`,
        description:
          "Write a short description covering your interests, endeavors, and anything else you'd like to share.",
        color: "#ffffff",
      })
    );
    this.data.description = usersDescription;

    // assign role to the message author
    // message.member.roles.add("913766127451136002");
  }

  private async endConvo(message: Discord.Message) {
    // give the user the role
    message.member.roles.add("913766127451136002");

    // generate the users nickname
    message.member.setNickname(
      `${
        this.data.oneProject
          ? this.data.name.substring(0, 15)
          : this.data.name.substring(0, 33)
      } ${
        this.data.oneProject &&
        `- ${this.data.oneProject.substring(0, 16) || ""}`
      }`
    );

    // send the end message
    await message.author.send({
      embed: {
        color: "#4D4AFA",
        title: "Thanks!",
        description:
          "You're now eligible for events and perks! I've posted your intro in the introductions channel so others can check it out.",
        footer: {
          text: "Have fun!",
        },
      },
    });
  }

  private async askUserQuestion(
    convo: Discord.DMChannel,
    message: Discord.Message,
    question: string | Discord.MessageEmbed
  ) {
    // send the question
    await convo.recipient.send(question);

    // await the response
    const collected = await convo.awaitMessages(
      (m) => m.author.id === message.author.id,
      { max: 1 }
    );

    // return the response
    return collected.first().content;
  }

  /** Form the intro and send it as an embed in the intros channel */
  private sendIntroEmbed(message: Discord.Message) {}

  /** Validate the channel the intro command was used in */
  private async validateChannel(message: Discord.Message) {
    if (message.channel.id !== INTRODUCTIONS_CHANNEL_ID) {
      const successMessage = await message.channel.send(
        `Please use this command in the <#${INTRODUCTIONS_CHANNEL_ID}> channel`
      );

      await successMessage.delete({ timeout: 3000 });

      await message.delete({ timeout: 3000 });

      console.log("intro command used in invalid channel");
      return false;
    }

    return true;
  }
}
