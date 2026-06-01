# Balencia Figma DS — Audit Rubric

**Canonical scoring authority for the Figma design-system build.** Every grade in `REPORT.md` and every finding in `findings-ledger.md` traces back to a dimension and check defined here. The bar is **premium / A+++ — a shippable, faithfully-tokenised library that a Fortune-500 product team would adopt without rework.** This rubric is intentionally hard: a component earns A+++ only when it has nothing left to improve.

> **Read-only contract.** Auditing never edits Figma. Findings carry a `fix-pointer` (the exact remedy) so a *separate* build session can act. The auditor's job is to grade and point, not to fix.

---

## Source of truth (what each component is graded *against*)

| Layer | Authority |
|---|---|
| Component behaviour, props, variants, states | React source in `balencia-screens/src/components/**/*.tsx` |
| Design tokens (colour, spacing, radius, type, motion) | `balencia-screens/src/app/globals.css` |
| Canonical pattern / interaction / a11y spec | `app_design 3/_shared-patterns.md` |
| Intended Figma build (variant axes, props, build notes) | `balencia-screens/scripts/figma-components-map.json` |
| Token → Figma-variable map | `balencia-screens/scripts/figma-tokens-map.json` |
| Figma node / variable / style ID index | `figma-mapping.json` |
| **Live truth (always wins ties)** | Balencia DS file `XF2diepp3IfcWuDWHwL4ez` via Figma MCP |

When a doc disagrees with the live file, the **live file is reality** and the doc disagreement is itself a Naming & Organization finding.

---

## The nine dimensions (weighted to 100)

Each dimension is scored **0–100**, converted to a letter (see bands), and contributes its weight to the component's overall numeric score. The overall number maps to the component's overall letter grade.

| # | Dimension | Weight | One-line bar |
|---|---|---:|---|
| 1 | Token & Variable Binding | 20 | Zero raw values — every paint, stroke, radius, spacing, effect bound to a DS variable/style |
| 2 | Structural Integrity | 15 | Correct component/set structure, named variant axes, real component properties |
| 3 | Visual Fidelity to Source | 15 | Indistinguishable from the React prototype render |
| 4 | State & Variant Completeness | 12 | Every state the prop surface implies exists as a variant |
| 5 | Auto-Layout & Responsiveness | 10 | Token-driven hug/fill, no absolute hacks, resizes sanely |
| 6 | Accessibility | 10 | AA+ contrast on dark, ≥44pt targets, focus + colourblind safety |
| 7 | Typography | 8 | Text *styles* applied, correct scale/leading/tracking, Sora weights |
| 8 | Naming & Organization | 5 | Clean layer/page names, doc-frame convention, mapping accuracy |
| 9 | Code Connect Readiness | 5 | Props map cleanly to React props for Dev-Mode handoff |

---

### 1 · Token & Variable Binding — weight 20 (the premium gate)

The single biggest separator between an "AI-generated-looking" library and a premium one. **Every** visual value must resolve to a DS variable or shared style — never a literal.

Checks (each failure deducts):
- [ ] Every fill bound to a colour variable (`get_variable_defs` shows `var(--…)`, never a bare `#hex`).
- [ ] **Alpha tints bound to a token**, not inline `rgba(255,255,255,0.x)`. *(Known systemic gap — see Cross-Cutting in REPORT.)*
- [ ] Every corner radius bound to `--radius-*` (no raw `10`, `14`, `8`).
- [ ] Every padding/gap bound to `--spacing-*` (no raw `12`, `16`).
- [ ] Every stroke colour + weight tokenised.
- [ ] Every shadow/glow uses an effect style (`Elevation/*`, `Glow/*`), not an ad-hoc drop-shadow.
- [ ] After alpha re-application, the bound variable's *value* still matches source opacity (catches the "setVariable strips opacity" gotcha).

Scoring: 100 = zero literals anywhere. −6 per distinct leaked value type per component (e.g. "3 alpha-whites" = one finding, −6; "raw radius" = another, −6). A component with the TierCard pattern (3 alpha-whites + 1 raw radius) lands ≈ B.

### 2 · Structural Integrity — weight 15

- [ ] Multi-variant components are a single `COMPONENT_SET` with named axes (`Variant=…, Size=…`), not loose frames.
- [ ] Single-purpose components are a clean `COMPONENT` (a `[doc]` wrapper frame is fine *if* states genuinely don't apply — otherwise this is a Dimension 4 failure).
- [ ] Variant axis names + values are PascalCase/consistent and match `figma-components-map.json`.
- [ ] Real **component properties** exist for dynamic content: `TEXT` props for labels, `BOOLEAN` for optional elements, `INSTANCE_SWAP` for icons — not baked-in placeholder text/icons.
- [ ] No detached instances, no orphan vector noise, no stray hidden layers.
- [ ] Nested DS components are **instances**, not copies (composition, not duplication).

### 3 · Visual Fidelity to Source — weight 15

Compare `get_screenshot` of the Figma component against the prototype render of the same component.
- [ ] Layout, proportion, and alignment match.
- [ ] Colour, type, iconography match.
- [ ] Internal padding and gaps match the source.
- [ ] Glassmorphism (border at 5–10% white, `#211008` surface) reads correctly on the dark canvas.
- [ ] No truncation, overflow, or mis-scaled icons.
- [ ] Premium feel preserved — the component looks *crafted*, not boxy/default.

### 4 · State & Variant Completeness — weight 12

Derive the expected state matrix from the React props, then confirm each exists in Figma.
- [ ] Interactive states present where the source has them: default / pressed / disabled / loading / focus.
- [ ] Form states: default / focused / filled / error.
- [ ] Semantic variants present: completed, locked, empty, selected, connected/not-connected, rank/self, etc.
- [ ] Domain-coloured components cover all 12 domains where applicable.
- [ ] A `[doc]` single-variant component is **only** acceptable when the source component is genuinely stateless. If the React component has an `onPress`, `disabled`, or selectable state, the missing variants are a finding.

### 5 · Auto-Layout & Responsiveness — weight 10

- [ ] Auto-layout used wherever the source flows (rows, stacks, lists).
- [ ] `HUG` / `FILL` sizing modes correct for the content model.
- [ ] Padding/gap come from spacing tokens, not nudged positions.
- [ ] No `layoutPositioning: ABSOLUTE` where flow is expected (absolute only for true overlays/badges).
- [ ] Resizing the instance keeps the component intact (text wraps, fills stretch, nothing clips).
- [ ] `primaryAxisSizingMode` survives resize (catches the "resize reverts to FIXED" gotcha).

### 6 · Accessibility — weight 10

- [ ] Text contrast ≥ **4.5:1** (AA) on its actual surface; ≥ 7:1 (AAA) earns full marks. Check muted whites (`white/40`, `white/50`) against `#211008` / `#0A0A0F`.
- [ ] Interactive targets ≥ **44×44pt** (or documented exception).
- [ ] A focus affordance is representable (focus variant or documented ring).
- [ ] Domain colours are distinguishable for colour-blind users (don't rely on hue alone — icon/label present).
- [ ] Icon-only controls have a name path (component named for its action; Code Connect carries the label).
- [ ] Status is never colour-only (e.g. income/expense also signed/labelled).

### 7 · Typography — weight 8

- [ ] Text uses a shared **text style** (`get_design_context`/style id present), not raw font props.
- [ ] Size/leading/tracking match the `--text-*` scale and `_shared-patterns.md`.
- [ ] Sora family + correct weight (400/600/700); weight overrides only when the style legitimately differs, and re-applied via `setTextStyleIdAsync`.
- [ ] No off-scale font sizes.

### 8 · Naming & Organization — weight 5

- [ ] Component on the correct DS page (Atoms/Molecules/Organisms/…).
- [ ] Layer names meaningful (no `Frame 427`, `Group 12`).
- [ ] `[doc]` documentation frames follow the established convention.
- [ ] `figma-mapping.json` / `figma-components-map.json` entries match the live node (name, node_id, key, variant axes). Mismatches from `consistency-check.mjs` land here.

### 9 · Code Connect Readiness — weight 5

- [ ] Figma component properties map 1:1 to the React component's props (names + types).
- [ ] A `.figma.tsx` exists or is trivially derivable (Phase 3E may be pending — grade readiness, not completion).
- [ ] `code_syntax` / token `WEB` values align so Dev Mode shows real `var(--…)`.
- [ ] No prop the engineer needs is missing from the Figma surface.

---

## Grade bands

| Band | Score | Meaning |
|---|---|---|
| **A+++** | 98–100 | Flawless premium. Zero token leakage, full states, pixel-faithful, full a11y. Nothing to improve. |
| **A++** | 95–97 | Excellent; one trivial nit at most. |
| **A+** | 92–94 | Strong; a couple of minor findings. |
| **A** | 88–91 | Solid premium with a noticeable gap (e.g. some token leakage). |
| **A−** | 84–87 | Good, but a real weakness needs attention. |
| **B+** | 80–83 | Competent; multiple findings or one structural gap. |
| **B** | 74–79 | Acceptable but visibly below the premium bar. |
| **C** | 60–73 | Functional draft; significant rework needed. |
| **D / F** | < 60 | Not shippable; missing states/tokens/fidelity. |

**DS overall grade** = weighted mean of all audited components' overall scores, plus a Foundations sub-grade (tokens/styles/variables completeness vs `globals.css`). The executive summary states both, plus the single highest-leverage risk.

---

## Severity mapping (for the findings ledger)

| Severity | Trigger |
|---|---|
| **Critical** | Wrong brand colour, broken component (won't instantiate), missing a state the app depends on, contrast failure on primary text. |
| **High** | Token leakage on a core/reused component, missing interactive state, structural defect (loose frames where a set is required). |
| **Medium** | Token leakage on a leaf component, minor fidelity drift, naming/mapping mismatch, missing focus variant. |
| **Low** | Cosmetic naming, doc-frame nit, optional-variant gap. |

A component cannot grade above **A−** while it has any open **High**, or above **B+** with any open **Critical** unresolved (the cap reflects "premium means no known serious defects").
