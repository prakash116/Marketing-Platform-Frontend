import { ArrowRight, CircleCheck } from "lucide-react";
import Link from "next/link";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { asRoute } from "@/components/site-header/nav-config";
import { Heading, Text, textVariants } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { AudiencePath, AudienceSection } from "@/types/site";
import { toneClass } from "./tones";

/**
 * "Who are you?": one card per audience, each taking the visitor straight to
 * the right signup (or the tech-services call).
 *
 * The whole card is the link target (stretched link), but only the CTA is the
 * actual `<a>`, so screen readers hear one clear link per card. Phones get a
 * short card (icon, title, one line, CTA); the points appear from 640px.
 */
export function AudiencePaths({ section }: { section: AudienceSection }) {
  return (
    <section
      aria-labelledby="audiences-title"
      className="border-y border-border bg-muted/60 px-4 py-14 lg:px-8 lg:py-20"
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
          <Heading level="h2" id="audiences-title" className="mt-3">
            {section.title}
          </Heading>
          <Text variant="body-lg" tone="secondary" className="mt-3">
            {section.description}
          </Text>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-12 lg:grid-cols-4">
          {section.paths.map((path) => (
            <li key={path.id} className="flex">
              <PathCard path={path} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PathCard({ path }: { path: AudiencePath }) {
  const signup = path.cta.href.startsWith("/signup");
  return (
    <article
      className={cn(
        "group relative flex w-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6",
        "transition-[translate,box-shadow,border-color] duration-200 ease-out-soft",
        "hover:-translate-y-1 hover:border-primary-border hover:shadow-lg",
        "has-focus-visible:border-primary-border has-focus-visible:shadow-lg has-focus-visible:ring-2 has-focus-visible:ring-ring",
      )}
    >
      <div className="flex items-center gap-3 sm:block">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-12",
            toneClass[path.tone],
          )}
        >
          <DynamicIcon name={path.icon} className="size-5 sm:size-6" />
        </span>
        <Heading level="h4" as="h3" className="sm:mt-5">
          {path.title}
        </Heading>
      </div>

      {/* Two lines reserved from sm so the points start at the same height in every card. */}
      <Text tone="secondary" className="mt-2 sm:min-h-11">
        {path.description}
      </Text>

      <ul className="mt-5 hidden gap-2.5 border-t border-border pt-5 sm:grid">
        {path.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2.5 text-[14px] leading-5 text-text-secondary"
          >
            <CircleCheck className="mt-px size-4 shrink-0 text-success" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>

      <Link
        href={asRoute(path.cta.href)}
        // Only signup is a built page worth prefetching.
        prefetch={signup ? undefined : false}
        aria-label={`${path.cta.title}: ${path.title}`}
        className={cn(
          "mt-5 inline-flex items-center gap-1.5 self-start text-[14px] leading-5 font-semibold text-primary sm:mt-auto sm:pt-6",
          "dark:text-primary-soft-foreground",
          // Stretched link: the whole card is clickable, focus ring stays on the card.
          "after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none",
        )}
      >
        {path.cta.title}
        <ArrowRight
          className="size-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
