### 1. Header
- **Screen ID:** 92
- **Name:** reputation
- **Route(s) covered:** `/reputation`
- **Tab:** Community / Social
- **Source:** Functional Content Brief: Reputation & Trust Score Profile
- **Batch:** 8

### 2. Purpose
Reputation shows a member's community trust standing with transparency and due process. It explains the composite score, tier progress, contributing metrics, history, flags, and concrete ways to improve without turning social participation into a popularity contest.

### 3. Entry & exit
- **Entry paths:** Community reputation module, peer profile trust badge, leaderboard score tap, feed interaction metric.
- **Exit paths:** Back returns to referrer. Learn how to earn opens Wiki [20]. Resolve flags opens Contracts [82]. Connect with mentor opens People [33]. Metric rows open explanation sheets.

### 4. Layout anatomy
**Regions top-to-bottom:**
1. **TopBar:** back chevron, title, privacy/safety glyph.
2. **Profile snippet:** avatar, name, tier label.
3. **Trust score hero:** composite score dial, tier badge, progress to next tier.
4. **Breakdown:** four metric cards for consistency, helpfulness, engagement, and accountability.
5. **History:** score trend with event list.
6. **Tiers and privileges:** horizontal ladder with current, next, and locked tiers.
7. **CIA insight:** qualitative explanation of recent movement.
8. **Trust transparency:** flags, reports, appeals, and safety controls.

**ASCII wireframe (390x844):**
```text
┌──────────────────────────────────────┐
│ ‹  Reputation                    ⓘ   │
│ ◯ Hamza                 Trusted      │
│ ┌──────────────────────────────────┐ │
│ │        Trust Score 82            │ │
│ │      ╭────────────╮              │ │
│ │      │  mentor    │              │ │
│ │      ╰────────────╯              │ │
│ │  18 points to next tier          │ │
│ └──────────────────────────────────┘ │
│ Breakdown                            │
│ consistency  ███████░  via activity  │
│ helpfulness  ██████░░  via feed      │
│ engagement   █████░░░  via community │
│ accountability ████░░  via contracts │
│ Reputation history                    │
│ ───●─────●─────●─────●               │
│ ✦ CIA insight                         │
│ Your helpful replies are lifting      │
│ trust this week.                      │
│ Privacy & safety                      │
│ flags 0 · appeals none · report path  │
└──────────────────────────────────────┘
```

### 5. Components
- **TopBar** with safety glyph and 44px controls.
- **ProfileSnippet** with avatar, display name, and tier.
- **ReputationDial** for composite trust score.
- **ProgressBar** for next-tier progress.
- **GlassStatCard** for hero score and tier.
- **SolidCard** metric rows for breakdown.
- **TrendChart** and **TimelineAgenda** for reputation history.
- **TierLadder** (NEW) for current/next/locked privileges.
- **CIAInsightCard** for synthesis.
- **TrustTransparencyPanel** (NEW) for flags, appeals, reports, and data controls.
- **ChipProvenance, ConfidenceMeter, HonestNullState, SkeletonState, ErrorState, OfflineBanner, PaywallLock, BtnSecondary** for states and gating.

### 6. Visual treatment
- **Atmosphere:** warm dark background with subtle social-register glow, never leaderboard spectacle.
- **Glass tiers:** hero dial and CIA insight use glass; breakdown and flags use SolidCard for legibility and seriousness.
- **Semantic glow:** hero score uses glow-you because it reflects the member's conduct; CIA insight uses glow-cia; resolved trust events use glow-done. Flags do not glow and never use red as public shaming.
- **Moderation tone:** flagged state is quiet, private, and action-oriented.

### 7. Content & copy
- **Title:** Reputation.
- **Hero labels:** Trust Score, Tier, 18 points to next tier.
- **Breakdown:** consistency, helpfulness, engagement, accountability.
- **Actions:** Learn how to earn, Resolve flags, Connect with mentor.
- **CIA insight:** Your helpful replies are lifting trust this week.
- **Empty:** You have not generated a reputation score yet. Participate in the community to build a record.
- **Loading:** Syncing reputation.
- **Error:** Error loading reputation data.
- **Flagged:** Some trust signals are under review. You can see why and respond.
- **Locked:** Upgrade to see deep-dive reputation analytics.

### 8. Data & honesty states
- **Trust score:** real = computed BFF score with ChipProvenance "via community + contracts"; low-confidence = muted score with "estimated · low confidence" while moderation data syncs; honest-null = "--" and starter copy.
- **Tier progress:** real = points to next tier; low-confidence = progress bar dimmed while score is reconciling; honest-null = ladder shows current base tier only.
- **Breakdown metrics:** real = separate values for consistency, helpfulness, engagement, accountability with source chips; low-confidence = row-level ConfidenceMeter; honest-null = row omitted if source has no data.
- **History:** real = score events and trend; low-confidence = cached trend dashed; honest-null = "History appears after your first trust event."
- **Trust flags:** real = count and appeal state, visible only to the member; low-confidence not applicable because flags are recorded moderation state; honest-null = "No active flags."
- **CIA insight:** real = explanation from score movement; low-confidence = "early read · low confidence"; honest-null = card omitted.

### 9. All states
- **Default:** hero, breakdown, history, tiers, CIA insight, and transparency panel render.
- **Skeleton:** dial, rows, chart, and ladder shimmer in final geometry.
- **Empty:** no score dial value; starter copy and Learn how to earn are shown.
- **Error:** ErrorState offers Retry while cached score remains if available.
- **Success:** new positive score event briefly flashes glow-done in the history row.
- **Disabled:** premium-only deep-dive rows sit behind PaywallLock; appeal buttons disable during submission with inline reason.
- **Offline:** cached reputation renders with staleness label; resolve/appeal actions are disabled until online.
- **Flagged:** private review panel appears above CIA insight, with evidence, policy link, and appeal path.

### 10. Motion & interaction
- Pull-to-refresh updates score. Tap metric row opens explanatory sheet. Swipe/scrub history to inspect events. Tap tier ladder cards to read privileges.
- ReputationDial draws to the score; history line draws left-to-right; new event rows insert with 250ms physical easing.
- Appeals and resolve actions show inline spinners and success/error states.
- **Reduced-motion path:** dial and chart render final state instantly; row insertions use no slide.

### 11. Motivation-tier adaptation
- **Low:** hero score, top two metric rows, and simple next step.
- **Medium:** default.
- **High:** full history, granular breakdown, predictive tier timing, and privileges ladder.

### 12. Accessibility
- Back, safety glyph, metric rows, tier cards, and actions meet 44px minimum targets.
- Score and tier are announced as text and progress, not color alone.
- Flags and appeals are private to screen reader focus order and not exposed as public badges.
- Trend chart has a table alternative listing date and point change.
- Locked analytics describe what is locked and why without blocking core score access.

### 13. Premium checklist
1. Route header matches `/reputation`.
2. Trust score is transparent and source-labeled.
3. Moderation data includes private due process.
4. No public shame state or alarm color.
5. Breakdown metrics name their sources.
6. CIA insight is optional and low-confidence aware.
7. Empty state does not invent a score.
8. Premium gating leaves the basic score accessible.
9. History and tier ladder are source-specific.
10. Default, Skeleton, Empty, Error, Success, Disabled, Offline, and Flagged states exist.
11. Reduced-motion path exists.
12. 44px target floor is stated.
13. Cross-links to Wiki, Contracts, People, Feed, Leaderboard, and Profiles are preserved.
14. Social trust controls include report, appeal, resolve, and privacy explanations.
