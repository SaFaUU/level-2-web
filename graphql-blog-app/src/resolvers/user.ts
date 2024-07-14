export const User = {
  posts: (parent: any, args: any, { prisma, userInfo }: any) => {
    const isMyProfile = parent.id === userInfo.userId;

    if (isMyProfile) {
      return prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
    } else {
      return prisma.post.findMany({
        where: {
          authorId: parent.id,
          published: true,
        },
      });
    }
  },
  profile: (parent: any, args: any, { prisma }: any) => {
    console.log("args: ", args);
    console.log("parent: ", parent);
    return prisma.profile.findUnique({
      where: {
        id: parent.id,
      },
    });
  },
};
