import type { HeroSlide } from "@/types/site";

/**
 * Mock record for `GET /site/hero-slides`, the landing page carousel.
 * Read only through `getHeroSlides()` in `src/lib/api/site.ts`.
 *
 * PLACEHOLDER CONTENT: names, amounts and results in the `visual` previews are
 * examples for the design, not real customer data. Replace before launch.
 */
export const heroSlidesRecord: HeroSlide[] = [
  {
    id: "business",
    tabLabel: "Business",
    eyebrow: "For local businesses",
    title: "All your marketing",
    highlight: "in one app",
    description:
      "WhatsApp, social posts, Google + Meta ads and local creators. Plans from ₹299/month.",
    points: ["No card needed", "Set up in 60 seconds", "Help in Hindi + English on WhatsApp"],
    primaryCta: { title: "Start free", href: "/signup" },
    secondaryCta: { title: "Book a demo", href: "/demo" },
    visual: {
      metricLabel: "Ad results this week",
      metricValue: "+38% leads",
      metricBadge: "38%",
      bars: [30, 42, 36, 55, 48, 70, 100],
      cards: [
        {
          icon: "message-circle",
          tone: "success",
          title: "New WhatsApp order",
          meta: "Ravi Gupta · ₹640 · 2 min ago",
        },
        {
          icon: "image",
          tone: "primary",
          title: "Post published to Instagram",
          meta: "1.2k reach · 86 likes",
        },
      ],
    },
  },
  {
    id: "creators",
    tabLabel: "Creators",
    eyebrow: "For creators",
    title: "Get paid to create",
    highlight: "for brands near you",
    description:
      "Find paid briefs from local brands, apply in one tap and get paid safely to your bank.",
    points: [
      "Free to join",
      "Payment held safely until work is approved",
      "Briefs from brands in your city",
    ],
    primaryCta: { title: "Join as a creator", href: "/signup?as=creator" },
    secondaryCta: { title: "Browse briefs", href: "/briefs" },
    visual: {
      metricLabel: "Earnings this month",
      metricValue: "₹18,400",
      metricBadge: "4 briefs",
      bars: [20, 35, 30, 50, 45, 65, 90],
      cards: [
        {
          icon: "megaphone",
          tone: "accent",
          title: "New brief: Diwali reel",
          meta: "Sharma Sweets · ₹2,500 · Jaipur",
        },
        {
          icon: "badge-indian-rupee",
          tone: "success",
          title: "Payment received",
          meta: "Glow Salon · ₹3,000 · today",
        },
      ],
    },
  },
  {
    id: "agencies",
    tabLabel: "Agencies",
    eyebrow: "For agencies",
    title: "Run every client",
    highlight: "from one dashboard",
    description:
      "Manage many businesses, campaigns and creators from one login, and send each client one clear report.",
    points: [
      "Switch between clients in one click",
      "Hire creators for client campaigns",
      "One report per client, in ₹",
    ],
    primaryCta: { title: "Start as an agency", href: "/signup?as=agency" },
    secondaryCta: { title: "Book a demo", href: "/demo" },
    visual: {
      metricLabel: "Active clients",
      metricValue: "12 clients",
      metricBadge: "+3",
      bars: [40, 45, 50, 55, 62, 70, 85],
      cards: [
        {
          icon: "file-text",
          tone: "info",
          title: "Monthly report sent",
          meta: "FitZone Gym · 3 channels",
        },
        {
          icon: "briefcase-business",
          tone: "primary",
          title: "Campaign live",
          meta: "Glow Salon · Meta + Google",
        },
      ],
    },
  },
  {
    id: "services",
    tabLabel: "Tech services",
    tabShortLabel: "Services",
    eyebrow: "Done for you",
    title: "We build it",
    highlight: "and run it for you",
    description:
      "SEO, WhatsApp and ads automation, tech consulting, and custom websites and apps, built by our team.",
    points: [
      "SEO + Google Profile automation",
      "WhatsApp and ads automation",
      "Websites, apps and tech consulting",
    ],
    primaryCta: { title: "Book a free call", href: "/demo" },
    secondaryCta: { title: "See services", href: "/services" },
    visual: {
      metricLabel: "Website build",
      metricValue: "Week 3 of 4",
      metricBadge: "On track",
      bars: [30, 45, 60, 80],
      cards: [
        {
          icon: "search",
          tone: "success",
          title: "SEO: Google Profile updated",
          meta: "12 reviews replied · auto",
        },
        {
          icon: "send",
          tone: "accent",
          title: "WhatsApp flow live",
          meta: "Booking bot · 24×7",
        },
      ],
    },
  },
];
