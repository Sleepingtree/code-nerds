import { Client, GatewayIntentBits } from "discord.js";
import { env } from "~/env";
import pushRolesToDB from "./discordBot/initRoles";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  pushRolesToDB();
});

client.login(env.DISCORD_BOT_TOKEN);

export default client;
