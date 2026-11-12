"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { businessTypes, type SignupDetails } from "@/mocks/auth";
import { SuccessBurst } from "./auth-parts";

const REDIRECT_AFTER_MS = 1200;

/** Returning user: tick + confetti, then straight to the dashboard after 1.2s. */
export function LoggedInStep() {
  const router = useRouter();

  useEffect(() => {
    // TODO: the API sets the httpOnly session cookie on verify; just navigate here.
    const timer = setTimeout(() => router.push("/dashboard"), REDIRECT_AFTER_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center text-center" role="status">
      <SuccessBurst />
      <h1 className="font-display text-[28px] leading-9 font-bold text-foreground">
        You&apos;re in!
      </h1>
      <p className="mt-1 text-[14px] text-muted-foreground">Taking you to your dashboard…</p>
      <span className="mt-6 h-1 w-24 overflow-hidden rounded-full bg-muted">
        <span className="block h-full origin-left animate-grow-x rounded-full bg-primary" />
      </span>
    </div>
  );
}

/** What the ready screen says for each account type. */
function readyCopy(details: SignupDetails): { summary: string; next: string; nextHint: string } {
  switch (details.accountType) {
    case "business": {
      const typeLabel =
        businessTypes.find((type) => type.value === details.type)?.label.toLowerCase() ??
        "business";
      return {
        summary: `${details.businessName} is set up with ${typeLabel} templates.`,
        next: "Next: connect WhatsApp + Instagram",
        nextHint: "About 2 minutes · you can skip",
      };
    }
    case "agency":
      return {
        summary: `${details.agencyName} is ready for your clients.`,
        next: "Next: add your first client business",
        nextHint: "About 1 minute · add more any time",
      };
    case "creator":
      return {
        summary: `Brands in ${details.city} can now find @${details.instagram}.`,
        next: "Next: finish your creator profile",
        nextHint: "Add your rates and past work · about 3 minutes",
      };
  }
}

/** New account: step 3 of 3, ready screen with the next step for its type. */
export function AccountReadyStep({ details }: { details: SignupDetails }) {
  const copy = readyCopy(details);

  return (
    <div className="flex flex-col items-center text-center" role="status">
      <SuccessBurst />
      <h1 className="font-display text-[28px] leading-9 font-bold text-foreground">
        Your account is ready!
      </h1>
      <p className="mt-1 max-w-72 text-[14px] text-muted-foreground">{copy.summary}</p>

      <div className="mt-6 w-full rounded-lg bg-muted px-4 py-3 text-left">
        <p className="text-[13px] font-semibold text-foreground">{copy.next}</p>
        <p className="text-[12px] text-muted-foreground">{copy.nextHint}</p>
      </div>

      {/* TODO: point at the onboarding flow once it exists. */}
      <Button size="lg" className="mt-8 w-full text-[15px]" asChild>
        <Link href="/dashboard">
          Start setup
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}
