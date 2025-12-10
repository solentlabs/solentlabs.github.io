import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', lang: 'en' },
  { path: '/lang/pt-br/', lang: 'pt-br' },
  { path: '/lang/es/', lang: 'es' },
  { path: '/lang/de/', lang: 'de' },
  { path: '/lang/fr/', lang: 'fr' },
  { path: '/lang/zh/', lang: 'zh' },
];

test.describe('SEO Elements', () => {
  for (const page of PAGES) {
    test(`${page.lang} page has correct hreflang tags`, async ({ page: pwPage }) => {
      // Skip auto-redirect for these tests
      await pwPage.addInitScript(() => {
        localStorage.setItem('solent-lang', 'en');
      });

      await pwPage.goto(page.path);

      // Check all hreflang tags exist
      const hreflangs = await pwPage.locator('link[rel="alternate"][hreflang]').all();
      expect(hreflangs.length).toBeGreaterThanOrEqual(6);

      // Verify x-default exists
      const xDefault = pwPage.locator('link[hreflang="x-default"]');
      await expect(xDefault).toHaveAttribute('href', 'https://solentlabs.io/');

      // Verify each language has correct URL
      await expect(pwPage.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://solentlabs.io/');
      await expect(pwPage.locator('link[hreflang="pt-br"]')).toHaveAttribute('href', 'https://solentlabs.io/lang/pt-br/');
      await expect(pwPage.locator('link[hreflang="es"]')).toHaveAttribute('href', 'https://solentlabs.io/lang/es/');
      await expect(pwPage.locator('link[hreflang="de"]')).toHaveAttribute('href', 'https://solentlabs.io/lang/de/');
      await expect(pwPage.locator('link[hreflang="fr"]')).toHaveAttribute('href', 'https://solentlabs.io/lang/fr/');
      await expect(pwPage.locator('link[hreflang="zh"]')).toHaveAttribute('href', 'https://solentlabs.io/lang/zh/');
    });

    test(`${page.lang} page has correct html lang attribute`, async ({ page: pwPage }) => {
      await pwPage.addInitScript(() => {
        localStorage.setItem('solent-lang', 'en');
      });

      await pwPage.goto(page.path);

      const htmlLang = await pwPage.locator('html').getAttribute('lang');
      expect(htmlLang?.toLowerCase()).toBe(page.lang.toLowerCase());
    });
  }

  test('has favicon', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('solent-lang', 'en');
    });

    await page.goto('/');

    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', /favicon\.ico/);
  });

  test('has apple touch icon', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('solent-lang', 'en');
    });

    await page.goto('/');

    const appleIcon = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleIcon).toHaveAttribute('href', /apple-touch-icon\.png/);
  });

  test('has viewport meta tag', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('solent-lang', 'en');
    });

    await page.goto('/');

    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('has meta description', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('solent-lang', 'en');
    });

    await page.goto('/');

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /complex systems observable/);
  });
});

test.describe('Analytics', () => {
  test('GoatCounter script is present', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('solent-lang', 'en');
    });

    await page.goto('/');

    const goatCounter = page.locator('script[data-goatcounter]');
    await expect(goatCounter).toHaveAttribute('data-goatcounter', /solentlabs\.goatcounter\.com/);
  });
});

test.describe('Accessibility', () => {
  test('images have alt text', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('solent-lang', 'en');
    });

    await page.goto('/');

    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('page has proper heading hierarchy', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('solent-lang', 'en');
    });

    await page.goto('/');

    // h1 exists (main headline)
    const h1s = await page.locator('h1').all();
    expect(h1s.length).toBe(1);

    // h2 elements exist for sections
    const h2s = await page.locator('h2').all();
    expect(h2s.length).toBeGreaterThanOrEqual(2);
  });
});
