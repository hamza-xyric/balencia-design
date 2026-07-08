# Screen Design: Groups & Pods (Social Growth OS)

**Screen**: 66 of 68
**File**: 66-social-groups-pods.md
**Register**: Social Mode (brand-orange #FF5E00)
**Primary action**: join, manage, and participate in accountability pods and interest groups
**Tab**: Social (nested under Me → Community, or top-level Social entry point)
**Navigation**: Stack depth 2 from Me tab root (Me Main → Community → Groups & Pods). Entry from Community [40] "pods" grid card, Explore [18] social grid card, Accountability [46] Groups section "manage" link, SIA deep-link [09] ("your pod is waiting on you"), or Home Screen [12] pod-activity alert card. Exit via back button to Community [40] or Explore [18].

---

## Purpose

This screen is the belonging engine of the Social Growth OS — it turns opt-in matching and shared commitment into small, trustworthy groups. It answers "who am I growing with, and who could I grow with next?" The philosophy is identical to Accountability [46]: **individual first, social as enhancement, consent above all**. Every pod membership is explicit — there is no silent auto-enrollment anywhere in this flow. Public pods require an explicit "request to join" that the pod owner (or an auto-accept rule the *user* configured for their own pod) must resolve; there is no path where a user is added to a pod without a tap of consent on their side. Discovery uses embedding-based opt-in matching (the same behavioral-similarity engine that powers Accountability's AI suggestions) with a mandatory transparency chip explaining *why* a pod was recommended — no black-box social nudging. Trust & safety is a first-class citizen: every pod has report/block affordances, and leaderboard-linked pods surface an Anti-Cheat Badge so members know the pod's competitive integrity is being monitored.

This screen has two primary tab views: **My Pods** and **Discover**, accessed via a segmented tab at the top. **Create Pod** is reached via a persistent FAB (bottom sheet form, not a tab). **Pod Detail** is a stack-pushed sub-screen reached by tapping any pod card. Pods are deliberately small — the member cap tops out at 50 and defaults to 12 — because the design goal is a trusted circle, not a broadcast audience; this keeps activity feeds legible and keeps the report/moderate surface tractable for owners to actually use.

---

## Information Architecture

**Hierarchy — My Pods Tab** (what the user sees, in order of visual priority):
1. Segmented tab — My Pods | Discover
2. Pending requests banner (conditional) — outstanding join requests awaiting the user's decision (as pod owner) or awaiting the pod's decision (as requester)
3. Joined pod list — pod cards with member avatar stack, activity pulse, unread indicator
4. Create Pod FAB — persistent, bottom-right

**Hierarchy — Discover Tab**:
1. Segmented tab — My Pods | Discover
2. Matching consent state (conditional) — opt-in prompt if matching is not yet enabled
3. Recommended pods — pod cards with "why this pod" transparency chip
4. Browse by interest — filter chip row (fitness, career, mindfulness, finance, parenting, creative, custom)
5. All public pods list — paginated, filtered by chip selection

**Hierarchy — Pod Detail** (stack push):
1. Pod Detail Header — cover treatment, name, privacy badge, Anti-Cheat Badge (conditional)
2. Join/Request/Member state CTA — contextual to the viewer's relationship to the pod
3. Member roster — avatar grid with roles (owner, moderator, member)
4. Pod Activity Feed — mini activity stream (check-ins, challenge completions, milestones)
5. Group Challenges section — active shared challenges linked to Competitions [47]
6. Leave / Report action row — bottom of screen, secondary tone

**User flow**:
- **Arrives from**: Community [40] via "pods" grid card (stack push), Explore [18] via social grid card, Accountability [46] via Groups section "manage" link, SIA Chat [09] via deep-link, Home Screen [12] via pod-activity alert card
- **Primary exit**: Back to Community [40] or Explore [18] (stack pop)
- **Secondary exits**: Pod Detail (stack push from any pod card), Competitions [47] via Group Challenges "view leaderboard" link, Reputation [67] via member avatar tap (limited profile → "view reputation"), Accountability [46] via "link to accountability pod" action, Create Pod modal (FAB), Report/Moderate Action Sheet (modal, from Pod Detail)

---

## Layout — My Pods Tab

**Scroll behavior**: ScrollView (joined pods are typically <20 items; not a candidate for virtualization)
**Tab bar visible**: Yes

### ASCII Wireframe — My Pods Tab (populated)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]   "Groups & Pods"        │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 12pt gap
│  [My Pods]        [Discover]       │  ← Segmented Tab (40pt)
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ 🔔 2 join requests pending  │   │  ← Pending Requests Banner
│  │             [review →]      │   │     (conditional, orange
│  └─────────────────────────────┘   │      left border)
│                                     │  ← 16pt gap
│  MY PODS                            │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ Morning Crew         🛡 clean│   │  ← Pod Card 1 (Anti-Cheat
│  │ ◉◉◉◉◉+3  8 members          │   │     badge, leaderboard-linked)
│  │ ● 3 check-ins today          │   │     activity pulse
│  │ private · auto-accept        │   │     privacy state
│  ├─────────────────────────────┤   │
│  │ Career Climbers      12/20  │   │  ← Pod Card 2 (open capacity)
│  │ ◉◉◉◉◉+7                     │   │
│  │ ○ quiet today                 │   │
│  │ public · request to join     │   │
│  ├─────────────────────────────┤   │
│  │ Mindful Mornings              │   │  ← Pod Card 3
│  │ ◉◉◉                          │   │
│  │ ● 1 new milestone             │   │
│  │ private · invite only         │   │
│  └─────────────────────────────┘   │
│                                     │
│                    ┌───────────────┐│
│                    │ + create pod  ││ ← FAB (orange pill)
│                    └───────────────┘│
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — My Pods Tab (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "Groups & Pods" title

2. **Segmented Tab** — 40pt
   - Purpose: Switch between My Pods and Discover
   - Content: Two segments with active state

3. **Pending Requests Banner** — ~64pt (conditional)
   - Purpose: Surface outstanding join requests requiring the user's decision (as pod owner reviewing incoming requests)
   - Content: Bell icon + count + "review" CTA

4. **Joined Pod List** — Variable
   - Purpose: All pods the user has joined, with live activity signal
   - Content: Pod cards with avatar stack, activity pulse, privacy/consent state

5. **Create Pod FAB** — 48pt (fixed, floating)
   - Purpose: Launch the Create Pod modal
   - Content: Plus icon + "create pod"

---

## Layout — Discover Tab

**Scroll behavior**: ScrollView with a nested horizontal filter row
**Tab bar visible**: Yes

### ASCII Wireframe — Discover Tab

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]   "Groups & Pods"        │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 12pt gap
│  [My Pods]        [Discover]       │  ← Segmented Tab (40pt)
│                                     │  ← 16pt gap
│  [all][fitness][career][mindful]…  │  ← Interest Filter Chip Row
│                                     │  ← 16pt gap
│  RECOMMENDED FOR YOU                │  ← Eyebrow (purple dot)
│  ┌─────────────────────────────┐   │
│  │ Early Risers Fitness          │   │  ← Recommended Pod Card
│  │ ◉◉◉◉◉+11  16 members         │   │     (transparency chip)
│  │ 💡 why: you both log AM      │   │
│  │    workouts 5x/week           │   │
│  │ public · request to join     │   │
│  │           [request to join]  │   │
│  ├─────────────────────────────┤   │
│  │ Budget Builders                │   │
│  │ ◉◉◉◉◉+4                       │   │
│  │ 💡 why: shared savings goal   │   │
│  │    pattern with 3 members     │   │
│  │ public · request to join     │   │
│  │           [request to join]  │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  BROWSE PUBLIC PODS                 │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ Night Owl Study Group          │   │  ← Pod Card (no match
│  │ ◉◉◉◉◉+2  7 members            │   │      reasoning shown)
│  │ public · request to join     │   │
│  ├─────────────────────────────┤   │
│  │ ...more rows...                │   │
│  └─────────────────────────────┘   │
│                                     │
│                    ┌───────────────┐│
│                    │ + create pod  ││ ← FAB (orange pill)
│                    └───────────────┘│
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Discover Tab (top to bottom)

1. **Screen Header** — 44pt
2. **Segmented Tab** — 40pt
3. **Interest Filter Chip Row** — 36pt
   - Purpose: Narrow discovery by category
   - Content: "all" / "fitness" / "career" / "mindful" / "finance" / "parenting" / "creative" chips
4. **Matching Consent Prompt** — ~96pt (conditional, replaces the sections below when matching opt-in has not been configured)
   - Purpose: Require explicit opt-in before any embedding-based matching runs
   - Content: Explanation + "enable matching" CTA
5. **Recommended Pods Section** — Variable
   - Purpose: Embedding-based similarity matches with mandatory transparency
   - Content: Recommended pod cards, each with a "why this pod" chip
6. **Browse Public Pods Section** — Variable (paginated, cursor-based)
   - Purpose: General discovery outside the AI-matched set
   - Content: Standard pod cards, filtered by active interest chip
7. **Create Pod FAB** — 48pt (fixed, floating)

---

## Layout — Pod Detail (stack push)

**Scroll behavior**: ScrollView
**Tab bar visible**: No (full-bleed detail screen, matches Detail Screen Template conventions)

### ASCII Wireframe — Pod Detail

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]              [⋯ overflow]│  ← Detail Header (56pt)
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │        Morning Crew          │   │  ← Pod Cover / Hero
│  │     private · 8 members      │   │     (name, privacy badge)
│  │        🛡 clean pod           │   │     Anti-Cheat Badge
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │      you're a member ✓       │   │  ← Membership State CTA
│  └─────────────────────────────┘   │     (or "request to join")
│                                     │  ← 24pt gap
│  MEMBERS (8)                        │  ← Eyebrow
│  ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉                    │  ← Member Roster Grid
│  Sarah  Ahmed  Lisa  You  +4        │     (owner crown on Sarah)
│                                     │  ← 24pt gap
│  POD ACTIVITY                       │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ Ahmed checked in · 2h ago    │   │  ← Activity Feed Entry
│  │ You hit a 7-day streak · 1d  │   │
│  │ Lisa joined the pod · 3d     │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  GROUP CHALLENGES                   │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ "5 AM workouts this week"    │   │  ← Group Challenge Card
│  │ ▓▓▓▓▓▓▓░░░  6/8 joined      │   │
│  │           [view leaderboard]│   │
│  └─────────────────────────────┘   │
│                                     │  ← 32pt gap
│  leave pod            report pod   │  ← Leave / Report Action Row
│                                     │
└─────────────────────────────────────┘
```

### Component Stack — Pod Detail (top to bottom)

1. **Detail Header** — 56pt (back chevron + overflow menu with report/mute/share)
2. **Pod Cover / Hero** — ~140pt
   - Purpose: Establish pod identity and trust signals at a glance
   - Content: Pod name, privacy badge, member count, Anti-Cheat Badge (conditional)
3. **Membership State CTA** — 56pt
   - Purpose: Show the viewer's exact relationship to the pod and the one correct next action
   - Content: "you're a member", "request to join", "request pending", or "invite accepted — join now" states
4. **Member Roster Grid** — Variable
   - Purpose: Full member list with roles
   - Content: Avatar grid, names, owner/moderator indicators
5. **Pod Activity Feed** — Variable
   - Purpose: Recent pod-scoped activity, mini activity stream
   - Content: Check-ins, streaks, joins, milestones — chronological, most recent first
6. **Group Challenges Section** — Variable
   - Purpose: Shared challenges tied to the pod, cross-linked to Competitions [47]
   - Content: Challenge cards with progress and "view leaderboard" link
7. **Leave / Report Action Row** — 44pt
   - Purpose: Trust & safety exit hatches, always available, never buried
   - Content: "leave pod" (neutral tone) + "report pod" (muted red tone)

---

## Components

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 44pt. Back chevron left + "Groups & Pods" center (17pt Cabinet Grotesk SemiBold 600, white).
- **Size**: Full-width x 44pt

### Segmented Tab
- **Purpose**: Switch between My Pods and Discover views
- **Data source**: View state (local)
- **Visual treatment**: Identical to established Segmented Control pattern (Screen 38, confirmed on Screen 46). 16pt horizontal margins.
- **Content**:
  - Container: Full-width minus 32pt, 40pt tall, ink-brown-800 bg, --r-pill
  - Two segments: "my pods" / "discover" (13pt Cabinet Grotesk SemiBold 600, sentence case)
  - Active: Burnt orange (#FF5E00) fill, white text, --r-pill
  - Inactive: Transparent, white at 60%
- **Variants**: My Pods (default), Discover
- **Gestures**: Tap to switch tab, content crossfades below (280ms)
- **Size**: Full-width minus 32pt x 40pt

### Pending Requests Banner
- **Purpose**: Surface join requests the user (as pod owner) must accept or decline. Never auto-resolves — this is the consent gate made visible.
- **Data source**: API — GET /api/pods/requests?direction=incoming
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 20pt padding. Orange (#FF5E00) left border accent (3pt). 16pt horizontal margins.
- **Content**:
  - Bell icon: 18pt, orange, left-aligned
  - Count text: "2 join requests pending" — 15pt Switzer Medium 500, white, 8pt right of icon
  - "review" CTA: 14pt Cabinet Grotesk SemiBold 600, orange, right-aligned with right chevron. 44x44pt touch target.
- **Visibility**: Shown only when the user owns at least one pod with pending incoming requests. Hidden entirely otherwise — never shown empty.
- **Gestures**: Tap opens the Join Requests bottom sheet (accept/decline per requester)
- **Size**: Full-width minus 32pt x ~64pt

### Pod Card
- **Purpose**: Represent a joined pod with member composition, live activity, and consent-explicit privacy state. This is the trust-safety anchor component of the whole screen — the privacy/consent line is never omitted.
- **Data source**: API — GET /api/pods/mine (My Pods tab), GET /api/pods/recommended or GET /api/pods/discover (Discover tab)
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 20pt padding. 16pt horizontal margins. 16pt gap between cards.
- **Content**:
  - Top row: Pod name (16pt Cabinet Grotesk SemiBold 600, white, left-aligned) + optional Anti-Cheat Badge (right-aligned, only if pod is leaderboard-linked via Competitions [47])
  - Member Avatar Stack (8pt below name)
  - Member count: "8 members" — 13pt Switzer Regular 400, white at 50%, right of avatar stack
  - Activity Pulse line (8pt below stack): colored dot (6pt) + activity summary — "3 check-ins today" (green dot, active) or "quiet today" (white at 30% dot, dormant)
  - Consent/privacy line (8pt below activity, always present, never omitted): privacy level (13pt Switzer Regular 400, white at 50%) + join model. E.g. "private · auto-accept", "public · request to join", "private · invite only"
  - Join CTA (Discover tab only, full-width minus card padding, 8pt below privacy line): "request to join" (outlined orange pill, --r-pill, 40pt) for public pods requiring approval. Auto-accept public pods show "join pod" (filled orange pill) instead — but the distinction is always visually explicit so the user always knows which action they're taking.
- **Consent rule (hard constraint)**: There is no pod state in which tapping a Pod Card silently adds the user as a member, and there is no pod state in which a user is silently added to someone else's pod. "Auto-accept" only ever means the *pod owner* pre-approved open joining for public pods — the joining user still takes an explicit, visible "join pod" action; it is never triggered by any other interaction (e.g. viewing a profile, tapping a suggestion chip, or a background match).
- **Variants**:
  - My Pods (owned/joined): shows activity pulse + no join CTA, tap opens Pod Detail
  - Discover — recommended: includes the "why this pod" Transparency Chip
  - Discover — browse: no transparency chip, standard join CTA
  - Request pending: join CTA replaced with disabled "request sent" pill (white at 10% bg, white at 40% text)
- **Gestures**: Tap card body opens Pod Detail (stack push). Tap "request to join" / "join pod" triggers the join flow inline (no navigation) with optimistic UI + haptic. Long-press reveals Quick Actions Menu ("mute", "leave", "report") for joined pods only.
- **Size**: Full-width minus 32pt x ~132pt (My Pods) / ~168pt (Discover, with transparency chip and join CTA)

### Member Avatar Stack
- **Purpose**: Compact visual summary of pod composition
- **Data source**: Derived from pod member list (first 5 members by recency, then overflow count)
- **Visual treatment**: Overlapping 28pt circles with 8pt overlap (matches Group Card member-avatar pattern from Accountability [46]). Photo if available, else first initial on orange (#FF5E00) circle with white text. 1.5pt ink-brown-800 border ring on each avatar to separate from background.
- **Content**: Max 5 avatars visible, "+N" overflow indicator as a 6th circle (white at 10% bg, white at 60% text, 12pt Cabinet Grotesk SemiBold 600)
- **Gestures**: Tap any avatar opens the Limited Member Profile bottom sheet (same pattern as Leaderboard [39] Limited User Profile)
- **Size**: Auto-width (up to ~148pt for 6 circles) x 28pt

### Consent-Aware Empty State (Discover, first-run)
- **Purpose**: Introduce opt-in matching with explicit, plain-language consent framing before any recommendation logic runs. This is the privacy gateway for Discover, structurally equivalent to the Master Consent Banner on Accountability [46].
- **Data source**: API — GET /api/pods/matching-consent
- **Visual treatment**: Full-bleed centered state replacing the Recommended and Browse sections. ink-brown-800 glassmorphism card, --r-2xl (40pt), 32pt padding, 16pt horizontal margins.
- **Content**:
  - Illustration/icon: outlined "people finding each other" glyph (56pt, white at 15%), centered
  - Title: "find your people" — 20pt Cabinet Grotesk Bold 700, white, centered
  - Body: "Balencia can suggest pods based on shared goals and habits — using only what you've explicitly logged. Nothing is shared with a pod until you choose to join it." — 15pt Switzer Regular 400, white at 60%, center-aligned, max 3 lines
  - Consent CTA: "enable pod matching" — Brand CTA Button (56pt, --r-pill, full-width minus 64pt)
  - Secondary link: "browse public pods without matching" — 14pt Switzer Medium 500, white at 50%, centered, underline on press. Routes straight to the Browse Public Pods section with matching left off.
- **Gestures**: Tap primary CTA opens the Matching Consent modal (granular toggles: interest-based matching, behavior-pattern matching, allow pods to see match reasoning). Tap secondary link dismisses to plain browse.
- **Size**: Full-width minus 32pt x ~320pt

### "Why This Pod" Transparency Chip
- **Purpose**: Make every AI-driven pod recommendation explainable in one glance — no silent scoring. This is the discovery-side counterpart to the AI Suggestion Card pattern from Accountability [46].
- **Data source**: API — matching_reason field on GET /api/pods/recommended response (e.g. "you both log AM workouts 5x/week", "shared savings goal pattern with 3 members")
- **Visual treatment**: Inline within the Pod Card, not a separate floating element. Purple (#7F24FF) lightbulb icon (14pt) + reasoning text (13pt Switzer Regular 400, white at 60%, max 2 lines). Sits directly below the member count row, 8pt gap.
- **Content**: "💡 why: [plain-language reason derived from embedding similarity]"
- **Variants**: Single reason (default), Multi-signal (shows the strongest reason + "and 2 more" tappable expansion)
- **Gestures**: Tap expands to a short list of the top 3 contributing signals (inline, no modal) — reinforces transparency over a single terse line
- **Size**: Full-width minus card padding x ~32pt (1-line) / ~48pt (2-line)

### Interest Filter Chip Row
- **Purpose**: Narrow Discover results by category
- **Data source**: View state (local), triggers server-side filtered fetch
- **Visual treatment**: Identical to Filter Chip / Filter Tab Row pattern (Screen 13). Horizontal scroll, 16pt leading margin.
- **Content**: "all" / "fitness" / "career" / "mindful" / "finance" / "parenting" / "creative" / "custom" chips
- **Variants**: One active at a time, "all" is default
- **Gestures**: Tap chip to filter (server-side, debounced 300ms if paired with search)
- **Size**: Full-width x 36pt

### Pod Activity Feed (mini, within Pod Detail)
- **Purpose**: Chronological pulse of what's happening inside a specific pod — the "why should I check in" signal
- **Data source**: API — GET /api/pods/:podId/activity, paginated (cursor-based, 20 per page)
- **Visual treatment**: Rows within an ink-brown-800 glassmorphism card. 20pt radius on outer card. Each row separated by 1pt white at 5%.
- **Content per row** (48pt tall):
  - Actor name (inline, bold): "Ahmed" — 14pt Cabinet Grotesk SemiBold 600, white
  - Action text: "checked in" / "hit a 7-day streak" / "joined the pod" / "completed the challenge" — 14pt Switzer Regular 400, white at 70%
  - Timestamp (right-aligned): "2h ago" — 12pt Switzer Regular 400, white at 40%
  - Icon (left, 16pt): check-in (circle check, green), streak (flame, orange), join (person-plus, white at 40%), challenge (trophy, purple)
- **Variants**: Standard entry, Milestone entry (subtle green left accent, 2pt), Own-activity entry (subtle orange left accent, 2pt, "You" instead of name)
- **Gestures**: Tap entry opens the relevant detail (e.g. tap a check-in opens that member's Limited Profile)
- **Size**: Full-width minus 32pt x 48pt per row, max 6 rows visible before "view all activity" link

### Group Challenge Card
- **Purpose**: Surface shared, pod-scoped challenges linked to the Competitions system
- **Data source**: API — GET /api/pods/:podId/challenges, GET /api/competitions/:id/leaderboard for participant counts
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 20pt padding. 16pt horizontal margins.
- **Content**:
  - Title: challenge name in quotes — 15pt Cabinet Grotesk SemiBold 600, white
  - Progress bar (8pt below title): full-width, 8pt tall, --r-pill, track white at 8%, fill orange (#FF5E00)
  - Participation line: "6/8 joined" — 13pt Switzer Regular 400, white at 50%, 4pt below bar
  - "view leaderboard" link: 13pt Cabinet Grotesk SemiBold 600, orange, right-aligned, navigates to Competitions [47]
- **Variants**: Active (standard), Ending soon (<24h, orange pulse on a small badge), Completed (green checkmark badge, muted 70% opacity)
- **Gestures**: Tap "view leaderboard" or card body navigates to Competitions [47] detail (stack push)
- **Size**: Full-width minus 32pt x ~104pt

### Anti-Cheat Badge
- **Purpose**: Subtle, non-alarming trust indicator on leaderboard-linked pods, showing the pod's competitive integrity is actively monitored (anti-cheat matching, accept-rate throttling, rate limits from the Social Growth audit). Reassurance, not accusation — never shown as a warning.
- **Data source**: API — pod.anti_cheat_status field (clean / flagged / under_review). Only rendered for pods linked to a Competitions [47] leaderboard.
- **Visual treatment**: Small pill, 20pt height, --r-pill, 8pt horizontal padding. Shield icon (12pt) + status text (11pt Cabinet Grotesk SemiBold 600).
  - "clean": Forest green (#34A853) at 15% bg, green text, filled shield icon. "🛡 clean"
  - "flagged" (visible only to the pod owner/moderator, never other members): orange (#FF5E00) at 15% bg, orange text, outlined shield icon. "🛡 review"
- **Variants**: Clean (default, visible to all), Under review (owner/moderator-only visibility — never shown to general members or in Discover, to avoid unwarranted reputational harm before review completes)
- **Gestures**: Tap opens a short explainer sheet: "This pod's leaderboard activity is monitored for fairness. [learn more]"
- **Size**: Auto-width (~76pt) x 20pt

### Report/Moderate Action Sheet (Bottom Sheet)
- **Purpose**: Trust & safety surface — flag content, report a member, or block a member, without leaving the current context
- **Visual treatment**: Bottom sheet, ~50% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel")
  - Title: "report" — 17pt Cabinet Grotesk Bold 700, white
  - Context summary: what is being reported (member name, activity entry, or the pod itself)
  - Reason list (radio-style rows, 48pt each): "harassment", "spam", "inappropriate content", "fake activity / cheating", "other"
  - Details input (conditional, shown for "other"): Multi-line text area (80pt). Placeholder: "add details (optional)"
  - "block this member" toggle (only shown when reporting a member): Toggle Switch + label — removes them from the user's own pod view and prevents future pod-matching with them
  - "submit report" button: Full-width, error-red-tinted CTA (56pt, --r-pill, #F44336 fill) — the one place on this screen that intentionally breaks from orange CTA convention, signaling severity
- **Gestures**: Drag to dismiss, tap submit posts via POST /api/pods/reports. Confirmation toast on submit: "report received — our trust & safety team will review within 24h"
- **Caution**: "block this member" is irreversible without a support request; shows an inline warning line beneath the toggle before submission

### Create Pod Modal (Bottom Sheet)
- **Purpose**: Create a new pod, with privacy and consent model decided up front by the creator
- **Visual treatment**: Bottom sheet, ~80% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "create")
  - Name input: Text Input Field (52pt). Placeholder: "pod name"
  - Description input: Multi-line text area (80pt). Placeholder: "what is this pod about?"
  - Privacy level selector: Three pill buttons — "public" / "private" / "invite only". Default: private.
    - Inline explainer beneath, updates per selection: "public" → "anyone can find and request to join"; "private" → "visible in Discover, requires your approval to join"; "invite only" → "hidden from Discover, join by invite link only"
  - Join model selector (shown only when "public" is selected): "request to join" / "auto-accept" pills. Default: request to join. Inline note: "auto-accept still requires the joining member to tap 'join pod' — no one is added without their own action."
  - Member cap: Stepper, 4 to 50 members, default 12
  - Interest category: Dropdown — fitness, career, mindful, finance, parenting, creative, custom
  - "link to a leaderboard" toggle (optional): Toggle Switch — if enabled, connects the pod to a new or existing Competitions [47] leaderboard and enables the Anti-Cheat Badge
  - "create" button: Full-width orange CTA (56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap create to save and navigate directly into the new Pod Detail screen
- **Size**: ~80% screen height

### Join Requests Bottom Sheet
- **Purpose**: Resolve incoming join requests for a pod the user owns — the explicit accept/decline consent surface
- **Visual treatment**: Bottom sheet, ~60% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("done")
  - Pod context: pod name + "N requests" count
  - Requester rows (Person Row pattern, Screen 33): avatar + name + optional short message + "accept" (orange filled pill, 36pt) / "decline" (outlined pill, 36pt) buttons
- **Gestures**: Drag to dismiss, tap accept/decline resolves per-request immediately (optimistic UI, undo toast for 5s)

### Matching Consent Modal (Bottom Sheet)
- **Purpose**: Granular opt-in controls for embedding-based pod matching — the detailed consent surface behind the Discover empty-state CTA. Nothing about a user's behavior patterns feeds the matching engine until every relevant toggle here is explicitly on.
- **Visual treatment**: Bottom sheet, ~65% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "save")
  - Title: "pod matching preferences" — 17pt Cabinet Grotesk Bold 700, white
  - Section: "what can be matched on"
    - Toggle: "interest-based matching" — matches on declared categories only (fitness, career, etc.)
    - Toggle: "behavior-pattern matching" — matches on logged habit/goal similarity (the embedding-based engine). Sub-copy: "uses patterns from your check-ins and goals — never message content, never journal entries."
  - Section: "what pods can see"
    - Toggle: "allow pods to see match reasoning" — controls whether a joined pod's owner can see *why* the matching engine suggested the user to them (default off; when off, the user still sees their own "why this pod" chip, but the pod owner does not see the inverse)
  - Section: "visibility"
    - Toggle: "appear in other members' Discover tab" — the master reciprocal switch; when off, the user can still browse and request to join pods, but will never be suggested to others
  - "disable all matching" link: 14pt Switzer Medium 500, #F44336, center-aligned, 44pt touch target. Triggers confirmation before executing POST /api/pods/matching-consent/disable-all.
  - "save" button: Full-width orange CTA (56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap save to update via PUT /api/pods/matching-consent
- **Size**: ~65% screen height

### Leave Pod Confirmation Dialog
- **Purpose**: Confirm an irreversible-feeling action (leaving forfeits pod-scoped streaks and activity history visibility) before it executes
- **Visual treatment**: Centered system-style dialog, ink-brown-800 bg, --r-lg (20pt), 24pt padding, max-width 320pt, backdrop ink-900 at 70%
- **Content**:
  - Title: "leave Morning Crew?" — 17pt Cabinet Grotesk Bold 700, white, centered
  - Body: "you'll lose access to this pod's activity feed and shared challenges. you can request to rejoin later if the pod is public." — 14pt Switzer Regular 400, white at 60%, centered
  - Two buttons, side by side, 12pt gap: "cancel" (outlined, white at 10% border, white text) + "leave" (filled #F44336, white text), each 44pt tall, --r-pill
- **Gestures**: Tap backdrop or "cancel" dismisses, tap "leave" executes DELETE /api/pods/:podId/membership and pops back to My Pods list
- **Size**: ~320pt wide x ~180pt tall, centered

### Pod Settings (Bottom Sheet, owner/moderator only)
- **Purpose**: Let a pod owner adjust privacy level, join model, member cap, and leaderboard link after creation — reached from the Pod Detail overflow menu, never from a plain member's view
- **Visual treatment**: Bottom sheet, ~70% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "save")
  - Same field set as the Create Pod Modal (privacy level, join model, member cap, interest category, leaderboard link toggle), pre-filled with current values
  - Additional section: "moderators" — list of members promoted to moderator (can resolve join requests, cannot delete the pod), with "add moderator" picker
  - "archive pod" link: 14pt Switzer Medium 500, white at 40%, center-aligned — soft-deletes the pod (hidden from Discover, existing members retain read-only access to history) without destroying activity records
  - "delete pod permanently" link: 14pt Switzer Medium 500, #F44336, center-aligned, below archive — requires typed pod-name confirmation before executing
  - "save" button: Full-width orange CTA (56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap save to update via PATCH /api/pods/:podId
- **Access control**: Entry point (Pod Detail overflow menu "pod settings" item) is only rendered when the viewer's role in that pod is owner or moderator — members and non-members never see this option
- **Size**: ~70% screen height

### Limited Member Profile (Bottom Sheet)
- **Purpose**: Quick view of a pod member's public stats without leaving the pod context
- **Data source**: API — public profile data, reuses the Leaderboard [39] Limited User Profile pattern
- **Visual treatment**: Bottom sheet, ~45% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Avatar: 64pt, centered
  - Name: 20pt Cabinet Grotesk Bold 700, white, centered
  - Role badge (if owner/moderator in this pod): centered, below name
  - Pod-shared streak / top domain: Domain Tag Chip row, centered
  - "view reputation" link: 14pt Cabinet Grotesk SemiBold 600, orange, centered, navigates to Reputation [67] (limited/public view)
- **Gestures**: Drag to dismiss, tap outside to dismiss

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Screen header title | Cabinet Grotesk | 600 (SemiBold) | 17pt | 22pt | White #FFFFFF | "Groups & Pods" |
| Section eyebrow | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White at 40% | Uppercase, +0.12em tracking |
| Pod name | Cabinet Grotesk | 600 (SemiBold) | 16pt | 22pt | White #FFFFFF | Pod Card title |
| Member count | Switzer | 400 (Regular) | 13pt | 18pt | White at 50% | "8 members" |
| Activity pulse text | Switzer | 400 (Regular) | 13pt | 18pt | White at 60% | "3 check-ins today" |
| Privacy/consent line | Switzer | 400 (Regular) | 13pt | 18pt | White at 50% | "private · auto-accept" — always present |
| Transparency chip text | Switzer | 400 (Regular) | 13pt | 18pt | White at 60% | "why:" reasoning |
| Join CTA (pill) | Cabinet Grotesk | 600 (SemiBold) | 14pt | 18pt | White or orange | "request to join", "join pod" |
| Anti-Cheat badge text | Cabinet Grotesk | 600 (SemiBold) | 11pt | 14pt | Green or orange | "clean" / "review" |
| Pending requests banner title | Switzer | 500 (Medium) | 15pt | 20pt | White #FFFFFF | Count text |
| Consent empty-state title | Cabinet Grotesk | 700 (Bold) | 20pt | 26pt | White #FFFFFF | "find your people" |
| Consent empty-state body | Switzer | 400 (Regular) | 15pt | 22pt | White at 60% | Explanation text |
| Activity feed actor | Cabinet Grotesk | 600 (SemiBold) | 14pt | 20pt | White #FFFFFF | Name, inline bold |
| Activity feed action | Switzer | 400 (Regular) | 14pt | 20pt | White at 70% | "checked in" |
| Activity feed timestamp | Switzer | 400 (Regular) | 12pt | 16pt | White at 40% | "2h ago" |
| Challenge title | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | White #FFFFFF | In quotes |
| Challenge participation | Switzer | 400 (Regular) | 13pt | 18pt | White at 50% | "6/8 joined" |
| CTA link text | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | #FF5E00 | "review", "view leaderboard" |
| Modal heading | Cabinet Grotesk | 700 (Bold) | 17pt | 22pt | White #FFFFFF | Modal titles |
| Input placeholder | Switzer | 400 (Regular) | 16pt | 22pt | White at 40% | All input fields |
| Report reason row | Switzer | 400 (Regular) | 15pt | 20pt | White #FFFFFF | Radio row label |
| Submit report CTA | Cabinet Grotesk | 600 (SemiBold) | 17pt | 22pt | White #FFFFFF | On error-red fill |
| Stat/count values | Cabinet Grotesk | 700 (Bold) | 16-20pt | Context | White #FFFFFF | Member counts, request counts |

---

## Composition & Visual Hierarchy

**Squint test**:
- The segmented tab immediately orients the user to "what I'm already in" vs. "what I could join"
- On My Pods: pod cards form a clean vertical list, each with a colored activity-pulse dot as the only high-saturation accent per row — the eye lands on "is this pod alive right now?" first
- On Discover: the purple lightbulb + reasoning text on recommended cards is the visual signal that separates "AI thinks this fits you" from plain browsing — max one purple element per card, never competing with the orange join CTA
- The consent/privacy line on every Pod Card is intentionally muted (white at 50%) but always present at a fixed position — consistency here builds trust through repetition, not loudness
- Anti-Cheat Badges are small and calm (green shield pill) — reassurance, not a security-alert aesthetic
- Pod Detail leads with identity (name, privacy, trust badge) before any content, then narrows: membership state → roster → activity → challenges → exit actions (leave/report), mirroring the Detail Screen Template's "primary action before progressive disclosure" order

**Spacing breakdown (8pt grid)**:
- Screen header height: 44pt
- Header to segmented tab: 12pt (--s-3)
- Segmented tab to content: 16pt (--s-4)
- Section eyebrow to card below: 12pt (--s-3)
- Between cards within section: 16pt (--s-4)
- Between sections: 24pt (--s-5)
- Card internal padding: 20pt
- Last content to tab bar: 24pt (--s-5)
- Tab bar: 56pt + 34pt safe area
- Pod Detail: hero to membership CTA 16pt, section-to-section 24pt, action row bottom padding 32pt

**Z-layers**:
- z-0: ink-900 background
- z-10: Content cards (pod cards, activity feed rows, challenge cards)
- z-20: Pending requests banner, consent empty-state card
- z-30: Screen header (backdrop-blur on scroll), segmented tab, interest filter chip row (sticky)
- z-40: FAB, Tab bar
- z-50: Bottom sheets (create pod, join requests, matching consent, report/moderate, limited member profile)
- z-60: Confirmation dialogs (leave pod, block member)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base (all views) |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Segmented active | #FF5E00 | orange (primary) | Active tab fill |
| Pending requests banner border | #FF5E00 | orange (primary) | Left accent, 3pt |
| Join CTA (filled) | #FF5E00 | orange (primary) | "join pod" |
| Join CTA (outlined) | #FF5E00 border, transparent fill | orange (primary) | "request to join" |
| FAB background | #FF5E00 | orange (primary) | "create pod" CTA |
| Filter chip active | #FF5E00 | orange (primary) | Active interest filter |
| CTA links | #FF5E00 | orange (primary) | "review", "view leaderboard" |
| Own-activity accent | #FF5E00 | orange (primary) | Left border on own feed entries |
| Activity pulse — active | #34A853 | green (secondary) | "N check-ins today" dot |
| Anti-Cheat badge (clean) | #34A853 at 15% bg | green (secondary) | "clean" pill |
| Challenge progress fill | #34A853 or #FF5E00 | green/orange | Green on completion, orange in progress |
| Milestone feed accent | #34A853 | green (secondary) | Left border on milestone entries |
| Recommendation indicator | #7F24FF | purple (SIA) | Lightbulb icon, transparency chip only |
| Anti-Cheat badge (review) | #FF5E00 at 15% bg | orange (primary) | Owner/moderator-only visibility |
| Report submit CTA | #F44336 | error | Only intentional break from orange CTA |
| Block member warning | #F44336 | error | Inline warning text |
| Activity pulse — dormant | white at 30% | -- | "quiet today" dot |
| Privacy/consent line | white at 50% | -- | Always-present trust text |
| Primary text | #FFFFFF | white | Names, titles |
| Secondary text | white at 60% | -- | Descriptions, reasoning |
| Tertiary text | white at 50% | -- | Counts, metadata |
| Quaternary text | white at 40% | -- | Eyebrows, timestamps |

**60/30/10 verification**: Orange dominates on the segmented control, all join CTAs, the FAB, filter chips, CTA links, and own-activity accents — the clear visual driver on both tab states. Green appears on active-pulse dots, the Anti-Cheat "clean" badge, completed-challenge fills, and milestone accents — the growth/trust signal, never on primary actions. Purple appears only on the lightbulb icon inside the "why this pod" transparency chip — max one element per recommended card, reserved strictly for AI-origin content, matching the SIA-only convention established on Accountability [46] and Leaderboard [39]. Red is reserved exclusively for the report/block trust-and-safety surface — it never appears in normal browsing or joining flows, keeping the ratio intact.

---

## Interaction States

### Pod Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard layout | -- |
| Pressed | Card bg lightens, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | Skeleton shimmer for name, avatar stack, activity line | -- |
| Request sent | Join CTA replaced with disabled "request sent" pill | light impact on transition |
| Join success | Card border briefly pulses green, then transitions to My Pods list (520ms) | success notification |

### Segmented Tab
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white 60% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill slides in, white text | medium impact |

### Interest Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white 10% border, white 60% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange bg, white text | medium impact |

### Join CTA (Request to Join / Join Pod)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Outlined or filled orange per join model | -- |
| Pressed | Darker orange / bg darkens, scale(0.96) | medium impact |
| Loading | Spinner replaces label | -- |
| Sent/Joined | Disabled state, muted colors | success notification |

### FAB
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, --shadow-2 | -- |
| Pressed | Darker orange, scale(0.95), --shadow-1 | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | -- |

### Anti-Cheat Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default (clean) | Green pill, filled shield | -- |
| Pressed | Opens explainer sheet | light impact |
| Under review (owner-only) | Orange pill, outlined shield | -- |

### Report/Moderate Reason Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | White 10% border circle | -- |
| Selected | Orange filled circle + white dot | light impact |
| Pressed | Row bg white at 5% | light impact |

### Member Avatar Stack
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Overlapping circles, static | -- |
| Individual avatar pressed | Avatar scales(1.08), lifts 1pt with subtle shadow | light impact |
| Overflow "+N" pressed | Opens full Member Roster Grid (Pod Detail) if not already there | light impact |
| Loading | Skeleton circles, shimmer | -- |

### "Why This Pod" Transparency Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Collapsed (default) | Single-line reasoning, lightbulb icon static | -- |
| Pressed | Expands to 3-signal list, chevron rotates 0→90deg | light impact |
| Expanded | Full signal list visible, "show less" replaces chevron | -- |

### Matching Consent Toggle
| State | Visual | Haptic |
|-------|--------|--------|
| Off | white at 15% bg, white circle left | -- |
| On | orange bg, white circle right | light impact |
| Transition | Circle slides + bg crossfades | 160ms |

### Leave Pod Confirmation Dialog
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Centered, backdrop dimmed | -- |
| "leave" pressed | Button darkens (#D32F2F), scale(0.97) | medium impact |
| Confirmed | Dialog fades out, toast confirms "you left Morning Crew" | success notification |

### Gesture Map — My Pods Tab
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload pods, activity pulse) |
| Tap | Pod card body | Open Pod Detail (stack push) |
| Long-press | Pod card | Reveal Quick Actions Menu (mute/leave/report) |
| Tap | Pending requests banner | Open Join Requests bottom sheet |
| Tap | FAB | Open Create Pod modal |
| Tap | Segmented tab | Switch to Discover |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |

### Gesture Map — Discover Tab
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload recommendations) |
| Tap | Interest filter chip | Filter public pod list |
| Tap | Pod card body | Open Pod Detail (stack push) |
| Tap | "request to join" / "join pod" | Trigger join flow inline |
| Tap | Transparency chip expansion | Show top 3 matching signals inline |
| Tap | "enable pod matching" | Open Matching Consent modal |
| Tap | FAB | Open Create Pod modal |
| Tap | Segmented tab | Switch to My Pods |
| Scroll to end | List | Load next page (cursor-based) |

### Gesture Map — Pod Detail
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload roster, activity, challenges) |
| Tap | Overflow menu | Open report/mute/share options |
| Tap | Membership CTA | Join, request, or no-op (already member) |
| Tap | Member avatar | Open Limited Member Profile bottom sheet |
| Tap | Activity feed entry | Open relevant detail (member profile or check-in) |
| Tap | Group Challenge card / "view leaderboard" | Navigate to Competitions [47] |
| Tap | "leave pod" | Open leave confirmation dialog |
| Tap | "report pod" | Open Report/Moderate Action Sheet |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: segmented tab (0ms), pending banner (80ms), first 3 pod cards (80ms stagger each starting at 160ms) | 280ms each | ease-out-soft |
| Segmented tab | Tap | Active indicator slides horizontally to new segment | 280ms | ease-out-soft |
| Tab content | Tab change | Content crossfade (old opacity 1→0 + translateY 0→-8, new opacity 0→1 + translateY 8→0) | 280ms | ease-out-soft |
| Activity pulse dot | Data refresh | Dot color crossfades (green↔white at 30%) | 160ms | ease-out-soft |
| Pod card join success | Join confirmed | Border pulses green (opacity 20%→50%→20%), then card animates out of Discover list into My Pods (520ms) | 520ms | ease-flow |
| Transparency chip expand | Tap | Height 0→auto + fade-in for the 3-signal list | 280ms | ease-out-soft |
| Filter chip | Tap | Active chip crossfade (old fades out, new fades in with orange fill) | 160ms | ease-out-soft |
| Public pod list | Scroll to end | New page fades in with 80ms stagger per card | 280ms each | ease-out-soft |
| Consent empty-state | Enabled | Card collapses (auto→0) + fade-out, Discover content fades in | 280ms | ease-out-soft |
| Anti-Cheat badge | Mount | Shield icon subtle scale pulse (1→1.1→1) once | 400ms | ease-flow |
| Pod Detail hero | Enter screen | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Group Challenge progress bar | Data load | Bar width animates 0→current ratio | 520ms | ease-flow |
| Activity feed entry | New activity | Entry fades in at top of feed | 280ms | ease-out-soft |
| FAB | Mount | scale(0.8→1) + opacity(0→1), 400ms delay | 280ms | ease-out-soft |
| Bottom sheets | Open | Sheet slides up from bottom + backdrop fades in | 520ms | ease-flow |
| Bottom sheets | Dismiss | Sheet slides down + backdrop fades out | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push from Community [40] or Explore [18]
- **Exit**: Stack pop

---

## Empty States

### Day 1 — My Pods Tab (no pods joined)
- Pod list: Replaced with centered message. Icon: outlined people-circle (48pt, white at 15%), centered. Title: "no pods yet" — 17pt Cabinet Grotesk Bold 700, white. Body: "pods are small, trusted groups working on the same thing. join one or start your own." — 15pt Switzer Regular 400, white at 50%, center-aligned, max 2 lines.
- Two CTAs beneath, stacked: "find a pod" (outlined orange pill, switches to Discover tab) + "create pod" (filled orange pill, opens Create Pod modal)
- Pending requests banner: Hidden entirely (nothing to review with zero pods).

### Day 1 — Discover Tab (matching not yet enabled)
- Full Consent-Aware Empty State shown (see Components section above) — this is the canonical first-run state for Discover.

### Established user — Discover Tab (matching enabled, no recommendations yet)
- Recommended section: Centered message. Icon: outlined magnifying-glass-heart (40pt, white at 15%). Title: "still learning your patterns" — 16pt Cabinet Grotesk SemiBold 600, white. Body: "log a few more check-ins and SIA will start suggesting pods that fit." — 14pt Switzer Regular 400, white at 50%.
- Browse Public Pods section: Shown normally beneath, unaffected.

### Established user — Discover Tab (no public pods match filter)
- Filtered view shows: "no pods in [category] yet. try another filter or create the first one." with tappable "clear filter" and "create pod" actions.

### Pod Detail — Activity Feed (new pod, no activity)
- Feed section: Centered message, compact. "no activity yet — be the first to check in." 14pt Switzer Regular 400, white at 50%.

### Pod Detail — Group Challenges (none active)
- Section replaced with a single dashed-border row: "no active challenges. [start one →]" — matches the Dashed Border Add Button pattern from Accountability [46].

### Pod at capacity (Discover)
- Join CTA on the Pod Card is replaced with a disabled pill: "pod is full" (white at 10% bg, white at 40% text). The card remains visible in Discover (does not silently disappear) so the user understands why they can't join, and a small "notify me if a spot opens" text link appears beneath it — tapping subscribes to a one-time capacity-freed notification without requiring a join request.

### All join requests declined (My Pods, as pod owner)
- Pending Requests Banner clears once the last outstanding request is resolved (no lingering "0 pending" state — hidden entirely per the visibility rule already defined).
- A one-time, low-emphasis toast confirms each resolution: "request declined" or "Ahmed joined Morning Crew" — never a blocking modal, keeps the review flow fast for owners managing several requests in sequence.

### Search / filter yields zero pods across all categories (Discover, platform-wide cold start)
- Full Browse Public Pods section shows: icon (outlined compass, 48pt, white at 15%), title "no public pods yet" (17pt Cabinet Grotesk Bold 700, white), body "be the first to start one in your area of focus." (15pt Switzer Regular 400, white at 50%), single CTA "create the first pod" (filled orange pill, opens Create Pod modal pre-scrolled to the interest category the user was filtering on).

---

## Motivation Adaptation

- **Low motivation**:
  - My Pods leads with the pod that has the gentlest activity framing (e.g. "Mindful Mornings — check in when you're ready" rather than streak pressure).
  - Activity pulse language avoids competitive framing ("a few members checked in" instead of exact counts).
  - Discover recommendations are capped at 1 and use softer copy ("this might be a good fit" instead of confident match percentages).
  - Group Challenge cards de-emphasize the progress bar and lead with participation warmth ("6 people are in this together") rather than numeric pressure.
  - Pending Requests Banner tone softens to "a couple of people would like to join" rather than a bare count, for owners who may find review tasks stressful during low-motivation periods.
- **Medium motivation**: Standard experience as described. All features visible, transparency chips present, normal pacing.
- **High motivation**:
  - Additional stats surface on Pod Cards: weekly activity sparkline, "most active member" callout.
  - Discover shows up to 5 recommendations with confidence-scored reasoning.
  - Group Challenge cards add a "your pace vs. pod average" comparison line.
  - Pod Detail's activity feed defaults to expanded (no truncation) with a filter-by-member option.
  - Anti-Cheat Badge gains a tappable "integrity stats" expansion showing the pod's clean-streak length.

---

## Cross-References

- **Navigates to**: Pod Detail (stack push from pod card), Competitions [47] (via Group Challenge "view leaderboard" link), Reputation [67] (via Limited Member Profile "view reputation" link), Accountability [46] (via "link to accountability pod" action in pod settings), Create Pod (modal from FAB), Join Requests (bottom sheet from pending banner), Matching Consent (modal from Discover empty state), Report/Moderate Action Sheet (modal from Pod Detail overflow or long-press), Limited Member Profile (bottom sheet from avatar tap)
- **Navigates from**: Screen [40] — Community & Chat Rooms (stack push via "pods" grid card), Screen [18] — Explore Section (stack push via social grid card), Screen [46] — Accountability (via Groups section "manage" link), Screen [09] — SIA Chat (deep-link), Screen [12] — Home Screen (via pod-activity alert card)
- **Shared components with**: Screen [46] — Accountability (Segmented Control, Group Card avatar-stack pattern, AI Suggestion Card / transparency framing, Dashed Border Add Button, Consent Banner pattern), Screen [39] — Leaderboard (Limited User Profile, Filter Toggle), Screen [47] — Competitions (Group Challenge Card ↔ Competition Leaderboard Card), Screen [33] — Relationships (Person Row pattern in Join Requests sheet), Screen [13] — Goals List (Filter Chip Row)
- **Patterns used**: Back Button, 8-State Model, Segmented Control (Screen 38), Filter Chip / Filter Tab Row (Screen 13), Toggle Switch (Screen 15), FAB (Screen 35), Modal Presentation (Batch 1), Text Input Field (Batch 1), Brand CTA Button (Batch 1), Section Eyebrow Label (Screen 12), Person Row (Screen 33), Limited User Profile (Screen 39), Detail Screen Template (Screen 27)
- **Patterns established**: Pod Card (name + avatar stack + activity pulse + always-visible privacy/consent line + contextual join CTA), Member Avatar Stack (overlapping circles, max 5 + overflow, reusable wherever a group roster needs a compact glance), Consent-Aware Empty State (explicit opt-in framing before any AI matching runs — the Discover-side counterpart to Accountability's Master Consent Banner), "Why This Pod" Transparency Chip (purple lightbulb + plain-language reasoning + expandable signal list — mandatory whenever an AI recommendation is surfaced), Anti-Cheat Badge (calm shield pill, clean/review states, owner-only visibility for unresolved review), Pending Requests Banner (owner-side consent-resolution surface), Pod Activity Feed (mini chronological stream, actor + action + timestamp), Group Challenge Card (pod-scoped challenge tied to Competitions), Report/Moderate Action Sheet (reason list + optional block toggle + red submit CTA — the one sanctioned break from orange-CTA convention), Leave/Report Action Row (always-visible trust-and-safety exit hatch at the bottom of Pod Detail), Matching Consent Modal (granular, reciprocal opt-in toggles — visibility is a two-way switch, not just an inbound preference), Pod Settings (owner/moderator-gated edit surface, archive-before-delete pattern for reversible removal), Leave Pod Confirmation Dialog (centered system-style dialog for consequence-bearing but non-destructive exits, distinct from the bottom-sheet pattern used for creation/editing flows)

**Consent invariant (hard constraint, restated for implementers)**: across every state on this screen — My Pods, Discover, Pod Detail, Create Pod, Pod Settings, and all bottom sheets — there is exactly one action that adds a user to a pod's member list: that user's own tap on "join pod" or a pod owner's explicit "accept" on a pending request. No background job, matching signal, notification tap, or default configuration may create a membership row. This mirrors the audit finding that flagged prior auto-enrollment as a consent gap on the legacy pods prototype, and this screen's design is the fix.
