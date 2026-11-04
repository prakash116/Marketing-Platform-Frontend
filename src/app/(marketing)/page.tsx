import { Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { authLinks, featureItems } from "@/components/site-header/nav-config";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { BRAND_NAME } from "@/config/brand";

export const metadata: Metadata = {
  title: { absolute: `${BRAND_NAME} · All your marketing in one app` },
  description:
    "WhatsApp, social posts, Google + Meta ads and local creators. Plans from ₹299/month.",
};

export default function HomePage() {
  return (
    // The site header is sticky and transparent here; pull the hero up underneath it.
    <main className="-mt-16 flex-1 lg:-mt-18">
      <section className="px-4 pt-28 pb-14 text-center lg:pt-36 lg:pb-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-[12px] leading-5 font-semibold text-primary-soft-foreground">
            <Sparkles className="size-3.5" aria-hidden="true" />
            New: AI captions in Hindi
          </span>
          <Heading
            level="display"
            className="mt-5 text-[34px] leading-10 sm:text-[48px] sm:leading-14"
          >
            All your marketing <span className="max-sm:block max-sm:text-primary">in one app</span>
          </Heading>
          <Text variant="body-lg" tone="secondary" className="mt-3 max-w-xl">
            WhatsApp, social posts, Google + Meta ads and local creators. Plans from ₹299/month.
          </Text>
          <div className="mt-7 flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
            <Button size="lg" className="sm:w-42" asChild>
              <Link href={authLinks.signup}>Start free</Link>
            </Button>
            <Button size="lg" variant="secondary" className="sm:w-42" asChild>
              <Link href={authLinks.bookDemo} prefetch={false}>
                Book a demo
              </Link>
            </Button>
          </div>
          <Text variant="caption" tone="muted" className="mt-8">
            Trusted by 2,000+ local businesses
          </Text>
        </div>
      </section>

      <section aria-labelledby="everything" className="px-4 pb-24">
        <div className="mx-auto max-w-[1280px]">
          <Heading level="h3" as="h2" id="everything" className="text-center">
            Everything in one place
          </Heading>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map(({ href, title, description, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  prefetch={false}
                  className="flex h-full items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted"
                >
                  {Icon ? (
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
                      <Icon className="size-5" aria-hidden="true" />
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
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
