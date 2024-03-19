import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const result = await prisma.user.aggregate({
    _avg: {
      age: true,
    },
  });

  console.log(result);
};

main();
