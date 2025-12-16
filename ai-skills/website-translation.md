# Website Translation Skill

A structured approach for generating and maintaining translations for the Solent Labs website (solentlabs.io). Uses Claude Code to generate professional translations from the English source.

## Translation Architecture

```
src/i18n/
├── en.json                    # Source of truth (English)
├── generated/
│   ├── de.json               # AI-generated: German
│   ├── nl.json               # AI-generated: Dutch
│   ├── fr.json               # AI-generated: French
│   ├── zh.json               # AI-generated: Chinese (Simplified)
│   ├── it.json               # AI-generated: Italian
│   ├── es.json               # AI-generated: Spanish
│   ├── pl.json               # AI-generated: Polish
│   ├── sv.json               # AI-generated: Swedish
│   ├── ru.json               # AI-generated: Russian
│   ├── pt-br.json            # AI-generated: Portuguese (Brazilian)
│   └── uk.json               # AI-generated: Ukrainian
└── overrides/
    └── {lang}.json           # Human corrections (merged at build time)
```

## Supported Languages

| Code | Language | Native Name |
|------|----------|-------------|
| en | English | English |
| de | German | Deutsch |
| nl | Dutch | Nederlands |
| fr | French | Fran ais |
| zh | Chinese (Simplified) | 中文 |
| it | Italian | Italiano |
| es | Spanish | Espanol |
| pl | Polish | Polski |
| sv | Swedish | Svenska |
| ru | Russian | Русский |
| pt-br | Portuguese (Brazilian) | Portugues |
| uk | Ukrainian | Українська |

## When to Generate Translations

- After updating `en.json` with new content
- When adding a new language
- When fixing translation issues across all languages
- After merging PRs that change English copy

## Translation Prompt Template

When generating a translation, use this prompt:

```
Generate a professional translation of the following JSON from English to [LANGUAGE NAME].

Requirements:
1. Maintain the exact same JSON structure and keys
2. Only translate the string values, not keys
3. Keep brand names unchanged: "Solent Labs", "Cable Modem Monitor", "Home Assistant", "HACS", "DOCSIS", "Open Source"
4. Keep technical terms in English where appropriate: "API", "parser", "fixture", "pull request"
5. Preserve formatting: dashes, quotation marks, numbers
6. Use proper quotation marks for the target language but escape them in JSON (use \")
7. Maintain the same tone: professional, direct, technical
8. For UI elements, use standard translations for that language
9. Numbers with units should follow locale conventions (e.g., "10+" stays "10+")

Source JSON:
[PASTE en.json CONTENT]
```

## Step-by-Step Translation Process

### 1. Identify Changes in English Source

```bash
# Check what changed in en.json
git diff src/i18n/en.json
```

### 2. Generate Translation for One Language

1. Read the English source file
2. Use the translation prompt template
3. Validate JSON syntax
4. Write to `src/i18n/generated/{lang}.json`

### 3. Validate Generated JSON

```bash
# Validate JSON syntax for all generated files
for f in src/i18n/generated/*.json; do
  python3 -c "import json; json.load(open('$f'))" && echo "$f: OK" || echo "$f: INVALID"
done
```

### 4. Run Playwright Tests

```bash
npx playwright test tests/language.spec.ts
```

## Common Issues

### German Quotation Marks

German uses „text" quotation marks. These must be escaped in JSON:

**Wrong:**
```json
"title": "Warum „Solent"?"
```

**Correct:**
```json
"title": "Warum \"Solent\"?"
```

### Chinese/Japanese Special Characters

Ensure proper Unicode encoding. Chinese doesn't use spaces between words.

### Cyrillic Scripts (Russian, Ukrainian)

Use proper Cyrillic characters. Russian and Ukrainian are different languages - don't mix them.

### Right-to-Left Languages

Not currently supported. Would require additional CSS work.

## Quality Checklist

Before committing translations:

- [ ] All JSON files pass syntax validation
- [ ] No German quotation marks ( or ) in JSON values
- [ ] Brand names unchanged: Solent Labs, Cable Modem Monitor
- [ ] Technical terms kept in English where appropriate
- [ ] Numbers and statistics unchanged (10+, 700+, 12 languages)
- [ ] Playwright language tests pass
- [ ] Spot-check 2-3 sections in browser for each language

## Contributor Translation Workflow

When a contributor changes `en.json`:

1. **PR Check**: CI runs translation validation
2. **Notification**: PR comment explains translation needed
3. **Translation**: Maintainer generates translations using this skill
4. **Review**: Spot-check critical sections
5. **Merge**: Translations included in same PR or follow-up

## Override System

Human corrections go in `src/i18n/overrides/{lang}.json`. At build time:

1. Load `src/i18n/en.json`
2. Load `src/i18n/generated/{lang}.json`
3. Deep merge `src/i18n/overrides/{lang}.json` (if exists)
4. Overrides take precedence

This allows AI-generated translations to be corrected without modifying the generated files.

## Adding a New Language

1. Add language to `src/i18n/config.ts`
2. Generate initial translation using this skill
3. Add to `LANGUAGES` array in Playwright tests
4. Update BaseLayout.astro language switcher
5. Create language-specific homepage in `src/pages/{lang}/index.astro`
6. Test with `npx playwright test`

## Maintenance

### Monthly Review

- Check for outdated translations (compare `generated/` timestamps to `en.json`)
- Review any override files for patterns that should be fixed in prompts
- Update translation prompt if quality issues are recurring

### After Major English Copy Changes

- Regenerate all 11 translations
- Run full Playwright test suite
- Spot-check critical pages in each language
