# Balencia A++ Premium-Craft Rubric

**Canonical scoring authority for the premium-craft quality of every one of the 85 screens** — across **content, data, and visualization**. Every grade in `REPORT.md` and every finding in `findings-ledger.md` traces back to a dimension and check defined here.

The bar is **A++ — premium, brand-grade, anti-generic**: a screen a top-tier product-design studio could have shipped. Same data and IA as today; **materially higher craft**. Premium ≠ maximal — editorial restraint, depth, and hierarchy are the point, not chart-cramming or decoration.

> **This rubric *extends* `viz-audit/RUBRIC.md`** (the founder-chosen approach). It keeps the viz-audit's 10 dimensions, **generalizes** the data-specific ones to cover *any* surface (content or data), and **adds four craft dimensions** the broader bar demands (microcopy, layout, typography, anti-generic). For the data-viz checklists that are unchanged (the per-primitive depth/honesty/motion detail), it **references** `viz-audit/RUBRIC.md` + `VIZ-KIT.md` + `CONSISTENCY.md` rather than restating them.

> **Read-only / spec-first contract.** This program never edits `balencia-screens/`. Each finding carries a `fix-pointer` (the exact remedy + craft-kit pattern or token). Remediation is written into the screen's **`## Premium Craft`** section in `app_design 3/NN-*.md`. The rendered build is a later **craft-build** program (see `HANDOFF.md`).

---

## Source of truth (what each screen is graded *against*)

| Layer | Authority |
|---|---|
| Screen purpose, IA, content, data points | `app_design 3/NN-*.md` |
| The data-viz layer already specced to A− | the screen's existing `## Visualization` section + `viz-audit/` |
| The premium-craft vocabulary (this program) | `design-audit/CRAFT-KIT.md` |
| Locked craft parameters + section templates | `design-audit/CONSISTENCY.md` |
| Per-cluster premium benchmark | `design-audit/benchmark-matrix.md` |
| Canonical component / interaction / a11y / copy patterns | `app_design 3/_shared-patterns.md` |
| Brand voice, colour, type, stroke, motion law | `Balencia/Design-System-Overview.md` (§3 voice, §5 colour, §6 type, §8 stroke, §9 spacing/motion) |
| Design tokens (real, in code) | `balencia-screens/src/app/globals.css` |
| Brand 60/30/10 + domain colour system | `CLAUDE.md` + `globals.css` |

What this program **inherits and does not re-litigate** (the viz-audit's hard-won, consolidated app-wide rules — honor them):
- **Calibrated red = genuine operational/danger/destructive status only**, glyph+word paired — never on a person, feeling, difficulty, score, level, or budget-alone.
- **Orange dominates data-ink; domain colour = identity** (+ a domain's own-consistency heatmap, the lone data exception); multi-domain comparison stays domain-coloured.
- **Purple = SIA only** (incl. dashed-purple projection; AI-Mode screens may run purple-dominant and cite `_shared-patterns.md`).
- **Motion draws, never fades** (§8). **No-data ≠ zero.** **Non-shaming, no dark patterns.** **WCAG AA + 1.4.11 ≥3:1 + ≥44pt.**

---

## The fourteen dimensions

Dims **1–10** are the viz-audit's ten, generalized to cover content **and** data. Dims **11–14** are new craft dimensions. Each is scored **0–100**, converted to a letter (bands below), and contributes its **profile weight** to the screen's overall numeric score.

| # | Dimension | Data wt | Content/LOW wt | One-line bar |
|---|---|---:|---:|---|
| 1 | Content & data resolution | 11 | 7 | Every element — datum **or** content block — is intentionally resolved (shown / deferred to a tap / deliberately minimal) with a legible hierarchy; not maximal coverage |
| 2 | Focal hierarchy | 11 | 9 | The screen opens on **one** clear focal point (data or content) that reads in <2s; passes the squint test; not a flat equal-weight wall |
| 3 | Visual depth & premiumness | 10 | 11 | Warm glow on `ink-brown-800`, layered surfaces, beveled/inset tracks, top-edge highlight — on **all** surfaces, never flat boxes, never cold neon |
| 4 | Signature ownability | 8 | 8 | Advances the Balencia language (Living Line · Constellation Radar · warm-glow surface · continuous-stroke motif · the brand period) — not a competitor clone or default-component look |
| 5 | Form appropriateness & honesty | 8 | 4 | Right form for the content/data; honest scales; no-data ≠ zero; no decorative-only chart |
| 6 | Brand, 60/30/10 & non-shaming | 7 | 7 | Orange data-ink dominant; green = arrival; purple = SIA; domain = identity; warm, non-shaming, no dark patterns |
| 7 | State craft | 7 | 8 | Cold-start / loading / empty / partial / error are **all designed** — never deferred to a generic error table |
| 8 | Kit consistency / reuse | 6 | 5 | Composes from `CRAFT-KIT.md` patterns at `CONSISTENCY.md` locked params (+ `VIZ-KIT` for data), not bespoke one-offs |
| 9 | Motion & micro-interaction | 7 | 8 | Choreographed entrance that **draws** (§8), purposeful micro-interactions, reduced-motion fallback preserves the signature |
| 10 | Accessibility | 7 | 8 | Tabulated text equivalents + contrast, never colour-alone, WCAG AA + 1.4.11 ≥3:1, ≥44pt targets |
| 11 | **Content & microcopy craft** *(new)* | 6 | 12 | Every user-facing string is authored, warm, precise, **non-shaming**, on-voice — zero lorem / placeholder / generic-AI filler |
| 12 | **Layout craft & spacing discipline** *(new)* | 5 | 6 | 8pt rhythm, optical balance, generous section breaks, intentional asymmetry — **no symmetric-card-grid monotony** |
| 13 | **Typographic craft** *(new)* | 4 | 5 | Sora/Chillax scale, weight contrast, tracking, the sacred brand period; sentence case; no web-sized type |
| 14 | **Anti-generic / brand-grade polish** *(new, gate)* | 3 | 2 | Would a top studio ship *this exact screen*? A templated/default/AI-generated read **caps** the screen regardless of per-dim scores |

Weights sum to 100 in each profile. A screen is graded under **one profile** (see `screen-classification.md`).

---

### Dimensions 1, 2, 5 — generalized from the viz-audit (apply to content *and* data)

- **1 · Content & data resolution.** Every element the screen shows — a datum *or* a content block (a row, a note, a setting, a message, a card) — must be resolved one of three ways, and the choice must read as deliberate: **shown** (with the right form), **deferred** (a headline + detail behind a tap — premium apps hide depth, not data), or **deliberately minimal** (a one-off scalar/label that needs no elaboration). −8 per primary element rendered as undifferentiated filler where craft belongs; −6 per screen that over-resolves into noise (the calm-vs-clutter tie-break: a calm, hierarchical screen scores **above** a maximalist one). *Data-screen checks (sleep score → gauge, time-series → Living Line, part-of-whole → donut, etc.) are unchanged — see `viz-audit/RUBRIC.md` dim 1.*
- **2 · Focal hierarchy.** One clear focal point above the fold (a Constellation Radar; a sleep-score gauge; on a content screen, a hero card / primary CTA / the one thing this screen is *for*). Communicates the screen's single most important thing in <2s; sized as a hero; exactly one — multiple competing foci score the same as none; a flat list/eyebrow opener with no focal anchor scores low.
- **5 · Form appropriateness & honesty.** The form fits the content shape (trend → line; part-of-whole → donut; a setting → a labelled row; a permission → an explained ask). Honest scales, no-data ≠ zero, no decorative chart. On content screens this is light (it mostly guards against dishonest/decorative data where any appears) — hence its lower content weight. *Data checks unchanged — see `viz-audit/RUBRIC.md` dim 5.*

### Dimension 3 — Visual depth & premiumness (generalized to **all** surfaces)

The viz-audit graded depth on charts; here it applies to **every** surface. Compare to the cluster benchmark's "carved instrument" feel — but **warm**, not cold neon.
- [ ] Cards/surfaces are **layered**, not flat boxes: `ink-brown-800` body + a faint top-edge highlight (the `--edge-highlight` recipe, `CK-001`) + an optional radial backplate — never a flat fill with a hairline border alone.
- [ ] Focal elements carry a **soft warm glow** at the **size-calibrated** radius (`--glow-orange` 32px on heroes ≥96px; `--glow-orange-md` ~20px at 48–96px; `--glow-orange-sm` ~12px at ~36px; none on inline) — never a 32px glow swamping a small element, never neon.
- [ ] Rings/gauges/tracks have an **inset/beveled** recess (`--track-inset`), not a flat 2-tone shape.
- [ ] Big numbers carry typographic weight + optional accent glow; inputs, toggles, chips, and rows read **crafted**, not default-component.
- [ ] Elevation uses the real `--shadow-1/2/3` honestly by z-layer — not a uniform flat drop.

### Dimensions 4, 6, 7, 8, 9, 10 — as in the viz-audit, generalized

Score per the viz-audit checklists (`viz-audit/RUBRIC.md` dims 4/6/7/8/9/10), reading "chart" as "any surface/element." Notes for the broader scope:
- **4 Signature:** a **content** screen earns this with warm-glow surface craft, a continuous-stroke motif, the brand period, RPG/SIA language used with restraint — at least **one ownable Balencia moment** per screen. Borrowing a competitor's signature 1:1 caps this at **B**.
- **7 State craft:** the empty state is the most-seen state for a new user; on content/LOW screens (auth, chat, search, lists) the empty/loading/error states are **the** craft surface and carry full weight.
- **8 Kit:** data screens also compose from `VIZ-KIT` primitives; content screens compose from `CRAFT-KIT` + `_shared-patterns` components — a bespoke one-off where a pattern exists is a Medium finding.

### 11 · Content & microcopy craft — *new* — data 6 / content 12

The separator between a competent screen and a brand-grade one is often the **words**. Read every user-facing string aloud; if any phrase sounds generic, templated, or mechanical, deduct.
- [ ] Copy is **authored**, not placeholder: no lorem, no "Title / Subtitle", no "Your data here", no unwritten SIA dialogue, no generic toast ("Success!").
- [ ] **On-voice** (`Design-System-Overview.md` §3): warm, plain, coaching — "write like a coach," sentence case, **no exclamation marks**, the brand period used with intent, ≤2 orange accent words per screen.
- [ ] **Non-shaming** framing in copy: a 0 / weak domain / broken streak / over-budget is framed as a state and a constructive next step ("0 · building capacity"), never a verdict or a guilt trip.
- [ ] **SIA copy is specific** to the user's data (a real connection-spotted insight), not a horoscope; SIA stays calm and earns its purple.
- [ ] Microcopy covers the **edges**: empty-state lines, error-recovery, permission rationale ("why we ask, what you gain"), disabled-state reasons — each authored, each warm.
- [ ] Scoring: 100 = every string feels intentional and human. −10 per templated/filler string on a primary surface; −6 per shaming or exclamation-mark phrasing.

### 12 · Layout craft & spacing discipline — *new* — data 5 / content 6

- [ ] Every gap is on the **8pt scale** and tokenized (`--spacing-*` / `--s-*`); card padding follows the brand rule (24pt default, 32pt hero).
- [ ] **Optical balance and rhythm:** tight within groups (8–12pt), generous between sections (24–32pt); no two adjacent elements share the same visual weight; vertical rhythm is consistent and calm.
- [ ] **No symmetric-card-grid monotony** — the single most common "generic AI" tell. A wall of equal cards is broken with a hero, varied card sizes, or an intentional asymmetry that guides the eye.
- [ ] Safe areas respected (status bar, tab bar, home indicator, keyboard); content never collides with chrome.
- [ ] Scoring: 100 = every gap justified, rhythm calm, hierarchy reinforced by spacing. −6 per untokenized/odd gap on a primary surface; −10 for card-grid monotony with no focal break.

### 13 · Typographic craft — *new* — data 4 / content 5

- [ ] Type uses the **real scale** (`--text-display-xl/l`, `--text-h1/h2/h3`, `--text-body/caption/eyebrow/small`) at mobile-appropriate sizes — no web-sized type, no off-scale values.
- [ ] **Weight contrast** distinguishes hierarchy (600–700 headings vs regular body), not size alone; the **eyebrow** style (12px/600/+0.12em/uppercase/40% white) is used correctly.
- [ ] **Sentence case** everywhere on UI labels/buttons/tabs; the **brand period** is used with intent (the sacred period, §6); line-height + tracking are specified (the `--leading-*` / `--tracking-*` recipe, `CK-002`), not left to default.
- [ ] Chillax is **logo-only**; Sora is UI. No more than 2 brand-orange accent words per screen.
- [ ] Scoring: 100 = rhythm, contrast, and the period all intentional. −5 per off-scale size or Title-Case label on a primary surface.

### 14 · Anti-generic / brand-grade polish — *new, holistic gate* — data 3 / content 2

The integrative question: **would a top-tier product-design studio have been proud to ship *this exact screen*?** This dimension has modest weight but acts as a **cap** (below).
- [ ] No "generic AI" tells: symmetric-card monotony, flat single-tone fills where depth belongs, placeholder copy, default-component look, decoration without meaning.
- [ ] At least **one ownable Balencia moment** is present and memorable (ties to dim 4).
- [ ] The screen has a clear point of view and emotional tone appropriate to its job (calm, warm, premium) — not merely "correct."
- [ ] Scoring: 100 = unmistakably Balencia, crafted, warm. A screen that is functionally fine but reads **templated/default/AI-generated** scores ≤60 here **and triggers the cap**.

---

## Grade bands

| Band | Score | Meaning |
|---|---|---|
| **A+++** | 98–100 | Flawless premium. Reserved as the **build-verified** ceiling (working micro-interactions in rendered pixels) — not awarded at the spec level. |
| **A++** | 95–97 | **Program DoD ceiling.** Excellent, crafted, ownable; one trivial nit. The spec is so crafted a top studio building it produces an A++ screen. |
| **A+** | 92–94 | Strong; a couple of minor craft findings remain. |
| **A** | 88–91 | Solid premium with a noticeable craft gap. |
| **A−** | 84–87 | Good, but a real craft weakness (where the viz-audit left the data layer). |
| **B+ / B** | 74–83 | Competent but visibly below premium, or a recognizable clone, or one missing focal/ownable moment. |
| **C** | 60–73 | Functional but generic/templated; significant craft rework needed. |
| **D / F** | < 60 | Subpar — placeholder copy, flat surfaces, no focal point, no ownable moment. |

**Spec-level target = A++ (95–97).** A+++ is acknowledged as the *build* program's residual (the honest spec-vs-build boundary, exactly as the viz-audit drew it at A−). **Screen-set overall** = weighted mean of all 85 screens' overall scores; the exec summary states the overall, the **band distribution**, the count below A++, and the single highest-leverage gap. **No inflation** — A++ is rare by design.

---

## Severity mapping & grade caps

| Severity | Trigger |
|---|---|
| **Critical** | Placeholder/unwritten copy on a primary surface; a **shaming / dark-pattern** framing; a dishonest chart (truncated axis, no-data-as-zero); wrong brand colour as data-ink; a core screen with no focal point at all. |
| **High** | A primary surface that reads **generic/templated** (anti-generic ≤60); no ownable Balencia moment on the screen; flat depth on a focal element; an undefined/degenerate cold-start state; a bespoke one-off where a kit pattern exists; a 1.4.11 contrast miss on a load-bearing element. |
| **Medium** | A secondary surface left flat or filler; a drift from a `CONSISTENCY.md` locked param; missing entrance choreography; untokenized spacing; an off-scale type value; a missing tap-to-drill. |
| **Low** | Cosmetic nit; optional refinement; minor legibility tidy-up. |

Caps (premium means no known serious craft defect):
- No grade above **A−** with any open **High**.
- No grade above **B+** with any open **Critical**.
- **No A++** with **anti-generic (dim 14) < B**, with **signature (dim 4) < B**, or with an undefined/degenerate cold-start state — *a clone or a generic-looking screen cannot be premium.*
- **Copy and non-shaming Criticals cap harder than motion/Highs:** an open placeholder-copy or shaming-framing finding caps the screen at **B** until resolved (a beautiful but lorem-filled or shaming screen is not premium).

---

## How a screen is scored (summary; full pipeline in `methodology.md`)

1. Assign the **profile** (`screen-classification.md`) and name the **cluster benchmark** (`benchmark-matrix.md`).
2. Score all 14 dimensions 0–100 against the checks; record each deduction as a `S##-C##` finding with severity + fix-pointer.
3. Run the **ethics pass** (non-shaming, no dark patterns) and the **anti-generic pass** (read aloud / squint test).
4. Compute the weighted overall, apply caps, assign the letter. Record a **pre** grade (as the spec stands) and a **post** grade (after the `## Premium Craft` section is written).
