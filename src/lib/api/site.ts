import { audiencesRecord } from "@/db/audiences";
import { featuresRecord } from "@/db/features";
import { heroSlidesRecord } from "@/db/hero-slides";
import { howItWorksRecord } from "@/db/how-it-works";
import { marketplaceRecord } from "@/db/marketplace";
import { servicesRecord } from "@/db/services";
import { siteHeaderRecord } from "@/db/site-header";
import { trustRecord } from "@/db/trust";
import type {
  AudienceSection,
  FeatureSection,
  HeroSlide,
  HowItWorksSection,
  MarketplaceSection,
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
 * These records are static placeholders. When the real API is connected,
 * add cache policies appropriate to the deployment target.
 */

export async function getSiteHeader(): Promise<SiteHeaderData> {
  // TODO: return api<SiteHeaderData>("/site/header") once the endpoint exists.
  return siteHeaderRecord;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  // TODO: return api<HeroSlide[]>("/site/hero-slides") once the endpoint exists.
  return heroSlidesRecord;
}

export async function getAudiences(): Promise<AudienceSection> {
  // TODO: return api<AudienceSection>("/site/audiences") once the endpoint exists.
  return audiencesRecord;
}

export async function getFeatures(): Promise<FeatureSection> {
  // TODO: return api<FeatureSection>("/site/features") once the endpoint exists.
  return featuresRecord;
}

export async function getHowItWorks(): Promise<HowItWorksSection> {
  // TODO: return api<HowItWorksSection>("/site/how-it-works") once the endpoint exists.
  return howItWorksRecord;
}

export async function getMarketplace(): Promise<MarketplaceSection> {
  // TODO: return api<MarketplaceSection>("/site/marketplace") once the endpoint exists.
  return marketplaceRecord;
}

export async function getServices(): Promise<ServiceSection> {
  // TODO: return api<ServiceSection>("/site/services") once the endpoint exists.
  return servicesRecord;
}

export async function getTrust(): Promise<TrustData> {
  // TODO: return api<TrustData>("/site/trust") once the endpoint exists.
  return trustRecord;
}
