"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/meetings",
    label: "Meetings",
  },
  {
    href: "/meetings/current",
    label: "Current Meeting",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-wrap items-center gap-3">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}