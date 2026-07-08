# Screen Design: Virtual Try-On / AI Fashion Studio

**Screen**: 72 of 72
**File**: 72-virtual-tryon.md
**Register**: Creativity Mode (creativity-amber #F59E0B domain accent — identification only; primary actions remain Burnt Orange per the domain-color usage rule)
**Primary action**: try on outfits virtually and get AI style coaching
**Tab**: Own top-level nav entry, flag-gated (`ENABLE_VIRTUAL_TRYON`) — hidden from the tab bar / Explore grid entirely when the flag is off, rather than shown disabled, so unreleased functionality never leaks into the free-tier experience
**Navigation**: Stack root when the flag is on, reachable from Explore [18] "AI Fashion Studio" card, or from Creativity Dashboard [36] via a "try on a look" chip. Internally: Stack root (Wardrobe/Gallery home) → Photo Upload/Capture Flow (stack push) → Try-On Generation View (stack push) → Saved Looks Gallery (sibling stack root) → Look Detail / Before-After Comparison (stack push from either). Exit via back button to Explore [18] or tab switch.

---

## Purpose

Virtual Try-On is Balencia's fashion and self-expression module — a distinct data model (`wardrobe_items`, `saved_looks`, `tryon_generations`) sitting alongside, not inside, the fitness/nutrition pillars. Where the rest of the app is oriented around health metrics and behavior change, this module is oriented around creativity, identity, and how the user wants to present themselves. It is flag-gated because it depends on an async AI image-generation provider (outfit compositing onto a user photo) that is materially more expensive and slower than the rest of the platform's AI surfaces, and because it is not core to the health-coaching thesis — it ships as an opt-in creative extension.

The user uploads or captures a full-body reference photo (which is always preserved as the "original" — nothing here is a destructive edit), selects or uploads a clothing item, and requests a generation. The result is an AI-composited "after" image showing the outfit applied to their photo. Every generation is saved to a personal gallery with both images always available side-by-side via a draggable comparison slider — the platform never shows only the generated result without the source it came from.

The **AI Style Coach Card** is the module's honesty anchor, consistent with the rest of the platform: its insights are computed from a real `getStyleProfile()` service that aggregates the user's actual saved looks, wardrobe tags, and try-on history (e.g., color frequency, silhouette preferences) — never generic styling platitudes dressed up as personalization. If the user hasn't generated or saved enough looks for a genuine pattern to exist, the card says so plainly instead of fabricating a preference.

Because this module stores full-body reference photos — a more sensitive category of personal media than most of the app's data — the design treats photo persistence as an explicit, visible fact rather than an invisible backend detail: the Before/After Comparison Slider's "before" side is always the literal photo the user uploaded, never obscured, cropped without consent, or silently discarded after generation. A user who deletes a saved look removes both images from active display; the underlying retention/deletion policy itself is a backend and privacy-policy concern outside this screen spec's scope, but the UI never implies a photo was deleted when it was only unlinked from a look, and vice versa.

---

## Information Architecture

**Hierarchy — Wardrobe/Gallery Home** (what the user sees, in order of visual priority):
1. Screen header with segmented tab — Try-On | Saved Looks | Wardrobe
2. AI Style Coach Card — real computed style insight, purple SIA-accent
3. Primary content per tab (photo upload prompt / saved looks grid / wardrobe catalog grid)
4. New Try-On FAB — persistent creation entry point

**Hierarchy — Try-On Generation Flow** (sequential, not a persistent hierarchy):
1. Photo Upload/Capture with guidance overlay
2. Outfit selection (from Wardrobe or a fresh upload)
3. Look Preview Sheet — quick preview before committing
4. Try-On Generation View — async loading, then before/after result
5. Save / Discard / Regenerate actions

**User flow**:
- **Arrives from**: Explore [18] via "AI Fashion Studio" card (stack push), Creativity Dashboard [36] via "try on a look" chip (stack push), SIA Chat [09] via deep-link if the user asks about style (stack push)
- **Primary exit**: Back to Explore [18] or Creativity Dashboard [36] (stack pop)
- **Secondary exits**: Saved Looks Gallery (sibling tab within this module), Wardrobe (sibling tab), Look Detail / Before-After Comparison (stack push from a saved look), SIA Chat [09] via "ask SIA about your style" shortcut on the Style Coach Card (tab switch)

---

## Layout — Wardrobe/Gallery Home (Try-On Tab, Empty-of-Photo State)

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes (this module's own tab bar entry stays highlighted; the global bottom tab bar remains visible beneath it since this is a top-level module, not a modal)

### ASCII Wireframe — Try-On Tab (before any upload)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]   "AI Fashion Studio"    │  ← Screen Header (44pt)
│  amber accent line, 2pt              │
├─────────────────────────────────────┤
│  [Try-On][Saved Looks][Wardrobe]   │  ← Segmented Tab (40pt)
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ 🟣 SIA style coach           │   │  ← AI Style Coach Card
│  │ "you tend to favor earth     │   │     (real getStyleProfile
│  │  tones — 6 of your last 8    │   │      data, purple accent)
│  │  looks lean warm neutrals"   │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ┌─────────────────────────────┐   │
│  │                             │   │  ← Photo Upload Prompt
│  │      📷  upload a full-     │   │     (empty state, hero)
│  │      body photo to start    │   │
│  │                             │   │
│  │  [ take photo ] [ gallery ] │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  RECENT LOOKS                       │  ← Eyebrow
│  ┌───────┐ ┌───────┐ ┌───────┐    │
│  │ [img] │ │ [img] │ │ [img] │    │  ← Mini gallery strip
│  │ May 18│ │ May 12│ │ May 4 │    │     (horizontal scroll)
│  └───────┘ └───────┘ └───────┘    │
│  see all saved looks →              │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Wardrobe/Gallery Home (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title, back navigation, domain identity
   - Content: Back chevron + "AI Fashion Studio" title, 2pt amber (#F59E0B) accent line at bottom, same convention as domain dashboard headers

2. **Segmented Tab** — 40pt
   - Purpose: Switch between Try-On, Saved Looks, Wardrobe views
   - Content: Three segments with active state

3. **AI Style Coach Card** — ~96pt
   - Purpose: Real, computed style insight from the user's actual try-on and wardrobe history
   - Content: Purple dot + computed insight text + "ask SIA about your style" link

4. **Photo Upload/Capture Prompt** — ~180pt (empty state) or replaced by Active Photo Preview once a reference photo exists
   - Purpose: Entry point into the try-on generation flow
   - Content: Camera icon + guidance text + "take photo" / "gallery" buttons

5. **Recent Looks Strip** — ~120pt (conditional, hidden if zero saved looks)
   - Purpose: Quick access back into recently generated looks without leaving the Try-On tab
   - Content: Horizontal scroll of thumbnail cards + "see all saved looks" link

6. **New Try-On FAB** — 48pt (fixed, visible once at least one photo has been uploaded previously, so the primary path is always one tap away)
   - Purpose: Start a new try-on generation
   - Content: Plus icon + "new try-on"

---

## Layout — Try-On Generation View (Loading and Result States)

**Scroll behavior**: Fixed (loading state), ScrollView (result state, to accommodate the comparison slider + action row + style notes below the fold)
**Tab bar visible**: No (full-screen stack push, tab bar hidden to keep focus on the generation)

### ASCII Wireframe — Generation Loading State

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ✕ [close]                          │  ← Minimal header (44pt)
├─────────────────────────────────────┤
│                                     │
│                                     │
│         ┌───────────────┐          │  ← Original photo, dimmed
│         │  [user photo] │          │     to 40% behind a
│         │   (dimmed)    │          │     shimmer generation
│         │               │          │     overlay
│         └───────────────┘          │
│                                     │
│        ✨ generating your look     │  ← Status text, animated
│                                     │     dots
│         ●●●○○  ~15s remaining      │  ← Progress indicator
│                                     │     (indeterminate → est.)
│                                     │
│  "the amber jacket you saved       │  ← Contextual style note
│   pairs well with denim"            │     while waiting (real
│                                     │     getStyleProfile data,
│                                     │     not generic filler)
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │          cancel              │   │  ← Cancel (ghost button)
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### ASCII Wireframe — Generation Result State (Before/After Slider)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ✕ [close]              [⋯ more]   │  ← Header (44pt)
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ before        ┃      after   │   │  ← Before/After
│  │ [original]    ┃  [generated] │   │     Comparison Slider
│  │               ┃║             │   │     (draggable divider,
│  │               ┃║ ◀▶          │   │      centered handle)
│  │               ┃              │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ 🟣 SIA style coach            │   │  ← Result Style Note
│  │ "this earth-tone combo fits   │   │     (real computed data)
│  │  your usual palette well"     │   │
│  └─────────────────────────────┘   │
│                                     │  ← 20pt gap
│  ┌──────────┐┌──────────┐┌──────┐  │
│  │ ↻ regen  ││ ♡ save   ││ ⇪share│  │  ← Action Row
│  └──────────┘└──────────┘└──────┘  │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar (returns once
├─────────────────────────────────────┤     saved / closed
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Try-On Generation View (top to bottom)

1. **Minimal Header** — 44pt
   - Purpose: Close/cancel the generation, overflow actions on result
   - Content: "✕" close (left), "⋯ more" overflow (right, result state only)

2. **Generation Progress State** — Fixed center, full remaining height
   - Purpose: Communicate that an async AI image generation is in progress, with an honest time estimate
   - Content: Dimmed original photo + shimmer overlay + status text + progress dots + estimated time remaining

3. **Contextual Style Note (loading)** — ~48pt
   - Purpose: Fill the wait with something genuinely useful rather than a spinner alone
   - Content: Real style-profile-derived tip relevant to the outfit being generated

4. **Before/After Comparison Slider** — Variable (fills available width, ~4:5 aspect ratio)
   - Purpose: The core result — always shows both images, never the generated result in isolation
   - Content: Draggable vertical divider, original on left, generated on right

5. **Result Style Note** — ~72pt
   - Purpose: Real computed style commentary on this specific generated look
   - Content: Purple dot + computed insight text

6. **Action Row** — 48pt
   - Purpose: Regenerate, save, or share the result
   - Content: Three compact buttons — regenerate, save (heart), share

---

## Components

### Screen Header (Wardrobe/Gallery Home)
- **Purpose**: Title, navigation, domain identity
- **Visual treatment**: ink-900 background, 56pt (domain-dashboard-header height, per the canonical Domain Dashboard Template, since this module functions as a domain root screen). Back chevron left + "AI Fashion Studio" title (20pt Cabinet Grotesk SemiBold, white), 2pt amber (#F59E0B) accent line at the bottom edge.
- **Size**: Full-width x 56pt

### Segmented Tab
- **Purpose**: Switch between Try-On, Saved Looks, Wardrobe
- **Data source**: View state (local)
- **Visual treatment**: Identical to established Segmented Control pattern (Screen 15/38). 16pt horizontal margins.
- **Content**: Container: full-width minus 32pt, 40pt tall, ink-brown-800 bg, --r-pill. Three segments: "try-on" / "saved looks" / "wardrobe" (14pt Cabinet Grotesk SemiBold). Active: orange (#FF5E00) fill, white text — note the segmented control's active fill stays **orange**, not amber, because it is a navigational control (an action), and the domain-color rule reserves amber strictly for identification, matching how Screen 46's segmented tab stays orange under a pink domain header.
- **Gestures**: Tap to switch tab, content crossfades below
- **Size**: Full-width minus 32pt x 40pt

### AI Style Coach Card
- **Purpose**: Surface a real, computed insight about the user's style patterns — never a generic or fabricated styling tip. This card is the module's core honesty commitment: every sentence it shows must trace back to actual data (saved look tags, wardrobe item colors/categories, generation history), computed by `getStyleProfile(userId)`.
- **Data source**: API — `GET /api/tryon/style-profile` → `getStyleProfile()` service, which aggregates: color frequency across saved looks (extracted at save time from the generated image + wardrobe item metadata), category/silhouette frequency, and recency-weighted preference scoring. No LLM call generates the underlying claim — an LLM may be used only to phrase the sentence, with the computed facts passed in as constrained inputs (e.g., "top_color: earth-tone, frequency: 6/8"), never invented independently.
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. Purple (#7F24FF) dot (6pt) left-aligned with the first text line — the standard SIA Coaching Note Card — Compact Variant treatment (Screen 26), used here deliberately *because* this card's content is genuinely data-backed, unlike Screen 70's health summary, which withholds purple precisely because it is not SIA-touched. The two screens' opposite choices both serve the same honesty principle: purple appears only where AI genuinely participated.
- **Content**:
  - Purple dot + "SIA style coach" label (12pt Cabinet Grotesk SemiBold, white at 50%)
  - Insight text: 15pt Switzer Regular, white at 90%, max 3 lines, e.g. "you tend to favor earth tones — 6 of your last 8 looks lean warm neutrals"
  - "ask SIA about your style" link: 13pt Switzer Medium, purple at 70%, below insight text
- **Variants**: Populated (≥ 3 saved looks, genuine pattern computed), Honest-null (< 3 saved looks — see Empty States, no fabricated insight shown), Result-context variant (shown on the Try-On Generation View result state, scoped to the specific generated look rather than the aggregate profile)
- **Gestures**: Tap "ask SIA about your style" switches to SIA Chat [09] with the style profile pre-loaded as context. Card body itself is non-interactive.
- **Size**: Full-width minus 32pt x ~96pt

### Photo Upload/Capture Prompt
- **Purpose**: Entry point into the try-on flow — get a full-body reference photo from the user
- **Data source**: Device camera or gallery picker; uploaded photo persisted to object storage as the immutable "original" for this session
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 32pt padding (hero-card padding per spacing scale), dashed 1pt white at 10% border, centered content
- **Content**:
  - Camera icon: 32pt, amber (#F59E0B), centered
  - Guidance text: "upload a full-body photo to start" — 16pt Switzer Regular, white at 80%, centered, max 2 lines
  - Two buttons side-by-side: "take photo" (orange outline pill, camera icon) and "gallery" (white-at-10%-bg pill, image icon), 44pt height each, 12pt gap
- **Guidance overlay (during capture, camera variant)**: A translucent body-outline silhouette guide is overlaid on the live camera preview — "stand back so your full body fits inside the outline, in good lighting" caption below the viewfinder, 13pt Switzer Regular, white at 60%. This overlay exists specifically because generation quality depends heavily on a clean, well-framed, well-lit source photo; poor input photos are the primary cause of poor generation results, so the guidance is treated as a first-class part of the flow, not an afterthought.
- **Variants**: Empty (no prior photo — full hero prompt as shown), Active Photo Preview (once a photo exists — prompt collapses to a compact "photo ready" row with a thumbnail and a "replace photo" link, freeing vertical space for the Recent Looks strip)
- **Gestures**: Tap "take photo" opens the native camera with the guidance overlay. Tap "gallery" opens the photo library picker (cropped/validated for a roughly full-body aspect ratio before proceeding).
- **Size**: Full-width minus 32pt x ~180pt (empty) or ~72pt (active preview)

### Recent Looks Strip
- **Purpose**: Fast re-entry into recently generated looks without navigating away from the Try-On tab
- **Data source**: API — `GET /api/tryon/looks?limit=5&sort=recent`
- **Visual treatment**: Horizontal scroll row, 16pt leading margin, 96pt square thumbnail cards, --r-md (14pt), 12pt gap between cards
- **Content**: Thumbnail image (the "after" generated image) + date label below (12pt Switzer Regular, white at 50%). "see all saved looks →" link below the strip, 13pt Switzer Medium, orange.
- **Variants**: Populated, Hidden entirely (zero saved looks — see Empty States)
- **Gestures**: Tap a thumbnail opens Look Detail / Before-After Comparison for that look. Tap "see all saved looks" switches to the Saved Looks tab.
- **Size**: Full-width x 120pt (strip), 96pt x 96pt per thumbnail

### New Try-On FAB
- **Purpose**: Start a new try-on generation from anywhere within the Wardrobe/Gallery Home
- **Visual treatment**: Extended Pill FAB pattern (Screen 13/35). Orange (#FF5E00) fill, --shadow-2 — primary action, not amber, per domain-color rule.
- **Content**: Plus icon (16pt, white) + "new try-on" (15pt Cabinet Grotesk SemiBold, white)
- **Gestures**: Tap opens Photo Upload/Capture Flow if no active reference photo exists, or opens the Outfit Selection step directly if a photo is already active
- **Size**: Auto-width (~150pt) x 48pt

### Outfit Selection (Wardrobe Picker)
- **Purpose**: Choose which clothing item to try on, from the user's saved Wardrobe or a fresh upload
- **Data source**: API — `GET /api/tryon/wardrobe?category={filter}`
- **Visual treatment**: Stack-push screen (or half-sheet on smaller flows), 3-column grid of wardrobe item thumbnails, --r-md (14pt) per cell, 8pt gap
- **Content**: Category filter chips at top ("tops" / "bottoms" / "outerwear" / "dresses" / "shoes" / "accessories" / "all"), grid of item thumbnails below, "+ upload new item" card as the first grid cell (dashed border, plus icon)
- **Gestures**: Tap an item selects it and proceeds to the Look Preview Sheet. Tap "+ upload new item" opens a photo picker for a garment photo, which is added to the Wardrobe catalog and immediately selected.
- **Size**: Full-screen or 70% half-sheet

### Look Preview Sheet
- **Purpose**: A quick preview of the selected photo + outfit combination before committing to the (costlier, slower) full generation call
- **Data source**: Local composition — overlays a low-fidelity static thumbnail of the selected outfit atop a static crop of the reference photo, purely as a confirmation UI, not a real render
- **Visual treatment**: Bottom sheet, ~55% screen height, ink-900 bg, --r-lg (20pt) top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "generate")
  - Side-by-side static preview: reference photo thumbnail + selected outfit item thumbnail, connected by a "+" icon between them
  - Outfit item name + category label below
  - "swap outfit" link (returns to Outfit Selection)
  - "swap photo" link (returns to Photo Upload)
  - "generate" button: Full-width orange CTA (56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap "generate" proceeds to the Try-On Generation View (loading state)
- **Size**: Full-width x ~55% screen height

### Generation Progress State
- **Purpose**: Honestly communicate that this is an async AI image-generation call, not an instant transform — set correct expectations for wait time
- **Data source**: Async job status polling — `GET /api/tryon/generations/:id/status`, typical completion window 10-25 seconds depending on provider load
- **Visual treatment**: Full-screen, centered content on ink-900 background. Original reference photo shown dimmed to 40% opacity behind a subtle shimmer overlay (same shimmer treatment as Skeleton Loading States, applied over the photo rather than a placeholder shape, since the photo itself is the thing being transformed)
- **Content**:
  - Sparkle icon (24pt, amber) + "generating your look" (16pt Switzer Regular, white at 80%), animated ellipsis (three dots pulsing sequentially, same rhythm as SIA Processing Animation)
  - Progress indicator: 5 dots, filled progressively as the job advances through pipeline stages (queued → analyzing → compositing → refining → done), plus a text estimate: "~15s remaining" that updates as stages complete rather than a raw spinner with no time context
  - Contextual style note: a real style-profile-derived tip relevant to the outfit being generated (reuses the same `getStyleProfile()` data as the AI Style Coach Card, filtered to the current garment's category/color), e.g. "the amber jacket you saved pairs well with denim" — fills the wait with genuine information rather than decorative filler
- **Variants**: In-progress (as described), Slow (> 30s elapsed — status text changes to "still working on it, thanks for your patience" without changing the estimate mechanism), Failed (see Interaction States)
- **Gestures**: Tap "cancel" (ghost button, bottom) aborts the job and returns to the Look Preview Sheet with the same selection retained
- **Size**: Full-screen

### Before/After Comparison Slider
- **Purpose**: Show the original photo and the generated try-on result together, always — the platform's explicit "persist original photo" commitment means the source is never discarded or hidden once a generation exists
- **Data source**: Both images fetched from object storage — `original_photo_url` and `generated_image_url`, both permanently retained for the lifetime of the saved look (or the session, if not yet saved)
- **Visual treatment**: Full-width card, ~4:5 aspect ratio (portrait, matching typical full-body photo framing), --r-xl (28pt) corners, clipped. A vertical divider line (2pt, white, with a drag handle — a 32pt circle with a left/right arrow glyph, centered on the divider) splits the frame: left of the divider shows the original photo, right shows the generated result. Dragging the handle horizontally reveals more or less of each side in real time.
- **Content**: "before" label (top-left, 12pt Cabinet Grotesk SemiBold, white, uppercase, semi-transparent dark scrim behind for legibility over photo content) + "after" label (top-right, same treatment)
- **Variants**: Default (divider centered at 50% on load), Full-before (dragged to 0%, entire frame shows original), Full-after (dragged to 100%, entire frame shows generated result) — the divider never locks at either extreme; a small release-snap returns it toward center if released within 5% of an edge, so the user doesn't accidentally lose the comparison affordance
- **Gestures**: Drag handle horizontally to compare. Tap either label ("before"/"after") snaps the divider to that side (280ms ease-out-soft). Pinch-to-zoom on either half for detail inspection (zooms both halves in sync, maintaining alignment).
- **Size**: Full-width minus 32pt x (width × 1.25 for 4:5 aspect ratio)

### Result Style Note
- **Purpose**: Real, computed style commentary specific to this particular generated look — distinct from the aggregate AI Style Coach Card shown on the Wardrobe/Gallery Home, but built from the same underlying service
- **Data source**: API — `getStyleProfile()` scoped to the current generation's garment category/color, compared against the user's historical preference data
- **Visual treatment**: Same SIA Coaching Note Card — Compact Variant treatment as the home-screen Style Coach Card (purple dot, ink-brown-800 card)
- **Content**: Purple dot + insight text, e.g. "this earth-tone combo fits your usual palette well" or, honestly, "this is a bolder color than your usual picks — worth trying something new"
- **Honesty rule**: If the user has too little history for a comparison (first-ever generation), the note reads plainly: "this is your first try-on — SIA will start noticing patterns as you save more looks."
- **Gestures**: Tap navigates to SIA Chat [09] with this specific look's context pre-loaded
- **Size**: Full-width minus 32pt x ~72pt

### Guidance Overlay (Camera Capture)
- **Purpose**: Reduce the single biggest cause of poor generations — badly framed or poorly lit source photos — by coaching the user in real time during capture, rather than only rejecting a bad photo after the fact
- **Data source**: Client-side pose/framing heuristic (on-device, no server round-trip) — checks that a full-body silhouette roughly fills the guide outline and that ambient light is sufficient before enabling the shutter
- **Visual treatment**: Translucent body-outline silhouette (white at 30%, 3pt stroke) centered over the live camera preview, with a status ring around the shutter button that shifts from white (not yet aligned) to green (aligned and ready)
- **Content**: Caption below viewfinder: "stand back so your full body fits inside the outline, in good lighting" (13pt Switzer Regular, white at 60%). A secondary low-light warning appears if needed: "it's a bit dark — try moving somewhere brighter" (13pt Switzer Regular, orange)
- **Gestures**: Shutter button is tappable regardless of alignment state (never hard-blocked — the guidance is advisory, not a gate), but the ring color gives the user a clear go/no-go signal before they commit
- **Size**: Full-screen overlay atop the native camera viewfinder

### Action Row (Generation Result)
- **Purpose**: Regenerate, save, or share the result
- **Visual treatment**: Three compact buttons in a row, 12pt gap, each roughly equal width (full-width minus 32pt minus 24pt gaps, divided by 3)
- **Content**:
  - "↻ regenerate": ink-brown-800 bg, white at 10% border, white text, --r-pill, 44pt height — returns to the Generation Progress State with the same photo+outfit pairing, producing a new variation
  - "♡ save": orange fill (primary action), white text, --r-pill, 44pt height — persists the look to Saved Looks Gallery
  - "⇪ share": ink-brown-800 bg, white at 10% border, white text, --r-pill, 44pt height — opens native share sheet with the before/after composite image
- **Gestures**: Tap "regenerate" re-runs generation (costs another async job, confirmation only if the user is near a usage cap). Tap "save" persists and shows a brief success toast. Tap "share" opens native share sheet.
- **Size**: Full-width minus 32pt x 44pt, 3 columns

### Saved Looks Gallery
- **Purpose**: Grid of every past try-on result the user has saved
- **Data source**: API — `GET /api/tryon/looks?cursor={cursor}&limit=20` (keyset pagination)
- **Visual treatment**: 2-column grid, 16pt horizontal margins, 12pt gap. Each card: --r-md (14pt), the generated ("after") image as the card's full background, with a subtle bottom gradient scrim for label legibility.
- **Content per card** (~200pt tall, roughly 4:5 aspect ratio thumbnail):
  - Generated image fills the card
  - Bottom overlay: garment category label (12pt Cabinet Grotesk SemiBold, white, e.g. "outerwear") + date (11pt Switzer Regular, white at 70%)
  - Top-right corner: small heart icon (filled, white) indicating saved status (always filled here, since this gallery only shows saved looks)
- **Variants**: Standard, Loading (skeleton shimmer per cell)
- **Gestures**: Tap opens Look Detail / Before-After Comparison for that look (full-screen, reuses the Before/After Comparison Slider + Action Row layout, entered directly rather than through a fresh generation). Long-press reveals a Quick Actions Menu (view detail, share, delete).
- **Size**: (Full-width minus 32pt minus 12pt gap) / 2 x ~200pt per card

### Wardrobe Catalog
- **Purpose**: A catalog of clothing items the user has tried on or manually added, organized by category, serving as the source list for future Outfit Selection
- **Data source**: API — `GET /api/tryon/wardrobe?category={filter}&cursor={cursor}`
- **Visual treatment**: Category Filter Chip Row at top ("all" / "tops" / "bottoms" / "outerwear" / "dresses" / "shoes" / "accessories"), followed by a 3-column grid of item thumbnails, --r-sm (10pt) per cell, 8pt gap
- **Content per cell** (~100pt square): Item photo (garment only, cropped/isolated at upload time if possible) + a small "worn Nx" badge (bottom-right corner, 10pt Switzer Regular, white at 70%, ink-900 at 60% scrim background) showing how many times this item has appeared in a saved look — a genuine usage count, not a styling score
- **Variants**: Standard, Empty category (centered "no [category] items yet" text)
- **Gestures**: Tap opens item detail (photo, category, times worn, list of looks it appeared in). Long-press reveals edit/delete. Tap "+ add item" card (first cell, dashed border) opens a photo picker to add a new wardrobe item directly (without going through a try-on generation first).
- **Size**: (Full-width minus 32pt minus 16pt gaps) / 3 x ~100pt per cell

### Wardrobe Item Detail Sheet
- **Purpose**: View full detail on a single wardrobe item — where it came from, how often it's been used, and which saved looks feature it
- **Data source**: API — `GET /api/tryon/wardrobe/:id` (includes `worn_count` and a list of `saved_look_ids` referencing this item)
- **Visual treatment**: Bottom sheet, ~60% screen height, ink-900 bg, --r-lg (20pt) top corners, drag handle
- **Content**:
  - Handle + header ("close" / "⋯ more")
  - Item photo: large, centered, --r-md (14pt), ~200pt tall
  - Category label + "worn N times" stat (13pt Switzer Regular, white at 60%)
  - "appears in" section: horizontal scroll of mini thumbnails linking to each saved look this item was used in
  - "try this item now" button: In-Card CTA Button pattern, orange fill, jumps directly to Outfit Selection with this item pre-selected (still requires an active reference photo)
- **Gestures**: Drag to dismiss, tap a mini thumbnail opens that Look Detail, tap "⋯ more" opens edit/delete
- **Size**: Full-width x ~60% screen height

### Look Detail (Full Screen, from Gallery)
- **Purpose**: Reopen a previously saved look for review, re-sharing, or deletion — without re-running a generation
- **Data source**: API — `GET /api/tryon/looks/:id` (returns the same `original_photo_url` / `generated_image_url` pair persisted at save time)
- **Visual treatment**: Reuses the Try-On Generation View's Result State layout exactly — Minimal Header, Before/After Comparison Slider, Result Style Note, Action Row — entered directly from a saved record rather than immediately after a fresh generation. The "regenerate" action here creates a new, separate saved look rather than mutating the original, preserving the immutability of past results.
- **Gestures**: Same as Generation Result State. Overflow menu additionally offers "delete this look" (confirmation required, removes from Saved Looks Gallery and Recent Looks Strip but does not affect Wardrobe item worn-counts retroactively — history stays accurate).
- **Size**: Full-screen

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Screen header title | Cabinet Grotesk | 600 (SemiBold) | 20pt | 26pt | White #FFFFFF | "AI Fashion Studio" |
| Segmented tab label | Cabinet Grotesk | 600 (SemiBold) | 14pt | 18pt | White / White at 50% | Active / inactive |
| Style coach label | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White at 50% | "SIA style coach" |
| Style coach insight | Switzer | 400 (Regular) | 15pt | 22pt | White at 90% | Computed, data-backed sentence |
| Style coach link | Switzer | 500 (Medium) | 13pt | 18pt | Purple at 70% | "ask SIA about your style" |
| Upload prompt guidance | Switzer | 400 (Regular) | 16pt | 22pt | White at 80% | "upload a full-body photo..." |
| Upload button label | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | White / Orange | "take photo" / "gallery" |
| Guidance overlay caption | Switzer | 400 (Regular) | 13pt | 18pt | White at 60% | Camera framing tip |
| Section eyebrow | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White at 40% | Uppercase, +0.12em tracking |
| Recent look date | Switzer | 400 (Regular) | 12pt | 16pt | White at 50% | Thumbnail caption |
| Generation status text | Switzer | 400 (Regular) | 16pt | 22pt | White at 80% | "generating your look" |
| Generation time estimate | Cabinet Grotesk | 700 (Bold) | 14pt | 18pt | White at 60% | "~15s" — numeric per data rule |
| Before/after label | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White #FFFFFF | Uppercase, over-photo scrim |
| Action row button label | Cabinet Grotesk | 600 (SemiBold) | 14pt | 18pt | Per-button color | "regenerate", "save", "share" |
| Saved look card label | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White #FFFFFF | Category, over-photo scrim |
| Saved look card date | Switzer | 400 (Regular) | 11pt | 14pt | White at 70% | Over-photo scrim |
| Wardrobe item worn count | Switzer | 400 (Regular) | 10pt | 14pt | White at 70% | "worn 3x" |
| Filter chip label | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | White / White at 60% | Active / inactive |
| Look Preview outfit name | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | White #FFFFFF | Selected item name |
| "generate" / "save" CTA | Cabinet Grotesk | 600 (SemiBold) | 16-17pt | 20-22pt | White #FFFFFF | On orange fill |
| Empty state title | Cabinet Grotesk | 600 (SemiBold) | 17pt | 22pt | White #FFFFFF | "no looks yet" |
| Empty state body | Switzer | 400 (Regular) | 14pt | 20pt | White at 50% | Contextual help |

---

## Composition & Visual Hierarchy

**Squint test**:
- On the Wardrobe/Gallery Home, the amber header accent line is the only strong domain-color signal — everything below it (segmented tab, Style Coach Card, FAB) reverts to the standard orange/purple system so the screen never reads as "off-brand" despite its distinct creative purpose
- The AI Style Coach Card's purple dot must read as clearly *earned* here — because its content is real computed data, it should carry the same visual weight and placement as any other legitimate SIA Coaching Note Card elsewhere in the app, reinforcing rather than diluting the meaning of that purple accent platform-wide
- On the Generation Progress State, the dimmed-and-shimmering original photo is the dominant visual element — it must be recognizable as "your photo, being worked on" rather than an abstract loading spinner, so the user maintains a clear mental model of what's happening
- On the Generation Result State, the Before/After Comparison Slider is unambiguously the hero element — full width, largest single surface on the screen — with the Result Style Note and Action Row both visually subordinate below it
- The Saved Looks Gallery and Wardrobe Catalog both lean on photography as the primary visual content (image-forward grids), with typography kept minimal and scrim-backed for legibility, rather than competing with the photos for attention

**Accessibility note (Before/After Comparison Slider)**: the drag-based comparison is supplemented with a tap-target fallback — tapping the "before" or "after" label always works regardless of drag capability, so the comparison remains fully usable for switch-control and assistive-touch users who cannot perform a continuous drag gesture. Under `prefers-reduced-motion`, the divider's snap-to-position animations shorten to a simple crossfade rather than a sliding motion, and the shimmer loop on the Generation Progress State is replaced with a static, subtly pulsing opacity change instead of a moving sweep.

**Spacing breakdown (8pt grid)**:
- Screen header height: 56pt (domain-dashboard-header convention)
- Header to segmented tab: 16pt (--s-4)
- Segmented tab to Style Coach Card: 16pt (--s-4)
- Style Coach Card to primary content: 24pt (--s-5)
- Section eyebrow to content below: 12pt (--s-3)
- Between grid cards: 12pt
- Card internal padding: 24pt (hero cards, Style Coach Card), 16pt (grid cells)
- Comparison slider to Result Style Note: 16pt (--s-4)
- Result Style Note to Action Row: 20pt
- Last content to tab bar: 24pt (--s-5)
- Tab bar: 56pt + 34pt safe area

**Z-layers**:
- z-0: ink-900 background
- z-10: Grid cards (Saved Looks, Wardrobe), content cards
- z-20: Style Coach Card, Recent Looks Strip
- z-30: Screen header (backdrop-blur on scroll), segmented tab (sticky if needed)
- z-40: FAB, Tab bar
- z-45: Before/After Comparison Slider drag handle (above the image content it sits atop)
- z-50: Bottom sheets (Look Preview, wardrobe item detail)
- z-60: Quick Actions Menu, confirmation dialogs (delete look/item)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Screen header accent line | #F59E0B | creativity-amber (domain) | Identification only, 2pt |
| Camera icon (upload prompt) | #F59E0B | creativity-amber (domain) | Identification-flavored, non-action icon |
| Segmented tab active | #FF5E00 | orange (primary) | Action, not domain color |
| FAB background | #FF5E00 | orange (primary) | "new try-on" CTA |
| "take photo" button | #FF5E00 | orange (primary) | Outline pill, primary path |
| "save" action (result) | #FF5E00 | orange (primary) | Persist look |
| "generate" CTA | #FF5E00 | orange (primary) | Look Preview Sheet |
| CTA links | #FF5E00 | orange (primary) | "see all saved looks" |
| AI Style Coach dot | #7F24FF | purple (SIA) | Genuinely data-backed insight — legitimate SIA use |
| Style coach link text | #7F24FF at 70% | purple (SIA) | "ask SIA about your style" |
| Comparison slider handle | #FFFFFF | white | Neutral, sits atop photo content |
| Generation success glow | #34A853 | green (secondary) | Save confirmation toast |
| Worn-count badge | white at 70% on ink-900 scrim | -- | Neutral usage stat |
| Filter chip active | #FF5E00 | orange (primary) | Wardrobe category filter |
| Delete/discard actions | #F44336 | error | Destructive, confirmation required |
| Generation failure state | #F44336 | error | Error border/icon on failed job |
| Primary text | #FFFFFF | white | Titles, labels |
| Secondary text | white at 70-90% | -- | Insight text, guidance |
| Tertiary text | white at 50-60% | -- | Captions, meta |
| Quaternary text | white at 40% | -- | Eyebrows, placeholders |

**60/30/10 verification**: Orange dominates on the FAB, segmented tab active state, primary CTAs ("take photo", "save", "generate"), and filter chips — the clear visual driver, consistent with every other screen in the system. Green is confined to the save-success confirmation only. Purple appears on the AI Style Coach Card and Result Style Note — and, notably, this is one of the few screens where purple's presence is fully earned rather than minimized, because `getStyleProfile()` genuinely computes the claims shown; the design does not suppress purple here the way Screen 70 deliberately does, because the two screens are making opposite honesty claims (one computed-not-AI, one genuinely AI-assisted-on-real-data) and the color use follows the claim in both cases. Amber (creativity-amber) is confined strictly to domain identification: the header accent line and the upload prompt's camera icon — never on a button, link, or CTA. Red is confined to destructive actions and generation failures. Ratio holds with orange as the clear visual driver.

---

## Interaction States

### Segmented Tab
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white 50% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill slides in, white text | medium impact |

### AI Style Coach Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Purple dot, standard layout | -- |
| Loading | Skeleton shimmer for insight text | -- |
| Honest-null (< 3 looks) | Muted copy, no purple dot suppressed but insight replaced with the honest-null message | -- |
| Pressed (link) | Purple text brightens, scale(0.98) | light impact |

### Photo Upload Prompt
| State | Visual | Haptic |
|-------|--------|--------|
| Default (empty) | Hero prompt, dashed border | -- |
| Uploading | Progress ring over thumbnail, "uploading..." text | -- |
| Upload failed | Red border flash, "couldn't upload, try again" inline | error notification |
| Photo ready | Collapses to compact preview row | success notification |

### Before/After Comparison Slider
| State | Visual | Haptic |
|-------|--------|--------|
| Default (centered) | Divider at 50% | -- |
| Dragging | Handle follows finger, both image crops update live | -- |
| Released near edge (< 5%) | Snaps back toward center (280ms) | light impact |
| Label tapped | Snaps divider to that side | light impact |
| Pinch-zoom | Both halves zoom in sync | -- |

### Generation Progress
| State | Visual | Haptic |
|-------|--------|--------|
| Queued | Dot 1 filled, "queued..." | -- |
| Analyzing/Compositing/Refining | Dots fill progressively, status text updates | -- |
| Slow (> 30s) | Status text changes to patience message | -- |
| Complete | Progress state crossfades to Result State | success notification |
| Failed | Error icon + "generation failed — try again?" with retry/cancel buttons | error notification |
| Cancelled | Returns to Look Preview Sheet, selection retained | -- |

### Action Row Buttons
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Per-button styling (outline / orange fill) | -- |
| Pressed | Darker shade, scale(0.96) | light impact |
| Loading (regenerate) | Spinner replaces icon+label | -- |
| Save success | Brief green glow (600ms), heart icon fills | success notification |
| Disabled (near usage cap) | 40% opacity, tap shows upgrade/limit toast | -- |

### Saved Look Card / Wardrobe Item
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Image fills card, scrim label | -- |
| Pressed | scale(0.97), scrim darkens slightly | light impact |
| Long-press | Quick Actions Menu appears | medium impact |
| Loading | Skeleton shimmer | -- |
| Deleted | Card fades out, grid reflows | 280ms |

### Filter Chip (Wardrobe)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white 10% border | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange bg, white text | medium impact |

### New Try-On FAB
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange pill, --shadow-2 | -- |
| Pressed | Darker orange, scale(0.95) | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | -- |
| Hidden (Day 1, no photo yet) | Not rendered — hero upload prompt is the sole entry point | -- |
| Locked (usage cap) | Lock icon overlay, 60% opacity | -- |

### Recent Looks Strip Thumbnail
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard thumbnail, date caption | -- |
| Pressed | scale(0.95), slight bg darken | light impact |
| Loading | Skeleton shimmer | -- |

### Look Preview Sheet
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Static side-by-side preview | -- |
| "generate" pressed | Darker orange, scale(0.97) | light impact |
| "swap outfit" / "swap photo" pressed | Text brightens, scale(0.97) | light impact |
| Disabled (no outfit selected) | "generate" at 40% opacity | -- |

### Guidance Overlay Shutter Ring
| State | Visual | Haptic |
|-------|--------|--------|
| Not aligned | White ring, static | -- |
| Aligned | Ring transitions to green, brief pulse | light impact |
| Low light detected | Ring/caption tint to orange, warning caption shown | -- |
| Shutter pressed (any state) | Standard camera capture flash | medium impact |

### Wardrobe Item Detail Sheet
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard layout, item photo centered | -- |
| "try this item now" pressed | Darker orange, scale(0.97) | light impact |
| No active photo (try tapped) | Redirects to Photo Upload Prompt first, item selection retained | -- |
| Delete confirmed | Sheet dismisses, item removed from grid | success notification |

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Segmented tab | Switch Try-On / Saved Looks / Wardrobe |
| Tap | "ask SIA about your style" | Tab switch to SIA Chat with style profile context |
| Tap | "take photo" | Open native camera with guidance overlay |
| Tap | "gallery" | Open photo library picker |
| Tap | Recent look thumbnail | Open Look Detail / Before-After Comparison |
| Tap | "see all saved looks" | Switch to Saved Looks tab |
| Tap | New Try-On FAB | Start Photo Upload / Outfit Selection flow |
| Tap | Wardrobe item / "+ upload new item" | Select item and proceed to Look Preview, or add new item |
| Tap | Category filter chip | Filter Wardrobe grid |
| Drag | Look Preview outfit vs. photo | N/A (static preview, no drag) |
| Tap | "generate" | Start async generation, opens Generation Progress State |
| Tap | "cancel" (during generation) | Abort job, return to Look Preview Sheet |
| Drag | Before/After Comparison Slider handle | Reveal more/less of before vs. after |
| Tap | "before" / "after" label | Snap divider to that side |
| Pinch | Comparison Slider image | Zoom both halves in sync |
| Tap | "↻ regenerate" | Re-run generation with same photo+outfit |
| Tap | "♡ save" | Persist look to Saved Looks Gallery |
| Tap | "⇪ share" | Open native share sheet |
| Tap | Saved Looks Gallery card | Open Look Detail / Comparison for that look |
| Long-press | Saved Looks Gallery card / Wardrobe item | Quick Actions Menu (view/share/delete) |
| Pull down | ScrollView (Home, Gallery, Wardrobe) | Pull-to-refresh |
| Tap | Back button / "✕ close" | Pop stack / dismiss generation flow |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: header (0ms), segmented tab (80ms), Style Coach Card (160ms), primary content (240ms) | 280ms each | ease-out-soft |
| Segmented tab | Tap | Active indicator slides to new segment | 280ms | ease-out-soft |
| Tab content | Tab change | Content crossfade (old opacity 1→0 + translateY 0→-8, new opacity 0→1 + translateY 8→0) | 280ms | ease-out-soft |
| Photo upload | Selected | Prompt collapses to compact preview row, height animates | 280ms | ease-out-soft |
| Generation shimmer | Loading state | Continuous shimmer sweep over dimmed photo | Loop | -- |
| Progress dots | Stage advances | Dot fills with scale(1→1.2→1) pulse | 280ms | ease-out-soft |
| Generation complete | Job resolves | Progress state crossfades to Result state (opacity, 400ms) | 400ms | ease-flow |
| Comparison divider | Drag | Follows finger 1:1, no easing during active drag | Real-time | -- |
| Comparison divider | Release (snap to edge or label tap) | Animates to target position | 280ms | ease-out-soft |
| Result Style Note | Result mount | Fade-in + translateY(12→0), 200ms after slider appears | 280ms | ease-out-soft |
| Save action | Tap save | Heart icon scale(1→1.3→1) + green glow pulse | 600ms | ease-flow |
| Regenerate | Tap regenerate | Comparison slider crossfades out, Generation Progress crossfades in | 400ms | ease-flow |
| Saved Looks grid | Enter viewport | Staggered fade-in, 60ms per card | 280ms each | ease-out-soft |
| Wardrobe grid | Enter viewport | Staggered fade-in, 60ms per cell | 280ms each | ease-out-soft |
| Look/item deleted | Confirm delete | Card scales to 0 + fades, grid reflows | 280ms | ease-out-soft |
| Bottom sheets | Open | Slide up from bottom + backdrop fade | 520ms | ease-flow |
| Bottom sheets | Dismiss | Slide down + backdrop fade out | 280ms | ease-out-soft |
| FAB | Mount | scale(0.8→1) + opacity(0→1), 400ms delay | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push from Explore or Creativity Dashboard
- **Exit**: Stack pop

---

## Empty States

### Day 1 — no reference photo, no saved looks, no wardrobe items
- AI Style Coach Card: Honest-null variant — "add a few looks and SIA will start noticing your style patterns." No purple dot suppressed, but no fabricated preference claim.
- Photo Upload Prompt: Full hero prompt as the dominant element on screen, with warmer first-run copy: "let's see how a new outfit looks on you — upload a full-body photo to get started."
- Recent Looks Strip: Hidden entirely.
- New Try-On FAB: Hidden on first visit (the hero upload prompt is the only entry point until a first photo exists, avoiding two competing calls to action).

### Saved Looks Gallery — zero saved looks
- Centered empty state. Icon: outlined hanger/photo (48pt, white at 15%). Title: "no saved looks yet" — 17pt Cabinet Grotesk SemiBold, white. Body: "generate your first try-on and save it here." — 14pt Switzer Regular, white at 50%. CTA: "start a try-on" orange text link, jumps to Try-On tab.

### Wardrobe — zero items
- Centered empty state per category filter: "no [category] items yet." Global empty (no items at all): "your wardrobe is empty — items you try on are saved here automatically, or add one directly." + "+ add item" CTA.

### Wardrobe — item with zero worn count
- A manually added item that has never been used in a generation shows "not worn yet" (10pt Switzer Regular, white at 50%) instead of "worn 0x" — phrasing a zero honestly rather than presenting a bare "0" that could read as a bug or a stale counter.

### AI Style Coach Card — data available but no clear pattern
- Distinct from the honest-null (< 3 looks) case: if the user has enough looks but their choices are genuinely varied with no dominant color or category, the card says so rather than forcing a false pattern: "your style is pretty varied so far — no single look dominates yet, and that's its own kind of pattern." This keeps the honesty commitment intact even once the minimum sample size is met.

### Generation failure
- Result area shows: error icon (32pt, red), "couldn't generate this look" — 16pt Cabinet Grotesk SemiBold, white, "something went wrong on our end — your photo and outfit selection are safe." — 14pt Switzer Regular, white at 60%. Buttons: "try again" (orange) and "cancel" (ghost).

### Usage cap reached (premium gating, if applicable)
- New Try-On FAB and "regenerate" button show a lock icon overlay. Tap surfaces a compact upgrade toast: "you've used your free try-ons this month — upgrade for unlimited generations" with an "upgrade" link to the Paywall [43]. This is a scope note, not a full paywall spec — see Cross-References.

### Offline / connectivity loss mid-generation
- If connectivity drops while a generation job is in flight, the Generation Progress State switches its status text to "reconnecting..." (white at 60%, no red error styling, since this is often transient) and continues polling on an exponential backoff. If the job cannot be recovered within a reasonable window, it falls through to the standard Generation failure state described above, with copy adjusted to "lost connection during generation — try again?" The reference photo and outfit selection are never discarded by a connectivity failure; only a hard cancel or successful save clears them.

---

## Motivation Adaptation

- **Low motivation**: Photo Upload Prompt copy softens: "no pressure — try on something fun whenever you feel like it." AI Style Coach Card, if populated, leads with affirmation rather than pattern analysis: "you've got a good eye — here's what's worked for you before." Recent Looks Strip shows only 3 items instead of 5, reducing the sense of a backlog.
- **Medium motivation**: Standard experience as described.
- **High motivation**: AI Style Coach Card includes an additional comparative line: "your color palette has diversified 20% this month compared to last." Wardrobe Catalog gains a "most worn" sort option. Saved Looks Gallery header gains a small stat: "18 looks generated, 12 saved" celebrating volume without gamifying it with XP (this module deliberately does not award XP or RPG progression, since fashion exploration is not framed as a health behavior to be reinforced with the same reward mechanics as fitness or habits).

Unlike most other screens in this system, motivation tier here is inferred from the module's own engagement signals (generation frequency, save rate) rather than the platform-wide motivation score used on Home [12] and the domain dashboards — a user who is deeply engaged with fitness but has only opened this module twice should still see the low-motivation variant here, and vice versa. Motivation adaptation on this screen is scoped locally to Virtual Try-On usage.

---

## Cross-References

- **Navigates to**: Photo Upload/Capture Flow (stack push from FAB or empty-state prompt), Outfit Selection / Wardrobe Picker (stack push after photo exists), Look Preview Sheet (modal, after outfit selected), Try-On Generation View (stack push after "generate"), Look Detail / Before-After Comparison (stack push from Saved Looks Gallery or Recent Looks Strip), Saved Looks Gallery (sibling tab), Wardrobe Catalog (sibling tab), SIA Chat [09] (via "ask SIA about your style", tab switch), Paywall [43] (via usage-cap upgrade prompt, if the module is metered)
- **Navigates from**: Screen [18] — Explore Section (stack push via "AI Fashion Studio" card, flag-gated visibility), Screen [36] — Creativity Dashboard (stack push via "try on a look" chip), Screen [09] — SIA Chat (deep-link)
- **Shared components with**: Screen [26]/[28]/[30] — Domain dashboards (56pt Domain Dashboard Header pattern, accent-line convention), Screen [26]-[36] — SIA Coaching Note Card — Compact Variant (AI Style Coach Card, Result Style Note), Screen [15]/[38] — Segmented Control, Screen [13]/[38] — Filter Chip Row, Quick Actions Menu, Screen [29] — Barcode/photo capture guidance-overlay convention (reused for the full-body photo framing guide), Screen [43] — Paywall/Upgrade Prompt (usage-cap gating)
- **Patterns used**: Back Button, 8-State Model, Segmented Control (Screen 15/38), SIA Coaching Note Card — Compact Variant (Screen 26), Filter Chip Row (Screen 13), FAB (Screen 13/35), Modal Presentation (Batch 1), Quick Actions Menu (Screen 13/38), Skeleton Loading States, Domain Dashboard Header (Screen 26)
- **Patterns established**: AI Style Coach Card (data-backed style insight, the platform's clearest example of purple used because AI genuinely touched real computed data, contrasted explicitly with Screen 70's inverse choice), Photo Upload/Capture Flow with Guidance Overlay (full-body framing guide for generation-quality source photos, advisory alignment ring rather than a hard capture gate), Look Preview Sheet (static confirmation step before committing to an async generation), Generation Progress State (dimmed-photo shimmer + staged progress dots + honest time estimate + contextual style tip while waiting + graceful offline/reconnect handling), Before/After Comparison Slider (draggable divider, edge-snap-back, dual pinch-zoom, "persist original photo" guarantee), Action Row (regenerate/save/share triad), Saved Looks Gallery (image-forward 2-column grid with scrim labels), Wardrobe Catalog (category-filtered 3-column grid with genuine usage-count badges, no fabricated styling scores), Wardrobe Item Detail Sheet (usage history + "appears in" cross-linking to saved looks), Look Detail (immutable-history variant of the Generation Result layout, entered from a saved record rather than a fresh generation)

**Explicit non-goals** (flagged per Prime Directive §0, not built into this spec): this module intentionally does **not** award XP, streaks, or RPG progression for try-on activity — fashion exploration is creative self-expression, not a health behavior the platform should be reinforcing with the same gamification mechanics used for fitness or habits. It also does not attempt outfit "scoring" (no numeric fashion grade) — the AI Style Coach Card offers observations grounded in the user's own history, never a judgment of taste.
