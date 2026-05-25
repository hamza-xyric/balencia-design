# Balencia Design Direction

> **What this document is**: The single source of truth for designing every screen in the Balencia mobile app. It consolidates the Vision Questionnaire, team decisions, and architectural direction into one place. Use this to create rough draft screen sketches.

> **What Balencia is**: An AI Life Coach — not a health app, not a fitness tracker. It connects every part of a user's life system and reveals the connections they can't see themselves. *"A coach in your pocket that guides you to a better life in all aspects — fitness, faith, finances, career, relationships — without overcomplicating anything, and giving you hidden insights about how it all connects."*

---

## 1. Core Principles

These govern every screen design decision:

1. **One life, not modules** — Life isn't tackled in silos. The UI must feel like managing one life with many dimensions, not switching between mini-apps. Domain-colored tags (not separate navigation) communicate which areas are in play.

2. **SIA is the coach** — SIA drives the experience. AI suggests, user reviews, accepts/edits/skips, AI learns. This pattern applies to ALL domains equally. SIA is proactive, adaptive, and always connecting dots.

3. **Simplicity over density** — Bevel-inspired visual clarity. Complex data becomes clean, actionable insight. The current app's 30+ sidebar items collapse into 5 bottom tabs + Explore. Progressive disclosure: power is there when wanted, invisible when not.

4. **Invisible connections, visible impact** — The Life Correlation system works behind the scenes. Users experience its power through SIA's insights, domain-colored tags showing cross-domain impact, and "Connection Spotted" moments — not through raw data dumps.

5. **Motivation-adaptive** — Data density, gamification intensity, SIA's tone, and notification frequency all adapt to the user's motivation tier (low/medium/high). View density is user-controlled independently.

6. **Native feel** — This is a React Native app. Bottom tab bar, stack navigation, swipe gestures, pull-to-refresh, haptic feedback. Users should not distinguish it from a native iOS/Android app.

---

## 2. Platform & Technical Direction

| Decision | Choice |
|----------|--------|
| **App platform** | React Native (native iOS & Android) |
| **Backend** | Existing Express.js API, adapting for mobile (push notifs, offline sync, mobile auth) |
| **Primary theme** | Dark mode (`ink-900 #0A0A0F` base, `ink-brown-800 #211008` elevated surfaces) |
| **Light mode** | Available as toggle, dark is default. Light uses `paper-100 #FEFAF3` |
| **Design reference** | Bevel (simplicity), Habitica (gamification), ChatGPT (AI interface polish) |
| **Desktop** | Not in scope for this redesign |

---

## 3. Navigation Architecture

### Bottom Tab Bar (5 items, always visible)

```
[ Home ]  [ SIA ]  [ Goals ]  [ Explore ]  [ Profile ]
```

1. **Home / Today** — Daily experience hub. SIA's greeting, AI-suggested actions, goals progress, schedule.
2. **SIA** — Unified AI Coach. Chat + voice. The core product.
3. **Goals / Life Areas** — Goal tracking, progress visualization, life domain overview.
4. **Explore** — Discover all modules, features, and tools across all domains. The "app store" for life improvement.
5. **Profile** — Settings, preferences, RPG character, Personal Wiki, connected services, subscription.

### Navigation Patterns

- **Stack navigation** within each tab (push/pop screens)
- **Tapping SIA's greeting on Home** navigates to the SIA tab (no inline expansion)
- **SIA deep-links** to feature screens contextually (rich cards in chat → tap to navigate)
- **Explore cards** push domain dashboards onto the Explore tab's stack
- **Pin system** (Notion-style) for quick-access shortcuts within navigation
- **Notifications** are minimal — history lives inside Profile, not a primary nav element

---

## 4. Screen Inventory

### 4.1 Pre-Auth & Onboarding

| # | Screen | Purpose |
|---|--------|---------|
| 1 | **Splash Screen** | Brand moment. Logo, brand stroke animation. < 2 seconds. |
| 2 | **Intro Video** | 30-second cinematic showing Balencia's cross-domain intelligence in action. Pre-recorded. Creates the "wow" moment before onboarding begins. Skippable. |
| 3 | **Welcome / Sign Up** | Account creation (name, email/social auth). Minimal fields. |
| 4 | **Sign In** | Returning user login. Social auth, email/password. |
| 5 | **Guest Mode Preview** | Sample/demo data showing what Balencia looks like in action — sample dashboards, example SIA insights, demo interactions. Minimum onboarding (name + 1-2 selections) before entry. |
| 6 | **SIA Onboarding Conversation** | The chatbot-driven onboarding. SIA asks questions conversationally with visual guidance at the top and recommendation chips at the bottom. Collects: life areas of interest, age/gender, integrations (WHOOP, Google Calendar, Spotify), subscription plan. Supports light mode (2-3 min) and deep mode (thorough assessment). Adaptive depth based on motivation tier. |
| 7 | **Initial Plan Summary** | SIA presents the generated plan — goals decomposed into daily actions across domains. User reviews, accepts, or customizes. The moment the user should feel excited to start. |
| 8 | **Subscription Selection** | Clear tier presentation: Basic (Free) / Pro / Premium. Contextual value props. Shown during onboarding or deferrable. |

**Emotional arc**: Recognition ("this gets me") → Motivation ("change is possible") → Excitement ("I have a coach and a plan")

### 4.2 Tab 1 — Home / Today

| # | Screen | Purpose |
|---|--------|---------|
| 9 | **Home Screen** | The daily briefing. Everything the user needs for today, curated by SIA. |

**Home Screen Elements (top to bottom):**

1. **SIA's greeting + daily check-in** — Conversational, not a form. *"Good morning Hamza! How are you feeling today?"* Tapping navigates to SIA tab.
2. **Today's AI-suggested actions** — Cross-domain action cards. Each tagged with domain colors showing which life areas they touch. Multi-domain tags when an action serves multiple areas.
3. **Active life goals with progress** — Progress rings/bars for current goals. Clean, scannable. RPG quest framing.
4. **Recent activity feed** — What the user has done, reinforcing momentum and streaks.
5. **Daily schedule / upcoming events** — Google Calendar integration. What's ahead today.

**Cross-domain connections** surface subtly through domain-colored tags on action items — not as a separate section. SIA's greeting may naturally reference connections.

**Data density adapts by motivation tier:**
- Low: SIA greeting + 1-2 actions + single most important goal
- Medium: 4-6 cards, schedule preview, goal progress, one insight
- High: Detailed metrics, charts, multiple goal breakdowns, full schedule

### 4.3 Tab 2 — SIA (AI Coach)

| # | Screen | Purpose |
|---|--------|---------|
| 10 | **SIA Chat** | The unified AI coach conversation. Text-based with rich inline content. |
| 11 | **SIA Voice Mode (In-Chat)** | Quick voice input — mic replaces keyboard, transcription appears in chat. |
| 12 | **SIA Voice Mode (Full-Screen)** | Immersive voice experience. 3D animated avatar front and center, waveform visualization, minimal text UI. For longer coaching sessions. |

**SIA Chat Details:**
- **Primary**: Clean chat messages (iMessage-like foundation)
- **Rich inline cards**: Charts, goal progress, meal plans, financial summaries appear within conversation (Perplexity/Claude artifacts style)
- **Sometimes text-only**: Simple insights or encouragement
- **Sometimes visual**: Data-backed observations pull up charts inline
- **Sometimes navigational**: SIA redirects to feature screens ("Let me show you your workout plan" → navigates)
- **Prominent mic button**: Always visible. Quick tap = in-chat voice. Long-press or dedicated mode button = full-screen immersive.
- **3D Avatar**: Animated VRM avatar that speaks and reacts. Builds trust and emotional connection. Present in voice mode; optional presence indicator in text chat.
- **Proactive messages**: SIA initiates — surfaces cross-domain connections, reminders, check-ins without being asked.
- **Deep-linking**: Rich cards are tappable → navigate to relevant screens. SIA can also create tasks/actions on the user's schedule.

**SIA Personality**: Adaptive, accountable, empathetic. Calls things out when needed. Kind when struggling. Pushy when needed. Shifts based on the user, not just motivation tier.

### 4.4 Tab 3 — Goals / Life Areas

| # | Screen | Purpose |
|---|--------|---------|
| 13 | **Goals List** | All active goals with progress. RPG quest framing (goals = missions). |
| 14 | **Goal Detail** | Full decomposition: all actions, domain tags, milestones, reasoning. Expandable layers — summary default, full detail on tap. |
| 15 | **Create / Edit Goal** | User states a goal → SIA structures it (assigns domain, generates actions, tracking signals, milestones). No explicit domain creation needed. |
| 16 | **Life Areas Overview** | Holistic view — life wheel/radar showing all domains with progress. Entry point to domain dashboards. |

**Goal Cards** show:
- Progress ring/bar (primary visual)
- Domain-colored tags
- Quest status in RPG system
- Additional elements (streak, next action, coaching note) appear contextually

**Progress Visualization** — Multiple views available:
- **List view**: Scrollable goals with progress bars
- **Wheel/radar view**: All domains at a glance
- **Per-goal detail**: Deep drill-down with milestones, history

**Goal decomposition visibility:**
- Default: Summary with expandable detail ("7 actions across 3 life areas" → tap for full breakdown)
- Low-motivation users see only daily actions
- High-motivation users see full plan with reasoning

### 4.5 Tab 4 — Explore

| # | Screen | Purpose |
|---|--------|---------|
| 17 | **Explore Main** | The "app store" for life improvement. Grid of module cards organized by domain. |

**Explore Layout:**
- AI recommendations at the top ("Suggested for you")
- Grid of module cards, categorized by life domain (Fitness, Finance, Spirituality, etc.)
- Each card: module name, brief description, domain color icon
- Tapping a card pushes the domain dashboard or feature screen onto the stack
- Pin system: users can pin favorites for quick access (appears as shortcuts in navigation)

**Everything lives here**: Workout library, meal planning, journal, habit tracking, prayer times, budgets, knowledge graph, breathing exercises, vision board, competitions, blogs, webinars, leaderboard, calendar, and more. Organized, not overwhelming.

### 4.6 Tab 5 — Profile

| # | Screen | Purpose |
|---|--------|---------|
| 18 | **Profile Main** | User info, RPG level/XP summary, quick links to settings and sub-screens. |
| 19 | **RPG Character Screen** | Full stats: level, XP bar, skill trees per domain (Fitness Lv.12, Finance Lv.8), earned rewards/equipment, quest completion history. |
| 20 | **Personal Wiki / SIA Memory** | Browsable, editable knowledge base of what SIA knows about the user. Insights feed integrated here — all AI-discovered correlations are browsable alongside the user's data. |
| 21 | **Settings** | App configuration, preferences. |
| 22 | **Preferences** | Communication style, timing, view density (user-controlled independently of motivation tier). |
| 23 | **Connected Services** | WHOOP, Google Calendar, Spotify management. Connect/disconnect, data sync status. |
| 24 | **Subscription & Billing** | Current plan, upgrade/downgrade, payment management. |
| 25 | **Notification History** | Scrollable list of past notifications. Minimal — not a primary feature. |
| 26 | **Help Center** | FAQ, guides + SIA can answer help questions conversationally. |

### 4.7 Domain Dashboards (pushed from Explore or SIA deep-links)

Each domain gets a full dashboard. The AI-first pattern applies universally: SIA suggests → user reviews → accepts/edits/skips → SIA learns. Domain dashboards share a common layout pattern but with domain-specific content.

| # | Screen | Purpose |
|---|--------|---------|
| 27 | **Fitness & Workouts** | AI-generated workout plans, WHOOP integration (sleep, HRV, recovery), exercise history, active workout tracker. |
| 28 | **Workout Detail / Active Workout** | Individual workout view. Timer, exercise list, set tracking, real-time feedback. |
| 29 | **Nutrition & Diet** | AI-suggested meals, macro tracking, water intake, food logging, nutritional analytics. |
| 30 | **Meal Detail / Food Logger** | Individual meal view, barcode/receipt scanning, macro breakdown. |
| 31 | **Finance / Money Map** | Full finance dashboard (Mint/YNAB level). Transaction tracking, budgets, savings goals, receipt scanning, spending analytics — connected to the life system (SIA correlates spending with mood, stress, exercise). |
| 32 | **Transaction / Budget Detail** | Individual transaction, budget category drill-down. |
| 33 | **Career & Work** | Career goals, AI-suggested skill-building and networking actions, growth trajectory, professional development coaching. |
| 34 | **Relationships** | Quality time tracking, relationship reflections, AI connection reminders ("You haven't called your mom this week"), suggested activities. |
| 35 | **Spirituality** | AI-adaptive — adjusts to user's faith practice. Prayer tracking/reminders, Quran reading progress (if Muslim), fasting schedules, daily reflections, meditation guidance. No rigid religious UI. |
| 36 | **Learning & Growth** | Reading goals, book tracking, course progress, AI-suggested learning paths, skill development, daily study prompts. |
| 37 | **Creativity** | Creative practice logging, project tracking/milestones, inspiration prompts from SIA, portfolio-style progress review. |

### 4.8 Wellbeing (Hybrid: 2 standalone screens + SIA-invoked features)

| # | Screen | Purpose |
|---|--------|---------|
| 38 | **Journal** | AI-guided journaling. SIA provides reflection prompts, user writes. Rich text. Standalone screen accessible from Explore. |
| 39 | **Habits** | Habit tracking and building. Daily habits, streak tracking, habit completion. Standalone screen accessible from Explore. |

**SIA-invoked wellbeing features** (no standalone screens — SIA surfaces them contextually):
- Mood and emotional check-ins
- Breathing exercises
- Meditation guidance
- Stress management tools
- Energy tracking
- Vision board
- Emotional reflections

These activate within the SIA conversation or as prompted actions on the Home screen.

### 4.9 Social & Community

| # | Screen | Purpose |
|---|--------|---------|
| 40 | **Leaderboard** | Duolingo-style competitive rankings. XP-based, tied to RPG system. Accessible from Explore. |
| 41 | **Community / Challenges** | Group features, shared challenges, accountability partners. Deprioritized for v1 but present. |

**Social philosophy**: Individual-first. The solo coaching experience is complete. Social is an optional motivational layer — available but not forced.

**Accountability**: SIA is the primary accountability partner. Users can optionally add human accountability buddies.

### 4.10 Supporting Screens

| # | Screen | Purpose |
|---|--------|---------|
| 42 | **Schedule / Calendar** | Daily planning view with Google Calendar sync. Accessible from Explore or Home. |
| 43 | **Knowledge Graph / Balencia City** | Interactive visualization of life connections. Power-user feature. The "Balencia City" concept (each domain = a room, zoom in for analytics) is the long-term vision but deferred until foundational design is established. For v1: a simpler but functional interactive graph visualization. |
| 44 | **Blogs / Articles** | Content library. SIA recommends relevant articles based on goals. Also serves SEO/marketing. |
| 45 | **Webinars / Recorded Content** | On-demand video library. Courses, educational content. SIA recommends contextually. |

### 4.11 Overlay / Modal Screens

| # | Screen | Purpose |
|---|--------|---------|
| 46 | **Celebration / Achievement** | Full-screen overlay for big milestones. Confetti, animation, SIA congratulations. Small wins = toast notification + XP popup. |
| 47 | **Paywall / Upgrade Prompt** | Contextual, dynamic. Adapts messaging to what the user was trying to do. Blurred preview for data features. SIA conversational upsell for in-chat moments. |
| 48 | **Daily Check-in** | NOT a modal — it's part of SIA's greeting on the Home screen. Conversational, not a form. |

### 4.12 Web (Separate from App)

| # | Screen | Purpose |
|---|--------|---------|
| 49 | **Landing Page** | Public marketing website. Conveys "AI Life Coach" identity. Cinematic animation, brand stroke, cross-domain intelligence demo. Drives app store downloads. |

---

## 5. User Flows

### 5.1 First-Time User

```
App Store → Download → Splash → Intro Video (30s, skippable)
→ Welcome / Sign Up (name, email/social)
→ SIA Onboarding Conversation:
    - Life areas of interest (from 8+ domains)
    - Age/gender
    - Connect integrations (WHOOP, Google Calendar, Spotify)
    - [Light path: 2-3 min] or [Deep path: 5-10 min assessment]
    - Adaptive depth by motivation tier
→ Subscription Selection (Basic/Pro/Premium)
→ Initial Plan Summary (SIA presents personalized plan)
→ Home Screen (day 1 experience begins)
```

### 5.2 "Just Want to Try It" User

```
Splash → Intro Video → Guest Mode Preview
→ Minimum onboarding (name + 1-2 selections)
→ Sample data experience:
    - Demo dashboards with dummy data
    - Example SIA insights and conversations
    - Sample weekly plan
    - Videos showing capabilities
→ Prompted to complete full onboarding when ready
```

### 5.3 Daily Return User

```
Open app → Home Screen:
    - SIA's greeting with conversational check-in
    - Today's AI-suggested actions (cross-domain tagged)
    - Active goals progress
    - Schedule
→ Tap SIA greeting → SIA tab (full conversation)
→ Complete actions → XP earned → RPG progress
→ SIA proactive insight appears → "Connection Spotted"
→ End of day: batched micro-wins summary or SIA reflection
```

### 5.4 Goal Creation

```
Goals tab → Create Goal (or SIA suggests one)
→ User states goal in natural language ("I want to save $5000 by December")
→ SIA structures it:
    - Assigns to domain (Finance)
    - Generates daily actions, tracking signals, milestones
    - Shows cross-domain connections ("This connects to your stress management goal")
→ User reviews, accepts/edits
→ Goal appears in Goals list as RPG quest
→ Daily actions appear on Home
```

### 5.5 Cross-Domain Insight Discovery

```
SIA discovers correlation:
    "Your spending spikes on days you skip exercise"
→ Surfaces via:
    - Push notification (if significant)
    - Home screen "Connection Spotted" card
    - SIA mentions in next conversation
    - Added to Personal Wiki / Insights feed
→ User taps → SIA explains the connection
→ SIA suggests action ("Want to set a budget alert for gym-skip days?")
→ User accepts → New cross-domain action created
```

---

## 6. RPG Gamification System

The user's life becomes an RPG journey. This must feel **premium and mature** — not cartoonish or gimmicky. The visual language of quests, XP, and leveling must match Balencia's brand aesthetic.

| Concept | Implementation |
|---------|---------------|
| **Goals** | Become missions/quests |
| **Sub-goals** | Become sub-quests |
| **XP** | Earned from completing actions, hitting milestones, maintaining streaks |
| **Leveling** | User levels up overall + per-domain skill levels (Fitness Lv.12, Finance Lv.8) |
| **Skill trees** | Each domain acts as a skill tree that levels with engagement |
| **Quests** | Cross-domain achievements become epic quests |
| **Challenges** | Time-limited events pushing harder effort |
| **Party system** | Work with accountability partners on shared quests |
| **Rewards** | Cosmetic or functional rewards earned through progression |
| **Streaks** | Prominent (Duolingo-style). Per-goal and per-habit streaks. Visible, meaningful, with consequences. |
| **Micro-wins** | Immediate XP popup + small animation. SIA acknowledges batched progress. |

**Gamification adapts by motivation tier:**
- Low: Heavy. Every tiny win celebrated. XP for logging in. Max encouragement.
- Medium: Balanced. Regular rewards, less hand-holding.
- High: Lighter. Focus on metrics and meaningful milestones. RPG elements subtle.

**Celebrations scale with achievement size:**
- Small wins: Toast notification + XP popup
- Big milestones: Full-screen celebration, confetti, SIA congratulations, cinematic animation

**RPG Character Screen** (in Profile): Shows full stats, overall level, XP bar, domain skill levels, earned rewards, quest history. This is where the user sees their "character" — the gamified representation of their real life progress.

**Open question**: How does gamification interact with the Life Correlation system? Could cross-domain correlations unlock special epic quests? Could quest completion in one domain grant bonus XP in correlated domains? This needs dedicated design exploration.

---

## 7. Subscription & Monetization

| Tier | What's Included |
|------|-----------------|
| **Basic (Free)** | Dashboard, limited goal tracking (1-2 domains), basic features (journal, habits) without AI. No or very limited SIA. No cross-domain insights. |
| **Pro** | Full SIA coaching, all domains, cross-domain insights, RPG gamification, moderate AI usage with visible usage meter. |
| **Premium** | Unlimited SIA, advanced analytics, priority AI processing, full RPG features, family/team features. |

**Paywalls**: Contextual and dynamic. Messaging adapts to what the user was trying to do. Blurred previews for data features. SIA conversational upsell. One-time trial for key premium features.

**AI usage**: Tiered. Free = 5-10 messages/day. Pro = generous daily limits with real-time usage meter. Premium = unlimited/near-unlimited. Soft limits over hard blocks. Graceful degradation to lighter model rather than cutoff.

---

## 8. Visual & Emotional Design

### Color System

| Element | Value |
|---------|-------|
| Primary background (dark) | `ink-900 #0A0A0F` |
| Elevated surfaces (dark) | `ink-brown-800 #211008` |
| Light mode background | `paper-100 #FEFAF3` |

### Domain Colors

| Domain | Color | Hex |
|--------|-------|-----|
| Career | Indigo | #6366f1 |
| Relationships | Pink | #ec4899 |
| Creativity | Amber | #f59e0b |
| Spirituality | Purple | #8b5cf6 |
| Finance | Emerald | #10b981 |
| Fitness | Red | #ef4444 |
| Learning | Cyan | #06b6d4 |
| Custom | Slate | #64748b |

### Typography
- Inter (default), Poppins (headings), other brand fonts as established

### Icons
- Rounded, 2px stroke, outlined only, 24px minimum
- Active states use filled variants
- Domain icons use designated domain colors

### Animation Levels

| Area | Level |
|------|-------|
| Onboarding | Polished |
| Home/Dashboard | Polished |
| SIA Chat | Polished (fast — 200-300ms) |
| Feature screens | Minimal to Polished (data-heavy = minimal) |
| Settings/Profile | Minimal |
| Celebrations | Cinematic |

### Motion Guidelines
- Signature: `cubic-bezier(.65,.05,.36,1)` (ease-flow)
- Standard: `cubic-bezier(.22,.61,.36,1)` (ease-out-soft)
- Never linear easing
- Durations: 160ms (fast), 280ms (standard), 520ms (dramatic), 1.2s (cinematic)

### Brand Elements
- **Continuous stroke line**: Hero sections, dividers, transitions, onboarding, achievements, domain transitions. NOT on data-heavy screens.
- **Photography + Illustrations**: Warm photography for marketing/onboarding. Custom illustrations for empty states and feature explanations.

---

## 9. Notification Strategy

| Priority | Type | Channel |
|----------|------|---------|
| 1 | SIA proactive AI insights/suggestions | Push + Home card |
| 2 | Reminders (actions, workouts, meals, prayer) | Push |
| 3 | Check-in prompts, streak alerts, engagement nudges | Push + Home card |

**Frequency adapts by motivation tier:**
- Low: Max 1/day, only high-impact
- Medium: 2-3/day, mix of insights, reminders, check-ins
- High: 5+/day, including accountability prompts and detailed updates

**SIA learns optimal timing** based on engagement patterns (morning vs evening, weekday vs weekend).

Users can override and configure per-category in Settings.

---

## 10. Screen Design Priority (Build Order)

| Priority | Screen Group | Why First |
|----------|-------------|-----------|
| 1 | Landing Page (web) | First impression, drives downloads |
| 2 | Onboarding Flow | First in-app experience, sets emotional tone |
| 3 | Home / Today | The daily screen. Most-seen, most-used. |
| 4 | SIA Chat + Voice | The core product |
| 5 | Goals & Plans | Primary tracking interaction |
| 6 | Life Areas Overview | Holistic view, domain entry point |
| 7 | Explore Page | Gateway to all features |
| 8 | Fitness & Workouts | First full domain dashboard (template for others) |
| 9 | Nutrition & Diet | Second domain dashboard |
| 10 | Wellbeing (Journal + Habits) | Two standalone screens + SIA-invoked features |
| 11 | Finance / Money Map | Full embedded finance dashboard |
| 12 | Spirituality | AI-adaptive faith/spiritual practice |
| 13 | Schedule & Calendar | Daily planning, Google Cal integration |
| 14 | Profile & Settings | Preferences, connections, subscription, RPG character, Personal Wiki |
| 15 | Subscription & Billing | Tier presentation, upgrade flows |
| 16 | Learning & Growth | Domain dashboard |
| 17 | Creativity | Domain dashboard |
| 18 | Knowledge Graph | Power-user visualization (Balencia City deferred) |
| 19 | Community & Social | Leaderboard, challenges, accountability (deprioritized) |
| 20 | Admin Panel | Separate, minimal investment |

---

## 11. Total Screen Count Summary

| Category | Count |
|----------|-------|
| Pre-Auth & Onboarding | 8 screens |
| Home | 1 screen |
| SIA | 3 screens (chat, in-chat voice, full-screen voice) |
| Goals / Life Areas | 4 screens |
| Explore | 1 screen |
| Profile & sub-screens | 9 screens |
| Domain Dashboards | 11 screens (9 domains + 2 detail screens for Fitness and Nutrition) |
| Wellbeing standalone | 2 screens (Journal, Habits) |
| Social | 2 screens |
| Supporting | 4 screens (Calendar, Knowledge Graph, Blogs, Webinars) |
| Overlays/Modals | 2 (Celebration, Paywall) |
| Web | 1 (Landing Page) |
| **Total** | **~48 screens** |

---

## 12. Open Questions (To Resolve During Rough Drafts)

1. **RPG + Life Correlation interaction**: How do quests, XP, and progression interact with the dynamic correlation engine? Can cross-domain discoveries unlock epic quests? Needs design exploration.

2. **Balencia City visual concept**: Deferred from v1 wireframes. Each domain as a "room" you zoom into. 3D assets must stay under ~500KB for mobile. When does this enter the design process?

3. **Domain dashboard template**: All 9 domains get full dashboards. What's the shared layout pattern, and where does each domain diverge? Should be established with Fitness (first dashboard designed) and reused.

4. **Finance detail depth**: Full Mint/YNAB level. How many sub-screens does the finance dashboard need? Transaction list, budget categories, savings goals, receipt scanner, spending analytics — these may each need their own detail views.

5. **Onboarding video production**: The 30-second cinematic intro — when is this produced? Is it a placeholder in early design or a hard dependency?

6. **3D Avatar fidelity**: The VRM avatar system exists in the web codebase. What's the React Native approach? Real-time 3D rendering on mobile has performance constraints. Pre-rendered? Lighter model?

7. **Offline experience**: What happens when the user has no internet? Which features work offline? How does SIA degrade?

8. **Custom domain extensibility**: User creates goals, AI assigns domains. What happens when no existing domain fits? The architecture should handle "Parenting", "Volunteer Work", "Side Business" etc.

---

*This document is the input for rough draft screen sketches. Start with Priority 1-7 screens (Landing → Explore), establishing the core experience before expanding to domain dashboards.*
