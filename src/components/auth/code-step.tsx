"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2, MessageCircle } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { FieldError } from "@/components/ui/input";
import { isProd } from "@/config/env";
import { formatIndianMobile } from "@/lib/phone";
import { MOCK_OTP, sendOtp, verifyOtp, type OtpChannel } from "@/mocks/auth";
import { StepHeading } from "./auth-parts";
import { OTP_LENGTH, OtpInput, type OtpStatus } from "./otp-input";
import { SUCCESS_HOLD_MS } from "./phone-step";
import { StatusButton } from "./status-button";

const RESEND_AFTER_S = 30;

const subscribeNoop = () => () => {};
// WebOTP (Android Chrome) can read the code from the SMS automatically.
const hasWebOtp = () => "OTPCredential" in window;

export interface CodeStepProps {
  phone: string;
  onChangeNumber: () => void;
  onVerified: (result: { isNewUser: boolean }) => void;
}

export function CodeStep({ phone, onChangeNumber, onVerified }: CodeStepProps) {
  const [code, setCode] = useState("");
  const [otpStatus, setOtpStatus] = useState<OtpStatus>("idle");
  const [errorCount, setErrorCount] = useState(0);
  const [channel, setChannel] = useState<OtpChannel>("sms");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_AFTER_S);
  const webOtp = useSyncExternalStore(subscribeNoop, hasWebOtp, () => false);

  const verify = useMutation({
    mutationFn: (value: string) => verifyOtp(phone, value),
    onSuccess: (result) => {
      setOtpStatus("success");
      setTimeout(() => onVerified(result), SUCCESS_HOLD_MS + 200);
    },
    onError: () => {
      setOtpStatus("error");
      setErrorCount((count) => count + 1);
    },
  });

  const resend = useMutation({
    mutationFn: (next: OtpChannel) => sendOtp(phone, next),
    onSuccess: (_, next) => {
      setChannel(next);
      setSecondsLeft(RESEND_AFTER_S);
      setCode("");
      setOtpStatus("idle");
    },
  });

  const submit = (value: string) => {
    if (value.length === OTP_LENGTH && !verify.isPending && otpStatus !== "success") {
      verify.mutate(value);
    }
  };

  const onCodeChange = (value: string) => {
    setCode(value);
    if (otpStatus === "error") setOtpStatus("idle");
    // Auto-submit at 6 digits; no tap on Verify needed.
    submit(value);
  };

  // Resend countdown.
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  // Read the code from the SMS where the browser supports it.
  useEffect(() => {
    if (!webOtp || channel !== "sms") return;
    const abort = new AbortController();
    (
      navigator.credentials.get({
        otp: { transport: ["sms"] },
        signal: abort.signal,
      } as CredentialRequestOptions) as Promise<(Credential & { code?: string }) | null>
    )
      .then((credential) => {
        if (credential?.code) onCodeChange(credential.code.slice(0, OTP_LENGTH));
      })
      .catch(() => {});
    return () => abort.abort();
    // onCodeChange reads fresh state on every render; re-arming per render is not wanted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webOtp, channel]);

  const sentTo = `+91 ${formatIndianMobile(phone)}`;
  const verified = otpStatus === "success";

  return (
    <div>
      <span
        aria-hidden="true"
        className="mb-5 flex size-12 items-center justify-center rounded-full bg-success-soft text-success"
      >
        <MessageCircle className="size-5.5" />
      </span>
      <StepHeading title={`Enter the ${OTP_LENGTH}-digit code`}>
        Sent {channel === "sms" ? "by SMS" : "on WhatsApp"} to{" "}
        <span className="font-medium text-text-secondary">{sentTo}</span>
        <button
          type="button"
          onClick={onChangeNumber}
          disabled={verified}
          className="mt-0.5 block cursor-pointer text-[13px] font-semibold text-primary hover:underline"
        >
          Change number
        </button>
      </StepHeading>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          submit(code);
        }}
      >
        <OtpInput
          value={code}
          onChange={onCodeChange}
          status={otpStatus}
          disabled={verified || verify.isPending}
          errorCount={errorCount}
        />

        <div
          className="mt-4 min-h-5 space-y-2 text-[13px] text-muted-foreground"
          aria-live="polite"
        >
          {otpStatus === "error" ? (
            <FieldError className="mt-0">{verify.error?.message}</FieldError>
          ) : webOtp && channel === "sms" && !verified ? (
            <p className="flex items-center gap-2">
              <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
              Reading code from SMS…
            </p>
          ) : null}
          {!verified ? (
            secondsLeft > 0 ? (
              <p>
                Didn&apos;t get it? Resend in{" "}
                <span className="tabular-nums">0:{String(secondsLeft).padStart(2, "0")}</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={() => resend.mutate("sms")}
                disabled={resend.isPending}
                className="animate-fade-up cursor-pointer font-semibold text-primary hover:underline"
              >
                {resend.isPending ? "Sending…" : "Resend code"}
              </button>
            )
          ) : null}
        </div>

        {channel === "sms" && !verified ? (
          <button
            type="button"
            onClick={() => resend.mutate("whatsapp")}
            disabled={resend.isPending}
            className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-success-border bg-success-soft text-[14px] font-semibold text-success-soft-foreground transition-colors hover:border-success disabled:opacity-60"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Get code on WhatsApp instead
          </button>
        ) : null}

        <StatusButton
          type="submit"
          className="mt-8"
          arrow={false}
          status={verified ? "success" : verify.isPending ? "loading" : "idle"}
          loadingLabel="Verifying…"
          successLabel="Verified"
          disabled={code.length < OTP_LENGTH}
        >
          Verify
        </StatusButton>

        {isProd ? null : (
          <p className="mt-3 text-center text-[12px] text-muted-foreground">
            Demo code: <span className="font-mono font-semibold text-foreground">{MOCK_OTP}</span>
          </p>
        )}
      </form>
    </div>
  );
}
