import { createRouter } from "./context";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

export const linksRouter = createRouter().mutation("create-link", {
  input: z.object({
    url: z
      .string()
      .regex(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
        "That URL isn't valid!"
      ),
  }),
  async resolve({ input, ctx: { prisma } }) {
    const existing = await prisma.link.findUnique({
      where: { url: input.url}
    })
    
    if (existing) return existing;
    
    const firstUnused = await prisma.link.findFirst({
      where: { url: null },
    })

    return await prisma.link.update({
      where: { id: firstUnused?.id },
      data: {
        url: input.url, 
        updatedAt: new Date()
      }
    })
  },
});
