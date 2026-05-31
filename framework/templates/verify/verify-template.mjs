#!/usr/bin/env node
// TEMPLATE — a fast, deterministic, fail-fast verify gate (FRAMEWORK.md move Verify (A6), principle #9).
// Goal: < ~1s, no network, exit 0 = pass / exit 1 = fail, with a clear list of violations.
// Wire several of these into one `verify` script (routes / assets / copy / tokens / contracts).
// Copy per check, rename, and fill the CONFIG + collectViolations(). Delete this header note when done.
//
// Usage:  node framework/templates/verify/verify-template.mjs
//         npm pkg set scripts.verify:<name>="node scripts/verify-<name>.mjs"

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

// ---- CONFIG -----------------------------------------------------------------
const CHECK_NAME = '<check-name>';          // e.g. "copy", "tokens", "routes"
const ROOT = '<dir to scan>';               // e.g. "src" or "specs"
const EXTENSIONS = ['.md', '.ts', '.tsx'];  // which files to scan
// Each rule: a label + a test that returns true when the LINE is a violation.
const RULES = [
  // { label: 'no raw hex (use tokens)', test: (line) => /#[0-9a-fA-F]{6}\b/.test(line) },
  // { label: 'sentence case (no Title Case headings)', test: (line) => /^#{1,6}\s+([A-Z]\w+\s){2,}/.test(line) },
];
// -----------------------------------------------------------------------------

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (name === 'node_modules' || name.startsWith('.')) continue;
      walk(p, out);
    } else if (EXTENSIONS.includes(extname(name))) {
      out.push(p);
    }
  }
  return out;
}

function collectViolations() {
  const violations = [];
  for (const file of walk(ROOT)) {
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      for (const rule of RULES) {
        if (rule.test(line)) {
          violations.push(`${file}:${i + 1}  [${rule.label}]  ${line.trim().slice(0, 100)}`);
        }
      }
    });
  }
  return violations;
}

const violations = collectViolations();
if (violations.length) {
  console.error(`✗ verify:${CHECK_NAME} — ${violations.length} violation(s):\n` + violations.join('\n'));
  process.exit(1);
}
console.log(`✓ verify:${CHECK_NAME} — clean`);
process.exit(0);
