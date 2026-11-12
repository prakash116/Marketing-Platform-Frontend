import type { Metadata } from "next";
import Link from "next/link";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { getIcon } from "@/components/icons/icon-registry";
import { AudiencePaths } from "@/components/landing/audience-paths";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { TrustStrip } from "@/components/landing/trust-strip";
import { asRoute } from "@/components/site-header/nav-config";
import { Heading } from "@/components/ui/typography";
import { BRAND_NAME } from "@/config/brand";
import { getAudiences, getHeroSlides, getSiteHeader, getTrust } from "@/lib/api/site";
import type { SiteNavMenu } from "@/types/site";

export const metadata: Metadata = {
  title: { absolute: `${BRAND_NAME} · All your marketing in one app` },
  description:
    "WhatsApp, social posts, Google + Meta ads and local creators. Plans from ₹299/month.",
};

export default async function HomePage() {
  const [slides, header, trust, audiences] = await Promise.all([
    getHeroSlides(),
    getSiteHeader(),
    getTrust(),
    getAudiences(),
  ]);
  const features =
    header.nav.find((item): item is SiteNavMenu => item.kind === "menu" && item.id === "features")
      ?.items ?? [];

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

      <section aria-labelledby="everything" className="px-4 pt-16 pb-24 lg:pt-20">
        <div className="mx-auto max-w-320">
          <Heading level="h3" as="h2" id="everything" className="text-center">
            Everything in one place
          </Heading>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ href, title, description, icon }) => {
              return (
                <li key={href}>
                  <Link
                    href={asRoute(href)}
                    prefetch={false}
                    className="flex h-full items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted"
                  >
                    {getIcon(icon) ? (
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
                        <DynamicIcon name={icon} className="size-5" aria-hidden="true" />
                      </span>
                    ) : null}
                    <span>
                      <span className="block text-[15px] leading-5 font-semibold">{title}</span>
                      <span className="mt-1 block text-[13px] leading-5 text-muted-foreground">
                        {description}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
