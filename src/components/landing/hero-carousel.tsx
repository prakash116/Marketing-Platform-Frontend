"use client";

import { ArrowRight, ChevronLeft, ChevronRight, CircleCheck, Pause, Play } from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { asRoute } from "@/components/site-header/nav-config";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types/site";
import { HeroVisual } from "./hero-visual";

export const AUTOPLAY_MS = 7000;
const SWIPE_MIN_PX = 48;

/* ---- browser state as external stores (SSR: no autoplay, page visible) ---- */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getReducedMotion = () =>
  typeof window.matchMedia === "function" && window.matchMedia(REDUCED_MOTION).matches;
const getServerReducedMotion = () => true;

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
const getHidden = () => document.hidden;
const getServerHidden = () => false;

export interface HeroCarouselProps {
  slides: HeroSlide[];
  /** Time each slide stays before the next one, in ms. */
  interval?: number;
}

/**
 * Landing hero: one slide per audience (business, creators, agencies, tech
 * services), picked with the tabs or the arrows, swiped on touch screens and
 * rotated automatically.
 *
 * - Every slide is in the server HTML (crawlable). Slides share one grid cell,
 *   so the hero keeps the height of the tallest slide and never jumps.
 * - Autoplay stops on hover, on keyboard focus, in a background tab and when
 *   the user prefers reduced motion; the pause button stops it for good.
 * - Accessible tabbed-carousel pattern (WAI-ARIA APG): tablist + tabpanels,
 *   arrow keys move between tabs, inactive slides are `inert`.
 */
export function HeroCarousel({ slides, interval = AUTOPLAY_MS }: HeroCarouselProps) {
  const count = slides.length;
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, getServerHidden);

  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const canAutoplay = count > 1 && !reducedMotion;
  const playing = canAutoplay && !stopped && !hidden && !hovered && !keyboardFocus;

  const goTo = useCallback(
    (index: number) => setActive(((index % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => goTo(active + 1), interval);
    return () => window.clearTimeout(timer);
  }, [playing, active, interval, goTo]);

  if (count === 0) return null;

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyTargets: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: count - 1,
    };
    const target = keyTargets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = ((target % count) + count) % count;
    goTo(next);
    tabRefs.current[next]?.focus();
  };

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Horizontal swipes only; vertical drags keep scrolling the page.
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;
    goTo(active + (dx < 0 ? 1 : -1));
  };

  // Pause while a keyboard user is inside the carousel (WCAG 2.2.2), not on mouse clicks.
  const onFocus = (event: FocusEvent) => {
    let visible = false;
    try {
      visible = (event.target as Element).matches(":focus-visible");
    } catch {
      visible = false;
    }
    if (visible) setKeyboardFocus(true);
  };
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Who we help"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setHovered(false)}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {/* Phones: 4 equal columns across the full width. sm+: a compact pill. */}
      <div
        role="tablist"
        aria-label="Choose who you are"
        className="grid w-full grid-cols-4 gap-1 rounded-full border border-border bg-card/80 p-1 shadow-sm backdrop-blur sm:inline-flex sm:w-auto"
      >
        {slides.map((slide, index) => {
          const selected = index === active;
          return (
            <button
              key={slide.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId(index)}
              type="button"
              role="tab"
              aria-label={slide.tabLabel}
              aria-selected={selected}
              aria-controls={panelId(index)}
              tabIndex={selected ? 0 : -1}
              onClick={() => goTo(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={cn(
                "relative h-9 min-w-0 cursor-pointer truncate overflow-hidden rounded-full px-1 text-[12px] leading-5 font-semibold whitespace-nowrap transition-colors duration-150 min-[360px]:px-1.5 min-[360px]:text-[13px] sm:h-10 sm:px-4 sm:text-[14px]",
                selected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-text-secondary hover:bg-muted hover:text-foreground",
              )}
            >
              {slide.tabShortLabel ? (
                <>
                  <span className="sm:hidden">{slide.tabShortLabel}</span>
                  <span className="hidden sm:inline">{slide.tabLabel}</span>
                </>
              ) : (
                slide.tabLabel
              )}
              {selected && playing ? (
                // Time left on this slide; restarts whenever autoplay resumes.
                <span
                  key={`${active}-${String(playing)}`}
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-1 h-0.5 origin-left animate-grow-x rounded-full bg-primary-foreground/50 sm:inset-x-4"
                  style={{ animationDuration: `${interval}ms` }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        className="mt-8 grid lg:mt-10"
        aria-live={playing ? "off" : "polite"}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => {
          const selected = index === active;
          return (
            <div
              key={slide.id}
              id={panelId(index)}
              role="tabpanel"
              aria-roledescription="slide"
              aria-labelledby={tabId(index)}
              inert={!selected}
              className={cn(
                "col-start-1 row-start-1 transition-[opacity,translate] duration-500 ease-out-soft",
                selected
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-4 opacity-0",
              )}
            >
              <SlideBody slide={slide} active={selected} first={index === 0} />
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-2 lg:mt-10">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          aria-label="Previous slide"
          onClick={() => goTo(active - 1)}
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          aria-label="Next slide"
          onClick={() => goTo(active + 1)}
        >
          <ChevronRight aria-hidden="true" />
        </Button>
        {canAutoplay ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
            onClick={() => setStopped((value) => !value)}
          >
            {stopped ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </Button>
        ) : null}
        <span
          aria-hidden="true"
          className="ml-2 text-[13px] font-medium text-muted-foreground tabular-nums"
        >
          <span className="text-foreground">{String(active + 1).padStart(2, "0")}</span> /{" "}
          {String(count).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function SlideBody({
  slide,
  active,
  first,
}: {
  slide: HeroSlide;
  active: boolean;
  first: boolean;
}) {
  const credit = slide.image?.credit;
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-10 xl:gap-16">
      <div className="max-w-xl">
        <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-[12px] leading-5 font-semibold text-primary-soft-foreground">
          {slide.eyebrow}
        </span>
        <Heading
          level="display"
          as="h2"
          className="mt-4 text-[34px] leading-10 sm:text-[48px] sm:leading-14"
        >
          {slide.title}{" "}
          <span className="block text-primary dark:text-primary-soft-foreground">
            {slide.highlight}
          </span>
        </Heading>
        <Text variant="body-lg" tone="secondary" className="mt-4 max-w-lg">
          {slide.description}
        </Text>
        <ul className="mt-5 grid gap-2">
          {slide.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-[14px] leading-5 text-text-secondary"
            >
              <CircleCheck className="mt-px size-4.5 shrink-0 text-success" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Button size="lg" asChild>
            {/* Prefetch only signup, the conversion path; most other pages don't exist yet. */}
            <Link
              href={asRoute(slide.primaryCta.href)}
              prefetch={slide.primaryCta.href.startsWith("/signup") ? undefined : false}
            >
              {slide.primaryCta.title}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          {slide.secondaryCta ? (
            <Button size="lg" variant="secondary" asChild>
              <Link href={asRoute(slide.secondaryCta.href)} prefetch={false}>
                {slide.secondaryCta.title}
              </Link>
            </Button>
          ) : null}
        </div>
      </div>

      <div>
        <HeroVisual
          visual={slide.visual}
          image={slide.image}
          active={active}
          // Only the first slide's photo is the LCP image; the rest load lazily.
          preload={first}
        />
        {credit ? (
          <p className="mt-2 text-right text-[11px] leading-4 text-muted-foreground">
            Photo:{" "}
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline"
            >
              {credit.name}
            </a>
            {credit.license ? ` · ${credit.license}` : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}
