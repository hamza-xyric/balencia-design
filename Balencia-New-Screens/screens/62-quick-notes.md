# 62-quick-notes

## 1. Header
- **Screen ID:** 62
- **Name:** Quick notes
- **Route(s) covered:** `/quick-notes`
- **Tab:** Me
- **Source:** Functional Content Brief 62, Quick Notes draft, Balencia Glass Canon v1
- **Batch:** 16

## 2. Purpose
Provides a capture-first layer for raw observations before they disappear: symptoms, mood shifts, reactions, ideas, reminders, and tiny context clues. The screen turns messy notes into tagged memory that CIA can reference without pretending the note is more structured than it is.

## 3. Entry & exit
- **Entry paths:** Me Main [17], CIA Chat [09] deep-link, global FAB long-press, tab overflow action, and notification replies that capture quick context.
- **Exit paths:** Back to Me, dismiss the quick-capture sheet, ask CIA with selected note context, expand a note into Journal [37], or open tag assignment.
- **Failure exit:** If sync fails, notes save locally with an offline chip and reconcile later.

## 4. Layout anatomy
**Regions top-to-bottom:**
1. **Atmosphere:** Warm radial glow and soft grain; no decorative clutter because the composer needs focus.
2. **TopBar:** Back chevron, title, and `ask CIA` pill.
3. **Archive Summary:** Solid card with monthly capture sparkline and local provenance.
4. **Filter/Search Row:** Domain chips and optional search field.
5. **Notes Feed:** Reverse-chronological `NoteCard` list grouped by day.
6. **Quick Add Bar:** Pinned glass composer with text input, mic, and send button.
7. **Footer:** `GlassNavBar` for root context, hidden in sheet mode.

**ASCII wireframe (390x844):**
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
|  | health · 12 min ago · you logged      |  |
|  +---------------------------------------+  |
|  +---------------------------------------+  |
|  | CIA noted: work stress mentioned...   |  |
|  | mood · 1 hr ago · derived from chat   |  |
|  +---------------------------------------+  |
|                                             |
|  Yesterday                                  |
|  +---------------------------------------+  |
|  | Hydrated well after lunch.             |  |
|  | nutrition · Mon · you logged           |  |
|  +---------------------------------------+  |
|                                             |
|  +---------------------------------------+  |
|  | what's on your mind.             >    |  |
|  +---------------------------------------+  |
|        Today      CIA      Goals      Me    |
+---------------------------------------------+
```

## 5. Components
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

## 6. Visual treatment
- **Atmosphere:** `--bg-base` with warm radial glow top-center and 3% grain. The feed stays visually quiet so notes remain readable.
- **Glass tiers:** Note cards use `.glass-card`; composer uses `.glass-frost`; archive summary uses `SolidCard` because chart labels and counts need crisp contrast.
- **Semantic glows:** User-created notes use `--glow-you` on press only. CIA-injected notes use a subtle `--glow-cia` edge to show AI-derived memory. Save success uses `--glow-done`.
- **Hero type moment:** Screen title renders as `quick *notes*`, with only `notes` in Tiempos italic.
- **Color discipline:** Orange for capture, purple for CIA-derived notes, green only for saved/processed states.

## 7. Content & copy
- **TopBar:** `Quick notes`
- **CIA action:** `Ask CIA`
- **Title treatment:** `quick *notes*`
- **Composer placeholder:** `what's on your *mind*.`
- **CIA attribution:** `CIA noted: you mentioned feeling stressed about *work*.`
- **Search placeholder:** `search *notes*.`
- **Empty state:** `Capture a thought, observation, or *reminder*. CIA will help connect the dots.`
- **Filter empty:** `No notes in this tag yet.`
- **Save success:** `Note *saved*. CIA is reading it.`
- **Save error:** `Couldn't save. Your text is still here.`
- **Delete undo:** `Note deleted`, `Undo`
- **Offline banner:** `Offline - cached notes shown.`
- **Sparkline captions:** `captured this month`, `your capture activity will appear here`

## 8. Data & honesty states
- **Weekly note frequency**
  - **Real:** Solid orange sparkline with `12 notes this week` and `derived locally`.
  - **Low-confidence:** Trailing segment dashed with `sync pending`.
  - **Honest-null:** Sparkline hidden with `your capture activity will appear here`.
- **Tag distribution**
  - **Real:** Chip count such as `4 health` with `you logged`.
  - **Low-confidence:** `about 4 health` muted while auto-tagging is pending.
  - **Honest-null:** Count hidden; empty filter explains no notes match.
- **Note word count**
  - **Real:** `45 words` appears only in high-motivation metadata with `parsed locally`.
  - **Low-confidence:** Not estimated because it is exact text parsing.
  - **Honest-null:** Hidden for empty notes or voice capture in progress.
- **CIA extraction**
  - **Real:** Derived note shows source chip such as `from chat`.
  - **Low-confidence:** Shows `needs review` before being used for coaching.
  - **Honest-null:** No AI card appears until there is a real captured signal.

## 9. All states
- **Default:** Archive summary, filters, day-grouped notes, and pinned composer are visible.
- **Skeleton:** Summary sparkline and note rows use depth-preserving shimmer; composer stays usable.
- **Empty:** Composer auto-focuses, filters hide, and the empty prompt centers under the summary area.
- **Search empty:** `HonestNullState` explains the query or tag has no notes without clearing the note archive.
- **Error:** Save error keeps typed text intact and shows a retry affordance.
- **Success:** New note slides into the top of Today, tags shimmer briefly, and saved glow resolves to neutral.
- **Offline:** Notes queue locally with an orange cloud chip; archive summary labels the data as cached.
- **Disabled:** Send button remains at 40% opacity until text or voice input exists.

## 10. Motion & interaction
- **Capture:** Send button scales to .98 for 150ms, spins during save, then returns to the composer.
- **New note:** Card slides in from the top over 220ms using physical easing.
- **Swipe actions:** Swipe left exposes delete and tag; commit threshold is 60% card width.
- **Composer:** Keyboard-safe glass bar pins above the home indicator and keeps fixed height as placeholder text changes.
- **Glow behavior:** CIA note edge breathes on a 4s loop; user-note glow appears only during press or save.
- **Reduced-motion:** Card insertions crossfade, sparkline draws instantly, and CIA glow remains static.

## 11. Motivation-tier adaptation
- **Low:** Shows composer, two recent notes, and no analytics. Placeholder reads `even one word counts.`
- **Medium:** Default archive, filters, sparkline, and CIA attribution.
- **High:** Adds word count, export archive action, cross-reference chips, and note-to-journal expansion.

## 12. Accessibility
- **Contrast:** Paper text on glass and solid surfaces meets AA+; cached/offline states include text labels, not color alone.
- **Targets:** Composer send, mic, note rows, swipe actions, chips, and CIA action all meet 44px minimum.
- **Screen-reader labels:** Send button reads `Save note`; mic reads `Record voice note`; sparkline summarizes weekly count and direction.
- **Input safety:** Typed content is preserved on errors, offline transitions, and accidental sheet dismiss attempts.
- **Reduced-motion:** Mirrors Section 10 and respects OS preference.

## 13. Premium checklist
1. **Connects:** Notes can feed CIA, Journal, and domain tags without over-structuring raw capture.
2. **Honest:** Frequency, tags, word counts, and CIA extraction all define real, low-confidence, and honest-null states.
3. **Premium:** Pinned glass composer, selective note glass, solid chart summary, and calm motion are specified.
4. **Warm-dark atmosphere:** Required radial glow and grain are present without distracting from writing.
5. **Semantic glow:** Orange capture, purple CIA memory, green saved confirmation only.
6. **60/30/10:** Color roles stay distinct across feed, composer, and summary.
7. **Type:** Neue Montreal UI with one Tiempos emphasis in the title and key prompts.
8. **All states:** Default, skeleton, empty, search empty, error, success, offline, and disabled are covered.
9. **Motivation tiers:** Low, medium, and high versions keep capture first.
10. **Accessibility:** AA+ contrast, 44px targets, labels, preserved input, and reduced-motion path are included.
11. **Catalog fit:** New note card is justified by swipe, tag, and AI-attribution needs.
12. **CIA voice:** Calm, direct, sentence case, no exclamation marks.
13. **Data visualization:** Sparkline is honest, local, and single-color.
14. **Route hygiene:** Covers the live quick-notes route only.
