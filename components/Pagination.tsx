"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (totalPages <= 1) {
    return null;
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Meetings pagination"
      className="mt-8 flex items-center justify-center gap-4"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
        >
          ← Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-muted opacity-50"
        >
          ← Previous
        </span>
      )}

      <span className="text-sm font-medium" aria-current="page">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
        >
          Next →
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-muted opacity-50"
        >
          Next →
        </span>
      )}
    </nav>
  );
}
