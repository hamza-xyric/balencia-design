#!/usr/bin/env node
// design-audit/scripts/consistency-check.mjs
// Cross-spec craft consistency + determinism checker for the `## Premium Craft` sections.
// Read-only. Verifies: required subsections present, no placeholder/"e.g." determinism leaks,
// referenced --tokens resolve (globals.css + VK-017 + CK-T## + doc shorthands), raw-hex warnings.
// Exit 1 on hard determinism failures (missing subsections, placeholder copy, unknown tokens).

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SPECS_DIR = join(ROOT, "app_design 3");
const GLOBALS = join(ROOT, "balencia-screens", "src", "app", "globals.css");

// --- known token names --------------------------------------------------
const tokenNames = new Set();
try {
  const css = readFileSync(GLOBALS, "utf8");
  for (const m of css.matchAll(/--([a-z0-9-]+)\s*:/gi)) tokenNames.add(m[1]);
} catch { console.warn("! could not read globals.css — token resolution limited"); }

// viz-audit VK-017 depth tokens (minted by the build program; referenced spec-side)
for (const t of ["orange-light","grad-orange","grad-progress","track-inset",
  "glow-orange-md","glow-orange-sm","glow-green-md","glow-green-sm","glow-purple-md","glow-purple-sm",
  "stroke-thin","stroke-base","stroke-bold","stroke-poster"]) tokenNames.add(t);
// this program's CK-T## token gaps
for (const t of ["edge-highlight","surface-backplate","focus-ring",
  "leading-tight","leading-snug","leading-normal","leading-relaxed",
  "tracking-tight","tracking-normal","tracking-eyebrow"]) tokenNames.add(t);
// doc shorthands (_shared-patterns) + animation vars
for (const t of ["r-xs","r-sm","r-md","r-lg","r-xl","r-2xl","r-pill",
  "s-1","s-2","s-3","s-4","s-5","s-6","s-7","s-8","s-9","s-10",
  "stroke-length","ring-circumference","ring-target","ring-target","ring-radius"]) tokenNames.add(t);

const REQUIRED = ["Focal hierarchy","Surface & depth","Typographic rhythm","Microcopy",
  "Motion choreography","State craft","Signature & anti-generic","Accessibility"];
const PLACEHOLDER = /\b(lorem|ipsum|placeholder|TODO|TBD|FIXME|e\.g\.)\b/i;

// --- scan ----------------------------------------------------------------
const files = readdirSync(SPECS_DIR).filter(f => /^\d.*\.md$/.test(f)).sort();
let withSection = 0, hardFails = 0, warns = 0;
const lines = [];

for (const f of files) {
  const text = readFileSync(join(SPECS_DIR, f), "utf8");
  const start = text.indexOf("\n## Premium Craft");
  if (start === -1) continue;
  withSection++;
  // section = from heading to the next top-level "## " or EOF
  const rest = text.slice(start + 1);
  const nextH2 = rest.slice(3).search(/\n## /);
  const section = nextH2 === -1 ? rest : rest.slice(0, nextH2 + 3);

  const missing = REQUIRED.filter(h => !section.includes(`### ${h}`) && !section.includes(h));
  if (missing.length) { hardFails++; lines.push(`✗ ${f}: missing subsection(s): ${missing.join(", ")}`); }

  if (PLACEHOLDER.test(section)) { hardFails++; lines.push(`✗ ${f}: placeholder/determinism leak (lorem/TODO/e.g./placeholder)`); }

  if (!section.includes("Conform to `design-audit/CONSISTENCY.md`")) { warns++; lines.push(`! ${f}: missing the "Conform to CONSISTENCY.md" close line`); }

  // unknown --token references
  const unknown = new Set();
  for (const m of section.matchAll(/--([a-z][a-z0-9-]*)/gi)) {
    const name = m[1].replace(/^color-/, ""); // accept color-* prefixed aliases loosely
    if (!tokenNames.has(m[1]) && !tokenNames.has(name) &&
        !/^(color|text|radius|spacing|glow|grad|dur|ease|shadow|track|stroke|leading|tracking|edge|surface|focus|r|s)-/.test(m[1])) {
      unknown.add(m[1]);
    }
  }
  if (unknown.size) { hardFails++; lines.push(`✗ ${f}: unknown token(s): ${[...unknown].join(", ")}`); }

  // raw hex inside the craft section (should be tokenized) — warning only
  const hexes = [...section.matchAll(/#[0-9a-fA-F]{6}\b/g)].map(m => m[0]);
  if (hexes.length) { warns++; lines.push(`! ${f}: raw hex in Premium Craft (prefer tokens): ${[...new Set(hexes)].join(", ")}`); }
}

console.log(`design-audit consistency-check — ${files.length} specs scanned, ${withSection} with ## Premium Craft`);
for (const l of lines) console.log("  " + l);
console.log(`\nsummary: ${withSection} sections · ${hardFails} hard fail(s) · ${warns} warning(s)`);
process.exit(hardFails > 0 ? 1 : 0);
