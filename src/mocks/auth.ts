/**
 * Mock auth API for the login / sign-up screens.
 * TODO: replace with the real endpoints once the backend exists:
 *   POST /auth/otp          { phone, channel }   → { resendAfter }
 *   POST /auth/otp/verify   { phone, code }      → { isNewUser, accountType } + httpOnly session cookie
 *   POST /onboarding        SignupDetails        → the new account
 * The real API rate-limits per number + IP, keeps a code valid for 5 min / 5 tries,
 * and answers the same way for new and existing numbers.
 */

/** Code accepted by the mock (shown on screen outside production). */
export const MOCK_OTP = "123456";

/**
 * Who is signing up.
 * - business: runs a shop/restaurant/brand. Also the type for brands and clients who hire creators.
 * - agency: manages marketing for several businesses (switches between them in the app header).
 * - creator: makes content and gets paid by businesses through briefs.
 */
export const accountTypes = [
  {
    value: "business",
    label: "Business",
    hint: "You run a shop, restaurant or brand. Pick this to hire creators too.",
  },
  {
    value: "agency",
    label: "Agency",
    hint: "You manage marketing for several businesses from one login.",
  },
  {
    value: "creator",
    label: "Creator",
    hint: "You make content and want paid work from local brands.",
  },
] as const;

export type AccountType = (typeof accountTypes)[number]["value"];

export const isAccountType = (value: string | null): value is AccountType =>
  accountTypes.some((type) => type.value === value);

/** Existing accounts in the mock. Every other valid number is a new sign-up. */
const knownAccounts = new Map<string, AccountType>([
  ["9876543210", "business"],
  ["9988776655", "creator"],
]);

export type OtpChannel = "sms" | "whatsapp";

export const businessTypes = [
  { value: "restaurant", label: "Restaurant" },
  { value: "salon", label: "Salon / Spa" },
  { value: "retail", label: "Retail shop" },
  { value: "clinic", label: "Clinic" },
  { value: "gym", label: "Gym / Fitness" },
  { value: "coaching", label: "Coaching" },
] as const;

export const agencyClientCounts = [
  { value: "1-5", label: "1–5" },
  { value: "6-20", label: "6–20" },
  { value: "20+", label: "20+" },
] as const;

export const creatorNiches = [
  { value: "food", label: "Food" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "fitness", label: "Fitness" },
  { value: "travel", label: "Travel" },
  { value: "tech", label: "Tech" },
  { value: "comedy", label: "Comedy" },
  { value: "education", label: "Education" },
] as const;

export const followerRanges = [
  { value: "under-10k", label: "Under 10k" },
  { value: "10k-50k", label: "10k – 50k" },
  { value: "50k-1l", label: "50k – 1 lakh" },
  { value: "1l-plus", label: "1 lakh +" },
] as const;

type ValueOf<T extends readonly { value: string }[]> = T[number]["value"];

export type BusinessType = ValueOf<typeof businessTypes>;

export interface BusinessDetails {
  accountType: "business";
  name: string;
  businessName: string;
  type: BusinessType;
  city: string;
}

export interface AgencyDetails {
  accountType: "agency";
  name: string;
  agencyName: string;
  clients: ValueOf<typeof agencyClientCounts>;
  city: string;
}

export interface CreatorDetails {
  accountType: "creator";
  name: string;
  instagram: string;
  niches: ValueOf<typeof creatorNiches>[];
  followers: ValueOf<typeof followerRanges>;
  city: string;
}

export type SignupDetails = BusinessDetails | AgencyDetails | CreatorDetails;

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
  const accountType = knownAccounts.get(phone);
  return { isNewUser: !accountType, accountType };
}

export async function createAccount(details: SignupDetails) {
  await wait(900);
  return details;
}
