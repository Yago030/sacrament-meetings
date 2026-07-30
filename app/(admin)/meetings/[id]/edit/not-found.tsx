import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <section className="flex flex-col items-center px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-primary">Meeting not found</h2>

      <p className="mt-4 text-muted">
        The meeting you&apos;re trying to edit doesn&apos;t exist or may have been deleted.
      </p>

      <Link
        href="/meetings"
        className="mt-8 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover"
      >
        Back to Meetings
      </Link>
    </section>
  );
}
