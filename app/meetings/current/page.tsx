import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default function CurrentMeetingPage() {
  const today = new Date();

  const sunday = new Date(today);

  sunday.setDate(today.getDate() - today.getDay());

  const isoDate = sunday.toISOString().split("T")[0];
  const meetings = getMeetings();

  const meeting = meetings
    .filter(m => m.date <= isoDate)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  redirect("/meetings");
}