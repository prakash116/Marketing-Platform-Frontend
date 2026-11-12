import { TrendingUp } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { cn } from "@/lib/utils";
import type { HeroActivityCard, HeroTone, HeroVisual as HeroVisualData } from "@/types/site";

const toneClass: Record<HeroTone, string> = {
  primary: "bg-primary-soft text-primary-soft-foreground",
  success: "bg-success-soft text-success",
  accent: "bg-accent-soft text-accent-soft-foreground",
  info: "bg-info-soft text-info-soft-foreground",
};

export interface HeroVisualProps {
  visual: HeroVisualData;
  /** Remounts the cards when the slide becomes active so the entrance replays. */
  active: boolean;
  className?: string;
}

/**
 * Decorative product preview for a hero slide: the auth brand-panel look
 * (indigo gradient, floating white cards). Hidden from screen readers; the
 * slide's text carries the message.
 */
export function HeroVisual({ visual, active, className }: HeroVisualProps) {
  const [firstCard, secondCard] = visual.cards;

  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-panel-from to-brand-panel-to p-8 shadow-xl xl:p-10">
        <span className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-primary-foreground/6" />
        <span className="pointer-events-none absolute -bottom-16 -left-10 size-48 rounded-full bg-primary-foreground/4" />

        <div key={active ? "on" : "off"} className="relative flex flex-col gap-5 text-foreground">
          {firstCard ? (
            <FloatingCard order={0} className="w-72 self-start">
              <ActivityCard card={firstCard} />
            </FloatingCard>
          ) : null}

          <FloatingCard
            order={1}
            className="w-80 self-end"
            cardClassName="flex-col items-stretch gap-2"
          >
            <span className="text-[11px] font-medium text-muted-foreground">
              {visual.metricLabel}
            </span>
            <span className="flex items-center gap-2">
              <span className="font-display text-[22px] leading-7 font-bold">
                {visual.metricValue}
              </span>
              {visual.metricBadge ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-1.5 py-0.5 text-[10px] font-bold text-success-soft-foreground">
                  <TrendingUp className="size-3" />
                  {visual.metricBadge}
                </span>
              ) : null}
            </span>
            <span className="flex h-12 items-end gap-1.5">
              {visual.bars.map((height, index) => (
                <span
                  key={index}
                  style={{ height: `${Math.min(Math.max(height, 6), 100)}%` }}
                  className={cn(
                    "flex-1 rounded-sm",
                    index === visual.bars.length - 1 ? "bg-primary" : "bg-primary-soft",
                  )}
                />
              ))}
            </span>
          </FloatingCard>

          {secondCard ? (
            <FloatingCard order={2} className="ml-6 w-76">
              <ActivityCard card={secondCard} />
            </FloatingCard>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ card }: { card: HeroActivityCard }) {
  return (
    <>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          toneClass[card.tone],
        )}
      >
        <DynamicIcon name={card.icon} className="size-4.5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold">{card.title}</span>
        <span className="block truncate text-[12px] text-muted-foreground">{card.meta}</span>
      </span>
    </>
  );
}

function FloatingCard({
  order,
  className,
  cardClassName,
  children,
}: {
  order: number;
  /** Layout of the card in the column: width, alignment, offset. */
  className?: string;
  cardClassName?: string;
  children: ReactNode;
}) {
  const enter: CSSProperties = { animationDelay: `${120 + order * 120}ms` };
  const float: CSSProperties = { animationDelay: `${order * -1.3}s` };
  return (
    // Outer: slide in (120ms stagger). Inner: 6px float loop, offset per card.
    <div className={cn("animate-fade-up", className)} style={enter}>
      <div
        className={cn(
          "flex animate-float items-center gap-3 rounded-xl bg-card p-3.5 shadow-xl",
          cardClassName,
        )}
        style={float}
      >
        {children}
      </div>
    </div>
  );
}
