# Screen Design: Exercise Library

**Screen**: 70 of 77
**File**: 70-exercise-library.md
**Register**: Product Mode
**Primary action**: Browse and select exercises (tap exercise card)
**Tab**: Today (within Fitness stack) or Goals (within workout stack)
**Navigation**: Stack depth 2+ (pushed from Fitness Dashboard [26] or Workout Detail [27]). Back button returns to previous screen.

---

## Purpose

The Exercise Library is a searchable, filterable database of all available exercises. Users browse here to discover new exercises, learn proper form, and select exercises for workout planning. The library supports the backend's 500+ exercise database with muscle group targeting, equipment requirements, difficulty levels, and instructional content. When accessed from Workout Detail [27], exercises can be added directly to the current workout.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Search bar -- find a specific exercise instantly
2. Filter chips -- narrow by muscle group, equipment, difficulty
3. Exercise cards -- browsable grid of exercises with key info
4. Exercise detail bottom sheet -- full exercise information on tap

**User flow**:
- **Arrives from**: Fitness Dashboard [26] via "browse exercises" shortcut or FAB sub-action, Workout Detail [27] planning mode via "add exercise" button, Explore [18] via Fitness section
- **Primary exit**: Previous screen via stack pop (back button)
- **Secondary exits**: Exercise detail bottom sheet (modal present), Workout Detail [27] if adding exercise to workout

---

## Layout

**Scroll behavior**: FlatList (homogeneous exercise cards, virtualized for performance with 500+ items)
**Tab bar visible**: Yes

### ASCII Wireframe

```
+-----------------------------+
|      Status Bar (44pt)      |
|-----------------------------|
|  [<-]    Exercise Library   |  <- nav header, 44pt
|-----------------------------|
|                             |  <- 16pt top padding
|  +-------------------------+|
|  | Search exercises...     ||  <- search bar, 44pt
|  +-------------------------+|
|                             |  <- 12pt gap
|  [All] [Upper] [Lower]     |  <- filter chip row (muscle groups)
|  [Core] [Cardio] [Full]    |     scrollable horizontal
|                             |  <- 12pt gap
|  [Any equip] [None]        |  <- equipment filter row
|  [Dumbbells] [Barbell]     |
|                             |  <- 16pt gap
|  532 exercises              |  <- result count, left-aligned
|                             |  <- 12pt gap
|  +------------+  +--------+|
|  | [img]       |  | [img]  ||  <- 2-column grid
|  | Bench Press |  | Squat  ||
|  | Chest       |  | Legs   ||
|  | ***         |  | **     ||  <- difficulty dots
|  +------------+  +--------+|  <- 12pt gap
|  +------------+  +--------+|
|  | [img]       |  | [img]  ||
|  | Deadlift   |  | Lunge  ||
|  | Back        |  | Legs   ||
|  | ***         |  | **     ||
|  +------------+  +--------+|
|  ...                        |
|                             |  <- 64pt bottom padding
|-----------------------------|
|  Today   SIA   Goals   Me   |
+-----------------------------+
```

### Component Stack (top to bottom)

1. **Navigation Header** -- 44pt
   - Back chevron (left), "Exercise Library" title (center)

2. **Search Bar** -- 16pt top padding + 44pt = 60pt
   - Full-width minus 32pt, pill-shaped search input

3. **Muscle Group Filter Chips** -- 12pt gap + 36pt = 48pt
   - Horizontal scrollable chip row: All, Upper Body, Lower Body, Core, Cardio, Full Body

4. **Equipment Filter Chips** -- 12pt gap + 36pt = 48pt
   - Horizontal scrollable chip row: Any Equipment, No Equipment, Dumbbells, Barbell, Kettlebell, Resistance Band, Machine, Cable

5. **Result Count** -- 16pt gap + 16pt = 32pt
   - "[N] exercises" left-aligned

6. **Exercise Grid** -- 12pt gap + FlatList of exercise cards
   - 2-column masonry grid, 12pt gap between items

7. **Bottom Padding** -- 64pt (clears FAB + tab bar)

---

## Components

### Search Bar
- **Visual treatment**: Same as Screen [25] Help Center and Screen [29] Meal Detail search bar. Full-width minus 32pt, 44pt tall, ink-brown-800 bg, --r-md (14pt). Left: search icon (16pt, white at 40%). Placeholder: "search exercises..." (15pt Sora Regular, white at 40%). Focused: 2pt orange border. Text: 15pt Sora Regular, white.
- **Behavior**: Filters exercise list in real-time (debounced 300ms). Searches exercise name, muscle groups, and equipment.

### Muscle Group Filter Chips
- **Visual treatment**: Same as Filter Chip Row pattern from Screen [13]. Horizontal scrollable, 36pt height, --r-pill.
- **Active**: orange bg, white text. Inactive: ink-brown-800, white at 60%.
- **Single-select**: Only one muscle group active at a time. "All" is default.

### Equipment Filter Chips
- **Visual treatment**: Same chip pattern, 36pt height.
- **Multi-select**: Multiple equipment types can be active simultaneously (filters as AND for muscle group + OR for equipment).
- **Active**: orange bg, white text. Inactive: ink-brown-800, white at 60%.

### Result Count
- **Visual treatment**: 13pt Sora Regular, white at 40%, left-aligned, 16pt left margin.
- **Updates in real-time** as filters change.

### Exercise Card
- **Purpose**: Browsable exercise entry with key info at a glance
- **Visual treatment**: ink-brown-800 bg, --r-xl (28pt), 1pt white at 5% border. Full card content:
  - Image area: top half, 120pt height, --r-xl top corners, ink-900 bg placeholder if no image. Exercise illustration/photo with object-fit cover.
  - Exercise name: 15pt Sora Semibold, white, left-aligned, 12pt horizontal padding, 12pt below image
  - Primary muscle group: 12pt Sora Regular, white at 50%, left-aligned, 4pt below name
  - Difficulty indicator: 3 dots (8pt circles, 4pt gap). Filled: orange. Empty: white at 15%. Left-aligned, 8pt below muscle group, 12pt bottom padding.
    - Beginner: 1 dot filled
    - Intermediate: 2 dots filled
    - Advanced: 3 dots filled
- **Size**: ((screen width - 32pt - 12pt) / 2) x ~220pt
- **Gestures**: Tap → opens Exercise Detail Bottom Sheet

### Exercise Detail Bottom Sheet
- **Presentation**: Standard bottom sheet (ink-brown-800 bg, --r-lg top corners, drag handle). ~85% screen height.
- **Content**:
  - Hero image/animation: 200pt, full-width, shows exercise form illustration or video thumbnail
  - Exercise name: 20pt Sora Semibold, white
  - Difficulty badge: pill (beginner/intermediate/advanced), colored by difficulty
  - Muscle groups: domain-style tag chips (fitness-red at 15% bg, fitness-red text) for each targeted muscle
  - Equipment: 13pt Sora Regular, white at 50%, icon + text
  - "How to perform" section:
    - Numbered instruction steps (15pt Sora Regular, white at 70%)
    - Each step: step number (15pt Sora Semibold, orange) + instruction text
  - "Common mistakes" section (collapsible):
    - Warning icon (16pt, amber) + mistake description (14pt Regular, white at 60%)
  - "Variations" section (collapsible):
    - List of variation names, tappable to switch to that exercise's detail
  - Target areas visual: simple body outline with highlighted muscle groups (colored in fitness-red)
- **CTAs** (conditional):
  - When accessed from Workout Detail [27]: "add to workout" orange pill CTA (48pt, full-width minus 32pt) fixed at bottom
  - When browsing: no fixed CTA
- **Gestures**: Drag-to-dismiss, tap "add to workout" (if present)

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav title | Sora | 600 (Semibold) | 17pt | 22pt | White |
| Search placeholder | Sora | 400 (Regular) | 15pt | 20pt | White at 40% |
| Filter chip text | Sora | 600 (Semibold) | 13pt | 18pt | White at 60% (inactive) / white (active) |
| Result count | Sora | 400 (Regular) | 13pt | 18pt | White at 40% |
| Card exercise name | Sora | 600 (Semibold) | 15pt | 20pt | White |
| Card muscle group | Sora | 400 (Regular) | 12pt | 16pt | White at 50% |
| Detail exercise name | Sora | 600 (Semibold) | 20pt | 26pt | White |
| Detail instruction step | Sora | 400 (Regular) | 15pt | 22pt | White at 70% |
| Detail step number | Sora | 600 (Semibold) | 15pt | 22pt | #FF5E00 |

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | |
| Card surface | #211008 | ink-brown-800 | |
| Active filter chip | #FF5E00 | brand-orange | 60% role |
| Difficulty dots (filled) | #FF5E00 | brand-orange | |
| Difficulty dots (empty) | white at 15% | | |
| Muscle group chips (detail) | #EF4444 at 15% bg, #EF4444 text | fitness-red | Domain color |
| Step numbers | #FF5E00 | brand-orange | |
| Add to workout CTA | #FF5E00 bg, white text | brand-orange | |
| Common mistakes icon | #F59E0B | amber | Warning |

**60/30/10 verification**: Orange on filter chips, difficulty dots, step numbers, CTA. Green absent (no success states on this screen). Purple absent (no SIA on this screen — pure utility). Fitness-red appears on muscle group tags only, per domain color rules. Ratio holds.

---

## Interaction States

### Exercise Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard card appearance | -- |
| Pressed | Scale(0.97), bg darkens slightly | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### "Add to Workout" CTA (Detail Sheet)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange pill, "add to workout" white text | -- |
| Pressed | Darker orange, scale(0.97) | Medium impact |
| Success | Green glow (600ms), text changes to "added" with checkmark | Success notification |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop |
| Tap | Search bar | Focus, raise keyboard |
| Tap | Filter chip | Toggle filter, refresh results |
| Tap | Exercise card | Open Exercise Detail Bottom Sheet |
| Tap | "add to workout" (in detail) | Add exercise to workout, dismiss sheet |
| Drag down | Detail bottom sheet | Dismiss sheet |
| Scroll | Exercise grid | Standard scroll, FAB hides on scroll down |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Exercise cards | Filter change | Crossfade grid content | 280ms | ease-out-soft |
| Detail bottom sheet | Open | Slide up from bottom | 520ms | ease-flow |
| Detail bottom sheet | Close | Slide down | 280ms | ease-out-soft |
| Result count | Filter change | Number crossfade | 160ms | ease-out-soft |

---

## Empty States

### No results (search/filter yields nothing)
- Centered: search icon (48pt, white at 15%) + "no exercises found" (17pt Sora Semibold, white) + "try different filters or search terms" (14pt Regular, white at 50%)

### Day 1 (exercise database loading)
- Skeleton cards (ink-brown-800, shimmer animation) in 2-column grid

---

## Accessibility

- Search bar: accessibility label "Search exercises by name, muscle group, or equipment"
- Filter chips: role "button", selected state announced
- Exercise cards: accessibility label "[name], targets [muscle], [difficulty] difficulty"
- Detail sheet: full content readable by screen reader in order
- "Add to workout" button: accessibility label "Add [exercise name] to current workout"

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Exercise list fails to load (network) | Centered error state: cloud-offline icon (48pt, white at 15%) + "Couldn't load exercises" (17pt Sora Semibold, white) + "Check your connection and try again" (14pt Sora Regular, white at 50%) + "retry" orange text link (14pt Sora Semibold, 44pt touch target). Search bar and filter chips remain visible but non-functional. | Tap "retry" to re-fetch. Pull-down-to-refresh also available. |
| Search returns no results | Centered empty state (see Empty States section). No error styling — this is expected behavior, not a failure. | User adjusts search query or clears filters. |
| Exercise detail fails to load | Detail bottom sheet opens with skeleton placeholder (shimmer). After 5 seconds: "Couldn't load exercise details" (15pt Sora Regular, white at 50%) + "retry" link (orange). | Tap "retry" in the sheet. Dismiss sheet and re-tap card also works. |
| "Add to workout" fails | CTA button briefly flashes error-red border (400ms). Text changes to "Try again" for 2 seconds, then reverts. Toast: "Couldn't add exercise. Try again." (14pt Sora Regular, white, ink-brown-800 bg, auto-dismiss 4s). | Tap CTA again to retry. Exercise remains selectable. |
| Image fails to load (card thumbnail) | Image area shows ink-900 bg with generic dumbbell icon (24pt, white at 15%) centered. Card remains fully interactive. | No user action needed — functional without image. Retry on next scroll into viewport. |
| Partial load (some cards load, others fail) | Successfully loaded cards render normally. Failed cards show skeleton shimmer that resolves to a simplified card (name + muscle group text only, no image). | Scroll away and back triggers a silent retry for failed cards. |
| Offline mode | Banner below filter chips: "You're offline — showing cached exercises" (13pt Sora Regular, white at 40%, cloud-offline icon 14pt). Only previously viewed exercises available. Search works against local cache. | Banner dismisses automatically when connection restores. Full library reloads silently. |

---

## Motivation Adaptation

**N/A — Utility Screen.** Exercise Library is a content browsing tool, not a motivational surface. It renders identically regardless of the user's motivation level. No Low/Medium/High variants needed.

---

## Cross-References

- **Navigates to**: Exercise Detail Bottom Sheet (modal present), Workout Detail [27] (via "add to workout" action, stack pop with data)
- **Navigates from**: Fitness Dashboard [26] via stack push, Workout Detail [27] via stack push ("add exercise"), Explore [18] via Fitness section
- **Shared components with**: Screen [25] — Help Center (Search Bar), Screen [13] — Goals List (Filter Chip Row), Screen [29] — Meal Detail (Search Bar)
- **Patterns used**: Search Bar (Screen 25), Filter Chip Row (Screen 13), Back Button (Batch 1)
- **Patterns established**: **Exercise Card** -- 2-column grid card with image, name, muscle group, difficulty dots. Reusable for any exercise browsing context. **Exercise Detail Bottom Sheet** -- ~85% height sheet with hero image, instructions, variations, target areas. Contextual CTA when accessed from workout planning. **Difficulty Indicator** -- 3-dot system (filled orange, empty white at 15%) for beginner/intermediate/advanced rating.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-12.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/domains/exercise-library`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q19 journal keeps basic writing/search free and gates AI/voice features.
- Q27 exercise library preserves source context.
- Q28 split meal detail and food logging into explicit modes/routes.
- Q29 finance details pass explicit type plus ID/context.
- Q30 workout planning/logging is separate from immersive active workout.
- Q44 spirituality must support unconfigured and multiple-belief states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B12-F11 | critical | information-architecture | Implement debounced search, filter state, result-count updates, full virtualized exercise data, and empty/loading/error states. |
| B12-F12 | critical | navigation | Make exercise cards semantic targets that open the Exercise Detail bottom sheet with conditional Add to workout behavior. |
| B12-F13 | major | information-architecture | Preserve source stack context, set the correct active tab, and render Back as a labeled 44px link/button. |
| B12-F14 | major | accessibility | Add aria-pressed/selected semantics, 44px hit areas, a search label, card labels, and focus states. |

### Prototype Implications

- Treat 2 critical findings as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

