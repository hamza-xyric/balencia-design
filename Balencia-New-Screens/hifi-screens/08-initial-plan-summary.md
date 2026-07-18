# 08-initial-plan-summary - A+++ hi-fi mobile spec

## Header
- **Source ID:** 08
- **Source spec:** `Balencia-New-Screens/screens/08-initial-plan-summary.md`
- **Evidence:** screens/08-initial-plan-summary.md, work/briefs/08.md, work/drafts/08.md, functional content brief "Initial Plan Summary"
- **Route(s):** `/onboarding`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: The first time *CIA* hands the plan back.
- **Premium Visual Director:** make Initial plan summary hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Initial plan summary uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| 9:41                               |  status bar
|                                        |
|                                       |  TopBar  back chevron only
|                                        |
|      here's your *plan*.             |  CIAInsightCard  frost, header-only
|       i've broken down your missions   |  glow-cia
|       into daily actions across        |
|       3 life areas. let's go.          |
|                                        |
|  +----------------------------------+ |
|  |           |                    | |  GlassCard  hero, radius 40
|  |           |    LIFE POWER      | |  glow-you (the screen's one hero glow)
|  |   -------( 72 )-------           | |  GlassStatCard  ring, shares parent
|  |           |   via onboarding    | |  bloom - no second glow stacked here
|  |           |        calc        | |
|  |  day one - this *grows* with you. | |
|  +----------------------------------+ |
|                                        |
|  +----------------------------------+ |
|  | plan ready | 3 areas | first action | |  SolidCard  KPIRow, glow-you
|  +----------------------------------+ |  (compact, own bloom - see 6)
|                                        |
|   YOUR DOMAIN STATS                    |  SectionHeader  overline
|  +----------------------------------+ |
|  | o Fitness    18    via you logged | |  ListRow + ChipProvenance
|  +----------------------------------+ |
|  | o Career    ~22   estimated  low | |  ListRow + ChipProvenance
|  |              confidence (64%)     | |
|  +----------------------------------+ |
|                                        |
|   YOUR MISSIONS                        |  SectionHeader  overline
|  +----------------------------------+ |
|  | o Fitness  PRIORITY          | |  SolidCard  glow-done
|  | run a half marathon                | |
|  |                                    | |
|  |  o run 3x/week                     | |
|  |  o stretch nightly                  | |
|  |  + and 2 more actions               | |
|  |                                    | |
|  |  ----o----o----o  milestones      | |  MilestoneTimeline (NEW)
|  |                                    | |
|  |  connects to  o Nutrition           | |  ChipDomainTag pair
|  +----------------------------------+ |
|                                        |
|  +--------------------------------+   |
|  |          enter *Today*           |   |  BtnPrimary
|  +--------------------------------+   |
|              customize                  |  BtnGhost
|                                        |
|                                  |  home indicator
+--------------------------------------+

Route handling: `/onboarding`
```

## Focal Hierarchy
- **Dominant focal moment:** Initial plan summary hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Hero constellation radar - the one hero glass moment with CIA only when the source supports a synthesized read.
- **Operational layer:** Mission cards  - one SolidCard per established mission, Heading, CIA coaching note, Radar baseline preamble.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*summary*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma aliases:** `My Plan`, `Preferences`, onboarding `Congratulations`.
- **Evidence tier / light-shell exception:** screenshot-derived Figma direction overrides the older compact canon's dark-only note for these onboarding plan frames.
- **My Plan anatomy:** the visible plan frame uses a warm-light shell, 5-step rail at the top, title equivalent to `Your personalized Missions`, a small `CIA-generated Missions` pill, a rationale card (`Why these Missions?`), mission cards with selected checkbox, `Primary` and `CIA-suggested` chips, edit and expand glyphs, duration metadata, and a plan-duration selector (`2 Week`, `4 Week`, `8 Week`) above a bottom orange `Next` CTA. Keep `Goals` and `AI Suggested` only as Figma alias notes, not production copy.
- **Preferences anatomy:** coaching-style cards (`Supportive`, `Direct`, `Analytical`, `Motivational`) and channel cards (`Notifications`, `Email`, `SMS`) use soft icon squares and orange selected checkboxes. Engagement level uses stacked rows with frequency pills and one selected orange check.
- **Congratulations anatomy:** the success frame uses the orange scalloped check badge, a quiet message, a plan note, green/purple program cards, Week 1 activity list, and bottom orange `Start your journey` CTA. Preserve Balencia Mission language in final copy, but keep this success density and badge motif.

## Components
- **TopBar** - transparent over atmosphere, back chevron (44px target) only. No title - the Display line beneath it is the only heading this screen needs.
- **CIAInsightCard** - `.glass-frost` (canon 2, "immersive/onboarding" tier - this is exactly that moment), `glow-cia`. Header-only instance: no `BtnCoach`/`BtnGhost` action row, since the screen's one action pair lives in the CTA area - duplicating it here would break the "one BtnPrimary per composition" rule in spirit even if not literally.
- **GlassCard** (`hero`, radius 40) - sole hero container, holding the radar. Per catalog's "max one hero glass tile per viewport-height," this is the only hero-tier card on the screen; the readiness band and mission cards are deliberately not hero-tier.
- **NEW: ConstellationRadar** - *rationale:* `TrendChart` is a line chart over time; this needs a radial multi-axis plot of simultaneous domain baselines around a single Life Power center. Solid-orange fill for the baseline shape, dashed-purple vector toward the 90-day projection (same solid-user / dashed-AI logic as `TrendChart`, canon 7, just remapped to a radial form). Unassessed domains render as a ghosted axis line - `rgba(255,255,255,.05)`, dashed - never a zero-value spoke.
- **GlassStatCard** (`ring` variant) - nested center of the radar for the Life Power `ProgressRing` + KPI. Carries `ChipProvenance` (`via onboarding calc`). Delta is intentionally omitted: there is no prior reading to compare against on day one, and inventing a "+0" or a blank arrow would be dishonest rather than neutral. This instance **suppresses its own ambient glow** - nesting a second bottom-anchored radial bloom inside the hero's own bloom would double up in one visual region; the ring's stroke still fills orange per canon, carrying the "you" meaning at the component level without a second card-level glow.
- **SolidCard** (readiness handoff band) - uses plan-ready, selected life-area count, and first-action status. `glow-you`, meaning *the member's own starting plan is ready to act on.*
- **KPIRow** - the three mini-stats (plan ready  3 life areas  first action) inside that SolidCard, hairline-divided per catalog anatomy.
- **MomentumBar** - embedded in the first-action slot only when a starter action has multiple steps; its warm fill shows action readiness, not experience points.
- **SectionHeader** - "YOUR DOMAIN STATS" and "YOUR MISSIONS," overline only, no trailing action (the one edit affordance for missions lives at the CTA area, not duplicated here).
- **ListRow** - one per assessed Domain Stat. Trailing slot carries `ChipProvenance` instead of the default chevron/toggle - these rows aren't navigable, they're a legibility companion to the radar's shapes.
- **ChipProvenance** - `via you logged` (Fitness, real) / `estimated  low confidence` (Career, muted 64% - CIA didn't get a precise number for this one from the conversation, so it says so) / `via onboarding calc` (Life Power).
- **SolidCard** (mission card) - one per mission, `--surface-2`, no blur, for the same legibility-over-atmosphere reason as the readiness band. `glow-done`, meaning *growth, the actionable path forward* - the only card on the screen using the completion/growth glow, appropriately, since these are the missions that will earn it.
- **ChipDomainTag** - leading domain tag on each mission card, and now the trailing cross-pillar link too (see 6) - replacing what was a bare word with an actual colored tag.
- **NEW: MilestoneTimeline** - *rationale:* a horizontal sequence of discrete future steps with an explicit "you are here" node (`----o----o----o`). `ProgressBar`/`MomentumBar` communicate continuous fill, not discrete steps with a current-position marker - this needs its own shape.

## Data Honesty
- Every metric ships all three states. No fabricated numbers, ever.
- **1. Life Power score** (`GlassStatCard`  ring)
- *Real:* `72`, `ChipProvenance` reads `via onboarding calc`.
- *Low-confidence:* `~70`, KPI muted to 64%, `estimated  low confidence`.
- *Honest-null:* `-`, `HonestNullState` line: `not enough data yet - 3 more days`.
- **2. Domain Stats** (per row, e.g. Fitness / Career)
- *Real (Fitness, 18):* `ChipProvenance` reads `via you logged` - CIA has an exact number from the conversation (stated run frequency).
- *Low-confidence (Career, ~22):* KPI muted to 64%, `estimated  low confidence` - CIA inferred this one without a precise figure to anchor it.
- *Honest-null (unassessed domain):* no `ListRow` rendered at all for that domain - it simply doesn't appear in the list. On the radar, that same domain's axis renders as a ghosted, dashed spoke at `rgba(255,255,255,.05)` rather than a missing wedge or a zero value, so the shape stays honest about what wasn't measured without looking broken.
- **3. Readiness handoff**
- *Real:* `plan ready`, selected domains count, first action, mission duration, and mission source each carry a source label (`your answers`, `CIA-generated`, `you selected`).
- *Low-confidence:* `draft plan` / muted KPI when CIA inferred missing details; each inferred mission shows `estimated · low confidence` until accepted.
- *Honest-null:* `Plan still building` with CTA disabled and retry/edit options; no fake first action or duration.
- **Mission source:** real = user-selected or CIA-generated with evidence; low-confidence = inferred draft; honest-null = hidden until accepted.

## Consent and Safety
- Plan provenance chips open a data-controls sheet: answers used, inferred items, connected sources, scope, freshness, retention, export onboarding answers/plan, revoke source access, delete recommendation history.
- CIA-generated missions are suggestions until accepted; no mission is treated as a diagnosis, prescription, or irreversible commitment.
- Keep navigation targets aligned to `/onboarding`. Do not add alternate vanity routes.

## States
- **Default:** as specified above - radar mapped, Domain Stats and missions populated, CTA idle-pulsing.
- **Skeleton:** `SkeletonState` - radar renders as ghost spokes + a shimmering axis sweep before the real shape draws; readiness band and mission cards render as `--surface-3` shimmer blocks matching final geometry. Pairs with the **loading microcopy** in 7.
- **Minimal** (direct-entry edge case, skipped conversation): 1-2 CIA-starter missions only; radar shows only the axes CIA could infer, remaining axes ghosted per 8. Pairs with the **minimal-entry microcopy** in 7 - never shame-toned, always framed as a starting point that grows.
- **Editing:** entered via "customize." Each mission card's pencil activates (full opacity, orange tint); tapping one opens a `Sheet` (`half`) with editable `ListRow` fields for that mission's title and actions. "customize" label flips to "done editing" for the duration.
- **Error:** `ErrorState` replaces the plan content - glyph, the **error microcopy** from 7, `BtnSecondary` "retry." Never blames the user, never shows a partial/broken plan underneath.
- **Offline:** `OfflineBanner`/`SyncStatus` deploys top, reads the **offline microcopy** from 7 (honest staleness, not a hard failure); tapping "enter Today" queues the transition locally rather than failing silently.
- **Success:** CTA flashes `--glow-done` (400ms), screen crossfades to Home `12`, Today tab.
- **Disabled:** `BtnPrimary` drops to 40% opacity and ignores taps only while an in-progress edit (open `Sheet`) hasn't been confirmed - never disabled by default on this screen, since day-one plans always render *something*.
- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## Motion
- **Physical easing:** spring entry throughout, stiffness 250 / damping 25. Never linear.
- **Draw-first choreography:** `ConstellationRadar` spokes draw first -> Life Power counts up (tabular-nums) -> `MomentumBar` shimmer travels left-to-right -> Domain Stats rows fade up -> mission cards fade-up staggered 50ms apart as they enter viewport. The order matters: shape, then number, then momentum, then detail - the same order a person would actually want to absorb it in.
- **Glow behavior:** hero radar's `glow-you` breathes (55%->70%->55% opacity, 4s ease) to read as "living" baseline data. Readiness band's glow stays static - a second breathing bloom directly beneath the hero's would compete with it. CTA's idle pulse is opacity-only, 3s, no color shift.
- **Milestone nodes:** the current "you are here" node on `MilestoneTimeline` carries a looping concentric ring pulse in orange; completed/future nodes stay static.
- **Feedback timing:** 150-250ms for tap, expand, toggle (mission-card action-list expansion, "and N more" reveal).
- **Haptics:** light impact on action-list expansion; medium impact on the CTA's success tap.
- **Reduced-motion path:** all draws and pulses resolve instantly to final state; staggered card entry collapses to a single 150ms crossfade; the milestone "you are here" ring becomes a static solid-fill dot instead of a looping pulse.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/onboarding`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast:** paper-100 (`#FEFAF3`) on `--surface-2` (`#211008`) > 12:1 for mission-card and readiness-band text. Paper-100 on the `.glass-frost` header, verified against the actual composite (`rgba(255,255,255,.10)` blur-48 over the atmosphere + purple pool), not the raw base - the frost lightens the effective background enough that this needs its own check. Paper-50 on `BtnPrimary` fill > 4.5:1.; **44px+ targets:** back chevron, every mission card's edit pencil, and every `MilestoneTimeline` node carry a 44x44px minimum tap target even where the visible glyph is smaller.; **Screen-reader labels:** `ConstellationRadar` exposes a full-sentence summary per axis (e.g., "radar chart. fitness baseline 18. career estimated 22, low confidence. nutrition not yet assessed."), not just the visual shape. `MilestoneTimeline` announces "milestone 2 of 5, current." Edit pencils announce "edit mission: run a half marathon," never a bare "edit."
