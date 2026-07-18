# Worker evidence — recon-b (screens 41/44/45)

- Executed: 2026-07-11 · Provenance: Claude Fable-native subagent (GLM 429 recorded in BATCH.md) · Read-only, no edits
- Fable adjudication: accepted as ground truth for builder-b packet

## S41 Schedule

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 41.1 | Timeline in first viewport | STILL-OPEN | Timeline is section 5 of 6 (:166-212) below tablist :58-70, week strip :72-84, summary :86-122, CIA card :124-138, unscheduled :140-164 |
| 41.2 | Native ≥44px tabs | FIXED-ALREADY | :58-69 role=tab in h-11 tablist; residual: no roving tabindex |
| 41.3 | Native date controls | STILL-OPEN | :72-84 single role=img wrapper; day cells div/span, inoperable |
| 41.4 | Operable events + reorder | STILL-OPEN (partial) | Unscheduled rows div :143-162; drag spans not focusable :149-161; events inert :174-196; only Reschedule native :205 |
| 41.5 | Two time populations | STILL-OPEN | Donut "2h 15m Scheduled" :90-107 vs "4h 30m of 16h" :114-116 unreconciled |
| 41.6 | Calendar/wake evidence | PARTIAL | Provenance on summary :108,:119 + event :181; CIAInsightCard :124-138 has NO provenance prop |
| 41.7 | CIA casing | FIXED / DVF-07 | :126, :190 |
| 41.8 | Manage connection/consent | FIXED-ALREADY | :46-48 native manage button min-h-11; ConsentRail :218 |
| 41.9 | Missed-event no-shame | FIXED-ALREADY | :198-208 |

Registry conflict: :154 `bg-domain-learning` + "Learning" — NOT in ten-domain registry (legacy token globals.css:48). States: default only (comment :19-24 lists overpacked/cold-start/stale-offline/revoked unrendered). No CalendarStrip/TimelineGrid/EventCard kit primitives exist — screen-local components acceptable.

## S44 Water intake

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 44.1 | Quick Log operable | FIXED-ALREADY | chrome.tsx:125-137 Link; S44:39 href |
| 44.2 | Quick-add operable | FIXED-ALREADY | :93-123 four native min-h-11 buttons |
| 44.3 | ≥44px visible delete + confirm/undo | STILL-OPEN | :140-146 h-9 w-9 (36px), opacity-0 until hover/focus; no confirmation/undo anywhere |
| 44.4 | Source/freshness on risk claim | STILL-OPEN | :209 "Context: today's run" generic; no freshness; wording unproportioned :221 |
| 44.5 | Pending/offline/success | PARTIAL | Pending chip :138 via synced:false :31; no offline banner/success/disabled |
| 44.6 | Sub-floor type | STILL-OPEN | 10px white/45 chart labels :178, stats :191-203, 11px footnote :182 |
| 44.7 | Health source/consent | FIXED-ALREADY | :58-70 source button; consent dl :224-243; ConsentRail :244; non-medical :245 |
| 44.8 | Weekly honest-null | FIXED-ALREADY | null Wed :22; dashed column :169-171; summary names gap :160,:182-184 |

Fixtures: weeklyIntake :22, targets :24-25, todaysLog :27-32, hero 5/8/1250ml/63% :56,:74-84 (math coherent), stats :192-203. No registry conflict. States: default + inline pending + honest-null.

## S45 Daily check-in

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 45.1 | Native sliders | FIXED-ALREADY | :95-109 input type=range, aria-valuetext, h-11, peer-focus-visible; instances :193-194 |
| 45.2 | Native reflection | PARTIAL | GlassPillInput native input :199-202 but single-line; spec 45:88 multiline — KIT CHANGE |
| 45.3 | Context + dismiss | STILL-OPEN (partial) | DomainTag interactive buttons work :47-57,:183-184; "Not now" is span :211 |
| 45.4 | ≥44px domain toggles | FIXED-ALREADY | :53 min-h-11 interactive |
| 45.5 | Validity-aware Save | PARTIAL | bottomAction BtnPrimary :124 persistent; no disabled/validity/loading/success wiring; mood pre-selected :116 |
| 45.6 | Safety + data controls | PARTIAL | SafetyCard operable :234 (system.tsx:15-27); NO ConsentRail rendered — mood/stress revoke/delete missing |
| 45.7 | One passive orb | STILL-OPEN | Two idle CIAPresenceOrb :132 (32px) + :141 (48px), neither decorative (cia-orb.tsx:39-40) |
| 45.8 | Evidence/confidence detail | FIXED-ALREADY (partial) | :207 provenance, :220-229 confidence meter, See-the-pattern BtnSecondary :210 |
| 45.9 | Native mood picker | FIXED-ALREADY | :163-177 aria-pressed buttons min-h-11 |
| 45.10 | CIA casing | FIXED | kit aria "CIA presence" |

Fixtures: moodCells :18-24, defaults :116-117, sliders 7/4 :193-194; domains career/fitness/wellbeing registry-valid. States: default with live client interactivity; skeleton/empty/error/offline/success/disabled unrendered.

## Kit ledger

| Kit target | Needed by | Nature |
|---|---|---|
| glass-pill-input multiline variant | 45.2 (+15) | KIT (Fable) |
| CalendarStrip/Timeline primitives | 41.1/3/4 | screen-local new components OK |
| Confirm/undo | 44.3 | use existing PrototypeActionSheet pattern or screen-local dialog |
| Orb dedupe/ConsentRail wiring/CIA provenance/delete size/Save validity | 45.7/45.6/41.6/44.3/45.5 | screen-local |

Stale audit claims void: FloatingQuickLog, GlassPillInput nativity, CIAPresenceOrb labels, SafetyCard, Chip/ConsentRail, chart role=img primitives.
