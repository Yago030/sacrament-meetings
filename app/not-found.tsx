import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-primary">Page not found</h1>

      <p className="mt-4 text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      <Link
        href="/meetings"
        className="mt-8 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover"
      >
        View Meetings
      </Link>
    </section>
  );
}
