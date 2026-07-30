import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMeetingPage({ params }: Props) {
  const { id } = await params;
  const meetingId = Number(id);

  if (Number.isNaN(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Edit Meeting</h2>
      <MeetingForm
        meeting={meeting}
        action={updateMeeting.bind(null, meeting.id)}
        submitLabel="Save Changes"
      />
    </div>
  );
}
