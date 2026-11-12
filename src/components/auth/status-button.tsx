"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ButtonStatus = "idle" | "loading" | "success";

export interface StatusButtonProps extends Omit<ButtonProps, "loading" | "children"> {
  status: ButtonStatus;
  children: ReactNode;
  loadingLabel: string;
  successLabel?: string;
  /** Show the → arrow in the idle state. */
  arrow?: boolean;
}

/**
 * Full-width primary action with three states: idle (label + →), loading
 * (spinner, locked) and success (turns green with a tick; same width).
 */
export function StatusButton({
  status,
  children,
  loadingLabel,
  successLabel,
  arrow = true,
  className,
  disabled,
  ...props
}: StatusButtonProps) {
  const busy = status !== "idle";
  return (
    <Button
      size="lg"
      aria-busy={status === "loading" || undefined}
      disabled={disabled || busy}
      className={cn(
        "w-full text-[15px]",
        // Keep the locked button readable; only a truly disabled one fades.
        busy && "disabled:opacity-100",
        status === "success" && "bg-success text-success-foreground hover:bg-success",
        className,
      )}
      {...props}
    >
      {status === "loading" ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" />
          {loadingLabel}
        </>
      ) : status === "success" ? (
        <span className="inline-flex animate-pop-in items-center gap-2">
          <Check aria-hidden="true" />
          {successLabel}
        </span>
      ) : (
        <>
          {children}
          {arrow ? <ArrowRight aria-hidden="true" /> : null}
        </>
      )}
    </Button>
  );
}
