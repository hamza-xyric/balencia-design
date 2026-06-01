# Creative outputs

Exported assets land here after Higgsfield jobs complete and pass QA.

## Layout

```
outputs/<package-id>/<asset-id>/
  variant-01.png
  variant-02.png
  metadata.json
```

## Metadata schema

Every accepted asset must have metadata in `outputs/<package-id>/<asset-id>/metadata.json` before integration. Draft/generated variants may omit it until they are candidates for acceptance.

```json
{
  "brief_id": "CRE-00-example",
  "asset_type": "photo | illustration | motion-still | motion-loop | video-poster | avatar | badge | icon-set | insight-map | official-mark",
  "route": "/example",
  "screen": "00 - Example",
  "placement": "Component or state where the asset appears",
  "source": "official | owned | licensed | generated | generated-with-reference | non-identifiable-demo",
  "license_or_permission": "Official brand asset, owned production, license note, or generation terms",
  "job_id": "Higgsfield job id or null",
  "model": "model id or null",
  "prompt_hash_or_note": "short hash or provenance note",
  "aspect_ratio": "9:16",
  "dimensions": "768x1376",
  "accepted_variant": "variant-01.png",
  "alt_text": "Short accessible description",
  "reduced_motion_fallback": "variant-01.png or null",
  "integration_path": "balencia-screens/public/creatives/..."
}
```

## Git

Binary files are gitignored. Only document accepted paths in `ledger/accepted-assets.md` and brief files.

## Integration

Copy or symlink accepted finals into `../balencia-screens/public/` only after user approval and a documented path in the accepted-assets ledger.
