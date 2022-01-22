import { rolesDev, rolesProd } from "./guild";
import { Roles } from "./types/rolesProd";

export const env = process.env;
export const isProd = env.NODE_ENV === "production";
export const token = process.env.DISCORD_TOKEN;

export const roles: Roles = isProd ? rolesProd : (rolesDev as any);
