import { Client, GatewayIntentBits } from "discord.js";
import { env } from "~/env";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.login(env.DISCORD_BOT_TOKEN);

export default client;
