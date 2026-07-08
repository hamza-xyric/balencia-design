# Remediation Waivers — 104-screen hifi package

Waivers are named, scoped, and carry rationale + closure conditions. Only
founder-signed scope exclusions survive at A++/A+++ (plan §6, tier ladder §2).

| ID | Scope | Status | Batch |
|---|---|---|---|
| W-TRUNC-40 | Screen 40 text-density warning | ACTIVE (plan-authorized, RW-020) | R0 |
| W-TRUNC-80 | Screen 80 text-density warning | ACTIVE (plan-authorized, RW-020) | R0 |

---

## W-TRUNC-40 — Screen 40 (Community Chat Rooms) intentional truncation

- **Warning (strict harness):** `Potential visible text overflow` on three room
  preview lines (`5 members · Sarah: Great workout this morning.` scrollWidth
  279 > clientWidth 234, and two analogous lines).
- **Why waived, not fixed:** the room-list rows preview the latest message in a
  single line by design; the overflow is an ellipsized `truncate` on `<p>`
  copy — standard chat-list idiom (canon §5 sentence-case copy is unaffected;
  no data is hidden that the row is obligated to show). The audit manually
  judged this low-risk intentional truncation (REPORT.md, strict warning
  breakdown).
- **Binding constraint (plan §6.6):** copy edits on these strings are BANNED in
  R3 — the warning is waived with rationale, never "fixed" by shortening copy
  to appease the scanner.
- **Closure condition:** waiver is re-affirmed (or superseded by founder
  decision) at R11; it prints in `WAIVERS.md` § of the handoff packet.
- **Evidence:** `R0/visual-104-baseline-strict.json` screen 40 (SHA 737d5ad);
  audit `evidence/strict-warning-list.txt`.

## W-TRUNC-80 — Screen 80 (Music Coach) intentional truncation

- **Warning (strict harness):** `Potential visible text overflow` on the
  now-playing subline (`CIA matched to your planned pace window` scrollWidth
  246 > clientWidth 218).
- **Why waived, not fixed:** the now-playing card shows a single-line
  ellipsized track-context caption (`truncate` on `<p>`); marquee/two-line
  treatments would break the player idiom. Audit judged it low-risk intentional
  truncation.
- **Binding constraint (plan §6.6):** copy edits on this string are BANNED in
  R3. (Note: the string's `CIA` casing WILL change to `Cia` in R1 — that is the
  Cia convergence batch acting on casing, not a truncation "fix"; the truncation
  itself stays.)
- **Closure condition:** re-affirmed at R11; printed on the handoff packet.
- **Evidence:** `R0/visual-104-baseline-strict.json` screen 80 (SHA 737d5ad);
  audit `evidence/strict-warning-list.txt`.
