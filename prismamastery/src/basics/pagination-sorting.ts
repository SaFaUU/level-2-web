import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const paginationSorting = async () => {
  // Offset Based Pagination
  const getAllFromDB = await prisma.post.findMany({
    orderBy: {
      id: "asc",
    },
    take: 2,
    skip: 1,
  });
  //   console.log(getAllFromDB);

  // Curson Based Pagination
  const cursorData = await prisma.post.findMany({
    orderBy: {
      id: "asc",
    },
    take: 2,
    skip: 2,
    cursor: {
      id: 1,
    },
  });
  console.log(cursorData);
};

paginationSorting();
