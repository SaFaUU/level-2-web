"use server";

export const userLogin = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userInfo = await res.json();
  return userInfo;
};
