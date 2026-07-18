# C1 focused review — repair B schedule, water, check-in

## Assignment

- Role intent: Terra-high independent code/accessibility reviewer (spawned runtime remains W-MODEL).
- Read only. Do not edit product, verifier, docs, screenshots, or git state.
- Review only the completed Repair B changes in S41/S44/S45.

## Sources

- `workers/repair-b-schedule-water-checkin.md`
- `evidence/repair-b-schedule-water-checkin.md`
- The three owned screen files and their active hifi specs.
- Current C1 verifier assertions for those screens.

## Required checks

1. S41 selected date and Day/Week/Month labels, content, populations, and announcements agree; non-Thursday days do not borrow Thursday data; cold-start exits are equivalent.
2. S44 chart/visible gap share one weekday key; delete modal is inert, trapped, Escape/cancel restores exact opener, confirmation focuses surviving Undo, and exact target remains named.
3. S45 empty has no fabricated mood/context/ranges/provenance and Save is disabled; Cancel is a same-origin real exit; retry/save produce one exclusive success state with reachable safety/data controls.
4. Meaning-bearing owned copy is ≥12px/credible AA; no trust or state regression.

## Output

Send Sol a concise PASS/FAIL with Critical/High/Medium findings and exact file/line evidence. Do not write a report file; the original three full-family reviewers remain the close gate.
