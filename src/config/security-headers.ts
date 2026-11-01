import { env, isDev, isProd } from "./env";

/**
 * Security headers applied to every route from `next.config.ts`.
 *
 * The CSP is a STATIC header on purpose. A nonce-based CSP would require reading
 * the nonce per request, which forces every page into dynamic rendering and is
 * incompatible with Partial Prerendering (cacheComponents). A static CSP keeps
 * pages static and CDN-cacheable. `'unsafe-inline'` for scripts is the price of
 * that trade-off; revisit when Next.js supports hash-based CSP for its runtime.
 */

function toWebSocketOrigin(httpOrigin: string): string {
  return httpOrigin.replace(/^http/, "ws");
}

const apiOrigin = new URL(env.NEXT_PUBLIC_API_URL).origin;

const connectSrc = ["'self'", apiOrigin, toWebSocketOrigin(apiOrigin)];
if (isDev) {
  // Next.js dev server HMR socket.
  connectSrc.push("ws://localhost:*");
}

const scriptSrc = ["'self'", "'unsafe-inline'"];
if (isDev) {
  // React Refresh / source maps need eval in development only.
  scriptSrc.push("'unsafe-eval'");
}

const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": scriptSrc,
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "blob:", "data:"],
  "font-src": ["'self'"],
  "connect-src": connectSrc,
  "media-src": ["'self'", "blob:"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
};

if (isProd) {
  cspDirectives["upgrade-insecure-requests"] = [];
}

export const contentSecurityPolicy = Object.entries(cspDirectives)
  .map(([directive, values]) => (values.length ? `${directive} ${values.join(" ")}` : directive))
  .join("; ");

export interface Header {
  key: string;
  value: string;
}

export const securityHeaders: Header[] = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "browsing-topics=()",
    ].join(", "),
  },
];
