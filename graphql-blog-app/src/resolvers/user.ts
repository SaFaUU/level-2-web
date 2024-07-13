export const User = {
  posts: (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log("userInfo: ", userInfo);
    console.log("parent", parent);
    const isMyProfile = parent.id === userInfo.userId;
    console.log(isMyProfile);
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
    console.log("parent: ", parent);
    return prisma.profile.findUnique({
      where: {
        userId: parent.id,
      },
    });
  },
};
