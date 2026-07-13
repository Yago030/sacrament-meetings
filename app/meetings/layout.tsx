import Link from "next/link";

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-8 border-b border-border pb-4">
        <h1 className="text-3xl font-bold">Sacrament Meetings</h1>

        <p className="mt-2 text-muted">
          View current and previous meeting agendas.
        </p>

        <nav className="mt-4 flex gap-4">
          <Link
            href="/meetings"
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-hover"
          >
            All Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="rounded-md border border-border px-4 py-2 hover:bg-secondary"
          >
            Current Meeting
          </Link>
        </nav>
      </header>

      {children}
    </section>
  );
}