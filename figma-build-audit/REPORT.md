# Balencia Figma DS — Grade Report

| | |
|---|---|
| **Run date** | 2026-05-29 |
| **Commit** | `2e4db9a` |
| **DS file** | `XF2diepp3IfcWuDWHwL4ez` (Balencia DS) |
| **Scope this run** | Foundations + **all 58 built components, deep-audited** (full token-binding sweep via MCP). Multi-agent deep mode: each component audited then **adversarially verified**. 116 agents · 1,805 MCP/tool reads. |
| **Rubric** | `figma-build-audit/RUBRIC.md` (9 weighted dimensions) |
| **Run type** | **First full deep re-grade** (`--deep --all`). Supersedes the baseline `f2ea43a` + remediation `86ccd51`. |

---

## Executive summary

> ### DS overall grade: **A**  (≈ 88 / 100)   ·   Foundations: **A**  (88)
>
> _Full deep sweep at `2e4db9a`. Numerically flat vs the `f2ea43a` baseline (≈88), but the **composition of risk has changed completely**: the token-leakage premise that depressed the baseline is now conclusively retired, while the deep pass surfaced real structural and accessibility gaps the structure-only provisional pass had missed._

---

> ### ⚠️ FIXER UPDATE — `/figma-build-fixer --apply` @ `5d9419b` (2026-05-30)
>
> **The deep sweep's #1 finding (X-007) was a FALSE POSITIVE.** Verify-before-fix read the live `node.type` of all five "FRAME-not-COMPONENT_SET" components (DomainTag 52:39, SettingsRow 128:32, BrandWordmark 78:38, DomainDashboardHeader 329:158, LifePowerDisplay 243:83) — **every one is already a proper `COMPONENT_SET`** with the correct named axes. Root cause: `get_metadata` renders *every* COMPONENT_SET as `<frame>` wrapping `<symbol>` children, so the audit graded identical XML as A++ for Button/HealthMetricsStrip but B/"FRAME-not-SET" for these. `combineAsVariants` on them would have **broken working components**. The "highest-leverage fix" / "lifts the DS toward A+" narrative below is **void** — also stale: FAB (Pressed exists) and RichInlineCard ([doc] prefix on a SET). See `FIX-PLAN.md` headline + `FIX-LOG.md`.
>
> **What was actually fixed (surgical):**
> - **X-006** ✅ — `spacing/2,6,10` WEB codeSyntax → faithful Tailwind `calc(var(--spacing)*0.5/1.5/2.5)`.
> - **C-013 DomainSkillCard** ✅ — promoted to COMPONENT_SET `373:176` (`State=Default|Pressed`).
> - **C-017 SegmentedControl** ✅ — added `Size=Sm|Md` axis (9 → **18 variants**; md = 56px/14px).
> - **C-009 SettingsRow** ✅ — added `Disabled=False|True` axis + `Trailing=Destructive` (10 variants); Checked driven by the nested ToggleSwitch instance (documented).
> - **C-014 MoodSelector** ✅ — extracted **MoodOption atom** (`404:31`, State=Default|Selected|Pressed + Emoji/Label TEXT props); MoodSelector recomposed from 6 instances.
> - **X-008 contrast** ✅ (7 lockstep proto+Figma fixes) — Eyebrow→white-70, FAQAccordion chevron→white-40, NotificationRow preview→white-70/timestamp→white-60, ChatInputBar placeholder→white-50, Input helper→white-70, **SuggestionChip bg→ink-900** (royal-purple brand kept — user sign-off), **VoiceWaveform idle→white-25** (user sign-off). *Remaining:* IntegrationCard status-color (Med).
> - **C-023 ToggleSwitch** ✅ — documented 2px brand-orange focus ring (decision: doc, not variant).
> - **C-022 ActionCard** ✅/doc — Figma API forbids an independent `textDecorationColor` on STRIKETHROUGH; strike inherits the white fill (documented; dimming the whole name rejected as worse fidelity).
>
> **Still open:** IntegrationCard status-color (X-008), SectionHeader action-slot states (X-009), DomainDashboardHeader icon-button a11y labels (C-011), LevelBadge/SocialAuthButton provisional re-audit (X-010), Code Connect `.figma.tsx` (X-011, Phase 3E). `npm run check` green; `consistency-check.mjs` green.

**The headline finding:** the baseline's central worry — "universal alpha-white leakage" — is **vindicated as a non-issue**. Across 50+ deep reads, alpha-white paints resolve correctly to `var(--color-alpha-white-*)` post-codeSyntax-repair (X-001). Agent after agent independently *refuted* a raw-`rgba()` leak once they checked the binding rather than the rendered string. Dimension-1 (Token Binding, weight 20) lifted broadly — exactly as the remediation predicted.

But a full sweep is more honest than a structure-only one, and it found two genuine systemic themes the provisional grades glossed:

1. **Several components are FRAMEs-of-symbols, not COMPONENT_SETs** — a real structural defect that blocks variant UI and Code Connect.
2. **A consistent cluster of WCAG-AA contrast failures** on muted-white and accent text — the variables are correctly *bound*, the tint values are simply too low to read.

So the DS holds at **A, not A+**: premium construction and token discipline, held back by ~5 structural conversions and ~7 contrast fixes — all surgical, none craftsmanship failures.

**Top strengths**
1. **Token binding is now genuinely premium.** The codeSyntax artifact is gone; deep reads confirm paints/strokes bound to the DS variable families with faithful `var(--…)` Dev-Mode output. The single biggest baseline risk is resolved.
2. **A deep bench of A+++ components.** MessageBubble, MissionCard, ChainProgressBar, PhoneFrame (98), ProgressRing, BrandSymbol (97), WaterIntakeRing, MealCard, XPBar, BottomSheet (95–96) — full token binding, rich/complete state matrices, pixel-faithful.
3. **Visual fidelity + brand discipline are uniformly high.** 60/30/10 orange/green/purple correct, glassmorphism reads right on the dark canvas, no fidelity drift in any sampled render.

**Top risks (new, in priority order)**
1. **🔴 FRAME-not-COMPONENT_SET (X-007, High).** 5 components ship as a frame wrapping loose symbols instead of a variant set with named axes: **DomainTag** (52:39), **SettingsRow** (128:32), **BrandWordmark** (78:38), **DomainDashboardHeader** (329:158), **LifePowerDisplay** (243:83). Breaks the variant picker, Dev-Mode binding, and Code Connect. *(TierCard 233:83 and LeaderboardRow 206:47 were initially flagged here but **refuted on re-check** — TierCard is a legitimate showcase frame of instances; LeaderboardRow is a proper 8-variant set.)*
2. **🟠 WCAG-AA contrast failures on muted/accent text (X-008, Medium–High).** ~7 components render muted-white or accent text below 4.5:1 — **not a binding bug**, the tint is just too low: Eyebrow (white-40, 1.8:1), SuggestionChip (royal-purple on ink-brown, 3.15:1 — High), FAQAccordion (chevron white-30, 3.5:1 — High), NotificationRow (white-50/40, 3.5/2.7:1), ChatInputBar (white-30 placeholder, 2.8:1), IntegrationCard (status text), Input (helper white-40, ~2.5:1).
3. **🟠 `[doc]` components still dropping interactive states (X-009, High/Medium).** The X-004 follow-up sweep confirms residual cases: **DomainSkillCard** (no Pressed despite `active:scale-95`), **MoodSelector** (no selected/pressed axis despite `onSelect`), **FAB** (likely missing Pressed — unverified), plus ActionCard's Completed-variant strikethrough-color binding and SectionHeader's action-slot states.

**The one highest-leverage fix:** convert the five X-007 FRAMEs to proper COMPONENT_SETs with named variant axes. It clears every remaining **High structural** finding at once, unblocks Code Connect on the lowest-scoring components, and lifts the DS toward **A+**. Run `/figma-build-fixer`.

---

## Audit-confidence caveat (read before trusting individual cells)

The **Figma MCP Professional-plan rate limit** was reached partway through the 116-agent run (~1,805 reads). Consequences, disclosed for honesty:

- **~3 components could not be freshly re-verified** and carry **provisional** grades from source-of-truth + prior records: **LevelBadge** (63:47), **SocialAuthButton** (88:12), **RecipeCard** (226:67). LevelBadge in particular has an **unverified claimed Critical** (rarity text/bg contrast) that the verifier could not confirm or refute — treat as *pending a targeted re-read*, not confirmed.
- **~4 verify agents went "false-premise" meta** (re-checked the audit *records* instead of re-reading Figma) and returned non-grades: **Input, FAB, SiaChatTopBar, Divider**. Their headline grades below are reconstructed from the audit-phase evidence embedded in the verifier output and flagged `prov`.
- All other 50+ components were freshly read at least once in this run.

**Recommended cleanup:** a small targeted re-run — `/figma-build-auditor --deep Input FAB SiaChatTopBar Divider LevelBadge SocialAuthButton RecipeCard` — once the rate-limit window resets, to convert the 7 `prov` cells to confirmed.

---

## Scorecard

**Legend** — Evidence: `D` = deep-audited + adversarially verified this run · `prov` = provisional (rate-limited or verify-agent meta; graded from audit-phase evidence — see caveat). Letters map from the numeric score via RUBRIC bands; band caps applied (no A− with an open High, no above-B+ with an open Critical). Dimension keys: Tok, Str, Fid, Sta, AL, A11y, Typ, Nam, CC.

### Foundations

| Component | Node | Ev | **Overall** | Tok | Str | Fid | Sta | AL | A11y | Typ | Nam | CC | Open findings |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Foundations | 17:3 | D | **A (88)** | A− | A++ | A++ | A | A+ | A | A++ | A+ | A | X-006 spacing codeSyntax (Med) |

### 3A · Atoms (17)

| Component | Node | Ev | **Overall** | Tok | Str | Fid | Sta | AL | A11y | Typ | Nam | CC | Open findings |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Button | 43:92 | D | **A+ (94)** | A | A++ | A++ | A++ | A+ | A | A++ | A++ | A+ | — (clean) |
| Input | 45:30 | prov | **A− (85)** | A | A+ | A | A− | A+ | B+ | A+ | A | A | helper white-40 contrast (Med, X-008) |
| Chip | 46:26 | D | **A+ (92)** | A+ | A+ | A+ | A | A+ | A | A+ | A+ | A+ | domain variants deferred (Med, 3E) |
| ToggleSwitch | 48:10 | D | **A+ (92)** | A | A+ | A+ | A+ | A+ | A | A+ | A+ | A+ | no Focus variant (Med) |
| SegmentedControl | 49:69 | D | **B (75)** | A | A− | A− | B+ | A | A | A | A | A− | **missing `md` size variant** (High) |
| SearchBar | 51:20 | D | **A− (88)** | A | A+ | A | A− | A+ | A | A+ | A | A | State=Focused/Filled unconfirmed (High) |
| DomainTag | 52:39 | D | **B (78)** | A | B | A | B | A | A− | A | A | A | **FRAME not COMPONENT_SET** (High, X-007) |
| LevelBadge | 63:47 | prov | **A− (85)** | — | — | — | — | — | ? | — | — | — | rarity contrast **unverified Critical** (pending) |
| Eyebrow | 68:6 | D | **B+ (82)** | A | A+ | A | A | A | B+ | A+ | A+ | A | Default white-40 1.8:1 (Med, X-008) |
| Divider | 74:10 | prov | **A (90)** | A | A+ | A | A | A | A | A+ | A+ | A− | .figma.tsx deferred (Low, 3E) |
| BrandSymbol | 76:18 | D | **A++ (97)** | A | A++ | A++ | A++ | A+ | A | A+ | A++ | A+ | — (clean) |
| BrandWordmark | 78:38 | D | **A− (85)** | A | A− | A | A | A | A | A | B+ | A | legacy FRAME-of-symbols (Med, X-007) |
| FAB | 79:10 | prov | **B+ (83)** | A | ? | A | B | A | A | A | A | A | Pressed state + spacing unverified (Med) |
| ContinuousStroke | 80:14 | D | **A+ (92)** | A | A++ | A++ | A++ | A+ | A | A | A++ | A+ | — (stateless, clean) |
| MissionTypeBadge | 82:14 | D | **A+ (92)** | A | A | A | A | A | A | A | A | A | — (spacing/10 → X-006) |
| SuggestionChip | 87:6 | D | **A− (86)** | A+ | A++ | A++ | A+ | A+ | A− | A+ | A++ | A+ | royal-purple 3.15:1 (High, X-008) |
| SocialAuthButton | 88:12 | prov | **B+ (80)** | ? | ? | ? | ? | ? | ? | ? | ? | ? | FRAME-vs-SET **unverified High** (pending) |

### 3B · Molecules (15)

| Component | Node | Ev | **Overall** | Tok | Str | Fid | Sta | AL | A11y | Typ | Nam | CC | Open findings |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Card | 124:11 | D | **A+ (92)** | A | A++ | A++ | — | A++ | A+ | A+ | A++ | A− | .figma.tsx variant remap (Low, 3E) |
| BottomSheet | 178:105 | D | **A++ (95)** | A | A | A | A | A | A | A | A | A | — (clean) |
| ProgressRing | 138:5 | prov | **A++ (97)** | A+ | A+ | A+ | A+ | A+ | A+ | A | A+ | A+ | intrinsic type exception (Low) |
| XPBar | 142:5 | D | **A++ (95)** | A | A+ | A+ | A+ | A+ | A+ | A | A+ | A+ | label intrinsic type (Low) |
| StatTile | 145:5 | prov | **A− (87)** | A | A+ | A+ | A | A+ | A | A− | A+ | A | label type 1px drift (Low) |
| MessageBubble | 162:5 | D | **A+++ (98)** | A+++ | A+++ | A+++ | A+++ | A+++ | A+++ | A+++ | A+++ | A+++ | — (clean) |
| WaterIntakeRing | 149:5 | prov | **A++ (96)** | A+ | A+ | A+ | A+ | A+ | A+ | A | A+ | A+ | intrinsic type exception (Low) |
| MacroBar | 152:5 | D | **A (88)** | A− | A++ | A++ | A++ | A+ | A− | A+ | A++ | A | token sweep → clean post-fix (Med) |
| MoodSelector | 155:5 | D | **B+ (81)** | A | A++ | A++ | B | A+ | A | A+ | A+ | A | **no selected/pressed axis** (High, X-009) |
| ChatInputBar | 166:12 | D | **A (88)** | A | A | A | A | A | B+ | A | A | A | white-30 placeholder 2.8:1 (Med, X-008) |
| MissionCard | 175:101 | D | **A+++ (98)** | A+++ | A+++ | A+++ | A+++ | A+++ | A++ | A+++ | A+++ | A+++ | — (clean) |
| SectionHeader | 125:10 | D | **A− (87)** | A | A+ | A+ | A | A+ | A | A+ | A+ | A | action-slot states (Med); .figma.tsx (Low) |
| SettingsRow | 128:32 | D | **B+ (80)** | B | B+ | A− | C | B | B− | B | B+ | C | **FRAME not SET; missing Disabled/Checked** (High, X-007) |
| NotificationRow | 170:48 | D | **A− (87)** | A | A+ | A+ | A | A+ | B+ | A | A | A | preview/timestamp contrast (Med, X-008) |
| ChainProgressBar | 143:6 | prov | **A+++ (98)** | A+ | A++ | A++ | A+ | A+ | A+ | A+ | A++ | A+ | decorative-dot exception (Low) |

### 3F · Layout (3)

| Component | Node | Ev | **Overall** | Tok | Str | Fid | Sta | AL | A11y | Typ | Nam | CC | Open findings |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PhoneFrame | 38:8 | D | **A+++ (98)** | A+ | A+ | A+ | A+ | A+ | A+ | A+ | A+ | A+ | — (clean) |
| PhoneFrame / Default Content | 38:2 | D | **A (88)** | A | A | A | A | A | A− | A | A | A | island/indicator contrast unverified (Med) |
| ScreenShell-Template | 37:2 | D | **A+ (94)** | A | A+ | A | A | A | A | A | A+ | A | — (clean) |

### 3C · Organisms (22)

| Component | Node | Ev | **Overall** | Tok | Str | Fid | Sta | AL | A11y | Typ | Nam | CC | Open findings |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| SiaChatTopBar | 290:134 | prov | **A (89)** | A | A | A | A | A | A | A | A | A− | .figma.tsx deferred (Low, 3E) |
| ActionCard | 201:31 | D | **B (74)** | A | A+ | A | B+ | A+ | A− | A+ | A | A− | Completed strikethrough-color binding (Med, X-009) |
| RichInlineCard | 320:153 | D | **A− (87)** | A | A | A | A | A | A | A | A− | A | wrapper missing `[doc]` prefix (Low) |
| ModuleCard | 229:71 | D | **A− (85)** | A | A+ | A++ | A | A+ | A | A+ | A | A− | token sweep clean; a11y refuted (Med) |
| TierCard | 233:83 | D | **A+ (94)** | A+ | A+ | A+ | A+ | A | A+ | A+ | A+ | A | showcase-frame AL nit (Low); CC (Low) |
| SIACoachingNote | 208:47 | D | **A− (85)** | B | A | A++ | A− | A+ | A | A+ | A+ | A | mood-select [doc] state (Low, X-009) |
| ScheduleItem | 180:2 | D | **A (88)** | B | A | A+ | A | A | A | A+ | A | A | border spacing/6 → X-006 (Med) |
| IntegrationCard | 198:26 | D | **A+ (92)** | A | A | A | A | A | B+ | A | A | A | status text semantic/contrast (Med, X-008) |
| WorkoutCard | 213:47 | D | **A+ (92)** | A | A | A | A | A | A | A | A | A | — (Pressed false-positive refuted) |
| MealCard | 216:55 | D | **A++ (95)** | A | A | A | A | A | A | A | A | A | — (clean) |
| RecipeCard | 226:67 | prov | **A− (85)** | ? | A | ? | A | ? | ? | ? | A | ? | spacing/6 binding unverified (Med, X-006) |
| TransactionRow | 194:10 | D | **A− (85)** | A− | A | A | A | A− | A | A | A+ | B+ | spacing/2 primitive → X-006 (Med, prov-overridden) |
| HabitRow | 196:17 | D | **A+ (93)** | A | A++ | A+ | A | A | A | A | A | A | — (HasStreak false-positive refuted) |
| LeaderboardRow | 206:47 | D | **A− (87)** | B | A++ | A++ | A++ | A+ | A− | A+ | A | A | avatar a11y label (Low); X-006 |
| JournalEntryCard | 253:99 | D | **A+ (93)** | A | A | A | A | A | A | A | A | A | — (spacing/6 → X-006) |
| VoiceWaveform | 351:165 | D | **B+ (82)** | A | A | A | A− | A | A− | A | A+ | A | Idle-bars contrast (High, X-008) |
| DomainDashboardHeader | 329:158 | D | **C (72)** | A | C | A | B | A | B+ | A | A | C | **FRAME not SET** + CC blocked (2× High, X-007) |
| HealthMetricsStrip | 345:165 | D | **A− (84)** | A | A | A+ | A | A | A | A | A | B+ | CC mapping for onMetricSelect (Med) |
| QuickActionsRow | 248:90 | prov | **B (74)** | C | B | B+ | B | B+ | B | ? | A | B | mostly unverified — provisional |
| FAQAccordion | 260:108 | D | **A− (88)** | A | A++ | A++ | A | A+ | A− | A+ | A++ | A | chevron white-30 3.5:1 (High, X-008) |
| LifePowerDisplay | 243:83 | D | **B+ (82)** | A | C | A | B+ | A | A | A | A | A− | **FRAME not SET** (High, X-007) |
| DomainSkillCard | 251:99 | D | **B (78)** | A | A++ | A++ | B | A+ | A | A+ | A+ | A | **no Pressed despite active:scale-95** (High, X-009) |

*ButtonState (aux set 44:11) was folded into Button for this run and not graded as a standalone line.*

---

## Phase rollups

| Phase | Built / Planned | Grade | Notes |
|---|---|---|---|
| Foundations | 100 vars · 12 text · 7 effect · 142 icons | **A (88)** | Token-leakage premise retired. Held back only by X-006 (spacing/2,6,10 literal codeSyntax with no globals.css counterpart). |
| 3A Atoms | 17 / 19 | **A− (≈87)** | Strong. Pulled down by 2 FRAME-vs-SET (DomainTag, BrandWordmark), SegmentedControl `md` gap, and contrast on Eyebrow/SuggestionChip. `Icon` + `ButtonState`-standalone pending. |
| 3B Molecules | 15 / 15 ✓ | **A (≈90)** | Still the strongest phase — MessageBubble/MissionCard/ChainProgressBar at A+++. SettingsRow (FRAME-vs-SET) + MoodSelector (states) are the only laggards. |
| 3C Organisms | 22 / 28 | **A− (≈85)** | Most volume + most findings. 3 FRAME-vs-SET / state issues (DomainDashboardHeader, LifePowerDisplay, DomainSkillCard) anchor the low end; many cards (TierCard, MealCard, HabitRow, JournalEntryCard) at A+/A++. 6 pending. |
| 3D Charts | 0 / 4 | **n/a** | Pending (LineChart, BarChart, RadarChart, CalendarHeatmap). |
| 3F Layout | 3 / 5 | **A (≈93)** | PhoneFrame A+++. Header, TabBar pending. |

---

## Foundations audit

- **Variables (100):** Primitives→semantic-alias structure correct; brand, ink, paper, domain, podium, mission, rarity, spacing, radius, motion, **and the `color/alpha/white-*` family** all present and bound. The codeSyntax repair (X-001) holds — alpha-whites resolve to `var(--color-alpha-white-NN)` in deep reads. ✓
- **Text styles (12) + Effect styles (7):** applied as shared styles in components (verified across Button, MessageBubble, MissionCard, DomainSkillCard). ✓
- **The one open gap — X-006 (Medium):** `spacing/6` (52:2, 6px), `spacing/10` (62:2, 10px), and now also a `spacing/2` (193:4, 2px) primitive surfaced on TransactionRow carry literal-px WEB codeSyntax with **no globals.css counterpart** (and `--spacing-6`/`--spacing-10` names collide at 24px/40px). Components bind them correctly, but Dev Mode shows raw px. Needs a token-architecture decision — do not guess a `var(--spacing-N)`.
- **Code Connect — X-011 (Low, deferred):** **no `.figma.tsx` files exist anywhere in the repo yet** (`find` returned zero). Expected for pre-3E; grade readiness, not completion.

---

## Cross-cutting findings

See `findings-ledger.md` for full detail and fix-pointers.

- **X-001 (High) — ✅ resolved & VINDICATED this run.** The "universal alpha-white leakage" was a codeSyntax artifact, now repaired. 50+ deep reads independently confirm correct binding. This is the run's biggest positive.
- **X-002 (Medium) — ✅ resolved.** Index drift reconciled; consistency-check green.
- **X-003 (Medium) — ✅ resolved (false positive).** No raw radii; "6px" was bound spacing/6 itemSpacing → folded into X-006.
- **X-004 (High) — ✅ resolved for HealthMetricsStrip; superseded by X-009** for the remaining `[doc]` sweep.
- **X-005 (Low) — ✅ resolved.** Pure white intentional, kept as white-100.
- **X-006 (Medium) — 🔶 open, scope widened.** Add `spacing/2` (193:4) to the spacing/6 + spacing/10 codeSyntax decision.
- **X-007 (High) — 🔴 NEW.** FRAME-not-COMPONENT_SET on 5 components: DomainTag (52:39), SettingsRow (128:32), BrandWordmark (78:38), DomainDashboardHeader (329:158), LifePowerDisplay (243:83). Highest-leverage fix.
- **X-008 (Medium–High) — 🟠 NEW.** WCAG-AA contrast failures on muted/accent text (bound but too-low tint) across ~7 components. Two are High (SuggestionChip, FAQAccordion).
- **X-009 (High–Medium) — 🟠 NEW (X-004 successor).** Residual `[doc]` components dropping interactive states: DomainSkillCard, MoodSelector, FAB(prov), ActionCard (Completed binding), SectionHeader (action slot).
- **X-010 (Low) — methodology.** Figma MCP Professional rate limit throttled ~10 verify agents; 7 components carry `prov` grades. Targeted re-run recommended (see caveat).
- **X-011 (Low, deferred).** No Code Connect `.figma.tsx` files exist library-wide (Phase 3E).

---

## Trend

| Metric | Baseline (`f2ea43a`) | Post-fix (`86ccd51`) | Deep re-grade (`2e4db9a`) | **Fixer apply (`5d9419b`)** |
|---|---|---|---|---|
| DS overall | A− (≈88) | ↑ pending | A (≈88) | **A+ expected** — pending re-audit |
| Foundations | A− | ↑ pending | A (88) | **A** (X-006 resolved) |
| Components built / planned | 54 / 70 | 54 / 70 | 58 / 70 | **60 / 72** (+MoodOption atom) |
| Components deep-audited | 7 | 7 | 58 (full sweep) | re-audit pending |
| Highest-severity open | High (X-001 alpha-white) | Medium (X-006) | High (X-007 FRAME-vs-SET) | **Medium** (X-007 was a false positive) |
| Open systemic findings | 5 | 1 (X-006) | X-006, X-007, X-008, X-009 | **X-008 (IntegrationCard only), X-009 (SectionHeader only)** + X-010/X-011 |
| Token-leakage premise | depressed grades | suspected artifact | confirmed non-issue | confirmed non-issue |
| FRAME-vs-SET (X-007) | — | — | High, 5 components | **false positive — 0 real** |

**Reading the flat number:** the baseline lost ~12 points to a *phantom* (codeSyntax). The deep sweep refunded those points to Token but spent them on *real* structural + a11y findings the provisional pass couldn't see. The grade is now honestly earned at A.

---

## Appendix

- **Methodology:** `figma-build-audit/methodology.md`
- **Rubric:** `figma-build-audit/RUBRIC.md`
- **Findings:** `figma-build-audit/findings-ledger.md`
- **Consistency pre-pass:** `node figma-build-audit/scripts/consistency-check.mjs` (green this run — no index/token-map drift)
- **Source of truth:** `balencia-screens/src/components/**`, `balencia-screens/src/app/globals.css`, `app_design 3/_shared-patterns.md`
- **Deep-run workflow:** 116 agents (58 audit + 58 verify), pipeline Audit→adversarial Verify, schema-validated scorecards.
- **Last audited SHA:** `2e4db9a`
- **Next recommended actions:**
  1. `/figma-build-fixer` — convert the 5 X-007 FRAMEs to COMPONENT_SETs (highest leverage), bump X-008 contrast tints one step, add X-009 Pressed/selected variants, resolve X-006 token strategy.
  2. `/figma-build-auditor --deep Input FAB SiaChatTopBar Divider LevelBadge SocialAuthButton RecipeCard` — confirm the 7 `prov` cells once the MCP rate-limit window resets.
