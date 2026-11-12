import { CircleCheck, ImageIcon, MessageCircle, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export type AuthVariant = "login" | "signup";

const leadBars = [30, 42, 36, 55, 48, 70, 100];

/**
 * Left half of the auth screens, desktop (≥1024px) only. Purely decorative:
 * shows the product's real value (orders, posts, ad results) and a testimonial.
 * Cards slide in one by one (120ms stagger), then float up/down 6px on a 4s loop.
 */
export function BrandPanel({ variant }: { variant: AuthVariant }) {
  return (
    <aside className="relative hidden overflow-hidden bg-linear-to-br from-brand-panel-from to-brand-panel-to text-primary-foreground lg:flex lg:w-[44%] lg:shrink-0 lg:flex-col lg:px-12 lg:py-10 xl:px-16">
      {/* Decorative rings */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-primary-foreground/6"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-16 bottom-40 size-40 rounded-full bg-primary-foreground/4"
      />

      <Logo
        size={32}
        className="relative"
        markClassName="bg-primary-foreground text-primary"
        wordmarkClassName="text-primary-foreground"
      />

      <div className="relative mt-16 max-w-md animate-fade-up">
        {variant === "login" ? (
          <>
            <h2 className="font-display text-[40px] leading-12 font-bold tracking-[-0.02em]">
              Grow your business
              <span className="block text-primary-foreground/70">from one simple app</span>
            </h2>
            <p className="mt-3 text-[15px] text-primary-foreground/80">
              WhatsApp, posts, ads and creators, all in one place.
            </p>
          </>
        ) : (
          <>
            <h2 className="font-display text-[40px] leading-12 font-bold tracking-[-0.02em]">
              Start free in
              <span className="block text-accent">60 seconds</span>
            </h2>
            <ul className="mt-4 space-y-2 text-[15px] text-primary-foreground/85">
              {[
                "No card needed",
                "Plans from ₹299/month",
                "Help in Hindi + English on WhatsApp",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <CircleCheck className="size-4.5 shrink-0" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Product cards: decorative, hidden from screen readers. */}
      <div aria-hidden="true" className="relative mt-12 flex flex-1 flex-col gap-5 text-foreground">
        <FloatingCard delay={0} className="w-72">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
            <MessageCircle className="size-4.5" />
          </span>
          <span>
            <span className="block text-[13px] font-semibold">New WhatsApp order</span>
            <span className="block text-[12px] text-muted-foreground">
              Ravi Gupta · ₹640 · 2 min ago
            </span>
          </span>
        </FloatingCard>

        <FloatingCard delay={1} className="ml-24 w-80">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
            <ImageIcon className="size-4.5" />
          </span>
          <span className="flex-1">
            <span className="block text-[13px] font-semibold">Post published to Instagram</span>
            <span className="block text-[12px] text-muted-foreground">1.2k reach · 86 likes</span>
          </span>
          <CircleCheck className="size-5 shrink-0 text-success" />
        </FloatingCard>

        <FloatingCard delay={2} className="ml-8 w-64 flex-col items-stretch gap-2">
          <span className="text-[11px] font-medium text-muted-foreground">
            Ad results this week
          </span>
          <span className="flex items-center gap-2">
            <span className="font-display text-[22px] leading-7 font-bold">+38% leads</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-1.5 py-0.5 text-[10px] font-bold text-success-soft-foreground">
              <TrendingUp className="size-3" />
              38%
            </span>
          </span>
          <span className="flex h-6 items-end gap-1">
            {leadBars.map((height, index) => (
              <span
                key={index}
                style={{ height: `${height}%` }}
                className={cn(
                  "w-3 rounded-sm",
                  index === leadBars.length - 1 ? "bg-primary" : "bg-primary-soft",
                )}
              />
            ))}
          </span>
        </FloatingCard>
      </div>

      <figure className="relative mt-10 flex items-end justify-between gap-6">
        <div>
          <blockquote className="font-display text-[18px] leading-7 font-semibold">
            “Got 3× more orders in 2 months.”
          </blockquote>
          <figcaption className="mt-3 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-[11px] font-bold text-accent-soft-foreground">
              SS
            </span>
            <span>
              <span className="block text-[13px] font-semibold">Sharma Sweets</span>
              <span className="block text-[12px] text-primary-foreground/70">
                Restaurant, Delhi
              </span>
            </span>
          </figcaption>
        </div>
        <p className="shrink-0 text-[12px] text-primary-foreground/70">
          Trusted by 2,000+ businesses
        </p>
      </figure>
    </aside>
  );
}

function FloatingCard({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    // Outer: slide in (120ms stagger). Inner: float loop, offset per card.
    <div className="animate-fade-up" style={{ animationDelay: `${200 + delay * 120}ms` }}>
      <div
        className={cn(
          "flex animate-float items-center gap-3 rounded-xl bg-card p-3.5 shadow-xl",
          className,
        )}
        style={{ animationDelay: `${delay * -1.3}s` }}
      >
        {children}
      </div>
    </div>
  );
}
