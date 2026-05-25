# Conversation UI Design

> The heart of Balencia — where users interact with their AI companion through natural conversation.

---

## Quick Reference

| Element | Specification |
|---------|---------------|
| **Primary Interaction** | Chat-based conversation |
| **Input Methods** | Text, Voice (equal weight), MCQ chips |
| **Message Alignment** | User: right, AI: left |
| **Bubble Max Width** | 80% of container |
| **Touch Targets** | 44px minimum |
| **Voice Recording** | Hold-to-record or tap-to-toggle |

---

## Design Philosophy

The conversation interface is the **primary way users interact with Balencia**. Unlike traditional health apps where dashboards dominate, Balencia puts dialogue first. Every interaction should feel like texting a supportive, knowledgeable friend.

### Core Principles

1. **Conversation is King**: The chat is the app, not a feature within the app
2. **Effortless Input**: MCQ chips for speed, expandable input for depth
3. **Voice as Equal Citizen**: Speaking is as natural and prominent as typing
4. **Contextual Intelligence**: AI questions adapt to time, mood, and recent activity
5. **Playful Feedback**: SIA reacts, celebrates, and expresses emotion

---

## Chat Bubble Design

### User Messages (Right-Aligned)

User messages appear on the right side of the screen with a distinct visual treatment.

```
┌─────────────────────────────────────────┐
│                                         │
│                    ┌──────────────────┐ │
│                    │ User message     │ │
│                    │ goes here        │ │
│                    └──────────────────┘ │
│                              12:34 PM ✓ │
└─────────────────────────────────────────┘
```

#### Specifications

| Property | Value |
|----------|-------|
| Background | `--primary` (#00BCD4) at 20% opacity |
| Border | 1px `--primary` at 40% opacity |
| Border Radius | 16px (top-left, top-right, bottom-left), 4px (bottom-right) |
| Padding | 12px 16px |
| Max Width | 80% of container |
| Text Color | `--foreground` (#FAFAFA) |
| Font Size | 16px |
| Line Height | 1.5 |
| Timestamp | 12px, `--muted-foreground`, right-aligned below |

#### Message Types

**Text Message**
```tsx
interface UserTextMessage {
  type: 'text';
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}
```

**Voice Message**
```tsx
interface UserVoiceMessage {
  type: 'voice';
  duration: number; // seconds
  waveform: number[]; // amplitude values for visualization
  transcription?: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}
```

**MCQ Response**
```tsx
interface UserMCQResponse {
  type: 'mcq';
  selectedOption: string;
  questionId: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}
```

---

### AI Messages (Left-Aligned)

AI messages appear on the left with SIA's avatar and expression matching the message tone.

```
┌─────────────────────────────────────────┐
│                                         │
│ ┌───┐ ┌────────────────────────┐        │
│ │🧙‍│ │ AI message goes here   │        │
│ └───┘ │ with SIA avatar       │        │
│       └────────────────────────┘        │
│       12:35 PM                          │
└─────────────────────────────────────────┘
```

#### Specifications

| Property | Value |
|----------|-------|
| Background | `--card` (#1E1E1E) |
| Border | 1px `--border` (#2A2A2A) |
| Border Radius | 4px (top-left), 16px (top-right, bottom-left, bottom-right) |
| Padding | 12px 16px |
| Max Width | 80% of container |
| Avatar Size | 32px |
| Avatar Gap | 8px from bubble |
| Text Color | `--foreground` (#FAFAFA) |
| Font Size | 16px |
| Line Height | 1.5 |

#### SIA Expression Matching

The avatar expression changes based on message content:

| Message Tone | SIA Expression | Example Content |
|--------------|-----------------|-----------------|
| Greeting | Happy | "Good morning! How are you feeling?" |
| Question | Curious | "What did you have for breakfast?" |
| Celebration | Celebratory | "Amazing! You hit your step goal!" |
| Support | Supportive | "That's okay, rest days matter too." |
| Insight | Thinking | "I noticed a pattern in your sleep..." |
| Alert | Concerned | "Your stress levels have been elevated." |

---

### Voice Message Bubbles

Voice messages have a special visual treatment with waveform visualization.

#### User Voice Message

```
┌─────────────────────────────────────────┐
│                                         │
│              ┌────────────────────────┐ │
│              │ ▶ ▁▃▅▇▅▃▁▃▅▇▅▃▁  0:12 │ │
│              └────────────────────────┘ │
│                              12:34 PM ✓ │
└─────────────────────────────────────────┘
```

#### Specifications

| Property | Value |
|----------|-------|
| Waveform Height | 24px |
| Waveform Bars | 20-30 bars, 3px width, 2px gap |
| Waveform Color (User) | `--primary` at 60% |
| Waveform Color (AI) | `--muted-foreground` |
| Play Button | 32px diameter |
| Duration Display | 12px, right of waveform |
| Playback Progress | Bars fill with `--primary` as audio plays |

#### States

| State | Visual |
|-------|--------|
| Default | Gray waveform, play icon |
| Playing | Animated progress, pause icon |
| Paused | Partial progress visible, play icon |
| Loading | Waveform pulses, loading spinner |

---

## MCQ Chips

MCQ (Multiple Choice Question) chips provide quick-tap responses for common interactions. They appear below AI questions.

### Layout

```
┌─────────────────────────────────────────┐
│ ┌───┐ ┌────────────────────────┐        │
│ │🧙‍│ │ How are you feeling    │        │
│ └───┘ │ this morning?          │        │
│       └────────────────────────┘        │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐  │
│  │ 😊 Great │ │ 😐 Okay  │ │ 😔 Low  │  │
│  └──────────┘ └──────────┘ └─────────┘  │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ✏️ Type something else...       │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Layout | Horizontal wrap (flexbox) |
| Chip Height | 44px (touch target) |
| Chip Padding | 12px 16px |
| Chip Gap | 8px |
| Border Radius | 22px (pill shape) |
| Background | `--card` (#1E1E1E) |
| Border | 1px `--border` (#2A2A2A) |
| Text | 14px, `--foreground` |
| Emoji Size | 18px, 4px gap from text |
| Max Width | 100% of container (chips wrap) |

### States

| State | Visual Change |
|-------|---------------|
| Default | Standard appearance |
| Hover | Border brightens to `--primary` at 50% |
| Pressed | Scale to 0.95, background `--primary` at 10% |
| Selected | Background `--primary` at 20%, border `--primary`, checkmark appears |
| Disabled | Opacity 50%, no interactions |

### Chip Types

#### Standard Chip
Simple text or emoji + text option.

```tsx
interface MCQChip {
  id: string;
  label: string;
  emoji?: string;
  value: string;
}
```

#### Expandable Chip
Special chip that expands into text or voice input.

```tsx
interface ExpandableChip {
  id: 'expand';
  label: 'Type something else...' | 'Say something else...';
  icon: 'pencil' | 'mic';
  expandTo: 'text' | 'voice';
}
```

### Selection Behavior

1. **Single Select**: User taps one chip, it highlights, message sends after 300ms delay (allows undo)
2. **Multi Select**: Chips toggle on/off, "Done" button appears when ≥1 selected
3. **Expand**: Tap expand chip to reveal full input field

---

## AI Question Card

The AI Question Card is a prominent component that appears when SIA has a specific question or check-in for the user. It's more visually emphasized than regular chat messages.

### Layout

```
┌─────────────────────────────────────────┐
│ ╭─────────────────────────────────────╮ │
│ │  ┌───┐                              │ │
│ │  │🧙‍│  SIA wants to know...        │ │
│ │  └───┘                              │ │
│ │                                     │ │
│ │  How did your morning workout       │ │
│ │  make you feel?                     │ │
│ │                                     │ │
│ │  ┌──────────┐ ┌──────────┐         │ │
│ │  │ 💪 Strong│ │ 😓 Tired │         │ │
│ │  └──────────┘ └──────────┘         │ │
│ │  ┌──────────┐ ┌──────────┐         │ │
│ │  │ 😊 Good  │ │ 😔 Meh   │         │ │
│ │  └──────────┘ └──────────┘         │ │
│ │                                     │ │
│ │  ┌─────────────────────────────┐   │ │
│ │  │ ✏️ Tell me more...          │   │ │
│ │  └─────────────────────────────┘   │ │
│ ╰─────────────────────────────────────╯ │
└─────────────────────────────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Background | Gradient from `--card` to `--primary` at 5% |
| Border | 1px `--primary` at 30% |
| Border Radius | 20px |
| Padding | 20px |
| Margin | 16px horizontal, 8px vertical |
| Shadow | 0 4px 20px rgba(0, 188, 212, 0.1) |
| Avatar Size | 48px |
| Header Text | 14px, `--muted-foreground` |
| Question Text | 18px, `--foreground`, font-weight 500 |

### Card Types

#### Mood Check-In
```tsx
interface MoodCheckInCard {
  type: 'mood_checkin';
  question: string;
  options: MCQChip[];
  pillar: 'wellbeing';
  context?: string; // e.g., "Based on your calendar"
}
```

#### Activity Log
```tsx
interface ActivityLogCard {
  type: 'activity_log';
  question: string;
  activityType: 'meal' | 'workout' | 'sleep' | 'habit';
  options: MCQChip[];
  pillar: 'fitness' | 'nutrition' | 'wellbeing';
}
```

#### Reflection Prompt
```tsx
interface ReflectionCard {
  type: 'reflection';
  question: string;
  expandDefault: boolean; // true = show text input by default
  voiceEncouraged: boolean;
  pillar: 'wellbeing';
}
```

#### Insight Share
```tsx
interface InsightCard {
  type: 'insight';
  insight: string;
  question: string; // follow-up question
  options: MCQChip[];
  dataPoint?: string; // e.g., "Your sleep was 2hrs less than usual"
}
```

### Pillar Color Coding

Question cards have a subtle pillar color accent:

| Pillar | Accent Color | Applied To |
|--------|--------------|------------|
| Fitness | `--fitness` (#FF9800) | Left border (3px), avatar glow |
| Nutrition | `--nutrition` (#4CAF50) | Left border (3px), avatar glow |
| Wellbeing | `--wellbeing` (#5C9CE6) | Left border (3px), avatar glow |
| General | `--primary` (#00BCD4) | Left border (3px), avatar glow |

---

## Input Bar

The input bar is fixed at the bottom of the conversation screen, providing equal access to text and voice input.

### Layout

```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │ Message SIA...              🎤  ➤  │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Height | 56px (container), 44px (input field) |
| Background | `--background` (#121212) |
| Border Top | 1px `--border` (#2A2A2A) |
| Padding | 6px 12px |
| Input Background | `--card` (#1E1E1E) |
| Input Border | 1px `--border` |
| Input Border Radius | 22px |
| Input Padding | 10px 16px |
| Placeholder | "Message SIA...", `--muted-foreground` |
| Mic Button | 44px, right side of input |
| Send Button | 44px, appears when text entered |

### States

#### Default State
```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │ Message SIA...              🎤     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```
- Mic button visible (primary action for voice)
- Placeholder text shown
- Tap anywhere to focus text input

#### Text Focus State
```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │ I went for a run this|       🎤  ➤  │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```
- Keyboard visible
- Cursor blinking
- Send button appears (replaces mic or alongside)
- Mic button remains for switching to voice

#### Voice Recording State
```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │  ● Recording...  0:05        ⬜  ➤  │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```
- Red recording indicator
- Timer counting up
- Stop button (square) replaces mic
- Send button to finish and send
- Cancel by tapping outside or swiping left

#### Voice Recording (Alternative: Hold-to-Record)
```
┌─────────────────────────────────────────┐
│                                         │
│        ┌─────────────────────┐          │
│        │  ● Recording 0:05   │          │
│        │  ▁▃▅▇▅▃▁▃▅▇▅▃▁      │          │
│        │  Release to send    │          │
│        │  Slide left to cancel│         │
│        └─────────────────────┘          │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │                              🎤     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```
- Expanded recording UI appears above input
- Real-time waveform visualization
- Release finger to send
- Slide left to cancel

### Voice Input Specifications

| Property | Value |
|----------|-------|
| Recording Indicator | Red dot, 8px, pulsing animation |
| Timer | 14px, `--foreground` |
| Waveform | Live amplitude visualization |
| Max Duration | 2 minutes |
| Min Duration | 0.5 seconds (shorter = cancel) |
| Cancel Zone | Slide 100px left |
| Haptic Feedback | On start, on send, on cancel |

---

## Typing Indicator

Shows when SIA is composing a response.

### Layout

```
┌─────────────────────────────────────────┐
│ ┌───┐ ┌────────────────┐                │
│ │🧙‍│ │  ● ● ●         │                │
│ └───┘ └────────────────┘                │
└─────────────────────────────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Dot Size | 8px |
| Dot Color | `--muted-foreground` |
| Dot Gap | 4px |
| Animation | Sequential bounce, 0.4s each, staggered 0.15s |
| Bubble Width | Auto (fits content + padding) |
| SIA Expression | Thinking |

### Animation

```css
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-8px); }
}

.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.15s; }
.typing-dot:nth-child(3) { animation-delay: 0.3s; }
```

---

## Message Grouping

Messages are grouped by time and context to improve readability.

### Time-Based Grouping

Messages within 2 minutes of each other from the same sender are grouped without repeated timestamps or avatars.

```
┌─────────────────────────────────────────┐
│ ┌───┐ ┌────────────────────────┐        │
│ │🧙‍│ │ First message          │        │
│ └───┘ └────────────────────────┘        │
│       ┌────────────────────────┐        │
│       │ Second message         │        │
│       └────────────────────────┘        │
│       ┌────────────────────────┐        │
│       │ Third message          │        │
│       └────────────────────────┘        │
│       9:15 AM                           │
└─────────────────────────────────────────┘
```

### Date Separators

When messages span different days, a date separator appears.

```
┌─────────────────────────────────────────┐
│            ─── Yesterday ───            │
│                                         │
│ Messages from yesterday...              │
│                                         │
│             ─── Today ───               │
│                                         │
│ Messages from today...                  │
└─────────────────────────────────────────┘
```

#### Specifications

| Property | Value |
|----------|-------|
| Separator Height | 32px |
| Text | 12px, `--muted-foreground`, uppercase |
| Line | 1px `--border`, extending to edges |
| Labels | "Today", "Yesterday", "Mon, Dec 16", etc. |

### Pillar Grouping

When viewing filtered by pillar, messages are grouped by topic/session.

```
┌─────────────────────────────────────────┐
│     ─── Morning Workout Check-in ───    │
│                                         │
│ Workout-related conversation...         │
│                                         │
│     ─── Evening Recovery ───            │
│                                         │
│ Recovery-related conversation...        │
└─────────────────────────────────────────┘
```

---

## Scroll Behavior

### Infinite Scroll (Load More)

Older messages load as user scrolls up.

| Behavior | Specification |
|----------|---------------|
| Trigger | Scroll to top threshold (100px) |
| Batch Size | 20 messages |
| Loading Indicator | Spinner at top |
| Scroll Position | Maintained after load |

### Scroll to Bottom

A floating button appears when user has scrolled up and new messages arrive.

```
┌─────────────────────────────────────────┐
│                                         │
│  ... older messages ...                 │
│                                         │
│                           ┌───────────┐ │
│                           │ ↓ New (2) │ │
│                           └───────────┘ │
└─────────────────────────────────────────┘
```

#### Specifications

| Property | Value |
|----------|-------|
| Button Position | Bottom-right, 16px from edges |
| Background | `--primary` |
| Border Radius | 20px |
| Padding | 8px 16px |
| Badge | Message count if > 0 |
| Animation | Fade in/out with slide |

### Auto-Scroll

- Auto-scroll to bottom when user sends a message
- Auto-scroll when new AI message arrives (if already at bottom)
- Do NOT auto-scroll if user has scrolled up to read history

---

## Pillar Filter

Users can filter the conversation to show only messages related to a specific pillar.

### Filter Bar

```
┌─────────────────────────────────────────┐
│  [All] [🔥 Fitness] [🌱 Nutrition] [☁️ Wellbeing]  │
└─────────────────────────────────────────┘
```

### Specifications

| Property | Value |
|----------|-------|
| Position | Below header, above conversation |
| Height | 48px |
| Background | `--background` with blur |
| Filter Style | Pill tabs, horizontal scroll if needed |
| Active Filter | Filled background with pillar color |
| Inactive Filter | Ghost style, `--muted-foreground` |

### Behavior

1. **All (Default)**: Shows complete conversation timeline
2. **Pillar Filter**: Shows only messages tagged with that pillar
3. **Transition**: Smooth fade between filter states
4. **Empty State**: "No [pillar] conversations yet" with encouraging message

### Message Tagging

Messages are automatically tagged by pillar based on content:

```tsx
interface Message {
  id: string;
  content: string;
  pillars: ('fitness' | 'nutrition' | 'wellbeing')[]; // can be multiple
  timestamp: Date;
  // ... other properties
}
```

---

## Empty States

### New User (No Messages)

```
┌─────────────────────────────────────────┐
│                                         │
│           ┌─────────────┐               │
│           │     🧙‍      │               │
│           │   (waving)   │               │
│           └─────────────┘               │
│                                         │
│         Hey there! I'm SIA.            │
│      Your AI life coach.          │
│                                         │
│   Let's start with a quick check-in.    │
│       How are you feeling today?        │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐  │
│  │ 😊 Great │ │ 😐 Okay  │ │ 😔 Low  │  │
│  └──────────┘ └──────────┘ └─────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Filtered Empty (No Pillar Messages)

```
┌─────────────────────────────────────────┐
│                                         │
│           ┌─────────────┐               │
│           │     🔥      │               │
│           │   (small)    │               │
│           └─────────────┘               │
│                                         │
│    No fitness conversations yet!        │
│                                         │
│   Ask me about workouts, activity,      │
│      or how your body is feeling.       │
│                                         │
│        ┌─────────────────────┐          │
│        │ 💬 Start a chat     │          │
│        └─────────────────────┘          │
│                                         │
└─────────────────────────────────────────┘
```

### Error State

```
┌─────────────────────────────────────────┐
│                                         │
│           ┌─────────────┐               │
│           │     🧙‍      │               │
│           │ (concerned)  │               │
│           └─────────────┘               │
│                                         │
│     Hmm, something went wrong.          │
│   I couldn't load our conversation.     │
│                                         │
│        ┌─────────────────────┐          │
│        │ 🔄 Try again        │          │
│        └─────────────────────┘          │
│                                         │
└─────────────────────────────────────────┘
```

---

## Accessibility

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color Contrast | 4.5:1 minimum for all text |
| Touch Targets | 44×44px minimum |
| Focus States | Visible focus ring on all interactive elements |
| Screen Reader | Proper ARIA labels for all elements |
| Reduced Motion | Respect prefers-reduced-motion |

### Voice Input Accessibility

- Visual feedback for recording state (not just audio)
- Transcription displayed for voice messages
- Alternative text input always available

### MCQ Chip Accessibility

```tsx
<button
  role="option"
  aria-selected={selected}
  aria-label={`${emoji} ${label}`}
>
  {emoji} {label}
</button>
```

---

## Responsive Behavior

### Mobile (Default)

Full conversation view as described above.

### Tablet (768px+)

- Conversation max-width: 600px, centered
- Larger touch targets not required (44px still used)
- Side padding increases

### Desktop (1024px+)

- Conversation in center panel
- Pillar creatures visible in sidebar
- Input bar can be wider

---

## Component Summary

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `ChatBubble` | Display message | `sender`, `content`, `timestamp`, `type` |
| `VoiceBubble` | Voice message display | `duration`, `waveform`, `status` |
| `MCQChips` | Quick response options | `options`, `onSelect`, `multiSelect` |
| `AIQuestionCard` | Prominent AI question | `question`, `options`, `pillar`, `type` |
| `InputBar` | Text/voice input | `onSend`, `onVoice`, `placeholder` |
| `TypingIndicator` | AI thinking state | `expression` |
| `PillarFilter` | Filter conversation | `activePillar`, `onChange` |
| `DateSeparator` | Group messages by date | `date` |
| `ScrollToBottom` | New message indicator | `count`, `onClick` |

---

## Implementation Notes

### State Management

```tsx
interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  isRecording: boolean;
  activePillar: 'all' | 'fitness' | 'nutrition' | 'wellbeing';
  hasMore: boolean; // for infinite scroll
  unreadCount: number;
}
```

### Message Flow

1. User taps MCQ chip or enters text/voice
2. User message appears immediately (optimistic UI)
3. Typing indicator shows
4. AI response streams in (if supported) or appears complete
5. New AI question card may appear based on context

### Performance

- Virtual scrolling for long conversations
- Image/media lazy loading
- Message batching for initial load
- Debounced scroll handlers

---

*Balencia Conversation UI Design v1.0 | Chat-First, Voice-Equal, Playfully Engaging*
