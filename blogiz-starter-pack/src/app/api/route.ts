import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    message: "Hello from Server",
  });
};

export const Post = async () => {
  return NextResponse.json({
    message: "Hello from Server",
  });
};

export const DELETE = async () => {
  return NextResponse.json({
    message: "Hello from Server",
  });
};

export const PUT = async () => {
  return NextResponse.json({
    message: "Hello from Server",
  });
};
