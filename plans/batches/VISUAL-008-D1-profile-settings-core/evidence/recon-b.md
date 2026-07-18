# D1-RECON-B — Luna read-only reconciliation evidence

- Scope: S22, S23, S24
- Method: static code/spec/audit reconciliation only; no edits, browser, service, or git mutation
- Runtime model intent: Luna `scope_scout`, medium; exact thread attestation covered by `W-MODEL`

## Shared inventory

- All three modules are static server components with no state/query/root contract.
- Shared Back/nav are now native and labelled; the audit root is stale but runtime must still be verified.
- Generic `PrototypeActionSheet` is unsuitable because it does not bind `HifiShell.overlay` and drops state queries on close; D1 needs local purpose-specific overlays.
- **Sol override:** visible coach name stays `CIA` under DVF-07. Lowercase recommendations from the July 10 audit/scout are void.

## S22 findings

- Current roster is 9 cards, while accepted screen contract is exactly 11.
- WHOOP is simultaneously connected/fresh/retrying; Fitbit is pending without retry truth.
- WHOOP consent labels are display chips and omit Category; all screen-local actions are inert.
- Force sync and route action are 36px; Notify only looks disabled; visible `Route: /calendar/connected` leaks implementation copy; bare spinner ignores reduced motion.
- Save transaction is unspecified; basic connection management is free and does not require a paywall.

Sol roster freeze: exactly 11 providers, preserving all current live-code entries and adding two repaired-authority wearables: WHOOP, Apple Health, Fitbit, Garmin, Oura Ring, Samsung Health, MyFitnessPal, Cronometer, Lumen, Google Calendar, Spotify. Group totals are 6+3+1+1. Strava/Nutritionix remain outside this prototype roster because the repaired sources are arithmetically contradictory and current live code wins the minimal tie.

Sol entitlement disposition: no `PaywallLock` on connection management; the functional brief makes basic integrations free. Deep comparison insight is out of S22 scope.

Required repair: atomic per-provider status, exact eight controls, scope preview and disconnect confirmation with equal exits, ≥44px actions, true disabled reason, reduced-motion static progress, no route copy, local state matrix. Remove global Save and use immediate local-preview outcomes.

Recommended captures: `22-default`, `22-skeleton`, `22-unconnected`, `22-error-fitbit`, `22-success-whoop`, `22-disabled-garmin`, `22-offline`, `22-provider-controls`, `22-connect-consent`, `22-disconnect-confirm`, `22-reduced-motion`.

## S23 findings

- `filled={80}` on ten ticks clamps to 10/10 although visible copy says 800/1,000; accessible label announces renewal instead of usage.
- Update and two credit actions are 36px; plan cards/selection are noninteractive; comparison is a div grid with unlabeled glyphs.
- Plan, price, renewal, credits, matrix, payment, and history lack their required provenance/null/stale variants.
- Billing/downgrade/cancel actions are inert; default rail omits Category/Scope/Freshness.
- Only one payment-failed/default frame exists.

Required repair: `filled={8}`/10 with exact `800 of 1,000 used` name and separate renewal; semantic table with row/column headers and Included/Not included text; four operable plan actions/current state; billing provenance; ≥44px controls; equal-exit update/cancel flows; exact eight contextual controls; full fixture matrix.

Recommended captures: `23-default`, `23-skeleton`, `23-empty-free`, `23-error`, `23-success`, `23-disabled`, `23-offline`, `23-payment-final-day`, `23-payment-post-grace`, `23-compare-table`, `23-cancel-confirm`, `23-reduced-motion`.

## S24 findings

- `SectionTitle` receives markup as a string, visibly leaking `<span className=...>`.
- Current chart totals 31, category chips total 6, and forbidden `Check-ins 0` is shown without scope reconciliation.
- Summary chips are spans; row overflow is nested inside row buttons; all rows and Mark all read are inert.
- Dense history uses glass; controls/archive/delete/export/undo do not exist; chart name/provenance are generic/absent.
- Sleep uses Fitness token; Social uses undefined `domain-social`.

Sol data freeze: seven-day series `[1,0,2,1,0,1,1]` totals 6; categories `CIA 3`, `Reminders 2`, `Social 1`; render six notifications under the same 7-day fixture. Omit zero categories. Sleep uses `domain-sleep`; Social maps to defined `domain-relationships` while remaining visibly labelled Social.

Required repair: safe React heading; native pressed filters and result status; independent row and overflow actions; solid ledger; exact eight Notification Controls; mark-read/undo; coherent 7-day chart/list/category scope and Notifications API provenance; full state/reduced-motion matrix.

Recommended captures: `24-default`, `24-skeleton`, `24-empty`, `24-sparse`, `24-error`, `24-success`, `24-disabled`, `24-offline`, `24-filter-cia`, `24-row-menu`, `24-controls`, `24-reduced-motion`.

## Shared-boundary decisions

- Do not modify `SectionTitle`, `ChargeMeter`, `HifiShell`, generic action sheet, consent constants, globals, or chrome.
- Compose S24 heading locally; call existing `ChargeMeter` with `filled={8}` and exact label; use local exact eight-control arrays and local overlays.

Worker output is evidence only; Sol independently reconciles it into the frozen matrix.
