# Screen Design: Achievement Gallery

**Screen**: 71 of 77
**File**: 71-achievement-gallery.md
**Register**: Product Mode
**Primary action**: Browse earned achievements and track progress toward locked ones (tap achievement card)
**Tab**: Me
**Navigation**: Stack depth 2+ (pushed from Me Main [17] quick links grid, RPG Character [19] achievement badge tap, or Celebration Overlay [42] "view all" link). Back button returns to previous screen.

---

## Purpose

The Achievement Gallery is the user's trophy room — a visual, collectible-style display of every badge and milestone earned across all 9 life domains, plus progress toward locked achievements. This screen closes the gamification feedback loop: users see what they've accomplished, what's within reach, and what's still locked. It reinforces engagement breadth (achievements span all domains) and depth (progressive tiers within each domain). The gallery must feel premium and satisfying — earned badges should glow and feel weighty, while locked badges create aspirational pull without feeling punishing.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Achievement summary strip — total earned count, completion percentage ring, current streak badge
2. Domain filter chips — narrow by domain or view all
3. Achievement grid — visual grid of badge cards (earned glow, locked dimmed)
4. Achievement detail bottom sheet — full badge info on tap

**User flow**:
- **Arrives from**: Me Main [17] via "Achievements" quick link card, RPG Character [19] via achievement badge tap in Streak & Rewards section, Celebration Overlay [42] via "view all achievements" link, Notification tap (new achievement earned)
- **Primary exit**: Previous screen via stack pop (back button)
- **Secondary exits**: Achievement Detail Bottom Sheet (modal present), Domain Dashboard [26-36] via "go to [domain]" CTA in detail sheet

---

## Layout

**Scroll behavior**: FlatList (homogeneous achievement cards, virtualized for performance)
**Tab bar visible**: Yes

### ASCII Wireframe

```
+-----------------------------+
|      Status Bar (44pt)      |
|-----------------------------|
|  [<-]   Achievements        |  <- nav header, 44pt
|-----------------------------|
|                             |  <- 16pt top padding
|  +---------+---------+---+ |
|  | [ring]  | 47      | 🔥 | |  <- summary strip
|  | 47/120  | earned  | 42 | |     ~80pt
|  |  39%    |         |days| |
|  +---------+---------+---+ |
|                             |  <- 16pt gap
|  [All] [Fitness] [Nutrition]|  <- domain filter chips
|  [Finance] [Career] [...]   |     scrollable horizontal
|                             |  <- 16pt gap
|  +--------+  +--------+    |
|  | [🏆]   |  | [🏆]   |    |  <- 2-column grid
|  | First   |  | 7-Day  |    |
|  | Workout |  | Streak |    |
|  | Fitness |  | General|    |
|  | ✓earned |  | ✓earned|    |
|  +--------+  +--------+    |  <- 12pt gap
|  +--------+  +--------+    |
|  | [🔒]   |  | [🔒]   |    |
|  | 30-Day  |  | Meal   |    |
|  | Streak  |  | Master |    |
|  | General |  | Nutrit.|    |
|  | 18/30   |  | 8/20   |    |  <- progress toward locked
|  +--------+  +--------+    |
|  ...                        |
|                             |  <- 64pt bottom padding
|-----------------------------|
|  Today   SIA   Goals   Me   |
+-----------------------------+
```

### Component Stack (top to bottom)

1. **Navigation Header** — 44pt
   - Back chevron (left), "Achievements" title (center)

2. **Achievement Summary Strip** — 16pt top padding + 80pt = 96pt
   - Completion ring + earned count + streak badge in a single card

3. **Domain Filter Chips** — 16pt gap + 36pt = 52pt
   - Horizontal scrollable chip row: All, Fitness, Nutrition, Finance, Career, Relationships, Spirituality, Learning, Creativity, Wellbeing, General

4. **Achievement Grid** — 16pt gap + FlatList of achievement cards
   - 2-column grid, 12pt gap between items
   - Earned achievements first, then in-progress (partially complete), then locked

5. **Bottom Padding** — 64pt (clears tab bar)

---

## Components

### Achievement Summary Strip
- **Purpose**: At-a-glance progression snapshot for all achievements
- **Data source**: `GET /api/v1/achievements/summary` — returns total, earned, streak_badge
- **Visual treatment**: Single ink-brown-800 card, --r-xl (28pt), full-width minus 32pt, 16pt internal padding, 1pt border white at 8%. Three sections side by side:
  - **Left — Completion ring**: 48pt diameter circular progress ring. Stroke 4pt. Track: white at 10%. Fill: orange (#FF5E00). Center: earned/total count in 13pt Sora Bold white. Below ring: completion percentage in 11pt Sora Regular, white at 40%.
  - **Center — Earned count**: Large number (24pt Sora Bold, white, tabular-nums) + "earned" label (12pt Sora Regular, white at 50%). Vertically centered.
  - **Right — Streak badge**: Flame icon (16pt, orange) + current streak count (18pt Sora Bold, white) + "days" (11pt Sora Regular, white at 50%). Vertically centered.
- **Size**: full-width minus 32pt x 80pt

### Domain Filter Chips
- **Visual treatment**: Same as Filter Chip Row pattern from Screen [13] and Screen [70]. Horizontal scrollable, 36pt height, --r-pill.
- **Active**: domain color bg at 100%, white text. Inactive: ink-brown-800, white at 60%.
- **"All" chip**: active state uses orange (#FF5E00) bg.
- **Single-select**: Only one filter active at a time. "All" is default.
- **Each domain chip**: shows domain color dot (6pt) inline before name when inactive.

### Achievement Card
- **Purpose**: Visual badge display with earned/locked state
- **Visual treatment**: ink-brown-800 bg, --r-xl (28pt), 1pt border (varies by state). Full card content:
  - Badge icon area: 80pt height, centered. Contains the achievement badge artwork.
    - **Earned**: Badge icon (48pt) rendered in full color with domain color accent. Subtle warm glow behind icon (domain color at 10%, 64pt radial blur).
    - **In-progress**: Badge icon (48pt) rendered in white at 30% (desaturated). No glow. Small circular progress ring (24pt) overlaid at bottom-right of icon.
    - **Locked**: Lock icon (24pt, white at 15%) centered. Badge icon hidden.
  - Achievement name: 14pt Sora Semibold, white (earned) or white at 40% (locked), center-aligned, 8pt below icon area
  - Domain tag: 11pt Sora Regular, domain color at 60% (earned) or white at 30% (locked), center-aligned, 4pt below name
  - Status indicator:
    - Earned: "earned" text (11pt Sora Semibold, Forest Green #34A853) + small checkmark (10pt)
    - In-progress: progress text (11pt Sora Regular, orange #FF5E00), e.g., "18/30 days"
    - Locked: "locked" text (11pt Sora Regular, white at 20%)
  - Earned date (earned only): 10pt Sora Regular, white at 25%, 2pt below status. "May 15, 2026"
- **Border states**:
  - Earned: 1pt border domain color at 20%
  - In-progress: 1pt border white at 8%
  - Locked: 1pt border white at 5%
- **Size**: ((screen width - 32pt - 12pt) / 2) x ~180pt
- **Sort order**: Earned (newest first) → In-progress (highest % first) → Locked (alphabetical)
- **Gestures**: Tap → opens Achievement Detail Bottom Sheet

### Achievement Detail Bottom Sheet
- **Presentation**: Standard bottom sheet (ink-brown-800 bg, --r-lg top corners, drag handle). ~70% screen height.
- **Content**:
  - Badge hero: 96pt badge icon, centered, with glow effect for earned badges (domain color at 12%, 80pt radial). Locked badges show the badge silhouette at white 15%.
  - Achievement name: 20pt Sora Semibold, white, center-aligned, 16pt below icon
  - Achievement description: 15pt Sora Regular, white at 70%, center-aligned, 8pt below name. 2-3 sentences explaining what this badge represents.
  - Domain pill: domain color at 15% bg, domain color text, 12pt Sora Semibold, --r-pill, 28pt height. Center-aligned, 12pt below description.
  - Tier indicator (if tiered achievement):
    - Horizontal row of tier dots/badges: Bronze → Silver → Gold
    - Each tier: 32pt circle. Earned: full color. Current: pulsing ring. Locked: white at 10%.
    - Tier name below each: 10pt Sora Regular, white at 40%
  - **Earned state**:
    - Earned date: "Earned on May 15, 2026" — 13pt Sora Regular, white at 50%, 16pt below tier/domain
    - Share row: "Share this achievement" with share icon, tappable (system share sheet)
  - **In-progress state**:
    - Progress bar: full-width minus 32pt, 6pt height, --r-pill. Track: white at 8%. Fill: orange (#FF5E00). 16pt below tier/domain.
    - Progress label: "18 of 30 days completed" — 13pt Sora Regular, white at 60%, 6pt below bar
    - Remaining: "12 more days to go" — 13pt Sora Regular, orange, 4pt below label
  - **Locked state**:
    - Requirements: "To unlock:" header (14pt Sora Semibold, white at 60%), followed by bullet list of requirements (13pt Sora Regular, white at 50%). Each bullet: white at 30% dot.
    - CTA: "start working toward this" — orange text link, 14pt Sora Semibold, navigates to relevant domain dashboard
  - **Rarity indicator** (all states): "12% of users have earned this" — 11pt Sora Regular, white at 30%, bottom of content. Shows percentage of user base who earned it.
- **CTAs** (conditional):
  - Locked: "go to [domain]" orange pill CTA (48pt, full-width minus 32pt) fixed at bottom
  - Earned: no fixed CTA (view-only)
  - In-progress: "keep going" motivational text (not a button, just 14pt Sora Semibold, orange, center-aligned)
- **Gestures**: Drag-to-dismiss, tap CTAs

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav title | Sora | 600 (Semibold) | 17pt | 22pt | White |
| Summary earned count | Sora | 700 (Bold) | 24pt | 30pt | White |
| Summary labels | Sora | 400 (Regular) | 12pt | 16pt | White at 50% |
| Summary ring count | Sora | 700 (Bold) | 13pt | 18pt | White |
| Filter chip text | Sora | 600 (Semibold) | 13pt | 18pt | White at 60% (inactive) / white (active) |
| Card achievement name | Sora | 600 (Semibold) | 14pt | 18pt | White (earned) / white at 40% (locked) |
| Card domain tag | Sora | 400 (Regular) | 11pt | 16pt | Domain color at 60% |
| Card status text | Sora | 600 (Semibold) | 11pt | 16pt | Green (earned) / orange (progress) |
| Detail name | Sora | 600 (Semibold) | 20pt | 26pt | White |
| Detail description | Sora | 400 (Regular) | 15pt | 22pt | White at 70% |
| Rarity indicator | Sora | 400 (Regular) | 11pt | 16pt | White at 30% |

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | |
| Card surface | #211008 | ink-brown-800 | |
| Completion ring fill | #FF5E00 | brand-orange | 60% role |
| Active "All" filter chip | #FF5E00 | brand-orange | |
| Active domain filter chip | per-domain hex | domain colors | Domain identification |
| Earned status text | #34A853 | forest-green | 30% role — success/completion |
| In-progress status text | #FF5E00 | brand-orange | 60% role — active progress |
| Earned badge glow | per-domain hex at 10% | domain colors | Subtle pride effect |
| Earned card border | per-domain hex at 20% | domain colors | Subtle domain identification |
| Locked badge icon | white at 15% | | Dimmed, aspirational |
| Locked text | white at 20% | | Very subtle |
| Detail progress bar fill | #FF5E00 | brand-orange | |
| Detail CTA | #FF5E00 bg, white text | brand-orange | |
| Tier — bronze | #CD7F32 | | Earned tier |
| Tier — silver | #C0C0C0 | | Earned tier |
| Tier — gold | #FFD700 | | Earned tier |
| Streak flame icon | #FF5E00 | brand-orange | |
| Share icon | white at 50% | | Secondary action |

**60/30/10 verification**: Orange on completion ring, active filters, progress indicators, CTAs, streak flame. Green on earned status text (success). Purple absent (no SIA/AI content — pure gamification). Domain colors on badge glows and filter chips per domain color rules. Tier metals are neutral metallic tones (bronze/silver/gold), not competing with 60/30/10 palette. Ratio holds.

---

## Interaction States

### Achievement Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default (earned) | Domain-tinted border, full-color badge | — |
| Default (locked) | Dim border, lock icon | — |
| Pressed | Scale(0.97), bg lightens slightly | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Active | Domain color bg, white text | — |
| Inactive | ink-brown-800, white at 60% | — |
| Pressed | Scale(0.95), bg brightens | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Summary Strip Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, standard display | — |
| Pressed | Scale(0.98), bg lightens | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### "Go to [domain]" CTA (Detail Sheet)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange pill, white text | — |
| Pressed | Darker orange, scale(0.97) | Medium impact |
| Success | N/A (navigates away) | — |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop |
| Tap | Filter chip | Toggle filter, refresh grid |
| Tap | Achievement card | Open Achievement Detail Bottom Sheet |
| Tap | "go to [domain]" (in detail) | Navigate to domain dashboard, dismiss sheet |
| Tap | Share row (in detail) | System share sheet |
| Drag down | Detail bottom sheet | Dismiss sheet |
| Scroll | Achievement grid | Standard scroll |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Summary strip | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Completion ring | Screen mount | Arc draws from 0 to current % | 520ms | ease-flow |
| Achievement cards | Screen mount | Staggered fade-in, 40ms per card | 280ms each | ease-out-soft |
| Earned badge glow | Card enters viewport | Glow fades in 0→10% opacity | 280ms | ease-out-soft |
| Filter change | Tap chip | Grid crossfade | 280ms | ease-out-soft |
| Detail bottom sheet | Open | Slide up from bottom | 520ms | ease-flow |
| Detail bottom sheet | Close | Slide down | 280ms | ease-out-soft |
| New achievement | Just earned (from celebration) | Badge scales 0.8→1.0 with gold particle burst | 600ms | ease-flow |

---

## Empty States

### Day 1 (no achievements earned)
- Summary strip: ring at 0%, "0 earned", streak shows "0 days"
- Grid shows all achievements as locked, sorted alphabetically
- Motivational banner above grid: "Start completing goals and building streaks to earn your first badge." — 14pt Sora Regular, white at 50%, center-aligned in an ink-brown-800 card with --r-xl, 16pt padding

### Single domain filtered with no achievements
- Empty grid area: domain color icon (32pt, at 20%) + "No [domain] achievements yet" (15pt Sora Semibold, white) + "Complete [domain] goals to start earning badges" (13pt Sora Regular, white at 50%)

---

## Accessibility

- Achievement cards: accessibility label "[name], [domain], [earned/locked/in-progress], [progress if applicable]"
- Filter chips: role "button", selected state announced
- Summary strip: accessibility label "47 of 120 achievements earned, 39 percent complete, 42 day streak"
- Detail sheet: full content readable by screen reader in order
- Tier indicators: accessibility label "Tier [N] of 3, [bronze/silver/gold], [earned/current/locked]"

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Achievement list fails to load (network) | Centered error state: trophy icon (48pt, white at 15%) + "Couldn't load achievements" (17pt Sora Semibold, white) + "Check your connection and try again" (14pt Sora Regular, white at 50%) + "retry" orange text link (14pt Sora Semibold, 44pt touch target). Summary strip shows skeleton shimmer. Filter chips visible but non-functional. | Tap "retry" to re-fetch. Pull-down-to-refresh also available. |
| Summary strip fails to load | Summary strip shows skeleton shimmer (ink-brown-800 card, animated gradient). Achievement grid may still render from cached data. | Silent retry on scroll or re-focus. Tap strip to retry manually. |
| Achievement detail fails to load | Detail bottom sheet opens with skeleton placeholder (shimmer). After 5 seconds: "Couldn't load achievement details" (15pt Sora Regular, white at 50%) + "retry" link (orange). Close button remains functional. | Tap "retry" in the sheet. Dismiss and re-tap card also works. |
| "Go to [domain]" navigation fails | CTA button briefly flashes error-red border (400ms). Toast: "Couldn't open [domain]. Try again." (14pt Sora Regular, white, ink-brown-800 bg, auto-dismiss 4s). | Tap CTA again. If persistent, dismiss sheet and navigate manually via tab bar. |
| Share action fails | Toast: "Couldn't share this achievement" (13pt Sora Regular, white at 80%, ink-brown-800 bg, auto-dismiss 3s). Share row returns to default state. | Tap share again to retry. |
| Badge image fails to load | Card shows domain color circle (48pt, at 20% opacity) as fallback instead of badge artwork. Card remains fully interactive. Name, domain tag, and status still render. | No user action needed. Image retries on next scroll into viewport. |
| Partial load (some achievements load, others fail) | Successfully loaded cards render normally. Failed cards show skeleton shimmer that resolves to text-only card (name + domain + status, no badge icon). | Scroll away and back triggers silent retry. |
| Offline mode | Banner below filter chips: "You're offline — showing cached achievements" (13pt Sora Regular, white at 40%, cloud-offline icon 14pt). Progress data may be stale. | Banner dismisses when connection restores. Data refreshes silently. |

---

## Motivation Adaptation

| Level | Adaptation |
|-------|------------|
| **Low** | Locked/unearned achievements are hidden entirely — grid shows only earned badges to celebrate progress rather than highlight gaps. Summary strip emphasizes "X earned" count and current streak without showing total possible. "Almost there" badges (>75% progress) promoted to top of grid with subtle green progress ring to show attainability. |
| **Medium** | Default layout — earned and locked achievements both visible. Locked badges show progress percentage and "X away" hint. Summary strip shows earned/total ratio. Standard sort order (earned first, then by progress %). |
| **High** | Full gallery with competitive framing — rarity percentages visible on all badges ("Top 5% of users"). Locked achievements show detailed requirement breakdowns. Tier progression (bronze → silver → gold) emphasized with "next tier" call-outs. Summary strip includes "rank among friends" if social features active. |

---

## Cross-References

- **Navigates to**: Achievement Detail Bottom Sheet (modal present), Domain Dashboards [26-36] (via "go to [domain]" CTA in detail sheet, stack push)
- **Navigates from**: Me Main [17] via "Achievements" quick link (stack push), RPG Character [19] via achievement badge tap in Streak & Rewards section (stack push), Celebration Overlay [42] via "view all" link (stack push), Push notification for new achievement
- **Shared components with**: Screen [70] — Exercise Library (2-column grid layout, filter chip row), Screen [19] — RPG Character (achievement badges in Streak & Rewards), Screen [13] — Goals List (Filter Chip Row pattern), Screen [42] — Celebration Overlay (achievement celebration trigger)
- **Patterns used**: Filter Chip Row (Screen 13), Back Button (Batch 1), Bottom Sheet (_shared-patterns.md), 2-Column Grid (Screen 70)
- **Patterns established**: **Achievement Card** — 2-column grid card with badge icon, name, domain tag, earned/locked/progress state. Earned badges get domain-colored glow and border. **Achievement Detail Bottom Sheet** — ~70% height sheet with badge hero, description, tier indicator, domain pill, rarity percentage. Contextual CTA and progress display based on earned/locked/in-progress state. **Achievement Summary Strip** — compact card with completion ring + earned count + streak badge. **Tier Indicator** — horizontal row of bronze/silver/gold circles showing tiered achievement progression.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-09.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/tabs/me/achievements`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q17 progress photos are private, encrypted, user-deletable, and AI analysis is premium opt-in.
- Q20 OAuth flows need scope and revocation clarity.
- Q21 Data Sources may be a demo/no-live-sync trust placeholder for prototype acceptance.
- Q39 achievement density adapts for low-motivation users.
- Q43 Knowledge Graph V1 is a guided insight map.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B09-F13 | critical | retention | Make filters stateful, render cards as buttons, and implement earned/progress/locked detail sheets. |
| B09-F14 | major | product-sense | Load the full achievement set or align the summary with visible/cached data; add loading, partial-load, and offline states. |
| B09-F15 | major | accessibility | Increase chip hit areas, expose selected state, and label each card with name, domain, state, and progress. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

