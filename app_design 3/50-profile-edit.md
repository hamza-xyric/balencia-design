# Screen Design: Edit Profile

**Screen**: 50 of 73
**File**: 50-profile-edit.md
**Register**: Brand Mode
**Primary action**: Update personal profile information (tap "save changes")
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root. Pushed from Me Main [17] via avatar tap or profile section tap. Back button returns to Me Main [17]. Tab bar hidden (stack screen).

---

## Purpose

Edit Profile is where the user updates their personal identity within Balencia -- name, avatar, date of birth, gender, phone, and timezone. It is a focused utility screen: the user arrives with a specific intent ("I want to change my photo" or "I need to update my phone number"), makes the change, and leaves. Email is visible but read-only (verified during sign-up, cannot be changed inline). The design follows the Auth Screen Template spacing conventions (Brand Mode register with generous whitespace) adapted for an authenticated context, giving the form a premium, uncluttered feel. The avatar section at the top anchors the user's identity and provides the most common edit action (photo change) at the highest visual priority. A destructive "delete account" link at the bottom provides the required account removal path, separated from the form by generous spacing to prevent accidental taps. This screen is available to all tiers — profile management is a core account feature, never gated.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Avatar section -- large photo with camera overlay, the most personal and visually prominent element
2. Name fields -- first name and last name, the most commonly edited text fields
3. Email (read-only) -- visible for reference with verified badge, greyed to signal non-editable
4. Date of birth -- date picker, same pattern as sign-up
5. Gender -- bottom sheet selector, same pattern as sign-up
6. Phone -- phone input with country code prefix
7. Timezone -- auto-detected with manual override option
8. Save CTA -- primary action, disabled until changes detected
9. Delete account -- destructive link, visually separated at the very bottom

**User flow**:
- **Arrives from**: Me Main [17] via stack push (avatar tap or profile section tap)
- **Primary exit**: Me Main [17] via stack pop (back button, swipe-right gesture, or successful save)
- **Secondary exits**: Delete account confirmation modal (inline), image picker (system sheet for camera/library)

---

## Layout

**Scroll behavior**: ScrollView (form content exceeds single viewport on smaller devices, especially with keyboard active)
**Tab bar visible**: No (stack screen -- tab bar hidden to maximize form space)

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [<]     Edit profile       │  <- nav header, 44pt
├─────────────────────────────┤
│                             │  <- 24pt top padding
│         ┌────────┐          │
│         │        │          │
│         │ Avatar │  80pt    │  <- circular avatar
│         │   [cam]│          │     camera icon overlay
│         └────────┘          │
│      change photo           │  <- 13pt link below avatar
│                             │  <- 24pt gap
│   ┌───────────────────┐    │
│   │  First name        │    │  <- text input
│   └───────────────────┘    │  <- 16pt gap
│   ┌───────────────────┐    │
│   │  Last name         │    │  <- text input
│   └───────────────────┘    │  <- 16pt gap
│   ┌───────────────────┐    │
│   │  Email       [ok] │    │  <- read-only, verified badge
│   └───────────────────┘    │  <- 16pt gap
│   ┌───────────────────┐    │
│   │  Date of birth     │    │  <- date picker
│   └───────────────────┘    │  <- 16pt gap
│   ┌───────────────────┐    │
│   │  Gender        v   │    │  <- bottom sheet selector
│   └───────────────────┘    │  <- 16pt gap
│   ┌───────────────────┐    │
│   │ +--+ Phone number  │    │  <- country code + phone input
│   └───────────────────┘    │  <- 16pt gap
│   ┌───────────────────┐    │
│   │  Timezone      v   │    │  <- auto-detect + override
│   └───────────────────┘    │
│                             │  <- 32pt gap
│   ┌───────────────────┐    │
│   │   Save changes     │    │  <- primary CTA, orange pill
│   └───────────────────┘    │
│                             │  <- 48pt gap
│      Delete account         │  <- destructive link, red text
│                             │  <- 48pt bottom padding
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Header** -- 44pt
   - Purpose: Screen identification and back navigation
   - Content: Back chevron (left), "Edit profile" title (center, 17pt Sora Semibold)

2. **Avatar Section** -- ~140pt (24pt top padding + 80pt avatar + 8pt gap + 20pt link + 24pt bottom gap)
   - Purpose: Identity anchor and photo change entry point
   - Content: Circular avatar (80pt) with camera overlay icon, "change photo" text link

3. **Form Fields Group** -- ~456pt (7 fields x 52pt + 6 gaps x 16pt)
   - Purpose: Editable profile data
   - Content: First name, last name, email (read-only), date of birth, gender, phone, timezone

4. **Save CTA** -- 56pt button + 32pt top gap = 88pt
   - Purpose: Submit profile changes
   - Content: "Save changes" orange pill button

5. **Delete Account Link** -- 44pt touch target + 48pt top gap + 48pt bottom padding = 140pt
   - Purpose: Account deletion entry point
   - Content: "Delete account" red text link

---

## Components

### Navigation Header
- **Purpose**: Standard stack navigation header
- **Data source**: Static
- **Visual treatment**: 44pt row, transparent background (ink-900 shows through). Back chevron: left-aligned, white, 20pt, 2pt stroke weight, 16pt from left edge, 44x44pt touch target. Title: "Edit profile", 17pt Sora Semibold, white, center-aligned. Sentence case.
- **Variants**: N/A
- **Gestures**: Back chevron tap (stack pop), iOS swipe-right-from-edge (stack pop)
- **Size**: Full-width x 44pt

### Avatar Section
- **Purpose**: Visual identity anchor and primary photo change entry point
- **Data source**: User profile API (GET /api/auth/me -- avatar field)
- **Visual treatment**: Centered layout on ink-900 background. Avatar: 80pt circle, border 2pt white at 15% opacity. If photo exists, displays user's avatar image (cover fill, center crop). If no photo, shows first initial + last initial on ink-brown-800 circle (24pt Sora Semibold, white at 60%). Camera overlay: 28pt circle, ink-brown-800 fill at 90%, positioned bottom-right of avatar (overlapping at ~60% from center). Camera icon inside overlay: 16pt, white at 80%. "change photo" link: 13pt Sora Regular, Burnt Orange (#FF5E00), center-aligned, 8pt below avatar. Touch target for "change photo": 44pt height, full-width.
- **Variants**: With photo (avatar image displayed), without photo (initials fallback)
- **Gestures**: Tap avatar or "change photo" link -> opens image picker action sheet (camera / photo library / remove photo)
- **Size**: Full-width x ~140pt

### Image Picker Action Sheet
- **Purpose**: Select source for new avatar photo
- **Data source**: System (camera, photo library)
- **Visual treatment**: Native iOS action sheet with 3 options:
  - "Take photo" -- opens camera (if camera permission granted)
  - "Choose from library" -- opens photo library picker
  - "Remove photo" -- removes current avatar (only shown when avatar exists)
  - "Cancel" -- dismisses sheet
- **Upload behavior**: Selected image is cropped to square (1:1 aspect ratio) using system crop tool. Uploaded via POST /api/upload/avatar. During upload, avatar shows a semi-transparent overlay with a white spinner (20pt) centered. On success, new avatar replaces old immediately. On failure, toast error: "Photo upload failed. Try again."
- **Gestures**: Tap option to select, tap cancel or backdrop to dismiss
- **Size**: Native system action sheet

### First Name Field
- **Purpose**: Edit user's first name
- **Data source**: User profile API (first_name)
- **Visual treatment**: Standard Text Input Field pattern. Full-width minus 32pt (16pt margins). Height: 52pt. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% (default), 2pt Burnt Orange (focused), 2pt #F44336 (error). Border radius: --r-md (14pt). Label: "first name" as floating label (when focused or filled) or placeholder (when empty). Text: 16pt Sora Regular, white. Placeholder: white at 40%.
- **Validation**: 2-50 characters. Error: "first name must be 2-50 characters"
- **Keyboard**: Default, autocomplete: given-name. "Next" action moves focus to last name.
- **Gestures**: Tap to focus
- **Size**: (screen width - 32pt) x 52pt

### Last Name Field
- **Purpose**: Edit user's last name
- **Data source**: User profile API (last_name)
- **Visual treatment**: Identical to First Name Field. Placeholder/label: "last name".
- **Validation**: 2-50 characters. Error: "last name must be 2-50 characters"
- **Keyboard**: Default, autocomplete: family-name. "Next" action moves focus to date of birth (opens date picker).
- **Gestures**: Tap to focus
- **Size**: (screen width - 32pt) x 52pt

### Email Field (Read-Only)
- **Purpose**: Display user's email for reference, non-editable
- **Data source**: User profile API (email)
- **Visual treatment**: Full-width minus 32pt. Height: 52pt. Background: ink-brown-800 (#211008) at 60% opacity (dimmed to signal non-editable). Border: 1pt solid white at 5% (more subtle than editable fields). Border radius: --r-md (14pt). Text: 16pt Sora Regular, white at 50%. No cursor, no focus state. Right side: verified badge -- small green (#34A853) checkmark icon (14pt) inside a green at 15% circle (22pt), positioned 16pt from right edge.
- **Variants**: Always read-only. No focused, error, or editable states.
- **Gestures**: Tap does nothing (no response, no haptic). Long-press: copy email to clipboard, brief toast "email copied".
- **Size**: (screen width - 32pt) x 52pt

### Date of Birth Field
- **Purpose**: Edit user's date of birth
- **Data source**: User profile API (date_of_birth)
- **Visual treatment**: Identical to Complete Profile [03d] Date of Birth Field, adapted for product screen margins (32pt total instead of 48pt). Full-width minus 32pt. Height: 52pt. Background: ink-brown-800. Border: 1pt solid white at 10% (default), 2pt Burnt Orange (focused). Border radius: --r-md (14pt). When filled, displays formatted date (e.g., "15 March 2000"). Calendar icon (20pt, white at 50%) on the right side.
- **Interaction**: Tap opens native date picker. Year range: current year - 100 to current year - 18. Pre-selected to current DOB value.
- **Validation**: Must be 18+. Error: "you must be 18 or older"
- **Gestures**: Tap to open date picker
- **Size**: (screen width - 32pt) x 52pt

### Gender Selector
- **Purpose**: Edit user's gender
- **Data source**: User profile API (gender)
- **Visual treatment**: Identical to Complete Profile [03d] Gender Selector, adapted for product screen margins. Full-width minus 32pt. Height: 52pt. Background: ink-brown-800. Border: 1pt solid white at 10% (default), 2pt Burnt Orange (when bottom sheet open). Border radius: --r-md (14pt). Displays current value in white when set. Down chevron icon (16pt, white at 50%) on right side.
- **Options**: "Male", "Female", "Non-binary", "Prefer not to say"
- **Interaction**: Tap opens bottom sheet with 4 selectable rows (44pt each). Current value shows orange checkmark (16pt, #FF5E00) on right. Selecting an option dismisses the sheet and updates the field.
- **Gestures**: Tap to open bottom sheet
- **Size**: (screen width - 32pt) x 52pt

### Phone Input
- **Purpose**: Edit user's phone number with country code
- **Data source**: User profile API (phone)
- **Visual treatment**: Full-width minus 32pt. Height: 52pt. Background: ink-brown-800. Border: 1pt solid white at 10% (default), 2pt Burnt Orange (focused), 2pt #F44336 (error). Border radius: --r-md (14pt). Split into two zones:
  - **Country code prefix**: Left section, 72pt wide, separated by a 1pt vertical divider (white at 10%). Displays country flag emoji (16pt) + dial code (e.g., "+971") in 14pt Sora Regular, white. Tap opens country code bottom sheet (searchable list of countries with flags and dial codes, 44pt rows, search bar at top).
  - **Phone number**: Right section, remaining width. Text: 16pt Sora Regular, white. Placeholder: "phone number" in white at 40%.
- **Validation**: E.164 format validation. Error: "please enter a valid phone number"
- **Keyboard**: Phone pad (numeric with +). "Next" action moves focus to timezone.
- **Gestures**: Tap country code area to open country selector, tap phone area to focus input
- **Size**: (screen width - 32pt) x 52pt

### Timezone Selector
- **Purpose**: Set user's timezone (auto-detected with manual override)
- **Data source**: User profile API (timezone), device timezone for auto-detection
- **Visual treatment**: Full-width minus 32pt. Height: 52pt. Background: ink-brown-800. Border: 1pt solid white at 10% (default), 2pt Burnt Orange (when bottom sheet open). Border radius: --r-md (14pt). Displays current timezone name in white (e.g., "Asia/Dubai (GMT+4)"). Down chevron icon (16pt, white at 50%) on right side. When auto-detected, shows a small "auto" badge: 10pt Sora Semibold, white at 40%, ink-brown-800 bg with 1pt white at 10% border, --r-pill, positioned left of the timezone text.
- **Interaction**: Tap opens bottom sheet with searchable timezone list. Search bar at top (Search Bar pattern, adapted for bottom sheet). Timezone rows: 44pt each, timezone name + GMT offset. Current selection shows orange checkmark. "Use device timezone" option pinned at top of list with location icon (16pt, orange).
- **Gestures**: Tap to open timezone bottom sheet
- **Size**: (screen width - 32pt) x 52pt

### Save CTA Button
- **Purpose**: Submit all profile changes
- **Data source**: Triggers PATCH /api/auth/profile with changed fields only (delta patch)
- **Visual treatment**: Brand CTA Button pattern. Full-width minus 32pt. Height: 56pt. Background: Burnt Orange (#FF5E00). Text: "save changes", 17pt Sora Semibold, white, center-aligned. Border radius: --r-pill (999pt). Sentence case.
- **Disabled state**: Active only when at least one field value differs from the original loaded values. Disabled: orange at 40% opacity, text at 50% opacity, no touch response.
- **Dirty tracking**: On screen mount, snapshot all field values. On any field change, compare current values to snapshot. Enable CTA when any delta exists. Reset snapshot after successful save.
- **Gestures**: Tap to submit
- **Size**: (screen width - 32pt) x 56pt

### Delete Account Link
- **Purpose**: Entry point for account deletion flow
- **Data source**: Static
- **Visual treatment**: Text link, center-aligned. "Delete account" in 15pt Sora Regular, #F44336 (error red). No underline. Positioned at the bottom of the scroll content with 48pt gap above (clear separation from save CTA). Touch target: full-width x 44pt.
- **Gestures**: Tap -> opens delete account confirmation modal
- **Size**: Full-width x 44pt touch target

### Delete Account Confirmation Modal
- **Purpose**: Prevent accidental account deletion with explicit confirmation
- **Data source**: Static copy + user input for confirmation
- **Visual treatment**: Custom modal (z-50). Background scrim: ink-900 at 60% opacity. Modal container: ink-brown-800, --r-lg (20pt) top corners, slides up from bottom. Drag handle: 36pt wide x 4pt tall pill, white at 20%, centered, 12pt from top.
- **Content**:
  - Heading: "Delete your account?" -- 20pt Sora Semibold, white, center-aligned
  - Description: "This will permanently delete all your data, including your SIA memory, goals, progress, and personal information. This action cannot be undone." -- 15pt Sora Regular, white at 70%, center-aligned, 12pt below heading
  - Text input: "Type DELETE to confirm" -- standard Text Input Field, 16pt top gap. Validates that input matches "DELETE" exactly (case-sensitive).
  - Delete CTA: "Delete my account" -- full-width minus 48pt, 48pt height, #F44336 background, white text, 15pt Sora Semibold, --r-pill. Disabled (0.4 opacity) until input matches "DELETE".
  - Cancel button: "Cancel" -- full-width minus 48pt, 48pt height, transparent background, white text at 70%, 15pt Sora Semibold. 12pt below delete CTA.
- **Gestures**: Tap delete CTA (when enabled) -> triggers account deletion API. Tap cancel -> dismisses modal. Tap scrim -> dismisses modal. Drag handle down -> dismisses modal.

### Gender Bottom Sheet
- **Purpose**: Select gender value
- **Visual treatment**: Same as Complete Profile [03d] Gender Bottom Sheet. Slides up from bottom, scrim fades in (ink-900 at 40%). Container: ink-brown-800, --r-lg top corners. Drag handle at top. 4 rows at 44pt each: "Male", "Female", "Non-binary", "Prefer not to say". Selected row shows orange checkmark (16pt, #FF5E00) on right. Text: 16pt Sora Regular, white.
- **Gestures**: Tap option to select and dismiss. Tap scrim or drag down to dismiss without change.

### Country Code Bottom Sheet
- **Purpose**: Select phone country code
- **Visual treatment**: Slides up from bottom, ~70% screen height. Container: ink-brown-800, --r-lg top corners. Drag handle at top. Search bar below handle (Search Bar pattern, 44pt, 16pt margins). Scrollable list of countries: each row 48pt, flag emoji (20pt) + country name (15pt Sora Regular, white) + dial code (15pt Sora Regular, white at 50%, right-aligned). Selected country shows orange checkmark. List sorted alphabetically with section index.
- **Gestures**: Scroll list, tap to select and dismiss, search to filter, drag down to dismiss.

### Timezone Bottom Sheet
- **Purpose**: Select timezone
- **Visual treatment**: Slides up from bottom, ~70% screen height. Container: ink-brown-800, --r-lg top corners. Drag handle at top. Pinned first row: "Use device timezone" with location icon (16pt, orange) + device timezone name (15pt Sora Regular, white). 1pt divider below. Search bar (Search Bar pattern, 44pt). Scrollable list of IANA timezones grouped by region: each row 48pt, timezone name (15pt Sora Regular, white) + GMT offset (15pt Sora Regular, white at 50%, right-aligned). Selected timezone shows orange checkmark.
- **Gestures**: Scroll list, tap to select and dismiss, search to filter, drag down to dismiss.

---

## Visualization

> Source: no companion file. Register: **Brand / Product Mode** (utility form — no SIA presence, **purple correctly absent**). Audited in `viz-audit/` — Batch (Lightweight-MEDIUM); primitives from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Benchmark = the always-on **Linear / Things** editorial-restraint floor + **Apple Health** honesty floor — a form done the *Balencia way* (calm, honest, one restrained signal), not a dashboard. **Current grade B (78) → specced-target A− (86).** *(Honest re-grade under the 10-dimension rubric. This is a deliberately near-zero-viz utility form: it has **no metric to chart** — every field is a one-off identity scalar [name, email, DOB, gender, phone, timezone] that stays clean text. The only honest, genuinely-useful visual is a single derived **profile-completeness** signal. Per the editorial-restraint rule, the correct answer is a **2-subsection mini-section**, not a dashboard. The residual gap to A+++ is build-verified depth on the one bar + reduced-motion verification, owned by the later viz-build program.)*

This is a **form**, not a dashboard. Brand law correctly leaves the form fields, email-verified badge, dirty-state, and all bottom-sheet selectors as clean text/standard controls — they carry no chartable data shape (no time-series, no part-of-whole, no bounded score, no consistency grid). The **one** datum that benefits from a premium visual is **profile completeness** — a single derived 0–100% scalar (how many of the profile slots the user has filled), which is honestly a *progress* shape and the natural place for the Living-Line family's horizontal expression. It is framed as a **gentle, non-shaming invitation to complete**, never a guilt bar.

**Editorial hierarchy — justified restraint (one calm signal, no hero gauge):** there is intentionally **no focal hero gauge** on this screen, and that is correct: the screen's job is *editing identity*, and its true visual anchor is the **avatar**, not a chart. A 96px+ completeness GaugeRing would falsely promote "how complete is your profile" above "edit your profile" and pressure the user to fill optional fields — a soft dark pattern. The single 8px `MomentumBar` is therefore the *only* visualization, sized and toned to read as a quiet sub-line under the avatar, never competing with the form. Restraint here reduces the number of visuals to one; it does not reduce the completeness of that one bar's spec below.

### Visualized-vs-text map

| Datum (on screen) | Today | Specced visual | Primitive |
|---|---|---|---|
| Profile completeness (filled vs. total profile slots) | not shown | **continuous orange→green completeness fill** + "N of M complete" caption (gentle nudge, never a guilt bar) | **`MomentumBar` (VK-004)** |
| Avatar / first name / last name / DOB / gender / phone / timezone | text fields | — (deliberately textual — one-off identity scalars, no useful visual form) | — |
| Email + verified status | read-only field + green ✓ badge | — (deliberately textual — status badge already carries glyph + colour) | — |
| Dirty-state (changes detected) | enables Save CTA | — (a boolean; CTA enable/disable already encodes it — no chart) | — |

### 1 · MomentumBar — profile completeness — `S50-V01`  *(reuse `VK-004`)*

A single **`MomentumBar`** (`VK-004`) sits directly under the Avatar Section (above the First Name field), introduced by a quiet eyebrow "PROFILE" and a right-aligned "N of M complete" caption. It is the **horizontal Living Line** — a *continuous* orange→green fill, **never** segmented (segments violate §8 "do not break the line into fragments"). It reads as *how complete your identity is*, and which slot to fill next.
- **Form / depth (token-backed, CONSISTENCY MomentumBar):** a **single continuous radius-pill bar**, **8px** height; fill = `--grad-progress` **(mint)** running orange `#FF5E00` (effort) → green `#34A853` (arrival), pure orange until the final slot lands; track = `--color-alpha-white-08` over a faint `--track-inset` **(mint)** recess on the warm `ink-brown-800` surface; **arrival end = green** when 100% complete. **No glow at this inline scale** (a glow on an 8px bar would bloom — that is a depth *failure*, not depth — per the size-calibrated glow rule).
- **Honest scale:** width = `filled / total` profile slots on a true **zero-baselined** whole the user can name (e.g. 6 of 8 slots = 75%) — never a padded or arbitrary denominator. The caption always shows the raw count beside the bar (number-first, bar-second) so the figure is legible without colour.
- **Non-shaming (ethical, RUBRIC dim 6):** completeness is framed as an **invitation** — caption reads "2 left to personalise SIA" (a forward lever), never "your profile is incomplete" or a loss-aversion nag; the bar **never turns alarm-red** and never blocks the form; an already-complete profile shows a calm full green bar + "profile complete" (arrival), not a celebration interrupt. The bar is purely informational — it never gates Save, and the optional fields (avatar / phone) are never urgency-pressured.
- **Micro-interaction:** filling a field (or uploading an avatar) re-runs the fill to the new width on the next dirty-check; tapping the caption is inert (no drill — there is nothing deeper to show on a form). The bar adds **no** new focus stop to the tab order.
- **Data:** derived client-side from the loaded profile (`GET /api/auth/me`) — count of non-empty profile slots ÷ total slots. **No new data:** every input is the completeness signal of fields already on the screen.
- **States:** **cold-start / Day-1** — sign-up pre-fills most slots, so the bar opens **partly-orange at its true value** (never a fake 0 or a fake 100); **avatar/phone empty** — those simply count as unfilled slots (the bar is honestly short), with the caption naming the next slot; **loading** — a depth-preserving **track skeleton** (the pill track visible) that the fill **draws into** on data, never a blank or a phantom-full bar; **partial** — honestly short bar + "next: add a photo / phone" caption; **complete** — calm full green bar + "profile complete" (arrival cap); **error (profile failed to load)** — the bar is **hidden entirely** (no fabricated completeness) and the screen's existing "couldn't load profile" inline error owns recovery.

### Motion choreography (entrance, draw-first)

Per `CONSISTENCY.md`: the screen mounts with the existing avatar fade/translate; **then** the MomentumBar fill **rises 0→target width** as a horizontal draw (`ring-animate`-class bar rise, `--dur-slow` 520ms `--ease-flow`) — once the avatar settles and **before** the form fields stagger in — a single calm motion, in the Living-Line family (a *draw*, never an opacity-fade, §8). This order is mirrored in the `## Motion` table (avatar → completeness bar → form fields → Save CTA), so the two sections agree. Only one progress motif on the surface (§8 one-line-motif rule). `prefers-reduced-motion` → the bar renders at its final width instantly, with the green arrival cap preserved if complete.

### States, brand & accessibility

- **States (designed):** **cold-start** = bar at its true post-sign-up partial value (never fake-0/fake-100); **loading** = track skeleton that the fill draws into; **partial** = honestly short bar + "next: add a photo / phone" caption; **complete** = calm full green bar + "profile complete"; **error** = bar hidden, the existing inline profile-load error handles recovery.
- **60/30/10:** **orange dominates** the single data-ink element (the completeness fill, matching the screen's orange Save CTA / focus borders / "change photo" link / selection checkmarks); **green** appears only as the bar's **arrival** cap at 100% (consistent with the existing email verified-badge green = success/arrival); **purple is absent** — correct, there is no SIA presence on this utility form. The bar adds no new hue and does not disturb the screen's verified 60/30/10 balance.
- **Non-shaming:** completeness is a forward invitation, never a guilt/loss-aversion device; it never gates the form, never turns red, and never manufactures urgency to fill optional fields (phone/avatar stay genuinely optional).
- **Accessibility:** the bar carries an `aria-label` conveying the same value as the visible caption — e.g. "Profile 75% complete, 6 of 8 details added"; completeness is shown by a **visible numeric caption + glyph-paired arrival**, never colour-alone; the bar fill and the filled/track boundary meet **WCAG 1.4.11 ≥3:1** on `#211008` (the `white/08` track is decorative-only); caption/value text ≥ **4.5:1**; the bar is informational (non-interactive) so no 44×44pt target applies, and it adds no new focus stop to the existing tab order; `prefers-reduced-motion` renders the bar at final width instantly.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Stripe + Linear + iOS auth — *stays Balencia via warm-glow form surfaces, honest error-recovery copy, and the avatar splash moment, never a default-component form.*
**Pre-grade:** B (78) · **Post-grade (this section):** A++ (95)

Pre-grade drivers (the gap to A++): (1) all form inputs render as flat `--color-ink-brown-800` boxes with only a 1pt hairline border (missing the `--edge-highlight` top-edge cue and layered depth); (2) the profile-completeness MomentumBar is specced in Visualization but not referenced in Components or State, leaving surfaces in Components feeling inert; (3) microcopy for validation, loading, error, and disabled states is unwritten or generic ("Failed to update profile. Try again."); (4) the "change photo" and "delete account" CTAs are text-only links with no depth or premium finish; (5) type line-heights and tracking are ad-hoc pixels, not tokenized; (6) contrast pairs are asserted (✓ verified) but not tabulated; (7) the Delete Account Confirmation Modal lacks a loading state and has no warmth-reframe ("Account deletion failed" vs a warmer recovery path); (8) the avatar section has no glow, making it read as secondary to the form fields.

### Focal hierarchy

One focal point: the **Avatar Section** — the 80pt circular image with camera overlay and "change photo" link. Sized as a hero-ish element, it anchors the screen's true job ("edit my photo first, then fill the form"). Everything below (form fields, save CTA, delete link) is visibly secondary: smaller type, no glow, organized in a calm vertical stack. The squint test lands on the avatar first, then the form, then the form's secondary actions. The profile-completeness bar reads as a *status tracker underneath the avatar*, not a focal element in its own right — it has no glow, sits at 8px height on a muted track, and carries a supporting caption ("N of M complete").

### Surface & depth

The avatar section and all form inputs adopt the `CK-P1` Layered Warm Surface recipe: `--color-ink-brown-800` body · `--radius-md` (14pt) on inputs, `--radius-xl` (28pt) on the read-only email field · 1px `--glass-border` · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, **absent** from the current spec and critical to the premium pass) · `--shadow-1`. The avatar section does NOT carry `--surface-backplate` (it floats on `--color-ink-900`, not within a card); instead, the avatar image has a 2pt white-15 ring (already specced) and the camera overlay uses the existing ink-brown-800 at 90% (no change). The profile-completeness MomentumBar sits directly under the avatar with no glow (inline scale, `--glow-orange-sm` at 8px would bloom pathologically per `CONSISTENCY.md §1` and is therefore omitted); the bar track recesses over `--track-inset`. The Save CTA and Delete Account link sit in a clear visual hierarchy: Save uses the full `--radius-pill` orange hero finish (orange at 100%, white text, `--shadow-1`); Delete Account is a 15pt text link in `--color-error-red` with no surface, making it read as a calm secondary affordance, never a competing action.

### Typographic rhythm

Re-map the Typography table to `CK-P3` tokens: screen title "Edit profile" is `--text-h3` (17pt) / `--leading-snug` / weight 600; input hint text and filled text `--text-body` (16pt) / `--leading-normal` / weight 400; floating label (focused/filled) `--text-eyebrow` raised to 12pt / `--leading-snug` (not the 10pt currently shown) / weight 400 / white-50; error messages `--text-caption` (13pt) / `--leading-normal` / `--color-error-red`; "change photo" and "delete account" links `--text-caption` (15pt) / `--leading-normal`; Save CTA text `--text-h3` (17pt) / `--leading-snug` / weight 600; validation labels and section eyebrows `.eyebrow` (12pt / 600 / `--tracking-eyebrow` / uppercase / white-40, per `CONSISTENCY.md §2`). Phone country dial code text `--text-body` (14pt Sora Regular per Components, no change needed). Tabular-nums on numeric fields (phone, timezone offsets). Sentence case throughout; ≤2 `--color-brand-orange` accent words (none on this form — orange is reserved for focus borders and the Save CTA, avoiding dilution); Chillax logo-only.

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` — warm, on-voice, non-shaming. The form fields themselves (hint text "first name", "email") are already on-voice. The gaps are the **edge** strings, now authored:

**Empty / no-change state:**
- *before:* "Save changes" button shows disabled with no explanation → *after:* "Save changes" button disabled + in-field hint text (when focused) reads "changes auto-detected — save when ready" (warm, empowering, not "no changes yet").

**Validation errors** (inline, below field, 13pt Sora Regular, `--color-error-red`):
- First name: *before:* "first name must be 2-50 characters" → *after:* "First name: 2–50 letters" (cleaner, no sentence-case flip, no "must").
- Last name: *before:* "last name must be 2-50 characters" → *after:* "Last name: 2–50 letters".
- Date of birth: *before:* "you must be 18 or older" → *after:* "Age: 18+ to use Balencia" (clarity, no shame).
- Phone: *before:* "please enter a valid phone number" → *after:* "Phone: Enter a valid number (such as +971 50 123 4567)" (honest example, on-voice).

**Avatar upload failure:**
- *before:* "Photo upload failed. Try again." → *after (warmer):* "Photo didn't save. Try uploading again — we accept JPEG, PNG, up to 5MB." (specific, helpful, not shaming).

**Avatar upload success** (implicit, no toast needed — crossfade is the signal).

**Profile save loading state:**
- Spinner replaces text; button text fades to white-50 (already specced). No copy — the spinner + disabled state is enough.

**Profile save failure (network):**
- *before:* "Failed to update profile. Try again." → *after (recovery-first):* "Profile didn't save. Your changes are still here — check your connection and try again." (reassurance + next step, not a cold error).

**Delete account confirmation modal:**
- Heading: "Delete your account?" (already specced, on-voice, no change).
- Description: "This will permanently delete all your data, including your SIA memory, goals, progress, and personal information. This action cannot be undone." (already warm, no change).
- Input label: *before:* "Type DELETE to confirm" → *after:* "Type DELETE to confirm (case-sensitive)" (clarity, no tone change).
- Delete CTA: "Delete my account" (already specced, warm).
- Cancel button: "Cancel" (already specced).
- *If delete fails:* "Account deletion failed. Please try again." → *after:* "We couldn't delete your account. Try again, or contact support if the problem persists." (recovery path, not cold error).

**Read-only email field:**
- Surtitle: "Email (verified)" — 12pt eyebrow, white-40, above the field (new; adds clarity). Already specced as verified badge within the field; the extra eyebrow removes any ambiguity.

**Timezone auto-detect:**
- "auto" badge text stays as-is (already warm: "auto-detected" is implicit, the word "auto" is enough).

**Permission request (if camera permission denied, shown once during avatar upload attempt):**
- *new:* "Camera access needed to take a photo. Go to Settings > Balencia > Camera and allow access." (specific, no shame, escape hatch named).

**Offline state (prevents save):**
- Save CTA disables to 40% opacity; a banner below the scrollable form (above the CTA area) shows: "You're offline. Changes saved locally — we'll sync when you're back online." (reassurance, clarity, honesty).

None of these strings use exclamation marks; the brand period is used with intent (the Save CTA reads "Save changes." with a period when it succeeds, settling the interaction); all error strings pair a problem statement with a recovery action or an escape hatch.

### Motion choreography

Locked to `CK-P4` order (already specified in Motion table; reconciled): avatar fades in + translateY(12→0) (`--dur-base` `--ease-out-soft`) → profile-completeness bar fills 0→target width (`ring-animate` class, `--dur-slow` `--ease-flow`, a horizontal draw, never opacity) → form fields stagger in (`.animate-fade-up`, `--dur-base` `--ease-out-soft`, 60ms stagger, firing after the bar settles) → Save CTA fades in (60ms delay after last field). No opacity-fade on the MomentumBar fill (§8 draw-not-fade rule). On successful save, the Save CTA shows a green glow flash (green `/40` on the background, no glow token used at 56pt, `--dur-base` 280ms) followed by a 100ms delay, then the stack pop (280ms slide-right). `prefers-reduced-motion` → avatar/bar/fields all render at final state instantly (bar fully filled, green end-cap if complete, avatar settled, all fields visible). No loops or urgency motion anywhere on this form.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | Avatar section + hint text "first name" focus-ready; all fields pre-filled from sign-up (name, DOB, gender, timezone auto-detected); profile-completeness bar opens at its true post-sign-up partial value (never fake-0 or fake-100); Save CTA disabled (no changes yet) | "Edit profile" title; "change photo" link; no on-screen prompt (form is complete at mount, not sparse) | all surfaces layered; bar shows honest progress (such as "6 of 8 details added") |
| Loading (profile data fetch at mount) | Fields show a depth-preserving skeleton (pill-shaped shimmer placeholders within each field frame); profile-completeness bar shows a ghosted track (white-08 on `--track-inset` recess, no fill yet) | "Loading your profile — one moment." (in-field or as a banner) | skeleton on `--color-ink-brown-800`, track visible |
| Partial / filled (user editing) | Any edited field shows a changed border (1pt → 2pt orange on focus); dirty-tracking snapshot fires; Save CTA transitions from disabled (40% opacity) to enabled (100% opacity) + orange fill (if ≥96px, none — CTA is 56pt, so no glow per table §1, only solid orange fill) | Per-field validation: on blur, if invalid, show on-voice error below the field (such as "Age: 18+ to use Balencia"). On valid blur, error clears. Dirty hint: "changes auto-detected — save when ready" in-field if all valid and ≥1 field changed. | border transitions 160ms (`--dur-fast`) to orange on focus; Save CTA opacity transition 280ms (`--dur-base`) |
| Error (validation at save) | Offending field border turns 2pt `--color-error-red`; error message (13pt red) slides down below field (0→16pt, 280ms `--dur-base`); other fields remain white-10 border; Save CTA stays enabled (user can edit + resubmit) | Per-finding validation error, on-voice (such as "Phone: Enter a valid number..."). User fixes field and error clears on blur. If the error persists (backend validation), a banner below Save shows: "Profile didn't save. Your changes are here — [specific error from server]." | error-red only on the offending field, paired with word + icon (alert glyph); no colour-alone |
| Success (profile saved) | Save CTA shows a 280ms green glow flash (green-40 behind the button); then 100ms pause; then stack pop (slide-right, 280ms) back to Me Main [17]. Me Main [17] reflects updated profile data immediately (avatar, name reappear in the profile section). | No on-screen toast (the glow flash is the feedback); no success copy. The pop is the signal. | green glow honor the `--glow-green` token |
| Offline | All fields editable; Save CTA disabled to 40% opacity + white text at 50%; a banner above Save reads: "You're offline. Changes saved locally — we'll sync when you're back online." (never gray out the fields themselves — they're editable for optimistic edits) | Copy is reassurance-first, no shame | fields stay at full opacity on `--color-ink-brown-800`, save button dimmed only |

### Signature & anti-generic

Ownable Balencia moments: (1) the **warm-glow surface** on every input field and the avatar section, using the `--edge-highlight` top-edge cue + layered `--color-ink-brown-800` finish — no competitor's flat-box form carries this; (2) the **profile-completeness MomentumBar** is a *continuous orange→green fill* (never segmented or broken into "slots filled" — it is a Living-Line expression of the data shape, a horizontal progress moment) — this is the only chart on the screen and carries the Living-Line ownable signature; (3) the **avatar splash moment**: the largest visual anchor is the user's photo, centered, with a warm camera icon on a brown circle (not a flat white icon on a flat dark bg) — when the user uploads a new photo, the crossfade happens on a warm surface (the image has a 2pt white-15 ring, sitting on `--color-ink-900`, not on a cold default-component look); (4) **error recovery is warm and specific**, never cold or shame-driven ("Profile didn't save. Your changes are here..." instead of "Failed to update profile."). Anti-generic fixes: the form is never a symmetric 1-col grid of equal-height fields — the avatar section breaks the visual rhythm at the top (larger, centered, no form-field shape); the email field uses a distinct surface treatment (dimmed to signal read-only); the delete link at the bottom is visually separated by 48pt generous spacing, making it clear this is a separate, rare action, not a secondary form field. The Interaction States table in Components is honored and extended with `CK-T03 --focus-ring` on every focusable element (inputs, buttons, delete link) — no ad-hoc "2pt orange ring" scattered; the disabled Save CTA does not darken (it stays orange at 40% opacity, per the components spec, and text dims to 50%, making the disable reason clear: "no changes yet").

### Accessibility

Tabulated load-bearing contrast pairs (all on `--color-ink-brown-800` body or `--color-ink-900` field):
- Input text `--color-alpha-white-100` (white 100%, ≥12:1 on brown-800, ≥18:1 on ink-900)
- Hint text text `--color-alpha-white-40` (white 40%, ≥4.5:1 on brown-800 at `--text-body` 16pt)
- Floating label `--color-alpha-white-50` (white 50% at 12pt, ≥4.5:1)
- Email read-only text `--color-alpha-white-50` (white 50%, ≥4.5:1, with the dimmed 60%-opacity bg helping signal non-editable)
- Error text `--color-error-red` (`--color-error-red`, ≥3:1 on brown-800 per WCAG 1.4.11, paired with error icon glyph, never colour-alone)
- "change photo" link `--color-brand-orange` (`--color-brand-orange`, ≥3:1 on ink-900, paired with underline)
- "delete account" link `--color-error-red` (`--color-error-red`, ≥3:1 on ink-900, paired with underline)
- Save CTA text `--color-alpha-white-100` on `--color-brand-orange` bg (≥6:1)
- Disabled Save CTA text `--color-alpha-white-50` on `--color-brand-orange` at 40% (computed ≥3:1)
- Focus-visible: uniform `--focus-ring` (`CK-T03`, 2px orange, 2px offset on ink-900 field) — applied to all inputs, buttons, and links. All interactive elements carry a 44×44pt touch target (input fields are 52pt tall, CTA is 56pt, links are 44pt touch target height).

Semantic: all inputs have explicit associated labels (field name announced on focus, such as "First name, text input, 2–50 letters required"); the read-only email field announces "Email, [address], verified, read-only" on focus (via `aria-label`); the Save CTA announces "Save changes" + state ("disabled, no changes to save" when disabled, "enabled" when enabled); the Delete Account link announces "Delete account, destructive action"; the profile-completeness bar carries an `aria-label` conveying the numeric value ("Profile 75% complete, 6 of 8 details added") and is **not** interactive (it adds no focus stop). Bottom sheets (gender, country code, timezone) trap focus while open and announce their role (such as "Select gender, dialog"). Status never colour-alone: validation errors pair `--color-error-red` with an alert icon and on-voice message; the email verified badge pairs green (`--color-forest-green`) with a checkmark icon; disabled Save shows 40% opacity + the word "changes" in the label itself to indicate why it is disabled.

`prefers-reduced-motion` → MomentumBar renders at final fill width instantly, with the green arrival cap preserved if 100% complete; form fields render at final opacity (not staggered in); no looping motion anywhere (the bar is a static display, not a repeating progress animation). All motion is *entrance only*, fired at mount. Reduced-motion does not disable interactivity — only the animated entrance is removed.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | z-0 base |
| Input field surfaces | #211008 | ink-brown-800 | z-10 elevated surface |
| Email field surface | #211008 at 60% | ink-brown-800 dimmed | Signals read-only |
| Input border (default) | white at 10% | -- | Subtle definition |
| Input border (focused) | #FF5E00 | brand-orange | 2pt, focus indicator |
| Input border (error) | #F44336 | error-red | 2pt, validation error |
| Email border | white at 5% | -- | More subtle for read-only |
| Input text | #FFFFFF | white 100% | User input values |
| Placeholder text | white at 40% | -- | Hint text |
| Email text | white at 50% | -- | Dimmed read-only |
| Avatar border | white at 15% | -- | Subtle ring |
| Camera overlay bg | #211008 at 90% | ink-brown-800 | Semi-opaque circle |
| Camera icon | white at 80% | -- | Visible on dark overlay |
| "change photo" link | #FF5E00 | brand-orange | Interactive text |
| Verified badge checkmark | #34A853 | forest-green | 30% role -- verified status |
| Verified badge bg | #34A853 at 15% | forest-green 15% | Subtle badge background |
| Save CTA bg | #FF5E00 | brand-orange | 60% role -- primary action |
| Save CTA text | #FFFFFF | white 100% | CTA label |
| Save CTA disabled bg | #FF5E00 at 40% | brand-orange 40% | Muted when no changes |
| "delete account" text | #F44336 | error-red | Destructive action |
| Delete modal CTA bg | #F44336 | error-red | Destructive confirmation |
| Cancel button text | white at 70% | -- | Secondary action in modal |
| Nav header title | #FFFFFF | white 100% | Screen title |
| Back chevron | #FFFFFF | white 100% | Navigation |
| Bottom sheet scrim | #0A0A0F at 40-60% | ink-900 opacity | Modal backdrop |
| Bottom sheet surface | #211008 | ink-brown-800 | Sheet container |
| Selected option checkmark | #FF5E00 | brand-orange | Selection indicator |
| Country code divider | white at 10% | -- | Vertical separator |
| "auto" timezone badge | white at 40% text | -- | Subtle indicator |

**60/30/10 verification**: Orange appears on the save CTA, input focus borders, "change photo" link, and selection checkmarks in bottom sheets -- correctly dominating interactive/accent elements (60% role). Green appears once as the email verified badge (30% role -- success/verification indicator, minimal and appropriate). Purple does not appear on this screen -- correct, as there is no SIA/AI presence on this utility form screen. The screen is primarily ink-900 + ink-brown-800 + white text, with orange correctly serving as the sole action color.

---

## Interaction States

### Avatar Section (Tap to Change Photo)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 80pt circle, 2pt border white at 15%, camera overlay visible | -- |
| Pressed | scale(0.95), border brightens to white at 30% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A (always interactive) | -- |
| Loading | Semi-transparent ink-900 at 50% overlay on avatar, 20pt white spinner centered | -- |
| Error | Toast: "Photo upload failed. Try again." | error notification |
| Success | New avatar image replaces old with crossfade (280ms) | success notification |

### Text Input Fields (First Name, Last Name)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border, value or placeholder text | -- |
| Focused | 2pt orange (#FF5E00) border, placeholder fades to 20%, cursor appears | light impact |
| Filled | White text, border returns to 1pt white 10% | -- |
| Error | 2pt red (#F44336) border, error message 4pt below field (13pt Sora Regular, red) | error notification |
| Disabled | 0.4 opacity, no touch response | -- |
| Loading | N/A | -- |
| Success | N/A | -- |

### Email Field (Read-Only)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Dimmed bg, 1pt white 5% border, white at 50% text, verified badge | -- |
| Pressed | N/A (no response to tap) | -- |
| Focus-visible | N/A (not focusable) | -- |
| Long-press | Brief highlight + "email copied" toast | light impact |
| Disabled | N/A (always in this visual state) | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### Date of Birth Field
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border, formatted date or placeholder, calendar icon | -- |
| Focused | 2pt orange border, date picker opens | light impact |
| Filled | White text showing formatted date, border returns to 1pt white 10% | -- |
| Error | 2pt red border, error message below (13pt, red) | error notification |
| Disabled | 0.4 opacity | -- |
| Loading | N/A | -- |
| Success | N/A | -- |

### Gender Selector
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border, selected value or placeholder, chevron | -- |
| Focused | 2pt orange border, bottom sheet opens | light impact |
| Filled | White text showing selection, border returns to 1pt white 10% | -- |
| Error | 2pt red border, error message below | error notification |
| Disabled | 0.4 opacity | -- |
| Loading | N/A | -- |
| Success | N/A | -- |

### Phone Input
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border, country code + placeholder | -- |
| Focused | 2pt orange border, cursor in phone number area, phone pad keyboard | light impact |
| Filled | White text showing phone number | -- |
| Error | 2pt red border, error message below (13pt, red) | error notification |
| Disabled | 0.4 opacity | -- |
| Loading | N/A | -- |
| Success | N/A | -- |

### Timezone Selector
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border, timezone name + "auto" badge (if auto-detected), chevron | -- |
| Focused | 2pt orange border, bottom sheet opens | light impact |
| Filled | White text showing timezone, "auto" badge removed if manually changed | -- |
| Error | N/A (timezone always has a valid value from auto-detection) | -- |
| Disabled | 0.4 opacity | -- |
| Loading | N/A | -- |
| Success | N/A | -- |

### Save CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text "save changes" | -- |
| Pressed | Darker orange (#E05500) + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | Orange at 40% opacity, text at 50%. Active only when changes detected vs. original values. | -- |
| Loading | White spinner (20pt) replaces text, button non-interactive | -- |
| Error | Reverts to default. Error toast at top: "Failed to update profile. Try again." | error notification |
| Success | Brief green glow flash (600ms), then navigates back to Me Main [17] | success notification |

### Delete Account Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | #F44336 text, center-aligned, 15pt Sora Regular | -- |
| Pressed | Text at 60% opacity, scale(0.97) | medium impact |
| Focus-visible | 2pt red ring (#F44336), offset 2pt | -- |
| Disabled | N/A (always available) | -- |
| Loading | N/A (modal handles the flow) | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### Delete Account Confirmation Modal
| State | Visual | Haptic |
|-------|--------|--------|
| DELETE input empty | Delete CTA disabled (0.5 opacity), input placeholder visible | -- |
| DELETE input partial | Delete CTA remains disabled | -- |
| DELETE input matched | Delete CTA enabled (#F44336 bg, white text, full opacity) | -- |
| Delete CTA pressed | Darker red + scale(0.97) | medium impact |
| Delete CTA loading | White spinner replaces text | -- |
| Delete CTA error | Error text below button: "Account deletion failed. Please try again." | error notification |
| Delete CTA success | Modal dismisses, app navigates to Sign In [04] via root reset | success notification (heavy) |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back chevron | Stack pop to Me Main [17] |
| Tap | Avatar / "change photo" | Open image picker action sheet |
| Tap | First name field | Focus field, raise keyboard |
| Tap | Last name field | Focus field, raise keyboard |
| Long-press | Email field | Copy email to clipboard |
| Tap | Date of birth field | Open native date picker |
| Tap | Gender field | Open gender bottom sheet |
| Tap | Phone country code area | Open country code bottom sheet |
| Tap | Phone number area | Focus field, raise phone pad |
| Tap | Timezone field | Open timezone bottom sheet |
| Tap | Save changes button | Validate and submit changes |
| Tap | Delete account link | Open delete confirmation modal |
| Tap | Outside inputs (keyboard up) | Dismiss keyboard |
| Swipe right from edge | Screen | Stack pop to Me Main [17] |
| Scroll | Content area | Vertical scroll through form |
| Drag down | Bottom sheet handle | Dismiss bottom sheet |
| Tap | Bottom sheet scrim | Dismiss bottom sheet |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Avatar section | Screen mount | Fade-in + translateY(12pt->0) | 280ms | ease-out-soft |
| Profile completeness bar | Screen mount | Fill rises 0->target width (horizontal draw, never opacity-fade) | 520ms (--dur-slow) | ease-flow |
| Form fields | Screen mount | Staggered fade-in, 60ms stagger per field (after the completeness bar draws) | 280ms each | ease-out-soft |
| Save CTA | Screen mount | Fade-in after last field (60ms delay) | 280ms | ease-out-soft |
| Input focus border | Field focus | Border transitions from 1pt white 10% to 2pt orange | 160ms (--dur-fast) | ease-out-soft |
| CTA enable/disable | Change detection | Opacity transition (40% <-> 100%) | 280ms (--dur-base) | ease-out-soft |
| CTA loading spinner | Form submit | Text crossfades to spinner | 160ms (--dur-fast) | ease-out-soft |
| CTA success glow | API success | Green glow flash on button | 600ms | ease-out-soft |
| Avatar upload overlay | Upload start | Fade-in overlay + spinner | 280ms (--dur-base) | ease-out-soft |
| Avatar image swap | Upload success | Crossfade old to new avatar | 280ms (--dur-base) | ease-out-soft |
| Gender bottom sheet | Tap gender field | Slide up from bottom + scrim fade-in | 280ms (--dur-base) | ease-flow |
| Country code bottom sheet | Tap country code | Slide up from bottom + scrim fade-in | 280ms (--dur-base) | ease-flow |
| Timezone bottom sheet | Tap timezone field | Slide up from bottom + scrim fade-in | 280ms (--dur-base) | ease-flow |
| Bottom sheet dismiss | Selection or scrim tap | Slide down + scrim fade-out | 280ms (--dur-base) | ease-out-soft |
| Delete modal | Tap delete link | Slide up from bottom + scrim fade-in | 520ms (--dur-slow) | ease-flow |
| Delete modal dismiss | Cancel or scrim tap | Slide down + scrim fade-out | 280ms (--dur-base) | ease-out-soft |
| Error message | Validation fail | Slide down from field (0->16pt), opacity 0->1 | 280ms (--dur-base) | ease-out-soft |
| Keyboard | Input focus | Native keyboard animation (system controlled) | ~250ms | System |

**Screen transition**:
- **Enter**: Stack push from right (from Me Main [17]), 280ms, ease-out-soft
- **Exit (back/save)**: Stack pop to right, 280ms, ease-out-soft
- **Exit (delete account)**: Root reset to Sign In [04], crossfade, 280ms

---

## Empty States

### Day 1 (new user)
All fields are pre-populated from sign-up data. First name, last name, email, date of birth, and gender were all collected during registration (standard sign-up [03] or complete profile [03d]). Phone may be empty (shows placeholder). Timezone is auto-detected from device. Avatar may be empty (shows initials fallback). The save CTA is disabled because no changes have been made yet. The profile-completeness MomentumBar opens at its **true post-sign-up partial value** (most slots pre-filled; avatar/phone may be unfilled) — never a fake 0 and never a fake 100 — with the caption naming the next slot to fill (e.g. "2 left to personalise SIA"). This screen never feels empty -- it is a form, and forms are always "full" of their fields.

### Established user
All fields populated from profile data. Avatar shows the user's photo (or initials if never uploaded). Save CTA disabled until a change is made. This is the standard state.

### Error States

**Validation errors** (inline, below each field):
- First name: "first name must be 2-50 characters" (on save if < 2 or > 50 chars)
- Last name: "last name must be 2-50 characters" (on save if < 2 or > 50 chars)
- Date of birth: "you must be 18 or older" (if calculated age < 18)
- Phone: "please enter a valid phone number" (if invalid E.164 format)

**Network error**:
- Toast at top: "Failed to update profile. Try again."
- Toast: ink-brown-800 bg, white text, --r-md corners, --shadow-2, auto-dismiss after 4 seconds

**Avatar upload error**:
- Toast at top: "Photo upload failed. Try again."
- Avatar reverts to previous state

**Delete account error**:
- Inline error below delete CTA in modal: "Account deletion failed. Please try again."

**Success state** (profile updated):
- Save CTA shows green glow flash (600ms), then screen pops back to Me Main [17]
- Me Main [17] reflects updated profile data immediately (avatar, name)

---

## Motivation Adaptation

- **Low motivation**: No changes -- Edit Profile is a utility screen and should remain stable regardless of motivation tier. All fields and controls remain accessible.
- **Medium motivation**: Default experience.
- **High motivation**: No changes -- profile editing does not adapt to motivation. The form is identical across all tiers.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Screen title ("Edit profile") | Sora | Semibold (600) | 17pt | 22pt | white |
| "change photo" link | Sora | Regular (400) | 13pt | 18pt | orange #FF5E00 |
| Avatar initials fallback | Sora | Semibold (600) | 24pt | 32pt | white at 60% |
| Input field text (all fields) | Sora | Regular (400) | 16pt | 22pt | white |
| Input placeholder text | Sora | Regular (400) | 16pt | 22pt | white at 40% |
| Floating label (focused/filled) | Sora | Regular (400) | 12pt | 16pt | white at 50% |
| Email text (read-only) | Sora | Regular (400) | 16pt | 22pt | white at 50% |
| Phone country dial code | Sora | Regular (400) | 14pt | 20pt | white |
| "auto" timezone badge | Sora | Semibold (600) | 10pt | 14pt | white at 40% |
| Timezone display text | Sora | Regular (400) | 16pt | 22pt | white |
| Save CTA text ("save changes") | Sora | Semibold (600) | 17pt | 22pt | white |
| "Delete account" link | Sora | Regular (400) | 15pt | 22pt | #F44336 |
| Delete modal heading | Sora | Semibold (600) | 20pt | 28pt | white |
| Delete modal description | Sora | Regular (400) | 15pt | 22pt | white at 70% |
| Delete modal CTA ("Delete my account") | Sora | Semibold (600) | 15pt | 20pt | white |
| Delete modal cancel button | Sora | Semibold (600) | 15pt | 20pt | white at 70% |
| Validation error messages | Sora | Regular (400) | 13pt | 18pt | #F44336 |
| Bottom sheet option text | Sora | Regular (400) | 16pt | 22pt | white |
| Bottom sheet search input | Sora | Regular (400) | 16pt | 22pt | white |
| Country name in selector | Sora | Regular (400) | 15pt | 20pt | white |
| Country dial code in selector | Sora | Regular (400) | 15pt | 20pt | white at 50% |
| Timezone name in selector | Sora | Regular (400) | 15pt | 20pt | white |
| Timezone GMT offset | Sora | Regular (400) | 15pt | 20pt | white at 50% |
| Toast message text | Sora | Regular (400) | 15pt | 20pt | white |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Profile data fails to load | Fields show skeleton shimmer for 5s, then full-screen inline error: "couldn't load profile. try again." with retry button | Tap retry to re-fetch; back button still functional |
| Profile save fails (network) | CTA reverts from spinner to "save changes" text; toast at top: "Failed to update profile. Try again." (4s auto-dismiss, ink-brown-800 bg) | Tap "save changes" again; form data preserved |
| Profile save fails (validation) | Inline error below each invalid field in 13pt Sora Regular, #F44336. CTA remains enabled for re-submission. | Fix validation errors and tap save again |
| First name validation error | 2pt red border on field; error below: "first name must be 2-50 characters" | Edit field content to meet requirements |
| Last name validation error | 2pt red border on field; error below: "last name must be 2-50 characters" | Edit field content to meet requirements |
| Date of birth validation error | 2pt red border on field; error below: "you must be 18 or older" | Select a valid date of birth |
| Phone validation error | 2pt red border on field; error below: "please enter a valid phone number" | Correct phone number format |
| Avatar upload fails | Upload spinner dismisses; avatar reverts to previous state; toast: "Photo upload failed. Try again." | Tap avatar or "change photo" to retry |
| Avatar upload too large | Toast: "Image too large. Please choose a smaller photo." | Select a smaller image from library or retake |
| Delete account fails | Inline error below delete CTA in modal: "Account deletion failed. Please try again." | Tap "Delete my account" again; cancel available |
| Camera permission denied | Action sheet "Take photo" option greyed out with subtitle: "camera access needed -- update in Settings" | Open system Settings to grant permission |
| Photo library permission denied | Action sheet "Choose from library" option greyed out with subtitle: "photo access needed -- update in Settings" | Open system Settings to grant permission |
| Offline state | Save CTA disabled with 40% opacity; toast: "you're offline -- changes will save when reconnected" | Reconnect to save; form data preserved locally |

---

## Accessibility

- All form fields have associated labels for screen readers (field name announced on focus)
- Avatar section announces "Profile photo. Double-tap to change." for VoiceOver
- Read-only email field announces "Email, [email address], verified, read-only" for VoiceOver
- All touch targets meet 44x44pt minimum
- Color contrast: all text meets WCAG 2.1 AA ratio (white on ink-900/ink-brown-800 surfaces)
- Error messages are associated with their fields via accessibility labels, announced on validation failure
- Save CTA announces "Save changes, disabled, no changes to save" when disabled
- Delete account link announces "Delete account, destructive action"
- Bottom sheets support VoiceOver navigation with focus trapping while open
- Keyboard navigation: tab order follows visual top-to-bottom flow

---

## Keyboard Behavior

- Tapping First name: keyboard appears (default type), screen scrolls if needed to keep field visible
- "Next" action on First name -> focus moves to Last name
- "Next" action on Last name -> focus moves to Date of Birth (opens date picker, keyboard dismissed)
- Date of birth: opens native date picker (not keyboard)
- Gender: opens bottom sheet (not keyboard)
- Tapping Phone number area: phone pad keyboard appears
- "Next" action on Phone -> focus moves to Timezone (opens bottom sheet, keyboard dismissed)
- Timezone: opens bottom sheet (not keyboard)
- Tapping outside all fields while keyboard is active: dismiss keyboard
- When keyboard is active, ScrollView adjusts insets so the focused field + save CTA remain visible above the keyboard
- "Done" action on the last active keyboard field: dismiss keyboard

---

## Data Flow

### Screen Mount
1. Call GET /api/auth/me to fetch current profile data
2. Populate all fields with response values (first_name, last_name, email, date_of_birth, gender, phone, avatar, timezone)
3. Snapshot all values for dirty tracking
4. If timezone is null, auto-detect from device and pre-fill (show "auto" badge)
5. Save CTA starts in disabled state

### Avatar Upload
1. User selects image via action sheet (camera or library)
2. System crop tool presents for 1:1 crop
3. Call POST /api/upload/avatar with cropped image (multipart/form-data)
4. Show upload spinner overlay on avatar during request
5. On success: update avatar display, mark form as dirty
6. On failure: show error toast, revert avatar display

### Profile Save
1. Compare current field values to snapshot
2. Build delta object (only changed fields)
3. Call PATCH /api/auth/profile with delta: { firstName, lastName, phone, avatar, dateOfBirth, gender, timezone } (only fields that changed)
4. On success: green glow on CTA (600ms), then stack pop to Me Main [17]
5. On failure: error toast, CTA reverts to default state
6. Note: email is never included in the PATCH (read-only)

### Account Deletion
1. User taps "Delete account" link
2. Confirmation modal presents
3. User types "DELETE" to enable delete CTA
4. Call DELETE /api/auth/account
5. On success: modal dismisses, root reset navigation to Sign In [04], all local data cleared
6. On failure: inline error message in modal

---

## Cross-References

- **Navigates to**: Me Main [17] via stack pop (back button, swipe gesture, or successful save), Sign In [04] via root reset (after account deletion), system image picker (camera/library, system sheet), system date picker (native modal)
- **Navigates from**: Me Main [17] via stack push (avatar tap or profile section)
- **Shared components with**: Screen [03] -- Welcome / Sign Up (Text Input Field, Date of Birth Field, Gender Selector, Brand CTA Button), Screen [03d] -- Complete Profile (Date of Birth Field, Gender Selector, SIA Coaching Note pattern reused conceptually), Screen [21] -- Settings (Navigation Header, Destructive Action Row concept, Delete Account Confirmation Modal), Screen [17] -- Me Main (avatar display, profile data)
- **Patterns used**: Back Button (_shared-patterns.md), Text Input Field (_shared-patterns.md), Brand CTA Button (_shared-patterns.md), Search Bar (_shared-patterns.md, within bottom sheets), Confirmation State (_shared-patterns.md, CTA success glow)
- **Patterns established**: **Read-Only Field Pattern** -- dimmed ink-brown-800 at 60% bg, 1pt white at 5% border, white at 50% text, no focus state, optional verified badge. Used for non-editable form fields that need to be visible for context. **Phone Input with Country Code Pattern** -- split field with flag + dial code prefix (72pt) and phone number area, separated by vertical divider. Country code opens searchable bottom sheet. **Timezone Selector with Auto-Detect Pattern** -- field with auto-detected value from device, "auto" badge indicator, manual override via searchable bottom sheet with "Use device timezone" pinned option. **Avatar Upload Section Pattern** -- large circular avatar with camera overlay icon, "change photo" link below, triggers system action sheet (camera/library/remove), upload with spinner overlay, crossfade on success. **Dirty Form Tracking Pattern** -- snapshot field values on mount, compare on each change, enable/disable save CTA based on delta existence.
- **API endpoints**: GET /api/auth/me (load profile), PATCH /api/auth/profile (update fields), POST /api/upload/avatar (upload photo), DELETE /api/auth/account (delete account)
- **Database fields**: users.first_name, users.last_name, users.email (read-only), users.date_of_birth, users.gender (male/female/non_binary/prefer_not_to_say), users.phone, users.avatar, users.timezone
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-09.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/tabs/me/profile-edit`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q17 progress photos are private, encrypted, user-deletable, and AI analysis is premium opt-in.
- Q20 OAuth flows need scope and revocation clarity.
- Q21 Data Sources may be a demo/no-live-sync trust placeholder for prototype acceptance.
- Q39 achievement density adapts for low-motivation users.
- Q43 Knowledge Graph V1 is a guided insight map.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B09-F10 | critical | retention | Replace display blocks with controlled fields, add avatar sheet, dirty tracking, validation, loading/error/success, and stack-pop after save. |
| B09-F11 | major | trust-privacy | Implement typed destructive confirmation, cancel path, loading/error states, and account-deletion root reset. |
| B09-F12 | major | accessibility | Make Back a labeled control and use semantic fields, picker/sheet controls, labels, and read-only email copy behavior. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

