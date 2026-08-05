import { logout } from "@/lib/auth-actions";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
      >
        Sign Out
      </button>
    </form>
  );
}
