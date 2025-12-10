import { test, expect } from '@playwright/test';

const LANGUAGES = [
  { code: 'en', path: '/', title: 'Solent Labs™ — Open Source Network Monitoring' },
  { code: 'pt-br', path: '/lang/pt-br/', title: 'Solent Labs™ — Open Source Network Monitoring' },
  { code: 'es', path: '/lang/es/', title: 'Solent Labs™ — Open Source Network Monitoring' },
  { code: 'de', path: '/lang/de/', title: 'Solent Labs™ — Open Source Network Monitoring' },
  { code: 'fr', path: '/lang/fr/', title: 'Solent Labs™ — Open Source Network Monitoring' },
  { code: 'zh', path: '/lang/zh/', title: 'Solent Labs™ — Open Source Network Monitoring' },
];

test.describe('Page Rendering', () => {
  for (const lang of LANGUAGES) {
    test(`${lang.code.toUpperCase()} page loads correctly`, async ({ page }) => {
      await page.goto(lang.path);

      // Title is correct
      await expect(page).toHaveTitle(lang.title);

      // Logo is visible (in nav)
      await expect(page.locator('nav img')).toBeVisible();

      // Building Principles section exists
      await expect(page.locator('h2').first()).toBeVisible();

      // Footer is visible
      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('footer')).toContainText('Solent Labs™');
    });

    test(`${lang.code.toUpperCase()} page has working language switcher`, async ({ page }) => {
      await page.goto(lang.path);

      // Language switcher exists with all 6 options
      const langSwitcher = page.locator('.lang-switcher-inline');
      await expect(langSwitcher).toBeVisible();
      await expect(langSwitcher.locator('a')).toHaveCount(6);
    });
  }
});

test.describe('Content', () => {
  test('Home page has product section', async ({ page }) => {
    await page.goto('/');

    // Cable Modem Monitor link exists
    const cmmLink = page.locator('a[href*="cable-modem-monitor"]').first();
    await expect(cmmLink).toBeVisible();
  });

  test('Why Solent section exists', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('text=Why "Solent"?')).toBeVisible();
  });

  test('How We Build section exists', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('text=How We Build')).toBeVisible();
    await expect(page.locator('text=AI-accelerated')).toBeVisible();
    await expect(page.locator('text=Systems-first')).toBeVisible();
    await expect(page.locator('text=Root cause')).toBeVisible();
    await expect(page.locator('text=DRY architecture')).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('Mobile viewport renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await expect(page.locator('nav img')).toBeVisible();
    await expect(page.locator('.lang-switcher-inline')).toBeVisible();
  });
});
