import { User } from "@prisma/client";
import { prisma } from "..";
import DataLoader from "dataloader";

const batchUsers = async (ids: number[]): Promise<User[]> => {
  // ids: [10, 11, 12, 13]

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  /*
  {
    1: {id: 10, name: 'John'},
    2: {id: 11, name: 'Jane'},
    3: {id: 12, name: 'Jack'},
    4: {id: 13, name: 'Jill'},
  }
  */
  const userData: { [key: string]: User } = {};

  users.forEach((user) => {
    userData[user.id] = user;
  });

  return ids.map((id) => userData[id]);
};

//@ts-ignore
export const userLoader = new DataLoader<number, User>(batchUsers);
