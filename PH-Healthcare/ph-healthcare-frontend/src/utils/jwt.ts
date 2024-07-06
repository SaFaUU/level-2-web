import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export const decodedToken = (token: string) => {
  return jwtDecode(token);
};
