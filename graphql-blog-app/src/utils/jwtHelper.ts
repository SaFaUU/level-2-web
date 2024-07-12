import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

export const generateToken = async (
  payload: { userId: number },
  secret: Secret
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token;
};

export const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, config.jwt.secret as Secret) as {
      userId: number;
    };
    return userData;
  } catch {
    return null;
  }
};

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
