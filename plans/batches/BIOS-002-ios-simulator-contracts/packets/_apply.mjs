#!/usr/bin/env node
// Applies a GLM draft (=== FILE: path === blocks) into yhealth-app/mobile.
// Safety: writes only inside the mobile package; rejects traversal; lists what it wrote.
// Usage: node _apply.mjs evidence/glm-drafts/P1.out.md [--dry]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve, sep } from 'node:path';

const MOBILE = '/Users/hamza/Desktop/balencia-design/yhealth-app/mobile';
const [, , draftPath, flag] = process.argv;
const dry = flag === '--dry';
const raw = readFileSync(draftPath, 'utf8');

// Match: === FILE: <path> === then a fenced block
const re = /^===\s*FILE:\s*(.+?)\s*===\s*\n```[a-z]*\n([\s\S]*?)\n```/gm;
let m, count = 0;
const written = [];
while ((m = re.exec(raw)) !== null) {
  const rel = m[1].trim();
  const content = m[2];
  const abs = resolve(MOBILE, rel);
  if (!abs.startsWith(MOBILE + sep)) {
    console.error(`REJECTED (outside mobile root): ${rel}`);
    process.exitCode = 1;
    continue;
  }
  if (!dry) {
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content.endsWith('\n') ? content : content + '\n');
  }
  written.push(`${rel} (${content.length} chars)`);
  count++;
}
console.log(`${dry ? '[dry] ' : ''}${count} file(s):\n` + written.map(w => '  ' + w).join('\n'));
if (count === 0) { console.error('No FILE blocks found — draft malformed?'); process.exitCode = 1; }
