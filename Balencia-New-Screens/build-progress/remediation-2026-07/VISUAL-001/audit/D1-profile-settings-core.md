# VISUAL-001 D1 — Profile / Settings Core Audit

**Scope:** exactly screens `17`, `18`, `21`, `22`, `23`, `24`, `25`, `50`
**Posture:** read-only 19-lens Design Auditor pass at dev-handoff / WCAG 2.2 AA
**Disposition:** **release-blocked**; no screen in this wave is ready for final acceptance
**Date:** 2026-07-10

## Evidence, routing, and field inheritance

The shared before sheet is `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/audit-sheets/D1-profile-core.png`. Each row below inherits its screen's route, individual before image, and implementation module from this table. Earlier independent evidence is in `Balencia-New-Screens/build-progress/remediation-2026-07/R0/reviews/S18.md` and `S21.md`–`S25.md`.

| Screen | Review route · product route | Before evidence | Affected module alias |
|---|---|---|---|
| 17 | `/screens/17` · `/profile` | `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/baselines/local-baseline/17.png` | `S17` = `balencia-screens/src/components/hifi/screens/profile/S17MeMain.tsx` |
| 18 | `/screens/18` · stack-pushed Explore, no live route | `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/baselines/local-baseline/18.png` | `S18` = `balencia-screens/src/components/hifi/screens/profile/S18Explore.tsx` |
| 21 | `/screens/21` · `/settings`, `/preferences` | `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/baselines/local-baseline/21.png` | `S21` = `balencia-screens/src/components/hifi/screens/profile/S21Settings.tsx` |
| 22 | `/screens/22` · `/auth/whoop/callback`, `/calendar/connected` | `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/baselines/local-baseline/22.png` | `S22` = `balencia-screens/src/components/hifi/screens/profile/S22ConnectedServices.tsx` |
| 23 | `/screens/23` · `/settings/billing`, `/settings/billing/credits` | `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/baselines/local-baseline/23.png` | `S23` = `balencia-screens/src/components/hifi/screens/profile/S23SubscriptionBilling.tsx` |
| 24 | `/screens/24` · `/notifications` | `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/baselines/local-baseline/24.png` | `S24` = `balencia-screens/src/components/hifi/screens/profile/S24NotificationHistory.tsx` |
| 25 | `/screens/25` · `/help`, `/help/[slug]` | `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/baselines/local-baseline/25.png` | `S25` = `balencia-screens/src/components/hifi/screens/profile/S25HelpCenter.tsx` |
| 50 | `/screens/50` · `/profile/edit` | `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/baselines/local-baseline/50.png` | `S50` = `balencia-screens/src/components/hifi/screens/profile/S50ProfileEdit.tsx` |

Shared aliases: `CH` = `kit/chrome.tsx`; `BT` = `kit/buttons.tsx`; `CP` = `kit/chips.tsx`; `DT` = `kit/data.tsx`; `SYS` = `kit/system.tsx`; `SUR` = `kit/surfaces.tsx`; `GS` = `app/globals.css`. All paths are below `balencia-screens/src/components/hifi/` unless otherwise stated.

Classification is **systemic** when the component/token root recurs; otherwise it is **local**. Owners: **T-I** = Terra implementation, **T-UX** = Terra UX/trust/data, **AST** = asset pipeline, **SOL** = final acceptor, **IND** = independent verifier. Every row is **open / unverified** unless marked blocked; these labels do not update the remediation ledger. Proposed fixes and acceptance criteria are explicit in each row. No new finding ID is created.

## Family strengths

- All eight local captures are stable at 390×844 with no recorded console/page/core-layout issue.
- The warm-dark atmosphere, spacing rhythm, one-word italic emphasis, solid-vs-hero hierarchy, and restrained glow usually read as one family.
- Native rows that are implemented generally meet 44px geometry. Important positive defaults include masked/private identity, remember/consent caution, visible cancellation, honest-null avatar treatment, source chips, and no confirmshaming.
- Purple is mostly confined to Cia/premium contexts; utility Lucide strokes are visually consistent. Screen 50's `6 of 8` and 75% bar are internally consistent, as are screen 17's 2,450/5,809 ≈ 42% XP and screen 23's displayed plan/price.
- Natural vertical scrolling avoids hard clipping; the bottom navigation remains fixed. Reduced-motion CSS stops `quiet-pulse` and the baseline was captured with reduced motion enabled.

## Systemic roots

| Severity · class | Existing authority | Exact evidence / affected component | Proposed fix | Acceptance criterion | Owner / status |
|---|---|---|---|---|---|
| **High · systemic** | A24-002 · RW-014 · RW-015 | `CH:46-50` renders Back as `aria-hidden` span; `CH:95-105` renders all bottom-nav tabs as `div`. Back affects 18,21–25,50; nav affects all eight. | Convert to labelled native buttons/links with `aria-current`; preserve pixels. | Keyboard, switch and screen-reader operation pass; 44px targets and sentinel diffs remain stable. | T-I / open |
| **High · systemic** | RW-R0-03 · RW-R0-14 | `CP:31-36` ships only 5/8 consent dimensions. 17/18/23 use it; 21 uses inert `Provenance`; 22 uses inert Chips; 24/25/50 omit required controls. | Provide the full category/source/scope/freshness/retention/export/revoke/delete contract, using real controls and contextual sheets. | Every data-touching screen exposes truthful, operable, reversible controls; no action verb is a decorative chip. | T-I + T-UX / open |
| **High · systemic** | RW-VF-01 · RW-VF-05 | `BT:19` uses white 16px on orange (~3.06:1); `CH:71-72` and screens use semantic text at white/35–45 and 10–11px. Active failures include S22 Save preferences and S25 Ask Cia. | Adopt tested semantic text tokens and a role-based minimum type scale. | Normal text ≥4.5:1, large text ≥3:1; 8–10px semantic copy removed or waived; disabled exceptions documented. | SOL + T-I / filed-open |
| **High · systemic** | RW-VF-02 · A24-010 | Shared buttons lack an authored focus/pressed/loading/success/destructive matrix; `.focus-ring` exists at `GS:276` but hifi kit consumers do not apply it. | Complete the tokenized CTA/control interaction contract without changing hierarchy. | Keyboard focus is always visible; every applicable state and reduced-motion variant has a sentinel. Visual direction remains blocked on Image 2. | SOL + T-I / semantic work open; art blocked |
| **Medium · systemic** | RW-VF-08 · RW-R0-18 | Each module renders one representative frame while specs require default/focus/disabled/loading/empty/error/success/offline/privacy states. Baseline itself used `reducedMotion: reduce`. | Disposition and implement the required state matrix per screen/component. | Separate deterministic captures verify each applicable state and default/reduced motion. | SOL + T-I / filed-open |
| **Medium · systemic** | A24-008 · RW-011 · RW-013 | Baseline JSON marks all eight `visibleWrongCaseCia`; nav and body copy still render `CIA`. | Complete approved visible-copy `Cia` convergence only. | Copy gate and strict instrumentation report zero wrong-case coach tokens. | SOL + T-I / open |
| **Medium · systemic** | RW-VF-04 · A24-003 | No signature icon registry; S22 repeats generic `Info`/`Zap`, S23 uses success-coded `ShieldCheck` for failure, and Cia identity is Sparkles/MessageCircle. | Classify utility versus signature symbols and correct semantic mismatches. | Registry/stroke/size/label checklist passes; official logo remains untouched. Final art direction is blocked on Images 1–2. | SOL + AST / blocked references |

## Screen dispositions

### 17 — Conditional visual pass; release-blocked

| Severity · class | Authority | Exact evidence / affected | Proposed fix | Acceptance | Owner / status |
|---|---|---|---|---|---|
| **High · systemic manifestation** | A24-002 · RW-015 | D1/17 shows fixed nav; `CH:95-105` is non-operable `div` chrome. | Apply shared native-nav fix. | All four destinations operate and current Me is announced. | T-I / open |
| **High · systemic manifestation** | RW-R0-03 | `S17:253` uses `ConsentRail`; `CP:32` lacks category/scope/freshness. | Complete the shared rail and open real control sheets. | Eight dimensions are present, labelled and operable. | T-I + T-UX / open |
| **Medium · local** | RW-R0-12 | `S17:235` says “Connected apps · 3 connected” while `S17:247` says “Data sources · 84 connected” without distinguishing providers from records. | Reconcile or name the scopes and cite their sources. | A user can explain why both counts are true; screen-reader labels include units/scope. | T-UX / open |
| **Medium · systemic manifestation** | RW-VF-01 · RW-VF-05 | `S17:142,148,195,258` uses meaningful 11–12px white/40–45 copy. | Replace opacity microcopy with semantic tokens. | All profile metadata/section labels pass AA and text zoom. | T-I / filed-open |
| **Medium · systemic manifestation** | RW-VF-08 · A24-008/RW-011 | `S17:102-108` declares only a static populated frame; `S17:150,234,246` uses CIA. | Evidence the documented empty/error/offline/success states and rename visible coach copy. | State sentinels pass; copy gate passes. | T-I / open |

**Acceptable as-is:** focal avatar/identity hierarchy; native avatar/search/settings/quick-link rows; 44px geometry; coherent XP/Life Power numbers; selective hero glass with dense data later on solid surfaces; no hard clipping or required image slot.

### 18 — Block

| Severity · class | Authority | Exact evidence / affected | Proposed fix | Acceptance | Owner / status |
|---|---|---|---|---|---|
| **High · local** | RW-R0-09 | `S18:68-72,87` passes `bg-*`/`text-*` classes to SVG strokes and a dot; D1/18 shows an undifferentiated ring/missing purple bullet. | Use valid `stroke-*` and dot background tokens. | Every segment and legend key paints with a matching semantic color. | T-I / open |
| **High · local** | RW-R0-12 | `S18:67-73` has 5 segments totaling 100%; `S18:76-95` has 4 legend rows totaling 108%, despite “5 synced.” | Bind chart and legend to one reconciled dataset. | Segment count, legend count, labels and percentages agree and total 100%. | T-I + T-UX / open |
| **High · local** | RW-R0-18 | Spec requires `ConstellationRadar`; `S18:62-98` substitutes `DonutHub`, eliminating radar low-confidence/null states. | Implement the named radar or obtain an explicit spec disposition. | Default, partial/ghost and honest-null radar states match approved authority. | SOL + T-I / open |
| **High · local/systemic** | A24-004 · RW-028 | `S18:174-201` uses opacity/Lock Pro tiles instead of `PaywallLock`. | Adopt canonical real-preview gating. | Locked modules are not dead ends and route with trigger context. | T-I / open |
| **High · local/systemic** | RW-R0-03 · A24-010/RW-037 | `S18:206` has 5/8 consent controls; suggested `GlassCard`s at `39-56` look navigable but are not buttons. | Complete rail; make ModuleCards real controls. | Consent and suggested modules are keyboard/screen-reader operable with visible focus. | T-I / open |
| **Medium · local** | RW-R0-15 · RW-R0-10 | `S18:31-58` collapses suggestion provenance into one plain span; `104-167` gives 0% and active modules identical orange glow. | Put provenance/state on each suggestion and reserve glow for real meaning. | Real/low/null suggestion states distinguish source and confidence; 0% tiles do not imply active effort. | T-UX + T-I / open |
| **Low · local** | RW-VF-08 | `S18:19-29` shows a clear X with no query; required filtering/count announcements are not evidenced. | Hide Clear until a value exists and verify search states. | Search result counts announce; clear restores catalog and is absent for empty query. | T-I / open |

**Acceptable as-is:** clear discovery hierarchy, 48px search entry, text+icon lock cue, restrained above-fold density, natural scroll, and purple limited to recommendation/Cia semantics.

### 21 — Block

| Severity · class | Authority | Exact evidence / affected | Proposed fix | Acceptance | Owner / status |
|---|---|---|---|---|---|
| **High · local** | RW-R0-18 | `S21` has no Toggle, Face ID, notification or background-sync row despite spec Components/States/Motion requirements. | Build or explicitly disposition the missing settings modules. | Supported rows expose real values and native toggles; unsupported hardware is handled as specified. | SOL + T-I / open |
| **High · local/systemic** | RW-R0-03 | `S21:145` renders Source/Retention/Export/Revoke/Delete through non-interactive `Provenance`. | Replace action labels with full consent controls. | Export/revoke/delete are focusable, labelled and reversible; 8/8 dimensions are covered. | T-I + T-UX / open |
| **High · systemic manifestation** | RW-R0-01 · RW-VF-07 | `SYS:4-17`, used at `S21:156`, promises call/text/local support and offline availability but has no button/link. | Make crisis actions reachable and verify or qualify offline capability. | One-tap call/text/local entry works; offline claim has implementation evidence. | T-I + T-UX / open |
| **Medium · local** | RW-R0-15 · RW-VF-08 | `S21:65-91` shows coaching style, 4/10, and check-in times without onboarding/default provenance or low/null states. | Add source/status treatment and state variants. | Each configured preference has real provenance and honest null/error/offline behavior. | T-UX + T-I / open |
| **Medium · local/systemic** | A24-010 · RW-VF-05 | `TopBar` emits H1 “Settings” and `S21:13` emits a second H1; `S21:94` italicizes a full sentence; `ComplianceFooter` links are spans. | Keep one page H1, one-word serif emphasis, and real legal links. | Heading outline is singular; focus/link semantics pass; typography follows role scale. | T-I / open |

**Acceptable as-is:** quiet solid list groups, ≥44px native rows, understandable current values, dark theme correctly treated as display-only “Coming soon,” and no destructive-action pressure.

### 22 — Block

| Severity · class | Authority | Exact evidence / affected | Proposed fix | Acceptance | Owner / status |
|---|---|---|---|---|---|
| **High · local/systemic** | RW-R0-03 | `S22:66-74` renders Source/Scope/Freshness/Retention/Export/Revoke/Delete as default non-interactive Chips. | Use per-provider action controls/sheets. | All seven visible verbs work with keyboard/touch; complete 8-part consent model is available. | T-I + T-UX / open |
| **High · local** | RW-R0-13 | `S22:53-79` shows WHOOP Connected + 2m ago + “Auto-retrying”; Fitbit at `108-123` says Sync pending without retry context. | Move retry status to the pending provider and model status atomically. | No provider is simultaneously presented as synced and retrying; status is announced. | T-UX + T-I / open |
| **High · local** | RW-R0-16 | `S22:224-227` exposes “Route: /calendar/connected” as button copy. | Replace implementation text with a user action and wire the route invisibly. | No internal path is visible; CTA name predicts the result. | T-UX + T-I / open |
| **High · local** | A24-010 · RW-018 | Baseline warns `Force sync` 90×36 (`S22:61-64`); route action is also `h-9`. `S22:141-143` only looks disabled—no `disabled`/`aria-disabled`. | Decouple 44px hit areas and use true disabled semantics/reason. | Strict scan has no S22 target warning; disabled action cannot activate and is announced. | T-I / open |
| **Medium · local** | RW-R0-18 · A24-004/RW-028 | Spec declares 11 cards; `S22` builds 9. Existing S22 PaywallLock adoption has no selected-state evidence. | Add/disposition the three wearable gaps and canonical gated state. | Counts, rendered cards and entitlement state agree. | SOL + T-I / open |
| **Medium · local/systemic** | RW-VF-04 · A24-010 | Five services reuse generic Info (`S22:155-243`); top-right Plus is named “Info” (`S22:12`). | Use approved provider-neutral/source-specific symbols and correct accessible name. | Visual and spoken meaning agree; registry classification passes. | SOL + T-I / art blocked |
| **Medium · local/systemic** | RW-VF-01 · RW-VF-02 · RW-VF-08 | Unspecified Save preferences uses shared failing CTA (`S22:283-285`); `animate-spin` retry at `77` is not covered by the reduced-motion selector. | Remove the page Save if actions are immediate, or specify its transaction; provide static reduced-motion progress. | One save model only; CTA passes AA/state contract; reduce-motion has no indefinite spin. | T-I + T-UX / open |

**Acceptable as-is:** clear source grouping, honest “Syncing” versus “Will sync” copy where placed correctly, WHOOP provenance/freshness, 44px Connect with high-contrast ink-on-orange, provider-level and global export/delete intent, and expected long-scroll behavior.

### 23 — Block

| Severity · class | Authority | Exact evidence / affected | Proposed fix | Acceptance | Owner / status |
|---|---|---|---|---|---|
| **High · local** | RW-R0-06 | `S23:63` passes `filled={80}` to a 10-tick meter; `DT:115-121` treats it as tick count, so 80% renders 100%. Label announces renewal date, not usage. | Pass 8 ticks or change contract to percent; provide correct metric label. | Exactly 8/10 ticks fill; AT announces “800 of 1,000 used” and renewal separately. | T-I / open |
| **High · local** | A24-010 · RW-018 | Baseline warns Update 63×36 and Buy credits/Credits ledger 36×36 (`S23:32-37,75-88`). | Expand transparent hit areas to ≥44px. | Strict scan has zero S23 target warning with unchanged visual footprint. | T-I / open |
| **High · local** | S-03 · RW-037 | Non-current plan “View” at `S23:112` is a default Chip/span; plan card is not a control. | Make each plan action a labelled button/route. | Every plan can be focused, compared and selected; Current is announced as state. | T-I / open |
| **Medium · local** | RW-R0-15 | `S23:44-54,69-73` shows plan/price/renewal/credits without subscription/credits provenance; only usage has a chip. | Add sources and stale/null variants. | Money and entitlement values identify source/freshness and never fabricate availability. | T-UX + T-I / open |
| **Medium · local** | A24-010 · RW-R0-07 | Compare grid `S23:123-155` is non-semantic divs with unlabeled Plus/Minus glyphs, contrary to “glyph plus text.” | Use a semantic table/grid with Included/Not included text. | Row/column headers and every entitlement state are announced without color/icon inference. | T-I / open |
| **Medium · local/systemic** | RW-R0-03 · RW-VF-04 | `S23:232` uses 5/8 rail; `S23:26` uses success-coded ShieldCheck for payment failure. | Complete consent rail and use a warning-appropriate icon/non-color cue. | Controls are complete; failure is unambiguous visually and audibly. | T-I + T-UX / open |
| **Medium · systemic manifestation** | RW-VF-08 · A24-008/RW-011 | Offline/grace/final-day/success states are not evidenced; visible CIA remains. | Capture each billing state and rename visible coach copy. | State matrix and naming gate pass. | T-I + IND / open |

**Acceptable as-is:** focal plan/price match the rail; ink-on-orange Update contrast passes; current tier is explicit; downgrade/cancel remain reachable without confirmshaming; hero glass and dense solid sections follow hierarchy; cancellation target is 44px.

### 24 — Block

| Severity · class | Authority | Exact evidence / affected | Proposed fix | Acceptance | Owner / status |
|---|---|---|---|---|---|
| **High · local/shared** | RW-R0-05 | D1/24 visibly prints `ACTIVITY <SPAN CLASSNAME=...>` because `S24:33` passes markup as a string to `CH:68-73`. | Pass React content or a safe emphasis API. | Visible/accessibility text is “Activity history” with one italic word and no markup. | T-I / open |
| **High · local** | RW-R0-14 | `S24` has no notification-controls/consent entry despite WHOOP and logged data; overflow glyphs are nested in row buttons. | Add the canonical controls sheet and independent overflow action. | Category/source/scope/freshness/retention/export/revoke/delete are reachable; row and overflow have distinct names/actions. | T-I + T-UX / open |
| **High · local** | A24-010 · RW-R0-07 | Summary Chips `S24:40-45` are spans although specified as filters; MoreHorizontal icons at `63,78,93,114,129` are not independent controls. | Make filters and overflow native controls with pressed/menu state. | Keyboard/focus/AT operation passes; counts update/announce when filtered. | T-I / open |
| **High · local** | RW-R0-12 · RW-R0-13 | `Check-ins 0` at `S24:43` violates spec's omit-zero rule. Chart data `[2,5,3,8,4,6,3]` implies 31 events while type chips total 6, with no scope distinction. | Omit zero chip and reconcile or label count scopes. | Chart period, totals and category counts have one explainable dataset/scope. | T-UX + T-I / open |
| **High · local** | RW-R0-09 · RW-R0-10 | `S24:87` uses undefined `domain-social`; `S24:57` labels sleep with fitness token. | Use defined semantic domain tokens. | Brand gate rejects undefined utilities; sleep/social labels match approved taxonomy. | T-I + T-UX / open |
| **Medium · local** | RW-R0-11 | Dense history rows at `S24:52-131` use GlassCard throughout. | Use solid history/list surfaces; reserve glass for focal/overlay. | Dense ledger scans clearly with one controlled focal tier. | T-I / open |
| **Medium · local** | RW-R0-15 · A24-010 | TrendChart at `S24:36` lacks Notifications API provenance and falls back to aria-label “Trend chart.” | Add source/freshness and descriptive label. | AT hears “Notification frequency over the last 7 days”; real/low/null chart states identify source. | T-I + T-UX / open |
| **Medium · systemic manifestation** | RW-VF-08 · A24-008/RW-011 | Mark-all-read undo/empty/offline states and default draw motion are not evidenced; visible CIA remains. | Verify the state/motion matrix and naming. | Undo, disabled-zero, empty, offline and reduced-motion sentinels pass. | T-I + IND / open |

**Acceptable as-is:** Mark all read and row targets meet 44px; unread state has dot plus card treatment; date grouping and sticky hierarchy are legible; no hard clipping; static chart is safe in the reduced-motion capture; purple is used for Cia content.

### 25 — Block

| Severity · class | Authority | Exact evidence / affected | Proposed fix | Acceptance | Owner / status |
|---|---|---|---|---|---|
| **High · local/systemic** | A24-010 · RW-R0-07 | `S25:26-29` uses presentation-only `GlassPillInput` for search; `BT:79-91` is a div/span, not an input. | Use a labelled search input/overlay with clear/results semantics. | Keyboard entry, clear, result-count announcement, empty/error/offline states pass. | T-I / open |
| **High · local** | RW-R0-14 | `S25:41-54` promises consent-gated Cia handoff but exposes only Source/Scope; no retention/export/revoke/delete. | Put explicit handoff consent and complete controls before transfer. | Shared context is opt-in, scoped, reversible, and accurately disclosed. | T-UX + T-I / open |
| **High · systemic manifestation** | RW-VF-01 · RW-VF-02 | Ask CIA at `S25:45-50` uses white-on-orange shared CTA (~3.06:1) and lacks complete focus/pressed/loading states. | Apply CTA token/state contract. | AA contrast and full interaction/reduced-motion states pass. | SOL + T-I / filed-open |
| **Medium · local** | RW-R0-10 | FAQ “Open” chips at `S25:67-84` use you/Cia/done tones decoratively across unrelated topics. | Use one neutral navigation affordance; reserve semantic tones for real state. | Color never implies effort/completion/AI where none exists. | T-UX + T-I / open |
| **Medium · local** | RW-R0-13 | `S25:99` says “Status: open” in a default no-ticket context; could imply a fabricated ticket. | Name the support channel state or show honest-null “No ticket.” | User can distinguish channel availability from ticket status. | T-UX / open |
| **Medium · local/systemic** | A24-010 · RW-VF-05 | TopBar and `S25:21` create two H1s; ComplianceFooter links are spans; purple 11px Ask Cia eyebrow and white/45 overlines need token review. | Keep one H1, real legal links, semantic AA type tokens. | Outline/link/focus/contrast and text zoom pass. | T-I / open |
| **Medium · systemic manifestation** | RW-VF-04 · RW-VF-08 · A24-008/RW-011 | Cia uses generic Sparkles/MessageCircle; article/contact/handoff state matrix is absent; visible CIA remains. | Apply icon registry once approved, evidence states, rename visible copy. | Registry, state sentinels and copy gate pass. | SOL + T-I / art blocked |

**Acceptable as-is:** FAQ/category and Contact are native ≥44px buttons; article grouping is clear; Source/Scope and “No current SLA” are positive disclosure; one dominant help action; no clipping or image dependency.

### 50 — Block

| Severity · class | Authority | Exact evidence / affected | Proposed fix | Acceptance | Owner / status |
|---|---|---|---|---|---|
| **High · local/systemic** | A24-010 · RW-R0-07 | First/last/phone use `GlassPillInput` (`S50:104-105,131`); About is a div (`106-111`). None can receive value, label, focus, validation or autofill. | Replace with labelled native text/tel/textarea controls. | Keyboard, screen reader, autofill, validation, 160-char hint and dirty state pass. | T-I / open |
| **High · local** | RW-R0-14 · A24-007 | Spec requires a first-use photo `ConsentCard`; avatar button `S50:73-81` opens no evidenced consent state. Broader data controls are absent. | Gate first photo access with equal accept/decline and revoke/delete path. | No photo picker precedes explicit consent; later revoke/delete is reachable. | T-UX + T-I / open |
| **High · local** | RW-R0-13 · RW-VF-08 | `S50:65-66` says Save is disabled because two fields remain, while spec says disable only until a valid dirty change. This pressures completion and misstates the transaction. | Gate on valid dirty state; treat optional completeness separately. | A valid partial edit can save; unchanged form is disabled for the correct announced reason. | T-UX + T-I / open |
| **High · systemic manifestation** | A24-002 · RW-014 · RW-015 | Back and nav are non-semantic; leaving an edit via nav has no evidenced unsaved-change state. | Apply native chrome and dirty-exit confirmation/discard pattern. | Back/tab navigation is operable and cannot silently lose edits. | T-I / open |
| **Medium · local** | RW-R0-15 · A24-010 | Completeness card `S50:86-99` omits required “you logged” provenance and update/live semantics; ProgressBar itself has no role/value. | Add provenance and accessible progress status. | “6 of 8, 75%, two remaining” is announced once and updates on edits. | T-I + T-UX / open |
| **Medium · local** | A24-016 · RW-034 | Spec tracks `HIFI-50-01`; current frame is only honest-null avatar geometry. | Produce or explicitly waive the privacy-safe asset slot. | Asset verifier and provenance/privacy checklist pass, or founder waiver names HIFI-50-01. | AST + SOL / open |
| **Medium · systemic manifestation** | RW-VF-01 · RW-VF-02 · RW-VF-08 · A24-008/RW-011 | Disabled CTA is narrow; microcopy uses white/45; focus/error/offline/success/delete-confirm states and Cia rename remain unevidenced. | Apply shared tokens/states and capture all form variants. | AA/type/CTA/state/copy gates pass; quiet-pulse remains stopped under reduced motion. | T-I + IND / open |

**Acceptable as-is:** `6 of 8` equals 75% and matches avatar/about nulls; avatar, copy-email, demographic and delete controls are native with good target sizes; verified email is read-only; destructive color is reserved; natural scroll reaches all fields; `quiet-pulse` is covered by reduced-motion CSS.

## Release blockers

1. A24-002/RW-014/015 shared Back and bottom-nav semantics across the family.
2. S18 broken and contradictory chart plus missing specified radar.
3. S21 inert privacy/safety modules and missing core settings controls.
4. S22 inert provider consent, contradictory sync state, internal-route copy and target failures.
5. S23 80%-as-100% billing meter and incorrect accessible metric name.
6. S24 visible markup, missing notification controls, non-operable filters and data/token contradictions.
7. S25 non-input search, incomplete Cia handoff consent, and failing active CTA contrast.
8. S50 non-editable form primitives, absent photo consent, and dishonest Save gating.
9. RW-VF-01/02 shared contrast/focus/state contract and RW-VF-08 state evidence remain open. No waiver covers these blockers.

## Rubric and provenance limits

- All 19 embedded lenses were applied: aria/semantics, focus, contrast, tokens, responsive/clipping, motion, forms, navigation, spacing/density, states, microcopy, elevation/glass, icons/SVG, privacy/data honesty, ethics/dark patterns, Nielsen heuristics, hierarchy, CTA consistency, and implementation readiness.
- This was static code/spec/capture inspection only—no browser, Figma, network, live keyboard, screen reader, gesture, scroll, or animation execution. Runtime claims remain acceptance work.
- The local strict baseline was captured 2026-07-09 with config hash `e2fd6cba632724f3`, four concurrent contexts, `reducedMotion: reduce`, and `gitSha: null`; RW-VF-06 therefore prevents final pixel-diff/determinism claims.
- Contrast statements are token-level calculations; final composites require pixel checks. Legal/privacy observations assess interface signals, not legal compliance.
- Screen 24's warm-light Figma-language note conflicts with current dark canon; A24-009/RW-008 remains the authority-resolution path. No live Figma evidence was used.
- Images 1 and 2 were unavailable. RW-VF-02/RW-VF-04 final art direction cannot close, though semantic, accessibility and state remediation can proceed.
- Existing A24/RW/RW-R0/RW-VF authority is preserved. This report files no durable ID, closes nothing, and grants no waiver.
