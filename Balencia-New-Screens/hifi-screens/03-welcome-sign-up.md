# 03-welcome-sign-up - A+++ hi-fi mobile spec

## Header
- **Source ID:** 03
- **Source spec:** `Balencia-New-Screens/screens/03-welcome-sign-up.md`
- **Evidence:** screens/03-welcome-sign-up.md, work/briefs/03.md, work/drafts/03.md, functional brief 03-welcome-sign-up
- **Route(s):** `/auth/signup`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Converts carousel intent into a registered account with the smallest possible form - email and password only - while the screen itself does the work of introducing *CIA* as a presence, not a product feature.
- **Premium Visual Director:** make trust-first auth card the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Create account keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/auth/signup`.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| 9:41                               |  status bar
|                                        |
|              balencia                 |  brand anchor (quiet)
|                                        |
|                                        |
|         Create your account           |  Display 34
|              with *CIA*.               |  emphasis: CIA (Tiempos italic)
|                                        |
|    CIA connects your life once       |  compact future-tense caption,
|    there is enough history.          |  no personalized insight yet
|                                        |
|  +----------------------------------+  |
|  |   email address                 |  |  GlassPillInput  email
|  +----------------------------------+  |
|  +----------------------------------+  |
|  |   password               show |  |  GlassPillInput  password
|  +----------------------------------+  |
|  ################  typed live         |  MomentumBar + ChipProvenance
|                                        |
|  +----------------------------------+  |
|  |            Sign up               |  |  BtnPrimary
|  +----------------------------------+  |
|                                        |
|  ---------  or continue with  --------|  hairline divider
|  +----------------+ +----------------+|
|  |     Google      | |     Apple      ||  BtnSecondary x2
|  +----------------+ +----------------+|
|                                        |
|      already have an account?         |
|               Sign in                 |  BtnGhost
|         Try without an account        |  BtnGhost
|                                        |
|      terms of service  privacy       |  ComplianceFooter (NEW)
|                                        |
|                                  |  home indicator
+--------------------------------------+

Route handling: `/auth/signup`
```

## Focal Hierarchy
- **Dominant focal moment:** trust-first auth card; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere base - --bg-base . with CIA only when the source supports a synthesized read.
- **Operational layer:** Brand anchor - Balencia wordmark, small, top-center, quiet ., Primary action - full-width Sign up CTA., Divider - hairline + "or continue with," not a visual event., Heading.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma-backed default: warm-light paper shell (`#FFFFFF` / paper surfaces), soft blush peach atmosphere in the top-right and lower-left, subtle gray borders, and native iOS shadows.
- Dark glass remains an optional premium theme variant only; do not implement it as the default auth surface for the Figma-aligned build.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*account*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma aliases:** `Sign up`; shares the auth family language with `Log in`, `Opt verification`, `Forgot password`, `Reset password`, and auth success `Congratulations`.
- **Evidence tier / light-shell exception:** screenshot-derived Figma direction overrides the older compact canon's dark-only note for this auth-family pass. Preserve dark-glass variants only as implementation theme variants.
- **Surface mode:** render this auth family in the Figma warm-light shell: white/paper background, peach blush in the top-right and lower-left corners, 16px radius input fields, subtle 1px borders, and a small orange sparkle/brand mark in the header. Preserve dark-glass variants only as an implementation theme mode, not the default for this Figma-backed pass.
- **Form anatomy:** include persistent labels (`Full name`, `Email`, `Password`, `Confirm password` when expanded), leading icons, password eye toggles, orange password-strength line, consent checkbox, full-width orange CTA, horizontal alternate-auth divider, Google/Apple rounded social pills, and bottom `Already have an account? Sign in` plus `Guest mode`.
- **Default-form correction:** `/auth/signup` uses the smallest source form by default: Email, Password, terms/privacy checkbox, CTA, social pills, sign-in link, and guest link. `Full Name` and `Confirm Password` are expansion variants only.
- **Hierarchy correction:** no oversized hero constellation on sign-up. The Figma reference is a compact native auth form: title at top, form in the middle, CTA/social/auth alternatives near the bottom.

## Components
- **NEW: ConnectsPreviewRow** - four `ChipDomainTag` pills (Nutrition `#84cc16`  Mental/Wellbeing `#14b8a6`  Finance `#10b981`  Relationships `#ec4899`, each domain color at 16% bg per canon 4) in a single horizontal row, joined by quiet connecting dots (paper-100 at 24%, structural not textual - quieter than the 40% tertiary-text floor), with one Caption line beneath in CIA voice. No card wrapper - sits bare on atmosphere so it never competes with the hero line (6, 13.3). No `ChipProvenance`: this is a capability statement in future tense, not a synced or computed value, so attaching a provenance chip would fabricate a source CIA doesn't have yet. Rationale for NEW: catalog's `ChipDomainTag` is reused as-is, but the assembled pattern - a card-free, non-personalized, future-tense cross-pillar promise for zero-data screens - isn't cataloged; distinct from `CIAInsightCard` (requires real evidence + provenance) and `KPIRow` (requires actual metrics). Flagged for catalog promotion; likely to recur on other pre-auth/onboarding screens.
- **Default correction:** in the Figma-aligned default, render this as a single `CompactPromiseCaption`; do not show a pill row unless the auth flow is using the expanded brand-introduction variant.
- **GlassPillInput** - Figma light-auth override: `email` variant with leading mail glyph; `password` variant with leading lock glyph and eye toggle. Render as white rounded fields, 1px warm-gray border, 14-16px radius, 48-52px height, muted gray placeholder, ink typed text, focus border orange, and no blur. The dark `.glass-pill` treatment remains a theme variant only.
- **MomentumBar** - password strength, cumulative as rules are met (not a depletable ChargeMeter - strength only builds here, it doesn't drain). States present on this screen: honest-null (empty field) -> real (typed, live) - see 8, 9. Skeleton is explicitly N/A: the meter is a deterministic client-side computation with zero network latency to mask, so it never shimmers to fake a wait it isn't taking (reasoning detailed in 9).
- **ChipProvenance** - sits beside the MomentumBar; carries the honesty label for the strength read (see 8).
- **HonestNullState** - governs the meter's empty-field state (quiet glyph, no bar, no invented number).
- **BtnPrimary** - orange fill, "Sign up," one per screen.
- **BtnSecondary** - warm-light social pill in Figma mode: white fill, 1px gray border, icon plus label, 44-48px height, equal visual weight for Google / Apple (no social login is ranked above another).
- **BtnGhost** - "Sign in" and "Try without an account."
- **OfflineBanner** - top-deploying, honest staleness copy, per catalog.
- **NEW: ComplianceFooter** - centered Caption-level legal-link row (terms  privacy). Rationale: neither `ListRow` nor `BtnGhost` reads correctly at this weight; this needs its own minimal treatment so it stays the quietest element on screen without inventing button chrome for it.
- **NEW: ToastBanner** - top-deploying glass-pill system toast for non-field errors (e.g., account-exists). Rationale: distinct from `XPToast` (gamification-only) and `OfflineBanner` (connectivity-only); this is the general system-message slot every auth/error screen will need. Flag for catalog promotion.

## Data Honesty
- **Cross-pillar intelligence (connects):** satisfied via `ConnectsPreviewRow` (5), not via a personalized `CIAInsightCard`. Pre-auth collects only email + password (2) - no domain, no history, no synced source exists yet for *CIA* to intelligence across - so a real cross-pillar finding cannot honestly exist on this screen. What *can* honestly exist is a capability preview: four `ChipDomainTag` pills (Nutrition, Mental/Wellbeing, Finance, Relationships) naming the pillars CIA will learn to read together, captioned in explicit future tense - "CIA connects them once there's enough of you to compare" - so the promise never poses as a finding. This is why the row carries no `ChipProvenance` and no synced value: attaching a source or a number to a not-yet-real correlation would be the fabrication canon 7 forbids, just applied to a promise instead of a metric. The distinction that resolves the north-star tension: a *personalized insight* genuinely cannot exist pre-auth (that exception is real and stays true), but *connects as a stated capability* can, and canon's gate requires the latter on every screen regardless of data availability. Because `ConnectsPreviewRow` makes no claim about this specific user, it is exempt from the honesty triple (real / low-confidence / honest-null) that governs actual metrics below - there is no value here to be real, low-confidence, or null about, only a promise about what CIA will do once there is.
- **Default correction:** the default Figma frame uses only the `CompactPromiseCaption`; no source chip or personalized insight is honest before account creation.
- **Metric:** password strength (client-computed as you type - not a synced or third-party value, so its provenance chip says so plainly rather than borrowing a source it doesn't have).
- **Real:** MomentumBar filled orange (`--glow-you`), `ChipProvenance` reads `typed live`, strength caption `meets 4 of 4 rules`.
- **Low-confidence:** not applicable, by design. Password strength is a deterministic local check (length, case, number, symbol) - never a prediction or a modeled estimate - so the meter never borrows canon's `estimated  low confidence` phrasing, which exists for genuinely uncertain data (an imprecise wearable read, a projected trend). Labeling a fact-checkable rule as "estimated" would be the dishonest move here, not the honest one; the meter's only in-between reading is real, live, partial progress (see Real, above).
- **Honest-null:** field is empty. Bar collapses via `HonestNullState`: no glyph noise, Body-light line - `not enough data yet - start typing to build strength`. No bar rendered at 0% (a bar at zero still implies a measurement; this doesn't).

## Consent and Safety
- Terms/privacy checkbox stays unchecked until explicit action. Social sign-in buttons carry equal visual weight and must not preselect consent.
- No health, voice, photo, or third-party source data exists yet on this screen; do not show source chips, export, revoke, or delete claims here. Account deletion/export belongs in authenticated settings after account creation.
- Keep navigation targets aligned to `/auth/signup`. Do not add alternate vanity routes.

## States
- **Connects preview:** `CompactPromiseCaption` renders once with future-tense copy; it carries no synced value to go stale and no field to validate.
- **Skeleton:** N/A, justified. Every element on screen - atmosphere, wordmark, hero line, both `GlassPillInput` fields, `BtnPrimary`, the social row - renders synchronously from bundled assets; nothing is fetched over the network before the screen is interactive, so there is no loading gap for a skeleton to mask. `MomentumBar` carries no skeleton either: it's a deterministic client-side computation with zero latency (5), and it starts at honest-null the instant the field is empty rather than shimmering while it "computes" a value that has no delay. Designing a skeleton here would fabricate a wait that doesn't exist - the same honesty logic canon applies to low-confidence and honest-null (7) applies to skeleton: don't dress a state up as busy when nothing is actually pending.
- **Default:** both fields empty. `BtnPrimary` at 40% opacity, disabled. Meter absent (honest-null).
- **Focused:** focused `GlassPillInput` gains 1px orange border + subtle orange glow. Keyboard raises natively; CTA stays pinned above it.
- **Field error:** failing field's border turns `#ef4444` (system-error exception, see 6); Caption below reads `that email looks invalid`.
- **System error:** `ToastBanner` deploys from the top, glass-pill, reads `We found an existing account for that email - sign in instead?`, auto-persists until dismissed or field is edited.
- **Loading:** both fields drop to 50% opacity, read-only; `BtnPrimary` label swaps to a spinner + `creating your account`, width locked so nothing reflows.
- **Success:** fields fade to 0%; `BtnPrimary` carries the 600ms `--glow-done` flash (see 6), then the stack pushes to `03b`.
- **Offline:** `OfflineBanner` deploys top, reads `offline - showing last sync 2h ago`; `BtnPrimary` dims to signal the submit will queue, not fail silently.

## Motion
- **Feedback:** all tappable elements scale to `.98` on press, 150ms, `cubic-bezier(0.4, 0, 0.2, 1)` - never linear.
- **Glow behavior:** the MomentumBar's glow bleed widens in step with rules satisfied, so the glow itself narrates progress rather than just the fill width.
- **Haptics:** light impact the moment all 4 password rules are met; medium impact on auth success; no haptic on a disabled `BtnPrimary` tap (a disabled control should feel inert, not broken).
- **Entry:** logo, heading, connects preview, form, CTA, social row stagger in with a 12pt rise + fade, 200ms apart - the eye is led down the form in the order it's meant to be filled.
- **Connects preview motion:** none, persistently. No breathe, no pulse, no shimmer - canon reserves glow-breathe for hero cards (6), and this isn't one; giving a static promise a "live" animation would visually claim it's a running computation, which contradicts the honesty reasoning in 8.
- **Deliberately absent:** the continuous-stroke line motif is reserved for hero/celebration moments (canon 6); account creation is a quiet threshold, not a milestone, so success here is a single glow flash - no confetti, no stroke draw. Celebration is earned later.
- **Reduced-motion path:** entry renders as instant opacity (no rise); `ToastBanner`/field-error transitions cut the slide and appear directly; success glow becomes a flat color swap, no sweep.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/auth/signup`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** ink text on white/paper fields, muted helper copy, and orange CTA states must be checked against the warm-light shell, not the dark glass composite.; **44px+ targets:** both inputs and `BtnPrimary` implement at 52px height; `BtnSecondary`/`BtnGhost` at 44px minimum.; **Screen-reader labels:** password eye toggle exposes `show password` / `hide password`; Google/Apple buttons carry `aria-label="continue with Google"` / `"continue with Apple"`; `MomentumBar` exposes its current strength caption as a live region so the honesty state is announced, not just shown.
