# 50-profile-edit - A+++ hi-fi mobile spec

## Header
- **Source ID:** 50
- **Source spec:** `Balencia-New-Screens/screens/50-profile-edit.md`
- **Evidence:** screens/50-profile-edit.md, work/briefs/50.md, work/drafts/50.md, Balencia Glass Canon, Component Catalog, Functional Brief
- **Route(s):** `/profile/edit`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A focused utility screen for viewing and updating core identity data - avatar, name, contact, demographics, and a short self-description.
- **Premium Visual Director:** make 50-profile-edit hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** 50-profile-edit exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+ y=0
|   [Chevron]    Edit profile      [Glyph]    | TopBar (transparent -> glass on scroll)
+---------------------------------------------+ y=88
|                  ( O )                      |
|                change photo                 | AvatarGlassInput (NEW)
+---------------------------------------------+
|  PROFILE                                    | SectionHeader (overline, see copy note *)
|  6 of 8 complete                            |
|  [============------]  2 left to            | GlassStatCard (metric, hero-sized)
|  *personalise* CIA                          | glow: glow-cia -> sweeps glow-done at 100%
+---------------------------------------------+
|  IDENTITY                                   | SectionHeader
|  [ First name______________________ ]       | GlassPillInput (text)
|  [ Last name_______________________ ]       | GlassPillInput (text)
|  [ About you (optional)____________ ]       | GlassPillInput (multiline)
|  [  tell CIA what matters right now ]       |
+---------------------------------------------+
|  CONTACT                                    | SectionHeader
|   Email  email verified          [copy]    | ListRow (disabled) + ChipProvenance + BtnGhost icon
|  [ Phone   +971 50 123 4567________ ]       | GlassPillInput (text, tel)
+---------------------------------------------+
|  DEMOGRAPHICS                               | SectionHeader
|   Date of birth         1 Jan 1996   >      | ListRow (opens Sheet)
|   Gender          prefer not to say  >      | ListRow (opens Sheet)
|   Timezone              Asia/Dubai   >      | ListRow (opens Sheet)
|                                              |
|              Delete account                 | BtnGhost (destructive)
+---------------------------------------------+
|             [  Save changes  ]              | Sticky glass action zone (BtnPrimary)
+---------------------------------------------+ y=844 (home indicator)

Route handling: `/profile/edit`
```

## Focal Hierarchy
- **Dominant focal moment:** 50-profile-edit hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Navigation header - sticky TopBar for orientation and exit. with CIA only when the source supports a synthesized read.
- **Operational layer:** Avatar section - AvatarGlassInput , the identity anchor., Contact fields - read-only verified email, editable phone., Demographics fields - DOB, gender, timezone., CIA voice throughout.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*edit*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- `TopBar` - transparent over atmosphere, gains `.glass-pill` backdrop on scroll.
- `AvatarGlassInput` - **NEW:** 96px circular `.glass-card`-tier container wrapping the avatar image, with a centered `.glass-pill` camera glyph overlay bottom-right. *Rationale:* the catalog has no component that bridges raw image upload with glass surface masking; `GlassCard`'s `interactive` variant doesn't cover a circular avatar mask + affordance glyph. Promote at next consistency barrier if reused (Me Main uses a plain avatar, not this input variant).
- `ConsentCard` - shown once, the first time the user taps "change photo," before the native picker opens. *Correction:* the source draft routed straight from tap -> native OS permission dialog, skipping CANON 8's mandatory consent surface for photo data ("any screen touching health data, photos, voice, or third-party sources shows consent state"). Avatar upload is photo data - it needs its own in-app consent moment, not just the OS prompt. Added here; see 7 for copy.
- `GlassStatCard` (variant: `metric`) - the completeness card. *Correction:* the source draft called this `GlassStatCard (Variant: hero)`, but `hero` is a `GlassCard` variant, not a `GlassStatCard` one (catalog only lists `metric` / `ring` / `sparkline` for `GlassStatCard`). It keeps `metric` and earns its hero-like visual weight from placement and size, not from a nonexistent variant name.
- `ProgressBar` (embedded in the `GlassStatCard`, 8px, radius 999) - orange fill, flips to `--glow-done` green logic at 100%. *Correction:* the source draft's premium checklist referenced ProgressBar behavior but never listed the component - added here so 5 and 13 agree.
- `SectionHeader` x4 (Identity, Contact, Demographics, plus the Profile eyebrow atop the completeness card).
- `GlassPillInput` (variant: `text`) - first name, last name.
- `GlassPillInput` (variant: `multiline`, radius 20) - "about you." *Addition:* the catalog's `multiline` variant existed but was unused in the source draft; using it here gives the completeness metric an honest 8th signal instead of an arbitrary denominator (see 8).
- `ListRow` (variant: `value`, disabled/no chevron) - email row. *Correction:* the source draft used a standalone `SolidCard` for a single read-only line. `SolidCard` is reserved for genuinely dense surfaces (tables, dense lists, charts, per catalog); one line doesn't qualify, and introducing a second surface tier here just to show one fact fragments the list rhythm already established by the DOB/Gender/Timezone rows directly below it. Replaced with `ListRow` for consistency.
- `ChipProvenance` (caption: `email verified`) - trailing the email row.
- `BtnGhost` (icon-only, copy-to-clipboard glyph) - trailing the email row; a11y label "Copy email address."
- `GlassPillInput` (variant: `text`, `keyboardType: tel`) - phone.
- `ListRow` (variant: `value`) x3 - date of birth, gender, timezone; each opens a `Sheet`.
- `BtnGhost` - "Delete account," destructive entry.

## Data Honesty
- Every metric on this screen carries the strict 3-state honesty invariant. Plain identity fields (name, phone, about-you text) are user-authored data, not derived metrics, so they intentionally sit outside this framework - same boundary the source draft already drew correctly for name/phone; extended here to "about you."
- **Metric: profile completeness (N of 8 complete)**
- The 8 tracked signals: avatar, first name, last name, phone, date of birth, gender, timezone, about-you.
- **Real:** "6 of 8 complete" + `ChipProvenance`: `you logged`. Bottom-anchored `--glow-cia`.
- **Low-confidence:** *not applicable.* Completeness is computed client-side from filled/null local keys - there is no partial or estimated state for "is this field non-empty."
- **Honest-null:** "0 of 8 complete" + `next: add a photo` (no fabricated baseline, no invented starting percentage).
- **Metric: avatar status**
- **Real:** image renders + `ChipProvenance`: `via camera roll`.
- **Low-confidence:** *not applicable.* A media file cannot partially sync.
- **Honest-null:** empty avatar ring + `tap to add photo` (honest-null visual, not the full-screen `EmptyState` component - see 9 correction).

## Consent and Safety
- 50-profile-edit exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/profile/edit`. Do not add alternate vanity routes.

## States
- **Default:** form cleanly mounted, scroll position top, CTA `disabled` until a valid dirty change exists.
- **Skeleton:** `SkeletonState` sweeps `--surface-3` blocks over the avatar, completeness card, and input geometries.
- **Partial (Day 1):** *Correction:* the source draft called for the full-screen `EmptyState` component here with focus "snapped" to First Name. That's a mismatch - `EmptyState` is a first-use, illustration-free, full-screen moment (catalog: for things like an empty goals list), and this is an edit form, not a blank canvas; sign-up already collects name and a verified email before this screen is ever reached, so a literal all-empty form misrepresents the product. The honest Day-1 state is *partial*: name and email are already populated from sign-up, while avatar, phone, DOB, gender, timezone, and about-you sit at their individual honest-null states (per 8, and matching `ListRow` placeholder text `not set ->` for demographic rows). No component substitution, no forced focus-snap.
- **Error:**
- - *Validation:* input ring flashes `#FF5E00`, subtext reads the matching inline error string from 7 (color is never the sole signal - see 6).
- - *Network:* form stays populated (offline editing enabled), `OfflineBanner` docks under `TopBar`, CTA disabled.
- **Success:** `BtnPrimary` flashes `--glow-done` (`#34A853`) + light haptic, holds 250ms, then executes stack pop to Me Main.
- **Disabled:** "Save changes" locked at 40% opacity; tapping yields no response, but the screen reader announces "Save disabled, 2 fields left to complete."

## Motion
- **Physical easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for sheet presentations and scroll lock - never linear, per canon.
- **Feedback latency:** input focus rings snap in 150ms. Avatar upload success pulse fires in 200ms.
- **Glow behavior:** the completeness `GlassStatCard` breathes (4s ease, infinite, opacity 55%->70%) to signal CIA is actively reading the user's input; the breathe stops permanently once the card sweeps to `--glow-done` at 8/8.
- **Haptics:** light selection feedback (`UISelectionFeedbackGenerator` on iOS, `HapticFeedbackConstants.CONTEXT_CLICK` on Android) on every `ListRow` tap (DOB/Gender/Timezone) and each keyboard "Next" step. Heavy impact haptic on confirmed account deletion only. *Correction:* the source draft named a nonexistent `IOSelectionFeedbackGenerator` API and specified iOS only, despite canon's platform line stating iOS + Android; corrected to the real API name with an Android equivalent.
- **Reduced-motion path:** entrance staggers and the glow breathe cease instantly. The completeness `ProgressBar` snaps to final width on load rather than animating in. The success state's 250ms hold is skipped - stack pop fires immediately after the glow flash.

## Image Slots
- `HIFI-50-01` - avatar or message attachment slot; screen-specific; premium warm-dark product placeholder. Prompt: 50-profile-edit avatar or social proof placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/profile/edit`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast:** paper-100 (`#FEFAF3`) over `--surface-2` (`#211008`) exceeds 16:1. Body text over `--bg-base` and `.glass-card` surfaces holds AA+ at the specified opacities (paper-64%/40% reserved for secondary/tertiary text only, never body-critical copy).; **Targets:** every `ListRow` (email, DOB, gender, timezone) and its chevron honors a 44x44px minimum bounding box; the `AvatarGlassInput` camera glyph overlay is a full 44px hit target despite its smaller visual footprint.; **Screen reader:** `AccessibilityLabel` on the avatar ("Profile photo, double tap to change"). `AccessibilityTraits: updatesFrequently` on the completeness fraction. The "about you" multiline field announces its 160-character hint on focus. The copy-email `BtnGhost` announces "Copy email address" and confirms "Copied" on success (not just a silent visual toast).
