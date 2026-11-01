import { z } from "zod";

/**
 * Public, build-time environment variables.
 *
 * Only `NEXT_PUBLIC_*` variables live here: Next.js inlines them into the client
 * bundle at build time, so they must be referenced as literal `process.env.X`
 * (never via dynamic access). This module is imported from `next.config.ts` so
 * a missing or malformed variable fails the build instead of a page at runtime.
 */
const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url({ message: "must be an absolute URL, e.g. https://app.example.com" }),
  NEXT_PUBLIC_API_URL: z.url({ message: "must be an absolute URL, e.g. https://api.example.com" }),
  NEXT_PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  });

  if (!parsed.success) {
    const lines = parsed.error.issues.map(
      (issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`,
    );
    throw new Error(
      [
        "Invalid environment variables. Copy .env.example to .env.local and fill in:",
        ...lines,
      ].join("\n"),
    );
  }

  return parsed.data;
}

export const env: Env = loadEnv();

export const isProd = env.NEXT_PUBLIC_APP_ENV === "production";
export const isDev = env.NEXT_PUBLIC_APP_ENV === "development";
