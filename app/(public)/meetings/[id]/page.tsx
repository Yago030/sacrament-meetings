import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetails";
import { getMeetingById } from "@/lib/meetings-db";
import { getOptionalSession } from "@/lib/dal";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    return { title: "Meeting Not Found" };
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(meeting.date));

  const title = `${meeting.meetingType.charAt(0).toUpperCase()}${meeting.meetingType.slice(1)} Meeting — ${formattedDate}`;

  return {
    title,
    description: `Program details for the ${formattedDate} sacrament meeting: hymns, speakers, and ward business.`,
  };
}

export default async function MeetingPage({ params }: Props) {
  const { id } = await params;

  const [meeting, session] = await Promise.all([
    getMeetingById(Number(id)),
    getOptionalSession(),
  ]);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} isAdmin={Boolean(session)} />;
}
