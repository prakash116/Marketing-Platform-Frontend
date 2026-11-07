/**
 * Mock auth API for the login / sign-up screens.
 * TODO: replace with the real endpoints once the backend exists:
 *   POST /auth/otp          { phone, channel }      → { resendAfter }
 *   POST /auth/otp/verify   { phone, code }         → { isNewUser } + httpOnly session cookie
 *   POST /onboarding/business { name, businessName, type, city }
 * The real API rate-limits per number + IP, keeps a code valid for 5 min / 5 tries,
 * and answers the same way for new and existing numbers.
 */

import { appHeaderMock } from "./app-header";

/** Code accepted by the mock (shown on screen outside production). */
export const MOCK_OTP = "123456";

/** Numbers that already have an account in the mock. Everything else is a new sign-up. */
const knownNumbers = new Set(["9876543210"]);

export type OtpChannel = "sms" | "whatsapp";

export const businessTypes = [
  { value: "restaurant", label: "Restaurant" },
  { value: "salon", label: "Salon / Spa" },
  { value: "retail", label: "Retail shop" },
  { value: "clinic", label: "Clinic" },
  { value: "gym", label: "Gym / Fitness" },
  { value: "coaching", label: "Coaching" },
] as const;

export type BusinessType = (typeof businessTypes)[number]["value"];

export interface BusinessDetails {
  name: string;
  businessName: string;
  type: BusinessType;
  city: string;
}

export class AuthError extends Error {}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendOtp(_phone: string, _channel: OtpChannel = "sms") {
  await wait(900);
  return { resendAfter: 30 };
}

export async function verifyOtp(phone: string, code: string) {
  await wait(600);
  if (code !== MOCK_OTP)
    throw new AuthError("That code is not right. Check the SMS and try again.");
  return { isNewUser: !knownNumbers.has(phone) };
}

export async function createBusiness(details: BusinessDetails) {
  await wait(900);
  return { businessName: details.businessName };
}

/** Name shown on the success screen for a returning user. */
export const returningBusinessName = appHeaderMock.business.name;
