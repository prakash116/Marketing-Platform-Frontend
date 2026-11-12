/**
 * Shapes of the public-site data the backend will return.
 *
 * Until the API exists, `src/db/` holds records in exactly these shapes and
 * `src/lib/api/site.ts` reads them. Everything here must stay JSON-serialisable:
 * icons are lucide names (kebab-case, e.g. "message-circle") resolved on the
 * frontend by `getIcon()`, and hrefs are plain strings.
 */

export interface SiteLink {
  title: string;
  href: string;
  description?: string;
  /** Lucide icon name, e.g. "message-circle". Unknown names render no icon. */
  icon?: string;
}

export interface SiteCta {
  title: string;
  href: string;
}

export interface SiteNavMenu {
  kind: "menu";
  id: string;
  title: string;
  items: SiteLink[];
  /** Fill the mega-menu grid column by column (3 per column). */
  columnMajor?: boolean;
  /** Below 1280px the About link and the theme toggle move into this menu. */
  holdsAbout?: boolean;
  footer: { text: string; cta: SiteCta };
  promo: { icon: string; title: string; description: string; cta: SiteCta };
}

export interface SiteNavLink {
  kind: "link";
  title: string;
  href: string;
  /** Prefetch only the conversion paths (Pricing, Signup). */
  prefetch?: boolean;
}

export type SiteNavItem = SiteNavLink | SiteNavMenu;

/** `GET /site/header` */
export interface SiteHeaderData {
  nav: SiteNavItem[];
  /** Top-level link from 1280px; below that it moves into the `holdsAbout` menu. */
  about: SiteLink;
  /** wa.me link for "Chat on WhatsApp". */
  whatsappUrl: string;
}

export type HeroTone = "primary" | "success" | "accent" | "info";

export interface HeroActivityCard {
  icon: string;
  tone: HeroTone;
  title: string;
  meta: string;
}

/** Decorative product preview on the right of a hero slide (desktop only). */
export interface HeroVisual {
  metricLabel: string;
  metricValue: string;
  /** Small trend pill next to the metric, e.g. "38%". */
  metricBadge?: string;
  /** Bar heights in percent (0–100); the last bar is highlighted. */
  bars: number[];
  cards: HeroActivityCard[];
}

export interface HeroSlide {
  id: string;
  /** Short label on the audience tab, e.g. "Creators". */
  tabLabel: string;
  /** Shorter tab label for phones, where 4 tabs share one row. */
  tabShortLabel?: string;
  eyebrow: string;
  title: string;
  /** Second line of the heading, shown in the brand colour. */
  highlight: string;
  description: string;
  points: string[];
  primaryCta: SiteCta;
  secondaryCta?: SiteCta;
  visual: HeroVisual;
}
