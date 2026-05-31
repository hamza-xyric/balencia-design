<!-- TEMPLATE — How to use:
  A per-work-item brief (FRAMEWORK.md move Build (A5), artifact taxonomy C10). One per discrete unit of work
  (an asset, a feature, an endpoint, a research sub-question). Generalized from a creative-asset brief —
  swap the "Asset specification" section for your domain's spec. Keep the QA + gate + decision blocks.
  Delete this comment when done. -->

# Brief: <BRIEF_ID>

- Status: `draft` | `in-progress` | `done`
- Source / opportunity: `<ID>` — see `<registry path>`
- Item: `<item id>` — `<item name>`
- Batch: `<batch id>`
- Priority: `P0` | `P1` | `P2` | `P3`

## Goal / placement
_What this item is for, and where it lives in the larger system._

## Specification

| Field | Value |
|-------|-------|
| Type | `<type>` |
| Source policy | `<owned | generated | licensed | …>` |
| Constraints | `<from registry / canon>` |
| Acceptance target | `<exact target — dims, contract, definition of correct>` |
| Variants / states | `<list>` |

## Direction

**Must include:** <required elements>
**Must avoid:** <prohibited elements — link the hard-gates file>

## Plan (tool / approach)

| Field | Value |
|-------|-------|
| Tool / approach | `<how it'll be produced>` |
| Preflight | `<cost / dry-run check before committing>` |
| References | `<inputs the model needs>` |

## QA (score against the rubric)

| Dimension | Score | Notes |
|-----------|-------|-------|
| <dim> |  |  |
| <dim> |  |  |

| Hard gate | Pass? |
|-----------|-------|
| `<hard-gates.md>` |  |

## Provenance / export
- Output path: `<path>`
- Metadata: `<path/metadata.json>` (source, license, job-id, prompt-hash, alt-text, integration-path)
- Integration target: `<where it gets used>` (when accepted)

## Decision
`accepted` | `iterate` | `deferred` | `rejected` — **Rationale:** <why>
