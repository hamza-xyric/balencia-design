# 37-journal - A+++ hi-fi mobile spec

## Header
- **Source ID:** 37
- **Source spec:** `Balencia-New-Screens/screens/37-journal.md`
- **Evidence:** screens/37-journal.md, work/briefs/37.md, work/drafts/37.md, Balencia Glass Canon v1, Component Catalog v1, Functional Content Brief 37
- **Route(s):** `/wellbeing/journal`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Serves as the user's private, AI-guided reflection space, answering "what happened today and what does it mean?" It bridges raw personal thoughts with structured coaching by allowing CIA to surface daily prompts, analyze entries, and enrich cross-domain intelligence.
- **Premium Visual Director:** make Journal hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Journal keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+ S A F E   A R E A
|   o  Journal                  o MIC        | TopBar (Transparent)
|                                             |
|   +-------------------------------------+   |
|   |  CIA reflection                   |   | CIAInsightCard
|   |                                     |   | (Hero Glass)
|   | What pattern have you noticed       |   |
|   | between your energy and creativity? |   |
|   |                                     |   |
|   | +-[ write about this ]-+            |   |
|   | +----------------------+            |   |
|   +-------------------------------------+   |
|                                             |
|   +-------------------------------------+   |
|   |  [ entries ]   [ check-ins ]        |   | SegmentedTabs
|   +-------------------------------------+   |
|                                             |
|   12 entries this month  estimated         | KPI / Provenance
|                                             |
|   +-------------------------------------+   |
|   | May 20, 2026                      |   | Entry Card
|   |  "The morning session felt..."    |   | (SolidCard)
|   |  [ Learning ]  [ Creativity ]       |   |
|   +-------------------------------------+   |
|   +-------------------------------------+   |
|   | May 19, 2026                      |   | Entry Card
|   |  voice  2m 14s                   |   |
|   +-------------------------------------+   |
|                                             |
|                                    +( + )+  | FAB (Orange)
|   +-------------------------------------+   |
|   |  o Today     o CIA    o Goals   o Me|   | GlassNavBar
+---------------------------------------------+

Route handling: `/wellbeing/journal`
```

## Focal Hierarchy
- **Dominant focal moment:** Journal hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere with CIA only when the source supports a synthesized read.
- **Operational layer:** TopBar, CIA Reflection Prompt Card, Mode Toggle, Monthly Stat.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*journal*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** (Transparent variant)
- **CIAInsightCard** (Used for the daily prompt)
- **SegmentedTabs** (Mode toggle)
- **SolidCard** (Used for chronological entry rows)
- **FABQuickLog** (Expands to text/voice)
- **GlassNavBar** (Default)
- **ChipDomainTag** (Entry metadata)
- **ChipProvenance** (Monthly stat tracking)
- **NEW: StatusDotMeter**: A 5-dot positional categorical meter used to visually anchor mood states (    ) without relying strictly on emoji for data visualization, preserving functional intent while resolving the naming conflict from the brief.

## Data Honesty
- **Monthly Reflection Count**
- - *Real:* 12 entries this month. [ChipProvenance: `calculated locally`]
- - *Low-confidence:* 12 entries this month. [Caption: `estimated  low confidence`] (Used if local queue sync is pending).
- - *Honest-null:* Not enough data yet - 2 more days.
- **Voice Transcription**
- - *Real:* "Transcribed text appears here." [ChipProvenance: `via AssemblyAI`]
- - *Low-confidence:* "Transcribed text appears here." [Caption: `estimated  low confidence`]
- - *Honest-null:* Audio wasn't captured - 0 seconds recorded.
- **Check-in History Metrics (View Only)**
- - *Real:* Energy: 4/5, Stress: 2/5. [ChipProvenance: `logged this morning`]

## Consent and Safety
- Journal keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wellbeing/journal`. Do not add alternate vanity routes.

## States
- **Default:** Entries list populated, CIA prompt visible, toggle set to "entries".
- **Skeleton:** Prompt card and entry list show `SkeletonState` blocks. Stale/cached entries render at 50% opacity beneath the morphing skeleton overlay.
- **Empty (Cold Start):** Mode toggle is hidden. `EmptyState` renders in place of the list: "Your journal is private and for you alone..."
- **Error:** Entries fail to load. `ErrorState` card inserts at the top of the feed: "Couldn't load your entries. Try again." with a BtnSecondary retry.
- **Success:** Upon save, sheet slides down. Entry card materializes at top of list with a brief `glow-done` (#34A853) inner glow, fading to standard SolidCard styling after 1.5s.
- **Disabled:** Save button inside the Sheet is rendered at 40% opacity ( BtnPrimary disabled state) and is non-interactive until the text input contains characters.

## Motion
- **Easing & Duration:** Physical easing (`ease-out`). Bottom sheets slide up from Y=844 over 520ms. Entry deletions collapse height over 180ms.
- **Feedback:** Staggered fade-in (80ms delay per item) for prompt and rows. Mood emoji scales 1.2x on selection with a radial background fade. Haptic tap on FAB expansion.
- **Glow behavior:** The `CIAInsightCard` uses a slow 4s "breathe" for its `--glow-cia`. The "Save Success" `--glow-done` pulses once, then fades to neutral.
- **Reduced-motion path:** Disables the mood emoji scaling and glow breathing. Bottom sheets cross-fade in rather than sliding. Staggered fade-ins fire simultaneously.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wellbeing/journal`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast:** Maintained across all text (`paper-100`, `paper-64%`). Dark mode optimizes contrast ratios against `--surface-1` and `.glass-card`.; **Touch targets:** All interactive elements strictly observe 44x44pt minimums. (Correction: Chips previously listed as 24-32pt height have been structurally padded to meet the 44pt target threshold).; **Screen-reader labels:** Voice mic glyph reads as "Record voice entry." Settings glyph reads "Journal settings." The `StatusDotMeter` reads as "Mood: Calm," instead of "Dot 2 of 5."
