import type { SiteHeaderData } from "@/types/site";

/**
 * Mock record for `GET /site/header`, the public-site header and navigation.
 * Read only through `getSiteHeader()` in `src/lib/api/site.ts`; delete this
 * file once that function calls the real API.
 */

const industryTitles = ["Restaurants", "Salons", "Retail", "Clinics", "Gyms", "Coaching"];

export const siteHeaderRecord: SiteHeaderData = {
  nav: [
    {
      kind: "menu",
      id: "features",
      title: "Features",
      columnMajor: true,
      items: [
        {
          icon: "message-circle",
          title: "WhatsApp",
          description: "Chatbot, team inbox and broadcasts",
          href: "/features/whatsapp",
        },
        {
          icon: "calendar-days",
          title: "Social posts",
          description: "Plan, design and auto-post to FB + Instagram",
          href: "/features/social",
        },
        {
          icon: "megaphone",
          title: "Ads (Meta + Google)",
          description: "Run ads; we manage them on Growth + Pro",
          href: "/features/ads",
        },
        {
          icon: "users",
          title: "Creators",
          description: "Hire local influencers, pay safely",
          href: "/features/creators",
        },
        {
          icon: "map-pin",
          title: "SEO + Google Profile",
          description: "Rank on Google Maps, reply to reviews",
          href: "/features/seo",
        },
        {
          icon: "chart-column",
          title: "Reports",
          description: "One report for every channel, in ₹",
          href: "/features/reports",
        },
      ],
      footer: {
        text: `Made for: ${industryTitles.join(" · ")}`,
        cta: { title: "All features", href: "/features" },
      },
      promo: {
        icon: "play",
        title: "See it in 60 seconds",
        description: "How a restaurant got 3× more orders.",
        cta: { title: "Book a demo", href: "/demo" },
      },
    },
    {
      kind: "menu",
      id: "industries",
      title: "Industries",
      items: [
        {
          icon: "utensils-crossed",
          title: "Restaurants",
          description: "Fill tables with WhatsApp offers and reviews",
          href: "/industries/restaurants",
        },
        {
          icon: "scissors",
          title: "Salons",
          description: "Bookings, reminders and before/after posts",
          href: "/industries/salons",
        },
        {
          icon: "shopping-bag",
          title: "Retail",
          description: "Festive sales, catalogues and more walk-ins",
          href: "/industries/retail",
        },
        {
          icon: "stethoscope",
          title: "Clinics",
          description: "Appointment reminders and Google reviews",
          href: "/industries/clinics",
        },
        {
          icon: "dumbbell",
          title: "Gyms",
          description: "Trial sign-ups, renewals and member chats",
          href: "/industries/gyms",
        },
        {
          icon: "graduation-cap",
          title: "Coaching",
          description: "Admissions, demo classes and parent updates",
          href: "/industries/coaching",
        },
      ],
      footer: {
        text: "Not listed? We work with every kind of local business.",
        cta: { title: "All industries", href: "/industries" },
      },
      promo: {
        icon: "trending-up",
        title: "2× Diwali orders",
        description: "How Sharma Sweets grew with WhatsApp broadcasts.",
        cta: { title: "Read the story", href: "/case-studies/sharma-sweets" },
      },
    },
    { kind: "link", title: "Pricing", href: "/pricing", prefetch: true },
    { kind: "link", title: "Creators", href: "/creators" },
    { kind: "link", title: "Briefs", href: "/briefs" },
    {
      kind: "menu",
      id: "resources",
      title: "Resources",
      holdsAbout: true,
      items: [
        {
          icon: "book-open",
          title: "Blog",
          description: "Marketing tips for local businesses",
          href: "/blog",
        },
        {
          icon: "life-buoy",
          title: "Help centre",
          description: "Guides, FAQs and setup help",
          href: "/help",
        },
        {
          icon: "file-text",
          title: "Case studies",
          description: "Real results from businesses like yours",
          href: "/case-studies",
        },
        {
          icon: "layout-template",
          title: "Templates",
          description: "Ready posts, ads and WhatsApp messages",
          href: "/templates",
        },
      ],
      footer: {
        text: "New guides every week, in English and Hindi.",
        cta: { title: "Visit the blog", href: "/blog" },
      },
      promo: {
        icon: "gift",
        title: "Free festive template pack",
        description: "50+ ready posts and WhatsApp messages.",
        cta: { title: "Get the templates", href: "/templates" },
      },
    },
    { kind: "link", title: "About", href: "/about" },
  ],
  about: {
    icon: "info",
    title: "About",
    description: "Our story and the team behind it",
    href: "/about",
  },
  // TODO: real WhatsApp business number (wa.me/<countrycode><number>).
  whatsappUrl: "https://wa.me/",
};
