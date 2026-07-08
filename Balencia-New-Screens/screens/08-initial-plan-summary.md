### 1. Header
- **Screen ID:** 08-initial-plan-summary
- **Name:** Initial plan summary
- **Route(s) covered:** `/onboarding`
- **Tab:** none (onboarding stack)
- **Source:** functional content brief "Initial Plan Summary"
- **Batch:** 1

### 2. Purpose
The first time *CIA* hands the plan back. Everything said in the onboarding conversation (Screen 07) has to land here as something a person can actually see — a Life Power baseline, a handful of Domain Stats, and a short stack of missions with real next actions. This is not a settings-review screen; it's the moment the relationship starts paying off. The only two jobs: prove CIA was listening (specific numbers, specific missions, a stated cross-pillar link), and get out of the way fast — one primary action, one screen, into Home.

### 3. Entry & exit
- **Entry paths:**
  - CIA Onboarding Conversation `07` (crossfade, standard path).
  - Direct route if the user skips the conversation entirely — renders the **Minimal** variant (see §9), never a bare/broken layout.
- **Exit paths:**
  - **enter Today** (`BtnPrimary`) — root reset, onboarding stack destroyed, lands on Home `12`, Today tab.
  - **customize** (`BtnGhost`) — toggles inline editing: each mission card's pencil icon activates; tapping one opens a `Sheet` (`half` variant) with editable `ListRow` fields (mission title, actions) for that mission only. Label flips to **done editing** while active; tapping it again collapses back to the read-only default with edits retained.

### 4. Layout anatomy
Top-to-bottom regions:
1. **Atmosphere base** — `--bg-base`, orange radial glow top-center, purple pool behind the hero radar (this is a CIA-generated moment).
2. **TopBar** — back chevron only; no title text competes with the hero line below it.
3. **CIA reveal header** — orb + Display headline + one-line coaching note, introducing the reveal.
4. **Hero constellation radar** — the one hero glass moment: multi-axis baseline plot, Life Power score at the center.
5. **Readiness handoff band** — compact plan-ready / life-areas / first-action readout, one card below the hero, not competing with it.
6. **Domain Stats list** — legible companion numbers beneath the radar's shapes, real values a person can point to.
7. **Mission cards (vertical stack)** — one `SolidCard` per established mission: domain tag, priority label, edit pencil, action preview, milestone timeline, one stated cross-pillar link.
8. **CTA area** — one `BtnPrimary`, one `BtnGhost` beneath it.

**ASCII wireframe (390×844):**
```text
┌──────────────────────────────────────┐
│ 9:41                              ⚡ │  status bar
│                                        │
│  ‹                                     │  TopBar · back chevron only
│                                        │
│   ◐   here's your *plan*.             │  CIAInsightCard · frost, header-only
│       i've broken down your missions   │  glow-cia
│       into daily actions across        │
│       3 life areas. let's go.          │
│                                        │
│  ╭──────────────────────────────────╮ │
│  │        ⟍   |   ⟋                 │ │  GlassCard · hero, radius 40
│  │          ⟍ | ⟋   LIFE POWER      │ │  glow-you (the screen's one hero glow)
│  │   ───────( 72 )───────           │ │  GlassStatCard · ring, shares parent
│  │          ⟋ | ⟍  via onboarding    │ │  bloom — no second glow stacked here
│  │        ⟋   |   ⟍     calc        │ │
│  │  day one — this *grows* with you. │ │
│  ╰──────────────────────────────────╯ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ plan ready │ 3 areas │ first action │ │  SolidCard · KPIRow, glow-you
│  └──────────────────────────────────┘ │  (compact, own bloom — see §6)
│                                        │
│   YOUR DOMAIN STATS                    │  SectionHeader · overline
│  ┌──────────────────────────────────┐ │
│  │ ● Fitness    18    via you logged │ │  ListRow + ChipProvenance
│  ├──────────────────────────────────┤ │
│  │ ● Career    ~22   estimated · low │ │  ListRow + ChipProvenance
│  │              confidence (64%)     │ │
│  └──────────────────────────────────┘ │
│                                        │
│   YOUR MISSIONS                        │  SectionHeader · overline
│  ╭──────────────────────────────────╮ │
│  │ ● Fitness · PRIORITY        ✎  │ │  SolidCard · glow-done
│  │ run a half marathon                │ │
│  │                                    │ │
│  │  • run 3x/week                     │ │
│  │  • stretch nightly                  │ │
│  │  + and 2 more actions               │ │
│  │                                    │ │
│  │  ◉────○────○────○  milestones      │ │  MilestoneTimeline (NEW)
│  │                                    │ │
│  │  connects to  ● Nutrition           │ │  ChipDomainTag pair
│  ╰──────────────────────────────────╯ │
│                                        │
│  ┌────────────────────────────────┐   │
│  │          enter *Today*           │   │  BtnPrimary
│  └────────────────────────────────┘   │
│              customize                  │  BtnGhost
│                                        │
│              ▬▬▬▬▬                    │  home indicator
└──────────────────────────────────────┘
```

### 5. Components
- **TopBar** — transparent over atmosphere, back chevron (44px target) only. No title — the Display line beneath it is the only heading this screen needs.
- **CIAInsightCard** — `.glass-frost` (canon §2, "immersive/onboarding" tier — this is exactly that moment), `glow-cia`. Header-only instance: no `BtnCoach`/`BtnGhost` action row, since the screen's one action pair lives in the CTA area — duplicating it here would break the "one BtnPrimary per composition" rule in spirit even if not literally.
- **GlassCard** (`hero`, radius 40) — sole hero container, holding the radar. Per catalog's "max one hero glass tile per viewport-height," this is the only hero-tier card on the screen; the readiness band and mission cards are deliberately not hero-tier.
- **NEW: ConstellationRadar** — *rationale:* `TrendChart` is a line chart over time; this needs a radial multi-axis plot of simultaneous domain baselines around a single Life Power center. Solid-orange fill for the baseline shape, dashed-purple vector toward the 90-day projection (same solid-user / dashed-AI logic as `TrendChart`, canon §7, just remapped to a radial form). Unassessed domains render as a ghosted axis line — `rgba(255,255,255,.05)`, dashed — never a zero-value spoke.
- **GlassStatCard** (`ring` variant) — nested center of the radar for the Life Power `ProgressRing` + KPI. Carries `ChipProvenance` (`via onboarding calc`). Delta is intentionally omitted: there is no prior reading to compare against on day one, and inventing a "+0" or a blank arrow would be dishonest rather than neutral. This instance **suppresses its own ambient glow** — nesting a second bottom-anchored radial bloom inside the hero's own bloom would double up in one visual region; the ring's stroke still fills orange per canon, carrying the "you" meaning at the component level without a second card-level glow.
- **SolidCard** (readiness handoff band) — uses plan-ready, selected life-area count, and first-action status. `glow-you`, meaning *the member's own starting plan is ready to act on.*
- **KPIRow** — the three mini-stats (plan ready · 3 life areas · first action) inside that SolidCard, hairline-divided per catalog anatomy.
- **MomentumBar** — embedded in the first-action slot only when a starter action has multiple steps; its warm fill shows action readiness, not experience points.
- **SectionHeader** — "YOUR DOMAIN STATS" and "YOUR MISSIONS," overline only, no trailing action (the one edit affordance for missions lives at the CTA area, not duplicated here).
- **ListRow** — one per assessed Domain Stat. Trailing slot carries `ChipProvenance` instead of the default chevron/toggle — these rows aren't navigable, they're a legibility companion to the radar's shapes.
- **ChipProvenance** — `via you logged` (Fitness, real) / `estimated · low confidence` (Career, muted 64% — CIA didn't get a precise number for this one from the conversation, so it says so) / `via onboarding calc` (Life Power).
- **SolidCard** (mission card) — one per mission, `--surface-2`, no blur, for the same legibility-over-atmosphere reason as the readiness band. `glow-done`, meaning *growth, the actionable path forward* — the only card on the screen using the completion/growth glow, appropriately, since these are the missions that will earn it.
- **ChipDomainTag** — leading domain tag on each mission card, and now the trailing cross-pillar link too (see §6) — replacing what was a bare word with an actual colored tag.
- **NEW: MilestoneTimeline** — *rationale:* a horizontal sequence of discrete future steps with an explicit "you are here" node (`◉────○────○────○`). `ProgressBar`/`MomentumBar` communicate continuous fill, not discrete steps with a current-position marker — this needs its own shape.
- **BtnPrimary** — "enter *Today*." One per screen.
- **BtnGhost** — "customize" / "done editing."

### 6. Visual treatment
- **Atmosphere:** `--bg-base` (`#0A0A0F`). Orange radial glow top-center, `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` — canon's exact recipe, unmodified. Purple pool behind the hero radar, `rgba(127,36,255,.12)` — slightly stronger than a quiet-entrance pool (contrast: §6 of `03-welcome-sign-up.md` uses `.08` for CIA's *first* appearance) because this screen is CIA's *work product*, not just its presence — it earns a touch more visual weight. 3–4% soft-light grain overlay, global, mandatory.
- **CIA reveal header:** `.glass-frost` (`rgba(255,255,255,.10)`, blur 48px sat 130%, border `.16`, inset top-light `.40` — canon §2, unmodified). `glow-cia` (`#7F24FF`). *Meaning:* this is CIA's synthesis speaking, not a data card.
- **Hero constellation radar:** `.glass-card`, radius 40 (`--r-2xl`). `glow-you` (`#FF5E00`), standard recipe — bottom-anchored radial, `color-mix(in srgb, var(--glow-you) 55%, transparent)` → transparent, blur 24px, height 62% of card. *Meaning:* the user's own baseline, their effort and current reality, not CIA's read of it. Radar shape: solid orange fill at 12% opacity for the baseline polygon; dashed purple vector toward the 90-day projection point; unassessed axes ghosted at `rgba(255,255,255,.05)`, dashed, never rendered as a zero spoke (a spoke at zero still implies a measurement was taken — this one wasn't).
- **Readiness handoff band:** `SolidCard` (`--surface-2`, radius 28). `glow-you`, standard recipe scaled to the card's own compact height — same recipe, smaller canvas, so it reads as a quieter accent under the hero rather than a second hero moment.
- **Domain Stats list:** plain `ListRow`s inside one `SolidCard` group, no card-level glow — these are a reference list, not a moment, and giving every row its own bloom would cheapen the one-glow-per-card rule everywhere else on the screen.
- **Mission cards:** `SolidCard` (`--surface-2`, radius 28), `glow-done` (`#34A853`). *Meaning:* growth, the actionable path forward — distinct from the hero and readiness band's orange, marking these as the "what happens next" surfaces rather than "who you are today" surfaces.
- **Domain colors used on this screen (canon §4, verified, no new hex):** Fitness `#ef4444`, Career `#6366f1`, Nutrition `#84cc16` — tag/icon only, never chrome, matching canon's "domain colors never chrome" rule exactly.
- **Priority label, deliberately not gamified:** this screen uses a plain `PRIORITY` label. The first plan reveal should feel actionable, not game-scored.
- **The one hero type moment:** "here's your *plan*." — Display 34, NM Medium 500. *plan* set in Tiempos Medium italic, the transition from conversation to structure. No other Display-weight text exists on the screen.
- **CTA:** `BtnPrimary` carries a soft 3s idle pulse (opacity only, not a resting glow-tier bloom) to draw the eye without inventing a fourth semantic glow. On success, a 400ms `--glow-done` flash precedes the root-reset transition — a state signal, matching the pattern used for auth success elsewhere in this system, not a second resting card glow.

### 7. Content & copy
Sentence case, no exclamation marks, one emphasis word per moment, CIA named correctly throughout (no "CIA" anywhere in this spec).

- **Heading:** here's your *plan*.
- **CIA coaching note:** i've broken down your missions into daily actions across 3 life areas. let's go.
- **Radar baseline preamble:** day one — this *grows* with you.
- **Readiness labels:** plan ready / 3 life areas / first action
- **Readiness caption:** your next step starts *here*
- **Domain Stats header:** your domain stats
- **Missions header:** your missions
- **Mission priority label:** PRIORITY
- **Action expansion link:** and 2 more actions
- **Cross-pillar link:** connects to [Nutrition tag]
- **Primary CTA:** enter *Today*
- **Secondary link (default):** customize
- **Secondary link (active):** done editing
- **Loading microcopy:** CIA is building your *plan* — one moment.
- **Minimal-entry microcopy:** here's a starting point. i'll *learn* more about you as we go.
- **Error microcopy:** i'm having trouble loading your plan. give me a moment. / retry
- **Offline microcopy:** offline — showing your saved *plan*

### 8. Data & honesty states
Every metric ships all three states. No fabricated numbers, ever.

**1. Life Power score** (`GlassStatCard` · ring)
- *Real:* `72`, `ChipProvenance` reads `via onboarding calc`.
- *Low-confidence:* `~70`, KPI muted to 64%, `estimated · low confidence`.
- *Honest-null:* `—`, `HonestNullState` line: `not enough data yet — 3 more days`.

**2. Domain Stats** (per row, e.g. Fitness / Career)
- *Real (Fitness, 18):* `ChipProvenance` reads `via you logged` — CIA has an exact number from the conversation (stated run frequency).
- *Low-confidence (Career, ~22):* KPI muted to 64%, `estimated · low confidence` — CIA inferred this one without a precise figure to anchor it.
- *Honest-null (unassessed domain):* no `ListRow` rendered at all for that domain — it simply doesn't appear in the list. On the radar, that same domain's axis renders as a ghosted, dashed spoke at `rgba(255,255,255,.05)` rather than a missing wedge or a zero value, so the shape stays honest about what wasn't measured without looking broken.

**3. Readiness handoff**
- *Real:* plan-ready, selected-domain count, and first-action state are derived from onboarding answers and carry `ChipProvenance` where shown.
- *Low-confidence:* starter actions inferred from thin answers are labeled `estimated · low confidence`.
- *Honest-null:* if the conversation was skipped, the band shows `starting point` and hides the selected-domain count.

### 9. All states
- **Default:** as specified above — radar mapped, Domain Stats and missions populated, CTA idle-pulsing.
- **Skeleton:** `SkeletonState` — radar renders as ghost spokes + a shimmering axis sweep before the real shape draws; readiness band and mission cards render as `--surface-3` shimmer blocks matching final geometry. Pairs with the **loading microcopy** in §7.
- **Minimal** (direct-entry edge case, skipped conversation): 1–2 CIA-starter missions only; radar shows only the axes CIA could infer, remaining axes ghosted per §8. Pairs with the **minimal-entry microcopy** in §7 — never shame-toned, always framed as a starting point that grows.
- **Editing:** entered via "customize." Each mission card's pencil activates (full opacity, orange tint); tapping one opens a `Sheet` (`half`) with editable `ListRow` fields for that mission's title and actions. "customize" label flips to "done editing" for the duration.
- **Error:** `ErrorState` replaces the plan content — glyph, the **error microcopy** from §7, `BtnSecondary` "retry." Never blames the user, never shows a partial/broken plan underneath.
- **Offline:** `OfflineBanner`/`SyncStatus` deploys top, reads the **offline microcopy** from §7 (honest staleness, not a hard failure); tapping "enter Today" queues the transition locally rather than failing silently.
- **Success:** CTA flashes `--glow-done` (400ms), screen crossfades to Home `12`, Today tab.
- **Disabled:** `BtnPrimary` drops to 40% opacity and ignores taps only while an in-progress edit (open `Sheet`) hasn't been confirmed — never disabled by default on this screen, since day-one plans always render *something*.

- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

### 10. Motion & interaction
- **Physical easing:** spring entry throughout, stiffness 250 / damping 25. Never linear.
- **Draw-first choreography:** `ConstellationRadar` spokes draw first → Life Power counts up (tabular-nums) → `MomentumBar` shimmer travels left-to-right → Domain Stats rows fade up → mission cards fade-up staggered 50ms apart as they enter viewport. The order matters: shape, then number, then momentum, then detail — the same order a person would actually want to absorb it in.
- **Glow behavior:** hero radar's `glow-you` breathes (55%→70%→55% opacity, 4s ease) to read as "living" baseline data. Readiness band's glow stays static — a second breathing bloom directly beneath the hero's would compete with it. CTA's idle pulse is opacity-only, 3s, no color shift.
- **Milestone nodes:** the current "you are here" node on `MilestoneTimeline` carries a looping concentric ring pulse in orange; completed/future nodes stay static.
- **Feedback timing:** 150–250ms for tap, expand, toggle (mission-card action-list expansion, "and N more" reveal).
- **Haptics:** light impact on action-list expansion; medium impact on the CTA's success tap.
- **Reduced-motion path:** all draws and pulses resolve instantly to final state; staggered card entry collapses to a single 150ms crossfade; the milestone "you are here" ring becomes a static solid-fill dot instead of a looping pulse.

### 11. Motivation-tier adaptation
- **Low density:** mission action lists default collapsed; `MilestoneTimeline` shows only start and "you are here" nodes, hiding intermediate steps — the point is the immediate next step, not the whole roadmap.
- **Medium density (default):** 2–3 actions visible per mission with "+ and N more actions"; full milestone sequence shown.
- **High density:** action lists auto-expanded; milestone sub-steps and the cross-pillar link's supporting detail shown by default.
- **Density-independent:** `ChipProvenance` and every honest-null state render identically across all three tiers — the honesty invariant (canon §7) is never gated behind a density setting.

### 12. Accessibility
- **AA+ contrast:** paper-100 (`#FEFAF3`) on `--surface-2` (`#211008`) > 12:1 for mission-card and readiness-band text. Paper-100 on the `.glass-frost` header, verified against the actual composite (`rgba(255,255,255,.10)` blur-48 over the atmosphere + purple pool), not the raw base — the frost lightens the effective background enough that this needs its own check. Paper-50 on `BtnPrimary` fill > 4.5:1.
- **44px+ targets:** back chevron, every mission card's edit pencil, and every `MilestoneTimeline` node carry a 44×44px minimum tap target even where the visible glyph is smaller.
- **Screen-reader labels:** `ConstellationRadar` exposes a full-sentence summary per axis (e.g., "radar chart. fitness baseline 18. career estimated 22, low confidence. nutrition not yet assessed."), not just the visual shape. `MilestoneTimeline` announces "milestone 2 of 5, current." Edit pencils announce "edit mission: run a half marathon," never a bare "edit."
- **Reduced-motion:** honored per §10 — no animation path on this screen is required to convey information that isn't also stated in text (radar summary, milestone position, provenance labels all exist as text regardless of motion state).

### 13. Premium checklist
1. **Connects:** yes — each mission states one explicit cross-pillar link via a real `ChipDomainTag` pair (Fitness ↔ Nutrition), not a bare word.
2. **Honest:** yes — Life Power, both Domain Stats rows, and the unassessed-domain case all ship real / low-confidence / honest-null, with distinct provenance reasoning for each (logged vs. estimated vs. unassessed-so-absent).
3. **Premium:** yes — `.glass-frost` reveal header, breathing hero glow, draw-first choreography, Tiempos-italic hero moment; nothing on screen reads as template chrome.
4. **60/30/10 color ratio:** yes — orange drives the baseline/CTA/readiness band, green is isolated to the mission cards' growth meaning, purple is isolated to the CIA header and the radar's projection vector only.
5. **One semantic glow per card:** yes, and reconciled where it wasn't obvious — the nested Life Power ring explicitly suppresses its own bloom to avoid stacking two glows in one region; the readiness band's glow is stated and scaled down rather than silently glass-pilled away.
6. **Selective glass:** yes — `.glass-frost` for the CIA header (immersive/onboarding, exactly canon's use case), `.glass-card` for the sole hero, `SolidCard` for both data-dense regions (readiness band, mission cards).
7. **Honest data visualization:** yes — solid orange baseline shape, dashed purple projection vector, ghosted (never zeroed) unassessed axes, matching canon §7's line-chart logic remapped to a radial form.
8. **One BtnPrimary:** yes — "enter Today."
9. **One Display moment:** yes — "here's your *plan*."
10. **One emphasis word per moment:** yes — audited across every string in §7; none carries two.
11. **CIA voice:** yes — sentence case, direct and warm, second person, no old coach naming; "goal" corrected to "mission" throughout without adding scoring language.
12. **Physical easing:** yes — spring entry stated with concrete stiffness/damping values, draw-first order justified.
13. **A11y floor:** yes — 44px targets, full-sentence radar/timeline screen-reader summaries, composite-verified contrast on the frost header specifically (not just the raw base).
14. **Motivation-tier density:** yes — low/medium/high defined, plus an explicit density-independent carve-out for the honesty invariant.
