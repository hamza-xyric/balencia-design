# 02-motion-carousel - hi-fi glass spec

### 1. Header
- **ID:** 02
- **Name:** Motion carousel
- **Route(s) covered:** no live route; pre-auth brand carousel between Splash [01] and Welcome sign-up [03].
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** none; pre-auth stack.
- **Source:** app_design 3/02-motion-carousel.md plus ascii_wireframes/02-motion-carousel.md.
- **Batch:** 1

### 2. Purpose
Balencia's four-panel carousel is the 5-10 second brand hook before authentication. It must sell the product through motion: a life-area constellation, a corrected CIA coach presence, a cross-domain insight, and a premium gamified progress moment. The feeling is cinematic and warm, with almost no data entry and no dashboard chrome.

### 3. Entry & exit
- **Entry:** Splash [01] crossfades into panel 1 after the launch mark settles.
- **Primary exit:** final CTA "Get started" pushes Welcome sign-up [03].
- **Fast exit:** `skip` in the upper-right uses the same destination as the final CTA and stays available on all panels.
- **Panel movement:** horizontal paging by swipe or the CTA; pagination is status, not a separate tap target.
- **Failure exit:** if animation assets fail, the static keyframe keeps `skip` and `Get started` usable.

### 4. Layout anatomy
**Regions, top to bottom:**
1. Status zone and 44px `skip` target, transparent over the warm-dark field.
2. Motion stage, 60 percent of the screen height, no card frame.
3. Panel headline and subtext, centered and limited to two lines.
4. Pagination dots with current index announced as "Slide X of 4."
5. BtnPrimary CTA, "next" on panels 1-3 and "Get started" on panel 4.
6. Home indicator; no GlassNavBar and no authenticated quick-log controls.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| Status bar                            |
+--------------------------------------+
|                                skip  |
|                                      |
|        PANEL 1 motion stage          |
|     *    o       life dots       *   |
|        \   \   /   /                 |
|          \  (hub)  /                 |
|     o ---- continuous stroke ---- o  |
|                                      |
|        One life, not modules.        |
|        Everything connects. Finally. |
|                                      |
|              [====]  o  o  o         |
|                                      |
|  +--------------------------------+  |
|  |              next              |  |
|  +--------------------------------+  |
|                                      |
| Home indicator                       |
+--------------------------------------+
| Panel 2: Meet CIA, your coach.       |
| Panel 3: Everything connects.        |
| Panel 4: Your life, gamified.        |
+--------------------------------------+
```

### 5. Components
- **BtnPrimary** - final forward action; orange fill, locked width, loading spinner if navigation takes longer than 400ms.
- **BtnGhost** - `skip`, text-only but with a 44px hit area and visible focus ring.
- **ProgressRing** - panel 4 XP ring; green completion dots only after earned milestones.
- **CIAInsightCard** - panel 3 mini insight surface, purple-tinted only because it is coach synthesis.
- **ChipDomainTag** - panel 1 and panel 4 domain labels, used as tiny identity marks rather than chrome.
- **SkeletonState / ErrorState / HonestNullState** - adapted for static assets and animation bundles.
- **NEW: MotionStage** - full-bleed animation viewport; needed because this pre-auth brand surface intentionally avoids cards around the hero art.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` base with the canon warm radial glow, a faint purple pool only on the CIA panel, and 3-4 percent grain.
- **Glass tiering:** the stage floats directly on the background. Only panel 3's insight and panel 4's quest card use GlassCard; the CTA uses BtnPrimary, not a glass card.
- **Semantic glows:** panel 1 stroke and CTA use `--glow-you #FF5E00` for user life energy; panel 2 uses `--glow-cia #7F24FF` because CIA is the subject; panel 4's earned XP dot uses `--glow-done #34A853`.
- **Type:** Neue Montreal for all copy; one Tiempos italic word per panel is allowed, such as "One *life*, not modules."
- **Color discipline:** orange owns action and connective energy, purple is restricted to CIA, green appears only for earned progress or arrival.

### 7. Content & copy
- **Panel 1:** "One life, not modules." Subtext: "Everything connects. Finally."
- **Panel 2:** "Meet CIA, your coach." Subtext: "Always in your corner."
- **Panel 3:** "Everything connects." Subtext: "Sleep affects spending. Stress affects workouts. CIA sees the pattern."
- **Panel 3 insight:** "Your spending rose on low-sleep days." Evidence chips: `sleep log`, `money map`.
- **Panel 4:** "Your life, gamified." Subtext: "Earn XP. Level up. Stay on track."
- **CTA labels:** `next`, then `Get started` on panel 4.
- **Asset fallback copy:** "Animation loading. You can still start."

### 8. Data & honesty states
- **Static brand copy:** real = approved carousel copy from source; low-confidence does not apply to copy and is replaced by asset provenance; honest-null = animation keyframe fallback with the same headline.
- **Animation assets:** real = bundled Rive or Lottie asset with asset-version ChipProvenance; low-confidence = static keyframe if playback support is uncertain; honest-null = no motion file, but the authored keyframe and copy still render.
- **Panel 3 insight:** real = demo insight with `demo` provenance chip, never shown as personal data; low-confidence = label as "example pattern"; honest-null = omit the insight card rather than invent a personalized correlation.
- **Panel 4 XP:** real = demo XP counter labeled as sample; low-confidence = no count-up, only ring outline; honest-null = quest card says "XP unlocks after sign-up."

### 9. All states
- **Default:** four panels page horizontally, panel copy and motion are complete, and the current slide is announced.
- **Skeleton:** motion stage shows warm shimmer geometry, not a blank gray box; CTA is Disabled until the first panel can be read.
- **Empty:** missing animation bundle keeps the static keyframe and copy visible; this is an asset empty state, not a user-data empty state.
- **Error:** ErrorState appears only after repeated asset failure; `skip` and `Get started` remain usable.
- **Success:** final CTA press crossfades the CTA glow to `--glow-done` before pushing [03].
- **Disabled:** CTA is disabled only during navigation handoff; screen-reader reason says "Opening sign-up."

### 10. Motion & interaction
- **Panel 1:** continuous stroke draws through nine domain dots over 1200ms, then rests with a subtle pulse.
- **Panel 2:** CIA presence blooms from warm purple, breathes slowly, and never looks robotic.
- **Panel 3:** correlation line pulses once, then the CIAInsightCard fades up with evidence chips.
- **Panel 4:** XP ProgressRing fills from zero to sample progress, then the quest card settles under it.
- **Pager:** swipe follows native paging physics; CTA advances one panel at a time.
- **Reduced-motion:** disables stroke draw, bloom, pulse, and XP count-up; each panel loads as a final still with opacity-only transitions.

### 11. Motivation-tier adaptation
- **Low:** show panel 1, panel 2, and a shortened panel 4; skip remains prominent.
- **Medium:** default four-panel sequence.
- **High:** allow detail captions on panel 3 evidence chips and panel 4 quest metadata after the first loop.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+; inactive pagination is decorative and paired with the slide announcement.
- **Targets:** `skip`, CTA, and pager affordances maintain 44px touch targets.
- **Screen readers:** each panel has a single summary; animation internals are not read as separate noise.
- **Data control:** no health, photo, voice, social, AI-personalized, or third-party data is collected here; consent appears later when those surfaces ask for data.
- **Reduced-motion:** mirrors Section 10 and respects OS preference.

### 13. Premium checklist
1. **Connects:** panel 1 and panel 3 show whole-life connections, not feature tiles.
2. **Honest:** demo insight and XP are labeled with provenance and never imply personal data.
3. **Premium:** one full-bleed motion stage, no route-directory clutter.
4. **Warm-dark:** canon background, grain, and glow applied.
5. **Semantic glow:** orange effort, purple CIA, green earned arrival.
6. **60/30/10:** orange leads; purple and green are restrained.
7. **Type:** Neue Montreal plus one Tiempos italic emphasis word per panel.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high sequences defined.
10. **Accessibility:** labels, 44px targets, contrast, and reduced-motion included.
11. **Honesty triple:** real, low-confidence, and honest-null treatments are defined for assets and demo data.
12. **Catalog:** catalog components named; MotionStage is marked NEW with rationale.
13. **CIA voice:** coach naming corrected to CIA throughout.
