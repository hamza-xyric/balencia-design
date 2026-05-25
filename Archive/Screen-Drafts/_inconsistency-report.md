# Cross-Batch Inconsistency Report

> Generated: 2026-05-20
> Scope: All 43 screen drafts, Batches 1-9

---

## Critical (fixed during consolidation)

1. **[Screen 12] Missing navigation link to Screen 16** — Screen 16 (Life Areas Overview) listed Screen 12 as an origin, but Screen 12 did not list Screen 16 as a destination. **Fixed**: Added `Life Areas Overview [16] via stack push` to Screen 12's cross-references.

2. **[Screens 26-29] Tab bar height 48pt instead of 56pt** — All four Batch 6 screens specified "48pt + 34pt safe area" for the tab bar, while the standardized height is 56pt. **Fixed**: Updated all references to "56pt + 34pt safe area".

3. **[Screen 12] Domain Tag Chip radius 999pt instead of 10pt** — Screen 12 used `999pt radius` for Domain Tag Chip while canonical definition (Screen 08) uses `--r-sm (10pt)`. **Fixed**: Updated to `--r-sm, 10pt radius`.

4. **[Screen 08] Domain Tag Chip opacity 20% instead of 15%** — Screen 08's tag chip bg used `domain color at 20%`, while Screens 12, 37, and majority use `15%`. **Fixed**: Updated to 15%.

5. **[Screen 06] Section Eyebrow Label opacity 50% instead of 40%** — Screen 06 used `white at 50%` while all other screens (12, 30-38) use `white at 40%`. **Fixed**: Updated to 40% in both visual treatment and color map table.

6. **[Screen 12] SIA Coaching Note Card left border 4pt instead of 3pt** — Screen 12 used `4pt wide, 60% opacity` while all other screens (14, 16, 30-34) use `3pt`. **Fixed**: Updated to 3pt.

7. **[Screen 01] Auth branching condition undocumented** — Screen 01 said "auto-advances to [02] or [12]" without specifying the condition. **Fixed**: Added explicit conditions (first launch/no session → Screen 02; returning user with valid session → Screen 12).

8. **[Screen 35] False pattern establishment claim** — Screen 35 claimed to establish the Domain Dashboard Template (already established by Screen 26, Batch 6). **Fixed**: Changed to "follows the Domain Dashboard Template established by Screen 26". Moved Domain Header, SIA Coaching Note Card, and FAB from "Patterns established" to "Patterns referenced".

9. **[Screen 30] False pattern establishment claim** — Screen 30 claimed to establish Domain Dashboard Header and SIA Coaching Note Card (established by Screen 26). **Fixed**: Moved to "Patterns referenced" section.

10. **[28 screens] Horizontal margins 24pt instead of 16pt** — 28 product screens used 24pt per side (48pt total) instead of the standardized 16pt per side (32pt total). **Fixed**: All 120+ margin references updated. Auth screens (01-05) correctly kept at 24pt.

---

## Minor (fix during implementation)

1. **[Screen 26] "Start workout" CTA is 48pt instead of 56pt** — All Brand CTA Buttons are 56pt, but the in-card CTA on Screen 26 is 48pt. Documented as an intentional "In-Card CTA" variant (see `_shared-patterns.md`).

2. **[Screen 37] SIA prompt text is 17pt instead of 15pt** — Journal's SIA Reflection Prompt uses 17pt (vs 15pt on other SIA Coaching Note Cards). Documented as intentional — the prompt is the screen's primary content and emotional hook.

3. **[Screen 26] Eyebrow labels use 12pt instead of 11pt** — Domain-colored eyebrows on Screen 26 use 12pt Sora Semibold with domain color. Documented as an intentional domain dashboard variant in `_shared-patterns.md`.

4. **[Screen 34] Spirituality domain color (#A855F7) proximity to SIA purple (#7F24FF)** — Both purples appear on Screen 34 simultaneously. Documented with mitigation: SIA always has avatar indicator; domain color only on accent lines/tag chips.

5. **[Screen 10] Is a UI mode, not a separate screen** — Screen 10 (SIA Voice In-Chat) is described as "a UI state change within Screen 09, not a stack push". Has its own file for spec completeness, but navigation model should note this is a mode toggle.

6. **[Screen 41] Dual tab ownership** — Schedule/Calendar can exist in both the Today tab stack (from Home) and Me tab stack (from Explore). Should be handled as a shared screen in React Navigation.

7. **[Screen 03 → 06] Missing reverse navigation link** — Screen 03 lists navigation to Screen 06 (guest mode), but Screen 06's "Arrives from" may not list Screen 03. Minor since the link is documented on one side.

8. **[Screen 22] Connect button at 36pt height** — Below 44pt minimum touch target. Button padding should ensure the touch area expands to at least 44pt during implementation.

9. **[Screens 35-36] Domain Header height 88pt vs 56pt on Screens 26-34** — **RESOLVED in Final Audit (2026-05-21)**: Documented in `_shared-patterns.md` → Domain Dashboard Rules → Header Height Standard. 56pt fixed is the standard; 88pt collapsing is the exception for [35] and [36] only (screens with subtitle rows).

10. **[Screen 42] Confetti uses amber/gold (#F59E0B)** — Same hex as Creativity domain color. Acceptable as celebration palette, not domain identification.

---

## Resolved in Final Audit (2026-05-21)

The following issues were identified and fixed during the final audit pass:

1. **[Screen 09] Rich Inline Cards had no granular layouts** — 6 card types now fully specified in `_shared-patterns.md` (Chart, Goal Progress, Meal Plan, Financial Summary, Workout Preview, Connection Spotted)
2. **[Screen 15] Domain Picker Dropdown was referenced but never specified** — Full component spec added to `_shared-patterns.md` (bottom sheet, 2-column grid, multi-select)
3. **[Screen 11] Avatar behavioral states were prose-only** — Measurable specs added (3D state table + 2D fallback table with exact parameters)
4. **[Screen 07] Fallback onboarding navigation was undefined** — Explicit flow added (templated plan → [08] → async SIA catch-up)
5. **[Screen 08] Edit mode was incomplete** — Full spec added (save/cancel, validation, preview checkboxes, inline editing)
6. **[Screen 19] Reward Card had conflicting edit patterns** — Standardized on tap-to-edit (swipe-to-edit removed)
7. **[Screen 12] Action Card expansion state was unspecified** — Full expanded state added (SIA reasoning, animation, single-expand constraint)
8. **[Screens 09, 10, 11] Stale "not yet drafted" references** — All replaced with concrete cross-references
9. **[All screens] Motivation tier detection logic undocumented** — Full detection, thresholds, and transition rules added to `_shared-patterns.md`
10. **[Screen 06] Demo data not marked as illustrative** — Per-card "demo" badge and context line added
11. **[Screen 34] Prayer times had no geolocation handling** — Location permission flow added (pre-education, GPS, manual fallback)
12. **[Screens 32, 33] Pull-to-refresh missing from motion tables** — Added
13. **[Screen 17] SIA presence was weak** — Promoted from 1-liner to dedicated coaching note card
14. **[Screen 17] Stats row had no navigation affordance** — Chevron added
15. **[Screen 38] Habit edit mode was undefined** — Entry/exit mechanism added (edit link, drag handles, delete flow)
16. **[Screen 41] Drag ghost was vague** — Full visual spec added (semi-transparent, dashed border, domain tint)
17. **[Screen 40] V2 features mixed into V1 spec** — Moved to dedicated deferred section
18. **[Screen 34] Practice customization was unspecified** — Two paths added (SIA conversational + inline editing)

---

## Suggestions (non-blocking)

1. **Wellbeing (#14B8A6) and Finance (#10B981) color proximity** — These teal/emerald shades are close in hue. Consider accessibility testing for colorblind users. No action needed now.

2. **Screen 40 (Community) has no SIA presence** — Not listed as an intentional exception (unlike Screens 19, 23, 38, 39). Consider adding to the exception list or adding a subtle SIA coaching note about social engagement.

3. **Screen 06 domain chips use 20% opacity for selected state** — Different from Domain Tag Chip's 15% opacity. These are different components (interactive picker vs. display tag), so no conflict, but worth noting the distinction during implementation.
