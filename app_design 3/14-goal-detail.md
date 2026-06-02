# Screen Design: Mission Detail

**Screen**: 14 of 74
**File**: 14-goal-detail.md
**Register**: Product Mode
**Primary action**: Complete the next action (tap checkbox on the prominent next action card)
**Tab**: Goals (stack depth 1)
**Navigation**: Pushed from Mission Board [13] (tap mission card) or Home Screen [12] (tap pinned mission card). Back button returns to previous screen. Edit button (top-right) opens Create Mission [15] as modal. Pin button toggles home pin state.

---

## Purpose

The Mission Detail screen is the deep view of a single mission — where the user understands not just their progress percentage but why it matters, what to do next, and where this mission sits in a larger chain. It uses two-level progressive disclosure: a scannable summary (the default) that answers "am I on track?" and an expandable full detail view that answers "what's the complete picture?" SIA is woven throughout — coaching notes, chain suggestions, stalled-mission nudges, and cross-domain connections all surface here. The prominent next action card ensures the user always knows their immediate next step.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Large progress ring — the hero element, immediate progress feedback
2. Mission name + mission type badge + domain tags — identification, classification, and context
3. Next action card — the primary call to action, most prominent interactive element
4. Stats row (actions count, streak, XP, difficulty) — quick metrics at a glance
5. SIA coaching note / Stalled mission nudge — ambient intelligence, personalized context
6. Expandable detail sections — deeper information on demand (including mission chain)
7. "Ask SIA about this mission" shortcut — conversational escape hatch

**User flow**:
- **Arrives from**: Mission Board [13] via stack push (tap mission card), Home Screen [12] via stack push (tap pinned mission card)
- **Primary exit**: Mission Board [13] via stack pop (back button or swipe-right gesture)
- **Secondary exits**: Create Mission [15] via modal present (tap edit button), SIA Chat [09] via tab switch (tap "ask SIA" shortcut), domain dashboards [26-36] via stack push (tap domain tag chip), other Mission Detail [14] instances via stack push (tap cross-domain connection card or chain mission link)

---

## Layout

**Scroll behavior**: ScrollView (mixed content, expandable sections — not a flat list)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  ‹  Run a half marathon 📌✎│  ← back (left), pin + edit (right)
├─────────────────────────────┤
│                             │
│         ╭───────╮           │
│         │       │           │
│         │  68%  │           │  ← large progress ring (96pt)
│         │       │           │
│         ╰───────╯           │
│                             │
│    Run a half marathon      │  ← mission name, center-aligned
│        🥈 main mission      │  ← mission type badge, centered
│    🔴fitness  🟢nutrition   │  ← domain tags, centered
│                             │  ← 24pt gap
│  ┌───────────────────────┐  │
│  │ 7 actions   🔥 12d    │  │  ← stats row
│  │ across 3    ⚡ 340 XP  │  │
│  │ life areas  🟢 easy    │  │  ← + difficulty indicator
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │ SIA: "Strong momentum │  │  ← SIA coaching note card
│  │ this week. Your tempo  │  │     (OR stalled nudge if 7+ days)
│  │ runs are paying off."  │  │
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│  NEXT UP                    │  ← eyebrow label
│  ┌───────────────────────┐  │
│  │ ☐  5K tempo run       │  │  ← prominent next action card
│  │    🔴fitness · 30 min │  │
│  │    "This builds the   │  │
│  │     endurance base."  │  │
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  ─── Expandable sections ──│
│                             │
│  ▸ All actions (5/7 done)  │  ← collapsible
│  ▸ Milestones              │  ← collapsible
│  ▸ Mission chain (2 of 4)  │  ← collapsible (NEW - Phase 2)
│  ▸ SIA's reasoning         │  ← collapsible
│  ▸ Cross-domain links      │  ← collapsible
│  ▸ Progress over time      │  ← collapsible (contains chart)
│                             │
│  ┌───────────────────────┐  │
│  │ 💬 Ask SIA about this │  │  ← SIA shortcut card
│  │    mission            │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  [Today]  [SIA] [Goals] [Me]│
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Bar** — 44pt
   - Purpose: Back navigation, pin toggle, and edit action
   - Content: Back button (left), mission name truncated (center), pin icon + edit icon (right)

2. **Hero Progress Ring** — 96pt ring + 32pt top padding + 16pt bottom gap = 144pt
   - Purpose: Immediate visual progress feedback — the dominant element
   - Content: Large progress ring with percentage, centered

3. **Mission Identity Block** — ~80pt
   - Purpose: Mission name, type badge, and domain context
   - Content: Mission name (centered) + mission type badge (centered) + domain tag chips (centered row below)

4. **Stats Row Card** — 80pt + 16pt gaps = 96pt
   - Purpose: Quick metrics at a glance including difficulty
   - Content: Action count, life area count, streak days, XP earned, difficulty tier

5. **SIA Coaching Note Card / Stalled Mission Nudge** — ~72-120pt (conditional)
   - Purpose: Personalized coaching context from SIA, or stalled-mission intervention
   - Content: Either SIA coaching note OR Stalled Mission Nudge (if 7+ days no progress)

6. **Next Action Card** — ~96pt (eyebrow + card)
   - Purpose: The primary CTA — what to do right now
   - Content: Eyebrow "NEXT UP" + action card with checkbox, domain tag, time, SIA reason

7. **Expandable Detail Sections** — variable (each header ~48pt collapsed, expanded content varies)
   - Purpose: Full detail on demand via progressive disclosure
   - Content: 6 collapsible sections (actions, milestones, mission chain, reasoning, connections, progress chart)

8. **Ask SIA Card** — 56pt + 32pt top gap = 88pt
   - Purpose: Conversational shortcut to discuss this mission with SIA
   - Content: Chat icon + "ask SIA about this mission" label

9. **Bottom Spacer** — 24pt
   - Purpose: Breathing room above tab bar

---

## Components

### Navigation Bar
- **Purpose**: Back navigation, screen title, pin toggle, edit action
- **Visual treatment**: 44pt height, transparent bg (scrolls under sticky status bar). On scroll past hero: bg transitions to ink-900 at 80% + backdrop-blur(16px), mission name fades in at center.
- **Sub-elements**:
  - Back button: left chevron, white, 20pt icon, 44x44pt touch target, 16pt from left edge.
  - Center title: mission name truncated, 17pt Sora Semibold, white. Opacity 0 at default, fades to 1 when hero scrolls off-screen.
  - Pin button: pin outline icon, 20pt, 44x44pt touch target. Unpinned: white at 60%. Pinned: filled pin, orange (#FF5E00). 8pt gap from edit button.
  - Edit button: pencil icon, 20pt, white, 44x44pt touch target, 16pt from right edge.
- **Gestures**: Back button tap → stack pop. Pin button tap → toggle pin state (max 3 limit applies). Edit button tap → modal present Create Mission [15] in edit mode. iOS swipe-right-from-edge → stack pop.

### Hero Progress Ring (Large Variant)
- **Purpose**: The dominant visual element — immediate progress communication
- **Visual treatment**: 96pt diameter, **8px stroke** (`--stroke-bold`, the locked 96px GaugeRing value — supersedes the prior "6pt" figure). Arc-following `--grad-orange` gradient stroke (conic-mask, not flat SVG linearGradient), `--track-inset` beveled track under the white-at-10% track, full `--glow-orange` (32px, hero-only), 12 radial hero ticks. Fill: orange (#FF5E00) clockwise from 12 o'clock; green (#34A853) at 100%; calm gray (#6B7280) when archived — status carried by the number + a visible state word, never an alarm colour. Per Visualization S14-V01.
- **Percentage**: 24pt Sora Bold, white, centered inside ring
- **Position**: Centered horizontally, 32pt below navigation bar
- **Animation**: Ring fill animates from 0→current% on mount, 520ms ease-flow. On progress update (action completed), ring fill animates from old%→new%, 280ms ease-out-soft.

### Mission Identity Block
- **Purpose**: Mission name, type classification, and domain context immediately below the hero ring
- **Sub-elements**:
  - Mission name: 20pt Sora Semibold, white, center-aligned, 2 lines max. 16pt horizontal margins.
  - Mission type badge: centered, 4pt below name. Uses Mission Type Badge pattern (metallic pill, 24pt tall). Standalone variant (centered, not inline with tags).
  - Domain tag chips: centered row, 8pt gap between chips, 4pt below badge. Uses Domain Tag Chip pattern (tappable variant — tap navigates to domain dashboard).
- **Size**: Full-width, ~80pt (1-line name) to ~104pt (2-line name)

### Stats Row Card
- **Purpose**: Quick mission metrics in a compact card
- **Visual treatment**: ink-brown-800 (#211008) card, 14pt border radius (--r-md, card height under 80pt), 24pt internal padding. Full-width minus 32pt (16pt margins).
- **Layout**: Three rows:
  - Row 1: "[#] actions across [#] life areas" — 14pt Sora Regular, white at 70%
  - Row 2: "🔥 [##]d" streak (14pt Sora Semibold, white at 70%) + "⚡ [##] XP" (14pt Sora Semibold, orange)
  - Row 3: Difficulty Tier Indicator — dot (8pt) + label ("easy" / "moderate" / "hard") (13pt Sora Regular, white at 60%). Tappable → tooltip.
- **Size**: Full-width minus 32pt, 80pt tall

### SIA Coaching Note Card
- **Purpose**: SIA's personalized assessment of this mission's current state
- **Condition**: Only shows when mission.days_since_last_action < 7 (otherwise Stalled Mission Nudge shows instead)
- **Data source**: SIA coaching engine (contextual to this mission's progress, recent actions, patterns)
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Purple (#7F24FF) left border accent, 3pt wide, 40% opacity. This is one of the max-2 purple elements on this screen.
- **Sub-elements**:
  - "SIA" label: 11pt Sora Semibold, white at 40%, top-left
  - Note text: 15pt Sora Regular, white at 80%, 2-3 lines
- **Size**: Full-width minus 32pt, ~72pt tall
- **Variants**: Encouraging ("Strong momentum this week."), Nudging ("2 days behind schedule. Want to adjust the timeline?"), Celebrating ("On track to finish 2 weeks early.")

### Stalled Mission Nudge (Conditional)
- **Purpose**: Compassionate intervention when mission has 7+ days without progress
- **Condition**: Only shows when mission.days_since_last_action >= 7
- **Replaces**: SIA Coaching Note Card (same position in layout)
- **Visual treatment**: Uses Stalled Mission Nudge pattern from `_shared-patterns.md` — ink-brown-800, 28pt radius, amber (#F59E0B at 50%) left border, coaching message + action chips
- **Action chip behaviors**:
  - "adjust timeline" → inline date picker overlay for milestone dates
  - "reduce scope" → modal present Create Mission [15] in edit mode with SIA simplification pre-applied
  - "pause" → pauses mission, card switches to paused state, Quick Actions Menu updates
  - "archive" → confirmation bottom sheet: "Archive this mission? You'll receive [##] XP for your progress so far." Actions: "archive" (orange) + "cancel" (white at 40%)
- **Size**: Full-width minus 32pt, ~120pt tall

### Next Action Card
- **Purpose**: The single most important thing the user should do next for this mission
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Slightly elevated — warm shadow (0 2pt 12pt rgba(33,16,8,0.4)). This is the most visually prominent card on the screen after the hero ring.
- **Sub-elements**:
  - Completion checkbox: 28pt circle (slightly larger than action card standard), left-aligned. Default: 2pt white at 30% border. Completed: orange fill, white checkmark.
  - Action text: 16pt Sora Semibold, white, right of checkbox (12pt gap), 2 lines max
  - Domain tag chip + estimated time: below action text, 4pt gap. Tag(s) + "· [##] min" in 13pt Sora Regular, white at 50%
  - SIA reason: "This builds the endurance base." — 13pt Sora Regular, white at 50%, below domain/time row, 4pt gap
- **Size**: Full-width minus 32pt, ~96pt tall
- **Gestures**: Tap checkbox → complete action (success animation + haptic, ring updates, next action transitions in). Tap card body → no separate action (checkbox is the interaction).

### Expandable Section Header
- **Purpose**: Toggle for progressive disclosure sections
- **Visual treatment**: Full-width row, no card surface. 48pt tall, 16pt horizontal margins.
- **Sub-elements**:
  - Chevron: 14pt, white at 40%, rotates 90° on expand (▸ → ▾). Left side.
  - Section title: 15pt Sora Semibold, white at 80%, 8pt right of chevron
  - Counter badge (where applicable): "5/7 done" or "2 of 4" — 12pt Sora Regular, white at 40%, right-aligned
- **Divider**: 1pt white at 5% line below each header (except last)
- **Gestures**: Tap full row → toggle expand/collapse
- **States**: Collapsed (default), expanded (content visible below)

### Expandable Section: All Actions
- **Content**: Vertical checklist of all decomposed actions for this mission
- **Each row**: 44pt tall
  - Checkbox: 20pt circle, 2pt border. Completed: orange fill + white checkmark. Incomplete: white at 30% border.
  - Action text: 15pt Sora Regular, white (incomplete) or white at 40% + strikethrough (completed)
  - Domain tag chip: right-aligned, small
- **Interaction**: Tap checkbox → toggle completion (updates progress ring above)

### Expandable Section: Milestones
- **Content**: Vertical timeline of milestones with target dates
- **Each milestone**: 56pt tall
  - Milestone dot: 12pt circle. Completed: green (#34A853) fill. Upcoming: orange (#FF5E00) border. Future: white at 20% border.
  - Connecting line: 2pt vertical, white at 10%, between dots
  - Milestone text: 15pt Sora Regular, white
  - Target date: 13pt Sora Regular, white at 50%, right-aligned
  - Status: "completed May 15" or "target Jun 30" — 12pt Sora Regular, green or white at 40%

### Expandable Section: Mission Chain (Phase 2)
- **Purpose**: Show this mission's position in a sequential chain and what comes next
- **Condition**: Only present for missions that are part of a chain
- **Header**: "▸ Mission chain" + "2 of 4" counter badge
- **Expanded content**:
  - Chain visualization (vertical timeline, same pattern as Milestones):
    - Completed missions: green (#34A853) dot (12pt), mission name (15pt Sora Regular, white at 40%, strikethrough), XP earned (12pt Sora Regular, orange at 60%). Tap → navigate to that mission's detail.
    - Current mission: orange (#FF5E00) dot (12pt) with a size-calibrated `--glow-orange-sm` (~12px, **not** the 32px hero glow) pulse + a visible "now" glyph/word beside the dot (never colour-alone), mission name (15pt Sora Semibold, white), mini progress ring (20pt, inline right). Per Visualization S14-V02 (corrects the built ChainProgressBar's hard-coded 32px glow + aria-hidden colour-only dots).
    - Upcoming missions: white at 20% dot (12pt), mission name (15pt Sora Regular, white at 50%)
    - Connecting line: 2pt vertical, white at 10%
  - "What comes next" card (below chain visualization, 16pt top margin):
    - Only shows if SIA has a suggestion for the next chain step
    - Surface: ink-brown-800, 14pt radius, 16pt padding
    - Content: "SIA suggests:" (11pt Sora Semibold, white at 40%) + suggested mission name (15pt Sora Semibold, white) + type badge + domain tag
    - Actions: "accept" (15pt Sora Semibold, orange) + "modify" (15pt Sora Semibold, white at 60%) + "dismiss" (15pt Sora Semibold, white at 40%)
    - Accept → creates mission with chain link (navigates to new Mission Detail [14])
    - Modify → opens Create Mission [15] with chain context and SIA suggestion pre-filled
    - Dismiss → card fades out (SIA may suggest again later)

### Expandable Section: SIA's Reasoning
- **Content**: SIA's explanation of why the mission is structured this way and how actions connect
- **Visual**: Body text, 15pt Sora Regular, white at 80%, 16pt horizontal margins
- **Sub-elements**:
  - "why this mission matters" — 13pt Sora Semibold, white at 50%, section sub-heading
  - Reasoning text: 2-4 lines, conversational SIA voice
  - "how actions connect" — 13pt Sora Semibold, white at 50%
  - Connection text: explains cross-domain strategy

### Expandable Section: Cross-Domain Connections
- **Content**: How this mission connects to other missions across life domains
- **Each connection**: ink-brown-800 mini-card, 12pt radius, 12pt padding
  - Connected mission name: 14pt Sora Semibold, white
  - Domain tag chip(s)
  - Connection explanation: "This connects to your Finance goal because consistent exercise reduces healthcare costs." — 13pt Sora Regular, white at 60%
- **Gesture**: Tap mini-card → stack push to that mission's Mission Detail [14] (recursive navigation)

### Expandable Section: Progress Over Time
- **Content**: Line chart showing mission progress over time
- **Visual treatment**: ink-brown-800 card, 28pt radius, 24pt padding. Chart area: 180pt tall.
- **Chart specifications**:
  - X-axis: time (weeks or months depending on mission duration), 12pt Sora Regular, white at 30%
  - Y-axis: progress % (0-100), 12pt Sora Regular, white at 30%
  - Past data line: 2pt solid, orange (#FF5E00), with dot markers at data points (6pt circles, orange fill)
  - Projected line: 2pt dashed, purple (#7F24FF) at 60%. This is the second purple element on this screen (if SIA coaching note is the first).
  - Milestone markers: 8pt circles, green (#34A853) fill, on the data line at milestone dates
  - Fill area below past data: orange at 5% opacity (subtle gradient)
  - Grid lines: 1pt, white at 3%, horizontal only
- **Time range selector**: "week | month | all" chips below chart, 28pt tall, same chip style as type filter chips on Mission Board [13]
- **Size**: Full-width minus 32pt, ~240pt total (chart + selector + padding)

### Ask SIA Card
- **Purpose**: Quick shortcut to discuss this mission with SIA in chat
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Single row layout.
- **Sub-elements**:
  - Chat bubble icon: 20pt, orange (#FF5E00), left side
  - Label: "ask SIA about this mission" — 15pt Sora Semibold, white, 12pt right of icon
  - Chevron: 14pt, white at 40%, right-aligned
- **Size**: Full-width minus 32pt, 56pt tall
- **Gestures**: Tap → tab switch to SIA Chat [09] with this mission's context pre-loaded (SIA opens with "What would you like to know about [mission name]?")

---

## Visualization

> Source: embedded section (no companion file); Audited in `viz-audit/` — Batch 5 (Progress/Awards C), findings `S14-V01..S14-V06`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10 → **Product Mode, orange-dominant**; purple stays SIA-only incl. the dashed-purple projection); domain colours stay *identity*-only on tag chips. Benchmark = **Streaks + Habitica detail** (mission progress, action chains, completion timelines) rendered **the Balencia way** (warm-glow GaugeRing + Living Line + a non-shaming stalled state), not a Habitica/Streaks clone. **Current grade D (52) → specced-target A− (86).** *(Honest re-grade under the 10-dimension rubric; the residual gap to A+++ is build-verified depth + a working scrub/drill on the XP Living Line, owned by the later viz-build program.)*

This is a **Progress/Awards C** detail screen. Today it renders as a near-flat text page: the hero `ProgressRing` is an 8px **flat 2-tone** ring (no gradient, no glow, no inset track, no ticks — depth dim 3 fail); the "Mission chain" section renders **flat `MissionTypeBadge` rows + a text status word** (the built `ChainProgressBar` is **not even mounted** here — Hero/Kit miss); the "Progress over time" section is a **flat orange `<div>` bar + a sentence**, where the spec itself calls for a line chart with an orange actual line, **green milestone dots**, and a **dashed-purple SIA projection** (a real, un-built viz claim — Data-resolution + Chart-honesty miss); stats (actions/streak/XP/difficulty) are **bare emoji text**; the difficulty-hard dot is **alarm `error-red` conveyed by colour alone** (non-shaming + 1.4.11 + colour-alone miss). This section upgrades *how the data reads* — a depth hero `GaugeRing`, a depth-calibrated action **chain**, a completion **TimelineAgenda**, the XP **Living Line**, and **sub-goal StatBars** — **without** displacing the Next-Action card, which stays the primary *interaction*. Mints **no new primitive**; it reuses `VK-014 TimelineAgenda` (minted by Streak [59] this batch) and retires kit backlog (`GaugeRing`, `MomentumBar`, `TrendChart`/`VK-016`, `MacroBar`/StatBars).

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Mission completion % (e.g. 68) | flat 8px 2-tone `ProgressRing` (no depth) | **hero `GaugeRing` 96px** — arc-following gradient stroke, 32px hero glow, inset track, hero `ticks`, center count-up; green at 100%, calm gray when archived | `GaugeRing` (`VK-002`) |
| Action chain — `current / complete / future` steps (2 of 4) | flat `MissionTypeBadge` rows + text status; `ChainProgressBar` **not mounted** | **depth `ChainProgressBar`** — complete (green) / current (orange + *calibrated* `--glow-orange-sm`, **not** the 32px hero glow) / future (white/20) steps, brought to depth | `ChainProgressBar` (depth pass) |
| Completion timeline — milestones + dates (completed / target) | flat date rows, no temporal axis | **`TimelineAgenda`** — vertical dated spine, completed=green node / next=orange node / future=white-20, connecting stroke draws downward | `TimelineAgenda` (`VK-014`, reused from [59]) |
| XP earned over time + SIA projection-to-next-level | flat orange `<div>` bar + a sentence ("Progress over time") | **XP `TrendChart` — a Living Line** — solid orange actual → **dashed-purple** SIA projection to the level/finish target; **green milestone dots** on XP-unlock weeks; `--grad-orange` area fade | `TrendChart` (`VK-006`/`VK-016`) |
| Sub-goals / decomposed actions (5 of 7) — per-action progress | flat checklist rows | **`StatBars`** — labelled value-vs-target horizontal bars (track-inset + orange fill), one per sub-goal/action group | `MacroBar`/`StatBars` (depth pass) |
| Stats — actions (7) · streak (12d) · XP (340) | bare emoji text (`🔥 12d`, `⚡ 340 XP`) | **`KPIStatTile` row** — number + uppercase label + honest delta where a window exists (streak +Δ this week); difficulty stays a labelled chip, never a verdict | `KPIStatTile` (`VK-008`) — *secondary* |
| Mission name / type badge / domain tags / SIA note / reasoning | text / metallic badge / chips | — (deliberately textual / identity) | — |
| Difficulty tier (easy/moderate/hard) | colour-only dot, **hard = alarm red** | dot **+ a visible word label**, hard rendered as a **neutral/identity** tone (never alarm-red as a verdict) | — (non-shaming fix, dim 6/10) |

**Editorial hierarchy (calm, not maximal):** the **hero `GaugeRing` is the one viz hero**; the **Next-Action card stays the primary interaction**; the action chain + sub-goal StatBars are clearly secondary; the completion `TimelineAgenda` and XP Living Line live inside their existing **collapsed** expandable sections (revealed on demand — premium hides depth, not data). One full Living Line on the surface (§8) — the XP trend; everything else is rings/bars/timeline.

### 1 · Hero mission gauge — `S14-V01` → `GaugeRing` (96px)

Promote the flat hero ring to a **96px `GaugeRing`** with an **arc-following gradient stroke** (`--grad-orange` **(mint)** via conic-mask — *not* a flat SVG `linearGradient`; the angular-gradient trap), the full `--glow-orange` (32px, hero-only), a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled track under the `--color-alpha-white-10` track, **8px stroke** (`--stroke-bold`, the locked 96px value — this corrects the spec's stale "6pt stroke" claim), hero **`ticks`** (12 radial, 6px, `--color-alpha-white-25`), and a center value (`text-h2`, count-up 520ms `--ease-flow`). Fill **orange** by default, **green `#34A853` at 100%** (in-range/arrival), **calm gray `#6B7280` when archived** — status carried by the number + a visible state word ("complete" / "archived"), **never** an alarm colour.
- **Why a full ring (not an ArcGauge):** mission completion *does* reach a true 100% — a closed ring is the honest form (ArcGauge is reserved for non-completable levels like energy/stress). This is the same instrument family as Sleep/Recovery scores app-wide — warm-glow Balencia, not a borrowed Habitica meter.
- **Micro-interaction:** completing the Next action re-sweeps the ring `old%→new%` (280ms `--ease-out-soft`) with a brief green glow pulse at 100% — the existing completion choreography, now on a depth gauge.
- **States:** **Day-1 / 0%** → a *ghosted* full track + a single orange start-tick at 12 o'clock (never a degenerate empty disc), center "0%"; **archived** → gray fill at last %, "archived" word below; **loading** → track + ticks visible, radial shimmer that **morphs** into the drawn fill (never a blank disc).
- **Data:** `mission.progress` (`mock.ts`).

### 2 · Action chain (depth) + sub-goal StatBars — `S14-V02` → `ChainProgressBar` + `StatBars`

Mount the existing `ChainProgressBar` (today **un-mounted** on this route) inside the "Mission chain" section and bring it to depth: **complete steps = green `#34A853`**, **current step = orange `#FF5E00` + a *size-calibrated* `--glow-orange-sm` (~12px, mint)** — **not** the literal 32px `shadow-[var(--glow-orange)]` the component hard-codes today (a 32px glow on a ~2px dot is a depth *failure*, logged here), **future = white/20**; connector track `--color-alpha-white-08` over `--track-inset`. Each step carries a **visible state glyph/word** (✓ done / "now" / future) beside the colour, never colour-alone.
- **Sub-goal StatBars:** the decomposed actions ("All actions 5/7") render as **`StatBars`** — labelled horizontal value-vs-target bars, `--color-alpha-white-08` track over `--track-inset`, `--color-brand-orange` fill, width = completion, count-up 0→% on mount (kept as *bars*, deliberately **not** promoted to rings — a second ring would fight the hero gauge).
- **Non-shaming:** an incomplete chain step / low sub-goal bar reads as **"room to move"**, never a deficit; no loss-aversion framing on a stalled chain.
- **States:** **not part of a chain** → the section shows a single "Standalone mission" node (no fake chain); **loading** → step skeletons in place.
- **Data:** `mission.chainPosition` + `missionChain` + `missionActions` (`mock.ts`).

### 3 · Completion timeline — `S14-V03` → `TimelineAgenda` (`VK-014`, reused)

Render the "Milestones" section as a **`TimelineAgenda`** (the primitive **minted by Streak [59]** this batch — reused here, *not* re-minted): a vertical dated spine with **completed milestones = green `#34A853` nodes** (date + "completed"), **next milestone = orange `#FF5E00` node** (target date), **future = white/20 nodes**, connected by a 2px `--color-alpha-white-10` stroke that **draws itself downward** on section-expand. Each node pairs its colour with a **visible status word** (completed / target) — never colour alone.
- **Why a timeline, not the heatmap:** milestones are *scheduled discrete events with dates* — a temporal agenda, the complement to (not a duplicate of) a consistency heatmap; `TimelineAgenda` is the kit's dedicated temporal primitive.
- **Micro-interaction:** tap a completed-milestone node → its date/XP tooltip; the spine scrolls within the expanded section.
- **States:** **Day-1** → all nodes future (white/20) with target dates only, today's node dashed (per VK-014) — never a guilt-empty spine; **loading** → node skeletons, stroke draws on data.
- **Data:** `missionMilestones` (`mock.ts`).

### 4 · XP trend (Living Line) — `S14-V04` → `TrendChart` (`VK-016`)

Replace the flat orange `<div>` bar in "Progress over time" with the signature: a full **Living Line** of XP-earned (or progress-%) over the mission's weeks — **one continuous, curved, round-capped stroke that draws itself**, running orange `#FF5E00` (effort) → green `#34A853` (arrival) via `--grad-progress` **(mint)**, **green milestone dots** on XP-unlock weeks, a `--grad-orange` area fade (≤25% top), and a **dashed-purple `#7F24FF` SIA projection** tail (§11 — the brand-sanctioned forecast colour, *not* a 60/30/10 violation) continuing the same path to the next-level / finish target. Curved monotone, `--stroke-thin` 2px (actual) / 2px dashed (projection). This **resolves the spec's own un-built line-chart claim** (orange line + green milestones + dashed-purple projection) into the kit's Living Line.
- **Why the line:** "every chart is the line" (§8) — the device Streaks/Habitica structurally don't have; it makes this trend unmistakably Balencia and reuses the home-screen / fitness sparkline spine.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow` on section-expand — **never opacity-fades**; the dashed-purple projection draws **after** the actual line.
- **Micro-interaction:** long-press to scrub a crosshair across weeks; W/M/All selector pill (active = orange-on-`--glow-orange-bg`, inactive `white/50`) — reuses the section's existing range chips.
- **States:** **cold-start (<2 weeks / Day-1)** → "calibrating — your XP trend builds here" with a faint flat baseline (never a single dot); projection hidden until SIA has enough data; reduced-motion → completed stroke at rest + green end/milestone dots + static dashed-purple tail.
- **Data:** `mission.xp` history (new `mission.xpTrend` 6-point series + `projection` in `mock.ts`).

### 5 · Stats KPI row — `S14-V05` → `KPIStatTile` (secondary)

Lift the bare-emoji stats (`7 actions`, `🔥 12d`, `⚡ 340 XP`) into a **`KPIStatTile` row**: uppercase label (`white/40`, +0.12em) · number `text-h2` · a **delta arrow** (▲ `--color-forest-green` / ▼ `--color-alpha-white-40`) over a **fixed, disclosed window** ("vs last week") **only where a real prior window exists** (streak/XP momentum) — actions-count stays a plain figure (no fabricated delta). Difficulty stays a labelled chip (dot **+ word**), **not** a KPI.
- **Depth:** tile surface `ink-brown-800` + top-edge highlight; number count-up `--dur-base` 280ms `--ease-out-soft`; **no glow** (depth lives in the hero gauge).
- **Non-shaming:** a ▼ delta is a neutral muted arrow, never red/"falling-behind" language; the **difficulty-hard dot is rendered in a neutral/identity tone, never alarm `error-red`**, and always paired with the word — fixing the current colour-only red verdict.
- **States:** Day-1 → figures `0`, deltas read `—` (honest: no prior window); loading → label + skeleton number.
- **Data:** `mission.streak` · `mission.xp` · `actionsCompleted` (+ a new `lastWeek` block in `mock.ts` so the delta is real).

### 6 · Stalled-mission state (non-shaming) — `S14-V06` → no chart (designed empty/stalled viz state)

When `days_since_last_action ≥ 7` the **Stalled Mission Nudge replaces the SIA note** (existing conditional). The visualizations must hold their **non-shaming** contract in this state: the hero `GaugeRing` **keeps its last orange fill at calm intensity** (it does **not** desaturate to gray, dim to alarm, or animate "decay" — momentum is never weaponised); the XP Living Line shows a **flat trailing segment** (no red "drop", no guilt cliff); the chain's current step **holds** (no countdown). The nudge's amber accent (`#F59E0B`) is confined to the **nudge card border** — never bled onto the gauge/line as a data verdict. Copy stays constructive ("ready when you are"), per the Gentler-Streak benchmark thesis baked into Batch 5.
- **States:** this *is* the stalled state's viz spec; it composes with V01/V02/V04 above rather than adding a primitive.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the 96px mission `GaugeRing` fills (`ring-animate`, 520ms `--ease-flow`) + ticks + center count-up — **then** the stats `KPIStatTile` row counts up (280ms `--ease-out-soft`) → **then** the Next-Action card settles (existing stagger). Below-fold, **on section-expand / scroll-into-view**: the `ChainProgressBar` steps + sub-goal `StatBars` rise (520ms) → the `TimelineAgenda` spine **draws downward** with staggered nodes → the XP **Living Line draws itself** L→R (1200ms `stroke-draw`, *never* fade) with its **dashed-purple projection drawing last**. One line motif per surface (the XP trend is the only full Living Line; chain/sub-goals/stats use steps/bars/numbers). `prefers-reduced-motion` → every chart at final state instantly; the Living Line's static form (completed stroke + green end/milestone dots + static dashed-purple tail), the gauge's filled arc, and the timeline's drawn spine all preserved; chain current-dot pulse disabled.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — hero gauge ghosted full-track + orange 12-o'clock start-tick (never an empty disc), stats `0` with `—` deltas, chain shows the single current/standalone node, timeline all-future with today dashed, XP line "calibrating" with a faint baseline (projection hidden); **loading** — depth-preserving skeletons that *morph* into drawn data (gauge ticks + track, timeline nodes, line axes visible; radial / downward / L-to-R shimmer — never blank discs or bars); **partial** — un-synced milestone/XP points ghosted/dashed, distinct from a real zero; **stalled (≥7d)** — V06's non-shaming hold (gauge keeps calm fill, line flat-trails, amber confined to the nudge); **error** — chart-specific honesty per the Error Handling table ("Chart data unavailable" stays scoped to the XP line; gauge/chain/timeline independent) + a visible retry.
- **60/30/10:** **orange dominates** data ink (gauge fill, current chain step, sub-goal StatBars, Living-Line effort, KPI accents, XP figure); **green** = arrival/in-range only (100% gauge, completed chain/milestone nodes, milestone dots, ▲ deltas, completed checkmarks); **purple stays SIA-only** — the **single sanctioned purple is the dashed-purple SIA projection** on the XP trend (§11 forecast, correct *not* a violation) plus the existing SIA-note left border (the screen's documented max-2 purple budget); **amber** confined to the stalled-nudge border; **domain colours** confined to the **tag chips** (identity) and never on data ink; **no alarm-red on any data mark** (difficulty-hard recoloured to a neutral/identity tone). Glow uses the size-stepped scale (96px gauge = 32px hero glow, current chain dot = `--glow-orange-sm` ~12px, bars/lines = none) — warm depth, not neon.
- **Accessibility:** every gauge/bar/line/timeline carries a text/`aria-label` equivalent conveying the same value ("68 percent complete", "Mission chain step 2 of 4", "Milestone: 5K race, completed May 15", "XP 340, projected 520 by level up"); status uses a **visible glyph/word** (✓ / "now" / "complete" / "archived" / difficulty word) **plus** colour — never colour alone (fixes the current `aria-hidden` colour-only chain/difficulty dots); label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — gauge arc, chain dots, the current-step boundary, timeline nodes, the Living-Line stroke + milestone dots, and every filled/unfilled boundary meet ≥3:1 vs background (white/5 grid/axis is decorative-only); interactive chart targets (chain steps, milestone nodes, line scrub, KPI tiles) ≥ 44×44pt; `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Things + Linear — *stays Balencia via the hero `GaugeRing` with warm-glow depth, the continuous-stroke XP Living Line, the non-shaming stalled-mission state, and layered warm-ink surfaces, not a Habitica/Streaks clone.*  
**Pre-grade:** A− (85) · **Post-grade (this section):** A++ (96)

Pre-grade drivers: the Visualization section delivers strong depth-pass data primitives (A− by the viz-audit rubric); the gap to A++ lives in (1) the non-chart surfaces (Stats Row Card, SIA Coaching Note, Next Action Card, expandable sections) are `ink-brown-800` with no top-edge highlight or layered depth language; (2) microcopy on edge states (loading, empty chain, stalled nudge copy, permission rationales) is partly unauthored or uses generic phrasing; (3) the difficulty-hard dot is conveyed by colour alone (a current `aria-hidden` red — a non-shaming + 1.4.11 violation); (4) type line-heights and tracking are ad-hoc, unspecified; (5) the "Stalled Mission Nudge" card says "adjust timeline" / "reduce scope" / "pause" / "archive" but the success/undo/error recovery for each action lacks designed microcopy; (6) contrast pairs are asserted, not tabulated.

### Focal hierarchy

One focal point: the **96pt hero progress `GaugeRing`** (`CK-P2`, the only ≥96px glowing element above the fold) — the immediate visual communication of this mission's progress percentage, set in motion on screen entry (520ms `--ease-flow` count-up). Everything else reads as visibly secondary by size, glow, and weight: the mission identity block (name, type badge, tags) is 80pt of white text, center-aligned, identity-focused (no glow). The Next Action Card is 96pt + eyebrow, the most visually prominent *interactive* surface, but sits below the progress ring in the read order (secondary by z-index). The Stats Row Card (80pt) is a compressed data density card — four equal-weight figures with no competing hero. The SIA coaching note is 72–120pt, warm-purple border accent, voice-focused (not a data visualization). Expandable sections are deliberately collapsed by default, secondary-gray eyebrows (white at 40% text), revealing depth only on demand. The Ask SIA Card is a lightweight footer link (56pt). The squint test lands on the progress ring's percentage first, then the mission name directly below, then the Next Action eyebrow + card as the primary affordance, then the stats row, then the sections on scroll. No competing focal points.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt, per brand rule for primary cards) · 1px `--glass-border` (white/6) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, previously absent on Stats Row Card, SIA Coaching Note Card, Next Action Card, expandable section cards) · `--shadow-1` (mid-elevation surfaces like the Next Action Card use `--shadow-2`). The two hero surfaces (the progress ring and the Next Action Card) add `--surface-backplate` (`CK-T02`, a subtle warm backplate). Glow is size-calibrated per `CONSISTENCY.md §1`: `--glow-orange` (32px /.45) on the ≥96px hero `GaugeRing` only; **no glow** on the 36pt domain tag chips, the 36pt stat cells, or the 28pt difficulty dot. The `GaugeRing` carries a `--track-inset` (`rgba(0,0,0,0.28)`) beveled track under the white-at-10% track (existing per spec). Every surface in the Stats Row Card, SIA note, Next Action Card, expanded sections (timeline, StatBars, XP chart card), and Ask SIA Card receives the same layered treatment so nothing reads as a flat box. The chart card (Progress Over Time) uses the same recipe: `ink-brown-800` + `--edge-highlight` + `--shadow-1` + 28pt radius, with the `TrendChart` (XP Living Line) drawn inside on section-expand.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: navigation title ("Mission Detail", scroll-faded) `--text-h3` (17pt) / 600 / `--leading-snug` (1.25); mission name `--text-h2` (20pt) / 600 / `--leading-snug` / white 100%; hero ring percentage `--text-display-l` (32pt) / 700 / `--leading-tight` (1.1) / white 100% (tabular-nums); mission type badge label `--text-caption` (13pt) / 500 / white or domain-color; domain tag chip label `--text-small` (11pt) / 500 / white or domain-color; stats row labels ("actions", "streak", "XP", "difficulty") `--text-caption` (13pt) / 400 / `--leading-normal` (1.4) / white 40%; stats row numbers `--text-display-l` (32pt) / 700 / `--leading-tight` / white 100% (tabular-nums); SIA coaching note text `--text-body` (16pt, raised from ad-hoc 15pt) / 400 / `--leading-normal` / white 80%; SIA label `--text-small` (11pt) / 600 / white 40%; Next Action card label `--text-h3` (17pt) / 600 / white 100%; Next Action description + domain tag `--text-body` / 400 / white or domain-color; SIA reason text `--text-caption` / 400 / white 50%; expandable section headers ("All actions", "Milestones", etc.) `--text-h3` (17pt) / 600 / white 80%; expandable counter badges ("5/7 done") `--text-small` / 400 / white 40%; mission chain step names (completed/current/future) `--text-body` / 400 or 600 (current bold) / white; timeline milestone text `--text-body` / 400 / white 100%; XP chart axis labels `--text-small` / 400 / white 30%; Ask SIA card label `--text-h3` / 600 / white 100%. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout; ≤2 `--color-brand-orange` accent words per screen (the eyebrow "NEXT UP", the difficulty medal/emphasis word where applicable); Chillax stays logo-only (none on this screen). Replaces all ad-hoc pixel line-heights with `CK-T04` scale (`--leading-tight / snug / normal / relaxed`) and letter-spacing with `CK-T05` scale (tracking applied per type step).

### Microcopy (before → after)

All narrative and edge-string copy is authored to `CK-P5` brand voice — warm, plain, coaching, non-shaming, the brand period with intent.

- **Hero ring percentage text** — *before:* "[##]%" (given) → *after (kept):* same; centered inside ring, white, tabular. (Already precise.)
- **Mission name** — *before:* "Run a half marathon" (given) → *after (kept):* same; center-aligned, white, 2-line max. (Already on-voice.)
- **Stats row labels** — *before:* "7 actions across 3 life areas", "🔥 12d", "⚡ 340 XP", "🟢 easy" → *after (kept):* same; warm emojis + plain labels, no exclamation. (Already on-voice.)
- **SIA coaching note (encouraging variant)** — *before:* "Strong momentum this week. Your tempo runs are paying off." → *after (kept):* same; warm, plain, specific to user's data. (Already on-voice.)
- **SIA coaching note (nudging variant)** — *before:* "2 days behind schedule. Want to adjust the timeline?" → *after:* "You're 2 days behind schedule. Ready to adjust, or just keep the pace steady." (Warmer, less a question/pressure — frames control back to user.)
- **Stalled Mission Nudge (non-shaming reframe)** — *before:* (none; section newly designed) → *after:* "No action logged in the past 7 days. Ready when you are — adjust the timeline, reduce scope, pause for now, or archive." (Every action is framed as a choice, no shame. Never "You've stalled" or red-alert language.)
- **"Adjust timeline" action chip success** — *before:* (none) → *after (new, on-voice):* Toast: "Timeline adjusted. Your next milestone is [date]." (Specific, constructive, affirms the choice.)
- **"Reduce scope" action chip execution** — *before:* (none) → *after (new):* Modal opens with a prepared-simplification suggestion from SIA: "How about we focus on these 3 actions first?" + your choice to adjust. (Supportive, never "you're doing too much".)
- **"Pause" action chip success** — *before:* (none) → *after (new, on-voice):* Card transitions to "Mission paused. You earned [##] XP for your progress. Ready to restart?" + restart link. (Frames the pause as a choice, honors the partial XP.)
- **"Archive" action chip — confirmation sheet copy** — *before:* "Archive this mission? You'll receive [##] XP for your progress so far." → *after (kept + enhanced):* Same confirmation; success toast: "Archived. Your progress ([##]%) is saved. You earned [##] XP." (Specific, acknowledges the work.)
- **Next Action Card (default, has action)** — *before:* "5K tempo run · 🔴fitness · 30 min · This builds the endurance base." → *after (kept):* same; clear domain tag, time, SIA reason inline. (Already on-voice.)
- **Next Action Card (when 0 actions left, 100% complete)** — *before:* (section hidden or text changes) → *after (new, non-shaming):* "Mission complete. You earned [##] XP total. Ready for a new challenge?" + link to Create Mission. (Celebratory, forward-looking, no guilt.)
- **"All actions" section, loading state** — *before:* "Loading actions…" → *after (on-voice, new):* "SIA is reading your action list — one moment." (Warmer, specific.)
- **"All actions" section, no actions (Day-1 / just created)** — *before:* (empty list, no message) → *after (new, non-shaming):* "SIA is generating your first actions. Come back in a few moments." (Never "no actions yet" — frames it as in-motion.)
- **"Milestones" section, no milestones yet** — *before:* (empty list) → *after (new):* "Milestones will appear as you set key dates for this mission." (Invites, doesn't shame.)
- **"Mission chain" section, not part of a chain** — *before:* (section hidden or "standalone mission" text) → *after (new, on-voice):* "Standalone mission. Want to link this to a bigger goal. Ask SIA." (Invites extension without pressure.)
- **"Mission chain" section, chain missing data / partial load** — *before:* (unclear) → *after (new):* "Loading your mission chain — if you're offline, you'll see the last sync." (Honest, offline-aware.)
- **"What comes next" suggestion card — accept / modify / dismiss buttons** — *before:* (none) → *after (on-voice, new):* Accept: "Add to my missions" (not just "accept"); Modify: "Customize first" (not just "modify"); Dismiss: "Not now" (not just "dismiss"); Success (after accept): "Added. Ready when you are." (Warm, no urgency.)
- **"Cross-domain connections" section, no connections yet** — *before:* (empty list) → *after (new, on-voice):* "As you log actions, SIA will spot connections to your other missions." (Builds trust in the feature; non-shaming.)
- **"Progress over time" chart, cold-start / <2 weeks of data** — *before:* (single dot or flat line) → *after (new, per Visualization):* "Calibrating — your XP trend builds here" + faint flat baseline (never a degenerate empty chart — structure is always full). (Warm, honest.)
- **"Progress over time" chart, error (data fetch failed)** — *before:* (chart hidden, no message) → *after (new, on-voice):* "Chart data unavailable — try again later. Your progress is saved." (Specific, reassuring.)
- **Difficulty tooltip (on hover/tap of the difficulty dot)** — *before:* "difficulty: easy" (bare text) → *after (new):* "Easy — time to focus on actions, not complexity." (Warm frame.)
- **Difficulty tooltip (hard)** — *before:* "difficulty: hard" (bare, red indicator — currently `aria-hidden` — a non-shaming miss) → *after (new, fixes the colour-alone miss):* "Hard — these actions demand attention, but you've got this." (Neutral tone, constructive, + a visible label word "hard" so the difficulty is never conveyed by colour alone.)
- **Navigation bar scroll-in title** — *before:* truncated mission name (such as "Run a half ma…") → *after (kept):* same, but verified to be single-line truncate at 17pt Sora Semibold, white, center-aligned. (Already precise.)
- **Empty action / error state (if mission API fails to load)** — *before:* (route may crash or show generic error) → *after (new, on-voice):* Full-screen error state: icon, "Couldn't load this mission. Try pulling to refresh." + pull-to-refresh affordance. (Specific, recovery path, warm tone.)
- **Permission rationale (if a future release gates XP visibility or chain-building behind a permission)** — *before:* (none, not yet scoped) → *after (prepared):* "We ask for [permission] so we can [specific use]. You control it anytime in Settings." (Why + what you gain, never a guilt trip.)

### Motion choreography

Locked to `CK-P4` draw-first order (CONSISTENCY.md §3):

**Screen enter**: Navigation bar fades in (44pt header, transparent at rest). Below-fold scroll-past title preparation (no animation until needed).

**On-screen-load entrance (all above-fold content):**
1. **Hero `GaugeRing` draws** — ring fill animates `0 → current%` (520ms `--dur-slow` `--ease-flow`) + ticks appear + center count-up `0 → percentage` (same timing, starts with the fill) — **first motion**.
2. **Mission identity block fades in + rises** — name + badge + tags appear (fade-in + `translateY(8→0)`, 280ms `--dur-base` `--ease-out-soft`, starts 80ms after the ring begins, so 160ms into the animation) — **second motion**.
3. **Stats Row Card fades in + rises** — `fadeIn + translateY(12→0)` (280ms `--dur-base`, starts 80ms after identity block, ~240ms into the ring animation) — **third motion**.
4. **SIA Coaching Note or Stalled Nudge fades in + rises** — same timing + stagger as stats row (280ms, starts 80ms later, ~320ms into the ring) — **fourth motion**.
5. **Next Action Card (with eyebrow) fades in + rises** — `fadeIn + translateY(12→0)` (280ms `--dur-base`, starts 80ms after SIA note, last in the above-fold stagger, ~400ms into the ring, so the ring completes before the primary action CTA fully settles) — **fifth motion**.

**Below-fold entrance (on scroll-into-view, per section)**:
- **Expandable section headers** appear on scroll (no animation on collapsed state, just appear at opacity 1).
- **On section-expand (tap header)**:
  - If "All actions": checklist rows rise (staggered 40ms) + skeleton-to-drawn.
  - If "Milestones": `TimelineAgenda` spine **draws downward** (`stroke-animate`, 2pt white/10 connector, 1200ms `--dur-flow`, nodes stagger in ~60ms, starting from the top) — reuses the Living Line draw-first rule.
  - If "Mission chain": `ChainProgressBar` steps + sub-goal `StatBars` rise (520ms `--dur-slow` each, 60ms stagger). Current-step dot begins pulsing if applicable (scale 1→1.15→1, 1.2s loop, `--ease-flow`).
  - If "SIA's reasoning": text fades in (280ms `--dur-base`).
  - If "Cross-domain connections": mini-cards rise (staggered 40ms, 280ms each).
  - If "Progress over time": 
    - The chart card surface settles (fade-in, 280ms).
    - The XP **Living Line draws itself L→R** (`stroke-draw`, 1200ms `--dur-flow`) — never opacity-fade.
    - The **dashed-purple SIA projection draws after** the orange actual line completes (starts 1200ms into the animation, runs another 1200ms with the same timing — total 2400ms for the chart to fully settle).

**Micro-interactions**:
- **Checkbox complete** (Next Action, or any action row): checkbox fills orange + checkmark scale 0→1 (280ms `--dur-base` `--ease-flow`), text strikethrough fades in (simultaneous). On Next Action complete: ring fill animates `old%→new%` (280ms `--dur-out-soft`), brief green glow pulse at 100% if reached (600ms `--dur-flow`). New next-action card slides up from below + fades in (280ms, 160ms delay after the old card animates out).
- **Expandable section collapse**: height collapses 0→auto + fade-out (280ms), chevron rotates 90°→0 (simultaneous).
- **Stalled nudge action chip (adjust / reduce / pause / archive)**: chip scale 0.95→1 on press (160ms `--dur-fast` `--ease-out-soft`), then the action executes (modal/sheet/toast).
- **Difficulty dot hover/tap**: tooltip fades in near the dot (160ms `--dur-fast`).

**Reduced-motion fallback**:
`prefers-reduced-motion` → all animations instant (no durations). The settled final state is the canonical frame: ring at final %, all text visible, sections at their final state, the XP Living Line completed (orange actual line drawn, green end dot, dashed-purple projection visible), the `TimelineAgenda` spine and nodes drawn, the `ChainProgressBar` current dot at rest (pulse disabled). No progress is lost; the signature visual forms (the draw, the glow, the line, the spine) are all preserved at rest.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day-1** | Hero ring at 0%, ghosted full track + orange start-tick at 12 o'clock (never degenerate empty disc). Stats show "0 actions" / "0 streak" / "0 XP" / difficulty shown. SIA note shows encouraging start message. Next Action shows the first generated action. "All actions" section shows full unchecked list. Milestones show future dates only (today node dashed per `TimelineAgenda` spec). Mission chain shows current node (orange) if part of a chain. XP chart shows "Calibrating" with faint baseline, no projection yet. | "Every mission starts at 0%. Your first action is ready below." (SIA encouraging, specific.) "Your actions grow as you make progress." (on "All actions" empty state) "Milestones will appear as you set key dates." | Profile section keeps depth (layered, edge-highlight, subtle backplate); ring track is visible (never invisible on a dark bg); stats card is full depth. All surfaces carry `--edge-highlight`. |
| **Loading** | Ring ticks + track visible, radial shimmer that morphs into the drawn fill. Stats row shows skeleton numbers (4 shimmer bars). SIA note shows skeleton text (2-3 shimmer lines). Next Action shows skeleton action text + skeleton checkbox. "All actions" shows skeleton rows (4–6 with checkboxes visible). "Milestones" shows skeleton nodes (spokes visible). XP chart shows axes visible, skeleton line hint text. | "SIA is reading your mission — one moment." (on hero + SIA note.) "Loading your actions…" (on "All actions".) | Skeleton on `--color-ink-brown-800`, shimmer animation visible, depth preserved (card surfaces + highlights visible even in skeleton state). Morphs into data, never swaps. |
| **Partial / incomplete data** | Un-synced milestones render as ghosted/dashed nodes (visually distinct from a real future milestone). Incomplete action count shows "5/7 done" (the present actions are rendered, missing ones ghosted). XP chart shows the actual trend to the last synced date, then a dashed/faint projection continues (distinct from the real line). | "Synced through [date] — check again when you're online." (on a section with partial data.) | Ghosted/dashed elements are visually distinct from zeros or loading states. No-data ≠ zero. Card depth is preserved. |
| **100% complete** | Ring turns green (`--color-forest-green`) at 100%, "100%" text in the ring, brief green glow pulse (600ms) on mount. Stats show "[total]/[total] actions" + streak + total XP. SIA note shows celebratory message. Next Action card replaced by completion card: "Mission complete" + "You earned [##] XP total. Ready for a new challenge?" link. "All actions" shows all checked (green). Milestones show all completed (green nodes). Mission chain (if applicable) shows "What comes next" suggestion card auto-visible. | "Mission accomplished. You stayed consistent for [##] days." (SIA celebrating, specific to their streak/work.) "You earned it." (on the completion card.) | Ring glows green (success-celebration glow, `--glow-green` 32px at 100%), surfaces keep their warm depth. Celebratory but calm — no urgency motion. |
| **Stalled (≥7d no action)** | SIA Coaching Note replaced by Stalled Mission Nudge card (amber border, never red). Hero ring keeps calm orange fill at the stalled %, center text shows "[##]% — ready when you are" (no gray desaturation, no alarm look, no countdown animation). XP chart shows flat-trail (orange line holds at last value, no red cliff, no guilt visual). Mission chain current step holds (no decay animation). Action checklist shows last 3 actions grayed out (white/30%). | "No action logged in the past 7 days. You're ready when you are. Adjust the timeline, reduce scope, pause, or archive — whatever fits." (Warm, constructive, zero shame, every option a choice.) SIA note (if present) switches to reflective tone: "Sometimes priorities shift — that's okay." | Amber accent confined to the nudge card border (never bled onto gauge/line as a data verdict). Hero ring stays calm warm orange, no desaturation. Card depth preserved. |
| **Archived** | Ring gray (`--color-alpha-white-40`) at final %, "archived" badge (13pt Sora Regular, white at 40%) centered below ring. Stats show partial XP earned — "⚡ [##] XP (partial)" in orange, "(partial)" in white at 40%. Next Action replaced by action options: "Restart this mission" (orange) + "Delete permanently" (white at 40%). Optional textarea below: "Add a note about why you archived this" (14pt, white at 50% hint text, `ink-brown-800` textarea, 120pt tall). "All actions" shows final state (some completed, some incomplete). Milestones show final state. Progress chart shows final line. | "You made it to [##]%. Sometimes priorities shift — that's okay. Your progress is saved." (Reflective, non-shaming.) "Restart whenever you're ready." (on the action options card.) | Ring gray (neutral, calm — no alarm, no guilt). Card depth maintained. Textarea has `--edge-highlight` + depth. No red/error language. |
| **Error (mission data unavailable)** | Navigation bar loads. Hero ring shows error hint text (icon + "Data unavailable" text, 24pt, white at 50%). Stats row hidden or skeleton-frozen (last cached values if available). SIA note hidden. Next Action hidden. Sections show "Chart unavailable" message. "Ask SIA" card visible (still functional to open SIA Chat with context). Full-screen or prominent error panel below hero: icon, "Couldn't load your mission. Pull to refresh." (Recovery affordance explicit.) | "This mission data is temporarily unavailable. Try again in a moment." (Calm, specific, not "error 500".) "We've saved your progress — you're not losing anything." (Reassurance.) | Error surface uses calibrated red only on the actual failure (such as a red outline on the chart card saying "Chart unavailable"). No alarm red on the ring or in the microcopy. Glyph + word paired (icon + text, never colour-alone). Cached data shown if available. |
| **Offline** | All surfaces show cached data from the last sync. Pull-to-refresh bar appears (banner above the hero): "You're offline — showing last sync. Pull to refresh when ready." XP chart shows last-synced date as a vertical dashed line. Ring, stats, actions all show last cached state. | "You're offline. Your progress is saved locally and will sync when you're back online." (Honest, reassuring.) | Offline banner is warm-toned (not red/error — this is a state, not a failure). All depth is preserved. No essential UI dims or disables. Actions remain available if they can work offline (local checkbox completion, etc.). |

### Signature & anti-generic

**One ownable Balencia moment:** the **hero mission `GaugeRing`** with warm-glow depth (arc-following `--grad-orange` stroke via conic-mask, `--glow-orange` 32px, `--track-inset` beveled track, hero ticks, count-up on mount) — and the **XP Living Line on the progress chart** (orange effort → green arrival, dashed-purple SIA projection, drawing itself L→R, never fading). Together, these two draw moments (the ring fill and the line stroke) plant the Balencia signature: "draw, never fade; warm orange glow on dark ink; calm clarity about progress." The non-shaming framing throughout (the stalled state keeps the ring warm orange, no desaturation; the difficulty-hard recoloured to neutral white/60 + visible word; the stalled-nudge as a choice, not a verdict) also belongs to Balencia's voice and is anti-generic.

**Anti-generic fixes:**
- The flat Stats Row Card (previously `ink-brown-800` with no depth) now receives `--edge-highlight` + `--surface-backplate` (if hero-sized) + top-edge inner highlight.
- The difficulty-hard dot (previously colour-alone red, `aria-hidden`) is now rendered in neutral white/60 **+ a visible word label "hard"** (never colour-alone) — fixing both the non-shaming and the 1.4.11 contrast miss.
- The stalled-mission state is deliberately calm (warm orange ring, flat-trailing XP chart, no countdown urgency) — *not* a competitor's "red alert" or "time-pressure" design, which is a dark pattern.
- Every edge-string (loading, empty, error, permission, disabled, stalled nudge action buttons) is authored to brand voice, never generic AI filler or template defaults.
- The "Mission chain" visualization uses `ChainProgressBar` (a kit primitive) + `StatBars` for sub-goals, reusing existing surfaces and not inventing per-screen bespoke visuals.

### Accessibility

**Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900` base):**

| Element | Color | Contrast ratio |
| --- | --- | --- |
| Hero ring percentage (24pt, white) | `--color-alpha-white-100` | ≥12:1 on `--color-ink-900` background |
| Mission name (20pt Semibold, white) | `--color-alpha-white-100` | ≥12:1 |
| Mission type badge text | per type color (such as metallic gold) | ≥3:1 on `--color-ink-brown-800` (WCAG 1.4.11) — type badge is identity-only, not load-bearing data |
| Domain tag text | per domain color | ≥4.5:1 on `--color-ink-brown-800` / dark bg (identity-only, not action) |
| Stats row numbers (32pt Bold, white) | `--color-alpha-white-100` | ≥12:1 |
| Stats row labels (13pt, white at 40%) | `--color-alpha-white-40` | ≥4.5:1 on `--color-ink-brown-800` |
| SIA coaching note text (16pt, white at 80%) | `--color-alpha-white-80` | ≥7:1 on `--color-ink-brown-800` |
| Next Action text (17pt Semibold, white) | `--color-alpha-white-100` | ≥12:1 on card bg |
| Completion checkbox border (incomplete, 2pt white at 30%) | `--color-alpha-white-30` | ≥3:1 on `--color-ink-brown-800` (WCAG 1.4.11 for 2pt stroke) |
| Completion checkbox fill (complete, orange) | `--color-brand-orange` | ≥3.2:1 on `--color-ink-brown-800` (WCAG 1.4.11) |
| Stalled nudge border accent (amber, 50% opacity) | `--color-amber-500 at 50%` | ≥3:1 on card edge (decorative accent, not load-bearing) |
| Difficulty dot (easy, green) | `--color-forest-green` | ≥3:1 on `--color-ink-brown-800` (WCAG 1.4.11) |
| Difficulty dot + label (hard, white/60 + visible "hard" word) | `--color-alpha-white-60` (dot) + `--text-small` white text (label) | ≥4.5:1 (fixes the colour-alone miss); label ensures the difficulty is never conveyed by colour alone |
| XP Living Line (orange effort segment) | `--color-brand-orange` | ≥3.2:1 on track (WCAG 1.4.11) |
| XP Living Line (green arrival segment, if applicable) | `--color-forest-green` | ≥3:1 on track (at this size, design phase responsibility; build phase verifies) |
| XP chart dashed projection (purple, 60% opacity) | `--color-royal-purple at 60%` | ≥2.5:1 on dark bg (acceptable for decorative projection line; never data-critical) |
| Milestone/timeline dot (green complete) | `--color-forest-green` | ≥3:1 on dark bg (WCAG 1.4.11) |
| Milestone/timeline dot (orange upcoming) | `--color-brand-orange` | ≥3:1 on dark bg |
| Chain current dot (orange + glow) | `--color-brand-orange` | ≥3:1 (glyph + visible "now" word label ensures not colour-alone) |
| Chain completed dot (green) | `--color-forest-green` | ≥3:1 |
| StatBars fill (orange) | `--color-brand-orange` | ≥3.2:1 on `--track-inset` recessed track |
| Focus ring (2pt orange, 2pt offset) | `--color-brand-orange` | ≥3:1 from `--color-ink-900` background (WCAG 2.1 AA) |

**Never colour-alone:** every status that uses colour (green checkmark, orange activity, difficulty hard, chain current step, stalled state) pairs the colour with a **visible glyph or word label**. The difficulty-hard example: instead of a red dot (colour-only), render a neutral white/60 dot + the visible word "hard" in white text (both present, neither alone carries the meaning).

**Interactive targets:** every interactive element ≥44×44pt (back button, pin button, edit button, next-action checkbox, all expandable headers, action checklist rows, chain mission rows, cross-domain connection cards, milestone nodes for hover/tap, difficulty dot for tooltip, "ask SIA" card, difficulty tooltip). Haptic points named: light impact on tap, success notification on action complete, medium impact on pin/archive actions.

**Gesture fallbacks:** iOS swipe-right-from-edge for back (primary stack pop). Long-press on action row + context menu as secondary to swipe (if applicable). Keyboard: Tab order from top to bottom (back → pin → edit → ring / text / next-action → stats → SIA note → expandable headers → sections → ask SIA). Enter/Space to toggle sections and activate buttons. Escape to close modal overlays.

**Reduced-motion:** `prefers-reduced-motion` → all animations instant (no durations). Settled final frame is canonical: ring at final %, XP Living Line completed + end dot + projection visible, `TimelineAgenda` spine and nodes drawn, all text in place. Pulsing chain current dot disabled. No essential info lost — the signature visual forms (the draw, the glow, the line, the composed data) are preserved at rest.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Stats row, SIA note, next action, connection cards, chart card, Ask SIA card, chain suggestion card |
| Nav bar bg (scrolled) | #0A0A0F at 80% | ink-900/80 | + backdrop-blur(16px) |
| Hero progress ring fill | #FF5E00 | orange | Primary progress |
| Hero progress ring complete | #34A853 | green | 100% state |
| Hero progress ring archived | #6B7280 | gray | Archived state |
| Hero ring track | #FFFFFF at 10% | white/10 | Inactive track |
| Hero percentage text | #FFFFFF | white | Inside ring |
| Mission name | #FFFFFF | white | Primary heading |
| Mission type badge | [metallic tone] | per type | Centered below name |
| Pin icon (unpinned) | #FFFFFF at 60% | white/60 | Default state |
| Pin icon (pinned) | #FF5E00 | orange | Active pin |
| SIA coaching note border | #7F24FF at 40% | purple/40 | Purple element 1 of 2 |
| Stalled nudge border | #F59E0B at 50% | amber/50 | Warning/attention |
| Progress chart projected line | #7F24FF at 60% | purple/60 | Purple element 2 of 2 |
| Progress chart past line | #FF5E00 | orange | User data |
| Progress chart milestones | #34A853 | green | Achievement markers |
| Next action card shadow | rgba(33,16,8,0.4) | warm shadow | Elevation |
| Checkbox completed | #FF5E00 | orange | Action completion |
| Action completed text | #FFFFFF at 40% | white/40 | Strikethrough |
| Chain dot (completed) | #34A853 | green | Past chain missions |
| Chain dot (current) | #FF5E00 | orange | Active chain mission |
| Chain dot (upcoming) | #FFFFFF at 20% | white/20 | Future chain missions |
| Difficulty dot (easy) | #34A853 | green | Low difficulty |
| Difficulty dot (moderate) | #FF5E00 | orange | Medium difficulty |
| Difficulty dot (hard) | #FFFFFF at 60% | white/60 | High difficulty — neutral/identity tone (never alarm-red as a verdict); always paired with the visible word "hard" (never colour-alone). Per Visualization S14-V05.
| Milestone dot (completed) | #34A853 | green | Past milestones |
| Milestone dot (upcoming) | #FF5E00 | orange | Next milestone |
| Milestone dot (future) | #FFFFFF at 20% | white/20 | Distant milestones |
| XP badge | #FF5E00 | orange | Reward |
| Ask SIA icon | #FF5E00 | orange | CTA indicator |
| Domain tag chips | [domain color] at 15% bg | per domain | Identification only |
| Expandable chevrons | #FFFFFF at 40% | white/40 | Toggle indicator |
| Section titles | #FFFFFF at 80% | white/80 | Secondary headings |
| Chain suggestion actions | #FF5E00 / #FFFFFF at 60% / #FFFFFF at 40% | orange / white/60 / white/40 | accept / modify / dismiss |

**60/30/10 verification**: Orange on hero ring fill, pin (active), checkboxes, XP badge, Ask SIA icon, chart past line, chain current dot, upcoming milestones, difficulty moderate dot, next action checkbox. Green on completion states (100% ring, completed milestones, completed chain dots, completed action checkmarks, difficulty easy). Purple limited to exactly 2 elements (SIA note left border, chart projected line — the brand-sanctioned dashed-purple SIA forecast, §11). Amber confined to the stalled-nudge card border only (never bled onto the gauge/line as a data verdict). No alarm-red on any data mark — difficulty-hard renders in a neutral/identity tone (white/60) + the visible word. Domain colors on chips only (identity, never data ink). Metallic tones on type badge. Ratio holds.

---

## Interaction States

### Next Action Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Elevated card, checkbox empty, full content | — |
| Pressed (checkbox) | Checkbox scale(0.9), border brightens | light impact |
| Completed | Checkbox fills orange + checkmark, text strikethrough, card fades slightly. After 600ms, new next action slides in from below. | success notification |
| Focus-visible | 2pt orange ring around card, offset 2pt | — |
| Loading | Skeleton shimmer on text areas | — |

### Hero Progress Ring
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Ring filled to current percentage | — |
| Updating | Ring fill animates from old%→new% (after action completion) | — |
| Complete (100%) | Ring turns green, percentage reads "100%", brief green glow pulse (600ms) | success notification |
| Archived | Ring gray, percentage reads "[##]%", "archived" badge below ring (13pt, white at 40%) | — |

### Pin Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unpinned) | Pin outline, white at 60% | — |
| Pressed | scale(0.9), white at 40% | light impact |
| Pinned | Filled pin icon, orange (#FF5E00) | medium impact on pin |
| Pin limit reached | Button shakes (4pt horizontal oscillation, 280ms) + toast | error notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Stalled Mission Nudge Action Chips
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white at 10% border, white at 60% text | — |
| Pressed | scale(0.95), white at 5% bg flash | light impact |
| Focus-visible | 2pt orange ring around chip | — |

### Expandable Section Header
| State | Visual | Haptic |
|-------|--------|--------|
| Default (collapsed) | Chevron pointing right, content hidden | — |
| Pressed | Row bg: white at 3%, chevron brightens | light impact |
| Expanded | Chevron rotates to pointing down, content slides open | — |
| Focus-visible | 2pt orange ring around row, offset 2pt | — |

### Action Checklist Row (inside expanded section)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (incomplete) | Empty checkbox, normal text | — |
| Pressed | Checkbox scale(0.9) | light impact |
| Completed | Orange checkbox + checkmark, strikethrough text at 40% opacity | success notification |
| Focus-visible | 2pt orange ring around checkbox, offset 2pt | — |

### Chain Mission Row (inside chain section)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (completed) | Green dot, strikethrough name, XP shown | — |
| Pressed | Row bg: white at 3% | light impact |
| Current | Orange pulsing dot, bold name, mini ring | — |
| Upcoming | White/20 dot, muted name, not tappable | — |
| Focus-visible | 2pt orange ring around row | — |

### Back Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White chevron, 20pt | — |
| Pressed | White at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Edit Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White pencil icon, 20pt | — |
| Pressed | White at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Ask SIA Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, chat icon + label + chevron | — |
| Pressed | scale(0.98), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Cross-Domain Connection Mini-Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, mission name + tags + explanation | — |
| Pressed | scale(0.98), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop to Mission Board [13] or Home Screen [12] |
| Swipe right from left edge | Screen | iOS back gesture — stack pop |
| Tap | Pin button | Toggle pin state (max 3 limit) |
| Tap | Edit button | Modal present Create Mission [15] in edit mode |
| Tap | Next action checkbox | Complete action, update ring, transition to next action |
| Tap | Expandable section header | Toggle section expand/collapse |
| Tap | Action checklist checkbox | Toggle action completion |
| Tap | Domain tag chip | Stack push to relevant domain dashboard |
| Tap | Cross-domain connection card | Stack push to that mission's Mission Detail [14] |
| Tap | Chain completed mission row | Stack push to that mission's Mission Detail [14] |
| Tap | Chain "accept" | Create linked mission, navigate to new Mission Detail |
| Tap | Chain "modify" | Modal present Create Mission [15] with chain context |
| Tap | Chain "dismiss" | Card fades out |
| Tap | Stalled nudge action chip | Execute respective action |
| Tap | Ask SIA card | Tab switch to SIA Chat [09] with mission context |
| Tap | Chart time range chip | Switch chart time range (week/month/all) |
| Tap | Difficulty dot | Show tooltip with context |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Hero ring | Screen mount | Fill animates 0→current% | 520ms | ease-flow |
| Hero ring | Action completed | Fill animates old%→new% | 280ms | ease-out-soft |
| Hero ring 100% | Reaches 100% | Green color transition + glow pulse | 600ms | ease-flow |
| Mission name + badge + tags | Screen mount | Fade-in + translateY(8→0), 80ms after ring | 280ms | ease-out-soft |
| Stats row | Screen mount | Fade-in + translateY(12→0), staggered | 280ms | ease-out-soft |
| SIA note / stalled nudge | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Next action card | Screen mount | Fade-in + translateY(12→0), last in stagger | 280ms | ease-out-soft |
| Section expand | Tap header | Content height 0→auto + fade-in. Chevron rotates 0→90° | 280ms | ease-out-soft |
| Section collapse | Tap header | Content height auto→0 + fade-out. Chevron rotates 90°→0 | 280ms | ease-out-soft |
| Next action transition | Current action completed | Old card slides down + fades (280ms), new card slides up from below + fades in (280ms, 160ms delay) | 440ms total | ease-out-soft |
| Nav bar title | Scroll past hero | Title opacity 0→1, bg blur 0→16px | 160ms | ease-out-soft |
| Chart line (XP Living Line) | Section expands (chart visible) | Line draws itself L→R (`stroke-draw`, never opacity-fade) | 1200ms | ease-flow |
| Projected line | After actual line draws | Dashed-**purple** (#7F24FF) SIA projection draws right, continuing the same path | 1200ms | ease-flow |
| Checklist checkbox | Tap complete | Orange fill from center + checkmark scale 0→1 | 280ms | ease-flow |
| Chain current dot | Chain section expands | Pulse animation begins (scale 1→1.15→1, 1.2s loop) | loop | ease-flow |
| Chain suggestion dismiss | Tap "dismiss" | Card height collapses + fade-out | 280ms | ease-out-soft |
| Stalled nudge chip | Tap chip | Chip scale(0.95→1), action executes | 160ms | ease-out-soft |
| Pin toggle | Tap pin button | Icon crossfade (outline↔filled), 160ms | 160ms | ease-out-soft |
| Archive confirmation | Archive chip tap | Bottom sheet slides up, 520ms ease-flow | 520ms | ease-flow |

**Screen transition**:
- **Enter**: Standard iOS stack push (slide in from right), 280ms ease-out-soft. Content stagger begins after push completes.
- **Exit (back)**: Standard iOS stack pop (slide out to right), 280ms ease-out-soft.
- **Exit (to Create Mission)**: Modal slides up from bottom, 520ms ease-flow.
- **Exit (to SIA Chat)**: Tab switch — instant, SIA chat opens with mission context message.

---

## Empty States

### Day 1 (mission just created, no actions completed)
- Hero ring: 0% (empty ring, orange at start position marker — a small dot at 12 o'clock)
- Stats row: "0 actions completed of [total]" — no streak, 0 XP, difficulty shown
- SIA coaching note: encouraging start message — "Every mission starts at 0%. Your first action is ready below."
- Next action card: first generated action from SIA
- Expandable sections: All Actions shows full unchecked list. Milestones show future dates only. Mission Chain shows chain if part of one. Progress chart shows only projected line (no past data yet). SIA reasoning available. Cross-domain connections available.

### All actions completed (100%)
- Hero ring: green (#34A853) fill, "100%" text, green glow pulse on mount
- Stats row: "[total]/[total] actions" + streak + total XP
- SIA coaching note: celebratory — "Mission accomplished. You stayed consistent for [##] days."
- Next action card: replaced by completion card — "Mission complete" heading, SIA suggestion for next steps ("Ready for a new challenge?" with link to Create Mission [15])
- Chain section: if part of chain, "What comes next" card auto-shows with next chain step suggestion
- Expandable sections: All Actions shows all checked (green). Milestones all completed (green dots). Chart shows full orange line reaching 100%.

### Archived state
- Hero ring: gray (#6B7280) fill at archived percentage, "archived" badge (13pt Sora Regular, white at 40%) centered below ring
- Stats row: shows partial XP earned — "⚡ [##] XP (partial)" in orange, "(partial)" in white at 40%
- SIA coaching note: reflective variant — "You made it to [##]%. Sometimes priorities shift — that's okay." 
- Next action card: replaced by action options card:
  - "Restart this mission" — 15pt Sora Semibold, orange, tappable (reopens mission at current progress)
  - "Delete permanently" — 15pt Sora Semibold, white at 40%, tappable (confirmation required)
- Contextual note field (below action options): "Add a note about why you archived this" — 14pt Sora Regular, white at 50% placeholder. ink-brown-800 textarea, 14pt radius, 120pt tall. User's note saved and displayed in Mission Journal [73].
- Expandable sections: mostly collapsed, chain section shows archived mission in chain context

---

## Motivation Adaptation

- **Low motivation**:
  - Only shown: Hero ring, mission name/badge/tags, next action card, Ask SIA card
  - Stats row: hidden
  - SIA coaching note: simplified, 1 line, gently encouraging
  - Stalled nudge: still shows if triggered (important for re-engagement)
  - Expandable sections: collapsed and de-emphasized (white at 30% text), only "all actions" section available
  - Minimal screen — fits in one viewport without scrolling

- **Medium motivation** (default):
  - Summary view fully visible (hero, identity, stats, SIA note/nudge, next action)
  - Expandable sections all present, collapsed by default
  - Ask SIA card visible
  - Chain section visible when applicable

- **High motivation**:
  - Summary view fully visible
  - "All actions" and "Progress over time" sections auto-expanded on mount
  - "Mission chain" auto-expanded if part of a chain
  - Additional detail visible: estimated completion date, average pace metric in stats row
  - SIA coaching note expanded (3 lines with data-specific insight)

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav bar center title | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Hero ring percentage | Sora | Bold (700) | 24pt | 30pt | #FFFFFF |
| Mission name | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| Mission type badge label | Sora | Semibold (600) | 11pt | 14pt | [type color] |
| Stats row text | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 70% |
| Stats row XP | Sora | Semibold (600) | 14pt | 18pt | #FF5E00 |
| Stats row streak | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF at 70% |
| Stats row difficulty | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 60% |
| SIA coaching "SIA" label | Sora | Semibold (600) | 11pt | 14pt | #FFFFFF at 40% |
| SIA coaching note text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 80% |
| Stalled nudge message | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 80% |
| Stalled nudge chips | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 60% |
| Section eyebrow ("NEXT UP") | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 40% |
| Next action text | Sora | Semibold (600) | 16pt | 22pt | #FFFFFF |
| Next action domain/time | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Next action SIA reason | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Expandable section title | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF at 80% |
| Expandable section counter | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 40% |
| Action checklist text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| Action checklist completed | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 40% |
| Milestone text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| Milestone date | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Milestone status | Sora | Regular (400) | 12pt | 16pt | #34A853 or #FFFFFF at 40% |
| Chain mission name (completed) | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 40% |
| Chain mission name (current) | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Chain mission name (upcoming) | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 50% |
| Chain XP earned | Sora | Regular (400) | 12pt | 16pt | #FF5E00 at 60% |
| Chain suggestion label | Sora | Semibold (600) | 11pt | 14pt | #FFFFFF at 40% |
| Chain suggestion name | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Chain suggestion actions | Sora | Semibold (600) | 15pt | 20pt | #FF5E00 / #FFFFFF at 60% / #FFFFFF at 40% |
| SIA reasoning sub-heading | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 50% |
| SIA reasoning body | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 80% |
| Connection mission name | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF |
| Connection explanation | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 60% |
| Chart axis labels | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 30% |
| Ask SIA card label | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Domain tag chip label | Sora | Semibold (600) | 11pt | 14pt | [domain color] |
| Completion heading | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Archive badge | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Archive note placeholder | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 50% |
| Archive note text | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 70% |
| Archived XP "(partial)" | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 40% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (mission detail fetch) | Hero ring shows skeleton shimmer. Stats row, SIA note, and next action show skeleton states. Expandable sections hidden. | Pull-to-refresh retries. Back navigation still functional. |
| API timeout (mission data) | After 8s, displays cached data if available. If no cache, "Couldn't load mission details" message with "try again" button. | Tap "try again" retries fetch. Cached data displayed when available. |
| Action completion sync failure | Checkbox reverts to unchecked. Toast: "Couldn't save completion. Try again." Ring percentage does not update. | Tap checkbox again to retry. Queued for background sync. |
| SIA coaching note API failure | SIA Coaching Note Card shows skeleton shimmer briefly, then hides (section collapses). Other sections unaffected. | Note loads on next screen visit or pull-to-refresh. |
| Progress chart data failure | "Progress over time" expandable section shows "Chart data unavailable" placeholder inside card. Other sections unaffected. | Retries on next expand of the section. |
| Cross-domain connections failure | "Cross-domain links" section shows "Connections unavailable" placeholder. | Retries on section expand. |
| Chain data failure | "Mission chain" section shows "Chain data unavailable" placeholder. | Retries on section expand. |
| Pin toggle failure | Pin state reverts. Toast: "Couldn't update pin. Try again." | User taps pin button again. |
| Archive action failure | Confirmation sheet dismisses. Toast: "Couldn't archive. Try again." | User retries from stalled nudge or quick actions. |
| Stalled nudge actions failure | Chip reverts to default state. Toast: "Couldn't save changes. Try again." | User taps chip again. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Back button: "Back, return to mission board"
  - Pin button: "Pin to home, [currently pinned/unpinned]"
  - Edit button: "Edit mission"
  - Hero progress ring: "[percentage] percent complete for [mission name]"
  - Mission type badge: "[type] mission" (e.g., "main mission")
  - Domain tag chip: "[domain name], tap to view dashboard"
  - Stats row: "[count] actions across [count] life areas, [days] day streak, [amount] XP earned, [difficulty] difficulty"
  - Difficulty dot: "[easy/moderate/hard] difficulty for your [domain] level"
  - SIA coaching note: "SIA coaching note: [note text]"
  - Stalled mission nudge: "SIA suggests adjusting this mission. Options: adjust timeline, reduce scope, pause, archive"
  - Next action checkbox: "Complete next action: [action text]"
  - Expandable section: "[section name], [collapsed/expanded], [counter if applicable]"
  - Mission chain section: "Mission chain, step [current] of [total], [collapsed/expanded]"
  - Chain completed row: "[mission name], completed, [XP] earned, tap to view"
  - Chain suggestion: "SIA suggests next in chain: [name]. Accept, modify, or dismiss."
  - Ask SIA card: "Ask SIA about this mission, opens chat"
  - Cross-domain connection card: "Connected mission: [mission name], tap to view"
  - Archive note field: "Add archive note, text field"
- **Focus order**: Back button → Pin button → Edit button → Hero progress ring → Mission name → Type badge → Domain tags (left to right) → Stats row → Difficulty dot → SIA note/stalled nudge → Stalled nudge chips (if present) → Next action card (checkbox first) → Expandable section headers (top to bottom) → Ask SIA card
- **Gesture alternatives**: iOS swipe-from-edge for back navigation. Expandable sections toggled via standard tap (no custom gestures required). Pin accessible without long-press.
- **Reduced motion**: Hero ring appears at final fill value immediately. Content entry stagger replaced with instant display. Section expand/collapse uses instant height change without animation. Chain current dot pulse disabled.

---

## Cross-References

- **Navigates to**: Create Mission [15] via modal present (edit button), SIA Chat [09] via tab switch (Ask SIA card), Mission Board [13] via stack pop (back), domain dashboards [26-36] via stack push (domain tag chips), other Mission Detail [14] instances via stack push (cross-domain connection cards, chain mission rows), Mission Detail [14] (new, from chain accept)
- **Navigates from**: Mission Board [13] via stack push, Home Screen [12] via stack push (pinned mission card)
- **Shared components with**: Home Screen [12] (Domain Tag Chip, Progress Ring large variant, Section Eyebrow, Pinned Mission Card reference), Mission Board [13] (Domain Tag Chip, Progress Ring references, Mission Card as data source, Chain Progress Bar, Difficulty Tier Indicator, Mission Type Badge), Create Mission [15] (domain chips, action list, Mission Type Badge)
- **Patterns used**: Back Button, Domain Tag Chip (from Screen 12), Progress Ring large variant, Section Eyebrow (from Screen 12), Action Card checkbox pattern (from Screen 12), Mission Type Badge (Phase 2), Chain Progress Bar (Phase 2, adapted to vertical timeline), Difficulty Tier Indicator (Phase 2), Stalled Mission Nudge (Phase 2), 8-State Interaction Model, Motion Tokens, Staggered Content Entry
- **Patterns established**: Mission Detail Screen Template (hero element → type badge → summary → expandable detail with chain section), Pin Toggle, Stalled Mission Conditional Card, Mission Chain Vertical Timeline, Archive State (gray ring, partial XP, contextual note, restart/delete options), Archive Confirmation Bottom Sheet
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-06.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/goals/detail`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q14 SIA in chats requires explicit invocation.
- Q15 group health/recovery signals require per-user permission.
- Q23 call follow-up scheduling should reuse the voice-history scheduling sheet.
- Q24 create mission starts from blank natural-language intent.
- Q25 streak details preserve source tab context.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B06-F05 | critical | retention | Implement next-action completion, progress/stat updates, next-action replacement, undo, and failure states. |
| B06-F06 | major | information-architecture | Wire expanded sections, pin/unpin state, persisted detail changes, and accessible disclosure behavior. |
| B06-F07 | major | mobile-ergonomics | Wrap the 28px visual checkbox in a 44x44 labeled touch target with focus and completion states. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

