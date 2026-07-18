# G1 builder C implementation evidence — S35/S36/S37/S38

## Scope and provenance

- Role: Terra bounded writer.
- Owned product files only: `S35LearningDashboard.tsx`, `S36CreativityDashboard.tsx`, `S37Journal.tsx`, `S38Habits.tsx`.
- Source read: G1 batch contract, frozen matrix, verification matrix, recon C, active screen specs 35–38, compact canon, component catalog, RPG/privacy decisions, lane guidance, and four live files.
- No shared kit, registry, route, API, accepted-family, asset, Figma, production app, or external-service changes.
- Asset disposition: code-native only; no raster or generated imagery added.

## Implemented frozen contracts

### S35 Learning & growth

- Marks Learning as `Explore · non-scored`; no unsupported RPG level or Domain Stat.
- Separates `62%` book completion from daily mission `9 of 15 · 60%`; removes duplicate KPI claims and projected-series legend.
- Implements all 11 deterministic fixture markers, honest null/low confidence/error/offline/skeleton/success/disabled states, log sheet validation, suggestion toggle/undo, chart exploration, local library outcomes, Journal handoff, and nine-field course/data controls.

### S36 Creativity

- Marks Creativity as `Explore · non-scored`; removes unsupported level and green partial progress.
- Names project completion, weekly summary, practice days, and logged session trend distinctly.
- Implements all 12 fixture markers, honest null/low confidence/error/offline/skeleton/success/media-disabled states, one primary session action, validated local log, timer preview, same-origin Journal reflection, text-only milestone detail, and nine-field data controls.
- Explicitly states voice/media are local preview records with no recording/device capability.

### S37 Journal

- Implements all 14 fixture markers; Entries/Check-ins are real tabs with named panels.
- Separates system privacy copy from authored entries; gives real check-in values/source and honest null/voice-null/low-confidence/cached/offline states.
- Replaces overlapping fixed FAB with shell-owned bottom action and text/voice choice.
- Implements validated text save, preview-only voice consent, named delete confirmation/cancel/local outcome, scope-specific data controls, and always-reachable SafetyCard.

### S38 Habits

- Implements all 13 fixture markers and nearest-integer `5/8 = 63%` arithmetic.
- Uses registered `Wellbeing`, native labeled checkboxes, local check/undo status, and Today/Week/Month tab panels with distinct content.
- Separates real/calculated provenance from low-confidence sync-pending state; honest null suppresses streak/history/CIA claims.
- Implements validated add-habit flow, disabled reminder reason, local-only reminder outcome, and CIA detail that states association not causation with window/sample/freshness/confidence/correction/dismiss/data controls.

## Verification

Run from `balencia-screens/`:

```text
npx prettier --write <four owned files>                         PASS
npm run typecheck                                               PASS
npx eslint <four owned files>                                   PASS (0 errors, 0 warnings)
git diff --check -- <four owned files>                          PASS
```

All action-looking controls in the owned implementation now have a deterministic local outcome, same-origin link, or disabled reason. Dialogs are local prototype overlays; no API, storage, microphone, camera, upload, notification, clipboard, share, payment, or external-navigation capability is invoked.
