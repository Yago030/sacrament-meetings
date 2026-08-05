"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";

const LoginFormSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormState = {
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password.";

export async function login(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validated = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return {
      message: "Please fix the errors below and try again.",
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  const { email, password } = validated.data;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    console.error("ADMIN_EMAIL or ADMIN_PASSWORD_HASH is not configured.");
    return { message: "Login is not configured. Contact the site administrator." };
  }

  // Compare emails case-insensitively, but always run bcrypt.compare (even on
  // an email mismatch) so failed logins take a consistent amount of time and
  // don't leak whether the email exists via response timing.
  const emailMatches = email.toLowerCase() === adminEmail.toLowerCase();
  const passwordMatches = await bcrypt.compare(password, adminPasswordHash);

  if (!emailMatches || !passwordMatches) {
    return {
      message: INVALID_CREDENTIALS_MESSAGE,
      errors: { password: [INVALID_CREDENTIALS_MESSAGE] },
    };
  }

  await createSession(adminEmail);
  redirect("/meetings");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
