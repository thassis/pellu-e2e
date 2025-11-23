// ----- Test 0 -----
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
  // Clear cookies to ensure we always see the onboarding
  await context.clearCookies();
  await page.goto('http://localhost:8081');
});

test('should navigate to /home when clicking the Pular button', async ({ page }) => {
  // Assuming 'Pular' is the visible text of the button/link.
  // We prioritize data-testid if available, but since we don't know the HTML,
  // we use a text selector for robustness.
  const pularButton = page.getByText('Pular');

  await pularButton.click();

  // Assert that the page navigated to the /home path
  await expect(page).toHaveURL('http://localhost:8081/home');
});

// ----- Test 1 -----
test('clicking arrow button should advance to next slide', async ({ page }) => {
  const nextButton = page.getByTestId('next-button');
  const slide1 = page.getByTestId('slide-1');
  const slide2 = page.getByTestId('slide-2');

  // 1. Assert initial state (Slide 1 is visible, Slide 2 is hidden/not active)
  await expect(slide1).toBeVisible();
  await expect(slide2).not.toBeVisible();

  // 2. Click the arrow button
  await nextButton.click();

  // 3. Assert new state (Slide 2 is visible, Slide 1 is hidden/not active)
  await expect(slide2).toBeVisible();
  await expect(slide1).not.toBeVisible();
});

// ----- Test 2 -----
test('clicking arrow button on last slide navigates to /home', async ({ page }) => {
  // Assuming there are multiple slides and we need to click the next button to reach the last one.
  // We assume the navigation button has data-testid="next-slide-button".

  // Navigate through initial slides (assuming 3 slides total, needing 2 clicks to reach the last slide)
  // If the slides were dynamic, we would need a loop and a way to detect the last slide (e.g., a 'Done' button or specific URL/content change).

  // Click 1 (Move to Slide 2)
  await page.click('[data-testid="next-slide-button"]');

  // Click 2 (Move to Slide 3 - The last slide)
  await page.click('[data-testid="next-slide-button"]');

  // Click 3 (Clicking arrow button on last slide to navigate to /home)
  await page.click('[data-testid="next-slide-button"]');

  // Wait for navigation and assert the URL
  await page.waitForURL('http://localhost:8081/home');
  expect(page.url()).toBe('http://localhost:8081/home');
});

// Nenhum teste funcionou.

//Motivo do primeiro: nao esperou a pagina carregar antes de clicar no botao "Pular".
//Motivo do segundo e terceiro: está usando os testids errados.

