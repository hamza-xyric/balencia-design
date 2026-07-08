# 25-help-center - A+++ hi-fi mobile spec

## Header
- **Source ID:** 25
- **Source spec:** `Balencia-New-Screens/screens/25-help-center.md`
- **Evidence:** screens/25-help-center.md, app_design 3/25-help-center.md plus ascii_wireframes/25-help-center.md
- **Route(s):** `/help`, `/help/[slug]`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Help center provides search, article categories, article detail, CIA help handoff, and contact support escalation.
- **Premium Visual Director:** make Help center command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Help center uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <  Help center                       |
+--------------------------------------+
| [ Search help topics              ]  |
|                                      |
| +----------------------------------+ |
| | Ask CIA                          | |
| | Get instant answers from your    | |
| | coach. CIA knows Balencia help.  | |
| | [Ask CIA]                        | |
| +----------------------------------+ |
|                                      |
| FAQ                                  |
| +----------------------------------+ |
| | Getting started               >  | |
| | CIA and AI coach              >  | |
| | Goals and tracking            >  | |
| | Billing and subscription      >  | |
| | Privacy and data              >  | |
| | Troubleshooting               >  | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Still need help? Contact support | |
| +----------------------------------+ |
+--------------------------------------+

Route handling: `/help`, `/help/[slug]`
```

## Focal Hierarchy
- **Dominant focal moment:** Help center command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** SearchOverlay / search field for help topics and articles. with CIA only when the source supports a synthesized read.
- **Operational layer:** Ask CIA GlassCard as the focal help path., ASCII wireframe :, H1, Search placeholder.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*center*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - title, back, and support status.
- **SearchOverlay** - focused help search with grouped article results.
- **GlassCard** - Ask CIA focal card.
- **ListRow** - category rows, article rows, related article links.
- **SolidCard** - FAQ group and contact support card.
- **CIAInsightCard** - optional article-help explanation inside coach handoff.
- **BtnPrimary / BtnSecondary / BtnGhost** - Ask CIA, Contact support, open article.
- **ChipProvenance** - article updated date, support status, search source.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

## Data Honesty
- **Search results:** real = indexed article matches plus ChipProvenance; low-confidence = partial index; honest-null = no matches.
- **Article content:** real = title, body, updated date; low-confidence = stale article; honest-null = missing article route with support fallback.
- **Support status:** real = submitted/open/closed ticket; low-confidence = support service delayed; honest-null = no ticket.
- **CIA handoff:** real = help topic passed with user consent; low-confidence = query only; honest-null = opens blank help context.
- **Contact copy:** real = current SLA if available; low-confidence = service degraded; honest-null = no promised response time.

## Consent and Safety
- Help center uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/help`, `/help/[slug]`. Do not add alternate vanity routes.

## States
- **Default:** search, Ask CIA card, FAQ categories, contact support, and route-ready article links.
- **Skeleton:** search remains live; article/category rows shimmer with exact heights.
- **Empty:** HonestNullState for no search results with Ask CIA and Contact support.
- **Error:** categories and contact card remain; failed search or article explains retry path.
- **Success:** support request submitted or article opened; success uses `--glow-done` and provenance.
- **Disabled:** Ask CIA, search, or contact dims to 40% with reason when offline, signed-out restriction, or support outage applies.

## Motion
- **Load:** search appears first, Ask CIA card fades next, FAQ rows stagger 40ms.
- **Search:** focused SearchOverlay replaces FAQ group with results; clear restores categories.
- **Article:** /help/[slug] pushes with title-on-scroll header and related links.
- **Contact:** support request opens Sheet and preserves typed issue on failure.
- **Reduced-motion:** disables row stagger and card lift.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/help`, `/help/[slug]`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** text/controls clear AA+ on dark and solid surfaces.; **Targets:** search, clear, category rows, article links, Ask CIA, and Contact support are 44px minimum.; **Screen readers:** article rows announce title, category, updated date, and route; search results announce count.
