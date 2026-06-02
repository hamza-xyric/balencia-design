# Screen Design: Competitions

**Screen**: 47 of 73
**File**: 47-competitions.md
**Register**: Social Mode (brand-orange #FF5E00)
**Primary action**: browse, join, and compete in health challenges
**Tab**: Explore tab or Social section
**Navigation**: Stack depth 2-3 from Explore or Social entry. Entry from Explore [18] grid card, SIA deep-link [09] ("a new competition matches your fitness goals"), Leaderboard [39] competitions teaser, Community [40] room-based challenge link, or push notification. Exit via back button to Explore. Competition Detail is a sub-screen pushed further onto the stack.

---

## Purpose

This screen is the competitive social layer — structured challenges where users compete against each other (or themselves) on health and wellness metrics over a defined time period. It answers "what can I compete in right now, and how am I doing?" Competitions can be AI-generated (personalized to the user's goals and domains) or admin-created (community-wide events). The scoring system uses the existing XP and habit-completion infrastructure, with anti-cheat policies enforced server-side. The philosophy remains "individual first, social as enhancement" — competitions are optional motivational accelerators, never requirements. The design emphasizes discovery (finding the right competition), participation (joining and tracking), and social energy (leaderboards, chat, live updates) while keeping the experience premium and mature. This screen requires Plus — competitions, leaderboards, and competition chat are social features gated behind the Plus tier.

---

## Information Architecture

**Hierarchy — Competition List** (what the user sees, in order of visual priority):
1. Screen header — "Competitions" title with back navigation
2. Hero banner — featured/active competition with countdown, participant count, prize
3. Filter chips — All, Active, Upcoming, Past, My Competitions
4. Invitation badges — pending invitations from friends (conditional)
5. AI-suggested competitions — personalized challenge recommendations
6. Competition cards list — browsable list of all competitions matching the active filter

**Hierarchy — Competition Detail** (pushed sub-screen):
1. Detail header — competition image/icon, name, back navigation
2. Competition info — description, rules, date range, participant count
3. Live leaderboard — top 10 + user's own position
4. Progress tracker — user's daily scores over the competition period
5. Competition chat — group discussion among participants
6. Join/Leave CTA — primary action

**User flow**:
- **Arrives from**: Explore [18] via "Competitions" card (stack push), SIA Chat [09] via deep-link, Leaderboard [39] via competitions teaser, Community [40] via room challenge link, push notification for invitations
- **Primary exit (Competition List)**: Back to Explore [18] (stack pop)
- **Primary exit (Competition Detail)**: Back to Competition List (stack pop)
- **Secondary exits**: User profile (bottom sheet from leaderboard row), SIA Chat [09] via AI suggestion tap (tab switch), Community [40] via chat deep-link

---

## Layout — Competition List View

**Scroll behavior**: FlatList (competition list can grow long, needs virtualized rendering)
**Tab bar visible**: Yes

### ASCII Wireframe — Competition List

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]    "Competitions"         │  <- Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  <- 16pt gap
│  ┌═════════════════════════════┐   │
│  ║  FEATURED                    ║   │  <- Hero Banner Card
│  ║  ┌──────┐                   ║   │     (--r-xl, 28pt)
│  ║  │ icon │  Step Challenge   ║   │     ink-brown-800 +
│  ║  └──────┘  May 25 - Jun 8  ║   │     orange gradient
│  ║                              ║   │     overlay at 8%
│  ║  234 participants            ║   │
│  ║  02d : 14h : 32m remaining  ║   │  <- Countdown timer
│  ║                              ║   │
│  ║  Prize: 500 XP + Gold Badge ║   │
│  ║  ┌──────────────────────┐   ║   │
│  ║  │     join now         │   ║   │  <- In-Card CTA
│  ║  └──────────────────────┘   ║   │
│  └═════════════════════════════┘   │
│                                     │  <- 16pt gap
│  [All][Active][Upcoming][Past][My] →│  <- Filter Chips
│                                     │     (horizontal scroll)
│                                     │  <- 16pt gap
│  ┌─────────────────────────────┐   │
│  │ 🔔 2 competition invitations│   │  <- Invitation Badge
│  │    from Sarah, Ahmed        │   │     (conditional)
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  SUGGESTED FOR YOU                  │  <- Eyebrow
│  ┌──────────┐ ┌──────────┐ ┌──  →│  <- AI Suggestions
│  │ 🎯 7-Day │ │ 🏋 Fit   │ │    │     horizontal scroll
│  │ Mindful  │ │ Feb      │ │    │
│  │ [AI]     │ │ [AI]     │ │    │
│  └──────────┘ └──────────┘ └──  │
│                                     │  <- 24pt gap
│  ALL COMPETITIONS                   │  <- Eyebrow
│  ┌─────────────────────────────┐   │
│  │ Step Challenge              │   │  <- Competition Card
│  │ [Admin] May 25-Jun 8       │   │
│  │ 234 participants  #12      │   │     your rank (if joined)
│  │              [view details] │   │
│  ├─────────────────────────────┤   │
│  │ Meditation Marathon         │   │
│  │ [AI] Jun 1-Jun 14          │   │  <- Competition Card
│  │ 89 participants             │   │
│  │              [join]         │   │
│  ├─────────────────────────────┤   │
│  │ Nutrition Challenge         │   │
│  │ [Admin] May 10-May 24      │   │  <- Past competition
│  │ 156 participants  #5       │   │
│  │              [view results] │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  <- Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Competition List (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "Competitions" title

2. **Hero Banner Card** — ~200pt
   - Purpose: Spotlight the featured/active competition to drive engagement
   - Content: Competition icon, name, date range, participant count, countdown timer, prize, join CTA

3. **Filter Chip Row** — 36pt + 16pt margins = 68pt
   - Purpose: Filter competitions by status or membership
   - Content: All, Active, Upcoming, Past, My Competitions

4. **Invitation Badge Card** — ~56pt (conditional)
   - Purpose: Surface pending competition invitations from friends
   - Content: Invitation count, inviter names, tap to view

5. **AI Suggestions Section** — ~160pt
   - Purpose: Personalized competition recommendations based on user goals
   - Content: Horizontal scroll of suggestion cards

6. **Competition Cards List** — Remaining height (FlatList)
   - Purpose: Full browsable list of competitions
   - Content: Individual competition cards

---

## Layout — Competition Detail View (Pushed Sub-screen)

**Scroll behavior**: ScrollView (mixed content — info, leaderboard, chart, chat preview)
**Tab bar visible**: Yes

### ASCII Wireframe — Competition Detail

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]  "Step Challenge"  [...] │  <- Detail Header (56pt)
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ┌──────┐                   │   │  <- Competition Info Card
│  │  │ icon │  Step Challenge   │   │
│  │  └──────┘  [Admin]          │   │
│  │                              │   │
│  │  Walk 10,000 steps daily    │   │
│  │  for two weeks. Highest     │   │
│  │  consistency wins.          │   │
│  │                              │   │
│  │  May 25 - Jun 8             │   │
│  │  02d : 14h : 32m remaining  │   │
│  │  234 participants           │   │
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  RULES                              │  <- Eyebrow
│  ┌─────────────────────────────┐   │
│  │  ▸ Complete 10,000 steps    │   │  <- Rules Section
│  │    daily to earn points     │   │     (expandable)
│  │  ▸ Bonus for streaks        │   │
│  │  ▸ Anti-cheat: verified     │   │
│  │    device data only         │   │
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  LEADERBOARD                        │  <- Eyebrow
│  ┌─────────────────────────────┐   │
│  │  #1  [av] Sarah    1,840   │   │  <- Rank Row (gold)
│  │  #2  [av] Ahmed    1,720   │   │  <- Rank Row (silver)
│  │  #3  [av] Lisa     1,650   │   │  <- Rank Row (bronze)
│  │  #4  [av] Omar     1,540   │   │
│  │  #5  [av] Priya    1,490   │   │
│  │  ...                        │   │
│  │  #10 [av] Khalid   1,120   │   │
│  ├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤   │
│  │  #12 [av] You      980     │   │  <- Your Position
│  │       ↑3 since yesterday   │   │     (orange border)
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  YOUR PROGRESS                      │  <- Eyebrow
│  ┌─────────────────────────────┐   │
│  │  Score: 980 pts             │   │  <- Progress Card
│  │  ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐   │   │     Daily score bars
│  │  │▓││▓││▓││░││▓││▓││ │   │   │     (mini bar chart)
│  │  │▓││▓││▓││░││▓││▓││ │   │   │
│  │  M  T  W  T  F  S  S      │   │
│  │  Avg: 140 pts/day          │   │
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  CHAT                               │  <- Eyebrow
│  ┌─────────────────────────────┐   │
│  │  [av] Sarah: Great run      │   │  <- Chat Preview
│  │  today everyone.            │   │     (last 2 messages)
│  │  [av] Ahmed: Almost caught  │   │
│  │  up to you.                 │   │
│  │  ┌──────────────────────┐   │   │
│  │  │   open chat          │   │   │  <- Open Chat CTA
│  │  └──────────────────────┘   │   │
│  └─────────────────────────────┘   │
│                                     │  <- 24pt gap
│  ┌─────────────────────────────┐   │
│  │       leave competition     │   │  <- Leave CTA
│  └─────────────────────────────┘   │     (destructive,
│                                     │      secondary style)
│  64pt bottom padding                │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  <- Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

---

## Components — Competition List View

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 44pt. Back chevron left + "Competitions" center (17pt Sora Semibold, white).
- **Size**: Full-width x 44pt

### Hero Banner Card
- **Purpose**: Spotlight the most relevant active competition to maximize engagement. This is the emotional hook of the screen — the user should immediately see something worth joining.
- **Data source**: API — `GET /api/competitions` with featured flag or highest-participation active competition
- **Visual treatment**: ink-brown-800 glassmorphism card with subtle orange radial gradient overlay at 8% (centered on the icon area). 28pt radius (--r-xl). 20pt padding. 16pt horizontal margins. 1.5pt border, orange (#FF5E00) at 25% opacity.
- **Content layout**:
  - Top-left: "FEATURED" eyebrow label — 10pt Sora Semibold, uppercase, orange (#FF5E00), +0.12em tracking
  - Competition icon area (left): 56pt square container, ink-900 bg, 14pt radius (--r-md). Icon: 28pt, white at 80%. Icon type based on competition category (steps: shoe, meditation: lotus, nutrition: leaf, fitness: dumbbell, general: trophy).
  - Competition name (right of icon, 12pt gap): 18pt Sora Semibold, white, 2 lines max
  - Date range (below name, 4pt gap): 13pt Sora Regular, white at 50%. Format: "May 25 - Jun 8"
  - Participant count (below date, 4pt gap): 13pt Sora Regular, white at 50%. Person icon (12pt, white at 40%) + "234 participants"
  - Countdown timer (below participant count, 12pt gap): Countdown display — "02d : 14h : 32m" in 20pt Sora Bold, white, `tabular-nums`. "remaining" in 13pt Sora Regular, white at 40%, 4pt right of countdown. Timer updates every second.
  - Prize row (below countdown, 8pt gap): Trophy icon (14pt, gold #FFD700) + prize text ("500 XP + Gold Badge") in 13pt Sora Semibold, white at 70%
  - Join CTA (bottom, 16pt gap): Full card content width, 48pt height, orange (#FF5E00) fill, "join now" in 16pt Sora Semibold white, --r-pill. Becomes "view details" (secondary style — transparent, 1pt white at 20% border) if user has already joined.
- **Variants**: Active competition (countdown visible, join CTA), Upcoming competition (countdown shows "starts in 3d : 12h", CTA reads "remind me"), No featured (hidden — next section shifts up)
- **Gestures**: Tap card body navigates to Competition Detail (stack push), tap CTA to join/view
- **Size**: Full-width minus 32pt x ~200pt

### Filter Chip Row
- **Purpose**: Filter competition list by status or user membership
- **Data source**: View state (local), triggers API reload on change
- **Visual treatment**: Identical to Filter Chip / Filter Tab Row pattern from _shared-patterns.md. Horizontal ScrollView.
- **Content**:
  - Chips: "all" / "active" / "upcoming" / "past" / "my competitions"
  - Chip height: 36pt, --r-pill
  - Inactive: ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold white at 60%
  - Active: orange (#FF5E00) bg, white text
  - Gap: 8pt between chips, 16pt leading margin
  - "my competitions" chip: Shows count badge if user has active entries — "(3)" appended in same style
- **Variants**: All (default), Active, Upcoming, Past, My Competitions
- **Gestures**: Tap to switch filter, horizontal scroll
- **Size**: Full-width x 36pt (plus 16pt vertical margins)

### Invitation Badge Card
- **Purpose**: Surface pending competition invitations to drive social engagement
- **Data source**: API — `GET /api/competitions` invitation data or dedicated endpoint for pending invitations
- **Visual treatment**: ink-brown-800 glassmorphism card, 14pt radius (--r-md), 16pt padding, 16pt horizontal margins. Orange left border accent (3pt, #FF5E00 at 60%). Bell icon (16pt, orange) left-aligned.
- **Content**:
  - Icon: Bell with notification dot (16pt, orange)
  - Text: "2 competition invitations" in 15pt Sora Semibold, white. Below: "from Sarah, Ahmed" in 13pt Sora Regular, white at 50%, max 1 line, truncated.
  - Chevron: right-aligned, 14pt, white at 30%
- **Variants**: Single invitation ("Sarah invited you to Step Challenge"), Multiple ("2 competition invitations from Sarah, Ahmed"), None (card hidden)
- **Gestures**: Tap opens Invitation List (bottom sheet)
- **Size**: Full-width minus 32pt x ~56pt

### AI Suggestions Section
- **Purpose**: Personalized competition recommendations generated by SIA based on user's active goals, domains, and engagement patterns
- **Data source**: API — AI-generated competition suggestions (competition_type: 'ai_generated')
- **Visual treatment**: Follows the Suggested For You pattern from Explore [18].
- **Content**:
  - Eyebrow header: "SUGGESTED FOR YOU" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking, 16pt left margin
  - Horizontal ScrollView of suggestion cards (12pt gap, 16pt content insets):
    - Card width: 140pt, height: 110pt
    - Background: ink-brown-800 glassmorphism, 14pt radius (--r-md), 12pt padding
    - Top: Category emoji/icon (20pt) + "AI" badge — 10pt Sora Semibold, purple (#7F24FF) bg at 15%, purple text, --r-pill, 6pt horizontal / 2pt vertical padding. Positioned top-right.
    - Competition name: 14pt Sora Semibold, white, 2 lines max, 8pt below icon
    - Duration hint: "7 days" or "2 weeks" — 12pt Sora Regular, white at 40%, 4pt below name
    - Tap: Opens AI competition preview sheet (description, projected difficulty based on user data, "start challenge" CTA)
- **Variants**: AI-populated (2-5 cards), Hidden (if AI suggestions unavailable or all dismissed)
- **Gestures**: Horizontal scroll, tap card for preview
- **Size**: Full-width x ~160pt (eyebrow 20pt + 16pt gap + 110pt cards + 14pt bottom margin)

### Competition Card
- **Purpose**: Individual competition entry in the main list
- **Data source**: API — `GET /api/competitions` list with pagination
- **Visual treatment**: Rows within a continuous ink-brown-800 glassmorphism card. 14pt radius (--r-md) on outer card. Each row separated by 1pt white at 5%. 16pt horizontal margins on outer card.
- **Content per card** (~88pt tall, 16pt padding):
  - Top row:
    - Competition name: 16pt Sora Semibold, white, single line, truncated
    - Type badge (right-aligned): "AI" or "Admin" — 10pt Sora Semibold, uppercase. AI: purple (#7F24FF) bg at 15%, purple text. Admin: white at 10% bg, white at 60% text. Both --r-pill, 8pt horizontal / 3pt vertical padding.
  - Middle row (4pt below top):
    - Date range: 13pt Sora Regular, white at 50%. Format: "May 25 - Jun 8"
    - Status indicator (8pt right of date): Colored dot (6pt) **plus a visible glyph + label** (never colour-alone), per S47-V05. Active: ● green (#34A853). Upcoming: ◷ orange (#FF5E00). Past/Ended: ✓ white at 30%/20%. Cancelled: ⊘ red (#F44336). The glyph carries the meaning for colour-blind/AT users; colour reinforces.
  - Bottom row (8pt below middle):
    - Left: Person icon (12pt, white at 40%) + participant count ("234 participants") in 13pt Sora Regular, white at 40%
    - Center (conditional): If user joined — "Your rank: #12" in 13pt Sora Semibold, orange (#FF5E00)
    - Right: CTA text link — "join" (orange, 13pt Sora Semibold) for unjoin competitions, "view details" (white at 60%, 13pt Sora Regular) for joined, "view results" (white at 50%, 13pt Sora Regular) for past
- **Variants**:
  - Active + not joined: green status dot, "join" CTA
  - Active + joined: green status dot, rank displayed, "view details" CTA
  - Upcoming: orange status dot, "remind me" CTA
  - Past + participated: gray dot, rank displayed, "view results" CTA
  - Past + not participated: gray dot, "view results" CTA
- **Gestures**: Tap card body navigates to Competition Detail (stack push), tap CTA for quick action
- **Size**: Full-width minus 32pt x ~88pt per card

### Invitation List (Bottom Sheet)
- **Purpose**: View and respond to pending competition invitations
- **Data source**: API — competition_invitations table, status: pending
- **Visual treatment**: Bottom sheet, ~50% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Title: "invitations (2)" — 17pt Sora Semibold, white, left-aligned, 16pt padding
  - Invitation rows (80pt each):
    - Left: Inviter avatar (36pt circle)
    - Content: Inviter name (15pt Sora Semibold, white) + competition name (13pt Sora Regular, white at 60%) + date range (12pt Sora Regular, white at 40%)
    - Right: "accept" pill (orange bg, white text, 32pt height, --r-pill, 12pt horizontal padding) + "decline" text (13pt, white at 40%, 8pt right)
  - Divider: 1pt white at 5% between rows
- **Gestures**: Tap accept/decline, drag to dismiss sheet

### AI Competition Preview Sheet (Bottom Sheet)
- **Purpose**: Preview an AI-suggested competition before joining
- **Data source**: API — AI competition detail + user fitness projection
- **Visual treatment**: Bottom sheet, ~55% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Competition emoji/icon (40pt, centered)
  - Competition name: 18pt Sora Semibold, white, centered, 12pt below icon
  - Description: 14pt Sora Regular, white at 60%, centered, max 3 lines, 8pt below name
  - Duration: "7 days" — 14pt Sora Regular, white at 40%, centered
  - Difficulty indicator: 3 dots (8pt each, 6pt gap). Easy: 1 orange, 2 white at 15%. Medium: 2 orange, 1 white at 15%. Hard: 3 orange. Label below: "based on your current activity" in 12pt Sora Regular, white at 30%.
  - Purple dot (6pt, #7F24FF) + SIA note: "this aligns with your fitness goals" — 13pt Sora Regular, white at 70%, 16pt below difficulty
  - "start challenge" button: Full-width orange CTA (Brand CTA Button, 56pt, --r-pill)
  - "maybe later" link: 14pt, white at 50%, center-aligned, 12pt below CTA
- **Gestures**: Tap start to join, maybe later to dismiss, drag to dismiss

---

## Components — Competition Detail View

### Detail Header
- **Purpose**: Competition identification, navigation, overflow menu
- **Data source**: Competition data
- **Visual treatment**: ink-900 background, 56pt, FIXED (sticky on scroll, z-30, backdrop-blur on scroll)
- **Content**:
  - Left: Back chevron (44x44pt touch target)
  - Center: Competition name (16pt Sora Semibold, white, truncated)
  - Right: Overflow menu icon (three dots, 20pt, white at 60%, 44x44pt touch target). Opens action sheet: "share competition", "report issue", "mute notifications"
- **Gestures**: Tap back, tap overflow for action sheet
- **Size**: Full-width x 56pt

### Competition Info Card
- **Purpose**: Full competition details — the user's primary source of "what is this and why should I care?"
- **Data source**: API — `GET /api/competitions/:id`
- **Visual treatment**: ink-brown-800 glassmorphism card, 28pt radius (--r-xl), 24pt padding, 16pt horizontal margins.
- **Content**:
  - Competition icon: 56pt square container, ink-900 bg, 14pt radius, centered icon (28pt, white at 80%)
  - Name: 20pt Sora Semibold, white, left-aligned, 12pt right of icon
  - Type badge: Same spec as Competition Card type badge, below name
  - Description: 15pt Sora Regular, white at 70%, max 4 lines, 12pt below badge. Full text expandable via "read more" link (13pt, orange).
  - Date range: Calendar icon (14pt, white at 40%) + "May 25 - Jun 8" in 14pt Sora Regular, white at 60%. 12pt below description.
  - Countdown timer: Same spec as Hero Banner countdown. 20pt Sora Bold, white, `tabular-nums`. 8pt below date.
  - Participant count: Person icon (14pt, white at 40%) + "234 participants" in 14pt Sora Regular, white at 50%. 8pt below countdown.
- **Size**: Full-width minus 32pt x auto-height (~180pt)

### Rules Section
- **Purpose**: Competition rules and eligibility criteria
- **Data source**: API — competition.rules, competition.eligibility, competition.anti_cheat_policy
- **Visual treatment**: Expandable/Collapsible Section pattern. Default: expanded (first 3 rules visible). Chevron rotates on toggle.
- **Content**:
  - Eyebrow: "RULES" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Rule items: Bulleted list, 14pt Sora Regular, white at 70%. Bullet: orange dot (6pt). 8pt gap between items. 12pt left indent.
  - Anti-cheat note (last item): Shield icon (14pt, white at 40%) + "verified device data only" in 13pt Sora Regular, white at 40%. Italic.
  - Eligibility note (conditional): If competition has eligibility requirements — "Requires: [criteria]" in 13pt Sora Regular, orange at 80%.
- **Gestures**: Tap header to expand/collapse
- **Size**: Auto-height, ~120pt expanded

### Competition Leaderboard
- **Purpose**: Top 10 rankings + user's own position within this competition
- **Data source**: API — `GET /api/competitions/:id/leaderboard` + `GET /api/competitions/:id/my-ranking`
- **Visual treatment**: Follows the Leaderboard Rank Row pattern from Screen [39] with competition-specific adaptations.
- **Content**:
  - Eyebrow + "see all" link: "LEADERBOARD" (11pt Sora Semibold, white at 40%) + "see all" (13pt Sora Regular, orange, right-aligned)
  - Top 3 rows with podium accent colors:
    - #1: Gold (#FFD700) rank number, 17pt Sora Bold
    - #2: Silver (#C0C0C0) rank number
    - #3: Bronze (#CD7F32) rank number
  - Rows 4-10: Standard white rank number
  - Each row (56pt tall): Rank number (28pt wide area, 15pt Sora Bold) + Avatar (32pt circle, 8pt gap) + Name (14pt Sora Semibold, white, truncated) + Score (right-aligned, 14pt Sora Semibold, white, `tabular-nums`)
  - Separator: Dashed 1pt white at 8% line before user's position
  - User's own position row (64pt tall): Same layout as rank rows but with orange left border accent (3pt, #FF5E00). Rank change indicator below name: "up 3 since yesterday" in 12pt Sora Regular, green (#34A853) with up-arrow. "down 2" in white at 40% (--color-alpha-white-40) with a neutral down-arrow (never red/orange — per S47-V05 + VK-012 PodiumRank). "same" in white at 40%. Glyph + number always; never colour-alone.
  - Card container: ink-brown-800 glassmorphism, 14pt radius
- **Variants**: User in top 10 (own row highlighted in-place, no separator), User below top 10 (separator + pinned own row below), Not joined (leaderboard shown but no own position — "join to see your rank" text link in orange)
- **Gestures**: Tap "see all" pushes full leaderboard view, tap rank row opens limited user profile (bottom sheet, same as Screen 39 — includes overflow menu with report/block)

### Competitor Report/Block (from leaderboard profile or chat)
- **Purpose**: Allow users to report or block a competitor within the competition context
- **Trigger**: Tap the three-dot overflow menu icon (20pt, white at 60%, top-right, 44x44pt touch target) in the Limited User Profile bottom sheet opened from a competition leaderboard rank row or from the Competition Chat participant list.
- **Overflow menu content**: Context menu card, ink-900 bg, 14pt radius (--r-md), --shadow-3 elevation. Right-aligned below the overflow icon.
  - "Report" row (48pt tall, 16pt horizontal padding): Flag icon (16pt, white at 60%) + "report" in 15pt Sora Regular, white at 80%.
  - Separator: 1pt white at 5%
  - "Block" row (48pt tall, 16pt horizontal padding): Block icon (16pt, #F44336) + "block" in 15pt Sora Regular, #F44336.
- **Behavior**:
  - Tap "Report": Dismisses context menu and profile sheet, navigates to Report/Block flow [64] with competitor pre-filled as the subject.
  - Tap "Block": Dismisses context menu, shows inline Block Confirmation within the profile sheet.
- **Block Confirmation** (inline, replaces bottom half of profile sheet content):
  - Warning text: "block [name]?" in 17pt Sora Semibold, white, centered
  - Explanation: "they won't be able to see you on leaderboards." in 14pt Sora Regular, white at 50%, centered, 8pt below warning
  - Button row (16pt below explanation, centered, 16pt gap):
    - "Block" button: 15pt Sora Semibold, #F44336 (error-red) text, 44pt height, 80pt min-width, transparent bg.
    - "Cancel" button: 15pt Sora Semibold, white at 50% text, 44pt height, 80pt min-width, transparent bg.
  - Tap "Block": Calls POST /api/users/:id/block, dismisses sheet. Blocked user is hidden from the competition leaderboard and their messages hidden in Competition Chat. Toast: "user blocked" (top, 3s auto-dismiss).
  - Tap "Cancel": Returns to standard profile sheet content (crossfade, 280ms).
- **Size**: Full-width minus 32pt x auto-height (~440pt for 10 rows + own position)

### Progress Tracker Card
- **Purpose**: Visualize the user's daily competition scores over the competition period
- **Data source**: API — user's daily scores from competition_entries
- **Visual treatment**: ink-brown-800 glassmorphism card, 28pt radius (--r-xl), 24pt padding, 16pt horizontal margins.
- **Content**:
  - Eyebrow: "YOUR PROGRESS" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Total score: "980 pts" in 20pt Sora Bold, white, left-aligned, 12pt below eyebrow
  - Mini bar chart: 7 vertical bars (one per day of the current week), evenly spaced across card width minus padding.
    - Bar width: 20pt, --r-sm (10pt) top corners
    - Bar max height: 64pt
    - Filled: orange (#FF5E00), height proportional to daily score
    - Empty/future: white at 8%
    - Today (if in progress): orange at 50% (partial fill)
    - Day label below: 12pt Sora Regular, white at 40% ("M", "T", "W", etc.)
  - Average: "avg: 140 pts/day" in 13pt Sora Regular, white at 50%, right-aligned below chart
  - For competitions longer than 7 days: horizontal scroll of 7-day chunks, dot pagination at bottom
- **Variants**: Active (bars filling, today highlighted), Completed (all bars filled, total score prominent), Not yet started ("starts in 3 days" centered text)
- **Gestures**: Tap bar to see daily detail tooltip (score + date, 280ms fade-in popup)
- **Size**: Full-width minus 32pt x ~180pt

### Chat Preview Card
- **Purpose**: Show recent competition chat activity and provide entry to the full chat
- **Data source**: API — `GET /api/competition-chat/:competitionId/chat` (last 2 messages)
- **Visual treatment**: ink-brown-800 glassmorphism card, 28pt radius (--r-xl), 24pt padding, 16pt horizontal margins.
- **Content**:
  - Eyebrow: "CHAT" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Last 2 messages: Simplified chat row — avatar (24pt circle) + sender name (12pt Sora Semibold, white at 50%) + message preview (13pt Sora Regular, white at 60%, 1 line max, truncated). 8pt gap between messages.
  - Unread indicator (conditional): Orange dot (6pt) right of "CHAT" eyebrow + unread count
  - "open chat" button: Full card content width, 40pt height, transparent bg, 1pt white at 15% border, "open chat" in 14pt Sora Semibold, white at 70%, --r-pill. Center-aligned.
- **Variants**: Messages present (show preview + button), No messages yet ("be the first to say something" in 13pt, white at 40%), Not joined ("join to access chat" in 13pt, orange)
- **Gestures**: Tap "open chat" pushes Competition Chat sub-screen (full chat view, identical to Room Interior from Screen 40 with competition branding), tap message preview also opens chat
- **Size**: Full-width minus 32pt x ~140pt

### Join CTA Button
- **Purpose**: Primary action to join the competition
- **Data source**: API — `POST /api/competitions/:id/join`
- **Visual treatment**: Brand CTA Button pattern. Full-width minus 32pt, 56pt height, orange (#FF5E00) fill, "join competition" in 17pt Sora Semibold white, --r-pill. Fixed at bottom of scroll content (not sticky — scrolls with content), 24pt above bottom padding.
- **Variants**:
  - Not joined: "join competition" — orange fill (primary CTA)
  - Already joined: Hidden (replaced by Leave CTA at bottom)
  - Competition full: "competition full" — disabled (40% opacity)
  - Not eligible: "not eligible" — disabled, tooltip explains eligibility requirement
  - Upcoming: "remind me" — secondary style (transparent bg, 1pt orange border, orange text)
- **Gestures**: Tap to join
- **Size**: Full-width minus 32pt x 56pt

### Leave CTA Button
- **Purpose**: Allow user to withdraw from a competition
- **Data source**: API — `POST /api/competitions/:id/leave`
- **Visual treatment**: Secondary destructive style. Full-width minus 32pt, 48pt height, transparent bg, 1pt border white at 15%, "leave competition" in 15pt Sora Regular, white at 50%, --r-pill. Positioned at very bottom of scroll content, 24pt above bottom padding.
- **Variants**: Active competition (visible when joined), Past competition (hidden), Pre-competition (visible, text: "withdraw")
- **Gestures**: Tap opens confirmation sheet ("are you sure? your progress will be lost." + "leave" red CTA + "stay" cancel)
- **Size**: Full-width minus 32pt x 48pt

### Leave Confirmation Sheet (Bottom Sheet)
- **Purpose**: Confirm competition withdrawal to prevent accidental exits
- **Visual treatment**: Bottom sheet, ~30% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Warning icon: 40pt, orange (#FF5E00), centered
  - Title: "leave competition?" in 18pt Sora Semibold, white, centered, 16pt below icon
  - Description: "your progress and ranking will be lost." in 14pt Sora Regular, white at 60%, centered
  - "leave" button: Full-width minus 32pt, 48pt, red (#F44336) fill, white text, --r-pill
  - "stay" link: 14pt, white at 50%, centered, 12pt below button
- **Gestures**: Tap leave to confirm, tap stay or drag to dismiss

---

## Visualization

> Source: embedded section (no companion file — Batch 5). Audited in `viz-audit/` — Batch 5 (Social/Leaderboard, **template D**), findings `S47-V01..V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **Mints no new primitive** — it reuses `VK-012` PodiumRank (minted by Leaderboard [39] this batch) and composes `GaugeRing` / `MomentumBar` / `BarChart` / `KPIStatTile` / `TrendChart` from the frozen kit. Register = **Social Mode → orange-dominant**; podium gold/silver/bronze + mission-tier colours are the *sanctioned identity exceptions* (rank/prize convention only — never on data ink), purple is confined to the AI/SIA badge + suggestion note. Benchmark = **Strava segments + Duolingo leagues**, rendered the Balencia way (warm-glow GaugeRing + Living Line), **not** a Strava/Duolingo clone, and explicitly **non-shaming** — cooperative "you-vs-goal / climbing" framing over toxic head-to-head. **Current grade D (52) → specced-target A− (85).** *(Honest re-grade under the revised 10-dimension rubric. The residual gap to A+++ is build-verified arc-gradient depth + working scrub/drill micro-interactions + per-competition series data, owned by the later viz-build program.)*

This is a **two-view** screen: a **Competition List** (discovery — hero banner, filters, suggestions, cards) and a pushed **Competition Detail** (participation — info, leaderboard, your progress, chat). The visualization opportunity lives almost entirely in the *Detail* view and the *hero banner*: the user's job there is "how am I doing, how much time is left, where do I rank, and is my trajectory up?" — four bounded/temporal/ranked questions that today render as bare countdown text, a flat vertical mini-bar block, podium-coloured *text* rows, and a single "↑3 since yesterday" string. This section upgrades *how that data reads* — a competition-progress hero (you-vs-goal + time-remaining), a podium+rank standings module, an honest per-day standings bar pair, and a rank-trajectory Living Line — **without** displacing the join/leave CTAs, the chat, or the discovery list, which stay as content/navigation.

> **Component reality (spec-vs-build diff — each gap is a finding):** the prototype route `/features/competitions` renders **only the List view** (`page.tsx`) — the entire Detail view (leaderboard, progress tracker, your-position, rank-change) **is not built**, so its data is wholly un-visualized today (`S47-V02`, `S47-V03`, `S47-V04`). On the List view: the **countdown** is plain `tabular-nums` text with no time-remaining geometry (`S47-V01`); the **status** is a `h-1.5 w-1.5 rounded-full` colour dot marked `aria-hidden="true"` (colour-alone + a 1.4.11 miss — `S47-V05`); the hero **prize/participant** figures are flat text. The spec's Detail "Progress Bar Chart" describes **7 raw vertical bars** (flat orange, white/8 future) — honest in spirit but a bespoke one-off where `BarChart` (`VK-006`) + `MomentumBar` (`VK-004`) exist. These are the resolution gaps this section closes.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Your competition progress (you-vs-goal % + time-remaining) | countdown text only; no progress geometry | **hero competition-progress module** — a `GaugeRing` (your-score / goal, cooperative) **paired with** a `MomentumBar` time-remaining (elapsed→deadline, continuous orange→green) | `GaugeRing` + `MomentumBar` (`VK-002` / `VK-004`) — **the Detail hero** |
| Countdown "02d : 14h : 32m remaining" (hero + info card) | bare `tabular-nums` text | a thin **`MomentumBar` time-elapsed track** under the countdown (visual "how far through the window") — never weaponised | `MomentumBar` (`VK-004`) |
| Top-10 standings + your own position (rank, name, score) | podium-*coloured text* rows + orange-border own row (Detail — unbuilt) | **`VK-012` PodiumRank** — top-3 podium + ranked score rows + pinned own-position row, podium gold/silver/bronze identity | `PodiumRank` (`VK-012`, reused from [39]) |
| Standings as comparable scores (your score vs leaders / field) | scores as right-aligned text | **`BarChart` / StatBars** — horizontal score bars, **one shared scale, zero baseline**; your bar orange, others neutral; **bracket/cohort comparison** | `BarChart` / StatBars (`VK-006`) |
| Your daily competition scores over the period (7+ days) | flat 7 vertical bars (orange / white-8) | **per-day `BarChart`** — your-day orange vs cohort-average green (cooperative compare), zero baseline, shared scale; tooltip on tap | `BarChart` (`VK-006`) |
| Your rank trajectory over the period + projected final rank | "↑3 since yesterday" text; high-motiv "dotted orange projection" line | **rank-trajectory `TrendChart`** (Living Line) — solid orange actual → **dashed-purple SIA** projected final rank (§11) | `TrendChart` (`VK-006` / `VK-016`) |
| Hero/info KPIs — participants (234), prize (500 XP + Gold), your rank (#12) | flat text + trophy icon | **`KPIStatTile` row** (participants · your-rank + honest "since yesterday" Δ · prize) — number + label + disclosed delta | `KPIStatTile` (`VK-008`) |
| Status (active / upcoming / past / ended / cancelled) | colour-only dot (`aria-hidden`) | **status sign** — dot **+ visible glyph/label** (● active / ◷ upcoming / ✓ ended) | (sign upgrade, no new primitive) |
| Type badge (AI / Admin), competition name, dates, rules, description, chat, difficulty dots | text / pills | — (deliberately textual) | — |

**Editorial hierarchy (calm, not maximal):** the **Detail hero = the competition-progress module** (one `GaugeRing` + its time-remaining `MomentumBar`) is the single focal viz; PodiumRank standings, the daily-score bars, the rank-trajectory line and the KPI row are clearly secondary; the List view stays a discovery surface with the hero banner's lightweight time-elapsed bar as its only chart. One focal viz per view — not a wall of equal charts.

### 1 · Competition-progress hero — `S47-V01`  → `GaugeRing` + `MomentumBar`

Promote the Detail view's central question — "how am I doing against the goal, and how much time is left?" — into the screen's **one viz hero**, framed **cooperatively** (you-vs-goal / you-vs-your-own-target), never as a head-to-head shaming gauge.
- **You-vs-goal `GaugeRing`** (hero 96px): your competition score as a share of the competition's *completion goal* (e.g. cumulative target steps / total possible points), arc-following `--grad-orange` **(mint)** via conic-mask (*not* a flat SVG `linearGradient`), full `--glow-orange` (32px, hero-only), `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled track under the `--color-alpha-white-10` track, center value (`text-h2`, count-up 520ms `--ease-flow`) + "of goal" label, `ticks` (12 radial, hero gauge). **Green `#34A853` at 100% / in-range** = goal reached (arrival), with a visible ✓ — never recoloured to alarm-red at a low value.
- **Time-remaining `MomentumBar`** (8px, beneath the gauge, the brand-correct surface for the countdown): a **single continuous** orange→green fill = fraction of the window *elapsed*, `--grad-progress` **(mint)**, track `--color-alpha-white-08`, radius-pill. The numeric "02d : 14h : 32m remaining" stays above it as the literal readout. **Non-shaming:** the bar frames *progress through the window*, never a loss-aversion "you're running out" red countdown; at <24h it stays orange with a calm "final day" label, not an alarm treatment.
- **Why a gauge + bar, the Balencia way:** Strava/Duolingo show a leaderboard-first scoreboard; we lead with the user's *own* bounded progress (the "individual first, social as enhancement" philosophy in §Purpose) rendered in the same warm `GaugeRing` instrument family used for recovery [26], sleep [58], and every domain score — so competition progress reads as one app, not a borrowed scoreboard.
- **Depth:** the 96px gauge carries the 32px hero glow; the `MomentumBar` carries no glow (depth lives in the gauge). Card surface `ink-brown-800` + top-edge highlight.
- **Micro-interaction:** tap the gauge → expand a "what counts toward this goal" tooltip (the rules summary in place); the bar is non-interactive (informational).
- **States:** **just joined / Day-1** → gauge at a **ghosted 0-of-goal** dashed arc (no-data ≠ a real filled 0) + "just joined — start earning points" + time-bar at its true elapsed fraction; **upcoming** (not started) → gauge ghosted + "starts in 3d : 12h", time-bar empty with a dashed start-foot; **loading** → skeleton arc with radial shimmer that *morphs* into the drawn fill; **ended** → gauge frozen at final value with a green ✓ if goal met (or neutral if not — never a red "failed"), time-bar full + "ENDED"; **error** → ghosted arc + inline retry (per Error Handling table).
- **Data:** new `competitionDetail.progress` (`{ score, goal, windowStart, windowEnd, elapsedFraction }`) in `mock.ts` (the Detail view is currently un-built).

### 2 · Standings — PodiumRank + score bars — `S47-V02`  → `VK-012` PodiumRank + `BarChart`

Resolve the Detail leaderboard (top-10 + your position) from podium-*coloured text* into the kit's standings module, **reusing `VK-012` PodiumRank** (minted by Leaderboard [39] this batch — do **not** re-invent it here).
- **PodiumRank:** top-3 podium treatment + ranked score rows + a **pinned own-position row** (3pt `--color-brand-orange` left border) below a dashed `--color-alpha-white-08` separator when the user is outside the top 10. Rank numbers use `--color-podium-gold` / `--color-podium-silver` / `--color-podium-bronze` (existing tokens) as **identity convention only** — gold/silver/bronze never bleed onto bars, CTAs, or other data ink (the contained podium exception, per `CONSISTENCY.md` §5). Each row: rank · avatar · name · score (`tabular-nums`, right-aligned).
- **StatBars (`BarChart`) comparison layer:** beside/under each top row, a thin **horizontal score bar** on **one shared scale, zero baseline** so the *gap* between scores is honest and legible (text scores alone hide magnitude). **Your bar = `--color-brand-orange`; other competitors = `--color-alpha-white-25` neutral** — cooperative, not a red-vs-you duel. Optional **bracket/cohort** mode for elimination/group competitions reuses the same shared-scale bars grouped by bracket.
- **Non-shaming (ethical gate):** standings frame *position in a shared effort* — the own-row says "you're climbing" / "you're in the top 10%", never "you're losing to N people"; a low rank surfaces a constructive lever ("3 more days of logging to move up"), not a deficit verdict. Tie-for-first shows the **same rank number** for tied users (per §Edge Cases), never an arbitrary winner.
- **Depth:** PodiumRank podium plinths carry a faint warm backplate; bars rise `--dur-slow` 520ms `--ease-flow`, rounded caps, no glow. Card `ink-brown-800`.
- **Micro-interaction:** tap a row → limited user-profile sheet (existing); "see all" → full leaderboard (Screen [39] pattern); your-row tap → scrolls the trajectory line (`S47-V04`) into view.
- **States:** **not joined** → standings shown but **no own row** + a "join to see your rank" orange link (no fabricated rank); **<3 participants** → podium degrades gracefully to a flat ranked list (no empty plinths); **loading** → row skeletons; **error** → "could not load leaderboard" + orange retry (per Error Handling).
- **Data:** new `competitionDetail.leaderboard[]` (rank, name, avatar, score) + `competitionDetail.myRanking` (rank, score, delta) in `mock.ts`.

### 3 · Your daily scores — `S47-V03`  → `BarChart` (your-day orange vs cohort-avg green)

Replace the spec's bespoke 7 raw vertical bars with a kit `BarChart` (wraps `components/charts/BarChart.tsx`) of your **daily competition scores** across the period: **your-day bars `--color-brand-orange`, cohort-average bars `--color-forest-green`** (the §11 compare law repurposed *cooperatively* — green = "the field", a benchmark to climb toward, not an opponent), **zero baseline, one shared y-scale** (honest — no truncated/dual axis). 7-day window with horizontal scroll + dot pagination for longer competitions (per the existing Progress Tracker spec).
- **Honesty:** a no-score day is a true **zero-height** baseline tick, visually distinct from a **ghosted/dashed** un-synced day; today-in-progress = a 50%-opacity partial bar (per existing spec), not a phantom full bar.
- **Depth:** bars rise `--dur-slow` 520ms `--ease-flow`, rounded top caps, `ink-brown-800` backplate + top-edge highlight, no glow. "avg: 140 pts/day" stays as a `KPIStatTile`-style footer figure.
- **Micro-interaction:** tap a day-pair → tooltip with your score + the cohort average for that day (the existing "daily detail tooltip", upgraded to show both).
- **States:** **just joined** → all bars zero-height with axes drawn + "your scores appear here as you compete" (not a blank box); **single-day user** → cohort series ghosted with "not enough days to compare yet"; **loading** → axes + skeleton bars.
- **Data:** new `competitionDetail.dailyScores[]` (`{ day, you, cohortAvg }`) in `mock.ts`.

### 4 · Rank trajectory (Living Line) — `S47-V04`  → `TrendChart` (`VK-016`)

Resolve the high-motivation "dotted orange projection" hint and the "↑3 since yesterday" string into the signature: a full **Living Line** of your **rank (or cumulative score) over the competition period** — **one continuous, curved, round-capped stroke that draws itself**, running orange `#FF5E00` (effort) → green `#34A853` (arrival) via `--grad-progress` **(mint)**, green milestone dots on rank-up days, a `--grad-orange` area fade (≤25% top), and a **dashed-purple `#7F24FF` SIA projection** tail (§11 — the brand-sanctioned forecast colour, projecting your *final rank* if the trend holds, **not** a 60/30/10 violation). Curved monotone, `--stroke-thin` 2px actual / 2px dashed projection. *(For rank, the y-axis is inverted so "up" = better rank — labelled, not silently flipped.)*
- **Why the line, not a Duolingo league bar:** "every chart is the line" (§8) — the Living Line is the trajectory device leagues/segments structurally don't have; it makes the user's *direction* (climbing / projected to place) unmistakably Balencia and reuses the exact spine of the home/fitness trends.
- **Non-shaming:** the projection is framed as encouragement ("on track to finish ~#7") and is **hidden** until SIA has ≥3 days of data — never a discouraging "projected to drop" alarm; a downward trend is shown calmly (muted, no red), with a constructive coaching prompt.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow` — **never opacity-fades**; the dashed-purple projection draws after the actual line; scroll-into-view (below fold).
- **Micro-interaction:** long-press to scrub a crosshair across days (rank + score at that day); W/period selector if the competition spans multiple weeks.
- **States:** **cold-start (<3 days)** → "calibrating — your trajectory builds as you compete" with a faint flat baseline, **never** a single dot; projection hidden until enough data; reduced-motion → completed stroke at rest + green end/milestone dots + static dashed-purple tail.
- **Data:** new `competitionDetail.rankTrajectory` (per-day rank/score points + `projection`) in `mock.ts`.

### 5 · Hero/info KPIs + honest status — `S47-V05`  → `KPIStatTile` + status sign

Upgrade the hero banner + info-card figures from flat text into a `KPIStatTile` row and fix the colour-alone status dot.
- **`KPIStatTile` ×3** (Detail info card): **participants** (234) · **your rank** (#12, with the honest "since yesterday" Δ as the disclosed delta window — ▲ `--color-forest-green` up, ▼ `--color-alpha-white-40` down, **never red shaming**) · **prize** (500 XP + Gold Badge, trophy `--color-podium-gold` identity icon). Uppercase label (`white/40`, +0.12em) · number `text-h2` · count-up `--dur-base` 280ms `--ease-out-soft`.
- **Status sign (fixes `S47-V05` colour-alone defect):** the competition status dot — today a `aria-hidden` colour-only circle — becomes a **dot + visible glyph/label**: ● + "active" (green), ◷ + "upcoming" (orange), ✓ + "ended" (white/30), ⊘ + "cancelled" (red, per Edge Cases). The glyph carries the meaning for colour-blind/AT users; the colour reinforces.
- **Non-shaming / honesty:** the rank Δ uses the disclosed "since yesterday" window only (never a cherry-picked flattering range); a ▼ is a neutral muted arrow with no "you fell" language; the prize tile never manufactures scarcity ("only 2 spots left" urgency is explicitly out — the §Purpose "optional motivational accelerator" stance).
- **Depth:** KPI tiles are flat-premium (`ink-brown-800` + top-edge highlight, no glow — depth lives in the gauge). 
- **States:** **just joined** → rank tile reads "#— · just joined" with a `—` delta (no fabricated movement); **ended** → rank tile shows "final rank" replacing the delta; **loading** → label + skeleton number.
- **Data:** `competitionDetail.myRanking` + `featuredCompetition` (`mock.ts`).

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`, the **hero draws first** — the 96px competition-progress `GaugeRing` fills (`ring-animate`, 520ms `--ease-flow`) + ticks + center count-up, then its time-remaining `MomentumBar` fills (520ms) — **then** the `KPIStatTile` row counts up (280ms) → **then** `VK-012` PodiumRank rows stagger in (40ms/row from #1) with their score bars rising (520ms) and the own-position orange left-border extending 0→full (520ms `--ease-flow`) → **then** the daily-score bars rise (520ms, staggered) → **then** the rank-trajectory **Living Line draws itself** L→R (1200ms `stroke-draw`, *never* fade) with its dashed-purple projection drawing last. One line motif per surface (the trajectory is the only full Living Line; standings/daily use bars/numbers). Below-fold visuals (daily bars, trajectory) animate on **scroll-into-view**. On the **List view**, the hero banner's time-elapsed `MomentumBar` fills on mount; the join-success keeps its existing confetti burst (replaced by a simple green glow under reduced-motion). `prefers-reduced-motion` → every chart at final state instantly; the Living Line's static form (completed stroke + green end/milestone dots + static dashed-purple tail), the gauges' filled arcs, and the bars at final height preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / just-joined** — progress gauge ghosted-dashed at 0-of-goal (never a real 0% ring), daily bars zero-height with axes drawn, trajectory "calibrating", own-row "just joined — start earning points", KPI rank `#— · —` delta; **upcoming** — gauge ghosted + "starts in 3d : 12h", time-bar empty with dashed start-foot; **loading** — depth-preserving skeletons that *morph* into drawn data (arcs/axes/rows visible, radial / L-to-R shimmer — never blank discs); **partial** — un-synced days ghosted vs a true zero-height bar; missing leaderboard entries simply absent; **ended** — gauge frozen + green ✓ if goal met (neutral, never red, if not), standings show "FINAL", trajectory ends with final-rank dot; **cancelled** — standings/progress dimmed with a "cancelled by organizer" banner, no charts implying ongoing competition; **error** — chart-specific honesty (which module failed: "could not load leaderboard" on PodiumRank, daily bars independent) + a visible "retry", per the Error Handling table.
- **60/30/10 (Social Mode → orange-dominant):** **orange dominates** data ink (progress-gauge fill, time `MomentumBar`, your standings bar, your daily bars, Living-Line effort, KPI accents, own-position border); **green** = arrival/in-range/positive only (goal reached, cohort-average compare bars, milestone dots, ▲ rank-up delta); **purple stays SIA-only** — the **single sanctioned purple data element is the dashed-purple SIA rank projection** on the trajectory (§11 forecast, correct *not* a violation) alongside the existing AI-badge + suggestion-note purple. **Podium gold/silver/bronze** and **mission-tier `--color-mission-*` / prize colours** are confined to **rank/prize identity** (PodiumRank rank numbers, prize trophy, tier chips) — **never** on a CTA, eyebrow, bar fill, or generic data series. Glow uses the size-stepped scale (96px = 32px hero glow; bars / `MomentumBar` / sparklines = none) — warm depth, not neon. **No domain colours** on this screen (competitions are cross-domain social — correct).
- **Non-shaming (ethical gate, the template-D requirement):** standings frame *a shared climb*, not a duel — cooperative copy ("you're climbing", "top 10%", cohort-average as a benchmark not an opponent), the weakest position framed as a constructive lever; **no toxic head-to-head shaming**, no red "you're losing", no loss-aversion countdown weaponising the deadline, no manufactured scarcity on prizes/spots; rank deltas use an honest disclosed window; ties share a rank number. Low-motivation mode (per §Motivation Adaptation) de-emphasises ranking, collapses the leaderboard by default, and leads the gauge with "great start — keep going" framing.
- **Accessibility:** every gauge/bar/line/standings-row carries a text/`aria-label` equivalent conveying the same value ("Your progress 64 percent of goal", "Rank 12, you, 980 points, up 3 since yesterday", "on track to finish around rank 7"); **status uses a visible glyph (● / ◷ / ✓ / ⊘) plus label** — never colour alone (fixes the current `aria-hidden` colour-only dot, `S47-V05`); the cohort-vs-you bar pair is distinguished by a **visible legend + label**, not colour alone; label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — gauge arcs, the time `MomentumBar` fill, standings score bars, the Living-Line stroke, milestone dots, the own-position border, and the filled/unfilled boundary all meet ≥3:1 vs background (white/5 grid/axis is decorative-only); interactive chart targets (rows, bars, gauge, scrub) ≥ 44×44pt; `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Strava segments + Duolingo leagues (non-toxic) — *stays Balencia via the competition-progress GaugeRing hero + warm-glow surfaces on ink-brown + non-toxic cooperative framing, not a head-to-head duel or shame-driven countdown.*
**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the Visualization section specced the hero `GaugeRing` + `MomentumBar` + `PodiumRank` + daily bars + rank trajectory Living Line to A−, but the craft surfaces remain unfinished. (1) The Competition List hero banner is a flat orange gradient overlay without top-edge highlight or beveled depth. (2) Microcopy is partly unwritten (filter chip labels, invitation badge copy, AI suggestion preview tone, error-recovery strings). (3) Type line-heights and tracking are ad-hoc pixels ("13pt Sora Regular" without `--leading-*` / `--tracking-*`). (4) The competition status dot (● active / ◷ upcoming / ✓ ended) is colour-only; glyph + label missing (a 1.4.11 miss). (5) Cold-start / loading / partial-leaderboard states have no designed copy or layout — the list view shows no "start your first competition" warmth. (6) Contrast pairs are asserted in the Color Map, not tabulated per load-bearing element. (7) The competition card stack (hero banner, filter chips, suggested cards, competition cards) could read as a flat equal-weight wall without the focal hero + depth craft — no ownable anti-generic moment yet.

### Focal hierarchy

One focal point: the **hero banner card** (the featured/active competition with the countdown timer and participant count) — the only ≥96px surface above the fold, sized to command attention and draw the eye in <2s. The banner is positioned after the filter chips (which are intentionally secondary — a narrow 36pt utility row), and everything below it (AI suggestions, competition card list) is visibly secondary by size, hierarchy, and weight. The squint test lands on the hero banner's countdown timer + "join now" CTA first, then the competition name within the banner, then the filter chips as a control bar, then the suggestion scroll. No competing foci.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) on the hero banner and main competition cards · `--radius-md` (14pt) on smaller cards (suggestions, filter chips) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, critical for the hero banner which previously was flat orange gradient only) · `--shadow-1` on cards. The **hero banner (featured competition)** adds **`--surface-backplate`** (`CK-T02`) — a faint warm radial glow centered on the competition icon, so the banner reads as premium and elevated. Glow is size-calibrated per `CONSISTENCY.md §1`: **`--glow-orange` (32px /.45)** on the hero banner only (≥96px element); **no glow** on the suggestion cards (40–50pt each, borderline) or inline competition cards (72pt, below the glow threshold). Filter chip buttons use `--radius-pill`. All tracks (the countdown timer's time-remaining `MomentumBar` in the hero, progress bars in competition detail) carry `--track-inset` (`rgba(0,0,0,0.28)`) beveled recess under `--color-alpha-white-08` track. Extends the same layered, warm-glow language to the detail view's info card, leaderboard card, progress tracker, and chat preview card — so no surface reads as a flat box. Card padding: hero 32pt (`--spacing-8`), standard cards 24pt (`--spacing-6`), filter chips 12–16pt nested.

### Typographic rhythm

Re-map the Typography Map to `CK-P3` tokens: competition name (hero banner) `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100%; competition name (detail view) `--text-h1` (28pt) / 600 / `--leading-snug` / white 100%; eyebrow labels (filter chips, sections) the `.eyebrow` recipe (`--text-eyebrow` 12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / `--color-alpha-white-40`); countdown timer ("02d : 14h : 32m") `--text-h2` (20pt) / 700 / tabular-nums / white 100%; "remaining" label `--text-caption` (13pt) / 400 / `--leading-normal` (1.4) / `--color-alpha-white-40`; type badge (AI / Admin) `--text-small` (10pt) / 600 / uppercase / `--color-royal-purple` (AI) or `--color-alpha-white-60` (Admin); participant count, date range, leaderboard row names `--text-caption` (13pt) / 400 / `--leading-normal` / `--color-alpha-white-50/70`; leaderboard rank numbers `--text-h3` (17pt) / 700 / tabular-nums / `--color-podium-gold/silver/bronze` (top 3 only) or white 100%; your rank Δ ("up 3 since yesterday") `--text-small` (11pt) / 400 / `--color-forest-green` (up) or `--color-alpha-white-40` (down, never red) / leading arrow glyph + number (never colour-alone); button CTAs "join now" / "view details" `--text-body` (16pt) / 600 / white 100% on orange fill, or `--color-alpha-white-60` on secondary; stat figures (scores, XP, participant counts) tabular-nums. Hierarchy carried by **weight** (600–700 vs 400), not size alone; sentence case everywhere; ≤2 `--color-brand-orange` accent words per screen (the join CTAs + the "see all" leaderboard link already use orange at ~2 instances); Chillax stays logo-only. Replaces ad-hoc pixel line-heights (such as "4pt gap") with the `CK-T04` scale.

### Microcopy (before → after)

Every user-facing string authored to `CK-P5` brand voice:

- **Filter chips (chip labels)** — *before:* "All" / "Active" / "Upcoming" / "Past" / "My Competitions" (given) → *after (checked):* same, warm and clear; "My Competitions" shows count if ≥1 joined ("My competitions (3)"). (Already on-voice.)
- **Invitation badge** — *before:* "2 competition invitations from Sarah, Ahmed" (given) → *after:* same, warm, clear count. (Already on-voice.)
- **AI Suggestion card, difficulty label** — *before:* "3 dots (easy/medium/hard) based on your current activity" → *after (new, microcopy):* "Based on your current activity" (warm, data-specific, no hint text language).
- **AI Suggestion card, SIA note** — *before:* "this aligns with your fitness goals" (given) → *after:* same, warm, specific to the user's goals. (Already on-voice.)
- **Competition Detail, no leaderboard data (you not joined)** — *before:* no message → *after (new, non-shaming):* "Join to see your rank and climb the leaderboard" (invitation, not shame).
- **Competition Detail, loading leaderboard** — *before:* no message → *after (new, on-voice):* "SIA is loading the standings — one moment." (warm, specific).
- **Competition Detail, partial leaderboard** — *before:* silent render of available rows → *after (new, transparency):* if <3 participants: "Not enough competitors to show a leaderboard yet. Invite friends to grow the competition." (honest framing, not a deficit).
- **Your rank delta (up 3 since yesterday)** — *before:* text string only → *after:* **▲ up 3 since yesterday** (visible up-arrow glyph + number, never colour-only; down = **▼ down 2** with a neutral muted arrow, never red or shaming language).
- **Competition status** (active / upcoming / past / cancelled) — *before:* colour dot only (● at 6pt) → *after:* **dot + visible glyph + label** (● active, ◷ upcoming, ✓ ended, ⊘ cancelled) with label text (13pt `--color-alpha-white-60`). Glyph carries meaning for colour-blind users; colour reinforces (WCAG 1.4.11 fix).
- **Hero banner, "remaining" countdown** — *before:* "remaining" in smaller type → *after:* "remaining" label kept, now on `--color-alpha-white-40` (warm, not urgent); <24h shows "final day" (calm framing, not an alarm "hurry" tone).
- **Chat preview, no messages (joining for first time)** — *before:* empty section → *after (new, warm):* "Be the first to say something" (`--color-alpha-white-40`, 13pt, welcoming).
- **Leave confirmation sheet** — *before:* "are you sure? your progress will be lost." → *after (warmer):* "Leave competition?" (title) + "Your progress and ranking will be lost." (description, calm, no accusation). The button text stays "leave" in red (operational, genuine destructive action).
- **Competition Detail, rules section expanded** — *before:* bulleted text only → *after (given):* bulleted text + shield icon on anti-cheat item (visual hierarchy). (Already specified in Components.)

No exclamation marks; the brand period used with intent; SIA copy on the suggestion cards is specific to the user's fitness goals (a real connection to their active domains), never a horoscope.

### Motion choreography

Locked to `CK-P4` order (draw-first, reconciled with Visualization §Motion choreography): **the hero banner fades in** (`--dur-base` 280ms `--ease-out-soft`) → **the countdown timer's `MomentumBar` time-remaining fills** (8px thin bar under the countdown text, `--dur-slow` 520ms `--ease-flow`, `--grad-progress` orange→green, the focal motion within the banner) → the **hero banner "join now" CTA glows** brief `--glow-orange-md` (no sustained loop, just a 600ms pulse on first-load to draw attention) → **filter chips fade in** (280ms `--dur-base` each, 40ms stagger) → **invitation badge card rises** if present (280ms `.animate-fade-up`) → **AI suggestion scroll cards fade in** (280ms each, 40ms stagger, scroll-into-view) → **competition card list rows fade in** (staggered, 280ms each, 40ms stagger). On the **Detail view**: the **info card fades in** (280ms) → the **leaderboard rows rise** in order (520ms `--dur-slow` each, 40ms stagger between rows, the podium-coloured rows slightly *precede* the neutral rows as a visual hierarchy) → the **daily-score bar chart rises** on scroll-into-view (520ms, staggered per bar) → the **rank-trajectory Living Line draws itself** L→R (1200ms `stroke-draw` `--ease-flow`, the signature motion) → the **chat preview fades in** (280ms). Below-fold surfaces animate on scroll-into-view. `prefers-reduced-motion` → every element at final state instantly; the time-remaining `MomentumBar` at final fill (no animation), the rank-trajectory Living Line fully drawn with dashed-purple projection visible, the bars at final heights, the podium-coloured rank rows opaque at final state. No opacity-fade on any stroke (§8).

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 (first competition) | hero banner visible + featured competition card; filter chips visible; AI suggestions shown (if available); competition list shows 0–2 cards with on-brand examples; leaderboard section shows "Join to see your rank and climb the leaderboard" text instead of standings | "Competitions are optional motivational challenges. Find one that matches your goals and climb the leaderboard with others." (warm, non-shaming intro); filter chips selectable; no empty-state collapse | hero banner keeps depth (`CK-T02` backplate, `--glow-orange`); competition cards show normal depth; leaderboard frames joining as an invitation, not a missing feature |
| Loading (list refresh) | hero banner skeleton (icon + text outline, shimmer); filter chips visible but disabled; suggestion scroll invisible; competition card skeletons (title + badge outline, shimmer) | "Competitions loading — one moment." or silent (spinner is optional on this refresh, per Motion Choreography) | skeletons on `--color-ink-brown-800`, no glow during shimmer |
| Empty / partial (user joined a competition but no leaderboard entries yet) | leaderboard rows show skeleton outlines (rank column, avatar column, name, score — depth-preserving) that morph into real data as it arrives | "Not enough competitors yet. Invite friends to start climbing." (honest, constructive, per non-shaming gate) | ghosted/skeleton rows, never hidden |
| Error (leaderboard API failure) | leaderboard section shows "Couldn't load leaderboard" + a small orange retry button (never a full-screen error overlay); rest of the detail view loads independently | "Couldn't load leaderboard. Pull to refresh." (honest, recovery-clear) | calibrated `--color-error-red` only on genuine operational failure (red outline on the section or inline alert icon); glyph + word paired (never colour-alone) |
| Offline (no network) | all cards show cached data; join/leave CTAs are dimmed (50% opacity) with an inline reason | "You're offline — showing your last sync. Try again when you're online." | actions honestly dimmed; cached leaderboard retained |

### Signature & anti-generic

Ownable moments: **(1) the competition-progress GaugeRing hero** (you-vs-goal cooperative framing, orange→green arrival, never a head-to-head duel) + **(2) the warm-glow surfaces on ink-brown** (every card carries `CK-T01` top-edge highlight and `--shadow-1`, so no flat boxes exist) + **(3) the rank-trajectory Living Line** on the Detail view (the signature continuous stroke, orange actual→dashed-purple SIA projection, the brand motion language § draw-not-fade) + **(4) non-toxic, non-shaming copy throughout** (the filter chips welcome, the leaderboard invites "climb", your rank Δ frames movement not failure, no scarcity-manufactured prize language, no loss-aversion countdown).

Anti-generic fixes: 

- The competition card stack (hero banner → filter chips → suggestions → card list) is *not* a flat equal-weight wall — it is broken by the focal hero banner, the narrowly-spaced filter chips (36pt row), the suggestion horizontal scroll (deliberate asymmetry), and varied card heights (hero ~200pt, cards ~88pt). Symmetric-card monotony does not exist.
- The leaderboard never shows a bare "you are losing" comparison (the podium gold/silver/bronze are identity-only on rank numbers, never on bars or CTAs; the comparison bars are cooperative — your bar orange, cohort average green, framed as a shared benchmark to climb toward).
- The invitation badge and AI suggestions use purposeful depth (backplate, glow) so they read as editorial picks, not template filler.

Stale ASCII wireframe (still showing flat text pills, omitting the progress-gauge hero, the `MomentumBar` time bar, the podium rank module, the daily-score bars, the Living-Line trajectory) is flagged to be redrawn from this section in the build.

### Accessibility

Tabulated load-bearing contrast pairs on `--color-ink-brown-800` / `--color-ink-900`:

| Element | Color / Style | Contrast | Notes |
| --- | --- | --- | --- |
| Competition name (hero banner) | `--color-alpha-white-100` | ≥12:1 on both | Primary text, high priority |
| Countdown timer (20pt, bold) | `--color-alpha-white-100` | ≥12:1 | Critical data (time-remaining) |
| "remaining" label | `--color-alpha-white-40` | ≥4.5:1 | Meta text |
| Participant count | `--color-alpha-white-50` | ≥4.5:1 | Supporting data |
| Type badge text (AI / Admin) | `--color-royal-purple` (AI) / `--color-alpha-white-60` (Admin) | 3.2:1 / ≥4.5:1 | WCAG 1.4.11 (purple on `ink-brown-800`) |
| "join now" CTA | white 100% on `--color-brand-orange` fill | ≥4.5:1 | Primary action |
| Leaderboard rank number (#1–3) | `--color-podium-gold/silver/bronze` | ≥3:1 on `--color-ink-brown-800` (WCAG 1.4.11) | Identity-only, not data-carrying |
| Leaderboard rank number (#4+) | `--color-alpha-white-100` | ≥12:1 | Primary text |
| Leaderboard score (your row) | `--color-alpha-white-100` | ≥12:1 | Critical comparison data |
| Your rank Δ ("up 3") | `--color-forest-green` (up arrow) / `--color-alpha-white-40` (down arrow) | ≥3:1 / ≥4.5:1 | Glyph + number paired; never colour-only |
| Daily-score bar (your day, orange fill) | `--color-brand-orange` | ≥3:1 on track | Data-carrying (WCAG 1.4.11) |
| Daily-score bar (cohort avg, green) | `--color-forest-green` | ≥3:1 on track | Comparison, not an alarm |
| Status indicator (● active / ◷ upcoming / ✓ ended / ⊘ cancelled) | colour + **visible glyph** + label text | ≥4.5:1 (label + glyph carries meaning) | Fixes colour-alone miss; glyph essential for colour-blind users |
| "view all" leaderboard link | `--color-brand-orange` | 3.2:1 | Interactive text (WCAG 1.4.11) |

**Status never colour-alone:** every status (active / upcoming / past / cancelled) shows a **dot (●/◷/✓/⊘) + visible label text** (13pt `--color-alpha-white-60`). Your rank Δ shows a **visible arrow glyph (▲/▼) + number**, never just colour. All interactive elements (filter chips, cards, buttons, links) carry `--focus-ring` (`CK-T03`: 2px `--color-brand-orange` with 2px offset) uniform app-wide — replacing the ad-hoc "2pt orange ring" repeated in the spec. Targets ≥44×44pt: filter chips 36pt height (hit target extends to 44pt on tap), competition cards full-width tappable, buttons 56pt (join CTA) / 48pt (leave CTA), leaderboard rows 56pt. Reduced-motion: the countdown `MomentumBar` appears at final fill instantly (no animation), the rank-trajectory Living Line is fully drawn + dashed-purple projection visible (no draw animation), daily-score bars at final height, staggered entrances collapse to instant display. All signature static forms preserved.

Conform to `design-audit/CONSISTENCY.md`.


---

## Typography Map

| Element | Size | Weight | Color | Notes |
|---------|------|--------|-------|-------|
| Screen title | 17pt | Semibold (600) | white | Nav bar center |
| Hero competition name | 18pt | Semibold (600) | white | Hero banner |
| Detail competition name | 20pt | Semibold (600) | white | Competition info card |
| Countdown timer | 20pt | Bold (700) | white | tabular-nums |
| Competition card name | 16pt | Semibold (600) | white | List card |
| Score display | 20pt | Bold (700) | white | Progress tracker |
| Leaderboard rank # | 15pt | Bold (700) | white / podium | Top 3 use gold/silver/bronze |
| Leaderboard name | 14pt | Semibold (600) | white | Rank rows |
| Leaderboard score | 14pt | Semibold (600) | white | tabular-nums, right-aligned |
| Body / description | 15pt | Regular (400) | white at 70% | Competition descriptions |
| Date range | 13pt | Regular (400) | white at 50% | Metadata |
| Participant count | 13pt | Regular (400) | white at 40% | Metadata |
| Eyebrow labels | 12pt | Semibold (600) | white at 40% | Uppercase, +0.12em tracking |
| Type badge text | 10pt | Semibold (600) | purple / white 60% | AI / Admin badges |
| Filter chip text | 13pt | Semibold (600) | white 60% / white | Inactive / active |
| CTA text | 16-17pt | Semibold (600) | white | Buttons |
| Chat preview text | 13pt | Regular (400) | white at 60% | Message previews |

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base (both views) |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Hero banner border | #FF5E00 at 25% | brand-orange | Featured competition accent |
| Hero banner gradient | #FF5E00 at 8% | brand-orange | Radial glow overlay |
| Filter chip (active) | #FF5E00 | brand-orange | Active filter |
| Join CTA bg | #FF5E00 | brand-orange | Primary action |
| "join" text link | #FF5E00 | brand-orange | Quick join on cards |
| Countdown timer text | #FFFFFF | white | High contrast |
| User rank text | #FF5E00 | brand-orange | "Your rank: #12" |
| User position border | #FF5E00 | brand-orange | 3pt left border accent |
| Invitation card border | #FF5E00 at 60% | brand-orange | 3pt left border |
| Bar chart fill | #FF5E00 | brand-orange | Daily score bars |
| Active status dot | #34A853 | forest-green | Active competition indicator |
| Rank change up | #34A853 | forest-green | Positive movement |
| Rank change down | white at 40% | --color-alpha-white-40 | Neutral muted ▼ (never red, never orange-as-alarm) — per S47-V05 + VK-012 PodiumRank |
| AI badge bg | #7F24FF at 15% | royal-purple | AI-generated indicator |
| AI badge text | #7F24FF | royal-purple | AI type label |
| SIA note dot | #7F24FF | royal-purple | AI suggestion attribution |
| Rank #1 | #FFD700 | gold | Podium accent |
| Rank #2 | #C0C0C0 | silver | Podium accent |
| Rank #3 | #CD7F32 | bronze | Podium accent |
| Prize trophy icon | #FFD700 | gold | Prize indicator |
| Upcoming status dot | #FF5E00 | brand-orange | Upcoming competition |
| Past status dot | white at 30% | — | Ended competition |
| Leave CTA text | white at 50% | — | De-emphasized destructive |
| Leave confirm button | #F44336 | error-red | Destructive confirmation |
| Chat unread dot | #FF5E00 | brand-orange | Notification |
| Primary text | #FFFFFF | white | Names, titles, scores |
| Secondary text | white at 70% | — | Descriptions |
| Tertiary text | white at 50% | — | Dates, metadata |
| Quaternary text | white at 40% | — | Participant counts, eyebrows |

**60/30/10 verification**: Orange dominates through hero banner border and gradient, join CTAs, filter chip active state, user rank display, own position border, bar chart fills, invitation border, countdown emphasis, rank change down indicator, and chat unread dot. Green appears only on active status dots and rank-up indicators. Purple is limited to AI-generated badges and SIA suggestion note — exactly 3 elements. Gold/silver/bronze are the approved podium exception on leaderboard rank numbers only. Domain colors do not appear on this screen (competitions are cross-domain social). Ratio holds.

---

## Interaction States

### Hero Banner Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, orange border at 25% | -- |
| Pressed | Border brightens to orange at 50%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | Skeleton shimmer for name, countdown, participants | -- |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white 60% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill, white text | medium impact |

### Competition Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal content | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | Skeleton shimmer per card | -- |

### Invitation Badge Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, orange 60% left border | -- |
| Pressed | Border brightens to 80%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### AI Suggestion Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, standard layout | -- |
| Pressed | bg lightens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Join CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange fill, white text | -- |
| Pressed | Darker orange (#E05500), scale(0.97) | light impact |
| Disabled | 40% opacity, no touch | -- |
| Loading | White spinner replaces text | -- |
| Success | Green (#34A853) fill flash (600ms), text: "joined" | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Leave CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, white at 15% border, white at 50% text | -- |
| Pressed | Border brightens, text brightens to white at 70% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Leaderboard Rank Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal content | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### "open chat" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent, 1pt white at 15% border | -- |
| Pressed | Border brightens to white at 30%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Bar Chart Bar (Progress Tracker)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange fill, proportional height | -- |
| Pressed | Bar brightens, tooltip appears above | light impact |
| Focus-visible | 2pt orange ring around bar | -- |

### Gesture Map — Competition List
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | FlatList | Pull-to-refresh (reload competitions) |
| Horizontal scroll | Filter chips | Browse filters |
| Horizontal scroll | AI suggestions | Browse suggestions |
| Tap | Hero banner body | Navigate to Competition Detail (stack push) |
| Tap | Hero join CTA | Join competition (API call) |
| Tap | Filter chip | Switch filter, reload list |
| Tap | Invitation badge | Open Invitation List sheet |
| Tap | AI suggestion card | Open AI Competition Preview sheet |
| Tap | Competition card body | Navigate to Competition Detail (stack push) |
| Tap | Competition card CTA | Quick join/view/remind (contextual) |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |

### Gesture Map — Competition Detail
| Gesture | Target | Action |
|---------|--------|--------|
| Scroll | ScrollView | Scroll through detail content |
| Tap | Rules section header | Expand/collapse rules |
| Tap | "see all" leaderboard link | Push full leaderboard view |
| Tap | Leaderboard rank row | Open limited user profile (bottom sheet) |
| Tap | Progress tracker bar | Show daily detail tooltip |
| Tap | "open chat" button | Push Competition Chat sub-screen |
| Tap | Chat preview message | Push Competition Chat sub-screen |
| Tap | Join CTA | Join competition |
| Tap | Leave CTA | Open leave confirmation sheet |
| Tap | Overflow menu | Open action sheet |
| Tap | Back button | Pop to Competition List |
| Swipe right from edge | Screen | iOS back gesture |
| Pull down | ScrollView | Pull-to-refresh (reload competition data) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Competition List content | Mount | Staggered fade-in: hero banner (0ms), filter chips (80ms), invitation badge (160ms), AI suggestions (240ms), first 3 competition cards (80ms stagger each starting at 320ms) | 280ms each | ease-out-soft |
| Hero countdown timer | Every second | Digit crossfade (old digit fades out + translateY -8, new digit fades in + translateY 8 to 0) | 160ms | ease-out-soft |
| Filter chip switch | Tap | Active indicator slides horizontally (orange fill transitions to new chip) | 280ms | ease-out-soft |
| Competition list | Filter change | Cards crossfade (old cards opacity 1 to 0 + translateY 0 to -8, new cards opacity 0 to 1 + translateY 8 to 0) | 280ms | ease-out-soft |
| AI suggestion cards | Enter viewport | Staggered slide-in from right, 60ms stagger | 280ms each | ease-out-soft |
| Join success | Join CTA tap | Button bg crossfades orange to green (600ms), text: "join" to "joined", confetti burst from button (8-12 particles, 520ms) | 600ms | ease-flow |
| Invitation badge | New invitation | Scale-in bounce (0 to 1.15 to 1) + orange glow pulse | 280ms | ease-out-soft |
| Competition Detail | Push from list | Standard iOS stack push (slide from right) | 280ms | ease-out-soft |
| Leaderboard rows | Mount | Staggered fade-in, 40ms per row, starting from #1 | 280ms each | ease-out-soft |
| Own position row | Mount | Fade-in + orange left border extends from 0 to full height | 520ms | ease-flow |
| Progress bar chart | Mount | Bars grow from 0 height to final height, staggered 60ms per bar | 280ms each | ease-flow |
| Chat preview | Mount | Fade-in + translateY(8 to 0) | 280ms | ease-out-soft |
| Leave confirmation sheet | Open | Bottom sheet slides up | 520ms | ease-out-soft |
| Tooltip (bar tap) | Bar tap | Fade-in + translateY(4 to 0), positioned above tapped bar | 280ms | ease-out-soft |
| Tooltip dismiss | Tap elsewhere / 3s | Fade-out | 160ms | ease-out-soft |

**Screen transition**:
- **Enter (Competition List)**: Standard stack push from Explore
- **Enter (Competition Detail)**: Stack push from Competition List
- **Exit**: Stack pop

---

## Empty States

### Day 1 — Competition List (new user, no competitions available)
- Hero banner: Hidden (no featured competition to show)
- Filter chips: Still visible but "my competitions" shows "(0)"
- AI suggestions: Extra prominent — takes up more vertical space. Header changes to "challenges for you." SIA generates 3 starter challenges based on onboarding data (e.g., "7-Day Hydration Challenge", "Morning Routine Streak"). These are immediate, self-compete challenges to introduce the mechanic.
- Competition cards: If no admin-created competitions exist yet — centered message: "no competitions yet. check back soon or try a suggested challenge above." Icon: outlined trophy (48pt, white at 15%). Below: "SIA will suggest competitions as the community grows" in 13pt Sora Regular, white at 30%.
- Invitation badge: Hidden

### Day 1 — Competition Detail (just joined, no progress)
- Leaderboard: Shows user at last position with 0 score. "just joined — start earning points." in 13pt, white at 40%, below own position row.
- Progress tracker: All bars at 0 height. Center text: "your scores will appear here as you compete." in 13pt, white at 40%.
- Chat: "be the first to say something." centered text, 15pt Sora Regular, white at 40%.

### Established user — No active competitions
- Hero banner: Shows next upcoming competition if available. Countdown reads "starts in 3d : 12h". CTA: "remind me."
- If no upcoming either: Hero area replaced with a motivational card — "no active competitions right now. check upcoming or try an AI challenge." Orange "browse suggestions" text link.
- Past tab: Shows completed competitions with results for browsing history.

### Established user — Empty filter result
- If a filter returns no results (e.g., "upcoming" with none): Centered text: "no [filter] competitions." in 15pt Sora Regular, white at 40%. Below: "try another filter or browse suggested challenges" in 13pt, white at 30%.

---

## Motivation Adaptation

- **Low motivation**: Competition list de-emphasizes ranking and comparison. Hero banner leads with the fun/social framing ("join 234 others") rather than competitive framing ("climb the leaderboard"). AI suggestions focus on short, achievable challenges (3-day, 7-day) with low commitment. Competition Detail hides leaderboard by default (collapsed, "tap to view rankings"). Progress tracker shows encouraging language: "great start — keep going" even at low scores. Chat is more prominent to lean on social support rather than competition pressure.

- **Medium motivation**: Standard experience as described. All sections visible. Leaderboard is expanded. AI suggests a mix of short and medium challenges. Competition cards show rank when joined. Standard competitive framing.

- **High motivation**: Additional stats appear: "you're in the top 10% of active competitors." Competition cards show more data: daily score trends as inline sparklines. AI suggestions include longer, more demanding challenges (30-day, multi-domain). Leaderboard shows extended stats per row: daily average, streak count. Progress tracker adds a trend line overlay (dotted orange) showing projected final rank. An "invite friends" FAB appears (orange pill, "invite friends", positioned above tab bar) to grow the competitive circle.

---

## Edge Cases

### Competition Ends
When a competition reaches its end date:
- **Countdown timer**: When the timer hits 00d : 00h : 00m, the countdown text crossfades to "ENDED" (15pt Sora Semibold, white at 50%, 280ms ease-out-soft).
- **Hero banner transition**: If the ended competition was featured, the hero banner dims to 70% opacity and the CTA changes from "view details" to "see final results" (secondary style).
- **Competition Detail — Final Results State**:
  - Competition Info Card: Date range text appends "· ended" in white at 40%. Countdown replaced by "competition complete" in 15pt Sora Semibold, white at 60%.
  - Leaderboard: Final rankings shown with "FINAL" badge (12pt Sora Semibold, uppercase, green #34A853, +0.12em tracking) next to the "LEADERBOARD" eyebrow.
  - User's final position: Orange-bordered row shows final rank + "final rank" label replacing the "since yesterday" change indicator.
  - If user placed top 3: A celebration overlay (Screen 42 pattern) appears on first view of the results. Trophy icon + "you placed #[N]!" + XP reward. This is a one-time trigger — subsequent visits show static results.
  - Chat preview: "competition has ended" notice above last messages. Chat remains readable but input is disabled — "this chat is now read-only" placeholder in input bar.
- **Competition List card**: Status dot changes from green to gray. CTA text changes to "view results". Card moves to "past" filter group.

### Tie for First Place
When two or more participants have identical final scores:
- **Leaderboard display**: Tied participants share the same rank number. Both show gold (#FFD700) for 1st, silver for 2nd, etc.
- **Format**: "#1 [tied]" — rank number in podium color + "(tied)" in 12pt Sora Regular, white at 40%, after the name.
- **Tiebreaker note**: Below the tied rows: "tied scores — ranked by earliest achievement" in 12pt Sora Regular, white at 30%, italic. Server-side tiebreaker: user who reached the score first ranks higher for display order, but both show the same rank number.

### Competition Cancelled by Admin
When an admin cancels an active competition:
- **Push notification**: "The competition '[name]' has been cancelled by the organizer."
- **Competition List**: Card shows a red "CANCELLED" badge (12pt Sora Semibold, #F44336, uppercase) replacing the status dot. Card dims to 60% opacity. CTA changes to "details" (white at 40%).
- **Competition Detail**: Info card shows "cancelled by organizer" banner (ink-brown-800, red left border 3pt, 56pt height). Description of cancellation reason if provided. "Your progress has been preserved but no prizes will be awarded." in 14pt Sora Regular, white at 50%.
- **XP impact**: Any XP earned during the competition is retained. No additional prizes awarded.
- **Chat**: "this competition was cancelled" notice. Chat remains read-only.

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Competition list load fails | Skeleton shimmer for 3 seconds, then "could not load competitions — tap to retry" centered in list area | Tap retry re-fetches; pull-to-refresh also available |
| Join competition fails | "join now" CTA shows error state (red border flash, 280ms), "could not join — try again" toast (3s) | CTA re-enables; user can retry |
| Leave competition fails | "leave" CTA shows error state, "could not leave — try again" toast | CTA re-enables; user remains in competition |
| Leaderboard data load fails | Leaderboard section shows "could not load leaderboard" + "retry" link in orange | Tap retry re-fetches ranking data |
| Competition chat load fails | Chat preview shows "could not load messages" + "retry" link | Tap retry re-fetches; non-blocking to competition detail |
| Invitation accept/decline fails | Button shows error state, "could not process — try again" toast | Buttons re-enable; invitation preserved |
| AI competition suggestion load fails | AI suggestions section shows "could not load suggestions" placeholder in 15pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| Network offline | Cached competition data displayed with "offline — showing cached data" banner (48pt). Join/leave CTAs disabled with "available when online" toast on tap. Chat read-only. | Banner includes "tap to retry" on reconnect |
| Competition countdown timer drift | Timer auto-corrects on next API sync; brief crossfade to corrected value | No user action needed; server time is authoritative |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Hero banner card**: VoiceOver reads competition name, countdown, participant count, and prize: "Step Challenge, 2 days 14 hours remaining, 234 participants, prize 500 XP and Gold Badge."
- **Filter chips**: Toggle role with state: "Active filter, selected" / "Upcoming filter, not selected." Single-select behavior communicated.
- **Competition cards**: VoiceOver reads name, type badge, dates, participant count, and rank if joined: "Meditation Marathon, AI competition, June 1 to June 14, 89 participants, not joined."
- **Countdown timer**: VoiceOver reads as static text (does not announce per-second updates): "2 days, 14 hours, 32 minutes remaining." Updated on focus.
- **Leaderboard rows**: VoiceOver reads rank, name, and score: "Rank 1, Sarah, 2450 points."
- **Invitation badges**: Announced as alert: "2 competition invitations from Sarah and Ahmed. Double tap to view."
- **Competition type badges**: "AI" and "Admin" badges read with their labels, not just color.
- **Progress bar chart**: Summary announced: "Your progress over 7 days. Best day: Tuesday, 380 points."
- **Touch targets**: All interactive elements meet 44x44pt minimum. Filter chips have 36pt visible height with 44pt touch targets.
- **Color contrast**: All text meets WCAG AA. Status dots paired with a **visible glyph + text label** (● active / ◷ upcoming / ✓ ended / ⊘ cancelled), never colour-alone — per S47-V05; the colour-only aria-hidden dot in the prototype is fixed by the glyph.
- **Reduced motion**: Countdown digits appear without crossfade. Mini confetti burst on join replaced with simple green glow. Chart bars appear without staggered draw.

---

## Cross-References

- **Navigates to**: Competition Detail (stack push from competition card), Competition Chat (stack push from detail, uses Room Interior pattern from Screen [40] with competition branding), Full Leaderboard (stack push from "see all", uses Leaderboard pattern from Screen [39]), User Profile Bottom Sheet (from leaderboard row — shows avatar, level, top domains, "message" and "invite" CTAs per _shared-patterns.md, with overflow menu for report/block), Report/Block [64] (via overflow menu "report" in competitor profile sheet, or via participant options → "report"), Invitation List (bottom sheet), AI Competition Preview (bottom sheet), Leave Confirmation (bottom sheet), Native Share Sheet (from overflow menu)
- **Navigates from**: Screen [18] -- Explore Section (stack push), Screen [09] -- SIA Chat (deep-link), Screen [39] -- Leaderboard (competitions teaser, stack push), Screen [40] -- Community (room challenge link, stack push), Push notification
- **Shared components with**: Screen [39] -- Leaderboard (Rank Row, Podium Colors, User Position Row with orange border, Limited User Profile sheet), Screen [40] -- Community (Chat Message Bubble pattern for Competition Chat, Message Input Bar), Screen [38] -- Habits (7-Day Calendar Dot Row concept adapted as bar chart), Screen [18] -- Explore (Suggested For You section pattern, Filter Chip Row), Screen [42] -- Celebration (join success uses mini confetti burst)
- **Patterns used**: Back Button, 8-State Model, Filter Chip / Filter Tab Row (_shared-patterns.md), Section Eyebrow Label, Brand CTA Button, In-Card CTA Button, Modal Presentation (bottom sheets), Expandable/Collapsible Section, Leaderboard Rank Row (Screen 39), Chat Message Bubble (Screen 40), Message Input Bar (Screen 40), Limited User Profile (Screen 39), Skeleton Loading States, Pull-to-Refresh
- **Patterns established**: Hero Banner Card (featured competition with countdown timer, participant count, prize, and inline join CTA), Competition Card (name + type badge + date + status dot + participant count + rank + contextual CTA), Competition Type Badge ("AI" purple / "Admin" neutral pill), Status Indicator (dot + visible glyph + label: ● green active / ◷ orange upcoming / ✓ gray past-ended / ⊘ red cancelled — never colour-alone, per S47-V05), Countdown Timer Display (DD:HH:MM with per-second digit crossfade), Progress Bar Chart (vertical daily score bars with proportional height, tooltip on tap), Chat Preview Card (last 2 messages + open chat CTA, within a non-chat screen), Invitation Badge Card (orange-bordered notification with accept/decline actions), AI Competition Preview Sheet (difficulty dots + SIA note + start CTA), Leave Confirmation Sheet (destructive action confirmation with red CTA), Mini Confetti Burst (8-12 particles from button origin on join success)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-14.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/competitions`
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
| B14-F04 | critical | retention | Implement filter state, join/remind/view-detail/result flows, and competition detail navigation. |
| B14-F05 | major | mobile-ergonomics | Expand row CTA hit areas to 44px high and make filters semantic selected controls. |
| B14-F06 | major | navigation | Make invitations, suggestions, hero body, and Back semantic links/buttons with clear destinations. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

