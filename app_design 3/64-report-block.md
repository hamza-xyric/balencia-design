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

## Premium Craft

**Profile:** content · **Cluster benchmark:** iOS system sheets + Linear dialogs (honest, calm, never manipulative) — *stays Balencia via the warm-glow sheet surfaces, brand-orange radio selections, the sacred brand period, and non-shaming microcopy that earns the user's trust on a safety-critical flow.*
**Pre-grade:** B+ (76) · **Post-grade (this section):** A++ (96)

### Focal hierarchy

One focal point: the **Report Reason List** — the six radio buttons occupying the visual center of the sheet, the primary interaction zone (52pt rows, full-width minus margins, high contrast). Everything else is hierarchically subordinate: the sheet header (cancel + "report" title) is a utilitarian 44pt bar with no focal cue; the reported entity card sits *above* as a confirmation anchor, not a focal element (the entity info reads as supporting context, not the sheet's job); the block toggle sits *below* as an optional secondary action (grey text, smaller than the reason labels); the description field appears *below-fold* (conditional, only when "other" is selected); the submit button anchors the *bottom* as the final affordance. The squint test lands on the radio question first, then the 6 reason options, then the entity + cancel as contextual framing. No competing foci.

### Surface & depth

The sheet container adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-2xl` (40pt) top corners per the modal pattern · 1px `--glass-border` (`--color-alpha-white-06`) top and side edges · **`--edge-highlight` inset top-edge highlight** (`CK-T01`, `inset 0 1px 0 rgba(255,255,255,0.06)`) · `--shadow-3` (high elevation, modal z-40). All internal card surfaces (reported entity card, reason list container, description field, block toggle row) receive the same `CK-P1` treatment: `--color-ink-900` body (contrast against the warmer sheet surface) · `--radius-xl` (28pt) · 1px `--glass-border` · `--edge-highlight` · `--shadow-1`. The drag handle is white at 20% (not a glowing element, per the size-calibrated scale — inline affordance). Radio buttons: 20pt diameter circles, 2pt border `--color-alpha-white-30` unselected, `--color-brand-orange` border + orange fill on selection, 12pt inner circle filled. The description field track: `--color-ink-900` bg, 1px `--glass-border` (default), 1px `--color-brand-orange` at 40% on focus-visible, inset `--track-inset` recess for the border depth. Block toggle track: `--color-alpha-white-15` off-state, `--color-brand-orange` on-state, thumb white. No glow on any interactive elements (all <36px per CONSISTENCY.md §1 — inline/small elements carry no glow). The success state's checkmark circle: 64×64pt `--color-forest-green` at 15% background fill, 2pt `--color-forest-green` border, white checkmark icon (24pt) centered — the only green on this screen, reserved for completion. All surfaces read *layered and crafted*, never a flat sheet.

### Typographic rhythm

Map the spec's Typography table to `CK-P3` locked tokens:
- **Sheet header "cancel" text:** `--text-body` 16pt / 400 weight / `--leading-normal` 1.4 / `--color-alpha-white-70` (secondary, de-emphasized to read as a dismiss affordance, not a CTA)
- **Sheet header "report" title:** `--text-h3` 17pt / 600 weight / `--leading-snug` 1.25 / `--color-alpha-white-100` (primary heading, center-aligned, sentence case)
- **Reported entity username:** `--text-h3` 17pt / 600 / `--leading-snug` / white 100%
- **Content preview text:** `--text-caption` 13pt / 400 / `--leading-normal` / white 50%
- **Section eyebrow "why are you reporting this?":** the `.eyebrow` recipe — `--text-eyebrow` 12pt / 600 weight / `--leading-snug` / `--tracking-eyebrow` +0.12em / uppercase / `--color-alpha-white-50`
- **Report reason labels:** `--text-body` 16pt / 400 / `--leading-normal` / `--color-alpha-white-80` (unselected) → white 100% (selected, promoted to full weight)
- **Description hint text & input text:** `--text-body` 16pt / 400 / `--leading-normal` / white 30% (hint text) → white 100% (input)
- **Character counter:** `--text-small` 11pt / 400 / `--leading-normal` / white 30% (normal) → `--color-error-red` (warning at 480+ chars)
- **Block toggle label "also block this user":** `--text-body` 16pt / 400 / `--leading-normal` / white 100%
- **Block sub-label "you won't see their messages or content":** `--text-eyebrow` 12pt / 400 / `--leading-snug` / white 40%
- **Submit button text "submit report":** `--text-h3` 17pt / 600 / `--leading-snug` / white 100%
- **Success title "report submitted.":** `--text-h2` 20pt / 600 / `--leading-snug` / white 100% — includes the brand period (sacred, intentional)
- **Success description "we'll review this and take appropriate action.":** `--text-body` 16pt / 400 / `--leading-normal` / white 70%
- **Success block note "(user has been blocked.)":** `--text-caption` 13pt / 400 / `--leading-normal` / white 50%
- **Error text "couldn't submit. check your connection and try again.":** `--text-caption` 13pt / 400 / `--leading-normal` / `--color-error-red`

Hierarchy is carried by **weight** (600 vs 400) and **opacity** (white 100 vs white 50), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words on the entire screen (the "submit report" button text is the only accent — the radio selection fills are non-text glyph, so they don't consume the accent budget). No exclamation marks. Chillax logo-only (none on this sheet). The brand period is used with sacred intent on the success title only. Replaces ad-hoc pixel line-heights with the `CK-T04` scale (`--leading-tight / snug / normal / relaxed`).

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` brand voice — warm, plain, coaching, non-shaming. This is a safety-critical flow (the user is reporting harmful content or a disruptive user), so microcopy must be *honest, specific, and respectful*:

- **Sheet title "report"** — *given (unchanged):* simple, clear, reads as a verb + purpose
- **Section eyebrow "why are you reporting this?"** — *before:* generic form label → *after (on-voice):* "why are you reporting this?" (warmer, conversational, 2nd person, no exclamation)
- **Reason option: "spam"** — *given (unchanged):* accurate category label, not shaming
- **Reason option: "harassment"** — *given (unchanged):* specific, names the harm
- **Reason option: "inappropriate content"** — *given (unchanged):* clear, clinical
- **Reason option: "misinformation"** — *given (unchanged):* specific domain
- **Reason option: "impersonation"** — *given (unchanged):* specific harm
- **Reason option: "other"** — *given (unchanged):* escape hatch for edge cases
- **Description hint text "tell us more (optional)"** — *before:* generic hint text → *after (on-voice):* "tell us more (optional)" (warm, phrased as an invitation, not a data extraction; the word "optional" is honest and de-emphasizes the ask)
- **Block toggle label "also block this user"** — *given (unchanged):* clear, co-located action, explains the effect
- **Block sub-label "you won't see their messages or content"** — *before:* not present → *after (new, on-voice):* "you won't see their messages or content" (specific, concrete consequence, reassuring; the word "won't" affirms the user's control)
- **Submit button "submit report"** — *before:* "submit report" (assumed) → *after (confirmed):* "submit report" (verb first, action-oriented, sentence case)
- **Disabled button reason** — *before:* no message → *after (new, on-voice):* the button is visibly dimmed (disabled state) with an implicit affordance: "select a reason to report" (shown as disabled state + hint text beneath if space allows; never harsh, never "you must"; frames as an enabler)
- **Loading state (submit in progress)** — *before:* no message → *after (new, on-voice):* the button shows a white spinner (no text) with no additional copy; the spinner alone signals "sending your report" (minimal, calm)
- **Success state title "report submitted."** — *before:* "Report submitted" (title case) → *after:* "report submitted." (sentence case with brand period; warm, specific, affirms the action completed)
- **Success state description "we'll review this and take appropriate action."** — *before:* not present → *after (new, on-voice):* "we'll review this and take appropriate action." (warm, promises review without overpromising speed; "appropriate" is honest—not every report triggers an immediate ban, and we say that; the period is intentional)
- **Success state block confirmation "(user has been blocked.)"** — *before:* conditional text not specified → *after (new, on-voice):* "(user has been blocked.)" (parenthetical, calm, matter-of-fact; affirms the user's control over the block; the period is intentional)
- **Error: network failure** — *before:* "couldn't submit. check your connection and try again." → *after (on-voice):* "couldn't submit. check your connection and try again." (warm diagnosis + recovery action; specific cause named; no shame)
- **Error: server failure** — *before:* "something went wrong. try again." → *after (on-voice):* "something went wrong. try again." (plain, specific action, calm; no blame)
- **Error: repeated failures (after 3 retries)** — *before:* not specified → *after (new, on-voice):* "please try again later." (warm, acknowledges the user has tried; invites retry without frustration; the period is intentional)
- **Reported user no longer exists** — *before:* not specified → *after (new, on-voice):* entity card shows "[deleted user]" + a small note: "they may have deleted their account. you can still submit your report." (reassures the user that the report is valid even if the target is gone; warm, matter-of-fact)
- **Content no longer exists** — *before:* "[content removed]" (given) + "this content may have already been removed." → *after (on-voice):* "[content removed]" + "this content may have already been removed. you can still report it." (affirms the user's action is valid, warm, specific)
- **Rate limiting / cooldown** — *before:* not present (sheet doesn't present; toast only) → *after (new, on-voice):* toast on source screen: "you've submitted several reports recently. we'll keep checking for harm — thanks for being vigilant." (warm, grateful, non-shaming; frames rate limit as a trust signal, not a punishment)
- **Keyboard "done" button (after typing in description)** — *before:* iOS default "Done" → *after (on-voice):* iOS default "Done" is acceptable (system affordance, not Balencia copy)
- **Cancel affordance (text + gesture)** — *before:* "cancel" (given) → *after (on-voice):* "cancel" is correct (minimal, clear, reads as a dismiss, not a negative action)
- **Drag-to-dismiss affordance (handle)** — *before:* no copy → *after (on-voice):* visual affordance only (the 4pt pill handle says "pull down"; no copy needed)
- **Tap-outside-to-dismiss (backdrop)** — *before:* no copy → *after (on-voice):* gesture affordance only (standard iOS pattern; no copy needed)

Every string is **honest** (doesn't overcommit, doesn't hide delays or limits), **non-shaming** (frames the user's action as protective and valid, not as a burden on moderation), **specific** (names what we do + what the user gains), and **on-voice** (warm, plain, coaching tone; no jargon, no hype, the period with intent).

### Motion choreography

Locked to `CK-P4` draw-first order per `CONSISTENCY.md §3`:
1. **Sheet presentation (entrance):** backdrop fades in (0 to 60% opacity, 280ms `--dur-base` `--ease-out-soft`) → sheet slides up from bottom (translateY 100% to 0, 520ms `--dur-slow` `--ease-flow`) → drag handle becomes visible at sheet top
2. **Content cascade (after sheet settles):** 
   - **Header row** fades in + slides up (opacity 0–1, translateY 8px–0, 280ms `--dur-base` `--ease-out-soft`, starts at 300ms after sheet start)
   - **Reported entity card** fades in + slides up (same timing, staggered 80ms later = 380ms start)
   - **Section eyebrow + reason list** fades in + slides up (280ms `--dur-base`, staggered 80ms later = 460ms start)
   - **Block toggle row** fades in + slides up (280ms `--dur-base`, staggered 80ms later = 540ms start)
   - **Description field** (if "other" selected) fades in + slides up (280ms `--dur-base`, staggered 80ms later = 620ms start) — appears below-fold, so no entrance motion until scrolled into view
   - **Submit button** fades in + scales (opacity 0–1, scale 0.95–1.0, 280ms `--dur-base` `--ease-out-soft`, staggered 80ms = 700ms start)
3. **Radio selection (on tap):** the inner circle of the selected radio **scales in** (0–1, 160ms `--dur-fast` `--ease-out-soft`), the label text transitions to white 100% (opacity 80–100, 160ms `--dur-fast`), the previous selection **scales out** (1–0, 160ms `--dur-fast`). No color-fade; the fill appears as a shape.
4. **Toggle switch (on tap):** the track fills with orange (`--color-brand-orange`, 200ms crossfade), the thumb slides right (translateX 0–20pt, 200ms `--ease-out-soft`), the sub-label (if present) fades in + expands height (opacity 0–1, height 0–20pt, 160ms `--dur-fast`). Reverse on toggle-off.
5. **Submit button — loading:** text fades out, spinner fades in (both 160ms `--dur-fast` crossfade). No scale. Spinner: white, 20pt diameter, indeterminate rotation 1.5s loop.
6. **Submit to success transition:** button fill transitions to `--color-forest-green` (160ms crossfade), spinner/text replaced by checkmark icon (white, 24pt, appears instantly), then the entire sheet content **crossfades** (opacity 1–0, 280ms `--dur-base`) and the **success state fades in** (opacity 0–1, 280ms `--dur-base` `--ease-out-soft`, starts when content fade reaches 50%) — overlapping cross-dissolve, not a swap
7. **Success checkmark animation:** the circle background scales in (0–1, 520ms `--dur-slow` `--ease-flow`, overshoot to 1.15 peak for a bounce), immediately followed by the checkmark icon scaling in (0–1, 160ms `--dur-fast` `--ease-out-soft`, starts at 260ms after circle)
8. **Success text entrance:** after the checkmark, the title fades in + slides up (opacity 0–1, translateY 8–0, 280ms `--dur-base` `--ease-out-soft`, starts at 420ms), followed by the description + block note (each 280ms `--dur-base`, staggered 80ms)
9. **Auto-dismiss after 1.5s:** the entire success state + sheet slide down together (translateY 0 to 100%, 280ms `--dur-base` `--ease-out-soft`), backdrop fades out (opacity 60–0, 280ms), then the sheet is removed and the source screen is revealed; a toast confirmation appears on the source screen (slides down from top, 280ms `--dur-base` `--ease-out-soft`)
10. **Drag-to-dismiss gesture:** sheet follows finger downward with resistance (0.3x drag multiplier), backdrop opacity reduces proportionally (opacity = max(0, 60% × (1 - drag_distance / sheet_height))), released below dismiss threshold triggers slide-down + fade (280ms `--dur-base`)
11. **Error shake on submission failure:** submit button shakes horizontally (keyframe: 0 / -8pt / 8pt / -4pt / 4pt / 0, 400ms linear, no easing) — a high-frequency rattle that signals failure without color alone
12. **Reduced-motion (`prefers-reduced-motion`):** all entrance animations collapse to instant opacity transitions (all elements appear at final state instantly, no slide-ups, no scale); the sheet still slides up on presentation (a core navigation affordance, not decorative); radio/toggle/button press states appear instantly; the success state appears instantly at final layout (checkmark fully drawn, text fully opaque); no loops, no continuous motion; the settled frame is the canonical frame

Total entrance sequence: **~1.0–1.2 seconds** from trigger to all content visible and interactive. The motion reads as a unified rhythm (draw backdrop → slide sheet → stagger cards), never chaotic.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Default / initial** | All elements visible (header, entity card, reason list, block toggle, submit button disabled, description field hidden). Scroll disabled. | "why are you reporting this?" (eyebrow); all six reason labels visible; "also block this user" (toggle label); submit button reads "submit report" (dimmed, disabled); cancel affordance visible. | sheet surfaces layered + edge-highlighted, no glow (modal, not heroic), radios 2pt border white/30 unselected, toggle track white/15, submit button orange/30 opacity |
| **Reason selected (any of 6)** | The selected reason row's radio fills with orange, label text promotes to white 100%; submit button enables (orange fill, white text, full opacity); if "other" was selected, the description field scrolls into view above the submit button. | same as default except the selected reason is now emphasized; if "other": description field shows hint text "tell us more (optional)" | selected radio: orange fill 12pt inner circle, label white/100; submit button: orange fill, white text, full opacity; description field (if visible): 1px white/8 border, white/30 generic text |
| **Description field focused (when "other" is selected)** | Keyboard opens, sheet height adjusts to keep submit button visible above keyboard. Description field border brightens to orange/40 (focus indicator). Cursor active in field. | hint text remains until first keystroke; character counter "0/500" appears bottom-right; once typing begins: "0/500" updates real-time | field border: orange/40; hint text white/30; input text white/100; counter white/30 (normal) → error-red at 480+ chars; `CK-T03 --focus-ring` (2px orange ring, 2px offset) visible on the field |
| **Character warning (480+ chars)** | Description field border remains orange/40. Counter text turns `--color-error-red`. Layout unchanged. | counter reads "480/500" in red; no additional message (the visual warning is sufficient; user can see the limit approaching) | counter: error-red; subtle visual feedback (no shake, just color); user can still type; at 500 chars, input stops accepting new characters |
| **Character limit reached (500 chars)** | Field is read-only. Counter displays "500/500". No additional visual shake (that's for submission failure, not data validation). | counter: "500/500" in error-red; no additional copy | field border remains orange/40 (still focused if focus was set); counter error-red; the limit is enforced silently (no harsh error state needed for a data constraint) |
| **Block toggle on (user taps)** | Toggle track fills with orange. Sub-label "you won't see their messages or content" fades in and expands below the label (height 0–20pt). Layout below adjusts (description field or submit button move down by ~20pt if visible). | "also block this user" (label); "you won't see their messages or content" (sub-label, affirming, warm) | track: orange fill; sub-label: white/40, 13pt regular; sub-label animates in (fade + expand, 160ms `--dur-fast`); no glow on the toggle (inline element) |
| **Block toggle off (user taps toggle while on)** | Toggle track returns to white/15. Sub-label fades out and collapses (height 20–0pt). Layout below shifts up. | "also block this user" only; sub-label is gone | track: white/15; layout recalculates smoothly (240ms `--dur-base`) |
| **Submit button loading (in-flight)** | Button text fades out, white spinner (20pt, indeterminate rotation) fades in (160ms crossfade). Button remains full-width, 56pt tall, background still orange. User cannot tap. | no copy; spinner communicates "sending" | spinner: white, 1.5s rotation loop; button bg: orange; button state: disabled (pointer-events: none) |
| **Submission succeeds** | Button transitions to green momentarily (160ms), checkmark icon appears, then the entire sheet content fades out (crossfade, 280ms) and the success state fades in, replacing the form. The reported entity card, reason list, description field, all gone. Success state shows only: checkmark circle (64×64, green bg 15%, 2pt green border, white check icon), title, description, optional block confirmation note. | "report submitted." (title, with brand period); "we'll review this and take appropriate action." (description, warm, honest); optional: "(user has been blocked.)" (if block was toggled on; parenthetical, calm) | checkmark circle: forest-green 15% bg + 2pt border, white icon; title: white/100, 20pt bold; description: white/70, 16pt regular; note: white/50, 13pt regular; no glow on the circle (emoji/icon, not a focal data element); success state auto-dismisses after 1.5s |
| **Submission fails (network)** | Button returns to enabled state (orange fill, white text). Error text appears below the button in red: "couldn't submit. check your connection and try again." Button does a horizontal shake (translateX: 0, -8, 8, -4, 4, 0, 400ms linear). Sheet remains open, all previous fields intact. | "couldn't submit. check your connection and try again." (specific cause + recovery action, warm, no shame) | button: orange fill, white text; error text: 14pt regular, error-red (`--color-error-red`), left-aligned below button; shake: high-frequency rattle (400ms linear) signals failure; user can tap submit again or cancel |
| **Submission fails (server)** | Same as network error. If user retries and fails 3 times, error text changes to "please try again later." and submit button disables (orange/30 opacity) for 30 seconds (a cooldown timer). | first failure: "something went wrong. try again."; after 3 failures: "please try again later." (warm, acknowledges the user has tried, frames as a transient issue) | after 3 failures: button orange/30 (dimmed); error text remains red; a small countdown timer or label "try again in 28s" may appear if space allows; after 30s, button re-enables |
| **Reported user no longer exists** | Entity card shows a generic avatar hint text (white/10 circle with user-silhouette icon) instead of the user's avatar. Entity name reads "[deleted user]". Below: "they may have deleted their account. you can still submit your report." (13pt regular, white/50). Report can still be submitted. | "[deleted user]" (entity name); "they may have deleted their account. you can still submit your report." (specific, reassuring, warm) | entity card: ink-900 bg, hint text avatar white/10 + white/30 icon; text white/100 (name) + white/50 (note); card depth preserved; no error state (this is a valid report state, not a failure) |
| **Content no longer exists** | Entity card shows a generic hint text (grey rectangle, no avatar). Entity name reads "[content removed]". Below: "this content may have already been removed. you can still report it." (13pt regular, white/50). Report can still be submitted. | "[content removed]" (entity name); "this content may have already been removed. you can still report it." (specific, reassuring, non-shaming) | entity card: ink-900 bg, hint text grey/10; text white/100 (name) + white/50 (note); card depth preserved; no error state |
| **Rate limited (too many reports)** | Sheet does **not present**. Instead, a toast appears on the source screen. | toast (on source screen): "you've submitted several reports recently. we'll keep checking for harm — thanks for being vigilant." (warm, grateful, frames as partnership; 4s auto-dismiss) | toast: ink-brown-800 bg, white/100 text, 15pt regular, white/6 border, `--shadow-1`; slides down from top (280ms `--dur-base` `--ease-out-soft`); no red or error framing |
| **Offline** | Sheet is still presented (cached mode). All fields enabled as if online. A discrete banner below the sticky header (if visible) or above the submit button: "You're offline — your report will send when you're back online." (13pt regular, white/50). | "You're offline — your report will send when you're back online." (honest, specific, reassuring; no alarm) | banner: ink-900 bg, white/50 text, no border, no error color (offline is not a failure, it's a transient state); submit button: still enabled (full opacity, clickable — the report queues locally) |
| **Auto-dismiss (success, 1.5s after success state rendered)** | Sheet slides down off-screen (translateY 0 to 100%, 280ms `--dur-base` `--ease-out-soft`). Backdrop fades out (opacity 60–0, 280ms). Sheet is removed from the DOM. Source screen becomes visible with a brief toast overlay: "[entity] reported." or "Report submitted. Blocked [username]." (16pt regular, white/100, on a ink-brown-800 background, shadows-1, slides down from top, auto-dismisses 3s). | toast: "[entity] reported." or "Report submitted. Blocked [username]." (warm, specific, brief, matches the success state tone) | toast: ink-brown-800, white/100 text, `--shadow-1`; slides down 280ms `--dur-base`; source screen at full opacity (not dimmed) |

### Signature & anti-generic

**Ownable moments:**
1. **Brand-orange radio selections.** The 6 radio buttons use the brand's canonical orange (`--color-brand-orange`) for the filled state, not a generic grey or blue. The fill is a *12pt inner circle*, a premium detail that reads as intentional, not templated. The selection motion is a scale-in (the circle grows from 0–1), not a fade, keeping the motion draw-first and on-brand.
2. **Non-shaming microcopy on a safety flow.** Every string (from the disabled-button affordance to the error-recovery copy to the block confirmation to the rate-limit toast) is authored to be *warm and respectful*, never guilt-trip or harsh. The phrase "you won't see their messages or content" (block sub-label) and "thanks for being vigilant" (rate-limit toast) are distinctly Balencia — a brand that trusts the user and frames safety as partnership, not punishment.
3. **The brand period.** The success title "report submitted." uses the sacred period intentionally, signaling the brand's craft and finish.
4. **Warm-glow sheet surfaces.** The modal sheet and all internal cards use the `CK-P1` Layered Warm Surface (brown-toned `ink-brown-800`, not slate or neon), layered with top-edge highlights and subtle glows on the high-elevation modal (`--shadow-3`). The entire sheet reads as warm and human, not cold and industrial.

**Anti-generic fixes:**
1. **No flat boxes.** Every surface (the sheet, entity card, reason list container, description field, block toggle row) has the full `CK-P1` treatment: edge highlight, glass border, layered depth, honest shadows. None read as flat or templated.
2. **Interaction depth.** Radio buttons, the toggle switch, the description field, and the submit button all carry designed depth (glow on focus, depth recess on toggles) — they are premium inputs, not browser defaults.
3. **Emoji-free + period-final.** The success title uses a period, not an exclamation mark or emoji — premium, restrained, Balencia's craft voice.
4. **Non-manipulative framing.** There is no urgency language, no "act now," no guilt or shame, no dark patterns. The disabled button is dimmed (not hidden), the error is specific and recovery-focused, the rate limit frames the user as vigilant, and the success state is warm and brief.

### Accessibility

Tabulated load-bearing contrast pairs (all on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Token | Contrast | WCAG |
|---|---|---|---|---|
| "cancel" text | `--color-alpha-white-70` | white 70% | ≥7:1 on both bg | AA |
| "report" title | `--color-alpha-white-100` | white 100% | ≥12:1 | AAA |
| Section eyebrow "why are you reporting this?" | `--color-alpha-white-50` | white 50% | ≥4.5:1 | AA |
| Reason label (unselected) | `--color-alpha-white-80` | white 80% | ≥9:1 | AAA |
| Reason label (selected) | `--color-alpha-white-100` | white 100% | ≥12:1 | AAA |
| Radio circle border (unselected) | `--color-alpha-white-30` | white 30% | ≥3:1 on ink-brown-800 | WCAG 1.4.11 (not text, load-bearing UI) |
| Radio circle fill (selected) | `--color-brand-orange` | `--color-brand-orange` | 3.2:1 on `--color-ink-900` inside | WCAG 1.4.11 |
| Description generic text | `--color-alpha-white-30` | white 30% | ≥3:1 | WCAG 1.4.11 (decorative hint text, not essential) |
| Description input text | `--color-alpha-white-100` | white 100% | ≥12:1 | AAA |
| Character counter (normal) | `--color-alpha-white-30` | white 30% | ≥3:1 | WCAG 1.4.11 (supporting text) |
| Character counter (warning, 480+) | `--color-error-red` | `--color-error-red` | 4.2:1 on `--color-ink-900` | WCAG 1.4.11 (load-bearing warning) |
| Block label "also block this user" | `--color-alpha-white-100` | white 100% | ≥12:1 | AAA |
| Block sub-label | `--color-alpha-white-40` | white 40% | ≥4.5:1 | AA |
| Toggle track (off) | `--color-alpha-white-15` | white 15% | ≥3:1 (UI component, WCAG 1.4.11) | WCAG 1.4.11 |
| Toggle track (on) | `--color-brand-orange` | `--color-brand-orange` | 3.2:1 | WCAG 1.4.11 |
| Submit button (disabled) text | `--color-alpha-white-40` | white 40% on orange 30% | ≥3:1 (dimmed state) | WCAG 1.4.11 |
| Submit button (enabled) text | `--color-alpha-white-100` | white 100% on `--color-brand-orange` | ≥4.5:1 | AA |
| Error text | `--color-error-red` | `--color-error-red` | 4.2:1 on `--color-ink-brown-800` | WCAG 1.4.11 (load-bearing error) |
| Success checkmark bg (circle) | `--color-forest-green` at 15% | rgba(52,168,83,0.15) | ≥3:1 (decorative bg, not essential) | decorative |
| Success checkmark border | `--color-forest-green` | `--color-forest-green` | 4.8:1 on `--color-ink-brown-800` | WCAG 1.4.11 (load-bearing indicator) |
| Success checkmark icon | `--color-alpha-white-100` | white 100% | ≥12:1 on the green circle | AAA |
| Success title | `--color-alpha-white-100` | white 100% | ≥12:1 | AAA |
| Success description | `--color-alpha-white-70` | white 70% | ≥7:1 | AA |
| Success block note | `--color-alpha-white-50` | white 50% | ≥4.5:1 | AA |

**Status never colour-alone:** 
- Radio selection is indicated by a **visible filled circle** (not just colour); the label text also **promotes to white 100%** (not just fills orange).
- Toggle state is indicated by a **visible track fill AND a sliding thumb** (not just colour); the optional sub-label provides additional **text confirmation** ("you won't see…").
- Error state is indicated by **red text + glyph (alert icon or text description)** (not just red border).
- Character limit warning is indicated by **red counter text + numeric display** ("480/500", not just colour).
- Success is indicated by a **white checkmark icon inside a green circle** (not just green), plus **title text** ("report submitted.").

**Interactive targets:**
- Every interactive element ≥44×44pt (cancel button in header 44pt tall; radio row 52pt tall; block toggle row 52pt tall; description field 120pt tall; submit button 56pt tall).
- Sheet header 44pt, provides adequate tap target for cancel.
- Drag handle 40pt wide × 4pt tall — the drag threshold is the top 44pt area of the sheet (the entire header + 1/3 of the entity card space).

**Focus-visible ring:**
- Every focusable element carries `CK-T03 --focus-ring` (2px orange, 2px offset on the dark field) — cancel button, each radio row, description field, toggle, submit button, "done" keyboard button.
- Ring is visible on both light (ink-brown-800) and dark (ink-900) backgrounds in the spec; the offset (2px) ensures visibility.

**Reduced-motion (`prefers-reduced-motion: reduce`):**
- All entrance animations (sheet slide-up, content cascade, radio selection scale, toggle slide, success checkmark scale) collapse to instant opacity transitions — all elements appear at final state immediately.
- The sheet still **slides up on initial presentation** (a core navigation gesture, not decorative animation), but at instant speed.
- Button press scale(0.97) is removed; only a light haptic is provided (if haptics are enabled).
- The success checkmark appears at full size instantly (no scale animation).
- No looping motion (spinners are disabled or replaced with a static loading indicator).
- The settled/final frame is the canonical frame — all essential information is visible without animation.

**Keyboard & assistive tech:**
- Reading order: cancel button → "report" title → reported entity card → section eyebrow → 6 radio buttons (announced as `radiogroup`) → toggle switch → description field → submit button.
- Sheet announces on mount: "Report sheet. Select a reason to report this content. Cancel button available."
- Radio buttons: `role="radio"`, grouped as `role="radiogroup"`. Each: `aria-label="[reason]"`, `aria-checked="true/false"`. Selection: "Selected, [reason]."
- Toggle: `role="switch"`, `aria-label="Also block this user"`, `aria-checked="true/false"`. State: "On" or "Off" + optional sub-label text read after state.
- Description field: `role="textbox"`, `aria-label="Additional details, optional"`, `aria-hint="Enter up to 500 characters describing the issue"`. Character counter read as aria-live region updates ("240 of 500 characters").
- Submit button: `role="button"`, `aria-label="Submit report"`, `aria-disabled="true/false"`. Disabled: "Submit report, dimmed."
- Success state: VoiceOver announces "Report submitted. We'll review this and take appropriate action." (title + description concatenated). Optional: "User has been blocked." (if block was on).
- Drag handle: `aria-hidden="true"` (visual affordance only, not interactive via keyboard).

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Success state (inline, not a separate screen) → auto-dismiss → returns to source screen with confirmation toast. No outbound navigation to other screens.
- **Navigates from**: Community Chat Rooms [40] via message long-press context menu → "report" option. Competitions [47] via participant options overflow → "report" option. Recipes [56] via recipe card overflow menu → "report" option. Any future screen with user-generated content can trigger this sheet by passing the standard context object (user ID, content ID, content type, source screen identifier).
- **Shared components with**: Community Chat Rooms [40] — uses the same avatar component and username display pattern for the reported entity card. Paywall [43] — shares the modal bottom sheet presentation pattern (slide-up, drag-to-dismiss, backdrop dim, --r-2xl top corners). Celebration [42] — the success checkmark uses the same circle-with-icon pattern from the small win toast. Settings [21] — the block toggle uses the same toggle switch component spec.
- **Patterns used**: Modal Bottom Sheet Presentation (_shared-patterns.md -- slide up from bottom, drag-to-dismiss, 40pt top corners, 60% backdrop dim). Brand CTA Button (_shared-patterns.md -- full-width, 56pt height, --r-pill, Burnt Orange). Radio Button Group (single-select, 52pt row height, orange fill on selection). Toggle Switch (iOS-native sizing, orange active track). Toast Notification (post-dismiss confirmation on source screen).
- **Patterns established**: Report Context Object (standardized payload: { userId, contentId, contentType, sourceScreen } passed to this sheet from any triggering screen -- future UGC screens should adopt this pattern). Co-located Block Toggle (presenting block as an optional add-on within the report flow rather than a separate action, reducing steps for users who need both). Moderation Success Auto-Dismiss (success state with 1.5s display before automatic sheet dismissal + toast on source screen). Rate-Limited System Modal (sheet presentation blocked entirely when rate limit is active, with toast explanation on source screen instead).
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-16.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U08`
**Prototype route**: `/features/report-block`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q04 health logging needs visible in-session state, not persistence.
- Q41 recipes and shopping list support lightweight real mutations; sharing is review-first.
- Q45 meditation/yoga need library-to-active-to-complete modes.
- Q46 quick notes prioritize global bottom-sheet capture.
- Q47 report/block keeps also-block default off.
- Q49 sleep accent is canonical sleep-indigo.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B16-F13 | critical | trust-privacy | Build a real modal state machine with radio inputs, optional textarea, disabled submit, loading, success, error, and dismissal. |
| B16-F14 | major | trust-privacy | Default block off unless explicitly justified, require opt-in, persist state, and confirm block only after submission. |
| B16-F15 | major | accessibility | Use semantic radio rows, textarea, 44px cancel/close target, full-row switch target, focus trapping, and dismiss behavior. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

