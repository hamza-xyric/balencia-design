# 87-tryon-history - A+++ hi-fi mobile spec

## Header
- **Source ID:** 87
- **Source spec:** `Balencia-New-Screens/screens/87-tryon-history.md`
- **Evidence:** screens/87-tryon-history.md, Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Route(s):** `/wellbeing/virtual-tryon/history`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Try-on history shows saved AI looks, source-photo retention, generation provenance, and deletion controls.
- **Premium Visual Director:** make Try-on history hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Try-on history names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <  Try-on history          filter ...|
+--------------------------------------+
| +----------------------------------+ |
| | Saved looks: 7                  | |
| | Oldest photo: 18 days           | |
| | Delete queue: clear             | |
| | via try-on history provenance   | |
| +----------------------------------+ |
| [All] [Saved] [Shared] [Deleting]    |
|                                      |
| May 21                               |
| +----------------------------------+ |
| | [thumb] Linen evening look     ...| |
| | source: upload   render: 82%      | |
| | [Reuse look] [Delete look]        | |
| +----------------------------------+ |
| +----------------------------------+ |
| | [thumb] Workday clean fit     ... | |
| | source deleted   generated kept   | |
| | [Restore prompt] [Delete look]    | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA: your saved neutral palette   | |
| | matches three recent outfit notes | |
| +----------------------------------+ |
| Export data | Delete all try-on data |
+--------------------------------------+

Route handling: `/wellbeing/virtual-tryon/history`
```

## Focal Hierarchy
- **Dominant focal moment:** Try-on history hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with back, title, filter, and delete-all overflow. with CIA only when the source supports a synthesized read.
- **Operational layer:** ASCII wireframe :, H1, Hero labels, Row labels.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*history*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - back, filter, and delete-all overflow actions.
- **GlassStatCard** - hero counts for saved looks, retained source photos, and deletion queue.
- **SegmentedTabs** - history filters with same-route content changes.
- **SolidCard** - timeline rows for generated looks and deletion records.
- **ChipProvenance** - upload, render job, source deleted, exported, and low-confidence tags.
- **Sheet** - filters, row actions, destructive delete, data export, and consent detail.
- **CIAInsightCard** - optional recommendation tied to saved look metadata.
- **BtnPrimary / BtnGhost** - reuse, restore prompt, delete, export.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.
- **NEW: LookTimelineRow** - image-history row combining thumbnail, prompt, source state, render confidence, and privacy action. Rationale: catalog rows do not encode image retention and generation provenance together.

## Data Honesty
- **Saved look count:** real = generated asset count plus ChipProvenance; low-confidence = sync stale; honest-null = no saved looks.
- **Source photo status:** real = retained, deleted, or pending delete with timestamp; low-confidence = deletion queue unconfirmed; honest-null = source photo never stored.
- **Render confidence:** real = generation confidence and model timestamp; low-confidence = flagged by scan or incomplete metadata; honest-null = older imported look lacks render data.
- **Sharing state:** real = exported/shared time; low-confidence = OS share sheet opened but completion unknown; honest-null = never shared.
- **CIA recommendation:** real = at least two saved looks plus preference source; low-confidence = one look; honest-null = no look provenance.

## Consent and Safety
- Try-on history names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Try-on history treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wellbeing/virtual-tryon/history`. Do not add alternate vanity routes.

## States
- **Default:** hero counts, filter row, look timeline, CIA card, and privacy footer render with provenance chips.
- **Skeleton:** thumbnail skeletons match row aspect ratios; hero counts shimmer without fake numbers.
- **Empty:** HonestNullState routes to /wellbeing/virtual-tryon and explains no data has been generated.
- **Error:** cached rows remain with OfflineBanner / SyncStatus and retry; delete actions stay available if local identifiers are valid.
- **Success:** reuse opens 86 with prompt loaded; delete flashes `--glow-done` and row moves to delete-pending or disappears.
- **Disabled:** reuse/share/delete controls are 40% opacity with reason when image, consent, sync, or entitlement blocks action.

## Motion
- **Load:** hero settles first, then timeline rows rise in 40ms stagger.
- **Filter:** segmented tabs crossfade timeline content in 160ms while preserving scroll position.
- **Row actions:** long press or overflow opens Sheet; delete requires confirmation and haptic only after completion.
- **Thumbnails:** tap opens Image Viewer [67] overlay; no autoplay or animated preview in history list.
- **Reduced-motion:** disables row cascade and thumbnail crossfade; delete state changes are instant with text confirmation.

## Image Slots
- `HIFI-87-01` - content proof or instructional media slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: Try-on history privacy-safe try-on imagery, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wellbeing/virtual-tryon/history`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** text and chips meet AA+ on `#0A0A0F` and `#211008`.; **Targets:** thumbnail, overflow, filters, reuse, delete, and export controls are at least 44px.; **Screen readers:** each row reads look name, source state, render confidence, retention, and available actions.
