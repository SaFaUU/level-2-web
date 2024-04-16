import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Fluent API
  // const result = await prisma.user.findUnique({
  //   where: {
  //     id: 1,
  //   },
  //   include: {
  //     Post: true,
  //   },
  // });
  // console.log(result);

  //relational filters
  const publishedPostUsers = await prisma.user.findMany({
    include: {
      Post: {
        where: {
          published: true,
        },
      },
    },
  });
  console.dir(publishedPostUsers, { depth: Infinity });
};

main();
