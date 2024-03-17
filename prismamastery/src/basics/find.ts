import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Find All
  const getAllFromDB = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
    },
  });
  console.log(getAllFromDB);

  // find first
  // const findFirst = await prisma.post.findFirst({
  //   where: {
  //     published: true,
  //   },
  // });
  // console.log({ findFirst });

  // Find First or Throw
  // const findFirstOrThrow = await prisma.post.findFirstOrThrow({
  //   where: {
  //     published: true,
  //   },
  // });
  // console.log({ findFirstOrThrow });

  // // find unique
  // const findUnique = await prisma.post.findUnique({
  //   where: {
  //     id: 1,
  //   },
  // });
  // console.log({
  //   findUnique,
  // });

  // // Find Unique or Throw Error
  // const findUniqueOrThrow = await prisma.post.findUniqueOrThrow({
  //   where: {
  //     id: 1,
  //   },
  // });
  // console.log({
  //   findUniqueOrThrow,
  // });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
