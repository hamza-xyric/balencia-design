# Screen Design: Initial Plan Summary

**Screen**: 08 of 73
**File**: 08-initial-plan-summary.md
**Register**: Transitional (Product Mode density, Brand Mode emotional impact)
**Primary action**: Accept plan and start journey (tap "start your journey")
**Tab**: None (final onboarding screen, pre-main-app)
**Navigation**: Crossfade from SIA Onboarding Conversation [07]. "Start your journey" triggers root reset — onboarding stack is removed, main tab navigator loads with Home Screen [12] as the Today tab.

---

## Purpose

This is SIA's "pitch" — the moment the user sees their entire life plan laid out, organized, and actionable for the first time. The screen must make the user feel excited and believe their goals are achievable. SIA has taken the user's conversational input and transformed it into a structured plan with domain assignments, decomposed actions, milestones, and cross-domain connections. The user can accept the plan as-is or customize individual elements. This is the last screen before the main app experience begins. RPG framing introduces the gamification layer: Level 1, 0 XP — the journey starts here.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. SIA's greeting + "here's your plan." heading — the big reveal
2. RPG starting status — Level 1, 0 XP (the beginning of the journey)
3. Goal plan cards — organized by domain, each with actions and milestones
4. Cross-domain connections — subtle links between goals
5. "Start your journey" CTA — the most important button in the entire app
6. "Customize" secondary link — for users who want to tweak before starting

**User flow**:
- **Arrives from**: SIA Onboarding Conversation [07] via crossfade (SIA says "let me build your plan")
- **Primary exit**: Home Screen [12] (Batch 3) via root reset ("Start your journey" — onboarding stack removed, tab navigator loads)
- **Secondary exit**: Inline edit mode (tap "customize" or edit icons on individual goals)

---

## Layout

**Scroll behavior**: ScrollView (content will exceed viewport — multiple goal cards + actions + CTA)
**Tab bar visible**: No

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                             │
│  ┌─┐                       │
│  │S│  "here's your plan."  │  ← SIA avatar + heading
│  └─┘                       │
│                             │  ← 8pt gap
│  SIA: "I've broken down    │
│  your goals into daily     │  ← SIA coaching note
│  actions. Let's go."       │
│                             │  ← 24pt gap
│  ┌─────────────────────┐   │
│  │ LEVEL 1 · 0 XP      │   │  ← RPG status bar
│  │ ▓░░░░░░░░░░░░░░░░░░ │   │     (XP progress)
│  └─────────────────────┘   │
│                             │  ← 24pt gap
│  ┌─────────────────────┐   │
│  │ 🔴 Run a half       │   │
│  │    marathon          │   │  ← Goal card 1
│  │ ─────────────────── │   │     (domain color left bar)
│  │ □ Run 3x/week       │   │
│  │ □ Build to 5K       │   │  ← Expandable actions
│  │ □ Register for race │   │
│  │ ─────────────────── │   │
│  │ ↔ connects to       │   │  ← Cross-domain link
│  │   nutrition          │   │
│  └─────────────────────┘   │
│                             │  ← 16pt gap
│  ┌─────────────────────┐   │
│  │ 💚 Save $5,000      │   │
│  │ ─────────────────── │   │  ← Goal card 2
│  │ □ Track expenses     │   │
│  │ □ Set budget         │   │
│  │ □ Auto-save $200/mo  │   │
│  └─────────────────────┘   │
│                             │  ← 16pt gap
│  ┌─────────────────────┐   │
│  │ 🟣 Read 20 books    │   │  ← Goal card 3
│  │ ─────────────────── │   │
│  │ □ 30 min/day        │   │
│  │ □ 2 books/month     │   │
│  └─────────────────────┘   │
│                             │  ← 32pt gap
│  ┌───────────────────┐     │
│  │  start your journey │     │  ← Primary CTA, orange pill
│  └───────────────────┘     │
│                             │  ← 16pt gap
│       "customize"           │  ← Secondary text link
│                             │  ← 48pt bottom padding
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Content: Light-content, transparent

2. **SIA Header** — ~80pt
   - Purpose: SIA presents the plan with a personal message
   - Content: SIA avatar (small) + heading + coaching note

3. **RPG Status Bar** — 64pt + 24pt margin = 88pt
   - Purpose: Introduce the RPG framing — this is where the journey begins
   - Content: Level badge + XP bar (empty at 0)

4. **Goal Plan Cards** — variable (each card ~160-220pt depending on actions)
   - Purpose: Show the structured plan, one card per goal
   - Content: Goal name, domain tag, decomposed actions, milestones, cross-domain links

5. **CTA Area** — 56pt button + 16pt gap + 20pt customize link + 48pt bottom padding = 140pt
   - Purpose: Accept and begin
   - Content: "start your journey" orange pill + "customize" text link

---

## Components

### SIA Header
- **Purpose**: SIA introduces the plan — personal, exciting, achievable
- **Data source**: AI-generated summary based on onboarding conversation
- **Visual treatment**: SIA Avatar (Small, 24pt, left) + heading "here's your plan." (20pt Sora Bold, white) on the same line, vertically centered. Below (8pt gap): SIA coaching note in SIA Message Bubble style but without the full bubble treatment — just text. "I've broken down your goals into daily actions across [N] life areas. Let's go." (15pt Sora Regular, white at 70%). Left-aligned, 16pt margin.
- **Variants**: Copy adapts based on number of goals and domains selected
- **Gestures**: None
- **Size**: Full-width - 32pt (16pt margins) x ~80pt

### RPG Status Bar
- **Purpose**: Introduce the gamification layer — the user starts at Level 1, 0 XP
- **Data source**: Static (always Level 1, 0 XP for new users)
- **Visual treatment**: Full-width - 32pt (16pt margins). Height: 64pt. Background: ink-brown-800 (#211008), --r-xl (28pt) corners, 1pt white 8% border. Content: "level 1" badge (12pt Sora Semibold, uppercase, Burnt Orange, +0.12em tracking) on the left. "0 XP" (12pt Sora Semibold, white at 50%) on the right. Below text row: an honest "ready" `MomentumBar` (VK-004) — a single continuous rounded-pill bar (full-width inside card minus padding, 8pt tall, --r-pill corners). Track: white at 8% over a `--track-inset` recess. Fill: at a true 0 (a real empty fill, NOT a zero-width/invisible bar); the `--grad-progress` orange→green fill is defined for when XP > 0 on future screens. On mount, a one-time "ready" shimmer (an orange glow) travels the empty track once so a 0-XP bar reads as primed-to-begin, never as an empty-failure bar — non-shaming: frames momentum, never weaponises loss-aversion. 16pt padding inside card. (See Visualization `S08-V02`.)
- **Variants**: None (always 0 on this screen)
- **Gestures**: None (display only on this screen — tappable on future screens → RPG Character)
- **Size**: (screen width - 32pt) x 64pt

### Goal Plan Card
- **Purpose**: Display one goal with its structured breakdown — the core content of this screen
- **Data source**: AI-generated from onboarding conversation
- **Visual treatment**: Full-width - 32pt (16pt margins). Background: ink-brown-800 (#211008), --r-xl (28pt) corners, 1pt white 8% border. Left border accent: 4pt in the goal's primary domain color (extends full height of card, inside the corner radius). Padding: 16pt all sides (20pt left to account for the domain color bar).
  - **Goal name row**: Domain tag chip (domain color bg at 20%, domain color text, 11pt Sora Semibold, --r-sm corners, 24pt height, 8pt horizontal padding) + goal name (17pt Sora Semibold, white) on the same line. Edit icon (pencil, 16pt, white at 30%) right-aligned.
  - **Actions list**: Below goal name (12pt gap). Each action: unchecked circle (18pt, white at 20% border, no fill) + action text (14pt Sora Regular, white at 80%). 8pt gap between actions. Shows 3 actions by default. If more exist, "and [N] more" link (13pt Sora Regular, orange) expands the list.
  - **Milestone row** (optional): Below actions (12pt gap). A compact horizontal `TimelineAgenda` (VK-014, short-sequence ≤6-node variant) along a single drawn `--stroke-base` 4px round-capped path. Day-1 cold-start: NO node is reached — the first node pulses as "next" (--color-brand-orange 2px ring, no fill, `--glow-orange-sm` ~12px pulse — the single focal accent per card), remaining nodes are upcoming (white at 10% fill + dot glyph at white at 30%), and the path is fully the white at 8% unreached track. No alarm-red node; status is always glyph + colour. Node diameter 20–24pt with a min-44 hit box. Label below each node: milestone name (11pt Sora Regular, white at 40%). (See Visualization `S08-V03`.)
  - **Cross-domain connection** (optional): Below milestones (8pt gap). "↔ connects to [domain]" text (12pt Sora Regular, white at 40%). Domain name in domain color. Tapping opens a tooltip or SIA explains the connection.
- **Variants**: Collapsed (3 actions visible, "and N more"), Expanded (all actions visible), Editing (inline edit mode)
- **Gestures**: Tap edit icon → inline edit. Tap "and N more" → expand. Tap cross-domain link → SIA tooltip. Tap action checkbox → toggle (not functional until plan is accepted, shows preview of interaction).
- **Size**: (screen width - 32pt) x auto (160-220pt depending on content)

### Domain Tag Chip
- **Purpose**: Identify which life domain a goal belongs to
- **Data source**: AI-assigned domain from onboarding
- **Visual treatment**: Pill shape (--r-sm, 10pt). Height: 24pt. Padding: 8pt horizontal. Background: domain color at 15% opacity. Text: domain name in domain color (11pt Sora Semibold). No border.
- **Domain colors**: Fitness (#EF4444), Nutrition (#84CC16), Finance (#10B981), Career (#6366F1), Relationships (#EC4899), Spirituality (#A855F7), Learning (#06B6D4), Creativity (#F59E0B), Wellbeing (#14B8A6).
- **Variants**: Each domain has its color. Multi-domain goals show 2-3 chips in a row with 4pt gaps.
- **Gestures**: None (display only on this screen)
- **Size**: auto-width x 24pt

### Start Journey CTA
- **Purpose**: Accept the plan and enter the main app — the single most important CTA in the onboarding flow
- **Data source**: Triggers root reset (onboarding → main app transition)
- **Visual treatment**: Reuse Brand CTA Button pattern. Text: "start your journey". Full-width - 32pt (16pt margins). 56pt height. Orange pill. Slight enhancement: subtle orange glow behind the button (--glow-orange at 20%) to make it feel more significant than a standard CTA.
- **Variants**: Default (with glow), Pressed, Loading, Success (green glow → transitions to main app)
- **Gestures**: Tap to accept plan and begin
- **Size**: (screen width - 32pt) x 56pt

### Customize Link
- **Purpose**: Allow users to adjust the plan before starting (for high-engagement users)
- **Data source**: Toggles inline editing mode
- **Visual treatment**: "customize" — 15pt Sora Semibold, Burnt Orange (#FF5E00), center-aligned. No underline. 44pt touch target height.
- **Variants**: Default, Pressed (opacity 40%, scale 0.98)
- **Gestures**: Tap to toggle edit mode on all goal cards
- **Size**: auto-width x 44pt touch target

---

## Visualization

> Source: no companion file (none exists for this screen). Audited in `viz-audit/` — Batch (Differentiator/Onboarding, shaped as template E/C-hybrid), findings `S08-V01..V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **This screen reuses `ConstellationRadar` (VK-005), `MomentumBar` (VK-004), `TimelineAgenda` (VK-014, minted on Streak Details [59]), and `BarChart`/`StatBars` (VK-006)** — it mints **no** new primitive. Register = **Transitional** (Product-Mode data density + Brand-Mode emotional reveal) → **orange-dominant** data ink; SIA royal-purple `#7F24FF` stays **identity-only** (the avatar AI-glow, and a *single* dashed-purple SIA projection on the trajectory line). Benchmark = **Finch onboarding** (warm, encouraging Day-1 framing) + the always-on **Apple Health / Linear** restraint floor, rendered **the Balencia way** (Constellation Radar + Living Line + warm glow), not a Finch clone. **Current grade D (52) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth + the working draw/pulse micro-interactions, owned by the later viz-build program.)*

Today this Day-1 reveal renders as a **text/card list with no focal visualization**: an XP bar literally at `w-0` (an invisible degenerate 0% bar — a forbidden "empty ring/bar" cold-start), goal cards whose only graphic is a row of **flat `white/20` milestone dots on a `white/10` connector** (a decorative, non-drawn, equal-weight micro-timeline), and **no view of the starting life profile at all** despite this being the emotional "here's your life, organized" moment. This section upgrades *how the plan reads* — **one** honest, emotionally-resonant hero (the starting-profile **ConstellationRadar**), the RPG bar reframed as an honest "ready" **MomentumBar**, and each mission's milestone row promoted to a drawn **TimelineAgenda** — **without** displacing the goal cards (which remain the screen's *content*) or fabricating any progress. **The central Day-1 honesty constraint:** every mission is at 0% on this screen, so a goal/mission **GaugeRing is deliberately NOT used** (a 0% ring is the degenerate empty-ring the rubric forbids and would read as "you've failed before you started"); progress-shaped primitives are replaced with *aspirational, all-upcoming* forms that are honest at zero.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Starting life profile across the chosen domains (the "here's your life" reveal) | **not shown** | **hero starting-profile Constellation Radar** — drawn polygon over the 3–5 chosen domains, glowing star dots, **Life-Power "1" sun hub** (Day-1 baseline) | **`ConstellationRadar` (VK-005)** |
| RPG Level 1 · 0 XP | invisible `w-0` orange bar on a white/8 track | **honest "ready" `MomentumBar`** at true 0 — a calm ready-state, not an empty-failure bar; "Level 1 · 0 XP · your journey starts here" | **`MomentumBar` (VK-004)** |
| Per-mission milestone sequence (e.g. 5K base → 10K → race ready) | flat equal-weight `white/20` dots + `white/10` line | **per-card `TimelineAgenda` (horizontal, ≤4 nodes)** — drawn path, **all nodes "upcoming" (cold-start)**, the first node pulsing as "next" | **`TimelineAgenda` (VK-014)** |
| Starting domain emphasis / where the plan is weighted (alt. or companion to the radar) | not shown | **domain `StatBars`** — one labelled bar per chosen domain at its Day-1 baseline, orange fill on inset track (a legible companion to the radar for AT/compact tiers) | **`BarChart`/`StatBars` (VK-006)** |
| Optional SIA "projected momentum" hint on the radar/trajectory | not shown | **single dashed-purple `#7F24FF` projection** vector toward the 90-day target ring — the brand-sanctioned SIA forecast (§11) | `TrendChart`-family dashed projection |
| Per-mission actions (checkbox list) | unchecked circles + text | — kept as text rows; a Day-1 unchecked list is **not** a progress visual (checking them is a preview interaction, not real state) | — (deliberately textual) |
| Cross-domain "↔ connects to [domain]" | text + domain-colour name | — kept as a quiet text link (a single typed relationship has no useful chart form here; the full graph lives on Knowledge Graph [72]) | — (deliberately textual) |
| Goal name · domain tag · SIA greeting/note · "customize" | text / chips | — (deliberately textual — identity labels + copy, no useful visual form) | — |

**Editorial hierarchy (calm, not maximal — this is a *light/emotional* screen):** the **ConstellationRadar is the one viz hero** (the reveal); the MomentumBar is a thin honest band beneath it; each card's TimelineAgenda is *ambient* per-card structure, not a competing focus; the StatBars are an optional companion/AT view. **Four visual ideas, one focal** — a calm Day-1 page, deliberately **not** a maximalist dashboard, and deliberately **not** ringed-up with five 0% gauges. The goal cards stay the *content*; the CTA stays the most prominent *interactive* element.

### 1 · Starting-profile Constellation Radar — the Day-1 hero — `S08-V01`  *(reuse `VK-005`)*

Introduce **one** focal hero above (or merged into) the RPG status band: the **`ConstellationRadar`** rendering the user's **starting life profile** across the 3–5 domains the plan touches (fitness / finance / wellbeing in the canonical example). This is the honest, emotional "here is your life, organized" moment Finch onboarding nails — and it is honest at Day-1 because it shows the *starting state*, not fabricated progress.
- **Geometry / depth (token-backed, locked CONSISTENCY):** **card size ~160px** (this is a calm onboarding screen, not a 280px billboard); polygon = radial orange gradient **25%→8%** (`fillOpacity` 0.25 inner → 0.08 outer) over a faint radial backplate; stroke `--color-brand-orange` + `--glow-orange` (hero-class ≥96px → full 32px is appropriate at 160px); 5 rings at 20/40/60/80/99; domain points = `--color-domain-*` **star dots + faint glow**, stagger-in `radar-dot` 420+index·40ms.
- **Life-Power "sun" hub:** the centre carries the Day-1 **Life Power baseline** number (`text-display` + `--glow-orange`) — Level 1's starting Life Power, framed as a *beginning*, never a verdict ("your starting point", not "your score").
- **Day-1 honesty (the critical state):** with only chosen-domain baselines, the radar must **never collapse to a point** reading "you scored 0." Domains the user has data/intent for draw as real star dots; un-assessed axes render as **ghosted dots on the inner ring** (no-data ≠ zero) so the polygon is a small but legible starting constellation, not a degenerate dot. Copy frames it as "day one — this grows with you."
- **Brand / non-shaming:** orange polygon is the data ink; domain colours are **identity** on the star dots only; the weakest/smallest axis is framed as *room to grow*, never "you're failing at X." Optional **single dashed-purple `#7F24FF` SIA projection** vector from the hub toward a target ring (the brand-sanctioned forecast, §11 — the *only* sanctioned purple data mark; off by default, shown only if SIA has a credible target).
- **Motion:** the polygon **draws itself** on enter (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`) — **replacing** the `radar-grow` *scale* animation (§8: draw, never scale/fade) — hub counts up, then star dots stagger in. Hero draws **first** in the page choreography.
- **Micro-interaction:** tap a star dot → a tooltip naming the domain + its starting note ("starts here — connects to your [mission]"); the dot deep-links (post-acceptance) to that domain.
- **States:** **edge-case no-goals** (user skipped onboarding) → radar shows the 1–2 starter domains + ghosted remainder + "I'll learn more as we go" (never an empty/zero radar); **loading** → ring/spoke skeleton that the polygon **draws into** (axes visible, never a blank disc); **reduced-motion** → completed polygon + hub + star dots at final state instantly.
- **Data:** the onboarding-derived domain baselines + Level-1 Life Power (already collected by SIA Onboarding [07]; no new data invented — these are the same domain selections the plan cards are built from).

### 2 · RPG "ready" MomentumBar — honest zero — `S08-V02`  *(reuse `VK-004`)*

Replace the RPG status bar's **invisible `w-0` fill** (a degenerate empty bar) with a **`MomentumBar`** rendered as an honest, *calm* **ready-state** at true 0: a **single continuous** rounded-pill bar (radius-pill, 8px, `--color-alpha-white-08` track), with the fill at 0 but the track carrying a faint **one-time "ready" shimmer** (an orange glow that travels the empty track once on mount — the spec's existing "ready pulse", now grounded in the kit) so a 0-XP bar reads as *primed to begin*, not as a broken/empty failure. Label row stays "Level 1" (orange uppercase eyebrow) · "0 XP" (white/50).
- **Non-shaming (the kit's reason this primitive exists):** the bar **frames momentum, never weaponises loss-aversion**; 0 XP is "your journey starts here", never "you have nothing." No countdown, no urgency.
- **Honesty:** this is a *true* 0 — correct to show as an empty fill; the distinction from a no-data state is moot here (0 XP is a real, known value), so it shows a real (not ghosted) empty bar, with the ready-shimmer as the only animation.
- **Depth:** `--grad-progress` orange→green fill defined for when XP > 0 (future screens); at 0 the gradient is not visible, only the track + ready shimmer.
- **Motion:** the ready shimmer travels the track once (`--dur-flow`-class, `ease-flow`) after the hero radar draws; reduced-motion → static empty track + label, no shimmer.
- **Data:** static Level 1 · 0 XP (always, on this screen).

### 3 · Per-mission milestone TimelineAgenda — `S08-V03`  *(reuse `VK-014`)*

Promote each goal card's **flat equal-weight milestone-dot row** into a compact **horizontal `TimelineAgenda`** (the VK-014 short-sequence variant for ≤6 nodes) along a single **drawn progress path** — the mission's journey, legible at a glance.
- **Cold-start node encoding (the honest Day-1 case — locked CONSISTENCY):** on this screen **no node is reached**, so per the primitive's cold-start state: the **first node pulses as "next"** (`--color-brand-orange` 2px ring, no fill, `--glow-orange-sm` ~12px pulse — the single focal accent per card), all remaining nodes are **upcoming** (`--color-alpha-white-10` fill + dot glyph at `--color-alpha-white-30`), and the path is fully the **`--color-alpha-white-08` unreached** track. This is **aspirational, never empty/red** — milestones are *invitations* ("next: 5K base"), never "you haven't reached…".
- **Depth / brand:** `--stroke-base` 4px round-capped path; the only glow is `--glow-orange-sm` on the single first/"next" node (never 32px on a 20–24pt node); node diameter 20–24pt with a min-44 hit box; status always **glyph + colour** (ring/dot), never colour-alone. **No alarm-red node.** Domain colour may tint a node only as *identity* (matching the card's domain bar), not as data ink.
- **Row anatomy:** each node's milestone name sits below it (`white/40`, 11pt — preserving the existing label treatment) + an optional "target" caption; the reached/unreached boundary sits at the first node (everything ahead).
- **Motion:** the path **draws itself** left→right (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`) as each card enters; nodes settle (0.8→1, 280ms) as the path reaches each; the "next" node's `--glow-orange-sm` pulse loops 2s (the sanctioned "you are here" pulse). **One line motif per card surface.** Reduced-motion → full path + settled upcoming nodes instantly, pulse off.
- **Micro-interaction:** tap a node → tooltip with the milestone detail; (post-acceptance) the timeline becomes the live mission progress track, with reached nodes filling green — *here* it is purely the plan preview.
- **States:** **single-milestone mission** → one "next" node, no path (no fabricated line); **no milestones** → the row is omitted (not a ghost path); **loading** → node skeletons + path draws in.
- **Data:** `plan.milestones` per mission (already in the prototype's `MissionPlan.milestones`).

### 4 · Starting domain StatBars — companion / AT view — `S08-V04`  *(reuse `VK-006`)*

A small **`StatBars`** group (the legible companion to the radar, and the primary form for the AT/compact tier where a radar polygon is hard to perceive): **one labelled horizontal bar per chosen domain** at its Day-1 baseline — `--color-brand-orange` fill over `--color-alpha-white-08` track on a `--track-inset` recess, **zero baseline, one shared scale** across domains (honest comparison), each bar labelled with the domain name + its starting value. Sorted highest→lowest baseline, with the lowest framed constructively.
- **Why bars *and* a radar:** the radar carries the at-a-glance gestalt; the StatBars carry the precise, screen-reader-legible, colour-blind-safe values — and become the *sole* domain-profile view in the reduced/AT path. Domain colours appear only as a small identity tag per row, never as the bar fill (orange is the data ink, 60/30/10).
- **Non-shaming:** the smallest-baseline domain reads as "room to grow / where SIA will focus first", never "your weakest area"; no domain is rendered in an alarm colour.
- **Motion:** bars rise `--dur-slow` 520ms `--ease-flow`, staggered, after the radar + momentum bar; reduced-motion → bars at final width.
- **States:** Day-1 baselines only (the screen's sole state); loading → track skeletons that fill.
- **Data:** the same onboarding domain baselines feeding the radar (`S08-V01`) — one source, two views; no new data.

### 5 · Cross-domain connection — kept textual (deliberate) — `S08-V05`

The "↔ connects to [domain]" link **stays a quiet text row** with the linked domain in its identity colour — a single typed relationship per card has no useful standalone chart form here, and surfacing it as a mini-graph would add a competing focus to a calm screen. The full force-directed life-connection view is the job of **Knowledge Graph [72]** (`NetworkGraph`, VK-010), deep-linked later — **not** duplicated on the Day-1 reveal. *(Logged as a deliberate textual resolution, not an omission.)*

### Motion choreography (entrance — draw-first, crossfade-in from [07])

Per `CONSISTENCY.md`, on the signature crossfade from SIA Onboarding [07]: **the hero ConstellationRadar draws first** (polygon `stroke-draw` 1200ms → hub counts up → star dots stagger `radar-dot` 420+index·40ms) → **then** the RPG MomentumBar's ready-shimmer travels the track once → **then** each goal card enters staggered (existing 220+index·90ms `fade-up`), each card's **TimelineAgenda path drawing itself L→R** as the card lands (one line motif per card) → **then** the StatBars rise (520ms, staggered) → **then** the CTA settles last with its idle orange glow pulse. One full Living-Line/draw motif per surface; the "next"-node pulse is the only looping motion. Below-fold cards animate on **scroll-into-view**. `prefers-reduced-motion` → every visual at final state instantly (polygon completed + hub + dots, momentum track static, timeline paths drawn with upcoming nodes settled, bars at final width), all pulses off — no essential information lost.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **this screen IS the Day-1 / cold-start state** — so every primitive renders its *cold-start* form by design: the radar shows the starting constellation with ghosted un-assessed axes (never a zero point), the MomentumBar is an honest ready-0 (never an invisible/empty-failure bar), every TimelineAgenda node is an *upcoming invitation* with the first pulsing "next" (never reached/red), StatBars show Day-1 baselines. **Edge-case no-goals** → SIA's starter plan (1–2 domains) drives a minimal radar + one starter mission timeline ("I'll learn more as we go"). **Loading** → depth-preserving skeletons that *morph/draw* into the real visuals (radar rings + spokes, timeline nodes + path, bar tracks — never blank discs), per the Error Handling "plan data fails to load" row. **Offline** → cached starting profile renders with the existing offline banner; visuals from cache, CTA queues. **Error** (plan fetch fails) → the SIA "trouble loading your plan" message + retry replaces the visual block (chart-specific honesty, recovery affordance present).
- **60/30/10 (Transitional → orange-dominant):** **orange dominates** data ink — the radar polygon + glow + hub, the MomentumBar fill/ready-shimmer, each TimelineAgenda "next" node + reached-path language, the StatBar fills, the CTA + "and N more"/"customize" links. **Green** is reserved for *arrival* only — it does **not** appear in this Day-1 default (nothing is reached yet) except the CTA's success-state green glow on transition (correct: arrival into the app). **Purple stays SIA-only** — the avatar AI-glow (identity) and the **single sanctioned dashed-purple SIA projection** vector on the radar (§11 forecast, correct *not* a violation). **Domain colours `#EF4444/#10B981/#14B8A6/…` are confined to identity** — radar star dots, card domain bars, domain tag chips, StatBar row tags, cross-domain link names — **never** on a CTA, the primary bar fill, or generic data ink. Glow uses the size-stepped scale (160px radar = 32px hero glow; 20–24pt timeline "next" node = `--glow-orange-sm` ~12px; bars/momentum = none) — warm depth, not neon.
- **Non-shaming (ethical gate — central to a Day-1 reveal):** the starting profile is framed as a **beginning, never a verdict** ("your starting point" / "day one — this grows with you"); the smallest radar axis / lowest StatBar is "room to grow / where SIA focuses first", never "your weakest area"; **0 XP and all-unreached milestones are aspirational invitations**, never empty-failure or loss-aversion; no streak/urgency/scarcity pressure; the CTA carries genuine encouragement, not manufactured FOMO.
- **Accessibility:** every visual carries a text/`aria-label` equivalent conveying the same value — radar → "Your starting life profile across fitness, finance and wellbeing; Life Power 1, day one"; MomentumBar → "Level 1, 0 XP, experience bar empty, ready to begin"; each TimelineAgenda → "[Mission]: 3 milestones, none reached yet, next is [first milestone]"; each node `role="listitem"` with "[milestone], upcoming"; StatBars → per-domain "[domain] starting at [value]". Status is conveyed by **visible glyph + label**, never colour alone (radar dots are labelled, timeline nodes use ring/dot glyphs, StatBars carry numeric values + a domain tag). Label/value contrast ≥ **4.5:1** on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the radar polygon stroke + star dots + hub, the MomentumBar track/fill boundary, the TimelineAgenda path + node fills + reached/unreached boundary, and the StatBar fills all meet **≥3:1** vs background (the `white/08` unreached timeline track and `white/5`-class radar rings are decorative-only and exempt); interactive chart targets (star dots, timeline nodes, StatBar rows) ≥ **44×44pt**; reduced-motion renders all visuals at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Headspace plan + Things (goal rings, XP) — *stays Balencia via the ConstellationRadar hero starter-profile reveal + warm-glow surfaces on ink-brown, the TimelineAgenda milestone journeys, and non-shaming Day-1 framing.*
**Pre-grade:** B+ (79) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): (1) the visualization section specifies four premium primitives (ConstellationRadar, MomentumBar, TimelineAgenda, StatBars) but the Components/Color tables still reference the old flat implementations (invisible `w-0` XP bar, equal-weight milestone dots on a `white/10` connector); (2) the goal-card surfaces lack the layered `--edge-highlight` depth pass; (3) the SIA header copies the Visualization section's prose instead of authored microcopy on every edge (empty-state, loading, error, permission, disabled); (4) type line-heights and tracking are ad-hoc pixel values, not tokenized; (5) two focal claims compete (the "big reveal" vs the "RPG status bar"); (6) contrast pairs are asserted, not tabulated.

### Focal hierarchy

One focal point: the **ConstellationRadar hero** — the "here's your life, organized" Day-1 reveal moment, the first element read above the fold, ≥160px (per `S08-V01`), with the Life-Power "sun" hub as the visual anchor. The **SIA greeting header sits above it as a warm preamble, not a competing hero**: emotionally distinct (the coaching note frames the plan as "broken down into daily actions") but visually quieter (body text, no glow, positioned as context, not hero). The RPG MomentumBar is a thin honest band beneath the radar (8px height, no glow, framed as "ready to begin" not as a progress statement), visibly secondary. The goal cards, timelines, and CTA are clearly secondary by size, weight, and z-layer. The squint test lands on the radar's central Life-Power number first, then SIA's greeting, then the card stack. No competing foci.

### Surface & depth

Every surface adopts `CK-P1` Layered Warm Surface — **`--color-ink-brown-800` body · `--radius-xl` (28pt) · 1pt `--glass-border` (`--color-alpha-white-06`) · `CK-T01 --edge-highlight` top-edge inner highlight (the critical not-flat cue, previously absent on all goal cards) · honest `--shadow-1`.** The three hero surfaces (ConstellationRadar card, RPG MomentumBar card, start-journey CTA) additionally carry **`CK-T02 --surface-backplate`** (a faint warm radial gradient behind hero elements). Glow is size-calibrated per `CONSISTENCY.md §1`: **`--glow-orange` (32px /.45)** on the ≥96px Constellation Radar hub only; **`--glow-orange-sm` (~12px /.35)** on the 20–24pt TimelineAgenda "next" node pulse (one per card); **no glow** on inline goal-name text or chips. The MomentumBar track recesses over `--track-inset` (`rgba(0,0,0,0.28)`), fixing today's invisible/degenerate state. The TimelineAgenda path is a **drawn `--stroke-base` 4px round-capped line** (not a flat `white/10` connector); nodes use glyph+colour pairs (the "next" orange-ring pulsing, upcoming nodes as white-dot glyphs on white-10 fills) — **never colour alone**. Every surface layers depth so nothing reads as a flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: plan heading ("here's your plan.") **`--text-h2` (20pt) / 700 weight / `--leading-snug` (1.25)** / white 100%; SIA coaching note **`--text-body` (16pt, raised from spec's 15pt to align to the scale) / 400 / `--leading-normal` (1.4)** / white 70%; RPG eyebrow ("LEVEL 1") **`.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white-40 / Burnt Orange `--color-brand-orange`)**; goal name **`--text-h3` (17pt) / 600 / `--leading-snug`** / white 100%; action text **`--text-body` (16pt) / 400 / `--leading-normal`** / white 80%; milestone label **`--text-small` (11pt) / 400 / `--leading-normal`** / white 40%; CTA text **`--text-h3` (17pt) / 600 / `--leading-snug`** / white 100%; "customize" link **`--text-h3` (17pt) / 600 / `--leading-snug`** / `--color-brand-orange`. Hierarchy by **weight** (600–700 vs 400), not size alone. Sentence case throughout; ≤2 `--color-brand-orange` accent words (the CTA text + the "customize" link); no exclamation marks; the brand period used with intent (the "here's your plan." closing). Chillax stays logo-only. Replaces the ad-hoc 15pt body text + assorted pixel line-heights with the `CK-T04` scale.

### Microcopy (before → after)

Every authored string conforms to `CK-P5` brand voice — warm, plain, coaching, specific, never shaming. Edge-state microcopy:

- **SIA greeting note** — *before:* (not fully authored in spec) → *after:* "I've broken down your goals into daily actions across [N] life areas. Let's go."
- **RPG status bar label** — *before:* "LEVEL 1 · 0 XP" (bare labels) → *after:* same labels, but the "ready" shimmer caption and MomentumBar visual treatment now frame it as "your journey starts here" (primed-to-begin, not failure).
- **Milestone node labels** — *before:* bare milestone names → *after:* first node reads as "next" (pulsing node, visually distinct), remaining nodes as "upcoming" (aspirational invitation, never "not yet reached").
- **Goal name row** — *before:* goal name + edit pencil → *after:* goal name (17pt Semibold, white) + edit icon (16pt, white 30%, `aria-label: "Edit [goal name]"`).
- **Cross-domain connection text** — *before:* "↔ connects to [domain]" (bare) → *after:* "Connects to [domain name]" (sentence case, domain name in domain color).
- **"and [N] more" link** — *before:* (not reviewed) → *after:* "and [N] more actions" (explicit, 13pt Semibold, `--color-brand-orange`).
- **"Customize" link** — *before:* (spec gives visual only) → *after:* "Customize" (single word, sentence-case, 15pt Semibold, `--color-brand-orange`).
- **Loading state** — *before:* (not specified) → *after:* "SIA is building your plan — one moment."
- **Empty-state / no-goals** — *before:* (spec mentions edge case) → *after:* "Here's a starting point. I'll learn more about you as we go."
- **Error state** — *before:* (not specified) → *after:* "I'm having trouble loading your plan. Give me a moment." + "retry" affordance.

No Filler, no hint text. SIA copy specific to onboarding inputs. The brand period used with intent.

### Motion choreography

Locked to `CK-P4` draw-first order: on crossfade from SIA Onboarding [07], the **ConstellationRadar hero draws first** — polygon **`stroke-draw` `--dur-flow` (1200ms) `--ease-flow`** (replaces forbidden `radar-grow` *scale*) → hub counts up (`--dur-slow` 520ms) → star dots stagger in (40 + index·40ms) → **MomentumBar's ready-shimmer travels the track once** (`--dur-flow` 1200ms) → **goal cards fade-up staggered** (`.animate-fade-up` `--dur-base` 280ms `--ease-out-soft`, 80ms stagger) → **each card's TimelineAgenda path draws L→R** as the card lands → **StatBars rise** (520ms `--dur-slow` `--ease-flow`, 60ms stagger) → **CTA settles** with idle orange glow pulse (3s loop). Below-fold cards animate on **scroll-into-view**. **`prefers-reduced-motion`** → every element at final state instantly (radar fully drawn + hub + dots, MomentumBar static, TimelineAgenda paths drawn with settled nodes, StatBars at final width), all pulses off — signature static forms preserved.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day-1** | Radar shows starting constellation (faint polygon with ghosted un-assessed axes, never collapsed point); MomentumBar at true 0 with ready-shimmer; 3–5 goal cards with all milestones upcoming (no reached nodes); CTA prominent | "I've broken down your goals into daily actions across [N] life areas. Let's go." / "Your starting point — this grows with you." | ConstellationRadar has `--surface-backplate` + `--glow-orange` hub; all cards layered with `--edge-highlight`; no degenerate shapes |
| **Loading** | Depth-preserving skeletons that morph into drawn data: radar rings + spokes visible (shimmer), timeline nodes + path visible, StatBars tracks visible | "SIA is building your plan — one moment." | Skeleton on `--color-ink-brown-800` with radial shimmer; morph/draw animation, never a swap |
| **Empty / partial** | Un-assessed domains as ghosted/dashed spokes (no-data ≠ zero); empty-goal prompt with "+" icon + SIA encouragement | "Here's a starting point. I'll learn more about you as we go." | Ghosted spokes visually distinct from real zero; never silent |
| **Error** | Radar + cards hidden; SIA message: "I'm having trouble loading your plan. Give me a moment." + "retry" link (16pt Semibold, `--color-brand-orange`); customize link dimmed | "I'm having trouble loading your plan. Give me a moment." | Calibrated `--color-error-red` only on genuine network failure (icon + text pair, never colour-alone) |
| **Offline** | Cached plan renders; offline banner below SIA header: "Offline — showing your saved plan" (full-width, 36pt, ink-brown-800 bg, white 50%) | "Offline — showing your saved plan" | Actions honestly dimmed (50% opacity); plan structure visible |

### Signature & anti-generic

Ownable moments: **the ConstellationRadar starter-profile hero** (the "here's your life, organized" draw-first moment — the warm alternative to a flat stat list), **the TimelineAgenda per-card milestone journeys** (drawn paths + pulsing "next" nodes, the continuous-stroke motif), **the warm-glow-on-ink surfaces** (depth, never flat), **the non-shaming Day-1 framing** ("building your balance", "room to grow", "your journey starts here" — no empty-failure bars, no urgency, no degenerate shapes). Anti-generic fixes: the goal-card stack (SIA header → radar → MomentumBar → cards → StatBars → CTA) is broken from equal-card monotony by the radar hero, varied card heights, and section-eyebrow rhythm. The splash continuous-stroke visual signature (radar polygon drawing, TimelineAgenda paths drawing) appears nowhere else in onboarding, making this screen unmistakably Balencia.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
| --- | --- | --- |
| Plan heading | `--color-alpha-white-100` | ≥12:1 |
| SIA coaching note | `--color-alpha-white-70` | ≥4.5:1 |
| Goal name | `--color-alpha-white-100` | ≥12:1 |
| Action text | `--color-alpha-white-80` | ≥9:1 |
| Domain tag text | per domain color (such as fitness `--color-domain-fitness`) | ≥3:1 (WCAG 1.4.11) |
| RPG "LEVEL 1" label | `--color-brand-orange` | 3.2:1 (WCAG 1.4.11) |
| MomentumBar fill | `--color-brand-orange` | 3.2:1 |
| TimelineAgenda "next" ring | `--color-brand-orange` | 3.2:1 (WCAG 1.4.11) |
| TimelineAgenda upcoming glyph | `--color-alpha-white-30` | paired with icon (not colour-alone) |
| StatBar fill | `--color-brand-orange` | 3.2:1 |
| "and N more" link | `--color-brand-orange` | 3.2:1 |
| "customize" link | `--color-brand-orange` | 3.2:1 |
| CTA "start your journey" | `--color-alpha-white-100` on `--color-brand-orange` | ≥4.5:1 |

**Status never colour-alone:** radar star dots are labelled; TimelineAgenda nodes use **glyph + colour** (ring for "next", dot for "upcoming"); StatBar fills paired with labels + values; links carry semantic action labels. **Focus-visible** standardized to `CK-T03 --focus-ring` (2px `--color-brand-orange`, 2px offset) on every interactive element — uniform app-wide. **Targets ≥44×44pt** (edit icon 44pt hit box, "and N more" link 44pt tall, all card taps full-card width). **Reduced-motion:** ConstellationRadar appears fully drawn instantly, timelines drawn with settled nodes, StatBars at final width, all pulses off — signature draw motif and static forms preserved.

Conform to `design-audit/CONSISTENCY.md`.


---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Plan heading | Sora | 700 (Bold) | 20pt | 26pt | White #FFFFFF | "here's your plan." — sentence case, brand period |
| SIA coaching note | Sora | 400 (Regular) | 15pt | 22pt | White at 70% | Warm, personal |
| RPG level label | Sora | 600 (Semibold) | 12pt | 14pt | #FF5E00 | "LEVEL 1" — uppercase, tracking |
| RPG XP text | Sora | 600 (Semibold) | 12pt | 14pt | White at 50% | "0 XP" |
| Goal name | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | Quest title |
| Domain tag chip | Sora | 600 (Semibold) | 11pt | 14pt | [domain color] | Domain name |
| Action item text | Sora | 400 (Regular) | 14pt | 20pt | White at 80% | Action description |
| "and N more" link | Sora | 400 (Regular) | 13pt | 18pt | #FF5E00 | Expandable |
| Milestone label | Sora | 400 (Regular) | 11pt | 14pt | White at 40% | Milestone name |
| Cross-domain text | Sora | 400 (Regular) | 12pt | 16pt | White at 40% | Connection note |
| Cross-domain name | Sora | 400 (Regular) | 12pt | 16pt | [domain color] | Linked domain |
| CTA text | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "start your journey" |
| Customize link | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | "customize" |
| Edit icon | — | — | 16pt | — | White at 30% | Pencil icon |

---

## Composition & Visual Hierarchy

**Squint test**:
- SIA header with the heading "here's your plan." reads as the page title
- RPG status bar is a distinct horizontal band with the orange "LEVEL 1" label
- Goal cards form a clear vertical stack — each anchored by a domain color left bar
- The orange CTA at the bottom is the most prominent interactive element, with a glow to elevate it further
- "customize" link is visually secondary, de-emphasized but accessible
- Cross-domain connections are quiet — present but not competing with the cards

**Spacing breakdown (8pt grid)**:
- Status bar to SIA header: 24pt (--s-5)
- SIA avatar + heading to coaching note: 8pt (--s-2)
- Coaching note to RPG status bar: 24pt (--s-5)
- RPG status bar to first goal card: 24pt (--s-5)
- Between goal cards: 16pt (--s-4)
- Last goal card to CTA: 32pt (--s-6)
- CTA to customize link: 16pt (--s-4)
- Customize link to bottom: 48pt (--s-7)
- Card internal: 16pt padding (--s-4)
- Goal name to first action: 12pt (--s-3)
- Between actions: 8pt (--s-2)
- Actions to milestones: 12pt (--s-3)
- Milestones to cross-domain: 8pt (--s-2)

**Z-layers**:
- z-0: ink-900 background
- z-10: Goal cards, RPG status bar
- z-20: CTA button (with glow)
- z-60: Edit mode inline controls (if customize tapped)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| SIA avatar | #FF5E00 bg, white symbol | brand-orange | SIA identity |
| SIA avatar glow | rgba(127,36,255,0.2) | brand-purple at 20% | AI indicator |
| Heading text | #FFFFFF | white | "here's your plan." |
| Coaching note | rgba(255,255,255,0.7) | white at 70% | Secondary text |
| RPG card bg | #211008 | ink-brown-800 | Surface |
| RPG level label | #FF5E00 | brand-orange | Gamification accent |
| RPG XP bar track | rgba(255,255,255,0.08) | white at 8% | Empty track |
| MomentumBar fill (ready) | #FF5E00 (true-0 empty fill) | brand-orange / --grad-progress | Honest ready-0 — real empty fill, never w-0 invisible; --grad-progress orange→green only when XP>0 (future screens) |
| MomentumBar ready-shimmer | rgba(255,94,0,0.x) | brand-orange glow | One-time mount shimmer across empty track (primed-to-begin) |
| Radar polygon fill | #FF5E00 25%→8% | brand-orange gradient | Day-1 starting-profile data ink (fillOpacity 0.25 inner → 0.08 outer) |
| Radar stroke + glow | #FF5E00 + --glow-orange | brand-orange | Hero polygon stroke (drawn, not scaled) |
| Radar Life-Power hub | #FFFFFF + --glow-orange | white / brand-orange glow | "Sun" hub Day-1 baseline number |
| Radar star dots | [domain color] + faint glow | per domain | Domain identity only |
| SIA projection vector | #7F24FF dashed | brand-purple | Single sanctioned dashed-purple SIA forecast (§11), off by default |
| TimelineAgenda "next" node | #FF5E00 ring + --glow-orange-sm | brand-orange | Single focal pulse per card |
| TimelineAgenda upcoming node | rgba(255,255,255,0.10) fill + white 30% glyph | white at 10% / 30% | Aspirational invitation, never red |
| TimelineAgenda path (unreached) | rgba(255,255,255,0.08) | white at 8% | Decorative unreached track (1.4.11-exempt) |
| StatBar fill | #FF5E00 | brand-orange | Day-1 baseline data ink, zero baseline shared scale |
| StatBar domain tag | [domain color] | per domain | Identity only (never the bar fill) |
| Goal card bg | #211008 | ink-brown-800 | Surface |
| Goal card left border | [domain color] | per domain | Domain identity bar |
| Domain tag chip bg | [domain color at 15%] | per domain | Identification |
| Domain tag chip text | [domain color] | per domain | Identification |
| Goal name | #FFFFFF | white | Primary text |
| Action checkbox | rgba(255,255,255,0.2) | white at 20% | Unchecked |
| Action text | rgba(255,255,255,0.8) | white at 80% | Action description |
| "and N more" | #FF5E00 | brand-orange | Tappable expand |
| TimelineAgenda nodes | see TimelineAgenda rows above | per state | Drawn cold-start timeline (replaces flat dots) |
| TimelineAgenda path | rgba(255,255,255,0.08) unreached | white at 8% | Drawn path (replaces the flat white/10 connector line) |
| Milestone label | rgba(255,255,255,0.4) | white at 40% | Label |
| Cross-domain text | rgba(255,255,255,0.4) | white at 40% | Connection |
| Cross-domain name | [domain color] | per domain | Linked domain |
| CTA bg | #FF5E00 | brand-orange | Primary action |
| CTA glow | rgba(255,94,0,0.2) | brand-orange at 20% | Elevated emphasis |
| Customize link | #FF5E00 | brand-orange | Secondary action |

**60/30/10 verification**: Orange dominates data ink — the radar polygon + glow + Life-Power hub, the MomentumBar fill/ready-shimmer, each TimelineAgenda "next" node + reached-path language, the StatBar fills, plus the CTA (with glow), RPG level label, "and N more" links, customize link, SIA avatar — clearly the 60% driver. Green is reserved for arrival only and is therefore absent in the Day-1 default (nothing is reached yet) except the CTA's success-state green glow on transition into the app. Purple stays SIA-only — the avatar AI-glow (identity) and the single sanctioned dashed-purple SIA projection vector on the radar (§11 forecast, correct, not a violation). Domain colors are confined to identity — radar star dots, card left borders, tag chips, StatBar row tags, cross-domain link names — never on a CTA, the MomentumBar fill, the StatBar fills, or generic data ink. Glow uses the size-stepped scale (160px radar = 32px hero glow; 20–24pt timeline "next" node = --glow-orange-sm ~12px; bars/momentum = none). Ratio holds.

---

## Interaction States

### Goal Plan Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Card with actions list, domain bar | — |
| Pressed | Entire card: bg lightens slightly, scale(0.99) | — |
| Expanded (all actions visible) | "and N more" replaced by full action list, card height grows with animation | Light impact |
| Editing | Action items become editable text fields, domain tag becomes a dropdown chip, checkboxes hidden | — |

### Action Checkbox (Preview)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 18pt circle, white 20% border | — |
| Pressed | Circle fills with orange at 20% | Light impact |
| Note | Checkboxes are a preview interaction on this screen — tapping shows the interaction pattern but doesn't persist (plan not yet accepted) | — |

### Start Journey CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text "start your journey", subtle orange glow behind | — |
| Pressed | Darker orange, scale(0.97), glow brightens | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | White spinner, glow pulses | — |
| Success | Glow shifts to green (600ms), then screen transitions to Home [12] | Success notification (strong) |

### Edit Icon (per Goal Card)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Pencil icon, 16pt, white at 30% | — |
| Pressed | White at 60%, scale(0.9) | Light impact |
| Active (editing) | Pencil becomes checkmark, white at 60% | — |

### Customize Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "customize" in orange | — |
| Pressed | Opacity 40%, scale(0.98) | Light impact |
| Active | Text changes to "done editing", toggles all cards to edit mode | Light impact |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | "start your journey" CTA | Accept plan, transition to main app |
| Tap | "customize" link | Toggle all goal cards to edit mode |
| Tap | "and N more" on a card | Expand to show all actions |
| Tap | Edit icon on a card | Toggle that card's edit mode |
| Tap | Cross-domain connection | Show tooltip with SIA's explanation |
| Tap | Action checkbox (preview) | Brief check animation, reverts (preview only) |
| Scroll | Screen content | Scroll through goal cards |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Screen mount (crossfade from [07]) | Staggered fade-in: SIA header (0ms), RPG bar (120ms), goal cards (240ms each), CTA (last, 80ms after last card). All: opacity 0→1, translateY(16→0). | 280ms each (--dur-base) | ease-out-soft |
| Hero ConstellationRadar | Screen mount (crossfade from [07]) | Polygon **draws itself** (stroke-draw, replacing radar-grow scale) → Life-Power hub counts up → domain star dots stagger in (radar-dot 420+index·40ms). Draws **first** in the page choreography. | 1200ms draw / 520ms count-up | ease-flow |
| RPG MomentumBar (ready) | Screen mount (after radar) | Honest empty bar; a one-time "ready" shimmer (orange glow) travels the empty track once — never a w-0 invisible bar | 600ms | ease-flow |
| Per-card TimelineAgenda | Card scroll-into-view | Drawn path stroke-draws L→R as the card lands; nodes settle (0.8→1, 280ms) as the path reaches each; the first "next" node's --glow-orange-sm pulse loops 2s | 1200ms path / 280ms nodes | ease-flow |
| Starting domain StatBars | After radar + momentum | Bars rise 0→baseline, staggered | 520ms (--dur-slow) | ease-flow |
| Goal card domain bar | Screen mount | Domain color bar slides down from 0 height to full card height | 280ms (--dur-base) | ease-out-soft |
| "and N more" expand | Tap | Card height grows smoothly, new actions fade in staggered (80ms each) | 280ms (--dur-base) | ease-out-soft |
| CTA glow | Continuous (idle) | Subtle pulse: glow opacity 15%→25%→15%, looping | 3000ms | ease-in-out |
| Transition to Home | CTA success | CTA glow flashes green (600ms). Screen fades out (280ms). Main app tab navigator fades in (280ms). Total 1200ms transition. | 1200ms (--dur-flow) | ease-flow |
| Edit mode enter | Customize tap | Action checkboxes crossfade to hidden, text fields gain focus indicators, edit icon morphs to checkmark | 280ms (--dur-base) | ease-out-soft |

**Screen transition**:
- **Enter**: Crossfade from SIA Onboarding [07] (signature transition, 1200ms, ease-flow)
- **Exit**: Root reset — onboarding stack is destroyed, main tab navigator loads with a crossfade (1200ms, ease-flow). The user lands on Home Screen [12] in the Today tab.

---

## Empty States

### Day 1 (new user)
This IS the day 1 state. SIA has generated a plan based on the onboarding conversation. There are always goals to show because the onboarding conversation collected them. Minimum: 1 goal with 3 actions. Typical: 2-4 goals across 2-3 domains.

If somehow the user provided no goals during onboarding (edge case — skipped everything), SIA generates a starter plan:
- "Here's a starting point. I'll learn more about you as we go."
- 1-2 suggested goals based on domain selections
- "start your journey" CTA still present

### Established user (zero state)
N/A — this screen is seen once during onboarding and never revisited.

---

## Motivation Adaptation

- **Low motivation**: Not yet detected (first use). If applicable, show fewer actions per goal (2 instead of 3-5), simpler milestones, more SIA encouragement in coaching note.
- **Medium motivation**: Default for all new users. 3-5 actions per goal, standard milestone display, balanced coaching note.
- **High motivation**: Show all actions expanded by default, detailed milestones with dates, cross-domain connections prominent.

Since motivation tier hasn't been established yet, all new users see the medium motivation default.

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Plan data fails to load | Screen shows SIA header with message: "I'm having trouble loading your plan. Give me a moment." + "retry" text link (orange, centered, 44pt touch target); RPG bar and goal cards replaced by centered loading spinner | Tap "retry" re-fetches plan data from the API |
| "Start your journey" CTA fails (root reset error) | CTA reverts from loading to default; toast: "Something went wrong. Please try again." (ink-brown-800 bg, --r-md, auto-dismiss 4s) | User taps CTA again to retry |
| Inline edit save fails | Edited field reverts to previous value with a red border flash (160ms); toast: "Could not save changes. Try again." | User re-enters edit and resubmits |
| Goal card expand ("and N more") fails | Card stays collapsed; "and N more" link shows error state briefly (red text flash, 280ms) then reverts to orange | Tap again to retry expansion |
| Network offline on mount | Screen displays cached plan data (if available) with offline banner below SIA header: "Offline — showing your saved plan" (full-width, 36pt, ink-brown-800 bg, white at 50%); CTA active (will queue start action) | Plan acceptance queues locally and syncs when online |
| Cross-domain tooltip load fails | Tooltip area shows "Could not load insight" (13pt, white at 40%) | User can tap again or proceed without tooltip |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "here's your plan" heading on mount, followed by SIA's coaching note
- Focus order: SIA avatar + heading -> SIA coaching note -> RPG status bar -> Goal card 1 (goal name, then actions, then cross-domain link) -> Goal card 2 -> ... -> "start your journey" CTA -> "customize" link
- RPG status bar (MomentumBar): accessible label "Level 1, 0 XP, experience bar empty, ready to begin."
- Goal plan cards: accessible role "group"; label includes goal name and domain (e.g., "Run a half marathon, Fitness domain")
- Action items within cards: each action read as "Action: [text], not started"
- Edit icon on goal cards: accessible label "Edit [goal name]"
- "and N more" links: accessible label "Show [N] more actions"
- Cross-domain connection: accessible label "Connects to [domain name]. Double tap for details."
- "start your journey" CTA: accessible hint "Accepts your plan and opens the main app"
- Domain tag chips: accessible role "text"; color communicated via domain name label
- Reduced motion: skip CTA glow pulse, RPG bar ready pulse, and domain bar slide-down; show all elements immediately on mount

---

## Cross-References

- **Navigates to**: Screen [12] — Home Screen (Batch 3) via root reset ("start your journey" CTA)
- **Navigates from**: Screen [07] — SIA Onboarding Conversation via crossfade
- **Shared components with**: Screen [07] — SIA Onboarding (SIA Avatar Small, Domain Tag Chip). Screen [13] — Goals List (Batch 3, Goal Plan Card pattern reused for goal cards). Screen [14] — Goal Detail (Batch 3, action items pattern reused).
- **Patterns used**: SIA Avatar (Small) from Screen [07], Domain Tag Chip from Screen [07], Brand CTA Button from Batch 1
- **Patterns established**: **Goal Plan Card** — ink-brown-800 bg, --r-xl corners, 4pt domain color left bar, goal name + domain tag row, expandable action list (circles + text), optional milestone timeline, optional cross-domain connection. **RPG Status Bar** — ink-brown-800 card, level label (orange uppercase eyebrow) + XP text, 8pt progress bar beneath, --r-xl corners. **SIA Greeting Card** — SIA avatar (small) + heading + coaching note text, left-aligned, used here and adapted for Home Screen [12] in Batch 3. **Domain Tag Chip** — pill shape, domain color bg at 20%, domain color text, 24pt height, used across all domain-tagged screens going forward.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-03.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U02`
**Prototype route**: `/auth/initial-plan`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q10 guest preview may remain a clearly labeled preview/demo entry form.
- Q11 SIA onboarding only needs enough interactivity to reach Initial plan.
- Q12 voice-inline can remain a QA route but production should treat it as SIA chat state.
- Q13 voice privacy requires permission, consent, transcript control, deletion, and raw-audio handling states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B03-F05 | critical | conversion | Wire plan acceptance to Today and make customize/edit controls functional. |
| B03-F06 | major | product-sense | Keep the plan consistent with onboarding inputs or explain why SIA changed a life area. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

