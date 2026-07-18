# builder-d — S73 / S97 (read builder-common.md first)

Files you own (ONLY these): `src/components/hifi/screens/today/S73MissionJournal.tsx`, `S97PlansLibrary.tsx`.
Ground truth: `evidence/worker-recon-d.md`. Specs: `73-mission-journal.md`, `97-plans-library.md`.

## S73 — `data-journal-state`: default, skeleton, empty, filtered-empty, error, offline

1. Copy truth: reconcile "12 weeks · 1,200 XP" vs "Six weeks of discipline" — one duration (pick 12 weeks; body copy "Twelve weeks of discipline. Your fund is real now.").
2. Summary sourcing: split the single 'Via missions ledger' — Completed 'Via missions ledger', XP 'Via rewards ledger', Pivots 'Via missions ledger'. Per-tile Provenance or a combined precise line.
3. Media honesty (asset disposition = honest-null, NO new slot/raster): replace fake photo tiles with an explicit private-media state — card copy "2 progress photos · hidden in this preview" + labelled "Show example placeholder"-free honest-null tile (dashed, ImageOff icon, text "Photo hidden · private"), plus per-photo Hide/Delete actions: Delete opens local confirm naming exact target ("Delete week 2 photo?") with equal Cancel + undo (`73-photo-delete-confirm.png`); `73-media-hidden.png` = photos hidden state.
4. Storage claim: rephrase to prototype-truthful: "In this prototype, journal media is fixture-only. In the product, photos stay on your device unless you export them." Or simpler honest scope line; must not overclaim.
5. Filters already native — wire them to actually filter entries (client state; `filtered-empty` reachable).
6. States per contract; error/offline honest with retry.

## S97 — `data-plans-state`: default, skeleton, empty, error, offline, success

1. Plan rows operable: whole-row native buttons (open detail preview status locally) + per-row overflow menu (labelled IconButton → local action sheet, focus-trapped: Edit, Pause, Stop, Archive, Delete, Export, Share, Revoke CIA memory — the full 8; destructive ones confirm naming exact plan + undo; `97-plan-actions.png` = menu open on Strength reset; `97-archive-confirm.png` = archive confirm).
2. Premium gate: replace ad-hoc overlay with canonical `PaywallLock` from kit (import from `@/components/hifi/kit`) — value visible beneath, ≥44px unlock action, equal "Not now" exit.
3. Controls section: keep global pause/export/revoke; update SectionTitle meta to match actual affordances.
4. Per-plan provenance: add freshness/scope to saved rows ("Saved by you · 3d ago", "Via CIA · from sleep + training plan").
5. States per contract; success = plan action applied locally (+undo).
6. Keep ethical bar: Dismiss visible, no coercion, active-plan path preserved.

Verify: `npx tsc --noEmit` clean. Report per output contract.
