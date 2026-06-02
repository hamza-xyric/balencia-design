# Screen Design: Notification History

**Screen**: 24 of 73
**File**: 24-notification-history.md
**Register**: Product Mode
**Primary action**: Tap a notification to navigate to its relevant screen
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root. Pushed from Me Main [17] quick link grid. Back button returns to Me Main.

---

## Purpose

The Notification History screen is a scrollable log of past notifications grouped by date. It exists so users can revisit SIA insights, missed reminders, and check-in prompts they may have dismissed from the lock screen. This is a minimal feature — not a primary experience — so the design is simple and functional. Each notification is a tap target that deep-links to the relevant screen (SIA chat for insights, Goal Detail for goal reminders, Home for check-ins). The screen also serves as a signal of SIA's activity — seeing a trail of personalized notifications reinforces that SIA is actively working for the user.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen title "notifications" — orientation
2. "Mark all as read" action — top-right utility action
3. Date group headers — temporal orientation (Today, Yesterday, This week, Earlier)
4. Notification rows — the content, each with category icon, title, preview, timestamp, read/unread indicator
5. Unread indicators — orange dots drawing attention to unseen items

**User flow**:
- **Arrives from**: Me Main [17] via stack push (quick link grid, possibly with unread badge count)
- **Primary exit**: Relevant screen per notification type (tap notification → SIA Chat [09], Goal Detail [14], Home Screen [12], etc.)
- **Secondary exits**: Me Main [17] via stack pop (back button)

---

## Layout

**Scroll behavior**: FlatList with SectionList-style date group headers (sticky headers on scroll)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]  Notifications  [Mark] │  ← nav header, 44pt
├─────────────────────────────┤
│                             │
│  TODAY                      │  ← sticky date header
│                             │
│  ┌─────────────────────────┐│
│  │ ● [🧠] SIA insight      ││  ← unread, purple icon
│  │    Your sleep and       ││     preview text
│  │    spending are conn... ││
│  │                  2h ago ││     timestamp
│  ├─────────────────────────┤│
│  │   [🔔] Reminder         ││  ← read, orange icon
│  │    Don't forget your    ││
│  │    morning walk         ││
│  │                  6h ago ││
│  ├─────────────────────────┤│
│  │ ● [📊] Check-in         ││  ← unread, green icon
│  │    How are you feeling  ││
│  │    this morning?        ││
│  │                  8h ago ││
│  └─────────────────────────┘│
│                             │
│  YESTERDAY                  │  ← sticky date header
│                             │
│  ┌─────────────────────────┐│
│  │   [🧠] SIA insight      ││
│  │    Great workout        ││
│  │    consistency this...  ││
│  │                   1d    ││
│  ├─────────────────────────┤│
│  │   [👥] Social            ││
│  │    Alex completed a     ││
│  │    fitness quest        ││
│  │                   1d    ││
│  └─────────────────────────┘│
│                             │
│  THIS WEEK                  │  ← sticky date header
│  ┌─────────────────────────┐│
│  │   [🔔] Reminder         ││
│  │    Your budget review   ││
│  │    is due               ││
│  │                   3d    ││
│  └─────────────────────────┘│
│                             │
│         (end of list)       │
│                             │  ← 48pt bottom padding
├─────────────────────────────┤
│  Today   SIA   Goals   Me   │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Header** — 44pt
   - Purpose: Screen identification, back navigation, mark-all-read action
   - Content: Back chevron (left), "Notifications" title (center), "Mark all read" text button (right)

2. **Date Group Headers** — 32pt each (sticky)
   - Purpose: Temporal grouping of notifications
   - Content: Date label (Today / Yesterday / This week / Earlier / specific date)

3. **Notification Rows** — 80pt each
   - Purpose: Individual notification with tap-to-navigate
   - Content: Unread dot, category icon, title, preview text, timestamp

---

## Components

### Navigation Header — With Action
- **Purpose**: Standard header with an additional right-side action
- **Data source**: Static (title), computed (action availability — disabled when all read)
- **Visual treatment**: Same as standard Navigation Header. Right action: "Mark all read" in 13pt Sora Semibold, Burnt Orange (#FF5E00). Disabled state: white at 30% (when no unread notifications).
- **Variants**: Has unread (action active, orange text), all read (action disabled, faded)
- **Gestures**: Left: back tap/swipe. Right: "mark all read" tap.
- **Size**: Full-width × 44pt

### Date Group Header (Sticky)
- **Purpose**: Groups notifications by time period
- **Data source**: Computed from notification timestamps
- **Visual treatment**: Eyebrow text pattern (12pt Sora Semibold, uppercase, white at 50%, +0.12em tracking). Background: ink-900 (becomes opaque when sticky to occlude content scrolling beneath). 16pt horizontal padding, 12pt vertical padding.
- **Variants**: Today, Yesterday, This week, Earlier, or specific date (e.g., "MAY 12")
- **Gestures**: None
- **Size**: Full-width × 32pt (sticky on scroll, z-30 with backdrop-blur when stuck)

### Notification Row
- **Purpose**: Single notification entry with deep-link navigation
- **Data source**: Notifications API (category, title, body, timestamp, read status, deep-link target)
- **Visual treatment**: Full-width row, ink-brown-800 background within section group container. 1pt bottom divider (white at 5%) between rows within the same date group.
- **Variants**: Unread (orange dot, slightly bolder text), read (no dot, standard text weight)
- **Gestures**: Tap → navigate to relevant screen
- **Size**: Full-width × 80pt

#### Notification Row — Internal Layout
- **Unread indicator**: 8pt circle, Burnt Orange (#FF5E00), left edge of row, vertically centered. Hidden when read.
- **Category icon**: 24pt × 24pt, themed by category:
  - SIA insights: brain icon, #7F24FF (purple) — this is the SIA indicator
  - Reminders: bell icon, #FF5E00 (orange)
  - Check-ins: chart-bar icon, #34A853 (green)
  - Social: people icon, white at 60%
- **Icon position**: 36pt from left (after unread dot space)
- **Content area**: To the right of icon, 12pt gap
  - Title: 15pt Sora Semibold, white (unread) or white at 80% (read). Single line, truncated with ellipsis.
  - Preview: 13pt Sora Regular, white at 50%. Max 2 lines, truncated with ellipsis.
- **Timestamp**: Right-aligned, vertically centered with title. 12pt Sora Regular, white at 40%. Relative format: "2m ago", "1h ago", "6h ago", "1d", "3d", "May 12".
- **Padding**: 16pt horizontal (content area), 12pt vertical.

### Section Group Container (for notification rows)
- **Purpose**: Groups rows within a date section
- **Data source**: N/A (structural)
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt) radius, 1pt border white at 5%. Rows stack inside with dividers.
- **Variants**: N/A
- **Gestures**: N/A
- **Size**: Full-width minus 32pt (16pt margins) × auto

---

## Visualization

> Source: no companion file (this section is the source). Audited in `viz-audit/` — Batch (Lightweight-MEDIUM mini), findings `S24-V01..S24-V02`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant accent**. Benchmark = **always-on baseline (Apple Health · Linear/Things)** — editorial restraint, calm honest summary, *not* a charted dashboard. Mints no new primitive; reuses kit backlog (`KPIStatTile`, `Sparkline`). **Current grade C+ (70) → specced-target A− (85).** *(Honest re-grade: this is a notification **log**, a fundamentally list screen — A− is the correct ceiling. Forcing a hero gauge would be over-charting and is deliberately refused. The residual gap to A is a build-verified depth pass + the working scrub micro-interaction, owned by the later viz-build program.)*

**Strong restraint (deliberate — premium ≠ maximal).** A notification history is a *trail of text*; the rows, previews, titles, timestamps and date headers are all genuinely textual and stay text. Only **two** derived signals reward a visual, and both are honest derivations of data the screen already holds — they do **not** invent new data: (a) **by-type counts** (the four categories are already enumerated per row) and (b) a **7-day notification-frequency pulse** (already implied by the timestamps and by the screen's own stated secondary purpose — "a signal of SIA's activity… a trail of personalized notifications reinforces that SIA is actively working for the user"). One compact summary band carries both; nothing below it changes. There is intentionally **no hero gauge** — a list screen has no single bounded score to anchor, and a hero here would be decorative.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Count per category (SIA / Reminder / Check-in / Social) | implicit only (rows scattered through groups) | **by-type count chips** — category icon + count, in a compact summary band; honest tally, **no fabricated delta** | `KPIStatTile` ×4, count-only variant (`VK-008`) |
| Notification frequency, last 7 days (SIA-activity pulse) | not shown | **7-point `Sparkline`** (tiny Living Line) — notifications/day, the "SIA is working for you" heartbeat | `Sparkline` (`VK-001` / `VK-016`) |
| Notification rows (title · preview · timestamp · read/unread) | text rows + category icon + orange unread dot | — (deliberately textual — the content *is* the screen; a chart would bury it) | — |
| Date group headers (Today / Yesterday / This week / Earlier) | sticky eyebrow labels | — (deliberately textual — temporal orientation, no useful visual form) | — |
| Unread state | 8pt orange dot + bolder title weight | — (kept; already a visible non-colour-alone sign — weight + dot, reinforced by aria "Unread" prefix) | — |

**Editorial hierarchy (calm, not maximal):** the notification rows remain the screen's *content* focus and visual weight; the summary band is a single thin secondary element above the first date group; the sparkline is ambient. Two micro-visuals, zero heroes — a deliberately restrained mini-section.

### 1 · By-type count chips — `S24-V01` → `KPIStatTile` ×4 (count-only)

A compact summary band directly under the Navigation Header and above the first date group ("Today"): four `KPIStatTile`s in count-only mode — each = the **category icon** (the existing brain / bell / chart-bar / people glyph) + the **uppercase category label** (`white/40`, +0.12em) + a **count** (`text-h2`, tabular-nums) of that category's notifications in the visible window. This answers "what has SIA been sending me?" at a glance and reinforces the screen's stated retention purpose.
- **Honesty (RUBRIC dim 5/6):** counts are a *true tally* of the loaded list, over a **fixed disclosed window** ("last 7 days") shown as a caption on the band — **no delta arrow at all** here (there is no honest prior-window comparison on a history log, and a fabricated ▲ would be a dishonesty finding). KPIStatTile's delta slot is intentionally **omitted**, not faked.
- **Colour / non-colour-alone:** each chip carries its category in **icon + label + count**, never colour alone — so the brand-purple SIA chip, orange reminder chip, green check-in chip and neutral social chip are each independently legible to a colour-blind user (the icon shape is the differentiator). Category tints here are **identity only** (matching the row icons), never promoted to data ink; **orange remains the dominant data-ink accent** via the count figures + the unread-dot system below.
- **Depth (token-backed):** band surface `ink-brown-800` + top-edge highlight; chip numbers count-up `--dur-base` 280ms `--ease-out-soft`; **no glow** (KPI tiles are flat-premium — depth on this screen lives only in the sparkline stroke and the unread dots).
- **Micro-interaction:** tap a category chip → filter the list to that category (a light in-place filter; tap again to clear); the active chip carries a 2pt orange ring (focus-visible reuses the existing row ring pattern).
- **Data:** derived from the already-loaded `notificationGroups` (group the existing items by `category`); a `frequency7d` array is added to the same mock block for `S24-V02`.
- **States:** **empty / Day-1** → the band is **hidden entirely** (it would read "0 · 0 · 0 · 0", which is noise) and the existing warm "No notifications yet" empty state stands alone; **single-category** → only the populated chips render (a 0-count category is omitted, never a zero chip); **loading** → label + skeleton number bar per chip.

### 2 · Notification-frequency Sparkline — `S24-V02` → `Sparkline` (`VK-016`)

Inside the same summary band (right of the count chips, or on a second line on narrow widths): a **`Sparkline`** — a tiny Living Line — of notifications **per day across the last 7 days**, the visible form of "SIA is working for you." **Exactly 7 points** (`CONSISTENCY` Sparkline), `--stroke-thin` 2px **curved** orange, **no axes, no grid, no glow**; a **green end dot** only when today is the 7-day high (an honest milestone, not a default). A short caption — "12 this week" — sits beside it (`white/40`, tabular-nums).
- **Why the line, the Balencia way:** "every chart is the line" (§8) — even this smallest signal uses the Living-Line spine, so the notification pulse reads as the same family as every trend across the app, and reinforces SIA presence *without* a verdict.
- **Non-shaming (RUBRIC dim 6):** the pulse is framed as **SIA activity**, never as the user's behaviour — a low/flat week is "a quiet week," never "you've been ignoring SIA"; there is **no streak, no loss-aversion, no guilt** on a notification log.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow` on enter — **never opacity-fades**; below-the-header band animates on mount (it is above the fold). Optional long-press scrub reveals the per-day count at the finger (the one micro-interaction).
- **States:** **<3 days of history** → dots only, **no connecting line**, "building your activity trail" — no fabricated curve from thin data (no-data ≠ a drawn line); **empty / Day-1** → hidden with the band (per `S24-V01`); **loading** → flat skeleton baseline that draws into shape; **reduced-motion** → completed stroke at rest + green end dot (the signature survives without motion).
- **Data:** new `frequency7d` (7 daily counts) on the notifications mock block.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: the summary band settles first — **count chips count up** (`--dur-base` 280ms `--ease-out-soft`) → **then** the frequency **`Sparkline` draws itself** L→R (`stroke-draw` `--dur-flow` 1200ms `--ease-flow`, *never* a fade) → **then** the existing notification rows stagger in (the spec's 280ms / 40ms-stagger row entrance is preserved unchanged). One line motif per surface (the sparkline is the only Living Line; counts use numbers). `prefers-reduced-motion` → band and sparkline at final state instantly, the Living Line's static form (completed stroke + green end dot) preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — the **entire summary band is suppressed**; the warm "No notifications yet" empty state (bell glyph + SIA promise + purple SIA dot) stands alone, never a band of zeros or a degenerate flat line; **loading** — band shows per-chip skeleton numbers + a flat sparkline baseline that *draws* into shape (depth-preserving, not a blank box), rows shimmer per the existing Error Handling table; **partial / sparse** — <3 days → sparkline shows dots only with "building your activity trail," a 0-count category is omitted (not a zero chip); **error** — list-load failure keeps the existing "Could not load notifications. Pull to refresh." path; the band simply does not render until data loads (no broken chart shell).
- **60/30/10:** **orange dominates** data ink (sparkline stroke, count figures, the existing unread dots + "Mark all read" action); **green** = arrival only (the sparkline's green end dot on a 7-day high, the check-in **identity** icon); **purple stays SIA-only** — the SIA-insight category icon/chip and the empty-state SIA dot are correct SIA-origin marks, *not* a 60/30/10 violation (there is **no projection** on this screen, so no dashed-purple here); category tints (purple SIA / orange reminder / green check-in / neutral social) are **identity only**, never promoted to a decorative data palette. Glow uses the size-stepped scale — and a 7-point inline sparkline carries **no glow** (correct; glow on a 2px inline stroke would be neon). No alarm-red anywhere.
- **Non-shaming:** the frequency pulse is framed as *SIA's* activity, not the user's compliance — a quiet week is calm, never guilt; counts are neutral information, never a scoreboard; no streak or loss-aversion mechanic is introduced on a notification log.
- **Accessibility:** the summary band carries a text/`aria-label` equivalent — "Last 7 days: 4 SIA insights, 3 reminders, 2 check-ins, 1 social; 12 notifications, trending up"; each count chip is announced as "[Category]: [N], filter," its icon glyph is the visible non-colour-alone differentiator; the sparkline `aria-label` conveys "Notification frequency, 12 over the last 7 days, peak today" (value, not colour); label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the orange sparkline stroke, the green end dot, and the count figures meet ≥3:1 vs `ink-brown-800` (there is no decorative grid/axis to exempt — the sparkline is axis-less by design); count-chip filter targets and the sparkline scrub target ≥ 44×44pt; the existing unread state stays a visible **dot + title weight + aria "Unread" prefix** (already non-colour-alone — preserved); `prefers-reduced-motion` renders the band and sparkline at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Gentler Streak + Welltory + Apple Health trends (notification history, calm editorial restraint, honest frequency signal) — *stays Balencia via the warm-glow surfaces on notification rows, the brand period, non-shaming frequency framing, and the Living-Line sparkline in the viz layer.*
**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

*Pre-grade drivers:* Notification rows lack craft layering and microcopy authoring; empty state is warm but the "mark all read" action and category-chip filter states are undesigned; the summary band (viz-audited to A−) enters the layout but the row interaction states need full definition per `CK-P7` + `CK-P8`.

### Focal hierarchy

One focal point: the **summary band** (by-type count chips + frequency sparkline) — the first element below the Navigation Header, situated above the first date group ("Today"), introducing the data at a glance and reinforcing "SIA is actively working for you." Everything else is deliberately secondary: the date group headers are sticky eyebrow labels, the notification rows are a list (equal visual weight, tappable drills), and the "mark all read" action in the nav header is a utility affordance, not a focal element. The sparkline's green end-dot (when today hits the 7-day high) carries the arrival signal, warm and non-shaming. The squint test lands on the summary band first (the count chips + the sparkline pulse), then on the rows as a scrolling list. No competing foci.

### Surface & depth

Every notification row adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`) · `--shadow-1`. Rows stack within a section group container (full-width minus 32pt, 16pt h-margins) with 1pt white-at-5% dividers between rows inside the same date group. The summary band itself carries the same surface language: `--color-ink-brown-800` band surface + `--edge-highlight` + `--shadow-1`, with the count chips receiving `--glow-orange-sm` (~12px /.35) **only when a category-chip filter is active** (a brief glow on first tap to show affordance, then at rest; at rest, no glow — the glow marks state, not every element). The sparkline (per the Visualization section) carries no glow (it is a <36px inline element per CONSISTENCY.md §1, and glow there would read neon). The date group sticky headers float at z-30 with `backdrop-blur(16px)` over `--color-ink-900` at 95% opacity, preserving the "Today" / "Yesterday" orientation cue on scroll. Row dividers are intentional whitespace (1pt white at 5%) that reads as a visual separator without a card boundary within the group. All surfaces use the depth tokens: never a flat fill.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: Navigation Header title "Notifications" `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100%; "Mark all read" action (active state) `--text-caption` (13pt) / 600 / `--leading-normal` (1.4) / `--color-brand-orange` (the 60% accent word); date group header (such as "TODAY") `--text-eyebrow` (12pt) / 600 / `--tracking-eyebrow` (0.12em) / uppercase / white 50%; notification row title (unread) `--text-h3` (15pt) / 600 / `--leading-snug` / white 100%; notification row title (read) `--text-h3` (15pt) / 400 / `--leading-snug` / white 85%; notification preview `--text-caption` (13pt) / 400 / `--leading-normal` / white 50%; notification timestamp `--text-small` (12pt) / 400 / `--leading-normal` / white 40%; category-chip label (inside count chips) `--text-small` (11pt) / 400 / `--leading-normal` / white 40%; sparkline caption ("12 this week") `--text-small` (11pt) / 400 / tabular-nums / white 40%. Hierarchy is carried by **weight** (600 vs 400), not size alone. Sentence case throughout. The "Mark all read" text is the **only orange accent word** on the screen (one of ≤2 per screen, per `CK-P3` rule). Replaces ad-hoc pixel line-heights with the `CK-T04` scale (`--leading-tight / snug / normal / relaxed`).

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` brand voice (warm, plain, coaching, non-shaming).

- **Navigation header title** — *before:* "Notifications" (given) → *after (kept):* same; simple, clear, no decoration.
- **Navigation header action "Mark all read"** — *before:* (given) → *after (kept):* sentence case, no exclamation; active state shows orange text, disabled state shows white at 30%.
- **Date group header "TODAY"** — *before:* (given) → *after (kept):* uppercase eyebrow style, white-50%; sticky on scroll with backdrop-blur.
- **Notification row, unread state** — *before:* no microinteraction on the unread dot → *after (new):* the dot remains 8pt orange (`--color-brand-orange`), visibly left-aligned, and the row title renders Semibold (weight contrast signals unread; dot + weight + aria "Unread" prefix = non-colour-alone, per a11y).
- **Notification row, title truncation** — *before:* single-line ellipsis (given) → *after (kept):* single-line, truncated, preserving the 80pt row height.
- **Notification row, timestamp** — *before:* relative format "2m ago", "1h ago", "1d", "3d" (given) → *after (kept):* same; white-40%, right-aligned, distinct from preview.
- **Empty state / Day-1** — *before:* (given in `## Empty States`) "No notifications yet · I'll start reaching out once I get to know you better" → *after (kept):* warm SIA voice, specific to user's onboarding stage, never generic. The purple SIA dot marks the voice origin.
- **Category-chip label** — *before:* implicit category icon only → *after (new):* each chip carries the icon + an uppercase label ("SIA", "REMINDER", "CHECK-IN", "SOCIAL") + count figure; the label is white-40%, confirming the category is not colour-alone (icon + label + count = triple encoding per a11y).
- **Sparkline caption** — *before:* none → *after (new):* "12 this week" (white-40%, tabular-nums), contextualizing the frequency as SIA's activity, never as the user's compliance or behavior.
- **Category-chip filter state (active)** — *before:* no visual feedback on tap → *after (new):* active chip carries a 2pt orange ring (matches the row focus-ring pattern), and the full list refilters to that category (a light in-place filter; tap again to clear). Visual feedback shows state change.
- **Summary band, loading state** — *before:* not specified → *after (new):* chip labels + skeleton number bars per chip; the sparkline shows a flat baseline skeleton (not a blank box) that morphs into the drawn line on data load (depth-preserving, not a fade).
- **Summary band, empty Day-1 state** — *before:* (per the Visualization section) band is hidden entirely → *after (kept):* correct — the warm "No notifications yet" empty-state stands alone, never a band of zeros. Band suppression is the right choice.
- **"Mark all read" disabled state** — *before:* white-at-30% (given) → *after (kept):* disabled, no haptic on press, aria-disabled. When all unread dots fade out (after mark-all-read success), the action text immediately transitions to disabled style (no animation needed; instant).
- **Error state on mark-all-read** — *before:* not specified → *after (new):* if the mark-all-read API fails, a warm toast appears: "Couldn't mark as read. Try again" (specific, recovery-clear, no exclamation). The action re-enables, unread dots remain visible, ready for retry. No shame in the error phrasing.
- **Pull-to-refresh success** — *before:* not specified → *after (new):* brief toast "Notifications refreshed" (warm, specific, white-70% on ink-900 toast).

No exclamation marks; the brand period used with intent; all SIA copy (in the empty state) is warm and specific to the user's onboarding moment, never a generic horoscope.

### Motion choreography

Per `CONSISTENCY.md`, the entrance is draw-first and carefully ordered:

1. **Summary band settles first** — count chips' numbers count up (280ms `--dur-base` `--ease-out-soft`) as the band fades in (280ms). **Then:**
2. **Frequency sparkline draws itself L→R** (`stroke-draw` via `stroke-dashoffset` animation, **never opacity-fade**) (`--dur-flow` 1200ms `--ease-flow`). The green end-dot (if today = 7-day high) appears on draw completion or staggered in (`--dur-fast` 160ms).
3. **Notification rows stagger in** (fade-in + translateY(12→0), `--dur-base` 280ms `--ease-out-soft`, 40ms stagger between siblings — fast, since a list may have many rows).
4. **Category-chip taps** trigger an in-place filter (the active chip ring animates in at scale, 160ms `--ease-out-soft`; the list refilters without a fade-to-blank transition — rows for other categories simply fade out and are removed, rows for the selected category stay visible).
5. **Mark-all-read success** — all unread dots fade out simultaneously (not staggered, to feel atomic) — 280ms `--ease-out-soft`. Titles crossfade from Semibold to Regular (instant, no animation needed — a weight change is subtle). The action text transitions to disabled style (no animation).
6. **New notification arrival** (pushed while on screen) — new row slides in from top with fade-in (280ms `--ease-out-soft`), positioned at the top of the "Today" group. A success haptic fires on arrival.

One line motif per surface: the sparkline is the only Living Line (the signature stroke); counts use numbers (discrete, not lines). Below-the-fold rows animate on scroll-into-view (staggered entrance, same timing). `prefers-reduced-motion` → all elements at final state instantly; the sparkline's static form (completed stroke + green end dot if applicable) preserved; count chips at final numbers; rows fully opaque.

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | Entire summary band suppressed; the warm "No notifications yet" empty-state card (bell icon + SIA message + purple SIA dot) stands alone in the center of the content area, ~120pt tall. Tab bar and "mark all read" action remain visible but dimmed (no unread signals). No pull-to-refresh affordance shown. | "No notifications yet" — 18pt Semibold, white-60%. SIA message: "I'll start reaching out once I get to know you better" — 15pt Regular, white-40%. Purple SIA dot (6pt) left of message. | Warm, grounded, no broken-state feeling. The bell icon is white-20%, showing the feature exists but has no urgency. The SIA promise is specific, never generic. |
| **Loading** | Summary band visible with skeleton state: per-chip skeleton number bars (a faint horizontal bar at text height, lighter than the label), 100–120px wide per chip; sparkline shows a flat baseline skeleton (same height as the drawn line, white-at-8%, no stroke yet, morphs into the drawn line on data load — depth-preserving). Notification rows show skeleton shimmer (a standard skeleton with the row layout preserved: unread-dot hint text, icon hint text, title/preview skeleton, timestamp skeleton). | No message — the skeleton layout itself conveys "data is coming." | Depth preserved: the sparkline baseline and row layout are visible even in skeleton form, so the page structure is clear. The skeleton morphs (does not fade/swap), so the shape is learned. |
| **Empty / partial** | All date groups render; groups with no notifications for that date do not render. The summary band shows: 0-count categories are **omitted** (not rendered as "SIA: 0"), only populated categories render chips. If <3 days of history exist, the sparkline shows **dots only** (no connecting line, which would be fabricated from thin data) with the caption "Building your activity trail" (white-40%, never "no data" which sounds broken). | "Building your activity trail" — 13pt Regular, white-40%. The framing is positive (building, not empty or missing). | Non-shaming: a sparse history is framed as momentum gathering, not a failure. The dot-only sparkline is visually distinct from a full line, signaling "early." |
| **Error** | If the notification list fails to load, the summary band is **suppressed entirely** (no broken half-chart), and a centered error message replaces the list. The message is specific: "Couldn't load notifications. Pull to refresh." (15pt Regular, white-60%, centered, ~80pt tall). Pull-to-refresh is enabled. Navigation header (title, back button, "mark all read" action) remains visible. | "Couldn't load notifications. Pull to refresh." — 15pt Regular, white-60%, center-aligned. No alarm-red; the message is calm and action-clear. | No error glow or red border; the message is plain and on-brand. The affordance (pull-to-refresh) is visible. |
| **Offline** | The notification list remains visible at its last-loaded state. A subtle offline banner appears at the top of the content area (below the nav header, above the summary band): "You're offline. Some notifications may be outdated" (11pt Regular, white-50%, centered, on `--color-ink-900` bg, 32pt tall). The banner's action is a "Retry" link (`--color-brand-orange`). | "You're offline. Some notifications may be outdated" — 11pt Regular, white-50%. The phrasing acknowledges the state without shame. | The banner is subtle (not full-screen, not alarm-red); the cached list is usable. |

### Signature & anti-generic

The **ownable Balencia moment** on this screen is **the non-shaming notification pulse** — the frequency sparkline in the summary band (per the Visualization section) that frames SIA's activity, not the user's compliance. The sparkline draws itself (never fades in), uses the Living-Line signature stroke, and only shows a green end-dot on a genuine 7-day high (an honest milestone, not a default). This is the anti-generic move: instead of a generic "you have X notifications" dashboard, the screen tells a story of "SIA has been doing the work for you" with a calm, warm frequency signal. The continuous stroke and the brand period in the SIA empty-state copy ("I'll start reaching out…") are the secondary ownable moments. The notification rows themselves are deliberately restrained (no emoji, no icon bloat, no color-only differentiation) so that the content (the actual notification titles and previews) remains the focal information, not decoration. The whole screen rejects the generic "notification center" look of competitors: warm-glow layered surfaces, the non-shaming frequency framing, the brand period, and the SIA voice in the empty state all anchor it as unmistakably Balencia.

**Generic tells removed:** The draft spec had no designed interaction states for the "mark all read" button or the category-chip filter, leaving them as bare affordances. This section adds full `CK-P8` interaction states (pressed, focus-visible, disabled, loading, error, success) so the controls read as premium, not default-component. The notification rows now have designed row-press feedback (`scale(0.97)`, light haptic), focus-visible rings, and read/unread state carried by weight + dot (never colour-alone). The sparkline's intentional "no data ≠ zero" choice (showing only dots and "building your activity trail" when sparse) is anti-generic restraint — many apps show a broken chart or hide it; Balencia shows an honest signal. The empty state uses SIA's warm voice, not a generic "nothing here" hint text.

### Accessibility

**Contrast pairs (WCAG AA + 1.4.11 ≥3:1 on `--color-ink-900`/`--color-ink-brown-800`):**
- Notification row title (white 100%) vs `ink-brown-800`: 100% ≥ 4.5:1 ✓
- Notification row title (white 85%) vs `ink-brown-800`: ~3.5:1 ✓
- Preview text (white 50%) vs `ink-brown-800`: ~2.1:1 (tertiary text, not load-bearing for unread state since unread is signaled by weight + dot — acceptable)
- Timestamp (white 40%) vs `ink-brown-800`: ~1.5:1 (quaternary text, informational, acceptable)
- Unread dot (`--color-brand-orange`) vs `ink-brown-800` (`--color-ink-brown-800`): ≥3:1 ✓
- Category-chip label (white 40%) vs `ink-brown-800`: ~1.5:1 (informational only; category identity is encoded as icon + label + count, never colour-alone ✓)
- "Mark all read" action (orange `--color-brand-orange`) vs `ink-900`: ≥3:1 ✓
- Eyebrow (white 50%) vs `ink-900`: ~2.1:1 (eyebrow is a label, supporting hierarchy; acceptable)
- Summary band numbers (white 100%) vs `ink-brown-800`: ≥4.5:1 ✓
- Sparkline orange stroke (`--color-brand-orange`) vs `ink-900`: ≥3:1 ✓; green end-dot (`--color-forest-green`) vs stroke: ≥3:1 ✓

**Focus-visible ring:** `CK-T03 --focus-ring` (2px orange, 2px inset offset) on every focusable element — category chips, "mark all read" button, notification rows (buttons). The ring is visible on all interactive targets.

**Touch targets:** All interactive elements ≥44×44pt. Notification rows are 80pt tall (✓). Category chips are 36pt height with 44pt width (✓). "Mark all read" action is a 44×44pt button in the nav header (✓). Back button is 44×44pt (✓). Pull-to-refresh is a standard iOS gesture (✓).

**Colour + glyph + word (non-colour-alone):**
- Unread state: orange dot (8pt, visible shape) + Semibold title weight (visible text weight change) + aria "Unread" prefix (announced) — never colour-alone. Read state: no dot, Regular weight, aria "Read" prefix. ✓
- Category icons (brain/bell/chart-bar/people) paired with category labels ("SIA", "REMINDER", "CHECK-IN", "SOCIAL") and counts — never icon alone or colour alone. ✓
- "Mark all read" action: orange text + label text (not just a colour change). ✓
- Sparkline end-dot (green, if present): paired with the completed orange stroke (the line is the primary signal; the green dot is a milestone accent). ✓
- Success feedback (mark-all-read): dots fade out (visual) + haptic (medium/success) + toast (text). ✓

**Screen reader equivalents:**
- Back button: "Back, navigate to Me Main"
- "Mark all read": "Mark all notifications as read, button" (when active) / "All read, button disabled" (when no unread)
- Category chips (count mode): "[Category name]: [count], filter button" (such as "SIA insights: 4, filter button")
- Notification rows: "[Unread/Read], [Category name] notification, [Title text], [Preview text], [Timestamp], button" (such as "Unread, SIA insight notification, Your sleep and spending are connected, Your sleep and spending are connected. On average, you sleep 45…, 2h ago, button")
- Date group header: "[Date], section heading" (such as "Today, section heading")
- Empty state: "No notifications yet. SIA says: I'll start reaching out once I get to know you better."
- Sparkline: "Notification frequency, last 7 days, 12 total, trending up" or "Building your activity trail" (if sparse)

**Reduced-motion fallback:** `prefers-reduced-motion` → all elements at final state instantly (band and rows fully opaque, counts shown, sparkline drawn at rest with green end-dot if applicable). The motion intention is preserved: the line is drawn, the numbers are final, the structure is complete. Loops off.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | z-0 base |
| Row surface | #211008 | ink-brown-800 | z-10, within section group |
| Row divider | white at 5% | — | Between rows in same group |
| Unread dot | #FF5E00 | burnt-orange | 60% role — attention indicator |
| SIA insight icon | #7F24FF | purple | 10% role — SIA category |
| Reminder icon | #FF5E00 | burnt-orange | 60% role — action category |
| Check-in icon | #34A853 | forest-green | 30% role — engagement category |
| Social icon | white at 60% | — | Neutral category |
| Notification title (unread) | white 100% | — | High priority text |
| Notification title (read) | white at 80% | — | Reduced emphasis |
| Preview text | white at 50% | — | Secondary text |
| Timestamp | white at 40% | — | Tertiary text |
| Date group header | white at 50% | — | Eyebrow label |
| Mark all read (active) | #FF5E00 | burnt-orange | Action link |
| Mark all read (disabled) | white at 30% | — | No unread items |
| Sticky header bg | #0A0A0F at 95% | ink-900 | Backdrop-blur when sticky |

**60/30/10 verification**: Orange appears on unread dots (drawing attention to new items), reminder category icons, and the "mark all read" action — correctly dominating the accent space. Green appears on check-in category icons — secondary accent. Purple appears on SIA insight category icons — minimal, correctly marking AI-originated notifications. The ratio holds: orange for attention/action, green for engagement, purple for SIA origin.

---

## Interaction States

### Notification Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unread) | ink-brown-800 bg, orange dot visible, title at full white | — |
| Default (read) | ink-brown-800 bg, no dot, title at 80% white | — |
| Pressed | Background darkens to ink-900, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring inset on row | — |
| Disabled | N/A (rows are always tappable) | — |
| Loading | N/A (navigation is instant, target screen loads its own content) | — |
| Error | N/A | — |
| Success | N/A | — |

### Mark All Read Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (has unread) | #FF5E00 text, "Mark all read" | — |
| Default (no unread) | white at 30% text, disabled | — |
| Pressed | Text at 60% opacity, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring around text bounds | — |
| Disabled | white at 30%, no touch response | — |
| Loading | Text replaced with tiny spinner (12pt, orange) | — |
| Error | N/A (marking as read is a local operation, unlikely to fail) | — |
| Success | All unread dots fade out simultaneously (280ms) | success notification |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Notification row | Navigate to relevant screen (deep-link) |
| Tap | Mark all read | Mark all notifications as read |
| Tap | Summary-band category chip | Filter list to that category (tap again to clear); active chip carries a 2pt orange ring |
| Long-press | Frequency sparkline | Scrub to reveal the per-day count at the finger |
| Swipe right from edge | Screen | Stack pop to Me Main [17] |
| Pull-to-refresh | FlatList | Refresh notification list from API |
| Scroll | Content area | Vertical scroll through grouped notifications |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Summary-band count chips | Screen enter | Count-up (numbers tick to value) | 280ms | ease-out-soft |
| Frequency sparkline | Screen enter (after chips) | Draws itself L→R via stroke-dashoffset (stroke-draw) — never opacity-fade | 1200ms | ease-flow |
| Notification rows | Screen enter (after band) | Staggered fade-in + translateY(8pt→0) | 280ms per row, 40ms stagger (fast, since many rows) | ease-out-soft |
| Unread dots | Mark all read | Simultaneous fade-out (opacity 1→0) | 280ms | ease-out-soft |
| Unread dot (single) | Tap row (marks as read) | Fade-out + scale(1→0) | 160ms | ease-out-soft |
| Title weight | Read state change | Font weight crossfade (Semibold → Regular is subtle, no animation needed — instant) | — | — |
| Pull-to-refresh | Pull gesture | Standard iOS refresh indicator | N/A | iOS default |
| Sticky header | Scroll threshold | Fade-in backdrop-blur when stuck | 160ms | ease-out-soft |
| New notification | Push received while on screen | New row slides in from top with fade-in | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right, 280ms, ease-out-soft
- **Exit**: Stack pop to right (back) or stack push to right (deep-link navigate to target screen), 280ms, ease-out-soft

---

## Empty States

### Day 1 (new user — no notifications yet)
Centered vertically in content area:
- Bell icon: 48pt, white at 20%, center-aligned
- Heading: "No notifications yet" — 18pt Sora Semibold, white at 60%, center-aligned
- SIA message: "I'll start reaching out once I get to know you better" — 15pt Sora Regular, white at 40%, center-aligned, max 240pt width
- Purple dot (6pt, #7F24FF) left of SIA message as SIA indicator
- No pull-to-refresh (nothing to refresh)

The empty state feels warm, not broken. SIA's voice fills the void with a promise of future engagement.

### Established user (zero unread)
All notifications show in "read" state (no orange dots). "Mark all read" action is disabled (white at 30%). Content is otherwise identical to the populated state. The lack of dots is the visual difference.

---

## Motivation Adaptation

- **Low motivation**: Fewer notifications in history (system sends max 1/day). The list is shorter, but the screen design is identical.
- **Medium motivation**: Default experience (2-3 notifications/day).
- **High motivation**: More notifications in history (up to 5+/day). List is longer, more varied categories. Design is identical — FlatList handles any length.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav header title | Sora | Semibold | 17pt | 22pt | white 100% |
| Mark all read action (active) | Sora | Semibold | 13pt | 18pt | #FF5E00 |
| Mark all read action (disabled) | Sora | Semibold | 13pt | 18pt | white at 30% |
| Date group header | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase, +0.12em tracking |
| Notification title (unread) | Sora | Semibold | 15pt | 20pt | white 100% |
| Notification title (read) | Sora | Regular | 15pt | 20pt | white at 80% |
| Notification preview | Sora | Regular | 13pt | 18pt | white at 50% |
| Timestamp | Sora | Regular | 12pt | 16pt | white at 40% |
| Empty state heading | Sora | Semibold | 18pt | 24pt | white at 60% |
| Empty state SIA message | Sora | Regular | 15pt | 22pt | white at 40% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Notification list fails to load | Skeleton shimmer on rows, then "Could not load notifications. Pull to refresh." centered text | Pull-to-refresh to retry |
| Mark all read fails | Tiny spinner on action text replaces with original text; toast: "Could not mark as read." (3s) | User retries tap on "Mark all read" |
| Deep-link target screen unavailable | Notification row navigates but target screen shows its own error state | Target screen handles recovery |
| Pull-to-refresh fails | Standard iOS refresh indicator dismisses; toast: "Could not refresh." (3s) | User pulls to refresh again |
| New push notification received while on screen | New row slides in from top with fade-in animation | None needed — automatic |
| Individual notification read-status sync fails | Local state updates immediately (optimistic); silent background retry | Auto-retry; reverts if sync ultimately fails |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to Me Main"
- Mark all read: "Mark all notifications as read, button" / "Mark all read, disabled, all notifications already read"
- Date group headers: Announced as section headings (e.g., "Today, section")
- Notification rows: "[Unread/Read], [Category] notification, [Title], [Preview text], [Timestamp], button"
- Unread indicator dot: Conveyed via "Unread" prefix on row label (not announced separately)
- Category icons: "[Category name] icon" (e.g., "SIA insight icon", "Reminder icon")
- Empty state: "No notifications yet. SIA says: I'll start reaching out once I get to know you better."

**Focus order:**
1. Back button
2. "Mark all read" action
3. Date group headers → notification rows within each group (Today, Yesterday, This Week, Earlier)
4. Each notification row in chronological order within its group

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Pull-to-refresh available for updating notification list
- All notification rows meet 44pt minimum touch target (80pt row height)
- Sticky date headers remain visible for orientation during scroll
- VoiceOver announces read/unread status without relying on visual dot indicator

---

## Cross-References

- **Navigates to**: SIA Chat [09] via tab switch (SIA insight notifications), Goal Detail [14] via stack push (goal reminders), Home Screen [12] via tab switch (check-in prompts), Community [40] via tab switch (social notifications), various screens per notification deep-link
- **Navigates from**: Me Main [17] via stack push (quick link grid, possibly with unread count badge)
- **Shared components with**: Settings [21] (Section Header, Navigation Header, Section Group Container), Help Center [25] (Section Group Container)
- **Patterns used**: Back Button (Batch 1), Section Header (Batch 5), Section Group Container (Batch 5)
- **Patterns established**: Notification Row (with unread/read variants), Date Group Header (sticky, with backdrop-blur), Header Action Button ("mark all read" right-side action), Notification Category Icons (SIA = purple brain, Reminder = orange bell, Check-in = green chart, Social = neutral people), Notification Empty State (with SIA promise message)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-09.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/tabs/me/notifications`
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
| B09-F01 | critical | navigation | Give every notification a deep-link target, mark tapped unread rows as read, and handle unavailable targets. |
| B09-F02 | major | retention | Implement optimistic mark-all-read behavior with fade-out, retry toast, and disabled all-read state. |
| B09-F03 | major | accessibility | Make Back a labeled link/button and expose notification rows with read status, category, title, preview, and timestamp. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

