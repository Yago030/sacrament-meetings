import NavLinks from "./NavLinks";

export default function Header() {
  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Springfield Ward
          </h1>

          <p className="text-sm text-muted">
            Sacrament Meeting Planner
          </p>

          <p className="mt-1 text-sm text-muted">
            {currentDate}
          </p>
        </div>

        <NavLinks />
      </div>
    </header>
  );
}