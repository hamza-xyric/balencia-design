# Worker evidence — recon-d (screens 73/97 + shared-kit sweep)

- Executed: 2026-07-11 · Provenance: Claude Fable-native subagent (GLM 429 recorded in BATCH.md) · Read-only, no edits
- Fable adjudication: accepted as ground truth for builder-d packet

## S73 Mission Journal (Rework)

| Requirement | Status | Evidence |
|---|---|---|
| 12-week vs six-week copy | STILL-OPEN | S73:65 "12 weeks · 1,200 XP" vs :72 "Six weeks of discipline", same card :61-83 |
| Per-metric sourcing | PARTIAL | Summary :33-52 under one 'Via missions ledger' chip :50; entries correctly split (:77/:104/:141) |
| Thumbnail or honest-null media | STILL-OPEN | :129-136 64px buttons aria-labelled as photos rendering only Camera glyph — neither |
| Storage/sync claim | STILL-OPEN | :151 "private on this device" unbacked |
| Hide/delete media | PARTIAL | SafetyCard :148 operable; no per-photo hide/delete |
| 44px filters / ConsentRail / CIA casing | FIXED-ALREADY | :21-31 h-11 role=tab; :153; no visible coach name |

Fixtures: literals 18/8,420/4 :37-46, 1,200XP/12wk :65, 600XP/4wk :122; domain tokens registry-aligned. States: default only (comment :8-13, spec 73:87-96).

## S97 Plans Library (Block)

| Requirement | Status | Evidence |
|---|---|---|
| ≥44px filter tabs | FIXED-ALREADY | :79 h-11 tablist; TopBar toggle :32-40 h-11 w-11 |
| Operable plan rows | STILL-OPEN | :95-109, :137-150 SolidCard sections, no role/handler |
| Canonical PaywallLock | STILL-OPEN | Ad-hoc gate :111-135 with 36px CTA :130; paywall.tsx:7-44 canonical, NOT imported |
| 8 controls | PARTIAL 3/8 | :164-180 pause/export/revoke; missing edit/stop/archive/delete/share; meta :165 advertises edit/archive without buttons |
| Per-plan provenance | PARTIAL | "Via CIA" :103, "Locked template" :119, "Saved" :145; no freshness on saved |
| CIA suggestion / ActivePlanPath / ConsentRail | FIXED-ALREADY | :66-77 (Dismiss visible); :192-222 role=img; :182-184 |

Fixtures: literals ("Week 3 of 8" :49, ProgressBar 12 :106, w-[40%] :196). States: default only (comment :18-24, spec 97:78-84); swipe complete/archive absent.

## Kit truth table (systemic audit claims re-verified)

| Audit claim | Current truth | Evidence |
|---|---|---|
| TopBar back inert span | FIXED-ALREADY | chrome.tsx:53-55 → back-control.tsx:14-23 |
| Nav inert divs | FIXED-ALREADY | chrome.tsx:104-118 anchors, aria-current, 44px |
| FloatingQuickLog inert | FIXED-ALREADY | chrome.tsx:125-138 Link |
| GlassPillInput div | FIXED-ALREADY | glass-pill-input.tsx:34-52 native input, 16px |
| focus-ring no consumer | FIXED-ALREADY | back-control.tsx:17, chrome.tsx:69/108/129, system.tsx:18, chips.tsx:44/57, buttons.tsx:161, glass-pill-input.tsx:39 |
| CTA state contract | MOSTLY-FIXED | buttons.tsx loading/aria-busy/BtnSuccess/BtnDestructive; gap: no aria-pressed on buttons (Chip owns toggle-press) |
| ArcGauge no role | STILL-OPEN | data.tsx:180-193 — Fable-serialized kit edit |
| SafetyCard inert | FIXED-ALREADY | system.tsx:4-30 native link, 56px, honest copy |
| Canonical lock unadopted | PARTIAL | paywall.tsx:7-44 exists; S97 not importing |
| MiniRadar hardcoded | FIXED-ALREADY | data.tsx:176-178 → LifePowerRadar; ten-domain enforced :54-63 |
| ConsentRail native | FIXED-ALREADY | chips.tsx:95-116 |

## Dependency split

- Screen-local (builder-d): S73 copy/provenance/media-honesty/storage-claim/hide-delete; S97 rows/controls/provenance + PaywallLock adoption (import only).
- Fable-serialized: ArcGauge role="img" (S59 consumer, builder-c coordinates).
