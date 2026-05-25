# Screen Draft Progress

Last updated: 2026-05-21
Completed: 44 / 44 (43 original + 1 new)
Current batch: — (all complete)

## Final Audit & Quality Pass (2026-05-21)

28 fixes applied across 18 files based on comprehensive audit of all 44 screens:

### Batch A — Critical (11 fixes)
- **_shared-patterns.md**: Added Rich Inline Cards section (6 card types with ASCII wireframes, measurements, tap behavior for SIA Chat [09])
- **_shared-patterns.md**: Added Domain Picker component (bottom sheet, 2-column grid, multi-select, animation, VoiceOver)
- **_shared-patterns.md**: Added Motivation Tier Detection Logic (signals, weights, thresholds, transition rules, override option)
- **Screen 11**: Added measurable Avatar State Specifications (3D state table with head tilt/eye gaze/mouth/scale/glow + 2D fallback state table, transition timings)
- **Screen 07**: Added fallback navigation flow diagram (templated plans, async SIA catch-up), back button with confirmation dialog, reduced motion alternative for visual brainstorming
- **Screen 08**: Added complete Edit Mode specification (save/cancel, validation rules, preview checkbox treatment, inline editing, drag-to-reorder)
- **Screen 19**: Resolved Reward Card edit conflict — standardized on tap-to-edit inline model, removed swipe-to-edit
- **Screen 12**: Added Action Card expanded state (SIA reasoning, "ask SIA more" link, single-expand constraint, animation)
- **Screens 09, 10, 11**: Removed all stale "not yet drafted" references, replaced with concrete cross-references
- **Screen 06**: Added Demo Data Indicator (per-card "demo" badge + persistent "exploring with sample data" context line)
- **Screen 34**: Added Location Permission Flow (pre-education card, GPS handling, manual city fallback, timezone auto-detection)

### Batch B — Design System & UX (8 fixes)
- **_shared-patterns.md**: Added Domain Dashboard Rules (header accent line width rule, header height standard vs exception, FAB presence/absence table)
- **_shared-patterns.md**: Added Typography Size Resolution rules (lower vs upper value guidance for all size ranges)
- **Screens 32, 33**: Added pull-to-refresh to motion tables (Screen 28 already had it)
- **Screen 17**: Promoted SIA from 1-line insight to dedicated SIA Weekly Insight Card; added stats row navigation affordance (chevron + VoiceOver)
- **Screen 38**: Added Habit List Edit Mode (entry via "edit" link, drag handles, delete flow with undo toast, exit behavior)
- **Screen 41**: Added Drag-to-Schedule Ghost Placeholder (semi-transparent preview, dashed border, domain color tint, 15-min snapping)
- **Screen 34**: Added Practice Customization (SIA conversational path + inline long-press edit mode + Add Practice bottom sheet + belief system templates)

### Batch C — Polish (9 fixes)
- **Screen 40**: Moved V2 features to dedicated deferred section; completed Group Challenge Card expanded state spec
- **Screen 24**: Added Notification Type → Target Screen mapping table (15 notification types with target screens and context)
- **Screen 44**: Added Search Result Ranking (composite score: exact match 50%, recency 30%, engagement 20%) and Search Performance Strategy (client-side vs API thresholds, debounce, case-insensitive matching)
- **Screen 36**: Added Inspiration Prompt dismiss lifecycle (daily refresh, frequency adaptation, "show fewer" after repeated dismisses)
- **Screen 29**: Clarified barcode scan flow — explicit "scan is search shortcut, not auto-add" with step-by-step confirmation flow
- **Screen 33**: Specified Add Person relationship label chips (single-select, 5 options, horizontal wrap, "other" reveals text input)

## Competitor-Informed Review Pass (2026-05-20)

16 improvements applied across 18 files based on competitor analysis (Bevel, Habitica, ChatGPT):

### Tier 1 — Critical
- **Screen 07**: Added fallback onboarding path (3-step visual flow if SIA is slow/unavailable), enhanced progress bar, cold-start loading state, time expectation, reduced-motion accessibility
- **Screen 44**: NEW — Global Search overlay (search goals, SIA chats, journal, habits, wiki + "Ask SIA" fallback)
- **_shared-patterns.md**: Added SIA Offline & Degradation States (cached greetings, coaching note caching, offline chat queuing, offline logging)
- **Screen 21**: Added Notification Preferences section (master toggle, daily digest, quiet hours, per-category/per-domain toggles, motivation-adaptive frequency cap, pre-permission education note)

### Tier 2 — High-Impact
- **Screen 12**: Reduced from 7 sections → 4 (removed Activity Feed, merged Schedule into Action Cards, merged Insight Card into SIA Greeting, added search icon)
- **Screen 17**: Reduced quick links from 6 → 4 (2x2 grid), promoted Explore preview above links, added SIA weekly insight to profile, consolidated settings sub-screens
- **Screens 26, 28, 30, 34, 35, 36**: Added domain-specific Hero Insights (activity ring, macro donut, net position, practice streak, active learning, active projects) — score first, SIA interpretation second
- **Screen 19**: Added User-Defined Rewards (Reward Card + Add Reward Sheet — bridges RPG currency to real-world rewards)
- **Screen 40**: Added SIA Community Coaching Note + Group Challenge Cards (collaborative timed challenges with shared progress bar, no punishment mechanics)
- **_shared-patterns.md**: Added comprehensive Accessibility Patterns (VoiceOver labels, Dynamic Type, Reduced Motion fallbacks for 150+ animations, High Contrast, Color Blindness accommodations, Touch Target audit)

### Tier 3 — Polish & Differentiation
- **_shared-patterns.md**: Added Micro-Delight Moments (domain completion glow, streak milestone pulse, SIA personality moments, progress ring shimmer, chart data point touch)
- **Screens 33, 34, 35, 36**: Added Quick-Log sheets (quality time, practice, session, study) with unified FAB behavior across all domains
- **Screen 06**: Added Mini SIA Conversation (3-exchange guest preview before sign-up)
- **Screens 26, 28, 30, 34**: Added domain-specific Day 1 empty states with SIA-driven onboarding, em-dash stats, suggestion chips
- **_shared-patterns.md**: Added Domain Dashboard Day 1 General Rules (em-dash for empty stats, chart frames without data, SIA discovery questions)
- **Screen 02**: Reordered carousel panels (lead with "Everything connects" differentiator), added CTA to every panel, added 4-second auto-advance
- **Screen 43**: Added Social Proof Strip (user count, ratings, value comparisons by trigger context)

| # | Screen | File | Status | Batch | Date Completed |
|---|--------|------|--------|-------|----------------|
| 01 | Splash Screen | 01-splash-screen.md | done | 1 | 2026-05-20 |
| 02 | Motion Carousel | 02-motion-carousel.md | done | 1 | 2026-05-20 |
| 03 | Welcome / Sign Up | 03-welcome-sign-up.md | done | 1 | 2026-05-20 |
| 04 | Sign In | 04-sign-in.md | done | 1 | 2026-05-20 |
| 05 | Forgot Password | 05-forgot-password.md | done | 1 | 2026-05-20 |
| 06 | Guest Mode Preview | 06-guest-mode-preview.md | done | 2 | 2026-05-20 |
| 07 | SIA Onboarding Conversation | 07-sia-onboarding-conversation.md | done | 2 | 2026-05-20 |
| 08 | Initial Plan Summary | 08-initial-plan-summary.md | done | 2 | 2026-05-20 |
| 09 | SIA Chat | 09-sia-chat.md | done | 2 | 2026-05-20 |
| 10 | SIA Voice Mode (In-Chat) | 10-sia-voice-in-chat.md | done | 2 | 2026-05-20 |
| 11 | SIA Voice Mode (Full-Screen) | 11-sia-voice-full-screen.md | done | 3 | 2026-05-20 |
| 12 | Home Screen | 12-home-screen.md | done | 3 | 2026-05-20 |
| 13 | Goals List | 13-goals-list.md | done | 3 | 2026-05-20 |
| 14 | Goal Detail | 14-goal-detail.md | done | 3 | 2026-05-20 |
| 15 | Create / Edit Goal | 15-create-edit-goal.md | done | 3 | 2026-05-20 |
| 16 | Life Areas Overview | 16-life-areas-overview.md | done | 4 | 2026-05-20 |
| 17 | Me Main | 17-me-main.md | done | 4 | 2026-05-20 |
| 18 | Explore Section | 18-explore-section.md | done | 4 | 2026-05-20 |
| 19 | RPG Character Screen | 19-rpg-character-screen.md | done | 4 | 2026-05-20 |
| 20 | Personal Wiki / SIA Memory | 20-personal-wiki-sia-memory.md | done | 4 | 2026-05-20 |
| 21 | Settings | 21-settings.md | done | 5 | 2026-05-20 |
| 22 | Connected Services | 22-connected-services.md | done | 5 | 2026-05-20 |
| 23 | Subscription & Billing | 23-subscription-billing.md | done | 5 | 2026-05-20 |
| 24 | Notification History | 24-notification-history.md | done | 5 | 2026-05-20 |
| 25 | Help Center | 25-help-center.md | done | 5 | 2026-05-20 |
| 26 | Fitness & Workouts Dashboard | 26-fitness-workouts-dashboard.md | done | 6 | 2026-05-20 |
| 27 | Workout Detail / Active Workout | 27-workout-detail-active-workout.md | done | 6 | 2026-05-20 |
| 28 | Nutrition & Diet Dashboard | 28-nutrition-diet-dashboard.md | done | 6 | 2026-05-20 |
| 29 | Meal Detail / Food Logger | 29-meal-detail-food-logger.md | done | 6 | 2026-05-20 |
| 30 | Finance / Money Map Dashboard | 30-finance-money-map-dashboard.md | done | 7 | 2026-05-20 |
| 31 | Transaction / Budget Detail | 31-transaction-budget-detail.md | done | 7 | 2026-05-20 |
| 32 | Career & Work Dashboard | 32-career-work-dashboard.md | done | 7 | 2026-05-20 |
| 33 | Relationships Dashboard | 33-relationships-dashboard.md | done | 7 | 2026-05-20 |
| 34 | Spirituality Dashboard | 34-spirituality-dashboard.md | done | 7 | 2026-05-20 |
| 35 | Learning & Growth Dashboard | 35-learning-growth-dashboard.md | done | 8 | 2026-05-20 |
| 36 | Creativity Dashboard | 36-creativity-dashboard.md | done | 8 | 2026-05-20 |
| 37 | Journal | 37-journal.md | done | 8 | 2026-05-20 |
| 38 | Habits | 38-habits.md | done | 8 | 2026-05-20 |
| 39 | Leaderboard | 39-leaderboard.md | done | 8 | 2026-05-20 |
| 40 | Community / Chat Rooms | 40-community-chat-rooms.md | done | 8 | 2026-05-20 |
| 41 | Schedule / Calendar | 41-schedule-calendar.md | done | 9 | 2026-05-20 |
| 42 | Celebration / Achievement Overlay | 42-celebration-achievement-overlay.md | done | 9 | 2026-05-20 |
| 43 | Paywall / Upgrade Prompt | 43-paywall-upgrade-prompt.md | done | 9 | 2026-05-20 |
| 44 | Global Search | 44-global-search.md | done | review | 2026-05-20 |
