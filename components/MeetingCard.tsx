import Link from "next/link";
import DeleteMeetingForm from "@/components/DeleteMeetingForm";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(meeting.date));

  return (
    <article className="rounded-lg border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4">
        <p className="text-sm text-muted">{formattedDate}</p>

        <h2 className="mt-1 text-xl font-semibold capitalize">
          {meeting.meetingType} Meeting
        </h2>
      </div>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-semibold">Presiding:</span>{" "}
          {meeting.presiding}
        </p>

        <p>
          <span className="font-semibold">Conducting:</span>{" "}
          {meeting.conducting}
        </p>

        <p>
          <span className="font-semibold">Speakers:</span>{" "}
          {meeting.speakers.filter(s => s.type === "speaker").length}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          View Meeting →
        </Link>

        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="inline-block rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
        >
          Edit
        </Link>

        <DeleteMeetingForm
          id={meeting.id}
          meetingLabel={`${formattedDate} ${meeting.meetingType}`}
        />
      </div>
    </article>
  );
}