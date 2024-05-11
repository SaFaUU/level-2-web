"use server";

import { FormValues } from "@/app/login/page";

export const loginUser = async (data: FormValues) => {
  const response = await fetch(`${process.env.BACKEND_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const userInfo = await response.json();
  return userInfo;
};
