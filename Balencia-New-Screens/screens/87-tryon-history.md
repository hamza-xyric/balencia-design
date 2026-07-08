# 87-tryon-history - hi-fi glass spec

### 1. Header
- **ID:** 87
- **Name:** Try-on history
- **Route(s) covered:** /wellbeing/virtual-tryon/history
- **Tab:** Wellbeing
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Batch:** 17

### 2. Purpose
Try-on history shows saved AI looks, source-photo retention, generation provenance, and deletion controls. It is not a gallery for vanity metrics; it is an audit-friendly record of what was created, when, from which photo, and what the member can reuse or remove.

### 3. Entry & exit
- **Entry paths:** Virtual try-on success state, history glyph on /wellbeing/virtual-tryon, Wellbeing hub, image data settings, and direct live route /wellbeing/virtual-tryon/history.
- **Primary exit:** Back returns to the try-on tool or Wellbeing hub with selected filters preserved.
- **Action exits:** `Reuse look` returns to 86 with prompt and image metadata; `Delete look` opens confirmation; `Delete all try-on data` opens privacy sheet; `View source consent` opens ConsentCard detail.
- **Failure exit:** If history sync fails, cached thumbnails remain with stale provenance and a retry path to System states [98].

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with back, title, filter, and delete-all overflow.
2. **Hero GlassCard** summarizing saved looks, oldest retained image, and deletion queue status.
3. **Filter row** for all, saved, generated only, shared, and delete pending.
4. **Look timeline** with thumbnail, outfit/look name, source photo chip, generated timestamp, and action menu.
5. **CIAInsightCard** explaining which saved outfit/look relates to current goals only when provenance is enough.
6. **Privacy footer** with data export, revoke, and delete-all controls.

**ASCII wireframe (390x844):**
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
```

### 5. Components
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

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` background with warm radial glow and 3-4% grain; no decorative color wash over thumbnails.
- **Glass tiering:** hero and CIA card use GlassCard; timeline rows use SolidCard on `#211008` for legibility.
- **Semantic glows:** active saved look and reuse action use `--glow-you #FF5E00`; successful deletion queue completion uses `--glow-done #34A853`; CIA guidance uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal throughout; hero copy can read `Saved *looks*`, with the italic word in Tiempos.
- **60/30/10:** orange for reuse, green for deletion completed, purple for CIA. Thumbnail colors never set the UI palette.

### 7. Content & copy
- **H1:** Saved *looks*
- **Hero labels:** Saved looks; oldest retained photo; deletion queue.
- **Row labels:** Source photo; render confidence; prompt note; shared externally; source deleted.
- **CIA line:** CIA found three saved looks that match your recent style notes.
- **Primary CTA:** Reuse look
- **Secondary CTAs:** Delete look; Restore prompt; Export data; Delete all try-on data
- **Empty copy:** No generated looks yet. Create a preview when you are ready, and history will show retention clearly.
- **Error copy:** History could not sync. Cached looks stay visible with stale provenance.
- **Delete confirmation:** Delete this generated look and its prompt metadata. This cannot be undone.

### 8. Data & honesty states
- **Saved look count:** real = generated asset count plus ChipProvenance; low-confidence = sync stale; honest-null = no saved looks.
- **Source photo status:** real = retained, deleted, or pending delete with timestamp; low-confidence = deletion queue unconfirmed; honest-null = source photo never stored.
- **Render confidence:** real = generation confidence and model timestamp; low-confidence = flagged by scan or incomplete metadata; honest-null = older imported look lacks render data.
- **Sharing state:** real = exported/shared time; low-confidence = OS share sheet opened but completion unknown; honest-null = never shared.
- **CIA recommendation:** real = at least two saved looks plus preference source; low-confidence = one look; honest-null = no look provenance.

### 9. All states
- **Default:** hero counts, filter row, look timeline, CIA card, and privacy footer render with provenance chips.
- **Skeleton:** thumbnail skeletons match row aspect ratios; hero counts shimmer without fake numbers.
- **Empty:** HonestNullState routes to /wellbeing/virtual-tryon and explains no data has been generated.
- **Error:** cached rows remain with OfflineBanner / SyncStatus and retry; delete actions stay available if local identifiers are valid.
- **Success:** reuse opens 86 with prompt loaded; delete flashes `--glow-done` and row moves to delete-pending or disappears.
- **Disabled:** reuse/share/delete controls are 40% opacity with reason when image, consent, sync, or entitlement blocks action.

### 10. Motion & interaction
- **Load:** hero settles first, then timeline rows rise in 40ms stagger.
- **Filter:** segmented tabs crossfade timeline content in 160ms while preserving scroll position.
- **Row actions:** long press or overflow opens Sheet; delete requires confirmation and haptic only after completion.
- **Thumbnails:** tap opens Image Viewer [67] overlay; no autoplay or animated preview in history list.
- **Reduced-motion:** disables row cascade and thumbnail crossfade; delete state changes are instant with text confirmation.

### 11. Motivation-tier adaptation
- **Low:** show hero count, last two looks, and delete/export privacy controls.
- **Medium:** default filters, full timeline, CIA evidence, reuse/delete actions.
- **High:** expose render metadata, prompt diffs, share audit, deletion queue timestamps, and batch delete.

### 12. Accessibility
- **Contrast:** text and chips meet AA+ on `#0A0A0F` and `#211008`.
- **Targets:** thumbnail, overflow, filters, reuse, delete, and export controls are at least 44px.
- **Screen readers:** each row reads look name, source state, render confidence, retention, and available actions.
- **Photo data controls:** revoke, delete one, delete all, export, and source-photo status are present in primary flow.
- **Safety:** sensitive body-image history includes report/support link when a user flags distress or harm.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** route, history, outfit/look records, delete, provenance, and saved asset actions are present.
2. **Honest:** real, low-confidence, and honest-null states cover saved looks, source photos, renders, sharing, and CIA.
3. **Premium:** timeline is media-specific rather than a generic list.
4. **Warm-dark:** glass hero, solid history rows, grain, and warm radial are specified.
5. **Semantic glow:** orange reuse, green delete-complete, purple CIA are explicit.
6. **60/30/10:** generated imagery does not recolor the UI.
7. **Type:** Neue Montreal plus one Tiempos italic moment.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled are included.
9. **Motivation tiers:** density adapts without hiding privacy controls.
10. **Accessibility:** 44px targets, labels, contrast, reduced-motion, and row narration are covered.
11. **Consent:** revoke/delete/export are first-class.
12. **Catalog:** catalog components reused; LookTimelineRow is marked NEW.
13. **CIA voice:** evidenced and consent-aware.

