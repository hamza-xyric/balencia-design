# Brief: {BRIEF_ID}

- Status: `draft`
- Opportunity: `CRE-{screen_id}` — see [../registry/opportunities.json](../registry/opportunities.json)
- Screen: {screen_id} — {screen_name}
- Route: `{route}`
- Package: `{package_id}`
- Priority: `{P0|P1|P2|P3}`
- Production batch: `{CP-XX}`

## Placement

_Where on the screen this asset appears (component, region, state)._

## Asset specification

| Field | Value |
| --- | --- |
| Asset type | `photo` \| `illustration` \| `motion-still` \| `motion-loop` \| `video-poster` \| `avatar` \| `badge` \| `icon-set` \| `insight-map` \| `official-mark` |
| Source policy | `official` \| `owned` \| `licensed` \| `generated` \| `generated-with-reference` \| `non-identifiable-demo` |
| License / permission | Official source path, license note, owned production note, or generation provenance |
| Constraints | From registry `constraints[]` — e.g. `no_progress_photo_share_v1`, `guided_insight_map` |
| Aspect ratio | e.g. `1:1`, `9:16`, `16:9` |
| Target dimensions | e.g. 400×400 px @2x |
| States / variants | e.g. idle, listening, error |

## Creative direction

**Must include:**

- Balencia warm dark UI context (`#211008` cards, burnt orange `#FF5E00` accents sparingly)
- Official Balencia logo files only when a mark appears; never generated logos or wordmarks
- _

**Must avoid:**

- Cold clinical stock, gym-bro aesthetic, wellness-influencer look, black photo overlays
- Fake Balencia marks, generated provider marks, fake UI text, text gibberish
- _

## Higgsfield plan

| Field | Value |
| --- | --- |
| Allowed | yes / no (see package and CP-09/CP-10) |
| Tool | `generate_image` \| `generate_video` |
| Model | e.g. `soul_cast`, `marketing_studio_image`, `seedance_2_0` |
| Prompt draft | _Full prompt — use [../prompts/prompt-style-guide.md](../prompts/prompt-style-guide.md)_ |
| Count | 1–4 |
| Reference medias | `media_upload` UUIDs or prior job IDs |
| Preflight credits | `get_cost: true` — credits: _ |

## Variants

| Variant | Job ID | Notes | Selected |
| --- | --- | --- | --- |
| 01 |  |  |  |

## QA

| Dimension | Score (1–5) | Notes |
| --- | --- | --- |
| Brand fit |  |  |
| Placement fit |  |  |
| Trust and sensitivity |  |  |
| Mobile legibility |  |  |
| Package consistency |  |  |
| Production readiness |  |  |
| Source and licensing |  |  |
| Accessibility and motion fallback |  |  |

| Brand gate | Pass |
| --- | --- |
| [../qa/brand-gates.md](../qa/brand-gates.md) |  |

## Export

- Path: `outputs/{package-id}/{brief-id}/`
- Metadata: `outputs/{package-id}/{brief-id}/metadata.json`
- Accepted file:
- Alt text:
- Reduced-motion fallback:
- Integration target: `balencia-screens/public/...` (when approved)

## Decision

`accepted` | `iterate` | `deferred` | `rejected`

**Rationale:**
