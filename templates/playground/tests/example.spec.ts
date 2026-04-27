import { test, expect } from "@playwright/test";

test("example test for __PROJECT_NAME__", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/__PROJECT_NAME__/);
});
