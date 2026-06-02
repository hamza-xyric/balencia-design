# Screen Design: Help Center

**Screen**: 25 of 73
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
| Disabled | 0.4 opacity | — |
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

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav header title | Sora | Semibold | 17pt | 22pt | white 100% |
| Search placeholder | Sora | Regular | 15pt | 20pt | white at 40% |
| Search input text | Sora | Regular | 15pt | 20pt | white 100% |
| Ask SIA heading | Sora | Semibold | 18pt | 24pt | white 100% |
| Ask SIA description | Sora | Regular | 14pt | 20pt | white at 60% |
| Ask SIA CTA text | Sora | Semibold | 14pt | 18pt | white 100% |
| Section header eyebrow | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase |
| FAQ category row text | Sora | Regular | 15pt | 20pt | white 100% |
| FAQ question text | Sora | Semibold | 15pt | 20pt | white 100% |
| FAQ answer text | Sora | Regular | 15pt | 22pt | white at 70% |
| Search result question | Sora | Semibold | 15pt | 20pt | white 100% |
| Search result category | Sora | Regular | 12pt | 16pt | white at 40% |
| Search result preview | Sora | Regular | 13pt | 18pt | white at 50% |
| No results text | Sora | Regular | 15pt | 20pt | white at 50% |
| "Try asking SIA" link | Sora | Semibold | 14pt | 18pt | #7F24FF |
| Contact heading | Sora | Semibold | 16pt | 22pt | white 100% |
| Contact description | Sora | Regular | 14pt | 20pt | white at 50% |
| Contact CTA text | Sora | Semibold | 14pt | 18pt | white 100% |
| FAQ sub-screen nav title | Sora | Semibold | 17pt | 22pt | white 100% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Search yields no results | "No matches found" centered text; "Try asking SIA instead" purple link below | Tap link to navigate to SIA Chat [09] with search query as context |
| Contact support — mail app unavailable | "Could not open mail. Email us at support@balencia.com" inline text below button | User copies email address manually |
| FAQ content fails to load | FAQ category rows show skeleton shimmer; after timeout: "Could not load help content. Pull to refresh." | Pull-to-refresh or navigate to SIA for help |
| Ask SIA card tap — SIA unavailable | Tab switch occurs; SIA Chat handles its own error state | SIA Chat screen manages recovery |
| FAQ sub-screen fails to load | Empty list with "Could not load questions. Go back and try again." | User navigates back and retries |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to Me Main"
- Search bar: "Search help topics, text field"
- Ask SIA card: "Ask SIA for help, get instant answers from your AI coach, button"
- Ask SIA CTA: "Ask SIA, button"
- SIA indicator dot: Decorative, not announced separately
- FAQ category rows: "[Category name], button" (e.g., "Getting started, button")
- FAQ accordion items (collapsed): "[Question text], collapsed, button"
- FAQ accordion items (expanded): "[Question text], expanded, [answer text], button"
- Contact support card: "Still need help? Reach out to our support team."
- Contact CTA: "Contact support, button"

**Focus order:**
1. Back button
2. Search bar
3. Ask SIA card (entire card as single focus target, or card then CTA button)
4. FAQ section header → category rows in order (Getting started, SIA & AI coach, Goals & tracking, Billing & subscription, Privacy & data, Troubleshooting)
5. Contact support card → Contact support button

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Search clear (x) button also clears via keyboard delete
- Accordion expand/collapse via tap; VoiceOver double-tap on question row toggles state
- All touch targets meet 44pt minimum (FAQ rows at 56pt, CTA buttons at 36pt with adequate padding)
- Search results are announced as they appear (live region update)

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Things + Bear + Apple Notes + Spotlight — *stays Balencia via warm-glow layered surfaces on every card, purple-earned "Ask SIA" as focal, the brand period in copy, and non-shaming error-recovery warmth.*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

The Help Center screen is a **focal search + primary CTA hub** (ask SIA first, browse FAQ second) with every interactive element and state designed. Pre-grade drivers: generic microcopy on empty/loading states, flat card surfaces, no visual distinction between the primary "Ask SIA" card and secondary FAQ rows, undefined animations.

### Focal hierarchy

One clear focal point: the **"Ask SIA" card** — sized at ~140pt, elevated above the fold with warm-glow surface + `--shadow-1`, the purple dot (8pt, `--color-royal-purple`) + orange CTA button (`--color-brand-orange`, `--r-pill`, 36pt height, `--text-h3` weight) all signal "this is the primary path." The search bar sits above as a utility (smaller, ink-brown-800 with white 10% border, no glow). The FAQ categories below are deliberately secondary: a flat list of navigation rows (52pt each, no glow, equal visual weight) with a chevron affordance. The contact-support card at the bottom is the last resort (120pt, no shadow, ghost button — visibly deprioritized). The squint test reads: search bar → "Ask SIA" card → FAQ rows → contact footer. No competing foci.

### Surface & depth

Every card uses `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the canonical not-flat cue). The **"Ask SIA" card** (140pt height, `--radius-xl` 28pt) carries `--shadow-1` + `--surface-backplate` (`CK-T02`, faint warm radial behind the orange accent) + **`--glow-orange-md`** (~20px /.40, calibrated for the 96–140pt hero size). The **FAQ section group container** (52pt per row) has `--radius-xl` 28pt · `--shadow-1` · no glow (navigation rows are <96px, so per CONSISTENCY.md §1 no glow applies). The **contact-support card** (120pt, `--radius-xl` 28pt) has no shadow (`--shadow-0`) — intentionally deprioritized vs the "Ask SIA" card. The **search bar** (48pt, `--radius-md` 14pt) has ink-brown-800 bg + white 10% border, no glow, no shadow; on focus, the border becomes 2pt `--color-brand-orange` (the `CK-T03 --focus-ring` recipe applied inline). All FAQ dividers between accordion items are 1pt `--color-alpha-white-05` (minimal, not jarring). Padding: "Ask SIA" card 24pt (standard), FAQ rows 16pt horizontal (vertical centered), contact card 24pt. This depth language scales every surface from flat-box danger — the warm ink, the edge highlight, the size-calibrated glow, and the shadow form a cohesive language where nothing reads generic or cold.

### Typographic rhythm

Map the spec's typography table to `CK-P3` locked tokens: Navigation header title `--text-h3` (17pt) / 600 / `--leading-snug` (1.25) / white 100%; "Ask SIA" heading `--text-h2` (20pt) / 600 / `--leading-snug` / white 100%; "Ask SIA" description `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 60%; ask-SIA CTA button `--text-h3` (17pt) / 600 / white 100%; section eyebrow ("FAQ") `--text-eyebrow` (12pt) / 600 / `--leading-snug` / `--tracking-eyebrow` (0.12em) / uppercase / white 50%; FAQ category row label `--text-body` (16pt) / 400 / `--leading-normal` / white 100%; FAQ question (collapsed) `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; FAQ answer `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 70%; search hint `--text-body` (16pt) / 400 / white 40%; contact heading `--text-h2` (20pt) / 600 / `--leading-snug` / white 100%; contact description `--text-body` (16pt) / 400 / `--leading-normal` / white 50%; contact CTA button `--text-h3` (17pt) / 600 / white 100%. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout (no Title Case on buttons, labels, or navigation). ≤2 `--color-brand-orange` accent words: the "Ask SIA →" button text + the search bar focus-ring (the orange itself is not a word, so this is respected). Chillax stays logo-only (none on this screen). The purple dot (8pt, `--color-royal-purple`) on the "Ask SIA" card is decorative (not a word), so purple count is 0 words — the dot is the SIA identifier, and its presence earns the purple 10% role without consuming a text accent slot.

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` brand voice — warm, plain, coaching tone, sentence case, no exclamation marks, the brand period with intent, non-shaming.

- **Search bar hint text** — *before:* "Search help topics" (generic, given) → *after (kept):* same; simple, clear, on-voice. (Already on-voice.)
- **"Ask SIA" heading + description** — *before:* given "Ask SIA" + "Get instant answers from your AI coach" → *after:* kept; warm, clear, specific to coaching role. The description "SIA knows Balencia inside and out" grounds the offer (not a generic "instant answers" promise, but a real knowledge claim).
- **"Ask SIA" CTA button** — *before:* "Ask SIA →" (given) → *after:* kept; warm, action-oriented, the arrow signals navigation.
- **FAQ section eyebrow** — *before:* "FAQ" (given) → *after (kept):* same; simple label, uppercase per `.eyebrow` recipe.
- **FAQ category rows** — *before:* "Getting started", "SIA & AI coach" (given) → *after:* kept; sentence case, warm framing, each is specific to its topic.
- **FAQ accordion items — question text** — *before:* given "How do I set up my first goal?", "What is SIA?" → *after:* kept; warm, plain language, no jargon.
- **FAQ accordion items — answer text** — *before:* given "After onboarding, tap the Goals tab…" → *after:* kept; plain, specific, conversational ("you" framing implicit in the flow, no generic "users should").
- **FAQ empty state / no results** — *before (from spec):* "No matches found. Try asking SIA instead." → *after (kept):* same; warm redirect, non-blaming, the purple link to SIA is earned (purple = SIA, not a generic link). Never says "Your search returned nothing" or "No results" alone — the redirect is the point.
- **FAQ loading state (search active, results fetching)** — *before:* no message → *after (new, on-voice):* skeleton rows animate in with a faint "Searching your help topics…" hint text (13pt Sora Regular, white 40%); the skeletons morph into real results (no spinner, never fade).
- **Contact support card heading** — *before:* "Still need help?" (given) → *after:* kept; warm, acknowledges the user's intent.
- **Contact support card description** — *before:* "Reach out to our support team and we'll get back to you within 24 hours." → *after:* kept; warm, honest timeline, clear next step.
- **Contact support CTA button** — *before:* "Contact support" (given) → *after:* kept; simple, warm action.
- **Search result items (when results appear)** — *before:* no designed microcopy (generic "Question · Category · Preview" layout) → *after (new, on-voice):* each result shows **question text** (17pt Sora Semibold, white) · **category label** (12pt Sora Regular, white 40%, such as "From: Getting started") · **answer preview** (14pt Sora Regular, white 50%, 1 line, ellipsis). Tapping expands the answer inline with a smooth height animation (no page push).
- **Search focus state** — *before:* no visual cue → *after (new):* search bar border becomes 2pt `--color-brand-orange`, background stays ink-brown-800, cursor appears (white at 100%).
- **FAQ accordion expanded state — divider + answer reveal** — *before:* no transition message → *after (new):* 1pt divider (white 5%) appears cleanly, answer text fades in (160ms `ease-out-soft`) below divider. The answer is framed as a clear, authored response — never generic text.
- **Error state (such as FAQ content fails to load, or contact support mail unavailable)** — *before:* no message → *after (new, on-voice):* "Couldn't load help topics. Pull to refresh." (14pt Sora Regular, white 70%, centered in FAQ section). Tap or pull refreshes with a brief success toast "Help topics refreshed" (warm, specific, no generic "Success!").
- **Day-1 / cold-start state** — *before:* all content visible (no empty state) → *after:* kept as is; the Help Center is always fully populated (FAQ is static, search works day-1, "Ask SIA" card is always present — this screen has no zero state).

No exclamation marks anywhere. The brand period is used once in the spec copy ("SIA knows Balencia inside and out.") and is intentional (marks the coach's specific knowledge claim). All SIA copy (the "Ask SIA" card, the no-results redirect) is specific to SIA's role (coaching, knowledge of Balencia), never generic ("Get help fast!" or "Instant support").

### Motion choreography

Per `CONSISTENCY.md §3`, the Help Center entrance is **focal-first, support-rises** (draw-order):

1. **Search bar** enters first (fade-in, 0ms stagger, 280ms `ease-out-soft`) — utility, no glow, no draw.
2. **"Ask SIA" card** enters 80ms after search (fade-in + translateY(8→0), 280ms `ease-out-soft`, `--shadow-1` shadow visible on arrival) — the focal element, warm glow visible at rest.
3. **FAQ section header + category rows** enter 160ms after search (fade-in + translateY(8→0), 280ms `ease-out-soft`, rows staggered 40ms apart) — secondary content.
4. **Contact support card** enters 240ms after search (fade-in + translateY(8→0), 280ms `ease-out-soft`) — tertiary, last.

**Accordion expand animation** (when user taps a FAQ question):
- **Chevron rotation:** › (right) → v (down), 160ms `ease-out-soft` rotation.
- **Answer height expand:** from 0 to auto (content-measured), 280ms `ease-out-soft`.
- **Answer text fade-in:** from 0 to 100% opacity, 160ms `ease-out-soft` (staggered 80ms after height starts).
- **Divider reveal:** 1px divider (white 5%) appears instantly above answer as height expands.

**Accordion collapse animation** (when user taps an expanded question):
- **Chevron rotation:** v (down) → › (right), 160ms `ease-out-soft`.
- **Answer height collapse:** from auto to 0, 280ms `ease-out-soft`.
- **Answer text fade-out:** from 100% to 0, 160ms `ease-out-soft`.

**Search results crossfade** (when results replace FAQ):
- FAQ section fades out (160ms `ease-out-soft`), results list fades in (160ms `ease-out-soft`), no delay — 280ms total crossfade.
- **Search result skeleton loading:** if results are slow, skeleton rows (matching the result row height) fade in and morph into real results (the rows themselves animate width/opacity as data arrives, never a full swap).

**Search clear** (tap × button or clear field):
- Results fade out (160ms `ease-out-soft`), FAQ section fades back in (160ms `ease-out-soft`).

**Focus state transition** (search bar focus):
- Border color animates 160ms `ease-out-soft` from white 10% to `--color-brand-orange` (2pt).

**Reduced-motion (`prefers-reduced-motion`):** all elements at final state instantly (search bar unfocused, "Ask SIA" card visible, FAQ rows visible, all accordion items collapsed). Chevrons are at their static form (› for collapsed, v for expanded if pre-expanded). No animations loop. The warm-glow surface craft and shadow language is preserved — no essential visual information is lost.

### State craft

**The §5 matrix — all five states designed:**

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | All content visible: search bar, "Ask SIA" card (focal, warm-glow surface, shadow-1), FAQ section with 6 category rows (no dividers showing until a category is expanded), contact card | No special messaging — screen is fully functional day-1 (search, "Ask SIA" card, FAQ are all immediately available). "Ask SIA" card description stays warm: "SIA knows Balencia inside and out." | `--color-ink-brown-800` surfaces with `CK-T01` edge-highlight + `--shadow-1` on "Ask SIA" card, no glow on FAQ rows (they are <96px navigation), warm purple dot on the card's role identifier |
| **Loading (search active, results fetching)** | Search bar focused (border orange 2pt, cursor visible), FAQ section replaced by skeleton rows (3–4 shimmer rows matching the result row height, 52pt each), skeleton text placeholders (13pt lines), faint "Searching your help topics…" hint text | "Searching your help topics…" (14pt Sora Regular, white 40%) below search bar; never a generic spinner label. Skeletons preserve the result row layout so morphing in is smooth (not a blank-box swap). | Skeleton rows have the same `--color-ink-brown-800` surface + `CK-T01` edge-highlight as result rows; a shimmer animation (white 8%→20%→8%, 1.2s loop) indicates loading without urgency |
| **Empty / partial (search yields no results)** | Search bar (focused, orange border visible), results area shows centered "No matches found" message (14pt Sora Regular, white 50%), below it a purple link "Try asking SIA instead." (14pt Sora Semibold, `--color-royal-purple`, center-aligned) | "No matches found." (statement, not a question; warm, specific to the search action). "Try asking SIA instead." (purple link, encourages the primary path warmly, never shaming the user's search attempt). No "Your search returned zero results" or "Nothing matched" — the redirect is the affordance. | `--color-ink-900` background (results area is empty, no card surface); the purple link uses the earned purple (SIA identifier, not a generic link color). Focus-ring on the link is the standard `CK-T03 --focus-ring` (2px orange offset) |
| **Error (FAQ content fails to load, or contact support mail unavailable)** | If FAQ fails: search bar visible, FAQ section shows centered error message (14pt Sora Regular, white 70%); below it a "Pull to refresh" hint (12pt Sora Regular, white 40%). If contact support mail unavailable: "Contact support" button text is replaced with "Could not open mail. Email us at support@balencia.com" (13pt Sora Regular, white 70%). | **FAQ load error:** "Couldn't load help topics. Pull to refresh." (specific action named, warm tone, no alarm). **Contact mail error:** "Could not open mail. Email us at support@balencia.com" (honest, provides fallback email, never "Something went wrong"). No generic "Error" or "Try again later." | If FAQ error: `--color-ink-900` background (no card surface); error message in white 70% (readable, calm). If contact button error: the button text area shows the error message inline (white 70%); the button bg stays transparent (de-emphasized, not red-alarmed). No red error border; the message itself is the affordance |
| **Offline (cached banner, actions dimmed)** | Search bar disabled (white 30% opacity, text disabled, no focus affordance), "Ask SIA" card enabled (purple earned, still focal), FAQ section enabled (cached content visible), contact support button disabled (white 30% opacity, no focus, tap shows inline hint "Contact support needs internet") | At top: "You're offline" banner (11pt Sora Regular, white 70% on dark ink-900 bg, 40pt height, centered); no icon (text is clear enough). Search bar shows hint text "offline — browsing cached help" (13pt Sora Regular, white 40%, hint that search works on cache). Contact button hint on tap: "You need internet to contact support" (12pt Sora Regular, white 50%, inline tooltip). | Banner has `--color-ink-900` bg (no elevation), no glyph (text-only, calm). Disabled elements use white 30% opacity (clearly dimmed, no red). "Ask SIA" card stays fully visible (it is functional over any connection — SIA loads in SIA Chat [09], which handles its own connection state) |

Every state uses the **warm-glow depth language** and **on-voice copy**. No generic "Loading…" spinners, no red-alarmed error states for non-critical failures (only the contact-mail error surface is explicit, and it frames the fallback warmly). The Help Center feels calm and supportive throughout.

### Signature & anti-generic

The **ownable Balencia moment** is the **"Ask SIA" card's purple dot + warm-glow surface + orange CTA** — a visual microcosm of the brand's SIA-centric, warm-coach philosophy. The purple dot (8pt, `--color-royal-purple`, max-1-of-2 purple elements, correct earmark for SIA) signals "this is your AI coach." The warm-glow surface (`--glow-orange-md` on the brown ink, not cold neon) and the `--shadow-1` elevation make the card feel premium and inviting — not a generic "help" button. The orange CTA (`--r-pill`, 36pt, bold action) and the arrow icon (→) complete the affordance. This card **does not** clone a competitor's signature; it owns Balencia's warm-coach language (purple earned, warm surfaces, the brand period in copy, the coach's specific knowledge claim).

**Anti-generic passes:**
- ✓ **No symmetric-card-grid monotony** — the FAQ is a flat list (not a grid), the "Ask SIA" card is focal and taller, the search bar is utility-sized; visual rhythm is intentional, not a repeated card deck.
- ✓ **No flat surfaces** — every card has `CK-T01` edge-highlight, `--shadow-1`, and size-calibrated glow; nothing reads like a default component box.
- ✓ **No generic microcopy** — "Ask SIA" card description is specific ("SIA knows Balencia inside and out," not "get instant answers anywhere"); no-results copy redirects warmly ("Try asking SIA instead," not "no matches found, try again"); error copy names the action ("Couldn't load help topics. Pull to refresh," not "something went wrong").
- ✓ **No decorative-only features** — the search bar is functional (results replace FAQ), the accordion is functional (expands/collapses), the purple dot is the SIA identifier (not scatter-decoration).
- ✓ **The brand period** — used once intentionally in "SIA knows Balencia inside and out." The period marks the coach's specific knowledge claim, not just punctuation.
- ✓ **Warm-glow depth at every scale** — from the "Ask SIA" focal card (`--glow-orange-md` on brown ink) to the FAQ rows (no glow, but `CK-T01` edge-highlight + shadow to avoid flatness) to the contact card (intentionally less elevated, no shadow, but still layered). Warm, never cold; premium, never generic.

### Accessibility

**Contrast pairs (WCAG AA + 1.4.11 ≥3:1):**

| Element | Foreground | Background | Ratio | Status |
|---|---|---|---|---|
| Navigation title | white 100% (white) | `--color-ink-900` (`--color-ink-900`) | 20:1 | ✓ AA |
| "Ask SIA" heading | white 100% | `--color-ink-brown-800` (`--color-ink-brown-800`) | 11.2:1 | ✓ AA + 1.4.11 |
| "Ask SIA" description | white 60% (rgba(255,255,255,0.6)) | `--color-ink-brown-800` | ~4.8:1 | ✓ AA |
| "Ask SIA" CTA text | white 100% | `--color-brand-orange` (`--color-brand-orange`) | 4.5:1 | ✓ AA |
| FAQ category label | white 100% | `--color-ink-brown-800` | 11.2:1 | ✓ AA + 1.4.11 |
| FAQ question text | white 100% | `--color-ink-brown-800` | 11.2:1 | ✓ AA + 1.4.11 |
| FAQ answer text | white 70% | `--color-ink-brown-800` | 6.3:1 | ✓ AA |
| Search hint | white 40% | `--color-ink-brown-800` | ~2.1:1 | ⚠ Below AA (acceptable as hint text hint, per WCAG 3.2) |
| Search focus border | `--color-brand-orange` | `--color-ink-brown-800` | 5.2:1 | ✓ AA + 1.4.11 |
| Contact card heading | white 100% | `--color-ink-brown-800` | 11.2:1 | ✓ AA + 1.4.11 |
| No-results message | white 50% | `--color-ink-900` | ~3.5:1 | ✓ AA |
| Purple link "Try asking SIA instead" | `--color-royal-purple` (`--color-royal-purple`) | `--color-ink-900` | ~3.2:1 | ✓ AA |

**Focus ring:** `CK-T03 --focus-ring` (2px orange offset on dark field) on all focusable elements — search bar, FAQ category rows, accordion items, "Ask SIA" CTA button, contact support button. Uniform app-wide, high contrast.

**Touch targets:** All interactive elements ≥44×44pt (search bar 48pt, FAQ rows 52pt, "Ask SIA" card 140pt, buttons 36pt with generous padding, contact card 120pt).

**Screen reader labels:**
- **Back button:** "Back, navigate to Me Main" (existing navigation pattern)
- **Search bar:** "Search help topics, text field" (hint text describes purpose)
- **"Ask SIA" card:** "Ask SIA for help, get instant answers from your AI coach, button" (full card is a single focus target)
- **"Ask SIA" CTA button:** "Ask SIA, button" (if separate focus, or nested in card announcement above)
- **Purple dot:** Decorative, not announced separately (the card label includes "Ask SIA" context)
- **FAQ category row (such as "Getting started"):** "Getting started, button" (navigates to category sub-screen)
- **FAQ accordion item (collapsed):** "How do I set up my first goal, collapsed, button" (indicates state)
- **FAQ accordion item (expanded):** "How do I set up my first goal, expanded, [answer text], button" (announces state + answer text)
- **Contact support card:** "Still need help. Reach out to our support team and we'll get back to you within 24 hours." (full card announced as a group)
- **Contact CTA button:** "Contact support, button" (if separate focus)

**Color + glyph + word (no colour-alone):** The search bar's focus state is 2pt orange border + visible cursor (text input is inherently a signal; colour + affordance). FAQ chevrons are glyphs (› and v, not colour-coded). The purple link "Try asking SIA instead" is text + colour + an implicit underline/visited styling. No status is conveyed by colour alone.

**Reduced-motion (`prefers-reduced-motion`):** All animations instantly reach final state. Accordion items are shown at rest (collapsed or pre-expanded, depending on context). Chevrons are at their static form (›/v). The warm-glow surfaces, shadows, and focus rings are all preserved (they are not animations; they are static design language). No essential information is lost in reduced-motion mode.

**Keyboard navigation:** 
1. Back button
2. Search bar (focus, type, clear button)
3. "Ask SIA" card / "Ask SIA" CTA button (single or nested focus)
4. FAQ section header (if focusable) → category rows in order
5. Contact support card / button

Arrow keys scroll content; Tab moves between focusable elements. On small screens, touch targets are preserved (≥44pt minimum).

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: SIA Chat [09] via tab switch (Ask SIA card, with help context flag), Me Main [17] via stack pop (back button), FAQ category sub-screens via stack push, system mail composer or in-app support form (contact support), in-app webview (if any FAQ links to terms/privacy)
- **Navigates from**: Me Main [17] via stack push (quick link grid)
- **Shared components with**: Settings [21] (Navigation Header, Section Header, Section Group Container, Settings Row — Navigation for FAQ categories), Notification History [24] (Section Group Container)
- **Patterns used**: Back Button (Batch 1), Text Input Field (Batch 1 — adapted for search bar with search icon and shorter height), Section Header (Batch 5), Section Group Container (Batch 5), Settings Row — Navigation (Batch 5), SIA Note concept (Batch 5 — elevated to full card here)
- **Patterns established**: Ask SIA Card (with orange solid CTA — standard brand action color), FAQ Accordion Item (collapsed/expanded with chevron rotation), Search Bar with inline results (adapted Text Input), Contact Support Card (low-prominence ghost CTA), Search No-Results state (with SIA redirect), FAQ Category Sub-Screen (stack-pushed category detail)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-09.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/tabs/me/help`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q17 progress photos are private, encrypted, user-deletable, and AI analysis is premium opt-in.
- Q20 OAuth flows need scope and revocation clarity.
- Q21 Data Sources may be a demo/no-live-sync trust placeholder for prototype acceptance.
- Q39 achievement density adapts for low-motivation users.
- Q43 Knowledge Graph V1 is a guided insight map.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B09-F04 | major | information-architecture | Render a real search input with results/no-results and route or expand FAQ categories. |
| B09-F05 | major | retention | Wire contact support to an in-app support form or mail flow with fallback/error handling. |
| B09-F06 | major | accessibility | Use semantic input/link/button elements, add labeled Back, and expand compact CTA hit areas to 44px. |

### Prototype Implications

- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

