import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Bishopric sign-in to manage the sacrament meeting schedule.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-6 py-16">
      <h1 className="mb-2 text-2xl font-bold">Bishopric Sign In</h1>

      <p className="mb-8 text-sm text-muted">
        Sign in to create, edit, or delete sacrament meetings.
      </p>

      <LoginForm />
    </div>
  );
}
