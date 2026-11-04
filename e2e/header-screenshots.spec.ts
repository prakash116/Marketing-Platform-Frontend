import { expect, test, type Page } from "@playwright/test";
import { gotoHydrated } from "./utils";

/*
 * Reference screenshots of both headers for comparing against the design.
 * Opt-in so normal runs do not rewrite files: SCREENSHOTS=1 npm run test:e2e
 */

const dir = "e2e/__screenshots__";

const viewports = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true },
] as const;

async function setTheme(page: Page, theme: "light" | "dark") {
  await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
}

test.describe("header screenshots", () => {
  test.skip(!process.env.SCREENSHOTS, "set SCREENSHOTS=1 to capture");

  for (const viewport of viewports) {
    for (const theme of ["light", "dark"] as const) {
      test(`${viewport.name} ${theme}`, async ({ page, isMobile }) => {
        test.skip(isMobile !== viewport.mobile, "matching project only");
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await setTheme(page, theme);
        const shot = (name: string) =>
          page.screenshot({
            path: `${dir}/${name}-${viewport.name}-${theme}.png`,
            clip: { x: 0, y: 0, width: viewport.width, height: viewport.mobile ? 844 : 560 },
          });

        // C02 · website header
        await gotoHydrated(page, "/");
        await expect(page.getByRole("banner")).toBeVisible();
        await shot("site-header");

        if (viewport.mobile) {
          await page.getByRole("button", { name: "Open menu" }).click();
          const sheet = page.getByRole("dialog", { name: "Menu" });
          await sheet.getByRole("button", { name: "Features" }).click();
          await expect(sheet.getByRole("link", { name: "Reports" })).toBeVisible();
          await shot("site-menu");
          await page.keyboard.press("Escape");
        } else {
          await page.getByRole("button", { name: "Features" }).hover();
          await expect(
            page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: /^Reports / }),
          ).toBeVisible();
          await page.waitForTimeout(250);
          await shot("site-mega-menu");
        }

        // C01 · app header
        await gotoHydrated(page, "/dashboard");
        await expect(page.getByRole("banner").getByText(/AK/)).toBeVisible();
        await shot("app-header");

        if (viewport.mobile) {
          await page.getByRole("button", { name: "Search", exact: true }).click();
        } else {
          await page.keyboard.press("ControlOrMeta+k");
        }
        await page.getByRole("combobox").fill("diwali");
        await page.waitForTimeout(250);
        await shot("app-search");
      });
    }
  }
});
