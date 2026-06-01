# Balencia Website — Vision & Storyboard ("what we're building")

> Companion to [`BRAND-AND-CONTEXT.md`](./BRAND-AND-CONTEXT.md) ("what is true"). This file is the canonical scope for the website. Approved plan: `~/.claude/plans/users-hamza-desktop-balencia-design-web-wobbly-cat.md`.

---

## 1. Experience thesis

A **cinematic scrollytelling** marketing site. Pre-rendered, concept-art-fidelity frames are **scrubbed to scroll position** (Apple-product-page model), with interactive hotspots and real-DOM copy overlays on top. This is the only honest way to hit the photoreal Gemini/Sora concept-still quality bar — no browser renders those stills live at 60fps.

There is **exactly one live-interactive moment**: the **Life Correlation Matrix** section (the USP). Everything else is pre-rendered.

**Decisions (locked):**
- **Approach:** cinematic scrollytelling (pre-rendered frames + scroll scrub + overlays).
- **Domains:** the **10 canonical** domains; SIA at the core.
- **USP hero:** interactive correlation graph + animated 10-axis radar + an example insight story — the story framed as **one of thousands**, never the whole product.
- **Build path:** **design-first** — this brief + a `/poc` vertical slice for sign-off before the full render pipeline.

---

## 2. Aesthetic guardrails (draw from / avoid)

| Draw from | Avoid |
|---|---|
| Blade Runner 2049 warmth (amber fog, volumetric light shafts) | Lego / toy proportions |
| Apple spatial computing (clean geometry, soft glass) | Neon overload / generic cyberpunk |
| UE5 architectural viz (precise detail, cinematic framing) | Photorealistic *simulation* (uncanny) |
| Dark sophistication, night-time grandeur, **warm darkness** | Daytime, suburban scale, loud/garish neon |

Atmosphere: zenith ink-blue `#0A0A0F` + stars; horizon warm amber → purple-indigo; slow aurora bands; warm amber fog denser with distance. Net feel: **warm darkness** — orange/amber glowing out of a deep blue-black field. Never cold cyberpunk.

---

## 3. The 12-beat storyboard

Each beat = a pre-rendered cinematic frame/sequence + a real-DOM copy overlay + (optionally) a hotspot. Arc preserves three "breath" moments (arrival, climax, closing) bracketing two acts (meet SIA, the domain tour). Copy follows the voice rules in BRAND-AND-CONTEXT §6.

| # | Beat | Visual | Headline / body (draft) | Interactive |
|---|---|---|---|---|
| 1 | Arrival / hero | Descend into a dark city at night; lights bloom on; the SIA tower ignites last & brightest | *A living intelligence powering every dimension of your life.* + sub *One app that sees the whole of you — not one slice.* + CTA **see your life connected** | scrub the descent + light-bloom |
| 2 | Meet SIA | Crane up the breathing tower; faint energy pipelines toward dark districts | *I am SIA. The intelligence core, the emotional engine, the operating system for your life.* | hotspot whisper: *I do not run your life. I help you read it.* |
| 3 | Inside the core | Pass into the warm atrium; light-threads converge into one orange line | *Every signal you give me flows here. I turn the noise into one clear plan for today.* | threads light per-domain as you scroll |
| 4 | Connected-life premise | Tower + dark districts; one gold thread fires Sleep→Career | *A fitness app sees only fitness. I see how they move together — because you do not live in pieces.* | toggle **one app at a time ↔ all of it at once** |
| 5 | Domain tour (hero 5) | Fitness, Sleep, Career, Nutrition, Relationships light in turn, each in its accent | per-domain SIA caption (below) + Status / Insight / Signal triplet | hover a Signal line → named domains glow |
| 6 | "And five more" | Fast sweep over Finance, Faith, Productivity, Wellbeing, Meditation; whole city lights | *ten domains. one intelligence. all of you.* | each district a hotspot; **the ten domains** grid |
| 7 | **CLIMAX — Life Correlation Matrix (live USP)** | Gold lines fire between districts → resolve to a clean instrument panel | 4-line revelation → interactive graph + radar → example story | **the one live moment** (see §4) |
| 8 | Product reality | Scale-drop to a hand holding a phone; SIA "Today" screen in a PhoneFrame | *this is what all of that becomes, every morning.* — *good morning. SIA found 3 connected signals for today.* → *sleep debt plus meeting load* → *move deep work before 2 PM.* path **recovery → career → nutrition** | animated intelligence path; CTA **start with SIA** |
| 9 | RPG / progress | Life-wheel radar + Life Power counting up + mission/squad cards | *your life, with a sense of progress.* — no streaks to defend, no shame for a quiet week | radar morphs current ↔ last month |
| 10 | Your life as a story | A page of the AI memoir + grounded testimonials (shape-masked photos) | *the proof is a quieter week.* | testimonials advance; **read a sample chapter** |
| 11 | Pricing | Four tier cards, Plus highlighted | *start free. grow when you are ready.* | monthly/yearly toggle → `/pricing` |
| 12 | Closing | Pull back over the lit city; **Balencia.** wordmark draws in; orange→green stroke sweeps | *Welcome to your civilization. Let us begin.* / *Find your balance.* | wordmark stroke-draws; CTA **begin** |

### Per-domain SIA captions (10 canonical, voice-matched)
1. **Fitness** — *Your body tells a story every day. I read every chapter.*
2. **Sleep** — *Rest is not lost time. It is where today quietly becomes tomorrow.*
3. **Career** — *Your work does not stand alone. I see how sleep, stress, and the people around you power your best hours.*
4. **Nutrition** — *What you eat reaches further than your plate — into your focus, your sleep, your mood.*
5. **Finance** — *Your money tells the truth about your stress. I see the pattern before your bank does.*
6. **Faith** — *I make room for what gives your days meaning, not just what fills them.*
7. **Productivity** — *I protect your attention, so the day does not spend it for you.*
8. **Relationships** — *The people in your life shape your health more than any workout. I keep watch over those connections too.*
9. **Wellbeing** — *Calm is not the absence of energy. It is energy, well directed.*
10. **Meditation** — *A few quiet minutes can change the shape of an entire day.*

---

## 4. The LCM signature section (Beat 7) — the heart, and the only live moment

Three stacked sub-beats, scrubbed by scroll over the fully-lit city:

**7a — The revelation (4-line sequence, verbatim):**
1. *This is the complete picture.*
2. *Most apps see one building. I see the entire civilization.*
3. *Your sleep affects your career. Your meals shape your mood. Your relationships drive your recovery.*
4. *Every dimension of human life becomes stronger when powered by intelligent AI.*

**7b — Interactive correlation graph + animated radar (the live instrument):**
- **Graph:** 10 domain nodes (accent-colored, sized by hub-strength — Wellbeing largest) around a central SIA node; 45 curved edges with thickness/opacity/glow ∝ weight (data from `lcm-matrix.json`); strong edges draw first (orange→gold via `stroke-draw`). Hover/focus a node → its web brightens, others dim, a weight-sorted readout panel opens ("Connected to" pattern from the in-app graph). Cluster control (Physical / Professional / Inner life) + bridge callouts. A live **"connections SIA is mapping for you: 1,000+"** counter — a key device for the *one-of-many* constraint. Default state = **Base** (solid orange→gold); a **Base → Personal** toggle morphs the featured Meditation↔Finance edge to **dashed purple** ("this is the average; yours becomes unique").
- **Radar:** the 10-axis life-wheel grows from center; selecting a graph node pulses its radar axis (one instrument, not two widgets).

**7c — The example insight story (framed as ONE of many):**
- The Meditation↔Finance discovery: personal weight climbs **0.20 → 0.55** drawn as a dashed-purple line vs a flat orange "average person" baseline at 0.20, green milestone dots at confidence crossings (wk2 ~0.25, wk5 ~0.50). SIA's quote types in; soft chip **want to explore this?**
- **Mandatory framing (the owner's constraint):** wrap with *"One connection, out of thousands"* and *"this is one of thousands of connections I map for you — every day, quietly. you only ever see the one that matters most this morning."* Plus a **see five more** carousel and the live counter. The single story is a *window*, never *the building*.
- Insight cards use `~`-prefixed numbers + a persistent **"example figures — not product claims"** footnote (no stat ships as fact until validated).

---

## 5. Information architecture

- `/` — the cinematic scroll (the experience). One long page.
- `/pricing` — Free $0 / Plus $20 / Pro $60 / Max $100–200 + comparison + FAQ.
- `/how-sia-works` — text-first LCM explainer (skeptics, press, SEO).
- `/privacy` — data handling ("your data, your story"); non-negotiable for this audience.
- `/poc` — the design-first vertical slice (this milestone).

**Nav** (minimal, sentence case, transparent over hero → warm-dark after first viewport): wordmark **Balencia.** · how it works · pricing · the science · CTA **see your life connected**.
**CTA ladder:** mid-scroll **see your life connected** → product **start with SIA** → closing **begin**. (Pre-launch default: **join the waitlist**; swap to store badges when live.)
**Footer:** wordmark + *A coach. In your corner.* · Product / Company / Trust / Stay columns · zero exclamation marks, all sentence case.

---

## 6. Tech architecture

`balencia-website/` — **Next.js 16.2.6 (App Router)** + **React 19.2.4** + **Tailwind 4** + **Framer Motion 12** + **Lenis** (smooth scroll). Production frame-scrub: `<canvas>` `drawImage(frames[i])` driven by scroll progress (GSAP ScrollTrigger in production; Framer Motion `useScroll` is fine for single-beat). The LCM graph is the one **live** moment: **SVG-first** behind a renderer-agnostic interface (reuses the in-app graph + radar patterns, no new deps), with an **R3F** layer addable later for depth/bloom — if R3F is cut, the section still ships.

**Reuse by copy (no cross-workspace import graph):** tokens from `globals.css` (+ a new `prefers-reduced-motion` block + larger web display type), Sora font, `RadarChart`, the `knowledge-graph` interaction, `PhoneFrame`, `domains.ts`, official logo assets.

**Frame production (Phase 2):** offline-render the **10-domain** city in Blender/Cycles using `balencia-city-v3/{modules,assembly,shared}` + the rig spec in `Website-design-references/Balencia-City-Premium-Rebuild-Plan.md` (HDRI `modern_buildings_night`, 3-point lighting, volumetric amber fog, bloom/SSAO/DoF/color-grade). ~5–6 existing structures map directly (Fitness, Finance, Career, Nutrition, Relationships, Recovery→Sleep); ~3–4 new (Faith, Productivity, Meditation/Wellbeing); recompose to 10 districts. Optional AI img2img finishing on **static hero stills only** (never motion frames — would "boil"). Export per-beat **AVIF** sequences (+ sprite-sheets for short beats; posters in-repo, full frames via CDN). Budget ≈ 30 MB desktop / 6 MB mobile, never all at once.

**Performance / a11y / SEO:** ~60fps scrub; mobile poster tier (drop scrub on Save-Data/small/low-memory); `prefers-reduced-motion` → static key-frame page; all copy real DOM; JSON-LD `SoftwareApplication` + OpenGraph; LCP via preloaded beat-1 poster; run `design-auditor` for WCAG AA.

---

## 7. Tone / QA checklist (run every string)
- [ ] Sentence case everywhere (wordmark excepted).
- [ ] Zero exclamation marks.
- [ ] Brand period present on headlines + wordmark.
- [ ] Active voice; second person; SIA = first person.
- [ ] ≤ one italic emotional word per section.
- [ ] No hype / no shame.
- [ ] Every LCM example wrapped in "one of thousands" framing + a visible breadth device.
- [ ] No percentage ships as fact unless validated; else qualitative / `~` + footnote.
- [ ] 60/30/10 per surface; CTAs orange; purple sparingly; connection lines gold.
- [ ] Lines draw themselves (never opacity-fade); reduced-motion respected.

---

## 8. Copy deck (verbatim, from `Website-design-references/03-content-copy.md`)
- **Hero:** *A living intelligence powering every dimension of your life.* — **Balencia.**
- **SIA reveal:** *I am SIA. The intelligence core, emotional engine, and life operating system.*
- **Inside:** *I see what no single app can. The atrium turns every signal into one living plan.*
- **Climax (4 lines):** see §4.
- **Closing:** *Welcome to your civilization. Let us begin.* / tagline *Find your balance.* / wordmark *Balencia.*
- **Today screen:** *Good morning.* · *SIA found 3 connected signals for today.* · *Sleep debt plus meeting load* → *Move deep work before 2 PM.* · path *Recovery → Career → Nutrition* · cards *Move* (Train at 6:20) / *Focus* (Protect 90 min) / *Recover* (Wind down at 10) / *Connect* (Reply to Maya) · nav *Today / City / SIA*.
