# 84-data-sources - A+++ hi-fi mobile spec

## Header
- **Source ID:** 84
- **Source spec:** `Balencia-New-Screens/screens/84-data-sources.md`
- **Evidence:** screens/84-data-sources.md, work/briefs/84.md, work/drafts/84.md, Balencia integrations layer + CIA correlation engine
- **Route(s):** No live route; provider-neutral data sources hub opened from Connected Services, Intelligence, Knowledge Graph, or Me settings.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Establish trust by exposing connection health and provenance.
- **Premium Visual Director:** make Data sources hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Data sources names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
[ 390x844 Native Frame ]
+-----------------------------------------+
| ####### (Warm Orange Atmosphere) ####### |
|  Back                       Data sources| <- TopBar
|                                         |
| +-------------------------------------+ |
| | Correlation engine                 (| | <- Hero GlassCard
| | Every source becomes a *signal*,   (| |    (Purple CIA Glow)
| | not clutter.                       (| |
| | |Live sources| |Patterns detected| (| |
| |  2 active      3 detected         (| |
| +-------------------------------------+ |
|                                         |
| CONNECTED SOURCES                       |
| +-------------------------------------+ |
| |  WHOOP           Healthy    8m ago  | | <- SolidCard
| |   Recovery, Strain     [via WHOOP]   | |    (Orange Glow)
| +-------------------------------------+ |
| |  Spotify         Needs att... Reconn| | <- SolidCard Error
| |   Music context        [sync failed] | |    (Green Recovery Glow)
| +-------------------------------------+ |
|                                         |
| DETECTED CORRELATIONS                   |
| +-------------------------------------+ |
| | Sleep affects tempo pace            | | <- SolidCard
| | [Sleep] -> [Music]                   | |
| | #### reinforcing              | |
| | based on 14 synced days of WHOOP... | |
| +-------------------------------------+ |
| | Calendar density stress             | |
| | [Work] -> [Wellbeing]                | |
| | ## competing                | |
| | early signal - based on 5 days      | |
| +-------------------------------------+ |
|                                         |
| +-------------------------------------+ |
| |  Unhealthy sources are checked...  | | <- GlassCard
| +-------------------------------------+ |
|                                         |
|        (Connect source BtnPrimary)      |
|         (Today  CIA  Goals  Me)      |
+-----------------------------------------+

Route handling: No live route; provider-neutral data sources hub opened from Connected Services, Intelligence, Knowledge Graph, or Me settings.
```

## Focal Hierarchy
- **Dominant focal moment:** Data sources hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere & Top Bar. with CIA only when the source supports a synthesized read.
- **Operational layer:** Correlation Engine ., Connected Sources ., Detected Correlations ., Source Health Note ..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*sources*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** (Transparent over atmosphere).
- **GlassCard** (Hero & Health Note).
- **SolidCard** (Sources & Correlations - data density beats atmosphere).
- **KPIRow** (Live sources & patterns detected).
- **ListRow** (WHOOP & Spotify health rows).
- **NEW: CorrelationRow** (Wraps domain tags, purple strength bar, and confidence meter into a SolidCard. One-line rationale: standardizes NxN matrix data into a compliant, scrollable mobile format without breaking 44px touch targets).
- **ChipProvenance** & **ChipDomainTag**.
- **BtnPrimary** (Connect source).
- **GlassNavBar**.

## Data Honesty
- Every metric mapped to 3 states:
- **Metric: Live sources**
- - *Real:* "2 active" (Provenance: `integrations layer`)
- - *Low-confidence:* N/A (count is strictly binary/factual)
- - *Honest-null:* "0 live sources" (`estimated  low confidence` hidden)
- **Metric: Detected patterns**
- - *Real:* "3 detected" (Provenance: `LIFE_CORRELATION_MATRIX.md`)
- - *Low-confidence:* "Early signal" (Provenance: `based on 5 days`)
- - *Honest-null:* "Connect your first source to begin analyzing patterns."
- **Metric: Sync timestamp**

## Consent and Safety
- Data sources names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default**: Live data rendering with provenance chips.
- **Skeleton**: Shimmer blocks (`--surface-3` base, 1.2s sweep) match matrix and row geometry. Axes render as ghost lines.
- **Empty (Cold Start)**: Hero invites connection. Matrix renders as ghosted dashed cells. No purple `glow-cia` present.
- **Error (Failed Sync)**: Failed source explicitly named. Copy provides action ("Couldn't load Spotify health check - pull to refresh"). Error glyphs are paper-64%, absolutely no red text.
- **Success**: Brief green flash (BtnSuccess logic) on the refresh icon. Auto-dismiss 2.5s.
- **Disabled**: CTA locked at 40% opacity if no OAuth providers are available.

## Motion
- **Physical easing**: Standard iOS spring `spring(stiffness: 300, damping: 30)`.
- **Feedback**: Tap scale `.98` on ListRows and Cards (150ms).
- **Glow behavior**: `--glow-cia` breathes (4s ease) only when patterns are actively displaying. Remains static if 0 patterns exist.
- **Matrix draw**: Purple correlation strength bars physically rise (transform scaleX) from left to right over 250ms on viewport entry.
- **Haptics**: Light impact on successful manual refresh.
- **Reduced motion**: All draws scale to 100% instantly. Glows cease breathing. Matrix cells cross-fade instantly without horizontal scaling.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; provider-neutral data sources hub opened from Connected Services, Intelligence, Knowledge Graph, or Me settings..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ Contrast**: Text strictly uses paper-100 (#FEFAF3) or paper-64% on dark warm surfaces. No paper-40% for essential copy.; **Targets**: All ListRows, matrix cells, and the back button exceed 44x44px minimum touch targets.; **Screen-reader**: Glyph-only status icons (Healthy, Needs attention) have `aria-labels` (e.g., "Connection healthy", "Connection requires attention").
