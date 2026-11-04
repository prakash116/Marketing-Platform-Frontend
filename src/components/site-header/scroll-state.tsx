"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 8;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const getServerScrolled = () => false;

/**
 * The `<header>` element of the site header. Adds `data-scrolled` once the page
 * scrolls past 8px. On the home page the header sits transparent over the hero
 * until then; everywhere else it is always solid.
 */
export function ScrollStateHeader({ className, ...props }: ComponentPropsWithoutRef<"header">) {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribe, getScrolled, getServerScrolled);
  const transparent = pathname === "/" && !scrolled;

  return (
    <header
      data-scrolled={scrolled || undefined}
      data-transparent={transparent || undefined}
      className={cn(
        "transition-[background-color,border-color] duration-200 ease-out-soft data-transparent:border-transparent data-transparent:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}
