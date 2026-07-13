import { headers } from "next/headers";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}

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
