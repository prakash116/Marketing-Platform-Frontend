import type { MarketplaceSection } from "@/types/site";

/**
 * Mock record for `GET /site/marketplace`, the creator marketplace preview.
 * Read only through `getMarketplace()` in `src/lib/api/site.ts`.
 *
 * PLACEHOLDER CONTENT: every creator, brand, number and price here is an
 * example for the design. The live endpoint should return real, public
 * profiles and open briefs (with the creators' consent to be featured).
 * No photos on purpose: initials avatars until real creator photos exist.
 */
export const marketplaceRecord: MarketplaceSection = {
  eyebrow: "Creator marketplace",
  title: "Local creators and brands, in one place",
  description:
    "Businesses hire creators from their own city. Creators find paid briefs and get paid safely.",
  creators: [
    {
      id: "priya-sharma",
      name: "Priya Sharma",
      niche: "Food",
      city: "Jaipur",
      followers: "48.2k",
      engagement: "5.1%",
      startingPrice: "₹2,500",
      platforms: ["Instagram", "YouTube"],
      verified: true,
      tone: "accent",
    },
    {
      id: "rohan-mehta",
      name: "Rohan Mehta",
      niche: "Lifestyle",
      city: "Pune",
      followers: "31.7k",
      engagement: "4.4%",
      startingPrice: "₹2,000",
      platforms: ["Instagram"],
      verified: true,
      tone: "primary",
    },
    {
      id: "ananya-iyer",
      name: "Ananya Iyer",
      niche: "Fitness",
      city: "Bengaluru",
      followers: "22.9k",
      engagement: "6.2%",
      startingPrice: "₹1,800",
      platforms: ["Instagram", "YouTube"],
      verified: false,
      tone: "success",
    },
    {
      id: "arjun-singh",
      name: "Arjun Singh",
      niche: "Tech reviews",
      city: "Delhi",
      followers: "64.5k",
      engagement: "3.9%",
      startingPrice: "₹3,500",
      platforms: ["YouTube"],
      verified: true,
      tone: "info",
    },
  ],
  briefs: [
    {
      id: "sharma-sweets-diwali",
      brand: "Sharma Sweets",
      title: "Diwali sweets reel",
      city: "Jaipur",
      budget: "₹2,500",
      format: "Reel",
      closes: "Closes in 5 days",
      applicants: 12,
    },
    {
      id: "glow-salon-bridal",
      brand: "Glow Salon",
      title: "Bridal makeover, before and after",
      city: "Pune",
      budget: "₹3,000",
      format: "Reel + Story",
      closes: "Closes in 8 days",
      applicants: 7,
    },
    {
      id: "fitzone-trial",
      brand: "FitZone Gym",
      title: "Free trial week story",
      city: "Jaipur",
      budget: "₹1,500",
      format: "Story",
      closes: "Closes in 3 days",
      applicants: 4,
    },
  ],
  creatorsCta: { title: "Browse creators", href: "/creators" },
  briefsCta: { title: "See open briefs", href: "/briefs" },
};
