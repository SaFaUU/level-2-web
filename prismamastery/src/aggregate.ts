import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Get Average Age
  // const result = await prisma.user.aggregate({
  //   _avg: {
  //     age: true,
  //   },
  // });

  // console.log(result);

  // Get sum of age
  // const sumAge = await prisma.user.aggregate({
  //   _sum: {
  //     age: true,
  //   },
  // });
  // console.log(sumAge);

  // find count
  // const coundAge = await prisma.user.aggregate({
  //   _count: {
  //     age: true,
  //   },
  // });
  // console.log(coundAge);

  // const countData = await prisma.user.count();
  // console.log(countData);

  // find max age
  const maxAge = await prisma.user.aggregate({
    _max: {
      age: true,
    },
  });

  console.log(maxAge);

  const minAge = await prisma.user.aggregate({
    _min: {
      age: true,
    },
    where: {
      role: "admin",
    },
  });

  console.log(minAge);
};

main();
