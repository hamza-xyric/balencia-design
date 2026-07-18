import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const repo = path.resolve(root, "..");
const [baseURL, outArg, shotsArg] = process.argv.slice(2);
if (!baseURL || !outArg || !shotsArg) {
  console.error(
    "Usage: node scripts/verify-g1-domains.mjs <baseURL> <out-json> <shots-dir>"
  );
  process.exit(2);
}
const origin = new URL(baseURL);
if (origin.hostname !== "localhost" || origin.port !== "3002")
  throw new Error("G1 acceptance requires local production port 3002");
const outPath = path.resolve(root, outArg);
const shotsDir = path.resolve(root, shotsArg);
const candidateDir = `${shotsDir}.candidate`;

const states = {
  30: [
    "default-real",
    "low-confidence",
    "honest-null",
    "skeleton",
    "section-error-cached",
    "offline",
    "pending-transaction",
    "category-selected",
    "trend-scrub",
    "add-transaction",
    "scan-disabled",
    "delete-confirm",
    "save-success",
    "data-controls",
  ],
  31: [
    "budget-default",
    "transaction-default",
    "budget-low-confidence",
    "transaction-pending",
    "budget-honest-null",
    "transaction-honest-null",
    "skeleton",
    "error-cached",
    "offline",
    "budget-edit-disabled",
    "budget-save-success",
    "category-picker",
    "receipt-options",
    "delete-confirm",
    "delete-failure",
    "data-controls",
  ],
  32: [
    "default",
    "low-confidence",
    "empty",
    "error",
    "offline",
    "success",
    "disabled",
    "data-controls",
    "premium-preview",
    "log-action",
  ],
  33: [
    "default",
    "low-confidence",
    "empty",
    "error",
    "offline",
    "person-expanded",
    "log-success",
    "suggestion-skipped",
    "data-controls",
    "log-quality-time",
  ],
  34: [
    "default",
    "low-confidence",
    "empty",
    "prayer-api-error",
    "offline",
    "practice-success",
    "disabled",
    "data-controls",
    "read-more",
    "location-consent",
    "reflection",
    "contemplation-timer",
    "breathing-timer",
    "log-practice",
  ],
  35: [
    "default-real",
    "low-confidence",
    "honest-null",
    "skeleton",
    "error-import",
    "offline",
    "success-log",
    "disabled-import",
    "suggestion-done",
    "log-sheet",
    "course-controls",
  ],
  36: [
    "default-real",
    "low-confidence",
    "honest-null",
    "skeleton",
    "error-upload",
    "offline",
    "success-log",
    "disabled-media",
    "prompt-session",
    "journal-reflect",
    "milestone-detail",
    "data-controls",
  ],
  37: [
    "default-entries",
    "check-ins",
    "honest-null",
    "voice-null",
    "low-confidence",
    "skeleton",
    "error-cached",
    "offline",
    "compose-text",
    "compose-voice-consent",
    "save-success",
    "delete-confirm",
    "data-controls",
    "safety-open",
  ],
  38: [
    "today-real",
    "week",
    "month",
    "low-confidence",
    "honest-null",
    "skeleton",
    "error-cached",
    "offline",
    "check-success",
    "reminder-disabled",
    "add-habit",
    "data-controls",
    "cia-detail",
  ],
};
const cases = Object.entries(states).flatMap(([id, list]) =>
  list.map((state) => ({ id, state, name: `${id}-${state}` }))
);
const textCases = Object.entries(states).map(([id, list]) => ({
  id,
  state: list[0],
  name: `${id}-text-scale-proof`,
  textScale: 1.25,
}));
if (cases.length !== 114 || textCases.length !== 9)
  throw new Error(
    `Frozen G1 matrix drift: ${cases.length}+${textCases.length}`
  );

const productFiles = [
  "S30FinanceMoneyMap.tsx",
  "S31BudgetDetail.tsx",
  "S32CareerDashboard.tsx",
  "S33RelationshipsDashboard.tsx",
  "S34SpiritualityDashboard.tsx",
  "S35LearningDashboard.tsx",
  "S36CreativityDashboard.tsx",
  "S37Journal.tsx",
  "S38Habits.tsx",
  /*
  "S57ShoppingList.tsx",
  "S58SleepTracking.tsx",
  "S60MedicationTracking.tsx",
  "S62QuickNotes.tsx",
  "S63EnergyTracking.tsx",
  "S70ExerciseLibrary.tsx",
  "S86VirtualTryon.tsx",
  "S87TryonHistory.tsx",
  "S88VisionSuite.tsx",
  "S89Wellbeing.tsx",
*/
].map((file) => `src/components/hifi/screens/domains/${file}`);
const apiFiles = [
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "src/app/screens/[id]/page.tsx",
  "src/components/hifi/HifiPrototype.tsx",
  "src/components/hifi/screens/registry.ts",
  "scripts/verify-g1-domains.mjs",
];
const acceptedF2Evidence =
  "plans/batches/VISUAL-012-F2-health-care-media/evidence/f2-acceptance-final-v2.json";
const acceptedF2Additions =
  "plans/batches/VISUAL-013-G1-domains-finance-growth/evidence/ACCEPTED-F2-ADDITIONS-BEFORE.sha256";

const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
async function deterministicPixels(first, second) {
  if (sha(first) === sha(second))
    return { equivalent: true, differentBytes: 0, maxDelta: 0 };
  const [a, b] = await Promise.all([
    sharp(first).raw().toBuffer(),
    sharp(second).raw().toBuffer(),
  ]);
  if (a.length !== b.length)
    return { equivalent: false, differentBytes: Infinity, maxDelta: Infinity };
  let differentBytes = 0;
  let maxDelta = 0;
  for (let index = 0; index < a.length; index += 1) {
    const delta = Math.abs(a[index] - b[index]);
    if (delta) differentBytes += 1;
    if (delta > maxDelta) maxDelta = delta;
  }
  return {
    equivalent: differentBytes <= 10 && maxDelta <= 1,
    differentBytes,
    maxDelta,
  };
}
function fingerprint(files, base = root) {
  const rows = files.map((file) => ({
    path: file,
    sha256: sha(fs.readFileSync(path.resolve(base, file))),
  }));
  return {
    digest: sha(
      Buffer.from(rows.map((row) => `${row.sha256}  ${row.path}`).join("\n"))
    ),
    files: rows,
  };
}
function acceptedFingerprint() {
  const prior = JSON.parse(
    fs.readFileSync(path.resolve(repo, acceptedF2Evidence), "utf8")
  );
  const rows =
    prior?.integrity?.start?.accepted?.files?.map((row) => ({ ...row })) ?? [];
  const seen = new Set();
  for (const row of rows) {
    if (!/^[a-f0-9]{64}$/.test(row.sha256) || typeof row.path !== "string")
      throw new Error("Malformed inherited accepted sentinel");
    if (seen.has(row.path))
      throw new Error(`Overlapping accepted sentinel: ${row.path}`);
    seen.add(row.path);
  }
  for (const manifest of [acceptedF2Additions]) {
    for (const line of fs
      .readFileSync(path.resolve(repo, manifest), "utf8")
      .trim()
      .split("\n")) {
      const match = line.match(/^([a-f0-9]{64})  (.+)$/);
      if (!match) throw new Error(`Malformed accepted-sentinel row: ${line}`);
      if (seen.has(match[2]))
        throw new Error(`Overlapping accepted sentinel: ${match[2]}`);
      seen.add(match[2]);
      rows.push({ sha256: match[1], path: match[2] });
    }
  }
  if (rows.length !== 81)
    throw new Error(
      `Accepted sentinel union must contain exactly 81 files, received ${rows.length}`
    );
  for (const row of rows)
    if (sha(fs.readFileSync(path.resolve(repo, row.path))) !== row.sha256)
      throw new Error(`Accepted sentinel drift: ${row.path}`);
  return {
    digest: sha(
      Buffer.from(rows.map((row) => `${row.sha256}  ${row.path}`).join("\n"))
    ),
    files: rows,
  };
}

const result = {
  auditedAt: new Date().toISOString(),
  baseURL,
  phoneFrame: { width: 390, height: 844 },
  expectedContexts: 123,
  expectedScreenshots: 114,
  checks: [],
  cases: [],
  screenshots: [],
  consoleErrors: [],
  pageErrors: [],
  capabilityEvents: [],
  externalRequests: [],
  status: "fail",
};
function check(ok, label, evidence = null) {
  result.checks.push({ label, ok: Boolean(ok), evidence });
  if (!ok) throw new Error(label);
}

async function addGuards(context) {
  await context.addInitScript(
    ({ allowedOrigin }) => {
      const events = [];
      Object.defineProperty(window, "__g1CapabilityEvents", { value: events });
      const record = (type, detail = "") =>
        events.push({ type, detail: String(detail) });
      const reject =
        (type) =>
        (...args) => {
          record(type, args[0]);
          return Promise.reject(new Error(`${type} blocked by G1 verifier`));
        };
      const nativeFetch = window.fetch.bind(window);
      window.fetch = (...args) => {
        const u = new URL(
          args[0] instanceof Request ? args[0].url : String(args[0]),
          location.href
        );
        return u.origin === allowedOrigin
          ? nativeFetch(...args)
          : reject("fetch")(...args);
      };
      const nativeOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        const u = new URL(String(url), location.href);
        if (u.origin === allowedOrigin)
          return nativeOpen.call(this, method, url, ...rest);
        record("xhr", `${method} ${url}`);
        throw new Error("xhr blocked");
      };
      window.WebSocket = class {
        constructor(url) {
          record("websocket", url);
          throw new Error("websocket blocked");
        }
      };
      window.EventSource = class {
        constructor(url) {
          record("eventsource", url);
          throw new Error("eventsource blocked");
        }
      };
      if (navigator.sendBeacon)
        navigator.sendBeacon = (...args) => {
          record("beacon", args[0]);
          return false;
        };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition = () => record("geolocation");
        navigator.geolocation.watchPosition = () => {
          record("geolocation-watch");
          return 0;
        };
      }
      if (navigator.mediaDevices)
        navigator.mediaDevices.getUserMedia = reject("media");
      if (navigator.share) navigator.share = reject("share");
      if (navigator.clipboard)
        navigator.clipboard.writeText = reject("clipboard");
      if (navigator.credentials)
        navigator.credentials.get = reject("credentials");
      if (navigator.vibrate)
        navigator.vibrate = (...args) => {
          record("vibration", args.join(","));
          return false;
        };
      if ("PaymentRequest" in window)
        window.PaymentRequest = class {
          constructor() {
            record("payment");
            throw new Error("payment blocked");
          }
        };
      if ("Notification" in window)
        window.Notification = class {
          constructor() {
            record("notification");
            throw new Error("notification blocked");
          }
          static requestPermission() {
            record("notification-permission");
            return Promise.resolve("denied");
          }
        };
      const nativeClick = HTMLInputElement.prototype.click;
      HTMLInputElement.prototype.click = function (...args) {
        if (this.type === "file") {
          record("file-picker");
          return;
        }
        return nativeClick.apply(this, args);
      };
      document.addEventListener(
        "click",
        (event) => {
          const anchor =
            event.target instanceof Element ? event.target.closest("a") : null;
          if (!anchor) return;
          const u = new URL(anchor.href, location.href);
          if (u.origin !== allowedOrigin || anchor.hasAttribute("download")) {
            record("external-navigation", u.href);
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        },
        true
      );
    },
    { allowedOrigin: origin.origin }
  );
}

async function settle(page) {
  await page.locator('[data-testid="phone-frame"]').waitFor();
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scrollbar-color:transparent transparent!important}::-webkit-scrollbar{display:none!important}",
  });
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )
  );
}
async function applyTextScale(page, scale) {
  return page
    .locator('[data-testid="phone-frame"]')
    .evaluate((phone, requestedScale) => {
      const measured = [];
      for (const element of [phone, ...phone.querySelectorAll("*")]) {
        if (element.closest('[aria-hidden="true"],.sr-only')) continue;
        const directText = [...element.childNodes].some(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
        );
        if (
          !directText &&
          !["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName)
        )
          continue;
        const base = Number.parseFloat(getComputedStyle(element).fontSize);
        if (!Number.isFinite(base) || base <= 0) continue;
        element.style.setProperty(
          "font-size",
          `${base * requestedScale}px`,
          "important"
        );
        measured.push({ element, base });
      }
      const ratios = measured.map(
        ({ element, base }) =>
          Number.parseFloat(getComputedStyle(element).fontSize) / base
      );
      return { count: ratios.length, minimumRatio: Math.min(...ratios) };
    }, scale);
}
async function auditLayout(page, name) {
  const evidence = await page
    .locator('[data-testid="phone-frame"]')
    .evaluate((phone) => {
      const frame = phone.getBoundingClientRect();
      const visible = (el) => {
        const r = el.getBoundingClientRect(),
          s = getComputedStyle(el);
        return (
          r.width > 0 &&
          r.height > 0 &&
          s.display !== "none" &&
          s.visibility !== "hidden" &&
          r.bottom > frame.top &&
          r.top < frame.bottom
        );
      };
      const controls = [
        ...phone.querySelectorAll(
          'button,a,input,select,textarea,[role="button"]'
        ),
      ].filter(visible);
      const nameOf = (el) =>
        el.getAttribute("aria-label") ||
        el.getAttribute("title") ||
        el.textContent?.trim() ||
        ("labels" in el &&
          [...el.labels].map((label) => label.textContent?.trim()).join(" "));
      const targetRect = (el) => {
        const own = el.getBoundingClientRect();
        if (own.width >= 43.5 && own.height >= 43.5) return own;
        if ("labels" in el) {
          const label = [...el.labels].find((candidate) => visible(candidate));
          if (label) return label.getBoundingClientRect();
        }
        return own;
      };
      return {
        frame: {
          width: Math.round(frame.width),
          height: Math.round(frame.height),
        },
        overflow: Math.max(
          phone.scrollWidth - phone.clientWidth,
          document.documentElement.scrollWidth -
            document.documentElement.clientWidth
        ),
        small: controls
          .map((el) => {
            const r = targetRect(el);
            return { name: nameOf(el), width: r.width, height: r.height };
          })
          .filter((x) => x.width < 43.5 || x.height < 43.5),
        unnamed: controls.filter((el) => !nameOf(el)).length,
        wrongCoach: /\b(?:SIA|Sia|Cia)\b/.test(phone.innerText),
        nested: phone.querySelectorAll("button button,button a,a button,a a")
          .length,
      };
    });
  check(
    evidence.frame.width === 390 && evidence.frame.height === 844,
    `${name}: phone frame 390x844`,
    evidence.frame
  );
  check(
    evidence.overflow <= 1,
    `${name}: no horizontal overflow`,
    evidence.overflow
  );
  check(
    evidence.small.length === 0,
    `${name}: visible controls meet 44px`,
    evidence.small
  );
  check(
    evidence.unnamed === 0,
    `${name}: visible controls are named`,
    evidence.unnamed
  );
  check(!evidence.wrongCoach, `${name}: visible coach name is all-caps CIA`);
  check(
    evidence.nested === 0,
    `${name}: no nested interactive controls`,
    evidence.nested
  );
}

const semantic = {
  "30-default-real": /\$2,150[\s\S]*\$5,000[\s\S]*\+\$2,850/i,
  "30-honest-null": /not enough|no .*data|unavailable/i,
  "30-pending-transaction": /pending/i,
  "30-data-controls":
    /category[\s\S]*source[\s\S]*scope[\s\S]*freshness[\s\S]*confidence[\s\S]*retention[\s\S]*export[\s\S]*revoke[\s\S]*delete/is,
  "31-budget-default": /(?=[\s\S]*\$480)(?=[\s\S]*\$620)(?=[\s\S]*77%)/i,
  "31-transaction-default":
    /(?=[\s\S]*Trader Joe.?s)(?=[\s\S]*Groceries)(?=[\s\S]*\$42\.10)/i,
  "31-transaction-pending": /pending/i,
  "31-delete-confirm": /(?=[\s\S]*Trader Joe.?s)(?=[\s\S]*\$42\.10)/i,
  "31-data-controls":
    /category[\s\S]*source[\s\S]*scope[\s\S]*freshness[\s\S]*confidence[\s\S]*retention[\s\S]*export[\s\S]*revoke[\s\S]*delete/is,
  "32-default": /(?=[\s\S]*1 remaining)(?=[\s\S]*10)/i,
  "32-premium-preview": /premium|upgrade/i,
  "33-default": /84 out of 99/i,
  "34-default": /bundled demo|local demo/i,
  "34-location-consent": /location[\s\S]*(?:consent|preview)/i,
  "35-default-real":
    /(?=[\s\S]*9\s*(?:\/|of)\s*15)(?=[\s\S]*60%)(?=[\s\S]*62%)/i,
  "35-course-controls": /retention|export|revoke|delete/i,
  "36-default-real": /non-scored|future extension|Explore/i,
  "36-disabled-media": /disabled|unavailable|no recording capability/i,
  "37-default-entries": /private|local/i,
  "37-compose-voice-consent": /voice[\s\S]*consent/i,
  "37-delete-confirm": /delete/i,
  "38-today-real": /(?=[\s\S]*5\s*(?:\/|of)\s*8)(?=[\s\S]*63%)/i,
  "38-cia-detail":
    /association[\s\S]*not causation|not causation[\s\S]*association/i,
};
async function semanticChecks(page, test) {
  const marker = page.locator(
    `[data-g1-state="${test.id}-${test.state}"],[data-state="${test.id}-${test.state}"]`
  );
  check((await marker.count()) === 1, `${test.name}: exact state marker`);
  const body = await page.locator('[data-testid="phone-frame"]').innerText();
  const pattern = semantic[test.name];
  if (pattern)
    check(
      pattern.test(body),
      `${test.name}: state-specific semantic proof`,
      body.slice(0, 1600)
    );
  if (test.name === "31-budget-default") {
    const meter = await page.evaluate(() => {
      const ring = document.querySelector(
        '[data-testid="budget-progress-ring"] [role="img"]'
      );
      const arc = ring?.querySelectorAll("circle")[1];
      const bar = document.querySelector(
        '[data-testid="budget-progress-bar"] > div > div'
      );
      const dash = arc?.getAttribute("stroke-dasharray") ?? "";
      const [filled, circumference] = dash.split(/\s+/).map(Number);
      return {
        ringLabel: ring?.getAttribute("aria-label") ?? "",
        ringPercent:
          Number.isFinite(filled) && Number.isFinite(circumference)
            ? Math.round((filled / circumference) * 100)
            : null,
        barWidth: bar instanceof HTMLElement ? bar.style.width : "",
      };
    });
    check(
      meter.ringLabel === "Spent 77%",
      `${test.name}: ring uses concise accessible label`,
      meter
    );
    check(
      meter.ringPercent === 77 && meter.barWidth === "77%",
      `${test.name}: ring and bar geometry match 77% financial truth`,
      meter
    );
  }
  check(
    !/\b(?:Lv\.?|Lvl)\s*(?:12|8|5|3)\b/i.test(body),
    `${test.name}: unsupported level copy absent`
  );
  if (["35", "36"].includes(test.id))
    check(
      !/Domain Stat|Life Power contribution/i.test(body),
      `${test.name}: Explore extension is not presented as scored RPG stat`
    );
  if (test.id === "34")
    check(
      !/eleventh stat|domain-spirituality/i.test(body),
      `${test.name}: Spirituality remains Faith display alias`
    );
  if (test.id === "38")
    check(
      !/\bHealth\b/i.test(body),
      `${test.name}: unregistered Health category absent`
    );
  if (/data-controls|course-controls/.test(test.state))
    check(
      /category[\s\S]*source[\s\S]*scope[\s\S]*freshness[\s\S]*confidence[\s\S]*retention[\s\S]*export[\s\S]*revoke[\s\S]*delete/is.test(
        body
      ),
      `${test.name}: complete nine-field data controls remain visible`
    );
  if (/honest-null|low-confidence|error|offline/.test(test.state))
    check(
      !/causes|proves|guarantees/i.test(body),
      `${test.name}: no unsupported derived causal claim`
    );
}

async function keyboardActivate(locator) {
  await locator.focus();
  await locator.press("Space");
}
async function interactionChecks(page, id, name) {
  const frame = page.locator('[data-testid="phone-frame"]');
  const clickAndRequireOutcome = async (pattern) => {
    const trigger = page.getByRole("button", { name: pattern }).first();
    if (
      !(await trigger.count()) ||
      !(await trigger.isVisible()) ||
      !(await trigger.isEnabled())
    )
      return false;
    const before = await frame.innerText();
    await keyboardActivate(trigger);
    await settle(page);
    const after = await frame.innerText();
    check(
      after !== before || (await page.getByRole("dialog").count()) > 0,
      `${name}: ${pattern} has a deterministic local outcome`
    );
    return true;
  };

  if (id === "30") {
    for (const p of [
      /Ask CIA/i,
      /see all budgets/i,
      /adjust/i,
      /see all transactions/i,
    ])
      await clickAndRequireOutcome(p);
    const category = page
      .getByRole("button", { name: /Dining.*\$650/i })
      .first();
    if (await category.count()) {
      await keyboardActivate(category);
      check(
        (await category.getAttribute("aria-pressed")) === "true",
        `${name}: category selection is semantic`
      );
    }
  }
  if (id === "31") {
    for (const label of ["Transaction", "Budget"]) {
      const tab = page.getByRole("tab", { name: label });
      await keyboardActivate(tab);
      check(
        (await tab.getAttribute("aria-selected")) === "true",
        `${name}: ${label} tab activates`
      );
      check(
        (await page
          .getByRole("tabpanel", { name: new RegExp(label, "i") })
          .count()) === 1,
        `${name}: ${label} tab owns a named panel`
      );
    }
    await clickAndRequireOutcome(/Ask CIA/i);
  }
  if (id === "32") {
    await clickAndRequireOutcome(/deep work|complete|open action/i);
    await clickAndRequireOutcome(/create mission|log action/i);
  }
  if (id === "33") {
    await clickAndRequireOutcome(/Ahmed/i);
    await clickAndRequireOutcome(/log quality time|add person/i);
  }
  if (id === "34") {
    const practice = page.getByRole("button", { name: /Fajr/i }).first();
    if (await practice.count()) {
      const before = await practice.getAttribute("aria-pressed");
      await keyboardActivate(practice);
      check(
        (await practice.getAttribute("aria-pressed")) !== before,
        `${name}: practice completion toggles by keyboard`
      );
    }
  }
  if (id === "35") {
    await clickAndRequireOutcome(/add book|suggestion|log learning/i);
  }
  if (id === "36") {
    await clickAndRequireOutcome(/add project|start creating|log creativity/i);
  }
  if (id === "37") {
    for (const label of ["Check-ins", "Entries"]) {
      const tab = page.getByRole("tab", { name: label });
      await keyboardActivate(tab);
      check(
        (await tab.getAttribute("aria-selected")) === "true",
        `${name}: ${label} tab activates`
      );
    }
    await clickAndRequireOutcome(/new entry|write|compose/i);
  }
  if (id === "38") {
    for (const label of ["Week", "Month", "Today"]) {
      const tab = page.getByRole("tab", { name: label });
      await keyboardActivate(tab);
      check(
        (await tab.getAttribute("aria-selected")) === "true",
        `${name}: ${label} tab activates`
      );
    }
    await clickAndRequireOutcome(/add habit/i);
  }
}

async function stateSpecificChecks(page, test) {
  const body = await page.locator('[data-testid="phone-frame"]').innerText();
  const dialog = page.getByRole("dialog").last();
  if (await dialog.count()) {
    check(
      await dialog.evaluate((node) => node.contains(document.activeElement)),
      `${test.name}: seeded dialog receives focus`
    );
    await page.keyboard.press("Tab");
    check(
      await dialog.evaluate((node) => node.contains(document.activeElement)),
      `${test.name}: seeded dialog traps forward focus`
    );
    await page.keyboard.press("Shift+Tab");
    check(
      await dialog.evaluate((node) => node.contains(document.activeElement)),
      `${test.name}: seeded dialog traps reverse focus`
    );
  }
  if (test.name === "30-delete-confirm" || test.name === "31-delete-confirm")
    check(
      /Trader Joe.?s[\s\S]*\$42\.10/i.test(body),
      `${test.name}: destructive confirmation names exact posted item`
    );
  if (
    test.name === "30-pending-transaction" ||
    test.name === "31-transaction-pending"
  )
    check(
      (await page.getByRole("button", { name: /delete/i }).count()) === 0 ||
        (await page
          .getByRole("button", { name: /delete/i })
          .first()
          .isDisabled()),
      `${test.name}: pending item cannot be deleted`
    );
  if (test.name === "32-disabled")
    check(
      (await page.locator("button:disabled").count()) >= 1,
      `${test.name}: blocked action is natively disabled`
    );
  if (test.name === "34-location-consent")
    check(
      /bundled demo|preview-only|no device location/i.test(body),
      `${test.name}: location consent remains capability honest`
    );
  if (
    test.name === "35-disabled-import" ||
    test.name === "36-disabled-media" ||
    test.name === "38-reminder-disabled"
  )
    check(
      (await page.locator("button:disabled").count()) >= 1,
      `${test.name}: unavailable mutation is disabled`
    );
  if (test.name === "37-compose-voice-consent")
    check(
      /consent[\s\S]*voice|voice[\s\S]*consent/i.test(body),
      `${test.name}: voice preview requires explicit consent`
    );
  if (test.name === "37-delete-confirm")
    check(
      (await page.getByRole("dialog").count()) === 1,
      `${test.name}: destructive preview is a dialog`
    );
}

async function run() {
  fs.rmSync(candidateDir, { recursive: true, force: true });
  fs.mkdirSync(candidateDir, { recursive: true });
  const buildFile = path.join(root, ".next/BUILD_ID");
  check(fs.existsSync(buildFile), "current production BUILD_ID exists");
  const buildId = fs.readFileSync(buildFile, "utf8").trim();
  check(Boolean(buildId), "current production BUILD_ID is non-empty");
  const newestProduct = Math.max(
    ...productFiles.map((file) => fs.statSync(path.resolve(root, file)).mtimeMs)
  );
  check(
    fs.statSync(buildFile).mtimeMs + 1 >= newestProduct,
    "production build is newer than G1 product sources"
  );
  const served = await (
    await fetch(
      new URL(`/screens/30?__g1build=${encodeURIComponent(buildId)}`, baseURL)
    )
  ).text();
  check(
    served.includes(buildId),
    "served production HTML binds current BUILD_ID",
    buildId
  );
  result.productionBuild = {
    buildId,
    mode: "next start production",
    port: "3002",
  };
  result.integrity = {
    start: {
      product: fingerprint(productFiles),
      api: fingerprint(apiFiles),
      accepted: acceptedFingerprint(),
    },
  };
  const executablePath =
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const browser = await chromium.launch(
    fs.existsSync(executablePath) ? { executablePath } : {}
  );
  let nonce = 0;
  try {
    for (const test of [...cases, ...textCases]) {
      nonce += 1;
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
      });
      await addGuards(context);
      const page = await context.newPage();
      page.on("console", (message) => {
        if (message.type() === "error")
          result.consoleErrors.push({ case: test.name, text: message.text() });
      });
      page.on("pageerror", (error) =>
        result.pageErrors.push({ case: test.name, text: String(error) })
      );
      page.on("request", (request) => {
        const requested = new URL(request.url());
        if (requested.origin !== origin.origin)
          result.externalRequests.push({
            case: test.name,
            method: request.method(),
            url: request.url(),
          });
      });
      const url = new URL(`/screens/${test.id}`, baseURL);
      url.searchParams.set("state", test.state);
      url.searchParams.set("__g1audit", String(nonce));
      await page.goto(url.toString(), { waitUntil: "networkidle" });
      await settle(page);
      await semanticChecks(page, test);
      if (test.textScale) {
        const proof = await applyTextScale(page, test.textScale);
        check(
          proof.count >= 10 && proof.minimumRatio >= 1.249,
          `${test.name}: actual 125% font-size proof`,
          proof
        );
      }
      await auditLayout(page, test.name);
      if (!test.textScale && test.state === states[test.id][0]) {
        await interactionChecks(page, test.id, test.name);
        await page.goto(url.toString(), { waitUntil: "networkidle" });
        await settle(page);
        await semanticChecks(page, test);
      }
      if (!test.textScale) {
        await stateSpecificChecks(page, test);
        if (
          [
            "86-empty-unconsented",
            "88-disabled",
            "88-consent-off",
            "89-module-disabled",
          ].includes(test.name)
        ) {
          await page.goto(url.toString(), { waitUntil: "networkidle" });
          await settle(page);
          await semanticChecks(page, test);
        }
      }
      const capability = await page.evaluate(
        () => window.__g1CapabilityEvents ?? []
      );
      result.capabilityEvents.push(
        ...capability.map((event) => ({ case: test.name, ...event }))
      );
      const storage = await page.evaluate(async () => ({
        local: Object.keys(localStorage),
        session: Object.keys(sessionStorage),
        databases: indexedDB.databases
          ? (await indexedDB.databases()).map((db) => db.name)
          : [],
        caches: "caches" in window ? await caches.keys() : [],
      }));
      const cookies = await context.cookies();
      check(
        storage.local.length +
          storage.session.length +
          storage.databases.length +
          storage.caches.length ===
          0 && cookies.length === 0,
        `${test.name}: isolated storage and cookies`,
        { storage, cookies: cookies.length }
      );
      if (!test.textScale) {
        await page.waitForTimeout(500);
        const content = page.locator('[data-testid="screen-content"]');
        await content.evaluate((node) => {
          node.scrollTop = 0;
        });
        await page.evaluate(
          () =>
            new Promise((resolve) =>
              requestAnimationFrame(() => requestAnimationFrame(resolve))
            )
        );
        const phone = page.locator('[data-testid="phone-frame"]');
        const top = await phone.screenshot();
        if ((await page.getByRole("dialog").count()) === 0)
          await content.evaluate((node) => {
            node.scrollTop = node.scrollHeight;
          });
        if (await page.getByRole("dialog").count())
          await page
            .getByRole("dialog")
            .last()
            .evaluate((node) => {
              node.scrollTop = Math.min(
                node.scrollHeight,
                Math.max(0, node.scrollHeight - node.clientHeight)
              );
            });
        await page.waitForTimeout(500);
        await page.evaluate(
          () =>
            new Promise((resolve) =>
              requestAnimationFrame(() => requestAnimationFrame(resolve))
            )
        );
        const bottom = await phone.screenshot();
        const first = await sharp({
          create: {
            width: 390,
            height: 1688,
            channels: 4,
            background: "#0A0A0F",
          },
        })
          .composite([
            { input: top, top: 0, left: 0 },
            { input: bottom, top: 844, left: 0 },
          ])
          .png()
          .toBuffer();
        await page.waitForTimeout(500);
        await page.evaluate(
          () =>
            new Promise((resolve) =>
              requestAnimationFrame(() => requestAnimationFrame(resolve))
            )
        );
        const secondBottom = await phone.screenshot();
        const second = await sharp({
          create: {
            width: 390,
            height: 1688,
            channels: 4,
            background: "#0A0A0F",
          },
        })
          .composite([
            { input: top, top: 0, left: 0 },
            { input: secondBottom, top: 844, left: 0 },
          ])
          .png()
          .toBuffer();
        const pixelStability = await deterministicPixels(first, second);
        check(
          pixelStability.equivalent,
          `${test.name}: deterministic consecutive captures`,
          { first: sha(first), second: sha(second), ...pixelStability }
        );
        fs.writeFileSync(path.join(candidateDir, `${test.name}.png`), second);
        result.screenshots.push({
          name: `${test.name}.png`,
          sha256: sha(second),
        });
      }
      result.cases.push({
        ...test,
        nonce: String(nonce),
        storage,
        cookies: cookies.length,
      });
      await context.close();
      process.stdout.write(`[${nonce}/123] ${test.name} ok\n`);
    }
  } finally {
    await browser.close();
  }
  result.integrity.end = {
    product: fingerprint(productFiles),
    api: fingerprint(apiFiles),
    accepted: acceptedFingerprint(),
  };
  check(
    JSON.stringify(result.integrity.start) ===
      JSON.stringify(result.integrity.end),
    "product/API/81-sentinel start-end fingerprints stable"
  );
  check(
    result.cases.length === 123 && result.screenshots.length === 114,
    "exact 123 contexts and 114 PNGs",
    { contexts: result.cases.length, screenshots: result.screenshots.length }
  );
  for (const id of Object.keys(states)) {
    const rows = result.screenshots.filter((item) =>
      item.name.startsWith(`${id}-`)
    );
    const duplicates = rows.filter(
      (row, index) =>
        rows.findIndex((other) => other.sha256 === row.sha256) !== index
    );
    check(
      duplicates.length === 0,
      `${id}: materially distinct state PNGs have unique hashes`,
      duplicates
    );
  }
  check(
    result.consoleErrors.length === 0 &&
      result.pageErrors.length === 0 &&
      result.capabilityEvents.length === 0 &&
      result.externalRequests.length === 0,
    "zero console/page/capability/external-request events",
    {
      console: result.consoleErrors,
      page: result.pageErrors,
      capability: result.capabilityEvents,
      externalRequests: result.externalRequests,
    }
  );
  fs.rmSync(shotsDir, { recursive: true, force: true });
  fs.renameSync(candidateDir, shotsDir);
  result.screenshotPromotion = "promoted-pass-atomically-after-all-assertions";
  result.status = "pass";
}

try {
  await run();
} catch (error) {
  result.error = String(error);
  fs.rmSync(candidateDir, { recursive: true, force: true });
  process.exitCode = 1;
}
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
console.log(
  JSON.stringify(
    {
      status: result.status,
      build: result.productionBuild?.buildId,
      contexts: result.cases.length,
      screenshots: result.screenshots.length,
      checks: result.checks.length,
      console: result.consoleErrors.length,
      page: result.pageErrors.length,
      capability: result.capabilityEvents.length,
      externalRequests: result.externalRequests.length,
      error: result.error,
    },
    null,
    2
  )
);
