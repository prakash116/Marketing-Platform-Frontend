import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Field box shared by inputs and composite fields (e.g. the phone input). */
export const fieldClass = cn(
  "flex h-12 w-full items-center rounded-lg border border-input bg-card text-[15px] text-foreground",
  "transition-[border-color,box-shadow] duration-150 ease-out-soft",
  "focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/15",
);

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        fieldClass,
        "px-3.5 outline-none placeholder:text-muted-foreground",
        "aria-invalid:border-destructive aria-invalid:focus:ring-destructive/15",
        className,
      )}
      {...props}
    />
  );
}

export function FieldLabel({ className, ...props }: ComponentPropsWithoutRef<"label">) {
  return (
    <label
      className={cn("mb-1.5 block text-[13px] leading-5 font-semibold text-foreground", className)}
      {...props}
    />
  );
}

export function FieldError({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      role="alert"
      className={cn(
        "mt-1.5 animate-fade-up text-[12px] leading-4 font-medium text-destructive-soft-foreground",
        className,
      )}
      {...props}
    />
  );
}
