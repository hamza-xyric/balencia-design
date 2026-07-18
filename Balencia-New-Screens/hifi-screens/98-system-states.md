# 98-system-states - A+++ hi-fi mobile spec

## Header
- **Source ID:** 98
- **Source spec:** `Balencia-New-Screens/screens/98-system-states.md`
- **Evidence:** screens/98-system-states.md, Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Route(s):** `/offline`, `/maintenance`, `/forbidden`, `/unauthorized`, `/coming-soon`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: System states define the reusable full-page utility treatment for offline, maintenance, forbidden, unauthorized, and coming-soon routes.
- **Premium Visual Director:** make System states hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** System states uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| Balencia                     support |
+--------------------------------------+
| +----------------------------------+ |
| | Offline                         | |
| | You're offline. Showing last    | |
| | sync from 2 hours ago.          | |
| | provenance: cached dashboard    | |
| | [Retry connection] [View cache] | |
| +----------------------------------+ |
|                                      |
| Last safe snapshot                   |
| +----------------------------------+ |
| | Today actions cached at 8:42 AM | |
| | Health data may be stale        | |
| +----------------------------------+ |
|                                      |
| Route variants                       |
| /maintenance: status window          |
| /forbidden: permission needed        |
| /unauthorized: sign in required      |
| /coming-soon: feature not released   |
|                                      |
| Contact support | privacy            |
+--------------------------------------+

Route handling: `/offline`, `/maintenance`, `/forbidden`, `/unauthorized`, `/coming-soon`
```

## Focal Hierarchy
- **Dominant focal moment:** System states hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Cached data panel for offline and forbidden-safe contexts. with CIA only when the source supports a synthesized read.
- **Operational layer:** Footer with support, privacy, and no fabricated service claims., ASCII wireframe :, Offline, Maintenance.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*states*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - minimal brand/title and support/status action.
- **GlassCard** - state hero with route-specific icon and message.
- **OfflineBanner / SyncStatus** - stale-data label for offline and cached states.
- **ErrorState** - quiet failure treatment with recovery actions.
- **SolidCard** - cached data, status detail, support information.
- **BtnPrimary / BtnSecondary / BtnGhost** - retry, sign in, home, status, support.
- **ChipProvenance** - route, cache age, status source, and confidence labels.
- **SafetyResourceCard** - only when a blocked wellbeing flow needs crisis or urgent support link.
- **SkeletonState / HonestNullState** - only for cached panels that still load.

## Data Honesty
- **Route state:** real = exact route and reason; low-confidence = unknown router error with fallback copy; honest-null = no reason, show plain safe message.
- **Cache age:** real = timestamp plus ChipProvenance; low-confidence = local clock uncertain; honest-null = no cache shown.
- **Maintenance window:** real = published window/source; low-confidence = status endpoint delayed; honest-null = no ETA promised.
- **Permission reason:** real = role, plan, or auth state; low-confidence = policy service stale; honest-null = do not guess.
- **CIA status:** real = service status if relevant; low-confidence = service check delayed; honest-null = no AI claim on non-AI route.

## Consent and Safety
- System states uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/offline`, `/maintenance`, `/forbidden`, `/unauthorized`, `/coming-soon`. Do not add alternate vanity routes.

## States
- **Default:** route-specific hero, explanation, recovery action, support/footer, and any safe cached panel.
- **Skeleton:** only cached/status panels shimmer; hero copy is immediate and readable.
- **Empty:** HonestNullState for no cache or no ETA with clear next action.
- **Error:** fallback keeps route title, support, and home/sign-in action visible.
- **Success:** retry reconnects and returns to last safe route with `--glow-done` confirmation.
- **Disabled:** actions dim to 40% with reason when offline, forbidden, maintenance-locked, or auth-locked.

## Motion
- **Load:** hero appears immediately; cached panels fade in after state probe.
- **Retry:** button shows spinner then success/error text; no infinite loading.
- **Return:** last safe route transition is a normal stack replace, not a modal surprise.
- **Status:** external status/support links open only after user action.
- **Reduced-motion:** disables fade and spinner flourish; text state changes remain.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/offline`, `/maintenance`, `/forbidden`, `/unauthorized`, `/coming-soon`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** utility hero and details clear AA+ on dark surfaces.; **Targets:** retry, sign-in, home, support, and status actions are 44px minimum.; **Screen readers:** page announces state, route, reason, stale-data age, and primary recovery action.
