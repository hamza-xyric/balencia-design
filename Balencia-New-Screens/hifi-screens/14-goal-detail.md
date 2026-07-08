# 14-goal-detail - A+++ hi-fi mobile spec

## Header
- **Source ID:** 14
- **Source spec:** `Balencia-New-Screens/screens/14-goal-detail.md`
- **Evidence:** screens/14-goal-detail.md, work/briefs/14.md, work/drafts/14.md, Functional Content Brief: Mission Detail
- **Route(s):** No live route; stack-pushed mission detail keyed from Mission Board [13] or Home [12].
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Answer two questions in order: "am I on track?" at a glance via the hero ring, then "what's the whole picture?" through progressive disclosure.
- **Premium Visual Director:** make Mission detail hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Mission detail uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|           (warm glow, top-center) |
|                                       |
|   Back           Mission          |  TopBar - transparent, glass-pill after scroll
|                                       |
|              +---------+             |
|              |   72%   |             |  ProgressRing  glow-you  sweeps on mount
|              +---------+             |
|                                       |
|           Hyrox Relay Prep           |  Display 34 - the one hero type moment
|        [  Fitness ]  [  Mental ]  |  ChipDomainTag x2, tappable -> dashboards
|                                       |
| +-----------------------------------+ |
| |  Actions    Streak       XP       | |  KPIRow  SolidCard  glow-you
| |    12         8         450       | |
| | you logged you logged  system     | |  compact ChipProvenance per stat
| +-----------------------------------+ |
|                                       |
| +-----------------------------------+ |
| |  Three tempo runs this week,     | |  CIAInsightCard  GlassCard default
| |   each faster than the last.      | |  glow-cia, radius 28
| |   This is what *momentum* looks   | |
| |   like.                           | |
| |   via WHOOP  pace      Ask CIA -> | |  evidence ChipProvenance + BtnGhost
| +-----------------------------------+ |
|                                       |
| +-----------------------------------+ |
| | ( ) 20-min easy run - tomorrow     | |  ActionCheckCard (NEW)  SolidCard
| |     tap the circle to mark done    | |  glow-you
| +-----------------------------------+ |
|                                       |
| +- ALL ACTIONS -----------------   + |  SectionHeader + ExpandableList (NEW)
| +- MILESTONES ------------------   + |  glow-done
| +- CIA REASONING ---------------   + |  glow-cia
| +- CROSS-DOMAIN LINKS ----------   + |  glow-you
| +- PROGRESS OVER TIME ----------   + |  glow-cia
| +-----------------------------------+ |  all collapsed by default (9, 11)
|                                       |
|            v scroll for more         |
|                                       |
|       GlassNavBar - floating,     |
|       omitted here for clarity   |
+--------------------------------------+

Route handling: No live route; stack-pushed mission detail keyed from Mission Board [13] or Home [12].
```

## Focal Hierarchy
- **Dominant focal moment:** Mission detail hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere & nav with CIA only when the source supports a synthesized read.
- **Operational layer:** Hero ring, Mission identity, KPI row, CIA intelligence.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*detail*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - back chevron (44px target), title, pin toggle, edit glyph. Transparent over atmosphere; gains `.glass-pill` (`rgba(10,10,15,.55)`, blur 24px, border `rgba(255,255,255,.10)`, radius 999) once content scrolls under.
- **ProgressRing** - hero, stroke 8px, tabular-nums center, track `rgba(255,255,255,.08)`.
- **ChipDomainTag** - x2, tappable, domain color at 16% bg (CANON 4).
- **KPIRow** - 3 inline mini-stats (Actions, Streak, XP) inside one SolidCard, hairline dividers, each mini-stat keeps its own provenance.
- **CIAInsightCard** - purple-tinted GlassCard, spark glyph, one Tiempos-italic word, evidence row (ChipProvenance), `Ask CIA ->` as BtnGhost. This card *is* the screen's chat exit - no separate persistent affordance (see 4 fix).
- **NEW: ActionCheckCard** - SolidCard integrating a large tap-target checkbox + action title. *Rationale: bundling the next action and its own completion mechanism into one tappable surface removes the extra decision of "which button confirms this." Because the checkbox already is the primary action, this screen carries no separate BtnPrimary (see 5 note below) - a second full-width button would have contradicted the reason this component exists.*
- **SectionHeader** - Overline + trailing chevron, drives all five accordions.
- **NEW: ExpandableList** - accordion body wrapper (SectionHeader trigger + SolidCard content pane, spring-collapse 200ms). *Rationale: the catalog has no expand/collapse primitive; this composes two existing components (SectionHeader, SolidCard) rather than inventing new visual language, so it's a thin wrapper, not a new surface.*
- **TrendChart** - inside Progress Over Time; solid orange user line, dashed purple projection, green milestone dots.
- **IntelligenceTimeline** - inside CIA Reasoning when expanded; staged trace (`checking your training log` -> `comparing to last month`), collapses to one summary line at rest.
- **ListRow** - rows inside Cross-Domain Links (domain icon + linked mission/dashboard name + chevron) and inside the stalled-mission Sheet (9).
- **Sheet** (variant `action`) - stalled-mission "see options" surface; four ListRow choices.
- **ChipProvenance** - standard pill beside Mission Completion % and the CIA evidence row; compact caption variant inside KPIRow where a full 24px pill would crowd a three-up stat row at 390px (mobile-reality adaptation, not a new component).
- **ConfidenceMeter** - purple, appears only in the Mission Completion % low-confidence state.

## Data Honesty
- Every metric ships three states. Where a genuine estimated variant doesn't exist for a deterministic count, that slot is filled with a stated, justified "not applicable" rather than an invented number (per this pass's honesty rule) - this still counts as the third state, it just tells the truth about what the data can and can't be.
- **Mission completion %**
- - *Real:* 72% + `ChipProvenance`. Provenance is conditional, not fixed: missions whose actions sync from a wearable (this Hyrox example) cite `via WHOOP`; missions tracked by manual log alone cite `system calculated`. *(Fix: the draft hard-coded "via WHOOP" as if every mission's completion synced from a wearable, which isn't true for a Finance or Learning mission using this same template.)*
- - *Low-confidence:* 72% at 64% opacity + `estimated  low confidence` + `ConfidenceMeter` (purple) - shown only when the contributing wearable sync is partial (e.g., today's run hasn't finished processing).
- - *Honest-null:* "Not enough data yet - 3 more days to calibrate," ring renders ghosted at 0%.
- - Note: completion % is a weighted read of milestone/sub-goal progress - not a restatement of the action count below. The two numbers can move independently, and each carries its own honesty states.
- **Action count**
- - *Real:* 12, `you logged`.
- - *Low-confidence:* **not applicable** - a logged count is exact by definition; there is no statistical estimate of how many times you tapped log.
- - *Honest-null:* "No actions logged yet."

## Consent and Safety
- Mission detail uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** hero ring sweeps on mount; all five expandable sections collapsed (matches 4/11 - the draft's own wireframe had shown "All Actions" pre-expanded, which contradicted this row; now consistently collapsed).
- **Skeleton:** `SkeletonState` shimmer blocks (`--surface-3` base, 1.2s sweep) replace ring/text; TrendChart skeletons as axis + ghost line.
- **Empty (cold start):** 0% ring, ghosted track, dashed future milestones, KPI row zeroed with honest-null copy (8), cold-start CIA copy (7).
- **Error:** `ErrorState` inline in the CIA card's position: glyph, "Couldn't load this mission," `BtnSecondary` "Retry." Ring retains last cached value rather than resetting to zero (never invents a fresh number, never blanks a real one).
- **Offline:** `OfflineBanner`/`SyncStatus` pinned under TopBar (7); Next Action card stays interactive, queues completion locally.
- **Stalled** (no action in 7 days): CIA card swaps to the stalled coaching copy + `Sheet` flow (7).
- **Success (completion):** ring sweeps to 100% and flips green (`--glow-done`), `CelebrationOverlay` draws its continuous-stroke line motif once, Next Action card is replaced by the chain-extension preview (7). Respects reduced-motion (fade-only variant, per catalog).
- **Loading tap (disabled):** ActionCheckCard's checkbox shows a locked-width spinner in place of its check state while a completion write is in flight; nothing else on the card is disabled.

## Motion
- **Hero ring:** 0 -> 72% sweep on mount, 520ms physical ease-out (an entrance moment, deliberately longer than the 150-250ms interaction-feedback window). On action completion, a shorter 250ms re-sweep matches the catalog's own ProgressRing completion timing.
- **Next action completion:** old ActionCheckCard fades/slides down, replacement slides up, 250ms ease-in-out.
- **Accordion expand/collapse:** ExpandableList spring 200ms; chevron rotates 180.
- **CIA Reasoning expand:** `IntelligenceTimeline` stages reveal at ~180ms intervals (`checking your training log` -> `comparing to last month`), then collapses to one summary Caption once resolved.
- **Sheet (stalled options):** spring in 250ms, per catalog.
- **Chart drawing:** solid orange line draws left-to-right, dashed purple projection draws after it resolves; long-press triggers crosshair scrub.
- **Glow behavior:** every glow (6) breathes on a shared 4s opacity cycle - one rhythm across the screen rather than five uncoordinated pulses.
- **Haptics:** light impact on checkbox completion; medium impact on milestone unlock; no haptic on accordion expand (too frequent an interaction to warrant one).

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; stack-pushed mission detail keyed from Mission Board [13] or Home [12]..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper-100 `#FEFAF3` on `--bg-base` `#0A0A0F` and on `--surface-2` `#211008` exceeds AA+ (16:1 / 11.7:1 respectively).; **Targets:** back, pin, edit, and the ActionCheckCard checkbox all map to 44x44px minimum hit regions, independent of their visual glyph size; ChipDomainTag pills get equivalent hit-slop padding even though their visual pill is shorter.; **Screen reader:** glyph-only controls carry labels ("Pin to home screen," "Edit mission"); ProgressRing announces "72 percent complete"; ConfidenceMeter announces "estimated, low confidence" alongside its value, never the number alone.
