import { expect, test } from "@playwright/test";
import { gotoHydrated } from "./utils";

test.describe("app header · desktop 1440", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");
  test.use({ viewport: { width: 1440, height: 900 } });

  test("renders without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await gotoHydrated(page, "/dashboard");
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: "Dashboard" })).toBeVisible();
    await expect(header.getByRole("button", { name: /Sharma Sweets/ })).toBeVisible();
    await expect(header.getByRole("link", { name: /WhatsApp credits: ₹1,240/ })).toBeVisible();
    await expect(header.getByRole("button", { name: "3 unread notifications" })).toBeVisible();
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("⌘K / Ctrl K opens the search palette with arrow-key navigation", async ({ page }) => {
    await gotoHydrated(page, "/dashboard");
    await expect(page.getByRole("button", { name: /Sharma Sweets/ })).toBeVisible();

    await page.keyboard.press("ControlOrMeta+k");
    const dialog = page.getByRole("dialog", { name: "Search" });
    await expect(dialog).toBeVisible();
    const input = dialog.getByRole("combobox");
    await expect(input).toBeFocused();

    await input.fill("diwali");
    const options = dialog.getByRole("option");
    await expect(options).toHaveCount(3);
    await expect(options.first()).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("ArrowDown");
    await expect(options.nth(1)).toHaveAttribute("aria-selected", "true");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("Create menu shows 4 items", async ({ page }) => {
    await gotoHydrated(page, "/dashboard");
    await page.getByRole("button", { name: "Create", exact: true }).click();
    const items = page.getByRole("menuitem");
    await expect(items).toHaveCount(4);
    await expect(items).toHaveText(["Post", "Campaign", "Broadcast", "Creator brief"]);
  });

  test("user menu shows Log out", async ({ page }) => {
    await gotoHydrated(page, "/dashboard");
    await page.getByRole("button", { name: "Account menu for Amit Kumar" }).click();
    await expect(page.getByRole("menuitem", { name: "Log out" })).toBeVisible();
    await expect(page.getByRole("menu")).toContainText("amit@sharmasweets.in");
  });

  test("dark mode toggles the class and the header background", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await gotoHydrated(page, "/dashboard");
    const html = page.locator("html");
    const header = page.getByRole("banner");
    await expect(html).not.toHaveClass(/\bdark\b/);
    const lightBg = await header.evaluate((node) => getComputedStyle(node).backgroundColor);

    await page.getByTestId("theme-toggle").click();
    await expect(html).toHaveClass(/\bdark\b/);
    await expect
      .poll(() => header.evaluate((node) => getComputedStyle(node).backgroundColor))
      .not.toBe(lightBg);
  });
});

test.describe("app header · mobile 390", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");
  test.use({ viewport: { width: 390, height: 844 } });

  test("search takes over the header row; floating + is visible", async ({ page }) => {
    await gotoHydrated(page, "/dashboard");
    await expect(page.getByRole("button", { name: "Create" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Sharma Sweets/ })).toBeHidden();

    await page.getByRole("button", { name: "Search", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Search" });
    await expect(dialog.getByRole("button", { name: "Close search" })).toBeVisible();
    await expect(dialog.getByRole("combobox")).toBeVisible();

    await dialog.getByRole("combobox").fill("diwali");
    await expect(dialog.getByRole("option")).toHaveCount(3);
    await dialog.getByRole("button", { name: "Close search" }).click();
    await expect(dialog).toBeHidden();
  });

  test("menu opens the drawer with the business switcher", async ({ page }) => {
    await gotoHydrated(page, "/dashboard");
    await page.getByRole("button", { name: "Open menu" }).click();
    const drawer = page.getByRole("dialog", { name: "App menu" });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("button", { name: /Sharma Sweets/ })).toBeVisible();
    await expect(drawer.getByTestId("theme-toggle")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
  });
});
