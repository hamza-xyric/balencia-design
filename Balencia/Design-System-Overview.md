# Balencia Design System

**Source document:** `Design System (Balencia).pdf`  
**Markdown version:** Detailed brand guideline and implementation reference  
**Generated:** 2026-05-12

---

## Naming note

The uploaded PDF uses both **Balencia** and **Balancia** in different places. The brand name used throughout this Markdown is **Balencia**, because that is the name used in the current project conversation. Where the PDF shows example wordmark text as **Balancia**, that should be treated as a source spelling inconsistency unless the team confirms the final spelling.

---

## Table of contents

1. [Brand foundation](#1-brand-foundation)
2. [Brand personality](#2-brand-personality)
3. [Voice and copywriting](#3-voice-and-copywriting)
4. [Audience](#4-audience)
5. [Color system](#5-color-system)
6. [Typography system](#6-typography-system)
7. [Logo font](#7-logo-font)
8. [Continuous stroke line system](#8-continuous-stroke-line-system)
9. [Spacing, radius, shadows, and motion](#9-spacing-radius-shadows-and-motion)
10. [Component primitives](#10-component-primitives)
11. [Data visualization](#11-data-visualization)
12. [Photography](#12-photography)
13. [Logo research and development](#13-logo-research-and-development)
14. [Implementation tokens](#14-implementation-tokens)
15. [Do and do not checklist](#15-do-and-do-not-checklist)
16. [Page-by-page source summary](#16-page-by-page-source-summary)

---

# 1. Brand foundation

## Core idea

> **A coach. In your corner.**

Balencia sits between **calm clarity** and **forward motion**. The brand should feel grounded, useful, warm, and quietly confident. It should not feel loud, preachy, overly motivational, or like a wellness influencer brand.

## Brand role

Balencia is not just a tracker. It is a coach-like system that helps people understand what deserves attention today. The design language should communicate:

- Calm clarity
- Forward motion
- Human warmth
- Progress without pressure
- Intelligence without coldness
- Coaching without preaching

## Strategic brand position

Balencia should feel like a trusted guide that:

- Questions before it answers
- Listens before it suggests
- Helps people make better decisions
- Turns health signals into daily clarity
- Supports users through change, burnout, identity shifts, new habits, and new routines

---

# 2. Brand personality

The PDF defines five core personality traits.

| Trait | Meaning | Design implication |
|---|---|---|
| **Grounded** | Feet on the floor | Use stable layouts, generous spacing, warm dark backgrounds, and calm typography. |
| **Curious** | Questions before answers | Use copy that asks useful questions and invites reflection. Avoid instant judgement. |
| **Warm** | The coach in your corner | Use friendly language, soft corners, warm shadows, and supportive status messages. |
| **Playful** | Light, never childish | Add subtle visual energy through curves, dots, chips, and motion. Avoid cartoonish UI. |
| **Quietly confident** | Calm authority | Use clear hierarchy, restrained color, simple actions, and no overexcited punctuation. |

## Personality rules

- Do not shout.
- Do not over-motivate.
- Do not use aggressive fitness language.
- Do not sound like a productivity app.
- Do not use wellness-influencer aesthetics.
- Always sound supportive, not superior.

---

# 3. Voice and copywriting

## Voice principles

The brand voice is:

- Conversational
- Active
- Second-person
- Coach-like
- Grounded
- Calm
- Clear

Use **“you”**, not **“users”**.

The coach speaks **with** the person, never **at** the person.

## We say

> **“What’s worth your attention today?”**

This is the best example of Balencia’s tone. It is curious, calm, and useful. It does not push or shame the user.

## We do not say

> **“Crush your goals today!”**

This sounds too aggressive and generic. It does not match the Balencia tone.

## Copy rules

### Use sentence case everywhere

Use sentence case for:

- Buttons
- Navigation
- UI titles
- Section headings
- Cards
- Form labels
- Filters
- Tabs

Avoid Title Case in UI. The wordmark is the exception because it is drawn as a logo, not typed UI text.

### Do not use exclamation marks

Energy should come from rhythm, layout, and the brand period, not punctuation.

The dot is part of the brand language.

### Use active voice

Prefer:

- “Check what needs attention.”
- “Start session.”
- “Review your recovery.”

Avoid:

- “Your goals should be crushed today.”
- “Users are able to review their recovery.”

### Write like a coach

Copy should feel like:

- “You’re ready for a steady session.”
- “Recovery is improving. Keep the pace gentle.”
- “Sleep was lighter than usual. Start with an easier warm-up.”

Copy should not feel like:

- “Maximum performance unlocked.”
- “Destroy your limits.”
- “Your metrics are bad.”

---

# 4. Audience

## Primary audience

Adults aged **25–45** who are navigating change.

The PDF identifies the audience as people dealing with:

- Career pivots
- New parenthood
- Burnout recovery
- Identity shifts

## Audience mindset

This audience wants self-improvement without hype. They are allergic to wellness-influencer aesthetics and want something more grounded, trustworthy, and real.

They may be:

- Busy professionals
- New parents
- People recovering from burnout
- People rebuilding routines
- People tracking health but overwhelmed by data
- People who want guidance without judgement

## Design implication

The product should not look like:

- A gym challenge app
- A hustle dashboard
- A meditation cliché
- A supplement brand
- A generic health SaaS website

It should feel like:

- A calm coach
- A premium health companion
- A clear daily decision system
- A trustworthy guide for change

---

# 5. Color system

Balencia uses a **60 / 30 / 10** color ratio.

## Primary palette

| Color | Token | Hex | Ratio | Role | Usage |
|---|---:|---:|---:|---|---|
| **Burnt Orange** | `--orange` | `#FF5E00` | **60%** | Primary | Action, CTA, energy, the spark, buttons, user line on charts, streaks, primary highlights. |
| **Forest Green** | `--green` | `#34A853` | **30%** | Secondary | Growth, success, completion, reward, confirmations, milestones, positive deltas. |
| **Royal Purple** | `--purple` | `#7F24FF` | **10%** | Accent | Coach voice, AI insights, premium moments, transformation, sparingly used accents. |

## Burnt Orange

```css
--orange: #FF5E00;
```

### Meaning

Burnt Orange is the primary brand color. It represents action, CTA energy, the spark, the user’s voice, stress, streaks, and primary highlights.

### Use orange for

- Primary buttons
- Primary CTAs
- Main hero accents
- Active user paths
- The user’s line on charts
- Streaks
- Stress and effort states
- Key highlights
- Brand mark on dark backgrounds

### Do not use orange for

- Every background
- Every icon
- Warning-only language
- Large flat areas combined with full-strength green and purple

## Forest Green

```css
--green: #34A853;
```

### Meaning

Forest Green represents growth, success, completion, positive change, recovery, and arrival.

### Use green for

- Positive deltas
- Success confirmations
- Recovery states
- Goal completion
- Milestone dots
- Progress arrival
- “Done” actions
- Reward states

### Do not use green for

- Primary purchase/action buttons unless the action is completion or success
- Alerting users to stress
- Asking for input

## Royal Purple

```css
--purple: #7F24FF;
```

### Meaning

Royal Purple represents the coach’s voice, AI insight, transformation, and premium moments.

### Use purple for

- AI coach moments
- Insight chips
- Projected lines
- Premium states
- Sleep, transformation, reflection, and intelligence moments
- Small accents

### Do not use purple for

- Large wallpaper-like backgrounds
- Every AI feature simultaneously
- Primary CTA buttons

## 60 / 30 / 10 color ratio

| Ratio | Color | Meaning |
|---:|---|---|
| **60%** | Orange | Primary visual driver and action system. |
| **30%** | Green | Growth, completion, recovery, and positive feedback. |
| **10%** | Purple | Coach voice, AI, premium insight, and transformation. |

### Ratio rule

Use **one hero color per surface**.

Do not place orange, green, and purple all at full saturation in one composition. The only place where all three may meet is in the journey gradient.

## Color scales

The PDF shows 50 / 100 / 200 / 300 / 400 / 500 / 600 tonal scales for:

- Burnt Orange
- Forest Green
- Royal Purple

The PDF labels the scale steps but does not provide exact hex values for every step. Keep the scale concept in the design system and define exact tints in implementation if needed.

## Neutrals — warm-cool ink

The PDF defines a warm-cool neutral system with dark ink tones and warm paper tones.

### Dark neutrals

| Token suggestion | Hex |
|---|---:|
| `--ink-900` | `#0A0A0F` |
| `--ink-warm-900` | `#0C0603` |
| `--ink-brown-900` | `#140A05` |
| `--ink-brown-800` | `#211008` |
| `--black` | `#0A0A0A` |
| `--ink-700` | `#171717` |

### Light neutrals

| Token suggestion | Hex |
|---|---:|
| `--white` | `#FFFFFF` |
| `--paper-50` | `#FDFDFB` |
| `--paper-100` | `#FEFAF3` |
| `--paper-150` | `#FDFBF0` |
| `--paper-200` | `#F9F3E6` |
| `--paper-300` | `#F2ECD8` |

## Gradients — the journey palette

The PDF names four gradient tokens.

| Gradient token | Purpose | Visual behavior |
|---|---|---|
| `--grad-progress` | Progress | Teal/green movement into warm progress color. |
| `--grad-growth` | Growth | Warm yellow/orange movement into stronger orange. |
| `--grad-status` | 0% to 100% | Green-to-warm status scale for completion/progress. |
| `--grad-hero-glow` | Hero glow | Dark-to-orange glow for atmosphere and hero depth. |

### Gradient rules

- Gradients should represent movement, journey, and status.
- Use gradients in charts, hero glows, and progress lines.
- Avoid unrelated gradients.
- Avoid heavy dark gradients in graphs.
- Do not use a three-color gradient for data visualization unless it is the approved journey palette.

---

# 6. Typography system

The PDF defines **Sora** as the main typography system.

## Typography principle

> Sora carries the whole system — display, body, and accent.

Sora is used as a single geometric sans typeface across display, body, and accent moments. Hierarchy comes from extreme differences in size and weight rather than excessive color usage.

## Primary typeface

```css
--font-primary: "Sora", system-ui, sans-serif;
```

## Display style

| Style | Typeface | Weight | Size / Line-height | Letter spacing | Usage |
|---|---|---:|---:|---:|---|
| **Display XL** | Sora | 900 | 96 / 92 | -0.025em | Hero / billboard. |
| **Display L** | Sora | 700 | 64 / 60 | -0.02em | Section title. |
| **H1** | Sora | 700 | 48 / 52 | approx. -0.015em | Page heading. |
| **H2** | Sora | 700 | 36 / 39 | default / tight | Section heading. |
| **H3** | Sora | 600 | 28 / 34 | default / tight | Card title. |
| **Lead** | Sora | 400 | 20 / 29 | default | Intro paragraph. |
| **Body** | Sora | 400 | 16 / 25 | default | Default paragraph. |
| **Eyebrow** | Sora | 600 | 12 | +0.12em | Section label, uppercase. |

## Display examples from the PDF

### Display XL

> Find your  
> balance.

- Typeface: Sora
- Weight: 900
- Size / line-height: 96 / 92
- Letter spacing: -0.025em
- Use for hero and billboard moments.

### Display L

> A coach in your corner.

- Typeface: Sora
- Weight: 700
- Size / line-height: 64 / 60
- Letter spacing: -0.02em
- Use for section titles.

### H1

> Monitor your progress.

- Typeface: Sora
- Weight: 700
- Size / line-height: 48 / 52
- Use for page headings.

### H2

> A full week. Nicely done.

- Typeface: Sora
- Weight: 700
- Size / line-height: 36 / 39
- Use for section headings.

### H3

> Today’s focus.

- Typeface: Sora
- Weight: 600
- Size / line-height: 28 / 34
- Use for card titles.

### Lead

> Tech for self-improvement by tracking your entire performance, every day.

- Typeface: Sora
- Weight: 400
- Size / line-height: 20 / 29
- Use for intro paragraphs.

### Body

> A grounded coach that listens before it suggests. Conversational sentences, not therapy-speak. Active voice. Second person.

- Typeface: Sora
- Weight: 400
- Size / line-height: 16 / 25
- Use for default paragraph text.

### Eyebrow

> TODAY’S SESSION · 18 MINUTES

- Typeface: Sora
- Weight: 600
- Size: 12
- Letter spacing: +0.12em
- Uppercase
- Use for section labels and meta labels.

## Accent typography

The PDF shows an accent style using **Sora 700 Bold**.

Use accent typography for **one emotional word**, with a maximum of **two emotional words per page**.

Examples:

- balance.
- progress.
- clarity.
- attention.

## Typography rules

### Sentence case everywhere

Use sentence case in buttons, titles, and navigation. Never use Title Case in the UI.

### No exclamation marks

Energy comes from rhythm and the brand period, not punctuation.

### Hierarchy by size

Build hierarchy through size and weight, not color. Only the script/accent word or the trailing brand dot should get brand color.

### The brand period is sacred

Use the period intentionally in headlines, wordmark, and brand moments. Do not replace it with an exclamation mark.

---

# 7. Logo font

The PDF defines **Chillax** for the logo font.

## Logo display font

| Use | Typeface | Weight | Notes |
|---|---|---:|---|
| Logo display | Chillax | 800 | Bold, geometric, rounded. |
| Logo accent | Chillax | 700 Bold | Used for the wordmark style. |

## Logo typography behavior

- Letter spacing: approximately -0.025em
- Line-height: approximately 0.94
- The wordmark ends with a period.
- The period is part of the identity and should always be present.

---

# 8. Continuous stroke line system

## Core idea

> **Continuous Stroke Lines.**

The line system represents voice, journey, breath, progress, and the living state of the product. It should feel organic, continuous, and in motion.

## Line types shown in the PDF

| Line type | Meaning | Visual description |
|---|---|---|
| **Past / projected** | History and prediction | A continuous stroke with loop-like tension. |
| **Breathing line** | Idle / voice mode | A curved organic line used for the coach or listening state. |
| **Path of progress** | Orange to green | Progress line moving from user effort into arrival/recovery. |
| **Hero / billboard** | Brand expression | 12px stroke on brand color, used at large scale. |

## Stroke widths

| Token suggestion | Width | Role |
|---|---:|---|
| `--stroke-thin` | 2px | Thin |
| `--stroke-base` | 4px | Base |
| `--stroke-bold` | 8px | Bold |
| `--stroke-poster` | 12px | Poster |

## Color meanings in the line system

| Color | Meaning |
|---|---|
| Orange | The user’s voice. |
| Green | Progress and arrival. |
| Purple | The coach and AI. |
| Gradient | Graphs and stats. |

## Line system rules

### Do

- Use round caps.
- Use round joins.
- Keep each line continuous.
- Animate the line so it draws itself.
- Use one line motif per surface maximum.

### Do not

- Do not break the line into disconnected fragments.
- Do not fade the line in. It should draw itself.
- Do not center it symmetrically.
- Do not use it as an input border.
- Do not wrap it around the logo.
- Do not use more than one line motif per surface.

## Motion behavior

The line should feel like a journey. When animated, use stroke drawing instead of opacity fades.

Recommended SVG behavior:

```css
.brand-line {
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw-line var(--dur-flow) var(--ease-flow) forwards;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}
```

---

# 9. Spacing, radius, shadows, and motion

## Core idea

> **The grid you don’t see.**

The system uses generous whitespace, capsule-friendly radii, soft warm-tinted shadows, and non-linear motion.

## Spacing — 8pt scale

| Token | Value |
|---|---:|
| `--s-1` | 4px |
| `--s-2` | 8px |
| `--s-3` | 12px |
| `--s-4` | 16px |
| `--s-5` | 24px |
| `--s-6` | 32px |
| `--s-7` | 48px |
| `--s-8` | 64px |
| `--s-9` | 96px |
| `--s-10` | 128px |

## Spacing usage

| Use case | Recommended spacing |
|---|---:|
| Tight icon/text gap | 4px - 8px |
| Button inner gap | 8px - 12px |
| Card internal padding | 24px - 32px |
| Component group gap | 16px - 24px |
| Section header gap | 32px - 48px |
| Section vertical padding | 96px - 128px |

## Radii — generous and capsule-friendly

| Token | Value | Use |
|---|---:|---|
| `--r-xs` | 6px | Small UI details. |
| `--r-sm` | 10px | Small chips, nested cards. |
| `--r-md` | 14px | Inputs, small cards. |
| `--r-lg` | 20px | Buttons, mid cards. |
| `--r-xl` | 28px | Primary cards and panels. |
| `--r-2xl` | 40px | Large surfaces and hero cards. |
| `--r-pill` | pill / 999px | Buttons, chips, segmented controls. |

## Shadows — soft, warm-tinted

The PDF names the following shadow tokens:

- `--shadow-1`
- `--shadow-2`
- `--shadow-3`
- `--glow-orange`
- `--glow-green`
- `--glow-purple`

The PDF does not provide exact shadow blur, spread, or opacity values. Define them in implementation while preserving the intent:

- Soft
- Warm-tinted
- Subtle
- Low contrast
- Never harsh or cold

## Motion — never linear

Motion should never feel mechanical or linear. Use non-linear timing curves.

| Token | Curve | Role |
|---|---|---|
| `--ease-flow` | `cubic-bezier(.65,.05,.36,1)` | Signature non-linear journey. |
| `--ease-out-soft` | `cubic-bezier(.22,.61,.36,1)` | UI default. |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | Two-way transitions. |

## Duration tokens

| Token | Duration | Use |
|---|---:|---|
| `--dur-fast` | 160ms | Tiny feedback, taps, chips. |
| `--dur-base` | 280ms | UI default transitions. |
| `--dur-slow` | 520ms | Panels, surface transitions. |
| `--dur-flow` | 1.2s | Line drawing and signature motion. |

## Motion rules

- Use motion to clarify state, not decorate everything.
- Avoid linear easing.
- Avoid sudden jumps.
- Use longer motion for continuous line drawing.
- Use shorter motion for UI feedback.
- Respect reduced-motion settings in implementation.

---

# 10. Component primitives

The PDF shows a primitive component set. These components should share the same soft, rounded, calm visual style.

## Buttons

### Start session

- Primary filled button
- Orange fill
- Pill shape
- Used for the main action

### Done

- Green filled button
- Pill shape
- Used for completion and success

### Skip

- Dark neutral filled button
- Pill shape
- Used for secondary neutral action

### Cancel

- Outline button
- Pill shape
- Used for low-emphasis cancel action

## Chips

### 12-day streak

- Orange chip
- Used for streaks, consistency, and activity

### Goal met

- Green chip
- Used for success, completion, and positive states

### Coach insight

- Purple chip
- Used for AI or coaching moments

## Segmented controls

The PDF shows two segmented control types:

### Full words

- Week
- Month
- Year

### Compact

- W
- M
- Y

Use segmented controls for time ranges and simple view switching.

## Coach input

The PDF shows a coach input with the prompt:

> What’s worth your attention today?

This prompt should be treated as a signature Balencia phrase.

## Component style rules

- Use pill shapes for actions.
- Use rounded cards and surfaces.
- Use dark UI surfaces with soft borders.
- Use orange for action, green for completion, purple for coach insight.
- Use text that feels human and calm.
- Avoid harsh outlines, sharp corners, and cold shadows.

---

# 11. Data visualization

## Core idea

> **Every chart is the line.**

Numbers tell the truth, but the line tells the story.

## Chart language

| Data element | Visual rule |
|---|---|
| Past | Solid orange line. |
| Projected | Dashed purple line. |
| Milestones | Green dots. |
| Graphs and stats | Approved gradients. |
| User path | Orange. |
| Progress arrival | Green. |
| Coach / AI projection | Purple. |

## Data visualization examples shown in the PDF

### Sessions over time

- Large number: `128`
- Time selector: W / M / Y
- Month labels: J F M A M J J A S O N D
- Curved line chart
- Line transitions from green into orange
- Milestone dots on the line

### This week’s activity

- Main value: `5h 48m`
- Supporting text: `Best day: Friday`
- Time selector: W / M / Y
- Bar chart comparing this week and last week
- This week uses orange
- Last week uses green
- Weekday labels from Monday to Sunday

### Circular progress charts

The PDF shows circular/ring charts for:

- Sleep | Strain | Stress
- Growth | Health | Fitness
- Showing 0% to 100% Progress

### Progress sliders

The PDF shows progress sliders using brand-compatible gradients.

Use these for:

- Completion
- Progress
- Status movement
- Thresholds

## Data visualization rules

### Do

- Use gradient stats and graphs to represent specific data points.
- Use two different color codes for specific screens or modules when it helps explain results.
- Use approved example colors for specific modules.
- Use two shades of blue only for relevant wellbeing or water intake features in nutrition.
- Use green dots for milestones.
- Use dashed purple for projection.
- Use solid orange for past / user path.

### Do not

- Do not use a three-color gradient for data visualization.
- Do not use dark color gradients in charts.
- Do not add unrelated color codes.
- Do not make decorative charts that do not represent real data.

## Data chart composition rules

- Keep charts minimal.
- Use curved lines where possible to connect back to the continuous stroke system.
- Avoid default dashboard blue unless it is part of a water or wellbeing module.
- Use labels sparingly.
- Let the line tell the story.

---

# 12. Photography

## Core idea

> **Smiley people with different way.**

The source PDF uses this heading. The practical meaning is: use authentic, smiling, real people photographed in varied, human ways.

## Photography style

Use:

- Natural light photography
- Real people
- Slight grain
- Warm color grade
- Hands
- Faces in profile
- Smiling, relaxed expressions
- People masked into the shape system

Avoid:

- AI-generated stock
- Overly polished wellness stock
- Influencer-style posing
- Cold clinical imagery
- Generic gym photography
- Overly saturated lifestyle shots

## Background and skin tone pairings

| Background | Recommended image direction | Reason |
|---|---|---|
| Green background | Light skin tone image | Vibrant, high-contrast, monochrome look and feel. |
| Orange background | Dark skin tone image | Vibrant, high-contrast, monochrome look and feel. |
| Purple background | Light skin tone image | Vibrant, high-contrast, monochrome look and feel. |

## Photography composition

- Use people inside rounded or shaped image containers.
- Allow the continuous line to cross or interact with photo cards.
- Use high-contrast monochrome background panels.
- Keep image treatment warm and human.
- Preserve the premium, dark-system feel.

---

# 13. Logo research and development

## Logo concept

The PDF describes the logo as:

> An intentional visual tension created by shifting geometric weights to represent the human state before coaching begins.

The logo should feel balanced but not static. It should communicate human warmth, motion, and coaching support.

## Wordmark rule

The wordmark ends with the brand period — always.

Correct:

> Balencia.

Incorrect:

> Balencia

## Logo usage shown in the PDF

### On dark — primary

- Orange symbol
- White wordmark
- Dark background
- Used as the primary lockup on dark surfaces

### On paper — ink mark

- Orange symbol
- Ink / black wordmark
- Warm paper background
- Used for light surfaces

### Mark-only variants

The PDF shows the symbol in multiple applications:

1. White mark on orange background
2. Orange mark on dark background
3. Orange mark on paper background

## Logo system rules

- Always include the period in the wordmark.
- Use the orange mark as the primary identity cue.
- Preserve the geometric balance of the mark.
- Do not wrap the continuous stroke line around the logo.
- Do not remove the dot/period from the wordmark.
- Do not use random colors for the mark.
- Do not overdecorate the logo.

---

# 14. Implementation tokens

This section converts the PDF rules into a practical token structure for design and front-end use.

## CSS variables

```css
:root {
  /* Brand colors */
  --orange: #FF5E00;
  --green: #34A853;
  --purple: #7F24FF;

  /* Dark neutrals */
  --ink-900: #0A0A0F;
  --ink-warm-900: #0C0603;
  --ink-brown-900: #140A05;
  --ink-brown-800: #211008;
  --black: #0A0A0A;
  --ink-700: #171717;

  /* Light neutrals */
  --white: #FFFFFF;
  --paper-50: #FDFDFB;
  --paper-100: #FEFAF3;
  --paper-150: #FDFBF0;
  --paper-200: #F9F3E6;
  --paper-300: #F2ECD8;

  /* Gradients: exact stops should be finalized in implementation */
  --grad-progress: linear-gradient(90deg, #19C9D2 0%, #FFB13D 100%);
  --grad-growth: linear-gradient(90deg, #FFB33F 0%, #FF5E00 100%);
  --grad-status: linear-gradient(90deg, #4EDB8C 0%, #FFB33F 100%);
  --grad-hero-glow: radial-gradient(circle, rgba(255, 94, 0, .42) 0%, rgba(255, 94, 0, 0) 70%);

  /* Typography */
  --font-primary: "Sora", system-ui, sans-serif;
  --font-logo: "Chillax", system-ui, sans-serif;

  /* Spacing */
  --s-1: 4px;
  --s-2: 8px;
  --s-3: 12px;
  --s-4: 16px;
  --s-5: 24px;
  --s-6: 32px;
  --s-7: 48px;
  --s-8: 64px;
  --s-9: 96px;
  --s-10: 128px;

  /* Radius */
  --r-xs: 6px;
  --r-sm: 10px;
  --r-md: 14px;
  --r-lg: 20px;
  --r-xl: 28px;
  --r-2xl: 40px;
  --r-pill: 999px;

  /* Strokes */
  --stroke-thin: 2px;
  --stroke-base: 4px;
  --stroke-bold: 8px;
  --stroke-poster: 12px;

  /* Motion */
  --ease-flow: cubic-bezier(.65,.05,.36,1);
  --ease-out-soft: cubic-bezier(.22,.61,.36,1);
  --ease-in-out: cubic-bezier(.65,0,.35,1);

  --dur-fast: 160ms;
  --dur-base: 280ms;
  --dur-slow: 520ms;
  --dur-flow: 1.2s;

  /* Shadows: implementation suggestions, based on PDF intent */
  --shadow-1: 0 8px 24px rgba(33, 16, 8, .18);
  --shadow-2: 0 18px 48px rgba(33, 16, 8, .22);
  --shadow-3: 0 32px 80px rgba(33, 16, 8, .28);

  --glow-orange: 0 0 32px rgba(255, 94, 0, .45);
  --glow-green: 0 0 32px rgba(52, 168, 83, .40);
  --glow-purple: 0 0 32px rgba(127, 36, 255, .40);
}
```

## Typography utility classes

```css
.display-xl {
  font-family: var(--font-primary);
  font-weight: 900;
  font-size: 96px;
  line-height: 92px;
  letter-spacing: -0.025em;
}

.display-l {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 64px;
  line-height: 60px;
  letter-spacing: -0.02em;
}

.h1 {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 48px;
  line-height: 52px;
  letter-spacing: -0.015em;
}

.h2 {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 36px;
  line-height: 39px;
}

.h3 {
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
}

.lead {
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
}

.body {
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
}

.eyebrow {
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: .12em;
  text-transform: uppercase;
}
```

## Component token mapping

| Component | Color | Radius | Motion |
|---|---|---|---|
| Primary action | Orange | `--r-pill` | `--dur-base` + `--ease-out-soft` |
| Completion action | Green | `--r-pill` | `--dur-base` + `--ease-out-soft` |
| Coach insight chip | Purple | `--r-pill` | `--dur-fast` + `--ease-out-soft` |
| Card | Dark neutral | `--r-xl` or `--r-2xl` | `--dur-base` |
| Large surface | Dark neutral / paper | `--r-2xl` | `--dur-slow` |
| Line motif | Orange / green / purple / gradient | round caps | `--dur-flow` + `--ease-flow` |

---

# 15. Do and do not checklist

## Brand

### Do

- Make the brand feel like a coach in your corner.
- Use calm clarity and forward motion.
- Write in second person.
- Keep the tone warm and grounded.

### Do not

- Do not sound preachy.
- Do not use hustle language.
- Do not use “crush your goals” style copy.
- Do not use wellness influencer visual clichés.

## Color

### Do

- Use orange as the primary 60% color.
- Use green for recovery, success, and positive deltas.
- Use purple sparingly for AI, coach insight, and transformation.
- Use one hero color per surface.

### Do not

- Do not use all three brand colors at full saturation in one composition.
- Do not introduce random colors.
- Do not overuse purple as wallpaper.

## Typography

### Do

- Use Sora for the main system.
- Use Chillax for the logo.
- Build hierarchy with size and weight.
- Use sentence case everywhere.

### Do not

- Do not use Title Case in UI.
- Do not use exclamation marks.
- Do not build hierarchy by coloring every heading.

## Lines

### Do

- Use round caps and joins.
- Use one continuous line.
- Animate lines by drawing them.
- Use one line motif per surface.

### Do not

- Do not break the line.
- Do not fade the line in.
- Do not center the line symmetrically.
- Do not use line motifs as input borders.
- Do not wrap lines around the logo.

## Data visualization

### Do

- Use solid orange for past / user data.
- Use dashed purple for projections.
- Use green dots for milestones.
- Use approved gradients for stats and graphs.

### Do not

- Do not use three-color gradients.
- Do not use dark color gradients in charts.
- Do not add unrelated color codes.

## Photography

### Do

- Use real people.
- Use natural light.
- Use slight grain and warm color grade.
- Mask images into the shape system.

### Do not

- Do not use AI-generated stock.
- Do not use generic wellness influencer imagery.
- Do not use cold clinical imagery unless intentionally softened by the system.

## Logo

### Do

- Keep the period in the wordmark.
- Use orange as the primary mark color.
- Use the mark on dark and paper surfaces as specified.

### Do not

- Do not remove the period.
- Do not recolor the mark randomly.
- Do not wrap the line motif around the logo.

---

# 16. Page-by-page source summary

## Page 1 — Cover

- Title: Design System
- Brand name displayed as Balancia in the PDF
- Dark hero layout
- Orange mark and white wordmark
- Phone mockup with Balencia branding
- White continuous line motif in the background

## Page 2 — The Brand

- Section: The Brand
- Main statement: “A coach. In your corner.”
- Describes Balencia as sitting between calm clarity and forward motion
- Defines the voice as grounded and curious
- Personality: grounded, curious, warm, playful, quietly confident
- Voice: conversational, active, second person, speaks with not at
- We say: “What’s worth your attention today?”
- We do not say: “Crush your goals today!”
- Audience: adults 25–45 navigating change
- Audience examples: career pivots, new parenthood, burnout recovery, identity shifts

## Page 3 — Colors

- Section: Colors
- Main heading: Color Palette
- Primary palette:
  - Burnt Orange `#FF5E00` / 60%
  - Forest Green `#34A853` / 30%
  - Royal Purple `#7F24FF` / 10%
- Shows tonal scales from 50 to 600 for each brand color
- Shows warm-cool ink neutrals
- Shows journey palette gradients:
  - Progress
  - Growth
  - 0% to 100%
  - Hero glow
- Defines the 60 / 30 / 10 ratio
- Rule: one hero color per surface
- Rule: never use all three at full saturation in one composition, except in the journey gradient

## Page 4 — Typography

- Section: Typography
- Main system: Sora
- Sora used for display, body, and accent
- Display XL: Sora 900, 96 / 92, -0.025em
- Display L: Sora 700, 64 / 60, -0.02em
- H1: Sora 700, 48 / 52
- H2: Sora 700, 36 / 39
- H3: Sora 600, 28 / 34
- Lead: Sora 400, 20 / 29
- Body: Sora 400, 16 / 25
- Eyebrow: Sora 600, 12, +0.12em, uppercase
- Rules:
  - Sentence case everywhere
  - No exclamation marks
  - Hierarchy by size
- Logo font: Chillax
- Logo display: Chillax 800
- Logo accent: Chillax 700 Bold

## Page 5 — The Line System

- Section: The Line System
- Main heading: Continuous Stroke Lines
- Shows four line examples:
  - Past / projected
  - Breathing line / idle / voice mode
  - Path of progress / orange to green
  - Hero / billboard / 12px stroke on brand color
- Stroke widths:
  - 2px thin
  - 4px base
  - 8px bold
  - 12px poster
- Color meanings:
  - Orange = user’s voice
  - Green = progress / arrival
  - Purple = coach / AI
  - Gradient = graphs / stats
- Rules:
  - Round caps and joins
  - One continuous stroke
  - Draws itself in motion
  - Never centered symmetrically
  - Never as input borders
  - Never wrapped around the logo
  - One line motif per surface maximum

## Page 6 — Spacing, radius, shadows, motion

- Section: Spacing · radius · shadows · motion
- Main heading: The grid you don’t see
- Uses generous whitespace, capsule-friendly radii, soft warm-tinted shadows, and non-linear motion
- Spacing scale from 4px to 128px
- Radius scale from 6px to pill
- Shadow tokens:
  - `--shadow-1`
  - `--shadow-2`
  - `--shadow-3`
  - `--glow-orange`
  - `--glow-green`
  - `--glow-purple`
- Motion curves:
  - `--ease-flow`
  - `--ease-out-soft`
  - `--ease-in-out`
- Duration tokens:
  - 160ms fast
  - 280ms base
  - 520ms slow
  - 1.2s flow
- Component primitives:
  - Start session
  - Done
  - Skip
  - Cancel
  - 12-day streak
  - Goal met
  - Coach insight
  - Week / Month / Year
  - W / M / Y
  - Coach input prompt

## Page 7 — Data visualization

- Section: Data visualization
- Main heading: Every chart is the line
- Past is solid orange
- Projected is dashed purple
- Milestones are green dots
- Shows sessions over time chart
- Shows weekly activity chart
- Shows circular progress charts
- Shows progress sliders
- Rules:
  - Gradient stats and graphs represent specific data points
  - Two different color codes may be used for specific screens or modules
  - Two shades of blue may be used for wellbeing or water intake features in nutrition
  - Do not use a three-color gradient
  - Avoid dark gradients
  - Avoid unrelated colors

## Page 8 — Photography

- Section: Photography
- Heading: Smiley people with different way
- Uses natural light photography of real people
- No AI-generated stock
- Slight grain
- Warm color grade
- Hands and faces in profile
- Masked into the shape system
- Green backgrounds pair with light skin tone images
- Orange backgrounds pair with dark skin tone images
- Purple backgrounds pair with light skin tone images

## Page 9 — Logo research and development

- Section heading shown as Data visualization, but page content is logo research and development
- Main heading: Logo Research & development
- Logo concept: intentional visual tension created by shifting geometric weights
- Represents the human state before coaching begins
- Wordmark ends with the brand period, always
- Shows sketch research and logo explorations
- Shows primary wordmark
- Shows lockups:
  - On dark / primary
  - On paper / ink mark
- Shows mark-only variants

## Page 10 — Thank You

- Final thank-you slide
- Dark background
- Orange mark
- Large white “Thank You” text
- Subtle continuous stroke motif in the background

---

# End of markdown guideline
