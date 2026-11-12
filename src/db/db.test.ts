import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getIcon } from "@/components/icons/icon-registry";
import { audiencesRecord } from "./audiences";
import { featuresRecord } from "./features";
import { heroSlidesRecord } from "./hero-slides";
import { siteHeaderRecord } from "./site-header";
import { trustRecord } from "./trust";
import type { SiteImage } from "@/types/site";

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

describe("images", () => {
  const images: SiteImage[] = [
    ...heroSlidesRecord.flatMap((slide) => (slide.image ? [slide.image] : [])),
    ...(trustRecord.testimonial?.image ? [trustRecord.testimonial.image] : []),
  ];

  it("points every local image at a file in /public", () => {
    for (const image of images) {
      if (!image.src.startsWith("/")) continue;
      expect(existsSync(join(process.cwd(), "public", image.src)), image.src).toBe(true);
    }
  });

  it("gives every image alt text, a size and a credit with a licence", () => {
    for (const image of images) {
      expect(image.alt.trim(), image.src).not.toBe("");
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
      expect(image.credit?.license, image.src).toBeTruthy();
    }
  });
});

describe("audiences record", () => {
  it("has 4 unique paths with known icons and absolute CTA links", () => {
    const ids = audiencesRecord.paths.map((path) => path.id);
    expect(ids).toHaveLength(4);
    expect(new Set(ids).size).toBe(ids.length);
    for (const path of audiencesRecord.paths) {
      expect(getIcon(path.icon), path.icon).toBeDefined();
      expect(path.cta.href.startsWith("/")).toBe(true);
      expect(path.points.length).toBeGreaterThan(0);
    }
  });

  it("matches the hero slides one to one", () => {
    expect(audiencesRecord.paths.map((path) => path.id)).toEqual(
      heroSlidesRecord.map((slide) => slide.id),
    );
  });
});

describe("features record", () => {
  it("uses known icons and unique links", () => {
    const hrefs = featuresRecord.items.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const item of featuresRecord.items) {
      expect(getIcon(item.icon), item.icon).toBeDefined();
      expect(item.highlights.length).toBeGreaterThan(0);
    }
  });

  it("gives every wide card a preview", () => {
    for (const item of featuresRecord.items.filter((entry) => entry.size === "wide")) {
      expect(item.preview, item.id).toBeDefined();
    }
  });

  it("fills the grid with no gaps at 2 and 3 columns", () => {
    // Outro takes 1 cell at 3 columns and the full row (2) at 2 columns.
    const cells = featuresRecord.items.reduce(
      (sum, item) => sum + (item.size === "wide" ? 2 : 1),
      0,
    );
    expect((cells + 1) % 3).toBe(0);
    expect((cells + 2) % 2).toBe(0);
  });

  it("links to the same feature pages as the header menu", () => {
    const menu = siteHeaderRecord.nav.find(
      (item) => item.kind === "menu" && item.id === "features",
    );
    const menuHrefs = menu?.kind === "menu" ? menu.items.map((item) => item.href) : [];
    expect(featuresRecord.items.map((item) => item.href)).toEqual(menuHrefs);
  });
});
