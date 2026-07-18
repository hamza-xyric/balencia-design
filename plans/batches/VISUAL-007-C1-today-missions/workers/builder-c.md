# builder-c — S59 / S61 (read builder-common.md first)

Files you own (ONLY these): `src/components/hifi/screens/today/S59StreakDetails.tsx`, `S61RemindersTasks.tsx`.
Ground truth: `evidence/worker-recon-c.md`. Specs: `59-streak-details.md`, `61-reminders-tasks.md`. RPG authority: `RPG_SYSTEM_DESIGN.md:982` (1.0 <7d / 1.5 7–29d / 2.0 30+d, cap 2.0×) and §2.7 :280-281 (recovery 1.3× next active day after deliberate rest/freeze; stacks; caps 2.0× total).

## S59 — `data-streak-state`: default, skeleton, empty, error, offline, success

1. **RPG truth (highest priority):** at 42-day streak the ArcGauge shows `2.0x` with copy "Max multiplier · reached at 30 days"; NO "Next 2.0x at 60 days". Derive from a small local rule table mirroring RPG:982 (comment citing RPG_SYSTEM_DESIGN.md:982) — value computed from streak length, not a bare literal.
2. **Recovery:** replace "Unlocks at 50 days" lock card with truthful explanation: "Recovery multiplier · 1.3× XP on your next active day after a deliberate rest day. Stacks with your streak, capped at 2.0× total." Cite 'Via rewards rules'. NO lock icon — it is not premium and not locked.
3. **Milestones lock treatment:** milestones that are progression-gated show explicit unlock condition text ("Unlocks at 90 days") with a non-premium progression style (muted card + ProgressionIcon), NOT PaywallLock (no monetization here). Remove ad-hoc Lock glyph usage that implies paywall.
4. **Freeze flow:** "Use freeze" → eligibility line ("2 freezes available · earned monthly"), tap opens local confirm dialog (focus-trapped, Escape, names effect: "Freeze protects tonight only. Your 42-day streak continues.") → confirm = `freeze-used` local state (1 available left, calendar tonight shows snowflake, undo affordance) → undo = `freeze-undone`. Screenshots 59-freeze-confirm/used/undone.
5. States per contract: empty = no streak yet (day 0 coaching, no shame); success = post-freeze confirmation; error/offline honest.
6. ArcGauge now has role="img" from kit — pass accurate label/value ("Current XP multiplier 2.0x").

## S61 — `data-reminders-state`: default, skeleton, empty, error, offline, success

1. TaskRow checkbox: native `<button role=... >`? NO — use a real native control: `<button type="button" aria-pressed>` is acceptable for toggle, but prefer native semantics: render an actual `<input type="checkbox">` visually styled (or button with aria-checked + full keyboard). Must toggle client state: open→done shows pending tick then done (+undo in status region: 61-task-toggled/61-task-undone).
2. ReminderRow switch: native `<button role="switch" aria-checked onClick onKeyDown>` toggling client state (61-reminder-toggled).
3. Completed contrast: remove container `opacity-55`; completed title = `text-paper-100/70` + line-through + green check (≥4.5:1 on surface).
4. Domain labels: Health→Wellbeing, Fit→Fitness (tokens already correct).
5. Roll-up truth: render all 4 reminders (3 on, 1 off) so "3 of 4 on" matches the visible list.
6. Counts language: use "Missions" where the roll-up references mission-linked reminders (keep 'Via schedule + missions').
7. States per contract; success = all tasks complete celebration (green, no shame framing); pending/error on toggle in offline state ("Queued locally").

Verify: `npx tsc --noEmit` clean. Report per output contract.
