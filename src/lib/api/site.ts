import { cacheLife, cacheTag } from "next/cache";
import { audiencesRecord } from "@/db/audiences";
import { featuresRecord } from "@/db/features";
import { heroSlidesRecord } from "@/db/hero-slides";
import { servicesRecord } from "@/db/services";
import { siteHeaderRecord } from "@/db/site-header";
import { trustRecord } from "@/db/trust";
import type {
  AudienceSection,
  FeatureSection,
  HeroSlide,
  ServiceSection,
  SiteHeaderData,
  TrustData,
} from "@/types/site";

/**
 * Public-site content. Components call only these functions, so switching to
 * the real API means changing the body of each function, nothing else:
 *
 *   return api<SiteHeaderData>("/site/header");
 *
 * All are cached for an hour (`'use cache'`) and tagged, so an admin edit can
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

export async function getAudiences(): Promise<AudienceSection> {
  "use cache";
  cacheLife("hours");
  cacheTag("site-audiences");
  // TODO: return api<AudienceSection>("/site/audiences") once the endpoint exists.
  return audiencesRecord;
}

export async function getFeatures(): Promise<FeatureSection> {
  "use cache";
  cacheLife("hours");
  cacheTag("site-features");
  // TODO: return api<FeatureSection>("/site/features") once the endpoint exists.
  return featuresRecord;
}

export async function getServices(): Promise<ServiceSection> {
  "use cache";
  cacheLife("hours");
  cacheTag("site-services");
  // TODO: return api<ServiceSection>("/site/services") once the endpoint exists.
  return servicesRecord;
}

export async function getTrust(): Promise<TrustData> {
  "use cache";
  cacheLife("hours");
  cacheTag("site-trust");
  // TODO: return api<TrustData>("/site/trust") once the endpoint exists.
  return trustRecord;
}
