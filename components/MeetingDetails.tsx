import Link from "next/link";
import DeleteMeetingForm from "@/components/DeleteMeetingForm";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(meeting.date));

  return (
    <article className="mx-auto max-w-4xl rounded-lg border border-border bg-card p-8 shadow-sm">
      <header className="mb-8 border-b border-border pb-4">
        <h2 className="text-3xl font-bold">
          {meeting.meetingType.charAt(0).toUpperCase() +
            meeting.meetingType.slice(1)}{" "}
          Meeting
        </h2>

        <p className="mt-2 text-muted">
          {formattedDate}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
          >
            Edit Meeting
          </Link>

          <DeleteMeetingForm
            id={meeting.id}
            meetingLabel={`${formattedDate} ${meeting.meetingType}`}
          />
        </div>
      </header>

      <section className="space-y-3">
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>
      </section>

      <section className="mt-8">
        <h3 className="mb-3 text-xl font-semibold">
          Announcements
        </h3>

        {meeting.announcements?.length ? (
          <ul className="list-disc pl-6">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No announcements.</p>
        )}
      </section>

      <section className="mt-8">
        <h3 className="mb-3 text-xl font-semibold">
          Opening Hymn
        </h3>

        <p>
          #{meeting.openingHymn.number} — {meeting.openingHymn.title}
        </p>

        <p className="mt-2">
          <strong>Opening Prayer:</strong>{" "}
          {meeting.openingPrayer}
        </p>
      </section>

      <section className="mt-8">
        <h3 className="mb-3 text-xl font-semibold">
          Ward Business
        </h3>

        {meeting.wardBusiness.length ? (
          <ul className="list-disc pl-6">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>
                {item.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">
            No ward business.
          </p>
        )}

        <p className="mt-4">
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </section>

      <section className="mt-8">
        <h3 className="mb-3 text-xl font-semibold">
          Sacrament Hymn
        </h3>

        <p>
          #{meeting.sacramentHymn.number} —{" "}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      <section className="mt-8">
        <h3 className="mb-3 text-xl font-semibold">
          Speakers & Musical Numbers
        </h3>

        <ul className="space-y-3">
          {meeting.speakers.map((item, index) => (
            <li
              key={index}
              className="rounded border border-border p-3"
            >
              <p>
                <strong>Type:</strong> {item.type}
              </p>

              <p>
                <strong>Name:</strong> {item.name}
              </p>

              {item.topic && (
                <p>
                  <strong>Topic:</strong> {item.topic}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h3 className="mb-3 text-xl font-semibold">
          Closing Hymn
        </h3>

        <p>
          #{meeting.closingHymn.number} —{" "}
          {meeting.closingHymn.title}
        </p>

        <p className="mt-2">
          <strong>Closing Prayer:</strong>{" "}
          {meeting.closingPrayer}
        </p>
      </section>
    </article>
  );
}
