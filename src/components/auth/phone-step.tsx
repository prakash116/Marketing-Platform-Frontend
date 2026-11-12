"use client";

import { useMutation } from "@tanstack/react-query";
import { ShieldCheck, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { isValidIndianMobile } from "@/lib/phone";
import { sendOtp } from "@/mocks/auth";
import { EmailLink, GoogleButton, OrDivider, StepHeading, StepProgress } from "./auth-parts";
import type { AuthVariant } from "./brand-panel";
import { PhoneInput } from "./phone-input";
import { StatusButton } from "./status-button";

/** How long the green "Code sent" state shows before the code screen. */
export const SUCCESS_HOLD_MS = 600;

export interface PhoneStepProps {
  mode: AuthVariant;
  initialPhone: string;
  onSent: (phone: string) => void;
}

export function PhoneStep({ mode, initialPhone, onSent }: PhoneStepProps) {
  const [phone, setPhone] = useState(initialPhone);
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);
  // TODO: send this preference with the sign-up once the API exists.
  const [whatsappTips, setWhatsappTips] = useState(true);
  const valid = isValidIndianMobile(phone);

  const send = useMutation({
    mutationFn: () => sendOtp(phone),
    onSuccess: () => {
      setSent(true);
      setTimeout(() => onSent(phone), SUCCESS_HOLD_MS);
    },
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (valid && send.isIdle) send.mutate();
  };

  const isSignup = mode === "signup";

  return (
    <div>
      {/* Phone illustration: mobile only (the desktop has the brand panel). */}
      <div aria-hidden="true" className="relative mx-auto mb-8 size-24 lg:hidden">
        <span className="flex size-24 items-center justify-center rounded-full bg-primary-soft text-primary">
          <Smartphone className="size-9" strokeWidth={1.75} />
        </span>
        <span className="absolute -top-1 -right-3 flex h-6 items-center gap-0.5 rounded-full bg-success px-2 shadow-md">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-1 rounded-full bg-success-foreground" />
          ))}
        </span>
      </div>

      {isSignup ? <StepProgress step={1} /> : null}
      {isSignup ? (
        <StepHeading title="Create your free account">
          No card needed. Takes 60 seconds.
        </StepHeading>
      ) : (
        <StepHeading title="Welcome back">
          Log in with your mobile number.
          <span className="max-lg:hidden"> We will send a code.</span>
        </StepHeading>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <PhoneInput
          value={phone}
          onChange={(digits) => {
            setPhone(digits);
            // A full number is checked right away; a partial one waits for blur.
            if (digits.length === 10) setTouched(true);
          }}
          onBlur={() => phone && setTouched(true)}
          showError={touched}
          autoFocus
        />

        {isSignup ? (
          <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[13px] text-text-secondary">
            <input
              type="checkbox"
              checked={whatsappTips}
              onChange={(event) => setWhatsappTips(event.target.checked)}
              className="size-4 cursor-pointer rounded accent-primary"
            />
            Send me tips and updates on WhatsApp
          </label>
        ) : null}

        <StatusButton
          type="submit"
          status={sent ? "success" : send.isPending ? "loading" : "idle"}
          loadingLabel="Sending code…"
          successLabel="Code sent"
          disabled={!valid}
        >
          {isSignup ? "Continue" : "Get OTP"}
        </StatusButton>
      </form>

      <OrDivider />
      <GoogleButton />
      {isSignup ? null : <EmailLink />}

      {isSignup ? null : (
        <div className="mt-6 hidden gap-3 rounded-lg bg-muted p-3.5 lg:flex">
          <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-success" aria-hidden="true" />
          <p className="text-[12.5px] leading-5 text-muted-foreground">
            <span className="block font-semibold text-foreground">
              Same number for login and sign-up.
            </span>
            New number? We create your free account after the code.
          </p>
        </div>
      )}

      {/* On desktop this link sits in the top bar. */}
      <p className="mt-8 text-center text-[13px] text-muted-foreground lg:hidden">
        {isSignup ? "Have an account? " : "New here? "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-semibold text-primary hover:underline"
        >
          {isSignup ? "Log in" : "Create free account"}
        </Link>
      </p>
    </div>
  );
}
