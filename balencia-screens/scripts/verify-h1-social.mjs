import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

sharp.cache(false);
sharp.concurrency(1);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repo = path.resolve(root, "..");
const [baseURL, outArg, shotsArg] = process.argv.slice(2);
if (!baseURL || !outArg || !shotsArg)
  throw new Error(
    "Usage: node scripts/verify-h1-social.mjs <baseURL> <out-json> <shots-dir>"
  );
const origin = new URL(baseURL);
if (origin.hostname !== "localhost" || origin.port !== "3002")
  throw new Error("H1 acceptance requires localhost:3002 production");
const outPath = path.resolve(root, outArg),
  shotsDir = path.resolve(root, shotsArg),
  candidateDir = `${shotsDir}.candidate`;
const FOCUSABLE =
  'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const states = {
  39: [
    "default-consented",
    "consent-required",
    "low-confidence-cached",
    "honest-null-private",
    "skeleton",
    "error-cached",
    "offline",
    "filter-competition",
    "filter-country",
    "period-month",
    "period-all-time",
    "own-profile",
    "limited-profile",
    "fairness-open",
    "opt-out-confirm",
    "opt-out-success",
    "report-person",
    "mute-person",
    "block-confirm",
    "data-controls",
  ],
  40: [
    "default-community",
    "low-confidence-cached",
    "honest-null-no-rooms",
    "skeleton",
    "error-cached",
    "offline",
    "search-results",
    "search-empty",
    "room-preview",
    "join-consent",
    "join-success",
    "create-room",
    "room-interior",
    "audience-private",
    "send-success",
    "send-queued",
    "send-failure",
    "proof-pending",
    "proof-consent",
    "moderation-message",
    "block-member-confirm",
    "leave-room-confirm",
    "data-controls",
  ],
  46: [
    "partners-default",
    "partner-low-confidence",
    "partner-invite-pending",
    "partner-honest-null",
    "skeleton",
    "error-cached",
    "offline",
    "contracts-default",
    "contracts-low-confidence",
    "contracts-null",
    "triggers-default",
    "trigger-consent",
    "trigger-enabled",
    "trigger-disabled",
    "nudge-preview",
    "nudge-declined",
    "add-partner",
    "partner-detail",
    "revoke-confirm",
    "revoke-success",
    "audit-trail",
    "emergency-support",
    "data-controls",
  ],
  47: [
    "default-joined",
    "default-unjoined",
    "low-confidence-cached",
    "honest-null",
    "skeleton",
    "error-cached",
    "offline",
    "filter-upcoming",
    "invitation-sheet",
    "rules-detail",
    "join-confirm",
    "join-success",
    "join-disabled-consent",
    "premium-preview",
    "visibility-controls",
    "report-handoff",
  ],
  64: [
    "default-neutral",
    "reason-selected",
    "other-description",
    "block-on",
    "missing-context",
    "skeleton-context",
    "offline-preview",
    "duplicate-report",
    "submission-error",
    "submit-confirm",
    "success-pending",
    "cancel-confirm",
    "report-status",
  ],
  78: [
    "default-demo",
    "low-confidence",
    "honest-null",
    "skeleton",
    "error-source-cached",
    "offline",
    "report-preview",
    "privacy-review",
    "share-disabled-review",
    "share-success-local",
    "new-report-builder",
    "report-delete-confirm",
    "data-controls",
    "matrix-detail",
  ],
  82: [
    "default-active",
    "low-confidence-stale",
    "honest-null",
    "skeleton",
    "error-proof-cached",
    "offline",
    "check-detail",
    "terms-history",
    "sign-disabled-no-change",
    "sign-review",
    "sign-success",
    "pause-confirm",
    "paused",
    "resume-confirm",
    "cancel-confirm",
    "sharing-controls",
    "witness-disabled",
    "eligible-delete-confirm",
  ],
  91: [
    "default-consented",
    "audience-unselected",
    "proof-preview",
    "proof-low-confidence",
    "proof-honest-null",
    "skeleton",
    "empty",
    "cached-error",
    "offline-queued",
    "kudos-success",
    "comment-sheet",
    "composer-disabled",
    "moderation-sheet",
    "report-success",
    "own-delete-confirm",
    "data-controls",
    "media-consent-off",
  ],
  94: [
    "upcoming-default",
    "registered",
    "recordings",
    "schedule-low-confidence",
    "schedule-honest-null",
    "skeleton",
    "empty-upcoming",
    "registration-error",
    "offline-cached",
    "register-review",
    "register-success",
    "sold-out-disabled",
    "calendar-preview",
    "recording-unpublished",
    "watch-progress",
    "public-share-preview",
    "data-controls",
    "media-honest-null",
  ],
  95: [
    "communities-default",
    "squads",
    "suggested-consent-off",
    "suggested-consented",
    "low-confidence-cached",
    "honest-null",
    "skeleton",
    "empty",
    "error-cached",
    "offline",
    "join-preview",
    "join-success",
    "invite-pending",
    "invite-accepted",
    "leave-confirm",
    "report-sheet",
    "moderation-success",
    "discovery-disabled",
    "data-controls",
    "asset-honest-null",
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
if (cases.length !== 182 || textCases.length !== 10)
  throw new Error(
    `Frozen H1 matrix drift: ${cases.length}+${textCases.length}`
  );
const expectedTransitionCases = [
  "39-consent-required",
  "39-offline",
  "39-opt-out-confirm",
  "39-mute-person",
  "39-block-confirm",
  "40-default-community",
  "40-honest-null-no-rooms",
  "40-room-interior",
  "40-error-cached",
  "40-offline",
  "40-send-queued",
  "40-send-failure",
  "40-proof-pending",
  "40-proof-consent",
  "40-block-member-confirm",
  "40-leave-room-confirm",
  "46-offline",
  "46-revoke-confirm",
  "47-invitation-sheet",
  "47-join-confirm",
  "47-join-disabled-consent",
  "47-visibility-controls",
  "47-error-cached",
  "47-offline",
  "47-report-handoff",
  "64-submit-confirm",
  "64-block-on",
  "64-missing-context",
  "64-offline-preview",
  "64-submission-error",
  "78-low-confidence",
  "78-honest-null",
  "78-new-report-builder",
  "78-report-delete-confirm",
  "78-data-controls",
  "78-matrix-detail",
  "82-check-detail",
  "82-sharing-controls",
  "82-pause-confirm",
  "82-cancel-confirm",
  "82-eligible-delete-confirm",
  "91-default-consented",
  "91-empty",
  "91-audience-unselected",
  "91-proof-preview",
  "91-proof-honest-null",
  "91-proof-low-confidence",
  "91-comment-sheet",
  "91-moderation-sheet",
  "91-own-delete-confirm",
  "94-registration-error",
  "94-calendar-preview",
  "94-public-share-preview",
  "95-report-sheet",
  "95-honest-null",
  "95-low-confidence-cached",
  "95-error-cached",
  "95-offline",
  "95-join-preview",
  "95-invite-pending",
  "95-leave-confirm",
  "95-discovery-disabled",
];
const modalScaleCases = new Set([
  "39-data-controls",
  "40-proof-consent",
  "46-trigger-consent",
  "47-join-confirm",
  "64-submit-confirm",
  "78-privacy-review",
  "82-cancel-confirm",
  "91-proof-low-confidence",
  "94-public-share-preview",
  "95-join-preview",
]);
const frozenCaseNames = new Set(cases.map(({ name }) => name));
if (
  new Set(expectedTransitionCases).size !== expectedTransitionCases.length ||
  expectedTransitionCases.some((name) => !frozenCaseNames.has(name))
)
  throw new Error("Frozen H1 transition matrix drift");

const productFiles = [
  "S39Leaderboard.tsx",
  "S40CommunityRooms.tsx",
  "S46Accountability.tsx",
  "S47Competitions.tsx",
  "S64ReportBlock.tsx",
  "S78ReportsCenter.tsx",
  "S82AccountabilityContract.tsx",
  "S91SocialFeed.tsx",
  "S94Webinars.tsx",
  "S95PodsHub.tsx",
].map((f) => `src/components/hifi/screens/social/${f}`);
const apiFiles = [
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "src/app/screens/[id]/page.tsx",
  "src/components/hifi/HifiPrototype.tsx",
  "src/components/hifi/screens/registry.ts",
  "scripts/verify-h1-social.mjs",
];
function filesUnder(relativeDir) {
  const absoluteDir = path.resolve(root, relativeDir);
  if (!fs.existsSync(absoluteDir)) return [];
  const rows = [];
  const visit = (absolute) => {
    for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
      const child = path.join(absolute, entry.name);
      if (entry.isDirectory()) visit(child);
      else if (entry.isFile()) rows.push(path.relative(root, child));
    }
  };
  visit(absoluteDir);
  return rows;
}
const productionInputFiles = [
  ...filesUnder("src"),
  ...filesUnder("public"),
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "postcss.config.mjs",
  "tsconfig.json",
]
  .filter((file) => fs.existsSync(path.resolve(root, file)))
  .sort();
const g1Evidence =
  "plans/batches/VISUAL-013-G1-domains-finance-growth/evidence/g1-acceptance-final-v7.json";
const g1Additions =
  "plans/batches/VISUAL-014-H1-social-community/evidence/ACCEPTED-G1-ADDITIONS-BEFORE.sha256";
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
function fingerprint(files, base = root) {
  const rows = files.map((file) => ({
    path: file,
    sha256: sha(fs.readFileSync(path.resolve(base, file))),
  }));
  return {
    digest: sha(
      Buffer.from(rows.map((r) => `${r.sha256}  ${r.path}`).join("\n"))
    ),
    files: rows,
  };
}
function acceptedFingerprint() {
  const prior = JSON.parse(
    fs.readFileSync(path.resolve(repo, g1Evidence), "utf8")
  );
  const rows = (prior?.integrity?.start?.accepted?.files ?? []).map((r) => ({
    ...r,
  }));
  const seen = new Set();
  for (const row of rows) {
    if (!/^[a-f0-9]{64}$/.test(row.sha256) || typeof row.path !== "string")
      throw new Error("Malformed inherited sentinel");
    if (seen.has(row.path))
      throw new Error(`Duplicate inherited sentinel: ${row.path}`);
    seen.add(row.path);
  }
  for (const line of fs
    .readFileSync(path.resolve(repo, g1Additions), "utf8")
    .trim()
    .split("\n")) {
    const m = line.match(/^([a-f0-9]{64})  (.+)$/);
    if (!m) throw new Error(`Malformed G1 sentinel: ${line}`);
    if (seen.has(m[2])) throw new Error(`Duplicate accepted sentinel: ${m[2]}`);
    seen.add(m[2]);
    rows.push({ sha256: m[1], path: m[2] });
  }
  if (rows.length !== 90)
    throw new Error(`Accepted union must be 90, got ${rows.length}`);
  for (const row of rows)
    if (sha(fs.readFileSync(path.resolve(repo, row.path))) !== row.sha256)
      throw new Error(`Accepted sentinel drift: ${row.path}`);
  return {
    digest: sha(
      Buffer.from(rows.map((r) => `${r.sha256}  ${r.path}`).join("\n"))
    ),
    files: rows,
  };
}
const result = {
  auditedAt: new Date().toISOString(),
  baseURL,
  phoneFrame: { width: 390, height: 844 },
  expectedContexts: 192,
  expectedScreenshots: 182,
  checks: [],
  cases: [],
  screenshots: [],
  consoleErrors: [],
  pageErrors: [],
  capabilityEvents: [],
  transitionCases: [],
  modalTextScaleCases: [],
  focusRestorations: [],
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
      Object.defineProperty(window, "__h1Events", { value: events });
      const record = (type, detail = "") => {
        const value = String(detail);
        events.push({ type, detail: value });
        if (typeof window.__h1RecordCapability === "function")
          void window.__h1RecordCapability(type, value);
      };
      const reject =
        (type) =>
        (...args) => {
          record(type, args[0]);
          return Promise.reject(new Error(`${type} blocked`));
        };
      const nativeFetch = fetch.bind(window);
      window.fetch = (...args) => {
        const u = new URL(
          args[0] instanceof Request ? args[0].url : String(args[0]),
          location.href
        );
        const method = String(
          args[1]?.method ??
            (args[0] instanceof Request ? args[0].method : "GET")
        ).toUpperCase();
        if (u.origin === allowedOrigin) {
          if (/^\/api(?:\/|$)/.test(u.pathname))
            record("same-origin-api-fetch", `${method} ${u.href}`);
          else if (!["GET", "HEAD"].includes(method))
            record("same-origin-mutation-fetch", `${method} ${u.href}`);
          return nativeFetch(...args);
        }
        return reject("fetch")(...args);
      };
      const open = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        const u = new URL(String(url), location.href);
        const normalizedMethod = String(method).toUpperCase();
        if (u.origin === allowedOrigin) {
          if (/^\/api(?:\/|$)/.test(u.pathname))
            record("same-origin-api-xhr", `${normalizedMethod} ${u.href}`);
          else if (!["GET", "HEAD"].includes(normalizedMethod))
            record(
              "same-origin-mutation-xhr",
              `${normalizedMethod} ${u.href}`
            );
          return open.call(this, method, url, ...rest);
        }
        record("xhr", `${method} ${url}`);
        throw new Error("xhr blocked");
      };
      window.WebSocket = class {
        constructor(url) {
          record("websocket", url);
          throw new Error("blocked");
        }
      };
      window.EventSource = class {
        constructor(url) {
          record("eventsource", url);
          throw new Error("blocked");
        }
      };
      window.Worker = class {
        constructor(url) {
          record("worker", url);
          throw new Error("blocked");
        }
      };
      window.SharedWorker = class {
        constructor(url) {
          record("shared-worker", url);
          throw new Error("blocked");
        }
      };
      window.open = (...args) => {
        record("window-open", args[0] ?? "");
        return null;
      };
      if (navigator.sendBeacon)
        navigator.sendBeacon = (...a) => (record("beacon", a[0]), false);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition = () => record("geolocation");
        navigator.geolocation.watchPosition = () => (
          record("geolocation-watch"), 0
        );
      }
      if (navigator.mediaDevices)
        navigator.mediaDevices.getUserMedia = reject("media");
      if (navigator.share) navigator.share = reject("share");
      if (navigator.clipboard)
        navigator.clipboard.writeText = reject("clipboard");
      if (navigator.credentials)
        navigator.credentials.get = reject("credentials");
      if (navigator.vibrate)
        navigator.vibrate = (...a) => (record("vibration", a), false);
      if ("PaymentRequest" in window)
        window.PaymentRequest = class {
          constructor() {
            record("payment");
            throw new Error("blocked");
          }
        };
      if ("Notification" in window)
        window.Notification = class {
          constructor() {
            record("notification");
            throw new Error("blocked");
          }
          static requestPermission() {
            record("notification-permission");
            return Promise.resolve("denied");
          }
        };
      const click = HTMLInputElement.prototype.click;
      HTMLInputElement.prototype.click = function (...a) {
        if (this.type === "file") {
          record("file-picker");
          return;
        }
        return click.apply(this, a);
      };
      document.addEventListener(
        "click",
        (e) => {
          const a = e.target instanceof Element ? e.target.closest("a") : null;
          if (!a) return;
          const u = new URL(a.href, location.href);
          if (u.origin !== allowedOrigin || a.hasAttribute("download")) {
            record("external-navigation", u.href);
            e.preventDefault();
            e.stopImmediatePropagation();
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
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}::-webkit-scrollbar{display:none!important}",
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map(async (img) => {
        if (!img.complete)
          await new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          });
        if (img.decode)
          await img.decode().catch(() => undefined);
      })
    );
  });
  await page.evaluate(
    () =>
      new Promise((r) =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => requestAnimationFrame(r))
        )
      )
  );
  await page.waitForTimeout(800);
}
async function textScale(page, scale) {
  const phone = page.locator('[data-testid="phone-frame"]');
  const before = await phone.evaluate((node) => {
    const rootBase = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const measured = [];
    const rendered = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        !el.closest("[hidden],.sr-only,[data-h1-scale-ignore]")
      );
    };
    const clipped = (el) => {
      const style = getComputedStyle(el);
      const horizontal =
        el.clientWidth > 0 && el.scrollWidth - el.clientWidth > 1;
      const vertical =
        el.clientHeight > 0 &&
        el.scrollHeight - el.clientHeight > 1 &&
        ["hidden", "clip"].includes(style.overflowY);
      return horizontal || vertical;
    };
    for (const el of [node, ...node.querySelectorAll("*")]) {
      if (!rendered(el)) continue;
      const direct = [...el.childNodes].some(
        (child) =>
          child.nodeType === Node.TEXT_NODE && child.textContent?.trim()
      );
      if (
        !direct &&
        !["INPUT", "SELECT", "TEXTAREA"].includes(el.tagName)
      )
        continue;
      const style = getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize);
      if (!Number.isFinite(fontSize) || fontSize <= 0) continue;
      const parsedLineHeight = parseFloat(style.lineHeight);
      const proofId = `h1-scale-${measured.length}`;
      el.setAttribute("data-h1-scale-proof", proofId);
      measured.push({
        proofId,
        fontSize,
        lineHeight:
          Number.isFinite(parsedLineHeight) && parsedLineHeight > 0
            ? parsedLineHeight
            : null,
        clipped: clipped(el),
        box: {
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          clientHeight: el.clientHeight,
          scrollHeight: el.scrollHeight,
        },
        tag: el.tagName,
        className:
          typeof el.className === "string" ? el.className : "",
        text: el.textContent?.trim().replace(/\s+/g, " ").slice(0, 120) ?? "",
      });
    }
    return { rootBase, measured };
  });
  await page.evaluate(
    ({ rootBase, scaleValue }) => {
      document.documentElement.style.setProperty(
        "font-size",
        `${rootBase * scaleValue}px`,
        "important"
      );
    },
    { rootBase: before.rootBase, scaleValue: scale }
  );
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )
  );
  return phone.evaluate((node, baseline) => {
    const rootAfter = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const clipped = (el) => {
      const style = getComputedStyle(el);
      const horizontal =
        el.clientWidth > 0 && el.scrollWidth - el.clientWidth > 1;
      const vertical =
        el.clientHeight > 0 &&
        el.scrollHeight - el.clientHeight > 1 &&
        ["hidden", "clip"].includes(style.overflowY);
      return horizontal || vertical;
    };
    const measurements = baseline.measured.map((entry) => {
      const { proofId, fontSize } = entry;
      const el = node.querySelector(`[data-h1-scale-proof="${proofId}"]`);
      const style = el ? getComputedStyle(el) : null;
      const after = style ? parseFloat(style.fontSize) : 0;
      const lineHeightAfter = style ? parseFloat(style.lineHeight) : 0;
      return {
        ...entry,
        after,
        ratio: after / fontSize,
        lineHeightAfter,
        lineHeightRatio: entry.lineHeight
          ? lineHeightAfter / entry.lineHeight
          : null,
        clippedAfter: el ? clipped(el) : true,
        boxAfter: el
          ? {
              clientWidth: el.clientWidth,
              scrollWidth: el.scrollWidth,
              clientHeight: el.clientHeight,
              scrollHeight: el.scrollHeight,
            }
          : null,
      };
    });
    const ratios = measurements.map(({ ratio }) => ratio);
    const scaledRatios = ratios.filter((ratio) => ratio >= 1.249);
    const lineHeightMeasurements = measurements.filter(
      ({ lineHeightRatio }) => lineHeightRatio !== null
    );
    const lineHeightRatios = lineHeightMeasurements.map(
      ({ lineHeightRatio }) => lineHeightRatio
    );
    const newlyClippedElements = measurements.filter(
      ({ clipped: clippedBefore, clippedAfter }) =>
        !clippedBefore && clippedAfter
    );
    return {
      rootBase: baseline.rootBase,
      rootAfter,
      rootRatio: rootAfter / baseline.rootBase,
      measuredCount: ratios.length,
      count: scaledRatios.length,
      fixedSizeCount: ratios.length - scaledRatios.length,
      minimumRatio: ratios.length ? Math.min(...ratios) : 0,
      maximumRatio: ratios.length ? Math.max(...ratios) : 0,
      fixedElements: measurements
        .filter(({ ratio }) => ratio < 1.249)
        .slice(0, 25),
      lineHeightMeasuredCount: lineHeightRatios.length,
      fixedLineHeightCount: lineHeightRatios.filter(
        (ratio) => ratio < 1.249
      ).length,
      minimumLineHeightRatio: lineHeightRatios.length
        ? Math.min(...lineHeightRatios)
        : 0,
      maximumLineHeightRatio: lineHeightRatios.length
        ? Math.max(...lineHeightRatios)
        : 0,
      fixedLineHeightElements: lineHeightMeasurements
        .filter(({ lineHeightRatio }) => lineHeightRatio < 1.249)
        .slice(0, 25),
      newlyClippedCount: newlyClippedElements.length,
      newlyClippedElements: newlyClippedElements.slice(0, 25),
    };
  }, before);
}
function validTextScaleProof(proof) {
  return (
    proof.rootRatio >= 1.249 &&
    proof.rootRatio <= 1.251 &&
    proof.measuredCount >= 10 &&
    proof.count === proof.measuredCount &&
    proof.fixedSizeCount === 0 &&
    proof.minimumRatio >= 1.249 &&
    proof.maximumRatio <= 1.251 &&
    proof.lineHeightMeasuredCount >= 10 &&
    proof.fixedLineHeightCount === 0 &&
    proof.minimumLineHeightRatio >= 1.249 &&
    proof.maximumLineHeightRatio <= 1.251 &&
    proof.newlyClippedCount === 0
  );
}
async function auditLayout(page, name) {
  const e = await page
    .locator('[data-testid="phone-frame"]')
    .evaluate((phone) => {
      const frame = phone.getBoundingClientRect();
      const rendered = (el) => {
        const r = el.getBoundingClientRect(),
          s = getComputedStyle(el);
        return (
          r.width > 0 &&
          r.height > 0 &&
          s.display !== "none" &&
          s.visibility !== "hidden" &&
          !el.closest('[aria-hidden="true"],[hidden]')
        );
      };
      const controls = [
        ...phone.querySelectorAll(
          'button,a,input,select,textarea,[role="button"],[role="switch"],[role="tab"]'
        ),
      ].filter(rendered);
      const named = (el) =>
        el.getAttribute("aria-label") ||
        el.getAttribute("title") ||
        el.textContent?.trim() ||
        ("labels" in el &&
          [...el.labels].map((l) => l.textContent?.trim()).join(" "));
      const hitTarget = (el) => {
        if (
          el instanceof HTMLInputElement &&
          (el.type === "checkbox" || el.type === "radio")
        ) {
          const label = el.closest("label") || el.labels?.[0];
          if (label && rendered(label)) return label;
        }
        return el;
      };
      const textSizedField = (el) =>
        !(el instanceof HTMLInputElement) ||
        [
          "text",
          "search",
          "email",
          "password",
          "tel",
          "url",
          "number",
          "date",
          "datetime-local",
          "month",
          "time",
          "week",
        ].includes(el.type);
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
            const r = hitTarget(el).getBoundingClientRect();
            return { name: named(el), width: r.width, height: r.height };
          })
          .filter((x) => x.width < 43.5 || x.height < 43.5),
        unnamed: controls.filter((el) => !named(el)).length,
        smallFields: [...phone.querySelectorAll("input,textarea,select")]
          .filter((el) => rendered(el) && textSizedField(el))
          .map((el) => ({
            name: named(el),
            fontSize: parseFloat(getComputedStyle(el).fontSize),
          }))
          .filter((x) => x.fontSize < 16),
        wrongCoach: /\b(?:SIA|Sia|Cia)\b/.test(phone.innerText),
        nested: phone.querySelectorAll("button button,button a,a button,a a")
          .length,
      };
    });
  check(
    e.frame.width === 390 && e.frame.height === 844,
    `${name}: phone 390x844`,
    e.frame
  );
  check(e.overflow <= 1, `${name}: no horizontal overflow`, e.overflow);
  check(!e.small.length, `${name}: controls >=44px`, e.small);
  check(!e.unnamed, `${name}: controls named`, e.unnamed);
  check(!e.smallFields.length, `${name}: fields >=16px`, e.smallFields);
  check(!e.wrongCoach, `${name}: coach casing all-caps CIA`);
  check(!e.nested, `${name}: no nested interactives`, e.nested);
}

const semantic = {
  "39-default-consented":
    /(?=[\s\S]*#12)(?=[\s\S]*Character level 12)(?=[\s\S]*4,210 XP)(?=[\s\S]*\+3 this week)(?=[\s\S]*680 \/ 1,000)(?=[\s\S]*68%)/i,
  "39-consent-required": /ranking is private|ranking consent/i,
  "39-honest-null-private": /ranking is private/i,
  "39-data-controls":
    /category[\s\S]*source[\s\S]*scope[\s\S]*freshness[\s\S]*confidence[\s\S]*retention[\s\S]*export[\s\S]*revoke[\s\S]*delete/is,
  "40-default-community":
    /(?=[\s\S]*Your Communities · 3 joined)(?=[\s\S]*Morning crew Community · 5 members)/i,
  "40-search-empty": /0 Community results/i,
  "40-data-controls":
    /category[\s\S]*source[\s\S]*scope[\s\S]*freshness[\s\S]*confidence[\s\S]*retention[\s\S]*export[\s\S]*revoke[\s\S]*delete/is,
  "46-partners-default": /Active partners · 2 connected/i,
  "46-trigger-consent":
    /(?=[\s\S]*Aisha)(?=[\s\S]*2 days)(?=[\s\S]*4-hour cooldown)(?=[\s\S]*revoke)(?=[\s\S]*No notification)/i,
  "46-data-controls":
    /category[\s\S]*source[\s\S]*scope[\s\S]*freshness[\s\S]*confidence[\s\S]*retention[\s\S]*export[\s\S]*revoke[\s\S]*delete/is,
  "47-default-joined":
    /(?=[\s\S]*9)(?=[\s\S]*14)(?=[\s\S]*64%)(?=[\s\S]*5 days)/i,
  "64-default-neutral": /(?=[\s\S]*0\/500)(?=[\s\S]*Submit)/i,
  "64-duplicate-report": /already reported/i,
  "64-success-pending": /Pending review/i,
  "78-default-demo": /1 ready[\s\S]*1 draft/i,
  "82-default-active": /active/i,
  "82-witness-disabled": /witness[\s\S]*(?:unavailable|disabled)/i,
  "91-audience-unselected": /audience[\s\S]*(?:unselected|Only me)/i,
  "91-own-delete-confirm": /delete/i,
  "94-upcoming-default": /(?=[\s\S]*(?:EST|time zone))(?=[\s\S]*bundled)/i,
  "94-public-share-preview": /public[\s\S]*(?:URL|link)/i,
  "95-communities-default": /Communities/i,
  "95-squads": /Squads/i,
  "95-suggested-consent-off": /consent/i,
};
const expectedModalStates = {
  39: new Set([
    "consent-required",
    "own-profile",
    "limited-profile",
    "fairness-open",
    "opt-out-confirm",
    "report-person",
    "mute-person",
    "block-confirm",
    "data-controls",
  ]),
  40: new Set([
    "room-preview",
    "join-consent",
    "create-room",
    "proof-consent",
    "moderation-message",
    "block-member-confirm",
    "leave-room-confirm",
    "data-controls",
  ]),
  46: new Set([
    "trigger-consent",
    "nudge-preview",
    "add-partner",
    "partner-detail",
    "revoke-confirm",
    "audit-trail",
    "data-controls",
  ]),
  47: new Set([
    "invitation-sheet",
    "rules-detail",
    "join-confirm",
    "premium-preview",
    "visibility-controls",
  ]),
  64: new Set(states[64]),
  78: new Set([
    "report-preview",
    "privacy-review",
    "new-report-builder",
    "report-delete-confirm",
    "data-controls",
    "matrix-detail",
  ]),
  82: new Set([
    "check-detail",
    "terms-history",
    "sign-review",
    "pause-confirm",
    "resume-confirm",
    "cancel-confirm",
    "sharing-controls",
    "witness-disabled",
    "eligible-delete-confirm",
  ]),
  91: new Set([
    "proof-preview",
    "proof-low-confidence",
    "comment-sheet",
    "moderation-sheet",
    "own-delete-confirm",
    "data-controls",
  ]),
  94: new Set([
    "register-review",
    "calendar-preview",
    "watch-progress",
    "public-share-preview",
    "data-controls",
  ]),
  95: new Set([
    "join-preview",
    "invite-pending",
    "leave-confirm",
    "report-sheet",
    "data-controls",
  ]),
};
async function semanticChecks(page, test) {
  const marker = page.locator(`[data-h1-state="${test.id}-${test.state}"]`);
  check((await marker.count()) === 1, `${test.name}: exact state marker`);
  const body = await page.locator('[data-testid="phone-frame"]').innerText();
  if (semantic[test.name])
    check(
      semantic[test.name].test(body),
      `${test.name}: semantic proof`,
      body.slice(0, 1800)
    );
  check(
    !/\b(?:Pods?|Circles?|Parties|Guilds?)\b/i.test(body),
    `${test.name}: approved Squad/Community terminology`
  );
  check(
    !/\b(?:Lv\.?|Lvl)\s*12\b/i.test(body) || test.id === "39",
    `${test.name}: unsupported Lv12 absent`
  );
  if (/data-controls|sharing-controls|visibility-controls/.test(test.state))
    check(
      /(?:category[\s\S]*source|source[\s\S]*category)[\s\S]*(?:scope|audience)[\s\S]*freshness[\s\S]*confidence[\s\S]*retention[\s\S]*export[\s\S]*revoke[\s\S]*delete/is.test(
        body
      ),
      `${test.name}: complete data controls`
    );
  if (
    /honest-null|low-confidence|error|offline|consent-off|unselected/.test(
      test.state
    )
  )
    check(
      !/\b(?:verified proof|live server|published publicly|notification sent)\b/i.test(
        body
      ),
      `${test.name}: unsupported certainty absent`
    );
}
async function activate(locator) {
  await locator.focus();
  await locator.press("Space");
}
async function interactionChecks(page, id, name) {
  const frame = page.locator('[data-testid="phone-frame"]');
  const visibleDialogLabels = () =>
    page
      .getByRole("dialog")
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("aria-label") ?? ""));
  const act = async (pattern) => {
    const matches = page
      .getByRole("button", { name: pattern })
      .or(page.getByRole("tab", { name: pattern }));
    const el = matches.first();
    check(
      (await matches.count()) >= 1 && (await el.isVisible()),
      `${name}: ${pattern} exists`
    );
    check(!(await el.isDisabled()), `${name}: ${pattern} enabled`);
    const before = await frame.innerText();
    const beforeDialogs = await visibleDialogLabels();
    await activate(el);
    await settle(page);
    const afterDialogs = await visibleDialogLabels();
    const openedDialog =
      JSON.stringify(afterDialogs) !== JSON.stringify(beforeDialogs) &&
      afterDialogs.length > 0;
    check(
      (await frame.innerText()) !== before ||
        openedDialog,
      `${name}: ${pattern} has outcome`
    );
    if (openedDialog) {
      await page.keyboard.press("Escape");
      await settle(page);
      check(
        JSON.stringify(await visibleDialogLabels()) ===
          JSON.stringify(beforeDialogs),
        `${name}: ${pattern} dialog closes with Escape`
      );
      check(
        await el.evaluate((node) => document.activeElement === node),
        `${name}: ${pattern} restores focus to its opener`
      );
      result.focusRestorations.push({ screen: id, case: name, control: String(pattern) });
    }
  };
  if (id === "39") {
    for (const p of [/Competitions/i, /This month/i, /Fairness/i]) await act(p);
  }
  if (id === "40") {
    for (const p of [
      /Preview Community/i,
      /Create Community/i,
      /Public room/i,
    ])
      await act(p);
  }
  if (id === "46") {
    for (const p of [/Contracts/i, /Triggers/i, /Review shared data/i])
      await act(p);
  }
  if (id === "47") await act(/^View rules$|^Review and join$/i);
  if (id === "64") {
    const reason = page.getByRole("radio", { name: /^Spam$/i });
    check(
      (await reason.count()) === 1 && !(await reason.isDisabled()),
      `${name}: report reason available for focus-restoration proof`
    );
    await activate(reason);
    await settle(page);
    const submit = page.getByRole("button", { name: /^Submit report$/i });
    check(!(await submit.isDisabled()), `${name}: selected reason enables submit`);
    await act(/^Submit report$/i);
    await page.goto(page.url(), { waitUntil: "networkidle" });
    await settle(page);
    const neutralSubmit = page.getByRole("button", { name: /submit/i }).first();
    check(await neutralSubmit.isDisabled(), `${name}: neutral submit disabled`);
  }
  if (id === "78") await act(/preview|new report|create/i);
  if (id === "82") await act(/terms|check detail|sharing/i);
  if (id === "91") await act(/audience|compose|post/i);
  if (id === "94") await act(/^Review registration$/i);
  if (id === "95") await act(/^Manage optional discovery$/i);
}
async function stateChecks(page, test) {
  const dialogs = page.getByRole("dialog");
  const expectedDialog = expectedModalStates[test.id].has(test.state);
  const dialogCount = await dialogs.count();
  check(
    dialogCount === (expectedDialog ? 1 : 0),
    `${test.name}: exact active dialog count`,
    { expected: expectedDialog ? 1 : 0, actual: dialogCount }
  );
  const dialog = dialogs.last();
  if (dialogCount) {
    check(
      await dialog.evaluate((n) => n.contains(document.activeElement)),
      `${test.name}: dialog receives focus`
    );
    await page.keyboard.press("Tab");
    check(
      await dialog.evaluate((n) => n.contains(document.activeElement)),
      `${test.name}: dialog traps forward focus`
    );
    await page.keyboard.press("Shift+Tab");
    check(
      await dialog.evaluate((n) => n.contains(document.activeElement)),
      `${test.name}: dialog traps reverse focus`
    );
    const focusBoundary = async (edge) =>
      dialog.evaluate(
        (node, { selector, targetEdge }) => {
          const items = [...node.querySelectorAll(selector)].filter(
            (item) =>
              item instanceof HTMLElement &&
              item.offsetParent !== null &&
              !item.hasAttribute("disabled")
          );
          const target = targetEdge === "first" ? items[0] : items.at(-1);
          target?.focus();
          return items.length;
        },
        { selector: FOCUSABLE, targetEdge: edge }
      );
    const focusIs = async (edge) =>
      dialog.evaluate(
        (node, { selector, targetEdge }) => {
          const items = [...node.querySelectorAll(selector)].filter(
            (item) =>
              item instanceof HTMLElement &&
              item.offsetParent !== null &&
              !item.hasAttribute("disabled")
          );
          const target = targetEdge === "first" ? items[0] : items.at(-1);
          return document.activeElement === target;
        },
        { selector: FOCUSABLE, targetEdge: edge }
      );
    const focusableCount = await focusBoundary("first");
    check(focusableCount > 0, `${test.name}: dialog has a focusable control`);
    await page.keyboard.press("Shift+Tab");
    check(await focusIs("last"), `${test.name}: dialog wraps backward focus`);
    await focusBoundary("last");
    await page.keyboard.press("Tab");
    check(await focusIs("first"), `${test.name}: dialog wraps forward focus`);
    if (["47", "64", "78", "82", "91", "94", "95"].includes(test.id)) {
      const surface = await dialog.evaluate((node) => {
        const value = getComputedStyle(node).backgroundColor;
        const channels = value.match(/[\d.]+/g)?.map(Number) ?? [];
        return {
          value,
          alpha: channels.length >= 4 ? channels[3] : channels.length >= 3 ? 1 : 0,
        };
      });
      check(
        surface.alpha >= 0.9,
        `${test.name}: text-bearing dialog surface is opaque`,
        surface
      );
    }
  }
  const body = await page.locator('[data-testid="phone-frame"]').innerText();
  if (test.name === "39-consent-required")
    check(
      !/4,210 XP/i.test(body),
      `${test.name}: private before consent`
    );
  if (test.name === "39-opt-out-confirm")
    check(
      !/names Omar|hidden for Omar/i.test(body),
      `${test.name}: own opt-out never targets selected person`,
      body
    );
  if (["39-consent-required", "39-honest-null-private"].includes(test.name)) {
    const noMembers = page
      .locator(`[data-h1-state="${test.id}-${test.state}"] button`)
      .filter({ hasText: /^No members to block$/i });
    check(
      /Ranking is private/i.test(body) &&
        /No rank, XP, streak, movement or other-member identity is exposed/i.test(
          body
        ) &&
        !/\b(?:Omar|Sarah|Ahmed|Lisa|Yara)\b/i.test(body) &&
        (await noMembers.count()) === 1 &&
        (await noMembers.isDisabled()),
      `${test.name}: private ranking rejects every other-member identity and disables target blocking`,
      body
    );
  }
  if (
    [
      "39-low-confidence-cached",
      "39-error-cached",
      "39-offline",
      "39-data-controls",
    ].includes(test.name) &&
    test.name !== "39-data-controls"
  )
    check(
      !/refreshed today|confirmed fixture/i.test(body),
      `${test.name}: degraded ranking avoids fresh/confirmed claims`,
      body
    );
  if (test.name === "40-default-community")
    check(
      /Only me|private|audience unselected/i.test(body) &&
        !/Public · Morning crew/i.test(body),
      `${test.name}: composer is private by default`,
      body
    );
  if (test.name === "40-honest-null-no-rooms")
    check(
      (await page
        .locator('[data-h1-state="40-honest-null-no-rooms"]')
        .getAttribute("data-selected-community")) === "none" &&
        /Bundled discovery previews · not membership/i.test(body) &&
        /No joined audience subject/i.test(body) &&
        /Bundled discovery previews only · no joined membership or audience subject\./i.test(
          body
        ) &&
        !/refreshed today/i.test(body) &&
        !/Audience shown before send|Confirmed local fixture/i.test(body),
      `${test.name}: honest-null DOM and provenance retain no hidden membership or joined-audience identity`,
      body
    );
  if (test.name === "40-low-confidence-cached")
    check(
      /Bundled Community preview · freshness and live confidence unavailable\./i.test(
        body
      ) && !/refreshed today/i.test(body),
      `${test.name}: low-confidence Community preview rejects fresh status`,
      body
    );
  if (test.name === "40-proof-pending")
    check(
      /Bundled proof pending review · freshness and live confidence unavailable\./i.test(
        body
      ) &&
        /Bundled proof · validation pending/i.test(body) &&
        /pending, low confidence/i.test(body) &&
        !/refreshed today|Confirmed local fixture/i.test(body),
      `${test.name}: pending proof preserves uncertain provenance without a fresh or confirmed upgrade`,
      body
    );
  if (test.name === "40-offline")
    check(
      /Cached Community preview · offline read-only; freshness unavailable\./i.test(
        body
      ) && !/refreshed today/i.test(body),
      `${test.name}: offline Community preview rejects fresh status`,
      body
    );
  if (test.name === "40-send-success")
    check(
      /Local message sent to Public · Morning crew preview/i.test(body) &&
        /Message added locally for Public · Morning crew; nothing was published externally/i.test(
          body
        ) &&
        !/Only me · draft/i.test(body),
      `${test.name}: seeded send reconciles message and selected audience`,
      body
    );
  if (test.name === "40-error-cached")
    check(
      /Refresh failed · cached Communities/i.test(body) &&
        /Retry Community source/i.test(body) &&
        /refresh is unavailable/i.test(body) &&
        !/refreshed today/i.test(body),
      `${test.name}: cached error exposes a source-specific retry without fresh claims`,
      body
    );
  if (test.name === "40-proof-consent")
    check(
      (await page
        .locator('[data-h1-state="40-proof-consent"]')
        .getAttribute("data-proof-sharing")) === "required" &&
        /Only me · draft/i.test(body) &&
        /Source: bundled local demo/i.test(body) &&
        /scope: Mission achievement and \+150 XP only/i.test(body) &&
        /freshness: Apr 12, 2026/i.test(body) &&
        /confidence: confirmed fixture/i.test(body) &&
        /Sarah sharing consent: bundled-demo consented/i.test(body) &&
        /audience consent: pending/i.test(body) &&
        /no health fields or media/i.test(body),
      `${test.name}: proof review starts private with complete consent metadata`,
      body
    );
  if (["40-room-preview", "40-join-consent"].includes(test.name))
    check(
      /Fitness lovers · persistent Community · 42 bundled members/i.test(body) &&
        /Public audience/i.test(body) &&
        /host-moderated local fixture/i.test(body) &&
        /messages retained for this session/i.test(body) &&
        /proof requires separate member and audience consent/i.test(body) &&
        /leave anytime/i.test(body) &&
        /own messages can be deleted locally/i.test(body) &&
        /Community deletion is unavailable to members/i.test(body) &&
        /No live join occurs/i.test(body),
      `${test.name}: prejoin review names audience, moderation, retention, consent, and deletion terms`,
      body
    );
  if (test.name === "40-search-results") {
    const stateRoot = page.locator('[data-h1-state="40-search-results"]');
    const search = stateRoot.getByPlaceholder("Find your Communities");
    const results = stateRoot.getByRole("button", {
      name: /^Select .* persistent Community;/i,
    });
    check(
      (await search.count()) === 1 &&
        (await search.inputValue()) === "Morning" &&
        (await results.count()) === 1 &&
        /Select Morning crew persistent Community;/i.test(
          (await results.first().getAttribute("aria-label")) ?? ""
        ) &&
        /1 Community result/i.test(body),
      `${test.name}: visible query matches filtered results`,
      {
        query: await search.inputValue(),
        resultCount: await results.count(),
        resultLabel: await results.first().getAttribute("aria-label"),
      }
    );
  }
  if (test.name === "46-partner-invite-pending")
    check(
      /pending/i.test(body) && !/consent active|accepted partner/i.test(body),
      `${test.name}: pending invite has no active access`,
      body
    );
  if (test.name === "46-partners-default") {
    const aisha = page.locator('button[aria-label^="Aisha Khan, accepted"]');
    const marcus = page.locator('button[aria-label^="Marcus Lee, accepted"]');
    const aishaLabel = (await aisha.getAttribute("aria-label")) ?? "";
    const marcusLabel = (await marcus.getAttribute("aria-label")) ?? "";
    check(
      (await aisha.count()) === 1 &&
        /Accountability partner/i.test(aishaLabel) &&
        /Career and Fitness activity-only Missions/i.test(aishaLabel) &&
        /Mission activity events only/i.test(aishaLabel) &&
        /No automatic notifications/i.test(aishaLabel) &&
        /refreshed today/i.test(aishaLabel) &&
        /revoke available/i.test(aishaLabel) &&
        (await marcus.count()) === 1 &&
        /Mentor/i.test(marcusLabel) &&
        /Career guidance/i.test(marcusLabel) &&
        /Guidance only · no Mission events/i.test(marcusLabel) &&
        /No notification permission/i.test(marcusLabel) &&
        /refreshed today/i.test(marcusLabel) &&
        /revoke available/i.test(marcusLabel),
      `${test.name}: every default partner row exposes exact scope, events, notification permission, freshness, and revoke availability`,
      { aishaLabel, marcusLabel }
    );
  }
  if (test.name === "46-partner-honest-null")
    check(
      !/consent active|accepted partner|connected partner/i.test(body),
      `${test.name}: honest null has no active relationship claim`,
      body
    );
  if (test.name === "46-revoke-success")
    check(
      /revoked/i.test(body) && !/consent active/i.test(body),
      `${test.name}: revoked access is removed`,
      body
    );
  if (test.name === "46-contracts-low-confidence")
    check(
      /low confidence|stale|cached/i.test(body) && !/confirmed fixture/i.test(body),
      `${test.name}: contract confidence is explicit`,
      body
    );
  if (["46-error-cached", "46-offline"].includes(test.name))
    check(
      !/refreshed today|bundled permissions · confirmed/i.test(body),
      `${test.name}: degraded permissions avoid fresh/confirmed claims`,
      body
    );
  if (test.name === "47-join-confirm")
    check(
      !/Rank #42 of 234/i.test(body),
      `${test.name}: rank hidden before join confirmation`,
      body
    );
  if (test.name === "47-join-disabled-consent")
    check(
      /Joining is unavailable until competition rules and the friends-only leaderboard audience are reviewed\./i.test(
        body
      ),
      `${test.name}: disabled join explains consent requirement`,
      body
    );
  if (test.name === "47-error-cached")
    check(
      /Could not refresh competitions/i.test(body) &&
        /Retry competition source/i.test(body) &&
        /Refresh unavailable/i.test(body) &&
        !/Fresh May 30|Confirmed demo/i.test(body),
      `${test.name}: cached error is source-specific and avoids fresh claims`,
      body
    );
  if (test.name === "47-honest-null") {
    const privacy = page.getByRole("button", {
      name: /^Review privacy defaults$/i,
    });
    check(
      (await page
        .locator('[data-h1-state="47-honest-null"]')
        .getAttribute("data-selected-competition")) === "none" &&
        /No competition selected/i.test(body) &&
        /No member or challenge was inferred/i.test(body) &&
        (await page.getByRole("link", { name: /Report or mute/i }).count()) ===
          0 &&
        (await page.getByRole("button", { name: /^Mute /i }).count()) === 0 &&
        (await page
          .getByRole("button", { name: /^Review own-challenge deletion rules$/i })
          .count()) === 0 &&
        (await privacy.count()) === 1 &&
        !(await privacy.isDisabled()),
      `${test.name}: honest null hides target-specific controls without inventing a competition`,
      body
    );
  }
  if (test.name === "64-missing-context")
    check(
      (await page
        .locator('[data-h1-state="64-missing-context"]')
        .getAttribute("data-report-subject")) === "none" &&
        /The source route is unavailable in this standalone review/i.test(body) &&
        /Close this preview manually and try again/i.test(body) &&
        /no user or content was guessed/i.test(body) &&
        (await page
          .locator('[data-h1-state="64-missing-context"]')
          .getAttribute("data-report-delivery")) === "none" &&
        !/Return to (?:Community|Competitions|source)$/im.test(body),
      `${test.name}: missing context offers an honest acknowledgement without a false return path`,
      body
    );
  if (test.name === "64-submit-confirm")
    check(
      /In the intended product, a submitted report would be limited to you and authorized moderation reviewers/i.test(
        body
      ) &&
        /nothing was sent to a moderation reviewer|prototype sends nothing/i.test(
          body
        ) &&
        /no outcome or punishment is promised|causes no punishment/i.test(body),
      `${test.name}: moderation visibility is explicitly local-only and outcome-honest`,
      body
    );
  if (test.name === "64-block-on")
    check(
      /Block option ON · blocking remains separate from reporting/i.test(body) &&
        /Separate local preference · source context remains visible here · unblock remains available/i.test(
          body
        ),
      `${test.name}: block-on preference is local, separate, reversible, and does not hide source context`,
      body
    );
  if (test.name === "64-offline-preview")
    check(
      /You're offline — your report will send when you're back online in the intended product/i.test(
        body
      ) &&
        /prototype queues only a local session fixture and makes no network request/i.test(
          body
        ),
      `${test.name}: offline report copy names intended queue semantics and prototype boundaries`,
      body
    );
  if (test.name === "91-audience-unselected")
    check(
      /Audience: not selected/i.test(body) && !/Audience: Only me/i.test(body),
      `${test.name}: feed keeps audience explicitly unselected`,
      body
    );
  if (test.name === "91-proof-honest-null")
    check(
      /Source unavailable · no proof value inferred/i.test(body) &&
        !/5\.2 mi/i.test(body) &&
        !/Proof removed|Proof sharing revoked|Wearable proof scope revoked/i.test(
          body
        ),
      `${test.name}: unavailable proof source exposes no metric, removal state, or false revocation outcome`,
      body
    );
  if (test.name === "91-proof-preview") {
    const selectedAudience = page.getByRole("radio", {
      name: /^Only me$/i,
      checked: true,
    });
    const accent =
      (await selectedAudience.count()) === 1
        ? await selectedAudience.evaluate((node) =>
            getComputedStyle(node).accentColor
          )
        : "missing";
    check(
      (await selectedAudience.count()) === 1 &&
        /255\s*,\s*94\s*,\s*0/i.test(accent) &&
        (await selectedAudience.evaluate((node) =>
          node.classList.contains("accent-brand-orange")
        )),
      `${test.name}: selected audience radio uses the Balencia orange active token`,
      accent
    );
  }
  if (test.name === "91-media-consent-off")
    check(
      /Proof withheld · consent off · no metric inferred/i.test(body) &&
        /Only the audience-authorized text update remains; no metric is shown\./i.test(
          body
        ) &&
        !/5\.2 mi/i.test(body),
      `${test.name}: media-consent-off suppresses the proof metric and retains only authorized text`,
      body
    );
  if (test.name === "94-public-share-preview")
    check(
      /Public link · Stress reset workshop/i.test(body) &&
        /https:\/\/balencia\.example\/webinars\/stress-reset-workshop/i.test(
          body
        ) &&
        !/live-reset-sleep/i.test(body),
      `${test.name}: public link identity matches the recording`,
      body
    );
  if (["78-error-source-cached", "78-offline"].includes(test.name))
    check(
      /cached|stale|low confidence|unavailable/i.test(body) &&
        !/Confirmed fixture|Fresh Nov/i.test(body),
      `${test.name}: unavailable sources do not claim freshness`,
      body
    );
  if (test.name === "78-low-confidence") {
    const review = page.getByRole("button", { name: /^Review export$/i });
    check(
      (await review.count()) === 1 && (await review.isDisabled()),
      `${test.name}: incomplete readiness blocks top-level export`
    );
  }
  if (test.name === "78-honest-null") {
    const create = page.getByRole("button", { name: /^Create report$/i });
    const stateRoot = page.locator('[data-h1-state="78-honest-null"]');
    check(
      (await stateRoot.getAttribute("data-source-quality")) ===
        "no-source-coverage" &&
        (await stateRoot.getAttribute("data-report-count")) === "0" &&
        (await stateRoot.getAttribute("data-doctor-summary")) === "absent" &&
        /Create your first report/i.test(body) &&
        /No reports, weekly metrics, or CIA comparisons yet/i.test(body) &&
        !/\b(?:82%|64%|86%|43%)\b/i.test(body) &&
        (await page.getByRole("heading", { name: /^This week$/i }).count()) ===
          0 &&
        (await page.getByRole("button", { name: /^Review export$/i }).count()) ===
          0 &&
        (await create.count()) === 1 &&
        !(await create.isDisabled()),
      `${test.name}: honest null exposes only a local draft path and no sourced metric or report`,
      body
    );
  }
  if (test.name === "82-offline")
    check(
      /cached|stale|offline/i.test(body) &&
        !/Fresh Jun 1|Confirmed fixture/i.test(body),
      `${test.name}: offline contract does not claim freshness`,
      body
    );
  if (test.name === "82-paused")
    check(
      /paused|not due/i.test(body) && !/Weekly review · Due Monday/i.test(body),
      `${test.name}: paused checks are not presented as due`,
      body
    );
  if (test.name === "82-check-detail")
    check(
      /Morning run proof/i.test(body) &&
        /Proof status: complete · local photo metadata fixture · Jun 1/i.test(
          body
        ) &&
        /Aisha sees completion status only/i.test(body) &&
        /No image\/file is shown or transmitted/i.test(body) &&
        /Private journal remains excluded/i.test(body),
      `${test.name}: proof detail names exact evidence, audience, and exclusions`,
      body
    );
  if (test.name === "94-schedule-low-confidence")
    {
      const registration = page.getByRole("button", {
        name: /^Schedule pending$/i,
      });
      const calendar = page.getByRole("button", {
        name: /Calendar preview/i,
      });
      check(
        /low confidence|pending confirmation/i.test(body) &&
          (await registration.count()) === 1 &&
          (await registration.isDisabled()) &&
          (await calendar.count()) === 1 &&
          (await calendar.isDisabled()),
        `${test.name}: uncertain schedule blocks registration and calendar`,
        body
      );
    }
  if (["91-cached-error", "91-offline-queued"].includes(test.name))
    check(
      !/12m|refreshed 12m ago|confirmed fixture/i.test(body),
      `${test.name}: degraded feed avoids live freshness claims`,
      body
    );
  if (test.name === "94-offline-cached")
    {
      const watch = page.getByRole("button", { name: /^Watch preview$/i });
      check(
      !/confirmed fixture|Registration review available/i.test(body) &&
        (await watch.count()) === 1 &&
        (await watch.isDisabled()) &&
        /Watch preview is disabled while offline\. Cached progress remains read-only\./i.test(
          body
        ),
      `${test.name}: offline webinar avoids confirmed/available claims`,
      body
    );
    }
  if (test.name === "94-calendar-preview")
    check(
      /Calendar preview/i.test(body) &&
        /Live reset for sleep · Nov 14, 2026 · 7:00 PM EST/i.test(body) &&
        /public webinar URL only/i.test(body) &&
        /No calendar or file capability is invoked/i.test(body),
      `${test.name}: calendar preview preserves exact event identity and capability boundaries`,
      body
    );
  if (test.name === "46-trigger-disabled") {
    const trigger = page.getByRole("switch");
    const nudge = page.getByRole("button", { name: /^Preview nudge$/i });
    check(
      (await trigger.count()) === 1 &&
        (await trigger.isDisabled()) &&
        (await nudge.count()) === 1 &&
        (await nudge.isDisabled()) &&
        /Trigger changes disabled · trigger-policy consent unavailable/i.test(
          body
        ) &&
        /Partner consent remains active/i.test(body) &&
        /Aisha consent active/i.test(body) &&
        !/partner consent unavailable/i.test(body),
      `${test.name}: trigger-policy consent is unavailable without contradicting active partner consent`,
      body
    );
  }
  if (test.name === "47-join-disabled-consent") {
    const join = page.getByRole("button", { name: /^Review and join$/i });
    check(
      (await join.count()) === 1 &&
        !(await join.isDisabled()) &&
        (await page
          .locator('[data-h1-state="47-join-disabled-consent"]')
          .getAttribute("data-leaderboard-audience")) === "Only me" &&
        /Joining is unavailable until competition rules and the friends-only leaderboard audience are reviewed/i.test(
          body
        ),
      `${test.name}: recovery entry remains enabled while missing requirements are explicit`
    );
  }
  if (test.name === "64-default-neutral") {
    const submit = page.getByRole("button", { name: /^Submit report$/i });
    const cancel = page.getByRole("button", { name: /^Cancel$/i });
    const heading = page.getByRole("heading", { name: /^Report$/i });
    const firstReason = page.getByRole("radio", { name: /^Spam$/i });
    const description = page.getByRole("textbox", {
      name: /^Tell us more/i,
    });
    const block = page.getByRole("switch", {
      name: /^Also block this user/i,
    });
    const focusByTab = async (locator) => {
      for (let index = 0; index < 12; index++) {
        if (await locator.evaluate((node) => document.activeElement === node))
          break;
        await page.keyboard.press("Tab");
      }
      return locator.evaluate((node) => {
        const style = getComputedStyle(node);
        return {
          active: document.activeElement === node,
          outlineStyle: style.outlineStyle,
          boxShadow: style.boxShadow,
        };
      });
    };
    await heading.focus();
    const focusAppearances = {
      cancel: await focusByTab(cancel),
      firstReason: await focusByTab(firstReason),
      description: await focusByTab(description),
      block: await focusByTab(block),
    };
    check(
      (await submit.count()) === 1 && (await submit.isDisabled()),
      `${test.name}: neutral submit is disabled`
    );
    check(
      Object.values(focusAppearances).every(
        ({ active, outlineStyle, boxShadow }) =>
          active &&
          outlineStyle === "none" &&
          boxShadow !== "none" &&
          /255\s*,\s*94\s*,\s*0/i.test(boxShadow)
      ),
      `${test.name}: Cancel, reason, description, and block controls use canonical orange focus instead of browser-blue outlines`,
      focusAppearances
    );
  }
  if (test.name === "91-composer-disabled") {
    const cardComposer = page.getByRole("button", {
      name: /^Review proof update$/i,
    });
    const entryPoints = page.getByRole("button", {
      name: /^Post unavailable/i,
    });
    check(
      (await cardComposer.count()) === 1 &&
        (await cardComposer.isDisabled()) &&
        (await entryPoints.count()) === 2 &&
        (await entryPoints.evaluateAll((nodes) =>
          nodes.every((node) => node.hasAttribute("disabled"))
        )),
      `${test.name}: every composer entry is disabled`
    );
  }
  if (test.name === "94-sold-out-disabled") {
    const soldOut = page.getByRole("button", { name: /^Sold out$/i });
    check(
      (await soldOut.count()) === 1 && (await soldOut.isDisabled()),
      `${test.name}: sold-out registration is disabled`
    );
  }
  if (test.name === "64-default-neutral") {
    check(
      (await page.getByRole("radio", { checked: true }).count()) === 0,
      `${test.name}: no reason selected`
    );
    check(
      (await page.getByRole("switch", { checked: true }).count()) === 0,
      `${test.name}: block off`
    );
  }
  if (test.name === "95-squads") {
    check(
      /temporary/i.test(body) && /2–5|2-5/i.test(body),
      `${test.name}: Squad size/lifecycle truth`
    );
    check(
      !/(?=[\s\S]*Evening stretch Squad[\s\S]*Member)(?=[\s\S]*Aisha invited you[\s\S]*Evening stretch Squad)/i.test(
        body
      ),
      `${test.name}: Squad is not both member and pending invite`,
      body
    );
  }
  if (test.name === "95-discovery-disabled") {
    const manage = page
      .getByRole("button", { name: /discovery|privacy|consent/i })
      .first();
    check(
      /disabled|consent is off|route consent off/i.test(body) &&
        (await manage.count()) === 1 &&
        !(await manage.isDisabled()),
      `${test.name}: disabled matching remains reviewable`,
      body
    );
  }
  if (
    ["95-low-confidence-cached", "95-error-cached", "95-offline"].includes(
      test.name
    )
  )
    check(
      /Cached bundled \/groups demo/i.test(body) &&
      /Freshness and live confidence unavailable/i.test(body) &&
        /cached walking-topic suggestion remains for review/i.test(body) &&
        /No route or location history is used/i.test(body) &&
        !/Weekend walkers has 3 approximate route overlaps/i.test(body) &&
        !/One coherent bundled progress meter · refreshed Apr 12/i.test(body),
      `${test.name}: degraded groups use cached provenance and suppress fresh route inference`,
      body
    );
}
async function transitionChecks(page, test) {
  const frame = page.locator('[data-testid="phone-frame"]');
  const marker = page.locator(`[data-h1-state="${test.id}-${test.state}"]`);
  const body = () => frame.innerText();
  const pressButton = async (name) => {
    const button = page.getByRole("button", { name });
    check(
      (await button.count()) === 1 && (await button.isVisible()),
      `${test.name}: transition control ${name} exists`
    );
    check(
      !(await button.isDisabled()),
      `${test.name}: transition control ${name} enabled`
    );
    await activate(button);
    await settle(page);
  };

  if (test.name === "39-consent-required") {
    await pressButton(/^Join preview$/i);
    const text = await body();
    check(
      /#12[\s\S]*Character level 12[\s\S]*4,210 XP/i.test(text),
      `${test.name}: consent reveals Amira's ranking`
    );
    check(
      (await page.getByRole("dialog").count()) === 0,
      `${test.name}: consent dialog closes after join`
    );
    return true;
  }
  if (test.name === "39-offline") {
    const row = page.getByRole("button", { name: /Rank 4, Omar/i });
    check(
      (await row.count()) === 1 && !(await row.isDisabled()),
      `${test.name}: cached limited profile remains inspectable`
    );
    await activate(row);
    await settle(page);
    const report = page.getByRole("button", { name: /^Report$/i });
    const block = page.getByRole("button", { name: /^Block$/i });
    const text = await page.getByRole("dialog").innerText();
    check(
      (await report.count()) === 1 &&
        (await report.isDisabled()) &&
        (await block.count()) === 1 &&
        (await block.isDisabled()) &&
        /Profile inspection is read-only offline\. Reconnect to report or block this member\./i.test(
          text
        ) &&
        (await marker.getAttribute("data-moderation-actions")) === "disabled",
      `${test.name}: offline profile moderation is disabled with a reason`,
      text
    );
    return true;
  }
  if (test.name === "39-opt-out-confirm") {
    await pressButton(/^Confirm$/i);
    const text = await body();
    check(
      /Amira’s ranking hidden locally/i.test(text) && !/4,210 XP/i.test(text),
      `${test.name}: own opt-out hides Amira's ranking`,
      text
    );
    return true;
  }
  if (test.name === "39-mute-person") {
    await pressButton(/^Confirm$/i);
    const mutedText = await body();
    check(
      (await marker.getAttribute("data-muted-target-count")) === "1" &&
        /Omar muted locally\. Preview alerts are suppressed; unmute is available below\./i.test(
          mutedText
        ) &&
        /Omar[\s\S]*alerts muted/i.test(mutedText) &&
        (await page.getByRole("button", { name: /^Unmute Omar$/i }).count()) ===
          1,
      `${test.name}: mute persists in row state and exposes an explicit reversal`,
      mutedText
    );
    await pressButton(/^Unmute Omar$/i);
    const restoredText = await body();
    check(
      (await marker.getAttribute("data-muted-target-count")) === "0" &&
        /Omar unmuted locally\. Preview alerts are restored\./i.test(
          restoredText
        ) &&
        (await page.getByRole("button", { name: /^Unmute Omar$/i }).count()) ===
          0,
      `${test.name}: explicit unmute clears the persisted mute`,
      restoredText
    );
    return true;
  }
  if (test.name === "39-block-confirm") {
    await pressButton(/^Confirm$/i);
    const text = await body();
    const count = marker.locator('[data-visible-member-count="2"]');
    check(
      /Omar blocked locally and removed from this preview/i.test(text) &&
        (await count.count()) === 1,
      `${test.name}: block removes Omar and reconciles member count`,
      text
    );
    check(
      (await page.getByRole("button", { name: /Rank 4, Omar/i }).count()) === 0,
      `${test.name}: blocked Omar row is absent`
    );
    return true;
  }
  if (test.name === "40-default-community") {
    const previews = page.getByRole("button", {
      name: /^Preview Community$/i,
    });
    check(
      (await previews.count()) === 2,
      `${test.name}: both Community previews exist`
    );
    await activate(previews.nth(1));
    await settle(page);
    const dialogText = await page.getByRole("dialog").last().innerText();
    check(
      /Book club Community preview/i.test(dialogText) &&
        !/Fitness lovers Community preview/i.test(dialogText),
      `${test.name}: Book club opens its own identity`,
      dialogText
    );
    return true;
  }
  if (test.name === "40-honest-null-no-rooms") {
    check(
      (await marker.getAttribute("data-selected-community")) === "none" &&
        (await marker.getAttribute("data-community-draft")) === "none" &&
        /Bundled discovery previews · not membership/i.test(await body()) &&
        /No joined audience subject/i.test(await body()) &&
        !/Audience shown before send|Confirmed local fixture/i.test(await body()),
      `${test.name}: honest-null starts without hidden membership or draft identity`
    );
    await pressButton(/^Create Community$/i);
    const nameInput = page.getByRole("textbox", { name: /^Community name$/i });
    check(
      (await nameInput.inputValue()) === "Local reading Community",
      `${test.name}: local draft builder exposes its explicit draft identity`
    );
    await pressButton(/^Create draft$/i);
    let text = await body();
    check(
      (await marker.getAttribute("data-selected-community")) === "none" &&
        (await marker.getAttribute("data-community-draft")) === "created" &&
        /Local reading Community draft created locally and added below\. Nothing was published\./i.test(
          text
        ) &&
        /Local reading Community[\s\S]*Draft only · 0 members · private session preview · not published/i.test(
          text
        ),
      `${test.name}: create produces a visible local-only draft without fabricating membership`,
      text
    );
    await pressButton(/^Community settings$/i);
    let dialogText = await page.getByRole("dialog").innerText();
    check(
      /Local reading Community local Community draft · no joined room, member, message, proof, or audience subject is available · session retention · nothing published or inferred\./i.test(
        dialogText
      ),
      `${test.name}: data summary accounts for the local draft and preserves null membership`,
      dialogText
    );
    await pressButton(/^Close dialog$/i);
    await pressButton(/^Delete Community draft$/i);
    text = await body();
    check(
      (await marker.getAttribute("data-selected-community")) === "none" &&
        (await marker.getAttribute("data-community-draft")) === "none" &&
        /Local Community draft deleted\./i.test(text) &&
        !/Draft only · 0 members · private session preview/i.test(text),
      `${test.name}: deleting the local draft returns to the honest-null surface`,
      text
    );
    await pressButton(/^Community settings$/i);
    dialogText = await page.getByRole("dialog").innerText();
    check(
      /No joined Community, room, message, proof, member, or audience subject is available · session retention · discover previews are not membership · nothing inferred\./i.test(
        dialogText
      ) && !/Local reading Community local Community draft/i.test(dialogText),
      `${test.name}: post-delete data summary returns to honest null without retaining the draft`,
      dialogText
    );
    return true;
  }
  if (test.name === "40-room-interior") {
    const publicAudience = page.getByRole("button", {
      name: /^Public room$/i,
    });
    const privateAudience = page.getByRole("button", {
      name: /^Only me draft$/i,
    });
    check(
      (await privateAudience.getAttribute("aria-pressed")) === "true" &&
        (await publicAudience.getAttribute("aria-pressed")) === "false" &&
        (await privateAudience.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )),
      `${test.name}: private audience starts with aligned pressed and selected visuals`
    );
    await pressButton(/^Public room$/i);
    check(
      (await publicAudience.getAttribute("aria-pressed")) === "true" &&
        (await privateAudience.getAttribute("aria-pressed")) === "false" &&
        (await publicAudience.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )) &&
        !(await privateAudience.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )),
      `${test.name}: public audience selection aligns aria and visual state`
    );
    const composer = page.getByRole("textbox", {
      name: /^Message Morning crew$/i,
    });
    check(
      (await composer.count()) === 1 &&
        /audience Public · Morning crew/i.test(
          (await composer.locator("xpath=..").getAttribute("aria-label")) ?? ""
        ),
      `${test.name}: explicit audience selection updates the composer`
    );
    await composer.fill("Consent-safe hello");
    await composer.press("Enter");
    await settle(page);
    const text = await body();
    check(
      /Consent-safe hello/i.test(text) &&
        /Message added locally for Public · Morning crew/i.test(text),
      `${test.name}: public message send reconciles content and audience`,
      text
    );
    await pressButton(/^Delete your message preview: Consent-safe hello$/i);
    const deleteDialogText = await page.getByRole("dialog").innerText();
    check(
      /Delete “Consent-safe hello” from this session-only local preview/i.test(
        deleteDialogText
      ) &&
        /Community and external data are unchanged/i.test(deleteDialogText),
      `${test.name}: own-message deletion names exact content and local scope`,
      deleteDialogText
    );
    await pressButton(/^Delete local message$/i);
    const deletedText = await body();
    check(
      !/Consent-safe hello/i.test(deletedText) &&
        /Your local message preview was deleted\. No Community or external data changed\./i.test(
          deletedText
        ),
      `${test.name}: own-message deletion removes only the selected local message`,
      deletedText
    );
    await pressButton(/^Mute$/i);
    check(
      (await marker.getAttribute("data-muted-sarah")) === "true" &&
        /Sarah muted locally\. Community notifications from Sarah are suppressed in this preview; unmute is available here\./i.test(
          await body()
        ),
      `${test.name}: member mute persists with an explicit reversal`
    );
    await pressButton(/^Unmute$/i);
    check(
      (await marker.getAttribute("data-muted-sarah")) === "false" &&
        /Sarah unmuted locally\. Community notifications from Sarah are restored in this preview\./i.test(
          await body()
        ),
      `${test.name}: member unmute restores notifications`
    );
    return true;
  }
  if (test.name === "40-error-cached") {
    await pressButton(/^Retry Community source$/i);
    const text = await body();
    check(
      /Community source retry previewed locally\. Cached rooms remain; no network request occurred\./i.test(
        text
      ),
      `${test.name}: Community retry is source-specific and capability-honest`,
      text
    );
    return true;
  }
  if (test.name === "40-send-queued") {
    const text = await body();
    const delivery = page
      .getByRole("status")
      .filter({
        hasText: /Queued in memory · session only · not a server delivery/i,
      });
    check(
      /Session-only delivery preview/i.test(text) &&
        /Message queued in memory for this session only\./i.test(text) &&
        /Queued in memory · session only · not a server delivery\./i.test(
          text
        ) &&
        (await delivery.count()) === 1 &&
        !/published externally|server delivery confirmed/i.test(text),
      `${test.name}: queued message card and delivery status remain session-only without publication`,
      text
    );
    return true;
  }
  if (test.name === "40-send-failure") {
    const failedText = await body();
    const failed = page
      .getByRole("alert")
      .filter({ hasText: /Failed locally · not published/i });
    check(
      /Message delivery preview/i.test(failedText) &&
        /Message failed locally\. Nothing was published\./i.test(failedText) &&
        /Failed locally · not published\./i.test(failedText) &&
        (await failed.count()) === 1,
      `${test.name}: failed message is visible and explicitly unpublished`,
      failedText
    );
    await pressButton(/^Retry local message$/i);
    const queuedText = await body();
    check(
      /Failed message retry queued in memory for this session only\./i.test(
        queuedText
      ) &&
        /Queued in memory · session only · not a server delivery\./i.test(
          queuedText
        ) &&
        !/Failed locally · not published/i.test(queuedText) &&
        (await failed.count()) === 0,
      `${test.name}: retry reconciles failure to a session-only queued state`,
      queuedText
    );
    return true;
  }
  if (test.name === "40-offline") {
    const previews = page.getByRole("button", {
      name: /^Preview Community$/i,
    });
    const create = page.getByRole("button", { name: /^Create Community$/i });
    const leave = page.getByRole("button", { name: /^Leave Morning crew$/i });
    const roomModeration = page.getByRole("button", {
      name: /^Morning crew moderation$/i,
    });
    const report = page.getByRole("button", { name: /^Report$/i });
    const mute = page.getByRole("button", { name: /^Mute$/i });
    const block = page.getByRole("button", { name: /^Block$/i });
    const composer = page.getByRole("textbox", {
      name: /^Message Morning crew$/i,
    });
    check(
      (await previews.count()) === 2 &&
        (await previews.evaluateAll((nodes) =>
          nodes.every((node) => node.hasAttribute("disabled"))
        )) &&
        (await create.count()) === 1 &&
        (await create.isDisabled()) &&
        (await leave.count()) === 1 &&
        (await leave.isDisabled()) &&
        (await roomModeration.count()) === 1 &&
        (await roomModeration.isDisabled()) &&
        (await report.count()) === 1 &&
        (await report.isDisabled()) &&
        (await mute.count()) === 1 &&
        (await mute.isDisabled()) &&
        (await block.count()) === 1 &&
        (await block.isDisabled()) &&
        (await composer.count()) === 1 &&
        (await composer.isDisabled()) &&
        (await marker.getAttribute("data-membership-actions")) === "disabled" &&
        (await page.getByRole("dialog").count()) === 0,
      `${test.name}: membership, composer, and profile moderation paths are read-only offline`
    );
    return true;
  }
  if (test.name === "40-proof-consent") {
    const fixtureUrl = page.url();
    await pressButton(/^Keep private$/i);
    const privateText = await body();
    check(
      /Achievement proof kept private/i.test(privateText) &&
        /Only me · draft/i.test(privateText) &&
        (await marker.getAttribute("data-proof-sharing")) === "required",
      `${test.name}: private choice persists in the composer`,
      privateText
    );
    await page.goto(fixtureUrl, { waitUntil: "networkidle" });
    await settle(page);
    const restored = page.locator('[data-h1-state="40-proof-consent"]');
    await pressButton(/^Accept preview$/i);
    const acceptedText = await body();
    check(
      (await restored.getAttribute("data-proof-sharing")) === "accepted" &&
        /Proof-sharing consent accepted locally for Public · Morning crew/i.test(
          acceptedText
        ) &&
        /Sarah bundled-demo consented · Public · Morning crew accepted locally · fresh Apr 12, 2026 · confirmed fixture · not published/i.test(
          acceptedText
        ) &&
        !/consent required before audience sharing/i.test(acceptedText),
      `${test.name}: accepted proof consent reconciles audience and proof card`,
      acceptedText
    );
    return true;
  }
  if (test.name === "40-proof-pending") {
    const proof = page.getByRole("button", {
      name: /^Sarah Mission achievement/i,
    });
    check(
      (await proof.count()) === 1 && !(await proof.isDisabled()),
      `${test.name}: pending proof remains inspectable`
    );
    await activate(proof);
    await settle(page);
    const dialog = page.getByRole("dialog");
    const text = await dialog.innerText();
    const accept = page.getByRole("button", { name: /^Accept preview$/i });
    check(
      /Source: bundled local proof pending review/i.test(text) &&
        /freshness unavailable/i.test(text) &&
        /confidence: low, validation pending/i.test(text) &&
        /audience consent: pending/i.test(text) &&
        !/confidence: confirmed fixture|freshness: Apr 12, 2026/i.test(text),
      `${test.name}: proof review preserves pending, low-confidence metadata`,
      text
    );
    check(
      (await accept.count()) === 1 &&
        (await accept.isDisabled()) &&
        /Proof validation is pending at low confidence\. Public acceptance is disabled; Keep private remains available\./i.test(
          text
        ) &&
        (await marker.getAttribute("data-proof-sharing")) === "required",
      `${test.name}: pending proof cannot be accepted into a public audience`,
      text
    );
    await pressButton(/^Keep private$/i);
    check(
      (await marker.getAttribute("data-proof-sharing")) === "required" &&
        /Achievement proof kept private\. Audience consent remains off\./i.test(
          await body()
        ),
      `${test.name}: private fallback preserves the unresolved consent state`
    );
    return true;
  }
  if (test.name === "40-block-member-confirm") {
    await pressButton(/^Confirm$/i);
    const text = await body();
    check(
      /Morning crew Community · 4 members/i.test(text) &&
        !/Sarah: Great workout/i.test(text) &&
        !/Sarah Mission achievement/i.test(text),
      `${test.name}: blocked member content and count reconcile`,
      text
    );
    check(
      (await marker.getAttribute("data-blocked-sarah")) === "true" &&
        (await page
          .getByRole("button", { name: /^Unblock Sarah locally$/i })
          .count()) === 1,
      `${test.name}: block persists with an explicit reversal`
    );
    await pressButton(/^Unblock Sarah locally$/i);
    const restoredText = await body();
    check(
      (await marker.getAttribute("data-blocked-sarah")) === "false" &&
        /Morning crew Community · 5 members/i.test(restoredText) &&
        /Sarah[\s\S]*Great workout this morning/i.test(restoredText) &&
        /Sarah Mission achievement/i.test(restoredText) &&
        /Sarah unblocked locally\. Her bundled messages and proof are visible again\./i.test(
          restoredText
        ),
      `${test.name}: unblock restores Sarah's member count, message, and proof`,
      restoredText
    );
    return true;
  }
  if (test.name === "40-leave-room-confirm") {
    await pressButton(/^Confirm$/i);
    const text = await body();
    check(
      /Your Communities · 2 joined/i.test(text) &&
        /Morning crew left locally/i.test(text) &&
        (await page.getByRole("heading", { name: /Morning crew Community/i }).count()) ===
          0,
      `${test.name}: leaving removes the room and membership count`,
      text
    );
    return true;
  }
  if (test.name === "46-offline") {
    const review = page.getByRole("button", { name: /^Review permissions$/i });
    const add = page.getByRole("button", { name: /^Add partner$/i });
    const revoke = page.getByRole("button", {
      name: /^Revoke Aisha access$/i,
    });
    check(
      (await review.count()) === 1 &&
        !(await review.isDisabled()) &&
        (await add.count()) === 1 &&
        (await add.isDisabled()) &&
        (await revoke.count()) === 1 &&
        (await revoke.isDisabled()) &&
        /Cached partner records · 2 last known active/i.test(await body()),
      `${test.name}: offline partner mutations are blocked`
    );
    await activate(review);
    await settle(page);
    const modalRevoke = page.getByRole("button", {
      name: /^Revoke Aisha Khan access$/i,
    });
    check(
      (await modalRevoke.count()) === 1 && (await modalRevoke.isDisabled()),
      `${test.name}: permission review remains read-only offline`
    );
    return true;
  }
  if (test.name === "46-revoke-confirm") {
    await pressButton(/^Confirm revoke$/i);
    const text = await body();
    check(
      /Aisha Khan access revoked locally/i.test(text) &&
        /Active partners · 1 connected/i.test(text) &&
        !/Aisha consent active/i.test(text),
      `${test.name}: revoke removes Aisha's active access`,
      text
    );
    check(
      (await page.getByRole("button", { name: /^Revoke Aisha access$/i }).count()) ===
        0,
      `${test.name}: revoked access cannot be revoked twice`
    );
    return true;
  }
  if (test.name === "47-invitation-sheet") {
    const fixtureUrl = page.url();
    const inviteReport = page.getByRole("link", {
      name: /^Report or mute Weekend Warrior$/i,
    });
    check(
      (await inviteReport.count()) === 1 &&
        (await inviteReport.getAttribute("data-report-subject")) ===
          "Weekend Warrior" &&
        /\/screens\/64\?context=competition&subject=Weekend%20Warrior$/i.test(
          (await inviteReport.getAttribute("href")) ?? ""
        ),
      `${test.name}: invitation safety handoff owns the exact Weekend Warrior target`,
      {
        href: await inviteReport.getAttribute("href"),
        subject: await inviteReport.getAttribute("data-report-subject"),
      }
    );
    await pressButton(/^Decline$/i);
    const declineEvidence = {
      status: await marker.getAttribute("data-invitation-status"),
      pendingAction: await page
        .getByRole("button", { name: /Sarah and Ahmed · Weekend Warrior/i })
        .count(),
      body: await body(),
    };
    check(
      declineEvidence.status === "declined" &&
        declineEvidence.pendingAction === 0 &&
        /0 pending/i.test(declineEvidence.body) &&
        /Weekend Warrior invitation declined locally · no pending invitation remains\./i.test(
          declineEvidence.body
        ),
      `${test.name}: decline reconciles invitation lifecycle`,
      declineEvidence
    );
    await page.goto(fixtureUrl, { waitUntil: "networkidle" });
    await settle(page);
    const restored = page.locator('[data-h1-state="47-invitation-sheet"]');
    await pressButton(/^Accept$/i);
    const acceptEvidence = {
      status: await restored.getAttribute("data-invitation-status"),
      pendingAction: await page
        .getByRole("button", { name: /Sarah and Ahmed · Weekend Warrior/i })
        .count(),
      body: await body(),
    };
    check(
      acceptEvidence.status === "accepted" &&
        acceptEvidence.pendingAction === 0 &&
        /0 pending/i.test(acceptEvidence.body) &&
        /Weekend Warrior invitation accepted locally · no pending invitation remains\./i.test(
          acceptEvidence.body
        ),
      `${test.name}: accept reconciles invitation lifecycle`,
      acceptEvidence
    );
    await page.goto(fixtureUrl, { waitUntil: "networkidle" });
    await settle(page);
    const blockMarker = page.locator('[data-h1-state="47-invitation-sheet"]');
    await pressButton(/^Block inviters Sarah and Ahmed$/i);
    const blockedText = await body();
    check(
      (await blockMarker.getAttribute("data-weekend-inviters")) === "blocked" &&
        (await blockMarker.getAttribute("data-invitation-status")) ===
          "declined" &&
        /Sarah and Ahmed blocked locally for Weekend Warrior; the invitation was removed\. Unblock is available below\./i.test(
          blockedText
        ) &&
        (await page
          .getByRole("button", { name: /Sarah and Ahmed · Weekend Warrior/i })
          .count()) === 0,
      `${test.name}: named inviter block removes the invitation and persists locally`,
      blockedText
    );
    await pressButton(/^Unblock Sarah and Ahmed$/i);
    const unblockedText = await body();
    check(
      (await blockMarker.getAttribute("data-weekend-inviters")) ===
        "available" &&
        /Sarah and Ahmed unblocked locally\. The declined invitation was not restored\./i.test(
          unblockedText
        ) &&
        (await page
          .getByRole("button", { name: /Sarah and Ahmed · Weekend Warrior/i })
          .count()) === 0,
      `${test.name}: named inviter unblock reverses the block without resurrecting a declined invitation`,
      unblockedText
    );
    return true;
  }
  if (test.name === "47-join-confirm") {
    const consent = page.getByRole("checkbox", {
      name: /I reviewed the rules and audience/i,
    });
    const join = page.getByRole("button", { name: /^Join preview$/i });
    check(
      (await consent.count()) === 1 && (await join.isDisabled()),
      `${test.name}: join starts gated by explicit review`
    );
    await activate(consent);
    check(!(await join.isDisabled()), `${test.name}: review enables join`);
    await activate(join);
    await settle(page);
    check(
      (await marker.getAttribute("data-membership")) === "joined" &&
        /Rank #42 of 234/i.test(await body()),
      `${test.name}: confirmed join exposes joined rank`
    );
    return true;
  }
  if (test.name === "47-join-disabled-consent") {
    const hero = page.getByRole("button", { name: /^Review and join$/i });
    const row = page
      .getByRole("tabpanel", { name: /^All challenges$/i })
      .getByRole("button", { name: /^Step Challenge #12/i });
    check(
      (await hero.count()) === 1 &&
        !(await hero.isDisabled()) &&
        (await row.count()) === 1 &&
        !(await row.isDisabled()) &&
        (await marker.getAttribute("data-membership")) === "not-joined" &&
        (await page.getByRole("dialog").count()) === 0,
      `${test.name}: join recovery entry points remain inspectable`
    );
    await activate(hero);
    await settle(page);
    const consent = page.getByRole("checkbox", {
      name: /I reviewed the rules and audience/i,
    });
    const join = page.getByRole("button", { name: /^Join preview$/i });
    check(
      (await consent.count()) === 1 &&
        !(await consent.isChecked()) &&
        (await join.isDisabled()) &&
        /Review the rules here, then save Friends only in Visibility before joining/i.test(
          await page.getByRole("dialog").innerText()
        ),
      `${test.name}: recovery modal names both unmet requirements`
    );
    await activate(consent);
    check(
      await join.isDisabled(),
      `${test.name}: rule review alone does not bypass the audience requirement`
    );
    await pressButton(/^Close$/i);
    await pressButton(/^Visibility$/i);
    const audience = page.getByRole("combobox", {
      name: /^Leaderboard audience$/i,
    });
    await audience.selectOption({ label: "Friends only" });
    await pressButton(/^Save visibility preview$/i);
    check(
      (await marker.getAttribute("data-leaderboard-audience")) ===
        "Friends only" &&
        /Competition visibility saved locally: Friends only; health proof off\. Reopen Visibility to change it\./i.test(
          await body()
        ),
      `${test.name}: visibility recovery persists the required friends-only audience`
    );
    await pressButton(/^Review and join$/i);
    const recoveredJoin = page.getByRole("button", { name: /^Join preview$/i });
    check(
      await consent.isChecked() && !(await recoveredJoin.isDisabled()),
      `${test.name}: preserved rule review plus saved audience enables join`
    );
    await activate(recoveredJoin);
    await settle(page);
    check(
      (await marker.getAttribute("data-membership")) === "joined" &&
        /Rank #42 of 234/i.test(await body()),
      `${test.name}: completed recovery reaches a joined state`
    );
    return true;
  }
  if (test.name === "47-visibility-controls") {
    const audience = page.getByRole("combobox", {
      name: /^Leaderboard audience$/i,
    });
    const proof = page.getByRole("checkbox", {
      name: /^Share health proof$/i,
    });
    check(
      (await audience.inputValue()) === "Only me" && !(await proof.isChecked()),
      `${test.name}: controlled visibility starts private with proof off`
    );
    await audience.selectOption({ label: "Friends only" });
    await activate(proof);
    await pressButton(/^Save visibility preview$/i);
    check(
      (await marker.getAttribute("data-leaderboard-audience")) ===
        "Friends only" &&
        (await marker.getAttribute("data-health-proof")) === "on" &&
        /Competition visibility saved locally: Friends only; health proof on\. Reopen Visibility to change it\./i.test(
          await body()
        ),
      `${test.name}: controlled visibility save reconciles audience, proof, and status`
    );
    await pressButton(/^Visibility$/i);
    check(
      (await audience.inputValue()) === "Friends only" &&
        (await proof.isChecked()),
      `${test.name}: reopening visibility preserves both controlled values`
    );
    await pressButton(/^Keep private$/i);
    check(
      (await marker.getAttribute("data-leaderboard-audience")) === "Only me" &&
        (await marker.getAttribute("data-health-proof")) === "off" &&
        /Competition visibility kept Only me with health proof off\./i.test(
          await body()
        ),
      `${test.name}: Keep private explicitly reverses controlled visibility`
    );
    return true;
  }
  if (test.name === "47-error-cached") {
    const hero = page.getByRole("button", { name: /^View rules$/i });
    const row = page
      .getByRole("tabpanel", { name: /^All challenges$/i })
      .getByRole("button", { name: /^Step Challenge #12/i });
    const invitation = page.getByRole("button", {
      name: /Sarah and Ahmed · Weekend Warrior/i,
    });
    check(
      (await hero.count()) === 1 &&
        (await hero.isDisabled()) &&
        (await row.count()) === 1 &&
        (await row.isDisabled()) &&
        (await invitation.count()) === 1 &&
        (await invitation.isDisabled()) &&
        (await page.getByRole("dialog").count()) === 0,
      `${test.name}: cached source error blocks every membership entry`
    );
    await pressButton(/^Retry competition source$/i);
    check(
      /Competition source retry previewed locally\. Cached challenges remain; no network request occurred\./i.test(
        await body()
      ),
      `${test.name}: retry is source-specific and capability-honest`
    );
    await pressButton(/^Visibility$/i);
    const audience = page.getByRole("combobox", {
      name: /^Leaderboard audience$/i,
    });
    const proof = page.getByRole("checkbox", {
      name: /^Share health proof$/i,
    });
    check(
      (await audience.count()) === 1 &&
        (await audience.isDisabled()) &&
        (await proof.count()) === 1 &&
        (await proof.isDisabled()),
      `${test.name}: cached source error keeps proof controls read-only`
    );
    return true;
  }
  if (test.name === "47-offline") {
    const hero = page.getByRole("button", { name: /^View rules$/i });
    const row = page
      .getByRole("tabpanel", { name: /^All challenges$/i })
      .getByRole("button", { name: /^Step Challenge #12/i });
    const text = await body();
    check(
      (await hero.count()) === 1 &&
        (await hero.isDisabled()) &&
        (await row.count()) === 1 &&
        (await row.isDisabled()) &&
        (await marker.getAttribute("data-membership")) === "joined" &&
        (await page.getByRole("dialog").count()) === 0 &&
        /Offline — cached challenges only/i.test(text) &&
        /Join and proof changes are disabled/i.test(text),
      `${test.name}: cached membership stays visible and mutable paths stay blocked`,
      text
    );
    return true;
  }
  if (test.name === "47-report-handoff") {
    const selected = await marker.getAttribute("data-selected-competition");
    check(
      selected === "Step Challenge #12",
      `${test.name}: default selected competition is explicit before moderation`,
      selected
    );
    await pressButton(/^Mute Step Challenge #12$/i);
    check(
      (await marker.getAttribute("data-muted-competition")) ===
        "Step Challenge #12" &&
        /Step Challenge #12 alerts muted locally\. The challenge remains visible; unmute is available here\./i.test(
          await body()
        ),
      `${test.name}: selected competition mute persists without hiding membership`
    );
    await pressButton(/^Unmute Step Challenge #12$/i);
    check(
      (await marker.getAttribute("data-muted-competition")) === "none" &&
        /Step Challenge #12 alerts unmuted locally\./i.test(await body()),
      `${test.name}: selected competition exposes and completes unmute`
    );
    await pressButton(/^Review own-challenge deletion rules$/i);
    check(
      /No owned challenge is selected in this bundled preview; nothing was deleted\./i.test(
        await body()
      ),
      `${test.name}: deletion review does not claim ownership or deletion`
    );
    const link = page.getByRole("link", {
      name: /^Report or mute Step Challenge #12$/i,
    });
    check(
      (await link.count()) === 1 &&
        (await link.isVisible()) &&
        (await link.getAttribute("data-report-subject")) ===
          "Step Challenge #12",
      `${test.name}: report handoff link preserves the selected competition target`
    );
    await link.focus();
    await link.press("Enter");
    await page.waitForURL(/\/screens\/64/);
    await settle(page);
    const target = page.locator('[data-h1-state="64-default-neutral"]');
    await target.waitFor();
    check(
      (await target.getAttribute("data-report-context")) === "competition" &&
        (await target.getAttribute("data-report-subject")) ===
          "Step Challenge #12",
      `${test.name}: report handoff preserves competition context`
    );
    return true;
  }
  if (test.name === "64-missing-context") {
    const beforeUrl = page.url();
    await pressButton(/^Acknowledge$/i);
    const text = await body();
    check(
      page.url() === beforeUrl &&
        /Source return is unavailable in this standalone review\. Nothing changed\./i.test(
          text
        ) &&
        (await marker.getAttribute("data-report-subject")) === "none" &&
        (await marker.getAttribute("data-submitted")) === "false",
      `${test.name}: acknowledgement stays put and creates no guessed context or report`,
      { beforeUrl, afterUrl: page.url(), text }
    );
    await page.keyboard.press("Escape");
    await settle(page);
    const escapeText = await body();
    check(
      page.url() === beforeUrl &&
        /The unavailable source route was not opened\. Close this standalone preview manually\./i.test(
          escapeText
        ) &&
        !/Return to the source/i.test(escapeText) &&
        (await marker.getAttribute("data-report-subject")) === "none" &&
        (await marker.getAttribute("data-submitted")) === "false",
      `${test.name}: Escape preserves missing context without inventing a return path`,
      { beforeUrl, afterUrl: page.url(), text: escapeText }
    );
    await pressButton(/^Cancel$/i);
    const cancelText = await body();
    check(
      page.url() === beforeUrl &&
        /The unavailable source route was not opened\. Close this standalone preview manually\./i.test(
          cancelText
        ) &&
        !/Your session-only draft will be cleared|Report draft discarded locally/i.test(
          cancelText
        ) &&
        (await page.getByRole("dialog").count()) === 1 &&
        (await marker.getAttribute("data-report-delivery")) === "none" &&
        (await marker.getAttribute("data-report-subject")) === "none" &&
        (await marker.getAttribute("data-submitted")) === "false",
      `${test.name}: header Cancel creates no draft or discard claim when context is absent`,
      { beforeUrl, afterUrl: page.url(), text: cancelText }
    );
    return true;
  }
  if (test.name === "64-offline-preview") {
    const reason = page.getByRole("radio", { name: /^Harassment$/i });
    await activate(reason);
    await settle(page);
    await pressButton(/^Submit report$/i);
    const confirmText = await page.getByRole("dialog").last().innerText();
    check(
      /prototype sends nothing and causes no punishment/i.test(confirmText),
      `${test.name}: offline confirmation preserves report capability boundaries`,
      confirmText
    );
    await pressButton(/^Confirm report$/i);
    const queuedText = await body();
    check(
      (await marker.getAttribute("data-submitted")) === "true" &&
        /Queued offline/i.test(queuedText) &&
        /Report queued locally while offline · it will send after reconnect in the intended product; this prototype made no network request\./i.test(
          queuedText
        ) &&
        /No reviewer can see it until a real product reconnects and submits it; this prototype sends nothing\./i.test(
          queuedText
        ),
      `${test.name}: offline report queues locally with no false submission or reviewer visibility`,
      queuedText
    );
    return true;
  }
  if (test.name === "64-block-on") {
    const reason = page.getByRole("radio", { name: /^Harassment$/i });
    const secondary = page.getByRole("switch");
    check(
      (await reason.count()) === 1 &&
        (await secondary.count()) === 1 &&
        (await secondary.isChecked()),
      `${test.name}: explicit block-on fixture starts selected and still requires a reason`
    );
    await activate(reason);
    await settle(page);
    await pressButton(/^Submit report$/i);
    const confirmText = await page.getByRole("dialog").last().innerText();
    check(
      /Blocking is also selected/i.test(confirmText) &&
        /records the local preference while leaving the source context visible here/i.test(
          confirmText
        ) &&
        /prototype sends nothing and causes no punishment/i.test(confirmText),
      `${test.name}: confirmation separates the local block preference from report handling without claiming hidden context`,
      confirmText
    );
    await pressButton(/^Confirm report$/i);
    const pendingText = await body();
    check(
      (await marker.getAttribute("data-submitted")) === "true" &&
        /Report submitted locally · Pending review\. Deleted user block preference recorded locally; this source preview remains visible\./i.test(
          pendingText
        ) &&
        /nothing was sent to a moderation reviewer/i.test(pendingText) &&
        (await page
          .getByRole("button", { name: /^Unblock Deleted user$/i })
          .count()) === 1,
      `${test.name}: report remains pending while the distinct local block persists`,
      pendingText
    );
    await pressButton(/^Unblock Deleted user$/i);
    const reversedText = await body();
    check(
      (await marker.getAttribute("data-submitted")) === "true" &&
        /Deleted user unblocked locally\. The report remains pending\./i.test(
          reversedText
        ) &&
        /Pending review/i.test(reversedText) &&
        !(await secondary.isChecked()),
      `${test.name}: explicit unblock reverses the local preference while preserving the pending report`,
      reversedText
    );
    return true;
  }
  if (test.name === "64-submit-confirm") {
    await pressButton(/^Confirm report$/i);
    check(
      (await marker.getAttribute("data-submitted")) === "true",
      `${test.name}: report enters submitted state`
    );
    const pending = page.getByRole("button", { name: /^Pending review$/i });
    check(
      (await pending.count()) === 1 && (await pending.isDisabled()),
      `${test.name}: submitted report locks repeat submission`
    );
    check(
      /Pending review/i.test(await body()),
      `${test.name}: submitted state remains visibly pending`
    );
    return true;
  }
  if (test.name === "64-submission-error") {
    await pressButton(/^Submit report$/i);
    await pressButton(/^Confirm report$/i);
    const text = await body();
    const retryEvidence = {
      submitted: await marker.getAttribute("data-submitted"),
      alerts: await marker.getByRole("alert").count(),
      staleErrorCopy: /Couldn't submit|Check your connection|try again/i.test(
        text
      ),
      pending: /Pending review/i.test(text),
      body: text,
    };
    check(
      retryEvidence.submitted === "true" &&
        retryEvidence.alerts === 0 &&
        !retryEvidence.staleErrorCopy &&
        retryEvidence.pending,
      `${test.name}: successful retry clears prior error truth`,
      retryEvidence
    );
    return true;
  }
  if (test.name === "78-low-confidence") {
    const topLevel = page.getByRole("button", { name: /^Review export$/i });
    check(
      (await topLevel.count()) === 1 && (await topLevel.isDisabled()),
      `${test.name}: top-level export is disabled`
    );
    const report = page.getByRole("button", { name: /Weekly life report/i });
    check(
      (await report.count()) === 1,
      `${test.name}: low-confidence report preview exists`
    );
    await activate(report);
    await settle(page);
    const modalExport = page.getByRole("button", {
      name: /^Review and export$/i,
    });
    check(
      (await modalExport.count()) === 1 && (await modalExport.isDisabled()),
      `${test.name}: modal export is also disabled`
    );
    await pressButton(/^Screenshot guide$/i);
    const guideText = await page.getByRole("dialog").innerText();
    check(
      /Balencia does not capture screenshots/i.test(guideText) &&
        /review the included and excluded fields/i.test(guideText) &&
        /Use your device's own screenshot controls/i.test(guideText) &&
        /Crop or delete the image in your device photo library/i.test(
          guideText
        ) &&
        /No screenshot, clipboard, file, or photo-library capability is invoked by this preview/i.test(
          guideText
        ),
      `${test.name}: screenshot affordance is instructional and invokes no capture capability`,
      guideText
    );
    return true;
  }
  if (test.name === "78-honest-null") {
    await pressButton(/^Create report$/i);
    await pressButton(/^Create draft$/i);
    const text = await body();
    const draft = page.getByRole("button", {
      name: /Weekly life report · new draft/i,
    });
    const review = page.getByRole("button", { name: /^Review export$/i });
    check(
      (await marker.getAttribute("data-source-quality")) ===
        "no-source-coverage" &&
        (await marker.getAttribute("data-report-count")) === "1" &&
        (await marker.getAttribute("data-doctor-summary")) === "absent" &&
        (await marker.getAttribute("data-new-report-draft")) === "created" &&
        /0 ready · 1 draft/i.test(text) &&
        /Weekly life report draft created locally and added to Recent reports\./i.test(
          text
        ) &&
        (await draft.count()) === 1 &&
        /No days selected[\s\S]*Draft created locally[\s\S]*local session draft/i.test(
          await draft.innerText()
        ) &&
        (await review.count()) === 1 &&
        (await review.isDisabled()) &&
        /Add source coverage before reviewing export from this local draft/i.test(
          text
        ) &&
        (await page.getByRole("heading", { name: /^This week$/i }).count()) ===
          0 &&
        !/\b(?:82%|64%|86%|43%)\b/i.test(text),
      `${test.name}: local draft becomes visible with exact count while sourced metrics and export remain absent`,
      text
    );
    const newReport = page.getByRole("button", {
      name: /^Local draft created$/i,
    });
    check(
      (await newReport.count()) === 1 &&
        (await newReport.isDisabled()) &&
        /Delete the current local draft before creating another in this visual preview\./i.test(
          text
        ),
      `${test.name}: honest-null draft is intentionally singleton`
    );
    await pressButton(/^Data controls$/i);
    const dataText = await page.getByRole("dialog").innerText();
    const deleteDraft = page.getByRole("button", {
      name: /^Delete Weekly life report local draft$/i,
    });
    check(
      /Weekly life report local draft · no source coverage · Only me · no export recipient · session-only retention\./i.test(
        dataText
      ) &&
        !/refreshed Nov 18|confirmed|Generated report preview · bundled demo/i.test(
          dataText
        ) &&
        (await deleteDraft.count()) === 1 &&
        !(await deleteDraft.isDisabled()),
      `${test.name}: data controls bind to the actual local draft without fabricated source claims`,
      dataText
    );
    await pressButton(/^Delete Weekly life report local draft$/i);
    const deleteText = await page.getByRole("dialog").innerText();
    check(
      /Delete Weekly life report local draft\?/i.test(deleteText) &&
        /Deletes only the Weekly life report local draft/i.test(deleteText) &&
        /Underlying source data stays unchanged/i.test(deleteText),
      `${test.name}: delete confirmation preserves the exact local draft target`,
      deleteText
    );
    await pressButton(/^Confirm delete$/i);
    const deletedText = await body();
    check(
      (await marker.getAttribute("data-report-count")) === "0" &&
        (await marker.getAttribute("data-new-report-draft")) === "none" &&
        /Weekly life report local draft deleted\./i.test(deletedText) &&
        /Create your first report/i.test(deletedText) &&
        (await page
          .getByRole("button", { name: /Weekly life report · new draft/i })
          .count()) === 0,
      `${test.name}: deleting the local draft returns to honest null`,
      deletedText
    );
    return true;
  }
  if (test.name === "78-new-report-builder") {
    const type = page.getByRole("combobox", { name: /^Report type$/i });
    check(
      (await type.count()) === 1 &&
        (await type.inputValue()) === "Weekly life report",
      `${test.name}: new draft starts with an explicit report type`
    );
    await pressButton(/^Create draft$/i);
    const text = await body();
    const newCard = page.getByRole("button", {
      name: /Weekly life report · new draft/i,
    });
    check(
      (await marker.getAttribute("data-new-report-draft")) === "created" &&
        (await marker.getAttribute("data-report-count")) === "3" &&
        /1 ready · 2 drafts/i.test(text) &&
        /Weekly life report draft created locally and added to Recent reports\./i.test(
          text
        ) &&
        (await newCard.count()) === 1 &&
        /No days selected[\s\S]*Draft created locally/i.test(
          (await newCard.innerText()) ?? ""
        ),
      `${test.name}: new draft reconciles the exact count, metadata, and card`,
      text
    );
    return true;
  }
  if (test.name === "78-report-delete-confirm") {
    await pressButton(/^Confirm delete$/i);
    check(
      (await marker.getAttribute("data-doctor-summary")) === "deleted" &&
        (await marker.getAttribute("data-report-count")) === "1",
      `${test.name}: deleting the draft reconciles report state`
    );
    check(
      (await page.getByRole("button", { name: /Doctor summary/i }).count()) === 0 &&
        /1 ready/i.test(await body()),
      `${test.name}: deleted draft is absent from recent reports`
    );
    return true;
  }
  if (test.name === "78-data-controls") {
    await pressButton(/^Revoke access$/i);
    check(
      (await marker.getAttribute("data-audience-access")) === "revoked",
      `${test.name}: revoke changes the audience-access marker`
    );
    const restore = page.getByRole("button", {
      name: /^Restore Only me preview access$/i,
    });
    check(
      (await restore.count()) === 1 &&
        !(await restore.isDisabled()) &&
        /Audience access revoked locally\. Export scope is now off\./i.test(
          await body()
        ),
      `${test.name}: revoked access exposes an explicit local restore path`
    );
    await pressButton(/^Close$/i);
    const exportAction = page.getByRole("button", {
      name: /^Review export$/i,
    });
    check(
      (await exportAction.count()) === 1 && (await exportAction.isDisabled()),
      `${test.name}: revoked access disables export`
    );
    await pressButton(/^Data controls$/i);
    await pressButton(/^Restore Only me preview access$/i);
    check(
      (await marker.getAttribute("data-audience-access")) === "available" &&
        /Only me preview access restored locally\. Review scope before export\./i.test(
          await body()
        ),
      `${test.name}: access restore clears the revoked marker without implying export`
    );
    await pressButton(/^Close$/i);
    const restoredExport = page.getByRole("button", {
      name: /^Review export$/i,
    });
    check(
      (await restoredExport.count()) === 1 &&
        !(await restoredExport.isDisabled()),
      `${test.name}: restored access re-enables review while retaining explicit scope review`
    );
    return true;
  }
  if (test.name === "78-matrix-detail") {
    await pressButton(/^Mark as not useful$/i);
    const hiddenText = await body();
    const restoreAssociation = page.getByRole("button", {
      name: /^Restore association$/i,
    });
    check(
      (await marker.getAttribute("data-association-signal")) === "hidden" &&
        (await restoreAssociation.count()) === 1 &&
        (await restoreAssociation.isVisible()) &&
        /Sleep\/work association hidden locally because you marked it not useful\. No source data changed\./i.test(
          hiddenText
        ) &&
        (await page
          .getByRole("button", { name: /^Explore association$/i })
          .count()) === 0,
      `${test.name}: correction hides the association without changing source data`,
      hiddenText
    );
    await activate(restoreAssociation);
    await settle(page);
    const restoredText = await body();
    check(
      (await marker.getAttribute("data-association-signal")) === "visible" &&
        (await restoreAssociation.count()) === 0 &&
        /Sleep\/work association restored locally\./i.test(restoredText) &&
        (await page
          .getByRole("button", { name: /^Explore association$/i })
          .count()) === 1,
      `${test.name}: restore returns the association and correction affordance`,
      restoredText
    );
    return true;
  }
  if (test.name === "82-check-detail") {
    await pressButton(/^Close$/i);
    await pressButton(/^Weekly review/i);
    const weeklyText = await page.getByRole("dialog").innerText();
    check(
      /Weekly review detail/i.test(weeklyText) &&
        /Weekly review · Monday evening · status-only proof check for the Run a half marathon Mission/i.test(
          weeklyText
        ) &&
        /Due next Monday · completion is not inferred before the review/i.test(
          weeklyText
        ) &&
        /Aisha can see completion status only while sharing is active/i.test(
          weeklyText
        ) &&
        /no journal, image, file, or notification is included/i.test(
          weeklyText
        ),
      `${test.name}: weekly-review detail modal names schedule, Mission, non-inference, audience, and exclusions`,
      weeklyText
    );
    return true;
  }
  if (test.name === "82-sharing-controls") {
    await pressButton(/^Revoke proof sharing$/i);
    const text = await body();
    const sharing = page.getByRole("button", { name: /^Sharing controls$/i });
    check(
      /Proof-status sharing is revoked/i.test(text) &&
        /Paused · not due/i.test(text) &&
        (await sharing.isDisabled()),
      `${test.name}: revoke suppresses proof fields and pauses verification`,
      text
    );
    return true;
  }
  if (test.name === "82-pause-confirm") {
    await pressButton(/^Confirm pause$/i);
    const text = await body();
    check(
      /Paused contract/i.test(text) && /Paused · not due/i.test(text),
      `${test.name}: pause updates lifecycle and due state`,
      text
    );
    check(
      await page.getByRole("button", { name: /^Sign update$/i }).isDisabled(),
      `${test.name}: paused contract cannot be signed`
    );
    return true;
  }
  if (test.name === "82-cancel-confirm") {
    await pressButton(/^Confirm cancel$/i);
    const text = await body();
    check(
      (await marker.getAttribute("data-contract-lifecycle")) === "cancelled" &&
        (await marker.getAttribute("data-proof-sharing")) === "off" &&
        !/83%|Due Monday evening|Aisha sees proof status only/i.test(text) &&
        /Contract closed · not due/i.test(text),
      `${test.name}: cancellation closes checks and current sharing`,
      text
    );
    return true;
  }
  if (test.name === "82-eligible-delete-confirm") {
    await pressButton(/^Confirm delete$/i);
    const text = await body();
    check(
      /Contract record deleted/i.test(text) &&
        !/Half marathon consistency/i.test(text),
      `${test.name}: deleted record is removed from the contract view`,
      text
    );
    return true;
  }
  if (test.name === "91-empty") {
    check(
      /No posts yet/i.test(await body()) &&
        (await marker.getAttribute("data-local-post-preview")) === "none",
      `${test.name}: empty feed starts without inferred posts or a saved local preview`
    );
    await pressButton(/^Post$/i);
    let dialogText = await page.getByRole("dialog").innerText();
    check(
      /Distance proof preview/i.test(dialogText) &&
        /Field: distance 5\.2 mi · source: bundled wearable demo/i.test(
          dialogText
        ) &&
        /Scope: Only me/i.test(dialogText),
      `${test.name}: empty-feed composer still names its available local proof preview`,
      dialogText
    );
    await pressButton(/^Close dialog$/i);
    await pressButton(/^Feed data controls$/i);
    dialogText = await page.getByRole("dialog").innerText();
    check(
      /No bundled feed posts, authors, comments, views, or kudos are available · local composer proof preview is available · audience Only me · session retention · no subject inferred\./i.test(
        dialogText
      ) && !/No proof data|local composer proof is not attached/i.test(dialogText),
      `${test.name}: empty-feed data summary distinguishes absent feed posts from available composer proof`,
      dialogText
    );
    return true;
  }
  if (test.name === "91-default-consented") {
    const discussion = page.getByRole("button", { name: /^Discussion$/i });
    const question = page.getByRole("button", { name: /^Question$/i });
    const win = page.getByRole("button", { name: /^Win$/i });
    check(
      (await discussion.getAttribute("aria-pressed")) === "true" &&
        (await question.getAttribute("aria-pressed")) === "false" &&
        (await win.getAttribute("aria-pressed")) === "false" &&
        (await discussion.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )),
      `${test.name}: Discussion starts with matching pressed and selected visuals`
    );
    await pressButton(/^Question$/i);
    check(
      (await discussion.getAttribute("aria-pressed")) === "false" &&
        (await question.getAttribute("aria-pressed")) === "true" &&
        (await win.getAttribute("aria-pressed")) === "false" &&
        (await question.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )) &&
        !(await discussion.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )) &&
        /Question post type selected locally\./i.test(await body()),
      `${test.name}: post-type selection keeps aria-pressed, visual state, and status aligned`
    );
    await pressButton(/^Review proof update$/i);
    await pressButton(/^Save local preview$/i);
    const localPostText = await body();
    check(
      (await page
        .locator('[data-h1-state="91-default-consented"]')
        .getAttribute("data-local-post-preview")) === "saved" &&
        /Post saved to the local preview shown below\. Nothing was published\./i.test(
          localPostText
        ) &&
        /You · Question · local preview/i.test(localPostText) &&
        /Audience: Only me · Distance 5\.2 mi · bundled wearable demo · session only · not published/i.test(
          localPostText
        ),
      `${test.name}: composer creates a visible, audience-bound local post without publication`,
      localPostText
    );
    await pressButton(/^Review proof update$/i);
    await pressButton(/^Remove proof$/i);
    const savedPost = page
      .getByText(/^You · Question · local preview$/i)
      .locator("xpath=..");
    let reconciledProof = await savedPost.innerText();
    check(
      /Text only · proof removed locally/i.test(reconciledProof) &&
        !/5\.2 mi/i.test(reconciledProof),
      `${test.name}: removing proof reconciles the already-saved local preview`,
      reconciledProof
    );
    await pressButton(/^Revoke source$/i);
    reconciledProof = await savedPost.innerText();
    check(
      /Text only · proof source revoked locally/i.test(reconciledProof) &&
        !/5\.2 mi/i.test(reconciledProof),
      `${test.name}: revoking the proof source reconciles the already-saved local preview`,
      reconciledProof
    );
    await pressButton(/^Close dialog$/i);
    const allTab = page.getByRole("tab", { name: /^All$/i });
    const communitiesTab = page.getByRole("tab", {
      name: /^Communities$/i,
    });
    check(
      (await allTab.getAttribute("aria-selected")) === "true" &&
        (await allTab.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )),
      `${test.name}: All feed filter starts with aligned selected semantics and visuals`
    );
    await activate(communitiesTab);
    await settle(page);
    check(
      (await communitiesTab.getAttribute("aria-selected")) === "true" &&
        (await allTab.getAttribute("aria-selected")) === "false" &&
        (await communitiesTab.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )) &&
        (await page.getByRole("tabpanel", { name: /^Communities feed$/i }).count()) ===
          1,
      `${test.name}: feed filter selection aligns aria, visual state, and panel`
    );
    const malikHeading = page
      .getByRole("tabpanel", { name: /^Communities feed$/i })
      .getByRole("heading", { name: /^Malik R\.$/i });
    const malikCard = malikHeading.locator("xpath=ancestor::section[1]");
    const malikKudos = malikCard.getByRole("button", { name: /^Kudos$/i });
    await activate(malikKudos);
    await settle(page);
    const malikUndo = malikCard.getByRole("button", {
      name: /^Undo kudos$/i,
    });
    check(
      (await malikUndo.getAttribute("aria-pressed")) === "true" &&
        /Kudos 8 · Comments 2 · Views unavailable/i.test(
          await malikCard.innerText()
        ) &&
        /Kudos on Malik R\.'s post queued locally\. Undo is available on the post\./i.test(
          await body()
        ),
      `${test.name}: Malik-specific kudos persists in pressed state and count`
    );
    await activate(malikUndo);
    await settle(page);
    check(
      (await malikKudos.getAttribute("aria-pressed")) === "false" &&
        /Kudos 7 · Comments 2 · Views unavailable/i.test(
          await malikCard.innerText()
        ) &&
        /Kudos on Malik R\.'s post undone locally\./i.test(await body()),
      `${test.name}: Malik-specific kudos reversal restores the exact count`
    );
    await activate(malikCard.getByRole("button", { name: /^Comment$/i }));
    await settle(page);
    const malikCommentDialog = await page.getByRole("dialog").innerText();
    check(
      /Comment on Malik R\.'s post/i.test(malikCommentDialog) &&
        /“Budget routine reached 14 days\.”/i.test(malikCommentDialog),
      `${test.name}: comment composer owns Malik's exact post target`,
      malikCommentDialog
    );
    const malikComment = page.getByRole("textbox", { name: /^Comment$/i });
    await malikComment.fill("That budget streak looks steady.");
    await pressButton(/^Save comment$/i);
    check(
      (await page
        .locator('[data-h1-state="91-default-consented"]')
        .getAttribute("data-saved-comment-count")) === "1" &&
        /Comment on Malik R\.'s post saved and shown in the local preview\./i.test(
          await body()
        ) &&
        /On Malik R\.'s post · session only[\s\S]*That budget streak looks steady\./i.test(
          await body()
        ) &&
        /Kudos 7 · Comments 3 · Views unavailable/i.test(
          await malikCard.innerText()
        ),
      `${test.name}: Malik comment persists locally and increments only Malik's count`
    );
    await activate(allTab);
    await settle(page);
    const allText = await page
      .getByRole("tabpanel", { name: /^All feed$/i })
      .innerText();
    check(
      /Kudos 24 · Comments 6 · Views 83 · bundled demo/i.test(allText) &&
        /Kudos 7 · Comments 3 · Views unavailable/i.test(allText),
      `${test.name}: Malik comment leaves Aisha's engagement count unchanged`,
      allText
    );
    const malik = page.getByRole("button", {
      name: /^More actions for Malik R\.$/i,
    });
    check(
      (await malik.count()) === 1 && (await malik.isVisible()),
      `${test.name}: Malik moderation control exists`
    );
    await activate(malik);
    await settle(page);
    const dialogText = await page.getByRole("dialog").last().innerText();
    check(
      /Malik R\. post/i.test(dialogText) && !/Aisha Khan post/i.test(dialogText),
      `${test.name}: moderation follows the selected author`,
      dialogText
    );
    return true;
  }
  if (test.name === "91-comment-sheet") {
    const comment = page.getByRole("textbox", { name: /^Comment$/i });
    const save = page.getByRole("button", { name: /^Save comment$/i });
    check(
      (await comment.count()) === 1 && (await save.isDisabled()),
      `${test.name}: blank comment cannot be saved`
    );
    await comment.fill("You made that tempo run look steady.");
    await pressButton(/^Save comment$/i);
    const text = await body();
    check(
      (await marker.getAttribute("data-saved-comment-count")) === "1" &&
        /Comment on Aisha Khan's post saved and shown in the local preview\./i.test(
          text
        ) &&
        /Local comments/i.test(text) &&
        /On Aisha Khan's post · session only/i.test(text) &&
        /You made that tempo run look steady\./i.test(text) &&
        /Kudos 24 · Comments 7 · Views 83 · bundled demo/i.test(text),
      `${test.name}: saved comment is visible, target-bound, and reconciles Aisha's count`,
      text
    );
    return true;
  }
  if (test.name === "91-audience-unselected") {
    await pressButton(/^Review proof update$/i);
    const proofDialog = page.getByRole("dialog");
    const proofText = await proofDialog.innerText();
    const save = page.getByRole("button", { name: /^Save local preview$/i });
    check(
      /Scope: audience not selected/i.test(proofText) &&
        /Choose an audience before saving/i.test(proofText) &&
        !/Scope: selected audience/i.test(proofText) &&
        (await save.isDisabled()),
      `${test.name}: proof review does not imply an audience before selection`,
      proofText
    );
    await pressButton(/^Close dialog$/i);
    await pressButton(/^Feed data controls$/i);
    const dataText = await page.getByRole("dialog").innerText();
    check(
      /audience not selected/i.test(dataText) &&
        !/selected audience/i.test(dataText),
      `${test.name}: data controls preserve the unselected audience state`,
      dataText
    );
    return true;
  }
  if (test.name === "91-proof-preview") {
    await pressButton(/^Remove proof$/i);
    const text = await body();
    check(
      /No proof attached|Proof removed/i.test(text) && !/5\.2 mi/i.test(text),
      `${test.name}: removing proof suppresses distance and media`,
      text
    );
    check(
      await page.getByRole("button", { name: /^Proof removed$/i }).isDisabled(),
      `${test.name}: removed proof cannot be removed twice`
    );
    return true;
  }
  if (test.name === "91-proof-honest-null") {
    await pressButton(/^Post$/i);
    const text = await page.getByRole("dialog").innerText();
    const unavailable = page.getByRole("button", {
      name: /^Proof unavailable$/i,
    });
    const sourceUnavailable = page.getByRole("button", {
      name: /^Source unavailable$/i,
    });
    check(
      /Proof source unavailable/i.test(text) &&
        /The bundled proof source is unavailable/i.test(text) &&
        /no distance, source, media, or completion value is inferred/i.test(
          text
        ) &&
        !/5\.2 mi/i.test(text) &&
        !/Proof removed|Revoke source|Scope revoked|Proof sharing revoked/i.test(
          text
        ),
      `${test.name}: absent proof source never implies proof values or removal`,
      text
    );
    check(
      (await unavailable.count()) === 1 &&
        (await unavailable.isDisabled()) &&
        (await sourceUnavailable.count()) === 1 &&
        (await sourceUnavailable.isDisabled()) &&
        (await page.getByRole("button", { name: /^Proof removed$/i }).count()) ===
          0 &&
        (await page.getByRole("button", { name: /^Revoke source$/i }).count()) ===
          0,
      `${test.name}: absent proof and source are labeled unavailable and immutable`
    );
    await pressButton(/^Close dialog$/i);
    const settledText = await body();
    check(
      !/Wearable proof scope revoked|Proof sharing revoked|Scope revoked/i.test(
        settledText
      ),
      `${test.name}: unavailable source review creates no false revoked outcome`,
      settledText
    );
    return true;
  }
  if (test.name === "91-proof-low-confidence") {
    await pressButton(/^Revoke source$/i);
    const text = await body();
    const revoked = page.getByRole("button", { name: /^Scope revoked$/i });
    check(
      /Wearable proof scope revoked/i.test(text) &&
        !/5\.2 mi/i.test(text) &&
        (await revoked.count()) === 1 &&
        (await revoked.isDisabled()),
      `${test.name}: source revoke suppresses proof and locks repeat revoke`,
      text
    );
    return true;
  }
  if (test.name === "91-moderation-sheet") {
    const fixtureUrl = page.url();
    await pressButton(/^Mute Aisha$/i);
    check(
      (await marker.getAttribute("data-muted-posts")) === "1" &&
        /Aisha Khan post muted locally\. Undo is available below\./i.test(
          await body()
        ) &&
        /Muted locally · undo available/i.test(await body()),
      `${test.name}: mute persists as a distinct local outcome`
    );
    await pressButton(/^Undo mute Aisha Khan$/i);
    check(
      (await marker.getAttribute("data-muted-posts")) === "0" &&
        /Aisha Khan post unmuted locally\./i.test(await body()) &&
        (await page
          .getByRole("button", { name: /^More actions for Aisha Khan$/i })
          .count()) === 1,
      `${test.name}: mute reversal clears the marker and restores the unmuted post`
    );
    await page.goto(fixtureUrl, { waitUntil: "networkidle" });
    await settle(page);
    const blockMarker = page.locator('[data-h1-state="91-moderation-sheet"]');
    await pressButton(/^Block Aisha$/i);
    check(
      (await blockMarker.getAttribute("data-blocked-posts")) === "1" &&
        /Aisha Khan blocked locally\. Their bundled posts are hidden; unblock is available below\./i.test(
          await body()
        ) &&
        (await page.getByRole("button", { name: /^More actions for Aisha Khan$/i }).count()) ===
          0,
      `${test.name}: block persists and removes the selected author's post`
    );
    await pressButton(/^Unblock Aisha Khan$/i);
    check(
      (await blockMarker.getAttribute("data-blocked-posts")) === "0" &&
        /Aisha Khan unblocked locally\./i.test(await body()) &&
        (await page
          .getByRole("button", { name: /^More actions for Aisha Khan$/i })
          .count()) === 1,
      `${test.name}: block reversal restores the selected author's post`
    );
    await page.goto(fixtureUrl, { waitUntil: "networkidle" });
    await settle(page);
    const hideMarker = page.locator('[data-h1-state="91-moderation-sheet"]');
    await pressButton(/^Hide similar posts$/i);
    const hiddenPostCount = await hideMarker.getAttribute("data-hidden-posts");
    const hiddenBody = await body();
    const hiddenAishaActions = await page
      .getByRole("button", { name: /^More actions for Aisha Khan$/i })
      .count();
    check(
      hiddenPostCount === "1" &&
        /Similar posts from Aisha Khan hidden locally\. Undo is available below\./i.test(
          hiddenBody
        ) &&
        hiddenAishaActions === 0,
      `${test.name}: hide persists as a distinct local feed outcome`,
      { hiddenPostCount, hiddenAishaActions, body: hiddenBody }
    );
    await pressButton(/^Undo hide Aisha Khan$/i);
    check(
      (await hideMarker.getAttribute("data-hidden-posts")) === "0" &&
        /Hidden-post preference for Aisha Khan undone locally\./i.test(
          await body()
        ) &&
        (await page
          .getByRole("button", { name: /^More actions for Aisha Khan$/i })
          .count()) === 1,
      `${test.name}: hide reversal restores the selected post`
    );
    return true;
  }
  if (test.name === "91-own-delete-confirm") {
    await pressButton(/^Delete local post$/i);
    const text = await body();
    check(
      /Your local post preview was deleted/i.test(text) &&
        !/You · Evening walk complete/i.test(text),
      `${test.name}: own-post deletion removes the post card`,
      text
    );
    return true;
  }
  if (test.name === "94-registration-error") {
    await pressButton(/^Review registration$/i);
    await pressButton(/^Confirm local preview$/i);
    const success = page.locator('[data-h1-state="94-register-success"]');
    const text = await body();
    check(
      (await success.count()) === 1 &&
        (await success.getByRole("alert").count()) === 0 &&
        !/Registration preview failed/i.test(text) &&
        /Registration confirmed in this local preview/i.test(text),
      `${test.name}: successful registration retry clears failure state`,
      text
    );
    return true;
  }
  if (test.name === "94-calendar-preview") {
    const dialogText = await page.getByRole("dialog").innerText();
    check(
      /Live reset for sleep · Nov 14, 2026 · 7:00 PM EST · public webinar URL only/i.test(
        dialogText
      ) &&
        /No calendar or file capability is invoked/i.test(dialogText) &&
        !/Stress reset workshop|live-reset-sleep/i.test(dialogText),
      `${test.name}: calendar preview owns the exact live-event identity without invoking calendar capability`,
      dialogText
    );
    await pressButton(/^Save local summary$/i);
    const deleteSummary = page.getByRole("button", {
      name: /^Delete local summary$/i,
    });
    check(
      /Live reset for sleep calendar summary saved to the local preview shown below\./i.test(
        await body()
      ) &&
        (await marker.getAttribute("data-calendar-summary")) === "saved" &&
        (await page.getByRole("dialog").count()) === 0 &&
        (await deleteSummary.count()) === 1 &&
        (await deleteSummary.isVisible()) &&
        /Live reset for sleep[\s\S]*Nov 14, 2026 · 7:00 PM EST · public webinar URL only · local session summary · no calendar event or file created/i.test(
          await body()
        ),
      `${test.name}: calendar action creates an exact local summary with no event or file`
    );
    const upcoming = page.getByRole("tab", { name: /^Upcoming$/i });
    const recordings = page.getByRole("tab", { name: /^Recordings$/i });
    check(
      (await upcoming.getAttribute("aria-selected")) === "true" &&
        (await recordings.getAttribute("aria-selected")) === "false" &&
        (await upcoming.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )),
      `${test.name}: Upcoming tab starts with aligned selected semantics and visuals`
    );
    await activate(recordings);
    await settle(page);
    check(
      (await recordings.getAttribute("aria-selected")) === "true" &&
        (await upcoming.getAttribute("aria-selected")) === "false" &&
        (await recordings.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )) &&
        (await page
          .getByRole("tabpanel", { name: /^Recordings webinars$/i })
          .count()) === 1,
      `${test.name}: webinar tab selection aligns aria, visual state, and panel`
    );
    await pressButton(/^Delete local summary$/i);
    check(
      (await marker.getAttribute("data-calendar-summary")) === "none" &&
        /Local webinar calendar summary deleted\./i.test(await body()),
      `${test.name}: local calendar summary has an explicit delete reversal`
    );
    return true;
  }
  if (test.name === "94-public-share-preview") {
    const dialogText = await page.getByRole("dialog").innerText();
    check(
      /Public link · Stress reset workshop/i.test(dialogText) &&
        /https:\/\/balencia\.example\/webinars\/stress-reset-workshop/i.test(
          dialogText
        ) &&
        !/live-reset-sleep/i.test(dialogText),
      `${test.name}: selected recording owns its exact public link`,
      dialogText
    );
    await pressButton(/^Done$/i);
    check(
      /Public-link preview closed\. Nothing was shared\./i.test(await body()),
      `${test.name}: public-link preview closes without share capability`
    );
    return true;
  }
  if (test.name === "95-report-sheet") {
    const dialog = page.getByRole("dialog");
    const dialogText = await dialog.innerText();
    check(
      /Morning runners Community safety/i.test(dialogText) &&
        /Actions below target Morning runners only/i.test(dialogText) &&
        /do not change a live Community/i.test(dialogText) &&
        !/Weekend walkers Community safety/i.test(dialogText),
      `${test.name}: moderation sheet is bound to the selected Morning runners Community`,
      dialogText
    );
    await pressButton(/^Report$/i);
    check(
      /Morning runners Community report queued locally for review\. No outcome is promised\./i.test(
        await body()
      ),
      `${test.name}: report status preserves the exact Community target and outcome boundary`
    );
    const morningHeading = page.getByText("Morning runners Community", {
      exact: true,
    });
    const morningCard = morningHeading.locator(
      "xpath=ancestor::*[.//button[normalize-space()='Safety']][1]"
    );
    await activate(morningCard.getByRole("button", { name: /^Safety$/i }));
    await settle(page);
    const repeatText = await page.getByRole("dialog").innerText();
    const queued = page.getByRole("button", { name: /^Report queued$/i });
    check(
      /Morning runners report already queued locally for review/i.test(
        repeatText
      ) &&
        (await queued.count()) === 1 &&
        (await queued.isDisabled()),
      `${test.name}: the same target reports once and keeps a target-aware queued state`,
      repeatText
    );
    return true;
  }
  if (test.name === "95-honest-null") {
    check(
      (await page.getByRole("button", { name: /^Safety$/i }).count()) === 0 &&
        /Membership unavailable/i.test(await body()) &&
        /No membership, invite, or route-overlap claim is shown/i.test(
          await body()
        ),
      `${test.name}: honest-null groups expose no inferred moderation target`
    );
    await pressButton(/^Groups data controls$/i);
    const dialogText = await page.getByRole("dialog").innerText();
    check(
      /No membership, invite, selected Community\/Squad, route, or health data is available/i.test(
        dialogText
      ) &&
        /session retention/i.test(dialogText) &&
        /no subject inferred/i.test(dialogText),
      `${test.name}: honest-null data summary names no subject or unavailable data`,
      dialogText
    );
    return true;
  }
  if (
    ["95-low-confidence-cached", "95-error-cached", "95-offline"].includes(
      test.name
    )
  ) {
    await pressButton(/^Groups data controls$/i);
    const dialogText = await page.getByRole("dialog").innerText();
    check(
      /Category social membership/i.test(dialogText) &&
        /cached bundled \/groups demo/i.test(dialogText) &&
        /selected Community\/Squad only/i.test(dialogText) &&
        /freshness and live confidence unavailable/i.test(dialogText) &&
        /session retention/i.test(dialogText) &&
        !/refreshed Apr 12 · confidence inline/i.test(dialogText),
      `${test.name}: degraded data summary avoids fresh or confirmed claims`,
      dialogText
    );
    return true;
  }
  if (test.name === "95-join-preview") {
    await pressButton(/^Join locally$/i);
    const text = await body();
    check(
      /2 Communities/i.test(text) &&
        /Weekend walkers Community/i.test(text) &&
        /joined locally/i.test(text),
      `${test.name}: joined Community and count reconcile`,
      text
    );
    const squads = page.getByRole("tab", { name: /^Squads$/i });
    const communities = page.getByRole("tab", { name: /^Communities$/i });
    check(
      (await communities.getAttribute("aria-selected")) === "true" &&
        (await squads.getAttribute("aria-selected")) === "false" &&
        (await communities.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )) &&
        !(await squads.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )),
      `${test.name}: Communities tab starts with matching selected semantics and visuals`
    );
    await activate(squads);
    await settle(page);
    check(
      (await squads.getAttribute("aria-selected")) === "true" &&
        (await communities.getAttribute("aria-selected")) === "false" &&
        (await squads.evaluate((node) =>
          node.classList.contains("bg-brand-orange")
        )) &&
        (await page.getByRole("tabpanel", { name: /^Squads$/i }).count()) === 1,
      `${test.name}: Squads selection synchronizes aria, visual state, and panel`
    );
    await activate(communities);
    await settle(page);
    const weekendHeading = page.getByText("Weekend walkers Community", {
      exact: true,
    });
    const weekendCard = weekendHeading.locator(
      "xpath=ancestor::*[.//button[normalize-space()='Safety']][1]"
    );
    const weekendSafety = weekendCard.getByRole("button", {
      name: /^Safety$/i,
    });
    check(
      (await weekendSafety.count()) === 1,
      `${test.name}: joined Weekend walkers card owns one safety action`
    );
    await activate(weekendSafety);
    await settle(page);
    const weekendDialog = await page.getByRole("dialog").innerText();
    check(
      /Weekend walkers Community safety/i.test(weekendDialog) &&
        /Actions below target Weekend walkers only/i.test(weekendDialog) &&
        !/Morning runners Community safety/i.test(weekendDialog),
      `${test.name}: joined Community moderation follows the selected Weekend walkers target`,
      weekendDialog
    );
    await pressButton(/^Report$/i);
    check(
      /Weekend walkers Community report queued locally for review\. No outcome is promised\./i.test(
        await body()
      ),
      `${test.name}: report status remains target-aware after joining`
    );
    const morningHeading = page.getByText("Morning runners Community", {
      exact: true,
    });
    const morningCard = morningHeading.locator(
      "xpath=ancestor::*[.//button[normalize-space()='Safety']][1]"
    );
    await activate(morningCard.getByRole("button", { name: /^Safety$/i }));
    await settle(page);
    const morningDialog = await page.getByRole("dialog").innerText();
    check(
      /Morning runners Community safety/i.test(morningDialog) &&
        !/report already queued locally/i.test(morningDialog),
      `${test.name}: Weekend report does not leak into Morning runners moderation status`,
      morningDialog
    );
    return true;
  }
  if (test.name === "95-invite-pending") {
    await pressButton(/^Decline$/i);
    const text = await body();
    check(
      /No Squad membership/i.test(text) && /invitation was declined/i.test(text),
      `${test.name}: declined invite leaves no membership`,
      text
    );
    check(
      (await page.getByText(/^Pending invite$/i).count()) === 0 &&
        (await page.getByText(/^Member$/i).count()) === 0,
      `${test.name}: declined invite has no pending/member chip`
    );
    return true;
  }
  if (test.name === "95-leave-confirm") {
    await pressButton(/^Leave locally$/i);
    const text = await body();
    check(
      /0 Communities/i.test(text) &&
        /No Community memberships/i.test(text) &&
        (await page.getByText("Morning runners Community", { exact: true }).count()) ===
          0,
      `${test.name}: leaving removes Community and count`,
      text
    );
    return true;
  }
  if (test.name === "95-discovery-disabled") {
    const reviews = page.getByRole("button", {
      name: /^Review discovery settings$/i,
    });
    check(
      (await reviews.count()) === 2 &&
        (await reviews.evaluateAll((nodes) =>
          nodes.every((node) => !node.hasAttribute("disabled"))
        )),
      `${test.name}: both discovery review affordances remain enabled`
    );
    const dialogEvidence = [];
    for (let index = 0; index < 2; index++) {
      await activate(reviews.nth(index));
      await settle(page);
      const dialogText = await page.getByRole("dialog").last().innerText();
      dialogEvidence.push(dialogText);
      check(
        /Community matching is off/i.test(dialogText) &&
          /Turn matching off/i.test(dialogText) &&
          /Use topic only/i.test(dialogText),
        `${test.name}: discovery review affordance ${index + 1} has no bypass`,
        dialogText
      );
      await activate(page.getByRole("button", { name: /^Close dialog$/i }));
      await settle(page);
    }
    check(
      dialogEvidence.length === 2,
      `${test.name}: both discovery review paths were exercised`,
      dialogEvidence
    );
    return true;
  }
  return false;
}
async function deterministic(a, b) {
  if (sha(a) === sha(b))
    return { equivalent: true, differentBytes: 0, maxDelta: 0 };
  const [x, y] = await Promise.all([
    sharp(a).raw().toBuffer(),
    sharp(b).raw().toBuffer(),
  ]);
  if (x.length !== y.length)
    return { equivalent: false, differentBytes: Infinity, maxDelta: Infinity };
  let diff = 0,
    max = 0;
  const channels = x.length / (390 * 844);
  const samples = [];
  for (let i = 0; i < x.length; i++) {
    const d = Math.abs(x[i] - y[i]);
    if (d) {
      diff++;
      if (samples.length < 12) {
        const pixel = Math.floor(i / channels);
        samples.push({
          x: pixel % 390,
          y: Math.floor(pixel / 390),
          channel: i % channels,
          first: x[i],
          second: y[i],
          delta: d,
        });
      }
    }
    if (d > max) max = d;
  }
  return {
    equivalent: false,
    differentBytes: diff,
    differentRatio: diff / x.length,
    maxDelta: max,
    samples,
  };
}

async function run() {
  fs.rmSync(candidateDir, { recursive: true, force: true });
  fs.mkdirSync(candidateDir, { recursive: true });
  const buildFile = path.join(root, ".next/BUILD_ID");
  check(fs.existsSync(buildFile), "current BUILD_ID exists");
  const buildId = fs.readFileSync(buildFile, "utf8").trim();
  check(Boolean(buildId), "BUILD_ID non-empty");
  const newest = Math.max(
    ...productionInputFiles.map(
      (file) => fs.statSync(path.resolve(root, file)).mtimeMs
    )
  );
  check(
    fs.statSync(buildFile).mtimeMs + 1 >= newest,
    "production build newer than all production inputs"
  );
  const served = await (await fetch(new URL("/screens/39", baseURL))).text();
  const buildMarker = `\\"b\\":\\"${buildId}\\"`;
  check(
    served.includes(buildMarker),
    "served HTML binds exact BUILD_ID payload marker",
    buildMarker
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
      productionInputs: fingerprint(productionInputFiles),
      accepted: acceptedFingerprint(),
    },
  };
  const restartEveryContexts = 24;
  const launchBrowser = () =>
    chromium.launch({
      args: [
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--force-color-profile=srgb",
      ],
    });
  result.browserIsolation = {
    engine: "playwright-bundled-chromium",
    restartEveryContexts,
    launchArgs: [
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--force-color-profile=srgb",
    ],
    sharpCache: false,
    sharpConcurrency: 1,
  };
  let browser = await launchBrowser();
  let nonce = 0;
  const requestedDebugCases = (process.env.H1_DEBUG_CASE ?? "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
  const executionCases = requestedDebugCases.length
    ? [...cases, ...textCases].filter(({ name }) =>
        requestedDebugCases.includes(name)
      )
    : [...cases, ...textCases];
  if (
    requestedDebugCases.length &&
    (new Set(requestedDebugCases).size !== requestedDebugCases.length ||
      executionCases.length !== requestedDebugCases.length)
  )
    throw new Error(
      `Unknown or duplicate H1_DEBUG_CASE: ${requestedDebugCases.join(",")}`
    );
  if (requestedDebugCases.length) result.debugCases = requestedDebugCases;
  try {
    for (const test of executionCases) {
      if (nonce > 0 && nonce % restartEveryContexts === 0) {
        await browser.close();
        browser = await launchBrowser();
      }
      nonce++;
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
        serviceWorkers: "block",
      });
      const capabilitySink = [];
      await context.exposeBinding(
        "__h1RecordCapability",
        (_source, type, detail) => {
          capabilitySink.push({ type: String(type), detail: String(detail) });
        }
      );
      await addGuards(context);
      context.on("request", (request) => {
        const requested = new URL(request.url());
        if (requested.origin !== origin.origin)
          result.externalRequests.push({
            case: test.name,
            method: request.method(),
            url: request.url(),
          });
        else if (!["GET", "HEAD"].includes(request.method().toUpperCase()))
          capabilitySink.push({
            type: "same-origin-mutation-request",
            detail: `${request.method().toUpperCase()} ${request.url()}`,
          });
      });
      const page = await context.newPage();
      page.on("console", (m) => {
        if (m.type() === "error")
          result.consoleErrors.push({ case: test.name, text: m.text() });
      });
      page.on("pageerror", (e) =>
        result.pageErrors.push({ case: test.name, text: String(e) })
      );
      page.on("download", (download) =>
        capabilitySink.push({
          type: "download",
          detail: download.suggestedFilename(),
        })
      );
      page.on("filechooser", () =>
        capabilitySink.push({ type: "file-chooser", detail: "opened" })
      );
      page.on("worker", (worker) =>
        capabilitySink.push({ type: "worker", detail: worker.url() })
      );
      page.on("popup", (popup) =>
        capabilitySink.push({ type: "popup", detail: popup.url() })
      );
      const url = new URL(`/screens/${test.id}`, baseURL);
      url.searchParams.set("state", test.state);
      url.searchParams.set("__h1audit", String(nonce));
      await page.goto(url.toString(), { waitUntil: "networkidle" });
      await settle(page);
      await semanticChecks(page, test);
      if (test.textScale) {
        const proof = await textScale(page, test.textScale);
        check(
          validTextScaleProof(proof),
          `${test.name}: actual 125% proof`,
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
      if (!test.textScale) await stateChecks(page, test);
      if (!test.textScale && modalScaleCases.has(test.name)) {
        const proof = await textScale(page, 1.25);
        check(
          validTextScaleProof(proof),
          `${test.name}: representative modal actual 125% proof`,
          proof
        );
        result.modalTextScaleCases.push(test.name);
        await page.goto(url.toString(), { waitUntil: "networkidle" });
        await settle(page);
        await semanticChecks(page, test);
        await stateChecks(page, test);
      }
      if (!test.textScale) {
        const transitioned = await transitionChecks(page, test);
        if (transitioned) {
          result.transitionCases.push(test.name);
          await page.goto(url.toString(), { waitUntil: "networkidle" });
          await settle(page);
          await semanticChecks(page, test);
          await stateChecks(page, test);
        }
      }
      const storage = await page.evaluate(async () => ({
        local: Object.keys(localStorage),
        session: Object.keys(sessionStorage),
        databases: indexedDB.databases
          ? (await indexedDB.databases()).map((d) => d.name)
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
        `${test.name}: isolated storage/cookies`,
        { storage, cookies: cookies.length }
      );
      if (!test.textScale) {
        await page.waitForTimeout(800);
        const phone = page.locator('[data-testid="phone-frame"]');
        const targetMetrics = await phone.evaluate((node) => {
          node.scrollTop = 0;
          for (const descendant of node.querySelectorAll("*")) {
            if (descendant instanceof HTMLElement) descendant.scrollTop = 0;
          }
          for (const prior of node.querySelectorAll("[data-h1-capture-target]"))
            prior.removeAttribute("data-h1-capture-target");
          const content = node.querySelector('[data-testid="screen-content"]');
          const visibleDialogs = [...node.querySelectorAll('[role="dialog"]')].filter(
            (dialog) => {
              const rect = dialog.getBoundingClientRect();
              const style = getComputedStyle(dialog);
              return (
                rect.width > 0 &&
                rect.height > 0 &&
                style.display !== "none" &&
                style.visibility !== "hidden" &&
                dialog.getAttribute("aria-hidden") !== "true"
              );
            }
          );
          const captureRoot = visibleDialogs.at(-1) ?? content;
          if (!(captureRoot instanceof HTMLElement))
            throw new Error("Missing H1 capture root");
          if (visibleDialogs.length) captureRoot.focus({ preventScroll: true });
          const candidates = [
            captureRoot,
            ...captureRoot.querySelectorAll("*"),
          ].filter((candidate) => {
            if (!(candidate instanceof HTMLElement)) return false;
            const overflowY = getComputedStyle(candidate).overflowY;
            return (
              candidate.clientHeight > 0 &&
              candidate.scrollHeight > candidate.clientHeight + 1 &&
              /auto|scroll/.test(overflowY)
            );
          });
          const target =
            candidates.sort(
              (a, b) =>
                b.scrollHeight - b.clientHeight -
                (a.scrollHeight - a.clientHeight)
            )[0] ?? captureRoot;
          target.setAttribute("data-h1-capture-target", "true");
          return {
            root: visibleDialogs.length ? "dialog" : "content",
            tag: target.tagName,
            clientHeight: target.clientHeight,
            scrollHeight: target.scrollHeight,
            maximum: Math.max(0, target.scrollHeight - target.clientHeight),
          };
        });
        const captureTarget = phone.locator(
          '[data-h1-capture-target="true"]'
        );
        check(
          (await captureTarget.count()) === 1 && targetMetrics.clientHeight > 0,
          `${test.name}: one measurable capture target`,
          targetMetrics
        );
        const renderState = () =>
          phone.evaluate((node) => {
            const target = node.querySelector('[data-h1-capture-target="true"]');
            const active = document.activeElement;
            const clone = node.cloneNode(true);
            for (const styled of clone.querySelectorAll('[style=""]'))
              styled.removeAttribute("style");
            return JSON.stringify({
              html: clone.innerHTML,
              phoneScrollTop: node.scrollTop,
              captureScrollTop: target?.scrollTop ?? null,
              active:
                active instanceof HTMLElement
                  ? {
                      tag: active.tagName,
                      id: active.id,
                      className: active.className,
                      ariaLabel: active.getAttribute("aria-label"),
                      text: active.textContent?.trim(),
                    }
                  : null,
            });
          });
        const captureStable = async () => {
          const firstState = await renderState();
          const first = await phone.screenshot();
          await page.waitForTimeout(800);
          const secondState = await renderState();
          const second = await phone.screenshot();
          const pixels = await deterministic(first, second);
          const stateDifference =
            firstState === secondState
              ? null
              : (() => {
                  let index = 0;
                  while (
                    index < firstState.length &&
                    index < secondState.length &&
                    firstState[index] === secondState[index]
                  )
                    index++;
                  return {
                    index,
                    first: firstState.slice(Math.max(0, index - 120), index + 240),
                    second: secondState.slice(
                      Math.max(0, index - 120),
                      index + 240
                    ),
                  };
                })();
          const unstableElements = pixels.equivalent
            ? []
            : await phone.evaluate((node, samples) => {
                const frame = node.getBoundingClientRect();
                return samples.map(({ x, y }) => {
                  const element = document.elementFromPoint(
                    frame.left + x,
                    frame.top + y
                  );
                  return element instanceof HTMLElement
                    ? {
                        x,
                        y,
                        tag: element.tagName,
                        text: element.textContent?.trim().slice(0, 160),
                        className: element.className,
                      }
                    : { x, y, tag: null };
                });
              }, pixels.samples ?? []);
          return {
            image: second,
            stable: {
              ...pixels,
              equivalent: pixels.equivalent && firstState === secondState,
              retried: false,
              renderStateStable: firstState === secondState,
              stateDifference,
              unstableElements,
            },
          };
        };
        const positions = [0];
        for (
          let position = targetMetrics.clientHeight;
          position < targetMetrics.maximum;
          position += targetMetrics.clientHeight
        )
          positions.push(position);
        if (positions.at(-1) !== targetMetrics.maximum)
          positions.push(targetMetrics.maximum);
        const intervals = positions.map((position) => [
          position,
          Math.min(
            targetMetrics.scrollHeight,
            position + targetMetrics.clientHeight
          ),
        ]);
        let coveredThrough = 0;
        let gap = false;
        for (const [start, end] of intervals) {
          if (start > coveredThrough + 1) gap = true;
          coveredThrough = Math.max(coveredThrough, end);
        }
        check(
          !gap && coveredThrough >= targetMetrics.scrollHeight - 1,
          `${test.name}: capture tiles cover the complete scroll target`,
          { targetMetrics, positions, intervals, coveredThrough }
        );
        const tiles = [];
        for (const position of positions) {
          await captureTarget.evaluate((node, next) => {
            node.scrollTop = next;
          }, position);
          await page.evaluate(
            () =>
              new Promise((resolve) =>
                requestAnimationFrame(() => requestAnimationFrame(resolve))
              )
          );
          const actual = await captureTarget.evaluate((node) => node.scrollTop);
          check(
            Math.abs(actual - position) <= 1,
            `${test.name}: capture tile reaches ${position}`,
            { requested: position, actual, targetMetrics }
          );
          const tile = await captureStable();
          check(
            tile.stable.equivalent && !tile.stable.retried,
            `${test.name}: exact deterministic tile at ${position}`,
            tile.stable
          );
          tiles.push(tile);
        }
        const compose = async (images) =>
          sharp({
            create: {
              width: 390,
              height: 844 * images.length,
              channels: 4,
              background: "#0A0A0F",
            },
          })
            .composite(
              images.map(({ image }, index) => ({
                input: image,
                top: 844 * index,
                left: 0,
              }))
            )
            .png()
            .toBuffer();
        const finalImage = await compose(tiles);
        fs.writeFileSync(
          path.join(candidateDir, `${test.name}.png`),
          finalImage
        );
        result.screenshots.push({
          name: `${test.name}.png`,
          sha256: sha(finalImage),
          tiles: positions.length,
          positions,
          target: targetMetrics,
          deterministic: tiles.map(({ stable }, index) => ({
            position: positions[index],
            ...stable,
          })),
        });
      }
      result.capabilityEvents.push(
        ...capabilitySink.map((event) => ({ case: test.name, ...event }))
      );
      result.cases.push({
        ...test,
        nonce: String(nonce),
        storage,
        cookies: cookies.length,
      });
      await context.close();
      process.stdout.write(
        `[${nonce}/${executionCases.length}] ${test.name} ok\n`
      );
    }
  } finally {
    await browser.close();
  }
  result.integrity.end = {
    product: fingerprint(productFiles),
    api: fingerprint(apiFiles),
    productionInputs: fingerprint(productionInputFiles),
    accepted: acceptedFingerprint(),
  };
  check(
    JSON.stringify(result.integrity.start) ===
      JSON.stringify(result.integrity.end),
    "product/API/production-input/90-sentinel fingerprints stable"
  );
  check(
    result.cases.length === 192 && result.screenshots.length === 182,
    "exact 192 contexts and 182 PNGs",
    { contexts: result.cases.length, screenshots: result.screenshots.length }
  );
  check(
    JSON.stringify([...result.transitionCases].sort()) ===
      JSON.stringify([...expectedTransitionCases].sort()),
    `exact ${expectedTransitionCases.length} transition cases exercised`,
    result.transitionCases
  );
  check(
    JSON.stringify([...result.modalTextScaleCases].sort()) ===
      JSON.stringify([...modalScaleCases].sort()),
    `exact ${modalScaleCases.size} representative modal 125% proofs exercised`,
    result.modalTextScaleCases
  );
  check(
    new Set(result.focusRestorations.map(({ screen }) => screen)).size === 10,
    "dynamic modal focus restoration proven for all 10 H1 screens",
    result.focusRestorations
  );
  for (const id of Object.keys(states)) {
    const rows = result.screenshots.filter((x) => x.name.startsWith(`${id}-`));
    const duplicate = rows.filter(
      (x, i) => rows.findIndex((y) => y.sha256 === x.sha256) !== i
    );
    check(!duplicate.length, `${id}: state PNG hashes unique`, duplicate);
  }
  check(
    new Set(result.screenshots.map(({ sha256 }) => sha256)).size === 182,
    "all 182 canonical PNG hashes globally unique"
  );
  check(
    !result.consoleErrors.length &&
      !result.pageErrors.length &&
      !result.capabilityEvents.length &&
      !result.externalRequests.length,
    "zero console/page/capability/external events",
    {
      console: result.consoleErrors,
      page: result.pageErrors,
      capability: result.capabilityEvents,
      external: result.externalRequests,
    }
  );
  const rollbackDir = `${shotsDir}.rollback-${process.pid}`;
  let priorMoved = false;
  try {
    if (fs.existsSync(shotsDir)) {
      fs.renameSync(shotsDir, rollbackDir);
      priorMoved = true;
    }
    fs.renameSync(candidateDir, shotsDir);
  } catch (error) {
    if (priorMoved && !fs.existsSync(shotsDir))
      fs.renameSync(rollbackDir, shotsDir);
    throw error;
  }
  if (priorMoved) fs.rmSync(rollbackDir, { recursive: true, force: true });
  result.screenshotPromotion =
    "rollback-safe-directory-swap-after-all-assertions";
  result.status = "pass";
}
try {
  await run();
} catch (error) {
  result.error = String(error);
  fs.rmSync(candidateDir, { recursive: true, force: true });
  process.exitCode = 1;
} finally {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(result, null, 2)}\n`);
}
