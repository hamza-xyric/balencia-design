# Affordance inventory — S-03 first pass (R0, baseline SHA 737d5ad)

Scanner blind spot: visually-interactive bare `div`/`span` (no native tag, no ARIA role).
Scope: the 21 strict-flagged screens + shared kit. Findings feed RW items into R3/R4;
R11 re-runs this inventory as verification only. Sonnet sweep, orchestrator-collated;
rows are evidence for the fixing batch, which re-verifies each locator.

Harness-extended non-native roles (separate field `nonNativeRolesExtended`):
- S45: `div role=slider` for "Energy, 7 out of 10" (+ second slider "Stress" below fold) — R3

## Shared kit (chrome/cia/data/chips/surfaces/system) — 5 row(s)
_A24-002's enumeration of chrome.tsx bare-div/span affordances (TopBar back span, GlassNavBar tab divs, FloatingQuickLog outer div) is COMPLETE for chrome.tsx itself — no other visually-interactive bare elements found there (StepperRail's step circles/labels are non-actionable indicators, IconButton is already a real <button>). However the list is NOT complete for "the rest of the kit": cia.tsx's Composer and VoiceComposer each render their attach/mic/send controls as bare <span> icon buttons (some missing aria-label entirely) rather than <button>, and these are reused across 4+ live screens. data.tsx (all chart/gauge primitives, correctly role="img"/decorative), chips.tsx (Chip already splits interactive=<button> vs display=<span> correctly), surfaces.tsx, and system.tsx surfaced no additional affordance issues._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| VoiceComposer attach/plus icon control | `kit/cia.tsx:53-55 (VoiceComposer)` | 44px rounded-full icon target styled identically to the Composer's real attach affordance, but rendered as a bare <span> with no aria-label, no role="button", and no tabIndex — key | High | A24-003 |
| VoiceComposer mic/voice-input icon control | `kit/cia.tsx:57-59 (VoiceComposer)` | Has aria-label="Voice input" but is a <span>, not a <button> — not natively focusable or operable via keyboard/switch access despite looking like the primary voice-record affordanc | Medium | A24-003 |
| VoiceComposer send icon control | `kit/cia.tsx:60-62 (VoiceComposer)` | aria-label="Send" present but element is a <span>; the primary message-send action is not keyboard-operable or in the tab order. | High | A24-003 |
| Composer attach/plus icon control | `kit/cia.tsx:70-72 (Composer)` | Same 44px rounded-full tappable-looking icon as VoiceComposer's attach control but with no aria-label at all and no button semantics — used on S07/S09/S40/S75, so this recurs acros | High | A24-003 |
| Composer send icon control | `kit/cia.tsx:74-76 (Composer)` | The primary chat send button has zero accessible name (no aria-label, no visible text, icon-only) and is a bare <span>, not a <button> — screen reader users cannot identify or acti | High | A24-003 |

## S03c — 0 row(s)
_High confidence: full source read (88 lines). Only interactive elements present are the two role=checkbox ConsentRow divs, the role=switch Toggle span (all already known/excluded), and the disabled BtnPrimary CTA. No additional zero-role bare div/span affordances found — no cards, chips, or rows with tap-implying styling beyond the known three roled elements._

No bare-affordance rows beyond known findings.

## S04 — 4 row(s)
_6 zero-role affordances found beyond the known switch; baseline interactive count (6) is not decreased. Confidence: high for the show-password and Sign-up link (clear action affordances); medium for the safety-resources row; low/marginal for the disabled Face ID control since it is intentionally non-actionable during cooldown but still visually reads as a button, flagged for R4 (S60 safety/honesty work) rather than plain semantics._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Password visibility toggle (Eye icon) | `balencia-screens/src/components/hifi/screens/auth/S04SignIn.tsx:58-65` | Rendered as a span with aria-label='Show password' and an Eye icon in a tap-sized (44x44) target inside the password field trailing slot — visually and semantically implies a toggl | High | R3 |
| "Sign up" inline link | `balencia-screens/src/components/hifi/screens/auth/S04SignIn.tsx:134` | Styled distinctly (font-semibold, brand-orange) inside a sentence, matching the visual convention of a tappable link used elsewhere on this screen (e.g., Forgot password), but it i | High | R3 |
| "Support and safety resources" row | `balencia-screens/src/components/hifi/screens/auth/S04SignIn.tsx:126-131` | Icon + label combination laid out like a tappable utility link (min-h-11 tap target, ShieldCheck icon, muted-but-legible text) implying it opens a help/safety resource, but is a ba | Medium | R3 |
| Face ID / biometric quick-auth affordance (disabled state) | `balencia-screens/src/components/hifi/screens/auth/S04SignIn.tsx:114-119` | Rendered as a large 56x56 glass-pill circle with a Fingerprint icon, matching the visual pattern of a biometric quick-auth button; even though intentionally disabled (opacity-40) d | Low | R4 |

## S15 — 3 row(s)
_Moderate confidence. Scanned S15CreateEditMission.tsx plus underlying kit primitives (Chip, GlassPillInput) since the screen composes them without the `interactive` prop, so the rendered DOM is a bare div/span with none of the button/role semantics those primitives can optionally add. Milestone row and CIA card body were judged non-affordances (no chevron/action cue, static preview) so excluded. Domain type/status text and XP-forecast copy are static, excluded._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Mission-prompt text field ('What do you want to achieve?' / 'Run a half marathon by October') | `S15CreateEditMission.tsx:43 (renders via kit/buttons.tsx GlassPillInput div, line ~79)` | Rendered as a plain <div> styled with glass-pill focus glow exactly like a text input; it is the primary data-entry affordance on the screen (tap to edit prompt) but has no native  | High | R3 |
| Prompt example chips: 'Save $5,000', 'Meditate daily', '5K' | `S15CreateEditMission.tsx:47-51 (Chip called without `interactive`, renders as <span> per kit/chips.tsx:16-20)` | Tap-to-fill suggestion chips — spec intent is that tapping inserts the example into the prompt field; rendered as bare <span> with no button tag, no role, no cursor-pointer/hover s | High | R3 |
| Domain chips 'Fitness' and 'Nutrition' with embedded X (remove) glyph | `S15CreateEditMission.tsx:87-92 (Chip tone="you" without `interactive`, renders as <span>)` | Each chip bundles an X icon signaling a removable tag (tap-to-remove domain), but the whole element is a bare <span> — no button wrapper around the X, no role, no aria-label, no ta | Medium | R3 |

## S22 — 3 row(s)
_Most primary/secondary controls on this screen (Force sync, Connect, Notify me, Export/Delete provider rows, View privacy controls, Save preferences) are already native <button> elements from BtnGhost/BtnPrimary/raw <button type=button> — those are NOT bare divs and are excluded per instructions. The one clear zero-role affordance cluster is the per-provider Chip row (Source/Scope/Freshness/Retention/Export/Revoke/Delete) on the WHOOP SolidCard: these are rendered through the shared Chip component (a styled span/div, not a button) but their copy (Export, Revoke, Delete) implies tappable per-field controls, with no onClick/role wired — this is the standout bare-affordance risk on this screen. Confidence: medium-high; did not inspect Chip/SolidCard/GlassCard kit source to confirm they never forward onClick — flagging based on visible tag usage in this file only. Removed the invalid Garmin row (that is a native button, filed in error) — net actionable rows: 2 (WHOOP card container ambient affordance, chip row itself). Baseline count of 3 interactive elements for this screen is not decreased by this audit — this is additive documentation only, no code changed._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| WHOOP card SolidCard wrapper — whole card visually implies detail/expand (has border-t divider, chips row 'Source/Scope/.../Delete' suggesting sub-actions) but the outer card div itself carries no role/button semantics | `S22ConnectedServices.tsx:41-75` | Card groups clickable-looking sub-affordances (Revoke/Delete/Export chips) under a div with no interactive semantics for the card as a whole or for the chip row items | Medium | R3 |
| Per-provider action Chips: Source, Scope, Freshness, Retention, Export, Revoke, Delete (7 chips in WHOOP card) | `S22ConnectedServices.tsx:66-74` | Copy implies discrete controls (Export/Revoke/Delete are actions, not statuses); rendered via shared Chip component as bare span/div with no role=button and no click handler, so a  | High | R3 |
| Garmin 'Notify me when available' control | `S22ConnectedServices.tsx:141-143` | Already a <button> tag — not applicable; skip. (Verified native, excluded) | Low | R3 |

## S23 — 1 row(s)
_High confidence. Scanned full S23 source line-by-line plus the shared Chip/SolidCard kit primitives. Only one net-new zero-role affordance found beyond the already-flagged Update/Buy-credits/Credits-ledger touch-target items: the non-active plan tiles' \"View\" Chip renders as a plain span because the interactive prop is never passed at the callsite. The whole plan SolidCard tile is a <section>, not independently flagged since its only actionable cue is that same View chip. Compare-plans checkmarks, ledger rows, and status dots are static/decorative and excluded._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Plan tier tile action pill — text "View" (non-active plans: Free, Plus, Max) | `S23SubscriptionBilling.tsx:112 (renders via kit/chips.tsx:16-20, Chip without interactive prop → <span>)` | Copy "View" plus pill/chip shape strongly implies a tap-to-view/select-plan action inside a horizontally-scrolling plan rail ("Swipe to compare"), but Chip defaults to non-interact | High | R3 |

## S30 — 2 row(s)
_High confidence. All primary/secondary tappable-looking rows on S30 already use native <button> (Ask CIA, Adjust Or Roll, transaction rows) so they are excluded per instructions; the only zero-role bare-affordance is the shared SectionTitle 'meta' span, which appears twice on this screen (Budgets, Transactions). Baseline count of 1 is preserved/increased, not decreased._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| "View all" meta label on Budgets section header | `src/components/hifi/kit/chrome.tsx:72 (rendered via SectionTitle at S30FinanceMoneyMap.tsx:111)` | Plain <span> with action-implication copy "View All" styled as a link/action next to a section title, but has no button/link tag, no role, no cursor-pointer, and no handler — a use | Medium | R3 |
| "View all" meta label on Transactions section header | `src/components/hifi/kit/chrome.tsx:72 (rendered via SectionTitle at S30FinanceMoneyMap.tsx:137)` | Same bare <span> SectionTitle 'meta' affordance rendered a second time on this screen for the Transactions list — action copy implies navigation to a full transactions view with ze | Medium | R3 |

## S34 — 0 row(s)
_High confidence: every tappable element on S34 (prayer rows, CIA "Read more", "Tap to write", ritual cards, "Begin mission", ConsentRail chips, data-sources icon) already uses a native <button> tag or a Chip built on <button>. The circular unchecked-state indicators (lines 76/83/90) and the status dot (line 35) are aria-hidden decorative glyphs inside an already-native button row, not separate affordances. No new zero-role bare-div/span affordances found on this screen; baseline count of 7 stands unchanged from this pass._

No bare-affordance rows beyond known findings.

## S39 — 4 row(s)
_Buttons/tabs in this screen already use native <button> tags (scanner sees them). The only zero-role affordances found are the ones the spec explicitly marks tappable (own-rank card -> RPG Character; friend rows -> limited profile sheet) but the JSX implements them as plain non-interactive divs with no onClick/role/cursor styling at all. Moderate confidence — flagged only elements with explicit spec-cited tap behavior, not decorative chips/avatars._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Own-rank card (Amira/You summary card with avatar, XP, MomentumBar, streak) | `social/S39Leaderboard.tsx:71-113` | Spec Motion section states 'Own card: tap opens RPG Character [19]' — this is the primary navigation affordance on the screen, but the wrapping GlassCard div has no onClick, role,  | High | R3 |
| Friend row — Omar (rank 4, 3,410 XP, Finance chip) | `social/S39Leaderboard.tsx:124-135` | Spec Motion section states 'Row: tap opens limited profile with report/block' — the SolidCard/div has no role, onClick, tabIndex, or hover/active affordance styling despite being a | Medium | R3 |
| Friend row — Priya (rank 5, 3,200 XP, Wellbeing chip) | `social/S39Leaderboard.tsx:137-148` | Same row-tap-to-profile affordance per spec Motion section; bare SolidCard div, no role/onClick/hover cue. | Medium | R3 |
| Friend row — Yara (rank 6, 2,980 XP, Creativity chip) | `social/S39Leaderboard.tsx:150-161` | Same row-tap-to-profile affordance per spec Motion section; bare SolidCard div, no role/onClick/hover cue. | Medium | R3 |

## S40 — 3 row(s)
_High confidence: verified via direct source read of S40CommunityRooms.tsx plus the shared kit components it instantiates (Composer in kit/cia.tsx, Chip in kit/chips.tsx). Screenshot not opened (text-only diff sufficed since all bare-affordance evidence is structural/JSX-level, not visual-only); flag if a visual pass surfaces additional cursor-pointer-only divs not caught by source inspection. Excluded the already-known text-overflow rows and all native <button>/aria-labelled rows already present (Preview room, Create room, room-open rows, Report/Mute/Block, moderation menu, settings) plus purely decorative status chips (Public, Moderated) and static text.</notes>
_

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Composer send button (orange circle, paper-plane icon, no text label) | `src/components/hifi/kit/cia.tsx:74-76 (rendered via Composer used at S40CommunityRooms.tsx:160)` | Rendered as a bare <span> styled exactly like a primary circular icon-button (bg-brand-orange, shadow-[var(--glow-orange-sm)], centered Send icon) at the end of the message compose | High | R3 |
| Composer attach/plus button (circular icon, Plus glyph, left of text field) | `src/components/hifi/kit/cia.tsx:70-72 (rendered via Composer used at S40CommunityRooms.tsx:160)` | Rendered as a bare <span> in a circular 44px hit-area slot identical in shape/position to a leading action icon-button (add attachment); no native tag or ARIA role despite looking  | Medium | R3 |
| Sharing-controls chip row: Visibility / Audience / Export / Revoke / Delete | `src/components/hifi/screens/social/S40CommunityRooms.tsx:188-192 (Chip component, kit/chips.tsx:7-21, called without `interactive` prop)` | Chip is called with default interactive=false so it renders as a plain <span> pill with no role, yet the labels are action verbs (Export, Revoke, Delete) identical in wording to th | Medium | R3 |

## S41 — 6 row(s)
_High confidence on the two Unscheduled rows and the Team sync/Lunch walk timeline cards (clear card affordance, no role/tag); day-strip and missed-event-container rows are more marginal/ambiguous (could be intentionally read-only per spec) so flagged lower severity for verification against the spec._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Unscheduled row 1 "Deep work block" card | `S41ScheduleCalendar.tsx:143-152` | Full row styled as a tappable list item (rounded card, icon+text+drag handle) — visually implies tap-to-open/edit/schedule the task, but the wrapping div has no role/button/onClick | High | R3 |
| Unscheduled row 2 "Read 10 pages" card | `S41ScheduleCalendar.tsx:153-162` | Same pattern as row 1 — looks like a tappable scheduling row with no native interactive tag or role on the row container. | High | R3 |
| Timeline event block "Team sync" (Career) | `S41ScheduleCalendar.tsx:175-183` | Rendered as a card with colored accent border, glow shadow, and event details — visually a tappable calendar event (to view/edit details) but is a bare div with no role or onClick  | High | R3 |
| Timeline event block "Lunch walk" (CIA fit projected) | `S41ScheduleCalendar.tsx:187-196` | Dashed-border suggestion card with a "Projected" chip — implies a tappable CIA-suggested slot (e.g., to accept/view), but is a bare div with no role. | Medium | R3 |
| Timeline event block "1:1 with Aisha" (Missed) container | `S41ScheduleCalendar.tsx:199-208` | The outer missed-event card itself (distinct from the already-known Reschedule button inside it) is styled as a tappable row (dashed border, muted card) implying tap to view/dismis | Low | R3 |
| Week strip day circle (e.g., Thursday "T" today marker) | `S41ScheduleCalendar.tsx:72-84` | Individual day circles inside the aria-label'd week-strip container are styled with distinct today/selected treatment and completion dot, implying each day is independently tappabl | Medium | R3 |

## S45 — 2 row(s)
_Confident. DomainTag (career/fitness pill) and the Energy/Stress role=slider are already correctly implemented as <button>/role=slider per the given known/extended lists and were excluded. SafetyCard renders as pure static info with zero visible tap affordance (no bare-div action to file). Baseline count of 10 native interactive elements is unaffected — these 2 rows are net-new zero-role affordances layered on top._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Reflection text field (GlassPillInput) — shows 'Closed the deck. Slept badly the night before.' | `balencia-screens/src/components/hifi/screens/today/S45DailyCheckin.tsx:169-172 (component: balencia-screens/src/components/hifi/kit/buttons.tsx:79-92)` | Renders as a glass pill input row with placeholder/value text exactly like a tappable text-entry field (h-[52px], focus-glow styling supported) but is a bare <div> with no role='te | High | R3 |
| 'Not now' dismiss action next to 'See the pattern' in the Tomorrow insight card | `balencia-screens/src/components/hifi/screens/today/S45DailyCheckin.tsx:181` | Sits inline with a real <BtnSecondary> action, has a dedicated min-h-11 touch-target box and action-style copy ('Not now') implying it dismisses/declines the insight, but it is a b | Medium | R3 |

## S49 — 3 row(s)
_Medium-high confidence. All primary/secondary CTAs and time-range tabs on this screen already use <button>/role=tab or role=img (checkpoint icon), so the strict-scanner-visible baseline of 5 is intact. The 3 rows filed are net-new zero-role affordances: two are the shared kit SectionTitle 'meta' span (used twice on this screen, both action-implying copy: See all, Compare) and one is the ambiguous PhotoCheckpoint row (no explicit hover/cursor cue, flagged Low since tappability is inferred from the section's Compare action rather than directly styled)._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| SectionTitle meta label "Compare" (Progress photos section) | `balencia-screens/src/components/hifi/screens/health/S49ProgressPhotos.tsx:131 (renders via kit/chrome.tsx:72 bare <span>)` | Reads as a tappable secondary action next to a section title (parallels 'See all' pattern used elsewhere in the app for navigation/mode-toggle actions); spec's compare-enabled stat | High | R3 |
| SectionTitle meta label "See all" (Measurements section) | `balencia-screens/src/components/hifi/screens/health/S49ProgressPhotos.tsx:117 (renders via kit/chrome.tsx:72 bare <span>)` | Classic 'See all' list-expansion affordance copy, styled as a bare <span> with no role/tag/cursor-pointer — user would expect to tap it to view the full measurements list. | Medium | R3 |
| Photo checkpoint timeline rows (Oct 12 / Sep 15 / Aug 18) inside Progress photos SolidCard | `balencia-screens/src/components/hifi/screens/health/S49ProgressPhotos.tsx:134-142, PhotoCheckpoint component 169-207` | Each row is a full-width list item (icon thumbnail + date + confidence/hidden note) in a card whose section header carries a 'Compare' action — visually this reads as a selectable/ | Low | R3 |

## S51 — 0 row(s)
_Reviewed S51VoiceCallHistory.tsx (162 lines) fully. All interactive-looking elements (segmented tabs, per-call delete icon buttons, Schedule a call ghost button, IconButton for scheduling) already use native button tags or ARIA roles — no bare div/span affordances found. Status pill spans (Recording retained, Transcript generated, You deleted) and safety-notice/consent-rail blocks are static/decorative, not tappable per spec. High confidence — no new rows to file beyond the already-known wrong-tag items._

No bare-affordance rows beyond known findings.

## S57 — 3 row(s)
_'Hide purchased' toggle (line 68) and 'Add' trailing button (line 49) are native <button> elements so excluded. The two role=checkbox spans (lines 133-144, produce items) are pre-known per prompt and excluded, but note: protein-section items (Chicken thigh, Salmon fillet) ALSO render the same role=checkbox span via the shared ShoppingItemRow component — same known issue, not re-filed as new. Confidence: medium — the row-level tap affordance (Medium severity) is the most defensible new finding; the two Chip findings are marginal/Low since Chip may be purely decorative provenance display per canon, not confirmed tappable in spec at 57-shopping-list.md (not fully re-read for interaction cues on chips specifically).</notes>
</invoke>
_

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| ShoppingItemRow root row (e.g. 'Avocados (2)' / 'Salmon fillet (~2 servings)') — whole row div wrapping checkbox+text | `S57ShoppingList.tsx:132` | Spec calls for tappable row (undo-before-move interaction, 1.5s undo motion) beyond just the 44px checkbox target; row div has no role/tabIndex/handler and is not a native interact | Medium | R3 |
| Chip 'Computed locally' inside summary GlassCard header | `S57ShoppingList.tsx:62` | Rendered as a pill-shaped provenance chip; visually indistinguishable from actionable chips elsewhere in kit, no action implied here though — flagged only as ambiguous/marginal sin | Low | R3 |
| Source provenance Chip per item (e.g. 'Meal plan', 'Estimated · sync pending') | `S57ShoppingList.tsx:150` | Chip component styling matches tappable provenance chips used elsewhere in the app to reveal source detail (per canon provenance-chip pattern), but here it's a bare span/div with n | Low | R3 |

## S60 — 4 row(s)
_Confident on the two untaken-dose toggle rows (Adderall XR, Melatonin) as High — they visually mirror a checkbox/button pattern with explicit action copy and a deliberate 44px tap height. Completed-dose rows (Vitamin D, Magnesium) are filed Medium as plausible undo-toggle affordances rather than certain ones. Did not file the 'All medications' roster rows (no chevron/hover cue, read as static data) or the ProgressRing/Sparkline visuals (non-interactive charts)._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Afternoon dose row 'Adderall XR' — empty check-circle + 'Take when ready' row, entire row min-h-[44px] | `balencia-screens/src/components/hifi/screens/health/S60MedicationTracking.tsx:109-119` | Empty circular checkbox styled identically to the completed forest-green check-circles above it, sized as a 44px tap target, paired with explicit action copy 'Take when ready' — cl | High | R3 |
| Evening dose row 'Melatonin' — empty check-circle toggle row | `balencia-screens/src/components/hifi/screens/health/S60MedicationTracking.tsx:130-137` | Same untaken-dose checkbox pattern as Adderall XR row: circular outline button shape at a 44px row height implying tap-to-mark-taken, rendered as bare <div> | High | R3 |
| Morning dose row 'Vitamin D' — completed forest-green check-circle row | `balencia-screens/src/components/hifi/screens/health/S60MedicationTracking.tsx:78-87` | Completed-state checkbox icon in the same interactive row pattern as the untaken doses; a user would expect tapping it to undo/toggle the logged dose, but it's a bare <div> with no | Medium | R3 |
| Morning dose row 'Magnesium' — completed forest-green check-circle row | `balencia-screens/src/components/hifi/screens/health/S60MedicationTracking.tsx:89-98` | Same completed-checkbox toggle pattern as Vitamin D row above; implies tap-to-undo affordance with no native tag or role | Medium | R3 |

## S61 — 0 row(s)
_High confidence: all on-screen tappable affordances are either native <button> (upcoming row link, IconButton, BtnSecondary/BtnGhost, ConsentRail chips — shared kit chrome) or already-flagged role=checkbox/role=switch spans (TaskRow x3, ReminderRow switch x2). No bare zero-role div/span affordances found; TaskRow and ReminderRow outer containers carry no independent tap affordance beyond their known-flagged children. Baseline count of 5 unchanged._

No bare-affordance rows beyond known findings.

## S80 — 1 row(s)
_High confidence. All other buttons/rows on S80 (transport controls, playlist rows, data-honesty action grid, IconButton, BtnPrimary) already use native <button> with aria-label and are excluded per instructions; the only zero-role visually-actionable element is the waveform scrubber, which reads as a seek control given the adjacent timestamp pair but has no interactive semantics at all._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Waveform/progress scrubber (40 bars, div, no label) between now-playing header and transport controls | `S80MusicCoach.tsx:57-65` | Rendered as a segmented waveform progress bar with elapsed/total time labels (1:58 / 3:12) directly below it — visually reads as a seekable scrub bar for the now-playing track, but | High | R3 |

## S81 — 2 row(s)
_Confident on the chip-filter row (clear bare-span pattern from shared kit component) and the row-1 card (asymmetric with siblings that at least carry role=listitem); did not re-file the two pre-known small-touch-target items. Rows 2/3 video cards were excluded because they already carry role=\"listitem\" (a non-interactive but present ARIA role), so they fall outside the strict zero-role definition even though listitem is arguably the wrong role for a tappable row — flagging that mismatch is a judgment call, not filed here._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Category filter chip group: 'Mobility' (active), 'Focus', 'Webinars', 'Saved' — all render as bare <span> because Chip is used without interactive prop | `S81VideoLibrary.tsx:28-31 (renders via kit/chips.tsx:16-20, non-interactive branch)` | Pill-shaped, one chip shown in active 'you' tone vs others muted — unmistakable filter/tab affordance a user will tap to switch category, but Chip defaults to interactive=false so  | High | R3 |
| '5-minute hip reset' video row card — whole row (thumbnail, progress bar, 'Resume where you left off' caption) | `S81VideoLibrary.tsx:82-109 (div at line 83)` | Visually identical in structure to the two sibling rows below it, which both carry role="listitem" (lines 112, 141) — this first row has zero role/tag on its wrapping div, yet show | High | R3 |

## S90 — 2 row(s)
_Medium confidence: both flagged elements are visually row/card-shaped with tap-sized hit areas and action-adjacent copy, but the source has no explicit onClick handlers wired (prototype is visual-only per repo rules), so intent to be tappable is inferred from layout/copy rather than confirmed interaction code. The 6 known role-but-wrong-tag items (Weekly/Monthly/Yearly/Weight/BMI/Measurements tabs) were excluded per instructions. Open/Privacy buttons and the Add-measurement IconButton already use native <button> tags and are excluded._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Photos summary card ("Photos 4" + "Last sync 2h ago" chip) | `src/components/hifi/screens/intelligence/S90ProgressMeasurements.tsx:96-103` | Camera icon + photo count + sync-status chip strongly implies tapping opens the photo-compare gallery (consistent with the adjacent 'Photos are private by default' Open/Privacy car | High | R3 |
| History row entries (3x: Jul 6 / Jun 29 / Jun 22 measurement rows) | `src/components/hifi/screens/intelligence/S90ProgressMeasurements.tsx:129-135` | Styled as discrete list rows (rounded bg pill, min-h-11 tap-sized) inside a data table, the shape strongly cues a tappable row (e.g. to view/edit that logged entry or its source),  | Medium | R3 |

## S93 — 0 row(s)
_High confidence: full source scan of S93MoodTrends.tsx plus its kit dependencies (Chip, ConsentRail, TrendChart) found no bare div/span affordances — every tappable element (timeframe tabs, recent-mood rows, "Add note", ConsentRail chips, CIAInsightCard discuss-link) already renders as a native button or has an ARIA role; TrendChart milestone dots are decorative SVG circles with no interactive styling. Zero new findings beyond the already-known small-touch-target issue._

No bare-affordance rows beyond known findings.

## S97 — 2 row(s)
_Moderate confidence. Most controls on this screen already use real <button> elements (tabs, CIA actions, filter toggle, controls list, Chip.interactive) so the scanner's blind spot is narrow here. The only new zero-role affordances found are the two shelved-plan SolidCard rows (Strength reset, Evening wind-down), which read as tappable library entries per spec language ("Plan list rows use SolidCard for scan density") but carry no interactive markup. The third SolidCard (locked premium template) already exposes its action via an explicit BtnSecondary "Unlock with premium" button, so it was not filed. Baseline count of 9 known interactive elements unchanged/not decreased by this pass._

| Element | Locator | Why it reads interactive | Sev | Batch |
|---|---|---|---|---|
| Shelved plan row "Strength reset" (icon + title + Via CIA chip + progress bar) | `balencia-screens/src/components/hifi/screens/today/S97PlansLibrary.tsx:95-109` | Rendered via SolidCard (a plain <section>, no onClick/cursor-pointer/role) as a discrete plan-library entry with title, provenance chip and progress — spec (97-plans-library.md) de | Medium | R3 |
| Shelved plan row "Evening wind-down" (icon + title + Saved chip) | `balencia-screens/src/components/hifi/screens/today/S97PlansLibrary.tsx:137-150` | Same SolidCard-as-section pattern as the Strength reset row — a plan-library entry a user would tap to view/resume, with no native tag, role, or cursor affordance | Medium | R3 |


**Total rows: 50** (+1 harness-extended S45 slider pair). Interactive-element baseline (never-decrease gate): 490 across 104 screens — see `visual-104-baseline-strict.json` instrumentation.
