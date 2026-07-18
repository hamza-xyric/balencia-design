# VISUAL-006 B1 independent accessibility/trust review

- Final outcome: `ACCEPT`
- Reviewer: `/root/b1_review_trust`
- Posture: read-only; no files edited.
- Accepted current set: product fingerprint `ba5b4ea6fdd9d13fd7c02f081ccfb4e04aa39b9fdd049912dd21848b9e68796b`, verifier/API fingerprint `18cfc1b1a455ce2b5dcd937d98a739d1c96805b7c6565ae0067e695d195e3c2e`, pre-close authority fingerprint `70420f1708d27bb26cc8cf68fa6344af93f1d2dddada651ed11c85aa242ff795`, 111 isolated contexts/nonces and 109 exact promoted PNGs.

## Initial rejection and disposition

| Trust/accessibility challenge | Repair and final evidence | Final disposition |
|---|---|---|
| S75/S99 dialogs could escape the phone viewport and lacked complete focus entry/restore | Health sharing and WhatsApp provider/delete flows render through phone-bound overlays, make the underlying screen inert/hidden, trap focus, close on Escape and restore the exact trigger. | closed |
| S11 claimed microphone capture in a visual-only prototype | All user and accessibility copy now describes a local voice preview; the microphone is never opened or connected. The capability guard rejects capture APIs. | closed |
| S10 consent choices were visually asymmetric | Both choices use identical 52px secondary treatment and remain equally reachable. | closed |
| S75 typing and S76 presence/XP claims implied live external state | Point-of-claim copy explicitly says bundled activity/presence/XP fixture and not live; queued messages remain private with intended destination recorded separately. | closed |
| S76 recap and group-action confirmations were inline/offscreen and unannounced; group membership action lacked trigger semantics | Recap controls use equal sensitive-choice styling. Group action is a phone-bound modal with inert background, focus entry/trap, Escape, exact focus restoration, `aria-haspopup`, `aria-expanded`, `aria-controls`, equal choices and local-only result. `76-group-action-confirm.png` is canonical evidence. | closed |
| S79 partial and S99 revoked states retained unsupported derived/actions state | Partial transcript-derived metrics/actions stay pending/disabled; revoked/no-history provider controls are disabled and explain the unavailable truth. | closed |
| 8–10px semantic copy remained in B1 | The verifier fails semantic copy below 11px; only two-letter avatar initials remain at 10px as the explicit non-semantic exemption. | closed |

## Final statement

The focused post-repair review confirms the prior Critical and High findings are closed. S76 confirmation is phone-bound, background-inert, focus-trapped, Escape-closeable with exact trigger focus restoration and correct expanded/control semantics. S75 health sharing and S76 recap posting use identical secondary styling and 157×52 geometry for Cancel and affirmative choices. No new or unresolved Critical, High or Medium accessibility, ethics, consent, privacy or capability-honesty finding remains.
