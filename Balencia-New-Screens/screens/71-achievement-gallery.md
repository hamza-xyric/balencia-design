# 71-achievement-gallery — Hi-Fi Spec

### 1. Header
- **Screen ID:** 71
- **Name:** Achievement Gallery
- **Route(s) covered:** `/achievements`
- **Tab:** Me
- **Source:** Functional Content Brief (Achievement Gallery)
- **Batch:** 9

### 2. Purpose
A visual trophy room displaying all badges and milestones earned across all 9 life domains. It closes the gamification feedback loop by reinforcing engagement breadth and depth, driving aspirational pull without shaming mechanics. It connects gamification back to core app actions via deep-links to domain dashboards.

### 3. Entry & exit
**Entry Paths:**
- Me Main screen via "Achievements" quick link card.
- RPG Character screen via achievement badge tap.
- Celebration Overlay via "view all achievements" link.
- Push Notification tap (new achievement earned).

**Exit Paths:**
- Previous screen (via standard stack pop/back button).
- Domain Dashboards (via "go to [domain]" CTA in the Detail Bottom Sheet).
- Native OS Share Sheet (via "Share this achievement" in Detail Bottom Sheet).

### 4. Layout anatomy
**Regions (Top-to-Bottom):**
1. **TopBar:** Transparent header with back chevron and H1 title. Gains `.glass-pill` backdrop on scroll.
2. **Summary Hero Region:** A composite `GlassCard` (hero variant) containing three data zones: left (Completion Ring), top-right (Earned This Month KPI), bottom-right (Streak/Momentum Bar).
3. **Domain Coverage Strip:** Secondary visualization below the hero card showing domain spread.
4. **Domain Filter Chips:** Horizontal, single-select scrollable row.
5. **Achievement Grid:** Virtualized 2-column grid of achievement cards.
6. **GlassNavBar:** Floating bottom pill navigation.

**ASCII Wireframe (390x844):**
```text
      [ 71-achievement-gallery · 390x844 ]
    ┌─────────────────────────────────────────┐
    │ ‹                       Achievements    │ <- TopBar
    ├─────────────────────────────────────────┤
    │ ╭─────────────────────────────────────╮ │ 
    │ │  ◯ 39%    ▲ +3 earned this mo.      │ │ <- Hero GlassCard
    │ │  47/120   12 total                  │ │
    │ │  ─────────────────────────────────  │ │
    │ │  ▰▰▰▱▱  Your streak starts today — 0 │ │
    │ ╰─────────────────────────────────────╯ │
    │ ╭─────────────────────────────────────╮ │
    │ │  Fitness [12]  Nutrition [8]  +More ›│ │ <- Coverage Strip
    │ ╰─────────────────────────────────────╯ │
    │                                         │
    │  [ All ‸ ]  [ Fit ]  [ Nutri ]  [ $$$ ] │ <- Filter Chips
    │ ──────────────────────────────────────│ │
    │  ╭──────────╮  ╭──────────╮            │
    │  │  [Badge] │  │  [Badge] │            │
    │  │          │  │          │            │ <- Grid Body
    │  │  Earned  │  │ 15 of 30 │            │
    │  ╰──────────╯  ╰──────────╯            │
    │  ╭──────────╮  ╭──────────╮            │
    │  │  [Badge] │  │  [Badge] │            │
    │  ╰──────────╯  ╰──────────╯            │
    ├─────────────────────────────────────────┤
    │      [ Today ] [ CIA ] [ Goals ] [Me]   │ <- GlassNavBar
    └─────────────────────────────────────────┘
```

### 5. Components
- **TopBar**: Transparent/scroll variant.
- **GlassCard**: Hero variant for the summary region.
- **GlassStatCard**: Used for the "Earned This Month" KPI inside the hero card.
- **ProgressRing**: Used for the total completion visual.
- **MomentumBar**: Used for the current streak status.
- **SectionHeader**: Overline labels for grid sections.
- **ChipDomainTag**: Used for filter chips.
- **BadgeTile**: Achievement cell (earned, locked, to-discover).
- **Sheet**: Bottom sheet for achievement details.
- **ListRow**: For formatting unlock requirements in the detail sheet.
- **SolidCard**: For the domain coverage strip.
- **GlassNavBar**: Global navigation.
- **NEW: CoverageStripRow**: A `SolidCard` containing `ChipDomainTag`s that feature a 2px micro-arc outline tracking domain density. *Rationale:* The catalog lacks a dedicated component for horizontally surfacing categorical density arcs.
- **Correction (CIA):** Per the critical brief flag, all purple UI elements (specifically the proposed "Ask CIA" button in the Detail Sheet) are **omitted entirely** to preserve the 60/30/10 register of this pure gamification screen. Purple `--glow-cia` is removed from this surface.

### 6. Visual treatment
- **Glass tiers:** 
  - Summary Hero Region: `.glass-card` (elevated hero). 
  - Filter Chips & Detail Sheet: `.glass-pill` and `.glass-frost`.
  - Data/Density (Coverage Strip, Badge Grid): Solid `--surface-2` cards. Selective glass strictly applied.
- **Semantic inner-glow (color + meaning):**
  - Hero Summary Card: `--glow-you` (#FF5E00). *Meaning:* Represents the user's cumulative effort and active streak momentum.
  - In-Progress Grid Tiles: `--glow-you` (#FF5E00). *Meaning:* Highlights active metrics the user is currently pushing toward.
  - Earned Grid Tiles: `--glow-done` (#34A853). *Meaning:* Denotes completion, positive delta, and realized growth.
- **Background atmosphere:** Base `--bg-base` (#0A0A0F) with the mandatory soft warm radial glow top-center (`rgba(255,94,0,.18)` to transparent 60%) and 3-4% soft-light grain overlay.
- **Hero type moment:** The percentage calculation inside the center of the hero ProgressRing uses Display (NM Medium 500, 34px) with a single Tiempos italic emphasis word.

### 7. Content & copy
All strings in CIA voice: sentence case, no exclamation marks, exactly one emphasis word per moment wrapped in `*asterisks*` (rendered as Tiempos italic).
- **Hero Ring:** `47 of 120 *earned*`
- **Hero KPI:** `12 badges *earned* this mo.` (delta: `+3 vs last month`)
- **Streak Momentum:** `[X] days to the 60-day *legend*`
- **Cold-start streak:** `Your *streak* starts today — 0 of 3`
- **Detail Sheet (Earned):** `Earned on *May 15, 2026*`
- **Detail Sheet (In-Progress):** `[Z] more *days* to go`
- **Detail Sheet (To-Discover):** `To *unlock*:` / `start working toward this`
- **Empty State:** `Start completing goals and building *streaks* to earn your first badge.`
- **Filtered Empty State:** `No [domain] achievements *yet*` / `Complete [domain] goals to start earning badges`

### 8. Data & honesty states
- **Total Earned / Completion %:**
  - *Real:* `47 / 120` (`39%`) + chip text `balencia summary`.
  - *Low-confidence:* `47 / 120` rendered at 64% opacity + chip text `estimated · low confidence`.
  - *Honest-null:* Ghosted ring track visible with `0` in center + text `Not enough data yet`.
- **Earned This Month & Delta:**
  - *Real:* `12` (`+3`) + chip text `balencia summary`.
  - *Low-confidence:* `12` rendered at 64% opacity + `estimated · low confidence`.
  - *Honest-null:* `—` + `Not enough data yet`.
- **Streak Count / Days to Next:**
  - *Real:* `[X] days to the 60-day legend` + chip text `synced today`.
  - *Low-confidence:* `[X] days` (64% opacity) + `estimated · low confidence`.
  - *Honest-null:* `Your streak starts today` (No fabricated history shown).
- **Domain Coverage Spread:**
  - *Real:* Visualized arcs / numbers + chip text `balencia summary`.
  - *Low-confidence:* Values rendered at 64% opacity + `estimated · low confidence`.
  - *Honest-null:* Blank dots/arcs + `Not enough data yet`.
- **Individual Badge Progress:**
  - *Real:* `[X] of [Y] days` + chip text `synced today` (or applicable app source).
  - *Low-confidence:* `[X] of [Y] days` (64% opacity) + `estimated · low confidence`.
  - *Honest-null:* `to discover` (no fabricated metrics).
- **Rarity Percentage:**
  - *Real:* `[X]% of users have earned this` + chip text `global metrics`.
  - *Low-confidence:* `[X]%` (64% opacity) + `estimated · low confidence`.
  - *Honest-null:* `Rarity not calculated yet` (Never an invented percentage).

### 9. All states
- **Default:** Hero data drawn, grid loaded, earned badges sorted by date, in-progress by %.
- **Skeleton:** Depth-preserving shimmer blocks matching layout. Hero ring shows axis/ghost track, grid tiles show ghost circles.
- **Empty (First-use):** Gauge at 0%, KPI shows 0, streak reads `Your streak starts today`. All tiles are "to discover" (ghosted rarity-outlined silhouettes, not padlocks) sorted by closeness-to-unlock.
- **Empty (Filtered):** Centered domain icon with text: `No [domain] achievements yet`.
- **Error:** Graceful degradation prioritizing cached data. Error toasts appear warm/non-alarming (`Couldn't load summary.`, `Check your connection and try again`). Badge image failure falls back to a domain-colored circle.
- **Success (New Badge Arrival):** Grid tile scales 0.8 -> 1.0 with particle burst colored identically to the badge's rarity tier (restrained, no generic gold flashing).
- **Offline:** `OfflineBanner` (`glass-pill`) below filter chips reads `You're offline — showing cached achievements`. Pull-to-refresh visibly disabled.

### 10. Motion & interaction
- **Physical easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for all UI framing and sheets.
- **Feedback (150-250ms):** Filter chips crossfade the grid in 150ms. Cards scale to `.98` on press. 
- **Glow behavior:** Earned BadgeTiles have a steady, soft `--glow-done` breathe (4s ease loop). In-progress tiles feature a `--glow-you` breathe. 
- **Draw-First Choreography:** On mount, the Hero completion ring draws 0 -> final `%` while the center number counts up. Grid tiles cascade in with a staggered fade-up; in-progress micro-arcs fill *after* their host tile lands.
- **Haptics:** Light impact on card/chip press. Medium impact on "go to [domain]" CTA press.
- **Reduced-motion path:** Particle bursts and hero count-ups disabled (data simply fades in). Glow breathe static.

### 11. Motivation-tier adaptation
- **Low density:** Undiscovered/locked badges are entirely hidden. The grid emphasizes currently "in-progress" (>75% complete) badges at the top with prominent green progress rings to highlight attainability rather than gaps.
- **Medium density:** Shows Earned and In-Progress (>40% complete) only. To-discover silhouettes are hidden to reduce cognitive load.
- **High density:** Shows all Earned, In-Progress, and To-discover badges. Grid sorting strictly prioritizes closeness-to-unlock to maximize aspirational pull.

### 12. Accessibility
- **AA+ contrast pairs:** `--paper-100` (#FEFAF3) over `--bg-base` (#0A0A0F) and `--surface-2` (#211008). Paper-64% used strictly for secondary metadata. 
- **44px targets:** All `ChipDomainTag` filters and `BadgeTile` cards meet the 44px minimum tap target (grid spacing provides ample separation).
- **Screen-reader labels:** The Rarity micro-arc and the Hero ProgressRing center percentage are grouped with explicit `aria-label` text (e.g., "47 out of 120 achievements earned. 39 percent complete.") so glyph-only data is legible to VoiceOver/TalkBack.

### 13. Premium checklist
1. **Connects (Cross-pillar):** Yes. Surfaces domain coverage spread and explicitly deep-links back to core domain dashboards.
2. **Honest (Real source/null):** Yes. Every metric features provenance chips or honest-null fallbacks (no fabricated global rarity percentages).
3. **Premium (Funded product):** Yes. Data-dense regions use SolidCards to preserve legibility; hero moments use selective glass with physical easing and choreographed draws.
4. **60/30/10 Color Rule:** Intact. CIA/`--glow-cia` purple stripped entirely from the brief's contradiction; strictly using Burnt Orange (active) and Forest Green (done).
5. **Selective Glass:** Perfectly tiered. Hero/Sheet = glass; Coverage/Grid = SolidCard.
6. **One Glow per Card:** Strictly mapped (`--glow-you` for active/hero, `--glow-done` for earned).
7. **Type System:** One Display moment (hero %). One Tiempos italic emphasis per string. No exclamations.
8. **Component Catalog Adherence:** Used exactly as defined, with one necessary visual component cleanly flagged as NEW.
9. **Data-Viz Integrity:** Solid lines/arcs for user progress, ghost outlines for honest-empty.
10. **Honest Gamification:** No fake streaks; ghosted rarity outlines instead of padlocks.
11. **Motivation-Tier Logic:** Dynamically adapts UI density to protect user motivation.
12. **A11y Floor:** 44px targets, AA contrast, screen-reader labels on visualizations.
13. **Native Mobile Patterns:** Native OS share sheet, standard back stack pop, pull-to-refresh disable logic honored.
14. **Motion Constraints:** Transform/opacity only. Honors reduced-motion. No infinite flashing.
