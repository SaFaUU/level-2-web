import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {},
  Mutation: {
    signup: async (parent: any, args: any, context: any) => {
      console.log(args);
      const user = await prisma.user.create({
        data: args,
      });
      return user;
    },
  },
};
