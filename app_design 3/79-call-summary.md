# Screen Design: Call Summary

**Screen**: 79 of 90
**File**: 79-call-summary.md
**Route**: `/tabs/sia/call-summary`
**Register**: AI Mode (post-call SIA review)
**Primary action**: Review a completed voice coaching call and schedule a follow-up
**Tab**: SIA
**Navigation**: Stack push after Voice Mode [11] ends, or from Voice Call History [51]. Back returns to voice history or originating call flow.

---

## Purpose

Call Summary captures the value of a voice session after it ends. It turns a live SIA coaching call into durable action items, transcript highlights, mood/status signals, and a follow-up scheduling path. The screen should feel like a calm debrief, not a dense transcript archive.

---

## Information Architecture

**Hierarchy**:
1. Post-call summary hero
2. Action items card
3. Transcript highlights
4. Schedule follow-up bottom action

**User flow**:
- **Arrives from**: Voice Mode Full-Screen [11] post-call, Voice Call History [51] call detail.
- **Primary exit**: Schedule follow-up.
- **Secondary exits**: Tap action item -> Reminders & Tasks [61] or Mission Detail [14]; tap transcript line -> expanded transcript.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, bottom action, and visible tab bar.
**Tab bar visible**: Yes, SIA active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <       Call summary        |
+-----------------------------+
| Post-call summary        mic|
| Morning coaching call       |
| 18 minutes, recovery...     |
| [Transcript][Mood][Private] |
|                             |
| ACTION ITEMS                |
| [check] Move long run...    |
| [check] Add protein snack...|
| [check] Ask Aisha...        |
|                             |
| TRANSCRIPT HIGHLIGHTS       |
| [SIA] Your recovery is...   |
| [You] Let us keep it...     |
| [SIA] I will save that...   |
+-----------------------------+
|       Schedule follow-up    |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Summary Hero
- **Purpose**: Summarize the call at a glance.
- **Visual treatment**: rounded-xl, royal-purple/25 border, purple radial accent, ink-brown surface.
- **Content**:
  - Eyebrow "Post-call summary".
  - Title: "Morning coaching call".
  - Metadata: duration, topic, action item count.
  - Mic icon in purple circle.
  - Signal pills: Transcript ready, Mood steady, Private.

### Action Items Card
- **Purpose**: Show concrete follow-through from the call.
- **Visual treatment**: rounded-lg ink-brown card, 16pt padding.
- **Rows**: green check icon + 13pt action text.
- **Behavior**: Tap row opens task conversion or linked mission update. Completed state can be toggled in production.

### Transcript Highlights
- **Purpose**: Provide reviewable snippets without overwhelming the user.
- **Visual treatment**: Section header plus small rounded highlight cards.
- **Speaker indicators**:
  - SIA: sparkles icon, royal-purple.
  - You: clock/context icon, white/35.
- **Behavior**: Tap highlight opens expanded transcript with the selected line anchored.

### Schedule Follow-Up
- **Purpose**: Convert call insight into the next coaching session.
- **Visual treatment**: Full-width orange CTA with CalendarPlus icon.
- **Behavior**: Opens scheduling sheet from Voice Call History [51].

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Hero/card surfaces | #211008 | ink-brown-800 | Content cards |
| Primary action | #FF5E00 | brand-orange | Schedule follow-up |
| SIA indicators | #7F24FF | royal-purple | Hero and SIA lines |
| Completed/action checks | #34A853 | forest-green | Action item icons |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 55-65% | white/65 | Metadata/body |
| Borders | #FFFFFF at 6-8% | white/8 | Cards |

**60/30/10 verification**: Purple is SIA/call context. Orange is scheduling action. Green marks captured action items.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Action item | Pressed | row bg white/4, check icon glow-green |
| Transcript card | Pressed | border royal-purple/25 when SIA, white/12 otherwise |
| Follow-up CTA | Pressed | scale(0.96) |
| Transcript | Loading | Highlight skeletons |
| Private pill | Tapped | Opens privacy explanation tooltip |

---

## Motion

- Hero fades up first.
- Action rows stagger by 60ms.
- Transcript cards stagger by 70ms.
- Scheduling sheet slides up using standard modal timing.

---

## Empty, Loading, Error

- **Summary generating**: Hero shows "Preparing call summary" with pulsing SIA icon.
- **Transcript unavailable**: Show transcript section fallback "Transcript is still processing".
- **No action items**: Replace card rows with "No action items captured from this call".
- **Generation failed**: Show retry card: "SIA could not summarize this call".
- **Offline**: Cached summary remains readable; schedule action is disabled.

---

## Accessibility

- Hero announces call title, duration, summary status, and privacy state.
- Action item rows are buttons with full action text.
- Transcript cards announce speaker and line text.
- Follow-up CTA label: "Schedule follow-up call".
- Mood/privacy signals include text, not color-only status.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/sia/call-summary/page.tsx`.
- Complements Voice Call History [51] by focusing on the post-call debrief state.
- Transcript snippets should be redacted according to the same privacy rules as SIA memory [20].
- No runtime route/API changes are required.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-06.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/sia/call-summary`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q14 SIA in chats requires explicit invocation.
- Q15 group health/recovery signals require per-user permission.
- Q23 call follow-up scheduling should reuse the voice-history scheduling sheet.
- Q24 create mission starts from blank natural-language intent.
- Q25 streak details preserve source tab context.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B06-F01 | critical | retention | Wire follow-up scheduling, action-item conversion, and transcript expansion from the post-call summary. |
| B06-F02 | major | trust-privacy | Make privacy/status signals accessible and add concise storage, visibility, retention, and redaction guidance. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

