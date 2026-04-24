import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const protectedPaths = ["/dashboard", "/pets", "/appointments", "/services", "/admin"];
  const isProtected = protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p));
  const hasSession = Boolean(req.cookies.get("sigsc_session")?.value);
  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/pets/:path*", "/appointments/:path*", "/services/:path*", "/admin/:path*"],
};
