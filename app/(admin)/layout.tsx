export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-8 border-b border-border pb-4">
        <h1 className="text-3xl font-bold">Admin</h1>

        <p className="mt-2 text-muted">
          Manage sacrament meetings.
        </p>
      </header>

      {children}
    </section>
  );
}
