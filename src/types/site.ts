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

export interface SiteImage {
  /**
   * Today a path under /public, e.g. "/images/landing/business.jpg". When the
   * API serves images from a CDN, add that host to `images.remotePatterns` in
   * next.config.ts.
   */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Focal point kept in view when the photo is cropped (CSS object-position), e.g. "40% 30%". */
  position?: string;
  /** Photographer credit; required for CC BY / CC BY-SA photos. */
  credit?: { name: string; url: string; license?: string };
}

/** A customer shown in the trust strip. Logos come later; for now a wordmark. */
export interface TrustCustomer {
  name: string;
  /** Industry or role, e.g. "Restaurant" or "Agency". */
  type: string;
  city: string;
}

export interface TrustStat {
  /** Display value, already formatted: "2,000+", "3×", "60 sec". */
  value: string;
  label: string;
}

export interface TrustTestimonial {
  quote: string;
  name: string;
  /** e.g. "Restaurant · Delhi" */
  role: string;
  /** Headline result shown as a badge, e.g. "3× orders in 2 months". */
  result?: string;
  image?: SiteImage;
}

/** `GET /site/trust` */
export interface TrustData {
  title: string;
  customers: TrustCustomer[];
  stats: TrustStat[];
  testimonial?: TrustTestimonial;
}

/** Decorative product preview inside a wide feature card. */
export type FeaturePreview =
  | {
      kind: "chat";
      messages: { from: "customer" | "business"; text: string; time: string }[];
    }
  | {
      kind: "stats";
      stats: { label: string; value: string; change?: string }[];
    };

export interface FeatureItem {
  id: string;
  icon: string;
  tone: HeroTone;
  title: string;
  description: string;
  /** 2–3 short tags shown as chips. */
  highlights: string[];
  href: string;
  /** "wide" spans two columns from 640px and shows the preview. */
  size: "wide" | "normal";
  preview?: FeaturePreview;
}

/** `GET /site/features` */
export interface FeatureSection {
  eyebrow: string;
  title: string;
  description: string;
  items: FeatureItem[];
  /** Closing card that fills the grid's last slot. */
  outro: { title: string; description: string; primary: SiteCta; secondary?: SiteCta };
}

/** A done-for-you service delivered by the team (not a self-serve feature). */
export interface ServiceItem {
  id: string;
  icon: string;
  tone: HeroTone;
  title: string;
  description: string;
  /** What the client gets; shown from 640px. */
  deliverables: string[];
  /** "wide" spans both columns from 640px. */
  size: "wide" | "normal";
}

/** `GET /site/services` */
export interface ServiceSection {
  eyebrow: string;
  title: string;
  description: string;
  /** How an engagement runs, in order. */
  steps: { title: string; description: string }[];
  items: ServiceItem[];
  primaryCta: SiteCta;
  secondaryCta?: SiteCta;
}

/** One entry point in the "who are you?" section. */
export interface AudiencePath {
  id: string;
  icon: string;
  tone: HeroTone;
  /** First person, as the visitor would say it: "I run a business". */
  title: string;
  description: string;
  /** Shown from 640px; phones get the short version of the card. */
  points: string[];
  cta: SiteCta;
}

/** `GET /site/audiences` */
export interface AudienceSection {
  eyebrow: string;
  title: string;
  description: string;
  paths: AudiencePath[];
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
  /** Photo behind the product cards. Without it the slide shows the brand gradient. */
  image?: SiteImage;
  visual: HeroVisual;
}
