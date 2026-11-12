import { ArrowRight, CheckCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { asRoute } from "@/components/site-header/nav-config";
import { Button } from "@/components/ui/button";
import { Heading, Text, textVariants } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { FeatureItem, FeaturePreview, FeatureSection } from "@/types/site";
import { toneClass } from "./tones";

/**
 * "What the app does": a bento grid of the six product features.
 *
 * Wide cards span two columns and carry a small decorative product preview
 * (a WhatsApp chat, a report); the outro card fills the last slot, so with the
 * record's sizes every row is full at 2 and 3 columns.
 */
export function FeaturesSection({ section }: { section: FeatureSection }) {
  return (
    <section aria-labelledby="features-title" className="px-4 py-16 lg:px-8 lg:py-24">
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
          <Heading level="h2" id="features-title" className="mt-3">
            {section.title}
          </Heading>
          <Text variant="body-lg" tone="secondary" className="mt-3">
            {section.description}
          </Text>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {section.items.map((item) => (
            <li key={item.id} className={cn("flex", item.size === "wide" && "sm:col-span-2")}>
              <FeatureCard item={item} />
            </li>
          ))}
          <li className="flex sm:col-span-2 lg:col-span-1">
            <OutroCard outro={section.outro} />
          </li>
        </ul>
      </div>
    </section>
  );
}

function FeatureCard({ item }: { item: FeatureItem }) {
  const wide = item.size === "wide" && item.preview;
  return (
    <article
      className={cn(
        "group relative flex w-full flex-col gap-6 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6",
        "transition-[translate,box-shadow,border-color] duration-200 ease-out-soft",
        "hover:-translate-y-1 hover:border-primary-border hover:shadow-lg",
        "has-focus-visible:border-primary-border has-focus-visible:shadow-lg has-focus-visible:ring-2 has-focus-visible:ring-ring",
        wide && "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:items-center",
      )}
    >
      <div className="flex h-full flex-col">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-11 items-center justify-center rounded-xl sm:size-12",
            toneClass[item.tone],
          )}
        >
          <DynamicIcon name={item.icon} className="size-5 sm:size-6" />
        </span>
        <Heading level="h4" as="h3" className="mt-4 sm:mt-5">
          {item.title}
        </Heading>
        <Text tone="secondary" className="mt-2">
          {item.description}
        </Text>
        <ul aria-label={`${item.title} highlights`} className="mt-4 flex flex-wrap gap-1.5">
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-[12px] leading-4 font-medium text-text-secondary"
            >
              {highlight}
            </li>
          ))}
        </ul>
        <Link
          href={asRoute(item.href)}
          prefetch={false}
          aria-label={`Learn more about ${item.title}`}
          className={cn(
            "mt-5 inline-flex items-center gap-1.5 self-start pt-1 text-[14px] leading-5 font-semibold text-primary sm:mt-auto sm:pt-6",
            "dark:text-primary-soft-foreground",
            // Stretched link: the whole card is clickable.
            "after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none",
          )}
        >
          Learn more
          <ArrowRight
            className="size-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>

      {wide && item.preview ? <Preview preview={item.preview} /> : null}
    </article>
  );
}

function Preview({ preview }: { preview: FeaturePreview }) {
  if (preview.kind === "chat") {
    return (
      <div aria-hidden="true" className="flex flex-col gap-2 rounded-xl bg-muted p-4">
        {preview.messages.map((message, index) => {
          const mine = message.from === "business";
          return (
            <div
              key={index}
              className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-5 shadow-sm",
                mine
                  ? "self-end rounded-br-sm bg-success-soft text-success-soft-foreground"
                  : "self-start rounded-bl-sm bg-card text-foreground",
              )}
            >
              {message.text}
              <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] leading-3 opacity-70">
                {message.time}
                {mine ? <CheckCheck className="size-3" /> : null}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-3 gap-2 rounded-xl bg-muted p-3 lg:grid-cols-1"
    >
      {preview.stats.map((stat) => (
        <div key={stat.label} className="rounded-lg bg-card p-3 shadow-sm">
          <span className="block text-[11px] leading-4 font-medium text-muted-foreground">
            {stat.label}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className="text-[18px] leading-6 font-bold text-foreground tabular-nums">
              {stat.value}
            </span>
            {stat.change ? (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-success-soft px-1.5 py-0.5 text-[10px] leading-3 font-bold text-success-soft-foreground">
                <TrendingUp className="size-3" />
                {stat.change}
              </span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}

function OutroCard({ outro }: { outro: FeatureSection["outro"] }) {
  return (
    <div className="relative flex w-full flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-linear-to-br from-brand-panel-from to-brand-panel-to p-6 text-primary-foreground shadow-sm">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary-foreground/8"
      />
      <div className="relative">
        <p className="font-display text-[22px] leading-7 font-bold">{outro.title}</p>
        <p className="mt-2 text-[14px] leading-5 text-primary-foreground/80">{outro.description}</p>
      </div>
      <div className="relative flex flex-wrap items-center gap-3">
        <Button variant="secondary" asChild>
          <Link href={asRoute(outro.primary.href)} prefetch={false}>
            {outro.primary.title}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
        {outro.secondary ? (
          <Link
            href={asRoute(outro.secondary.href)}
            prefetch={false}
            className="rounded-sm text-[14px] leading-5 font-semibold text-primary-foreground underline-offset-4 hover:underline"
          >
            {outro.secondary.title}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
