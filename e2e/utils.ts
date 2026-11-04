import type { Page } from "@playwright/test";

/**
 * Navigate and wait until React has hydrated the header. Before that the server
 * HTML is visible but has no event handlers, so early hovers/clicks are lost.
 * React tags hydrated DOM nodes with `__reactFiber$<id>` keys.
 */
export async function gotoHydrated(page: Page, url: string) {
  const response = await page.goto(url);
  await page.waitForFunction(() => {
    const header = document.querySelector("header");
    return !!header && Object.keys(header).some((key) => key.startsWith("__reactFiber$"));
  });
  return response;
}
