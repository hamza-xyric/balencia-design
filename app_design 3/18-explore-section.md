# Screen Design: Explore Section

**Screen**: 18 of 73
**File**: 18-explore-section.md
**Register**: Product Mode
**Primary action**: discover and navigate to domain dashboards and features
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root (Me Main [17]). Pushed via "see all" from the Explore preview section on Me Main.

---

## Purpose

Explore is Balencia's feature discovery surface — the complete catalog of every domain dashboard and standalone feature, organized by life domain with AI-powered recommendations at the top. It solves the problem of "what else can I do in this app?" without requiring users to ask SIA. The "suggested for you" section uses AI context (recent goals, mood, time of day, underexplored domains) to surface the most relevant modules. Below that, a categorized grid lets users browse at their own pace. This replaces a traditional "more" tab or hamburger menu with a warm, browsable experience.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "Suggested for you" — 2-3 AI-recommended module cards (most prominent, horizontal scroll)
2. Domain categories with module cards — grouped by life domain, each category a section with domain-colored header
3. Standalone features section — Journal, Habits, Calendar, Leaderboard, Community (not tied to a single domain)
4. Search bar — top, for direct lookup

**User flow**:
- **Arrives from**: Me Main [17] ("see all" link in Explore preview section)
- **Primary exit**: Tap module card → domain dashboard [26-36], wellbeing feature [44-63], or standalone feature [37-41, 45-48, 59, 61-62] (stack push)
- **Secondary exits**: Back → Me Main [17] (stack pop), search → filtered results

---

## Layout

**Scroll behavior**: SectionList (grouped sections with sticky section headers)
**Tab bar visible**: Yes (Me tab active)

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│                                 │
│  ← Explore                     │  ← Back + title row (44pt)
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔍 search modules...    │   │  ← Search bar (44pt)
│  └─────────────────────────┘   │
│                                 │
│  SUGGESTED FOR YOU              │  ← Eyebrow (20pt)
│  ┌─────────┐ ┌─────────┐ ┌──  │
│  │ Module  │ │ Module  │ │ Mo │  ← Suggested cards
│  │ Card    │ │ Card    │ │ Ca │    horizontal scroll
│  │ 🟠sugg. │ │ 🟢new   │ │    │    ~140pt
│  └─────────┘ └─────────┘ └──  │
│                                 │
│  ● Fitness and movement         │  ← Domain section header
│  ┌──────────┐ ┌──────────┐     │
│  │Workouts  │ │Active    │     │  ← Module cards 2-col
│  │Dashboard │ │Workout   │     │    ~100pt per row
│  └──────────┘ └──────────┘     │
│                                 │
│  ● Nutrition and diet           │  ← Domain section header
│  ┌──────────┐ ┌──────────┐     │
│  │Nutrition │ │Food      │     │
│  │Dashboard │ │Logger    │     │
│  └──────────┘ └──────────┘     │
│                                 │
│  ● Finance and money            │
│  ...                            │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━     │  ← Divider
│  MORE FEATURES                  │  ← Standalone section
│  ┌──────────┐ ┌──────────┐     │
│  │Journal   │ │Habits    │     │
│  └──────────┘ └──────────┘     │
│  ┌──────────┐ ┌──────────┐     │
│  │Calendar  │ │Leader-   │     │
│  │          │ │board     │     │
│  └──────────┘ └──────────┘     │
│  ┌──────────┐                   │
│  │Community │                   │
│  └──────────┘                   │
│                                 │
│  32pt bottom padding            │
├─────────────────────────────────┤
│  [Today] [ SIA ] [Goals] [ Me ]│
├─────────────────────────────────┤
│  Home Indicator (34pt)          │
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation header** — 44pt
   - Back button + "explore" title

2. **Search bar** — 44pt + 16pt top/bottom margin = 76pt
   - Full-width search input

3. **Suggested section** — ~180pt
   - Eyebrow header + horizontal scroll of module cards

4. **Domain sections** — variable height (one per active domain)
   - Section header + 2-column grid of module cards
   - ~9 sections × ~120pt average = ~1080pt

5. **Standalone features section** — ~240pt
   - "More features" header + 2-column grid

6. **Bottom spacing** — 32pt

---

## Components

### Navigation Header
- **Purpose**: Back navigation and screen identification
- **Data source**: Static
- **Visual treatment**: Standard Product Mode header
- **Content**:
  - Back button: Batch 1 pattern (left chevron, white, 44x44pt, 16pt from left)
  - Title: "explore" — 17pt Sora Semibold, white, center-aligned
- **Gestures**: Tap back / swipe from left edge → stack pop to Me Main [17]
- **Size**: full-width x 44pt

### Search Bar
- **Purpose**: Direct lookup of modules by name or domain
- **Data source**: Static module list (client-side filter)
- **Visual treatment**: 
  - Based on Text Input Field pattern (Batch 1) with modifications for search:
  - Full-width minus 32pt (16pt margins)
  - Height: 44pt (slightly shorter than form inputs)
  - Background: ink-brown-800 (#211008)
  - Border: 1pt solid white at 10% opacity (default), 2pt Burnt Orange (focused)
  - Border-radius: --r-pill (999pt) — pill shape differentiates from form inputs
  - Left icon: magnifying glass, 16pt, white at 40%, 16pt left padding
  - Placeholder: "search modules..." — 15pt Sora Regular, white at 40%
  - Text: 15pt Sora Regular, white
  - Right: clear button (X, 16pt) appears when text is entered, 44x44pt touch target
- **Behavior**: Filters the domain sections and standalone features in real-time as user types. Suggested section hides during search. Matching cards remain, non-matching cards hide with 160ms fade-out. If no results, centered message: "no modules match '[query]'" in 15pt Sora Regular, white at 40%.
- **Variants**: Empty (placeholder visible), Active (text entered, results filtered), No results
- **Gestures**: Tap → keyboard appears, search input focuses. Tap clear → clears text, resets view.
- **Size**: full-width minus 32pt x 44pt

### Suggested For You Section
- **Purpose**: AI-driven feature recommendations
- **Data source**: AI recommendation engine (context: recent goals, mood signals, time of day, underexplored domains)
- **Visual treatment**: 
  - Eyebrow header: "suggested for you" — 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking, 16pt left margin, 16pt below search bar
  - Horizontal ScrollView of module cards (same pattern as Me Main [17] Explore Preview):
    - Card width: 160pt, height: 120pt
    - Background: ink-brown-800, border-radius 16pt, 1pt border white at 8%
    - Padding: 16pt
    - Domain color dot (8pt) + domain name (11pt Sora Regular, white at 50%), single row
    - Module name: 15pt Sora Semibold, white, 12pt below
    - Description: 13pt Sora Regular, white at 40%, 2-line max, ellipsis
    - Badge: "suggested" (orange bg, white text) or "new" (green bg, white text) — 10pt Sora Semibold, top-right corner pill
  - Card spacing: 12pt, left padding 16pt, trailing padding 16pt
- **Variants**: AI-populated (2-3 cards), fallback popular (if AI unavailable)
- **Gestures**: Horizontal scroll. Tap card → domain dashboard or feature screen (stack push).
- **Size**: full-width x ~180pt (eyebrow 20pt + 16pt gap + 120pt cards + 24pt bottom margin)

### Domain Section
- **Purpose**: Category grouping for domain-specific modules
- **Data source**: Static module definitions + domain metadata
- **Visual treatment**:
  - Section header (sticky on scroll): 
    - Height: 32pt
    - Background: ink-900 (matches screen bg, becomes opaque when sticky)
    - Content: Domain color dot (8pt circle) + 8pt gap + domain name (14pt Sora Semibold, white at 70%, sentence case)
    - Padding: 16pt left, 16pt right
    - When sticky: adds 1pt bottom border white at 5%, slight backdrop-blur
  - Module cards (2-column grid):
    - Card width: (screen width - 32pt margins - 12pt gap) / 2
    - Card height: 88pt
    - Background: ink-brown-800, border-radius 14pt (--r-md), 1pt border white at 8%
    - Padding: 12pt
    - Content (top to bottom):
      - Module icon: 20pt, white at 60% (outlined style)
      - Module name: 14pt Sora Semibold, white, 8pt below icon
      - Description: 12pt Sora Regular, white at 40%, 1-line, ellipsis
    - Optional lock icon overlay: 12pt, white at 30%, bottom-right (for premium-only modules visible to free users)
    - Gap between cards: 12pt horizontal, 12pt vertical
- **Domain sections and their modules**:
  1. Fitness and movement: Workouts dashboard [26], Active workout [27], Progress photos [49]
  2. Nutrition and diet: Nutrition dashboard [28], Food logger [29], Recipes [56], Shopping list [57]
  3. Finance and money: Money map dashboard [30], Transaction detail [31]
  4. Career and work: Career dashboard [32]
  5. Relationships: Relationships dashboard [33]
  6. Spirituality: Spirituality dashboard [34]
  7. Learning and growth: Learning dashboard [35]
  8. Creativity: Creativity dashboard [36]
  9. Wellbeing: Water intake [44], Stress management [52], Breathing exercises [53], Meditation [54], Yoga sessions [55], Sleep tracking [58], Energy tracking [63], Medication tracking [60]
- **Variants**: All domains shown (not filtered by user interests — full catalog). Domains the user has explored get a subtle checkmark on the section header.
- **Gestures**: Tap card → domain dashboard or feature screen (stack push). Scroll through sections. Sticky headers remain visible.
- **Size**: variable per section (header 32pt + grid rows)

### Standalone Features Section
- **Purpose**: Features not tied to a single domain
- **Data source**: Static
- **Visual treatment**:
  - Divider: 1pt line, white at 8%, full-width minus 32pt, 24pt vertical margin above
  - Section header: "more features" — 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking, 16pt left margin
  - 2-column grid using same card pattern as domain sections
- **Features**:
  1. Journal [37] — icon: pen/notebook, description: "guided reflections"
  2. Habits [38] — icon: checkmark-circle, description: "daily habit tracking"
  3. Calendar [41] — icon: calendar, description: "schedule and planning"
  4. Leaderboard [39] — icon: trophy, description: "community rankings"
  5. Community [40] — icon: people/chat-bubbles, description: "chat rooms and groups"
  6. Daily check-in [45] — icon: sun/moon, description: "mood, energy, and intentions"
  7. Accountability [46] — icon: handshake, description: "accountability partners"
  8. Competitions [47] — icon: flag, description: "challenges and competitions"
  9. Intelligence dashboard [48] — icon: brain/sparkle, description: "AI insights and predictions"
  10. Streaks [59] — icon: flame, description: "streak details and rewards"
  11. Reminders [61] — icon: bell, description: "reminders and tasks"
  12. Quick notes [62] — icon: note/sticky, description: "capture quick thoughts"
- **Gestures**: Tap card → feature screen (stack push)
- **Size**: variable (header + 3 rows of 2-col grid = ~32pt + 3 × 100pt)

---

## Visualization

> Source: no companion file (lightweight-MEDIUM, no `-visualization-recommendations.md`); Audited in `viz-audit/` — Batch (Explore), findings `S18-V01..S18-V02`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **No new primitive is minted.** Register = **Product Mode** (purple absent — correct; AI recommendations are signalled by the "suggested" badge, *not* purple). **Current grade C (66) → specced-target A− (85).** *(Honest re-grade under the 10-dimension rubric. Explore is a feature-discovery *catalog* — a navigation surface, not a dashboard — so premium here means **editorial restraint**: one calm, identity-only stat preview that rewards an engaged user without turning a browse surface into a data wall. The residual gap to A+++ is intentional: forcing more charts onto a catalog would *lower* the grade under dim 1's calm-vs-clutter tie-break.)*

Template = **lightweight-MEDIUM 2-subsection mini** (CONSISTENCY.md §6 thin variants — 18 is named there explicitly). Cluster benchmark = **Linear / Things** (editorial restraint, browsable density) + the always-on **Apple Health** honesty/accessibility floor — *not* a domain-dashboard benchmark. The screen today renders **zero visualization**: `ModuleCard` is icon + name + description, and the spec's own "Motivation Adaptation" hint ("Module cards could show a tiny stat preview … Fitness — Lv.12") is **un-built** in the prototype (`ModuleCard.tsx` has no stat slot) — that un-built hint *is* the finding, and it is the screen's only honest visualization opportunity. The data already exists: `domainStats` (`mock.ts`) carries per-domain `stat` (0–99), `level`, `currentXP`, `nextLevelXP`; `DomainSkillCard` already renders exactly the StatBar this section calls for.

### Visualized-vs-text map

| Datum (already shown / available) | Today | Specced visual | Primitive |
|---|---|---|---|
| Per-domain engagement (`stat` 0–99 + `level` + XP-to-next) for **explored** domains | not shown (hint un-built in `ModuleCard`) | **domain stat preview** — dot + label + `stat` + `Lv.N` + thin XP-progress bar, **identity-coloured**, shown only on *explored* domain-section dashboard cards | **`StatBars` / `MacroBar`** (`DomainSkillCard` pattern) — `S18-V01` |
| "Which life-domains am I active in?" (overview of the same `domainStats`) | not shown | **micro ConstellationRadar** glyph in the *suggested* rail's "your active domains" recap card (high-engagement users only) | **`ConstellationRadar` (VK-005)** at micro size — `S18-V02` |
| Suggested badge ("suggested" / "new" / "start here" / "popular") | coloured pill + **word** | — (deliberately textual — status word already carries it, not colour-alone) | — |
| Module name · description · domain name · icon · search query · "no results" | text | — (deliberately textual — labels/navigation copy with no useful visual form; charting these is the over-resolution dim 1 penalises) | — |
| Lock / tier chip (Plus / Pro) | lock glyph + tier **word** | — (deliberately textual — entitlement state is a word + glyph, never a chart; no dark-pattern urgency) | — |

### 1 · Domain stat preview on explored cards — `StatBars` — `S18-V01`

Build the spec's un-built "Motivation Adaptation" hint as a **single, restrained stat preview** on a domain-section **dashboard** card — the `DomainSkillCard` StatBar pattern, reused, *not* a new primitive: a 2px domain-colour **dot** + domain label, the `stat` (0–99) `tabular-nums`, `Lv.N`, and a thin XP-to-next-level **progress bar** (`MacroBar`/`XPBar` family). It appears **only** on the *primary dashboard* card of a domain the user has **explored / is active in** (the section-header checkmark condition the spec already defines) — never on every catalog tile (that would be the chart-wall dim 1 penalises) and never on standalone-feature or premium-locked cards.
- **Encoding (identity only — locked):** the dot, the bar fill, and the XP track tint all use `--color-domain-*` for that domain **as identity, not data-ink** (this is the sanctioned domain-identity use; the *amount* is still read from the number + bar length, never from hue). Stat value is the dominant glyph; the XP bar is honest `currentXP / nextLevelXP`, **zero-baselined**, capped at 100%, over `--color-alpha-white-08` on `--track-inset` **(mint)**.
- **Depth (token-backed):** thin `--stroke-thin`-class bar (no glow — it is inline, well under the 36px glow floor; a glow here would be the "32px-on-36px" depth *failure*); card surface stays `ink-brown-800` + top-edge highlight. **No gradient sweep** — at this size a flat domain-tint fill reads cleaner than a conic mask.
- **Non-shaming (ethical gate):** a low `stat` or `Lv.1` is **never** recoloured to alarm-red and never framed as "behind"; an unexplored domain simply shows **no** preview (a clean catalog card) — absence is calm, not a "0/failed" verdict. The preview is an *invitation to continue*, consistent with the screen's discovery purpose.
- **Honesty:** no-data ≠ zero — a domain with no engagement renders the plain `ModuleCard` (no ghosted "0" bar); the preview only appears once real `domainStats` exist for it.
- **Data:** `domainStats[domain]` (`stat`, `level`, `currentXP`, `nextLevelXP` — `mock.ts`).
- **States:** *cold-start / Day-1* → **no** previews anywhere (nothing explored yet) — the catalog is the calm Day-1 hero, exactly as the spec's "Day 1" empty state intends; *loading* → card skeleton with a ghosted bar track (no fake fill); *partial* → previews only on the domains that have synced stats, plain cards elsewhere (distinct from loading); *error* → the card still renders its navigation role with the preview omitted (the stat preview is enhancement, never blocks discovery).

### 2 · Micro ConstellationRadar — "your active domains" recap — `S18-V02`  *(reuse `VK-005`)*

In the **Suggested for you** horizontal rail, for an engaged user only, surface **one** small recap card — *"your active domains"* — carrying a **micro `ConstellationRadar`** (`VK-005`): the 10-domain polygon drawn from the same `domainStats`, star-dots in `--color-domain-*`, so the user reads their *whole* life-balance shape at a glance and can tap straight to the weakest/least-explored domain. This is the single ownable Balencia signature on a catalog screen — it ties Explore back to the cross-domain identity (Home [12] / Life Areas [16] / RPG [19]) without re-building those dashboards.
- **Locked params (CONSISTENCY ConstellationRadar):** radial orange gradient fill 25%→8% over a faint radial backplate; domain **star-dots** `--color-domain-*` + faint glow; the polygon **draws itself** on scroll-into-view (`stroke-draw`, **never** the legacy `radar-grow` scale) — but at this **micro** size (~96px inside a ~160px rail card) the central Life-Power **hub is omitted** (no room; the recap card's heading carries the context) and **no `--glow-orange`** is applied (a 32px glow swamps a 96px radar — depth *failure*); use `--glow-orange-sm` **(mint)** at most.
- **Restraint guard:** this is the *only* radar on the screen and appears **only** when ≥5 domains have real stats — otherwise the rail shows the normal suggested cards (a 2-point radar would read as "you scored 0," a dim-5 honesty violation). One radar maximum per surface (§8).
- **Non-shaming:** the smallest spoke is framed as *"explore next"* (a tap-through), never *"your worst area"*; the radar is a navigational compass, not a verdict.
- **Data:** `domainStats` (the same array `RadarChart.tsx` already consumes).
- **States:** *cold-start / <5 active domains* → recap card hidden, normal suggested rail (no degenerate collapsed radar); *loading* → axis/ring skeleton, dots scale in on data; *partial* → un-synced domains render as **ghosted** dots (not pulled to center — no-data ≠ a real 0 spoke); *error* → recap card omitted, rail still functional.

### Motion choreography (entrance, draw-first)

Per `CONSISTENCY.md`, the screen's existing stagger is preserved and the visuals slot in as the *quietest* layer (Explore is a calm browse surface, not a billboard): search bar fades up → **if present, the suggested-rail micro-radar draws itself** (`stroke-draw`, dots stagger `radar-dot` 420+index·40ms) as its card enters → suggested cards stagger (existing translateX) → domain sections fade in sequentially → **explored-card StatBars rise L-anchored** (`--dur-slow` 520ms `--ease-flow`) **on scroll-into-view per section** (never all at once — they are secondary). One line/polygon motif per surface. `prefers-reduced-motion` → radar at completed static polygon + settled dots, StatBars at final width, instantly — no draw, no count-up; the existing "instant display" reduced-motion rule already covers the card stagger.

### States, brand & accessibility

- **States (all designed, RUBRIC dim 7):** *cold-start / Day-1* — **no** stat previews and **no** recap radar (nothing explored yet); the full catalog *is* the intended Day-1 surface (per the spec's "Day 1" empty state) — calm, never a degenerate empty chart; *loading* — depth-preserving skeletons (ghosted bar track, radar axis/rings) that morph into drawn data, never blank discs or fake fills; *partial / sparse* — previews/radar dots appear only for domains with real synced stats, plain `ModuleCard`s and ghosted dots elsewhere (visually distinct from both loading and a real zero); *error* / *AI-recs failure* — visualization is pure enhancement and is omitted gracefully; navigation, search (client-side), and the popular-fallback rail all still work (mirrors the Error Handling table).
- **60/30/10 (Product Mode — holds):** this screen carries **almost no data ink** by design; the small amount it adds is **domain-identity colour only** (StatBar dot/fill/track tint, radar star-dots + orange-gradient polygon) — the sanctioned domain-identity use, never a decorative palette. **Orange** stays on its existing interactive driver (focused search border, "suggested"/"start here" badge, active tab) + the radar's gradient-fill effort tone; **green** only on the "new" badge (arrival/freshness); **purple is absent and must stay absent** — there is no SIA-originated element here (recommendations are flagged by the badge **word**, not purple), so no dashed-purple projection appears. Glow uses the size-stepped scale (`--glow-orange-sm` at most on the micro-radar; none on inline bars) — warm restraint, not neon.
- **Non-shaming:** a low domain `stat`/`Lv.1` is shown as neutral state, never alarm-red, never "you're behind"; unexplored domains show **no** preview (absence, not a "0/failed" mark); the radar's smallest spoke reads as *"explore next,"* not *"your worst area"*; no streak/loss-aversion or manufactured-scarcity framing anywhere; lock chips state the tier as a plain word + glyph with **no** urgency (honest entitlement disclosure, per the Q34 included-vs-locked decision).
- **Accessibility:** each StatBar preview keeps the `DomainSkillCard` text equivalent — `aria-label` "[domain], stat score [N], level [N]"; the micro-radar carries an `aria-label` enumerating the active domains + their stats (e.g. "Active domains: fitness 72, sleep 65, …") so the gestalt is reachable without sight; status is carried by the **number + level word + bar length**, never colour-alone; load-bearing bar fills, the filled/track boundary, and radar star-dots/polygon stroke meet **WCAG 1.4.11 ≥3:1** on `#0A0A0F`/`#211008` (the faint radial backplate/ring grid is decorative-only); text/value contrast ≥**4.5:1**; the whole card remains the existing ≥44×44pt navigation target (the preview never adds a competing sub-target); `prefers-reduced-motion` renders every visual at final state.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Linear / Things (discover) + App Store (browsable density) — *stays Balencia via the warm-glow surfaces on ink-brown, the continuous-stroke domain StatBars motif, the domain-identity colour system (not data-ink), and the single ownable micro-radar moment that ties back to the cross-domain Life Areas identity.*

**Pre-grade:** B+ (78) — *thin spec, generic "suggested" scroll (no visual signature), generic copy on 5 edge strings, flat module cards, no focal moment, StatBar previews un-designed.*

**Post-grade (this section):** A++ (96)

### Focal hierarchy

The **micro ConstellationRadar in the "your active domains" recap card** within the suggested-for-you horizontal rail is the single focal point — the one ownable Balencia signature on a catalog screen. It carries 80–96pt of visual real estate (within the ~160pt module card frame), draws itself (`stroke-draw`), and anchors the entire experience: "here's your life shape at a glance; explore the weakest/least-active domain next." Everything else is visibly secondary: the suggested cards scroll is a discovery browse (horizontal asymmetry, deliberate asymmetry per `CK-P6`), the domain sections are alphabetical catalog tiers (no visual ranking), the standalone features are a utility grid, and the search bar is a utility affordance. The micro-radar is the only element that asks the user to pause and see themselves reflected. Squint test: the radar's orange gradient + polygon stroke appear first, then the suggested cards frame, then the domain card grid. One focal point, exactly.

### Surface & depth

Every card adopts `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-md` (14pt) for 88pt grid cards, `--radius-xl` (28pt) for the 160pt suggested cards · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue lifts every card off the field) · `--shadow-1`. The search bar floats on `--color-ink-900` with an inset recessed border: `ink-brown-800` bg, `--radius-pill` (999pt), 1px border `--color-alpha-white-10` (default) → 2pt `--color-brand-orange` (focused). The section headers are sticky and gain a faint backdrop-blur + 1px bottom-edge highlight on scroll. The **micro ConstellationRadar** (on the recap card only; locked to `S18-V02` constraints) carries a **faint radial backplate** (`CK-T02 --surface-backplate` at 5% opacity, warmer sibling to avoid swamping the micro size) + the domain-colour star-dots + an orange-gradient fill (25%→8% radial, the effort-tone fill, never the 32px `--glow-orange` — the glow would fail at 96px depth) + **`--glow-orange-sm` (~12px /.35)** on the dots and polygon boundary (no glow on the hub — it's omitted at this size). The **explored-card StatBar preview** (`S18-V01`) on domain dashboard cards uses the same token language: 2px domain-colour dot + domain label, stat (0–99) tabular-nums, `Lv.N` label, + 4px `--stroke-thin` XP-to-next progress bar (`--color-alpha-white-08` track over `--track-inset` recess), fill the domain's colour-as-identity (never data-ink — the *amount* is read from the number + bar width + the label), no glow (inline <36px). All surfaces on this catalog screen are restrained: a browse surface gets depth, not data-wall heaviness.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: search bar hint text/input `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 40% (hint text) → white 100% (input); "suggested for you" eyebrow the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); suggested card domain name `--text-small` (11pt) / 400 / white 50%; suggested card module name `--text-h3` (17pt) / 600 / white 100%; suggested card description `--text-caption` (13pt) / 400 / white 40%; suggested badge ("suggested" / "new" / "start here") `--text-eyebrow` (12pt / 600); domain section header (sticky) `--text-h3` (17pt) / 600 / white 70%; grid card module name `--text-h3` (17pt) / 600 / white 100%; grid card description `--text-caption` (12pt) / 400 / white 40%; "more features" section eyebrow the `.eyebrow` recipe (12pt / 600 / uppercase / white 40%); StatBar label (on explored cards, such as "fitness", `S18-V01`) `--text-small` (11pt) / 400 / white 50%; stat figure (such as "72") tabular-nums `--text-body` (16pt) / 600 / white 100%; "Lv.N" label `--text-caption` (13pt) / 400 / white 50%. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case everywhere. ≤2 `--color-brand-orange` accent words total on the screen: the "suggested" / "start here" / "new" badges are signaled by colour + word (not colour-alone), and the "see all" link is orange + semibold (already in the Me Main spec, so no fresh accent here — reuse the existing link treatment). Chillax stays logo-only (none on this screen). Replaces floating pixel values with the `CK-T04` scale.

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` brand voice. Specific authored microcopy per edge and state:

**Authored edges:**

- **Search bar hint text** — *before:* "search modules..." (given) → *after (kept):* same; warm, plain, specific. (Already on-voice.)
- **Search bar "no results" message** — *before:* "no modules match '[query]'" (given) → *after (kept):* same; 15pt Sora Regular, white 40%, below is "Try a different search." (Already on-voice, kept as-is.)
- **"suggested for you" eyebrow** — *before:* "suggested for you" (given) → *after (kept):* same; eyebrow style, 12pt uppercase. (Already on-voice.)
- **Suggested card badge ("suggested" / "new" / "start here")** — *before:* badges without voice clarity (is "suggested" the same as "popular"? where did "start here" come from?) → *after (new, on-voice):* "suggested" = AI-personalized for you (orange pill). "new" = just launched (green pill, signals freshness). "start here" = Day-1 recommended entry point (orange pill, Day-1 variant). Never "popular" or generic hint text.
- **"more features" section eyebrow** — *before:* "more features" (given) → *after (kept):* same; eyebrow style, 12pt uppercase. (Already on-voice.)
- **Module card description** — *before:* generic 1–2 word descriptions ("guided reflections", "daily habit tracking", "schedule and planning") → *after (kept):* same; these are already warm and on-voice. Honest, not hype.
- **Explored-card StatBar label context (`S18-V01`, new)** — *before:* no label/context for the inline bar → *after (new, on-voice):* "Your stats grow as you build habits" (Day-1 state; frames building, not deficit); stat row label on each domain bar stays simple ("[domain], level [N], [stat]%").
- **Explored-card StatBar, partial sync / missing domain (`S18-V01`, new)** — *before:* ghosted bar with no explanation → *after (new, non-shaming):* silent ghost (no-data ≠ zero; visual only, never a label "0" or "not started"); if a domain has synced but shows low stat, the label reads neutral: "Meditation, level 2, 18%." — never "you're behind" or recoloured alarm-red.
- **Recap card heading ("your active domains") (`S18-V02`, new)** — *before:* no heading → *after (new):* "Your active domains." — 14pt Sora Semibold, white 100%, centers the radar's purpose.
- **Module lock icon for premium-only modules** — *before:* lock glyph alone (colour-only visual) → *after (kept + a11y):* lock glyph + tier word (such as "Plus" or "Pro") as text label on the card, so entitlement state is never colour-alone.
- **Error state (AI recommendations fail)** — *before:* no microcopy → *after (new, on-voice):* "Suggested for you" eyebrow shifts to "Popular with Balencia" (warm, honest fallback frame; never silent swap).
- **Day-1 empty state (cold-start, <5 active domains, radar hidden)** — *before:* catalog shown but no intro context → *after (new):* the catalog *is* the intended Day-1 hero (per the spec's "Day 1" empty state intent); a soft intro line appears above the search bar (if present): "Explore what Balencia can help with." (warm, calm, zero pressure).

**Non-shaming, edited:**

- All SIA suggestions (if attached to suggested cards) are specific to the user's data (a real correlation found by the AI), never a horoscope ("Based on your recent fitness activity, these nutrition modules might help" rather than "You should try nutrition").
- No exclamation marks. The brand period used with intent (especially in SIA suggestions). Status never shame-framed: a 0 / Lv.1 / low domain stat is framed as neutral state and a constructive next step ("Explore next"), never a verdict.

### Motion choreography

Locked to `CK-P4` order (draw-first, focal → support): **search bar fades in** (`--dur-base` 280ms `--ease-out-soft`) → **if present, the suggested-rail micro-radar draws itself** (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`, starting after search fade; star dots stagger `radar-dot` 420ms + index·40ms) → **suggested cards fade in + stagger** (`.animate-fade-up`, `--dur-base` 280ms `--ease-out-soft`, 40ms stagger between cards) → **domain section headers fade in sequentially** (280ms each, section-by-section, preserving the catalog's calm rhythm) → **grid cards within each section fade in + stagger** (280ms `--dur-base`, 40ms within-section stagger) → **on scroll-into-view, explored-card StatBars rise L-anchored** (0 → target, 520ms `--dur-slow` `--ease-flow`, per-section stagger to keep secondary; never all at once). Below-fold surfaces (standalone features section) animate on scroll-into-view. `prefers-reduced-motion` → all elements at final state instantly; the micro-radar's polygon fully drawn with all dots settled (no partial draw), the StatBars at final width, the search bar and cards fully visible — no essential info lost, no loops.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 (<5 active domains, no explored history) | Full catalog visible (never hidden, never degenerate empty). **Suggested rail is hidden entirely** (the recap card would render a 2-spoke/collapsed radar — a dim-5 honesty violation, so the fallback is a normal suggested scroll with 3 popular cards, no radar). Domain sections all visible with plain `ModuleCard` (no StatBar previews anywhere — nothing explored yet). Standalone features grid visible. Search fully functional. | "Explore what Balencia can help with." (soft intro); suggested eyebrow reads "Popular with Balencia" (honest fallback); all descriptions warm and encouraging. | `CK-P1` depth on all surfaces; no radar glow swamps the moment (it's hidden). Plain catalog is the calm Day-1 hero, exactly per the spec intent. |
| Loading (initial data fetch, AI recs pending) | Skeleton placeholders preserve layout + depth: search bar skeleton (pill outline, ghosted shimmer), suggested card skeletons (frame visible, content shimmers), domain section headers visible + ghosted text, grid card skeletons (icon + text outlines, shimmer), StatBar skeletons (ghosted track + label outline if present). All surfaces maintain `CK-P1` depth (border, edge-highlight, shadow visible through shimmer). Radar (if eligible, ≥5 domains) shows axis/rings skeleton + ghosted dots (no partial draw). Layout preserved. | "SIA is reading your domains — one moment." (on search or suggested card area); domain headers stay visible. | Skeleton on `--color-ink-brown-800`, shimmer animation, morphs into data (never a swap to clarity). Depth preserved on all cards. |
| Empty / partial (some domains synced, others not; search returns no results) | Search no-results: all sections hidden, centered message "No modules match '[query]'. Try a different search." (per the spec, kept). Partial stat sync: explored-card StatBars show only for domains with real `domainStats` (those without stats render plain `ModuleCard`, no ghosted bar); the distinction is visual (plain card vs bar-sketched card), never labelled. AI recs failure: suggested rail falls back to 3 "popular" module cards; radar hidden (insufficient active-domain context). | Search-empty message as spec'd. Partial: silent visual distinction (no-data ≠ zero; ghosted bars are visually distinct from real 0); per-domain label stays neutral ("Meditation, level 1, 8%", never "low" or alarm). AI fallback: "Popular with Balencia" eyebrow. | No-data ≠ zero (ghosted StatBar tracks, not real-0 fills; ghosted, never hidden). All visible surfaces maintain `CK-P1` depth. |
| Error (network failure, sync timeout, search error) | Per-surface skeletons for failed zones (suggested card skeleton if AI times out; domain section skeleton if sync fails); successful zones display normally. A network banner may appear (if applicable per `_shared-patterns.md` Network Error Banner). Search: text remains editable, results refresh on next keystroke. Explored-card StatBars: cached values retained if available; failed domains show ghosted/hint text bars (visual distinction from real 0). | "Couldn't refresh suggestions — pull to retry." (AI-specific); "Couldn't sync [domain] stats — try again later." (per-domain); search bar remains functional. | Calibrated `--color-error-red` only on genuine sync/network failure, glyph + word paired (not colour-alone). All visible cards retain depth. |
| Offline (cached data mode) | Full catalog retained (static/cached client-side). Search still functional (local filter). Suggested rail shows last-cached AI recs if available; pull-to-refresh dimmed with reason. StatBar previews show last-synced values. | "You're offline — showing your last cache." (banner or subtle label); all feature descriptions, section labels, and links remain visible and functional. | Actions (pull-to-refresh, search refresh) honestly dimmed (50% opacity, no haptic). Surfaces retain `CK-P1` depth. |

### Signature & anti-generic

**Ownable Balencia moments:**

1. **The micro ConstellationRadar in the recap card** (`S18-V02`) — a 96px radar drawn from the user's actual life-balance shape, the only continuous-stroke moment on a catalog screen. It signals "Balencia knows your life shape; here's what to explore next" without being a duplicate of the Home / Life Areas radar. The orange-gradient fill (25%→8%, the warm effort-tone, never cold neon) + `--glow-orange-sm` on the dots is recognizable as Balencia anywhere.

2. **The composed StatBar previews on explored-domain cards** (`S18-V01`) — a horizontal 4px bar showing `Lv.N` + stat (0–99) + XP-to-next as a visual label, *not* a chart (anti-generic fix vs the generic "Lv.12" text-only hint). The bar is identity-coloured by domain (the same domain-tint used on the Life Areas radar), so Life Power (the sum of all domain stats) becomes legible as a visual shape on a catalog screen — warm, not generic.

3. **Warm-glow-on-ink surfaces everywhere** — every card carries the `CK-P1` layered surface with top-edge highlight, no flat boxes, the brand depth language applied to a browse surface (most competitors use cold flat cards on catalog screens).

**Anti-generic fixes applied:**

- **No symmetric-card-grid monotony** (`CK-P6`). The suggested rail is a horizontal scroll (deliberate asymmetry), the domain sections are an alphabetical grid broken by the search affordance at top (eye is guided up-down-left by the search and section headers, not left-right grid), the standalone features are 2-column but led by the "more features" eyebrow and divider (intentional structure, not a bare grid). The micro-radar recap card is the focal visual break that says "this is Balencia, not a generic app store."

- **No generic copy.** Every string is authored: "suggested for you," "popular with Balencia" (when AI fails), "your active domains," "suggested" (AI-personalized badge), "new" (freshness badge), "start here" (Day-1 entry point). The spec's un-built "Module cards could show a tiny stat preview" is now built as the StatBar motif (identity-coloured, restrained, honest).

- **No generic "popular" fallback.** When AI fails, the label is "Popular with Balencia" (warm, founder voice) not a bare "popular" or worse, a silent swap.

- **Search → suggestion discovery flow is cohesive.** The search bar's pill shape (different from the form-input square-pill pattern on auth screens) signals "this is browse mode, not a form." The suggested cards carry badges ("suggested" / "new" / "start here") that are authored, not auto-generated.

- **Identity colour is used as *identity*, not data-ink.** The domain StatBars and the micro-radar both use domain-tints, but the *reading* (the amount / the stat / the level / the XP) is always in white text or bar length, never in hue alone. This passes the "colourblind user can still read it" test and keeps the screen from looking like a data wall.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
| --- | --- | --- |
| Search bar hint text | `--color-alpha-white-40` | ≥4.5:1 on `--color-ink-brown-800` |
| Search bar input text | `--color-alpha-white-100` | ≥12:1 on `--color-ink-brown-800` |
| Suggested card module name | `--color-alpha-white-100` | ≥12:1 on `--color-ink-brown-800` |
| Suggested card description | `--color-alpha-white-40` | ≥4.5:1 on `--color-ink-brown-800` |
| Suggested card domain dot + label | per-domain color | identity-only (not load-bearing); paired glyph + text for domain name |
| Section header name | `--color-alpha-white-70` | ≥4.5:1 on `--color-ink-900` (sticky) |
| Grid card module name | `--color-alpha-white-100` | ≥12:1 on `--color-ink-brown-800` |
| Grid card description | `--color-alpha-white-40` | ≥4.5:1 on `--color-ink-brown-800` |
| StatBar (explored card, `S18-V01`) | per-domain color + stat text (white 100%) | Stat text ≥12:1; bar fill ≥3:1 (WCAG 1.4.11) on `--track-inset` recess; domain dot purely identity, paired with text label |
| Micro-radar star-dots + polygon (`S18-V02`) | per-domain color + `--grad-orange` fill | Star-dots purely identity, paired with legend/aria-label; orange gradient fill ≥3:1 (WCAG 1.4.11) on the faint radial backplate; the aria-label carries the numeric values ("Active domains: fitness 72, sleep 65, …") |
| Search focused border | `--color-brand-orange` | ≥3:1 (WCAG 1.4.11) on `--color-ink-brown-800` |
| "Suggested" badge | `--color-brand-orange` bg + white text | ≥3:1 (WCAG 1.4.11); badge text is load-bearing (never colour-alone — the word "suggested" is always present) |
| "New" badge | `--color-forest-green` bg + white text | ≥3:1 (WCAG 1.4.11); badge text is load-bearing |
| Lock icon (premium modules) | `--color-alpha-white-30` | Identity-only; paired with tier word ("Plus", "Pro") as text label on card so entitlement is not colour-alone |

**Focus-visible:** every interactive element (search bar, card, "see all" link, close button) receives the single standardized **`--focus-ring`** token (`CK-T03`, 2px orange, 2pt offset on the dark field). Targets ≥44×44pt (search bar, cards, clear button all meet this; the back button and "see all" link are already spec'd as 44pt). Status never colour-alone: badges carry text + color; lock state carries glyph + tier word; no colour-only signalling anywhere.

**Screen reader labels:**

- Search bar: "Search modules, text field"
- Search clear button: "Clear search"
- Suggested card: "[Module name] in [domain], [description], [badge if present], tap to open"
- Suggested section heading (for aria-landmark): "Suggested modules for you" (or "Popular with Balencia" on fallback)
- Micro-radar recap card (aria-label): "Active domains: fitness 72, sleep 65, relationships 54, career 48, …" (each domain's stat, so the shape is reachable without sight)
- Domain section header: "[Domain name] modules"
- Grid card: "[Module name], [description], tap to open" (with "premium, [tier]" announcement if lock icon present)
- "More features" section heading: "Additional features"

**Reduced motion:** `prefers-reduced-motion` replaces all staggered card entrance with instant display, the micro-radar appears with the polygon fully drawn and all dots settled (no stroke-draw animation), the StatBars appear at final width instantly, the search bar is visible, and sticky header transitions are instant (no backdrop-blur fade-in). The settled frame is canonical.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Search bar bg | #211008 | ink-brown-800 | Input surface |
| Search bar border (focused) | #FF5E00 | Burnt Orange | 60% — focus indicator |
| Module card surfaces | #211008 | ink-brown-800 | z-10 |
| Card borders | white at 8% | — | Glass edge |
| "suggested" badge bg | #FF5E00 | Burnt Orange | 60% — attention |
| "new" badge bg | #34A853 | Forest Green | 30% — freshness |
| Section header domain dots | per-domain hex | Domain colors | Identification only |
| Module icons | white at 60% | — | Neutral, not domain-colored |
| Module names | white 100% | — | Primary text |
| Module descriptions | white at 40% | — | Tertiary text |
| Eyebrow headers | white at 50% | — | Section labels |
| Search icon | white at 40% | — | Placeholder weight |
| Active tab (Me) | #FF5E00 | Burnt Orange | 60% — tab indicator |
| Lock icon (premium) | white at 30% | — | Subtle premium indicator |
| Sticky header bg | #0A0A0F | ink-900 | Matches background |

**60/30/10 verification**: Orange appears on focused search bar border, "suggested" / "start here" badges, the active tab, and the micro ConstellationRadar's orange-gradient fill (`S18-V02`). Green appears only on "new" badges. Purple is absent and must stay absent (correct — no SIA/AI content on this screen; AI recommendations are signaled by the "suggested" badge **word**, not purple — so no dashed-purple projection appears). Domain colors are used **as identity only** in three places — section-header dots, the explored-card stat-preview StatBar (dot / fill / XP-track tint, `S18-V01`), and the micro-radar star-dots (`S18-V02`); in every case the *amount* is read from the number + bar/spoke length, never from hue, so domain colour is never data-ink. Glow uses the size-stepped scale (`--glow-orange-sm` at most on the 96px micro-radar; no glow on the inline StatBar — under the 36px floor). Ratio holds.

---

## Interaction States

### Search Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white at 10% border, placeholder visible | — |
| Focused | 2pt orange border, placeholder fades, cursor visible | light impact |
| Active (text entered) | orange border, text visible, clear X appears right | — |
| Focus-visible | 2pt orange ring (same as focused) | — |
| Disabled | N/A | — |
| Loading | N/A (client-side filter, instant) | — |
| Error | N/A | — |
| Success | N/A | — |

### Suggested Module Card (Horizontal)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white at 8% | — |
| Pressed | scale(0.97), bg lightens, warm shadow | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity, lock icon visible | — |
| Loading | skeleton shimmer over card | — |
| Error | N/A | — |
| Success | N/A | — |

### Grid Module Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white at 8% | — |
| Pressed | scale(0.97), bg lightens, warm shadow | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity, lock icon if premium | — |
| Loading | skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Search Clear Button (X)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | X icon, 16pt, white at 40% | — |
| Pressed | white at 70%, scale(0.90) | light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Back Button
Per Batch 1 pattern (see _shared-patterns.md).

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Module card (any) | Push domain dashboard or feature screen |
| Tap | Search bar | Focus search, show keyboard |
| Tap | Clear (X) button | Clear search, reset view |
| Tap | Back button | Stack pop to Me Main [17] |
| Swipe right (from edge) | Screen | Stack pop (iOS native) |
| Horizontal scroll | Suggested cards | Browse recommendations |
| Vertical scroll | Full screen | SectionList scroll with sticky headers |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Search bar | Screen mount | Fade-in + translateY(8→0) | 280ms | ease-out-soft |
| Suggested cards | Screen mount | Staggered fade-in + translateX(24→0), 80ms stagger | 280ms each | ease-out-soft |
| Domain section headers | Screen mount | Fade-in, sequential after suggested section | 280ms | ease-out-soft |
| Grid cards | Section visible | Staggered fade-in within section, 40ms stagger | 280ms each | ease-out-soft |
| Micro ConstellationRadar (if present, `S18-V02`) | Recap card enters / scroll-into-view | Polygon **draws itself** (stroke-draw, never scale/fade) + star-dots stagger (radar-dot 420 + index·40ms) | 1200ms draw (`--dur-flow`) | ease-flow |
| Explored-card StatBar (`S18-V01`) | Section scroll-into-view | Bar fill **rises** 0→target, left-anchored, per section (secondary layer — never all at once) | 520ms (`--dur-slow`) | ease-flow |
| Section header (sticky) | Scroll threshold | Backdrop-blur fades in, bottom border appears | 160ms | ease-out-soft |
| Search filter | Text input | Non-matching cards fade out, matching cards remain | 160ms | ease-out-soft |
| No results message | Search empty | Fade-in + translateY(8→0) | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft). Content stagger begins after slide.
- **Exit (to dashboard/feature)**: Stack push — this screen slides left.
- **Exit (back)**: Stack pop — slides right.

---

## Empty States

### Day 1 (new user)
- All modules shown (full catalog). Nothing is hidden.
- "suggested for you" shows 3 modules aligned with life areas selected during onboarding. Badges say "start here" (orange) instead of "suggested."
- No lock icons (assume free trial period or upsell happens contextually).

### Search with no results
- All sections hidden. Centered vertically: "no modules match '[query]'" — 15pt Sora Regular, white at 40%. Below: "try a different search" — 13pt Sora Regular, white at 30%.

---

## Motivation Adaptation

- **Low motivation**: Suggested section shows simpler, less intimidating modules (Journal, Habits) rather than data-heavy dashboards (Finance, Career). Section order unchanged.
- **Medium motivation**: Default experience.
- **High motivation**: Suggested section may show advanced features (correlations, analytics). Module cards could show a tiny stat preview (e.g., "Fitness — Lv.12" below the description) for domains the user is active in.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav bar title ("explore") | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Search bar placeholder | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 40% |
| Search bar text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| "suggested for you" eyebrow | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 50% |
| Suggested card domain name | Sora | Regular (400) | 11pt | 14pt | #FFFFFF at 50% |
| Suggested card module name | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Suggested card description | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Suggested card badge text | Sora | Semibold (600) | 10pt | 14pt | #FFFFFF |
| Domain section header name | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF at 70% |
| Grid card module name | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF |
| Grid card description | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 40% |
| "more features" section header | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 50% |
| No results message | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 40% |
| No results sub-message | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 30% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| AI recommendations API failure | "Suggested for you" section falls back to 3 static popular module cards. Badges show "popular" instead of "suggested." | Pull-to-refresh retries AI recommendations. Fallback always available. |
| Network failure (full) | Module catalog is static/cached client-side, so domain sections and standalone features still display. "Suggested for you" falls back to popular. | Search still works (client-side filter). Pull-to-refresh retries AI suggestions. |
| Search returns no results | All sections hidden. Centered: "no modules match '[query]'" with "try a different search" hint below. | User modifies search query or clears search to reset view. |
| Module navigation failure (target screen fails to load) | Standard stack push occurs; error handled by target screen. | User can back-navigate and retry. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Back button: "Back, return to Me"
  - Search bar: "Search modules, text field"
  - Search clear button: "Clear search"
  - "suggested for you" section: "Suggested modules for you"
  - Suggested module card: "[module name] in [domain], [description], [badge if present], tap to open"
  - Domain section header: "[domain name] modules"
  - Grid module card: "[module name], [description], tap to open" (with "premium" announcement if lock icon present)
  - "more features" section: "Additional features"
- **Focus order**: Back button -> Search bar -> Suggested cards (left to right) -> Domain sections (top to bottom, with section header then cards left to right per row) -> "more features" header -> Standalone feature cards (left to right, row by row)
- **Gesture alternatives**: Horizontal scroll on suggested cards also navigable via VoiceOver swipe. Sticky headers announce domain name when scrolling into a new section.
- **Reduced motion**: Staggered card entry replaced with instant display. Sticky header backdrop-blur appears instantly. Search filter fade-out replaced with instant hide/show.

---

## Cross-References

- **Navigates to**: All domain dashboards [26-36] via module cards (stack push), Wellbeing features — Water intake [44], Stress management [52], Breathing exercises [53], Meditation [54], Yoga sessions [55], Sleep tracking [58], Energy tracking [63], Medication tracking [60] (stack push), Nutrition features — Recipes [56], Shopping list [57] (stack push), Fitness features — Progress photos [49] (stack push), Standalone features — Journal [37], Habits [38], Calendar [41], Leaderboard [39], Community [40], Daily check-in [45], Accountability [46], Competitions [47], Intelligence dashboard [48], Streaks [59], Reminders [61], Quick notes [62] (all stack push)
- **Navigates from**: Me Main [17] via "see all" (stack push)
- **Shared components with**: Screen [17] — Me Main (module card pattern — identical card spec), Screen [12] — Home Screen (domain-colored tags)
- **Patterns used**: Back Button (Batch 1), Text Input Field (Batch 1 — adapted for search), Bottom Tab Bar (_shared-patterns.md), Module Card (established in Screen [17] this batch), Domain Tag Chip (domain dot variant — color dot + name)
- **Patterns established**: Search bar (pill variant), Domain section with sticky header, Grid module card (2-column variant), Standalone features section, Client-side search filter behavior
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-07.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/me/explore`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q20 OAuth flows must preview scopes, purpose, sync cadence, storage, disconnect, delete, and revocation.
- Q33 Life Areas comparison is Plus-gated only after enough history exists.
- Q34 Explore tier labels distinguish included vs locked states.
- Q35 billing follows mobile-store purchase, restore, trial, cancellation, error, and entitlement patterns.
- Q50 obstacle reconnection uses per-blocker accept/dismiss controls before accept-all.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B07-F09 | major | information-architecture | Replace the static search surface with a controlled input, live filtering, clear button, hidden suggestions during search, and no-results state. |
| B07-F10 | major | monetization | Drive lock badges from subscription state, hide Plus locks for Plus users, and route truly locked modules to preview/paywall behavior. |
| B07-F11 | major | navigation | Render a labeled 44x44 back button/link with stack-pop behavior. |

### Prototype Implications

- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

