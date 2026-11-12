import type { HeroTone } from "@/types/site";

/** Soft background + matching foreground for icon tiles, per tone from the API. */
export const toneClass: Record<HeroTone, string> = {
  primary: "bg-primary-soft text-primary-soft-foreground",
  success: "bg-success-soft text-success",
  accent: "bg-accent-soft text-accent-soft-foreground",
  info: "bg-info-soft text-info-soft-foreground",
};
