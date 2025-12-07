import { test, expect } from '@playwright/test';

test.describe('Language Switcher', () => {
  test('English page has language switcher with 6 languages', async ({ page }) => {
    await page.goto('/');

    const langSwitcher = page.locator('.lang-switcher-inline');
    await expect(langSwitcher).toBeVisible();

    // All 6 language links exist
    await expect(langSwitcher.locator('a')).toHaveCount(6);
  });

  test('clicking ES navigates to Spanish page', async ({ page }) => {
    await page.goto('/');

    await page.click('.lang-switcher-inline a[href*="/es"]');
    await expect(page).toHaveURL(/\/lang\/es\//);

    // Spanish page loads with correct lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('es');
  });

  test('clicking PT navigates to Portuguese page', async ({ page }) => {
    await page.goto('/');

    await page.click('.lang-switcher-inline a[href*="/pt-br"]');
    await expect(page).toHaveURL(/\/lang\/pt-br\//);

    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('pt-BR');
  });

  test('clicking DE navigates to German page', async ({ page }) => {
    await page.goto('/');

    await page.click('.lang-switcher-inline a[href*="/de"]');
    await expect(page).toHaveURL(/\/lang\/de\//);

    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('de');
  });

  test('clicking FR navigates to French page', async ({ page }) => {
    await page.goto('/');

    await page.click('.lang-switcher-inline a[href*="/fr"]');
    await expect(page).toHaveURL(/\/lang\/fr\//);

    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('fr');
  });

  test('clicking ZH navigates to Chinese page', async ({ page }) => {
    await page.goto('/');

    await page.click('.lang-switcher-inline a[href*="/zh"]');
    await expect(page).toHaveURL(/\/lang\/zh\//);

    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('zh');
  });

  test('language switcher works on subpages', async ({ page }) => {
    await page.goto('/lang/de/');

    // Navigate to French from German page
    await page.click('.lang-switcher-inline a[href*="/fr"]');
    await expect(page).toHaveURL(/\/lang\/fr\//);
  });
});
