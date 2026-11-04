import type { Route } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { BRAND_NAME } from "@/config/brand";
import { cn } from "@/lib/utils";

export type LogoSize = 28 | 32 | 36;

const markSize: Record<LogoSize, string> = {
  28: "size-7 [&_svg]:size-4",
  32: "size-8 [&_svg]:size-[18px]",
  36: "size-9 [&_svg]:size-5",
};

const wordmarkSize: Record<LogoSize, string> = {
  28: "text-[16px]",
  32: "text-[18px]",
  36: "text-[20px]",
};

export interface LogoProps {
  size?: LogoSize;
  withWordmark?: boolean;
  /** `/` on the public site, `/dashboard` inside the app. */
  href?: Route;
  className?: string;
  /** Responsive overrides, e.g. `lg:size-9` to grow the mark on desktop. */
  markClassName?: string;
  wordmarkClassName?: string;
}

export function Logo({
  size = 32,
  withWordmark = true,
  href = "/",
  className,
  markClassName,
  wordmarkClassName,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={withWordmark ? undefined : `${BRAND_NAME} home`}
      className={cn("inline-flex shrink-0 items-center gap-2.5 rounded-md", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center rounded-[25%] bg-primary text-primary-foreground",
          markSize[size],
          markClassName,
        )}
      >
        <Sparkles strokeWidth={2.25} />
      </span>
      {withWordmark ? (
        <span
          className={cn(
            "font-display leading-none font-extrabold tracking-[-0.01em] text-foreground",
            wordmarkSize[size],
            wordmarkClassName,
          )}
        >
          {BRAND_NAME}
        </span>
      ) : null}
    </Link>
  );
}
