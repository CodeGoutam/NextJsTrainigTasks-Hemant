import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/",
  "/image-gallery",
  "/users",
  "/form",
  "/parallel-routes",
];

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const isLoggedIn = !!session?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  // ✅ Ignore auth check for auth pages
  if (isAuthPage) {
    return NextResponse.next();
  }

  // ✅ Redirect if on a protected page and not logged in
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
