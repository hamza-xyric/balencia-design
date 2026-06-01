# Balencia Figma DS — FIX-LOG

| | |
|---|---|
| **Applied** | 2026-05-30 |
| **Working-tree base** | `5d9419b` (fixer changes uncommitted) |
| **Plan** | `figma-build-audit/FIX-PLAN.md` (approved; B-3 judgment calls answered by user) |
| **DS file** | `XF2diepp3IfcWuDWHwL4ez` |
| **Scope** | X-006, X-007 (FP), X-008, X-009, C-008…C-024 |
| **Prior apply** | `86ccd51` (X-001…X-005 / C-001…C-007) — archived in `history/2026-05-29-86ccd51-fixer.md` |

> **Headline:** verify-before-fix retired the deep audit's #1 finding (X-007 — "5 components are FRAME-not-COMPONENT_SET") as a **false positive**: live `node.type` reads proved all five are already proper `COMPONENT_SET`s. `get_metadata` renders every variant set as `<frame>`-of-`<symbol>`, which the 116-agent audit misread. Running `combineAsVariants` would have **broken working components**. FAB ("missing Pressed") and RichInlineCard ("missing [doc] prefix") were also stale/FP. The real work was surgical: 2 confirmed structural adds, 1 new atom, 1 axis extension, 1 state-axis add, 7 lockstep contrast fixes, 2 documented states.

---

## B-3 judgment decisions (user-confirmed before apply)

| Decision | Choice | Rationale |
|---|---|---|
| SuggestionChip contrast | **Chip bg → ink-900** | Keeps `--color-royal-purple` #7F24FF brand-intact; #7F24FF on #0A0A0F ≈ 4.6:1 ✓ AA. Scoped, no brand-token change. |
| VoiceWaveform idle bars | **Bump tint → white-25** | Idle control reads as present-but-inactive; ≈3:1 non-text UI on ink-900. |
| MoodSelector states | **Extract MoodOption atom** | Premium-correct: real `State=Default|Selected|Pressed` variants + Code-Connect-ready TEXT props, vs a [doc]+CC stopgap. |
| ToggleSwitch focus | **Documented 2px ring** | Avoids doubling the On×Disabled matrix for a transient focus state Dev Mode/code already renders. |
| X-006 codeSyntax | **calc() form** | Faithful Tailwind v4 emission, tokenized, no `--spacing-N` collision, no new CSS. |

---

## What changed (by layer)

### Layer 1 — Source of truth (repo)
| File | Change |
|---|---|
| `balencia-screens/src/components/**` (8 files) | Lockstep a11y tint bumps: Eyebrow `white/40→/70`; FAQAccordion chevron `white/30→/40`; NotificationRow preview `white/50→/70` + timestamp `white/40→/60`; ChatInputBar placeholder `white/30→/50`; Input helper `white/40→/70`; SuggestionChip `bg-ink-brown-800→bg-ink-900`; VoiceWaveform idle opacity `0.12→0.25`. |
| `balencia-screens/scripts/figma-components-map.json` | SegmentedControl `Size=Sm|Md` axis + comment; SettingsRow `Disabled`+`Trailing=Destructive` + comment; **MoodOption** new atom entry; MoodSelector recomposition comment; DomainSkillCard node → `373:176` + `State` axis. |
| `figma-mapping.json` (`ds_components`) | Added **MoodOption** (`404:31`); updated MoodSelector / SegmentedControl / SettingsRow / DomainSkillCard axes + node ids + comments. |
| **Gates** | `npm run check` → **green** (lint, typecheck, routes 90/90, assets, copy 170, brand 170). `node consistency-check.mjs` → **green** (indexes agree, token coverage clean). |

### Layer 2 — Figma DS (`XF2diepp3IfcWuDWHwL4ez`)

**A. X-006 codeSyntax** — `spacing/2` (193:4), `spacing/6` (52:2), `spacing/10` (62:2) WEB codeSyntax → `calc(var(--spacing) * 0.5 / 1.5 / 2.5)`. Values unchanged (2/6/10).

**B. X-008 a11y fills (lockstep with prototype)** — intrinsic-alpha rebinds (opacity auto-synced; verified via read-back):
| Component | Node(s) | Before → After |
|---|---|---|
| Eyebrow Default | 68:3 | `5:9` (white-40) → `white-70` (4:40) |
| Input helper ×3 | 45:8, 45:15, 45:22 | `5:9` (white-40) → `white-70` (4:40) |
| ChatInputBar placeholder ×2 | 164:6, 165:10 | `white-30` → `white-50` (4:41) |
| NotificationRow timestamp ×8 | 168:28…169:86 | `white-40` → `white-60` (147:5) |
| NotificationRow preview ×8 | 168:29…169:87 | `white-50` → `white-70` (4:40) |
| FAQAccordion chevron ×2 | I257:109;93:74, I259:110;93:68 | **stroke** `white-30` → `white-40` (4:42) |
| SuggestionChip bg ×2 | 87:2, 87:4 | `5:4` (ink-brown-800) → `ink-900` (4:5) |
| VoiceWaveform idle bars ×24 | 348:166… | `5:6` (pure white @0.12) → `white-25` (269:2 @0.25) |

**C. C-013 DomainSkillCard** — clone + `rescale(0.95)` → `State=Pressed`; `combineAsVariants` → COMPONENT_SET `373:176` (`State=Default|Pressed`). Screenshot: `d84e507a-d105-4787-924a-f2f89a74f163`.

**D. C-017 SegmentedControl** — renamed 9 variants `Size=Sm`; cloned 9 → `Size=Md` (font 14px, minHeight 56), `appendChild` into set `49:69`, arranged 2 rows, resized frame to 2448×184. **18 variants**, `SegmentCount×ActiveIndex×Size`. Screenshot: `b73bfb3b-d04f-406e-885b-4eaac3182e28`.

**E. C-009 SettingsRow** — renamed 4 `Disabled=False`; built `Trailing=Destructive` (clone None, label → `color/state/error` 5:16, centered, icon removed); cloned all 5 → `Disabled=True` (opacity 0.45); WRAP layout into 2 rows. **10 variants**, `Trailing(5)×Disabled(2)`. Checked = nested ToggleSwitch instance (documented in set description). Screenshot: `c93c20f2-11e3-40fc-8959-d6c5bf737ddc`.

**F. C-014 MoodOption / MoodSelector** — new atom **`404:31`** (Atoms page) from existing Default/Selected option clones + Pressed (rescale 0.95); fixed widths 56/56/53; added `Emoji#406:0` + `Label#406:4` TEXT props bound to text nodes. Recomposed MoodSelector `155:5` from 6 FILL-width instances (Good = `State=Selected`). **Fix-up:** the variant switch reset the selected bg from `domain-wellbeing @0.15` to full opacity → restored via `node.fills.map(p=>({...p,opacity:0.15}))`. Screenshots: MoodOption `ee866021-a83f-43eb-9596-dda2027ea564`; MoodSelector `f6bf8271-3d42-40a3-8f70-4312994d47bf`.

**G. C-023 ToggleSwitch** — appended a focus-ring spec to the set (`48:10`) description (2px brand-orange @70%, code-only).

**H. C-022 ActionCard** — attempted to bind/set the Completed name (`200:51`) strikethrough decoration color to white-40. **Figma API limitation:** `textDecorationColor` is rejected on STRIKETHROUGH ranges ("Cannot set text decoration color on a non-underlined text range") — only UNDERLINE supports it. Strike inherits the white fill; documented on the set (`201:31`) description. Dimming the whole name to white-40 was **rejected** (worse fidelity — source keeps the name readable).

---

## Disposition of every in-scope finding

| ID | Disposition |
|---|---|
| **X-006** spacing codeSyntax | **Resolved** — calc() form on spacing/2,6,10. |
| **X-007** FRAME-not-SET (×5) | **Resolved (false positive)** — all already COMPONENT_SETs; no rebuild. |
| **X-008** AA contrast | **Mostly resolved** — 7 components fixed lockstep. Open: IntegrationCard status-color (Med). |
| **X-009** [doc] dropped states | **Mostly resolved** — DomainSkillCard, MoodSelector fixed; FAB stale (Pressed exists); ActionCard documented. Open: SectionHeader action-slot (Med). |
| **C-008** DomainTag | Resolved (FP — COMPONENT_SET). |
| **C-009** SettingsRow | Resolved — Disabled + Destructive axes; Checked via nested instance. |
| **C-010** BrandWordmark | Resolved (FP — COMPONENT_SET). |
| **C-011** DomainDashboardHeader | Partially — structural FP; icon a11y label still **open** (Med). |
| **C-012** LifePowerDisplay | Resolved (FP — COMPONENT_SET). |
| **C-013** DomainSkillCard | Resolved — State=Default|Pressed (373:176). |
| **C-014** MoodSelector | Resolved — MoodOption atom + recompose. |
| **C-015** SuggestionChip | Resolved — bg → ink-900 (brand kept). |
| **C-016** FAQAccordion | Resolved — chevron stroke → white-40. |
| **C-017** SegmentedControl | Resolved — Size=Sm|Md (18 variants). |
| **C-018** VoiceWaveform | Resolved — idle bars → white-25. |
| **C-019** NotificationRow | Resolved — preview/timestamp bumped. |
| **C-020** Eyebrow | Resolved — Default → white-70. |
| **C-021** ChatInputBar | Resolved — placeholder → white-50. |
| **C-022** ActionCard | Resolved/documented — API forbids strikethrough deco color. |
| **C-023** ToggleSwitch | Resolved — documented focus ring. |
| **C-024** RichInlineCard | **Wontfix (FP)** — node is a COMPONENT_SET; [doc] prefix would be wrong. |
| **C-025/C-026** LevelBadge/SocialAuthButton | Untouched — provisional, need targeted re-audit (X-010). |
| **X-011** Code Connect | Deferred (Phase 3E). |

---

## Follow-ups
1. **`/figma-build-auditor --deep`** on the touched scope — confirm the grade rose and X-007 no longer appears; re-grade SegmentedControl (B→), SettingsRow (B+→), DomainSkillCard (B→), MoodSelector (B+→), DomainDashboardHeader/LifePowerDisplay/DomainTag/BrandWordmark (FP corrections).
2. **IntegrationCard** status-color (X-008) + **SectionHeader** action-slot states (X-009) + **DomainDashboardHeader** icon-button a11y labels (C-011) — remaining real items.
3. **LevelBadge / SocialAuthButton / RecipeCard** — targeted re-audit once MCP window resets (X-010).
4. **Commit** — fixer changes uncommitted; stage `balencia-screens/src/components/**` (8 a11y files), `figma-components-map.json`, `figma-mapping.json`, and `figma-build-audit/*`. Figma writes are live on `XF2diepp3IfcWuDWHwL4ez` (name a version checkpoint).
