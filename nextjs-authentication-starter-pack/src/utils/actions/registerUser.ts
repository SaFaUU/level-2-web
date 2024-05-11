"use server";

export const registerUser = async (data: any) => {
  console.log(data);
  const response = await fetch(
    `${process.env.BACKEND_URL as string}/register`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const userInfo = await response.json();
  console.log(userInfo);
  return userInfo;
};
