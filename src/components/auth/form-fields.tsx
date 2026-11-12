"use client";

import { Check, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { FieldError as RhfFieldError, UseFormRegisterReturn } from "react-hook-form";
import { FieldError, FieldLabel, Input, fieldClass } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BaseFieldProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: RhfFieldError;
  placeholder?: string;
  autoComplete?: string;
}

export function TextField({
  id,
  label,
  registration,
  error,
  placeholder,
  autoComplete,
}: BaseFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        {...registration}
      />
      {error ? <FieldError>{error.message}</FieldError> : null}
    </div>
  );
}

/** Text field with a leading icon or symbol, e.g. a map pin for City or "@" for a handle. */
export function PrefixField({
  id,
  label,
  registration,
  error,
  placeholder,
  autoComplete,
  prefix,
}: BaseFieldProps & { prefix: ReactNode }) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className={cn(fieldClass, "gap-2.5 px-3.5", error && "border-destructive")}>
        <span className="flex shrink-0 text-muted-foreground" aria-hidden="true">
          {prefix}
        </span>
        <input
          id={id}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          {...registration}
        />
      </div>
      {error ? <FieldError>{error.message}</FieldError> : null}
    </div>
  );
}

export interface ChipOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

/**
 * Tap-to-pick chips instead of a dropdown: every option visible, one tap.
 * `multiple` turns them into checkboxes; the picked chip gets a check badge.
 */
export function ChipGroup({
  legend,
  options,
  registration,
  error,
  multiple = false,
  columns = 2,
}: {
  legend: string;
  options: readonly ChipOption[];
  registration: UseFormRegisterReturn;
  error?: { message?: string };
  multiple?: boolean;
  columns?: 2 | 3 | 4;
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-[13px] leading-5 font-semibold text-foreground">
        {legend}
      </legend>
      <div
        className={cn(
          "grid gap-2.5",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-2 sm:grid-cols-4",
        )}
      >
        {options.map(({ value, label, icon: Icon }) => (
          <label
            key={value}
            className={cn(
              "relative flex h-11 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-card px-3 text-[14px] font-medium text-text-secondary",
              !Icon && "justify-center",
              "transition-[border-color,background-color,color] duration-150 hover:border-border-strong hover:bg-muted",
              "has-checked:border-primary has-checked:bg-primary-soft has-checked:font-semibold has-checked:text-primary-soft-foreground",
              "has-focus-visible:ring-3 has-focus-visible:ring-primary/20",
            )}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              value={value}
              className="peer sr-only"
              {...registration}
            />
            {Icon ? <Icon className="size-4 shrink-0" aria-hidden="true" /> : null}
            <span className="truncate">{label}</span>
            <span
              aria-hidden="true"
              className="absolute -top-1.5 -right-1.5 hidden size-5 animate-pop-in items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-card peer-checked:flex"
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
          </label>
        ))}
      </div>
      {error?.message ? <FieldError>{error.message}</FieldError> : null}
    </fieldset>
  );
}
