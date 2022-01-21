import Event from "../structures/Event.js";

export default new Event(
  {
    name: "ready",
    once: true,
  },
  async (client) => {
    console.log(`[INFO] ${client.user.tag} is online!`);
  }
);
