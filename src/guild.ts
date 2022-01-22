/*
This file houses information such as ID's of specific entities (e.g roles, channels, etc) and other such information that is used throughout the bot. 
*/

import { EmbedMessages } from "./types";
import { RolesProd } from "./types/RolesProd";

export const rolesProd: RolesProd = {
  // Career
  career: [
    "913789663767040001", // programming
    "913791003633266729", // design
    "913791069378990100", // entrepreneurship
    "933713452285960213", // web3
    "933713354730659920", // finance
    "933712617573335051", // social media
    "913791371163336744", // creatorship
    "933983446798336020", // community building
  ],

  // Pronouns
  pronouns: {
    he: "914059764542095360",
    she: "914059977382043699",
    they: "914060117371125770",
    ask: "929317868720488459",
  },

  // Location
  location: {
    north_america: "914062801331453952",
    south_america: "914062822491693076",
    europe: "914062876480794634",
    oceania: "914062934479605760",
    asia: "914062611618889798",
    africa: "914062909162803260",
    antartica: "914063088960036915",
  },

  // Experience
  experience: {
    "1-2": "913788809882251285",
    "3-5": "914060415997210644",
    "6-8": "914060591491063808",
    "9+": "914061049949458462",
  },

  // Notifications
  notifications: {
    event_ping: "929265782226042890",
    inactivity_ping: "913788985036382268",
    assistance_ping: "913789046092886037",
    poll_ping: "913789194395074601",
    announcement_ping: "913789232311599128",
  },
  eligible: "913766127451136002",
  not_eligible: "920144177818390649",
};

export const rolesDev = {};

export const channels = {
  about: "913729308676202506",
  intros: "913701412578418718",
  rules: "913669662649237564",
  roles: "913709531442315324",
};

export const embedMessages: EmbedMessages = {
  rules: `
    Please read the following rules prior to interacting in the server.
    
    • Keep all messages and content SFW
    • Harassment and Hate Speech is prohibited
    • Do not share pirated/crack software and content
    • Discussing sensitive topics (civics, religion, health) or is frowned upon
    • No Spamming
    • No Doxxing
    • Send malicious links or viruses is prohibited
    • Refrain from using any language except English
    • Asking moderators for leniency in punishment is strictly disallowed
    • Use common sense
    • Follow Discord’s Terms of Service.
    
    The rules mentioned here only exist for the safety of members like you. They are subject to change at any time. Not being aware of the present list of rules is not a valid excuse to be protected from consequences.
    `,

  thankYou: `
    Thank you for joining us. Whether you're a rookie, or a professional, or somewhere in between, Buildergroop is the place for you.

    We wish to empower all the young developers, designers, entrepreneurs, community builders, and other awesome individuals out there that want to change the world.

    If you'd like to support our mission, you can send out this permanent invite link to anyone that might find Buildergroop interesting: https://buildergroop.com

    Let's get this thing around the globe. It's time to make an impact.
`,
};

export const media = {
  rulesHeaderImage:
    "https://media.discordapp.net/attachments/913702607510466651/913877293619904613/Rules_And_Info.png",
};
