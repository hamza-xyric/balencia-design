# The Life Correlation Matrix

> **Status:** Design Concept | **Author:** Hamza Muqeem | **Date:** 2026-05-22

---

## 1. Vision

Every life coaching app on the market treats life as a set of independent modules. Fitness apps track workouts. Nutrition apps count calories. Finance apps watch spending. Even apps that combine multiple domains treat them as separate silos with a shared dashboard. The user is left to manually toggle modules on and off: "I care about fitness, not finance. Include this, exclude that."

This is fundamentally wrong.

A person's life is not a collection of independent switches. It is a single interconnected system where everything influences everything else. Your sleep affects your workouts. Your workouts affect your mood. Your mood affects your spending. Your spending affects your stress. Your stress affects your sleep. The connections are everywhere, but no product maps them.

**The Life Correlation Matrix is that map.**

It is a weighted graph where every life domain is a node and every connection between domains has a strength. The AI uses this matrix as its internal compass — it determines what questions to ask, how deeply to probe, which trends to investigate, and when to surface cross-domain insights. The user never sees the matrix directly. They just experience a coach that seems to intuitively understand that asking about their sleep is relevant when they mention poor workouts, or that probing career stress matters when their nutrition falls apart.

This is what makes Balencia different from every other app: we don't ask the user what they care about. We already know, because **we understand that their whole life is correlated**.

### Why This Is the Differentiator

| Everyone Else | Balencia |
|---------------|----------|
| Binary module toggles (on/off) | Continuous correlation gradient (0.0 to 1.0) |
| User decides what's relevant | AI knows what's relevant based on real correlations |
| Modules exist in isolation | Domains exist in a connected graph |
| Cross-domain insights are accidental | Cross-domain insights are the core architecture |
| First useful insight after weeks | Useful from day one (base correlations) |
| Same question structure for everyone | Question priority shaped by individual's correlation map |

---

## 2. The Matrix Model

### 2.1 Nodes: The 10 Life Domains

The matrix operates on 10 life domains. These are the same domains used in the RPG stat system, ensuring consistency across the entire platform.

| # | Domain | What It Encompasses |
|---|--------|-------------------|
| 1 | **Fitness** | Exercise, physical activity, strength, endurance, recovery, body composition |
| 2 | **Sleep** | Sleep duration, quality, consistency, circadian rhythm, naps, restfulness |
| 3 | **Career** | Work performance, job satisfaction, professional growth, education, skills |
| 4 | **Nutrition** | Diet quality, meal timing, hydration, macros, supplements, food relationships |
| 5 | **Finance** | Spending habits, saving, financial stress, budgeting, financial goals |
| 6 | **Faith** | Spiritual practice, prayer, religious observance, purpose, meaning |
| 7 | **Productivity** | Focus, time management, task completion, routines, energy management |
| 8 | **Relationships** | Social connections, family, friendships, romantic relationships, community |
| 9 | **Wellbeing** | Emotional health, mood, stress, gratitude, journaling, self-awareness |
| 10 | **Meditation** | Mindfulness, breathwork, stillness, contemplative practice, presence |

### 2.2 Edges: Correlation Weights

Every pair of domains has a correlation weight between **0.0** (no meaningful correlation) and **1.0** (maximum correlation). The weight represents how strongly changes in one domain tend to affect the other.

The matrix is symmetric — if sleep affects fitness at 0.85, fitness affects sleep at 0.85. The weight is not causality; it is co-movement. Causality is determined by the AI through trend analysis, not by the matrix itself.

With 10 domains, the matrix contains **45 unique domain pairs** (10 choose 2). Every pair has a weight.

### 2.3 Three Layers

The matrix is not static. It operates in three layers that combine to produce the **effective correlation weight** for any user at any moment.

```
Effective Weight = blend(Base, Personal, Temporal)
```

#### Layer 1: Base Layer (Population-Level)

The foundation. Research-backed default correlations that apply to all users from day zero. These represent what is generally true for humans based on behavioral science, sleep research, nutritional psychiatry, and positive psychology.

The base layer is what makes the system useful immediately, before the AI has learned anything about the individual. A new user who sets a fitness goal will be asked about sleep and nutrition first — not because they told us to, but because the base layer knows these domains are strongly correlated with fitness for most people.

The base layer is maintained by the team and updated as research evolves. It is the same for all users.

#### Layer 2: Personal Layer (Individual-Level)

Learned correlations specific to this user. Built from observed data over time. As the AI tracks patterns — "this user's mood tanks whenever their spending spikes," "this user sleeps better on days they pray" — the personal layer captures these individual patterns and gradually overrides the base layer where they diverge.

The personal layer starts empty (all zeros, no confidence) and grows as data accumulates. It uses Bayesian updating: each new observation nudges the personal weight toward the observed correlation, with the strength of the nudge determined by confidence (more data = more confidence = stronger override).

The personal layer is what makes every user's experience unique. Two users with the same fitness goal will eventually get asked very different questions because their personal correlation maps are different.

#### Layer 3: Temporal Layer (Context-Level)

Dynamic adjustments based on what is happening right now. Time-sensitive modifiers that temporarily shift correlation weights based on:

- **Current trends**: If a user's sleep has been declining for a week, temporarily boost sleep's correlation with everything else (the AI should investigate sleep's ripple effects)
- **Calendar events**: Ramadan boosts faith↔nutrition and faith↔sleep correlations. Tax season boosts finance↔wellbeing. Holiday season boosts relationships↔wellbeing.
- **Life events**: Job change boosts career↔everything. New relationship boosts relationships↔everything. Injury boosts fitness↔wellbeing.
- **Seasonal patterns**: Winter may boost sleep↔wellbeing. Summer may boost fitness↔relationships.
- **Goal proximity**: As a deadline approaches, temporarily boost correlations with the goal domain.

The temporal layer is ephemeral. Adjustments decay as the triggering context passes.

#### How the Layers Combine

```
effective_weight(A, B) = 
    base_weight(A, B) * (1 - personal_confidence(A, B))
  + personal_weight(A, B) * personal_confidence(A, B)
  + temporal_modifier(A, B)

clamped to [0.0, 1.0]
```

- When `personal_confidence = 0` (new user, no data): effective weight = base weight
- When `personal_confidence = 1` (mature user, high data): effective weight = personal weight
- Temporal modifier adds or subtracts from the blended result (typically ±0.05 to ±0.20)

---

## 3. The Base Correlation Matrix

The full 10x10 base layer. These are default population-level weights, informed by established research on how life domains co-move. The diagonal is always 1.00 (a domain is perfectly correlated with itself).

|              | **FIT** | **SLP** | **CAR** | **NUT** | **FIN** | **FAI** | **PRD** | **REL** | **WEL** | **MED** |
|--------------|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|
| **Fitness**      | 1.00 | 0.85 | 0.35 | 0.80 | 0.25 | 0.20 | 0.50 | 0.35 | 0.75 | 0.45 |
| **Sleep**        | 0.85 | 1.00 | 0.55 | 0.60 | 0.20 | 0.25 | 0.75 | 0.35 | 0.80 | 0.70 |
| **Career**       | 0.35 | 0.55 | 1.00 | 0.30 | 0.80 | 0.30 | 0.75 | 0.45 | 0.60 | 0.35 |
| **Nutrition**    | 0.80 | 0.60 | 0.30 | 1.00 | 0.45 | 0.25 | 0.50 | 0.25 | 0.65 | 0.35 |
| **Finance**      | 0.25 | 0.20 | 0.80 | 0.45 | 1.00 | 0.25 | 0.50 | 0.35 | 0.55 | 0.20 |
| **Faith**        | 0.20 | 0.25 | 0.30 | 0.25 | 0.25 | 1.00 | 0.30 | 0.50 | 0.65 | 0.75 |
| **Productivity** | 0.50 | 0.75 | 0.75 | 0.50 | 0.50 | 0.30 | 1.00 | 0.40 | 0.60 | 0.55 |
| **Relationships**| 0.35 | 0.35 | 0.45 | 0.25 | 0.35 | 0.50 | 0.40 | 1.00 | 0.75 | 0.45 |
| **Wellbeing**    | 0.75 | 0.80 | 0.60 | 0.65 | 0.55 | 0.65 | 0.60 | 0.75 | 1.00 | 0.80 |
| **Meditation**   | 0.45 | 0.70 | 0.35 | 0.35 | 0.20 | 0.75 | 0.55 | 0.45 | 0.80 | 1.00 |

### Reading the Matrix

**High correlations (0.70+)** — domains that strongly co-move:
- Sleep ↔ Fitness (0.85): Physical performance is built on sleep
- Fitness ↔ Nutrition (0.80): You can't out-train a bad diet
- Sleep ↔ Wellbeing (0.80): Sleep deprivation is the fastest path to emotional instability
- Wellbeing ↔ Meditation (0.80): Meditation's primary impact is emotional regulation
- Career ↔ Finance (0.80): Income and career trajectory are directly tied
- Sleep ↔ Productivity (0.75): Cognitive performance depends on rest
- Career ↔ Productivity (0.75): Output quality drives career outcomes
- Fitness ↔ Wellbeing (0.75): Exercise → endorphins → mood
- Relationships ↔ Wellbeing (0.75): Social connection is the strongest predictor of life satisfaction
- Faith ↔ Meditation (0.75): Spiritual practice and contemplative practice overlap deeply
- Sleep ↔ Meditation (0.70): Meditation measurably improves sleep quality

**Moderate correlations (0.40-0.69)** — meaningful but indirect influence:
- Wellbeing ↔ Faith (0.65), Wellbeing ↔ Nutrition (0.65), Wellbeing ↔ Career (0.60)
- Sleep ↔ Nutrition (0.60), Sleep ↔ Career (0.55), Wellbeing ↔ Productivity (0.60)
- Finance ↔ Wellbeing (0.55), Meditation ↔ Productivity (0.55)
- Fitness ↔ Productivity (0.50), Nutrition ↔ Productivity (0.50), Finance ↔ Productivity (0.50)
- Faith ↔ Relationships (0.50), Nutrition ↔ Finance (0.45), Career ↔ Relationships (0.45)
- Fitness ↔ Meditation (0.45), Relationships ↔ Meditation (0.45)

**Low correlations (below 0.40)** — weak or highly indirect:
- Fitness ↔ Finance (0.25): Gym costs exist but the link is primarily indirect
- Faith ↔ Fitness (0.20): "Body as temple" exists but is culturally specific
- Finance ↔ Meditation (0.20): Stress reduction is the indirect path
- Finance ↔ Sleep (0.20): Very indirect unless financial stress is acute

### Structural Observations

**Hub domains** (high average correlation — connected to everything):
- **Wellbeing** (avg: 0.71) — the most connected domain. Emotional state both causes and is caused by nearly every other domain. This is why wellbeing check-ins are always relevant.
- **Sleep** (avg: 0.56) — the foundational physical domain. Poor sleep degrades almost everything.
- **Productivity** (avg: 0.54) — the output domain. It reflects the combined state of energy, focus, and stress.

**Cluster domains** (high correlation within a subgroup):
- **Physical cluster**: Fitness, Sleep, Nutrition (all 0.60+ with each other)
- **Professional cluster**: Career, Finance, Productivity (all 0.50+ with each other)
- **Inner life cluster**: Faith, Meditation, Wellbeing (all 0.65+ with each other)

**Bridge domains** (connect clusters):
- **Wellbeing** bridges all three clusters
- **Productivity** bridges physical and professional clusters
- **Relationships** bridges inner life and professional clusters

---

## 4. How the AI Uses the Matrix

The matrix is not a dashboard feature. It is the AI's internal reasoning framework. It shapes every interaction without the user ever seeing it.

### 4.1 Question Prioritization

When the AI needs to explore a user's life (onboarding, check-ins, trend investigation), it uses the matrix to decide the order and depth of questions.

**Algorithm:**

1. Identify the **anchor domain** — the user's primary goal or the domain currently showing the most significant trend
2. Retrieve the anchor's correlation weights with all other domains
3. Sort domains by effective weight (descending)
4. Ask questions about domains in that order, with depth proportional to weight

**Example:** User's primary goal is Fitness.

Sorted by correlation to Fitness:
| Rank | Domain | Weight | AI Behavior |
|------|--------|--------|-------------|
| 1 | Sleep | 0.85 | Ask detailed questions. "How's your sleep been?" "What time are you going to bed?" |
| 2 | Nutrition | 0.80 | Ask detailed questions. "What does your diet look like?" "Are you hitting your protein?" |
| 3 | Wellbeing | 0.75 | Ask moderate questions. "How are you feeling overall?" "Any stress lately?" |
| 4 | Productivity | 0.50 | Light check-in. "Is your schedule allowing enough time for training?" |
| 5 | Meditation | 0.45 | Light check-in. "Do you have any recovery or mindfulness practices?" |
| 6 | Career | 0.35 | Occasional. "Any big changes at work?" (only if other signals suggest relevance) |
| 7 | Relationships | 0.35 | Occasional. Same as career. |
| 8 | Finance | 0.25 | Rare. Only if financial stress is detected through other signals. |
| 9 | Faith | 0.20 | Rare. Only if user volunteers or cultural context triggers it. |

The user experiences this as a coach that naturally asks the right follow-up questions. They said they want to get fit — the coach asks about sleep and diet without being told to. Months later, the coach starts asking about stress and work. It feels intuitive because it IS intuitive; the correlations are real.

### 4.2 Onboarding Flow

During onboarding, the matrix prevents the AI from overwhelming the user. Instead of asking about all 10 domains, it focuses on the domains closest to the user's stated goal.

**Week 1-2**: Only domains with weight > 0.70 relative to primary goal
**Week 3-4**: Expand to domains with weight > 0.50
**Month 2-3**: Expand to domains with weight > 0.30
**Month 3+**: Full matrix active, all domains reachable

This creates the experience described in the vision: "During onboarding, it might not ask about anything apart from nutrition because everything else is not that high priority. And then as it goes on, we can ask more stuff."

### 4.3 Trend Investigation

When the AI detects a trend change in one domain (e.g., fitness performance declining), it uses the matrix to determine which other domains to investigate.

**Process:**
1. Detect: Fitness performance is declining
2. Look up: What domains are most correlated with Fitness?
3. Investigate (in order): Sleep (0.85) → Nutrition (0.80) → Wellbeing (0.75) → Productivity (0.50)
4. The AI asks: "I noticed your workouts haven't been as strong this week. How has your sleep been?" Before asking: "Has anything changed at work?"

If the investigation reveals that sleep is fine but nutrition has changed, the AI has just performed a differential diagnosis using the correlation matrix — without the user having any idea that a structured reasoning process occurred.

### 4.4 Insight Generation

The matrix tells the AI which cross-domain connections are worth looking for. If sleep↔fitness is 0.85, the AI should actively look for sleep-fitness correlations in the user's data. If faith↔finance is 0.25, it probably shouldn't spend computation looking there unless the personal layer has boosted it.

**Insight priority = correlation weight x data availability x novelty**

### 4.5 Conversation Depth Allocation

In any coaching session, the AI has limited conversational bandwidth. The matrix allocates it.

For a 10-minute check-in with a fitness-focused user:
- ~3 min on fitness itself
- ~2 min on sleep (weight 0.85)
- ~2 min on nutrition (weight 0.80)
- ~1.5 min on wellbeing (weight 0.75)
- ~1 min on everything else combined
- ~0.5 min on transitions and wrap-up

The user never notices the allocation. They just experience a coach that spends the right amount of time on the right things.

---

## 5. Matrix Evolution

### 5.1 Base Layer Maintenance

The base layer is curated, not computed. It is defined by the team based on:

- Peer-reviewed research on domain interdependencies
- Population-level data from the user base (once sufficient scale exists)
- Expert review from behavioral scientists and coaches

The base layer is versioned and updated periodically (quarterly review cadence). When updated, existing users' effective weights shift gradually as the new base blends with their personal layer.

### 5.2 Personal Layer Learning

The personal layer is built through observation. Every time the AI detects a co-movement between two domains, it updates the personal correlation.

**Observation sources:**
- **Direct data**: Logged metrics that move together (sleep quality and workout intensity on the same days)
- **Conversational signals**: User mentions connections ("I always eat badly when I'm stressed about money")
- **Behavioral patterns**: User engagement patterns (they log nutrition and fitness together, suggesting they think of them as connected)
- **Trend analysis**: When domain A shifts, does domain B follow within a window?

**Bayesian Update:**

```
personal_weight(A,B) = prior * (1 - learning_rate) + observed_correlation * learning_rate
personal_confidence(A,B) = min(1.0, data_points / confidence_threshold)
```

- `learning_rate`: How quickly new observations shift the personal weight (default: 0.1)
- `confidence_threshold`: Number of data points needed for full confidence (default: 60 — roughly 2 months of daily data)
- `prior`: Starts at 0.5 (neutral) and converges toward actual personal correlation

**Confidence schedule:**
| Data Points | Confidence | Effect |
|-------------|-----------|--------|
| 0-14 | 0.0-0.23 | Base layer dominates |
| 15-30 | 0.25-0.50 | Personal layer starts blending in |
| 31-60 | 0.50-1.00 | Personal layer approaches full weight |
| 60+ | 1.00 | Personal layer fully active |

### 5.3 Decay and Reinforcement

Correlations are not permanent. They decay without reinforcing observations and strengthen with repeated evidence.

- **Reinforcement**: Each confirming observation nudges the personal weight toward the observed value and resets the decay timer
- **Decay**: If no observation reinforces a personal correlation for 90 days, confidence begins to decay at 0.01/day, gradually shifting the effective weight back toward the base layer
- **Contradiction handling**: If observations consistently contradict the personal weight, the learning rate temporarily doubles to accelerate correction

This means a user's matrix is always current. If they change jobs and the career-wellbeing connection shifts, the personal layer will reflect that within weeks.

---

## 6. Example Scenarios

### Scenario A: Fitness-Focused User — First 3 Months

**User profile:** 28-year-old professional. Primary goal: get fit. No other goals stated.

**Day 1 (Onboarding — Base Layer Only):**

The matrix activates with base weights relative to Fitness:
- Sleep (0.85), Nutrition (0.80), Wellbeing (0.75), Productivity (0.50) ...

AI onboarding questions:
1. "What does your fitness routine look like right now?" (Fitness — anchor)
2. "How's your sleep been? Are you getting enough?" (Sleep — 0.85)
3. "What about your diet — any structure there?" (Nutrition — 0.80)
4. "And how are you feeling overall — energy, mood?" (Wellbeing — 0.75)

The AI does NOT ask about finance, faith, career, or relationships during onboarding. Not because they don't matter, but because they're too far from the anchor to feel natural this early.

**Week 3 (Expanding):**

The matrix opens to 0.50+ domains. The AI starts asking:
- "Is your schedule giving you enough time for workouts?" (Productivity — 0.50)
- "Have you tried any mindfulness or breathing work for recovery?" (Meditation — 0.45)

**Month 2 (Personal Layer Emerging):**

The AI has observed that this user's workout performance correlates strongly with their work stress (r=0.72 personal, vs 0.35 base). The personal layer pushes Career's effective weight from 0.35 toward 0.72.

Now career-related questions appear earlier in coaching sessions:
- "You mentioned work has been intense. How do you think that's affecting your energy for workouts?"

The user experiences this as the coach "getting to know them." The matrix made it happen.

**Month 3 (Mature Matrix):**

The user's personal correlation map now looks different from their initial base:
- Sleep → Fitness: Still 0.85 (confirmed by personal data)
- Career → Fitness: Now 0.68 (personal override — this user's career stress hits their fitness hard)
- Nutrition → Fitness: Dropped to 0.65 (this user eats consistently — nutrition isn't a variable)
- Faith → Fitness: Boosted to 0.45 (this user works out better on days they pray — discovered by AI)

That last discovery — faith↔fitness at 0.45 for this specific user when the base is 0.20 — is the kind of insight no other app could surface. It's personal, non-obvious, and only possible because the matrix is tracking all 45 domain pairs.

### Scenario B: Life Crisis — Temporal Layer in Action

**User profile:** Established user with mature personal layer. Recently lost their job.

**Temporal layer activation:** Job loss triggers a life event modifier:
- Career ↔ everything: +0.20 (career turmoil ripples everywhere)
- Finance ↔ everything: +0.15 (financial stress increases)
- Wellbeing ↔ everything: +0.10 (emotional impact of job loss)

**Effect on AI behavior:**

Before the event, this user's daily check-in was 60% fitness-focused. Now:
- Career questions are promoted significantly
- Finance questions appear where they previously didn't
- Wellbeing check-ins become deeper and more frequent
- The AI might say: "I know fitness is usually our main focus, but given what's happening with your job — how are you holding up? Is the stress affecting your sleep or eating?"

The temporal layer decays as the user stabilizes (new job, adjusted finances). The AI naturally transitions back to the user's baseline priorities.

### Scenario C: Discovery of Non-Obvious Correlation

**User profile:** Established user. The AI notices a pattern over 6 weeks:

- Days the user meditates → spending decreases the next day
- Days the user skips meditation → impulse spending spikes

Base correlation for Meditation ↔ Finance is 0.20 (low). But the personal layer is building toward 0.55.

Once confidence exceeds 0.50, the AI surfaces this:

> "I've noticed something interesting. On days you meditate, your spending the next day tends to be lower. It looks like mindfulness might be helping you make more intentional financial decisions. Want to explore this?"

This is an "Unimaginable Insight" — the kind that makes a user tell their friends about the app. It only exists because the matrix was quietly tracking all 45 domain pairs, even the ones with low base weights.

---

## 7. Visualization

### 7.1 Internal (AI-Only)

The primary use of the matrix is internal. The AI reads the matrix, reasons with it, and acts on it. The user experiences the matrix through the quality of coaching, not through a dashboard.

### 7.2 External (User-Facing — Optional)

The matrix CAN be visualized for the user, and this has significant marketing and engagement potential.

**Possible visualizations:**

**Constellation Map:** Domains as stars, with connecting lines whose brightness and thickness represent correlation strength. The user's life as a constellation — uniquely shaped to them. Their personal connections glowing differently than anyone else's.

**Force-Directed Graph:** Domains as nodes that pull toward each other based on correlation strength. Highly correlated domains cluster together. The graph is alive — it shifts as the user's life changes.

**Heatmap Matrix:** The 10x10 grid with color intensity showing correlation strength. Clean, data-forward, appeals to the Data-Driven Achiever persona (P3).

**Radar Overlay:** The RPG stat radar chart with correlation lines drawn between stats, showing which stats are linked.

### 7.3 Marketing Value

The visualization tells a powerful story:

> "This is your life. Everything is connected. We're the only app that understands that."

Landing page concept: An animated constellation that forms as the user scrolls. Each star lights up with a domain name. Lines draw between them with varying intensity. The tagline: **"Your life, connected."**

This directly communicates the value proposition that no competitor can match: unified whole-life intelligence, not a collection of separate trackers.

---

## 8. Relationship to Existing Systems

### 8.1 Replaces "Three Pillars" Thinking

The platform previously organized around three pillars (Fitness, Nutrition, Wellbeing), then evolved to 8 life domains, then to 10 in the RPG system. The Life Correlation Matrix is the natural evolution: domains are no longer just a list — they are a connected graph with quantified relationships.

The matrix does not change what the domains are. It changes how the AI thinks about the relationships between them.

### 8.2 Integrates with the Existing Correlation Engine (E8/F8.1)

The current correlation engine (health-correlation.service.ts, 6 SQL-based detectors) computes correlations from observed data. This is the **data source for the Personal Layer**.

The existing engine answers: "What correlations exist in this user's data?"
The matrix answers: "Given these correlations, what should the AI do?"

The correlation engine feeds the matrix. The matrix drives the AI. They are complementary, not competing.

### 8.3 Feeds the RPG Stat System

In the RPG system, the 10 domains map to 10 stats. The Life Correlation Matrix adds a layer: stat interdependencies. When a user's Sleep stat improves, the matrix predicts which other stats should respond — and the RPG system can reflect this.

Possible RPG integration:
- "Your Sleep stat rose to 72. Because sleep strongly correlates with your Fitness (0.85), expect your Fitness stat to respond over the next few days."
- XP bonuses for improving a domain that positively ripples across the matrix
- "Chain reactions" in the RPG narrative when multiple correlated domains improve together

### 8.4 Drives the Memory and Wiki Systems

The matrix informs what the Memory Engine should pay attention to. High-correlation domain pairs are higher priority for memory extraction. If sleep↔fitness is 0.85, observations about sleep-fitness connections should be extracted as memories more aggressively than observations about faith-finance connections (0.25).

Similarly, the Wiki system can organize user knowledge by correlation clusters rather than by isolated domain.

---

## 9. Naming

The internal system name is **Life Correlation Matrix**. For external/marketing purposes, consider names that convey the concept without the technical framing:

| Candidate | Feel |
|-----------|------|
| **LifeMap** | Simple, clear, memorable |
| **The Life Graph** | Technical but powerful |
| **Life Constellation** | Evocative, ties to star visualization |
| **LifeWeave** | Suggests interconnection |
| **The Whole-Life Engine** | Ties to existing "Whole-Life Intelligence" terminology |
| **LifeSync** | Suggests synchronization between domains |

The marketing name should be decided with the broader brand team. The system itself is always "Life Correlation Matrix" internally.

---

## 10. Summary

The Life Correlation Matrix is a weighted graph of 10 life domains with three layers (base, personal, temporal) that the AI uses as its internal compass for coaching. It replaces binary module thinking with a continuous gradient. It works from day one using research-backed base correlations and becomes increasingly personal over time. It drives question prioritization, trend investigation, insight generation, and conversation depth allocation — all invisibly. It can optionally be visualized for marketing and user engagement. It integrates with and enhances every existing system (correlation engine, RPG stats, memory, wiki).

It is the answer to: **"How does an AI life coach know what to ask about, when to ask it, and how deeply to go?"**

The answer is: **the matrix knows.**
