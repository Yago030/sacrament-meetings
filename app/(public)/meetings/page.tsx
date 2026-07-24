import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function MeetingsPage({ searchParams }: Props) {
  const { query, page } = await searchParams;

  const { meetings, currentPage, totalPages } = await getMeetings({
    query,
    page: page ? Number(page) : 1,
  });

  return (
    <div>
      <MeetingSearch />

      {meetings.length === 0 ? (
        <p className="py-12 text-center text-muted">No meetings found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
