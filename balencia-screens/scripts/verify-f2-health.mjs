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
    "Usage: node scripts/verify-f2-health.mjs <baseURL> <out-json> <shots-dir>"
  );
  process.exit(2);
}
const origin = new URL(baseURL);
if (origin.hostname !== "localhost" || origin.port !== "3002")
  throw new Error("F2 acceptance requires local production port 3002");
const outPath = path.resolve(root, outArg);
const shotsDir = path.resolve(root, shotsArg);
const candidateDir = `${shotsDir}.candidate`;

const states = {
  57: [
    "default",
    "low-confidence",
    "honest-null",
    "skeleton",
    "error-cached",
    "offline",
    "check-undo",
    "all-done",
    "sync-disabled",
    "edit-item",
    "data-controls",
  ],
  58: [
    "default-real",
    "low-confidence",
    "honest-null",
    "manual-only",
    "skeleton",
    "sync-error-cached",
    "offline",
    "range-14d",
    "manual-disabled",
    "manual-success",
    "data-controls",
    "safety-open",
  ],
  60: [
    "default-real",
    "roster-low-confidence",
    "honest-null",
    "skeleton",
    "heatmap-error-cached",
    "dose-success",
    "all-doses-complete",
    "add-disabled",
    "add-valid",
    "free-paywall",
    "data-controls",
  ],
  62: [
    "default-real",
    "low-confidence",
    "honest-null",
    "skeleton",
    "empty",
    "search-empty",
    "error",
    "success",
    "offline",
    "disabled",
    "data-controls",
  ],
  63: [
    "premium-real",
    "free-preview",
    "low-confidence",
    "honest-null",
    "skeleton",
    "error",
    "success",
    "offline",
    "disabled",
    "data-controls",
  ],
  70: [
    "default",
    "skeleton",
    "empty",
    "error-list",
    "offline",
    "detail",
    "error-detail",
    "success",
    "disabled",
    "media-low-confidence",
    "media-null",
    "data-controls",
  ],
  86: [
    "default-consented",
    "empty-unconsented",
    "skeleton",
    "safety-unclear",
    "render-error",
    "success",
    "consent-revoked",
    "offline-disabled",
    "delete-confirm",
    "data-controls",
  ],
  87: [
    "default",
    "filter-shared",
    "filter-deleting",
    "empty",
    "skeleton",
    "low-confidence",
    "offline-cached",
    "error",
    "reuse-success",
    "delete-confirm",
    "delete-pending",
    "data-controls",
  ],
  88: [
    "default",
    "eye-test-null",
    "exercise-active",
    "exercise-success",
    "strain-low-confidence",
    "empty",
    "skeleton",
    "error",
    "disabled",
    "offline",
    "consent-off",
    "data-controls",
  ],
  89: [
    "default-real",
    "low-confidence",
    "honest-null",
    "skeleton",
    "source-error",
    "offline",
    "mood-success",
    "breathing-success",
    "module-disabled",
    "low-motivation",
    "what-this-logs",
    "data-controls",
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
if (cases.length !== 113 || textCases.length !== 10)
  throw new Error(
    `Frozen F2 matrix drift: ${cases.length}+${textCases.length}`
  );

const productFiles = [
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
].map((file) => `src/components/hifi/screens/health/${file}`);
const apiFiles = [
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "src/app/screens/[id]/page.tsx",
  "src/components/hifi/HifiPrototype.tsx",
  "src/components/hifi/screens/registry.ts",
  "scripts/verify-f2-health.mjs",
];
const manifests = [
  "plans/batches/VISUAL-011-F1-health-fitness-nutrition/evidence/ACCEPTED-E1-SENTINELS-BEFORE.sha256",
  "plans/batches/VISUAL-012-F2-health-care-media/evidence/ACCEPTED-F1-ADDITIONS-BEFORE.sha256",
];

const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
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
  const rows = [];
  const seen = new Set();
  for (const manifest of manifests) {
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
  if (rows.length !== 71)
    throw new Error(
      `Accepted sentinel union must contain exactly 71 files, received ${rows.length}`
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
  expectedScreenshots: 113,
  checks: [],
  cases: [],
  screenshots: [],
  consoleErrors: [],
  pageErrors: [],
  capabilityEvents: [],
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
      Object.defineProperty(window, "__f2CapabilityEvents", { value: events });
      const record = (type, detail = "") =>
        events.push({ type, detail: String(detail) });
      const reject =
        (type) =>
        (...args) => {
          record(type, args[0]);
          return Promise.reject(new Error(`${type} blocked by F2 verifier`));
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
  "57-default": /2 of 8|25%/i,
  "57-honest-null": /no items|not enough|nothing|empty/i,
  "57-check-undo": /undo/i,
  "57-data-controls": /retention|delete|export/i,
  "58-default-real": /sleep score 82|7\.2/i,
  "58-manual-only": /manual/i,
  "58-range-14d": /14d/i,
  "58-safety-open": /health professional|emergency|support/i,
  "60-default-real": /three of four|75%/i,
  "60-honest-null": /no medications/i,
  "60-free-paywall": /premium information preview/i,
  "60-data-controls": /retention|delete|revoke/i,
  "62-default-real": /12 this week/i,
  "62-search-empty": /no notes|clear/i,
  "62-offline": /offline|local/i,
  "62-data-controls": /retention|delete|export/i,
  "63-premium-real": /not causation/i,
  "63-free-preview": /preview|premium/i,
  "63-honest-null": /not enough|no energy/i,
  "63-data-controls": /retention|delete|export/i,
  "70-default": /532 exercises/i,
  "70-empty": /no exercises found/i,
  "70-detail": /general database guidance|not diagnosis/i,
  "70-media-null": /media unavailable/i,
  "86-default-consented": /consent/i,
  "86-empty-unconsented": /consent/i,
  "86-render-error": /could not|failed|retry/i,
  "86-consent-revoked": /revoked|consent/i,
  "87-default": /3 shown of 7|saved looks/i,
  "87-empty": /no saved|empty/i,
  "87-low-confidence": /low confidence|estimated/i,
  "87-delete-confirm": /delete/i,
  "88-default": /not diagnostic|non-diagnostic/i,
  "88-eye-test-null": /not enough|no .*result|unavailable/i,
  "88-exercise-active": /exercise|seconds|pause/i,
  "88-offline": /offline/i,
  "89-default-real": /2 .*sessions|two .*sessions/i,
  "89-offline": /crisis|urgent|emergency/i,
  "89-low-motivation": /Journal.*Mood.*Breathing.*Stress/is,
  "89-what-this-logs": /what this logs|source|retention/i,
};
async function semanticChecks(page, test) {
  check(
    (await page
      .locator(`[data-f2-state="${test.id}-${test.state}"]`)
      .count()) === 1,
    `${test.name}: exact state marker`
  );
  const body = await page.locator('[data-testid="phone-frame"]').innerText();
  const pattern = semantic[test.name];
  if (pattern)
    check(
      pattern.test(body),
      `${test.name}: state-specific semantic proof`,
      body.slice(0, 1200)
    );
  if (test.id === "58")
    check(
      !/missing[^\n]*0(?:\.0)?\s*h/i.test(body),
      `${test.name}: missing sleep is never rendered as zero`
    );
  if (test.name === "58-manual-only") {
    check(
      !/WHOOP|high confidence/i.test(body),
      `${test.name}: manual-only suppresses wearable provenance`
    );
    check(
      !/\b82\b|sleep reserve/i.test(body),
      `${test.name}: manual-only suppresses unsupported score and reserve`
    );
  }
  if (test.id === "60") {
    check(
      !/Adderall|mg\b|mcg\b/i.test(body),
      `${test.name}: neutral fictional medication fixture`
    );
    check(
      /Balencia does not recommend changing or skipping a dose/i.test(body),
      `${test.name}: medication safety copy`
    );
  }
  if (test.id === "88")
    check(
      /urgent|clinician|emergency|professional/i.test(body),
      `${test.name}: urgent guidance remains available`
    );
  if (test.id === "89")
    check(
      /crisis|urgent|emergency|support/i.test(body),
      `${test.name}: crisis resources remain available`
    );
}

async function keyboardActivate(locator) {
  await locator.focus();
  await locator.press("Space");
}
async function modalProof(page, trigger, action = "click") {
  await trigger.focus();
  if (action === "space") await trigger.press("Space");
  else await trigger.click();
  const dialog = page.getByRole("dialog").last();
  await dialog.waitFor();
  check(
    await dialog.evaluate((node) => node.contains(document.activeElement)),
    "dialog receives focus"
  );
  await page.keyboard.press("Tab");
  check(
    await dialog.evaluate((node) => node.contains(document.activeElement)),
    "dialog traps forward focus"
  );
  await page.keyboard.press("Shift+Tab");
  check(
    await dialog.evaluate((node) => node.contains(document.activeElement)),
    "dialog traps reverse focus"
  );
  await page.keyboard.press("Escape");
  check((await dialog.count()) === 0, "Escape closes dialog");
  await trigger.evaluate(
    (node) =>
      new Promise((resolve) => {
        const started = performance.now();
        const poll = () =>
          node === document.activeElement || performance.now() - started > 1000
            ? resolve(undefined)
            : requestAnimationFrame(poll);
        poll();
      })
  );
  check(
    await trigger.evaluate((node) => node === document.activeElement),
    "dialog restores trigger focus"
  );
}
async function firstByNames(page, role, patterns) {
  for (const pattern of patterns) {
    const item = page.getByRole(role, { name: pattern }).first();
    if (
      (await item.count()) &&
      (await item.isVisible()) &&
      (await item.isEnabled())
    )
      return item;
  }
  throw new Error(`No enabled ${role} matched ${patterns.join(", ")}`);
}
async function interactionChecks(page, id, name) {
  if (id === "57") {
    const box = page.getByRole("checkbox").first();
    const before = await box.isChecked();
    await keyboardActivate(box);
    check(
      (await box.isChecked()) !== before,
      `${name}: native checkbox responds to Space`
    );
    const undo = await firstByNames(page, "button", [/undo/i]);
    await keyboardActivate(undo);
    check((await box.isChecked()) === before, `${name}: undo restores item`);
    const edit = await firstByNames(page, "button", [/edit/i]);
    await keyboardActivate(edit);
    check(
      (await page.getByRole("status").allInnerTexts())
        .join(" ")
        .includes("Edit"),
      `${name}: explicit edit fallback has a visible local outcome`
    );
  }
  if (id === "58") {
    const tab = page.getByRole("tab", { name: "14d" });
    await keyboardActivate(tab);
    check(
      (await tab.getAttribute("aria-selected")) === "true",
      `${name}: range tab activates by Space`
    );
    await modalProof(
      page,
      await firstByNames(page, "button", [/log sleep manually/i]),
      "space"
    );
    await modalProof(
      page,
      await firstByNames(page, "button", [/data sources/i]),
      "space"
    );
    await modalProof(
      page,
      await firstByNames(page, "button", [/sleep support/i]),
      "space"
    );
  }
  if (id === "60") {
    const box = page.getByRole("checkbox").filter({ has: undefined }).last();
    const before = await box.isChecked();
    await keyboardActivate(box);
    check((await box.isChecked()) !== before, `${name}: dose toggles by Space`);
    await modalProof(
      page,
      await firstByNames(page, "button", [/add medication/i]),
      "space"
    );
    await modalProof(
      page,
      await firstByNames(page, "button", [/medication data controls/i]),
      "space"
    );
  }
  if (id === "62") {
    const input = await firstByNames(page, "textbox", [/note|capture|quick/i]);
    await input.fill("Local verification note");
    check(
      (await input.inputValue()) === "Local verification note",
      `${name}: controlled composer accepts input`
    );
    const filter = page
      .getByRole("tab")
      .filter({ hasText: /health/i })
      .first();
    if (await filter.count()) {
      await keyboardActivate(filter);
      check(
        (await filter.getAttribute("aria-selected")) === "true",
        `${name}: note filter activates`
      );
    }
  }
  if (id === "63") {
    const options = await firstByNames(page, "button", [/options/i]);
    await keyboardActivate(options);
    check(
      (await page.getByRole("status").allInnerTexts())
        .join(" ")
        .includes("options preview"),
      `${name}: energy options has a local outcome`
    );
    const note = page.getByRole("textbox").first();
    if (await note.count()) {
      await note.fill("Calm afternoon");
      check(
        (await note.inputValue()).includes("Calm"),
        `${name}: energy note controlled`
      );
    }
  }
  if (id === "70") {
    const sort = await firstByNames(page, "button", [/sort and filter/i]);
    await keyboardActivate(sort);
    check(
      (await page.getByRole("status").allInnerTexts())
        .join(" ")
        .includes("Sort and filter preview"),
      `${name}: sort and filter has a local outcome`
    );
    const search = page.getByRole("searchbox", { name: /search exercises/i });
    await search.fill("squat");
    check(
      (await search.inputValue()) === "squat",
      `${name}: exercise search controlled`
    );
    await search.fill("");
    const card = page.getByRole("button", { name: /difficulty/i }).first();
    await modalProof(page, card, "space");
  }
  if (id === "86") {
    check(
      (await page
        .locator('[data-testid="phone-frame"] a[href="/screens/87"]')
        .count()) === 1,
      `${name}: history has a real local route`
    );
    for (const pattern of [/use camera/i, /choose photo/i]) {
      const action = await firstByNames(page, "button", [pattern]);
      await keyboardActivate(action);
      check(
        (await page.getByRole("status").allInnerTexts())
          .join(" ")
          .includes("selected locally"),
        `${name}: ${pattern} has a local outcome`
      );
    }
    const del = page.getByRole("button", { name: /delete/i }).first();
    if ((await del.count()) && (await del.isEnabled()))
      await modalProof(page, del, "space");
  }
  if (id === "87") {
    const filter = page.getByRole("tab").nth(1);
    if (await filter.count()) {
      await keyboardActivate(filter);
      check(
        (await filter.getAttribute("aria-selected")) === "true",
        `${name}: history filter activates`
      );
    }
    const deletes = page.getByRole("button", { name: /delete/i });
    const second = deletes.nth(1);
    await second.focus();
    await second.press("Space");
    check(
      (await page
        .getByRole("dialog", { name: /Workday clean fit/i })
        .count()) === 1,
      `${name}: row delete confirmation names selected look`
    );
    await page.keyboard.press("Escape");
  }
  if (id === "88") {
    for (const label of ["Eye test", "Strain", "Exercises"]) {
      const tab = page.getByRole("tab", { name: label });
      await keyboardActivate(tab);
      check(
        (await tab.getAttribute("aria-selected")) === "true",
        `${name}: ${label} tab activates`
      );
      check(
        (await page.getByRole("tabpanel", { name: label }).count()) === 1,
        `${name}: ${label} tab controls distinct panel`
      );
    }
    const urgent = await firstByNames(page, "button", [
      /urgent|safety|guidance|help/i,
    ]);
    await modalProof(page, urgent, "space");
  }
  if (id === "89") {
    check(
      (await page
        .locator('[data-testid="phone-frame"] a[href="/screens/90"]')
        .count()) >= 1,
      `${name}: mood module has a real local route`
    );
    const logTrigger = await firstByNames(page, "button", [/quick mood log/i]);
    await logTrigger.focus();
    await logTrigger.press("Space");
    check(
      (await page.getByRole("dialog", { name: /what this logs/i }).count()) ===
        1,
      `${name}: sensitive save opens What this logs first`
    );
    await page.keyboard.press("Escape");
    await logTrigger.evaluate(
      (node) =>
        new Promise((resolve) => {
          const started = performance.now();
          const poll = () =>
            node === document.activeElement ||
            performance.now() - started > 1000
              ? resolve(undefined)
              : requestAnimationFrame(poll);
          poll();
        })
    );
    check(
      await logTrigger.evaluate((node) => node === document.activeElement),
      `${name}: sensitive-log dialog restores focus`
    );
    await modalProof(
      page,
      await firstByNames(page, "button", [
        /data and privacy|data controls|manage data/i,
      ]),
      "space"
    );
  }
}

async function stateSpecificChecks(page, test) {
  if (test.name === "70-default")
    check(
      (await page
        .locator(
          '[data-asset-disposition="HIFI-70-01-code-native-instructional"]'
        )
        .count()) >= 1,
      `${test.name}: exact HIFI-70 disposition marker`
    );
  if (test.name === "86-empty-unconsented") {
    const accept = await firstByNames(page, "button", [
      /accept preview-only access/i,
    ]);
    await keyboardActivate(accept);
    check(
      (await page.locator('[data-consent-state="accepted"]').count()) === 1,
      `${test.name}: consent can be accepted`
    );
    check(
      await page.getByRole("button", { name: /use camera/i }).isEnabled(),
      `${test.name}: capture enables only after acceptance`
    );
    const revoke = await firstByNames(page, "button", [/revoke access/i]);
    await keyboardActivate(revoke);
    check(
      (await page.locator('[data-consent-state="revoked"]').count()) === 1,
      `${test.name}: accepted access can be revoked`
    );
  }
  if (test.name === "88-disabled" || test.name === "88-consent-off") {
    check(
      await page.getByRole("button", { name: /start exercise/i }).isDisabled(),
      `${test.name}: start cannot mutate`
    );
    check(
      await page.getByRole("button", { name: /^Complete$/i }).isDisabled(),
      `${test.name}: completion cannot save`
    );
  }
  if (test.name === "89-module-disabled") {
    check(
      (await page
        .locator(
          '[data-testid="phone-frame"] a[href="/screens/52"], [data-testid="phone-frame"] a[href="/screens/63"], [data-testid="phone-frame"] a[href="/screens/71"]'
        )
        .count()) === 0,
      `${test.name}: unavailable modules have no keyboard route`
    );
    check(
      (await page
        .locator('[data-testid="phone-frame"] [aria-disabled="true"]')
        .count()) >= 3,
      `${test.name}: unavailable modules retain visible reasons`
    );
  }
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
    "production build is newer than F2 product sources"
  );
  const served = await (
    await fetch(
      new URL(`/screens/57?__f2build=${encodeURIComponent(buildId)}`, baseURL)
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
      const url = new URL(`/screens/${test.id}`, baseURL);
      url.searchParams.set("state", test.state);
      url.searchParams.set("__f2audit", String(nonce));
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
        () => window.__f2CapabilityEvents ?? []
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
        check(
          sha(first) === sha(second),
          `${test.name}: deterministic consecutive captures`,
          { first: sha(first), second: sha(second) }
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
    "product/API/71-sentinel start-end fingerprints stable"
  );
  check(
    result.cases.length === 123 && result.screenshots.length === 113,
    "exact 123 contexts and 113 PNGs",
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
      result.capabilityEvents.length === 0,
    "zero console/page/capability events",
    {
      console: result.consoleErrors,
      page: result.pageErrors,
      capability: result.capabilityEvents,
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
      error: result.error,
    },
    null,
    2
  )
);
