import { expect, test } from '@playwright/test';

export const startHome = async ({ page, context }) => {
  await context.clearCookies();
  await context.addInitScript(() => { try { localStorage.clear(); } catch (_) {} });
  await page.goto('http://localhost:8081/home');
};

export const doLogin = async ({ page, context }) => {
  await context.clearCookies();
  await context.addInitScript(() => { try { localStorage.clear(); } catch (_) {} });
  await page.goto('http://localhost:8081/login');

  await page.waitForTimeout(3000);

  const emailInput = page.getByPlaceholder('Email');
  await expect(emailInput).toBeVisible();
  await emailInput.fill('a@gmail.com');
  await page.locator('div').filter({ hasText: /^Continuar$/ }).first().click();

  const passwordInput = page.getByPlaceholder('Senha');
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill('123456');
  await page.locator('div').filter({ hasText: /^Entrar$/ }).first().click();

  await page.waitForURL('**/home**', { timeout: 5000 });
};

async function ensureVisibleLikeBtn(page, maxAttempts = 20) {
  const likeSelector = '[data-testid="liked-post-icon"]';
  for (let i = 0; i < maxAttempts; i++) {
    const loc = page.getByTestId('liked-post-icon').first();
    try {
      await loc.waitFor({ state: 'visible', timeout: 700 });
      await loc.scrollIntoViewIfNeeded();
      await expect(loc).toBeVisible();
      return loc;
    } catch (e) {
      await page.waitForTimeout(200);
    }
  }
  const count = await page.locator(likeSelector).count();
  throw new Error(`Não foi possível tornar visível nenhum liked-post-icon após ${maxAttempts} tentativas. Elementos no DOM: ${count}`);
}

test.describe('Home page', () => {
  test('clicking "Ajudar ONG" button navigates to ong-list', async ({ page, context }) => {
    startHome({ page, context });
    await expect(page.getByTestId('logo-header-svg')).toBeVisible();

    await page.getByText('Ajudar ONG').click();

    await page.waitForURL('**/ong-list', { timeout: 5000 });
  });

  test.describe('Like button', () => {
    test('click Like opens login alert', async ({ page, context }) => {
      startHome({ page, context });
      page.on('dialog', dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain('Faça login');
        dialog.accept();
      });

      await page.getByTestId('liked-post-icon').first().click();

      await page.waitForURL('**/login**', { timeout: 5000 });
    });

    test('clicking Like changes heart icon to liked state', async ({ page, context }) => {
      await doLogin({ page, context });

      await page.waitForTimeout(1000);

      const likeBtn = await ensureVisibleLikeBtn(page);

      const beforeColor = await likeBtn.evaluate(el => {
        const child = el.querySelector(':scope > div') || el.firstElementChild;
        if (!child) return null;
        return getComputedStyle(child).color || child.getAttribute('style') || null;
      });
      
      await likeBtn.click();

      await page.waitForFunction(
        (selector, prev) => {
          const el = document.querySelector(selector);
          const child = el && (el.querySelector(':scope > div') || el.firstElementChild);
          if (!child) return false;
          const cur = getComputedStyle(child).color || child.getAttribute('style') || null;
          return cur !== prev;
        },
        '[data-testid="liked-post-icon"]',
        beforeColor,
      );

      const likeBtnAfter = await ensureVisibleLikeBtn(page);
      const afterColor = await likeBtnAfter.evaluate(el => {
        const child = el.querySelector(':scope > div') || el.firstElementChild;
        console.log({child});
        return child ? (getComputedStyle(child).color || child.getAttribute('style')) : null;
      });

      expect(afterColor).not.toBe(beforeColor);
    });

    test('double-clicking image opens login alert if it is not logged in', async ({ page, context }) => {
      await startHome({ page, context });
      page.on('dialog', dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain('Faça login');
        dialog.accept();
      });
      
      await page.waitForTimeout(1000);

      const postImage = page.getByTestId('post-image').first();
      await expect(postImage).toBeVisible();

      await postImage.dblclick();
 
      await page.waitForURL('**/login**', { timeout: 5000 });
    });

    test('double-clicking image likes the post (color red)', async ({ page, context }) => {
      await doLogin({ page, context });

      await page.waitForTimeout(1000);

      const postImage = page.getByTestId('post-image').first();
      await expect(postImage).toBeVisible();

      await postImage.dblclick();

      const likeBtnAfter = await ensureVisibleLikeBtn(page);
      const afterColor = await likeBtnAfter.evaluate(el => {
        const child = el.querySelector(':scope > div') || el.firstElementChild;
        return child ? getComputedStyle(child).color : null;
      });
      
      const redRegex = /^(?:red|rgb\(\s*255\s*,\s*0\s*,\s*0\s*\))$/i;
      expect(afterColor).toMatch(redRegex);
    });
  });

  test.describe('Comment button', () => {
    test('click Comment opens bottom sheet and ask to login', async ({ page, context }) => {
      await startHome({ page, context });
      const loc = page.getByTestId('comment-post-icon').first();
      await expect(loc).toBeVisible();

      await loc.click();

      const doLoginText = page.getByText('Clique aqui para fazer login e comentar');
      await expect(doLoginText).toBeVisible();
    });

    test('click Comment opens bottom sheet and ask to comment', async ({ page, context }) => {
      await doLogin({ page, context });
      const loc = page.getByTestId('comment-post-icon').first();
      await expect(loc).toBeVisible();

      await loc.click();

      const doLoginText = page.getByPlaceholder('Adicione um comentário');
      await expect(doLoginText).toBeVisible();
    });

    test('adding a comment shows it in the comments list', async ({ page, context }) => {
      await doLogin({ page, context });
      const loc = page.getByTestId('comment-post-icon').first();
      await expect(loc).toBeVisible();

      await loc.click();

      const commentInput = page.getByPlaceholder('Adicione um comentário');
      await expect(commentInput).toBeVisible();

      const testComment = 'Este é um comentário de teste';
      await commentInput.fill(testComment);
      await page.keyboard.press('Enter');

      const addedComment = page.getByText(testComment);
      await expect(addedComment).toBeVisible();
    });

    test('adding a comment shows it was added recently', async ({ page, context }) => {
      await doLogin({ page, context });
      const loc = page.getByTestId('comment-post-icon').first();
      await expect(loc).toBeVisible();

      await loc.click();

      const commentInput = page.getByPlaceholder('Adicione um comentário');
      await expect(commentInput).toBeVisible();

      const testComment = 'Este é um comentário de teste';
      await commentInput.fill(testComment);
      await page.keyboard.press('Enter');

      const addedComment = page.getByText('Publicado agora');
      await expect(addedComment).toBeVisible();
    });
  });
});
