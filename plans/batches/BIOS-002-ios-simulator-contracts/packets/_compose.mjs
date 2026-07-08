#!/usr/bin/env node
// Packet composer — resolves {{FILE:...}}, {{FIXTURE:...}}, {{SERVER:...}}, {{SHARED}} placeholders
// against the live workspace at dispatch time, so later waves embed landed code from earlier waves.
// Usage: node _compose.mjs P1 P3 ...  → writes P<n>.compiled.md next to each body.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = '/Users/hamza/Desktop/balencia-design';
const MOBILE = join(ROOT, 'yhealth-app/mobile');
const SERVER = join(ROOT, 'yhealth-app/server');
const FIXTURES = join(ROOT, 'plans/batches/BIOS-002-ios-simulator-contracts/evidence/endpoint-samples');
const SHARED = readFileSync(join(HERE, '_shared-context.md'), 'utf8');

const lang = (p) => ({ '.ts': 'ts', '.tsx': 'tsx', '.json': 'json', '.mjs': 'js' }[extname(p)] ?? '');

function embed(base, rel) {
  const p = join(base, rel);
  if (!existsSync(p)) return `> [MISSING AT COMPOSE TIME: ${rel} — create this file from scratch per the contract]`;
  return '```' + lang(rel) + '\n// ==== ' + rel + ' (current content at dispatch) ====\n' + readFileSync(p, 'utf8') + '\n```';
}

for (const id of process.argv.slice(2)) {
  const body = readFileSync(join(HERE, `${id}.md`), 'utf8');
  const out = body
    .replaceAll('{{SHARED}}', SHARED)
    .replace(/\{\{FILE:([^}]+)\}\}/g, (_, f) => embed(MOBILE, f.trim()))
    .replace(/\{\{SERVER:([^}]+)\}\}/g, (_, f) => embed(SERVER, f.trim()))
    .replace(/\{\{FIXTURE:([^}]+)\}\}/g, (_, f) => embed(FIXTURES, f.trim()));
  const dest = join(HERE, `${id}.compiled.md`);
  writeFileSync(dest, out);
  console.log(`${id} -> ${dest} (${out.length} chars)`);
}
