#!/usr/bin/env node
/**
 * consistency-check.mjs — cheap, MCP-free pre-pass for the Figma DS audit.
 *
 * Reconciles the three sources of truth that drift apart between sessions:
 *   1. balencia-screens/scripts/figma-components-map.json  (build inventory; figma_node_id marks "built")
 *   2. figma-mapping.json                                  (ds_components / ds_variables / styles index)
 *   3. balencia-screens/src/app/globals.css                (canonical design tokens)
 *      + balencia-screens/scripts/figma-tokens-map.json    (CSS-var -> Figma-variable map)
 *
 * It does NOT touch Figma. It tells the auditor (human or skill) what to trust and
 * where the docs lie before any MCP read happens.
 *
 * Usage:
 *   node figma-build-audit/scripts/consistency-check.mjs            # human-readable report
 *   node figma-build-audit/scripts/consistency-check.mjs --json     # machine-readable for the skill
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..'); // repo root (figma-build-audit/scripts -> repo root)

const PATHS = {
  componentsMap: resolve(ROOT, 'balencia-screens/scripts/figma-components-map.json'),
  tokensMap: resolve(ROOT, 'balencia-screens/scripts/figma-tokens-map.json'),
  mapping: resolve(ROOT, 'figma-mapping.json'),
  globalsCss: resolve(ROOT, 'balencia-screens/src/app/globals.css'),
};

const JSON_OUT = process.argv.includes('--json');

function loadJson(p) {
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch (err) {
    console.error(`FATAL: could not read/parse ${p}\n  ${err.message}`);
    process.exit(2);
  }
}

function loadText(p) {
  try {
    return readFileSync(p, 'utf8');
  } catch (err) {
    console.error(`FATAL: could not read ${p}\n  ${err.message}`);
    process.exit(2);
  }
}

// ---------------------------------------------------------------------------
// Load
// ---------------------------------------------------------------------------
const componentsMap = loadJson(PATHS.componentsMap);
const tokensMap = loadJson(PATHS.tokensMap);
const mapping = loadJson(PATHS.mapping);
const css = loadText(PATHS.globalsCss);

const components = componentsMap.components || {};
const excluded = componentsMap.excluded_from_figma || {};
const dsComponents = mapping.ds_components || {};

// ---------------------------------------------------------------------------
// 1. Component build status (from figma-components-map.json)
// ---------------------------------------------------------------------------
const byPhase = {};
const builtNames = [];
const unbuiltByPhase = {};

for (const [name, def] of Object.entries(components)) {
  const phase = def.phase || 'unknown';
  byPhase[phase] ??= { total: 0, built: 0 };
  byPhase[phase].total++;
  if (def.figma_node_id) {
    byPhase[phase].built++;
    builtNames.push(name);
  } else {
    (unbuiltByPhase[phase] ??= []).push(name);
  }
}

const totalComponents = Object.keys(components).length;
const totalBuilt = builtNames.length;

// ---------------------------------------------------------------------------
// 2. Drift: components-map (built) vs figma-mapping.ds_components
// ---------------------------------------------------------------------------
const dsComponentNames = Object.keys(dsComponents).filter((k) => !k.startsWith('$'));
const builtSet = new Set(builtNames);
const dsSet = new Set(dsComponentNames);

// In ds_components index but NOT marked built in the components-map
const inIndexNotBuilt = dsComponentNames.filter((n) => !builtSet.has(n));
// Marked built in components-map but missing from the ds_components index
const builtNotIndexed = builtNames.filter((n) => !dsSet.has(n));

// ---------------------------------------------------------------------------
// 3. Token coverage: globals.css vs figma-tokens-map.json
// ---------------------------------------------------------------------------
const cssVars = [
  ...new Set(
    [...css.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map((m) => m[1]),
  ),
].sort();

const mappedCssVars = new Set();
for (const coll of Object.values(tokensMap.collections || {})) {
  for (const v of Object.values(coll.variables || {})) {
    if (v.css_var) mappedCssVars.add(v.css_var);
  }
}
const unmappedRaw = cssVars.filter((v) => !mappedCssVars.has(v));

// Type tokens are represented as text styles, shadow/glow as effect styles — not
// variable gaps. Separate those from genuinely-unmapped tokens so the signal is clean.
const isTypeToken = (v) => /^--(text|font)-/.test(v);
const isEffectToken = (v) => /^--(shadow|glow)-/.test(v);
const cssVarsAsTextStyle = unmappedRaw.filter(isTypeToken);
const cssVarsAsEffectStyle = unmappedRaw.filter(isEffectToken);
const cssVarsNotMapped = unmappedRaw.filter((v) => !isTypeToken(v) && !isEffectToken(v));

// css_var entries in the token-map that are not real `--*` custom properties
// (e.g. inline rgba alpha-whites pointing at themselves) — these are tints with no
// canonical token, the structural cause of per-component alpha-white leakage.
const tokenMapNonVarEntries = [...mappedCssVars].filter((v) => !/^--/.test(v));
const mappedNotInCss = [...mappedCssVars].filter((v) => /^--/.test(v) && !cssVars.includes(v));

// ---------------------------------------------------------------------------
// 4. Foundations index counts (figma-mapping.json)
// ---------------------------------------------------------------------------
function countVars(dsVars) {
  let n = 0;
  for (const [k, coll] of Object.entries(dsVars || {})) {
    if (k.startsWith('$')) continue;
    if (coll && typeof coll === 'object') n += Object.keys(coll).filter((x) => !x.startsWith('$')).length;
  }
  return n;
}
const dsVarCount = countVars(mapping.ds_variables);
const textStyleCount = Object.keys(mapping.ds_text_styles || {}).filter((k) => !k.startsWith('$')).length;
const effectStyleCount = Object.keys(mapping.ds_effect_styles || {}).filter((k) => !k.startsWith('$')).length;
const iconCount = Object.keys(mapping.ds_icons || {}).filter((k) => !k.startsWith('$')).length;
const screensBuilt = Object.keys(mapping.screens_frames || {}).filter((k) => !k.startsWith('$')).length;

// ---------------------------------------------------------------------------
// Assemble result
// ---------------------------------------------------------------------------
const result = {
  generated_for: 'figma-build-audit',
  totals: {
    components_in_map: totalComponents,
    components_built: totalBuilt,
    components_excluded: Object.keys(excluded).length,
    ds_components_indexed: dsComponentNames.length,
    ds_variables_indexed: dsVarCount,
    text_styles_indexed: textStyleCount,
    effect_styles_indexed: effectStyleCount,
    icons_indexed: iconCount,
    css_tokens: cssVars.length,
    css_tokens_mapped: mappedCssVars.size,
    screens_built: screensBuilt,
  },
  by_phase: byPhase,
  unbuilt_by_phase: unbuiltByPhase,
  drift: {
    in_index_not_built: inIndexNotBuilt,
    built_not_indexed: builtNotIndexed,
    css_tokens_not_mapped: cssVarsNotMapped,
    css_tokens_as_text_style: cssVarsAsTextStyle,
    css_tokens_as_effect_style: cssVarsAsEffectStyle,
    token_map_non_var_entries: tokenMapNonVarEntries,
    mapped_tokens_not_in_css: mappedNotInCss,
  },
};

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------
if (JSON_OUT) {
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  process.exit(0);
}

const C = { dim: '\x1b[2m', red: '\x1b[31m', yel: '\x1b[33m', grn: '\x1b[32m', cyn: '\x1b[36m', rst: '\x1b[0m', bold: '\x1b[1m' };
const h = (s) => `\n${C.bold}${C.cyn}${s}${C.rst}`;
const ok = (s) => `${C.grn}✓${C.rst} ${s}`;
const warn = (s) => `${C.yel}▲${C.rst} ${s}`;
const bad = (s) => `${C.red}✗${C.rst} ${s}`;

console.log(`${C.bold}Balencia Figma DS — Consistency Pre-Pass${C.rst} ${C.dim}(MCP-free)${C.rst}`);

console.log(h('Component build status'));
console.log(`  ${totalBuilt} / ${totalComponents} components marked built (figma_node_id present); ${result.totals.components_excluded} excluded.`);
for (const [phase, { total, built }] of Object.entries(byPhase).sort()) {
  const line = `  ${phase.padEnd(14)} ${built}/${total}`;
  console.log(built === total ? ok(line) : warn(line));
}
for (const [phase, names] of Object.entries(unbuiltByPhase)) {
  console.log(`    ${C.dim}pending ${phase}:${C.rst} ${names.join(', ')}`);
}

console.log(h('Foundations index (figma-mapping.json)'));
console.log(`  variables: ${dsVarCount}   text styles: ${textStyleCount}   effect styles: ${effectStyleCount}   icons: ${iconCount}`);
console.log(`  screens built: ${screensBuilt} ${C.dim}(97 expected at completion)${C.rst}`);

console.log(h('Drift — figma-mapping.ds_components vs components-map (built)'));
if (!inIndexNotBuilt.length && !builtNotIndexed.length) {
  console.log(ok('the two indexes agree.'));
} else {
  if (inIndexNotBuilt.length) console.log(warn(`indexed in ds_components but NOT marked built in components-map: ${inIndexNotBuilt.join(', ')}`));
  if (builtNotIndexed.length) console.log(bad(`marked built in components-map but MISSING from ds_components index: ${builtNotIndexed.join(', ')}`));
  console.log(`  ${C.dim}→ reconcile before trusting either count. The live Figma file is the tiebreaker (audit verifies via MCP).${C.rst}`);
}

console.log(h('Token coverage — globals.css vs figma-tokens-map.json'));
console.log(`  ${cssVarsAsTextStyle.length} type tokens → text styles, ${cssVarsAsEffectStyle.length} shadow/glow → effect styles ${C.dim}(expected; not variable gaps)${C.rst}`);
if (cssVarsNotMapped.length) console.log(bad(`CSS tokens with NO Figma representation (true gap): ${cssVarsNotMapped.join(', ')}`));
else console.log(ok('every non-type/effect globals.css token maps to a Figma variable.'));
if (tokenMapNonVarEntries.length) console.log(bad(`token-map has ${tokenMapNonVarEntries.length} self-referential non-token entries (tints with NO canonical token → per-component leakage): ${tokenMapNonVarEntries.join(', ')}`));
if (mappedNotInCss.length) console.log(bad(`token-map references --vars no longer in globals.css: ${mappedNotInCss.join(', ')}`));

console.log(h('Verdict'));
const issues = inIndexNotBuilt.length + builtNotIndexed.length + cssVarsNotMapped.length + tokenMapNonVarEntries.length + mappedNotInCss.length;
if (issues === 0) console.log(ok('docs are internally consistent. Proceed to the MCP audit.'));
else console.log(warn(`${issues} doc-level discrepancy group(s). Note them in REPORT.md "Naming & Organization" and reconcile against the live file.`));
console.log('');
