# Balencia — Glass Redesign Master Plan

> **What this is:** the single source of truth for redesigning every Balencia app screen into the new **warm-dark glassmorphism** language, produced as detailed hi-fi design specs, in batches of five.
>
> **What Balencia is:** a whole-life AI coach (**CIA** — the coach persona; *Balen + CIA* = Balencia) that connects six life pillars and reveals the connections between them — honest, premium, conversation-first.
>
> **Owner:** Hamza (graphic direction) · **Status:** Plan — awaiting sign-off before Batch 1 · **Created:** 2026-07-06

---

## 0. Locked Decisions

| Decision | Locked value |
|---|---|
| **Platform** | Native mobile app (iOS + Android). The rough desktop web app is *not* a reference. |
| **Theme** | **Dark only, now.** Warm-dark base. Light mode is a later toggle — not designed in this pass. |
| **Surface language** | **Glassmorphism** — *selective* glass on a solid warm-dark base (glass for hero cards, chips, nav, sheets, overlays; data cards solid where legibility demands). |
| **Signature move** | **Semantic inner-glow** — colored light bleeding from inside cards: **orange = you/effort**, **green = done/growth**, **purple = CIA/AI**. One glow color per surface. |
| **Color** | 60/30/10 — Burnt Orange `#FF5E00` · Forest Green `#34A853` · Royal Purple `#7F24FF`. |
| **Type** | Neue Montreal Medium (headings/UI + numbers) · Neue Montreal Light/Regular (body) · **Tiempos serif _italic_ Medium for the one emphasis word only**. Chillax = logo wordmark only. |
| **Scope** | All ~63 screens (66 incl. sub-screens), reusing existing `app_design/` draft content, re-skinned. |
| **Deliverable** | Hi-fi **markdown design specs**, 5 screens per batch. Plus one coded reference screen in Batch 1. |
| **Batch 1** | Onboarding hero flow (Splash → Motion Carousel → Sign Up → CIA Onboarding → Initial Plan Summary). |
| **North star** | Every screen must **connect** (feed the cross-pillar intelligence), be **honest** (real source or honest null), and feel **premium** (a funded product, not a template). |

**Reference DNA to honor (loose, not literal):** warm-dark base · orange as emotional lead · frosted glass cards + dark glass input pills · colored aurora inner-glow · big editorial grotesk headlines · heavily rounded, pill bottom-nav · grain/noise on gradients · glowing voice-first mic. Sources: Walk widget, Task cards, Testosterone-RX onboarding, Catalist, Futsal, Looped.

---

## 1. The Design Language (glass-dark v1)

Every spec obeys these tokens. Batch 0 expands this into a full component library; this section is enough to execute and to judge the direction.

### 1.1 Surfaces — warm dark

```css
--bg-base:    #0A0A0F;  /* ink-900, true base */
--bg-warm:    #0C0603;  /* warm zones */
--surface-1:  #140A05;  /* ink-brown-900, low elevation */
--surface-2:  #211008;  /* ink-brown-800, cards */
--surface-3:  #2A1510;  /* elevated / hover */
```

**Screen atmosphere** (why glass reads as glass): every screen sits on a soft warm radial glow, never flat black. CIA moments add a purple pool. A 3–4% grain overlay gives premium tactility.

```css
.screen-atmosphere{
  background:
    radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%),
    var(--bg-base);
}
/* + noise/grain layer at 3–4% opacity, mix-blend soft-light */
```

### 1.2 Glass tiers

```css
/* Default card on dark — most surfaces */
.glass-card{
  background: rgba(255,255,255,.045);
  backdrop-filter: blur(28px) saturate(120%);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 28px;
  box-shadow: 0 18px 48px rgba(33,16,8,.45),      /* warm ambient */
              inset 0 1px 0 rgba(255,255,255,.12); /* top edge light */
}

/* Immersive frost — onboarding, over colorful glow backgrounds */
.glass-frost{
  background: rgba(255,255,255,.10);
  backdrop-filter: blur(48px) saturate(130%);
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(0,0,0,.30),
              inset 0 1px 0 rgba(255,255,255,.40),
              inset 0 0 14px 6px rgba(255,255,255,.06);
}

/* Dark glass pill — inputs, CTAs-in-card, chips (Catalist look) */
.glass-pill{
  background: rgba(10,10,15,.55);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,.10);
  border-radius: 999px;
}
```

**Rule:** never mix flat and glass in one composition. Data-dense screens lean on solid `--surface-2` cards with glass reserved for hero/nav/overlay.

### 1.3 Semantic inner-glow (the signature)

```css
.glow-you  { --glow:#FF5E00; }  /* you · effort · streak · active metric */
.glow-done { --glow:#34A853; }  /* done · growth · completion · positive delta */
.glow-sia  { --glow:#7F24FF; }  /* CIA · AI insight · projected · premium */

.glow{ position:relative; overflow:hidden; }
.glow::after{
  content:''; position:absolute; inset:auto 0 0 0; height:62%;
  background: radial-gradient(120% 100% at 50% 120%,
    color-mix(in srgb, var(--glow) 55%, transparent) 0%, transparent 70%);
  filter: blur(24px); pointer-events:none;
}
```

One glow per card. Glow choice is **meaning-driven**, not decorative (mirrors "one hero color per surface").

### 1.4 Color roles

- **Burnt Orange `#FF5E00` (60%)** — primary CTAs, the user's line on charts, streaks/effort, active nav, hero accents.
- **Forest Green `#34A853` (30%)** — completion, positive deltas, milestones, recovery, "done."
- **Royal Purple `#7F24FF` (10%)** — CIA voice, insight chips, projected/AI data, premium.
- **Domain tag colors** (tags/icons only, never chrome): Fitness `#ef4444` · Nutrition `#84cc16` · Mental/Wellbeing `#14b8a6` · Finance `#10b981` · Career `#6366f1` · Relationships `#ec4899` · Spirituality `#8b5cf6` · Learning `#06b6d4` · Creativity `#f59e0b`.

### 1.5 Typography

Two families carry the whole system: **Neue Montreal** (all UI — headings, body, numbers) and **Tiempos** serif **_italic_** for the single emphasis word the eye should land on. The grotesk + serif-italic-accent pairing is the signature of the premium/editorial feel.

| Level | Font / weight | Mobile size | Use |
|---|---|---|---|
| Display | Neue Montreal Medium 500 | 34–52 | Editorial hero moments. One per screen. |
| H1 | Neue Montreal Medium 500 | 30–34 | Page titles |
| H2 | Neue Montreal Medium 500 | 24–28 | Section headings |
| H3 | Neue Montreal Medium 500 | 19–22 | Card titles |
| Body | Neue Montreal Regular 400 | 15–16 | Body / UI |
| Body light | Neue Montreal Light 300 | 15–16 | Quiet supporting sub-copy |
| Caption | Neue Montreal Light/Regular | 12 | Meta / timestamps |
| Overline | Neue Montreal Medium, +0.14em, uppercase | 11 | Section labels |
| **Emphasis word** | **Tiempos Medium _italic_** | matches its line | **The one word to spotlight (e.g. _CIA_, _whole_, _Quick_). One accent per moment, max.** |
| **Stat / KPI** | **Neue Montreal Medium, `tabular-nums`** | context | All numbers/scores |

Sentence case everywhere. No exclamation marks. Emphasis = serif italic (never colour, never more than one per moment). Chillax = logo wordmark only, never in UI. *Licensed fonts (Neue Montreal / Tiempos); free stand-ins (Hanken Grotesk / Newsreader italic) only in web comps.*

### 1.6 Shape · spacing · motion

- **Radii:** cards 28 (`--r-xl`), hero cards 40 (`--r-2xl`), inputs 14, chips/pills 999. Heavily rounded.
- **Spacing:** 4px base, 8pt grid for components, 24/32 for sections.
- **Bottom nav:** floating glass pill bar, 4 tabs (Today · CIA · Goals · Me), active = orange filled icon + label.
- **Motion:** physical easing (never `linear`); 150–250ms UI feedback; subtle glow "breathe" on hero cards; continuous-stroke line motif for hero/celebration only; animate `transform`/`opacity` on hot paths; respect `prefers-reduced-motion`.
- **Icons:** rounded 2px outline; filled when active; min 24px; domain icons in domain colors.

### 1.7 Data-viz & honesty (non-negotiable)

- Past/user data = **solid orange** line. Projected/AI = **dashed purple**. Milestones = **green dots**. No 3-color gradients; no dark gradients in charts.
- **Honesty invariant** — every metric ships three states:
  1. **Real** — value + provenance chip (e.g., `via WHOOP`, `you logged`).
  2. **Low-confidence** — muted value + confidence label (e.g., `estimated · low confidence`).
  3. **Honest null** — no fabricated number: `Not enough data yet — 3 more days` empty state.
- Never invent a score. An honest null is a *designed* state, not an error.

### 1.8 Core components (catalog expanded in Batch 0)

Glass stat card (+ semantic glow + provenance) · CIA insight card (purple glass + IntelligenceTimeline "checking your sleep…") · CIA chat (user bubble = orange, CIA = purple-tinted glass, rich inline artifact cards) · frosted selection card / MCQ chip (numbered, Testosterone-RX style) · glowing voice mic · buttons (primary orange / secondary / ghost / success green / coach purple) · progress ring & bar (orange fill → green complete) · domain tag chip · bento dashboard grid · confidence meter · celebration overlay · paywall (blurred premium preview) · states: skeleton / empty / error / success / disabled.

---

## 2. Screen Inventory → 14 Batches

Content is reused from `app_design/NN-*.md`; the visual language above is applied fresh. Batch 1 is fixed; batches 2+ are priority-ordered and reorderable. Auth-completion screens come later on purpose — they're visual derivatives of Batch 1 and low-risk.

| Batch | Theme | Screens (source draft #) |
|---|---|---|
| **0** | Foundation | Full Visual Language + component library + 1 coded reference screen |
| **1** ⭐ | Onboarding hero | 01 Splash · 02 Motion Carousel · 03 Welcome/Sign-Up · 07 CIA Onboarding · 08 Initial Plan Summary |
| **2** | CIA core + daily | 09 CIA Chat · 10 CIA Voice (in-chat) · 11 CIA Voice (full-screen) · 12 Home · 45 Daily Check-in |
| **3** | Goals & intelligence | 13 Goals List · 14 Goal Detail · 15 Create/Edit Goal · 16 Life Areas Overview · 48 Intelligence Dashboard |
| **4** | Me & identity | 17 Me Main · 18 Explore · 19 RPG Character · 20 Personal Wiki / CIA Memory · 50 Profile Edit |
| **5** | Account & system | 21 Settings · 22 Connected Services · 23 Subscription & Billing · 43 Paywall/Upgrade · 24 Notification History |
| **6** | Fitness domain | 26 Fitness & Workouts · 27 Workout Detail/Active · 55 Yoga · 58 Sleep Tracking · 49 Progress Photos |
| **7** | Nutrition domain | 28 Nutrition & Diet · 29 Meal Detail/Food Logger · 56 Recipes · 57 Shopping List · 44 Water Intake |
| **8** | Finance · Career · Relationships | 30 Money Map · 31 Transaction/Budget Detail · 32 Career & Work · 33 Relationships · 41 Schedule/Calendar |
| **9** | Wellbeing I | 37 Journal · 38 Habits · 52 Stress Management · 53 Breathing · 63 Energy Tracking |
| **10** | Wellbeing II / mind | 54 Meditation · 34 Spirituality · 62 Quick Notes · 60 Medication · 61 Reminders & Tasks |
| **11** | Growth & moments | 35 Learning & Growth · 36 Creativity · 59 Streak Details · 42 Celebration Overlay · 06 Guest Mode Preview |
| **12** | Social | 39 Leaderboard · 40 Community/Chat Rooms · 46 Accountability · 47 Competitions · 51 Voice Call History |
| **13** | Auth completion | 04 Sign In · 05 Forgot Password · 03b OTP · 03c Consent · 03d Complete Profile |
| **14** | Tail | 25 Help Center |

*All 66 drafts mapped, none duplicated.*

### 2.1 Batch 1 — Onboarding: locked UX decisions

These are decided (via the wireframe + UX gate) and ready to build. Batches 2–14 get their own gate before build.

- **Coach name:** CIA (*Balen + CIA*). Never "SIA."
- **Flow:** Splash → Motion Carousel → Sign Up → CIA Onboarding → Plan Summary → Home.
- **Pre-signup:** keep the **cinematic 4-panel carousel** (One life · Meet CIA · Everything connects · Gamified). An **"Explore as guest"** link lives on the **Sign-Up screen** → demo app with dummy data → prompt to sign up.
- **Sign-up:** **social-first** (Apple / Google one-tap) + email fallback.
- **CIA Onboarding:** hero = **CIA presence orb + ambient glow** (breathing, reactive). **Tap/chip-first, voice available** (mic present, not required). CIA **opens by offering two glass choice cards** — **Quick** (~1 min: areas + goals) vs **Deep** (~10–15 min: assessment + goals with 2–3 follow-ups each). Both converge on the Plan Summary.
- **Plan Summary:** **summary cards** (goal + 3 top actions + one cross-domain link, expandable "and N more"). **No RPG here** — first XP fires Day-1 *after the first completed action* (so no "Level 1 · 0 XP" on this screen).
- **Emphasis words** in Tiempos serif italic (e.g. _CIA_, _whole_, _Quick_, _Deep_).
- **Visual anchor:** `redesign/reference/07-cia-onboarding.html` — the reference comp that establishes the glass/glow/type language for the whole app.

---

## 3. Per-Screen Spec Template

Every screen spec (`redesign/screens/NN-name.md`) contains, in order:

1. **Header** — ID · name · route · tab · source draft · batch.
2. **Purpose** — 1–2 lines: what this screen is for.
3. **Entry & exit** — how the user arrives; where they go.
4. **Layout anatomy** — top→bottom regions + a mobile ASCII wireframe (390×844).
5. **Components** — which catalog components, with variants.
6. **Visual treatment** — glass tier per region · glow colors & meaning · background atmosphere · hero type.
7. **Content & copy** — real strings in CIA voice (sentence case, no exclamations).
8. **Data & honesty states** — every metric's real / low-confidence / honest-null variant + provenance.
9. **All states** — default · loading skeleton · empty · error · success · disabled.
10. **Motion & interaction** — gestures, transitions, glow behavior, haptics.
11. **Motivation-tier adaptation** — low / medium / high density variants.
12. **Accessibility** — contrast, 44px targets, reduced-motion, screen-reader labels.
13. **Premium checklist** — passes §6.

---

## 4. The Generation Prompt (reusable)

Paste this to produce one screen spec consistently. Batches run it five times.

```
You are designing screen #{NN} "{Screen Name}" for the Balencia native mobile app.

INHERIT (do not restate, obey): redesign/Balencia-Glass-Redesign-Plan.md §1 (design
language) — warm-dark base, selective glassmorphism, semantic inner-glow
(orange=you / green=done / purple=CIA), 60/30/10 color, Neue Montreal type with a Tiempos serif-italic emphasis word,
heavily rounded, honesty invariant, premium-by-default.

REUSE the functional content of app_design/{NN}-*.md — keep its structure, features,
logic, and information architecture. Redesign only the visual language.

PRODUCE a hi-fi markdown spec following the Per-Screen Spec Template (§3), with:
- a mobile ASCII wireframe (390×844)
- concrete tokens (exact hex, blur px, radii, glow color-per-card)
- real copy in CIA's voice
- every metric's real / low-confidence / honest-null state with provenance
- all screen states (default, skeleton, empty, error, success)
- motivation-tier density variants
Judge every element against: does it connect, is it honest, is it premium?
```

---

## 5. Working Process (the 5-by-5 loop)

**Batch 0 (once):** finalize the Visual Language + component library; build **one coded reference screen** (CIA Onboarding) so the glass/glow/type is validated visually. **Gate: you approve the look before mass production.**

**Each batch (repeat ×14) — two gates per batch:**
1. **Wireframe + UX gate (you decide the experience).** I extract each screen's flow/layout from its existing `app_design/` draft into a clean, reviewable **wireframe** (annotated ASCII + "what's shown" + "how it flows") and ask you a short set of **screen-specific UX questions** (MCP-style). The existing drafts already contain detailed wireframes and flows — this gate *refines* them with your input, it doesn't invent from scratch. **You approve the wireframe + UX before any visual work.**
2. **Hi-fi spec gate (I apply the glass language).** I produce the 5 hi-fi glass specs in `redesign/screens/` reflecting your UX decisions.
3. You review / annotate (👍 or change requests).
4. I revise until approved.
5. I mark the batch done in the tracker (§5.1) and run a consistency check every ~3 batches.
6. Next batch.

**Consistency mechanism:** every spec cites §1 tokens by name; a running **inconsistency report** flags any drift; the component catalog is the single source for shared UI.

### 5.1 Progress tracker

| Batch | Status | Approved |
|---|---|---|
| 0 Foundation | ⬜ not started | — |
| 1 Onboarding | ⬜ | — |
| 2 CIA core | ⬜ | — |
| 3 Goals | ⬜ | — |
| 4 Me | ⬜ | — |
| 5 Account | ⬜ | — |
| 6 Fitness | ⬜ | — |
| 7 Nutrition | ⬜ | — |
| 8 Finance/Career/Relationships | ⬜ | — |
| 9 Wellbeing I | ⬜ | — |
| 10 Wellbeing II | ⬜ | — |
| 11 Growth & moments | ⬜ | — |
| 12 Social | ⬜ | — |
| 13 Auth completion | ⬜ | — |
| 14 Tail | ⬜ | — |

---

## 6. Definition of "Premium / Done"

A screen ships only when it passes all three north-star questions **and** the compliance checklist:

**North star**
- [ ] **Connects** — feeds or uses cross-pillar intelligence (domain tags, CIA insight, correlation).
- [ ] **Honest** — real source or honest null; no fabricated numbers; provenance present.
- [ ] **Premium** — looks like a funded product; intentional hierarchy; generous space.

**Craft**
- [ ] Warm-dark atmosphere present (never flat black); glass reads *as* glass.
- [ ] Semantic glow used correctly (one per card, meaning-driven).
- [ ] 60/30/10 respected; one hero color per surface.
- [ ] Neue Montreal across the UI; Tiempos serif italic for the one emphasis word; `tabular-nums` on data.
- [ ] All states designed (skeleton, empty, error, success, disabled).
- [ ] Motivation-tier density variants defined.
- [ ] AA+ contrast, 44px targets, reduced-motion path.

---

*Source-of-truth chain: this plan (§1 design language) → per-screen specs (`redesign/screens/`) → existing `app_design/` drafts (functional content only). Brand tokens: Balencia Brand Guidelines v2.1 (color/type), recast for warm-dark glass.*
