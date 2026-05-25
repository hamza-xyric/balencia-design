# Screen Design: Help Center

**Screen**: 25 of 43
**File**: 25-help-center.md
**Register**: Product Mode
**Primary action**: Ask SIA for help (tap "Ask SIA" card)
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root. Pushed from Me Main [17] quick link grid. Back button returns to Me Main.

---

## Purpose

The Help Center provides self-service support with SIA as the first line of defense. Instead of burying users in FAQ pages, the screen leads with "Ask SIA" — the AI coach can answer help questions conversationally, drawing on product knowledge the same way she draws on life data. Below that, traditional FAQ categories cover common questions for users who prefer browsing. Contact support exists at the bottom as a last resort. The hierarchy is deliberate: SIA first (fast, personalized), FAQs second (browsable, predictable), human support third (fallback).

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Search bar — instant access to find specific answers
2. "Ask SIA" card — the primary help path, visually prominent
3. FAQ categories — browsable help organized by topic
4. Expandable FAQ items — individual questions and answers within each category
5. Contact support — last-resort human support link

**User flow**:
- **Arrives from**: Me Main [17] via stack push (quick link grid)
- **Primary exit**: SIA Chat [09] via tab switch ("Ask SIA" tapped — opens SIA in help context)
- **Secondary exits**: Me Main [17] via stack pop (back button), external links (terms, privacy — in-app webview), support email/form (system mail or in-app form)

---

## Layout

**Scroll behavior**: ScrollView (FAQ content can be lengthy when expanded, easily exceeds viewport)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]      Help center       │  ← nav header, 44pt
├─────────────────────────────┤
│                             │  ← 16pt top padding
│  ┌───────────────────────┐  │
│  │ 🔍 Search help topics │  │  ← search bar, 48pt
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│  ┌───────────────────────┐  │
│  │  ●  Ask SIA            │  │  ← prominent card
│  │                        │  │     purple dot
│  │  Get instant answers   │  │
│  │  from your AI coach    │  │
│  │                        │  │
│  │           [Ask SIA →]  │  │  ← CTA button
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│  FAQ                        │  ← section header
│                             │
│  ┌───────────────────────┐  │
│  │ Getting started     › │  │  ← category row
│  ├───────────────────────┤  │
│  │ SIA & AI coach      › │  │
│  ├───────────────────────┤  │
│  │ Goals & tracking    › │  │
│  ├───────────────────────┤  │
│  │ Billing &            │  │
│  │ subscription        › │  │
│  ├───────────────────────┤  │
│  │ Privacy & data      › │  │
│  ├───────────────────────┤  │
│  │ Troubleshooting     › │  │
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│                             │
│  ┌───────────────────────┐  │
│  │  Still need help?     │  │  ← contact card
│  │  Reach out to our     │  │
│  │  support team         │  │
│  │                       │  │
│  │     [Contact support] │  │  ← ghost button
│  └───────────────────────┘  │
│                             │  ← 48pt bottom padding
├─────────────────────────────┤
│  Today   SIA   Goals   Me   │
└─────────────────────────────┘
```

#### Expanded FAQ Category View (after tapping a category)

When a category row is tapped, the screen pushes to a sub-screen showing that category's questions:

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]    Getting started     │  ← nav header with category name
├─────────────────────────────┤
│                             │
│  ┌───────────────────────┐  │
│  │ How do I set up       │  │  ← FAQ accordion item
│  │ my first goal?     [v]│  │     chevron rotates on expand
│  ├───────────────────────┤  │
│  │ What is SIA?       [›]│  │  ← collapsed
│  ├───────────────────────┤  │
│  │ How does the RPG   [›]│  │
│  │ system work?          │  │
│  ├───────────────────────┤  │
│  │ Can I use Balencia [›]│  │
│  │ without AI?           │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │  ← expanded answer
│  │ How do I set up       │  │
│  │ my first goal?     [^]│  │     chevron rotated up
│  │─────────────────────  │  │     1pt divider
│  │                       │  │
│  │ After onboarding,     │  │     answer text
│  │ tap the Goals tab     │  │     15pt Sora Regular
│  │ and select "add       │  │     white at 70%
│  │ goal." SIA will       │  │
│  │ help you break it     │  │
│  │ down into daily       │  │
│  │ actions...            │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  Today   SIA   Goals   Me   │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Header** — 44pt
   - Purpose: Screen identification and back navigation
   - Content: Back chevron (left), "Help center" title (center)

2. **Search Bar** — 48pt
   - Purpose: Quick keyword search across all FAQ content
   - Content: Search icon + placeholder text

3. **Ask SIA Card** — ~140pt
   - Purpose: Primary help path — routes user to SIA in help context
   - Content: Purple SIA dot, heading, description, CTA button

4. **FAQ Section** — variable height (~340pt collapsed, more when categories are pushed)
   - Purpose: Browsable help categories
   - Content: Section header + 6 category navigation rows

5. **Contact Support Card** — ~120pt
   - Purpose: Last-resort human support
   - Content: Description text, contact button

---

## Components

### Search Bar
- **Purpose**: Keyword search across all FAQ topics and answers
- **Data source**: Local FAQ content index (client-side search)
- **Visual treatment**: Reuses Text Input Field pattern from Batch 1, adapted: ink-brown-800 background, --r-md (14pt) radius, 1pt border white at 10%. Search icon (16pt, white at 40%) left-aligned, 12pt from left edge. Placeholder: "Search help topics" in 15pt Sora Regular, white at 40%. Height: 48pt (slightly shorter than auth inputs).
- **Variants**: Empty (placeholder visible), typing (text replaces placeholder, clear button appears right), results (search results replace FAQ categories below)
- **Gestures**: Tap to focus (keyboard appears), type to search, tap clear (×) to reset
- **Size**: Full-width minus 32pt (16pt margins) × 48pt

#### Search Results (replaces FAQ section when active)
- Results appear as a filtered list of FAQ items matching the query
- Each result: question text (15pt Sora Semibold, white) + category label (12pt Sora Regular, white at 40%) + answer preview (13pt Sora Regular, white at 50%, 1 line truncated)
- Tap result → expands answer inline or navigates to category sub-screen with item pre-expanded
- "No results" state: "No matches found. Try asking SIA instead." with small "Ask SIA" link (orange text)

### Ask SIA Card
- **Purpose**: The primary help path — encourages users to ask SIA directly
- **Data source**: Static
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt) radius, 1pt border white at 5%. Elevated feel with subtle warm shadow (--shadow-1). Internal layout is vertical stack.
- **Variants**: N/A (always the same)
- **Gestures**: Tap card body or CTA button → tab switch to SIA Chat [09] with help context
- **Size**: Full-width minus 32pt (16pt margins) × ~140pt

#### Ask SIA Card — Internal Layout
- **SIA indicator**: Purple dot (8pt, #7F24FF) + "Ask SIA" heading on the same line
  - Heading: 18pt Sora Semibold, white
  - Purple dot vertically centered with heading text, 8pt left of text
- **Description**: "Get instant answers from your AI coach. SIA knows Balencia inside and out." — 14pt Sora Regular, white at 60%. 8pt below heading. Max 2 lines.
- **CTA button**: Right-aligned at bottom of card, or full card width
  - "Ask SIA" — solid button: Burnt Orange (#FF5E00) fill, white text, --r-pill, 36pt height, 14pt Sora Semibold
  - Uses orange (standard CTA color) because this is a primary action. Purple identification is handled by the dot and heading placement.
  - Right arrow icon (12pt, white) trailing the text
- **Padding**: 24pt all sides

### FAQ Category Row
- **Purpose**: Navigation to a specific FAQ category's question list
- **Data source**: Static categories
- **Visual treatment**: Settings Row — Navigation pattern (from Settings [21]). Left label (15pt Sora Regular, white), right chevron (white at 30%, 12pt). Within Section Group Container.
- **Categories** (6 total):
  1. Getting started
  2. SIA & AI coach
  3. Goals & tracking
  4. Billing & subscription
  5. Privacy & data
  6. Troubleshooting
- **Variants**: N/A (all categories are always visible)
- **Gestures**: Tap → stack push to category sub-screen
- **Size**: Full-width × 52pt per row

### FAQ Category Sub-Screen
- **Purpose**: Shows all questions within a category, each expandable
- **Data source**: Static FAQ content
- **Visual treatment**: Standard stack-pushed screen with Navigation Header (category name as title). Content: Section Group Container with FAQ Accordion items.
- **Navigation**: Back button returns to Help Center main screen

### FAQ Accordion Item
- **Purpose**: Individual question/answer pair, expandable inline
- **Data source**: Static FAQ content
- **Visual treatment**: Within Section Group Container. Row with question text and expand/collapse chevron.
  - **Collapsed**: Question text (15pt Sora Semibold, white) left, chevron right (white at 30%, 12pt, pointing right). Row height: 56pt (taller than settings rows to accommodate 2-line questions). 16pt horizontal padding, vertically centered.
  - **Expanded**: Question text at top, 1pt divider (white at 5%) below question, answer text below divider.
    - Answer: 15pt Sora Regular, white at 70%. Padding: 16pt all sides below divider. Line height: 22pt.
    - Chevron rotates from right (›) to down (v) when expanded.
  - 1pt bottom divider between accordion items (within group).
- **Variants**: Collapsed, expanded
- **Gestures**: Tap question row → expand/collapse
- **Size**: Full-width × 56pt (collapsed), full-width × auto (expanded, depends on answer length)

### Contact Support Card
- **Purpose**: Last-resort path to human support
- **Data source**: Static (support email or form URL)
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt) radius, 1pt border white at 5%. Less prominent than Ask SIA card — no shadow, no special accent.
- **Variants**: N/A
- **Gestures**: Tap CTA → opens system mail composer or in-app support form
- **Size**: Full-width minus 32pt (16pt margins) × ~120pt

#### Contact Support Card — Internal Layout
- **Heading**: "Still need help?" — 16pt Sora Semibold, white
- **Description**: "Reach out to our support team and we'll get back to you within 24 hours." — 14pt Sora Regular, white at 50%. 8pt below heading.
- **CTA button**: "Contact support" — ghost button: transparent bg, 1pt border white at 10%, white text, --r-pill, 36pt height, 14pt Sora Semibold. Full card width minus padding.
- **Padding**: 24pt all sides

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | z-0 base |
| Card surfaces | #211008 | ink-brown-800 | z-10, Ask SIA card + FAQ groups + contact card |
| Card border | white at 5% | — | Subtle edge |
| Ask SIA card shadow | rgba(33,16,8,0.18) | --shadow-1 | Elevated feel |
| SIA dot | #7F24FF | purple | 10% role — SIA indicator |
| Ask SIA heading | white 100% | — | Primary text |
| Ask SIA description | white at 60% | — | Supporting text |
| Ask SIA CTA bg | #FF5E00 | burnt-orange | 60% role — primary action |
| Ask SIA CTA text | #FFFFFF | white | On orange bg |
| Ask SIA CTA arrow | #FFFFFF | white | Directional indicator |
| Search icon | white at 40% | — | Input affordance |
| Search placeholder | white at 40% | — | Hint text |
| Search text (active) | white 100% | — | User input |
| Search bar border (default) | white at 10% | — | Input edge |
| Search bar border (focused) | #FF5E00 | burnt-orange | 60% role — focus state |
| FAQ category text | white 100% | — | Row label |
| FAQ chevron | white at 30% | — | Navigation indicator |
| FAQ question text | white 100% | — | Semibold question |
| FAQ answer text | white at 70% | — | Regular answer body |
| FAQ divider | white at 5% | — | Question/answer separator |
| Section header | white at 50% | — | Eyebrow label |
| Contact heading | white 100% | — | Card heading |
| Contact description | white at 50% | — | Card body |
| Contact CTA border | white at 10% | — | Ghost button edge |
| Contact CTA text | white 100% | — | Button label |

**60/30/10 verification**: Orange appears on the search bar focus state and the Ask SIA CTA button — correct as the standard action color. Purple is limited to the SIA indicator dot (8pt, 1 element) — well within the "max 1-2 purple elements" guideline. Green does not appear on this screen. The screen is neutral-dominant (ink-900 + ink-brown-800 + white) with orange as the action accent.

---

## Interaction States

### Ask SIA Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, --shadow-1, SIA dot purple, CTA orange | — |
| Pressed | Background darkens, scale(0.98), shadow reduces | light impact |
| Focus-visible | 2pt orange ring (#FF5E00), offset 2pt | — |
| Disabled | N/A (always available) | — |
| Loading | N/A (tab switch is instant) | — |
| Error | N/A | — |
| Success | N/A | — |

### Ask SIA CTA Button (Orange Solid)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange (#FF5E00) fill, white text + arrow | — |
| Pressed | Darker orange (#E05500), scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Search Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt border white at 10%, placeholder text | — |
| Focused | 2pt border #FF5E00, placeholder fades, cursor appears | light impact |
| Typing | Text replaces placeholder, clear (×) button appears right | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always available) | — |
| Loading | Results loading: skeleton shimmer below search bar | — |
| Error | N/A (client-side search, no network error possible) | — |
| Success | N/A | — |

### FAQ Category Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white text, chevron at 30% | — |
| Pressed | Background darkens, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring inset | — |
| Disabled | N/A (always available) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### FAQ Accordion Item
| State | Visual | Haptic |
|-------|--------|--------|
| Default (collapsed) | Question text, right chevron (›) | — |
| Default (expanded) | Question text, down chevron (v), answer visible below divider | — |
| Pressed | Background darkens slightly, scale(0.99) on question row | light impact |
| Focus-visible | 2pt orange ring inset on question row | — |
| Disabled | N/A | — |
| Loading | N/A (static content) | — |
| Error | N/A | — |
| Success | N/A | — |

### Contact Support Button (Ghost)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, 1pt border white at 10%, white text | — |
| Pressed | Background white at 5%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | Text replaced with spinner (opening mail composer) | — |
| Error | "Could not open mail. Email us at support@balencia.com" inline text | error notification |
| Success | System mail or support form opens | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Ask SIA card or CTA | Tab switch to SIA Chat [09] with help context |
| Tap | Search bar | Focus search, keyboard appears |
| Tap | Clear (×) in search | Clear search text, return to default FAQ view |
| Tap | FAQ category row | Stack push to category sub-screen |
| Tap | FAQ accordion question | Expand/collapse answer |
| Tap | Contact support button | Open system mail or in-app support form |
| Swipe right from edge | Screen | Stack pop to Me Main [17] |
| Scroll | Content area | Vertical scroll |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Search bar | Screen enter | Fade-in (first element) | 280ms | ease-out-soft |
| Ask SIA card | Screen enter | Fade-in + translateY(8pt→0), 80ms after search | 280ms | ease-out-soft |
| FAQ section | Screen enter | Fade-in + translateY(8pt→0), 160ms after search | 280ms | ease-out-soft |
| Contact card | Screen enter | Fade-in + translateY(8pt→0), 240ms after search | 280ms | ease-out-soft |
| Accordion expand | Question tap | Height expand from 0 to auto, answer fades in, chevron rotates 90° (› → v) | 280ms height, 160ms fade, 160ms rotation | ease-out-soft |
| Accordion collapse | Question tap (expanded) | Height collapse to 0, answer fades out, chevron rotates -90° (v → ›) | 280ms height, 160ms fade, 160ms rotation | ease-out-soft |
| Search results | Search input | Results list fades in, replacing FAQ section | 280ms crossfade | ease-out-soft |
| Search clear | Clear tap | Results fade out, FAQ section fades back in | 280ms crossfade | ease-out-soft |
| Ask SIA card press | Touch down | Scale(0.98) + shadow reduce | 160ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right, 280ms, ease-out-soft
- **Exit**: Stack pop to right (back), 280ms, ease-out-soft
- **SIA navigate**: Tab switch crossfade (Ask SIA → SIA tab), 280ms, ease-out-soft

---

## Empty States

### Day 1 (new user)
Fully functional from day 1. All FAQ content is static and pre-populated. Ask SIA card is prominent and inviting. Search works immediately. No dynamic data to wait for. The screen is never empty.

### Established user (zero state)
N/A — Help Center is always fully populated. No variable content that could be absent.

### Search — no results
"No matches found" — centered in results area. 15pt Sora Regular, white at 50%. Below it: "Try asking SIA instead" — 14pt Sora Semibold, #7F24FF (purple), tappable (routes to SIA Chat [09] with the search query as context). This gracefully redirects failed searches to the primary help channel.

---

## Motivation Adaptation

- **Low motivation**: No changes — help content is utility, unaffected by motivation tier
- **Medium motivation**: Default experience
- **High motivation**: No changes — same help experience for all users

---

## Cross-References

- **Navigates to**: SIA Chat [09] via tab switch (Ask SIA card, with help context flag), Me Main [17] via stack pop (back button), FAQ category sub-screens via stack push, system mail composer or in-app support form (contact support), in-app webview (if any FAQ links to terms/privacy)
- **Navigates from**: Me Main [17] via stack push (quick link grid)
- **Shared components with**: Settings [21] (Navigation Header, Section Header, Section Group Container, Settings Row — Navigation for FAQ categories), Notification History [24] (Section Group Container)
- **Patterns used**: Back Button (Batch 1), Text Input Field (Batch 1 — adapted for search bar with search icon and shorter height), Section Header (Batch 5), Section Group Container (Batch 5), Settings Row — Navigation (Batch 5), SIA Note concept (Batch 5 — elevated to full card here)
- **Patterns established**: Ask SIA Card (with orange solid CTA — standard brand action color), FAQ Accordion Item (collapsed/expanded with chevron rotation), Search Bar with inline results (adapted Text Input), Contact Support Card (low-prominence ghost CTA), Search No-Results state (with SIA redirect), FAQ Category Sub-Screen (stack-pushed category detail)
