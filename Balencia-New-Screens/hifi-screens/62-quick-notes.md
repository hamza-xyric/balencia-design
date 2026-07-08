# 62-quick-notes - A+++ hi-fi mobile spec

## Header
- **Source ID:** 62
- **Source spec:** `Balencia-New-Screens/screens/62-quick-notes.md`
- **Evidence:** screens/62-quick-notes.md, work/briefs/62.md, work/drafts/62.md, Functional Content Brief 62, Quick Notes draft, Balencia Glass Canon v1
- **Route(s):** `/quick-notes`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Provides a capture-first layer for raw observations before they disappear: symptoms, mood shifts, reactions, ideas, reminders, and tiny context clues.
- **Premium Visual Director:** make Quick notes composer the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Quick notes keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
|  <  Quick notes                  ask CIA     |
|                                             |
|  +---------------------------------------+  |
|  | captured this month                   |  |
|  |   /\      /\  /\       12 this week   |  |
|  | derived locally                       |  |
|  +---------------------------------------+  |
|                                             |
|  [ mood ] [ health ] [ workout ] [ idea ]   |
|                                             |
|  Today                                      |
|  +---------------------------------------+  |
|  | Felt a sharp pain in my left knee...  |  |
|  | health  12 min ago  you logged      |  |
|  +---------------------------------------+  |
|  +---------------------------------------+  |
|  | CIA noted: work stress mentioned...   |  |
|  | mood  1 hr ago  derived from chat   |  |
|  +---------------------------------------+  |
|                                             |
|  Yesterday                                  |
|  +---------------------------------------+  |
|  | Hydrated well after lunch.             |  |
|  | nutrition  Mon  you logged           |  |
|  +---------------------------------------+  |
|                                             |
|  +---------------------------------------+  |
|  | what's on your mind.             >    |  |
|  +---------------------------------------+  |
|        Today      CIA      Goals      Me    |
+---------------------------------------------+

Route handling: `/quick-notes`
```

## Focal Hierarchy
- **Dominant focal moment:** Quick notes composer; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere with CIA only when the source supports a synthesized read.
- **Operational layer:** TopBar, Archive Summary, Filter/Search Row, Notes Feed.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*notes*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - transparent with contextual `ask CIA` action.
- **SectionHeader** - day grouping labels.
- **SolidCard** - archive summary and sparkline container.
- **TrendChart** - compact monthly capture sparkline.
- **ChipDomainTag** - horizontal filter row with canonical domain colors.
- **NEW: NoteCard** - glass row supporting tap-to-expand, swipe delete, tag assignment, and CIA attribution.
- **ChatComposer** - pinned glass-pill input with text, mic, and circular send action.
- **VoiceMicGlow** - mic state inside the composer.
- **HonestNullState** - empty search/filter states.
- **Sheet** - half variant for global quick capture.
- **GlassNavBar** - root navigation when full screen.

## Data Honesty
- **Weekly note frequency**
- - **Real:** Solid orange sparkline with `12 notes this week` and `derived locally`.
- - **Low-confidence:** Trailing segment dashed with `sync pending`.
- - **Honest-null:** Sparkline hidden with `your capture activity will appear here`.
- **Tag distribution**
- - **Real:** Chip count such as `4 health` with `you logged`.
- - **Low-confidence:** `about 4 health` muted while auto-tagging is pending.
- - **Honest-null:** Count hidden; empty filter explains no notes match.
- **Note word count**
- - **Real:** `45 words` appears only in high-motivation metadata with `parsed locally`.

## Consent and Safety
- Quick notes keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/quick-notes`. Do not add alternate vanity routes.

## States
- **Default:** Archive summary, filters, day-grouped notes, and pinned composer are visible.
- **Skeleton:** Summary sparkline and note rows use depth-preserving shimmer; composer stays usable.
- **Empty:** Composer auto-focuses, filters hide, and the empty prompt centers under the summary area.
- **Search empty:** `HonestNullState` explains the query or tag has no notes without clearing the note archive.
- **Error:** Save error keeps typed text intact and shows a retry affordance.
- **Success:** New note slides into the top of Today, tags shimmer briefly, and saved glow resolves to neutral.
- **Offline:** Notes queue locally with an orange cloud chip; archive summary labels the data as cached.
- **Disabled:** Send button remains at 40% opacity until text or voice input exists.

## Motion
- **Capture:** Send button scales to .98 for 150ms, spins during save, then returns to the composer.
- **New note:** Card slides in from the top over 220ms using physical easing.
- **Swipe actions:** Swipe left exposes delete and tag; commit threshold is 60% card width.
- **Composer:** Keyboard-safe glass bar pins above the home indicator and keeps fixed height as placeholder text changes.
- **Glow behavior:** CIA note edge breathes on a 4s loop; user-note glow appears only during press or save.
- **Reduced-motion:** Card insertions crossfade, sparkline draws instantly, and CIA glow remains static.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/quick-notes`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper text on glass and solid surfaces meets AA+; cached/offline states include text labels, not color alone.; **Targets:** Composer send, mic, note rows, swipe actions, chips, and CIA action all meet 44px minimum.; **Screen-reader labels:** Send button reads `Save note`; mic reads `Record voice note`; sparkline summarizes weekly count and direction.
