import type { FeatureSection } from "@/types/site";

/**
 * Mock record for `GET /site/features`, the features bento grid.
 * Read only through `getFeatures()` in `src/lib/api/site.ts`.
 *
 * Titles, hrefs and one-liners match the header's Features menu. The chat and
 * report previews are PLACEHOLDER examples for the design, not real data.
 *
 * Layout: 3 columns from 1024px. Wide items take 2, normal items 1, the outro
 * card 1; keep the total a multiple of 3 so the grid has no gaps (db.test.ts).
 */
export const featuresRecord: FeatureSection = {
  eyebrow: "Features",
  title: "Everything you need to grow, in one app",
  description:
    "Chat with customers, post, run ads, hire creators and get found on Google, then see it all in one report.",
  items: [
    {
      id: "whatsapp",
      icon: "message-circle",
      tone: "success",
      title: "WhatsApp",
      description:
        "Answer every customer from one team inbox, send offers to your whole list and let a chatbot reply to common questions.",
      highlights: ["Chatbot", "Team inbox", "Broadcasts"],
      href: "/features/whatsapp",
      size: "wide",
      preview: {
        kind: "chat",
        messages: [
          { from: "customer", text: "Diwali offer kab tak hai?", time: "10:42" },
          {
            from: "business",
            text: "5 Nov tak! Kaju katli 1 kg par 15% off. Order karna hai?",
            time: "10:42",
          },
          { from: "customer", text: "Haan, 2 kg bhej do 🙏", time: "10:44" },
        ],
      },
    },
    {
      id: "social",
      icon: "calendar-days",
      tone: "primary",
      title: "Social posts",
      description: "Plan, design and auto-post to Facebook and Instagram.",
      highlights: ["Content calendar", "Ready templates", "AI captions in Hindi"],
      href: "/features/social",
      size: "normal",
    },
    {
      id: "ads",
      icon: "megaphone",
      tone: "accent",
      title: "Ads (Meta + Google)",
      description: "Run ads yourself, or let us manage them on Growth and Pro.",
      highlights: ["Meta + Google", "Managed on Growth + Pro"],
      href: "/features/ads",
      size: "normal",
    },
    {
      id: "creators",
      icon: "users",
      tone: "info",
      title: "Creators",
      description: "Hire local influencers and pay them safely.",
      highlights: ["Local creators", "Safe payments"],
      href: "/features/creators",
      size: "normal",
    },
    {
      id: "seo",
      icon: "map-pin",
      tone: "success",
      title: "SEO + Google Profile",
      description: "Rank on Google Maps and reply to reviews.",
      highlights: ["Google Maps", "Review replies"],
      href: "/features/seo",
      size: "normal",
    },
    {
      id: "reports",
      icon: "chart-column",
      tone: "primary",
      title: "Reports",
      description: "One report for every channel, in ₹, so you see what brings customers.",
      highlights: ["All channels", "In ₹", "Weekly email"],
      href: "/features/reports",
      size: "wide",
      preview: {
        kind: "stats",
        stats: [
          { label: "New leads", value: "214", change: "+38%" },
          { label: "WhatsApp orders", value: "86", change: "+21%" },
          { label: "Ad spend", value: "₹12,400" },
        ],
      },
    },
  ],
  outro: {
    title: "See every feature",
    description: "Compare plans and find what fits your business.",
    primary: { title: "All features", href: "/features" },
    secondary: { title: "Book a demo", href: "/demo" },
  },
};
