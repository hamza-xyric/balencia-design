#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "Balencia-New-Screens");
const ledgerPath = path.join(root, "_MASTER-LEDGER.md");
const screensDir = path.join(root, "screens");
const routesCsvPath = path.resolve(process.cwd(), "Archive/2026-07-06/routes.csv");

const sectionNames = [
  "Header",
  "Purpose",
  "Entry & exit",
  "Layout anatomy",
  "Components",
  "Visual treatment",
  "Content & copy",
  "Data & honesty states",
  "All states",
  "Motion & interaction",
  "Motivation-tier adaptation",
  "Accessibility",
  "Premium checklist",
];

const requiredHeadings = sectionNames.map((name, index) => `${index + 1}. ${name}`);

const allowedHex = new Set([
  "#0A0A0F", "#0C0603", "#140A05", "#211008", "#2A1510",
  "#FF5E00", "#34A853", "#7F24FF", "#FEFAF3", "#FDFDFB",
  "#ef4444", "#84cc16", "#14b8a6", "#10b981", "#6366f1",
  "#ec4899", "#8b5cf6", "#06b6d4", "#f59e0b",
].map((v) => v.toLowerCase()));

const routeCoverage = {
  "/auth/signin": "04",
  "/auth/signup": "03",
  "/auth/verify": "03b",
  "/auth/forgot-password": "05",
  "/auth/reset-password": "05b",
  "/auth/whoop/callback": "22",
  "/reset-password": "05b",
  "/onboarding": "07",
  "/preferences": "21",
  "/profile": "17",
  "/profile/[id]": "83",
  "/profile/edit": "50",
  "/settings": "21",
  "/settings/billing": "23",
  "/settings/billing/credits": "23",
  "/subscription": "43",
  "/subscription/success": "42",
  "/upgrade": "43",
  "/locked/[pageKey]": "43",
  "/dashboard": "12",
  "/activity": "26",
  "/activity-status": "12",
  "/calendar/connected": "22",
  "/schedule": "41",
  "/ai-coach": "09",
  "/chat-history": "74",
  "/chat": "74",
  "/messages": "75",
  "/notifications": "24",
  "/voice-assistant": "11",
  "/voice-call": "11",
  "/whatsapp": "99",
  "/workouts": "26",
  "/exercises": "70",
  "/exercises/[id]": "70",
  "/progress": "90",
  "/whoop": "96",
  "/achievements": "71",
  "/yoga": "55",
  "/nutrition": "28",
  "/wellbeing": "89",
  "/quick-notes": "62",
  "/soundscape": "80",
  "/obstacles/[id]": "85",
  "/wellbeing/breathing": "53",
  "/wellbeing/emotional-checkin": "45",
  "/wellbeing/energy": "63",
  "/wellbeing/habits": "38",
  "/wellbeing/insights": "48",
  "/wellbeing/journal": "37",
  "/wellbeing/mood": "93",
  "/wellbeing/schedule": "41",
  "/wellbeing/schedule/[date]": "41",
  "/wellbeing/stress": "52",
  "/wellbeing/virtual-tryon": "86",
  "/wellbeing/virtual-tryon/history": "87",
  "/wellbeing/vision": "88",
  "/career": "32",
  "/contracts": "82",
  "/goals": "13",
  "/money-map": "30",
  "/people": "33",
  "/plans": "97",
  "/community": "40",
  "/community/[slug]": "40",
  "/competitions": "47",
  "/feed": "91",
  "/groups": "95",
  "/leaderboard": "39",
  "/life-areas": "16",
  "/life-world": "19",
  "/reputation": "92",
  "/knowledge-graph": "72",
  "/wiki": "20",
  "/webinars": "94",
  "/webinars/[slug]": "94",
  "/offline": "98",
  "/maintenance": "98",
  "/forbidden": "98",
  "/unauthorized": "98",
  "/coming-soon": "98",
  "/help": "25",
  "/help/[slug]": "25",
};

const genericPhraseChecks = [
  ["generic primary metric", /\bprimary metric\b/i],
  ["generic latest primary metric", /\blatest primary metric\b/i],
  ["generic Continue CTA", /^\s*-\s+\*\*Primary CTA:\*\*\s+Continue\s*$/im],
  ["generic See details CTA", /^\s*-\s+\*\*Secondary CTA:\*\*\s+See details\s*$/im],
  ["generic add one signal copy", /\bAdd one signal\b/i],
  ["generic wireframe stack", /\bList \/ chart \/ module stack\b/i],
  ["template purpose sentence", /High-fidelity mobile spec for\s+\d{2}/i],
  ["template entry paths", /bottom navigation, linked cards from Today\/Home, CIA recommendations/i],
  ["template action exits", /relevant create\/edit\/detail sheets/i],
  ["template data-story copy", /one source-aware data story/i],
];

const sourceSpecificTerms = new Map(Object.entries({
  "02": [
    ["four-panel carousel", /four[- ]panel|4-panel/i],
    ["panel 1 headline", /One life, not modules/i],
    ["coach panel", /Meet CIA, your coach/i],
    ["connection panel", /Everything connects/i],
    ["gamified panel", /Your life, gamified/i],
    ["skip control", /\bskip\b/i],
    ["get started CTA", /get started/i],
  ],
  "12": [
    ["dashboard route", /\/dashboard/i],
    ["activity-status route", /\/activity-status/i],
    ["life balance", /Life balance/i],
    ["today actions", /Today's actions|today's actions/i],
    ["pinned missions", /Pinned missions/i],
    ["quick-log", /Quick-log|FABQuickLog/i],
    ["schedule preview", /Coming up|schedule/i],
  ],
  "25": [
    ["help route", /\/help/i],
    ["help article route", /\/help\/\[slug\]/i],
    ["search support", /search/i],
    ["article", /article/i],
    ["contact support", /contact support|support request/i],
  ],
  "35": [
    ["learning", /learning/i],
    ["course", /course|lesson/i],
    ["skill", /skill/i],
    ["streak", /streak/i],
    ["growth", /growth/i],
  ],
  "36": [
    ["creativity", /creativity/i],
    ["project", /project/i],
    ["prompt", /prompt/i],
    ["idea", /idea/i],
    ["gallery", /gallery/i],
  ],
  "39": [
    ["leaderboard route", /\/leaderboard/i],
    ["rank", /rank/i],
    ["LeaderboardRow", /LeaderboardRow/i],
    ["self row", /self-row|your row|you row/i],
    ["fairness", /fairness|anti-shame|season/i],
  ],
  "40": [
    ["community route", /\/community/i],
    ["community slug route", /\/community\/\[slug\]/i],
    ["room", /room|circle/i],
    ["moderation", /moderation|report/i],
    ["members", /members/i],
  ],
  "46": [
    ["accountability", /accountability/i],
    ["partner", /partner|buddy/i],
    ["check-in", /check-?in/i],
    ["commitment", /commitment/i],
    ["nudge", /nudge/i],
  ],
  "47": [
    ["competitions route", /\/competitions/i],
    ["competition", /competition/i],
    ["challenge", /challenge/i],
    ["LeaderboardRow", /LeaderboardRow/i],
    ["join", /join/i],
  ],
  "51": [
    ["voice history", /voice call history|call history/i],
    ["transcript", /transcript/i],
    ["summary", /summary/i],
    ["recording", /recording|audio/i],
    ["delete control", /delete/i],
  ],
  "67": [
    ["image viewer", /image viewer|viewer/i],
    ["photo", /photo|image/i],
    ["zoom", /zoom/i],
    ["download/share", /download|share/i],
    ["delete/report", /delete|report/i],
  ],
  "69": [
    ["app rating", /app rating|rating/i],
    ["stars", /star/i],
    ["feedback", /feedback/i],
    ["store review", /store review|app store/i],
    ["not now", /not now/i],
  ],
  "75": [
    ["messages route", /\/messages/i],
    ["contact name", /Aisha/i],
    ["CIA assist", /CIA assist/i],
    ["shared mission", /shared mission/i],
    ["message composer", /Message Aisha|composer/i],
    ["read receipt", /read|delivered/i],
  ],
  "76": [
    ["chat route", /\/chat/i],
    ["group chat", /group chat|group thread/i],
    ["members", /members/i],
    ["CIA recap", /CIA recap|recap/i],
    ["mute/report", /mute|report/i],
  ],
  "77": [
    ["message actions", /message actions|message options/i],
    ["react", /react|reaction/i],
    ["copy", /\bcopy\b/i],
    ["delete", /delete/i],
    ["save to mission", /save to mission/i],
  ],
  "80": [
    ["soundscape route", /\/soundscape/i],
    ["Spotify", /Spotify/i],
    ["Tempo run focus", /Tempo run focus/i],
    ["Now playing", /Now playing/i],
    ["Connect Spotify", /Connect Spotify/i],
    ["BPM", /\bBPM\b/i],
  ],
  "81": [
    ["video library", /video library|videos/i],
    ["webinar recording", /webinar|recording/i],
    ["category", /category|filter/i],
    ["watch progress", /watch progress|resume/i],
    ["save", /save|bookmark/i],
  ],
  "82": [
    ["contracts route", /\/contracts/i],
    ["contract", /contract/i],
    ["sign", /sign|signature/i],
    ["witness", /witness|partner/i],
    ["commitment", /commitment/i],
  ],
  "85": [
    ["obstacle route", /\/obstacles\/\[id\]/i],
    ["obstacle", /obstacle/i],
    ["coach plan", /coach plan|plan/i],
    ["root cause", /root cause/i],
    ["next step", /next step/i],
  ],
  "86": [
    ["virtual try-on route", /\/wellbeing\/virtual-tryon/i],
    ["try-on", /try-?on/i],
    ["photo", /photo/i],
    ["consent", /ConsentCard|consent/i],
    ["generation", /generation|generate/i],
  ],
  "87": [
    ["try-on history route", /\/wellbeing\/virtual-tryon\/history/i],
    ["history", /history/i],
    ["outfit", /outfit|look/i],
    ["delete", /delete/i],
    ["provenance", /provenance|source/i],
  ],
  "88": [
    ["vision route", /\/wellbeing\/vision/i],
    ["vision", /vision|eye/i],
    ["eye test", /eye test|acuity/i],
    ["exercise", /exercise/i],
    ["medical disclaimer", /not a diagnosis|clinician/i],
  ],
  "89": [
    ["wellbeing route", /\/wellbeing/i],
    ["journal", /journal/i],
    ["mood", /mood/i],
    ["breathing", /breathing/i],
    ["stress", /stress/i],
    ["crisis resources", /crisis|SafetyResourceCard/i],
  ],
  "90": [
    ["progress route", /\/progress/i],
    ["weight", /weight/i],
    ["BMI", /\bBMI\b/i],
    ["measurements", /measurement/i],
    ["trend", /trend/i],
    ["progress photos", /progress photos|photos/i],
  ],
  "91": [
    ["feed route", /\/feed/i],
    ["FeedPostCard", /FeedPostCard/i],
    ["kudos", /kudos/i],
    ["comment", /comment/i],
    ["report", /report|moderation/i],
    ["proof", /proof/i],
  ],
  "93": [
    ["mood route", /\/wellbeing\/mood/i],
    ["mood trend", /mood trend|mood trends/i],
    ["check-in", /check-?in/i],
    ["journal", /journal/i],
    ["crisis resources", /crisis|SafetyResourceCard/i],
    ["trend chart", /TrendChart/i],
  ],
  "94": [
    ["webinars route", /\/webinars/i],
    ["webinar slug route", /\/webinars\/\[slug\]/i],
    ["registration", /registration|register/i],
    ["speaker", /speaker|host/i],
    ["recording", /recording/i],
  ],
  "95": [
    ["groups route", /\/groups/i],
    ["pod", /\bpod|PodCard/i],
    ["circle", /circle/i],
    ["partner", /partner/i],
    ["join", /join/i],
  ],
  "96": [
    ["whoop route", /\/whoop/i],
    ["provider-neutral", /provider-neutral/i],
    ["WHOOP", /WHOOP/i],
    ["recovery", /recovery/i],
    ["strain", /strain/i],
    ["consent", /ConsentCard|consent/i],
  ],
  "97": [
    ["plans route", /\/plans/i],
    ["plans library", /plans library/i],
    ["active plan", /active plan/i],
    ["plan card", /plan card|PlanCard/i],
    ["start plan", /start plan/i],
    ["coach", /CIA/i],
  ],
  "98": [
    ["offline route", /\/offline/i],
    ["maintenance route", /\/maintenance/i],
    ["forbidden route", /\/forbidden/i],
    ["unauthorized route", /\/unauthorized/i],
    ["coming soon route", /\/coming-soon/i],
    ["system states", /system states|utility/i],
  ],
  "99": [
    ["whatsapp route", /\/whatsapp/i],
    ["WhatsApp", /WhatsApp/i],
    ["inbox", /inbox/i],
    ["enrollment", /enrollment|03e/i],
    ["consent", /ConsentCard|consent/i],
  ],
}));

function parseLedger() {
  const ledger = fs.readFileSync(ledgerPath, "utf8");
  const rows = [];
  for (const line of ledger.split(/\r?\n/)) {
    if (!line.startsWith("| ")) continue;
    const cells = line.split("|").slice(1, -1).map((c) => c.trim());
    if (cells.length !== 8 || cells[0] === "ID" || cells[0] === "---") continue;
    rows.push({
      id: cells[0],
      out: cells[1],
      batch: cells[2],
      source: cells[3],
      status: cells[4],
      grade: cells[5],
      defects: cells[6],
      notes: cells[7],
    });
  }
  return rows;
}

function specPath(row) {
  return path.join(screensDir, `${row.out}.md`);
}

function extractNumberedSections(text) {
  return [...text.matchAll(/^#{2,3}\s+(\d+)\.\s+(.+?)\s*$/gim)].map((match) => ({
    number: Number(match[1]),
    name: match[2].trim(),
    index: match.index ?? 0,
    raw: match[0],
  }));
}

function loadLiveRoutes() {
  if (!fs.existsSync(routesCsvPath)) return new Set();
  const routes = new Set();
  const lines = fs.readFileSync(routesCsvPath, "utf8").trim().split(/\r?\n/).slice(1);
  for (const line of lines) {
    const [route] = parseCsvLine(line);
    if (route) routes.add(route);
  }
  return routes;
}

function extractRoutes(text) {
  const matches = text.match(/\/[A-Za-z0-9/_\-\[\]]+/g) || [];
  return [...new Set(matches.map((route) => route.replace(/[.,;:)]+$/g, "")))];
}

function headerRouteLine(text) {
  const match = text.match(/^-\s+\*\*Route\(s\) covered:\*\*\s*(.+)$/im);
  return match ? match[1].trim() : "";
}

function expectedRoutesForRow(row) {
  const expected = new Set();
  for (const [route, id] of Object.entries(routeCoverage)) {
    if (id === row.id) expected.add(route);
  }
  for (const route of extractRoutes(`${row.source} ${row.notes}`)) {
    expected.add(route);
  }
  return [...expected];
}

function scoreSpec(text, row, liveRoutes) {
  const defects = [];
  const sections = extractNumberedSections(text);
  const actualHeadings = sections.map((section) => `${section.number}. ${section.name}`);
  if (sections.length !== requiredHeadings.length || actualHeadings.some((heading, index) => heading !== requiredHeadings[index])) {
    defects.push(`section schema mismatch: expected ${requiredHeadings.join(" | ")}`);
  }
  for (let i = 1; i < sections.length; i++) {
    if (sections[i].index < sections[i - 1].index) defects.push("section order drift");
  }
  if (!/```text[\s\S]*?```/.test(text) && !/ASCII wireframe/i.test(text)) defects.push("missing ASCII wireframe");
  const wireframes = [...text.matchAll(/```text\n([\s\S]*?)```/g)].map((match) => match[1]);
  if (wireframes.some((wireframe) => /List \/ chart \/ module stack|Hero GlassCard\s*\n\s*primary metric|SolidCard\s*\n\s*data\/state/i.test(wireframe))) {
    defects.push("template wireframe detected");
  }
  if (!/390x844|390×844/i.test(text)) defects.push("missing 390x844 reference");
  for (const state of ["Default", "Skeleton", "Empty", "Error", "Success", "Disabled"]) {
    if (!new RegExp(`\\b${state}\\b`, "i").test(text)) defects.push(`missing ${state} state`);
  }
  if (!/real/i.test(text) || !/low-confidence|low confidence/i.test(text) || !/honest-null|honest null/i.test(text)) {
    defects.push("honesty triple incomplete");
  }
  if (!/provenance|ChipProvenance|via /i.test(text)) defects.push("provenance missing");
  if (!/glow-(you|done|cia)|--glow/i.test(text)) defects.push("semantic glow missing");
  if (!/reduced-motion|reduced motion/i.test(text)) defects.push("reduced-motion path missing");
  if (!/44px|44 px|44x44/i.test(text)) defects.push("44px target missing");
  if (/\bSIA\b/i.test(text)) defects.push("old coach token present");
  for (const [label, pattern] of genericPhraseChecks) {
    if (pattern.test(text)) defects.push(label);
  }
  const routeLine = headerRouteLine(text);
  if (!routeLine) {
    defects.push("missing Route(s) covered header");
  } else {
    const headerRoutes = extractRoutes(routeLine);
    const unknownRoutes = headerRoutes.filter((route) => !liveRoutes.has(route));
    if (unknownRoutes.length) defects.push(`unknown header route: ${unknownRoutes.join(", ")}`);
    const expectedLiveRoutes = expectedRoutesForRow(row).filter((route) => liveRoutes.has(route));
    const missingExpected = expectedLiveRoutes.filter((route) => !headerRoutes.includes(route));
    const unexpectedLive = headerRoutes.filter((route) => liveRoutes.has(route) && !expectedLiveRoutes.includes(route));
    if (expectedLiveRoutes.length && missingExpected.length) defects.push(`header missing ledger route: ${missingExpected.join(", ")}`);
    if (expectedLiveRoutes.length && unexpectedLive.length) defects.push(`header route not in ledger mapping: ${unexpectedLive.join(", ")}`);
  }
  const requiredTerms = sourceSpecificTerms.get(row.id) || [];
  const missingTerms = requiredTerms.filter(([, pattern]) => !pattern.test(text)).map(([label]) => label);
  if (missingTerms.length) defects.push(`missing source terms: ${missingTerms.join(", ")}`);
  const hexes = [...new Set((text.match(/#[0-9A-Fa-f]{3,8}\b/g) || []).map((h) => h.toLowerCase()))];
  const offCanon = hexes.filter((h) => !allowedHex.has(h));
  if (offCanon.length) defects.push(`off-canon hex: ${offCanon.join(", ")}`);
  const score = Math.max(0, 14 - defects.length);
  return { score, defects };
}

function parseCsvLine(line) {
  const out = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && line[i + 1] === '"') {
      cell += '"';
      i++;
    } else if (ch === '"') {
      quoted = !quoted;
    } else if (ch === "," && !quoted) {
      out.push(cell);
      cell = "";
    } else {
      cell += ch;
    }
  }
  out.push(cell);
  return out;
}

function routeSweep(passIds) {
  if (!fs.existsSync(routesCsvPath)) return { checked: 0, uncovered: ["routes.csv missing"] };
  const lines = fs.readFileSync(routesCsvPath, "utf8").trim().split(/\r?\n/).slice(1);
  const uncovered = [];
  let checked = 0;
  const excludedGroups = new Set(["Admin"]);
  const excludedPublic = new Set([
    "/", "/about", "/blogs", "/blogs/[slug]", "/careers", "/contact", "/cookies", "/faq",
    "/hipaa", "/newsletter/unsubscribe", "/press", "/preview", "/privacy", "/security", "/terms",
  ]);
  for (const line of lines) {
    const [route, actualRoute, kind, auth, group] = parseCsvLine(line);
    if (excludedGroups.has(group)) continue;
    if (excludedPublic.has(route)) continue;
    if (auth === "public" && !routeCoverage[route]) continue;
    checked++;
    const mapped = routeCoverage[route];
    if (!mapped) {
      uncovered.push(`${route} (${group}) no mapping`);
    } else if (!passIds.has(mapped)) {
      uncovered.push(`${route} -> ${mapped} not PASS`);
    }
  }
  return { checked, uncovered };
}

const rows = parseLedger();
const passRows = rows.filter((r) => r.status === "PASS");
const todoRows = rows.filter((r) => r.status === "todo");
const liveRoutes = loadLiveRoutes();
const screenFiles = fs.existsSync(screensDir)
  ? fs.readdirSync(screensDir).filter((f) => f.endsWith(".md"))
  : [];

const perScreen = [];
for (const row of rows) {
  const file = specPath(row);
  if (!fs.existsSync(file)) {
    perScreen.push({ id: row.id, out: row.out, exists: false, score: 0, defects: ["file missing"] });
    continue;
  }
  const text = fs.readFileSync(file, "utf8");
  perScreen.push({ id: row.id, out: row.out, exists: true, ...scoreSpec(text, row, liveRoutes) });
}

const passIds = new Set(passRows.map((r) => r.id));
const sweep1 = routeSweep(passIds);
const sweep2 = routeSweep(passIds);

const summary = {
  ledgerRows: rows.length,
  ledgerPass: passRows.length,
  ledgerTodo: todoRows.length,
  screenFiles: screenFiles.length,
  liveRoutes: liveRoutes.size,
  missingFiles: perScreen.filter((s) => !s.exists).map((s) => `${s.id}:${s.out}`),
  lowScores: perScreen.filter((s) => s.exists && s.score < 12).map((s) => `${s.id}:${s.score}/14 ${s.defects.join("; ")}`),
  defectScreens: perScreen.filter((s) => s.defects.length).map((s) => `${s.id}:${s.defects.join("; ")}`),
  falsePassRows: perScreen
    .filter((s) => s.defects.length && rows.find((row) => row.id === s.id)?.status === "PASS")
    .map((s) => `${s.id}:${s.defects.join("; ")}`),
  routeSweep1: { checked: sweep1.checked, uncovered: sweep1.uncovered },
  routeSweep2: { checked: sweep2.checked, uncovered: sweep2.uncovered },
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(`# Balencia redesign validation`);
  console.log(`ledger rows: ${summary.ledgerRows}`);
  console.log(`ledger PASS: ${summary.ledgerPass}`);
  console.log(`ledger todo: ${summary.ledgerTodo}`);
  console.log(`screen files: ${summary.screenFiles}`);
  console.log(`live routes: ${summary.liveRoutes}`);
  console.log(`missing files: ${summary.missingFiles.length}`);
  console.log(`screens with defects: ${summary.defectScreens.length}`);
  console.log(`false PASS rows: ${summary.falsePassRows.length}`);
  console.log(`route sweep 1: ${sweep1.checked} checked, ${sweep1.uncovered.length} uncovered`);
  console.log(`route sweep 2: ${sweep2.checked} checked, ${sweep2.uncovered.length} uncovered`);
  if (summary.missingFiles.length) console.log(`\nmissing:\n- ${summary.missingFiles.join("\n- ")}`);
  if (summary.defectScreens.length) console.log(`\ndefects:\n- ${summary.defectScreens.slice(0, 80).join("\n- ")}`);
  if (summary.falsePassRows.length) console.log(`\nfalse PASS:\n- ${summary.falsePassRows.slice(0, 80).join("\n- ")}`);
  if (sweep1.uncovered.length) console.log(`\ncoverage:\n- ${sweep1.uncovered.join("\n- ")}`);
}

if (
  summary.missingFiles.length ||
  summary.defectScreens.length ||
  summary.falsePassRows.length ||
  sweep1.uncovered.length ||
  sweep2.uncovered.length
) {
  process.exitCode = 1;
}
