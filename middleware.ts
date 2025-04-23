import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("token")?.value;

  const isUser = !!authToken;

  // Define restricted routes for logged-in users
  const restrictedRoutes = ["/auth/signup", "/auth/login"];

  const url = request.nextUrl.clone();

  // If the user is authenticated and trying to access restricted routes, redirect them
  if (isUser && restrictedRoutes.includes(url.pathname)) {
    const dashboardUrl = new URL("/home", request.url); // or any other protected page
    return NextResponse.redirect(dashboardUrl);
  }

  // If the user is not authenticated and trying to access protected routes, redirect to login
  if (!isUser && !restrictedRoutes.includes(url.pathname)) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/signup",
    "/auth/login",
    "/home",
    // "/",
    "/chat",
    "/home/:path*",
    "/library",
    "/library/:path*",
    "/library",
    "/library/:path*",
    "/setting",
    "/setting/:path*",

    // "/:setting*",
    "/product",
  ],
};
