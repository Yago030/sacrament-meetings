import type { Metadata } from "next";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings } from "@/lib/meetings-db";
import { getOptionalSession } from "@/lib/dal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "Browse, search, and page through every scheduled sacrament meeting.",
};

interface Props {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function MeetingsPage({ searchParams }: Props) {
  const { query, page } = await searchParams;

  const [{ meetings, currentPage, totalPages }, session] = await Promise.all([
    getMeetings({ query, page: page ? Number(page) : 1 }),
    getOptionalSession(),
  ]);

  const isAdmin = Boolean(session);

  return (
    <div>
      <MeetingSearch />

      {meetings.length === 0 ? (
        <p className="py-12 text-center text-muted">No meetings found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} isAdmin={isAdmin} />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
