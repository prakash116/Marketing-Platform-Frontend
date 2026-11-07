"use client";

import { CircleAlert, CircleCheck } from "lucide-react";
import { forwardRef, useId } from "react";
import { FieldError, FieldLabel, fieldClass } from "@/components/ui/input";
import { formatIndianMobile, isValidIndianMobile, toMobileDigits } from "@/lib/phone";
import { cn } from "@/lib/utils";
import { IndiaFlag } from "./auth-icons";

export interface PhoneInputProps {
  /** 10 digits, no spaces. */
  value: string;
  onChange: (digits: string) => void;
  /** Show the error state (after blur or a submit attempt). */
  showError: boolean;
  onBlur?: () => void;
  autoFocus?: boolean;
}

export const PHONE_ERROR = "Enter a valid 10-digit number";

/**
 * +91 mobile field. States: default → focus (primary border + 3px ring) →
 * error (red border, alert icon, message) → valid (green border, tick).
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  { value, onChange, showError, onBlur, autoFocus },
  ref,
) {
  const id = useId();
  const valid = isValidIndianMobile(value);
  const invalid = showError && !valid;

  return (
    <div>
      <FieldLabel htmlFor={id}>Mobile number</FieldLabel>
      <div
        data-state={invalid ? "invalid" : valid ? "valid" : undefined}
        className={cn(
          fieldClass,
          "gap-3 px-3.5",
          "data-[state=valid]:border-success data-[state=valid]:focus-within:ring-success/15",
          "data-[state=invalid]:border-destructive data-[state=invalid]:focus-within:ring-destructive/15",
        )}
      >
        {/* Only India is supported for now. */}
        <span className="flex shrink-0 items-center gap-2 text-[15px] font-semibold text-foreground">
          <IndiaFlag className="h-3 w-4.5 rounded-[2px]" />
          +91
        </span>
        <span aria-hidden="true" className="h-6 w-px bg-border" />
        <input
          ref={ref}
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          autoFocus={autoFocus}
          placeholder="Mobile number"
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-error` : undefined}
          value={formatIndianMobile(value)}
          onChange={(event) => onChange(toMobileDigits(event.target.value))}
          onBlur={onBlur}
          className="h-full min-w-0 flex-1 bg-transparent tracking-wide outline-none placeholder:tracking-normal placeholder:text-muted-foreground"
        />
        {invalid ? (
          <CircleAlert className="size-5 shrink-0 text-destructive" aria-hidden="true" />
        ) : valid ? (
          <CircleCheck className="size-5 shrink-0 text-success" aria-hidden="true" />
        ) : null}
      </div>
      {invalid ? <FieldError id={`${id}-error`}>{PHONE_ERROR}</FieldError> : null}
    </div>
  );
});
