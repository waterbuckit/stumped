import { createRouter } from "./context";
import { z } from "zod";

export const linksRouter = createRouter()
  .mutation('create-link', {
    input: z
      .object({
        url: z.string().url('That URL isn\'t valid!').nullish(),
      }),
    resolve({ input }) {
      console.log(input)
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });
