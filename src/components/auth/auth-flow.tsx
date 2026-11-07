"use client";

import { ArrowLeft } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import type { BusinessDetails } from "@/mocks/auth";
import { TermsNote } from "./auth-parts";
import type { AuthVariant } from "./brand-panel";
import { BusinessStep } from "./business-step";
import { CodeStep } from "./code-step";
import { PhoneStep } from "./phone-step";
import { AccountReadyStep, LoggedInStep } from "./success-step";

type Step =
  | { name: "phone" }
  | { name: "code" }
  | { name: "business" }
  | { name: "loggedIn" }
  | { name: "ready"; details: BusinessDetails };

/** Next step slides in from the right; going back reverses it (24px, 220ms). */
const slide = {
  enter: (direction: number) => ({ opacity: 0, x: 24 * direction }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: -24 * direction }),
};

/**
 * Phone-first auth shared by /login and /signup:
 * number → code → (existing account: logged in) | (new number: business → ready).
 * Login and sign-up differ only in the first screen's copy.
 */
export function AuthFlow({ mode }: { mode: AuthVariant }) {
  const [step, setStep] = useState<Step>({ name: "phone" });
  const [direction, setDirection] = useState(1);
  const [phone, setPhone] = useState("");

  const go = (next: Step, dir = 1) => {
    setDirection(dir);
    setStep(next);
  };

  const showBack = step.name === "code";
  const isDone = step.name === "loggedIn" || step.name === "ready";

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-10">
        {showBack ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to mobile number"
            onClick={() => go({ name: "phone" }, -1)}
            className="-ml-2 [&_svg]:size-5"
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
        ) : (
          <Logo size={28} className="lg:invisible" />
        )}
        <div className="flex items-center gap-3">
          {isDone ? null : (
            <p className="hidden text-[13px] text-muted-foreground lg:block">
              {mode === "signup" ? "Have an account? " : "New here? "}
              <Link
                href={mode === "signup" ? "/login" : "/signup"}
                className="font-semibold text-primary hover:underline"
              >
                {mode === "signup" ? "Log in" : "Create account"}
              </Link>
            </p>
          )}
          <ThemeToggle variant="ghost" className="[&_svg]:size-5" />
        </div>
      </header>

      <main className="flex flex-1 flex-col px-5 pt-4 pb-6 sm:px-6 lg:justify-center lg:pt-0">
        <div className="mx-auto w-full max-w-[420px] animate-fade-up">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <m.div
              key={step.name}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
            >
              {step.name === "phone" ? (
                <PhoneStep
                  mode={mode}
                  initialPhone={phone}
                  onSent={(sentTo) => {
                    setPhone(sentTo);
                    go({ name: "code" });
                  }}
                />
              ) : step.name === "code" ? (
                <CodeStep
                  phone={phone}
                  onChangeNumber={() => go({ name: "phone" }, -1)}
                  onVerified={({ isNewUser }) => go({ name: isNewUser ? "business" : "loggedIn" })}
                />
              ) : step.name === "business" ? (
                <BusinessStep onCreated={(details) => go({ name: "ready", details })} />
              ) : step.name === "loggedIn" ? (
                <LoggedInStep />
              ) : (
                <AccountReadyStep details={step.details} />
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </main>

      {isDone ? null : <TermsNote className="px-5 pb-6" />}
    </div>
  );
}
