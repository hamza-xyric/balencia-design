# CP-02 — SIA identity

- Status: `not started`
- Priority note: deferred as the next lead creative until CP-01 onboarding signature reaches a stronger accepted carousel/canvas baseline. CQ01 remains 3D-first, but generated avatar work should not lead production unless the result can meet a premium trust bar.
- Package: `sia-identity`
- Session cap: 6 asset briefs
- Prototype URL: `http://localhost:3000`
- Registry filter: `production_batch = CP-02`

## Screens in scope

| ID | Screen | Route | Priority |
| --- | --- | --- | --- |
| 09 | SIA chat | `/tabs/sia` | P1 |
| 10 | Voice mode (in-chat) | `/tabs/sia/voice-inline` | P1 |
| 11 | Voice mode (full) | `/tabs/sia/voice-fullscreen` | P0 |

## Decision gates

- [x] **CQ01** resolved: **3D SIA avatar first**; polished reactive 2D fallback states only if 3D is infeasible for V1

## Brief checklist

| Brief ID | Screen | Route | Asset type | Status |
| --- | --- | --- | --- | --- |
| CRE-11-avatar-fullscreen | 11 | `/tabs/sia/voice-fullscreen` | avatar | not_started |
| CRE-11-avatar-states | 11 | `/tabs/sia/voice-fullscreen` | avatar | not_started |
| CRE-09-avatar-chat | 09 | `/tabs/sia` | avatar | not_started |
| CRE-10-waveform-inline | 10 | `/tabs/sia/voice-inline` | illustration | not_started |

## Session summary

- Accepted:
- Iterate:
- Deferred:
- Credit preflight (session total):

## Brief notes

_Produce fullscreen and chat avatars assuming **3D first**. Include idle, listening, thinking, speaking, muted, and error states. Add 2D fallback stills only as a contingency set._

## Completion gate

- [x] CQ01 resolved (3D-first direction)
- [ ] All worked briefs have QA and decisions
- [ ] Soul Character training only if user explicitly requested reusable identity
- [ ] Status → `session-closed`
