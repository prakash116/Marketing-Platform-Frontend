/** Indian mobile numbers: 10 digits, starting with 6–9. */
const INDIAN_MOBILE = /^[6-9]\d{9}$/;

/** Keep digits only and cap at 10 (drops spaces, dashes and a pasted +91 / 0 prefix). */
export function toMobileDigits(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length > 10 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

export function isValidIndianMobile(digits: string): boolean {
  return INDIAN_MOBILE.test(digits);
}

/** "9876543210" → "98765 43210" (partial input is formatted as it grows). */
export function formatIndianMobile(digits: string): string {
  return digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
}
