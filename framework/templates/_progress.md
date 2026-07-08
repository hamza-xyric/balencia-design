<!-- TEMPLATE — How to use:
  Durable progress ledger (FRAMEWORK.md Persist). A fresh session should reconstruct phase, active root,
  completed batches, blockers, verification evidence, and next batch from this file. Delete this comment when done. -->

# <PROJECT_NAME> — Progress Ledger

- Last updated: <YYYY-MM-DD>
- Current phase: <phase>
- Active app/root: `<path>`
- Current lane: <lane>
- Completed batches: <X> / <N>
- Current batch: <ID or "none">
- Next batch: <ID + one-line scope>
- Handoff status: <READY | READY WITH WAIVERS | BLOCKED>

## Do Not Assume

- <warning future agents must not assume, e.g. archived docs are active>
- <warning>

## Item Status

| ID | Item | Source | File / locator | Status | Batch | Owner | Last evidence |
|----|------|--------|----------------|--------|-------|-------|---------------|
| 01 | <item name> | `<active source>` | `<path>` | not-started | B01 | <owner> | — |
| 02 | <item name> | `<active source>` | `<path>` | in-progress | B01 | <owner> | `<evidence>` |
| 03 | <item name> | `<active source>` | `<path>` | done | B01 | <owner> | `<verify/log>` |

## Batch Reference

| Batch | Status | Items | Theme | Verify evidence | Closed date |
|-------|--------|-------|-------|-----------------|-------------|
| B01 | in-progress | <range/list> | <theme> | `<command/result>` | — |
| B02 | planned | <range/list> | <theme> | — | — |

## Current Blockers

| ID | Severity | Owner | Blocked work | Next action | Closure condition |
|----|----------|-------|--------------|-------------|-------------------|
| <B-001> | <critical/major/minor> | <owner> | <work> | <action> | <condition> |

## Verification Evidence

| Date | Command / check | Result | Evidence | Notes |
|------|-----------------|--------|----------|-------|
| <YYYY-MM-DD> | `<command>` | <pass/fail/skipped> | `<path/summary>` | <notes> |

## Stale-Doc Warnings

| Doc | Warning | Source of truth | Action |
|-----|---------|-----------------|--------|
| `<path>` | <why stale/suspect> | `<winning source>` | <fix/log/ignore with reason> |

## Gap-Audit / Remediation Log

- **<YYYY-MM-DD> — <audit name>**: compared <implementation/source> against <authoritative source>; found <N> gaps; created/updated items <list>. Evidence: `<path>`.
