# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Mongo](https://www.mongodb.com/docs/drivers/node/current/)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [discord OAtuh2](https://discord.com/developers/docs/topics/oauth2)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I set this up

1. download [bun](https://bun.sh/docs/installation)
1. run `bun install` from the poject root
1. create a .env file in the root of the project
1. go to discord developer Portal
   1. sign up
   1. create an application
   1. under OAuth2 copy the client Id and put it .env as `DISCORD_CLIENT_ID` in your .env
   1. click reset Secret and copy that id and put it in `DISCORD_CLIENT_SECRET` in your .env
   1. set redirects to `http://localhost:3000/api/auth/callback/discord` in the discord developer portal
   1. under OAuth2 URL Generator click bot then bot permissions click Administrator
   1. click the bot tab
   1. click reset token
   1. Put that token in .env as `DISCORD_BOT_TOKEN`
1. install [mongo](https://www.mongodb.com/docs/manual/installation/)

   1. include the service
   1. set `DATABASE_URL` in your .env to what ever you set the username and password to

      default is `mongodb://localhost:27017/code_nerds`

1. set the `NEXTAUTH_URL="http://localhost:3000"`
