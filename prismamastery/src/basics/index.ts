import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //   const result = await prisma.post.create({
  //     data: {
  //       content: "Hello World",
  //       published: true,
  //       title: "My first post",
  //       authorName: "Jen",
  //     },
  //   });
  //   console.log(result);
  const getAllFromDB = await prisma.post.findMany();
  console.log(getAllFromDB);
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
