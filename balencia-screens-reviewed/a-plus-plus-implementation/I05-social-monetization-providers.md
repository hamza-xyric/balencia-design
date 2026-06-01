# I05 - Social, Monetization, Providers

- Status: `complete`
- Build gate: recommended
- Source synthesis: `../a-plus-plus-review/consolidated-cross-check.md`
- Primary source of truth: `../a-plus-plus-review/final-rollup.md`

## Goal

Settle surfaces that require product clarity: social scope, private-first safety, billing/paywall states, provider consent, and integration demo honesty.

## Finding Scope

| Area | Findings |
| --- | --- |
| Billing and paywall | R08-F05, R13-F05, R13-F06 |
| Connected services/provider labels | R08-F04, R18-F02 |
| Data/provider drilldowns | R10-F05, R18-F02 |
| Leaderboard/community/competitions | R13-F02, R13-F03, R13-F04, R14-F02, R14-F03 |
| Social buddy and secondary safety controls | R18-F04 |

## Phase Work Plan

Complete the full I05 scope under this phase owner:

1. Subscription and paywall purchase/restore/cancel/plan-selection fixtures.
2. Connected Services and Music provider consent/scope/revocation previews.
3. Leaderboard and competitions scope/filter/self-only/private states.
4. Community decision implementation: full private room flows or preview-only disabled fixture.
5. Social buddy/report/invite secondary target and safety polish.

## Required Reading

- `../findings/deferred-decisions.md`, especially Q20, Q35-Q42
- `../a-plus-plus-review/R08-identity-settings-billing.md`
- `../a-plus-plus-review/R10-data-first-domains.md`
- `../a-plus-plus-review/R13-habits-social-rewards-paywall.md`
- `../a-plus-plus-review/R14-accountability-recovery-tools.md`
- `../a-plus-plus-review/R18-reports-media-accountability-social.md`

## Acceptance Gates

- Billing flows show exact plan, cadence, price, restore/cancel/error state, and platform handoff copy.
- Provider connect flows preview scopes, sync frequency, storage, disconnect, delete-synced-data, and revocation before implied connection.
- Social surfaces remain friends/private-first unless safety and moderation are wired.
- Public/global scopes are disabled or clearly demoed if not supported.
- `npm run check` passes.
- `npm run build` runs if billing/provider/social routing or shared state is touched.
- Evidence covers positive, cancel/dismiss, and unavailable states where relevant.

## Closeout

Use the handoff template from `index.md`.

## Closeout - 2026-05-27

### Phase Work

- Phase: I05.
- Phase work completed: Social buddy/report/invite secondary target and safety polish.
- Findings addressed: R18-F04.
- Routes touched: `/features/social-buddy`.

### Changed Files

- `balencia-screens/src/app/features/social-buddy/page.tsx`
- `balencia-screens/output/a-plus-plus-review/I05/social-buddy-secondary-controls/capture-social-buddy-secondary-controls.mjs`
- `balencia-screens-reviewed/a-plus-plus-implementation/I05-social-monetization-providers.md`

### Evidence

- `balencia-screens/output/a-plus-plus-review/I05/social-buddy-secondary-controls/social-buddy-secondary-controls-evidence.json`
- `balencia-screens/output/a-plus-plus-review/I05/social-buddy-secondary-controls/social-buddy-initial.png`
- `balencia-screens/output/a-plus-plus-review/I05/social-buddy-secondary-controls/social-buddy-invite-open.png`
- `balencia-screens/output/a-plus-plus-review/I05/social-buddy-secondary-controls/social-buddy-report-open.png`

### Verification

- Browser QA: pass via local Playwright fallback because the in-app Browser backend reported `iab` unavailable. Reviewed `/features/social-buddy` initial, invite-open, and report-open states. `Invite buddy` and `Report` measured `150x44` in all captured states; invite/report copy opened correctly; no console messages or page errors were recorded.
- `npm run check`: fail due to pre-existing unrelated issues outside this phase pass. ESLint reported unused-variable warnings in `src/app/domains/relationships/page.tsx`, `src/app/domains/spirituality/page.tsx`, `src/app/features/medication/page.tsx`, and `src/app/features/notification-permission/page.tsx`; typecheck failed in `src/app/features/medication/page.tsx` because `MedicationList` is rendered without required `medications` and `onSeeAll` props.
- Focused lint: pass for `npm run lint -- src/app/features/social-buddy/page.tsx`.
- `npm run build`: not run. I05 build gate is recommended, and this phase pass only changed target sizing on an existing route control, with no billing/provider/social routing, shared runtime, or high-risk layout changes.

### Deferred

- Finding or question: Remaining I05 findings R08-F04, R08-F05, R10-F05, R13-F02, R13-F03, R13-F04, R13-F05, R13-F06, R14-F02, R14-F03, and R18-F02.
- Reason: Out of scope for this completed Social Buddy work.
- Recommended owner/phase: continue I05 with Connected Services and Music provider consent/scope/revocation previews for R08-F04 and R18-F02 on `/tabs/me/connected-services` and `/features/music`.

## Closeout - 2026-05-27

### Phase Work

- Phase: I05.
- Phase work completed: Connected Services and Music provider consent/scope/revocation previews.
- Findings addressed: R08-F04, R18-F02.
- Routes touched: `/tabs/me/connected-services`, `/features/music`.

### Changed Files

- `balencia-screens/src/app/tabs/me/connected-services/page.tsx`
- `balencia-screens/src/app/features/music/page.tsx`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/capture-provider-consent-labels.mjs`
- `balencia-screens-reviewed/a-plus-plus-implementation/I05-social-monetization-providers.md`

### Evidence

- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/provider-consent-labels-evidence.json`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/connected-services-initial.png`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/connected-services-apple-health-preview.png`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/connected-services-preview-cancelled.png`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/music-initial.png`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/music-spotify-permission-preview.png`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/music-spotify-preview-cancelled.png`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/music-spotify-connected-after-preview.png`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/music-spotify-manage.png`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/music-spotify-expired-token.png`
- `balencia-screens/output/a-plus-plus-review/I05/provider-consent-labels/music-spotify-reconnect-preview.png`

### Verification

- Browser QA: pass via local Playwright fallback because the in-app Browser backend reported `iab` unavailable. Reviewed `/tabs/me/connected-services` initial, Apple Health preview, and preview-cancelled states; reviewed `/features/music` initial, Spotify permission preview, cancelled preview, connected-after-preview, manage, expired-token, and reconnect-preview states. Evidence recorded no console messages and no page errors. Connected Services action labels are provider-specific (`Force sync WHOOP`, `Disconnect WHOOP`, `Connect Apple Health`, etc.). Music now shows Spotify scopes, sync cadence, stored data, disconnect, delete-synced-data, and provider revocation before connection.
- Focused lint: pass for `npm run lint -- src/app/tabs/me/connected-services/page.tsx src/app/features/music/page.tsx`.
- `npm run check`: pass. Lint, typecheck, route, asset, copy, and brand checks passed; `verify:routes passed (90 screens, 90 specs)`.
- `npm run build`: pass. Required for this provider-state work by the I05 acceptance gate; production build generated 96 static pages and emitted the existing non-failing Node `DEP0205` tooling deprecation warning.

### Deferred

- Finding or question: Remaining I05 findings R08-F05, R10-F05, R13-F02, R13-F03, R13-F04, R13-F05, R13-F06, R14-F02, and R14-F03.
- Reason: Out of scope for this completed provider work.
- Recommended owner/phase: continue I05 with Subscription and Paywall purchase/restore/cancel/plan-selection fixtures for R08-F05, R13-F05, and R13-F06 on `/tabs/me/subscription` and `/features/paywall`.

## Closeout - 2026-05-27

### Phase Work

- Phase: I05 - Social, Monetization, Providers.
- Phase work completed: completed remaining billing, paywall, data-source drilldown, leaderboard, community, and competitions fixtures. Subscription now shows exact plan/cadence/price, restore/cancel/payment-issue/store-handoff states; Paywall has selectable plan rows, selected-plan CTA, restore/dismiss/error states, and sticky safe-area actions; Data Sources correlation rows open real detail/graph context; Leaderboard scopes render distinct global/competition/country/friends lists with report/block/remove/undo safety; Community now supports private room entry, join, settings, create, invite, report/block/leave, and disables public rooms honestly; Competitions filters update list/counts and join/private/self-only/reminder actions complete visibly.
- Findings addressed: R08-F05, R10-F05, R13-F02, R13-F03, R13-F04, R13-F05, R13-F06, R14-F02, R14-F03.
- Routes touched: `/tabs/me/subscription`, `/features/paywall`, `/tabs/me/data-sources`, `/features/leaderboard`, `/features/community`, `/features/competitions`.

### Changed Files

- `balencia-screens/src/app/tabs/me/subscription/page.tsx`
- `balencia-screens/src/app/features/paywall/page.tsx`
- `balencia-screens/src/app/tabs/me/data-sources/page.tsx`
- `balencia-screens/src/app/features/leaderboard/page.tsx`
- `balencia-screens/src/app/features/community/page.tsx`
- `balencia-screens/src/app/features/competitions/page.tsx`
- `balencia-screens/output/a-plus-plus-review/I05/social-monetization-remaining/capture-social-monetization-remaining.mjs`
- `balencia-screens-reviewed/a-plus-plus-implementation/I05-social-monetization-providers.md`
- `balencia-screens-reviewed/a-plus-plus-implementation/index.md`

### Evidence

- `balencia-screens/output/a-plus-plus-review/I05/social-monetization-remaining/social-monetization-remaining-evidence.json`
- `balencia-screens/output/a-plus-plus-review/I05/social-monetization-remaining/` - 39 browser-state PNGs covering positive, cancel/dismiss, restore, error/unavailable, drilldown, safety, and private/self-only states.
- Key examples: `subscription-pro-confirmation.png`, `subscription-restore-result.png`, `paywall-pro-selected.png`, `paywall-payment-error.png`, `data-sources-correlation-detail.png`, `leaderboard-blocked-undo.png`, `community-room-settings.png`, `community-created-invite.png`, `competitions-join-private-success.png`, `competitions-self-only-success.png`.

### Verification

- Browser QA: pass via local Playwright fallback because the in-app Browser backend reported `iab` unavailable. Reviewed 39 states at `http://localhost:3005`; evidence recorded zero console messages and zero page errors.
- Focused lint: pass for `npm run lint -- src/app/tabs/me/subscription/page.tsx src/app/features/paywall/page.tsx src/app/tabs/me/data-sources/page.tsx src/app/features/leaderboard/page.tsx src/app/features/community/page.tsx src/app/features/competitions/page.tsx`.
- `npm run check`: pass. Lint, typecheck, route, asset, copy, and brand checks passed; `verify:routes passed (90 screens, 90 specs)`.
- `npm run build`: pass. Ran because I05 touched billing/social interaction state; production build generated 96 static pages and emitted the existing non-failing Node `DEP0205` tooling deprecation warning.
- `VISUAL_AUDIT_BASE_URL=http://localhost:3005 npm run verify:visual`: pass after escalation for Chrome launch; `verify:visual passed (41 routes audited)`.

### Deferred

- Finding or question: none for I05.
- Reason: all I05 finding IDs are now either addressed in this closeout or addressed in earlier I05 closeouts.
- Recommended owner/phase: later A++ re-review should recapture grades; do not update `a-plus-plus-review/index.md` during implementation.

### Open Phase Work

- Finding: none.
- Recommended next action: run the A++ re-review/QA phase for I05 routes when concurrent implementation phases settle.

### Cross-Agent Overlap

- The worktree was already broadly dirty across `app_design 3/`, app screens, shared components, and review docs before this pass; unrelated changes were preserved.
- Earlier I05 closeouts had already addressed R18-F04 and R08-F04/R18-F02, so this pass only completed the remaining I05 findings.
- Shared `BottomSheet` / `PhoneModalLayer` foundation changes were present while this pass was in progress; I built on the current shared modal API and fixed the Community active-room overlay to stay clipped inside the phone frame.
- A repo-wide typecheck briefly failed on an unrelated `features/journal` syntax issue during the session, then passed later after external/concurrent changes; no Journal files were edited in this pass.
