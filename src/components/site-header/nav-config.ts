import {
  BookOpen,
  CalendarDays,
  ChartColumn,
  Dumbbell,
  FileText,
  GraduationCap,
  LayoutTemplate,
  LifeBuoy,
  MapPin,
  Megaphone,
  MessageCircle,
  Scissors,
  ShoppingBag,
  Stethoscope,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Route } from "next";

/**
 * Single source of truth for the public-site navigation. Desktop (NavigationMenu)
 * and mobile (Accordion sheet) both render from this list.
 */

// Most marketing pages are not built yet, so typedRoutes cannot know them.
// Remove the cast once each page exists.
const route = (path: string) => path as Route;

export interface NavLinkItem {
  title: string;
  href: Route;
  description?: string;
  icon?: LucideIcon;
}

export type NavItem =
  | { kind: "link"; title: string; href: Route; prefetch?: boolean }
  | {
      kind: "menu";
      id: "features" | "industries" | "resources";
      title: string;
      items: NavLinkItem[];
    };

export const featureItems: NavLinkItem[] = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chatbot, team inbox and broadcasts",
    href: route("/features/whatsapp"),
  },
  {
    icon: CalendarDays,
    title: "Social posts",
    description: "Plan, design and auto-post to FB + Instagram",
    href: route("/features/social"),
  },
  {
    icon: Megaphone,
    title: "Ads (Meta + Google)",
    description: "Run ads; we manage them on Growth + Pro",
    href: route("/features/ads"),
  },
  {
    icon: Users,
    title: "Creators",
    description: "Hire local influencers, pay safely",
    href: route("/features/creators"),
  },
  {
    icon: MapPin,
    title: "SEO + Google Profile",
    description: "Rank on Google Maps, reply to reviews",
    href: route("/features/seo"),
  },
  {
    icon: ChartColumn,
    title: "Reports",
    description: "One report for every channel, in ₹",
    href: route("/features/reports"),
  },
];

export const industryItems: NavLinkItem[] = [
  { icon: UtensilsCrossed, title: "Restaurants", href: route("/industries/restaurants") },
  { icon: Scissors, title: "Salons", href: route("/industries/salons") },
  { icon: ShoppingBag, title: "Retail", href: route("/industries/retail") },
  { icon: Stethoscope, title: "Clinics", href: route("/industries/clinics") },
  { icon: Dumbbell, title: "Gyms", href: route("/industries/gyms") },
  { icon: GraduationCap, title: "Coaching", href: route("/industries/coaching") },
];

export const resourceItems: NavLinkItem[] = [
  { icon: BookOpen, title: "Blog", href: route("/blog") },
  { icon: LifeBuoy, title: "Help centre", href: route("/help") },
  { icon: FileText, title: "Case studies", href: route("/case-studies") },
  { icon: LayoutTemplate, title: "Templates", href: route("/templates") },
];

export const aboutLink = { kind: "link", title: "About", href: route("/about") } as const;

export const mainNav: NavItem[] = [
  { kind: "menu", id: "features", title: "Features", items: featureItems },
  { kind: "menu", id: "industries", title: "Industries", items: industryItems },
  // Only Pricing and Signup are prefetched: they are the conversion paths.
  { kind: "link", title: "Pricing", href: route("/pricing"), prefetch: true },
  { kind: "link", title: "Creators", href: route("/creators") },
  { kind: "link", title: "Briefs", href: route("/briefs") },
  { kind: "menu", id: "resources", title: "Resources", items: resourceItems },
  aboutLink,
];

export const authLinks = {
  login: route("/login"),
  signup: route("/signup"),
  bookDemo: route("/demo"),
  allFeatures: route("/features"),
};

// TODO: replace with the real WhatsApp business number (wa.me/<countrycode><number>).
export const whatsappChatUrl = "https://wa.me/";

/** Is `href` the current page (or a parent of it)? */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
