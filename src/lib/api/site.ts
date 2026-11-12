import { cacheLife, cacheTag } from "next/cache";
import { heroSlidesRecord } from "@/db/hero-slides";
import { siteHeaderRecord } from "@/db/site-header";
import type { HeroSlide, SiteHeaderData } from "@/types/site";

/**
 * Public-site content. Components call only these functions, so switching to
 * the real API means changing the body of each function, nothing else:
 *
 *   return api<SiteHeaderData>("/site/header");
 *
 * Both are cached for an hour (`'use cache'`) and tagged, so an admin edit can
 * refresh them with `revalidateTag("site-header", "max")`.
 */

export async function getSiteHeader(): Promise<SiteHeaderData> {
  "use cache";
  cacheLife("hours");
  cacheTag("site-header");
  // TODO: return api<SiteHeaderData>("/site/header") once the endpoint exists.
  return siteHeaderRecord;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("hero-slides");
  // TODO: return api<HeroSlide[]>("/site/hero-slides") once the endpoint exists.
  return heroSlidesRecord;
}
