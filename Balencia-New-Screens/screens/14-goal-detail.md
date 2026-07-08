# 14-goal-detail — Hi-Fi Design Spec

## 1. Header
- **Screen ID:** 14-goal-detail
- **Name:** Mission detail
- **Route(s) covered:** No live route; stack-pushed mission detail keyed from Mission Board [13] or Home [12].
- **Tab:** Goals
- **Source:** Functional Content Brief: Mission Detail
- **Batch:** 6

## 2. Purpose
Answer two questions in order: "am I on track?" at a glance via the hero ring, then "what's the whole picture?" through progressive disclosure. The screen holds one specific mission, grounds its high-level number in an immediate physical next action, and keeps CIA's read on the situation one tap away at every scroll depth.

## 3. Entry & exit
- **Entry paths:**
  - Mission Board [13]: stack push via mission card tap.
  - Home [12]: stack push via pinned mission card tap.
- **Exit paths:**
  - Back / swipe-edge: stack pop to origin.
  - Edit glyph: modal present to Create Mission [15] in edit mode.
  - "Ask CIA →" (inside the CIA card, §5): tab switch to CIA Chat [09] with this mission pre-loaded as chat context.
  - Domain tags & Cross-Domain Links section: stack push to Domain Dashboards [26–36], or stack push to this same template (`14-goal-detail`) re-keyed to another mission id — never a second screen file.

## 4. Layout anatomy

**Regions top-to-bottom** (corrected from 8 → 7: the draft's region 8, "a persistent Ask-CIA escape hatch," duplicated the CIA card's own CTA — one contextual entry point to chat is enough on a single screen; a second, screen-level one is decoration, not function. Folded into region 5.):

1. **Atmosphere & nav:** warm base gradient, floating glass TopBar with pin/edit controls.
2. **Hero ring:** large ProgressRing communicating overall completion.
3. **Mission identity:** center-aligned mission name (the screen's one Display moment) + domain tags.
4. **KPI row:** compact SolidCard with three inline stats — actions, streak, XP.
5. **CIA intelligence:** contextual coaching card, carries the "Ask CIA" exit.
6. **Next action:** single tappable card for the immediate next step.
7. **Expandable sections:** five collapsed-by-default accordions — All Actions, Milestones, CIA Reasoning, Cross-Domain Links, Progress Over Time.

**ASCII wireframe (390×844):**
```text
┌──────────────────────────────────────┐
│   ·   ·   ·  (warm glow, top-center) │
│                                       │
│  ‹ Back           Mission        📌 ✎ │  TopBar — transparent, glass-pill after scroll
│                                       │
│              ╭─────────╮             │
│              │   72%   │             │  ProgressRing · glow-you · sweeps on mount
│              ╰─────────╯             │
│                                       │
│           Hyrox Relay Prep           │  Display 34 — the one hero type moment
│        [ 🏃 Fitness ]  [ 🧠 Mental ]  │  ChipDomainTag ×2, tappable → dashboards
│                                       │
│ ┌───────────────────────────────────┐ │
│ │  Actions    Streak       XP       │ │  KPIRow · SolidCard · glow-you
│ │    12         8         450       │ │
│ │ you logged you logged  system     │ │  compact ChipProvenance per stat
│ └───────────────────────────────────┘ │
│                                       │
│ ┌───────────────────────────────────┐ │
│ │ ✦ Three tempo runs this week,     │ │  CIAInsightCard · GlassCard default
│ │   each faster than the last.      │ │  glow-cia, radius 28
│ │   This is what *momentum* looks   │ │
│ │   like.                           │ │
│ │   via WHOOP · pace      Ask CIA → │ │  evidence ChipProvenance + BtnGhost
│ └───────────────────────────────────┘ │
│                                       │
│ ┌───────────────────────────────────┐ │
│ │ ( ) 20-min easy run — tomorrow     │ │  ActionCheckCard (NEW) · SolidCard
│ │     tap the circle to mark done    │ │  glow-you
│ └───────────────────────────────────┘ │
│                                       │
│ ┌─ ALL ACTIONS ─────────────────  ⌄ ┐ │  SectionHeader + ExpandableList (NEW)
│ ├─ MILESTONES ──────────────────  ⌄ ┤ │  glow-done
│ ├─ CIA REASONING ───────────────  ⌄ ┤ │  glow-cia
│ ├─ CROSS-DOMAIN LINKS ──────────  ⌄ ┤ │  glow-you
│ ├─ PROGRESS OVER TIME ──────────  ⌄ ┤ │  glow-cia
│ └───────────────────────────────────┘ │  all collapsed by default (§9, §11)
│                                       │
│            ↓ scroll for more         │
│                                       │
│   · · ·  GlassNavBar — floating,     │
│   · · ·  omitted here for clarity ·  │
└──────────────────────────────────────┘
```

## 5. Components
Catalog names verbatim; two flagged `NEW:` per instructions.

- **TopBar** — back chevron (44px target), title, pin toggle, edit glyph. Transparent over atmosphere; gains `.glass-pill` (`rgba(10,10,15,.55)`, blur 24px, border `rgba(255,255,255,.10)`, radius 999) once content scrolls under.
- **ProgressRing** — hero, stroke 8px, tabular-nums center, track `rgba(255,255,255,.08)`.
- **ChipDomainTag** — ×2, tappable, domain color at 16% bg (CANON §4).
- **KPIRow** — 3 inline mini-stats (Actions, Streak, XP) inside one SolidCard, hairline dividers, each mini-stat keeps its own provenance.
- **CIAInsightCard** — purple-tinted GlassCard, spark glyph, one Tiempos-italic word, evidence row (ChipProvenance), `Ask CIA →` as BtnGhost. This card *is* the screen's chat exit — no separate persistent affordance (see §4 fix).
- **NEW: ActionCheckCard** — SolidCard integrating a large tap-target checkbox + action title. *Rationale: bundling the next action and its own completion mechanism into one tappable surface removes the extra decision of "which button confirms this." Because the checkbox already is the primary action, this screen carries no separate BtnPrimary (see §5 note below) — a second full-width button would have contradicted the reason this component exists.*
- **SectionHeader** — Overline + trailing chevron, drives all five accordions.
- **NEW: ExpandableList** — accordion body wrapper (SectionHeader trigger + SolidCard content pane, spring-collapse 200ms). *Rationale: the catalog has no expand/collapse primitive; this composes two existing components (SectionHeader, SolidCard) rather than inventing new visual language, so it's a thin wrapper, not a new surface.*
- **TrendChart** — inside Progress Over Time; solid orange user line, dashed purple projection, green milestone dots.
- **IntelligenceTimeline** — inside CIA Reasoning when expanded; staged trace (`checking your training log…` → `comparing to last month…`), collapses to one summary line at rest.
- **ListRow** — rows inside Cross-Domain Links (domain icon + linked mission/dashboard name + chevron) and inside the stalled-mission Sheet (§9).
- **Sheet** (variant `action`) — stalled-mission "see options" surface; four ListRow choices.
- **ChipProvenance** — standard pill beside Mission Completion % and the CIA evidence row; compact caption variant inside KPIRow where a full 24px pill would crowd a three-up stat row at 390px (mobile-reality adaptation, not a new component).
- **ConfidenceMeter** — purple, appears only in the Mission Completion % low-confidence state.
- **HonestNullState** — all honest-null copy across §8.
- **GlassNavBar** — persistent, present in hi-fi; omitted from the ASCII purely for legibility (checklist item 13).
- **OfflineBanner / SyncStatus, ErrorState, SkeletonState, CelebrationOverlay** — see §9.
- **BtnGhost, BtnSecondary, BtnCoach** — see §7, §9 for exact assignments.

**Fix — removed component:** the draft additionally listed `BtnPrimary` as "a full-width CTA inside the Next Action card." Deleted: ActionCheckCard's checkbox already completes the action (light haptic, §10); a second filled button doing the same job stacks two CTAs for one decision, which is the opposite of premium restraint. This screen ships with **zero** BtnPrimary instances — satisfying "one BtnPrimary per composition" with the honest floor of zero, not a forced insertion.

## 6. Visual treatment
- **Glass tiers** (CANON §2, tokens verified):
  - TopBar → `.glass-pill` on scroll: `rgba(10,10,15,.55)` · blur 24 · border `.10` · radius 999.
  - CIA card → `.glass-card` default: `rgba(255,255,255,.045)` · blur 28 sat 120% · border `1px rgba(255,255,255,.08)` · radius 28 · shadow `0 18px 48px rgba(33,16,8,.45)` · inset top-light `0 1px 0 rgba(255,255,255,.12)`. Not the `hero` variant (radius 40) — the screen's one Display moment lives on the mission name directly over the atmosphere, not inside a card, so no card claims the hero radius.
  - KPI row, ActionCheckCard, all accordion bodies → **SolidCard**: `--surface-2` `#211008` · radius 28 · border `rgba(255,255,255,.06)` · no blur. Data-dense, legibility over atmosphere, per CANON §2's own rule.
- **Semantic inner-glow — one per card, meaning stated** (CANON §3 recipe: bottom-anchored radial, `color-mix(in srgb, var(--glow) 55%, transparent)` → transparent, blur 24, height 62% of card):
  - **Hero ring** → `--glow-you` `#FF5E00` — this is the user's own effort made visible.
  - **KPI row** → `--glow-you` — actions logged, streak held, XP earned: all three numbers are things *you* did.
  - **CIA card** → `--glow-cia` `#7F24FF` — AI-derived read on the week, not a logged fact.
  - **Next action (ActionCheckCard)** → `--glow-you` — the next unit of effort, still yours to do.
  - **All Actions** → `--glow-you` — a ledger of effort in progress.
  - **Milestones** → `--glow-done` `#34A853` — completion and growth.
  - **CIA Reasoning** → `--glow-cia` — CIA's own working shown transparently.
  - **Cross-Domain Links** → `--glow-you` — these are *your* missions in other domains, not a CIA suggestion.
  - **Progress Over Time** → `--glow-cia` — the chart's defining feature is the dashed purple projection; the glow follows the projection, not the historical line.
  - Net distribution across the screen leans orange-heavy (5 cards), green once, purple three times — consistent with the 60/30/10 rule read at screen level, not forced per-card.
- **Background atmosphere:** `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` over `--bg-base` `#0A0A0F`, 3–4% soft-light grain.
- **Domain tag colors:** Fitness `#ef4444`, Mental/Wellbeing `#14b8a6` (chip labeled "Mental" for space; full domain remains Mental/Wellbeing). Icons rounded 2px outline, filled when active, domain-colored — never used as chrome elsewhere on the screen.
- **Type:** Mission name in NM Medium 500, 34 (Display). All KPI/ring/streak/XP numbers in NM Medium `tabular-nums`. One Tiempos-italic word per CIA moment, never more.

## 7. Content & copy
CIA voice: sentence case, no exclamations, one *italic* word per moment, second person, leads with meaning before the metric.

- **CIA coaching — standard:** "Three tempo runs this week, each faster than the last. This is what *momentum* looks like." *(Fix: the draft used "momentum" twice in one line — once plain, once italicized. Redundant emphasis reads cheap. Now it appears exactly once, as the payoff word, backed by a concrete, specific claim rather than a vague "strong week.")*
- **CIA coaching — stalled:** card body: "No action logged in 7 days. Ready when you are." + `BtnGhost` "See options" → opens **Sheet** (variant `action`), header "Sometimes priorities *shift*," four `ListRow` choices: *Adjust the timeline* / *Reduce scope* / *Pause for now* / *Archive this mission*. *(Fix: the draft crammed all four choices into one coaching sentence — a wall of text inside a card meant for a short read. Moved the choices into their own sheet, which is what Sheet/ListRow exist for; the card itself now stays to two short sentences, and "CIA" replaces the legacy "CIA" reference the draft still footnoted rather than silently fixing.)*
- **Chain extension (on mission completion):** a `GlassStatCard` preview of the suggested next mission (title + `ChipDomainTag`, glow-cia — it's CIA's suggestion, not logged effort) under the header "CIA suggests:", followed by `BtnCoach` "Add to my missions," `BtnSecondary` "Customize first," `BtnGhost` "Not now." *(Fix: the draft's "Add to my missions" was implicitly a generic filled button; since this action is CIA-initiated, it takes `BtnCoach` — purple, per catalog rule, "CIA-initiated actions only" — not `BtnPrimary`.)*
- **Cold start:** "Every mission starts at zero. Your first action is ready below — this is where *whole* begins." *(Fix: the draft's "begin your whole ascent" borrowed a Hyrox-specific climbing metaphor for a screen template shared by every domain. "Whole" now ties to Balencia's own whole-life positioning instead of a sport metaphor that wouldn't fit a Finance or Relationships mission.)*
- **Completion:** "Done — 24 days of consistency got you here. Ready for the next *challenge*?" *(Fix: dropped the stock "Mission accomplished" military-game phrase for a plainer, more specific coach line; the day count is a template value, filled at runtime.)*
- **Error:** glyph + "Couldn't load this mission." + `BtnSecondary` "Retry." *(Fix: the draft's "try pulling to refresh" was gesture-only prose with no actual button; ErrorState's own spec calls for a `BtnSecondary` retry action, so one is named explicitly.)*
- **Offline:** top `OfflineBanner`/`SyncStatus`: "Offline — showing data from 2h ago." Small caption under the Next Action card: "Saved. Syncs once you're *back*." *(Fix: split one run-on offline sentence into the catalog's actual two-part pattern — a banner with honest staleness labeling, plus a short local reassurance near the action itself.)*

## 8. Data & honesty states
Every metric ships three states. Where a genuine estimated variant doesn't exist for a deterministic count, that slot is filled with a stated, justified "not applicable" rather than an invented number (per this pass's honesty rule) — this still counts as the third state, it just tells the truth about what the data can and can't be.

- **Mission completion %**
  - *Real:* 72% + `ChipProvenance`. Provenance is conditional, not fixed: missions whose actions sync from a wearable (this Hyrox example) cite `via WHOOP`; missions tracked by manual log alone cite `system calculated`. *(Fix: the draft hard-coded "via WHOOP" as if every mission's completion synced from a wearable, which isn't true for a Finance or Learning mission using this same template.)*
  - *Low-confidence:* 72% at 64% opacity + `estimated · low confidence` + `ConfidenceMeter` (purple) — shown only when the contributing wearable sync is partial (e.g., today's run hasn't finished processing).
  - *Honest-null:* "Not enough data yet — 3 more days to calibrate," ring renders ghosted at 0%.
  - Note: completion % is a weighted read of milestone/sub-goal progress — not a restatement of the action count below. The two numbers can move independently, and each carries its own honesty states.
- **Action count**
  - *Real:* 12, `you logged`.
  - *Low-confidence:* **not applicable** — a logged count is exact by definition; there is no statistical estimate of how many times you tapped log.
  - *Honest-null:* "No actions logged yet."
- **Streak (days)**
  - *Real:* 8, `you logged`.
  - *Low-confidence:* **not applicable** — a streak is a deterministic count of consecutive log-days computed by the system, not a modeled estimate. *(Fix: the draft showed "8 · estimated · low confidence," which fabricates uncertainty around a number that is either exactly right or wrong — never fuzzy. Corrected to the same honest-N/A pattern already used for action count.)*
  - *Honest-null:* "Start your first action to build a streak."
- **XP earned**
  - *Real:* 450, `system calculated`.
  - *Low-confidence:* **not applicable** — XP is a deterministic rule-based sum (completed actions × domain multiplier), not a statistical read. *(Fix: same fabricated-uncertainty issue as streak, corrected the same way.)*
  - *Honest-null:* "No XP yet — complete your first action to start earning." *(Fix: the draft's "calibrating — your XP trend builds here" borrows confidence-meter language for a value that's either zero or a real sum; "calibrating" implies a model warming up, which doesn't apply here.)*

## 9. All states
- **Default:** hero ring sweeps on mount; all five expandable sections collapsed (matches §4/§11 — the draft's own wireframe had shown "All Actions" pre-expanded, which contradicted this row; now consistently collapsed).
- **Skeleton:** `SkeletonState` shimmer blocks (`--surface-3` base, 1.2s sweep) replace ring/text; TrendChart skeletons as axis + ghost line.
- **Empty (cold start):** 0% ring, ghosted track, dashed future milestones, KPI row zeroed with honest-null copy (§8), cold-start CIA copy (§7).
- **Error:** `ErrorState` inline in the CIA card's position: glyph, "Couldn't load this mission," `BtnSecondary` "Retry." Ring retains last cached value rather than resetting to zero (never invents a fresh number, never blanks a real one).
- **Offline:** `OfflineBanner`/`SyncStatus` pinned under TopBar (§7); Next Action card stays interactive, queues completion locally.
- **Stalled** (no action in 7 days): CIA card swaps to the stalled coaching copy + `Sheet` flow (§7).
- **Success (completion):** ring sweeps to 100% and flips green (`--glow-done`), `CelebrationOverlay` draws its continuous-stroke line motif once, Next Action card is replaced by the chain-extension preview (§7). Respects reduced-motion (fade-only variant, per catalog).
- **Loading tap (disabled):** ActionCheckCard's checkbox shows a locked-width spinner in place of its check state while a completion write is in flight; nothing else on the card is disabled.

## 10. Motion & interaction
- **Hero ring:** 0 → 72% sweep on mount, 520ms physical ease-out (an entrance moment, deliberately longer than the 150–250ms interaction-feedback window). On action completion, a shorter 250ms re-sweep matches the catalog's own ProgressRing completion timing.
- **Next action completion:** old ActionCheckCard fades/slides down, replacement slides up, 250ms ease-in-out.
- **Accordion expand/collapse:** ExpandableList spring 200ms; chevron rotates 180°.
- **CIA Reasoning expand:** `IntelligenceTimeline` stages reveal at ~180ms intervals (`checking your training log…` → `comparing to last month…`), then collapses to one summary Caption once resolved.
- **Sheet (stalled options):** spring in 250ms, per catalog.
- **Chart drawing:** solid orange line draws left-to-right, dashed purple projection draws after it resolves; long-press triggers crosshair scrub.
- **Glow behavior:** every glow (§6) breathes on a shared 4s opacity cycle — one rhythm across the screen rather than five uncoordinated pulses.
- **Haptics:** light impact on checkbox completion; medium impact on milestone unlock; no haptic on accordion expand (too frequent an interaction to warrant one).
- **Reduced motion:** all sweeps/draws/stagger become instant final-state renders; CelebrationOverlay uses its fade-only variant; glow breathe becomes static (opacity fixed at mid-cycle value, not 0 or 1).

## 11. Motivation-tier adaptation
- **Low density:** all five sections collapsed on load and stay that way until tapped; KPI row shows plain tabular numbers, no deltas; CIA Reasoning never auto-plays IntelligenceTimeline.
- **Medium density (default):** Next Action card is the only thing expanded by default; Progress Over Time's collapsed header shows a peekable mini-sparkline before the user opens it.
- **High density:** All Actions and Progress Over Time open on mount with full TrendChart and sub-goal bars drawn; CIA Reasoning still requires a tap to play IntelligenceTimeline (a coaching trace shouldn't force-play on every visit, regardless of density — an honest exception to "everything open").

## 12. Accessibility
- **Contrast:** paper-100 `#FEFAF3` on `--bg-base` `#0A0A0F` and on `--surface-2` `#211008` exceeds AA+ (16:1 / 11.7:1 respectively).
- **Targets:** back, pin, edit, and the ActionCheckCard checkbox all map to 44×44px minimum hit regions, independent of their visual glyph size; ChipDomainTag pills get equivalent hit-slop padding even though their visual pill is shorter.
- **Screen reader:** glyph-only controls carry labels ("Pin to home screen," "Edit mission"); ProgressRing announces "72 percent complete"; ConfidenceMeter announces "estimated, low confidence" alongside its value, never the number alone.
- **Sheet & focus:** the stalled-options Sheet traps focus while open and returns focus to the "See options" trigger on dismiss.
- **Motion:** every animation named in §10 has a defined reduced-motion path — no exceptions, per CANON §8's a11y floor.

## 13. Premium checklist
1. **Connects:** cross-domain links push to real domain dashboards or sibling mission details; CIA Reasoning exposes its own working via IntelligenceTimeline rather than asserting a verdict.
2. **Honest:** coach naming locked to CIA already correct in source; two fabricated "estimated" states (streak, XP) corrected to justified not-applicable; completion-% provenance corrected from hard-coded to conditional; three states enforced on every metric.
3. **Premium:** zero redundant CTAs (BtnPrimary removed, rationale in §5); one Display moment; one emphasis word per copy moment, no double-emphasis.
4. **60/30/10:** orange dominant across effort surfaces, green isolated to milestones/success, purple isolated to CIA-originated surfaces — read at screen level, not forced per card.
5. **Semantic glow:** every card carries exactly one glow with a stated, non-decorative reason (§6).
6. **Glass tiers:** CIA card glass, everything data-dense solid — no mixing.
7. **Type:** Neue Montreal throughout; Tiempos italic reserved for CIA moments only.
8. **Voice:** CIA persona, sentence case, no exclamations, copy tightened away from generic gamer/coach clichés (§7).
9. **Shape/spacing:** 28px card radii, 8pt rhythm, 24/32 section spacing.
10. **Motion:** physical easing, 150–250ms feedback, longer named exceptions justified (hero sweep, celebration).
11. **A11y:** AA+ contrast, 44px targets including glyph-only and pill controls, Sheet focus trap.
12. **Icons:** rounded 2px outline, filled active, domain-colored, never used as chrome.
13. **Bottom nav:** GlassNavBar present in hi-fi, omitted from the ASCII for legibility only.
14. **Data viz:** solid orange user line, dashed purple projection, green milestone dots, no gradients — TrendChart's glow-cia assignment follows the projection, not the history.
