import { TrendingUp } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { DynamicIcon } from "@/components/icons/dynamic-icon";
import { cn } from "@/lib/utils";
import { toneClass } from "./tones";
import type { HeroActivityCard, HeroVisual as HeroVisualData, SiteImage } from "@/types/site";

export interface HeroVisualProps {
  visual: HeroVisualData;
  /** Photo behind the cards. Without it: the indigo brand-panel gradient (desktop only). */
  image?: SiteImage;
  /** Remounts the cards when the slide becomes active so the entrance replays. */
  active: boolean;
  /** Preload the photo: only for the first slide, which is the page's LCP image. */
  preload?: boolean;
  className?: string;
}

/**
 * Product preview for a hero slide. Hidden from screen readers; the slide's
 * text carries the message (photo credits are rendered by the slide).
 *
 * - With a photo: phones get the photo with the metric card inside it;
 *   from 1024px the photo is square with two cards on its corners.
 * - Without a photo: the auth brand-panel look, desktop only.
 */
export function HeroVisual({ visual, image, active, preload = false, className }: HeroVisualProps) {
  return image ? (
    <PhotoVisual
      visual={visual}
      image={image}
      active={active}
      preload={preload}
      className={className}
    />
  ) : (
    <GradientVisual visual={visual} active={active} className={cn("hidden lg:block", className)} />
  );
}

function PhotoVisual({
  visual,
  image,
  active,
  preload,
  className,
}: Required<Pick<HeroVisualProps, "visual" | "image" | "active" | "preload">> & {
  className?: string;
}) {
  const [firstCard] = visual.cards;

  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      {/* The padding leaves room for cards that hang over the photo's edges. */}
      <div className="relative pb-8 lg:py-8 lg:pl-12">
        <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-muted shadow-lg ring-1 ring-border sm:aspect-2/1 lg:aspect-square lg:rounded-3xl lg:shadow-xl">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 460px, (min-width: 1024px) 40vw, 100vw"
            preload={preload}
            className="object-cover"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
          {/* Darkens the bottom so the white cards and the photo never blend. */}
          <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/0 to-black/0" />
        </div>

        <div key={active ? "on" : "off"}>
          {firstCard ? (
            <FloatingCard order={0} className="absolute top-0 left-0 hidden w-72 lg:block">
              <ActivityCard card={firstCard} />
            </FloatingCard>
          ) : null}

          {/* Cards sit on the photo's corners only, so the centre (usually a face) stays clear. */}
          <FloatingCard
            order={1}
            className="absolute bottom-0 left-3 w-56 sm:w-64 lg:right-0 lg:left-auto lg:w-72"
            cardClassName="flex-col items-stretch gap-1.5 p-3 lg:gap-2 lg:p-3.5"
          >
            <MetricCard visual={visual} />
          </FloatingCard>
        </div>
      </div>
    </div>
  );
}

function GradientVisual({
  visual,
  active,
  className,
}: Pick<HeroVisualProps, "visual" | "active" | "className">) {
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
            <MetricCard visual={visual} />
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

function MetricCard({ visual }: { visual: HeroVisualData }) {
  return (
    <>
      <span className="text-[11px] font-medium text-muted-foreground">{visual.metricLabel}</span>
      <span className="flex items-center gap-2">
        <span className="font-display text-[18px] leading-6 font-bold lg:text-[22px] lg:leading-7">
          {visual.metricValue}
        </span>
        {visual.metricBadge ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-success-soft-foreground">
            <TrendingUp className="size-3" />
            {visual.metricBadge}
          </span>
        ) : null}
      </span>
      {/* Bars from sm: on phones the card stays small so the photo shows. */}
      <span className="hidden h-8 items-end gap-1.5 sm:flex lg:h-12">
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
    </>
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
  /** Layout of the card: width, alignment, position. */
  className?: string;
  cardClassName?: string;
  children: ReactNode;
}) {
  const enter: CSSProperties = { animationDelay: `${120 + order * 120}ms` };
  const float: CSSProperties = { animationDelay: `${order * -1.3}s` };
  return (
    // Outer: slide in (120ms stagger). Inner: 6px float loop, offset per card.
    // Position the outer with top/left only: its animation owns `transform`.
    <div className={cn("animate-fade-up", className)} style={enter}>
      <div
        className={cn(
          "flex animate-float items-center gap-3 rounded-xl bg-card p-3.5 text-foreground shadow-xl",
          cardClassName,
        )}
        style={float}
      >
        {children}
      </div>
    </div>
  );
}
