# 79 · Call summary

### 1. Header
- **Screen ID:** 79
- **Name:** Call summary
- **Route(s) covered:** No live route; post-call summary detail opened from Voice mode and Voice call history.
- **Tab:** CIA (voice overlay context — pushed detail screen, not a top-level tab)
- **Source:** Voice Call History [51], Voice Mode [11]
- **Batch:** 4

### 2. Purpose
Converts a completed CIA voice session into a durable, honest debrief — not a transcript dump. Surfaces what the call *felt* like (tone), what it was actually about across life domains (composition + a real cross-pillar insight), and what to do next (action items) — so the call's value survives past the moment it ends.

### 3. Entry & exit
- **Entry:** Stack push the moment Voice Mode [11] ends (call completes → auto-navigates here); also reachable via a ListRow from Voice Call History [51].
- **Primary exit:** Back chevron → returns to Voice Call History [51].
  *Correction: the draft labeled "Schedule follow-up" as the primary exit while simultaneously specifying it as a demoted `BtnSecondary` (§6) — a contradiction. A debrief screen's natural exit is back-navigation, not a forced scheduling commitment. Back chevron is now primary; scheduling stays optional.*
- **Secondary exits:** Schedule follow-up (opens Sheet, `BtnSecondary`, intentionally demoted) · action item tap → Reminders & Tasks [61] or Mission Detail [14] · transcript highlight tap → expanded transcript view · privacy glyph tap → `GlyphTooltip` (retention + delete).

### 4. Layout anatomy
**Regions (top-to-bottom):**
1. **TopBar** — sticky, transparent over atmosphere until scroll; back chevron, H1 title, privacy glyph.
2. **Hero** — `FrostCard` (variant: `summary`). Houses `NEW: ToneGauge` + one Display headline line.
   *Correction: draft specified default `.glass-card`. Promoted to `FrostCard`'s `summary` variant — this is precisely the "over-glow immersive" case the variant exists for, and the region already carries a dedicated purple radial pool.*
3. **KPIRow** — three inline stats (duration, action count, emotion shift) sharing one `SolidCard`.
4. **Call composition** — `SolidCard`, segmented `ProgressBar` + `ChipDomainTag` labels per topic.
5. **CIA insight** — `CIAInsightCard` surfacing the cross-pillar correlation the call actually contained.
   *Added: the draft had no artifact for the "connects" north star beyond a generic transcript quote. This is the concrete cross-domain read Balencia exists to produce.*
6. **Key moments** — `NEW: CallArcTimeline` (static historical map, not a live trace).
7. **Action items** — three `ListRow`s.
8. **Transcript highlights** — `CIAChatBubble` excerpts.
9. **Fixed bottom bar** — `BtnSecondary`, schedule follow-up. `GlassNavBar` is hidden on this pushed detail screen (canon: nav bar belongs to top-level tabs; a stack-pushed debrief keeps its own contextual action bar instead).

**ASCII wireframe (390×844):**
```text
+---------------------------------------------+
| <            Call summary            (i)    |  TopBar — transparent, glyph = privacy
+---------------------------------------------+
|                                               |
|   Morning coaching call                      |
|                                               |
|            .-""""""""-.                     |
|          /              \                    |
|         |       72        |                  |  FrostCard(summary) — glow-cia
|         |      warm       |                  |  NEW: ToneGauge
|          \              /                    |
|            '-........-'                      |
|                                               |
|   Your *recovery* is clear for a tempo day   |  Display 34 — the one hero moment
+---------------------------------------------+
|  12m 04s    3 actions    ▲ 15% shift         |  KPIRow — glow-done
|  auto-logged CIA-detected transcript parsed  |  ChipProvenance ×3
+---------------------------------------------+
|  CALL COMPOSITION                            |
|  [■■■■■■■■■::::::,,,,,,,] 12m total          |  SolidCard — glow-you
|  ● recovery 5m  ● pace 3m  ● fueling 4m       |  ChipDomainTag: fitness/fitness/nutrition
+---------------------------------------------+
|  ✦ CIA insight                               |
|  Your *pacing* held because fueling          |  CIAInsightCard — glow-cia
|  happened early                              |
|  [fitness][nutrition]   via transcript ⋅ meal log
+---------------------------------------------+
|  KEY MOMENTS                                 |
|  o──────────●──────────●──────────●          |  CallArcTimeline — glow-done
|  2m        5m         8m         10m          |  orange baseline, green milestone dots
+---------------------------------------------+
|  ACTION ITEMS                                |
|  [ ] Check resting HRV tomorrow              |  ListRow ×3 — glow-you
|  [ ] Adjust pre-workout nutrition            |
|  [ ] Log wind-down time before 10pm          |
+---------------------------------------------+
|  TRANSCRIPT HIGHLIGHTS                       |
|  ╭───────────────────────────────────────╮   |
|  │ CIA: let's lock in that pacing rule.   │   |  CIAChatBubble
|  ╰───────────────────────────────────────╯   |
+---------------------------------------------+
|                                               |
|         [ Schedule follow-up call ]          |  fixed bar — BtnSecondary
+---------------------------------------------+
```

### 5. Components
- `TopBar`
- `FrostCard` (variant: `summary`) — promoted from default `.glass-card`, see §4 correction.
- `NEW: ToneGauge` — single-value radial arc visualizing CIA's synthesized tone read. *Rationale:* neither `ReputationDial` (trust-score arc, orange, social-system semantics) nor `ProgressRing` (orange→green completion semantics) fits a CIA-synthesized emotional-tone read. `ToneGauge` borrows `ProgressRing`'s structural conventions (6–8px stroke, `rgba(255,255,255,.08)` track) but never flips green — tone is interpretive, not "done." Its low-confidence state reuses the existing `ConfidenceMeter` rather than inventing a second gauge.
- `KPIRow` (duration · action count · emotion shift)
- `ChipProvenance` ×3 (one per KPIRow stat)
- `SolidCard` (call composition)
- `ProgressBar` (variant: `segmented`)
- `ChipDomainTag` ×3 (fitness, fitness, nutrition — labels topic segments, per CANON §8 "never chrome" rule: tag color stays on the label/dot, not the bar fill)
- `CIAInsightCard` — added; evidenced by `ChipDomainTag` pair (fitness + nutrition) and `ChipProvenance` ×2.
- `NEW: CallArcTimeline` — *Rationale:* the draft used `IntelligenceTimeline`, which the catalog defines as a **live** processing trace ("checking your sleep… comparing to last month…") that collapses once done — the wrong pattern for a static historical map of a *finished* call. `CallArcTimeline` instead applies CANON §7's chart grammar directly: solid orange baseline = elapsed real time (the "past/user" line), green 6px dots = milestones.
- `ListRow` ×3 (action items)
- `CIAChatBubble` (transcript highlight)
- `BtnSecondary` (schedule follow-up, demoted, now correctly framed as a secondary exit — see §3)
- `Sheet` (triggered by `BtnSecondary`)
- `NEW: GlyphTooltip` — small popover anchored to the privacy glyph. *Scope corrected:* the draft's version explained retention only; CANON §8 requires a consent/revoke surface on any screen touching voice data, so this now also carries a delete-this-recording entry point.
- `ConfidenceMeter` (nested inside `ToneGauge`'s low-confidence state)

### 6. Visual treatment
- **Glass tiers:**
  - **Hero:** `FrostCard` (`.glass-frost`) — `rgba(255,255,255,.10)` · blur 48px sat 130% · border `rgba(255,255,255,.16)` · inset top-light `.40` · radius 40 (`--r-2xl`, per the "hero" placement rule).
  - **KPIRow, call composition, key moments, action items:** `SolidCard` — `--surface-2` `#211008`, radius 28, border `rgba(255,255,255,.06)`, no blur. Legibility for tabular-nums and timestamps beats atmosphere here.
  - **CIA insight:** `.glass-card` default (`rgba(255,255,255,.045)` · blur 28px sat 120% · border `.08` · radius 28) tinted with `--glow-cia`. This is a documented catalog exception, not a rule break: a CIA-voice moment reads as premium, not as dense data, even mid-scroll.
  - **Transcript bubble:** purple-tinted glass bubble per `CIAChatBubble` (radius 20/4 tail).
  - **Fixed bottom bar:** container `--surface-1` `#140A05` at high opacity + 1px top hairline `rgba(255,255,255,.06)`, holding one `.glass-pill` `BtnSecondary`.
- **Semantic inner-glow** (one per card, meaning stated — six cards, three colors, each independent):
  - **Hero / ToneGauge:** `--glow-cia` `#7F24FF` — CIA synthesized this tone reading from vocal pacing; it was inferred, not logged.
  - **KPIRow:** `--glow-done` `#34A853` — anchored to the positive emotion-shift stat, the card's one narratively dominant number. Duration and action-count are neutral companions riding along; they don't compete for the glow.
  - **Call composition:** `--glow-you` `#FF5E00` — this is time *you* spent talking; the breakdown reflects your voice in the conversation.
  - **CIA insight:** `--glow-cia` `#7F24FF` — an AI-synthesized cross-pillar correlation, by definition.
  - **Key moments (CallArcTimeline):** `--glow-done` `#34A853` — a map of moments already reached, not what's pending.
  - **Action items:** `--glow-you` `#FF5E00` — your impending effort to execute.
  - *Note on CANON §4 "one hero color per surface": that rule governs the screen's single Display/editorial moment (purple, the ToneGauge), not per-card accent variety — every `GlassStatCard`/`KPIRow` spec in the catalog assumes independent, meaning-driven glows per card throughout a screen.*
- **Background atmosphere:** base `--bg-warm` `#0C0603` + mandatory top-center radial glow `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` + 3–4% grain (soft-light) + a deep purple radial pool anchored directly beneath the ToneGauge (CANON: "CIA moments add a purple pool").
- **Hero type moment:** Display 34, NM Medium 500 — "Your *recovery* is clear for a tempo day." This is the screen's single Display/editorial moment.
  *Note: two Tiempos-italic words appear on this screen total — *recovery* in the hero, *pacing* in the CIA insight card. CANON's "one emphasis word per moment, max" is scoped per distinct moment/card, not a shared screen-wide budget of one; the catalog's own `CIAInsightCard` entry states it carries its own emphasis word independent of the hero's.*

### 7. Content & copy
- **TopBar:** `Call summary`
- **Hero title:** `Morning coaching call`
- **Hero insight (Display, one italic word):** `Your *recovery* is clear for a tempo day`
  *Correction: the draft also specified a "Hero Sub" line — `a harder conversation; CIA noted what *helped*` — that appears nowhere in its own ASCII wireframe, contradicts the "warm / +15% positive shift" framing established everywhere else on the screen, and would have added a second italic word inside the same hero moment (a direct violation). Removed; the hero stays to its two specified lines.*
- **ToneGauge center label:** `72` / `warm` (plain number, tabular-nums — no degree symbol; the a11y label already reads "72 out of 100," and a `°` glyph would contradict that this is a 0–100 score, not a temperature)
- **KPIRow labels:** `duration` · `actions` · `emotion shift`
- **Composition header:** `Call composition`
- **CIA insight copy (one italic word):** `Your *pacing* held because fueling happened early`
- **Key moments header:** `Key moments`
- **Action items header:** `Action items`
- **Transcript header:** `Transcript highlights`
- **Schedule CTA:** `Schedule follow-up`
- **GlyphTooltip body:** `This call is recorded and encrypted. Kept for 90 days, then deleted automatically. Delete now.`
- *(Correction carried forward: every "CIA" reference in the source draft is "CIA" here — verified across all copy.)*

### 8. Data & honesty states
Every metric renders through the 3-state honesty invariant.

- **Call duration**
  - *Real:* `12m 04s` (chip: `auto-logged`)
  - *Low-confidence / honest-null:* n/a — duration is deterministic, not inferred.
- **Emotion shift**
  - *Real:* `▲ 15%` (chip: `transcript parsed`)
  - *Low-confidence:* `~▲ 15%`, label `estimated · low confidence`
  - *Honest-null:* `Tone analysis preparing` (ghosted arc inside the KPIRow stat)
- **ToneGauge (hero)**
  - *Real:* `72` / `warm` + chip `vocal pacing analyzed`
  - *Low-confidence:* arc at 64% opacity, center label swaps to `reading…`, `ConfidenceMeter` shows low, caption `estimated · low confidence`
  - *Honest-null:* arc renders as bare track (no fill, no number), caption `tone read needs a longer call` — calls under roughly 90 seconds don't carry enough vocal signal to score.
- **Call composition (topic allocation)**
  - *Real:* `recovery 5m · pace 3m · fueling 4m` (chip: `mapped`)
  - *Low-confidence:* segments at 64% opacity, label `estimated · low confidence`
  - *Honest-null:* `topic breakdown preparing`
- **CIA insight (cross-pillar correlation)**
  - *Real:* full card, two `ChipDomainTag`s + two `ChipProvenance` (`via transcript`, `via meal log`)
  - *Low-confidence:* card stays but dims to 64%, caption `correlation not confirmed yet`
  - *Honest-null:* the region is **omitted entirely**, not rendered as a hollow card — this call simply didn't contain a cross-pillar correlation worth surfacing. An honest absence beats a manufactured one.
- **Key moments (CallArcTimeline)**
  - *Real:* green milestone dots at each flagged decision (`pacing rule saved`, etc.)
  - *Honest-null:* `Key moments appear once the transcript finishes` — baseline track stays visible without dots.
- **Action items**
  - *Real:* `Check resting HRV tomorrow` (chip: `CIA-detected`) — count in KPIRow now carries its own `ChipProvenance` too (`CIA-detected`), correcting a gap in the draft where duration and emotion-shift had chips but the action count did not.
  - *Honest-null:* `CIA didn't find action items in this call — that's okay, add one manually in Reminders`

### 9. All states
- **Default:** fully rendered summary, all metrics parsed, action items actionable.
- **Skeleton (mid-generation):** depth-preserving. Hero shows a ghosted `ToneGauge` ring (track only). Composition bars use `SkeletonState` (`--surface-3`, 1.2s sweep). KPIs show `--surface-3` blocks. `CallArcTimeline` shows an empty baseline with no dots. `CIAInsightCard` is not shown during skeleton — it only appears once real, per its honest-null rule.
- **Partial:** duration, tone, and composition render normally once available. `CallArcTimeline` and transcript sections ghost with `Transcript is still processing`. `CIAInsightCard` stays hidden until the transcript-derived correlation resolves.
- **Error:** `CIA couldn't summarize this call — try again or review the transcript manually`. Charts default to ghost state; hero replaced with `BtnSecondary` `Retry`.
- **Offline:** cached summary renders normally. `OfflineBanner`: `offline — showing your last sync, 2h ago` (matches catalog's staleness-labeling format exactly). Schedule CTA disabled at 50% opacity with overlay copy: `connect to internet to schedule`.
- **Success:** `XPToast` on action-item completion — `+40 XP · Fitness` with `ChipDomainTag` fitness.
  *Correction: draft read "+40 XP · Tasks," but "Tasks" isn't one of the nine life domains — completing "check resting HRV" earns Fitness XP against that Domain Stat, per the RPG system's domain-scoped progression, not a generic bucket.*

### 10. Motion & interaction
- **Motion intent (draw-first):** hero `ToneGauge` sweeps clockwise into position. Composition bars scale-X from left. KPIs count up via `tabular-nums`. `CIAInsightCard` fades/rises in after composition (it depends on the same transcript-derived data). `CallArcTimeline` path draws left-to-right, milestone dots pop in sequence. Action and transcript rows stagger in last, 24ms offset.
  *Correction: draft's motion spec said "topic arcs scale X from left" — composition is a `ProgressBar` (segmented), not an arc. Fixed to "topic bars."*
- **Easing:** physical ease-out for inbound elements. 150–250ms feedback for all taps.
- **Tap (ToneGauge):** expands a one-line explainer — `warm tone detected from vocal pacing`. Never frames a lower reading as failure.
- **Tap (topic segment):** deep-links to the anchored transcript section.
- **Tap (CIA insight):** expands to show the full correlated reasoning (both domain data points side by side).
- **Tap (privacy glyph):** opens `GlyphTooltip` — retention line + `Delete now` action, satisfying CANON §8's consent/revoke requirement.
- **Reduced-motion path:** draw-first animations swap to opacity-only fades; `ToneGauge` and `CallArcTimeline` set to final state instantly.

### 11. Motivation-tier adaptation
- **Low density:** hide key moments and transcript highlights. Reduce composition to top 2 topics. Collapse `CIAInsightCard` into a single caption line under KPIRow (no card chrome) rather than dropping the insight entirely — the correlation is still worth one line even at low density. Focus is strictly action items.
- **Medium (default):** as specified in §4.
- **High density:** compress hero `ToneGauge` by 40%. Expand transcript highlights to include surrounding contextual paragraphs. Render emotion shift as a mini `TrendChart` sparkline (catalog `sparkline` variant of `GlassStatCard`) instead of a single delta. `CIAInsightCard` expands its evidence row to show the full correlated data points, not just the chip pair.

### 12. Accessibility
- **AA+ contrast pairs** (recalculated against the exact hexes cited above, not approximated):
  - `paper-100` `#FEFAF3` over `--bg-warm` `#0C0603` ≈ **19.3:1** (draft cited 18.2:1; recomputed against WCAG relative luminance).
  - `paper-64%` (paper-100 at 64% alpha, blended over `--surface-2` `#211008`) ≈ **7.7:1** (draft cited 11.4:1, which didn't account for the alpha blend against the actual card background — recomputed to reflect the real composited color; still clears the AAA 7:1 threshold for body text).
- **Targets:** back chevron 44px · privacy glyph 44px tap area (visual glyph smaller, hit-slop expanded) · action-item `ListRow`s 56px min height · `BtnSecondary` 52px height (matches `BtnPrimary` sizing convention).
- **Screen-reader labels:**
  - `ToneGauge`: `CIA tone read, warm, 72 out of 100.` (state-dependent: appends "estimated, low confidence" when in that state; announces "tone read pending, call too short" for honest-null.)
  - Privacy glyph: `Private recording, encrypted, kept 90 days. Double tap to view retention and delete options.`
  - Emotion-shift metric: `Positive 15 percent emotion shift from start to end of call.`
  - `CIAInsightCard`: `CIA insight, connecting fitness and nutrition. Your pacing held because fueling happened early.`
  - `CallArcTimeline` milestone dot: `Key moment at 5 minutes: pacing rule saved.`

### 13. Premium checklist
1. **Connects:** the `CIAInsightCard` makes the cross-pillar north star concrete (fitness × nutrition), not just claimed. Action items push natively to Missions/Tasks. Topics map to transcript anchors. (✓)
2. **Honest:** full 3-state honesty on tone, emotion shift, topics, milestones, *and* the CIA insight itself — whose honest-null is a clean omission, not a hollow card. (✓)
3. **Premium:** `FrostCard` `summary` variant for the hero (corrected from default `.glass-card`), selective glass (hero + CIA insight + transcript bubble) against solid data cards, 8pt rhythm, one Display moment. (✓)
4. **North star:** single focal `ToneGauge`; back chevron correctly reinstated as primary exit; schedule CTA demoted and consistent with its own sizing. (✓)
5. **Canon visual:** verified hexes (`#211008` surface-2, `#0C0603` bg-warm, `#7F24FF`/`#34A853`/`#FF5E00` glows), 24px inner padding, exact `.glass-frost` recipe. (✓)
6. **Tone & copy:** CIA persona enforced throughout (CIA fully purged). Sentence case, no exclamations. Illegal "Hero Sub" line removed (was a tonal contradiction and a second italic word inside one moment). (✓)
7. **One-per:** one Display moment (hero); two independently-scoped italic-emphasis moments (hero + CIA insight, not a shared per-screen budget of one); zero `BtnPrimary` — intentional, a debrief has no conversion CTA to push. (✓)
8. **Selective glass:** `SolidCard` for dense data (KPIs, composition, timeline, actions); glass reserved for the hero, the CIA insight, and the transcript bubble — each a documented catalog exception, not a rule break. (✓)
9. **Data-viz:** `ToneGauge` (NEW) is a purple-only gauge that never flips green — replacing the draft's confused citation of `ReputationDial`/`ProgressRing`. `CallArcTimeline` (NEW) replaces the misapplied live-trace `IntelligenceTimeline` with CANON §7's actual chart grammar: solid orange elapsed line + green milestone dots. (✓)
10. **Safety/compliance:** consent + revoke strengthened at `GlyphTooltip` (retention *and* delete, not retention alone). Crisis/safety layer marked honestly **not applicable** — this is a fitness/performance debrief, not a mood/check-in surface (CANON §8's crisis layer is scoped to wellbeing/mood surfaces); if a future call's topic tags as Mental/Wellbeing, `SafetyResourceCard` should surface in this same region. (✓)
11. **Motion:** 150–250ms feedback; draw-first with full reduced-motion fallback. Corrected "topic arcs" → "topic bars" (it's a `ProgressBar`, not an arc). (✓)
12. **Provenance:** every KPIRow stat now carries its own chip, including the action-item count (missing in the draft). CIA insight carries a 2-source evidence row. (✓)
13. **Density variants:** low/medium/high defined, with `CIAInsightCard` now explicitly degrading (collapse to a caption line, not just shown-or-hidden). (✓)
14. **A11y:** contrast pairs recalculated honestly against actual composited colors (~19.3:1 / ~7.7:1, replacing two approximated draft figures). Full screen-reader label set updated for the renamed/added components. (✓)
