"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-6">
      <label htmlFor="meeting-search" className="sr-only">
        Search meetings by speaker, presiding, conducting, or meeting type
      </label>

      <input
        id="meeting-search"
        type="text"
        placeholder="Search by speaker, presiding, conducting, or type..."
        aria-label="Search meetings by speaker, presiding, conducting, or meeting type"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-md border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
