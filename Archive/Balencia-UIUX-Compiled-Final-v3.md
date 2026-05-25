# Balencia UI/UX Vision — Compiled Final Questionnaire (V4 — Final)

> **V4 Finalized**: May 19, 2026 — Final review pass resolving all remaining REVIEW and CONTRADICTING items
>
> **Compiled from**: Hamza's answers + Salman's answers (May 2026)
>
> **Status Legend**:
> - **ALIGNED** — Both agree. Merged into one final answer.
> - **PARTIALLY RESOLVED** — Direction agreed, specific details deferred intentionally.
>
> **V4 Changelog**:
> - 5 REVIEW items resolved → ALIGNED (1.3, 1.4, 3.5, 4.3, 9.4)
> - 2 CONTRADICTING items resolved → ALIGNED (13.1, 13.2)
> - 3 tension resolutions added (scope vs simplicity budget, RPG V1 scope, 3D avatar fallback)
> - New Section 19: Gaps & Deferred Decisions — offline, cold-start, hex values, language, accessibility, empty states, pricing
> - All items now ALIGNED except 2 intentionally deferred (11.1 free tier boundaries, 18.0 gamification+correlations mechanics)
> - **Document is finalized and ready for design handoff**
>
> **V3 Changelog** (for reference):
> - **Critical correction**: 2.6 SIA avatar — corrected from "simple animated icon" to "proper 3D model (Gemini Live-like)". Hamza confirmed AI captured Lahore 28 incorrectly.
> - 7 CONTRADICTING items resolved → ALIGNED (6.8, 6.10, 9.2, 10.2, 15.2, 16.1)
> - 9 REVIEW items resolved → ALIGNED (6.5, 6.9, 7.2, 7.3, 8.1, 9.1, 10.1, 15.1, 16.2)
> - 1 REVIEW item resolved → ALIGNED (17 Screen Priority)
> - 1 OPEN item partially resolved (18.0 Gamification + Correlations)
> - 11.2 enriched with specific pricing tiers
> - 11.1 updated with new free tier context (still partially unresolved)
> - 12.3 SIA chat animation updated to Polished (follows avatar correction)
> - 5 new insights added (data privacy, personal wiki enrichment, SIA coaching philosophy, soundscapes clarification, social accountability mechanism)
>
> **V2 Changelog** (for reference):
> - 6 CONTRADICTING items resolved → ALIGNED (1.5, 2.6, 3.3, 3.4, 3.6, 6.2)
> - 5 REVIEW items resolved → ALIGNED (2.1, 3.2, 4.1, 5.2, 5.5)
> - 2 ALIGNED items confirmed (2.2/2.3 chat screen)
> - 1 CONTRADICTING item moved to REVIEW with deferral note (6.5)
> - 8 new ideas added from meeting discussion

---

## 1. Core Philosophy & Identity

### 1.1 What is the single sentence that describes what Balencia IS?

**Status: ALIGNED**

**Hamza**: Balencia is your clarity and your guide. For anyone struggling with discipline, productivity, structure, or needing motivation, a push, reminders, or validation in any aspect of life. Core principle: "Balencia sees what we can't see. Balencia connects different parts of your life system together."

**Salman**: "Balencia is your AI life coach that connects your fitness, finances, faith, career, and relationships into one system — and shows you the patterns you'd never spot alone."

**Merged**: Both capture the same essence — an AI life coach that connects all life domains and reveals hidden patterns. Hamza emphasizes the emotional value (clarity, guide, accountability). Salman emphasizes the functional value (connects systems, shows patterns). A final one-liner should combine both:

> *"Balencia is your AI life coach that sees what you can't — connecting every part of your life into one system and guiding you to be better in all of it."*

**Lahore 28 update**: Approved as-is. Added note: when describing Balencia, don't list specific domains exhaustively (e.g. "fitness, finances, faith, career, relationships") — there are 8 domains now but could be 20+ in the future. Domain examples should be illustrative, not exhaustive.

**New — Mental health/therapy as distinct concern**: Hamza raised that psychology/mental health/therapy should be treated as a distinct concern from yoga/meditation. "A therapist room should exist, where if you just want to go and vent." Yoga is physical/spiritual wellness; therapy is clinical mental health counseling. This distinction should be reflected in the domain structure.

**New — Balencia name wordplay**: "Balencia" is a deliberate combination of "Balance" and "SIA" (with a C). Using "E" (balanced) rather than "A" (balance). The wordplay is intentionally subtle — obvious branding looks low quality.

---

### 1.2 "Balencia sees what we can't see" — what does this mean concretely in the UI?

**Status: ALIGNED**

Both agree on a multi-layered approach:

1. **SIA's conversational insights** — Proactive cross-domain observations in natural language
2. **Visual intelligence layer** — Knowledge Graph, Life Correlation Matrix, domain-colored connections
3. **Interactive drill-down** — Users can explore cross-domain relationships (Hamza's "room" concept — clicking a domain shows its correlations with others)
4. **Layered delivery** — Daily via SIA, weekly via digest, on-demand via graph/insights

**Hamza adds**: The Life Correlation system is Balencia's **commercial differentiator and marketing tool** — proprietary data positioning. Interactive drill-down model where clicking a domain shows impact ratings across others.

**Salman adds**: The "holy shit" moment — first time SIA tells you something true about your life you didn't know. 4 tiers: daily (SIA messages), home screen (insight cards), weekly (digest), power user (Knowledge Graph).

**Lahore 28 update**: Life Correlation confirmed as "the billion-dollar thing" — both founders align this is the core commercial differentiator.

---

### 1.3 What is the emotional arc of a user's first 5 minutes?

**Status: ALIGNED** *(Resolved in V4 final review)*

**Decision**: Merge both approaches — they complement, not conflict.

**The arc**: Recognition/Relatability (0-60s) → "It's talking to me" (1-2 min) → "It gets me" (2-3:30) → "I want to come back" (3:30-5:00)

**How it works**:
- **0-10s**: The 5-10s motion carousel (resolved in 3.4) provides the visual hook — TikTok-style relatability lives in the carousel content (dark, premium, Apple-reveal feel)
- **10s-2min**: SIA's first interaction delivers the emotional "it gets me" moment — the UX-driven flow takes over
- **2-5min**: Momentum builds as SIA demonstrates value — never show an empty state, app feels alive from minute 1
- Key principle: **curiosity → warmth → momentum**

**Hamza's emphasis** (TikTok-style relatability, "what I'm thinking in my heart, he's saying it") lives in the carousel and SIA's first greeting. **Salman's emphasis** (screen-by-screen UX flow, never empty) lives in everything after the carousel.

---

### 1.4 Who is the primary user persona we're designing for?

**Status: ALIGNED** *(Resolved in V4 final review)*

**Decision**: Hamza's age range (18-45) as market scope + Salman's named personas as design anchors + "Mother Test" as the simplicity gate.

**Market scope**: Age 18-45. Someone struggling who wants to improve but needs guidance. Has tried other apps (fitness trackers, habit apps, budgeting tools) but found them too narrow. Wants a coach, not another tool. Would leave if content with themselves (Balencia did its job) or if the app feels overwhelming.

**Design anchors** (use these personas to make UI decisions):
- **Primary — "Amira, 28"**: Muslim professional juggling career, marriage, fitness, faith. Not tech-forward. Downloaded because everything feels disconnected. Would leave if app feels like a chore or too "health-bro."
- **Secondary — "Khalid, 35"**: High-achiever with WHOOP, wants cross-domain intelligence. Would leave if AI gives generic advice.

**Simplicity gate — "Mother Test"**: If Hamza's mother cannot use the app, it's too complicated. AI is supposed to make things simpler — Balencia must pass this test. This serves as the guiding principle for all UI complexity decisions.

---

### 1.5 What are the 3 apps whose feel/vibe you want Balencia to channel?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was CONTRADICTING)*

**Primary inspiration** (both agreed):
1. **Bevel** — Simplicity, visual clarity, warm AI coaching, rounded/approachable UI
2. **Habitica** — RPG gamification, quests, XP, meaningful consequences
3. **ChatGPT** — Conversational AI polish, clean chat with rich inline content

**Supplementary inspiration** (Salman's picks, acknowledged as supporting influences):
- **Oura Ring** — Premium dark UI, calm confidence, data-rich but never overwhelming
- **Calm** — Emotional warmth, beautiful motion, makes you feel taken care of
- **Arc Browser** — Modern, AI-first, bold design, feels like the future

**Lahore 28 resolution**: Salman reviewed Habitica for the first time during the meeting and was impressed. Both agreed to proceed with Hamza's list (Bevel + Habitica + ChatGPT) as primary references, with Salman's picks as supplementary influences on specific aspects (e.g., dark premium feel from Oura, motion from Calm).

---

### 1.6 How do you describe Balencia to someone in 10 seconds?

**Status: ALIGNED**

**Hamza**: "A coach in your pocket that guides you to a better life in all aspects — fitness, faith, finances, career, relationships — without overcomplicating anything, and giving you hidden insights about how it all connects."

**Salman**: "Balencia is an AI life coach that connects your fitness, finances, faith, and relationships into one system — then shows you patterns about yourself you'd never see alone."

**Merged**: Both hit the same notes. Hamza adds "without overcomplicating anything" (simplicity promise). Salman is more concise.

---

## 2. The AI Coach (SIA) Experience

### 2.1 What is SIA's personality in 3 adjectives?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was REVIEW)*

**Hamza**: **Adaptive, accountable, empathetic** — with range (accountable when needed, kind when struggling, pushy when lazy). Like a real coach with different modes. Should feel different per user.

**Salman**: **Warm, perceptive, direct** — Warm (genuinely cares, remembers personal details), Perceptive (notices patterns, the differentiator), Direct (clear recommendations, not menus of options).

**Merged direction**: Both want SIA to feel like a real coach, not a generic AI. Combined traits: **Perceptive, adaptive, direct** — captures Salman's differentiator (perception), Hamza's key trait (adaptive), and a shared trait (direct/accountable).

**Lahore 28 resolution — Tone behavior (critical decision)**: SIA's tone automatically adapts based on AI-detected motivation levels, not just the user-selected personality mode. The mechanism:
- SIA monitors task completion trends (e.g., 100% → 90% → 80% over 3 days = declining motivation)
- When decline is detected, SIA shifts approach — from strict to supportive ("Is everything okay? Should we revisit the plan?")
- Goal-level strictness settings remain valid (user says "be strict about this goal" = strict for that goal)
- But overall conversational tone adapts automatically to prevent user burnout
- Uses pro-and-con framing: explains benefits of doing AND not doing a task, not just threats
- Same goal, different motivation levels = different tone needed

**Key principle**: Real coaching uses varied approaches. Pure strictness throughout would backfire. SIA should behave like a real coach who reads the room.

**Part 2 new — SIA coaching philosophy**: SIA doesn't teach subject matter (won't teach algebra). It gives direction and planning. Example: "You have 16 hours before your exam. Study for 3 hours, get 8 hours of sleep." SIA is a life planning coach, not a subject-matter teacher. It plans, structures, and motivates — it doesn't deliver educational content.

---

### 2.2 What does the SIA chat screen look like?

**Status: ALIGNED**

Both agree: **Chat with rich inline cards** — clean chat messages as the foundation, with charts, goal progress, meal plans, and financial summaries appearing inline when relevant. Sometimes text-only, sometimes visual, sometimes navigational (redirecting to a full-screen feature).

**Hamza adds**: SIA should be able to redirect users to other app screens when full-screen experience is needed.

**Salman adds**: The infrastructure for rich cards is already built (artifacts, wiki links, check-in cards, memory cards, agent timeline). Mobile = full-width cards.

**Lahore 28 confirmation**: Confirmed as-is. Chat is the foundation; inline cards appear contextually. SIA can redirect to module pages (fitness, finance, etc.) when a full-screen experience is needed.

---

### 2.3 How does SIA connect life domains in conversation?

**Status: ALIGNED**

Both agree:
- **Proactively, always** — SIA surfaces connections without being asked
- **Visual domain tags** — Domain-colored tags/pills in the chat when SIA mentions cross-domain connections
- **Frequency** — When meaningful, not forced into every message

**New — Conversational domain input**: Users can report activities conversationally to SIA without using separate module interfaces or journaling:
- "I did 10 pushups" → automatically logged in Fitness/Workouts
- "I prayed 5 times" → automatically logged in Spirituality/Prayers
- "I had a fight with my wife" → automatically logged in Relationships
- This eliminates the need for separate journaling interfaces — SIA IS the input method

---

### 2.4 How does SIA deep-link into features?

**Status: ALIGNED**

Both chose **D) All of the above depending on context**: Rich inline cards for quick reference, direct navigation for full features, task creation for future actions. SIA decides based on context.

---

### 2.5 Voice interaction — how prominent?

**Status: ALIGNED**

Both chose **A) Prominent mic button + dedicated full-screen voice mode**. Voice is first-class. Similar to Gemini Live experience.

---

### 2.6 Should SIA have a visual avatar/face?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was CONTRADICTING. CORRECTED in Part 2 meeting.)*

**Decision**: **Proper 3D model with Gemini Live-like presentation.** SIA should have a visual presence — a 3D animated avatar that responds and reacts during conversations. This creates a more personal, human-like coaching experience. The avatar should feel premium and polished, giving SIA a face and personality that builds trust and emotional connection.

**Part 2 correction**: Hamza explicitly stated that the Lahore 28 meeting summary was captured incorrectly by AI. The original V2 recorded "simple animated icon for v1, 3D deferred" — this was **wrong**. The correct decision is a proper 3D model, not a simple icon. Hamza's exact words: "The 2.6 is wrong. Because you said... what you wrote in 2.6, AI picked it up incorrectly. It is a proper 3D model with Gemini-like kind of thing."

**V4 — Fallback strategy**: Target is the proper 3D model (Gemini Live-like). If technically infeasible in React Native for V1 (performance, build complexity), the graceful fallback is a polished 2D animated avatar with reactive expressions and speech sync. Design should proceed assuming 3D and not be blocked by a technical proof-of-concept.

**Previous V2 text (SUPERSEDED)**: ~~"Simple animated icon/logo for v1 chat interactions — pulses when thinking/speaking. 3D avatar deferred."~~

---

### 2.7 What's the difference between "AI Coach" and "Chat"?

**Status: ALIGNED**

Both: **Merge into one unified SIA experience.** One SIA, one conversation thread, one entry point. Multiple interaction modes within it (text, voice, check-in, deep dive).

---

### 2.8 Proactive messages from SIA — where do they appear?

**Status: ALIGNED**

Both chose **C) Both — push notification + home card**. Push notifications open SIA chat when tapped. Home screen shows latest observations as cards.

---

## 3. Onboarding & First Experience

### 3.1 How many screens should onboarding have?

**Status: ALIGNED** (both say ~5 steps)

**Hamza**: 5 steps (Welcome/Account → Life Assessment → Goal Setting → Preferences → Plan Generation). Supports light mode (2-3 min) and deep mode (optional deeper assessment).

**Salman**: 5 screens (Welcome+Name → Life Focus → Quick Assessment → Plan Preview → You're In). Integrations deferred to first week.

**Note**: Hamza includes "Preferences" as a step; Salman skips it. Hamza wants light/deep option; Salman keeps it fixed at 5.

---

### 3.2 Chatbot-driven or traditional screen-based onboarding?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was REVIEW)*

**Decision**: **Hybrid approach** — Chatbot at the bottom of the screen with visual guidance above.

**How it works**:
- Chat bot interface at the bottom where users answer questions
- Above the chat: flowing visual content — brainstorming bubbles, examples of goals, pre-built demonstrations of how others have used the app
- Brainstorming bubbles are clickable — users can tap to add ideas/goals
- AI suggestions appear next to the chatbot as recommendation chips
- The visual content above creates the "wow" feeling while the chatbot below drives structured data collection

**Lahore 28 resolution**: Hamza clarified his vision is NOT a pure chatbot (which would be slow/unpredictable as Salman noted), but a chatbot enhanced with visual elements above it. Salman accepted this hybrid approach. The visual content is not a video — it's motion/flow elements showing examples and brainstorming possibilities.

---

### 3.3 What information do you absolutely need before the user can start?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was CONTRADICTING)*

**Decision — Required upfront**:
1. Name
2. Life areas of interest
3. Primary life goals

**Deferred**: Age/gender, integrations (WHOOP, Calendar, Spotify), subscription plan, motivation level, obstacles.

**Part 2 addition — No religion in onboarding**: Hamza explicitly stated: "On boarding time, I don't want to mention religion." Religious discovery happens later through the Explore page or SIA conversations, not during initial onboarding.

**Lahore 28 resolution**: Hamza explicitly agreed to Salman's position. Key reasoning discussed: showing a subscription wall before the user has experienced the app's value discourages exploration. Users should get the free experience first, then encounter subscription options once they understand what Balencia offers. Integrations deferred to first week to reduce onboarding friction.

---

### 3.4 Should there be an intro video/animation from SIA?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was CONTRADICTING)*

**Decision**: **5-10 second motion carousel** with skip/next buttons. Motion graphics (not pre-recorded video). Abstract, dark, premium aesthetic (Apple product reveal feel). Skippable.

**Lahore 28 resolution**: Both agreed explicitly. Hamza conceded: "Carousel. We're doing 5 to 10 seconds. We're not doing 30 seconds pre-recorded. We're doing 5 to 10 seconds motion sequence. And there would be like skip, next. Carousel." The "wow" moment should come from the AI experience itself (first cross-domain insight from SIA), not from an intro video.

---

### 3.5 The AI assessment conversation — how deep does it go?

**Status: ALIGNED** *(Resolved in V4 final review)*

**Decision**: **Moderate depth for everyone (2-3 follow-up questions per goal), with SIA offering deeper assessment after ~1 week.**

This is effectively what both want: Salman's simpler implementation (fixed moderate depth, no chicken-and-egg problem of determining tier before assessment) combined with Hamza's adaptive principle (deeper conversation offered later once SIA knows the user). The deep assessment becomes a re-engagement moment in the first week rather than an onboarding blocker.

---

### 3.6 How do you handle the "I just want to try it" user?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was CONTRADICTING)*

**Decision**: **"Explore as guest"** option with dummy/predefined data. Users can browse the full app experience — fitness, finance, insights, all domains — with sample data to understand what Balencia offers. Actual AI coaching still requires minimum onboarding (name, life goals, life interests).

**Lahore 28 resolution**: Salman's "conversational skip" approach was rejected as impractical during the meeting — "How can I capture context from a single response? It's not God. It cannot." Both agreed that guest mode with predefined data is the right approach.

**Caveat**: Building the demo experience with dummy data "might be a lot of effort" — feasibility and cost-benefit still need assessment. The principle is approved; implementation details TBD.

---

## 4. Navigation & Information Architecture

### 4.1 What are the primary navigation items (max 5)?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was REVIEW)*

**Decision — 4 items (mobile bottom nav)**:
1. Today (Home)
2. SIA
3. Goals
4. Me (Profile + Settings + Explore merged)

**Lahore 28 resolution**: Salman's 4-item proposal accepted. Hamza agreed: "I think what Salman mentioned about explore within me, that's okay. Salman argues for build stronger muscle memory. Let's do that." Explore is merged into Me/Profile — users discover features through SIA and through the Me tab rather than a separate Explore tab.

---

### 4.2 How do 8 life domains organize in the UI?

**Status: ALIGNED**

Both chose **D) Hybrid** — Goals are the primary user-facing layer, users can drill into domain-specific dashboards from Explore. Domains are organizational scaffolding; goals are the user experience.

---

### 4.3 Pin-to-sidebar system — still want it?

**Status: ALIGNED** *(Resolved in V4 final review)*

**Decision**: **Deferred for V1.** Desktop pin system dismissed (Lahore 28: "Let's remove desktop. That's our mobile app."). Mobile bottom nav stays fixed at 4 items. If mobile quick-access is needed post-launch, implement as a simple "favorites" section within the Me tab. Not a design blocker for V1.

---

### 4.4 The Explore page — what does it look like?

**Status: ALIGNED**

Both want: Grid of module cards categorized by life domain, with AI recommendations ("Suggested for you") surfaced at top. Clean, browsable, discoverable.

**Lahore 28 note**: Explore is now part of the Me tab (see 4.1), so this content lives within the Me/Profile section rather than as a standalone tab.

---

### 4.5 How does navigation differ between mobile and desktop?

**Status: CONTRADICTING** (connects to 13.1)

**Hamza**: **Mobile app only.** No desktop. The entire redesign is mobile-focused.

**Salman**: Mobile (fixed 4-item bottom nav) + Desktop (collapsible sidebar with 5 primary items + pins). Both platforms. SIA is universal navigation fallback.

**Lahore 28 note**: Hamza stated "You can do whatever you want for desktop. Apart from that, that's on you." This creates a de facto split: mobile is the product (Hamza's design focus), desktop is Salman's separate operational concern. See 13.1 for full discussion.

**See 13.1 for full resolution.**

*Not reached in either meeting — pending future discussion.*

---

### 4.6 Where does the admin panel live?

**Status: ALIGNED**

Both: Not a priority. Separate layout, minimal UI/UX investment. Focus entirely on the customer experience.

---

## 5. Home Screen / Daily Experience

### 5.1 What IS the home screen?

**Status: ALIGNED**

Both: A **"Today" view** that is SIA-forward. SIA's greeting + proactive message are the first thing. AI-suggested actions across life domains. Active goals visible. Not a pure chat screen (that's the SIA tab) but SIA's intelligence drives the entire home experience.

---

### 5.2 What are the top 5 things visible on the home/today screen?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was REVIEW)*

**Decision — Merged list**:

| Priority | Item | Notes |
|----------|------|-------|
| 1 | SIA's greeting / proactive message | Both aligned from the start |
| 2 | Today's AI-suggested actions | Both aligned from the start |
| 3 | Active life goals with progress | Both aligned from the start |
| 4 | Activity feed / upcoming events | Hamza's items — recent activity and schedule |
| 5 | Proactive insight cards | SIA's proactive messages and AI-suggested actions appear as inline cards |

**Lahore 28 resolution**: Both lists merged. "Proactive message and today's AI-suggested actions includes inside cards. Quick check-in prompts is included in upcoming events activity feed." The check-in is woven into the activity feed, and cross-domain insights surface as proactive cards when high-confidence connections exist.

---

### 5.3 How much data density is appropriate?

**Status: ALIGNED**

Both chose **D) Adaptive by motivation tier**: Low = minimal, Medium = moderate, High = dense. The app meets each user where they are.

---

### 5.4 Should there be a daily check-in?

**Status: ALIGNED**

Both chose **B) Part of SIA's greeting — conversational, not a form.** Woven into the morning greeting naturally.

---

### 5.5 How do cross-domain connections surface on the home screen?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was REVIEW)*

**Decision**: Subtle, layered approach:
- **Domain-colored tags as baseline** — always visible on action items and goals
- **Insight cards only when high-confidence** — dedicated cross-domain insight card appears periodically when a significant connection is discovered
- **Subtle weaving** — connections don't always need to be explicitly shown as separate. "It kind of merged together. That's why I want to be subtle."

**Lahore 28 resolution**: Hamza emphasized subtlety: "Cross domain connections don't really need to always be shown... that's why it's subtle. It doesn't need to show that everything is separate." Both agreed on domain tags as the constant baseline, with insight cards reserved for high-confidence moments.

---

## 6. Life Domains & Feature Organization

### 6.1 How do the 8 life domains present themselves in the UI?

**Status: ALIGNED**

Both chose **E) Combination**: Colored tags everywhere (B) + Domain dashboards in Explore (C) + Life wheel/holistic visualization (D). Domains visible but not primary navigation. They're the connective tissue.

Both emphasize: It should feel like managing **one life** with many dimensions, not switching between mini-apps.

**New — Future domain expansion**: Currently 8 domains, but the system should be designed to accommodate 20+ domains in the future. Domain architecture must be extensible, not hard-coded to the current 8.

---

### 6.2 The AI-first interaction pattern — does it apply to ALL domains?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was CONTRADICTING. Confirmed in Part 2 meeting.)*

**Decision**: **AI-first applies equally to ALL domains.** Same pattern everywhere: AI suggests → user reviews → accepts/edits/skips → AI learns. No domain is exempt. SIA is the coach across the board.

The graduated 80/50/20 ratios (AI-heavy for workouts, balanced for budget, user-heavy for spirituality) were explicitly rejected.

**Lahore 28 resolution**: Hamza argued: "I think everything should be AI-first. The whole idea is these are eight domains... they can be as many domains as they want." When Salman's graduated ratios were read aloud, Hamza responded: "So what is this? 80, 50, 20. This is the suggestion. Okay, failed. Let's go." Salman did not push back.

**Part 2 confirmation**: Salman confirmed: "It's going to be equally. It's going to be 20-20. It makes sense. This whole thing — AI suggests, user reviews, accepts, edits, skips, AI learns. I think this is the way it can go for all."

**Important nuance**: AI-first doesn't mean AI-prescriptive for personal domains. The AI approach for "Here's your workout" vs "Let's pray together" will naturally differ in tone and sensitivity, but the AI-first interaction pattern remains consistent. User controls domain ratios/weightings.

---

### 6.3 Per-domain design intent

**Status: ALIGNED** *(Resolved — follows from 6.5 decision)*

**Decision**: ALL domains get Full depth. Every domain receives full feature treatment because the features are already built. The redesign is about making them feel cohesive, not cutting scope.

| Domain | Depth |
|--------|-------|
| Fitness & Movement | Full |
| Nutrition & Diet | Full |
| Mental Health & Wellbeing | Full |
| Finance & Money | Full |
| Career & Work | Full |
| Relationships | Full |
| Spirituality & Religion | Full |
| Learning & Growth | Full |
| Creativity | Full |

---

### 6.4 Custom life domains — how does a user add one?

**Status: ALIGNED**

Both chose **C) User just sets a goal — the AI figures out which domain it belongs to.** No explicit domain creation. SIA maps goals to domains automatically.

---

### 6.5 Which domains are v1 priority vs later?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was REVIEW, deferred from Lahore 28)*

**Decision**: **All domains are V1 priority.** More features per module can come later, but all domains ship at V1.

**Part 2 resolution**: Salman confirmed: "All of them are fine. All of them are priority because we're not really focusing on one over the other. We will have more features for each module and more modules, but that will be later. But all of them are priority. All of them can be used because the worst case scenario, the chatbot can talk to chat."

**Previous Salman position (SUPERSEDED)**: ~~Prioritized depth with Fitness/Nutrition/Mental Health as Full, others as Moderate/Light/Later.~~

---

### 6.6 Cross-domain intelligence — how are connections shown?

**Status: ALIGNED**

Both chose **E) All of the above, in different contexts**: SIA in conversation (primary), home screen cards, dedicated insights view, Knowledge Graph (power users), proactive notifications.

**Hamza adds**: Life Correlation Matrix is proprietary — positioned as the commercial differentiator. The exact correlations are still being developed; UI should accommodate dynamic/evolving correlations.

---

### 6.7 Wellbeing sub-features — consolidate or keep separate?

**Status: ALIGNED**

Both favor consolidation: Core features (journal, mood, habits) get standalone screens. Lighter features (breathing, energy check, stress assessment) become SIA-invoked. Goal: reduce 10+ sub-module sprawl without losing functionality.

---

### 6.8 Finance depth — how much of a finance app is this?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was CONTRADICTING)*

**Decision**: **Full finance dashboard (Mint/YNAB level)** — Transaction tracking, budgets, savings goals, receipt scanning, analytics. Connected to life-system intelligence. "It's Mint, but with life-system intelligence layered on top."

**Part 2 resolution**: Hamza asked: "Do you agree with this — goal-oriented finance tracking?" Salman said: "No." Both agreed on a full finance dashboard.

**Previous Salman position (SUPERSEDED)**: ~~Goal-oriented finance tracking only. "Balencia is a life coach, not a finance app."~~

---

### 6.9 Spirituality & religion — how explicitly religious vs spiritual?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was REVIEW)*

**Decision**: **Let AI handle it.** No rigid religion-specific UI. SIA adapts to user's stated beliefs.

**Key principles from Part 2 discussion**:
- SIA adapts to user's stated beliefs (Muslim, Christian, agnostic, etc.)
- **No religion mentioned during onboarding** — religious discovery happens through Explore page or SIA conversations
- Explore page allows religious discovery: "What's your religion? What are you interested in?"
- SIA gives **direction, not religious rulings** — "It's a coach, not an imam. It should not have the right to give you fatwas."
- Religious content (Quran, Hadith, Bible) can be AI-curated but **needs authentication by a qualified person** before AI can reference it — "Without authentication, the AI can do anything. It can be bad."
- Features like prayer tracking and scheduling work for any faith — "Prayer and church is the same thing" from a feature perspective
- Example: An agnostic user could get a plan to "read the Quran for 2 weeks, read the Bible for 2 weeks, read the Torah for 2 weeks"
- Hamza's personal note: Islamic features are personally important to him, but realistically "95% of people wouldn't care"

**Previous Salman position (SUPERSEDED)**: ~~Islamic features as primary, expand later.~~

---

### 6.10 What existing features should be REMOVED from the app?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was CONTRADICTING)*

**Decision**: **Nothing removed.** All features remain functional. Progressive disclosure via SIA as navigator. Features don't need to be in your face — SIA navigates users to them.

**Part 2 resolution**: Hamza confirmed: "Nothing removed, all features are functional, progressive disclosure." SIA as navigator means features like competitions, leaderboard, and soundscapes exist but are surfaced by SIA contextually rather than cluttering the main navigation.

**Part 2 clarification — Soundscapes**: Soundscapes = Spotify integration (mood detection from music). Acknowledged as technically difficult but kept as a feature.

**Previous Salman position (SUPERSEDED)**: ~~Cut HIPAA page, Careers page, Blogs (in-app), Webinars (in-app). Deprioritize Knowledge Graph, Competitions, Leaderboard, Soundscapes, Yoga Library, Vision Board.~~

---

## 7. Goals & Plans System

### 7.1 Goal decomposition — how much does the user see?

**Status: ALIGNED**

Both: **Summary with expandable detail.** Default shows "7 actions across 3 life areas" → tap to see full breakdown. Full decomposition available for those who want it. Casual users see today's actions only.

**Part 2 note**: Goal decomposition connects to the Personal Wiki — wiki-related content can surface in the goal breakdown view.

---

### 7.2 What do life goal cards look like?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was REVIEW)*

**Decision**: **4 essential elements** (Salman's approach, adopted by Hamza):
1. **Progress ring/bar** — Primary visual element
2. **Connected domain color icons** — The differentiator that makes Balencia feel like a live system
3. **Next action due** — Tappable, actionable
4. **AI coaching note** — "Strong momentum this week!"

**Part 2 resolution**: Hamza reviewed both options and chose Salman's 4-element approach: "Let's do what you said. I think it's fine." Hamza's key insight: "Domain colors on goal cards are what makes Balencia feel like a live system, not just a task list. Without them, goal cards look like any other app."

**Previous Hamza position (SUPERSEDED)**: ~~Minimal — progress ring/bar as the only essential element, everything else contextual.~~

---

### 7.3 Motivation tiers — how do they manifest in the UI?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was CONTRADICTING)*

**Decision**: **Automatic tier-based UI density** (Salman's approach). Same layout, content density adapts automatically based on tiers. Users shouldn't feel like they're using a "lesser" version.

**Part 2 resolution**: Hamza agreed to Salman's automatic approach. Additionally, subscription tiers were defined:

**Subscription model**:
- **Free** ($0) — Non-AI features available (journaling, finance module). AI features are the paywall differentiator.
- **Plus** ($20/month)
- **Pro** ($60/month)
- **Max** ($100-200/month)

**Free tier principle**: Non-AI features are accessible on the free tier. AI features differentiate the paid tiers. Bevel's model as reference.

**Previous Hamza position (SUPERSEDED)**: ~~User chooses view density independently of motivation tier.~~

---

### 7.4 Progress visualization — per-goal, per-domain, or unified?

**Status: ALIGNED**

Both chose **E) Multiple views available**: Per-goal progress rings, life wheel/radar chart, per-domain drill-down. Different moments call for different views. Both agree: **No unified "Life Score"** single number.

---

### 7.5 Milestones & celebrations — how big is the moment?

**Status: ALIGNED**

Both chose **D) Depends on milestone size**: Small wins = toast/brief animation. Big milestones = full-screen celebration with animation, confetti, SIA congratulations.

**Salman adds**: Also tier-adapted — low-motivation users get more celebration for smaller wins; high-motivation users get data summaries instead of confetti.

---

## 8. Knowledge System & Intelligence

### 8.1 Knowledge Graph — user-facing or behind the scenes?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was REVIEW)*

**Decision**: **Life Correlation Matrix is proprietary — promoted in marketing, hidden inside app.**

**Part 2 resolution**: Hamza clarified the approach:
- The Life Correlation Matrix / Knowledge Graph is **behind the scenes** inside the app — users don't see the raw graph
- AI surfaces correlations contextually: "Hey, by the way, compared to normal people, your sleep is more correlated to your food. When you sleep late, you eat more."
- The **landing page** can show a visual representation for **marketing purposes** — "This is the secret sauce that we have"
- It's a **proprietary, marketing-sensitive, secret data source** — promoted externally as the differentiator, but the mechanics are hidden from users
- Users experience the graph's intelligence through SIA's insights, not through direct visualization

**Balencia City vision**: Deferred as long-term direction. Each domain as a "room" users zoom into — but only after foundational design is established.

**Previous positions (SUPERSEDED)**: ~~Hamza: hybrid with Balencia City vision. Salman: power-user feature in Explore.~~

---

### 8.2 Personal Wiki — visible to the user?

**Status: ALIGNED**

Both: **Yes, visible and editable.** Users can browse what SIA knows about them, edit/correct information, and feel confident the AI is grounded in accurate data. Hamza references Bevel's knowledge base as inspiration. Salman recommends a simplified "What SIA knows about me" view with delete and "This is wrong" buttons.

**Part 2 enrichment — "Book of Life" concept**: Hamza described the Personal Wiki as storing "different chapters of my life" that becomes "a powerful book or personal book at the end of your life, InshaAllah." The wiki is distinct from:
- The SIA conversation record (chat history)
- The journaling feature (user-created entries)
The Personal Wiki is the AI-compiled knowledge base that grows over time into a comprehensive life record.

---

### 8.3 Cross-domain insights — how are they delivered?

**Status: ALIGNED**

Both chose **E) All channels** — SIA conversation, home screen cards, weekly digest, dedicated insights page, proactive notifications. Urgency and context determine the channel.

---

### 8.4 Memory transparency — should users see what SIA remembers?

**Status: ALIGNED**

Both: **Full access.** Users can view, edit, delete memories. Builds trust. Aligns with Personal Wiki being visible (8.2).

---

### 8.5 Data Privacy (New — from Part 2 meeting)

**Status: DEFERRED**

**Part 2 discussion**: If using cloud AI providers (Codex, Gemini, Claude), true data privacy is impossible — "There is nothing we can say." The most private option would be running AI models on-device ("use your phone — AI model is running on your phone").

**Decision**: Deferred for later discussion. Not blocking design decisions. Both acknowledged the tension between cloud AI capabilities and privacy promises.

---

## 9. Social & Community

### 9.1 How prominent should social features be?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was REVIEW)*

**Decision**: **Individual first, social as enhancement.** The solo coaching experience is complete on its own. Social features are available but not forced.

**Part 2 resolution — Available social features for V1**:
- Leaderboard (reframed — see 9.2)
- Communities
- Chat rooms (group-based, not public feed — "three friends can make a separate room")
- **No follow/friend request system for V1**
- **No Tinder-style matching** ("We can add Tinder later. Not right now.")
- Accountability via groups

**Previous Salman position (SUPERSEDED)**: ~~Minimal for V1 — basic accountability partner system only, no feed, no profiles, community as V2.~~

---

### 9.2 Leaderboard — motivating or anxiety-inducing?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was CONTRADICTING)*

**Decision**: **Leaderboard stays but reframed.**

**Part 2 resolution**: Both agreed the leaderboard should NOT rank domain-specific metrics against each other (sleep vs. prayer vs. finance is nonsensical). Instead, it measures:
- **Consistency** — Are you doing what you committed to?
- **Discipline** — Are you following through?
- **Efficiency** — Are you improving?
- Core question: **"Who is leading in improving their life?"** — not who has the best sleep or the most prayers

**Implementation notes**:
- Current fitness/workout/nutrition-only leaderboard will change to reflect the new framing
- Will evolve with the RPG gamification system (XP, quests)
- **Concern noted**: RPG gamification must stay simple to avoid pushing away serious users. "Would it push people away? The serious people."

**Previous Salman position (SUPERSEDED)**: ~~Remove for V1. "What does 'winning' even mean across multiple life domains?"~~

---

### 9.3 Competitions & shared challenges — keep for v1?

**Status: ALIGNED**

Both chose **C) Deprioritize** — Build after core AI coach experience is solid.

---

### 9.4 Accountability — AI-driven or social?

**Status: ALIGNED** *(Resolved in V4 final review)*

**Decision**: **Both AI + social from V1.** SIA is the default accountability coach. Social accountability (friend notifications, group accountability) available from V1.

**How it works**:
- **SIA as primary**: AI-driven accountability is always on — reminders, streak tracking, motivation adaptation
- **Social as enhancement**: Friends can hold you accountable via notifications. Group accountability through chat rooms (see 9.1)
- **Financial stakes** (from Part 2 enrichment): "If I don't do this, I will give 1,000 rupees" — AI enforces, friends get notified
- Aligns with RPG party quests (10.2) and the social features decision (9.1 — "individual first, social as enhancement")

---

## 10. Gamification & Motivation

### 10.1 How prominent are streaks?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was REVIEW)*

**Decision**: **Streaks are prominent and feed into the RPG gamification system.** Everything is gamified — streaks included. Per-goal streaks (prayer, workout, journaling) each feed into the broader RPG system.

**Part 2 resolution**: Hamza confirmed: "I think what I am saying makes sense. It all goes into the RPG gamifying thing."

**Previous Salman position (SUPERSEDED)**: ~~Present but not central. Visible on home screen but not THE motivation.~~

---

### 10.2 Achievement system — how does it work across all life domains?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was CONTRADICTING)*

**Decision**: **Full RPG gamification system confirmed.** WoW/Habitica-inspired. Must feel premium and mature, not cartoonish.

**Part 2 resolution — Detailed mechanics**:
- Goals become **missions/quests**
- Sub-goals become **sub-quests**
- Users level up with **XP**
- Each domain is a skill tree (Fitness Level 12, Finance Level 8)
- **HP loss for missed tasks** (from Habitica)
- **Party goals** — social quests (e.g., "go to gym with a friend," "reach out to someone to tell him to pray")
- **Financial quests** — "Save $500"
- **Friends accountability via notifications** — friends get notified when you miss tasks
- **Financial stakes** — "If I don't do this, I pay 1,000 rupees" — AI enforces, friends get notified
- Cross-domain = epic quests
- **Must feel premium and mature, not cartoonish** — carefully executed

**Hamza's enthusiasm**: "Oh, I love this. This would be so fun. I'm very excited. This is the biggest."

**Design concern**: RPG must stay simple. Both acknowledged: "As long as it's simple, I think everyone would love it."

**V4 — RPG V1 Scope**: To keep RPG simple enough to pass the "Mother Test" (1.4):
- **V1 mechanics**: XP + levels + quests + domain skill levels (e.g., "Fitness Level 12, Finance Level 8")
- **V2 deferred**: Skill trees, HP loss for missed tasks, financial stakes enforcement, party quests
- V1 should feel like a clean leveling system, not a full RPG client

**Call of Duty profile analogy** (from Lahore 28): User stats card showing health, XP, level, domain stats — visible profile card reflecting life progression. Integrates with the RPG system.

**Previous Salman position (SUPERSEDED)**: ~~Standard achievement system — cross-domain achievements + domain-specific. No RPG framework.~~

---

### 10.3 Micro-wins — surface them or let them accumulate?

**Status: ALIGNED**

Both: Adapted by motivation tier / context. Small XP gain for actions, batched summaries when appropriate. Low-motivation users get more immediate celebration.

---

### 10.4 Does gamification intensity adapt by motivation tier?

**Status: ALIGNED**

Both: **Yes.** Low = heavy gamification. Medium = balanced. High = lighter, data-focused.

---

## 11. Subscription & Monetization

### 11.1 Free vs paid — what can free users access?

**Status: REVIEW** *(Updated in Part 2 meeting — partially resolved)*

**Hamza**: **Restrictive free tier** — Basic dashboard, limited goals (1-2 domains), basic features WITHOUT AI enhancement. No or very limited SIA. No cross-domain insights. "Don't make it loss-making."

**Salman**: **More generous free tier** — 10 messages/day with SIA, full home/today screen, 2 life domains, basic journal/mood/habits, 1 cross-domain insight per week. Goal: deliver one "holy shit" moment per week to drive upgrades.

**Part 2 update**: Both want a non-AI free version similar to Whoop/Bevel/Fitbit dashboards. AI features are the premium differentiator. Non-AI features (journaling, finance module) available on free tier. Free tier gets **limited AI tokens** for testing.

**Still unresolved**: Exact free tier boundaries. Hamza noted: "I don't know if we can have a free version at all. Let's see. I don't have an answer. Let's work on this and then let's see." To be decided after screens are designed.

---

### 11.2 Subscription model — tiered plans or modular?

**Status: ALIGNED** *(Enriched in Part 2 meeting)*

Both chose **A) Pre-built tiers**. Simple, clear. Both argue against modular pricing — it undermines the cross-domain value proposition and creates decision paralysis.

**Part 2 addition — Specific pricing**:

| Tier | Price/month |
|------|-------------|
| Free | $0 |
| Plus | $20 |
| Pro | $60 |
| Max | $100-200 |

**Final pricing TBD.** Show all features to everyone — upsell via visibility, not hiding.

---

### 11.3 How do you handle "locked" features?

**Status: ALIGNED**

Both: **Multi-strategy** — SIA conversational upsell (primary) + visual indicators (lock icon / blurred preview) as fallback. Never hide features entirely. Both want users to know what's possible to build desire.

**Hamza adds**: Dynamic, contextual paywalls where the upgrade message adapts to what the user was trying to do. One-time free trials for key features.

---

### 11.4 AI usage limits — credit system?

**Status: ALIGNED**

Both: **Tiered approach** — Free: limited messages/day. Paid: generous/unlimited. No credit/token system (adds cognitive load). Both agree: users shouldn't feel metered.

**Hamza adds**: Visible real-time usage meter on Pro tier. Graceful degradation (lighter AI model instead of hard block).

---

## 12. Visual & Emotional Design

### 12.1 Dark mode is primary — how dark?

**Status: ALIGNED**

Both: **Mix of pure dark base + warm elevated surfaces.** Follow brand guidelines.

**Hamza specifies**: ink-900 `#0A0A0F` base + ink-brown-800 `#211008` elevated surfaces (brand spec).

**Salman references codebase**: `#080C10` canvas, `#0F1419` surface, `#161D26` elevated.

**Note**: The specific hex values differ between brand spec (Hamza) and current codebase (Salman). Need to confirm which is authoritative for the redesign.

---

### 12.2 Light mode — how important?

**Status: ALIGNED**

Both: **B) Available as toggle, dark is default and primary.** Light mode is a support feature, not a design priority. Hamza specifies `paper-100 #FEFAF3` for light background per brand guidelines.

---

### 12.3 How much animation and motion?

**Status: ALIGNED** *(Updated in Part 2 meeting — SIA chat animation level corrected)*

| Area | Level |
|------|-------|
| Landing page | Cinematic |
| Onboarding | Polished |
| Home/Dashboard | Polished |
| SIA chat | **Polished** |
| Feature screens | Minimal-Polished |
| Settings/Profile | Minimal |
| Celebrations | Cinematic |

**Part 2 correction**: The V2 document noted SIA chat animation should lean toward Minimal based on the avatar being a simple icon. Since the 2.6 avatar decision has been corrected (proper 3D model, not simple icon), **SIA chat animation returns to Polished** — Hamza's original position. The 3D avatar with Gemini Live-like presentation requires polished animation for the reactive avatar, speech sync, and ambient motion.

**Hamza adds**: Specific motion timing guidelines from brand — `--ease-flow` (cubic-bezier), durations from 160ms to 1.2s for different contexts.

---

### 12.4 The continuous stroke line — where does it appear?

**Status: ALIGNED**

Both: Onboarding, hero sections, transitions, achievement celebrations, domain transitions. NOT on data-heavy screens. The line is the visual metaphor for "connecting what you can't see" — used where that metaphor matters.

**Part 2 confirmation**: Hamza confirmed: "Not everywhere. Not on heavy data screens. It can be for achievement, celebration, domain transitions, hero sections and onboarding."

---

### 12.5 Photography vs illustration vs abstract?

**Status: ALIGNED**

Both: **Mix** — Warm photography for marketing/onboarding (real people, relatable). Custom illustrations for empty states and feature explanations. Abstract gradients for in-app data contexts.

---

### 12.6 Icon style — outlined or filled?

**Status: ALIGNED**

Both: Follow brand guidelines — Rounded, 2px stroke, outlined default. Filled variants for active/selected states.

**Hamza provides domain color codes**: Career/Indigo (#6366f1), Relationships/Pink (#ec4899), Creativity/Amber (#f59e0b), Spirituality/Purple (#8b5cf6), Finance/Emerald (#10b981), Fitness/Red (#ef4444), Learning/Cyan (#06b6d4), Custom/Slate (#64748b).

---

## 13. Platform & Responsiveness

### 13.1 What is the primary platform?

**Status: ALIGNED** *(Resolved in V4 final review)*

**Decision**: **Mobile is the design scope. Desktop is a separate engineering concern outside this design document.**

All design work in this questionnaire targets the mobile app. No desktop design work blocks V1. Desktop features (admin panel, N8N scheduler, WhatsApp integration, detailed analytics) are Salman's separate operational/engineering concern and are not part of the core mobile product design vision.

**Lahore 28 context**: Hamza stated: "You can do whatever you want for desktop. Apart from that, that's on you." This is now formalized as the official position.

---

### 13.2 Are there features that are mobile-only or desktop-only?

**Status: ALIGNED** *(Resolved in V4 final review — follows from 13.1)*

**Decision**: All features in this design document are designed for mobile. Desktop-optimized features (admin panel, detailed analytics, side-by-side panels) exist as Salman's separate engineering scope and are not part of this design vision. Mobile-native capabilities (voice mode, camera, push notifications, haptics) are first-class citizens of the mobile design.

---

### 13.3 Should the mobile experience feel like a native app?

**Status: ALIGNED** *(Confirmed in Part 2 meeting)*

Both: **Yes.** Bottom tab bar, swipe gestures, pull-to-refresh, smooth transitions, haptic-style feedback. User shouldn't be able to tell it's not native.

**Part 2 confirmation**: Hamza confirmed: "It's fine, yeah? Yes. Okay, so we make it into a native app. Nice."

---

## 14. Notifications & Engagement

### 14.1 What are the top 3 notification types?

**Status: ALIGNED** *(Confirmed in Part 2 meeting)*

Both agree:
1. **SIA proactive AI insights/suggestions** — the core value
2. **Reminders / Streak alerts** — keeping users on track
3. **Daily check-in / engagement prompts** — daily return habit

---

### 14.2 Push vs in-app balance?

**Status: ALIGNED** *(Confirmed in Part 2 meeting)*

Both: **Adapted by motivation tier** with user override capability. Low = 1/day max. Medium = 2-3/day. High = up to 5+/day.

**Part 2 confirmation**: "Adapted by motivation here with user override" — confirmed aligned.

---

### 14.3 Proactive AI timing — does it adapt?

**Status: ALIGNED**

Both: **Yes.** Frequency and timing adapt by motivation tier and engagement patterns. Infrastructure already built (8 cycles/day, 4 messages/day cap, timezone-aware).

---

## 15. Data, Privacy & Transparency

### 15.1 How transparent should AI data usage be?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was REVIEW)*

**Decision**: **Selective transparency — show data inputs, protect algorithms.**

**Part 2 resolution**: Both agreed on a merged approach:
- Users see their data and can **edit it via Personal Wiki**
- **"Show me the data"** — expandable on every SIA insight showing data sources, time period, and confidence level
- Proprietary correlation algorithms remain **protected** — "the 'how' is Balencia's IP"
- Users can share insights from chat
- Formula: **Show the data inputs without revealing the algorithm**

**Hamza's framing**: "Users' data is shown, Personal Wiki is shown, but proprietary correlation algorithms are protected. They won't be exposed. We want to keep that secret sauce."

**Previous positions (SUPERSEDED)**: ~~Hamza: selective transparency only. Salman: full transparency per insight.~~ → Merged: data inputs visible, algorithms protected.

---

### 15.2 Data export — is this a feature?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was CONTRADICTING)*

**Decision**: **No data export for V1.** Risk of reverse engineering SIA's proprietary algorithms outweighs GDPR compliance benefits. Maximum a user can do is take screenshots. May revisit later.

**Part 2 resolution**: Hamza was direct: "Let's remove data export. There's no data export. Let's keep it that way." The concern is that exporting insights, data, and chat history could enable reverse engineering of how SIA operates.

**GDPR note**: If targeting EU users, GDPR makes data export legally required. This decision may need revisiting before EU launch. Both acknowledged this isn't ideal for compliance.

**Previous Salman position (SUPERSEDED)**: ~~Yes, essential. Required for GDPR. Trust signal.~~

---

### 15.3 Integration data — how is it presented?

**Status: ALIGNED**

Both: **Connected Services dashboard** in settings showing all integrations with status, sync info, and connect/disconnect controls. Integration data silently woven into SIA's understanding.

---

## 16. Content & Education

### 16.1 Blogs and articles — part of the app or separate?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was CONTRADICTING)*

**Decision**: **No blogs/articles in the app for V1.** Content lives on the website/landing page for SEO and acquisition. Not in the app.

**Part 2 resolution**: Hamza decided: "For now, no. We don't want blogs and articles in the app. For now, it can be separately done, potentially on the landing page, but not in the app."

**Future possibility**: Reddit-like community for reviews, testimonials, and articles — but as a separate application, not in the main Balencia app.

**Previous Hamza position (SUPERSEDED)**: ~~Part of the app. SIA recommends relevant articles. Content integrated into coaching.~~

---

### 16.2 Webinars — live or on-demand?

**Status: ALIGNED** *(Resolved in Part 2 meeting — was REVIEW)*

**Decision**: **Webinars cut entirely for V1.** Not focusing on this.

**Part 2 resolution**: Hamza confirmed: "Yes, let's cut webinars as well, entirely, for now, and not focus on this."

**Previous Hamza position (SUPERSEDED)**: ~~Recorded libraries, on-demand, recommended by SIA.~~

---

### 16.3 Help center — standalone or SIA-powered?

**Status: ALIGNED**

Both chose **C) Both** — Traditional help page with FAQ + SIA-powered help in conversation. Ensures users get help however they prefer.

---

## 17. Screen Priority Ranking

**Status: ALIGNED** *(Resolved in Part 2 meeting — was REVIEW)*

**Decision**: Redesign everything, but priority order for first screens:

| Priority | Screen |
|----------|--------|
| **1** | Onboarding flow |
| **2** | AI Coach (SIA) |
| **3** | Home / Today |
| **4** | Goals |

**Part 2 resolution**: Hamza confirmed: "Onboarding flow — this needs to be seen. That's number one. AI coach, number two. Home/Today, yes [number three]." These map to the 4 bottom nav items from section 4.1 (Today, SIA, Goals, Me).

**Note**: "We are redesigning everything. We won't have this [ranked priority list]. Screen redesign priority order — I think we don't need to look at this because we are redesigning everything." The priority order above is for **which screens to design first**, not which screens matter more.

**Previous ranking table (SUPERSEDED)**: ~~Hamza ranked Landing Page #1; Salman ranked Onboarding #1. Full 20-item ranked table with different orderings.~~

---

## 18. Open Questions & Wild Card

### 18.0 How does gamification interact with the Life Correlation system?

**Status: PARTIALLY RESOLVED** *(Updated in Part 2 meeting — was OPEN)*

**Confirmed**: RPG direction is confirmed. Cross-domain correlations **will** be part of quests.

**Still needs exploration**: The specific mechanics — how XP flows between correlated domains, how epic quests unlock based on correlation data, whether cross-domain correlations unlock special quest types — need dedicated design exploration.

**Part 2 resolution**: Hamza confirmed: "Cross-domain correlations definitely should be part of the quest that we do make. But we just need to think a bit more from a gamifying perspective." The RPG + correlation integration is approved in principle; the details require more design work.

### 18.1 Pioneer experience

**Status: ALIGNED**

Both: Cross-life-domain causal intelligence. No app connects fitness + finance + faith + career + relationships and reveals patterns across all of them. This is the "holy shit" moment.

### 18.2 What to keep from current app

**Status: ALIGNED**

Both: The AI intelligence backend — memory engine, cross-pillar intelligence, proactive messaging, knowledge graph. The UI changes; the backend is the moat.

### 18.3 What must change

**Status: ALIGNED**

Both: Simplicity. Reduce the 30+ sidebar items, 10+ wellbeing sub-modules, 2 AI chat entry points. Reduce visible surface area dramatically while keeping 100% capability through progressive disclosure and SIA.

**V4 — Visible Surface Budget**: Since nothing is removed (6.10) and all domains are full depth (6.3/6.5), the simplification strategy relies entirely on progressive disclosure via SIA. To keep the "Mother Test" (1.4) honest, each screen should have a measurable cap on visible tappable elements. This makes simplicity a design constraint, not just an aspiration. If SIA's routing fails or feels slow, users hit a wall — so SIA navigation quality is a critical dependency.

### 18.4 Design inspiration

**Hamza**: Bevel — primary design inspiration for visual simplicity with deep functionality.

**Salman**: Not answered.

### 18.5 Tell a friend moment

**Status: ALIGNED**

Both: The moment SIA reveals a cross-domain connection so accurate and surprising that the user can't believe an app figured it out. "It told me my spending spikes on days I skip the gym — and it was right."

---

### 18.6 Landing page vision (New — from Lahore 28 meeting)

**Status: ALIGNED** *(New item from Lahore 28 meeting)*

**Hamza's vision** (Salman accepted tentatively):
- **Chat bot at the bottom** of the landing page
- **Brainstorming bubbles floating above** — clickable, users can tap to add goals/ideas
- **AI suggestions next to the chatbot** as recommendation chips
- **Flowing visual content above** showing pre-built examples of goals being set and achieved
- Examples of how previous users have used the app (not video — motion/flow elements)
- Core feeling: "This feels different. It's talking to me. It gets me. It's already working."

---

## Summary: Resolution Checklist

### Resolved in Lahore 28 meeting (V2):

1. [x] **1.5 Design inspiration apps** — Bevel + Habitica + ChatGPT primary, Salman's picks supplementary
2. [x] **2.6 SIA avatar** — ~~Simple animated icon for v1, 3D deferred~~ **CORRECTED in Part 2: Proper 3D model (Gemini Live-like)**
3. [x] **3.3 Required onboarding info** — Name, life areas of interest, primary life goals only
4. [x] **3.4 Intro video** — 5-10 second motion carousel with skip/next
5. [x] **6.2 AI control by domain** — AI-first for all domains equally
6. [x] **2.1 SIA personality/tone** — Adaptive based on motivation detection
7. [x] **3.2 Onboarding style** — Hybrid: chatbot + visual guidance above
8. [x] **3.6 "Try it" user** — Guest mode with dummy data + minimum onboarding for coaching
9. [x] **4.1 Bottom nav** — 4 items (Today, SIA, Goals, Me)
10. [x] **5.2 Home screen items** — Both lists merged with inline cards
11. [x] **5.5 Cross-domain on home** — Domain tags baseline + insight card at high confidence

### Resolved in Part 2 meeting (V3):

12. [x] **6.5 Domain priority V1** — All domains V1 priority
13. [x] **6.8 Finance depth** — Full finance dashboard (Mint/YNAB level)
14. [x] **6.9 Spirituality** — Let AI handle it. No rigid religious UI. SIA adapts. Religious content needs human authentication. No religion in onboarding.
15. [x] **6.10 Features to remove** — Nothing removed. Progressive disclosure via SIA.
16. [x] **7.2 Goal cards** — 4 essential elements (Salman's approach)
17. [x] **7.3 Motivation tiers** — Automatic tier-based UI density. Subscription: Free/Plus/Pro/Max.
18. [x] **8.1 Knowledge Graph** — Behind the scenes. Life Correlation Matrix proprietary. Marketing-facing only.
19. [x] **9.1 Social features** — Individual first, social as enhancement. Chat rooms, no follow/friend system V1.
20. [x] **9.2 Leaderboard** — Reframed: measures consistency/discipline, not domain vs domain.
21. [x] **10.1 Streaks** — Prominent, feeds into RPG gamification.
22. [x] **10.2 Achievement system** — Full RPG gamification confirmed. WoW/Habitica-inspired. Premium, not cartoonish.
23. [x] **15.1 AI transparency** — Selective: show data inputs, protect algorithms.
24. [x] **15.2 Data export** — No export V1. Reverse engineering risk.
25. [x] **16.1 Blogs** — No in-app blogs V1. Website/landing page only.
26. [x] **16.2 Webinars** — Cut entirely for V1.
27. [x] **17 Screen priority** — Onboarding → SIA → Home/Today → Goals.
28. [x] **12.3 SIA chat animation** — Polished (corrected with 2.6 avatar fix).

### Resolved in V4 final review:

29. [x] **1.3 Emotional arc** — Merged: carousel for visual hook, SIA's first interaction for emotional "it gets me" moment
30. [x] **1.4 User persona** — 18-45 market scope + Amira/Khalid design anchors + "Mother Test" simplicity gate
31. [x] **3.5 Assessment depth** — Moderate for everyone (2-3 follow-ups per goal), deeper assessment offered after ~1 week
32. [x] **4.3 Pin system** — Deferred for V1. Simple "favorites" in Me tab if needed post-launch
33. [x] **9.4 Accountability** — Both AI + social from V1. SIA default, friend notifications + group accountability available
34. [x] **13.1 Platform** — Mobile is design scope. Desktop is separate engineering concern
35. [x] **13.2 Mobile vs desktop features** — All features designed for mobile. Desktop is Salman's separate scope
36. [x] **2.6 Avatar fallback** — 3D target, polished 2D fallback if technically infeasible
37. [x] **10.2 RPG V1 scope** — V1: XP + levels + quests + domain skill levels. V2: skill trees, HP loss, financial stakes, party quests
38. [x] **18.3 Visible surface budget** — Each screen needs measurable cap on tappable elements to enforce simplicity

### Intentionally deferred (not blocking design):

39. [~] **11.1 Free tier** — Non-AI features free, AI is paywall. Exact boundaries TBD after screens designed.
40. [~] **18.0 Gamification + correlations** — RPG confirmed. Cross-domain correlations will be part of quests. Mechanics TBD.

---

## 19. Gaps & Deferred Decisions

*Added in V4 final review. These gaps were identified during the finalization pass and resolved with brief decisions to unblock design.*

| Gap | Decision |
|-----|----------|
| **Offline experience** | Record data offline, no analysis. SIA requires connectivity. Non-AI features (journaling, finance logging) work offline and sync when back online. It is what it is. |
| **Cold-start correlations** | Correlations develop over time. Onboarding and early UX should set expectations so the user understands what they'll get as data builds. SIA provides value from Day 1 through coaching and planning, not just correlations. |
| **Dark mode hex values (12.1)** | Brand guidelines are authoritative. Use `#0A0A0F` (ink-900) as base, `#211008` (ink-brown-800) for elevated surfaces. Codebase values (`#080C10` etc.) are superseded by brand spec. |
| **Multi-language / localization** | English only. International product, single language for V1. No RTL or localization considerations needed for design. |
| **Accessibility** | Follow best practices. WCAG contrast ratios for domain colors on dark backgrounds. Standard screen reader support. Dynamic type where feasible. |
| **Error & empty states** | Design principle: user should never feel bored or stuck. Empty states should feel alive — SIA suggestions, sample content, motivational prompts. Error states should be graceful with clear recovery paths. |
| **Pricing validation** | Tiered pricing model confirmed (Free / Plus $20 / Pro $60 / Max $100-200). Different tiers serve different user segments. Paywall UX should demonstrate value before asking for payment. |

---

## Final Status

**All 38 questionnaire items are resolved.** 2 items (11.1 free tier boundaries, 18.0 gamification+correlations mechanics) are intentionally deferred — they require designed screens before final decisions can be made.

**This document is ready for design handoff.**
