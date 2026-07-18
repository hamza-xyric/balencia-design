# 04-sign-in - A+++ hi-fi mobile spec

## Header
- **Source ID:** 04
- **Source spec:** `Balencia-New-Screens/screens/04-sign-in.md`
- **Evidence:** screens/04-sign-in.md, work/briefs/04.md, work/drafts/04.md
- **Route(s):** `/auth/signin`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Get a returning user back into their session in under two taps, with no friction beyond what security requires.
- **Premium Visual Director:** make trust-first auth card the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Sign in keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/auth/signin`.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
| [<-]                                           |
| +-------------------------------------------+|
| |   you're offline - we'll sync when back  ||  <- conditional, offline only
| +-------------------------------------------+|
|                                               |
|                   Balencia                   |
|                                               |
|         Welcome back. Let's pick up           |
|                your *momentum*.               |
|                                               |
| +-------------------------------------------+|
| |    email address                         ||
| +-------------------------------------------+|
| +-------------------------------------------+|
| |   password                             ||
| +-------------------------------------------+|
|                                               |
|  o Remember me                Forgot password?|
|                                               |
| +-------------------------------------------+|
| |                  Sign in                   ||
| +-------------------------------------------+|
|                                               |
|               or continue with                |
|                                               |
| [   G    Sign in with Google         ]       |
| [      Sign in with Apple          ]       |
|                                               |
|                  (    )                     |  <- only if biometrics enrolled
|                                               |
|      support and safety resources              |
|                                               |
|        Don't have an account? Sign up          |
+---------------------------------------------+

Route handling: `/auth/signin`
```

## Focal Hierarchy
- **Dominant focal moment:** trust-first auth card; it should be visually singular, not one tile among many.
- **Secondary layer:** Primary action - BtnPrimary, full width, "Sign in." with CIA only when the source supports a synthesized read.
- **Operational layer:** Heading, Email placeholder, Password placeholder, Forgot password link.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma-backed default: warm-light paper shell, white rounded controls, peach blush corner atmosphere, quiet gray borders, and native iOS spacing.
- Dark glass remains an optional premium theme variant only; the Figma-aligned default is the sparse light login form.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*sign*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma alias:** `Log in`.
- **Evidence tier / light-shell exception:** screenshot-derived Figma direction overrides the older compact canon's dark-only note for this auth-family pass.
- **Surface mode:** use the same warm-light auth shell as Sign up: paper-white base, blush corner atmosphere, orange sparkle mark, black primary text, muted gray helper text, and a bottom-weighted form.
- **Visible anatomy:** title `Welcome,` with a short subtitle, labeled email/password inputs with leading mail/lock icons, password eye toggle, unchecked `Remember me` unless the device already has a saved preference, right-aligned `Forgot password?`, full-width orange `Sign in` CTA, social login divider, Google/Apple pill buttons, `Don't have an account? Sign up`, and `Guest mode`.
- **State implication:** the visual default should feel fast and utility-first, not ceremonial. Keep crisis/support access reachable through the footer/sheet, but do not let it compete with the primary login task in the first viewport.

## Components
- **TopBar** - back chevron only, no title, transparent over atmosphere. Content here never scrolls under it on standard viewports, so the `.glass-pill` scroll-backdrop state is dormant on this screen (kept only as the fallback for very short devices where the safety link pushes past the fold).
- **OfflineBanner** - `.glass-pill`, `rgba(10,10,15,.55)`, conditional, non-blocking.
- **GlassPillInput** x 2 - Figma light-auth override: email (leading mail glyph), password (leading lock glyph + eye toggle), height 48-52, radius 14-16, white fill, 1px warm-gray border, placeholder muted gray, focus = 1px orange border.
- **Toggle** - track `--surface-3`, active fill `#FF5E00`, thumb paper-50, per catalog verbatim. Paired with a Body, paper-100 "Remember me" label (a persistent functional label, not a placeholder - full-contrast text, unlike the input placeholders).
- **BtnGhost** - "Forgot password?" only. **Correction:** the draft also assigned `BtnGhost` to the "Remember me" label; that label isn't a button, it's static text beside a `Toggle`. Reassigned.
- **BtnPrimary** - "Sign in," orange fill, one per composition.
- **BtnSecondary** x 2 - Google, Apple OAuth as warm-light rounded pills with icon + label, equal width.
- **BtnSecondary, icon-only application** - Face ID / Touch ID affordance, 56px circular `.glass-pill` (matches `FABQuickLog`'s icon scale for cross-system sizing consistency), rendered only when biometrics are already enrolled. Not a new component - an icon-only application of the existing button.
- **SafetyResourceCard, lightweight presentation** - rendered here as a quiet inline text link rather than the catalog default `--surface-2` card. **Rationale (flagged deviation, not a contradiction):** the default card would visually compete with the single primary CTA on a routine, low-stakes utility screen and misrepresents urgency for what is, for most users, an ordinary sign-in moment. The link stays "always reachable" per Canon 8; tapping it opens the full `SafetyResourceCard` treatment inside a `Sheet` (variant `half`) with its real call/text actions intact.
- **Sheet** (variant `half`, `.glass-frost`) - post-success biometric enrollment prompt. Appears once, after a successful password sign-in, never pre-auth.
- **ChipProvenance** - reused for the 429 rate-limit honesty label (`system rate-limit`), an intentional extension of its "data-source" role to a system-timer value; still a provenance claim about where a number came from, so no new component is warranted.

## Data Honesty
- This is a utility screen with no user metrics, so the invariant applies to the one number it does surface: the **biometric cooldown timer** after repeated failed attempts (HTTP 429).
- **Real:** biometric icon disables; a `SyncStatus`-style inline glass-pill banner renders beneath it with a live depleting countdown ("retry in 4:32," NM Medium `tabular-nums` per 6) and `ChipProvenance: system rate-limit`. Updates every second from the server-supplied retry-after value - `tabular-nums` keeps the digit width fixed so the once-per-second update never reflows the banner.
- **Low-confidence:** *not applicable, by design.* Rate-limit windows are exact, server-issued values - there is no "estimated" version of a cooldown, and inventing a fuzzy one would be dishonest in the other direction (implying uncertainty about a fact the server knows precisely).
- **Honest null:** if the retry-after value fails to arrive, the UI shows plain copy - "too many attempts. try again later." - with the icon disabled and no countdown. Never fabricates a number to fill the gap.

## Consent and Safety
- `Remember me` defaults unchecked unless an existing saved device preference exists; helper copy names session/device duration and where to revoke saved sessions.
- Biometric enrollment is offered only after successful sign-in in a sheet with accept/decline parity; never pre-consented on the login form.
- Safety/support stays a quiet footer link that opens the full `SafetyResourceCard` sheet. No lifestyle source chips, export, revoke, or delete controls belong on the routine login gate.
- Keep navigation targets aligned to `/auth/signin`. Do not add alternate vanity routes.

## States
- **Default (cold-start):** form blank, both fields unfocused, `BtnPrimary` at 40% opacity (disabled, no glow). No biometric affordance (unless previously enrolled on this device).
- **Filled / valid:** `BtnPrimary` reaches full opacity and gains its static `glow-you` halo once both fields pass format validation.
- **Disabled:** `BtnPrimary` at 40% opacity, no haptic - active whenever a field is empty, email format is invalid, or the account is in 429 cooldown.
- **Loading:** CTA label crossfades to a spinner, width locked. Toast-free - a small inline line beneath the form reads "signing you in - one moment."
- **Success:** form fades and lifts slightly, root resets to Home [12]. If this device has never enrolled biometrics, the enrollment `Sheet` (variant `half`) presents once, immediately after the reset animation settles.
- **Error - network:** `OfflineBanner` slots in under the top bar; form stays fully visible and interactive (local validation still works offline; submission simply queues/fails gracefully).
- **Error - wrong credentials:** border lifts to `rgba(255,255,255,.16)` on both fields, paper-100 `` glyph appears, Caption line below the form reads "that email or password doesn't match." (see 6 for the no-invented-hex correction).
- **Error - 429 biometric:** biometric icon disabled and dimmed; `SyncStatus`-style banner with live countdown per 8.
- **Biometric - enrolled path:** icon button present from load; tap triggers the native OS prompt directly, bypassing the form on success.
- **Biometric - not enrolled path:** no icon on this screen; see the post-success `Sheet` in 9 "Success."

## Motion
- **Gestures:** tap to focus fields; native edge-swipe right to pop the stack.
- **Easing & timing:** physical easing throughout (`ease-flow`); feedback strictly 150-250ms.
- **Screen mount:** staggered fade-in - brand mark (0ms) -> heading/form (100ms) -> alternative paths (200ms).
- **Correction - signature CTA animation removed:** the draft introduced `NEW: CTAContinuousStroke`, a self-drawing 520ms outline on the "Sign in" button, justifying it as "the signature continuous-stroke animation." Canon 6 is explicit that the continuous-stroke line motif is reserved for hero/celebration moments - a routine sign-in tap is neither. Applying it here would cheapen the one moment (celebration, hero cards) it's meant to make feel special. Removed. `BtnPrimary` instead uses its catalog-standard press behavior: scale to .98 with a 6% darken, 150-200ms, no drawing animation.
- **Biometric OS handoff:** form dims to 40% opacity (160ms) when the native prompt activates, snaps back to 100% on dismiss; a brief low-amplitude icon pulse (400ms) signals failure - paired with the fallback copy in 7, never color-only.
- **Error shake:** on wrong-credentials, both fields get a single low-amplitude horizontal shake (150ms) alongside the border/glyph change - motion reinforces the error without relying on the missing red hex.
- **Glow behavior:** the CTA's `glow-you` halo is static once valid (see 6 correction) - it does not breathe. Nothing on this screen breathes; breathing is reserved for hero cards, and this screen deliberately has none.
- **Reduced-motion path:** mount stagger snaps to final state instantly; press feedback becomes a simple opacity dip; error shake is replaced by an instant border/glyph change with no translation; biometric dim/reveal snaps (0ms).

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/auth/signin`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** ink text on white/paper surfaces, muted gray helper copy, and orange CTA labels must be checked in the warm-light shell. Input placeholders are supplementary; every field also carries a persistent `aria-label` ("email address," "password") so screen-reader users never depend on placeholder contrast for meaning.; **Targets:** all interactive elements - both inputs, the eye toggle, `Toggle`, `BtnGhost`, `BtnPrimary`, both `BtnSecondary` buttons, and the biometric icon - meet the 44x44px minimum, including in the high-density tier.; **Screen-reader labels:** back chevron -> "return to welcome screen"; eye toggle -> "show password" / "hide password" (state-dependent); biometric icon -> "sign in with Face ID" (or the OS-appropriate label); error state is announced via `aria-live="polite"` on the Caption error line, not conveyed by border color alone (ties to the 6 correction).
