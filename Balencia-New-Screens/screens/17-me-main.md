### 1. Header
- **Screen ID:** 17
- **Name:** me-main
- **Route(s) covered:** `/profile`
- **Tab:** Me
- **Source:** Functional Content Brief: Me Main
- **Batch:** 8

### 2. Purpose
Me Main is the member's identity hub: profile anchor, progression snapshot, life-power composition, and navigation gateway into personal sub-screens. It answers "who am I in Balencia right now?" without turning gaps into shame. The screen should feel like a calm personal cockpit, not a list of account links.

### 3. Entry & exit
- **Entry paths:** Me tab tap, back-stack return from Me sub-screens, profile deep link.
- **Exit paths:** settings gear pushes Settings [21]; avatar opens Profile Edit [50]; level badge or stats row pushes Life World [19]; quick links push Mission Journal [73], Wiki [20], Connected Services [22], Billing [23], Progress Photos [49], Streak Details [59], Achievements [71], Notifications [24], or Help [25].
- **Discovery exits:** Explore preview rows push Explore [18] or relevant domain dashboards.

### 4. Layout anatomy
**Regions top-to-bottom:**
1. **Floating header:** settings gear, subtle search glyph, no page title.
2. **Profile anchor:** avatar with camera affordance, member name, level badge, XP progress, member-since line.
3. **Progression snapshot:** four-cell stat row for day streak, completed missions, Life Power, and total XP.
4. **Life Power composition:** top five domain StatBars with "see all 10" link to Life Areas [16].
5. **Quick links grid:** two-column card grid for the Me sub-screens.
6. **Suggested for you:** CIA-guided discovery carousel with fallback "popular with Balencia."
7. **GlassNavBar:** persistent Me tab selected.

**ASCII wireframe (390x844):**
```text
┌──────────────────────────────────────┐
│                              ⚙   ⌕   │
│          ◯ avatar + camera           │
│          Hamza                        │
│        level 14 · dedicated explorer │
│        ███████░░ 2,450 / 5,809 XP    │
│        member since May 2026         │
├──────────────────────────────────────┤
│ 42 day streak │ 12 completed         │
│ 487 Life Power│ 8,450 total XP        │
├──────────────────────────────────────┤
│ Composed of                    see all 10 │
│ Fitness      ███████░░ 74            │
│ Wellbeing    ██████░░░ 62            │
│ Career       █████░░░░ 55            │
├──────────────────────────────────────┤
│ Mission journal   18 entries         │
│ Book of life      what CIA knows     │
│ Connected apps    3 connected        │
│ Progress photos   24 photos          │
│ Achievements      31 earned          │
├──────────────────────────────────────┤
│ suggested for you                    │
│ ✦ grow your meditation →             │
└──────────────────────────────────────┘
```

### 5. Components
- **TopBar glyph controls** for settings and search, each 44px.
- **AvatarUploader** using the same photo permission path as Profile Edit [50].
- **ProgressBar** for XP-to-next-level.
- **KPIRow** for four profile stats.
- **StatBar** for Life Power composition.
- **QuickLinkCard** (NEW) for navigation cards with dynamic subtitles.
- **CIAInsightCard** for the discovery recommendation.
- **ChipProvenance** for stat sources and sync timestamps.
- **SkeletonState, ErrorState, OfflineBanner, HonestNullState, BtnGhost, GlassNavBar** for states and navigation.

### 6. Visual treatment
- **Atmosphere:** warm dark base with top radial glow and grain.
- **Glass tiers:** profile anchor and discovery use glass-card; quick links and stat rows use SolidCard for scan speed; nav uses glass-frost.
- **Semantic glow:** profile anchor uses glow-you because it reflects member progression; discovery uses glow-cia; completed missions stat gets a restrained glow-done only when a refresh discovers a new completion.
- **Photo privacy:** avatar camera affordance uses neutral chrome until permission is granted; no photo appears in skeleton.

### 7. Content & copy
- **Stat labels:** day streak, completed, Life Power, total XP.
- **Tenure:** member since May 2026.
- **Wiki subtitle:** what CIA knows.
- **Discovery:** suggested for you; fallback popular with Balencia.
- **Empty:** Your stats grow as you build habits.
- **Loading:** CIA is reading your profile - one moment.
- **Success:** Stats refreshed.
- **Error:** Couldn't load your stats - pull to refresh.
- **Offline:** offline - showing your last sync.
- **Nudge:** grow your meditation.

### 8. Data & honesty states
- **Profile identity:** real = name and avatar from profile API with ChipProvenance "via profile"; low-confidence not applicable; honest-null = initials avatar and "Add your name."
- **Level and XP:** real = RPG stats; low-confidence = cached values muted with "estimated · low confidence" during sync; honest-null = level 1 with "building your momentum."
- **Life Power:** real = calculated from active domain stats; low-confidence = muted if any domain is syncing; honest-null = "building your balance" and ghosted bars.
- **Quick-link subtitles:** real = counts from their destination systems; low-confidence = stale count label; honest-null = warm starter copy such as "no entries yet."
- **CIA suggestion:** real = recommendation with provenance "via recent activity"; low-confidence = ConfidenceMeter; honest-null = fallback popular modules.

### 9. All states
- **Default:** profile anchor, stats, composition, quick links, and discovery carousel render.
- **Skeleton:** avatar, XP bar, stats, StatBars, and cards shimmer in final geometry.
- **Empty:** level 1, no XP, ghosted domain bars, starter quick-link subtitles.
- **Error:** cached data remains; failed modules show scoped ErrorState.
- **Success:** pull-to-refresh updates stats and shows "Stats refreshed."
- **Disabled:** pull-to-refresh and photo upload controls dim at 40% while offline or permission-blocked.
- **Offline:** cached data renders with staleness label; discovery falls back to popular modules.

### 10. Motion & interaction
- Pull-to-refresh reloads profile, stats, and suggestions. Tap avatar opens Profile Edit. Tap stat row opens Life World. Quick-link cards scale to .98 and push their destination.
- XP and StatBars draw left-to-right; stats count up; quick links stagger after profile anchor.
- Avatar upload success uses a subtle glow-done ring; failure keeps the old avatar.
- **Reduced-motion path:** count-ups and draws snap to final values, quick links do not stagger, avatar ring does not pulse.

### 11. Motivation-tier adaptation
- **Low:** hide Life Power composition details; show top two quick links and gentle discovery.
- **Medium:** default as specified.
- **High:** show weekly deltas beside stats and expanded Explore modules.

### 12. Accessibility
- Settings, search, avatar, stat cells, quick links, and nav tabs meet 44px minimum targets.
- Avatar action announces current photo state and edit path.
- Stat bars include numeric values and source labels for screen readers.
- Quick-link subtitles are read after card title.
- Pull-to-refresh has a non-gesture retry button in error banners.

### 13. Premium checklist
1. Identity hub is source-specific, not a generic profile page.
2. Route header matches `/profile`.
3. Profile stats, Life Power, quick links, and discovery are all preserved.
4. CIA suggestions are optional and provenance-labeled.
5. No fake zeros for missing domains.
6. Avatar photo permission and failure states are concrete.
7. Selective glass avoids a card pile.
8. Semantic glow maps to user progress, CIA, and saved completion.
9. Default, Skeleton, Empty, Error, Success, Disabled, and Offline states exist.
10. Reduced-motion path exists.
11. 44px target floor is stated.
12. Copy is sentence case and CIA-only.
13. Plus gating is limited to advanced comparison modules.
14. Cross-links to every Me sub-screen are preserved.
