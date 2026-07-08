# 83 Social buddy profile - A+++ hi-fi mobile spec

## Header
- **Source ID:** 83
- **Source spec:** `Balencia-New-Screens/screens/83-social-buddy-profile.md`
- **Evidence:** `app_design 3/83-social-buddy-profile.md`, `ascii_wireframes/83-social-buddy-profile.md`
- **Route:** `/profile/[id]`
- **Frame:** 390x844 native mobile
- **Priority:** convert-now

## Reviewer Synthesis
- **Source Fidelity Reviewer:** retain trusted-person profile, shared missions, visibility controls, invite, message, report/block, avatar handoff.
- **Premium Visual Director:** make the relationship legible as a private shared-domain instrument, not a generic public profile.
- **Interaction and State Designer:** pending/removed buddy, mission sync failure, and visibility sheet need honest states.
- **Trust and Safety Reviewer:** visibility, revoke shared data, report, block, delete, and invite controls must stay first-class.
- **GLM directions considered:** trusted card, shared-domain radar, private network controls. **Chosen:** trusted card with shared-domain shape.

## Final Composition

```text
+--------------------------------------+
| <  Buddy profile                 ... |
| +----------------------------------+ |
| |          [AK avatar]             | |
| |          Aisha Khan              | |
| | Running partner. We're training  | |
| | for the *half* together.         | |
| | [Trusted partner] [Mutual insight] | |
| |                                  | |
| |      shared-domain shape         | |
| |        Fitness + Learning        | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA: on mutually shared run days,| |
| | both sleep logs were higher.     | |
| | via shared consent + check-ins   | |
| +----------------------------------+ |
| SHARED MISSIONS                      |
| Run a half marathon      68% on track|
| [#############------] via check-ins  |
| Read 2 books             35% building|
| [#######------------] via updates     |
| NETWORK                              |
| Permissions | Invite | Safety        |
| [Adjust visibility] [Message]        |
+--------------------------------------+
```

## Focal Hierarchy
- **Dominant focal moment:** Buddy Hero Card with avatar, relationship copy, trust pills, shared-domain shape.
- **CIA layer:** one consented pattern note.
- **Shared missions:** solid progress rows with non-shaming framing.
- **Bottom actions:** visibility and message.

## Visual System
- Hero uses glass plus surface backplate, not a giant orange glow.
- Trusted state uses green with check glyph; mutual insight consent uses purple with explicit provenance.
- Message/invite actions use orange; report/destructive states use text plus glyph, not color alone.
- Neue Montreal; Tiempos italic word: "*half*".

## Components
- `TopBar`, `GlassCard`, `AvatarStack`, `ChipDomainTag`, `CIAInsightCard`, `ProgressBar`, `SolidCard`, `ChipProvenance`, `Sheet`, `BtnPrimary`, `BtnSecondary`, `BtnGhost`.
- `NEW: SharedDomainShape` - compact relationship overlap visual.

## Data Honesty
- Identity: profile record; initials avatar until photo consent exists.
- Trusted state: accepted, pending, removed, blocked, or honest-null.
- Shared missions: real progress with source; stale sync label; honest-null invite prompt.
- Shared-domain shape: hidden if consent is missing.
- CIA insight: requires consented shared signals.

## Consent and Safety
- Adjust visibility sheet has per-domain toggles, revoke shared data, export, and delete shared history.
- Shared health/CIA insight requires mutual, per-category consent before rendering; otherwise the CIA card becomes a generic "No shared insight yet" honest-null.
- Network controls include mute, remove buddy, report, block, export shared data, revoke shared domains, and delete shared history with confirmation.
- Removed buddy state keeps Message visible but explains that messaging requires accepted connection.
- Avatar image opens Image Viewer only when media consent exists.

## States
- **Default:** hero, CIA insight, mission rows, network controls, sticky actions.
- **Skeleton:** avatar/name/pills/shape/mission rows hold geometry.
- **Empty:** no shared missions with Invite to mission.
- **Pending:** message dimmed with explicit reason.
- **Removed:** reconnect banner; no silent hiding.
- **Error:** identity remains; failed mission section shows retry.
- **Success:** visibility update, invite, message handoff, or report confirmation uses green status.
- **Disabled:** Message, invite, shared mission rows, visibility toggles, avatar open, and CIA insight actions dim to 40% with reason copy when blocked, removed, pending, consent-missing, offline, or moderation-limited.

## Implementation Readiness
- **Real data:** buddy identity, trusted state, shared mission progress, shared-domain shape, and CIA insight require profile/server records plus mutual consent and source freshness; every shared value carries source or `ChipProvenance`.
- **Low-confidence:** stale mission sync, partially confirmed relationship status, or early CIA relationship patterns render muted with `estimated - low confidence` / `early signal`; they never unlock private health claims.
- **Honest-null:** missing photo, missing shared missions, missing mutual consent, or no accepted relationship becomes initials avatar, `No shared missions yet`, or `No shared insight yet` with the relevant invite/visibility action.
- **44px and screen readers:** back, overflow, visibility, message, invite, report/block, avatar, and mission rows maintain 44px targets; screen-reader labels name trust state, shared-consent state, mission progress/source, and destructive action confirmation.
- **Controls and consent:** visibility sheet exposes export shared data, revoke shared domains, delete shared history, remove buddy, report, block, and mute. Health, photo, voice, and social profile data each show consent state before rendering or sharing.

## Motion
- Shared-domain shape draws as a small constellation.
- Mission bars fill to real values only.
- Visibility sheet opens half-height; reduced motion disables bar fill and shape draw.

## Image Slots
- `HIFI-83-01` initials avatar placeholder.

## Implementation Notes
- Route stays `/profile/[id]`.
- Message routes to `/messages`; report/block uses screen 64 once repaired, not a new route.
