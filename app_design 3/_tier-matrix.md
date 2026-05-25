# Premium / Free Tier Matrix

> Maps every feature surface to its subscription tier. Developers reference this document when implementing paywall gates, locked states, and upgrade prompts.
>
> Updated: 2026-05-21
> Canonical tier definitions: Screen [23] Subscription & Billing
> Tier boundary pattern: Screen [52] Stress Management (inline Purpose + Locked State in Interaction States)

---

## Tier Definitions

| Tier | Price | Core Capability |
|------|-------|-----------------|
| **Free** | $0 | Basic tracking, logging, and dashboard views. Limited AI (X msgs/day). |
| **Plus** | $20/mo | Full SIA coaching, all domains unlocked, cross-domain insights, RPG gamification. |
| **Pro** | $60/mo | Advanced analytics, higher AI limits, real-time usage meter, predictive insights. |
| **Max** | $100-200/mo | Unlimited SIA, priority processing, family/team features. |

---

## Tier Boundary Principles

1. **Core logging is always free** — Users can always record data (water, stress, habits, meals, sleep, medication, notes, energy). Data entry is never paywalled.
2. **Basic dashboard views are free** — Users see their own data in charts and summaries.
3. **SIA coaching = Plus+** — Any SIA Coaching Note Card, SIA Suggestion Card, or AI-generated insight requires Plus.
4. **AI analytics and predictions = Pro+** — Cross-domain intelligence, AI body composition, predictive analytics, trend projections require Pro.
5. **Social/competitive features = Plus+** — Accountability partners, competitions, community features require Plus.
6. **Profile and settings are always free** — Profile edit, account management, connected services configuration.
7. **System screens are tier-agnostic** — Force Update, Notification Permission, Image Viewer, Universal Search, App Rating, Report/Block function identically for all tiers.

---

## Screen-by-Screen Tier Matrix

### Screens 44-63 (Backend-Gap Screens)

| # | Screen | Free | Plus | Pro | Max |
|---|--------|------|------|-----|-----|
| 44 | Water Intake | Manual logging, progress ring, quick-add buttons, weekly bar chart | SIA coaching note, SIA-adjusted daily target | — | — |
| 45 | Daily Check-in | Mood/energy/stress logging, basic completion | SIA coaching note, emotion tag analysis, tomorrow preview SIA note | Cross-day pattern insights | — |
| 46 | Accountability | — | Full feature: partners, contracts, triggers, AI interventions | — | Family/team accountability pods |
| 47 | Competitions | — | Full feature: browse, join, compete, leaderboards, chat | AI competition creation, advanced analytics | — |
| 48 | Intelligence Dashboard | — | — | Full feature: composite scores, contradictions, correlations, predictions | — |
| 49 | Progress Photos | Photo capture, weight logging, manual measurements | SIA coaching note, trend analysis | AI body composition analysis | — |
| 50 | Profile Edit | Full feature: all fields editable | — | — | — |
| 51 | Voice Call History | View past call summaries (read-only) | Full feature: schedule calls, action items, emotion trends | Extended analytics, transcription export | — |
| 52 | Stress Management | Manual stress logging, trigger browsing | SIA coaching notes, AI recommendations, relief tool suggestions | Trend analysis, cross-domain stress correlations | — |
| 53 | Breathing Exercises | All 5 techniques, timer, post-session rating | SIA coaching note, personalized recommendations | Session analytics, breathing-to-stress correlation | — |
| 54 | Meditation | Practice library browsing, timer, basic session tracking | SIA recommendations, all categories, post-session feedback | Session analytics, mindfulness score trends | — |
| 55 | Yoga Sessions | Session library, pose library, timer | SIA coaching note, personalized difficulty, streak tracking | Session analytics, flexibility trend | — |
| 56 | Recipes | Recipe browsing, search, favorites | SIA suggestions, AI nutritional analysis, diet plan integration | — | — |
| 57 | Shopping List | Manual list creation, category grouping | Auto-generation from diet plans, recipe linking | — | Shared lists (family/team) |
| 58 | Sleep Tracking | Manual sleep logging, basic last-night view | SIA coaching note, trend charts, bedtime consistency | Cross-domain sleep correlations, predictive insights | — |
| 59 | Streak Details | Current streak count, calendar view, basic milestones | XP multiplier system, freeze management, streak leaderboard | Streak analytics, break pattern analysis | — |
| 60 | Medication Tracking | Medication list, daily checklist, basic adherence calendar | SIA coaching note, interaction warnings, reminder scheduling | Adherence trend analytics | — |
| 61 | Reminders & Tasks | Basic task list, manual reminders (max 5) | SIA smart suggestions, unlimited tasks/reminders, multi-channel notifications | Task analytics, completion trend | — |
| 62 | Quick Notes | Basic note capture (max 20), manual tags | SIA auto-tagging, "Ask SIA about this", unlimited notes | — | — |
| 63 | Energy Tracking | Manual energy logging, basic timeline | SIA coaching note, context correlations, chronotype detection | Cross-domain energy analytics, peak hour predictions | — |

### Screens 64-69 (New Critical Screens)

| # | Screen | Tier | Notes |
|---|--------|------|-------|
| 64 | Report / Block | All tiers | System screen — safety feature, never gated |
| 65 | Force Update | All tiers | System screen — always shown when triggered |
| 66 | Notification Permission | All tiers | System screen — shown during onboarding |
| 67 | Image Viewer | All tiers | System screen — utility, never gated |
| 68 | Universal Search | Free: search all personal data. Plus+: SIA-powered ranking, "Ask SIA" in results | Search is fundamental UX — always available, AI features premium |
| 69 | App Rating | All tiers | System screen — shown to all users after positive events |

---

## Locked State Design Pattern

When a free-tier user encounters a premium feature, apply the **Locked State** treatment (established by Screen [52] and Paywall [43]):

### Visual Treatment
- **Blur overlay**: 8pt gaussian blur over the premium content section
- **Lock icon**: 20pt, white at 60%, centered on blur
- **Upgrade label**: "Unlock with Plus" / "Unlock with Pro" — 13pt Sora Semibold, white at 70%, below lock icon
- **Tap behavior**: Tap anywhere on blurred section → navigate to Paywall [43] with context (which feature triggered the prompt)

### Inline Upgrade CTA (Alternative)
For sections where blur would break layout flow:
- **Upgrade card**: ink-brown-800 bg, --r-xl corners, 1pt orange border at 20%
- **Content**: Lock icon (16pt, orange) + "Upgrade to see [feature name]" (15pt Sora Regular, white at 70%) + "See plans →" link (15pt Sora Semibold, orange)
- **Tap**: Navigate to Paywall [43]

### SIA Coaching Note Locked State
- SIA note area shows a single-line teaser: "SIA has an insight about your [domain]..." in 15pt Sora Regular, white at 40%, italicized
- Small lock icon (12pt) inline after text
- Tap → Paywall [43]

---

## Implementation Notes

### Per-Screen Tier Documentation
Each screen file (44-63) should include tier information in two places:
1. **Purpose section** — One sentence at the end: "Free tier includes [X]; [Y] requires Plus/Pro."
2. **Interaction States section** — A "Locked State" variant row for each premium-gated component

### Paywall Frequency Rules
- Maximum 1 paywall prompt per session in low-motivation state
- Maximum 3 per session in medium motivation
- No limit in high motivation (but never interrupt a flow)
- Paywall [43] handles all upgrade flows — individual screens navigate there, never implement their own purchase UI

### Feature Flags
Each tier boundary maps to a feature flag for server-side control:
- `feature.sia_coaching` → Plus+
- `feature.ai_analytics` → Pro+
- `feature.social_features` → Plus+
- `feature.unlimited_sia` → Max
- `feature.family_team` → Max

---

---

## RPG System Tier Gating

Features from the RPG system mapped to subscription tiers.

| RPG Feature | Free | Plus | Pro | Max |
|---|---|---|---|---|
| Character sheet + 10-axis radar chart | Yes | Yes | Yes | Yes |
| Domain stat tracking (all 10) | Yes | Yes | Yes | Yes |
| Per-domain XP and levels | Yes | Yes | Yes | Yes |
| Daily/Weekly mission tracking | Yes | Yes | Yes | Yes |
| Side missions | Up to 3 active | Unlimited | Unlimited | Unlimited |
| Main missions | Up to 2 active | Unlimited | Unlimited | Unlimited |
| Life Missions (Epic) | — | Yes | Yes | Yes |
| SIA mission suggestions | — | Yes (3/week) | Unlimited | Unlimited |
| Mission chains (AI-generated) | — | — | Yes | Yes |
| Mission Journal | Basic (last 10 entries) | Full history | Full history + analytics | Full history + analytics |
| AI Story Engine (last 3 chapters) | Yes | All chapters | All chapters | All chapters |
| Story retroactive enrichment | — | — | Yes | Yes |
| Story sharing | — | Yes | Yes | Yes |
| Squads (parties) | — | Yes | Yes | Yes |
| Communities (guilds) — join | Yes | Yes | Yes | Yes |
| Communities (guilds) — create | — | Yes | Yes | Yes |
| Community challenges (raids) | — | Yes | Yes | Yes |
| Radar chart comparison views (vs week/month) | — | Yes | Yes | Yes |
| Radar chart historical playback | — | — | Yes | Yes |
| Reputation/mastery system | Yes | Yes | Yes | Yes |
| Title system | — | Yes | Yes | Yes |
| Custom title selection | — | — | Yes | Yes |
| Seasonal competitions | Yes | Yes | Yes | Yes |
| Prestige system | — | Yes | Yes | Yes |
| Family/team communities | — | — | — | Yes |

---

## Summary

| Tier | Screens with Exclusive Features | Key Unlocks |
|------|--------------------------------|-------------|
| Free | 44, 45, 49, 50, 52, 53, 54, 55, 56, 57, 58, 60, 61, 62, 63 (basic features) + all system screens (64-69) | Data logging, basic views, character sheet, basic radar chart, limited AI |
| Plus | 44-47, 49, 51-63 (SIA features) | Full SIA coaching, social features, RPG gamification, all domains, squads, communities, story engine, titles |
| Pro | 48, 49, 51, 52, 53, 54, 55, 58, 61, 63 (AI analytics) | Intelligence dashboard, predictive insights, cross-domain correlations, mission chains, story enrichment, radar playback, custom titles |
| Max | 46, 57 (team features) | Family/team accountability, shared lists, priority processing, family communities |
