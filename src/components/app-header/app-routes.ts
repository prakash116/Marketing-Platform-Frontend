import type { Route } from "next";

// These app pages are not built yet, so typedRoutes cannot know them.
// Remove the cast once each page exists.
export const route = (path: string) => path as Route;

export const appRoutes = {
  dashboard: "/dashboard",
  wallet: route("/wallet"),
  help: route("/help"),
  profile: route("/settings/profile"),
  team: route("/settings/team"),
  billing: route("/billing"),
  settings: route("/settings"),
  addBusiness: route("/onboarding/business"),
  newPost: route("/posts/new"),
  newCampaign: route("/campaigns/new"),
  newBroadcast: route("/broadcasts/new"),
  newBrief: route("/briefs/new"),
} satisfies Record<string, Route>;

// TODO: replace with the real support number (wa.me/<countrycode><number>).
export const whatsappSupportUrl = "https://wa.me/";
