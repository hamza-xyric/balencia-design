# New RW items filed by R0 triage + affordance inventory

Source: 40 independent W-007 triage reviews (`R0/reviews/S<id>.md`, 40/40
FIX-FILED — 59 High / 101 Medium / 70 Low) + `R0/affordance-inventory.md`
(50 bare-affordance rows + kit findings). Defects clustered by root cause;
per-screen detail lives in the review files. Batch assignments are
SUGGESTED — confirmed at each batch's /start-batch, after founder ack of the
stop-condition surface (see `R0-close-report` section in batch file).

Severity of an item = highest severity of its member defects.

## Kit / shared-component items (natural home: R2 — same blast-radius class as A24-002)

| ID | Sev | Item | Screens/files | Notes |
|---|---|---|---|---|
| RW-R0-01 | High | SafetyCard (kit/system.tsx) crisis-resources block has no reachable entry point — violates canon §8 "always reachable" | kit/system.tsx; sighted on 21, 54, 58 (+46's variant SafetyResourceCard also under-built: no call/text action, no crisis rules) | Trust/safety; fix once in kit, verify all consumers |
| RW-R0-02 | High | cia.tsx Composer + VoiceComposer render attach/mic/send as bare `<span>` icon controls (some unlabeled) | kit/cia.tsx; reused on 4+ chat/voice screens | From chrome inventory — A24-002's list was incomplete; add to R2 scope |
| RW-R0-03 | High | Consent chips rendered non-interactive / wrong kit component (Revoke/Export/Delete as decorative spans); ConsentRail ships only 5 of 8 spec-named chip types | 21, 22 (chips); kit ConsentRail (18) | Consent affordances must be real controls (canon §8) |
| RW-R0-04 | High | ProgressRing center label overflows/collides with ring stroke at small sizes | kit/data.tsx ProgressRing; sighted on 47, 60, 71 | One kit fix + consumer sweep |
| RW-R0-05 | High | SectionTitle prints literal HTML markup as visible text (no rich-text path) | kit/chrome.tsx SectionTitle; sighted on 24 | Component contract fix |
| RW-R0-06 | High | ChargeMeter prop misuse renders 80% usage as 100% + wrong accessible name | 23 + kit ChargeMeter contract | Correctness + a11y |

## Interactive-semantics / a11y items (natural home: R3 — extends A24-010)

| ID | Sev | Item | Screens | Notes |
|---|---|---|---|---|
| RW-R0-07 | High | Zero-role / wrong-role interactive elements beyond the strict scanner's warning set | 52 (slider role=img), 45 (div role=slider ×2), 64 (block toggle no semantics), 46 (SegmentedTabs + BtnSuccess-as-toggle), 39 (rows/tabs), 37 (tabs), 38 (checklist labels), 60 (timeline indicators), 30 (DonutHub aria), 58 (HeatGrid aria), 67 (aria-live), 81 (rows + play controls) | Merge with the 50-row affordance inventory (`R0/affordance-inventory.md`); split ≤10 screens/wave |
| RW-R0-08 | High | Screen-level layout breakage | 42 (overlay overflows frame, Share clipped), 67 (pagination buried behind sheet), 94 (CTA text-wraps breaking pill), 37 (ad-hoc FAB overlaps content), 85 (floating tab bar invisible — ad-hoc bottomAction bypass) | Mechanical layout fixes; sentinel screenshots before/after |

## Token / color-system items (natural home: R4 — rides RW-021..024)

| ID | Sev | Item | Screens | Notes |
|---|---|---|---|---|
| RW-R0-09 | High | Undefined/broken utility classes paint nothing | 33 (`domain-people`), 35 (`text-brand-cyan`), 18 (wrong Tailwind utility family on DonutHub), 24 (`Social` undefined token), 78 (`text-20px`), 85 (`font-headline`) | Extend RW-023 gate: verify-brand should also fail UNDEFINED tokens, not just raw literals |
| RW-R0-10 | Med | Canon color/glow-semantics misuse (beyond purple-specific A24-003) | 35 (green streak glow), 36 (green glow on 72%), 98 (orange you-glow on error card), 71 (+3 delta orange not green), 30/31/39/62/80/94 (domain chips using you/cia tones instead of domain hex), 24 (sleep wrong domain color), 38 (flat gray domain chips), 54 (projected legend orange vs purple chart), 94 (off-canon rose) | Fold into R4 purple/classification pass — classify ALL semantic color use, not just purple |
| RW-R0-11 | Med | Glass-tier violations on dense/data surfaces (canon §2) | 24, 35, 47, 54 (pattern reported as recurring in ~40 files), 80 | Haiku count sweep FIRST to size the systemic claim; then scope with founder if >10 screens |

## Data-honesty items (natural home: R4 — canon §7)

| ID | Sev | Item | Screens | Notes |
|---|---|---|---|---|
| RW-R0-12 | High | Self-contradictory rendered numbers (label vs own visualization/list) | 18 (donut vs legend), 32 (actions meta), 33 (2-vs-1 reminders; dual honesty chips), 34 (fabricated heatmap vs honest-null caption; 3/5 vs list), 36 (conflicting percentages), 47 (elapsed-time math), 53 (5-of-8 vs 6 filled), 54 (145 vs 245 min), 58 (5-of-7 vs 5 dots), 60 (hero adherence vs timeline), 78 (2 drafts), 85 (blocker count chip), 94 (recordings meta), 95 (joined/unjoined same pod) | Split ≤10/wave; harness cannot catch these — reviewer-verified fixes |
| RW-R0-13 | High | Fabricated/incoherent default states | 69 (pre-selected 1-star), 64 (blank description input; wrong default state), 80 (Connect Spotify vs connected state — **reference screen 80, stop-condition item, spec-originated**), 98 (inverted skeleton semantics; success/disabled states missing), 62 (filter default) | S80 spec fix needs spec+build change together (rename-only rule does NOT cover it — spec edit required) |
| RW-R0-14 | High | Missing consent/revoke/export/delete entry on data-touching screens (canon §8) | 24, 25, 32, 37, 38, 47, 64, 69, 78, 85, 98 | 11 screens → 2 waves; use canonical ConsentRail; zero ambition change |
| RW-R0-15 | Med | Missing provenance chips on real/synced data | 23 (hero plan), 24 (sparkline), 32 (twin metric), 53 (210-min KPI), 55 (RPG level chip — systemic candidate), 58 (sub-cards), 52 (CIA claim w/o provenance — use CIAInsightCard) | Rides R4 honesty sweep |

## Copy items (natural home: R4 — rides S-04 sweep)

| ID | Sev | Item | Screens | Notes |
|---|---|---|---|---|
| RW-R0-16 | High | Broken/nonsensical visible copy | 31 ("short detail in your sleep window"), 35 ("Read a half marathon"), 22 (internal route string as button copy), 43 ("your Amira persona"), 71 (missions copy on achievements), 47 (challenge/mission drift) | Rename-only rule (§6.10) applies to Cia tokens, not to these — they are filed defects with their own fixes |
| RW-R0-17 | Med | Monetization-trust cluster | 43 (ghost exit unequal weight — dark-pattern risk; CTA/trial copy matches no spec'd state; Free column dropped), 69 ('Not now' styled as ersatz primary), 53 (wrong tier locked vs spec) | Coordinate with R5 PaywallLock (43 is the anchor screen) |

## Spec-component completeness (NO existing batch owns this — founder decision required at stop-condition surface)

| ID | Sev | Item | Screens | Notes |
|---|---|---|---|---|
| RW-R0-18 | High | Spec-named components/modules never built | 53 (BreathingPacer — core immersive tool), 67 (ComparisonSlider), 58 (ConsistencyCloud), 33 (CadenceHeatmap), 31 (ContextToggle), 40 (AvatarStack), 18 (ConstellationRadar substituted by DonutHub), 30 (TrendChart absent), 55 (TrendChart absent), 85 (blocker accept/dismiss module), 21 (toggle/biometric/notification rows), 42 (badge emblem; forbidden numeral) | Sizeable build work. Options: (a) new R5b sub-batch, (b) spec-note dispositions for demo scope, (c) mix per component. NOT silently waivable — D2/§6 honesty |

## Chart/data-viz component fidelity (R4)

| ID | Sev | Item | Screens | Notes |
|---|---|---|---|---|
| RW-R0-19 | Med | Data-viz component misuse/fidelity | 95 (ProgressRing ghost variant on real value), 58 (TrendChart no gap treatment), 35 (legend advertises unrendered purple series), 54 (HeatGrid 14-cell vs "4 weeks" label), 32 (ProgressBar vs spec ProgressRing; hardcoded target) | Kit-adjacent; verify against canon §7 chart rules |

Low-severity defects (70) stay in their per-screen review files; each fixing
batch reads its screens' reviews at /start-batch and folds Lows in
opportunistically (no separate items).
