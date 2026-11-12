import { ArrowRight, CircleCheck } from "lucide-react";
import Link from "next/link";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { asRoute } from "@/components/site-header/nav-config";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ServiceItem, ServiceSection } from "@/types/site";
import { toneClass } from "./tones";

/**
 * Done-for-you services, set apart from the self-serve features by the indigo
 * brand band (same gradient as the auth panel, in both themes).
 *
 * Left: the pitch, how an engagement runs (a real sequence, so it is numbered)
 * and the call to action. Right: one card per service. The cards are not links
 * (there are no service pages yet), so they have no hover affordance; the
 * section's buttons carry the action.
 */
export function ServicesSection({ section }: { section: ServiceSection }) {
  return (
    <section
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden bg-linear-to-br from-brand-panel-from to-brand-panel-to px-4 py-16 text-primary-foreground lg:px-8 lg:py-24"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 -z-10 size-96 rounded-full bg-primary-foreground/6"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-40 -z-10 size-[28rem] rounded-full bg-primary-foreground/4"
      />

      <div className="mx-auto grid max-w-320 gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[11px] leading-4 font-bold tracking-[0.08em] text-primary-foreground/70 uppercase">
            {section.eyebrow}
          </p>
          <Heading level="h2" id="services-title" className="mt-3 text-primary-foreground">
            {section.title}
          </Heading>
          <Text variant="body-lg" className="mt-3 text-primary-foreground/80">
            {section.description}
          </Text>

          <ol aria-label="How it works" className="mt-8 grid gap-4">
            {section.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-[13px] leading-4 font-bold text-primary tabular-nums"
                >
                  {index + 1}
                </span>
                <span className="pt-1">
                  <span className="block text-[15px] leading-5 font-semibold">{step.title}</span>
                  <span className="mt-0.5 block text-[14px] leading-5 text-primary-foreground/75">
                    {step.description}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href={asRoute(section.primaryCta.href)} prefetch={false}>
                {section.primaryCta.title}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            {section.secondaryCta ? (
              <Link
                href={asRoute(section.secondaryCta.href)}
                prefetch={false}
                className="inline-flex min-h-11 items-center justify-center rounded-sm text-[15px] leading-5 font-semibold text-primary-foreground underline-offset-4 hover:underline"
              >
                {section.secondaryCta.title}
              </Link>
            ) : null}
          </div>
        </div>

        <ul aria-label="Our services" className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {section.items.map((item) => (
            <li key={item.id} className={cn("flex", item.size === "wide" && "sm:col-span-2")}>
              <ServiceCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  const wide = item.size === "wide";
  return (
    <article
      className={cn(
        "flex w-full flex-col rounded-2xl bg-card p-5 text-foreground shadow-lg sm:p-6",
        wide && "sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-6",
      )}
    >
      <div>
        <div className="flex items-center gap-3 sm:block">
          <span
            aria-hidden="true"
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-12",
              toneClass[item.tone],
            )}
          >
            <DynamicIcon name={item.icon} className="size-5 sm:size-6" />
          </span>
          <Heading level="h4" as="h3" className="sm:mt-5">
            {item.title}
          </Heading>
        </div>
        <Text tone="secondary" className="mt-2">
          {item.description}
        </Text>
      </div>

      <ul
        aria-label={`What you get with ${item.title}`}
        className={cn(
          "mt-5 hidden gap-2.5 border-t border-border pt-5 sm:grid",
          wide && "sm:mt-0 sm:self-center sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6",
        )}
      >
        {item.deliverables.map((deliverable) => (
          <li
            key={deliverable}
            className="flex items-start gap-2.5 text-[14px] leading-5 text-text-secondary"
          >
            <CircleCheck className="mt-px size-4 shrink-0 text-success" aria-hidden="true" />
            {deliverable}
          </li>
        ))}
      </ul>
    </article>
  );
}
