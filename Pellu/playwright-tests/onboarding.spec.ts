import { expect, test } from '@playwright/test';

test.describe('Onboarding Screen', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('http://localhost:8081');
  });

  test('clicking "Pular" button navigates to home', async ({ page }) => {
    await expect(page.getByText('Bem-vindo ao Pellu')).toBeVisible();

    await page.getByText('Pular').click();

    await page.waitForURL('**/home', { timeout: 5000 });
  });

  test('clicking arrow button advances to next slide', async ({ page }) => {
    await expect(page.getByText('Bem-vindo ao Pellu')).toBeVisible();

    const indicators = page.locator('[style*="backgroundColor"]').filter({ has: page.locator('text=""') });

    const arrowButton = page.locator('[data-testid="arrow-forward-circle"], [name="arrow-forward-circle"]').first();
    // Slide 1 -> 2
    await arrowButton.click();
    await expect(page.getByText('Encontre seu melhor amigo!')).toBeVisible({ timeout: 2000 });

    // Slide 2 -> 3
    await arrowButton.click();
    await expect(page.getByText('Totalmente Grátis!')).toBeVisible({ timeout: 2000 });
  });

  test('clicking arrow button on last slide navigates to home', async ({ page }) => {
    await expect(page.getByText('Bem-vindo ao Pellu')).toBeVisible();

    const arrowButton = page.locator('[data-testid="arrow-forward-circle"], [name="arrow-forward-circle"]').first();

    // Slide 1 -> 2
    await arrowButton.click();

    // Slide 2 -> 3
    await arrowButton.click();

    // Slide 3 -> Home (last slide, should navigate to home)
    await arrowButton.click();

    await page.waitForURL('**/home', { timeout: 5000 });
  });
});
