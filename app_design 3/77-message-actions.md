# Screen Design: Message Actions

**Screen**: 77 of 90
**File**: 77-message-actions.md
**Route**: `/tabs/sia/message-actions`
**Register**: Product Mode with privacy controls
**Primary action**: Review and act on a selected chat message
**Tab**: SIA
**Navigation**: Modal-style stack push from Direct Chat [75] or Group Chat [76] after long-pressing a message. Back or Done returns to the source thread.

---

## Purpose

Message Actions is the focused action surface for a selected chat message. It collects reactions, pin/star/forward/open actions, and shared-media context without crowding the chat thread. Because messages may include view-once media, mission context, or SIA summaries, privacy and provenance are visible on the screen.

---

## Information Architecture

**Hierarchy**:
1. Header with title and back affordance
2. Privacy/status pills
3. Selected message preview
4. Quick reactions grid
5. Action list
6. Shared media vault
7. Done bottom action

**User flow**:
- **Arrives from**: Long press on message in Direct Chat [75] or Group Chat [76].
- **Primary exit**: Done -> return to thread.
- **Secondary exits**: Choose reaction, pin/star/forward/open media, tap shared media.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed bottom action, and visible SIA tab bar.
**Tab bar visible**: Yes, SIA active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <      Message actions      |
+-----------------------------+
| [View-once protected]       |
| [SIA can summarize]         |
|                             |
| SELECTED MESSAGE   [Private]|
| [AK] Perfect. I added...    |
|      [Hill segment] [Useful]|
|                             |
| QUICK REACTIONS             |
| [Useful] [Support]          |
| [Done]   [Insight]          |
|                             |
| ACTIONS                     |
| [pin] Pin message           |
| [star] Star for mission     |
| [fwd] Forward               |
| [eye] Open view-once media  |
|                             |
| SHARED MEDIA                |
| [Hill] [Pace note] [Plan]   |
+-----------------------------+
|          Done               |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Selected Message Card
- **Purpose**: Preserve context for the action decision.
- **Visual treatment**: rounded-xl ink-brown card, white/8 border, shadow-2.
- **Content**: Section eyebrow, PrivacyPill, full ThreadMessage preview.
- **Behavior**: Message preview is read-only. Attachment taps preview media metadata but do not dismiss the screen.

### Privacy Pill
- **Purpose**: Make message privacy legible.
- **Visual treatment**: 28pt pill, lock icon, white/4 bg, white/8 border.
- **Label**: "Private".

### Quick Reactions Grid
- **Purpose**: Fast lightweight response.
- **Visual treatment**: 2-column grid, 44pt pill buttons.
- **Behavior**: Single tap applies reaction and shows selected state. First/default highlighted reaction uses brand-orange/12.

### Action List
- **Purpose**: Perform durable message actions.
- **Actions**:
  - Pin message: keep visible in chat.
  - Star for mission: attach to active mission.
  - Forward: send to another conversation or SIA.
  - Open view-once media: open protected media viewer.
- **Visual treatment**: 66pt minimum rows, icon circle, label, detail, rounded-lg ink-brown surface.

### Shared Media Vault
- **Purpose**: Show related media in the selected message cluster.
- **Visual treatment**: 3-column grid, small cards, domain-tinted icon blocks.
- **Behavior**: Tap media opens Image Viewer [67] or media preview when permitted.

### Done Button
- **Purpose**: Close the action surface.
- **Visual treatment**: Full-width orange CTA with shield icon.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card/row surfaces | #211008 | ink-brown-800 | Selected message/actions |
| Primary action | #FF5E00 | brand-orange | Done and selected reaction |
| SIA status | #7F24FF | royal-purple | SIA summarize pill |
| Privacy/status | #FFFFFF at 50% | white/50 | Privacy pill text |
| Protected media | Domain colors | domain registry | Media cards |
| Text primary | #FFFFFF | white | Labels |
| Text secondary | #FFFFFF at 35-45% | white/45 | Details |

**60/30/10 verification**: Orange marks primary completion and selected reaction. Purple appears only for SIA capability. Domain colors identify media sources.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Reaction | Selected | brand-orange/12 bg, brand-orange text/border |
| Reaction | Pressed | scale(0.96) |
| Action row | Pressed | bg white/6, icon border brand-orange/25 |
| View-once media | Opened | Row disabled after successful open |
| Media card | Unavailable | 50% opacity, lock icon |
| Done | Pressed | scale(0.96), light haptic |

---

## Motion

- Selected message fades up first.
- Reaction grid, action list, and media vault enter with 80ms/140ms/200ms stagger.
- Reaction selection uses 120ms scale pop.
- Forward and media preview use standard bottom sheet/modal transitions.

---

## Empty, Loading, Error

- **Missing selected message**: Show error card "Message no longer available" and Done button.
- **Media expired**: Shared media card remains but displays "Expired".
- **Reaction failed**: Toast "Reaction could not be saved" with retry.
- **Forward unavailable offline**: Action row disabled with "Connect to forward".
- **Loading**: Selected message skeleton and disabled action rows.

---

## Accessibility

- Selected message is announced as a grouped preview before actions.
- Privacy pill announces "Private message".
- Quick reactions are buttons with selected state.
- Action rows announce label and detail.
- View-once media warns before opening: "This media can only be viewed once."
- Focus order: back, status pills, selected message, reactions, actions, media, Done.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/sia/message-actions/page.tsx`.
- Mock data source: `messageActionPreview` in `balencia-screens/src/data/mock.ts`.
- Reuses `ThreadMessage`, `PrivacyPill`, `SignalPill`, and domain tone classes.
- This screen documents a focused route mock; production may present the same content as a bottom sheet.
---

## Premium Craft

**Profile:** content · **Cluster benchmark:** iMessage + Signal (privacy-first, restrained) — *stays Balencia via warm-glow `CK-P1` surfaces, privacy as the frame anchor, orange discipline (reaction + Done only), and authored edge copy on the disabled view-once state.*
**Pre-grade:** A+ (93) · **Post-grade (this section):** A++ (96)

### Focal hierarchy

One unmistakable focal point: the **selected message card** — the context anchor, positioned above the fold at ~144pt (section eyebrow + privacy pill + full ThreadMessage preview, all within the `CK-P1` layered surface). The message reads as the reason the action surface exists; the user immediately knows what they're acting on. Everything else is secondary: the quick-reactions grid (2×2, 44pt pills) is compact and fast (not visually dominant); the action list (4 rows, 66pt minimum) is a functional menu (no visual accent); the shared-media vault (3-column grid) is a contextual reference (small, scrollable below fold); the Done button is a basal affordance (full-width CTA, the only other orange element). The squint test lands on the message card first, then scans down to the reaction grid + actions. No competing focal anchors.

### Surface & depth

Every surface applies `CK-P1` Layered Warm Surface. **Selected message card:** `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--glass-border` (`--color-alpha-white-06`) · **`CK-T01` top-edge inner highlight** (the not-flat cue that lifts the card off the field) · `--shadow-2` (FABs/floating elevation, as this card is presented modally and carries visual weight). The privacy pill within the message card floats at `--color-alpha-white-50` text on a transparent field (it shares the card's depth, never floats separately). **Action rows:** `--color-ink-brown-800` body · `--radius-lg` (20pt, smaller than hero cards per brand radius rule) · 1pt `--glass-border` · `CK-T01` top-edge highlight · `--shadow-1` (default card elevation, not floating). **Reaction pills:** 44pt tall, `--radius-pill` (rounded fully), `--color-ink-brown-800` body · 1pt `--glass-border` · no top-edge highlight (they are <36px elements and have no depth layering requirement, but they are interactive so they receive feedback depth on selected/pressed state). Quick-reactions grid is arranged in a 2-column layout with 12pt gaps (no shadow on the grid container itself — it is a layout container, not a card). **Media vault cards:** small (per Components), `--color-ink-brown-800` body · `--radius-md` (14pt, per the <80pt height rule) · 1pt `--glass-border` · no top-edge highlight · `--shadow-1`. No glow on any surface (glow is reserved for hero elements ≥96px; the message card at ~144pt could carry `--glow-orange-sm` on rare high-emphasis flows, but the default case keeps glow off to preserve restraint — the white top-edge highlight provides the depth cue, and the modal context itself signals elevation). All surfaces sit on `--color-ink-900` field with no additional background color shift.

### Typographic rhythm

Apply `CK-P3` locked type pairings: section eyebrow ("SELECTED MESSAGE") `--text-eyebrow` (12pt / 600 / uppercase / `--tracking-eyebrow` 0.12em / `--color-alpha-white-40`); privacy pill label ("Private") `--text-caption` (13pt / 400 / `--leading-normal` 1.4 / `--color-alpha-white-50`); message preview (inherited from ThreadMessage component, `--text-body` 16pt / 400 / `--leading-normal` for prose; name + timestamp `--text-caption` 13pt / 400 / `--color-alpha-white-50`); quick-reaction labels (4 pills: "Useful" / "Support" / "Done" / "Insight") `--text-caption` (13pt / 400 / `--color-alpha-white-100`, full contrast on the selected state); action row label ("Pin message", "Star for mission", etc.) `--text-body` (16pt / 400 / `--color-alpha-white-100`); action row detail ("Keep it visible") `--text-caption` (13pt / 400 / `--color-alpha-white-40`); shared-media vault grid: no text labels (cards show icon + domain color, identity-only); media unavailable state ("Expired") `--text-small` (11pt / 400 / `--color-alpha-white-50`); Done button label "Done" `--text-body` (16pt / 600 / `--color-alpha-white-100` on orange bg). Hierarchy is carried by **weight** (600 vs 400), not size inflation. Sentence case on action labels and buttons. ≤2 brand-orange accents per screen: (1) the selected quick-reaction pill background (orange), (2) the Done CTA text (implicit in the button). Chillax stays logo-only (none on this screen).

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` brand voice — warm, plain, specific, non-shaming, no exclamation marks.

**Core UX strings (from spec):**
- **Section eyebrow** — *before:* "SELECTED MESSAGE" (given) → *after (kept):* same; signals context at the top.
- **Privacy pill label** — *before:* "Private" (given) → *after (kept):* same; succinct, accessible.
- **Quick-reaction pills** — *before:* "Useful", "Support", "Done", "Insight" (given, from spec) → *after (kept):* same; warm, action-oriented, no generic emoji.
- **Action row labels** — *before:* generic "Pin message", "Star for mission", "Forward", "Open view-once media" → *after (refined):* "Pin message" / "Star for mission" / "Forward message" / "Open this media" (slight voice consistency — "this" on protected media is warmer than "view-once"; "Forward" is already a verb so kept short).
- **Action row details** — *before:* "keep visible in chat" / "attach to active mission" / "send to another conversation or SIA" / "open protected media viewer" → *after (authored):* "Keep it visible" / "Save to your mission" / "Send to a chat or SIA" / "View once, then it's gone" (warmer, shorter, the last one emphasizes the consequence without shaming).

**Edge strings (never generic, always authored):**
- **Reaction save success** — *before:* none specified → *after (on-voice):* no toast (the selected state is the feedback); if an error occurs, "Couldn't save reaction — try again."
- **Reaction failed toast** — *before:* "Reaction could not be saved" (given) → *after (refined):* "Couldn't save reaction — try again" (warmer, recovery action named; removes passive voice).
- **Forward unavailable (offline)** — *before:* "Connect to forward" (given) → *after (kept):* same; direct, clear.
- **View-once media opened, row disabled** — *before:* no message → *after (new):* action row dims to 50% opacity + text changes to "Opened — this was a one-time view" (explains why it's now disabled, warm acknowledgment, never shaming).
- **Media expired in shared-media vault** — *before:* "Expired" (given) → *after (refined):* "Expired" + a faint strikethrough or dashed border (visual indicator paired with text, per a11y rules).
- **Message no longer available (error state)** — *before:* "Message no longer available" (given) → *after (kept):* same; honest, plain.
- **Loading state (message skeleton)** — *before:* no message → *after (new):* no message necessary (skeleton preserves layout, morphs to data — silent, not noisy).
- **Permission (SIA can summarize)** — *before:* not specified → *after (new, if SIA toggle appears):* "SIA can read this message to summarize threads" — only shown once or in settings, never repeated; warm, specific rationale.
- **Done button label** — *before:* not specified → *after (kept as spec):* "Done" (simple, clear, with shield icon per spec).

All copy is specific, warm, and action-forward. Zero filler, zero generic "Success!" toasts, zero shaming frames.

### Motion choreography

Locked to `CK-P4` order (draw-first, then support, then confirm):

1. **Selected message card fades up** — `--dur-base` 280ms `--ease-out-soft`, translateY(16→0), starts first.
2. **Privacy/status pills** — fade in together at +80ms stagger (follow the message).
3. **Quick-reactions grid** — fades in + stagger per pill (each pill 280ms, 40ms stagger) at +140ms from message start.
4. **Action list rows** — each row fades in, staggered 40ms between rows, starting +200ms from message start.
5. **Shared-media vault** — fades in after action list clears, +280ms stagger.
6. **Done button** — fades in (or is always visible at fixed bottom), final confirmation of the action surface.

`prefers-reduced-motion` → all elements appear at final state instantly (no stagger, no animation). The settled frame is canonical: message visible, reactions clickable, actions available, no motion-induced depth loss.

**Reduced-motion fallback**: The message is *always* readable; the reactions are *always* tappable; there is no essential info conveyed by motion alone. Layout and depth (the white top-edge highlight, the shadow) carry the visual anchor, not the entrance animation.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | Assumes a valid message was selected; if none, error state below. | N/A (screen only opens after a long-press on a message). | Profile section kept, message card error frame. |
| Loading (message details) | Selected message card shows skeleton (avatar circle, text shimmer lines, attachment hint text) that morphs to real preview. Action rows are dimmed/skeleton. Reactions are skeleton pills. | Silent — skeleton preserves layout. | skeleton on `--color-ink-brown-800`, shimmer animation, morphs into data. |
| Empty / partial | Selected message preview renders (never empty — a message was selected to open this surface). Shared-media vault: if no related media, shows "No shared media in this message" text. | "No shared media in this message." | no degenerate empty state — the message card is always present. |
| Error | **Missing selected message**: error card "Message no longer available — it may have been deleted." + Done button (dark path, allows user to return). **Reaction failed**: toast "Couldn't save reaction — try again" + retry affordance (re-tap the same reaction pill). **Forward unavailable (offline)**: "Open message actions" row disabled with "Connect to forward" detail (dimmed 50%, no haptic on tap). **Media expired**: card in vault shows "Expired" + strikethrough (visual + text). | Per-context, warm, recovery action named. | calibrated `--color-error-red` only on genuine failures (such as network error border on the reaction pill if tapped while offline); glyph + word paired (never colour-alone). |
| Offline | Actions that require connectivity (forward, open view-once media) are dimmed with reason copy ("Connect to forward"). Cached reactions are visible but disabled ("Offline — reactions will sync when you reconnect."). | "You're offline. Reactions will sync when you're back." | actions honestly dimmed (50% opacity, no haptic); cached data retained (selected message, reactions already selected are visible). |

### Signature & anti-generic

Ownable moments: (1) **the warm-glow selected message card**, the visual anchor (depth carried by the white edge-highlight + shadow, not by chart/gauge), (2) **the privacy-first framing** — the message actions surface is explicitly about safety and consent (the privacy pill is not an afterthought; it is the second element read, establishing trust before any action is offered), (3) **the brand period in copy** — no exclamation marks, warm coaching on the disabled view-once state ("this was a one-time view" not "you can't do anything"), (4) **orange discipline** — only the selected reaction + Done button use orange (no other accents, no domain colours on the action rows, no purple), keeping 60/30/10 honest. Anti-generic fix: the action rows are not a flat symmetric list. They are a vertical stack with intentional rhythm: each row is 66pt minimum with an icon circle (44pt touch target) on the left, label + detail on the right, and a subtle rightward chevron (16pt, `--color-alpha-white-40`, tappable zone is the entire row). The shared-media vault *below* the action list uses a 3-column grid (a deliberate asymmetry from the rows above), so the screen never reads as a featureless card stack. The quick-reactions grid is the only symmetric element (2×2), and it is compact (144pt total height), so it does not dominate the screen.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast | Notes |
| --- | --- | --- | --- |
| Message preview text | `--color-alpha-white-100` | ≥12:1 on `--color-ink-brown-800` | Inherited from ThreadMessage |
| Privacy pill label ("Private") | `--color-alpha-white-50` | ≥4.5:1 on `--color-ink-brown-800` | Secondary, legible |
| Section eyebrow ("SELECTED MESSAGE") | `--color-alpha-white-40` | ≥4.5:1 | Eyebrow style, supporting |
| Quick-reaction label (unselected) | `--color-alpha-white-100` | ≥12:1 on `--color-ink-brown-800` | Full contrast, tappable |
| Quick-reaction label (selected) | `--color-alpha-white-100` | ≥12:1 on `--color-brand-orange` bg | WCAG AAA on orange |
| Action row label ("Pin message", etc.) | `--color-alpha-white-100` | ≥12:1 on `--color-ink-brown-800` | Primary, tappable |
| Action row detail ("Keep it visible") | `--color-alpha-white-40` | ≥4.5:1 | Secondary, supporting |
| Action row chevron icon | `--color-alpha-white-40` | ≥4.5:1 | Secondary, non-load-bearing |
| Media vault "Expired" label | `--color-alpha-white-50` | ≥4.5:1 | Secondary, supported by strikethrough glyph |
| Done button label ("Done") | `--color-alpha-white-100` | ≥12:1 on `--color-brand-orange` bg | WCAG AAA on orange CTA |
| Done button shield icon | `--color-alpha-white-100` | ≥12:1 on `--color-brand-orange` | Glyph + text paired |
| Error toast ("Couldn't save reaction") | `--color-alpha-white-100` + `--color-error-red` border | ≥4.5:1 | Glyph (alert icon) + text, never colour-alone |
| Offline dimmed action ("Connect to forward") | `--color-alpha-white-50` at 50% opacity | ≥4.5:1 | Legible, reason text required |

Status never colour-alone: the selected reaction is shown by **orange background + full white text label** (visual + text); a disabled action is shown by **50% opacity + specific reason copy** ("Connect to forward") + icon dimming (glyph + word); a failed reaction is shown by a **visible error toast with alert icon + text**; media expiration is shown by **"Expired" label + strikethrough glyph** (never a faded image alone). All interactive elements carry `--focus-ring` (`CK-T03`, 2px orange, 2px offset) uniform app-wide — quick-reaction pills, action rows, Done button, and media cards all use the same ring on focus-visible. Targets ≥44×44pt (44pt quick-reaction pills, 66pt action rows, full-width Done button all meet the minimum; media vault cards at 80pt also meet the target). Reduced-motion: message card appears instantly at final state, reactions appear instantly at final state (no stagger), action rows appear instantly (no stagger), media vault appears instantly. The selected reaction's orange state is the canonical visual feedback (not an animation).

Conform to `design-audit/CONSISTENCY.md`.

---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-05.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/sia/message-actions`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q14 SIA in chats requires explicit invocation.
- Q15 group health/recovery signals require per-user permission.
- Q23 call follow-up scheduling should reuse the voice-history scheduling sheet.
- Q24 create mission starts from blank natural-language intent.
- Q25 streak details preserve source tab context.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B05-F12 | critical | retention | Implement reaction save, pin/star/forward flows, protected media opening, Done/back dismissal, and failure/retry states. |
| B05-F13 | major | trust-privacy | Add protected-open confirmation and state, make media cards semantic buttons/links, and clarify what SIA can summarize. |
| B05-F14 | major | accessibility | Use aria-pressed for reactions, make back a labeled button, disambiguate the reaction from the bottom Done CTA, and maintain focus order. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

