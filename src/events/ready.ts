import Event from "../structures/Event";

export default new Event(
  {
    name: "ready",
    once: true,
  },
  async (mammot) => {
    console.log(`[INFO] ${mammot.client.user} is online!`);
  }
);
