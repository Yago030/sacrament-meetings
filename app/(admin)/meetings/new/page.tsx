import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Create Meeting</h2>
      <MeetingForm action={createMeeting} submitLabel="Create Meeting" />
    </div>
  );
}
