import { expect, test, type Page } from "@playwright/test";
import { gotoHydrated } from "./utils";

// Mock rules (src/mocks/auth.ts): 98765 43210 is an existing account, any other
// valid number is new, and the code is always 123456.
const EXISTING = "9876543210";
const NEW_NUMBER = "9123456789";
const CODE = "123456";

async function requestCode(page: Page, phone: string, button: string) {
  await page.getByLabel("Mobile number").fill(phone);
  await page.getByRole("button", { name: button, exact: true }).click();
  await expect(page.getByRole("heading", { name: "Enter the 6-digit code" })).toBeVisible();
}

test.describe("login", () => {
  test("Get OTP stays disabled until the number is valid", async ({ page }) => {
    await gotoHydrated(page, "/login");
    const input = page.getByLabel("Mobile number");
    const getOtp = page.getByRole("button", { name: "Get OTP" });

    await expect(getOtp).toBeDisabled();
    await input.fill("98765");
    await input.blur();
    await expect(page.getByText("Enter a valid 10-digit number")).toBeVisible();
    await expect(getOtp).toBeDisabled();

    await input.fill("98765 43210");
    await expect(input).toHaveValue("98765 43210");
    await expect(getOtp).toBeEnabled();
  });

  test("existing number: wrong code shows an error, right code goes to the dashboard", async ({
    page,
  }) => {
    await gotoHydrated(page, "/login");
    await requestCode(page, EXISTING, "Get OTP");
    await expect(page.getByText("+91 98765 43210")).toBeVisible();

    await page.getByLabel("Digit 1").fill("482913");
    await expect(page.getByText("That code is not right")).toBeVisible();
    await expect(page.getByLabel("Digit 1")).toHaveAttribute("data-status", "error");

    // Auto-submits at 6 digits.
    await page.getByLabel("Digit 1").fill(CODE);
    await expect(page.getByRole("heading", { name: "You're in!" })).toBeVisible();
    await page.waitForURL("**/dashboard");
  });

  test("Change number goes back with the number kept", async ({ page }) => {
    await gotoHydrated(page, "/login");
    await requestCode(page, EXISTING, "Get OTP");
    await page.getByRole("button", { name: "Change number" }).click();
    await expect(page.getByLabel("Mobile number")).toHaveValue("98765 43210");
  });
});

test.describe("sign-up", () => {
  test("new number: code → business details → account ready", async ({ page }) => {
    await gotoHydrated(page, "/signup");
    await expect(page.getByText("Step 1 of 3")).toBeVisible();
    await requestCode(page, NEW_NUMBER, "Continue");

    await page.getByLabel("Digit 1").fill(CODE);
    await expect(page.getByRole("heading", { name: "Tell us about your business" })).toBeVisible();

    // Validation runs before anything is sent.
    await page.getByRole("button", { name: "Create my account" }).click();
    await expect(page.getByText("Pick the kind of business")).toBeVisible();

    await page.getByLabel("Your name").fill("Amit Kumar");
    await page.getByLabel("Business name").fill("Sharma Sweets");
    await page.getByRole("radio", { name: "Restaurant" }).check({ force: true });
    await page.getByLabel("City").fill("Delhi");
    await page.getByRole("button", { name: "Create my account" }).click();

    await expect(page.getByRole("heading", { name: "Your account is ready!" })).toBeVisible();
    await expect(
      page.getByText("Sharma Sweets is set up with restaurant templates."),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Start setup" })).toBeVisible();
  });

  test("account type picker switches to the creator form", async ({ page }) => {
    await gotoHydrated(page, "/signup");
    await requestCode(page, NEW_NUMBER, "Continue");
    await page.getByLabel("Digit 1").fill(CODE);

    // Business is the default type.
    await expect(page.getByRole("radio", { name: "Business" })).toBeChecked();
    await page.getByRole("radio", { name: "Creator" }).check({ force: true });
    await expect(page.getByRole("heading", { name: "Tell us about you" })).toBeVisible();

    await page.getByLabel("Your name").fill("Priya Sharma");
    await page.getByLabel("Instagram handle").fill("@priyaeats");
    await page.getByRole("checkbox", { name: "Food" }).check({ force: true });
    await page.getByRole("checkbox", { name: "Travel" }).check({ force: true });
    await page.getByRole("radio", { name: "10k – 50k" }).check({ force: true });
    await page.getByLabel("City").fill("Jaipur");
    await page.getByRole("button", { name: "Create my account" }).click();

    await expect(page.getByText("Brands in Jaipur can now find @priyaeats.")).toBeVisible();
    await expect(page.getByText("Next: finish your creator profile")).toBeVisible();
  });

  test("?as=agency preselects the agency form", async ({ page }) => {
    await gotoHydrated(page, "/signup?as=agency");
    await requestCode(page, NEW_NUMBER, "Continue");
    await page.getByLabel("Digit 1").fill(CODE);

    await expect(page.getByRole("radio", { name: "Agency" })).toBeChecked();
    await expect(page.getByRole("heading", { name: "Tell us about your agency" })).toBeVisible();
    await expect(page.getByText("How many businesses do you manage?")).toBeVisible();
  });
});

test.describe("layout", () => {
  test("brand panel shows on desktop only", async ({ page, isMobile }) => {
    await gotoHydrated(page, "/login");
    const panel = page.getByText("Grow your business");
    if (isMobile) await expect(panel).toBeHidden();
    else await expect(panel).toBeVisible();
  });
});
