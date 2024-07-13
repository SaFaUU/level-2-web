export const Profile = {
  user: (parent: any, args: any, { prisma }: any) => {
    return prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
