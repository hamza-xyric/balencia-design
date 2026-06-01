# Balencia Screen Iteration Batches

This folder is the slow polish layer after the audit-feedback implementation pass.

The purpose is not to redo the audit. Each session should verify the implemented screen against the accepted spec integration, improve only the assigned screens, and close with fresh evidence. Quality is the gate; batch size stays small on purpose.

- Created: 2026-05-26
- Prototype: `../../balencia-screens`
- Screen specs: `../../app_design 3`
- Original audit batches: `../batches`
- Update batches: `../update-batches`
- Skill: `../skills/balencia-screen-polish/SKILL.md`
- Commands: `../commands/start-screen-iteration-batch.md`, `../commands/qa-screen-iteration-batch.md`, `../commands/close-screen-iteration-batch.md`

## Batch Index

| Batch | Theme | Screens | Update Source | Build Gate | File | Status |
| --- | --- | --- | --- | --- | --- | --- |
| P00 | Foundation readiness | repo-wide readiness | U01-U09 | required | `P00-foundation-readiness.md` | implemented |
| P01 | Auth entry and consent | `01`, `02`, `03`, `03b`, `03c` | U01 | no | `P01-auth-entry-consent.md` | implemented |
| P02 | Profile and recovery | `03d`, `03e`, `04`, `05`, `05b` | U01 | no | `P02-profile-recovery.md` | implemented |
| P03 | Guest, SIA onboarding, Today entry | `06`, `07`, `08`, `12`, `41` | U02 | required | `P03-guest-sia-today.md` | implemented-with-verification-blocker |
| P04 | Daily actions and SIA voice | `44`, `45`, `09`, `10`, `11` | U02 | no | `P04-daily-actions-sia-voice.md` | implemented |
| P05 | Conversation suite | `51`, `74`, `75`, `76`, `77` | U03 | no | `P05-conversation-suite.md` | implemented |
| P06 | Call summary and missions | `79`, `13`, `14`, `15`, `59` | U03 | required | `P06-call-summary-missions.md` | implemented |
| P07 | Mission support and Me entry | `73`, `85`, `16`, `17`, `18` | U04 | no | `P07-mission-support-me-entry.md` | implemented |
| P08 | Identity, settings, billing | `19`, `20`, `21`, `22`, `23` | U04 | no | `P08-identity-settings-billing.md` | implemented-check-blocked |
| P09 | Me utilities and achievements | `24`, `25`, `49`, `50`, `71` | U05 | required | `P09-me-utilities-achievements.md` | implemented |
| P10 | Data and first domain dashboards | `72`, `84`, `26`, `27`, `28` | U05 | no | `P10-data-first-domains.md` | planned |
| P11 | Core domain details | `29`, `30`, `31`, `32`, `33` | U06 | no | `P11-core-domain-details.md` | planned |
| P12 | More domains and journal | `34`, `35`, `36`, `70`, `37` | U06 | required | `P12-more-domains-journal.md` | planned |
| P13 | Habits, social, rewards, paywall | `38`, `39`, `40`, `42`, `43` | U07 | no | `P13-habits-social-rewards-paywall.md` | planned |
| P14 | Accountability and recovery tools | `46`, `47`, `48`, `52`, `53` | U07 | no | `P14-accountability-recovery-tools.md` | planned |
| P15 | Mindfulness, food, shopping, sleep | `54`, `55`, `56`, `57`, `58` | U08 | required | `P15-mindfulness-food-shopping-sleep.md` | planned |
| P16 | Health utilities and reporting | `60`, `61`, `62`, `63`, `64` | U08 | no | `P16-health-utilities-reporting.md` | planned |
| P17 | System overlays and search | `65`, `66`, `67`, `68`, `69` | U09 | no | `P17-system-overlays-search.md` | planned |
| P18 | Reports, media, accountability, social | `78`, `80`, `81`, `82`, `83` | U09 | required | `P18-reports-media-accountability-social.md` | planned |

## Final Cross-Batch Audit Snapshot - 2026-05-26

- Final report: `../final-cross-batch-audit.md`
- Verdict for P00-P09: `ready-with-minor-followups`
- Covered chain: P00 foundation readiness plus P01-P09 implemented screen batches.
- Out of scope for the final verdict: P10-P18 remain `planned` and still need the same screen-level polish, browser QA, and closeout loop before the full 90-screen prototype can be called final-ready.
- Status note: P03 and P08 keep their historical closeout status labels in the table, but the final audit supersedes their old verification blockers. Final `npm run check` passed, including `verify:brand`.
- Final evidence: `../../balencia-screens/output/final-audit/route-load-results.json`, `../../balencia-screens/output/final-audit/route-load-summary.txt`, and `../../balencia-screens/output/final-audit/load-*.png`.
- Mechanical gates re-run in `../../balencia-screens`: `npm run check` passed, `npm run build` passed, and `VISUAL_AUDIT_BASE_URL=http://localhost:3005 npm run verify:visual` passed after the sandbox-blocked Chrome run was rerun with browser permissions.
- Final audit fixes were intentionally scoped to already implemented batches: auth spec contract cleanup, non-interactive chip semantics, nested switch cleanup, and practical 44px touch-target consistency.
- Deferred planned-route issues surfaced during the broad visual/dev-server sweep: `/domains/fitness` duplicate key output (P10), `/domains/finance` nested-anchor hydration output (P11), `/domains/relationships` nested-anchor hydration output (P11), `/domains/creativity` duplicate key output (P12), `/features/sleep` duplicate key output (P15), and `/features/reminders` duplicate key output (P16).

## Standard Session Loop

1. Read the active P batch, its original audit batch, its update batch, the matching specs, and the current route files.
2. Browser-review one screen at a time for premium feel, five-second clarity, action clarity, touch targets, copy, trust/privacy, accessibility, and route behavior.
3. Implement only fixes for the active batch.
4. Run targeted browser QA, then `npm run check` from `../../balencia-screens`.
5. Run `npm run build` for P00 and every third polish batch: P03, P06, P09, P12, P15, P18.
6. Close the batch with findings addressed, findings deferred, evidence paths, verification results, and the next recommended batch.

## Quality Rule

If a screen passes mechanical checks but still feels ordinary, crowded, manipulative, unclear, or below Balencia's premium bar, keep the batch open and record the issue. The whole point of this layer is to catch what lint, typecheck, and route verification cannot see.
