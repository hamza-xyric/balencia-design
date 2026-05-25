# Balencia Screens

High-fidelity visual prototype for Balencia mobile screens, rendered inside a desktop review shell with an iPhone-style frame.

## Source Of Truth

Use these references before implementing a screen:

- Brand and creative: `/Users/hamza/yHealth/Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md`
- Screen specs: `/Users/hamza/yHealth/app_design 3/`
- QA risks: `/Users/hamza/yHealth/Wireframes/AUDIT-REPORT.md`
- Session tracker: `/Users/hamza/yHealth/CODEX-SESSION-PROMPT.md`

The installed Codex skill `$balencia-visual-prototype` captures the workflow and conflict rules.

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
- Orange is primary action, green is success/completion, purple is SIA/AI.
- Use mission terminology in visible UI.
- Sentence case everywhere except uppercase eyebrow labels.
- No exclamation marks in UI copy.
