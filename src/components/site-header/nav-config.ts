import {
  BookOpen,
  CalendarDays,
  ChartColumn,
  Dumbbell,
  FileText,
  Gift,
  GraduationCap,
  Info,
  LayoutTemplate,
  LifeBuoy,
  MapPin,
  Megaphone,
  MessageCircle,
  Play,
  Scissors,
  ShoppingBag,
  Stethoscope,
  TrendingUp,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Route } from "next";

/**
 * Single source of truth for the public-site navigation. Desktop (NavigationMenu
 * mega panels) and mobile (Accordion sheet) both render from this list.
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

export interface NavCta {
  title: string;
  href: Route;
}

export interface NavMenu {
  kind: "menu";
  id: "features" | "industries" | "resources";
  title: string;
  items: NavLinkItem[];
  /** Fill the grid column by column (the Features design lists 3 per column). */
  columnMajor?: boolean;
  footer: { text: string; cta: NavCta };
  promo: { icon: LucideIcon; title: string; description: string; cta: NavCta };
}

export type NavItem = { kind: "link"; title: string; href: Route; prefetch?: boolean } | NavMenu;

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
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    description: "Fill tables with WhatsApp offers and reviews",
    href: route("/industries/restaurants"),
  },
  {
    icon: Scissors,
    title: "Salons",
    description: "Bookings, reminders and before/after posts",
    href: route("/industries/salons"),
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description: "Festive sales, catalogues and more walk-ins",
    href: route("/industries/retail"),
  },
  {
    icon: Stethoscope,
    title: "Clinics",
    description: "Appointment reminders and Google reviews",
    href: route("/industries/clinics"),
  },
  {
    icon: Dumbbell,
    title: "Gyms",
    description: "Trial sign-ups, renewals and member chats",
    href: route("/industries/gyms"),
  },
  {
    icon: GraduationCap,
    title: "Coaching",
    description: "Admissions, demo classes and parent updates",
    href: route("/industries/coaching"),
  },
];

export const resourceItems: NavLinkItem[] = [
  {
    icon: BookOpen,
    title: "Blog",
    description: "Marketing tips for local businesses",
    href: route("/blog"),
  },
  {
    icon: LifeBuoy,
    title: "Help centre",
    description: "Guides, FAQs and setup help",
    href: route("/help"),
  },
  {
    icon: FileText,
    title: "Case studies",
    description: "Real results from businesses like yours",
    href: route("/case-studies"),
  },
  {
    icon: LayoutTemplate,
    title: "Templates",
    description: "Ready posts, ads and WhatsApp messages",
    href: route("/templates"),
  },
];

/** About is a top-level link from 1280px; below that it moves into Resources. */
export const aboutItem: NavLinkItem = {
  icon: Info,
  title: "About",
  description: "Our story and the team behind it",
  href: route("/about"),
};

export const authLinks = {
  login: route("/login"),
  signup: route("/signup"),
  bookDemo: route("/demo"),
};

export const mainNav: NavItem[] = [
  {
    kind: "menu",
    id: "features",
    title: "Features",
    items: featureItems,
    columnMajor: true,
    footer: {
      text: `Made for: ${industryItems.map((item) => item.title).join(" · ")}`,
      cta: { title: "All features", href: route("/features") },
    },
    promo: {
      icon: Play,
      title: "See it in 60 seconds",
      description: "How a restaurant got 3× more orders.",
      cta: { title: "Book a demo", href: authLinks.bookDemo },
    },
  },
  {
    kind: "menu",
    id: "industries",
    title: "Industries",
    items: industryItems,
    footer: {
      text: "Not listed? We work with every kind of local business.",
      cta: { title: "All industries", href: route("/industries") },
    },
    promo: {
      icon: TrendingUp,
      title: "2× Diwali orders",
      description: "How Sharma Sweets grew with WhatsApp broadcasts.",
      cta: { title: "Read the story", href: route("/case-studies/sharma-sweets") },
    },
  },
  // Only Pricing and Signup are prefetched: they are the conversion paths.
  { kind: "link", title: "Pricing", href: route("/pricing"), prefetch: true },
  { kind: "link", title: "Creators", href: route("/creators") },
  { kind: "link", title: "Briefs", href: route("/briefs") },
  {
    kind: "menu",
    id: "resources",
    title: "Resources",
    items: resourceItems,
    footer: {
      text: "New guides every week, in English and Hindi.",
      cta: { title: "Visit the blog", href: route("/blog") },
    },
    promo: {
      icon: Gift,
      title: "Free festive template pack",
      description: "50+ ready posts and WhatsApp messages.",
      cta: { title: "Get the templates", href: route("/templates") },
    },
  },
  { kind: "link", title: aboutItem.title, href: aboutItem.href },
];

// TODO: replace with the real WhatsApp business number (wa.me/<countrycode><number>).
export const whatsappChatUrl = "https://wa.me/";

/** Is `href` the current page (or a parent of it)? */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
