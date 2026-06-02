# Screen Design: Direct Chat

**Screen**: 75 of 90
**File**: 75-direct-chat.md
**Route**: `/tabs/sia/direct`
**Register**: AI Mode with social accountability support
**Primary action**: Message one trusted contact with optional SIA assistance
**Tab**: SIA
**Navigation**: Stack push from Conversations Hub [74], Social Buddy Profile [83], Accountability [46], Community [40], or user profile bottom sheets. Back returns to the origin screen.

---

## Purpose

Direct Chat is the private one-to-one social layer inside Balencia. It lets the user coordinate with a trusted buddy while SIA quietly supports pacing, summaries, and mission updates. The design protects the human relationship first: SIA is assistive and contextual, not a third participant unless explicitly invoked.

---

## Information Architecture

**Hierarchy**:
1. Chat header with contact name, call, and info actions
2. Shared mission profile rail
3. SIA assist strip
4. Date divider
5. Message thread with human, user, and SIA-assisted messages
6. Typing indicator
7. Composer

**User flow**:
- **Arrives from**: Conversations Hub [74], Social Buddy Profile [83], Accountability [46], or message shortcut from user profile bottom sheet.
- **Primary exit**: Back to origin or continue messaging in composer.
- **Secondary exits**: Start call, open contact info, tap attachment, long-press message -> Message Actions [77].

---

## Layout

**Scroll behavior**: Vertical message thread. Header fixed. Composer fixed above tab bar.
**Tab bar visible**: Yes, SIA active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <        Aisha Khan      C i |
+-----------------------------+
| [AK] Aisha is training...   |
|      Shared mission: Run... |
|                             |
| [S] SIA assist              |
|     Suggest pacing, summarize|
|     decisions, convert to... |
| [Pace][Shared][Private]     |
|                             |
| -------- Today ------------ |
|                             |
| [AK] I am thinking of...    |
| [S]  Your recovery supports |
|      the river route...     |
|      [Suggested pacing]     |
|                  That works |
| [AK] Perfect. I added the   |
|      hill segment photo...  |
|      [Hill segment] [Useful]|
|                             |
| Aisha is looking... ...     |
+-----------------------------+
| Message Aisha           Send|
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Direct Header
- **Purpose**: Conversation identity and direct actions.
- **Visual treatment**: 56pt ink-900 header, back chevron, centered contact name.
- **Actions**:
  - Phone icon opens call setup.
  - Info icon opens conversation info/profile panel.

### Profile Rail
- **Purpose**: Reconfirm relationship context before the user reads the thread.
- **Visual treatment**: rounded-lg, white/3 background, white/6 border.
- **Content**: Contact avatar, "Aisha is training with you", shared mission text.
- **Gesture**: Tap -> Social Buddy Profile [83].

### SIA Assist Strip
- **Purpose**: Explain what SIA can do in the thread without taking over.
- **Visual treatment**: ink-brown card, royal-purple/20 border, SIA sparkles avatar.
- **Content**: Eyebrow "SIA assist", 1-2 line description, signal pills for Pace context, Shared mission, Private chat.
- **Behavior**: Tap opens SIA-assist options sheet: summarize, suggest reply, save to mission, ask SIA privately.

### Thread Message
- **Purpose**: Render direct, user, and SIA-assist messages.
- **Visual treatment**:
  - Contact messages: left aligned, ink-brown bubble.
  - SIA messages: left aligned, royal-purple/12 highlighted bubble with SIA avatar.
  - User messages: right aligned, brand-orange/15 bubble.
- **Attachments**: Inline cards for image, voice, mission, or plan attachments.
- **Reactions**: Compact pill strip under the message bubble.
- **Long press**: Opens Message Actions [77].

### Composer
- **Purpose**: Send a direct message.
- **Visual treatment**: Fixed composer above tab bar, placeholder "Message Aisha", send action.
- **Behavior**: Supports text, attachment, voice, and SIA-suggested reply insertion.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Human bubbles | #211008 | ink-brown-800 | Incoming |
| User bubble | #FF5E00 at 15% | brand-orange/15 | Outgoing |
| SIA bubble | #7F24FF at 12% | royal-purple/12 | Assistive |
| SIA border | #7F24FF at 20-25% | royal-purple | SIA assist only |
| Shared mission domain | #EF4444 | fitness-red | Tag/avatar tint |
| Read status | #34A853 | forest-green | Double-check read |
| Text primary | #FFFFFF | white | Message text |
| Text metadata | #FFFFFF at 30-45% | white/45 | Time/status |

**60/30/10 verification**: Orange is limited to user message emphasis and actions. Purple indicates SIA assist. Green is read/online status only.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Message bubble | Long pressed | Bubble lifts with shadow-2; background brightens |
| Attachment | Pressed | scale(0.98), border white/12 |
| SIA assist strip | Active | Royal-purple border brightens |
| Composer | Focused | Keyboard opens, input border white/12 |
| Send | Disabled | white/25 until text or attachment exists |
| Send | Active | brand-orange icon/text |

---

## Motion

- Messages appear with 70ms stagger on screen entry.
- New outgoing message slides up 8pt and fades in over 180ms.
- Typing indicator dots loop with 180ms offsets.
- Attachment preview expands with 220ms ease-out-soft.

---

## Empty, Loading, Error

- **New direct chat**: Show profile rail, SIA assist strip, and empty prompt "Start the first message".
- **Loading**: Skeleton profile rail, assist strip, and four bubble placeholders.
- **Failed send**: Message remains in place with orange warning text "Tap to retry".
- **Attachment blocked**: Show toast "This media is no longer available".
- **Offline**: Composer remains editable; sends queue with "Waiting for connection" status.

---

## Accessibility

- Header call button label: "Start call with Aisha Khan".
- Info button label: "Conversation info".
- Message bubbles announce author, time, message text, and attachment summary.
- Reactions announce label and count.
- Composer supports standard keyboard return/send behavior and dictation.
- SIA messages include "SIA assist" in accessibility label.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/sia/direct/page.tsx`.
- Mock data source: `directConversationMessages` in `balencia-screens/src/data/mock.ts`.
- Long-press actions route to Message Actions [77].
- This spec does not introduce a new social graph model; it documents the current private chat mock route.
---

## Premium Craft

**Profile:** content · **Cluster benchmark:** iMessage + Telegram (premium, restrained) — *stays Balencia via message-craft surface depth, on-voice SIA assist, warm-glow layered cards, and trust-safety microcopy.*
**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

*Pre-grade drivers: the spec has strong IA and safety intent, but surfaces are currently flat, SIA copy is unwritten, and message states (typing, delivery, read, errors) are underspecified; post-grade elevates every surface with layered depth, authors all copy to warm SIA voice, and designs every load/empty/error state.*

### Focal hierarchy

The focal point is the **message thread itself** — the scrollable list of bubbles from both the user and the contact, with SIA-assisted messages as contextual support. The thread is the reason the screen exists; everything else — the header, profile rail, SIA assist strip, and composer — is support. The squint test lands on the thread bubbles first (left-aligned contact bubbles, right-aligned user orange bubbles). The header (contact name + call/info icons) is persistent but secondary (sticky, non-interactive unless tapped). The profile rail below the header reconfirms relationship context in one glance (avatar, mission tag) before the user reads the thread — a single-line identity anchor, not a competing focus. The SIA assist strip sits between the profile rail and the thread, offering contextual help without taking over; it reads as a "here if you need me" affordance, not a primary element. The composer is fixed at the bottom, visibly secondary to reading the thread (it only becomes focal when the user begins typing). No competing foci; the thread dominates.

### Surface & depth

Every surface uses `CK-P1` Layered Warm Surface: `--color-ink-brown-800` body · `--radius-xl` (28pt) on cards · 1px `--glass-border` (`--color-alpha-white-06`) · **`CK-T01` `--edge-highlight` top-edge inner highlight** — the key not-flat cue — · and `--shadow-1` (mid-elevation). Human message bubbles (left-aligned, ink-brown body) receive the full treatment: layered body + edge-highlight + shadow, never a flat colored box. User message bubbles (right-aligned, `--color-brand-orange` at 15% opacity over `ink-900`) are intentionally lighter (a subtle fill, no hard border), preserving legibility of white text; they carry `--edge-highlight` and a faint inset shadow (`--shadow-1` at 50% opacity) to read as sent-by-me without competing with the contact's bubbles. SIA-assisted message bubbles (`--color-royal-purple` at 12% opacity) are treated as support: left-aligned like contact messages, purple tinted (not orange), with the same layered surface treatment + a faint purple glow (`--glow-purple-sm` ~12px /.35, fired only on entry, not persistent) to signal "SIA has added context here." The profile rail card uses `--radius-md` (14pt, the small-card radius for <80px height), same layered treatment. The SIA assist strip uses `--radius-lg` (20pt), `--color-ink-brown-800` body + 1px `--color-royal-purple` at 20% opacity border (a purple line, not an orange one, to signal SIA), `--edge-highlight`, and `--shadow-1`. The composer sits in a 40pt footer area: white/6 border on top (a subtle divider), no rounded corners (it extends to the safe-area edges), and a flat `--color-ink-900` background (no shadow to avoid visual weight below the tab bar). The message-actions long-press state (triggered on long press of any bubble) lifts the bubble with `--shadow-2` (0 18pt 48pt, a real elevation) and brightens the bubble background by +10% opacity (not a stark white flash, a warm brightening). All surfaces are warm-glow depth, never neon or cold.

### Typographic rhythm

All copy follows the locked `CK-P3` type scale. **Message text** (human, user, SIA) is `--text-body` (16pt) / 400 weight / `--leading-normal` (1.4) / white at 90%. **Message metadata** (time, read status, "Suggested pacing" badge labels) is `--text-caption` (13pt) / 400 / `--leading-normal` / white at 45%. **Contact name** in the header is `--text-h2` (20pt) / 600 / `--leading-snug` (1.25) / white 100%, centered in the 56pt header. **SIA assist eyebrow** ("SIA assist") is the `.eyebrow` recipe: `--text-eyebrow` (12pt) / 600 / `--tracking-eyebrow` (+0.12em) / uppercase / white at 40%. **SIA assist description text** is `--text-body` (16pt) / 400 / white at 90%. **Signal pills** on the assist strip ("Pace", "Shared", "Private") are `--text-small` (11pt) / 500 / white at 50%, on a `--radius-sm` (10pt) pill with `--color-alpha-white-08` background. **Reaction pill labels** (if shown) are `--text-small` (11pt) / 500 / white at 70%. **Typing indicator label** ("Aisha is typing…") is `--text-caption` (13pt) / 400 / white at 50%, italicized. **Hint text text** in the composer ("Message Aisha") is `--text-body` (16pt) / 400 / white at 30%. Hierarchy comes from weight (600–700 vs 400), not color variation. Sentence case throughout. No exclamation marks. The brand period is used with intent: any microcopy ending with a sentence should close with a period (such as "Your recovery supports the river route." is complete; "Message Aisha" is a label, no period). Reconciles with the spec's Typography section (no off-scale sizes).

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` SIA voice — warm, plain, coaching, zero filler. The spec has strong structural copy but leaves several strings empty or templated; this section authors them:

- **Profile rail subtitle** — *before:* "Aisha is training with you · Shared mission: Run for 30 min" (given) → *after (kept):* same; warm, specific, no rewording needed.
- **SIA assist eyebrow** — *before:* "SIA assist" (given) → *after (kept):* same; clear signal.
- **SIA assist description** — *before:* "Suggest pacing, summarize decisions, convert to mission" (given, structural) → *after (authored):* "SIA can suggest pacing · summarize your chat · save to a mission. Tap to control what I read." — warm, explicit consent language.
- **Signal pills labels** — *before:* "[Pace] [Shared] [Private]" (given) → *after (kept):* same; concise.
- **New conversation, empty state** — *before:* no message specified → *after (new, warm):* "Start the first message. Aisha is here if you need help." — coaching voice, SIA presence acknowledged.
- **Typing indicator** — *before:* no text (implied "...") → *after (new):* "Aisha is typing…" (shows who is typing).
- **Message delivery states** — *before:* no states specified → *after (new, non-shaming, per message):*
  - *Sending (optimistic)*: no badge, message appears in thread immediately.
  - *Sent (not read)*: checkmark icon (single, 12pt white/60%) below the bubble, no badge text.
  - *Delivered*: double-checkmark icon (12pt white/60%), no badge text.
  - *Read*: double-checkmark icon becomes `--color-forest-green` (12pt).
  - *Failed send*: orange warning icon (⚠, 12pt) + "Tap to retry" label (11pt white/50%), message remains in place, never dimmed.
- **Offline composer state** — *before:* no offline behavior specified → *after (new, honest):* send button is dimmed (`--color-alpha-white-25`); below composer, banner "Waiting for connection…" (11pt white/40%).
- **SIA-assisted message prefix badge** — *before:* structure implies "[S] SIA" → *after (kept):* "[S] SIA assist" clarifies it's optional support.
- **Suggested pacing / Shared decision actions** — *before:* "[Suggested pacing]" and "[Useful]" are structural → *after (new, warm, CTA):* specific actions like "Pace at 7 min/mile" with brief "Added to mission" confirmation (green text, 11pt, fades 2s).
- **Permission rationale (SIA opt-in)** — *before:* no permission text → *after (new, §11 edge string):* info icon on assist strip → modal: "SIA assist. Aisha can't see SIA suggestions — only you can. You control what SIA saves to your mission. You can turn off assist anytime." — warm, honest, consent-first.
- **Long-press message menu entry point** — *before:* "Message Actions [77]" referenced but no entry string → *after (new):* long-press shows "More" menu with header "Message options" (11pt `--text-caption`), actions (React, Copy, Delete, Forward, Save to mission if SIA), delete inline with others (soft red, always with text "Delete").
- **Attachment removed / blocked state** — *before:* "This media is no longer available" (given) → *after (kept):* same; specific, warm.

Across all copy: no exclamation marks; no generic SIA horoscopes; SIA copy is specific insight or clear affordance, never filler.

### Motion choreography

Per `CONSISTENCY.md` §3, a draw-first entrance sequence:

1. **Header sticks instantly** (persistent chrome, no animation).
2. **Profile rail card fades in** (`opacity: 0→1`, 280ms `--ease-out-soft`, t=0).
3. **SIA assist strip fades in** (`opacity: 0→1`, 280ms `--ease-out-soft`, t=40ms stagger).
4. **Message bubbles stagger in** (`opacity: 0→1` + `translateY(8→0)`, 280ms `--ease-out-soft`, 40–60ms stagger per bubble). Contact bubbles animate from left; user bubbles from right.
5. **New outgoing message on send**: bubble slides up 8pt and fades in (`translateY(8→0)`, `opacity: 0→1`, 180ms `--ease-out-soft`). Send button pulses (background brightens 10%, 120ms ease-out).
6. **Typing indicator dots** loop: 6pt `--radius-pill` white/40% dots, 4pt apart. Animation: each dot scales `1→1.2` and back over 180ms, 180ms offsets (bounce sequence). Preserved on `prefers-reduced-motion` (visible, no loop).
7. **Attachment preview expand**: card scales `0.95→1.0` + fades in, 220ms `--ease-out-soft`.
8. **Reaction pill appear**: slides in from bottom-right of bubble, `translateY(8→0)` + `opacity: 0→1`, 160ms `--ease-out-soft`.
9. **Long-press lift**: bubble shadow shifts `--shadow-1` → `--shadow-2` (0 18pt 48pt), background +10% opacity, 120ms ease-out. On release, revert 120ms ease-out.
10. **Below-fold rows**: new messages animate on scroll-into-view, fade-up 280ms `--ease-out-soft`.

**Reduced-motion**: all elements at final state instantly. Typing indicator dots visible, no loop. Long-press lift replaced with background color shift, no shadow motion. No stagger.

### State craft

Every state is designed per `CK-P7`. The matrix below shows layout, copy, and depth for each:

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | Header + profile rail + SIA assist strip + empty thread area + composer | "Start the first message. Aisha is here if you need help." · centered, 15pt white/70%, 24pt above composer | Surfaces at full depth (`--edge-highlight`, `--glow-purple-sm` on assist strip). Empty area not blank void — profile rail and SIA assist provide structure. |
| **Loading** | Header fixed · profile rail + assist strip skeleton · 4 message-bubble skeletons (left/right alternating) · composer enabled | "Loading…" below profile rail skeleton (11pt white/40%) · composer hint text "Message Aisha" | Skeleton bubbles preserve layout (left/right, real widths) and depth (faint `--edge-highlight` visible, morph into real bubbles when data arrives). |
| **Empty / partial** | Header + profile rail + assist strip + empty thread area | "No messages yet." (15pt white/50%, centered) or "Fetching recent messages…" | Surfaces at full depth. Empty state honest and calm, never degenerate. |
| **Error** | Header + profile rail + assist strip + successfully-loaded messages + error row + composer enabled | "Couldn't load messages. Check your connection." (13pt white/50%, centered) + "Retry" button (44pt min height, `--radius-pill`, `--color-brand-orange` text + 1px border). Single message failure: warning icon + "Tap to retry" below bubble (11pt white/50%). | Error specific, recovery affordance visible. Thread does not collapse or flash red. Calm, non-shaming recovery. |
| **Offline** | All messages visible, composer editable | Banner below composer (11pt white/40%): "Waiting for connection…" · send button dimmed (`--color-alpha-white-25`). Messages sent while offline show clock icon (12pt white/50%) instead of checkmark — become checkmark + green on reconnect. | Surfaces at full depth. Offline not an interruption — user can read and compose. Queued messages visually distinct (clock, not checkmark). |

### Signature & anti-generic

**Ownable Balencia moment**: the SIA assist strip is the signature — not a feature lift from competitors, but Balencia's voice. Instead of jamming AI into the message thread or replacing the human relationship, SIA sits beside the chat as a trusted coach: "I can help you pace this, save it to your mission, or just listen." The purple border (not orange), the warm `.eyebrow` label, and explicit opt-in controls ("You control what I read") make this unmistakably Balencia — warm, consent-first, non-invasive. The second ownable moment is **warm-glow message bubble surfaces** — human bubbles in `ink-brown-800` with `--edge-highlight` and soft warm shadow (`--shadow-1`), never flat boxes or hard borders. This keeps the screen calm and intimate (warm conversation), never cold or robotic.

**Generic tells removed**: 
- Flat message bubbles with hairline borders → layered `CK-P1` surfaces + edge-highlight.
- Unwritten SIA copy (structural labels) → authored to warm voice with permission clarity.
- Generic "Waiting…" spinner → authored "Aisha is typing…" + warm dot-bounce loop.
- Bare orange 36×36 "Send" button → 44pt `--radius-pill` button, clear enabled/disabled state.
- No-state message delivery → clear read-state choreography (checkmark icon, green on read).
- Unframed SIA assist → permission rationale and opt-in clarity.

The screen reads **premium, restrained, and human** — not a feature-heavy chat app clone, but a trusted coach-supported one-to-one conversation. Restraint (no emoji reactions wall, no infinite scroll gaming) scores up against a maximalist competitor.

### Accessibility

**Contrast & colour-not-alone**:
- Message text (white 90% on `ink-brown-800` or `brand-orange`/15%) → ≥4.5:1 ✓
- Metadata (white 45% on `ink-900`) → ≥3:1 ✓
- Read-status checkmark (green 34A853 on `ink-900`) → ≥3:1 ✓
- Failed-send warning icon (orange) + "Tap to retry" text → colour + glyph + word ✓
- Typing indicator dots (white 40% on `ink-900`) → ≥3:1 ✓
- All interactive elements carry visible states: color change, glyph change, or scale. None rely on colour alone.

**Touch targets**:
- Send button: 44×44pt minimum (`--radius-pill`), center of 56pt footer.
- Message bubbles (long-press): minimum 60pt tall, full-width-minus-32pt, tappable.
- Call icon / Info icon: 44×44pt each.
- SIA assist strip: full card width, ~80pt tall.
- Signal pills: 32pt height, ≥44pt width.
- Reaction pills: 32pt height per pill.

**Focus ring**:
- Every focusable element receives `CK-T03 --focus-ring` (2px orange, 2pt offset) when focused via keyboard. Ring visible at `--color-orange` on dark background, ≥3:1 contrast.

**Keyboard behavior**:
- Tab navigates: header call/info icons → SIA signal pills (left-to-right) → composer input → send button.
- Composer input: Return/Enter = send (when text present).
- Message bubble: Focus + spacebar or Enter triggers long-press menu.
- Escape from long-press menu returns to thread.

**Reduced-motion**:
- `prefers-reduced-motion` → all animations instant, final state only. Typing indicator dots visible (no loop). Bubble lift becomes color shift (no shadow motion). No stagger. Settled frame (all bubbles, profile, assist, no spinner, no dots bouncing) is canonical.

**Screen reader**:
- Header: "Direct message with Aisha Khan. Call button, information button."
- Profile rail: "Aisha is training with you. Shared mission: Run for 30 minutes. Tap to view Aisha's profile."
- SIA assist strip: "SIA assist. I can suggest pacing, summarize your chat, or save to a mission. Tap to manage permissions."
- Each message: "[Aisha]. Message text. Sent [timestamp]. Double-checkmark, read." (or "Checkmark, sent" if unread). SIA: "[SIA assist]. [Message text]. Sent by SIA suggestion."
- Typing indicator: "Aisha is typing…"
- Read-state icon: "Read" (green, inline, never colour-alone).
- Composer: "Message Aisha. Text input. Enabled." (or "Dimmed. Waiting for connection." if offline).
- Send button: "Send message."

Conform to `design-audit/CONSISTENCY.md`.

---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-05.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/sia/direct`
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
| B05-F06 | critical | retention | Build a real direct-message composer with enabled/disabled send, optimistic send, retry/offline states, and 44px action target. |
| B05-F07 | major | navigation | Wire back navigation, call setup, contact info, SIA-assist options, and message-action entry. |
| B05-F08 | major | trust-privacy | Define and expose per-thread SIA visibility and explicit opt-in controls for summarize/suggest/save actions. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

