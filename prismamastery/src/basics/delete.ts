import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteData = async () => {
  //   const data = await prisma.post.delete({
  //     where: {
  //       id: 7,
  //     },
  //   });
  //   console.log(data);

  const data = await prisma.post.deleteMany({
    where: {
      id: {
        in: [8, 9],
      },
    },
  });
  console.log(data);
};

deleteData();
