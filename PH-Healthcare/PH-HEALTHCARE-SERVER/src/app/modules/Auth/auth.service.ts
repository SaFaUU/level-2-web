import { UserStatus } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import emailSender from "./emailSender";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Incorrect email or password");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_access_Secret!,
    config.jwt.jwt_access_expiration!
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_refresh_Secret!,
    config.jwt.jwt_refresh_expiration!
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_Secret!
    ) as JwtPayload;
  } catch (err) {
    throw new Error("You are not Authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET!,
    "1d"
  );
  return {
    accessToken: accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Incorrect old password");
  }

  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
      status: UserStatus.ACTIVE,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPasswordToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_reset_Secret!,
    config.jwt.jwt_reset_expiration!
  );

  const resetPassLink = `${config.reset_pass_link}?userId=${userData.id}&token=${resetPasswordToken}`;
  await emailSender(
    userData.email,
    `
    <div>
    <p>Click on the below link to reset your password.</p> 
    <a href="${resetPassLink}">
    <button>Reset Password</button>
    </a>
    </div>
    `
  );

  console.log(resetPassLink);
};

const resetPassword = async (
  token: string,
  payload: {
    id: string;
    password: string;
  }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.jwt_reset_Secret!
  ) as JwtPayload;

  if (isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid token");
  }

  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
      status: UserStatus.ACTIVE,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully",
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
