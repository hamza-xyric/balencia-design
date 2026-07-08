# 65-force-update - A+++ hi-fi mobile spec

## Header
- **Source ID:** 65
- **Source spec:** `Balencia-New-Screens/screens/65-force-update.md`
- **Evidence:** screens/65-force-update.md, work/briefs/65.md, work/drafts/65.md, Functional content brief (Force Update).
- **Route(s):** No live route; system-level full-screen gate above every authorized and unauthorized route, including the tab shell.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Enforces a minimum app-version floor so the client never talks to a backend it can no longer speak to safely - API compatibility, critical security patches, App Store/Play Store compliance.
- **Premium Visual Director:** make 65-force-update hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** 65-force-update uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+ (0,0)
|              [ System status bar ]           |
|                                               |
|                  Balencia.                    |  <- Chillax, static brand mark
|                                               |
|                                               |
|                  App icon                    |
|                   o badge                   |  <- LockShieldCluster (NEW)
|                                               |
|         An important security update          |
|               is available                    |  <- Display 34, one hero moment
|                                               |
|      This update includes important           |
|    security improvements to keep your          |
|                data *safe*.                    |  <- Body-light, 1 emphasis word
|                                               |
| +-----------------------------------------+   |
| | WHAT'S NEW                              |   |  <- Overline (source: sentence case)
| |                                          |   |
| | o Faster CIA coaching responses         |   |  <- plain outline dot, not a spark
| | o New workout plans and exercises        |   |
| | o Bug fixes and performance improvements |   |
| | via server release notes                 |   |  <- ChipProvenance, Caption
| +-----------------------------------------+   |
|                                               |
|            (flexible spacer)                  |
|                                               |
| +-----------------------------------------+   |
| |              Update now                  |   |  <- BtnPrimary, solid fill + halo
| +-----------------------------------------+   |
|          v2.1.0 -> v3.0.0 required             |  <- tabular-nums, via device config
+---------------------------------------------+ (390,844)

Route handling: No live route; system-level full-screen gate above every authorized and unauthorized route, including the tab shell.
```

## Focal Hierarchy
- **Dominant focal moment:** 65-force-update hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Top spacer - 48px. with CIA only when the source supports a synthesized read.
- **Operational layer:** Wordmark - Balencia. static brand mark., App icon cluster - app icon + update badge, composite ., Update message block - title  + subtitle., CIA voice.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*update*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **Wordmark** - static brand asset, **Chillax** typeface (CANON 5 footnote: "Chillax = logo wordmark only"). Not a catalog component; not subject to Neue Montreal sizing. 20px, +0.02em tracking, paper-100 at 82%, centered. Deliberately small - Display type is reserved for the update title (catalog usage rule: one Display moment per screen), and the wordmark must not compete with it for "hero" status.
- **NEW: `LockShieldCluster`** - composite of the native app icon (96x96, OS squircle mask, product asset - not styled as glass) with a 32px `.glass-pill` badge overlapping its bottom-right corner (6/6 offset), containing a 20px rounded-2px-outline update-arrow glyph in orange (`#FF5E00`, tint only, no glow/blur). *Rationale:* the catalog has no composite trust/gate glyph; a bare app icon can't communicate "action required" and a full `PaywallLock` treatment (blurred-preview + unlock CTA) is the wrong metaphor - nothing here is locked behind payment, the *app itself* is temporarily gated. Icon sized at 20px rather than the general 24px glyph-target floor because this badge is decorative/informational, not a tappable control - no tap target requirement applies.
- **Display** (CANON 5, 34pt, NM Medium) - the update title. The screen's one hero type moment.
- **Body-light** (CANON 5) - subtitle, paper-64%, max width 327px, centered, 2-line typical.
- **GlassCard**, `variant: default`, non-interactive (no press state - it's a read-only preview, not `interactive`) - container for "What's new." `.glass-card` per CANON 2: radius 28, 24px padding.
- **Overline** (CANON 5) - "What's new" eyebrow; the *stored copy string* is sentence case per voice rules, the *rendered* style applies the Overline role's uppercase + tracking transform. These are not in conflict - one is content, the other is a type treatment.
- **ChipProvenance** - micro caption tag under the What's new list ("via server release notes") and beside the version string ("via device build config"). Required per CANON 7 - even non-health data gets an honest source label, not just WHOOP-style metrics.
- **BtnPrimary** - "Update now." **Fix:** the draft styled this as `.glass-pill` with an orange glow core. That's wrong on two counts: (1) catalog `BtnPrimary` is a **solid `#FF5E00` fill**, not a translucent glass-pill - glass-pill is `BtnSecondary`'s territory; (2) the ambient bloom described belongs *outside* the button, not inside it. Corrected: solid orange fill per catalog spec, radius 999, height 52, with an external `--glow-you` halo (CANON 3 recipe, radial blur 32px behind the pill) breathing behind it - the screen's one focal lantern, borrowed from the hero-card glow-breathe motif even though a button isn't technically a card, because it's the only interactive element on an otherwise static screen.
- **Caption**, tabular-nums - version string "v2.1.0 -> v3.0.0 required."
- **OfflineBanner** - conditional, mid-session only. **Fix:** the draft folded offline messaging into a `TopBar` "variant: transparent." Removed - `TopBar`'s catalog anatomy always includes a back chevron, which this screen must never expose (see 3, no secondary exit). `OfflineBanner` is the correct catalog component: a glass-pill strip under the status bar, no navigation affordance.
- **SkeletonState** (partial) - What's new card during fetch: shimmer blocks over the real card geometry, not a spinner.
- **NEW: `SystemGateOverlay`** - the structural wrapper presenting this whole screen: full-bleed, opaque, no scrim, mounts above the tab shell and consumes edge-swipe-back and Android hardware-back at the OS level. *Rationale:* the catalog's `ModalOverlay` is "centered FrostCard over scrim, reserved for blocking moments" - a floating card with a dimmed backdrop showing through. This screen is not that: there's no backdrop to dim because there's nothing behind it worth showing, and it must hard-block system-level back gestures in a way a content-level modal never needs to. Different structural problem, different component.
- *Correction:* the underlying draft referenced an external "8-state interaction model" and a "Premium Craft section" outside the three source files this rewrite was scoped to. Removed - all button/screen states now live in one place, 9 "All states," so there's a single source of truth inside this document rather than a dangling cross-reference to something unverifiable here.

## Data Honesty
- This screen carries no life-domain metrics - no steps, sleep, or Life Power - but its two pieces of dynamic data still owe the user an honest source, so the three-state model applies in spirit even where "low-confidence" is a legitimate not-applicable.
- **1. What's new items (server-driven array)**
- **Real:** up to 3 bullets (see 4 fix on capping), `ChipProvenance: "via server release notes."`
- **Low-confidence:** not applicable - these are static marketing strings, not a measured quantity that can be "estimated." Forcing a confidence label onto copy text would be fake precision, not honesty.
- **Honest-null:** card collapses to 0pt height when the server returns no items. No placeholder text, no "check back later" filler - it simply isn't there.
- **2. Version metadata (local build vs. required minimum)**
- **Real:** "v2.1.0 -> v3.0.0 required," `ChipProvenance: "via device build config."`
- **Low-confidence:** not applicable - build numbers are exact integers from a manifest, not inferred.
- **Honest-null:** if the remote config fails to parse a minimum-version number before timeout, fall back to the unversioned string "Update required" rather than rendering a broken or half-populated comparison.

## Consent and Safety
- 65-force-update uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Cold start / Day 1:** renders immediately and fully populated - icon, badge, title, and version caption are local/bundled and must never show a skeleton.
- **Empty / partial:** What's new card collapses entirely when the server has no items (see 8); everything else renders as normal.
- **Loading - fetch:** What's new card shows `SkeletonState` shimmer (surface-3 base, 1.2s sweep) matching its real geometry while the release-notes payload loads.
- **Loading - deep link:** tapping the CTA locks its width and swaps the label for a spinner; a toast reads "Opening the store."
- **Error:** CTA label changes to "Try again"; a quiet glass-pill toast (same family as `OfflineBanner`, not red, not an alarm icon) reads "Couldn't open the store - check your connection," sitting just above the CTA. This borrows `ErrorState`'s tone - plain language, no error codes, no blaming the user - without swapping the whole screen for the `ErrorState` component, because the update messaging above must stay visible; replacing it with a generic error illustration would bury the one thing the user actually needs to do.
- **Offline:** screen renders normally; `OfflineBanner` appears under the status bar reading "You're offline - update when you reconnect." CTA stays tappable and falls into the Error state if the store genuinely can't be reached.
- **Success:** app backgrounds when the store opens. If the user returns without updating, the CTA silently resets to its default label - no lecture, no re-triggered animation.
- **Disabled:** not applicable, and this is a deliberate design position, not a gap - a permanently disabled CTA on a mandatory gate would be an actual dead end, which CANON 8's locked-feature rule explicitly forbids even for premium gates, let alone a system one. The CTA always accepts a retry.

## Motion
- **Easing:** physical, never linear; 150-250ms for state transitions (spinner-in, toast-in/out).
- **Entrance:** staggered, ~1.0s total - screen fade, then wordmark, then icon scale-in, then badge spring-in, then title/subtitle cascade. Nothing animates before the screen is legible; this is a gate, not a flourish.
- **Glow behavior:** the CTA's external `--glow-you` halo breathes on an infinite sinusoidal loop - the screen's sole focal lantern, per the 5/6 fix (glow lives outside the solid button, not inside a glass one).
- **Haptics:** medium impact on CTA tap; a triple-pulse error haptic on failed store hand-off.
- **Gesture intercepts:** edge swipe-back (iOS) and hardware back (Android) are both consumed, not merely ignored - repeated Android back-presses surface the supportive toast in 7 rather than silently doing nothing, which would read as a bug.
- **Reduced motion:** entrance choreography and the CTA glow-breathe both collapse to their end state instantly; the screen renders fully visible and static, leaning on contrast and copy rather than motion to carry the message. Required per CANON 6.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; system-level full-screen gate above every authorized and unauthorized route, including the tab shell..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** `paper-100` `#FEFAF3` / `paper-50` `#FDFDFB` text pairs against `--bg-base` `#0A0A0F` and the `--glass-card` surface both clear AA+; the What's new card's `paper` body copy is checked against its actual composited background (surface + blur + tint), not the flat token, since glass surfaces lighten effective luminance.; **Targets:** `BtnPrimary` at 52px height clears the 44px floor with margin. The `LockShieldCluster` badge is non-interactive and carries no tap target - nothing else on screen is tappable, so there's no risk of an accidental adjacent hit.; **Screen-reader labels:** the badge glyph gets an explicit VoiceOver/TalkBack label ("Update required") since it's otherwise a glyph-only element; the app icon itself is marked decorative (already conveyed by the wordmark). Toasts (`Error`, `Loading`, `Offline`, `Android back-press`) are announced via an `aria-live="polite"` region so screen-reader users hear state changes without needing to re-focus.
