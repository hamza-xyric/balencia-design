# VISUAL-003 worker packet — independent design acceptance

- Packet status: `completed; final recommendation ACCEPT`
- Parent batch: `VISUAL-003-seven-screen-pilot`
- Packet ID: `PILOT-INDEPENDENT-DESIGN`
- Issued by: Codex root / Sol
- Worker profile: fresh native Codex collaboration reviewer; no pilot implementation ownership
- Model-routing policy: `gpt56-tiered`
- Worker agent type: independent visual/UX reviewer
- Worker model / effort: requested `gpt-5.6-terra` / high; actual model is not selectable or exposed
- Source hierarchy: latest user direction → `VISUAL-001/REFERENCE-DIRECTION.md` and `DECISIONS.md` → current code/render → current seven hifi specs and audits
- Active root: `balencia-screens/`
- Evidence path: `plans/batches/VISUAL-003-seven-screen-pilot/evidence/review-design.md`
- Timeout / stop condition: one bounded read-only review turn; stop if evidence is missing or a source conflict cannot be resolved

## Exact scope

Independently review the rendered seven-screen pilot (`03,07,11,12,26,43,80`) against the accepted Quiet orbit / burnished ember direction. Do not implement or repair anything.

## Required sources and evidence

- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/REFERENCE-DIRECTION.md`
- `.../pilot/after/{03,07,11,12,26,43,80}.png`
- `.../pilot/states/{07-listening,11-listening,12-operations,26-media,43-price-exits,80-privacy}.png`
- `.../baselines/local-baseline/{03,07,11,12,26,43,80}.png`
- `.../pilot/pilot-after.json`
- Current seven screen modules plus shared orb, action, signature-icon, Life Power and PaywallLock components only as needed to explain a rendered finding

## Review lenses

- Visual hierarchy, warm-dark atmosphere, density, safe areas, scroll intent, and 390×844 composition.
- CTA/state coherence with the deep burnished action palette and visible focus/pressed affordance.
- Structural distinction between idle/listening CIA states at compact and hero sizes with reduced motion.
- Signature vocabulary consistency and official-logo boundary; flag generated or approximate branding.
- Life Power readability and one-payload integrity as visible in screen 12.
- Generated HIFI-26-01/HIFI-80-01 crop quality, privacy safety, and whether either looks like a UI icon or false provider mark.
- Paywall value visibility, non-coercive exit hierarchy, and provider/media state honesty.
- Any High/Critical reason to reject the pilot; otherwise record Medium/Low polish separately.

## Allowed files

| Path | Operation |
|---|---|
| `plans/batches/VISUAL-003-seven-screen-pilot/evidence/review-design.md` | write evidence only |

Stage the evidence file under `/Users/hamza/Marketing Portal/.codex-staging/balencia-design/` with the identical repo-relative path, edit via `apply_patch`, then copy only that file back with approved `rsync -aR`.

## Denied actions

- No source, shared kit, asset, spec, decision, ledger, batch, handoff, Figma, Railway, backend, API, auth, or `yhealth-app` edit.
- No commit, stage, reset, stash, clean, deploy, browser mutation, or worker fan-out.
- Do not make the final readiness decision; recommend accept/reject with evidence for Sol.

## Output

Write a concise evidence file with verdict recommendation, files/images inspected, findings by severity and screen, cross-screen consistency notes, residual polish, and explicit confirmation that you made no implementation edits.
