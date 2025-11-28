import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.addInitScript(() => { try { localStorage.clear(); } catch (_) {} });
    await page.goto('http://localhost:8081/home');
    console.log('Navigated to home page');
  });

  test('clicking "Ajudar ONG" button navigates to ong-list', async ({ page }) => {
    await expect(page.getByTestId('logo-header-svg')).toBeVisible();

    await page.getByText('Ajudar ONG').click();

    await page.waitForURL('**/ong-list', { timeout: 5000 });
  });

  test.describe('Like button', () => {
    test('click Like opens login alert', async ({ page }) => {
      page.on('dialog', dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain('Faça login');
        dialog.accept();
      });

      await page.getByTestId('liked-post-icon').first().click();

      await page.waitForURL('**/login**', { timeout: 5000 });
    });

  });
});
