# BUILD-LEDGER — Balencia 104-Screen Hi-Fi Prototype Build

> Durable build truth for rendering `Balencia-New-Screens/hifi-screens/` (104 specs) into
> `balencia-screens/` at `/screens/[id]`. **Sole writer: the Fable orchestrator.** Worker
> output is evidence, not truth, until verified and applied here.
>
> Created: 2026-07-08 · Branch: `hifi-build` (baseline commit `ff59f6f`)

## Runtime profile

```yaml
loop_primitive: /goal
runtime_profile: fable-orchestrated-multiagent
orchestrator_role: Claude Code Fable orchestrates through Forgeflow artifacts
worker_backend: GLM 5.2 primary bulk drafter (ping OK 2026-07-08, model=glm-5.2); Sonnet integrate/repair/review; Haiku read-only digests
provider: Claude native plus GLM workflow worker via scripts/glm-worker.sh
model: Fable orchestrator; GLM 5.2 bulk drafts; Sonnet implementation and review; Haiku discovery
endpoint_class: native Claude plus explicit GLM workflow worker
goal_statement: build all 104 hi-fi screens into the visual prototype with verified route truth, glass canon, data honesty, accessibility, and no legacy coach token
quality_loop: ground -> plan -> delegate/build -> verify -> fix -> re-verify -> persist
verify_command: npm run check from balencia-screens/
evidence_path: Balencia-New-Screens/build-progress/
stop_condition: all scoped batch screens render, verification passes, ledger updated, handoff written
```

## Locked decisions (founder, 2026-07-08)

1. **Dark-only everywhere.** All 104 screens ship glass-dark v1. The warm-light spec exceptions
   (12, 16, 26, 28, 56 + auth family) are theme-variant debt for the future `[data-theme="light"]`
   task — logged here, not built.
2. **GLM 5.2 is the primary bulk JSX drafter.** Founder explicitly approved sending hi-fi spec
   content to the GLM API — this supersedes waiver W-004 for this build. Sonnet repairs drafts to
   gate-green; Fable integrates and owns truth. Fallback to sonnet-primary if the bridge fails,
   recorded per batch.
3. **Branch `hifi-build`** off craft-build tip; per-batch commits; repo-split deletions untouched.
4. **Max autonomous sessions**: verified batches only; ledger + handoff at every batch close.

## Evidence tier

Figma/mock direction is **Tier B** (founder-attached screenshots: warm-dark glass, 5 wellbeing
screens). No live Figma MCP evidence captured this session. Glass-dark canon
(`canon/COMPACT-CANON.md`) governs; screenshots guide polish/rhythm only.

## Baseline verification (2026-07-08, pre-build)

| Gate | Result |
|---|---|
| `npm run check` (balencia-screens) | PASS — lint 1 pre-existing warning (W-006), typecheck, routes 104/104, assets 14, copy 250 files, brand 250 files |
| `validate-redesign.mjs --json` | PASS — ledgerRows 104, ledgerPass 104, screenFiles 104, route sweeps clean |
| SIA sweep (hifi paths) | 0 hits |
| `glm-worker.sh --ping` | OK model=glm-5.2 reply=pong |

## Status pipeline

`todo → built` (module renders, builder T1 green) `→ verified` (full gates + trust & a11y reviews
PASS + screenshot) `→ complete` (ledger finalized, screens.ts flipped, batch closed).
screens.ts sync: complete→'complete', built/verified→'in-progress', todo→'not-started'.

## Open items / debt

- Warm-light exception screens (12, 16, 26, 28, 56, auth family): dark-only per decision 1; revisit at light-theme task.
- `figma-tokens-map.json` regeneration owed after B0 globals.css additions.
- Batch A 10 screens: complete per Batch A gates; B0 canon-alignment pass (fonts/inner-glow/GlassNavBar) will re-review them visually.
- Legacy SIA routes (~92 pages) grandfathered (W-005) — out of scope for this build.

## Screens

| ID | Spec file | Route truth | Family | Batch | Status | Module | Reviews | Gates | Evidence | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 | 01-splash-screen.md | review-route only | Auth & onboarding | B1 | complete | screens/auth/S01Splash.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/01.png | review-route only |
| 02 | 02-motion-carousel.md | review-route only | Auth & onboarding | B1 | complete | screens/auth/S02MotionCarousel.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/02.png | review-route only |
| 03 | 03-welcome-sign-up.md | /auth/signup | Auth & onboarding | P | complete | screens/auth/S03WelcomeSignUp.tsx | trust+a11y PASS (10 findings fixed) | 2026-07-08 npm run check | screenshots/pilot/03.png |  |
| 03b | 03b-otp-verification.md | /auth/verify | Auth & onboarding | B1 | complete | screens/auth/S03bOtpVerification.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/03b.png |  |
| 03c | 03c-consent.md | /onboarding | Auth & onboarding | B1 | complete | screens/auth/S03cConsent.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/03c.png |  |
| 03d | 03d-complete-profile.md | review-route only | Auth & onboarding | B1 | complete | screens/auth/S03dCompleteProfile.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/03d.png | review-route only |
| 03e | 03e-whatsapp-enrollment.md | /onboarding | Auth & onboarding | B1 | complete | screens/auth/S03eWhatsappEnrollment.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/03e.png |  |
| 04 | 04-sign-in.md | /auth/signin | Auth & onboarding | B1 | complete | screens/auth/S04SignIn.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/04.png |  |
| 05 | 05-forgot-password.md | /auth/forgot-password | Auth & onboarding | B1 | complete | screens/auth/S05ForgotPassword.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/05.png |  |
| 05b | 05b-reset-password.md | /auth/reset-password, /reset-password | Auth & onboarding | B1 | complete | screens/auth/S05bResetPassword.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/05b.png |  |
| 06 | 06-guest-mode-preview.md | review-route only | Auth & onboarding | B1 | complete | screens/auth/S06GuestModePreview.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/06.png | review-route only |
| 07 | 07-cia-onboarding-conversation.md | /onboarding | Auth & onboarding | P | complete | screens/auth/S07CiaOnboarding.tsx | trust+a11y PASS (10 findings fixed) | 2026-07-08 npm run check | screenshots/pilot/07.png |  |
| 08 | 08-initial-plan-summary.md | /onboarding | Auth & onboarding | B1 | complete | screens/auth/S08InitialPlanSummary.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/08.png |  |
| 09 | 09-cia-chat.md | /ai-coach | CIA, voice & chat | A | complete | screens/cia/S09CiaChat.tsx | Batch A gates | 2026-07-08 baseline | — |  |
| 10 | 10-cia-voice-in-chat.md | review-route only | CIA, voice & chat | B2 | todo | — | — | — | — | review-route only |
| 11 | 11-cia-voice-full-screen.md | /voice-assistant, /voice-call | CIA, voice & chat | B2 | todo | — | — | — | — |  |
| 12 | 12-home-screen.md | /dashboard, /activity-status | Today & missions | A | complete | screens/today/S12HomeScreen.tsx | Batch A gates | 2026-07-08 baseline | — |  |
| 13 | 13-goals-list.md | /goals | Today & missions | A | complete | screens/today/S13MissionBoard.tsx | Batch A gates | 2026-07-08 baseline | — |  |
| 14 | 14-goal-detail.md | review-route only | Today & missions | B3 | todo | — | — | — | — | review-route only |
| 15 | 15-create-edit-goal.md | review-route only | Today & missions | B3 | todo | — | — | — | — | review-route only |
| 16 | 16-life-areas-overview.md | /life-areas | Life intelligence | A | complete | screens/intelligence/S16LifeAreas.tsx | Batch A gates | 2026-07-08 baseline | — |  |
| 17 | 17-me-main.md | /profile | Profile & settings | B4 | todo | — | — | — | — |  |
| 18 | 18-explore-section.md | review-route only | Profile & settings | B6 | todo | — | — | — | — | review-route only |
| 19 | 19-rpg-character.md | /life-world | Profile & settings | B4 | todo | — | — | — | — |  |
| 20 | 20-personal-wiki-cia-memory.md | /wiki | Life intelligence | B4 | todo | — | — | — | — |  |
| 21 | 21-settings.md | /settings, /preferences | Profile & settings | B7b | todo | — | — | — | — |  |
| 22 | 22-connected-services.md | /auth/whoop/callback, /calendar/connected | Profile & settings | B7b | todo | — | — | — | — |  |
| 23 | 23-subscription-billing.md | /settings/billing, /settings/billing/credits | Profile & settings | B7b | todo | — | — | — | — |  |
| 24 | 24-notification-history.md | /notifications | Profile & settings | B7b | todo | — | — | — | — |  |
| 25 | 25-help-center.md | /help, /help/[slug] | Profile & settings | B7b | todo | — | — | — | — |  |
| 26 | 26-fitness-workouts-dashboard.md | /activity, /workouts | Health & wellbeing | P | complete | screens/health/S26FitnessDashboard.tsx | trust+a11y PASS (10 findings fixed) | 2026-07-08 npm run check | screenshots/pilot/26.png |  |
| 27 | 27-workout-detail-active.md | review-route only | Health & wellbeing | B5a | todo | — | — | — | — | review-route only |
| 28 | 28-nutrition-diet-dashboard.md | /nutrition | Health & wellbeing | P | complete | screens/health/S28NutritionDashboard.tsx | trust+a11y PASS (10 findings fixed) | 2026-07-08 npm run check | screenshots/pilot/28.png |  |
| 29 | 29-meal-detail-food-logger.md | review-route only | Health & wellbeing | B5a | todo | — | — | — | — | review-route only |
| 30 | 30-finance-money-map.md | /money-map | Domains & money | B6 | todo | — | — | — | — |  |
| 31 | 31-transaction-budget-detail.md | review-route only | Domains & money | B6 | todo | — | — | — | — | review-route only |
| 32 | 32-career-work-dashboard.md | /career | Domains & money | B6 | todo | — | — | — | — |  |
| 33 | 33-relationships-dashboard.md | /people | Domains & money | B6 | todo | — | — | — | — |  |
| 34 | 34-spirituality-dashboard.md | No live app route; source-only spirituality surface. | Domains & money | B6 | todo | — | — | — | — |  |
| 35 | 35-learning-growth-dashboard.md | review-route only | Domains & money | B6 | todo | — | — | — | — | review-route only |
| 36 | 36-creativity-dashboard.md | review-route only | Domains & money | B6 | todo | — | — | — | — | review-route only |
| 37 | 37-journal.md | /wellbeing/journal | Domains & money | B6 | todo | — | — | — | — |  |
| 38 | 38-habits.md | /wellbeing/habits | Domains & money | B6 | todo | — | — | — | — |  |
| 39 | 39-leaderboard.md | /leaderboard | Social & community | B7a | todo | — | — | — | — |  |
| 40 | 40-community-chat-rooms.md | /community, /community/[slug] | Social & community | B7a | todo | — | — | — | — |  |
| 41 | 41-schedule-calendar.md | /schedule, /wellbeing/schedule, /wellbeing/schedule/[date] | Today & missions | B3 | todo | — | — | — | — |  |
| 42 | 42-celebration-overlay.md | /subscription/success | Profile & settings | B7a | todo | — | — | — | — |  |
| 43 | 43-paywall-upgrade.md | /subscription, /upgrade, /locked/[pageKey] | Profile & settings | B7b | todo | — | — | — | — |  |
| 44 | 44-water-intake.md | review-route only | Today & missions | B3 | todo | — | — | — | — | review-route only |
| 45 | 45-daily-checkin.md | /wellbeing/emotional-checkin | Today & missions | B3 | todo | — | — | — | — |  |
| 46 | 46-accountability.md | review-route only | Social & community | B7a | todo | — | — | — | — | review-route only |
| 47 | 47-competitions.md | /competitions | Social & community | B7a | todo | — | — | — | — |  |
| 48 | 48-intelligence-dashboard.md | /wellbeing/insights | Life intelligence | A | complete | screens/intelligence/S48Intelligence.tsx | Batch A gates | 2026-07-08 baseline | — |  |
| 49 | 49-progress-photos.md | review-route only | Health & wellbeing | B5a | todo | — | — | — | — | review-route only |
| 50 | 50-profile-edit.md | /profile/edit | Profile & settings | B4 | todo | — | — | — | — |  |
| 51 | 51-voice-call-history.md | /voice-call | CIA, voice & chat | B2 | todo | — | — | — | — |  |
| 52 | 52-stress-management.md | /wellbeing/stress | Health & wellbeing | B5b | todo | — | — | — | — |  |
| 53 | 53-breathing-exercises.md | /wellbeing/breathing | Health & wellbeing | B5b | todo | — | — | — | — |  |
| 54 | 54-meditation-mindfulness.md | No live app route; source-only mindfulness surface. | Health & wellbeing | B5b | todo | — | — | — | — |  |
| 55 | 55-yoga-sessions.md | /yoga | Health & wellbeing | B5b | todo | — | — | — | — |  |
| 56 | 56-recipes.md | review-route only | Health & wellbeing | B5a | todo | — | — | — | — | review-route only |
| 57 | 57-shopping-list.md | review-route only | Health & wellbeing | B5a | todo | — | — | — | — | review-route only |
| 58 | 58-sleep-tracking.md | review-route only | Health & wellbeing | B5b | todo | — | — | — | — | review-route only |
| 59 | 59-streak-details.md | review-route only | Today & missions | B3 | todo | — | — | — | — | review-route only |
| 60 | 60-medication-tracking.md | No live app route; source-only medication surface. | Health & wellbeing | B5b | todo | — | — | — | — |  |
| 61 | 61-reminders-tasks.md | review-route only | Today & missions | B3 | todo | — | — | — | — | review-route only |
| 62 | 62-quick-notes.md | /quick-notes | Health & wellbeing | B5b | todo | — | — | — | — |  |
| 63 | 63-energy-tracking.md | /wellbeing/energy | Health & wellbeing | A | complete | screens/health/S63EnergyTracking.tsx | Batch A gates | 2026-07-08 baseline | — |  |
| 64 | 64-report-block.md | review-route only | Social & community | B7b | todo | — | — | — | — | review-route only |
| 65 | 65-force-update.md | review-route only | Auth & onboarding | B1 | complete | screens/auth/S65ForceUpdate.tsx | trust+a11y: 16 findings fixed | 2026-07-08 npm run check | screenshots/B1/65.png | review-route only |
| 66 | 66-notification-permission.md | review-route only | Auth & onboarding | A | complete | screens/auth/S66NotificationPermission.tsx | Batch A gates | 2026-07-08 baseline | — | review-route only |
| 67 | 67-image-viewer.md | review-route only | System & media | B7b | todo | — | — | — | — | review-route only |
| 68 | 68-universal-search.md | review-route only | Profile & settings | B4 | todo | — | — | — | — | review-route only |
| 69 | 69-app-rating.md | review-route only | System & media | B7b | todo | — | — | — | — | review-route only |
| 70 | 70-exercise-library.md | /exercises, /exercises/[id] | Health & wellbeing | B5a | todo | — | — | — | — |  |
| 71 | 71-achievement-gallery.md | /achievements | Profile & settings | B7a | todo | — | — | — | — |  |
| 72 | 72-knowledge-graph.md | /knowledge-graph | Life intelligence | B4 | todo | — | — | — | — |  |
| 73 | 73-mission-journal.md | review-route only | Today & missions | B3 | todo | — | — | — | — | review-route only |
| 74 | 74-conversations-hub.md | /chat-history, /chat | CIA, voice & chat | B2 | todo | — | — | — | — |  |
| 75 | 75-direct-chat.md | /messages | CIA, voice & chat | A | complete | screens/cia/S75DirectChat.tsx | Batch A gates | 2026-07-08 baseline | — |  |
| 76 | 76-group-chat.md | /chat | CIA, voice & chat | B2 | todo | — | — | — | — |  |
| 77 | 77-message-actions.md | review-route only | CIA, voice & chat | B2 | todo | — | — | — | — | review-route only |
| 78 | 78-reports-center.md | review-route only | Social & community | B7b | todo | — | — | — | — | review-route only |
| 79 | 79-call-summary.md | review-route only | CIA, voice & chat | B2 | todo | — | — | — | — | review-route only |
| 80 | 80-music-coach.md | /soundscape | System & media | B7b | todo | — | — | — | — |  |
| 81 | 81-video-library.md | review-route only | System & media | B7b | todo | — | — | — | — | review-route only |
| 82 | 82-accountability-contract.md | /contracts | Social & community | B7a | todo | — | — | — | — |  |
| 83 | 83-social-buddy-profile.md | /profile/[id] | Profile & settings | B4 | todo | — | — | — | — |  |
| 84 | 84-data-sources.md | review-route only | Life intelligence | B4 | todo | — | — | — | — | review-route only |
| 85 | 85-obstacle-coach.md | /obstacles/[id] | System & media | B7b | todo | — | — | — | — |  |
| 86 | 86-virtual-tryon.md | /wellbeing/virtual-tryon | Health & wellbeing | B5a | todo | — | — | — | — |  |
| 87 | 87-tryon-history.md | /wellbeing/virtual-tryon/history | Health & wellbeing | B5a | todo | — | — | — | — |  |
| 88 | 88-vision-suite.md | /wellbeing/vision | Health & wellbeing | B5a | todo | — | — | — | — |  |
| 89 | 89-wellbeing-hub.md | /wellbeing | Health & wellbeing | A | complete | screens/health/S89Wellbeing.tsx | Batch A gates | 2026-07-08 baseline | — |  |
| 90 | 90-progress-measurements.md | /progress | Life intelligence | B4 | todo | — | — | — | — |  |
| 91 | 91-social-feed.md | /feed | Social & community | A | complete | screens/social/S91SocialFeed.tsx | Batch A gates | 2026-07-08 baseline | — |  |
| 92 | 92-reputation.md | /reputation | Life intelligence | B4 | todo | — | — | — | — |  |
| 93 | 93-mood-trends.md | /wellbeing/mood | Life intelligence | B4 | todo | — | — | — | — |  |
| 94 | 94-webinars.md | /webinars, /webinars/[slug] | Social & community | B7a | todo | — | — | — | — |  |
| 95 | 95-pods-hub.md | /groups | Social & community | B7a | todo | — | — | — | — |  |
| 96 | 96-health-data-view.md | /whoop | Life intelligence | B4 | todo | — | — | — | — |  |
| 97 | 97-plans-library.md | /plans | Today & missions | B3 | todo | — | — | — | — |  |
| 98 | 98-system-states.md | /offline, /maintenance, /forbidden, /unauthorized, /coming-soon | System & media | B7b | todo | — | — | — | — |  |
| 99 | 99-whatsapp-inbox.md | /whatsapp | CIA, voice & chat | B2 | todo | — | — | — | — |  |

## Batch log

| Batch | Screens | Opened | Closed | Verification | Notes |
|---|---|---|---|---|---|
| A | 10 (09,12,13,16,48,63,66,75,89,91) | 2026-07-07 | 2026-07-07 | npm run check PASS (prior session) | Baseline commit ff59f6f |
| P | 4 (03,07,26,28) | 2026-07-08 | 2026-07-08 | GLM drafts x4 OK; sonnet builds T1 green; trust+a11y reviews -> 10 findings, all fixed; npm run check PASS; console clean; screenshots reviewed | Commit 342af65. Chip gained interactive variant; TopBar title now ReactNode; VolumeBars key bug fixed |
| B1 | 12 (01,02,03b,03c,03d,03e,04,05,05b,06,08,65) | 2026-07-08 | 2026-07-08 | 12 digests + 12 GLM drafts (1 empty, rebuilt from spec) + 3 sonnet builders T1 green; trust 4 findings (pre-checked consent dark pattern, fabricated confidence, masked-email mismatch, missing provenance) + a11y 12 findings — ALL 16 fixed + re-verified; npm run check PASS; 12/12 screenshots clean consoles | Central registration by orchestrator (single family index). New local components: OTP cells, ConsentCheckbox/Toggle, ConstellationRadar, MilestoneTimeline, PrivacyFooter |
| B0 | 0 new (architecture) | 2026-07-08 | 2026-07-08 | npm run check PASS ×3; screenshot byte-diff pixel-identical on structural commit; canon-aligned shots reviewed | Commits 8bdc343 (kit+registry decomposition), c4a2aba (canon tokens), 5a06da7 (fonts/atmosphere/nav/glow). Evidence: screenshots/B0-baseline, B0-post-refactor, B0-canon-aligned. verify:copy gained inline-emphasis continuation rule. figma-tokens-map.json regen still owed. |

Batch sizes: A=10 · P=4 · B1=12 · B2=8 · B3=9 · B4=12 · B5a=9 · B5b=7 · B6=10 · B7a=9 · B7b=14 · total 104
