// Generates a bcrypt hash for a new admin password.
//
// Usage:
//   node scripts/hash-password.mjs "your-new-password"
//
// Paste the printed hash into .env.local as ADMIN_PASSWORD_HASH
// (and into your Vercel project's environment variables for production).
//
// IMPORTANT: Next.js expands "$VAR" references inside .env* files. A bcrypt
// hash is full of literal "$" characters ($2b$10$...), so every "$" MUST be
// escaped as "\$" in .env.local or Next.js will silently corrupt it, e.g.:
//   ADMIN_PASSWORD_HASH="\$2b\$10\$abc123..."
// In the Vercel dashboard (not a .env file) this escaping is NOT needed —
// paste the hash as-is there.

import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log(hash);
