# 95-pods-hub - A+++ hi-fi mobile spec

## Header
- **Source ID:** 95
- **Source spec:** `Balencia-New-Screens/screens/95-pods-hub.md`
- **Evidence:** screens/95-pods-hub.md, Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Route(s):** `/groups`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Pods hub lets members browse, join, and manage Pods, Circles, Communities, and Partners from the live /groups route.
- **Premium Visual Director:** make Pods hub hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Pods hub exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <  Pods                       search |
+--------------------------------------+
| +----------------------------------+ |
| | Your groups                     | |
| | 2 pods | 1 invite | consent on  | |
| | via /groups membership          | |
| | [Manage discovery]              | |
| +----------------------------------+ |
| [Pods] [Circles] [Communities]      |
|                                      |
| +----------------------------------+ |
| | PodCard: morning runners        | |
| | 8 members | shared half plan    | |
| | Aisha, Omar +5                 | |
| | [Join pod] [Preview privacy]    | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Circle: focus builders          | |
| | private | partner invite only   | |
| | [Manage] [Report]               | |
| +----------------------------------+ |
| CIA: this pod matches your run plan |
| Buddy discovery: revoke anytime      |
+--------------------------------------+

Route handling: `/groups`
```

## Focal Hierarchy
- **Dominant focal moment:** Pods hub hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with title, search, and create action. with CIA only when the source supports a synthesized read.
- **Operational layer:** SegmentedTabs for Pods, Circles, Communities, Partners., Footer with low-pressure empty state and privacy reminder., H1, Hero labels.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*pods*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - search, create, and back.
- **GlassStatCard** - member's pod count, pending invites, discovery consent.
- **SegmentedTabs** - Pods, Circles, Communities, Partners.
- **PodCard** - group browse/manage row with purpose, members, shared goal, privacy.
- **AvatarStack** - member previews with counts and alt labels.
- **ConsentCard** - buddy discovery, partner visibility, revoke, and delete controls.
- **CIAInsightCard** - suggested pod with evidence and no shame.
- **Sheet** - join preview, create circle, permissions, report/leave.
- **ChipProvenance** - membership source, invite timestamp, shared-goal confidence.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

## Data Honesty
- **Membership count:** real = server membership plus ChipProvenance; low-confidence = cached membership; honest-null = no groups joined.
- **Invite state:** real = pending/accepted/expired timestamp; low-confidence = invite service delayed; honest-null = no invites.
- **Shared goal match:** real = consented goal overlap; low-confidence = topic-only estimate; honest-null = hidden until consent.
- **Partner visibility:** real = per-domain toggles; low-confidence = sync pending; honest-null = discovery off.
- **CIA suggestion:** real = goal and consent evidence; low-confidence = one signal; honest-null = no suggestion.

## Consent and Safety
- Pods hub exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/groups`. Do not add alternate vanity routes.

## States
- **Default:** hero, tabs, PodCards, CIA suggestion, consent/moderation controls.
- **Skeleton:** pod cards render avatar/title/action geometry with no fake member counts.
- **Empty:** HonestNullState offers create circle, broaden filters, and discovery controls.
- **Error:** cached groups stay visible with stale provenance and retry.
- **Success:** join/create/leave updates row in place with `--glow-done` and a clear undo where safe.
- **Disabled:** join, invite, message, and discovery controls dim to 40% with reason when consent, age gate, moderation, connectivity, or entitlement blocks action.

## Motion
- **Load:** hero first, tabs second, PodCards in 40ms stagger.
- **Join:** opens preview Sheet; success collapses to joined state and updates AvatarStack.
- **Search/filter:** results crossfade; empty state does not move footer controls.
- **Moderation:** report/block uses action Sheet with no swipe-only destructive path.
- **Reduced-motion:** disables stagger, avatar transitions, and glow breathing.

## Image Slots
- `HIFI-95-01` - avatar or message attachment slot; screen-specific; premium warm-dark product placeholder. Prompt: Pods hub avatar or social proof placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/groups`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** all text/chips clear AA+ on warm-dark surfaces.; **Targets:** tabs, PodCards, join/manage/report, avatars, and toggles are 44px minimum.; **Screen readers:** PodCards announce name, privacy, member count, shared goal, and join state.
