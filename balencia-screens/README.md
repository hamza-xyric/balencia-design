# Balencia Screens

High-fidelity visual prototype for Balencia mobile screens, rendered inside a desktop review shell with an iPhone-style frame.

## Source Of Truth

Use these references before implementing a screen:

- Current hi-fi specs: `../Balencia-New-Screens/hifi-screens/`
- Hi-fi ledger: `../Balencia-New-Screens/hifi-screens/_HIFI-LEDGER.md`
- Image slots: `../Balencia-New-Screens/hifi-screens/_IMAGE-SLOTS.md`
- Brand and creative: `../Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md`
- Shared brand foundation: `../Balencia/Design-System-Overview.md`

The installed Codex skill `$balencia-visual-prototype` captures the workflow and conflict rules. The legacy `app_design 3/` specs and old per-screen routes are reference material only for this 104-screen refresh.

New prototype screens use stable routes:

```text
/screens/<id>
```

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run verify:routes
npm run verify:assets
npm run verify:copy
npm run verify:brand
npm run check
```

`npm run build` requires network access unless Sora is vendored locally, because `next/font/google` fetches the Sora font during build.

## Guardrails

- Visual-only prototype. No API calls, backend wiring, auth logic, or state libraries.
- Sora is the UI font. Official logo assets carry the wordmark.
- Orange is primary action, green is success/completion, purple is CIA/AI.
- Use CIA in new visible UI and new code/data. Do not introduce SIA in new prototype content.
- Use mission terminology in visible UI.
- Sentence case everywhere except uppercase eyebrow labels.
- No exclamation marks in UI copy.
