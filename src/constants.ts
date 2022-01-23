export const env = process.env;
export const isProd = env.NODE_ENV === "production";
export const token = process.env.DISCORD_TOKEN;
export const webhook = process.env.MEMBERS_WEBHOOK;
