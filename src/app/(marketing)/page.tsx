import type { Metadata } from "next";
import { AudiencePaths } from "@/components/landing/audience-paths";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { ServicesSection } from "@/components/landing/services-section";
import { TrustStrip } from "@/components/landing/trust-strip";
import { BRAND_NAME } from "@/config/brand";
import { getAudiences, getFeatures, getHeroSlides, getServices, getTrust } from "@/lib/api/site";

export const metadata: Metadata = {
  title: { absolute: `${BRAND_NAME} · All your marketing in one app` },
  description:
    "WhatsApp, social posts, Google + Meta ads and local creators. Plans from ₹299/month.",
};

export default async function HomePage() {
  const [slides, trust, audiences, features, services] = await Promise.all([
    getHeroSlides(),
    getTrust(),
    getAudiences(),
    getFeatures(),
    getServices(),
  ]);

  return (
    // The site header is sticky and transparent here; pull the hero up underneath it.
    <main className="-mt-16 flex-1 lg:-mt-18">
      <section
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden px-4 pt-24 pb-14 lg:px-8 lg:pt-32 lg:pb-20"
      >
        {/* Soft brand wash behind the transparent header, fading into the page. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-primary-soft to-background"
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 right-[-10%] -z-10 size-[560px] rounded-full bg-primary/10 blur-3xl"
        />

        <div className="mx-auto max-w-320">
          <h1 id="hero-title" className="sr-only">
            {BRAND_NAME}: marketing, creators and tech services for businesses, creators and
            agencies
          </h1>
          <HeroCarousel slides={slides} />
        </div>
      </section>

      <TrustStrip trust={trust} />

      <AudiencePaths section={audiences} />

      <FeaturesSection section={features} />

      <ServicesSection section={services} />
    </main>
  );
}
