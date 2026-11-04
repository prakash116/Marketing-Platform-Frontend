"use client";

import { cva } from "class-variance-authority";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useAppHeaderData } from "@/hooks/use-app-header-data";
import { cn, formatINR } from "@/lib/utils";
import { appRoutes } from "./app-routes";

export const LOW_CREDITS_THRESHOLD = 200;

export type WaCreditsTone = "ok" | "low" | "empty";

export function getWaCreditsTone(amount: number): WaCreditsTone {
  if (amount <= 0) return "empty";
  return amount < LOW_CREDITS_THRESHOLD ? "low" : "ok";
}

const chipVariants = cva(
  "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 whitespace-nowrap transition-colors duration-150 [&_svg]:size-4",
  {
    variants: {
      tone: {
        ok: "border-success-border bg-success-soft text-success-soft-foreground hover:border-success",
        low: "border-warning-border bg-warning-soft text-warning-soft-foreground hover:border-warning",
        empty:
          "border-destructive-border bg-destructive-soft text-destructive-soft-foreground hover:border-destructive",
      },
    },
  },
);

export function WaCreditsChip({ amount, className }: { amount: number; className?: string }) {
  const tone = getWaCreditsTone(amount);
  const formatted = formatINR(amount);
  return (
    <Link
      href={appRoutes.wallet}
      prefetch={false}
      data-tone={tone}
      aria-label={`WhatsApp credits: ${formatted}. Open wallet`}
      className={cn(chipVariants({ tone }), className)}
    >
      <MessageCircle aria-hidden="true" />
      <span className="text-[14px] leading-5 font-bold tabular-nums">{formatted}</span>
      {/* 1024–1279px shows the amount only. */}
      <span className="hidden text-[12px] leading-4 font-medium xl:inline">WA credits</span>
    </Link>
  );
}

/** Reads the balance from the header query. Hidden below 1024px (it lives in the menu). */
export function HeaderWaCredits() {
  const { data } = useAppHeaderData();
  if (!data) return null;
  return <WaCreditsChip amount={data.waCredits} className="hidden lg:inline-flex" />;
}
