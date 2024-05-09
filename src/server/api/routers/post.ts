import { ObjectId } from "mongodb";
import { z } from "zod";
import { postCollection } from "~/entites/post";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return postCollection.insertOne({
        createdBy: new ObjectId(ctx.session.user.id),
        name: input.name,
        createDate: new Date(),
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return postCollection.findOne(
      {
        createdBy: new ObjectId(ctx.session.user.id),
      },
      { sort: { createDate: -1 } },
    );
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
