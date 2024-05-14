import { Guild } from "discord.js";
import { guildCollection } from "~/entities/guilds";
import { roleCollection } from "~/entities/role";
import bot from "~/server/discordBot";

export default async function pushRolesToDB() {
  const guildsOAuth = await bot.guilds.fetch();
  const guilds = await Promise.allSettled(
    guildsOAuth.map(async (guildAuth) => await guildAuth.fetch()),
  );

  const rejectedGuilds = guilds.filter(
    (guilds) => guilds.status === "rejected",
  ) as PromiseRejectedResult[];

  if (rejectedGuilds.length > 0) {
    console.log(
      `Got rejected guilds ${rejectedGuilds.map((guild) => `${guild.reason}`)}`,
    );
  }

  const resGuilds = (
    guilds.filter(
      (guild) => guild.status === "fulfilled",
    ) as PromiseFulfilledResult<Guild>[]
  ).map((guild) => guild.value);

  await Promise.allSettled(
    resGuilds.map(async (guild) => {
      console.log(`updating guild with guild: ${guild.id}`);
      await guildCollection.updateOne(
        { discordId: guild.id },
        {
          $set: {
            serverId: guild.id,
            name: guild.name,
          },
        },
        { upsert: true },
      );

      const roles = await guild.roles.fetch();
      console.log(`got roles ${roles}`);
      await Promise.allSettled(
        roles.map(async (role) => {
          return await roleCollection.updateOne(
            { roleId: role.id },
            {
              $set: {
                discordGuildId: guild.id,
                name: role.name,
              },
            },
            { upsert: true },
          );
        }),
      );
    }),
  );
}
