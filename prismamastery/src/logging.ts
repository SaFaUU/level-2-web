import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", (e) => {
  console.log(e);
});

const main = async () => {
  const inDepthData = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    include: {
      Post: {
        include: {
          postCategory: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
  //   console.dir(inDepthData, { depth: Infinity });
};

main();
