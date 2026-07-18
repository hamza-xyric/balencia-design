# VISUAL-002 — Generated reference direction

- Status: `closed`
- Theme: Replace the unavailable external Image 1 and Image 2 with two original, project-grounded direction boards, then lock the CIA orb, CTA, and signature-icon contract without changing product code.
- Session cap: 4 bounded items
- Active lane: `Balencia visual prototype finalization`
- Active root: `balencia-screens/` (read-only in this batch)
- Evidence root: `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/`
- Source links: latest user authorization; `plans/next-session-handoff.md`; `VISUAL-001/{FINDINGS-ADDENDUM,DECISIONS,IMPLEMENTATION-PLAN}.md`; current canon; creative reference; live kit and seven pilot baselines.
- Archived-source rule: retired routes, retired light-theme fragments, old `SIA`, and old `Cia` casing guidance cannot override the current 390×844 warm-dark/all-caps `CIA` contract.
- Tie-breaker: latest user instruction → active handoff/decisions → current canon and live kit → creative reference → historical material.
- Handoff status target: `READY WITH WAIVERS` for the seven-screen pilot
- Pre-development doc gate: `READY WITH WAIVERS`
- Documentation evidence path: `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/REFERENCE-DIRECTION.md`
- Goal lifecycle: `none` (the current thread has no active native goal; the earlier handoff's goal state did not carry over)
- Execution mode: `single-pass`
- Wait policy: `none`
- Legacy loop primitive: `n/a`
- Runtime profile: `codex-native`
- Model-routing policy: `inherit`
- Orchestrator role: Codex root / Sol acceptance authority through Forgeflow artifacts
- Orchestrator model / effort: current Codex model not exposed by the collaboration surface / not proven
- Worker backend: none
- Provider: Codex built-in image generation tool for reference boards only
- Model: exact image-model identifier not exposed
- Worker agent type / model / effort: n/a
- Endpoint class: native
- Worker task packet: n/a
- Worker output path: n/a
- Saved workflow: n/a
- Usage guard: two image-generation calls plus at most one targeted repair per board
- Verify command: `sips -g pixelWidth -g pixelHeight <board-1> <board-2> && shasum -a 256 <board-1> <board-2> && git diff --check && git diff --name-only -- balencia-screens/src`
- Closeout writes: this batch, `REFERENCE-DIRECTION.md`, `DECISIONS.md`, remediation ledger, and `plans/next-session-handoff.md`.

## Pre-development gate

- [x] Active docs, archived docs, and tie-breaker source identified.
- [x] Source links resolve to the active visual-finalization lane.
- [x] Deterministic evidence paths and verification commands recorded.
- [x] Goal, execution, wait, runtime, routing, and provenance fields recorded.
- [x] No worker is selected; no worker packet is required.
- [x] Official logo is immutable; generated UI icons are forbidden as production assets.
- [x] Generated boards are concept evidence only; production orb/buttons/icons remain CSS/SVG/code-native.
- [x] User authorization on 2026-07-10 supersedes the missing-external-reference stop condition by authorizing Sol to generate original replacements and continue.
- [x] Gate result: `READY WITH WAIVERS`.

Waivers:

| Owner | Limited evidence | Next action | Closure condition | Why work may proceed |
|---|---|---|---|---|
| Sol | Exact built-in image-model ID is not exposed | Record tool path, prompt, outputs, hashes, and visual inspection | Both boards are inspectable and contract traits are source-checked | The outputs are non-production concept evidence; all production implementation remains deterministic code/vector work |
| Sol | Root founding brief and root `_progress.md` are absent | Use root/lane guidance, handoff, current canon, remediation ledger, and batch files | Durable truth is updated in the existing remediation ledger and handoff | This is a bounded remediation slice, not a new product-definition batch |

## Item checklist

| Item | Locator | Owner | Evidence | Status |
|---|---|---|---|---|
| REF-02A Generate CIA orb direction board | generated Image 1 | Sol | `VISUAL-001/references/image-1-cia-orb-direction.png` + prompt | completed |
| REF-02B Generate CTA/icon direction board | generated Image 2 | Sol | `VISUAL-001/references/image-2-cta-icon-direction.png` + prompt | completed after one targeted tonal repair |
| REF-02C Inspect and lock reference contract | orb, CTA, signature icons, forbidden traits | Sol | `VISUAL-001/REFERENCE-DIRECTION.md` | accepted for pilot |
| REF-02D Persist direction decision | decisions, ledger, handoff | Sol | scoped diff + verification record | completed; handoff advances with VISUAL-003 pilot closeout |

## Completion gate

- [x] Both generated boards are visually inspected, attributed, hashed, and stored in the project evidence root.
- [x] Transferable and forbidden traits are explicit for orb, CTA, and signature icons.
- [x] WCAG AA, reduced motion, official-logo immutability, and code-native production constraints remain intact.
- [x] Seven-screen pilot is retained with evidence.
- [x] `balencia-screens/src` remains unchanged in this batch.
- [x] `git diff --check` passes for the scoped writes.
- [x] `DECISIONS.md` and remediation ledger reflect the accepted direction; the handoff advances with the immediately following VISUAL-003 pilot closeout.

## Verification — 2026-07-10

- Image 1: 1672×941; SHA-256 `6e3d058bb0be7e4ad6b96e8269e304e705870583302001ce022ff0b5171faacd`.
- Image 2: 1586×992; SHA-256 `9d527e0778e9268c0748a0dcd498e91649c719b88a63a63aa2765ae76fa79a96`.
- Measured CTA pairs in `REFERENCE-DIRECTION.md` meet or exceed WCAG AA; bright brand orange plus paper was explicitly rejected at 2.95:1.
- `git diff --check` — PASS.
- `git diff --name-only -- balencia-screens/src` — empty; reference slice changed no product code.
- Sol visual inspection — PASS for pilot direction; not a rollout acceptance.
