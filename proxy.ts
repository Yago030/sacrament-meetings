import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Routes that require a signed-in bishopric session.
const PROTECTED_ROUTES = ["/meetings/new"];

// Routes an already-authenticated user shouldn't need to see again.
const AUTH_ROUTES = ["/login"];

function isProtectedRoute(pathname: string): boolean {
  if (PROTECTED_ROUTES.includes(pathname)) return true;
  // Matches /meetings/<id>/edit
  return /^\/meetings\/[^/]+\/edit$/.test(pathname);
}

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get("session")?.value;
  if (!cookie) return false;

  const secretKey = process.env.SESSION_SECRET;
  if (!secretKey) return false;

  try {
    await jwtVerify(cookie, new TextEncoder().encode(secretKey), {
      algorithms: ["HS256"],
    });
    return true;
  } catch {
    return false;
  }
}

// This is an optimistic check only (reads the cookie, doesn't hit the
// database). The Data Access Layer (lib/dal.ts) re-verifies the session
// server-side before any admin page renders or mutation runs.
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = await hasValidSession(request);

  if (isProtectedRoute(pathname) && !authed) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (AUTH_ROUTES.includes(pathname) && authed) {
    return NextResponse.redirect(new URL("/meetings", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
