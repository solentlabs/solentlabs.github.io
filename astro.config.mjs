// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 12 languages based on Home Assistant user demographics
// See: https://analytics.home-assistant.io/
// Flags use SVG files for cross-browser compatibility (Chrome/Windows doesn't render flag emoji)
export const locales = {
  en: { label: 'English', flag: '/assets/flags/us.svg' },
  de: { label: 'Deutsch', flag: '/assets/flags/de.svg' },
  nl: { label: 'Nederlands', flag: '/assets/flags/nl.svg' },
  fr: { label: 'Français', flag: '/assets/flags/fr.svg' },
  zh: { label: '中文', flag: '/assets/flags/cn.svg' },
  it: { label: 'Italiano', flag: '/assets/flags/it.svg' },
  es: { label: 'Español', flag: '/assets/flags/es.svg' },
  pl: { label: 'Polski', flag: '/assets/flags/pl.svg' },
  sv: { label: 'Svenska', flag: '/assets/flags/se.svg' },
  ru: { label: 'Русский', flag: '/assets/flags/ru.svg' },
  'pt-br': { label: 'Português', flag: '/assets/flags/br.svg' },
  uk: { label: 'Українська', flag: '/assets/flags/ua.svg' },
};

export default defineConfig({
  site: 'https://solentlabs.io',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: Object.keys(locales),
    routing: {
      prefixDefaultLocale: false, // /about instead of /en/about
    },
  },
  build: {
    format: 'directory', // /de/index.html instead of /de.html
  },
});
