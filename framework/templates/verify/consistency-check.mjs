#!/usr/bin/env node
// TEMPLATE — cross-artifact consistency scan (FRAMEWORK.md move Verify (A6) + traceability C7).
// Unlike a single verify gate, this checks that the SETS line up across artifacts:
//   - every spec has a registry entry, every registry entry has an implementation, etc.
//   - no duplicate shared-canon pattern definitions (canon-governance, §C9)
// Runs with no external services so it can gate a pass before/without MCP or a running app.
// Supports `--json` for machine-readable output. Fill the LOADERS + CHECKS. Delete this note when done.
//
// Usage:  node framework/templates/verify/consistency-check.mjs [--json]

import { readFileSync } from 'node:fs';

const asJson = process.argv.includes('--json');

// ---- LOADERS (point at your real artifacts) ---------------------------------
function loadSet(label, path, extractIds) {
  try {
    return { label, ids: new Set(extractIds(readFileSync(path, 'utf8'))) };
  } catch (e) {
    return { label, ids: new Set(), error: `could not read ${path}: ${e.message}` };
  }
}

// Example extractors — adapt to your formats:
const idsFromMarkdownTable = (txt) =>
  [...txt.matchAll(/^\|\s*([A-Za-z0-9_-]+)\s*\|/gm)].map((m) => m[1]).filter((x) => x !== '#');
const idsFromRegistryJson = (txt) => Object.keys(JSON.parse(txt));

const SPECS    = loadSet('specs',    '<path/_progress.md>',   idsFromMarkdownTable);
const REGISTRY = loadSet('registry', '<path/registry.json>', idsFromRegistryJson);
// -----------------------------------------------------------------------------

// ---- CHECKS -----------------------------------------------------------------
const findings = [];
function expectSubset(aLabel, a, bLabel, b) {
  for (const id of a) if (!b.has(id)) findings.push(`${id}: in ${aLabel} but missing from ${bLabel}`);
}

for (const s of [SPECS, REGISTRY]) if (s.error) findings.push(s.error);
expectSubset('specs', SPECS.ids, 'registry', REGISTRY.ids);
expectSubset('registry', REGISTRY.ids, 'specs', SPECS.ids);
// add: duplicate-canon-pattern check, orphan-implementation check, etc.
// -----------------------------------------------------------------------------

const result = { ok: findings.length === 0, count: findings.length, findings };
if (asJson) {
  console.log(JSON.stringify(result, null, 2));
} else if (result.ok) {
  console.log('✓ consistency-check — all artifacts aligned');
} else {
  console.error(`✗ consistency-check — ${findings.length} mismatch(es):\n` + findings.join('\n'));
}
process.exit(result.ok ? 0 : 1);
