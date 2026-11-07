"use client";

import { Mail } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleIcon } from "./auth-icons";

export const TOTAL_SIGNUP_STEPS = 3;

/** "STEP 2 OF 3" + one bar per step. */
export function StepProgress({ step }: { step: number }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] leading-4 font-bold tracking-[0.08em] text-primary uppercase">
        Step {step} of {TOTAL_SIGNUP_STEPS}
      </p>
      <div
        role="progressbar"
        aria-label="Sign-up progress"
        aria-valuemin={1}
        aria-valuemax={TOTAL_SIGNUP_STEPS}
        aria-valuenow={step}
        className="mt-2 flex gap-2"
      >
        {Array.from({ length: TOTAL_SIGNUP_STEPS }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              index < step ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function StepHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-[26px] leading-8 font-bold tracking-[-0.01em] text-foreground lg:text-[30px] lg:leading-9.5">
        {title}
      </h1>
      {children ? (
        <div className="mt-1.5 text-[14px] leading-5.5 text-muted-foreground">{children}</div>
      ) : null}
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="my-5 flex items-center gap-3 text-[12px] text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      or
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

// TODO: wire Google OAuth and the email + password flow on the auth API.
const comingSoon = (what: string) => () => toast(`${what} is coming soon`);

export function GoogleButton() {
  return (
    <Button
      variant="secondary"
      size="lg"
      className="w-full text-[15px]"
      onClick={comingSoon("Google sign-in")}
    >
      <GoogleIcon className="size-4.5!" />
      Continue with Google
    </Button>
  );
}

export function EmailLink() {
  return (
    <button
      type="button"
      onClick={comingSoon("Email and password sign-in")}
      className="mx-auto mt-4 flex min-h-11 cursor-pointer items-center gap-2 rounded-md text-[14px] font-semibold text-primary hover:underline"
    >
      <Mail className="size-4" aria-hidden="true" />
      Use email and password
    </button>
  );
}

const terms = "/terms" as Route;
const privacy = "/privacy" as Route;

export function TermsNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-center text-[12px] leading-4 text-muted-foreground", className)}>
      By continuing you agree to our{" "}
      <Link href={terms} prefetch={false} className="underline-offset-2 hover:underline">
        Terms
      </Link>{" "}
      and{" "}
      <Link href={privacy} prefetch={false} className="underline-offset-2 hover:underline">
        Privacy Policy
      </Link>
      .
    </p>
  );
}

/** Where each confetti piece lands (px) and which chart colour it uses. */
const confetti = [
  [-92, -70, "bg-chart-1"],
  [-60, -100, "bg-chart-5"],
  [0, -112, "bg-chart-4"],
  [58, -96, "bg-chart-6"],
  [96, -62, "bg-chart-2"],
  [112, -8, "bg-chart-3"],
  [100, 48, "bg-chart-1"],
  [64, 92, "bg-chart-5"],
  [8, 108, "bg-chart-6"],
  [-50, 96, "bg-chart-2"],
  [-98, 56, "bg-chart-4"],
  [-114, -6, "bg-chart-3"],
  [-30, -84, "bg-chart-2"],
  [34, -72, "bg-chart-1"],
  [80, 14, "bg-chart-6"],
  [-78, 22, "bg-chart-5"],
] as const;

/** Green tick that draws itself (400ms) with a confetti burst (600ms). */
export function SuccessBurst() {
  return (
    <div aria-hidden="true" className="relative mx-auto flex size-56 items-center justify-center">
      {confetti.map(([x, y, color], index) => (
        <span
          key={index}
          className={cn("absolute h-2.5 w-1 animate-confetti rounded-full", color)}
          style={
            {
              "--x": `${x}px`,
              "--y": `${y}px`,
              rotate: `${(index * 47) % 180}deg`,
              animationDelay: `${120 + (index % 4) * 30}ms`,
            } as CSSProperties
          }
        />
      ))}
      <span className="flex size-24 animate-pop-in items-center justify-center rounded-full bg-success-soft">
        <span className="flex size-16 items-center justify-center rounded-full bg-success text-success-foreground">
          <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor">
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="24"
              className="animate-check-draw"
            />
          </svg>
        </span>
      </span>
    </div>
  );
}
