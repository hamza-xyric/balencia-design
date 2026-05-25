# Screen Design: SIA Onboarding Conversation

**Screen**: 07 of 43
**File**: 07-sia-onboarding-conversation.md
**Register**: Transitional (Brand Mode aesthetics, Product Mode chat functionality)
**Primary action**: Converse with SIA to set life goals
**Tab**: None (pre-main-app, onboarding flow)
**Navigation**: Stack push from Welcome/Sign Up [03] (after successful account creation). Linear flow forward to Initial Plan Summary [08]. Back button present with confirmation dialog — tapping navigates to Welcome/Sign Up [03] after user confirms.

---

## Purpose

This is the user's first encounter with SIA and the most critical emotional moment in the entire app. The screen must deliver the "it gets me" feeling within 60 seconds. SIA collects three things conversationally — name (already from sign-up), life areas of interest, and primary life goals — while a visual brainstorming area above the chat creates the "wow" factor. The hybrid design (visual top, chat bottom) makes onboarding feel like a creative collaboration, not a form. SIA asks 2-3 follow-up questions per goal to reach moderate depth. This screen establishes the foundational chat patterns (message bubbles, suggestion chips, input bar) reused in SIA Chat [09].

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Visual brainstorming area (top) — animated domain bubbles, goal examples, the "wow" factor
2. SIA's greeting message — the first words of the AI coach, warm and personal
3. Suggestion chips — easy response options, reduce friction
4. Chat input bar — text entry + send button
5. Subtle progress indicator — how far through onboarding (non-intrusive)

**User flow**:
- **Arrives from**: Welcome/Sign Up [03] via stack push (successful account creation triggers auto-navigation)
- **Primary exit**: Initial Plan Summary [08] via crossfade (SIA transitions the conversation: "Let me put together your plan...")
### Back/Exit Behavior

A back button (standard left chevron pattern) is present in the top-left corner throughout the onboarding conversation. Tapping it triggers a confirmation dialog:

**Leave Onboarding Dialog:**
- Presentation: Alert-style modal (centered, not bottom sheet)
- Title: "Leave setup?" (17pt Sora Semibold, white)
- Body: "Your progress won't be saved. You can start fresh anytime." (15pt Regular, white at 70%)
- Primary CTA: "Continue setup" (orange text, right-aligned) — dismisses dialog, returns to conversation
- Secondary: "Leave" (white at 50% text, left-aligned) — pops to Welcome/Sign Up [03]
- Backdrop: ink-900 at 60%, tap to dismiss (same as "continue setup")

**Conversation stages** (each stage updates the visual area above):
1. **Greeting**: SIA greets by name → visual area shows Balencia logo animation
2. **Domain discovery**: SIA asks "what areas of your life matter most?" → domain bubbles animate in the visual area, tappable
3. **Domain selection**: User taps bubbles or types → selected domains glow and cluster
4. **Goal setting**: SIA asks about specific goals per domain → goal example cards float in the visual area
5. **Follow-up**: SIA asks 2-3 follow-up questions per goal → visual area shows goal being structured
6. **Transition**: SIA says "let me build your plan" → loading animation → navigate to [08]

---

## Layout

**Scroll behavior**: Chat area: FlatList (inverted, auto-scrolls to latest message). Visual area: None (fixed, content animates within).
**Tab bar visible**: No

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                             │
│    ┌─────────────────────┐  │
│    │                     │  │
│    │  Visual Brainstorm  │  │  ← ~40% of safe area
│    │  Area               │  │     (~280pt on iPhone 15)
│    │                     │  │
│    │  [domain bubbles]   │  │  ← animated, tappable
│    │  [goal examples]    │  │
│    │                     │  │
│    └─────────────────────┘  │
│  ● ● ● ─ ─               │  ← progress dots, left-aligned
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤  ← subtle divider (1pt, white 5%)
│                             │
│  ┌─┐ ┌─────────────┐      │
│  │S│ │ SIA message  │      │  ← SIA bubble, left-aligned
│  └─┘ └─────────────┘      │  ← SIA avatar (24pt) beside
│                             │
│       ┌──────────────┐     │
│       │ User message  │     │  ← user bubble, right-aligned
│       └──────────────┘     │
│                             │
│  ┌─┐ ┌─────────────┐      │
│  │S│ │ SIA response │      │
│  └─┘ └─────────────┘      │
│                             │
│  ┌──────┐ ┌──────┐ ┌────┐ │  ← suggestion chips
│  │chip 1│ │chip 2│ │ +3 │ │
│  └──────┘ └──────┘ └────┘ │
│                             │  ← ~60% of safe area
├─────────────────────────────┤  ← chat area bottom
│  ┌─────────────────┐ ┌──┐ │
│  │ type a message   │ │➤ │ │  ← input bar + send button
│  └─────────────────┘ └──┘ │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Content: Light-content, transparent

2. **Visual Brainstorming Area** — ~280pt (flexible, ~40% of safe area height)
   - Purpose: The "wow" factor — animated visual content that updates based on conversation
   - Content: Starts with Balencia continuous stroke animation, then domain bubbles, then goal examples
   - Background: ink-900 with subtle --grad-hero-glow radial gradient

3. **Progress Indicator** — 24pt
   - Purpose: Show conversation progress without hard steps
   - Content: 5 dots (filled = completed, outlined = upcoming), left-aligned, 16pt from left edge

4. **Subtle Divider** — 1pt
   - Purpose: Separate visual area from chat
   - Content: Full-width, white at 5% opacity

5. **Chat Message Area** — flexible (~320pt, expands as messages grow)
   - Purpose: Conversational exchange with SIA
   - Content: FlatList of message bubbles (SIA left, user right) + suggestion chips

6. **Chat Input Bar** — 52pt + 8pt top padding = 60pt
   - Purpose: Text entry
   - Content: Text field + send button

7. **Home Indicator Zone** — 34pt

---

## Components

### Visual Brainstorming Area
- **Purpose**: Creates the "wow" moment — animated visual content that responds to the conversation below
- **Data source**: Driven by conversation state (which stage of onboarding)
- **Visual treatment**: ink-900 background with subtle orange radial glow (--grad-hero-glow at 30% opacity, centered). Content animates within this fixed container. No scroll.
- **Variants by stage**:
  - **Stage 1 (Greeting)**: Balencia continuous stroke animation draws itself in orange (--stroke-base, 4px). Fades to subtle background as domain bubbles prepare to enter.
  - **Stage 2 (Domain Discovery)**: 9 domain bubbles float in from edges, gently drifting. Each bubble: 56pt circle, domain color fill at 15% opacity, domain color border (1.5pt), domain icon (24pt, white) centered, domain name below (11pt Sora Semibold, white at 60%). Bubbles have subtle organic drift animation (slow random motion, 3-5pt range). Tapping a bubble selects it.
  - **Stage 3 (Domain Selected)**: Selected bubbles glow brighter (domain color at 30%, border at 100%), drift toward center and cluster together. Unselected bubbles fade to 8% opacity and drift to edges.
  - **Stage 4 (Goal Setting)**: Goal example cards (compact, 44pt tall) float in near the selected domain bubbles. Each card: domain color left border (3pt), white text "run a half marathon" or "save $5,000" (13pt Sora Regular), ink-brown-800 bg, --r-sm corners. Tappable — tapping adds the goal text to the chat input.
  - **Stage 5 (Follow-up)**: Goal cards show structured breakdown (actions forming as a mini-list within the card). Subtle animation of structure emerging.
  - **Stage 6 (Transition)**: All elements converge into center, morph into a loading animation (orange pulse ring), then screen transitions to [08].
- **Gestures**: Tap domain bubbles to select/deselect. Tap goal example cards to auto-fill chat input.
- **Size**: Full-width x ~280pt (flexible, minimum 240pt)
- **Accessibility note**: When device "Reduce Motion" is enabled, domain bubbles appear in a static grid layout (no floating drift animation). Goal example cards appear in a vertical list below domain grid instead of floating.

### Reduced Motion Alternative (Visual Brainstorming Area)

When `prefers-reduced-motion` is enabled, the visual brainstorming area adapts:

- Domain bubbles: arranged in a static 3×3 grid (no drift, no float). Grid has 12pt gaps, centered in the visual area.
- Selected bubbles: instead of drifting to center, they scale to 1.1x and gain a 2pt orange border (160ms crossfade). Unselected bubbles dim to 40% opacity.
- Goal example cards: appear in a vertical stack below selected bubbles (no float, no slide-from-side). Fade-in only (opacity 0→1, 160ms).
- Suggestion chips: appear instantly below chat input (no stagger, no translateY).
- The visual area still feels alive through opacity changes and subtle scale — just no continuous motion or translateY movement.

### Domain Bubble (in Visual Area)
- **Purpose**: Interactive domain selector within the visual brainstorming area
- **Data source**: Static 9 domains
- **Visual treatment**: 56pt diameter circle. Domain color fill at 15% opacity. Domain color border 1.5pt. Domain icon (24pt, white, centered). Domain name label below (11pt Sora Semibold, white at 60%, centered under bubble).
- **Variants**: Floating (unselected), Selected (brighter, clustered), Faded (not selected, receded)
- **Gestures**: Tap to select/deselect (same as tapping a suggestion chip — mirrors into chat)
- **Size**: 56x56pt bubble + 16pt label below = 56x72pt per unit

### Progress Indicator
- **Purpose**: Show how far through the onboarding conversation without creating pressure
- **Data source**: Conversation stage (1-5, with stage 6 being transition)
- **Visual treatment**: 5 small dots, left-aligned, 16pt from left edge, 12pt from top of divider area. Completed dots: 6pt diameter, Burnt Orange (#FF5E00) fill. Current dot: 8pt diameter, orange, subtle pulse glow. Upcoming dots: 6pt diameter, white at 20% outline only. Spacing between dots: 8pt.
- **Variants**: Each dot transitions from outline → filled as stages complete
- **Gestures**: None (display only)
- **Size**: ~80pt wide x 8pt tall (5 dots with spacing)
- **Enhanced variant**: For users who need more clarity, a horizontal progress bar (full-width minus 32pt, 4pt height, --r-pill, orange fill) replaces the dots. Text above: "step 2 of 4" (12pt Sora Regular, white at 40%). The bar variant is the default; dots are an option for minimal UI preference.

### SIA Message Bubble
- **Purpose**: Display SIA's messages in the conversation
- **Data source**: AI-generated conversation responses
- **Visual treatment**: Left-aligned, max-width 80% of chat area width. Background: ink-brown-800 (#211008) with 1pt border white at 8%. Border radius: 16pt top-left, 16pt top-right, 16pt bottom-right, 4pt bottom-left (chat bubble shape — small radius on the side nearest SIA avatar). Padding: 12pt horizontal, 10pt vertical. Text: 15pt Sora Regular, white. SIA avatar (24pt circle, orange bg, white "S" letterform or SIA icon, 12pt) positioned to the left of the bubble with 8pt gap.
- **Variants**: Text only, Text with domain tag chips (inline)
- **Gestures**: None (display only)
- **Size**: Max (screen width - 32pt margins - 32pt avatar area) x 0.8 = ~248pt max width. Height: auto based on content.

### SIA Avatar (Small)
- **Purpose**: Visual identity marker for SIA's messages
- **Data source**: Static asset
- **Visual treatment**: 24pt circle. Burnt Orange (#FF5E00) background. White Balencia symbol or "S" letterform centered (12pt). Subtle purple glow ring (--glow-purple at 20%, 1pt) — the only purple accent on this screen, marking SIA as the AI coach. Positioned to the left of SIA message bubbles, vertically aligned to the top of the first bubble in a consecutive SIA message group.
- **Variants**: Default, Thinking (pulsing animation during SIA response generation)
- **Gestures**: None
- **Size**: 24x24pt

### User Message Bubble
- **Purpose**: Display the user's messages in the conversation
- **Data source**: User input (typed or selected from suggestion chips)
- **Visual treatment**: Right-aligned, max-width 80% of chat area width. Background: Burnt Orange (#FF5E00) at 15% opacity. Border radius: 16pt top-left, 16pt top-right, 4pt bottom-right, 16pt bottom-left (small radius on user's side — right). Padding: 12pt horizontal, 10pt vertical. Text: 15pt Sora Regular, white. No avatar beside user messages.
- **Variants**: Text only
- **Gestures**: None (display only)
- **Size**: Max ~240pt width. Height: auto.

### Suggestion Chip Row
- **Purpose**: Quick-response options that reduce typing friction
- **Data source**: AI-generated based on conversation context
- **Visual treatment**: Horizontal ScrollView (scrolls if chips exceed screen width). Each chip: pill shape (--r-pill), 36pt height, 12pt horizontal padding. Background: ink-brown-800 (#211008), 1pt border Burnt Orange (#FF5E00) at 30%. Text: 14pt Sora Semibold, Burnt Orange (#FF5E00). Gap between chips: 8pt. Row positioned 8pt below the last SIA message bubble. Left-aligned to match SIA bubble alignment (after avatar area).
- **Variants per context**:
  - Domain chips: "fitness", "nutrition", "finance", "career", etc. (domain color border instead of orange)
  - Goal chips: "run a half marathon", "save $5,000", "read more books"
  - Follow-up chips: "yes", "tell me more", "let's adjust that"
  - Free text: "something else" (last chip, white 30% border, white 50% text)
- **Gestures**: Tap to select (sends as user message, chip row disappears)
- **Size**: Each chip: auto-width x 36pt. Row: full-width scroll x 36pt.

### Chat Input Bar
- **Purpose**: Text entry for conversational responses
- **Data source**: User input
- **Visual treatment**: Full-width - 32pt margins (16pt each side). Height: 44pt input + 8pt padding = 52pt total. Input field: ink-brown-800 bg, 1pt white 10% border, --r-pill corners (999pt). Placeholder: "type a message" (14pt Sora Regular, white at 30%). Text: 15pt Sora Regular, white. Padding: 16pt left, 48pt right (room for send button). Send button: 36pt circle, Burnt Orange (#FF5E00) bg, white arrow-up icon (16pt), positioned inside the right edge of the input field with 4pt spacing. Send button visible only when text is entered (fades in, 160ms).
- **Variants**: Empty (placeholder, no send button visible), Has text (send button appears), Disabled (during SIA response generation)
- **Gestures**: Tap to focus + raise keyboard, tap send to submit message
- **Size**: (screen width - 32pt) x 52pt

### Goal Example Card (in Visual Area)
- **Purpose**: Show tappable pre-built goal suggestions in the visual area
- **Data source**: Static goal examples per domain
- **Visual treatment**: Compact card: ink-brown-800 bg, --r-sm (10pt) corners, 3pt left border in relevant domain color. Height: 44pt. Padding: 10pt vertical, 12pt horizontal. Text: 13pt Sora Regular, white. Cards float near their associated domain bubble in the visual area. Slightly translucent (90% opacity) to feel like they're floating.
- **Variants**: Floating (ambient drift), Tapped (scales down, content copies to chat input, card glows briefly)
- **Gestures**: Tap to auto-fill the chat input with this goal text
- **Size**: ~180pt x 44pt

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| SIA message text | Sora | 400 (Regular) | 15pt | 22pt | White #FFFFFF | Conversational, warm |
| User message text | Sora | 400 (Regular) | 15pt | 22pt | White #FFFFFF | User's words |
| Suggestion chip | Sora | 600 (Semibold) | 14pt | 18pt | #FF5E00 | Orange for tappable action |
| Chat input placeholder | Sora | 400 (Regular) | 14pt | 18pt | White at 30% | "type a message" |
| Chat input text | Sora | 400 (Regular) | 15pt | 22pt | White #FFFFFF | User typing |
| Domain bubble label | Sora | 600 (Semibold) | 11pt | 14pt | White at 60% | Below domain circles |
| Goal example card | Sora | 400 (Regular) | 13pt | 18pt | White #FFFFFF | Goal text |
| Progress dots | — | — | — | — | — | Visual only, no text |

---

## Composition & Visual Hierarchy

**Squint test**:
- Visual brainstorming area is the dominant visual zone — colorful domain bubbles against dark background
- SIA messages are clearly distinct from user messages (left vs right, different bg tints)
- Suggestion chips draw attention with orange borders — the easiest interaction path
- Chat input bar is the clear "what to do" at the bottom of the screen
- Progress dots are subtle, nearly invisible — they inform without pressuring

**Spacing breakdown (8pt grid)**:
- Visual area bottom padding: 16pt (--s-4)
- Progress indicator height: 24pt
- Divider: 1pt
- Chat area top padding: 12pt (--s-3)
- Between consecutive SIA messages: 4pt (--s-1)
- Between SIA message group and suggestion chips: 8pt (--s-2)
- Between suggestion chip row and next SIA message: 16pt (--s-4)
- Between user message and SIA response: 16pt (--s-4)
- Chat area bottom to input bar: 8pt (--s-2)
- Input bar height: 52pt
- Input bar to home indicator: 0pt (sits directly above safe area)

**Z-layers**:
- z-0: ink-900 background
- z-10: Chat message bubbles, domain bubbles, goal example cards
- z-20: Suggestion chips (slightly elevated)
- z-30: Chat input bar (stays fixed at bottom)
- z-40: Keyboard overlay (when typing)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| Visual area glow | rgba(255,94,0,0.12) | brand-orange at 12% | Radial gradient, hero-glow style |
| Domain bubble fill | [domain color at 15%] | per domain | Subtle tint |
| Domain bubble border | [domain color] | per domain | Identity |
| Domain bubble icon | #FFFFFF | white | Clarity on colored bg |
| Domain bubble label | rgba(255,255,255,0.6) | white at 60% | Secondary |
| SIA bubble bg | #211008 | ink-brown-800 | Surface |
| SIA bubble border | rgba(255,255,255,0.08) | white at 8% | Very subtle |
| SIA avatar bg | #FF5E00 | brand-orange | SIA identity |
| SIA avatar glow | rgba(127,36,255,0.2) | brand-purple at 20% | AI indicator — **only purple on this screen** |
| User bubble bg | rgba(255,94,0,0.15) | brand-orange at 15% | User identity |
| Suggestion chip border | rgba(255,94,0,0.3) | brand-orange at 30% | Tappable indicator |
| Suggestion chip text | #FF5E00 | brand-orange | Action color |
| Input field bg | #211008 | ink-brown-800 | Surface |
| Input field border | rgba(255,255,255,0.1) | white at 10% | Subtle |
| Send button bg | #FF5E00 | brand-orange | Primary action |
| Send button icon | #FFFFFF | white | High contrast |
| Progress dot (completed) | #FF5E00 | brand-orange | Done |
| Progress dot (current) | #FF5E00 | brand-orange | Active, pulsing |
| Progress dot (upcoming) | rgba(255,255,255,0.2) | white at 20% | Pending |
| Divider | rgba(255,255,255,0.05) | white at 5% | Barely visible |

**60/30/10 verification**: Orange dominates — SIA avatar, user bubbles, suggestion chips, send button, input focus, progress dots. Domain colors appear on bubbles (identification). Purple appears on exactly 1 element (SIA avatar glow ring). No green on this screen. Ratio holds.

---

## Interaction States

### Domain Bubble (Visual Area)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (floating) | Domain color 15% fill, domain border, gentle drift animation | — |
| Pressed | Scale(0.9), fill brightens to 25% | Light impact |
| Selected | Fill 30%, border 100%, glow (domain --glow at 30%), drifts toward center | Medium impact |
| Faded (not selected, after others selected) | Fill 5%, border 30%, drift to edges, 50% opacity | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Suggestion Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, orange 30% border, orange text | — |
| Pressed | Scale(0.95), bg fills with orange at 10% | Light impact |
| Selected (sending) | Chip fills orange, text turns white, chip shrinks and flies to user message area (280ms) | Medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Chat Input Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default (empty) | Placeholder visible, no send button | — |
| Focused | 2pt orange border, keyboard rises, placeholder fades to 15% | Light impact |
| Has text | Send button fades in (160ms), placeholder hidden | — |
| Sending | Send button spins briefly, text moves up as user bubble | Light impact |
| Disabled (SIA thinking) | Input field at 60% opacity, placeholder changes to "SIA is thinking..." | — |

### Send Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (visible) | Orange circle, white arrow-up | — |
| Pressed | Scale(0.9), darker orange | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Goal Example Card (Visual Area)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (floating) | Subtle drift, 90% opacity | — |
| Pressed | Scale(0.95), opacity 100%, domain border brightens | Light impact |
| Selected | Scales down to 0.8, content text animates into chat input field (280ms), card fades out | Medium impact |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Domain bubble | Select/deselect life area (mirrors as chat message) |
| Tap | Goal example card | Auto-fill chat input with goal text |
| Tap | Suggestion chip | Send as user message |
| Tap | Chat input field | Focus + raise keyboard |
| Tap | Send button | Submit typed message |
| Tap | Outside input (keyboard up) | Dismiss keyboard |
| Scroll (vertical) | Chat area | Scroll through conversation history |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Continuous stroke | Screen mount | Orange line draws itself in visual area | 1200ms (--dur-flow) | ease-flow |
| Domain bubbles enter | Stage 2 | Bubbles float in from edges, staggered 120ms apart, opacity 0→1, scale 0.5→1 | 520ms per bubble (--dur-slow) | ease-flow |
| Domain bubble drift | Continuous | Slow random motion, 3-5pt range, looping | 4000ms loop | ease-in-out |
| Domain selection | Tap | Selected: scale pulse 1→1.1→1 + glow fade-in. Faded: others dim. | 280ms (--dur-base) | ease-out-soft |
| Goal cards enter | Stage 4 | Cards slide in from the side of their domain bubble, opacity 0→1 | 280ms, staggered 80ms | ease-out-soft |
| SIA message appear | New message | Bubble fades in from bottom (translateY 8pt→0, opacity 0→1) | 280ms (--dur-base) | ease-out-soft |
| SIA thinking dots | Waiting for response | Three dots pulse sequentially in SIA bubble (opacity 30%→100%, staggered 200ms) | Loops until response | ease-in-out |
| User message send | Send tap | Text animates up from input to user bubble position | 280ms (--dur-base) | ease-out-soft |
| Chip selection fly | Chip tap | Chip content flies to user message area, transforms into bubble | 280ms (--dur-base) | ease-out-soft |
| Progress dot fill | Stage completion | Dot scales 1→1.3→1, fill crossfades from outline to orange solid | 280ms (--dur-base) | ease-out-soft |
| Transition to [08] | Stage 6 | Visual area elements converge to center, morph to pulse ring. Chat area fades out. Screen crossfades to [08]. | 1200ms total (--dur-flow) | ease-flow |
| Fallback transition | AI timeout (>3s) | Chat area crossfades to card-based flow (520ms). Visual area transitions to static mode (bubbles stop drifting, settle into grid). | 520ms (--dur-slow) | ease-flow |

**Screen transition**:
- **Enter**: Crossfade from [03] Welcome/Sign Up (not a stack push — this is the start of a new flow after account creation). 520ms, ease-flow.
- **Exit**: Signature transition — visual convergence + crossfade to Initial Plan Summary [08]. 1200ms, ease-flow.

---

## Empty States

### Day 1 (new user)
This IS the day 1 experience — every user sees this screen exactly once, right after sign-up. The conversation starts immediately with SIA's greeting. The visual area begins with the continuous stroke animation, then domain bubbles float in. There is never an "empty" feeling because SIA initiates the conversation proactively.

**SIA's opening message sequence** (example):
1. "Hey [Name]. I'm SIA, your personal coach."
2. "Before we jump in — what areas of your life matter most to you right now?"
3. [Suggestion chips appear: "fitness", "nutrition", "finance", "career", "relationships", "spirituality", "learning", "creativity", "wellbeing", "something else"]
4. [Domain bubbles animate in visual area simultaneously]

**Cold-start loading state**: If SIA takes >1 second to respond after screen mount, show the Balencia continuous stroke animation drawing in the visual area (already specified in Stage 1) with a subtle text below: "SIA is getting ready..." (13pt Sora Regular, white at 30%, center-aligned, pulse animation). This sets the expectation that something is loading without feeling broken.

**Time expectation**: After SIA's first greeting, the second message includes: "This takes about 2 minutes — just a few questions to get you started." This reduces anxiety about an open-ended conversation.

### Established user (zero state)
N/A — this screen is seen once during onboarding and never revisited.

---

## Motivation Adaptation

Not yet established. SIA uses a warm, encouraging, moderate-depth approach for all users during onboarding. Motivation detection begins after ~1 week of app usage. The onboarding conversation defaults to medium engagement (2-3 follow-up questions per goal).

---

## Conversation Flow Detail

**Stage 1 — Greeting** (~15 seconds):
- SIA: "Hey [Name]. I'm SIA, your personal coach."
- SIA: "I'm here to help you see your whole life as one connected system — not separate apps for separate things."
- Visual area: Continuous stroke draws, fades to background

**Stage 2 — Domain discovery** (~30-60 seconds):
- SIA: "What areas of your life matter most to you right now?"
- Suggestion chips: All 9 domains + "something else"
- Visual area: Domain bubbles float in, tappable
- User selects 2-4 domains (via chips or bubble taps or typing)

**Stage 3 — Goal setting** (~1-2 minutes per domain):
- SIA: "Tell me about your [selected domain] goals. What are you working toward?"
- Goal example cards float in visual area near the selected domain
- User types or taps example cards
- SIA: "Got it. [follow-up question about timeline/specifics]"
- SIA: "[follow-up about what success looks like]"
- Repeat for each selected domain

**Stage 4 — Transition** (~15 seconds):
- SIA: "I love this. Let me put together a plan for you — give me a moment."
- Visual area: Elements converge, loading animation
- Auto-navigate to [08] Initial Plan Summary

**Total estimated time**: 2-5 minutes depending on number of domains and depth of responses.

---

## Fallback Onboarding Path

If SIA's initial response takes >3 seconds, or if the AI service is unavailable, the screen automatically transitions to a simplified step-by-step fallback. This ensures first-time retention isn't dependent on AI availability.

### Trigger Conditions
- SIA response latency >3 seconds after screen mount
- AI service returns an error or timeout
- User taps a "having trouble?" link (appears after 5 seconds of no SIA response)

### Fallback Flow (3 screens, same visual shell)
The visual brainstorming area remains but becomes non-interactive (decorative only). The chat area is replaced with a centered card-based flow:

**Step 1 — Domain Picker Grid:**
- Heading: "What areas matter most to you?" (20pt Sora Semibold, white, center-aligned)
- 3x3 grid of domain cards: 96pt squares, domain color fill at 15%, domain icon (32pt, white) centered, domain name below (13pt Sora Semibold, white at 70%)
- Multi-select: tapped cards get domain color border at 100% + checkmark badge (top-right, 20pt green circle, white check)
- "Continue" CTA appears after 2+ domains selected (Brand CTA Button, bottom)

**Step 2 — Goal Per Domain:**
- For each selected domain, a single card: "What's your top [domain] goal?" (17pt Sora Semibold)
- Pre-built goal suggestion chips (3-4 per domain) + free-text input
- One domain at a time, horizontal paging between domains
- Progress: "2 of 4 domains" indicator

**Step 3 — Confirmation:**
- "Here's your starting plan" summary card (same layout as Screen 08)
- SIA note (pre-written, not AI-generated): "I'll personalize this as I get to know you."
- "Let's go" CTA → navigate to Screen 08/12

### Fallback Navigation Flow

When the fallback path completes (user finishes 3-step visual selection):

1. System generates a minimal plan from the visual selections (no SIA processing needed — templated plans per domain combination)
2. User transitions to Initial Plan Summary [08] via crossfade (280ms)
3. [08] displays the templated plan with a note: "SIA will personalize this plan once connected"
4. SIA catches up asynchronously — when connection restores, SIA processes the visual selections and updates the plan on the Home Screen [12]
5. On next app open with connectivity, SIA's greeting references the initial selections: "I see you picked [domains]. Let me refine your plan."

Navigation stack: Fallback Step 3 → [08] Initial Plan Summary (same as normal flow). No special navigation handling needed.

### Transition Back to AI
If SIA becomes available during the fallback flow, do NOT interrupt. Complete the fallback flow, then SIA picks up the conversation on the Home Screen (12) with: "I see you chose [domains]. Let me dig deeper — what does [goal] look like for you?"

---

## Cross-References

- **Navigates to**: Screen [08] — Initial Plan Summary via crossfade (conversation completion)
- **Navigates from**: Screen [03] — Welcome/Sign Up via crossfade (successful account creation)
- **Shared components with**: Screen [09] — SIA Chat (SIA Message Bubble, User Message Bubble, Suggestion Chip Row, Chat Input Bar, SIA Avatar Small)
- **Patterns used**: Brand Symbol (from Batch 1), Continuous Stroke Line (from brand guidelines)
- **Patterns established**: **SIA Message Bubble** — left-aligned, ink-brown-800 bg, white 8% border, 16/16/16/4pt radius, 15pt Sora Regular white text, SIA avatar to the left. **User Message Bubble** — right-aligned, orange 15% bg, 16/16/4/16pt radius, 15pt Sora Regular white text. **Suggestion Chip Row** — horizontal scroll, pill chips, ink-brown-800 bg, orange 30% border, orange text, 36pt height, 8pt gaps. **Chat Input Bar** — full-width pill, ink-brown-800 bg, 44pt height, send button appears on text entry (36pt orange circle, white arrow). **SIA Avatar (Small)** — 24pt orange circle, white symbol, subtle purple glow ring, appears next to SIA message groups. **Domain Bubble (Interactive)** — 56pt circle, domain color tint, tappable for selection, animated drift. **Progress Indicator (Soft)** — 5 dots, left-aligned, orange filled/pulsing, white outline for upcoming.
