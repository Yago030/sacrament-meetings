import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetails";
import { getMeetingById } from "@/lib/meetings-db";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function MeetingPage({ params }: Props) {
  const { id } = await params;

  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
