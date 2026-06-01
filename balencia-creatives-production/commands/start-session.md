# Start creative production session

## 1. Pick batch

Open the active file in `batches/` (e.g. `CP-01-onboarding-signature.md`). Confirm status is not `session-closed`.

## 2. Check gates

Read `decisions/creative-decisions.md`. If the batch lists a blocking CQ, stop and ask the user unless they waive the gate.

## 3. Scope briefs

Select **up to 6** briefs from the batch checklist. Copy `briefs/_brief-template.md` to `briefs/{brief-id}.md` for each.

## 4. Context load

- [../registry/opportunities.json](../registry/opportunities.json) rows for those screens
- [../prompts/prompt-style-guide.md](../prompts/prompt-style-guide.md)
- [../../Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md](../../Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md)
- Live route in `balencia-screens` if comparing placement

## 5. Prototype (optional)

```bash
cd balencia-screens
npm run dev
```

Open `http://localhost:3000` + route for placement validation.

## 6. Preflight (CP-00 or first gen session)

Follow [higgsfield-preflight.md](higgsfield-preflight.md) before submitting jobs.

## 7. Update batch

Set batch status to `in_progress` and list selected brief IDs in session summary.
