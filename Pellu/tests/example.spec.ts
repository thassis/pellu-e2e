import { expect, test } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('http://localhost:8081');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:8081');

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('Step 1:')).toBeVisible();
});
