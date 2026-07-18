# VISUAL-004 — Worker Task Packet A1-A

- Packet status: `accepted by Sol 2026-07-10`
- Parent batch: `VISUAL-004-A1-auth-entry`
- Packet ID: `A1-BUILDER-A`
- Issued by: Codex root / Sol
- Worker profile / harness: native Codex implementation subagent
- Model-routing policy: `gpt56-tiered`
- Worker agent type / model / effort: implementation / requested `gpt-5.6-terra` (exact runtime model unexposed) / high
- Runtime intake source: `plans/batches/VISUAL-004-A1-auth-entry/BATCH.md`
- Source hierarchy: root guidance + VISUAL-001 DVF decisions/reference direction + current specs/canon/live code
- Tie-breaker: DVF-01 warm-dark and DVF-07 all-caps `CIA` override stale warm-light/`Cia` text
- Active root: `balencia-screens/`
- Verify commands: `npm run typecheck`, `npm run verify:copy`, `npm run verify:brand`
- Evidence path: `plans/batches/VISUAL-004-A1-auth-entry/evidence/worker-builder-a.md`
- Timeout / stop: one bounded implementation turn; stop on source conflict, shared-root need, unlisted file need or failed type/copy/brand gate that cannot be fixed in allowed files

## Exact scope

Implement A1 screens 01, 02, 03b and 03c against the current audit/specs and locked foundation. Make local visual-prototype state real and operable without API/auth/backend work.

## Source links

| Source | Locator | Why |
|---|---|---|
| `VISUAL-001/audit/A1-auth-entry.md` | systemic roots + screens 01/02/03b/03c | exact open defects/acceptance |
| `VISUAL-001/{DECISIONS,REFERENCE-DIRECTION}.md` | DVF-01/07/08/09/10 | warm-dark, CIA, accepted direction/foundation |
| `hifi-screens/{01-splash-screen,02-motion-carousel,03b-otp-verification,03c-consent}.md` | full specs | content, states, safety, accessibility |
| `canon/{COMPACT-CANON,COMPONENT-CATALOG}.md` | cross-cutting patterns | system rules |
| shared kit/live S03 | read-only | accepted APIs and auth sentinel |

## Allowed files

| Path | Operation |
|---|---|
| `balencia-screens/src/components/hifi/screens/auth/S01Splash.tsx` | edit |
| `balencia-screens/src/components/hifi/screens/auth/S02MotionCarousel.tsx` | edit |
| `balencia-screens/src/components/hifi/screens/auth/S03bOtpVerification.tsx` | edit |
| `balencia-screens/src/components/hifi/screens/auth/S03cConsent.tsx` | edit |
| `plans/batches/VISUAL-004-A1-auth-entry/evidence/worker-builder-a.md` | write evidence |

## Required implementation proof

- S01 official logo/lockup only, one status announcement, decorative reveal and reduced-motion final still.
- S02 four locally navigable panels, `Slide X of 4`, 44px Skip, one full-width Next/Get started CTA, no implementation copy or unlabeled personal/demo claim.
- S03b native OTP entry supporting focus/typing/backspace/paste, masked destination, honest disabled resend cooldown, full-width width-locked verify and reachable local state feedback.
- S03c native required checkboxes default false, optional marketing native switch default false, distinct Terms/Privacy document links/actions, 0→2 count and disabled→enabled full-width Continue.
- Use 16px native input text, 44px targets, authored focus, reduced motion and AA semantic text. Do not add a generated logo/raster UI or raw action colors.

## Denied actions

- Do not edit any shared kit/token/global/index/registry file, S03, another screen, spec/canon, batch/ledger/handoff, package/lock file or generated asset.
- Do not touch `yhealth-app`, Figma, Railway, backend/API/auth services, production data, secrets or deployments.
- Do not decide final readiness or create an unofficial logo.
- If a shared repair is required, stop and report the exact root to Sol.

## Worker output

Write the evidence path with agent/runtime provenance available, files read/changed, acceptance mapped per screen, commands/results, screenshots needed, and blockers. Output is evidence until Sol verifies it.

## Orchestrator review checklist

- [x] Packet complete before delegation; file ownership disjoint.
- [x] Only allowed files changed and denied actions untouched by the worker.
- [x] Source hierarchy and all four acceptance contracts satisfied after serialized Sol integration repairs.
- [x] Type/copy/brand results recorded; root full gates pass.
- [x] Root accepted the worker evidence and recorded shared verifier/state follow-up in batch closeout.
