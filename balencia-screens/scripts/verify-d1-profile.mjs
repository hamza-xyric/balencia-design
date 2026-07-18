// verify-d1-profile.mjs — hardened D1 profile/settings acceptance verifier
//
// VISUAL-008-D1-profile-settings-core: screens 17,18,21,22,23,24,25,50.
// Contract: frozen 91 canonical 390x844 PNGs + 8 screenshot-free 125%
// text proofs, fresh isolated contexts/nonces, pass-atomic promotion, fresh
// production binding on local :3002, source/authority/accepted-sentinel
// integrity, zero console/page/capability/storage events, WCAG interaction
// checks, focus-trapped overlays, and screen-specific truth assertions.

import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const USAGE = 'Usage: node scripts/verify-d1-profile.mjs <baseURL> <out-json> <shots-dir>'
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
const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || ''
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const PRODUCT_FILES = [
  'src/components/hifi/screens/profile/S17MeMain.tsx',
  'src/components/hifi/screens/profile/S18Explore.tsx',
  'src/components/hifi/screens/profile/S21Settings.tsx',
  'src/components/hifi/screens/profile/S22ConnectedServices.tsx',
  'src/components/hifi/screens/profile/S23SubscriptionBilling.tsx',
  'src/components/hifi/screens/profile/S24NotificationHistory.tsx',
  'src/components/hifi/screens/profile/S25HelpCenter.tsx',
  'src/components/hifi/screens/profile/S50ProfileEdit.tsx',
  'src/components/hifi/screens/profile/index.ts',
]

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
  'src/components/hifi/kit/core.ts',
  'src/components/hifi/kit/data.tsx',
  'src/components/hifi/kit/glass-pill-input.tsx',
  'src/components/hifi/kit/index.ts',
  'src/components/hifi/kit/paywall.tsx',
  'src/components/hifi/kit/signature-icons.tsx',
  'src/components/hifi/kit/surfaces.tsx',
  'src/components/hifi/kit/system.tsx',
  'src/components/hifi/screens/registry.ts',
  'src/components/layout/PhoneFrame.tsx',
  'src/components/layout/ScreenShell.tsx',
  'src/data/hifi/persona.ts',
  'src/data/screens.ts',
  'src/app/screens/[id]/page.tsx',
  'scripts/verify-d1-profile.mjs',
]

const AUTHORITY_FILES = [
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/audit/D1-profile-settings-core.md',
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/DECISIONS.md',
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/REFERENCE-DIRECTION.md',
  '../Balencia-New-Screens/canon/COMPACT-CANON.md',
  '../Balencia-New-Screens/canon/COMPONENT-CATALOG.md',
  '../Balencia-New-Screens/hifi-screens/17-me-main.md',
  '../Balencia-New-Screens/hifi-screens/18-explore-section.md',
  '../Balencia-New-Screens/hifi-screens/21-settings.md',
  '../Balencia-New-Screens/hifi-screens/22-connected-services.md',
  '../Balencia-New-Screens/hifi-screens/23-subscription-billing.md',
  '../Balencia-New-Screens/hifi-screens/24-notification-history.md',
  '../Balencia-New-Screens/hifi-screens/25-help-center.md',
  '../Balencia-New-Screens/hifi-screens/50-profile-edit.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/BATCH.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/VERIFICATION-MATRIX.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/BEFORE-SOURCE.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/BEFORE-CAPTURE-MANIFEST.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/ACCEPTED-SENTINELS-BEFORE.sha256',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/ASSET-DISPOSITION.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/recon-a.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/recon-b.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/recon-c.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/builder-a.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/builder-b.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/builder-c.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/builder-d.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/builder-common.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/builder-a.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/builder-b.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/builder-c.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/builder-d.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/reviewer-clear.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/reviewer-design-source.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/reviewer-a11y-trust.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/review-clear.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/review-design-source.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/review-a11y-trust.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/reviewer-runtime-delta-clear.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/reviewer-runtime-delta-design-source.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/workers/reviewer-runtime-delta-a11y-trust.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/review-runtime-delta-clear.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/review-runtime-delta-design-source.md',
  '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/review-runtime-delta-a11y-trust.md',
]

const ACCEPTED_SENTINEL_MANIFEST = path.resolve(projectRoot, '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/ACCEPTED-SENTINELS-BEFORE.sha256')
const ACCEPTED_ROWS = fs.readFileSync(ACCEPTED_SENTINEL_MANIFEST, 'utf8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'))
const ACCEPTED_EXPECTED = new Map(ACCEPTED_ROWS.map(line => {
  const match = line.match(/^([a-f0-9]{64})\s+balencia-screens\/(.+)$/)
  assert(match, `Invalid accepted-sentinel manifest line: ${line}`)
  return [match[2], match[1]]
}))
const ACCEPTED_SENTINEL_FILES = [...ACCEPTED_EXPECTED.keys()]
assert(ACCEPTED_SENTINEL_FILES.length === 39, `Accepted-sentinel manifest has ${ACCEPTED_SENTINEL_FILES.length} files; expected 39`)

const parsedBaseURL = new URL(baseURL)
assert(parsedBaseURL.protocol === 'http:' && ['localhost', '127.0.0.1', '::1'].includes(parsedBaseURL.hostname) && parsedBaseURL.port === '3002', `D1 verification is production-only on local :3002; received ${baseURL}`)
const NEXT_BUILD_ID_FILE = path.join(projectRoot, '.next/BUILD_ID')
assert(fs.existsSync(NEXT_BUILD_ID_FILE), 'Fresh production proof missing: .next/BUILD_ID does not exist')
const LOCAL_BUILD_ID = fs.readFileSync(NEXT_BUILD_ID_FILE, 'utf8').trim()
assert(LOCAL_BUILD_ID.length > 0, 'Fresh production proof missing: .next/BUILD_ID is empty')
const BUILD_BOUND_FILES = [...new Set([...PRODUCT_FILES, ...API_FILES.filter(file => file !== 'scripts/verify-d1-profile.mjs')])]

const SCREEN_CONTRACTS = {
  '17': { root: 'data-me-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'success', 'disabled'] },
  '18': { root: 'data-explore-state', states: ['default', 'partial', 'empty', 'error', 'offline', 'locked'] },
  '21': { root: 'data-settings-state', states: ['default', 'skeleton', 'partial', 'saving', 'error', 'offline', 'success'] },
  '22': { root: 'data-services-state', states: ['default', 'skeleton', 'unconnected', 'error', 'offline', 'success', 'disabled'] },
  '23': { root: 'data-billing-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'success', 'disabled', 'payment-final-day', 'payment-post-grace'] },
  '24': { root: 'data-notifications-state', states: ['default', 'skeleton', 'empty', 'sparse', 'error', 'offline', 'success', 'disabled'] },
  '25': { root: 'data-help-state', states: ['default', 'skeleton', 'empty', 'error', 'offline', 'success'] },
  '50': { root: 'data-profile-state', states: ['default', 'partial', 'skeleton', 'error', 'offline', 'success', 'invalid'] },
}

const EXPECTED_SCREENSHOTS = [
  '17-default.png', '17-skeleton.png', '17-empty.png', '17-error.png', '17-offline.png', '17-success.png', '17-disabled.png', '17-data-controls.png', '17-avatar-consent.png',
  '18-default.png', '18-partial.png', '18-empty.png', '18-error.png', '18-offline.png', '18-locked.png', '18-search-results.png', '18-search-empty.png', '18-paywall-locks.png', '18-data-controls.png',
  '21-default.png', '21-skeleton.png', '21-partial.png', '21-saving.png', '21-error.png', '21-offline.png', '21-success.png', '21-hardware-unsupported.png', '21-password-modal.png', '21-data-controls.png', '21-notifications-toggled.png',
  '22-default.png', '22-skeleton.png', '22-unconnected.png', '22-error.png', '22-offline.png', '22-success.png', '22-disabled.png', '22-provider-controls.png', '22-connect-consent.png', '22-disconnect-confirm.png', '22-reduced-motion.png',
  '23-default.png', '23-skeleton.png', '23-empty.png', '23-error.png', '23-offline.png', '23-success.png', '23-disabled.png', '23-payment-final-day.png', '23-payment-post-grace.png', '23-compare-table.png', '23-cancel-confirm.png', '23-update-payment.png', '23-reduced-motion.png',
  '24-default.png', '24-skeleton.png', '24-empty.png', '24-sparse.png', '24-error.png', '24-offline.png', '24-success.png', '24-disabled.png', '24-filter-cia.png', '24-row-menu.png', '24-controls.png', '24-mark-read-undone.png', '24-reduced-motion.png',
  '25-default.png', '25-skeleton.png', '25-empty.png', '25-error.png', '25-offline.png', '25-success.png', '25-search-results.png', '25-search-empty.png', '25-cia-consent.png', '25-contact-no-ticket.png', '25-article.png',
  '50-default.png', '50-partial.png', '50-skeleton.png', '50-error.png', '50-offline.png', '50-success.png', '50-invalid.png', '50-dirty-valid.png', '50-dirty-invalid.png', '50-photo-consent.png', '50-unsaved-exit.png', '50-delete-confirm.png', '50-enlarged-bottom.png',
]
const EXPECTED_SET = new Set(EXPECTED_SCREENSHOTS)
const EXPECTED_COUNT = 91
const TEXT_SCALE_IDS = ['17', '18', '21', '22', '23', '24', '25', '50']
const EXPECTED_CONTEXTS = 99

const DISTINCT_FROM_DEFAULT = [
  ...Object.entries(SCREEN_CONTRACTS).flatMap(([id, contract]) => contract.states.filter(state => state !== 'default').map(state => [`${id}-${state}.png`, `${id}-default.png`])),
  ['17-data-controls.png', '17-default.png'], ['17-avatar-consent.png', '17-default.png'],
  ['18-search-results.png', '18-default.png'], ['18-search-empty.png', '18-default.png'], ['18-paywall-locks.png', '18-default.png'], ['18-data-controls.png', '18-default.png'],
  ['21-hardware-unsupported.png', '21-default.png'], ['21-password-modal.png', '21-default.png'], ['21-data-controls.png', '21-default.png'], ['21-notifications-toggled.png', '21-default.png'],
  ['22-provider-controls.png', '22-default.png'], ['22-connect-consent.png', '22-default.png'], ['22-disconnect-confirm.png', '22-default.png'],
  ['23-compare-table.png', '23-default.png'], ['23-cancel-confirm.png', '23-default.png'], ['23-update-payment.png', '23-default.png'],
  ['24-filter-cia.png', '24-default.png'], ['24-row-menu.png', '24-default.png'], ['24-controls.png', '24-default.png'],
  ['25-search-results.png', '25-default.png'], ['25-search-empty.png', '25-default.png'], ['25-cia-consent.png', '25-default.png'], ['25-contact-no-ticket.png', '25-default.png'], ['25-article.png', '25-default.png'],
  ['50-dirty-valid.png', '50-default.png'], ['50-dirty-invalid.png', '50-default.png'], ['50-photo-consent.png', '50-default.png'], ['50-unsaved-exit.png', '50-default.png'], ['50-delete-confirm.png', '50-default.png'], ['50-enlarged-bottom.png', '50-default.png'],
]

const ALLOWED_SUBSTATES = {
  '17': { 'data-me-panel': ['closed', 'data-controls', 'avatar-consent'] },
  '18': {
    'data-search-state': ['idle', 'results', 'empty'],
    'data-radar-state': ['real', 'partial', 'null'],
    'data-explore-panel': ['closed', 'data-controls', 'module'],
  },
  '21': {
    'data-hardware-state': ['supported', 'unsupported'],
    'data-settings-panel': ['closed', 'password', 'data-controls'],
  },
  '22': {
    'data-provider-status': ['connected', 'pending', 'unconnected', 'error', 'disabled'],
    'data-services-panel': ['closed', 'controls', 'connect', 'disconnect'],
  },
  '23': { 'data-billing-panel': ['closed', 'compare', 'cancel', 'update', 'credits'] },
  '24': {
    'data-notification-filter': ['all', 'cia', 'reminders', 'social'],
    'data-period': ['7d'],
    'data-notifications-panel': ['closed', 'row-menu', 'controls'],
  },
  '25': {
    'data-search-state': ['idle', 'results', 'empty'],
    'data-help-panel': ['closed', 'cia-consent', 'contact', 'article'],
    'data-handoff-context': ['none', 'query-only'],
    'data-ticket-state': ['none', 'local-preview'],
  },
  '50': {
    'data-form-dirty': ['true', 'false'],
    'data-form-valid': ['true', 'false'],
    'data-photo-consent': ['unknown', 'declined', 'accepted', 'revoked'],
    'data-profile-panel': ['closed', 'photo-consent', 'picker-preview', 'discard', 'delete', 'demographic'],
  },
}

const REGISTRY_DOMAINS = ['Fitness', 'Sleep', 'Career', 'Nutrition', 'Finance', 'Faith', 'Productivity', 'Relationships', 'Wellbeing', 'Meditation']
const DOMAIN_TRUTH_IDS = new Set()

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

assert(EXPECTED_SCREENSHOTS.length === EXPECTED_COUNT, `Verifier contract declares ${EXPECTED_SCREENSHOTS.length} screenshots; expected ${EXPECTED_COUNT}`)
assert(EXPECTED_SET.size === EXPECTED_COUNT, `Verifier screenshot names are not unique (${EXPECTED_SET.size}/${EXPECTED_COUNT})`)
for (const [id, contract] of Object.entries(SCREEN_CONTRACTS)) {
  assert(new Set(contract.states).size === contract.states.length, `${id}: duplicate exact fixture state`)
  for (const state of contract.states) assert(EXPECTED_SET.has(`${id}-${state}.png`), `${id}: exact fixture ${state} has no canonical screenshot`)
}

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
    accepted: fingerprint(ACCEPTED_SENTINEL_FILES),
  }
}

function sameFingerprint(start, end) {
  return start.product.digest === end.product.digest
    && start.api.digest === end.api.digest
    && start.authority.digest === end.authority.digest
    && start.accepted.digest === end.accepted.digest
}

async function assertFreshProductionBuild() {
  const buildStat = fs.statSync(NEXT_BUILD_ID_FILE)
  const newestSource = BUILD_BOUND_FILES
    .map(relativePath => ({ path: relativePath, mtimeMs: fs.statSync(path.resolve(projectRoot, relativePath)).mtimeMs }))
    .sort((a, b) => b.mtimeMs - a.mtimeMs)[0]
  assert(buildStat.mtimeMs + 1 >= newestSource.mtimeMs, `Fresh production proof failed: ${newestSource.path} is newer than .next/BUILD_ID`)
  const proofURL = new URL('/screens/17', baseURL)
  proofURL.searchParams.set('__d1build', LOCAL_BUILD_ID)
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
const tempShotsDir = fs.mkdtempSync(path.join(path.dirname(shotsDir), `.${path.basename(shotsDir)}.d1-${process.pid}-`))

const fingerprintsStart = fingerprintAll()
for (const entry of fingerprintsStart.accepted.files) {
  assert(entry.sha256 === ACCEPTED_EXPECTED.get(entry.path), `Accepted sentinel ${entry.path} is ${entry.sha256}; expected ${ACCEPTED_EXPECTED.get(entry.path)}`)
}
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
  await context.exposeBinding('__d1RecordCapability', (_source, type, detail) => {
    recordCapability(caseName, type, detail)
  })

  await context.addInitScript(({ origin }) => {
    const record = (type, detail = '') => {
      try { void window.__d1RecordCapability(type, String(detail)) } catch { /* Node guards remain active. */ }
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
          return 'blob:d1-blocked'
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
      candidate.element.dataset.d1BaseFontSize = String(candidate.base)
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
    const nodes = [...phone.querySelectorAll('[data-d1-base-font-size]')]
    const ratios = nodes.map(node => Number.parseFloat(getComputedStyle(node).fontSize) / Number.parseFloat(node.dataset.d1BaseFontSize || '0'))
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

async function beginCase({ name, id, state = null, rootAttribute = null, rootState = state, reducedMotion = 'reduce', textScale = 1, query = {} }) {
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
  for (const [key, value] of Object.entries(query)) target.searchParams.set(key, String(value))
  const nonce = String(++navigationNonce)
  assert(!visitedNonces.has(nonce), `${name}: navigation nonce reused`)
  visitedNonces.add(nonce)
  target.searchParams.set('__d1audit', nonce)
  assert(target.origin === baseOrigin, `${name}: case target is not same-origin`)
  await page.goto(target.toString(), { waitUntil: 'networkidle' })
  const finalURL = new URL(page.url())
  assert(finalURL.origin === baseOrigin, `${name}: case left configured origin`)
  assert(finalURL.pathname === `/screens/${id}`, `${name}: unexpected fixture path ${finalURL.pathname}`)
  assert(finalURL.searchParams.get('__d1audit') === nonce, `${name}: audit nonce was not retained`)
  if (state !== null) assert(finalURL.searchParams.get('state') === state, `${name}: exact state query was not retained`)
  for (const [key, value] of Object.entries(query)) assert(finalURL.searchParams.get(key) === String(value), `${name}: exact ${key} query was not retained`)
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
  return { name, id, state, rootAttribute, rootState, reducedMotion, textScale, query, context, page, cdp, nonce }
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
    const dialog = document.querySelector('[role="dialog"][aria-modal="true"], [role="alertdialog"][aria-modal="true"]')
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
  const persistentModalCount = await page.locator('[role="dialog"][aria-modal="true"]:visible, [role="alertdialog"][aria-modal="true"]:visible').count()
  const faux = await page.locator('[data-testid="phone-frame"] [role="button"], [data-testid="phone-frame"] [role="link"], [data-testid="phone-frame"] [role="tab"], [data-testid="phone-frame"] [role="checkbox"], [data-testid="phone-frame"] [role="switch"], [data-testid="phone-frame"] [role="slider"]').evaluateAll(nodes => nodes.flatMap(node => {
    if (node.closest('[aria-hidden="true"], [inert]')) return []
    const role = node.getAttribute('role')
    const native = role === 'link'
      ? node.tagName === 'A' && node.hasAttribute('href')
      : role === 'checkbox'
        ? node.tagName === 'INPUT' && node.getAttribute('type') === 'checkbox'
        : role === 'switch'
          ? (node.tagName === 'BUTTON' || (node.tagName === 'INPUT' && node.getAttribute('type') === 'checkbox'))
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
      const modal = document.querySelector('[role="dialog"][aria-modal="true"], [role="alertdialog"][aria-modal="true"]')
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
      await page.locator('[role="dialog"][aria-modal="true"], [role="alertdialog"][aria-modal="true"]').waitFor({ state: 'hidden' })
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
  if (persistentModalCount === 0) {
    await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur() })
  }
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
  const coachTokens = text.match(/\bcia\b/gi) ?? []
  assert(coachTokens.every(token => token === 'CIA'), `${label}: visible coach token is not all-caps CIA (${coachTokens.join(', ')})`)
  assert(!/\bSIA\b/.test(text), `${label}: retired SIA token rendered`)
  assert(!/\bGoals?\b/.test(text), `${label}: retired Goal wording rendered; use Mission or Target`)
  const forbidden = [
    /Route:\s*\//i,
    /\/calendar\/connected/i,
    /(?:purchase|subscription cancellation|ticket|export|deletion|sync|connection) (?:was )?(?:completed|submitted|created) (?:on|with|to) (?:the )?(?:provider|server|cloud)/i,
    /(?:synced|saved|uploaded|deleted) (?:to|from) (?:the )?(?:server|cloud|provider)/i,
    /photo (?:was )?(?:selected|uploaded)/i,
    /Face ID (?:was )?enabled on (?:this|the) device/i,
    /notifications (?:were )?enabled on (?:this|the) device/i,
    /(?:called|texted|notified|contacted) (?:your )?(?:support|emergency contact|provider)/i,
  ]
  const hit = forbidden.find(pattern => pattern.test(text))
  assert(!hit, `${label}: false/exposed capability claim matched ${hit}`)
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
  const main = page.locator('[data-testid="phone-frame"] main')
  const accessibleLabels = await main.locator('[aria-label]').evaluateAll(nodes => nodes.map(node => node.getAttribute('aria-label') ?? '').join(' '))
  const fixtureText = `${status} ${await main.innerText()} ${accessibleLabels}`.replace(/\s+/g, ' ')
  const signatures = {
    skeleton: /load|skeleton/i,
    empty: /empty|no |nothing|first|honest|null|not enough/i,
    partial: /partial|estimated|limited|cached|low confidence|not configured|honest-null|day one|2 of 8/i,
    error: /fail|couldn|could\s+not|didn|did\s+not|retry|error/i,
    offline: /offline|cached|last sync/i,
    success: /success|saved|complete|updated|connected|read|prepared/i,
    invalid: /invalid|required|enter|unchanged|missing/i,
    disabled: /disabled|unavailable|not available|coming soon/i,
    saving: /saving|working|updating|applying/i,
    unconnected: /not connected|will sync|connect/i,
    locked: /locked|premium|plan-gated|entitlement/i,
    sparse: /sparse|building|not enough/i,
    'payment-final-day': /final day|1 day|today/i,
    'payment-post-grace': /post.grace|paused|expired/i,
  }
  const signature = signatures[state]
  if (signature) assert(signature.test(fixtureText), `${label}: ${state} fixture signature is missing (${fixtureText})`)

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
  const semanticFloor = 12
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
    const liveCount = await live.count()
    assert(liveCount <= 2, `${name}: expected no more than two scoped atomic polite live sources, found ${liveCount}`)
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
  assert(EXPECTED_SET.has(fileName), `${handle.name}: ${fileName} is outside the canonical D1 set`)
  assert(!captured.has(fileName), `${handle.name}: duplicate screenshot ${fileName}`)
  if (handle.reducedMotion === 'reduce') await assertReducedMotion(handle.page, screenshotName)
  const phone = handle.page.locator('[data-testid="phone-frame"]')
  await phone.evaluate(async node => {
    // Mutating capture-root styles or globally invalidating descendant styles
    // can make Chromium drop nested painted layers (notably backdrop-filter
    // surfaces). Validate the neutral root without changing compositor state;
    // the context already emulates reduced motion and Playwright disables
    // animations for the screenshot itself.
    const computedTransform = getComputedStyle(node).transform
    if (computedTransform !== 'none') {
      const matrix = new DOMMatrixReadOnly(computedTransform)
      const actual = [
        matrix.m11, matrix.m12, matrix.m13, matrix.m14,
        matrix.m21, matrix.m22, matrix.m23, matrix.m24,
        matrix.m31, matrix.m32, matrix.m33, matrix.m34,
        matrix.m41, matrix.m42, matrix.m43, matrix.m44,
      ]
      const identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      if (!actual.every((value, index) => Math.abs(value - identity[index]) < 1e-6)) {
        throw new Error(`Canonical capture root has a visual transform: ${computedTransform}`)
      }
    }
    if (getComputedStyle(node).filter !== 'none') {
      throw new Error('Canonical capture root must remain unfiltered')
    }
    void node.getBoundingClientRect()
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
  const output = path.join(tempShotsDir, fileName)
  let previous = await phone.screenshot({ animations: 'disabled', scale: 'css' })
  let stable = null
  let attempts = 1
  while (attempts < 5 && !stable) {
    await twoAnimationFrames(handle.page)
    const current = await phone.screenshot({ animations: 'disabled', scale: 'css' })
    attempts += 1
    if (sha256(previous) === sha256(current)) stable = current
    previous = current
  }
  assert(stable, `${fileName}: compositor capture did not stabilize within ${attempts} untouched attempts`)
  fs.writeFileSync(output, stable)
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
  return page.evaluate(() => [...document.querySelectorAll('[data-testid="phone-frame"] [role="status"], [data-testid="phone-frame"] [role="alert"]')]
    .map(node => node.textContent?.trim() ?? '')
    .filter(Boolean)
    .join(' · '))
}

async function fullyVisibleInPhone(page, locator, label) {
  const [box, phone] = await Promise.all([locator.boundingBox(), page.locator('[data-testid="phone-frame"]').boundingBox()])
  assert(box && phone && box.x >= phone.x && box.y >= phone.y && box.x + box.width <= phone.x + phone.width && box.y + box.height <= phone.y + phone.height, `${label}: not fully visible in phone frame`)
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
    const modal = document.querySelector('[role="dialog"][aria-modal="true"], [role="alertdialog"][aria-modal="true"]')
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

async function stateCapture(id, state, options = {}) {
  const contract = SCREEN_CONTRACTS[id]
  const name = options.name ?? `${id}-${state}`
  const loading = options.loading ?? state === 'skeleton'
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

// D1 allows ZERO capability events of any kind (no clipboard exception —
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
    if (status === 'pass') {
      assert(sameFingerprint(fingerprintsStart, fingerprintsEnd), 'Product/API/authority/accepted-sentinel fingerprint drifted after screenshot promotion')
      for (const entry of fingerprintsEnd.accepted.files) {
        assert(entry.sha256 === ACCEPTED_EXPECTED.get(entry.path), `Accepted sentinel ${entry.path} drifted after screenshot promotion`)
      }
    }
  } catch (fingerprintError) {
    if (status === 'pass') throw fingerprintError
    if (!error) error = fingerprintError
  }
  return {
    auditedAt: new Date().toISOString(),
    baseURL,
    command: USAGE,
    hostViewport: { width: 1440, height: 1000, deviceScaleFactor: 1 },
    phoneFrame: { width: 390, height: 844 },
    primaryReducedMotion: 'reduce',
    productionBuild: productionBuildEvidence,
    navigationIsolation: {
      strategy: 'new context per case + about:blank + Chromium origin clear + cookie clear + exact query fixture + unique __d1audit nonce + two RAFs',
      contexts: caseEvidence.length,
      uniqueNonces: visitedNonces.size,
    },
    integrity: {
      start: fingerprintsStart,
      end: fingerprintsEnd,
      unchanged: sameFingerprint(fingerprintsStart, fingerprintsEnd),
      acceptedSentinels: {
        manifest: path.relative(projectRoot, ACCEPTED_SENTINEL_MANIFEST),
        expectedFiles: ACCEPTED_SENTINEL_FILES.length,
        unchangedFromManifest: fingerprintsEnd.accepted.files.every(entry => entry.sha256 === ACCEPTED_EXPECTED.get(entry.path)),
      },
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

const EXACT_DATA_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete']

async function assertExactDataControls(page, groupName, label) {
  const group = page.getByRole('group', { name: groupName, exact: true })
  assert(await group.count() === 1, `${label}: expected one ${groupName} group`)
  const controls = group.getByRole('button')
  const names = await controls.allTextContents()
  const normalized = names.map(name => name.trim())
  assert(JSON.stringify(normalized) === JSON.stringify(EXACT_DATA_CONTROLS), `${label}: contextual controls are ${normalized.join('|')}`)
  return controls
}

async function assertSameOriginHref(locator, expected, label) {
  assert(await locator.count() === 1, `${label}: expected one route control`)
  const href = await locator.getAttribute('href')
  assert(href === expected, `${label}: href=${href}; expected ${expected}`)
}

async function closeDialogWithRestoration(page, dialog, trigger, label) {
  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'hidden' })
  const triggerHandle = await trigger.elementHandle()
  assert(triggerHandle, `${label}: trigger handle unavailable for focus restoration`)
  await page.waitForFunction(node => document.activeElement === node, triggerHandle)
  assert(await trigger.evaluate(node => document.activeElement === node), `${label}: Escape did not restore trigger focus`)
}

async function assertRootSubstate(page, rootAttribute, attribute, expected, label) {
  const root = page.locator(`[${rootAttribute}]`)
  await waitAttribute(page, `[${rootAttribute}]`, attribute, expected)
  assert(await root.getAttribute(attribute) === expected, `${label}: ${attribute} did not settle to ${expected}`)
}

try {
  productionBuildEvidence = await assertFreshProductionBuild()
  browser = await chromium.launch(chromePath ? { executablePath: chromePath } : {})

  // ——— S17 — Me / profile hub ———
  for (const state of SCREEN_CONTRACTS['17'].states) {
    await stateCapture('17', state, {
      beforeCapture: async ({ page }) => {
        const root = page.locator('[data-me-state]')
        if (state !== 'skeleton') {
          assert(await page.getByRole('progressbar', { name: /Experience/ }).count() === 1, '17 ' + state + ': Experience progress is missing')
        }
        if (state === 'default') {
          const text = (await root.innerText()).replace(/\s+/g, ' ')
          assert(text.includes('3 connected providers'), '17 default: exact provider wording is missing')
          assert(text.includes('84 imported records'), '17 default: exact imported-record wording is missing')
          assert(text.includes('Level 12'), '17 default: persona level drifted from 12')
          assert(await page.locator('input[type="file"]').count() === 0, '17 default: hidden file input violates honest-null avatar contract')
          await assertSameOriginHref(page.getByRole('link', { name: 'Search profile', exact: true }), '/screens/68', '17 Search')
          await assertSameOriginHref(page.getByRole('link', { name: 'Open Settings', exact: true }), '/screens/21', '17 Settings')
          await assertSameOriginHref(page.getByRole('link', { name: /^Life Power,/ }), '/screens/16', '17 Life Power')
          await assertSameOriginHref(page.getByRole('link', { name: /^Mission journal,/ }), '/screens/73', '17 Mission journal')
          await assertSameOriginHref(page.getByRole('link', { name: /^Book of Life,/ }), '/screens/20', '17 Book of Life')
          await assertSameOriginHref(page.getByRole('link', { name: /^Connected services,/ }), '/screens/22', '17 Connected services')
          await assertSameOriginHref(page.getByRole('link', { name: /^Progress photos,/ }), '/screens/49', '17 Progress photos')
          await assertSameOriginHref(page.getByRole('link', { name: /^Achievements,/ }), '/screens/71', '17 Achievements')
          await assertSameOriginHref(page.getByRole('link', { name: /^CIA memory,/ }), '/screens/20', '17 CIA memory')
          await assertSameOriginHref(page.getByRole('link', { name: /^Data sources,/ }), '/screens/84', '17 Data sources')
          await assertSameOriginHref(page.getByRole('link', { name: /^Health view,/ }), '/screens/96', '17 Health view')
          pass('S17 profile/source truth', { providers: 3, importedRecords: 84, level: 12 })
        }
        if (state === 'offline' || state === 'error') {
          const staleText = (await root.innerText()).match(/cached 14m ago/gi) ?? []
          assert(staleText.length >= 12, '17 ' + state + ': cached age did not propagate across profile data surfaces')
          assert(await page.getByRole('link', { name: 'CIA memory, 20 facts · cached 14m ago', exact: true }).count() === 1, '17 ' + state + ': CIA memory freshness missing')
          assert(await page.getByRole('link', { name: 'Data sources, 84 imported records · cached 14m ago', exact: true }).count() === 1, '17 ' + state + ': imported-record freshness missing')
          assert(await page.getByRole('progressbar', { name: 'Fitness 74 of 99, Via WHOOP · cached 14m ago', exact: true }).count() === 1, '17 ' + state + ': domain freshness missing')
        }
      },
    })
  }

  await runCase({ name: '17-data-controls', id: '17', state: 'default', rootAttribute: 'data-me-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const trigger = page.getByRole('button', { name: 'Review eight data controls', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-me-state', 'data-me-panel', 'data-controls', '17 data controls')
    await auditFixture(handle)
    const controls = await assertExactDataControls(page, 'Profile data controls', '17 data controls')
    for (let index = 0; index < EXACT_DATA_CONTROLS.length; index += 1) {
      await controls.nth(index).click()
      assert(await controls.nth(index).getAttribute('aria-pressed') === 'true', '17 data controls: ' + EXACT_DATA_CONTROLS[index] + ' did not select')
      assert(await page.locator('[data-control-outcome="' + EXACT_DATA_CONTROLS[index].toLowerCase() + '"]').count() === 1, '17 data controls: outcome missing for ' + EXACT_DATA_CONTROLS[index])
    }
    const dialog = page.getByRole('dialog', { name: 'Profile data controls', exact: true })
    await assertDialogTrap(page, dialog, trigger, '17 data controls', { close: false })
    await capture(handle, '17-data-controls')
    await closeDialogWithRestoration(page, dialog, trigger, '17 data controls')
  })

  await runCase({ name: '17-avatar-consent', id: '17', state: 'default', rootAttribute: 'data-me-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const trigger = page.getByRole('button', { name: /^Initials avatar for/ })
    await trigger.click()
    await assertRootSubstate(page, 'data-me-state', 'data-me-panel', 'avatar-consent', '17 avatar consent')
    await auditFixture(handle)
    const dialog = page.getByRole('dialog', { name: 'Profile photo consent', exact: true })
    const keep = dialog.getByRole('button', { name: 'Keep initials', exact: true })
    const proceed = dialog.getByRole('link', { name: 'Continue to edit', exact: true })
    await equalExit(keep, proceed, '17 avatar consent exits')
    await assertSameOriginHref(proceed, '/screens/50?panel=photo-consent', '17 avatar consent destination')
    await assertDialogTrap(page, dialog, trigger, '17 avatar consent', { close: false })
    await capture(handle, '17-avatar-consent')
    await closeDialogWithRestoration(page, dialog, trigger, '17 avatar consent')
  })

  // ——— S18 — Explore ———
  for (const state of SCREEN_CONTRACTS['18'].states) {
    await stateCapture('18', state, {
      beforeCapture: async ({ page }) => {
        const root = page.locator('[data-explore-state]')
        if (state === 'empty') {
          assert(await root.getAttribute('data-radar-state') === 'null', '18 empty: radar state is not null')
          assert(await page.locator('[data-domain-count="0"][data-domain-total="0"]').count() === 1, '18 empty: honest-null radar metadata must expose zero domains and zero total')
        } else {
          const radar = page.locator('[data-domain-count="5"][data-domain-total="100"]')
          assert(await radar.count() === 1, '18 ' + state + ': five-domain/100 radar is missing')
          const expected = new Map([['fitness', '30'], ['sleep', '25'], ['meditation', '20'], ['wellbeing', '15'], ['career', '10']])
          for (const [domain, percent] of expected) {
            const row = radar.locator('[data-domain="' + domain + '"]')
            assert(await row.count() === 1 && await row.getAttribute('data-domain-percent') === percent, '18 ' + state + ': ' + domain + ' percentage drifted')
          }
          const summary = await radar.getByRole('img').getAttribute('aria-label') || ''
          assert(summary.includes('Five active domains total 100 percent'), '18 ' + state + ': radar accessible total is missing')
        }
        if (state === 'default') {
          assert(await page.locator('[data-paywall-count="2"]').count() === 1, '18 default: exactly-two paywall wrapper missing')
          const locks = page.locator('[data-paywall-count="2"] > section')
          assert(await locks.count() === 2, '18 default: expected two canonical PaywallLock sections')
          await assertSameOriginHref(page.getByRole('link', { name: 'View Pro options for Advanced insights', exact: true }), '/screens/43?trigger=advanced-insights', '18 advanced PaywallLock')
          await assertSameOriginHref(page.getByRole('link', { name: 'View Pro options for Guided journeys', exact: true }), '/screens/43?trigger=guided-journeys', '18 journey PaywallLock')
        }
        if (state === 'offline') {
          assert(await page.getByRole('link', { name: 'Workouts. 12 sessions · cached 14m ago', exact: true }).count() === 1, '18 offline: Workouts freshness missing')
          assert(await page.getByRole('link', { name: 'Journal. 4 entries · cached 14m ago', exact: true }).count() === 1, '18 offline: Journal freshness missing')
        }
      },
      afterCapture: state === 'default' ? async ({ page }) => {
        const trigger = page.getByRole('button', { name: /^Sleep\. Suggested from recovery/ })
        await trigger.click()
        await assertRootSubstate(page, 'data-explore-state', 'data-explore-panel', 'module', '18 module preview')
        const dialog = page.getByRole('dialog', { name: 'Sleep preview', exact: true })
        await assertSameOriginHref(dialog.getByRole('link', { name: 'Open module', exact: true }), '/screens/58', '18 module destination')
        await assertDialogTrap(page, dialog, trigger, '18 module preview')
      } : undefined,
    })
  }

  for (const searchCase of [
    { name: '18-search-results', searchState: 'results', expected: 'results', value: 'journal' },
    { name: '18-search-empty', searchState: 'empty', expected: 'empty', value: 'no matching module' },
  ]) {
    await runCase({ name: searchCase.name, id: '18', state: 'default', rootAttribute: 'data-explore-state', rootState: 'default', query: { 'search-state': searchCase.searchState } }, async handle => {
      const { page } = handle
      await waitAttribute(page, '[data-explore-state]', 'data-search-state', searchCase.expected)
      await auditFixture(handle)
      const search = page.getByRole('searchbox', { name: 'Search modules', exact: true })
      assert(await search.inputValue() === searchCase.value, searchCase.name + ': deterministic query value drifted')
      const clear = page.getByRole('button', { name: 'Clear module search', exact: true })
      assert(await clear.count() === 1, searchCase.name + ': conditional Clear is missing')
      await capture(handle, searchCase.name)
      await clear.click()
      await waitAttribute(page, '[data-explore-state]', 'data-search-state', 'idle')
      assert(await search.evaluate(node => document.activeElement === node), searchCase.name + ': Clear did not restore search focus')
    })
  }

  await runCase({ name: '18-paywall-locks', id: '18', state: 'default', rootAttribute: 'data-explore-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const locks = page.locator('[data-paywall-count="2"]')
    await locks.scrollIntoViewIfNeeded()
    await twoAnimationFrames(page)
    assert(await locks.locator(':scope > section').count() === 2, '18 paywall capture: two locks missing')
    await capture(handle, '18-paywall-locks', { top: false })
  })

  await runCase({ name: '18-data-controls', id: '18', state: 'default', rootAttribute: 'data-explore-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const trigger = page.getByRole('button', { name: 'Review eight data controls', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-explore-state', 'data-explore-panel', 'data-controls', '18 data controls')
    await auditFixture(handle)
    await assertExactDataControls(page, 'Explore data controls', '18 data controls')
    const dialog = page.getByRole('dialog', { name: 'Explore data controls', exact: true })
    await assertDialogTrap(page, dialog, trigger, '18 data controls', { close: false })
    await capture(handle, '18-data-controls')
    await closeDialogWithRestoration(page, dialog, trigger, '18 data controls')
  })

  // ——— S21 — Settings ———
  for (const state of SCREEN_CONTRACTS['21'].states) {
    await stateCapture('21', state, {
      beforeCapture: async ({ page }) => {
        if (state !== 'skeleton') {
          const switches = page.getByRole('switch')
          assert(await switches.count() === 3, '21 ' + state + ': supported fixture must expose three native switches')
          for (const label of ['Notifications', 'Background sync', 'Face ID']) {
            const control = page.getByRole('switch', { name: new RegExp('^' + label) })
            assert(await control.count() === 1, '21 ' + state + ': ' + label + ' switch missing')
            await targetSize(control, '21 ' + state + ' ' + label)
          }
        }
        if (state === 'default') {
          await assertSameOriginHref(page.getByRole('link', { name: /^Profile/ }), '/screens/50', '21 Profile')
          await assertSameOriginHref(page.getByRole('link', { name: /^Subscription & billing/ }), '/screens/23', '21 Billing')
          await assertSameOriginHref(page.getByRole('link', { name: /^Connected services/ }), '/screens/22', '21 Services')
          assert(await page.getByText(/does not place calls or send texts/).count() === 1, '21 default: safety capability disclaimer missing')
          await assertSameOriginHref(page.getByRole('link', { name: /Open crisis resources in Help Center/i }), '/screens/25?support=crisis', '21 safety Help Center')
        }
      },
    })
  }

  await runCase({ name: '21-hardware-unsupported', id: '21', state: 'default', rootAttribute: 'data-settings-state', rootState: 'default', query: { hardware: 'unsupported' } }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    assert(await page.locator('[data-settings-state]').getAttribute('data-hardware-state') === 'unsupported', '21 unsupported: root hardware state drifted')
    assert(await page.getByRole('switch').count() === 2, '21 unsupported: Face ID switch was not omitted')
    assert(await page.getByText(/Face ID is omitted because.*unsupported hardware/).count() === 1, '21 unsupported: hardware disposition missing')
    await capture(handle, '21-hardware-unsupported')
  })

  await runCase({ name: '21-password-modal', id: '21', state: 'default', rootAttribute: 'data-settings-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const trigger = page.getByRole('button', { name: 'Change password', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-settings-state', 'data-settings-panel', 'password', '21 password')
    await auditFixture(handle)
    const dialog = page.getByRole('dialog', { name: 'Change password preview', exact: true })
    const input = dialog.getByLabel('Preview password (not stored)', { exact: true })
    assert(await input.getAttribute('type') === 'password', '21 password: native password field missing')
    await input.fill('local-preview')
    assert(await dialog.getByRole('button', { name: 'Update preview', exact: true }).isEnabled(), '21 password: Update preview did not enable')
    await assertDialogTrap(page, dialog, trigger, '21 password', { close: false })
    await capture(handle, '21-password-modal')
    await closeDialogWithRestoration(page, dialog, trigger, '21 password')
  })

  await runCase({ name: '21-data-controls', id: '21', state: 'default', rootAttribute: 'data-settings-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const trigger = page.getByRole('button', { name: /Manage data controls/ })
    await trigger.click()
    await assertRootSubstate(page, 'data-settings-state', 'data-settings-panel', 'data-controls', '21 data controls')
    await auditFixture(handle)
    await assertExactDataControls(page, 'Settings data controls', '21 data controls')
    const dialog = page.getByRole('dialog', { name: 'Settings data controls', exact: true })
    await equalExit(dialog.getByRole('button', { name: 'Keep current choices', exact: true }), dialog.getByRole('button', { name: 'Apply local preview', exact: true }), '21 data-control exits')
    await assertDialogTrap(page, dialog, trigger, '21 data controls', { close: false })
    await capture(handle, '21-data-controls')
    await closeDialogWithRestoration(page, dialog, trigger, '21 data controls')
  })

  await runCase({ name: '21-notifications-toggled', id: '21', state: 'default', rootAttribute: 'data-settings-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const control = page.getByRole('switch', { name: /^Notifications/ })
    assert(await control.isChecked(), '21 notifications toggle: initial checked state drifted')
    await control.focus()
    await page.keyboard.press('Space')
    await waitAttribute(page, '[data-settings-state]', 'data-settings-state', 'success')
    assert(!(await control.isChecked()), '21 notifications toggle: switch did not toggle off')
    assert((await liveStatusText(page)).includes('Notifications changed in this local preview'), '21 notifications toggle: honest local outcome missing')
    await control.scrollIntoViewIfNeeded()
    await capture(handle, '21-notifications-toggled', { top: false })
  })

  // ——— S22 — Connected services ———
  for (const state of SCREEN_CONTRACTS['22'].states) {
    await stateCapture('22', state, {
      beforeCapture: async ({ page }) => {
        if (state !== 'skeleton') {
          const providers = page.locator('[data-integration-provider]')
          assert(await providers.count() === 11, '22 ' + state + ': expected 11 provider cards')
          const names = await providers.evaluateAll(nodes => nodes.map(node => node.getAttribute('data-provider')))
          const expected = ['whoop', 'apple-health', 'fitbit', 'garmin', 'oura-ring', 'samsung-health', 'myfitnesspal', 'cronometer', 'lumen', 'google-calendar', 'spotify']
          assert(JSON.stringify(names) === JSON.stringify(expected), '22 ' + state + ': provider roster/order drifted')
          assert(await providers.evaluateAll(nodes => nodes.every(node => ['connected', 'pending', 'unconnected', 'error', 'disabled'].includes(node.getAttribute('data-provider-status') ?? ''))), '22 ' + state + ': provider status must be one allowed value per card')
        }
        if (state === 'default') {
          const whoop = page.locator('[data-integration-provider][data-provider="whoop"][data-provider-status="connected"]')
          const fitbit = page.locator('[data-integration-provider][data-provider="fitbit"][data-provider-status="pending"]')
          assert(await whoop.count() === 1, '22 default: WHOOP fresh-connected fixture missing')
          assert(!/retry/i.test(await whoop.innerText()), '22 default: WHOOP incorrectly says retry')
          assert(await fitbit.count() === 1 && /Retry preview pending/i.test(await fitbit.innerText()), '22 default: Fitbit pending retry truth missing')
          assert(await page.getByText('11 providers · 6 wearables, 3 nutrition, 1 productivity, 1 lifestyle', { exact: true }).count() === 1, '22 default: group totals drifted')
          assert(await page.locator('[data-services-state]').getByText(/Paywall|premium required/i).count() === 0, '22 default: connection management incorrectly paywalled')
          assert(await page.locator('#services-live-status[aria-live="polite"][aria-atomic="true"]').count() === 1, '22 default: atomic provider status source missing')
        }
      },
    })
  }

  await runCase({ name: '22-provider-controls', id: '22', state: 'default', rootAttribute: 'data-services-state', rootState: 'default' }, async handle => {
    const { page } = handle
    const trigger = page.getByRole('button', { name: 'Review provider controls', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-services-state', 'data-services-panel', 'controls', '22 provider controls')
    await auditFixture(handle)
    await assertExactDataControls(page, 'WHOOP data controls', '22 provider controls')
    const dialog = page.getByRole('dialog', { name: 'WHOOP controls', exact: true })
    await assertDialogTrap(page, dialog, trigger, '22 provider controls', { close: false })
    await capture(handle, '22-provider-controls')
    await closeDialogWithRestoration(page, dialog, trigger, '22 provider controls')
  })

  await runCase({ name: '22-connect-consent', id: '22', state: 'default', rootAttribute: 'data-services-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Connect Apple Health', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-services-state', 'data-services-panel', 'connect', '22 connect consent')
    const dialog = page.getByRole('dialog', { name: 'Connect Apple Health preview', exact: true })
    await equalExit(dialog.getByRole('button', { name: 'Not now', exact: true }), dialog.getByRole('button', { name: 'Continue local preview', exact: true }), '22 connect exits')
    await assertDialogTrap(page, dialog, trigger, '22 connect consent', { close: false })
    await capture(handle, '22-connect-consent')
    await closeDialogWithRestoration(page, dialog, trigger, '22 connect consent')
  })

  await runCase({ name: '22-disconnect-confirm', id: '22', state: 'default', rootAttribute: 'data-services-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Manage WHOOP', exact: true })
    await trigger.click()
    await waitAttribute(page, '[data-services-state]', 'data-services-panel', 'controls')
    const disconnectTrigger = page.getByRole('button', { name: 'Review disconnect scope', exact: true })
    await disconnectTrigger.click()
    await assertRootSubstate(page, 'data-services-state', 'data-services-panel', 'disconnect', '22 disconnect')
    const dialog = page.getByRole('alertdialog', { name: 'Disconnect WHOOP?', exact: true })
    await equalExit(dialog.getByRole('button', { name: 'Keep connected', exact: true }), dialog.getByRole('button', { name: 'Disconnect local preview', exact: true }), '22 disconnect exits')
    await assertDialogTrap(page, dialog, disconnectTrigger, '22 disconnect', { close: false })
    await capture(handle, '22-disconnect-confirm')
    await closeDialogWithRestoration(page, dialog, trigger, '22 disconnect')
  })

  await runCase({ name: '22-reduced-motion', id: '22', state: 'default', rootAttribute: 'data-services-state', rootState: 'default', reducedMotion: 'reduce' }, async handle => {
    await auditFixture(handle)
    await assertReducedMotion(handle.page, '22 reduced motion')
    await capture(handle, '22-reduced-motion')
  })

  // ——— S23 — Subscription & billing ———
  for (const state of SCREEN_CONTRACTS['23'].states) {
    await stateCapture('23', state, {
      beforeCapture: async ({ page }) => {
        const root = page.locator('[data-billing-state]')
        assert(await root.getAttribute('data-usage-used') === '800', '23 ' + state + ': usage numerator drifted')
        assert(await root.getAttribute('data-usage-limit') === '1000', '23 ' + state + ': usage limit drifted')
        if (state === 'default') {
          const meter = page.getByRole('img', { name: '800 of 1,000 used', exact: true })
          assert(await meter.count() === 1, '23 default: exact accessible charge meter missing')
          const fills = await meter.locator(':scope > span > span').evaluateAll(nodes => nodes.map(node => node.style.width))
          const expectedFills = ['100%', '100%', '100%', '100%', '100%', '100%', '100%', '100%', '0%', '0%']
          assert(JSON.stringify(fills) === JSON.stringify(expectedFills), '23 default: meter is not exactly 8 full + 2 empty ticks')
          assert(await page.getByText('Renews Jun 15, 2026.', { exact: true }).count() === 1, '23 default: separate renewal label missing')
          const table = page.getByRole('table', { name: 'Plan feature comparison', exact: true })
          assert(await table.count() === 1, '23 default: semantic comparison table missing')
          for (const header of ['Feature', 'Free', 'Plus', 'Pro', 'Max']) {
            assert(await table.getByRole('columnheader', { name: new RegExp('^' + header) }).count() === 1, '23 default: ' + header + ' plan header missing')
          }
          assert(await table.locator('tbody tr').count() === 4 && await table.locator('td').count() === 16, '23 default: comparison matrix dimensions drifted')
          assert(await table.locator('td').evaluateAll(cells => cells.every(cell => /^(Included|Not included)$/.test(cell.innerText.trim()))), '23 default: matrix cells lack text alternatives')
          const plans = page.getByRole('button', { name: /per month, (current plan|compare plan)$/ })
          assert(await plans.count() === 4, '23 default: four operable plan actions missing')
          assert(await page.locator('[aria-current="true"]').getAttribute('aria-label') === 'Pro, $60 per month, current plan', '23 default: current Pro state drifted')
          await assertExactDataControls(page, 'Billing data controls', '23 default')
          pass('S23 billing truth', { usage: '800/1000', ticks: '8/10', plans: 4 })
        }
        if (state === 'empty') {
          assert(await page.getByRole('img', { name: '800 of 1,000 used', exact: true }).count() === 0, '23 empty: usage meter should be absent')
          assert(await page.getByText(/No metered usage, credits, payment method, or charges/).count() === 1, '23 empty: honest-null billing copy missing')
          assert(await page.locator('[aria-current="true"]').getAttribute('aria-label') === 'Free, $0 per month, current plan', '23 empty: Free should be current')
          assert(await page.getByText('Current fixture', { exact: true }).count() === 0, '23 empty: stale Pro current copy returned')
        }
        if (state === 'error') {
          assert(await page.locator('[aria-current="true"]').count() === 0, '23 error: an unproven current plan is exposed')
          assert(await page.getByText('Current fixture', { exact: true }).count() === 0, '23 error: stale current-plan copy returned')
        }
        if (state === 'offline') assert(await page.getByText(/Offline · cached plan and credits remain visible/).count() === 1, '23 offline: cached truth missing')
        if (state === 'payment-final-day') assert(await page.getByText('Payment grace ends today', { exact: true }).count() === 1, '23 final-day: exact warning missing')
        if (state === 'payment-post-grace') assert(await page.getByText(/Plan access is paused only in this visual fixture/).count() === 1, '23 post-grace: paused truth missing')
      },
      afterCapture: state === 'error' ? async ({ page }) => {
        const retry = page.getByRole('button', { name: 'Retry preview', exact: true })
        await retry.click()
        await waitAttribute(page, '[data-billing-state]', 'data-billing-state', 'default')
        assert((await liveStatusText(page)).includes('Retry restored the bundled billing fixture'), '23 error: local retry outcome missing')
      } : undefined,
    })
  }

  await runCase({ name: '23-compare-table', id: '23', state: 'default', rootAttribute: 'data-billing-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Max, $120 per month, compare plan', exact: true })
    await trigger.click()
    await waitAttribute(page, '[data-billing-state]', 'data-billing-panel', 'compare')
    const dialog = page.getByRole('dialog', { name: 'Compare Max', exact: true })
    await assertDialogTrap(page, dialog, trigger, '23 compare plan')
    const table = page.getByRole('table', { name: 'Plan feature comparison', exact: true })
    await table.scrollIntoViewIfNeeded()
    await twoAnimationFrames(page)
    await capture(handle, '23-compare-table', { top: false })
  })

  await runCase({ name: '23-cancel-confirm', id: '23', state: 'default', rootAttribute: 'data-billing-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Cancel subscription', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-billing-state', 'data-billing-panel', 'cancel', '23 cancel')
    const dialog = page.getByRole('alertdialog', { name: 'Preview cancellation', exact: true })
    await equalExit(dialog.getByRole('button', { name: 'Keep plan', exact: true }), dialog.getByRole('button', { name: 'Preview cancel', exact: true }), '23 cancel exits')
    await assertDialogTrap(page, dialog, trigger, '23 cancel', { close: false })
    await capture(handle, '23-cancel-confirm')
    await closeDialogWithRestoration(page, dialog, trigger, '23 cancel')
  })

  await runCase({ name: '23-update-payment', id: '23', state: 'default', rootAttribute: 'data-billing-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Update', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-billing-state', 'data-billing-panel', 'update', '23 payment update')
    const dialog = page.getByRole('dialog', { name: 'Update payment preview', exact: true })
    await equalExit(dialog.getByRole('button', { name: 'Not now', exact: true }), dialog.getByRole('button', { name: 'Preview only', exact: true }), '23 payment exits')
    await assertDialogTrap(page, dialog, trigger, '23 payment update', { close: false })
    await capture(handle, '23-update-payment')
    await closeDialogWithRestoration(page, dialog, trigger, '23 payment update')
  })

  await runCase({ name: '23-reduced-motion', id: '23', state: 'default', rootAttribute: 'data-billing-state', rootState: 'default', reducedMotion: 'reduce' }, async handle => {
    await auditFixture(handle)
    await assertReducedMotion(handle.page, '23 reduced motion')
    await capture(handle, '23-reduced-motion')
  })

  // ——— S24 — Notification history ———
  for (const state of SCREEN_CONTRACTS['24'].states) {
    await stateCapture('24', state, {
      beforeCapture: async ({ page }) => {
        const root = page.locator('[data-notifications-state]')
        assert(await root.getAttribute('data-period') === '7d', '24 ' + state + ': period drifted')
        if (state !== 'skeleton') {
          assert(await page.locator('#activity-history-heading').innerText() === 'Activity history', '24 ' + state + ': safe heading text drifted')
          const rootText = await root.innerText()
          assert(!/Check-ins|<span|className=/i.test(rootText), '24 ' + state + ': zero category or markup leakage returned')
        }
        if (state === 'default') {
          assert(await root.getAttribute('data-notification-total') === '6', '24 default: exact total drifted')
          assert(await page.getByRole('img', { name: 'Notification frequency over the last 7 days: 1, 0, 2, 1, 0, 1, 1. 6 notifications total.', exact: true }).count() === 1, '24 default: reconciled trend payload missing')
          const filters = page.getByRole('group', { name: 'Filter notification history', exact: true })
          for (const [name, pressed] of [['All 6', 'true'], ['CIA 3', 'false'], ['Reminders 2', 'false'], ['Social 1', 'false']]) {
            const button = filters.getByRole('button', { name, exact: true })
            assert(await button.getAttribute('aria-pressed') === pressed, '24 default: ' + name + ' pressed state drifted')
            assert(await button.locator('[data-filter-selected-marker]').count() === (pressed === 'true' ? 1 : 0), '24 default: ' + name + ' non-color selected marker drifted')
          }
          assert(await filters.locator('[data-filter-selected-marker]').count() === 1, '24 default: exactly one filter must expose a non-color selected marker')
          assert(await page.getByRole('button', { name: /^(Sleep dipped|Time to log|Alex finished|Stress levels|Half marathon|Focus window).*(Read|Unread)\.$/ }).count() === 6, '24 default: expected six independent notification row buttons')
          assert(await page.getByRole('button', { name: /^More actions for / }).count() === 6, '24 default: expected six independent overflow buttons')
          assert(await page.locator('button button').count() === 0, '24 default: nested button regression')
          assert(await page.locator('[class~="bg-domain-sleep/15"]').filter({ hasText: 'Sleep' }).count() === 1, '24 default: Sleep token mapping missing')
          assert(await page.locator('[class~="bg-domain-relationships/15"]').filter({ hasText: 'Social' }).count() === 1, '24 default: Social-to-Relationships token mapping missing')
          assert(await page.locator('[class*="domain-social"]').count() === 0, '24 default: undefined domain-social token rendered')
          pass('S24 notification truth', { days: [1, 0, 2, 1, 0, 1, 1], total: 6, categories: { CIA: 3, Reminders: 2, Social: 1 } })
        }
        if (state === 'sparse') {
          assert(await page.getByRole('img', { name: 'Sparse notification frequency over the last 7 days: 0, 0, 0, 0, 0, 1, 1. 2 notifications total.', exact: true }).count() === 1, '24 sparse: two-row temporal payload drifted')
          assert(await root.getAttribute('data-notification-total') === '2', '24 sparse: exact total must be 2')
        }
      },
      afterCapture: state === 'error' ? async ({ page }) => {
        await page.getByRole('button', { name: 'Retry preview', exact: true }).click()
        await waitAttribute(page, '[data-notifications-state]', 'data-notifications-state', 'default')
        assert((await liveStatusText(page)).includes('Retry restored the bundled notification fixture'), '24 error: local retry outcome missing')
      } : undefined,
    })
  }

  await runCase({ name: '24-filter-cia', id: '24', state: 'default', rootAttribute: 'data-notifications-state', rootState: 'default', query: { filter: 'cia' } }, async handle => {
    const { page } = handle
    await waitAttribute(page, '[data-notifications-state]', 'data-notification-filter', 'cia')
    await auditFixture(handle)
    const root = page.locator('[data-notifications-state]')
    assert(await root.getAttribute('data-notification-total') === '3', '24 CIA filter: total must be 3')
    const ciaFilter = page.getByRole('button', { name: 'CIA 3', exact: true })
    assert(await ciaFilter.getAttribute('aria-pressed') === 'true', '24 CIA filter: pressed state missing')
    assert(await ciaFilter.locator('[data-filter-selected-marker]').count() === 1, '24 CIA filter: non-color selected marker missing')
    assert(await page.getByRole('button', { name: /^(Sleep dipped|Stress levels|Focus window).*(Read|Unread)\.$/ }).count() === 3, '24 CIA filter: row scope drifted')
    await capture(handle, '24-filter-cia')
    for (const title of ['Sleep dipped to 6.2h', 'Stress levels are trending down', 'Focus window begins at 2:00 pm']) {
      await page.getByRole('button', { name: `More actions for ${title}`, exact: true }).click()
      const menu = page.getByRole('dialog', { name: `Actions for ${title}`, exact: true })
      await menu.getByRole('button', { name: 'Delete from this preview', exact: true }).click()
      const confirmation = page.getByRole('alertdialog', { name: 'Delete notification preview?', exact: true })
      await equalExit(confirmation.getByRole('button', { name: 'Keep it', exact: true }), confirmation.getByRole('button', { name: 'Preview delete', exact: true }), '24 filtered delete exits')
      await confirmation.getByRole('button', { name: 'Preview delete', exact: true }).click()
      await waitAttribute(page, '[data-notifications-state]', 'data-notifications-panel', 'closed')
    }
    await waitAttribute(page, '[data-notifications-state]', 'data-notification-filter', 'all')
    assert(await root.getAttribute('data-notification-total') === '3', '24 CIA filter: deleting the final CIA row did not restore All with the three surviving rows')
    const survivingAllFilter = page.getByRole('button', { name: 'All 3', exact: true })
    assert(await survivingAllFilter.getAttribute('aria-pressed') === 'true', '24 CIA filter: All did not become the surviving pressed filter')
    assert(await survivingAllFilter.locator('[data-filter-selected-marker]').count() === 1, '24 CIA filter: surviving All filter non-color marker missing')
  })

  await runCase({ name: '24-row-menu', id: '24', state: 'default', rootAttribute: 'data-notifications-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'More actions for Sleep dipped to 6.2h', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-notifications-state', 'data-notifications-panel', 'row-menu', '24 row menu')
    const dialog = page.getByRole('dialog', { name: 'Actions for Sleep dipped to 6.2h', exact: true })
    assert(await dialog.getByRole('button', { name: 'Archive from this preview', exact: true }).count() === 1, '24 row menu: Archive action missing')
    assert(await dialog.getByRole('button', { name: 'Delete from this preview', exact: true }).count() === 1, '24 row menu: Delete action missing')
    await assertDialogTrap(page, dialog, trigger, '24 row menu', { close: false })
    await capture(handle, '24-row-menu')
    await closeDialogWithRestoration(page, dialog, trigger, '24 row menu')
  })

  await runCase({ name: '24-controls', id: '24', state: 'default', rootAttribute: 'data-notifications-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: /Notification controls.*8 controls/ })
    await trigger.click()
    await assertRootSubstate(page, 'data-notifications-state', 'data-notifications-panel', 'controls', '24 controls')
    await assertExactDataControls(page, 'Notification data controls', '24 controls')
    const dialog = page.getByRole('dialog', { name: 'Notification controls', exact: true })
    await assertDialogTrap(page, dialog, trigger, '24 controls', { close: false })
    await capture(handle, '24-controls')
    await dialog.getByRole('button', { name: 'Delete', exact: true }).click()
    const confirmation = page.getByRole('alertdialog', { name: 'Delete notification data preview?', exact: true })
    assert((await confirmation.innerText()).includes('No row, source notification, OS setting, or account data will be deleted'), '24 controls: generic Delete disclosure targets a hidden row')
    await equalExit(confirmation.getByRole('button', { name: 'Keep it', exact: true }), confirmation.getByRole('button', { name: 'Preview delete', exact: true }), '24 generic Delete exits')
    await confirmation.getByRole('button', { name: 'Preview delete', exact: true }).click()
    await waitAttribute(page, '[data-notifications-state]', 'data-notifications-panel', 'closed')
    assert(await page.locator('[data-notifications-state]').getAttribute('data-notification-total') === '6', '24 controls: generic Delete mutated a notification row')
    assert(await page.getByRole('button', { name: 'More actions for Sleep dipped to 6.2h', exact: true }).count() === 1, '24 controls: generic Delete removed the hidden default row')
    assert((await liveStatusText(page)).includes('No row, source notification'), '24 controls: non-mutating Delete outcome missing')
    assert(await trigger.evaluate(node => document.activeElement === node), '24 controls: generic Delete did not restore focus to controls trigger')
  })

  await runCase({ name: '24-mark-read-undone', id: '24', state: 'default', rootAttribute: 'data-notifications-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const mark = page.getByRole('button', { name: 'Mark all read', exact: true })
    await mark.click()
    await page.getByText('All bundled notifications marked read locally.', { exact: true }).waitFor()
    assert(await page.locator('button[aria-label$="Read."]').count() === 6, '24 mark-read: not all six rows became read')
    await page.getByRole('button', { name: 'Undo', exact: true }).click()
    const banner = page.getByText('Mark all read undone; original states restored.', { exact: true })
    await banner.waitFor()
    assert(await page.locator('button[aria-label$="Unread."]').count() === 3, '24 undo: original three unread rows were not restored')
    await banner.scrollIntoViewIfNeeded()
    await twoAnimationFrames(page)
    await capture(handle, '24-mark-read-undone', { top: false })
  })

  await runCase({ name: '24-reduced-motion', id: '24', state: 'default', rootAttribute: 'data-notifications-state', rootState: 'default', reducedMotion: 'reduce' }, async handle => {
    await auditFixture(handle)
    await assertReducedMotion(handle.page, '24 reduced motion')
    await capture(handle, '24-reduced-motion')
  })

  // ——— S25 — Help center ———
  for (const state of SCREEN_CONTRACTS['25'].states) {
    await stateCapture('25', state, {
      beforeCapture: async ({ page }) => {
        const root = page.locator('[data-help-state]')
        assert(await page.locator('input[type="search"]').count() === 1, '25 ' + state + ': expected one native search field')
        const search = page.getByRole('searchbox', { name: 'Search help topics', exact: true })
        assert(await search.count() === 1, '25 ' + state + ': labelled searchbox missing')
        if (state === 'default') {
          assert(await root.getAttribute('data-search-state') === 'idle', '25 default: search must start idle')
          assert(await page.getByRole('button', { name: /Open article/ }).count() === 6, '25 default: six category actions missing')
          assert(await page.getByText('No ticket yet', { exact: true }).count() === 1, '25 default: exact no-ticket truth missing')
          assert(await page.getByText('No current SLA', { exact: true }).count() === 1, '25 default: exact no-SLA truth missing')
          await assertSameOriginHref(page.getByRole('link', { name: 'Terms of service', exact: true }), '/legal/terms', '25 Terms')
          await assertSameOriginHref(page.getByRole('link', { name: 'Privacy', exact: true }), '/legal/privacy', '25 Privacy')
          assert(await root.getAttribute('data-handoff-context') === 'none', '25 default: CIA context leaked before consent')
          assert(await root.getAttribute('data-ticket-state') === 'none', '25 default: ticket state is not honest-null')
        }
        if (state === 'success') assert(await root.getAttribute('data-ticket-state') === 'local-preview', '25 success: local-preview ticket state missing')
      },
      afterCapture: state === 'empty' ? async ({ page }) => {
        const search = page.getByRole('searchbox', { name: 'Search help topics', exact: true })
        await search.fill('billing')
        await waitAttribute(page, '[data-help-state]', 'data-search-state', 'empty')
        assert(await page.getByRole('list', { name: 'Grouped help search results', exact: true }).count() === 0, '25 empty: bundled articles were resurrected by search')
        assert(await page.getByText('No matching help article', { exact: true }).count() === 1, '25 empty: honest-null search result missing')
      } : undefined,
    })
  }

  for (const searchCase of [
    { name: '25-search-results', query: 'billing', expected: 'results' },
    { name: '25-search-empty', query: 'zzzz-no-help-match', expected: 'empty' },
  ]) {
    await runCase({ name: searchCase.name, id: '25', state: 'default', rootAttribute: 'data-help-state', rootState: 'default', query: { q: searchCase.query } }, async handle => {
      const { page } = handle
      await waitAttribute(page, '[data-help-state]', 'data-search-state', searchCase.expected)
      await auditFixture(handle)
      const search = page.getByRole('searchbox', { name: 'Search help topics', exact: true })
      assert(await search.inputValue() === searchCase.query, searchCase.name + ': query value drifted')
      const clear = page.getByRole('button', { name: 'Clear', exact: true })
      await targetSize(clear, searchCase.name + ' Clear')
      if (searchCase.expected === 'results') {
        assert(await page.getByRole('list', { name: 'Grouped help search results', exact: true }).count() === 1, '25 search results: grouped result list missing')
        assert(await page.getByRole('listitem').count() >= 1, '25 search results: no result groups rendered')
      } else {
        assert(await page.getByText('No matching help article', { exact: true }).count() === 1, '25 search empty: honest no-match exit missing')
      }
      await capture(handle, searchCase.name)
      await clear.click()
      await waitAttribute(page, '[data-help-state]', 'data-search-state', 'idle')
      assert(await search.evaluate(node => document.activeElement === node), searchCase.name + ': Clear did not restore search focus')
      assert(await page.getByRole('button', { name: /Open article/ }).count() === 6, searchCase.name + ': Clear did not restore six categories')
    })
  }

  await runCase({ name: '25-cia-consent', id: '25', state: 'default', rootAttribute: 'data-help-state', rootState: 'default', query: { q: 'billing' } }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Ask CIA', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-help-state', 'data-help-panel', 'cia-consent', '25 CIA consent')
    const dialog = page.getByRole('dialog', { name: 'Share this query with CIA?', exact: true })
    const text = (await dialog.innerText()).replace(/\s+/g, ' ')
    assert(text.includes('Only your current help query'), '25 CIA consent: query-only disclosure missing')
    for (const excluded of ['Mission history', 'tracking data', 'profile fields', 'account data', 'prior conversations']) {
      assert(text.includes(excluded), '25 CIA consent: excluded context missing: ' + excluded)
    }
    await assertExactDataControls(page, 'CIA help handoff data controls', '25 CIA consent')
    const stay = dialog.getByRole('button', { name: 'Stay in Help Center', exact: true })
    const share = dialog.getByRole('button', { name: 'Share query locally', exact: true })
    await equalExit(stay, share, '25 CIA consent exits')
    await assertDialogTrap(page, dialog, trigger, '25 CIA consent', { close: false })
    await capture(handle, '25-cia-consent')
    await share.click()
    await waitAttribute(page, '[data-help-state]', 'data-handoff-context', 'query-only')
    await waitAttribute(page, '[data-help-state]', 'data-help-panel', 'closed')
    const consentedLink = page.getByRole('link', { name: 'Open consented CIA preview', exact: true })
    await assertSameOriginHref(consentedLink, '/screens/09?help=billing', '25 consented CIA destination')
    assert(await page.getByText('Approved query: billing', { exact: true }).count() === 1, '25 CIA consent: approved query snapshot is not visible')
    assert((await liveStatusText(page)).includes('query-only context'), '25 CIA consent: honest local handoff outcome missing')
    const search = page.getByRole('searchbox', { name: 'Search help topics', exact: true })
    await search.fill('privacy')
    await waitAttribute(page, '[data-help-state]', 'data-search-state', 'results')
    await assertSameOriginHref(consentedLink, '/screens/09?help=billing', '25 consent snapshot after query edit')
    await search.fill('')
    await waitAttribute(page, '[data-help-state]', 'data-search-state', 'idle')
    await assertSameOriginHref(consentedLink, '/screens/09?help=billing', '25 consent snapshot after query clear')

    const directConsentURL = new URL('/screens/25', baseURL)
    directConsentURL.searchParams.set('panel', 'cia-consent')
    await page.goto(directConsentURL.href, { waitUntil: 'domcontentloaded' })
    await waitAttribute(page, '[data-help-state]', 'data-help-panel', 'cia-consent')
    const directDialog = page.getByRole('dialog', { name: 'Share this query with CIA?', exact: true })
    const directShare = directDialog.getByRole('button', { name: 'Share query locally', exact: true })
    assert(await directShare.isDisabled(), '25 CIA consent: direct empty-query panel bypassed the submit invariant')
    assert(await directShare.getAttribute('aria-describedby') === 'help-cia-consent-query-required', '25 CIA consent: direct empty-query disabled reason missing')
  })

  await runCase({ name: '25-contact-no-ticket', id: '25', state: 'default', rootAttribute: 'data-help-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: /Contact/ })
    await trigger.click()
    await assertRootSubstate(page, 'data-help-state', 'data-help-panel', 'contact', '25 contact')
    const dialog = page.getByRole('dialog', { name: 'Contact support preview', exact: true })
    assert(await dialog.getByText('No ticket yet', { exact: true }).count() === 1, '25 contact: exact no-ticket state missing')
    assert(await dialog.getByText('No current SLA', { exact: true }).count() === 1, '25 contact: exact no-SLA state missing')
    const issue = dialog.getByLabel('What do you need help with?', { exact: true })
    await issue.fill('Billing preview question')
    const submit = dialog.getByRole('button', { name: 'Preview support outcome', exact: true })
    assert(await submit.isEnabled(), '25 contact: support preview did not enable after input')
    await equalExit(dialog.getByRole('button', { name: 'Keep draft', exact: true }), submit, '25 contact exits')
    await assertDialogTrap(page, dialog, trigger, '25 contact', { close: false })
    await capture(handle, '25-contact-no-ticket')
    await submit.click()
    await waitAttribute(page, '[data-help-state]', 'data-ticket-state', 'local-preview')
    assert((await liveStatusText(page)).includes('No request, network call, or ticket was created'), '25 contact: no-ticket outcome truth missing')
  })

  await runCase({ name: '25-article', id: '25', state: 'default', rootAttribute: 'data-help-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: /Getting started.*Open article/ })
    await trigger.click()
    await assertRootSubstate(page, 'data-help-state', 'data-help-panel', 'article', '25 article')
    const dialog = page.getByRole('dialog', { name: 'Start with your first Balencia plan', exact: true })
    const text = (await dialog.innerText()).replace(/\s+/g, ' ')
    assert(text.includes('Updated Jun 2026') && text.includes('Source: bundled Balencia help index'), '25 article: freshness/source provenance missing')
    await assertDialogTrap(page, dialog, trigger, '25 article', { close: false })
    await capture(handle, '25-article')
    await closeDialogWithRestoration(page, dialog, trigger, '25 article')
  })

  // ——— S50 — Profile edit ———
  for (const state of SCREEN_CONTRACTS['50'].states) {
    await stateCapture('50', state, {
      beforeCapture: async ({ page }) => {
        const root = page.locator('[data-profile-state]')
        assert(await page.locator('[data-testid="screen-shell"] > nav').count() === 0, '50 ' + state + ': global tab bar must be hidden')
        if (state !== 'skeleton') {
          const firstName = page.getByLabel('First name', { exact: true })
          const lastName = page.getByLabel('Last name', { exact: true })
          const phone = page.getByLabel('Phone (optional)', { exact: true })
          assert(await firstName.getAttribute('type') === 'text', '50 ' + state + ': native first-name field missing')
          assert(await lastName.getAttribute('type') === 'text', '50 ' + state + ': native last-name field missing')
          assert(await phone.getAttribute('type') === 'tel', '50 ' + state + ': phone must be type=tel')
          assert(await firstName.getAttribute('autocomplete') === 'given-name', '50 ' + state + ': first-name input purpose missing')
          assert(await lastName.getAttribute('autocomplete') === 'family-name', '50 ' + state + ': last-name input purpose missing')
          assert(await phone.getAttribute('autocomplete') === 'tel', '50 ' + state + ': phone input purpose missing')
          const about = page.getByLabel('About you (optional)', { exact: true })
          assert(await about.evaluate(node => node.tagName === 'TEXTAREA' && node.maxLength === 160), '50 ' + state + ': About textarea/maxLength contract missing')
        }
        const save = page.getByRole('button', { name: 'Save changes', exact: true })
        if (state === 'default') {
          assert(await root.getAttribute('data-form-dirty') === 'false' && await root.getAttribute('data-form-valid') === 'true', '50 default: clean valid root contract drifted')
          assert(await save.isDisabled(), '50 default: unchanged Save must be disabled')
          assert(await page.getByRole('progressbar').getAttribute('aria-valuenow') === '6', '50 default: completeness must be 6 of 8')
          assert(await page.getByText('75% · 2 optional signals remaining', { exact: true }).count() === 1, '50 default: 75 percent truth missing')
          assert(await page.getByText('You logged', { exact: true }).count() === 1, '50 default: You logged provenance missing')
          assert(await page.locator('input[type="file"]').count() === 0, '50 default: file input violates honest-null avatar disposition')
        }
        if (state === 'partial') {
          assert(await page.getByRole('progressbar').getAttribute('aria-valuenow') === '2', '50 partial: completeness must be 2 of 8')
          assert(await page.getByText('25% · 6 optional signals remaining', { exact: true }).count() === 1, '50 partial: 25 percent truth missing')
        }
        if (state === 'invalid') {
          assert(await root.getAttribute('data-form-dirty') === 'true' && await root.getAttribute('data-form-valid') === 'false', '50 invalid: dirty/valid attributes drifted')
          assert(await page.getByText('Enter a valid phone number or leave this optional field empty.', { exact: true }).count() === 1, '50 invalid: text error missing')
          assert(await save.isDisabled(), '50 invalid: Save should be disabled')
        }
        if (state === 'offline') {
          assert(await root.getAttribute('data-form-dirty') === 'true', '50 offline: preserved edit is not dirty')
          assert(await save.isDisabled(), '50 offline: Save must be disabled')
          assert(await page.getByText(/Save disabled offline.*local edits remain/).count() === 1, '50 offline: preservation reason missing')
        }
        if (state === 'error') {
          assert(await root.getAttribute('data-form-dirty') === 'true', '50 error: retry edit is not preserved')
          assert(await save.isEnabled(), '50 error: valid preserved edit should remain operable for local retry')
        }
      },
      afterCapture: state === 'error' ? async ({ page }) => {
        const about = page.getByLabel('About you (optional)', { exact: true })
        const value = await about.inputValue()
        await page.getByRole('button', { name: 'Save changes', exact: true }).click()
        assert(await about.inputValue() === value, '50 error: Save failure lost the preserved edit')
        assert((await liveStatusText(page)).includes('Save failed in this deterministic error fixture'), '50 error: honest failed-save outcome missing')
      } : state === 'invalid' ? async ({ page }) => {
        const root = page.locator('[data-profile-state]')
        await page.getByLabel('About you (optional)', { exact: true }).fill('Unrelated local edit')
        assert(await root.getAttribute('data-profile-state') === 'invalid', '50 invalid: unrelated edit cleared the invalid state')
        assert(await root.getAttribute('data-form-valid') === 'false', '50 invalid: unrelated edit fabricated form validity')
        assert(await page.getByText('Enter a valid phone number or leave this optional field empty.', { exact: true }).count() === 1, '50 invalid: text error disappeared after unrelated edit')
      } : undefined,
    })
  }

  for (const dirtyCase of [
    { name: '50-dirty-valid', dirty: 'valid', expectedValid: 'true' },
    { name: '50-dirty-invalid', dirty: 'invalid', expectedValid: 'false' },
  ]) {
    await runCase({ name: dirtyCase.name, id: '50', state: 'default', rootAttribute: 'data-profile-state', rootState: 'default', query: { dirty: dirtyCase.dirty } }, async handle => {
      const { page } = handle
      await auditFixture(handle)
      const root = page.locator('[data-profile-state]')
      assert(await root.getAttribute('data-form-dirty') === 'true', dirtyCase.name + ': dirty state missing')
      assert(await root.getAttribute('data-form-valid') === dirtyCase.expectedValid, dirtyCase.name + ': validity state drifted')
      const save = page.getByRole('button', { name: 'Save changes', exact: true })
      if (dirtyCase.expectedValid === 'true') {
        assert(await save.isEnabled(), dirtyCase.name + ': valid dirty Save must be enabled irrespective of optional completeness')
      } else {
        assert(await save.isDisabled(), dirtyCase.name + ': invalid dirty Save must be disabled')
        assert(await page.getByText('Enter a valid phone number or leave this optional field empty.', { exact: true }).count() === 1, dirtyCase.name + ': visible validation text missing')
      }
      await capture(handle, dirtyCase.name)
    })
  }

  await runCase({ name: '50-photo-consent', id: '50', state: 'default', rootAttribute: 'data-profile-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Profile photo not added. Review consent before previewing a photo picker.', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-profile-state', 'data-profile-panel', 'photo-consent', '50 photo consent')
    const dialog = page.getByRole('dialog', { name: 'Profile photo consent', exact: true })
    await assertExactDataControls(page, 'Profile photo data controls', '50 photo consent')
    const decline = dialog.getByRole('button', { name: 'Not now', exact: true })
    const allow = dialog.getByRole('button', { name: 'Allow local preview', exact: true })
    await equalExit(decline, allow, '50 photo consent exits')
    await assertDialogTrap(page, dialog, trigger, '50 photo consent', { close: false })
    await capture(handle, '50-photo-consent')
    await allow.click()
    await waitAttribute(page, '[data-profile-state]', 'data-profile-panel', 'picker-preview')
    await waitAttribute(page, '[data-profile-state]', 'data-photo-consent', 'accepted')
    assert(await page.getByRole('dialog', { name: 'Photo picker preview', exact: true }).count() === 1, '50 photo consent: picker-preview outcome missing')
    assert(await page.locator('input[type="file"]').count() === 0, '50 photo consent: a file picker was created')
    assert(await page.getByText('No image selected', { exact: true }).count() === 1, '50 photo consent: honest-null picker result missing')
  })

  await runCase({ name: '50-unsaved-exit', id: '50', state: 'default', rootAttribute: 'data-profile-state', rootState: 'default', query: { dirty: 'valid' } }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Back to Me', exact: true })
    const original = await page.getByLabel('About you (optional)', { exact: true }).inputValue()
    await trigger.click()
    await assertRootSubstate(page, 'data-profile-state', 'data-profile-panel', 'discard', '50 unsaved exit')
    const dialog = page.getByRole('alertdialog', { name: 'Discard unsaved changes?', exact: true })
    await equalExit(dialog.getByRole('button', { name: 'Keep editing', exact: true }), dialog.getByRole('button', { name: 'Discard and return', exact: true }), '50 discard exits')
    await assertDialogTrap(page, dialog, trigger, '50 unsaved exit', { close: false })
    await capture(handle, '50-unsaved-exit')
    await closeDialogWithRestoration(page, dialog, trigger, '50 unsaved exit')
    assert(await page.getByLabel('About you (optional)', { exact: true }).inputValue() === original, '50 unsaved exit: Keep editing/Escape lost field value')
  })

  await runCase({ name: '50-delete-confirm', id: '50', state: 'default', rootAttribute: 'data-profile-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Delete account', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-profile-state', 'data-profile-panel', 'delete', '50 delete')
    const dialog = page.getByRole('alertdialog', { name: 'Delete account preview', exact: true })
    await equalExit(dialog.getByRole('button', { name: 'Keep account', exact: true }), dialog.getByRole('button', { name: 'Review locally', exact: true }), '50 delete exits')
    await assertDialogTrap(page, dialog, trigger, '50 delete', { close: false })
    await capture(handle, '50-delete-confirm')
    await closeDialogWithRestoration(page, dialog, trigger, '50 delete')
  })

  await runCase({ name: '50-enlarged-bottom', id: '50', state: 'default', rootAttribute: 'data-profile-state', rootState: 'default', textScale: 1.25, query: { dirty: 'valid' } }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const save = page.getByRole('button', { name: 'Save changes', exact: true })
    assert(await save.isEnabled(), '50 enlarged: sticky Save should remain enabled for valid dirty state')
    const reason = page.locator('#profile-save-reason')
    await reason.scrollIntoViewIfNeeded()
    await twoAnimationFrames(page)
    await fullyVisibleInPhone(page, save, '50 enlarged sticky Save')
    await fullyVisibleInPhone(page, reason, '50 enlarged Save reason')
    await capture(handle, '50-enlarged-bottom', { top: false })
  })

  // Eight screenshot-free contexts prove 125% text-only enlargement across
  // the entire family without changing the frozen 91-PNG manifest.
  for (const id of TEXT_SCALE_IDS) {
    const contract = SCREEN_CONTRACTS[id]
    await runCase({
      name: id + '-text-scale-proof',
      id,
      state: 'default',
      rootAttribute: contract.root,
      rootState: 'default',
      textScale: 1.25,
    }, async handle => {
      await auditFixture(handle)
      pass('D1 125% text matrix ' + id, { scale: 1.25, screenshot: false })
    })
  }

  // ——— Closeout: atomic evidence, integrity, and capability boundary ———
  screenshotEvidence = await validateStagedScreenshots()
  assert(consoleErrors.length === 0, 'Console errors: ' + consoleErrors.map(item => item.case + ':' + item.text).join(' | '))
  assert(pageErrors.length === 0, 'Page errors: ' + pageErrors.map(item => item.case + ':' + item.text).join(' | '))
  assertCapabilityContract()
  fingerprintsEnd = fingerprintAll()
  assert(sameFingerprint(fingerprintsStart, fingerprintsEnd), 'Product/API/authority/accepted-sentinel fingerprint drifted during verification')
  for (const entry of fingerprintsEnd.accepted.files) {
    assert(entry.sha256 === ACCEPTED_EXPECTED.get(entry.path), 'Accepted sentinel drifted: ' + entry.path)
  }
  assert(visitedNonces.size === caseEvidence.length && caseEvidence.length === EXPECTED_CONTEXTS, 'Expected 99 isolated contexts/nonces (91 captures + 8 text proofs), found ' + caseEvidence.length + '/' + visitedNonces.size)
  promotionBackupDir = promoteScreenshots()
  pass('atomic screenshot set', { count: screenshotEvidence.length, dimensions: '390x844', hashes: screenshotEvidence.length, promotedAfterPass: true })
  pass('source integrity', { product: fingerprintsEnd.product.digest, api: fingerprintsEnd.api.digest, authority: fingerprintsEnd.authority.digest, accepted: fingerprintsEnd.accepted.digest })
  pass('accepted sentinels byte-identical', { files: ACCEPTED_SENTINEL_FILES.length })
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
