import { expect, test, type Page } from "@playwright/test";
import { gotoHydrated } from "./utils";

const featureTitles = [
  "WhatsApp",
  "Social posts",
  "Ads (Meta + Google)",
  "Creators",
  "SEO + Google Profile",
  "Reports",
];

function featureLink(page: Page, title: string) {
  // Accessible name is "<title> <description>".
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: new RegExp(`^${escaped} `) });
}

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test.describe("site header · desktop 1440", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");
  test.use({ viewport: { width: 1440, height: 900 } });

  test("renders the header with nav links in the server HTML", async ({ page, request }) => {
    const html = await (await request.get("/")).text();
    // Mega-menu links are part of the HTML (crawlable), not fetched on open.
    expect(html).toContain('href="/features/whatsapp"');
    expect(html).toContain('href="/industries/salons"');

    const errors = collectErrors(page);
    await gotoHydrated(page, "/");
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();
    await expect(header.getByRole("link", { name: "Start free" })).toBeVisible();
    await expect(header.getByRole("link", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "All your marketing in one app",
    );
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("hovering Features shows the 6 items and Esc closes it", async ({ page }) => {
    await gotoHydrated(page, "/");
    const trigger = page.getByRole("button", { name: "Features" });
    await expect(featureLink(page, "WhatsApp")).toBeHidden();

    await trigger.hover();
    for (const title of featureTitles) {
      await expect(featureLink(page, title)).toBeVisible();
    }
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(featureLink(page, "WhatsApp")).toBeHidden();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("keyboard Tab + Enter opens Features", async ({ page }) => {
    await gotoHydrated(page, "/");
    await page.mouse.move(700, 800);
    const trigger = page.getByRole("button", { name: "Features" });

    for (let i = 0; i < 5; i += 1) {
      await page.keyboard.press("Tab");
      if (await trigger.evaluate((node) => node === document.activeElement)) break;
    }
    await expect(trigger).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(featureLink(page, "Reports")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(featureLink(page, "Reports")).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("Industries and Resources open the same mega panel", async ({ page }) => {
    await gotoHydrated(page, "/");
    const nav = page.getByRole("navigation", { name: "Main" });

    await page.getByRole("button", { name: "Industries" }).click();
    await expect(featureLink(page, "Salons")).toBeVisible();
    await expect(nav.getByRole("link", { name: /^Read the story/ })).toBeVisible();
    await expect(featureLink(page, "WhatsApp")).toBeHidden();

    await page.getByRole("button", { name: "Resources" }).click();
    await expect(featureLink(page, "Templates")).toBeVisible();
    await expect(nav.getByRole("link", { name: /^Visit the blog/ })).toBeVisible();
    // About is a top-level link at 1440, so it stays out of Resources.
    await expect(featureLink(page, "About")).toBeHidden();
    await expect(featureLink(page, "Salons")).toBeHidden();
  });

  test("header is transparent on the home page until scrolled", async ({ page }) => {
    // The home page is still short; a lower viewport guarantees it can scroll.
    await page.setViewportSize({ width: 1440, height: 600 });
    await gotoHydrated(page, "/");
    const header = page.getByRole("banner");
    await expect(header).toHaveAttribute("data-transparent", "true");

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(header).toHaveAttribute("data-scrolled", "true");
    await expect(header).not.toHaveAttribute("data-transparent", "true");
  });

  test("theme toggle in the header switches to dark mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await gotoHydrated(page, "/");
    const header = page.getByRole("banner");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/\bdark\b/);

    // A second copy lives in the (hidden) Resources panel; role queries skip hidden nodes.
    await header.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(html).toHaveClass(/\bdark\b/);
    await expect(header.getByRole("button", { name: "Switch to light mode" })).toBeVisible();
  });
});

test.describe("site header · mobile 390", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");
  test.use({ viewport: { width: 390, height: 844 } });

  test("menu sheet traps focus, expands Features and closes on Esc", async ({ page }) => {
    await gotoHydrated(page, "/");
    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: "Start free" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Features" })).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    const sheet = page.getByRole("dialog", { name: "Menu" });
    await expect(sheet).toBeVisible();
    expect(await sheet.evaluate((node) => node.contains(document.activeElement))).toBe(true);

    // Body scroll is locked while the sheet is open.
    await expect(page.locator("body")).toHaveAttribute("data-scroll-locked", /\d/);

    const features = sheet.getByRole("button", { name: "Features" });
    await expect(features).toHaveAttribute("aria-expanded", "false");
    await features.click();
    await expect(features).toHaveAttribute("aria-expanded", "true");
    await expect(sheet.getByRole("link", { name: "WhatsApp", exact: true })).toBeVisible();
    await expect(sheet.getByRole("link", { name: "Chat on WhatsApp" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
  });
});
