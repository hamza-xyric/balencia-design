# 45-daily-checkin - A+++ hi-fi mobile spec

## Header
- **Source ID:** 45
- **Source spec:** `Balencia-New-Screens/screens/45-daily-checkin.md`
- **Evidence:** screens/45-daily-checkin.md, work/briefs/45.md, work/drafts/45.md, Functional Content Brief: Daily Check-in (Morning / Evening)
- **Route(s):** `/wellbeing/emotional-checkin`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Daily Check-in is Balencia's twice-daily pulse-check - a sub-two-minute ritual that captures mood, energy, and stress in the moment.
- **Premium Visual Director:** make Daily check-in hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Daily check-in keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-------------------------------------+ 844
|              ---                    |
|  Cancel        evening check-in     |  72
+-------------------------------------+
|      purple pool              |
|         CIA orb (passive)         |
|                                      |
|   Good *evening*.                   | 168
|   Let's close out your day.         |
|   Two minutes. How did it go.       |
|    Day 14  checking in           |
+-------------------------------------+
|  how you're feeling                 |
|  ()  (o)  ()  ()  ()            | 132
|   ring on selected  orange bleed   |
|  + add context  [Career] [Fitness]  |
+-------------------------------------+
|  energy and stress                  |
|  low  ---o-----------  high    7    | 140
|    |
|  calm ------o---------  high   4    |
+-------------------------------------+
|  how today went                     |
|  +-----------------------------+    | 128
|  | Closed the deck. Slept      |    |
|  | badly the night before.     |    |
|  +-----------------------------+    |
+-------------------------------------+
|  tomorrow                      CIA |
|  +-------------------------------+  | 150
|  | You tend to feel *calmer* on  |  |
|  | days you train in the morning.|  |
|  | [Mental/Wellbeing][Fitness]   |  |
|  |        See the pattern  Not now|
|  +-------------------------------+  |
+-------------------------------------+
|  You're not alone. View support.    |  40
+-------------------------------------+
|        [   Save check-in   ]        |  90
+-------------------------------------+  0

Route handling: `/wellbeing/emotional-checkin`
```

## Focal Hierarchy
- **Dominant focal moment:** Daily check-in hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Sheet header - grabber, Cancel . with CIA only when the source supports a synthesized read.
- **Operational layer:** Mood - SolidCard, Energy & stress - SolidCard, Trend *, 7-day mood/energy line., *Correction.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*check*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **Sheet** - `half` by default; grows to `full` at high density or once the sheet's content exceeds one screen height and needs its own scroll.
- **CIAPresenceOrb** - passive breathing state, small (not the full-screen voice hero size), sits inside the atmosphere, not a separate card.
- **StreakCard** - replaces the draft's plain `ChipProvenance` for the streak meta. *Correction: the catalog already has a purpose-built component for exactly this (flame glyph + day count + `glow-you`, with an honest `recovered` state for broken streaks) - a caption chip would have thrown that honesty away.*
- **SolidCard** - Mood card; Energy & stress card.
- **MoodEmojiPicker** - `NEW:` compact horizontal single-select glyph picker, 5 cells. *Rationale: the catalog's only selection-card pattern is `ChoiceCardFrost` (stacked, numbered, titled MCQ card) - too heavy for a 44px-tall row of emoji. This is a small, real gap; promote at the next consistency barrier.* Anatomy: 44x44px circular tap targets, unselected = `--surface-3` fill, selected = orange 1.5px ring + `glow-you` bleed (borrows `ChoiceCardFrost`'s selection grammar for system consistency).
- **ChipDomainTag** - optional "what's this about" context row under mood (user attributes today's mood to a life domain in its true domain color); also cited as the evidence pair on the Tomorrow card.
- **Slider** - Energy (low<->high) and Stress (calm<->high) rows, `--surface-3` track, orange fill, tabular-nums value bubble. *Correction: the draft flagged a `NEW: EmotionScaleBar` for this - but the catalog's `Slider` already specifies a labeled track with a tabular-nums value bubble. Dual end-labels and 10-step snap ticks are a variant, not a new component; inventing one here would have fragmented the catalog for no anatomical gain.*
- **GlassStatCard** (`sparkline` variant) - 7-day mood/energy trend, high density only.
- **GlassCard** (default, radius 28) - Intention/reflection card.
- **GlassPillInput** (`multiline`, radius 20 per catalog override) - intention/reflection text.
- **CIAInsightCard** - Tomorrow card, evening only.
- **IntelligenceTimeline** - the card's own compute/loading trace (see 7, 9).
- **ConfidenceMeter** - low-confidence state of the Tomorrow insight.
- **SafetyResourceCard** - crisis resources, quiet, scroll end.

## Data Honesty
- *Correction: the brief listed a "Stress" metric in the Purpose and the SolidCard layout but never gave it an honesty state, and separately described the Tomorrow card as both a calendar-event lookup and a mood-exercise correlation - two different features. Resolved: Stress now has its own triple below, and the Tomorrow card is committed to one concept, the cross-pillar correlation, since that's the only version that's actually a `CIAInsightCard` per catalog (which requires cross-pillar insights to cite a `ChipDomainTag` pair) - a raw calendar listing would just be an `EventCard`, not an insight, and doesn't belong on this card.*
- **Mood (`mood_logs.mood_emoji`)**
- - Real: emoji selected, orange ring + `glow-you` bleed. `ChipProvenance`: `you logged`.
- - Low-confidence: not applicable - direct user selection is ground truth, not an estimate.
- - Honest-null: all five cells dashed-outline, unselected. Caption: `Select a mood to save`.
- **Energy (`daily_checkins.energy`)**
- - Real: slider set 1-10. `ChipProvenance`: `you logged`.
- - Low-confidence: not applicable - direct input.
- - Honest-null: thumb rests at track start, ghosted track. Caption: `Slide to set energy`.
- **Stress (`daily_checkins.stress`)**

## Consent and Safety
- Daily check-in keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wellbeing/emotional-checkin`. Do not add alternate vanity routes.

## States
- **Default:** solid metric cards, glass hero, glass reflection card, purple-glass insight card (evening).
- **Skeleton:** sheet slides up; `SkeletonState` blocks match each card's real geometry (mood row as 5 ghost circles, sliders as ghost tracks); sparkline skeleton is axis + ghost line only.
- **Empty / cold start:** trend card omitted entirely (no 7 days exist yet); mood cells render 15% larger to invite the first tap; hero sub swaps to the cold-start line (7).
- **Loading (Tomorrow insight only):** `IntelligenceTimeline` staged captions with purple dot pulse, collapsing to the finished insight line - this is what the brief mislabeled as an "error string."
- **Error (genuine save failure):** quiet `ErrorState` tone - glyph + plain-language Body line + `BtnSecondary` "Try again", all input preserved locally. *Correction: the draft specified a "red border flash" on failure. Canon has no danger-red system color - red exists only as the Fitness domain tag and is explicitly "tags/icons only, never chrome." `ErrorState` is deliberately quiet and never alarming, so the red flash is removed outright, not recolored.*
- **Success:** `BtnPrimary` crossfades to its `BtnSuccess` treatment (forest green fill, checkmark) for 600ms, then the sheet springs down and a toast spawns on the origin screen.
- **Disabled:** Save sits at 40% opacity, no glow, inert, until a mood is selected - mood is the only required field; energy, stress, context tags, and intention/reflection are all optional, which is what makes the low-density sub-10-second path honest rather than a fake shortcut.
- **Offline:** `.glass-pill` banner, corrected copy (7) - *the draft's original banner text ("showing last sync 2h ago") describes stale synced data being displayed, which doesn't apply here; this screen is fresh local input being saved, not a view of old data, so the honest framing is about local persistence, not staleness.* CTA relabels to `Save locally`.

## Motion
- **Sheet:** spring in `cubic-bezier(0.32,0.72,0,1)`, 520ms (half) / 580ms (full); content cards stagger fade + translateY(8->0), 200ms each, 40ms offset.
- **MoodEmojiPicker:** tap = scale .98 + orange ring draw-in, 150ms, light haptic.
- **Slider:** thumb tracks the finger 1:1; each 1-unit tick = light haptic; value bubble crossfades tabular-nums.
- **ChipDomainTag:** 150ms background fade + scale .98 on toggle.
- **CIAPresenceOrb:** idle breathe, 4s ease, per catalog.
- **IntelligenceTimeline:** each caption fades in 200ms, holds 600ms, purple dot pulses 800ms loop; collapses to the summary line via 250ms crossfade.
- **Save:** `BtnPrimary`->`BtnSuccess` label/fill crossfade 200ms, hold 600ms, sheet springs down 380ms, toast appears once dismiss completes.
- **Reduced motion:** sheet uses a 150ms crossfade instead of a spring, no stagger (all cards present at once); MoodEmojiPicker and Slider skip the scale/ring-draw and swap state instantly (haptic still fires); orb breathing is replaced by a static glow; `IntelligenceTimeline` collapses straight to its end-state summary with no staged reveal; the save confirmation is a static swap held for 150ms.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wellbeing/emotional-checkin`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper-100 `#FEFAF3` on `--bg-base` `#0A0A0F`  19:1. Orange `#FF5E00` on `--surface-2` `#211008` measures  6.0:1 (computed), clearing AA for text down to body size, not just large-text/icon thresholds. Domain-tag label/icon colors sit at full saturation over their own 16% self-tint - QA should verify per-domain at build time; the warmest two (Fitness `#ef4444`, orange-adjacent) sit closest to the 4.5:1 floor and should be checked first.; **44px targets:** `MoodEmojiPicker` cells are 44x44 minimum (visual glyph may render smaller inside a larger hit area); `Slider` thumbs, `ChipDomainTag` chips, and both footer buttons meet the same floor.; **Screen-reader labels:** `MoodEmojiPicker` cells announce a sentiment word, not the glyph (e.g. "Mood: okay, selected") - never glyph-only. `Slider` announces value and range ("Energy, 7 out of 10"). `ChipDomainTag` announces domain name + toggle state. `CIAPresenceOrb` is grouped and hidden from the screen reader entirely to avoid announcement spam (breathing is decorative, not informational). The reflection/intention `GlassPillInput` carries an explicit label matching its visible overline, not just a placeholder.
