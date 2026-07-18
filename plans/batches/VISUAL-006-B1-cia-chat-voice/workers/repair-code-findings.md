# VISUAL-006 B1 repair packet — code-review findings

- Worker role: bounded implementation writer; output remains evidence until Sol verification.
- Ownership: `balencia-screens/src/components/hifi/screens/cia/S51VoiceCallHistory.tsx` and `S74ConversationsHub.tsx` only.
- Forbidden: every other file, shared kit, verifier, docs, assets, `yhealth-app`, Figma, backend, package/lock, git mutation.
- Source authority: current B1 batch/verification matrix; current S51/S74 specs; B1 audit; live accepted visual foundation.

## Repair S51

1. Separate schedule-success from recording-deletion success. A confirmed recording deletion must visibly change the selected Morning check-in recording from retained to deleted and must not show “Schedule saved”.
2. The already-deleted Quick question recording must not expose an operable delete action.
3. Deletion confirmation must name the selected session/record rather than always hard-coding the wrong row.
4. Preserve the exact existing state/root/tab/panel contracts, native controls, focus trap/restore, equal Cancel geometry, safety access and current styling.

## Repair S74

1. In `disabled`, keep private Safety and crisis guidance reachable, matching the visible promise; keep non-safety conversation actions disabled.
2. Preserve offline base truth across overlay open/close. Opening search/safety/etc. must not overwrite the base offline state so Escape/close returns to the offline cached banner and disabled compose contract.
3. Preserve exact fixture root/filter/panel semantics, search dialog focus trap/restore, roving filter tabs, internal routes and existing styling.

## Verification

- Run targeted ESLint on both owned files and `npm run typecheck`.
- Manually reason through the exact transitions above and report commands/results.
- Do not edit the B1 verifier; Sol will add the independent regression assertions.
- Final response: files changed, exact behavior repaired, verification, residual risk. No commit/stage/push.
