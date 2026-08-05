"use client";

import { useActionState } from "react";
import { login, type LoginFormState } from "@/lib/auth-actions";

const initialState: LoginFormState = {};

const inputClasses =
  "w-full rounded-md border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary";
const labelClasses = "block text-sm font-medium";

function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" className="mt-1 min-h-[1.25rem] text-sm text-red-600">
      {errors?.map((message) => (
        <p key={message}>{message}</p>
      ))}
    </div>
  );
}

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.message && !state.errors && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={inputClasses}
          aria-describedby="email-errors"
        />
        <FieldErrors id="email-errors" errors={state.errors?.email} />
      </div>

      <div>
        <label htmlFor="password" className={labelClasses}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClasses}
          aria-describedby="password-errors"
        />
        <FieldErrors id="password-errors" errors={state.errors?.password} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
