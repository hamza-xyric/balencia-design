# Screen Design: SIA Cognitive OS Dashboard

**Screen**: 69 of 69
**File**: 69-sia-cognitive-os.md
**Register**: Intelligence Mode (royal-purple #7F24FF primary throughout — the flagship SIA transparency surface)
**Primary action**: see everything SIA knows and has computed about you, in one place — the single screen that answers "what is my AI coach actually thinking?"
**Tab**: Dashboard-embedded (`CognitiveOperatingSystem` client tab/component) — surfaced as a hero entry point rather than nested navigation; reachable as its own dedicated destination from multiple entry points rather than living inside another screen's stack
**Navigation**: Stack depth 1 from Explore Section [18] via a "Cognitive OS" hero module card (visually distinct, larger than other Explore cards, royal-purple glow). Also reachable from Home Screen [12] via a proactive "your cognitive OS is ready" card (appears once daily-briefing data refreshes), from Intelligence Dashboard [48] via a "open full Cognitive OS" link at the bottom of that screen, and from SIA Chat [09] via deep-link when SIA references its own reasoning ("here's the full picture" rich card). Exit via back button to whichever entry point pushed it. Forward exits to Root Cause Explorer domain drill-downs (in-panel), Goal Detail [14] (from Life Operating Map leverage points), SIA Chat [09] (from any panel's "ask SIA" action), and Personal Wiki [20] / Wiki Neural Graph [68] (from Memory Explorer "view in wiki" action).

---

## Purpose

The SIA Cognitive OS Dashboard is the flagship transparency surface of the entire app — the one screen built to answer, completely and honestly, "what does SIA actually know, and what has it actually figured out?" It unifies six independent intelligence subsystems (Daily Briefing, Life Correlation Matrix, Root Cause reasoning, Ripple simulation, Future Self projection, and Memory/provenance) into a single first-screen dashboard. Each subsystem is its own API call, fetched in parallel via `Promise.allSettled` on the client — **the defining engineering constraint of this screen is that any single API can fail, time out, or return a degraded result without breaking the other five.** This is not an aspiration; it is the layout contract. Every panel ships with its own independent loading skeleton and its own independent error state, because in production, cross-pillar orchestration failures are real (see the platform's own audit history of partial-failure and fail-open bugs) and a dashboard that blanks out because one downstream service hiccupped is a trust failure, not a technical inconvenience.

Because this screen's entire reason to exist is honesty about what SIA knows versus what it has inferred, **provenance is a first-class visual language here, not an afterthought.** Every claim, score, and recommendation across all six panels carries a confidence/provenance badge: **measured** (forest-green — directly observed from a connected device or explicit user input), **derived** (royal-purple — computed or inferred by SIA from measured data), or **stale** (muted amber — was measured or derived once, but hasn't refreshed recently enough to trust at face value). This is the visible surface of the platform's Provenance v2 honesty layer, and it must read identically across all six panels so a user builds one mental model for "how sure is SIA about this" rather than six.

**On the `Promise.allSettled` contract specifically**: the client fires all 6 panel requests concurrently on mount (and again on manual refresh), each against its own endpoint, each with its own per-panel timeout budget (Briefing and Life Operating Map ~8s hard timeout given they're expected to be fast/cached; Root Cause Explorer, Ripple Simulator, and Future Self Timeline ~20s hard timeout given they involve heavier reasoning calls). Each settled result — `fulfilled` or `rejected` — is applied to that panel's own local render state independently; there is no shared "all or nothing" loading gate at the screen level, and no panel ever waits on another panel's result. On manual refresh, each panel keeps rendering its last-known-good content (stale-while-revalidate) until its own new result resolves, rather than clearing to a blank/skeleton state — the only exception is the very first mount, where all 6 panels start from the Panel Loading Skeleton simultaneously since there is no prior data to hold onto.

**API contract summary** (the 6 independent `Promise.allSettled` targets):

| # | Panel | Endpoint | Method | Key response fields |
|---|-------|----------|--------|---------------------|
| 1 | Executive Daily Briefing | `/api/v1/cognitive-os/briefing` | GET | `energyForecast`, `topRisk`, `topOpportunity`, `accountabilityStatus`, `workoutReadiness`, `recovery`, `goalDrift`, `predictionReliability`, `recommendedActions[]` — each field wrapped with its own `provenance` |
| 2 | Life Operating Map | `/api/v1/lcm/map` | GET | `nodes[10]` (core + 9 domains), `topRelationships[3-4]`, `leveragePoint` |
| 3 | Root Cause Explorer | `/api/v1/cognitive-os/root-cause?domain=` | GET | `question`, `upstream[]`, `downstream[]`, each item with `provenance` + `strength` |
| 4 | Ripple Simulator | `/api/v1/cognitive-os/ripple-simulate` | POST `{domain, delta}` | `rankedEffects[]` with `metric`, `direction`, `magnitude`, `confidence` |
| 5 | Future Self Timeline | `/api/v1/cognitive-os/future-self?horizon=` | GET | `trajectorySummary`, `milestones[]` with `date`, `confidence`, `onPace` |
| 6 | Memory Explorer | `/api/v1/cognitive-os/memory?limit=5` | GET | `memories[]` with `statement`, `provenance`, `sourceList`, `lastConfirmedAt` |

Every field that renders with a Provenance Badge carries its `provenance` value directly in the API response — the client never infers provenance client-side; it is always server-declared, keeping the honesty contract enforced at the source of truth rather than reconstructed in the UI layer.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. **Executive Daily Briefing** — top of screen, the "morning briefing" digest. Highest priority; the screen's reason to open today.
2. **Life Operating Map** — compact 10-node visual summary of the Life Correlation Matrix (LCM), current signal per life domain.
3. **Root Cause Explorer** — per-domain "why is X happening" reasoning card, with a domain selector.
4. **Ripple Simulator** — interactive "what-if" control, domain + delta slider, live-updating projected effects.
5. **Future Self Timeline** — 7/30/90/365-day trajectory projection, horizontal milestone timeline.
6. **Memory Explorer** — inspectable, editable list of what SIA remembers, each item with confidence + provenance + an edit/correct action.

Panels 2-6 are independently collapsible sections below the fixed Briefing hero; each loads, errors, and refreshes on its own timeline, matching its own API's latency characteristics (Briefing and Life Operating Map are typically fast/cached; Root Cause and Ripple Simulator involve heavier reasoning calls and are expected to take longer).

**User flow**:
- **Arrives from**: Explore Section [18] via "Cognitive OS" hero module card (stack push), Home Screen [12] via proactive "cognitive OS ready" card (stack push), Intelligence Dashboard [48] via "open full Cognitive OS" link (stack push), SIA Chat [09] via deep-link (stack push with context)
- **Primary exit**: Back to Explore [18] (stack pop) or whichever screen pushed this one
- **Secondary exits**: SIA Chat [09] via any panel's "ask SIA" action (tab switch with panel context), Goal Detail [14] via Life Operating Map leverage-point tap (stack push), Personal Wiki [20] / Wiki Neural Graph [68] via Memory Explorer "view in wiki" action (tab switch), per-domain drill-down within Root Cause Explorer (in-panel state change, no navigation)

---

## Layout — State A: Full Loaded (desktop, all 6 panels succeed)

**Scroll behavior**: ScrollView (content is long — six substantial panels; Executive Daily Briefing is the only panel that could be considered for sticky/pinned treatment, but remains in-flow to keep the screen a single honest scroll rather than a pinned-hero trick)
**Tab bar visible**: Yes

### ASCII Wireframe — Full Loaded

```
┌─────────────────────────────────────────────────────────────┐
│                   Status Bar (44pt)                          │
├─────────────────────────────────────────────────────────────┤
│  ← [back]   "Cognitive OS"                    [refresh ⟳]   │  ← Header (44pt, purple
│  ══════════════════════════════════════════════════════     │     accent line, 3pt)
├─────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ ☀ GOOD MORNING BRIEFING              updated 6:02am    │  │  ← Executive Daily
│  │                                                          │  │    Briefing (hero,
│  │  Energy forecast: ▓▓▓▓▓▓▓▓░░ 78%  [derived·purple]     │  │    ~340pt)
│  │  Top risk: sleep debt trending down 3 nights [measured] │  │
│  │  Top opportunity: workout window 6-8am open  [derived]  │  │
│  │  Accountability: 2 contracts on track          [measured]│  │
│  │  Workout readiness: moderate — go easy today   [derived] │  │
│  │  Recovery: HRV +4% vs baseline                 [measured]│  │
│  │  Goal drift: "save $500" behind pace 2 weeks    [derived]│  │
│  │  Prediction reliability: 82% (last 30 days)     [measured]│ │
│  │                                                          │  │
│  │  RECOMMENDED TODAY                                       │  │
│  │  1. Move workout to 7am window                           │  │
│  │  2. Reduce evening screens — protect recovery             │  │
│  │  3. Review "save $500" goal pacing                        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                                │
│  LIFE OPERATING MAP                                    [full →]│ ← Eyebrow + link
│  ┌───────────────────────────────────────────────────────┐  │
│  │        career ●───────● relationships                   │  │  ← Life Operating
│  │          │      ╲   ╱      │                             │  │    Map (mini LCM,
│  │      finance ●────●SIA●────● fitness                     │  │    ~260pt)
│  │          │      ╱   ╲      │                             │  │
│  │     spirituality●───────●nutrition                        │  │
│  │  leverage point: sleep → 4 downstream domains             │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                                │
│  ROOT CAUSE EXPLORER                                          │  ← Eyebrow
│  ┌───────────────────────────────────────────────────────┐  │
│  │ [fitness▾]  "why is your energy dropping midweek?"      │  │  ← Root Cause card
│  │                                                          │  │    (~220pt)
│  │  UPSTREAM CAUSES              DOWNSTREAM RIPPLE          │  │
│  │  ↑ sleep -40min (Tue-Thu) [m]  ↓ workout intensity [d]   │  │
│  │  ↑ late meetings 3x/wk [m]     ↓ mood self-report [d]    │  │
│  │                                 ↓ next-week goal pace [d]│  │
│  └───────────────────────────────────────────────────────┘  │
│                                                                │
│  RIPPLE SIMULATOR                                             │  ← Eyebrow
│  ┌───────────────────────────────────────────────────────┐  │
│  │ if [sleep ▾] changes by  ──●──────────  +45 min          │  │  ← What-if control
│  │                                                          │  │    (~200pt)
│  │  PROJECTED EFFECTS (ranked)                               │  │
│  │  1. energy       ▲ +12%          [derived]                │  │
│  │  2. workout perf ▲ +8%           [derived]                │  │
│  │  3. mood          ▲ +6%           [derived]                │  │
│  │  4. spending      ▼ -3%           [derived, low conf.]     │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                                │
│  FUTURE SELF TIMELINE                                          │ ← Eyebrow
│  ┌───────────────────────────────────────────────────────┐  │
│  │ [7d] [30d] [90d] [365d]                                  │  │  ← Timeline (~180pt)
│  │  ●───────●───────◆───────────────●                       │  │
│  │  today   +7d   milestone:      +90d                      │  │
│  │                fitness goal                                │  │
│  │                on pace                                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                                │
│  MEMORY EXPLORER                                        [all →]│ ← Eyebrow + link
│  ┌───────────────────────────────────────────────────────┐  │
│  │ "You're a morning person"        [measured] [edit]        │  │  ← Memory row
│  │ "Prefers strength over cardio"   [derived]  [edit]        │  │    (~64pt each)
│  │ "Stress rating: low" (self-rpt)  [stale]    [refresh]     │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                                │
├─────────────────────────────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me                               │  ← Tab Bar
├─────────────────────────────────────────────────────────────┤
│                 Home Indicator (34pt)                          │
└─────────────────────────────────────────────────────────────┘
```

### Component Stack — Full Loaded (top to bottom)

1. **Cognitive OS Header** — 44pt + 3pt purple accent line
   - Purpose: Title, back navigation, manual refresh
   - Content: Back chevron + "Cognitive OS" + refresh icon (re-triggers all 6 `Promise.allSettled` calls)

2. **Executive Daily Briefing** — ~340pt hero card
   - Purpose: Dense morning-digest synthesis across all subsystems
   - Content: Energy forecast, top risk/opportunity, accountability status, workout readiness, recovery, goal drift, prediction reliability, recommended actions — each line carrying a provenance badge

3. **Life Operating Map** — ~260pt
   - Purpose: Compact visual summary of the 10-node LCM, current signal per domain, leverage points
   - Content: Mini radial node diagram + leverage-point callout + "full" link to the dedicated Life Matrix tab

4. **Root Cause Explorer** — ~220pt (variable with content)
   - Purpose: Per-domain causal reasoning — upstream causes, downstream ripple forecast
   - Content: Domain selector, question framing, two-column upstream/downstream lists with provenance badges

5. **Ripple Simulator** — ~200pt
   - Purpose: Interactive what-if projection
   - Content: Domain selector + delta slider, ranked list of projected downstream effects

6. **Future Self Timeline** — ~180pt
   - Purpose: Trajectory projection across time horizons
   - Content: Horizon selector (7/30/90/365d), horizontal timeline with milestone markers

7. **Memory Explorer** — variable, ~64pt per visible row (preview of ~3-5 rows, "all" link to full list)
   - Purpose: Inspectable/editable memory list with provenance
   - Content: Memory statement rows, each with confidence badge + edit/correct/refresh action

8. **Bottom padding** — 64pt (clears tab bar)
9. **Bottom Tab Bar** — 56pt

---

## Layout — State B: Partial Degradation (mobile, graceful failure in action)

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes

This is the state that proves the screen's core engineering promise: **one API failing never blanks the screen.** In this illustrative case, Root Cause Explorer's reasoning call has errored, Future Self Timeline is still loading past its expected window, and the other four panels have loaded successfully — each rendered independently, each unaware of the others' state.

### ASCII Wireframe — Partial Degradation

```
┌───────────────────────────────────┐
│      Status Bar (44pt)            │
├───────────────────────────────────┤
│  ← "Cognitive OS"      [⟳]        │  ← Header
│  ══════════════════════════       │
├───────────────────────────────────┤
│ ┌───────────────────────────────┐ │
│ │ ☀ BRIEFING      updated 6:02am │ │  ← Loaded successfully
│ │ Energy: 78%       [derived]    │ │
│ │ Top risk: sleep debt [measured]│ │
│ │ ...(full content)...           │ │
│ └───────────────────────────────┘ │
│                                     │
│ LIFE OPERATING MAP          [full→]│  ← Loaded successfully
│ ┌───────────────────────────────┐ │
│ │    (mini LCM diagram)          │ │
│ └───────────────────────────────┘ │
│                                     │
│ ROOT CAUSE EXPLORER                │  ← ERRORED — isolated
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │    failure, own retry,
│ │ ⚠ couldn't reach reasoning     │ │    everything else on
│ │   engine right now              │ │    the screen unaffected
│ │   [retry]                       │ │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
│                                     │
│ RIPPLE SIMULATOR                   │  ← Loaded successfully
│ ┌───────────────────────────────┐ │
│ │ if [sleep▾] changes by ──●──── │ │
│ │ 1. energy      ▲+12% [derived] │ │
│ └───────────────────────────────┘ │
│                                     │
│ FUTURE SELF TIMELINE               │  ← STILL LOADING —
│ ┌ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┐ │    past 6s, extended
│ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ │    skeleton state with
│ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ │    reassurance copy
│ │ still crunching your trajectory│ │    ("still crunching")
│ └ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┘ │
│                                     │
│ MEMORY EXPLORER               [all→]│ ← Loaded successfully
│ ┌───────────────────────────────┐ │
│ │ "Morning person"    [measured] │ │
│ │ "Stress: low"        [stale]   │ │
│ └───────────────────────────────┘ │
├───────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├───────────────────────────────────┤
│      Home Indicator (34pt)        │
└───────────────────────────────────┘
```

### Component Stack — Partial Degradation (delta from State A)

- Each of the 6 panels renders from its own `Promise.allSettled` result slot independently — a `fulfilled` panel renders normally, a `rejected` panel renders its **Panel Error State** (see Components), and a panel still in flight past a per-panel expected-latency threshold renders an **Extended Loading State** with reassurance copy rather than an indefinite spinner.
- No panel's failure removes, shifts the layout of, or blocks interaction with any other panel — scroll position, other panels' data, and other panels' interactive controls (slider, domain selector, edit actions) remain fully live.
- The Header's refresh icon retries **all six** calls; each panel's own inline "retry" retries **only that panel's** call — both paths are always available.

## Layout — State C: Day 1 First-Run (minimal history, honest-empty panels)

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes

Documented as its own state because Day 1 is not simply "State A with smaller numbers" — several panels swap their entire content shape for an honest-empty explainer rather than rendering a briefing with mostly blank rows. This state is the clearest test of the "honest-null over fabricated value" principle this screen is built around.

### ASCII Wireframe — Day 1 First-Run

```
┌─────────────────────────────────────┐
│        Status Bar (44pt)             │
├─────────────────────────────────────┤
│  ← "Cognitive OS"          [⟳]       │
│  ══════════════════════════════      │
├─────────────────────────────────────┤
│ ┌───────────────────────────────┐   │
│ │ ☀ BRIEFING                     │   │  ← Mostly honest-null,
│ │                                 │   │    single explainer
│ │  SIA needs a few days of       │   │    replaces the usual
│ │  data before your first        │   │    8-row layout
│ │  full briefing.                │   │
│ │                                 │   │
│ │  Accountability: 1 contract     │   │  ← the one row that
│ │  active                [measured]│  │    CAN resolve today
│ │  check back tomorrow            │   │    still renders
│ └───────────────────────────────┘   │
│                                       │
│ LIFE OPERATING MAP                   │
│ ┌───────────────────────────────┐   │
│ │   (10 nodes, all connecting     │   │  ← structure visible,
│ │    lines near-invisible)        │   │    no relationships
│ │  SIA is still mapping the       │   │    discovered yet
│ │  connections between your       │   │
│ │  life areas.                     │   │
│ └───────────────────────────────┘   │
│                                       │
│ ROOT CAUSE EXPLORER                  │
│ ┌───────────────────────────────┐   │
│ │ [fitness▾]                      │   │
│ │  not enough history yet to      │   │
│ │  explain what's driving your    │   │
│ │  numbers. this fills in as       │   │
│ │  you use Balencia.               │   │
│ └───────────────────────────────┘   │
│                                       │
│ RIPPLE SIMULATOR                     │
│ ┌───────────────────────────────┐   │
│ │ if [sleep▾] changes by ──●──── │   │  ← fully interactive,
│ │ 1. energy  ▲+9%  [low conf.]    │   │    from population
│ │  these get sharper the more     │   │    priors, labeled
│ │  SIA learns about you.          │   │    low-confidence
│ └───────────────────────────────┘   │
│                                       │
│ FUTURE SELF TIMELINE                 │
│ ┌───────────────────────────────┐   │
│ │ [7d][30d][90d][365d]            │   │  ← flat trend, no
│ │  ────────────────────           │   │    milestones (no
│ │  set a goal to see your         │   │    active goals)
│ │  projected path here.            │   │
│ └───────────────────────────────┘   │
│                                       │
│ MEMORY EXPLORER                [all→]│
│ ┌───────────────────────────────┐   │
│ │ "Interested in fitness, sleep"  │   │  ← 2-3 onboarding-
│ │                        [measured]│  │    seeded entries
│ │  this grows every time you       │   │
│ │  talk with SIA.                  │   │
│ └───────────────────────────────┘   │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me     │
├─────────────────────────────────────┤
│      Home Indicator (34pt)          │
└─────────────────────────────────────┘
```

### Component Stack — Day 1 First-Run (delta from State A)

- **Executive Daily Briefing** swaps its 8-row layout for a single centered explainer + whichever individual rows genuinely can resolve on day one (rare — typically only accountability status if the user set up a contract during onboarding)
- **Life Operating Map** renders full node structure (the 10-point layout itself is static/structural, not data-dependent) but all relationship lines are suppressed since no correlations have been discovered
- **Root Cause Explorer**, **Ripple Simulator**, and **Future Self Timeline** each render their respective empty-state copy as described in the Empty States section below, while remaining structurally present and, in the Ripple Simulator's case, still genuinely interactive
- **Memory Explorer** shows the 2-3 onboarding-seeded entries rather than a bare empty list — the wiki is never truly at zero, since onboarding itself writes the first entries

---

## Components

### Cognitive OS Header
- **Purpose**: Title, back navigation, and a global manual refresh that re-triggers the full `Promise.allSettled` fan-out
- **Data source**: Static title; refresh triggers all 6 panel APIs
- **Visual treatment**: ink-900 background, 44pt height, 3pt royal-purple (#7F24FF) accent line beneath (the Intelligence Mode signature, matching Screen [48]'s header treatment). Back chevron left. Title center: "Cognitive OS" — 17pt Cabinet Grotesk Bold, white. Refresh icon (circular-arrows, 18pt, white at 60%) right-aligned, 44x44pt touch target.
- **Content**: Back chevron, title, refresh icon
- **Variants**: Default, Refreshing (icon rotates continuously while any of the 6 calls are in flight)
- **Gestures**: Tap back → stack pop. Tap refresh → re-fire all 6 panel fetches independently (each panel returns to its own loading state without affecting the others' currently-displayed data until its own fetch resolves — stale-while-revalidate, not blank-while-revalidate)
- **Size**: Full-width x 44pt + 3pt accent line

### Executive Daily Briefing
- **Purpose**: The dense "morning briefing" digest — the single highest-value synthesis on the screen, structured like a status report rather than a chat message
- **Data source**: API — `GET /api/v1/cognitive-os/briefing`
- **Visual treatment**: ink-brown-800 glassmorphism hero card, --r-2xl (40pt), 32pt padding, 1pt royal-purple-at-15% border, subtle `--glow-purple` at very low intensity (0 0 40pt rgba(127,36,255,0.12)) behind the card to mark it as the screen's hero without overpowering. Sun/morning icon (20pt, orange) + "GOOD MORNING BRIEFING" eyebrow (12pt Cabinet Grotesk SemiBold, white at 60%, uppercase, +0.12em tracking) + "updated 6:02am" timestamp (12pt Switzer Regular, white at 40%, right-aligned on the same row).
- **Content** (each line is a labeled data row: icon + label + value + Provenance Badge, 12pt vertical gap between rows):
  - Energy forecast: mini horizontal bar (8pt tall, --r-pill, orange fill) + percentage — derived
  - Top risk: one-line flagged concern — measured or derived depending on source
  - Top opportunity: one-line surfaced opening — derived
  - Accountability status: contract/streak summary — measured (cross-references Screen [46])
  - Workout readiness: qualitative + short reasoning — derived
  - Recovery: HRV/RHR delta vs baseline — measured (when wearable connected) or honest-null if not
  - Goal drift: named goal + pace delta — derived
  - Prediction reliability: rolling accuracy percentage — measured (SIA's own track record, self-reported honestly)
  - Divider (1pt white at 8%)
  - "RECOMMENDED TODAY" sub-eyebrow (11pt Cabinet Grotesk SemiBold, white at 50%, uppercase) + numbered list (1-3 items, 14pt Switzer Medium, white, each with a small orange numeral chip)
- **Variants**: Full (all 8 rows resolve with real data), Partial (some rows honest-null — e.g. "recovery: connect a wearable to see this" in white at 40% italic, rather than fabricating a value), Loading (see Panel Loading Skeleton below), Error (see Panel Error State below)
- **Gestures**: Tap any data row → opens a brief inline explainer tooltip (source + calculation summary) or deep-links to the relevant domain dashboard (e.g., tapping "recovery" → Fitness Dashboard [26]). Tap a recommended-action item → deep-links to the relevant action surface (goal, workout, contract). Long-press briefing card → "ask SIA to explain this briefing" (tab switch to SIA Chat [09] with full briefing context).
- **Size**: Full-width minus 32pt x ~340pt (variable with content, honest-null rows are shorter)

### Life Operating Map
- **Purpose**: A compact, lightweight visual summary of the 10-node Life Correlation Matrix — enough to orient at a glance without duplicating the full detail that lives in the dedicated Life Matrix tab
- **Data source**: API — `GET /api/v1/lcm/map` (summary projection; the full interactive matrix with all edge weights lives elsewhere and is intentionally not reproduced here in full detail)
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 24pt padding. A small radial diagram (not a full force-directed graph — a fixed, lightweight 10-point layout: SIA center node + 9 domain nodes arranged in a ring, matching the same 9 domain colors used app-wide) rendered as static SVG/canvas (not the full interactive Neural Graph engine from Screen [68] — this is deliberately a summary, not a second full graph implementation). Connecting lines between domains show only the top 3-4 strongest current relationships (not all 45 possible pairs), each line weight proportional to strength.
- **Content**: Section eyebrow "LIFE OPERATING MAP" + "full →" link (top-right, 13pt Cabinet Grotesk SemiBold, orange). Mini diagram (~180pt tall). Below diagram: "leverage point: sleep → 4 downstream domains" — 13pt Switzer Medium, white at 70%, with a small royal-purple dot prefix indicating this is SIA's derived insight, not raw data.
- **Variants**: Full (diagram + leverage point), Loading (skeleton — dimmed static ring outline, no data lines), Error (see Panel Error State)
- **Gestures**: Tap "full →" → deep-link to the dedicated Life Matrix tab (full interactive version, out of scope for this screen). Tap a domain node in the mini diagram → jumps to that domain's row in the Root Cause Explorer's domain selector below, scrolled into view. Tap leverage-point callout → expands one level to show which 4 domains, inline, without leaving this panel.
- **Size**: Full-width minus 32pt x ~260pt

### Root Cause Explorer
- **Purpose**: Per-domain causal reasoning — the "why" behind a signal, split into upstream causes (what's driving this) and downstream ripple forecast (what this will affect if unaddressed)
- **Data source**: API — `GET /api/v1/cognitive-os/root-cause?domain={domain}`, re-fetched on domain selector change
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 24pt padding. Domain selector (compact dropdown pill, 32pt tall, domain-color-coded when a domain is selected) top-left. Framed question below: "why is your energy dropping midweek?" — 15pt Cabinet Grotesk SemiBold, white (SIA phrases the current top finding as a natural-language question, then answers it in the two columns below). Two-column layout (stacks to single column under ~420pt width): "UPSTREAM CAUSES" (left) and "DOWNSTREAM RIPPLE" (right), each a vertical list of short causal statements with a directional arrow icon (↑ for a rising factor, ↓ for a projected decline) and a Provenance Badge per line.
- **Content**: Domain selector, framed question, upstream list (typically 2-4 items), downstream list (typically 2-4 items), each item ≤1 line, 13pt Switzer Regular, white at 80%
- **Variants**: Loaded (as above), Domain-switching (brief 160ms crossfade while re-fetching for the new domain, previous content stays dimmed at 40% rather than disappearing), No clear cause found ("SIA doesn't see a clear driver for this yet — check back as more data comes in," honest-null framing rather than a forced answer), Loading (skeleton), Error (see Panel Error State)
- **Gestures**: Tap domain selector → opens a compact picker (9 domains + "auto: SIA's top concern" default option). Tap any upstream/downstream item → deep-links to the relevant domain dashboard or opens an inline one-line "why SIA thinks this" tooltip. Tap the framed question → "ask SIA to go deeper" (tab switch to SIA Chat [09] with root-cause context).
- **Size**: Full-width minus 32pt x ~220pt (variable with list length)

### Ripple Simulator
- **Purpose**: An interactive "what-if" tool — lets the user drag a delta on one domain and see SIA's live-updating projection of ranked downstream effects, making the cross-domain model tangible and explorable rather than just narrated
- **Data source**: API — `POST /api/v1/cognitive-os/ripple-simulate` `{ domain, delta }`, debounced ~200ms during slider drag, called on release for the authoritative result (an optimistic lightweight client-side interpolation renders during the drag itself so the UI never feels laggy, replaced by the real server projection on settle)
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 24pt padding. Control row: "if [domain ▾] changes by" (14pt Switzer Regular, white at 70%) + a horizontal slider (track 4pt, --r-pill, white at 10%; filled portion royal-purple; handle 20pt circle, royal-purple fill, white ring, `--shadow-1`) + live value readout ("+45 min", 14pt Cabinet Grotesk SemiBold, white, right-aligned). Below: "PROJECTED EFFECTS (ranked)" sub-eyebrow, then a ranked list (typically top 4-5) of affected domains/metrics, each row: rank numeral + domain/metric name + directional delta (▲/▼ + percentage, forest-green for positive projected effects, orange for negative) + Provenance Badge (always "derived" — simulation output is inference by definition, never measured).
- **Content**: Domain selector (reuses the same picker component as Root Cause Explorer), slider + live readout, ranked effects list
- **Variants**: Idle (default domain + delta = 0, effects list empty with prompt "move the slider to see SIA's projection"), Dragging (optimistic client-side interpolated preview, subtle "estimating..." microcopy), Settled (authoritative server projection rendered), Low-confidence projection (an effect row shows a muted "low confidence" sub-label when the underlying correlation strength is weak — honesty extends to the simulator's own certainty about itself), Loading (initial panel skeleton), Error (see Panel Error State)
- **Gestures**: Tap domain selector → change the simulated domain. Drag slider → live client-side interpolated preview; on release, authoritative server call fires and the list settles into place with a brief cross-fade from estimate to confirmed values. Tap a ranked effect row → deep-links to that domain/metric's dashboard.
- **Size**: Full-width minus 32pt x ~200pt (variable with ranked list length)

### Future Self Timeline
- **Purpose**: A trajectory projection across time horizons — where SIA thinks the user is headed on their current path, with milestone markers for goals in flight
- **Data source**: API — `GET /api/v1/cognitive-os/future-self?horizon={7d|30d|90d|365d}`, re-fetched on horizon change
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 24pt padding. Horizon selector: 4-segment pill control (7d / 30d / 90d / 365d), identical mechanics to the Segmented Control pattern (Screen 38), royal-purple active fill instead of orange (Intelligence Mode override, matching this screen's register). Below: a horizontal timeline track (2pt line, white at 15%) spanning the card width, with position markers: a filled circle at "today" (8pt, white), open circles at regular intervals, and diamond markers (10pt, royal-purple fill) at predicted goal-milestone points, each with a short label below ("fitness goal on pace").
- **Content**: Horizon selector, timeline track with markers, milestone labels (12pt Switzer Medium, white at 70%, below each diamond marker), a one-line trajectory summary above the track: "at your current pace, you'll hit 3 of 4 active goals by [date]" — 14pt Switzer Regular, white at 80%, with a Provenance Badge (always "derived")
- **Variants**: Each horizon (7/30/90/365d — content and marker density scale with horizon length), No active goals (timeline still renders showing general trajectory trend lines for top domains, without milestone diamonds — honest framing: "no active goals to project against yet — set one to see milestones here"), Loading (skeleton), Error (see Panel Error State), Extended loading (past expected latency — see Panel Extended Loading State)
- **Gestures**: Tap horizon segment → switch projection window (crossfade timeline content, 280ms). Tap a milestone diamond → opens a brief inline callout with the projected date + confidence, with a "view goal" link to Goal Detail [14]. Drag along the timeline track (desktop: click-drag; mobile: horizontal swipe within the card) → scrubs a "you are here" indicator along the projection for exploratory browsing, non-committal (doesn't change the horizon selector).
- **Size**: Full-width minus 32pt x ~180pt

### Memory Explorer
- **Purpose**: An inspectable, editable surface for what SIA remembers — the Cognitive OS's own compact entry point into the same underlying memory data as the full Personal Wiki [20] and Wiki Neural Graph [68], scoped here to a short, high-signal preview with the provenance/confidence system front and center
- **Data source**: API — `GET /api/v1/cognitive-os/memory?limit=5` (a small curated/recent slice; the full browsable set lives on Screen [20])
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 24pt padding. Section eyebrow "MEMORY EXPLORER" + "all →" link (top-right, orange, deep-links to Personal Wiki [20] Knowledge tab). Rows below, each ~64pt: memory statement in quotes (14pt Switzer Regular, white, single line with ellipsis truncation) + Provenance Badge (right-aligned) + a contextual action link beneath the statement (13pt Cabinet Grotesk SemiBold): "edit" (orange, for measured/derived entries the user can correct) or "refresh" (amber #F59E0B, for stale entries — triggers SIA to re-evaluate that memory against current data rather than a manual text edit).
- **Content**: Up to 5 memory rows, "all →" link
- **Variants**: Loaded (as above), Empty (rare — "SIA hasn't recorded anything new recently" with a link straight to the full wiki), Loading (skeleton), Error (see Panel Error State)
- **Gestures**: Tap "all →" → tab switch to Personal Wiki [20] Knowledge chapter. Tap a memory row → opens the same Entry Detail treatment as Screen [20] (inline expand or lightweight sheet, showing full content + source list). Tap "edit" → same inline edit mode as Screen [20]'s Entry Card. Tap "refresh" (stale items only) → triggers a re-evaluation request, row shows a brief inline spinner, then updates its provenance badge to "measured" or "derived" once SIA confirms current status, or stays "stale" with a toast if re-evaluation still can't confirm it.
- **Size**: Full-width minus 32pt x ~64pt per row (5 rows visible + eyebrow ≈ 356pt)

### Domain Selector Picker
- **Purpose**: The shared domain-selection control reused identically by Root Cause Explorer and Ripple Simulator — one component, one mental model, rather than two subtly different dropdowns.
- **Data source**: Static list of the 9 app-wide domains, intersected with domains that have sufficient data to be meaningfully selected (domains with near-zero history still appear but are visually marked as low-data)
- **Visual treatment**: Trigger is a compact pill (32pt tall, domain-color-coded border and text once a domain is selected, neutral white-at-60% when on the "auto" default), 12pt horizontal padding, small chevron-down (10pt) right of the label. Tapping opens a popover: 9 domain rows + a 10th "auto: SIA's top concern" option pinned at the top, each row 40pt tall with a domain-color dot (8pt) + name (14pt Switzer Medium, white) + optional "low data" tag (10pt Cabinet Grotesk SemiBold, white at 40%, right-aligned) for domains with insufficient history.
- **Content**: Trigger pill, popover with 10 rows (9 domains + auto)
- **Variants**: Auto-selected (default on first visit — SIA picks its current top concern), Manually selected (user has explicitly chosen a domain, persists across panel refreshes within the session), Low-data domain selected (panel content includes a small disclaimer: "limited history for this domain — results may be less precise")
- **Gestures**: Tap trigger → opens popover. Tap a row → selects that domain, closes popover, dependent panel content cross-fades to the new domain's data. Tap outside popover → dismiss without changing selection.
- **Size**: Trigger ~110pt wide x 32pt; popover 220pt wide x auto (10 rows x 40pt + padding)

### Provenance Badge
- **Purpose**: The shared visual language that makes SIA's honesty legible at a glance, used identically across all six panels — this is the pattern this entire screen exists to establish and enforce consistently.
- **Data source**: Every API response across all 6 panel endpoints includes a `provenance` field per data point: `"measured" | "derived" | "stale"`
- **Visual treatment**: Small pill, 18pt tall, --r-pill, 8pt horizontal padding, 10pt Cabinet Grotesk SemiBold text, uppercase, +0.06em tracking. Always paired with a small dot icon (6pt) matching the badge color, positioned inside the pill to the left of the text so the signal is readable even color-blind-adjacent at a glance via the icon shape difference described below:
  - **Measured**: forest-green (#34A853) at 15% bg, forest-green text, filled-circle dot icon — "directly observed: a connected device reading or your own explicit input"
  - **Derived**: royal-purple (#7F24FF) at 15% bg, royal-purple text, filled-diamond dot icon — "SIA computed or inferred this from measured data"
  - **Stale**: muted amber (#F59E0B) at 15% bg, amber text, filled-triangle dot icon (a soft warning shape, not alarm-red) — "was measured or derived once, but hasn't refreshed recently enough to fully trust"
- **Content**: "MEASURED" / "DERIVED" / "STALE" — exact copy never varies, ensuring users learn the three states once and recognize them everywhere on the screen (and, per this screen's precedent, ideally everywhere in the app)
- **Variants**: The three states above, plus a rare **Honest-null** non-badge state: when a data point simply doesn't exist yet (e.g., no wearable connected), no badge renders at all — instead the value itself renders in white-at-40% italic with explanatory copy ("connect a wearable to see this") rather than a badge implying data exists when it doesn't
- **Gestures**: Tap any badge → opens a one-line tooltip explaining that specific data point's exact source (e.g., "measured — WHOOP, synced 12 minutes ago" or "derived — computed from 14 days of sleep + workout logs")
- **Size**: Auto-width (~64-84pt depending on label) x 18pt

### Panel Loading Skeleton
- **Purpose**: The per-panel loading state — every one of the 6 panels uses this shimmer treatment independently, so a slow panel never blocks the rest of the screen from rendering
- **Data source**: Loading state (that specific panel's `Promise.allSettled` slot is still `pending`)
- **Visual treatment**: The panel's outer card shell (same --r-xl, same border) renders immediately with placeholder content: gray-white gradient shimmer bars (white at 6% base, sweeping to white at 12%, 1200ms loop, left-to-right) in the approximate shape of that panel's real content (e.g., Briefing shows 8 shimmer rows; Ripple Simulator shows a shimmer slider track). The panel's eyebrow label renders immediately in full opacity (only the data content is skeletal) so the screen's overall structure is legible even while individual panels are still resolving.
- **Content**: Shape-matched shimmer bars per panel type
- **Variants**: Standard (under ~3s, plain shimmer), Extended (see Panel Extended Loading State)
- **Gestures**: None (non-interactive while loading)
- **Size**: Matches that panel's loaded-state footprint as closely as possible, to minimize layout shift when data arrives

### Panel Extended Loading State
- **Purpose**: When a specific panel's call exceeds its expected latency budget (thresholds vary — Briefing/Life Map ~3s, Root Cause/Ripple Simulator ~6s given heavier reasoning calls, Future Self ~6s), the plain shimmer is replaced with a state that reframes the wait as depth rather than a stall, reducing perceived-failure anxiety on the slower reasoning-heavy panels specifically.
- **Visual treatment**: Same shimmer shell, plus a small centered caption below the shimmer: an icon (12pt, royal-purple, subtle pulse) + reassurance copy in that panel's voice, e.g. "still crunching your trajectory" (Future Self), "still reasoning through this" (Root Cause), "this one's a deeper calculation" (Ripple Simulator) — 12pt Switzer Regular, white at 45%.
- **Variants**: Per-panel copy as above; converts to Panel Error State if the call ultimately times out (hard timeout ~20s) or the server returns an error
- **Gestures**: None
- **Size**: Same as Panel Loading Skeleton

### Panel Error State
- **Purpose**: The isolated, per-panel failure state that makes graceful degradation visible and trustworthy rather than silent — this component is the direct visual proof of the `Promise.allSettled` architecture and must never take down or visually disturb any other panel on the screen.
- **Data source**: That specific panel's `Promise.allSettled` slot resolved to `rejected`, or a hard timeout was reached
- **Visual treatment**: The panel's outer card shell renders with a dashed 1pt white-at-15% border (replacing the solid border, signaling "incomplete" without alarm-red), reduced to a compact ~120pt height regardless of the panel's normal size (collapsed, not stretched to its normal footprint, since there's no content to fill it with). Centered content: a warning-triangle icon (20pt, muted amber #F59E0B — deliberately not error-red, since this is a transient availability issue, not a destructive error), a one-line message specific to that panel (e.g., "couldn't reach the reasoning engine right now" for Root Cause Explorer, "couldn't load your briefing" for Executive Daily Briefing), and a "retry" link (13pt Cabinet Grotesk SemiBold, orange, 44pt touch target) that re-fires only that panel's own API call.
- **Content**: Icon, one-line panel-specific error message, "retry" link
- **Variants**: Per-panel copy, Retrying (icon replaced with small spinner while the isolated retry is in flight), Retry-succeeded (panel smoothly expands and cross-fades into its normal loaded content, 280ms), Retry-failed-again (message updates to "still having trouble — try again in a bit" after a repeat failure, retry link remains available, no retry limit imposed)
- **Gestures**: Tap "retry" → re-fires that panel's API call only. No cascading effect on the other 5 panels.
- **Size**: Full-width minus 32pt x ~120pt (compact, regardless of the panel's normal loaded height)

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Header title | Cabinet Grotesk | 700 (Bold) | 17pt | 22pt | White #FFFFFF | "Cognitive OS" |
| Panel eyebrow | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White at 60% | Uppercase, +0.12em tracking |
| Panel timestamp | Switzer | 400 (Regular) | 12pt | 16pt | White at 40% | "updated 6:02am" |
| Briefing data label | Switzer | 500 (Medium) | 13pt | 18pt | White at 70% | "Energy forecast" |
| Briefing data value | Cabinet Grotesk | 700 (Bold) | 15pt | 20pt | White #FFFFFF | "78%", numeric values |
| Briefing recommended item | Switzer | 500 (Medium) | 14pt | 20pt | White #FFFFFF | Numbered action text |
| Life Map leverage callout | Switzer | 500 (Medium) | 13pt | 18pt | White at 70% | "leverage point: sleep..." |
| Root Cause framed question | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | White #FFFFFF | "why is your energy..." |
| Root Cause list item | Switzer | 400 (Regular) | 13pt | 18pt | White at 80% | Upstream/downstream lines |
| Ripple domain/delta label | Switzer | 400 (Regular) | 14pt | 18pt | White at 70% | "if [domain] changes by" |
| Ripple live readout | Cabinet Grotesk | 600 (SemiBold) | 14pt | 18pt | White #FFFFFF | "+45 min" |
| Ripple ranked item name | Switzer | 500 (Medium) | 14pt | 20pt | White #FFFFFF | Effect/domain name |
| Ripple ranked item delta | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | Forest-green / orange | "▲ +12%" / "▼ -3%" |
| Timeline horizon segment | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | White / white at 60% | "7d" active / inactive |
| Timeline trajectory summary | Switzer | 400 (Regular) | 14pt | 20pt | White at 80% | "at your current pace..." |
| Timeline milestone label | Switzer | 500 (Medium) | 12pt | 16pt | White at 70% | "fitness goal on pace" |
| Memory statement | Switzer | 400 (Regular) | 14pt | 20pt | White #FFFFFF | In quotes |
| Memory action link ("edit") | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | #FF5E00 | Orange CTA |
| Memory action link ("refresh") | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | #F59E0B | Amber CTA |
| Provenance badge text | Cabinet Grotesk | 600 (SemiBold) | 10pt | 13pt | Per-state color | Uppercase, +0.06em tracking |
| Honest-null value text | Switzer | 400 (Regular) | 13pt | 18pt | White at 40%, italic | "connect a wearable..." |
| Panel error message | Switzer | 400 (Regular) | 13pt | 18pt | White at 60% | Per-panel copy |
| Panel error "retry" link | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | #FF5E00 | Orange |
| Extended-loading reassurance | Switzer | 400 (Regular) | 12pt | 16pt | White at 45% | "still crunching..." |
| "full →" / "all →" links | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | #FF5E00 | Navigational |

---

## Composition & Visual Hierarchy

**Squint test**:
- The Executive Daily Briefing's low-intensity purple glow makes it the clear starting point without needing to be visually loud — the eye lands there first because it's the only card with any glow at all
- Provenance badges create a consistent color rhythm running down the entire screen — green/purple/amber dots recur at a steady cadence across all six panels, training the eye to scan for them the way it scans for status pills elsewhere in the app
- The Ripple Simulator's slider is the one clearly "toy-like, play with me" affordance on the screen — its royal-purple handle and live readout invite direct manipulation in an otherwise read-heavy dashboard
- Panel Error States, when present, are deliberately quiet (dashed border, compact height, amber not red) — they should never be the loudest thing on the screen, since a transient backend hiccup is not the user's problem to be alarmed about
- Section eyebrows in uppercase Cabinet Grotesk at consistent 60% white opacity give the whole screen a steady editorial rhythm, like section headers in a report — reinforcing the "briefing," not "app UI," framing

**Spacing breakdown (8pt grid)**:
- Header height: 44pt + 3pt accent line
- Header to Briefing card: 16pt (--s-4)
- Briefing card internal padding: 32pt (--s-6, hero treatment)
- Between Briefing data rows: 12pt (--s-3)
- Briefing to Life Operating Map: 32pt (--s-6, inter-section gap)
- Between subsequent panels (Life Map → Root Cause → Ripple → Timeline → Memory): 32pt (--s-6) each
- Panel internal padding: 24pt (--s-5, standard card padding)
- Memory Explorer row height: 64pt, 8pt gap between rows
- Last panel to tab bar: 64pt (--s-8, clears tab bar)
- Tab bar: 56pt + 34pt safe area

**Z-layers**:
- z-0: ink-900 background
- z-10: Panel cards (Briefing, Life Map, Root Cause, Ripple Simulator, Timeline, Memory Explorer)
- z-15: Provenance badges (always render above their parent row's text, never clipped)
- z-20: Panel Error State overlays (replace panel content in-place, same z as normal content)
- z-30: Header (backdrop-blur on scroll)
- z-40: Tab bar
- z-50: Inline tooltips (badge explanations, milestone callouts), domain selector picker popovers
- z-60: Any toast (e.g., "couldn't refresh this memory")

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Header accent line | #7F24FF | royal-purple | 3pt, Intelligence Mode signature |
| Briefing card border | #7F24FF at 15% | royal-purple | Hero card distinction |
| Briefing glow | rgba(127,36,255,0.12) | `--glow-purple` (low intensity) | Subtle hero marker |
| Life Map "leverage point" dot | #7F24FF | royal-purple | SIA-derived insight marker |
| Ripple slider fill + handle | #7F24FF | royal-purple | Interactive control |
| Timeline active horizon segment | #7F24FF | royal-purple | Intelligence Mode override of default orange segmented control |
| Timeline milestone diamond | #7F24FF | royal-purple | Predicted goal marker |
| Provenance: measured | #34A853 at 15% bg, text | forest-green | Directly observed |
| Provenance: derived | #7F24FF at 15% bg, text | royal-purple | SIA-computed |
| Provenance: stale | #F59E0B at 15% bg, text | amber (warning) | Needs refresh |
| Ripple positive delta | #34A853 | forest-green | "▲ +12%" |
| Ripple negative delta | #FF5E00 | orange (primary) | "▼ -3%" |
| Memory "edit" link | #FF5E00 | orange (primary) | Correctable entry |
| Memory "refresh" link | #F59E0B | amber (warning) | Stale entry action |
| "full →" / "all →" links | #FF5E00 | orange (primary) | Navigational |
| Panel error icon | #F59E0B | amber (warning) | Non-alarming failure signal |
| Panel error border | white at 15%, dashed | — | Incomplete, not broken |
| Panel error "retry" link | #FF5E00 | orange (primary) | Recovery action |
| Domain dots (Life Map, selectors) | 9 domain colors | see domain palette | Identification only |
| Honest-null text | white at 40%, italic | — | No fabricated data |
| Primary text | #FFFFFF | white | Titles, statements |
| Secondary text | white at 70-80% | — | Descriptions |
| Tertiary text | white at 40-60% | — | Meta, labels |

**60/30/10 verification**: This screen is a deliberate Register exception, matching the precedent set by Screen [48] Intelligence Dashboard and Screen [68] Wiki Neural Graph: because the entire surface is SIA's own transparency report, **royal-purple functions as the primary visual driver** rather than its usual 10% accent role — the header accent line, all "derived" badges, the Ripple Simulator's interactive control, the Timeline's active states and milestones, and the Life Map's leverage-point marker are all purple by design. Forest-green is scoped tightly to "measured" badges and positive ripple deltas — a clear, consistent secondary role. Amber (#F59E0B) is introduced on this screen specifically as the "stale/needs-refresh" and "transient error" semantic color, reusing the app's existing moderate/warning hex rather than inventing a new one. Orange retains its familiar role for navigational links and primary recovery actions ("retry", "edit") but is visually secondary to purple here — an intentional, scoped inversion of the app-wide 60/30/10 hierarchy that applies only to this screen and its Intelligence Mode siblings, not to the app at large.

---

## Interaction States

### Provenance Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Colored pill per state, dot icon + label | — |
| Pressed (tap) | Scale(0.95), tooltip appears | Light impact |
| Tooltip open | Small popover with source detail, dismisses on outside tap or 4s | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Briefing Data Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Label + value + badge, standard row | — |
| Pressed | Row bg white at 5% flash | Light impact |
| Deep-link available | Row shows a subtle chevron on the far right | — |
| Honest-null | Value in italic white at 40%, no badge, no chevron (non-interactive) | — |

### Ripple Simulator Slider
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Handle at last value (or 0), track filled to match | — |
| Dragging | Handle scales to 1.15x, live readout updates continuously, ranked list shows "estimating..." optimistic preview | Light impact (continuous tick every ~10% of range) |
| Released | Authoritative server call fires, list cross-fades from estimate to confirmed | Light impact |
| Focus-visible (keyboard) | 2pt orange ring on handle, arrow keys nudge by small increments | — |

### Domain Selector (Root Cause / Ripple Simulator)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Pill showing current domain, neutral or domain-colored | — |
| Pressed | Scale(0.96), opens picker popover | Light impact |
| Picker open | 9 domain rows + "auto" option, scrollable if needed | — |
| Selection made | Picker closes, panel content crossfades to new domain's data | Medium impact |

### Timeline Horizon Segment
| State | Visual | Haptic |
|-------|--------|--------|
| Inactive | Transparent, white at 60% text | — |
| Pressed | White at 5% bg flash | Light impact |
| Active | Royal-purple fill, white text | Medium impact |

### Memory Row Action Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default ("edit") | Orange text | — |
| Default ("refresh", stale only) | Amber text | — |
| Pressed | Darker shade, scale(0.95) | Light impact |
| Refreshing | Text replaced with small spinner | — |
| Refresh resolved | Badge updates (stale → measured/derived), brief green glow flash on the row (600ms) | Success notification |
| Refresh inconclusive | Badge stays "stale", small toast: "SIA still isn't sure about this one" | — |

### Panel Error State — Retry Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange text, "retry" | — |
| Pressed | Scale(0.95), darker orange | Light impact |
| Retrying | Icon → small spinner, text dims to 50% | — |
| Succeeded | Panel expands + cross-fades to loaded content | Success notification |
| Failed again | Message updates to "still having trouble..." message variant, retry remains available | Error notification |

### Header Refresh Icon
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Static circular-arrows icon, white at 60% | — |
| Pressed | Scale(0.9) | Light impact |
| Refreshing | Continuous rotation animation | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Panel Card (general, applies to all 6 outer shells)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Solid --r-xl card, standard border | — |
| Loading | Shimmer content, eyebrow label still fully opaque | — |
| Extended loading | Shimmer + reassurance caption | — |
| Error | Collapsed ~120pt height, dashed border, amber icon | — |
| Retrying | Small spinner replaces amber icon | — |
| Loaded (fresh) | Full content, standard border | — |
| Loaded (stale-while-revalidate) | Full previous content shown at 100% opacity while a quiet re-fetch happens in the background; no visual indicator unless the result changes, avoiding flicker on every refresh | — |

### Life Operating Map Domain Node
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Domain-colored dot, connecting lines at rest opacity | — |
| Pressed | Scale(0.9), brief glow flash in domain color | Light impact |
| Selected (scrolls Root Cause into view) | Brief highlight ring persists for ~1s after scroll completes | Medium impact |

### Future Self Milestone Diamond
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Royal-purple filled diamond, 10pt | — |
| Pressed | Scale(1.2x), callout opens | Light impact |
| Callout open | Diamond holds enlarged state until callout dismissed | — |
| Off-pace warning variant | Diamond outline turns amber instead of solid purple fill, signaling the milestone is currently projected to miss | — |

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Pop stack to entry point |
| Tap | Header refresh icon | Re-fire all 6 panel API calls independently |
| Tap | Any Briefing data row | Inline explainer tooltip, or deep-link to relevant domain dashboard |
| Long-press | Briefing card | "Ask SIA to explain this briefing" → SIA Chat [09] with context |
| Tap | Briefing recommended action item | Deep-link to relevant goal/workout/contract surface |
| Tap | Life Operating Map "full →" | Deep-link to dedicated Life Matrix tab |
| Tap | Life Operating Map domain node | Scroll Root Cause Explorer into view with that domain pre-selected |
| Tap | Life Operating Map leverage-point callout | Expand inline to show the 4 downstream domains |
| Tap | Root Cause domain selector | Open domain picker popover |
| Tap | Root Cause list item | Deep-link to domain dashboard, or open "why SIA thinks this" tooltip |
| Tap | Root Cause framed question | "Ask SIA to go deeper" → SIA Chat [09] with context |
| Tap | Ripple Simulator domain selector | Open domain picker popover |
| Drag | Ripple Simulator slider | Live optimistic preview; authoritative projection on release |
| Tap | Ripple ranked effect row | Deep-link to that domain/metric's dashboard |
| Tap | Timeline horizon segment | Switch projection window (crossfade) |
| Tap | Timeline milestone diamond | Inline callout with projected date + confidence, "view goal" link |
| Drag / swipe | Timeline track | Scrub a "you are here" exploratory indicator (non-committal) |
| Tap | Memory row | Expand entry detail (inline or sheet) |
| Tap | Memory "edit" link | Inline edit mode (Screen [20] pattern) |
| Tap | Memory "refresh" link (stale only) | Trigger SIA re-evaluation of that memory |
| Tap | Memory Explorer "all →" | Tab switch to Personal Wiki [20] Knowledge chapter |
| Tap | Provenance badge (any panel) | Inline tooltip with exact source detail |
| Tap | Panel "retry" link (error state) | Re-fire only that panel's API call |
| Vertical scroll | Screen | Scroll through all 6 panels |
| Swipe right from edge | Screen | iOS back gesture |

### Keyboard Navigation & Screen Reader Order (desktop, accessibility)

Every interactive element on this screen is a standard focusable DOM control (unlike the canvas-rendered Wiki Neural Graph [68], nothing here requires a parallel accessibility tree) — the accessibility work is about **order and labeling**, not a workaround.

| Key | Target | Action |
|-----|--------|--------|
| Tab | Screen | Moves focus panel-by-panel, top to bottom, in the same order as the visual hierarchy (Briefing → Life Map → Root Cause → Ripple Simulator → Timeline → Memory Explorer) |
| Tab (within a panel) | Interactive elements | Moves through that panel's controls in reading order (e.g., Root Cause: domain selector → upstream items → downstream items) |
| Enter / Space | Focused control | Activates (same as tap/click) |
| Arrow Left/Right | Ripple Simulator slider (focused) | Nudges delta value in small increments |
| Arrow Left/Right | Timeline horizon selector (focused) | Moves between 7d/30d/90d/365d segments |
| Escape | Open tooltip/picker/callout | Closes it, returns focus to the triggering control |

Every Provenance Badge carries an `aria-label` that speaks its full meaning rather than relying on color alone: e.g. `aria-label="measured — directly observed"`, `aria-label="derived — SIA's inference from your data"`, `aria-label="stale — needs refresh"`. Panel Error States are announced via `aria-live="polite"` on transition so a screen-reader user is told a specific panel failed without the entire page re-announcing itself, and the retry action is reachable immediately after that announcement rather than requiring a full re-scan of the page. Honest-null values are always read with their explanatory copy attached (e.g., "Recovery: connect a wearable to see this") rather than being skipped, so the absence of data is communicated, not silently omitted.

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: Briefing (0ms), Life Map (80ms), Root Cause (160ms), Ripple Simulator (240ms), Timeline (320ms), Memory Explorer (400ms) — each panel animates independently of the others' data-readiness | 280ms each | ease-out-soft |
| Panel loading shimmer | Panel pending | Gradient sweep left→right across shimmer bars | 1200ms loop | linear |
| Panel data arrival | Fetch resolves | Shimmer cross-fades to real content (160ms out, 280ms in) | ~440ms total | ease-out-soft |
| Panel error transition | Fetch rejects | Card collapses from full/skeleton height to compact ~120pt error height, dashed border fades in | 280ms | ease-out-soft |
| Panel retry success | Retry resolves | Compact error card expands back to full height + content cross-fades in | 280ms | ease-out-soft |
| Provenance badge tooltip | Tap | Popover scales 0.9→1.0 + fades in | 160ms | ease-out-soft |
| Ripple slider drag | User drag | Handle + fill follow finger/cursor 1:1, ranked list values interpolate live | Instant (drag), settle animates values 280ms on release | linear (drag), ease-out-soft (settle) |
| Domain selector change | Selection made | Panel content cross-fades (old fades 40%→0%, new fades 0%→100%) | 280ms | ease-out-soft |
| Timeline horizon switch | Segment tap | Active segment slides, timeline content cross-fades | 280ms | ease-out-soft |
| Timeline milestone callout | Diamond tap | Callout scales 0.9→1.0 + fades in, anchored above the marker | 200ms | ease-out-soft |
| Memory refresh success | Refresh resolves | Row border flashes green (600ms), badge crossfades to new state | 600ms | ease-out-soft |
| Header refresh spin | Refresh tap (any in-flight panel) | Icon rotates continuously | Continuous while any panel pending | linear |
| Briefing glow | Idle (continuous, subtle) | Glow opacity gently breathes 10%→14%→10% | 4000ms loop | ease-in-out |
| Extended-loading reassurance | Panel exceeds latency threshold | Caption fades in below shimmer | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft), panel stagger begins immediately (does not wait for slide to complete)
- **Exit**: Stack pop, slides right

---

## Empty States

### Day 1 (new user, minimal history)
- Executive Daily Briefing renders with mostly honest-null rows: "SIA needs a few days of data before your first full briefing" as the card's primary message, replacing the row-by-row layout with a single centered explainer + a "check back tomorrow" note. Any rows that *can* resolve immediately (e.g., accountability status, if a contract exists) still render normally alongside the explainer.
- Life Operating Map shows the 10-node structure with all connection lines dimmed to near-invisible (no relationships discovered yet) and a caption: "SIA is still mapping the connections between your life areas."
- Root Cause Explorer shows: "SIA doesn't have enough history yet to explain what's driving your numbers. This fills in as you use Balencia." — no domain selector interaction blocked, just an honest empty framing per domain.
- Ripple Simulator remains fully interactive (it can still compute a basic projection from general population priors + whatever the user has), but ranked effects show a "low confidence" sub-label more often, with a note: "these get sharper the more SIA learns about you."
- Future Self Timeline shows a flat trend line with no milestone diamonds (no active goals or insufficient history) and copy: "set a goal to see your projected path here."
- Memory Explorer shows 2-3 entries seeded from onboarding, with a note: "this grows every time you talk with SIA."

### Established user, all panels healthy
- Standard experience as described throughout this document — no special messaging needed.

### All 6 panels failed (rare, systemic outage)
- Each panel independently renders its own Panel Error State — the screen does not show a single blanket "everything is down" message, preserving the per-panel retry model even in the worst case. However, the Header gains a small persistent banner beneath the accent line: "having trouble reaching SIA's intelligence services — you can retry individual sections below, or try again shortly." (13pt Switzer Regular, white at 60%, ink-brown-800 background, dismissible with an ×). This banner is purely additive context; it never replaces the six independent panel-level error states.

### Offline
- Same Panel Error State treatment on all 6 panels, with panel-specific messages replaced uniformly by "no connection" copy. The Header banner (as above) reads: "you're offline — Cognitive OS needs a connection to refresh."

### Single-panel empty result (data exists elsewhere, but not for this view)
- **Root Cause Explorer, no clear driver**: covered above under the component's own "No clear cause found" variant — "SIA doesn't see a clear driver for this yet."
- **Ripple Simulator, domain with no historical correlation data**: slider remains interactive, but the ranked effects list shows a single row: "not enough history to project this domain's ripple yet" (white at 40%, no badge), rather than an empty list with no explanation.
- **Future Self Timeline, goal already achieved**: milestone diamond renders as a filled forest-green checkmark variant instead of purple, with label "achieved — [date]" rather than a forward projection, since there's nothing left to predict for that particular goal.
- **Memory Explorer, user has deleted/corrected everything recently**: shows "you're all caught up — nothing new to review" rather than a bare empty list, with the "all →" link still available to browse the full wiki.

---

## Motivation Adaptation

- **Low motivation**: Executive Daily Briefing trims to 3-4 highest-priority rows instead of all 8 (energy, top risk, one recommended action) — less to read, less to feel behind on. Ripple Simulator and Root Cause Explorer remain present but are visually de-emphasized (collapsed by default, tap to expand) rather than pre-expanded, reducing the sense of "six more things to process." Recommended actions list caps at 1 item with gentler phrasing ("one small thing today: move your workout earlier").
- **Medium motivation**: Standard experience as described — all 6 panels present and expanded by default.
- **High motivation**: Briefing includes an additional "week-over-week" comparison line per data row (e.g., "Energy forecast: 78% — up from 71% last week"). Root Cause Explorer surfaces 2 domains at once (current + one comparison) instead of one. Ripple Simulator's ranked effects list expands to show up to 8 items instead of 4-5, and gains a "compound scenario" toggle to stack two simultaneous what-if deltas. Future Self Timeline defaults to the 90d horizon instead of 7d, and milestone callouts show full projected-date-range confidence intervals rather than a single point estimate. Memory Explorer preview expands to 8 rows instead of 5.

---

## Cross-References

- **Navigates to**: SIA Chat [09] via any panel's "ask SIA" action (tab switch with panel-specific context), Goal Detail [14] via Future Self Timeline milestone or Briefing recommended-action tap (stack push), Fitness/Finance/other domain dashboards via Briefing data row or Root Cause/Ripple list item taps (stack push), Personal Wiki [20] Knowledge tab via Memory Explorer "all →" or row tap (tab switch), Wiki Neural Graph [68] as an alternate deep exploration path referenced from Memory Explorer context, dedicated Life Matrix tab via Life Operating Map "full →" link (tab switch), Accountability [46] implicitly via Briefing's accountability-status row
- **Navigates from**: Explore Section [18] via "Cognitive OS" hero module card (stack push), Home Screen [12] via proactive "cognitive OS ready" card (stack push), Intelligence Dashboard [48] via "open full Cognitive OS" link (stack push), SIA Chat [09] via deep-link (stack push with context)
- **Shared components with**: Screen [48] — Intelligence Dashboard (royal-purple-as-primary Register exception, Contradiction/status visual language, `--glow-purple` usage, header accent-line treatment), Screen [20] — Personal Wiki (Entry Card / edit-mode pattern reused inside Memory Explorer row expansion, Confidence Badge lineage — this screen's Provenance Badge is a formalized 3-state evolution of that pattern), Screen [68] — Wiki Neural Graph (shared domain color palette, shared "honest-null over fabricated value" principle, shared Intelligence Mode register), Screen [38] — Habits (Segmented Control mechanics reused for the Timeline horizon selector), Screen [46] — Accountability (Briefing's accountability-status row references the same contract/streak data model)
- **Patterns used**: Back Button, Segmented Control (Screen [38], purple-override variant), Bottom Sheet / inline expand (Screen [20] Entry Card pattern, reused for Memory row detail), Glow Tokens `--glow-purple` (Design Tokens), Domain color palette (9 domains, Design Tokens), Skeleton shimmer loading (app-wide pattern), Bottom Tab Bar
- **Patterns established**: **Provenance Badge** (three-state measured/derived/stale visual language with consistent color + icon-shape coding — intended to be the app-wide honesty pattern going forward, not scoped to this screen alone), **Panel Error State** (isolated, compact, non-alarming per-panel failure treatment with independent retry — the direct visual expression of `Promise.allSettled` graceful degradation, reusable by any future multi-source dashboard), **Panel Extended Loading State** (reassurance copy for reasoning-heavy calls that exceed a latency budget, reframing wait as depth), **Executive Daily Briefing** (dense, labeled-row morning-digest card synthesizing multiple subsystems into one hero), **Life Operating Map** (lightweight static summary projection of a larger interactive model, deliberately not re-implementing the full graph), **Root Cause Explorer** (framed-question + upstream/downstream two-column causal reasoning card), **Ripple Simulator** (domain + delta slider driving a live-updating ranked projection, optimistic-then-authoritative interaction model), **Future Self Timeline** (multi-horizon trajectory projection with milestone diamond markers), **Memory Explorer preview** (compact, provenance-forward entry point into the fuller Wiki memory system), **Honest-Null Value Rendering** (italic muted text + explanatory copy in place of a badge, whenever a data point genuinely doesn't exist yet, instead of fabricating or hiding the row), **Stale-While-Revalidate Panel Refresh** (a panel keeps showing its last-known-good content during a background re-fetch rather than clearing to a loading state, reserved for anything past the very first mount).

**Note on screen numbering**: this file is authored as Screen 69 of 69, completing the design-system expansion alongside Screen [68] — Wiki Neural Graph. `_progress.md` reflects the state through Screen 63 as of the last full-batch update (2026-05-21); Screens 64-67 are reserved/pending in the broader roadmap and are out of scope for this file. Screens 68 and 69 together form the closing pair of the design system: one is SIA's memory made explorable (the graph), the other is SIA's reasoning made accountable (the OS) — both share the Intelligence Mode register and the royal-purple-as-primary exception documented in their respective Color Map sections.
