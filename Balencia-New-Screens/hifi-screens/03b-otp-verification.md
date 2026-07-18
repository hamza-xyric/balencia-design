# 03b-otp-verification - A+++ hi-fi mobile spec

## Header
- **Source ID:** 03b
- **Source spec:** `Balencia-New-Screens/screens/03b-otp-verification.md`
- **Evidence:** screens/03b-otp-verification.md, work/briefs/03b.md, work/drafts/03b.md
- **Route(s):** `/auth/verify`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Confirms the code the user just received and turns that into a created account.
- **Premium Visual Director:** make verification code card the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** OTP verification protects account creation with masked destination copy, expiry, resend limits, and no account enumeration.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
390x844 Reference Frame (Safe Area Insets Applied)
+-------------------------------------------------+
| [Status Bar: Time / Battery]                     |
|                                                 |
|                                                |
|                                                 |
|                                                 |
|                    Balencia                     |
|                                                 |
|             Verify your *email*                 |
|      We sent a 4-digit code to j***@...         |
|                                                 |
|                                                 |
|       +-----+ +-----+ +-----+ +-----+           |
|       |  o  | |  o  | |  o  | |  o  |           |
|       +-----+ +-----+ +-----+ +-----+           |
|                                                 |
|               Error / Status Text               |
|                                                 |
|         Resend code (0:59)  [############]      |
|                                                 |
|                                                 |
|                                                 |
|                                                 |
| +---------------------------------------------+ |
| |                   verify.                   | |
| +---------------------------------------------+ |
|                                                 |
| [Home Indicator]                                |
+-------------------------------------------------+

Route handling: `/auth/verify`
```

## Focal Hierarchy
- **Dominant focal moment:** verification code card; it should be visually singular, not one tile among many.
- **Secondary layer:** Brand & context zone with CIA only when the source supports a synthesized read.
- **Operational layer:** Verification zone, Action zone, 390x844 Reference Frame, | [Status Bar.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma-backed default: warm-light paper shell, centered sparse verification form, peach blush corner atmosphere, circular OTP cells, and bottom orange CTA.
- Dark glass OTP cells remain a theme variant only; the Figma-aligned build uses white circular cells with gray rings.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*verification*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma alias:** `Opt Verification` (treat as OTP verification in canonical copy; do not propagate the typo into production labels).
- **Evidence tier / light-shell exception:** screenshot-derived Figma direction overrides the older compact canon's dark-only note for this auth-family pass.
- **Surface mode:** warm-light auth shell, back chevron in a rounded 36-40px control, title left-aligned in the upper third, helper copy beneath, centered timer `00:21`, four circular digit cells with gray 1px rings, `Resend Code` ghost text, and bottom full-width orange `Verify` CTA.
- **Success companion:** Figma shows a separate auth `Congratulations` screen with the orange scalloped check badge. Keep this as the success terminal after verification, then route to consent/profile as the source spec requires.

## Components
- **TopBar** - transparent variant, single leading chevron (44px target), no title, no trailing actions. The scroll-to-`.glass-pill`-backdrop behavior in the catalog spec doesn't apply here: this canvas never scrolls, so the TopBar stays transparent for the screen's whole life.
- **NEW: OTPCluster / OTPDigitCell** - *rationale:* the catalog has no OTP-specific input; the closest primitive is `GlassPillInput`, but that component is defined at `.glass-pill`'s signature radius 999, which would turn a 56x64 digit cell into a stadium/oval rather than a tactile square. **Fix:** OTPDigitCell borrows `.glass-pill`'s *material* (`rgba(10,10,15,.55)`, blur 24px, border `1px rgba(255,255,255,.10)`) but sets radius to **14** - the canon input radius (CANON 6) - since these are inputs, not pills. Four cells, 56x64px each, 12px gaps.
- **Figma light OTP override** - four circular 54-58px cells, white fill, 1px warm-gray ring, centered digit/dash, active ring orange, error ring orange with status copy. Use this override for the Figma-backed default.
- *Focus:* 1.5px burnt-orange border (`--glow-you`) + soft bottom-anchored glow bleed - effort, in progress.
- *Error:* solid 2px burnt-orange border, **no glow** (glow is reserved for active/positive states per CANON 3 - a breathing glow on a wrong code would read as "good, keep going," which is dishonest). See Visual treatment for the correction this replaces.
- **ChargeMeter** - resend cooldown, corrected from the draft's "MomentumBar" (see Visual treatment). Depleting 60s fill in `--glow-you`; on successful resend it snaps to full and flashes `--glow-done` once, then resumes depleting in orange. Tabular-nums countdown alongside the fill.
- **BtnGhost** - the resend control itself (orange label, 44px target); disabled/muted while the ChargeMeter is still draining.
- **BtnPrimary** - orange fill, label `verify.`. Disabled (40% opacity) until 4 digits are present. Loading state is **spinner-only** per catalog (`label -> spinner, width locked`) - the draft's "Verifying" text label is removed; the catalog gives every button the same loading contract and this screen doesn't need an exception.
- **OfflineBanner** - glass-pill honest-status banner for the offline case. Variant **rate-limited** reuses the same banner family (not a new component) with swapped copy and a live countdown, since the catalog only defines one honest-status-banner pattern (`OfflineBanner / SyncStatus`) and a second bespoke "toast" component would just fragment that language for no gain.

## Data Honesty
- This screen carries no lifestyle/health metric, so no GlassStatCard/KPIRow appears here - that's the honest scope of the honesty invariant for a pre-auth security gate, not a bypass of it. The same real / low-confidence / honest-null discipline is applied to the system state that *does* exist:
- **Masked email address:**
- *   *Real:* `j***@email.com` - provenance: passed forward from sign up [03].
- *   *Honest-null (missing email payload):* falls back to `We sent a 4-digit code to your email.` - never fabricates a fake address string.
- *   *(No ChipProvenance chip here - this is routing context, not a synced metric; the chip is reserved for real data pulled from a source per CANON 7.)*
- **Resend cooldown (60s), via ChargeMeter:**
- *   *Real:* `Resend code (0:59)` with depleting orange fill - provenance: local system clock.
- *   *Low-confidence:* not applicable - a device clock is deterministic, there's no confidence band to express.
- *   *Honest-null:* the ChargeMeter stays hidden until the server confirms the code actually dispatched - no countdown is ever shown for a code that may not exist yet.
- **Rate-limit cooldown (5m):**
- *   *Real:* `Try again in 4:59` in the rate-limit banner, sourced from server retry-after or local lockout timestamp.
- *   *Low-confidence:* not applicable when retry-after is present; if absent, show `try again in a few minutes` without a number.
- *   *Honest-null:* no rate-limit row until a limit exists.

## Consent and Safety
- Security copy uses the masked email only, never raw destination if masking fails. Expired, invalid, and rate-limited states never reveal whether another email has an account.
- Resend limits, expiry, and cooldown are visible and screen-reader announced. No lifestyle source chips, export, revoke, or delete controls belong on this OTP gate.
- Keep navigation targets aligned to `/auth/verify`. Do not add alternate vanity routes.

## States
- **Default (cold-start):** first cell auto-focused, numeric keyboard raised, cells empty, ChargeMeter draining, CTA disabled.
- **Partial entry:** entered digit scales 0.5 -> 1.0 as it lands. CTA stays disabled until all 4 cells are filled.
- **Loading (verify pending):** BtnPrimary label swaps to spinner, width locked. Cells stay visible but non-editable; keyboard dismisses.
- **Error (invalid code):** cells take the solid 2px burnt-orange border (see Visual treatment correction). Shake - 3 oscillations - *only* on the 3rd consecutive miss. Cells clear, focus returns to cell 1, status text appears below in paper-100 (not a "danger" color; the copy itself carries the warmth).
- **Error (expired code):** same solid-orange border treatment, no shake. Cells clear. ChargeMeter completes instantly (jumps to empty). Resend BtnGhost becomes active/orange immediately.
- **Error (rate limited):** OfflineBanner (rate-limited variant) takes the top of the screen. CTA, cells, and resend drop to 40% opacity and stop responding to touch - the same disabled-opacity value the catalog uses everywhere else, not a bespoke number. Countdown lives inside the banner as a live region (see Accessibility).
- **Error (network/offline):** OfflineBanner (offline variant) appears at the top. CTA reverts to default enabled state; entered digits are preserved, nothing is lost to a dropped connection.
- **Resend success:** resend copy becomes `Code sent`; ChargeMeter fills to full with a momentary `--glow-done` flash, then resumes its 60s orange drain.
- **Success (verified):** BtnPrimary fires its 600ms green pulse; immediate stack push to [03c].
- **Skeleton:** not applicable - this screen has no server-fetched layout to mask; it's local input plus an immediate handshake, and a skeleton state here would be theater, not honesty.

## Motion
- **Easing:** physical, `cubic-bezier(0.22, 1, 0.36, 1)`; focus and digit-scale transitions run 150-200ms.
- **Glow behavior:** OTPDigitCell focus-glow breathes on a 4s ease loop (matching CANON 6's hero-glow breathe cadence); the CTA success pulse is a single 600ms outward radiation, not a loop.
- **Haptics:** light selection tick on auto-advance  warning haptic on invalid/expired code  success haptic on verification.
- **Interactions:** auto-advance on entry; backspace clears current cell, then steps back; clipboard-paste of a 4-digit code fills all cells at once; tapping outside dismisses the keyboard.
- **Reduced motion (`prefers-reduced-motion: reduce`):** all transitions become instant cuts. The shake is skipped entirely (its meaning is already carried by the status copy and the border). Breathing/pulsing glows are replaced by their static equivalents - a fixed 1.5px orange border for focus, a fixed 2px orange border for error - so no information is lost, only the animation.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/auth/verify`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** ink title/helper text on white/paper background, orange active/error ring against white, and disabled gray text must be checked in the warm-light shell.; **Targets:** back chevron 44x44px; BtnPrimary 52pt tall, full width; each OTPDigitCell 54-58px, comfortably tactile.; **Screen-reader labels:** each cell announces its position and value state; countdown uses a polite live region.
