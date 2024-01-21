import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.log(error);
  }
};
