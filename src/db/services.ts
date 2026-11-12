import type { ServiceSection } from "@/types/site";

/**
 * Mock record for `GET /site/services`, the done-for-you services section.
 * Read only through `getServices()` in `src/lib/api/site.ts`.
 *
 * PLACEHOLDER COPY: the deliverables and the steps describe a typical
 * engagement. Confirm them with the services team before launch.
 *
 * Layout: 2 columns from 640px. Wide items take both; keep
 * (normal items + 2 × wide items) even so the last row is full (db.test.ts).
 */
export const servicesRecord: ServiceSection = {
  eyebrow: "Done for you",
  title: "Let our team build it and run it",
  description:
    "No time to do it yourself? Our team sets up your marketing automation and builds the tech you need.",
  steps: [
    { title: "Book a free call", description: "Tell us what you need, in Hindi or English." },
    { title: "Get a plan and quote", description: "A clear scope, timeline and price." },
    { title: "We build and run it", description: "You see the progress and the results." },
  ],
  items: [
    {
      id: "seo",
      icon: "search",
      tone: "success",
      title: "SEO automation",
      description: "Get found on Google Maps and search, without doing the work yourself.",
      deliverables: [
        "Google Business Profile set up",
        "Review replies and posts, automated",
        "Local SEO for your website",
      ],
      size: "normal",
    },
    {
      id: "whatsapp",
      icon: "bot",
      tone: "success",
      title: "WhatsApp automation",
      description: "Chatbots and flows that answer, take orders and remind customers for you.",
      deliverables: [
        "Chatbot for common questions",
        "Order and booking flows",
        "Broadcast campaigns",
      ],
      size: "normal",
    },
    {
      id: "ads",
      icon: "megaphone",
      tone: "accent",
      title: "Ads automation",
      description: "Meta and Google campaigns planned, run and improved by our team.",
      deliverables: [
        "Campaign setup and creatives",
        "Budget and results checked for you",
        "Monthly report in ₹",
      ],
      size: "normal",
    },
    {
      id: "consulting",
      icon: "lightbulb",
      tone: "info",
      title: "Tech consulting",
      description: "Not sure what to build or which tools to use? We help you decide.",
      deliverables: ["Free first call", "Review of your current tools", "A clear plan and quote"],
      size: "normal",
    },
    {
      id: "build",
      icon: "code",
      tone: "primary",
      title: "Tech build",
      description:
        "Websites, web apps and mobile apps, designed and built by our team and connected to the tools you already use.",
      deliverables: [
        "Websites and landing pages",
        "Web and mobile apps",
        "Integrations and automation",
      ],
      size: "wide",
    },
  ],
  primaryCta: { title: "Book a free call", href: "/demo" },
  secondaryCta: { title: "See all services", href: "/services" },
};
