import { verifySession } from "@/lib/dal";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Secure check: re-verifies the session against the signed cookie payload
  // (the proxy only did an optimistic check). Redirects to /login if invalid.
  // Note: this covers full navigations reliably; mutation actions
  // (lib/actions.ts) additionally verify the session themselves since
  // Server Actions can be invoked directly.
  await verifySession();

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
