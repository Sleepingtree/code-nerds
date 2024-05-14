import { db } from "~/server/db";

/**
 * Represents a discord role form a discord guild/server
 * @see https://discord.js.org/#/docs/discord.js/main/class/Role
 */
export interface DiscordRole {
  name: string;
  discordGuildId: string;
  roleId: string;
}

export const roleCollection = db.db().collection<DiscordRole>("discord_role");
