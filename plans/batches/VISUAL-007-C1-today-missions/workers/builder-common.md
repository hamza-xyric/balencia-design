# C1 builder common contract (read first, applies to builder-a/b/c/d)

- Parent: VISUAL-007-C1-today-missions (BATCH.md). Provenance: Claude Fable-native subagent (GLM 429 recorded).
- Repo root: `/Users/hamza/Desktop/balencia-design`. App root: `balencia-screens/`.
- You may edit ONLY the screen files named in your packet. DENIED: kit (`src/components/hifi/kit/**`), `globals.css`, registries (`today/index.ts`, `screens/registry.ts`, `src/data/screens.ts`), package files, specs, ledgers, any other screen, `yhealth-app/**`. If a fix seems to need a denied file, STOP that item and report it as a Fable-escalation instead.
- Visual-only prototype: NO network calls, timers polling servers, storage writes, external navigation, media/mic/camera APIs, new dependencies, global state. All outcomes local + truthful ("Saved in this preview", "Queued locally", "No external action taken").

## Mandatory pattern (clone from `src/components/hifi/screens/cia/S79CallSummary.tsx`)

1. `'use client'`; state union type; `?state=` fixture read once in `useEffect` via `new URLSearchParams(window.location.search)`, applied through `setTimeout(0)`.
2. Root attribute on `<main>`: `data-<name>-state={screenState}` (exact name in your packet) + `aria-busy` when skeleton.
3. A visually-rendered live status line (`role="status"`, polite) describing current fixture/local outcomes.
4. Skeleton state: neutral shimmer blocks (existing `.skeleton` utilities if present — check S79/S74 usage), controls disabled with reasons.
5. Offline/error states: honest copy, retry affordance, primary actions disabled with visible reason.
6. Success/pending: local-only, with undo where destructive.
7. `?action=` quick flows already handled by shell `PrototypeActionSheet` — do not duplicate.

## Quality bar (verifier-enforced — see VERIFICATION-MATRIX.md)

- Interactive targets ≥44×44 effective; editable text ≥16px; semantic text ≥12px; AA contrast (use paper-100/ink tokens; NEVER stack container opacity with text opacity on semantic copy).
- Native elements first: `<button>`, `<a>`, `<input type=checkbox|radio|range>`, real `role` only when unavoidable WITH keyboard handlers.
- Exactly one primary action (`BtnPrimary`) visible per screen; Cancel/decline/exit equally reachable; destructive actions name their exact target + confirm + undo.
- `focus-ring` class on all custom interactive elements; focus trap+restore on any modal/dialog you add; Escape closes.
- Reduced motion: no new keyframe animation without `motion-reduce:` fallback.
- Visible coach name: all-caps `CIA` only. Purple = CIA-exclusive. Green = success/completion/health only. Ten-domain registry names ONLY (Fitness, Sleep, Career, Nutrition, Finance, Faith, Productivity, Relationships, Wellbeing, Meditation) — never Health/Fit/Learning/Daily-as-domain.
- Kit imports from `@/components/hifi/kit` (see kit/index.ts). GlassPillInput now supports `multiline` + `rows`. ArcGauge now has role="img".
- Keep existing accepted visual composition where the recon marked FIXED-ALREADY/acceptable — repair defects, do not redesign.
- Read your screens' specs in `Balencia-New-Screens/hifi-screens/` before editing.

## Output contract

Final message: per-screen list of (defect → fix → file:line), any Fable-escalations, exact states implemented, and confirmation you ran `npx tsc --noEmit` clean from `balencia-screens/`.
