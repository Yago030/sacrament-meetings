import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
      <h1 className="text-5xl font-bold text-primary">
        Sacrament Meeting Planner
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-muted">
        Plan, organize, and review sacrament meeting agendas for your ward.
        Manage hymns, prayers, speakers, announcements, and meeting details in
        one place.
      </p>
      <Image
        src="/temples/mendoza-temple.jpeg"
        alt="Mendoza Argentina Temple"
        width={800}
        height={533}
        priority
        className="mt-10 w-full rounded-xl shadow-lg"
      />
      <div className="mt-10 flex gap-4">
        <Link
          href="/meetings"
          className="rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover"
        >
          View Meetings
        </Link>

        <Link
          href="/meetings/current"
          className="rounded-md border border-border px-6 py-3 font-medium hover:bg-secondary"
        >
          Current Meeting
        </Link>
      </div>

      <div className="mt-16 grid w-full gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Meeting Planning</h2>
          <p className="mt-2 text-sm text-muted">
            Organize hymns, prayers, speakers, and announcements.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Ward Management</h2>
          <p className="mt-2 text-sm text-muted">
            Keep sacrament meeting information organized week by week.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Meeting History</h2>
          <p className="mt-2 text-sm text-muted">
            Review previous meeting agendas and print them when needed.
          </p>
        </div>
      </div>
    </section>
  );
}