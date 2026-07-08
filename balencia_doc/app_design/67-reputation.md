# Screen Design: Reputation

**Screen**: 67 of 68
**File**: 67-reputation.md
**Register**: Growth Mode (forest-green #34A853)
**Primary action**: view reputation score, history, and contributing breakdown
**Tab**: Me (pushed from Me Main, or from Social section as another member's public view)
**Navigation**: Stack depth 1-2 from Me tab root (Me Main → Reputation, or Groups & Pods [66] / Leaderboard [39] → limited profile → Reputation, public variant). Entry from Me Main [17] "reputation" row, Groups & Pods [66] Limited Member Profile "view reputation" link, Leaderboard [39] Limited User Profile, Accountability [46] via a resolved witness verdict notification, or SIA deep-link [09] ("your reputation moved up this week"). Exit via back button to Me Main [17], or Groups & Pods [66] / Leaderboard [39] when entered from a member profile.

---

## Purpose

This screen is the earned-trust ledger — it turns a person's consistency, verified follow-through, and community standing into a single legible number, with full transparency into how it was built. It answers "how much can this person's word be trusted, and why?" Unlike XP on the Leaderboard [39] (which rewards raw activity volume), Reputation measures **honored commitments**: consistency over time, verified achievements, peer endorsements, and community contribution. It is deliberately slow-moving and hard to game — a single good week doesn't spike it, and a single missed contract doesn't collapse it. The philosophy matches the rest of the Social Growth OS: **honest-or-null over fabricated confidence**. Every number on this screen traces to a real source; if a factor has no underlying data yet, it renders as an honest zero-contribution state rather than a placeholder score. All charts are hand-specified pure-SVG (radial gauge, area history, breakdown bars) rendered in the claymorphism idiom — no third-party charting library output on this screen.

This screen has one primary scrollable view (no tabs) — the reputation score is the singular focal point, with breakdown, history, and endorsements as supporting, secondarily-weighted sections beneath it. A lightweight **public variant** (viewing someone else's reputation) hides account-management actions and shows only what that person has made visible.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen header — "Reputation" title with back navigation
2. Score Hero — large SVG clay radial gauge (0-100) with tier label, the dominant visual anchor
3. Trend Indicator — up/down/flat delta, directly beneath the hero
4. Tier Progression — next-tier threshold + progress bar
5. Score History Chart — pure-SVG area/line chart over selectable time range
6. Breakdown Panel — contributing factors (consistency, community contribution, verified achievements, peer endorsements)
7. Endorsement List — recent peer endorsements, cross-linked to Accountability [46] witness verdicts
8. "how reputation works" explainer link — bottom, low-emphasis

**User flow**:
- **Arrives from**: Me Main [17] via "reputation" row (stack push, own reputation), Groups & Pods [66] via Limited Member Profile "view reputation" link (public variant, stack push), Leaderboard [39] via Limited User Profile (public variant), Accountability [46] via a resolved witness verdict notification (own reputation, deep-link), SIA Chat [09] via deep-link
- **Primary exit**: Back to Me Main [17] (stack pop, own view) or back to Groups & Pods [66] / Leaderboard [39] (stack pop, public view)
- **Secondary exits**: Accountability [46] via Endorsement List entry (contract/witness detail, stack push), Groups & Pods [66] via community-contribution breakdown row ("view your pods" link), "how reputation works" explainer (modal)

---

## Layout — Own Reputation (default, full detail)

**Scroll behavior**: ScrollView (single cohesive scroll, chart interactions are pan/scrub within their own bounds, not full-page scroll hijacking)
**Tab bar visible**: Yes

### ASCII Wireframe — Own Reputation

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]     "Reputation"         │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│         ╭───────────────╮          │
│        ╱   ╭─────────╮   ╲         │  ← Score Hero
│       │   │    78     │    │        │     SVG clay radial gauge
│       │   │  Trusted   │    │        │     tier label inside
│        ╲   ╰─────────╯   ╱         │
│         ╰───────────────╯          │
│                                     │  ← 12pt gap
│         ▲ +4 this month             │  ← Trend Indicator
│                                     │  ← 20pt gap
│  ┌─────────────────────────────┐   │
│  │ Trusted → Pillar             │   │  ← Tier Progression Card
│  │ ▓▓▓▓▓▓▓▓▓▓▓░░░░  78/85     │   │     next-tier threshold bar
│  │ 7 points to next tier        │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  SCORE HISTORY                      │  ← Eyebrow
│  [3M][6M][1Y][All]                  │  ← Time Range Toggle
│  ┌─────────────────────────────┐   │
│  │      ╱‾‾╲___╱‾‾‾‾‾╱‾╲      │   │  ← Score History Chart
│  │   __╱          ╲_╱    ╲__   │   │     pure-SVG clay area
│  │  100                          │   │     line chart
│  │   50                          │   │
│  │    0                          │   │
│  │  Jan  Feb  Mar  Apr  May  Jun│   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  BREAKDOWN                          │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ Consistency          32 pts  │   │  ← Breakdown Panel
│  │ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░       │   │     stacked contribution
│  │ Community contribution 24pts │   │     bars, per factor
│  │ ▓▓▓▓▓▓░░░░░░░░░░░░░░░       │   │
│  │ Verified achievements 14pts  │   │
│  │ ▓▓▓░░░░░░░░░░░░░░░░░░░       │   │
│  │ Peer endorsements      8 pts │   │
│  │ ▓▓░░░░░░░░░░░░░░░░░░░░       │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ENDORSEMENTS (5)                   │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ [av] Sarah K. witnessed your │   │  ← Endorsement Row
│  │  "Run 3x/week" contract      │   │
│  │  ✓ verified · May 18          │   │
│  ├─────────────────────────────┤   │
│  │ [av] Ahmed M. endorsed       │   │  ← Endorsement Row
│  │  "reliable accountability    │   │
│  │  partner" · May 12            │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  how reputation works →             │  ← Explainer Link
│                                     │  ← 24pt gap
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Own Reputation (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "Reputation" title

2. **Score Hero** — ~240pt
   - Purpose: The singular focal point — current reputation score as an SVG clay radial gauge with tier label
   - Content: Radial gauge (0-100), numeric score, tier name

3. **Trend Indicator** — 24pt
   - Purpose: Immediate directional context beneath the hero
   - Content: Arrow icon + delta + timeframe

4. **Tier Progression Card** — ~96pt
   - Purpose: Show distance to the next tier as concrete, motivating progress
   - Content: Current → next tier label, threshold progress bar, points-remaining text

5. **Score History Chart Section** — ~220pt
   - Purpose: Long-horizon trend visualization, pure-SVG, clay-styled
   - Content: Time range toggle + area/line chart with axis labels

6. **Breakdown Panel** — ~200pt
   - Purpose: Explain what the score is made of, factor by factor
   - Content: Stacked contribution bars per factor, with point values

7. **Endorsement List** — Variable
   - Purpose: Concrete, attributable peer trust signals
   - Content: Endorsement rows, cross-linked to Accountability [46] witness verdicts

8. **Explainer Link** — 44pt
   - Purpose: Full transparency into the scoring methodology
   - Content: "how reputation works" text link

---

## Layout — Public/Limited Reputation (viewing another member)

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes (still within the app shell — this is a stack push, not a modal)

### ASCII Wireframe — Public Reputation (limited view)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]   "Sarah's Reputation"   │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│         ╭───────────────╮          │
│        ╱   ╭─────────╮   ╲         │
│       │   │    91     │    │        │  ← Score Hero (public)
│       │   │  Pillar    │    │        │     same gauge, no
│        ╲   ╰─────────╯   ╱         │     "your score" framing
│         ╰───────────────╯          │
│                                     │  ← 12pt gap
│         ▲ +2 this month             │  ← Trend Indicator
│                                     │  ← 24pt gap
│  ┌─────────────────────────────┐   │
│  │  📊 detailed history is      │   │  ← Privacy Notice Card
│  │  private to this member      │   │     (replaces full chart +
│  │                               │   │      breakdown if member has
│  └─────────────────────────────┘   │      restricted visibility)
│                                     │  ← 24pt gap
│  BREAKDOWN                          │  ← Eyebrow (shown only if
│  ┌─────────────────────────────┐   │      member allows public
│  │ Consistency          High    │   │      breakdown — qualitative
│  │ Community contribution High  │   │      bands, not exact points,
│  │ Verified achievements Med    │   │      to protect precision
│  │ Peer endorsements     High   │   │      privacy on public views)
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ENDORSEMENTS (12)                  │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ ...endorsement rows...        │   │  ← Endorsement Row
│  │  (public endorsements only)   │   │     (private ones excluded)
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  how reputation works →             │  ← Explainer Link
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Public/Limited Reputation (top to bottom)

1. **Screen Header** — 44pt, title reads "[Name]'s Reputation"
2. **Score Hero** — ~240pt, identical visual treatment, no first-person framing
3. **Trend Indicator** — 24pt
4. **Privacy Notice Card** — ~64pt (conditional, replaces Score History Chart when the viewed member has not opted into public history sharing)
5. **Breakdown Panel — Qualitative Variant** — ~140pt (band labels — High/Medium/Low/None — instead of exact point values, always shown regardless of privacy setting since it reveals no precise numbers)
6. **Endorsement List — Public Only** — Variable (excludes endorsements the endorser or endorsee marked private)
7. **Explainer Link** — 44pt

---

## Layout — Day 1 / Zero-Data State (own view, brand-new account)

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes

### ASCII Wireframe — Zero-Data State

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]     "Reputation"         │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│         ╭───────────────╮          │
│        ╱   ╭─────────╮   ╲         │  ← Score Hero (zero-data)
│       │   │           │    │        │     unfilled track, no
│       │   │  not      │    │        │     number, honest caption
│       │   │  enough   │    │        │
│        ╲   │  data yet│   ╱         │
│         ╰──╰─────────╯──╯          │
│                                     │  ← 20pt gap
│  ┌─────────────────────────────┐   │
│  │ New → Rising                 │   │  ← Tier Progression
│  │ ░░░░░░░░░░░░░░░░░░░░  0/25  │   │     (empty bar)
│  │ build your first 25 points   │   │
│  │ to reach Rising               │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ┌─────────────────────────────┐   │
│  │     📈  your history starts  │   │  ← Score History (empty)
│  │         today                 │   │     replaces chart entirely
│  │  check back in a few weeks   │   │
│  │  to see your first trend      │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  BREAKDOWN                          │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ Consistency      not enough  │   │  ← Breakdown Panel
│  │                   data yet    │   │     (all 4 factors in
│  │ sign your first accountability│   │      honest-null state)
│  │ contract to start building    │   │
│  │ this →                        │   │
│  │ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈    │   │
│  │ Community contribution        │   │
│  │ not enough data yet            │   │
│  │ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈    │   │
│  │ ...2 more factors...           │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ┌─────────────────────────────┐   │
│  │      🤝  no endorsements yet │   │  ← Endorsement List (empty)
│  │  endorsements come from       │   │
│  │  partners who witness your    │   │
│  │  commitments or vouch for     │   │
│  │  you directly                 │   │
│  │      [set up accountability] │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  how reputation works →             │  ← Explainer Link
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Zero-Data State (top to bottom)

1. **Screen Header** — 44pt, unchanged
2. **Score Hero — zero-data variant** — ~240pt
   - Purpose: Honestly represent "no score yet" without ever rendering a fabricated placeholder number (never "0", never a fake starting value like "50")
   - Content: Unfilled track, no numeric score, "not enough data yet" caption in place of both the number and tier label
3. **Tier Progression — New/Rising, empty bar** — ~96pt
   - Purpose: Frame the starting point as an invitation, not a deficiency
   - Content: "New → Rising" label, 0-fill bar, concrete first-step guidance
4. **Score History — empty-state card** — ~160pt
   - Purpose: Replace the chart entirely (an empty axis with no line reads as broken, not "new")
   - Content: Icon + "your history starts today" + reassurance copy
5. **Breakdown Panel — all-factors honest-null** — ~220pt
   - Purpose: Each factor names its own concrete unlock action, turning "no data" into a checklist rather than a wall of zeros
   - Content: 4 factor rows, each with a dashed placeholder track and a specific next-action link
6. **Endorsement List — empty state** — ~140pt
   - Purpose: Explain the endorsement mechanism itself for a user who has never seen one
   - Content: Icon + title + body + "set up accountability" CTA to Accountability [46]
7. **Explainer Link** — 44pt, unchanged

This state exists to prove the honest-null policy end-to-end: nowhere in this composition does an invented number, a misleading full/empty bar, or a silent blank space stand in for "we don't have this yet." Every empty element says so explicitly and, where possible, tells the user exactly what would fill it.

This is also the state most likely to be QA'd against a fabricated-data regression, since it is the one screen state where the temptation to "just show something" is highest — the acceptance criterion for this layout is that a screenshot of it, shown to a new user, should read as an honest starting line rather than a broken or empty product.

---

## Components

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 44pt. Back chevron left + title center (17pt Cabinet Grotesk SemiBold 600, white). "Reputation" (own) or "[Name]'s Reputation" (public).
- **Size**: Full-width x 44pt

### Score Hero — SVG Clay Radial Gauge
- **Purpose**: The emotional and visual center of the screen — current reputation score rendered as a hand-specified SVG arc gauge in the claymorphism idiom. This is the single number that everything else on the screen explains.
- **Data source**: API — GET /api/reputation/score (own) or GET /api/reputation/:userId/score (public)
- **Visual treatment**: Pure SVG, no chart library. 200pt diameter gauge, centered, 32pt top margin.
  - Outer clay ring: two concentric `<circle>` strokes forming the claymorphism dual-shadow illusion in SVG terms — a `stroke` in ink-brown-800 with a `feDropShadow` filter pair: light shadow (`rgba(255,255,255,0.08)`, offset -2,-2, blur 4) top-left, dark shadow (`rgba(0,0,0,0.45)`, offset 4,4, blur 8) bottom-right, applied via SVG `<filter>` def, not CSS box-shadow (since this is a canvas-rendered gauge, not a DOM card)
  - Track arc: 270° sweep (start -135°, end 135°), 14pt stroke width, `stroke-linecap: round`, color white at 8%
  - Fill arc: same sweep, animated `stroke-dashoffset` from full track length to the value-proportional length, color forest-green (#34A853) — reputation's hero color, distinct from the orange XP ring on RPG Character [19] and Leaderboard [39], to visually separate "earned trust" from "activity volume"
  - Fill arc gradient (subtle): `linearGradient` from #2D9249 (start) to #34A853 (end), following the arc direction — adds dimensionality without breaking the single-hero-color rule (still reads as "green")
  - Center content (absolutely positioned over the SVG, not inside it, for crisp text rendering): score number "78" — 40pt Cabinet Grotesk Bold 700, white, centered. Tier label "Trusted" beneath — 15pt Switzer Medium 500, white at 70%, centered, 4pt below score.
  - Inner highlight: a low-opacity radial `<feGaussianBlur>`-based glow behind the center text, forest-green at 12%, to lift the number off the ink-brown-800 gauge face — matches `--glow-green` token intent, reimplemented as SVG filter since this is not a DOM element
- **Content**: Numeric score (0-100), tier label (New / Rising / Trusted / Pillar — see Tier Progression for full ladder)
- **Variants**: Own (standard), Public (identical rendering, header context differs), Loading (gauge track renders immediately, fill arc and center number skeleton-shimmer until data resolves — never shows a fake interim number), Zero-data (score renders as an unfilled track with center text "not enough data yet" in place of a number — honest-null, never a fabricated 0 that reads as "bad reputation")
- **Gestures**: None (display-only; the gauge is not tappable — it is the anchor, not a control)
- **Size**: 200pt x 200pt (gauge) + ~40pt for tier label = ~240pt total including margins

### Trend Indicator
- **Purpose**: Immediate, low-noise directional signal beneath the hero
- **Data source**: API — delta field on GET /api/reputation/score (current period vs. prior period, default: this-month vs. last-month)
- **Visual treatment**: Single centered row, 24pt tall, 12pt below Score Hero.
  - Up: green (#34A853) triangle-up icon (12pt) + "+4 this month" — 14pt Switzer Medium 500, green
  - Down: orange (#FF5E00) triangle-down icon (12pt) + "-2 this month" — 14pt Switzer Medium 500, orange (never red — reputation dips are framed as brand-consistent, not alarming, matching the "rank change ↓ stays brand-orange, not red" convention from Leaderboard [39])
  - Flat: white at 40% dash icon + "steady this month" — 14pt Switzer Regular 400, white at 50%
- **Variants**: Up, Down, Flat, No prior-period data ("first month tracking — check back soon")
- **Gestures**: None (display-only)
- **Size**: Auto-width, centered x 24pt

### Tier Progression Card
- **Purpose**: Translate the abstract score into a concrete, motivating "how close am I to the next milestone" narrative
- **Data source**: API — tier ladder + current/next threshold from GET /api/reputation/score
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 20pt padding. 16pt horizontal margins.
- **Content**:
  - Tier transition label: "Trusted → Pillar" — 15pt Cabinet Grotesk SemiBold 600, white. Current tier in white, next tier in green (#34A853) at 80%.
  - Progress bar (8pt below label): full-width, 10pt tall, --r-pill. Track white at 8%. Fill: forest-green (#34A853), animates to current position within the tier band.
  - Threshold numbers (inline, right-aligned on the bar): "78/85" — 13pt Cabinet Grotesk SemiBold 600, white at 70%, `tabular-nums`
  - Remaining text (4pt below bar): "7 points to next tier" — 13pt Switzer Regular 400, white at 50%
- **Tier ladder** (5 tiers, honest and non-inflationary): New (0-24) → Rising (25-49) → Trusted (50-74) → Pillar (75-89) → Cornerstone (90-100)
- **Variants**: Standard (mid-tier), Top tier reached (Cornerstone — bar shows full green fill, text reads "you've reached the highest tier" instead of a threshold), New user (bar shows minimal fill, text reads "build your first 25 points to reach Rising")
- **Gestures**: None (display-only)
- **Size**: Full-width minus 32pt x ~96pt

### Score History Chart — Pure-SVG Clay Area Chart
- **Purpose**: Long-horizon trend visualization proving the score's trajectory over time, hand-specified as SVG paths (not a rendered chart-library image) so it can be themed precisely to the claymorphism system and stay crisp at any zoom
- **Data source**: API — GET /api/reputation/history?range=3m|6m|1y|all, dual-DDL history table (score snapshots)
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 20pt padding, 200pt chart height, 16pt horizontal margins.
  - Chart canvas: SVG `viewBox` scaled to container, `preserveAspectRatio="none"` for responsive fill
  - Area fill: `<path>` constructed from monotone-cubic-interpolated points, filled with a `linearGradient` from forest-green at 28% opacity (top) to forest-green at 0% opacity (bottom) — the "clay glow settling" look, not a hard-edged chart-library gradient
  - Line stroke: same `<path>` outline, 2.5pt stroke, forest-green (#34A853), `stroke-linejoin: round`
  - Data point markers: shown only at hover/scrub position (not permanently rendered per point, to avoid visual noise) — 6pt circle, white fill, forest-green 2pt ring
  - Y-axis gridlines: 3 horizontal reference lines (0, 50, 100), 1pt white at 5%, with small numeric labels (11pt Switzer Regular 400, white at 30%) left-aligned
  - X-axis labels: month abbreviations, 11pt Switzer Regular 400, white at 40%, evenly spaced beneath the chart
  - Tier-band shading (subtle, optional context layer): faint horizontal bands behind the line at each tier threshold (25/50/75/90), 2% white opacity alternating, to visually anchor "this is where Trusted starts" without adding chart clutter
- **Time Range Toggle**: 4-segment segmented control above the chart — "3M" / "6M" / "1Y" / "All" (13pt Cabinet Grotesk SemiBold 600), same Segmented Control pattern as Screen 38, 36pt tall, 16pt horizontal margins, 12pt below the eyebrow
- **Content**: Score trend line/area over the selected range, with scrub/pan interaction
- **Variants**: Standard (sufficient history), Sparse (fewer than 3 data points — renders as isolated dots with a "still building history" caption instead of a connected line, honest about limited data), Empty (brand-new account — chart area shows a centered "your history starts today" message instead of an empty axis)
- **Gestures**: Horizontal pan/scrub within the chart bounds to inspect a specific date (shows a vertical guideline + tooltip: date + score, 12pt Switzer Medium 500, ink-900 bg pill), tap time-range segment to reload data (280ms crossfade between ranges)
- **Size**: Full-width minus 32pt x ~220pt (including toggle + card padding)

### Breakdown Panel
- **Purpose**: Full transparency into what the score is made of — no black-box number. Honest-null applies per factor: a factor with zero underlying data shows an explicit "not enough data" row instead of a fabricated point value.
- **Data source**: API — GET /api/reputation/breakdown (own, exact points) or GET /api/reputation/:userId/breakdown (public, qualitative bands only — see Public variant below)
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 20pt padding, 16pt horizontal margins.
- **Content per factor row** (own/exact variant, ~44pt tall):
  - Factor name (left): "consistency" / "community contribution" / "verified achievements" / "peer endorsements" — 14pt Switzer Medium 500, white
  - Point value (right-aligned): "32 pts" — 14pt Cabinet Grotesk SemiBold 600, white at 80%, `tabular-nums`
  - Contribution bar (full-width, 8pt below label row): 6pt tall, --r-pill, track white at 6%, fill forest-green (#34A853) at a width proportional to that factor's share of the max possible contribution for that factor (each factor has its own max weight, not a shared 100-point scale, so bars are independently normalized and labeled)
  - Factor sub-caption (4pt below bar, 12pt Switzer Regular 400, white at 40%): one-line source explanation, e.g. "consistency" → "based on honored commitments over 90 days", "community contribution" → "pod activity + accountability partnering", "verified achievements" → "SIA-confirmed goal completions", "peer endorsements" → "witness verdicts + direct endorsements"
- **Factor definitions** (life-coaching-platform-appropriate, all real-source):
  - **Consistency**: rolling 90-day honored-commitment rate from Accountability [46] contracts and trigger history (source: contracts.status + trigger execution log)
  - **Community contribution**: pod engagement and accountability-partner activity from Groups & Pods [66] and Accountability [46] (source: pod activity feed + partner interaction frequency)
  - **Verified achievements**: goal completions that passed SIA or partner verification (not self-report-only) from Goals [13]/[14] (source: goal.verification_method = automatic or partner-verified)
  - **Peer endorsements**: witness verdicts from Accountability [46]'s contract witnessing flow, plus direct endorsement actions (source: witness_verdicts table + endorsements table)
- **Variants**: Full data (all 4 factors populated), Partial (one or more factors show "not enough data yet — [factor] unlocks after your first [relevant action]" in place of a bar), Public/qualitative (see below)
- **Gestures**: Tap a factor row expands an inline one-line detail (e.g. tap "community contribution" reveals "from 3 pods, 12 check-ins this quarter")
- **Size**: Full-width minus 32pt x ~200pt (4 factors)

### Breakdown Panel — Qualitative Variant (public view)
- **Purpose**: Same transparency intent, but precision-protected — public viewers see relative strength (High/Medium/Low/None), never another member's exact internal point values, to prevent score-reverse-engineering and unwanted comparison pressure
- **Visual treatment**: Same card shell, rows drop the bar + exact points, replaced with a single band chip per factor
- **Content per factor row**: Factor name (left) + band chip (right): "High" (green at 15% bg, green text), "Medium" (white at 10% bg, white at 70% text), "Low" (white at 8% bg, white at 50% text), "None" (white at 5% bg, white at 30% text, italic)
- **Gestures**: None (display-only in public view — no expansion, keeps precision hidden)
- **Size**: Full-width minus 32pt x ~140pt

### Privacy Notice Card (public view, conditional)
- **Purpose**: Explicit, non-judgmental notice when a viewed member has restricted their score history from public view — replaces the Score History Chart section entirely rather than showing a broken or empty chart
- **Visual treatment**: ink-brown-800 card, --r-md (14pt), 16pt padding, 16pt horizontal margins. Muted, informational tone (not a warning).
- **Content**: Chart icon (18pt, white at 30%) + "detailed history is private to this member" — 14pt Switzer Regular 400, white at 50%
- **Gestures**: None
- **Size**: Full-width minus 32pt x ~64pt

### Endorsement Row
- **Purpose**: Concrete, attributable trust signals — the human-readable evidence behind the "peer endorsements" factor. Directly cross-linked to Accountability [46]'s witness-verification flow, since a resolved witness verdict is one of the strongest, hardest-to-fake reputation-boosting actions on the platform.
- **Data source**: API — GET /api/reputation/endorsements (own, all) or GET /api/reputation/:userId/endorsements (public, filtered to non-private)
- **Visual treatment**: Rows within an ink-brown-800 glassmorphism card. 20pt radius on outer card. Each row separated by 1pt white at 5%.
- **Content per row** (~68pt tall):
  - Avatar (left): 36pt circle, --r-pill. Photo if available, else initial on forest-green (#34A853) circle.
  - Endorsement text (12pt right of avatar): endorser name (bold, inline) + action description — "Sarah K. witnessed your 'Run 3x/week' contract" or "Ahmed M. endorsed 'reliable accountability partner'" — 14pt Switzer Regular 400, white, name in Switzer Medium 500, max 2 lines
  - Verified checkmark (conditional, 4pt below text): green checkmark (12pt) + "verified" — 12pt Switzer Regular 400, green (#34A853), shown only for witness-verdict-sourced endorsements (the strongest, cryptographically/audit-trail-backed type)
  - Date (right-aligned, top row): "May 18" — 12pt Switzer Regular 400, white at 40%
  - Padding: 12pt vertical, 16pt horizontal
- **Variants**: Witness verdict (verified checkmark, links to Accountability [46] contract detail), Direct endorsement (no checkmark, freeform peer-given trust tag, links to endorser's Limited Profile), Private (own view only — a small "private" tag, white at 30%, indicates the endorsement is excluded from the user's public reputation view)
- **Gestures**: Tap a witness-verdict row navigates to the source Contract Detail in Accountability [46] (stack push). Tap a direct-endorsement row opens the endorser's Limited Member Profile (bottom sheet, reused from Groups & Pods [66] / Leaderboard [39]).
- **Size**: Full-width minus 32pt x ~68pt per row, max 5 rows visible before "view all N endorsements" link

### Explainer Link
- **Purpose**: Full methodology transparency, always available, low-emphasis so it doesn't compete with the score itself
- **Visual treatment**: Full-width, center-aligned, 44pt touch target, 16pt margins.
- **Content**: "how reputation works" — 14pt Cabinet Grotesk SemiBold 600, orange (#FF5E00), with a right chevron (10pt)
- **Gestures**: Tap opens the "How Reputation Works" modal (bottom sheet, ~70% height): explains the 4 factors, the tier ladder, the honest-null policy, and privacy controls for the public view
- **Size**: Full-width x 44pt

### Tier Badge (reusable chip)
- **Purpose**: A compact, portable representation of a member's reputation tier — the atomic unit that lets Reputation surface elsewhere on the platform (Groups & Pods [66] Limited Member Profile, Leaderboard [39] rank rows, Community [40] room member lists) without pulling in the full score screen
- **Data source**: Derived from the same tier ladder as the Tier Progression Card
- **Visual treatment**: Pill shape, 22pt height, --r-pill, 8pt horizontal padding. Green (#34A853) at 15% bg for Trusted/Pillar/Cornerstone tiers, white at 10% bg for New/Rising (reputation not yet established enough to warrant a green highlight)
- **Content**: Tier name only, no number — "Trusted", "Pillar", "Cornerstone", "Rising", "New" — 11pt Cabinet Grotesk SemiBold 600, tier-appropriate color
- **Variants**: Standard (as above), Compact icon-only (12pt shield glyph, no text, used in space-constrained contexts like avatar overlays)
- **Gestures**: Tap navigates to that member's Reputation screen (public variant)
- **Size**: Auto-width (~64-88pt) x 22pt

### Score Comparison Chip
- **Purpose**: Lightweight, opt-in context comparing the user's score to a relevant reference group (their pods, or the platform median) — shown only in the High motivation variant or when explicitly requested, never as a default competitive framing since reputation is meant to feel earned, not ranked
- **Data source**: API — GET /api/reputation/comparison?scope=pods|platform
- **Visual treatment**: Inline chip beneath the Trend Indicator, --r-pill, white at 6% bg, 6pt vertical / 10pt horizontal padding
- **Content**: "above your pods' average" or "top 15% platform-wide" — 12pt Switzer Regular 400, white at 60%, with a small comparison icon (10pt, white at 40%)
- **Variants**: Above average, At average, Building toward average (never shown as "below average" in blunt terms — reframed as "building toward" to avoid discouragement)
- **Gestures**: Tap opens a short explainer: "how this comparison works" (inline expansion, not a full modal)
- **Size**: Auto-width x 28pt

### Chart Scrub Tooltip
- **Purpose**: Precise point-in-time readout while scrubbing the Score History Chart
- **Visual treatment**: Floating pill, ink-900 bg at 95% opacity, --r-md (14pt), 8pt padding, positioned above the touch point with a small triangular pointer, follows finger 1:1 within chart bounds, clamped to stay inside the chart's horizontal bounds
- **Content**: Date (12pt Switzer Medium 500, white at 60%) stacked above score value (16pt Cabinet Grotesk Bold 700, white)
- **Gestures**: Appears on touch-down within the chart, follows drag, fades out 200ms after touch-up
- **Size**: Auto-width (~72pt) x ~52pt

### Endorsement Detail Sheet (Bottom Sheet)
- **Purpose**: Full context for a single endorsement, reached when the inline row summary isn't enough — particularly useful for witness-verdict endorsements where the underlying contract terms matter
- **Visual treatment**: Bottom sheet, ~45% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("done")
  - Endorser avatar (56pt, centered) + name (18pt Cabinet Grotesk Bold 700, white, centered)
  - Endorsement type badge: "witness verdict" (green, verified icon) or "direct endorsement" (white at 10% bg)
  - Full text: the complete endorsement statement or the witnessed contract's title and resolution, 15pt Switzer Regular 400, white at 80%, centered, no truncation
  - Date + source link: "May 18 · from 'Run 3x/week' contract" — 13pt Switzer Regular 400, white at 50%, centered, tappable to Accountability [46] if witness-sourced
  - "report this endorsement" link: 13pt Switzer Regular 400, #F44336, centered — trust & safety exit hatch, reuses the Groups & Pods [66] Report/Moderate Action Sheet pattern
- **Gestures**: Drag to dismiss, tap source link navigates to Contract Detail
- **Size**: ~45% screen height

### How Reputation Works Modal (Bottom Sheet)
- **Purpose**: Full methodology disclosure — the trust document behind the score
- **Visual treatment**: Bottom sheet, ~70% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("done")
  - Title: "how reputation works" — 20pt Cabinet Grotesk Bold 700, white
  - Tier ladder visual: 5 horizontal bands (New/Rising/Trusted/Pillar/Cornerstone) with point ranges
  - 4 factor explanations, matching the Breakdown Panel sub-captions but expanded to 2-3 sentences each
  - "your privacy controls" section: link to the Reputation Privacy settings (toggle public breakdown visibility, toggle public history visibility, manage which endorsements are marked private)
  - Note on the honest-null policy: "if a factor shows 'not enough data,' it means we haven't seen enough verified activity yet — never a guess."
- **Gestures**: Drag to dismiss, tap "manage privacy" navigates to Settings [21] reputation section

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Screen header title | Cabinet Grotesk | 600 (SemiBold) | 17pt | 22pt | White #FFFFFF | "Reputation" / "[Name]'s Reputation" |
| Section eyebrow | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White at 40% | Uppercase, +0.12em tracking |
| Score Hero number | Cabinet Grotesk | 700 (Bold) | 40pt | 44pt | White #FFFFFF | Center of radial gauge |
| Score Hero tier label | Switzer | 500 (Medium) | 15pt | 20pt | White at 70% | "Trusted" |
| Trend Indicator text | Switzer | 500 (Medium) | 14pt | 18pt | Green/orange/white 50% | "+4 this month" |
| Tier transition label | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | White / green | "Trusted → Pillar" |
| Tier threshold numbers | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | White at 70% | "78/85", tabular-nums |
| Tier remaining text | Switzer | 400 (Regular) | 13pt | 18pt | White at 50% | "7 points to next tier" |
| Chart axis labels | Switzer | 400 (Regular) | 11pt | 14pt | White at 30-40% | Month labels, Y-axis values |
| Chart tooltip date/score | Switzer | 500 (Medium) | 12pt | 16pt | White #FFFFFF | On ink-900 pill |
| Breakdown factor name | Switzer | 500 (Medium) | 14pt | 20pt | White #FFFFFF | "consistency" |
| Breakdown point value | Cabinet Grotesk | 600 (SemiBold) | 14pt | 20pt | White at 80% | "32 pts", tabular-nums |
| Breakdown sub-caption | Switzer | 400 (Regular) | 12pt | 16pt | White at 40% | Source explanation |
| Breakdown band chip (public) | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | Per-band color | "High" / "Medium" / "Low" / "None" |
| Privacy notice text | Switzer | 400 (Regular) | 14pt | 20pt | White at 50% | "detailed history is private" |
| Endorsement name (inline bold) | Switzer | 500 (Medium) | 14pt | 20pt | White #FFFFFF | "Sarah K." |
| Endorsement description | Switzer | 400 (Regular) | 14pt | 20pt | White #FFFFFF | Action text |
| Endorsement verified label | Switzer | 400 (Regular) | 12pt | 16pt | Green #34A853 | "verified" |
| Endorsement date | Switzer | 400 (Regular) | 12pt | 16pt | White at 40% | "May 18" |
| Explainer link | Cabinet Grotesk | 600 (SemiBold) | 14pt | 18pt | Orange #FF5E00 | "how reputation works" |
| Modal heading | Cabinet Grotesk | 700 (Bold) | 20pt | 26pt | White #FFFFFF | "how reputation works" |
| Modal body copy | Switzer | 400 (Regular) | 15pt | 22pt | White at 70% | Factor explanations |
| Zero-data hero caption | Switzer | 400 (Regular) | 14pt | 20pt | White at 40% | "not enough data yet" |
| Tier Badge text | Cabinet Grotesk | 600 (SemiBold) | 11pt | 14pt | Green or white 70% | "Trusted", "Pillar" — reusable chip |
| Score Comparison Chip text | Switzer | 400 (Regular) | 12pt | 16pt | White at 60% | "above your pods' average" |
| Chart tooltip score value | Cabinet Grotesk | 700 (Bold) | 16pt | 20pt | White #FFFFFF | Inside scrub tooltip |
| Endorsement Detail name | Cabinet Grotesk | 700 (Bold) | 18pt | 24pt | White #FFFFFF | Centered, sheet header |
| Endorsement Detail full text | Switzer | 400 (Regular) | 15pt | 22pt | White at 80% | Untruncated statement |
| Endorsement type badge | Cabinet Grotesk | 600 (SemiBold) | 11pt | 14pt | Green or white 70% | "witness verdict" |
| Tier-up banner text | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | White #FFFFFF | "you just reached Pillar!" |
| Attributed-dip caption | Switzer | 400 (Regular) | 13pt | 18pt | White at 50% | Factual, non-judgmental |
| Retry/error state text | Switzer | 400 (Regular) | 14pt | 20pt | White at 50% | "couldn't load this — retry" |
| Retry action word | Cabinet Grotesk | 600 (SemiBold) | 14pt | 20pt | Orange #FF5E00 | "retry" inline link |
| Report endorsement link | Switzer | 400 (Regular) | 13pt | 18pt | #F44336 | Trust & safety exit hatch |

---

## Composition & Visual Hierarchy

**Squint test**:
- The Score Hero's green radial gauge is unmistakably the first thing the eye lands on — large, centered, high-contrast against ink-900, with nothing else on the screen competing at that saturation
- Green is used with intent and restraint: hero gauge, trend-up arrow, tier progression fill, chart line/area, verified-endorsement checkmarks. It never spills into decorative use elsewhere on the screen
- The Breakdown Panel's four bars form a clear "waterfall" reading pattern — biggest contributor (consistency) to smallest (peer endorsements) reinforces which behaviors matter most without needing extra copy
- Endorsement rows read like a social-proof list — avatar-led rows are a familiar pattern from Accountability's Contact Row and Community's Room List Row, so users don't have to learn a new visual grammar
- Public variant deliberately looks *slightly* less detailed (qualitative bands instead of bars, privacy notice instead of a chart) — this asymmetry is intentional: it signals "this is not your own private dashboard" without needing a banner to say so

**Spacing breakdown (8pt grid)**:
- Screen header height: 44pt
- Header to Score Hero: 16pt (--s-4)
- Score Hero to Trend Indicator: 12pt (--s-3)
- Trend Indicator to Tier Progression: 20pt
- Section eyebrow to content below: 12pt (--s-3)
- Between major sections: 24pt (--s-5)
- Card internal padding: 20pt
- Last content to tab bar: 24pt (--s-5)
- Tab bar: 56pt + 34pt safe area

**Z-layers**:
- z-0: ink-900 background
- z-10: Content cards (Tier Progression, Score History, Breakdown Panel, Endorsement list)
- z-15: Score Hero SVG (elevated slightly above standard cards via its own clay-shadow filter, establishing it as the singular hero element)
- z-20: Privacy Notice Card (public view)
- z-30: Screen header (backdrop-blur on scroll), Time Range Toggle (sticky within chart card on scrub)
- z-40: Tab bar
- z-50: Bottom sheets (How Reputation Works modal, Endorsement Detail Sheet)
- z-55: Chart Scrub Tooltip (floats above the chart card but below any open bottom sheet)
- z-60: Leave/error retry inline toasts

**Why green leads instead of orange**: this is the one screen in the app where the default 60% orange role is intentionally not the dominant color. The Brand Guidelines state Forest Green "signals growth and success" and that compositions should have one hero color per surface — Reputation is structurally a growth-and-trust surface, not an action-taking surface (there is no primary CTA competing for attention the way there is on Accountability's contract creation or Groups & Pods' join flow), so green earns the hero role here without breaking the app-wide ratio, since the ratio is evaluated per-surface, not literally per-pixel across the whole app.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Score Hero fill arc | #34A853 (gradient to #2D9249) | forest-green (secondary) | Hero color for this screen — earned trust |
| Score Hero track | white at 8% | -- | Unfilled arc |
| Tier progression fill | #34A853 | forest-green (secondary) | Progress toward next tier |
| Tier "next tier" label | #34A853 at 80% | forest-green (secondary) | "Pillar" in transition label |
| Chart line/area | #34A853 | forest-green (secondary) | Score history trend |
| Chart area gradient | #34A853 at 28% → 0% | forest-green (secondary) | Top-to-bottom fade |
| Trend up | #34A853 | forest-green (secondary) | Positive delta |
| Trend down | #FF5E00 | orange (primary) | Negative delta — stays brand, not red |
| Breakdown bar fill | #34A853 | forest-green (secondary) | All 4 factor bars |
| Breakdown band — High | #34A853 at 15% bg | forest-green (secondary) | Public qualitative chip |
| Verified endorsement checkmark | #34A853 | forest-green (secondary) | Witness-verdict-sourced only |
| Explainer link | #FF5E00 | orange (primary) | "how reputation works" — only orange element on screen |
| Endorsement avatar placeholder | #34A853 | forest-green (secondary) | Initial-on-circle bg |
| Zero-data / honest-null state | white at 30-40% | -- | Never fabricated color, always neutral |
| Privacy notice icon | white at 30% | -- | Muted, informational |
| Tier Badge (Trusted+) | #34A853 at 15% bg | forest-green (secondary) | Reusable chip, cross-screen |
| Tier Badge (New/Rising) | white at 10% bg | -- | Not yet earned green highlight |
| Score Comparison Chip | white at 6% bg | -- | Neutral, non-competitive framing |
| Chart scrub tooltip bg | ink-900 at 95% | -- | Floating readout |
| Endorsement type badge (witness) | #34A853 at 15% bg | forest-green (secondary) | "witness verdict" |
| Endorsement type badge (direct) | white at 10% bg | -- | "direct endorsement" |
| Tier-up banner background | #34A853 at 10% | forest-green (secondary) | One-time session banner |
| Retry action text | #FF5E00 | orange (primary) | Error-state recovery link |
| Report endorsement link | #F44336 | error | Trust & safety exit hatch, Endorsement Detail Sheet |
| Primary text | #FFFFFF | white | Score number, names |
| Secondary text | white at 70% | -- | Tier label, endorsement description |
| Tertiary text | white at 50% | -- | Captions, remaining-points text |
| Quaternary text | white at 40% | -- | Eyebrows, dates, axis labels |

**60/30/10 verification**: This screen deliberately inverts the app-wide default ratio for its Growth Mode register — forest-green is the dominant hero color (gauge, chart, bars, tier progression, verified checkmarks) because Reputation is explicitly a growth/trust surface, matching the brand rule that "Forest Green signals growth and success" and the established convention that one hero color governs a surface. Burnt orange appears exactly once, on the "how reputation works" explainer link — a deliberate single accent tying the screen back to the app-wide navigation language without competing with green's dominance. Royal purple does not appear anywhere on this screen: reputation is a peer/community-verified signal, not an AI-generated one, so the SIA-only purple convention correctly excludes it here (consistent with Leaderboard [39]'s "no purple — user-driven social, not SIA-driven" rule). No red anywhere — negative trend uses orange, not red, to keep reputation dips from reading as errors or failures.

---

## Interaction States

### Score Hero
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Green fill arc at current value | -- |
| Loading | Track renders instantly; fill arc + center number skeleton-shimmer | -- |
| Zero-data | Unfilled track, "not enough data yet" caption replaces number | -- |
| Mount animation | Fill arc animates 0 → current value | -- (silent, visual only) |

### Trend Indicator
| State | Visual | Haptic |
|-------|--------|--------|
| Up | Green triangle + green text | -- |
| Down | Orange triangle + orange text | -- |
| Flat | White 40% dash + white 50% text | -- |
| No prior data | White 50% text, no icon | -- |

### Score History Chart
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Line/area rendered at full opacity | -- |
| Scrubbing | Vertical guideline + tooltip follows touch point, line dims to 60% elsewhere | light impact on scrub start |
| Range toggle active | Segmented pill fills orange... **no** — fills green (screen-specific override, see note below) | medium impact |
| Loading | Chart card shows skeleton wave shimmer in place of path | -- |
| Sparse data | Isolated point markers instead of connected line + caption | -- |

> **Segmented Control color override note**: On this screen only, the Time Range Toggle's active-segment fill uses forest-green (#34A853) instead of the app-wide default orange, to stay consistent with the single-hero-color rule for a Growth Mode surface. This is the same precedent as Screen 39's podium-gold exception — a documented, contained deviation, not a new default.

### Tier Progression Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Green fill at current position | -- |
| Top tier reached | Full green fill, "highest tier" copy | success notification (one-time, on first reaching Cornerstone) |
| Mount animation | Fill animates 0 → current position, 520ms ease-flow | -- |

### Breakdown Factor Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard bar + point value | -- |
| Pressed | Row bg white at 5%, inline detail expands | light impact |
| Not enough data | Bar replaced with dashed track + muted caption | -- |

### Endorsement Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard layout | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt green ring, offset 2pt | -- |
| Verified | Green checkmark visible | -- |

### Explainer Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange text + chevron | -- |
| Pressed | Orange at 70%, scale(0.98) | light impact |

### Tier Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default (Trusted+) | Green at 15% bg, green text | -- |
| Default (New/Rising) | White at 10% bg, white 70% text | -- |
| Pressed | scale(0.95), bg opacity +5% | light impact |
| Focus-visible | 2pt green ring, offset 2pt | -- |

### Score Comparison Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White 6% bg, white 60% text | -- |
| Pressed | Inline expansion opens below | light impact |
| Loading | Skeleton pill shimmer | -- |

### Chart Scrub Tooltip
| State | Visual | Haptic |
|-------|--------|--------|
| Hidden (default) | Not rendered | -- |
| Active (touch-down) | Fades in at touch point, 120ms | light impact on touch-down |
| Dragging | Follows finger, clamped to chart bounds | -- |
| Released | Fades out after 200ms delay | -- |

### Privacy Notice Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Muted card, informational tone | -- |
| Focus-visible | 2pt white 20% ring, offset 2pt | -- |

### Endorsement Detail Sheet Trigger
| State | Visual | Haptic |
|-------|--------|--------|
| Row long-press | Sheet slides up | medium impact |
| Row tap (witness-sourced) | Navigates directly to Contract Detail (bypasses detail sheet) | light impact |
| Row tap (direct) | Opens Limited Member Profile | light impact |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload score, history, breakdown, endorsements) |
| Scrub/pan | Score History Chart | Show date + score tooltip at touch point |
| Tap | Time range segment | Reload chart data for new range (280ms crossfade) |
| Tap | Breakdown factor row | Expand inline one-line detail |
| Tap | Endorsement row (witness-sourced) | Navigate to Contract Detail in Accountability [46] |
| Tap | Endorsement row (direct) | Open endorser's Limited Member Profile (bottom sheet) |
| Tap | "view all N endorsements" | Expand full endorsement list inline (no navigation) |
| Tap | Explainer link | Open How Reputation Works modal |
| Long-press | Endorsement row | Open Endorsement Detail Sheet |
| Tap | Tier Badge (elsewhere in app) | Navigate to that member's public Reputation screen |
| Tap | Score Comparison Chip | Expand inline comparison explainer |
| Tap | "manage privacy" (in modal) | Navigate to Settings [21] reputation section |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: Score Hero (0ms), Trend Indicator (120ms), Tier Progression (200ms), Score History (280ms), Breakdown Panel (360ms), Endorsement list (440ms, 80ms stagger per row) | 280ms each | ease-out-soft |
| Score Hero fill arc | Mount / data refresh | `stroke-dashoffset` animates from full track to current value | 720ms | ease-flow |
| Score Hero center number | Mount | Count-up from 0 to final value | 720ms | ease-flow |
| Tier progression bar | Mount / data refresh | Width animates 0 → current position within tier band | 520ms | ease-flow |
| Score History chart line | Time range change | Old path crossfades out, new path draws in (`stroke-dashoffset` reveal, left to right) | 520ms | ease-flow |
| Score History area fill | Time range change | Opacity crossfade | 280ms | ease-out-soft |
| Chart scrub tooltip | Touch move | Tooltip position follows finger with 1:1 tracking, guideline fades in | 120ms | ease-out-soft |
| Breakdown bars | Mount | Each bar width animates 0 → current value, 80ms stagger per factor | 520ms each | ease-flow |
| Trend indicator | Mount | Arrow icon subtle bounce (translateY 0→-3→0) once | 400ms | ease-flow |
| Endorsement row | New endorsement received | Row slides in from top of list (translateY -16→0, opacity 0→1) | 280ms | ease-out-soft |
| Tier-up celebration | Score crosses a tier threshold | Score Hero ring flashes green glow pulse (opacity 20%→60%→20%) + brief confetti-free "tier up" toast, cross-links to Celebration Overlay [42] pattern for major tier crossings only (New→Rising through Pillar→Cornerstone) | 800ms | ease-flow |
| Bottom sheet (How Reputation Works) | Open | Sheet slides up from bottom + backdrop fades in | 520ms | ease-flow |
| Bottom sheet | Dismiss | Sheet slides down + backdrop fades out | 280ms | ease-out-soft |
| Tier Badge | Tap (anywhere in app) | scale(0.95) then navigates | 120ms | ease-out-soft |
| Score Comparison Chip | Tap | Inline explainer height 0→auto + fade-in | 280ms | ease-out-soft |
| Endorsement Detail Sheet | Long-press trigger | Sheet slides up from bottom + backdrop fades in | 520ms | ease-flow |
| Retry state | Data resolves after retry | Error state crossfades to loaded content | 280ms | ease-out-soft |
| Zero-data Breakdown rows | Mount | Dashed placeholder tracks fade in with 80ms stagger per factor | 280ms each | ease-out-soft |
| Attributed-dip caption | Data resolves with source event | Caption fades in beneath Trend Indicator | 280ms | ease-out-soft |

**Reduced motion**: with `prefers-reduced-motion` enabled, the Score Hero fill arc and count-up number resolve instantly to their final state (no dashoffset sweep, no count-up), the tier-up celebration is replaced with a static green outline flash (no pulsing glow loop), and all crossfades shorten to 120ms with no translateY offset.

**Screen transition**:
- **Enter**: Standard stack push from Me Main [17] or a member profile sheet
- **Exit**: Stack pop

---

## Empty States

### Day 1 — Brand new account (no reputation history yet)
- Score Hero: Renders the zero-data variant — unfilled track, center text "not enough data yet" (15pt Switzer Medium 500, white at 50%) in place of a number, no tier label.
- Trend Indicator: Hidden entirely (nothing to compare against).
- Tier Progression: Shows "New → Rising" with an empty bar and caption "build your first 25 points to reach Rising. honor a commitment, join a pod, or help a partner to get started."
- Score History Chart: Replaced with a centered message. Icon: outlined line-chart glyph (40pt, white at 15%). Title: "your history starts today" — 16pt Cabinet Grotesk SemiBold 600, white. Body: "check back in a few weeks to see your first trend." — 14pt Switzer Regular 400, white at 50%.
- Breakdown Panel: All four factors show the "not enough data yet" sub-state with factor-specific guidance (e.g. consistency → "sign your first accountability contract to start building this").
- Endorsement List: Centered message. Icon: outlined handshake (40pt, white at 15%). Title: "no endorsements yet" — 16pt Cabinet Grotesk SemiBold 600, white. Body: "endorsements come from partners who witness your commitments or vouch for you directly." — 14pt Switzer Regular 400, white at 50%. CTA: "set up accountability" link, navigates to Accountability [46].

### Established user — one or more factors still at zero
- Affected Breakdown Panel rows individually show the "not enough data yet" state while populated factors render normally — never blocks the whole panel for a partial gap.

### Public view — member has restricted all sharing
- Score Hero: Still shown (the numeric score itself is always public per platform-wide reputation policy — only the *supporting detail* is privacy-controllable).
- Everything below Trend Indicator replaced with a single centered card: "this member keeps their reputation details private" — 15pt Switzer Regular 400, white at 50%, with a muted lock icon (32pt, white at 15%).

### Public view — member has zero endorsements
- Endorsement List section: "no public endorsements yet" — 14pt Switzer Regular 400, white at 40%, no CTA (this is another member's profile, not an actionable state for the viewer).

### Score dropped since last period (own view, honest framing)
- Trend Indicator shows the orange down state as normal — no special penalty styling elsewhere on the screen. The Breakdown Panel does not retroactively highlight "what went wrong" with red or warning colors; a dip is data, not a failure state, and the UI never moralizes it. If the dip coincides with a specific event the system can attribute (e.g. a disputed contract violation from Accountability [46] that resolved against the user), a single neutral-toned caption appears beneath the Trend Indicator: "reflects a resolved contract outcome on May 14" — factual, not judgmental, and links to the source.

### Just reached a new tier (own view, one-time)
- On the session where the score crosses a tier boundary, the Score Hero plays the tier-up celebration (see Motion table) once, and the Tier Progression Card temporarily shows a "you just reached Pillar!" banner (green background at 10%, 15pt Cabinet Grotesk SemiBold 600, white) for that session only, reverting to the standard threshold-progress framing on the next visit.

### Endorsement pending (witness verdict not yet resolved)
- If a witnessed contract is mid-review (Accountability [46] dispute flow in progress), the would-be Endorsement Row does not appear yet — endorsements only post once a verdict resolves. This keeps the "verified" checkmark meaningful; there is no "pending" ghost row that could be mistaken for a claim not yet earned.

### Network/data error loading breakdown or history
- Affected section (Score History or Breakdown Panel) shows an inline retry state: muted icon (32pt, white at 20%), "couldn't load this — [retry]" (14pt Switzer Regular 400, white at 50%, "retry" in orange, tappable). The Score Hero itself, if already cached from a prior load, remains visible rather than blanking the whole screen for a partial failure.

### Score Hero fails to load entirely (cold start, no cache)
- The gauge track renders immediately (it has no data dependency — it's a fixed SVG shape), but the fill arc and center content show the skeleton-shimmer Loading state indefinitely until data resolves or the request times out. On timeout (8s), the state degrades to the same inline retry pattern used elsewhere: "couldn't load your score — [retry]" replacing the center text, track remains visible so the screen never looks structurally broken.

### Endorsement source (witnessed contract) later deleted or disputed to reversal
- If a contract underlying a "verified" witness-verdict endorsement is later successfully disputed and reversed in Accountability [46], the corresponding Endorsement Row is removed on the next data refresh (not left as a stale "verified" claim), and the score recalculates on the next scheduled aggregation. No special in-UI messaging is shown for this edge case — it resolves silently and honestly, since surfacing "an endorsement was retracted" by name would itself be a minor trust-and-safety exposure for the endorser.

---

## Motivation Adaptation

- **Low motivation**:
  - Trend Indicator and Tier Progression lead with encouragement over metrics — "steady this month" framing is favored over exact deltas when the trend is flat or slightly down.
  - Breakdown Panel sub-captions shift to gentler, action-oriented language ("a small commitment could start building consistency" instead of a bare deficit statement).
  - Endorsement List is promoted above the Breakdown Panel when the user has recent endorsements, to lead with social proof rather than a number that may currently feel discouraging.
  - Score Comparison Chip is suppressed entirely in this mode — any relative framing, even the softened "building toward" language, is withheld until motivation recovers, per the same de-emphasis principle used on Leaderboard [39]'s low-motivation rank treatment.
- **Medium motivation**: Standard experience as described. Full detail, standard section order, Score Comparison Chip shown only if the user has opted into comparisons.
- **High motivation**:
  - Score History Chart defaults to "1Y" range instead of "3M" to show the fuller growth arc.
  - Breakdown Panel adds a small sparkline per factor showing its own 90-day trend.
  - Tier Progression adds a projected-date estimate ("at your current pace, ~3 weeks to Pillar") rendered as a dashed green-tinted projection marker on the Score History chart, reusing the "projected data" visual language from the Finance Spending Trend Chart pattern but recolored to green since this is a deterministic pace calculation, not an SIA/AI projection — purple would misattribute authorship.
  - Score Comparison Chip defaults to visible and expanded, showing both pod-scoped and platform-wide comparisons side by side.
  - Endorsement List defaults to "view all" expanded rather than truncated at 5 rows.

---

## Cross-References

- **Navigates to**: Contract Detail in Accountability [46] (via witness-verdict Endorsement Row tap), Limited Member Profile (bottom sheet, via direct-endorsement Endorsement Row tap), Groups & Pods [66] (via Breakdown Panel "community contribution" expansion link), Settings [21] reputation privacy section (via How Reputation Works modal "manage privacy" link), How Reputation Works (modal from Explainer Link)
- **Navigates from**: Screen [17] — Me Main (stack push via "reputation" row, own view), Screen [66] — Groups & Pods (via Limited Member Profile "view reputation" link, public view), Screen [39] — Leaderboard (via Limited User Profile, public view), Screen [46] — Accountability (via resolved witness verdict notification, own view deep-link), Screen [09] — SIA Chat (deep-link)
- **Shared components with**: Screen [46] — Accountability (witness-verdict source data, Contact Row visual grammar reused in Endorsement Row), Screen [66] — Groups & Pods (Limited Member Profile, "community contribution" data source from Pod Activity Feed), Screen [39] — Leaderboard (Limited User Profile, orange-not-red negative-delta convention, podium-style documented color-override precedent), Screen [30] — Finance Dashboard (Spending Trend Chart dual-line/projection concept, reinterpreted for the pace-projection motivation-adaptation variant), Screen [42] — Celebration & Achievement Overlay (tier-up crossing celebration cross-link), Screen [38] — Habits (Segmented Control base spec, color-overridden here)
- **Patterns used**: Back Button, 8-State Model, Segmented Control (Screen 38, color-overridden to green), Section Eyebrow Label (Screen 12), Modal Presentation (Batch 1), Person Row visual grammar (Screen 33, adapted for Endorsement Row), Limited User Profile (Screen 39)
- **Patterns established**: SVG Clay Radial Gauge (hand-specified arc gauge with dual-shadow SVG filter, dashoffset fill animation, honest-null zero-data variant — the reusable pattern for any future single-score hero on the platform), Pure-SVG Clay Area/Line Chart (monotone-cubic path, tier-band shading, scrub-tooltip interaction — reusable wherever a hand-styled trend chart is needed outside a chart-library dependency), Tier Progression Card (current→next tier label + threshold bar + points-remaining, tier ladder concept reusable for any leveling system beyond XP), Breakdown Panel (multi-factor contribution bars with per-factor honest-null sub-states, plus a qualitative-band public variant for precision-privacy), Endorsement Row (witness-verdict vs. direct-endorsement variants, verified checkmark convention), Endorsement Detail Sheet (full-context expansion for a single endorsement, reusable wherever a summarized social-proof row needs an untruncated view), Privacy Notice Card (muted, non-judgmental "this is private" replacement pattern for any public-profile section a member has restricted), Tier Badge (portable reusable chip for surfacing a member's tier outside the full Reputation screen — designed for Groups & Pods [66], Leaderboard [39], and Community [40] to adopt directly), Score Comparison Chip (opt-in, never-discouraging relative-context pattern — "building toward" framing instead of blunt below-average language), Chart Scrub Tooltip (clamped-drag point readout, reusable on any pure-SVG trend chart), Screen-Level Hero-Color Override (documented single-hero-color deviation from the app-wide orange default, precedented by Screen 39's podium exception), Zero-Data Layout State (a fully honest-null composition — no fabricated numbers, no misleading empty bars, every gap names its own unlock action — the reference implementation other screens should follow when introducing new scored/ranked surfaces)

**Data honesty contract**: every value rendered on this screen traces to one of exactly four real sources — Accountability [46] contract/trigger history (consistency), Groups & Pods [66] activity feed and partner interactions (community contribution), Goals [13]/[14] verification metadata (verified achievements), and Accountability [46] witness verdicts plus the endorsements table (peer endorsements). There is no fifth, synthetic "engagement" factor and no rounding-up of partial data to make a factor look populated before it has genuine signal — this is the same discipline applied to the Overview dashboard's honest-source-or-null rework, extended to the reputation domain.
