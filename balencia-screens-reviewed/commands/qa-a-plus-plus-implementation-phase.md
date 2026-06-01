# QA A++ Implementation Phase

Use this command after implementing an A++ phase, before closeout.

## Mechanical Checks

Run from `balencia-screens`:

```bash
npm run check
```

Run production build when the active phase has `Build gate: required`, or when shared routing/runtime code changed:

```bash
npm run build
```

Run visual audit for routes involving overlays, bottom actions, tab bars, modals, media, charts, or dense mobile layouts:

```bash
VISUAL_AUDIT_BASE_URL=http://localhost:3005 npm run verify:visual
```

If the dev server uses another port, record the actual URL.

## Browser QA

For every touched route/state:

- route loads without new console/runtime errors
- primary CTA performs visible action or correct navigation
- secondary controls work, are disabled, are static, or are documented
- bottom sheets/modals are phone-frame relative
- text does not clip or overlap
- tab bar, home indicator, composer, and dynamic island do not cover controls
- effective touch targets are at least 44x44 where practical
- focus order and accessible labels match the visual state
- sensitive actions explain scope before asking
- destructive/safety flows include cancel and confirmation
- no hidden background controls remain focusable during active modal/session states

Record evidence paths in the active phase file.
