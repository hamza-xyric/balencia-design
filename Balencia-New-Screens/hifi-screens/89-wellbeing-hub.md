# 89 Wellbeing hub - A+++ hi-fi mobile spec

## Header
- **Source ID:** 89
- **Source spec:** `Balencia-New-Screens/screens/89-wellbeing-hub.md`
- **Evidence:** `Archive/2026-07-06/features.md`, `Archive/2026-07-06/routes.csv`, `work/briefs/89.md`
- **Route:** `/wellbeing`
- **Frame:** 390x844 native mobile
- **Priority:** convert-now

## Reviewer Synthesis
- **Source Fidelity Reviewer:** retain `/wellbeing` as a hub for journal, mood, stress, breathing, habits, energy, schedule, insights, vision, and virtual try-on.
- **Premium Visual Director:** replace plain KPI row dominance with a single "System Field" focal card so the hub does not become a tile directory.
- **Interaction and State Designer:** modules need long-press quick actions, route taps, skeletons, and low-motivation reduction.
- **Trust and Safety Reviewer:** crisis support must be visible above modules; mood, journal, health, voice-adjacent and photo-adjacent exits need consent and delete paths.
- **GLM directions considered:** KPI strip, calm cockpit, regulation-first safety surface. **Chosen:** calm cockpit with always-visible safety.

## Final Composition

```text
+--------------------------------------+
| Wellbeing                 help  gear |
| Tuesday, Jul 7                       |
| Your daily *whole* state             |
|                                      |
| +----------------------------------+ |
| | HOW YOUR SYSTEM FEELS            | |
| |            steady                | |
| |     mood 6   stress 4            | |
| |      sleep 7h   energy 5         | |
| |  via check-in + wearable         | |
| |  One breath session helped twice | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Crisis resources                 | |
| | Call, text, or view local help   | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA: stress eased after two      | |
| | breathing sessions this week.    | |
| | [Start breathing] [View sources] | |
| +----------------------------------+ |
| Journal        Mood                  |
| Breathing      Stress                |
| Habits         Energy                |
| Insights       Vision       Pulse    |
| Today: 5:30 walk, 1 quick note       |
|                            (+)       |
| Today        CIA       Goals    Me   |
+--------------------------------------+
```

## Focal Hierarchy
- **Dominant focal moment:** `NEW: SystemFieldHero`, a four-signal wellbeing rollup for mood, stress, sleep, and energy.
- **Safety layer:** `SafetyResourceCard` is second, visible without scrolling.
- **CIA layer:** one evidenced regulation nudge, not a diagnosis.
- **Modules:** core six dense action tiles plus secondary access to Insights, Vision, Pulse, and Schedule. Solid not glassy.

## Visual System
- Warm dark base with orange radial atmosphere; wellbeing teal appears only in `ChipDomainTag` or icons.
- System Field hero uses orange `--glow-you` for self-care effort.
- Safety card uses `SolidCard`, no glow, no XP, no streak language.
- CIA insight uses purple `--glow-cia`.
- Completed breathing/check-in feedback uses green `--glow-done`.
- Neue Montreal throughout. Tiempos italic word: "*whole*".

## Components
- `TopBar`, `GlassCard.hero`, `GlassStatCard`, `SafetyResourceCard`, `CIAInsightCard`, `BentoGrid`, `ChipProvenance`, `FABQuickLog`, `GlassNavBar`, `ConsentCard`, `SyncStatus`.
- `NEW: SystemFieldHero` - a compact non-diagnostic wellbeing instrument for four current signals.
- `NEW: RegulationTile` - module tile with title, source freshness, and optional long-press quick action.

## Data Honesty
- Mood: real check-in; low-confidence journal inference; honest-null "No mood check-in yet."
- Stress: wearable/user input; low-confidence estimated label; honest-null "Not enough data yet - 3 more days."
- Sleep/energy: provider or log source; stale chip when older than 12 hours.
- CIA: only cites dated breathing, mood, sleep, or journal evidence. Premium CIA correlations render as a locked preview only after the screen shows the non-premium self-care path; no sensitive inferred detail appears behind the lock.

## Consent and Safety
- Crisis resources resolve to local emergency, local crisis line when locale is known, national fallback, and non-emergency support. Unknown locale never hides the card.
- Mood, journal, voice note, health, photo-related exits, social context, third-party sources, and CIA inference open a Data and privacy sheet with category, source, scope, retention, export, revoke, and delete.
- Long-press module shortcuts include a "what this logs" micro-sheet before saving sensitive signals.

## States
- **Default:** System Field, safety, CIA, modules, Today row.
- **Skeleton:** hero signal positions, safety card, CIA card, and six tiles hold final geometry.
- **Empty:** safety remains; hero uses honest-null labels and a first mood log action.
- **Error:** failed source is named per tile; cached values remain.
- **Success:** mood or breathing completion updates the hero and flashes green completion.
- **Disabled:** source-dependent modules dim with reason; safety never disables.

## Motion
- Hero signal dots settle softly; SafetyResourceCard appears immediately.
- Module taps use shared title transition into the deep route.
- Safety sheet opens without flourish.
- Reduced motion disables glow breathing and tile stagger.

## Image Slots
- None required.

## Implementation Notes
- Route stays `/wellbeing`.
- Deep links use existing routes: `/wellbeing/journal`, `/wellbeing/mood`, `/wellbeing/stress`, `/wellbeing/breathing`, `/wellbeing/energy`, `/wellbeing/insights`, `/wellbeing/schedule`, `/wellbeing/vision`, `/wellbeing/virtual-tryon`.
