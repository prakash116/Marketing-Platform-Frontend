import { describe, expect, it } from "vitest";
import { featureItems, isActivePath, mainNav } from "./nav-config";

describe("nav-config", () => {
  const allItems = mainNav.flatMap((item) =>
    item.kind === "menu" ? [item, ...item.items] : [item],
  );

  it("gives every item a title and every link an href", () => {
    for (const item of allItems) {
      expect(item.title.trim()).not.toBe("");
      if ("href" in item) expect(item.href).toMatch(/^\//);
    }
  });

  it("has 6 features, each with an icon and a description", () => {
    expect(featureItems).toHaveLength(6);
    for (const item of featureItems) {
      expect(item.icon).toBeDefined();
      expect(item.description).toBeTruthy();
    }
  });

  it("has no duplicate hrefs", () => {
    const hrefs = allItems.flatMap((item) => ("href" in item ? [item.href] : []));
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("matches the current page and its children", () => {
    expect(isActivePath("/pricing", "/pricing")).toBe(true);
    expect(isActivePath("/features/ads", "/features/ads")).toBe(true);
    expect(isActivePath("/blog/post", "/blog")).toBe(true);
    expect(isActivePath("/blogger", "/blog")).toBe(false);
    expect(isActivePath("/pricing", "/")).toBe(false);
  });
});
