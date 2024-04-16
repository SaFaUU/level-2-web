import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //   const posts = await prisma.$queryRaw`
  //     SELECT * FROM "posts"
  //     `;
  //   console.log(posts);

  // Deleter users Data
  await prisma.$queryRaw`TRUNCATE TABLE "users" CASCADE`;
};

main();
