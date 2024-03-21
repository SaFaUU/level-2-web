import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const createUser = prisma.user.create({
    data: {
      username: "safa",
      email: "safa@safa.com",
    },
  });

  const updateUser = prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      age: 30,
    },
  });

  const [userData, updatedData] = await prisma.$transaction([
    createUser,
    updateUser,
  ]);
  console.log(userData);
  console.log(updatedData);
};

main();
