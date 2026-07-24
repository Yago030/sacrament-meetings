import MeetingCard from "@/components/MeetingCard";
import { getBaseUrl } from "@/lib/get-base-url";
import type { SacramentMeeting } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function MeetingsPage() {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load meetings.");
  }

  const meetings: SacramentMeeting[] = await response.json();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
        />
      ))}
    </div>
  );
}
