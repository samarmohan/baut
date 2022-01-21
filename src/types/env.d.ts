declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
    readonly TOKEN_PROD: string;
    readonly TOKEN_DEV: string;
    readonly GUILD_DEV: string;
    readonly GUILD_PROD: string;
  }
}
