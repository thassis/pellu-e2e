import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('http://localhost:8081/home');
  });

  test('clicking "Ajudar ONG" button navigates to ong-list', async ({ page }) => {
    await expect(page.getByTestId('logo-header-svg')).toBeVisible();

    await page.getByText('Ajudar ONG').click();

    await page.waitForURL('**/ong-list', { timeout: 5000 });
  });
});
