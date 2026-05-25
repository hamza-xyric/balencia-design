# Central XP Reward Table

> Single source of truth for all XP values across Balencia. Developers and designers reference this document when implementing or designing any XP-awarding interaction.
>
> Updated: 2026-05-22
> Sources: All screen design documents + `_shared-patterns.md` + `RPG_SYSTEM_DESIGN.md`

---

## Per-Domain XP Sources

Base XP values before multipliers. Each action awards XP to its corresponding domain.

### Fitness

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| Workout completed | +75 | Post-workout summary | Workout Detail [27] |
| Yoga session completed | +45 | Post-session summary | Yoga Sessions [55] |

### Sleep

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| Sleep logged (7+ hours) | +25 | Sleep entry confirmed | Sleep Tracking [58] |
| Consistent bedtime (within 30min of target) | +15 | Auto-detected | Sleep Tracking [58] |

### Career

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| Career action completed (networking) | +15 | Checkbox tap | Career Dashboard [32] |
| Career action completed (planning) | +20 | Checkbox tap | Career Dashboard [32] |
| Career action completed (skill-building) | +10 | Checkbox tap | Career Dashboard [32] |

### Nutrition

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| Meal / food logged | +25 | Add food entry confirmed | Meal Detail [29], Nutrition [28] |
| Water daily goal achieved | +25 | Last glass to hit target | Water Intake [44] |

### Finance

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| Financial check-in logged | +5 | "Checked finances" activity | Home [12] |
| Budget reviewed | +15 | Budget detail viewed | Finance Dashboard [30] |
| Savings deposited | +25 | Savings update confirmed | Finance Dashboard [30] |

### Faith

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| Daily practice completed | +10 | Practice checkbox tap | Faith Dashboard [34] |
| Reading/study session completed | +15 | Session logged | Faith Dashboard [34] |

### Productivity

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| Single habit checked off | +10 | Checkbox tap | Habits [38] |
| Routine completed (all habits for day) | +25 | Last habit completed | Habits [38] |
| Schedule followed (time block) | +15 | Block completed | Schedule [41] |

### Relationships

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| Interaction logged | +15 | Contact interaction saved | Relationships [33] |
| Quality time logged | +25 | Quality time entry confirmed | Relationships [33] |

### Wellbeing

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| Mood check-in completed | +10 | Check-in submitted | Daily Check-in [45] |
| Journal entry written | +25 | Journal entry saved | Journal [37] |
| Breathing session completed | +25 | Post-session | Breathing [53] |

### Meditation

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| Meditation session completed | +50 | Post-session | Meditation [54] |
| Breathing exercise completed | +25 | Post-session | Breathing [53] |

### General / Cross-Domain

| Action | Base XP | Trigger | Source Screen |
|--------|---------|---------|---------------|
| First mission created | +10 | Goal saved during onboarding | Celebration [42] |
| Welcome / account created | +10 | First app launch post-onboarding | Home [12] |
| Goal action completed | +25 | Checkbox in action list | Celebration [42] |
| Mission completed (Main) | +150–500 | All actions in goal complete | RPG Character [19], Celebration [42] |
| Life Mission completed (Epic) | +1,000–5,000 | All sub-missions complete | Celebration [42] |
| Side mission completed | +50–150 | All actions complete | Celebration [42] |
| Weekly mission completed | +75–200 | All conditions met within week | Celebration [42] |
| Daily mission completed | +10 | Per completion | Habits [38] |
| Group mission completed | +100–300 | All participants confirm | Celebration [42] |

### Mission XP Modifiers

| Modifier | Rule | Display Format |
|----------|------|---------------|
| Partial XP on archive | Archived missions receive XP proportional to progress: `partial_xp = floor(base_xp_range_midpoint * progress_percent)`. Minimum partial XP: 10 XP. | "⚡ +63 XP (partial)" — orange text, "(partial)" in white at 40% |
| Chain completion bonus | Completing all missions in a chain awards a 15% bonus on total chain XP earned across all chain missions. | "Chain complete: +[##] XP bonus" — orange text, shown on celebration overlay |
| Group mission social multiplier | +25% bonus XP for all participants in a group mission. | "⚡ +375 XP (incl. squad bonus)" |

**Partial XP examples**:
- Main mission (midpoint 325 XP), archived at 42% → floor(325 * 0.42) = 136 XP
- Side mission (midpoint 100 XP), archived at 15% → floor(100 * 0.15) = 15 XP
- Side mission (midpoint 100 XP), archived at 5% → minimum 10 XP

---

## Per-Domain XP Level Curve

Logarithmic curve — front-loads early wins, creates natural plateaus at higher levels.

```
xp_required(level) = 100 * level^1.5

Level 1:   0 XP          (start)
Level 2:   100 XP        (first few days)
Level 3:   283 XP        (first week)
Level 5:   800 XP        (weeks 1-2)
Level 10:  3,162 XP      (months 1-2)
Level 15:  5,809 XP      (months 2-4)
Level 20:  8,944 XP      (months 4-8)
Level 25:  12,500 XP     (6+ months sustained)
```

Each domain has its own XP pool and level (1-25). Overall character level is derived from the aggregate power score, not from XP directly.

---

## Streak Milestone Rewards

One-time XP bonuses at streak milestones. From Screen [59] Streak Details.

| Milestone | XP Reward | Celebration Type |
|-----------|-----------|------------------|
| 7 days | +50 XP | Full-screen celebration overlay |
| 14 days | +100 XP | Full-screen celebration overlay |
| 30 days | +250 XP | Full-screen celebration overlay |
| 60 days | +500 XP | Full-screen celebration overlay |
| 90 days | +1,000 XP | Full-screen celebration overlay |
| 180 days | +2,500 XP | Full-screen celebration overlay |
| 365 days | +5,000 XP | Full-screen celebration overlay + "grand master" rank |

---

## XP Multiplier Stack

Active multipliers applied to base XP in this order:

```
final_xp = base_xp
  * cross_domain_synergy_bonus (max 1.15)    [Phase 4: mastery synergies]
  * squad_buff (1.10 if in active squad)      [Phase 5: social RPG]
  * recovery_multiplier (1.30 if post-rest day)
  * streak_multiplier (see tiers below)

total cap: 2.0x
```

### Streak Multiplier Tiers

| Streak Length | Multiplier | Label |
|---------------|------------|-------|
| < 7 days | 1.0x | No bonus |
| 7–29 days | 1.5x | "7-day streak bonus active" |
| 30+ days | 2.0x | "30-day streak bonus active" |

### Recovery Multiplier (Rested XP)

When a user takes a deliberate rest day (marked as rest or via streak freeze), the next active day earns a **1.3x XP multiplier** on all actions. Stacks with streak multiplier but total cap remains 2.0x.

### Diminishing Returns

If a user logs activities across 7+ domains in a single day, XP for the 8th+ domain actions is reduced to 50%. Prevents manic completionism.

---

## Domain Level-Up Rewards

| Event | Reward | Celebration |
|-------|--------|-------------|
| Domain level-up (e.g., Fitness Lv.7 → 8) | +25 XP bonus | Domain Level-Up Toast |
| Overall level-up (e.g., Level 12 → 13) | Rank title unlock (at tier boundaries) | Full-screen celebration overlay |

### Level Tier Unlocks

| Level | Rank Title | What Unlocks |
|-------|-----------|-------------|
| 1-3 | Beginner | Basic character sheet, domain tracking |
| 4-7 | Apprentice | Custom domain weights, streak freeze economy |
| 8-12 | Dedicated Explorer | Full radar chart history, monthly comparisons |
| 13-18 | Rising Champion | Title customization, leaderboard "Around Me" view |
| 19-25 | Life Architect | Prestige eligibility, mentor badge, advanced analytics |
| 26+ | Grand Master | Prestige levels, custom titles, legacy achievements |

---

## Competition Rewards

| Event | XP Reward | Additional |
|-------|-----------|------------|
| Competition prize (winner) | +500 XP | + achievement badge |
| Community achievement | +150 XP | Shown in Community [40] |
| Group mission social multiplier | +25% XP | Applied to all participants |

---

## XP Display Rules

Visual treatment varies by XP amount. From Screen [42] Celebration Overlay.

### XP Popup Animation (inline, at tap point)

| Size Tier | XP Range | Font Size | Visual Treatment |
|-----------|----------|-----------|-----------------|
| Small | +5–25 | 14pt Sora Bold | Orange text, float up 24pt, fade out 600ms |
| Medium | +25–100 | 16pt Sora Bold | Orange text, float up 48pt, fade out 1.2s |
| Large | +100+ | 20pt Sora Bold | Orange text + enhanced glow, float up 64pt, fade out 1.2s |

### XP Counter (celebration overlay)

| Size Tier | XP Range | Font Size | Visual Treatment |
|-----------|----------|-----------|-----------------|
| Small | +10–50 | 28pt Sora Bold | Standard count-up 800ms |
| Medium | +50–200 | 28pt Sora Bold | Standard count-up 800ms |
| Large | +200–1,000 | 36pt Sora Bold | Enhanced count-up 800ms + orange glow |

### Toast Bar (small win)

| Format | Example | Font | Placement |
|--------|---------|------|-----------|
| Action + XP | "Habit done +25 XP" | 15pt Sora Bold (XP in orange) | Top of screen, slides down, auto-dismiss 3s |
| Domain level-up | "Fitness Level 8 +25 XP" | 15pt Sora Bold, domain color icon | Top of screen, auto-dismiss 3s |
| Streak toast | "5-day streak" | 15pt Sora Semibold | Top of screen, auto-dismiss 3s |

---

## Daily Aggregates

Some screens display cumulative daily XP. These are sums, not separate rewards.

| Screen | Display | Example |
|--------|---------|---------|
| Habits [38] | XP Summary Card | "+75 XP earned today" |
| Home [12] | Activity Feed | Individual XP items in reverse-chronological feed |
| RPG Character [19] | Stats summary | Lifetime XP (cumulative total) |
| Streak Details [59] | High motivation variant | "avg. daily XP: 45 / total XP from streaks: 3,200" |

---

## Screens Referencing XP

| Screen | XP Role |
|--------|---------|
| 02 — Motion Carousel | Marketing copy: "Earn XP. Level up." |
| 08 — Initial Plan Summary | XP progress bar (0 XP starting state) |
| 09 — SIA Chat | XP earned toast after logging via chat |
| 12 — Home Screen | Activity feed with XP badges, level badge in header |
| 13 — Goals List | XP + streak row on goal cards |
| 14 — Goal Detail | Stats row with XP earned |
| 16 — Life Areas Overview | Life Power display below radar chart |
| 17 — Me Main | Quick stats row with total XP, Life Power |
| 19 — RPG Character | Full XP system: per-domain levels, XP bars, stat scores, Life Power |
| 27 — Workout Detail | Post-workout XP earned badge (+75 XP) |
| 28 — Nutrition Dashboard | Water goal XP micro-toast (+25 XP) |
| 29 — Meal Detail | Food logged XP toast (+25 XP) |
| 32 — Career Dashboard | Per-action XP rewards (+10/+15/+20 XP) |
| 33 — Relationships | Interaction/quality time XP (+15/+25 XP) |
| 34 — Faith | Practice completion XP (+10 XP) |
| 38 — Habits | Per-habit XP (+10 XP), routine bonus (+25 XP), daily XP summary |
| 39 — Leaderboard | Rank by XP, level badges on rank rows |
| 40 — Community | Achievement card with XP (+150 XP) |
| 41 — Schedule/Calendar | High motivation: XP reward on event cards |
| 42 — Celebration | Full XP display system: counter, popup, toast, level-up, domain level-up |
| 44 — Water Intake | Goal achievement XP (+25 XP) |
| 51 — Voice Call History | High motivation: XP earned per call |
| 53 — Breathing | Post-session XP (+25 XP) |
| 54 — Meditation | Post-session XP badge (+50 XP) |
| 55 — Yoga Sessions | Session card XP display (+45 XP) |
| 58 — Sleep Tracking | Sleep logged XP (+25 XP), consistency XP (+15 XP) |
| 59 — Streak Details | XP multiplier system, milestone XP rewards, recovery multiplier |
| 60 — Medication Tracking | Adherence referenced as earning XP via wellbeing score |
| 61 — Reminders/Tasks | High motivation: XP reward per task |

---

## Pattern Summary

| Category | Count |
|----------|-------|
| Life domains with XP tracking | 10 |
| Unique base XP values | 12 (+5, +10, +15, +20, +25, +45, +50, +75, +150, +500, +1,000, +5,000) |
| Streak milestones | 7 tiers (50 → 5,000 XP) |
| Multiplier sources | 4 (streak, recovery, synergy, squad) |
| Display size variants | 3 per display type (small/medium/large) |
| Screens with XP | 30+ |
