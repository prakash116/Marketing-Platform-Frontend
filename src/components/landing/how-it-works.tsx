import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { asRoute } from "@/components/site-header/nav-config";
import { Button } from "@/components/ui/button";
import { Heading, Text, textVariants } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { HowItWorksSection } from "@/types/site";

/**
 * Self-serve getting started: a numbered timeline (the order is the point, so
 * the steps are numbered), then the signup button.
 *
 * Phones: a vertical timeline, the dashed line running down from each number.
 * From 1024px: three columns, the line running across to the next number.
 */
export function HowItWorks({ section }: { section: HowItWorksSection }) {
  const lastIndex = section.steps.length - 1;
  const signup = section.cta.href.startsWith("/signup");

  return (
    <section aria-labelledby="how-title" className="px-4 py-16 lg:px-8 lg:py-24">
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
          <Heading level="h2" id="how-title" className="mt-3">
            {section.title}
          </Heading>
          <Text variant="body-lg" tone="secondary" className="mt-3">
            {section.description}
          </Text>
        </div>

        <ol
          aria-label="Steps to get started"
          className="mx-auto mt-10 grid max-w-5xl gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-12"
        >
          {section.steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "relative flex gap-4 lg:flex-col lg:gap-6",
                index < lastIndex && [
                  // Connector to the next step: down on phones, across from 1024px.
                  "after:absolute after:top-12 after:-bottom-6 after:left-[19px] after:border-l-2 after:border-dashed after:border-primary-border",
                  "lg:after:top-5 lg:after:-right-10 lg:after:bottom-auto lg:after:left-14 lg:after:border-t-2 lg:after:border-l-0",
                ],
              )}
            >
              <span
                aria-hidden="true"
                className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-[15px] leading-5 font-bold text-primary-foreground tabular-nums ring-4 ring-background"
              >
                {index + 1}
              </span>

              <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground"
                  >
                    <DynamicIcon name={step.icon} className="size-5" />
                  </span>
                  {step.badge ? (
                    <span className="rounded-full bg-success-soft px-2.5 py-1 text-[12px] leading-4 font-semibold text-success-soft-foreground">
                      {step.badge}
                    </span>
                  ) : null}
                </div>
                <Heading level="h4" as="h3" className="mt-4">
                  {step.title}
                </Heading>
                <Text tone="secondary" className="mt-2">
                  {step.description}
                </Text>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center gap-3 lg:mt-14">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href={asRoute(section.cta.href)} prefetch={signup ? undefined : false}>
              {section.cta.title}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          {section.note ? (
            <Text variant="caption" tone="muted">
              {section.note}
            </Text>
          ) : null}
        </div>
      </div>
    </section>
  );
}
