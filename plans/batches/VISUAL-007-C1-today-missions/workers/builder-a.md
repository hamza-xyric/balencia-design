# builder-a — S13 / S14 / S15 (read builder-common.md first)

Files you own (ONLY these): `src/components/hifi/screens/today/S13MissionBoard.tsx`, `S14MissionDetail.tsx`, `S15CreateEditMission.tsx`.
Ground truth: `evidence/worker-recon-a.md`. Specs: `13-goals-list.md`, `14-goal-detail.md`, `15-create-edit-goal.md`.

## S13 — `data-mission-board-state`: default, skeleton, empty, filtered-empty, error, offline, success

1. Filter system: two native rows — status `SegmentedTabs`-style tablist (Active/Done/All, ≥44px, aria-selected, client-state filtering of the mission list) + type chips (Life/Main/Side/Weekly/Daily/Group — complete taxonomy, interactive Chip with aria-pressed, filtering works; `filtered-empty` state reachable by a real filter combination and via `?state=`).
2. Mission rows: operable — whole row a native button/link opening `/screens/14`; keep completion ring/coloring; add per-row mission-type + registry domain chip. Fix `'Daily'`-as-domain → give Hydrate a real domain (Wellbeing) + type Daily.
3. TopBar: conventional filter glyph (SlidersHorizontal) labelled "Filter"; add journal IconButton (BookOpen, `aria-label="Open mission journal"`, href /screens/73 pattern — use a native link-styled IconButton or wrap in <a>).
4. MetricPill row: add source/freshness line under tiles (e.g. Provenance 'Via missions ledger · synced 2h ago') and honest-null in empty state.
5. States per contract; success = mission completed locally (+XP preview copy, undo).

## S14 — `data-mission-detail-state`: default, empty, low-confidence, offline, stalled, success

1. KPI provenance: raise all 10px text to ≥12px readable tokens; replace "System" with precise sources ('Via missions ledger', 'Via rewards ledger').
2. Domain chips → real navigation links: `aria-label="Open Fitness domain"` href `/screens/16`-style destinations (check src/data/screens.ts for the domain-detail route id — Fitness domain detail screen; if ambiguous use /screens/16 Life Balance overview) — and rename Health → Wellbeing with domain-wellbeing tokens.
3. Streak/XP: keep values but bind copy to rules — streak 6 days shows "1.0× multiplier (7-day tier at +1 day)" style truth per RPG (1.0 <7d); XP row cites 'Via rewards ledger'. No literal contradicting RPG_SYSTEM_DESIGN.md:982.
4. Accordions: make real (client expand/collapse, aria-expanded toggling, content rendered when open).
5. States per contract; stalled = no progress in 9 days coaching variant (spec); success = action checked with +XP preview & undo.

## S15 — `data-mission-editor-state`: default, empty, processing, error, offline, success, invalid

1. Prompt: `GlassPillInput multiline rows={3}` with label; examples become interactive Chips that fill the prompt (client state).
2. One modal exit: `TopBar back={false}` keep single Close X; Close confirms if dirty (local confirm surface, focus-trapped, Escape).
3. Domain chips: interactive with real remove buttons (X as labelled button ≥44px hit via padding, `aria-label="Remove Fitness"`), domain tokens (domain-fitness etc.), Add-domain button opens small local picker (registry names only).
4. Switch + radio group: operable (real state, keyboard, aria-checked); reorder: replace decorative grips with Move up/Move down labelled icon buttons on actions AND milestones (client reorder).
5. CTA: move Create into `bottomAction` (sticky); validity-aware — disabled with visible reason until title + ≥1 action + ≥1 domain; `invalid` state shows the gate; processing/loading uses BtnPrimary loading; success shows BtnSuccess-style confirmation + "Saved in this preview"; offline = queued-locally copy.
6. Un-nest glass: remove outer GlassCard around CIAInsightCard (one CIA surface).
7. Type tabs: full set Life/Main/Side/Weekly/Daily/Group (≥44px, aria-selected). XP estimate keeps 'Estimated · low confidence' but cites 'Via rewards rules'.
8. `empty` state = blank editor (no prefills); keep 125% sanity: bottom CTA must clear home indicator (shell handles).

Verify: `npx tsc --noEmit` clean. Report per output contract.
