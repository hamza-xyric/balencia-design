# 18-explore-section - A+++ hi-fi mobile spec

## Header
- **Source ID:** 18
- **Source spec:** `Balencia-New-Screens/screens/18-explore-section.md`
- **Evidence:** screens/18-explore-section.md, work/briefs/18.md, work/drafts/18.md, Functional Content Brief: Explore Section
- **Route(s):** No live route; stack-pushed Explore catalog opened from Me Main [17].
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Explore is Balencia's feature discovery catalog.
- **Premium Visual Director:** make explore-section hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** explore-section uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|   explore                           |
| + search modules...              x + |
| +----------------------------------+ |
| suggested for you                    |
| +------------+ +------------+        |
| | Journal    | | Sleep      |        |
| | start here | | suggested  |        |
| +------------+ +------------+        |
| Your active domains                  |
|        small constellation radar      |
| Fitness and movement                 |
| +------------+ +------------+        |
| | Workouts   | | Yoga       |        |
| +------------+ +------------+        |
| Wellbeing                            |
| +------------+ +------------+        |
| | Journal    | | Habits     |        |
| +------------+ +------------+        |
| more features                        |
+--------------------------------------+

Route handling: No live route; stack-pushed Explore catalog opened from Me Main [17].
```

## Focal Hierarchy
- **Dominant focal moment:** explore-section hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Search bar, Suggested rail, Active domains hero, Domain sections.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*section*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** with 44px back target.
- **SearchInput** with clear button and screen-reader label.
- **ModuleCard** (NEW) for feature/domain entries with route, status badge, and optional lock.
- **ConstellationRadar** mini variant for active-domain recap.
- **ChipDomainTag** for domain labels.
- **PaywallLock** for Plus/Pro modules.
- **CIAInsightCard** style only for recommendation rationale, not for every card.
- **SkeletonState, ErrorState, OfflineBanner, HonestNullState, ChipProvenance** for data states.

## Data Honesty
- **Suggested modules:** real = module array with ChipProvenance "via recent activity"; low-confidence = muted suggestions with "early read  low confidence"; honest-null = static popular cards.
- **Domain stats:** real = 0-99 stat, level, and XP progress; low-confidence = dashed progress while sync is partial; honest-null = plain module card with no stat preview.
- **Active domains radar:** real = at least five synced domains; low-confidence = ghosted vertices for partial domains; honest-null = radar omitted.
- **Subscription lock:** real = entitlement from user plan; low-confidence not applicable; honest-null = no badge for included features.
- **Search results:** real = filtered local catalog; low-confidence = server-backed result row marked "may be outdated"; honest-null = no-results block.

## Consent and Safety
- explore-section uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** search, suggestions, active-domain hero when eligible, domain sections, and more features.
- **Skeleton:** search, rail cards, radar axes, and module cards shimmer in final geometry.
- **Empty:** no search results block replaces all sections.
- **Error:** catalog remains navigable; failed suggestions fall back to Popular with Balencia.
- **Success:** pull-to-refresh updates suggestions with a short "Suggestions refreshed" toast.
- **Disabled:** locked modules render at 40% opacity with lock glyph and tier word.
- **Offline:** cached catalog remains; server-backed suggestions and community modules show stale labels.

## Motion
- Tap module to navigate. Tap search to filter. Clear button resets. Edge swipe pops stack.
- Radar draws when present; domain sections fade in by group; search filtering crossfades cards.
- Locked module tap opens Paywall [43] with trigger context.
- **Reduced-motion path:** no radar draw or stagger; sections render static and search changes instantly.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; stack-pushed Explore catalog opened from Me Main [17]..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: Back, search clear, module cards, and lock affordances meet 44px targets.; Lock state is text plus icon, never color alone.; Search results announce count changes.
