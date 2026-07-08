#!/usr/bin/env node
// portability-check.mjs — dogfoods Forgeflow's verify discipline (FRAMEWORK.md move A6).
//
// Scans a target project (or the shipped starter payload) for the things that would make
// a copied framework "a map without territory":
//   1. Required Claude + Codex starter files exist.
//   2. Shared runbooks exist for every shipped workflow.
//   3. START-HERE.md names every shipped workflow.
//   4. No unfilled placeholder tokens remain in committed markdown artifacts or starter files.
//   5. Any present handoff has the required operational sections.
//   6. Docs do not point only to the legacy .claude/plans handoff path.
//
// Usage:
//   node framework/verify/portability-check.mjs [target-dir]
//     target-dir defaults to "." (the current project root, after starter activation).
//   Check the shipped payload directly:
//     node framework/verify/portability-check.mjs framework/starter
//
// Exit codes: 0 = all checks passed · 1 = one or more findings · 2 = bad usage.

import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const target = process.argv[2] ?? '.';

if (!existsSync(target) || !statSync(target).isDirectory()) {
  console.error(`✖ portability-check: target directory not found: ${target}`);
  process.exit(2);
}

const WORKFLOWS = [
  'onboard',
  'adopt-existing-project',
  'upgrade-framework',
  'handoff',
  'start-handoff',
  'start-batch',
  'pre-development-check',
  'runtime-profiles',
  'close-batch',
  'audit-docs',
  'plan-story',
  'create-work-items',
  'verify',
  'wiki-ingest',
  'wiki-query',
  'wiki-lint',
];

const EXTRA_REQUIRED_FILES = [
  'runbooks/worker-task-packets.md',
  'runbooks/opencode-worker.md',
  'runbooks/saved-workflows.md',
  'runbooks/gateway-router.md',
  '.claude/commands/worker-task-packet.md',
  '.agents/skills/forgeflow-worker-task-packet/SKILL.md',
  'scripts/framework.env.example',
  'scripts/use-profile.sh',
  'scripts/glm-worker.sh',
  'runbooks/glm-workflow-worker.md',
];

const START_HERE_REFERENCES = [
  ...WORKFLOWS,
  'worker-task-packet',
  'worker-task-packets',
  'opencode-worker',
  'saved-workflows',
  'gateway-router',
  'glm-workflow-worker',
];

const REQUIRED_FILES = [
  'CLAUDE.md',
  'AGENTS.md',
  'memory/MEMORY.md',
  '.claude/skills/research-first/SKILL.md',
  '.agents/skills/research-first/SKILL.md',
  '.claude/skills/knowledge-wiki/SKILL.md',
  '.agents/skills/knowledge-wiki/SKILL.md',
  ...WORKFLOWS.map((name) => `runbooks/${name}.md`),
  ...WORKFLOWS.map((name) => `.claude/commands/${name}.md`),
  ...WORKFLOWS.map((name) => `.agents/skills/forgeflow-${name}/SKILL.md`),
  ...EXTRA_REQUIRED_FILES,
];

const HANDOFF_SECTIONS = [
  'Last updated:',
  'Status:',
  'Current lane:',
  'Active implementation root:',
  '## Read-First Order',
  '## Start By',
  '## Current State',
  '## Completed Last Session',
  '## Recently Touched Files / Dirty-Worktree Cautions',
  '## Open Blockers',
  '## Known Drift',
  '## Waivers',
  '## Verification Log',
  '## Do Not Do Yet',
  '## Next Slice',
  '## Maintenance Contract',
];

const CANONICAL_HANDOFF = 'plans/next-session-handoff.md';
const LEGACY_HANDOFF = '.claude/plans/next-session-handoff.md';

const SKIP_DIRS = new Set([
  'node_modules', '.git', 'templates', 'framework', 'examples',
  'dist', 'build', 'out', 'coverage', '.next', '.vercel',
]);
const SCAN_EXT = new Set(['.md', '.mdx']);
const PLACEHOLDER_RE = /<PLACEHOLDER>|<[A-Z][A-Z0-9_ /|-]{2,}>/g;

const findings = [];

for (const rel of REQUIRED_FILES) {
  if (!existsSync(join(target, rel))) findings.push(`missing required file: ${rel}`);
}

function readText(path) {
  try { return readFileSync(path, 'utf8'); } catch { return null; }
}

const startHereCandidates = [
  join(target, 'START-HERE.md'),
  join(target, 'framework/START-HERE.md'),
  join(target, '../START-HERE.md'),
];
const startHerePath = startHereCandidates.find((p) => existsSync(p));
if (!startHerePath) {
  findings.push('missing START-HERE.md for workflow file-map check');
} else {
  const startHere = readText(startHerePath) ?? '';
  for (const workflow of START_HERE_REFERENCES) {
    if (!startHere.includes(workflow)) {
      findings.push(`START-HERE.md file map does not reference shipped workflow: ${workflow}`);
    }
  }
}

const canonicalHandoffPath = join(target, CANONICAL_HANDOFF);
const legacyHandoffPath = join(target, LEGACY_HANDOFF);
if (existsSync(legacyHandoffPath) && !existsSync(canonicalHandoffPath)) {
  findings.push(`legacy handoff exists without canonical handoff: ${LEGACY_HANDOFF} (write ${CANONICAL_HANDOFF})`);
}

function stripCode(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]*`/g, '');
}

function checkHandoff(rel) {
  const full = join(target, rel);
  if (!existsSync(full)) return;
  let text;
  try { text = readFileSync(full, 'utf8'); } catch { return; }
  for (const section of HANDOFF_SECTIONS) {
    if (!text.includes(section)) findings.push(`handoff ${rel} missing required section/field: ${section}`);
  }
  if (!/\b(READY|READY WITH WAIVERS|BLOCKED)\b/.test(text)) {
    findings.push(`handoff ${rel} missing status enum value: READY | READY WITH WAIVERS | BLOCKED`);
  }
}

checkHandoff(CANONICAL_HANDOFF);
checkHandoff(LEGACY_HANDOFF);

function checkMarkdown(full, rel) {
  const text = readText(full);
  if (text === null) return;
  const prose = stripCode(text);

  const hits = prose.match(PLACEHOLDER_RE);
  if (hits) {
    const uniq = [...new Set(hits)].slice(0, 5).join(', ');
    findings.push(`unfilled placeholder(s) in ${rel}: ${uniq}`);
  }

  if (text.includes(LEGACY_HANDOFF) && !text.includes(CANONICAL_HANDOFF)) {
    findings.push(`legacy-only handoff path in ${rel}: mention ${CANONICAL_HANDOFF} and treat ${LEGACY_HANDOFF} as fallback only`);
  }
}

function walk(dir) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(join(dir, e.name));
    } else if (e.isFile()) {
      if (!SCAN_EXT.has(extname(e.name))) continue;
      const full = join(dir, e.name);
      const rel = relative(target, full) || e.name;
      checkMarkdown(full, rel);
    }
  }
}
walk(target);

function checkStarterPlaceholders(starterRoot, label) {
  function walkStarter(dir) {
    let entries;
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name)) continue;
        walkStarter(join(dir, e.name));
      } else if (e.isFile() && SCAN_EXT.has(extname(e.name))) {
        const full = join(dir, e.name);
        const rel = `${label}/${relative(starterRoot, full) || e.name}`;
        checkMarkdown(full, rel);
      }
    }
  }
  walkStarter(starterRoot);
}

const projectStarter = join(target, 'framework/starter');
if (existsSync(projectStarter) && statSync(projectStarter).isDirectory()) {
  checkStarterPlaceholders(projectStarter, 'framework/starter');
}

const label = target === '.' ? 'project root' : target;
if (findings.length === 0) {
  console.log(`✓ portability-check: ${label} — all checks passed (${REQUIRED_FILES.length} required files present, placeholders clean, handoff paths current).`);
  process.exit(0);
}

console.error(`✖ portability-check: ${label} — ${findings.length} finding(s):`);
for (const f of findings) console.error(`  - ${f}`);
console.error(`\nFix: activate the starter payload at the project root (cp -R framework/starter/. .), run /onboard or forgeflow-onboard to fill artifacts, write ${CANONICAL_HANDOFF}, and replace any remaining placeholders.`);
process.exit(1);
