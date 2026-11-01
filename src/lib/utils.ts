import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conditional logic; later classes win on conflict. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const inrWhole = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrWithPaise = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Format a rupee amount with Indian digit grouping (lakh / crore).
 * `formatINR(1234567)` → "₹12,34,567". Pass `{ paise: true }` to keep two decimals.
 */
export function formatINR(amount: number, options?: { paise?: boolean }): string {
  return (options?.paise ? inrWithPaise : inrWhole).format(amount);
}
