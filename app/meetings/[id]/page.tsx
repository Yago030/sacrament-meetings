import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetails";
import { getBaseUrl } from "@/lib/get-base-url";
import type { SacramentMeeting } from "@/lib/types";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function MeetingPage({ params }: Props) {
  const { id } = await params;

  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load meeting.");
  }

  const meeting: SacramentMeeting = await response.json();

  return <MeetingDetail meeting={meeting} />;
}