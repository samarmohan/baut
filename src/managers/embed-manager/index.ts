// import * as Discord from "discord.js";

// export class EmbedManager {
//   private RULES = `
// Please read the following rules prior to interacting in the server.

// • Keep all messages and content SFW
// • Harassment and Hate Speech is prohibited
// • Do not share pirated/crack software and content
// • Discussing sensitive topics (civics, religion, health) or is frowned upon
// • No Spamming
// • No Doxxing
// • Send malicious links or viruses is prohibited
// • Refrain from using any language except English
// • Asking moderators for leniency in punishment is strictly disallowed
// • Use common sense
// • Follow Discord’s Terms of Service.

// The rules mentioned here only exist for the safety of members like you. They are subject to change at any time. Not being aware of the present list of rules is not a valid excuse to be protected from consequences.
// `;

//   public constructor(private client: Discord.Client) {
//     this.client.on("message", (message) => {});
//   }

//   private async sendRulesEmbed(message: Discord.Message) {
//     if (message.content === "rules") {
//       await message.channel.send(
//         "https://images-ext-2.discordapp.net/external/HVfpoZA4O_9xB5YO2lxtt1cr81xnxGgKdVZEA_S9eEM/%3Fwidth%3D1694%26height%3D430/https/media.discordapp.net/attachments/913702607510466651/913877293619904613/Rules_And_Info.png?width=1484&height=377"
//       );
//       await message.channel.send({
//         embeds: [
//           {
//             color: "#0099ff",
//             title: "Welcome To Buildergroop",
//             description:
//               "We're a community full of ambitious young builders, striving to make the world a better place through innovation.",
//           },
//         ],
//       });
//       await message.channel.send({
//         embeds: [
//           {
//             color: "#535061",
//             title: "Our Community Rules",
//             description: this.RULES,
//           },
//         ],
//       });
//       await message.channel.send({
//         embeds: [
//           {
//             color: "#535061",
//             title: "Socials",
//             description: "Find us on social media!",
//           },
//         ],
//       });
//     }
//   }
// }
