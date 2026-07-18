# Worker evidence — recon-c (screens 59/61 + S12 sentinel map)

- Executed: 2026-07-11 · Provenance: Claude Fable-native subagent (GLM 429 recorded in BATCH.md) · Read-only, no edits
- Fable adjudication: accepted; S12 verified NO regression — sentinel stands

Authority literals confirmed: RPG_SYSTEM_DESIGN.md:982 streak 1.0(<7d)/1.5(7–29d)/2.0(30+d), :984 cap 2.0×; §2.7 :280-281 recovery 1.3× next active day after deliberate rest/freeze, stacks, caps 2.0×. No "unlock at N days" mechanic exists in canon. **42d ⇒ 2.0×.**

## S59 Streak details

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 59-1 | 42d shows 2.0× | STILL-OPEN | S59:150 ArcGauge value="1.5x"; streak :58 = 42 |
| 59-2 | Next-threshold copy | STILL-OPEN | :151 "Next 2.0x at 60 days" — contradicts canon AND own spec 59:35 |
| 59-3 | Recovery 1.3× post-rest | STILL-OPEN | :153-157 "Unlocks at 50 days" fabricated mechanic; 1.3× absent |
| 59-4 | Gauge role+name+value | PARTIAL | data.tsx:182 aria-label, NO role="img" (peers have it :216,:240,:413) — KIT EDIT |
| 59-5 | Canonical lock | STILL-OPEN | Ad-hoc Lock :155,:191; PaywallLock (paywall.tsx:7) not imported; note: recovery gate is NOT premium — needs non-paywall disposition |
| 59-6 | Freeze eligibility/confirm/undo | STILL-OPEN | :175 static BtnPrimary; "2 available" :163; spec 59:67,89-90 wants sheet confirm + eligibility |
| 59-7 | CTA contrast | FIXED-ALREADY | hifi-action-primary = --color-cta-ember #9A3407 (globals.css:13,312-314); audit literal stale |
| 59-8 | Math + calendar states | FIXED-ALREADY | 42/67 63% :58-63; aria-labels + glyphs :93-137 |
| 59-9 | Coaching/ConsentRail | FIXED-ALREADY | :227-230, :252 |

Fixtures: may2026 :17-26, milestones :28-33, 42/67 :58-61,:218, "1.5x" :150 — all literals, conflict with RPG:982/280. States: default only.

## S61 Reminders & tasks

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 61-1 | Native checkbox | STILL-OPEN | :161-172 span role=checkbox tabIndex, NO handler |
| 61-2 | Native switch | STILL-OPEN | :206-211 span role=switch, no handler |
| 61-3 | Opacity stacking | STILL-OPEN | :160 opacity-55 × :178 text-white/55 ≈ 0.30 effective (~2.69:1) |
| 61-4 | Registry domain names | STILL-OPEN | :71-73 "Health"/"Fit"; registry = Wellbeing/Fitness (data.tsx:21-32); tokens correct, labels drift; spec 61:33-34 itself drifts — BATCH outcome overrides spec |
| 61-5 | "Missions" provenance | FIXED-ALREADY | :111 'Via schedule + missions' |
| 61-6 | 3-of-4 roll-up vs list | STILL-OPEN | :99 meta "3 of 4 on" but only 2 rows :102-103 |
| 61-7 | Arithmetic/geometry/consent | FIXED-ALREADY | 6/9=67% :50-56; min-h-64px :160; native upcoming :81-94; ConsentRail :132 |

TaskRow/ReminderRow are screen-local (:143-187, :191-222) — all fixes builder-c scope. States: default only.

## S12 Home (sentinel) — NO REGRESSIONS FOUND

| Aspect | Evidence |
|---|---|
| Single ten-domain payload | lifeDomains :24-35 satisfies LifeDomainDatum[] |
| Radar | LifePowerRadar :92 + assertCompleteLifeDomains guard (data.tsx:106,54-63) |
| Labels/AT summary | :106-110; role=img aria data.tsx:123; strongest/lowest :96 from :58-59 |
| Completeness | :89 count chip; data-domain-count data.tsx:124 |
| Life Power | calculateLifePower :57 → :99; formula data.tsx:65-80 = canon RPG:171 |
| Interactivity | mood :76-78, action rows aria-pressed :141-160, quick actions anchors :123-131 |

Audit claims 487/8-spoke/9-vs-12-domains/dark-default all SUPERSEDED (DVF-01/06 + shared rewrite). Informational, non-defect: screen-local payload differs from DEFAULT_LIFE_DOMAINS (intended per-screen data); "Lv 12" vs spec "Level 14" pre-existing, out of sentinel scope.

## Kit ledger

| Item | Scope |
|---|---|
| ArcGauge role="img" (data.tsx:180-193) | KIT (Fable); S59 only C1 consumer; grep other consumers before edit |
| PaywallLock adoption | component shared, wiring screen-local |
| CTA contrast / domain tokens | already resolved — do not re-touch |
| S59 multiplier/recovery/freeze; S61 checkbox/switch/contrast/labels/roll-up | screen-local (builder-c) |
