import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/login", "/register"];
const commonPrivateRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/doctors",
];

const roleBasedPrivateRoutes = {
  PATIENT: [/^\/dashboard\/patient\/.+/],
  DOCTOR: [/^\/dashboard\/doctor\/.+/],
  ADMIN: [/^\/dashboard\/admin\/.+/],
  SUPER_ADMIN: [/^\/dashboard\/super-admin\/.+/],
};

type Role = keyof typeof roleBasedPrivateRoutes;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  let decodedData = null;
  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role = decodedData?.role;

  // if (
  //   accessToken &&
  //   role == "admin" &&
  //   pathname.startsWith("/dashboard/admin")
  // ) {
  //   return NextResponse.next();
  // }

  // if (
  //   accessToken &&
  //   role == "doctor" &&
  //   pathname.startsWith("/dashboard/doctor")
  // ) {
  //   return NextResponse.next();
  // }

  // if (
  //   accessToken &&
  //   role == "patient" &&
  //   pathname.startsWith("/dashboard/patient")
  // ) {
  //   return NextResponse.next();
  // }

  // if (
  //   accessToken &&
  //   role == "super_admin" &&
  //   pathname.startsWith("/dashboard/super-admin")
  // ) {
  //   return NextResponse.next();
  // }

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];

    if (routes.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/dashboard/:page*", "/doctors/:page*"],
};
