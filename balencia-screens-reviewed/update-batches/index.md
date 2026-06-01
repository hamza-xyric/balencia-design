# Audit Feedback Update Batches

This folder tracks the audit-feedback remediation pass created from `balencia-screens-reviewed`. The reviewed audit artifacts remain evidence; the updated `../../app_design 3` files are the implementation contract, and the implemented prototype routes now move into the slower verification/polish layer at `../screen-iteration-batches/`.

- Created: 2026-05-26
- Source registry: `../../balencia-screens/src/data/screens.ts`
- Source findings: `../findings/findings-ledger.md`
- Resolved decisions: `../findings/deferred-decisions.md`
- Prototype update rule: broad remediation is complete; future work should use the focused P batches in `../screen-iteration-batches/`.
- Reusable implementation prompt: `../commands/implement-update-batch.md`
- Slow polish prompt: `../commands/start-screen-iteration-batch.md`

| Batch | Theme | Screens | Findings | File | Status |
| --- | --- | --- | --- | --- | --- |
| U01 | Auth entry, consent, and account recovery | `01`, `02`, `03`, `03b`, `03c`, `03d`, `03e`, `04`, `05`, `05b` | 18 (9 critical, 7 major, 2 minor) | `batch-u01.md` | prototype-implemented |
| U02 | Guest onboarding, Today entry, hydration/check-in, and SIA voice | `06`, `07`, `08`, `12`, `41`, `44`, `45`, `09`, `10`, `11` | 22 (9 critical, 13 major, 0 minor) | `batch-u02.md` | prototype-implemented |
| U03 | Conversation suite, call summary, missions, and streaks | `51`, `74`, `75`, `76`, `77`, `79`, `13`, `14`, `15`, `59` | 28 (9 critical, 19 major, 0 minor) | `batch-u03.md` | prototype-implemented |
| U04 | Mission support, Me entry, identity, settings, integrations, and billing | `73`, `85`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23` | 27 (5 critical, 20 major, 2 minor) | `batch-u04.md` | prototype-implemented |
| U05 | Me utilities, data trust, achievements, and first domain dashboards | `24`, `25`, `49`, `50`, `71`, `72`, `84`, `26`, `27`, `28` | 29 (7 critical, 20 major, 2 minor) | `batch-u05.md` | prototype-implemented |
| U06 | Core domain details, remaining dashboards, exercise library, and journal | `29`, `30`, `31`, `32`, `33`, `34`, `35`, `36`, `70`, `37` | 34 (10 critical, 21 major, 3 minor) | `batch-u06.md` | prototype-implemented |
| U07 | Habits, social surfaces, paywall, accountability, intelligence, and breathing | `38`, `39`, `40`, `42`, `43`, `46`, `47`, `48`, `52`, `53` | 29 (8 critical, 21 major, 0 minor) | `batch-u07.md` | prototype-implemented |
| U08 | Mindfulness, food utilities, sleep, health logging, tasks, notes, energy, and reporting safety | `54`, `55`, `56`, `57`, `58`, `60`, `61`, `62`, `63`, `64` | 30 (10 critical, 17 major, 3 minor) | `batch-u08.md` | prototype-implemented |
| U09 | System overlays, search/rating, reports, media, accountability contracts, and social buddy | `65`, `66`, `67`, `68`, `69`, `78`, `80`, `81`, `82`, `83` | 27 (12 critical, 15 major, 0 minor) | `batch-u09.md` | prototype-implemented |

## Process

1. Use update batch files as remediation history and accepted contract evidence.
2. For new work, start the matching P batch in `../screen-iteration-batches/`.
3. Prioritize critical conversion, navigation, retention, trust/privacy, accessibility, mobile ergonomics, and premium feel.
4. Run targeted browser QA, `npm run check`, and the P-batch build gate when required.

## Completion Criteria

- Each listed screen spec includes an `Audit Feedback Integration (2026-05-26)` section.
- Each update batch lists changed specs, accepted recommendation themes, resolved decisions, deferred questions, and prototype implications.
- Future changes are tracked in P batches with fresh verification results.
