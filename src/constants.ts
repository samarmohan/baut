import { rolesDev, rolesProd } from "./guild";

export const env = process.env;
export const isProd = env.NODE_ENV === "production";
export const token = isProd ? env.TOKEN_PROD : env.TOKEN_DEV;

export const roles = isProd ? rolesProd : rolesDev;
