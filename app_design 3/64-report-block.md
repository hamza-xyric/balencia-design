# Screen Design: Report / Block

**Screen**: 64 of 73
**File**: 64-report-block.md
**Register**: System Mode
**Primary action**: submit a report
**Tab**: None (modal overlay on any screen)
**Navigation**: Modal bottom sheet (z-40) presented from Community Chat [40] via message long-press → "report", Competitions [47] via participant options → "report", Recipes [56] via recipe overflow menu → "report". Dismissed by drag-down, tap outside, or "cancel" button. Success dismisses automatically with toast.

---

## Purpose

This screen protects the community by giving users a fast, low-friction way to report harmful content or block disruptive users. It surfaces at the exact moment a user encounters something wrong — in a chat room, a competition, or a shared recipe — so the emotional signal is fresh and the context is automatically captured. The design balances thoroughness (collecting enough information for moderators to act) with respect for the reporter's time (a single-tap reason is sufficient; the text field is optional). The block toggle is co-located with the report flow because users who report almost always want to stop seeing the offending content immediately, and presenting both actions together reduces the number of steps to feel safe again.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Sheet header — grab bar, title, cancel button — establishes context
2. Reported entity summary — avatar/thumbnail + name of the user or content being reported
3. Report reason list — six radio button options, one required selection
4. Block toggle — optional, defaults to off, lets user also block the reported user
5. Description field — optional textarea, appears when "other" is selected but always available
6. Submit button — Brand CTA, disabled until a reason is selected
7. Success state — confirmation checkmark + toast, auto-dismiss

**User flow**:
- **Arrives from**: Community Chat [40] via message long-press context menu → "report", Competitions [47] via participant overflow menu → "report", Recipes [56] via recipe card overflow menu → "report". Context object (user ID, content ID, content type, source screen) is passed to this sheet on presentation.
- **Primary exit**: Submit report → success state → auto-dismiss (1.5s) → return to source screen with toast confirmation
- **Secondary exits**: Cancel button → dismiss sheet → return to source screen (no action), drag-down → same as cancel, tap outside backdrop → same as cancel
- **Error exit**: Submission fails → inline error below submit button → user retries or cancels

---

## Layout

**Scroll behavior**: ScrollView within sheet (content may exceed visible area on smaller devices when description field is expanded)
**Tab bar visible**: No (modal covers tab bar via backdrop)

### ASCII Wireframe — Default State

```
┌─────────────────────────────────────┐
│                                     │
│  (underlying screen,                │
│   dimmed at 60% opacity)            │
│                                     │
│                                     │
│                                     │
├─────────────────────────────────────┤
│            ─── ───                  │  ← Drag handle: 4pt
│                                     │
│  cancel        report               │  ← Header: cancel + title
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [avatar]  username123      │   │  ← Reported entity
│  │            message preview  │   │     summary card
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  why are you reporting this?        │  ← Section eyebrow
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ○  spam                    │   │  ← Radio option 1
│  ├─────────────────────────────┤   │
│  │  ○  harassment              │   │  ← Radio option 2
│  ├─────────────────────────────┤   │
│  │  ○  inappropriate content   │   │  ← Radio option 3
│  ├─────────────────────────────┤   │
│  │  ○  misinformation          │   │  ← Radio option 4
│  ├─────────────────────────────┤   │
│  │  ○  impersonation           │   │  ← Radio option 5
│  ├─────────────────────────────┤   │
│  │  ○  other                   │   │  ← Radio option 6
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  also block this user   [○]│   │  ← Block toggle row
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  submit report              │   │  ← Brand CTA (disabled
│  └─────────────────────────────┘   │     until reason selected)
│                                     │
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### ASCII Wireframe — "Other" Selected (Description Field Visible)

```
┌─────────────────────────────────────┐
│                                     │
│  (underlying screen,                │
│   dimmed at 60% opacity)            │
│                                     │
├─────────────────────────────────────┤
│            ─── ───                  │  ← Drag handle
│                                     │
│  cancel        report               │  ← Header
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [avatar]  username123      │   │
│  │            message preview  │   │
│  └─────────────────────────────┘   │
│                                     │
│  why are you reporting this?        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ○  spam                    │   │
│  ├─────────────────────────────┤   │
│  │  ○  harassment              │   │
│  ├─────────────────────────────┤   │
│  │  ○  inappropriate content   │   │
│  ├─────────────────────────────┤   │
│  │  ○  misinformation          │   │
│  ├─────────────────────────────┤   │
│  │  ○  impersonation           │   │
│  ├─────────────────────────────┤   │
│  │  ●  other                   │   │  ← Selected (filled)
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  tell us more (optional)    │   │  ← Textarea field
│  │                              │   │     120pt height
│  │                              │   │     max 500 chars
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  also block this user   [●]│   │  ← Block toggle
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  submit report              │   │  ← Brand CTA (enabled)
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### ASCII Wireframe — Success State

```
┌─────────────────────────────────────┐
│                                     │
│  (underlying screen,                │
│   dimmed at 60% opacity)            │
│                                     │
│                                     │
├─────────────────────────────────────┤
│            ─── ───                  │
│                                     │
│                                     │
│         ┌───────┐                   │
│         │       │                   │
│         │   ✓   │                   │  ← Green checkmark
│         │       │                   │     64pt circle
│         └───────┘                   │
│                                     │
│       report submitted.             │  ← Confirmation title
│                                     │     20pt Sora Semibold
│   we'll review this and take        │
│   appropriate action.               │  ← Description
│                                     │     15pt Sora Regular
│   (user has been blocked.)          │  ← Conditional block
│                                     │     confirmation
│                                     │
│                                     │
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Semi-Transparent Backdrop** — full screen, z-39
   - Purpose: Dim underlying screen, tap to dismiss
   - Content: ink-900 at 60% opacity

2. **Sheet Container** — slides up from bottom, z-40
   - Purpose: Contains all report/block content
   - Content: ink-brown-800 background, top corners --r-2xl (40pt)

3. **Drag Handle** — top of sheet
   - Purpose: Visual affordance for pull-down dismiss
   - Content: 40pt wide x 4pt pill, white at 20%, centered

4. **Sheet Header** — below handle
   - Purpose: Title and cancel affordance
   - Content: "cancel" left-aligned + "report" center title

5. **Reported Entity Card** — below header
   - Purpose: Show who/what is being reported for confirmation
   - Content: Avatar + username + content preview

6. **Report Reason List** — below entity card
   - Purpose: Capture the reason for the report
   - Content: Six radio button options, single-select

7. **Description Field** — below reason list (conditional prominence)
   - Purpose: Optional free-text details
   - Content: Textarea, 500 character limit

8. **Block Toggle** — below description field
   - Purpose: Co-locate the block action with reporting
   - Content: Label + toggle switch

9. **Submit Button** — bottom of sheet
   - Purpose: Confirm and send the report
   - Content: Brand CTA, full-width

---

## Components

### Semi-Transparent Backdrop
- **Purpose**: Focus attention on the report sheet and prevent interaction with underlying content
- **Data source**: None
- **Visual treatment**: ink-900 (#0A0A0F) at 60% opacity. Covers entire screen including status bar and tab bar area. Tapping the backdrop dismisses the sheet (same as "cancel").
- **Variants**: None
- **Gestures**: Tap to dismiss sheet
- **Size**: Full screen

### Sheet Container
- **Purpose**: The bottom sheet housing all report/block content
- **Data source**: API — reported entity details (user ID, content ID, content type) passed from source screen
- **Visual treatment**: ink-brown-800 (#211008) background. Top-left and top-right corners: --r-2xl (40pt). Bottom corners: 0 (extends to screen bottom). 1pt border on top and sides: white at 8%. Internal padding: 16pt horizontal, 16pt top (above handle), 32pt bottom (below submit button). Safe area padding at bottom for home indicator. Maximum height: 85% of screen. Minimum height: auto-sized to content.
- **Variants**: Default (no description field visible, ~60% screen height), expanded ("other" selected or description field focused, ~80% screen height)
- **Gestures**: Drag handle down to dismiss (velocity-based). Internal content scrolls when needed.
- **Size**: Full-width, auto-height (60%-85% screen height depending on content)

### Drag Handle
- **Purpose**: Physical affordance indicating the sheet can be pulled down to dismiss
- **Data source**: None
- **Visual treatment**: Rounded pill shape, 40pt wide x 4pt height, white at 20%, centered horizontally, 8pt below top edge of sheet.
- **Variants**: None
- **Gestures**: Drag down to dismiss sheet
- **Size**: 40x4pt

### Sheet Header
- **Purpose**: Contextual title and dismiss affordance
- **Data source**: None (static labels)
- **Visual treatment**: 44pt height row. Left side: "cancel" text in 16pt Sora Regular, white at 70%, left-aligned with 16pt leading margin. Center: "report" text in 17pt Sora Semibold, white, center-aligned. Right side: empty (balanced by cancel text weight). 16pt gap below header. 1pt horizontal separator line at bottom in white at 8%.
- **Variants**: None
- **Gestures**: Tap "cancel" to dismiss sheet
- **Size**: Full-width x 44pt

### Reported Entity Card
- **Purpose**: Confirm to the user exactly who or what they are reporting, reducing accidental misreports
- **Data source**: API — user avatar URL, username, content preview text (truncated to 1 line), content type indicator
- **Visual treatment**: Full-width minus 32pt (16pt margins). ink-900 (#0A0A0F) background for contrast against sheet surface. --r-xl (28pt) corners. 16pt internal padding. Left: user avatar (40x40pt, circular, --r-pill). Right of avatar (12pt gap): username in 16pt Sora Semibold, white. Below username: content preview in 14pt Sora Regular, white at 50%, single-line truncation with ellipsis. If reporting content (not a user), shows a thumbnail instead of avatar. 16pt gap below card.
- **Variants by source**:
  - Chat message [40]: avatar + username + message text preview
  - Competition participant [47]: avatar + username + "in [competition name]"
  - Recipe [56]: recipe thumbnail (40x40pt, --r-lg) + recipe name + "by [username]"
- **Gestures**: None (informational only)
- **Size**: Full-width minus 32pt, 72pt height

### Report Reason List
- **Purpose**: Structured categorization of the report for moderator triage
- **Data source**: Static list of six reason options (hardcoded, not API-driven)
- **Visual treatment**: Section eyebrow: "why are you reporting this?" in 13pt Sora Semibold, white at 50%, uppercase, +0.12em letter-spacing, 16pt horizontal margins. 12pt gap below eyebrow. List container: full-width minus 32pt, ink-900 background, --r-xl (28pt) corners, 1pt border white at 8%. Each row: 52pt height (44pt minimum touch target + 8pt padding). Left: radio circle (20pt diameter, 2pt border, white at 30% unselected / Burnt Orange when selected with orange fill). 12pt gap. Right: reason label in 16pt Sora Regular, white. Rows separated by 1pt divider in white at 6%. Selected row: radio fills with Burnt Orange, label becomes white at 100% (from default 80%).
- **Reason options** (in order):
  1. "spam" — unwanted promotional or repetitive content
  2. "harassment" — targeted attacks, bullying, threats
  3. "inappropriate content" — nudity, violence, graphic material
  4. "misinformation" — false health or financial claims
  5. "impersonation" — pretending to be someone else
  6. "other" — anything not covered above
- **Variants**: Unselected (all radios empty), selected (one radio filled)
- **Gestures**: Tap row to select (deselects previous selection). Single-select only.
- **Size**: Full-width minus 32pt, ~312pt (6 rows x 52pt)

### Description Field
- **Purpose**: Optional free-text input for additional context, especially when "other" is selected
- **Data source**: User input
- **Visual treatment**: Full-width minus 32pt. ink-900 background. --r-xl (28pt) corners. 1pt border: white at 8% (default), Burnt Orange at 40% (focused), error-red at 60% (character limit exceeded — defensive edge case). 16pt internal padding. Placeholder text: "tell us more (optional)" in 15pt Sora Regular, white at 30%. Input text: 15pt Sora Regular, white. Character counter: bottom-right inside field, "0/500" in 12pt Sora Regular, white at 30% (turns error-red at 480+). Height: 120pt default, expands to 180pt max when focused with content. 16pt gap above and below.
- **Visibility logic**: Always accessible (scrolling reveals it), but the field receives automatic focus and keyboard opens when "other" reason is selected. For other reasons, the field remains visible but does not auto-focus.
- **Variants**: Empty (placeholder visible), has content (text + counter visible), focused (orange border), character warning (counter turns error-red near limit)
- **Gestures**: Tap to focus and open keyboard. Keyboard "done" dismisses keyboard but keeps content.
- **Size**: Full-width minus 32pt, 120-180pt height

### Block Toggle
- **Purpose**: Co-locate the block action with report so users can protect themselves in a single flow
- **Data source**: None (local state, sent with report on submit)
- **Visual treatment**: Full-width minus 32pt row. 52pt height. Left: "also block this user" in 16pt Sora Regular, white. Right: toggle switch (51x31pt, iOS native-sized). Toggle off state: track is white at 15%, thumb is white. Toggle on state: track fills with Burnt Orange, thumb remains white. The entire row is tappable (not just the toggle). 1pt border-bottom: white at 6%. Label secondary text below (when toggled on): "you won't see their messages or content" in 13pt Sora Regular, white at 40%. This secondary text animates in with 160ms fade.
- **Variants**: Off (default for report flow), on (user has opted to block). When the source is a repeat report against the same user, the toggle defaults to on with a note: "you've reported this user before."
- **Gestures**: Tap row or toggle to switch state
- **Size**: Full-width minus 32pt, 52pt (72pt when toggled on with sub-label)

### Submit Button (Brand CTA)
- **Purpose**: Confirm and send the report to moderation
- **Data source**: Local state — enabled when a report reason is selected
- **Visual treatment**: Brand CTA Button pattern. Full-width minus 32pt. 56pt height. --r-pill corners. Disabled state: Burnt Orange at 30% fill, white at 40% text. Enabled state: Burnt Orange fill, white text. Text: "submit report" in 17pt Sora Semibold, sentence case, center-aligned. 24pt gap above button from the block toggle.
- **Variants**: Disabled (no reason selected), enabled (reason selected), loading (white spinner replaces text), error (red border + error text below), success (green fill + checkmark)
- **Gestures**: Tap to submit report
- **Size**: Full-width minus 32pt x 56pt

### Success State
- **Purpose**: Confirm the report was received and provide closure
- **Data source**: API — success response
- **Visual treatment**: Replaces all sheet content with a centered success display. Green checkmark circle: 64x64pt, Forest Green (#34A853) fill at 15% background, 2pt Forest Green border, white checkmark icon (24pt) centered inside. 16pt gap below. Title: "report submitted." in 20pt Sora Semibold, white, center-aligned. Brand period. 8pt gap. Description: "we'll review this and take appropriate action." in 15pt Sora Regular, white at 70%, center-aligned, max 2 lines. Conditional line (if block toggle was on): "(user has been blocked.)" in 14pt Sora Regular, white at 50%, center-aligned, 8pt gap above. Entire success state auto-dismisses after 1.5 seconds.
- **Variants**: Report only (no block confirmation line), report + block (includes block confirmation line)
- **Gestures**: Tap anywhere to dismiss early (before auto-dismiss timer)
- **Size**: Sheet shrinks to ~250pt height for success state

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Backdrop | #0A0A0F at 60% | ink-900 | Dim underlying screen |
| Sheet background | #211008 | ink-brown-800 | Card surface |
| Sheet border | white at 8% | -- | Subtle edge definition |
| Drag handle | white at 20% | -- | Dismiss affordance |
| "cancel" text | white at 70% | -- | De-emphasized dismiss |
| "report" title | white | -- | Primary heading |
| Entity card background | #0A0A0F | ink-900 | Contrast against sheet |
| Username text | white | -- | Primary text |
| Content preview text | white at 50% | -- | Tertiary text |
| Section eyebrow | white at 50% | -- | Section label |
| Reason list background | #0A0A0F | ink-900 | Contrast against sheet |
| Reason list border | white at 8% | -- | Container edge |
| Radio unselected | white at 30% | -- | Inactive indicator |
| Radio selected | #FF5E00 | brand-orange | 60% role -- active selection |
| Reason label (unselected) | white at 80% | -- | Secondary text |
| Reason label (selected) | white | -- | Primary text (promoted) |
| Row dividers | white at 6% | -- | Subtle separation |
| Description field bg | #0A0A0F | ink-900 | Input surface |
| Description field border (default) | white at 8% | -- | Subtle container |
| Description field border (focus) | #FF5E00 at 40% | brand-orange | 60% role -- focus indicator |
| Description placeholder | white at 30% | -- | Ghost text |
| Description input text | white | -- | User input |
| Character counter | white at 30% | -- | Metadata |
| Character counter (warning) | #F44336 | error-red | Near limit warning |
| Toggle track (off) | white at 15% | -- | Inactive switch |
| Toggle track (on) | #FF5E00 | brand-orange | 60% role -- active state |
| Toggle thumb | white | -- | Switch control |
| Block label | white | -- | Primary text |
| Block sub-label | white at 40% | -- | Quaternary text |
| Submit button (disabled) | #FF5E00 at 30% | brand-orange | Dimmed CTA |
| Submit button (enabled) | #FF5E00 | brand-orange | 60% role -- primary action |
| Submit button text | white | -- | Button label |
| Success checkmark bg | #34A853 at 15% | forest-green | 30% role -- success state |
| Success checkmark border | #34A853 | forest-green | 30% role -- success indicator |
| Success checkmark icon | white | -- | Icon |
| Success title | white | -- | Confirmation heading |
| Success description | white at 70% | -- | Secondary text |
| Success block note | white at 50% | -- | Tertiary confirmation |
| Error text | #F44336 | error-red | Submission failure |

**60/30/10 verification**: Orange appears as the radio selection indicator, focused field border, toggle active track, and submit button -- all action-oriented elements, consistent with its 60% CTA role. Green appears only in the success state (checkmark circle) in its 30% completion role. Purple does not appear on this screen, which is correct -- this is a system utility modal with no AI/SIA involvement. Error red is used for defensive states (character limit, submission failure) per its designated role.

---

## Interaction States

### Radio Buttons (Report Reason)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 20pt circle, 2pt border white at 30%, empty center | -- |
| Pressed | Border brightens to white at 60%, row background white at 4% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt from radio circle | -- |
| Disabled | 0.4 opacity (entire row) | -- |
| Loading | -- | -- |
| Error | -- | -- |
| Selected | Burnt Orange 2pt border, Burnt Orange filled center (12pt inner circle), label promoted to white 100% | Selection impact |

### Block Toggle
| State | Visual | Haptic |
|-------|--------|--------|
| Default (off) | Track white at 15%, thumb left-aligned, white | -- |
| Pressed | Track brightens slightly (white at 20%), thumb scales 1.05 | Light impact |
| Focus-visible | 2pt orange ring around track, offset 2pt | -- |
| Disabled | 0.4 opacity | -- |
| Loading | -- | -- |
| Error | -- | -- |
| Toggled on | Track fills Burnt Orange, thumb slides right, sub-label fades in | Medium impact |
| Toggled off (from on) | Track returns to white at 15%, thumb slides left, sub-label fades out | Light impact |

### Description Field
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-900 bg, white at 8% border, placeholder text visible | -- |
| Focused | Border changes to Burnt Orange at 40%, placeholder remains until typing begins | Light impact |
| Has content | Input text white, character counter visible, placeholder hidden | -- |
| Character warning | Counter text turns error-red at 480+ characters | -- |
| Character limit reached | Counter turns error-red, no more input accepted, subtle shake | Error notification |
| Disabled | 0.4 opacity | -- |
| Loading | -- | -- |
| Error | -- | -- |

### Submit Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (disabled) | Burnt Orange at 30% fill, white at 40% text, non-tappable | -- |
| Default (enabled) | Burnt Orange fill, white text | -- |
| Pressed | Darker orange (orange-600), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity (only if API is unreachable) | -- |
| Loading | White spinner replaces text (report submitting) | -- |
| Error | Red border, "something went wrong. try again." text appears below | Error notification |
| Success | Green fill, white checkmark replaces text, then transitions to success state | Success notification |

### Cancel Text
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 70% | -- |
| Pressed | White at 40%, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | -- | -- |
| Loading | -- | -- |
| Error | -- | -- |
| Success | -- | -- |

### Drag Handle (Sheet Dismiss)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 20% | -- |
| Dragging | White at 40%, sheet follows finger with resistance | Light impact (at drag start) |
| Released (velocity dismiss) | Sheet slides down and fades | Medium impact |
| Released (spring back) | Sheet returns to position | Light impact |
| Focus-visible | -- | -- |
| Disabled | -- | -- |
| Loading | -- | -- |
| Error | -- | -- |

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Drag down | Drag handle or sheet top area | Dismiss sheet (velocity-based threshold) |
| Tap | Backdrop (dimmed area above sheet) | Dismiss sheet |
| Tap | "cancel" text | Dismiss sheet |
| Tap | Radio button row | Select report reason (deselects previous) |
| Tap | Block toggle row | Toggle block state on/off |
| Tap | Description field | Focus field, open keyboard |
| Tap | Submit button (enabled) | Submit report to API |
| Tap | Success state (any area) | Dismiss sheet early (before auto-dismiss) |
| Swipe down | Anywhere on sheet | Dismiss sheet (velocity-based) |
| Long press | -- | No long-press targets on this screen |

### Haptic Feedback Points
- Sheet slides up (presentation): medium impact
- Drag handle engaged: light impact
- Sheet dismiss (velocity): medium impact
- Sheet spring-back: light impact
- Radio button selected: selection impact
- Toggle switched: medium impact (on), light impact (off)
- Description field focused: light impact
- Submit button tap: light impact
- Report submitted (loading): -- (none during processing)
- Submission success: success notification (heavy)
- Submission error: error notification
- Cancel tap: light impact
- Backdrop tap (dismiss): light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Backdrop | Sheet triggered | Fade in (opacity 0 to 60%) | 280ms (--dur-base) | ease-out-soft |
| Sheet container | After backdrop starts | Slide up from bottom (translateY(100% to 0)) | 520ms (--dur-slow) | ease-flow |
| Drag handle | With sheet | Inherits sheet motion | 520ms | ease-flow |
| Header row | After sheet settles | Fade in + translateY(8 to 0) | 280ms (--dur-base) | ease-out-soft |
| Entity card | After header | Fade in + translateY(8 to 0) | 280ms (--dur-base) | ease-out-soft |
| Reason list | After entity card | Fade in + translateY(8 to 0) | 280ms (--dur-base) | ease-out-soft |
| Block toggle | After reason list | Fade in + translateY(8 to 0) | 280ms (--dur-base) | ease-out-soft |
| Submit button | After block toggle | Fade in + scale(0.95 to 1.0) | 280ms (--dur-base) | ease-out-soft |
| Radio selection | Tap reason row | Inner circle scale(0 to 1.0), previous deselects scale(1.0 to 0) | 160ms (--dur-fast) | ease-out-soft |
| Toggle switch | Tap toggle row | Thumb translateX(0 to 20pt) or reverse, track color crossfade | 200ms | ease-out-soft |
| Block sub-label | Toggle on | Fade in + height expand (0 to 20pt) | 160ms (--dur-fast) | ease-out-soft |
| Block sub-label | Toggle off | Fade out + height collapse (20pt to 0) | 160ms (--dur-fast) | ease-out-soft |
| Description field | "other" selected | Auto-focus with keyboard slide-up, sheet height adjusts | 280ms (--dur-base) | ease-out-soft |
| Sheet height | Keyboard open/close | Animate height change | 280ms (--dur-base) | ease-flow |
| Submit loading | Tap submit | Button text to spinner crossfade | 160ms (--dur-fast) | ease-out-soft |
| Submit to success | API returns success | Button turns green (160ms), then sheet content crossfades to success state | 280ms (--dur-base) | ease-flow |
| Success checkmark | Success state entered | Scale(0 to 1.0) with bounce overshoot (1.15 peak) | 520ms (--dur-slow) | ease-flow |
| Success text | After checkmark | Fade in + translateY(8 to 0) | 280ms (--dur-base) | ease-out-soft |
| Auto-dismiss | 1.5s after success | Sheet slides down + backdrop fades out | 280ms (--dur-base) | ease-out-soft |
| Sheet dismiss (drag) | User drag down | Sheet follows finger, backdrop opacity reduces proportionally | Continuous | -- |
| Sheet dismiss (release) | Velocity exceeds threshold | Sheet slides to bottom + backdrop fades | 280ms (--dur-base) | ease-out-soft |
| Sheet spring-back | Release below threshold | Sheet returns to position | 280ms (--dur-base) | ease-out-soft |
| Error shake | Submission fails | Submit button horizontal shake (translateX: 0, -8, 8, -4, 4, 0) | 400ms | linear |
| Toast (post-dismiss) | Sheet dismissed after success | Toast slides down from top of source screen | 280ms (--dur-base) | ease-out-soft |

**Total entrance sequence**: ~2.0 seconds from trigger to all elements visible. Sheet slides up as the primary motion, content cascades in as it settles.

**Screen transition**:
- **Enter**: Not a navigation -- modal slides up over current screen with backdrop dim
- **Exit (cancel)**: Sheet slides down, backdrop fades, underlying screen revealed
- **Exit (success)**: Content transitions to success state, auto-dismiss after 1.5s, toast appears on source screen
- **Exit (drag dismiss)**: Sheet follows finger down, backdrop fades proportionally

---

## Empty States

Not applicable. This screen is a modal action sheet that is only presented when the user explicitly triggers a report action on a specific piece of content or user. There is no scenario where the sheet would render without content to display -- the reported entity's information is always passed as context from the triggering screen. If the context data were somehow missing (defensive edge case), the sheet would not present at all; instead, a toast error would appear on the source screen: "couldn't load report. try again."

---

## Error Handling

| Error Scenario | Visual Treatment | Recovery Action |
|----------------|-----------------|-----------------|
| Report submission fails (network) | Submit button returns to enabled state. Red error text below button: "couldn't submit. check your connection and try again." in 14pt Sora Regular, error-red (#F44336). Button does a horizontal shake animation. | User taps submit again to retry. Cancel remains available. |
| Report submission fails (server) | Same as network error, but text: "something went wrong. try again." | User taps submit again. If fails 3 times, text changes to "please try again later." and button disables for 30 seconds. |
| Reported user no longer exists | Sheet presents but entity card shows: "[deleted user]" with a generic avatar placeholder (white at 10% circle, user silhouette icon). Report can still be submitted (content may still exist in moderation queue). | User can submit report or cancel. |
| Content no longer exists | Sheet presents with entity card showing: "[content removed]" with a generic placeholder. Description text below: "this content may have already been removed." in 13pt Sora Regular, white at 40%. | User can still submit (creates a record) or cancel. |
| Block fails after report succeeds | Success state shows report confirmation, but adds: "report submitted, but we couldn't block this user right now. you can block them from their profile." in 14pt Sora Regular, white at 50%. | User can manually block from the user's profile screen later. |
| Rate limiting (too many reports) | Sheet does not present. Toast on source screen: "you've submitted several reports recently. please wait before reporting again." in white on ink-brown-800, auto-dismiss 4s. | User waits (cooldown period, typically 15 minutes) before reporting again. |
| Duplicate report (same content) | Sheet presents normally but submit button text changes to "update report" since a previous report exists. On success: "report updated." instead of "report submitted." | User can update their reason or add details to existing report. |
| Keyboard obscures submit button | Sheet scrolls up to keep submit button visible above keyboard. Content above scrolls to accommodate. | Automatic -- no user action needed. |

---

## Motivation Adaptation

This screen is a system-level safety and moderation utility. Motivation tiers (low, medium, high) do not apply. The report/block flow must be identical regardless of the user's engagement level or motivational state -- a user experiencing harassment should have the same efficient, respectful reporting experience whether they are a highly active power user or a low-engagement user considering churning. Modifying the flow based on motivation would be ethically inappropriate and could compromise user safety.

The only behavioral adaptation is rate limiting (documented in Error Handling above), which is based on abuse detection, not motivation scoring.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| "cancel" text | Sora | 400 (Regular) | 16pt | 22pt | White at 70% |
| "report" sheet title | Sora | 600 (Semibold) | 17pt | 22pt | White |
| Reported entity username | Sora | 600 (Semibold) | 16pt | 22pt | White |
| Content preview text | Sora | 400 (Regular) | 14pt | 20pt | White at 50% |
| Section eyebrow | Sora | 600 (Semibold) | 13pt | 18pt | White at 50% |
| Reason label | Sora | 400 (Regular) | 16pt | 22pt | White at 80% (unselected) / White (selected) |
| Description placeholder | Sora | 400 (Regular) | 15pt | 22pt | White at 30% |
| Description input text | Sora | 400 (Regular) | 15pt | 22pt | White |
| Character counter | Sora | 400 (Regular) | 12pt | 16pt | White at 30% |
| Block toggle label | Sora | 400 (Regular) | 16pt | 22pt | White |
| Block sub-label | Sora | 400 (Regular) | 13pt | 18pt | White at 40% |
| Submit button text | Sora | 600 (Semibold) | 17pt | 22pt | White |
| Success title | Sora | 600 (Semibold) | 20pt | 26pt | White |
| Success description | Sora | 400 (Regular) | 15pt | 22pt | White at 70% |
| Success block note | Sora | 400 (Regular) | 14pt | 20pt | White at 50% |
| Error text | Sora | 400 (Regular) | 14pt | 20pt | #F44336 |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **VoiceOver / TalkBack reading order**: "cancel" button -> "report" title -> reported entity (avatar + username + content preview as one element) -> section eyebrow -> report reason options (1 through 6) -> block toggle row -> description field (if visible) -> submit button
- **VoiceOver announcement on sheet mount**: "Report sheet. Select a reason to report this content. Cancel button available."
- **Report reason radio buttons**: `accessibilityRole="radio"`, grouped as `accessibilityRole="radiogroup"`. Each option: `accessibilityLabel="[reason]"`, `accessibilityState={checked: true/false}`. Selection announced: "Selected, [reason]."
- **Block toggle**: `accessibilityRole="switch"`, `accessibilityLabel="Also block this user"`, `accessibilityState={checked: true/false}`. State change announced: "On, you won't see their messages or content" / "Off."
- **Description field**: `accessibilityRole="text"`, `accessibilityLabel="Additional details, optional"`, `accessibilityHint="Enter up to 500 characters describing the issue"`
- **Submit button**: `accessibilityRole="button"`, `accessibilityLabel="Submit report"`, `accessibilityState={disabled: true/false}`. Disabled state announced: "Submit report, dimmed."
- **Success state**: VoiceOver announces "Report submitted. We'll review this and take appropriate action." plus conditional "User has been blocked." if block was toggled on.
- **Dynamic type**: Sheet content text scales with system font size up to 1.3x. Beyond that, the sheet becomes scrollable to accommodate larger text. Minimum touch targets (44pt) are maintained regardless of text size.
- **High contrast mode**: Sheet border opacity increases from 8% to 15%. Radio button borders increase from 30% to 50% when unselected. Submit button disabled state opacity increases from 30% to 50%.
- **Reduced motion**: See Motion section — sheet entrance and all internal animations simplified to instant opacity transitions.

---

## Cross-References

- **Navigates to**: Success state (inline, not a separate screen) → auto-dismiss → returns to source screen with confirmation toast. No outbound navigation to other screens.
- **Navigates from**: Community Chat Rooms [40] via message long-press context menu → "report" option. Competitions [47] via participant options overflow → "report" option. Recipes [56] via recipe card overflow menu → "report" option. Any future screen with user-generated content can trigger this sheet by passing the standard context object (user ID, content ID, content type, source screen identifier).
- **Shared components with**: Community Chat Rooms [40] — uses the same avatar component and username display pattern for the reported entity card. Paywall [43] — shares the modal bottom sheet presentation pattern (slide-up, drag-to-dismiss, backdrop dim, --r-2xl top corners). Celebration [42] — the success checkmark uses the same circle-with-icon pattern from the small win toast. Settings [21] — the block toggle uses the same toggle switch component spec.
- **Patterns used**: Modal Bottom Sheet Presentation (_shared-patterns.md -- slide up from bottom, drag-to-dismiss, 40pt top corners, 60% backdrop dim). Brand CTA Button (_shared-patterns.md -- full-width, 56pt height, --r-pill, Burnt Orange). Radio Button Group (single-select, 52pt row height, orange fill on selection). Toggle Switch (iOS-native sizing, orange active track). Toast Notification (post-dismiss confirmation on source screen).
- **Patterns established**: Report Context Object (standardized payload: { userId, contentId, contentType, sourceScreen } passed to this sheet from any triggering screen -- future UGC screens should adopt this pattern). Co-located Block Toggle (presenting block as an optional add-on within the report flow rather than a separate action, reducing steps for users who need both). Moderation Success Auto-Dismiss (success state with 1.5s display before automatic sheet dismissal + toast on source screen). Rate-Limited System Modal (sheet presentation blocked entirely when rate limit is active, with toast explanation on source screen instead).
