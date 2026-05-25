# Screen Design: SIA Chat

**Screen**: 09 of 43
**File**: 09-sia-chat.md
**Register**: Product Mode
**Primary action**: Converse with SIA (type or tap to send messages)
**Tab**: SIA (tab 2 of 4)
**Navigation**: Tab root screen (no back button). Stack depth 0 within SIA tab. Rich inline cards deep-link to feature screens via stack push. Mic button toggles to in-chat voice mode [10]. Long-press mic transitions to full-screen voice mode [11] (Batch 3).

---

## Purpose

SIA Chat is the core product of Balencia — the unified AI coach conversation. Every other screen in the app exists to support or extend what happens here. The chat handles text conversations, rich inline content (charts, progress rings, meal plans, financial summaries), suggestion chips, proactive messages, and navigational deep-links to feature screens. SIA is proactive: it initiates conversations, surfaces cross-domain connections, and delivers insights without being asked. The chat must feel like iMessage quality with embedded app intelligence. This is where users spend most of their time and where the "it gets me" moments happen.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Latest SIA message — the active conversation, most recent at bottom
2. Rich inline cards — charts, progress, summaries embedded in the conversation flow
3. Suggestion chips — quick-response options after SIA's latest message
4. Chat input bar + mic button — the "what to do" area
5. Top bar — "SIA" title, minimal chrome, voice mode indicator
6. Older messages — scrollable history above

**User flow**:
- **Arrives from**: Bottom tab bar (tapping SIA tab), or SIA greeting card on Home Screen [12] (Batch 3), or any "Ask SIA" shortcut throughout the app
- **Primary exit**: Feature screens via rich inline card taps (stack push within SIA tab)
- **Secondary exits**: Other tabs via bottom tab bar, Full-screen voice mode [11] via long-press mic
- **Mode switch**: In-chat voice mode [10] via mic tap (no navigation — UI state change)

---

## Layout

**Scroll behavior**: FlatList (inverted — newest messages at bottom, auto-scrolls to latest). Pull-down loads older messages (pull-to-load, not pull-to-refresh).
**Tab bar visible**: Yes (SIA tab active, orange filled icon)

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  SIA                    🎙  │  ← top bar: title left, voice icon right
├─────────────────────────────┤
│                             │
│  ┌─┐ ┌─────────────┐      │
│  │S│ │ Good morning │      │  ← SIA message bubble
│  └─┘ │ [Name]. You  │      │
│      │ crushed it   │      │
│      │ yesterday.   │      │
│      └─────────────┘      │
│                             │
│      ┌─────────────────┐   │
│      │ ┌─────────────┐ │   │  ← rich inline card
│      │ │ 📊 Sleep vs  │ │   │     (chart card)
│      │ │ Exercise     │ │   │
│      │ │ [mini chart] │ │   │
│      │ │ ↗ "view more"│ │   │
│      │ └─────────────┘ │   │
│      └─────────────────┘   │
│                             │
│       ┌──────────────┐     │
│       │ Yeah I felt  │     │  ← user message bubble
│       │ great.       │     │
│       └──────────────┘     │
│                             │
│  ┌─┐ ┌─────────────┐      │
│  │S│ │ Your sleep   │      │  ← SIA response with
│  └─┘ │ has improved │      │     inline insight
│      │ 15% since... │      │
│      └─────────────┘      │
│                             │
│  ┌──────┐ ┌──────┐ ┌────┐ │  ← suggestion chips
│  │tell  │ │show  │ │log │ │
│  │me    │ │my    │ │a   │ │
│  │more  │ │goals │ │meal│ │
│  └──────┘ └──────┘ └────┘ │
│                             │
├─────────────────────────────┤
│ ┌──────────────────┐ ┌──┐ │
│ │ message SIA       │ │🎤│ │  ← input bar + mic button
│ └──────────────────┘ └──┘ │
├─────────────────────────────┤
│  Today    SIA   Goals   Me  │  ← bottom tab bar (56pt)
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Content: Light-content, transparent

2. **Top Bar** — 48pt
   - Purpose: Screen identity + voice mode access
   - Content: "SIA" title (left), voice mode icon (right)

3. **Chat Message Area** — flexible (fills remaining space between top bar and input bar)
   - Purpose: The conversation — messages, cards, chips
   - Content: FlatList of message items (SIA bubbles, user bubbles, rich cards, suggestion chips, timestamps, day separators)

4. **Chat Input Bar** — 52pt
   - Purpose: Text entry + voice access
   - Content: Text input field + mic button (replaces send when empty) / send button (replaces mic when text entered)

5. **Bottom Tab Bar** — 56pt
   - Purpose: App navigation
   - Content: Today | **SIA** (active) | Goals | Me

6. **Home Indicator Zone** — 34pt

---

## Components

### Top Bar
- **Purpose**: Minimal chrome — identify the screen and provide voice mode access
- **Data source**: Static
- **Visual treatment**: Full-width, 48pt height. Background: ink-900 (#0A0A0F) with subtle bottom border (1pt, white at 5%). Left: "SIA" in 17pt Sora Semibold, white, 16pt from left edge. Right: voice mode icon (waveform/mic hybrid icon, 22pt, white at 50%), 16pt from right edge, 44x44pt touch target. On scroll, the top bar gains a backdrop-blur effect (ink-900 at 80%, blur 20px).
- **Variants**: Default (transparent), Scrolled (backdrop-blur)
- **Gestures**: Tap voice icon → transition to full-screen voice mode [11]
- **Size**: Full-width x 48pt

### SIA Message Bubble (Extended)
- **Purpose**: Display SIA's messages — extends the pattern from Screen [07]
- **Data source**: AI-generated responses, proactive messages
- **Visual treatment**: Same as Screen [07] pattern — left-aligned, ink-brown-800 bg, white 8% border, 16/16/16/4pt radius, SIA avatar to the left. Additional capability: can contain inline domain tag chips within the text. SIA avatar only shows on the first bubble in a consecutive group.
- **Variants**:
  - **Text only**: Standard message
  - **Text with domain tags**: Domain chips inline with text (e.g., "your [fitness] and [nutrition] goals are connected")
  - **Connection Spotted**: Special variant with a header — "connection spotted" eyebrow (11pt, orange, uppercase) above the message text, indicating a cross-domain insight
  - **Proactive message**: Same visual, but appears without user prompt. Subtle entry animation (slide up) distinguishes from responses.
- **Gestures**: Long-press → copy text
- **Size**: Max-width 80% of chat area, height auto

### User Message Bubble
- **Purpose**: Display user's sent messages
- **Data source**: User input
- **Visual treatment**: Same as Screen [07] pattern — right-aligned, orange 15% bg, 16/16/4/16pt radius.
- **Variants**: Text only
- **Gestures**: Long-press → copy text
- **Size**: Max-width 80% of chat area, height auto

### Rich Inline Card
- **Purpose**: Embed interactive app content within the conversation flow — the feature that makes SIA Chat more than a chatbot
- **Data source**: Various (API data for charts, goal progress, meal plans, etc.)
- **Visual treatment**: Full-width of SIA message alignment area (left-aligned after avatar space, extends to right margin). Background: ink-brown-800 (#211008), --r-xl (28pt) corners, 1pt white 8% border. Padding: 16pt. Content varies by card type. Bottom-right: "view [feature]" link (12pt Sora Semibold, orange) for navigational cards.
- **Card types**:
  - **Chart Card**: Mini line chart (120pt tall, orange solid line for past data, purple dashed for projected). Title above chart (14pt Sora Semibold, white). Caption below (12pt Sora Regular, white at 50%).
  - **Goal Progress Card**: Progress ring (48pt, domain color) + goal name (15pt Sora Semibold, white) + "40% complete" (13pt Sora Regular, white at 50%) + next action (13pt Sora Regular, white at 70%).
  - **Meal Plan Card**: Meal name header (14pt Sora Semibold, white) + macro badges (small pills: calories, protein, carbs, fat in 11pt).
  - **Financial Summary Card**: Heading "this month" (14pt Sora Semibold, white) + income/expenses/net in a simple 3-row layout.
  - **Workout Preview Card**: Workout name + exercise count + duration estimate + "start workout" orange pill button (32pt height).
  - **Connection Spotted Card**: "connection spotted" orange eyebrow + insight text + mini chart showing the correlation + "tell me more" link.
- **Variants**: Each card type is a variant. All share the same outer shell.
- **Gestures**: Tap card → navigate to relevant feature screen (stack push). Tap "view [feature]" → same. Tap inline CTA (e.g., "start workout") → navigate directly.
- **Size**: (screen width - 48pt avatar area - 16pt right margin) x auto (120-200pt depending on type)

### Suggestion Chip Row (Extended)
- **Purpose**: Quick-response options — extends the pattern from Screen [07]
- **Data source**: AI-generated based on conversation context
- **Visual treatment**: Same as Screen [07] pattern — horizontal scroll, pill chips, orange borders and text. Positioned 8pt below the last SIA message (or rich card). Chips adapt to the conversation context.
- **Variants by context**:
  - **Conversational**: "tell me more", "what about my sleep?", "show my goals"
  - **Action-oriented**: "log a meal", "start workout", "add a goal"
  - **Navigational**: "show my finances", "open nutrition", "view schedule"
  - **Free text**: "something else" (always last chip, white 30% border)
- **Gestures**: Tap to send as user message
- **Size**: Horizontal scroll x 36pt height

### Chat Input Bar (with Mic)
- **Purpose**: Text entry and voice access — the primary interaction point
- **Data source**: User input
- **Visual treatment**: Full-width - 32pt margins (16pt each side). Total height: 52pt. Input field: ink-brown-800 bg, 1pt white 10% border, --r-pill corners. Placeholder: "message SIA" (14pt Sora Regular, white at 30%). Text: 15pt Sora Regular, white. Padding: 16pt left, 88pt right (room for two buttons).
  - **When empty**: Mic button visible (36pt circle, ink-brown-800 bg, 1pt white 10% border, white mic icon 18pt). Send button hidden.
  - **When text entered**: Send button appears (36pt circle, orange bg, white arrow-up 16pt). Mic button slides left slightly to make room, or crossfades to send button position.
  - **Button positions**: Right-aligned inside the input field, 4pt from right edge. If both visible during crossfade, mic is left, send is right.
- **Variants**: Empty (mic only), Has text (send + mic, or send replaces mic), Disabled during SIA response
- **Gestures**:
  - Tap input field → focus + keyboard
  - Tap mic (quick) → in-chat voice mode [10] (UI state change, no navigation)
  - Long-press mic (500ms+) → full-screen voice mode [11] (Batch 3, stack push to modal)
  - Tap send → submit message
- **Size**: (screen width - 32pt) x 52pt

### SIA Thinking Indicator
- **Purpose**: Show that SIA is processing a response
- **Data source**: Loading state
- **Visual treatment**: Appears as a SIA message bubble with three animated dots inside. Dots: 6pt circles, white at 40%. Animation: sequential pulse (opacity 40%→100%→40%), staggered 200ms between dots. SIA avatar shows "thinking" variant (subtle pulse on the avatar itself).
- **Variants**: Standard thinking (3 dots), Extended thinking (3 dots + "SIA is thinking deeper..." text after 5 seconds)
- **Gestures**: None
- **Size**: ~60pt wide x 36pt tall (bubble)

### Day Separator
- **Purpose**: Visually separate messages by date in the conversation history
- **Data source**: Message timestamps
- **Visual treatment**: "today", "yesterday", or "May 18" — 12pt Sora Regular, white at 30%, center-aligned. Horizontal lines (1pt, white at 5%) extending from text edges to margins. 24pt vertical padding above and below.
- **Variants**: "today", "yesterday", specific date
- **Gestures**: None
- **Size**: Full-width x 48pt (including padding)

### Pull-to-Load Indicator
- **Purpose**: Load older messages when user scrolls to the top
- **Data source**: Pagination (older message history)
- **Visual treatment**: Small spinner (20pt, white at 30%) centered above the oldest visible message. Appears when user pulls down past the first message. Text below spinner: "loading earlier messages" (12pt, white at 20%).
- **Variants**: Pulling (spinner appears), Loading (spinner animating), Complete (spinner disappears, new messages inserted)
- **Gestures**: Pull down past first message
- **Size**: Full-width x 40pt

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Top bar title | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "SIA" |
| SIA message text | Sora | 400 (Regular) | 15pt | 22pt | White #FFFFFF | From Screen [07] pattern |
| User message text | Sora | 400 (Regular) | 15pt | 22pt | White #FFFFFF | From Screen [07] pattern |
| Suggestion chip | Sora | 600 (Semibold) | 14pt | 18pt | #FF5E00 | From Screen [07] pattern |
| Input placeholder | Sora | 400 (Regular) | 14pt | 18pt | White at 30% | "message SIA" |
| Input text | Sora | 400 (Regular) | 15pt | 22pt | White #FFFFFF | User typing |
| Rich card title | Sora | 600 (Semibold) | 14pt | 18pt | White #FFFFFF | Card header |
| Rich card body | Sora | 400 (Regular) | 13pt | 18pt | White at 80% | Card content |
| Rich card caption | Sora | 400 (Regular) | 12pt | 16pt | White at 50% | Chart caption |
| Rich card link | Sora | 600 (Semibold) | 12pt | 16pt | #FF5E00 | "view [feature]" |
| "connection spotted" | Sora | 600 (Semibold) | 11pt | 14pt | #FF5E00 | Eyebrow, uppercase |
| Day separator | Sora | 400 (Regular) | 12pt | 16pt | White at 30% | "today", dates |
| Domain tag (inline) | Sora | 600 (Semibold) | 11pt | 14pt | [domain color] | Within SIA text |

---

## Composition & Visual Hierarchy

**Squint test**:
- SIA messages (left, darker) and user messages (right, warm tint) form a clear conversational rhythm
- Rich inline cards break the bubble pattern — larger, more structured, visually distinct as "content blocks"
- Suggestion chips draw attention with orange borders, positioned right where the eye lands after reading SIA's message
- The input bar + mic is the clear "what to do" at the bottom
- Top bar is minimal — "SIA" and one icon, doesn't compete with content

**Spacing breakdown (8pt grid)**:
- Top bar height: 48pt
- Top bar to first message: 12pt (--s-3)
- Between same-sender consecutive messages: 4pt (--s-1)
- Between different-sender messages: 16pt (--s-4)
- SIA message to suggestion chips: 8pt (--s-2)
- Suggestion chips to next message: 16pt (--s-4)
- SIA message to rich inline card: 8pt (--s-2)
- Rich inline card to next element: 16pt (--s-4)
- Day separator padding: 24pt above + 24pt below (--s-5)
- Last message to input bar: 8pt (--s-2)
- Input bar: 52pt
- Input bar to tab bar: 0pt (adjacent)
- Tab bar: 56pt

**Z-layers**:
- z-0: ink-900 background
- z-10: Message bubbles, rich inline cards
- z-20: Suggestion chips
- z-30: Top bar (backdrop-blur on scroll), Chat input bar (fixed at bottom)
- z-40: Tab bar
- z-50: Keyboard overlay
- z-60: Long-press copy menu

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| Top bar bg | #0A0A0F (80% + blur) | ink-900 at 80% | On scroll |
| Top bar border | rgba(255,255,255,0.05) | white at 5% | Bottom edge |
| Top bar title | #FFFFFF | white | "SIA" |
| Voice icon | rgba(255,255,255,0.5) | white at 50% | De-emphasized |
| SIA bubble bg | #211008 | ink-brown-800 | From [07] |
| SIA bubble border | rgba(255,255,255,0.08) | white at 8% | From [07] |
| SIA avatar bg | #FF5E00 | brand-orange | SIA identity |
| SIA avatar glow | rgba(127,36,255,0.2) | brand-purple at 20% | AI indicator |
| User bubble bg | rgba(255,94,0,0.15) | brand-orange at 15% | From [07] |
| Rich card bg | #211008 | ink-brown-800 | Surface |
| Rich card border | rgba(255,255,255,0.08) | white at 8% | Subtle |
| Chart line (past) | #FF5E00 | brand-orange | User data |
| Chart line (projected) | #7F24FF (dashed) | brand-purple | AI projection |
| Chart milestone dots | #34A853 | brand-green | Milestones |
| Progress ring fill | [domain color] | per domain | Goal progress |
| "connection spotted" | #FF5E00 | brand-orange | Eyebrow |
| "view [feature]" link | #FF5E00 | brand-orange | Navigation |
| Suggestion chip border | rgba(255,94,0,0.3) | brand-orange at 30% | From [07] |
| Suggestion chip text | #FF5E00 | brand-orange | From [07] |
| Input bar bg | #211008 | ink-brown-800 | Surface |
| Input bar border | rgba(255,255,255,0.1) | white at 10% | Subtle |
| Mic button bg | #211008 | ink-brown-800 | De-emphasized when empty |
| Mic button icon | rgba(255,255,255,0.6) | white at 60% | Clear but secondary |
| Send button bg | #FF5E00 | brand-orange | Active when text present |
| Send button icon | #FFFFFF | white | Arrow-up |
| Day separator text | rgba(255,255,255,0.3) | white at 30% | Ambient |
| Day separator line | rgba(255,255,255,0.05) | white at 5% | Barely visible |
| Thinking dots | rgba(255,255,255,0.4) | white at 40% | Pulsing |
| Tab bar active | #FF5E00 | brand-orange | SIA tab |
| Tab bar inactive | rgba(255,255,255,0.6) | white at 60% | Other tabs |

**60/30/10 verification**: Orange on send button, suggestion chips, "connection spotted" labels, "view" links, chart lines (past data), SIA avatar, active tab indicator. Green on chart milestone dots and success states. Purple on chart projected lines and SIA avatar glow (exactly 2 uses). Domain colors on inline tags and progress rings (identification only). Ratio holds across a typical conversation view.

---

## Interaction States

### Rich Inline Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white 8% border, card content | — |
| Pressed | Entire card: scale(0.98), border brightens to white 15%, subtle shadow appears | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer (gradient sweep left→right across card surface, 1200ms loop) | — |
| Error | "couldn't load this content" text, white at 40%, retry link in orange | Error notification |

### Mic Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (text empty) | ink-brown-800 bg, white 10% border, white mic icon at 60% | — |
| Pressed (quick tap) | Scale(0.9), bg fills orange at 20% | Light impact |
| Long-press (500ms+) | Button grows to 44pt, orange glow radiates outward, haptic ramp. Releases into full-screen voice mode [11]. | Heavy impact (ramp) |
| Active (in-chat voice mode) | Orange bg, white mic icon, pulsing glow — this state is on Screen [10] | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Send Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (visible) | Orange circle, white arrow-up | — |
| Pressed | Scale(0.9), darker orange | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Voice Icon (Top Bar)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Waveform icon, white at 50% | — |
| Pressed | Scale(0.9), white at 80% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### SIA Message Bubble
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard bubble | — |
| Long-pressed | Bubble bg lightens, copy menu appears above (z-60) | Medium impact |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | SIA tab (tab bar) | Navigate to this screen |
| Tap | Suggestion chip | Send as user message |
| Tap | Input field | Focus + raise keyboard |
| Tap | Send button | Submit message |
| Tap (quick) | Mic button | Switch to in-chat voice mode [10] |
| Long-press (500ms+) | Mic button | Transition to full-screen voice mode [11] |
| Tap | Rich inline card | Navigate to relevant feature screen (stack push) |
| Tap | "view [feature]" link | Navigate to feature screen |
| Tap | Voice icon (top bar) | Transition to full-screen voice mode [11] |
| Long-press | Any message bubble | Copy text menu |
| Pull down | Past first message | Load older message history |
| Scroll | Chat area | Scroll through messages |
| Tap | Outside input (keyboard up) | Dismiss keyboard |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| SIA message appear | New message | Bubble fades in from bottom (translateY 8→0, opacity 0→1) | 280ms (--dur-base) | ease-out-soft |
| User message send | Send tap | Text slides up from input into user bubble position, input clears | 280ms (--dur-base) | ease-out-soft |
| Rich card appear | After SIA message | Card fades in (opacity 0→1, translateY 12→0), staggered 120ms after the text message | 280ms (--dur-base) | ease-out-soft |
| Suggestion chips appear | After SIA message/card | Chips fade in staggered (80ms apart), slide in from left (translateX -12→0) | 280ms each (--dur-base) | ease-out-soft |
| Chip selection | Tap | Chip fills orange, scales down, content flies up to user message area | 280ms (--dur-base) | ease-out-soft |
| SIA thinking dots | Waiting | Three dots sequential pulse (opacity 30%→100%), staggered 200ms, loops | Continuous | ease-in-out |
| Send/mic crossfade | Text entered/cleared | Current button scales to 0, new button scales from 0. 160ms crossfade. | 160ms (--dur-fast) | ease-out-soft |
| Rich card skeleton | Loading | Gradient shimmer sweeps left→right across card | 1200ms loop | linear |
| Top bar blur | Scroll past 12pt | backdrop-blur fades in, bottom border opacity 0→5% | 160ms (--dur-fast) | ease-out-soft |
| Proactive message | SIA initiates | Bubble slides up from bottom with a slight bounce, attention-grabbing | 520ms (--dur-slow) | ease-flow |
| Auto-scroll | New message arrives | Chat area smooth-scrolls to bottom | 280ms (--dur-base) | ease-out-soft |
| Pull-to-load spinner | Pull down | Spinner fades in, rotates while loading | Continuous while loading | linear (rotation) |

**Screen transition**:
- **Enter (tab switch)**: Crossfade, 280ms (--dur-base)
- **Enter (from other screen)**: Stack pop (slide from left)
- **Exit to feature screen**: Stack push (slide from right), 280ms
- **Exit to full-screen voice**: Modal present (slide up from bottom), 520ms

---

## Empty States

### Day 1 (first use)
SIA initiates the conversation — the chat is never empty. On first visit after onboarding, SIA sends a proactive greeting:

1. "Welcome home, [Name]. Your plan is live."
2. "Here's what I'd focus on today."
3. [Rich inline card: Today's top 2-3 actions with domain tags]
4. [Suggestion chips: "sounds good", "show my goals", "let's adjust"]

The screen immediately feels alive and purposeful. No "start a conversation" empty placeholder.

### Returning user (no new messages)
The chat shows the most recent conversation. No empty state — the history is always present. If the user hasn't chatted in a while, SIA sends a proactive "welcome back" message when they open the tab:
- "Hey [Name]. It's been a few days. Want to catch up?"
- [Suggestion chips: "what did I miss?", "let's get back on track", "just browsing"]

### Offline
A banner appears below the top bar: "SIA needs a connection to chat." (14pt Sora Regular, white at 50%). Banner: full-width, 36pt, ink-brown-800 bg, centered text. Input bar disabled.

---

## Motivation Adaptation

- **Low motivation**: SIA sends shorter, gentler messages. Fewer suggestion chips (2-3 instead of 4-5). Rich cards show simple summaries, not detailed data. Tone: "One small thing today?" rather than a full action list.
- **Medium motivation**: Default experience. 3-5 suggestion chips. Mix of text and rich cards. Balanced coaching tone.
- **High motivation**: SIA includes more data in messages (percentages, trends). Rich cards are more detailed (charts with longer time ranges, more actions listed). Suggestion chips include data-oriented options ("show my stats", "compare this week"). Tone: direct and data-forward.

---

## Conversational Logging

Users can log activities conversationally without navigating to domain dashboards:
- "I did 30 min yoga" → SIA confirms logging to Fitness, shows brief XP earned toast
- "I spent $45 on lunch" → SIA logs to Finance, asks if it should be budgeted
- "I prayed 5 times today" → SIA logs to Spirituality, acknowledges the streak

SIA's confirmation appears as a standard SIA message with an inline "logged" badge (12pt, green, --r-sm corners, "✓ logged to [domain]" with domain color text).

---

## Cross-References

- **Navigates to**: Screen [10] — SIA Voice In-Chat via UI state change (mic tap), Screen [11] — SIA Voice Full-Screen (Batch 3) via modal present (mic long-press or voice icon tap), Screen [26-36] — Domain Dashboards via rich card taps (Batch 6-8), Screen [12] — Home Screen via Today tab, Screen [13] — Goals List via Goals tab, Screen [14] — Goal Detail via goal progress card tap
- **Navigates from**: Bottom tab bar (SIA tab), Screen [12] — Home Screen (SIA greeting card tap), any "Ask SIA" shortcut throughout the app
- **Shared components with**: Screen [07] — SIA Onboarding (SIA Message Bubble, User Message Bubble, Suggestion Chip Row, Chat Input Bar, SIA Avatar Small), Screen [10] — SIA Voice In-Chat (shares the chat view, only input area changes), Screen [12] — Home Screen (Batch 3, SIA Greeting Card adapted from SIA message pattern)
- **Patterns used**: SIA Message Bubble, User Message Bubble, Suggestion Chip Row, Chat Input Bar, SIA Avatar (Small), Domain Tag Chip, Bottom Tab Bar — all from Screen [07] and shared patterns
- **Patterns established**: **Rich Inline Card** — ink-brown-800 bg, --r-xl corners, white 8% border, embeds charts/progress/summaries within conversation flow, tappable for navigation. **Chat Input Bar with Mic** — extends Chat Input Bar with mic button (tap → voice mode, long-press → immersive voice), mic/send crossfade on text entry. **SIA Thinking Indicator** — 3 pulsing dots in a SIA bubble, sequential animation. **Day Separator** — centered date text with horizontal rules. **Proactive Message Entry** — SIA-initiated messages slide up with bounce, distinct from response messages. **Connection Spotted Variant** — SIA bubble with orange eyebrow header, indicates cross-domain insight. **Conversational Logging Confirmation** — green "logged" badge inline with SIA's confirmation.
