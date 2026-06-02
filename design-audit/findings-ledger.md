# Findings Ledger — A++ Premium-Craft Elevation

Finding IDs: **`S##-C##`** (screen + craft finding) · **`CK-T##`** (new craft token) · **`CK-P##`** (new craft pattern) · **`CK-F##`** (cross-cutting craft fix).
Status lifecycle: `open` → `specced` (written into the screen's `## Premium Craft`) → `built` → `resolved` (build program) / `deferred`.
Fix-pointer = the exact remedy + `CRAFT-KIT`/`VIZ-KIT` pattern or token + target spec section.

## Kit-level findings (foundation)

| ID | Severity | Title | Fix-pointer | Status |
|---|---|---|---|---|
| CK-T01 | Medium | `--edge-highlight` absent | mint `inset 0 1px 0 rgba(255,255,255,0.06)` in `globals.css`; top-edge highlight on layered surfaces (`CK-P1`) | open (build) |
| CK-T02 | Medium | `--surface-backplate` absent | mint warm radial backplate token; hero surfaces (`CK-P2`) | open (build) |
| CK-T03 | Medium | `--focus-ring` absent | mint the one app-wide 2px-orange/2px-offset focus ring (`CK-P8`) | open (build) |
| CK-T04 | Medium | `--leading-*` absent | mint line-height steps 1.1/1.25/1.4/1.6 (`CK-P3`) | open (build) |
| CK-T05 | Medium | `--tracking-*` absent | mint tracking steps −0.025em/0/0.12em (`CK-P3`) | open (build) |
| CK-F00 | Medium | `_shared-patterns` gradient table stale | defer `--grad-progress` etc. to the viz-audit `VK-017` orange→green definitions; `_shared-patterns` lists a pre-correction teal value | open |

> The depth tokens `--orange-light · --grad-orange · --grad-progress · --track-inset · --glow-orange-md/-sm · --stroke-*` are **inherited from the viz-audit `VK-017`** (already logged there); this program depends on them and does not re-log them.

## Screen findings

### Batch H — 12 Home / Today (data profile · A− 85 → A++ 95)

| ID | Severity | Title | Fix-pointer | Status |
|---|---|---|---|---|
| S12-C01 | High | Non-chart surfaces flat (no edge-highlight / layered depth) | apply `CK-P1` + `--edge-highlight`/`--surface-backplate` to SIA card, action/schedule/insight cards, activity rows → `## Premium Craft` Surface & depth | specced |
| S12-C02 | High | Dual focal point (SIA card vs Constellation Radar hero) | demote SIA card to warm preamble; radar = sole `CK-P2` hero → Focal hierarchy | specced |
| S12-C03 | Medium | Edge microcopy partly unauthored (loading / no-device / refresh-fail) | author per `CK-P5` → Microcopy | specced |
| S12-C04 | Medium | Type line-heights ad-hoc px, tracking unspecified | map to `CK-P3` `--leading-*`/`--tracking-*` → Typographic rhythm | specced |
| S12-C05 | Medium | ASCII wireframe stale (flat pills; omits radar/sparklines/momentum) | redraw from `## Premium Craft` + `## Visualization` in the build | open (build) |
| S12-C06 | Medium | Internal contradiction: Health Metrics "hidden silently" vs viz "Connect a device" | reconciled Components + Error Handling to the affordance | specced |
| S12-C07 | Low | Contrast asserted, not tabulated | tabulated load-bearing pairs → Accessibility | specced |


### Batch H — 16 Life Areas Overview (data profile · A− (85) → A++ (96))

| ID | Severity | Title | Fix-pointer | Status |
|---|---|---|---|---|
| S16-C01 | Medium | Surfaces lack explicit layered-depth treatment | → `## Premium Craft` | specced |
| S16-C02 | Medium | Microcopy examples are placeholder; edge strings (loading/empty/error) unwritten | → `## Premium Craft` | specced |
| S16-C03 | Medium | Typography ad-hoc (no `--leading-*` / `--tracking-*` bindings) | → `## Premium Craft` | specced |
| S16-C04 | Medium | Cold-start, loading, empty, and error states described but not in a crafted matrix | → `## Premium Craft` | specced |
| S16-C05 | Low | Contrast pairs asserted, not tabulated | → `## Premium Craft` | specced |
| S16-C06 | Low | Comparison deltas lack glyph pairing; colour-alone risk | → `## Premium Craft` | specced |

> Plus 9 table-level reconciliations flagged (Color-Map/Typography/Interaction/Components) — **deferred to the final QA reconciliation pass** (task 10); the `## Premium Craft` section states the corrected intent.


### Batch H — 19 RPG Character (data profile · A− (86) → A++ (96))

| ID | Severity | Title | Fix-pointer | Status |
|---|---|---|---|---|
| S19-C01 | Medium | Streak & Rewards section lacks Motion and State craft design | → `## Premium Craft` | specced |
| S19-C02 | Medium | XP bar overall (character card) missing explicit Living-Line token reference | → `## Premium Craft` | specced |
| S19-C03 | Medium | Domain sub-stats bottom-sheet StatBars depth missing locked size-stepping | → `## Premium Craft` | specced |
| S19-C04 | Low | ASCII wireframe does not reflect Visualization upgrades (Constellation Radar, Living-Lin… | → `## Premium Craft` | open (build) |
| S19-C05 | Low | Level-up celebration motion not specified in Motion table | → `## Premium Craft` | specced |

> Plus 3 table-level reconciliations flagged (Color-Map/Typography/Interaction/Components) — **deferred to the final QA reconciliation pass** (task 10); the `## Premium Craft` section states the corrected intent.


### Batch H — 09 SIA Chat (data profile · A− (87) → A++ (96))

| ID | Severity | Title | Fix-pointer | Status |
|---|---|---|---|---|
| S09-C01 | Critical | Flat surfaces throughout chat lack layered depth and top-edge highlight | → `## Premium Craft` | specced |
| S09-C02 | High | Five inline-viz types lack explicit entrance choreography and reduced-motion frames | → `## Premium Craft` | specced |
| S09-C03 | High | Edge microcopy (loading/empty/error) partly unauthored; generic placeholder tone | → `## Premium Craft` | specced |
| S09-C04 | High | Type table mixes ad-hoc pixel sizes (e.g. 15pt, 14pt, 12pt, 11pt) with locked CK-P3 scal… | → `## Premium Craft` | specced |
| S09-C05 | High | Contradiction: Visualization §2 cites purple 'SIA register' per _shared-patterns.md line… | → `## Premium Craft` | specced |
| S09-C06 | High | Contrast pairs asserted, not tabulated; AAA + 1.4.11 verification missing | → `## Premium Craft` | specced |

> Plus 5 table-level reconciliations flagged (Color-Map/Typography/Interaction/Components) — **deferred to the final QA reconciliation pass** (task 10); the `## Premium Craft` section states the corrected intent.


### Batch H — 17 Me Main (data profile · A− (85) → A++ (96))

| ID | Severity | Title | Fix-pointer | Status |
|---|---|---|---|---|
| S17-C01 | Medium | Edge highlight (`CK-T01`) absent from all card surfaces | → `## Premium Craft` | specced |
| S17-C02 | Medium | Typographic line-heights and tracking are ad-hoc pixels, not `CK-T04`/`CK-T05` tokens | → `## Premium Craft` | specced |
| S17-C03 | Medium | Focus-visible ring is inconsistent across components (some 2pt orange, some undefined) | → `## Premium Craft` | specced |
| S17-C04 | High | Notification and achievement badges use colour-alone (orange/green dots) with no visible… | → `## Premium Craft` | specced |
| S17-C05 | Medium | Edge microcopy (loading, error, empty states, a11y labels) is unauthored or partial | → `## Premium Craft` | specced |
| S17-C06 | Low | ASCII wireframe does not show XP Living-Line bar or domain StatBars (outdated after viz … | → `## Premium Craft` | open (build) |

> Plus 7 table-level reconciliations flagged (Color-Map/Typography/Interaction/Components) — **deferred to the final QA reconciliation pass** (task 10); the `## Premium Craft` section states the corrected intent.


### Batch H — 28 Nutrition & Diet (data profile · A− (86) → A++ (95))

| ID | Severity | Title | Fix-pointer | Status |
|---|---|---|---|---|
| S28-C01 | High | Macro Donut focal hierarchy not established in Components/Layout | → `## Premium Craft` | specced |
| S28-C02 | Medium | Surface depth (edge-highlight, glow) unspecified on all cards except water ring | → `## Premium Craft` | specced |
| S28-C03 | Medium | Typography line-heights and tracking are ad-hoc pixels, not locked tokens | → `## Premium Craft` | specced |
| S28-C04 | High | Macro Donut, KPI, MacroBar, and heatmap empty/loading/error states undesigned or contrad… | → `## Premium Craft` | specced |
| S28-C05 | Medium | Water ring depth (inset track, size-calibrated glow) unspecified; water [+] button inter… | → `## Premium Craft` | specced |
| S28-C06 | Medium | Meal-row calorie-weight bars and micro-donuts (S28-V06) are data-viz elements not yet co… | → `## Premium Craft` | specced |
| S28-C07 | Medium | Microcopy for Donut hub states ('Log a meal to see your split', over-target framing, hea… | → `## Premium Craft` | specced |
| S28-C08 | Low | FAB scroll-hide behavior is mentioned in Components but motion not specified | → `## Premium Craft` | specced |
| S28-C09 | Medium | Interaction State Matrix (Interaction States section) incomplete — missing focus-ring sp… | → `## Premium Craft` | specced |
| S28-C10 | Medium | Contrast pairs asserted but not tabulated — no explicit WCAG 1.4.11 values for load-bear… | → `## Premium Craft` | specced |
| S28-C11 | Low | ASCII wireframe (Layout section, lines 42–135) is stale — shows flat bars, no Donut, no … | → `## Premium Craft` | open (build) |
| S28-C12 | Low | Domain-lime (#84CC16) is used on the header accent line and RPG badge but specs say 'nut… | → `## Premium Craft` | specced |
| S28-C13 | High | SIA Coaching Note is specified as 'semantic link/button to SIA with nutrition context' (… | → `## Premium Craft` | specced |
| S28-C14 | Low | Water-ring glow recolouring from orange to wellbeing-blue is noted as 'sanctioned except… | → `## Premium Craft` | specced |

> Plus 4 table-level reconciliations flagged (Color-Map/Typography/Interaction/Components) — **deferred to the final QA reconciliation pass** (task 10); the `## Premium Craft` section states the corrected intent.


> Note: `09 SIA Chat` is **data-profile** per `screen-classification.md` (it carries a `## Visualization`); its drafted section header reads "content" — a label nuance to reconcile in QA (weighting only; the section is graded against the same A++ bar).

### B01–02 — 01 Splash (content profile · B+ (82) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S01-C03-depth | High | Surface & depth language implicit; no explicit glow/shadow/highlight recipe | specced |
| S01-C11-microcopy | High | Loading / error / offline states lack authored microcopy; no non-shaming recovery gu… | specced |
| S01-C14-anti-generic | Medium | Signature ownable moment relies entirely on animation; no static depth cue if animat… | specced |
| S01-C07-state-craft | Medium | State-craft matrix incomplete; cold-start, loading, error states designed as layout … | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B01–02 — 02 Motion Carousel (content profile · B+ (78) → A− (86))

| ID | Severity | Title | Status |
|---|---|---|---|
| S02-C01 | Medium | Motion graphic area lacks explicit layered depth treatment | specced |
| S02-C02 | Medium | Pagination dot interaction not fully specified | specced |
| S02-C03 | Low | Reduced-motion frame for panel 2's glow needs explicit state | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B01–02 — 03 Welcome / Sign Up (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S03-C01 | High | Premium form input depth | specced |
| S03-C02 | Critical | Microcopy authoring – non-shaming error recovery | specced |
| S03-C03 | High | Focal hierarchy – CTA anchors form conversion | specced |
| S03-C04 | High | Input focus ring – burnt-orange, uniform | specced |
| S03-C05 | Medium | Motion choreography – staggered entry, draw-not-fade | specced |
| S03-C06 | High | State craft matrix – all states designed | specced |
| S03-C07 | Medium | Contrast on error-red border – WCAG 1.4.11 | specced |
| S03-C08 | Medium | Social auth – secondary framing, not primary path | specced |

> +7 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B01–02 — 03b OTP Verification (content profile · A− (84) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| 03b-C01 | Medium | OTP input boxes lack layered depth surface craft | specced |
| 03b-C02 | High | Error-recovery copy is clinical, not warm Balencia voice | specced |
| 03b-C03 | Medium | Type line-heights are ad-hoc pixels, not CK-P3 scale | specced |
| 03b-C04 | High | Success state copy is generic ('Success!'), not on-voice | specced |
| 03b-C05 | Medium | Loading and partial states lack microcopy | specced |
| 03b-C06 | Medium | Contrast pairs are asserted, not tabulated | specced |
| 03b-C07 | Medium | Focus-visible ring is not standardized to CK-T03 | specced |
| 03b-C08 | Low | Brand signature moment (continuous-stroke digit entry) is mentioned but not authored… | specced |

> +12 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B01–02 — 03c Consent (content profile · A (90) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S03c-C01-edge-highlight-token-applied | Low | CK-T01 --edge-highlight applied to card top-edge as specified | specced |
| S03c-C02-no-backplate-justified | Low | No --surface-backplate on consent cards (justified by card size <96px) | specced |
| S03c-C03-all-type-steps-locked | Low | All typography follows CK-P3 locked pairings with --leading and --tracking | specced |

### B01–02 — 03d Complete Profile (content profile · B+ (74–77). Thin auth composition with clear hierarchy and warm SIA presence, but generic copy ("We need this to personalize your experience"), no authored edge strings (empty/loading/error), flat input surfaces, and no ownable Balencia moment beyond the inherited logo and SIA avatar. → A++ (95–97). Spec-first premium craft: every string authored to non-shaming SIA voice with the brand period, layered surfaces with glow and edge-highlight on all inputs and the CTA, honest error-recovery copy per the audit integration (skip/defer path pre-SIA per resolved B02-F02), state-craft matrix designed (cold-start, loading, error, success), motion draw-not-fade sequence, ownable SIA coaching moment + continuous-stroke splash from sign-up memory.)

| ID | Severity | Title | Status |
|---|---|---|---|
| 03d-C01 | Medium | Inputs surface depth — layered vs flat (dim 3) | specced |
| 03d-C02 | High | Microcopy voice & non-shaming reframes (dim 11) | specced |
| 03d-C03 | Medium | State craft — error/loading/success designed (dim 7) | specced |

> +8 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B01–02 — 03e WhatsApp Enrollment (content profile · B+ (79) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| 03e-F01 | High | Surfaces lack layered depth (CK-P1 not applied) | specced |
| 03e-F02 | High | Microcopy is unwritten on empty/loading/error states (CK-P5 not applied) | specced |
| 03e-F03 | High | Two phases lack a focal anchor; transition feels disconnected (CK-P2 not applied) | specced |
| 03e-F04 | Medium | Typography is off-scale; not using CK-P3 locked tokens | specced |
| 03e-F05 | Medium | No ownable Balencia moment; generic-looking auth screen (CK-P6, dim 4, dim 14) | specced |
| 03e-F06 | Medium | Color borders don't conform to CONSISTENCY.md; glass border not locked | specced |

> +7 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B01–02 — 04 Sign In (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S04-C01 | Critical | CTA enabled with empty credentials — blocks conversion | specced |
| S04-C02 | Critical | Remember Me defaults to ON — trust/privacy violation | specced |
| S04-C03 | Major | Social auth marks are placeholders — brand-fit gap | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B01–02 — 05 Forgot Password (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| 05-C01-depth-surfaces | High | Add warm-glow layered surfaces (CK-P1) to all interactive elements | specced |
| 05-C02-motion-choreography | High | Design motion choreography for default→confirmation state transition | specced |
| 05-C03-microcopy-states | High | Author microcopy for all edge states: loading, errors, rate-limit, offline | specced |
| 05-C04-token-determinism | Medium | Replace raw hex colors and undefined tokens with canonical CSS variable names | specced |
| 05-C05-accessibility-arialabels | Medium | Add aria-labels to back button and all interactive elements | specced |
| 05-C06-signature-moment | Medium | Establish ownable Balencia signature: scale-in check circle with warm-glow (CK-P4) | specced |

> +6 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B01–02 — 05b Reset Password (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S05b-C01 | Medium | Input fields lack layered depth and edge-highlight | specced |
| S05b-C02 | Medium | Error and success states read generic; no warm-glow signature | specced |
| S05b-C03 | Medium | Error copy is templated and non-specific | specced |
| S05b-C04 | Low | Requirements checklist is a new pattern not yet in CRAFT-KIT.md | specced |

> +1 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B03–04 — 06 Guest Mode Preview (content profile · B+ (78) → A++ (95))

| ID | Severity | Title | Status |
|---|---|---|---|
| S06-C01 | Medium | Domain chip touch targets below 44pt height gate | specced |
| S06-C02 | Medium | Type scale misalignment on heading and CTA | specced |
| S06-C03 | Medium | Soft-prompt and session-end overlay states not yet visually specced | specced |
| S06-C04 | Low | Persistent sign-up banner surface depth treatment inconsistent with demo phase conte… | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B03–04 — 07 SIA Onboarding (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S07-C01 | Medium | ASCII wireframe is stale; needs redraw to show visual brainstorming area with contin… | open (build) |
| S07-C02 | Medium | Domain bubble glow sizes not specified in Components; missing size-calibration per C… | specced |
| S07-C03 | Medium | SIA message bubbles lack `--edge-highlight` and `--surface-backplate`; should be ful… | specced |
| S07-C04 | High | Error/offline/loading state copy is placeholder or missing; SIA dialogue branches un… | specced |
| S07-C05 | High | Input field disabled state (when SIA thinking) lacks copy and visual treatment | specced |
| S07-C06 | Medium | Progress indicator lacks aria-label and grouping; should be single accessibility ele… | specced |
| S07-C07 | Low | Contrast pairs not tabulated; asserted as 'meets AA' but not verified per WCAG 1.4.11 | specced |

> +5 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B03–04 — 08 Initial Plan Summary (data profile · B+ (79) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S08-C01 | High | SIA greeting header prose conflicts with authored microcopy bar | specced |
| S08-C02 | High | Goal-card surfaces lack layered depth (`--edge-highlight`) | specced |
| S08-C03 | Medium | Type line-heights and tracking are ad-hoc pixels, not tokenized | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B03–04 — 41 Schedule / Calendar (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S41-C01 | Medium | Event card depth — accent bars lack premium treatment | specced |
| S41-C02 | Medium | Microcopy on event cards and empty states partly placeholder | specced |
| S41-C03 | Medium | Type inconsistency — line-heights and tracking unspecified | specced |
| S41-C04 | Low | Sync status indicator lacks glyph + word pairing on error | specced |
| S41-A01 | High | Contrast pairs not tabulated — no verified WCAG 1.4.11 on path/nodes/heatmap | specced |
| S41-C05 | Medium | Calendar cell empty state not visually distinct from zero-data | specced |

> +2 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B03–04 — 44 Water Intake (data profile · A− (85) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S44-C01 | Medium | Exclamation marks violate brand voice | specced |
| S44-C02 | Medium | Empty state 0% labeling needs non-shaming reframe | specced |
| S44-C03 | Medium | Motion choreography lacks locked timings and draw-order | specced |

> +2 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B03–04 — 45 Daily Check-in (data profile · B+ (81) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S45-C01 | Medium | Greeting subtext uses interrogative, not brand period | specced |
| S45-C02 | Medium | Intention input placeholder reads generic, not specific | specced |
| S45-C03 | Low | Emotion tag chip names — verify authenticity of word list | specced |
| S45-C04 | High | Modal card surfaces are flat; missing CK-P1 layered depth | specced |
| S45-C05 | Medium | Slider tracks are nearly invisible on ink-900; no beveled recess | specced |
| S45-C06 | High | Type line-heights are ad-hoc pixels; tracking unspecified | specced |
| S45-C07 | Medium | Streak note ('Day 14 of checking in') lacks non-shaming context | specced |
| S45-C08 | Medium | Loading state for mood Sparkline undefined; no skeleton | specced |
| S45-C09 | High | Edge microcopy missing: validation errors, offline, network failure | specced |
| S45-C10 | Medium | Mood emoji accessibility labels inferred; not explicitly stated | specced |

> +6 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B03–04 — 10 SIA Voice In-Chat (content profile · B+ (80) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S10-C01 | Critical | Placeholder-level microcopy across all states | specced |
| S10-C02 | High | Voice panel surfaces lack warm-glow depth language (flat surfaces, no edge-highlight… | specced |
| S10-C03 | High | Waveform visualization lacks draw choreography and warm-glow branding (described as … | specced |
| S10-C04 | High | Error states undefined / degenerate (no copy for transcription failure, no non-shami… | specced |
| S10-C05 | High | Draft transcription bubble lacks state-transition craft (dashed-to-solid border chan… | specced |
| S10-C06 | High | No ownable Balencia signature moment or anti-generic safeguard (reads as generic voi… | specced |
| S10-C07 | Medium | Motion choreography incomplete (no draw-order sequencing, no reduced-motion fallback… | specced |
| S10-C08 | Medium | Typography line-heights + tracking missing (scale is specified but CK-T04 / CK-T05 t… | specced |
| S10-C09 | Medium | Accessibility gaps: colour-alone status signals, missing focus-ring spec, no dynamic… | specced |
| S10-C10 | Low | Voice panel corners not fully specified (states 'top-left, top-right 28pt, 0 bottom'… | specced |

> +12 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B03–04 — 11 SIA Voice Full-Screen (content profile · B+ (76) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S11-C01 | High | Microcopy unwritten on key states (loading, error, permission, idle prompt) | specced |
| S11-C02 | High | Avatar glow dimensioned as neon (200pt radius blur), not calibrated to zone size | specced |
| S11-C03 | High | State craft matrix incomplete—idle, processing, network-error, permission-denied sta… | specced |
| S11-C04 | Medium | Surface depth absent—no top-edge highlight, no avatar backplate, no glow-sizing cali… | specced |
| S11-C05 | Medium | Avatar entrance motion is scale-only (violates 'draw not fade' rule); glow expansion… | specced |
| S11-C06 | Medium | Waveform color attribution not explicit—risks needing text labels that add visual no… | specced |
| S11-C07 | Medium | Transcription text size (15pt in Components) is below the type scale; leading/tracki… | specced |
| S11-C08 | Low | Avatar 2D fallback visual treatment underspecified (mentioned but not designed) | specced |
| S11-C09 | Low | Color-only signal on mute button 'muted' state—missing glyph + label pair | specced |

> +8 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B05–06 — 51 Voice Call History (data profile · B+ (71) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S51-C01 | Major | Microcopy edge cases (empty, loading, error) required authoring | specced |
| S51-C02 | High | All card surfaces must carry warm-glow depth | specced |
| S51-C03 | High | Motion: sentiment Living Lines must draw, not fade | specced |
| S51-C04 | Major | All states must be designed (cold-start, loading, empty, error, offline) | specced |
| S51-C05 | High | Focal hierarchy: Schedule CTA must be primary above-fold focal point | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B05–06 — 74 Conversations Hub (content profile · B+ (76) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S74-C01 | Medium | SIA Hero card surface lacks depth tokens | specced |
| S74-C02 | Medium | SIA Hero missing focal glow | specced |
| S74-C03 | High | Microcopy unwritten on critical edge states (empty, loading, error, offline, search-… | specced |
| S74-C04 | Medium | Typographic line-height and letter-spacing not specified | specced |
| S74-C05 | Medium | SIA card purple accent (25% opacity) reads weak, not earned | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B05–06 — 75 Direct Chat (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S75-C01 | Critical | Unwritten SIA copy and permission clarity | specced |
| S75-C02 | Critical | Flat message-bubble surfaces, no depth language | specced |
| S75-C03 | High | Message states (delivery, read, error, offline) undefined | specced |
| S75-C04 | High | Generic motion (no entrance choreography) | specced |
| S75-C05 | High | Send button undersized and affordance unclear | specced |

> +5 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B05–06 — 76 Group Chat (content profile · B+ (78) → A++ (95))

| ID | Severity | Title | Status |
|---|---|---|---|
| S76-C01 | Critical | SIA messaging copy is unwritten — risk of generic coaching-speak or shame-framing | specced |
| S76-C02 | High | Message card surfaces lack depth specification and glow treatment | specced |
| S76-C03 | High | Edge microcopy (empty, loading, error, offline, member-removal) is unwritten or gene… | specced |
| S76-C04 | High | State-craft matrix is text-only — empty, loading, error, offline states are not desi… | specced |
| S76-C05 | High | No ownable Balencia signature on the chat screen | specced |
| S76-C06 | Medium | Focus rings and keyboard interaction are unspecified | specced |
| S76-C07 | Medium | Fitness-red border on mission card is framed ambiguously — appears as error or warni… | specced |
| S76-C08 | Medium | Contrast pairs for load-bearing elements (message text, SIA text, online dot) are as… | specced |

> +10 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B05–06 — 77 Message Actions (content profile · B+ (78) → A+ (93))

| ID | Severity | Title | Status |
|---|---|---|---|
| S77-C01 | Medium | Focal hierarchy not yet visually designed | specced |
| S77-C02 | Medium | Microcopy on edge states is placeholder or missing | specced |
| S77-C03 | Medium | State craft deferred to pattern library | specced |
| S77-C04 | Low | Motion choreography not choreographed in spec | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B05–06 — 79 Call Summary (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S79-C01 | Medium | ArcGauge center-label glow sizing — prevent neon on 120px element | specced |
| S79-C02 | Major | Schedule-follow-up CTA success state visibility (R06-F01 remediation) | specced |
| S79-C03 | Low | Sentiment label glyph library — establish calm non-alarm visual | specced |

> +2 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B05–06 — 13 Mission Board (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S13-F01 | Medium | Mission card surfaces lack layered depth (missing top-edge highlight) | specced |
| S13-F02 | Medium | Progress ring tracks are flat 2-tone, lack `--track-inset` beveled recess | specced |
| S13-F03 | Low | Stale ASCII wireframe omits board summary band, sparkline, heatmap, depth craft | open (build) |

> +1 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B05–06 — 14 Mission Detail (data profile · A− (85) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S14-C01 | High | Difficulty-hard dot is conveyed by colour alone (red), violating non-shaming and WCA… | specced |
| S14-C02 | High | Surface depth is missing on primary cards (Stats Row, SIA Coaching Note, Next Action… | specced |
| S14-C03 | Medium | Microcopy on edge states (loading, empty, stalled nudge, action success/error recove… | specced |
| S14-C04 | Medium | Type line-heights and letter-spacing are ad-hoc pixels, not tokens | specced |

> +1 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B05–06 — 15 Create / Edit Mission (data profile · A− (85) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S15-C01 | Medium | Natural Language Input type scale ad-hoc (not `CK-T04`) | specced |
| S15-C02 | Medium | Mission Preview `GaugeRing` flat (not depth-upgraded) | specced |
| S15-C03 | Low | Live XP estimate microcopy unwritten | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B05–06 — 59 Streak Details (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S59-C01 | Low | Flame glyph glow size corrected per viz depth pass | specced |
| S59-C02 | Low | Reduced-motion frame for milestone path pulse and recovery active dot clarified | specced |
| S59-C03 | Medium | Freeze 'earn next in N days' copy authored to non-shaming voice | specced |
| S59-C04 | Medium | SIA coaching note for streak-break restart-kindly state authored | specced |
| S59-C05 | Low | Contrast pairs tabulated for all load-bearing elements | specced |
| S59-C06 | Low | Edge microcopy strings for day-1 and error states authored | specced |

> +21 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 73 Mission Journal (data profile · B+ (80) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S73-C01 | Medium | Non-chart surfaces lack layered depth — no --edge-highlight on cards | specced |
| S73-C02 | Medium | Filter state behavior and sub-filter rows undesigned — specified as text-only in Com… | specced |
| S73-C03 | High | SIA summaries unwritten — no authored instances, voice unspecified beyond 'memoir-li… | specced |
| S73-C04 | Medium | Archive note label missing — only 📝 icon shown, no text label for a11y | specced |
| S73-C05 | High | Empty-state and filtered-empty copy placeholder/generic — no authored voice | specced |
| S73-C06 | Medium | Filter chip labels use inconsistent casing/punctuation — unclear if "▾" is a glyph o… | specced |
| S73-C07 | Medium | Loading / error copy missing — no authored message for network fetch failure or time… | specced |
| S73-C08 | Low | Contrast on secondary text asserted but not tabulated — no explicit pairs | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 85 Obstacle Coach (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S85-C01 | Critical | Microcopy voice — all strings must be authored, warm, non-shaming per CK-P5 | specced |
| S85-C02 | High | Focal hierarchy — diagnosis hero must be visually dominant per CK-P2 | specced |
| S85-C03 | High | Surface depth — all cards must be layered (CK-P1), not flat; glow per size-stepped s… | specced |
| S85-C04 | High | Interaction states — blocker accept/dismiss must be semantic controls, not swipe-onl… | specced |
| S85-C05 | High | State craft — every state designed (cold-start, loading, empty, partial, error, offl… | specced |
| S85-C06 | High | Anti-generic — one ownable Balencia moment required (dim 14); non-shaming reframe re… | specced |
| S85-C07 | Medium | Typography — locked scale per CK-P3; weight contrast not size alone; sentence case; … | specced |
| S85-C08 | Medium | Motion choreography — draw-first order (CK-P4): hero fade → compass draw → blockers … | specced |
| S85-C09 | Medium | Accessibility — focus ring (CK-T03), ≥44pt targets, contrast tabulation, colour+glyp… | specced |
| S85-C10 | Medium | Reconnection flow — post-CTA must include choose/edit actions, remind adjust, confir… | specced |
| S85-C11 | Low | Determinism — all craft values must be token-backed (CONSISTENCY.md §8), no floating… | specced |

> +19 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 18 Explore Section (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S18-F01 | Critical | Placeholder copy on 5+ edge strings (search no-results, fallback badge label, Day-1 … | specced |
| S18-F02 | High | No focal point; catalog reads as a flat grid (anti-generic dim 14) | specced |
| S18-F03 | High | Flat module cards (depth dim 3); missing --edge-highlight and warm-glow surfaces | specced |
| S18-F04 | High | Explored-card StatBar preview (S18-V01) un-designed; the spec's own 'Motivation Adap… | specced |
| S18-F05 | High | Micro ConstellationRadar (S18-V02) spec'd but no craft detail; depth/glow/states not… | specced |

> +5 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 20 Personal Wiki (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S20-C01 | Low | ASCII wireframe stale — omits graph/card depth | open (build) |
| S20-C02 | Medium | Confidence bar contrast below 3:1 | specced |
| S20-C03 | Low | Motion timings for confidence bar rise unspecified | specced |

> +1 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 21 Settings (content profile · B+ (78) → A (88))

| ID | Severity | Title | Status |
|---|---|---|---|
| S21-C01 | Medium | Surfaces lack layered depth treatment | specced |
| S21-C02 | High | Microcopy unwritten; edge strings missing | specced |
| S21-C03 | Medium | Toggle switch and row interaction states incomplete | specced |
| S21-C04 | Low | Focus-visible ring and contrast not tabulated | specced |

> +6 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 22 Connected Services (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S22-C01 | Critical | Microcopy gap: OAuth scope preview is missing authored copy | specced |
| S22-C02 | Critical | Permission rationale copy is absent (trust + a11y gap) | specced |
| S22-C03 | High | Disconnect confirmation copy is generic | specced |
| S22-C04 | High | All surfaces lack depth (no --edge-highlight, no glow backplate) | specced |
| S22-C05 | High | Type system is ad-hoc pixels, no CK-P3 token mapping | specced |
| S22-C06 | High | Error-recovery copy is templated, not authored | specced |
| S22-C07 | High | State-craft table is textual, not designed | specced |
| S22-C08 | Major | Contrast pair for green 'Connected' badge below WCAG 1.4.11 threshold | specced |
| S22-C09 | Major | OAuth modal scope items lack visual hierarchy and depth | specced |
| S22-C10 | Medium | Section headers do not use eyebrow recipe | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 23 Subscription & Billing (data profile · B+ (76) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S23-C01 | Medium | CompareGrid focal hero not specced; bespoke feature bullets remain | specced |
| S23-C02 | Critical | Usage bar escalates to amber/red as user approaches limit — alarm-as-upsell dark pat… | specced |
| S23-C03 | High | Payment-recovery microcopy unwritten; failed-payment banner, grace-period countdown,… | specced |
| S23-C04 | High | Surfaces lack layered depth — no edge-highlight, backplate, or shadow tokens specifi… | specced |
| S23-C05 | Medium | Motion unspecified; no draw-order or reduced-motion fallback defined | specced |
| S23-C06 | High | State-craft table missing; cold-start, loading, error, post-upgrade states designed … | specced |
| S23-C07 | Medium | Focus ring and 44pt targets not specified; a11y table absent | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 24 Notification History (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S24-C01 | High | Notification rows lack interaction state design | specced |
| S24-C02 | High | Category-chip filter states and microcopy undesigned | specced |
| S24-C03 | Major | Mark-all-read action states (loading, error, success, disabled) undesigned | specced |
| S24-C04 | Major | Contrast miss on read-state title | specced |

> +2 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 25 Help Center (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| HC-PC-001 | Medium | Microcopy on search result items not authored — generic layout | specced |
| HC-PC-002 | Medium | FAQ loading state undefined — no skeleton or feedback | specced |
| HC-PC-003 | Low | Typography line-heights and tracking not specified — inherits browser defaults | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 49 Progress Photos (data profile · B+ (76) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S49-C01 | Critical | Microcopy unwritten on all edge cases (permission, error, success, disabled, empty) | specced |
| S49-C02 | Critical | No motion choreography on bottom sheet or FAB entrance | specced |
| S49-C03 | High | State-craft matrix missing (loading/empty/error/offline states undefined per CK-P7) | specced |
| S49-C04 | High | Photo timeline is a flat film-strip; Visualization mandates TimelineAgenda drawn path | specced |
| S49-C05 | High | No accessibility cross-check (contrast on timeline nodes, focus rings, color-alone m… | specced |
| S49-C06 | Medium | SIA coaching notes are templated examples, not authored specificity | specced |
| S49-C07 | Medium | Depth on FAB and bottom sheet cards undefined (glows, surfaces, shadows) | specced |
| S49-C08 | Medium | Signature ownable moment not distinct to body progress (generic domain dashboard fee… | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 50 Profile Edit (data profile · B (78) → A++ (95))

| ID | Severity | Title | Status |
|---|---|---|---|
| S50-C01 | High | Flat form input surfaces lack depth (--edge-highlight, --surface-backplate) — missin… | specced |
| S50-C02 | Critical | Microcopy on validation, loading, error, and offline states is unwritten or generic … | specced |
| S50-C03 | High | Profile-completeness MomentumBar integrated into Visualization section but not refle… | specced |
| S50-C04 | High | Type line-heights and letter-spacing are ad-hoc pixels (10pt label floating labels, … | specced |
| S50-C05 | Medium | Contrast pairs asserted ('all text meets WCAG 2.1 AA') but not tabulated — missing 1… | specced |
| S50-C06 | High | Delete Account Confirmation Modal has no designed loading state (spinner) and error … | specced |
| S50-C07 | Medium | Avatar section has no glow and reads as secondary to form fields — violates focal hi… | specced |
| S50-C08 | Medium | Type scale inconsistency: 'change photo' link is 13pt in Components, but should alig… | specced |

> +1 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B07–09 — 71 Achievement Gallery (data profile · D (52) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S71-F01 | Critical | Register violation: "Ask SIA" button on pure-gamification screen | specced |
| S71-F02 | High | No authored microcopy at edges (empty-state banner, loading message, error message, … | specced |
| S71-F03 | High | Gradient/color error on rarity glow: spec says "domain color glow" but should be "ra… | specced |
| S71-F04 | Medium | No motion choreography specified at screen level (entrance draw-order, reduce-motion… | specced |
| S71-F05 | High | No state-craft matrix (cold-start / loading / empty / partial / error all designed) | specced |
| S71-F06 | Medium | Accessibility miss: achievement card labels not tabulated; status risk of colour-alo… | specced |
| S71-F07 | Low | Determinism: floating literals and "e.g." phrasing in specs | specced |
| S71-F08 | Medium | Anti-generic: achievement card grid is a symmetric 2-column wall (generic tell #1 — … | specced |
| S71-F09 | Low | Microcopy: no brand period used intentionally; generic SIA copy risk if SIA appears … | specced |
| S71-F10 | Critical | Depth failure: 32px orange glow on all earned badges (glow-swamp, colour error, size… | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B10–11 — 72 Knowledge Graph (data profile · C (66) → A++ (95))

| ID | Severity | Title | Status |
|---|---|---|---|
| S72-C01 | High | SIA-inferred edge data missing — dashed-purple encoding has no backing in component … | specced |
| S72-C02 | High | Node detail panel shows shared connection blob, not per-node edges — S72-V03 contrad… | specced |
| S72-C03 | High | Strength bar visual encoding missing from detail panel — S72-V03 requires bar below … | specced |
| S72-C04 | Medium | Help Bottom Sheet copy is generic/template — microcopy authored but not warm-voice c… | specced |
| S72-C05 | Medium | Node label typography step undefined — spec states 10pt, CK-P3 has no 10pt step | specced |
| S72-C06 | Medium | Graph controls and legend lack layered depth treatment — flat surfaces | specced |
| S72-C07 | Medium | Legend primitives are text descriptions only — should render live visual samples | specced |
| S72-C08 | Medium | Empty state copy is generic — 'Your knowledge graph is growing' lacks warmth and non… | specced |
| S72-C09 | Medium | Microcopy on controls, buttons, and error states is unwritten — generic or missing | specced |
| S72-C10 | Low | Gesture fallback for zoom gesture-only users — reset button doesn't appear until vie… | specced |

> +5 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B10–11 — 84 Data Sources (data profile · C+ (72) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S84-C01 | High | Microcopy not authored — placeholder states | specced |
| S84-C02 | High | Surface depth language missing — no glow/edge-highlight specification | specced |
| S84-C03 | High | State-craft matrix undefined — 5 states designed nowhere | specced |
| S84-C04 | Medium | Typographic scale not locked — leading/tracking absent | specced |
| S84-C05 | Medium | Source row copy abbreviated ('8m') — not on-voice | specced |
| S84-C06 | Medium | Hero title is a bare label ('Correlation engine') — not a focal statement | specced |

> +8 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B10–11 — 26 Fitness & Workouts (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S26-C01 | High | Focal hierarchy undefined — all cards equally weighted, no hero sized element before… | specced |
| S26-C02 | High | Flat depth on primary surfaces — Today's Workout, SIA note, goal cards lack warm-glo… | specced |
| S26-C03 | High | Microcopy is templated and generic — 'see all', 'WHOOP RECOVERY', Recovery ≥70 colou… | specced |
| S26-C04 | High | States undefined — Day-1, loading, error, offline states deferred to generic pattern… | specced |
| S26-C05 | Major | No ownable Balencia signature — screen reads as generic fitness dashboard (like Stra… | specced |
| S26-C06 | Major | Motion undefined — no choreography, no draw-not-fade rule applied, entrance order un… | specced |
| S26-C07 | Medium | Typography off-scale on some elements — type sizes / weights / line-heights not lock… | specced |
| S26-C08 | Medium | Domain-red identity colour is undefined — fitness-red (#EF4444) may appear on CTAs, … | specced |
| S26-C09 | Medium | Glow sizing not locked — gauges may have uniform glow size (32px on all), risk of ne… | specced |
| S26-C10 | Low | ASCII wireframe shows flat single-tone boxes, not depth-rendered surfaces; stale, do… | open (build) |

> +8 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B10–11 — 27 Workout Detail / Active (data profile · A− (86) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S27-C01 | Medium | Surface depth consistency | specced |
| S27-C02 | Medium | Microcopy edge states | specced |
| S27-C03 | Low | Success feedback depth | specced |
| S27-C04 | Low | Motion choreography clarity | specced |
| S27-C05 | Low | ASCII wireframe staleness | open (build) |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B10–11 — 29 Meal Detail / Food Logger (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S29-C01 | Critical | Microcopy: Food Logging edge states unwritten | specced |
| S29-C02 | High | State craft: Food Logging side missing designed layouts | specced |
| S29-C03 | High | Type rhythm: ad-hoc line-heights not tokenized | specced |
| S29-C04 | Medium | Contrast: tabulated pairs missing for Food Logging inputs | specced |
| S29-C05 | Medium | Focus ring: standardize to CK-T03 token | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B10–11 — 30 Finance / Money Map (data profile · C (66) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S30-C01 | Critical | Focal hierarchy: competing hero claims (SIA note vs KPI strip) | specced |
| S30-C02 | Critical | Over-budget signalling: colour alone (1.4.11 miss) | specced |
| S30-C03 | High | Non-chart surfaces: flat depth (no edge-highlight, no glow) | specced |
| S30-C04 | High | Type: line-heights ad-hoc (unspecified tracking, leading) | specced |
| S30-C05 | Medium | Microcopy: state-edge strings partly unauthored (empty budget, loading, error) | specced |
| S30-C06 | Medium | Contrast: asserted without tabulation (WCAG 1.4.11 pairs missing) | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B10–11 — 31 Transaction / Budget Detail (data profile · C+ (70) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S31-C01 | Critical | Flat surfaces lack top-edge highlight and layered depth (dim 3) | specced |
| S31-C02 | Critical | Over-budget framing is shaming and loss-aversion (dim 6, ethical gate) | specced |
| S31-C03 | High | Empty states and loading states are undesigned (text-only) (dim 7, state craft) | specced |
| S31-C04 | High | Microcopy is partly unwritten (edge strings, affordances, SIA copy) (dim 11) | specced |
| S31-C05 | High | Type scales are ad-hoc pixels, not mapped to locked `CK-P3` scale (dim 13) | specced |
| S31-C06 | High | Recategorize button and Edit Budget modals lack complete interaction states (dim 8, … | specced |
| S31-C07 | Major | Contrast pairs for data-viz elements are asserted but not tabulated (dim 10, WCAG 1.… | specced |

> +7 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B10–11 — 32 Career & Work (data profile · A− (86) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S32-C01 | High | Focal hierarchy ambiguity: SIA note and hero mission gauge both claim visual focus | specced |
| S32-C02 | High | Non-viz surfaces lack layered depth; flat --color-ink-brown-800 cards with no top-ed… | specced |
| S32-C03 | High | Type line-heights and tracking are ad-hoc pixels, not tokenized | specced |
| S32-C04 | High | Optional elements (momentum bar, sparkline, heatmap) have degenerate Day-1 states wi… | specced |
| S32-C05 | High | Contrast pairs asserted, not tabulated; load-bearing vs decorative not distinguished | specced |
| S32-C06 | Medium | Status/urgency sometimes carried by colour alone; deadline 'approaching' has no pair… | specced |
| S32-C07 | Medium | Skill pill components spec contradicts Visualization section's StatBar upgrade | specced |
| S32-C08 | Medium | Microcopy genericity: next-action text, skill empty state, stalled mission lack warm… | specced |
| S32-C09 | Medium | Deadline framing on past-due leaves affordance and SIA context undefined | specced |
| S32-C10 | Medium | Motion choreography draw order not locked to CK-P4 sequence; unclear which elements … | specced |

> +8 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B10–11 — 33 Relationships (data profile · B+ (76) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S33-C01 | High | Non-chart surfaces lack layered warm-glow depth | specced |
| S33-C02 | High | Reach-out framing uses orange text alone (WCAG 1.4.11 colour-alone miss) | specced |
| S33-C03 | High | Edge microcopy (cold-start, loading, error, disabled) unspecified or generic | specced |
| S33-C04 | Medium | Non-shaming reframing: reach-out and deficit language | specced |
| S33-C05 | Medium | Type line-heights and tracking ad-hoc, not tokenized | specced |
| S33-C06 | Medium | State-craft matrix (cold-start, loading, empty, error, offline) verbally designed bu… | specced |

> +20 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B12–13 — 34 Spirituality (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S34-C01 | High | Flat card surfaces lack layered depth and top-edge highlight | specced |
| S34-C02 | High | Type line-heights and tracking are ad-hoc pixels, not locked tokens | specced |
| S34-C03 | Medium | Decorative 6-cell streak modal grid contradicts Visualization section's honest Calen… | specced |
| S34-C04 | Medium | Microcopy on empty / loading / permission states is partly unauthored | specced |
| S34-C05 | Low | Contrast for reading/fasting green-arrival segment below 3:1 threshold | specced |
| S34-C06 | Low | Optional reflection KPI tile (high-motivation tier) is deferred and gated off by def… | specced |

> +5 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B12–13 — 35 Learning & Growth (data profile · A− (86) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S35-C01 | Medium | ASCII wireframe uses stale cyan progress bar reference | open (build) |
| S35-C02 | Low | Library card 'see all' link lacks warmth | specced |
| S35-C03 | Low | Type steps in Typography table should map to CK-P3 locked scale | specced |

> +2 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B12–13 — 36 Creativity (data profile · A− (84) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S36-C01-focal | High | Focal hierarchy: two competing heroes (SIA coaching note vs heatmap) | specced |
| S36-C03-depth | High | Surface depth: all cards lack layered treatment (no edge-highlight, flat boxes) | specced |
| S36-C11-microcopy | High | Microcopy: edge states (loading, empty, error, disabled) are partly unauthored; SIA … | specced |
| S36-C10-a11y-delta | High | Accessibility: KPI trend delta is colour-only ("up 20%" amber text, no ▲ glyph or wi… | specced |
| S36-C02-focal-secondary | Medium | Focal secondary: the one-row "THIS WEEK" heatmap strip is correctly positioned but l… | specced |
| S36-C06-brand-period | Medium | Microcopy: the brand period is not used with intent across all copy | specced |
| S36-C13-type | Medium | Typographic rhythm: line-heights are ad-hoc pixels (e.g., "22pt"), tracking unspecif… | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B12–13 — 70 Exercise Library (data profile · C+ (72) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S70-C01 | High | Difficulty indicator lacks word label (colour-alone violation) | specced |
| S70-C02 | High | Unrated difficulty states rendered as flat zero or guessed level (no-data ≠ zero vio… | specced |
| S70-C03 | High | Card surfaces render flat or underspecced (not layered Warm Surface, missing depth c… | specced |
| S70-C04 | High | Microcopy undefined or placeholder on primary surfaces (empty, error, loading, detai… | specced |
| S70-C05 | Medium | Cold-start and error states underspecced (degenerate or missing visuals) | specced |
| S70-C06 | Medium | Typographic hierarchy and spacing not locked to CONSISTENCY.md tokens | specced |
| S70-C07 | Medium | Motion choreography incomplete (no entry sequence, no reduced-motion fallback) | specced |
| S70-C08 | Low | Generic branding tell: homogeneous 2-column card grid without focal break (anti-gene… | specced |

### B12–13 — 37 Journal (content profile · B+ (79) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S37-C11-001 | Medium | Prompt chip touch target below 44pt (R12-F10 remediation) | specced |
| S37-C11-002 | Medium | Search/edit/delete controls promised but deferred to build (R12-F09 remediation) | specced |
| S37-C03-001 | Low | SIA purple dot contrast below 3:1 WCAG 1.4.11 | specced |

### B12–13 — 38 Habits (data profile · A− (85) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S38-C01 | High | Non-chart surfaces lack layered depth | specced |
| S38-C02 | High | Edge microcopy unwritten (empty states, errors, non-shaming framing) | specced |
| S38-C03 | Medium | Type pairings ad-hoc, leading/tracking unspecified | specced |
| S38-C04 | Medium | Motion choreography timings not locked to CONSISTENCY.md | specced |
| S38-C05 | Low | Contrast pairs on ink-brown-800 asserted, not tabulated | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B12–13 — 39 Leaderboard (data profile · A− (84) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S39-C01 | High | Podium gold #1 rank number contrast below WCAG 1.4.11 (2.1:1 < 3:1) | specced |
| S39-C02 | High | Rank-change delta hardcoded on own-rank card, not reading `rankChange` data field | specced |
| S39-C03 | Medium | Ranked-row rank-change delta missing entirely | specced |
| S39-C04 | Medium | Podium rank numbers (gold/silver/bronze) are colour-alone, missing a visible glyph p… | specced |
| S39-C05 | Medium | Segmented control + filter toggle lack specified interaction states and focus ring s… | specced |
| S39-C06 | High | Non-shaming framing absent on low-rank and slipped-delta scenarios (dark-pattern ris… | specced |
| S39-C07 | Low | State-craft matrix names five states but does not author all edge strings (loading, … | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B12–13 — 40 Community Chat Rooms (content profile · B+ (80) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S40-C01 | Medium | Chat bubbles lack layered depth | specced |
| S40-C02 | Medium | Microcopy is not authored to CK-P5 voice on error/empty/achievement states | specced |
| S40-C03 | High | Motion choreography is not locked to draw-first order | specced |
| S40-C04 | High | State-craft matrix missing (cold-start, loading, empty, error, offline) | specced |
| S40-C05 | Medium | No named ownable Balencia moment | specced |
| S40-C06 | Medium | Contrast pairs asserted generically; accessibility table missing | specced |

> +2 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B12–13 — 42 Celebration Overlay (content profile · B (72) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S42-C11-001 | Critical | Microcopy: SIA congratulatory messages unwritten (dim 11) | specced |
| S42-C03-001 | High | Surface depth: cards lack `CK-P1` specification (dim 3) | specced |
| S42-C04-001 | High | Signature/anti-generic: ownable Balencia moment under-specified (dim 4, dim 14) | specced |
| S42-C07-001 | High | State craft: matrix not designed (dim 7) | specced |
| S42-C09-001 | Medium | Motion choreography: entrance order and timings not fully specified (dim 9) | specced |

> +7 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B12–13 — 43 Paywall / Upgrade (data profile · C+ (72) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S43-C01 | Medium | Modal surfaces lack warm-glow depth language | specced |
| S43-C02 | High | CompareGrid focal cue lacks restraint; no single focal accent specified | specced |
| S43-C03 | High | Microcopy is templated and non-shaming edges are unwritten | specced |
| S43-C04 | High | States (empty, loading, error, offline) are not designed | specced |
| S43-C05 | Medium | Motion choreography is not specified; no draw-first order defined | specced |
| S43-C06 | Medium | Accessibility: CompareGrid cell glyphs need labels to avoid colour-alone status | specced |
| S43-C07 | Low | Drag handle touch target height is 4pt; insufficient for 44pt a11y minimum | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B14–15 — 46 Accountability (data profile · B+ (78) → A− (87))

| ID | Severity | Title | Status |
|---|---|---|---|
| S46-C01 | Medium | Master Consent Banner styled as functional safeguard, not premium craft moment | specced |
| S46-C02 | Medium | Contact Rows and Trigger Rows render without top-edge highlight (flat surfaces on da… | specced |
| S46-C03 | Medium | MomentumBar glow size under-specified; could swamp the 8px bar if using the hero `--… | specced |
| S46-C04 | Medium | Partner/Contract/Trigger lists are dense text-heavy rows without secondary visual rh… | specced |
| S46-C05 | Medium | Violation Alert and permission rationale copy are bare; contract disputes lack warm … | specced |
| S46-C06 | Low | Permission indicator dots (green/orange/red) are colour-only in some contexts; no pa… | specced |

> +7 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B14–15 — 47 Competitions (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S47-C01 | High | Hero banner surface lacks depth highlight and backplate | specced |
| S47-C02 | High | Status indicator is colour-only (● dot without label or glyph) | specced |
| S47-C03 | High | Microcopy is partly unwritten (edge states, invitation badge, loading) | specced |
| S47-C04 | Medium | Type line-heights and tracking are ad-hoc pixels, not tokenized | specced |
| S47-C05 | Medium | Countdown timer displays no time-remaining visualization | specced |
| S47-C06 | Medium | Your rank delta uses colour-only arrows without glyph or window disclosure | specced |
| S47-C07 | Medium | Contrast pairs asserted in Color Map, not tabulated per load-bearing element | specced |
| S47-C08 | Low | No anti-generic ownable moment on the List view (card stack could read as a flat gri… | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B14–15 — 48 Intelligence Dashboard (data profile · A− (85) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S48-C01 | Medium | Non-viz surfaces lack layered depth (CK-T01 top-edge highlight) | specced |
| S48-C02 | High | Focal hierarchy split: contradictions banner and hero ring both claim urgency | specced |
| S48-C03 | High | Edge microcopy partly unwritten (cold-start, loading, error recovery, offline, resol… | specced |
| S48-C04 | Medium | Type line-height and tracking are pixel ad-hoc, not tokenized | specced |
| S48-C05 | Medium | State craft sparse: cold-start lacks warm context; error-red absent for genuine API … | specced |
| S48-C06 | High | Contrast pairs asserted, not tabulated; dismiss chip subminimal (white-50 on ink-bro… | specced |

> +2 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B14–15 — 52 Stress Management (data profile · A− (85) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S52-C01 | Medium | Card surfaces lack --edge-highlight depth cue | specced |
| S52-C02 | Medium | Type scale unmapped to CK-P3 tokens | specced |
| S52-C03 | Medium | Microcopy on empty/loading/error states partly generic | specced |
| S52-C04 | Low | Motion choreography not sequenced in draw-first order | specced |
| S52-C05 | Low | Contrast pairs asserted, not tabulated | specced |

> +5 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B14–15 — 53 Breathing Exercises (data profile · B+ (80) → A++ (95))

| ID | Severity | Title | Status |
|---|---|---|---|
| S53-C01 | High | Exercise and stats cards lack top-edge highlight depth | specced |
| S53-C02 | Medium | Microcopy on edge states is generic placeholder voice | specced |
| S53-C03 | Medium | Type line-heights are ad-hoc pixels, tracking unspecified | specced |
| S53-C04 | High | Post-session CTA and skip link are visually equal-weight | specced |
| S53-C05 | Medium | Non-shaming streak and empty-state framing required | specced |

> +2 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B14–15 — 54 Meditation (data profile · D (52) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S54-C01 | Critical | Active session missing honest progress visualization | specced |
| S54-C02 | Critical | Streak visualization is colour-only (WCAG 1.4.11 miss) | specced |
| S54-C03 | High | Stats and cumulative metrics rendered as bare text, no visual form | specced |
| S54-C04 | Critical | Copy is generic and minimal across the screen | specced |
| S54-C05 | High | No ownable Balencia moment distinct from wellbeing-mode palette | specced |
| S54-F01 | Medium | Active session breathe animation is decorative-only (no progress honesty) | specced |
| S54-V01 | High | Session-progress ring (GaugeRing) needs depth calibration | specced |
| S54-V02 | High | Streak dot row is colour-only and has no long-run signal (heatmap missing) | specced |
| S54-V03 | Medium | Stats tiles are bare text, no visual personality | specced |
| S54-A01 | Medium | Focus ring is missing on interactive elements | specced |
| S54-A02 | Medium | Notification badge on 'Notifications' quick-link is bare orange dot (colour-only) | specced |

> +16 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B14–15 — 55 Yoga Sessions (data profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S55-C01 | Medium | Difficulty badge contrast (beginner/teal on teal bg) below WCAG 1.4.11 threshold | specced |
| S55-C02 | Low | Streak banner ASCII wireframe stale (still shows flat text, omits CalendarHeatmap he… | open (build) |
| S55-C03 | Low | Green milestone marker on heatmap (longest-streak peak) contrast check pending | specced |

> +5 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B14–15 — 56 Recipes (data profile · B+ (77) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S56-C01 | Critical | Flat card surfaces (CK-P1 missing on all primary surfaces) | specced |
| S56-C02 | High | Competing focal points (search bar + grid hierarchy unclear) | specced |
| S56-C03 | High | Microcopy unwritten (edge strings: empty, loading, error, permission, disabled, succ… | specced |
| S56-C04 | High | Type system unspecified (line-heights, tracking, weights ad-hoc, not mapped to CK-T0… | specced |
| S56-C05 | High | State Craft matrix missing (cold-start, loading, empty, error, offline states not de… | specced |
| S56-C06 | High | Recipe card grid is symmetric-card monotony (CK-P6 violation, no focal break) | specced |
| S56-C07 | Medium | Donut ring size-calibration not specified (glow scale ambiguous for micro-Donuts) | specced |
| S56-C08 | Medium | Nutrition-lime (identity-only) vs data-ink color confusion in Donut palette | specced |
| S56-C09 | Medium | Accessibility: Donut contrast + colour-alone risk (WCAG 1.4.11 load-bearing slices) | specced |
| S56-C10 | Low | Motion timing specificity (Donut draw duration aligned with CK-P4 locked timings) | specced |
| S56-C11 | Low | CK-T04/T05 tokens validation (--leading-* and --tracking-* in code) | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B14–15 — 57 Shopping List (content profile · B+ (80) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S57-C01 | High | Focal hierarchy: add input lacks glow and visual emphasis | specced |
| S57-C02 | High | Surfaces are flat with no layered depth or top-edge highlight | specced |
| S57-C03 | High | Empty-state and loading copy is thin and generic | specced |
| S57-C04 | Medium | Swipe-action affordances lack visible text label (colour-alone violation) | specced |
| S57-C05 | Medium | Purchased-item 1.5s delay lacks framing copy | specced |
| S57-C06 | Medium | Type scale and tracking are ad-hoc; not locked to CK-P3 | specced |

> +6 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B14–15 — 58 Sleep Tracking (data profile · A (88) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S58-C01 | Medium | Duplicate React keys on day labels (T, S repeats) — release-readiness blocking | specced |
| S58-C02 | High | Segmented control targets <44pt and duplicated on-screen (R15-F08) — accessibility g… | specced |
| S58-C03 | High | Manual sleep log incomplete — missing bedtime, wake, notes, tags, source capture (R1… | specced |
| S58-C04 | Medium | Recovery status framing — word + colour pairing required for non-shaming and WCAG 1.… | specced |
| S58-C05 | Medium | Consistency score visibility and pairing — add visible assessment word | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 60 Medication Tracking (data profile · B+ (79) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S60-P01 | Medium | Surface depth pass: add --edge-highlight to all card surfaces | specced |
| S60-P02 | High | SIA note and gauge compete for focal role above fold | specced |
| S60-P03 | High | Medication checklist is a flat symmetric list, not composed | specced |
| S60-P04 | Medium | Type pairings use ad-hoc pixels, not locked scale | specced |
| S60-P05 | Critical | Edge microcopy partly unauthored (loading, Day-1, empty states) | specced |
| S60-P06 | High | Contrast pairs asserted, not tabulated; colour-alone misses | specced |
| S60-P07 | High | Teal-as-data-ink on progress bar + heatmap violates 60/30/10 | specced |
| S60-P08 | Medium | No-data ≠ zero not visually distinct in heatmap | specced |
| S60-P09 | Medium | Day-track timeline reads as flat checklist, no temporal gestalt | specced |
| S60-P10 | Low | Privacy notice and warning banner are flat strips, not layered | specced |

> +7 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 61 Reminders & Tasks (data profile · B+ (77) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S61-F01 | Critical | Task and reminder rows are static (not semantic controls) | specced |
| S61-F02 | Critical | Microcopy on empty / loading / error / disabled states is templated or absent | specced |
| S61-F03 | High | Card surfaces lack layered depth (flat `ink-brown-800` fills on `ink-900` background) | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 62 Quick Notes (data profile · B+ (79) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S62-F01 | High | Microcopy craft — edge strings unwritten | specced |
| S62-F02 | High | Surface depth not specified | specced |
| S62-F03 | High | No focal point — quick add bar not visually designed | specced |
| S62-F04 | Medium | Typographic rhythm — no scale or leading specified | specced |
| S62-F05 | Medium | State craft — only text descriptions, not designed layouts | specced |
| S62-F06 | Medium | Motion choreography — bottom sheet entry and Sparkline draw not specified | specced |
| S62-F07 | Low | Anti-generic — note cards risk flat list appearance | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 63 Energy Tracking (data profile · B+ (76) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S63-C01 | High | Focal hierarchy ambiguity: ArcGauge vs Quick Log card both claim visual primacy | specced |
| S63-C02 | High | Flat non-chart surfaces (cards, inputs) lack `--edge-highlight` layered depth | specced |
| S63-C03 | High | Microcopy gap: empty-state, loading, and error states are textual not designed | specced |
| S63-C04 | High | Type leading/tracking ad-hoc pixel values, no token pairing per `CK-P3` | specced |
| S63-C05 | High | Quick Log context chips use wellbeing-teal (domain colour) on a primary action card,… | specced |
| S63-C06 | Medium | State-craft matrix absent: cold-start, loading, empty, error, offline states not des… | specced |
| S63-C07 | Medium | Contrast pairs asserted but not tabulated; green arrival segment (1.4.11) flagged fo… | specced |
| S63-C08 | Low | SIA Insight Card visibility in the Current Energy Display Card component description… | specced |

> +11 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 64 Report / Block (content profile · B+ (76) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S64-C01 | Medium | Motion choreography missing draw-first order | specced |
| S64-C02 | Medium | Sheet surfaces lack layered depth | specced |
| S64-C03 | High | Microcopy on safety-critical flow not authored to brand voice | specced |
| S64-C04 | Medium | State-craft matrix missing designed states | specced |
| S64-C05 | Medium | Contrast pairs asserted, not tabulated | specced |
| S64-C06 | Low | Typography line-heights ad-hoc, not tokenized | specced |

> +4 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 65 Force Update (content profile · A− (85) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S65-C01 | Medium | What's New card lacks layered-depth treatment (`--edge-highlight`) | specced |
| S65-C02 | Medium | CTA button glow not size-calibrated to locked depth table | specced |
| S65-C03 | Medium | Type line-heights and letter-spacing not tokenized to `CK-T04/T05` | specced |
| S65-C04 | Medium | Error state frames the store failure as app error (orange → red risk) | specced |
| S65-C05 | Low | Focus-visible ring not specified as `CK-T03` token | specced |
| S65-C06 | Low | Motion timings not mapped to locked `CK-P4` choreography | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 66 Notification Permission (content profile · B+ (80) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S66-F01 | High | Flat illustration background (no beveled recess or layered context) | specced |
| S66-F02 | High | Benefit row icon backgrounds lack depth (flat 15% tint, no glow on badges) | specced |
| S66-F03 | Medium | Benefit row 1 copy is descriptive but not authored to voice | specced |
| S66-F04 | Medium | Edge microcopy incomplete (loading, error, denied, offline states lack authored stri… | specced |
| S66-F05 | Low | CTA button glow pulse specification lacks size calibration detail | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 67 Image Viewer (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S67-C01 | Low | Comparison mode copy awaits voice authoring | specced |
| S67-C02 | Medium | Encrypted share warning is critical microcopy and required to be authored | specced |
| S67-C03 | Medium | State-craft matrix and edge strings are unspecified in baseline spec | specced |

> +1 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 68 Universal Search (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S68-C03 | Critical | Microcopy not authored — SIA suggestion, edge strings, empty/loading/error states re… | specced |
| S68-C01 | High | Surface depth missing — result rows and cards are flat; no layered warm-glow treatme… | specced |
| S68-C07 | High | State craft undesigned — empty, loading, error, offline, and cold-start states have … | specced |
| S68-C11 | Major | Typographic rhythm unspecified — no tokens or line-heights defined; ad-hoc pixel siz… | specced |
| S68-C14 | High | Anti-generic: flat result list reads templated; no ownable Balencia moment; category… | specced |
| S68-C10 | High | Accessibility: contrast pairs unspecified; focus rings not mentioned; status element… | specced |

> +3 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 69 App Rating (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S69-C01 | High | SIA avatar depth language | specced |
| S69-C02 | High | Bottom sheet surface depth (lack of glow on CTA, lack of layered surfaces) | specced |
| S69-C03 | High | Feedback form disabled-state copy (unwritten) | specced |
| S69-C04 | Medium | "Don't ask again" confirmation message (unwritten) | specced |
| S69-C05 | Medium | Feedback submission error message (generic fallback) | specced |
| S69-C06 | Medium | Focus ring language (ad-hoc, not unified to app token) | specced |
| S69-C07 | Medium | Contrast pairs (asserted, not tabulated) | specced |
| S69-C08 | Medium | Type scale misalignment (15pt subtitle, not real token) | specced |
| S69-C09 | Low | Ownership of 'thank you' exclamation mark (brand period rule) | specced |
| S69-C10 | Low | SIA expression morph not specified in Motion table | specced |

### B16–18 — 78 Reports Center (data profile · A− (84) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S78-C01 | High | Report-builder hero and card surfaces lack layered depth (`--edge-highlight` missing) | specced |
| S78-C02 | Medium | Surface glow on secondary elements (report cards, status pills) unspecified | specced |
| S78-C03 | High | Microcopy on hero and throughout is generic (not SIA report-builder voice) | specced |
| S78-C04 | Medium | Type hierarchy ad-hoc pixels; `--leading-*` and `--tracking-*` unspecified | specced |
| S78-C05 | Medium | State-craft matrix incomplete: loading/empty/partial for 'This Week' and report-prev… | specced |
| S78-C06 | High | Data-confidence layer (S78-V06) has no visual token definitions (confidence chips, g… | specced |
| S78-C07 | High | Contrast pairs asserted, not tabulated; status pills and confidence glyphs colour-on… | specced |
| S78-C08 | Medium | No ownable moment unique to Reports (Living Line, Donut shared across app) | specced |
| S78-C09 | Low | ASCII wireframe stale: shows flat text pills, omits KPI strip visuals, omits report-… | open (build) |

> +7 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 80 Music Coach (content profile · B+ (79) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S80-C01 | High | Player hero card lacks layered depth and size-calibrated glow | specced |
| S80-C02 | High | Edge microcopy (loading, empty, error, permission, disabled, success) is partly unwr… | specced |
| S80-C03 | High | Interaction states (disabled play, loading spinner, success toast, focus ring) are m… | specced |
| S80-C04 | Medium | Contrast pairs and focus ring are asserted, not tabulated in Accessibility section | specced |
| S80-C05 | Medium | SIA matched pill rationale sheet and Spotify OAuth flow are unspecified | specced |

> +2 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 81 Video Library (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S81-P01 | High | Featured video hero lacks focal sizing and depth treatment | specced |
| S81-P02 | Major | Video row copy is generic placeholder; non-shaming microcopy missing across edge sta… | specced |
| S81-P03 | Major | SIA Filtering Note reads generic/template ('filters videos by...') rather than warm … | specced |
| S81-P04 | Major | Empty/loading/error/offline states listed textually, not designed with depth and cra… | specced |
| S81-P05 | High | No type rhythm, leading, or tracking specified; ad-hoc pixel line-heights remain | specced |
| S81-P06 | Major | Card surfaces lack depth treatment; flat appearance contradicts brand premium aesthe… | specced |
| S81-P07 | Medium | Search bar and YouTube CTA have no visible affordances or loading states | specced |
| S81-P08 | Medium | Play button motion (pulse) lacks specification and reduced-motion handling | specced |

> +8 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 82 Accountability Contract (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| 82-C01 | Low | Type line-height missing from Typography table | specced |
| 82-C02 | Low | Verification-check color usage contradicts non-shaming rule | specced |
| 82-C03 | Low | Disabled state copy missing from Sign update button | specced |

> +10 table-level reconciliation(s) flagged — deferred to the final QA pass.

### B16–18 — 83 Social Buddy Profile (content profile · B+ (78) → A++ (96))

| ID | Severity | Title | Status |
|---|---|---|---|
| S83-C01 | High | Focal hierarchy unclear — hero and mission cards compete for visual weight | specced |
| S83-C02 | High | All surfaces flat — no edge-highlight, layered depth, or glow on primary cards | specced |
| S83-C03 | Critical | Microcopy unwritten — all user-facing strings are labels or placeholder-like generic… | specced |
| S83-C04 | High | State craft missing — empty, loading, pending, removed-buddy, and error states undef… | specced |
| S83-C05 | Medium | Card-grid monotony on Shared Missions — equal-height cards (80pt) lack visual rhythm… | specced |
| S83-C06 | High | Progress bars underspecified — no depth/inset/track/contrast — read as flat (dim 3 /… | specced |
| S83-C07 | Medium | Accessibility — avatar tap and mission taps not marked as actionable; unread/new bad… | specced |
| S83-C08 | High | Removed buddy state — message action silently hidden, no warm exit experience (dim 6… | specced |

> +10 table-level reconciliation(s) flagged — deferred to the final QA pass.

## QA lift pass (2026-06-02) — the 4 below-bar screens re-drafted to genuine A++

| Screen | Was | Now | What closed the gap |
|---|---|---|---|
| 02 Motion Carousel | A− (86) | **A++ (95)** | one focal point per panel; authored slide + edge copy with the brand period; all 5 states designed; the continuous-stroke draw made the unmistakable signature; CTA depth + tabulated contrast |
| 21 Settings | A (88) | **A++ (96)** | Account section as the single visual entry point; grouped warm-surface craft; ownable moment; tabulated a11y |
| 46 Accountability | A− (87) | **A++ (96)** | one focal point per tab (no competing anchors); Master Consent Banner elevated to a craft moment; list monotony broken with rhythm, not chrome |
| 77 Message Actions | A+ (93) | **A++ (96)** | CK-P1 layered depth on all sheet surfaces; authored microcopy; full state + interaction matrix |

All four genuinely re-drafted (not relabelled); none flagged a product-decision blocker. Determinism gate clean. **Result: A++ ×90, mean 95.9, 0 below-bar.**
