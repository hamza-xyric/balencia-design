#!/usr/bin/env node
// Generate the use_figma JS code body for a batch of Lucide icons.
// Usage: node scripts/gen-icon-batch.mjs <startIdx> <count>
//   startIdx : index into figma-icons-used.json icons[] (0-based, includes Plus/X probe at 0/1)
//   count    : how many icons to build in this call
import fs from 'node:fs';

const startIdx = Number(process.argv[2] ?? 0);
const count    = Number(process.argv[3] ?? 15);

const map = JSON.parse(fs.readFileSync('scripts/figma-icons-used.json', 'utf8'));
const slice = map.icons.slice(startIdx, startIdx + count);

const CELL = 80;
const NUM_COLS = 12;
const ORIGIN_X = 80;
const ORIGIN_Y = 80;

const items = slice.map((ic, i) => {
  const idx = startIdx + i;
  const col = idx % NUM_COLS;
  const row = Math.floor(idx / NUM_COLS);
  const svgRaw = fs.readFileSync(`node_modules/lucide-static/icons/${ic.kebab}.svg`, 'utf8');
  const svg = svgRaw
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return {
    pascal: ic.pascal,
    svg,
    x: ORIGIN_X + col * CELL,
    y: ORIGIN_Y + row * CELL,
  };
});

const dataJson = JSON.stringify(items);

process.stdout.write(`
const ICONS = ${dataJson};

const ICONS_PAGE_ID = "89:2";
const TEXT_PRIMARY_ID = "VariableID:5:6";

const textPrimary = await figma.variables.getVariableByIdAsync(TEXT_PRIMARY_ID);
if (!textPrimary) throw new Error("color/text/primary not found");
const iconsPage = await figma.getNodeByIdAsync(ICONS_PAGE_ID);
if (!iconsPage) throw new Error("Icons page not found");
await figma.setCurrentPageAsync(iconsPage);

function buildIcon(name, svg, x, y) {
  const wrapper = figma.createNodeFromSvg(svg);
  const drawNodes = wrapper.findAll(n =>
    ["VECTOR","ELLIPSE","RECTANGLE","LINE","POLYGON","STAR"].includes(n.type)
  );
  const comp = figma.createComponent();
  comp.name = "Icon/" + name;
  comp.resize(24, 24);
  comp.fills = [];
  comp.clipsContent = false;
  for (const d of drawNodes) {
    comp.appendChild(d);
    if ("fills" in d) d.fills = [];
    let p = { type: "SOLID", color: { r: 1, g: 1, b: 1 } };
    p = figma.variables.setBoundVariableForPaint(p, "color", textPrimary);
    d.strokes = [p];
    d.strokeWeight = 2;
    d.strokeCap = "ROUND";
    d.strokeJoin = "ROUND";
  }
  wrapper.remove();
  comp.x = x;
  comp.y = y;
  comp.setSharedPluginData("dsb", "key", "icon/" + name);
  return comp;
}

const out = [];
for (const ic of ICONS) {
  const c = buildIcon(ic.pascal, ic.svg, ic.x, ic.y);
  out.push({ name: ic.pascal, id: c.id, key: c.key, x: c.x, y: c.y, vectors: c.children.length });
}

return { createdNodeIds: out.map(o => o.id), icons: out };
`);
