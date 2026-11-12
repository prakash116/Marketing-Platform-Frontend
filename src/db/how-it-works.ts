import type { HowItWorksSection } from "@/types/site";

/**
 * Mock record for `GET /site/how-it-works`, the self-serve getting-started steps.
 * Read only through `getHowItWorks()` in `src/lib/api/site.ts`.
 * Every claim here already appears elsewhere on the site (phone signup,
 * 60-second setup, no card, reports in ₹).
 */
export const howItWorksRecord: HowItWorksSection = {
  eyebrow: "How it works",
  title: "Start growing in three steps",
  description: "No agency, no long setup. Do it yourself from your phone or laptop.",
  steps: [
    {
      icon: "smartphone",
      title: "Sign up free",
      description: "Use your phone number and a one-time code. No card needed.",
      badge: "60 seconds",
    },
    {
      icon: "link",
      title: "Connect your channels",
      description: "Link WhatsApp, Facebook, Instagram and your Google Profile in a few taps.",
      badge: "A few taps",
    },
    {
      icon: "trending-up",
      title: "Grow and track",
      description: "Send offers, post, run ads and hire creators, then see every result in ₹.",
      badge: "One report",
    },
  ],
  cta: { title: "Start free", href: "/signup" },
  note: "No card needed · Cancel anytime",
};
