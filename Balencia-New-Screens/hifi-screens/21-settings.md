# 21-settings - A+++ hi-fi mobile spec

## Header
- **Source ID:** 21
- **Source spec:** `Balencia-New-Screens/screens/21-settings.md`
- **Evidence:** screens/21-settings.md, work/briefs/21.md, work/drafts/21.md, Functional Content Brief
- **Route(s):** `/settings`, `/preferences`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A centralized, premium control hub for account security, CIA communication preferences, privacy, and localization.
- **Premium Visual Director:** make Settings command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Settings uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-------------------------------------------+
       |                                (offline) |  44px targets
       |                                           |
       |            Settings                       |  H1 Title
       +-------------------------------------------+
       |  +-------------------------------------+  |
       |  | ACCOUNT                             |  |  Overline
       |  |    your@email.com                |  |
       |  |    Change password               |  |
       |  |    Subscription & billing        |  |
       |  |    Connected services            |  |
       |  +-------------------------------------+  |
       |                                           |
       |  +-------------------------------------+  |
       |  | CIA PREFERENCES                     |  |  Overline
       |  |    Coaching style: Supportive     |  |
       |  |   Formality: 4 / 10              |  |
       |  |   Check-in times: 8:00, 20:00    |  |
       |  |                                     |  |
       |  |  Your coaching is built on what    |  |  CIA Note (Tiempos accent)
       |  |  CIA learns from our conversations.|  |
       |  +-------------------------------------+  |
       |                                           |
       |  +-------------------------------------+  |
       |  | APPEARANCE & LOCALE                 |  |  Overline
       |  |   Theme: Dark        (coming soon)|  |  Display-only row
       |  |   Language: English (US)         |  |
       |  |   Units: Metric                  |  |
       |  +-------------------------------------+  |
       |                                           |
       |  +-------------------------------------+  |
       |  | EMERGENCY                           |  |
       |  |   Resources that help            |  |  SafetyResourceCard
       |  +-------------------------------------+  |
       |                                           |
       |  +-------------------------------------+  |
       |  |            Sign out                 |  |  BtnSecondary
       |  +-------------------------------------+  |
       |                                           |
       |  [Today]  [CIA]  [Goals]  [Me]            |  GlassNavBar
       +-------------------------------------------+

Route handling: `/settings`, `/preferences`
```

## Focal Hierarchy
- **Dominant focal moment:** Settings command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Top Bar with CIA only when the source supports a synthesized read.
- **Operational layer:** Account, CIA Preferences, Notifications, Appearance & Locale.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*settings*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - Transparent, transitions to `.glass-pill` backdrop on scroll.
- **SolidCard** - Base surface for all settings group containers. Data-dense legibility.
- **SectionHeader** - Overline text separating SolidCards.
- **ListRow** - Interactive rows with leading icons and trailing values/toggles.
- **GlassNavBar** - Floating bottom navigation.
- **BtnPrimary / BtnSecondary** - Used for destructive actions and data export.
- **ModalOverlay** - Used for password changes and delete account confirmation.
- **Toggle** - Interactive elements for binary preferences.
- **SafetyResourceCard** - Dedicated emergency resources link.
- **NEW: DisplayListRow** - A non-interactive variant of `ListRow` for states where a feature is locked or deferred (e.g., Light Mode). *Rationale: The brief demands "Dark only" with a "coming soon" label, which a standard interactive or disabled ListRow doesn't cleanly support without implying it's broken.*

## Data Honesty
- Every metric or configured preference ships with three distinct states to maintain the honesty invariant. (No fabricated numbers).
- **Example: CIA Formality Slider**
- **Real:** Value `4 / 10`. Provenance chip: `Set during onboarding`.
- **Low-confidence:** Value muted at 64%. Provenance chip: `estimated  low confidence`.
- **Honest-null:** `Not configured yet. Set a baseline.`
- **Example: Quiet Hours (Time Range)**
- **Real:** Value `22:00 - 07:00`. Provenance chip: `Default schedule`.
- **Low-confidence:** Value muted at 64%. Provenance chip: `estimated  low confidence`.
- **Honest-null:** `Not configured yet. Add a schedule.`

## Consent and Safety
- Settings uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/settings`, `/preferences`. Do not add alternate vanity routes.

## States
- **Default:** Fully populated from onboarding defaults (e.g., Face ID off, theme dark, CIA style supportive). No blank rows.
- **Skeleton:** When saving preferences, a subtle skeleton shimmer appears over the affected section. The toggle switch thumb is replaced with a 12pt spinner.
- **Empty / Partial:** Rows are never truly blank; unconfigured rows display ghosted text (`Not configured yet. Add a schedule.`).
- **Error:** Failed syncs cause the toggle track to flash neutral gray (respecting strict red discipline) for 400ms and revert to its previous state. `Couldn't save that setting. Check your connection and try again.`
- **Success:** Toggles slide with haptic feedback. Password updates yield: `Password *updated*.`
- **Disabled:** Rows requiring absent hardware (Biometrics on older devices) are hidden entirely.

## Motion
- **Physical easing:** Stack push/pop animations execute at 280ms with a complex ease.
- **Feedback (150-250ms):** Tapping a toggle row slides the thumb (160ms) and crossfades the track color. Triggers a medium haptic on successful state change.
- **Sheets/Modals:** Change password, pickers, and delete account slide up from the bottom (520ms complex ease) using `.glass-frost`.
- **Staggered entrance:** Section groups fade-in/translateY on screen mount, staggered by 80ms per section.
- **Glow behavior:** Static ambient. No breathing pulses on utility screens to avoid distraction.
- **Reduced-motion:** All staggered fade-ups and slide-ins are instantly bypassed if `prefers-reduced-motion` is enabled. Sheets render instantly without spring.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/settings`, `/preferences`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast pairs:** Paper-100 (#FEFAF3) on --surface-2 (#211008) exceeds 7:1 contrast. Secondary paper-64% maintains legible hierarchy.; **44px targets:** All interactive ListRows, chevrons, and bottom nav tabs maintain a minimum 44x44px touch target.; **Screen-reader labels:** Glyph-only icons and toggles include descriptive `aria-labels` (e.g., `Toggle background sync`, `Back to Me tab`).
