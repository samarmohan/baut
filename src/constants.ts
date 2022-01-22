import { rolesDev, rolesProd } from "./guild";

export const env = process.env;
export const isProd = env.NODE_ENV === "production"

export const roles = isProd ? rolesProd : rolesDev;
