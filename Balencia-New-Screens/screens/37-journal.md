# 37-journal

## 1. Header
- **Screen ID:** 37
- **Name:** Journal
- **Route(s) covered:** `/wellbeing/journal`
- **Tab:** Today
- **Source:** Balencia Glass Canon v1, Component Catalog v1, Functional Content Brief 37
- **Batch:** 15

## 2. Purpose
Serves as the user's private, AI-guided reflection space, answering "what happened today and what does it mean?" It bridges raw personal thoughts with structured coaching by allowing CIA to surface daily prompts, analyze entries, and enrich cross-domain intelligence.

## 3. Entry & exit
- **In:** Explore [18] via "Journal" card; CIA Chat [09] via deep-link; Learning [35] or Creativity [36] dashboards via "reflect" chip (pre-loads prompt); Daily Check-in [45] via "view in journal".
- **Out:** Back button (stack pop); Forward to CIA Chat [09]; Full Entry View (stack push); Daily Check-in [45] (read-only); Entry Editor/Writing Mode (modal Sheet); Image Viewer [67] (via attachment tap).

## 4. Layout anatomy
**Regions top-to-bottom:**
1. **Atmosphere:** Warm radial glow top-center, purple pool anchored right. 3-4% grain overlay.
2. **TopBar:** Transparent over atmosphere. Back chevron, Title ("Journal"), Voice/Settings actions.
3. **CIA Reflection Prompt Card:** Hero glass card containing the generative prompt. 
4. **Mode Toggle:** Segmented control ("entries", "check-ins").
5. **Monthly Stat:** Inline provenance chip tracking reflection count.
6. **Journal Feed:** Dense, virtualized vertical scroll of entries.
7. **FABQuickLog:** Persistent creation action.
8. **GlassNavBar:** Floating global navigation.

**ASCII Wireframe (390x844):**
```text
┌─────────────────────────────────────────────┐ S A F E   A R E A
│   ◌  Journal                  ◌ MIC  ⚙      │ TopBar (Transparent)
│                                             │
│   ╭─────────────────────────────────────╮   │
│   │ ✦ CIA reflection                   ▾│   │ CIAInsightCard
│   │                                     │   │ (Hero Glass)
│   │ What pattern have you noticed       │   │
│   │ between your energy and creativity? │   │
│   │                                     │   │
│   │ ╭─[ write about this ]─╮            │   │
│   │ ╰──────────────────────╯            │   │
│   ╰─────────────────────────────────────╯   │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │  [ entries ]   [ check-ins ]        │   │ SegmentedTabs
│   └─────────────────────────────────────┘   │
│                                             │
│   12 entries this month · estimated         │ KPI / Provenance
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │ May 20, 2026                   😌   │   │ Entry Card
│   │ 📷 "The morning session felt..."    │   │ (SolidCard)
│   │  [ Learning ]  [ Creativity ]       │   │
│   └─────────────────────────────────────┘   │
│   ┌─────────────────────────────────────┐   │
│   │ May 19, 2026                   😐   │   │ Entry Card
│   │ 🎙 voice · 2m 14s                   │   │
│   └─────────────────────────────────────┘   │
│                                             │
│                                    ╭( + )╮  │ FAB (Orange)
│   ╭─────────────────────────────────────╮   │
│   │  ◌ Today     ◌ CIA    ◌ Goals   ◌ Me│   │ GlassNavBar
└─────────────────────────────────────────────┘
```

## 5. Components
- **TopBar** (Transparent variant)
- **CIAInsightCard** (Used for the daily prompt)
- **SegmentedTabs** (Mode toggle)
- **SolidCard** (Used for chronological entry rows)
- **FABQuickLog** (Expands to text/voice)
- **GlassNavBar** (Default)
- **ChipDomainTag** (Entry metadata)
- **ChipProvenance** (Monthly stat tracking)
- **NEW: StatusDotMeter**: A 5-dot positional categorical meter used to visually anchor mood states (😊 😌 😐 😔 😤) without relying strictly on emoji for data visualization, preserving functional intent while resolving the naming conflict from the brief.

## 6. Visual treatment
- **Glass tiers:** `CIAInsightCard` and `FABQuickLog` use `.glass-card`. `SolidCard` is used for the dense entries list to maximize text legibility. TopBar and Nav are transparent/glass-pill respectively.
- **Glow color & meaning:** The `CIAInsightCard` features the `--glow-cia` (#7F24FF) inner glow. Meaning: this card represents AI-generated, projected coaching intelligence. 
- **Background atmosphere:** True to the canon, a warm dark base (`--bg-base`) is overlaid with a soft warm radial glow at the top center (`rgba(255,94,0,.18)`), paired with a subtle 3-4% grain overlay to establish premium warmth.
- **The one hero type moment:** The reflection prompt itself (e.g., "What *pattern* have you noticed...") set in Tiempos Medium italic, providing a sharp editorial break against the Neue Montreal UI text.

## 7. Content & copy
*Note: The brief's exclamation marks have been stripped per the Canon's CIA voice rules. Sentence case applied.*

- **TopBar Title:** Journal
- **Prompt CTA:** write about this
- **Mode Toggle:** entries, check-ins
- **Cold Start:** Your journal is private and for you alone. CIA can offer prompts, or you can write whatever's on your mind. No *rules*.
- **Privacy Opt-in:** Let CIA remember your *entries*. CIA uses your journal to give better coaching. You can turn this off anytime in Settings.
- **Paywall Copy:** Writing and browsing entries are free. CIA prompts and analysis are *Plus*.
- **Loading:** CIA is finding today's prompt — one moment. / CIA is updating your prompt — showing your last entries.
- **Errors:** Couldn't load your entries. Try again. / Couldn't save your entry. Try again. / Your entry is empty. Write something to *save*. / Couldn't transcribe your audio. Try again.
- **Offline:** You're offline — entries will sync when reconnected.
- **Success/Delete:** Entry saved. / Delete this entry? / This can't be *undone*.
- **Editor Placeholder:** start writing...
- **Stat:** 12 entries this month — your most reflective month *yet*.

## 8. Data & honesty states
- **Monthly Reflection Count**
  - *Real:* 12 entries this month. [ChipProvenance: `calculated locally`]
  - *Low-confidence:* 12 entries this month. [Caption: `estimated · low confidence`] (Used if local queue sync is pending).
  - *Honest-null:* Not enough data yet — 2 more days.
- **Voice Transcription**
  - *Real:* "Transcribed text appears here." [ChipProvenance: `via AssemblyAI`]
  - *Low-confidence:* "Transcribed text appears here." [Caption: `estimated · low confidence`]
  - *Honest-null:* Audio wasn't captured — 0 seconds recorded.
- **Check-in History Metrics (View Only)**
  - *Real:* Energy: 4/5, Stress: 2/5. [ChipProvenance: `logged this morning`]
  - *Low-confidence:* Energy: 4/5. [Caption: `estimated · low confidence`]
  - *Honest-null:* Skipped check-in yesterday.

## 9. All states
- **Default:** Entries list populated, CIA prompt visible, toggle set to "entries".
- **Skeleton:** Prompt card and entry list show `SkeletonState` blocks. Stale/cached entries render at 50% opacity beneath the morphing skeleton overlay.
- **Empty (Cold Start):** Mode toggle is hidden. `EmptyState` renders in place of the list: "Your journal is private and for you alone..."
- **Error:** Entries fail to load. `ErrorState` card inserts at the top of the feed: "Couldn't load your entries. Try again." with a BtnSecondary retry.
- **Success:** Upon save, sheet slides down. Entry card materializes at top of list with a brief `glow-done` (#34A853) inner glow, fading to standard SolidCard styling after 1.5s.
- **Disabled:** Save button inside the Sheet is rendered at 40% opacity ( BtnPrimary disabled state) and is non-interactive until the text input contains characters.

## 10. Motion & interaction
- **Easing & Duration:** Physical easing (`ease-out`). Bottom sheets slide up from Y=844 over 520ms. Entry deletions collapse height over 180ms. 
- **Feedback:** Staggered fade-in (80ms delay per item) for prompt and rows. Mood emoji scales 1.2x on selection with a radial background fade. Haptic tap on FAB expansion.
- **Glow behavior:** The `CIAInsightCard` uses a slow 4s "breathe" for its `--glow-cia`. The "Save Success" `--glow-done` pulses once, then fades to neutral.
- **Reduced-motion path:** Disables the mood emoji scaling and glow breathing. Bottom sheets cross-fade in rather than sliding. Staggered fade-ins fire simultaneously. 

## 11. Motivation-tier adaptation
- **Low:** Prompt copy focuses on immediate, low-friction relief. (e.g., "One *word* to describe today.") Monthly stat and dense feed are hidden; UI is minimal to reduce pressure.
- **Medium:** Standard layout. Extended reflection prompt. Feed shows standard density.
- **High:** Deeper analytical prompts. (e.g., "What *pattern* have you noticed between your energy levels and your creative output this week?"). Unlocks the "Check-ins" mode toggle. Feed displays domain tags and mood meters prominently.

## 12. Accessibility
- **AA+ contrast:** Maintained across all text (`paper-100`, `paper-64%`). Dark mode optimizes contrast ratios against `--surface-1` and `.glass-card`.
- **Touch targets:** All interactive elements strictly observe 44x44pt minimums. (Correction: Chips previously listed as 24-32pt height have been structurally padded to meet the 44pt target threshold).
- **Screen-reader labels:** Voice mic glyph reads as "Record voice entry." Settings glyph reads "Journal settings." The `StatusDotMeter` reads as "Mood: Calm," instead of "Dot 2 of 5." 

## 13. Premium checklist
- [x] **Connects:** Journal entries feed directly back into CIA via tagged deep-links.
- [x] **Honest:** Utilizes provenance chips (`estimated`, `calculated locally`) and honest-null states.
- [x] **Premium:** Employs authentic `.glass-card` hero treatment, solid typography rhythm, and smooth 520ms sheet choreography.
- [x] **Tiered glass:** Strict adherence (Glass hero, Solid list).
- [x] **Semantic glow:** `--glow-cia` used strictly on AI prompt.
- [x] **60/30/10 color rule:** Orange FAB/UI chrome (60), Green success (30), Purple CIA card (10).
- [x] **Selective glass:** No glass mixed in the dense feed list.
- [x] **Honesty states (3-tier):** Defined for all metrics.
- [x] **One hero type moment:** Tiempos italic emphasis word in prompts.
- [x] **One primary CTA:** FAB acts as the singular global creation action.
- [x] **Locked feature gating:** Paywall text gracefully restricts CIA prompts and voice recording.
- [x] **Data control:** Privacy opt-in seamlessly integrated.
- [x] **Accessibility:** 44pt targets rigorously enforced.
- [x] **Motion easing:** Physical easings applied, reduced-motion respected.
