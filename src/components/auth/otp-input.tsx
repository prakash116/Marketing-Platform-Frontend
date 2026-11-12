"use client";

import { useEffect, useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export const OTP_LENGTH = 6;

export type OtpStatus = "idle" | "error" | "success";

export interface OtpInputProps {
  value: string;
  onChange: (code: string) => void;
  status: OtpStatus;
  disabled?: boolean;
  /** Bump to replay the error shake. */
  errorCount?: number;
}

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Six one-digit boxes. Typing pops the box (1 → 1.06 → 1, 120ms) and moves
 * focus on; paste fills all six; a wrong code shakes the row and turns it red;
 * a correct code turns the boxes green left to right (40ms stagger).
 */
export function OtpInput({ value, onChange, status, disabled, errorCount = 0 }: OtpInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!errorCount || !row.current) return;
    navigator.vibrate?.(50);
    if (reduceMotion()) return;
    row.current.animate(
      [0, -6, 6, -6, 6, -6, 0].map((x) => ({ transform: `translateX(${x}px)` })),
      { duration: 300, easing: "ease-in-out" },
    );
    inputs.current[0]?.focus();
  }, [errorCount]);

  const focusBox = (index: number) => {
    const box = inputs.current[Math.max(0, Math.min(OTP_LENGTH - 1, index))];
    box?.focus();
    box?.select();
  };

  const pop = (index: number) => {
    if (reduceMotion()) return;
    inputs.current[index]?.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }],
      { duration: 120, easing: "ease-out" },
    );
  };

  const setDigits = (start: number, digits: string) => {
    const chars = value.padEnd(OTP_LENGTH, " ").split("");
    digits.split("").forEach((digit, offset) => {
      if (start + offset < OTP_LENGTH) chars[start + offset] = digit;
    });
    const next = chars.join("").replace(/\s+$/, "").replace(/\s/g, "");
    onChange(next.slice(0, OTP_LENGTH));
    for (let i = start; i < Math.min(OTP_LENGTH, start + digits.length); i += 1) pop(i);
    focusBox(start + digits.length);
  };

  const onInput = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return;
    const old = value[index] ?? "";
    const typedOverDigit = digits.length === 2 && old !== "";
    if (digits.length > 1 && !typedOverDigit) {
      // Autofill (one-time-code) can drop the whole code into one box.
      setDigits(0, digits.slice(0, OTP_LENGTH));
      return;
    }
    const digit = typedOverDigit ? (digits[0] === old ? digits[1]! : digits[0]!) : digits;
    // Boxes fill left to right: a digit typed in a later empty box goes to the next free one.
    setDigits(Math.min(index, value.length), digit);
  };

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (value[index]) onChange(value.slice(0, index) + value.slice(index + 1));
      else if (index > 0) {
        onChange(value.slice(0, index - 1) + value.slice(index));
        focusBox(index - 1);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusBox(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusBox(index + 1);
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!digits) return;
    event.preventDefault();
    setDigits(0, digits);
  };

  return (
    <div ref={row} role="group" aria-label="6-digit code" className="flex gap-2 sm:gap-2.5">
      {Array.from({ length: OTP_LENGTH }, (_, index) => {
        const digit = value[index] ?? "";
        return (
          <input
            key={index}
            ref={(node) => {
              inputs.current[index] = node;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={OTP_LENGTH}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${index + 1}`}
            disabled={disabled}
            value={digit}
            data-filled={digit ? "" : undefined}
            data-status={status === "idle" ? undefined : status}
            onChange={(event) => onInput(index, event.target.value)}
            onKeyDown={(event) => onKeyDown(index, event)}
            onPaste={onPaste}
            onFocus={(event) => event.target.select()}
            style={{ transitionDelay: status === "success" ? `${index * 40}ms` : undefined }}
            className={cn(
              "h-13 w-full min-w-0 flex-1 rounded-lg border border-input bg-card text-center font-display text-[22px] font-bold text-foreground caret-primary outline-none sm:h-14",
              "transition-[border-color,background-color,color,box-shadow] duration-150 ease-out-soft",
              "focus:border-primary focus:ring-3 focus:ring-primary/15 data-filled:border-border-strong",
              "data-[status=error]:border-destructive data-[status=error]:bg-destructive-soft data-[status=error]:text-destructive-soft-foreground",
              "data-[status=success]:border-success data-[status=success]:bg-success-soft data-[status=success]:text-success-soft-foreground",
              "disabled:cursor-default",
            )}
          />
        );
      })}
    </div>
  );
}
