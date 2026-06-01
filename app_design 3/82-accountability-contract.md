# Screen Design: Accountability Contract

**Screen**: 82 of 90
**File**: 82-accountability-contract.md
**Route**: `/features/accountability-contract`
**Register**: Product Mode with social accountability
**Primary action**: Review and sign an accountability contract update
**Tab**: Me
**Navigation**: Stack push from Accountability [46], Mission Detail [14], Social Buddy Profile [83], or SIA recommendation. Back returns to origin.

---

## Purpose

Accountability Contract defines the user's shared commitment with one or more trusted partners. It shows what is being verified, what partners can see, and what remains private. The screen makes accountability explicit and consent-based, especially when partner confirmations or proof uploads are involved.

---

## Information Architecture

**Hierarchy**:
1. Active contract hero
2. Verification checks list
3. Partners/privacy explanation
4. Sign update bottom action

**User flow**:
- **Arrives from**: Accountability [46], Mission Detail [14], Social Buddy Profile [83], SIA Chat [09].
- **Primary exit**: Sign update.
- **Secondary exits**: Tap verification check -> proof detail; tap partners -> partner permissions.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed bottom action, and visible tab bar.
**Tab bar visible**: Yes, Me active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <   Accountability contract |
+-----------------------------+
| Active contract          ok |
| Half marathon consistency   |
| 4 weeks left, 2 partners... |
| [Signed][2 checks][Consent] |
|                             |
| VERIFICATION CHECKS         |
| [green] Morning run proof   |
|         Photo or wearable   |
| [orange] Weekly review      |
|          Due Sunday evening |
| [green] Buddy confirmation  |
|                             |
| Partners                    |
| Aisha and Omar can see      |
| check status, not private...|
+-----------------------------+
|          Sign update        |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Contract Hero
- **Purpose**: Summarize the active contract status.
- **Visual treatment**: rounded-xl, forest-green/25 border, green tint over ink-brown.
- **Content**:
  - Eyebrow "Active contract".
  - Contract title.
  - Duration, partner count, compliance rate.
  - ShieldCheck icon in green circle.
  - Signal pills: Signed, 2 checks due, Consent active.

### Verification Check Row
- **Purpose**: Show what proof or confirmation is required.
- **Visual treatment**: Small card row, rounded-lg, 16pt padding.
- **Content**:
  - Status dot: green when satisfied, orange when due.
  - Check label.
  - Status/detail text.
- **Behavior**: Tap opens proof detail, upload, or confirmation history.

### Partners Privacy Card
- **Purpose**: Clarify partner visibility.
- **Visual treatment**: rounded-lg white/4 card, users icon, title "Partners".
- **Content**: Partner names and privacy boundary.
- **Behavior**: Tap opens partner permissions sheet.

### Sign Update Button
- **Purpose**: Confirm changed terms or renewed commitment.
- **Visual treatment**: Full-width orange CTA with FileSignature icon.
- **Behavior**: Opens signature confirmation sheet, then updates contract status.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Hero/card surfaces | #211008 | ink-brown-800 | Content containers |
| Primary action | #FF5E00 | brand-orange | Sign update, due status |
| Success/contract | #34A853 | forest-green | Active/signed/done |
| SIA optional | #7F24FF | royal-purple | Only if SIA note appears |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 45-55% | white/55 | Metadata |
| Borders | #FFFFFF at 6-8% | white/8 | Cards |

**60/30/10 verification**: Green owns contract success. Orange marks due checks and signing action. Purple is absent unless an optional SIA explanation is inserted.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Verification row | Done | Green dot, normal opacity |
| Verification row | Due | Orange dot, row border brand-orange/20 |
| Verification row | Pressed | scale(0.98), bg white/5 |
| Sign update | Disabled | white/25 text if no changes |
| Sign update | Loading | Spinner and "Signing..." |
| Sign update | Success | Green check and success toast |

---

## Motion

- Hero fades up first.
- Verification rows stagger by 70ms.
- Signing confirmation sheet slides up from bottom.
- Successful signature uses small green check pop and haptic success.

---

## Empty, Loading, Error

- **No active contract**: Show empty hero "No active contract" and CTA "Create contract" linking to Accountability [46].
- **Missing partner**: Partners card warns "Add a partner to activate this contract".
- **Verification failed**: Row shows error text and retry/upload action.
- **Signature failed**: Inline error above bottom action, CTA returns to "Try again".
- **Loading**: Contract skeleton and disabled bottom action.

---

## Accessibility

- Contract hero announces title, remaining time, compliance, and consent state.
- Verification rows announce done/due status in text.
- Partner card states privacy boundary explicitly.
- Sign update button announces loading/success states.
- Signature confirmation must be reachable without gesture-only input.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/features/accountability-contract/page.tsx`.
- Extends Accountability [46] rather than replacing it. Screen [46] manages partners/contracts; this screen reviews one contract.
- Partner visibility must exclude private journal notes by default.
- No runtime route/API changes are required.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-18.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/accountability-contract`
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
| B18-F10 | critical | trust-privacy | Add signature confirmation, terms review, proof detail/upload/history, partner permissions, loading/success/error states, and audit trail copy. |
| B18-F11 | major | information-architecture | Disable Sign update when no terms changed, or show the pending update summary and require explicit review before signing. |
| B18-F12 | major | mobile-ergonomics | Use a shorter/adaptive header, move partner/privacy context above signing or into a review step, and preserve a clear scroll cue. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

