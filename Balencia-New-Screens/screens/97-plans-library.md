# 97-plans-library - hi-fi glass spec

### 1. Header
- **ID:** 97
- **Name:** Plans library
- **Route(s) covered:** /plans
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Goals / Growth.
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, and Balencia-New-Screens/canon.
- **Batch:** 6

### 2. Purpose
Plans library is the ongoing plan management surface, distinct from the onboarding summary. It lets the user browse active plans, resume a current plan, start a coach-authored plan, and see honest plan progress with provenance and premium gating.

### 3. Entry & exit
- **Entry:** Goals nav, plan card on Home, CIA recommendation, notification, or mission detail.
- **Primary exit:** resume active plan, start plan, or open plan detail.
- **Creation exit:** CIA can draft a plan from a mission, but the user confirms before it becomes active.
- **Premium exit:** locked plans use PaywallLock with a single unlock CTA.
- **Failure exit:** cached active plan remains visible with SyncStatus and retry.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with "Plans", create/draft action, and filter.
2. Hero GlassCard for active plan progress and next step.
3. CIAInsightCard recommending one plan adjustment.
4. SegmentedTabs: Active, Suggested, Saved, Completed.
5. PlanCard list with domain, duration, progress, source, and lock state.
6. Empty/locked/offline support and GlassNavBar.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| Plans                      draft filt|
+--------------------------------------+
| +----------------------------------+ |
| | ACTIVE PLAN                      | |
| | Half marathon base               | |
| | week 3 of 8  progress [####--]   | |
| | Next: 5K tempo run · tomorrow    | |
| | [Resume plan]                    | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA: your sleep suggests moving  | |
| | the hard run one day later.      | |
| +----------------------------------+ |
| [Active] [Suggested] [Saved] [Done] |
| +----------------------------------+ |
| | PlanCard: Strength reset      >  | |
| | 4 weeks · fitness · via CIA      | |
| | PlanCard: Budget cleanup     lock| |
| | premium preview · PaywallLock    | |
| | PlanCard: Evening wind-down   >  | |
| +----------------------------------+ |
| Today | CIA | Goals | Me            |
+--------------------------------------+
```

### 5. Components
- **TopBar** - draft and filter actions.
- **GlassCard** - active plan hero.
- **ProgressBar** - plan completion.
- **CIAInsightCard** - suggested plan adjustment with evidence.
- **SegmentedTabs** - Active, Suggested, Saved, Completed.
- **PaywallLock** - premium plan previews.
- **ChipDomainTag / ChipProvenance** - domain and source labels.
- **ListRow** - plan metadata rows.
- **NEW: PlanCard** - reusable plan list item with title, domain, duration, progress, source, and lock state; needed because catalog has goal cards but no plan library item.
- **SkeletonState / ErrorState / HonestNullState / SyncStatus** - plan states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` base with warm radial glow and grain.
- **Hero:** active plan GlassCard uses `--glow-you #FF5E00` for current commitment.
- **Completion:** finished plan badges and completed steps use `--glow-done #34A853`.
- **CIA:** adjustment recommendation and draft plan provenance use `--glow-cia #7F24FF`.
- **Surfaces:** PlanCard uses SolidCard for scannable list density; PaywallLock is blurred preview, never a blank lock box.
- **Type:** Neue Montreal with one Tiempos italic word in hero copy, e.g. "next *right* step."

### 7. Content & copy
- **H1:** "Plans."
- **Hero:** "Half marathon base." "Week 3 of 8." "Next: 5K tempo run tomorrow."
- **Primary action:** "Resume plan."
- **PlanCard examples:** "Strength reset", "Budget cleanup", "Evening wind-down."
- **CIA line:** "Your sleep suggests moving the hard run one day later."
- **Locked copy:** "Premium plan preview. Unlock with premium."
- **Empty copy:** "No active plan yet. Start plan from a mission or ask CIA to draft one."

### 8. Data & honesty states
- **Active plan:** real = plan progress, next step, and source; low-confidence = stale completion sync; honest-null = no active plan with start-plan action.
- **Suggested plans:** real = CIA recommendation with evidence; low-confidence = "draft suggestion" label; honest-null = no suggested list.
- **Saved plans:** real = user-saved or coach-authored plan; low-confidence = imported plan missing metadata; honest-null = EmptyState.
- **Premium plans:** real = feature entitlement; low-confidence does not apply; honest-null = PaywallLock with value copy.
- **Data controls:** CIA plan drafts, third-party imports, social accountability sharing, and health-linked plan evidence expose consent, revoke, export, and delete.

### 9. All states
- **Default:** active plan hero, CIA insight, tabs, PlanCard list, locked previews, and nav render.
- **Skeleton:** hero, tabs, and three PlanCard rows shimmer in final geometry.
- **Empty:** no active plan shows mission-based starter, CIA draft option, and saved plan shelf if present.
- **Error:** cached plans remain; failed sync names the source and offers retry.
- **Success:** start plan adds it to Active and flashes green progress confirmation.
- **Disabled:** draft, start, or unlock actions dim when entitlement, consent, or connectivity blocks them.

### 10. Motion & interaction
- **Load:** active hero appears first, tabs settle, PlanCards fade by row.
- **Resume:** primary action opens plan detail with next-step focus.
- **Start plan:** confirmation Sheet names data used and asks consent before activation.
- **Tab switch:** SegmentedTabs slide indicator; list content crossfades.
- **Paywall:** PaywallLock opens upgrade Sheet without hiding plan value.
- **Reduced-motion:** no row stagger or tab slide; content appears at final positions.

### 11. Motivation-tier adaptation
- **Low:** active plan only, one next step, and one suggested plan.
- **Medium:** default tabs and PlanCard list.
- **High:** show filters, plan history, evidence chips, and completed plan analytics.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** draft, filters, tabs, PlanCards, primary CTA, and unlock are 44px minimum.
- **Screen readers:** PlanCard announces title, domain, duration, progress, source, lock state, and next action.
- **Data control:** CIA, health, social/accountability, and third-party plan data include consent, revoke, export, and delete controls.
- **Locked state:** PaywallLock explains value and action; it is not a dead end.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** plans tie goals, health evidence, CIA, and accountability.
2. **Honest:** plan progress, draft status, locks, and sources are labeled.
3. **Premium:** active plan hero plus dense PlanCard list.
4. **Warm-dark:** canon glass and solid surfaces used.
5. **Semantic glow:** current commitment, completion, and CIA meanings stated.
6. **60/30/10:** orange commitment, green completion, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high plan density specified.
10. **Accessibility:** labels, 44px targets, lock clarity, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined for plan data.
12. **Catalog:** canon components used; PlanCard is marked NEW with rationale.
13. **CIA voice:** plan suggestions cite evidence and ask before activation.
