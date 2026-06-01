# Screen Design: Obstacle Coach

**Screen**: 85 of 90
**File**: 85-obstacle-coach.md
**Route**: `/tabs/goals/obstacles`
**Register**: AI Mode (SIA diagnosis and reconnection)
**Primary action**: Diagnose recurring mission blockers and start a reconnection plan
**Tab**: Goals
**Navigation**: Stack push from Mission Board [13], Mission Detail [14], Streak Details [59], SIA Chat [09], or Daily Check-in [45]. Back returns to origin.

---

## Purpose

Obstacle Coach helps users understand why missions are slipping without shame. SIA identifies patterns behind missed actions - timing conflicts, travel, nutrition gaps, stress load - and proposes a reconnection plan. The screen reframes failure as diagnosis: timing, friction, and context can be adjusted.

---

## Information Architecture

**Hierarchy**:
1. Obstacle diagnosis hero
2. Detected blockers list
3. Next best timing SIA card
4. Start reconnection bottom action

**User flow**:
- **Arrives from**: Mission Board [13], Mission Detail [14], Streak Details [59], SIA Chat [09].
- **Primary exit**: Start reconnection.
- **Secondary exits**: Tap blocker -> blocker detail/edit plan, tap timing card -> Schedule [41], back to origin.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed bottom action, and visible tab bar.
**Tab bar visible**: Yes, Goals active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <       Obstacle coach      |
+-----------------------------+
| Obstacle diagnosis      cmp |
| SIA found the pattern       |
| behind missed missions.     |
| Reconnection starts with... |
| [3 blockers][SIA plan][Ready]|
|                             |
| DETECTED BLOCKERS           |
| [time] Late meetings block  |
|        workouts             |
|        Detected 3 missed... |
|        Move workouts...     |
| [time] Protein target drops |
| [time] Budget review skipped|
|                             |
| [SIA] Next best timing      |
| Monday at 8:10 AM has the   |
| strongest follow-through.   |
+-----------------------------+
|        Start reconnection   |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Obstacle Hero
- **Purpose**: Frame the screen as a diagnosis, not a failure report.
- **Visual treatment**: rounded-xl, brand-orange/25 border, orange tint over ink-brown.
- **Content**:
  - Eyebrow "Obstacle diagnosis".
  - Title: "SIA found the pattern behind missed missions."
  - Compassionate explanatory body.
  - Compass icon in orange circle.
  - Signal pills: 3 blockers, SIA plan, Reconnection ready.

### Blocker Card
- **Purpose**: Present one detected obstacle with evidence and a proposed next action.
- **Visual treatment**: Small card, rounded-lg, 16pt padding, icon tile.
- **Content**:
  - TimerReset icon.
  - Blocker title.
  - Evidence detail.
  - Proposed action in brand-orange.
- **Behavior**: Tap opens blocker detail with edit/accept/dismiss options.

### Next Best Timing Card
- **Purpose**: Convert diagnosis into a specific scheduling recommendation.
- **Visual treatment**: royal-purple/10 card with sparkles icon.
- **Content**: Best time and rationale.
- **Behavior**: Tap opens Schedule [41] or reconnection timing picker.

### Start Reconnection Button
- **Purpose**: Accept the SIA plan and restart momentum.
- **Visual treatment**: Full-width orange CTA with RotateCcw icon.
- **Behavior**: Opens reconnection flow: choose actions, adjust reminders, confirm mission plan.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Content cards |
| Primary action | #FF5E00 | brand-orange | Hero/action/reconnection |
| SIA timing | #7F24FF | royal-purple | Next timing card |
| Success/readiness | #34A853 | forest-green | Ready pill |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 45-55% | white/55 | Evidence/body |
| Borders | #FFFFFF at 6-8% | white/8 | Cards |

**60/30/10 verification**: Orange is the primary diagnosis/action color. Purple is SIA timing intelligence. Green appears only as readiness/success.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Blocker card | Pressed | scale(0.98), border brand-orange/25 |
| Blocker card | Accepted | Green check appears; action text becomes "Accepted" |
| Blocker card | Dismissed | 60% opacity, undo toast |
| Timing card | Pressed | royal-purple border brightens |
| Reconnection CTA | Loading | Spinner, label "Building plan..." |
| Reconnection CTA | Success | Routes to updated Mission Detail [14] |

---

## Motion

- Hero fades up first.
- Blocker cards stagger by 70ms.
- Reconnection CTA success triggers small check pop and routes after 500ms.
- Dismissed blocker slides left and shows undo toast.

---

## Empty, Loading, Error

- **No blockers detected**: Show positive empty state "No recurring blockers found" and CTA "Review mission rhythm".
- **Insufficient data**: Explain that SIA needs more check-ins or mission history.
- **Plan generation failed**: Hero remains; CTA changes to "Try again".
- **Schedule conflict**: Timing card shows alternate time suggestion.
- **Loading**: Hero skeleton, three blocker skeleton cards.

---

## Accessibility

- Hero announces that this is a diagnosis and includes number of blockers.
- Blocker cards announce title, evidence, and proposed action.
- Proposed action is text, not color-only.
- Reconnection CTA announces loading and success states.
- Dismiss/accept actions must be available through buttons, not swipe-only gestures.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/goals/obstacles/page.tsx`.
- Related screens: Mission Board [13], Mission Detail [14], Streak Details [59], Schedule [41], Reminders & Tasks [61].
- Tone must stay non-shaming and practical.
- No runtime route/API changes are required.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-07.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/goals/obstacles`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q20 OAuth flows must preview scopes, purpose, sync cadence, storage, disconnect, delete, and revocation.
- Q33 Life Areas comparison is Plus-gated only after enough history exists.
- Q34 Explore tier labels distinguish included vs locked states.
- Q35 billing follows mobile-store purchase, restore, trial, cancellation, error, and entitlement patterns.
- Q50 obstacle reconnection uses per-blocker accept/dismiss controls before accept-all.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B07-F03 | critical | retention | Implement the reconnection flow with loading, choose/edit actions, reminder adjustment, confirmation, and success routing/state. |
| B07-F04 | major | navigation | Make blocker cards, timing card, and back semantic controls with detail, accept/dismiss, schedule, and stack-pop behavior. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

