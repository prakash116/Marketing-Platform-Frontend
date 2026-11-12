import type { TrustData } from "@/types/site";

/**
 * Mock record for `GET /site/trust`, the trust strip under the hero.
 * Read only through `getTrust()` in `src/lib/api/site.ts`.
 *
 * PLACEHOLDER CONTENT: the customer names are examples for the design.
 * The stats repeat claims already on the site (header promo, auth panel);
 * confirm every number before launch. The testimonial photo is a Wikimedia
 * Commons stand-in (CC BY 2.0, credited in the card); replace it before launch.
 */
export const trustRecord: TrustData = {
  title: "Trusted by 2,000+ businesses, creators and agencies across India",
  customers: [
    { name: "Sharma Sweets", type: "Restaurant", city: "Delhi" },
    { name: "Glow Salon", type: "Salon", city: "Pune" },
    { name: "FitZone Gym", type: "Gym", city: "Jaipur" },
    { name: "Care Plus Clinic", type: "Clinic", city: "Lucknow" },
    { name: "Bright Minds", type: "Coaching", city: "Indore" },
    { name: "Mehta Fashion", type: "Retail", city: "Surat" },
    { name: "Priya Sharma", type: "Food creator", city: "Jaipur" },
    { name: "PixelCraft Media", type: "Agency", city: "Bengaluru" },
  ],
  stats: [
    { value: "2,000+", label: "local businesses on the platform" },
    { value: "3×", label: "more orders for Sharma Sweets in 2 months" },
    { value: "60 sec", label: "to get started, no card needed" },
    { value: "₹299", label: "per month, the starting plan" },
  ],
  testimonial: {
    quote: "Got 3× more orders in 2 months.",
    name: "Sharma Sweets",
    role: "Restaurant · Delhi",
    result: "3× orders in 2 months",
    image: {
      src: "/images/landing/testimonial.jpg",
      alt: "Trays of fresh sweets in the glass counter of a Delhi sweet shop",
      width: 1920,
      height: 1920,
      credit: {
        name: "Ryan from Toronto, Canada",
        url: "https://commons.wikimedia.org/wiki/File:Delhi_sweet_shop_(6945528705).jpg",
        license: "CC BY 2.0",
      },
    },
  },
};
