// verify-c1-today.mjs — hardened C1 Today/missions acceptance verifier
//
// Dedicated hardened verifier for VISUAL-007-C1-today-missions (screens
// 12,13,14,15,41,44,45,59,61,73,97). Inherits the verify-b1-cia.mjs pattern
// completely: fresh isolated browser context + unique nonce per case, cookie/
// origin-storage/IndexedDB/CacheStorage clearing, exact 390x844 phone frame at
// deterministic DPR, reduced-motion default, fonts/images awaited via
// networkidle + two rAF, pass-atomic screenshot staging with exact-name
// validation, start/end fingerprint equality, zero console/page errors, zero
// forbidden capability events, 125% text sentinels, focus traps, >=44px
// targets, >=16px editable fields, AA contrast.
//
// INTEGRATION NOTES (Fable): this file assumes it lives at
// balencia-screens/scripts/verify-c1-today.mjs — projectRoot is computed as
// dirname(this file)/'..'. Running it from the evidence/ draft location will
// resolve fingerprints against the wrong root; move it before running.
//
// Contract source: plans/batches/VISUAL-007-C1-today-missions/VERIFICATION-MATRIX.md
// (frozen 2026-07-11, with the recorded S12 sentinel adjudication). The run
// promotes exactly 89 canonical screenshots and adds 11 screenshot-free 125%
// text contexts plus the post-review interaction and evidence assertions.

import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const USAGE = 'Usage: node scripts/verify-c1-today.mjs <baseURL> <out-json> <shots-dir>'
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(USAGE)
  process.exit(0)
}

const [baseURLArg, outPathArg, shotsDirArg] = process.argv.slice(2)
if (!baseURLArg || !outPathArg || !shotsDirArg) {
  console.error(USAGE)
  process.exit(2)
}

const baseURL = baseURLArg
const outPath = path.resolve(outPathArg)
const shotsDir = path.resolve(shotsDirArg)
const baseOrigin = new URL(baseURL).origin
const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// S12 is the pilot sentinel: verification-only, byte-identical to the
// pre-batch record (VERIFICATION-MATRIX.md hard assertion 10). Digest recorded
// from the pre-implementation tree on 2026-07-11.
const S12_FILE = 'src/components/hifi/screens/today/S12HomeScreen.tsx'
const S12_SENTINEL_SHA256 = '107b59b58bca73a05045dfd90a68cdf4219176f72aa7e6dcf48b59165f75df67'

const PRODUCT_FILES = [
  'src/components/hifi/screens/today/S12HomeScreen.tsx',
  'src/components/hifi/screens/today/S13MissionBoard.tsx',
  'src/components/hifi/screens/today/S14MissionDetail.tsx',
  'src/components/hifi/screens/today/S15CreateEditMission.tsx',
  'src/components/hifi/screens/today/S41ScheduleCalendar.tsx',
  'src/components/hifi/screens/today/S44WaterIntake.tsx',
  'src/components/hifi/screens/today/S45DailyCheckin.tsx',
  'src/components/hifi/screens/today/S59StreakDetails.tsx',
  'src/components/hifi/screens/today/S61RemindersTasks.tsx',
  'src/components/hifi/screens/today/S73MissionJournal.tsx',
  'src/components/hifi/screens/today/S97PlansLibrary.tsx',
  'src/components/hifi/screens/today/index.ts',
]

// B1 API surface reused, plus the C1-load-bearing kit modules (core/index/
// paywall — PaywallLock canonicity is a hard assertion) and this verifier as
// its own self-reference.
const API_FILES = [
  'package.json',
  'package-lock.json',
  'next.config.ts',
  'postcss.config.mjs',
  'src/app/layout.tsx',
  'src/app/globals.css',
  'src/components/hifi/HifiPrototype.tsx',
  'src/components/hifi/kit/HifiShell.tsx',
  'src/components/hifi/kit/back-control.tsx',
  'src/components/hifi/kit/buttons.tsx',
  'src/components/hifi/kit/chips.tsx',
  'src/components/hifi/kit/chrome.tsx',
  'src/components/hifi/kit/cia-composer.tsx',
  'src/components/hifi/kit/cia-orb.tsx',
  'src/components/hifi/kit/cia.tsx',
  'src/components/hifi/kit/core.ts',
  'src/components/hifi/kit/data.tsx',
  'src/components/hifi/kit/glass-pill-input.tsx',
  'src/components/hifi/kit/index.ts',
  'src/components/hifi/kit/paywall.tsx',
  'src/components/hifi/kit/prototype-action-sheet.tsx',
  'src/components/hifi/kit/signature-icons.tsx',
  'src/components/hifi/kit/surfaces.tsx',
  'src/components/hifi/kit/system.tsx',
  'src/components/hifi/screens/registry.ts',
  'src/components/layout/PhoneFrame.tsx',
  'src/components/layout/ScreenShell.tsx',
  'src/data/hifi/persona.ts',
  'src/data/screens.ts',
  'src/app/screens/[id]/page.tsx',
  'scripts/verify-c1-today.mjs',
]

const AUTHORITY_FILES = [
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/audit/C1-today-missions.md',
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/DECISIONS.md',
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/REFERENCE-DIRECTION.md',
  '../Balencia-New-Screens/canon/COMPACT-CANON.md',
  '../Balencia-New-Screens/canon/COMPONENT-CATALOG.md',
  '../Balencia-New-Screens/hifi-screens/12-home-screen.md',
  '../Balencia-New-Screens/hifi-screens/13-goals-list.md',
  '../Balencia-New-Screens/hifi-screens/14-goal-detail.md',
  '../Balencia-New-Screens/hifi-screens/15-create-edit-goal.md',
  '../Balencia-New-Screens/hifi-screens/41-schedule-calendar.md',
  '../Balencia-New-Screens/hifi-screens/44-water-intake.md',
  '../Balencia-New-Screens/hifi-screens/45-daily-checkin.md',
  '../Balencia-New-Screens/hifi-screens/59-streak-details.md',
  '../Balencia-New-Screens/hifi-screens/61-reminders-tasks.md',
  '../Balencia-New-Screens/hifi-screens/73-mission-journal.md',
  '../Balencia-New-Screens/hifi-screens/97-plans-library.md',
  '../RPG_SYSTEM_DESIGN.md',
  '../plans/batches/VISUAL-007-C1-today-missions/BATCH.md',
  '../plans/batches/VISUAL-007-C1-today-missions/VERIFICATION-MATRIX.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/builder-common.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/builder-a.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/builder-b.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/builder-c.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/builder-d.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/review-code-correctness.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/review-design-source.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/review-accessibility-trust.md',
  '../plans/batches/VISUAL-007-C1-today-missions/evidence/review-code.md',
  '../plans/batches/VISUAL-007-C1-today-missions/evidence/review-design-source.md',
  '../plans/batches/VISUAL-007-C1-today-missions/evidence/review-accessibility-trust.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/repair-a-mission-flow.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/repair-b-schedule-water-checkin.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/repair-c-type-tabs-plans.md',
  '../plans/batches/VISUAL-007-C1-today-missions/evidence/repair-a-mission-flow.md',
  '../plans/batches/VISUAL-007-C1-today-missions/evidence/repair-b-schedule-water-checkin.md',
  '../plans/batches/VISUAL-007-C1-today-missions/evidence/repair-c-type-tabs-plans.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/review-repair-a.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/review-repair-b.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/review-repair-c.md',
  '../plans/batches/VISUAL-007-C1-today-missions/workers/review-hardened-verifier.md',
]

const parsedBaseURL = new URL(baseURL)
assert(parsedBaseURL.protocol === 'http:' && ['localhost', '127.0.0.1', '::1'].includes(parsedBaseURL.hostname) && parsedBaseURL.port === '3002', `C1 verification is production-only on local :3002; received ${baseURL}`)
const NEXT_BUILD_ID_FILE = path.join(projectRoot, '.next/BUILD_ID')
assert(fs.existsSync(NEXT_BUILD_ID_FILE), 'Fresh production proof missing: .next/BUILD_ID does not exist')
const LOCAL_BUILD_ID = fs.readFileSync(NEXT_BUILD_ID_FILE, 'utf8').trim()
assert(LOCAL_BUILD_ID.length > 0, 'Fresh production proof missing: .next/BUILD_ID is empty')
const BUILD_BOUND_FILES = [...new Set([...PRODUCT_FILES, ...API_FILES.filter(file => file !== 'scripts/verify-c1-today.mjs')])]

// Frozen state contracts (VERIFICATION-MATRIX.md). Screen 12 is the sentinel:
// default only, no fixture query, no new root attribute — handled separately.
const SCREEN_CONTRACTS = {
  '13': { root: 'data-mission-board-state', states: ['default', 'skeleton', 'empty', 'filtered-empty', 'error', 'offline', 'success'] },
  '14': { root: 'data-mission-detail-state', states: ['default', 'empty', 'low-confidence', 'offline', 'stalled', 'success'] },
  '15': { root: 'data-mission-editor-state', states: ['default', 'empty', 'processing', 'error', 'offline', 'success', 'invalid'] },
  '41': { root: 'data-schedule-state', states: ['default', 'overpacked', 'cold-start', 'stale-offline', 'revoked', 'skeleton'] },
  '44': { root: 'data-water-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'success'] },
  '45': { root: 'data-checkin-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'success', 'invalid'] },
  '59': { root: 'data-streak-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'success'] },
  '61': { root: 'data-reminders-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'success'] },
  '73': { root: 'data-journal-state', states: ['default', 'skeleton', 'empty', 'filtered-empty', 'error', 'offline'] },
  '97': { root: 'data-plans-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'success'] },
}

// Exact 89-name manifest (matrix "Exact screenshot manifest": 88 canonical +
// 15-enlarged-bottom 125% sentinel).
const EXPECTED_SCREENSHOTS = [
  '12-default.png', '12-action-toggled.png',
  '13-default.png', '13-skeleton.png', '13-empty.png', '13-filtered-empty.png', '13-error.png', '13-offline.png', '13-success.png', '13-filter-weekly.png', '13-new-mission.png',
  '14-default.png', '14-empty.png', '14-low-confidence.png', '14-offline.png', '14-stalled.png', '14-success.png', '14-accordion-open.png',
  '15-default.png', '15-empty.png', '15-processing.png', '15-error.png', '15-offline.png', '15-success.png', '15-invalid.png', '15-domain-removed.png', '15-reorder-moved.png', '15-enlarged-bottom.png',
  '41-default.png', '41-overpacked.png', '41-cold-start.png', '41-stale-offline.png', '41-revoked.png', '41-skeleton.png', '41-day-selected.png', '41-enlarged-default.png',
  '44-default.png', '44-skeleton.png', '44-empty.png', '44-error.png', '44-offline.png', '44-success.png', '44-delete-confirm.png', '44-delete-undone.png', '44-quick-add.png',
  '45-default.png', '45-skeleton.png', '45-empty.png', '45-error.png', '45-offline.png', '45-success.png', '45-invalid.png', '45-context-added.png', '45-dismissed.png',
  '59-default.png', '59-skeleton.png', '59-empty.png', '59-error.png', '59-offline.png', '59-freeze-confirm.png', '59-freeze-used.png', '59-freeze-undone.png', '59-success.png',
  '61-default.png', '61-skeleton.png', '61-empty.png', '61-error.png', '61-offline.png', '61-success.png', '61-task-toggled.png', '61-task-undone.png', '61-reminder-toggled.png',
  '73-default.png', '73-skeleton.png', '73-empty.png', '73-filtered-empty.png', '73-error.png', '73-offline.png', '73-media-hidden.png', '73-photo-delete-confirm.png',
  '97-default.png', '97-skeleton.png', '97-empty.png', '97-error.png', '97-offline.png', '97-success.png', '97-plan-actions.png', '97-archive-confirm.png', '97-enlarged-default.png',
]

const EXPECTED_SET = new Set(EXPECTED_SCREENSHOTS)
const EXPECTED_COUNT = 89
const TEXT_SCALE_IDS = ['12', '13', '14', '15', '41', '44', '45', '59', '61', '73', '97']
const EXPECTED_CONTEXTS = 100 // 89 canonical screenshots + 11 assertion-only 125% text cases

// These named states/actions must visibly differ from their default capture.
// Undo end states may legitimately return to the default pixels; they are not
// listed here. This closes the below-fold/top-reset evidence gap found by the
// independent design review without changing the frozen 89-name manifest.
const DISTINCT_FROM_DEFAULT = [
  ['12-action-toggled.png', '12-default.png'],
  ['13-empty.png', '13-default.png'],
  ['13-filtered-empty.png', '13-default.png'],
  ['13-filtered-empty.png', '13-empty.png'],
  ['13-filter-weekly.png', '13-default.png'],
  ['13-filter-weekly.png', '13-filtered-empty.png'],
  ['14-empty.png', '14-default.png'],
  ['14-accordion-open.png', '14-default.png'],
  ['15-empty.png', '15-default.png'],
  ['15-domain-removed.png', '15-default.png'],
  ['15-reorder-moved.png', '15-default.png'],
  ['41-overpacked.png', '41-default.png'],
  ['41-cold-start.png', '41-default.png'],
  ['41-revoked.png', '41-default.png'],
  ['44-empty.png', '44-default.png'],
  ['44-delete-confirm.png', '44-default.png'],
  ['44-quick-add.png', '44-default.png'],
  ['45-empty.png', '45-default.png'],
  ['45-error.png', '45-default.png'],
  ['45-dismissed.png', '45-default.png'],
  ['61-empty.png', '61-default.png'],
  ['61-reminder-toggled.png', '61-default.png'],
  ['73-empty.png', '73-default.png'],
  ['73-filtered-empty.png', '73-default.png'],
  ['73-filtered-empty.png', '73-empty.png'],
  ['73-media-hidden.png', '73-default.png'],
  ['97-empty.png', '97-default.png'],
]

// Root substates allowed alongside the primary state attribute.
const ALLOWED_SUBSTATES = {
  '59': { 'data-freeze-flow': ['idle', 'confirming', 'used', 'undone'] },
}

const REGISTRY_DOMAINS = ['Fitness', 'Sleep', 'Career', 'Nutrition', 'Finance', 'Faith', 'Productivity', 'Relationships', 'Wellbeing', 'Meditation']
// Ten-domain truth (matrix hard assertion 2) applies to these screens' main content.
const DOMAIN_TRUTH_IDS = new Set(['13', '14', '41', '61'])

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

assert(EXPECTED_SCREENSHOTS.length === EXPECTED_COUNT, `Verifier contract declares ${EXPECTED_SCREENSHOTS.length} screenshots; expected ${EXPECTED_COUNT}`)
assert(EXPECTED_SET.size === EXPECTED_COUNT, `Verifier screenshot names are not unique (${EXPECTED_SET.size}/${EXPECTED_COUNT})`)
for (const [id, contract] of Object.entries(SCREEN_CONTRACTS)) {
  assert(new Set(contract.states).size === contract.states.length, `${id}: duplicate exact fixture state`)
  for (const state of contract.states) assert(EXPECTED_SET.has(`${id}-${state}.png`), `${id}: exact fixture ${state} has no canonical screenshot`)
}
assert(EXPECTED_SET.has('12-default.png') && EXPECTED_SET.has('12-action-toggled.png'), '12: sentinel screenshots missing from the canonical set')

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

function fingerprint(files) {
  const hash = createHash('sha256')
  const entries = []
  for (const relativePath of [...files].sort()) {
    const absolutePath = path.resolve(projectRoot, relativePath)
    assert(fs.existsSync(absolutePath), `Fingerprint source missing: ${relativePath}`)
    const bytes = fs.readFileSync(absolutePath)
    const fileHash = sha256(bytes)
    entries.push({ path: relativePath, sha256: fileHash })
    hash.update(relativePath)
    hash.update('\0')
    hash.update(bytes)
    hash.update('\0')
  }
  return { digest: hash.digest('hex'), files: entries }
}

function fingerprintAll() {
  return {
    product: fingerprint(PRODUCT_FILES),
    api: fingerprint(API_FILES),
    authority: fingerprint(AUTHORITY_FILES),
  }
}

function sameFingerprint(start, end) {
  return start.product.digest === end.product.digest
    && start.api.digest === end.api.digest
    && start.authority.digest === end.authority.digest
}

async function assertFreshProductionBuild() {
  const buildStat = fs.statSync(NEXT_BUILD_ID_FILE)
  const newestSource = BUILD_BOUND_FILES
    .map(relativePath => ({ path: relativePath, mtimeMs: fs.statSync(path.resolve(projectRoot, relativePath)).mtimeMs }))
    .sort((a, b) => b.mtimeMs - a.mtimeMs)[0]
  assert(buildStat.mtimeMs + 1 >= newestSource.mtimeMs, `Fresh production proof failed: ${newestSource.path} is newer than .next/BUILD_ID`)
  const proofURL = new URL('/screens/12', baseURL)
  proofURL.searchParams.set('__c1build', LOCAL_BUILD_ID)
  const response = await fetch(proofURL, { redirect: 'error', cache: 'no-store' })
  assert(response.ok, `Fresh production proof failed: ${proofURL} returned ${response.status}`)
  const html = await response.text()
  assert(html.includes(LOCAL_BUILD_ID), `Served HTML does not advertise local .next build ${LOCAL_BUILD_ID}; :3002 is stale`)
  return {
    origin: parsedBaseURL.origin,
    port: parsedBaseURL.port,
    mode: 'next start production',
    buildId: LOCAL_BUILD_ID,
    buildIdMtime: new Date(buildStat.mtimeMs).toISOString(),
    newestBoundSource: newestSource.path,
    newestBoundSourceMtime: new Date(newestSource.mtimeMs).toISOString(),
    servedHTMLSha256: sha256(Buffer.from(html)),
  }
}

function pngGeometry(filePath) {
  const bytes = fs.readFileSync(filePath)
  assert(bytes.length >= 24 && bytes.subarray(1, 4).toString('ascii') === 'PNG', `${path.basename(filePath)}: invalid PNG`)
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), bytes: bytes.length, sha256: sha256(bytes) }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.mkdirSync(shotsDir, { recursive: true })
const unexpectedExisting = fs.readdirSync(shotsDir).filter(file => file.endsWith('.png') && !EXPECTED_SET.has(file)).sort()
const tempShotsDir = fs.mkdtempSync(path.join(path.dirname(shotsDir), `.${path.basename(shotsDir)}.c1-${process.pid}-`))

const fingerprintsStart = fingerprintAll()
const s12Fingerprint = fingerprintsStart.product.files.find(file => file.path === S12_FILE)
assert(s12Fingerprint?.sha256 === S12_SENTINEL_SHA256, `S12 sentinel digest is ${s12Fingerprint?.sha256 ?? 'missing'}, expected pre-batch ${S12_SENTINEL_SHA256} (matrix hard assertion 10)`)
let fingerprintsEnd = fingerprintsStart
let browser
let promotionBackupDir = null
let productionBuildEvidence = null
let navigationNonce = 0
const visitedNonces = new Set()
const captured = new Set()
const checks = []
const consoleErrors = []
const pageErrors = []
const capabilityEvents = []
const caseEvidence = []
let screenshotEvidence = []

function pass(name, evidence = {}) {
  checks.push({ name, status: 'pass', evidence })
}

function recordCapability(caseName, type, detail = '') {
  capabilityEvents.push({ case: caseName, type: String(type), detail: String(detail).slice(0, 500) })
}

async function installCapabilityGuards(context, caseName) {
  await context.exposeBinding('__c1RecordCapability', (_source, type, detail) => {
    recordCapability(caseName, type, detail)
  })

  await context.addInitScript(({ origin }) => {
    const record = (type, detail = '') => {
      try { void window.__c1RecordCapability(type, String(detail)) } catch { /* Node guards remain active. */ }
    }
    const target = value => {
      try { return new URL(String(value), window.location.href) } catch { return null }
    }
    const allowedFrameworkSocket = value => {
      const parsed = target(value)
      return parsed?.origin === origin && parsed.pathname.startsWith('/_next/')
    }

    try {
      if (navigator.mediaDevices) {
        Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
          configurable: true,
          value: constraints => {
            record('media.getUserMedia', JSON.stringify(constraints ?? {}))
            return Promise.resolve({ getTracks: () => [] })
          },
        })
      }
    } catch { /* Request/event guards still fail the case. */ }

    class GuardedMediaRecorder {
      static isTypeSupported() { return false }
      constructor(stream, options) {
        record('MediaRecorder', JSON.stringify(options ?? {}))
        this.state = 'inactive'
        this.stream = stream
      }
      start() { record('MediaRecorder.start'); this.state = 'recording' }
      stop() { record('MediaRecorder.stop'); this.state = 'inactive'; this.onstop?.(new Event('stop')) }
      pause() { record('MediaRecorder.pause'); this.state = 'paused' }
      resume() { record('MediaRecorder.resume'); this.state = 'recording' }
      addEventListener() {}
      removeEventListener() {}
    }
    try { Object.defineProperty(window, 'MediaRecorder', { configurable: true, value: GuardedMediaRecorder }) } catch {}

    class GuardedSpeechRecognition {
      constructor() { record('SpeechRecognition') }
      start() { record('SpeechRecognition.start') }
      stop() { record('SpeechRecognition.stop') }
      abort() { record('SpeechRecognition.abort') }
      addEventListener() {}
      removeEventListener() {}
    }
    try { Object.defineProperty(window, 'SpeechRecognition', { configurable: true, value: GuardedSpeechRecognition }) } catch {}
    try { Object.defineProperty(window, 'webkitSpeechRecognition', { configurable: true, value: GuardedSpeechRecognition }) } catch {}

    class GuardedPeerConnection {
      constructor(configuration) { record('RTCPeerConnection', JSON.stringify(configuration ?? {})) }
      close() {}
      addEventListener() {}
      removeEventListener() {}
    }
    try { Object.defineProperty(window, 'RTCPeerConnection', { configurable: true, value: GuardedPeerConnection }) } catch {}

    try {
      Object.defineProperty(HTMLMediaElement.prototype, 'play', {
        configurable: true,
        value() { record('HTMLMediaElement.play', this.currentSrc || this.src || 'inline'); return Promise.resolve() },
      })
    } catch {}

    try {
      Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: data => { record('navigator.share', JSON.stringify(data ?? {})); return Promise.resolve() },
      })
    } catch {}
    try {
      Object.defineProperty(navigator, 'sendBeacon', {
        configurable: true,
        value: (url, data) => { record('navigator.sendBeacon', `${url}:${data ? 'payload' : 'empty'}`); return false },
      })
    } catch {}

    try {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText(value) { record('clipboard.writeText', String(value)); return Promise.resolve() },
          readText() { record('clipboard.readText'); return Promise.resolve('') },
          write() { record('clipboard.write'); return Promise.resolve() },
          read() { record('clipboard.read'); return Promise.resolve([]) },
        },
      })
    } catch {}

    try {
      Object.defineProperty(URL, 'createObjectURL', {
        configurable: true,
        value: value => {
          record('URL.createObjectURL', Object.prototype.toString.call(value))
          return 'blob:c1-blocked'
        },
      })
    } catch {}

    try {
      const NativeWebSocket = window.WebSocket
      class GuardedWebSocket extends NativeWebSocket {
        constructor(url, protocols) {
          if (!allowedFrameworkSocket(url)) record('WebSocket', url)
          if (protocols === undefined) super(url)
          else super(url, protocols)
        }
      }
      Object.defineProperty(window, 'WebSocket', { configurable: true, value: GuardedWebSocket })
    } catch {}
    try {
      const NativeEventSource = window.EventSource
      class GuardedEventSource extends NativeEventSource {
        constructor(url, options) { record('EventSource', url); super(url, options) }
      }
      Object.defineProperty(window, 'EventSource', { configurable: true, value: GuardedEventSource })
    } catch {}

    try {
      window.open = (...args) => { record('window.open', args[0] ?? ''); return null }
    } catch {}

    for (const method of ['setItem', 'removeItem', 'clear']) {
      try {
        const original = Storage.prototype[method]
        Storage.prototype[method] = function guardedStorage(...args) {
          let area = 'storage'
          try { area = this === localStorage ? 'localStorage' : this === sessionStorage ? 'sessionStorage' : area } catch {}
          record(`storage.${method}`, `${area}:${args[0] ?? ''}`)
          return original.apply(this, args)
        }
      } catch {}
    }
    try {
      const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')
        ?? Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie')
      if (descriptor?.get && descriptor?.set && descriptor.configurable) {
        Object.defineProperty(Document.prototype, 'cookie', {
          configurable: true,
          enumerable: descriptor.enumerable,
          get() { return descriptor.get.call(this) },
          set(value) { record('cookie.write', value); return descriptor.set.call(this, value) },
        })
      }
    } catch {}
    try {
      const originalOpen = indexedDB.open.bind(indexedDB)
      indexedDB.open = (...args) => { record('indexedDB.open', args[0] ?? ''); return originalOpen(...args) }
      const originalDelete = indexedDB.deleteDatabase.bind(indexedDB)
      indexedDB.deleteDatabase = (...args) => { record('indexedDB.deleteDatabase', args[0] ?? ''); return originalDelete(...args) }
    } catch {}
    try {
      const originalOpen = caches.open.bind(caches)
      caches.open = (...args) => { record('caches.open', args[0] ?? ''); return originalOpen(...args) }
      const originalDelete = caches.delete.bind(caches)
      caches.delete = (...args) => { record('caches.delete', args[0] ?? ''); return originalDelete(...args) }
    } catch {}

    document.addEventListener('click', event => {
      const element = event.target instanceof Element ? event.target : null
      const anchor = element?.closest('a[href]')
      if (anchor) {
        const destination = target(anchor.href)
        const forbiddenProtocol = destination && !['http:', 'https:'].includes(destination.protocol)
        const external = destination && destination.origin !== origin
        if (forbiddenProtocol || external) {
          record('external-navigation-attempt', destination?.href ?? anchor.href)
          event.preventDefault()
          event.stopImmediatePropagation()
        }
        if (anchor.hasAttribute('download')) {
          record('download-attempt', anchor.getAttribute('download') ?? '')
          event.preventDefault()
          event.stopImmediatePropagation()
        }
      }
    }, true)
  }, { origin: baseOrigin })
}

async function twoAnimationFrames(page) {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
}

async function applyTextScale(page, scale, label) {
  const evidence = await page.locator('[data-testid="phone-frame"]').evaluate((phone, requestedScale) => {
    const elements = [phone, ...phone.querySelectorAll('*')]
    const candidates = elements.flatMap(element => {
      if (element.closest('[aria-hidden="true"], [inert]') || element.getAttribute('aria-hidden') === 'true') return []
      if (element.closest('.sr-only')) return []
      const style = getComputedStyle(element)
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return []
      const directText = [...element.childNodes]
        .filter(child => child.nodeType === Node.TEXT_NODE)
        .map(child => child.textContent?.trim() ?? '')
        .join(' ')
        .trim()
      const editable = ['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)
      const terseSemanticText = directText.length > 0 && directText.length <= 2 && /[\p{L}\p{N}]/u.test(directText)
      if (!editable && directText.length === 0) return []
      if (!editable && directText.length <= 2 && !terseSemanticText) return []
      const base = Number.parseFloat(style.fontSize)
      return Number.isFinite(base) && base > 0 ? [{ element, base, sample: directText || element.getAttribute('aria-label') || element.tagName }] : []
    })
    for (const candidate of candidates) {
      candidate.element.dataset.c1BaseFontSize = String(candidate.base)
      candidate.element.style.setProperty('font-size', `${candidate.base * requestedScale}px`, 'important')
    }
    const measured = candidates.map(candidate => {
      const current = Number.parseFloat(getComputedStyle(candidate.element).fontSize)
      return { base: candidate.base, current, ratio: current / candidate.base, sample: candidate.sample.slice(0, 60) }
    })
    return {
      count: measured.length,
      minimumRatio: measured.length ? Math.min(...measured.map(item => item.ratio)) : 0,
      samples: measured.slice(0, 8),
    }
  }, scale)
  assert(evidence.count >= 10, `${label}: only ${evidence.count} text nodes accepted the text-only scale override`)
  assert(evidence.minimumRatio >= scale - 0.01, `${label}: minimum rendered text scale is ${evidence.minimumRatio.toFixed(3)}; expected ${scale.toFixed(2)}`)
  return evidence
}

async function assertTextScaleApplied(page, scale, label) {
  const evidence = await page.locator('[data-testid="phone-frame"]').evaluate((phone, expectedScale) => {
    const nodes = [...phone.querySelectorAll('[data-c1-base-font-size]')]
    const ratios = nodes.map(node => Number.parseFloat(getComputedStyle(node).fontSize) / Number.parseFloat(node.dataset.c1BaseFontSize || '0'))
    const textFragments = node => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(node.tagName)) {
        const rect = node.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0 ? [rect] : []
      }
      return [...node.childNodes].flatMap(child => {
        if (child.nodeType !== Node.TEXT_NODE || !(child.textContent ?? '').trim()) return []
        const range = document.createRange()
        range.selectNodeContents(child)
        return [...range.getClientRects()].filter(rect => rect.width > 0 && rect.height > 0)
      })
    }
    const paintedTextFragments = node => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(node.tagName)) return textFragments(node)
      const style = getComputedStyle(node)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return textFragments(node)
      context.font = style.font
      return [...node.childNodes].flatMap(child => {
        const sourceValue = child.nodeType === Node.TEXT_NODE ? (child.textContent ?? '').trim() : ''
        if (!sourceValue) return []
        const value = (() => {
          if (style.textTransform === 'uppercase') return sourceValue.toLocaleUpperCase()
          if (style.textTransform === 'lowercase') return sourceValue.toLocaleLowerCase()
          if (style.textTransform === 'capitalize') {
            if (typeof Intl.Segmenter === 'function') {
              const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' })
              return [...segmenter.segment(sourceValue)].map(segment => {
                if (!segment.isWordLike) return segment.segment
                return segment.segment.replace(/\p{L}/u, letter => letter.toLocaleUpperCase())
              }).join('')
            }
            return sourceValue.replace(/(^|[^\p{L}\p{N}])(\p{L})/gu, (_match, prefix, letter) => `${prefix}${letter.toLocaleUpperCase()}`)
          }
          return sourceValue
        })()
        const metrics = context.measureText(value)
        const fontAscent = metrics.fontBoundingBoxAscent
        const fontDescent = metrics.fontBoundingBoxDescent
        const actualAscent = metrics.actualBoundingBoxAscent
        const actualDescent = metrics.actualBoundingBoxDescent
        const fontHeight = fontAscent + fontDescent
        const usableMetrics = [fontAscent, fontDescent, actualAscent, actualDescent, fontHeight]
          .every(metric => Number.isFinite(metric)) && fontHeight > 0
        const range = document.createRange()
        range.selectNodeContents(child)
        return [...range.getClientRects()]
          .filter(rect => rect.width > 0 && rect.height > 0)
          .map(rect => {
            if (!usableMetrics) return rect
            // Range rectangles use the font's ascent/descent box rather than
            // the pixels a glyph paints. Adjacent authored line boxes can
            // therefore appear to overlap even when their visible glyphs do
            // not. Normalize the browser range to its measured baseline and
            // compare actual ink bounds for the collision assertion.
            const baseline = rect.top + (rect.height * fontAscent / fontHeight)
            const top = baseline - (rect.height * actualAscent / fontHeight)
            const bottom = baseline + (rect.height * actualDescent / fontHeight)
            return {
              left: rect.left,
              right: rect.right,
              top,
              bottom,
              width: rect.width,
              height: Math.max(0, bottom - top),
            }
          })
      })
    }
    const intersect = (rect, bounds) => {
      const left = Math.max(rect.left, bounds.left)
      const top = Math.max(rect.top, bounds.top)
      const right = Math.min(rect.right, bounds.right)
      const bottom = Math.min(rect.bottom, bounds.bottom)
      return right > left && bottom > top ? { left, top, right, bottom, width: right - left, height: bottom - top } : null
    }
    const visibleFragments = (node, fragments) => fragments.flatMap(fragment => {
      let visible = fragment
      for (let ancestor = node.parentElement; ancestor; ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor)
        const clips = ancestor === phone || ['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowX) || ['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowY)
        if (clips) {
          visible = intersect(visible, ancestor.getBoundingClientRect())
          if (!visible) return []
        }
        if (ancestor === phone) break
      }
      return [visible]
    })
    const records = nodes
      .filter(node => !node.closest('.sr-only'))
      .map(node => {
        const fragments = textFragments(node)
        const painted = paintedTextFragments(node)
        return { node, fragments, visible: visibleFragments(node, painted) }
      })
      .filter(record => record.fragments.length > 0)
    const clipped = nodes.flatMap(node => {
      const style = getComputedStyle(node)
      if (['auto', 'scroll'].includes(style.overflowX) || ['auto', 'scroll'].includes(style.overflowY)) return []
      if (/(?:^|\s)(?:truncate|line-clamp-\d+)(?:\s|$)/.test(String(node.className))) return []
      if (node.clientWidth <= 0 || node.clientHeight <= 0) return []
      const horizontal = node.scrollWidth > node.clientWidth + 1
      const vertical = node.scrollHeight > node.clientHeight + 1
      const horizontallyClipped = horizontal && ['hidden', 'clip'].includes(style.overflowX)
      const verticallyClipped = vertical && ['hidden', 'clip'].includes(style.overflowY)
      return horizontallyClipped || verticallyClipped ? [{
        tag: node.tagName.toLowerCase(),
        text: (node.textContent ?? node.getAttribute('aria-label') ?? '').replace(/\s+/g, ' ').trim().slice(0, 80),
        client: `${node.clientWidth}x${node.clientHeight}`,
        scroll: `${node.scrollWidth}x${node.scrollHeight}`,
      }] : []
    })
    const ancestorClips = records.flatMap(({ node, fragments }) => {
      let carried = fragments.map(rect => ({ left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom }))
      for (let ancestor = node.parentElement; ancestor && ancestor !== phone.parentElement; ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor)
        const bounds = ancestor.getBoundingClientRect()
        const scrollableX = ['auto', 'scroll'].includes(style.overflowX) && ancestor.scrollWidth > ancestor.clientWidth + 1
        const scrollableY = ['auto', 'scroll'].includes(style.overflowY) && ancestor.scrollHeight > ancestor.clientHeight + 1
        // A scroller makes content reachable only inside its own viewport.
        // Carry that viewport forward so higher hidden/clip ancestors are
        // still checked instead of being waived by an inner scroll axis.
        if (scrollableX) carried = carried.map(rect => ({ ...rect, left: bounds.left, right: bounds.right }))
        if (scrollableY) carried = carried.map(rect => ({ ...rect, top: bounds.top, bottom: bounds.bottom }))
        const clipsX = ['hidden', 'clip'].includes(style.overflowX)
        const clipsY = ['hidden', 'clip'].includes(style.overflowY)
        if (!clipsX && !clipsY) continue
        const escaped = carried.some(rect => (clipsX && (rect.left < bounds.left - 1 || rect.right > bounds.right + 1)) || (clipsY && (rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1)))
        if (escaped) return [{
          tag: node.tagName.toLowerCase(),
          ancestor: `${ancestor.tagName.toLowerCase()}.${String(ancestor.className).split(/\s+/).slice(0, 3).join('.')}`,
          text: (node.textContent ?? node.getAttribute('aria-label') ?? '').replace(/\s+/g, ' ').trim().slice(0, 80),
        }]
      }
      return []
    })
    const overlaps = []
    for (let leftIndex = 0; leftIndex < records.length && overlaps.length < 12; leftIndex += 1) {
      const left = records[leftIndex]
      for (let rightIndex = leftIndex + 1; rightIndex < records.length && overlaps.length < 12; rightIndex += 1) {
        const right = records[rightIndex]
        if (left.node.contains(right.node) || right.node.contains(left.node)) continue
        let collided = false
        for (const a of left.visible) {
          for (const b of right.visible) {
            const width = Math.min(a.right, b.right) - Math.max(a.left, b.left)
            const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
            if (width <= 2 || height <= 2) continue
            const overlapArea = width * height
            const smallerArea = Math.min(a.width * a.height, b.width * b.height)
            if (smallerArea > 0 && overlapArea / smallerArea >= 0.12) collided = true
          }
        }
        if (collided) overlaps.push({
          left: (left.node.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 50),
          right: (right.node.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 50),
        })
      }
    }
    return {
      count: ratios.length,
      minimumRatio: ratios.length ? Math.min(...ratios) : 0,
      maximumRatio: ratios.length ? Math.max(...ratios) : 0,
      expectedScale,
      clipped: clipped.slice(0, 12),
      ancestorClips: ancestorClips.slice(0, 12),
      overlaps,
    }
  }, scale)
  assert(evidence.count >= 10, `${label}: text-scale evidence disappeared before audit`)
  assert(evidence.minimumRatio >= scale - 0.01, `${label}: representative text did not remain enlarged (${evidence.minimumRatio.toFixed(3)}x)`)
  assert(evidence.clipped.length === 0, `${label}: enlarged semantic text clips its authored box: ${evidence.clipped.map(item => `${item.tag}:${item.client}->${item.scroll}:${item.text}`).join(' | ')}`)
  assert(evidence.ancestorClips.length === 0, `${label}: enlarged semantic text escapes a clipping ancestor: ${evidence.ancestorClips.map(item => `${item.tag}->${item.ancestor}:${item.text}`).join(' | ')}`)
  assert(evidence.overlaps.length === 0, `${label}: enlarged semantic text overlaps another text fragment: ${evidence.overlaps.map(item => `${item.left} <> ${item.right}`).join(' | ')}`)
  return evidence
}

async function beginCase({ name, id, state = null, rootAttribute = null, rootState = state, reducedMotion = 'reduce', textScale = 1 }) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion,
  })
  await installCapabilityGuards(context, name)
  const page = await context.newPage()
  const cdp = await context.newCDPSession(page)

  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push({ case: name, text: message.text() })
  })
  page.on('pageerror', error => pageErrors.push({ case: name, text: String(error) }))
  page.on('popup', popup => { recordCapability(name, 'popup', popup.url()); void popup.close() })
  page.on('download', download => recordCapability(name, 'download', download.suggestedFilename()))
  page.on('framenavigated', frame => {
    if (frame !== page.mainFrame() || frame.url() === 'about:blank') return
    try {
      if (new URL(frame.url()).origin !== baseOrigin) recordCapability(name, 'external-navigation', frame.url())
    } catch { recordCapability(name, 'non-http-navigation', frame.url()) }
  })
  page.on('websocket', socket => {
    try {
      const parsed = new URL(socket.url())
      const isFramework = parsed.origin.replace(/^ws/, 'http') === baseOrigin && parsed.pathname.startsWith('/_next/')
      if (!isFramework) recordCapability(name, 'websocket', socket.url())
    } catch { recordCapability(name, 'websocket', socket.url()) }
  })

  await context.route('**/*', async route => {
    const request = route.request()
    const url = request.url()
    let forbidden = false
    try {
      const parsed = new URL(url)
      const external = ['http:', 'https:'].includes(parsed.protocol) && parsed.origin !== baseOrigin
      const api = parsed.origin === baseOrigin && parsed.pathname.startsWith('/api/')
      const mutation = parsed.origin === baseOrigin && !['GET', 'HEAD', 'OPTIONS'].includes(request.method())
      if (external) { recordCapability(name, 'external-request', `${request.method()} ${url}`); forbidden = true }
      if (api) { recordCapability(name, 'api-request', `${request.method()} ${url}`); forbidden = true }
      if (mutation) { recordCapability(name, 'non-get-request', `${request.method()} ${url}`); forbidden = true }
    } catch { /* data/blob/browser requests are separately guarded. */ }
    if (forbidden) await route.abort('blockedbyclient')
    else await route.continue()
  })

  await page.goto('about:blank')
  await context.clearCookies()
  await cdp.send('Storage.clearDataForOrigin', { origin: baseOrigin, storageTypes: 'all' })
  assert((await context.cookies()).length === 0, `${name}: context did not start cookie-empty`)

  const target = new URL(`/screens/${id}`, baseURL)
  if (state !== null) target.searchParams.set('state', state)
  const nonce = String(++navigationNonce)
  assert(!visitedNonces.has(nonce), `${name}: navigation nonce reused`)
  visitedNonces.add(nonce)
  target.searchParams.set('__c1audit', nonce)
  assert(target.origin === baseOrigin, `${name}: case target is not same-origin`)
  await page.goto(target.toString(), { waitUntil: 'networkidle' })
  const finalURL = new URL(page.url())
  assert(finalURL.origin === baseOrigin, `${name}: case left configured origin`)
  assert(finalURL.pathname === `/screens/${id}`, `${name}: unexpected fixture path ${finalURL.pathname}`)
  assert(finalURL.searchParams.get('__c1audit') === nonce, `${name}: audit nonce was not retained`)
  if (state !== null) assert(finalURL.searchParams.get('state') === state, `${name}: exact state query was not retained`)
  assert(finalURL.hash === '', `${name}: unexpected hash transport`)

  if (rootAttribute) {
    await page.waitForFunction(
      ({ attribute, expected }) => {
        const nodes = document.querySelectorAll(`[${attribute}]`)
        return nodes.length === 1 && nodes[0].getAttribute(attribute) === expected
      },
      { attribute: rootAttribute, expected: rootState },
    )
  } else {
    await page.waitForFunction(() => document.querySelectorAll('[data-testid="phone-frame"]').length === 1)
  }
  if (textScale !== 1) await applyTextScale(page, textScale, name)
  await twoAnimationFrames(page)
  return { name, id, state, rootAttribute, rootState, reducedMotion, textScale, context, page, cdp, nonce }
}

async function storageSnapshot(page) {
  return page.evaluate(async () => {
    const read = storage => Array.from({ length: storage.length }, (_, index) => {
      const key = storage.key(index) ?? ''
      return [key, storage.getItem(key) ?? '']
    }).sort(([a], [b]) => a.localeCompare(b))
    const databases = typeof indexedDB.databases === 'function'
      ? (await indexedDB.databases()).map(item => item.name ?? '').filter(Boolean).sort()
      : []
    const cacheNames = typeof caches !== 'undefined' ? (await caches.keys()).sort() : []
    return { local: read(localStorage), session: read(sessionStorage), databases, cacheNames }
  })
}

async function finishCase(handle) {
  const { name, page, context } = handle
  const storage = await storageSnapshot(page)
  const cookies = await context.cookies()
  assert(storage.local.length === 0, `${name}: localStorage changed: ${JSON.stringify(storage.local)}`)
  assert(storage.session.length === 0, `${name}: sessionStorage changed: ${JSON.stringify(storage.session)}`)
  assert(storage.databases.length === 0, `${name}: IndexedDB changed: ${storage.databases.join(', ')}`)
  assert(storage.cacheNames.length === 0, `${name}: Cache Storage changed: ${storage.cacheNames.join(', ')}`)
  assert(cookies.length === 0, `${name}: cookies changed: ${cookies.map(cookie => cookie.name).join(', ')}`)
  const caseConsole = consoleErrors.filter(item => item.case === name)
  const casePage = pageErrors.filter(item => item.case === name)
  assert(caseConsole.length === 0, `${name}: console error(s): ${caseConsole.map(item => item.text).join(' | ')}`)
  assert(casePage.length === 0, `${name}: page error(s): ${casePage.map(item => item.text).join(' | ')}`)
  caseEvidence.push({ name, id: handle.id, state: handle.state, nonce: handle.nonce, reducedMotion: handle.reducedMotion, textScale: handle.textScale, storage, cookies: 0 })
}

async function runCase(config, body) {
  let handle
  try {
    handle = await beginCase(config)
    await body(handle)
    await finishCase(handle)
    pass(`case ${config.name}`, { id: config.id, fixture: config.state, nonce: handle.nonce })
  } finally {
    if (handle) await handle.context.close()
  }
}

async function resetScrollRecursively(page) {
  const residue = await page.locator('[data-testid="phone-frame"]').evaluate(phone => {
    window.scrollTo(0, 0)
    const nodes = [phone, ...phone.querySelectorAll('*')]
    for (const node of nodes) {
      if ('scrollTop' in node) node.scrollTop = 0
      if ('scrollLeft' in node) node.scrollLeft = 0
    }
    return nodes.flatMap((node, index) => {
      if (!('scrollTop' in node) || !('scrollLeft' in node)) return []
      return Math.abs(node.scrollTop) > 0.5 || Math.abs(node.scrollLeft) > 0.5
        ? [{ index, tag: node.tagName, top: node.scrollTop, left: node.scrollLeft }]
        : []
    })
  })
  assert(residue.length === 0, `scroll reset failed: ${JSON.stringify(residue)}`)
  await twoAnimationFrames(page)
}

async function targetSize(locator, label, minimum = 44) {
  const geometry = await locator.evaluate(node => {
    const candidates = [node]
    if ('labels' in node && node.labels) candidates.push(...node.labels)
    const boxes = candidates.map(candidate => candidate.getBoundingClientRect())
    return boxes.reduce((best, box) => box.width * box.height > best.width * best.height ? box : best, boxes[0])
  })
  assert(geometry.width >= minimum && geometry.height >= minimum, `${label}: target ${geometry.width.toFixed(1)}×${geometry.height.toFixed(1)} is below ${minimum}×${minimum}`)
  return geometry
}

async function authoredFocus(page, locator, label) {
  await locator.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  })
  const before = await locator.evaluate(node => {
    const values = []
    for (let current = node, depth = 0; current && depth < 5; current = current.parentElement, depth += 1) {
      const style = getComputedStyle(current)
      values.push({
        outline: `${style.outlineStyle}|${style.outlineWidth}|${style.outlineColor}`,
        boxShadow: style.boxShadow,
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
      })
    }
    return values
  })
  // The preceding control audit includes pointer hover/press contrast probes.
  // Re-enter keyboard modality before programmatic targeting so Chromium's
  // :focus-visible heuristic is deterministic without trusting class tokens.
  await page.keyboard.press('Tab')
  await locator.focus()
  await twoAnimationFrames(page)
  const redirectedToDialog = await locator.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-modal="true"]')
    return Boolean(dialog && dialog.contains(document.activeElement))
  })
  if (redirectedToDialog) return { redirectedToDialog: true }
  const focusState = await locator.evaluate(node => ({
    focused: document.activeElement === node,
    visible: node.matches(':focus-visible'),
    authoredClass: [node, node.parentElement].some(candidate => candidate && /(?:^|\s)(?:focus-ring|hifi-action)(?:\s|$)|focus-within:/.test(candidate.className || '')),
  }))
  assert(focusState.focused, `${label}: control cannot receive focus`)
  assert(focusState.visible, `${label}: focused control does not match :focus-visible`)
  const changed = await locator.evaluate((node, previous) => {
    for (let current = node, depth = 0; current && depth < 5; current = current.parentElement, depth += 1) {
      const style = getComputedStyle(current)
      const now = {
        outline: `${style.outlineStyle}|${style.outlineWidth}|${style.outlineColor}`,
        boxShadow: style.boxShadow,
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
      }
      const prior = previous[depth]
      if (!prior) continue
      if (now.outline !== prior.outline && style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) > 0) return true
      if (now.boxShadow !== prior.boxShadow && now.boxShadow !== 'none') return true
      if (now.borderColor !== prior.borderColor || now.backgroundColor !== prior.backgroundColor) return true
    }
    return false
  }, before)
  assert(changed, `${label}: focused control has no measurable outline, shadow, border, or background change${focusState.authoredClass ? ' despite its focus class' : ''}`)
  return { redirectedToDialog: false }
}

async function accessibleControlName(locator) {
  return locator.evaluate(node => {
    const labelledBy = node.getAttribute('aria-labelledby')
    const labelledText = labelledBy
      ? labelledBy.split(/\s+/).map(id => document.getElementById(id)?.textContent?.trim() ?? '').filter(Boolean).join(' ')
      : ''
    const nativeLabel = 'labels' in node && node.labels?.length
      ? [...node.labels].map(label => label.textContent?.trim() ?? '').filter(Boolean).join(' ')
      : ''
    return (node.getAttribute('aria-label') || labelledText || nativeLabel || node.textContent || node.getAttribute('placeholder') || node.getAttribute('title') || '')
      .replace(/\s+/g, ' ')
      .trim()
  })
}

async function effectiveContrast(locator, pseudo = null) {
  return locator.evaluate((node, pseudoElement) => {
    const parse = value => {
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) throw new Error('Unable to create a color-resolution canvas')
      context.clearRect(0, 0, 1, 1)
      context.fillStyle = value
      context.fillRect(0, 0, 1, 1)
      const [r, g, b, alpha] = context.getImageData(0, 0, 1, 1).data
      return { r, g, b, a: alpha / 255 }
    }
    const composite = (front, back) => {
      const alpha = front.a + back.a * (1 - front.a)
      return {
        r: (front.r * front.a + back.r * back.a * (1 - front.a)) / alpha,
        g: (front.g * front.a + back.g * back.a * (1 - front.a)) / alpha,
        b: (front.b * front.a + back.b * back.a * (1 - front.a)) / alpha,
        a: alpha,
      }
    }
    const imageColors = value => (value.match(/(?:rgba?\([^)]*\)|#[\da-f]{3,8})/gi) ?? []).map(parse)
    const layers = []
    let opacity = 1
    for (let current = node, depth = 0; current; current = current.parentElement, depth += 1) {
      const style = getComputedStyle(current)
      const localSurface = depth <= 1 || /(?:glass|card|pill|surface|button|hifi-action)/i.test(String(current.className))
      layers.push({ color: parse(style.backgroundColor), images: localSurface ? imageColors(style.backgroundImage) : [] })
      opacity *= Number.parseFloat(style.opacity || '1')
    }
    let backgrounds = [{ r: 10, g: 10, b: 15, a: 1 }]
    for (const layer of layers.reverse()) {
      const colored = backgrounds.map(background => composite(layer.color, background))
      backgrounds = layer.images.length > 0
        ? [...colored, ...colored.flatMap(background => layer.images.map(stop => composite(stop, background)))].slice(0, 32)
        : colored
    }
    const foregroundColor = parse(getComputedStyle(node, pseudoElement).color)
    foregroundColor.a *= opacity
    const luminance = color => {
      const channels = [color.r, color.g, color.b].map(value => {
        const normalized = value / 255
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    }
    return Math.min(...backgrounds.map(background => {
      const foreground = composite(foregroundColor, background)
      const lighter = Math.max(luminance(foreground), luminance(background))
      const darker = Math.min(luminance(foreground), luminance(background))
      return (lighter + 0.05) / (darker + 0.05)
    }))
  }, pseudo)
}

async function assertStaticTextContrast(page, label) {
  const violations = await page.locator('[data-testid="phone-frame"]').evaluate(phone => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) throw new Error('Unable to create a color-resolution canvas')
    const parse = value => {
      context.clearRect(0, 0, 1, 1)
      context.fillStyle = '#000'
      context.fillStyle = value
      context.fillRect(0, 0, 1, 1)
      const [r, g, b, alpha] = context.getImageData(0, 0, 1, 1).data
      return { r, g, b, a: alpha / 255 }
    }
    const composite = (front, back) => {
      const alpha = front.a + back.a * (1 - front.a)
      if (alpha <= 0) return back
      return {
        r: (front.r * front.a + back.r * back.a * (1 - front.a)) / alpha,
        g: (front.g * front.a + back.g * back.a * (1 - front.a)) / alpha,
        b: (front.b * front.a + back.b * back.a * (1 - front.a)) / alpha,
        a: alpha,
      }
    }
    const luminance = color => {
      const channels = [color.r, color.g, color.b].map(value => {
        const normalized = value / 255
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    }
    const imageColors = value => (value.match(/(?:rgba?\([^)]*\)|#[\da-f]{3,8})/gi) ?? []).map(parse)
    const ratioFor = (element, pseudoElement = null) => {
      const layers = []
      let opacity = 1
      for (let current = element, depth = 0; current; current = current.parentElement, depth += 1) {
        const style = getComputedStyle(current)
        const localSurface = depth <= 1 || /(?:glass|card|pill|surface|button|hifi-action)/i.test(String(current.className))
        layers.push({ color: parse(style.backgroundColor), images: localSurface ? imageColors(style.backgroundImage) : [] })
        opacity *= Number.parseFloat(style.opacity || '1')
      }
      let backgrounds = [{ r: 10, g: 10, b: 15, a: 1 }]
      for (const layer of layers.reverse()) {
        const colored = backgrounds.map(background => composite(layer.color, background))
        backgrounds = layer.images.length > 0
          ? [...colored, ...colored.flatMap(background => layer.images.map(stop => composite(stop, background)))].slice(0, 32)
          : colored
      }
      const foregroundColor = parse(getComputedStyle(element, pseudoElement).color)
      foregroundColor.a *= opacity
      return Math.min(...backgrounds.map(background => {
        const foreground = composite(foregroundColor, background)
        const lighter = Math.max(luminance(foreground), luminance(background))
        const darker = Math.min(luminance(foreground), luminance(background))
        return (lighter + 0.05) / (darker + 0.05)
      }))
    }

    return [phone, ...phone.querySelectorAll('*')].flatMap(element => {
      if (element.closest('[aria-hidden="true"], [inert], .skeleton-block') || element.getAttribute('aria-hidden') === 'true') return []
      if (element.closest(':disabled, [aria-disabled="true"]')) return []
      if (/(?:^|\s)sr-only(?:\s|$)/.test(String(element.className))) return []
      const style = getComputedStyle(element)
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0 || !element.getClientRects().length) return []
      const directText = [...element.childNodes]
        .filter(child => child.nodeType === Node.TEXT_NODE)
        .map(child => child.textContent?.trim() ?? '')
        .join(' ')
        .trim()
      const editableText = element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement
        ? element.value || element.placeholder
        : element instanceof HTMLSelectElement
          ? element.selectedOptions[0]?.textContent?.trim() ?? ''
          : ''
      const semanticText = directText || editableText
      const terseSemanticText = semanticText.length > 0 && semanticText.length <= 2 && /[\p{L}\p{N}]/u.test(semanticText)
      if (semanticText.length === 0 || (semanticText.length <= 2 && !terseSemanticText)) return []
      const placeholder = (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) && !element.value && Boolean(element.placeholder)
      const ratio = ratioFor(element, placeholder ? '::placeholder' : null)
      return ratio < 4.5 ? [{ tag: element.tagName.toLowerCase(), ratio, text: semanticText.slice(0, 90), mode: placeholder ? 'placeholder' : 'text' }] : []
    })
  })
  assert(violations.length === 0, `${label}: static semantic text below 4.5:1: ${violations.slice(0, 12).map(item => `${item.tag}:${item.ratio.toFixed(2)}:${item.mode}:${item.text}`).join(' | ')}`)
  return violations
}

// Effective opacity of a node including every ancestor layer — used to prove
// the S44 delete affordance is visible without hover (matrix hard assertion 4).
async function effectiveOpacity(locator) {
  return locator.evaluate(node => {
    let opacity = 1
    for (let current = node; current; current = current.parentElement) {
      opacity *= Number.parseFloat(getComputedStyle(current).opacity || '1')
    }
    return opacity
  })
}

async function interactionContrast(page, locator, label) {
  const normal = await effectiveContrast(locator)
  await locator.hover()
  const hover = await effectiveContrast(locator)
  const box = await locator.boundingBox()
  assert(box, `${label}: action has no box for contrast states`)
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  const pressed = await effectiveContrast(locator)
  await page.mouse.move(1, 1)
  await page.mouse.up()
  assert(normal >= 4.5 && hover >= 4.5 && pressed >= 4.5, `${label}: normal/hover/pressed contrast ${normal.toFixed(2)}/${hover.toFixed(2)}/${pressed.toFixed(2)} is below 4.5`)
  return { normal, hover, pressed }
}

async function auditNativeControls(page, label, { disabledReasons = true } = {}) {
  const persistentModalCount = await page.locator('[role="dialog"][aria-modal="true"]:visible').count()
  const faux = await page.locator('[data-testid="phone-frame"] [role="button"], [data-testid="phone-frame"] [role="link"], [data-testid="phone-frame"] [role="tab"], [data-testid="phone-frame"] [role="checkbox"], [data-testid="phone-frame"] [role="switch"], [data-testid="phone-frame"] [role="slider"]').evaluateAll(nodes => nodes.flatMap(node => {
    if (node.closest('[aria-hidden="true"], [inert]')) return []
    const role = node.getAttribute('role')
    const native = role === 'link'
      ? node.tagName === 'A' && node.hasAttribute('href')
      : role === 'checkbox'
        ? node.tagName === 'INPUT' && node.getAttribute('type') === 'checkbox'
        : role === 'slider'
          ? node.tagName === 'INPUT' && node.getAttribute('type') === 'range'
        : node.tagName === 'BUTTON'
    return native ? [] : [`${node.tagName.toLowerCase()}[role=${role}]`]
  }))
  assert(faux.length === 0, `${label}: faux controls found: ${faux.join(', ')}`)

  const controls = page.locator('[data-testid="phone-frame"] button, [data-testid="phone-frame"] a[href], [data-testid="phone-frame"] input, [data-testid="phone-frame"] select, [data-testid="phone-frame"] textarea')
  const names = new Map()
  let audited = 0
  for (let index = 0; index < await controls.count(); index += 1) {
    const control = controls.nth(index)
    if (!(await control.isVisible())) continue
    if (await control.evaluate(node => Boolean(node.closest('[aria-hidden="true"], [inert]')))) continue
    if (persistentModalCount > 0 && await control.evaluate(node => {
      const modal = document.querySelector('[role="dialog"][aria-modal="true"]')
      return Boolean(modal && !modal.contains(node))
    })) continue
    const name = await accessibleControlName(control)
    assert(name.length > 0, `${label}: visible control ${index + 1} has no accessible name`)
    const key = name.toLocaleLowerCase()
    names.set(key, [...(names.get(key) ?? []), index])
    const disabled = await control.isDisabled()
    if (disabled) {
      const describedBy = await control.getAttribute('aria-describedby')
      if (disabledReasons) {
        const reasonInName = /unavailable|disabled|blocked|offline|\boff\b|not available|needs|until/i.test(name)
        const loadingBusy = await control.getAttribute('aria-busy') === 'true'
        assert(describedBy || reasonInName || loadingBusy, `${label}: disabled “${name}” has no accessible reason`)
        if (describedBy) {
          const reason = await page.evaluate(ids => ids.split(/\s+/).map(id => document.getElementById(id)?.textContent?.trim() ?? '').join(' ').trim(), describedBy)
          assert(reason.length > 0, `${label}: disabled “${name}” points to an empty reason`)
        }
      }
      continue
    }
    const keyboard = await control.evaluate(node => ({ tabIndex: node.tabIndex, role: node.getAttribute('role') }))
    const rovingTab = keyboard.role === 'tab' && keyboard.tabIndex === -1
    assert(keyboard.tabIndex >= 0 || rovingTab, `${label}: “${name}” is not keyboard reachable`)
    const fieldContract = await control.evaluate(node => {
      if (node.tagName === 'TEXTAREA' || node.tagName === 'SELECT') return true
      if (node.tagName !== 'INPUT') return false
      return !['checkbox', 'radio', 'range', 'color', 'file', 'hidden'].includes(node.type)
    })
    await targetSize(control, `${label} “${name}”`)
    if (fieldContract) {
      const fontSize = Number.parseFloat(await control.evaluate(node => getComputedStyle(node).fontSize))
      assert(fontSize >= 16, `${label}: “${name}” field is ${fontSize}px; expected at least 16px`)
    }
    const focusEvidence = await authoredFocus(page, control, `${label} “${name}”`)
    if (focusEvidence.redirectedToDialog && persistentModalCount === 0) {
      await page.keyboard.press('Escape')
      await page.locator('[role="dialog"][aria-modal="true"]').waitFor({ state: 'hidden' })
    }
    const hasVisibleText = await control.evaluate(node => {
      if (node.tagName === 'BUTTON' || node.tagName === 'A' || node.tagName === 'SELECT' || node.tagName === 'TEXTAREA') {
        return (node.innerText || node.value || node.placeholder || '').trim().length > 0
      }
      if (node.tagName !== 'INPUT') return false
      if (['checkbox', 'radio', 'range', 'color', 'file', 'hidden'].includes(node.type)) return false
      return (node.value || node.placeholder || '').trim().length > 0
    })
    if (hasVisibleText) {
      const tag = await control.evaluate(node => node.tagName)
      if (tag === 'BUTTON' || tag === 'A') await interactionContrast(page, control, `${label} “${name}”`)
      else {
        const placeholder = await control.evaluate(node => (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) && !node.value && Boolean(node.placeholder))
        const ratio = await effectiveContrast(control, placeholder ? '::placeholder' : null)
        assert(ratio >= 4.5, `${label}: “${name}” ${placeholder ? 'placeholder ' : ''}contrast is ${ratio.toFixed(2)}; expected 4.5`)
      }
    }
    audited += 1
  }
  const duplicateNames = [...names.entries()].filter(([, indices]) => indices.length > 1).map(([name]) => name)
  assert(duplicateNames.length === 0, `${label}: duplicate accessible control names: ${duplicateNames.join(', ')}`)
  await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur() })
  await resetScrollRecursively(page)
  return audited
}

async function assertReducedMotion(page, label) {
  assert(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches), `${label}: reduced-motion media query is not active`)
  const loops = await page.locator('[data-testid="phone-frame"] *').evaluateAll(nodes => nodes.flatMap(node => {
    const style = getComputedStyle(node)
    const names = style.animationName.split(',').map(value => value.trim())
    const iterations = style.animationIterationCount.split(',').map(value => value.trim())
    const runningLoop = names.some((name, index) => name !== 'none' && (iterations[index] === 'infinite' || Number(iterations[index]) > 1))
      && style.animationPlayState !== 'paused'
    return runningLoop ? [`${node.tagName.toLowerCase()}:${style.animationName}`] : []
  }))
  assert(loops.length === 0, `${label}: reduced-motion loop(s) remain: ${loops.join(' | ')}`)
}

// Family-wide truthful-copy gate: all-caps CIA (DVF-07), no false external
// capability claims, no unmasked provider numbers.
async function assertTruthfulCopy(page, label) {
  const text = (await page.locator('[data-testid="phone-frame"]').innerText()).replace(/\s+/g, ' ')
  assert(!/\bCia\b/.test(text), `${label}: stale “Cia” casing rendered; expected CIA`)
  const forbidden = [
    /raw audio (?:was |is |has been )?(?:stored|saved|uploaded|retained)/i,
    /(?:opened|opening|sent|sending) (?:in|to|via) WhatsApp/i,
    /(?:called|notified|contacted) (?:your )?emergency contact/i,
    /(?:export|sync|revoke|deletion) (?:completed|finished) (?:on|with|to) (?:the )?(?:provider|server|cloud)/i,
    /(?:synced|saved|uploaded) to (?:the )?(?:server|cloud|your account)/i,
    /microphone listening|voice is being captured/i,
  ]
  const hit = forbidden.find(pattern => pattern.test(text))
  assert(!hit, `${label}: false external-capability claim matched ${hit}`)
  const unmaskedNumber = text.match(/(?:\+\d[\d ()-]{7,}\d|\b\d{3}[- ]\d{3}[- ]\d{4}\b)/)
  assert(!unmaskedNumber, `${label}: unmasked provider number rendered: ${unmaskedNumber?.[0]}`)
}

// Ten-domain registry truth (matrix hard assertion 2): every domain-token
// labelled element carries a registry name and none of the retired labels
// (Health, Fit, Learning, Daily-as-domain); the raw main copy of 13/14/41/61
// never renders “Health” or “Learning”. “Fit” and “Daily” are only forbidden
// inside domain-token elements because “Fit” is a legitimate radar short label
// and “Daily” is a legitimate mission TYPE.
async function assertDomainRegistryTruth(page, label) {
  const audit = await page.locator('[data-testid="phone-frame"]').evaluate((phone, registry) => {
    const forbidden = [/\bHealth\b/, /\bFit\b/, /\bLearning\b/, /\bDaily\b/]
    const chipViolations = []
    for (const node of phone.querySelectorAll('[class]')) {
      const tokens = String(node.getAttribute('class') ?? '').split(/\s+/)
      const carriesDomainColor = tokens.some(token => !token.includes('[') && /^(?:bg|text|border|stroke|fill)-domain-/.test(token))
      if (!carriesDomainColor) continue
      const text = (node.textContent ?? '').replace(/\s+/g, ' ').trim()
      if (!text) continue
      const hasRegistry = registry.some(name => text.includes(name))
      const hit = forbidden.find(pattern => pattern.test(text))
      if (!hasRegistry || hit) chipViolations.push(text.slice(0, 60))
    }
    const mainText = phone.querySelector('main')?.innerText ?? ''
    const textViolations = []
    if (/\bHealth\b/.test(mainText)) textViolations.push('Health')
    if (/\bLearning\b/.test(mainText)) textViolations.push('Learning')
    const semanticViolations = []
    const missionBoard = phone.querySelector('[data-mission-board-state]')
    if (missionBoard) {
      for (const link of missionBoard.querySelectorAll('a[href^="/screens/14?mission="]')) {
        const badges = [...link.querySelectorAll('p span')].map(node => (node.textContent ?? '').replace(/\s+/g, ' ').trim()).filter(Boolean)
        const domain = badges.at(-1) ?? ''
        if (badges.length < 2 || !registry.includes(domain)) semanticViolations.push(domain || '(missing mission-row domain)')
      }
    }
    return { chipViolations, textViolations, semanticViolations }
  }, REGISTRY_DOMAINS)
  assert(audit.chipViolations.length === 0, `${label}: non-registry domain label(s): ${audit.chipViolations.join(' | ')}`)
  assert(audit.textViolations.length === 0, `${label}: retired domain word(s) in main copy: ${audit.textViolations.join(', ')}`)
  assert(audit.semanticViolations.length === 0, `${label}: non-registry semantic mission-row domain(s): ${audit.semanticViolations.join(' | ')}`)
}

async function assertRootContract(page, id, rootAttribute, expectedState, label) {
  if (!rootAttribute) return
  const roots = page.locator(`[${rootAttribute}]`)
  assert(await roots.count() === 1, `${label}: expected one [${rootAttribute}] root`)
  assert(await roots.getAttribute(rootAttribute) === expectedState, `${label}: expected ${rootAttribute}=${expectedState}`)
  const substates = ALLOWED_SUBSTATES[id] ?? {}
  for (const [attribute, values] of Object.entries(substates)) {
    const value = await roots.getAttribute(attribute)
    assert(value && values.includes(value), `${label}: ${attribute}=${value} is outside ${values.join('|')}`)
  }
}

async function assertPrimaryAndFixtureDiscipline(page, state, loading, label) {
  const primary = page.locator('[data-testid="phone-frame"] .hifi-action-primary:visible')
  const primaryCount = await primary.count()
  assert(primaryCount <= 1, `${label}: ${primaryCount} competing primary actions are visible; expected at most one authored primary path`)

  const skeletonCount = await page.locator('[data-testid="phone-frame"] .skeleton-block:visible').count()
  if (state === 'skeleton') assert(skeletonCount > 0, `${label}: skeleton state exposes no visible skeleton surface`)
  else assert(skeletonCount === 0, `${label}: ${state ?? 'non-loading'} state conflicts with ${skeletonCount} visible skeleton surfaces`)

  if (!state) return { primaryCount, skeletonCount }
  const status = (await liveStatusText(page)).replace(/\s+/g, ' ')
  const signatures = {
    skeleton: /load|skeleton|processing|structuring/i,
    processing: /processing|structuring/i,
    empty: /empty|no |nothing|first|cold.start|blank|day one|not enough|start/i,
    'filtered-empty': /filter/i,
    error: /fail|couldn|didn|did\s+not|retry|error/i,
    offline: /offline|cached|last sync/i,
    'stale-offline': /offline|stale|last sync/i,
    success: /success|saved|complete|done|paused|applied|freeze|reached/i,
    'low-confidence': /low confidence|estimated/i,
    stalled: /stall|no actions|9 days/i,
    invalid: /invalid|need|required|add |select|isn.t ready|missing/i,
    revoked: /revoked/i,
    overpacked: /overpacked|13h/i,
  }
  const signature = signatures[state]
  if (signature) assert(signature.test(status), `${label}: ${state} live-status signature is missing (${status})`)

  const retryCount = await page.getByRole('button', { name: /retry|try again/i }).count()
  if (state === 'error') assert(retryCount >= 1, `${label}: error state has no operable Retry/Try again surface`)
  else assert(retryCount === 0, `${label}: ${state} state conflicts with a visible Retry/Try again error surface`)
  if (state === 'success') {
    const rootText = (await page.locator('[data-testid="phone-frame"] main').innerText()).replace(/\s+/g, ' ')
    assert(!/couldn.t (?:load|save|sync)|sync failed|failed to save/i.test(rootText), `${label}: success state still renders an error surface`)
  }
  return { primaryCount, skeletonCount, status }
}

async function auditFixture(handle, { strictLive = true, loading = false, disabledReasons = true } = {}) {
  const { page, name, id, rootAttribute } = handle
  const phone = page.locator('[data-testid="phone-frame"]')
  assert(await phone.count() === 1, `${name}: phone frame missing`)
  const geometry = await phone.evaluate(node => {
    const box = node.getBoundingClientRect()
    const insideHorizontalScroller = element => {
      for (let ancestor = element.parentElement; ancestor && ancestor !== node; ancestor = ancestor.parentElement) {
        const overflowX = getComputedStyle(ancestor).overflowX
        if (overflowX === 'auto' || overflowX === 'scroll') return true
      }
      return false
    }
    const protrusions = [...node.querySelectorAll('*')].flatMap(child => {
      const style = getComputedStyle(child)
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return []
      if (insideHorizontalScroller(child)) return []
      const rect = child.getBoundingClientRect()
      return rect.left < box.left - 1 || rect.right > box.right + 1 ? [`${child.tagName.toLowerCase()}:${Math.round(rect.left)}..${Math.round(rect.right)}`] : []
    })
    return {
      width: Math.round(box.width),
      height: Math.round(box.height),
      overflow: node.scrollWidth > node.clientWidth + 1,
      protrusions: protrusions.slice(0, 10),
    }
  })
  assert(geometry.width === 390 && geometry.height === 844, `${name}: phone is ${geometry.width}×${geometry.height}, expected 390×844`)
  assert(!geometry.overflow && geometry.protrusions.length === 0, `${name}: horizontal overflow/protrusion: ${geometry.protrusions.join(' | ')}`)
  const h1 = phone.locator('h1')
  assert(await h1.count() === 1, `${name}: expected exactly one phone-level h1`)
  if (await h1.isVisible()) {
    const headingContrast = await effectiveContrast(h1)
    assert(headingContrast >= 4.5, `${name}: h1 contrast is ${headingContrast.toFixed(2)}`)
  }
  const semanticFloor = id === '12' ? 11 : 12
  const tinySemanticCopy = await phone.evaluate((node, minimum) => [...node.querySelectorAll('*')].flatMap(element => {
    if (element.closest('[aria-hidden="true"]') || element.getAttribute('aria-hidden') === 'true') return []
    const style = getComputedStyle(element)
    if (style.display === 'none' || style.visibility === 'hidden' || Number.parseFloat(style.opacity) === 0) return []
    if (!element.getClientRects().length || /(?:^|\s)sr-only(?:\s|$)/.test(String(element.className))) return []
    const directText = [...element.childNodes].filter(child => child.nodeType === Node.TEXT_NODE).map(child => child.textContent?.trim() ?? '').join(' ').trim()
    const terseSemanticText = directText.length > 0 && directText.length <= 2 && /[\p{L}\p{N}]/u.test(directText)
    if (directText.length === 0 || (directText.length <= 2 && !terseSemanticText)) return [] // omit only empty/terse glyph fallbacks; weekday letters and numerals remain semantic
    const fontSize = Number.parseFloat(style.fontSize)
    return fontSize < minimum ? [`${element.tagName.toLowerCase()}:${fontSize}px:${directText.slice(0, 80)}`] : []
  }), semanticFloor)
  assert(tinySemanticCopy.length === 0, `${name}: semantic copy below ${semanticFloor}px: ${tinySemanticCopy.slice(0, 10).join(' | ')}`)
  await assertStaticTextContrast(page, name)
  if (rootAttribute) {
    await assertRootContract(page, id, rootAttribute, handle.rootState ?? handle.state, name)
  }
  await assertPrimaryAndFixtureDiscipline(page, handle.rootState ?? handle.state, loading, name)

  const indicator = page.locator('[data-testid="home-indicator"]')
  const indicatorBox = await indicator.boundingBox()
  assert(indicatorBox, `${name}: home indicator missing`)
  const lowerChrome = page.locator('[data-testid="screen-composer"], [data-testid="screen-bottom-action"], [data-testid="screen-shell"] > nav')
  for (let index = 0; index < await lowerChrome.count(); index += 1) {
    const item = lowerChrome.nth(index)
    if (!(await item.isVisible())) continue
    const box = await item.boundingBox()
    assert(box && box.y + box.height <= indicatorBox.y - 2, `${name}: composer/action/nav overlaps the home indicator`)
  }

  const controlCount = await auditNativeControls(page, name, { disabledReasons })
  if (strictLive) {
    const live = page.locator('[data-testid="phone-frame"] [aria-live="polite"][aria-atomic="true"]')
    assert(await live.count() === 1, `${name}: expected one atomic polite live source`)
  }
  if (loading) {
    assert(await page.locator(`[${rootAttribute}][aria-busy="true"], [${rootAttribute}] [aria-busy="true"]`).count() >= 1, `${name}: loading fixture lacks aria-busy=true`)
    const width = await page.locator(`[${rootAttribute}]`).evaluate(node => node.getBoundingClientRect().width)
    assert(width >= geometry.width - 32, `${name}: loading content width collapsed to ${width.toFixed(1)}px; expected the canonical phone width minus at most 16px gutters`)
  }
  if (handle.reducedMotion === 'reduce') await assertReducedMotion(page, name)
  if (handle.textScale !== 1) {
    const scaleEvidence = await assertTextScaleApplied(page, handle.textScale, name)
    pass(`${name} text-only enlargement`, scaleEvidence)
  }
  await assertTruthfulCopy(page, name)
  await resetScrollRecursively(page)
  return { geometry, controlCount }
}

async function capture(handle, screenshotName, { top = true } = {}) {
  if (top) await resetScrollRecursively(handle.page)
  const fileName = `${screenshotName}.png`
  assert(EXPECTED_SET.has(fileName), `${handle.name}: ${fileName} is outside the canonical C1 set`)
  assert(!captured.has(fileName), `${handle.name}: duplicate screenshot ${fileName}`)
  if (handle.reducedMotion === 'reduce') await assertReducedMotion(handle.page, screenshotName)
  const phone = handle.page.locator('[data-testid="phone-frame"]')
  const freeze = await handle.page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}' })
  await phone.evaluate(async node => {
    node.style.transform = 'translateZ(0)'
    node.style.filter = 'brightness(0.9999)'
    void node.getBoundingClientRect()
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
  const output = path.join(tempShotsDir, fileName)
  await phone.screenshot({ path: output, animations: 'disabled', scale: 'css' })
  await phone.evaluate(node => { node.style.removeProperty('transform'); node.style.removeProperty('filter') })
  await freeze.evaluate(node => node.remove())
  const geometry = pngGeometry(output)
  assert(geometry.width === 390 && geometry.height === 844, `${fileName}: ${geometry.width}×${geometry.height}, expected 390×844`)
  captured.add(fileName)
}

async function waitAttribute(page, selector, attribute, expected, timeout = 6000) {
  await page.waitForFunction(
    ({ selector, attribute, expected }) => document.querySelector(selector)?.getAttribute(attribute) === expected,
    { selector, attribute, expected },
    { timeout },
  )
  await twoAnimationFrames(page)
}

async function liveStatusText(page) {
  return page.evaluate(() => document.querySelector('[data-testid="phone-frame"] [role="status"]')?.textContent?.trim() ?? '')
}

async function waitStatusChange(page, previous, label, timeout = 6000) {
  try {
    await page.waitForFunction(
      prev => (document.querySelector('[data-testid="phone-frame"] [role="status"]')?.textContent?.trim() ?? '') !== prev,
      previous,
      { timeout },
    )
  } catch {
    throw new Error(`${label}: live status did not change after the interaction`)
  }
  await twoAnimationFrames(page)
}

async function fullyVisibleInPhone(page, locator, label) {
  const [box, phone] = await Promise.all([locator.boundingBox(), page.locator('[data-testid="phone-frame"]').boundingBox()])
  assert(box && phone && box.x >= phone.x && box.y >= phone.y && box.x + box.width <= phone.x + phone.width && box.y + box.height <= phone.y + phone.height, `${label}: not fully visible in phone frame`)
}

// First-viewport proof (matrix hard assertion 3): at scrollTop 0 the element
// must start inside the first 844px of the phone frame.
async function withinFirstViewport(page, locator, label) {
  await resetScrollRecursively(page)
  const [box, phone] = await Promise.all([locator.boundingBox(), page.locator('[data-testid="phone-frame"]').boundingBox()])
  assert(box && phone, `${label}: element or phone frame missing for the first-viewport check`)
  assert(box.y >= phone.y - 1 && box.y < phone.y + 844, `${label}: starts at ${Math.round(box.y - phone.y)}px, outside the first 844px viewport`)
}

async function equalExit(cancel, destructive, label) {
  const [cancelBox, destructiveBox] = await Promise.all([cancel.boundingBox(), destructive.boundingBox()])
  assert(cancelBox && destructiveBox, `${label}: cancel/destructive action missing`)
  assert(Math.abs(cancelBox.width - destructiveBox.width) <= 4 && Math.abs(cancelBox.height - destructiveBox.height) <= 4, `${label}: Cancel is not equal geometry (${cancelBox.width}×${cancelBox.height} vs ${destructiveBox.width}×${destructiveBox.height})`)
  await targetSize(cancel, `${label} Cancel`)
  await targetSize(destructive, `${label} destructive action`)
}

async function assertDialogTrap(page, dialog, trigger, label, { close = true } = {}) {
  await dialog.waitFor()
  const controls = dialog.locator('button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), select:not(:disabled)')
  assert(await controls.count() > 0, `${label}: dialog has no operable controls`)
  await page.waitForFunction(() => {
    const modal = document.querySelector('[role="dialog"][aria-modal="true"]')
    return Boolean(modal && modal.contains(document.activeElement))
  })
  assert(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: dialog did not receive focus`)
  const first = controls.first()
  const last = controls.last()
  await last.focus()
  await page.keyboard.press('Tab')
  assert(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: forward Tab escaped dialog`)
  await first.focus()
  await page.keyboard.press('Shift+Tab')
  assert(await dialog.evaluate(node => node.contains(document.activeElement)), `${label}: reverse Tab escaped dialog`)
  if (close) {
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
    const triggerHandle = await trigger.elementHandle()
    assert(triggerHandle, `${label}: trigger handle unavailable for focus restoration`)
    await page.waitForFunction(node => document.activeElement === node, triggerHandle)
    assert(await trigger.evaluate(node => document.activeElement === node), `${label}: Escape did not restore trigger focus`)
  }
}

// Confirmation surfaces may be dialogs or inline confirm regions; resolve the
// scope that owns the Cancel control.
async function confirmScope(page, label) {
  const dialog = page.locator('[role="dialog"]')
  if (await dialog.count() > 0) return dialog.first()
  const cancel = page.getByRole('button', { name: 'Cancel', exact: true })
  await cancel.first().waitFor()
  assert(await cancel.count() >= 1, `${label}: no confirmation surface (dialog or inline Cancel) appeared`)
  // Scope to the phone screen's <main>: the desktop review shell renders its own <main>,
  // so a bare locator('main') is ambiguous (strict-mode violation), not an app defect.
  return page.locator('[data-testid="phone-frame"] main')
}

async function stateCapture(id, state, options = {}) {
  const contract = SCREEN_CONTRACTS[id]
  const name = options.name ?? `${id}-${state}`
  const loading = options.loading ?? (state === 'skeleton' || (id === '15' && state === 'processing'))
  await runCase({ name, id, state, rootAttribute: contract.root, rootState: state, textScale: options.textScale ?? 1 }, async handle => {
    if (options.beforeAudit) await options.beforeAudit(handle)
    await auditFixture(handle, {
      strictLive: options.strictLive ?? true,
      loading,
      disabledReasons: options.disabledReasons ?? true,
    })
    if (DOMAIN_TRUTH_IDS.has(id) && state !== 'skeleton') await assertDomainRegistryTruth(handle.page, name)
    assert(await handle.page.locator(`[${contract.root}]`).getAttribute(contract.root) === state, `${name}: exact fixture drifted before capture`)
    if (options.beforeCapture) await options.beforeCapture(handle)
    await capture(handle, name, { top: options.top ?? true })
    if (options.afterCapture) await options.afterCapture(handle)
  })
}

async function validateStagedScreenshots() {
  const actual = fs.readdirSync(tempShotsDir).filter(file => file.endsWith('.png')).sort()
  const missing = EXPECTED_SCREENSHOTS.filter(file => !actual.includes(file))
  const unexpected = actual.filter(file => !EXPECTED_SET.has(file))
  assert(captured.size === EXPECTED_COUNT, `Captured ${captured.size} screenshots; expected ${EXPECTED_COUNT}`)
  assert(actual.length === EXPECTED_COUNT && missing.length === 0 && unexpected.length === 0, `Staged screenshot mismatch. Missing: ${missing.join(', ') || 'none'}. Unexpected: ${unexpected.join(', ') || 'none'}.`)
  const evidence = actual.map(file => ({ file, ...pngGeometry(path.join(tempShotsDir, file)) }))
  for (const entry of evidence) assert(entry.width === 390 && entry.height === 844, `${entry.file}: wrong dimensions`)
  const byFile = new Map(evidence.map(entry => [entry.file, entry]))
  for (const [changedFile, defaultFile] of DISTINCT_FROM_DEFAULT) {
    const changed = byFile.get(changedFile)
    const baseline = byFile.get(defaultFile)
    assert(changed && baseline, `Distinct-state contract is missing ${changedFile} or ${defaultFile}`)
    assert(changed.sha256 !== baseline.sha256, `${changedFile}: named non-undo state is byte-identical to ${defaultFile}; the changed state is not visually evidenced`)
  }
  return evidence
}

// C1 allows ZERO capability events of any kind (no clipboard exception —
// nothing in this family copies).
function assertCapabilityContract() {
  assert(capabilityEvents.length === 0, `Forbidden capability event(s): ${capabilityEvents.map(event => `${event.case}:${event.type}:${event.detail}`).join(' | ')}`)
}

function promoteScreenshots() {
  assert(unexpectedExisting.length === 0, `Unexpected prior PNG(s) in canonical directory: ${unexpectedExisting.join(', ')}`)
  const nowUnexpected = fs.readdirSync(shotsDir).filter(file => file.endsWith('.png') && !EXPECTED_SET.has(file)).sort()
  assert(nowUnexpected.length === 0, `Unexpected PNG(s) appeared before promotion: ${nowUnexpected.join(', ')}`)
  const backupDir = path.join(path.dirname(shotsDir), `.${path.basename(shotsDir)}.previous-${process.pid}`)
  assert(!fs.existsSync(backupDir), `Screenshot backup path already exists: ${backupDir}`)
  fs.renameSync(shotsDir, backupDir)
  try {
    // Both directories share a parent/filesystem. All staged assertions pass
    // before this directory-level replacement; any thrown promotion error
    // restores the complete prior generation instead of leaving a partial set.
    fs.renameSync(tempShotsDir, shotsDir)
  } catch (error) {
    if (fs.existsSync(shotsDir)) fs.rmSync(shotsDir, { recursive: true, force: true })
    fs.renameSync(backupDir, shotsDir)
    throw error
  }
  try {
    const final = fs.readdirSync(shotsDir).filter(file => file.endsWith('.png')).sort()
    assert(final.length === EXPECTED_COUNT && final.every(file => EXPECTED_SET.has(file)), `Final screenshot directory is not the exact ${EXPECTED_COUNT}-name set`)
    for (const entry of screenshotEvidence) {
      const promoted = pngGeometry(path.join(shotsDir, entry.file))
      assert(promoted.sha256 === entry.sha256 && promoted.width === 390 && promoted.height === 844, `${entry.file}: promotion changed evidence`)
    }
    return backupDir
  } catch (error) {
    fs.rmSync(shotsDir, { recursive: true, force: true })
    fs.renameSync(backupDir, shotsDir)
    throw error
  }
}

function buildReport(status, error) {
  try {
    fingerprintsEnd = fingerprintAll()
    const s12Latest = fingerprintsEnd.product.files.find(file => file.path === S12_FILE)?.sha256 ?? null
    if (status === 'pass') {
      assert(sameFingerprint(fingerprintsStart, fingerprintsEnd), 'Product/API/authority fingerprint drifted after screenshot promotion')
      assert(s12Latest === S12_SENTINEL_SHA256, 'S12 sentinel drifted after screenshot promotion')
    }
  } catch (fingerprintError) {
    if (status === 'pass') throw fingerprintError
    if (!error) error = fingerprintError
  }
  const s12Actual = fingerprintsEnd.product.files.find(file => file.path === S12_FILE)?.sha256 ?? null
  return {
    auditedAt: new Date().toISOString(),
    baseURL,
    command: USAGE,
    hostViewport: { width: 1440, height: 1000, deviceScaleFactor: 1 },
    phoneFrame: { width: 390, height: 844 },
    primaryReducedMotion: 'reduce',
    productionBuild: productionBuildEvidence,
    navigationIsolation: {
      strategy: 'new context per case + about:blank + Chromium origin clear + cookie clear + exact query fixture + unique __c1audit nonce + two RAFs',
      contexts: caseEvidence.length,
      uniqueNonces: visitedNonces.size,
    },
    integrity: {
      start: fingerprintsStart,
      end: fingerprintsEnd,
      unchanged: sameFingerprint(fingerprintsStart, fingerprintsEnd),
      s12Sentinel: { file: S12_FILE, expected: S12_SENTINEL_SHA256, actual: s12Actual },
    },
    expectedScreenshotCount: EXPECTED_COUNT,
    expectedScreenshots: EXPECTED_SCREENSHOTS,
    screenshots: screenshotEvidence,
    screenshotPromotion: status === 'pass' ? 'promoted-after-all-assertions' : 'not-promoted',
    checks,
    cases: caseEvidence,
    consoleErrors,
    pageErrors,
    capabilityEvents,
    capabilityExpectation: { forbidden: 0, total: 0 },
    status,
    ...(error ? { error: error instanceof Error ? error.stack || error.message : String(error) } : {}),
  }
}

function writeReport(report, stream = 'log') {
  const json = `${JSON.stringify(report, null, 2)}\n`
  fs.writeFileSync(outPath, json)
  console[stream](json.trimEnd())
}

try {
  productionBuildEvidence = await assertFreshProductionBuild()
  browser = await chromium.launch(fs.existsSync(chromePath) ? { executablePath: chromePath } : {})

  // ——— S12 (pilot sentinel — verification only, no fixture query) ———
  await runCase({ name: '12-default', id: '12' }, async handle => {
    const { page } = handle
    await auditFixture(handle, { strictLive: false })
    const radar = page.locator('[data-domain-count]')
    assert(await radar.count() === 1, '12 default: expected exactly one radar with data-domain-count')
    assert(await radar.getAttribute('data-domain-count') === '10', '12 default: radar data-domain-count must be 10')
    const radarLabel = await radar.getAttribute('aria-label') ?? ''
    assert(/Life Power \d+/.test(radarLabel) && /10 active domains/.test(radarLabel), '12 default: radar accessible summary must announce Life Power and 10 active domains')
    for (const domain of REGISTRY_DOMAINS) {
      assert(radarLabel.includes(domain), `12 default: radar summary is missing registry domain ${domain}`)
    }
    assert(await page.getByText(/Balance bonus \d+\.\d{2}× · based on all 10 domains/).count() === 1, '12 default: Life Power balance-bonus line missing')
    pass('ten-domain truth S12', { domainCount: 10, summary: radarLabel.slice(0, 120) })
    await capture(handle, '12-default')
  })

  await runCase({ name: '12-action-toggled', id: '12' }, async handle => {
    const { page } = handle
    await auditFixture(handle, { strictLive: false })
    const action = page.locator('button[aria-pressed="false"]').filter({ hasText: 'Morning run' })
    assert(await action.count() === 1, '12 action: Morning run toggle missing or already pressed')
    await action.click()
    await twoAnimationFrames(page)
    const pressedAction = page.locator('button[aria-pressed="true"]').filter({ hasText: 'Morning run' })
    assert(await pressedAction.count() === 1, '12 action: Morning run did not toggle to pressed')
    assert(await page.getByText(/2 of 3/).count() >= 1, '12 action: momentum roll-up did not update to 2 of 3')
    assert(await page.locator('[aria-label*="2 of 3 actions complete"]').count() === 1, '12 action: momentum bar label did not update')
    await pressedAction.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await twoAnimationFrames(page)
    await capture(handle, '12-action-toggled', { top: false })
  })

  // ——— S13 — Mission Board ———
  for (const state of SCREEN_CONTRACTS['13'].states) {
    await stateCapture('13', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-mission-board-state]')
        const rootText = (await root.innerText()).replace(/\s+/g, ' ')
        if (state === 'default') {
          const radar = page.locator('[data-domain-count]')
          assert(await radar.count() === 1, '13 default: expected one data-bound radar')
          assert(await radar.getAttribute('data-domain-count') === '10', '13 default: radar data-domain-count must be 10')
          pass('ten-domain truth S13', { domainCount: 10 })
          for (const type of ['Life', 'Main', 'Side', 'Weekly', 'Daily', 'Group']) {
            assert(await page.getByRole('button', { name: new RegExp(`^${type}\\b`, 'i') }).count() >= 1, `13 default: mission type filter ${type} missing`)
          }
          assert(await root.locator('[role="tablist"], [role="tab"]').count() === 0, '13 default: status filters expose an incomplete ARIA tabs pattern')
          const statusFilters = root.getByRole('group', { name: 'Mission status', exact: true })
          assert(await statusFilters.count() === 1, '13 default: labelled Mission status button group missing')
          for (const statusName of ['Active', 'Done', 'All']) {
            const statusControl = statusFilters.getByRole('button', { name: statusName, exact: true })
            assert(await statusControl.count() === 1 && ['true', 'false'].includes(await statusControl.getAttribute('aria-pressed')), `13 default: ${statusName} is not a native pressed button`)
          }
          assert(await statusFilters.getByRole('button', { name: 'All', exact: true }).getAttribute('aria-pressed') === 'true', '13 default: All status is not initially pressed')
          const allStatus = statusFilters.getByRole('button', { name: 'All', exact: true })
          const doneStatus = statusFilters.getByRole('button', { name: 'Done', exact: true })
          await allStatus.focus()
          await page.keyboard.press('ArrowLeft')
          assert(await doneStatus.getAttribute('aria-pressed') === 'true' && await doneStatus.evaluate(node => document.activeElement === node), '13 default: status pressed-button group does not support authored arrow navigation')
          await allStatus.click()
          assert(await allStatus.getAttribute('aria-pressed') === 'true', '13 default: All status did not restore after arrow-navigation proof')
          const rowLinks = page.getByRole('link', { name: /^Open .+ mission detail$/ })
          const rowTargets = await rowLinks.evaluateAll(links => links.map(link => ({ name: link.getAttribute('aria-label'), href: link.getAttribute('href') })))
          const expectedTargets = new Map([
            ['Open Morning sunlight mission detail', 'sunlight'],
            ['Open Finalize Q3 report mission detail', 'q3-report'],
            ['Open Run 5K mission detail', 'run-5k'],
            ['Open Hydrate mission detail', 'hydrate'],
          ])
          assert(rowTargets.length === expectedTargets.size, `13 default: expected ${expectedTargets.size} identity-bearing mission rows, found ${rowTargets.length}`)
          for (const target of rowTargets) {
            const expectedId = expectedTargets.get(target.name)
            assert(expectedId && target.href && new URL(target.href, baseURL).pathname === '/screens/14' && new URL(target.href, baseURL).searchParams.get('mission') === expectedId, `13 default: mission row identity drift: ${JSON.stringify(target)}`)
          }
          const identity = 'Finalize Q3 report'
          const missionLink = page.getByRole('link', { name: `Open ${identity} mission detail`, exact: true })
          assert(await missionLink.count() === 1, `13 default: exact ${identity} detail link missing`)
          await page.evaluate(() => {
            window.__c1MissionIdentityLeaks = []
            window.__c1MissionIdentityObserver = new MutationObserver(() => {
              if (window.location.pathname !== '/screens/14') return
              const selected = document.querySelector('[data-mission-id="q3-report"]')
              if (!selected && document.body.innerText.includes('Run a half marathon')) window.__c1MissionIdentityLeaks.push('unrelated half-marathon claim rendered before q3-report resolved')
            })
            window.__c1MissionIdentityObserver.observe(document.body, { childList: true, subtree: true, characterData: true })
          })
          await missionLink.click()
          await page.waitForURL(url => url.pathname === '/screens/14' && url.searchParams.get('mission') === 'q3-report')
          await page.locator('[data-mission-detail-state="default"]').waitFor()
          await page.locator('[data-mission-id="q3-report"]').waitFor()
          await page.getByRole('heading', { level: 1, name: identity, exact: true }).waitFor()
          await twoAnimationFrames(page)
          assert(await page.getByRole('heading', { level: 1, name: identity, exact: true }).count() === 1, '13→14 identity: selected mission title did not survive navigation')
          const detailText = (await page.locator('[data-mission-detail-state]').innerText()).replace(/\s+/g, ' ')
          assert(detailText.includes(identity) && !detailText.includes('Run a half marathon'), '13→14 identity: detail content fell back to an unrelated mission fixture')
          const identityLeaks = await page.evaluate(() => {
            window.__c1MissionIdentityObserver?.disconnect()
            return window.__c1MissionIdentityLeaks ?? []
          })
          assert(identityLeaks.length === 0, `13→14 identity: ${identityLeaks.join(' | ')}`)
          pass('S13→S14 mission identity', { mission: identity, query: 'q3-report' })
        }
        if (state === 'empty') {
          assert(await root.getByRole('link', { name: /^Open .+ mission detail$/i }).count() === 0, '13 empty: populated mission rows remain')
          assert(await root.locator('[data-domain-count]').count() === 0, '13 empty: populated whole-life radar remains')
          assert(await root.getByRole('group', { name: 'Mission status', exact: true }).count() === 0 && await root.getByRole('group', { name: 'Mission type filters', exact: true }).count() === 0, '13 empty: populated board filters remain')
          const summary = root.getByRole('region', { name: 'Board summary', exact: true })
          assert(await summary.getByText('--', { exact: true }).count() === 3, '13 empty: Active/Done/Streak honest-null metrics are not all --')
          const summaryText = (await summary.innerText()).replace(/\s+/g, ' ')
          assert(/Active -- Done -- Streak -- Not enough data yet — metrics appear with your first mission\./i.test(summaryText), '13 empty: exact board metric null explanation missing')
          assert(!/\b03\b|\b01\b|\b07d\b/.test(summaryText) && /No missions yet\./.test(rootText), '13 empty: populated board metrics or missing empty heading')
          const createLinks = root.getByRole('link', { name: /create your first mission|start the .+ mission draft/i })
          assert(await createLinks.count() === 4, '13 empty: exact set of four enabled creation affordances missing')
          const destinations = await createLinks.evaluateAll(links => links.map(link => new URL(link.getAttribute('href') ?? '', document.baseURI).pathname))
          assert(destinations.every(destination => destination === '/screens/15'), `13 empty: a creation affordance bypasses S15 (${destinations.join(', ')})`)
          assert(await liveStatusText(page) === 'No missions yet in this preview. Board metrics show honest nulls until your first mission exists.', '13 empty: exact honest-null outcome was not announced')
        }
        if (state === 'filtered-empty') {
          assert(await root.getByRole('link', { name: /^Open .+ mission detail$/i }).count() === 0, '13 filtered-empty: nonmatching mission rows remain')
          const typeFilters = root.getByRole('group', { name: 'Mission type filters', exact: true })
          assert(await typeFilters.getByRole('button', { name: 'Group', exact: true }).getAttribute('aria-pressed') === 'true', '13 filtered-empty: Group fixture filter is not pressed')
          assert(await root.locator('[data-domain-count="10"]').count() === 1 && await root.getByRole('group', { name: 'Mission status', exact: true }).count() === 1, '13 filtered-empty: valid populated board context disappeared')
          assert(/0 shown/.test(rootText) && /No missions here yet\./.test(rootText) && /Clear a status or type filter/.test(rootText), '13 filtered-empty: exact zero-result explanation missing')
          assert(await liveStatusText(page) === 'Group filter applied — no missions match. Clear a filter to see the board again.', '13 filtered-empty: exact Group-filter outcome was not announced')
        }
        if (state === 'offline') assert(/offline|cached/i.test(rootText), '13 offline: offline truth missing')
        if (state === 'error') assert(/retry|failed|didn/i.test(rootText), '13 error: retry/failed truth missing')
        if (state === 'success') assert(/XP/.test(rootText) && /undo/i.test(rootText), '13 success: local completion outcome (+XP preview, undo) missing')
      },
    })
  }

  await runCase({ name: '13-filter-weekly', id: '13', state: 'default', rootAttribute: 'data-mission-board-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await assertDomainRegistryTruth(page, '13-filter-weekly')
    const root = page.locator('[data-mission-board-state]')
    const typeFilters = root.getByRole('group', { name: 'Mission type filters', exact: true })
    assert(await typeFilters.count() === 1, '13 filter: exact mission-type filter group missing')
    const missionLinks = root.getByRole('link', { name: /^Open .+ mission detail$/i })
    const missionCountBefore = await missionLinks.count()
    assert(missionCountBefore === 4, `13 filter: default mission population is ${missionCountBefore}; expected four identity-bearing rows`)
    const weekly = typeFilters.getByRole('button', { name: 'Weekly', exact: true })
    assert(await weekly.count() === 1, '13 filter: Weekly type chip missing')
    const weeklyNative = await weekly.evaluate(node => ({ tag: node.tagName, type: node.getAttribute('type'), pressed: node.getAttribute('aria-pressed') }))
    assert(weeklyNative.tag === 'BUTTON' && weeklyNative.type === 'button' && weeklyNative.pressed === 'false', '13 filter: Weekly chip is not an initially unpressed native button')
    await weekly.click()
    await waitAttribute(page, '[data-mission-board-state]', 'data-mission-board-state', 'filtered-empty')
    assert(await weekly.getAttribute('aria-pressed') === 'true', '13 filter: Weekly native pressed state did not activate')
    assert(await missionLinks.count() === 0, '13 filter: Weekly activation did not remove the non-Weekly mission population')
    const filteredText = (await root.innerText()).replace(/\s+/g, ' ')
    assert(/0 shown/.test(filteredText) && /No missions here yet\./.test(filteredText) && /Clear a status or type filter to see the board again\./.test(filteredText), '13 filter: exact zero-result outcome is not visibly explained')
    assert(await liveStatusText(page) === 'Filtering by Weekly missions.', '13 filter: exact Weekly filter outcome was not announced')
    await capture(handle, '13-filter-weekly')
  })

  await runCase({ name: '13-new-mission', id: '13', state: 'default', rootAttribute: 'data-mission-board-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: /new mission|create mission/i }).or(page.getByRole('link', { name: /new mission|create mission/i })).first()
    assert(await trigger.count() === 1, '13 new mission: creation affordance missing')
    await targetSize(trigger, '13 new mission trigger')
    await trigger.click()
    await page.waitForURL(url => url.pathname === '/screens/15')
    await page.waitForFunction(() => document.querySelectorAll('[data-testid="phone-frame"]').length === 1)
    await page.locator('[data-mission-editor-state]').waitFor()
    await twoAnimationFrames(page)
    assert(await page.getByRole('textbox', { name: /what do you want to achieve/i }).count() === 1, '13 new mission: destination is not the editable S15 mission prompt')
    const create = page.getByRole('button', { name: /create mission/i })
    assert(await create.count() === 1, '13 new mission: S15 create/save control missing')
    await targetSize(create, '13→15 Create mission')
    pass('S13→S15 create flow', { path: '/screens/15', editor: 'data-mission-editor-state' })
    await capture(handle, '13-new-mission', { top: false })
  })

  // ——— S14 — Mission Detail ———
  for (const state of SCREEN_CONTRACTS['14'].states) {
    await stateCapture('14', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-mission-detail-state]')
        const rootText = (await root.innerText()).replace(/\s+/g, ' ')
        if (state === 'default') {
          const domainLink = page.getByRole('link', { name: /^Open (Fitness|Sleep|Career|Nutrition|Finance|Faith|Productivity|Relationships|Wellbeing|Meditation) domain$/ }).first()
          assert(await domainLink.count() === 1, '14 default: registry domain destination link missing')
          const href = await domainLink.getAttribute('href')
          assert(href && /^\/screens\/\d+/.test(new URL(href, baseURL).pathname + ''), `14 default: domain link is not an internal screen route (${href})`)
          assert(/Via (missions|rewards) ledger/i.test(rootText), '14 default: precise ledger provenance missing')
          assert(!/\bSystem\b/.test(rootText), '14 default: vague “System” source remains')
        }
        if (state === 'empty') {
          assert(await root.locator('[role="img"][aria-label="Complete 0%"]').count() === 1, '14 empty: progress ring is not an honest-null 0% ghost')
          assert(await root.getByText('—', { exact: true }).count() === 3, '14 empty: Actions/Streak/XP KPI values are not all honest-null')
          assert(/No actions logged yet/.test(rootText) && /Starts with day one/.test(rootText) && /Appears after your first action/.test(rootText), '14 empty: exact KPI null explanations missing')
          assert(/Not enough data yet — 3 more days to calibrate\./.test(rootText) && /No data yet/.test(rootText) && await root.getByText('Via Strava', { exact: true }).count() === 0 && !/You logged/.test(rootText), '14 empty: populated source/log claims or missing calibration copy')
          assert(await liveStatusText(page) === 'Cold-start fixture — no actions logged yet, so the ring, KPIs, and XP show honest nulls.', '14 empty: exact honest-null outcome was not announced')
          const actions = root.getByRole('button', { name: 'All actions', exact: true })
          await actions.click()
          const actionPanel = root.locator('#mission-section-actions')
          await actionPanel.waitFor()
          assert(await actionPanel.getByRole('listitem').count() === 0 && await actionPanel.getByText('No actions logged yet.', { exact: true }).count() === 1, '14 empty: populated action log rows remain')
          const progress = root.getByRole('button', { name: 'Progress over time', exact: true })
          await progress.click()
          const progressPanel = root.locator('#mission-section-progress')
          await progressPanel.waitFor()
          assert(await progressPanel.getByRole('img', { name: /^Completion percent by week/ }).count() === 0 && await progressPanel.getByText('The trend chart appears after your first logged week.', { exact: true }).count() === 1, '14 empty: populated trend series remains')
        }
        if (state === 'low-confidence') assert(/low confidence/i.test(rootText), '14 low-confidence: confidence truth missing')
        if (state === 'offline') assert(/offline|cached/i.test(rootText), '14 offline: offline truth missing')
        if (state === 'stalled') assert(/stalled|no progress|9 days/i.test(rootText), '14 stalled: stalled coaching truth missing')
        if (state === 'success') assert(/XP/.test(rootText) && /undo/i.test(rootText), '14 success: +XP preview with undo missing')
      },
    })
  }

  await runCase({ name: '14-accordion-open', id: '14', state: 'default', rootAttribute: 'data-mission-detail-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await assertDomainRegistryTruth(page, '14-accordion-open')
    const accordion = page.locator('main button[aria-expanded="false"]').first()
    assert(await accordion.count() === 1, '14 accordion: no collapsed aria-expanded control found')
    const accordionElement = await accordion.elementHandle()
    assert(accordionElement, '14 accordion: control handle unavailable')
    await accordion.click()
    await twoAnimationFrames(page)
    assert(await accordionElement.evaluate(node => node.getAttribute('aria-expanded')) === 'true', '14 accordion: control did not expand')
    assert(await page.locator('main button[aria-expanded="true"]').count() >= 1, '14 accordion: no expanded panel control rendered')
    await accordion.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await twoAnimationFrames(page)
    await capture(handle, '14-accordion-open', { top: false })
  })

  // ——— S15 — Create/Edit Mission ———
  for (const state of SCREEN_CONTRACTS['15'].states) {
    await stateCapture('15', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-mission-editor-state]')
        const rootText = (await root.innerText()).replace(/\s+/g, ' ')
        if (state === 'default') {
          const prompt = page.locator('main textarea')
          assert(await prompt.count() >= 1, '15 default: native multiline prompt missing')
          assert(Number.parseFloat(await prompt.first().evaluate(node => getComputedStyle(node).fontSize)) >= 16, '15 default: prompt below 16px')
          assert(await root.locator('[role="tablist"], [role="tab"]').count() === 0, '15 default: form choices expose an incomplete ARIA tabs pattern')
          for (const groupName of ['Mission type', 'Strictness']) {
            const group = root.getByRole('group', { name: groupName, exact: true })
            assert(await group.count() === 1, `15 default: labelled ${groupName} pressed-button group missing`)
            const choices = group.getByRole('button')
            const pressedStates = await choices.evaluateAll(nodes => nodes.map(node => node.getAttribute('aria-pressed')))
            assert(pressedStates.length >= 3 && pressedStates.every(value => value === 'true' || value === 'false') && pressedStates.filter(value => value === 'true').length === 1, `15 default: ${groupName} must expose exactly one pressed native button (${pressedStates.join(',')})`)
          }
          const missionTypeGroup = root.getByRole('group', { name: 'Mission type', exact: true })
          const mainType = missionTypeGroup.getByRole('button', { name: 'Main', exact: true })
          const sideType = missionTypeGroup.getByRole('button', { name: 'Side', exact: true })
          await mainType.focus()
          await page.keyboard.press('ArrowRight')
          assert(await sideType.getAttribute('aria-pressed') === 'true' && await sideType.evaluate(node => document.activeElement === node), '15 default: Mission type pressed-button group does not support authored arrow navigation')
          await mainType.click()
          assert(await mainType.getAttribute('aria-pressed') === 'true', '15 default: Main mission type did not restore after arrow-navigation proof')
          const unitGroup = root.getByRole('group', { name: 'Unit', exact: true })
          assert(await unitGroup.count() === 1, '15 default: Unit radios lack a programmatically named group')
          const unitRadios = unitGroup.getByRole('radio')
          assert(await unitRadios.count() === 2 && await unitRadios.evaluateAll(nodes => nodes.filter(node => node.checked).length) === 1, '15 default: Unit group must expose two radios with exactly one checked')
          assert(await page.getByRole('button', { name: /^Remove / }).count() >= 1, '15 default: labelled domain remove buttons missing')
          assert(await page.getByRole('button', { name: /move (up|down)/i }).count() >= 2, '15 default: Move up/Move down reorder buttons missing')
          const distance = root.getByRole('switch', { name: 'Track weekly distance', exact: true })
          assert(await distance.count() === 1, '15 default: weekly-distance switch missing')
          const distanceNative = await distance.evaluate(node => ({ tag: node.tagName, type: node.getAttribute('type'), checked: node.getAttribute('aria-checked') }))
          assert(distanceNative.tag === 'BUTTON' && distanceNative.type === 'button' && distanceNative.checked === 'true', '15 default: weekly-distance switch is not a coherent checked native button')
          const statusBefore = await liveStatusText(page)
          await distance.click()
          await waitStatusChange(page, statusBefore, '15 weekly-distance switch')
          assert(await distance.getAttribute('aria-checked') === 'false' && /Weekly distance tracking turned off in this draft\./.test(await liveStatusText(page)), '15 default: weekly-distance switch did not toggle and announce its draft-only outcome')
        }
        if (state === 'empty') {
          const prompt = root.getByRole('textbox', { name: 'What do you want to achieve?', exact: true })
          assert(await prompt.count() === 1 && await prompt.inputValue() === '', '15 empty: native mission prompt is not blank')
          assert(await root.getByRole('button', { name: /^Remove / }).count() === 0, '15 empty: selected domain/action removers remain')
          assert(await root.getByRole('button', { name: /move (up|down)/i }).count() === 0, '15 empty: populated action/milestone reorder controls remain')
          assert(await root.getByText('Run 3x weekly', { exact: true }).count() === 0 && await root.getByText('Strength train 2x', { exact: true }).count() === 0, '15 empty: default action rows remain')
          const create = page.getByRole('button', { name: 'Create mission', exact: true })
          assert(await create.count() === 1 && await create.isDisabled(), '15 empty: Create mission is not uniquely disabled')
          assert(await create.getAttribute('aria-describedby') === 'mission-editor-gate', '15 empty: disabled Create mission does not reference its exact gate')
          assert(await page.locator('#mission-editor-gate').innerText() === 'To create this mission, add a mission title, at least one action, at least one domain.', '15 empty: exact create-gate guidance missing')
          assert(await liveStatusText(page) === 'Blank editor — type what you want to achieve, or tap an example. The create action stays disabled until the draft is valid.', '15 empty: exact blank-editor outcome was not announced')
        }
        if (state === 'invalid') {
          const cta = page.getByRole('button', { name: /create|save/i }).last()
          assert(await cta.count() === 1, '15 invalid: primary CTA missing')
          assert(await cta.isDisabled(), '15 invalid: CTA must be disabled while the editor is invalid')
          const describedBy = await cta.getAttribute('aria-describedby')
          const reason = describedBy
            ? await page.evaluate(ids => ids.split(/\s+/).map(id => document.getElementById(id)?.textContent?.trim() ?? '').join(' ').trim(), describedBy)
            : ''
          assert(reason.length > 0 || /(add|needs?|requires?|at least|missing)/i.test(rootText), '15 invalid: no visible reason for the disabled CTA')
        }
        if (state === 'processing') assert(await page.locator('button[aria-busy="true"]').count() >= 1, '15 processing: loading CTA lacks aria-busy')
        if (state === 'offline') assert(/queued locally|offline/i.test(rootText), '15 offline: queued-locally truth missing')
        if (state === 'success') assert(/saved in this preview|saved locally|saved/i.test(rootText), '15 success: local-only save outcome missing')
        if (state === 'error') assert(/retry|failed|error/i.test(rootText), '15 error: failure truth missing')
      },
    })
  }

  await runCase({ name: '15-domain-removed', id: '15', state: 'default', rootAttribute: 'data-mission-editor-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const removers = page.getByRole('button', { name: /^Remove / })
    const before = await removers.count()
    assert(before >= 1, '15 domain removed: no removable domain chips')
    const target = removers.first()
    const targetName = await accessibleControlName(target)
    await targetSize(target, `15 “${targetName}”`)
    await target.click()
    await twoAnimationFrames(page)
    assert(await removers.count() === before - 1, '15 domain removed: remove button count did not decrease')
    const survivingDomain = removers.first()
    assert(await survivingDomain.count() === 1, '15 domain removed: no surviving domain control to evidence the changed row')
    await survivingDomain.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await twoAnimationFrames(page)
    await capture(handle, '15-domain-removed', { top: false })
    const close = page.locator('#mission-editor-close')
    assert(await close.count() === 1, '15 discard: exact editor Close trigger missing')
    const promptValue = await page.locator('[data-mission-editor-state] textarea').first().inputValue()
    await close.click()
    const dialog = page.locator('[role="dialog"][aria-modal="true"]')
    await dialog.waitFor()
    assert(await dialog.count() === 1, '15 discard: expected one aria-modal discard dialog')
    const dialogText = (await dialog.innerText()).replace(/\s+/g, ' ')
    assert(dialogText.includes('Discard this mission draft?') && dialogText.includes(`“${promptValue}”`) && /unsaved edits/.test(dialogText), '15 discard: confirmation does not name the exact dirty draft')
    const keep = dialog.getByRole('button', { name: 'Keep editing', exact: true })
    const discard = dialog.getByRole('button', { name: 'Discard mission draft', exact: true })
    await assertDialogTrap(page, dialog, close, '15 dirty-draft discard', { close: false })
    await equalExit(keep, discard, '15 dirty-draft discard')
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
    const closeHandle = await close.elementHandle()
    assert(closeHandle, '15 discard: Close trigger handle unavailable')
    await page.waitForFunction(node => document.activeElement === node, closeHandle)
    assert(await close.evaluate(node => document.activeElement === node), '15 discard: Escape did not restore the exact Close trigger')
    await close.click()
    await dialog.waitFor()
    await page.waitForFunction(() => {
      const modal = document.querySelector('[role="dialog"][aria-modal="true"]')
      return Boolean(modal && modal.contains(document.activeElement))
    })
    await dialog.getByRole('button', { name: 'Discard mission draft', exact: true }).click()
    await page.waitForURL(url => url.origin === baseOrigin && url.pathname === '/screens/13')
    assert(new URL(page.url()).origin === baseOrigin, '15 discard: dirty-draft exit left the configured origin')
  })

  await runCase({ name: '15-reorder-moved', id: '15', state: 'default', rootAttribute: 'data-mission-editor-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const moveDownControls = page.getByRole('button', { name: /^Move down —/i })
    const order = async () => moveDownControls.evaluateAll(nodes => nodes.map(node => (node.getAttribute('aria-label') ?? '').replace(/^Move down —\s*/i, '').replace(/\s*\(unavailable.*$/i, '')))
    const beforeOrder = await order()
    const mover = moveDownControls.first()
    assert(await mover.count() === 1, '15 reorder: Move down control missing')
    assert(await mover.isEnabled(), '15 reorder: first Move down control is not operable')
    const movedAction = beforeOrder[0]
    const statusBefore = await liveStatusText(page)
    await mover.click()
    await waitStatusChange(page, statusBefore, '15 reorder')
    const afterOrder = await order()
    assert(afterOrder.length === beforeOrder.length && JSON.stringify(afterOrder) !== JSON.stringify(beforeOrder), `15 reorder: action order did not change (${beforeOrder.join(' > ')})`)
    assert(afterOrder[1] === movedAction && beforeOrder[1] === afterOrder[0], `15 reorder: ${movedAction} did not move exactly one row down (${afterOrder.join(' > ')})`)
    const movedRow = page.getByText(movedAction, { exact: true }).first()
    await movedRow.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await twoAnimationFrames(page)
    await capture(handle, '15-reorder-moved', { top: false })
  })

  await stateCapture('15', 'default', {
    name: '15-enlarged-bottom',
    textScale: 1.25,
    top: false,
    beforeCapture: async ({ page }) => {
      const scrollEvidence = await page.locator('[data-testid="phone-frame"]').evaluate(phone => {
        const nodes = [phone, ...phone.querySelectorAll('*')]
        for (const node of nodes) {
          if ('scrollTop' in node) node.scrollTop = 0
          if ('scrollLeft' in node) node.scrollLeft = 0
        }
        const content = phone.querySelector('[data-testid="screen-content"]')
        if (!content) return { content: null, displacedAncestors: ['screen-content missing'] }
        content.scrollTop = content.scrollHeight
        const contentRect = content.getBoundingClientRect()
        const phoneRect = phone.getBoundingClientRect()
        const displacedAncestors = nodes
          .filter(node => node !== content && 'scrollTop' in node && (Math.abs(node.scrollTop) > 0.5 || Math.abs(node.scrollLeft) > 0.5))
          .map(node => `${node.tagName.toLowerCase()}.${String(node.className).split(/\s+/).slice(0, 3).join('.')}:${node.scrollTop}/${node.scrollLeft}`)
        return {
          content: {
            top: content.scrollTop,
            clientHeight: content.clientHeight,
            scrollHeight: content.scrollHeight,
            atBottom: content.scrollTop + content.clientHeight >= content.scrollHeight - 1,
            frameTop: contentRect.top - phoneRect.top,
            frameBottom: phoneRect.bottom - contentRect.bottom,
          },
          displacedAncestors,
        }
      })
      assert(scrollEvidence.content?.top > 0 && scrollEvidence.content.atBottom, `15 enlarged: authored screen-content did not reach its bottom (${JSON.stringify(scrollEvidence.content)})`)
      assert(scrollEvidence.displacedAncestors.length === 0, `15 enlarged: outer phone/shell scrollers were displaced (${scrollEvidence.displacedAncestors.join(' | ')})`)
      assert(scrollEvidence.content.frameTop >= -1 && scrollEvidence.content.frameBottom >= -1, `15 enlarged: screen-content escaped the phone after scroll (${JSON.stringify(scrollEvidence.content)})`)
      await twoAnimationFrames(page)
      for (const [locator, label] of [
        [page.getByRole('group', { name: 'Unit', exact: true }), 'Unit group'],
        [page.getByRole('group', { name: 'Strictness', exact: true }), 'Strictness group'],
        [page.getByText('Mission preview', { exact: true }), 'XP mission preview'],
        [page.getByRole('link', { name: 'Source', exact: true }), 'Source data control'],
        [page.getByText(/default mission editor fixture loaded\./i), 'editor status'],
      ]) {
        assert(await locator.count() === 1, `15 enlarged: ${label} missing from the bottom composition`)
        await fullyVisibleInPhone(page, locator, `15 enlarged ${label}`)
      }
      const cta = page.getByRole('button', { name: /create|save/i }).last()
      assert(await cta.count() === 1, '15 enlarged: primary CTA missing at 125%')
      await fullyVisibleInPhone(page, cta, '15 enlarged CTA')
    },
  })

  // ——— S41 — Schedule / Calendar ———
  for (const state of SCREEN_CONTRACTS['41'].states) {
    await stateCapture('41', state, {
      top: state !== 'overpacked',
      beforeCapture: state === 'overpacked' ? async ({ page }) => {
        const marker = page.getByText(/A full one|protect some recovery|13h 45m/i).first()
        assert(await marker.count() === 1, '41 overpacked: no visible state-specific capacity/recovery marker')
        await marker.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }))
        await twoAnimationFrames(page)
        await fullyVisibleInPhone(page, marker, '41 overpacked marker')
      } : undefined,
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-schedule-state]')
        const rootText = (await root.innerText()).replace(/\s+/g, ' ')
        if (state === 'default') {
          const marked = page.locator('[data-current-event], [data-now-next]').first()
          const timeline = (await marked.count()) > 0 ? marked : page.getByText(/\bNow\b/).first()
          assert(await timeline.count() >= 1, '41 default: current/next timeline region not found')
          await withinFirstViewport(page, timeline, '41 default timeline')
          pass('S41 first-viewport timeline', { locator: (await marked.count()) > 0 ? 'data attribute' : 'Now text' })
          const bothFigures = /2h\s?15m/.test(rootText) && /4h\s?30m/.test(rootText)
          if (bothFigures) {
            assert(/scheduled focus/i.test(rootText) && /(waking window|includes routines)/i.test(rootText), '41 default: the two time figures are not labelled with their populations')
          }
          pass('S41 population labelling', { bothFiguresPresent: bothFigures })
        }
        if (state === 'cold-start') {
          assert(await root.locator('[data-current-event], [data-now-next]').count() === 0, '41 cold-start: synced/current schedule population remains')
          assert(!/Team sync|1:1 with Aisha|2h\s?15m|4h\s?30m/.test(rootText), '41 cold-start: synced identities or borrowed summaries remain')
          const connect = page.getByRole('button', { name: /connect google calendar/i })
          const notNow = page.getByRole('button', { name: /not now/i })
          assert(await connect.count() === 1, '41 cold-start: consent-first connect action missing')
          assert(await notNow.count() === 1, '41 cold-start: non-coercive Not now exit missing')
          const [connectBox, notNowBox, connectClass, notNowClass] = await Promise.all([
            connect.boundingBox(),
            notNow.boundingBox(),
            connect.getAttribute('class'),
            notNow.getAttribute('class'),
          ])
          assert(connectBox && notNowBox && Math.abs(connectBox.width - notNowBox.width) <= 4 && Math.abs(connectBox.height - notNowBox.height) <= 4, '41 cold-start: Connect and Not now do not have equivalent geometry')
          const actionVariant = value => {
            if (/hifi-action-primary/.test(value ?? '')) return 'primary'
            if (/hifi-action-(?:danger|destructive)/.test(value ?? '')) return 'destructive'
            if (/hifi-action-success/.test(value ?? '')) return 'success'
            if (/glass-pill/.test(value ?? '')) return 'secondary'
            if (/hifi-action/.test(value ?? '')) return 'ghost'
            return null
          }
          assert(actionVariant(connectClass) && actionVariant(connectClass) === actionVariant(notNowClass), `41 cold-start: Connect and Not now use coercively unequal action variants (${actionVariant(connectClass)} vs ${actionVariant(notNowClass)})`)
          pass('S41 consent choice parity', { variant: actionVariant(connectClass), width: connectBox.width, height: connectBox.height })
        }
        if (state === 'revoked') {
          assert(/revoked/i.test(rootText), '41 revoked: calendar-access-revoked truth missing')
          assert(await root.locator('[data-current-event]').count() === 0, '41 revoked: synced current event remains')
          assert(await root.getByText('Team sync', { exact: true }).count() === 0 && await root.getByText('1:1 with Aisha', { exact: true }).count() === 0, '41 revoked: synced calendar identities remain')
          assert(!/2h\s?15m|4h\s?30m/.test(rootText), '41 revoked: borrowed synced schedule summaries remain')
          assert(/No synced events — calendar access was revoked/.test(rootText) && /Nothing synced — reconnect your calendar/.test(rootText) && /Honest-null/.test(rootText), '41 revoked: explicit revoked honest-null panels missing')
          assert(/Deep work block/.test(rootText) && /Read 10 pages/.test(rootText) && /2 items/.test(rootText), '41 revoked: manual unscheduled tasks did not survive revocation')
          assert(await liveStatusText(page) === 'Calendar access revoked. Synced events are hidden; your manual tasks stay.', '41 revoked: exact trust outcome was not announced')
        }
        if (state === 'stale-offline') assert(/last sync|stale|offline/i.test(rootText), '41 stale-offline: last-sync truth missing')
      },
    })
  }

  await runCase({ name: '41-day-selected', id: '41', state: 'default', rootAttribute: 'data-schedule-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await assertDomainRegistryTruth(page, '41-day-selected')
    const day = page.getByRole('group', { name: 'Week strip' }).getByRole('button', { pressed: false }).first()
    assert(await day.count() === 1, '41 day: no unselected date-strip day button found')
    const selectedName = (await accessibleControlName(day)).replace(/^View\s+/i, '').replace(/, has completed actions$/i, '')
    const dayElement = await day.elementHandle()
    assert(dayElement, '41 day: day button handle unavailable')
    const statusBefore = await liveStatusText(page)
    await day.click()
    await twoAnimationFrames(page)
    assert(await dayElement.evaluate(node => node.getAttribute('aria-pressed')) === 'true', '41 day: selected day did not become aria-pressed')
    const statusAfter = await liveStatusText(page)
    assert(statusAfter !== statusBefore && /viewing/i.test(statusAfter), '41 day: “Viewing <day>” announcement missing')
    const panel = page.locator('[data-schedule-population]')
    assert(await panel.getAttribute('data-schedule-population') === 'day', '41 day: population marker did not remain Day')
    const panelText = (await panel.innerText()).replace(/\s+/g, ' ')
    assert(panelText.includes(`No fixture events for ${selectedName}`), `41 day: selected ${selectedName} did not render an honest-null day population`)
    assert(!/Team sync|Lunch walk|1:1 with Aisha/.test(panelText), `41 day: Thursday fixture events leaked into ${selectedName}`)
    const summary = page.locator('[data-schedule-summary-population]')
    assert((await summary.getAttribute('data-schedule-summary-population'))?.startsWith('empty-'), `41 day: ${selectedName} retained a populated schedule summary`)
    const selectedRootText = (await page.locator('[data-schedule-state]').innerText()).replace(/\s+/g, ' ')
    assert(!/2h\s?15m|4h\s?30m/.test(selectedRootText), `41 day: Thursday-derived scheduled/fullness figures leaked into ${selectedName}`)
    assert(/No CIA suggestion/.test(selectedRootText), `41 day: ${selectedName} retained a CIA suggestion without source population`)
    await capture(handle, '41-day-selected')

    const week = page.getByRole('tab', { name: 'Week', exact: true })
    await week.click()
    await twoAnimationFrames(page)
    assert(await week.getAttribute('aria-selected') === 'true' && await panel.getAttribute('data-schedule-population') === 'week', '41 Week: selected tab and rendered population disagree')
    assert(await panel.getByRole('heading', { name: 'Week of May 4', exact: true }).count() === 1, '41 Week: week-specific content marker missing')
    const weekText = (await panel.innerText()).replace(/\s+/g, ' ')
    assert(/Thursday, May 7/.test(weekText) && (/every other/i.test(weekText) || /Monday.?Wednesday and Friday.?Sunday have no fixture events/i.test(weekText)), '41 Week: explicit populated and honest-null weekday populations missing')
    assert(await summary.getAttribute('data-schedule-summary-population') === 'week-not-aggregated', '41 Week: borrowed daily metrics remain outside the week panel')

    const month = page.getByRole('tab', { name: 'Month', exact: true })
    await month.click()
    await twoAnimationFrames(page)
    assert(await month.getAttribute('aria-selected') === 'true' && await panel.getAttribute('data-schedule-population') === 'month', '41 Month: selected tab and rendered population disagree')
    assert(await panel.getByRole('heading', { name: 'May 2026', exact: true }).count() === 1, '41 Month: month-specific content marker missing')
    const monthText = (await panel.innerText()).replace(/\s+/g, ' ')
    assert(/May 7 · populated date/.test(monthText) && /Every other May date is honest-null/i.test(monthText), '41 Month: month population is not independently and truthfully rendered')
    assert(await summary.getAttribute('data-schedule-summary-population') === 'month-not-aggregated', '41 Month: borrowed daily metrics remain outside the month panel')
    pass('S41 view populations', { day: selectedName, week: 'Week of May 4', month: 'May 2026' })
  })

  await stateCapture('41', 'default', { name: '41-enlarged-default', textScale: 1.25 })

  // ——— S44 — Water Intake ———
  for (const state of SCREEN_CONTRACTS['44'].states) {
    await stateCapture('44', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-water-state]')
        const rootText = (await root.innerText()).replace(/\s+/g, ' ')
        if (state === 'default') {
          const remove = page.getByRole('button', { name: /^Delete\b/ }).first()
          assert(await remove.count() >= 1, '44 default: visible delete affordance missing')
          assert(await remove.isVisible(), '44 default: delete affordance is not visible without hover')
          const opacity = await effectiveOpacity(remove)
          assert(opacity >= 0.99, `44 default: delete affordance effective opacity ${opacity.toFixed(2)} needs hover to reach full visibility`)
          await targetSize(remove, '44 delete affordance')
          const weeklyChart = page.locator('[role="img"][aria-label*="Weekly water intake"]')
          assert(await weeklyChart.count() === 1, '44 default: weekly chart accessible summary missing')
          const chartLabel = await weeklyChart.getAttribute('aria-label') ?? ''
          const gapCopy = (await root.locator('p').filter({ hasText: /gap|no entr(?:y|ies)|no log/i }).allInnerTexts()).join(' ')
          const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          const labelledDay = weekdays.find(day => new RegExp(day, 'i').test(chartLabel))
          assert(labelledDay && new RegExp(labelledDay, 'i').test(gapCopy), `44 default: chart labels ${labelledDay ?? 'no day'} as the gap but visible copy disagrees (${gapCopy})`)
          pass('S44 delete affordance contract', { opacity })
        }
        if (state === 'empty') {
          assert(await root.getByRole('button', { name: /^Delete\b/ }).count() === 0, '44 empty: populated water log rows remain')
          assert(await root.locator('[role="img"][aria-label*="Weekly water intake"]').count() === 0, '44 empty: populated weekly chart remains')
          assert(await root.locator('[role="img"][aria-label="To target 0%"]').count() === 1, '44 empty: hydration ring is not an honest-null 0% ghost')
          assert(/8 to go/.test(rootText) && /0 of 8 glasses/.test(rootText) && /0 ml/.test(rootText) && /0% of daily target/.test(rootText) && /0 entries/.test(rootText), '44 empty: zero hydration/log roll-up missing')
          assert(/Your drinks will appear here\./.test(rootText) && /Log water to see your week\./.test(rootText) && /Your hydration streak starts today\./.test(rootText), '44 empty: structural honest-null guidance missing')
          assert(await root.getByText('—', { exact: true }).count() === 3, '44 empty: Streak/Average/Best are not all honest-null')
          assert(await root.getByText('CIA note', { exact: true }).count() === 0 && await root.getByText('All-time', { exact: true }).count() === 0, '44 empty: populated CIA or all-time context remains')
          assert(await liveStatusText(page) === 'Nothing logged yet — building capacity. Your drinks will appear here.', '44 empty: exact honest-null outcome was not announced')
        }
        if (state === 'offline') assert(/queued|offline/i.test(rootText), '44 offline: local queue truth missing')
        if (state === 'error') assert(/retry|failed|didn/i.test(rootText), '44 error: sync-failed truth missing')
        if (state === 'success') assert(/8/.test(rootText) && /(target|reached|goal|complete|done)/i.test(rootText), '44 success: target-reached outcome missing')
      },
    })
  }

  await runCase({ name: '44-delete-confirm', id: '44', state: 'default', rootAttribute: 'data-water-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const remove = page.getByRole('button', { name: /^Delete\b/ }).first()
    assert(await remove.count() === 1, '44 delete: delete affordance missing')
    const removeName = await accessibleControlName(remove)
    const quantity = removeName.match(/\d+(?:\.\d+)?\s?(?:ml|oz|l)\b/i)?.[0]
    assert(quantity, `44 delete: affordance name “${removeName}” does not name an exact quantity target`)
    await remove.click()
    const scope = await confirmScope(page, '44 delete confirmation')
    assert(await scope.getAttribute('aria-modal') === 'true', '44 delete: confirmation must be an aria-modal dialog')
    await assertDialogTrap(page, scope, remove, '44 delete confirmation', { close: false })
    const scopeText = (await scope.innerText()).replace(/\s+/g, ' ')
    assert(scopeText.includes(quantity), `44 delete: confirmation does not name the exact target ${quantity}`)
    const cancel = scope.getByRole('button', { name: 'Cancel', exact: true })
    const destroy = scope.getByRole('button', { name: /delete/i }).last()
    await equalExit(cancel, destroy, '44 delete confirmation')
    await capture(handle, '44-delete-confirm', { top: false })
    await page.keyboard.press('Escape')
    await scope.waitFor({ state: 'hidden' })
    await twoAnimationFrames(page)
    assert(await remove.evaluate(node => document.activeElement === node), '44 delete: Escape did not restore the exact delete trigger')
  })

  await runCase({ name: '44-delete-undone', id: '44', state: 'default', rootAttribute: 'data-water-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const remove = page.getByRole('button', { name: /^Delete\b/ }).first()
    const removeName = await accessibleControlName(remove)
    const before = await page.getByRole('button', { name: removeName, exact: true }).count()
    await remove.click()
    const scope = await confirmScope(page, '44 delete undo flow')
    await scope.getByRole('button', { name: /delete/i }).last().click()
    await page.waitForFunction(({ name, expected }) => {
      const buttons = [...document.querySelectorAll('button')]
      return buttons.filter(node => (node.getAttribute('aria-label') ?? node.textContent ?? '').replace(/\s+/g, ' ').trim() === name).length < expected
    }, { name: removeName, expected: before })
    const undo = page.getByRole('button', { name: /undo/i }).first()
    assert(await undo.count() === 1, '44 delete: undo affordance missing after delete')
    await page.waitForFunction(() => {
      const phone = document.querySelector('[data-testid="phone-frame"]')
      const active = document.activeElement
      if (!(phone instanceof HTMLElement) || !(active instanceof HTMLButtonElement) || !phone.contains(active)) return false
      return (active.getAttribute('aria-label') ?? active.textContent ?? '').replace(/\s+/g, ' ').trim() === 'Undo delete'
    })
    assert(await undo.evaluate(node => document.activeElement === node), '44 delete: confirming deletion did not focus the surviving Undo action')
    await undo.click()
    await page.waitForFunction(({ name, expected }) => {
      const buttons = [...document.querySelectorAll('button')]
      return buttons.filter(node => (node.getAttribute('aria-label') ?? node.textContent ?? '').replace(/\s+/g, ' ').trim() === name).length === expected
    }, { name: removeName, expected: before })
    await twoAnimationFrames(page)
    pass('S44 delete undo restores', { target: removeName })
    await capture(handle, '44-delete-undone', { top: false })
  })

  await runCase({ name: '44-quick-add', id: '44', state: 'default', rootAttribute: 'data-water-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const quickAdd = page.getByRole('button', { name: /^(?!delete).*250\s?ml/i }).first()
    assert(await quickAdd.count() === 1, '44 quick add: 250 ml quick-log control missing')
    const statusBefore = await liveStatusText(page)
    const root = page.locator('[data-water-state]')
    const deleteButtons = root.getByRole('button', { name: /^Delete\b/ })
    const deleteCountBefore = await deleteButtons.count()
    const rootTextBefore = (await root.innerText()).replace(/\s+/g, ' ')
    await quickAdd.click()
    await waitStatusChange(page, statusBefore, '44 quick add')
    const deleteCountAfter = await deleteButtons.count()
    const rootTextAfter = (await root.innerText()).replace(/\s+/g, ' ')
    assert(deleteCountAfter === deleteCountBefore + 1, `44 quick add: visible log entry count changed by ${deleteCountAfter - deleteCountBefore}; expected exactly one`)
    assert(await root.getByText('Just now', { exact: true }).count() === 1, '44 quick add: the new visible log row is missing its “Just now” timestamp')
    assert(rootTextAfter !== rootTextBefore && /1500 ml/.test(rootTextAfter), '44 quick add: visible hydration total did not advance to 1500 ml')
    await capture(handle, '44-quick-add')
  })

  // ——— S45 — Daily Check-in ———
  for (const state of SCREEN_CONTRACTS['45'].states) {
    await stateCapture('45', state, {
      top: state !== 'error',
      beforeCapture: state === 'error' ? async ({ page }) => {
        const error = page.getByText(/Couldn.t save your check-in/i).first()
        assert(await error.count() === 1, '45 error: visible save-failure heading missing')
        await error.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }))
        await twoAnimationFrames(page)
        await fullyVisibleInPhone(page, error, '45 error message')
      } : undefined,
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-checkin-state]')
        const rootText = (await root.innerText()).replace(/\s+/g, ' ')
        if (state !== 'skeleton') {
          assert(await page.locator('[data-cia-state]').count() === 1, `45 ${state}: expected exactly one CIA orb`)
        }
        if (state !== 'skeleton' && state !== 'success') {
          const sliders = root.locator('input[type="range"]')
          assert(await sliders.count() === 2, `45 ${state}: expected exactly two native range sliders`)
          assert(await root.getByRole('slider').count() === 2, `45 ${state}: native ranges do not expose exactly two slider semantics`)
          const sliderProof = await sliders.evaluateAll(nodes => nodes.map(node => ({
            tag: node.tagName,
            type: node.getAttribute('type') ?? '',
            name: node.getAttribute('aria-label') ?? '',
            min: Number(node.getAttribute('min')),
            max: Number(node.getAttribute('max')),
            value: Number(node.value),
            valueText: node.getAttribute('aria-valuetext') ?? '',
            describedBy: node.getAttribute('aria-describedby') ?? '',
          })))
          assert(sliderProof.map(entry => entry.name).sort().join('|') === 'Energy|Stress', `45 ${state}: native range names are not exactly Energy and Stress`)
          for (const slider of sliderProof) {
            assert(slider.tag === 'INPUT' && slider.type === 'range', `45 ${state}: ${slider.name} is not an input[type=range]`)
            assert(Number.isFinite(slider.min) && Number.isFinite(slider.max) && Number.isFinite(slider.value), `45 ${state}: ${slider.name} range has non-numeric min/max/value`)
            assert(slider.min === 1 && slider.max === 10 && slider.value >= slider.min && slider.value <= slider.max, `45 ${state}: ${slider.name} range must use the exact 1–10 scale with an in-bounds value`)
            assert(slider.valueText.trim().length > 0, `45 ${state}: ${slider.name} range has no aria-valuetext`)
            if (state === 'empty') {
              assert(slider.valueText === `${slider.name} not set. Slide to choose a value from 1 to 10.`, `45 empty: ${slider.name} does not expose honest-null value text`)
              assert(slider.describedBy === `${slider.name.toLowerCase()}-unset-prompt`, `45 empty: ${slider.name} does not point to its visible unset prompt`)
            } else {
              const expectedValue = slider.name === 'Energy' ? 7 : 4
              assert(slider.value === expectedValue && slider.valueText === `${expectedValue} out of 10`, `45 ${state}: ${slider.name} DOM value and value text disagree with ${expectedValue}`)
              assert(slider.describedBy === '', `45 ${state}: populated ${slider.name} incorrectly retains an unset description`)
            }
          }
          if (state === 'empty') {
            assert(await root.getByText('Not set', { exact: true }).count() === 2, '45 empty: both visible slider readouts must say Not set')
            assert(await root.locator('[data-slider-fill]').count() === 0, '45 empty: null sliders render a misleading value fill')
          } else {
            assert(await root.locator('[data-slider-fill]').count() === 2, `45 ${state}: populated sliders are missing visible fills`)
          }
        }
        if (state === 'default') {
          assert(await page.locator('[role="group"][aria-label="Data controls"]').count() >= 1, '45 default: ConsentRail missing')
          assert(await page.getByRole('button', { name: /not now/i }).count() >= 1, '45 default: native Not now dismiss missing')
          pass('S45 single orb + consent', { orbs: 1 })
          const cancel = page.getByRole('link', { name: /cancel check-in and return to today/i })
          assert(await cancel.count() === 1, '45 default: same-origin Cancel link exit missing')
          await cancel.click()
          await page.waitForURL(url => url.origin === baseOrigin && url.pathname === '/screens/12')
          assert(new URL(page.url()).origin === baseOrigin, '45 Cancel left the configured origin')
        }
        if (state === 'empty') {
          const moods = page.getByRole('button', { name: /^Mood:/i })
          assert(await moods.count() === 5, '45 empty: expected five native mood choices')
          const selectedMoods = await moods.evaluateAll(nodes => nodes.filter(node => node.getAttribute('aria-pressed') === 'true').length)
          assert(selectedMoods === 0, `45 empty: ${selectedMoods} mood choices are fabricated as selected`)
          const selectedContexts = page.locator('main button[aria-pressed="true"]').filter({ hasText: new RegExp(REGISTRY_DOMAINS.join('|')) })
          assert(await selectedContexts.count() === 0, '45 empty: a context domain is fabricated as selected')
          assert(await root.getByText(/^You logged$/i).count() === 0, '45 empty: direct-input provenance renders before any input')
          assert(/Slide to set energy/i.test(rootText) && /Slide to set stress/i.test(rootText), '45 empty: energy/stress honest-null prompts missing')
          const save = page.getByRole('button', { name: /save/i }).last()
          assert(await save.isDisabled(), '45 empty: Save must stay disabled before a mood is selected')
        }
        if (state === 'invalid') {
          const save = page.getByRole('button', { name: /save/i }).last()
          assert(await save.count() === 1, '45 invalid: Save action missing')
          assert(await save.isDisabled(), '45 invalid: Save must be disabled without a mood')
          const describedBy = await save.getAttribute('aria-describedby')
          const reason = describedBy
            ? await page.evaluate(ids => ids.split(/\s+/).map(id => document.getElementById(id)?.textContent?.trim() ?? '').join(' ').trim(), describedBy)
            : ''
          assert(reason.length > 0 || (/mood/i.test(rootText) && /(select|choose|pick|required)/i.test(rootText)), '45 invalid: disabled Save has no visible reason')
          pass('S45 invalid gating', { reason: reason.slice(0, 120) })
        }
        if (state === 'offline') assert(/saved locally|syncs later|offline/i.test(rootText), '45 offline: local-save truth missing')
        if (state === 'error') {
          assert(/retry|try again|failed|didn|couldn/i.test(rootText), '45 error: save-failed truth missing')
          const retry = page.getByRole('button', { name: /try again|retry/i }).first()
          assert(await retry.count() === 1, '45 error: retry action missing')
          await retry.click()
          await waitAttribute(page, '[data-checkin-state]', 'data-checkin-state', 'success')
          const transitionedText = (await page.locator('[data-checkin-state]').innerText()).replace(/\s+/g, ' ')
          assert(!/Couldn.t save your check-in/i.test(transitionedText) && /saved/i.test(transitionedText), '45 error retry: error and success remain visible together')
        }
      },
    })
  }

  await runCase({ name: '45-context-added', id: '45', state: 'default', rootAttribute: 'data-checkin-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const context = page.locator('main button[aria-pressed="false"]').filter({ hasText: new RegExp(REGISTRY_DOMAINS.join('|')) }).first()
    assert(await context.count() === 1, '45 context: no unpressed registry-domain context toggle found')
    const contextElement = await context.elementHandle()
    assert(contextElement, '45 context: toggle handle unavailable')
    await context.click()
    await twoAnimationFrames(page)
    assert(await contextElement.evaluate(node => node.getAttribute('aria-pressed')) === 'true', '45 context: domain toggle did not press')
    await capture(handle, '45-context-added')
  })

  await runCase({ name: '45-dismissed', id: '45', state: 'default', rootAttribute: 'data-checkin-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const notNow = page.getByRole('button', { name: /not now/i }).first()
    assert(await notNow.count() === 1, '45 dismissed: Not now control missing')
    const statusBefore = await liveStatusText(page)
    await notNow.click()
    await waitStatusChange(page, statusBefore, '45 dismissed')
    assert(/dismissed/i.test(await liveStatusText(page)), '45 dismissed: dismissal outcome not announced')
    const undo = page.getByRole('button', { name: /undo/i }).first()
    assert(await undo.count() === 1, '45 dismissed: undo affordance missing')
    await undo.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await twoAnimationFrames(page)
    await capture(handle, '45-dismissed', { top: false })
  })

  // ——— S59 — Streak Details (FINAL file; exact selectors) ———
  for (const state of SCREEN_CONTRACTS['59'].states) {
    await stateCapture('59', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-streak-state]')
        const rootText = (await root.innerText()).replace(/\s+/g, ' ')
        if (state === 'default') {
          assert(await root.getAttribute('data-freeze-flow') === 'idle', '59 default: freeze flow must start idle')
          const gauge = page.locator('[role="img"][aria-label="Current XP multiplier 2.0x"]')
          assert(await gauge.count() === 1, '59 default: gauge must announce 2.0x at a 42-day streak (RPG_SYSTEM_DESIGN.md:982)')
          // Scope the multiplier/recovery truth to the multiplier grid section so
          // the allowed milestone “Unlocks at 60 days” row stays out of scope.
          const sectionText = (await gauge.evaluate(node => node.closest('section')?.parentElement?.innerText ?? '')).replace(/\s+/g, ' ')
          assert(/Max multiplier/.test(sectionText) && /reached at 30 days/.test(sectionText), '59 default: capped-at-30-days multiplier copy missing')
          assert(/1\.3x/.test(sectionText) && /deliberate rest/i.test(sectionText), '59 default: recovery 1.3x deliberate-rest language missing')
          assert(/capped at 2\.0x total/i.test(sectionText), '59 default: recovery cap language missing')
          assert(!/Unlocks at/i.test(sectionText), '59 default: multiplier/recovery card still renders lock/unlock framing')
          assert(!/\b50 days\b/.test(sectionText) && !/\b60 days\b/.test(sectionText), '59 default: multiplier-next context claims a nonexistent 50/60-day tier')
          assert(!/Unlocks at 50 days/.test(rootText) && !/\b50 days\b/.test(rootText), '59 default: “Unlocks at 50 days” fiction rendered')
          assert(/Unlocks at 60 days/.test(rootText), '59 default: milestone progression treatment (Unlocks at 60 days) missing')
          assert(/Via rewards rules/i.test(rootText), '59 default: recovery rule provenance missing')
          pass('S59 RPG multiplier truth', { gauge: '2.0x at 42 days', recovery: '1.3x capped 2.0x total' })
        }
        if (state === 'empty') {
          assert(await page.locator('[role="img"][aria-label="Current XP multiplier 1.0x"]').count() === 1, '59 empty: day-0 gauge must announce 1.0x')
          assert(/Next 1\.5x at 7 days/.test(rootText), '59 empty: next-tier truth missing at day 0')
          assert(await root.getByText(/^1\.3x$/i).count() === 0, '59 empty: active recovery 1.3x renders before deliberate-rest eligibility')
        }
        if (state === 'offline') {
          const freeze = page.getByRole('button', { name: /use freeze|freeze active/i }).first()
          assert(await freeze.isDisabled(), '59 offline: freeze must be disabled offline')
          assert(/Freeze needs a connection/i.test(rootText), '59 offline: visible disabled reason missing')
        }
        if (state === 'error') {
          const freeze = page.getByRole('button', { name: /use freeze|freeze active/i }).first()
          assert(await freeze.isDisabled(), '59 error: freeze must be disabled during sync failure')
          assert(/disabled while streak sync is failing/i.test(rootText), '59 error: visible disabled reason missing')
        }
        if (state === 'success') {
          assert(await root.getAttribute('data-freeze-flow') === 'used', '59 success: fixture must render the freeze-used flow')
          assert(/1 available/.test(rootText), '59 success: remaining freeze balance missing')
          assert(await page.getByRole('button', { name: /undo freeze/i }).count() === 1, '59 success: freeze undo affordance missing')
        }
      },
    })
  }

  await runCase({ name: '59-freeze-confirm', id: '59', state: 'default', rootAttribute: 'data-streak-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Use freeze', exact: true })
    assert(await trigger.count() === 1, '59 freeze: Use freeze trigger missing')
    await trigger.click()
    await waitAttribute(page, '[data-freeze-flow]', 'data-freeze-flow', 'confirming')
    const dialog = page.getByRole('dialog', { name: /use a freeze tonight/i })
    await assertDialogTrap(page, dialog, trigger, '59 freeze confirmation', { close: false })
    const dialogText = (await dialog.innerText()).replace(/\s+/g, ' ')
    assert(/protects tonight only/i.test(dialogText) && /42-day streak continues/i.test(dialogText), '59 freeze: confirmation does not name the exact effect')
    assert(/2 freezes available/i.test(dialogText) && /earned monthly/i.test(dialogText), '59 freeze: eligibility line missing')
    await capture(handle, '59-freeze-confirm')
    await page.keyboard.press('Escape')
    await waitAttribute(page, '[data-freeze-flow]', 'data-freeze-flow', 'idle')
    assert(await trigger.evaluate(node => document.activeElement === node), '59 freeze: Escape did not restore trigger focus')
  })

  await runCase({ name: '59-freeze-used', id: '59', state: 'default', rootAttribute: 'data-streak-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await page.getByRole('button', { name: 'Use freeze', exact: true }).click()
    await waitAttribute(page, '[data-freeze-flow]', 'data-freeze-flow', 'confirming')
    await page.getByRole('button', { name: /^Confirm/ }).click()
    await waitAttribute(page, '[data-freeze-flow]', 'data-freeze-flow', 'used')
    assert(await page.getByRole('button', { name: /Day 28, tonight, protected with a freeze/i }).count() === 1, '59 freeze used: tonight’s calendar day does not show the freeze')
    const rootText = (await page.locator('[data-streak-state]').innerText()).replace(/\s+/g, ' ')
    assert(/1 available/.test(rootText), '59 freeze used: balance did not drop to 1')
    assert(/Freeze set for tonight/i.test(rootText), '59 freeze used: local outcome copy missing')
    assert(await page.getByRole('button', { name: /undo freeze/i }).count() === 1, '59 freeze used: undo affordance missing')
    await auditFixture(handle)
    await capture(handle, '59-freeze-used')
  })

  await runCase({ name: '59-freeze-undone', id: '59', state: 'default', rootAttribute: 'data-streak-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await page.getByRole('button', { name: 'Use freeze', exact: true }).click()
    await waitAttribute(page, '[data-freeze-flow]', 'data-freeze-flow', 'confirming')
    await page.getByRole('button', { name: /^Confirm/ }).click()
    await waitAttribute(page, '[data-freeze-flow]', 'data-freeze-flow', 'used')
    await page.getByRole('button', { name: /undo freeze/i }).click()
    await waitAttribute(page, '[data-freeze-flow]', 'data-freeze-flow', 'undone')
    assert(await page.getByRole('button', { name: /Day 28, tonight, protected with a freeze/i }).count() === 0, '59 freeze undone: tonight still shows a freeze')
    const rootText = (await page.locator('[data-streak-state]').innerText()).replace(/\s+/g, ' ')
    assert(/2 available/.test(rootText), '59 freeze undone: balance did not return to 2')
    assert(/returned|unprotected/i.test(rootText), '59 freeze undone: undo outcome copy missing')
    await auditFixture(handle)
    await capture(handle, '59-freeze-undone')
  })

  // ——— S61 — Reminders & Tasks (FINAL file; exact selectors) ———
  for (const state of SCREEN_CONTRACTS['61'].states) {
    await stateCapture('61', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-reminders-state]')
        const rootText = (await root.innerText()).replace(/\s+/g, ' ')
        if (state === 'default') {
          assert(await page.locator('main input[type="checkbox"]').count() === 4, '61 default: expected four native task checkboxes')
          const switches = page.locator('main button[role="switch"]')
          const totalSwitches = await switches.count()
          const onSwitches = await switches.evaluateAll(nodes => nodes.filter(node => node.getAttribute('aria-checked') === 'true').length)
          const rollup = rootText.match(/(\d+) of (\d+) on/)
          assert(rollup, '61 default: reminder roll-up “N of M on” missing')
          assert(Number(rollup[1]) === onSwitches && Number(rollup[2]) === totalSwitches, `61 default: roll-up ${rollup[0]} does not equal rendered switches (${onSwitches}/${totalSwitches})`)
          assert(rollup[0] === '3 of 4 on', `61 default: expected the 3-of-4 fixture, found ${rollup[0]}`)
          const doneTitle = page.locator('main [class*="line-through"]').first()
          assert(await doneTitle.count() === 1, '61 default: completed task title missing')
          const doneOpacity = await effectiveOpacity(doneTitle)
          assert(doneOpacity >= 0.99, `61 default: completed row stacks container opacity (${doneOpacity.toFixed(2)})`)
          const doneContrast = await effectiveContrast(doneTitle)
          assert(doneContrast >= 4.5, `61 default: completed task title contrast ${doneContrast.toFixed(2)} is below 4.5`)
          pass('S61 completed contrast + roll-up truth', { doneContrast, rollup: rollup[0] })
        }
        if (state === 'success') {
          assert(/All 9 done today/i.test(rootText), '61 success: all-done celebration missing')
          const progressTone = await root.evaluate(node => {
            const fill = [...node.querySelectorAll('div')].find(element => element.style.width === '100%' && /h-full/.test(String(element.className)) && /h-2/.test(String(element.parentElement?.className)))
            return String(fill?.className ?? '')
          })
          assert(/bg-forest-green/.test(progressTone) && !/bg-brand-orange/.test(progressTone), `61 success: 100% progress bar is not canonical done/green (${progressTone})`)
        }
        if (state === 'empty') {
          assert(await root.getByRole('checkbox').count() === 0, '61 empty: populated task checkboxes remain')
          assert(await root.getByRole('switch').count() === 0, '61 empty: populated reminder switches remain')
          assert(await root.getByRole('button', { name: 'Book lab follow-up, tomorrow, unscheduled', exact: true }).count() === 0, '61 empty: populated upcoming task remains')
          assert(await root.getByRole('heading', { name: 'No tasks for today yet', exact: true }).count() === 1, '61 empty: exact task honest-null heading missing')
          assert(/Your execution board is empty\./.test(rootText) && /No active reminders yet\./.test(rootText), '61 empty: visible task/reminder honest-null copy missing')
          assert(await root.getByRole('button', { name: 'New task', exact: true }).count() === 1 && await root.getByRole('button', { name: 'Ask CIA', exact: true }).count() === 1, '61 empty: bounded empty-state recovery actions missing')
          assert(!/\d+ of \d+ done|\d+ of \d+ on|Active reminders|Upcoming|Completed today/.test(rootText), '61 empty: populated task/reminder roll-up or section remains')
          assert(/No tasks or reminders yet in this fixture/.test(await liveStatusText(page)), '61 empty: honest-null outcome is not announced')
        }
        if (state === 'error') assert(await page.getByRole('button', { name: 'Retry', exact: true }).count() === 1, '61 error: Retry missing')
        if (state === 'offline') {
          const label = page.locator('label').filter({ has: page.locator('input[aria-label="12:45, Walk after lunch, not done"]') })
          assert(await label.count() === 1, '61 offline: Walk after lunch checkbox missing')
          await label.click()
          await page.waitForFunction(() => Boolean(document.querySelector('input[aria-label="12:45, Walk after lunch, queued, saving when online"]')))
          assert(/queued locally/i.test(await liveStatusText(page)), '61 offline: queued-locally truth missing')
        }
      },
    })
  }

  await runCase({ name: '61-task-toggled', id: '61', state: 'default', rootAttribute: 'data-reminders-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await assertDomainRegistryTruth(page, '61-task-toggled')
    const label = page.locator('label').filter({ has: page.locator('input[aria-label="12:45, Walk after lunch, not done"]') })
    assert(await label.count() === 1, '61 task: open Walk after lunch checkbox missing')
    await label.click()
    await page.waitForFunction(() => Boolean(document.querySelector('input[aria-label="12:45, Walk after lunch, done"]')))
    await twoAnimationFrames(page)
    const checkbox = page.getByRole('checkbox', { name: '12:45, Walk after lunch, done', exact: true })
    assert(await checkbox.isChecked(), '61 task: completed checkbox is not checked')
    assert(/marked done/i.test(await liveStatusText(page)) && /undo/i.test(await liveStatusText(page)), '61 task: done outcome with undo path missing')
    assert(await page.getByText(/7 of 9 done/).count() >= 1, '61 task: roll-up did not advance to 7 of 9')
    await capture(handle, '61-task-toggled')
  })

  await runCase({ name: '61-task-undone', id: '61', state: 'default', rootAttribute: 'data-reminders-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const label = page.locator('label').filter({ has: page.locator('input[aria-label="12:45, Walk after lunch, not done"]') })
    await label.click()
    await page.waitForFunction(() => Boolean(document.querySelector('input[aria-label="12:45, Walk after lunch, done"]')))
    const doneLabel = page.locator('label').filter({ has: page.locator('input[aria-label="12:45, Walk after lunch, done"]') })
    await doneLabel.click()
    await page.waitForFunction(() => Boolean(document.querySelector('input[aria-label="12:45, Walk after lunch, not done"]')))
    await twoAnimationFrames(page)
    assert(!(await page.getByRole('checkbox', { name: '12:45, Walk after lunch, not done', exact: true }).isChecked()), '61 undo: reopened checkbox is still checked')
    assert(/reopened/i.test(await liveStatusText(page)), '61 undo: reopened outcome missing')
    assert(await page.getByText(/6 of 9 done/).count() >= 1, '61 undo: roll-up did not return to 6 of 9')
    await auditFixture(handle)
    await capture(handle, '61-task-undone')
  })

  await runCase({ name: '61-reminder-toggled', id: '61', state: 'default', rootAttribute: 'data-reminders-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const hydration = page.getByRole('switch', { name: /Hydration reminder/ })
    assert(await hydration.count() === 1, '61 reminder: Hydration switch missing')
    assert(await hydration.getAttribute('aria-checked') === 'true', '61 reminder: Hydration must start on')
    await hydration.click()
    await twoAnimationFrames(page)
    const toggled = page.getByRole('switch', { name: /Hydration reminder/ })
    assert(await toggled.getAttribute('aria-checked') === 'false', '61 reminder: switch did not turn off')
    assert(await page.getByText(/2 of 4 on/).count() >= 1, '61 reminder: roll-up did not update to 2 of 4')
    assert(/turned off in this local preview/i.test(await liveStatusText(page)), '61 reminder: local-only toggle truth missing')
    await hydration.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await twoAnimationFrames(page)
    await capture(handle, '61-reminder-toggled', { top: false })
  })

  // ——— S73 — Mission Journal ———
  const assertJournalMediaHonesty = async (page, label) => {
    const audit = await page.locator('[data-testid="phone-frame"]').evaluate(phone => {
      const photoImgs = [...phone.querySelectorAll('img')].flatMap(img => {
        const alt = img.getAttribute('alt') ?? ''
        return /photo/i.test(alt) ? [alt] : []
      })
      const claimingLabels = [...phone.querySelectorAll('[aria-label]')].flatMap(node => {
        const value = node.getAttribute('aria-label') ?? ''
        if (!/photo/i.test(value)) return []
        return /hidden|private|placeholder|no photo|delete|hide|show/i.test(value) ? [] : [value]
      })
      const mainText = phone.querySelector('main')?.innerText ?? ''
      return { photoImgs, claimingLabels, mainText }
    })
    assert(audit.photoImgs.length === 0, `${label}: raster photo rendered despite honest-null disposition: ${audit.photoImgs.join(' | ')}`)
    assert(audit.claimingLabels.length === 0, `${label}: aria-label claims a visible photo where none renders: ${audit.claimingLabels.join(' | ')}`)
    const text = audit.mainText.replace(/\s+/g, ' ')
    assert(!(/Six weeks/.test(text) && /12 weeks ·/.test(text)), `${label}: contradictory Six weeks vs 12 weeks duration copy`)
    if (/photo/i.test(text)) assert(/hidden|private/i.test(text), `${label}: photo mention lacks the hidden/private truth`)
    return text
  }

  for (const state of SCREEN_CONTRACTS['73'].states) {
    await stateCapture('73', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-journal-state]')
        const rootText = (await root.innerText()).replace(/\s+/g, ' ')
        if (state !== 'skeleton') await assertJournalMediaHonesty(page, `73 ${state}`)
        if (state === 'default') {
          assert(await root.getByRole('article').count() === 3, '73 default: expected three identity-bearing journal entries')
          assert(/Via missions ledger/i.test(rootText) && /Via rewards ledger/i.test(rootText), '73 default: per-metric ledger sourcing missing')
          assert(/Product storage and sync are not represented in this local preview/i.test(rootText), '73 default: prototype does not disclose that product photo storage/sync is unrepresented')
          assert(!/photos stay private on your device/i.test(rootText), '73 default: unsupported device-only product storage guarantee rendered')
          assert(await root.locator('[role="tablist"], [role="tab"]').count() === 0, '73 default: filter buttons expose an incomplete ARIA tabs pattern')
          for (const name of ['All', 'By domain', 'By type']) {
            const filter = root.getByRole('button', { name, exact: true })
            assert(await filter.count() === 1 && ['true', 'false'].includes(await filter.getAttribute('aria-pressed')), `73 default: ${name} filter is not a native pressed button`)
          }
          pass('S73 media honesty + duration consistency', {})
        }
        if (state === 'empty') {
          assert(await root.getByRole('article').count() === 0, '73 empty: populated journal entries remain')
          assert(await root.locator('[aria-label^="Progress photos"]').count() === 0, '73 empty: populated media region remains')
          assert(await root.getByRole('group', { name: 'Filter journal entries', exact: true }).count() === 0, '73 empty: population filters remain despite no journal population')
          assert(await root.getByRole('heading', { name: 'No journal entries yet', exact: true }).count() === 1, '73 empty: exact honest-null heading missing')
          assert(/Complete or pivot a mission.*duration, XP, and your notes/i.test(rootText), '73 empty: honest-null journal guidance missing')
        }
        if (state === 'filtered-empty') {
          assert(await root.getByRole('article').count() === 0, '73 filtered-empty: nonmatching journal entries remain')
          assert(await root.locator('[aria-label^="Progress photos"]').count() === 0, '73 filtered-empty: nonmatching media region remains')
          const filters = root.getByRole('group', { name: 'Filter journal entries', exact: true })
          assert(await filters.count() === 1, '73 filtered-empty: journal filter group missing')
          assert(await filters.getByRole('button', { name: 'By domain', exact: true }).getAttribute('aria-pressed') === 'true', '73 filtered-empty: By domain mode is not pressed')
          const domains = root.getByRole('group', { name: 'Filter by domain', exact: true })
          assert(await domains.getByRole('button', { name: 'Sleep', exact: true }).getAttribute('aria-pressed') === 'true', '73 filtered-empty: Sleep filter is not pressed')
          assert(/No sleep entries yet/.test(rootText) && /Nothing in your journal matches this filter/.test(rootText), '73 filtered-empty: exact active-filter explanation missing')
          assert(await root.getByRole('button', { name: 'Clear filter', exact: true }).count() === 1, '73 filtered-empty: Clear filter recovery missing')
          assert(await root.getByText('May 2026', { exact: true }).count() === 0 && await root.getByText('April 2026', { exact: true }).count() === 0, '73 filtered-empty: populated month sections remain')
        }
        if (state === 'error') assert(/retry|failed|didn/i.test(rootText), '73 error: failure truth missing')
        if (state === 'offline') assert(/offline|cached/i.test(rootText), '73 offline: offline truth missing')
      },
    })
  }

  await runCase({ name: '73-media-hidden', id: '73', state: 'default', rootAttribute: 'data-journal-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const hide = page.getByRole('button', { name: /hide/i }).first()
    assert(await hide.count() === 1, '73 media: Hide control missing')
    const statusBefore = await liveStatusText(page)
    await hide.click()
    await waitStatusChange(page, statusBefore, '73 media hidden')
    assert(/hidden/i.test(await page.locator('[data-journal-state]').innerText()), '73 media: hidden-state truth missing')
    await assertJournalMediaHonesty(page, '73 media-hidden')
    const outcome = page.getByText(/photo hidden.*local preview/i).first()
    assert(await outcome.count() === 1, '73 media: visible hidden-photo outcome missing')
    const undo = page.getByRole('button', { name: /undo/i }).first()
    assert(await undo.count() === 1 && await undo.evaluate(node => document.activeElement === node), '73 media: removed Hide trigger did not hand focus to Undo')
    await outcome.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await twoAnimationFrames(page)
    await capture(handle, '73-media-hidden', { top: false })
  })

  await runCase({ name: '73-photo-delete-confirm', id: '73', state: 'default', rootAttribute: 'data-journal-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const remove = page.getByRole('button', { name: /delete.*(photo|week)/i }).first()
    assert(await remove.count() === 1, '73 photo delete: labelled delete control missing')
    await remove.click()
    const scope = await confirmScope(page, '73 photo delete confirmation')
    assert(await scope.getAttribute('aria-modal') === 'true', '73 photo delete: confirmation must be an aria-modal dialog')
    await assertDialogTrap(page, scope, remove, '73 photo delete confirmation', { close: false })
    const scopeText = (await scope.innerText()).replace(/\s+/g, ' ')
    assert(/week/i.test(scopeText) && /photo/i.test(scopeText), '73 photo delete: confirmation does not name the exact photo target')
    const cancel = scope.getByRole('button', { name: 'Cancel', exact: true })
    const destroy = scope.getByRole('button', { name: /delete/i }).last()
    await equalExit(cancel, destroy, '73 photo delete confirmation')
    await capture(handle, '73-photo-delete-confirm')
    await destroy.click()
    const undo = page.getByRole('button', { name: /undo/i }).first()
    await undo.waitFor()
    await twoAnimationFrames(page)
    assert(await undo.evaluate(node => document.activeElement === node), '73 photo delete: removed opener did not hand focus to Undo')
  })

  // ——— S97 — Plans Library ———
  const findPlanActionsTrigger = async page => {
    const buttons = page.locator('[data-testid="phone-frame"] button')
    for (let index = 0; index < await buttons.count(); index += 1) {
      const candidate = buttons.nth(index)
      if (!(await candidate.isVisible())) continue
      const name = await accessibleControlName(candidate)
      if (/strength reset/i.test(name) && /(action|option|menu|more)/i.test(name)) return { trigger: candidate, name, strength: true }
    }
    return null
  }

  const PLAN_ACTION_LABELS = ['Edit', 'Pause', 'Stop', 'Archive', 'Delete', 'Export', 'Share']

  for (const state of SCREEN_CONTRACTS['97'].states) {
    await stateCapture('97', state, {
      afterCapture: async ({ page }) => {
        const root = page.locator('[data-plans-state]')
        const rootText = (await root.innerText()).replace(/\s+/g, ' ')
        if (state === 'default') {
          assert(await root.locator('[role="tablist"], [role="tab"]').count() === 0, '97 default: filter buttons expose an incomplete ARIA tabs pattern')
          for (const name of ['All', 'Active', 'Completed', 'Paused']) {
            const filter = root.getByRole('button', { name, exact: true })
            assert(await filter.count() === 1 && ['true', 'false'].includes(await filter.getAttribute('aria-pressed')), `97 default: ${name} filter is not a native pressed button`)
          }
          const paywall = page.locator('.paywall-blur')
          assert(await paywall.count() === 1, '97 default: canonical PaywallLock (.paywall-blur) missing')
          const paywallSection = page.locator('section:has(> .paywall-blur)')
          assert(await paywallSection.count() === 1, '97 default: PaywallLock is not the kit section surface')
          const unlock = paywallSection.getByRole('button', { name: /unlock with premium/i })
          assert(await unlock.count() === 1 && await unlock.isEnabled(), '97 default: PaywallLock has no unique operable named unlock action')
          await targetSize(unlock, '97 PaywallLock action')
          assert(/hifi-action-primary/.test(await unlock.getAttribute('class') ?? ''), '97 default: PaywallLock unlock is not the canonical primary action')
          const notNow = paywallSection.getByRole('button', { name: /not now/i })
          assert(await notNow.count() === 1, '97 default: equal “Not now” exit missing')
          const containment = await paywallSection.evaluate(section => {
            const bounds = section.getBoundingClientRect()
            return [...section.querySelectorAll('button:not(:disabled), a[href]')].map(action => {
              const box = action.getBoundingClientRect()
              return { name: action.textContent?.trim() ?? '', top: box.top, right: box.right, bottom: box.bottom, left: box.left, contained: box.top >= bounds.top - 1 && box.left >= bounds.left - 1 && box.right <= bounds.right + 1 && box.bottom <= bounds.bottom + 1 }
            })
          })
          assert(containment.length >= 2 && containment.every(action => action.contained), `97 default: PaywallLock actions are clipped outside the section: ${JSON.stringify(containment)}`)
          assert(await page.getByRole('button', { name: /strength reset/i }).count() >= 1, '97 default: operable Strength reset plan row missing')
          pass('S97 canonical PaywallLock', { marker: '.paywall-blur' })
          const accept = root.getByRole('button', { name: 'Accept', exact: true })
          assert(await accept.count() === 1, '97 default: CIA adjustment Accept action missing')
          await accept.click()
          const acceptedUndo = root.getByRole('button', { name: /undo/i }).first()
          await acceptedUndo.waitFor()
          assert(/applied|accepted/i.test((await root.innerText()).replace(/\s+/g, ' ')), '97 adjustment: accepted outcome missing')
          await acceptedUndo.click()
          await root.getByRole('button', { name: 'Accept', exact: true }).waitFor()
          assert(/revert|undo/i.test(await liveStatusText(page)), '97 adjustment: undo did not announce the restored suggestion')
        }
        if (state === 'empty') {
          assert(await root.getByRole('region', { name: 'Plan shelf', exact: true }).count() === 0, '97 empty: populated plan shelf remains')
          assert(await root.locator('button[aria-label^="Plan actions for "]').count() === 0, '97 empty: populated plan action triggers remain')
          assert(await root.locator('.paywall-blur').count() === 0, '97 empty: locked populated template remains')
          assert(!/Run a half marathon|Strength reset|Evening wind-down/.test(rootText), '97 empty: populated hero or saved-plan identity remains')
          assert(await root.getByRole('heading', { name: 'No active plan yet', exact: true }).count() === 1, '97 empty: exact honest-null plan heading missing')
          assert(/Start from a mission you already track/.test(rootText) && /Ask CIA to draft your next mission/.test(rootText), '97 empty: bounded plan-start guidance missing')
          assert(await root.getByRole('button', { name: 'Draft with CIA', exact: true }).count() === 1, '97 empty: CIA draft recovery action missing')
          assert(/Empty plans fixture.*No active plan/.test(await liveStatusText(page)), '97 empty: honest-null plan outcome is not announced')
        }
        if (state === 'offline') assert(/offline|cached/i.test(rootText), '97 offline: offline truth missing')
        if (state === 'error') assert(/retry|failed|didn/i.test(rootText), '97 error: failure truth missing')
        if (state === 'success') assert(/undo/i.test(rootText), '97 success: local plan action outcome lacks undo')
      },
    })
  }

  await runCase({ name: '97-plan-actions', id: '97', state: 'default', rootAttribute: 'data-plans-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const found = await findPlanActionsTrigger(page)
    assert(found, '97 actions: per-plan overflow trigger missing')
    await found.trigger.click()
    await twoAnimationFrames(page)
    const dialog = page.locator('[role="dialog"]')
    assert(await dialog.count() === 1 && await dialog.getAttribute('aria-modal') === 'true', '97 actions: overflow must be one aria-modal dialog')
    const scope = dialog.first()
    await assertDialogTrap(page, scope, found.trigger, '97 plan actions menu', { close: false })
    const menuActionNames = await scope.getByRole('button').evaluateAll(nodes => nodes
      .map(node => (node.getAttribute('aria-label') ?? node.textContent ?? '').replace(/\s+/g, ' ').trim().replace(/\s*Confirms first$/i, ''))
      .filter(name => name !== 'Cancel'))
    const expectedActionNames = [...PLAN_ACTION_LABELS, 'Revoke CIA memory']
    assert(menuActionNames.length === 8 && new Set(menuActionNames).size === 8, `97 actions: expected 8 distinct action controls, found ${JSON.stringify(menuActionNames)}`)
    assert(expectedActionNames.every(name => menuActionNames.includes(name)) && menuActionNames.every(name => expectedActionNames.includes(name)), `97 actions: exact action set drifted (${menuActionNames.join(', ')})`)
    const actionControls = []
    for (const label of expectedActionNames) {
      const action = scope.getByRole('button', { name: new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s*Confirms first)?$`, 'i') })
      assert(await action.count() === 1, `97 actions: ${label} action missing from the overflow menu`)
      assert(await action.isEnabled(), `97 actions: ${label} is not enabled`)
      await targetSize(action, `97 actions ${label}`)
      const tabIndex = await action.evaluate(node => node.tabIndex)
      assert(tabIndex >= 0, `97 actions: ${label} is not keyboard reachable`)
      await action.focus()
      assert(await action.evaluate(node => document.activeElement === node), `97 actions: ${label} cannot receive focus`)
      actionControls.push(label)
    }
    pass('S97 overflow exposes all 8 actions', { trigger: found.name, strengthRow: found.strength, reachable: actionControls })
    await capture(handle, '97-plan-actions')
    await page.keyboard.press('Escape')
    await scope.waitFor({ state: 'hidden' })
    await twoAnimationFrames(page)
    assert(await found.trigger.evaluate(node => document.activeElement === node), '97 actions: Escape did not restore the exact plan-row trigger')
  })

  await runCase({ name: '97-archive-confirm', id: '97', state: 'default', rootAttribute: 'data-plans-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const found = await findPlanActionsTrigger(page)
    assert(found, '97 archive: per-plan overflow trigger missing')
    await found.trigger.click()
    await twoAnimationFrames(page)
    const menuDialog = page.locator('[role="dialog"]')
    const menuScope = (await menuDialog.count()) > 0 ? menuDialog.first() : page.locator('main')
    await menuScope.getByRole('button', { name: /\bArchive\b/i }).first().click()
    const scope = await confirmScope(page, '97 archive confirmation')
    assert(await scope.getAttribute('aria-modal') === 'true', '97 archive: confirmation must be an aria-modal dialog')
    await assertDialogTrap(page, scope, found.trigger, '97 archive confirmation', { close: false })
    const scopeText = (await scope.innerText()).replace(/\s+/g, ' ')
    assert(/archive/i.test(scopeText), '97 archive: confirmation does not name the archive action')
    if (found.strength) assert(/strength reset/i.test(scopeText), '97 archive: confirmation does not name the exact plan')
    const cancel = scope.getByRole('button', { name: 'Cancel', exact: true })
    const archive = scope.getByRole('button', { name: /\bArchive\b/i }).last()
    await equalExit(cancel, archive, '97 archive confirmation')
    await capture(handle, '97-archive-confirm')
    await archive.click()
    const undo = page.getByRole('button', { name: /undo.*strength reset.*archived/i })
    await undo.waitFor()
    await twoAnimationFrames(page)
    assert(await undo.evaluate(node => document.activeElement === node), '97 archive: removed plan-row opener did not hand focus to the surviving Undo action')
    assert(/archived/i.test(await liveStatusText(page)), '97 archive: completion was not announced')
  })

  await stateCapture('97', 'default', {
    name: '97-enlarged-default',
    textScale: 1.25,
    top: false,
    beforeCapture: async ({ page }) => {
      const section = page.locator('section:has(> .paywall-blur)')
      const unlock = section.getByRole('button', { name: /unlock with premium/i })
      const notNow = section.getByRole('button', { name: /not now/i })
      assert(await section.count() === 1 && await unlock.count() === 1 && await notNow.count() === 1, '97 enlarged: complete PaywallLock action set missing')
      await notNow.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }))
      await twoAnimationFrames(page)
      await fullyVisibleInPhone(page, unlock, '97 enlarged Paywall unlock')
      await fullyVisibleInPhone(page, notNow, '97 enlarged Paywall Not now')
      const containment = await section.evaluate(node => {
        const bounds = node.getBoundingClientRect()
        return [...node.querySelectorAll('button:not(:disabled), a[href]')].every(action => {
          const box = action.getBoundingClientRect()
          return box.top >= bounds.top - 1 && box.left >= bounds.left - 1 && box.right <= bounds.right + 1 && box.bottom <= bounds.bottom + 1
        })
      })
      assert(containment, '97 enlarged: 125% PaywallLock actions clip outside their section')
      pass('S97 125% PaywallLock in-view', { actions: ['Unlock with premium', 'Not now'] })
    },
  })

  // Assertion-only text-enlargement matrix. The frozen screenshot manifest
  // remains exactly 89 files; these eleven fresh contexts prove that every C1
  // screen's fixed-pixel text actually grows by 125% and remains operable.
  for (const id of TEXT_SCALE_IDS) {
    const contract = SCREEN_CONTRACTS[id]
    await runCase({
      name: `${id}-text-scale-proof`,
      id,
      state: contract ? 'default' : null,
      rootAttribute: contract?.root ?? null,
      rootState: contract ? 'default' : null,
      textScale: 1.25,
    }, async handle => {
      await auditFixture(handle, { strictLive: id !== '12' })
      if (DOMAIN_TRUTH_IDS.has(id)) await assertDomainRegistryTruth(handle.page, `${id}-text-scale-proof`)
      pass(`C1 125% text matrix ${id}`, { scale: 1.25, screenshot: false })
    })
  }

  // ——— Closeout: atomic evidence, integrity, capability boundary ———
  screenshotEvidence = await validateStagedScreenshots()
  assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.map(item => `${item.case}:${item.text}`).join(' | ')}`)
  assert(pageErrors.length === 0, `Page errors: ${pageErrors.map(item => `${item.case}:${item.text}`).join(' | ')}`)
  assertCapabilityContract()
  fingerprintsEnd = fingerprintAll()
  assert(sameFingerprint(fingerprintsStart, fingerprintsEnd), 'Product/API/authority fingerprint drifted during verification')
  const s12End = fingerprintsEnd.product.files.find(file => file.path === S12_FILE)
  assert(s12End?.sha256 === S12_SENTINEL_SHA256, 'S12 sentinel drifted during verification')
  assert(visitedNonces.size === caseEvidence.length && caseEvidence.length === EXPECTED_CONTEXTS, `Expected ${EXPECTED_CONTEXTS} isolated contexts/nonces (89 captures + 11 text-scale proofs), found ${caseEvidence.length}/${visitedNonces.size}`)
  promotionBackupDir = promoteScreenshots()
  pass('atomic screenshot set', { count: screenshotEvidence.length, dimensions: '390x844', hashes: screenshotEvidence.length, promotedAfterPass: true })
  pass('source integrity', { product: fingerprintsEnd.product.digest, api: fingerprintsEnd.api.digest, authority: fingerprintsEnd.authority.digest })
  pass('S12 sentinel byte-identical', { file: S12_FILE, sha256: S12_SENTINEL_SHA256 })
  pass('capability boundary', { forbidden: 0, total: capabilityEvents.length })
  writeReport(buildReport('pass'))
  fs.rmSync(promotionBackupDir, { recursive: true, force: true })
  promotionBackupDir = null
} catch (error) {
  if (promotionBackupDir && fs.existsSync(promotionBackupDir)) {
    fs.rmSync(shotsDir, { recursive: true, force: true })
    fs.renameSync(promotionBackupDir, shotsDir)
    promotionBackupDir = null
  }
  try {
    const staged = fs.readdirSync(tempShotsDir).filter(file => file.endsWith('.png')).sort()
    screenshotEvidence = staged.map(file => ({ file, ...pngGeometry(path.join(tempShotsDir, file)) }))
  } catch { /* Preserve the primary failure. */ }
  writeReport(buildReport('fail', error), 'error')
  process.exitCode = 1
} finally {
  if (browser) await browser.close()
  fs.rmSync(tempShotsDir, { recursive: true, force: true })
}
