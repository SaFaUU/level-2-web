import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Filtering
  //   const andFiltering = await prisma.post.findMany({
  //     where: {
  //       AND: [
  //         {
  //           published: true,
  //         },
  //         {
  //           title: {
  //             contains: "My first post",
  //           },
  //         },
  //       ],
  //     },
  //   });
  //   console.log(andFiltering);
  //   const orFiltering = await prisma.post.findMany({
  //     where: {
  //       OR: [
  //         {
  //           published: true,
  //         },
  //         {
  //           title: {
  //             contains: "My first post",
  //           },
  //         },
  //       ],
  //     },
  //   });
  //   console.log(orFiltering);
  //   const notFiltering = await prisma.post.findMany({
  //     where: {
  //       NOT: {
  //         content: {
  //           contains: "Hello World",
  //         },
  //       },
  //     },
  //   });
  //   console.log(notFiltering);

  // starts with filtering
  //   const startsWith = await prisma.user.findMany({
  //     where: {
  //       email: {
  //         startsWith: "jen",
  //       },
  //     },
  //   });

  //   console.log(startsWith);

  // endswith Filtering
  //   const endswith = await prisma.user.findMany({
  //     where: {
  //       email: {
  //         endsWith: "@gmail.com",
  //       },
  //     },
  //   });
  //   console.log(endswith);

  // Equals Filtering
  //   const equalsFiltering = await prisma.user.findMany({
  //     where: {
  //       email: {
  //         equals: "jen@gmail.com",
  //       },
  //     },
  //   });
  //   console.log(equalsFiltering);

  //
  //   const userNameArray = ["jen", "jen2", "jen3"];
  //   const userNameFiltering = await prisma.user.findMany({
  //     where: {
  //       username: {
  //         in: userNameArray,
  //       },
  //     },
  //   });
  //   console.log(userNameFiltering);

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
  console.dir(inDepthData, { depth: Infinity });
};

main();
