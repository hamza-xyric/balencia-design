# Balencia UI/UX Vision Questionnaire

> **Purpose**: Capture every design decision before a single screen gets built. Your answers here become the source of truth for the entire UI/UX revamp.
>
> **How to use**: Answer each question inline below the `**Answer:**` marker. If a decision is final and locked, change the status to `FINAL`. If you're unsure, mark it `OPEN` and we'll revisit. Add any notes, sketches, or references you want.
>
> **Framing**: Balencia is an **AI Life Coach** — not a health app, not a fitness tracker. It connects every part of a user's life system (career, relationships, spirituality, finance, fitness, creativity, learning) and reveals the connections they can't see themselves. Every question below is written from that perspective.
>
> **Context sources referenced**:
> - Direction Reset (2026-03-12) — team decisions on Life Coach identity, AI-first UX, motivation tiers
> - Old UI/UX meeting (2026-04-23 with Salman) — preliminary design decisions, NOT binding
> - Current codebase — 8 life domains, 60+ pages, 220+ services, deep cross-domain AI intelligence

---

## 1. Core Philosophy & Identity

### 1.1 What is the single sentence that describes what Balencia IS?

> *Direction Reset: "If you are striving to improve yourself then Balencia is for you." Identity: Life Coach, not Health Coach.*
> *Your phrase: "Balencia sees what we can't see. Balencia connects different parts of your life system together."*

Refine this into the one sentence a user should feel when they open the app.

**Answer:** `FINAL`

Balencia is your clarity and your guide. If you are struggling with discipline, productivity, structure — or need motivation, a push, reminders, or validation in any aspect of life — Balencia is there to help you achieve your goals by working alongside you every step of the way. The core principle: **"Balencia sees what we can't see. Balencia connects different parts of your life system together."** It operates across all life domains — Fitness, Faith, Finance, Career, Relationships, Learning, Creativity, and beyond — not as isolated modules, but as one interconnected system. The user should feel that Balencia understands them holistically in a way no single-purpose app ever could.

### 1.2 "Balencia sees what we can't see" — what does this mean concretely in the UI?

This is a powerful positioning statement. But what does the user actually SEE that makes them feel this? Examples to consider:
- SIA says "I noticed your spending goes up on days you skip exercise — want to explore that?"
- A visual thread connecting your sleep data to your work productivity goal
- A weekly insight card: "3 things connected in your life this week that you might not have noticed"
- The Knowledge Graph showing relationships between your habits, goals, and outcomes

How should the app make the invisible connections visible?

**Answer:** `FINAL`

Both dimensions are important — what SIA says conversationally and what the user can visually see:

1. **SIA's conversational insights** — SIA proactively surfaces cross-domain connections in natural language: *"I noticed your spending goes up on days you skip exercise"* or *"Your sleep dropped this week, and your productivity score followed — want to explore why?"* These moments should feel like having a coach who genuinely knows you.

2. **Visual intelligence layer** — The Knowledge Graph and Life Correlation Matrix show relationships between habits, goals, and outcomes visually. Users should be able to see how their life domains connect and influence each other — not as raw data, but as intuitive visual threads. This is powered by the proprietary Life Correlation system that dynamically maps how one domain affects the others.

3. **Interactive drill-down model** — The life correlation system should be explorable, not just passive. The specific interaction pattern: clicking on a life domain (e.g., "Sleep & Rest") shows its correlation and impact ratings across other domains (fitness, well-being, productivity, meditation, nutrition). From there, users can drill deeper into any specific cross-domain connection to understand the relationship. As Hamza described it: *"After going here, it shows that everything is connected."*

The key is that most of this intelligence feels like it's happening behind the scenes — SIA is always watching, always connecting dots — and the insights surface naturally, both in conversation and through visual representations like the Knowledge Graph and Balencia City.

**Commercial positioning**: This Life Correlation system is Balencia's proprietary differentiator — *"This becomes our marketing tool. The unique thing that we have. This is what we call the proprietary data."* It's not just a feature; it's the product's unique selling point and the center of the value proposition.

### 1.3 What is the emotional arc of a user's first 5 minutes?

Walk through it: they download the app, open it for the first time. What do they see, feel, and do — screen by screen. Think life system, not health assessment.

**Answer:** `FINAL`

The user should experience a journey from **recognition → motivation → excitement**:

1. **Recognition / Relatability (0–60 seconds)**: The first screens should create a relatable moment. Everyone is struggling — whether it's laziness, inability to focus, lack of motivation, poor discipline, or feeling scattered. The root causes are universal even if the specifics differ. The user should see something that makes them think *"This gets me. This understands what I'm going through."* — through relatable messaging, not clinical assessment language.

   **Content inspiration**: The gold standard for relatability is TikTok content creators whose content feels deeply personal despite being generic — the feeling of *"what I'm thinking in my heart, he's saying it."* Balencia's onboarding and attraction content should trigger that same "oh yes, I have this issue" recognition, followed by something relatable and engaging to capture them. The content should be short, personal, and feel like it was made specifically for you.

2. **Motivation / Hope (1–3 minutes)**: As the onboarding conversation with SIA begins, the user should start feeling that change is possible. SIA's warmth, the cross-domain approach (*"It's not just about working out — it's about how everything in your life connects"*), and the quick early wins create a sense of possibility. A brief cinematic intro (30 seconds, pre-recorded video) shows Balencia's cross-domain intelligence in action, giving the user a glimpse of what's ahead.

   **Motivation inspiration**: Islamic motivational content (stories of the Sahaba) serves as a reference for the kind of intense motivation Balencia should evoke — content that doesn't just inform but creates a fire inside the listener to act and improve.

3. **Excitement / Anticipation (3–5 minutes)**: By the time SIA generates their initial plan — connecting their stated goals across life domains, showing how the AI will work with them daily — the user should feel genuinely excited to start using Balencia. They should feel like they've just met a coach who truly understands them and has a real plan to help.

### 1.4 Who is the primary user persona we're designing for?

> *Direction Reset: Users range from "wanting to be a better Muslim" to "reduce screen time" to "improve marriage" to "get fit."*
> *Old meeting: Salman said "90% of users are non-technical, don't know what features exist."*

Describe your primary user in 2-3 sentences: age range, tech comfort, what's going on in their life, what brought them to Balencia, what would make them leave.

**Answer:** `FINAL`

**Age range**: 18–45 years old.

**Who they are**: Someone who is struggling and wants to improve but needs guidance. They know they should be doing better — whether it's in fitness, finances, relationships, career, or faith — but they lack the structure, discipline, and accountability to make it happen on their own. They have some tech experience but the app shouldn't feel overwhelming or add complexity to their life. It should simplify, not complicate.

**What brought them to Balencia**: The desire to self-improve. They've likely tried other apps (fitness trackers, habit apps, budgeting tools) but found them too narrow, too isolated, or too hard to maintain. They want a coach, not another tool.

**What would make them leave**: Being content with their current self — meaning Balencia has done its job. The other risk: if the app feels overwhelming, overly complex, or like it's just another obligation rather than a supportive guide.

Balencia is there to **coach them, guide them, put them on the right track, and keep them accountable**.

### 1.5 What are the 3 apps whose feel/vibe you want Balencia to channel?

Not copy — channel. The emotional quality, the polish level, the way they make you feel. Can be from any category.

**Answer:** `FINAL`

1. **Bevel** — For its simplicity and visual clarity. Bevel transforms complex health data into clean, actionable insights without cluttering the interface. Its AI coaching feels personal and conversational, grounded in real user data. The UI is warm, rounded, and approachable. This is the primary design reference for Balencia's visual simplicity.

2. **Habitica** — For its gamified approach to task management. Habitica proves that self-improvement becomes habit-forming when wrapped in RPG-style gameplay — XP, quests, character progression, party accountability. The core insight: meaningful consequences (HP loss for missed tasks) make completion feel genuinely important.

3. **ChatGPT** — For its conversational AI interface polish. The way it handles AI interaction — clean, focused, with rich inline content rendering — sets the standard for what a conversational AI experience should feel like.

### 1.6 How do you describe Balencia to someone in 10 seconds?

The elevator pitch. Not a feature list — the feeling and value proposition. This shapes every design decision.

**Answer:** `FINAL`

*"A coach in your pocket that guides you to a better life in all aspects — fitness, faith, finances, career, relationships — without overcomplicating anything, and giving you hidden insights about how it all connects."*

---

## 2. The AI Coach (SIA) Experience

### 2.1 What is SIA's personality in 3 adjectives?

> *Brand guidelines: grounded, curious, warm, playful, quietly confident.*
> *Direction Reset: Tone adapts by motivation tier — gentle for low, structured for medium, challenging for high.*

Is this still right? Does SIA have a distinct character beyond a generic AI assistant?

**Answer:** `FINAL`

SIA's personality is **adaptive, accountable, and empathetic** — but not monotone. Like a real coach, SIA's character should match the user's needs and the moment:

- **Accountable**: SIA calls things out when required. If the user is slacking, SIA doesn't sugarcoat it.
- **Kind**: When the user is struggling or going through a rough patch, SIA is warm and supportive.
- **Pushy**: When the user needs a push — to get out of bed, to start that workout, to stick to a budget — SIA pushes.
- **Adaptive**: The personality shifts based on who the user is, not just their motivation tier. Just as real coaches have different personalities depending on the person they're coaching, SIA reads the user and adjusts. It should never feel like the same generic tone for everyone.

The brand foundation (grounded, curious, warm, playful, quietly confident) still holds as the baseline, but SIA should feel like a real coach with range — not a monotone assistant.

### 2.2 What does the SIA chat screen look like?

Describe the ideal conversation interface:
- A) Full-screen chat like iMessage/WhatsApp — clean and focused
- B) Split view with a side panel showing relevant data (your goals, today's schedule, the metric SIA is referencing)
- C) Chat with rich inline cards — when SIA mentions your workout, a workout card appears in the conversation (like Perplexity or Claude artifacts)
- D) Something else

Should SIA be able to show charts, goal progress, meal plans, financial summaries directly in the conversation?

**Answer:** `FINAL`

**A mixture of A, B, and C** — the interface should be flexible and context-aware:

- **Primary mode**: Clean chat messages (like iMessage) as the foundation.
- **Rich inline content**: SIA should be able to pull up analyses, charts, goal progress, meal plans, and financial summaries directly within the conversation as inline cards — similar to how Perplexity or Claude renders artifacts within chat.
- **Sometimes text-only**: Simple insights or encouragement can be pure text inline.
- **Sometimes visual**: When SIA references data ("Your sleep this week..."), it should pull up a relevant chart or visualization right in the conversation.
- **Sometimes navigational**: SIA can redirect the user to another part of the app when a full-screen experience is needed ("Let me show you your workout plan" → navigates to the workout screen).

The key is that it should feel natural and fluid — the UI adapts to what SIA is communicating, not the other way around.

### 2.3 How does SIA connect life domains in conversation?

This is the core differentiator. When SIA says "Your sleep dropped 2 hours this week, and I see your stress at work spiked — your career goal and wellbeing are connected here" — how does this feel to the user?

- Does SIA proactively surface these connections, or only when asked?
- Should there be visual indicators (colored domain tags, connection lines) in the chat?
- How often should SIA make cross-domain observations? Every conversation, or only when significant?

**Answer:** `FINAL`

**Seamless and proactive.** The user should never feel like they're switching between separate modules — it's one life, one system.

- **Proactive, always**: SIA surfaces cross-domain connections automatically, without the user needing to ask. This is powered by the proprietary Life Correlation Matrix, which dynamically updates based on incoming data and insights.
- **Feels connected naturally**: Through insights, visuals (domain-colored tags in the conversation), and contextual references that tie goals together. When SIA says *"Your spending spiked this week — interestingly, that lines up with the days you skipped your morning routine"*, the user should feel like the domains were never separate in the first place.
- **Frequency**: Whenever meaningful connections are detected — not forced into every conversation, but never withheld when significant. Life correlation is the differentiator between Balencia and the many single-purpose apps that exist in silos.

### 2.4 How does SIA deep-link into features?

> *Old meeting Q2: Unresolved — "How does SIA deep-link into modules?"*

When SIA says "Here's your workout plan for today" or "Let's review your budget this week" — what happens?
- A) A rich card appears in chat, tapping it opens the relevant screen
- B) SIA navigates you to that screen directly
- C) SIA creates a task/action in your daily schedule
- D) All of the above depending on context

**Answer:** `FINAL`

**D) All of the above depending on context.** SIA is all-seeing and the differentiator between the many siloed apps that exist. The deep-linking behavior should be intelligent and contextual:

- A rich inline card for quick reference ("Here's your macro summary for today" → tappable card in chat)
- Direct navigation when the full feature experience is needed ("Let me open your workout plan" → navigates to workout screen)
- Task creation when it's about future action ("I've added 'Review budget' to your schedule for tonight")

SIA decides the most appropriate action based on the context of the conversation, the type of content, and the user's current state.

### 2.5 Voice interaction — how prominent?

> *Old meeting Q6: Salman uses voice daily with Gemini. Direction Reset mentions voice journaling as lower-friction input.*

- A) Prominent mic button on SIA screen + dedicated full-screen voice mode (like Gemini Live)
- B) Mic button available but voice is secondary to text
- C) Voice only for journaling and quick check-ins, not general conversation
- D) Voice-first: the primary way most users interact with SIA

**Answer:** `FINAL`

**A) Prominent mic button on SIA screen + dedicated full-screen voice mode.** Voice should be a first-class interaction mode — a prominent mic button on the SIA screen with a dedicated full-screen voice mode similar to Gemini Live. Users should be able to have a natural spoken conversation with SIA for coaching sessions, journaling, quick check-ins, and general queries. Voice reduces friction and makes SIA feel more like a real coach.

### 2.6 Should SIA have a visual avatar/face?

Current codebase has VRM avatar components (3D character).
- A) Yes, a 3D animated avatar that speaks and reacts
- B) A simple animated icon/logo that pulses when SIA is "thinking" or speaking
- C) No avatar — just conversation. SIA is a voice and text, not a face.
- D) Avatar for voice calls only, text chat has no avatar

**Answer:** `FINAL`

**A) Yes, a 3D animated avatar that speaks and reacts.** SIA should have a visual presence — a 3D animated avatar that responds and reacts during conversations. This creates a more personal, human-like coaching experience. The avatar should feel premium and polished (leveraging the existing VRM avatar system in the codebase), giving SIA a face and personality that builds trust and emotional connection with the user.

### 2.7 What's the difference between "AI Coach" and "Chat"?

Current app has both `/ai-coach` and `/chat`. Are these separate experiences? Or should they merge into one unified SIA conversation with different modes (coaching mode, casual chat, voice call)?

**Answer:** `FINAL`

**Merged together into one unified SIA experience.** There should be no distinction between "AI Coach" and "Chat" — they are the same thing. SIA is the coach, and the conversation is the coaching. Users interact with a single SIA interface that handles everything: coaching sessions, casual check-ins, voice calls, data queries, and life management. The same conversation thread, the same approach, the same SIA. Users can also converse with SIA through the merged interface at any time.

### 2.8 Proactive messages from SIA — where do they appear?

> *Direction Reset: AI-first means SIA initiates. 18 proactive message types already exist in the backend.*

When SIA wants to tell you something ("Your prayer streak is at 14 days!", "Time for your evening reflection", "I noticed a pattern between your exercise and mood") — where does it show up?
- A) As a push notification that opens SIA chat
- B) On the home screen as a card/banner
- C) Both — notification + home card
- D) In a separate "insights" feed

**Answer:** `FINAL`

**C) Both — notification + home card.** SIA should be as proactive as possible. Proactive messages appear as:

1. **Push notifications** that open the SIA chat when tapped — ensuring the user sees time-sensitive insights even when they're not in the app.
2. **Home screen cards/banners** — so when the user opens Balencia, SIA's latest observations and suggestions are front and center.

The goal is to make SIA feel alive and always working in the background — not waiting for the user to come to it, but reaching out when it has something valuable to say.

---

## 3. Onboarding & First Experience

### 3.1 How many screens should onboarding have?

> *Old meeting: Decided ~3 screens. Direction Reset: Registration → AI assessment (3-5 life questions) → AI suggests goals → AI generates plan → user customizes.*
> *Current app: 8-step flow.*

What are the mandatory steps before a user can start using Balencia? Think life system, not health form.

**Answer:** `FINAL`

The onboarding should focus on **understanding the user** through assessments — custom, somewhat vague prompts that let them choose preferences and goals. The mandatory steps should be minimal but purposeful, enough to give SIA a starting picture without overwhelming the user:

1. **Welcome / Account Creation** — Name, basic info
2. **Life Assessment** — Quick selection of life areas of interest (from the 8 domains), presented as relatable prompts rather than clinical forms
3. **Goal Setting** — What they want to improve, presented conversationally
4. **Preferences** — Communication style, timing preferences
5. **Plan Generation** — SIA synthesizes their inputs and generates an initial personalized plan

The flow should support both a **light mode** (quick, 2-3 minutes, minimum viable info) and a **deep mode** (optional deeper assessment for users who want more personalization). Users choose which path they want.

### 3.2 Chatbot-driven or traditional screen-based onboarding?

> *Old meeting: Both discussed, no final pick.*

- A) Chatbot-driven: SIA asks life questions conversationally ("What's the #1 thing you want to improve in your life?"), user picks from chips/buttons
- B) Traditional: Clean selection screens with pre-built options
- C) Hybrid: SIA introduces each step with personality, but the UI is structured (not free-form chat)

**Answer:** `FINAL`

**Primarily chatbot-driven, with visual enhancements.** SIA drives the conversation, but the experience is enriched with:

- **Visual guidance at the top**: Examples, cues, and context that help the user understand what's being asked — not just a blank chat bubble.
- **Recommendation chips at the bottom**: Pre-built options, suggestions, and quick-select buttons that make it easy to respond without typing.
- **Popups and cards**: Visual elements that can appear mid-conversation to show examples or explain concepts.

The overall feel should be **easy to understand and engaging enough to continue**. Simple enough for users who want to breeze through (light mode), deep enough for users who want a thorough assessment (deep mode). The chatbot approach makes onboarding feel like meeting your coach for the first time, not filling out a form.

### 3.3 What information do you absolutely need before the user can start?

> *Direction Reset suggests these 3-5 AI assessment questions:*
> *1. "What's the #1 thing you want to improve in your life?"*
> *2. "How motivated are you right now?" (low/medium/high)*
> *3. "What have you tried before?"*
> *4. "What's your biggest obstacle?"*
> *5. "Any specific life goals?" (free text)*

Pick the minimum viable set. Which of these can be deferred?
- Name
- Life areas of interest (from the 8 domains: Career, Relationships, Creativity, Spirituality, Finance, Fitness, Learning)
- Primary life goal (free text or pre-built)
- Motivation level (low/medium/high)
- What they've tried before
- Biggest obstacle
- Age/gender
- Integrations (WHOOP, Google Calendar, Spotify)
- Subscription plan

**Answer:** `FINAL`

**Minimum viable set (required during onboarding):**

1. **Name** — Personal touch from the first interaction
2. **Life areas of interest** — From the 8 domains, so SIA knows where to focus
3. **Age/gender** — For basic personalization and coaching context
4. **Integrations** — WHOOP, Google Calendar, Spotify — connect early to start gathering data
5. **Subscription plan** — To unlock the right feature set from the start

**Deferred (gathered naturally through SIA conversations over time):**

- Primary life goal (SIA can discover this through early conversations)
- Motivation level (SIA can assess this through behavior and interaction patterns)
- What they've tried before (conversational discovery)
- Biggest obstacle (emerges naturally through coaching)

The philosophy: collect the structural basics upfront, let SIA uncover the deeper personal details through natural coaching conversations.

### 3.4 Should there be an intro video/animation from SIA?

> *Old meeting: Hamza wanted "a 30-second intro video to amaze the shit out of users."*

Still want this? If yes — is it:
- A) A pre-recorded video showing Balencia's cross-domain intelligence in action
- B) An animated avatar (SIA) welcoming you and explaining the life system concept
- C) A cinematic motion sequence showing life domains connecting
- D) Skip it — get users into the experience faster

**Answer:** `FINAL`

**Leaning towards A, with elements of B/C.** A short pre-recorded video (30 seconds max) that shows Balencia's cross-domain intelligence in action — demonstrating the "Balencia sees what you can't see" promise with real examples of life connections being discovered. It should be cinematic and high-quality enough to create a *"wow"* moment, but short enough not to delay the user from getting started. This video sets the emotional stage before the chatbot-driven onboarding begins.

### 3.5 The AI assessment conversation — how deep does it go?

> *Direction Reset: AI decomposes any life goal into daily actions, tracking signals, and milestones.*

After the user states their goal, does SIA:
- A) Immediately generate a plan and let them start (fast, may feel generic)
- B) Ask 2-3 follow-up questions per goal to personalize deeply, then generate a plan
- C) Have a full 5-10 minute conversation to deeply understand the user before suggesting anything
- D) Depends on motivation tier — low gets fast start, high gets deep conversation

**Answer:** `FINAL`

**D) Depends on motivation tier** — low-motivation users get a fast start with minimal friction (SIA generates a plan quickly and they can start right away), while high-motivation users get a deeper conversation with follow-up questions to personalize more thoroughly. This adaptive approach ensures neither persona is alienated — the eager user isn't bored, and the committed user isn't shortchanged.

### 3.6 How do you handle the "I just want to try it" user?

Someone who doesn't want to answer any questions:
- A) Force minimum onboarding (1-2 questions, then let them in)
- B) Let them skip entirely and explore, prompt for onboarding later
- C) Give a "guest mode" preview with sample data showing what Balencia can do
- D) SIA says "No worries, let's just start. Tell me one thing on your mind" — conversational skip

**Answer:** `FINAL`

**A guest mode with minimum onboarding.** There should be a minimum onboarding for everyone — because without any context, SIA can't provide value. But for users who want to "try it out" before committing:

- A **guest mode** with sample/dummy data that lets them explore the app's capabilities — videos, sample dashboards, example insights, and demo interactions showing what Balencia looks like in action.
- The minimum onboarding should be extremely lightweight (name + 1-2 selections), just enough for SIA to start being useful.
- The guest mode serves as a live demo: *"Here's what your life dashboard could look like. Here's an example of SIA discovering a connection. Here's a sample weekly plan."*

---

## 4. Navigation & Information Architecture

### 4.1 What are the primary navigation items (max 5)?

> *Current app: Sidebar with 30+ items. Old meeting: minimal sidebar, pin system, Explore page.*
> *Reality: The app spans 8 life domains, AI coaching, goals, community, knowledge graph, and more.*

If the bottom nav (mobile) or sidebar (desktop) shows only 4-5 items, what are they? Consider:
- Home / Today
- SIA (AI Coach)
- My Goals / Life Areas
- Explore (discover modules)
- Schedule / Calendar
- Community
- Profile

**Answer:** `FINAL`

Given that the focus is mobile-only and based on the answers across this questionnaire, the primary bottom navigation items should be:

1. **Home / Today** — The daily experience hub with SIA's greeting, AI-suggested actions, active goals, and schedule
2. **SIA** — The unified AI Coach chat + voice experience (merged AI Coach and Chat)
3. **Goals / Life Areas** — Goal tracking, progress, life domain overview
4. **Explore** — Discover and access all modules, features, and tools across all life domains
5. **Profile** — Settings, preferences, subscription, connected services

Everything else (community, calendar, knowledge graph, individual domain features) is accessible through the Explore page or through SIA's contextual navigation.

### 4.2 How do 8 life domains organize in the UI?

> *Direction Reset: 3 pillars (Fitness, Nutrition, Wellbeing) are the DATA FOUNDATION. Life Goals are the USER-FACING LAYER.*

The user has goals across Career, Relationships, Spirituality, Finance, Fitness, Learning, Creativity, and Custom domains. How do they navigate these?
- A) Goal-centric: Users see their goals, each goal links to relevant domain features. Domains are invisible infrastructure.
- B) Domain tabs: Each life area has its own tab/section (like the current pillar approach, but for all 8)
- C) AI-organized: SIA decides what to show based on time of day, user state, and active goals. No manual navigation needed.
- D) Hybrid: Goals are primary, but users can drill into a specific domain's dashboard from the Explore page
- E) Something else

**Answer:** `FINAL`

**D) Hybrid: Goals are primary, users can drill into domain dashboards from Explore.** Goals are the user-facing layer — users interact with their goals, see daily actions, and track progress. But for users who want to go deeper into a specific life area (e.g., view their full finance dashboard, browse their workout library, or review their spirituality practices), they can drill into domain-specific dashboards from the Explore page.

Currently there are 8 domains, but in the future there may be many more (including user-created custom domains), so the architecture should be extensible. Domains are the organizational scaffolding; goals are the user experience.

### 4.3 Pin-to-sidebar system — still want it?

> *Old meeting decision D4: Users pin favorite modules from Explore page to sidebar.*

If yes: what's the default set of pinned items for a new user (based on their selected goals)? How many pins max?

**Answer:** `FINAL`

**Yes, similar to a Notion-style pin system.** Users can pin multiple favorite modules or features for quick access. The system should:

- Default pins based on the user's selected life areas during onboarding
- Allow multiple pins (no strict cap, but the UI should gracefully handle a growing list)
- Pins appear as quick-access shortcuts within the navigation, not as sidebar items (since the focus is mobile)
- Feel flexible and user-controlled, like Notion's favorites system

### 4.4 The Explore page — what does it look like?

> *Old meeting: GPT Store-like. Goal-relevant modules first.*

This now spans ALL life domains, not just health. It includes modules for workout tracking, meal planning, journal, habit tracking, prayer times, finance/budgets, knowledge graph, breathing exercises, vision board, competitions, and more.

- A) Grid of module cards with domain-colored icons and descriptions
- B) Categorized by life domain (Career section, Finance section, Fitness section, etc.)
- C) AI-curated: "Recommended for you" based on goals, with full catalog below
- D) Something else

**Answer:** `FINAL`

**A mixture of A and B:**

- **Grid of module cards** with domain-colored icons, organized in clean categories
- **Categorized by life domain** so users can browse by area (Fitness, Finance, Spirituality, etc.)
- AI recommendations can surface at the top ("Suggested for you"), but the primary organization is a clean grid categorized by domain
- Each card should show the module name, a brief description, and the domain color for quick visual scanning

The overall feel should be discoverable and browsable — like an app store for life improvement tools, not an overwhelming feature dump.

### 4.5 How does navigation differ between mobile and desktop?

On desktop you have a sidebar with room. On mobile you have a bottom tab bar with 4-5 slots. Should they show the same items? Does the mobile bottom bar adapt based on user's active goals?

**Answer:** `FINAL`

**Focus is mobile app only.** The entire UI/UX redesign is centered on the mobile experience. Desktop is not a priority for this phase. The mobile bottom tab bar with 5 items (Home, SIA, Goals, Explore, Profile) is the primary navigation paradigm.

### 4.6 Where does the admin panel live?

Current: `/admin` with 19+ sub-routes. Is this a completely separate layout, a section within settings, or accessible via role-based toggle?

**Answer:** `FINAL`

**The admin panel is not a priority.** It does not need the same level of UI/UX attention as the customer-facing app. It can remain as a separate layout accessible via role-based toggle, but the focus of this redesign is entirely on the user/customer experience. Admin panel improvements can be addressed later.

---

## 5. Home Screen / Daily Experience

### 5.1 What IS the home screen?

> *Old meeting Q4: "If SIA is primary, what is the dashboard?"*
> *Direction Reset: AI-first means the home experience is suggestion-driven, not log-driven.*

- A) SIA IS the home screen — you open the app to a conversation
- B) A "Today" view: SIA's greeting, today's AI-suggested actions across all life domains, key metrics, quick actions — one tap to talk to SIA
- C) A full dashboard with KPI cards and charts — but not the default landing (you navigate to it)
- D) Personalized: users choose what widgets/cards appear on their home

**Answer:** `FINAL`

**A mixture of A and B.** The home screen is a "Today" view that is SIA-forward:

- SIA's greeting and proactive message are the first thing the user sees
- Today's AI-suggested actions across all life domains are prominently displayed
- Active life goals with progress are visible at a glance
- A quick tap launches the full SIA conversation

It's not a pure chat screen (that's the SIA tab), but SIA's intelligence drives the entire home experience. The home screen is the curated, AI-generated daily briefing; the SIA tab is where the conversation lives.

### 5.2 What are the top 5 things visible on the home/today screen?

Pick from:
- SIA's greeting / proactive message of the day
- Today's AI-suggested actions (across all life domains)
- Active life goals with progress
- Daily schedule / upcoming events
- Streak count / motivation indicator
- Cross-domain insight ("Connection spotted: your exercise days correlate with better focus at work")
- Quick check-in prompt (mood/energy/intention for the day)
- Recent activity feed
- Community highlights
- Weather / prayer times / contextual info
- Motivational quote or SIA encouragement

**Answer:** `FINAL`

The top 5 elements on the home/today screen:

1. **SIA's greeting / proactive message of the day** — The first thing the user sees. Sets the tone, surfaces the most important insight or encouragement.
2. **Today's AI-suggested actions (across all life domains)** — What SIA recommends the user focus on today, spanning all active domains.
3. **Active life goals with progress** — Visual progress indicators for the user's current goals.
4. **Recent activity feed** — What the user has done recently, reinforcing momentum.
5. **Daily schedule / upcoming events** — Calendar integration showing what's ahead today.

### 5.3 How much data density is appropriate?

> *Old meeting: "So many numbers scare people away."*
> *Direction Reset: Depends on motivation tier — low gets minimal, high gets detailed.*

- A) Minimal — one or two key numbers, mostly conversational and action-oriented
- B) Moderate — 4-6 cards, one visual, a schedule preview
- C) Dense — multi-section with charts, tables, feeds
- D) Adaptive — density changes based on motivation tier (minimal for low, moderate for medium, dense for high)

**Answer:** `FINAL`

**D) Adaptive — density changes based on motivation tier.** The data density should dynamically adjust:

- **Low motivation**: Minimal clutter. One or two cards, SIA's greeting, today's single most important action. Conversational and encouraging — no overwhelming dashboards.
- **Medium motivation**: Moderate — 4-6 cards, a schedule preview, goal progress, and one cross-domain insight.
- **High motivation**: Dense — detailed metrics, charts, multiple goal breakdowns, streak counters, full schedule, cross-domain analytics.

This ensures the app meets each user where they are without alienating either end of the spectrum.

### 5.4 Should there be a daily check-in?

When the user opens the app each day:
- A) Yes — a quick mood/energy/intention check before they see anything else
- B) Yes, but it's part of SIA's greeting ("Good morning! How are you feeling?") — conversational, not a form
- C) No mandatory check-in — SIA might ask naturally during conversation
- D) Optional: user enables/disables daily check-in in preferences

**Answer:** `FINAL`

**B) Yes, but part of SIA's greeting — conversational, not a form.** When the user opens the app, SIA's greeting naturally includes a check-in: *"Good morning! How are you feeling today?"* — but it's woven into the conversation, not a mandatory form or modal that blocks the experience. It should feel like a coach greeting you, not a survey to fill out.

### 5.5 How do cross-domain connections surface on the home screen?

Balencia's core value is connecting life domains. On the home screen, how does the user see this?
- A) An "Insight of the day" card with a cross-domain observation
- B) Visual connection lines between goal cards that share data
- C) SIA mentions it in the greeting ("Your sleep improved this week — and so did your productivity streak")
- D) A dedicated "Connections" section or widget
- E) Subtly woven in — domain-colored tags on action items showing which goals they support

**Answer:** `FINAL`

**E) Subtly woven in — domain-colored tags on action items showing which goals they support.** Cross-domain connections should feel natural, not forced. Each action item and insight on the home screen carries domain-colored tags (using the established domain color system: Career/Indigo, Relationships/Pink, Fitness/Red, Finance/Emerald, etc.) showing which life areas it touches. When an action supports multiple domains, multiple colored tags appear — visually communicating interconnection without needing a separate section or heavy-handed callouts.

SIA's greeting can also reference connections naturally ("Your sleep improved this week — and so did your productivity"), but the primary mechanism is the subtle color-tagging system.

---

## 6. Life Domains & Feature Organization

### 6.1 How do the 8 life domains present themselves in the UI?

> *Direction Reset: Life Goals layer sits on top. 3 health pillars are data foundation.*
> *Current code defines 8 domains: Career, Relationships, Creativity, Spirituality, Finance, Fitness, Learning, Custom.*

- A) **Invisible infrastructure**: Users never see "domains" — they see goals, daily actions, and SIA conversations. The domains are how the AI organizes things internally.
- B) **Colored tags**: Each domain has a color. Actions, goals, and insights are tagged with domain colors so users can see at a glance which part of their life is active.
- C) **Domain dashboards**: Each domain has its own dashboard accessible from Explore, showing domain-specific metrics, history, and tools.
- D) **Life wheel**: A visual wheel/radar showing all domains with progress, giving the user a holistic life overview.
- E) A combination — describe:

**Answer:** `FINAL`

**E) A combination — it's one life with many domains.** The philosophy is that life isn't tackled in separate silos but as a whole. Some apps make the mistake of separating everything into rigid categories — Balencia should feel like managing *one life* that happens to have many dimensions.

In practice, this means:

- **Colored tags (B)** — Every action, goal, and insight carries domain-colored tags for at-a-glance identification
- **Domain dashboards (C)** — Each domain has a dedicated dashboard accessible from Explore for users who want to go deep
- **Life wheel/overview (D)** — A holistic visualization showing all domains and their relative progress

But the key insight is that these aren't presented as separate worlds. The UI language should reinforce that it's all connected — domains exist to identify and organize, not to silo. Users should feel they're working on their *life*, not switching between mini-apps.

### 6.2 The AI-first interaction pattern — does it apply to ALL domains?

> *Direction Reset: Universal pattern — AI suggests → user reviews → accepts/edits/skips → AI learns.*

Does this pattern apply equally to:
- Workout plans (AI suggests today's workout)
- Meal suggestions (AI suggests meals, user confirms)
- Journal prompts (AI suggests reflection topic)
- Budget advice (AI flags spending pattern)
- Relationship reminders (AI suggests quality time activity)
- Prayer/spiritual practice (AI reminds prayer times, suggests reflection)
- Learning goals (AI suggests what to study today)
- Career actions (AI suggests networking or skill-building task)

Or are there domains where the user should drive more and AI should drive less?

**Answer:** `FINAL`

**Yes, AI-first applies to ALL domains equally.** The universal pattern (AI suggests → user reviews → accepts/edits/skips → AI learns) should be the consistent interaction model across every life domain. For all domains, the intent is the same: if the user is looking to improve that part of their life, the AI is there to **plan, guide, keep them accountable, and make them better**.

This means:
- **Fitness**: SIA suggests today's workout → user accepts/modifies → SIA learns preferences
- **Nutrition**: SIA suggests meals and hydration → user confirms/adjusts → SIA adapts
- **Finance**: SIA flags spending patterns, suggests savings actions → user reviews
- **Spirituality**: SIA reminds prayer times, suggests reflection topics → user engages
- **Career**: SIA suggests networking tasks, skill-building → user prioritizes
- **Relationships**: SIA suggests quality time activities, connection reminders → user acts
- **Learning**: SIA suggests study topics, reading → user engages
- **Creativity**: SIA suggests creative practice, projects → user creates

No domain is exempt. SIA is the coach across the board.

### 6.3 Per-domain design intent

For each domain, describe in 1-2 sentences what the primary user experience should be. What does the user DO in this domain day-to-day?

| Domain | What the user primarily does | How deep is the feature set? |
|--------|-----|-----|
| **Fitness & Movement** | *e.g., follow AI-generated workout, track via WHOOP, see exercise history* | Full app-within-app / Moderate tools / Light (just goal tracking) |
| **Nutrition & Diet** | *e.g., confirm AI-suggested meals, track water, see macro summary* | |
| **Mental Health & Wellbeing** | *e.g., journal, mood check-in, breathing exercises, habit tracking* | |
| **Finance & Money** | *e.g., track spending, review budgets, scan receipts, see savings progress* | |
| **Career & Work** | *e.g., track goals, skill building, review AI suggestions for growth* | |
| **Relationships** | *e.g., quality time tracking, relationship reflection, connection reminders* | |
| **Spirituality & Religion** | *e.g., prayer tracking, Quran reading, reflection, meditation* | |
| **Learning & Growth** | *e.g., reading goals, course tracking, skill development* | |
| **Creativity** | *e.g., creative practice logging, project tracking, inspiration* | |

**Answer:** `FINAL`

| Domain | What the user primarily does | How deep is the feature set? |
|--------|-----|-----|
| **Fitness & Movement** | Follow AI-generated workout plans, track exercise via WHOOP integration, review exercise history, get AI-adjusted routines based on recovery and performance data | Full |
| **Nutrition & Diet** | Confirm AI-suggested meals, track water and macros, scan food/receipts, review nutritional analytics, get meal plans that adapt to goals and activity | Full |
| **Mental Health & Wellbeing** | Journal with AI-guided prompts, mood and emotional check-ins, breathing exercises, habit tracking and building, vision board for life goals, stress management tools | Full |
| **Finance & Money** | Full finance dashboard — track spending, review and manage budgets, scan receipts, monitor savings goals, get AI insights on spending patterns tied to life behaviors (like Mint/YNAB embedded in the life system) | Full |
| **Career & Work** | Track career goals, receive AI-suggested skill-building tasks and networking actions, review growth trajectory, get coaching on professional development | Full |
| **Relationships** | Quality time tracking, relationship reflections, AI-driven connection reminders ("You haven't called your mom this week"), suggested activities for partner/family/friends | Full |
| **Spirituality & Religion** | Prayer time tracking and reminders, Quran reading progress, fasting schedule management, daily spiritual reflections, meditation guidance — SIA adapts to user's faith practice | Full |
| **Learning & Growth** | Reading goals and book tracking, course progress, AI-suggested learning paths, skill development tracking, daily study prompts | Full |
| **Creativity** | Creative practice logging, project tracking and milestones, inspiration prompts from SIA, portfolio-style progress review | Full |

All domains receive full feature depth because the features have already been built. The UI/UX redesign is about making them feel cohesive and accessible, not cutting scope.

### 6.4 Custom life domains — how does a user add one?

> *Direction Reset: "No predefined goal categories — free-form input, AI structures it."*

When a user creates a custom life domain (e.g., "Parenting", "Volunteer Work", "Side Business"), how does the process work?
- A) User types the domain name, AI auto-generates tracking suggestions, metrics, and coaching prompts
- B) User picks from an extended list of 20+ pre-built domains, "Custom" is the last resort
- C) User just sets a goal — the AI figures out which domain it belongs to (no explicit domain creation)

**Answer:** `FINAL`

**C) User just sets a goal — the AI figures out which domain it belongs to.** No explicit domain creation needed. The user simply states their goal (e.g., "I want to be more present with my kids"), and SIA automatically understands the context, assigns it to the appropriate domain or creates a custom category, and generates tracking suggestions, metrics, and coaching prompts. This keeps the experience simple and AI-driven — the user doesn't need to think about taxonomy; they just state what they want to improve.

### 6.5 Which domains are v1 priority vs later?

Not all 8 domains need full feature depth at launch. Rank them:

| Domain | Priority | Depth at v1 |
|--------|----------|-------------|
| Fitness & Movement | | Full / Moderate / Light / Later |
| Nutrition & Diet | | |
| Mental Health & Wellbeing | | |
| Finance & Money | | |
| Career & Work | | |
| Relationships | | |
| Spirituality & Religion | | |
| Learning & Growth | | |
| Creativity | | |

**Answer:** `FINAL`

**All domains are Full depth at v1.** The features have already been built across all domains (220+ services, 60+ pages). The redesign is about improving the UI/UX for what already exists, not about cutting features or deferring scope. Every domain gets full attention in the redesign because the underlying functionality is already in place.

| Domain | Priority | Depth at v1 |
|--------|----------|-------------|
| Fitness & Movement | 1 | Full |
| Nutrition & Diet | 1 | Full |
| Mental Health & Wellbeing | 1 | Full |
| Finance & Money | 1 | Full |
| Career & Work | 1 | Full |
| Relationships | 1 | Full |
| Spirituality & Religion | 1 | Full |
| Learning & Growth | 1 | Full |
| Creativity | 1 | Full |

### 6.6 Cross-domain intelligence — how are connections shown?

> *This is Balencia's moat. Existing services: `cross-pillar-intelligence.service.ts`, `cross-domain-correlator.service.ts`, `correlation-engine.service.ts`.*

When the AI discovers a connection (e.g., "Exercise days → lower spending → better mood → more productive at work"), how does the user see this?
- A) SIA tells them in conversation
- B) A dedicated "Insights" or "Connections" screen with visualizations
- C) The Knowledge Graph — interactive visualization of life connections
- D) Cards on the home screen: "Connection spotted" with a visual
- E) All of the above, in different contexts

**Answer:** `FINAL`

**E) All of the above, in different contexts — but with SIA as the primary driver.** SIA should be trying her best to find correlations between domains at all times. The Life Correlation Matrix is proprietary and dynamic, constantly updating based on new insights being gathered.

How connections surface depends on context:
- **In conversation**: SIA naturally mentions connections during coaching sessions
- **On the home screen**: "Connection spotted" cards with visual representations
- **In a dedicated Insights view**: A deeper visualization of life connections for users who want to explore
- **Through the Knowledge Graph**: Interactive visualization for power users
- **In proactive notifications**: When significant correlations are discovered

The key principle: SIA is always looking for how one domain affects the others. This is Balencia's core differentiator and should feel like it's constantly working behind the scenes.

**Important context**: The exact correlations between life domains are **still not fully defined** — AI will need to determine the best connections based on user data over time. The Life Correlation Matrix is the product vision, but the specific data model and correlation weights are still being developed. This means the UI should be designed to accommodate evolving and dynamic correlations rather than a fixed set.

**Commercial positioning**: This correlation system is positioned as Balencia's **commercial differentiator and marketing tool** — *"This becomes our marketing tool. The unique thing that we have. This is what we call the proprietary data."* The cross-domain intelligence isn't just a feature; it's what makes Balencia fundamentally different from every single-domain app on the market.

### 6.7 Wellbeing sub-features — consolidate or keep separate?

> *Current: 10+ sub-modules under Wellbeing (journal, mood, stress, energy, breathing, emotional check-in, habits, vision board, schedule, insights).*

This is the most fragmented section. Should these:
- A) Remain as separate screens/modules accessible from Explore
- B) Consolidate into 2-3 screens (e.g., "Mind" for journal/mood/emotions, "Habits" for habits/routines, "Mindfulness" for breathing/meditation)
- C) Become SIA-invoked features — no standalone screens, SIA surfaces them contextually
- D) Mix: core ones (journal, habits) get standalone screens; rest are SIA-invoked

**Answer:** `FINAL`

**Potentially C or B.** The preference leans toward consolidation:

- **Option B**: Consolidate into 2-3 logical screens — e.g., "Mind" (journal, mood, emotions, stress), "Habits" (habits, routines, daily actions), "Mindfulness" (breathing, meditation, reflection). This reduces fragmentation while keeping key features accessible.
- **Option C elements**: Some of the lighter sub-features (emotional check-in, energy tracking) can be SIA-invoked rather than having standalone screens — SIA surfaces them contextually when relevant.

The goal is to reduce the current 10+ sub-module sprawl without losing functionality. Core features get dedicated screens; lightweight features become part of the SIA conversation flow.

### 6.8 Finance depth — how much of a finance app is this?

> *Current: Full money map with transactions, budgets, savings goals, receipt scanning, analytics.*

Is Balencia's finance feature:
- A) A full finance dashboard (like Mint/YNAB) embedded in the life system
- B) Goal-oriented finance tracking — savings goals, spending patterns tied to life goals, but not full budgeting
- C) Light: AI monitors spending patterns and flags insights, but no manual transaction entry
- D) Depends on user's plan/subscription — basic for free, full for premium

**Answer:** `FINAL`

**A) A full finance dashboard (like Mint/YNAB) embedded in the life system.** The finance feature is a complete embedded finance tool — transaction tracking, budgets, savings goals, receipt scanning, and analytics — but what makes it uniquely Balencia is that it's connected to the rest of the user's life. SIA can correlate spending patterns with mood, stress, exercise habits, and other life domains. It's Mint, but with life-system intelligence layered on top.

### 6.9 Spirituality & religion — how explicitly religious vs spiritual?

> *Direction Reset example: "Be a better Muslim" → prayer 5x daily, Quran reading, fasting schedule, Fajr wake-up.*
> *Current: `prayer-times.service.ts` exists.*

Should Balencia:
- A) Be explicitly multi-faith: offer prayer tracking for Islam, Christianity, Judaism, etc. with specific features per faith
- B) Be spiritually agnostic: offer "spiritual practice" tracking that works for any faith or secular mindfulness
- C) Start with Islamic features (prayer times, Quran, fasting) as the primary faith implementation, expand later
- D) Let the AI handle it — user states their spiritual goals, SIA adapts without the app having religion-specific UI

**Answer:** `FINAL`

**D) Let the AI handle it.** The user states their spiritual goals and SIA adapts without the app having rigid religion-specific UI. When a user says "I want to be a better Muslim," SIA generates prayer tracking, Quran reading goals, and fasting schedules. When someone says "I want a daily meditation practice," SIA generates mindfulness routines. The underlying prayer-times service and other spiritual tools exist, but the UI adapts to the user's stated practice rather than prescribing a specific religious framework. This keeps Balencia inclusive while still being deeply useful for any faith tradition.

### 6.10 What existing features should be REMOVED from the app?

Looking at the full feature list: quick notes, voice calls, soundscapes/music player, yoga library, blogs, webinars, careers page, HIPAA page, money map, knowledge graph, competitions, leaderboard, vision board.

Are any of these cut entirely from v1 of the redesign? Which are deprioritized?

**Answer:** `FINAL`

**No features are being cut.** All features have already been built and are functional. The redesign is about improving how they're presented, accessed, and experienced — not about removing capability. However, the approach should be:

- **Not everything needs to be in the user's face.** Features should be accessible but not overwhelming. The user doesn't need to see 30+ items in a sidebar.
- **Progressive disclosure**: Core daily-use features (SIA, goals, home, schedule) are prominent. Deeper tools (knowledge graph, competitions, vision board, yoga library) are discoverable through Explore and SIA.
- **SIA as the navigator**: Many features that would otherwise clutter the UI can be surfaced by SIA contextually — "Would you like to try a breathing exercise?" rather than a permanent "Breathing" nav item.
- **The UI/UX flow may need to change** to fit everything more elegantly, but the underlying features remain intact.

---

## 7. Goals & Plans System

### 7.1 Goal decomposition — how much does the user see?

> *Direction Reset: AI decomposes any goal into daily actions, tracking signals, milestones. Example: "Be a better Muslim" → 7 decomposed actions across 3 pillars.*

When AI breaks down a life goal, does the user see:
- A) Just the daily actions ("Today: 15 min Quran reading, pray Dhuhr on time")
- B) The full decomposition: all actions, which domains they touch, milestones, reasoning
- C) A summary with expandable detail: "Your goal has 7 actions across 3 life areas" → tap to see full breakdown
- D) Depends on motivation tier: low sees only today's actions, high sees full plan

**Answer:** `FINAL`

**A mixture of B and C, but layered by user preference.** The full decomposition should be available, but it shouldn't be forced on everyone:

- **Default view**: A summary with expandable detail — *"Your goal has 7 actions across 3 life areas"* → tap to see the full breakdown with all actions, domain tags, milestones, and reasoning.
- **For hardcore/high-motivation users**: The full decomposition is readily accessible — they can see every action, every domain connection, every milestone and the reasoning behind it.
- **For light/low-motivation users**: They only see their daily actions and don't need to engage with the full complexity unless they choose to.

The key: the full intelligence is there for those who want it, but it doesn't overwhelm those who don't. Users who just want to be told what to do today see their actions; users who want to understand the full plan can drill down.

### 7.2 What do life goal cards look like?

When you see a goal on the home screen or goals page, what does the card show?
- Progress ring/bar
- Motivation tier badge (low/med/high)
- Connected domain colors/icons
- Current streak
- Next action due
- AI coaching note ("You're 60% through this month's target")
- Time since last activity

Pick the essential elements for a goal card:

**Answer:** `FINAL`

The essential elements for a goal card:

- **Progress ring/bar** — The primary visual element showing how far along the user is toward their goal. Clear, satisfying, motivating.

Additional elements can appear contextually based on the goal type and user's motivation tier, but the progress visualization is the core. Streak counts, domain colors, next actions, and coaching notes can enhance the card but shouldn't clutter it. The card should be clean and scannable at a glance — inspired by Bevel's approach of making complex data visually simple.

### 7.3 Motivation tiers — how do they manifest in the UI?

> *Direction Reset: Low = 1-2 micro-actions, heavy gamification, gentle tone. Medium = 3-5 actions, structured. High = 5-10 actions, challenging, metric-heavy.*

Should motivation tiers visibly change the interface?
- A) Yes — low-motivation users see a simpler, gentler UI with fewer elements; high-motivation users see dense dashboards with detailed metrics
- B) No visible change — the AI's suggestions and tone change, but the UI layout stays the same
- C) Subtle: same layout, but the number of cards/actions shown adapts
- D) User chooses their view density independently of motivation tier

**Answer:** `FINAL`

**D) User chooses view density independently of motivation tier.** Motivation tier affects SIA's tone, the number of suggested actions, and the coaching approach — but the UI density should be user-controlled. Some high-motivation users may prefer a clean view; some low-motivation users might want to see everything. Let the user pick their preferred view density separately from their motivation level.

### 7.4 Progress visualization — per-goal, per-domain, or unified?

How does the user track their overall life progress?
- A) Per-goal progress bars/rings (each goal has its own)
- B) Per-domain scores (Career: 72%, Fitness: 85%, etc.)
- C) Unified "Life Score" — one number representing overall life balance
- D) A life wheel/radar chart showing all domains at a glance
- E) Multiple views available — list, wheel, and per-goal

**Answer:** `FINAL`

**E) Multiple views available — list, wheel, and per-goal.** Users should have flexibility in how they visualize their progress:

- **List view**: A scrollable list of goals with individual progress bars — quick and scannable
- **Wheel/radar view**: A life wheel showing all domains at a glance for a holistic overview
- **Per-goal detail view**: Drill into any individual goal for deep progress tracking, milestones, and history

Different users prefer different visualization styles, and different moments call for different views. A quick morning check might use the list; a weekly reflection might use the wheel.

### 7.5 Milestones & celebrations — how big is the moment?

When a user hits a milestone ("7-day prayer streak!", "Lost 5kg!", "Saved $1000!"):
- A) Full-screen celebration with animation, confetti, SIA congratulations
- B) A toast/banner notification with a brief message
- C) SIA brings it up in the next conversation naturally
- D) Depends on the milestone size — small = toast, big = celebration screen
- E) Adapted by motivation tier — heavy celebration for low-motivation, subtle for high

**Answer:** `FINAL`

**D) Depends on milestone size — small = toast, big = celebration.** The celebration should match the achievement:

- **Small wins** (logged a meal, completed a daily task, hit a 3-day streak): A brief toast notification or small animation — acknowledged but not disruptive.
- **Big milestones** (30-day streak, major goal completion, significant life achievement): Full-screen celebration with animation, confetti, SIA congratulations — a genuine moment of pride.

This keeps small wins frequent and lightweight while making major milestones feel truly earned and memorable.

---

## 8. Knowledge System & Intelligence

### 8.1 Knowledge Graph — user-facing or behind the scenes?

> *Current: `/knowledge-graph` page exists with interactive visualization. Services: `knowledge-graph.service.ts`.*

- A) User-facing: A visual graph users interact with, seeing how their habits, goals, sleep, spending, etc. connect
- B) Behind the scenes: The graph exists for AI intelligence, users never see it directly — they see its outputs as SIA insights
- C) Power-user feature: Available in Explore for those who want it, but not promoted. Most users interact via SIA.
- D) Showcase feature: Show it during onboarding as a "this is what Balencia sees about your life" wow moment, then it lives in Explore

**Answer:** `FINAL`

**A hybrid approach.** Some visual representation of the knowledge graph and life correlations should be visible to users — they should be able to see and understand that Balencia is connecting their life in meaningful ways. This is the idea behind **Balencia City** (a visual metaphor for the user's life system).

**The "Room" concept**: Each life domain is envisioned as a **room** within Balencia City. Clicking on a domain zooms the user into that room, where they see analytics, detailed data, and domain-specific metrics — inspired by Hamza's exploration of Blender 3D modeling. The zooming-in transition creates a spatial, immersive feeling: *"I saw a little model where it's inside. We can make it inside the house. But the zooming inside after clicking — analytics and stuff like that."* This concept is validated as a long-term direction but deferred until the foundational design is established. **Mobile constraint**: 3D assets must be kept under ~500KB for device compatibility.

However, the majority of the intelligence should feel like a **mysterious, behind-the-scenes force** that SIA wields. Users should be aware that deep analysis is happening and should be able to visually understand the connections, but the detailed mechanics remain with SIA. The Knowledge Graph visualization exists for those who want to explore it, but most users experience its power through SIA's insights and the cross-domain correlation cards.

### 8.2 Personal Wiki — visible to the user?

> *Current: `wiki.service.ts`, `wiki-compiler.service.ts` — compiles user's life data into a personal knowledge base.*

Does the user see their compiled life knowledge?
- A) Yes — a "My Life Wiki" section where they can browse what Balencia knows about them
- B) No — it's SIA's memory. The user experiences it through better AI responses.
- C) Partially — users can see key facts ("SIA knows: You prefer morning workouts, you're working toward a promotion, your partner's birthday is next month") but not the full compiled wiki

**Answer:** `FINAL`

**Yes, this is visible.** Similar to Bevel's knowledge base feature, users can view and edit what Balencia knows about them. This serves as a personal knowledge base — a browsable, editable record of facts, preferences, and context that SIA uses for coaching. The user should be able to:

- Browse what SIA knows about them
- Edit or correct any information
- Add new context that helps SIA coach better
- Feel confident that SIA's intelligence is grounded in accurate, user-verified data

This builds trust and transparency — the user knows exactly what's informing SIA's coaching, and they can shape it.

### 8.3 Cross-domain insights — how are they delivered?

When the AI discovers a pattern across domains:
- A) Dedicated "Insights" feed/page — a stream of AI discoveries
- B) SIA mentions them in conversation when relevant
- C) Home screen cards: "Connection spotted" with visual
- D) Weekly digest: "This week's life connections" summary
- E) All of the above, in different contexts and urgency levels

**Answer:** `FINAL`

**E) All of the above, in different contexts and urgency levels.** Cross-domain insights should be delivered through every available channel, matching urgency and context:

- **Urgent/real-time**: SIA mentions it in conversation immediately, or pushes a notification
- **Daily**: Home screen cards with "Connection spotted" visuals
- **Weekly**: A digest summarizing the week's discoveries
- **On-demand**: A dedicated Insights feed for users who want to browse all discoveries
- **Proactively**: SIA doesn't wait to be asked — if a significant pattern emerges, it surfaces immediately

The form factor adapts to the importance and timeliness of the insight.

### 8.4 Memory transparency — should users see what SIA remembers?

> *Current: `memory-engine.service.ts` — long-term memory and context management.*

When SIA says "You mentioned last month that you were stressed about your promotion" — should the user be able to:
- A) See all stored memories in a "What SIA knows" page, with ability to delete items
- B) See memory referenced inline ("Based on your note from March 15th...") but not browse all memories
- C) Not see the memory system at all — it just works, SIA is smarter because of it
- D) Privacy control: user manages a "memory vault" deciding what SIA can remember long-term

**Answer:** `FINAL`

**Users should have access to memories.** It makes things more accurate and builds trust. Users should be able to:

- View what SIA remembers about them (accessible through the Personal Wiki/Knowledge Base)
- Edit or delete specific memories
- Understand what's informing SIA's coaching suggestions

This aligns with the Personal Wiki answer (8.2) — the wiki and memory system work together as a transparent, user-accessible knowledge base that SIA draws from. More transparency = more trust = better coaching.

---

## 9. Social & Community

### 9.1 How prominent should social features be?

> *Current: community groups, leaderboard, competitions, chat, follow system.*

- A) Core: social is central to motivation — feed, challenges, and accountability partners are prominent
- B) Optional add-on: available for those who want it, but the solo experience is complete
- C) Minimal for v1: basic accountability partner system, no feed or leaderboard
- D) None for v1: focus entirely on the personal AI coach experience

**Answer:** `FINAL`

**A mixture of A and B.** A user should be able to use Balencia entirely as an individual experience — the solo coaching with SIA should be complete and satisfying on its own. However, the social/family/community aspect is available as a powerful motivational layer:

- **Individual-first**: The core experience works perfectly solo
- **Social as enhancement**: Community features (challenges, accountability, family groups) are available for users who want the motivational boost of social connection
- **Not forced**: Social features are accessible but not in the user's face if they prefer to work alone

### 9.2 Leaderboard — motivating or anxiety-inducing?

- A) Keep and make prominent (Duolingo-style competition drives engagement)
- B) Keep but opt-in only — users choose to join leaderboards
- C) Replace with non-competitive comparisons ("You're in the top 20% of consistent journalers this month")
- D) Remove for v1

**Answer:** `FINAL`

**A) Keep and make prominent.** Duolingo-style competition drives engagement. The leaderboard serves as a motivational tool — seeing others progress inspires users to keep going. However, it should feel encouraging rather than anxiety-inducing, integrated with the RPG gamification system where leaderboard position is tied to XP, quests completed, and overall life progression rather than raw metrics.

### 9.3 Competitions & shared challenges — keep for v1?

> *Current: full competition system with streaming, team/individual, live updates.*

- A) Keep and polish — competitions across all life domains
- B) Simplify to "shared challenges" (e.g., "30-day meditation challenge with friends")
- C) Deprioritize — build after core AI coach experience is solid
- D) Remove entirely

**Answer:** `FINAL`

**C) Deprioritize — build after core AI coach experience is solid.** The competition system exists in the backend, but the redesign priority should focus on the core AI coaching experience first. Once that's polished and users are engaged with the individual experience, competitions and shared challenges can be elevated with better UI/UX.

### 9.4 Accountability — AI-driven or social?

> *Current: `accountability-contract.service.ts`, `accountability-trigger.service.ts`.*

- A) AI-driven: SIA is your accountability partner, tracks your commitments, follows up
- B) Social: invite a friend/partner as accountability buddy, they see your progress
- C) Both: SIA as default, with option to add human accountability partners
- D) Neither for v1 — just streaks and personal tracking

**Answer:** `FINAL`

**C) Both: SIA as default, with option to add human accountability partners.** SIA is the primary accountability partner — tracking commitments, following up, calling out when the user is slipping. But users can also invite friends, family, or partners as additional accountability buddies who can see their progress. This creates a layered accountability system: AI-driven at the core, human-enhanced for those who want it.

---

## 10. Gamification & Motivation

### 10.1 How prominent are streaks?

> *Current: full streak system with freezes, rewards, activity logging.*

- A) Duolingo-prominent: streak is THE motivator, visible everywhere, losing it feels significant
- B) Present but not central: shown on home screen, celebrated at milestones, but not anxiety-inducing
- C) Subtle: SIA mentions streaks in conversation, no persistent visual counter
- D) Per-domain streaks: separate streaks for fitness, journaling, prayer, etc.

**Answer:** `FINAL`

**A mix of A and smaller goal-level streaks.** Streaks should be a prominent motivator (Duolingo-style — visible, meaningful, with consequences for breaking them), but the concept should also extend to smaller goals. Not just one master streak — individual streaks can exist for specific habits, goals, and quests within the RPG system. A 7-day prayer streak, a 30-day workout streak, a 14-day journaling streak — each one carries its own streak that feeds into the broader gamification system.

### 10.2 Achievement system — how does it work across all life domains?

> *Current: `achievement-tree.service.ts`, `achievement-ai.service.ts` — dynamic achievements.*

Should achievements span ALL life domains equally? Or are they domain-specific? Examples:
- "Connected 3 life areas this week" (cross-domain achievement)
- "30-day prayer streak" (spirituality-specific)
- "Saved $500 toward your goal" (finance-specific)
- "Life balanced: all domains above 50% this month" (holistic achievement)

**Answer:** `FINAL`

**Full RPG gamification system.** The achievement system should be reimagined as an RPG game where the user's life is the main character. Inspired by World of Warcraft:

- **Goals become missions** — Your life goals are your quests
- **Sub-goals become sub-quests** — Breaking down larger goals into smaller, completable objectives
- **Users level up** — XP earned from completing actions, hitting milestones, maintaining streaks
- **Skills develop** — Each life domain acts like a skill tree that levels up with engagement (Fitness Level 12, Finance Level 8, etc.)
- **Quests span domains** — Cross-domain achievements become epic quests ("Connect 3 life areas this week" is a cross-realm quest)
- **Challenges** — Time-limited events that push users to push harder
- **Party system** — Work with friends/accountability partners on shared quests
- **Equipment/rewards** — Cosmetic or functional rewards earned through progression

**Narrative framing**: The RPG system should be story-driven, not just metric-driven. As originally pitched: *"Goals are not goals, they are quests. You're this person and to save the world, you need to do xyz. Missions came. As you keep on leveling up, you have to keep on changing."* The user's life becomes a narrative journey — progression that feels like a story unfolding, where challenges and expectations evolve as the user levels up.

The core insight from Habitica: **meaningful consequences** (HP loss for missed dailies) make the game real. Combined with WoW-style progression (leveling, skill trees, quests, parties), this turns self-improvement into an engaging, long-term journey rather than a chore.

**Critical design tension**: The team validated this concept as unique, but raised an important balance concern — how do you make RPG gamification engaging without it feeling childish, gimmicky, or visually "ugly"? This tension must be carefully navigated in the UI/UX design. The gamification should feel premium and mature, matching Balencia's brand identity — not cartoonish. It should enhance the coaching experience, not undermine it. The visual language of quests, XP, and leveling must be elevated to match the app's premium aesthetic.

Achievements span all domains equally — both domain-specific ("30-day prayer streak") and cross-domain ("Life balanced: all domains above 50%") achievements exist, feeding into the overall character progression.

### 10.3 Micro-wins — surface them or let them accumulate?

> *Current: `micro-wins.service.ts`.*
> *Direction Reset: Heavy gamification for low-motivation users, light for high.*

When small positive things happen (logged a meal, completed a breathing exercise, saved $5):
- A) Celebrate immediately: small animation + XP popup
- B) Batch them: "You had 7 wins today!" summary at end of day
- C) SIA acknowledges naturally: "Nice, that's 3 actions done today"
- D) Adapted by motivation tier: immediate celebration for low, subtle for high

**Answer:** `FINAL`

Micro-wins are integrated into the RPG gamification system. Completing small actions grants XP immediately (small animation + XP popup), which feeds into the character leveling system. SIA can also acknowledge batched progress naturally ("Nice run today — that's 50 XP and 3 actions completed"). The celebration intensity adapts to the user's preference and the significance of the win.

### 10.4 Does gamification intensity adapt by motivation tier?

> *Direction Reset: "Low motivation: Heavy. Every tiny win celebrated. XP for logging in. | High motivation: Light. Focus on metrics and progress."*

Confirm: should the gamification system fundamentally change based on motivation tier?

**Answer:** `FINAL`

**Yes — motivation should always be a factor in everything.** The gamification intensity adapts:

- **Low motivation**: Heavy gamification. Every tiny win celebrated. XP for logging in. Lots of encouragement, frequent level-up moments, more visible progress indicators. The RPG elements (quests, rewards, XP popups) are maximized.
- **Medium motivation**: Balanced. Regular rewards and quest progress, but less hand-holding.
- **High motivation**: Lighter gamification. Focus on metrics, deep progress data, and meaningful milestones rather than constant celebrations. The RPG elements are still there but more subtle — these users are motivated by the data and the progress itself.

The gamification system should feel motivating regardless of tier, but the *intensity* adapts.

---

## 11. Subscription & Monetization

### 11.1 Free vs paid — what can free users access?

> *Old meeting: AI coach as base offering, modules as add-ons.*

What's the free experience? Can they:
- Chat with SIA? (how many messages/sessions?)
- See the dashboard/home screen?
- Track goals in 1-2 life domains?
- Use basic features (journal, habits, mood)?
- See cross-domain insights?

**Answer:** `FINAL`

**Free tier should have the least AI features, or none at all.** The free experience provides:

- Basic dashboard/home screen access
- Limited goal tracking (1-2 life domains)
- Basic features (journal, habits, mood — without AI enhancement)
- No or very limited SIA coaching (perhaps a few introductory messages)
- No cross-domain insights (this is the AI intelligence layer — premium only)

AI features are the core value proposition and the primary cost driver. Paid users get the full SIA coaching experience, cross-domain intelligence, and the RPG gamification system. The key principle: **don't make it loss-making** — AI costs are real, and the subscription needs to cover them.

This follows the model of Claude/ChatGPT tiers where the AI capability is the differentiator between free and paid.

### 11.2 Subscription model — tiered plans or modular?

> *Old meeting: Discussed custom pick-your-modules pricing alongside pre-built tiers.*

- A) Pre-built tiers (Basic/Pro/Premium) — simple, clear
- B) Modular by life domain (Fitness $X, Finance $Y, etc.) — flexible but complex
- C) Both: pre-built tiers as defaults, custom build-your-own as advanced option
- D) Usage-based: pay for AI conversation time + premium features

**Answer:** `FINAL`

**A) Pre-built tiers (Basic/Pro/Premium) — simple and clear.** Inspired by the Claude model tier structure:

- **Basic (Free)**: Limited features, no AI coaching, basic goal tracking
- **Pro**: Full SIA coaching, cross-domain insights, all life domains, RPG gamification, moderate AI usage
- **Premium**: Unlimited SIA, advanced analytics, priority AI processing, full RPG features, family/team features

Pre-built tiers are simpler for users to understand and choose from. Modular pricing adds unnecessary complexity and decision fatigue. Clear tiers with clear value at each level.

### 11.3 How do you handle "locked" features?

When a free user encounters a paid feature:
- A) Blurred preview with upgrade prompt
- B) Don't show it at all until they upgrade
- C) One free trial, then lock
- D) Grayed out with lock icon and brief explanation
- E) SIA mentions the feature naturally: "I could help with your budget if you unlock Finance" — conversational upsell

**Answer:** `FINAL`

**A multi-strategy approach based on industry best practices:**

- **Contextual, dynamic paywalls**: When a free user tries to access a premium feature, the upgrade prompt should be tailored to what they were trying to do — not a generic "Upgrade to Pro" wall. Like Duolingo, the top benefit shown should match the feature they attempted to use.
- **Blurred preview with upgrade prompt (A)**: For data-rich features (cross-domain insights, detailed analytics), show a blurred preview so users can see what they're missing.
- **Conversational upsell via SIA (E)**: SIA can naturally mention premium features in conversation — *"I noticed a pattern between your spending and stress levels — upgrade to Pro to unlock cross-domain insights."*
- **One free trial (C)**: For key premium features, offer a one-time trial so users can experience the value before committing.
- **Transparency**: Always show the user what's available and what it costs. Never hide features entirely — let users see the full picture and decide for themselves.

The key insight from best practices: dynamic, contextual paywalls (where the messaging adapts to what the user was trying to do) outperform static, generic upgrade prompts significantly.

### 11.4 AI usage limits — credit system?

> *Old meeting: Discussed credit-based system, ~10 min sessions, ~$5/user/month AI cost target.*

Is there a cap on SIA usage?
- A) Unlimited within plan
- B) Credit/token system visible to user
- C) Soft daily limit: SIA gently suggests coming back tomorrow after extended use
- D) Tiered: free gets X messages/day, paid gets unlimited

**Answer:** `FINAL`

**Tiered approach based on industry best practices:**

- **Free tier**: Limited messages per day (e.g., 5-10 messages/day) — enough to experience SIA but creating a natural upgrade incentive.
- **Pro tier**: Generous daily limits with a real-time usage meter visible to the user. Transparent, predictable limits (like Claude's approach) rather than opaque degradation.
- **Premium tier**: Unlimited or near-unlimited usage.

**Best practices applied:**
- **Transparency is critical**: Show real-time usage meters. Users should always know how many messages/credits they have left. Opaque degradation (like ChatGPT's approach) frustrates users.
- **Soft limits over hard blocks**: When users approach their limit, SIA can suggest coming back tomorrow rather than abruptly cutting off — maintaining the coaching relationship feel.
- **Graceful degradation**: On paid tiers, if a user exceeds normal usage, route to a lighter AI model rather than blocking entirely — keeps them engaged while managing costs.

---

## 12. Visual & Emotional Design

### 12.1 Dark mode is primary — how dark?

> *Brand spec: `ink-900 #0A0A0F` primary background.*

- A) Near-black everywhere (current brand spec) — premium, cinematic
- B) Warmer dark with brown undertones (`#0C0603`) — more human, less tech
- C) Mix: pure dark for backgrounds, warm dark for card surfaces (ink-brown-800 cards on ink-900 base)

**Answer:** `FINAL`

**Follow the established brand guidelines.** The brand spec defines:

- **Primary background**: `ink-900 #0A0A0F` (near-black, premium, cinematic)
- **Elevated surfaces**: `ink-brown-800 #211008` (warm brown undertones for cards and elevated elements)
- **This creates a natural mix (C)**: Pure dark base with warm brown card surfaces

The exact darkness level should follow the brand guidelines rather than deviating — the design system has already been carefully calibrated. The `ink-900` base with `ink-brown-800` elevated surfaces creates the premium, cinematic feel while the warm brown undertones keep it human and approachable.

### 12.2 Light mode — how important?

- A) Not needed for v1 — dark only
- B) Available as toggle but dark is default and primary
- C) Equal priority — some users strongly prefer light

**Answer:** `FINAL`

**B) Available as toggle, but dark is default and primary.** Based on best practices:

- Over 60% of users toggle between modes based on device settings or time of day
- Both Apple and Google design guidelines now expect dark mode support as standard
- Offering only one mode alienates a significant user segment

However, dark mode is the **primary design target** — the brand identity is built around the dark aesthetic. Light mode should be available and well-implemented (using `paper-100 #FEFAF3` as the light background per brand guidelines), but dark mode is the flagship experience. Light mode can follow the system setting by default, with a manual toggle in settings.

**Color guidelines for light mode**: Soft backgrounds (#FEFAF3), dark text (#333 range), avoiding pure white to prevent excessive contrast. The brand's warm palette translates naturally to a warm light mode.

### 12.3 How much animation and motion?

The brand supports rich motion (GSAP, Framer Motion, parallax). Where does each area land?

| Area | Level |
|------|-------|
| Landing page (public) | Cinematic / Polished / Minimal |
| Onboarding | |
| Home/Dashboard | |
| SIA chat | |
| Feature screens (workouts, nutrition, etc.) | |
| Settings/Profile | |
| Celebrations/Achievements | |

**Answer:** `FINAL`

Based on best practices (animations should be functional, not decorative; 200-500ms sweet spot; physics-based easing over linear):

| Area | Level | Rationale |
|------|-------|-----------|
| **Landing page (public)** | Cinematic | First impression. Rich parallax, GSAP sequences, brand signature motion. Creates the "wow" moment. |
| **Onboarding** | Polished | Higher animation density is acceptable during onboarding — creates delight, explains features, builds excitement. Smooth transitions between steps. |
| **Home/Dashboard** | Polished | Subtle but intentional. Smooth card transitions, progress ring animations, gentle scroll effects. Not distracting from content. |
| **SIA chat** | Polished | Typing indicators, message appear animations, smooth inline card renders. The avatar should have reactive animations. Keep it fast (200-300ms) so conversation feels real-time. |
| **Feature screens** | Minimal to Polished | Data-heavy screens (nutrition macros, finance charts) lean minimal — focus on readability. Interactive screens (workout tracking, habit logging) lean polished with feedback animations. |
| **Settings/Profile** | Minimal | Users expect stability and speed in settings. Standard toggle animations, simple transitions. |
| **Celebrations/Achievements** | Cinematic | This is where animation earns its keep. Full-screen celebrations, confetti, XP gain animations, level-up sequences. The RPG gamification moments should feel rewarding and grand. |

**Motion guidelines per brand**: Always use `--ease-flow` (cubic-bezier(.65,.05,.36,1)) for signature moments and `--ease-out-soft` (cubic-bezier(.22,.61,.36,1)) for standard UI. Never use linear easing. Durations: 160ms (fast interactions), 280ms (standard), 520ms (slow/dramatic), 1.2s (flow/cinematic).

### 12.4 The continuous stroke line — where does it appear?

> *Brand guidelines: hero sections, dividers, transitions, onboarding, achievements. NOT on data-heavy screens.*

Specifically: home screen? SIA chat? Achievement celebrations? Onboarding only? Domain transitions?

**Answer:** `FINAL`

**Follow the brand guidelines.** The continuous stroke line was created to resemble the life journey while making the design more unique. Per the brand spec, it appears in:

- **Hero sections** (landing page, onboarding welcome)
- **Dividers** between major sections
- **Transitions** between screens or states
- **Onboarding** flow — guiding the user through the journey
- **Achievement celebrations** — marking milestones in the life journey
- **Domain transitions** — when moving between life areas

It should **NOT** appear on data-heavy screens (dashboards, finance analytics, workout logs) where it would compete with content. The stroke is a brand signature element — used deliberately for emotional moments and transitions, not as decoration.

### 12.5 Photography vs illustration vs abstract?

For empty states, onboarding, marketing, feature headers:
- A) Warm photography of real people (brand default)
- B) Custom illustrations (playful, scalable)
- C) Abstract gradients and shapes (techy, less personal)
- D) Mix depending on context

**Answer:** `FINAL`

**A mixture of A and B.** Warm photography of real people combined with custom illustrations, depending on context:

- **Onboarding and marketing**: Warm photography — real people, real moments, relatable. Builds trust and emotional connection.
- **Empty states and feature explanations**: Custom illustrations — playful, scalable, and consistent with the brand. Easier to maintain and adapt.
- **The mix builds trust**: Photography makes Balencia feel human and real; illustrations make it feel approachable and designed. Together, they create a premium, trustworthy experience.

### 12.6 Icon style — outlined or filled?

> *Brand guidelines: "Rounded, 2px stroke, outlined only, 24px minimum."*

Still aligned? Life domain icons use specific colors (Career: indigo, Relationships: pink, Creativity: amber, Spirituality: purple, Finance: emerald, Fitness: red, Learning: cyan). Should active states use filled variants?

**Answer:** `FINAL`

**Follow the brand guidelines.** Rounded, 2px stroke, outlined only, 24px minimum. Life domain icons use their designated colors:

- Career: Indigo (#6366f1)
- Relationships: Pink (#ec4899)
- Creativity: Amber (#f59e0b)
- Spirituality: Purple (#8b5cf6)
- Finance: Emerald (#10b981)
- Fitness: Red (#ef4444)
- Learning: Cyan (#06b6d4)
- Custom: Slate (#64748b)

Active states can use filled variants to provide clear visual feedback for selected/active states while maintaining the outlined style as default. This follows the existing brand specification.

---

## 13. Platform & Responsiveness

### 13.1 What is the primary platform?

> *Direction Reset: "Web-first confirmed. No mobile native app for now."*

- A) Mobile-first web (designed for phones, scales up to desktop)
- B) Desktop-first web (designed for desktop, responsive down to mobile)
- C) Truly equal — both experiences are primary
- D) Mobile-first, but SIA voice mode is the primary mobile experience while desktop gets the full dashboard

**Answer:** `FINAL`

**Mobile app is the focus.** The entire UI/UX redesign targets the mobile app experience. This is a mobile-first product — designed for phones as the primary interaction device. The UI should feel native, fast, and focused on the mobile form factor. Desktop is not being worked on at this time.

### 13.2 Are there features that are mobile-only or desktop-only?

Examples: voice interaction is naturally mobile, knowledge graph visualization is naturally desktop. Any deliberate platform-specific features?

**Answer:** `FINAL`

**Mobile app is the sole focus.** There is no desktop app being developed at this time. All features are designed for mobile. Voice interaction, knowledge graph, and all other features should be optimized for the mobile experience.

### 13.3 Should the mobile experience feel like a native app?

Bottom tab bar, swipe gestures, pull-to-refresh, haptic-style feedback? Or clearly a web app that's responsive?

**Answer:** `FINAL`

**Yes — the mobile experience should feel like a native app.** Bottom tab bar, swipe gestures, pull-to-refresh, smooth transitions, and haptic-style feedback. The user should not be able to tell the difference between Balencia and a native iOS/Android app. This means:

- Native-feeling navigation (bottom tab bar, stack-based navigation)
- Gesture support (swipe to go back, pull-to-refresh, swipe actions on cards)
- Smooth, native-speed animations (no web-app jank)
- Haptic-style feedback on interactions
- Full-screen experiences where appropriate (voice calls, celebrations)

---

## 14. Notifications & Engagement

### 14.1 What are the top 3 notification types?

Pick from:
- SIA proactive AI insights/suggestions
- Goal progress milestones
- Streak alerts (about to break)
- Daily check-in prompt
- Prayer/spiritual reminders
- Workout/meal reminders
- Social activity (friend achieved something)
- Cross-domain connection discovered
- Scheduled action reminders
- Budget alerts
- Community messages

**Answer:** `FINAL`

The top 3 notification types:

1. **SIA proactive AI insights/suggestions** — The core value prop. SIA reaching out with intelligent observations, connections, and recommendations.
2. **Reminders** — Action reminders, scheduled tasks, workout/meal/prayer reminders. Keeping the user on track with their commitments.
3. **Check-in prompts** — Daily check-ins, streak alerts, and engagement nudges that keep the user coming back.

### 14.2 Push vs in-app balance?

- A) Most things in-app only, push reserved for critical (SIA proactive messages, streak about to break)
- B) User configures per category
- C) Adapted by motivation tier: low gets fewer but more impactful pushes, high gets more frequent nudges
- D) Aggressive push to drive engagement

**Answer:** `FINAL`

**C) Adapted by motivation tier.** Notification frequency automatically adapts:

- **Low motivation**: Fewer but more impactful push notifications — only the most important insights and gentle reminders. Max 1/day per the Direction Reset guideline.
- **Medium motivation**: Moderate push frequency — 2-3/day, mixing insights, reminders, and check-ins.
- **High motivation**: More frequent nudges — 5+/day, including accountability prompts, detailed progress updates, and challenge notifications.

Users can always override and configure per category in settings, but the default behavior is motivation-tier-adapted.

### 14.3 Proactive AI timing — does it adapt?

> *Direction Reset: Low motivation = max 1/day, gentle. Medium = 2-3/day. High = 5+/day, accountability nudges.*

Should notification frequency automatically adapt based on motivation tier and engagement patterns?

**Answer:** `FINAL`

**Yes.** Notification frequency and timing should automatically adapt based on both motivation tier and engagement patterns. SIA should learn when the user is most receptive (morning vs evening, weekday vs weekend) and optimize notification timing accordingly. The motivation tier sets the baseline frequency, and engagement patterns refine the timing.

---

## 15. Data, Privacy & Transparency

### 15.1 How transparent should AI data usage be?

When SIA gives an insight ("Your workouts improve after 7+ hours of sleep"), should the user see exactly what data was used? A "show me the data" expandable?

**Answer:** `FINAL`

**Yes and No — selective transparency.** Users should understand that SIA is using their data intelligently, and they should have access to their Personal Wiki where they can see and edit what Balencia knows. However, the full logic and proprietary correlation algorithms should not be fully exposed — this would reveal the proprietary Life Correlation Matrix methodology.

The balance:
- **Transparent**: What data is collected, what SIA knows about them (via Personal Wiki), and the general basis for insights
- **Protected**: The specific algorithms, correlation logic, and proprietary intelligence methods that power the insights

Users can see their data and edit it, but the *how* behind the connections remains Balencia's intellectual property.

### 15.2 Data export — is this a feature?

Can users download their data (goals, activities, journal entries, finance records, mood history)?

**Answer:** `FINAL`

**No — data export is not a feature for v1.** Users interact with their data through the app (Personal Wiki, goal tracking, history). A formal data export/download feature is not prioritized.

### 15.3 Integration data — how is it presented?

WHOOP, Spotify, Google Calendar data flows into Balencia. Is there a "Connected Services" dashboard? Or is integration data silently woven into the AI's understanding?

**Answer:** `FINAL`

**Yes, there is a Connected Services dashboard.** Users can view and manage their integrations (WHOOP, Google Calendar, Spotify, etc.) in a dedicated Connected Services section within settings. The integration data flows into SIA's understanding seamlessly, but users should have visibility and control over which services are connected, what data is being synced, and the ability to connect/disconnect services.

---

## 16. Content & Education

### 16.1 Blogs and articles — part of the app or separate?

Current: `/blogs` with articles. Is this core to the experience, a marketing/SEO play, or SIA-delivered ("Here's an article relevant to your goal")?

**Answer:** `FINAL`

**Yes — blogs and articles should be part of the app.** They serve dual purposes:

- **In-app content**: SIA can recommend relevant articles to users based on their goals and current challenges — *"Here's an article about building morning routines that might help with your consistency goal."*
- **Marketing/SEO**: The blog section also drives organic traffic and establishes Balencia as a thought leader in life coaching.

Content should feel integrated into the coaching experience, not like a separate marketing section.

### 16.2 Webinars — live or on-demand?

Current: `/webinars` with event pages. Live sessions, recorded library, both, or cut for v1?

**Answer:** `FINAL`

**Recorded libraries.** On-demand, recorded content that users can access at any time. Live webinars add scheduling complexity and may not scale well — a library of recorded sessions, courses, and educational content is more accessible and can be recommended by SIA contextually.

### 16.3 Help center — standalone or SIA-powered?

- A) Standalone `/help` page with FAQ and guides
- B) SIA-powered: "Ask SIA for help" — the AI IS the help center
- C) Both: traditional help page + SIA can answer help questions
- D) Contextual tooltips only — no dedicated help page

**Answer:** `FINAL`

**C) Both: traditional help page + SIA can answer help questions.** A traditional help page with FAQ and guides serves as a reference, while SIA can also answer help questions conversationally. This ensures users can get help however they prefer — browsing a help center or asking SIA directly. The traditional help page also reduces AI costs for common support queries.

---

## 17. Screen Priority Ranking

Rank these screen groups by redesign priority (1 = first). This determines the order we design and build.

| Screen Group | Priority | Notes |
|---|---|---|
| **Landing page** (public marketing site) | | |
| **Onboarding flow** (first-time user experience) | | |
| **Home / Today** (daily experience after login) | | |
| **AI Coach (SIA)** chat + voice experience | | |
| **Goals & Plans** (life goal tracking, decomposition, progress) | | |
| **Life Areas overview** (holistic life view) | | |
| **Fitness & Workouts** (exercise library, tracking, AI plans) | | |
| **Nutrition** (meal plans, logging, macros) | | |
| **Wellbeing hub** (journal, mood, habits, breathing, meditation) | | |
| **Finance / Money Map** (budgets, spending, savings goals) | | |
| **Schedule & Calendar** (daily planning, Google Cal sync) | | |
| **Community & Social** (leaderboard, competitions, challenges) | | |
| **Knowledge Graph** (life connections visualization) | | |
| **Explore page** (module/feature discovery) | | |
| **Profile & Settings** | | |
| **Subscription & Billing** | | |
| **Admin panel** | | |
| **Spirituality features** (prayer times, reflection, faith practices) | | |
| **Learning features** (courses, books, skill tracking) | | |
| **Creativity features** (creative practice, projects) | | |

**Answer:** `FINAL`

Everything is being redesigned from scratch. The priority ranking reflects the user journey — design the screens users encounter first, then build outward to the full experience:

| Screen Group | Priority | Notes |
|---|---|---|
| **Landing page** (public marketing site) | 1 | First impression. Sets the emotional tone. Must convey "AI Life Coach" identity instantly. |
| **Onboarding flow** (first-time user experience) | 2 | The emotional arc from recognition → motivation → excitement. Chatbot-driven with SIA. |
| **Home / Today** (daily experience after login) | 3 | The screen users see every day. SIA-forward, adaptive density, cross-domain tags. |
| **AI Coach (SIA)** chat + voice experience | 4 | The core product. Merged chat + coach. Rich inline cards, voice mode, 3D avatar. |
| **Goals & Plans** (life goal tracking, decomposition, progress) | 5 | The user's primary interaction point for tracking progress. RPG quest system integration. |
| **Life Areas overview** (holistic life view) | 6 | The holistic view — life wheel, domain colors, cross-domain connections. |
| **Explore page** (module/feature discovery) | 7 | Gateway to all features. Grid layout, domain-categorized, AI recommendations. |
| **Fitness & Workouts** (exercise library, tracking, AI plans) | 8 | Full domain dashboard — AI-generated plans, WHOOP integration, exercise history. |
| **Nutrition** (meal plans, logging, macros) | 9 | Full domain dashboard — AI meal suggestions, macro tracking, food logging. |
| **Wellbeing hub** (journal, mood, habits, breathing, meditation) | 10 | Consolidated from 10+ sub-modules into 2-3 coherent screens. |
| **Finance / Money Map** (budgets, spending, savings goals) | 11 | Full finance dashboard (Mint/YNAB level) with life-system intelligence. |
| **Spirituality features** (prayer times, reflection, faith practices) | 12 | AI-adaptive — adjusts to user's faith practice without rigid religious UI. |
| **Schedule & Calendar** (daily planning, Google Cal sync) | 13 | Daily planning integrated with Google Calendar sync. |
| **Profile & Settings** | 14 | Preferences, connected services, subscription management, Personal Wiki access. |
| **Subscription & Billing** | 15 | Clear tier presentation (Basic/Pro/Premium), upgrade flows. |
| **Learning features** (courses, books, skill tracking) | 16 | Full domain dashboard — reading goals, course tracking, skill development. |
| **Creativity features** (creative practice, projects) | 17 | Full domain dashboard — project tracking, creative practice logging, inspiration. |
| **Knowledge Graph** (life connections visualization) | 18 | Power-user feature — interactive visualization of life connections (Balencia City concept). |
| **Community & Social** (leaderboard, competitions, challenges) | 19 | Deprioritized but kept — leaderboards, challenges, accountability partners. |
| **Admin panel** | 20 | Not a priority — separate layout, minimal UI/UX investment. |

---

## 18. Open Questions & Wild Card

### Previous meeting open questions

**Q1: Chatbot-driven vs traditional onboarding?**
> *Covered in Section 3.2*

**Q2: How does SIA deep-link into modules?**
> *Covered in Section 2.4*

**Q3: Credit system vs unlimited AI chat per plan?**
> *Covered in Section 11.4*

**Q4: What goes on the home/dashboard page?**
> *Covered in Section 5.1*

**Q5: Community-created modules — scope for v1?**

**Answer:** `FINAL`

Deprioritized for v1. Community-created modules are not in scope for the initial redesign. Focus is on polishing the core AI coaching experience and the existing feature set. Community features (including user-generated content and modules) can be explored after the core experience is solid.

**Q6: Voice-first interaction — how prominent?**
> *Covered in Section 2.5*

### 18.0 How does gamification interact with the Life Correlation system?

> *From May 18 meeting (Q6): This interaction was flagged for a future design session but never resolved.*

The RPG gamification system (quests, XP, skill trees, leveling) and the Life Correlation system (cross-domain insights, proprietary data) are both central to Balencia. How do they connect?

- Could cross-domain correlations unlock special "epic quests" (e.g., discovering that sleep affects productivity triggers a new quest)?
- Could quest completion in one domain grant bonus XP in correlated domains?
- Could the Life Correlation system itself be gamified (a "Connections Discovered" achievement track)?
- Should the RPG character's stats map to the life domain scores?

**Answer:** `OPEN`

This remains an unresolved design question. The integration of these two core systems — gamification and life correlation — could create something truly unique if done well: a game layer where the rules are derived from real cross-domain patterns in your life. Needs dedicated design exploration to determine how quests, XP, and progression interact with the dynamic correlation engine without feeling forced or arbitrary.

### 18.1 Is there a feature or experience that no existing app does that you want Balencia to pioneer?

Think about "Balencia sees what we can't see." What's the experience that makes someone say "I've never seen an app do THAT before"?

**Answer:** `FINAL`

**Connecting all parts of life into one intelligent system.** No existing app connects fitness, finance, faith, career, relationships, learning, and creativity into a single coaching experience that finds hidden correlations between them. The pioneering experience is the moment when SIA reveals a connection the user never noticed — *"Your spending goes up on days you skip exercise, and both spike when your sleep drops below 6 hours"* — and the user realizes that their life is a system, not a collection of separate problems.

This is what makes Balencia stronger and more powerful than a real-life coach. A human coach sees one domain at a time. Balencia sees the entire system simultaneously and finds patterns across it. That's the "holy shit" moment.

### 18.2 What's the one thing from the current app you absolutely want to keep?

**Answer:** `FINAL`

No strong attachment to any specific UI element from the current app. The focus is on the underlying intelligence and capability — the cross-domain AI, the knowledge graph, the coaching engine, the life correlation system. The UI/UX is being redesigned from scratch, but the powerful backend intelligence is what makes Balencia unique and must be preserved and surfaced better.

### 18.3 What's the one thing from the current app that must change?

**Answer:** `FINAL`

**Simplicity and complexity reduction.** The current app is too complex — 30+ sidebar items, fragmented modules, overwhelming feature density. The redesign must make everything simpler, less complex, and more approachable. The power should be there for those who want it, but the default experience should feel effortless and clean — inspired by Bevel's approach of making complex data feel simple.

### 18.4 Any apps, designs, or experiences that recently inspired you?

Share links, screenshots, or descriptions.

**Answer:** `FINAL`

**Bevel** — The primary design inspiration. Bevel is an all-in-one health app with an AI coach (Bevel Intelligence) that transforms complex health data into clean, actionable insights. Its UI is simple, warm, and approachable with:
- Visual clarity using rounded corners and accessible typography
- Smart contextualization of data without clutter
- Conversational coaching with customizable personality (Data Nerd, Guardian, Friend, Commander)
- Intuitive onboarding that immediately shows value

Bevel proves that you can have deep functionality without overwhelming the user. This is what Balencia should achieve across all 8+ life domains.

### 18.5 What would make a user tell a friend about Balencia?

Not a feature — the moment. The "holy shit" moment that makes them pull out their phone and show someone.

**Answer:** `FINAL`

**When it actually makes a difference in their life.** Not a feature, not a UI element — the moment when the user realizes that Balencia's coaching genuinely changed something. When they stuck to a 30-day streak because SIA held them accountable. When they saw the connection between their spending and stress and actually fixed it. When they lost the weight, saved the money, prayed consistently, got the promotion — and they can trace it back to Balencia's guidance.

The "pull out your phone" moment is when the Life Correlation insight is so accurate, so surprising, and so actionable that the user can't believe an app figured it out before they did. *"It told me my spending spikes on days I skip the gym — and it was right."*

---

> **Next step**: Once this questionnaire is reviewed and finalized, we'll use it as the input for screen design specs — starting with the highest-priority screens (Landing Page → Onboarding → Home/Today → SIA → Goals).
