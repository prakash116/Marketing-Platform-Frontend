import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("returns 200 with security headers", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    const headers = response?.headers() ?? {};
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-powered-by"]).toBeUndefined();
  });

  test("shows the heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Marketing Platform" })).toBeVisible();
  });

  test("has no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Marketing Platform" })).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("dark mode toggle adds the dark class", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).not.toHaveClass(/\bdark\b/);

    await page.getByTestId("theme-toggle").click();
    await expect(html).toHaveClass(/\bdark\b/);
  });
});
