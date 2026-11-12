import { describe, expect, it } from "vitest";
import { isActivePath } from "./nav-config";

describe("isActivePath", () => {
  it("matches the current page and its children", () => {
    expect(isActivePath("/pricing", "/pricing")).toBe(true);
    expect(isActivePath("/features/ads", "/features/ads")).toBe(true);
    expect(isActivePath("/blog/post", "/blog")).toBe(true);
    expect(isActivePath("/blogger", "/blog")).toBe(false);
    expect(isActivePath("/pricing", "/")).toBe(false);
  });

  it("ignores the query string of the link", () => {
    expect(isActivePath("/signup", "/signup?as=creator")).toBe(true);
  });
});
