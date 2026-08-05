import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "./session";

/**
 * Verifies the current request has a valid bishopric session.
 * Redirects to /login when there isn't one.
 *
 * Memoized per request with React's `cache` so calling it multiple times
 * during a single render (layout + page + action) only reads the cookie once.
 */
export const verifySession = cache(async () => {
  const session = await getSession();

  if (!session?.email) {
    redirect("/login");
  }

  return { isAuth: true, email: session.email };
});

/**
 * Optimistic, non-redirecting check for UI branches (e.g. showing/hiding the
 * Edit and Delete controls on public pages). Never throws.
 */
export const getOptionalSession = cache(async () => {
  const session = await getSession();
  return session?.email ? { email: session.email } : null;
});
