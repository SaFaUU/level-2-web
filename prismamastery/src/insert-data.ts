const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Insert users
  const user1 = await prisma.user.create({
    data: {
      username: "john_doe",
      email: "john@example.com",
      age: 30,
      role: "user",
      profile: {
        create: {
          bio: "Software Engineer",
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "jane_smith",
      email: "jane@example.com",
      age: 25,
      role: "admin",
      profile: {
        create: {
          bio: "Marketing Specialist",
        },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: "alice_green",
      email: "alice@example.com",
      age: 28,
      role: "user",
      profile: {
        create: {
          bio: "Graphic Designer",
        },
      },
    },
  });

  // Insert posts
  const post1 = await prisma.post.create({
    data: {
      title: "Introduction to Prisma",
      content: "Prisma is a modern database toolkit.",
      published: true,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "GraphQL Basics",
      content: "Learn the fundamentals of GraphQL.",
      published: false,
      authorId: user2.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: "Building RESTful APIs",
      content: "Best practices for designing RESTful APIs.",
      published: true,
      authorId: user3.id,
    },
  });

  // Insert categories
  const category1 = await prisma.category.create({
    data: {
      name: "Technology",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Marketing",
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: "Design",
    },
  });

  // Insert post-category relationships
  await prisma.postCategory.createMany({
    data: [
      { postId: post1.id, categoryId: category1.id },
      { postId: post2.id, categoryId: category1.id },
      { postId: post3.id, categoryId: category1.id },
      { postId: post2.id, categoryId: category2.id },
      { postId: post3.id, categoryId: category3.id },
    ],
  });

  console.log("Sample data inserted successfully!");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
