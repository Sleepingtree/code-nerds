import { db } from "~/server/db";

/**
 * Represents a guild or sever in discord. For now the bot is being coded to work on one main server.
 * @see https://discord.js.org/#/docs/discord.js/main/class/Guild
 */
export interface DiscordGuild {
  serverId: string;
  name: string;
}

export const guildCollection = db
  .db()
  .collection<DiscordGuild>("discord_guild");
