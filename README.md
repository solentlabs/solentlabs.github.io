# solentlabs.io

Public website for [solentlabs.io](https://solentlabs.io).

## Structure

```
├── index.html              # English (default)
├── lang/
│   ├── pt-BR/index.html    # Brazilian Portuguese
│   ├── es/index.html       # Spanish
│   ├── de/index.html       # German
│   ├── fr/index.html       # French
│   └── zh-CN/index.html    # Chinese (Simplified)
├── assets/
│   ├── css/styles.css
│   └── images/
├── tests/                  # Playwright tests
│   ├── pages.spec.ts
│   ├── language.spec.ts
│   └── seo.spec.ts
├── .github/workflows/      # CI configuration
└── CNAME
```

## Testing

```bash
npm install
npx playwright test
```

## Build

This repo contains generated output only. Source files are maintained separately.

Do not edit files directly - they will be overwritten on next build.
