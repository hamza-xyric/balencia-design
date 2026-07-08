### 1. Header
- **Screen ID:** 15
- **Name:** create-edit-goal
- **Route(s) covered:** No live route; modal create or edit mission flow launched from Mission Board [13] or Mission Detail [14].
- **Tab:** Goals modal
- **Source:** Functional Content Brief: Create / Edit Mission
- **Batch:** 6

### 2. Purpose
Create/Edit Mission turns a plain-language intention into an editable mission plan. CIA may structure the draft, but the member keeps control over mission type, domains, actions, milestones, tracking signals, strictness, and the final save. The premium moment is the transformation from one sentence into a concrete plan without hiding any assumptions.

### 3. Entry & exit
- **Entry paths:** Mission Board [13] plus button, Mission Detail [14] edit glyph, chain suggestion from Mission Detail [14].
- **Exit paths:** Create success dismisses to Mission Board; chain create success opens the new Mission Detail; edit success returns to the existing Mission Detail. Close or drag-down cancels, with unsaved changes confirmation.
- **Modes:** Create, edit, and chain-linked create share the same modal frame with different prefilled context.

### 4. Layout anatomy
**Input state:**
1. Modal grabber, close glyph, title.
2. Large natural-language input.
3. Let CIA plan this button.
4. Example chips.

**Structured result state:**
1. Header with mode title and close.
2. Optional chain context banner.
3. Collapsed original prompt summary.
4. Mission type suggestion with CIA reasoning.
5. Domain assignment chips.
6. Editable action list.
7. Milestones with target dates.
8. Tracking signal toggles.
9. Connections module.
10. Strictness segmented control.
11. Mission preview with difficulty and estimated XP.
12. Save/create CTA.

**ASCII wireframe (390x844):**
```text
┌──────────────────────────────────────┐
│              ───                 ✕   │
│ New mission                          │
│ ┌──────────────────────────────────┐ │
│ │ What do you want to achieve?     │ │
│ │ Run a half marathon by October   │ │
│ └──────────────────────────────────┘ │
│ [ Let CIA plan this ]                │
│ Save $5,000   Meditate daily   5K    │
├──────────────────────────────────────┤
│ Part of: endurance chain             │
│ prompt summary                   ⌄   │
│ ✦ This looks like a main mission     │
│ [daily] [weekly] [side] [main]       │
│ Domains  [Fitness] [Nutrition]  +    │
│ Actions                              │
│ ≡ Run 3x weekly                 ✕    │
│ ≡ Strength train 2x             ✕    │
│ Milestones                           │
│ 1  5K pace check       Aug 15        │
│ Tracking signals                     │
│ weekly distance  on  ●               │
│ Strictness  lenient [balanced] strict│
│ Mission preview · ~420 XP            │
│ [ Create mission ]                   │
└──────────────────────────────────────┘
```

### 5. Components
- **Sheet** full-height modal with grabber and 44px close target.
- **GlassPillInput** multiline for the natural-language prompt.
- **BtnCoach** for "Let CIA plan this" because CIA initiates the structuring.
- **ChoiceCardFrost** or compact chips for examples.
- **SegmentedTabs** for mission type, strictness, and difficulty.
- **ChipDomainTag** for domains.
- **ListRow** with drag handle for actions and milestones.
- **Toggle** for tracking signals.
- **CIAInsightCard** for type reasoning and connections.
- **ProgressRing, ProgressBar, KPIRow** inside the mission preview.
- **ChipProvenance, ConfidenceMeter, HonestNullState, SkeletonState, ErrorState, BtnPrimary, BtnGhost, BtnSuccess** for data and states.

### 6. Visual treatment
- **Atmosphere:** modal uses glass-frost over the warm dark app background with grain.
- **Focal hierarchy:** input state spends the focal moment on the large text field; structured state spends it on the CIA type reasoning plus mission preview.
- **Glass tiers:** sheet shell and CIA reasoning use glass; editable actions, milestones, and preview use SolidCard for legibility.
- **Semantic glow:** prompt input uses glow-you because it is member-authored; CIA reasoning and connections use glow-cia; save success uses glow-done. Difficulty uses labels and glyphs, not alarm color.

### 7. Content & copy
- **Titles:** New mission, Edit mission.
- **Prompt placeholder:** What do you want to achieve?
- **Coach CTA:** Let CIA plan this.
- **Processing captions:** structuring your mission... analyzing domains... generating actions... finding connections...
- **Type reasoning:** This looks like a main mission because it has a clear endpoint and several actions.
- **Domain helper:** Add up to 3 domains.
- **Strictness copy:** CIA will hold you accountable with reasonable flexibility.
- **Preview labels:** Mission preview, On completion, about 420 XP.
- **Save CTAs:** Create mission, Save changes, Create mission chain.
- **Error:** CIA couldn't structure that. Try being more specific, or add details.
- **Disabled helper:** Add at least one action to create your mission.
- **Offline:** offline - mission not saved until you reconnect.

### 8. Data & honesty states
- **Natural-language prompt:** real = user text; low-confidence not applicable because direct input; honest-null = empty input with disabled CTA.
- **Mission type:** real = CIA suggestion plus ChipProvenance "via prompt"; low-confidence = muted suggestion with ConfidenceMeter; honest-null = user selects manually.
- **Domain tags:** real = detected domains with provenance "via prompt"; low-confidence = suggested domains dimmed until confirmed; honest-null = "Add a domain to keep this organized."
- **Actions and milestones:** real = generated rows the user can edit; low-confidence = draft badge "CIA draft"; honest-null = "Add at least one action."
- **Estimated XP:** real = rule-based estimate from difficulty and scope; low-confidence = "~420 XP" with "estimated · low confidence" while action count is still changing; honest-null = "XP estimate appears after actions."
- **Connections:** real = cited relationship, such as Fitness plus Nutrition; low-confidence = dimmed with "possible connection"; honest-null = module omitted.

### 9. All states
- **Default:** input mode with text area, examples, and disabled coach CTA until text exists.
- **Skeleton:** edit mode loads existing mission with skeleton rows matching actions, milestones, preview, and toggles.
- **Empty:** no prompt yet; examples are visible and no plan modules render.
- **Processing:** input shrinks, staged CIA captions run, result modules remain hidden until populated.
- **Error:** original text is preserved; ErrorState offers Try again and manual editing.
- **Success:** save CTA swaps to BtnSuccess, then sheet dismisses to the correct destination.
- **Disabled:** save/create CTA remains at 40% opacity until title, one action, and at least one domain are valid.
- **Offline:** editing remains possible, but save is blocked with explicit copy.

### 10. Motion & interaction
- Drag down beyond threshold or tap close to dismiss. Tap prompt summary to reopen text. Drag handles reorder actions and milestones. Chips remove on tap. Toggles slide with haptic feedback.
- Input to processing shrinks over 280ms. Result sections stagger in from type reasoning to preview. Mission preview ring draws first, XP counts up second.
- Save success uses a 200ms glow-done swap and success haptic.
- **Reduced-motion path:** processing captions still update as text, but section staggers, ring draws, and count-ups jump to final states.

### 11. Motivation-tier adaptation
- **Low:** skip chain suggestions, show only mission type, domains, top three actions, and save.
- **Medium:** default full structure.
- **High:** show milestones, tracking signals, connections, strictness explanations, difficulty details, and estimated XP math.

### 12. Accessibility
- Close, drag handles, chips, toggles, and CTAs have 44px targets.
- Text inputs have explicit labels, not placeholder-only names.
- Drag reorder has move up/down alternatives.
- CIA-generated fields announce "suggested by CIA" until edited.
- Estimated XP announces approximate values as estimates.
- Focus returns to the launching control after cancel, and to the new mission card after success.

### 13. Premium checklist
1. Plain-language intent is transformed into editable structure.
2. CIA suggestions are labeled and overridable.
3. No unsupported certainty: type, domains, and connections all have low-confidence states.
4. No fake route is claimed.
5. One focal state at a time: input first, plan second.
6. Prompt and plan use different glass/solid tiers intentionally.
7. Save gating is explicit and non-silent.
8. Offline behavior is honest.
9. Difficulty avoids color-as-verdict.
10. Motion has a reduced-motion path.
11. 44px controls are specified.
12. Copy is sentence case and CIA-only.
13. XP estimate is treated as approximate until saved.
14. Chain-linked create mode is preserved.
