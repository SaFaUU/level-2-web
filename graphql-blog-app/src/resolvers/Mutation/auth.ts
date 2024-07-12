import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const authResolvers = {
  signup: async (parent: any, args: userInfo, { prisma }: any) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (existingUser) {
      return {
        userError: "User already exists",
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    const token = await jwtHelper.generateToken(
      { userId: newUser.id },
      config.jwt.secret as Secret
    );

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    return {
      userError: null,
      token,
    };
  },

  signin: async (parent: any, args: userInfo, { prisma }: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      return {
        userError: "User not found",
        token: null,
      };
    }

    const isMatch = await bcrypt.compare(args.password, user.password);

    if (!isMatch) {
      return {
        userError: "Incorrect password",
        token: null,
      };
    }

    const token = await jwtHelper.generateToken(
      { userId: user.id },
      config.jwt.secret as Secret
    );

    return {
      userError: null,
      token,
    };
  },
};
