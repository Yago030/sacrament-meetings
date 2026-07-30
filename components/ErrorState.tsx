"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorStateProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorState({ error, reset }: ErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-primary">Something went wrong</h2>

      <p className="mt-4 text-muted">
        {error.message || "We ran into an unexpected error. Please try again."}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-md border border-border px-6 py-3 font-medium hover:bg-secondary"
        >
          Back to Meetings
        </Link>
      </div>
    </section>
  );
}
