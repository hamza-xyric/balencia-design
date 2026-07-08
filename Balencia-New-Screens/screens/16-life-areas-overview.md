# 16-life-areas-overview — Hi-Fi Markdown Design Spec

## 1. Header
- **Screen ID:** 16-life-areas-overview
- **Name:** Life areas overview
- **Route(s) covered:** `/life-areas`
- **Tab:** Not a primary tab destination. Reached by deep-link from Today and Goals; `GlassNavBar` keeps the origin tab visually active on arrival (standard drill-down behavior — this screen doesn't own a tab).
- **Source:** Balencia Glass Canon (glass-dark v1)
- **Batch:** 7

## 2. Purpose
Gives the user one honest, whole-life snapshot — "where am I strong, where do I need attention" — by fusing the Life Power score, a 9-domain shape visualization, a 7-week trajectory, and a CIA cross-pillar insight into a single, non-shaming hub.

*Correction:* the draft claimed a "12-axis" radar in this section, "10 domains" in its cold-start copy, and only 3 sample rows in the wireframe — three different counts for the same thing. CANON §4 defines exactly **9** domain tag colors (Fitness, Nutrition, Mental/Wellbeing, Finance, Career, Relationships, Spirituality, Learning, Creativity). That is the only domain count this spec can verify against canon, so every reference below is fixed to **9**.

## 3. Entry & exit
- **Entry paths:**
  - Goals List [13]: tap the life-areas preview card.
  - Home [12]: tap a domain tag.
  - CIA Chat [09]: deep-link via tab switch + push, context pre-loaded.
- **Exit paths:**
  - Primary: tap a domain row in the list → domain dashboard [26–36].
  - Secondary: tap the CIA insight card's `Talk to CIA` → CIA Chat [09], context pre-loaded.
  - Tertiary: back chevron / iOS edge-swipe → source screen.

*Correction:* the draft's exit path also listed "chart axis, star dot" as tappable targets on the radar. See §4 and §12 — the radar is resized down to a legible glanceable shape and cannot host nine honest 44×44 hit zones without them overlapping. Navigation lives entirely in the domain list row taps; the radar is look-don't-touch.

## 4. Layout anatomy
**Regions top-to-bottom (single scrolling column; only `GlassNavBar` is pinned):**
1. **Atmosphere & navigation** — warm dark base, top-center radial glow, `TopBar` floating transparent, gains `.glass-pill` backdrop once content scrolls under it.
2. **Hero** — `GlassCard` (hero variant, radius 40) holding the Life Power KPI and the embedded `DomainRadarChart` (NEW).
3. **Balance trajectory** — one `SolidCard` holding `KPIRow` (avg + data-completeness ring) then a hairline divider then `TrendChart` (7-week).
4. **CIA coaching** — `CIAInsightCard`, cross-pillar insight with a `ChipDomainTag` evidence pair.
5. **Temporal selector** — `SegmentedTabs` (current / vs week / vs month, comparison tiers premium-gated via `PaywallLock`'s inline pattern).
6. **Domain detail list** — `SolidCard` holding 9 `DomainStatRow`s (NEW), scrolls with the page; only ~3 rows sit above the fold on a 390×844 frame, the remaining 6 are one scroll away.
7. **System navigation** — `GlassNavBar`, floating, pinned.

*Correction (mobile reality):* the draft's ASCII implied the full 12-row list fit in one 844px viewport above a pinned nav bar — it doesn't, even at 9 rows. Hero (≈300px) + trajectory card (≈140px) + CIA card (≈110px) + tabs (≈40px) already consume ~590px of the 844px frame, leaving room for 3 list rows (56px × 3 = 168px) before the fold. The list is written as the scrollable tail of the page, not a fixed panel.

**ASCII Wireframe (390×844):**
```text
[0,0]───────────────────────────────────────────────[390,0]
│                                                         │
│  ‹   life areas                        ⓘ data sources   │ <- TopBar: back · title · consent entry (NEW, see §8)
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ LIFE POWER                              via: calc'd│ │ <- GlassCard hero, r40, glow-you
│  │                                                     │ │
│  │        487  ▲ +4                                   │ │ <- Display KPI, tabular-nums, one hero-type moment
│  │                                                     │ │
│  │            .-'''-.                                  │ │
│  │         ,-'   ▲    '-.                              │ │
│  │       ,'   ●-------●   ',                           │ │ <- DomainRadarChart (NEW) — 9 axes, decorative,
│  │      |   ●          ●   |                           │ │    aria-hidden, no per-vertex tap targets
│  │      |     ●●●●●●●     |                            │ │
│  │       ',   ●          ,'                            │ │
│  │         '-.   ●    .-'                              │ │
│  │            '-...-'                                  │ │
│  │                                                     │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  avg 78 ▲ +4 · via 9 domains    ◔ 8/9 reporting     │ │ <- SolidCard: KPIRow (avg, completeness ring)
│  │  ─────────────────────────────────────────────────  │ │    hairline divider
│  │  last 7 weeks                                       │ │
│  │  ───────╱╲───────────────╱───                       │ │ <- TrendChart, solid orange, green milestone dot
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ ✦ fitness and mental/wellbeing have held steady —   │ │ <- CIAInsightCard, glow-cia
│  │   your *anchors* this month. career dipped this     │ │
│  │   week — want to set a goal?                        │ │
│  │   [Fitness] [Mental/Wellbeing]                      │ │ <- ChipDomainTag pair (evidence)
│  │   ( Talk to CIA )        ( not now )                │ │ <- BtnCoach + BtnGhost
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [ current  ·  vs week 🔒  ·  vs month 🔒 ]              │ <- SegmentedTabs, PaywallLock inline on locked segs
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ ● Fitness                    82   ▲ +4              │ │ <- DomainStatRow (NEW), 56px, ProgressBar orange→green
│  │ ─────────────────────────────────────────────────   │ │
│  │ ● Nutrition                  76   ▼ −2              │ │
│  │ ─────────────────────────────────────────────────   │ │
│  │ ● Mental/Wellbeing           81   ▲ +2              │ │
│  │ ─────────────────────────────────────────────────   │ │
│  │            ⋮ 6 more — scroll ⋮                       │ │ <- Finance, Career, Relationships, Spirituality,
│  └───────────────────────────────────────────────────┘ │    Learning, Creativity continue below the fold
│                                                         │
│         ( Today · CIA · Goals · Me )                    │ <- GlassNavBar, floating, pinned
└─────────────────────────────────────────────────────────┘
```

## 5. Components
- **TopBar** — back chevron (44px target) · title `life areas` · secondary glyph action `data sources` (ADDED, see §8 correction) linking to the consent/data-control surface.
- **GlassCard** (variant: `hero`, radius 40, Display type allowed) — houses the Life Power KPI + embedded radar. The screen's *only* hero-tier glass tile.
- **NEW: `DomainRadarChart`** — rationale: no catalog component plots simultaneous multi-axis domain state; `TrendChart`'s grammar (past/projected/milestone over time) doesn't fit a same-moment, 9-axis shape. Built by reusing CANON §7's exact color grammar rather than inventing new semantics — see §6 for the mapping. Decorative/glanceable only; not an interactive control (see §4, §12 mobile-reality correction).
- **SolidCard** ("Balance trajectory") — houses `KPIRow` + `TrendChart`, hairline divider between.
- **KPIRow** — 2 mini-stats: avg score (delta arrow) and data-completeness (`ProgressRing`, 8/9 domains reporting), each with its own provenance.
- **TrendChart** — 7-week Life Power average, solid orange line, milestone dots.
- **CIAInsightCard** — glow-cia, `ChipDomainTag` evidence pair, actions `BtnCoach` + `BtnGhost` (catalog specifies both; draft rendered `BtnCoach` alone).
- **SegmentedTabs** — current / vs week / vs month; locked segments carry `PaywallLock`'s inline-tile treatment (40% opacity + lock glyph), tap surfaces a lightweight unlock sheet rather than doing nothing (see §9 correction).
- **SolidCard** ("Domain detail") — houses 9 `DomainStatRow`s.
- **NEW: `DomainStatRow`** (ListRow variant) — rationale: base `ListRow` has no inline-`ProgressBar` slot; this variant standardizes domain-color dot, tabular score, delta, and a `ProgressBar` (orange fill, flips green at 100%, same logic as `ProgressRing`) into one 56px row.
- **GlassNavBar** — floating, 4 tabs, pinned.
- **Not rendered, referenced only:** `ConsentCard` — the TopBar's `data sources` glyph opens it; see §8.

*Omissions, stated with rationale (an honest "not applicable" beats forced inclusion):*
- **`FABQuickLog`** — omitted. CANON §8 scopes it to Today-tab screens; this is a secondary drill-down surface reached by deep-link, not a Today landing screen.
- **`SafetyResourceCard`** — omitted here. CANON §8 requires it on "mood/check-in/journal surfaces." This screen surfaces a Mental/Wellbeing *score*, not a check-in flow — the safety layer belongs on that domain's own dashboard [26–36], where mood entry actually happens. Not skipped by oversight; scoped out on purpose.
- **`CalendarStrip`** — the draft repurposed it as an "invisible accessibility fallback" for domain data. That's a misuse (`CalendarStrip` is a 7-day scroller, semantically about days, not domains) and an unneeded parallel structure. Removed — see §12 for the real fallback.

## 6. Visual treatment
- **Glass tiers, exact tokens:**
  - Hero: `.glass-card` recipe (`rgba(255,255,255,.045)`, blur 28px sat 120%, border `1px rgba(255,255,255,.08)`) at the `hero` radius (40), shadow `0 18px 48px rgba(33,16,8,.45)` + inset top-light `0 1px 0 rgba(255,255,255,.12)`.
  - CIA card: same `.glass-card` recipe at default radius 28. *Correction:* the draft called this "purple-tinted glass," implying the fill itself changes color. Per CANON §2/§3 the glass fill is always the standard translucent white — only the inner glow is purple (`glow-cia`). Fixed the description; no visual change intended, just accurate spec language.
  - SegmentedTabs: `.glass-pill` (`rgba(10,10,15,.55)`, blur 24px, border `.10`, radius 999).
  - Trajectory + domain list: `--surface-2` (#211008) solid, border `rgba(255,255,255,.06)`, radius 28, no blur — data-dense, legibility over atmosphere (CANON §2 rule).
- **Atmosphere:** `--bg-base` (#0A0A0F) + mandatory top-center radial `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` + 3–4% grain (soft-light). CIA card region adds a subtle purple pool per CANON §1.
- **Semantic glow, one per card, meaning stated:**
  - Hero `GlassCard`: `--glow-you` (#FF5E00) — the user's own effort and current Life Power, bottom-anchored radial, `color-mix(in srgb, var(--glow-you) 55%, transparent)` → transparent 70%, blur 24px, 62% of card height.
  - `CIAInsightCard`: `--glow-cia` (#7F24FF) — AI-derived cross-pillar insight, same recipe.
  - Trajectory + domain-list `SolidCard`s: **no glow, and that's correct, not an oversight.** CANON §2/§3 reserves the glow signature for glass surfaces; solid cards trade atmosphere for legibility in data-dense regions. Forcing a glow onto a flat solid card would be decoration without meaning — the opposite of the rule.
- **`DomainRadarChart` color mapping (reuses CANON §7's grammar exactly, doesn't invent new semantics):**
  - Current-period polygon: solid orange `#FF5E00` stroke (2px, matching `TrendChart`'s user-line weight) + 12% orange fill (matching `TrendChart`'s single-color fade rule — no gradients).
  - Comparison overlay (vs week / vs month): dashed **paper-40%** outline, no fill. *Correction:* the draft's morph animation implied a dashed-purple ghost, borrowing `TrendChart`'s "projected/AI" color. A week-over-week comparison is a historical fact, not an AI projection — dashed purple would misrepresent it as CIA-derived. Purple is reserved for genuinely CIA-sourced data; this comparison isn't that, so it gets a neutral dash.
  - Domain vertex that hit its target this period: 6px green dot, same milestone convention as `TrendChart`.
  - Domain with no data yet: dashed ghost spoke at the axis (honest-null, per-user and per-domain — not hardcoded to specific domains; see §7 correction).
- **One hero type moment:** the `487` Life Power KPI, NM Medium tabular-nums, 52px (Display range).

## 7. Content & copy
**Voice:** CIA — sentence case, honest, direct, second person, no exclamation marks, one Tiempos-italic emphasis word per moment.

- **Overline labels are authored sentence-case, displayed uppercase.** `life power`, `last 7 weeks` are written lowercase in copy; CANON §5 defines Overline as a *type style* (`+0.14em caps`) that renders them visually uppercase. That's a display transform, not an exception to sentence case — the draft's earlier "correction" removing ALL CAPS conflated the two. Both are true: write lowercase, the type style shows caps.
- **`Life Power`** stays capitalized everywhere as a defined proper term (same treatment as `CIA` — a named system, not a sentence to case).
- TopBar title: `life areas`
- Hero overline: `life power`
- Hero provenance: `calculated`
- Trajectory header: `last 7 weeks`
- Cold-start CIA card: `Welcome to your life overview. As you set goals and track progress across all 9 domains, your Life Power will grow to reflect your *whole* journey.`
- Active CIA card: `Fitness and Mental/Wellbeing have held steady — your *anchors* this month. Career dipped this week — want to set a goal?`
- CIA card actions: `Talk to CIA` (BtnCoach) · `not now` (BtnGhost)
- Domain row secondary hint (no goals set): `no goals · tap to explore`
- Domain row secondary hint (goals active): `2 goals`
- SegmentedTabs: `current` · `vs week` · `vs month`
- Life Power honest-null: `building your *balance*`
- Locked-segment upsell (opened on tap): `see how your week compares — unlock with premium`

*Correction:* fixed "across all 10 domains" (draft) to 9, to match the verified domain count. Rewrote the active CIA line to cite two real canon domain names (`Fitness`, `Mental/Wellbeing`) via a proper `ChipDomainTag` pair instead of "Sleep and Meditation" — neither is a domain in CANON §4; those read as metrics *inside* a domain, not domain names themselves, and CANON requires cross-pillar insights to cite domains via the tag pair.

## 8. Data & honesty states
Every metric renders 3 ways through `ChipProvenance` + the documented states. No fabricated numbers.

- **Life Power score**
  - Real: `487` + `ChipProvenance: calculated`
  - Low-confidence: `460` (muted, 64% opacity) + `estimated · low confidence`
  - Honest-null: `building your *balance*` (never a zero)
- **Domain stat** (any of the 9, e.g. Fitness)
  - Real: `82` + `ChipProvenance: via WHOOP`
  - Low-confidence: `79` (muted) + `estimated`
  - Honest-null: `—` on the row, `ProgressBar` empty, hint reads `no goals · tap to explore`
- **Avg stat**
  - Real: `78` + `ChipProvenance: 9 domains` *(corrected from the draft's "10 domains")*
  - Low-confidence: `75` (muted) + `estimated`
  - Honest-null: `awaiting data`
- **Data-completeness ring** (`8/9 domains reporting`)
  - **Justified exception, not a gap:** this is a system-computed meta-count (how many domains synced this week), not a user behavioral metric — it's always exactly known, never estimated. Low-confidence and honest-null states genuinely don't apply here; showing a fake "estimated" label on a count Balencia itself computed would be dishonest in the other direction. Stated once, here, rather than forced into a 3-state template that doesn't fit.
- **7-week TrendChart**
  - Real: solid orange path + `ChipProvenance: weekly snapshots`
  - Low-confidence: **not shown as a separate visual state** — any week folding in an estimated domain value still resolves to one real weekly average; the per-domain confidence is already disclosed at row level below, so flagging it twice (aggregate *and* domain) would just be noise dressed up as rigor.
  - Honest-null: dashed ghost axis, `not enough data yet — 3 more days`
- **`DomainRadarChart` axes** — no independent honesty states of its own; it mirrors whatever state each domain's row is already in (real / low-confidence-muted / honest-null-dashed-spoke). One source of truth, drawn twice for legibility and shape.

**Consent & data control (ADDED — missing from the draft):** this screen surfaces third-party health data (`via WHOOP`) via `ChipProvenance`. CANON §8 requires any screen touching synced third-party sources to expose consent state + a revoke/delete entry point. The draft had no such entry point anywhere. Fixed by adding the TopBar's `data sources` glyph action (§5), which opens `ConsentCard` showing what's connected, why, retention, and the revoke path — satisfying the invariant without cluttering the hero region.

## 9. All states
- **Default:** radar plots all 9 axes (solid where data exists, dashed-ghost spoke where a domain has no goals/data yet — per-user, not hardcoded to any specific domain). Life Power score shown. 7-week trend renders.
- **Skeleton:** hero card, trajectory card, and domain rows shimmer (`--surface-3` base, 1.2s sweep) matching real geometry; `ProgressBar`s animate 0 → value on data arrival; radar strokes draw in once, no spinners.
- **Empty (cold-start):** radar renders all 9 axes as dashed ghost spokes (no data anywhere yet). Hub reads `building your *balance*`. CIA card shows the cold-start copy. Temporal selector locked to `current` (nothing to compare against yet).
- **Error (total network):** hero shows grid rings/axes only, no polygon. Domain list shows skeleton rows. CIA card hidden (no insight to offer without data). Toast: `couldn't load latest data` + `BtnSecondary` retry, per `ErrorState`.
- **Error (partial domain):** radar draws successfully for domains that loaded; failed domains render as dashed ghost spokes (visually identical to honest-null — a fetch failure and "no data yet" look the same to the user, which is the honest read: either way, there's nothing real to show). Affected rows read `data unavailable — tap to refresh`.
- **Success (comparison toggle):** ghost overlay polygon draws in (280ms, paper-40% dashed). Vertices that improved get their `▲` mark; vertices that declined get their `▼` mark. Glow holds through the transition, then settles.
- **Disabled/locked:** `vs week` and `vs month` segments render at 40% opacity with a lock glyph. *Correction:* the draft left this a dead end. Tapping a locked segment now opens a compact upsell (single `BtnPrimary`, "unlock with premium" copy from §7) — never a dead tap, per CANON §8's paywall rule.

## 10. Motion & interaction
- Physical easing throughout (never linear), 150–250ms feedback on taps.
- Hero glow "breathes" (4s ease) — the only continuous idle motion on the screen.
- Radar polygon draws in once on load (stroke animates in), then holds static; it does not idle-animate (nothing to communicate by moving once drawn).
- Comparison toggle: ghost overlay polygon draws itself in 280ms; vertices don't "morph" numerically since each axis is a separate domain, not a shared scale changing over time — the current polygon stays fixed, the ghost overlay appears/disappears.
- Haptics: light tick on the comparison-toggle switch. *Correction:* the draft specified "light tick (medium impact)" — a contradiction (those are two different haptic strengths). Also dropped "domain star-dot taps" from the haptic list since the radar is no longer an interactive surface (§4, §12); domain row taps in the list get the standard `ListRow` selection tick instead.
- `prefers-reduced-motion`: radar stroke draws instantly (no animated trace), `TrendChart` renders static, skeleton shimmer becomes a static tone, count-up bypassed — final numbers appear immediately.
- Gestures: tap domain row → stack push to domain dashboard. Tap `data sources` glyph → push `ConsentCard`. Pull-to-refresh → retry fetch.

## 11. Motivation-tier adaptation
- **Low density:** the domain list below the fold collapses to the top 3 domains by recency of activity; domains with zero goals are hidden from the *list* only. The radar itself always plots all 9 axes (dashed-ghost where hidden from the list) — collapsing the list is a reading-load choice, but silently dropping an axis from the whole-life shape would misrepresent "whole life." Structure stays honest; only the supplementary detail collapses.
- **Medium density (default):** top 3 domains shown with a `show all 9 domains` ghost action. Radar and trend stay visible as-is.
- **High density:** full 9-domain list expands by default, each row gains a weekly delta swatch; radar stays visually identical (its 9 axes are constant across every density tier — density only ever changes how much *list detail* is shown, never the shape's honesty).

*Correction:* fixed "12 domains" (twice) and "top 3 domains... shown" wording to the verified count of 9, and added the constant-radar-shape clarification since the draft implied domains could disappear from the chart itself at low density.

## 12. Accessibility
- **Contrast:** primary text `paper-100` (#FEFAF3) on `--surface-2` (#211008) exceeds AA+. Muted text (paper-64%) holds 4.5:1 minimum.
- **Targets:** back chevron, `data sources` glyph, `SegmentedTabs` segments, and every `DomainStatRow` meet the 44pt minimum (rows are 56px). *Correction, mobile reality:* the draft claimed radar "star-dots" get "≥44×44pt expanded invisible bounding boxes" — with 9 vertices arranged around a ~220px-diameter shape, that's mathematically impossible without the hit zones overlapping each other and the center. Fixed by making the radar decorative/`aria-hidden` and moving all interaction to the `DomainStatRow` list, which already has honest, non-overlapping 56px targets.
- **Screen reader:** the radar carries a single summary label (`"Life Power shape across 9 domains"`) and is otherwise `aria-hidden` — its data is not read axis-by-axis because the `DomainStatRow` list below is the real, complete, already-accessible representation of the same numbers (`"Fitness, 82 out of 99, up 4 points, via WHOOP"`). One source of truth read aloud, not a duplicate hidden structure (the draft's "invisible `CalendarStrip` fallback" was that duplicate — removed, see §5).
- **Non-shaming visuals:** negative deltas render orange `▼` (CANON's own rule: "orange ▼ with meaning, never red-vs-green moralizing"), paired with the glyph, never color alone. *Correction:* the draft introduced a third color, "stalled-amber `#f59e0b`," for this exact purpose — which happens to be the identical hex already assigned to the **Creativity** domain tag in CANON §4. Had that shipped, a declining Creativity score would render its domain-identity dot and its "you're down" indicator in the same color, collapsing two different meanings into one hex. Fixed to the canon-correct orange `▼`.
- **Consent reachability:** the `data sources` glyph (44px target, labeled `aria-label="manage connected data sources"`) is reachable from the TopBar without scrolling, satisfying CANON §8's revoke/delete requirement for WHOOP-sourced data on this screen.

## 13. Premium checklist
1. **Connects:** literal cross-pillar hub — one frame ties the Life Power score, all 9 domains, 7-week trend, and a CIA cross-pillar insight together.
2. **Honest:** every metric ships real / low-confidence / honest-null; the two justified exceptions (completeness ring, trend low-confidence) are stated with rationale, not silently skipped; the consent gap in the draft is closed.
3. **Premium:** selective glass tiers observed correctly; one hero glass tile; the signature semantic glow used exactly twice, each with a stated meaning; solid cards intentionally carry no glow.
4. **One hero glass tile:** the hero `GlassCard` is the only `hero`-radius glass surface; `CIAInsightCard` is default-radius glass, distinct.
5. **Color hierarchy:** orange (effort/user, 60) / green (done/growth, 30) / purple (CIA, 10) held exactly — no invented fourth semantic color (the "stalled-amber" collision is fixed).
6. **Tiempos italic:** one emphasis word per moment (`whole`, `anchors`, `balance`), never color or bold.
7. **No flat black:** warm `#0A0A0F` base + mandatory atmosphere + grain.
8. **No fake data:** every real metric carries a named `ChipProvenance`; nothing is invented.
9. **Component discipline:** `SolidCard` for the dense list and trajectory data; glass reserved for hero/CIA/nav; one genuinely NEW component (`DomainRadarChart`) flagged with rationale rather than silently invented; one catalog misuse (`CalendarStrip`) caught and removed.
10. **No exclamations:** CIA voice rules held throughout; Overline caps clarified as a type-style transform, not a copy-case exception.
11. **Motion:** physical easing, one breathing glow, reduced-motion path defined, haptic contradiction resolved.
12. **Accessibility:** no red/green moralizing, 44pt+ targets everywhere interaction actually lives, and the radar's inherent mobile-scale limits are respected rather than spec'd around.
13. **Paywall pattern:** locked comparison segments use the standard opacity + lock treatment and open an upsell on tap — never a dead end.
14. **Safety & scope discipline:** `SafetyResourceCard` and `FABQuickLog` are deliberately scoped out with stated rationale rather than reflexively included — an honest "not applicable" over forced compliance.
