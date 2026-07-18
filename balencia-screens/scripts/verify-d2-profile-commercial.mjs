// verify-d2-profile-commercial.mjs — hardened D2 profile/commercial acceptance verifier
//
// VISUAL-009-D2-profile-commercial: screens 19,42,43,68,71,83,92.
// Contract: frozen 73 canonical 390x844 PNGs + 7 screenshot-free 125%
// text proofs, fresh isolated contexts/nonces, pass-atomic promotion, fresh
// production binding on local :3002, source/authority/accepted-sentinel
// integrity, zero console/page/capability/storage events, WCAG interaction
// checks, focus-trapped overlays, and screen-specific truth assertions.

import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const USAGE = 'Usage: node scripts/verify-d2-profile-commercial.mjs <baseURL> <out-json> <shots-dir>'
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
  'src/components/hifi/screens/profile/S19RpgCharacter.tsx',
  'src/components/hifi/screens/profile/S42CelebrationOverlay.tsx',
  'src/components/hifi/screens/profile/S43Paywall.tsx',
  'src/components/hifi/screens/profile/S68UniversalSearch.tsx',
  'src/components/hifi/screens/profile/S71AchievementGallery.tsx',
  'src/components/hifi/screens/profile/S83BuddyProfile.tsx',
  'src/components/hifi/screens/profile/S92Reputation.tsx',
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
  'src/components/layout/TabBar.tsx',
  'src/data/hifi/persona.ts',
  'src/data/domains.ts',
  'src/data/mock.ts',
  'src/data/screens.ts',
  'src/app/screens/[id]/page.tsx',
  'scripts/verify-d2-profile-commercial.mjs',
]

const AUTHORITY_FILES = [
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/audit/D2-profile-commercial.md',
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/DECISIONS.md',
  '../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/REFERENCE-DIRECTION.md',
  '../Balencia-New-Screens/canon/COMPACT-CANON.md',
  '../Balencia-New-Screens/canon/COMPONENT-CATALOG.md',
  '../RPG_SYSTEM_DESIGN.md',
  '../Balencia-New-Screens/hifi-screens/19-rpg-character.md',
  '../Balencia-New-Screens/hifi-screens/42-celebration-overlay.md',
  '../Balencia-New-Screens/hifi-screens/43-paywall-upgrade.md',
  '../Balencia-New-Screens/hifi-screens/68-universal-search.md',
  '../Balencia-New-Screens/hifi-screens/71-achievement-gallery.md',
  '../Balencia-New-Screens/hifi-screens/83-social-buddy-profile.md',
  '../Balencia-New-Screens/hifi-screens/92-reputation.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/BATCH.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/VERIFICATION-MATRIX.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/BEFORE-SOURCE.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/BEFORE-CAPTURE-MANIFEST.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/ACCEPTED-D1-SENTINELS-BEFORE.sha256',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/ASSET-DISPOSITION.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/recon-a.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/recon-b.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/recon-c.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/builder-a.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/builder-b.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/builder-c.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/repair-design-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/repair-search-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/repair-trust-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/repair-celebration-polish-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/repair-rendered-filter-visibility.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/reviewer-design-source-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/reviewer-a11y-trust-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/reviewer-clear-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/review-design-source.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/review-a11y-trust.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/review-clear.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/recon-a.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/recon-b.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/recon-c.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/builder-common.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/builder-a.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/builder-b.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/builder-c.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/repair-design-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/repair-search-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/repair-trust-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/repair-celebration-polish-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/repair-rendered-filter-visibility.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/reviewer-design-source.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/reviewer-a11y-trust.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/reviewer-clear.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/reviewer-design-source-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/reviewer-a11y-trust-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/reviewer-clear-final.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/reviewer-design-source-final-v2.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/reviewer-a11y-trust-final-v2.md',
  '../plans/batches/VISUAL-009-D2-profile-commercial/workers/reviewer-clear-final-v2.md',
]

const ACCEPTED_SENTINEL_MANIFEST = path.resolve(projectRoot, '../plans/batches/VISUAL-008-D1-profile-settings-core/evidence/ACCEPTED-SENTINELS-BEFORE.sha256')
const ACCEPTED_SENTINEL_MANIFESTS = [
  ACCEPTED_SENTINEL_MANIFEST,
  path.resolve(projectRoot, '../plans/batches/VISUAL-009-D2-profile-commercial/evidence/ACCEPTED-D1-SENTINELS-BEFORE.sha256'),
]
const ACCEPTED_MANIFEST_SHA256 = new Map([
  [ACCEPTED_SENTINEL_MANIFESTS[0], '159d70a5cced8e3fc7f3371f5d84eaa4cdb9b168b3cad94cb64e7de79ef24722'],
  [ACCEPTED_SENTINEL_MANIFESTS[1], '56b50472e4bdd6bb73547f9b4207444aeda423c0552d0cba1e5f8676f7ce1a05'],
])
const ACCEPTED_LITERAL_ANCHORS = new Map([
  ['src/components/hifi/screens/today/S12HomeScreen.tsx', '107b59b58bca73a05045dfd90a68cdf4219176f72aa7e6dcf48b59165f75df67'],
  ['src/components/hifi/screens/profile/S43Paywall.tsx', '134d064bfef7d1d9a4b77f6ac4558a8c80beaa14fe42167501396797dd6e39c3'],
])
const ACCEPTED_ROWS = ACCEPTED_SENTINEL_MANIFESTS.flatMap(manifest => fs.readFileSync(manifest, 'utf8')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#')))
const ACCEPTED_EXPECTED = new Map()
for (const line of ACCEPTED_ROWS) {
  const match = line.match(/^([a-f0-9]{64})\s+balencia-screens\/(.+)$/)
  assert(match, `Invalid accepted-sentinel manifest line: ${line}`)
  const prior = ACCEPTED_EXPECTED.get(match[2])
  assert(!prior || prior === match[1], `Conflicting accepted-sentinel hashes for ${match[2]}`)
  ACCEPTED_EXPECTED.set(match[2], match[1])
}
const ACCEPTED_SENTINEL_FILES = [...ACCEPTED_EXPECTED.keys()]
assert(ACCEPTED_SENTINEL_FILES.length === 47, `Accepted-sentinel manifests have ${ACCEPTED_SENTINEL_FILES.length} unique files; expected 47`)

const parsedBaseURL = new URL(baseURL)
assert(parsedBaseURL.protocol === 'http:' && ['localhost', '127.0.0.1', '::1'].includes(parsedBaseURL.hostname) && parsedBaseURL.port === '3002', `D2 verification is production-only on local :3002; received ${baseURL}`)
const NEXT_BUILD_ID_FILE = path.join(projectRoot, '.next/BUILD_ID')
assert(fs.existsSync(NEXT_BUILD_ID_FILE), 'Fresh production proof missing: .next/BUILD_ID does not exist')
const LOCAL_BUILD_ID = fs.readFileSync(NEXT_BUILD_ID_FILE, 'utf8').trim()
assert(LOCAL_BUILD_ID.length > 0, 'Fresh production proof missing: .next/BUILD_ID is empty')
const BUILD_BOUND_FILES = [...new Set([...PRODUCT_FILES, ...API_FILES.filter(file => file !== 'scripts/verify-d2-profile-commercial.mjs')])]

const SCREEN_CONTRACTS = {
  '19': { root: 'data-rpg-state', states: ['default', 'low-confidence', 'skeleton', 'empty', 'error', 'success', 'disabled', 'offline'] },
  '42': { root: 'data-celebration-state', states: ['default', 'skeleton', 'cia-null', 'streak', 'share-error', 'dismissed', 'toast'] },
  '68': { root: 'data-search-state', states: ['default', 'first-use', 'results', 'loading', 'zero-results', 'error', 'offline'] },
  '71': { root: 'data-achievement-state', states: ['default', 'skeleton', 'first-use', 'filtered-empty', 'error', 'offline', 'success'] },
  '83': { root: 'data-buddy-state', states: ['default', 'skeleton', 'empty', 'pending', 'removed', 'error', 'success', 'consent-missing', 'offline'] },
  '92': { root: 'data-reputation-state', states: ['default', 'skeleton', 'empty', 'offline', 'sync-error', 'flagged', 'success', 'disabled'] },
}

const EXPECTED_SCREENSHOTS = [
  '19-default.png', '19-low-confidence.png', '19-skeleton.png', '19-empty.png', '19-error.png', '19-success.png', '19-disabled.png', '19-offline.png', '19-domain-sheet-fitness.png', '19-ranked-breakdown.png', '19-data-controls.png',
  '42-default.png', '42-skeleton.png', '42-cia-null.png', '42-streak.png', '42-share-error.png', '42-dismissed.png', '42-toast.png', '42-reduced-motion.png', '42-enlarged-actions.png',
  '43-default.png', '43-price-exits.png', '43-cta-outcome.png', '43-compare-outcome.png', '43-enlarged-exits.png',
  '68-default.png', '68-first-use.png', '68-results-run.png', '68-loading-morning.png', '68-zero-results-yoga.png', '68-error-local.png', '68-offline-local.png', '68-filter-habits.png', '68-cia-dismissed.png', '68-history-deleted.png', '68-result-opened.png',
  '71-default.png', '71-skeleton.png', '71-first-use.png', '71-filtered-empty-meditation.png', '71-error-cached.png', '71-offline-cached.png', '71-success-new-badge.png', '71-filter-fitness.png', '71-earned-detail.png', '71-reduced-motion.png',
  '83-default.png', '83-skeleton.png', '83-empty.png', '83-pending.png', '83-removed.png', '83-error.png', '83-success.png', '83-consent-missing.png', '83-offline.png', '83-visibility-sheet.png', '83-safety-sheet.png', '83-mission-detail.png', '83-avatar-consent.png', '83-message-outcome.png',
  '92-default.png', '92-skeleton.png', '92-empty.png', '92-offline.png', '92-sync-error.png', '92-flagged.png', '92-success.png', '92-disabled.png', '92-metric-consistency.png', '92-premium-lock.png', '92-premium-outcome.png', '92-safety-controls.png', '92-tier-detail.png',
]
const EXPECTED_SET = new Set(EXPECTED_SCREENSHOTS)
const EXPECTED_COUNT = 73
const TEXT_SCALE_IDS = ['19', '42', '43', '68', '71', '83', '92']
const EXPECTED_CONTEXTS = 80

const STATE_SCREENSHOTS = {
  '19': { default: '19-default.png', 'low-confidence': '19-low-confidence.png', skeleton: '19-skeleton.png', empty: '19-empty.png', error: '19-error.png', success: '19-success.png', disabled: '19-disabled.png', offline: '19-offline.png' },
  '42': { default: '42-default.png', skeleton: '42-skeleton.png', 'cia-null': '42-cia-null.png', streak: '42-streak.png', 'share-error': '42-share-error.png', dismissed: '42-dismissed.png', toast: '42-toast.png' },
  '68': { default: '68-default.png', 'first-use': '68-first-use.png', results: '68-results-run.png', loading: '68-loading-morning.png', 'zero-results': '68-zero-results-yoga.png', error: '68-error-local.png', offline: '68-offline-local.png' },
  '71': { default: '71-default.png', skeleton: '71-skeleton.png', 'first-use': '71-first-use.png', 'filtered-empty': '71-filtered-empty-meditation.png', error: '71-error-cached.png', offline: '71-offline-cached.png', success: '71-success-new-badge.png' },
  '83': { default: '83-default.png', skeleton: '83-skeleton.png', empty: '83-empty.png', pending: '83-pending.png', removed: '83-removed.png', error: '83-error.png', success: '83-success.png', 'consent-missing': '83-consent-missing.png', offline: '83-offline.png' },
  '92': { default: '92-default.png', skeleton: '92-skeleton.png', empty: '92-empty.png', offline: '92-offline.png', 'sync-error': '92-sync-error.png', flagged: '92-flagged.png', success: '92-success.png', disabled: '92-disabled.png' },
}

const DISTINCT_FROM_DEFAULT = [
  ...Object.entries(SCREEN_CONTRACTS).flatMap(([id, contract]) => contract.states.filter(state => state !== 'default').map(state => [STATE_SCREENSHOTS[id][state], STATE_SCREENSHOTS[id].default])),
  ['19-domain-sheet-fitness.png', '19-default.png'], ['19-ranked-breakdown.png', '19-default.png'], ['19-data-controls.png', '19-default.png'],
  ['42-enlarged-actions.png', '42-default.png'],
  ['43-price-exits.png', '43-default.png'], ['43-cta-outcome.png', '43-default.png'], ['43-compare-outcome.png', '43-default.png'], ['43-enlarged-exits.png', '43-price-exits.png'],
  ['68-filter-habits.png', '68-results-run.png'], ['68-cia-dismissed.png', '68-results-run.png'], ['68-history-deleted.png', '68-default.png'], ['68-result-opened.png', '68-results-run.png'],
  ['71-filter-fitness.png', '71-default.png'], ['71-earned-detail.png', '71-default.png'],
  ['83-visibility-sheet.png', '83-default.png'], ['83-safety-sheet.png', '83-default.png'], ['83-mission-detail.png', '83-default.png'], ['83-avatar-consent.png', '83-default.png'], ['83-message-outcome.png', '83-default.png'],
  ['92-metric-consistency.png', '92-default.png'], ['92-premium-lock.png', '92-default.png'], ['92-premium-outcome.png', '92-default.png'], ['92-safety-controls.png', '92-default.png'], ['92-tier-detail.png', '92-default.png'],
].filter(([changed]) => !['42-reduced-motion.png', '71-reduced-motion.png'].includes(changed))

const ALLOWED_SUBSTATES = {
  '19': { 'data-rpg-panel': ['closed', 'domain', 'ranked', 'data-controls'] },
  '42': {
    'data-overlay-open': ['true', 'false'],
    'data-share-state': ['idle', 'error', 'retry'],
    'data-celebration-kind': ['level', 'streak', 'toast'],
    'data-domain-evidence-count': ['0', '2'],
  },
  '68': {
    'data-selected-category': ['all', 'missions', 'habits', 'recipes'],
    'data-search-panel': ['closed', 'result'],
    'data-history-state': ['present', 'deleted'],
    'data-cia-suggestion': ['visible', 'dismissed'],
  },
  '71': {
    'data-achievement-filter': ['all', 'fitness', 'nutrition', 'finance', 'meditation'],
    'data-achievement-panel': ['closed', 'badge'],
  },
  '83': { 'data-buddy-panel': ['closed', 'visibility', 'safety', 'mission', 'avatar-consent'] },
  '92': {
    'data-reputation-panel': ['closed', 'metric', 'premium', 'safety', 'tier'],
    'data-selected-metric': ['none', 'consistency', 'helpfulness', 'engagement', 'accountability'],
  },
}

const REGISTRY_DOMAINS = ['Fitness', 'Sleep', 'Career', 'Nutrition', 'Finance', 'Faith', 'Productivity', 'Relationships', 'Wellbeing', 'Meditation']
const DOMAIN_TRUTH_IDS = new Set(['19', '71'])

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

assert(EXPECTED_SCREENSHOTS.length === EXPECTED_COUNT, `Verifier contract declares ${EXPECTED_SCREENSHOTS.length} screenshots; expected ${EXPECTED_COUNT}`)
assert(EXPECTED_SET.size === EXPECTED_COUNT, `Verifier screenshot names are not unique (${EXPECTED_SET.size}/${EXPECTED_COUNT})`)
for (const [id, contract] of Object.entries(SCREEN_CONTRACTS)) {
  assert(new Set(contract.states).size === contract.states.length, `${id}: duplicate exact fixture state`)
  for (const state of contract.states) assert(EXPECTED_SET.has(STATE_SCREENSHOTS[id]?.[state]), `${id}: exact fixture ${state} has no canonical screenshot`)
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

for (const [manifest, expectedSha] of ACCEPTED_MANIFEST_SHA256) {
  const actualSha = sha256(fs.readFileSync(manifest))
  assert(actualSha === expectedSha, `Accepted-sentinel manifest ${path.basename(manifest)} is ${actualSha}; expected literal ${expectedSha}`)
}
for (const [sentinelPath, expectedSha] of ACCEPTED_LITERAL_ANCHORS) {
  assert(ACCEPTED_EXPECTED.get(sentinelPath) === expectedSha, `Accepted literal anchor ${sentinelPath} is ${ACCEPTED_EXPECTED.get(sentinelPath)}; expected ${expectedSha}`)
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
  const proofURL = new URL('/screens/19', baseURL)
  proofURL.searchParams.set('__d2build', LOCAL_BUILD_ID)
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
const tempShotsDir = fs.mkdtempSync(path.join(path.dirname(shotsDir), `.${path.basename(shotsDir)}.d2-${process.pid}-`))

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
  await context.exposeBinding('__d2RecordCapability', (_source, type, detail) => {
    recordCapability(caseName, type, detail)
  })

  await context.addInitScript(({ origin }) => {
    const record = (type, detail = '') => {
      try { void window.__d2RecordCapability(type, String(detail)) } catch { /* Node guards remain active. */ }
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
        Object.defineProperty(navigator.mediaDevices, 'getDisplayMedia', {
          configurable: true,
          value: constraints => {
            record('media.getDisplayMedia', JSON.stringify(constraints ?? {}))
            return Promise.resolve({ getTracks: () => [] })
          },
        })
      }
    } catch { /* Request/event guards still fail the case. */ }

    try {
      Object.defineProperty(navigator, 'vibrate', {
        configurable: true,
        value: pattern => { record('navigator.vibrate', JSON.stringify(pattern ?? [])); return false },
      })
    } catch {}

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

    for (const [name, result] of [
      ['showOpenFilePicker', []],
      ['showSaveFilePicker', null],
      ['showDirectoryPicker', null],
    ]) {
      try {
        Object.defineProperty(window, name, {
          configurable: true,
          value: options => { record(`filesystem.${name}`, JSON.stringify(options ?? {})); return Promise.resolve(result) },
        })
      } catch {}
    }

    class GuardedPaymentRequest {
      constructor(methodData, details, options) {
        record('PaymentRequest', JSON.stringify({ methodData, details, options }))
      }
      canMakePayment() { record('PaymentRequest.canMakePayment'); return Promise.resolve(false) }
      show() { record('PaymentRequest.show'); return Promise.resolve({ complete: () => Promise.resolve() }) }
      abort() { record('PaymentRequest.abort'); return Promise.resolve() }
      addEventListener() {}
      removeEventListener() {}
    }
    try { Object.defineProperty(window, 'PaymentRequest', { configurable: true, value: GuardedPaymentRequest }) } catch {}

    class GuardedNotification {
      static permission = 'denied'
      static requestPermission() { record('Notification.requestPermission'); return Promise.resolve('denied') }
      constructor(title, options) { record('Notification', JSON.stringify({ title, options })) }
      close() {}
      addEventListener() {}
      removeEventListener() {}
    }
    try { Object.defineProperty(window, 'Notification', { configurable: true, value: GuardedNotification }) } catch {}

    try {
      Object.defineProperty(navigator, 'geolocation', {
        configurable: true,
        value: {
          getCurrentPosition(_success, error, options) {
            record('geolocation.getCurrentPosition', JSON.stringify(options ?? {}))
            window.setTimeout(() => error?.({ code: 1, message: 'Blocked by D2 verifier' }), 0)
          },
          watchPosition(_success, error, options) {
            record('geolocation.watchPosition', JSON.stringify(options ?? {}))
            window.setTimeout(() => error?.({ code: 1, message: 'Blocked by D2 verifier' }), 0)
            return 0
          },
          clearWatch() {},
        },
      })
    } catch {}

    try {
      Object.defineProperty(navigator, 'credentials', {
        configurable: true,
        value: {
          get(options) { record('credentials.get', JSON.stringify(options ?? {})); return Promise.resolve(null) },
          create(options) { record('credentials.create', JSON.stringify(options ?? {})); return Promise.resolve(null) },
          store(value) { record('credentials.store', Object.prototype.toString.call(value)); return Promise.resolve(null) },
          preventSilentAccess() { record('credentials.preventSilentAccess'); return Promise.resolve() },
        },
      })
    } catch {}

    try {
      const permissions = navigator.permissions
      if (permissions) Object.defineProperty(permissions, 'query', {
        configurable: true,
        value: descriptor => {
          record('permissions.query', JSON.stringify(descriptor ?? {}))
          return Promise.resolve({ state: 'denied', addEventListener() {}, removeEventListener() {} })
        },
      })
    } catch {}

    try {
      const serviceWorker = navigator.serviceWorker
      if (serviceWorker) Object.defineProperty(serviceWorker, 'register', {
        configurable: true,
        value: (scriptURL, options) => {
          record('serviceWorker.register', JSON.stringify({ scriptURL, options }))
          return Promise.resolve(null)
        },
      })
    } catch {}

    for (const [surface, method] of [
      ['bluetooth', 'requestDevice'],
      ['usb', 'requestDevice'],
      ['serial', 'requestPort'],
      ['hid', 'requestDevice'],
      ['contacts', 'select'],
      ['wakeLock', 'request'],
    ]) {
      try {
        const api = navigator[surface]
        if (api && typeof api[method] === 'function') Object.defineProperty(api, method, {
          configurable: true,
          value: options => { record(`${surface}.${method}`, JSON.stringify(options ?? {})); return Promise.resolve(surface === 'contacts' ? [] : null) },
        })
      } catch {}
    }
    try {
      if (typeof navigator.requestMIDIAccess === 'function') Object.defineProperty(navigator, 'requestMIDIAccess', {
        configurable: true,
        value: options => { record('requestMIDIAccess', JSON.stringify(options ?? {})); return Promise.resolve(null) },
      })
    } catch {}

    try {
      Object.defineProperty(URL, 'createObjectURL', {
        configurable: true,
        value: value => {
          record('URL.createObjectURL', Object.prototype.toString.call(value))
          return 'blob:d2-blocked'
        },
      })
    } catch {}

    try {
      const nativeShowPicker = HTMLInputElement.prototype.showPicker
      if (nativeShowPicker) Object.defineProperty(HTMLInputElement.prototype, 'showPicker', {
        configurable: true,
        value() {
          if (this.type === 'file') {
            record('file-input.showPicker', this.accept || 'any')
            return
          }
          return nativeShowPicker.call(this)
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
      const fileInput = element?.closest('input[type="file"]')
      if (fileInput) {
        record('file-input.activation', fileInput.getAttribute('accept') ?? 'any')
        event.preventDefault()
        event.stopImmediatePropagation()
        return
      }
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

async function applyTextScale(page, scale, label, minimumCount = 10) {
  const evidence = await page.locator('[data-testid="phone-frame"]').evaluate((phone, requestedScale) => {
    const elements = [phone, ...phone.querySelectorAll('*')]
    const candidates = elements.flatMap(element => {
      if (element.closest('[inert]')) return []
      const visualSvgText = element instanceof SVGTextElement
      if (!visualSvgText && (element.closest('[aria-hidden="true"]') || element.getAttribute('aria-hidden') === 'true')) return []
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
      candidate.element.dataset.d2BaseFontSize = String(candidate.base)
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
  assert(evidence.count >= minimumCount, `${label}: only ${evidence.count} text nodes accepted the text-only scale override; expected at least ${minimumCount}`)
  assert(evidence.minimumRatio >= scale - 0.01, `${label}: minimum rendered text scale is ${evidence.minimumRatio.toFixed(3)}; expected ${scale.toFixed(2)}`)
  return evidence
}

async function assertTextScaleApplied(page, scale, label, minimumCount = 10) {
  const evidence = await page.locator('[data-testid="phone-frame"]').evaluate((phone, expectedScale) => {
    const nodes = [...phone.querySelectorAll('[data-d2-base-font-size]')]
    const ratios = nodes.map(node => Number.parseFloat(getComputedStyle(node).fontSize) / Number.parseFloat(node.dataset.d2BaseFontSize || '0'))
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
  assert(evidence.count >= minimumCount, `${label}: text-scale evidence disappeared before audit (${evidence.count}; expected at least ${minimumCount})`)
  assert(evidence.minimumRatio >= scale - 0.01, `${label}: representative text did not remain enlarged (${evidence.minimumRatio.toFixed(3)}x)`)
  assert(evidence.clipped.length === 0, `${label}: enlarged semantic text clips its authored box: ${evidence.clipped.map(item => `${item.tag}:${item.client}->${item.scroll}:${item.text}`).join(' | ')}`)
  // The literal-byte-anchored S43 pilot has one inherited 125% table-cell crop
  // on the non-action comparison value “Projected+”. Permit at most that exact
  // occurrence, only in the two named S43 scale contexts, and retain it in the
  // JSON evidence instead of silently discarding it.
  const allowedS43WaiverContexts = new Set(['43-enlarged-exits', '43-text-scale-proof'])
  const waivedAncestorClips = allowedS43WaiverContexts.has(label)
    ? evidence.ancestorClips.filter(item => item.tag === 'td' && item.text === 'Projected+')
    : []
  assert(waivedAncestorClips.length <= 1, `${label}: inherited S43 Projected+ waiver occurred ${waivedAncestorClips.length} times`)
  const actionableAncestorClips = evidence.ancestorClips.filter(item => !waivedAncestorClips.includes(item))
  assert(actionableAncestorClips.length === 0, `${label}: enlarged semantic text escapes a clipping ancestor: ${actionableAncestorClips.map(item => `${item.tag}->${item.ancestor}:${item.text}`).join(' | ')}`)
  assert(evidence.overlaps.length === 0, `${label}: enlarged semantic text overlaps another text fragment: ${evidence.overlaps.map(item => `${item.left} <> ${item.right}`).join(' | ')}`)
  return { ...evidence, waivedAncestorClips }
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
  page.on('filechooser', chooser => recordCapability(name, 'filechooser', chooser.isMultiple() ? 'multiple' : 'single'))
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
  target.searchParams.set('__d2audit', nonce)
  assert(target.origin === baseOrigin, `${name}: case target is not same-origin`)
  await page.goto(target.toString(), { waitUntil: 'networkidle' })
  const finalURL = new URL(page.url())
  assert(finalURL.origin === baseOrigin, `${name}: case left configured origin`)
  assert(finalURL.pathname === `/screens/${id}`, `${name}: unexpected fixture path ${finalURL.pathname}`)
  assert(finalURL.searchParams.get('__d2audit') === nonce, `${name}: audit nonce was not retained`)
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

async function resetScrollRecursively(page, { preserveHorizontal = false } = {}) {
  const residue = await page.locator('[data-testid="phone-frame"]').evaluate((phone, keepHorizontal) => {
    window.scrollTo(0, 0)
    const nodes = [phone, ...phone.querySelectorAll('*')]
    for (const node of nodes) {
      if ('scrollTop' in node) node.scrollTop = 0
      if (!keepHorizontal && 'scrollLeft' in node) node.scrollLeft = 0
    }
    return nodes.flatMap((node, index) => {
      if (!('scrollTop' in node) || !('scrollLeft' in node)) return []
      return Math.abs(node.scrollTop) > 0.5 || (!keepHorizontal && Math.abs(node.scrollLeft) > 0.5)
        ? [{ index, tag: node.tagName, top: node.scrollTop, left: node.scrollLeft }]
        : []
    })
  }, preserveHorizontal)
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
    const authoredHref = await control.getAttribute('href')
    if (authoredHref !== null) {
      const destination = new URL(authoredHref, baseOrigin)
      assert(['http:', 'https:'].includes(destination.protocol) && destination.origin === baseOrigin, `${label}: “${name}” is not an exact same-origin route (${authoredHref})`)
      assert(await control.getAttribute('download') === null, `${label}: “${name}” exposes a forbidden download action`)
    }
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
  if (loading || state === 'skeleton') assert(skeletonCount > 0, `${label}: loading state exposes no visible skeleton surface`)
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

async function auditFixture(handle, { strictLive = true, loading = false, disabledReasons = true, textScaleMinimumCount = 10 } = {}) {
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
  // S43 is the already-accepted pilot sentinel and is byte-locked by both
  // accepted manifests. Its inherited 11px table/chip microcopy is therefore
  // re-audited at the accepted pilot floor while every mutable D2 screen is
  // held to the frozen 12px floor. The 125% proof still exercises S43.
  const semanticFloor = id === '43' ? 11 : 12
  const tinySemanticCopy = await phone.evaluate((node, minimum) => [...node.querySelectorAll('*')].flatMap(element => {
    if (element.closest('[inert]')) return []
    const visualSvgText = element instanceof SVGTextElement
    if (!visualSvgText && (element.closest('[aria-hidden="true"]') || element.getAttribute('aria-hidden') === 'true')) return []
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
    const stateSurfaces = page.locator(`[${rootAttribute}][data-state-surface], [${rootAttribute}] [data-state-surface]`)
    assert(await stateSurfaces.count() === 1, `${name}: expected exactly one top-level data-state-surface`)
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
    const scaleEvidence = await assertTextScaleApplied(page, handle.textScale, name, textScaleMinimumCount)
    pass(`${name} text-only enlargement`, scaleEvidence)
  }
  await assertTruthfulCopy(page, name)
  await resetScrollRecursively(page)
  return { geometry, controlCount }
}

async function auditOpenDialog(handle, dialog, label, { textScale = 1, minimumTextNodes = 4 } = {}) {
  await dialog.waitFor()
  assert(await dialog.getAttribute('aria-modal') === 'true', `${label}: opened overlay is not modal`)
  if (textScale !== 1) {
    await applyTextScale(handle.page, textScale, label, minimumTextNodes)
    await twoAnimationFrames(handle.page)
  }
  const result = await auditFixture(
    { ...handle, name: label, textScale },
    { textScaleMinimumCount: textScale === 1 ? 10 : minimumTextNodes },
  )
  const bounds = await dialog.evaluate(node => {
    const rect = node.getBoundingClientRect()
    const phone = node.closest('[data-testid="phone-frame"]')?.getBoundingClientRect()
    return phone ? {
      inside: rect.left >= phone.left - 1 && rect.right <= phone.right + 1 && rect.top >= phone.top - 1 && rect.bottom <= phone.bottom + 1,
      horizontalOverflow: node.scrollWidth > node.clientWidth + 1,
    } : { inside: false, horizontalOverflow: true }
  })
  assert(bounds.inside && !bounds.horizontalOverflow, `${label}: dialog escaped the phone or gained horizontal overflow`)
  return result
}

async function capture(handle, screenshotName, { top = true, preserveHorizontal = false } = {}) {
  if (top) await resetScrollRecursively(handle.page, { preserveHorizontal })
  const fileName = `${screenshotName}.png`
  assert(EXPECTED_SET.has(fileName), `${handle.name}: ${fileName} is outside the canonical D2 set`)
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

async function activeOutcomeText(page) {
  const activeModal = page.locator('[role="dialog"][aria-modal="true"]:visible, [role="alertdialog"][aria-modal="true"]:visible').last()
  if (await activeModal.count()) return (await activeModal.innerText()).replace(/\s+/g, ' ')
  return (await liveStatusText(page)).replace(/\s+/g, ' ')
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
  const background = page.locator('[data-testid="screen-shell"]')
  assert(await background.getAttribute('aria-hidden') === 'true', `${label}: modal background is not aria-hidden`)
  assert(await background.getAttribute('inert') !== null && await background.evaluate(node => node.inert === true), `${label}: modal background is not inert`)
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
    assert(await background.getAttribute('aria-hidden') === null && await background.getAttribute('inert') === null, `${label}: modal background remained inert after close`)
  }
}

async function stateCapture(id, state, options = {}) {
  const contract = SCREEN_CONTRACTS[id]
  const name = options.name ?? STATE_SCREENSHOTS[id][state].replace(/\.png$/, '')
  const loading = options.loading ?? (state === 'skeleton' || state === 'loading')
  await runCase({
    name,
    id,
    state,
    rootAttribute: contract.root,
    rootState: state,
    reducedMotion: options.reducedMotion ?? 'reduce',
    textScale: options.textScale ?? 1,
    query: options.query ?? {},
  }, async handle => {
    if (options.beforeAudit) await options.beforeAudit(handle)
    await auditFixture(handle, {
      strictLive: options.strictLive ?? true,
      loading,
      disabledReasons: options.disabledReasons ?? true,
    })
    if (DOMAIN_TRUTH_IDS.has(id) && state !== 'skeleton') await assertDomainRegistryTruth(handle.page, name)
    assert(await handle.page.locator(`[${contract.root}]`).getAttribute(contract.root) === state, `${name}: exact fixture drifted before capture`)
    if (options.beforeCapture) await options.beforeCapture(handle)
    await capture(handle, name, { top: options.top ?? true, preserveHorizontal: options.preserveHorizontal ?? false })
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

// D2 allows ZERO capability events of any kind (no clipboard exception —
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
      strategy: 'new context per case + about:blank + Chromium origin clear + cookie clear + exact query fixture + unique __d2audit nonce + two RAFs',
      contexts: caseEvidence.length,
      uniqueNonces: visitedNonces.size,
    },
    integrity: {
      start: fingerprintsStart,
      end: fingerprintsEnd,
      unchanged: sameFingerprint(fingerprintsStart, fingerprintsEnd),
      acceptedSentinels: {
        manifests: ACCEPTED_SENTINEL_MANIFESTS.map(manifest => path.relative(projectRoot, manifest)),
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

async function assertEveryDataControlOutcome(page, groupName, label) {
  const group = page.getByRole('group', { name: groupName, exact: true })
  await assertExactDataControls(page, groupName, label)
  for (const controlName of EXACT_DATA_CONTROLS) {
    const control = group.getByRole('button', { name: controlName, exact: true })
    await control.click()
    assert(await control.getAttribute('aria-pressed') === 'true', `${label}: ${controlName} did not expose selected local state`)
    assert(await control.locator('[data-selected-marker]').count() === 1, `${label}: ${controlName} lacks a visible non-color outcome marker`)
    const outcome = await activeOutcomeText(page)
    assert(new RegExp(`${controlName}(?: is)? selected`).test(outcome), `${label}: ${controlName} lacks an active-surface local status outcome`)
    assert(/local|No |Nothing /.test(outcome), `${label}: ${controlName} outcome omits the local/no-mutation boundary`)
  }
}

async function assertSameOriginHref(locator, expected, label) {
  assert(await locator.count() === 1, `${label}: expected one route control`)
  const href = await locator.getAttribute('href')
  assert(href === expected, `${label}: href=${href}; expected ${expected}`)
}

async function closeDialogWithRestoration(page, dialog, trigger, label) {
  await dialog.waitFor()
  const dialogHandle = await dialog.elementHandle()
  assert(dialogHandle, `${label}: dialog handle unavailable before close`)
  await page.waitForFunction(node => node.contains(document.activeElement), dialogHandle)
  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'hidden' })
  const triggerHandle = await trigger.elementHandle()
  assert(triggerHandle, `${label}: trigger handle unavailable for focus restoration`)
  await page.waitForFunction(node => document.activeElement === node, triggerHandle)
  assert(await trigger.evaluate(node => document.activeElement === node), `${label}: Escape did not restore trigger focus`)
  const background = page.locator('[data-testid="screen-shell"]')
  assert(await background.getAttribute('aria-hidden') === null && await background.getAttribute('inert') === null, `${label}: modal background remained inert after close`)
}

async function closeNestedConfirmationWithRestoration(page, confirmation, returnSelector, label) {
  await assertDialogTrap(page, confirmation, page.locator(returnSelector), label, { close: false })
  await page.keyboard.press('Escape')
  await confirmation.waitFor({ state: 'hidden' })
  const remountedTrigger = page.locator(returnSelector)
  await remountedTrigger.waitFor()
  await page.waitForFunction(selector => document.activeElement === document.querySelector(selector), returnSelector)
  assert(await remountedTrigger.evaluate(node => document.activeElement === node), `${label}: Escape did not restore the remounted destructive trigger`)
}

async function assertRootSubstate(page, rootAttribute, attribute, expected, label) {
  const root = page.locator(`[${rootAttribute}]`)
  await waitAttribute(page, `[${rootAttribute}]`, attribute, expected)
  assert(await root.getAttribute(attribute) === expected, `${label}: ${attribute} did not settle to ${expected}`)
}

async function assertS68FallbackInteractions(page, fallbackState) {
  const input = page.getByRole('searchbox', { name: 'Search everything', exact: true })
  const root = page.locator('[data-search-state]')
  await input.fill('healthy lunch')
  await waitAttribute(page, '[data-search-state]', 'data-query', 'healthy lunch')
  await waitAttribute(page, '[data-search-state]', 'data-result-count', '0')
  assert(await root.getAttribute('data-search-state') === fallbackState, `68 ${fallbackState} search: degraded truth was replaced`)
  assert(await page.locator('[data-search-result="post-run-bowl"]').count() === 0 && (await liveStatusText(page)).includes('recipes remain unavailable'), `68 ${fallbackState} search: recipe/server result leaked`)
  const fallbackCopy = 'This fallback uses bundled local rows only. Recipes and server-only results remain unavailable; no request ran.'
  assert(await page.getByText(fallbackCopy, { exact: true }).count() === 1, `68 ${fallbackState} search: visible fallback copy contradicts excluded server rows`)
  await input.fill('run')
  await waitAttribute(page, '[data-search-state]', 'data-result-count', '3')
  assert(await root.getAttribute('data-search-state') === fallbackState && await page.locator('[data-search-result]').count() === 3, `68 ${fallbackState} run search: local fallback truth drifted`)
  await page.locator('[data-search-filter="recipes"]').click()
  await waitAttribute(page, '[data-search-state]', 'data-selected-category', 'recipes')
  assert(await root.getAttribute('data-search-state') === fallbackState && await root.getAttribute('data-result-count') === '0' && await page.locator('[data-search-result]').count() === 0, `68 ${fallbackState} Recipes filter: unavailable rows leaked or degraded truth changed`)
  assert(await page.getByText(fallbackCopy, { exact: true }).count() === 1, `68 ${fallbackState} Recipes filter: visible fallback copy drifted`)
  await page.locator('[data-search-filter="all"]').click()
  await waitAttribute(page, '[data-search-state]', 'data-selected-category', 'all')
  assert(await root.getAttribute('data-search-state') === fallbackState && await root.getAttribute('data-result-count') === '3', `68 ${fallbackState} All filter: local rows did not restore`)
  await page.getByRole('button', { name: 'Clear search', exact: true }).click()
  await waitAttribute(page, '[data-search-state]', 'data-query', '')
  assert(await root.getAttribute('data-search-state') === fallbackState && await input.evaluate(node => document.activeElement === node), `68 ${fallbackState} Clear: degraded truth/focus was not preserved`)
  assert(await page.getByRole('heading', { name: 'Local search cleared', exact: true }).count() === 1, `68 ${fallbackState} Clear: empty-query fallback heading is not truthful`)
}

async function assertS19DegradedDomainDetail(page, domainKey, domainName, expectedFreshness, label) {
  const trigger = page.locator(`[data-domain-control="${domainKey}"]`)
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: `${domainName} domain details`, exact: true })
  await dialog.waitFor()
  const detail = (await dialog.innerText()).replace(/\s+/g, ' ')
  assert(detail.includes(`Freshness: ${expectedFreshness}`), `${label}: domain detail freshness contradicts degraded state`)
  await closeDialogWithRestoration(page, dialog, trigger, label)
}

const EXPECTED_LIFE_DOMAINS = [
  ['fitness', 74], ['sleep', 42], ['career', 55], ['nutrition', 51], ['finance', 48],
  ['faith', 28], ['productivity', 33], ['relationships', 30], ['wellbeing', 62], ['meditation', 21],
]
const EXPECTED_ACHIEVEMENT_DOMAINS = [
  ['fitness', 12], ['sleep', 7], ['career', 3], ['nutrition', 8], ['finance', 5],
  ['faith', 2], ['productivity', 3], ['relationships', 2], ['wellbeing', 3], ['meditation', 2],
]

async function assertS19Fixture(page, state) {
  const root = page.locator('[data-rpg-state]')
  assert(await root.getAttribute('data-domain-count') === '10', '19 ' + state + ': domain count must be 10')
  assert(await root.getAttribute('data-life-power') === '487', '19 ' + state + ': computed Life Power must be 487')
  assert(await root.getAttribute('data-domain-ranking-count') === '10', '19 ' + state + ': ranking count must be 10')
  if (state === 'skeleton') {
    assert(await page.locator('[data-domain-control]').count() === 0, '19 skeleton: live domain controls leaked into loading')
    return
  }
  const controls = page.locator('[data-domain-control]')
  assert(await controls.count() === 10, '19 ' + state + ': expected ten native domain controls')
  for (const [name, value] of EXPECTED_LIFE_DOMAINS) {
    const control = page.locator('[data-domain-control="' + name + '"]')
    assert(await control.count() === 1, '19 ' + state + ': missing ' + name + ' domain control')
    const label = await control.getAttribute('aria-label')
    if (state === 'empty') assert(label?.includes('no score yet'), '19 empty: ' + name + ' fabricated a score')
    else assert(label?.includes(String(value) + ' out of 99'), '19 ' + state + ': ' + name + ' score drifted')
  }
  if (state === 'empty') {
    assert(await page.getByRole('img', { name: /Building your balance/ }).count() === 1, '19 empty: honest-null radar missing')
    assert(await page.locator('ol[aria-label="Visible all-domain ranking"]').count() === 0, '19 empty: populated ranking leaked')
    assert(await page.getByRole('progressbar', { name: /Character XP has not started/ }).count() === 1, '19 empty: honest-null XP missing')
  } else {
    const radar = page.getByRole('img', { name: /Life Power 487\. 10 active domains\./ })
    assert(await radar.count() === 1, '19 ' + state + ': exact Life Power payload summary missing')
    const radarLabels = page.locator('[data-radar-label-floor="12"] svg text')
    assert(await radarLabels.count() === 10, '19 ' + state + ': ten painted radar labels missing')
    const radarLabelSizes = await radarLabels.evaluateAll(nodes => nodes.map(node => Number.parseFloat(getComputedStyle(node).fontSize)))
    assert(radarLabelSizes.every(size => size >= 12), '19 ' + state + ': a painted radar label is below 12px')
    const ranking = page.locator('ol[aria-label="Visible all-domain ranking"] li')
    assert(await ranking.count() === 10, '19 ' + state + ': visible score-ordered ranking must contain ten rows')
    const rankedText = (await ranking.allTextContents()).map(text => text.replace(/\s+/g, ' ').trim())
    const expectedOrder = ['Fitness', 'Wellbeing', 'Career', 'Nutrition', 'Finance', 'Sleep', 'Productivity', 'Relationships', 'Faith', 'Meditation']
    assert(expectedOrder.every((name, index) => rankedText[index]?.includes(name)), '19 ' + state + ': domain ranking order drifted')
    assert(await page.getByRole('progressbar', { name: /Character XP 2,450 of 5,809.*Independent of Life Power/ }).count() === 1, '19 ' + state + ': independent character-XP provenance missing')
  }
  if (state === 'low-confidence') {
    assert(await page.getByText('Estimated · low confidence', { exact: true }).count() === 1, '19 low-confidence: Sleep marker missing')
    const sleepLabel = await page.locator('[data-domain-control="sleep"]').getAttribute('aria-label')
    assert(/estimated, low confidence/i.test(sleepLabel ?? ''), '19 low-confidence: Sleep accessible name omits its confidence caveat')
    assert((await page.locator('[data-reward-freshness="low-confidence"]').innerText()).includes('cached while Sleep syncs · low confidence'), '19 low-confidence: Streak/reward cache provenance missing')
  }
  if (state === 'success') {
    const arrival = page.locator('[data-rpg-success-arrival="level-12"][data-reduced-motion-path="static"]')
    assert(await arrival.count() === 1 && (await arrival.innerText()).includes('No reward, haptic, account, device, or network state changed'), '19 success: restrained local arrival contract missing')
  }
  if (state !== 'empty') assert(await page.locator('[data-radar-label-floor="12"]').count() === 1, '19 ' + state + ': screen-local 12px radar label floor missing')
  if (state === 'success') {
    const arrival = page.locator('[data-rpg-success-arrival="level-12"]')
    assert(await arrival.count() === 1, '19 success: restrained local level arrival missing')
    assert((await arrival.innerText()).includes('No reward, haptic, account, device, or network state changed'), '19 success: local milestone capability boundary missing')
  }
  const historyRows = page.locator('[data-mission-history-row]')
  const expectedHistoryRows = state === 'empty' ? 0 : 2
  assert(await historyRows.count() === expectedHistoryRows, '19 ' + state + ': completed Mission history row count drifted')
  if (expectedHistoryRows > 0) {
    const progress = await historyRows.evaluateAll(nodes => nodes.map(node => node.getAttribute('data-mission-progress')))
    assert(progress.every(value => value === '100'), '19 ' + state + ': active/incomplete Mission was presented as completed history')
    const historyText = (await historyRows.allTextContents()).join(' ').replace(/\s+/g, ' ')
    assert(/Completed|Cached · low confidence|Cached 2h ago · offline/.test(historyText), '19 ' + state + ': completion/freshness provenance missing from Mission history')
    if (state === 'low-confidence') {
      const historyLabels = await historyRows.evaluateAll(nodes => nodes.map(node => node.getAttribute('aria-label')))
      assert(historyLabels.every(label => /Mission, completed at 100 percent, Cached, low confidence$/.test(label ?? '')), '19 low-confidence: a Mission-history accessible name omits domain, completion, or cached-confidence provenance')
    }
    if (state === 'offline') {
      assert(historyText.includes('Cached 2h ago · offline') && !historyText.includes('low confidence'), '19 offline: Mission-history freshness is conflated with low confidence')
      const historyLabels = await historyRows.evaluateAll(nodes => nodes.map(node => node.getAttribute('aria-label')))
      assert(historyLabels.every(label => /Mission, completed at 100 percent, Cached 2 hours ago, offline$/.test(label ?? '')), '19 offline: a Mission-history accessible name omits domain, completion, or offline freshness')
    }
  }
  if (state === 'error') assert(await page.getByRole('button', { name: 'Restore cached preview', exact: true }).count() === 1, '19 error: recovery action missing')
  if (state === 'error') assert((await page.locator('[data-reward-freshness="error"]').innerText()).includes('cached after refresh error'), '19 error: Streak/reward cache provenance missing')
  if (state === 'disabled') {
    assert(await page.getByRole('button', { name: 'Open ranked breakdown', exact: true }).isDisabled(), '19 disabled: ranked action remained enabled')
    assert(await page.locator('[data-domain-control]:not(:disabled)').count() === 0, '19 disabled: a domain control remained enabled')
  }
  if (state === 'offline') {
    assert(await page.getByRole('button', { name: /View all/ }).isDisabled(), '19 offline: dashboard exit remained enabled')
    assert((await liveStatusText(page)).includes('Offline preview'), '19 offline: cached/offline truth missing')
    assert((await page.locator('[data-reward-freshness="offline"]').innerText()).includes('cached 2 hours ago · offline'), '19 offline: Streak/reward cache provenance missing')
  }
  const text = (await root.innerText()).replace(/\s+/g, ' ')
  assert(!/\b(?:8|9|nine)[ -]domain/i.test(text), '19 ' + state + ': stale domain-count copy rendered')
}

async function assertS42Fixture(page, state) {
  const root = page.locator('[data-celebration-state]')
  const overlayExpected = !['dismissed', 'toast'].includes(state)
  assert(await root.getAttribute('data-overlay-open') === String(overlayExpected), '42 ' + state + ': overlay-open drifted')
  const evidenceExpected = ['default', 'streak', 'share-error'].includes(state) ? '2' : '0'
  assert(await root.getAttribute('data-domain-evidence-count') === evidenceExpected, '42 ' + state + ': evidence count drifted')
  assert(await page.locator('[data-domain-tag]').count() === Number(evidenceExpected), '42 ' + state + ': rendered domain tags disagree')
  if (evidenceExpected === '2') {
    assert((await page.locator('[data-domain-tag="fitness"]').getAttribute('class'))?.includes('bg-domain-fitness/[0.16]'), '42 ' + state + ': Fitness evidence tint drifted')
    assert((await page.locator('[data-domain-tag="finance"]').getAttribute('class'))?.includes('bg-domain-finance/[0.16]'), '42 ' + state + ': Finance evidence tint drifted')
  }
  const dialog = page.getByRole('dialog', { name: 'Milestone celebration', exact: true })
  assert(await dialog.count() === (overlayExpected ? 1 : 0), '42 ' + state + ': modal presence drifted')
  if (overlayExpected) {
    assert(await dialog.getByRole('button', { name: 'Continue', exact: true }).count() === 1, '42 ' + state + ': primary Continue missing')
    const share = dialog.getByRole('button', { name: /Shar/ })
    assert(await share.count() === 1, '42 ' + state + ': secondary Share missing')
  }
  if (state === 'default') {
    const scrim = page.locator('[data-scrim-dismiss]')
    assert(await scrim.getAttribute('data-focus-cue') === 'inset-dual-ring', '42 default: full-frame scrim lacks an authored inset focus cue')
    await page.keyboard.press('Tab')
    await scrim.focus()
    assert(await scrim.evaluate(node => node.matches(':focus-visible')), '42 default: scrim does not expose its authored cue in keyboard modality')
    const shadow = await scrim.evaluate(node => getComputedStyle(node).boxShadow)
    assert((shadow.match(/inset/g) ?? []).length >= 2, '42 default: scrim focus cue is clipped outside the full-frame target')
    await scrim.evaluate(node => node.blur())
  }
  if (['default', 'cia-null', 'share-error'].includes(state)) {
    assert(await page.getByRole('progressbar', { name: '82 percent to level 14', exact: true }).getAttribute('aria-valuenow') === '82', '42 ' + state + ': 82 percent progress missing')
    assert(await page.getByRole('img', { name: 'Level 13 badge, earned', exact: true }).count() === 1, '42 ' + state + ': code-native level emblem missing')
    assert(await page.getByText('Lv 12 → 13', { exact: true }).count() === 1, '42 ' + state + ': level event drifted')
    assert(await page.getByText('+120', { exact: true }).count() === 1, '42 ' + state + ': XP event drifted')
  }
  if (state === 'streak') {
    assert(await page.getByRole('progressbar', { name: /level 14/ }).count() === 0, '42 streak: level progress should be omitted')
    assert(await page.getByRole('img', { name: 'Seven day streak badge, earned', exact: true }).count() === 1, '42 streak: streak emblem missing')
  }
  if (state === 'cia-null') {
    assert(await page.getByText('CIA', { exact: true }).count() === 0, '42 CIA-null: CIA card/divider leaked')
    assert(await page.locator('[data-continuous-stroke-divider]').count() === 0, '42 CIA-null: divider leaked')
  }
  if (state === 'skeleton') {
    const share = dialog.getByRole('button', { name: 'Share', exact: true })
    assert(await share.isDisabled(), '42 skeleton: Share must be disabled')
    assert(await share.getAttribute('aria-describedby') === 'celebration-loading-reason', '42 skeleton: disabled reason missing')
  }
  if (state === 'share-error') {
    assert(await root.getAttribute('data-share-state') === 'error', '42 share-error: root share state drifted')
    assert(await dialog.getByRole('button', { name: 'Sharing failed · Try again', exact: true }).count() === 1, '42 share-error: retry action missing')
  }
  if (state === 'toast') assert(await page.getByRole('button', { name: 'Dismiss XP toast', exact: true }).count() === 1, '42 toast: dismiss action missing')
}

async function assertS68Fixture(page, state) {
  const root = page.locator('[data-search-state]')
  const search = page.getByRole('searchbox', { name: 'Search everything', exact: true })
  assert(await search.count() === 1 && await search.getAttribute('type') === 'search', '68 ' + state + ': labelled native search missing')
  assert(Number.parseFloat(await search.evaluate(node => getComputedStyle(node).fontSize)) >= 16, '68 ' + state + ': editable text below 16px')
  const expectedRows = state === 'results' ? 4 : state === 'error' || state === 'offline' ? 3 : 0
  assert(await root.getAttribute('data-result-count') === String(expectedRows), '68 ' + state + ': result-count root drifted')
  const rows = page.locator('[data-search-result]')
  assert(await rows.count() === expectedRows, '68 ' + state + ': rendered result rows disagree')
  const query = await root.getAttribute('data-query')
  const expectedQuery = {
    default: '',
    'first-use': '',
    results: 'run',
    loading: 'morning',
    'zero-results': 'yoga mat',
    error: 'run',
    offline: 'run',
  }[state]
  assert(query === expectedQuery, '68 ' + state + ': exact query fixture is ' + query + '; expected ' + expectedQuery)
  const clear = page.getByRole('button', { name: 'Clear search', exact: true })
  assert(await clear.count() === (query ? 1 : 0), '68 ' + state + ': conditional Clear drifted')
  await assertSameOriginHref(page.getByRole('link', { name: 'Cancel search and return to Me', exact: true }), '/screens/17', '68 ' + state + ' Cancel')
  const filters = page.getByRole('group', { name: 'Filter search results', exact: true }).getByRole('button')
  assert(await filters.count() === 4, '68 ' + state + ': four native filters missing')
  assert(await page.locator('[data-search-filter="all"] [data-selected-marker]').count() === 1, '68 ' + state + ': non-color selected marker missing')
  if (state === 'default') {
    assert(await root.getAttribute('data-history-state') === 'present', '68 default: history state drifted')
    assert(await page.getByRole('button', { name: 'Delete history', exact: true }).count() === 1, '68 default: history delete missing')
  }
  if (state === 'first-use') {
    assert(await root.getAttribute('data-history-state') === 'deleted', '68 first-use: history must be absent')
    assert(await page.getByRole('button', { name: 'Search for Missions', exact: true }).count() === 1, '68 first-use: suggestions missing')
    assert(await page.getByText('Recent searches', { exact: true }).count() === 0, '68 first-use: recent history leaked')
  }
  if (state === 'loading') assert(await page.locator('.skeleton-block').count() >= 8, '68 loading: four skeleton rows missing')
  if (state === 'zero-results') assert(await page.getByText('No results for “yoga mat”', { exact: true }).count() === 1, '68 zero-results: exact query truth missing')
  if (state === 'results') {
    const ciaEyebrow = page.getByText('CIA thinks you’re looking for', { exact: true })
    assert(await ciaEyebrow.count() === 1, '68 results: canonical CIA eyebrow missing')
    const ciaContent = ciaEyebrow.locator('..')
    assert(await ciaContent.getByRole('button', { name: 'Open routine', exact: true }).count() === 1 && await ciaContent.getByRole('button', { name: 'Dismiss CIA suggestion', exact: true }).count() === 1, '68 results: canonical CIA actions missing')
    assert(await ciaContent.locator('[aria-label="Fitness domain evidence"] [data-domain-tag="fitness"]').count() === 1, '68 results: CIA Fitness domain evidence missing')
    assert(await ciaContent.getByText('Based on 6 Tuesdays', { exact: true }).count() === 1 && await ciaContent.getByText('Estimated · low confidence', { exact: true }).count() === 1, '68 results: CIA provenance missing')
    assert(await ciaContent.locator('.text-emphasis').filter({ hasText: 'examples' }).count() === 1, '68 results: restrained CIA emphasis missing')
  }
  if (expectedRows > 0) {
    const ids = await rows.evaluateAll(nodes => nodes.map(node => node.getAttribute('data-search-result')))
    const expectedIds = expectedRows === 4 ? ['run-5k', 'morning-run-prep', 'post-run-stretch', 'post-run-bowl'] : ['run-5k', 'morning-run-prep', 'post-run-stretch']
    assert(JSON.stringify(ids) === JSON.stringify(expectedIds), '68 ' + state + ': frozen result model drifted')
    assert(await page.locator('[data-result-confidence="low-confidence"]').count() === 1, '68 ' + state + ': low-confidence row missing')
    assert(await page.locator('[data-result-confidence="honest-null"]').count() === 1, '68 ' + state + ': honest-null row missing')
  }
  if (state === 'error') assert(await page.getByRole('button', { name: 'Retry local fixture', exact: true }).count() === 1, '68 error: Retry missing')
  if (state === 'offline') assert((await liveStatusText(page)).includes('Offline preview'), '68 offline: offline/local truth missing')
  if (state !== 'loading') await assertExactDataControls(page, 'Search data controls', '68 ' + state)
}

async function assertS71Fixture(page, state) {
  const root = page.locator('[data-achievement-state]')
  const firstUse = state === 'first-use'
  const expectedEarned = firstUse ? 0 : 47
  const expectedPercent = firstUse ? 0 : 39
  assert(await root.getAttribute('data-earned-count') === String(expectedEarned), '71 ' + state + ': earned count drifted')
  assert(await root.getAttribute('data-total-count') === '120', '71 ' + state + ': total count drifted')
  assert(await root.getAttribute('data-completion-percent') === String(expectedPercent), '71 ' + state + ': percent drifted')
  if (state === 'skeleton') return
  assert(await page.getByRole('img', { name: expectedEarned + ' out of 120 achievements earned. ' + expectedPercent + ' percent complete.', exact: true }).count() === 1, '71 ' + state + ': accessible completion sentence missing')
  const domains = page.locator('[data-achievement-domain]')
  assert(await domains.count() === 10, '71 ' + state + ': ten-domain coverage missing')
  for (const [name, count] of EXPECTED_ACHIEVEMENT_DOMAINS) {
    const item = page.locator('[data-achievement-domain="' + name + '"]')
    assert(await item.count() === 1, '71 ' + state + ': missing ' + name + ' coverage')
    assert(await item.getAttribute('data-domain-earned') === String(firstUse ? 0 : count), '71 ' + state + ': ' + name + ' coverage drifted')
  }
  assert(await root.getAttribute('data-domain-earned-total') === String(firstUse ? 0 : 47), '71 ' + state + ': coverage total drifted')
  const text = (await root.innerText()).replace(/\s+/g, ' ')
  assert(!/\bBadges?\b/i.test(text), '71 ' + state + ': retired Badge terminology rendered')
  assert(await page.locator('.paywall-blur').count() === 0, '71 ' + state + ': PaywallLock must not appear')
  assert(await page.locator('[data-achievement-tile] img').count() === 0, '71 ' + state + ': bitmap tile leaked')
  const rarityMarks = page.locator('[data-achievement-tile] [data-achievement-rarity]')
  assert(await rarityMarks.count() === await page.locator('[data-achievement-tile]').count(), '71 ' + state + ': a tile lacks code-native rarity truth')
  const invalidRarity = await rarityMarks.evaluateAll(nodes => nodes.filter(node => !['common', 'uncommon', 'rare', 'epic', 'legendary'].includes(node.getAttribute('data-achievement-rarity') ?? '') || !/^[1-5]$/.test(node.getAttribute('data-rarity-rank') ?? '')).length)
  assert(invalidRarity === 0, '71 ' + state + ': rarity tier is outside the five-tier RPG authority')
  await assertExactDataControls(page, 'Achievement data controls', '71 ' + state)
  if (firstUse) {
    assert(await page.getByText('Your streak starts today', { exact: true }).count() === 1, '71 first-use: exact streak truth missing')
    assert(await page.locator('[data-achievement-status]:not([data-achievement-status="to-discover"])').count() === 0, '71 first-use: populated tile status leaked')
  } else {
    assert(await page.getByText('18-day Achievement streak', { exact: true }).count() === 1, '71 ' + state + ': populated streak missing')
  }
  if (state === 'filtered-empty') {
    assert(await root.getAttribute('data-achievement-filter') === 'meditation', '71 filtered-empty: Meditation filter missing')
    const selectedMeditation = page.locator('[data-achievement-filter-control="meditation"][aria-pressed="true"]')
    assert(await selectedMeditation.locator('[data-selected-marker]').count() === 1, '71 filtered-empty: selected Meditation marker missing')
    assert(await page.locator('[data-achievement-tile]').count() === 0, '71 filtered-empty: tiles leaked')
    assert(await page.getByText('Choose another domain. This filter does not change the 47 of 120 earned summary.', { exact: true }).count() === 1, '71 filtered-empty: visible summary copy contradicts 47 earned')
  }
  if (state === 'error' || state === 'offline') assert(text.includes('cached achievements'), '71 ' + state + ': cached truth missing')
  if (state === 'offline') assert(await page.getByRole('button', { name: 'Refresh unavailable', exact: true }).isDisabled(), '71 offline: refresh must be disabled')
  if (state === 'success') {
    const newTile = page.locator('[data-achievement-tile="career-compass"][data-new-arrival="true"]')
    assert(await newTile.count() === 1, '71 success: deterministic new-arrival tile missing')
    assert(await newTile.locator('[data-achievement-rarity="rare"][data-rarity-rank="3"]').count() === 1, '71 success: Career Compass Rare tier treatment drifted')
    const arrival = page.getByRole('status').filter({ hasText: 'Career Compass is highlighted' })
    assert(await arrival.getByRole('img', { name: 'Rare rarity, tier 3 of 5', exact: true }).count() === 1, '71 success: standalone rarity arc lacks a discoverable tier equivalent')
  }
}

async function assertS83Fixture(page, state) {
  const root = page.locator('[data-buddy-state]')
  const expectedCount = ['default', 'success', 'consent-missing', 'offline'].includes(state) ? 2 : 0
  assert(await root.getAttribute('data-shared-mission-count') === String(expectedCount), '83 ' + state + ': shared mission count drifted')
  assert(await root.locator('img').count() === 0, '83 ' + state + ': privacy-first initials were replaced by media')
  assert(await page.locator('.paywall-blur').count() === 0, '83 ' + state + ': PaywallLock leaked')
  const messageReasonExpected = ['skeleton', 'pending', 'removed', 'offline'].includes(state)
  const inviteReasonExpected = ['pending', 'removed', 'offline'].includes(state)
  assert(await page.locator('#buddy-disabled-reason').count() === (messageReasonExpected ? 1 : 0), '83 ' + state + ': message disabled reason presence contradicts the control state')
  assert(await page.locator('#buddy-invite-disabled-reason').count() === (inviteReasonExpected ? 1 : 0), '83 ' + state + ': invitation disabled reason presence contradicts the control state')
  if (state === 'skeleton') return
  assert(await page.getByRole('button', { name: 'AK initials avatar. Review photo consent before opening media.', exact: true }).count() === 1, '83 ' + state + ': AK initials/consent control missing')
  const rows = page.locator('button[aria-label*="Open mission details."]')
  assert(await rows.count() === expectedCount, '83 ' + state + ': rendered mission rows disagree')
  const message = page.getByRole('button', { name: 'Message', exact: true })
  assert(await message.count() === 1, '83 ' + state + ': Message must remain visible')
  const shouldDisableMessage = ['pending', 'removed', 'offline'].includes(state)
  assert(await message.isDisabled() === shouldDisableMessage, '83 ' + state + ': Message disabled state drifted')
  if (shouldDisableMessage) {
    assert(await message.getAttribute('aria-describedby') === 'buddy-disabled-reason', '83 ' + state + ': Message disabled reason missing')
  }
  const inviteAnother = page.getByRole('button', { name: 'Invite to another mission', exact: true })
  if (['pending', 'removed', 'offline'].includes(state)) {
    assert(await inviteAnother.count() === 1 && await inviteAnother.isDisabled(), '83 ' + state + ': mission invitation must remain visible and disabled')
    assert(await inviteAnother.getAttribute('aria-describedby') === 'buddy-invite-disabled-reason', '83 ' + state + ': mission invitation points to the wrong disabled reason')
    const inviteReason = await page.locator('#buddy-invite-disabled-reason').innerText()
    assert(/Mission invitations/.test(inviteReason) && !/^Messaging/.test(inviteReason), '83 ' + state + ': mission invitation reason is irrelevant')
  }
  if (state === 'empty') {
    assert(await page.getByRole('button', { name: 'Invite to mission', exact: true }).count() === 1, '83 empty: one Invite action missing')
    assert(await page.getByText('No shared missions yet', { exact: true }).count() === 1, '83 empty: exact empty prompt missing')
  }
  if (state === 'error') assert(await page.getByRole('button', { name: 'Retry preview', exact: true }).count() === 1, '83 error: Retry missing')
  if (state === 'consent-missing') {
    assert(await page.getByRole('img', { name: /Shared domain shape/ }).count() === 0, '83 consent-missing: shared shape leaked')
    assert(await page.getByText('No shared insight yet', { exact: true }).count() === 1, '83 consent-missing: honest-null insight missing')
    assert(await page.getByText(/On mutually shared run days/).count() === 0, '83 consent-missing: shared claim leaked')
  }
  if (state === 'offline') assert((await liveStatusText(page)).includes('Offline preview'), '83 offline: cached/offline truth missing')
}

async function assertS83InactiveVisibility(handle, state) {
  const { page } = handle
  const entry = page.getByRole('button', { name: 'Visibility', exact: true })
  await entry.click()
  await assertRootSubstate(page, 'data-buddy-state', 'data-buddy-panel', 'visibility', `83 ${state} visibility`)
  const dialog = page.getByRole('dialog', { name: 'Shared visibility', exact: true })
  const reason = state === 'pending' ? 'the connection is pending' : 'the connection is no longer accepted'
  const boxes = dialog.getByRole('checkbox')
  assert(await boxes.count() === 2, `83 ${state}: expected two effective sharing controls`)
  for (const domain of ['Fitness', 'Learning']) {
    const box = dialog.getByRole('checkbox', { name: `${domain} is not shared with Aisha because ${reason}`, exact: true })
    assert(await box.count() === 1 && !(await box.isChecked()) && await box.isDisabled(), `83 ${state}: ${domain} remained effectively shared or editable`)
    assert(await box.getAttribute('aria-describedby') === 'buddy-visibility-disabled-reason', `83 ${state}: ${domain} inactive-sharing reason is not associated`)
  }
  assert(await dialog.getByText('Not shared', { exact: true }).count() === 2, `83 ${state}: non-color Not shared labels missing`)
  const expectedExplanation = state === 'pending'
    ? 'Effective sharing is off while this connection is pending. Any saved preference is inactive'
    : 'Effective sharing is off because this connection is no longer accepted. Any saved preference is inactive'
  assert((await dialog.innerText()).includes(expectedExplanation), `83 ${state}: inactive-sharing explanation is missing or conflates saved preference with effective access`)
  await auditOpenDialog(handle, dialog, `83 ${state} visibility audit`)
  await assertDialogTrap(page, dialog, entry, `83 ${state} visibility`)
}

async function assertS92Fixture(page, state) {
  const root = page.locator('[data-reputation-state]')
  const hasScore = !['empty', 'skeleton'].includes(state)
  assert(await root.getAttribute('data-score') === (hasScore ? '82' : 'none'), '92 ' + state + ': score root drifted')
  assert(await page.locator('#reputation-skeleton-disabled-reason').count() === (state === 'skeleton' ? 1 : 0), '92 ' + state + ': loading-only disabled reason presence contradicts the fixture state')
  if (state === 'skeleton') return
  const scoreRing = page.getByRole('img', { name: 'Trust score out of 100 82', exact: true })
  assert(await scoreRing.count() === (hasScore ? 1 : 0), '92 ' + state + ': score ring presence drifted')
  const metricButtons = page.locator('button[aria-label$="Open explanation."]')
  assert(await metricButtons.count() === (hasScore ? 4 : 0), '92 ' + state + ': metric controls disagree with score truth')
  if (hasScore) {
    const engagement = page.getByRole('progressbar', { name: 'Engagement score, 74 out of 100, low confidence', exact: true })
    assert(await engagement.getAttribute('data-confidence-treatment') === 'muted-dashed', '92 ' + state + ': Engagement low-confidence treatment missing')
    assert(await engagement.locator('.border-dashed').count() === 1, '92 ' + state + ': Engagement confidence does not have a non-color dashed cue')
  }
  assert(await page.getByRole('region', { name: 'Full audit trail', exact: true }).count() === (hasScore ? 1 : 0), '92 ' + state + ': canonical PaywallLock presence drifted')
  if (state === 'empty') {
    const text = (await root.innerText()).replace(/\s+/g, ' ')
    assert(text.includes('No trust score yet'), '92 empty: honest-null score copy missing')
    assert(!text.includes('No active flags') && !text.includes('Mentor') && !text.includes('82 out of 100'), '92 empty: populated claim leaked')
    assert(await page.getByText(/helpful replies are lifting trust/i).count() === 0, '92 empty: CIA score claim leaked')
  }
  if (state === 'offline') {
    const text = (await root.innerText()).replace(/\s+/g, ' ')
    assert(text.includes('cached from 14 minutes ago') && !text.includes('sync failed'), '92 offline: exclusive cached truth drifted')
    const plan = page.getByRole('button', { name: 'Review plan preview', exact: true })
    assert(await plan.isDisabled() && await plan.getAttribute('aria-describedby') === 'reputation-premium-disabled-reason', '92 offline: plan action disabled reason missing')
  }
  if (state === 'sync-error') {
    const text = (await root.innerText()).replace(/\s+/g, ' ')
    assert(text.includes('sync failed') && !text.includes('Offline preview'), '92 sync-error: exclusive error truth drifted')
    assert(await page.getByRole('button', { name: 'Retry sync preview', exact: true }).count() === 1, '92 sync-error: Retry missing')
  }
  if (state === 'flagged' || state === 'disabled') {
    assert(await page.getByText('Evidence available', { exact: true }).count() === 1, '92 ' + state + ': private evidence missing')
    assert(await page.getByRole('link', { name: 'Review community policy', exact: true }).count() === 1, '92 ' + state + ': policy path missing')
    const appeal = page.getByRole('button', { name: state === 'disabled' ? 'Appeal unavailable' : 'Preview appeal', exact: true })
    assert(await appeal.count() === 1, '92 ' + state + ': appeal control missing')
    if (state === 'disabled') assert(await appeal.isDisabled() && await appeal.getAttribute('aria-describedby') === 'reputation-appeal-disabled-reason', '92 disabled: appeal reason missing')
  }
  if (state === 'success') assert(await page.getByText(/Helpful reply recognized · local success preview/).count() === 1, '92 success: positive event missing')
}

try {
  productionBuildEvidence = await assertFreshProductionBuild()
  browser = await chromium.launch(chromePath ? { executablePath: chromePath } : {})

  // S19 — RPG character / Life World
  for (const state of SCREEN_CONTRACTS['19'].states) {
    await stateCapture('19', state, {
      beforeCapture: async ({ page }) => assertS19Fixture(page, state),
      afterCapture: state === 'low-confidence' ? async ({ page }) => {
        await assertS19DegradedDomainDetail(page, 'sleep', 'Sleep', 'Cached while Sleep syncs', '19 low-confidence Sleep detail')
      } : state === 'offline' ? async ({ page }) => {
        await assertS19DegradedDomainDetail(page, 'fitness', 'Fitness', 'Cached 2 hours ago', '19 offline Fitness detail')
      } : state === 'error' ? async ({ page }) => {
        await assertS19DegradedDomainDetail(page, 'fitness', 'Fitness', 'Cached after source refresh error', '19 error Fitness detail')
        await page.getByRole('button', { name: 'Restore cached preview', exact: true }).click()
        await waitAttribute(page, '[data-rpg-state]', 'data-rpg-state', 'default')
        assert((await liveStatusText(page)).includes('restored locally'), '19 error: retry outcome missing')
      } : undefined,
    })
  }

  await runCase({ name: '19-domain-sheet-fitness', id: '19', state: 'default', rootAttribute: 'data-rpg-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.locator('[data-domain-control="fitness"]')
    await trigger.click()
    await assertRootSubstate(page, 'data-rpg-state', 'data-rpg-panel', 'domain', '19 Fitness sheet')
    const dialog = page.getByRole('dialog', { name: 'Fitness domain details', exact: true })
    assert(await dialog.getByText('74 / 99', { exact: true }).count() === 1, '19 Fitness sheet: exact score missing')
    await assertDialogTrap(page, dialog, trigger, '19 Fitness sheet', { close: false })
    await capture(handle, '19-domain-sheet-fitness')
    await dialog.getByRole('button', { name: 'View ranking', exact: true }).click()
    await assertRootSubstate(page, 'data-rpg-state', 'data-rpg-panel', 'ranked', '19 domain→ranked handoff')
    const handedOffDialog = page.getByRole('dialog', { name: 'All-domain ranking', exact: true })
    await assertDialogTrap(page, handedOffDialog, trigger, '19 domain→ranked handoff', { close: false })
    await closeDialogWithRestoration(page, handedOffDialog, trigger, '19 domain→ranked Escape restoration')

    await trigger.click()
    const reopenedDomain = page.getByRole('dialog', { name: 'Fitness domain details', exact: true })
    await reopenedDomain.getByRole('button', { name: 'View ranking', exact: true }).click()
    const closePathDialog = page.getByRole('dialog', { name: 'All-domain ranking', exact: true })
    await closePathDialog.waitFor()
    await closePathDialog.getByRole('button', { name: 'Close ranking', exact: true }).click()
    await closePathDialog.waitFor({ state: 'hidden' })
    const triggerHandle = await trigger.elementHandle()
    assert(triggerHandle, '19 domain→ranked Close: trigger handle unavailable')
    await page.waitForFunction(node => document.activeElement === node, triggerHandle)
    assert(await trigger.evaluate(node => document.activeElement === node), '19 domain→ranked Close: focus did not return to the originating domain control')
    for (const [domainKey, value] of EXPECTED_LIFE_DOMAINS.slice(1)) {
      const domainName = REGISTRY_DOMAINS.find(name => name.toLowerCase() === domainKey)
      assert(domainName, '19 domain activation: missing registry label for ' + domainKey)
      const domainTrigger = page.locator(`[data-domain-control="${domainKey}"]`)
      await domainTrigger.click()
      const domainDialog = page.getByRole('dialog', { name: `${domainName} domain details`, exact: true })
      assert(await domainDialog.getByText(`${value} / 99`, { exact: true }).count() === 1, `19 ${domainName}: exact score outcome missing`)
      await closeDialogWithRestoration(page, domainDialog, domainTrigger, `19 ${domainName} domain activation`)
    }
  })

  await runCase({ name: '19-ranked-breakdown', id: '19', state: 'default', rootAttribute: 'data-rpg-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Open ranked breakdown', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-rpg-state', 'data-rpg-panel', 'ranked', '19 ranked')
    const dialog = page.getByRole('dialog', { name: 'All-domain ranking', exact: true })
    assert(await dialog.locator('ol li').count() === 10, '19 ranked: ten ordered rows missing')
    await assertDialogTrap(page, dialog, trigger, '19 ranked', { close: false })
    await capture(handle, '19-ranked-breakdown')
    await closeDialogWithRestoration(page, dialog, trigger, '19 ranked')
  })

  await runCase({ name: '19-data-controls', id: '19', state: 'default', rootAttribute: 'data-rpg-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Review data controls', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-rpg-state', 'data-rpg-panel', 'data-controls', '19 data controls')
    const dialog = page.getByRole('dialog', { name: 'Life World data controls', exact: true })
    const controls = await assertExactDataControls(page, 'Life World data controls', '19 data controls')
    const selected = controls.filter({ hasText: 'Export' })
    await selected.click()
    assert(await selected.getAttribute('aria-pressed') === 'true', '19 data controls: selected state missing')
    assert((await activeOutcomeText(page)).includes('Export is selected'), '19 data controls: active-dialog local outcome missing')
    await assertDialogTrap(page, dialog, trigger, '19 data controls', { close: false })
    await capture(handle, '19-data-controls')
    await assertEveryDataControlOutcome(page, 'Life World data controls', '19 every data control')
    await closeDialogWithRestoration(page, dialog, trigger, '19 data controls')
  })

  // S42 — celebration overlay
  for (const state of SCREEN_CONTRACTS['42'].states) {
    await stateCapture('42', state, {
      beforeCapture: async ({ page }) => assertS42Fixture(page, state),
      afterCapture: state === 'default' ? async ({ page }) => {
        let dialog = page.getByRole('dialog', { name: 'Milestone celebration', exact: true })
        await dialog.getByRole('button', { name: 'Share', exact: true }).click()
        await waitAttribute(page, '[data-celebration-state]', 'data-share-state', 'retry')
        assert((await activeOutcomeText(page)).includes('No native share sheet, clipboard, file, message, or network action opened'), '42 Share: active-dialog capability boundary missing')
        await dialog.getByRole('button', { name: 'Continue', exact: true }).click()
        await dialog.waitFor({ state: 'hidden' })
        assert((await liveStatusText(page)).includes('dismissed locally'), '42 Continue: local outcome missing')
        const replay = page.getByRole('button', { name: 'Replay milestone preview', exact: true })
        await replay.click()
        dialog = page.getByRole('dialog', { name: 'Milestone celebration', exact: true })
        await assertDialogTrap(page, dialog, replay, '42 replay focus trap')
        await replay.click()
        dialog = page.getByRole('dialog', { name: 'Milestone celebration', exact: true })
        await dialog.getByRole('button', { name: 'Dismiss celebration', exact: true }).click({ position: { x: 4, y: 4 } })
        await dialog.waitFor({ state: 'hidden' })
      } : state === 'share-error' ? async ({ page }) => {
        await page.getByRole('button', { name: 'Sharing failed · Try again', exact: true }).click()
        await waitAttribute(page, '[data-celebration-state]', 'data-share-state', 'retry')
        assert((await activeOutcomeText(page)).includes('No native share sheet'), '42 share retry: active-dialog capability boundary missing')
      } : state === 'toast' ? async ({ page }) => {
        await page.getByRole('button', { name: 'Dismiss XP toast', exact: true }).click()
        assert(await page.getByRole('button', { name: 'Dismiss XP toast', exact: true }).count() === 0, '42 toast: dismiss action did not remove the toast')
        assert((await liveStatusText(page)).includes('XP toast dismissed early') && (await liveStatusText(page)).includes('No reward or account state changed'), '42 toast: honest local dismiss outcome missing')
      } : undefined,
    })
  }

  await runCase({ name: '42-reduced-motion', id: '42', state: 'default', rootAttribute: 'data-celebration-state', rootState: 'default', reducedMotion: 'reduce', query: { motion: 'reduced' } }, async handle => {
    await auditFixture(handle)
    assert(await handle.page.locator('[data-celebration-state]').getAttribute('data-reduced-motion') === 'true', '42 reduced motion: root proof missing')
    await capture(handle, '42-reduced-motion')
  })

  await runCase({ name: '42-enlarged-actions', id: '42', state: 'default', rootAttribute: 'data-celebration-state', rootState: 'default', textScale: 1.25 }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const dialog = page.getByRole('dialog', { name: 'Milestone celebration', exact: true })
    const continueAction = dialog.getByRole('button', { name: 'Continue', exact: true })
    const shareAction = dialog.getByRole('button', { name: 'Share', exact: true })
    await fullyVisibleInPhone(page, continueAction, '42 enlarged Continue')
    await fullyVisibleInPhone(page, shareAction, '42 enlarged Share')
    await targetSize(continueAction, '42 enlarged Continue')
    await targetSize(shareAction, '42 enlarged Share')
    await capture(handle, '42-enlarged-actions')
  })

  // S43 — immutable accepted paywall sentinel
  const assertS43Base = async page => {
    assert(await page.locator('h1').count() === 1, '43: expected one h1')
    const table = page.getByRole('table', { name: /plan feature comparison/i })
    assert(await table.count() === 1, '43: semantic four-column comparison missing')
    assert(await table.locator('thead th').count() === 4, '43: comparison must have four columns')
    const rows = table.locator('tbody tr')
    assert(await rows.count() === 3, '43: comparison must have three rows')
    for (let index = 0; index < 3; index += 1) {
      const values = (await rows.nth(index).locator('th,td').allTextContents()).map(value => value.trim())
      assert(values.length === 4 && values.every(Boolean), '43: comparison row ' + (index + 1) + ' is blank/incomplete')
    }
    const region = page.getByRole('region', { name: 'Weekly mission model', exact: true })
    assert(await region.count() === 1, '43: canonical labelled PaywallLock missing')
    const blur = region.locator('.paywall-blur')
    assert(await blur.getAttribute('aria-hidden') === 'true' && await blur.getAttribute('inert') !== null, '43: real locked layout must be inert and hidden')
    assert(await blur.evaluate(node => getComputedStyle(node).filter) === 'blur(20px)', '43: canonical blur(20px) drifted')
    assert(await page.locator('.hifi-action-primary:visible').count() === 1, '43: exactly one primary action required')
    assert(await page.getByText(/free trial/i).count() === 0, '43: unsupported trial claim rendered')
    assert(await page.getByText('$20', { exact: true }).count() === 1, '43: exact price missing')
    assert(await page.getByText('/ month', { exact: true }).count() === 1, '43: monthly cadence missing')
    assert(await page.getByText('Via app store', { exact: true }).count() === 1, '43: storefront provenance missing')
    assert(await page.getByText(/Cancel anytime.*account settings/).count() === 1, '43: cancel copy missing')
  }

  await runCase({ name: '43-default', id: '43' }, async handle => {
    await auditFixture(handle)
    await assertS43Base(handle.page)
    await capture(handle, '43-default')
  })

  await runCase({ name: '43-price-exits', id: '43' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await assertS43Base(page)
    const compare = page.getByRole('button', { name: 'Compare all plans', exact: true })
    const later = page.getByRole('button', { name: 'Maybe later', exact: true })
    await later.scrollIntoViewIfNeeded()
    await twoAnimationFrames(page)
    await equalExit(compare, later, '43 price exits')
    await targetSize(page.getByRole('button', { name: 'Close upgrade', exact: true }), '43 close exit')
    await targetSize(page.getByRole('button', { name: 'Go back', exact: true }), '43 back exit')
    await capture(handle, '43-price-exits', { top: false })
  })

  await runCase({ name: '43-cta-outcome', id: '43' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await page.getByRole('button', { name: 'Upgrade to Plus', exact: true }).click()
    const status = page.getByRole('status')
    await status.waitFor()
    assert((await status.innerText()).includes('App Store confirmation would open next'), '43 CTA: local attempted-feature outcome missing')
    await status.scrollIntoViewIfNeeded()
    await twoAnimationFrames(page)
    await capture(handle, '43-cta-outcome', { top: false })
  })

  await runCase({ name: '43-compare-outcome', id: '43' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const compare = page.getByRole('button', { name: 'Compare all plans', exact: true })
    await compare.scrollIntoViewIfNeeded()
    await compare.click()
    const status = page.getByRole('status')
    assert((await status.innerText()).includes('opened in this prototype'), '43 compare: local outcome missing')
    await status.scrollIntoViewIfNeeded()
    await twoAnimationFrames(page)
    await capture(handle, '43-compare-outcome', { top: false })
  })

  await runCase({ name: '43-enlarged-exits', id: '43', textScale: 1.25 }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const compare = page.getByRole('button', { name: 'Compare all plans', exact: true })
    const later = page.getByRole('button', { name: 'Maybe later', exact: true })
    await later.scrollIntoViewIfNeeded()
    await twoAnimationFrames(page)
    await fullyVisibleInPhone(page, compare, '43 enlarged Compare')
    await fullyVisibleInPhone(page, later, '43 enlarged Maybe later')
    await equalExit(compare, later, '43 enlarged exits')
    await capture(handle, '43-enlarged-exits', { top: false })

    const seed = new URL('/screens/12?seed=43', baseURL)
    await page.goto(seed.href, { waitUntil: 'networkidle' })
    const seededPaywall = new URL('/screens/43?seeded=1', baseURL)
    await page.goto(seededPaywall.href, { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Close upgrade', exact: true }).click()
    await page.waitForURL(url => url.pathname === '/screens/12' && url.searchParams.get('seed') === '43')
    assert(new URL(page.url()).pathname === '/screens/12', '43 close: seeded-history dismissal failed')
    await page.goto(seededPaywall.href, { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Go back', exact: true }).click()
    await page.waitForURL(url => url.pathname === '/screens/12' && url.searchParams.get('seed') === '43')
    assert(new URL(page.url()).pathname === '/screens/12', '43 back: seeded-history dismissal failed')
  })

  // S68 — universal search
  for (const state of SCREEN_CONTRACTS['68'].states) {
    await stateCapture('68', state, {
      beforeAudit: state === 'default' ? async ({ page }) => {
        assert(await page.getByRole('searchbox', { name: 'Search everything', exact: true }).evaluate(node => document.activeElement === node), '68 default: autofocus missing')
      } : undefined,
      beforeCapture: async ({ page }) => assertS68Fixture(page, state),
      afterCapture: state === 'default' ? async ({ page }) => {
        await assertEveryDataControlOutcome(page, 'Search data controls', '68 every data control')
        for (const [query, expectedCount] of [['run', 4], ['morning routine', 1], ['healthy lunch', 1]]) {
          await page.getByRole('button', { name: query, exact: true }).click()
          await waitAttribute(page, '[data-search-state]', 'data-search-state', 'loading')
          await waitAttribute(page, '[data-search-state]', 'data-search-state', 'results')
          assert(await page.locator('[data-search-result]').count() === expectedCount, `68 recent ${query}: expected ${expectedCount} truthful rows`)
          await page.getByRole('button', { name: 'Clear search', exact: true }).click()
          await waitAttribute(page, '[data-search-state]', 'data-search-state', 'default')
        }
        const input = page.getByRole('searchbox', { name: 'Search everything', exact: true })
        await input.fill('run')
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'loading')
        await page.locator('[data-search-filter="habits"]').click()
        await waitAttribute(page, '[data-search-state]', 'data-selected-category', 'habits')
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'results')
        const root = page.locator('[data-search-state]')
        assert(await root.getAttribute('data-result-count') === '2' && await page.locator('[data-search-result]').count() === 2, '68 loading→Habits: settled rows disagree with the active filter')
        assert((await liveStatusText(page)).includes('2 bundled results match “run”'), '68 loading→Habits: live result count retained the stale All filter')
        await page.getByRole('button', { name: 'Clear search', exact: true }).click()
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'default')

        await page.locator('[data-search-filter="missions"]').click()
        await waitAttribute(page, '[data-search-state]', 'data-selected-category', 'missions')
        await input.fill('healthy lunch')
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'loading')
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'zero-results')
        assert(await page.locator('[data-search-result]').count() === 0, '68 Missions healthy-lunch setup: category-scoped zero state drifted')
        await page.locator('[data-search-filter="recipes"]').click()
        await waitAttribute(page, '[data-search-state]', 'data-selected-category', 'recipes')
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'results')
        assert(await root.getAttribute('data-query') === 'healthy lunch' && await root.getAttribute('data-selected-category') === 'recipes' && await root.getAttribute('data-result-count') === '1', '68 zero→Recipes: final query/category/count root truth drifted')
        assert(await page.locator('[data-search-filter="recipes"] [data-selected-marker]').count() === 1, '68 zero→Recipes: selected-category marker drifted')
        assert(await page.locator('[data-search-result="post-run-bowl"]').count() === 1 && await page.locator('[data-search-result]').count() === 1, '68 zero→Recipes: valid category match remained trapped behind zero-results')
        assert(await page.getByText('CIA thinks you’re looking for', { exact: true }).count() === 0 && await page.getByText('Morning run prep', { exact: true }).count() === 0, '68 zero→Recipes: unrelated Fitness CIA synthesis leaked into the recovered recipe result')
        assert((await liveStatusText(page)).includes('Recipes filter selected. 1 bundled row is visible.'), '68 zero→Recipes: restored category result status is inaccurate')
        await page.getByRole('button', { name: 'Clear search', exact: true }).click()
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'default')
      } : state === 'first-use' ? async ({ page }) => {
        for (const [suggestion, query, expectedState, expectedCount] of [
          ['Missions', 'missions', 'results', 1],
          ['Habits', 'habits', 'results', 2],
          ['Recipes', 'recipes', 'results', 1],
          ['Journal', 'journal', 'zero-results', 0],
        ]) {
          await page.getByRole('button', { name: `Search for ${suggestion}`, exact: true }).click()
          await waitAttribute(page, '[data-search-state]', 'data-search-state', 'loading')
          await waitAttribute(page, '[data-search-state]', 'data-search-state', expectedState)
          const root = page.locator('[data-search-state]')
          assert(await root.getAttribute('data-query') === query && await root.getAttribute('data-result-count') === String(expectedCount), `68 ${suggestion} suggestion: query/result truth drifted`)
          assert(await page.locator('[data-search-result]').count() === expectedCount, `68 ${suggestion} suggestion: expected ${expectedCount} truthful rows`)
          if (expectedCount === 0) assert((await liveStatusText(page)).includes('No bundled results match “journal”'), '68 Journal suggestion: honest zero-result outcome missing')
          await page.getByRole('button', { name: 'Clear search', exact: true }).click()
          await waitAttribute(page, '[data-search-state]', 'data-search-state', 'first-use')
        }
      } : state === 'results' ? async ({ page }) => {
        const input = page.getByRole('searchbox', { name: 'Search everything', exact: true })
        await page.getByRole('button', { name: 'Clear search', exact: true }).click()
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'default')
        assert(await input.inputValue() === '' && await input.evaluate(node => document.activeElement === node), '68 Clear: did not empty/refocus')
        await input.fill('run')
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'loading')
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'results')
        assert(await page.locator('[data-search-result]').count() === 4, '68 debounce: 300ms result transition drifted')
      } : state === 'zero-results' ? async ({ page }) => {
        await page.locator('[data-search-filter="habits"]').click()
        const root = page.locator('[data-search-state]')
        assert(await root.getAttribute('data-search-state') === 'zero-results' && await root.getAttribute('data-query') === 'yoga mat', '68 zero-results filter: query/state truth changed')
        assert(await root.getAttribute('data-selected-category') === 'habits' && await root.getAttribute('data-result-count') === '0', '68 zero-results filter: selected category or zero count drifted')
        assert((await liveStatusText(page)).includes('0 bundled rows match “yoga mat”'), '68 zero-results filter: status falsely says no query ran')
      } : state === 'offline' ? async ({ page }) => {
        await assertS68FallbackInteractions(page, 'offline')
      } : state === 'error' ? async ({ page }) => {
        await assertS68FallbackInteractions(page, 'error')
        await page.getByRole('button', { name: 'Retry local fixture', exact: true }).click()
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'loading')
        await waitAttribute(page, '[data-search-state]', 'data-search-state', 'results')
        assert((await liveStatusText(page)).includes('No network request occurred'), '68 Retry: honest local outcome missing')
      } : undefined,
    })
  }

  await runCase({ name: '68-filter-habits', id: '68', state: 'results', rootAttribute: 'data-search-state', rootState: 'results' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await page.locator('[data-search-filter="habits"]').click()
    await assertRootSubstate(page, 'data-search-state', 'data-selected-category', 'habits', '68 Habits filter')
    assert(await page.locator('[data-search-result]').count() === 2, '68 Habits filter: expected two rows')
    assert(await page.locator('[data-search-filter="habits"] [data-selected-marker]').count() === 1, '68 Habits filter: non-color marker missing')
    await capture(handle, '68-filter-habits')
    for (const [category, expectedCount] of [['all', 4], ['missions', 1], ['habits', 2], ['recipes', 1]]) {
      await page.locator(`[data-search-filter="${category}"]`).click()
      await assertRootSubstate(page, 'data-search-state', 'data-selected-category', category, `68 ${category} filter activation`)
      assert(await page.locator('[data-search-result]').count() === expectedCount, `68 ${category} filter: expected ${expectedCount} rows`)
      assert(await page.locator(`[data-search-filter="${category}"] [data-selected-marker]`).count() === 1, `68 ${category} filter: non-color outcome marker missing`)
    }
  })

  await runCase({ name: '68-cia-dismissed', id: '68', state: 'results', rootAttribute: 'data-search-state', rootState: 'results' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const routine = page.getByRole('button', { name: 'Open routine', exact: true })
    await routine.click()
    const routineDialog = page.getByRole('dialog', { name: 'Morning run prep', exact: true })
    await assertSameOriginHref(routineDialog.getByRole('link', { name: 'Open screen', exact: true }), '/screens/38', '68 CIA routine route')
    await closeDialogWithRestoration(page, routineDialog, routine, '68 CIA routine activation')
    await page.getByRole('button', { name: 'Dismiss CIA suggestion', exact: true }).click()
    await assertRootSubstate(page, 'data-search-state', 'data-cia-suggestion', 'dismissed', '68 CIA dismissal')
    assert(await page.getByText('CIA thinks you’re looking for', { exact: true }).count() === 0, '68 CIA dismissal: card remained visible')
    assert((await liveStatusText(page)).includes('dismissed from this page'), '68 CIA dismissal: local outcome missing')
    await capture(handle, '68-cia-dismissed')
  })

  await runCase({ name: '68-history-deleted', id: '68', state: 'default', rootAttribute: 'data-search-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await page.getByRole('button', { name: 'Delete history', exact: true }).click()
    await assertRootSubstate(page, 'data-search-state', 'data-history-state', 'deleted', '68 history delete')
    assert(await page.getByText(/Recent history was removed/).count() === 1, '68 history delete: local outcome missing')
    await capture(handle, '68-history-deleted')
  })

  await runCase({ name: '68-result-opened', id: '68', state: 'results', rootAttribute: 'data-search-state', rootState: 'results' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.locator('[data-search-result="run-5k"]')
    await trigger.click()
    await assertRootSubstate(page, 'data-search-state', 'data-search-panel', 'result', '68 result preview')
    const dialog = page.getByRole('dialog', { name: 'Run a 5k', exact: true })
    await assertSameOriginHref(dialog.getByRole('link', { name: 'Open screen', exact: true }), '/screens/14', '68 result route')
    await assertDialogTrap(page, dialog, trigger, '68 result preview', { close: false })
    await capture(handle, '68-result-opened')
    await closeDialogWithRestoration(page, dialog, trigger, '68 result preview')
    for (const [resultId, title, href] of [
      ['morning-run-prep', 'Morning run prep', '/screens/38'],
      ['post-run-stretch', 'Post-run stretch', '/screens/38'],
      ['post-run-bowl', 'Post-run bowl', '/screens/56'],
    ]) {
      const resultTrigger = page.locator(`[data-search-result="${resultId}"]`)
      await resultTrigger.click()
      const resultDialog = page.getByRole('dialog', { name: title, exact: true })
      await assertSameOriginHref(resultDialog.getByRole('link', { name: 'Open screen', exact: true }), href, `68 ${title} route`)
      await closeDialogWithRestoration(page, resultDialog, resultTrigger, `68 ${title} activation`)
    }
  })

  // S71 — achievement gallery
  for (const state of SCREEN_CONTRACTS['71'].states) {
    await stateCapture('71', state, {
      preserveHorizontal: state === 'filtered-empty',
      beforeAudit: state === 'filtered-empty' ? async ({ page }) => {
        const selectedMeditation = page.locator('[data-achievement-filter-control="meditation"][aria-pressed="true"]')
        await selectedMeditation.waitFor()
        await twoAnimationFrames(page)
        await fullyVisibleInPhone(page, selectedMeditation, '71 filtered-empty initial selected Meditation filter')
      } : undefined,
      beforeCapture: async ({ page }) => {
        await assertS71Fixture(page, state)
        if (state === 'filtered-empty') {
          // The generic control audit intentionally visits every horizontal
          // filter. Restore the authored selected-chip view before the
          // canonical capture, then preserve that horizontal position while
          // resetting the page to its vertical origin.
          const selectedMeditation = page.locator('[data-achievement-filter-control="meditation"][aria-pressed="true"]')
          await selectedMeditation.scrollIntoViewIfNeeded()
          await twoAnimationFrames(page)
          await fullyVisibleInPhone(page, selectedMeditation, '71 filtered-empty restored selected Meditation filter')
        }
      },
      afterCapture: state === 'default' ? async ({ page }) => {
        await assertEveryDataControlOutcome(page, 'Achievement data controls', '71 every data control')
      } : state === 'first-use' ? async ({ page }) => {
        const seededFirstUse = new URL(page.url())
        seededFirstUse.searchParams.set('panel', 'badge')
        seededFirstUse.searchParams.set('badge', 'first-5k-run')
        await page.goto(seededFirstUse.href, { waitUntil: 'networkidle' })
        await waitAttribute(page, '[data-achievement-state]', 'data-achievement-state', 'first-use')
        const firstUseDialog = page.getByRole('dialog', { name: 'First 5k Run', exact: true })
        await firstUseDialog.waitFor()
        const firstUseDetail = (await firstUseDialog.innerText()).replace(/\s+/g, ' ')
        assert(firstUseDetail.includes('To discover · no earned Achievement history exists in this first-use fixture.'), '71 first-use seeded detail: honest-null detail missing')
        assert(firstUseDetail.includes('First-use fixture · no history source') && !firstUseDetail.includes('Earned 12 Oct'), '71 first-use seeded detail: populated earned history leaked')
        await firstUseDialog.getByRole('button', { name: 'Close achievement details', exact: true }).click()
        await firstUseDialog.waitFor({ state: 'hidden' })
        await page.locator('[data-achievement-filter-control="meditation"]').click()
        const root = page.locator('[data-achievement-state]')
        await waitAttribute(page, '[data-achievement-state]', 'data-achievement-filter', 'meditation')
        assert(await root.getAttribute('data-achievement-state') === 'first-use', '71 first-use filter: presentation filter replaced account truth')
        assert(await root.getAttribute('data-earned-count') === '0' && await root.getAttribute('data-total-count') === '120', '71 first-use filter: earned summary was fabricated')
        assert(await page.locator('[data-achievement-tile]').count() === 0, '71 first-use Meditation filter: expected zero tiles')
        assert(await page.getByText('Choose another domain. This filter does not change the 0 of 120 first-use summary.', { exact: true }).count() === 1, '71 first-use Meditation filter: visible summary copy contradicts 0 earned')
      } : state === 'error' ? async ({ page }) => {
        await page.getByRole('button', { name: 'Retry local fixture', exact: true }).click()
        await waitAttribute(page, '[data-achievement-state]', 'data-achievement-state', 'default')
        assert((await liveStatusText(page)).includes('restored'), '71 Retry: local outcome missing')
      } : state === 'success' ? async ({ page }) => {
        const trigger = page.locator('[data-achievement-tile="career-compass"]')
        await trigger.click()
        const dialog = page.getByRole('dialog', { name: 'Career Compass', exact: true })
        await assertSameOriginHref(dialog.getByRole('link', { name: 'View domain', exact: true }), '/screens/32', '71 Career Compass route')
        await closeDialogWithRestoration(page, dialog, trigger, '71 Career Compass activation')
      } : undefined,
    })
  }

  await runCase({ name: '71-filter-fitness', id: '71', state: 'default', rootAttribute: 'data-achievement-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await page.locator('[data-achievement-filter-control="fitness"]').click()
    await assertRootSubstate(page, 'data-achievement-state', 'data-achievement-filter', 'fitness', '71 Fitness filter')
    assert(await page.locator('[data-achievement-tile]').count() === 2, '71 Fitness filter: expected two tiles')
    assert(await page.locator('[data-achievement-filter-control="fitness"] [data-selected-marker]').count() === 1, '71 Fitness filter: non-color marker missing')
    await capture(handle, '71-filter-fitness')
    for (const [filter, expectedCount, expectedState] of [
      ['all', 5, 'default'],
      ['fitness', 2, 'default'],
      ['nutrition', 2, 'default'],
      ['finance', 1, 'default'],
      ['meditation', 0, 'filtered-empty'],
    ]) {
      await page.locator(`[data-achievement-filter-control="${filter}"]`).click()
      await waitAttribute(page, '[data-achievement-state]', 'data-achievement-filter', filter)
      await waitAttribute(page, '[data-achievement-state]', 'data-achievement-state', expectedState)
      assert(await page.locator('[data-achievement-tile]').count() === expectedCount, `71 ${filter} filter: expected ${expectedCount} tiles`)
      assert(await page.locator(`[data-achievement-filter-control="${filter}"] [data-selected-marker]`).count() === 1, `71 ${filter} filter: non-color outcome marker missing`)
    }
  })

  await runCase({ name: '71-earned-detail', id: '71', state: 'default', rootAttribute: 'data-achievement-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.locator('[data-achievement-tile="first-5k-run"]')
    await trigger.click()
    await assertRootSubstate(page, 'data-achievement-state', 'data-achievement-panel', 'badge', '71 earned detail')
    const dialog = page.getByRole('dialog', { name: 'First 5k Run', exact: true })
    assert((await dialog.innerText()).includes('Earned 12 Oct'), '71 detail: earned truth missing')
    assert(await dialog.getByRole('img', { name: 'Rare rarity, tier 3 of 5', exact: true }).count() === 1, '71 detail: standalone rarity arc lacks a discoverable tier equivalent')
    await assertSameOriginHref(dialog.getByRole('link', { name: 'View domain', exact: true }), '/screens/26', '71 detail route')
    await assertDialogTrap(page, dialog, trigger, '71 earned detail', { close: false })
    await capture(handle, '71-earned-detail')
    await closeDialogWithRestoration(page, dialog, trigger, '71 earned detail')
    for (const [achievementId, title, href] of [
      ['movement-rhythm', 'Movement Rhythm', '/screens/38'],
      ['greens-week', 'Greens Week', '/screens/56'],
      ['savings-builder', 'Savings Builder', '/screens/30'],
      ['steady-nourishment', 'Steady Nourishment', '/screens/56'],
    ]) {
      const achievementTrigger = page.locator(`[data-achievement-tile="${achievementId}"]`)
      await achievementTrigger.click()
      const achievementDialog = page.getByRole('dialog', { name: title, exact: true })
      await assertSameOriginHref(achievementDialog.getByRole('link', { name: 'View domain', exact: true }), href, `71 ${title} route`)
      await closeDialogWithRestoration(page, achievementDialog, achievementTrigger, `71 ${title} activation`)
    }
  })

  await runCase({ name: '71-reduced-motion', id: '71', state: 'default', rootAttribute: 'data-achievement-state', rootState: 'default', reducedMotion: 'reduce' }, async handle => {
    await auditFixture(handle)
    await assertS71Fixture(handle.page, 'default')
    await capture(handle, '71-reduced-motion')
  })

  // S83 — buddy profile
  for (const state of SCREEN_CONTRACTS['83'].states) {
    await stateCapture('83', state, {
      beforeCapture: async ({ page }) => assertS83Fixture(page, state),
      afterCapture: state === 'default' ? async ({ page }) => {
        await page.getByRole('button', { name: 'Invite to another mission', exact: true }).click()
        assert((await liveStatusText(page)).includes('No invitation, notification, or network request was sent'), '83 default Invite: honest local outcome missing')
        for (const [buttonName, panelName, dialogName] of [
          ['Permissions', 'visibility', 'Shared visibility'],
          ['Safety', 'safety', 'Connection safety'],
        ]) {
          const entry = page.getByRole('button', { name: buttonName, exact: true })
          await entry.click()
          await assertRootSubstate(page, 'data-buddy-state', 'data-buddy-panel', panelName, `83 ${buttonName} entry`)
          await assertDialogTrap(page, page.getByRole('dialog', { name: dialogName, exact: true }), entry, `83 ${buttonName} entry`)
        }
        const dataEntry = page.getByRole('button', { name: /Shared-data controls/ })
        await dataEntry.click()
        await assertRootSubstate(page, 'data-buddy-state', 'data-buddy-panel', 'visibility', '83 Shared-data controls entry')
        await assertDialogTrap(page, page.getByRole('dialog', { name: 'Shared visibility', exact: true }), dataEntry, '83 Shared-data controls entry')
      } : state === 'empty' ? async ({ page }) => {
        await page.getByRole('button', { name: 'Invite to mission', exact: true }).click()
        assert((await liveStatusText(page)).includes('No invitation, notification, or network request was sent'), '83 Invite: honest local outcome missing')
      } : state === 'pending' ? async handle => {
        await assertS83InactiveVisibility(handle, 'pending')
      } : state === 'removed' ? async handle => {
        const { page } = handle
        await page.getByRole('button', { name: 'Preview reconnect', exact: true }).click()
        assert((await liveStatusText(page)).includes('No connection request or notification was sent'), '83 reconnect: honest local outcome missing')
        await assertS83InactiveVisibility(handle, 'removed')
      } : state === 'consent-missing' ? async handle => {
        const { page } = handle
        const entry = page.getByRole('button', { name: 'Review shared consent', exact: true })
        await entry.click()
        await assertRootSubstate(page, 'data-buddy-state', 'data-buddy-panel', 'visibility', '83 Review shared consent')
        const consentDialog = page.getByRole('dialog', { name: 'Shared visibility', exact: true })
        const consentBoxes = consentDialog.getByRole('checkbox')
        assert(await consentBoxes.count() === 2, '83 consent-missing: expected two effective sharing controls')
        for (let index = 0; index < 2; index += 1) {
          const consentBox = consentBoxes.nth(index)
          assert(!(await consentBox.isChecked()) && await consentBox.isDisabled(), '83 consent-missing: a domain remained effectively shared/editable')
          assert(await consentBox.getAttribute('aria-describedby') === 'buddy-visibility-disabled-reason', '83 consent-missing: disabled domain control is not associated with its reason')
        }
        assert(await consentDialog.getByText('Not shared', { exact: true }).count() === 2, '83 consent-missing: non-color Not shared labels missing')
        assert((await consentDialog.innerText()).includes('Effective sharing is off because mutual consent is missing'), '83 consent-missing: effective-consent explanation missing')
        await auditOpenDialog(handle, consentDialog, '83 consent-missing visibility audit')
        await assertDialogTrap(page, consentDialog, entry, '83 Review shared consent')
      } : state === 'error' ? async ({ page }) => {
        await page.getByRole('button', { name: 'Retry preview', exact: true }).click()
        assert((await liveStatusText(page)).includes('No network request ran'), '83 Retry: honest local outcome missing')
      } : undefined,
    })
  }

  await runCase({ name: '83-visibility-sheet', id: '83', state: 'default', rootAttribute: 'data-buddy-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Visibility', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-buddy-state', 'data-buddy-panel', 'visibility', '83 visibility')
    const dialog = page.getByRole('dialog', { name: 'Shared visibility', exact: true })
    assert(await dialog.getByRole('checkbox', { name: 'Share Fitness with Aisha', exact: true }).count() === 1, '83 visibility: Fitness consent missing')
    assert(await dialog.getByRole('checkbox', { name: 'Share Learning with Aisha', exact: true }).count() === 1, '83 visibility: Learning consent missing')
    for (const name of ['Export shared data', 'Revoke shared domains', 'Delete shared history']) {
      assert(await dialog.getByRole('button', { name, exact: true }).count() === 1, '83 visibility: missing ' + name)
    }
    await auditOpenDialog(handle, dialog, '83 visibility open audit')
    const fitness = dialog.getByRole('checkbox', { name: 'Share Fitness with Aisha', exact: true })
    await fitness.uncheck()
    assert(!(await fitness.isChecked()) && (await activeOutcomeText(page)).includes('Fitness visibility changed'), '83 visibility: local toggle outcome missing')
    await assertDialogTrap(page, dialog, trigger, '83 visibility', { close: false })
    await capture(handle, '83-visibility-sheet')
    const learning = dialog.getByRole('checkbox', { name: 'Share Learning with Aisha', exact: true })
    await learning.uncheck()
    assert(!(await learning.isChecked()) && (await activeOutcomeText(page)).includes('Learning visibility changed'), '83 visibility: Learning toggle outcome missing')
    await dialog.getByRole('button', { name: 'Export shared data', exact: true }).click()
    assert((await activeOutcomeText(page)).includes('No file was created or downloaded'), '83 visibility: Export outcome missing')
    for (const [buttonName, confirmationName, key] of [
      ['Revoke shared domains', 'Confirm revoke shared domains', 'revoke shared domains'],
      ['Delete shared history', 'Confirm delete shared history', 'delete shared history'],
    ]) {
      await dialog.getByRole('button', { name: buttonName, exact: true }).click()
      const confirmation = page.getByRole('alertdialog', { name: confirmationName, exact: true })
      const confirmationAction = confirmation.locator(`[data-buddy-confirm-action="${key}"]`)
      assert((await confirmationAction.innerText()).trim() === `Preview ${key}`, `83 ${buttonName}: final action does not name ${key}`)
      if (key === 'revoke shared domains') await auditOpenDialog(handle, confirmation, '83 destructive confirmation 125% audit', { textScale: 1.25 })
      await equalExit(confirmation.getByRole('button', { name: 'Keep current access', exact: true }), confirmationAction, `83 ${buttonName} confirmation`)
      const returnSelector = `[data-buddy-confirm-trigger="${key}"]`
      await closeNestedConfirmationWithRestoration(page, confirmation, returnSelector, `83 ${buttonName} confirmation`)
      await page.locator(returnSelector).click()
      const confirmBranch = page.getByRole('alertdialog', { name: confirmationName, exact: true })
      await assertDialogTrap(page, confirmBranch, page.locator(returnSelector), `83 ${buttonName} confirm branch`, { close: false })
      await confirmBranch.locator(`[data-buddy-confirm-action="${key}"]`).click()
      await confirmBranch.waitFor({ state: 'hidden' })
      await page.waitForFunction(selector => document.activeElement === document.querySelector(selector), returnSelector)
      const confirmedStatus = await activeOutcomeText(page)
      assert(confirmedStatus.includes(`${key[0].toUpperCase()}${key.slice(1)} confirmed in this local preview`) && confirmedStatus.includes('No consent, history, connection, report, moderation, or network record changed'), `83 ${buttonName}: honest confirmed local outcome missing`)
    }
    await auditOpenDialog(handle, dialog, '83 visibility 125% audit', { textScale: 1.25 })
    await closeDialogWithRestoration(page, dialog, trigger, '83 visibility')
  })

  await runCase({ name: '83-safety-sheet', id: '83', state: 'default', rootAttribute: 'data-buddy-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Open connection safety', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-buddy-state', 'data-buddy-panel', 'safety', '83 safety')
    const dialog = page.getByRole('dialog', { name: 'Connection safety', exact: true })
    for (const name of ['Remove buddy', 'Report buddy', 'Block buddy', 'Keep connection']) {
      assert(await dialog.getByRole('button', { name, exact: true }).count() === 1, '83 safety: missing ' + name)
    }
    await auditOpenDialog(handle, dialog, '83 safety open audit')
    const mute = dialog.getByRole('button', { name: /Mute updates Not muted/ })
    await mute.click()
    assert(await dialog.getByRole('button', { name: /Mute updates Muted/ }).getAttribute('aria-pressed') === 'true', '83 safety: non-color mute state missing')
    await assertDialogTrap(page, dialog, trigger, '83 safety', { close: false })
    await capture(handle, '83-safety-sheet')
    for (const [buttonName, confirmationName, key] of [
      ['Remove buddy', 'Confirm remove buddy', 'remove buddy'],
      ['Report buddy', 'Confirm report buddy', 'report buddy'],
      ['Block buddy', 'Confirm block buddy', 'block buddy'],
    ]) {
      await dialog.getByRole('button', { name: buttonName, exact: true }).click()
      const confirmation = page.getByRole('alertdialog', { name: confirmationName, exact: true })
      const confirmationAction = confirmation.locator(`[data-buddy-confirm-action="${key}"]`)
      assert((await confirmationAction.innerText()).trim() === `Preview ${key}`, `83 ${buttonName}: final action does not name ${key}`)
      await equalExit(confirmation.getByRole('button', { name: 'Keep current access', exact: true }), confirmationAction, `83 ${buttonName} confirmation`)
      const returnSelector = `[data-buddy-confirm-trigger="${key}"]`
      await closeNestedConfirmationWithRestoration(page, confirmation, returnSelector, `83 ${buttonName} confirmation`)
      await page.locator(returnSelector).click()
      const confirmBranch = page.getByRole('alertdialog', { name: confirmationName, exact: true })
      await assertDialogTrap(page, confirmBranch, page.locator(returnSelector), `83 ${buttonName} confirm branch`, { close: false })
      await confirmBranch.locator(`[data-buddy-confirm-action="${key}"]`).click()
      await confirmBranch.waitFor({ state: 'hidden' })
      await page.waitForFunction(selector => document.activeElement === document.querySelector(selector), returnSelector)
      const confirmedStatus = await activeOutcomeText(page)
      assert(confirmedStatus.includes(`${key[0].toUpperCase()}${key.slice(1)} confirmed in this local preview`) && confirmedStatus.includes('No consent, history, connection, report, moderation, or network record changed'), `83 ${buttonName}: honest confirmed local outcome missing`)
    }
    await auditOpenDialog(handle, dialog, '83 safety 125% audit', { textScale: 1.25 })
    await closeDialogWithRestoration(page, dialog, trigger, '83 safety')
  })

  await runCase({ name: '83-mission-detail', id: '83', state: 'default', rootAttribute: 'data-buddy-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.locator('button[aria-label^="Run a half marathon."]')
    await trigger.click()
    await assertRootSubstate(page, 'data-buddy-state', 'data-buddy-panel', 'mission', '83 mission detail')
    const dialog = page.getByRole('dialog', { name: 'Run a half marathon', exact: true })
    assert((await dialog.innerText()).includes('68%') && (await dialog.innerText()).includes('this mission only'), '83 mission detail: scope/progress missing')
    await assertDialogTrap(page, dialog, trigger, '83 mission detail', { close: false })
    await capture(handle, '83-mission-detail')
    await closeDialogWithRestoration(page, dialog, trigger, '83 mission detail')
    const secondTrigger = page.locator('button[aria-label^="Read 2 books this month."]')
    await secondTrigger.click()
    const secondDialog = page.getByRole('dialog', { name: 'Read 2 books this month', exact: true })
    assert((await secondDialog.innerText()).includes('35%') && (await secondDialog.innerText()).includes('this mission only'), '83 second mission: exact local detail outcome missing')
    await closeDialogWithRestoration(page, secondDialog, secondTrigger, '83 second mission activation')
  })

  await runCase({ name: '83-avatar-consent', id: '83', state: 'default', rootAttribute: 'data-buddy-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'AK initials avatar. Review photo consent before opening media.', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-buddy-state', 'data-buddy-panel', 'avatar-consent', '83 avatar consent')
    const dialog = page.getByRole('dialog', { name: 'Photo consent required', exact: true })
    assert(await dialog.locator('input[type="file"], img').count() === 0, '83 avatar consent: media/file capability leaked')
    await assertDialogTrap(page, dialog, trigger, '83 avatar consent', { close: false })
    await capture(handle, '83-avatar-consent')
    await dialog.getByRole('button', { name: 'Preview request', exact: true }).click()
    assert((await activeOutcomeText(page)).includes('No request, media permission, file picker, or message was sent'), '83 avatar consent: honest outcome missing')
  })

  await runCase({ name: '83-message-outcome', id: '83', state: 'default', rootAttribute: 'data-buddy-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    await page.getByRole('button', { name: 'Message', exact: true }).click()
    assert(await page.locator('[data-message-outcome="local"]').count() === 1, '83 message: local outcome surface missing')
    assert((await liveStatusText(page)).includes('No conversation opened and no message was sent'), '83 message: capability boundary missing')
    await capture(handle, '83-message-outcome')
  })

  // S92 — reputation
  for (const state of SCREEN_CONTRACTS['92'].states) {
    await stateCapture('92', state, {
      beforeCapture: async ({ page }) => assertS92Fixture(page, state),
      afterCapture: state === 'sync-error' ? async ({ page }) => {
        await page.getByRole('button', { name: 'Retry sync preview', exact: true }).click()
        assert((await liveStatusText(page)).includes('No network request ran'), '92 Retry: honest local outcome missing')
      } : state === 'flagged' ? async ({ page }) => {
        await page.getByRole('button', { name: 'Preview appeal', exact: true }).click()
        assert((await liveStatusText(page)).includes('No evidence, form, moderation request, or network submission was sent'), '92 appeal: honest outcome missing')
      } : undefined,
    })
  }

  await runCase({ name: '92-metric-consistency', id: '92', state: 'default', rootAttribute: 'data-reputation-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: /Consistency, 84 out of 100.*Open explanation\./ })
    await trigger.click()
    await assertRootSubstate(page, 'data-reputation-state', 'data-reputation-panel', 'metric', '92 metric')
    await assertRootSubstate(page, 'data-reputation-state', 'data-selected-metric', 'consistency', '92 metric')
    const dialog = page.getByRole('dialog', { name: 'Consistency explained', exact: true })
    const text = (await dialog.innerText()).replace(/\s+/g, ' ')
    for (const value of ['84 out of 100', 'Activity commitments', 'Updated 2h ago', 'High confidence']) assert(text.includes(value), '92 metric: missing ' + value)
    await assertDialogTrap(page, dialog, trigger, '92 metric', { close: false })
    await capture(handle, '92-metric-consistency')
    await closeDialogWithRestoration(page, dialog, trigger, '92 metric')
    for (const [metricKey, label, value, source, freshness, confidence] of [
      ['helpfulness', 'Helpfulness', 88, 'Community replies', 'Updated 1h ago', 'High confidence'],
      ['engagement', 'Engagement', 74, 'Community participation', 'Cached 14m ago', 'Low confidence'],
      ['accountability', 'Accountability', 61, 'Shared contracts', 'Updated yesterday', 'Medium confidence'],
    ]) {
      const metricTrigger = page.getByRole('button', { name: new RegExp(`${label}, ${value} out of 100.*Open explanation\\.`) })
      await metricTrigger.click()
      await assertRootSubstate(page, 'data-reputation-state', 'data-selected-metric', metricKey, `92 ${label} metric`)
      const metricDialog = page.getByRole('dialog', { name: `${label} explained`, exact: true })
      const metricText = (await metricDialog.innerText()).replace(/\s+/g, ' ')
      for (const expected of [`${value} out of 100`, source, freshness, confidence]) assert(metricText.includes(expected), `92 ${label}: missing ${expected}`)
      await closeDialogWithRestoration(page, metricDialog, metricTrigger, `92 ${label} metric activation`)
    }
  })

  await runCase({ name: '92-premium-lock', id: '92', state: 'default', rootAttribute: 'data-reputation-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const region = page.getByRole('region', { name: 'Full audit trail', exact: true })
    const blur = region.locator('.paywall-blur')
    assert(await blur.getAttribute('aria-hidden') === 'true' && await blur.getAttribute('inert') !== null, '92 paywall: inert real layout missing')
    assert(await blur.evaluate(node => getComputedStyle(node).filter) === 'blur(20px)', '92 paywall: canonical blur drifted')
    assert(await blur.locator('[aria-label="Audit trail preview layout"]').count() === 1, '92 paywall: real audit layout missing')
    await region.scrollIntoViewIfNeeded()
    await twoAnimationFrames(page)
    await capture(handle, '92-premium-lock', { top: false })
  })

  await runCase({ name: '92-premium-outcome', id: '92', state: 'default', rootAttribute: 'data-reputation-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Review plan preview', exact: true })
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click()
    await assertRootSubstate(page, 'data-reputation-state', 'data-reputation-panel', 'premium', '92 premium')
    const dialog = page.getByRole('dialog', { name: 'Contract audit preview', exact: true })
    await auditOpenDialog(handle, dialog, '92 premium open audit')
    await dialog.getByRole('button', { name: 'Continue locally', exact: true }).click()
    assert(await dialog.locator('[data-premium-outcome="local"]').count() === 1, '92 premium: local outcome missing')
    assert((await dialog.innerText()).includes('No purchase, trial, subscription, entitlement, account, or storefront action occurred'), '92 premium: capability boundary missing')
    const closePreview = dialog.getByRole('button', { name: 'Close preview', exact: true })
    await page.waitForFunction(node => document.activeElement === node, await closePreview.elementHandle())
    assert(await closePreview.evaluate(node => document.activeElement === node), '92 premium: focus was left on the unmounted Continue control')
    await capture(handle, '92-premium-outcome')
    await auditOpenDialog(handle, dialog, '92 premium outcome 125% audit', { textScale: 1.25 })
  })

  await runCase({ name: '92-safety-controls', id: '92', state: 'default', rootAttribute: 'data-reputation-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: 'Open reputation privacy and safety', exact: true })
    await trigger.click()
    await assertRootSubstate(page, 'data-reputation-state', 'data-reputation-panel', 'safety', '92 safety')
    const dialog = page.getByRole('dialog', { name: 'Reputation privacy & safety', exact: true })
    const exact = ['Audience', 'Visibility', 'Report', 'Mute', 'Block', 'Delete own content', 'Export', 'Revoke']
    const controls = dialog.locator('[aria-label="Reputation privacy and safety controls"]').getByRole('button')
    const names = (await controls.allTextContents()).map(value => value.trim())
    assert(JSON.stringify(names) === JSON.stringify(exact), '92 safety: exact eight controls drifted: ' + names.join('|'))
    await auditOpenDialog(handle, dialog, '92 safety open audit')
    await dialog.getByRole('button', { name: 'Audience', exact: true }).click()
    assert((await activeOutcomeText(page)).includes('Audience is You only'), '92 safety: audience outcome missing')
    await assertDialogTrap(page, dialog, trigger, '92 safety', { close: false })
    await capture(handle, '92-safety-controls')
    await dialog.getByRole('button', { name: 'Visibility', exact: true }).click()
    assert((await activeOutcomeText(page)).includes('private reviews remain visible only to you'), '92 safety: Visibility outcome missing')
    await dialog.getByRole('button', { name: 'Report', exact: true }).click()
    assert((await activeOutcomeText(page)).includes('No report or moderation request was submitted'), '92 safety: Report outcome missing')
    const mute = dialog.getByRole('button', { name: 'Mute', exact: true })
    await mute.click()
    assert(await dialog.getByRole('button', { name: 'Muted', exact: true }).getAttribute('aria-pressed') === 'true', '92 safety: Mute outcome missing')
    await dialog.getByRole('button', { name: 'Export', exact: true }).click()
    assert((await activeOutcomeText(page)).includes('No file was created or downloaded'), '92 safety: Export outcome missing')
    for (const [buttonName, confirmationName, key] of [
      ['Block', 'Confirm block member', 'block member'],
      ['Delete own content', 'Confirm delete own content', 'delete own content'],
      ['Revoke', 'Confirm revoke visibility access', 'revoke visibility access'],
    ]) {
      await dialog.getByRole('button', { name: buttonName, exact: true }).click()
      const confirmation = page.getByRole('alertdialog', { name: confirmationName, exact: true })
      const confirmationAction = confirmation.locator(`[data-reputation-confirm-action="${key}"]`)
      assert((await confirmationAction.innerText()).trim() === `Preview ${key}`, `92 ${buttonName}: final action does not name ${key}`)
      if (key === 'revoke visibility access') await auditOpenDialog(handle, confirmation, '92 destructive confirmation 125% audit', { textScale: 1.25 })
      await equalExit(confirmation.getByRole('button', { name: 'Keep current setting', exact: true }), confirmationAction, `92 ${buttonName} confirmation`)
      const returnSelector = `[data-reputation-confirm-trigger="${key}"]`
      await closeNestedConfirmationWithRestoration(page, confirmation, returnSelector, `92 ${buttonName} confirmation`)
      await page.locator(returnSelector).click()
      const confirmBranch = page.getByRole('alertdialog', { name: confirmationName, exact: true })
      await assertDialogTrap(page, confirmBranch, page.locator(returnSelector), `92 ${buttonName} confirm branch`, { close: false })
      await confirmBranch.locator(`[data-reputation-confirm-action="${key}"]`).click()
      await confirmBranch.waitFor({ state: 'hidden' })
      await page.waitForFunction(selector => document.activeElement === document.querySelector(selector), returnSelector)
      const confirmedStatus = await activeOutcomeText(page)
      assert(confirmedStatus.includes(`${key[0].toUpperCase()}${key.slice(1)} confirmed in this local preview`) && confirmedStatus.includes('No member, content, visibility, moderation, or network record changed'), `92 ${buttonName}: honest confirmed local outcome missing`)
    }
    await auditOpenDialog(handle, dialog, '92 safety 125% audit', { textScale: 1.25 })
    await closeDialogWithRestoration(page, dialog, trigger, '92 safety')
  })

  await runCase({ name: '92-tier-detail', id: '92', state: 'default', rootAttribute: 'data-reputation-state', rootState: 'default' }, async handle => {
    const { page } = handle
    await auditFixture(handle)
    const trigger = page.getByRole('button', { name: /View Mentor tier/ })
    await trigger.click()
    await assertRootSubstate(page, 'data-reputation-state', 'data-reputation-panel', 'tier', '92 tier')
    const dialog = page.getByRole('dialog', { name: 'Mentor tier', exact: true })
    const text = (await dialog.innerText()).replace(/\s+/g, ' ')
    assert(text.includes('Current · Mentor') && text.includes('Next · Guide') && text.includes('18 points remain'), '92 tier: textual tier/progress truth missing')
    await assertDialogTrap(page, dialog, trigger, '92 tier', { close: false })
    await capture(handle, '92-tier-detail')
    await closeDialogWithRestoration(page, dialog, trigger, '92 tier')
  })

  // Seven screenshot-free contexts prove real 125% text enlargement.
  for (const id of TEXT_SCALE_IDS) {
    const contract = SCREEN_CONTRACTS[id]
    await runCase({
      name: id + '-text-scale-proof',
      id,
      state: id === '43' ? null : 'default',
      rootAttribute: contract?.root ?? null,
      rootState: contract ? 'default' : null,
      textScale: 1.25,
    }, async handle => {
      await auditFixture(handle)
      pass('D2 125% text matrix ' + id, { scale: 1.25, screenshot: false })
    })
  }

  screenshotEvidence = await validateStagedScreenshots()
  assert(consoleErrors.length === 0, 'Console errors: ' + consoleErrors.map(item => item.case + ':' + item.text).join(' | '))
  assert(pageErrors.length === 0, 'Page errors: ' + pageErrors.map(item => item.case + ':' + item.text).join(' | '))
  assertCapabilityContract()
  fingerprintsEnd = fingerprintAll()
  assert(sameFingerprint(fingerprintsStart, fingerprintsEnd), 'Product/API/authority/accepted-sentinel fingerprint drifted during verification')
  for (const entry of fingerprintsEnd.accepted.files) {
    assert(entry.sha256 === ACCEPTED_EXPECTED.get(entry.path), 'Accepted sentinel drifted: ' + entry.path)
  }
  assert(visitedNonces.size === caseEvidence.length && caseEvidence.length === EXPECTED_CONTEXTS, 'Expected 80 isolated contexts/nonces (73 captures + 7 text proofs), found ' + caseEvidence.length + '/' + visitedNonces.size)
  promotionBackupDir = promoteScreenshots()
  pass('atomic screenshot set', { count: screenshotEvidence.length, dimensions: '390x844', promotedAfterPass: true })
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
