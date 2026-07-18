# VISUAL-004 — Worker Task Packet A1-B

- Packet status: `accepted by Sol 2026-07-10`
- Parent batch: `VISUAL-004-A1-auth-entry`
- Packet ID: `A1-BUILDER-B`
- Issued by: Codex root / Sol
- Worker profile / harness: native Codex implementation subagent
- Model-routing policy: `gpt56-tiered`
- Worker agent type / model / effort: implementation / requested `gpt-5.6-terra` (exact runtime model unexposed) / high
- Runtime intake source: `plans/batches/VISUAL-004-A1-auth-entry/BATCH.md`
- Source hierarchy: root guidance + VISUAL-001 DVF decisions/reference direction + current specs/canon/live code
- Tie-breaker: DVF-01 warm-dark and DVF-07 all-caps `CIA` override stale warm-light/`Cia` text
- Active root: `balencia-screens/`
- Verify commands: `npm run typecheck`, `npm run verify:copy`, `npm run verify:brand`
- Evidence path: `plans/batches/VISUAL-004-A1-auth-entry/evidence/worker-builder-b.md`
- Timeout / stop: one bounded implementation turn; stop on source conflict, shared-root need, unlisted file need or failed type/copy/brand gate that cannot be fixed in allowed files

## Exact scope

Implement A1 screens 03d, 03e and 04 against the current audit/specs and locked foundation. Make local visual-prototype state operable and capability-honest without API/auth/backend work.

## Source links

| Source | Locator | Why |
|---|---|---|
| `VISUAL-001/audit/A1-auth-entry.md` | systemic roots + screens 03d/03e/04 | exact open defects/acceptance |
| `VISUAL-001/{DECISIONS,REFERENCE-DIRECTION}.md` | DVF-01/07/08/09/10 | warm-dark, CIA, accepted direction/foundation |
| `hifi-screens/{03d-complete-profile,03e-whatsapp-enrollment,04-sign-in}.md` | full specs | content, states, safety, accessibility |
| `canon/{COMPACT-CANON,COMPONENT-CATALOG}.md` | cross-cutting patterns | system rules |
| shared kit/live S03 | read-only | accepted APIs and auth sentinel |

## Allowed files

| Path | Operation |
|---|---|
| `balencia-screens/src/components/hifi/screens/auth/S03dCompleteProfile.tsx` | edit |
| `balencia-screens/src/components/hifi/screens/auth/S03eWhatsappEnrollment.tsx` | edit |
| `balencia-screens/src/components/hifi/screens/auth/S04SignIn.tsx` | edit |
| `plans/batches/VISUAL-004-A1-auth-entry/evidence/worker-builder-b.md` | write evidence |

## Required implementation proof

- S03d native editable names and native/selectable DOB/gender controls; honest null distinct from selection; provenance matches values; Save/Skip visible; no fake required consent; full privacy controls reachable.
- S03e optional provider-neutral channel preview: explicit unchecked opt-in before phone collection, equally operable Skip, native 16px phone/OTP controls, unambiguous phase, STOP/revoke/delete, honest visual-prototype/provider-unavailable feedback and no provider logo.
- S04 native labelled/autofill email/password, reveal, remember off, forgot/sign-up/guest/support and social actions; full-width width-locked CTA; default separated from offline/wrong-credential/429/loading states with no offline-sync or real biometric overclaim.
- Use local state and build-safe query fixtures when needed for evidence. Use 44px targets, authored focus, reduced motion and AA semantic text. Do not simulate real auth/provider success.

## Denied actions

- Do not edit any shared kit/token/global/index/registry file, S03, another screen, spec/canon, batch/ledger/handoff, package/lock file or generated asset.
- Do not touch `yhealth-app`, Figma, Railway, backend/API/auth services, production data, secrets or deployments.
- Do not decide final readiness or create an unofficial/provider logo.
- If a shared repair is required, stop and report the exact root to Sol.

## Worker output

Write the evidence path with agent/runtime provenance available, files read/changed, acceptance mapped per screen, commands/results, screenshots needed, and blockers. Output is evidence until Sol verifies it.

## Orchestrator review checklist

- [x] Packet complete before delegation; file ownership disjoint.
- [x] Only allowed files changed and denied actions untouched by the worker.
- [x] Source hierarchy and all three acceptance contracts satisfied after serialized Sol integration repairs.
- [x] Type/copy/brand results recorded; root full gates pass.
- [x] Root accepted the worker evidence and recorded shared verifier/state follow-up in batch closeout.
