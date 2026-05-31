#!/usr/bin/env node
// portability-check.mjs — dogfoods the framework's own verify discipline (FRAMEWORK.md move A6).
//
// Scans a target project (or the shipped starter payload) for the things that would make a
// copied framework "a map without territory":
//   1. Required files the framework names actually exist (the research-first skill, the
//      handoff/start-handoff/onboard commands, a CLAUDE.md, the memory index).
//   2. A CLAUDE.md is present (included in the required set).
//   3. No unfilled <PLACEHOLDER> / <UPPER_CASE> tokens remain in committed markdown
//      artifacts (templates and worked examples are excluded — those are *meant* to hold tokens).
//
// Usage:
//   node framework/verify/portability-check.mjs [target-dir]
//     target-dir defaults to "." (the current project root, after the starter payload is activated).
//   Check the shipped payload directly:
//     node framework/verify/portability-check.mjs framework/starter
//
// Exit codes: 0 = all checks passed · 1 = one or more findings · 2 = bad usage.

import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const target = process.argv[2] ?? '.';

if (!existsSync(target) || !statSync(target).isDirectory()) {
  console.error(`✖ portability-check: target directory not found: ${target}`);
  process.exit(2);
}

// 1 — files the framework names and expects to exist, relative to the target root.
//     (After `cp -R framework/starter/. .` these live at the project root; when the target
//      IS framework/starter, they resolve inside the payload. Same list works for both.)
const REQUIRED_FILES = [
  'CLAUDE.md',
  '.claude/skills/research-first/SKILL.md',
  '.claude/commands/handoff.md',
  '.claude/commands/start-handoff.md',
  '.claude/commands/onboard.md',
  'memory/MEMORY.md',
];

// 2 — placeholder-scan config.
//     Skip dirs that legitimately hold tokens (templates), are shipped reference (framework),
//     are illustrative (examples), or are build/vendor noise.
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'templates', 'framework', 'examples',
  'dist', 'build', 'out', 'coverage', '.next', '.vercel',
]);
const SCAN_EXT = new Set(['.md', '.mdx']);
// "Still a template": the literal <PLACEHOLDER>, or any <UPPER_CASE…> angle-bracket token
// such as <PROJECT_NAME>, <HIGHEST_AUTHORITY>, <DESIGN_WORKSPACE | MONOREPO>.
const PLACEHOLDER_RE = /<PLACEHOLDER>|<[A-Z][A-Z0-9_ /|-]{2,}>/g;

const findings = [];

// check 1 — required files
for (const rel of REQUIRED_FILES) {
  if (!existsSync(join(target, rel))) findings.push(`missing required file: ${rel}`);
}

// check 3 — unfilled placeholders in committed markdown
// Strip fenced + inline code first, so prose that *mentions* `<PLACEHOLDER>` doesn't false-positive.
function stripCode(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]*`/g, '');
}

function walk(dir) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(join(dir, e.name));
    } else if (e.isFile()) {
      const dot = e.name.lastIndexOf('.');
      const ext = dot >= 0 ? e.name.slice(dot) : '';
      if (!SCAN_EXT.has(ext)) continue;
      const full = join(dir, e.name);
      let text;
      try { text = readFileSync(full, 'utf8'); } catch { continue; }
      const hits = stripCode(text).match(PLACEHOLDER_RE);
      if (hits) {
        const uniq = [...new Set(hits)].slice(0, 5).join(', ');
        findings.push(`unfilled placeholder(s) in ${relative(target, full) || e.name}: ${uniq}`);
      }
    }
  }
}
walk(target);

// report
const label = target === '.' ? 'project root' : target;
if (findings.length === 0) {
  console.log(`✓ portability-check: ${label} — all checks passed (${REQUIRED_FILES.length} required files present, no unfilled placeholders).`);
  process.exit(0);
}
console.error(`✖ portability-check: ${label} — ${findings.length} finding(s):`);
for (const f of findings) console.error(`  - ${f}`);
console.error('\nFix: activate the starter payload at the project root (cp -R framework/starter/. .), run /onboard to fill artifacts, and replace any remaining <PLACEHOLDER> tokens.');
process.exit(1);
