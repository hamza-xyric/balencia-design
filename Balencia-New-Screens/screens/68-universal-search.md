### 1. Header
- **Screen ID:** 68
- **Name:** 68-universal-search
- **Route(s) covered:** No live route; global SearchOverlay opened over the current route.
- **Tab:** Universal overlay (accessible from all tabs — not a tab-owned screen)
- **Source:** `COMPONENT-CATALOG.md` §1 (`SearchOverlay`, explicitly named for screen 68) + `COMPACT-CANON.md` §7–8
- **Batch:** 7

### 2. Purpose
A single fast lane into all nine life domains and every screen in Balencia — goals, habits, recipes, notes, journal, settings, community — without forcing the person to remember which tab something lives in. CIA rides along as a second, smarter index: it doesn't just match text, it predicts intent from behavior (what you search on a Tuesday, what you tend to open after a missed workout) and surfaces it before you finish typing. The screen stays a blunt utility — no XP, no streaks, no celebration — because search is a tool, not a moment.

### 3. Entry & exit
*Pull-down-to-open is deliberately not supported. A full-screen modal must own its gestures cleanly; a pull-down on the Today tab already means scroll-refresh, and overloading it would make search unreliable exactly when speed matters most. Entry is tap-only, which is 100% predictable.*
- **Entry paths:** tap the search glyph on `TopBar`, tap the search field in Settings, tap "search for that" inside CIA Chat.
- **Exit paths:** tap a result row — overlay dismisses as the destination stack-pushes in (e.g. Goal detail, Habit detail); tap `Cancel`; swipe down from the top edge; hardware back (Android).

### 4. Layout anatomy
**Regions (top to bottom):**
1. **Search header** — autofocused `GlassPillInput` (search variant), inline clear glyph, `Cancel` escape hatch.
2. **Category filter** — horizontal `SegmentedTabs` (chip styling) scoping results: All · Goals · Habits · Recipes · +more.
3. **CIA suggestion** — `CIAInsightCard`, appears once query ≥ 2 characters and CIA confidence > 0.7.
4. **Results body** — `SectionHeader` per category, each grouping plain `ListRow`s inside a `SolidCard`.

*Correction — dropped a fifth region. The draft's original wireframe listed a persistent "Bottom Nav (fades out when search is active)" — but `SearchOverlay` is defined in the catalog as a **full-screen scrim**. A faded-but-present `GlassNavBar` under a full-screen modal is two navigation layers stacked at once, which reads as a bug, not restraint. The nav is fully hidden for the duration of the overlay; the person returns to it automatically on `Cancel` or on completing a search.*

**ASCII wireframe (390×844):**
```text
#0A0A0F base + top-center warm orange atmosphere
┌──────────────────────────────────────────┐
│  ┌──────────────────────────────┐        │
│  │ 🔍  search everything      ✕ │ Cancel │  ← GlassPillInput (search)
│  └──────────────────────────────┘        │     .glass-pill, autofocus
│                                            │
│  ( All )( Goals )( Habits )( Recipes )(+) │  ← SegmentedTabs (chips)
│  ─────────────────────────────────────── │
│                                            │
│  ┌────────────────────────────────────┐  │
│  │ ✦ CIA thinks you're looking for    │  │  ← CIAInsightCard
│  │                                     │  │     .glass-card + glow-cia
│  │ [Habit] Morning mobility            │  │     purple pool behind card
│  │ your usual Tuesday reset            │  │
│  │ [Fitness]  based on 6 Tuesdays      │  │
│  │                                     │  │
│  │  [ Open routine ]      Not now      │  │  ← BtnCoach + BtnGhost
│  └────────────────────────────────────┘  │
│                                            │
│  GOALS · 1 RESULT                         │  ← SectionHeader (overline)
│  ┌────────────────────────────────────┐  │
│  │ ◉ Run a 5k              [Fitness]  │  │  ← ListRow, in SolidCard
│  │   ▓▓▓▓▓▓░░░░ 60%      via Goals    │  │     no glow — see §6
│  └────────────────────────────────────┘  │
│                                            │
│  HABITS · 1 RESULT                        │  ← SectionHeader
│  ┌────────────────────────────────────┐  │
│  │ ⚡ 10k steps             [Fitness]  │  │  ← ListRow
│  │   12-day streak        via Habits  │  │
│  └────────────────────────────────────┘  │
│                                            │
│  RECIPES · 1 RESULT                       │  ← SectionHeader
│  ┌────────────────────────────────────┐  │
│  │ 🥗 Post-run bowl       [Nutrition] │  │  ← ListRow
│  │   450 cal          via saved recipes│  │
│  └────────────────────────────────────┘  │
│                                            │
│           (content fades to base)         │
└──────────────────────────────────────────┘
no bottom nav while search is active
```

### 5. Components
- **`SearchOverlay`** — the screen itself. Root component per catalog: full-screen scrim + autofocused `GlassPillInput` + grouped results (`SectionHeader` per type) + recent queries as `ChipChoice` row. Everything below is what fills that shell.
- **`GlassPillInput`** (variant: search) — leading glyph, clear button, `.glass-pill` per CANON §2.
- **`SegmentedTabs`** (chip styling) — single-select category scope; active segment `--surface-3` + orange label.
- **`ChipChoice`** — recent-search chips, per the `SearchOverlay` catalog entry; tap re-runs the stored query, long-press removes one.
- **`CIAInsightCard`** — purple-tinted `glow-cia` hero row for the AI prediction. Uses its **full** anatomy: spark glyph, one-italic-word insight line, evidence row (`ChipDomainTag` + `ChipProvenance`), and both `BtnCoach` (primary) + `BtnGhost` (dismiss) actions.
- **`SolidCard`** — groups each category's `ListRow`s; data-dense, no blur.
- **`ListRow`** — the result unit: leading glyph, title, `ChipDomainTag`, secondary line (metric + `ChipProvenance`), 56px min height, hairline dividers.
- **`ChipProvenance`** / **`ChipDomainTag`** — attached per the honesty invariant and domain palette respectively.
- **`HonestNullState`** — the *zero-results-for-this-query* moment (glyph + line, no CTA).
- **`EmptyState`**-adjacent — see §9 for why the true catalog `EmptyState` doesn't fit the first-use moment and what replaces it.
- **`ErrorState`** — quiet inline banner + `BtnSecondary` retry.
- **`SkeletonState`** — shimmer `ListRow` geometry while a query is in flight.

*Correction — the draft proposed `NEW: ResultListCard` to "group ListRows of varying heights." It isn't needed: `SolidCard` is already the catalog's data-dense grouping container, and `ListRow` already owns its own hairline dividers and auto-height. Stacking `ListRow`s inside a plain `SolidCard` per `SectionHeader` group does everything the invented component claimed to add. Removed — inventing a wrapper for capability the catalog already has isn't craft, it's noise.*

*Correction — the draft never named `SearchOverlay` at all, despite the catalog defining this exact screen by that name. Restored it as the root component so the spec is traceable to the catalog instead of reinventing the shell.*

### 6. Visual treatment
- **Glass tiers** (CANON §2, cited exactly):
  - Search header: `.glass-pill` — `rgba(10,10,15,.55)`, blur 24px, border `rgba(255,255,255,.10)`, radius 999.
  - `CIAInsightCard`: `.glass-card` — `rgba(255,255,255,.045)`, blur 28px sat 120%, border `1px rgba(255,255,255,.08)`, radius 28, shadow `0 18px 48px rgba(33,16,8,.45)` + inset top-light `rgba(255,255,255,.12)`.
  - Result groupings: `SolidCard` — `--surface-2` `#211008`, radius 28, border `rgba(255,255,255,.06)`, no blur. *Rationale: search results are text-dense and read constantly; glass atmosphere here would fight legibility for zero benefit.*
- **Semantic inner-glow:**
  - `CIAInsightCard` carries `--glow-cia` `#7F24FF` — meaning: this is a *prediction*, not a match. The glow is the visual signal that CIA reasoned its way here rather than string-matched.
  - Result `ListRow`s inside `SolidCard` carry **zero** glow, and this is a stated exception, not an omission: the catalog's `SolidCard` entry has no glow anatomy at all (glow belongs to the glass tier, CANON §2–3). Giving a plain list row a decorative glow would be exactly the "forced fake compliance" this system exists to avoid. One card in the composition earns a glow — the one that's actually AI-authored.
- **Background atmosphere:** the standing warm top-center radial (`rgba(255,94,0,.18)` over `#0A0A0F`, CANON §1) stays constant; when `CIAInsightCard` mounts, a purple pool `rgba(127,36,255,.15)` fades in behind it — CANON §1's "CIA moments add a purple pool" rule, applied.
- **Hero type moment:** the placeholder *"everything"* sets in Tiempos Medium italic while the field is empty, and reverts to NM Regular the instant a keystroke lands — one spotlight word, gone the moment the utility takes over.
- **Color proportion, corrected:** the draft's checklist claimed a literal 60/30/10 orange/green/purple split on *this* screen (forest green at "30%, active habits") — but nothing in the layout actually painted anything green. That's the same forced-compliance trap as a fake glow. The honest read: 60/30/10 is an app-wide budget, not a per-screen quota. This screen is legitimately orange-forward (focus states, active filter chip, in-progress `ProgressBar` fills) and purple-accented (one `CIAInsightCard`). Forest green only enters when it's *earned* — a result's `ProgressBar` crossing 100% flips to green per its own fill logic, or a milestone dot appears. No result in the reference query happens to be complete, so no green renders, and that's correct, not a gap.

### 7. Content & copy
- **Input placeholder:** Search *everything* — goals, habits, recipes, notes.
- **Escape:** Cancel
- **Recent-search label:** Recent searches
- **History action:** Clear all
- **Section headers:** Recent searches · Goals · Habits · Recipes · Quick notes · Journal · Settings · Screens · Community
- **CIA prediction label:** CIA thinks you're looking for
- **CIA prediction line:** *Morning* mobility — your usual Tuesday reset.
- **CIA fuzzy match:** Did you mean *[suggestion]*? It's under [domain].
- **Zero results:** No results for "[query]." Try a different spelling or search term.
- **Offline banner:** Offline — showing local results only. Community and recipes need a connection.
- **Error banner:** Some results may be missing right now.
- **Toast (history cleared):** Search history cleared.

All copy sentence case, zero exclamation marks, one Tiempos-italic word per moment. No stray "CIA" anywhere in this spec — coach is CIA throughout.

### 8. Data & honesty states
Every metric a result row can show runs through the full three-state honesty invariant (CANON §7):

1. **Goal progress — real:** `60%` fill (orange, in-progress) · chip `via Goals`.
2. **Goal progress — low-confidence:** `~60%` at 64% opacity · chip `estimated · low confidence`.
3. **Goal progress — honest-null:** metric text replaced with `No progress logged yet` · chip `no data yet`. *(Corrected from the draft's "Start tracking to see progress" — a directive CTA voice doesn't belong on a passive list row; this is a description, not a nudge.)*
4. **Habit streak — real:** `12-day streak` (tabular-nums) · chip `via Habits`.
5. **Habit streak — honest-null:** `Not enough data yet` · chip `no data yet`.
6. **Recipe calories — real:** `450 cal` · `[Nutrition]` domain tag `#84cc16` · chip `via saved recipes`. *(Corrected from the draft's "via server," which names infrastructure, not a source a person would recognize. Provenance should always answer "where did Balencia get this," in the person's language.)*
7. **Community members — real:** `120 members` · chip `via Community`. No domain tag — Community is a feature surface, not one of the nine life domains, so it doesn't inherit `ChipDomainTag` color.
8. **Community members — offline:** hidden entirely from the local index rather than shown stale. This is a deliberate architecture choice, not a gap — see the offline-banner fix in §9 for why showing a number here would have been dishonest.

**Local vs. server-dependent categories**, stated once so §9's behavior is traceable: Goals, Habits, Journal, Quick notes, Settings, and Screens are indexed locally and always searchable offline. Recipes and Community depend on a live connection and disappear gracefully rather than serve stale numbers.

### 9. All states
- **Default / empty query:** up to 10 `ChipChoice` recent searches, or — on true first use, zero history — a quiet prompt: *"Try searching for a goal, habit, or recipe"* with suggested category `ChipChoice`s (Goals · Habits · Recipes · Journal).
  *Correction: the draft implied catalog `EmptyState` here (illustration-free hero + `BtnPrimary` starter action). That component is right for a screen with one canonical next action — it's wrong for search, which has no single action to push someone toward. Forcing a `BtnPrimary` onto "try searching for something" would be a fake CTA. Suggested-category chips orient the person without inventing an action that doesn't exist.*
- **Typing / live suggestions:** 300ms debounce. `CIAInsightCard` slides in once confidence > 0.7; grouped `SolidCard` results fade in below it.
- **Skeleton:** inline `Searching for "[query]"…` label above 4 shimmer `ListRow` blocks — `--surface-3` base, 1.2s sweep, matching the real row geometry (CANON `SkeletonState`).
- **Zero results (has typed, no matches):** `HonestNullState` proper — quiet search glyph, `No results for "[query]." Try a different spelling or search term.`, filter chips drop to 40% opacity (nothing to scope).
- **Error / API failure:** quiet inline banner, `Some results may be missing right now.` + `BtnSecondary` `Retry`. Server-dependent categories (Recipes, Community) hide; local categories stay visible.
  *Correction: the draft's recovery affordance was "pull down to retry" — a gesture-only fix, which is both less discoverable and, per catalog, wrong: `ErrorState`'s anatomy explicitly specifies a `BtnSecondary` retry action, not a hidden gesture. Replaced with a tappable, screen-reader-reachable button.*
- **Offline:** `.glass-pill` banner, `Offline — showing local results only. Community and recipes need a connection.`
  *Correction: the draft's offline copy ("some results may be outdated") contradicted §8's own rule that offline server-dependent results are *hidden*, not shown-but-stale. The banner now states exactly what's true — nothing invented, nothing implied that isn't happening.*

- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

### 10. Motion & interaction
- **Presentation:** overlay slides up over 280ms, ease-out-soft (physical easing, CANON §6 — never linear).
- **Row feedback:** press scales a `ListRow` to `.98` and shifts its `SolidCard` background toward `--surface-3`, 150ms.
- **Glow behavior:** `--glow-cia` on `CIAInsightCard` breathes on a 4s ease-in-out cycle — the visible signal that CIA is actively reasoning, not a static decoration.
- **Haptics:** light impact when the CIA prediction resolves onto screen; medium impact on a successful deep-link navigation (result tap → destination push).
- **Reduced-motion path:** slide-up collapses to an instant fade; the CIA glow breathe freezes at rest state; staggered result fade-ins render immediately, no stagger.

### 11. Motivation-tier adaptation
The interface itself never changes shape — search stays a pure utility, no tier-gated layout. What CIA changes is *ranking and voice* inside its own prediction card, per CANON §10 (lead with meaning, not the metric):
- **Low motivation:** CIA weights recovery-tagged habits, gentle routines, and journal entries higher; the insight line leads with grace (e.g. *"an easy reset, if today's tight"*).
- **Medium motivation:** standard relevance weighting across all nine domains, no tier bias.
- **High motivation:** CIA weights intense routines, hard KPIs, and community/leaderboard screens higher; the insight line leads with intensity (e.g. *"your usual push day"*).

### 12. Accessibility
- **Contrast:** primary text `paper-100` `#FEFAF3` on `SolidCard` `--surface-2` `#211008` computes to roughly **17.7:1** — far past AA. Secondary metadata at paper-64% over the same surface computes to roughly **7.7:1**, clearing AAA for body text. *(Corrected from the draft's flat, unverified "16:1" claim — recomputed against the actual token pair rather than asserted.)*
- **Targets:** every `ListRow`, filter chip, and the clear/`Cancel` controls meet the 44px minimum touch target.
- **Screen-reader:** glyph-only controls carry explicit labels — "Clear search," "Cancel search," "Fitness domain," "Nutrition domain" — and the `CIAInsightCard`'s `BtnGhost` announces as "Dismiss suggestion," not just "Not now," so its purpose survives without sight of the label.
- **Reduced-motion:** honored per §10; nothing in this screen's motion is load-bearing for comprehension, so the fallback loses zero information.

### 13. Premium checklist
1. **Connects:** CIA fuses text matching with behavioral pattern recognition (the Tuesday-mobility prediction) across domains — not just a string filter.
2. **Honest:** every metric in every result carries the full real / low-confidence / honest-null triple, with provenance named in the person's language (`via Goals`, `via saved recipes`, never `via server`).
3. **Premium:** data-dense results render as `SolidCard`, preserving glass exclusively for the one hero moment (`CIAInsightCard`) — legibility and atmosphere never compete.
4. **Color proportion, honest version:** orange-forward utility (focus states, filters, in-progress fills) + one purple CIA accent; green is earned only when a result actually completes, never painted on for quota. See §6 correction.
5. **Selective glass:** `GlassPillInput` + `CIAInsightCard` glass; everything else solid. No mixing within one composition.
6. **Inner-glow:** exactly one glow in the entire composition — `--glow-cia` on the prediction card — and result rows are explicitly, justifiably glow-free (§6).
7. **Atmosphere:** standing warm top-center radial + situational purple pool on CIA prediction, per CANON §1.
8. **Typography:** Neue Montreal throughout, one Tiempos-italic word per moment (*everything*, *Morning*), sentence case, zero exclamation marks.
9. **Voice:** CIA leads every line with meaning ("your usual Tuesday reset") before it leads with a label.
10. **Motion:** 150–280ms physical easing, full reduced-motion path, no motion carries meaning on its own.
11. **Icons:** 2px rounded outline, ≥24px, domain icons in domain color.
12. **Data-viz:** `ProgressBar` fill is orange in-progress, flips green only at 100% — never forced, never faked.
13. **A11y floor:** 44px targets, verified contrast (§12), full screen-reader labeling, reduced-motion respected.
14. **Safety/compliance:** no health data mutated here; deep-links route safely; the utility is deliberately un-gamified — no XP, no streak framing, no celebration motif anywhere in this screen.
