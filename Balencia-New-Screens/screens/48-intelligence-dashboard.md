# Screen 48: Intelligence dashboard

## 1. Header
- **Screen ID:** 48
- **Name:** Intelligence dashboard
- **Route(s) covered:** `/wellbeing/insights`
- **Tab:** Hidden — this is a stack-push detail screen, not a tab root. Reached from Today, CIA, or Explore.
- **Source:** Functional content brief (Batch 7), elevated to premium craft pass
- **Batch:** 7
- **Tier:** Premium-only. This is Balencia's flagship cross-domain synthesis surface — the productized form of the Life Correlation Matrix — so it is the one screen where a full-screen `PaywallLock` gate is the *correct* default, not an afterthought.

## 2. Purpose
The command center where CIA turns scattered logs and synced signals into one honest, whole-life picture: a single daily score, the contradictions between what you reported and what your devices measured, the cross-domain patterns behind your best days, and where things are headed. It exists to build trust through transparency, not to perform intelligence it doesn't have — every number on this screen either has a source or admits it doesn't have one yet.

*Correction carried from the draft brief:* the coach is named **CIA** throughout; the source brief used the wrong coach name in one spot and it has been corrected here and is not repeated.

## 3. Entry & exit
- **Entry paths:**
  - Explore [18] — module card stack push
  - CIA Chat [09] — deep-link from a referenced insight bubble
  - Home [12] — proactive insight card stack push
  - Life Areas Overview [16] — "see insights" link stack push
- **Exit paths:**
  - Back to Explore [18] / Home [12] / Life Areas [16] — chevron pop, returns to whichever screen pushed it
  - CIA Chat [09] — tab switch with the tapped insight pre-loaded as chat context
  - Goal Detail [14] — stack push, from tapping a pillar sparkline tied to an active goal
  - Domain Dashboards [26–36] — stack push, from tapping a pillar sparkline or a Weekly Report tile
  - Knowledge Graph [72] — stack push, from the closing nav-link card

## 4. Layout anatomy
Vertically scrolling `ScrollView`, 390×844pt reference frame. Regions top to bottom:
1. **TopBar** — sticky, transparent over atmosphere, gains `.glass-pill` backdrop on scroll.
2. **Hero card** — daily score ring, trend delta, timestamp, 4 pillar mini-trends.
3. **Active contradictions** — `SectionHeader` + stacked `CIAInsightCard` alerts (hidden entirely when none exist).
4. **Correlations** — one `SolidCard` housing the compact matrix and its ranked coaching rows together.
5. **Trend** — `SolidCard` with time-selector and line chart.
6. **Best day formula** — `GlassCard`, factor checklist + segmented progress.
7. **Weekly report** — collapsed `KPIRow` headline, expands to a `BentoGrid` of all domains.
8. **Predictions** — `GlassStatCard`, tomorrow's projected score + basis.
9. **Recent insights** — `CIAInsightCard` stack with feedback.
10. **Knowledge graph link** — single-row nav card, closes the scroll.

*Two mobile-reality corrections made to the draft:*
- **No `FABQuickLog`.** Canon scopes quick-log to Today-tab screens only (§8); this is a hidden-tab stack push, so the FAB in the draft's wireframe was wrong and has been removed.
- **No `GlassNavBar`.** A stack-pushed detail screen (same family as Goal Detail [14] and the Domain Dashboards [26–36] it pushes to) hides the floating tab pill; the TopBar chevron is the sole, sufficient exit affordance. Full width is reserved for content.
- **Added:** a data-and-consent entry point. Canon §8 requires any screen touching third-party or health data (this one surfaces WHOOP, manual logs, and AI inference throughout) to expose a consent/revoke path — the draft had none. The TopBar's trailing glyph now opens a menu with "manage data sources," which routes to the relevant `ConsentCard` settings surface.

```text
┌─────────────────────────────────────────┐  390×844
│  ‹  Intelligence                    ⋯   │  TopBar (sticky, glass-pill on scroll)
│                                          │  ⋯ → manage data sources (consent)
│        ░░░ warm atmosphere glow ░░░     │
│ ┌──────────────────────────────────────┐│
│ │  YOUR DAILY INTELLIGENCE             ││  Hero — GlassCard hero, glow-you
│ │                                      ││
│ │     ╭───╮                           ││
│ │    │ 87  │   +3 from yesterday      ││  ProgressRing 120pt
│ │     ╰───╯   updated 2h ago          ││
│ │                                      ││
│ │  [Fit ↗] [Nutr →] [Well ↘] [Fin ↗]  ││  GlassStatCard sparkline ×4
│ └──────────────────────────────────────┘│
│                                          │
│  ACTIVE CONTRADICTIONS                  │  SectionHeader
│ ┌──────────────────────────────────────┐│
│ │ ◆ You report 8h sleep, but WHOOP     ││  CIAInsightCard, glow-cia
│ │   shows 5.5h.                       ││
│ │   sleep log vs. WHOOP data           ││
│ │              [resolve]      [ × ]   ││
│ └──────────────────────────────────────┘│
│                                          │
│  CROSS-DOMAIN PATTERNS      [legend]    │  SectionHeader + ghost action
│ ┌──────────────────────────────────────┐│
│ │  ▫ ▫ ▫ ▫ ▫                          ││  SolidCard — NEW: CorrelationMatrix
│ │  ▫ ▫ ▫ ▫ ▫   (5 active domains)     ││  (5×5 cap, see §5)
│ │  ▫ ▫ ▫ ▫ ▫                          ││
│ │  ▫ ▫ ▫ ▫ ▫                          ││
│ │  ▫ ▫ ▫ ▫ ▫                          ││
│ │ ──────────────────────────────────  ││  same SolidCard, ranked rows below
│ │  On days you meditate, stress is    ││  ListRow
│ │  40% lower.        helpful? [👍][👎]││
│ └──────────────────────────────────────┘│
│                                          │
│  TREND                [7d][14d][30d]    │  SectionHeader + SegmentedTabs
│ ┌──────────────────────────────────────┐│
│ │  ─────── solid orange (you) ─────   ││  SolidCard — TrendChart
│ │  - - - - dashed purple (projected)  ││
│ │        ● green milestone dot        ││
│ └──────────────────────────────────────┘│
│                                          │
│  YOUR BEST DAY FORMULA                  │  SectionHeader
│ ┌──────────────────────────────────────┐│
│ │  ✓ 7h sleep   ✓ meditate  +2 more    ││  GlassCard, glow-done
│ │  ▓▓▓▓░  4/5 factors                 ││  ProgressBar segmented
│ └──────────────────────────────────────┘│
│                                          │
│  WEEKLY REPORT                  [see all]│  SectionHeader + ghost action
│ ┌──────────────────────────────────────┐│
│ │  Fitness 82 · Nutrition 74 · Well 90 ││  KPIRow (SolidCard, collapsed)
│ └──────────────────────────────────────┘│
│         ↓ expands to 9-tile BentoGrid   │
│                                          │
│  TOMORROW'S OUTLOOK                     │  SectionHeader
│ ┌──────────────────────────────────────┐│
│ │  91  ·  AI projected                 ││  GlassStatCard metric, glow-cia
│ │  based on your Wednesday patterns    ││
│ └──────────────────────────────────────┘│
│                                          │
│  RECENT INSIGHTS                        │  SectionHeader
│ ┌──────────────────────────────────────┐│
│ │  (CIAInsightCard stack, feedback)    ││
│ └──────────────────────────────────────┘│
│                                          │
│ ┌──────────────────────────────────────┐│
│ │  explore your health knowledge graph ›││  ListRow (nav-only, no glow)
│ └──────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## 5. Components
- **TopBar** — back chevron (44px), title "Intelligence," one trailing glyph action ("⋯") opening the data/consent menu.
- **GlassCard** `hero` variant — score ring container, radius 40, Display type permitted.
- **ProgressRing** — 120pt score gauge, orange fill, flips green only if the composite score itself hits a completion threshold (it doesn't here — this is a daily score, not a progress-to-goal metric, so the ring stays orange/`glow-you` throughout).
- **GlassStatCard** `sparkline` variant ×4 — the 4 pillar mini-trends inside the hero card. *Correction:* the draft invented an uncatalogued "SparklineRow" component; the catalog already covers this via `GlassStatCard`'s `sparkline` variant, used here in a 4-up inline row rather than as a NEW component.
- **CIAInsightCard** — contradictions (glow-cia) and recent insights (glow-cia). Actions map to catalog buttons exactly: `resolve` = `BtnCoach` (purple, CIA-initiated), dismiss `×` = `BtnGhost`.
- **NEW: CorrelationMatrix** — compact grid mapping correlation strength (cell opacity) and direction (green fill = reinforcing, orange fill = competing-for-attention, never red) between domains. *Rationale:* a ranked list alone can't show multivariate density at a glance; a matrix gives an instantly-parseable systemic view that a text list can't. *Mobile-reality correction:* the draft implied a full N×N grid across all 9 canon domains (81 cells) — illegible and untappable at 390px. Capped to a 5×5 grid of the user's 5 most-active domains; the full 9-domain map lives one tap away at Knowledge Graph [72], which the closing nav-link card already points to. Diagonal (domain × itself) cells render neutral and non-interactive — self-correlation isn't a real metric and showing one would be fabricated data.
- **SolidCard** — houses the matrix and its ranked `ListRow` coaching rows *together*, in one container. *Correction:* the draft's ASCII stacked a glass `ListRow` directly under a solid matrix as two separate visual pieces — a flat/glass sandwich canon §2 explicitly forbids ("never mix flat and glass in one composition"). Consolidated into a single `SolidCard` region.
- **SectionHeader** — every section label (Contradictions, Cross-domain patterns, Trend, Best day formula, Weekly report, Tomorrow's outlook, Recent insights), with trailing ghost actions where there's somewhere to go (`legend`, `see all`).
- **SegmentedTabs** — 7d / 14d / 30d trend selector.
- **TrendChart** — solid orange user line, dashed purple projection, green milestone dots.
- **ListRow** — ranked correlation coaching copy (trailing chevron slot repurposed as a thumbs-up/down feedback toggle pair — a controlled reuse of the existing trailing-toggle slot, not a new component); also the closing Knowledge Graph nav link (leading icon, label, trailing chevron, no glow — pure navigation chrome, not a data card).
- **ProgressBar** `segmented` variant — Best day formula factor tracker.
- **KPIRow** — Weekly report's collapsed headline (3 domains, one SolidCard).
- **BentoGrid** — Weekly report expanded state: all 9 domains as `SolidCard` tiles (2-col, gap 12). Tiles are solid, not glass — this is a data-dense grid, and canon reserves per-card glow for glass tiles; 9 simultaneous glows would also violate the "generous, one hero glow" restraint the atmosphere depends on.
- **GlassStatCard** `metric` variant — Tomorrow's outlook, glow-cia (a projection is inherently a CIA/AI moment, same semantic logic as the contradiction card).
- **ConfidenceMeter** — attached to the predicted-score card and to any individual matrix cell sitting in its low-confidence state.
- **ChipProvenance** — beside every real metric on the screen, no exceptions.
- **HonestNullState** — every honest-null state named explicitly in §8.
- **ErrorState** — inline, per-section failure (see §9).
- **OfflineBanner / SyncStatus** — appears when data is stale beyond normal sync windows.
- **PaywallLock** `full-screen` variant — the free-tier gate for the entire route (see §9).
- **ConsentCard** — not rendered inline on this screen; reached via the TopBar "⋯" menu as the mandatory data-control entry point (see §4 correction).

## 6. Visual treatment
- **Glass tiers:** `GlassCard` for the hero, contradictions, best day formula, tomorrow's outlook, and recent insights — the moments with meaning to signal. `SolidCard` (`--surface-2`, radius 28) for the correlation matrix + ranked rows, the trend chart, and the weekly report grid — the moments where legibility over atmosphere matters more than mood, per canon §2's tiering rule.
- **Semantic glows — one per glass card, meaning stated, no decoration:**
  - Hero: `--glow-you` #FF5E00 — this is *your* current state, built from your effort today.
  - Contradiction cards: `--glow-cia` #7F24FF — CIA surfacing an analytical mismatch, not a judgment.
  - Best day formula: `--glow-done` #34A853 — completed factors, positive pattern, growth.
  - Tomorrow's outlook: `--glow-cia` #7F24FF — a projection is CIA speaking, not measured fact.
  - Weekly report tiles, matrix, trend chart, Knowledge Graph nav link: **no glow, and that's correct, not a gap** — canon reserves the semantic-glow signature for glass-tier cards; these are solid-tier or pure-navigation surfaces by design.
- **Background atmosphere:** `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` over `--bg-base` #0A0A0F, 4% grain overlay (soft-light), per canon §1. Hero card breathes scale 1.0 → 1.02 over 4s (`prefers-reduced-motion` freezes it — see §10).
- **Radii:** hero card 40 (`--r-2xl`), all other cards 28 (`--r-xl`), pills/chips 999, per canon §6.
- **Hero type moment:** "87" in Display, NM Medium, 52pt (top of canon's 34–52 range — the one deliberate ceiling-use on this screen, reserved for the single number that unifies everything below it).
- **Domain tag colors** — used only on `ChipDomainTag` icons/labels inside the matrix legend and weekly report tiles, never as card chrome, per canon §4.

## 7. Content & copy
*CIA voice: sentence case, no exclamation marks, one Tiempos-italic emphasis word per moment, max.*

- **Hero overline:** Your daily intelligence
- **Hero empty:** CIA is getting to know you. Your score will appear in a few days.
- **Hero timestamp:** updated 2 hours ago
- **Contradiction section title:** Active contradictions
- **Contradiction alert:** You report sleeping 8 hours, but WHOOP shows 5.5 hours of *actual* sleep.
- **Contradiction source chip:** sleep log vs. WHOOP data
- **Correlation section title:** Cross-domain *patterns*
- **Correlation example row:** On days you meditate, your stress score is 40% lower.
- **Feedback prompt:** helpful?
- **Best day section title:** Your best day formula
- **Best day low-data copy:** Not enough completed days yet to see the *pattern* — check off today's factors to start building it.
- **Weekly report title:** Weekly report
- **Weekly report expand action:** see all
- **Prediction section title:** Tomorrow's outlook
- **Prediction basis:** Based on your Wednesday *patterns*.
- **Knowledge graph link:** Explore your health knowledge graph
- **Global section error:** Couldn't load this section — tap to retry
- **Offline banner:** you're offline — showing last sync 2h ago
- **Data menu entry:** manage data sources

## 8. Data & honesty states
*Every metric ships its 3-state honesty triple. No fabricated numbers, anywhere.*

- **Daily score (0–100):**
  - Real: `87` · delta `+3 from yesterday` · `ChipProvenance`: `via WHOOP, you logged`.
  - Low-confidence: KPI at 64% opacity · `estimated · low confidence` caption.
  - Honest-null: `ProgressRing` shows a faint ghost track with `—` at center · `HonestNullState` copy: "Not enough data yet — 3 more days."
- **Pillar sparklines (Fitness / Nutrition / Wellbeing / Finance):**
  - Real: solid orange line, 7 points · `ChipProvenance`: `auto-synced`.
  - Low-confidence: solid line + `estimated` caption.
  - Honest-null: hidden entirely for days 1–3 rather than shown as a dashed ghost — an empty sparkline reads as broken UI, not honest scarcity, so it's simply absent until there's something to show.
- **Correlation matrix (per cell, not just per matrix):**
  - Real: cell fills at full opacity, color-coded (green reinforcing / orange competing) · tapping surfaces the coaching copy.
  - Low-confidence: dashed cell border + `ConfidenceMeter` at low · copy: "analyzing relationship."
  - Honest-null: whole grid renders with a soft pulse, no cells filled · copy: "Mapping your domains — needs 1 week of data."
- **Trend chart (7/14/30d):**
  - Real: solid orange user line, dashed purple projection, green milestone dots.
  - Low-confidence: **not applicable** — a logged historical point is binary (logged or not), there's no partial-confidence version of a day that already happened. Justified N/A, not a gap.
  - Honest-null: centered ghost line · copy: "Track your first week to see your trend."
- **Best day formula:**
  - Real: checked factors + `ProgressBar` segmented fill, e.g. `4/5 factors` · each factor's source noted via `ChipProvenance` where synced (sleep, workout) vs. self-logged (meditate).
  - Low-confidence: **not applicable** — a factor is either logged or not for a given day; there's no estimated middle state for a checklist.
  - Honest-null: `HonestNullState` copy: "Not enough completed days yet to see the pattern — check off today's factors to start building it."
- **Weekly report tiles (9 domains):**
  - Real: KPI + delta + `ChipProvenance` per tile.
  - Low-confidence: KPI at 64% + `estimated · low confidence`.
  - Honest-null: tile renders with `—` and "not tracked yet" — never omitted from the grid (an untracked domain is still worth naming so the user knows it exists).
- **Predicted score:**
  - Real: `91` · `ChipProvenance`: `AI projected` · `ConfidenceMeter` at medium/high.
  - Low-confidence: muted 64% · `ConfidenceMeter` at low · caption "low-confidence model."
  - Honest-null: `HonestNullState` copy: "Predictions appear after a week of patterns."

## 9. All states
- **Default:** data populated, hero breathing, atmosphere visible, all sections resolved to their real/low-confidence/honest-null state as applicable.
- **Skeleton:** shimmer blocks matching layout geometry. `ProgressRing` shows a full faint track with a sweeping shimmer; `TrendChart` shows its axis with a ghost-line draw-in (per `SkeletonState`).
- **Empty / partial (days 1–3):** sparklines hidden (not ghosted), matrix and trend show their honest-null copy, contradictions section hidden entirely — absence of a contradiction is a positive state, not something that needs an empty-state UI.
- **Error:** per-section, inline. The `GlassCard`/`SolidCard` shell keeps its border; only the interior swaps to `ErrorState`: "Couldn't load this section — tap to retry." The rest of the dashboard keeps working — one bad fetch never takes down the whole screen.
- **Offline:** `OfflineBanner`/`SyncStatus` pinned under the TopBar: "you're offline — showing last sync 2h ago." Cards keep showing last-known values with their provenance chips intact — staleness is labeled, never hidden.
- **Success (contradiction resolved):** tapping `resolve` triggers a 150ms inline spinner on the `BtnCoach`, a brief green sweep across the card border (`glow-done`, one-time, not a persistent recolor), then the card collapses out of the stack.
- **Free tier (paywall):** the entire route renders through `PaywallLock` `full-screen` variant — the real layout blurred at 20px behind a centered lock glyph, one line of value copy, and a single `BtnPrimary`: "Unlock with premium." Never a redirect, never a dead end — the shape of the dashboard is still visible, just gated.
- **Disabled:** not applicable, beyond the paywall state above — there's no premium user path where individual modules are manually disabled.

## 10. Motion & interaction
- **Easing & durations:** physical ease-out throughout. Micro feedback 150–250ms. Section entrance stagger 80ms.
- **Glow behavior:** hero card breathes continuously (box-shadow alpha 0.8 → 1.0, 4s loop, per canon §6). Any glow brightens instantly on press (150ms), settles back on release.
- **Haptics:** light impact tick on trend-chart scrub (press-and-hold). Success impact when checking a Best Day factor.
- **Interactions:** matrix cells scale to 0.95 on tap and surface their coaching copy in a small popover. Contradiction cards support swipe-left to dismiss (80px drag threshold triggers collapse), mirroring the `[×]` tap action. Thumbs feedback glyphs scale 1.0 → 1.3 and settle, then the row shows a quiet "thanks" acknowledgment for 1.5s.
- **Reduced motion (`prefers-reduced-motion: reduce`):** count-up and line-draw entrances resolve instantly to final state. Hero glow freezes at a static mid-alpha rather than breathing. The one-time green success sweep becomes a flat border flash with no travel.

## 11. Motivation-tier adaptation
- **Low density:** hero card only (sparklines hidden), plus the Best Day formula's top 3 factors. Contradictions, matrix, correlations, trend, weekly report, and predictions are all hidden — a low-density user gets the score and one actionable habit loop, nothing else competing for attention.
- **Medium density (default):** hero + contradictions + cross-domain patterns (matrix + ranked rows) + 7d trend + best day formula + weekly report collapsed to its `KPIRow` headline.
- **High density:** everything expanded. 30d trend is the default window. Weekly report opens straight to the full 9-tile `BentoGrid`. The matrix gains a second, deeper row of paired-factor correlations (e.g., "when you meditate *and* sleep 7+ hours, your fitness score is 25% higher") for users who've asked to see more, not less.

## 12. Accessibility
- **AA+ contrast:** paper-100 #FEFAF3 over warm-dark surfaces (#0A0A0F base, #211008 cards) clears WCAG AA with margin. Overline labels use paper-64% and stay legible at that weight because of the 11pt caps + tracking treatment, not despite it.
- **44px targets:** `resolve`/`×`, thumbs feedback glyphs, `SegmentedTabs` segments, and the TopBar chevron/`⋯` all honor the 44px minimum, even where the visual glyph is smaller.
- **Screen-reader:** glyph-only controls (`‹`, `⋯`, `×`, thumbs icons) carry explicit `aria-label`s. `ProgressRing` and `TrendChart` expose a single grouped summary rather than reading out raw SVG paths — e.g., "Intelligence score 87, up 3 points from yesterday." Matrix cells announce as "Meditation and stress, strongly reinforcing" rather than a bare percentage.
- **Reduced motion:** covered structurally in §10 — every animated moment on this screen has a named static fallback, not just the hero.

## 13. Premium checklist
Evaluated against canon, not self-scored — each line states what's true and why.

- **Connects** — pass. One screen unifies WHOOP data, manual logs, and CIA inference into a matrix, a trend, and a formula that all point back at each other (tap a sparkline → Domain Dashboard; tap a matrix cell → the coaching row that explains it).
- **Honest** — pass. Every metric, including individual matrix cells, carries its 3-state triple; two states were correctly marked not-applicable with a stated reason rather than forced into existing; the empty state hides sparklines instead of faking a flat line.
- **Premium** — pass. Purple reserved for CIA/AI moments only, glass reserved for meaning-bearing cards, solid reserved for legibility — the tiering is intentional, not decorative.
- **Color** — pass. 60/30/10 held; matrix uses green/orange (never red) for direction, consistent with canon's no-moralizing rule.
- **Type** — pass. One Display moment (the "87"), Tiempos-italic used exactly once per copy moment (*actual*, *pattern*, *patterns* — each in a different card, none doubled within one moment).
- **Voice** — pass. CIA name corrected everywhere; sentence case and no exclamations held throughout §7.
- **Glow** — pass, with an explicit exception documented in §6: solid-tier cards and the nav-link row carry no glow by design, not by omission.
- **Shapes/tiers/surfaces** — pass. Radii 28/40 per canon; glass vs. solid follows the data-density rule at the *section* level, not just per-card (the matrix+rows consolidation fix in §5).
- **Motion** — pass. Physical easing, staggered entrance, and a named reduced-motion fallback for every animated element.
- **Components** — pass. Every element maps to a catalog name; one component (`CorrelationMatrix`) is flagged `NEW:` with rationale, scoped to 5×5 for mobile legibility rather than the draft's unworkable full matrix.
- **Safety** — justified N/A. This is an aggregate analytics surface with no direct mood/check-in input; the crisis-resource requirement (canon §8) attaches to the actual logging surfaces, not to a read-only dashboard that references wellbeing scores.
- **Consent & data control** — gap found and fixed. The draft had no consent/revoke entry point despite surfacing WHOOP and health data throughout; added a "manage data sources" route via the TopBar menu, per canon §8.
- **Gate** — pass. Full-screen `PaywallLock`, blurred real layout + one `BtnPrimary`, never a dead end.
