declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
    readonly DEVELOPMENT_GUILD_ID: string;
    readonly DISCORD_TOKEN: string;
  }
}
