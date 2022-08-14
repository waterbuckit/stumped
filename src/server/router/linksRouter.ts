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

const createUrl = (input: { url: string }, prisma: PrismaClient) => {
  return prisma.link.create({
    data: {
      url: input.url,
      urlIndex: generateUrl(),
    },
  });
};

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
    while (true) {
      try {
        return await createUrl(input, prisma);
      } catch (e) {}
    }
  },
});
