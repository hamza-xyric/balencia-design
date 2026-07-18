# builder-b — S41 / S44 / S45 (read builder-common.md first)

Files you own (ONLY these): `src/components/hifi/screens/today/S41ScheduleCalendar.tsx`, `S44WaterIntake.tsx`, `S45DailyCheckin.tsx`.
Ground truth: `evidence/worker-recon-b.md`. Specs: `41-schedule-calendar.md`, `44-water-intake.md`, `45-daily-checkin.md`.

## S41 — `data-schedule-state`: default, overpacked, cold-start, stale-offline, revoked, skeleton

1. Hierarchy: timeline with the current/next event must appear in the first 844px. Order: tabs → date strip → compact "Now / next" timeline section → summary card → unscheduled → CIA suggestion. Trim summary card height as needed.
2. Date strip: native — each day a real button (≥44px, aria-pressed/aria-current for today, client-selected day changes a "Viewing <day>" status line; `41-day-selected.png` proof).
3. Unscheduled rows + events: operable buttons; replace decorative grips with Move up/down labelled buttons (client reorder for unscheduled list).
4. Time populations: reconcile — donut card keeps "2h 15m · Scheduled focus (Career + Fitness)" and fullness meter relabelled "4h 30m of 16h waking window · includes routines" with one sentence explaining the difference, or unify numbers. Each figure labelled with its population.
5. CIAInsightCard: add `provenance={['Via Google Calendar + wake window']}`.
6. Fix registry violation: "Learning" block → registry domain (Career or Productivity) with matching token.
7. Tabs: add roving-arrow keyboard nav if trivial; otherwise ensure tab-key order sane. States per contract (cold-start = consent-first connect view; revoked = calendar access revoked truth; stale-offline = last-sync banner).

## S44 — `data-water-state`: default, skeleton, empty, error, offline, success

1. Delete: always-visible ≥44px labelled delete button per entry; tap → local confirm naming exact target ("Delete 250 ml · 2:15 pm?") with equal Cancel; confirm → row removed + undo affordance in status region (`44-delete-confirm.png`, `44-delete-undone.png`).
2. Risk claim: CIAInsightCard provenance → `['Via Strava run · today 7:05 am', 'Window: last 24h']`; soften body to proportionate non-diagnostic wording.
3. Type floor: raise 10px/11px semantic labels to ≥12px with ≥AA tokens (text-paper-100/65 minimum on stats; keep decorative axis labels non-semantic if truly decorative — otherwise raise).
4. States per contract; success = goal reached (8/8, ring flips green per ProgressRing contract); offline = entries queue locally with pending chips; error = sync failed with retry.
5. Quick-add `44-quick-add.png`: pressing 250ml adds a local entry (client state) updating hero math.

## S45 — `data-checkin-state`: default, skeleton, empty, error, offline, success, invalid

1. One orb: keep hero orb (48px), remove header orb; pass `decorative` to the remaining orb if spec 45 §138 requires SR-hidden (it does) — orb decorative, heading carries meaning.
2. "Not now" → native button (dismiss action: local status "Check-in dismissed for today · undo").
3. ConsentRail: add (`<ConsentRail compact />`) + mood/stress data scope line (source 'You logged', retention, revoke/delete via rail).
4. Save gating: `invalid` state = no mood selected (make default mood-unselected ONLY in invalid fixture; keep default state pre-selected as today) — Save disabled with visible reason; success = BtnSuccess/confirmation + local-only copy; error = save-failed retry; offline = "Saved locally · syncs later".
5. Reflection: `GlassPillInput multiline rows={3}`.
6. `45-context-added.png` = extra domain toggled; `45-dismissed.png` = after Not-now undo affordance visible.

Verify: `npx tsc --noEmit` clean. Report per output contract.
