// "use server";

import { FieldValues } from "react-hook-form";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    // cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const userInfo = await res.json();
  return userInfo;
};
