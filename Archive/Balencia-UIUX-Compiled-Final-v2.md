# Balencia UI/UX Vision — Compiled Final Questionnaire (V2)

> **V2 Updated**: May 19, 2026 — Based on Lahore 28 alignment meeting (Hamza + Salman)
>
> **Compiled from**: Hamza's answers + Salman's answers (May 2026)
>
> **Status Legend**:
> - **ALIGNED** — Both agree. Merged into one final answer.
> - **REVIEW** — Different emphasis or minor gaps. Needs alignment call.
> - **CONTRADICTING** — Opposite positions. Must be resolved before design begins.
>
> **How to use**: Go through each REVIEW and CONTRADICTING item together. Pick a final position and change the status to FINAL.
>
> **V2 Changelog**:
> - 6 CONTRADICTING items resolved → ALIGNED (1.5, 2.6, 3.3, 3.4, 3.6, 6.2)
> - 5 REVIEW items resolved → ALIGNED (2.1, 3.2, 4.1, 5.2, 5.5)
> - 2 ALIGNED items confirmed (2.2/2.3 chat screen)
> - 1 CONTRADICTING item moved to REVIEW with deferral note (6.5)
> - 8 new ideas added from meeting discussion
> - Remaining 7 CONTRADICTING + 11 REVIEW items unchanged (not reached in Lahore 28 meeting)

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

**Status: REVIEW** — Same direction, different emphasis

**Hamza's arc**: Recognition/Relatability (0-60s) → Motivation/Hope (1-3 min) → Excitement/Anticipation (3-5 min)
- Emphasizes **TikTok-style relatability** — "what I'm thinking in my heart, he's saying it"
- References **Islamic motivational content** as inspiration for the kind of fire Balencia should ignite
- Wants a **30-second video** (relates to 3.4)

**Salman's arc**: "This feels different" (0-15s) → "It's talking to me" (15-45s) → "It gets me" (45s-2min) → "It's already working" (2-3:30) → "I want to come back" (3:30-5:00)
- More **screen-by-screen UX flow** detail
- Emphasizes **never show an empty state** — app should feel alive from minute 1
- Key principle: curiosity → warmth → momentum

**To resolve**: The emotional goals are aligned (relate → motivate → excite). The difference is execution — Hamza wants a heavier video/content opening, Salman wants a faster UX-driven flow. This connects to the 3.4 intro video question (now resolved as 5-10s carousel in Lahore 28 meeting).

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 1.4 Who is the primary user persona we're designing for?

**Status: REVIEW** — Different specificity level

**Hamza**: Age 18-45. Someone struggling who wants to improve but needs guidance. Has tried other apps (fitness trackers, habit apps, budgeting tools) but found them too narrow. Wants a coach, not another tool. Would leave if content with themselves (Balencia did its job) or if the app feels overwhelming.

**Salman**: "Amira, 28" — Muslim professional juggling career, marriage, fitness, faith. Not tech-forward. Downloaded because everything feels disconnected. Would leave if app feels like a chore or too "health-bro."
- **Secondary**: "Khalid, 35" — High-achiever with WHOOP, wants cross-domain intelligence. Would leave if AI gives generic advice.

**To resolve**: Hamza's definition is broader (18-45, universal). Salman's is more specific (named persona, specific attributes). Both are valid — Salman's persona is a design tool for making decisions (design for Amira, Khalid is the power user). Hamza's range sets the market scope. Consider: **Use Hamza's age range + Salman's named personas as design anchors.**

**New — "Mother Test" for simplicity**: Hamza introduced Mark Zuckerberg's "mother test" as a design criterion: if his mother cannot use the app, it's too complicated. AI is supposed to make things simpler — Balencia must pass this test. This should serve as a guiding principle for all UI complexity decisions.

*Not reached in Lahore 28 meeting — pending future discussion on persona specificity.*

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

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was CONTRADICTING)*

**Decision**: **Simple animated icon/logo** for v1 chat interactions — pulses when thinking/speaking. Like Gemini's approach. For voice calls, icon expands with ambient motion — "like talking to an intelligence, not a cartoon person."

**3D avatar deferred**: May appear on the landing page for marketing/emotional impact, but will NOT be what users interact with during conversations for now. 3D is expensive, has uncanny valley risk, and dates quickly. Deferred as a future enhancement.

**Lahore 28 resolution**: Both agreed explicitly. Hamza acknowledged the practical concerns: "It should be simple like Gemini... the 3D avatar should exist on the landing page... but it should not be what we are speaking to for now."

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

**Lahore 28 resolution**: Hamza explicitly agreed to Salman's position. Key reasoning discussed: showing a subscription wall before the user has experienced the app's value discourages exploration. Users should get the free experience first, then encounter subscription options once they understand what Balencia offers. Integrations deferred to first week to reduce onboarding friction.

---

### 3.4 Should there be an intro video/animation from SIA?

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was CONTRADICTING)*

**Decision**: **5-10 second motion carousel** with skip/next buttons. Motion graphics (not pre-recorded video). Abstract, dark, premium aesthetic (Apple product reveal feel). Skippable.

**Lahore 28 resolution**: Both agreed explicitly. Hamza conceded: "Carousel. We're doing 5 to 10 seconds. We're not doing 30 seconds pre-recorded. We're doing 5 to 10 seconds motion sequence. And there would be like skip, next. Carousel." The "wow" moment should come from the AI experience itself (first cross-domain insight from SIA), not from an intro video.

---

### 3.5 The AI assessment conversation — how deep does it go?

**Status: REVIEW**

**Hamza**: **D) Depends on motivation tier** — low gets fast start, high gets deeper conversation. Adaptive depth.

**Salman**: **B) 2-3 follow-up questions per goal** — sweet spot of personal + fast. Deep assessment offered after 1 week.

**To resolve**: Salman's approach is simpler to implement (fixed moderate depth). Hamza's adds personalization at the cost of needing to determine tier before the assessment (chicken-and-egg). Consider: **Start with B (moderate for everyone), let SIA offer deeper assessment later** — which is effectively what both want.

*Not reached in Lahore 28 meeting — pending future discussion.*

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

**Status: REVIEW**

**Hamza**: Yes, **Notion-style** pin system. Multiple pins allowed (no strict cap). Pins appear as quick-access shortcuts within mobile navigation.

**Salman**: Yes, but **desktop only**. Mobile bottom nav is fixed — no pins. Max 5 pins to prevent sidebar creep.

**To resolve**: Hamza wants pins on mobile; Salman restricts to desktop. Given the mobile-focused direction, pins on mobile need a design solution that doesn't clutter the nav.

**Lahore 28 note**: Briefly discussed. Hamza said "Let's remove desktop. That's our mobile app." The pin system for desktop was dismissed, but no alternative for mobile quick-access was decided.

*Not reached in Lahore 28 meeting — pending future discussion.*

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

*Not reached in Lahore 28 meeting — pending future discussion.*

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

**Status: ALIGNED** *(Resolved in Lahore 28 meeting — was CONTRADICTING)*

**Decision**: **AI-first applies equally to ALL domains.** Same pattern everywhere: AI suggests → user reviews → accepts/edits/skips → AI learns. No domain is exempt. SIA is the coach across the board.

The graduated 80/50/20 ratios (AI-heavy for workouts, balanced for budget, user-heavy for spirituality) were explicitly rejected.

**Lahore 28 resolution**: Hamza argued: "I think everything should be AI-first. The whole idea is these are eight domains... they can be as many domains as they want." When Salman's graduated ratios were read aloud, Hamza responded: "So what is this? 80, 50, 20. This is the suggestion. Okay, failed. Let's go." Salman did not push back.

**Important nuance**: AI-first doesn't mean AI-prescriptive for personal domains. The AI approach for "Here's your workout" vs "Let's pray together" will naturally differ in tone and sensitivity, but the AI-first interaction pattern remains consistent. User controls domain ratios/weightings.

---

### 6.3 Per-domain design intent

**Status: REVIEW** *(Changed from CONTRADICTING — connects to 6.5 which was deferred)*

**Hamza**: **ALL domains get Full depth.** Every domain receives full feature treatment because the features are already built. The redesign is about making them feel cohesive, not cutting scope. Finance = full Mint/YNAB level. Career, Relationships, Creativity = all Full.

**Salman**: **Varying depth**:
- Full: Fitness, Nutrition, Mental Health/Wellbeing
- Moderate: Spirituality, Finance
- Light: Career, Relationships, Learning
- Later: Creativity

**See 6.5 for full discussion.**

---

### 6.4 Custom life domains — how does a user add one?

**Status: ALIGNED**

Both chose **C) User just sets a goal — the AI figures out which domain it belongs to.** No explicit domain creation. SIA maps goals to domains automatically.

---

### 6.5 Which domains are v1 priority vs later?

**Status: REVIEW** *(Changed from CONTRADICTING — discussed but explicitly deferred in Lahore 28 meeting)*

**Hamza**: **ALL domains Full at v1.** Argument: "The features have already been built across all domains (220+ services, 60+ pages). The redesign is about improving the UI/UX for what already exists, not about cutting features."

**Salman**: **Prioritized depth**:
| Domain | Priority |
|--------|----------|
| Fitness | Full |
| Nutrition | Full |
| Mental Health | Full |
| Spirituality | Moderate |
| Finance | Moderate |
| Career | Light |
| Relationships | Light |
| Learning | Light |
| Creativity | Later |

**Why this matters**: This is a **scope and timeline question**. Hamza's position is that existing backend = full UI depth for all. Salman's position is that a redesign prioritized by user impact ships faster and better. Redesigning 9 full domain UIs simultaneously is a massive design undertaking. Prioritizing means the highest-impact domains get the most design attention first.

**Consider**: Backend features existing doesn't mean UI/UX effort is equal — some domains may need more design innovation than others. A phased approach could ship the 3 core domains beautifully, then roll out the rest.

**Lahore 28 update**: Discussed but explicitly deferred. The meeting leaned toward all domains at V1 with fitness, nutrition, and mental health getting priority design attention, but ended with: "We will review it later. Later? I will refresh my mind. Okay, let's pause." This needs a follow-up decision before design begins.

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

**Status: CONTRADICTING**

**Hamza**: **A) Full finance dashboard (Mint/YNAB level)** — Transaction tracking, budgets, savings goals, receipt scanning, analytics. Connected to life-system intelligence. "It's Mint, but with life-system intelligence layered on top."

**Salman**: **B) Goal-oriented finance tracking** — Savings goals, spending patterns tied to life goals, but NOT full budgeting. "Balencia is a life coach, not a finance app. Full budgeting is a massive product in itself."

**Why this matters**: Full finance dashboard (A) is a significant product scope. It competes with dedicated finance apps. Goal-oriented (B) keeps Balencia focused on coaching. The cross-domain insight ("Your spending spikes when you're stressed") works with both approaches — it doesn't require full transaction management.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 6.9 Spirituality & religion — how explicitly religious vs spiritual?

**Status: REVIEW**

**Hamza**: **D) Let the AI handle it** — no rigid religion-specific UI. User states goals, SIA adapts. "I want to be a better Muslim" → SIA generates prayer tracking, Quran goals. "I want daily meditation" → SIA generates mindfulness routines. Keeps Balencia inclusive.

**Salman**: **C) Start with Islamic features as primary**, expand later. Primary persona is Muslim. Build genuinely good Islamic features first (prayer times, Quran, fasting, Ramadan). Backend designed to be faith-extensible.

**To resolve**: Hamza wants faith-agnostic UI that adapts. Salman wants Islamic-first with extension. The backend can support both — the question is whether the UI has Islamic-specific screens/features or a generic "spiritual practice" framework that SIA fills contextually.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 6.10 What existing features should be REMOVED from the app?

**Status: CONTRADICTING**

**Hamza**: **No features are being cut.** All are functional. The redesign is about presentation, not removal. Progressive disclosure + SIA as navigator. "The UI/UX flow may need to change, but features remain intact."

**Salman**: **Cut some, deprioritize others**:
- Cut: HIPAA page, Careers page, Blogs (in-app), Webinars (in-app)
- Deprioritize: Knowledge Graph, Competitions, Leaderboard, Soundscapes, Yoga Library, Vision Board
- Simplify: Quick Notes (merge into Journal), Voice Calls (into SIA), Money Map (goal-oriented)

**Why this matters**: Salman argues cutting reduces cognitive load and focuses design energy. Hamza argues nothing should be lost. Consider: "Not removing" and "not showing" can coexist via progressive disclosure — features exist but aren't prominently surfaced. But design effort must still be allocated to every feature that's accessible.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

## 7. Goals & Plans System

### 7.1 Goal decomposition — how much does the user see?

**Status: ALIGNED**

Both: **Summary with expandable detail.** Default shows "7 actions across 3 life areas" → tap to see full breakdown. Full decomposition available for those who want it. Casual users see today's actions only.

---

### 7.2 What do life goal cards look like?

**Status: REVIEW**

**Hamza**: **Minimal** — Progress ring/bar as the primary/essential element. Everything else is contextual. Clean and scannable (Bevel-inspired).

**Salman**: **4 essential elements**:
1. Progress ring/bar
2. Connected domain colors/icons (the differentiator)
3. Next action due (tappable)
4. AI coaching note ("Strong momentum this week!")

**To resolve**: Hamza wants leaner cards. Salman wants richer cards with domain colors and AI notes as mandatory. Consider: Domain colors on goal cards are what makes Balencia feel like a life system (not just a task list). Without them, goal cards look like any other app.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 7.3 Motivation tiers — how do they manifest in the UI?

**Status: CONTRADICTING**

**Hamza**: **D) User chooses view density independently of motivation tier.** Tier affects SIA's tone and suggestions, but UI density is user-controlled. "Some high-motivation users prefer clean; some low-motivation want to see everything."

**Salman**: **C) Subtle — same layout, content density adapts automatically.** Number of action cards, data depth, SIA's tone, and gamification intensity all change with tier. Users shouldn't feel like they're using a "lesser" version.

**To resolve**: Automatic (Salman) vs user-controlled (Hamza). Consider: Start with automatic tier-based defaults (Salman's approach) with a user override option in settings (Hamza's desire). Best of both.

*Not reached in Lahore 28 meeting — pending future discussion.*

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

**Status: REVIEW**

**Hamza**: **Hybrid with a vision** — Some visual representation visible to users. Envisions **"Balencia City"** — each domain is a "room" that users zoom into for analytics. 3D exploration inspired by Blender. However, deferred until foundational design is established. Mobile constraint: 3D assets under ~500KB.

**Salman**: **C) Power-user feature in Explore.** Available for those who want it, not promoted. Most users experience the graph through SIA's insights, not the visualization. "Visually complex — most users won't understand or use an interactive graph."

**To resolve**: Both agree it shouldn't be the default experience. Hamza has a bigger long-term vision (Balencia City) that's explicitly deferred. For v1, align on Salman's approach (power-user feature in Explore) with Hamza's Balencia City as a future roadmap item.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 8.2 Personal Wiki — visible to the user?

**Status: ALIGNED**

Both: **Yes, visible and editable.** Users can browse what SIA knows about them, edit/correct information, and feel confident the AI is grounded in accurate data. Hamza references Bevel's knowledge base as inspiration. Salman recommends a simplified "What SIA knows about me" view with delete and "This is wrong" buttons.

---

### 8.3 Cross-domain insights — how are they delivered?

**Status: ALIGNED**

Both chose **E) All channels** — SIA conversation, home screen cards, weekly digest, dedicated insights page, proactive notifications. Urgency and context determine the channel.

---

### 8.4 Memory transparency — should users see what SIA remembers?

**Status: ALIGNED**

Both: **Full access.** Users can view, edit, delete memories. Builds trust. Aligns with Personal Wiki being visible (8.2).

---

## 9. Social & Community

### 9.1 How prominent should social features be?

**Status: REVIEW**

**Hamza**: **Mix of A and B** — Individual-first (solo coaching is complete), social as enhancement (challenges, accountability, family groups available), not forced. Social features accessible but not in your face.

**Salman**: **C) Minimal for v1** — Basic accountability partner system. No feed, no public profiles, no content creation. Community as v2 feature once core loop is proven.

**To resolve**: Hamza wants social **available** (A/B), Salman wants social **minimal** (C). Hamza's approach keeps social features accessible but optional. Salman's approach defers most social work. The question is design/dev resource allocation.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 9.2 Leaderboard — motivating or anxiety-inducing?

**Status: CONTRADICTING**

**Hamza**: **A) Keep and make prominent.** Duolingo-style competition drives engagement. Integrated with RPG gamification system — position tied to XP, quests, overall life progression.

**Salman**: **D) Remove for v1.** "What does 'winning' even mean across multiple life domains? A leaderboard that ranks sleep vs. prayer vs. finance is nonsensical and potentially harmful."

**Why this matters**: This reflects a fundamental tension between gamification-heavy (Hamza) and coaching-focused (Salman) approaches. Leaderboard prominence affects whether the app feels like a game or a coach.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 9.3 Competitions & shared challenges — keep for v1?

**Status: ALIGNED**

Both chose **C) Deprioritize** — Build after core AI coach experience is solid.

---

### 9.4 Accountability — AI-driven or social?

**Status: REVIEW**

**Hamza**: **C) Both** — SIA as default, with option to add human accountability partners now.

**Salman**: **A) AI-driven for v1**, social accountability as v2.

**To resolve**: Both want SIA as primary. Hamza wants human partners from day one; Salman defers to v2.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

## 10. Gamification & Motivation

### 10.1 How prominent are streaks?

**Status: REVIEW**

**Hamza**: **Duolingo-prominent** — visible, meaningful, with consequences for breaking. Also per-goal streaks (prayer, workout, journaling). Each feeds into the broader gamification system.

**Salman**: **B) Present but not central** — Visible on home screen, celebrated at milestones, but not THE motivation. Per-domain streaks available in dashboards. "Balencia sees what you can't see" is the value proposition, not "maintain your streak."

**To resolve**: Hamza wants streaks front and center (Habitica/Duolingo direction). Salman wants them present but secondary to AI intelligence (Oura/Calm direction). This connects to the 1.5 app inspiration question.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 10.2 Achievement system — how does it work across all life domains?

**Status: CONTRADICTING**

**Hamza**: **Full RPG gamification system** (WoW/Habitica-inspired):
- Goals become missions/quests
- Users level up with XP
- Each domain is a skill tree (Fitness Level 12, Finance Level 8)
- Cross-domain = epic quests
- Party system, equipment/rewards, narrative framing
- Meaningful consequences (HP loss for missed tasks)
- Must feel **premium and mature**, not cartoonish

**Salman**: **Standard achievement system** — Cross-domain achievements ("Life Connector: Connected 3+ areas this week") + domain-specific ("30-day prayer streak"). Cross-domain achievements celebrated more. No RPG framework.

**Why this matters**: This is the biggest design direction divergence. The RPG system is a fundamental product identity decision — it affects every screen, every interaction, every celebration. It's either central to Balencia's identity or absent.

**Key question Hamza raised himself**: "How do you make RPG gamification engaging without it feeling childish, gimmicky, or visually ugly?" This is the critical design tension.

**Lahore 28 note**: Discussed extensively but not decided. Salman was intrigued by Habitica after seeing it. Hamza described a settings-based opt-in approach — RPG aesthetics appear only if the user enables it in settings, not forced on everyone. The concept of "you are the main character in this world, improve your character by achieving your goals" resonated. But no formal decision was made before the meeting ended.

**New — Call of Duty profile analogy**: Hamza described a user stats card similar to Call of Duty gaming profiles — showing health, XP, level, domain stats. Users would have a visible profile card reflecting their life progression. This could integrate with the RPG system if approved.

*Not reached in Lahore 28 meeting — pending future discussion.*

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

**Status: REVIEW**

**Hamza**: **Restrictive free tier** — Basic dashboard, limited goals (1-2 domains), basic features WITHOUT AI enhancement. No or very limited SIA. No cross-domain insights. "Don't make it loss-making."

**Salman**: **More generous free tier** — 10 messages/day with SIA, full home/today screen, 2 life domains, basic journal/mood/habits, 1 cross-domain insight per week. Goal: deliver one "holy shit" moment per week to drive upgrades.

**To resolve**: Hamza prioritizes unit economics (minimize free AI costs). Salman prioritizes conversion (prove value to drive upgrades). The "1 insight per week" approach (Salman) is a proven freemium tactic — give users a taste of the premium experience.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 11.2 Subscription model — tiered plans or modular?

**Status: ALIGNED**

Both chose **A) Pre-built tiers** (Basic/Free, Pro, Premium). Simple, clear. Both argue against modular pricing — it undermines the cross-domain value proposition and creates decision paralysis.

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

**Status: ALIGNED** (minor difference on SIA chat)

| Area | Hamza | Salman |
|------|-------|--------|
| Landing page | Cinematic | Cinematic |
| Onboarding | Polished | Polished |
| Home/Dashboard | Polished | Polished |
| SIA chat | **Polished** | **Minimal** |
| Feature screens | Minimal-Polished | Minimal |
| Settings/Profile | Minimal | Minimal |
| Celebrations | Cinematic | Cinematic |

**Minor difference**: Hamza wants SIA chat at Polished (avatar reactive animations, 200-300ms). Salman wants Minimal (fast and responsive, no flashy animations). This connects to the 2.6 avatar question — since the avatar is now a simple animated icon (resolved in Lahore 28), chat animations should lean toward Minimal/functional.

**Hamza adds**: Specific motion timing guidelines from brand — `--ease-flow` (cubic-bezier), durations from 160ms to 1.2s for different contexts.

*Not reached in Lahore 28 meeting — pending future discussion on SIA chat animation level.*

---

### 12.4 The continuous stroke line — where does it appear?

**Status: ALIGNED**

Both: Onboarding, hero sections, transitions, achievement celebrations, domain transitions. NOT on data-heavy screens. The line is the visual metaphor for "connecting what you can't see" — used where that metaphor matters.

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

**Status: CONTRADICTING**

**Hamza**: **Mobile app only.** No desktop. The entire redesign is mobile-first, mobile-only.

**Salman**: **D) Mobile-first + desktop experience.** Mobile is primary (SIA voice-centric), desktop takes advantage of screen real estate (side panels, dashboards, knowledge graph).

**Why this matters**: This changes project scope significantly. Mobile-only means one design system. Mobile + desktop means responsive design across breakpoints. Desktop features like Knowledge Graph visualization, side-by-side SIA chat + context panels, and admin panel need desktop.

**New — Desktop as separate concern**: In the Lahore 28 meeting, Hamza stated: "You can do whatever you want for desktop. Apart from that, that's on you." This creates a de facto split: mobile is the primary product (the design focus), while desktop is Salman's separate operational/engineering concern. Desktop features mentioned include the N8N scheduler, WhatsApp integration, and detailed analytics — but these are not part of the core mobile product design.

*Not reached in Lahore 28 meeting — pending future discussion for formal resolution.*

---

### 13.2 Are there features that are mobile-only or desktop-only?

**Status: CONTRADICTING** (flows from 13.1)

**Hamza**: Mobile only. All features designed for mobile. No desktop considerations.

**Salman**: Lists mobile-optimized features (voice mode, camera, push notifications) and desktop-optimized features (Knowledge Graph, admin panel, detailed analytics, side-by-side panels).

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 13.3 Should the mobile experience feel like a native app?

**Status: ALIGNED**

Both: **Yes.** Bottom tab bar, swipe gestures, pull-to-refresh, smooth transitions, haptic-style feedback. User shouldn't be able to tell it's not native.

---

## 14. Notifications & Engagement

### 14.1 What are the top 3 notification types?

**Status: ALIGNED**

Both agree:
1. **SIA proactive AI insights/suggestions** — the core value
2. **Reminders / Streak alerts** — keeping users on track
3. **Daily check-in / engagement prompts** — daily return habit

---

### 14.2 Push vs in-app balance?

**Status: ALIGNED**

Both: **Adapted by motivation tier** with user override capability. Low = 1/day max. Medium = 2-3/day. High = up to 5+/day.

---

### 14.3 Proactive AI timing — does it adapt?

**Status: ALIGNED**

Both: **Yes.** Frequency and timing adapt by motivation tier and engagement patterns. Infrastructure already built (8 cycles/day, 4 messages/day cap, timezone-aware).

---

## 15. Data, Privacy & Transparency

### 15.1 How transparent should AI data usage be?

**Status: REVIEW**

**Hamza**: **Selective transparency.** Users see what data is collected and what SIA knows (via Personal Wiki). But the **proprietary correlation algorithms are protected** — the "how" behind connections is Balencia's IP.

**Salman**: **Full transparency per insight** — "Show me the data" expandable on every SIA insight showing data sources, time period, and confidence level.

**To resolve**: Salman's approach builds maximum trust but may expose methodology. Hamza's protects IP but could feel less transparent. Consider: Show the **data inputs** (sources, time range) without revealing the **algorithm** (correlation weights, rules). Both goals met.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 15.2 Data export — is this a feature?

**Status: CONTRADICTING**

**Hamza**: **No, not for v1.** Users interact with data through the app. Not prioritized.

**Salman**: **Yes, essential.** Required for GDPR compliance (if targeting EU users). Trust signal. User expectation in 2026.

**Consider**: If targeting EU users at any point, GDPR makes data export legally required, not optional. Even without GDPR, data portability builds trust. This may be a compliance question, not a product question.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 15.3 Integration data — how is it presented?

**Status: ALIGNED**

Both: **Connected Services dashboard** in settings showing all integrations with status, sync info, and connect/disconnect controls. Integration data silently woven into SIA's understanding.

---

## 16. Content & Education

### 16.1 Blogs and articles — part of the app or separate?

**Status: CONTRADICTING**

**Hamza**: **Part of the app.** SIA recommends relevant articles. Also serves SEO. Content feels integrated into coaching.

**Salman**: **Separate — marketing site only.** Blog serves SEO and acquisition. SIA can link to articles in conversation, but no in-app blog section.

**To resolve**: Hamza wants blogs in-app for content delivery. Salman wants blogs external for focus. Consider: SIA linking to relevant content (Salman's approach) can work whether blogs are in-app or external. The question is whether there's a browsable blog section inside the app.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 16.2 Webinars — live or on-demand?

**Status: REVIEW**

**Hamza**: **Recorded libraries** — on-demand content accessible any time. Recommended by SIA contextually.

**Salman**: **Cut for v1** entirely. Webinars are operational overhead that doesn't align with AI-first coaching. If they return, recorded only.

**To resolve**: Both oppose live webinars. Hamza wants recorded library accessible; Salman wants to defer entirely. Question: Is there existing recorded content worth surfacing, or would this require new content creation?

*Not reached in Lahore 28 meeting — pending future discussion.*

---

### 16.3 Help center — standalone or SIA-powered?

**Status: ALIGNED**

Both chose **C) Both** — Traditional help page with FAQ + SIA-powered help in conversation. Ensures users get help however they prefer.

---

## 17. Screen Priority Ranking

**Status: REVIEW** — Different ordering

| Screen Group | Hamza | Salman |
|---|---|---|
| Landing page | **1** | 5 |
| Onboarding flow | 2 | **1** |
| Home / Today | 3 | 3 |
| AI Coach (SIA) | 4 | **2** |
| Goals & Plans | 5 | 4 |
| Life Areas overview | 6 | 6 |
| Explore page | **7** | 12 |
| Fitness & Workouts | 8 | 9 |
| Nutrition | 9 | 10 |
| Wellbeing hub | 10 | 7 |
| Finance / Money Map | 11 | 15 |
| Spirituality | 12 | 14 |
| Schedule & Calendar | 13 | 13 |
| Profile & Settings | 14 | 8 |
| Subscription & Billing | 15 | 11 |
| Learning | 16 | 19 |
| Creativity | 17 | 20 |
| Knowledge Graph | 18 | 18 |
| Community & Social | 19 | 17 |
| Admin panel | 20 | 16 |

**Key differences**:
- **Landing page**: Hamza ranks #1, Salman ranks #5. Hamza prioritizes public first impression; Salman prioritizes the user journey (onboarding + SIA first).
- **Onboarding + SIA**: Salman ranks both in top 2; Hamza ranks them 2 and 4.
- **Explore page**: Hamza ranks #7; Salman ranks #12.
- **Profile & Settings**: Salman ranks #8 (user management important); Hamza ranks #14.

**To resolve**: The question is whether to start with the **public-facing** experience (Landing → Onboarding → Home) or the **core product** experience (Onboarding → SIA → Home). Both approaches are valid — it depends on whether the immediate priority is user acquisition or user retention.

*Not reached in Lahore 28 meeting — pending future discussion.*

---

## 18. Open Questions & Wild Card

### 18.0 How does gamification interact with the Life Correlation system?

**Status: OPEN** (Hamza only — Salman did not address)

Unresolved: How do the RPG gamification system and the Life Correlation system connect? Could correlations unlock epic quests? Could quest completion grant bonus XP in correlated domains? This needs dedicated design exploration — but only if the RPG direction is confirmed (see 10.2).

### 18.1 Pioneer experience

**Status: ALIGNED**

Both: Cross-life-domain causal intelligence. No app connects fitness + finance + faith + career + relationships and reveals patterns across all of them. This is the "holy shit" moment.

### 18.2 What to keep from current app

**Status: ALIGNED**

Both: The AI intelligence backend — memory engine, cross-pillar intelligence, proactive messaging, knowledge graph. The UI changes; the backend is the moat.

### 18.3 What must change

**Status: ALIGNED**

Both: Simplicity. Reduce the 30+ sidebar items, 10+ wellbeing sub-modules, 2 AI chat entry points. Reduce visible surface area dramatically while keeping 100% capability through progressive disclosure and SIA.

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

### Resolved in Lahore 28 meeting (now ALIGNED):

1. [x] **1.5 Design inspiration apps** — Bevel + Habitica + ChatGPT primary, Salman's picks supplementary
2. [x] **2.6 SIA avatar** — Simple animated icon for v1, 3D deferred
3. [x] **3.3 Required onboarding info** — Name, life areas of interest, primary life goals only
4. [x] **3.4 Intro video** — 5-10 second motion carousel with skip/next
5. [x] **6.2 AI control by domain** — AI-first for all domains equally
6. [x] **2.1 SIA personality/tone** — Adaptive based on motivation detection
7. [x] **3.2 Onboarding style** — Hybrid: chatbot + visual guidance above
8. [x] **3.6 "Try it" user** — Guest mode with dummy data + minimum onboarding for coaching
9. [x] **4.1 Bottom nav** — 4 items (Today, SIA, Goals, Me)
10. [x] **5.2 Home screen items** — Both lists merged with inline cards
11. [x] **5.5 Cross-domain on home** — Domain tags baseline + insight card at high confidence

### Must resolve before design starts (CONTRADICTING items — not reached in meeting):

12. [ ] **6.8 Finance depth** — Full Mint/YNAB vs goal-oriented tracking
13. [ ] **6.10 Features to remove** — Cut nothing vs cut/deprioritize several
14. [ ] **9.2 Leaderboard** — Prominent vs removed for v1
15. [ ] **10.2 Achievement/gamification system** — Full RPG vs standard achievements
16. [ ] **13.1 Platform** — Mobile-only vs mobile + desktop
17. [ ] **15.2 Data export** — No vs yes (GDPR implications)
18. [ ] **16.1 Blogs** — In-app vs marketing site only

### Should align on (REVIEW items — not reached in meeting):

19. [ ] **1.3 Emotional arc** — TikTok-style relatability opening vs UX-driven flow
20. [ ] **1.4 User persona** — Broad (18-45) vs specific named personas
21. [ ] **3.5 Assessment depth** — Fixed moderate vs tier-adaptive
22. [ ] **6.5 Domain depth at v1** — All Full vs prioritized (discussed, deferred)
23. [ ] **6.9 Spirituality approach** — AI-adaptive vs Islamic-first
24. [ ] **7.2 Goal card elements** — Minimal (just progress) vs rich (4 elements)
25. [ ] **7.3 Motivation tier in UI** — User-controlled vs automatic
26. [ ] **9.1 Social prominence** — Available (A/B) vs minimal (C)
27. [ ] **10.1 Streak prominence** — Duolingo-prominent vs present-but-not-central
28. [ ] **11.1 Free tier generosity** — Restrictive vs generous (10 msgs/day + 1 insight/week)
29. [ ] **12.3 SIA chat animation** — Polished vs minimal (now leaning minimal given simple avatar decision)
30. [ ] **15.1 AI transparency** — Selective (protect IP) vs full per-insight
31. [ ] **17 Screen priority** — Landing page first vs onboarding first
