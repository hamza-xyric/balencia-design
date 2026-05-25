# Balencia Design Direction v2

> **What this document is**: The single source of truth for designing every screen in the Balencia mobile app. Supersedes Design Direction v1. Based on the finalized V4 Vision Questionnaire (May 2026) and Brand Guidelines v2.
>
> **What Balencia is**: An AI Life Coach that connects every part of a user's life system and reveals connections they cannot see themselves.
>
> *"Balencia is your AI life coach that sees what you can't -- connecting every part of your life into one system and guiding you to be better in all of it."*
>
> The name "Balencia" is a deliberate combination of "Balance" and "SIA" (with a C). The wordplay is intentionally subtle.

---

## 1. Design Personas and Simplicity Gates

Every screen must be designed for these people:

### Primary -- "Amira, 28"

Muslim professional juggling lots of things such as (career, marriage, fitness, faith). Not tech-forward. Downloaded because everything feels disconnected. Would leave if the app feels like a chore or too "health-bro."

### Secondary -- "Khalid, 35"

High-achiever with WHOOP, wants cross-domain intelligence. Would leave if AI gives generic advice.

### Market scope

Age 18-45. Someone struggling who wants to improve but needs guidance. Has tried other apps (fitness trackers, habit apps, budgeting tools) but found them too narrow. Wants a coach, not another tool. Would leave if content with themselves (Balencia did its job) or if the app feels overwhelming.

### The Mother Test

If Hamza's mother cannot use the app, it is too complicated. AI is supposed to make things simpler. This is the guiding principle for all UI complexity decisions.

### Visible Surface Budget

Since nothing is removed and all domains are full depth, simplification relies on progressive disclosure via SIA. Each screen must have a measurable cap on visible tappable elements. This makes simplicity a design constraint, not an aspiration. If SIA's routing fails or feels slow, users hit a wall -- SIA navigation quality is a critical dependency.

---

## 2. Core Principles

These govern every screen design decision:

1. **One life, not modules** -- Life is not tackled in silos. The UI must feel like managing one life with many dimensions, not switching between mini-apps. Domain-colored tags (not separate navigation) communicate which areas are in play. Currently 9 domains, but the system must accommodate 20+ in the future. When describing Balencia, do not list specific domains exhaustively -- domain examples should be illustrative, not exhaustive.

2. **SIA is the coach** -- SIA drives the experience. AI suggests, user reviews, accepts/edits/skips, AI learns. This pattern applies to ALL domains equally -- no domain is exempt. SIA is proactive, adaptive, and always connecting dots. SIA does not teach subject matter -- it gives direction and planning.

3. **Simplicity over density** -- Bevel-inspired visual clarity. Complex data becomes clean, actionable insight. The current app's 30+ sidebar items collapse into 4 bottom tabs. Progressive disclosure: power is there when wanted, invisible when not. Every screen passes the Mother Test.

4. **Invisible connections, visible impact** -- The Life Correlation system works behind the scenes. Users experience its power through SIA's insights, domain-colored tags showing cross-domain impact, and "Connection Spotted" moments. The Life Correlation Matrix is proprietary -- promoted in marketing, hidden inside the app. It is the commercial differentiator.

5. **Motivation-adaptive** -- Data density, gamification intensity, SIA's tone, and notification frequency all adapt automatically to the user's motivation tier (low/medium/high). This is automatic based on AI-detected behavior patterns, not user-configured.

6. **Native feel** -- This is a React Native app. Bottom tab bar, stack navigation, swipe gestures, pull-to-refresh, haptic feedback. Users should not be able to tell it is not native.

---

## 3. Platform and Technical Direction

| Decision | Choice |
|----------|--------|
| **App platform** | React Native (native iOS and Android) |
| **Backend** | Existing Express.js API, adapting for mobile (push notifs, offline sync, mobile auth) |
| **Primary theme** | Dark mode (`ink-900 #0A0A0F` base, `ink-brown-800 #211008` elevated surfaces) |
| **Light mode** | Available as toggle, dark is default. Light uses `paper-100 #FEFAF3` |
| **Primary design reference** | Bevel (simplicity), Habitica (gamification), ChatGPT (AI interface polish) |
| **Supplementary references** | Oura Ring (premium dark UI), Calm (emotional warmth, motion), Arc Browser (modern AI-first feel) |
| **Desktop** | Not in design scope. Desktop is a separate engineering concern outside this document. |
| **Language** | English only. International product, single language for V1. No RTL or localization. |
| **Accessibility** | WCAG 2.1 AA contrast ratios for all text. Standard screen reader support. Dynamic type where feasible. |

---

## 4. Brand Visual System

### 4.1 Color Hierarchy (60 / 30 / 10)

Every Balencia composition follows this ratio. Use one hero color per surface. Never place orange, green, and purple all at full saturation in one composition.

| Ratio | Role | Color | Hex | When to use |
|-------|------|-------|-----|-------------|
| **60%** | Primary | Burnt Orange | `#FF5E00` | CTAs, buttons, headlines, hero accents, user's voice, streaks, primary highlights |
| **30%** | Secondary | Forest Green | `#34A853` | Growth, success, completion, recovery, milestones, positive deltas, reward states |
| **10%** | Accent | Royal Purple | `#7F24FF` | Coach voice, AI insights, premium moments, transformation, projected data |

### 4.2 Neutral Palette

**Dark neutrals (ink)**

| Token | Hex | Role |
|-------|-----|------|
| `ink-900` | `#0A0A0F` | Primary dark background (authoritative -- supersedes codebase values) |
| `ink-warm-900` | `#0C0603` | Warm dark variant |
| `ink-brown-900` | `#140A05` | Brown-warm dark |
| `ink-brown-800` | `#211008` | Elevated dark surface, cards |
| `ink-700` | `#171717` | Secondary dark, text on light |

**Light neutrals (paper)**

| Token | Hex | Role |
|-------|-----|------|
| `paper-50` | `#FDFDFB` | Lightest paper |
| `paper-100` | `#FEFAF3` | Default light background |
| `paper-150` | `#FDFBF0` | Warm light background |
| `paper-200` | `#F9F3E6` | Warm surface, section background |
| `paper-300` | `#F2ECD8` | Warm border, card background |

### 4.3 Domain Colors

Each life domain has a dedicated color used for tags, icons, and domain-specific accents. These coexist with the brand 60/30/10 system -- domain colors appear on tags and indicators, while brand colors drive actions and UI chrome.

| Domain | Color | Hex |
|--------|-------|-----|
| Fitness and Movement | Red | `#ef4444` |
| Nutrition and Diet | Lime | `#84cc16` |
| Mental Health and Wellbeing | Teal | `#14b8a6` |
| Finance and Money | Emerald | `#10b981` |
| Career and Work | Indigo | `#6366f1` |
| Relationships | Pink | `#ec4899` |
| Spirituality and Religion | Purple | `#A855F7` |
| Learning and Growth | Cyan | `#06b6d4` |
| Creativity | Amber | `#f59e0b` |
| Custom | Slate | `#64748b` |

### 4.4 Typography

Sora carries the whole system -- display, body, and accent. No other font in UI.

| Token | Size / Line-Height | Weight | Usage |
|-------|-------------------|--------|-------|
| `display-xl` | 96 / 92 | Black (900) | Hero / billboard. One per page max. |
| `display-l` | 64 / 60 | Bold (700) | Section titles |
| `h1` | 48 / 52 | Bold (700) | Page headings |
| `h2` | 36 / 39 | Bold (700) | Section headings |
| `h3` | 28 / 34 | Semibold (600) | Card titles |
| `lead` | 20 / 29 | Regular (400) | Intro paragraphs |
| `body` | 16 / 25 | Regular (400) | Default body text |
| `eyebrow` | 12 | Semibold (600) | Section labels (uppercase, +0.12em tracking) |

**Typography rules:**
- Sentence case everywhere. Never Title Case in UI. The wordmark is the only exception.
- No exclamation marks. Energy comes from rhythm, layout, and the brand period.
- The brand period is sacred. Use intentionally in headlines.
- Hierarchy through size and weight, not color. Only the accent word or trailing brand dot gets brand color.
- Minimum body text: 16px on web, 14px on mobile.
- Numbers: `tabular-nums` for all data and metrics.
- Logo font (Monda) is never used in UI.

### 4.5 Spacing, Radius, Shadows

**Spacing (8pt grid)**

| Token | Value | Use |
|-------|-------|-----|
| `--s-1` | 4px | Tight icon/text gap |
| `--s-2` | 8px | Button inner gap |
| `--s-3` | 12px | Tight padding |
| `--s-4` | 16px | Component group gap |
| `--s-5` | 24px | Card internal padding |
| `--s-6` | 32px | Section header gap |
| `--s-7` | 48px | Section minimum gap |
| `--s-8` | 64px | Generous section gap |
| `--s-9` | 96px | Section vertical padding |
| `--s-10` | 128px | Maximum section padding |

**Border radii**

| Token | Value | Use |
|-------|-------|-----|
| `--r-xs` | 6px | Small UI details |
| `--r-sm` | 10px | Small chips, nested elements |
| `--r-md` | 14px | Inputs, small cards |
| `--r-lg` | 20px | Buttons, mid cards |
| `--r-xl` | 28px | Primary cards and panels |
| `--r-2xl` | 40px | Large surfaces, hero cards |
| `--r-pill` | 999px | Buttons, chips, segmented controls |

**Shadows (warm-tinted, never cold)**

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-1` | `0 8px 24px rgba(33, 16, 8, .18)` | Subtle elevation |
| `--shadow-2` | `0 18px 48px rgba(33, 16, 8, .22)` | Mid elevation, hover |
| `--shadow-3` | `0 32px 80px rgba(33, 16, 8, .28)` | High elevation |
| `--glow-orange` | `0 0 32px rgba(255, 94, 0, .45)` | Orange accent glow |
| `--glow-green` | `0 0 32px rgba(52, 168, 83, .40)` | Green accent glow |
| `--glow-purple` | `0 0 32px rgba(127, 36, 255, .40)` | Purple accent glow |

### 4.6 Motion

Motion must feel physical -- elements have weight, inertia, and settle gently. Never use `linear` easing for UI transitions.

| Token | Curve / Duration | Use |
|-------|-----------------|-----|
| `--ease-flow` | `cubic-bezier(.65,.05,.36,1)` | Signature non-linear journey |
| `--ease-out-soft` | `cubic-bezier(.22,.61,.36,1)` | UI default |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | Two-way transitions |
| `--dur-fast` | 160ms | Hover glow, button press, chip select |
| `--dur-base` | 280ms | Card reveal, dropdown, tab switch |
| `--dur-slow` | 520ms | Page reveal, modal enter |
| `--dur-flow` | 1.2s | Line drawing, signature motion |

**Animation levels by area:**

| Area | Level |
|------|-------|
| Onboarding | Polished |
| Home / Dashboard | Polished |
| SIA Chat | Polished (3D avatar reactive, speech sync, ambient motion) |
| Feature screens | Minimal to Polished (data-heavy screens lean minimal) |
| Settings / Profile | Minimal |
| Celebrations | Cinematic |

All animations must respect `prefers-reduced-motion`.

### 4.7 Data Visualization Language

Past is solid. Projected is dashed. Milestones are dots.

| Data element | Visual rule |
|-------------|-------------|
| Past / user data | Solid orange line |
| Projected / AI prediction | Dashed purple line |
| Milestones | Green dots |
| Graphs and stats | Approved gradients only |
| User path | Orange |
| Progress arrival | Green |
| Coach / AI projection | Purple |

**Gradients:**

| Token | Purpose |
|-------|---------|
| `--grad-progress` | Progress movement (teal to warm) |
| `--grad-growth` | Growth and effort (yellow-orange to orange) |
| `--grad-status` | 0% to 100% completion (green to warm) |
| `--grad-hero-glow` | Hero atmosphere (orange radial) |

**Rules:** No three-color gradients. No dark color gradients in charts. No unrelated color codes. No decorative charts that do not represent real data.

### 4.8 Continuous Stroke Line

The line represents voice, journey, breath, and progress. It draws itself (stroke animation, not fade-in).

**Where to use:** Hero sections, section dividers, onboarding, achievement celebrations, domain transitions.

**Where NOT to use:** Data-heavy screens, tables, input field borders, around the logo.

**Color meanings:** Orange = user's voice. Green = progress and arrival. Purple = the coach/AI. One line motif per surface, maximum.

**Stroke widths:** Thin (2px), Base (4px), Bold (8px), Poster (12px).

### 4.9 Icons

| Property | Rule |
|----------|------|
| Style | Rounded, 2px stroke, outlined only |
| Active states | Filled variants for active/selected |
| Color | Burnt Orange on dark backgrounds, Ink-700 on light. Domain icons use domain colors. |
| Minimum size | 24px |

### 4.10 Photography and Illustration

- **Photography:** Warm, natural, real people (ages 25-45). Candid preferred over posed. Natural light, warm color grade, slight grain. No AI-generated stock, no cold clinical imagery, no gym-bro aesthetic.
- **Illustrations:** Custom for empty states and feature explanations.
- **Abstract gradients:** For in-app data contexts.
- **Image containers:** Rounded shape system (`--r-xl`, `--r-2xl`). Use warm orange gradient overlays on photos, never black overlays.

---

## 5. Navigation Architecture

### Bottom Tab Bar (4 items, always visible)

```
[ Today ]  [ SIA ]  [ Goals ]  [ Me ]
```

1. **Today (Home)** -- Daily experience hub. SIA's greeting, AI-suggested actions, goals progress, schedule.
2. **SIA** -- Unified AI Coach. Chat + voice. The core product.
3. **Goals** -- Goal tracking, progress visualization, life domain overview.
4. **Me** -- Profile, settings, RPG character, Personal Wiki, connected services, subscription, Explore/discover features, notification history.

### Navigation Patterns

- **Stack navigation** within each tab (push/pop screens)
- **Tapping SIA's greeting on Today** navigates to the SIA tab (no inline expansion)
- **SIA deep-links** to feature screens contextually (rich cards in chat that navigate on tap)
- **Explore content** lives within the Me tab -- grid of module cards categorized by domain, with AI recommendations ("Suggested for you") at top
- **Domain dashboards** are accessible through the Me tab (Explore section) or SIA deep-links
- **Notifications** are minimal -- history lives inside the Me tab, not a primary nav element

---

## 6. Screen Inventory

### 6.1 Pre-Auth and Onboarding

| # | Screen | Purpose |
|---|--------|---------|
| 1 | **Splash Screen** | Brand moment. Logo, brand stroke animation. Under 2 seconds. |
| 2 | **Motion Carousel** | 5-10 second motion graphics with skip/next buttons. Dark, premium, Apple-reveal aesthetic. NOT a pre-recorded video. Creates visual hook. Skippable. |
| 3 | **Welcome / Sign Up** | Account creation (name, email/social auth). Minimal fields. |
| 4 | **Sign In** | Returning user login. Social auth, email/password. |
| 5 | **Guest Mode Preview** | Sample/demo data showing what Balencia looks like in action. Explore the full app experience with predefined data. Minimum onboarding (name + 1-2 selections) before entry. Implementation effort may be significant -- principle approved, details TBD. |
| 6 | **SIA Onboarding Conversation** | Hybrid design: chatbot at the bottom of the screen, visual brainstorming bubbles and examples flowing above. Chatbot collects data conversationally. Visual content above provides the "wow" -- clickable brainstorming bubbles, examples of goals, pre-built demonstrations. AI suggestion chips appear alongside the chatbot. Moderate depth: 2-3 follow-up questions per goal. Deeper assessment offered by SIA after approximately 1 week. |
| 7 | **Initial Plan Summary** | SIA presents the generated plan -- goals decomposed into daily actions across domains. User reviews, accepts, or customizes. The moment the user should feel excited to start. |

**Required onboarding data (and ONLY this):**
1. Name
2. Life areas of interest
3. Primary life goals

**Deferred from onboarding:** Age/gender, integrations (WHOOP, Calendar, Spotify), subscription plan, motivation level, obstacles, religion. No religion is mentioned during onboarding. Religious discovery happens later through the Explore section or SIA conversations.

**Subscription is NOT part of onboarding.** Users experience the app's value first, then encounter subscription options once they understand what Balencia offers.

**Emotional arc of first 5 minutes:**
- **0-10s**: Motion carousel provides the visual hook (dark, premium, Apple-reveal feel)
- **10s-2min**: SIA's first interaction delivers the emotional "it gets me" moment
- **2-5min**: Momentum builds as SIA demonstrates value -- app feels alive from minute 1, never empty
- Key rhythm: curiosity then warmth then momentum

### 6.2 Tab 1 -- Today (Home)

| # | Screen | Purpose |
|---|--------|---------|
| 8 | **Home Screen** | The daily briefing. Everything the user needs for today, curated by SIA. |

**Home screen elements (top to bottom):**

1. **SIA's greeting + daily check-in** -- Conversational, not a form. Tapping navigates to SIA tab.
2. **Today's AI-suggested actions** -- Cross-domain action cards. Each tagged with domain colors showing which life areas they touch.
3. **Active life goals with progress** -- Progress rings/bars for current goals. Clean, scannable. RPG quest framing.
4. **Activity feed / upcoming events** -- Recent activity, schedule, quick check-in prompts woven into the feed.
5. **Proactive insight cards** -- SIA's proactive messages and cross-domain insights appear as inline cards when high-confidence connections exist.

**Cross-domain connections** surface subtly through domain-colored tags as the constant baseline. Dedicated cross-domain insight cards appear periodically only when significant connections are discovered. Connections do not always need to be explicitly shown as separate -- the subtlety is intentional.

**Data density adapts by motivation tier:**
- Low: SIA greeting + 1-2 actions + single most important goal
- Medium: 4-6 cards, schedule preview, goal progress, one insight
- High: Detailed metrics, charts, multiple goal breakdowns, full schedule

### 6.3 Tab 2 -- SIA (AI Coach)

| # | Screen | Purpose |
|---|--------|---------|
| 9 | **SIA Chat** | Unified AI coach conversation. Text-based with rich inline content. |
| 10 | **SIA Voice Mode (In-Chat)** | Quick voice input -- mic replaces keyboard, transcription appears in chat. |
| 11 | **SIA Voice Mode (Full-Screen)** | Immersive voice experience. 3D animated avatar front and center, waveform visualization, minimal text UI. For longer coaching sessions. |

**SIA Chat details:**
- **Foundation**: Clean chat messages (iMessage-like)
- **Rich inline cards**: Charts, goal progress, meal plans, financial summaries appear within conversation when relevant
- **Sometimes text-only**: Simple insights or encouragement
- **Sometimes visual**: Data-backed observations pull up charts inline
- **Sometimes navigational**: SIA redirects to feature screens when full-screen experience is needed
- **Prominent mic button**: Always visible. Quick tap = in-chat voice. Long-press or dedicated mode = full-screen immersive.
- **3D Avatar**: Proper 3D model with Gemini Live-like presentation. Animated, responsive, speaks and reacts. Builds trust and emotional connection. Present in voice mode; optional presence in text chat. **Fallback**: If 3D is technically infeasible in React Native for V1, the graceful fallback is a polished 2D animated avatar with reactive expressions and speech sync. Design proceeds assuming 3D.
- **Proactive messages**: SIA initiates -- surfaces cross-domain connections, reminders, check-ins without being asked
- **Deep-linking**: Rich cards are tappable and navigate to relevant screens. SIA can create tasks/actions on the user's schedule.

**Conversational domain input** -- SIA IS the input method. Users can report activities conversationally:
- "I did 10 pushups" -- automatically logged in Fitness/Workouts
- "I prayed 5 times" -- automatically logged in Spirituality/Prayers
- "I had a fight with my wife" -- automatically logged in Relationships
- This eliminates the need for separate logging interfaces in many cases.

**SIA personality -- Perceptive, adaptive, direct:**
- Perceptive: notices patterns, the differentiator
- Adaptive: shifts tone based on AI-detected motivation levels, not just user settings
- Direct: clear recommendations, not menus of options

**SIA tone adaptation mechanism:**
- SIA monitors task completion trends (e.g., 100% to 90% to 80% over 3 days = declining motivation)
- When decline is detected, SIA shifts approach -- from strict to supportive ("Is everything okay? Should we revisit the plan?")
- Goal-level strictness settings remain valid (user says "be strict about this goal" = strict for that goal)
- Overall conversational tone adapts automatically to prevent burnout
- Uses pro-and-con framing: explains benefits of doing AND not doing a task

### 6.4 Tab 3 -- Goals

| # | Screen | Purpose |
|---|--------|---------|
| 12 | **Goals List** | All active goals with progress. RPG quest framing (goals = missions). |
| 13 | **Goal Detail** | Full decomposition: actions, domain tags, milestones, reasoning. Summary default, full detail on tap. Wiki-related content can surface in the breakdown view. |
| 14 | **Create / Edit Goal** | User states a goal in natural language. SIA structures it (assigns domain, generates actions, tracking signals, milestones). No explicit domain creation needed -- AI figures out which domain a goal belongs to. |
| 15 | **Life Areas Overview** | Holistic view -- life wheel/radar showing all domains with progress. Entry point to domain dashboards. |

**Goal cards show 4 essential elements:**
1. **Progress ring/bar** -- Primary visual element
2. **Connected domain color icons** -- The differentiator that makes Balencia feel like a live system, not a task list
3. **Next action due** -- Tappable, actionable
4. **AI coaching note** -- "Strong momentum this week."

**Progress visualization** -- Multiple views available:
- Per-goal progress rings
- Life wheel/radar chart
- Per-domain drill-down
- **No unified "Life Score" single number.**

**Goal decomposition visibility:**
- Default: Summary with expandable detail ("7 actions across 3 life areas" -- tap for full breakdown)
- Low-motivation users see only today's actions
- High-motivation users see full plan with reasoning

### 6.5 Tab 4 -- Me

| # | Screen | Purpose |
|---|--------|---------|
| 16 | **Me Main** | User info, RPG level/XP summary, quick links to settings and sub-screens. Explore module grid integrated here. |
| 17 | **Explore Section** | Grid of module cards organized by life domain. AI recommendations ("Suggested for you") at top. Each card: module name, description, domain color icon. Tapping pushes domain dashboard or feature screen. |
| 18 | **RPG Character Screen** | Full stats: level, XP bar, domain skill levels (Fitness Lv.12, Finance Lv.8), quest completion history. Call of Duty profile analogy -- user stats card showing life progression. |
| 19 | **Personal Wiki / SIA Memory** | Browsable, editable knowledge base of what SIA knows. "Book of Life" concept -- stores different chapters of the user's life that grows into a comprehensive life record. Users can view, edit, delete memories. "This is wrong" button. All AI-discovered correlations are browsable here. Distinct from chat history and journal entries. |
| 20 | **Settings** | App configuration, preferences. |
| 21 | **Preferences** | Communication style, timing. |
| 22 | **Connected Services** | WHOOP, Google Calendar, Spotify management. Connect/disconnect, data sync status. |
| 23 | **Subscription and Billing** | Current plan, upgrade/downgrade, payment management. 4-tier presentation (Free/Plus/Pro/Max). |
| 24 | **Notification History** | Scrollable list of past notifications. Minimal -- not a primary feature. |
| 25 | **Help Center** | FAQ, guides + SIA can answer help questions conversationally. |

### 6.6 Domain Dashboards (pushed from Explore or SIA deep-links)

Each domain gets a full dashboard. The AI-first pattern applies universally: SIA suggests, user reviews, accepts/edits/skips, SIA learns. Domain dashboards share a common layout pattern but with domain-specific content. The AI approach naturally differs in tone and sensitivity by domain (workouts vs. prayer) while the interaction pattern remains consistent.

| # | Screen | Purpose |
|---|--------|---------|
| 26 | **Fitness and Workouts** | AI-generated workout plans, WHOOP integration (sleep, HRV, recovery), exercise history, active workout tracker. |
| 27 | **Workout Detail / Active Workout** | Individual workout view. Timer, exercise list, set tracking, real-time feedback. |
| 28 | **Nutrition and Diet** | AI-suggested meals, macro tracking, water intake, food logging, nutritional analytics. |
| 29 | **Meal Detail / Food Logger** | Individual meal view, barcode/receipt scanning, macro breakdown. |
| 30 | **Finance / Money Map** | Full finance dashboard (Mint/YNAB level). Transaction tracking, budgets, savings goals, receipt scanning, spending analytics. Connected to the life system -- SIA correlates spending with mood, stress, exercise. |
| 31 | **Transaction / Budget Detail** | Individual transaction, budget category drill-down. |
| 32 | **Career and Work** | Career goals, AI-suggested skill-building and networking actions, growth trajectory, professional development coaching. |
| 33 | **Relationships** | Quality time tracking, relationship reflections, AI connection reminders, suggested activities. |
| 34 | **Spirituality** | AI-adaptive -- adjusts to user's stated beliefs (Muslim, Christian, agnostic, etc.). Prayer tracking/reminders, reading progress, fasting schedules, daily reflections, meditation guidance. No rigid religion-specific UI. SIA gives direction, not religious rulings -- "It's a coach, not an imam." Religious content (Quran, Hadith, Bible) needs authentication by a qualified person before AI references it. Features like prayer tracking work for any faith. |
| 35 | **Learning and Growth** | Reading goals, book tracking, course progress, AI-suggested learning paths, skill development, daily study prompts. |
| 36 | **Creativity** | Creative practice logging, project tracking/milestones, inspiration prompts from SIA, portfolio-style progress review. |

### 6.7 Wellbeing (Hybrid: 2 standalone screens + SIA-invoked features)

| # | Screen | Purpose |
|---|--------|---------|
| 37 | **Journal** | AI-guided journaling. SIA provides reflection prompts, user writes. Rich text. Standalone screen accessible from Explore. |
| 38 | **Habits** | Habit tracking and building. Daily habits, streak tracking, habit completion. Standalone screen accessible from Explore. |

**SIA-invoked wellbeing features** (no standalone screens -- SIA surfaces them contextually):
- Mood and emotional check-ins
- Breathing exercises
- Meditation guidance
- Stress management tools
- Energy tracking
- Vision board
- Emotional reflections
- **Therapy/venting mode** -- "A therapist room where if you just want to go and vent." Psychology/mental health/therapy is distinct from yoga/meditation. SIA can invoke a supportive, clinical-style conversation for users who need to process emotions.

### 6.8 Social and Community

| # | Screen | Purpose |
|---|--------|---------|
| 39 | **Leaderboard** | Reframed: measures consistency, discipline, and efficiency -- not domain-specific metrics. Core question: "Who is leading in improving their life?" Not who has the best sleep or the most prayers. XP-based, tied to RPG system. Accessible from Explore. |
| 40 | **Community / Chat Rooms** | Group-based chat rooms ("three friends can make a separate room"). Communities. Accountability via groups. No follow/friend request system for V1. No Tinder-style matching. Competitions and shared challenges deprioritized for V1 but structurally present. |

**Social philosophy**: Individual first, social as enhancement. The solo coaching experience is complete on its own. Social is an optional motivational layer -- available but not forced.

**Accountability**: SIA is the primary accountability partner. Social accountability (friend notifications, group accountability) available from V1. Financial stakes ("If I don't do this, I pay 1,000 rupees") deferred to V2.

### 6.9 Supporting Screens

| # | Screen | Purpose |
|---|--------|---------|
| 41 | **Schedule / Calendar** | Daily planning view with Google Calendar sync. Accessible from Explore or Home. |

### 6.10 Overlay / Modal Screens

| # | Screen | Purpose |
|---|--------|---------|
| 42 | **Celebration / Achievement** | Full-screen overlay for big milestones. Confetti, animation, SIA congratulations. Small wins = toast notification + XP popup. Celebrations are tier-adapted: low-motivation users get more celebration for smaller wins; high-motivation users get data summaries. |
| 43 | **Paywall / Upgrade Prompt** | Contextual, dynamic. Adapts messaging to what the user was trying to do. Blurred preview for data features. SIA conversational upsell for in-chat moments. Shows all features to everyone -- upsell via visibility, not hiding. One-time free trials for key features. |

---

## 7. User Flows

### 7.1 First-Time User

```
App Store -> Download -> Splash -> Motion Carousel (5-10s, skippable)
-> Welcome / Sign Up (name, email/social)
-> SIA Onboarding Conversation:
    - Chatbot at bottom, visual brainstorming above
    - Life areas of interest (from 9+ domains, no explicit religion)
    - Primary life goals
    - 2-3 follow-up questions per goal (moderate depth)
    - No subscription wall, no integrations
-> Initial Plan Summary (SIA presents personalized plan)
-> Home Screen (day 1 experience begins)
```

### 7.2 "Just Want to Try It" User

```
Splash -> Motion Carousel -> Guest Mode Preview
-> Minimum onboarding (name + 1-2 selections)
-> Sample data experience:
    - Demo dashboards with predefined data
    - Example SIA insights and conversations
    - Sample weekly plan
    - Full app browsable with dummy data
-> Prompted to complete full onboarding when ready
```

### 7.3 Daily Return User

```
Open app -> Home Screen:
    - SIA's greeting with conversational check-in
    - Today's AI-suggested actions (cross-domain tagged)
    - Active goals progress
    - Schedule
-> Tap SIA greeting -> SIA tab (full conversation)
-> Complete actions -> XP earned -> RPG progress
-> SIA proactive insight appears -> "Connection Spotted"
-> End of day: batched micro-wins summary or SIA reflection
```

### 7.4 Goal Creation

```
Goals tab -> Create Goal (or SIA suggests one)
-> User states goal in natural language ("I want to save $5000 by December")
-> SIA structures it:
    - Assigns to domain (Finance)
    - Generates daily actions, tracking signals, milestones
    - Shows cross-domain connections ("This connects to your stress management goal")
-> User reviews, accepts/edits
-> Goal appears in Goals list as RPG quest
-> Daily actions appear on Home
```

### 7.5 Cross-Domain Insight Discovery

```
SIA discovers correlation:
    "Your spending spikes on days you skip exercise"
-> Surfaces via:
    - Push notification (if significant)
    - Home screen "Connection Spotted" card (only at high confidence)
    - SIA mentions in next conversation
    - Added to Personal Wiki
-> User taps -> SIA explains the connection
-> SIA suggests action ("Want to set a budget alert for gym-skip days?")
-> User accepts -> New cross-domain action created
```

### 7.6 Conversational Activity Logging

```
User opens SIA tab
-> Types or says "I just did 30 minutes of yoga"
-> SIA auto-logs to Fitness domain
-> SIA responds: "Nice. That's your third session this week. Your sleep has been
   trending better on days you do yoga -- want me to add it to your daily plan?"
-> User accepts -> Daily action created
```

---

## 8. SIA (AI Coach) -- Detailed Behavior

### Personality

**Three core traits: Perceptive, adaptive, direct.**

SIA is not a chatbot. SIA is a grounded guide who knows you, adapts to you, and speaks with warmth and confidence.

- Remembers patterns and preferences
- Connects dots across all life domains
- Asks good questions -- prompts reflection, does not just inform
- Celebrates wins with genuine warmth (not corporate excitement)
- Never judges, always encourages effort over perfection
- Gives easy outs -- "no pressure", "or skip if you're not feeling it"

### Coaching Philosophy

SIA gives direction and planning. SIA does not teach subject matter (will not teach algebra, will not deliver educational content). Example: "You have 16 hours before your exam. Study for 3 hours, get 8 hours of sleep."

SIA is a life planning coach, not a teacher. It plans, structures, and motivates.

### Tone Adaptation

SIA's tone automatically adapts based on AI-detected motivation levels, not just user-selected personality mode:
- SIA monitors task completion trends
- When decline is detected, SIA shifts from strict to supportive
- Goal-level strictness settings remain valid
- Overall conversational tone adapts to prevent burnout
- Same goal, different motivation levels = different tone needed
- Uses pro-and-con framing

### Deep-Linking Behavior

SIA decides context-appropriate response format:
- **Rich inline cards** for quick reference (charts, progress, summaries in chat)
- **Direct navigation** for full features ("Let me show you your workout plan" -> navigates to Fitness)
- **Task creation** for future actions ("I'll add this to your schedule")

### Proactive Messages

Appear as push notifications (open SIA chat when tapped) + home screen cards. Surfaces:
- Cross-domain connections
- Schedule reminders with intelligence
- Check-in prompts
- Celebration of milestones

### Voice

- **Signature phrase**: "What's worth your attention today?"
- **Celebrating success**: "5 days hitting your protein goal. You found your rhythm."
- **Supporting difficulty**: "Tough day. One rest day never undid anyone's progress."
- **Delivering insights**: "Your workouts are 40% better after 7+ hours of sleep."
- **Nudging**: "15-minute walk? Your energy usually dips around now."

---

## 9. RPG Gamification System

The user's life becomes an RPG journey. This must feel **premium and mature** -- not cartoonish or gimmicky. Must stay simple enough to pass the Mother Test.

### V1 Mechanics (ships at launch)

| Concept | Implementation |
|---------|---------------|
| **Goals** | Become missions/quests |
| **Sub-goals** | Become sub-quests |
| **XP** | Earned from completing actions, hitting milestones, maintaining streaks |
| **Leveling** | User levels up overall + per-domain skill levels (Fitness Lv.12, Finance Lv.8) |
| **Streaks** | Prominent (Duolingo-style). Per-goal and per-habit. Feed into XP. |
| **Micro-wins** | Immediate XP popup + small animation. SIA acknowledges batched progress. |
| **Cross-domain** | Cross-domain achievements are special quests |

### V2 Mechanics (deferred)

| Concept | Status |
|---------|--------|
| Skill trees per domain | V2 |
| HP loss for missed tasks | V2 |
| Financial stakes enforcement ("If I don't do this, I pay 1,000 rupees") | V2 |
| Party quests (social group quests) | V2 |

### Gamification Adaptation by Motivation Tier

- **Low**: Heavy gamification. Every tiny win celebrated. XP for logging in. Maximum encouragement.
- **Medium**: Balanced. Regular rewards, less hand-holding.
- **High**: Lighter. Focus on metrics and meaningful milestones. RPG elements subtle.

### Celebrations Scale with Achievement Size

- **Small wins**: Toast notification + XP popup
- **Big milestones**: Full-screen celebration, confetti, SIA congratulations, cinematic animation
- **Tier-adapted**: Low-motivation users get more celebration for smaller wins. High-motivation users get data summaries instead of confetti.

### RPG Character Screen (in Me tab)

Shows full stats, overall level, XP bar, domain skill levels, quest completion history. Call of Duty profile analogy -- a stats card reflecting life progression. This is where the user sees their "character."

---

## 10. Subscription and Monetization

### Tiers

| Tier | Price/month | What is included |
|------|-------------|-----------------|
| **Free** | $0 | Non-AI features: journaling, finance module, habit tracking, basic dashboard. Limited AI tokens for testing. |
| **Plus** | $20 | Full SIA coaching, all domains, cross-domain insights, RPG gamification. |
| **Pro** | $60 | Everything in Plus + advanced analytics, higher AI usage limits, visible real-time usage meter. |
| **Max** | $100-200 | Unlimited SIA, priority AI processing, full feature set, family/team features. |

Final pricing TBD. Non-AI features are the free tier. AI features are the paywall differentiator.

### Free Tier Principle

Non-AI features accessible on free tier. AI features differentiate paid tiers. Free tier gets limited AI tokens for testing. Exact free tier boundaries to be decided after screens are designed.

### Paywalls

- **Multi-strategy**: SIA conversational upsell (primary) + visual indicators (lock icon / blurred preview) as fallback
- **Never hide features entirely.** Show all features to everyone -- upsell via visibility.
- **Dynamic, contextual**: Upgrade message adapts to what the user was trying to do
- **One-time free trials** for key premium features

### AI Usage

- Free: limited messages/day
- Paid: generous/unlimited
- No credit/token system (adds cognitive load)
- Users should not feel metered
- Graceful degradation: lighter AI model instead of hard block

---

## 11. Notification Strategy

| Priority | Type | Channel |
|----------|------|---------|
| 1 | SIA proactive AI insights/suggestions | Push + Home card |
| 2 | Reminders / streak alerts | Push |
| 3 | Daily check-in / engagement prompts | Push + Home card |

**Frequency adapts by motivation tier with user override:**
- Low: Max 1/day, only high-impact
- Medium: 2-3/day, mix of insights, reminders, check-ins
- High: Up to 5+/day, including accountability prompts and detailed updates

SIA learns optimal timing based on engagement patterns (morning vs evening, weekday vs weekend).

Users can override and configure per-category in Settings.

---

## 12. Offline, Empty States, and Errors

### Offline Experience

- Non-AI features (journaling, finance logging, habit tracking) work offline and sync when back online
- SIA requires connectivity -- no offline AI analysis
- Record data offline, no analysis. It is what it is.

### Cold-Start Correlations

Correlations develop over time. Onboarding and early UX should set expectations so the user understands what they will get as data builds. SIA provides value from Day 1 through coaching and planning, not just correlations.

### Empty States

Users should never feel bored or stuck. Empty states should feel alive:
- SIA suggestions
- Sample content
- Motivational prompts
- Guided next steps

### Error States

Graceful with clear recovery paths. Never a dead end.

---

## 13. Data Privacy and Transparency

### Selective Transparency

- Users see their data and can edit it via Personal Wiki
- "Show me the data" expandable on every SIA insight -- shows data sources, time period, and confidence level
- Proprietary correlation algorithms remain protected -- "the how is Balencia's IP"
- Formula: show the data inputs without revealing the algorithm

### Data Export

No data export for V1. Risk of reverse engineering SIA's proprietary algorithms outweighs compliance benefits. Maximum a user can do is take screenshots. GDPR note: may need revisiting before EU launch.

### Integration Data

Connected Services dashboard in settings showing all integrations with status, sync info, connect/disconnect controls. Integration data silently woven into SIA's understanding.

---

## 14. Screen Design Priority (Build Order)

Design everything, but build in this order:

| Priority | Screen Group | Why |
|----------|-------------|-----|
| 1 | **Onboarding flow** | First in-app experience, sets emotional tone |
| 2 | **SIA Chat + Voice** | The core product |
| 3 | **Home / Today** | The daily screen, most-seen, most-used |
| 4 | **Goals and Plans** | Primary tracking interaction |
| 5 | **Me / Profile** | RPG character, Personal Wiki, settings, Explore |
| 6 | **Fitness and Workouts** | First domain dashboard (template for others) |
| 7 | **Nutrition and Diet** | Second domain dashboard |
| 8 | **Finance / Money Map** | Full embedded finance dashboard |
| 9 | **Wellbeing (Journal + Habits)** | Two standalone screens + SIA-invoked features |
| 10 | **Spirituality** | AI-adaptive faith/spiritual practice |
| 11 | **Schedule and Calendar** | Daily planning, Google Cal integration |
| 12 | **Remaining domains** | Career, Relationships, Learning, Creativity |
| 13 | **Subscription and Billing** | Tier presentation, upgrade flows |
| 14 | **Community and Social** | Leaderboard, chat rooms, accountability (deprioritized) |

---

## 15. Total Screen Count Summary

| Category | Count |
|----------|-------|
| Pre-Auth and Onboarding | 7 screens |
| Today (Home) | 1 screen |
| SIA | 3 screens (chat, in-chat voice, full-screen voice) |
| Goals / Life Areas | 4 screens |
| Me and sub-screens | 10 screens (Me Main, Explore, RPG, Wiki, Settings, Preferences, Connected Services, Subscription, Notification History, Help Center) |
| Domain Dashboards | 11 screens (9 domains + 2 detail views for Fitness and Nutrition) |
| Wellbeing standalone | 2 screens (Journal, Habits) |
| Social | 2 screens (Leaderboard, Community/Chat Rooms) |
| Supporting | 1 screen (Calendar) |
| Overlays/Modals | 2 (Celebration, Paywall) |
| **Total** | **~43 screens** |

---

## 16. Deferred Decisions

These are intentionally deferred and do not block V1 design:

| Item | Status | Resolution path |
|------|--------|-----------------|
| **Free tier exact boundaries** (11.1) | Partially resolved | Non-AI features free, AI is paywall. Exact boundaries decided after screens are designed. |
| **Gamification + correlations mechanics** (18.0) | Partially resolved | RPG confirmed. Cross-domain correlations will be part of quests. Specific mechanics need dedicated design exploration. |
| **Balencia City** | Deferred long-term | Each domain as a "room" users zoom into. Only after foundational design is established. |
| **Guest mode implementation** | Principle approved | Building demo experience with dummy data may require significant effort. Feasibility TBD. |
| **Data privacy / cloud AI tension** | Acknowledged | Using cloud AI providers means true data privacy is impossible. Most private option is on-device AI. Deferred for later discussion. |

---

## 17. Voice and Tone Reference

This document defers to **Brand Guidelines v2 Section 6** for complete voice and tone rules. Key reminders for screen design:

- **Brand voice**: Grounded Coach -- curious, warm, quietly confident
- **Sentence case** everywhere in UI
- **No exclamation marks** -- energy from rhythm and the brand period
- **Easy outs** -- "or skip if you're not feeling it"
- **Data-specific** -- "Your workouts are 40% better after 7+ hours of sleep" not "Great job working out"
- **Never**: jargon, preaching, corporate speak, fake positivity, demanding
- **Say**: "Feel better every day" not "Optimize your wellness journey"
- **Say**: "Here's what your data shows" not "Leverage your data insights"

---

*This document is the input for screen design drafts. Start with Priority 1-4 (Onboarding, SIA, Home, Goals), establishing the core experience before expanding to domain dashboards.*

*Source of truth chain: Brand Guidelines v2 (visual rules) -> This document (screen-level design direction) -> V4 Compiled Questionnaire (rationale behind every decision).*
