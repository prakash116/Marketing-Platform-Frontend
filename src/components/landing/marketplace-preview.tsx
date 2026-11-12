import { ArrowRight, BadgeCheck, Clock, UsersRound } from "lucide-react";
import Link from "next/link";
import { asRoute } from "@/components/site-header/nav-config";
import { Button } from "@/components/ui/button";
import { Heading, Text, textVariants } from "@/components/ui/typography";
import { cn, initials } from "@/lib/utils";
import type { MarketplaceBrief, MarketplaceCreator, MarketplaceSection } from "@/types/site";
import { toneClass } from "./tones";

/**
 * A look into the creator marketplace from both sides: creators a business can
 * hire (left) and open briefs a creator can apply to (right), each with its
 * own call to action.
 *
 * Phones: the creator cards become a row you swipe (snap scrolling), so the
 * briefs stay close. From 640px they form a 2 × 2 grid.
 */
export function MarketplacePreview({ section }: { section: MarketplaceSection }) {
  return (
    <section
      aria-labelledby="marketplace-title"
      className="border-y border-border bg-muted/60 px-4 py-16 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-320">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={cn(
              textVariants({ variant: "overline", tone: "primary" }),
              "dark:text-primary-soft-foreground",
            )}
          >
            {section.eyebrow}
          </p>
          <Heading level="h2" id="marketplace-title" className="mt-3">
            {section.title}
          </Heading>
          <Text variant="body-lg" tone="secondary" className="mt-3">
            {section.description}
          </Text>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-8">
          <div className="min-w-0">
            <PanelHeading id="creators-panel" title="Creators near you" for="For businesses" />
            <ul
              aria-labelledby="creators-panel"
              className="-mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 scrollbar-none gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {section.creators.map((creator) => (
                <li key={creator.id} className="flex w-[78%] shrink-0 snap-start sm:w-auto">
                  <CreatorCard creator={creator} />
                </li>
              ))}
            </ul>
            <PanelCta cta={section.creatorsCta} />
          </div>

          <div className="min-w-0">
            <PanelHeading id="briefs-panel" title="Open briefs" for="For creators" />
            <ul
              aria-labelledby="briefs-panel"
              className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {section.briefs.map((brief) => (
                <li key={brief.id}>
                  <BriefRow brief={brief} />
                </li>
              ))}
            </ul>
            <PanelCta cta={section.briefsCta} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelHeading({ id, title, for: audience }: { id: string; title: string; for: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <Heading level="h4" as="h3" id={id}>
        {title}
      </Heading>
      <Text as="span" variant="caption" tone="muted">
        {audience}
      </Text>
    </div>
  );
}

function PanelCta({ cta }: { cta: MarketplaceSection["creatorsCta"] }) {
  return (
    <Button variant="secondary" className="mt-4 w-full sm:w-auto" asChild>
      <Link href={asRoute(cta.href)} prefetch={false}>
        {cta.title}
        <ArrowRight aria-hidden="true" />
      </Link>
    </Button>
  );
}

function CreatorCard({ creator }: { creator: MarketplaceCreator }) {
  return (
    // relative: keeps the sr-only "(verified)" text inside the swipe row's clipping on phones.
    <article className="relative flex w-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-full text-[15px] leading-5 font-bold",
            toneClass[creator.tone],
          )}
        >
          {initials(creator.name)}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1">
            <Text as="span" variant="label" className="truncate">
              {creator.name}
            </Text>
            {creator.verified ? (
              <>
                <BadgeCheck aria-hidden="true" className="size-4 shrink-0 text-info" />
                <span className="sr-only">(verified)</span>
              </>
            ) : null}
          </p>
          <Text as="span" variant="caption" tone="muted" className="block truncate">
            {creator.niche} · {creator.city}
          </Text>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-muted p-3 text-center">
        <Stat label="Followers" value={creator.followers} />
        <Stat label="Engagement" value={creator.engagement} />
        <Stat label="From" value={creator.startingPrice} />
      </dl>

      <ul aria-label="Platforms" className="mt-3 flex flex-wrap gap-1.5">
        {creator.platforms.map((platform) => (
          <li
            key={platform}
            className="rounded-full border border-border px-2.5 py-0.5 text-[12px] leading-4 font-medium text-text-secondary"
          >
            {platform}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col">
      <dt className="order-2 text-[11px] leading-4 text-muted-foreground">{label}</dt>
      <dd className="order-1 truncate text-[15px] leading-5 font-bold text-foreground tabular-nums">
        {value}
      </dd>
    </div>
  );
}

function BriefRow({ brief }: { brief: MarketplaceBrief }) {
  return (
    <article className="flex gap-3 p-4 sm:p-5">
      <span
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-[13px] leading-4 font-bold text-primary-soft-foreground"
      >
        {initials(brief.brand)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <Text as="span" variant="label">
            {brief.title}
          </Text>
          <span className="shrink-0 text-[15px] leading-5 font-bold text-success tabular-nums">
            {brief.budget}
          </span>
        </div>
        <Text as="span" variant="caption" tone="muted" className="block">
          {brief.brand} · {brief.city}
        </Text>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] leading-4 text-muted-foreground">
          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-semibold text-accent-soft-foreground">
            {brief.format}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden="true" className="size-3.5" />
            {brief.closes}
          </span>
          <span className="inline-flex items-center gap-1">
            <UsersRound aria-hidden="true" className="size-3.5" />
            {brief.applicants} applied
          </span>
        </div>
      </div>
    </article>
  );
}
