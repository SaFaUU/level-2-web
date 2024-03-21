import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const group = await prisma.post.groupBy({
    by: ["published"],
    _count: {
      _all: true,
    },
    having: {
      authorId: {
        _sum: {
          gt: 1,
        },
      },
    },
  });
  console.log(group);
};

main();
