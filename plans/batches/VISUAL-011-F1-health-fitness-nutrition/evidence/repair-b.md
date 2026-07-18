# VISUAL-011 F1 — repair B evidence

Owned repairs only: `S53BreathingExercises.tsx` and `S54Meditation.tsx`.

## S53

- Safety and privacy overlays continue to use the established `E1Modal` focus-management contract and now pass an explicit opaque `ink-900` surface, border, and shadow (`S53BreathingExercises.tsx:11`). This prevents underlying exercise text/cards from colliding visually with blocking consent content while retaining the frozen `risky-technique-gate` state.
- Frozen state names, technique acknowledgement, health stop guidance, pacer semantics, and HIFI-53-01 disposition remain unchanged.

## S54

- Replaced the local presentation-only dialog wrapper with `E1Modal` and an opaque `ink-900` surface (`S54Meditation.tsx:9,38-53`). The shared contract provides initial focus, Escape close, Tab/Shift+Tab containment, background inerting, and focus restoration; `closeSession` is used consistently for close/Done paths (`:37-53`).
- `Ask CIA` now produces a visible `role=status` local-preview outcome stating that no message, account data, or network request was sent (`:59-63`).
- `View premium details` now produces a visible qualified local-preview outcome stating that no checkout, payment, account, or navigation occurred (`:72`).
- Success copy now says minutes were added to the **local preview** log, avoiding an account persistence claim (`:46`).
- All frozen S54 query fixtures and their view mapping remain intact (`:15-28`).

## Verification

- `npx eslint src/components/hifi/screens/health/S53BreathingExercises.tsx src/components/hifi/screens/health/S54Meditation.tsx` — **PASS**, zero issues/warnings.
- `npx tsc --noEmit` — **PASS**.
- No shared, registry, router, package, other-screen, server/browser, git, external, or `yhealth-app` mutation.
