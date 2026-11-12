import { Quote, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Kpi, Text, textVariants } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { TrustCustomer, TrustData, TrustTestimonial } from "@/types/site";

/** Avatar colours, cycled through the list so neighbours never match. */
const avatarTones = [
  "bg-primary-soft text-primary-soft-foreground",
  "bg-success-soft text-success-soft-foreground",
  "bg-accent-soft text-accent-soft-foreground",
  "bg-info-soft text-info-soft-foreground",
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/**
 * Social proof under the hero: a slow customer strip, four key numbers and,
 * when the data has one, a customer story with a photo.
 *
 * The strip renders the list twice and slides by one copy (`animate-marquee`),
 * so it loops without a jump. Hover pauses it. With reduced motion it stops:
 * phones get a row you swipe yourself, larger screens a centred, wrapped list.
 * The copy is hidden from screen readers in every case.
 */
export function TrustStrip({ trust }: { trust: TrustData }) {
  return (
    // Tight top: the hero above already ends with generous bottom padding.
    <section aria-labelledby="trust-title" className="px-4 pt-4 pb-12 lg:px-8 lg:pt-6 lg:pb-16">
      <div className="mx-auto max-w-320">
        <h2
          id="trust-title"
          className={cn(textVariants({ variant: "overline", tone: "muted" }), "text-center")}
        >
          {trust.title}
        </h2>

        <div className="group mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:scrollbar-none motion-reduce:overflow-x-auto motion-reduce:[mask-image:none] sm:motion-reduce:overflow-visible">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
            <CustomerList customers={trust.customers} />
            <CustomerList customers={trust.customers} copy />
          </div>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-4",
            trust.testimonial && "lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]",
          )}
        >
          <dl
            className={cn(
              "grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-sm",
              !trust.testimonial && "lg:grid-cols-4",
            )}
          >
            {trust.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-center gap-1 bg-card p-5 sm:p-6"
              >
                <dt className="order-2">
                  <Text as="span" variant="small" tone="secondary">
                    {stat.label}
                  </Text>
                </dt>
                <dd className="order-1">
                  <Kpi className="text-[26px] leading-8 sm:text-[32px] sm:leading-10">
                    {stat.value}
                  </Kpi>
                </dd>
              </div>
            ))}
          </dl>

          {trust.testimonial ? <TestimonialCard testimonial={trust.testimonial} /> : null}
        </div>
      </div>
    </section>
  );
}

function CustomerList({ customers, copy = false }: { customers: TrustCustomer[]; copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      aria-label={copy ? undefined : "Some of our customers"}
      className={cn(
        // pr-3 matches gap-3 so both copies are the same width and the loop is seamless.
        "flex shrink-0 gap-3 pr-3",
        copy
          ? "motion-reduce:hidden"
          : "motion-reduce:pr-0 sm:motion-reduce:w-full sm:motion-reduce:flex-wrap sm:motion-reduce:justify-center",
      )}
    >
      {customers.map((customer, index) => (
        <li
          key={customer.name}
          className="flex shrink-0 items-center gap-3 rounded-full border border-border bg-card py-1.5 pr-4 pl-1.5 shadow-sm"
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] leading-4 font-bold",
              avatarTones[index % avatarTones.length],
            )}
          >
            {initials(customer.name)}
          </span>
          <span className="flex flex-col">
            <Text as="span" variant="label" className="whitespace-nowrap">
              {customer.name}
            </Text>
            <Text as="span" variant="caption" tone="muted" className="whitespace-nowrap">
              {customer.type} · {customer.city}
            </Text>
          </span>
        </li>
      ))}
    </ul>
  );
}

function TestimonialCard({ testimonial }: { testimonial: TrustTestimonial }) {
  const { image } = testimonial;
  return (
    <figure className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:grid-cols-[200px_minmax(0,1fr)]">
      <div className="relative aspect-16/9 bg-linear-to-br from-brand-panel-from to-brand-panel-to sm:aspect-auto sm:min-h-56">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 640px) 200px, 100vw"
            className="object-cover"
          />
        ) : (
          <Quote
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-primary-foreground/30"
          />
        )}
      </div>

      <div className="flex flex-col gap-4 p-5 sm:p-6">
        {testimonial.result ? (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[12px] leading-4 font-bold text-success-soft-foreground">
            <TrendingUp className="size-3.5" aria-hidden="true" />
            {testimonial.result}
          </span>
        ) : null}
        <blockquote className="font-display text-[18px] leading-7 font-semibold text-foreground sm:text-[20px] sm:leading-8">
          “{testimonial.quote}”
        </blockquote>
        <figcaption className="mt-auto flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[12px] leading-4 font-bold text-accent-soft-foreground"
          >
            {initials(testimonial.name)}
          </span>
          <span className="flex min-w-0 flex-col">
            <Text as="span" variant="label">
              {testimonial.name}
            </Text>
            <Text as="span" variant="caption" tone="muted">
              {testimonial.role}
              {image?.credit ? (
                <>
                  {" · Photo: "}
                  <a
                    href={image.credit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                    {image.credit.name}
                  </a>
                </>
              ) : null}
            </Text>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
