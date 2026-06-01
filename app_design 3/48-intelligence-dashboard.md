# Screen Design: Intelligence / Insights Dashboard

**Screen**: 48 of 73
**File**: 48-intelligence-dashboard.md
**Register**: AI Mode (royal-purple #7F24FF)
**Primary action**: view AI-generated health insights, correlations, and predictions
**Tab**: Me (pushed from Explore or dedicated Insights section)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main -> Explore -> Intelligence Dashboard). Also reachable via SIA Chat [09] deep-link, Home Screen [12] proactive insight card, or Life Areas Overview [16] "see insights" link. Exit via back button to Explore, or forward to SIA Chat [09], Goal Detail [14], Knowledge Graph (sub-screen).

---

## Purpose

The Intelligence Dashboard is SIA's analytical command center -- the screen where the AI's understanding of the user becomes visible and interactive. It synthesizes data from every domain (fitness, nutrition, finance, relationships, etc.) into a unified health intelligence score, surfaces contradictions between what the user reports and what the data shows, reveals cross-domain correlations, and predicts future outcomes. This is the most data-rich screen in the app, yet it must feel like a premium "health intelligence briefing" rather than a spreadsheet. Royal-purple (#7F24FF) is the dominant accent here because this is SIA's domain -- the AI's own space to show its work. This screen does NOT follow the standard Domain Dashboard Template (established Screen 26) because it is not a single-domain dashboard; it is a cross-domain intelligence layer with its own layout pattern. This screen requires Pro — composite intelligence scores, contradictions, correlations, and predictions are advanced AI analytics gated behind the Pro tier.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Daily Score Hero Card -- large score (0-100) with circular progress ring, pillar sparklines, trend arrow. The single most prominent element, royal-purple accent glow.
2. Active Contradictions Banner -- alert-style cards requiring user attention (resolve or dismiss). Visually urgent.
3. Score Trend Chart -- 7/14/30 day line chart with interactive time range selector
4. Correlations Section -- discovered cross-domain relationships with visual strength indicators
5. Best Day Formula Card -- personalized optimal day blueprint with today's progress
6. Weekly Report Summary -- collapsible card with latest weekly insights
7. Predictions Card -- tomorrow's predicted score with accuracy badge
8. Insight Feedback History -- recent insights with thumbs up/down state
9. Knowledge Graph Link -- navigation to the visual health knowledge graph

**User flow**:
- **Arrives from**: Explore Section [18] via "Intelligence" module card (stack push), SIA Chat [09] via deep-link when SIA references an insight, Home Screen [12] via proactive insight card (stack push), Life Areas Overview [16] via "see insights" link (stack push)
- **Primary exit**: Back to Explore [18] (stack pop)
- **Secondary exits**: SIA Chat [09] via tap on any SIA-generated insight (tab switch with context), Goal Detail [14] via tap on pillar sparkline or correlation that references a goal (stack push), Knowledge Graph sub-screen via "explore graph" link (stack push), Weekly Report Detail via "see full report" link (stack push)

---

## Layout

**Scroll behavior**: ScrollView (content ~1400-1800pt, always scrollable, mixed heterogeneous content)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤ <- STICKY
│  <- [back]   "Intelligence"   [...] │  <- Intelligence Header
│  ================================   │  <- 3pt purple accent line
├─────────────────────────────────────┤
│                                     │  <- 16pt gap
│  ┌───────────────────────────────┐  │
│  │          DAILY SCORE           │  │  <- Hero Card (r-xl)
│  │                                │  │
│  │        ┌──────────┐            │  │
│  │        │          │            │  │
│  │        │    82    │            │  │
│  │        │          │            │  │
│  │        └──────────┘            │  │     Circular ring
│  │         ^ +3 from yesterday    │  │     with score center
│  │                                │  │
│  │  [fitness] [nutrition] [well.] │  │  <- Pillar sparklines
│  │    78 ^      85 -      80 v   │  │
│  │                                │  │
│  │  updated 2 hours ago           │  │
│  └───────────────────────────────┘  │
│                                     │  <- 16pt gap
│  CONTRADICTIONS (2)                 │  <- Eyebrow + count badge
│  ┌───────────────────────────────┐  │
│  │ ! "You report sleeping 8hrs   │  │  <- Contradiction Card 1
│  │    but WHOOP shows 5.5hrs"    │  │     orange-red alert icon
│  │        [resolve]  [dismiss]   │  │     action chips
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ ! "Stress rating: low, but    │  │  <- Contradiction Card 2
│  │    HRV trend is declining"    │  │
│  │        [resolve]  [dismiss]   │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  SCORE TREND                        │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │  [7d] [14d] [30d]             │  │  <- Time range selector
│  │                                │  │
│  │  -----.                        │  │  <- Line chart
│  │  /     \   .---.              │  │     purple line, orange dots
│  │ /       ---     \  .--        │  │
│  │                    --          │  │
│  │  May 14        May 21         │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  CORRELATIONS                       │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ "On days you meditate, your   │  │  <- Correlation Row 1
│  │  stress score is 40% lower"   │  │
│  │  [||||||||||||---] 85% strong │  │     strength indicator
│  ├───────────────────────────────┤  │
│  │ "Morning workouts correlate   │  │  <- Correlation Row 2
│  │  with 12% higher energy"      │  │
│  │  [|||||||||------] 72% mod.   │  │     strength indicator
│  │  see all ->                    │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  YOUR BEST DAY                      │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ Your best days include:        │  │  <- Best Day Formula
│  │                                │  │
│  │ [x] 7+ hours sleep        done│  │     checklist items
│  │ [x] Morning workout       done│  │     with today's status
│  │ [ ] < 2 coffees          3/2  │  │
│  │ [x] 10 min meditation    done │  │
│  │ [ ] No screens after 10pm     │  │
│  │                                │  │
│  │ Today: 3/5 factors matched     │  │  <- Progress summary
│  │ [||||||||||||||-------] 60%    │  │     progress bar
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  WEEKLY REPORT                      │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ Week of May 12-18       v     │  │  <- Collapsible header
│  │ "Your best domain was          │  │     (collapsed shows summary)
│  │  nutrition at 88. Fitness      │  │
│  │  dropped due to 2 missed      │  │
│  │  workouts."                    │  │
│  │           see full report ->   │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  PREDICTIONS                        │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ Tomorrow's predicted score:    │  │  <- Prediction Card
│  │                                │  │
│  │            ~75                 │  │     Large predicted value
│  │                                │  │
│  │  Based on your Wed patterns    │  │
│  │  [87% accurate]  [thumbs]     │  │     Accuracy badge + feedback
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  RECENT INSIGHTS                    │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ "Your sleep quality improved   │  │  <- Insight Row 1
│  │  15% since adding magnesium"   │  │
│  │              [thumbs up/down]  │  │     Feedback buttons
│  ├───────────────────────────────┤  │
│  │ "Stress peaks on Mondays -     │  │  <- Insight Row 2
│  │  consider a morning routine"   │  │
│  │              [thumbs up/down]  │  │     Feedback buttons
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  ┌───────────────────────────────┐  │
│  │ [graph icon] Explore your      │  │  <- Knowledge Graph Link
│  │   health knowledge graph  ->   │  │     navigation card
│  └───────────────────────────────┘  │
│                                     │  <- 48pt bottom breathing
├─────────────────────────────────────┤
│  Today  │  SIA  │  Goals  │  Me   │  <- Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Intelligence Header** -- 88pt (expanded), FIXED, sticky with backdrop-blur
   - Purpose: Screen identification with AI-mode branding
   - Content: back chevron, "Intelligence" title, 3pt royal-purple accent line, overflow menu

2. **Daily Score Hero Card** -- ~280pt
   - Purpose: The centerpiece -- today's unified health intelligence score
   - Content: Large circular progress ring with score, pillar sparkline row, trend arrow, last-updated timestamp

3. **Active Contradictions Section** -- ~120-240pt (variable, 0-N cards)
   - Purpose: Surface data inconsistencies requiring user attention
   - Content: Alert-style cards with contradiction description, resolve/dismiss action chips

4. **Score Trend Chart Card** -- ~220pt
   - Purpose: Visualize score history over configurable time range
   - Content: Line chart with time range selector (7d/14d/30d)

5. **Correlations Section** -- ~180pt
   - Purpose: Show discovered cross-domain behavioral relationships
   - Content: Correlation rows with strength indicator bars, "see all" link

6. **Best Day Formula Card** -- ~260pt
   - Purpose: Personalized optimal day checklist with today's progress
   - Content: Factor checklist with real-time status, overall progress bar

7. **Weekly Report Summary Card** -- ~160pt (collapsed), ~320pt (expanded)
   - Purpose: Latest weekly analysis highlights
   - Content: Collapsible card with week date range, summary text, "see full report" link

8. **Predictions Card** -- ~160pt
   - Purpose: Tomorrow's predicted score based on behavioral patterns
   - Content: Large predicted value, basis explanation, accuracy badge, feedback buttons

9. **Recent Insights Section** -- ~160pt
   - Purpose: AI-generated insight history with feedback mechanism
   - Content: 2-3 insight rows with thumbs up/down feedback buttons

10. **Knowledge Graph Link Card** -- ~64pt
    - Purpose: Navigation to the visual health knowledge graph sub-screen
    - Content: Graph icon + descriptive text + right chevron

---

## Components

### Intelligence Header (STICKY)
- **Purpose**: Screen identification with AI-mode branding
- **Data source**: Static
- **Visual treatment**: 88pt expanded, collapses to 48pt on scroll. ink-900 background, backdrop-blur(16px) when collapsed. Royal-purple accent line instead of a domain color -- this is the AI's screen.
- **Size**: Full-width x 88pt (expanded), 48pt (collapsed)
- **Sub-elements**:
  - Back button: standard (left chevron, white, 20pt, 44x44pt, 16pt from left)
  - Title: "Intelligence" in 20pt Sora Semibold, white, left-aligned 56pt from left
  - Accent line: 3pt height, royal-purple (#7F24FF) at 80%, extends from title left to ~60% width, 4pt below title baseline
  - Overflow menu: 3 dots, right-aligned, 16pt from right, 44x44pt touch target. Opens bottom sheet with: "notification settings", "export data", "about SIA intelligence"
- **Gestures**: back button taps pop stack; overflow opens bottom sheet

### Daily Score Hero Card
- **Purpose**: The single most important data point -- today's unified health intelligence score
- **Data source**: `GET /api/v1/intelligence/score/breakdown` -- returns overall score and per-pillar breakdown
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt internal padding. Subtle purple radial glow behind the score ring: royal-purple (#7F24FF) at 8% opacity, 120pt radius, centered on the ring. This is the one card where purple can be prominent because this IS the AI's domain.
- **Size**: Full-width minus 32pt x ~280pt
- **Sub-elements**:
  - Eyebrow: "DAILY SCORE", 12pt Sora Semibold, royal-purple (#7F24FF), uppercase, +0.12em tracking
  - Circular progress ring: 120pt diameter, 8pt stroke. Track: white at 10%. Fill: royal-purple (#7F24FF), clockwise from 12 o'clock. Represents score out of 100.
  - Score value (center of ring): 36pt Sora Bold, white. Example: "82"
  - Score label: "/ 100" in 14pt Sora Regular, white at 40%, right of score value inside ring
  - Trend arrow: 16pt below ring, centered. Up: green (#34A853) arrow + "+3 from yesterday" in 13pt Sora Regular, green. Down: orange (#FF5E00) arrow + "-5 from yesterday" in orange. Flat: white at 50% dash + "same as yesterday" in white at 50%.
  - Pillar sparkline row: 16pt below trend arrow. Horizontal row of 3 mini-sparklines (fitness, nutrition, wellbeing), evenly spaced across card width minus padding.
    - Each sparkline: 64pt wide x 24pt tall mini line chart (last 7 data points), stroke 1.5pt
    - Sparkline color: royal-purple at 60%
    - Label below: pillar name in 11pt Sora Regular, white at 50%, centered
    - Current value: 13pt Sora Semibold, white, centered below label
    - Micro trend arrow: 10pt, same color coding as main trend
  - Timestamp: "updated 2 hours ago" in 11pt Sora Regular, white at 30%, bottom-left of card
- **Variants**:
  - Populated: full display as described
  - Insufficient data (Day 1-3): ring shows "--" instead of score, purple at 30% fill. Text: "SIA needs a few more days of data to calculate your score." Sparklines hidden.
  - Loading: skeleton shimmer on ring, sparklines, and text
- **Gestures**: Tap pillar sparkline navigates to that domain's dashboard (stack push). Tap the main score ring navigates to a detailed breakdown (expand inline or push).

### Active Contradictions Section
- **Purpose**: Surface inconsistencies between self-reported data and measured data, building trust through transparency
- **Data source**: `GET /api/v1/intelligence/contradictions` -- returns active contradictions with id, description, severity, sources
- **Visual treatment**: Each contradiction is an individual card. Cards stack vertically with 8pt gap.
- **Size**: Full-width minus 32pt x ~120pt per card (variable based on text length)
- **Sub-elements**:
  - Eyebrow above section: "CONTRADICTIONS" in 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking. (Structural eyebrow — not AI-generated content, so uses standard white treatment, not purple.) Count badge: "(2)" in 12pt Sora Semibold, orange (#FF5E00), inline 4pt after eyebrow text.
  - Each contradiction card: ink-brown-800, --r-xl (28pt), 24pt padding
    - Alert icon: "!" in a 20pt circle, orange (#FF5E00) fill, white icon, top-left of card content
    - Description text: 15pt Sora Regular, white at 85%, 36pt from card left (cleared from icon). Max 3 lines. Example: "You report sleeping 8 hours but WHOOP shows 5.5 hours of actual sleep."
    - Source tags: 11pt Sora Regular, white at 40%, below description (4pt gap). Example: "sleep log vs. WHOOP data"
    - Action chips row: 8pt below description, right-aligned
      - "resolve" chip: royal-purple (#7F24FF) at 15% bg, purple text, 13pt Sora Semibold, --r-pill, 32pt height, 16pt horizontal padding. Tapping opens a resolution flow (bottom sheet with explanation options).
      - "dismiss" chip: 8pt left of resolve. ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold, white at 50%, --r-pill, 32pt height, 16pt horizontal padding. Tapping calls `POST /contradictions/:id/dismiss`.
  - Max 3 visible. If more: "see all contradictions" link in orange, centered.
- **Variants**:
  - Active contradictions (1-10+): cards as described
  - No contradictions: section hidden entirely (no empty state -- absence is the positive state)
  - Loading: skeleton shimmer on 2 placeholder cards
- **Gestures**: Tap "resolve" opens resolution bottom sheet. Tap "dismiss" removes card with slide-left animation. Swipe left on card to dismiss (same as tap dismiss).

### Score Trend Chart Card
- **Purpose**: Visualize score trajectory over time to reveal patterns
- **Data source**: `GET /api/v1/intelligence/score/trend?range=7|14|30` -- returns daily score array
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding
- **Size**: Full-width minus 32pt x ~220pt
- **Sub-elements**:
  - Eyebrow: "SCORE TREND" -- 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking (structural eyebrow, standard treatment)
  - Time range selector: 3 chips in a row, 8pt below eyebrow. Each chip: 32pt height, --r-pill. Active: royal-purple (#7F24FF) fill, white text. Inactive: ink-900 bg, 1pt white at 10% border, white at 50% text. Chips: "7d", "14d", "30d". 8pt gap between.
  - Chart area: ~140pt tall, 12pt below selector
    - Line: 2pt solid, royal-purple (#7F24FF), dot markers (6pt circles, purple fill) at each data point
    - Fill area below line: royal-purple at 5% opacity
    - Grid lines: 1pt, white at 3%, horizontal only (3 grid lines)
    - X-axis: date labels in 11pt Sora Regular, white at 30%
    - Y-axis: score labels in 11pt Sora Regular, white at 30% (0, 25, 50, 75, 100)
    - Predicted data (if applicable): 2pt dashed line, purple at 40%, extending 1-2 days into the future
    - Touch interaction: press-and-hold on chart to scrub. Tooltip appears: date + score value in a small pill (ink-900 bg, white text, 13pt Semibold, --r-sm, 8pt padding). Tooltip follows finger horizontally.
- **Variants**:
  - Populated (7+ days): full chart as described
  - Limited data (1-6 days): fewer data points, chart still renders. Dashed purple line from last point projects forward.
  - No data: chart area shows "Track your first week to see your score trend" in 15pt Regular, white at 50%, centered
  - Loading: skeleton shimmer over chart area
- **Gestures**: Tap time range chip to change range (chart crossfades, 280ms). Press-and-hold to scrub. Haptic: light impact on scrub position change.

### Correlations Section
- **Purpose**: Surface discovered relationships between behaviors across domains
- **Data source**: `GET /api/v1/intelligence/correlations` -- returns correlation array with description, strength (0-100), pillar pair, direction
- **Visual treatment**: Section (no enclosing card) with individual correlation rows inside a shared card
- **Size**: Full-width minus 32pt x ~180pt
- **Sub-elements**:
  - Eyebrow: "CORRELATIONS" -- standard purple eyebrow treatment
  - Correlation card: ink-brown-800, --r-xl (28pt), 24pt padding. Contains 2-3 correlation rows.
  - Each correlation row:
    - Description text: 15pt Sora Regular, white at 85%. Example: "On days you meditate, your stress score is 40% lower"
    - Strength indicator bar: 8pt below description. Full-width inside card padding, 4pt height, --r-pill. Track: white at 8%. Fill: graduated purple -- strength < 50%: purple at 40%, 50-75%: purple at 65%, 75%+: purple at 100%. Width proportional to strength value.
    - Strength label: right-aligned on same line as bar. "{N}% {strength_word}" in 12pt Sora Regular. strong (75-100%): white. moderate (50-74%): white at 70%. weak (25-49%): white at 50%.
    - Feedback: small thumbs up/down icons (14pt, white at 30%) far-right on description row. Tapping calls `POST /insights/:id/feedback`.
  - Rows separated by 1pt white at 5%, 12pt padding between
  - Max 3 visible. "see all" link: orange (#FF5E00), center-aligned, 13pt Sora Regular, 44pt touch target.
- **Variants**:
  - Populated (3+ correlations): as described
  - Few (1-2): show all, no "see all" link
  - None: card shows "SIA is analyzing your patterns. Correlations appear after 1-2 weeks of data." in 15pt Regular, white at 50%.
  - Loading: skeleton shimmer on 3 placeholder rows
- **Gestures**: Tap correlation row navigates to SIA Chat [09] with correlation context pre-loaded (tab switch). Tap "see all" expands to full correlation list (push or inline expand). Tap thumbs up/down provides feedback.

### Best Day Formula Card
- **Purpose**: Show the user their personalized "best day" blueprint and how today measures up
- **Data source**: `GET /api/v1/intelligence/best-day` for formula, `GET /api/v1/intelligence/best-day/progress` for today's progress
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. Subtle purple gradient at top edge -- purple (#7F24FF) at 4% opacity, 48pt tall radial gradient from top-center, fading to transparent. This mirrors the SIA Inspiration Prompt Card pattern from Screen 36 but in purple.
- **Size**: Full-width minus 32pt x ~260pt
- **Sub-elements**:
  - Eyebrow: "YOUR BEST DAY" -- 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking (structural eyebrow, standard treatment)
  - Intro text: "Your best days include:" in 16pt Sora Semibold, white, 8pt below eyebrow
  - Factor checklist: 8pt below intro. Each factor row:
    - Checkbox: 20pt square, --r-xs (4pt) corners. Matched today: purple (#7F24FF) fill + white checkmark (12pt, 2pt stroke). Not matched: white at 15% fill, 1pt white at 20% border.
    - Factor text: 15pt Sora Regular, white at 80%, 8pt right of checkbox. Example: "7+ hours sleep"
    - Status indicator: right-aligned. Matched: "done" in 12pt Sora Semibold, green (#34A853). Not matched: current value in 12pt Sora Regular, orange (#FF5E00). Example: "3/2" (meaning 3 coffees, target was <2).
    - Row height: 36pt, 4pt gap between rows
    - Max 5-6 factors visible
  - Progress summary: 16pt below checklist
    - Text: "Today: 3/5 factors matched" in 14pt Sora Semibold, white
    - Progress bar: 8pt below text. Full card content width, 6pt height, --r-pill. Track: white at 8%. Fill: graduated -- <33%: orange, 33-66%: royal-purple at 70%, 67%+: green (#34A853). Width proportional to match percentage.
    - Percentage: right-aligned on same line as text, 14pt Sora Semibold. Color matches fill color.
- **Variants**:
  - Populated: full checklist with real-time status
  - Insufficient data: "SIA is learning your patterns. Your best day formula will appear after 2-3 weeks of tracking." in 15pt Regular, white at 50%, centered in card.
  - All matched: all checkboxes purple, progress bar green at 100%, confetti micro-animation (8-10 small purple/green particles from bar, 600ms).
  - Loading: skeleton shimmer
- **Gestures**: Tap a factor row for more detail (inline expand showing the data behind it). Tap the whole card to navigate to SIA Chat [09] with "tell me about my best day formula" pre-loaded.

### Weekly Report Summary Card
- **Purpose**: Highlight key findings from the latest weekly analysis
- **Data source**: `GET /api/v1/intelligence/weekly` -- returns latest weekly report with summary, highlights, domain_scores
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. Collapsible with expand/collapse chevron.
- **Size**: Full-width minus 32pt x ~160pt (collapsed), ~320pt (expanded)
- **Sub-elements**:
  - Eyebrow: "WEEKLY REPORT" -- 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking (structural eyebrow, standard treatment)
  - Header row: 48pt, full card content width
    - Title: "Week of May 12-18" in 16pt Sora Semibold, white
    - Chevron: 14pt, white at 40%, right-aligned, rotates 0 to 90 degrees on expand
  - Summary text (always visible, collapsed state): 15pt Sora Regular, white at 70%, max 3 lines. Example: "Your best domain was nutrition at 88. Fitness dropped due to 2 missed workouts."
  - Expanded content (hidden when collapsed):
    - Domain score row: 5-9 mini domain score pills in a horizontal wrap layout. Each pill: domain color at 15% bg, domain color text for score value, domain name below in 11pt Regular white at 40%. 48pt tall each.
    - Key highlights: 2-3 bullet points in 14pt Sora Regular, white at 70%. Each bullet preceded by a purple dot (4pt circle, #7F24FF).
    - "see full report" link: orange (#FF5E00), 13pt Sora Semibold, right-aligned, 44pt touch target
  - Expand/collapse animation: content height 0 to auto + fade-in, 280ms ease-out-soft
- **Variants**:
  - Current week: as described
  - No weekly report yet: "Your first weekly report will be generated on Sunday." in 15pt Regular, white at 50%.
  - Loading: skeleton shimmer
- **Gestures**: Tap header row to expand/collapse. Tap "see full report" navigates to Weekly Report Detail (stack push). Tap a domain score pill navigates to that domain dashboard (stack push).

### Predictions Card
- **Purpose**: Display SIA's prediction for tomorrow's score, building trust in the AI system
- **Data source**: `GET /api/v1/intelligence/predictions/accuracy` -- returns predicted_score, basis_text, accuracy_percentage
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding
- **Size**: Full-width minus 32pt x ~160pt
- **Sub-elements**:
  - Eyebrow: "PREDICTIONS" -- standard purple eyebrow treatment
  - Intro text: "Tomorrow's predicted score:" in 14pt Sora Regular, white at 60%
  - Predicted value: 32pt Sora Bold, white, centered, 8pt below intro. Prefix "~" in white at 40%. Example: "~75"
  - Basis text: 13pt Sora Regular, white at 50%, centered, 8pt below value. Example: "Based on your Wednesday patterns"
  - Accuracy badge: pill shape, --r-pill, 28pt height, 12pt horizontal padding. Green (#34A853) at 15% bg, green text ("87% accurate") in 12pt Sora Semibold. Positioned 12pt below basis text, left-aligned.
  - Feedback row: same line as accuracy badge, right-aligned. Thumbs up (16pt icon, white at 30%) + thumbs down (16pt icon, white at 30%), 16pt gap between. Active state: thumbs up turns green, thumbs down turns orange.
- **Variants**:
  - Populated: full prediction display
  - Low confidence: accuracy badge shows orange text on orange bg at 15%. Example: "52% accurate -- still learning"
  - No prediction: "SIA needs more data to make predictions. Keep tracking!" in 15pt Regular, white at 50%, centered.
  - Loading: skeleton shimmer
- **Gestures**: Tap the card body navigates to SIA Chat [09] with prediction context. Tap accuracy badge expands inline to show accuracy history (mini chart). Tap thumbs up/down calls `POST /insights/:id/feedback` and animates the selected thumb (scale 1.0 to 1.3 + color change, 160ms).

### Recent Insights Section
- **Purpose**: Display AI-generated insights with feedback mechanism for continuous learning
- **Data source**: `GET /api/v1/intelligence/history` -- returns recent insights with feedback state
- **Visual treatment**: Section with rows inside a shared card
- **Size**: Full-width minus 32pt x ~160pt
- **Sub-elements**:
  - Eyebrow: "RECENT INSIGHTS" -- standard purple eyebrow treatment
  - Insights card: ink-brown-800, --r-xl (28pt), 24pt padding
  - Each insight row:
    - SIA indicator: purple dot (4pt circle, #7F24FF), 16pt from card left, vertically centered with first text line
    - Insight text: 14pt Sora Regular, white at 80%, 24pt from card left, max 2 lines. Example: "Your sleep quality improved 15% since adding magnesium supplements."
    - Feedback buttons: right-aligned on first text line. Thumbs up (14pt icon) + thumbs down (14pt icon), 12pt gap. Default: white at 25%. Upvoted: green (#34A853). Downvoted: orange (#FF5E00). Tapping calls `POST /insights/:id/feedback`.
    - Timestamp: 11pt Sora Regular, white at 30%, below insight text, 24pt from left. Example: "2 days ago"
  - Rows separated by 1pt white at 5%, 12pt padding between
  - Max 3 visible. "see all insights" link: orange, center-aligned.
- **Variants**:
  - Populated: 1-3 insight rows
  - No insights: hidden (section does not render)
  - Loading: skeleton shimmer on 2 placeholder rows
- **Gestures**: Tap insight text navigates to SIA Chat [09] with that insight as context. Tap thumbs up/down provides feedback with micro-animation.

### Knowledge Graph Link Card
- **Purpose**: Navigation to the health knowledge graph visualization
- **Data source**: Static (navigational only)
- **Visual treatment**: ink-brown-800 card, --r-md (14pt), 16pt padding. Single-row layout. Subtle 1pt purple (#7F24FF) at 15% left border (3pt wide) to tie it to the AI theme.
- **Size**: Full-width minus 32pt x ~64pt
- **Sub-elements**:
  - Graph icon: 20pt, royal-purple (#7F24FF), left-aligned. Custom network/graph icon (3 connected dots).
  - Text: "Explore your health knowledge graph" in 15pt Sora Semibold, white, 8pt right of icon
  - Chevron: 14pt, white at 40%, right-aligned
- **Variants**: N/A (always visible)
- **Gestures**: Tap entire card navigates to Knowledge Graph sub-screen (stack push to `/intelligence/graph` view)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Header accent line | #7F24FF at 80% | royal-purple | AI-mode identification |
| Score ring fill | #7F24FF | royal-purple | Primary AI accent |
| Score ring glow | #7F24FF at 8% | royal-purple | Subtle radial glow behind ring |
| Eyebrow text | #7F24FF | royal-purple | Section labels on this screen |
| Trend chart line | #7F24FF | royal-purple | Score history line |
| Trend chart fill | #7F24FF at 5% | royal-purple | Under-line area fill |
| Correlation strength bar | #7F24FF at 40-100% | royal-purple | Graduated by strength |
| Best Day factor checkboxes | #7F24FF | royal-purple | Matched factors |
| Best Day card gradient | #7F24FF at 4% | royal-purple | Extremely subtle top bleed |
| Time range chip (active) | #7F24FF | royal-purple | Selected range indicator |
| Knowledge graph link border | #7F24FF at 15% | royal-purple | Left accent |
| SIA dots (insights) | #7F24FF | royal-purple | 4pt indicators |
| Contradiction alert icon | #FF5E00 | brand-orange | Attention-drawing |
| "resolve" chip bg | #7F24FF at 15% | royal-purple | Action chip |
| "resolve" chip text | #7F24FF | royal-purple | Action chip label |
| "see all" links | #FF5E00 | brand-orange | Interactive links |
| "see full report" link | #FF5E00 | brand-orange | Interactive link |
| Trend arrow (up) | #34A853 | forest-green | Positive change |
| Trend arrow (down) | #FF5E00 | brand-orange | Negative change |
| Factor matched status | #34A853 | forest-green | "done" text |
| Factor unmatched status | #FF5E00 | brand-orange | Current value |
| Accuracy badge (high) | #34A853 at 15% bg, #34A853 text | forest-green | Reliable prediction |
| Accuracy badge (low) | #FF5E00 at 15% bg, #FF5E00 text | brand-orange | Learning prediction |
| Thumbs up (active) | #34A853 | forest-green | Positive feedback |
| Thumbs down (active) | #FF5E00 | brand-orange | Negative feedback |
| Best Day progress (low) | #FF5E00 | brand-orange | <33% matched |
| Best Day progress (mid) | #7F24FF at 70% | royal-purple | 33-66% matched |
| Best Day progress (high) | #34A853 | forest-green | 67%+ matched |
| Primary text | #FFFFFF | white | Titles, values, body |
| Secondary text | white at 70% | -- | Descriptions, expanded content |
| Tertiary text | white at 50% | -- | Captions, basis text |
| Quaternary text | white at 40% | -- | Timestamps, axis labels |
| Quinary text | white at 30% | -- | Updated timestamps, source tags |

**AI Mode Exception — documented in `_shared-patterns.md`**: This screen operates in "AI Mode" where royal-purple replaces orange as the dominant visual accent. This is the ONLY screen with this exception — justified because the Intelligence Dashboard is SIA's analytical command center, the AI's own space to show its work.

**Purple eyebrow rule on this screen**: Only AI-generated content sections use purple eyebrows (DAILY SCORE, CORRELATIONS, PREDICTIONS — 3 sections). Structural/navigational sections use standard white at 40% eyebrows (CONTRADICTIONS, SCORE TREND, YOUR BEST DAY, WEEKLY REPORT — 4 sections). This distinguishes "SIA computed this" from "this is how the screen is organized."

**60/30/10 within AI Mode**: Interactive actions (links, "see all", "see full report", contradiction alerts) remain orange. Green appears on positive states (trend up, matched factors, high accuracy). Purple identifies AI-generated content (score ring, chart lines, correlation strength bars, best-day checkboxes, prediction values). Domain colors appear only on weekly report domain score pills.

---

## Interaction States

### Daily Score Ring
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Purple ring fill, white score text | -- |
| Pressed | scale(0.97), glow intensifies to 12% | light impact |
| Focus-visible | 2pt orange ring, offset 4pt | -- |
| Loading | skeleton shimmer on ring and text | -- |

### Contradiction Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, alert icon, action chips | -- |
| Pressed | scale(0.98), background darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Dismissing | card slides left + opacity to 0, height collapses | light impact |

### "resolve" Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Purple 15% bg, purple text | -- |
| Pressed | Purple 25% bg, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | inline spinner replaces text | -- |
| Success | brief green glow (600ms) | success notification |

### "dismiss" Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt border, white at 50% text | -- |
| Pressed | bg darkens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Time Range Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (active) | Purple fill, white text | -- |
| Default (inactive) | ink-900 bg, white at 50% text | -- |
| Pressed | scale(0.95), bg brightens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Correlation Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal text, strength bar | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Best Day Factor Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Checkbox + text + status | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Thumbs Up/Down Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 25% icon | -- |
| Pressed | scale(1.2), icon brightens to white 60% | light impact |
| Active (up) | green (#34A853), scale settled at 1.0 | -- |
| Active (down) | orange (#FF5E00), scale settled at 1.0 | -- |

### Weekly Report Header (Collapsible)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (collapsed) | Chevron at 0deg, summary visible | -- |
| Pressed | Row bg white at 5% | light impact |
| Expanded | Chevron at 90deg, full content visible | -- |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Knowledge Graph Link Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, purple left border, icon + text | -- |
| Pressed | scale(0.97), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh all intelligence data |
| Tap | Score ring | Expand detailed breakdown (inline) |
| Tap | Pillar sparkline | Navigate to domain dashboard (stack push) |
| Tap | "resolve" chip | Open resolution bottom sheet |
| Tap | "dismiss" chip | Dismiss contradiction (animate out) |
| Swipe left | Contradiction card | Dismiss contradiction |
| Tap | Time range chip | Switch chart range (7d/14d/30d) |
| Press-hold | Score trend chart | Scrub data points with tooltip |
| Tap | Correlation row | Navigate to SIA Chat [09] with context |
| Tap | Best Day factor row | Expand inline detail |
| Tap | Best Day card body | Navigate to SIA Chat [09] |
| Tap | Weekly report header | Expand/collapse section |
| Tap | "see full report" | Navigate to Weekly Report Detail (stack push) |
| Tap | Domain score pill | Navigate to domain dashboard (stack push) |
| Tap | Prediction card body | Navigate to SIA Chat [09] |
| Tap | Accuracy badge | Expand accuracy history inline |
| Tap | Thumbs up/down | Submit feedback + animate |
| Tap | Insight row text | Navigate to SIA Chat [09] with context |
| Tap | Knowledge Graph link | Navigate to Knowledge Graph (stack push) |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |
| Tap | Overflow menu | Open bottom sheet |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in, 80ms stagger per section | 280ms each | ease-out-soft |
| Header collapse | Scroll past 40pt | Large title collapse, center title fade-in | 280ms | ease-out-soft |
| Score ring arc | Enter viewport | Arc draws from 0 to target % | 520ms | ease-flow |
| Score value | Ring complete | Count-up from 0 to score | 520ms | ease-flow |
| Score glow | Ring complete | Purple glow fade-in 0% to 8% | 280ms | ease-out-soft |
| Pillar sparklines | Enter viewport | Lines draw left-to-right (stroke-dashoffset) | 520ms, 120ms stagger | ease-flow |
| Contradiction dismiss | Swipe left / tap dismiss | Card slides left + opacity to 0, height collapses to 0 | 280ms | ease-out-soft |
| Trend chart line | Enter viewport | Line draws left-to-right (stroke-dashoffset) | 520ms | ease-flow |
| Trend chart dots | Line reaches position | Scale-in from 0 to 1, staggered | 160ms each, 60ms stagger | ease-out-soft |
| Time range change | Tap chip | Chart crossfade (old fade out, new fade in) | 280ms | ease-out-soft |
| Correlation bars | Enter viewport | Width 0 to target %, staggered | 280ms each, 80ms stagger | ease-out-soft |
| Best Day checkboxes | Enter viewport | Scale-in from 0.8 to 1, staggered | 160ms each, 40ms stagger | ease-out-soft |
| Best Day progress bar | Enter viewport | Width 0 to percentage | 520ms | ease-flow |
| Best Day all-matched | All factors matched | Micro confetti (8-10 particles) from progress bar | 600ms | ease-flow |
| Weekly report expand | Tap header | Content height 0 to auto + fade-in | 280ms | ease-out-soft |
| Weekly report collapse | Tap header | Content height auto to 0 + fade-out | 280ms | ease-out-soft |
| Predicted score | Enter viewport | Count-up from 0 to value | 280ms | ease-out-soft |
| Thumbs feedback | Tap | Scale 1.0 to 1.3 to 1.0 + color transition | 160ms | ease-out-soft |
| Tooltip (chart scrub) | Press-hold | Fade-in + follows finger | 160ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard iOS stack push -- slides in from right (280ms, ease-out-soft)
- **Exit**: Stack pop -- slides out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- Intelligence Header: normal display
- Daily Score Hero Card: ring shows "--" with purple at 30% opacity fill. Text: "SIA is getting to know you. Your health intelligence score will appear in a few days." Sparklines hidden.
- Contradictions: hidden (no data)
- Score Trend: chart area shows: "Track your first week to see your score trend." Centered text, 15pt Regular, white at 50%.
- Correlations: card shows: "SIA is analyzing your patterns. Correlations appear after 1-2 weeks of data." 15pt Regular, white at 50%.
- Best Day Formula: card shows: "SIA is learning your patterns. Your best day formula will appear after 2-3 weeks of tracking." 15pt Regular, white at 50%.
- Weekly Report: "Your first weekly report will be generated on Sunday." 15pt Regular, white at 50%.
- Predictions: "SIA needs more data to make predictions. Keep tracking!" 15pt Regular, white at 50%.
- Recent Insights: hidden
- Knowledge Graph Link: visible (graph is always explorable, even if sparse)

### Established user (fully populated)
- All sections visible with real data
- Contradictions appear when detected, hidden when none
- Recent Insights shows 2-3 most recent with feedback state
- Weekly Report defaults to collapsed

### Returning after absence (gap in data)
- Score shows last available with "(last active May 10)" timestamp
- Trend chart shows gap in data line (line breaks, reconnects on return)
- SIA coaching note (if added to this screen): "Welcome back. Let's rebuild your streak."

---

## Motivation Adaptation

- **Low motivation**: Only Daily Score Hero Card (simplified -- ring + score only, no sparklines) and Best Day Formula (showing only top 3 factors instead of 5-6). All other sections hidden. The screen fits in one viewport. SIA's tone is gentle: "Here's what matters most today."
- **Medium motivation**: Default experience as described above. All sections visible. Score Trend defaults to 7d view. Weekly Report collapsed. Correlations show top 2-3.
- **High motivation**: All sections expanded by default. Weekly Report auto-expanded. Correlations show top 5 with detailed strength analysis. Additional "Deep Patterns" section appears between Correlations and Best Day, showing second-order correlations (e.g., "When you meditate AND sleep 7+ hours, your fitness score is 25% higher than meditation alone"). Score Trend defaults to 30d view. Prediction card shows historical accuracy trend (mini sparkline inside accuracy badge area).

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title ("Intelligence") | Sora | Semibold (600) | 20pt | 28pt | white |
| AI eyebrow labels (DAILY SCORE, etc.) | Sora | Semibold (600) | 12pt | 16pt | purple #7F24FF |
| Structural eyebrow labels (CONTRADICTIONS, etc.) | Sora | Semibold (600) | 12pt | 16pt | white at 40% |
| Score value (center of ring) | Sora | Bold (700) | 36pt | 44pt | white |
| Score "/ 100" label | Sora | Regular (400) | 14pt | 20pt | white at 40% |
| Trend arrow text | Sora | Regular (400) | 13pt | 18pt | green #34A853 (up) / orange #FF5E00 (down) / white at 50% (flat) |
| Pillar sparkline label | Sora | Regular (400) | 11pt | 16pt | white at 50% |
| Pillar sparkline value | Sora | Semibold (600) | 13pt | 18pt | white |
| Timestamp ("updated 2 hours ago") | Sora | Regular (400) | 11pt | 16pt | white at 30% |
| Contradiction count badge | Sora | Semibold (600) | 12pt | 16pt | orange #FF5E00 |
| Contradiction description | Sora | Regular (400) | 15pt | 22pt | white at 85% |
| Contradiction source tags | Sora | Regular (400) | 11pt | 16pt | white at 40% |
| "resolve" chip text | Sora | Semibold (600) | 13pt | 18pt | purple #7F24FF |
| "dismiss" chip text | Sora | Semibold (600) | 13pt | 18pt | white at 50% |
| Time range chip labels | Sora | Semibold (600) | 13pt | 18pt | white (active) / white at 50% (inactive) |
| Chart axis labels | Sora | Regular (400) | 11pt | 16pt | white at 30% |
| Chart tooltip value | Sora | Semibold (600) | 13pt | 18pt | white |
| Correlation description | Sora | Regular (400) | 15pt | 22pt | white at 85% |
| Correlation strength label | Sora | Regular (400) | 12pt | 16pt | white (strong) / white at 70% (moderate) / white at 50% (weak) |
| "see all" links | Sora | Regular (400) | 13pt | 18pt | orange #FF5E00 |
| Best Day intro text | Sora | Semibold (600) | 16pt | 22pt | white |
| Best Day factor text | Sora | Regular (400) | 15pt | 22pt | white at 80% |
| Best Day status ("done" / value) | Sora | Semibold (600) | 12pt | 16pt | green #34A853 (done) / orange #FF5E00 (not done) |
| Best Day progress text | Sora | Semibold (600) | 14pt | 20pt | white |
| Weekly report title | Sora | Semibold (600) | 16pt | 22pt | white |
| Weekly report summary | Sora | Regular (400) | 15pt | 22pt | white at 70% |
| Weekly report domain pill value | Sora | Semibold (600) | 13pt | 18pt | domain color |
| Weekly report domain label | Sora | Regular (400) | 11pt | 16pt | white at 40% |
| "see full report" link | Sora | Semibold (600) | 13pt | 18pt | orange #FF5E00 |
| Predicted score value | Sora | Bold (700) | 32pt | 40pt | white |
| Prediction basis text | Sora | Regular (400) | 13pt | 18pt | white at 50% |
| Accuracy badge text | Sora | Semibold (600) | 12pt | 16pt | green #34A853 (high) / orange #FF5E00 (low) |
| Insight text | Sora | Regular (400) | 14pt | 20pt | white at 80% |
| Insight timestamp | Sora | Regular (400) | 11pt | 16pt | white at 30% |
| Knowledge graph link text | Sora | Semibold (600) | 15pt | 20pt | white |
| Empty/insufficient data messages | Sora | Regular (400) | 15pt | 22pt | white at 50% |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Score data fails to load | Hero card shows skeleton shimmer for 5s, then: "couldn't load your intelligence score" with retry button | Tap retry; pull-to-refresh also retries all sections |
| Contradictions API fails | Section hidden entirely (graceful degradation -- absence is not alarming) | Pull-to-refresh to reload |
| Score trend chart fails | Chart area shows: "couldn't load trend data" in 15pt Regular, white at 50%, centered | Tap chart area or pull-to-refresh to retry |
| Time range switch fails | Previous range data remains visible; toast: "couldn't update chart. try again." | Tap time range chip again to retry |
| Correlations fail to load | Card shows: "couldn't load correlations" with retry link | Tap retry link or pull-to-refresh |
| Best Day data fails to load | Card shows: "couldn't load your best day formula" in 15pt Regular, white at 50% | Pull-to-refresh to retry |
| Weekly report fails to load | Card shows: "couldn't load weekly report" with retry link | Tap retry or pull-to-refresh |
| Predictions fail to load | Card shows: "prediction unavailable right now" in 15pt Regular, white at 50% | Pull-to-refresh; prediction regenerates server-side |
| Insight feedback fails to submit | Thumb icon reverts to default (white at 25%); toast: "couldn't save feedback. try again." | Tap thumb icon again to retry |
| Contradiction dismiss fails | Card reappears with slide-right animation; toast: "couldn't dismiss. try again." | Swipe left or tap dismiss again |
| Contradiction resolve fails | Resolution bottom sheet shows inline error: "couldn't save. try again." | Tap "resolve" action in bottom sheet again |
| Knowledge graph navigation fails | Toast: "couldn't open knowledge graph. try again." | Tap card again to retry navigation |
| Pull-to-refresh fails | Spinner dismisses; toast: "couldn't refresh. check your connection." | Pull again or wait for connectivity |
| Offline state | Banner at top of scroll content: "you're offline -- showing cached data" (ink-brown-800 bg, white at 60% text) | Data refreshes automatically on reconnection |

---

## Accessibility

- Screen title "Intelligence" announced on focus via VoiceOver
- Daily Score Hero Card announces: "Daily health intelligence score: [N] out of 100. [Trend direction]: [change] from yesterday."
- Score ring is not interactive decoration until tapped; announces: "Score details. Double-tap to expand breakdown."
- Pillar sparklines announce: "[Pillar name], score [N], trending [up/down/flat]"
- Contradictions section announces: "Contradictions, [N] active"
- Each contradiction card announces: "[Description]. Sources: [source tags]. Actions: resolve, dismiss."
- "resolve" and "dismiss" chips are distinct button targets with minimum 44x44pt touch area
- Score trend chart announces summary: "Score trend over [7/14/30] days. Current: [N]. Average: [N]."
- Chart scrub tooltip is announced on press-hold position changes
- Correlation rows announce: "[Description]. Strength: [N]%, [strong/moderate/weak]."
- Thumbs up/down announce: "Rate this insight. Thumbs up / Thumbs down. [Current state if active]."
- Best Day factors announce: "[Factor text], [matched: done / not matched: current value]"
- Best Day progress announces: "Today: [N] of [N] factors matched, [percentage]%"
- Weekly report header announces: "Weekly report, week of [dates], [collapsed/expanded]. Double-tap to toggle."
- Prediction card announces: "Tomorrow's predicted score: approximately [N]. Based on [basis text]. [Accuracy]% accurate."
- Knowledge graph link announces: "Explore your health knowledge graph. Double-tap to open."
- All touch targets meet 44x44pt minimum
- Focus order: back button -> overflow menu -> hero card -> contradictions (if any) -> score trend -> correlations -> best day -> weekly report -> predictions -> insights -> knowledge graph link
- Gesture alternatives: swipe-right-from-edge replaces back button; chart scrub accessible via VoiceOver adjustable trait; swipe-left on contradiction available via VoiceOver custom actions

---

## Cross-References

- **Navigates to**: Screen [09] -- SIA Chat (via insight tap, correlation tap, best day tap, prediction tap; tab switch with context pre-loaded), Screen [14] -- Goal Detail (via sparkline tap if a goal is referenced; stack push), Screen [18] -- Explore Section (via back; stack pop), Domain Dashboards [26-36] (via pillar sparkline tap or weekly report domain pill; stack push), Screen [72] -- Knowledge Graph (via "Explore your health knowledge graph" link card; stack push), Weekly Report Detail (via "see full report"; stack push), Contradiction Resolution Bottom Sheet (via "resolve" chip; modal present)
- **Navigates from**: Screen [18] -- Explore Section (stack push), Screen [09] -- SIA Chat (deep-link when referencing an insight), Screen [12] -- Home Screen (via proactive insight card; stack push), Screen [16] -- Life Areas Overview (via "see insights" link; stack push)
- **Shared components with**: Screen [14] -- Goal Detail (Line Chart pattern for Score Trend, adapted with purple instead of orange), Screen [35] -- Learning Dashboard (Collapsible Section pattern for Weekly Report), Screen [36] -- Creativity Dashboard (SIA Coaching Note Card pattern adapted for insights), Screen [38] -- Habits (Streak/Heatmap data visualization concepts)
- **Patterns used**: Back Button, 8-State Interaction Model, Stack Navigation, Content Entry Animation (staggered fade-in), Collapsing Header Variant (from Screen 35), Expandable/Collapsible Section (from Screen 14), Section Eyebrow Label, Pull-to-Refresh
- **Patterns established**: Intelligence Score Ring (large circular progress with center value, purple fill, radial glow -- unique to intelligence), Contradiction Alert Card (alert icon + description + resolve/dismiss action chips), Correlation Row (description + strength indicator bar + feedback buttons), Best Day Checklist (factor rows with real-time matched/unmatched status + progress bar), Prediction Display (large predicted value + accuracy badge + basis text), Insight Feedback Row (insight text + purple dot + inline thumbs up/down), Knowledge Graph Link Card (purple-accented navigation card to graph sub-screen)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-14.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/intelligence`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q31 breathing active sessions use a focused immersive mode without the tab bar.
- Q32 celebration route is a QA fixture; production requires event triggers.
- Q36 social V1 stays friends/private-first.
- Q37 accountability/competitions activation requires Plus and social consent.
- Q38 competitions support private/self-only challenges.
- Q40 paywall models IAP-adjacent states without live billing.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B14-F07 | major | trust-privacy | Add contradiction resolution and dismissal flows with source review, correction options, undo, and persisted state. |
| B14-F08 | major | information-architecture | Wire overflow settings/export/about, time-range state, all-correlations drill-down, and weekly report detail. |
| B14-F09 | major | accessibility | Expand controls to 44px hit areas and make insight feedback buttons operable with pressed/selected semantics. |

### Prototype Implications

- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

