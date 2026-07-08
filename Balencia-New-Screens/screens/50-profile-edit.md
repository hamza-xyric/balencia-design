### 1. Header
- **ID:** 50
- **Name:** 50-profile-edit
- **Route(s) covered:** `/profile/edit`
- **Tab:** Me (parent tab — `GlassNavBar` is hidden for the full duration of this screen; see layout correction note in §4)
- **Source:** Balencia Glass Canon, Component Catalog, Functional Brief
- **Batch:** 8
- **Editorial pass:** scaffolding draft elevated against canon + catalog. Corrections applied and noted inline in §4, §5, §6, §7, §9, §13 — see each for rationale.

### 2. Purpose
A focused utility screen for viewing and updating core identity data — avatar, name, contact, demographics, and a short self-description. Every field filled here becomes a signal CIA (always CIA) reads when it schedules, personalizes, and reasons about the user — this is the literal data floor beneath the "connects" north star, not a cosmetic settings page. It honors "honest" by demanding explicit typed confirmation before irreversible deletion and by never inventing a completeness number the user hasn't earned. It honors "premium" through tactile glass-driven form architecture and by giving photo data its own consent moment rather than silently handing the request to the OS.

### 3. Entry & exit
- **Entry:** Pushed transition from "Me Main" screen tapping the avatar or profile row.
- **Primary exit:** Return to "Me Main" via top-left back chevron, iOS edge-swipe/Android back gesture, or automatic stack pop upon successful save.
- **Secondary exit:** System root reset to Sign In (triggered exclusively after successful, confirmed account deletion).
- **System exits:** Native image picker (modal/bottom sheet, gated by an in-app `ConsentCard` the first time — see §5) and native date/gender/timezone pickers (bottom sheet/spinner via `Sheet`).

### 4. Layout anatomy
Vertical `ScrollView`, 24px outer padding. A transparent-to-glass `TopBar` anchors the top; a sticky glass action zone anchors the bottom so `BtnPrimary` never requires a scroll-to-bottom to reach.

**Regions top-to-bottom:**
1. **Navigation header** — sticky `TopBar` for orientation and exit.
2. **Avatar section** — `AvatarGlassInput` (NEW), the identity anchor.
3. **Completeness module** — single `GlassStatCard` tracking the 8 profile signals CIA draws from.
4. **Identity fields** — first name, last name, and a short "about you" note.
5. **Contact fields** — read-only verified email, editable phone.
6. **Demographics fields** — DOB, gender, timezone.
7. **Destructive zone** — account deletion entry.
8. **Bottom action zone** — sticky glass container holding the primary save CTA.

**ASCII wireframe (390×844):**
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
|   Email · email verified          [copy]    | ListRow (disabled) + ChipProvenance + BtnGhost icon
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
```
*Correction (layout, kept from source, tightened):* the brief asked for the tab bar hidden to maximize utility space. That stands — `GlassNavBar` is fully hidden on this screen. But a floating sticky bottom action zone is added so the primary CTA is never lost below a long scroll; this doesn't reintroduce the tab bar, it's a dedicated `BtnPrimary` dock.

*Correction (copy case, new):* the eyebrow rows (`PROFILE`, `IDENTITY`, `CONTACT`, `DEMOGRAPHICS`) are shown here in caps because the ASCII block is a diagram convention, matching how the Overline type style visually renders (uppercase, +0.14em tracking, CANON §5). The *authored* copy strings are sentence case per canon's "sentence case everywhere" — see §7 for the literal strings ("Profile", "Identity", "Contact", "Demographics"), which the Overline style transforms to caps at render time. The source draft conflated the two and would have shipped literal all-caps copy into a CMS/i18n string table.

### 5. Components
- `TopBar` — transparent over atmosphere, gains `.glass-pill` backdrop on scroll.
- `AvatarGlassInput` — **NEW:** 96px circular `.glass-card`-tier container wrapping the avatar image, with a centered `.glass-pill` camera glyph overlay bottom-right. *Rationale:* the catalog has no component that bridges raw image upload with glass surface masking; `GlassCard`'s `interactive` variant doesn't cover a circular avatar mask + affordance glyph. Promote at next consistency barrier if reused (Me Main uses a plain avatar, not this input variant).
- `ConsentCard` — shown once, the first time the user taps "change photo," before the native picker opens. *Correction:* the source draft routed straight from tap → native OS permission dialog, skipping CANON §8's mandatory consent surface for photo data ("any screen touching health data, photos, voice, or third-party sources shows consent state"). Avatar upload is photo data — it needs its own in-app consent moment, not just the OS prompt. Added here; see §7 for copy.
- `GlassStatCard` (variant: `metric`) — the completeness card. *Correction:* the source draft called this `GlassStatCard (Variant: hero)`, but `hero` is a `GlassCard` variant, not a `GlassStatCard` one (catalog only lists `metric` / `ring` / `sparkline` for `GlassStatCard`). It keeps `metric` and earns its hero-like visual weight from placement and size, not from a nonexistent variant name.
- `ProgressBar` (embedded in the `GlassStatCard`, 8px, radius 999) — orange fill, flips to `--glow-done` green logic at 100%. *Correction:* the source draft's premium checklist referenced ProgressBar behavior but never listed the component — added here so §5 and §13 agree.
- `SectionHeader` ×4 (Identity, Contact, Demographics, plus the Profile eyebrow atop the completeness card).
- `GlassPillInput` (variant: `text`) — first name, last name.
- `GlassPillInput` (variant: `multiline`, radius 20) — "about you." *Addition:* the catalog's `multiline` variant existed but was unused in the source draft; using it here gives the completeness metric an honest 8th signal instead of an arbitrary denominator (see §8).
- `ListRow` (variant: `value`, disabled/no chevron) — email row. *Correction:* the source draft used a standalone `SolidCard` for a single read-only line. `SolidCard` is reserved for genuinely dense surfaces (tables, dense lists, charts, per catalog); one line doesn't qualify, and introducing a second surface tier here just to show one fact fragments the list rhythm already established by the DOB/Gender/Timezone rows directly below it. Replaced with `ListRow` for consistency.
- `ChipProvenance` (caption: `email verified`) — trailing the email row.
- `BtnGhost` (icon-only, copy-to-clipboard glyph) — trailing the email row; a11y label "Copy email address."
- `GlassPillInput` (variant: `text`, `keyboardType: tel`) — phone.
- `ListRow` (variant: `value`) ×3 — date of birth, gender, timezone; each opens a `Sheet`.
- `BtnGhost` — "Delete account," destructive entry.
- `ModalOverlay` — account-deletion confirmation. *Correction:* the source draft cited `ModalOverlay (Variant: action)`, but `action` is a `Sheet` variant, not a `ModalOverlay` one (catalog: `ModalOverlay` has no named variants, it's a centered `FrostCard` over scrim for blocking moments). Dropped the invented variant tag.
- `GlassPillInput` (variant: `text`, autocapitalize off, autocorrect off) — the "type DELETE" field. *Correction:* the source draft repurposed the `password` variant here, which masks input. Masking defeats the entire point of a typed confirmation — the user needs to visually verify they typed `DELETE` correctly before an irreversible action. Changed to `text`.
- `BtnPrimary` (label "Delete account," disabled until the field exactly matches `DELETE`) — the modal's confirm action. *Correction:* the source draft's copy block wrote the modal's heading/body/error but never specified a confirm button, and its own premium checklist item 11 claimed "exactly one `BtnPrimary`" — which was already inconsistent with a modal that clearly needs its own confirm action. Resolved: catalog usage rule #4 ("one `BtnPrimary` per composition") is scoped per composition, and the `ModalOverlay` is a distinct blocking composition layered over the base screen, mutually exclusive with it in time. One `BtnPrimary` on the base screen ("Save changes") and one inside the modal ("Delete account") both hold.
- `BtnPrimary` (label "Save changes," disabled → enabled on valid dirty state) — sticky bottom action zone.

### 6. Visual treatment
- **Background atmosphere:** `--bg-base` (`#0A0A0F`) layered with the mandatory warm radial top-center glow, `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)`, plus the mandatory 3–4% grain overlay (soft-light). *Correction:* the source draft's atmosphere note dropped the grain overlay, which canon marks mandatory on every screen. Restored. Because this screen carries a CIA-glow hero card, a faint purple atmospheric pool (per canon's "CIA moments add a purple pool") bleeds low behind the completeness card only — it does not spread across the full screen, keeping the destructive zone and contact fields visually neutral.
- **Completeness card:** `.glass-card` tier. Glow: `--glow-cia` (`#7F24FF`). *Meaning:* filling out the profile directly enriches CIA's memory and scheduling intelligence — this is the one card on the screen where "CIA is watching" is the honest, stated reason for the glow. At 8/8 complete the glow sweeps once to `--glow-done` (`#34A853`) over 250ms and settles there — a single, final state change, not two glows coexisting, so the "one semantic glow per card" rule holds throughout.
- **Email row:** `ListRow`, disabled state, no glow, no chevron — flat by design; it is the one row on the screen the user cannot act on beyond copying it, and it should read as settled fact, not an invitation to tap.
- **Hero type moment:** the completeness fraction sits in `Stat/KPI` (NM Medium, tabular-nums), paired with the one Tiempos-italic emphasis word for this moment: `2 left to *personalise* CIA`.
- **Color roles:** burnt orange strictly for input focus rings, the completeness `ProgressBar` fill, and both `BtnPrimary` instances (base screen + modal — this design system carries no red, so the destructive confirm action is still orange-filled; the friction is the typed `DELETE` requirement, not a color warning). Royal purple only on the completeness card's glow. Forest green only on the 250ms completion sweep and the success flash in §9.
- **A11y note on color:** every error and destructive state pairs its orange signal with an explicit text string (inline validation copy, or the modal's typed-confirmation gate) — color is never the sole carrier of meaning, consistent with there being no dedicated error hue in this palette.

### 7. Content & copy
CIA voice throughout: sentence case, direct, no exclamation marks, exactly one Tiempos-italic emphasis word per moment.

- **TopBar title:** Edit profile
- **Avatar prompt:** change photo
- **Consent card (photo, first use only):**
  - Heading: Use your *photo*?
  - Body: We'll store this image as your profile picture across Balencia. Remove it anytime from this screen.
  - Actions: Allow photo access (`BtnPrimary`) · not now (`BtnGhost`)
- **Section eyebrows** *(sentence case as authored; Overline style renders them uppercase — see §4 correction)*: Profile · Identity · Contact · Demographics
- **Module count:** 6 of 8 complete
- **Nudges:**
  - `2 left to *personalise* CIA`
  - `next: add a photo`
  - `profile *complete*`
- **About you placeholder:** tell CIA what matters to you right now (optional)
- **About you hint:** keep it under 160 characters
- **Email surtitle:** Email · email verified
- **Validation errors:**
  - First name: 2–50 letters
  - Last name: 2–50 letters
  - Age: 18+ to use Balencia
  - Phone: enter a valid number (such as +971 50 123 4567)
- **Dirty state hint:** changes auto-detected — save when *ready*
- **Offline banner:** you're offline. Changes saved locally — we'll sync when you're back *online*.
- **Profile load error:** couldn't load profile. Try *again*.
- **Network save error:** profile didn't save. Your changes are still here — check your connection and try *again*.
- **Avatar upload error:** photo didn't save. Try uploading again — we accept JPEG or PNG, up to *5MB*.
- **Camera permission (OS-level, after consent accepted):** camera access needed to take a photo. Go to Settings > Balencia > Camera and allow *access*.
- **Delete modal copy:**
  - Heading: Delete your *account*?
  - Body: this will permanently delete all your data, including your CIA memory, goals, progress, and personal information. This action cannot be *undone*.
  - Input placeholder: type DELETE to confirm (case-sensitive)
  - Confirm button: Delete account
  - Cancel: not now (`BtnGhost`)
  - Error: we couldn't delete your account. Try again, or contact support if the problem *persists*.

### 8. Data & honesty states
Every metric on this screen carries the strict 3-state honesty invariant. Plain identity fields (name, phone, about-you text) are user-authored data, not derived metrics, so they intentionally sit outside this framework — same boundary the source draft already drew correctly for name/phone; extended here to "about you."

**Metric: profile completeness (N of 8 complete)**
The 8 tracked signals: avatar, first name, last name, phone, date of birth, gender, timezone, about-you.
1. **Real:** "6 of 8 complete" + `ChipProvenance`: `you logged`. Bottom-anchored `--glow-cia`.
2. **Low-confidence:** *not applicable.* Completeness is computed client-side from filled/null local keys — there is no partial or estimated state for "is this field non-empty."
3. **Honest-null:** "0 of 8 complete" + `next: add a photo` (no fabricated baseline, no invented starting percentage).

**Metric: avatar status**
1. **Real:** image renders + `ChipProvenance`: `via camera roll`.
2. **Low-confidence:** *not applicable.* A media file cannot partially sync.
3. **Honest-null:** empty avatar ring + `tap to add photo` (honest-null visual, not the full-screen `EmptyState` component — see §9 correction).

**Metric: primary contact (email)**
1. **Real:** `user@mail.com` + `ChipProvenance`: `email verified`.
2. **Low-confidence:** *not applicable.* Inherited directly from the backend auth token, not estimated.
3. **Honest-null:** *not applicable.* An account cannot exist in Balencia's database without a verified auth email.

**Cross-cutting — consent & data control (CANON §8):** this screen touches photo data, so it carries its own `ConsentCard` (see §5, §7) ahead of the native picker — not just the OS permission prompt. The "Delete account" destructive zone is the standing revoke/delete entry point for all profile and CIA-memory data collected here.

### 9. All states
- **Default:** form cleanly mounted, scroll position top, CTA `disabled` until a valid dirty change exists.
- **Skeleton:** `SkeletonState` sweeps `--surface-3` blocks over the avatar, completeness card, and input geometries.
- **Partial (Day 1):** *Correction:* the source draft called for the full-screen `EmptyState` component here with focus "snapped" to First Name. That's a mismatch — `EmptyState` is a first-use, illustration-free, full-screen moment (catalog: for things like an empty goals list), and this is an edit form, not a blank canvas; sign-up already collects name and a verified email before this screen is ever reached, so a literal all-empty form misrepresents the product. The honest Day-1 state is *partial*: name and email are already populated from sign-up, while avatar, phone, DOB, gender, timezone, and about-you sit at their individual honest-null states (per §8, and matching `ListRow` placeholder text `not set →` for demographic rows). No component substitution, no forced focus-snap.
- **Error:**
  - *Validation:* input ring flashes `#FF5E00`, subtext reads the matching inline error string from §7 (color is never the sole signal — see §6).
  - *Network:* form stays populated (offline editing enabled), `OfflineBanner` docks under `TopBar`, CTA disabled.
- **Success:** `BtnPrimary` flashes `--glow-done` (`#34A853`) + light haptic, holds 250ms, then executes stack pop to Me Main.
- **Disabled:** "Save changes" locked at 40% opacity; tapping yields no response, but the screen reader announces "Save disabled, 2 fields left to complete."

### 10. Motion & interaction
- **Physical easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for sheet presentations and scroll lock — never linear, per canon.
- **Feedback latency:** input focus rings snap in 150ms. Avatar upload success pulse fires in 200ms.
- **Glow behavior:** the completeness `GlassStatCard` breathes (4s ease, infinite, opacity 55%→70%) to signal CIA is actively reading the user's input; the breathe stops permanently once the card sweeps to `--glow-done` at 8/8.
- **Haptics:** light selection feedback (`UISelectionFeedbackGenerator` on iOS, `HapticFeedbackConstants.CONTEXT_CLICK` on Android) on every `ListRow` tap (DOB/Gender/Timezone) and each keyboard "Next" step. Heavy impact haptic on confirmed account deletion only. *Correction:* the source draft named a nonexistent `IOSelectionFeedbackGenerator` API and specified iOS only, despite canon's platform line stating iOS + Android; corrected to the real API name with an Android equivalent.
- **Reduced-motion path:** entrance staggers and the glow breathe cease instantly. The completeness `ProgressBar` snaps to final width on load rather than animating in. The success state's 250ms hold is skipped — stack pop fires immediately after the glow flash.

### 11. Motivation-tier adaptation
- **Low density (Chillax):** 32px section rhythm. Visible surface limited to avatar, first name, last name, and about-you; phone, DOB, gender, and timezone collapse behind a single "more details" `ListRow` to cut visual friction.
- **Medium density (default):** 24px section rhythm, all sections expanded as drawn in §4.
- **High density (power user):** 16px section rhythm. Form reads as a rapid audit list; focus borders lock sharply with no soft transition. The completeness card compresses to a sticky top micro-`ProgressBar` (no breathing glow) so an external-keyboard user can tab through all 8 fields without the hero card consuming vertical space.

### 12. Accessibility
- **AA+ contrast:** paper-100 (`#FEFAF3`) over `--surface-2` (`#211008`) exceeds 16:1. Body text over `--bg-base` and `.glass-card` surfaces holds AA+ at the specified opacities (paper-64%/40% reserved for secondary/tertiary text only, never body-critical copy).
- **Targets:** every `ListRow` (email, DOB, gender, timezone) and its chevron honors a 44×44px minimum bounding box; the `AvatarGlassInput` camera glyph overlay is a full 44px hit target despite its smaller visual footprint.
- **Screen reader:** `AccessibilityLabel` on the avatar ("Profile photo, double tap to change"). `AccessibilityTraits: updatesFrequently` on the completeness fraction. The "about you" multiline field announces its 160-character hint on focus. The copy-email `BtnGhost` announces "Copy email address" and confirms "Copied" on success (not just a silent visual toast).
- **Color-independent signaling:** validation and destructive states always pair the orange/text signal with an explicit string (§6, §9) — no state on this screen relies on hue alone.

### 13. Premium checklist
1. **Connects:** [x] completeness card explicitly names all 8 fields it maps to CIA's memory and scheduling intelligence.
2. **Honest:** [x] zero fabricated numbers; profile completeness only counts `you logged` inputs; three metrics carry full real/low-confidence/honest-null triples with justified "not applicable" calls, not forced compliance.
3. **Premium:** [x] no gray dead-ends; account deletion runs through a high-friction, typed-confirmation `ModalOverlay`; photo capture gets its own `ConsentCard` moment instead of jumping straight to an OS prompt.
4. **Typography:** [x] Tiempos italic used for exactly one emphasis word per copy moment; tabular-nums locked for the completeness count; eyebrow labels authored sentence case, rendered caps by the Overline style (corrected from literal all-caps authoring).
5. **Glass discipline:** [x] glass reserved for the hero completeness card, avatar, nav-adjacent bottom action zone, and overlays; the single-line email fact uses `ListRow`, not a second data-density surface tier.
6. **Semantic glow:** [x] one glow per card throughout; purple (`--glow-cia`) on the completeness card explains *why* the data matters to CIA, sweeping once to green only at true completion.
7. **Voice:** [x] full CIA persona adherence; CIA naming verified; no exclamations.
8. **Targets & a11y:** [x] 44px targets enforced across rows and the avatar glyph; reduced-motion path explicit; color paired with text on every stateful signal.
9. **Honest nulls:** [x] avatar, completeness, and Day-1 partial state all use designed honest-null visuals — no full-screen `EmptyState` misapplied to a form context.
10. **Data viz:** [x] `ProgressBar` now explicitly listed as a component (was referenced only in the checklist before this pass) with correct orange-to-green completion logic.
11. **CTAs:** [x] one `BtnPrimary` per composition — "Save changes" on the base screen, "Delete account" inside its own blocking `ModalOverlay` — reconciled against catalog usage rule #4 rather than left as an unexamined contradiction.
12. **Layout:** [x] tab bar hidden as briefed; sticky bottom action zone added so the CTA is never lost to scroll — noted as a deliberate addition, not a silent deviation.
13. **State coverage:** [x] success, error, skeleton, offline, and a corrected Day-1 partial state fully mapped to real components.
14. **Cross-cutting compliance:** [x] CANON §8 consent-and-data-control pattern now explicitly satisfied for photo data via `ConsentCard`, closing a gap the source draft left implicit.
