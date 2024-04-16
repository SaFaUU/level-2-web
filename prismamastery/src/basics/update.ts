import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const update = async () => {
  //   const user = await prisma.post.update({
  //     where: {
  //       id: 1,
  //     },
  //     data: {
  //       published: true,
  //       content: "Hello World 3",
  //     },
  //   });
  //   console.log(user);
  //   const user = await prisma.post.updateMany({
  //     where: {
  //       authorName: "Jen",
  //     },
  //     data: {
  //       content: "Hello World 3",
  //     },
  //   });
  //   console.log(user);

  const upserData = await prisma.post.upsert({
    where: {
      id: 10,
    },
    update: {
      published: true,
      content: "Hello World 5",
    },
    create: {
      title: "My first post",
      content: "Hello World 4",
      published: true,
    },
  });
  console.log(upserData);
};

update();
