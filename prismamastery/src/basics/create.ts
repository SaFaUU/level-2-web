import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Create Multiple Data into DB
  const result = await prisma.post.createMany({
    data: [
      {
        title: "My first post",
        content: "Hello World",
        published: true,
      },
      {
        title: "My second post",
        content: "Hello World",
        published: true,
      },
      {
        title: "My third post",
        content: "Hello World",
        published: true,
      },
    ],
  });
  console.log(result);
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
