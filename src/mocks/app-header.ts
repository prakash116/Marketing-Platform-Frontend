/**
 * Mock data for the logged-in app header. Replaced by `GET /me/header`
 * (see src/hooks/use-app-header-data.ts) once the API exists.
 */

export interface HeaderBusiness {
  id: string;
  name: string;
  initials: string;
  plan: "Starter" | "Growth" | "Pro";
}

export interface HeaderUser {
  name: string;
  initials: string;
  email: string;
}

export interface AppHeaderData {
  business: HeaderBusiness;
  businesses: HeaderBusiness[];
  user: HeaderUser;
  /** WhatsApp credit balance in rupees. */
  waCredits: number;
  unreadNotifications: number;
}

const businesses: HeaderBusiness[] = [
  { id: "biz_sharma", name: "Sharma Sweets", initials: "SS", plan: "Starter" },
  { id: "biz_glow", name: "Glow Salon", initials: "GS", plan: "Growth" },
  { id: "biz_fitzone", name: "FitZone Gym", initials: "FG", plan: "Pro" },
];

export const appHeaderMock: AppHeaderData = {
  business: businesses[0]!,
  businesses,
  user: { name: "Amit Kumar", initials: "AK", email: "amit@sharmasweets.in" },
  waCredits: 1240,
  unreadNotifications: 3,
};

export type SearchGroup = "Campaigns" | "Chats" | "Creators" | "Pages";

export interface SearchResult {
  id: string;
  group: SearchGroup;
  label: string;
  href: string;
}

export const searchResultsMock: SearchResult[] = [
  {
    id: "cmp_diwali",
    group: "Campaigns",
    label: "Diwali Sale 2026 · Meta + Google",
    href: "/campaigns/diwali-sale-2026",
  },
  {
    id: "cmp_sweets",
    group: "Campaigns",
    label: "Diwali sweets box · Instagram",
    href: "/campaigns/diwali-sweets-box",
  },
  {
    id: "cmp_holi",
    group: "Campaigns",
    label: "Holi combo offer · WhatsApp",
    href: "/campaigns/holi-combo",
  },
  {
    id: "chat_ravi",
    group: "Chats",
    label: 'Ravi Gupta: "Diwali offer kab tak hai?"',
    href: "/inbox/ravi-gupta",
  },
  {
    id: "chat_neha",
    group: "Chats",
    label: 'Neha Jain: "Kaju katli 1kg available?"',
    href: "/inbox/neha-jain",
  },
  {
    id: "cr_priya",
    group: "Creators",
    label: "Priya Sharma · Food creator, Jaipur",
    href: "/creators/priya-sharma",
  },
  {
    id: "cr_rohan",
    group: "Creators",
    label: "Rohan Mehta · Lifestyle creator, Pune",
    href: "/creators/rohan-mehta",
  },
  { id: "pg_dashboard", group: "Pages", label: "Dashboard", href: "/dashboard" },
  { id: "pg_wallet", group: "Pages", label: "Wallet & recharge", href: "/wallet" },
  { id: "pg_settings", group: "Pages", label: "Settings", href: "/settings" },
];
