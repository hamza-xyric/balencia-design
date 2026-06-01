# Screen Design: Social Buddy Profile

**Screen**: 83 of 90
**File**: 83-social-buddy-profile.md
**Route**: `/features/social-buddy`
**Register**: Product Mode with social accountability
**Primary action**: Review a trusted buddy relationship and message or adjust privacy
**Tab**: Me
**Navigation**: Stack push from Direct Chat [75], Accountability [46], Community [40], Leaderboard [39], or user profile bottom sheet. Back returns to origin.

---

## Purpose

Social Buddy Profile is the trusted-person detail screen for Balencia's social layer. It shows who the buddy is, what missions are shared, what network controls are available, and how privacy is managed. The screen supports messaging and accountability without becoming a public social profile.

---

## Information Architecture

**Hierarchy**:
1. Buddy hero profile card
2. Shared missions list
3. Network controls card
4. Privacy and Message bottom actions

**User flow**:
- **Arrives from**: Direct Chat [75], Accountability [46], Community [40], Leaderboard [39], Competitions [47].
- **Primary exit**: Message -> Direct Chat [75].
- **Secondary exits**: Privacy controls, shared mission detail, invite buddy, report/block [64].

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed dual bottom actions, and visible tab bar.
**Tab bar visible**: Yes, Me active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <        Buddy profile      |
+-----------------------------+
|        [AK avatar]          |
|        Aisha Khan           |
| Running partner, buddy...   |
| [Trusted] [SIA-assisted]    |
|                             |
| SHARED MISSIONS             |
| Run a half marathon     68% |
| [Fitness] [progress bar]    |
| Read 2 books this month 35% |
| [Learning][progress bar]    |
|                             |
| Network controls            |
| Follow requests, buddy      |
| permissions, and report...  |
| [Invite buddy]              |
+-----------------------------+
| Privacy       Message       |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Buddy Hero
- **Purpose**: Identify the trusted person and relationship context.
- **Visual treatment**: centered rounded-xl card, relationships-pink/25 border, pink tint over ink-brown.
- **Content**:
  - Large avatar.
  - Name.
  - Relationship summary.
  - Signal pills: Trusted, SIA-assisted.
- **Behavior**: Avatar tap opens larger profile photo if available.

### Shared Mission Card
- **Purpose**: Show the user's shared commitments with the buddy.
- **Visual treatment**: rounded-lg ink-brown card, 16pt padding, progress bar.
- **Content**:
  - Mission name.
  - Domain tag.
  - Progress percentage.
  - Progress bar.
- **Gesture**: Tap -> Mission Detail [14] filtered to shared accountability context.

### Network Controls Card
- **Purpose**: Keep relationship controls discoverable.
- **Visual treatment**: rounded-lg white/4 card, users icon, compact body copy.
- **Actions**: Invite buddy, permissions, report/block.
- **Behavior**: Invite buddy opens contact/invite sheet.

### Bottom Actions
- **Privacy**: Ghost button with shield icon, opens visibility/permissions controls.
- **Message**: Orange primary button with MessageCircle icon, routes to Direct Chat [75].

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Content cards |
| Primary action | #FF5E00 | brand-orange | Message |
| Relationship accent | #EC4899 | relationships-pink | Profile/progress domain |
| SIA assisted | #7F24FF | royal-purple | SIA signal pill |
| Trusted state | #34A853 | forest-green | Trusted pill |
| Text primary | #FFFFFF | white | Names/titles |
| Text secondary | #FFFFFF at 45-55% | white/55 | Metadata |

**60/30/10 verification**: Orange remains action. Pink identifies social/relationships. Purple indicates SIA assistance. Green indicates trusted state.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Shared mission | Pressed | scale(0.98), border relationships-pink/30 |
| Privacy | Pressed | ghost bg white/8 |
| Message | Pressed | scale(0.96) |
| Invite buddy | Pressed | border brand-orange/25 |
| Report/block | Destructive | error-red text inside controls sheet |
| Removed buddy | Disabled | Hero opacity 70%, message action hidden |

---

## Motion

- Hero enters with fade-up.
- Shared mission cards stagger by 70ms.
- Progress bars animate from 0 to current value over 520ms.
- Privacy sheet uses standard bottom sheet motion.

---

## Empty, Loading, Error

- **No shared missions**: Show empty card "No shared missions yet" with "Invite to mission".
- **Buddy request pending**: Hero shows pending pill; message disabled until accepted if privacy requires it.
- **Privacy load failed**: Privacy sheet shows retry.
- **Message unavailable**: Toast "You can message after this buddy accepts".
- **Loading**: Avatar skeleton, hero skeleton, mission skeletons.

---

## Accessibility

- Hero announces name, relationship summary, trusted state, and SIA-assisted state.
- Progress bars include mission name and percentage.
- Privacy button label: "Manage buddy privacy".
- Message button label: "Message Aisha Khan".
- Network controls are grouped with clear button labels.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/features/social-buddy/page.tsx`.
- Buddy profile is not a public profile; default visibility is trust/permission based.
- Message action should route to Direct Chat [75].
- Report/block actions use Report / Block [64].
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-18.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/social-buddy`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q02 system overlays may be QA fixtures but production needs native trigger/dismiss/API states.
- Q05 music/video use honest demo recommendations without implying live provider sync.
- Q18 progress-photo sharing is disabled in V1.
- Q22 accountability partners see only opted-in contract/proof/check-in data; SIA reads with consent.
- Q42 reports remain in-app with screenshot-level sharing only.
- Q48 app rating uses non-coercive prompt fixtures.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B18-F13 | critical | navigation | Wire Message to Direct Chat, Privacy to permissions, Invite buddy to contact/invite, shared missions to mission detail, and avatar to preview. |
| B18-F14 | major | trust-privacy | Add buddy visibility controls, SIA-assist opt-in/explanation, report/block entry, and explicit shared-data categories. |
| B18-F15 | major | accessibility | Increase Invite buddy to 44px high, make mission cards semantic links/buttons, and expose progress values with accessible labels. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

