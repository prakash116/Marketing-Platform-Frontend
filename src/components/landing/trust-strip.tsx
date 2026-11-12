import { Kpi, Text, textVariants } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { TrustCustomer, TrustData } from "@/types/site";

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
 * Social proof under the hero: a slow customer strip and four key numbers.
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

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-sm lg:grid-cols-4">
          {trust.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 bg-card p-5 sm:p-6">
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
