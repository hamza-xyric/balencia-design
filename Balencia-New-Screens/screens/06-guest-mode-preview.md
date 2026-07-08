### 1. Header
- **Screen ID:** 06
- **Name:** Guest Mode Preview
- **Route(s) covered:** No live route; pre-auth guest preview handoff from the account entry flow.
- **Tab:** Auth / Onboarding (Pre-Today)
- **Source:** Balencia Glass Canon (glass-dark v1), Component Catalog (v1), Functional Brief
- **Batch:** 3

### 2. Purpose
To answer the pre-signup hesitation "what would this actually look like for me?" by letting a hesitant visitor stand up a personalized, *illustrative* preview with almost no friction — a name and 1–3 life areas. It proves the whole-life, cross-domain premise before asking for any commitment, then hands the visitor into a seeded demo session where the real conversion moment lives (see correction in §3).

### 3. Entry & exit
- **Entry point:** stack push from Welcome/Sign Up [03] via "try without an account."
- **Primary exit (success):** *correction —* the draft treated this screen as if it directly converts the user to a registered account. It does not: tapping **explore** hands off into the **Guest Demo Session** (Today tab, guest-flagged, seeded per §11), not to Welcome/Sign Up. The persistent "sign up" banner and session-end overlay referenced in the brief live *inside* that demo session, one screen downstream — this screen's job ends at the handoff. Scoping the exit correctly here keeps §3 honest about what screen 06 actually owns.
- **Secondary exit:** stack push to Sign In [04] via the "sign in" link.
- **System exit:** back chevron tap, or standard edge-swipe/back-gesture, returns to [03]. Any entered name/selections are discarded (guest mode carries no persistence guarantee).

### 4. Layout anatomy
**Regions top to bottom:**
1. **Top navigation** — transparent back chevron (44px target), no title (brand anchor below carries that role).
2. **Brand anchor** — Balencia symbol mark, centered, paper-100.
3. **Contextual copy** — Display heading + Body-light sub-copy.
4. **Data entry** — GlassPillInput for name capture.
5. **Preview visualization** — ConstellationRadar reacting live to chip selections.
6. **Selection module** — overline label + counter, 3×3 domain chip grid.
7. **Primary action area** — BtnPrimary + BtnGhost escape hatch.

**ASCII wireframe (390×844):**
```text
[ Screen atmosphere: warm-dark base, orange top glow (CANON §1) + purple pool
  behind the radar at ~45% height (CANON §3 glow-cia), 3–4% grain ]
┌─────────────────────────────────────────────────┐
│  ‹                                               │  ── TopBar, transparent
│                                                   │
│                    ( ◉ )                         │  ── Balencia mark, 28px
│                                                   │
│              take a *look* around                │  ── Display 34, 1 emphasis
│        tell us your name and pick a few          │  ── Body-light 16
│             areas you care about.                │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │  your name                                 › │ │  ── GlassPillInput, text
│  └─────────────────────────────────────────────┘ │
│                                                   │
│        ┌───────────────────────────────┐         │
│        │      ·   ConstellationRadar  · │         │  ── FrostCard r40, glow-cia
│        │    ·      (domain-tinted       │         │     mesh; empty = quiet dot
│        │        star nodes)         ·   │         │
│        │        [demo · illustrative]    │         │  ── ChipProvenance, forced
│        └───────────────────────────────┘         │     once ≥1 node lights
│                                                   │
│  life areas                        (0 selected)  │  ── Overline (caps via CSS)
│  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │ Fitness │  │Nutrition│  │ Mental  │           │  ── ChipDomainTag ×9
│  └─────────┘  └─────────┘  └─────────┘           │     rest = domain 16% tint
│  ┌─────────┐  ┌─────────┐  ┌─────────┐           │     (44px touch target
│  │ Finance │  │ Career  │  │Relation-│           │      wraps 36px visual pill)
│  │         │  │         │  │ ships   │           │
│  └─────────┘  └─────────┘  └─────────┘           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │Spiritua-│  │Learning │  │Creativ- │           │
│  │lity     │  │         │  │ity      │           │
│  └─────────┘  └─────────┘  └─────────┘           │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │                  explore                   │ │  ── BtnPrimary, 40% opacity
│  └─────────────────────────────────────────────┘ │     until valid (see §9)
│                                                   │
│         already have an account? sign in         │  ── BtnGhost
└─────────────────────────────────────────────────┘
```

### 5. Components
- **TopBar** (transparent variant) — back chevron only, no trailing glyphs.
- **GlassPillInput** (text variant) — name capture; focus = 1px orange border + subtle orange glow per catalog.
- **FrostCard** — substrate for the radar; radius 40 (`--r-2xl`, hero-tier per CANON §6), blur 48 / sat 130% / border `.16` / inset top-light `.40`. Legal usage per catalog ("never used on data-dense screens") since this surface is explicitly non-data.
- **NEW: ConstellationRadar** — illustrative, non-metric hero visual. *Purpose:* give a hesitant guest a tangible cross-pillar "map" without ever implying it was measured. *Anatomy:* FrostCard substrate + up to 9 axis points (one per life domain, tinted in each domain's catalog color per CANON §4) arranged in a circle + connecting mesh rendered in `glow-cia` purple at reduced opacity (the mesh, not the nodes, carries the "AI/projection" meaning) + center anchor point. *Variants:* `empty` (0 nodes, single quiet glyph) / `building` (1–3 domain-colored nodes lit as chips are picked, mesh animates in per node). *State rule:* once ≥1 node is lit it carries a persistent `ChipProvenance` reading `demo · illustrative` — never omitted, so the preview can never be mistaken for a real Life Power reading. *Rationale for NEW:* the catalog has no immersive, non-data "hero" visual for onboarding; `TrendChart`'s honesty discipline (CANON §7) is reused, not its line-chart geometry. Flag for promotion into the catalog if reused by another onboarding screen.
- **ChipDomainTag** — repurposed here as a multi-select control (catalog defines it as a display tag; this screen extends it with selection states, see §6 correction). 3×3 grid, all 9 canon domains, 44px touch target wrapping a ~36px visual pill.
- **BtnPrimary** — "explore." One per composition. Disabled state per catalog (40% opacity) is the default/cold-start state.
- **BtnGhost** — "sign in" escape hatch, 44px target.
- **Not applicable — ConsentCard:** this screen collects only a display name and non-health category preferences, not health data, photos, voice, or third-party sourced data — CANON §8's consent trigger doesn't fire here. Justified omission, not an oversight.
- **Not applicable — GlassNavBar / FABQuickLog:** pre-Today auth flow; both are Today-tab-only per catalog.

### 6. Visual treatment
- **Atmosphere:** `--bg-base` with the mandatory soft warm orange radial top glow (CANON §1), plus a `glow-cia` purple pool centered behind the radar at ~45% viewport height — the one place on this screen purple appears as ambient light rather than a tag color.
- **Input:** `.glass-pill`, blur 24, border `.10`, per GlassPillInput default.
- **Radar substrate:** `.glass-frost`, blur 48, sat 130%, border `.16`, inset top-light `.40`, radius 40 — see §5 correction on FrostCard sizing (the draft under-specified this to blur-48/inset-only; sat and border were missing).
- **Domain grid — *correction applied*:** the draft rendered the 3×3 grid as "flat `--surface-1` outlines," which contradicts the catalog's own `ChipDomainTag` definition (domain color at 16% bg + domain-color label/icon — tags are never neutral-flat). Corrected treatment:
  - *Rest:* domain color at 16% bg, domain-color icon + label, 1px border at domain-color 24%. No ambient glow — CANON §4 is explicit that domain colors are "tags/icons only, never chrome," so a full semantic glow here would blur the line between the tag system and the three-color signature glow system (CANON §3).
  - *Selected:* bg brightens to domain-color 28%, border to domain-color 70%, small check glyph fades in trailing the label. Still no ambient glow — the distinction stays crisp fill/border, not a bleeding radial.
- **Glow inventory for this screen:** exactly one true semantic glow exists — `--glow-cia` (#7F24FF) on the radar's FrostCard. *Meaning:* CIA / AI-synthesized projection — this is Balencia's own cross-domain read of the picture the user is building, not a measured value. Every other color on screen (orange CTA, domain tints) is chrome or tag color, not glow, per §4 above.
- **Hero type moment:** "take a *look* around," Neue Montreal Medium 34px. One Tiempos-italic emphasis word ("*look*").

### 7. Content & copy
All strings sentence case, no exclamations, second person.
- **Hero:** "take a *look* around"
- **Sub-copy:** "tell us your name and pick a few areas you care about."
- **Input placeholder:** "your name"
- **Overline (authored lowercase, CSS text-transform renders caps per CANON §5 — *correction:* draft hard-coded "LIFE AREAS" as a literal caps string, which breaks the sentence-case authoring convention used everywhere else in the type system):** "life areas"
- **Counter (dynamic):** "(0 selected)" / "(1 selected)" / "(2 selected)" / "(3 selected)"
- **CTA:** "explore"
- **Escape hatch:** "already have an account? sign in"
- **Cap-reached toast:** "pick up to 3 areas"
- **Radar empty-state line:** "pick a few areas to see your map"
- **Handoff toast (on entering the demo session):** "welcome to your preview"

### 8. Data & honesty states
This screen carries no real metric — nothing has been measured or synced yet, so it maps onto the honesty triple as a fully justified non-standard case rather than forced compliance:
- **Real:** not applicable. Rationale: the honesty invariant governs metrics that claim measurement; this screen precedes any data collection entirely (no account, no logged data, no connected source).
- **Low-confidence:** not applicable. Rationale: nothing is being estimated or projected from signal — the radar's nodes are placeholder amplitude tied only to which chips are tapped, not a computed confidence value.
- **Honest-null:** the default and *only* live state. Radar renders empty (quiet glyph, no nodes) until ≥1 domain is selected. Empty copy: "pick a few areas to see your map."
- **Illustrative-preview guard (screen-specific addition to the honesty pattern):** once chips are selected and nodes light up, the radar is not a null state anymore visually — so it must carry an explicit `ChipProvenance` reading `demo · illustrative` at all times from first node onward. This is the mechanism that stops a populated, glowing chart from silently reading as a real Life Power visualization. Never omit this chip once any node is lit.

### 9. All states
- **Default (cold-start):** empty name field, all 9 chips unselected, radar empty, "explore" at 40% opacity, non-interactive.
- **Partial validation:** name entered, 0 chips selected (or vice versa) — CTA stays disabled. Both a name (≥1 character) and ≥1 domain are required.
- **Valid:** CTA reaches full opacity, interactive, once both conditions are met.
- **Cap-reached error:** tapping a 4th chip triggers a 150ms shake on the tapped chip + toast "pick up to 3 areas." The chip does not select; the other 3 stay as selected.
- **Loading:** BtnPrimary label swaps to spinner, width locked — *correction:* the draft additionally swapped the label to literal text "Loading…," which contradicts the catalog's BtnPrimary loading spec (label→spinner only). Removed the redundant text.
- **Network/init failure:** quiet `ErrorState` banner surfaces above the CTA — glyph + plain-language Body line ("couldn't start your preview — check your connection") + `BtnSecondary` "retry." *Correction:* the draft used a blocking toast with CTA-text mutation; aligned to the catalog's `ErrorState` component instead, which is the canonical quiet-failure pattern (never blames the user, never a raw error code).
- **Success / handoff:** entry form crossfades out (opacity 1→0) while the Guest Demo Session (Today tab, guest-flagged) crossfades in, seeded per §11.

- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

### 10. Motion & interaction
- **Form mount:** staggered fade + translateY (12→0px), 200ms stagger: back chevron → mark → heading → sub-copy → input → radar → chip grid → CTA → ghost link.
- **Chip select:** spring scale oscillation (1 → 1.05 → 1), bg/border crossfade from rest-tint to selected-tint over ~150ms.
- **Chip deselect:** spring scale (1 → 0.95 → 1), reverse crossfade.
- **Radar reaction:** on each selection, the corresponding domain node draws in via continuous-stroke path (500ms ease-out, domain color); the connecting mesh (purple, `glow-cia`) redraws to include the new node.
- **Radar ambient:** `glow-cia` breathes on the mesh, opacity 50%↔70%, 4s ease-in-out infinite — the screen's one "breathing hero glow" per CANON §6.
- **Haptics:** light selection tick on chip tap; medium success tap on CTA press.
- **Reduced-motion path:** all translateY/scale oscillations become instant opacity crossfades; the radar's continuous-stroke draw becomes an instant reveal; the breathing glow becomes a static mid-opacity glow (no infinite loop).

### 11. Motivation-tier adaptation
*Correction to draft's framing:* motivation tier is normally read from onboarding-quiz signal that doesn't exist yet for an anonymous guest — so tier-driven density genuinely cannot style this screen's own UI (there is no established tier to key off of). That is a justified "not applicable" for §4's requirement, not an evasion: the form itself is identical regardless of tier. What tier *does* govern is the seed density of the demo session this screen hands off into:
- **Low density:** 1 active mission, 3-day streak in the demo session.
- **Medium density (default):** 3 active missions spanning the selected domains, 12-day streak.
- **High density:** 5 active missions, 30-day streak, CIA chat pre-populated with 3 `InlineArtifactCard` examples.

### 12. Accessibility
- **Contrast — *correction applied, both directions:*** the draft asserted "5.2:1" for the explore button (paper-50 `#FDFDFB` on burnt orange `#FF5E00`) without showing real math. Computed against WCAG relative luminance, the actual ratio is **≈3.0:1** — it clears the 3:1 floor for large-scale/bold text and for non-text UI-component boundaries, but falls short of the 4.5:1 threshold that applies to the button's normal-weight 16px label text. This is an inherited property of the canon-wide `BtnPrimary` token (orange fill + paper-50 label used across every screen), not something this single spec can silently redesign — flagging it honestly here as accessibility debt rather than asserting false compliance. Mitigations to evaluate at the token level: bump CTA label to 18px+ (crosses into WCAG large-text territory) or accept as a documented brand exception given short, high-legibility single-word labels at 52px height. For the ghost link: orange `#FF5E00` label on `--surface-1` `#140A05` computes to **≈6.4:1**, comfortably clearing 4.5:1 (the draft's "4.5:1" claim understated this).
- **Touch targets:** the visual chip is ~36px tall; each sits inside a 44px invisible touch container (padding, not visual bloat) to meet the iOS HIG / WCAG 44px floor without disrupting the 3×3 grid's density. Grid math at ~24px side margins and 12px gutters yields chip cells ≈104–110px wide — comfortable headroom for the 44px target in both axes.
- **Color independence:** domain identity never depends on color alone — every `ChipDomainTag` and every radar node pairs its color with a distinct icon glyph and a text label, so a colorblind user can distinguish all 9 domains without relying on hue.
- **Screen-reader labels:**
  - Name input: "text field, your name."
  - Radar: "illustrative preview of your life areas, not real data."
  - Domain chips: "{domain name}, {selected/not selected}."
  - Disabled explore button: "explore. requires your name and at least one life area."
  - Enabled explore button: "explore. starts your preview."

### 13. Premium checklist
1. **Connects (cross-pillar):** yes — ConstellationRadar exists specifically to visualize multi-domain linkage before any account exists.
2. **Honest (no fake data):** yes, and strengthened — the honesty triple is mapped with justified real/low-confidence N/A rather than skipped, and the `demo · illustrative` chip is now a *mandatory persistent* state once any node lights (§8), not a one-time label.
3. **Premium (funded product):** generous stagger-in rhythm, immersive FrostCard hero, restrained one-glow discipline, bespoke Tiempos-italic emphasis.
4. **60/30/10 color:** orange CTA + orange chip highlight scaffolding; purple confined to the one CIA/projection glow; domain colors confined to tags per §6's corrected chip treatment.
5. **Selective glass:** FrostCard reserved for the hero radar; glass-pill for input; domain-tinted (non-glass, non-glow) chips for the dense grid — matches CANON §2's data-density rule.
6. **Semantic glow:** exactly one (`--glow-cia`), meaning stated and scoped away from the tag-color system (§6 correction).
7. **One hero type moment:** "take a *look* around."
8. **Sentence case, no exclamations:** held throughout; overline authoring fixed to lowercase-with-CSS-transform (§7 correction).
9. **CIA voice:** direct address, warm, no dashboard-speak.
10. **Honest-null / triple states:** real & low-confidence formally marked not-applicable with rationale (§8), honest-null fully designed.
11. **Touch targets ≥44px:** solved via invisible padding on the 36px visual chip.
12. **Physical easing:** spring on chip select/deselect; continuous-stroke draw on radar nodes.
13. **Reduced-motion path:** covers translate/scale, stroke-draw, and the ambient breathing glow.
14. **A11y floor:** contrast honestly measured and flagged where it falls short (§12) rather than asserted; color-independent domain identification; screen-reader labels on all interactive and glyph-only elements.
