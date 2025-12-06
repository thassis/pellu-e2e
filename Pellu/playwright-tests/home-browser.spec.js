// ----- Test 0 -----
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
  // Clear cookies to ensure we always see the onboarding
  await context.clearCookies();
  await page.goto('http://localhost:8081');
});

test('should navigate to ong-list page', async ({ page }) => {
  // Start on the home page
  await page.goto('http://localhost:8081/home');

  // Confirm the header logo is visible
  await expect(page.getByText('Pellu')).toBeVisible();

  // Click on the text 'Ajudar ONG'
  await page.getByText('Ajudar ONG').click();

  // Verify the app navigates to the ong-list page
  await expect(page).toHaveURL('http://localhost:8081/ong-list');
});

// ----- Test 1 -----

test.describe('Unauthenticated user flow', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear cookies to ensure we always see the onboarding
    await context.clearCookies();
    await page.goto('http://localhost:8081');
  });

  test('should navigate to login page when like is clicked', async ({ page }) => {
    await page.goto('http://localhost:8081/home');
    
    // Wait for the home screen to be ready by checking for a known element
    await expect(page.locator('text=Início').first()).toBeVisible();

    // Click the first like icon. Assuming it has a data-testid of 'like-button'.
    const firstLikeButton = page.locator('[data-testid="like-button"]').first();
    await expect(firstLikeButton).toBeVisible();
    await firstLikeButton.click();

    // Assert that the bottom sheet with login text appears
    // Based on the observed behavior, an alert does not appear, but a bottom sheet does.
    const loginPrompt = page.locator('text=Clique aqui para fazer login e comentar');
    await expect(loginPrompt).toBeVisible();
    
    // Click on the login prompt
    await loginPrompt.click();

    // Assert that the page navigates to the login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('text=Para continuar, digite seu e-mail')).toBeVisible();
  });
});

// ----- Test 2 -----

test.beforeEach(async ({ page, context }) => {
  // Clear cookies to ensure we always see the onboarding
  await context.clearCookies();
  await page.goto('http://localhost:8081');
});

test('should log in, like a post, and verify the color change', async ({ page }) => {
  await page.goto('http://localhost:8081/login');

  // Login
  await page.getByPlaceholder('Seu email').fill('a@gmail.com');
  await page.getByText('Continuar').click();
  await page.getByPlaceholder('Sua senha').fill('123456');
  await page.getByText('Entrar').click();

  // Wait for home feed to load
  await page.waitForURL('http://localhost:8081/home');
  await expect(page.getByText('Reginaldo José')).toBeVisible();

  // Find the first like icon
  const likeButton = page.locator('svg').first();
  await expect(likeButton).toBeVisible();

  // Get the initial color of the heart
  const initialColor = await likeButton.evaluate(el => window.getComputedStyle(el).color);

  // Click the like button
  await likeButton.click();

  // Wait for the color to change
  await page.waitForTimeout(500);

  // Get the final color of the heart
  const finalColor = await likeButton.evaluate(el => window.getComputedStyle(el).color);

  // Assert that the color has changed
  expect(initialColor).not.toBe(finalColor);
});


// ----- Test 3 -----

test.beforeEach(async ({ page, context }) => {
  // Clear cookies to ensure we always see the onboarding
  await context.clearCookies();
  await page.goto('http://localhost:8081');
});

test('should display login alert on double-clicking post image', async ({ page }) => {
  await page.goto('http://localhost:8081/home');

  // Wait for the first post image to be visible
  const postImage = page.locator('div:has-text("Reginaldo José")').first();
  await expect(postImage).toBeVisible();

  // Double-click the post image
  await postImage.dblclick();

  // Check for the login alert
  const loginAlert = page.locator('text=Faça login');
  await expect(loginAlert).toBeVisible();

  // Wait for navigation to the login page
  await page.waitForURL('http://localhost:8081/login');
  await expect(page).toHaveURL('http://localhost:8081/login');
});

// ----- Test 4 -----

test.beforeEach(async ({ page, context }) => {
  // Clear cookies to ensure we always see the onboarding
  await context.clearCookies();
  await page.goto('http://localhost:8081');
});

test('should log in, like a post, and see the like icon turn red', async ({ page }) => {
  // Navigate to login page
  await page.goto('http://localhost:8081/login');

  // Fill in credentials and login
  await page.getByLabel('Email').fill('a@gmail.com');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel('Senha').fill('123456');
  await page.getByRole('button', { name: 'Entrar' }).click();

  // Wait for home page to load
  await page.waitForURL('http://localhost:8081/home');

  // Wait for the feed to be visible
  const feed = page.locator('[data-testid="feed"]');
  await expect(feed).toBeVisible();

  // Find the first post image
  const firstPostImage = page.locator('[data-testid="post-image"]').first();
  await expect(firstPostImage).toBeVisible();

  // Double-click the image to like the post
  await firstPostImage.dblclick();

  // Find the like icon and verify its color
  const likeIcon = page.locator('[data-testid="like-icon"]').first();
  await expect(likeIcon).toBeVisible();
  await expect(likeIcon).toHaveCSS('color', 'rgb(255, 0, 0)');
});


// ----- Test 5 -----

test.describe('Home page', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear cookies to ensure we always see the onboarding
    await context.clearCookies();
    await page.goto('http://localhost:8081/home');
    // Wait for the home screen to be fully ready by waiting for the first post card to be visible.
    await page.waitForSelector('[data-testid="post-card"]', { state: 'visible' });
  });

  test('should open bottom sheet on comment icon click for non-logged-in user', async ({ page }) => {
    // Click the first comment icon.
    const commentIcon = page.getByTestId('comment-icon').first();
    await expect(commentIcon).toBeVisible();
    await commentIcon.click();

    // Verify that the bottom sheet opens with the correct text.
    const bottomSheetText = page.getByText('Clique aqui para fazer login e comentar');
    await expect(bottomSheetText).toBeVisible();
  });
});


// ----- Test 6 -----

test.beforeEach(async ({ page, context }) => {
  // Clear cookies to ensure we always see the onboarding
  await context.clearCookies();
  await page.goto('http://localhost:8081');
});

test('should open comment bottom sheet', async ({ page }) => {
  await page.goto('http://localhost:8081/login');
  await page.getByPlaceholder('Seu e-mail').click();
  await page.getByPlaceholder('Seu e-mail').fill('a@gmail.com');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByPlaceholder('Sua senha').click();
  await page.getByPlaceholder('Sua senha').fill('123456');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.waitForURL('http://localhost:8081/home');
  await page.locator('[data-testid="comment-button"]').first().click();
  await expect(page.getByPlaceholder('Adicione um comentário...')).toBeVisible();
});

// ----- Test 7 -----

test.describe('Pellu App E2E Test', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear cookies to ensure we always see the onboarding
    await context.clearCookies();
    await page.goto('http://localhost:8081');
  });

  test('should log in, comment on a post, and see the comment', async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:8081/login');

    // Enter email
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('a@gmail.com');
    await page.getByText('Continuar').click();

    // Enter password
    await page.getByPlaceholder('Senha').click();
    await page.getByPlaceholder('Senha').fill('123456');
    await page.getByText('Entrar').click();

    // Go to home and wait for it to be ready
    await page.goto('http://localhost:8081/home');
    await expect(page.locator('text=Pellu')).toBeVisible();

    // Open comments for the first post
    await page.locator('svg').first().click();

    // Type and submit a comment
    await page.getByPlaceholder('Adicione um comentário').click();
    await page.getByPlaceholder('Adicione um comentário').fill('This is a test comment');
    await page.keyboard.press('Enter');

    // Confirm the comment appears in the list
    await expect(page.locator('text=This is a test comment')).toBeVisible();
  });
});

// ----- Test 8 -----
// I am unable to generate the Playwright test because the login functionality of the application at http://localhost:8081/login is not working. After entering the email address and clicking 'Continuar', the application gets stuck in a loading state and displays an error, preventing me from entering the password and logging in. Without being able to log in, I cannot proceed to the steps of adding and verifying a comment.

