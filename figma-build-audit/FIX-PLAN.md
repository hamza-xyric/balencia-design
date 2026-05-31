# FIX-PLAN — Consolidated Phase-4 DS Pass

**Mode:** PLAN (dry run — zero writes). Generated 2026-05-31 after pilot #8.
**DS file:** `XF2diepp3IfcWuDWHwL4ez` · **Screens file:** `jxoChLrvjIdHQh9Q95SHpi` (consumer — never edited here).
**Scope:** the open-at-DS-source findings accrued during the 8-screen Code→Figma pilot.
**Supersedes:** the 2026-05-30 plan (X-006/007/008/009, C-017/023/024 — that pass is closed; superseded content retained in git history).
**Approve with:** re-invoke `/figma-build-fixer --apply` (optionally per-wave, e.g. `--apply X-015,C-033`).

> **⚠️ Before approving:** name a **Figma version checkpoint** on `XF2diepp3IfcWuDWHwL4ez` (File → Save to version history → "pre Phase-4 DS pass"). Every write below is reversible, but a checkpoint is the clean rollback.

---

## Reframing (verified against React source + live Figma)

The headline from verification: **the DS Figma components lag the React API surface; this pass brings Figma up to the React source of truth.** Concretely —
- **FAB** already exposes `display: 'icon' | 'pill'` + `label` in React (`FAB.tsx:5-12`); Figma has only `Variant[Primary|Ghost] × State`. ← Figma catches up.
- **MissionCard** already renders `mission.domains ?? [mission.domain]` as *multiple* DomainTags + a `mission.progress` arc (`MissionCard.tsx:14,38`); Figma nests one baked tag + baked ring. ← Figma catches up.
- **SignalPill** takes its label as `children` (`ConversationSuite.tsx:86`); Figma has no Label property. ← Figma catches up.
- **ModuleCard** derives the dot from `module.domain` and the badge from a hardcoded `badgeClasses` map (`ModuleCard.tsx:88-93`); Figma bakes one sleep dot + one green badge. ← Figma catches up.

So the **React prototype is largely already correct** — most B4 (prototype) work is *nil*; the exceptions are the two genuine parity decisions (C-034 placeholder default, C-032 LevelBadge rarity), flagged as judgment.

All `color/domain/*-subtle` tokens **already exist** (alpha-baked, `VariableID:546:2`–`546:13`) — every X-012 rebind targets an existing variable; **no token minting** required. `consistency-check.mjs` is present and must pass after any source-of-truth edit.

---

## Per-finding plan

Legend — **M** mechanical (rebind to existing var) · **S** structural (add variant/property) · **J** judgment (design decision) · **P** prototype parity.

### Wave 1 — X-012 token-hygiene rebinds (Dimension 1 · weight 20 — the premium gate). Lowest risk, highest score leverage.

| ID | Layer | Exact write op | Tag |
|----|-------|----------------|-----|
| **X-015a** | Figma DS | `LvPill` bg frame **`326:155`** (child of DomainDashboardHeader `329:158`): live `fills[0]` is bound `color/domain/fitness` **with paint-opacity 0.15** (X-012 violation — paint-opacity tint of a full-tone var; renders legibly but wrong binding method). Rebind → **`color/domain/fitness-subtle`** (`VariableID:546:2`, key `a0472601…`, alpha-baked) and **remove the 0.15 paint multiplier** (intrinsic alpha = correct). Leave text `326:156` bound full-tone `color/domain/fitness` (legible label). | M |
| **C-033** | Figma DS | SiaConversation composite **`442:224`**, 5 nested DomainTags. **Two top-level** (`446:249` fitness, `446:253` sleep) bind full-tone @ **0.15 paint-opacity** (hygiene) → rebind to `fitness-subtle`/`sleep-subtle`, drop multiplier. **Three inside nested instance `448:251`** (`I448:251;311:22` sleep, `;311:27` fitness, `;311:30` nutrition) bind full-tone **@1.0 → genuinely solid/illegible** (the real bug; stale per X-013). Override these nested DomainTag bgs → `sleep-subtle` / `fitness-subtle` / `nutrition-subtle` (`546:3` / `546:2` / `546:5`). If `448:251`'s own main component carries the stale binding, fix **its** DomainTag default + note the re-place requirement. | M (+ nested-instance override) |

**Verify after:** re-read `boundVariables.color` on each touched node = the `-subtle` var, paint-opacity gone; `get_screenshot` 329:158 + 442:224 before/after.

### Wave 2 — Microcopy + single-property adds (low risk).

| ID | Layer | Exact write op | Tag |
|----|-------|----------------|-----|
| **C-034** | Figma DS (+ P) | ChatInputBar `166:12` (State Empty/Typing/Mic): baked placeholder TEXT renders "Type a message". Set it → **"Message SIA…"** (matches `ChatInputBar.figma.tsx:10` + spec #09). **Decision (J):** React keeps its generic default `'Type a message'` (`ChatInputBar.tsx:16`, a reusable atom) but the **SIA chat screen** should pass `placeholder="Message SIA"` — confirm/patch the #09 call site for parity. | M + J/P |
| **C-035** | Figma DS | SignalPill `477:371` (Tone axis, **0 properties**): add a **`Label` TEXT component property** bound to the inner label text node (React passes label via `children`). Define on the COMPONENT_SET, bind across all 4 Tone variants. Update `ConversationSuite.figma.tsx` Code Connect to map `Label`. | S |

### Wave 3 — Variant / axis additions (structural; clone + patch + `combineAsVariants`).

| ID | Layer | Exact write op | Tag |
|----|-------|----------------|-----|
| **C-039** | Figma DS | FAB `79:10` (`Variant[Primary|Ghost] × State[Default|Pressed]`, `icon` prop): add a **`Display` axis (Icon | Pill)**. Pill per `FAB.tsx`: `h-48`, `px-6`, rounded-pill, `bg-brand-orange` (Primary) / `border alpha-white-06 + bg-ink-brown-800` (neutral), with a **`Label` TEXT property** (default "Create new mission"). Clone Icon variant + add label slot, `combineAsVariants`, bind all fills to tokens, re-apply `primaryAxisSizingMode='AUTO'` post-resize. Update `FAB.figma.tsx`. | S |
| **C-041** | Figma DS | ModuleCard `229:71` (`Variant[Suggested|Grid]`; props Name/Description/DomainLabel/Icon/HasBadge/HasLock): add (a) a **`Domain` axis** (or bound variable) driving the **dot** ellipse from `color/domain/*` (per `module.domain`), and (b) a **`Badge` type axis** (Suggested/New/Popular/StartHere) driving badge fill+text per React `badgeClasses`: suggested→`brand/orange`+"suggested", new→`forest-green`+"new", popular→`alpha/white-10`+white-60 "popular", start-here→`brand/orange`+"start here". Update `ModuleCard.figma.tsx`. | S |
| **X-015b** | Figma DS | DomainDashboardHeader `329:158` (`Variant[Compact|Expanded]`): accent bar + LvPill + Lv text are hardcoded fitness. React derives all three from `domainToneClasses[domain]`. **Judgment — propose a variable-driven domain accent** (one bound `color/domain/*` swappable per-instance) rather than a 12×2 = 24-cell Domain axis, to keep the set lean. Log rationale. | S + J |

### Wave 4 — Hard / deferred-candidates (judgment; may split to a follow-up pass).

| ID | Layer | Exact write op | Tag |
|----|-------|----------------|-----|
| **C-037** | Figma DS | MissionCard `175:101`: add an optional **second DomainTag slot** (React maps `domains[]`). Mechanical-ish structural. **Do now.** | S |
| **C-030** | Figma DS | MissionCard ProgressRing arc sweep is baked; only Percent *text* is overridable. Figma can't bind an arc *sweep* to a numeric variable directly. **Judgment — recommend DEFER** to a dedicated pass (options: discrete 0/25/50/75/100 progress variants, or per-instance arc-vector override). | J (defer) |
| **C-031 / C-032** | Figma DS + P | LevelBadge `63:47` (`Rarity[5] × Size[3]`, `level`) vs React rarity-agnostic flat brand-orange (`LevelBadge.tsx:11`). **Epic = #FF5E00 = brand-orange already** → gap is cosmetic. **Judgment — recommend add a non-rarity "Brand" variant** (exact React parity) + mark C-031/C-032 resolved-as-documented — UNLESS you want to adopt level→rarity mapping in React (an RPG product call per `RPG_SYSTEM_DESIGN.md`). Needs your call. | J |

---

## Dependency order & batching

1. **Source-of-truth first (B1):** no Wave 1–3 item needs a `globals.css` token add (all target vars exist). Source-of-truth touches are limited to the **C-034 React call-site** and the **Code Connect `.figma.tsx`** updates (C-035/C-039/C-041), done alongside each Figma change. Run `node figma-build-audit/scripts/consistency-check.mjs` after any map/CSS edit.
2. **Wave 1 (mechanical rebinds)** — first; pure Dimension-1 wins, no structural risk.
3. **Wave 2** (microcopy + SignalPill Label).
4. **Wave 3** (FAB / ModuleCard / DomainDashboardHeader axes).
5. **Wave 4** (MissionCard C-037 now; C-030 + LevelBadge → your decision).

## 🔴 X-013 caveat (communicate at hand-off)

A rebind or new variant inside a **published** DS component does **not** propagate to already-placed instances — including the 8 pilot screens. After `--apply`:
- **You** (manual) republish `XF2diepp3IfcWuDWHwL4ez` and accept updates in the Screens file.
- Pilot instances already hand-patched at the instance level (#26 LvPill, #17 ModuleCard, #13 badges, #09 composite tags) stay correct; they don't regress.
- To get the *DS-clean* binding into those pilot screens, the instances must be **re-placed/re-patched** after republish (tracked, not blocking).

## Re-audit & close-out (per applied wave)

`get_screenshot` before/after each touched component → re-run `/figma-build-auditor <scope>` → confirm the dimension grade rose and the finding is gone → mark the ledger row `resolved` (+ SHA) → update `REPORT.md` trend + `history/<date>-<sha>.md` → write `FIX-LOG.md` (every write: layer, node, before→after; judgment rationales; screenshot URLs; re-audit result).

## Open decisions needed before/at apply

1. **X-015b** — variable-driven domain accent vs a 12-value Domain axis on DomainDashboardHeader? *(recommend: variable-driven, lean set.)*
2. **C-030** — discrete progress-step variants vs defer the arc binding? *(recommend: defer; do C-037 2nd-tag now.)*
3. **C-031/C-032** — add a "Brand" LevelBadge variant for exact React parity, or adopt level→rarity in React? *(recommend: "Brand" variant + document.)*
4. **Apply scope** — all waves, or Wave 1–2 first (fast Dimension-1 win) then reassess?
