### 1. Header
- **Screen ID:** 74-conversations-hub
- **Name:** Conversations
- **Route(s) covered:** `/chat-history`, `/chat`
- **Tab:** CIA (Active)
- **Source:** Functional Content Brief: Conversations Hub
- **Batch:** 4

**Elevation corrections (draft → final), summarized here and detailed in their sections:**
1. *Bottom-stack contradiction (kept from draft, refined):* the brief's fixed "Start new chat" button stacked over a global bottom tab is claustrophobic at 390×844 and breaks the 8pt rhythm. Resolved as `NEW: FabCompose` floating above `GlassNavBar` — see §5.
2. *Redundant search entry:* draft gave the hub two search triggers (a TopBar glyph and an inline `GlassPillInput`). One search entry is enough — TopBar glyph removed, inline field is now the sole entry and opens the catalog's `SearchOverlay`. See §5.
3. *Nav indicator bug:* draft's ASCII showed the filled nav dot under "Today" while the Header correctly says the active tab is CIA — a real contradiction. Fixed in the wireframe (§4).
4. *Fabricated unread confidence tier:* unread counts are a deterministic read/unread ledger, not an AI estimate — a "low-confidence" state for them was forced compliance with the honesty-triple rule, not honesty. Replaced with a justified not-applicable. See §8.
5. *Token errors:* Accessibility section mislabeled `#FEFAF3` as "paper-50" (it's paper-100 per CANON §4); a per-row "live now" presence dot had no defined data source and implied real-time presence the hub cannot honestly claim; the Finance domain tag was drawn as an orange glyph in the ASCII when canon defines Finance as emerald `#10b981`. All fixed — see §6, §8, §12.
6. *Glow recipe misapplied:* draft assigned `glow-you` to both unread Direct and Group rows. Orange means "you/effort" — a shared Group ping isn't the same personal demand as a DM. Glow narrowed to unread Direct only. See §6.
7. *Invented chip dropped:* draft proposed `NEW: ChipKindTag` to label Direct/Group/Room. Cut — the row's leading avatar/stack/room-tile shape already communicates kind visually; a chip duplicating that is clutter, not clarity (screen-reader users get the kind stated in the label instead — see §12).

### 2. Purpose
A single, honest home for every voice in the user's life — CIA, people, and rooms — organized so the coaching relationship stays the anchor, not one thread among many. The hub's job is triage, not chat: surface what needs a reply, connect a thread to the life domain it actually touches, and never pretend to know more than it does about who's online or what's urgent. North star: **connects** (the CIA hero synthesizes across pillars; rooms carry honest domain correlations) · **honest** (every count ships its real/low-confidence/null state, or a stated reason why it can't) · **premium** (one glass hero, everything else solid and legible — restraint is the craft here, not decoration).

*Scope note:* this hub is a routing surface, not a mood/check-in or data-collection surface — CANON §8's crisis-resource and consent-card cross-cutting patterns are intentionally not instantiated here. Crisis resources live inside the actual conversation surfaces where distress could be disclosed (`CIA Chat [09]`, `Direct Chat [75]`); consent applies where health data, photos, voice, or third-party sources are actually captured, not at this list level. Forcing either pattern onto a list-of-threads screen would be compliance theater, not safety.

### 3. Entry & exit
- **Entry:** Stack push from CIA Chat [09], Community [40], Accountability [46], Social Buddy Profile [83], or via the global CIA tab.
- **Exit:**
  - Tap CIA Hero → CIA Chat [09]
  - Tap Direct row → Direct Chat [75]
  - Tap Group row → Group Chat [76]
  - Tap Room row → Community [40]
  - Tap Voice glyph (TopBar) → Voice Mode [11]
  - Tap search field → `SearchOverlay` (full-screen, autofocus)
  - Long-press any row → `Sheet` (`action`): Pin · Unpin · Mute notifications · Archive chat
  - Tap `FabCompose` → `Sheet` (`action`): Message someone (contact picker) · Start a group · Browse rooms → Community [40]

### 4. Layout anatomy
- **TopBar:** Back chevron, title, one glyph action (Voice). Search glyph removed — one search entry, not two (see §1 correction #2).
- **CIA Hero Space:** Pinned coach context, cross-domain summary, live signal line.
- **Search Rail:** Single `GlassPillInput` (search variant) — the only search entry point, opens `SearchOverlay` on focus.
- **Filter Rail:** `SegmentedTabs`, single-select.
- **List Area:** Scrollable "Pinned" then "Recent" `SectionHeader` groups of `ConversationRow`.
- **Bottom Floating System:** `FabCompose` above `GlassNavBar` (CIA tab active).

**ASCII Wireframe (390×844):**
```text
┌──────────────────────────────────────────────┐
│  ⇽   Conversations                     [mic]  │
├──────────────────────────────────────────────┤
│                                                │
│  ╭────────────────────────────────────────╮   │
│  │ PINNED COACH                            │   │
│  │                                          │   │
│  │ CIA coach                               │   │
│  │ Recovery, budget, and *breakfast*       │   │
│  │ timing today.                           │   │
│  │                                          │   │
│  │ 3 live signals · 1 draft plan           │   │
│  │ ready to talk                           │   │
│  ╰────────────────────────────────────────╯   │
│                                                │
│  ┌────────────────────────────────────────┐   │
│  │ ⌕  Search people, rooms, CIA memory     │   │
│  └────────────────────────────────────────┘   │
│  ( All )( CIA )( People )( Groups )( Rooms )  │
│                                                │
│  PINNED ────────────────────────────────────  │
│                                                │
│  ┌────────────────────────────────────────┐   │
│  │ ○  Partner name                   18m   │   │
│  │    Last message preview text…      ●    │   │
│  └────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────┐   │
│  │ ○○ Iron Clinic (4)                 7m   │   │
│  │    Next workout is at…            ● 3   │   │
│  └────────────────────────────────────────┘   │
│                                                │
│  RECENT ────────────────────────────────────  │
│                                                │
│  ┌────────────────────────────────────────┐   │
│  │ ▢  Run Club          [Finance]     1h   │   │
│  │    Who's in this week?                  │   │
│  └────────────────────────────────────────┘   │
│                                                │
│                                                │
│                             ╭────────╮        │
│                             │   ✎    │        │
│                             ╰────────╯        │
│  ╭────────────────────────────────────────╮   │
│  │  ◌ Today   ◉ CIA   ◌ Goals   ◌ Me       │   │
│  ╰────────────────────────────────────────╯   │
└──────────────────────────────────────────────┘
```
**Legend:** `○` single avatar (Direct) · `○○` `AvatarStack` (Group, "+N" beyond what's shown) · `▢` `NEW: RoomGlyphTile` (Room) · `●` real unread indicator, solid orange, count shown only when >1 · `[Finance]` `ChipDomainTag` rendered in true domain hex (emerald `#10b981`, never orange — the bracket is a text placeholder only, ASCII can't carry color) · `[mic]` plain nav glyph, not `VoiceMicGlow` (see §5) · nav dot correctly sits under **CIA**, matching the Header's active tab.

### 5. Components
- **TopBar:** Transparent over atmosphere → `.glass-pill` backdrop on scroll. One glyph action: Voice. *Correction:* the voice glyph is a static navigation icon (24px, rounded 2px outline per CANON §6), not a `VoiceMicGlow` instance — `VoiceMicGlow` implies live amplitude/recording state, which doesn't apply to a route trigger.
- **GlassCard (`hero`):** CIA pinned anchor. Radius 40 (hero variant), Display type permitted but deliberately unused here — see §6.
- **GlassPillInput (`search`):** Sole search entry; focus transitions to `SearchOverlay` rather than filtering in place. *Correction:* draft also had a TopBar search glyph — redundant second entry point, removed (see §1).
- **SegmentedTabs:** All · CIA · People · Groups · Rooms, single-select.
- **SectionHeader:** "Pinned" / "Recent" (Overline, trailing action none).
- **`NEW: ConversationRow`** — composed from `SolidCard` + `ListRow` conventions, purpose-built for this hub. Anatomy: leading visual (`○` single avatar for Direct / `AvatarStack` for Group / `NEW: RoomGlyphTile` for Room) · title (H3) · preview text (Body-light, paper-64%, 1 line truncate) · trailing cluster (Caption timestamp · unread indicator · optional `ChipDomainTag`). *Rationale:* neither catalog component fits — `ListRow` has no room for avatar + preview + multi-element trailing cluster, and `NotificationCard` is notification-first, not thread-first. Built from existing primitives, not styled from scratch. Flag for catalog promotion.
- **`NEW: RoomGlyphTile`** — 28px rounded tile, leading visual for Room rows. Tinted at 16% of the room's linked domain color (reuses `ChipDomainTag`'s color logic, CANON §4) when a domain link is confidently established; neutral paper-16% wash when it isn't (ties to the domain-correlation honest-null state, §8). *Rationale:* rooms are entities, not people — they need a visual language distinct from `AvatarStack` without inventing a new color system.
- **AvatarStack:** Group row leading visual, "+N" pill per catalog.
- **ChipDomainTag:** Domain correlation tag on Room rows only, shown when CIA has a real, provenanced cross-domain link (§8) — never decorative.
- **Sheet (`action`):** Row long-press menu; also the `FabCompose` destination (contact picker / group creation / Community).
- **`NEW: FabCompose`** — variant of `FABQuickLog`'s 56px orange-circle mechanic, different glyph (compose/pencil) and different destination (`Sheet`, not a 3-item glass-pill tray). *Rationale:* CANON §8 scopes `FABQuickLog` explicitly to Today-tab quick-logging (water/meal/mood); this is a CIA-tab screen with a structurally different action (start a conversation, not log a metric). Reusing the button mechanic keeps the floating-action language consistent across tabs without misusing a component tied to a different tab's semantics.
- **GlassNavBar:** Today · CIA (active) · Goals · Me.

### 6. Visual treatment
- **Atmosphere:** `--bg-base: #0A0A0F` with the mandatory top-center radial `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` (CANON §1) plus 3–4% grain, soft-light. CANON §1 says "CIA moments add a purple pool" without pinning an exact recipe — this spec defines one for reuse and scopes it tightly: `radial-gradient(70% 50% at 50% 20%, rgba(127,36,255,.12), transparent 65%)`, seated behind the CIA Hero only. This keeps "one hero color per surface" (CANON §4) intact — orange still owns the screen atmosphere; purple is contained to the hero zone, not spread across the list.
- **Glass tiers:**
  - CIA Hero → `.glass-card` hero variant: `rgba(255,255,255,.045)` bg · blur 28px sat 120% · border `1px rgba(255,255,255,.08)` · radius 40 · shadow `0 18px 48px rgba(33,16,8,.45)` + inset top-light `0 1px 0 rgba(255,255,255,.12)`.
  - Search field → `.glass-pill`: `rgba(10,10,15,.55)` · blur 24px · border `.10` · radius 999.
  - `ConversationRow` → `SolidCard`: `--surface-2` `#211008` · radius 28 · border `rgba(255,255,255,.06)` · no blur. Data-dense list, legibility over atmosphere (CANON §2 rule) — message previews must stay readable at a glance, which glass would fight.
- **Semantic inner-glow (one per card, meaning stated):**
  - CIA Hero → `--glow-cia` `#7F24FF`. *Meaning:* CIA is actively synthesizing across domains right now — the one card on this screen allowed to claim "AI is thinking here."
  - `ConversationRow` with an unread **Direct** message → `--glow-you` `#FF5E00`. *Meaning:* this thread is asking something of you specifically, right now. *Correction:* the draft put `glow-you` on unread Direct *and* Group rows jointly. Narrowed to Direct only — a shared Group ping is not the same personal demand as a DM, and giving every unread thread a glow turns the calm hub into a to-do list. Group and Room rows never glow, even unread.
  - *Recipe adaptation:* CANON §3's glow recipe (bottom radial, blur 24px, 62% of card height) is sized for full-height cards like `GlassStatCard`. A 56–72px `ConversationRow` at 62% height would read as a near-solid fill, not a signal. Adapted proportionally: same bottom-anchored radial and `color-mix(in srgb, var(--glow-you) 55%, transparent)` recipe, capped at 40% of row height, blur reduced to 16px — a quiet edge-warmth, not a wash.
- **Domain tag:** Room rows carry `ChipDomainTag` only when CIA has a real correlation. Example in wireframe — Run Club tagged Finance, rendered at 16% bg of `#10b981` with `#10b981` label/icon (CANON §4; Finance is emerald, never orange). *Correction:* the draft's ASCII rendered this tag with an orange glyph — a straightforward hex error, fixed. The tag is tap-revealable: long-press shows why it's there (see §8) so a Finance tag on a running club never reads as arbitrary.
- **Type:** Page title "Conversations" is the H1. Hero card title "CIA coach" set in H2 (24–28), not Display — this screen spends zero Display budget; the one Tiempos-italic emphasis word ("breakfast") lives inline inside Body-light summary copy instead of anchoring a headline. A functional triage hub earns its premium feel from restraint and rhythm, not from an editorial headline it doesn't need.

### 7. Content & copy
- **CIA Hero Eyebrow:** Pinned coach
- **CIA Hero Title:** CIA coach
- **CIA Hero Summary:** Recovery, budget, and *breakfast* timing today.
- **CIA Hero Signal line:** 3 live signals · 1 draft plan · ready to talk. *Correction:* draft read "ready to call," which reads as a phone metaphor Balencia doesn't use — CIA is a voice/text coach, not a dialer. Changed to "ready to talk," which also pairs cleanly with the Voice glyph it invites.
- **Search placeholder:** Search people, rooms, and CIA memory
- **Filter labels:** All · CIA · People · Groups · Rooms
- **Row long-press actions:** Pin this chat · Unpin · Mute notifications · Archive chat
- **Domain tag detail (on tap/long-press):** CIA linked this room to your *Finance* mission — 2 members mentioned membership cost this week. *Rationale:* a domain tag with no visible reasoning is a claim the user can't check; this line makes the correlation inspectable, which is what "honest" actually requires, not just a chip that looks smart.
- **Empty (cold-start):** No conversations yet. CIA is here to *coach* — start whenever you're ready.
- **Empty (filtered):** No direct chats yet. Invite someone, or start one with [suggested contact].
- **Empty (search):** No matches for "[query]." Try a name, a domain, or a memory.
- **Loading:** CIA is *reading* your chats — one moment.
- **Error:** Couldn't refresh chats — pull to refresh.
- **Offline (viewing):** Offline · showing chats from [Xh] ago. *Correction:* draft's "showing your last chats" doesn't state staleness — CANON §8's `OfflineBanner`/`SyncStatus` pattern requires naming the actual gap (e.g. "2h ago"), which is the honest part of the pattern, not optional phrasing.
- **Offline (action blocked):** Offline · you'll be able to send once you're back online.

### 8. Data & honesty states
- **CIA live signal count:**
  - *Real:* "3 live signals" · `ChipProvenance`: `via CIA · synced just now`.
  - *Low-confidence:* "~2 live signals" (muted 64%) · `estimated · low confidence`.
  - *Honest-null:* "Catching up on your day" (replaces draft's ellipsis-heavy "Catching up..." with a `HonestNullState`-style designed line) · sub-label `CIA is still syncing background data`.
- **Unread message count:**
  - *Real:* solid orange dot, count shown when >1 · `ChipProvenance`: `updated live`.
  - *Low-confidence:* **not applicable.** *Correction:* the draft invented a "low-confidence" tier (outlined dot, "estimated · low confidence") for unread counts. Unread state is a deterministic read/unread ledger synced from the message service — it is never AI-estimated, so forcing a confidence tier onto it is fake compliance with the honesty-triple rule, not honesty. Only real vs. honest-null apply.
  - *Honest-null:* no dot, nothing rendered — absence of a badge is itself the honest signal (no unread), never a fabricated placeholder.
- **CIA-assist sparkle (cross-domain hook):**
  - *Real:* spark glyph visible · `ChipProvenance`: `via CIA memory`.
  - *Low-confidence:* not applicable — this is a boolean active/inactive flag, not a measured value; there is no partial-confidence state for "is CIA assisting here."
  - *Honest-null:* hidden entirely — no glyph, no placeholder.
- **`NEW`: Domain correlation tag (e.g. Finance on Run Club):**
  - *Real:* `ChipDomainTag` shown, full color · tap reveals `via CIA · linked from 2 mentions` (§7).
  - *Low-confidence:* tag shown at 40% opacity · label reads `possible link · low confidence` on tap.
  - *Honest-null:* tag omitted entirely — CIA never guesses a domain link into existence just to look connective; `RoomGlyphTile` falls back to its neutral paper-16% wash.
- **Relative timestamps** ("18m," "7m," "1h"): single real state only, deliberately not honesty-tiered — these are a direct client-side computation from a real message timestamp, not an estimate, so a confidence tier would be manufactured rather than meaningful.
- **Presence removed:** the draft's per-row "online now" indicator (green dot) had no stated data source and implied a live-presence signal this hub doesn't actually carry. Removed — the relative timestamp already communicates recency honestly without fabricating a real-time presence feed.

### 9. All states
- **Default:** CIA Hero active and breathing, lists populated, search idle.
- **Skeleton:** `ConversationRow` renders as `SkeletonState` shimmer blocks (`--surface-3` base, 1.2s sweep) matching row geometry. *Correction:* draft gave the CIA Hero skeleton a "left-border accent" — canon's glow recipe is a bottom-anchored radial, not an edge border (CANON §3); fixed to: the hero skeleton keeps its bottom-anchored `glow-cia` radial at reduced opacity, still breathing, signaling "CIA is still here, just loading" rather than going fully blank.
- **Empty:** Cold-start still renders the full CIA Hero (it's a relationship, not a list item — it doesn't get to look empty). Centered, non-shaming copy sits under the "Pinned" `SectionHeader`. A section with zero rows hides entirely rather than showing an empty shell.
- **Error:** Cached messages stay visible. A `.glass-pill` banner sits under the TopBar with a plain-language warning and a retry affordance.
- **Offline:** Cached rows visible at 50% opacity. `FabCompose` dims and disables — new conversations require a connection; the offline banner states the exact stale duration (§7).
- **Success:** Reading a thread clears its unread state instantly with a 120ms scale-down (0.98) tap-feedback; sending inside a thread is out of scope for this hub (handled in [75]/[76]).

- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

### 10. Motion & interaction
- **Easing:** physical ease-out throughout (never linear, CANON §6) — e.g. `cubic-bezier(0.2, 0.8, 0.2, 1)` or the platform's native spring; canon doesn't pin one literal curve, so this is a suggested default, not an overclaimed token.
- **Feedback:** row tap = 120–150ms scale to 0.98; `glow-you` rows brighten momentarily on press, matching `GlassCard`'s interactive press pattern extended to interactive `SolidCard` rows (no documented catalog default exists for `SolidCard` press state, so this reuses the one canon does define rather than inventing a new curve).
- **Glow breathe:** CIA Hero's `glow-cia` breathes on a 4s ease-in-out loop (CANON §6, hero cards only). Sparkle glyphs on assisted rows pulse gently, same cadence family, lower amplitude.
- **Haptics:** light impact on long-press (opens management `Sheet`); medium impact on a new message arriving while the hub is in view.
- **Reduced motion:** staggered entrances snap to final state; glow breathing stops and resolves to a static glow at its mid-breath intensity (never fully off — the meaning still needs to read).

### 11. Motivation-tier adaptation
- **Low density (recovery/minimalist):** `AvatarStack` collapses to a single neutral room glyph for Group rows (reduces visual load without losing which-thread-is-which); Direct avatars stay (low-noise, still useful). "Recent" section collapses under a chevron by default. `glow-you` fires only for unread Direct messages — Group/Room activity stays quiet regardless of unread state. Hero Signal line collapses to just "ready to talk."
- **Medium density (default):** as specified above — full Signal line, 72px rows, domain tags visible, both sections expanded.
- **High density (engaged/power):** rows compress to 60px by dropping the preview-text line entirely (title + trailing cluster only) — type size is never shrunk below H3/Caption floors to hit the target height; legibility doesn't get traded for density. CIA-assist correlation detail (the Finance-link explanation, §7) surfaces inline under the room title instead of requiring a tap.

### 12. Accessibility
- **Contrast:** paper-100 `#FEFAF3` (not paper-50, `#FDFDFB` — draft mislabeled this; paper-100 is the primary text hex per CANON §4) on `--bg-base`/`--surface-2` clears WCAG AAA (7:1) by a wide margin — a near-white on near-black pairing. Paper-64% secondary text still clears AA (4.5:1) for Body-sized preview text; the 40% tertiary tier is reserved for Caption-scale meta (timestamps) and kept off any text a user must read to understand row content.
- **Targets:** every interactive element — filter tabs, rows, TopBar glyph, `FabCompose`, domain tag — holds a 44×44px minimum target regardless of visual size.
- **Screen reader / kind labeling:** since the visible design intentionally drops a Direct/Group/Room chip (§1 correction #7), the kind is spoken explicitly in each row's accessible label instead — e.g. *"Partner name, direct message, 18 minutes ago, 1 unread"* / *"Iron Clinic, group chat, 4 members, 7 minutes ago, 3 unread"* / *"Run Club, room, linked to Finance, 1 hour ago."* This keeps the sighted UI uncluttered while non-visual users get equal or better information.
- **CIA-assist glyph:** read as *"CIA is actively tracking this conversation."*
- **Domain tag:** read as *"Linked to Finance. Double-tap for why."*

### 13. Premium checklist
1. **Connects:** CIA Hero synthesizes recovery + budget + meals; Room rows carry real, tap-inspectable cross-domain correlations rather than decorative tags. (Pass)
2. **Honest:** every metric ships its real/low-confidence/honest-null triple, or a stated, justified reason it doesn't (unread count, sparkle glyph) — no forced-fake states, no fabricated presence signal. (Pass)
3. **Premium:** one glass hero, everything else `SolidCard`; generous rhythm and 4% grain over decoration. (Pass)
4. **60/30/10 color:** orange = you/effort (unread Direct glow, `FabCompose`), green = domain tag when Finance-linked, purple contained to the CIA hero only. (Pass)
5. **Glass tiers, selective:** hero glass, list solid, search/FAB glass-pill — never mixed in one row. (Pass)
6. **Semantic glow:** one per card, stated meaning, narrowed to actual personal relevance (Direct-only unread), not blanket-applied. (Corrected & pass)
7. **One editorial moment:** single Tiempos-italic word ("breakfast") inside the hero summary; Display type deliberately unspent. (Pass)
8. **CIA voice:** sentence case, zero exclamations, honest, warm, second person. (Pass)
9. **Data visualization:** no charts on this screen — counts render as plain tabular numbers, correctly, rather than being dressed up as gauges they don't need to be. (Pass, not applicable by design)
10. **Copy rules:** one emphasis word per moment, held to across all copy blocks including corrected ones. (Pass)
11. **Real inputs:** search is a genuine text field routing to `SearchOverlay`; filters are true single-select — no fake affordances. (Pass)
12. **Motion:** physical easing, 120–250ms feedback, full reduced-motion path. (Pass)
13. **Accessibility:** AAA-level primary contrast, 44px targets, kind information preserved for screen readers despite the visual chip being cut. (Pass)
14. **Contradiction resolution:** bottom-stack conflict, redundant search entry, nav-indicator mismatch, mismatched Finance color, fabricated presence signal, and forced-fake unread confidence tier — all resolved with rationale, not silently papered over. (Pass)
