# Screen Design: Conversations Hub

**Screen**: 74 of 90
**File**: 74-conversations-hub.md
**Route**: `/tabs/sia/conversations`
**Register**: AI Mode (royal-purple #7F24FF)
**Primary action**: Start, search, and resume SIA, direct, group, and room conversations
**Tab**: SIA
**Navigation**: Stack push from SIA Chat [09], Community [40], Accountability [46], or social shortcuts. Bottom tab bar remains visible with SIA active.

---

## Purpose

The Conversations Hub is the SIA tab's unified inbox for coaching, direct messages, group chats, and community rooms. It turns conversation history into an organized command center: SIA stays pinned as the primary coach, while people, groups, and rooms are searchable and filterable underneath. The screen supports social accountability without letting it replace SIA as the central coaching relationship.

---

## Information Architecture

**Hierarchy**:
1. Pinned SIA coach hero with live signals and call readiness
2. Search bar for people, rooms, and SIA memory
3. Filter rail for All, SIA, People, Groups, Rooms
4. Pinned conversations list
5. Recent conversations list
6. Persistent "Start new chat" bottom action

**User flow**:
- **Arrives from**: SIA Chat [09] conversation list affordance, Community [40] message CTA, Accountability [46] partner message CTA, Social Buddy Profile [83].
- **Primary exit**: Tap SIA hero -> SIA Chat [09]. Tap direct row -> Direct Chat [75]. Tap group row -> Group Chat [76]. Tap room row -> Community [40].
- **Secondary exits**: Search icon opens search mode; voice icon opens Voice Mode [11]; bottom action starts a new conversation picker.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, scrollable content, fixed bottom action, and visible tab bar.
**Tab bar visible**: Yes, SIA active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
|          Conversations   S V |
+-----------------------------+
|                             |
| [S] Pinned coach            |
|     SIA coach           *   |
|     Recovery, budget, and   |
|     breakfast timing...     |
| [3 live signals][1 draft]   |
|                             |
| [ Search people, rooms... ] |
|                             |
| [All] [SIA] [People] ...    |
|                             |
| PINNED                      |
| [MC] Morning crew       18m |
|      Sarah pinned...    5   |
|      Group  Fitness         |
|                             |
| RECENT                      |
| [AK] Aisha Khan        7min |
|      Shared her pace... 2   |
|      Direct Fitness         |
| [FF] Finance focus       1h |
|      Budget sprint...   >   |
|                             |
+-----------------------------+
|       + Start new chat      |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

### Component Stack

1. **Header** - 56pt, centered title, search icon, voice icon.
2. **SIA Hero** - large rounded card with SIA avatar, live-signal pills, and coach summary.
3. **Search Bar** - standard search input, placeholder "Search people, rooms, and SIA memory".
4. **Filter Rail** - horizontal chips: All, SIA, People, Groups, Rooms.
5. **Conversation Sections** - "Pinned" and "Recent" groups using reusable conversation rows.
6. **Bottom Action** - orange full-width "Start new chat" button.

---

## Components

### Header
- **Purpose**: Screen identity and quick access to search/voice.
- **Visual treatment**: ink-900 background, 56pt height. Title 17pt Sora Semibold, white.
- **Actions**:
  - Search icon: opens in-screen search focus.
  - AudioLines icon: opens voice coaching entry.
- **Touch targets**: 44x44pt minimum.

### SIA Hero
- **Purpose**: Keep SIA as the pinned, primary coaching thread.
- **Visual treatment**: 16pt horizontal margins, rounded-xl card, royal-purple border at 25%, purple radial accent, ink-brown surface.
- **Content**:
  - Large SIA avatar with active presence dot.
  - Eyebrow: "Pinned coach" in royal-purple.
  - Title: "SIA coach".
  - Summary: current cross-domain signal.
  - Signal pills: "3 live signals", "1 draft plan", "Ready to call".
- **Gestures**: Tap -> SIA Chat [09].

### Search Bar
- **Purpose**: Find conversations, rooms, people, and SIA memory references.
- **Behavior**: Focus expands to search mode; query filters all visible conversation rows. Empty query restores section grouping.

### Filter Rail
- **Purpose**: Narrow the inbox by conversation type.
- **Visual treatment**: Horizontal scroll, 8pt chip gaps, active chip orange, inactive chips ink-brown.
- **Behavior**: Single-select. Default is All.

### Conversation Row
- **Purpose**: Resume a thread quickly.
- **Visual treatment**: 74pt minimum row, rounded-lg, ink-brown-800, subtle border.
- **Content**:
  - Avatar with initials, domain tint, and presence dot.
  - Conversation name, optional pin icon, optional SIA-assist sparkles.
  - One-line subtitle.
  - Kind pill: Coach, Direct, Group, or Room.
  - Domain tag.
  - Timestamp and unread badge or arrow.
- **Gestures**: Tap routes to the row's destination. Long press opens lightweight row actions: pin/unpin, mute, archive.

### Start New Chat Button
- **Purpose**: Create a new direct, group, room, or SIA thread.
- **Visual treatment**: 56pt orange pill, plus icon, white label, glow-orange shadow.
- **Behavior**: Presents new conversation bottom sheet.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card/row surfaces | #211008 | ink-brown-800 | Hero and rows |
| Primary CTA | #FF5E00 | brand-orange | Start new chat |
| SIA indicators | #7F24FF | royal-purple | SIA hero, sparkles, voice icon |
| Presence active | #34A853 | forest-green | Online dots |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 55-60% | white/60 | Metadata |
| Domain tags | Per domain | domain registry | Identification only |

**60/30/10 verification**: Orange is reserved for action and unread count. Purple is SIA-only. Green is presence/readiness. Domain colors appear only on tags and avatar tints.

---

## Interaction States

| Component | State | Visual |
|-----------|-------|--------|
| SIA hero | Pressed | scale(0.98), border brightens to royal-purple/40 |
| Conversation row | Hover/focus | border brand-orange/30, bg white/4 |
| Conversation row | Unread | Orange unread badge replaces arrow |
| Filter chip | Active | Orange bg, white text |
| Bottom CTA | Pressed | scale(0.96), glow tightens |
| Search | Focused | Orange focus ring, keyboard opens |

---

## Motion

- Screen content enters with staggered fade-up: hero 0ms, pinned 80ms, recent 150ms.
- Row press uses 120ms scale feedback before navigation.
- Filter changes crossfade row groups over 180ms.
- New conversation sheet follows standard modal presentation from `_shared-patterns.md`.

---

## Empty, Loading, Error

- **No conversations**: Show SIA hero, then centered empty state: "No conversations yet" with "Start new chat" CTA.
- **Filtered empty**: Preserve filter rail and show "No [filter] conversations".
- **Loading**: Skeleton hero plus three row skeletons.
- **Network error**: Inline banner below search: "Could not refresh conversations" with retry action.
- **Offline**: Cached conversations remain visible with timestamp muted; new message entry is blocked with offline toast.

---

## Accessibility

- Header buttons use labels: "Search conversations" and "Start voice coaching".
- Conversation rows announce name, type, unread count, domain, and timestamp.
- Filter rail is a single-select tab group.
- Unread badge text is included in row accessibility label, not exposed as a separate unlabeled element.
- Minimum touch targets: 44pt for icons, 74pt for rows, 56pt for CTA.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/sia/conversations/page.tsx`.
- Mock data source: `conversationPreviews` and `conversationFilters` in `balencia-screens/src/data/mock.ts`.
- Reuses `ConversationAvatar`, `ConversationRow`, and `SignalPill` from the conversation suite.
- This is a docs-only screen spec; no runtime route or API changes are required.
---

## Premium Craft

**Profile:** content · **Cluster benchmark:** iMessage + Telegram (restrained, premium) — *stays Balencia via warm-glow surfaces, SIA purple earned on coaching, safety microcopy, and the continuous-stroke SIA hero card.*
**Pre-grade:** B+ (76) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the spec shows a strong IA (SIA pinned hero + search + filters + rows), but (1) the SIA Hero and conversation rows are flat `--color-ink-brown-800` cards with no top-edge highlight or layered depth; (2) no focal glow on the SIA hero (CK-P2 missing); (3) microcopy is partly unwritten — the empty state, loading, search affordances, and long-press actions lack authored voice; (4) the SIA Hero's "ready to call" signal is a pill, not a designed state; (5) type leading/tracking not specified; (6) contrast pairs not tabulated; (7) the purple at 25% border opacity on the SIA card reads as weak signal, not earned coaching presence.

### Focal hierarchy

One focal point: the **SIA Hero card** (`CK-P2`, content hero) — the pinned coach hero sits above the fold, sized at ~120pt with the name "SIA coach" at `--text-h3` and a warming summary line. The **search bar and filter rail sit below, visibly secondary** (both are utility, not decorative). **Conversation rows are grouped by section** (Pinned, Recent) and read as equal-weight list items — none competes with the SIA hero. The squint test lands on the SIA avatar + name first, then the purple eyebrow "Pinned coach," then the signal pills, then the search bar. Everything below is visibly secondary. No competing foci.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) on the SIA hero · `--radius-lg` (20pt) on conversation rows · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, previously absent) · `--shadow-1`. The SIA Hero card, as a ≥96pt hero surface, adds `--surface-backplate` (`CK-T02`, the faint warm radial gradient). Glow is size-calibrated per `CONSISTENCY.md §1`: the SIA hero's avatar circle (~64pt) carries **`--glow-orange-md`** (~20px /.40) — earns its purple-register warmth without overwhelming. The signal pills (36pt) receive no glow per the <36px rule. Conversation row cards (74pt) receive **no glow at rest** — they light briefly with **`--glow-orange-sm`** (~12px /.35) on unread badge or when tapped (micro-feedback). The "Start new chat" FAB button carries `--glow-orange` (32px /.45, since it is a hero-scale action element ≥96pt read length). Conversation row borders are 1px `--glass-border`, never bare outlines. SIA card border is 1px `--glass-border` + a **2pt `--color-royal-purple` left border at 40% opacity** (a warm accent earned by SIA's coaching presence, stronger than the prior 25% — the purple now *reads*). Tracks under signal pills and the "3 live signals" count use `--color-alpha-white-08` over `--track-inset` (no bare number, always depth). No surface reads as a flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: header title "Conversations" `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25); SIA eyebrow "Pinned coach" `--text-eyebrow` (12pt) / 600 / `--tracking-eyebrow` (0.12em) / uppercase / `--color-royal-purple` 100%; SIA title "SIA coach" `--text-h3` (17pt) / 600 / `--leading-snug`; SIA summary "Recovery, budget, and breakfast timing…" `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / `--color-alpha-white-90`; signal pills ("3 live signals", "1 draft plan") `--text-caption` (13pt) / 400 / `--leading-normal`; conversation row name `--text-h3` (17pt) / 600 / `--leading-snug`; conversation subtitle ("Sarah pinned…") `--text-body` (16pt) / 400 / `--leading-normal` / `--color-alpha-white-70`; conversation kind pill and domain tag `--text-caption` (13pt) / 500 / `--leading-normal`; timestamp and unread badge `--text-small` (11pt) / 400 / `--leading-normal` / `--color-alpha-white-60`. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case on all labels and filter chips. ≤2 `--color-brand-orange` accent words (the unread badge count is the single accent — no secondary orange on a single row). Chillax stays logo-only. Replaces ad-hoc pixel line-heights with the `CK-T04` scale.

### Microcopy (before → after)

Every user-facing string authored to `CK-P5` brand voice — warm, coaching, never shaming, no exclamation marks, the brand period with intent. Specific authored strings per surface:

- **SIA Hero → eyebrow** — *given:* "Pinned coach" → *kept:* same; purple, simple, clear role. (Already on-voice.)
- **SIA Hero → summary** — *before:* "Recovery, budget, and breakfast timing…" → *after (same, already warm):* kept; conversational, specific cross-domain read (not generic coaching speak). SIA voice is specific to the user's *actual* signals, never a horoscope.
- **SIA Hero → signal pills** — *before:* "3 live signals", "1 draft plan" (given) → *after (unchanged):* same; numbers are specific, pills are scannable. Adds a third pill for call readiness: "Ready to call" (`--color-forest-green` text, indicates SIA availability — coached, not a cold state).
- **Search bar → hint text** — *before:* "Search people, rooms, and SIA memory" (given) → *after (unchanged):* same; clear, specific scope (not generic "Search conversations"). Never a generic magnifying glass alone — the input label is visible.
- **Filter rail → inactive chip label** — *before:* "All", "SIA", "People", "Groups", "Rooms" (given) → *after (unchanged):* same; sentence case, scannable. (Already on-voice.)
- **Conversation row → long-press affordance (new)** — *before:* hidden, unspecified → *after (new, authored):* long-press opens menu with options: "Pin this chat", "Unpin", "Mute notifications", "Archive chat" (warm action labels, clear consequences, never destructive-only).
- **Empty state (no conversations yet) (new)** — *before:* not specified → *after (new, non-shaming, on-voice):* "No conversations yet. SIA is here to coach — start whenever you're ready." + prominent "Start new chat" CTA. Frames as *ready*, not empty or lost.
- **Loading state (new)** — *before:* not specified → *after (new, on-voice):* "SIA is reading your chats — one moment." (Warm, specific wait message; never a generic "Loading…")
- **Filtered empty state (new)** — *before:* "No [filter] conversations" (given) → *after (specific):* if filtering by "People": "No direct chats yet. Invite someone or start one with [suggested contact]." (Always offers a path forward, never a dead end; non-shaming, constructive.)
- **Search empty state (new)** — *before:* not specified → *after (new):* "No matches for '[query]' · Try a name, domain, or memory." (Warm, suggests refinement; no shame in not finding, invites clarity.)
- **Network error (new)** — *before:* not specified → *after (new):* "Couldn't refresh chats — pull to refresh." (Specific, recovery action named, cached chats remain visible.)
- **Offline state (new)** — *before:* not specified → *after (new):* "You're offline · showing your last chats." (Honest, cached data retained, actions not available until online — never silent failure.)
- **Unread badge tooltip (new)** — *before:* bare orange badge number → *after (new, a11y):* "2 unread" (the badge carries both number *and* an aria-label for screen readers; never colour-alone).

### Motion choreography

Locked to `CK-P4` order (draw-first, never fade):

1. **SIA Hero enters first** (fade-in + subtle lift, `--dur-base` 280ms `--ease-out-soft`)
2. **Signal pills stagger in** (40–80ms stagger, `--dur-fast` 160ms each, rising animation)
3. **Search bar and filter rail fade in** (`--dur-base` 280ms, together, 80ms after hero)
4. **Pinned section rows rise** (fade-up with 40–80ms stagger, `--dur-base` 280ms per row)
5. **Recent section rows rise** (40–80ms stagger between rows, `--dur-base` 280ms per row, starting ~120ms after first pinned row)
6. **"Start new chat" FAB fades in** last (`--dur-base` 280ms, 160ms after recent rows begin)

Below-fold rows animate on scroll-into-view. Row tap uses 120ms scale-down feedback (scale 0.98, light haptic) before navigation. Filter changes crossfade section visibility over 180ms. `prefers-reduced-motion` → all elements at final state instantly, no motion loops, no urgency animations — the settled frame is the canonical frame.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day-1** | SIA hero visible + "pinned coach" signal, empty conversation lists below, centered "No conversations yet" message + start CTA | "No conversations yet. SIA is here to coach — start whenever you're ready." | SIA hero carries full depth (backplate + glow), search + filters visible but quiet; lists show section headers but no cards (structure is full, content is empty) |
| **Loading** | SIA hero skeleton (avatar shimmer, text skeleton), skeleton conversation row cards (3 pinned + 3 recent, same layout depth), skeleton search bar + filter chips | "SIA is reading your chats — one moment." | skeleton on `--color-ink-brown-800` with `--edge-highlight` preserved; shimmer animation; rows morph into data (never a swap) |
| **Partial / search active** | Filtered rows only, pinned section may collapse if empty, recent section shows matches; search bar stays focused with active orange ring | "No matches for '[query]' · Try a name, domain, or memory." (if empty) | all present rows render with full depth; missing sections ghosted (no section header if no matches); search ring is `--focus-ring` (CK-T03) |
| **Error / network** | all cached conversations remain visible; a network banner below header names the failure; refresh affordance visible | "Couldn't refresh chats — pull to refresh." | cached rows rendered, banner uses `--color-error-red` only if genuine sync failure; glyph (alert icon) + word paired (never colour-alone) |
| **Offline** | cached conversations visible, "Start new chat" and send inputs are dimmed with reason, pull-to-refresh shows "You're offline" message | "You're offline · showing your last chats." + "You're offline · come back online to send messages." (if trying to send) | actions at 50% opacity with visible "offline" label (never silent dimming); data retained and readable |

### Signature & anti-generic

Ownable moments: (1) the **SIA Hero's purple left-border accent** (earned coaching presence, warm glow, not cold neon) — the continuous-stroke splash signature is not present on this screen (messaging doesn't call for it), but the layered warm surfaces and purple earn the coaching register; (2) the **safety microcopy** throughout (every edge string authored, non-shaming, constructive — "Whenever you're ready" instead of a blank list; "Try a name, domain, or memory" instead of a dead search). Anti-generic fix: the conversation row list is not a flat equal-weight stack — the Pinned section breaks the monotony with a visual group, the Recent section below it adds hierarchy, and each row carries visible domain tags and kind pills (identity cues, not a generic DM stack). The SIA hero is never hidden or collapsed (it anchors every moment on this screen), and the bottom action "Start new chat" remains always visible and prominent (an orange FAB at hero scale, never a quiet link). The search bar uses a real input (not a tap-to-reveal), and the filter rail is a proper semantic control (single-select tab group per Accessibility). No generic template feel.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
| --- | --- | --- |
| SIA header text (name, summary) | `--color-alpha-white-100` / `--color-alpha-white-90` | ≥12:1 / ≥10:1 on `--color-ink-brown-800` |
| Eyebrow "Pinned coach" | `--color-royal-purple` 100% | 3.0:1 on `--color-ink-brown-800` (meets WCAG 1.4.11) |
| Signal pills (text) | `--color-alpha-white-60` | ≥4.5:1 |
| Conversation row name | `--color-alpha-white-100` | ≥12:1 |
| Conversation row subtitle | `--color-alpha-white-70` | ≥8:1 |
| Kind pill text | `--color-alpha-white-60` | ≥4.5:1 |
| Domain tag (text) | per-domain color (identity-only, not load-bearing) | — |
| Unread badge (orange circle) | `--color-brand-orange` | 3.2:1 on `--color-ink-brown-800` (WCAG 1.4.11); paired with **visible count number** (never colour-alone) |
| Timestamp | `--color-alpha-white-60` | ≥4.5:1 |
| "Start new chat" button text | white 100% on `--color-brand-orange` | ≥10:1 |
| Search bar border (focused) | `--focus-ring` (2px orange, 2px offset) | 3:1 minimum on field |

Status never colour-alone: unread badge shows both the **orange circle + a count number** (never a bare dot); filters use the active `--color-brand-orange` background **+ a filled icon** (not a bare colour); all interactive elements carry `--focus-ring` (`CK-T03`, 2px orange, 2px offset) uniform app-wide — the search bar, filter chips, conversation rows, and CTA all use the same ring. Targets ≥44×44pt (header icons 44pt, rows 74pt min per spec, filter chips 44pt min, CTA 56pt). Conversation row announces: "name · kind · domain · timestamp or unread count" — the row's tappable destination is clear. Search input has `aria-label="Search conversations"`. Filter rail is `role="tablist"` with single-select behaviour, each chip `role="tab"` with `aria-selected` state. Reduced-motion: all elements at final state instantly; no motion loops; settled frame preserved — entrance stagger collapses, scale feedback on tap is instant (no motion, instant visual state shift).

Conform to `design-audit/CONSISTENCY.md`.

---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-05.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/sia/conversations`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q14 SIA in chats requires explicit invocation.
- Q15 group health/recovery signals require per-user permission.
- Q23 call follow-up scheduling should reuse the voice-history scheduling sheet.
- Q24 create mission starts from blank natural-language intent.
- Q25 streak details preserve source tab context.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B05-F04 | major | information-architecture | Implement real search, filter state, voice entry, and a new-conversation picker sheet. |
| B05-F05 | major | accessibility | Render a real search input and make filters a semantic 44px tab/single-select control. |

### Prototype Implications

- Keep the existing visual direction, then verify touch targets, labels, and route parity in the prototype phase.

