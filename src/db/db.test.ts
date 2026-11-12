import { describe, expect, it } from "vitest";
import { getIcon } from "@/components/icons/icon-registry";
import { heroSlidesRecord } from "./hero-slides";
import { siteHeaderRecord } from "./site-header";
import { trustRecord } from "./trust";

/*
 * Guards for the mock records. When the real API replaces them, keep these
 * checks as a contract test against an API fixture.
 */

describe("site header record", () => {
  const { nav, about } = siteHeaderRecord;
  const allItems = nav.flatMap((item) => (item.kind === "menu" ? [item, ...item.items] : [item]));

  it("gives every item a title and every link an absolute path", () => {
    for (const item of allItems) {
      expect(item.title.trim()).not.toBe("");
      if ("href" in item) expect(item.href).toMatch(/^\//);
    }
  });

  it("has 6 features, each with an icon and a description", () => {
    const features = nav.find((item) => item.kind === "menu" && item.id === "features");
    expect(features?.kind === "menu" && features.items).toHaveLength(6);
    if (features?.kind !== "menu") return;
    for (const item of features.items) {
      expect(getIcon(item.icon)).toBeDefined();
      expect(item.description).toBeTruthy();
    }
  });

  it("has no duplicate hrefs", () => {
    const hrefs = allItems.flatMap((item) => ("href" in item ? [item.href] : []));
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("only uses icon names the frontend knows", () => {
    for (const item of nav) {
      if (item.kind !== "menu") continue;
      expect(getIcon(item.promo.icon), item.promo.icon).toBeDefined();
      for (const link of item.items) expect(getIcon(link.icon), link.icon).toBeDefined();
    }
    expect(getIcon(about.icon)).toBeDefined();
  });

  it("lists About as a top-level link and has exactly one menu that holds it", () => {
    expect(nav.some((item) => item.kind === "link" && item.href === about.href)).toBe(true);
    expect(nav.filter((item) => item.kind === "menu" && item.holdsAbout)).toHaveLength(1);
  });
});

describe("hero slides record", () => {
  it("has unique ids and one slide per audience", () => {
    const ids = heroSlidesRecord.map((slide) => slide.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(["business", "creators", "agencies", "services"]);
  });

  it("gives every slide copy, a primary CTA and a valid preview", () => {
    for (const slide of heroSlidesRecord) {
      expect(slide.title.trim()).not.toBe("");
      expect(slide.points.length).toBeGreaterThan(0);
      expect(slide.primaryCta.href).toMatch(/^\//);
      for (const bar of slide.visual.bars) expect(bar).toBeGreaterThanOrEqual(0);
      for (const card of slide.visual.cards) expect(getIcon(card.icon), card.icon).toBeDefined();
    }
  });
});

describe("trust record", () => {
  it("has unique customers with a type and a city", () => {
    const names = trustRecord.customers.map((customer) => customer.name);
    expect(new Set(names).size).toBe(names.length);
    for (const customer of trustRecord.customers) {
      expect(customer.type.trim()).not.toBe("");
      expect(customer.city.trim()).not.toBe("");
    }
  });

  it("has 4 stats so the grid fills 2 or 4 columns evenly", () => {
    expect(trustRecord.stats).toHaveLength(4);
  });
});
