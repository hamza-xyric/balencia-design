# P11 - Core Domain Details

- Status: `complete`
- Screens: `29`, `30`, `31`, `32`, `33`
- Routes: `/domains/meal`, `/domains/finance`, `/domains/budget`, `/domains/career`, `/domains/relationships`
- Sources: `../batches/batch-11.md`, `../update-batches/batch-u06.md`
- Build gate: no

## Focus

Verify practical domain detail screens are clear, stateful enough for prototype use, and privacy-aware.

## Review Checklist

- Confirm meal detail and food logging entry modes are distinct.
- Confirm finance detail receives explicit type/context.
- Confirm career and relationships avoid vague AI promises and expose consent for social-pattern nudges.

## Required Close Evidence

- Browser QA for meal/logging mode, finance detail variants, career/relationship actions.
- `npm run check` result.
