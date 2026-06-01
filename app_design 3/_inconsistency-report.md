# Cross-Batch Inconsistency Report

> Generated: 2026-05-20
> Updated: 2026-05-21
> Scope: All 67 screen drafts (43 original + 4 auth + 20 backend-gap), Batches 1-13
> Brand audit: Balencia Brand Guidelines v2.0 compliance pass

---

## Implementation-vs-Design Gaps (fixed 2026-05-21)

The following gaps were identified by comparing server/client implementation against the design documents. All have been resolved.

### New Screens Created

1. **[Screen 03b] OTP Verification — missing screen** — Server implements `POST /auth/verify-registration` (4-digit OTP) and `POST /auth/resend-registration-otp`, but no design document existed for this step. **Fixed**: Created `03b-otp-verification.md` — 4-digit auto-advance input boxes, 60s resend countdown, masked email display, shake animation on error.

2. **[Screen 03c] Consent — missing screen** — Server implements `POST /auth/consent` with 4 consent types (terms_of_service, privacy_policy required; email_marketing, whatsapp_coaching optional), but no design document existed. **Fixed**: Created `03c-consent.md` — checkboxes for required consents, toggles for optional, scrollable legal text modals.

3. **[Screen 03d] Complete Profile (Social Auth) — missing screen** — Server implements `POST /auth/complete-profile` with `completeSocialProfileSchema` requiring dateOfBirth and gender for users who sign up via Google/Apple OAuth (which doesn't provide these fields). No design document existed. **Fixed**: Created `03d-complete-profile.md` — DOB date picker + gender selector, same components as Sign Up.

4. **[Screen 03e] WhatsApp Enrollment — missing screen** — Server implements `POST /auth/whatsapp/enroll`, `POST /auth/whatsapp/verify`, and `POST /auth/whatsapp/skip` for optional WhatsApp coaching channel setup during onboarding. No design document existed. **Fixed**: Created `03e-whatsapp-enrollment.md` — two-phase flow (phone entry → 6-digit SMS verification) with skip option.

### Existing Screens Updated

5. **[Screen 03] Sign Up — missing registration fields** — Server `registerSchema` requires: firstName, lastName (separate fields, 2-50 chars each), dateOfBirth (must be 18+), gender (male/female/non_binary/prefer_not_to_say). Design doc only had a single "name" field and no DOB or gender. **Fixed**: Updated `03-welcome-sign-up.md` — split name into first/last side-by-side row, added Date of Birth Field (native date picker, year range current-100 to current-18), added Gender Selector (bottom sheet with 4 options), added disposable email validation error, updated navigation to point to OTP [03b] instead of SIA Onboarding [07].

6. **[Screen 04] Sign In — missing Remember Me toggle** — Server `loginSchema` accepts a `rememberMe` boolean that extends session duration. Design doc had no such control. **Fixed**: Updated `04-sign-in.md` — added Remember Me Toggle component (34x20pt switch, full-width row between Forgot Password link and CTA), updated API data source to `POST /auth/login` with `rememberMe`.

7. **[Screen 07] SIA Onboarding — incorrect navigation and incomplete stages** — Design doc showed arrival from Sign Up [03] directly; actual flow is Sign Up → OTP [03b] → Consent [03c] → (optional WhatsApp [03e]) → SIA Onboarding [07]. Also only documented 6 conversation stages; server implements 7 stages matching 7 `onboarding_status` transitions. **Fixed**: Updated `07-sia-onboarding-conversation.md` — corrected arrival flow, expanded to 7 stages (greeting → quick assessment → domain discovery → goal setting → integration prompt → preferences quick-set → transition), updated progress indicator from 5 to 7 dots.

8. **[Screen 21] Settings — incomplete preferences** — Design doc had minimal SIA preferences (2 rows), basic notifications (3 toggles), no locale settings, incomplete privacy controls. Server implements: 4 coaching style options, 3 coaching intensity levels, AI persona, formality, emoji usage, encouragement level, check-in times/frequency; notification channels (push/email/WhatsApp/SMS), quiet hours; units (kg/lbs, km/mi, C/F), time/date format; health profile visibility with 4 levels, data retention, background sync. **Fixed**: Updated `21-settings.md` — expanded SIA Preferences to 8 rows, Notifications to 6 toggles + quiet hours + channel config, added Appearance & Locale section, expanded Privacy to match server capabilities.

9. **[Screen 22] Connected Services — incomplete provider list** — Design doc only listed 4 providers. Server `integration_provider` enum defines 11: whoop, apple_health, fitbit, garmin, oura, samsung_health, strava, myfitnesspal, nutritionix, cronometer, spotify. **Fixed**: Updated `22-connected-services.md` — expanded to all 11 providers organized in 3 sections (Wearables & Fitness: 7, Nutrition: 3, Lifestyle: 1), added Integration Provider Reference table with data types and sync methods.

10. **[Screen 28] Nutrition Dashboard — missing Quick Actions** — Server supports shopping lists, recipe management, and trend analysis for nutrition, but design doc had no quick-action entry points. **Fixed**: Updated `28-nutrition-diet-dashboard.md` — added Quick Actions Bar with 3 cards (Shopping list, Recipes, Trends), renumbered component stack.

---

## Backend-vs-Design Gaps — Batch 2 (fixed 2026-05-21)

The following gaps were identified by cross-referencing 100 backend route files, 151 database tables, 93 controllers, and 150+ services against the 47 existing design documents. All have been resolved.

### New Screens Created (20)

11. **[Screen 44] Water Intake Tracker — missing screen** — Server implements `water_intake` table with `POST /api/water/log`, `GET /api/water/daily`, `GET /api/water/weekly` endpoints, hydration goals, and cup-size presets. No design document existed. **Fixed**: Created `44-water-intake.md` — progress ring, quick-add buttons (150ml/250ml/500ml/custom), weekly bar chart, daily stats.

12. **[Screen 45] Daily Check-in — missing screen** — Server implements `daily_checkins` table with mood, energy, stress sliders, daily intention, and gratitude prompts via `POST /api/checkins`, `GET /api/checkins/today`. No design document existed. **Fixed**: Created `45-daily-checkin.md` — mood emoji selector, energy/stress sliders, intention text input, gratitude prompts, morning/evening variants.

13. **[Screen 46] Accountability Partners — missing screen** — Server implements `accountability_partners`, `accountability_contracts`, `accountability_triggers` tables with partner invitation, contract management, and AI intervention endpoints. No design document existed. **Fixed**: Created `46-accountability.md` — 3-tab layout (partners/contracts/triggers), consent management, SIA-triggered interventions.

14. **[Screen 47] Competitions — missing screen** — Server implements `competitions`, `competition_participants`, `competition_leaderboards` tables with browsing, joining, live leaderboards, and chat endpoints. No design document existed. **Fixed**: Created `47-competitions.md` — competition cards, join flow, live leaderboard, competition chat, AI-generated challenges.

15. **[Screen 48] Intelligence Dashboard — missing screen** — Server implements `daily_analysis_reports`, `cross_pillar_contradictions`, `user_correlations`, `user_predictions` tables with AI insights, composite scores, contradiction detection, and predictive analytics. No design document existed. **Fixed**: Created `48-intelligence-dashboard.md` — daily score hero, contradictions cards, correlations, best day formula, predictions timeline.

16. **[Screen 49] Progress Photos — missing screen** — Server implements `progress_photos`, `body_measurements` tables with photo upload, weight trend, measurement tracking, and AI body composition analysis. No design document existed. **Fixed**: Created `49-progress-photos.md` — weight trend chart, measurements grid, photo timeline, side-by-side comparison, AI analysis.

17. **[Screen 50] Profile Edit — missing screen** — Server implements `PUT /api/users/profile`, `POST /api/users/avatar`, `DELETE /api/users/account` with avatar upload, name/DOB/gender/phone/timezone editing. No design document existed. **Fixed**: Created `50-profile-edit.md` — avatar upload with crop, field editing, timezone picker, delete account flow.

18. **[Screen 51] Voice Call History — missing screen** — Server implements `voice_calls`, `voice_call_summaries`, `voice_call_action_items` tables with call scheduling, AI transcription summaries, and extracted action items. No design document existed. **Fixed**: Created `51-voice-call-history.md` — call history list, scheduling, AI summaries, action item extraction.

19. **[Screen 52] Stress Management — missing screen** — Server implements `stress_logs`, `stress_triggers`, `mental_recovery_scores` tables with composite stress scoring, trigger analysis, and relief tool recommendations. No design document existed. **Fixed**: Created `52-stress-management.md` — composite stress gauge, trigger analysis, mental recovery score, relief tool links.

20. **[Screen 53] Breathing Exercises — missing screen** — Server implements `breathing_sessions` table with 5 technique presets (box, 4-7-8, coherent, alternate nostril, energizing), session logging, and post-session rating. No design document existed. **Fixed**: Created `53-breathing-exercises.md` — technique cards, animated breathing circle, session timer, post-session rating.

21. **[Screen 54] Meditation / Mindfulness — missing screen** — Server implements `meditation_sessions`, `mindfulness_practices` tables with practice library, guided sessions, timer mode, and mindfulness streak. No design document existed. **Fixed**: Created `54-meditation-mindfulness.md` — practice library, SIA recommendations, active session timer, mindfulness streak.

22. **[Screen 55] Yoga Sessions — missing screen** — Server implements `yoga_sessions`, `yoga_poses` tables with session library, pose database, YouTube integration, difficulty filters, and yoga streak. No design document existed. **Fixed**: Created `55-yoga-sessions.md` — browse/active/post-session views, pose library grid, session timer, streak banner.

23. **[Screen 56] Recipes Browser — missing screen** — Server implements `user_recipes` table with recipe CRUD, search/filter, AI suggestions, nutritional analysis, and diet plan integration. No design document existed. **Fixed**: Created `56-recipes.md` — recipe grid, search/filter, AI suggestions, recipe detail with macros, create recipe modal.

24. **[Screen 57] Shopping List — missing screen** — Server implements `shopping_lists`, `shopping_list_items` tables with auto-generation from diet plans, category grouping, recipe linking, and list sharing. No design document existed. **Fixed**: Created `57-shopping-list.md` — category-grouped items, auto-generated from diet plans, recipe links, share list.

25. **[Screen 58] Sleep Tracking — missing screen** — Server implements `sleep_logs` table with manual logging, wearable sync (via `daily_health_metrics`), trend charts, bedtime consistency, and SIA sleep coaching. No design document existed. **Fixed**: Created `58-sleep-tracking.md` — last night summary, trend charts, bedtime consistency, quality trends, manual log bottom sheet.

26. **[Screen 59] Streak Details — missing screen** — Server implements `GET /api/streaks/status`, `/history`, `/calendar`, `/leaderboard`, `/rewards`, `POST /api/streaks/freeze` with streak management, XP multiplier tiers, freeze system, and milestone rewards. No design document existed. **Fixed**: Created `59-streak-details.md` — streak hero, calendar heatmap, XP multiplier card, freeze management, milestones, streak leaderboard.

27. **[Screen 60] Medication Tracking — missing screen** — Server implements `user_medications`, `medication_doses` tables with medication management, dosage tracking, adherence calendar, interaction warnings, and reminder scheduling. No design document existed. **Fixed**: Created `60-medication-tracking.md` — medication checklist, adherence heatmap, interaction warnings, add medication modal.

28. **[Screen 61] Reminders & Tasks — missing screen** — Server implements `user_reminders`, `user_tasks` tables with task management, recurring schedules, multi-channel notifications (push/email/SMS/WhatsApp), and SIA smart suggestions. No design document existed. **Fixed**: Created `61-reminders-tasks.md` — task list, reminder toggles, smart suggestions, task/reminder detail modals.

29. **[Screen 62] Quick Notes — missing screen** — Server implements `quick_notes` table with CRUD endpoints, auto-tagging, search, SIA integration for signal ingestion, and offline sync. No design document existed. **Fixed**: Created `62-quick-notes.md` — bottom sheet + full-screen modes, quick add bar, tag filters, swipe actions, undo toast.

30. **[Screen 63] Energy Tracking — missing screen** — Server implements `energy_logs` table with energy level logging, context tagging, timeline visualization, peak hours analysis, chronotype detection, and cross-domain correlations. No design document existed. **Fixed**: Created `63-energy-tracking.md` — energy slider, context tags, timeline sparkline, trend chart, peak hours, chronotype badge, correlations.

### Existing Screens Updated (6)

31. **[Screen 34] Spirituality Dashboard — missing Prayer Schedule** — Server implements `prayer_times` table with location-based prayer time calculation, multiple calculation methods (Muslim World League, ISNA, Egypt, Umm al-Qura, etc.), and per-prayer notification toggles. Design doc had no prayer schedule component. **Fixed**: Updated `34-spirituality-dashboard.md` — added Prayer Schedule Card with location-based times, calculation method selector, per-prayer notification toggles, adaptive content for Muslim/Jewish/Christian/Other.

32. **[Screen 37] Journal — missing Voice Journaling and Check-in Integration** — Server implements `POST /api/journal/voice` with AssemblyAI transcription, and `daily_checkins` integration. Design doc had no voice recording mode or check-in toggle. **Fixed**: Updated `37-journal.md` — added Mode Toggle (entries/check-ins), Voice Entry Indicator, Voice Recording Mode bottom sheet with waveform visualization, FAB long-press gesture for voice recording.

33. **[Screen 39] Leaderboard — missing Competition Integration** — Server implements competition leaderboards with per-competition standings, status badges, and country filtering. Design doc had only global leaderboard. **Fixed**: Updated `39-leaderboard.md` — added Leaderboard Type Tabs (global/competitions/country), Competition Leaderboard Card with mini-leaderboards per joined competition.

34. **[Screen 41] Schedule / Calendar — missing Sync Status and Templates** — Server implements `GET /api/calendar/sync/status` for real-time sync state, and `GET /api/schedule/templates` for pre-built daily routine templates. Design doc had no sync indicator or template system. **Fixed**: Updated `41-schedule-calendar.md` — added Sync Status Indicator (synced/syncing/error states in header), Schedule Templates Section (horizontal-scroll routine cards with apply-to-day flow).

35. **[Screen 19] RPG Character — missing Streak Freeze/Rewards** — Server implements streak freeze system (`POST /api/streaks/freeze`), XP multiplier tiers, and achievement badge rewards. Design doc only showed streak count in stats row with no detail. **Fixed**: Updated `19-rpg-character-screen.md` — added Streak & Rewards Section with flame icon, XP multiplier badge, freeze count/indicator, recent achievement badges, link to Streak Details [59].

36. **[Screen 17] Me Main — missing Profile Photo Upload and New Screen Links** — Server implements avatar upload via `POST /api/users/avatar`, progress photos, and streak management. Design doc had no camera overlay on avatar, and quick links grid didn't include Progress Photos [49], Streak Details [59], or Profile Edit [50]. **Fixed**: Updated `17-me-main.md` — added camera overlay on avatar, expanded quick links grid from 2x3 to 2x4 (added Progress Photos and Streaks cards), updated avatar tap to navigate to Profile Edit [50].

---

## Critical (fixed during consolidation)

1. **[Screen 12] Missing navigation link to Screen 16** — Screen 16 (Life Areas Overview) listed Screen 12 as an origin, but Screen 12 did not list Screen 16 as a destination. **Fixed**: Added `Life Areas Overview [16] via stack push` to Screen 12's cross-references.

2. **[Screens 26-29] Tab bar height 48pt instead of 56pt** — All four Batch 6 screens specified "48pt + 34pt safe area" for the tab bar, while the standardized height is 56pt. **Fixed**: Updated all references to "56pt + 34pt safe area".

3. **[Screen 12] Domain Tag Chip radius 999pt instead of 10pt** — Screen 12 used `999pt radius` for Domain Tag Chip while canonical definition (Screen 08) uses `--r-sm (10pt)`. **Fixed**: Updated to `--r-sm, 10pt radius`.

4. **[Screen 08] Domain Tag Chip opacity 20% instead of 15%** — Screen 08's tag chip bg used `domain color at 20%`, while Screens 12, 37, and majority use `15%`. **Fixed**: Updated to 15%.

5. **[Screen 06] Section Eyebrow Label opacity 50% instead of 40%** — Screen 06 used `white at 50%` while all other screens (12, 30-38) use `white at 40%`. **Fixed**: Updated to 40% in both visual treatment and color map table.

6. **[Screen 12] SIA Coaching Note Card left border 4pt instead of 3pt** — Screen 12 used `4pt wide, 60% opacity` while all other screens (14, 16, 30-34) use `3pt`. **Fixed**: Updated to 3pt.

7. **[Screen 01] Auth branching condition undocumented** — Screen 01 said "auto-advances to [02] or [12]" without specifying the condition. **Fixed**: Added explicit conditions (first launch/no session → Screen 02; returning user with valid session → Screen 12).

8. **[Screen 35] False pattern establishment claim** — Screen 35 claimed to establish the Domain Dashboard Template (already established by Screen 26, Batch 6). **Fixed**: Changed to "follows the Domain Dashboard Template established by Screen 26". Moved Domain Header, SIA Coaching Note Card, and FAB from "Patterns established" to "Patterns referenced".

9. **[Screen 30] False pattern establishment claim** — Screen 30 claimed to establish Domain Dashboard Header and SIA Coaching Note Card (established by Screen 26). **Fixed**: Moved to "Patterns referenced" section.

10. **[28 screens] Horizontal margins 24pt instead of 16pt** — 28 product screens used 24pt per side (48pt total) instead of the standardized 16pt per side (32pt total). **Fixed**: All 120+ margin references updated. Auth screens (01-05) correctly kept at 24pt.

---

## Brand Guidelines v2.0 Compliance Audit (fixed 2026-05-21)

Systematic audit of all 67 screen design documents against `Balencia-Brand-Guidelines-v2.md`. The authoritative `_shared-patterns.md` was updated first, then all screen files were brought into compliance.

### Token-Level Corrections Applied to `_shared-patterns.md`

| Token / Value | Old (pre-audit) | New (brand-compliant) | Brand Guidelines Reference |
|---|---|---|---|
| `--shadow-1` | `0 2pt 8pt rgba(33,16,8, 0.2)` | `0 8pt 24pt rgba(33,16,8, 0.18)` | §6.5 Elevation & Shadow |
| `--shadow-2` | `0 4pt 16pt rgba(33,16,8, 0.3)` | `0 18pt 48pt rgba(33,16,8, 0.22)` | §6.5 Elevation & Shadow |
| `--shadow-3` | _(did not exist)_ | `0 32pt 72pt rgba(33,16,8, 0.28)` | §6.5 Elevation & Shadow |
| `--glow-orange` | _(did not exist)_ | `0 0 24pt rgba(255,94,0, 0.35)` | §6.5 Glow Effects |
| `--glow-green` | _(did not exist)_ | `0 0 24pt rgba(52,168,83, 0.30)` | §6.5 Glow Effects |
| `--glow-purple` | _(did not exist)_ | `0 0 24pt rgba(127,36,255, 0.30)` | §6.5 Glow Effects |
| `--r-xs` | _(did not exist)_ | `6pt` | §6.3 Corner Radius |
| `--r-lg` | `16-20pt` | `20pt` | §6.3 Corner Radius |
| Card radius rule | Primary cards = `--r-md (14pt)` | Primary cards = `--r-xl (28pt)` | §6.3 Card Radius |
| Card padding (standard) | `16pt` | `24pt` | §6.4 Spacing |
| Card padding (hero) | _(unspecified)_ | `32pt` | §6.4 Spacing |
| Disabled state opacity | `0.5 (50%)` | `0.4 (40%)` | §6.7 Interaction States |
| `--ease-out-soft` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | §6.8 Motion |
| `--ease-flow` | `cubic-bezier(0.4, 0, 0.2, 1)` | `cubic-bezier(0.65, 0.05, 0.36, 1)` | §6.8 Motion |
| `--ease-in-out` | _(did not exist)_ | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | §6.8 Motion |
| Section Eyebrow Label | `11pt Sora Semibold` | `12pt Sora Semibold` | §5.3 Typography Scale |
| Spacing scale `--s-1` to `--s-10` | _(did not exist)_ | `4/8/12/16/20/24/32/40/48/64pt` | §6.4 Spacing |
| Stroke width tokens | _(did not exist)_ | `--stroke-thin: 1pt`, `--stroke-medium: 1.5pt`, `--stroke-thick: 2pt` | §6.6 Borders |
| Gradient tokens | _(did not exist)_ | `--grad-brand`, `--grad-warm`, `--grad-cool` | §6.9 Gradients |

### Screen-Level Changes (217 edits across 54 files)

Three categories of changes were applied to individual screen files:

**Change 1 — Disabled state opacity: `0.5` → `0.4`**

| Batch | Files Changed | Edit Count |
|---|---|---|
| Screens 01-08 | 03, 03b, 03d, 03e | 7 |
| Screens 09-19 | 12, 16, 17, 18, 19 | 12 |
| Screens 20-31 | 20, 21, 22, 25, 26, 27, 28, 29, 30, 31 | 23 |
| Screens 32-43 | 32, 33, 34, 35, 38, 41, 42, 43 | 19 |
| Screens 44-63 | 44, 46, 49, 50, 51, 53, 54, 55, 56, 59, 60, 61, 63 | 29 |
| **Total** | **40 files** | **90 edits** |

**Change 2 — Section eyebrow labels: `11pt` → `12pt`**

| Batch | Files Changed | Edit Count |
|---|---|---|
| Screens 01-08 | 03c, 06 | 5 |
| Screens 09-19 | 09, 12 | 4 |
| Screens 20-31 | 23, 28, 30, 31 | 4 |
| Screens 32-43 | 34, 35, 38, 40, 41, 43 | 9 |
| Screens 44-63 | 44, 45, 46, 47, 49, 51, 52, 55, 59, 60, 62, 63 | 31 |
| **Total** | **24 files** | **53 edits** |

Preserved at `11pt`: domain tag chip text, status badge chips, inline badge labels, unread count badges, role/permission indicators, priority chips, wearable sync badges — these are not section eyebrow labels.

**Change 3 — Primary card radius: `--r-md (14pt)` → `--r-xl (28pt)` with padding `16pt` → `24pt`**

| Batch | Files Changed | Edit Count |
|---|---|---|
| Screens 01-08 | _(none — inputs/OTP boxes only)_ | 0 |
| Screens 09-19 | 12, 13, 14, 15, 16 | 15 |
| Screens 20-31 | 26, 28, 29 | 5 |
| Screens 32-43 | _(none — existing cards already compliant)_ | 0 |
| Screens 44-63 | 44, 45, 46, 47, 48, 49, 51, 52, 54, 55, 56, 58, 60, 61, 63 | 39 |
| **Total** | **20 files** | **59 edits** |

Preserved at `--r-md (14pt)`: input fields, search bars, stat tiles (3-column grids ≤72pt wide), OTP boxes, photo thumbnails, date pills, small grid cards, list container rows. Preserved at `--r-lg (20pt)`: bottom sheet modals, quick actions menus.

### Files Requiring No Changes (13)

01, 02, 04, 05, 10, 11, 24, 36, 37, 39, 57 — already brand-compliant or had no applicable token instances.

### Note on Minor Item #3 (now resolved)

Previously documented: "[Screen 26] Eyebrow labels use 12pt instead of 11pt". The brand guidelines confirm `12pt` is correct for section eyebrow labels. This is no longer an inconsistency — it was ahead of the other screens. All screens now use `12pt`.

---

## Minor (fix during implementation)

1. **[Screen 26] "Start workout" CTA is 48pt instead of 56pt** — All Brand CTA Buttons are 56pt, but the in-card CTA on Screen 26 is 48pt. Documented as an intentional "In-Card CTA" variant (see `_shared-patterns.md`).

2. **[Screen 37] SIA prompt text is 17pt instead of 15pt** — Journal's SIA Reflection Prompt uses 17pt (vs 15pt on other SIA Coaching Note Cards). Documented as intentional — the prompt is the screen's primary content and emotional hook.

3. **[Screen 26] Eyebrow labels use 12pt instead of 11pt** — Domain-colored eyebrows on Screen 26 use 12pt Sora Semibold with domain color. Documented as an intentional domain dashboard variant in `_shared-patterns.md`.

4. **[Screen 34] Spirituality domain color (#A855F7) proximity to SIA purple (#7F24FF)** — Both purples appear on Screen 34 simultaneously. Documented with mitigation: SIA always has avatar indicator; domain color only on accent lines/tag chips.

5. **[Screen 10] Is a UI mode, not a separate screen** — Screen 10 (SIA Voice In-Chat) is described as "a UI state change within Screen 09, not a stack push". Has its own file for spec completeness, but navigation model should note this is a mode toggle.

6. **[Screen 41] Dual tab ownership** — Schedule/Calendar can exist in both the Today tab stack (from Home) and Me tab stack (from Explore). Should be handled as a shared screen in React Navigation.

7. **[Screen 03 → 06] Missing reverse navigation link** — Screen 03 lists navigation to Screen 06 (guest mode), but Screen 06's "Arrives from" may not list Screen 03. Minor since the link is documented on one side.

8. **[Screen 22] Connect button at 36pt height** — Below 44pt minimum touch target. Button padding should ensure the touch area expands to at least 44pt during implementation.

9. **[Screens 35-36] Domain Header height 88pt vs 56pt on Screens 26-34** — Screens 35-36 use a collapsible large-title header (88pt expanded, 48pt collapsed). This is an evolution, not a conflict. Document which variant should be the standard going forward.

10. **[Screen 42] Confetti uses amber/gold (#F59E0B)** — Same hex as Creativity domain color. Acceptable as celebration palette, not domain identification.

---

## Suggestions (non-blocking)

1. **Wellbeing (#14B8A6) and Finance (#10B981) color proximity** — These teal/emerald shades are close in hue. Consider accessibility testing for colorblind users. No action needed now.

2. **Screen 40 (Community) has no SIA presence** — Not listed as an intentional exception (unlike Screens 19, 23, 38, 39). Consider adding to the exception list or adding a subtle SIA coaching note about social engagement.

3. **Screen 06 domain chips use 20% opacity for selected state** — Different from Domain Tag Chip's 15% opacity. These are different components (interactive picker vs. display tag), so no conflict, but worth noting the distinction during implementation.

---

## Post-Audit Fixes (2026-05-21, Phase 2)

The following issues were identified by a comprehensive design spec audit and resolved:

### Critical Fixes

1. **[Screen 03e] Missing file** — `03e-whatsapp-enrollment.md` was referenced in `_progress.md` and `_inconsistency-report.md` as "done" and "created", but the file did not exist (66 screen files instead of 73). **Fixed**: Created `03e-whatsapp-enrollment.md` — two-phase flow (phone entry + 6-digit SMS verification), skip option, value preview list. Follows auth screen template with box-drawing wireframes.

2. **[Design Direction] Spirituality color #8b5cf6 vs #A855F7** — `Balencia-Design-Direction.md` line 119 and `Balencia-UIUX-Compiled-Final.md` line 960 used `#8b5cf6`, while `_shared-patterns.md` and all 10+ screen files used `#A855F7`. **Fixed**: Updated both documents to `#A855F7` to match the already-audited shared patterns.

3. **[Design Direction] Logo font "Chillax" vs "Monda"** — `Balencia-Design-Direction.md` line 146 referenced "Chillax" as the logo font. Brand guidelines in `Balencia-Creatives-Reference/` confirm "Monda" (Chillax was from a previous design iteration). **Fixed**: Updated to "Monda".

### Structural Fixes

4. **[46 files] Screen count metadata stale** — 46 files said "of 43", 20 files said "of 63". Correct total is 67 screens. **Fixed**: All screen files updated to "of 73". Session prompt template updated.

5. **[9 files] Numbered section headings** — Files 49, 50, 51, 52, 55, 56, 57, 58, 60 used `## 1. Purpose` instead of `## Purpose`. **Fixed**: Numbers removed from all 9 files.

6. **[Screen 18] Explore missing links to screens 44-63** — Explore had zero references to any of the 20 new screens, despite all new screens listing Explore as an entry point. **Fixed**: Updated domain sections (added 8 Wellbeing features, 2 Nutrition features, Progress Photos under Fitness), standalone features (added 7 new entries: Daily check-in, Accountability, Competitions, Intelligence dashboard, Streaks, Reminders, Quick notes), and cross-references.

7. **[Screen 12] Home missing deep-link targets for screens 44-63** — Today's Actions cards could deep-link to any screen, but no documentation covered screens 44-63 as targets. **Fixed**: Added deep-link targets subsection to navigation docs and updated cross-references.

8. **[Screen 21] Light mode toggle** — Settings screen showed a light/dark/system theme toggle, but zero screens provided light mode color mappings. **Fixed**: Theme row updated to "dark only (V1)" with note that light mode is deferred to V2.

### Known Remaining Gaps (documented for implementation phase)

- ~~`_shared-patterns.md` needs consolidation of ~149 new patterns from screens 44-63~~ **RESOLVED 2026-05-21**: Consolidated ~185 patterns from screens 44-69 into `_shared-patterns.md` (1,605 → 3,351 lines, ~335 total patterns)
- ~~15 of 20 new screens lack free/premium tier boundary documentation~~ **RESOLVED 2026-05-21**: Created `_tier-matrix.md` and added tier boundary sentences to all 20 screen Purpose sections
- ~~No central XP reward table exists~~ **RESOLVED 2026-05-21**: Created `_xp-reward-table.md` with action XP, streak milestones, multipliers, competition prizes, display rules
- ~~Missing critical screens: Report/Flag, Force Update, Notification Permission, Image Viewer, Universal Search, App Rating~~ **RESOLVED 2026-05-21**: Created screens 64-69 (6 new screen specs), total now 73 screens
- ~~Error/offline state coverage uneven across screens~~ **PARTIALLY RESOLVED 2026-05-21**: Added Error Handling sections to screens 36, 38, 40. Original screens 01-35 still lack Error Handling sections (deferred to implementation phase).
- Accessibility documentation shallow (no focus order, screen reader labels, reduce-motion alternatives)
- Tablet/iPad layout not addressed
- ~~13 files had ASCII wireframes being converted to box-drawing characters (in progress)~~ **RESOLVED** (prior audit phase)

---

## Post-Audit Fixes (2026-05-25, Screen Registry Gap)

1. **[Screens 74-85] Production screen registry routes missing from `app_design 3`** — Compared `balencia-screens/src/data/screens.ts` against the numbered markdown files. The missing set was exactly 12 registered routes: Conversations Hub [74], Direct Chat [75], Group Chat [76], Message Actions [77], Reports Center [78], Call Summary [79], Music Coach [80], Video Library [81], Accountability Contract [82], Social Buddy Profile [83], Data Sources [84], and Obstacle Coach [85]. **Fixed**: Created all 12 screen specs, updated `_progress.md` to 90 / 90 design docs, and added lightweight shared patterns for conversation rows/messages, signal/privacy pills, report/source rows, media recommendation cards, and accountability/obstacle diagnosis cards.
