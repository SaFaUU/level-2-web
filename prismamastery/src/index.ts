import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Creating a user
  //   const user = await prisma.user.create({
  //     data: {
  //       email: "jen2@gmail.com",
  //       username: "jen2",
  //       role: UserRole.user,
  //     },
  //   });
  //   console.log(user);
  // Creating a Profile
  //   const createProfile = await prisma.profile.create({
  //     data: {
  //       bio: "Hello World",
  //       userId: 1,
  //     },
  //   });
  //   console.log(createProfile);
  //   const createCategory = await prisma.category.create({
  //     data: {
  //       name: "Software Engineering",
  //     },
  //   });
  //   console.log(createCategory);

  const createPost = await prisma.post.create({
    data: {
      title: "My first post",
      content: "Hello World",
      published: true,
      authorId: 1,
      postCategory: {
        create: [
          {
            categoryId: 1,
          },
          {
            categoryId: 2,
          },
        ],
      },
    },
    include: {
      author: true,
      postCategory: true,
    },
  });
  console.log(createPost);
};

main();
