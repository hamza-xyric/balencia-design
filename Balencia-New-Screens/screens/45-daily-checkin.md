# Balencia Glass Design Spec: 45-daily-checkin

## 1. Header
- **Screen ID:** 45-daily-checkin
- **Name:** Daily check-in
- **Route(s) covered:** `/wellbeing/emotional-checkin`
- **Tab:** Today (modal; deep-linkable from CIA and Habits)
- **Source:** Functional Content Brief: Daily Check-in (Morning / Evening)
- **Batch:** 5

## 2. Purpose
Daily Check-in is Balencia's twice-daily pulse-check — a sub-two-minute ritual that captures mood, energy, and stress in the moment. This is the highest-leverage input in the whole system: without honest, frequent signal here, CIA has nothing to correlate against the other domains a person tracks. Morning sets one intention; evening closes the loop and — once enough history exists — surfaces a single grounded, cross-pillar pattern for tomorrow. The screen must be fast enough to survive a distracted, low-motivation user and rich enough to reward an engaged one.

## 3. Entry & exit
*Correction: the brief specified an auto-triggered full-screen stack push from Habits while separately defining drag-down-to-dismiss gestures — those two are incompatible. A stack push has no scrim to drag against and no "return to origin" moment. Every entry path below now resolves to the same `Sheet` (CANON/catalog), so the dismiss gesture is always available and the origin screen is always what's left underneath.*

- **Entry paths (all → `Sheet`, `half` by default):**
  - Home [12]: time-aware prompt card ("morning check-in" before noon, "evening check-in" after 6pm if morning was already logged).
  - CIA Chat [09]: deep-link via "how are you feeling?" — opens pre-scrolled to the mood row.
  - Habits [38]: evening habit row tap.
  - System auto-trigger: first app open before 12:00, or after 18:00 if a morning entry already exists today. Auto-trigger always opens as `Sheet`, never a route push — it must be dismissible without leaving the app.
- **Exit paths:**
  - **Save:** persists the entry, springs the sheet down, returns to origin with a success toast.
  - **Cancel / drag-down:** dismisses without saving. If any field has a non-default value, shows an inline "keep this?" confirmation (two `BtnGhost` actions: discard / keep editing) rather than silently dropping input.

## 4. Layout anatomy
**Regions top-to-bottom (all inside one scrollable `Sheet` body — no persistent app chrome renders inside a modal):**
1. **Sheet header** — grabber, `Cancel` (`BtnGhost`), title ("morning check-in" / "evening check-in"), `SegmentedTabs` (conditional, see §5).
2. **Hero** — warm atmosphere + purple pool, `CIAPresenceOrb` (passive), time-aware `Display` greeting, `StreakCard`.
3. **Mood** — `SolidCard`: `MoodEmojiPicker` (NEW) + optional `ChipDomainTag` context row.
4. **Energy & stress** — `SolidCard`: two stacked `Slider` rows.
5. **Trend** *(high density only)* — `GlassStatCard` (`sparkline` variant), 7-day mood/energy line.
6. **Intention / reflection** — `GlassCard`, `GlassPillInput` (`multiline`). AM copy = intention; PM copy = reflection.
7. **Tomorrow** *(evening only)* — `CIAInsightCard`, cross-pillar correlation, honesty-gated.
8. **Safety** — `SafetyResourceCard`, quiet, scroll end.
9. **Footer** — `BtnPrimary` "Save check-in", sticky within the sheet's safe area.

*Correction: the draft's wireframe and component list included a `GlassNavBar` and `FABQuickLog` inside the check-in composition. Both are persistent Today-tab chrome that lives on the screen underneath the scrim — a modal sheet has no tab bar and no FAB of its own. Removed from this screen entirely; they remain visible (dimmed, inert) on the origin screen behind the scrim.*

**ASCII Wireframe (390×844, evening / medium density):**
```text
┌─────────────────────────────────────┐ 844
│              ───                    │
│  Cancel        evening check-in     │  72
├─────────────────────────────────────┤
│   · · · purple pool · · ·           │
│        ⟡ CIA orb (passive) ⟡        │
│                                      │
│   Good *evening*.                   │ 168
│   Let's close out your day.         │
│   Two minutes. How did it go.       │
│   🔥 Day 14 · checking in           │
├─────────────────────────────────────┤
│  how you're feeling                 │
│  (◡)  (o)  (·)  (⌣)  (✦)            │ 132
│   ring on selected · orange bleed   │
│  + add context  [Career] [Fitness]  │
├─────────────────────────────────────┤
│  energy and stress                  │
│  low  ───●───────────  high    7    │ 140
│  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈  │
│  calm ──────●─────────  high   4    │
├─────────────────────────────────────┤
│  how today went                     │
│  ┌─────────────────────────────┐    │ 128
│  │ Closed the deck. Slept      │    │
│  │ badly the night before.     │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  tomorrow                     ◆ CIA │
│  ┌───────────────────────────────┐  │ 150
│  │ You tend to feel *calmer* on  │  │
│  │ days you train in the morning.│  │
│  │ [Mental/Wellbeing][Fitness]   │  │
│  │        See the pattern · Not now│
│  └───────────────────────────────┘  │
├─────────────────────────────────────┤
│  You're not alone. View support.    │  40
├─────────────────────────────────────┤
│        [   Save check-in   ]        │  90
└─────────────────────────────────────┘  0
```

## 5. Components
- **Sheet** — `half` by default; grows to `full` at high density or once the sheet's content exceeds one screen height and needs its own scroll.
- **CIAPresenceOrb** — passive breathing state, small (not the full-screen voice hero size), sits inside the atmosphere, not a separate card.
- **StreakCard** — replaces the draft's plain `ChipProvenance` for the streak meta. *Correction: the catalog already has a purpose-built component for exactly this (flame glyph + day count + `glow-you`, with an honest `recovered` state for broken streaks) — a caption chip would have thrown that honesty away.*
- **SolidCard** — Mood card; Energy & stress card.
- **MoodEmojiPicker** — `NEW:` compact horizontal single-select glyph picker, 5 cells. *Rationale: the catalog's only selection-card pattern is `ChoiceCardFrost` (stacked, numbered, titled MCQ card) — too heavy for a 44px-tall row of emoji. This is a small, real gap; promote at the next consistency barrier.* Anatomy: 44×44px circular tap targets, unselected = `--surface-3` fill, selected = orange 1.5px ring + `glow-you` bleed (borrows `ChoiceCardFrost`'s selection grammar for system consistency).
- **ChipDomainTag** — optional "what's this about" context row under mood (user attributes today's mood to a life domain in its true domain color); also cited as the evidence pair on the Tomorrow card.
- **Slider** — Energy (low↔high) and Stress (calm↔high) rows, `--surface-3` track, orange fill, tabular-nums value bubble. *Correction: the draft flagged a `NEW: EmotionScaleBar` for this — but the catalog's `Slider` already specifies a labeled track with a tabular-nums value bubble. Dual end-labels and 10-step snap ticks are a variant, not a new component; inventing one here would have fragmented the catalog for no anatomical gain.*
- **GlassStatCard** (`sparkline` variant) — 7-day mood/energy trend, high density only.
- **GlassCard** (default, radius 28) — Intention/reflection card.
- **GlassPillInput** (`multiline`, radius 20 per catalog override) — intention/reflection text.
- **CIAInsightCard** — Tomorrow card, evening only.
- **IntelligenceTimeline** — the card's own compute/loading trace (see §7, §9).
- **ConfidenceMeter** — low-confidence state of the Tomorrow insight.
- **SafetyResourceCard** — crisis resources, quiet, scroll end.
- **SegmentedTabs** — shown only when both today's morning and evening entries are still incomplete *and* the sheet was opened manually (not a time-aware auto-trigger or a specific deep link) — lets the user choose which to fill first.
- **BtnPrimary / BtnGhost / BtnSuccess** — Save / Cancel / save-confirmed transient state.

## 6. Visual treatment
- **Atmosphere:** `--bg-base` `#0A0A0F` + mandatory top-center warm radial `rgba(255,94,0,.18)` + 3–4% grain. One purple pool behind the hero orb only (CANON: "CIA moments add a purple pool") — not repeated as a second global layer; the Tomorrow card carries its own local `glow-cia` instead of a second atmosphere pass.
- **Glass tiers:**
  - Sheet shell: `.glass-frost`, top-radius 28, scrim `rgba(10,10,15,.6)`.
  - Hero: `.glass-frost` (immersive tier — it sits directly over the radial glow, the exact "over glow" case the catalog reserves frost for).
  - Mood card, Energy & stress card: `SolidCard` / `--surface-2`, no blur — this is the data-dense region (5-way emoji state + two live slider values), legibility over atmosphere.
  - Intention/reflection: `GlassCard` default, radius 28 (not the hero radius-40 — that's already spent on the greeting).
  - Tomorrow: `CIAInsightCard`'s fixed purple-tinted glass.
  - MoodEmojiPicker cells: `--surface-3` unselected; selected = orange 1.5px ring + `glow-you`.
  - ChipDomainTag: 16% domain-color fill + domain-color label/icon, tags only, never chrome.
- **Semantic glow (one per card, meaning stated):**
  - Hero: `--glow-cia` — CIA's quiet presence opening the ritual.
  - Intention/reflection: `--glow-you` — this is the user's own effort, unedited by CIA.
  - Tomorrow: `--glow-cia` — *correction: the draft assigned this card `--glow-done` ("closure, looking forward"). But this card is a `CIAInsightCard`, and the catalog fixes that component's glow to `glow-cia` — an AI-generated, projected, cross-pillar insight is definitionally a CIA moment, not a completion moment. Reassigned to `--glow-cia`, which also reads as an intentional arc: CIA opens the ritual, the user does the effort in orange, CIA closes it with an insight — purple bookends, orange center.*
  - Green (`--glow-done`) appears once, honestly: the `BtnSuccess` save-confirmation swap. It is not forced onto any card just to hit a ratio — a single-screen composition doesn't need to replicate the app-wide 60/30/10 split card-for-card, and manufacturing a "done" moment elsewhere on this screen would be decorative, which CANON §3 explicitly forbids.

## 7. Content & copy
*Correction: the brief's overline strings were set in shouting caps with a question mark ("HOW ARE YOU FEELING?"). Overlines render visually capitalized by the type system itself (NM Medium, +0.14em, all-caps transform) — the underlying string still has to be written in sentence case, and the "?" was dropped since these are labels, not questions.*
*Correction: the brief's error string "CIA is reading your week" is both a CIA violation and mislabeled — it's a loading trace, not an error. Rebuilt as `IntelligenceTimeline` staged captions (below), and a real, separate `ErrorState` copy was written for genuine save failures.*

- **Hero (Display), morning:** Good *morning*. What's the shape of today.
- **Subtext, morning:** Thirty seconds. What matters most today.
- **Hero (Display), evening:** Good *evening*. Let's close out your day.
- **Subtext, evening:** Two minutes. How did it actually go.
- **Streak (StreakCard):** Day 14 · checking in.
- **Overline — mood:** how you're feeling
- **Overline — energy/stress:** energy and stress
- **Overline — context (optional row):** add context
- **Overline — intention (AM):** today's intention
- **Overline — reflection (PM):** how today went
- **Overline — insight (PM only):** tomorrow
- **Insight copy (CIA voice):** You tend to feel *calmer* on days you train in the morning.
- **IntelligenceTimeline stages (insight loading):** checking your morning workouts… → comparing to your mood history…
- **CTA (BtnPrimary):** Save check-in.
- **Confirmation label (BtnSuccess swap):** Saved.
- **Toast on origin screen:** Check-in saved.
- **Error (ErrorState, genuine save failure):** Couldn't save your check-in. Your answers are still here — try again.
- **Disabled helper:** Select a mood to save.
- **Offline banner:** offline — this check-in saves locally until you're back online.
- **Offline CTA:** Save locally.
- **Cold-start hero sub:** This is your *first* check-in. It takes less than a minute.
- **Safety copy:** You're not alone. View support resources.

## 8. Data & honesty states
*Correction: the brief listed a "Stress" metric in the Purpose and the SolidCard layout but never gave it an honesty state, and separately described the Tomorrow card as both a calendar-event lookup and a mood-exercise correlation — two different features. Resolved: Stress now has its own triple below, and the Tomorrow card is committed to one concept, the cross-pillar correlation, since that's the only version that's actually a `CIAInsightCard` per catalog (which requires cross-pillar insights to cite a `ChipDomainTag` pair) — a raw calendar listing would just be an `EventCard`, not an insight, and doesn't belong on this card.*

1. **Mood (`mood_logs.mood_emoji`)**
   - Real: emoji selected, orange ring + `glow-you` bleed. `ChipProvenance`: `you logged`.
   - Low-confidence: not applicable — direct user selection is ground truth, not an estimate.
   - Honest-null: all five cells dashed-outline, unselected. Caption: `Select a mood to save`.
2. **Energy (`daily_checkins.energy`)**
   - Real: slider set 1–10. `ChipProvenance`: `you logged`.
   - Low-confidence: not applicable — direct input.
   - Honest-null: thumb rests at track start, ghosted track. Caption: `Slide to set energy`.
3. **Stress (`daily_checkins.stress`)**
   - Real: slider set 1–10. `ChipProvenance`: `you logged`.
   - Low-confidence: not applicable — direct input.
   - Honest-null: thumb rests at track start, ghosted track. Caption: `Slide to set stress`.
4. **7-day mood/energy trend (`GlassStatCard` sparkline, high density only)**
   - Real: solid orange 7-point line. `ChipProvenance`: `last 7 days`.
   - Low-confidence: dashed segments over any missed day (interpolated gap-fill, not a fabricated value). `ChipProvenance`: `estimated · gaps filled`.
   - Honest-null: fewer than 3 check-ins logged this week. `HonestNullState`: `Not enough data yet — 3 more days`.
5. **Tomorrow's cross-pillar insight (evening only, `CIAInsightCard`)**
   - Real: ≥14 days of joint mood + workout history. Insight renders full, `ChipDomainTag` pair (Mental/Wellbeing `#14b8a6` + Fitness `#ef4444`) as evidence, `BtnCoach` "See the pattern" + `BtnGhost` "Not now".
   - Low-confidence: partial joint history (3–13 days). Insight renders muted with `ConfidenceMeter` (purple, "low") + Caption `early pattern · low confidence`.
   - Honest-null: fewer than 3 days of joint history. `HonestNullState` inside the card: `Not enough data yet — 3 more days`. No calendar data, no invented pattern.

## 9. All states
- **Default:** solid metric cards, glass hero, glass reflection card, purple-glass insight card (evening).
- **Skeleton:** sheet slides up; `SkeletonState` blocks match each card's real geometry (mood row as 5 ghost circles, sliders as ghost tracks); sparkline skeleton is axis + ghost line only.
- **Empty / cold start:** trend card omitted entirely (no 7 days exist yet); mood cells render 15% larger to invite the first tap; hero sub swaps to the cold-start line (§7).
- **Loading (Tomorrow insight only):** `IntelligenceTimeline` staged captions with purple dot pulse, collapsing to the finished insight line — this is what the brief mislabeled as an "error string."
- **Error (genuine save failure):** quiet `ErrorState` tone — glyph + plain-language Body line + `BtnSecondary` "Try again", all input preserved locally. *Correction: the draft specified a "red border flash" on failure. Canon has no danger-red system color — red exists only as the Fitness domain tag and is explicitly "tags/icons only, never chrome." `ErrorState` is deliberately quiet and never alarming, so the red flash is removed outright, not recolored.*
- **Success:** `BtnPrimary` crossfades to its `BtnSuccess` treatment (forest green fill, checkmark) for 600ms, then the sheet springs down and a toast spawns on the origin screen.
- **Disabled:** Save sits at 40% opacity, no glow, inert, until a mood is selected — mood is the only required field; energy, stress, context tags, and intention/reflection are all optional, which is what makes the low-density sub-10-second path honest rather than a fake shortcut.
- **Offline:** `.glass-pill` banner, corrected copy (§7) — *the draft's original banner text ("showing last sync 2h ago") describes stale synced data being displayed, which doesn't apply here; this screen is fresh local input being saved, not a view of old data, so the honest framing is about local persistence, not staleness.* CTA relabels to `Save locally`.

## 10. Motion & interaction
- **Sheet:** spring in `cubic-bezier(0.32,0.72,0,1)`, 520ms (half) / 580ms (full); content cards stagger fade + translateY(8→0), 200ms each, 40ms offset.
- **MoodEmojiPicker:** tap = scale .98 + orange ring draw-in, 150ms, light haptic.
- **Slider:** thumb tracks the finger 1:1; each 1-unit tick = light haptic; value bubble crossfades tabular-nums.
- **ChipDomainTag:** 150ms background fade + scale .98 on toggle.
- **CIAPresenceOrb:** idle breathe, 4s ease, per catalog.
- **IntelligenceTimeline:** each caption fades in 200ms, holds 600ms, purple dot pulses 800ms loop; collapses to the summary line via 250ms crossfade.
- **Save:** `BtnPrimary`→`BtnSuccess` label/fill crossfade 200ms, hold 600ms, sheet springs down 380ms, toast appears once dismiss completes.
- **Reduced motion:** sheet uses a 150ms crossfade instead of a spring, no stagger (all cards present at once); MoodEmojiPicker and Slider skip the scale/ring-draw and swap state instantly (haptic still fires); orb breathing is replaced by a static glow; `IntelligenceTimeline` collapses straight to its end-state summary with no staged reveal; the save confirmation is a static swap held for 150ms.

## 11. Motivation-tier adaptation
- **Low density:** `Sheet` `half`. Hero (static, no orb animation) + `MoodEmojiPicker` + Save only. Energy/stress, context tags, intention/reflection, and the Tomorrow card are all hidden. Target: under 10 seconds, no scrolling.
- **Medium (default):** adds Energy + Stress sliders, the optional context-tag row (collapsed), the intention/reflection input, and the Tomorrow insight card in the evening. `Sheet` `half`, grows to scrollable if content exceeds viewport.
- **High density:** adds the 7-day trend `GlassStatCard`; context-tag row expanded by default; reflection input pre-focused on open. `Sheet` defaults to `full`.

## 12. Accessibility
- **Contrast:** paper-100 `#FEFAF3` on `--bg-base` `#0A0A0F` ≈ 19:1. Orange `#FF5E00` on `--surface-2` `#211008` measures ≈ 6.0:1 (computed), clearing AA for text down to body size, not just large-text/icon thresholds. Domain-tag label/icon colors sit at full saturation over their own 16% self-tint — QA should verify per-domain at build time; the warmest two (Fitness `#ef4444`, orange-adjacent) sit closest to the 4.5:1 floor and should be checked first.
- **44px targets:** `MoodEmojiPicker` cells are 44×44 minimum (visual glyph may render smaller inside a larger hit area); `Slider` thumbs, `ChipDomainTag` chips, and both footer buttons meet the same floor.
- **Screen-reader labels:** `MoodEmojiPicker` cells announce a sentiment word, not the glyph (e.g. "Mood: okay, selected") — never glyph-only. `Slider` announces value and range ("Energy, 7 out of 10"). `ChipDomainTag` announces domain name + toggle state. `CIAPresenceOrb` is grouped and hidden from the screen reader entirely to avoid announcement spam (breathing is decorative, not informational). The reflection/intention `GlassPillInput` carries an explicit label matching its visible overline, not just a placeholder.

## 13. Premium checklist
- [x] **Connects:** Tomorrow's insight is a real cross-pillar correlation (Mental/Wellbeing × Fitness) evidenced by a `ChipDomainTag` pair, not a generic calendar lookup — the draft's version wasn't actually "connecting" anything.
- [x] **Honest:** all five metrics carry the real/low-confidence/honest-null triple (or a justified not-applicable for direct input); Stress was added, the calendar-event framing was removed because it couldn't honestly support the triple as specified.
- [x] **Premium:** warm atmosphere, one purple pool (not two), selective glass tiering, `.glass-frost` reserved for the two genuinely immersive moments.
- [x] **One hero type moment:** the time-of-day word (*morning*/*evening*) carries the screen's single Display-level emphasis.
- [x] **One semantic glow per card, stated:** hero (`glow-cia`), intention (`glow-you`), Tomorrow (`glow-cia`, corrected from the draft's `glow-done`).
- [x] **60/30/10, honestly applied:** orange dominant (effort: mood ring, sliders, save CTA), purple as CIA bookends, green appearing exactly once and meaningfully (save confirmation) rather than padded in to hit a ratio.
- [x] **No exclamation marks / no CIA:** verified across every string; the brief's one CIA occurrence and one exclamation-toned overline are both gone.
- [x] **Sentence case:** all copy strings, including overlines (visual caps come from the type system, not the string).
- [x] **Privacy/safety:** `SafetyResourceCard` reachable, quiet, un-gamified, at scroll end.
- [x] **Reduced motion path:** defined for every animated element on the screen, including the new `IntelligenceTimeline` and `MoodEmojiPicker`.
- [x] **44px targets:** verified, including the new component's hit areas.
- [x] **Catalog compliance:** one honest `NEW:` (`MoodEmojiPicker`, real anatomical gap) after removing two catalog misuses from the draft — `ChipChoice` (not a defined component) corrected to `ChipDomainTag`, and a proposed `EmotionScaleBar` folded into the existing `Slider` as a variant instead of a new component.
- [x] **One `BtnPrimary`:** Save is the sole primary action; `BtnCoach`/`BtnGhost` on the insight card are secondary, `BtnSuccess` is a transient confirmation state of the same button, not a second primary.
