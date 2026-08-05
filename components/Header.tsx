import Link from "next/link";
import NavLinks from "./NavLinks";
import SignOutButton from "./SignOutButton";
import { getOptionalSession } from "@/lib/dal";

export default async function Header() {
  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const session = await getOptionalSession();

  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-2xl font-bold text-primary">
            Springfield Ward
          </p>

          <p className="text-sm text-muted">
            Sacrament Meeting Planner
          </p>

          <p className="mt-1 text-sm text-muted">
            {currentDate}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <NavLinks />
          {session ? <SignOutButton /> : (
            <Link
              href="/login"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Bishopric Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}