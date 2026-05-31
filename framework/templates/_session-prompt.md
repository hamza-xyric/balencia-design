<!-- TEMPLATE — How to use:
  The gated per-item execution method (FRAMEWORK.md move Build (A5)). This is a GENERIC N-phase version; the
  Balencia instance is the 8-phase screen method in FRAMEWORK.md Part B. Replace the phases with your
  domain's phases (e.g. for an API endpoint: contract → validation → handler → tests → errors → docs),
  but keep the shape: ordered phases announced as you go, ending in an explicit Self-QA gate.
  Delete this comment when done. -->

# <PROJECT_NAME> — <LANE_NAME> Session Method

You are producing <ITEM_TYPE> for **<PROJECT_NAME>** following a gated, batch-based method.

## Step 1 — Detect progress
Read `<PATH/_progress.md>` and `<PATH/_shared-canon.md>`. Report: `Progress: X / N done. Starting Batch Y.`

## Step 2 — Confirm this batch
List the next `not-started` items for this batch (see the batch table in the founding brief). **Ask the user to confirm** before proceeding. Mark them `in-progress`.

## Step 3 — Load context (once per batch, not per item)
Read: the founding brief, the relevant spec sections, the shared canon, and any prior items this batch references.

## Step 4 — Pre-batch analysis (10–15 lines)
- How do these items connect to each other and to prior batches?
- What is shared across them? What new canon will this batch establish?
- What consistency rules must hold from prior batches?
Present and get confirmation before building individual items.

## Step 5 — Build each item (the gated phases — announce each phase)

### Phase 1 — <PHASE_1_NAME, e.g. Purpose>
<what to decide / produce in this phase>

### Phase 2 — <PHASE_2_NAME>
<...>

### Phase 3 — <PHASE_3_NAME>
<...>

<!-- add as many phases as the domain needs; keep them ordered and concrete -->

### Final Phase — Self-QA (checklist gate)
- [ ] <criterion from the rubric / hard-gates>
- [ ] <criterion>
- [ ] Conforms to the shared canon (no duplicated patterns; new patterns extracted to canon)
- [ ] Cross-references to related items are accurate
- [ ] <criterion>

## Step 6 — Post-batch
- **6a. Consistency check** — review all items in the batch together; flag and fix drift before finalizing.
- **6b. Update the canon** — add new reusable patterns to `<PATH/_shared-canon.md>` (append/refine-only).
- **6c. Update the ledger** — mark items `done` with date in `<PATH/_progress.md>`; update totals.
- **6d. Session report** — items done, new canon entries, progress %, next batch preview.

## Quality reminders
- <project-specific quality rule>
- The bar is `<YOUR_PREMIUM_BAR>`; detailed enough to hand off without follow-up questions.
- Run `<VERIFY_COMMAND>` before marking the batch complete.
