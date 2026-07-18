# Worker evidence — recon-a (screens 13/14/15)

- Executed: 2026-07-11 · Provenance: Claude Fable-native subagent (GLM 429 recorded in BATCH.md) · Read-only, no edits
- Fable adjudication: accepted as ground truth for builder-a packet (see VERIFICATION-MATRIX.md)

## S13 Mission Board

| Requirement | Status | Evidence |
|---|---|---|
| MiniRadar hardcoded 487/8-spoke | FIXED-ALREADY | S13:31 LifePowerRadar + DEFAULT_LIFE_DOMAINS; data.tsx:176-178 delegation; role=img + data-domain-count data.tsx:118-125 |
| Data-bound Life Power/domain summary | FIXED-ALREADY | data.tsx:41-52 ten domains, assertCompleteLifeDomains :106 |
| MetricPill source/state | STILL-OPEN | S13:20-22 bare literals; MetricPill has no source/freshness/null slot (data.tsx:12-19) |
| Source/freshness/null states | STILL-OPEN | Default-only; "Synced 2h ago" static string S13:14; no skeleton/empty/filtered-empty/error/offline/success (spec 13:104-112) |
| Filter chips native | STILL-OPEN | S13:34-36 display-span Chips (chips.tsx:65-78); interactive variant exists (chips.tsx:51-63) unused |
| Mission rows operable | STILL-OPEN | S13:40-52 SolidCard sections, no button/link; spec 13:110 wants inline complete affordance |
| MoreHorizontal mislabelled "Filter"; journal control missing | STILL-OPEN | S13:14; spec 13:22,128 wants journal + filter controls |
| Complete taxonomy Life/Main/Side/Weekly/Daily/Group | STILL-OPEN | S13:35 = Active/Done/All/Life/Main only; status+type conflated |
| 'Daily' used as domain | STILL-OPEN | S13:9 — mission type in domain slot; not in LIFE_DOMAIN_ORDER |
| Creation/navigation | FIXED-ALREADY | S13:16 FloatingQuickLog Link; nav anchors chrome.tsx:104-108; "Missions" label chrome.tsx:90 |

Fixtures: missions literal array S13:5-10; tiles 04/12/07d S13:20-22 unsourced. States: default only.

## S14 Mission Detail

| Requirement | Status | Evidence |
|---|---|---|
| Native back | FIXED-ALREADY | chrome.tsx:39 + back-control.tsx:5-24 |
| "Cia" naming | SUPERSEDED-BY-DVF-07 | S14:93 "Ask CIA →" correct |
| 10px KPI provenance | STILL-OPEN | S14:68-79 text-[10px] provenance/labels |
| Domain destinations | STILL-OPEN | S14:55-60 buttons labelled "Filter by Fitness/Health", no href; spec 14:32,84 wants nav to domain dashboards |
| "Health" label drift | STILL-OPEN | S14:58 label Health on domain-wellbeing tokens; registry name = Wellbeing (data.tsx:30) |
| "System" vague provenance | STILL-OPEN | S14:74,79 |
| Streak/XP tied to RPG rules | STILL-OPEN | S14:67,72,77 literals 9/6/320; no rule source |
| ConsentRail | FIXED-ALREADY | S14:135 |
| Accordions | static aria-expanded={false}, no handler | S14:113-128 |

States: default only (comment S14:14-19 lists empty/low-confidence/offline/stalled/success unrendered).

## S15 Create/Edit Mission

| Requirement | Status | Evidence |
|---|---|---|
| Native prompt input | PARTIAL | glass-pill-input.tsx:44 native but single-line `<input>`; spec 15:66 requires multiline — KIT CHANGE |
| Examples operable | STILL-OPEN | S15:47-51 display-span Chips |
| Domain removal | STILL-OPEN | S15:87-92 spans; X decorative aria-hidden; contrast: action rows have real Remove buttons :109-111 |
| Switch operable | STILL-OPEN | S15:138-140 span role=switch, no handler; radios :144-155 same |
| Keyboard reorder | STILL-OPEN | GripVertical aria-hidden :104; no move up/down; milestones no reorder :125-129 |
| Sticky validity-aware CTA | STILL-OPEN | S15:198-200 static BtnPrimary at scroll end; bottomAction slot (HifiShell.tsx:34) unused; loading/disabled props (buttons.tsx:34-49) unwired; spec 15:97 validity gate |
| One modal exit | STILL-OPEN | S15:31 TopBar back default-true + Close X = two exits; needs back={false} |
| Double glass nesting | STILL-OPEN | S15:53-59 GlassCard tone=cia wrapping CIAInsightCard (itself GlassCard, cia.tsx:21) |
| Domain tokens | STILL-OPEN (minor) | S15:87,90 tone="you" orange instead of domain-fitness/nutrition |
| CIA casing | FIXED | S15:44,54 |
| ConsentRail | FIXED-ALREADY | S15:195 |

Fixtures: all literals (prompt :43, type Main :71, domains :87-91, actions :102, milestone :127-128, XP ~420 :182-186 no rule source). Type set :25 = Daily/Weekly/Side/Main — missing Life/Group. States: default only (comment :18-23).

## Shared-kit dependency ledger

| Fix | Scope |
|---|---|
| GlassPillInput multiline variant | KIT (Fable) — needed by S15:43 (+S45) |
| CTA/text contrast tokens | already resolved in globals.css per recon-c; no action |
| MetricPill source slot | screen-local composition preferred (no kit change) |
| Chip interactive/removable | screen-local — chips.tsx already supports interactive |
| Switch/radio operability | screen-local inline |
| Sticky CTA | screen-local via existing bottomAction slot |
