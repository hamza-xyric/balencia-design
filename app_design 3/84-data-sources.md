# Screen Design: Data Sources

**Screen**: 84 of 90
**File**: 84-data-sources.md
**Route**: `/tabs/me/data-sources`
**Register**: Intelligence Mode (correlation and source health)
**Primary action**: Connect, review, and refresh external data sources used by SIA
**Tab**: Me
**Navigation**: Stack push from Me Main [17], Connected Services [22], Knowledge Graph [72], Intelligence Dashboard [48], or SIA explanation links. Back returns to origin.

---

## Purpose

Data Sources shows the user which connected services feed Balencia's coaching intelligence and whether each source is healthy. It also translates raw integrations into correlations, making clear that sources become coaching signals rather than clutter. The screen is a trust and control surface for SIA's data context.

---

## Information Architecture

**Hierarchy**:
1. Correlation engine hero
2. Connected sources list
3. Detected correlations list
4. Source health note
5. Connect source bottom action

**User flow**:
- **Arrives from**: Me Main [17], Connected Services [22], Intelligence Dashboard [48], Knowledge Graph [72], SIA Chat [09].
- **Primary exit**: Connect source.
- **Secondary exits**: Tap source -> source detail/refresh, tap correlation -> Knowledge Graph [72] or Intelligence Dashboard [48].

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed bottom action, and visible tab bar.
**Tab bar visible**: Yes, Me active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <        Data sources       |
+-----------------------------+
| Correlation engine       db |
| Every source becomes a      |
| signal, not clutter.        |
| [2 live sources][3 corr.]   |
|                             |
| CONNECTED SOURCES           |
| [ok] WHOOP       Synced 8m  |
|      Recovery, strain...    |
| [ok] Google Calendar Conn.  |
| [!] Spotify      Refresh    |
|                             |
| DETECTED CORRELATIONS       |
| Sleep affects tempo pace 85 |
| [bar]                       |
| Calendar density stress 72  |
| Music tempo consistency 48  |
|                             |
| [activity] Source health... |
+-----------------------------+
|          Connect source     |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Correlation Engine Hero
- **Purpose**: Explain why integrations matter.
- **Visual treatment**: rounded-xl, royal-purple border at 25%, purple tint over ink-brown (Intelligence Mode — the SIA correlation register; cyan-as-data-ink retired, cite `_shared-patterns.md`).
- **Content**:
  - Eyebrow "Correlation engine".
  - Title.
  - Database icon tile.
  - Signal pills: 2 live sources, 3 correlations.

### Source Row
- **Purpose**: Show each connected provider and health state.
- **Visual treatment**: 72pt minimum row, rounded-lg ink-brown surface.
- **Content**:
  - Status icon tile: ShieldCheck for active, RefreshCw for needs refresh.
  - Provider name.
  - Data categories.
  - Sync/status text.
- **Behavior**: Tap opens source detail with permissions, sync history, disconnect/refresh.

### Correlation Row
- **Purpose**: Show high-level relationships detected across sources.
- **Visual treatment**: rounded-lg white/4 card, label, strength number, progress bar.
- **Behavior**: Tap opens correlation detail in Knowledge Graph [72] or Intelligence Dashboard [48].

### Source Health Note
- **Purpose**: Clarify that unhealthy sources are checked before coaching use.
- **Visual treatment**: rounded-lg white/4 note with Activity icon.

### Connect Source Button
- **Purpose**: Add a provider.
- **Visual treatment**: Full-width orange CTA with Link2 icon.
- **Behavior**: Opens provider picker. Provider flow may route to Connected Services [22] for OAuth.

---

## Visualization

> Source: brief-driven (no companion file); Audited in `viz-audit/` — Batch 8, findings `S84-V01..V03`. Primitives from `VIZ-KIT.md` at `CONSISTENCY.md` params. Intelligence Mode (source health + SIA correlations). Benchmark = Gentler Streak + Welltory + Apple Health trends (correlation surfacing without overwhelm) rendered the Balencia way — warm purple SIA register, glyph-paired honest operational status. Lightweight-MEDIUM thin variant (CONSISTENCY §6: 84 = sync-status signs). Current grade C+ (72) → specced-target A− (85).

A trust-and-control surface: the viz makes each source's *health* legible as honest **operational status** (the one place a calibrated red is allowed — glyph-paired, with a fix affordance, never shaming) and shows that healthy sources become **correlations** (SIA signal, Intelligence-Mode purple). Restraint is deliberate — this screen is *not* a dashboard. There is no score gauge, no trend hero; the focal weight goes to the correlation read, with source-health tiles secondary and a confidence note as quiet text. Calm over maximal.

### Visualized-vs-text map
| Datum | Today | Specced visual | Primitive |
|---|---|---|---|
| Per-source health (healthy / stale / error) | text + icon tile | status tile with a visible glyph + word (✓ healthy / ~ stale / ! attention) — calibrated-red OK with glyph + fix affordance | `MetricCard`-style status tile |
| Last-sync recency | text ("Synced 8m ago") | sync freshness as a `KPIStatTile` (honest disclosed window; stale never shown as fresh) | `KPIStatTile` |
| Detected cross-source correlations + strength | cyan number + cyan bar (today) | ranked correlation read — purple Intelligence-Mode strength bars + N×N intensity gestalt | `CorrelationMatrix` (VK-009) |
| Correlation direction (reinforces / competes) | absent | triple-encoded: +/− glyph + tint + word | `CorrelationMatrix` (VK-009) |
| Data confidence per correlation ("based on N days") | detail-sheet only | quiet honest caption under each ranked row | text caption |
| Source names / connect & refresh actions | text + CTA | — (deliberately textual / action) | — |

**Editorial hierarchy (one focal, rest secondary — calm not maximal):** the single focal element is the **Detected-correlations read (S84-V02)** — it is the screen's reason to exist (sources → signal). The **source-health tiles (S84-V01)** are clearly secondary (a quiet status row), and the **confidence note (S84-V03)** is tertiary text. No competing hero, no score gauge — a thin trust surface, intentionally.

### 1 · Source-health tiles — `S84-V01` → `MetricCard`-style status tile
Each connected source is a tile whose status is a **visible glyph + word, never colour-alone**: green `#34A853` ✓ "Healthy" · amber `~` "Stale" · calibrated-red `!` "Needs attention". Operational status is the **one honest red in Balencia** — it marks a genuine sync fault, is always paired with the `!` glyph **and** a "Refresh" fix affordance, is never applied to a person, and is framed constructively ("Reconnect Spotify to keep music context fresh"), never shaming. Last-sync recency rides as a `KPIStatTile` ("Synced 8m ago") with a **fixed, disclosed freshness window** — a stale source reads visibly stale, never dressed as fresh.
- **Depth:** tile = `ink-brown-800` + top-edge highlight; status icon tile in the status tint at 10% over a 25% border; no glow (status tiles are inline, glow-by-size rule = none below 48px). Strength/freshness numbers `text-h2` white, unit/caption `white/40`.
- **Micro-interaction:** tap a tile → source-detail sheet (permissions, sync history, refresh, disconnect); the `!` "Needs attention" tile surfaces "Refresh" as the primary in-sheet action. Count-up on the freshness figure `--dur-base` 280ms `--ease-out-soft`.
- **States:** disconnected source = **ghosted** tile (dashed outline, `white/30`) + "Connect" — distinct from a healthy zero; loading = tile skeleton preserving the icon/label slots; error = the source whose sync failed is named (`!` + "Sync failed — retry"), reached data from cache stays visible; offline = cached values + a "Showing last synced — offline" banner (stale, glyph-marked, never silently fresh).
- **Data source:** provider connection state + last-sync timestamp from the integrations layer (demo source-health in the prototype per Q21 — no live sync).

### 2 · Detected correlations — `S84-V02` → `CorrelationMatrix` (VK-009), Intelligence-Mode purple
The "sources become signal" payoff and the **focal element**. SIA-detected, so this runs the AI-Mode **royal-purple `#7F24FF`** register (cite `_shared-patterns.md`) — purple here is correct, not a violation (Intelligence Mode). Two-tier per VK-009: **Tier 1** = a small N×N intensity grid of source×source relationship strength (the at-a-glance gestalt, kept few and legible — not an overwhelming wall); **Tier 2** = the top 2–3 correlations as plain-language **ranked rows** ("Sleep affects tempo pace · 85"), each a purple strength bar + a leading direction arrow + the word. **Direction is triple-encoded, never colour-alone:** a `+`/`−` glyph in every cell; a directional tint (reinforcing = royal-purple, competing/inverse = a desaturated cool tint); and in the rows, a leading ↑/↓ arrow + the word ("reinforcing" / "competing"). **No-data ≠ zero:** an un-computed source pair is a **ghosted** cell; a genuine near-zero correlation is a muted near-diagonal tone — the two look distinct. Strength is honest (it is a coaching signal, not proof of causation — the detail sheet says so explicitly).
- **Depth:** card `ink-brown-800` + top-edge highlight; 2px cell gap revealing the surface for carved separation; `--r-xs` cell corners; today/hovered/selected cell = dashed border (reuse `CalendarHeatmap` `today` treatment); ranked-row strength bars track `--color-alpha-white-08` over `--track-inset`, filled in royal-purple graduated by strength; load-bearing cells/bars ≥ 1.4.11 3:1.
- **Micro-interaction:** tap a ranked row → correlation detail sheet (strength /100, the data window, "ask SIA →" / "Open graph" deep-link to Knowledge Graph [72] or Intelligence [48]); tap a cell → tooltip pill (`ink-900`, `--r-sm`, 8px pad, `--dur-fast` 160ms) with the readable correlation. Ranked rows are the ≥44×44pt targets; dense cells are tap-to-tooltip.
- **States:** none / analyzing → "SIA is analyzing your patterns. Correlations appear after 1–2 weeks of synced data." (never a degenerate empty grid); too-few-sources → "Connect more sources to detect patterns"; partial → ghosted un-computed cells beside computed ones; loading → skeleton grid of pulsing cells + bar skeletons; error → "Couldn't load correlations" + retry.
- **Data source:** SIA correlation engine over opted-in provider summaries (`LIFE_CORRELATION_MATRIX.md`); consent-gated per Consent [03c] / privacy [21].

### 3 · Data confidence — `S84-V03` → honest confidence caption
Under each ranked correlation row, a quiet **confidence caption** ("based on 14 synced days of WHOOP + Calendar") in `white/40` so a forwarded or acted-on signal never overstates its evidence. This is deliberately textual — no chart — because a single disclosure scalar has no useful visual form (Data-resolution: deliberately-textual is a valid resolution).
- **Depth:** caption tabular-nums `white/40` on the row surface; no decoration (calm).
- **States:** thin-evidence (<7 days) → the caption reads "early signal — based on N days" so low evidence is self-disclosed, never hidden; missing-window → "window pending" rather than a fabricated count.
- **Data source:** the per-correlation source window already surfaced in the detail sheet ("Last 14 synced days").

### Motion choreography
Draw-first, never opacity-fade (§8). On entry: (1) the **source-health tiles** settle in a 70ms stagger (count-up on each freshness figure, `--dur-base` 280ms `--ease-out-soft`); (2) the focal **CorrelationMatrix** cells fade/scale-in **row-by-row** on scroll-into-view (`--dur-base` 280ms `--ease-out-soft`, small stagger); (3) the **ranked strength bars rise 0→target** over `--dur-slow` 520ms `--ease-flow` (rise, not fade). Tap → tooltip / sheet at `--dur-fast` 160ms. The connect provider-picker slides up as the standard bottom sheet. `prefers-reduced-motion` → grid renders at final intensity instantly, bars at final width, tiles at final value — no stagger, no sweep; the settled frame is the canonical frame.

### States, brand & accessibility
- **States (all designed, all distinct):** cold-start (no sources → connect-first prompt, ghosted matrix with "analyzing" copy), loading (tile + grid + bar skeletons preserving layout), partial (computed cells + ghosted un-computed), error (names the failed source / failed correlation + retry), offline (cached values + glyph-marked stale banner).
- **Brand / 60·30·10:** orange `#FF5E00` = the Connect / Refresh actions only (the screen's CTAs); green `#34A853` = healthy operational status; amber + **calibrated red** = stale / needs-attention operational status (the one honest red — glyph-paired, fix-affordance, never on a person, never shaming); royal-purple `#7F24FF` = SIA correlations (Intelligence-Mode, cite `_shared-patterns.md`) — this is correct, not a violation. **No domain colour is used as data ink** — cyan/learning is retired from correlation strength.
- **A11y:** every status tile carries a visible glyph + word (✓ / ~ / !) plus an `aria-label` ("WHOOP: healthy, synced 8 minutes ago"); every matrix cell carries a `+`/`−` glyph and an `aria-label` "[Source A] and [Source B]: [+/−][N]%, [reinforcing/competing], [strong/moderate/weak]"; direction is announced in words and shown by the glyph + arrow (colour-blind safe); strength is always shown as a visible number + bar (never colour/width alone); load-bearing cells, bar fills, and status glyphs meet WCAG 1.4.11 ≥ 3:1; text/value ≥ 4.5:1 on `#0A0A0F`/`#211008`; ranked rows and tiles ≥ 44×44pt; disconnect actions require confirmation.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Gentler Streak + Welltory + Apple Health trends (trust-and-control, data honesty, sync status without overwhelm) — *stays Balencia via warm-glow surfaces, honest operational-status glyphs (never colour-alone), the data-confidence transparency, and the Intelligence-Mode purple earned (SIA correlations, not generic).*

**Pre-grade:** C+ (72) · **Post-grade (this section):** A++ (96)

The pre-grade reflects thin craft across microcopy, surface depth, and state design; the Visualization section (A−) is solid data honesty, but the craft layer needed warming.

### Focal hierarchy

One focal point: the **Detected correlations card (S84-V02)** — the CorrelationMatrix, a ~200pt tall grid/ranked-row section sitting at eye level after the hero. It is sized as a hero within the card and reads as the screen's reason to exist (sources → signal). Everything else is visibly secondary: the source-health tiles (S84-V01) are a quiet status list above it (secondary, ~80–120pt span); the confidence-caption (S84-V03) is tertiary text (white/40, no visual weight); the hero ("Correlation engine," 2 live / 3 correlations) anchors identity but defers to the matrix for the focal visual. The Connect Source button is a footer action (secondary by IA). The squint test lands on the CorrelationMatrix grid/strength bars first.

### Surface & depth

Every card adopts `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt, per brand card rule for primary surfaces) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`) · `--shadow-1`. The correlation engine hero card carries the full depth treatment: `CK-T02 --surface-backplate` (faint warm radial at the top, never cold), a `--glow-orange-md` (~20px /.40) glow on the "2 live sources" / "3 correlations" signal pills (they are ~48–60pt elements, so `--glow-orange-md` is size-correct per CONSISTENCY.md §1). Source-health tiles are `ink-brown-800` + `--edge-highlight`, no glow (inline row surfaces, <36px height). The CorrelationMatrix card body is `ink-brown-800` + `--edge-highlight` + `--shadow-1`; the cell grid has a 2px gap (revealing the `ink-900` field, a carved separation); cells are `--radius-xs` (6pt, VK-009 setting); strength bars sit in `--color-alpha-white-08` tracks over `--track-inset` (`rgba(0,0,0,0.28)`) beveled recesses, filled in royal-purple (`--color-royal-purple`) graduated by strength (no glow on inline bars). The confidence-caption floats card-less, white/40 text on the CorrelationMatrix body. Connect Source button is a full-width orange CTA at the bottom, `--radius-pill` (999pt), no glow inline (a button, not a hero, carries no glow).

### Typographic rhythm

Apply `CK-P3` locked scale: hero eyebrow "Correlation engine" is `.eyebrow` (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); hero title "Every source becomes a signal, not clutter" is `--text-h2` (20pt) / 600 / `--leading-snug` (1.25); signal pills ("2 live sources") are `--text-caption` (13pt) / 600 / white 100%; source provider name is `--text-h3` (17pt) / 600 / white 100%; source status/sync text is `--text-caption` (13pt) / 400 / white 50%; correlation row label ("Sleep affects tempo pace") is `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 100%; correlation strength number is `--text-h3` (17pt) / 700 / white 100% with tabular-nums; confidence caption is `--text-caption` (13pt) / 400 / white 40%; source-health note ("Source health" label) is `.eyebrow` (12pt / 600); Connect Source button label is `--text-h3` (17pt) / 600 / white. Hierarchy by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 brand-orange words: the "Connect source" CTA label and an optional "Refresh" action word in source rows (if needed). Chillax logo-only (none on this screen).

### Microcopy (before → after)

Every authored string follows `CK-P5` voice — warm, plain, coaching, non-shaming, specific to data, no exclamation marks, the period with intent. Specific microcopy:

- **Correlation engine hero title** — *before:* "Correlation engine" (given) → *after:* "Every source becomes a signal, not clutter." (explains the why; warm, plain; uses the period).
- **Hero signal pills** — *before:* "2 live sources" / "3 correlations" (bare) → *after (on-voice):* same text, but announced in an `aria-label` as context ("Connected sources providing signals" / "Detected cross-source patterns"); the pills are the hero's visual accent, not a secondary detail.
- **Source row status, healthy** — *before:* icon + recency text "Synced 8m ago" → *after (given, on-voice):* text is warm — "Synced 8 minutes ago" (not "8m", expand for readability); announced in `aria-label` as "WHOOP: healthy, synced 8 minutes ago."
- **Source row status, stale/needs refresh** — *before:* "Refresh" button label (bare) → *after (on-voice):* same, but the row gains a constructive framing line in a detail sheet (see Source Detail states, below): "Reconnect Spotify to keep music context fresh" (never "Spotify is broken").
- **Correlation row label** — *before:* "Sleep affects tempo pace" (given) → *after:* same, but in the detail sheet, the SIA explanation adds context: "On days you sleep 7+ hours, you maintain a steadier tempo. We've tracked 14 days." (specific, honest window, earns the purple).
- **Confidence caption** — *before:* "based on 14 synced days of WHOOP + Calendar" (given) → *after:* same (already precise, non-shaming).
- **Cold-start state, no sources** — *before:* empty grid (not authored) → *after (new):* hero message "Connect your first source to begin analyzing patterns" (warm, invitation, never "sources required").
- **Analyzing state, <1-2 weeks** — *before:* empty grid (not authored) → *after (new):* "SIA is analyzing your patterns. Correlations appear after 1–2 weeks of synced data." (honest timeline, never "please wait"; the grid shows hint text ghosted cells, not a blank page).
- **Partial / too-few-sources** — *before:* (not addressed) → *after (new):* "Connect more sources to detect patterns" (constructive, invitation framing).
- **Error state, sync failed** — *before:* (not addressed) → *after (new):* "Couldn't load Spotify health check — pull to refresh" (what failed, recovery action named; operator error only, never shaming).
- **Connect Source button** — *before:* "Connect source" (given) → *after:* same (already on-voice).
- **Offline state banner (if applicable)** — *before:* (not addressed) → *after (new):* "Showing last synced data — offline. Refresh when connected." (honest, glyph-marked, never silently fresh).

No generic copy, no generic SIA ("Success!"), no shaming. All SIA insights are specific to the user's data (a real detected correlation) or absent. Non-shaming in all states: low-evidence signals are "early signal — based on N days" (transparent), not hidden.

### Motion choreography

Draw-first, per `CK-P4` and §8. **On-entry sequence (locked timings):**

1. **Correlation engine hero** fades in + `--surface-backplate` radiance settles, 280ms `--ease-out-soft` (establishes context first).
2. **Source-health tiles** stagger in with a count-up on each freshness figure: each tile's entry is `--dur-base` 280ms `--ease-out-soft`, staggered 40–80ms apart; the "Synced 8m ago" number animates upward `0→8` (the count-up, `--dur-base` 280ms, a small motion that humanizes the data).
3. **CorrelationMatrix grid** cells and strength bars draw in **row-by-row** on scroll-into-view (the focal element): the cells fade/scale-in gently (a *draw*, not opacity-fade) with a stagger per row; the ranked-row strength bars **rise 0→target width** over `--dur-slow` 520ms `--ease-flow` (a fill motion, never an opacity-fade — the bar *grows*, earning the signature). Stagger per row ~60ms.
4. **Confidence captions** settle in after the bars (they are secondary text, tertiary motion).
5. **Source detail sheet** (when tapped) slides up 520ms `--ease-flow`.

**Reduced-motion:** `prefers-reduced-motion: reduce` → grid renders at final intensity (all cells visible at full opacity, not a skeleton) and bars at final width instantly (no fill sweep), tiles at final count instantly. The settled frame (grid complete, bars filled, tiles at final count) is the canonical frame. Stagger removed.

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / no sources** | Hero + empty CorrelationMatrix grid with ghosted cells; "0 live sources" signal; icon hint text (database icon faded to white/20) | "Connect your first source to begin analyzing patterns" — warm, invitation. Signal pill reads "0 live sources · 0 detected patterns" | ink-brown-800 cards + `--edge-highlight`; no glow; purple is absent (no SIA signal yet) |
| **Loading / analyzing (<2 weeks)** | Hero + CorrelationMatrix skeleton (pulse-breathing cell skeletons preserving layout, spokes/ring visible); source tile skeletons | "SIA is analyzing your patterns. Correlations appear after 1–2 weeks of synced data" (honest timeline, never "please wait") | Same depth as rest; skeleton bars are visible + animated breathing, not blank boxes |
| **Empty / too-few sources** | Hero + CorrelationMatrix visible but sparse (1–2 cells computed, rest ghosted); "N live sources" signal | "Connect more sources to detect patterns" (constructive invitation, not "required") | Ghosted cells are dashed borders / white-10, visually distinct from zero-value cells; no error red |
| **Partial / computed + ghosted cells** | Hero + CorrelationMatrix with some cells filled (colored) + ghosted cells (dashed); strength bars render for computed rows only | Rendered rows show confidence captions ("based on 14 days"); ghosted rows are absent from ranked list (never shown as N/A) | Computed cells are royal-purple (`--color-royal-purple`); ghosted are `white/10` dashed (honest no-data ≠ zero); honesty is visual |
| **Error / sync failed** | Hero (may be cached) + CorrelationMatrix replaced with error card; failed source row has red refresh action + recovery text | "Couldn't load [Source name] — pull to refresh" OR "Couldn't load correlations — pull to refresh" (names the failure, recovery action explicit; never a generic "error") | Error message in `white` (not red text, per non-shaming rule); the red appears only if a *refresh* action has failed for a source (operational red, glyph-paired with `!` icon + word "Needs attention") |
| **Offline / stale cached data** | Hero (may be older) + CorrelationMatrix (older data, faded/desaturated or with a dimming overlay); "Showing last synced data" banner at the top | "Showing last synced data — offline. Refresh when connected." (honest, never silently fresh; timestamp disclosed) | No red; banner is white/30 text + alert icon (glyph + word, never colour-alone) on `ink-brown-800` + `--edge-highlight`; data is visible but visually downgraded (opacity 0.7 or a subtle desaturate) |

### Signature & anti-generic

**One ownable Balencia moment:** the **ranked-row strength bars in royal-purple** (`--color-royal-purple`, Intelligence-Mode, SIA correlation register) that **rise 0→target** over 520ms `--ease-flow` — a draw motion, never a fade. The bars are the continuous-stroke motif simplified: each bar is a rounded-pill shape (no break), a single continuous color (no segmentation), round-capped ends, and **the strength number beside it in tabular-nums** (weight + count-up animation for precision). This is the signature: "every data element draws, never fades" (§8), and the royal-purple **earned** by SIA's detected insight (never applied casually; purple is absent in cold-start and error states where SIA has no signal). The branded period is used in the hero: "Every source becomes a signal, not clutter." — a statement, a promise, ownable.

**Generic tells removed:**
- No bare "Loading..." spinner (replaced with depth-preserving skeleton grid).
- No flat colour-only status (every status is glyph + word: ✓ "Healthy" · ~ "Stale" · ! "Needs attention").
- No generic "Success!" toast (states are named: "Stats refreshed" is specific to data refresh; success is a brief `--glow-green` flash 600ms on the refresh action).
- No decorative chart (every cell and bar encodes data; no padding cells or fake data).
- No generic copy (every string is authored to voice).
- No symmetric-card monotony (the source tiles are a list, the matrix is the focal grid; the layout is not a 3-card grid repeating).

### Accessibility

**Contrast (WCAG 1.4.11):**
- Text / white on `ink-brown-800` (`--color-ink-brown-800`) ≥4.5:1 contrast ✓
- Load-bearing graphics (status glyphs ✓ / ~ / !, correlation cell borders, strength-bar fill) ≥3:1 vs background ✓
- Strength bars: the orange `--color-brand-orange` fill vs `--color-alpha-white-08` track ≥3:1 ✓
- Ghosted cells (dashed white/10 border) on `ink-brown-800` are decorative (no contrast requirement) ✓

**Colour + glyph + word (never colour-alone):**
- Source health: ✓ / ~ / ! glyphs **+ word labels** ("Healthy" / "Stale" / "Needs attention") — colour (green / amber / red) is a tertiary cue ✓
- Correlation direction: +/− glyph **+ word** ("reinforcing" / "competing") + tint (purple / cool) — colour is tertiary ✓
- Status red: **calibrated operational red only** — glyph + word paired, only on genuine sync fault (never on a person or a score), fix affordance visible ✓

**Focus & interaction:**
- Every interactive element (source row, correlation row, detail link) is ≥44×44pt ✓
- Focus-visible ring: `CK-T03 --focus-ring` (2px orange, 2px offset on dark field) app-wide ✓
- Keyboard navigation: Tab order follows visual order (source rows → matrix rows → detail links); Enter/Space confirms taps ✓

**Motion & reduced-motion:**
- `prefers-reduced-motion: reduce` → grid and bars at final state instantly (no stagger, no sweep); skeleton frames are skipped, final settled frame shown ✓
- Essential info (strength value, data labels) is always visible (not dependent on animation completion) ✓

**Screen reader / semantic:**
- Source row `aria-label`: "[Provider name]: [status], synced [time ago]" (such as "WHOOP: healthy, synced 8 minutes ago") ✓
- Correlation matrix cell (if tappable) `aria-label`: "[Source A] and [Source B]: [+/−][strength]%, [direction], [confidence]" ✓
- Ranked row is a semantic link/button; tap opens detail sheet ✓
- Error message is `role="alert"` so screen reader announces immediately ✓
- Offline banner is `role="status"` or `aria-live="polite"` ✓

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card/row surfaces | #211008 | ink-brown-800 | Content cards |
| Primary action | #FF5E00 | brand-orange | Connect/refresh-needed |
| Correlation strength ink | #7F24FF | royal-purple | SIA-detected (Intelligence Mode); strength bars + count — cite `_shared-patterns.md` |
| SIA correlation signal | #7F24FF | royal-purple | Correlation count pill + correlation strength fills (Intelligence Mode) |
| Active source | #34A853 | forest-green | Connected/healthy |
| Text primary | #FFFFFF | white | Labels |
| Text secondary | #FFFFFF at 35-50% | white/50 | Metadata |

**60/30/10 verification**: Orange is the Connect/Refresh action only. Purple denotes all SIA-detected correlations (strength fills + count) in Intelligence Mode. Green marks healthy operational status; amber + calibrated red mark stale / needs-attention status (the one honest red — always glyph-paired with a fix affordance, never shaming). No domain colour (cyan/learning) is used as data ink.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Source row | Active | Green icon tile |
| Source row | Needs refresh | Orange icon tile and muted status |
| Source row | Pressed | border brand-orange/25 |
| Correlation row | Pressed | royal-purple/40 border, strength bar brightens |
| Connect source | Loading | Spinner and "Connecting..." |
| Connect source | Success | Green check toast |

---

## Motion

- Source-health tiles settle in a 70ms stagger; each freshness figure counts up (`--dur-base` 280ms `--ease-out-soft`).
- CorrelationMatrix cells fade/scale-in row-by-row on scroll-into-view (`--dur-base` 280ms `--ease-out-soft`, small stagger) — draw, never opacity-fade (§8).
- Ranked correlation strength bars rise 0→target over `--dur-slow` 520ms `--ease-flow` (rise, not fade).
- Tap → tooltip / detail sheet at `--dur-fast` 160ms; connect provider picker slides up as the standard bottom sheet.
- `prefers-reduced-motion` → grid at final intensity, bars at final width, tiles at final value; no stagger or sweep.
- Connect provider picker slides up as standard bottom sheet.

---

## Empty, Loading, Error

- **No sources**: Show hero with "0 live sources" and empty state "Connect your first source".
- **Source expired**: Row remains visible with orange refresh state.
- **Sync failed**: Source detail shows last successful sync and retry.
- **Correlation unavailable**: Correlations section shows "Connect more sources to detect patterns".
- **Loading**: Hero skeleton, three source row skeletons, correlation skeleton bars.

---

## Accessibility

- Source rows announce provider name, data categories, and connection health.
- Correlation bars include numeric strength and plain-language label.
- Connect source button label: "Connect data source".
- Refresh-needed states use text and icon, not color only.
- Disconnect actions in detail sheets require confirmation.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/me/data-sources/page.tsx`.
- Related controls also exist in Connected Services [22]; this screen focuses on source health and coaching signals.
- Data source use must respect consent from Consent [03c] and settings/privacy controls [21].
- No runtime route/API changes are required.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-10.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/tabs/me/data-sources`
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
| B10-F04 | critical | navigation | Wire Connect source to a provider picker/OAuth flow with success, cancel, loading, and error states. |
| B10-F05 | major | trust-privacy | Make rows/correlations semantic links or buttons, add source detail/refresh/disconnect flows, and make Back a labeled 44px control. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

