import { PrismaClient } from "@prisma/client";

export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  getSingleUser: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(args.id),
      },
    });
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  },
  me: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return null;
    }
    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return null;
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: userInfo.userId,
      },
    });
    console.log(profile);
    return profile;
  },
};
