# 97 Plans library - A+++ hi-fi mobile spec

## Header
- **Source ID:** 97
- **Source spec:** `Balencia-New-Screens/screens/97-plans-library.md`
- **Evidence:** `Archive/2026-07-06/features.md`, `Archive/2026-07-06/routes.csv`, `work/briefs/97.md`, `work/drafts/97.md`
- **Route:** `/plans`
- **Frame:** 390x844 native mobile
- **Priority:** convert-now

## Reviewer Synthesis
- **Source Fidelity Reviewer:** `/plans` is live but not visible in legacy nav; hi-fi can place it under Goals/Growth without inventing a new route.
- **Premium Visual Director:** replace generic plan cards with an active-plan path and one "next right step" focal moment.
- **Interaction and State Designer:** tabs, swipe complete/archive, confirmation before CIA activation, and PaywallLock for premium plans are required.
- **Trust and Safety Reviewer:** CIA-generated plans must disclose source, consent, edits, delete/export, and accountability sharing.
- **GLM directions considered:** CIA prompt hero, active-plan timeline, dense plan shelf. **Chosen:** active-plan timeline plus dense shelf.

## Final Composition

```text
+--------------------------------------+
| Plans                      draft filt|
|                                      |
| +----------------------------------+ |
| | ACTIVE PLAN                      | |
| | Half marathon base               | |
| | Week 3 of 8                      | |
| |                                  | |
| |  start -- wk3 -- 5K tempo -- wk8 | |
| |           next *right* step      | |
| | Tomorrow · 6:30 AM               | |
| | [Resume plan] [Adjust with CIA]  | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA: sleep suggests moving the  | |
| | hard run one day later.          | |
| | via sleep + training plan        | |
| +----------------------------------+ |
| [All] [Active] [Completed] [Paused] |
| Strength reset       4 wks  via CIA |
| Budget cleanup       locked template|
| Evening wind-down    saved          |
| Today        CIA       Goals    Me   |
+--------------------------------------+
```

## Focal Hierarchy
- **Dominant focal moment:** Active Plan Path, a compact timeline spine showing week, next step, and source.
- **CIA layer:** adjustment suggestion with evidence, opt-in.
- **Plan shelf:** solid dense rows, not competing cards.
- **Premium gate:** inline blurred preview for locked plan templates, generic unless consent and entitlement both exist.

## Visual System
- Active hero uses orange `--glow-you` for current commitment.
- CIA adjustment uses purple `--glow-cia`.
- Completed plan chips and finished steps use green `--glow-done`.
- Plan list rows use `SolidCard` for scan density.
- Neue Montreal; Tiempos italic word: "*right*".

## Components
- `TopBar`, `GlassCard.hero`, `ProgressBar`, `CIAInsightCard`, `SegmentedTabs`, `ChipDomainTag`, `ChipProvenance`, `PaywallLock`, `ListRow`, `SkeletonState`, `ErrorState`.
- `NEW: ActivePlanPath` - a horizontal milestone spine with current week, next step, and honest source.
- `NEW: PlanCard` - source spec already calls this out for title, domain, duration, progress, source, and lock state.

## Data Honesty
- Active plan: real progress and next step; low-confidence stale completion sync; honest-null no active plan with "Ask CIA to draft."
- CIA suggestion: requires plan plus health/schedule evidence; low-confidence labeled draft suggestion.
- Saved plans: source `you saved`, `via CIA`, `imported`, or honest-null.
- Premium lock: entitlement state is explicit; no hidden templates. Personalized locked previews require both consent and entitlement.

## Consent and Safety
- CIA draft sheet states data used before activation.
- User can edit, pause, stop, archive, delete, export, share, or revoke CIA plan memory.
- Accountability sharing requires explicit audience selection and links to `/contracts`; contract data can be removed from a plan.
- Health, sleep, social, calendar, and contract evidence can be removed from an individual plan without deleting the whole plan.
- Locked previews never reveal personalized health/social insight until the user has both consented and unlocked the feature.

## States
- **Default:** active plan path, CIA insight, tabs, plan shelf.
- **Skeleton:** hero timeline, tabs, and three rows keep geometry.
- **Empty:** no active plan with mission-based starter and CIA draft option.
- **Error:** cached plans remain; failed sync names the source.
- **Success:** start/complete milestone flashes green and updates progress.
- **Disabled:** draft/start/unlock dim when entitlement, consent, or connectivity blocks them.

## Motion
- ActivePlanPath draws from start to current week.
- Swipe right completes next milestone; swipe left reveals Edit, Pause, Share, Archive, Delete after confirmation where destructive.
- Tab switch slides indicator; reduced motion uses instant selected state.
- Paywall opens upgrade sheet without hiding the plan value.

## Image Slots
- None required.

## Implementation Notes
- Route stays `/plans`.
- Because `/plans` is not legacy-primary nav, label placement should be under Goals/Growth or deep-linked from Today without claiming it is a bottom-tab route.
