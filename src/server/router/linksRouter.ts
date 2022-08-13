import { createRouter } from "./context";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const chars =
  "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890".split("");

const generateUrl = (): string =>
  new Array<string>(7)
    .fill("")
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");

const createUrl = async (input: { url: string }, prisma: PrismaClient) => {
  return await prisma.link.create({
    data: {
      url: input.url,
      urlIndex: generateUrl(),
      // urlIndex: "1231",
    },
  });
};

export const linksRouter = createRouter().mutation("create-link", {
  input: z.object({
    url: z.string().url("That URL isn't valid!"),
  }),
  async resolve({ input, ctx: { prisma } }) {
    while (true) {
      try {
        createUrl(input, prisma);
        break;
      } catch (e) {}
    }
  },
});
