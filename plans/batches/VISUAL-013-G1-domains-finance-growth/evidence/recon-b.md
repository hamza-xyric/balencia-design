# G1 recon B — career, relationships, spirituality

Read-only Luna evidence for screens `32,33,34`. Inspected the G1 batch contract and matrix, the active G1 audit, current hi-fi specs and product components, compact canon/catalog, RPG authority, the current ten-domain/Life Power consumers, shared kit consumers, and current build/remediation ledgers. No product, git, browser, server, Figma, or external state was mutated.

## Authority reconciliation

- Operational ten-domain truth is already concrete in live shared code and agrees with `RPG_SYSTEM_DESIGN.md`: `Fitness, Sleep, Career, Nutrition, Finance, Faith, Productivity, Relationships, Wellbeing, Meditation`, each `0–99`. `kit/data.tsx` exports this exact `LIFE_DOMAIN_ORDER`, rejects incomplete/out-of-order payloads, and supplies the same ten-domain payload to `LifePowerRadar`; S16 also renders these ten names and explicitly labels `10/10` reporting.
- Current visual canon still lists nine display-tag colors, including `Spirituality`, `Learning`, and `Creativity`, while RPG authority names `Faith` as a starting stat and treats Learning/Creativity as future extensions. Existing live consumers already establish the safe alias direction: `domain-faith` is the token, while S06 presents that domain to members as `Spirituality`. G1 should preserve **Spirituality as display label / Faith as RPG registry identity** and must not add an eleventh stat or alter Life Power math.
- `globals.css` defines `domain-career`, `domain-relationships`, and `domain-faith`; it does **not** define `domain-people`. Therefore the G1 audit's S33 token finding is live, not stale.
- Shared safety and consent roots have advanced since the 2026-07-10 audit. `ConsentRail` now provides real 44px links and can render the full category/source/scope/freshness/confidence/retention/export/revoke/delete set. `SafetyCard` now links to local Help Center crisis guidance and truthfully says the prototype does not place calls/texts. The old claim that these shared controls are inert is stale, but screens must opt into the correct controls and the controls must remain reachable.
- All three active specs say `Image Slots: None required`; no raster/AI asset is justified. Code-native charts, rings, heatmaps, icons, and surfaces are the required disposition.

## Screen 32 — Career & Work

### Live findings

- **Truth/count:** `Today's Actions` says `2 Remaining` while the visible list contains one completed and one open action; the only defensible count is `1 remaining` unless another row is disclosed.
- **Skill math:** Communication `8/10` and System Design `6/10` correctly fill 80% and 60%, but both target markers are fixed at `right-[20%]` (target 8/10), contradicting the spec's explicit target of `10`. The target marker belongs at the 100% endpoint or should be derived from a named target payload.
- **Provenance:** Communication has `You Logged`; System Design has none. The `+14 pts` trajectory is correctly CIA-derived and the chart uses past orange/projected purple/milestones, but all populated metrics need exclusive real/low-confidence/null provenance.
- **RPG identity:** the header repeats `Lv 12` in eyebrow and chip. The spec draft says `Lvl 5`, while current cross-screen RPG consumers use character levels independently from domain stats. G1 must label a single value explicitly (for example `Character Lv 12`) rather than implying that Career itself is level 12. This is a source/product decision for Sol; do not silently revive spec `Lvl 5`.
- **Consent/privacy:** Goals API and CIA inference appear without a data-control rail. The spec requires category/source/scope/freshness/retention/export/revoke/delete. Use full controls or provide an equally complete local preview; no real external permission claim.
- **Lock pattern:** High Motivation is a hand-built blurred card with a `Premium` label and no action. It violates the catalog's never-hide/never-dead-end `PaywallLock` contract and should use the shared lock with a local prototype preview action.
- **Interaction:** both action rows and the CIA CTA visually invite action but have no handler/outcome. The secondary mission cards are static despite their card-like hierarchy. `FloatingQuickLog` is a real link, but the destination state must visibly provide a local-only outcome.
- **Component fidelity:** secondary missions use bars rather than the spec's compact rings. This can be an explicit density disposition, but it cannot remain an unexplained silent substitution.

### Deterministic fixtures/assertions

- Suggested states: `default`, `low-confidence`, `empty`, `error`, `offline`, `success`, `disabled`, `data-controls`, `premium-preview`, `log-action`.
- Default assertions: one explicit level label; `1 remaining`; two skill values exactly `8/10` and `6/10`; fills `80%/60%`; both named targets `10`; provenance on both skills; trajectory `+14 pts` with CIA-derived source; chart exposes six historical, two projected values and milestones through an AT summary; full data controls reachable.
- Interaction assertions: open action completes locally, count becomes `0 remaining`, row gains checked/struck state and a `+15 XP · Career` status; retry repairs error locally; controls and paywall previews open opaque, labelled, focus-managed overlays or dedicated local routes; disabled action cannot mutate; Quick Log yields a visible local prototype outcome.
- Integrity assertions: no `domain-people`; no third-party/network capability use; no storage/cookie writes; no `100` domain score; no new Life Power calculation.

## Screen 33 — Relationships

### Live findings

- **Undefined token:** both the accent line and Family tag use `domain-people`, so the intended pink relationship identity is suppressed. Replace with `domain-relationships` (`#EC4899`).
- **0–99 score contract:** hero renders `84%`, but the RPG/stat contract and spec require `84 out of 99`. A percent implies a different denominator. The ring may normalize `84/99` for geometry, but visible and accessible copy must remain `84 out of 99`.
- **Honesty state collision:** hero simultaneously shows `CIA sync` and `Estimated`; these are mutually exclusive real and low-confidence states. Default needs one real provenance state; low-confidence must be a separate muted fixture with `estimated · low confidence`; null must use a dashed/empty ring and no number.
- **Reminder count:** `2 reminders` discloses one row. Either render two rows or report `1 reminder`; count must derive from the same collection.
- **Person rings:** `PersonRow` passes real percentages but also `ghost`, which suppresses every filled arc. That visually denotes missing data while status/value payloads claim real data. Real rows must render filled arcs (and accessible `x out of 99` labels); ghost is reserved for null.
- **Semantic color:** Sarah's rules-based `Reach out` status uses purple/CIA tone even though it is not identified as an AI result. Use member/domain color unless a CIA-derived provenance is explicitly attached.
- **Missing named behavior:** portfolio is only a dashed blank circle; person-row expansion/retargeting and the required cadence heatmap do not exist. Rows, Check in, View all, Skip, Do it, and insight actions are inert. These are live findings, not stale audit claims.
- **Privacy:** `ConsentRail` is present but defaults to only source/retention/export/revoke/delete. The active spec requires the complete control set and the CIA/contact/calendar claim needs scope, freshness, and confidence. Avoid implying actual contacts/calendar access; label bundled/local fixture provenance.
- **Cross-domain claim:** “boosts connection scores” is causal/productive language without window, confidence, or mechanism. Prefer a bounded suggestion such as “may support your Relationships stat” with explicit pattern provenance.

### Deterministic fixtures/assertions

- Suggested states: `default`, `low-confidence`, `empty`, `error`, `offline`, `person-expanded`, `log-success`, `suggestion-skipped`, `data-controls`, `log-quality-time`.
- Default assertions: exact relationship token classes; hero text/AT `84 out of 99` (not `%`); exactly one provenance mode; KPI set `4.5h / 5 sessions / 3 people` from one `You logged` payload; reminder meta equals rendered row count; all three non-null person rings have visible fills and descriptive labels.
- Interaction assertions: selecting Ahmed retargets the hero and reveals a labelled cadence heatmap/text alternative; View all has a local outcome; Skip visibly dismisses/dims and announces status; Do it and Check in yield local outcomes; log flow selects a person/activity and updates the visible list without network/storage; offline disables mutation and explains why.
- Null/low-confidence assertions: null has no fabricated hero/KPI values and uses ghost graphics; low-confidence has only `estimated · low confidence`; error retains only explicitly cached KPIs; no purple on non-CIA Reach out.

## Screen 34 — Spirituality / RPG Faith

### Live findings

- **Faith alias:** use display copy `Spirituality`, but bind domain/RPG semantics to `Faith` / `domain-faith`. Do not add Spirituality to `LIFE_DOMAIN_ORDER`, and do not display a second independent Faith/Spirituality stat.
- **Completion arithmetic:** header claims `3 / 5`, while only Dhuhr is visibly complete. Default must either show three completed practices or derive `1 / 5`. This is the audit's clearest live numeric contradiction.
- **History contradiction:** populated `HeatGrid [1,2,0,1,3,2,0]` conflicts with “Your practice history begins today.” Cold start requires a blank grid/honest null; populated default requires a truthful period/source caption.
- **Prayer/location truth:** Fajr `5:12 AM` claims `Prayer API` but has no location/consent state. Default should be an explicitly bundled demo fixture or user-configured location result; null should show “Time not set” with an operable local enable-location preview; API failure must not fabricate a replacement time.
- **Invisible control:** TopBar `Data sources` is an empty button. It has an accessible name and 44px geometry but no visible glyph/text and no handler, so it is functionally and visually absent.
- **Inert/small affordances:** Read more has no local outcome and lacks a 44px target; reflection, ritual timers, practice rows, mission CTA, and data source affordances have no outcome. Practice rows must expose checkbox/toggle state (`aria-pressed`/native checkbox), not only glyph changes.
- **Provenance quality:** one run-on chip (`Prayer API · Source · Scope ...`) is not per-field provenance. `ConsentRail compact` omits category/scope/freshness/confidence by default. Use separate chips/controls and a complete rail.
- **Unspecified gamification:** `Today's mission` adds a strong primary CTA not present in the focal composition and competes with calm practice. It should be removed unless Sol finds current source authority; if retained, label the source and avoid reward pressure.
- **Safety:** current `SafetyCard` is now operable and truthfully local, so the audit's inert-safety claim is stale. It remains appropriate and must stay reachable without gamification. Spiritual coaching must not imply medical outcomes; “improved your overall calm” needs a bounded logged-data window/confidence or non-causal wording.
- **Level conflict:** header says `Lv 12`, spec composition says `Lv.3`; neither is sourced as Faith stat versus character level. Sol must select/label one canonical character value or omit it. Do not treat level as the 0–99 Faith stat.

### Deterministic fixtures/assertions

- Suggested states: `default`, `low-confidence`, `empty`, `prayer-api-error`, `offline`, `practice-success`, `disabled`, `data-controls`, `read-more`, `location-consent`, `reflection`, `contemplation-timer`, `breathing-timer`, `log-practice`.
- Default assertions: visible display label `Spirituality` plus an internal/accessible Faith mapping; a single explicitly labelled RPG/character level if retained; completion numerator equals checked rows; populated heatmap has non-null history/source copy; prayer time has exclusive real provenance; complete per-field controls; SafetyCard link reachable.
- Interaction assertions: toggling an unchecked practice changes checked count exactly once and announces state; repeat toggle retracts it without reward spectacle; Data sources, Read more, location preview, reflection, and both timer buttons open distinct local outcomes; offline/disabled states prevent mutation; keyboard focus returns to opener after overlays close.
- Safety/privacy assertions: no geolocation/call/text/network capability is invoked; no claim of real Prayer API access without consent; local-only language is visible; no storage/cookies; crisis/help entry remains outside XP/mission treatment.

## 390×844 and actual 125% risks

- All three are long, module-dense scroll surfaces. Default screenshots alone will hide later truth/privacy modules; state captures should scroll to representative bottom content while preserving unique visual evidence.
- S32's two-column secondary missions/upcoming tiles and skill provenance row are likely to wrap at actual 125%; keep intrinsic min-width zero, avoid side-by-side long labels, and test targets/markers without horizontal overflow.
- S33's hero plus KPI strip, three person rows, suggestion, and full consent rail make bottom density high. `84 out of 99`, reminder meta, and status chips are the likely wrap points; person-row labels/statuses need reflow rather than truncation.
- S34's five practice rows carry time/source/status, which can collide at 125%. Allow the source chip to wrap beneath the label or reduce simultaneous columns; never shrink body copy below token floor. Two-column reading/reflection and ritual cards should stack if 125% produces clipped prompts.
- For each screen require one **actual browser text-size 125%** proof, not image scaling, plus 390×844 screenshots for every frozen state. Assert no horizontal overflow, clipped text, overlapped FAB/nav, obscured bottom action, or target below 44px. Require reduced-motion proofs for animated ring/chart/heatmap/sheet paths.

## Suggested minimum assertion inventory

- Every fixture has a stable `data-state` marker and a visibly distinct, unique PNG; no state may pass by query-string-only changes.
- All action-looking controls have a deterministic local outcome, disabled explanation, or are rendered non-interactive. Verify focus visibility, order, dialog labelling/scrim isolation, Escape/close, and focus restoration.
- Assert zero console/page errors, capability calls, external requests, storage, and cookies. Assert source/API/accepted-through-F2 fingerprints unchanged.
- Static source checks: no `domain-people`; no `value="84%"` on S33; no simultaneous `CIA sync` + `Estimated`; no non-null `ProgressRing ... ghost`; no S32 `2 Remaining`; no S34 `3 / 5` unless three rows are checked; no populated heatmap paired with “begins today”; S32 uses shared `PaywallLock`; all three expose complete data controls where third-party/CIA data appears.

## Escalations to Sol

1. Freeze the registry policy as **ten starting RPG domains only**, with `Spirituality` a member-facing alias of `Faith`; Learning/Creativity stay non-Life-Power extension surfaces unless separately approved. This reconciles live code/RPG authority without editing shared registry files in G1.
2. Adjudicate the conflicting level values (`S32: Lv 12 vs spec Lvl 5`; `S34: Lv 12 vs spec Lv 3`) and require explicit character-level labelling or omission. They must not be inferred as domain stats.
3. Decide whether S34's unsourced `Today's mission` survives. Current evidence favors removal because it adds a competing gamified CTA to a calm, belief-adaptive surface.
4. Freeze S34 prayer-time provenance as bundled/local demo versus consented location preview; do not permit implied live Prayer API access.
5. Shared kit changes are unnecessary for the identified fixes: current `PaywallLock`, full-control `ConsentRail`, `SafetyCard`, rings, charts, and heat grid are sufficient. If builders discover a shared change is unavoidable, serialize it through Sol because accepted-through-F2 consumers are immutable.
