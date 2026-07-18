# VISUAL-004 A1 verification log

- Acceptance date: `2026-07-10 PKT`
- Scope: `01,02,03,03b,03c,03d,03e,04`
- Result: `PASS — Sol accepted with evidence-only waivers`
- Product/readiness limit: this is visual-prototype family acceptance, not production or final 104-screen certification.

## Deterministic gates

| Gate | Result | Durable evidence / note |
|---|---|---|
| `npm run check` | PASS | Zero errors. One pre-existing unrelated unused-import warning in `DomainDashboardHeader.figma.tsx`. Routes `104/104`; asset, copy and brand gates pass. |
| `npm run build` | PASS | Next.js production build compiled and statically generated `200/200` pages. Node emitted only the existing `module.register()` deprecation warning. |
| Strict A1 visual audit | PASS | `a1-after.json`: `8/8`, zero issues, zero warnings, zero missing phone frames, zero console-error screens. Defaults in `after/`. |
| A1 interaction/state audit | PASS | `a1-interactions.json`: eight screen groups, nine OTP fixtures, 42 isolated state/focus PNGs, zero console/page errors. Each open uses a same-origin navigation nonce and resets scroll. |
| Root redesign validator | PASS | `104` ledger rows pass; `104` screen files; no missing files, low scores, defect screens, false-pass rows or uncovered routes. |
| `git diff --check` | PASS | Root and forbidden submodule checks pass; no whitespace errors. |
| Independent code review | ACCEPT | All implementation/verifier findings repaired and rechecked. |
| Independent visual/source review | ACCEPT | Fresh complete defaults/states, source copy, visible provider honesty, picker/provenance and official-logo use accepted. |
| Independent accessibility/trust review | ACCEPT 100/100 | Native controls, focus, targets, reduced motion, consent parity, state honesty, throttled countdown announcements and isolated evidence accepted. |

## Evidence quality repairs made before acceptance

- Persisted screenshots are captured under a temporary animation/transition freeze; no discarded warm-up shot can restart finite motion.
- State output directories are cleaned before capture, so removed/renamed files cannot survive as stale evidence.
- Hash/query fixtures receive a unique same-origin navigation query, forcing fresh React state without `about:blank` origin artifacts.
- Every open resets the scroll container to `0`; S04 wrong-credentials and every other default are framed deterministically.
- Native checkbox/switch glyphs are audited through their larger associated-label pointer target when present.
- OTP rate-limit evidence resets timers, shows `Paused` rather than contradictory `Ready`, expires into an enabled state, and uses one throttled minute-bucket live announcement plus the resend milestone.

## Accepted residual waivers

| Waiver | Scope | Closure owner/trigger |
|---|---|---|
| Device VoiceOver/TalkBack and enlarged-text testing unavailable | Final certificate only; browser semantic, keyboard, focus, target and reduced-motion evidence passes here | R11 / external device evidence or explicit release waiver |
| Broad Axe unavailable | Final certificate only | R11 |
| Dirty-worktree evidence has no immutable family SHA | Final one-SHA 104-screen claim only | R11 after user-authorized commit state |
| Exact spawned runtime model/effort is unexposed | Provenance only; packets, agent IDs, ownership and root verification are recorded | Runtime support or persistent waiver |
