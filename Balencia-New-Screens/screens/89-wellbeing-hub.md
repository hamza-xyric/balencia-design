# 89-wellbeing-hub - hi-fi glass spec

### 1. Header
- **ID:** 89
- **Name:** Wellbeing hub
- **Route(s) covered:** /wellbeing
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Wellbeing primary nav.
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, and Balencia-New-Screens/canon.
- **Batch:** 15

### 2. Purpose
The Wellbeing hub is the calm landing surface for journal, mood, breathing, habits, energy, stress, schedule, insights, vision, virtual try-on, quick notes, and sleep-adjacent content. It must feel supportive, not clinical: one daily state read, one CIA nudge, and clear safety access before any gamified affordance.

### 3. Entry & exit
- **Entry:** primary nav Wellbeing, Today quick-log mood, CIA recommendation, notification, or linked wellbeing card.
- **Primary exit:** open the next useful module: mood, journal, breathing, stress, habits, energy, or schedule.
- **Safety exit:** SafetyResourceCard opens crisis resources without score, streak, or XP framing.
- **Data exit:** health, mood, journal, photos, and voice surfaces expose settings for consent, revoke, export, and delete.
- **Failure exit:** cached hub remains visible; failed modules show SyncStatus and route to System states [98] only when unsafe to render.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with "Wellbeing", crisis shortcut, and settings glyph.
2. Hero GlassCard: "How your system feels" with mood, stress, sleep, and energy rollup.
3. SafetyResourceCard, quiet but always visible below hero.
4. CIAInsightCard with one cross-pillar coaching read.
5. Module grid: Journal, Mood, Breathing, Stress, Habits, Energy.
6. "Today" row: schedule, quick notes, and recent check-in.
7. FABQuickLog and GlassNavBar.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| Wellbeing                 help  gear |
+--------------------------------------+
| +----------------------------------+ |
| | HOW YOUR SYSTEM FEELS            | |
| | steady, tired edge               | |
| | mood 6/10  stress 4/10 sleep 7h  | |
| | via check-in + wearable          | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Crisis resources                 | |
| | Call, text, or view local help   | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA: your stress eased after     | |
| | breathing on two recent days.    | |
| | [Start breathing] [See evidence] | |
| +----------------------------------+ |
| [Journal] [Mood]                    |
| [Breathing] [Stress]                |
| [Habits] [Energy]                   |
| TODAY: 5:30 walk, 1 quick note      |
| [ + ] quick log                     |
| Today | CIA | Goals | Me            |
+--------------------------------------+
```

### 5. Components
- **TopBar** - title, safety shortcut, settings.
- **GlassCard** - wellbeing hero, one semantic glow.
- **SafetyResourceCard** - crisis resources entry; never gamified.
- **CIAInsightCard** - cross-pillar insight with evidence chips.
- **GlassStatCard** - mood, stress, sleep, energy mini-stats.
- **ChipProvenance** - `you checked in`, `via wearable`, `journal signal`, `estimated`.
- **BentoGrid** - six module cards with domain labels.
- **FABQuickLog** - mood, note, water, meal shortcuts when on Today-adjacent surfaces.
- **ConsentCard / SyncStatus / HonestNullState / SkeletonState / ErrorState** - data and state controls.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` base with warm radial glow; wellbeing module tags can use `#14b8a6` only inside ChipDomainTag, never as chrome.
- **Hero:** GlassCard with `--glow-you #FF5E00` for current self-care effort.
- **Safety:** SafetyResourceCard uses SolidCard on `#211008`, no glow, no confetti, no streak language.
- **CIA:** `--glow-cia #7F24FF` only on insight and projected trend chips.
- **Completion:** completed breathing, journal, or check-in rows use `--glow-done #34A853`.
- **Type:** Neue Montreal plus one Tiempos italic word in the hero, e.g. "a *steady* start."

### 7. Content & copy
- **H1:** "Wellbeing."
- **Hero:** "A *steady* start." "Mood 6/10. Stress 4/10. Sleep 7h."
- **Safety copy:** "Crisis resources. Call, text, or view local help."
- **CIA line:** "Your stress eased after breathing on two recent days."
- **Module labels:** "Journal", "Mood", "Breathing", "Stress", "Habits", "Energy."
- **Empty module copy:** "No check-in yet today. Log mood in under a minute."
- **Error copy:** "Could not refresh wellbeing. Showing your last safe snapshot."

### 8. Data & honesty states
- **Mood/stress:** real = check-in value with ChipProvenance; low-confidence = estimated from journal tone; honest-null = "No mood check-in yet."
- **Sleep/energy:** real = wearable or user log; low-confidence = stale or partial sync; honest-null = "Connect a source or log manually."
- **CIA insight:** real = at least two dated wellbeing signals; low-confidence = one signal and explicit label; honest-null = hide trend claims.
- **Safety:** real = local resource links; low-confidence = unknown locale shows national resources; honest-null = still show emergency copy, never a blank card.
- **Controls:** health, journal, mood, voice, photos, CIA inference, and third-party data show consent, revoke, export, and delete paths.

### 9. All states
- **Default:** hero, safety card, CIA insight, module grid, Today row, FAB, and nav render.
- **Skeleton:** hero stat slots, safety card, six modules, and Today row shimmer in place.
- **Empty:** day-one hub shows SafetyResourceCard, mood check-in starter, breathing starter, and honest-null stats.
- **Error:** failed module cards retain cached values with source-specific retry.
- **Success:** completing check-in or breathing updates the hero and shows green completion feedback.
- **Disabled:** modules dim when consent, connectivity, or entitlement blocks them; safety remains enabled.

### 10. Motion & interaction
- **Load:** hero settles first, SafetyResourceCard appears immediately after, modules fade by row.
- **Module tap:** opens the owning wellbeing route with shared element title motion.
- **Safety tap:** opens a Sheet without animation flourish; no gamified transition.
- **Quick-log:** FAB expands to mood, note, water, meal.
- **CIA evidence:** insight opens a Sheet with provenance chips and revoke links.
- **Reduced-motion:** disables glow breathing and row fade; all content appears in final position.

### 11. Motivation-tier adaptation
- **Low:** show hero, SafetyResourceCard, two module cards, and one CIA action.
- **Medium:** default six-card hub.
- **High:** add trend previews, schedule context, and source freshness chips on each module.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** crisis, settings, module cards, chips, and FAB actions are 44px minimum.
- **Screen readers:** hero summarizes mood, stress, sleep, source, confidence, and safety access before modules.
- **Safety:** crisis resources are one tap from the top and repeated in SafetyResourceCard.
- **Data controls:** consent/revoke/delete controls exist for health, journal, mood, voice, photos, social, CIA, and third-party data.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** wellbeing modules link journal, mood, stress, sleep, schedule, and CIA.
2. **Honest:** all reads are sourced or honest-null.
3. **Premium:** safety is visible, calm, and not gamified.
4. **Warm-dark:** canon background and glass system applied.
5. **Semantic glow:** self-care, completion, and CIA meanings are stated.
6. **60/30/10:** orange action, green completion, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic emphasis word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high density defined.
10. **Accessibility:** safety, labels, 44px targets, and reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null applied to wellbeing data.
12. **Catalog:** canon components used; no unflagged one-offs.
13. **CIA voice:** calm, concrete, non-alarming guidance.
