<!-- TEMPLATE — How to use:
  The durable batch deliverable (FRAMEWORK.md move Plan & Slice (A4), taxonomy C10). THE batch file IS the deliverable —
  not a thin status table plus notes elsewhere. Every item gets a full compiled section here before the
  batch closes. The completion gate at the bottom is what makes a batch "closed". Delete this comment when
  done. -->

# <BATCH_ID> — <Batch title>

- Status: `not started` | `in progress` | `reviewed` | `closed`
- Theme: <theme>
- Session cap: <N items> (see FRAMEWORK.md §C4 sizing)
- Reviewed date / URL / evidence path: <…>
- Build gate this batch? <yes (every 3rd + foundation) / no — run check always>

## Batch summary
- Ship-ready: <items>
- Must-fix: <items>
- Redesign / rework candidates: <items>
- Open questions for the user: <items>

## Item checklist
| Item | Locator | Status |
|------|---------|--------|
| <item> | `<locator>` | not_started |

## Item notes (one full section per item, in flow order)

### <item id> — <item name>
- First impression / five-second read: <…>
- Primary action / purpose clarity: <…>
- Evidence (screenshot / output path): `<path>`

| Dimension | Score | Notes |
|-----------|-------|-------|
| <dim> |  |  |

| Findings | Severity | Category | Evidence | Recommendation | Status |
|----------|----------|----------|----------|----------------|--------|
| <finding or "No major findings"> |  |  |  |  |  |

**Decision:** ship-ready | must-fix | rework | needs-user-decision

## Completion gate (before status `closed`)
- [ ] Every worked item has a full notes + scores section in THIS file
- [ ] `<PATH/findings-ledger.md>` updated for all findings
- [ ] `<PATH/_progress.md>` updated
- [ ] Verify command run and result recorded: `<VERIFY_COMMAND>` → <result>
- [ ] Deferred items + open questions listed in the summary
