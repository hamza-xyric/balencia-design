# 66-notification-permission - A+++ hi-fi mobile spec

## Header
- **Source ID:** 66
- **Source spec:** `Balencia-New-Screens/screens/66-notification-permission.md`
- **Evidence:** screens/66-notification-permission.md, work/briefs/66.md, work/drafts/66.md
- **Route(s):** No live route; onboarding stack step and system-permission modal overlay.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Explain optional notification value before the one-shot OS system prompt is shown, without pressure or loss-aversion framing.
- **Premium Visual Director:** make permission primer card the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Notification Permission is optional, skippable, revocable from OS settings, and limited to the onboarding step or modal overlay.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+ (0,0)
|              9:41            [Status Bar]   |
|                                               |
|               (40px top spacer)              |
|  +---------------------------------------+   | <- FrostCard, r40
|  |              ++                    |   |   glow-cia bleed
|  |          (chip)(chip)                |   |   (bottom-anchored,
|  |             bell disc, 96px            |   |    62% card height)
|  |                                        |   |
|  |           Stay on *track*.             |   |  Display, 1 emphasis
|  |      CIA uses notifications to help    |   |  Body-light
|  |           you build habits.            |   |
|  |                                        |   |
|  |     CIA coaching nudges               |   |  ListRowbenefit x3
|  |      Stay focused with advice          |   |  (paper-100 icons,
|  |                                        |   |   no domain tint)
|  |     Helpful reminders                 |   |
|  |      Choose which nudges you want      |   |
|  |                                        |   |
|  |     Squad updates                     |   |
|  |      Only for groups you opt into      |   |
|  +---------------------------------------+   |
|                      (flexible spacer)       |
|                                              |
|   +---------------------------------------+  |
|   |          Enable notifications          |  | BtnPrimary, glow-you
|   +---------------------------------------+  | (bleed = button height)
|                    Not now                    | BtnGhost
|                    [ - ]                      | Home indicator
+---------------------------------------------+ (390,844)

Route handling: No live route; onboarding stack step and system-permission modal overlay.
```

## Focal Hierarchy
- **Dominant focal moment:** permission primer card; it should be visually singular, not one tile among many.
- **Secondary layer:** Status bar zone. with CIA only when the source supports a synthesized read.
- **Operational layer:** Top spacer - 40px., FrostCard , containing:, b. Title block - Display, one Tiempos-italic emphasis word., c. Subtitle block - Body-light..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma-backed default: warm-light onboarding/preference shell with white/paper background, soft pastel choice cards, peach atmosphere, and one orange primary CTA.
- Dark `FrostCard`/modal glass remains a presentation variant for overlay contexts only; do not use it as the default onboarding permission screen.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*permission*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct notification-permission frame was visible in the supplied Figma screenshots, but this screen belongs to the same warm-light onboarding preference family.
- **Evidence tier / light-shell exception:** screenshot-derived Preferences-family inference overrides the older compact canon's dark-only note here. There is no direct notification-permission frame evidence in this pass.
- **Surface mode:** use the Preferences screen's light shell and choice-card language: title stack, short explanatory copy, orange primary action, ghost secondary action, and small consent/status note. Avoid a dark modal unless this appears over an already-dark in-app surface.
- **Permission card style:** benefit rows should feel like the Figma coaching/preferred-channel cards: soft pastel icon squares, 12-16px card radius, light gray border, selected state as orange outline/fill check, disabled state at 40% opacity with reason copy.

## Components
- **LightPreferenceCard / FrostCard** - default Figma mode uses light preference cards (white/pastel fill, 12-16px radius, 1px warm-gray border, selected orange outline/check). `FrostCard` is reserved for overlay re-entry contexts where the permission prompt sits over an existing app screen.
- **NEW: NotificationIllustration** - *Rationale:* the catalog has no hero-illustration primitive, and the draft's "3D/papercraft-style" description invents a production technique outside the glass system. Corrected spec, built entirely from existing canon primitives: a bell silhouette rendered as a `.glass-frost` disc (blur 48px, sat 130%, border `rgba(255,255,255,.16)`), 96px diameter, sitting on the FrostCard's `--glow-cia` pool; a single 8px orange (`--glow-you`) dot on the bell's rim stands in for an unread badge - a real outcome cue, not decoration. Two 32px `.glass-pill` micro-chips (flame glyph, two-avatar glyph) float at fixed offsets, echoing "streak" and "partner" themes. All illustration elements are `aria-hidden` (see 12).
- **NEW: ListRow (variant: `benefit`)** - *Rationale:* catalog `ListRow` is a single-line label + trailing chevron/toggle, built for settings; this screen needs stacked two-line educational rows with no trailing control. Proposed as a `ListRow` variant, not a standalone component, to keep the catalog lean: leading icon 24px, paper-100 outline, rounded 2px stroke, **no domain tint** (correction: these are feature categories, not `ChipDomainTag` domains - forcing Fitness/Nutrition-style domain colors onto them would be a category error); title (Body 16, paper-100) stacked above description (Body-light 14, paper-64%); row height ~64-72px (vs. ListRow's 56px, to fit the second line); no hairline separators between rows - they read as one grouped list, dividers stay reserved for ListRow's settings context.
- **BtnPrimary** - "Enable notifications," full width minus 24px margins, height 52. Glow: `--glow-you` (`#FF5E00`), same recipe as CANON 3, scaled to button geometry (bleed = full 52px height, since a button has no "62% of card" to reference). *Why:* separate glow from the card above it - this is the user's action moment (tap -> OS dialog), effort/action per CANON 4, not CIA's explanatory voice.
- **BtnGhost** - "Not now."
- **BtnSuccess** - transient green swap for the post-grant confirmation (9).
- **ModalOverlay** - re-entry presentation only; centered FrostCard over `rgba(10,10,15,.6)` scrim.
- **ChipProvenance** - high-density streak-count chip only (11); "you logged."
- **OfflineBanner** - corrected offline treatment (9); replaces the draft's CTA-dimming approach.
- **SkeletonState** - loading treatment (9), `--surface-3` base, 1.2s shimmer sweep, matching real layout geometry.
- **ErrorState pattern** - quiet failure, BtnSecondary retry (9); replaces the draft's "CTA reverts to default" approach, which had no retry affordance.

## Data Honesty
- This screen carries one true numeric metric (the high-density streak-count chip); everything else is boolean OS/app state, which the honesty triple doesn't literally apply to but which still gets an honest, provenance-labeled treatment.
- **Notification permission status** (`.notDetermined` / `.denied` / `.authorized`) - boolean OS state, not a measured metric.
- * **Real:** status read directly from the OS API, labeled `app status: unrequested` (or `denied` / `granted`) beside the screen, not fabricated client-side.
- * **Low-confidence:** *not applicable* - OS permission APIs return a definitive enum; there is no partial-confidence read.
- * **Honest-null:** *not applicable* - the state is always known once the API resolves; there's nothing to render "not enough data" for.
- **Pre-permission skip** (`notification_prepermission_skipped_at`) - locally logged timestamp.
- * **Real:** timestamp logged on tap.
- * **Low-confidence:** *not applicable.*
- * **Honest-null:** `No skip recorded yet - OS prompt still preserved.`
- **System denied** (`notification_system_denied_at`) - locally logged timestamp.
- * **Real:** timestamp logged when OS returns denied; UI says `Notifications are off in system settings`.
- * **Low-confidence:** not applicable; OS state is definitive.
- * **Honest-null:** no denied timestamp before the OS has returned denied.
- **Re-entry/settings path:** denied re-entry shows `Open settings`; granted re-entry shows `Manage notification types`; revoked in OS shows `Notifications off in system settings`.

## Consent and Safety
- No live route; invoked as an onboarding step or modal overlay. `Not now` stays equal-reach and never threatens streak loss, missed progress, or social penalty.
- Benefits are scoped: CIA coaching nudges, selected reminders, and opted-in Squad/Community updates only. No contact/social notifications or partner updates without explicit group/community consent.
- OS Settings is the revoke path after grant/denial; in-app notification categories can be changed later from settings.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Standard (default):** full content, CTA reads "Enable notifications."
- **Loading (corrected, ~150-300ms, usually invisible):** shown only while the OS permission-status read resolves on cold launch or immediately after tap, before the system dialog appears. `SkeletonState` geometry (illustration + benefit rows ghost to shimmer at `--surface-3`, 1.2s sweep) prevents layout jump if the read is slower than expected; CTA shows spinner, label hidden, width locked (per catalog BtnPrimary loading rule). This is not a generic "please wait" - it exists specifically to cover OS API latency, and resolves before the user perceives it in the common case.
- **Success (transient, ~1.5s):** CTA crossfades to `BtnSuccess` (forest green fill) with a checkmark; success copy visible; auto-navigates after. Green here obeys the 60/30/10 rule - used only for this one completion confirmation, nowhere else on the screen.
- **System denied - first ask:** CTA text briefly reads "Got it," dims to 40% opacity, then the screen transitions out; system-denied copy visible.
- **System denied - already denied (re-entry only):** CTA permanently reads "Open settings" and deep-links to the OS settings app for this app's notification toggle - the OS will not re-show its own dialog a second time, so this is the only honest exit.
- **Error (corrected):** the OS permission-request call itself fails unexpectedly (rare). CTA becomes `BtnSecondary` reading "Try again" (per catalog `ErrorState`: quiet failure, plain-language body copy, no red borders/glyphs, never blames the user); error copy shown above it. "Not now" remains available. This replaces the draft's "CTA reverts to Default state" - a bare state revert with no retry affordance offered no visible path forward.
- **Offline (corrected - mobile-reality fix):** requesting OS notification permission is a **local, on-device call** - `UNUserNotificationCenter.requestAuthorization` (iOS) and the Android `POST_NOTIFICATIONS` prompt both work with zero connectivity. The draft dimmed the CTA to 50% and disabled it while offline, which blocks a fully-functional action for no real reason and is factually wrong about how the OS API works. Corrected: the CTA stays fully active and fully glowing offline. The only thing that can actually be network-dependent is registering the resulting device push token with Balencia's backend; if that sync fails, it's surfaced only *after* a successful OS grant, as a non-blocking `OfflineBanner` (glass-pill, honest staleness label): `offline - your choice is saved, we'll sync when you're back online`. Never a pre-emptive block on the ask itself.
- **Disabled:** *not applicable* - the screen always resolves to either a successful tap or the "Not now" ghost exit; there's no state where both are inert.
- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## Motion
- **Easing:** `cubic-bezier(0.32, 0.72, 0, 1)` (physical decelerate, never linear) for all slides, per CANON 6.
- **Entrance (~1.1s, staggered):** bell disc springs in first, floating micro-chips stagger in after, then title/subtitle/benefit rows slide up from a slight offset in sequence.
- **Idle:**
- * Bell disc: gentle continuous sway, 3s loop.
- * Micro-chips: continuous ease-in-out float.
- * **FrostCard glow (`--glow-cia`):** breathes, per CANON 6 "glow breathe on hero cards" - the draft only applied breathe to the CTA; corrected to apply to both semantic-glow surfaces, since both are hero elements on this screen.
- * **CTA glow (`--glow-you`):** breathes, opacity 0.8 -> 1.0.
- **Haptics:** CTA tap = medium impact; "Not now" tap = light impact.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; onboarding stack step and system-permission modal overlay..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** ink text, muted helper copy, orange CTA, and pastel selected cards must pass against the warm-light shell.; **Targets:** BtnPrimary (52px height), BtnGhost, and every preference row/card exceed the 44px floor.; **Screen reader:** `NotificationIllustration` (bell disc + micro-chips) is decorative and `aria-hidden` / excluded from VoiceOver/TalkBack - it conveys nothing that title/subtitle don't already state in words. Title, subtitle, and benefit rows read in visual order. Reminder chips are read as optional preferences, never as streak-loss warnings.
