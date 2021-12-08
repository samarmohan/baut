import { Bot } from "./Bot";

async function main() {
  await Bot.start();
}

main().catch((err) => console.error(err));
