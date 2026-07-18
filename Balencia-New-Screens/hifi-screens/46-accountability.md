# 46-accountability - A+++ hi-fi mobile spec

## Header
- **Source ID:** 46
- **Source spec:** `Balencia-New-Screens/screens/46-accountability.md`
- **Evidence:** screens/46-accountability.md, app_design 3/46-accountability.md and ascii_wireframes/46-accountability.md.
- **Route(s):** no live route; legacy accountability management surface.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Accountability manages opt-in partners, contracts, triggers, commitment rules, nudges, and audit trails.
- **Premium Visual Director:** make Accountability command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Accountability uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <        Accountability              |
| Consent: configure what partners see |
| [Partners] [Contracts] [Triggers]    |
| PARTNERS                             |
| Sarah K coach: motivation, failure   |
| Ahmed M buddy: motivation, failure   |
| Lisa mentor: emergency contact       |
| + add partner                        |
| CONTRACTS                            |
| Run 3x/week [############----] 80%   |
| 8 kept, 2 open, CIA nudge ready      |
| TRIGGERS: missed check-in -> nudge   |
| Today | CIA | Goals | Me             |
+--------------------------------------+

Route handling: no live route; legacy accountability management surface.
```

## Focal Hierarchy
- **Dominant focal moment:** Accountability command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with "Accountability." with CIA only when the source supports a synthesized read.
- **Operational layer:** Master consent banner when permissions are incomplete., SegmentedTabs, Partners tab, Contracts tab.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*accountability*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - title and back.
- **ConsentCard** - master privacy gateway.
- **SegmentedTabs** - Partners, Contracts, Triggers.
- **ListRow** - partners, groups, emergency contacts, trigger audit.
- **ProgressBar / MomentumBar** - contract fulfillment.
- **Toggle** - CIA intervene per trigger.
- **ChipProvenance** - partner permission, trigger source, audit event.
- **CIAInsightCard** - suggested contracts and nudge review.
- **SafetyResourceCard** - emergency contact and crisis rules.
- **PaywallLock** - Plus social feature gate where needed.

## Data Honesty
- **Partners:** real = accepted partner and permissions; low-confidence = invite pending; honest-null = no partners.
- **Contracts:** real = signed terms and progress; low-confidence = sync delayed; honest-null = no contract card.
- **Triggers:** real = active rule and audit trail; low-confidence = queued event; honest-null = no rules.
- **CIA nudges:** real = consented intervention; low-confidence = draft nudge; honest-null = no CIA intervention.
- **Controls:** social partners, contracts, emergency contacts, health evidence, CIA intervention, and third-party data expose consent/revoke/delete.

## Consent and Safety
- Accountability uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** consent, tabs, partner rows, contracts, triggers, and nav render.
- **Skeleton:** consent banner, tabs, rows, and contract bars shimmer.
- **Empty:** consent remains; no partners/contracts/triggers show starter actions.
- **Error:** cached rows remain and failed source is named.
- **Success:** added partner, signed contract, or trigger creation flashes green.
- **Disabled:** social features dim behind PaywallLock, missing consent, or offline state.

## Motion
- **Load:** consent banner appears first, tabs then rows.
- **Tabs:** SegmentedTabs slide without layout jump.
- **Contract:** bar fills to fulfillment and opens detail on tap.
- **Trigger:** toggle asks for consent before enabling partner notification.
- **Nudge:** CIA nudge preview opens before escalation.
- **Reduced-motion:** disables bar fill, tab slide, and row stagger.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: no live route; legacy accountability management surface..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.; **Targets:** tabs, rows, toggles, CTAs, consent, and emergency controls are 44px minimum.; **Screen readers:** partner rows announce role, permissions, emergency status, and revoke path.
