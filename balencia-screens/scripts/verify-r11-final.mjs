import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// R11 source-side certification guard.
//
// This is deliberately a source and capture-integrity verifier, not a final
// certificate issuer. It can prove deterministic facts about one checked-out
// tree and two strict capture runs; independent design/accessibility/trust
// reviews and founder waivers remain manual evidence requirements.
//
// Required inputs:
//   node scripts/verify-r11-final.mjs \
//     --expected-sha <post-commit HEAD> \
//     --expected-parent <fetched origin/main SHA> \
//     --base http://localhost:3002 \
//     --evidence-root ../plans/batches/VISUAL-016-R11-final-104/evidence
//
// The two strict runs must have been produced with:
//   AUDIT_GIT_SHA=<post-commit HEAD> node scripts/verify-visual-104.mjs \
//     --strict --screenshots --base http://localhost:3002 \
//     --out <evidence-root>/r11-strict-pass-1.json --shots-dir <evidence-root>/strict-pass-1
// and the equivalent pass-2 paths.

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.resolve(scriptDir, '..')
const repoRoot = path.resolve(appRoot, '..')
const args = process.argv.slice(2)

function argValue(flag) {
  const index = args.indexOf(flag)
  return index === -1 ? undefined : args[index + 1]
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`
  }
  return JSON.stringify(value)
}

function shaJson(value) {
  return sha256(canonicalJson(value))
}

function relativeToRepo(file) {
  return path.relative(repoRoot, file).split(path.sep).join('/')
}

function runGit(...gitArgs) {
  return execFileSync('git', ['-C', repoRoot, ...gitArgs], { encoding: 'utf8' }).trim()
}

function readFileHash(file) {
  return sha256(fs.readFileSync(file))
}

function sortedFiles(root, predicate = () => true) {
  if (!fs.existsSync(root)) return []
  const entries = []
  for (const item of fs.readdirSync(root, { withFileTypes: true })) {
    const target = path.join(root, item.name)
    if (item.isDirectory()) entries.push(...sortedFiles(target, predicate))
    else if (item.isFile() && predicate(target)) entries.push(target)
  }
  return entries.sort((a, b) => relativeToRepo(a).localeCompare(relativeToRepo(b)))
}

function fileTree(root, predicate) {
  const files = sortedFiles(root, predicate)
  const entries = files.map(file => ({ path: relativeToRepo(file), sha256: readFileHash(file), bytes: fs.statSync(file).size }))
  return { files: entries, digest: shaJson(entries) }
}

function parseScreens() {
  const source = fs.readFileSync(path.join(appRoot, 'src/data/screens.ts'), 'utf8')
  const matches = [...source.matchAll(/\{\s*id:\s*'([^']+)'\s*,\s*number:\s*'([^']+)'\s*,\s*name:\s*'([^']+)'\s*,\s*route:\s*'([^']+)'/g)]
  return matches.map(match => ({ id: match[1], number: match[2], name: match[3], route: match[4] }))
}

function parseRegistryIds() {
  const root = path.join(appRoot, 'src/components/hifi/screens')
  const ids = []
  const files = []
  for (const family of fs.readdirSync(root, { withFileTypes: true })) {
    if (!family.isDirectory()) continue
    const index = path.join(root, family.name, 'index.ts')
    if (!fs.existsSync(index)) continue
    files.push(index)
    const source = fs.readFileSync(index, 'utf8')
    for (const match of source.matchAll(/'([0-9]{2}[a-z]?)'\s*:/g)) ids.push(match[1])
  }
  return { ids, files: files.sort((a, b) => relativeToRepo(a).localeCompare(relativeToRepo(b))) }
}

function pngMetadata(file) {
  const bytes = fs.readFileSync(file)
  const signature = '89504e470d0a1a0a'
  const actual = bytes.subarray(0, 8).toString('hex')
  if (actual !== signature || bytes.length < 24) throw new Error(`${relativeToRepo(file)} is not a valid PNG header`)
  return {
    file: path.basename(file),
    bytes: bytes.length,
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    sha256: sha256(bytes),
  }
}

function readJson(file, failures, label) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    failures.push(`${label}: cannot parse ${relativeToRepo(file)} (${error.message})`)
    return null
  }
}

function check(condition, message, failures) {
  if (!condition) failures.push(message)
}

function normaliseBase(raw, failures) {
  try {
    const url = new URL(raw)
    const isLoopback = ['localhost', '127.0.0.1', '[::1]', '::1'].includes(url.hostname)
    check(url.protocol === 'http:', `base must use http:, received ${url.protocol}`, failures)
    check(isLoopback, `base must be a loopback origin, received ${url.origin}`, failures)
    check(!url.username && !url.password && !url.search && !url.hash && (url.pathname === '/' || url.pathname === ''), `base must be an origin without credentials, query, fragment, or path: ${raw}`, failures)
    return url.origin
  } catch (error) {
    failures.push(`invalid --base ${JSON.stringify(raw)} (${error.message})`)
    return raw
  }
}

async function collectServedBuild(base, buildId) {
  const evidence = { base, localBuildId: buildId, root: null, buildAsset: null, status: 'not-observed' }
  try {
    const response = await fetch(`${base}/`, { redirect: 'error', signal: AbortSignal.timeout(10000) })
    const body = await response.text()
    evidence.root = { status: response.status, sha256: sha256(body), mentionsBuildId: body.includes(buildId) }
    if (!response.ok) {
      evidence.status = 'root-not-ok'
      return evidence
    }
    try {
      const asset = await fetch(`${base}/_next/static/${encodeURIComponent(buildId)}/_buildManifest.js`, {
        redirect: 'error', signal: AbortSignal.timeout(10000),
      })
      const assetBody = await asset.text()
      evidence.buildAsset = { status: asset.status, sha256: sha256(assetBody), bytes: Buffer.byteLength(assetBody) }
      evidence.status = asset.ok ? 'matched-build-id' : evidence.root.mentionsBuildId ? 'root-mentions-build-id' : 'served-build-id-not-confirmed'
    } catch (error) {
      evidence.buildAsset = { error: error.message }
      evidence.status = evidence.root.mentionsBuildId ? 'root-mentions-build-id' : 'served-build-id-not-confirmed'
    }
  } catch (error) {
    evidence.root = { error: error.message }
    evidence.status = 'unreachable'
  }
  return evidence
}

function buildManifest(shotsDir, ids, failures, label) {
  if (!fs.existsSync(shotsDir) || !fs.statSync(shotsDir).isDirectory()) {
    failures.push(`${label}: screenshot directory missing: ${relativeToRepo(shotsDir)}`)
    return { directory: shotsDir, entries: [], digest: null }
  }
  const actualNames = fs.readdirSync(shotsDir).filter(name => name.endsWith('.png')).sort()
  const expectedNames = ids.map(id => `${id}.png`)
  check(actualNames.length === 104, `${label}: expected exactly 104 PNGs, found ${actualNames.length}`, failures)
  check(canonicalJson(actualNames) === canonicalJson([...expectedNames].sort()), `${label}: PNG names must be exactly the 104 canonical route IDs`, failures)
  const entries = []
  for (const id of ids) {
    const file = path.join(shotsDir, `${id}.png`)
    if (!fs.existsSync(file)) continue
    try {
      const entry = { id, ...pngMetadata(file) }
      entries.push(entry)
      check(entry.width === 390 && entry.height === 844, `${label}: ${id}.png must be 390x844, found ${entry.width}x${entry.height}`, failures)
    } catch (error) {
      failures.push(`${label}: ${error.message}`)
    }
  }
  return { directory: shotsDir, entries, digest: shaJson(entries) }
}

function reportShape(report, label, expectedSha, base, expectedShotsDir, canonicalScreens, failures) {
  if (!report) return { records: [], screenshotEntries: [], reportHash: null, scannerHash: null, scannerScriptHash: null, runConfigHash: null, counts: null }
  const records = Array.isArray(report.results) ? report.results : []
  const expectedIds = canonicalScreens.map(screen => screen.id)
  const expectedRoutes = canonicalScreens.map(screen => screen.route)
  const expectedCanonicalRegistry = canonicalScreens.map(screen => ({ id: screen.id, route: screen.route }))
  const expectedCanonicalRegistryHash = sha256(JSON.stringify(expectedCanonicalRegistry))
  const expectedCaptureOrderHash = sha256(JSON.stringify(expectedIds))
  const ids = records.map(record => record?.id)
  const routes = records.map(record => record?.route)
  const counts = {
    screens: report.summary?.screens,
    records: records.length,
    issueScreens: report.summary?.issueScreens,
    warningScreens: report.summary?.warningScreens,
    totalIssues: report.summary?.totalIssues,
    totalWarnings: report.summary?.totalWarnings,
    actualIssues: records.reduce((total, record) => total + (Array.isArray(record?.issues) ? record.issues.length : 0), 0),
    actualWarnings: records.reduce((total, record) => total + (Array.isArray(record?.warnings) ? record.warnings.length : 0), 0),
  }
  check(report.scanner?.strict === true, `${label}: report must be a strict capture`, failures)
  check(report.scanner?.script === 'scripts/verify-visual-104.mjs', `${label}: unexpected scanner script`, failures)
  check(report.scanner?.gitSha === expectedSha, `${label}: scanner.gitSha must equal --expected-sha (run strict capture with AUDIT_GIT_SHA)`, failures)
  const currentScannerHash = readFileHash(path.join(scriptDir, 'verify-visual-104.mjs'))
  check(report.scanner?.scriptHash === currentScannerHash, `${label}: scanner scriptHash does not match the checked-out verifier`, failures)
  check(report.summary?.baseURL === base, `${label}: report baseURL ${JSON.stringify(report.summary?.baseURL)} does not equal ${base}`, failures)
  check(Boolean(report.summary?.screenshotDir), `${label}: report must declare summary.screenshotDir`, failures)
  if (report.summary?.screenshotDir) {
    check(path.resolve(report.summary.screenshotDir) === expectedShotsDir, `${label}: report screenshotDir must be ${relativeToRepo(expectedShotsDir)}`, failures)
  }
  const reportedConfigHash = crypto.createHash('sha256').update(JSON.stringify(report.scanner?.config ?? null)).digest('hex')
  check(typeof report.scanner?.configHash === 'string' && report.scanner.configHash.length > 0, `${label}: scanner configHash is missing`, failures)
  check(report.scanner?.configHash === reportedConfigHash, `${label}: scanner configHash does not match its reported config`, failures)
  const reportedRunConfigHash = sha256(JSON.stringify(report.scanner?.runConfig ?? null))
  check(typeof report.scanner?.runConfigHash === 'string' && report.scanner.runConfigHash.length > 0, `${label}: scanner runConfigHash is missing`, failures)
  check(report.scanner?.runConfigHash === reportedRunConfigHash, `${label}: scanner runConfigHash does not match its reported run config`, failures)
  const normalizedRunConfig = report.scanner?.runConfig
    ? { ...report.scanner.runConfig, shotsDir: report.scanner.runConfig.shotsDir ? '<capture-directory>' : null }
    : null
  const config = report.scanner?.config ?? {}
  check(config.viewport?.width === 390 && config.viewport?.height === 844, `${label}: scanner viewport must be 390x844`, failures)
  check(config.deviceScaleFactor === 1, `${label}: scanner DPR must be 1`, failures)
  check(config.reducedMotion === 'reduce', `${label}: scanner reducedMotion must be reduce`, failures)
  check(config.concurrency === 1 && config.serialized === true, `${label}: scanner must be serialized with concurrency 1`, failures)
  check(config.strictLocalProductionOrigin === base, `${label}: strict local production origin must equal ${base}`, failures)

  const runConfig = report.scanner?.runConfig ?? {}
  check(runConfig.strict === true, `${label}: runConfig.strict must be true`, failures)
  check(runConfig.baseURL === base && runConfig.baseOrigin === base, `${label}: run config must bind to ${base}`, failures)
  check(runConfig.auditGitSha === expectedSha, `${label}: run config must bind to expected SHA`, failures)
  check(runConfig.captureScreenshots === true, `${label}: strict proof must capture screenshots`, failures)
  check(path.resolve(runConfig.shotsDir || '.') === expectedShotsDir, `${label}: run config screenshot directory mismatch`, failures)
  check(runConfig.serializedCapture === true, `${label}: run config must assert serialized capture`, failures)
  check(runConfig.proofIsolation?.freshBrowserContextPerRoute === true && runConfig.proofIsolation?.freshPagePerRoute === true, `${label}: run config must assert fresh context/page per route`, failures)
  check(runConfig.canonicalRegistry?.screens === 104 && runConfig.canonicalRegistry?.hash === expectedCanonicalRegistryHash, `${label}: canonical registry hash/count mismatch`, failures)
  check(canonicalJson(runConfig.captureOrder) === canonicalJson(expectedIds) && runConfig.captureOrderHash === expectedCaptureOrderHash, `${label}: capture order/hash mismatch`, failures)
  check(runConfig.scannerConfigHash === report.scanner?.configHash, `${label}: run config scanner hash mismatch`, failures)
  check(typeof report.scanner?.browserVersion === 'string' && report.scanner.browserVersion.length > 0, `${label}: browserVersion is missing`, failures)
  check(typeof report.scanner?.nodeVersion === 'string' && report.scanner.nodeVersion.length > 0, `${label}: nodeVersion is missing`, failures)

  const screenshotEntries = records.map(record => ({ id: record?.id, route: record?.route, screenshot: record?.screenshot ?? null }))
  const declaredScreenshotEntries = Array.isArray(report.screenshotManifest?.entries) ? report.screenshotManifest.entries : []
  const declaredScreenshotHash = sha256(JSON.stringify(declaredScreenshotEntries))
  check(report.screenshotManifest?.algorithm === 'sha256', `${label}: screenshot manifest algorithm must be sha256`, failures)
  check(canonicalJson(declaredScreenshotEntries) === canonicalJson(screenshotEntries), `${label}: report screenshot manifest does not match result rows`, failures)
  check(report.screenshotManifest?.hash === declaredScreenshotHash, `${label}: screenshot manifest hash is not self-consistent`, failures)
  check(report.summary?.screenshotManifestHash === declaredScreenshotHash, `${label}: summary screenshot manifest hash mismatch`, failures)

  for (const record of records) {
    const eventFields = ['consoleMessages', 'pageErrors', 'externalRequests', 'requestFailures', 'capabilityEvents']
    for (const field of eventFields) check(Array.isArray(record?.[field]) && record[field].length === 0, `${label}: ${record?.id ?? '(unknown)'} has nonzero or missing ${field}`, failures)
    check(record?.fontReadiness?.ready === true, `${label}: ${record?.id ?? '(unknown)'} fonts are not ready`, failures)
    check(record?.proofIsolation?.freshBrowserContext === true && record?.proofIsolation?.freshPage === true, `${label}: ${record?.id ?? '(unknown)'} proof isolation assertion missing`, failures)
    const before = record?.browserState?.before
    const after = record?.browserState?.after
    check(before?.cookieCount === 0 && before?.storageState?.cookieCount === 0 && before?.storageState?.originCount === 0, `${label}: ${record?.id ?? '(unknown)'} context was not empty before capture`, failures)
    check(after?.cookieCount === 0, `${label}: ${record?.id ?? '(unknown)'} cookies were not empty after capture`, failures)
    for (const stateName of ['localStorage', 'sessionStorage', 'indexedDb', 'cacheStorage']) {
      const state = after?.[stateName]
      check(state?.supported === true && Array.isArray(state?.values) && state.values.length === 0, `${label}: ${record?.id ?? '(unknown)'} ${stateName} was unavailable or non-empty`, failures)
    }
  }
  check(canonicalJson(ids) === canonicalJson(expectedIds), `${label}: result IDs are not the canonical 104-route registry order`, failures)
  check(canonicalJson(routes) === canonicalJson(expectedRoutes), `${label}: result routes are not the canonical 104-route registry order`, failures)
  check(counts.screens === 104 && counts.records === 104, `${label}: expected 104 report rows, found summary=${counts.screens} rows=${counts.records}`, failures)
  check(counts.issueScreens === 0 && counts.warningScreens === 0 && counts.totalIssues === 0 && counts.totalWarnings === 0 && counts.actualIssues === 0 && counts.actualWarnings === 0, `${label}: strict report contains issues or warnings`, failures)
  return {
    records: records.map(record => ({ id: record.id, route: record.route, issues: record.issues, warnings: record.warnings })),
    screenshotEntries,
    reportHash: shaJson(report),
    scannerHash: report.scanner?.configHash ?? null,
    scannerScriptHash: report.scanner?.scriptHash ?? null,
    runConfigHash: report.scanner?.runConfigHash ?? null,
    normalizedRunConfigHash: shaJson(normalizedRunConfig),
    scannerConfigHash: shaJson(report.scanner?.config ?? null),
    browserVersion: report.scanner?.browserVersion ?? null,
    nodeVersion: report.scanner?.nodeVersion ?? null,
    counts,
  }
}

const expectedSha = argValue('--expected-sha')
const expectedParent = argValue('--expected-parent')
const explicitBase = argValue('--base')
const requestedBase = explicitBase || 'http://localhost:3002'
const defaultEvidenceRoot = path.resolve(appRoot, '../plans/batches/VISUAL-016-R11-final-104/evidence')
const evidenceRoot = path.resolve(process.cwd(), argValue('--evidence-root') || defaultEvidenceRoot)
const dryRun = args.includes('--dry-run')
const failures = []

check(Boolean(expectedSha), '--expected-sha is required', failures)
check(!expectedSha || /^[0-9a-f]{40}$/i.test(expectedSha), '--expected-sha must be a full 40-character Git SHA', failures)
check(Boolean(expectedParent), '--expected-parent is required', failures)
check(!expectedParent || /^[0-9a-f]{40}$/i.test(expectedParent), '--expected-parent must be a full 40-character Git SHA', failures)
const base = normaliseBase(requestedBase, failures)

let head = null
let tree = null
let parent = null
let parentLine = null
let parentCount = null
try {
  head = runGit('rev-parse', 'HEAD')
  tree = runGit('rev-parse', 'HEAD^{tree}')
  parent = runGit('rev-parse', 'HEAD^')
  parentLine = runGit('rev-list', '--parents', '-n', '1', 'HEAD')
  parentCount = Math.max(0, parentLine.split(/\s+/).filter(Boolean).length - 1)
} catch (error) {
  failures.push(`cannot read Git HEAD/tree/parent (${error.message})`)
}
check(Boolean(head && expectedSha && head === expectedSha), `HEAD ${head ?? '(unavailable)'} does not equal expected SHA ${expectedSha ?? '(missing)'}`, failures)
check(Boolean(parent && expectedParent && parent === expectedParent), `HEAD parent ${parent ?? '(unavailable)'} does not equal expected parent ${expectedParent ?? '(missing)'}`, failures)
check(parentCount === 1, `candidate must be a single-parent commit, found ${parentCount ?? '(unavailable)'} parents`, failures)

// Captures are valid only when their product, verifier, config, and accepted
// asset inputs exactly match the checked-out commit. Build output and the
// post-SHA evidence package live outside these paths (or are Git-ignored).
const committedInputPaths = [
  'balencia-screens',
  'Balencia/Balencia-Creatives-Reference/logos',
  'Balencia-New-Screens/canon',
  'Balencia-New-Screens/hifi-screens',
]
let committedInputStatus = null
try {
  committedInputStatus = runGit('status', '--porcelain=v1', '--untracked-files=all', '--', ...committedInputPaths)
} catch (error) {
  failures.push(`cannot inspect committed source inputs (${error.message})`)
}
check(!committedInputStatus, `committed source inputs differ from HEAD:\n${committedInputStatus || '(status unavailable)'}`, failures)

const buildIdPath = path.join(appRoot, '.next/BUILD_ID')
let buildId = null
try {
  buildId = fs.readFileSync(buildIdPath, 'utf8').trim()
  check(Boolean(buildId), '.next/BUILD_ID is empty', failures)
} catch (error) {
  failures.push(`cannot read .next/BUILD_ID (${error.message})`)
}

const canonicalScreens = parseScreens()
const canonicalIds = canonicalScreens.map(screen => screen.id)
const registry = parseRegistryIds()
const canonicalIdSet = new Set(canonicalIds)
const registryIdSet = new Set(registry.ids)
const duplicateRegistryIds = registry.ids.filter((id, index) => registry.ids.indexOf(id) !== index)
const challengeIds = ['30', '31', '03e', '99', '98']
const referenceIds = ['12', '75', '80', '83', '89', '90', '91', '93', '96', '97']
check(canonicalScreens.length === 104, `screen data must contain 104 entries, found ${canonicalScreens.length}`, failures)
check(canonicalIdSet.size === 104, `screen data must contain 104 unique canonical route IDs, found ${canonicalIdSet.size}`, failures)
check(registry.ids.length === 104, `hi-fi registry must contain 104 entries, found ${registry.ids.length}`, failures)
check(registryIdSet.size === 104 && duplicateRegistryIds.length === 0, `hi-fi registry must contain 104 unique IDs; duplicates: ${[...new Set(duplicateRegistryIds)].join(', ') || '(none)'}`, failures)
check(canonicalJson([...registryIdSet].sort()) === canonicalJson([...canonicalIdSet].sort()), 'hi-fi registry IDs do not exactly match canonical screen IDs', failures)
for (const id of [...challengeIds, ...referenceIds]) {
  check(canonicalIdSet.has(id) && registryIdSet.has(id), `required challenge/reference route ${id} is absent from canonical data or registry`, failures)
}

const sourceIntegrity = {
  git: {
    head,
    expectedSha: expectedSha ?? null,
    parent,
    expectedParent: expectedParent ?? null,
    parentLine,
    parentCount,
    tree,
    headMatchesExpected: Boolean(head && expectedSha && head === expectedSha),
    parentMatchesExpected: Boolean(parent && expectedParent && parent === expectedParent),
    committedInputPaths,
    committedInputStatus: committedInputStatus || '',
    committedInputsClean: committedInputStatus === '',
  },
  registry: {
    canonicalRouteIds: canonicalIds,
    canonicalRouteIdsHash: shaJson(canonicalIds),
    registryIds: registry.ids,
    registryIdsHash: shaJson(registry.ids),
    sourceFiles: fileTree(path.join(appRoot, 'src/components/hifi/screens'), file => path.basename(file) === 'index.ts'),
  },
  packageLock: { path: 'balencia-screens/package-lock.json', sha256: readFileHash(path.join(appRoot, 'package-lock.json')) },
  verifiers: fileTree(path.join(appRoot, 'scripts'), file => /^verify-.*\.mjs$/.test(path.basename(file))),
  assets: fileTree(path.join(appRoot, 'public/hifi-assets')),
  officialLogos: fileTree(path.join(repoRoot, 'Balencia/Balencia-Creatives-Reference/logos')),
}

const acceptedPackageLockHash = 'c98ac50e650dc57702cedcd5b7e18e5d768c1bdab211dea19237c8eaa3c7d92d'
const acceptedAssetHashes = {
  'HIFI-26-01-fitness-prep-v2.png': '666a4e746cddfc56a2647840904b5a32542bc29d3b6510620ef01f133afaead8',
  'HIFI-26-01-fitness-prep.png': '666a4e746cddfc56a2647840904b5a32542bc29d3b6510620ef01f133afaead8',
  'HIFI-75-01-hill-segment.png': '2e3f7674fe6100ec75ee77a02e9beff87c55870af8c6e44462625311f7590b39',
  'HIFI-80-01-music-coach.png': '01a6aa68730a7492a71f175c7fe6f0e5292ed0628347fcc66e28b9e1adefa465',
}
check(sourceIntegrity.packageLock.sha256 === acceptedPackageLockHash, 'package-lock hash differs from the authorized R11 intake', failures)
const actualAssetHashes = Object.fromEntries(sourceIntegrity.assets.files.map(file => [path.basename(file.path), file.sha256]))
check(canonicalJson(actualAssetHashes) === canonicalJson(acceptedAssetHashes), 'accepted hi-fi asset filenames or hashes differ from the authorized R11 intake', failures)
check(sourceIntegrity.officialLogos.files.length === 14, `official logo authority must contain the inherited 14-file set, found ${sourceIntegrity.officialLogos.files.length}`, failures)

const pass1Path = path.join(evidenceRoot, 'r11-strict-pass-1.json')
const pass2Path = path.join(evidenceRoot, 'r11-strict-pass-2.json')
const pass1ShotsDir = path.join(evidenceRoot, 'strict-pass-1')
const pass2ShotsDir = path.join(evidenceRoot, 'strict-pass-2')
const pass1Report = readJson(pass1Path, failures, 'strict pass 1')
const pass2Report = readJson(pass2Path, failures, 'strict pass 2')
const pass1 = reportShape(pass1Report, 'strict pass 1', expectedSha, base, pass1ShotsDir, canonicalScreens, failures)
const pass2 = reportShape(pass2Report, 'strict pass 2', expectedSha, base, pass2ShotsDir, canonicalScreens, failures)
const manifest1 = buildManifest(pass1ShotsDir, canonicalIds, failures, 'strict pass 1')
const manifest2 = buildManifest(pass2ShotsDir, canonicalIds, failures, 'strict pass 2')
function diskManifestAsReportEntries(manifest) {
  return manifest.entries.map(entry => ({
    id: entry.id,
    route: canonicalScreens.find(screen => screen.id === entry.id)?.route ?? null,
    screenshot: { file: entry.file, sha256: entry.sha256, width: entry.width, height: entry.height, bytes: entry.bytes },
  }))
}
const pass1DiskEntries = diskManifestAsReportEntries(manifest1)
const pass2DiskEntries = diskManifestAsReportEntries(manifest2)
check(canonicalJson(pass1.screenshotEntries) === canonicalJson(pass1DiskEntries), 'strict pass 1 report screenshot evidence does not match PNG bytes on disk', failures)
check(canonicalJson(pass2.screenshotEntries) === canonicalJson(pass2DiskEntries), 'strict pass 2 report screenshot evidence does not match PNG bytes on disk', failures)

const agreement = {
  routeOrder: canonicalJson(pass1.records.map(row => [row.id, row.route])) === canonicalJson(pass2.records.map(row => [row.id, row.route])),
  reportCounts: canonicalJson(pass1.counts) === canonicalJson(pass2.counts),
  scannerConfigHash: pass1.scannerHash === pass2.scannerHash,
  scannerScriptHash: pass1.scannerScriptHash === pass2.scannerScriptHash,
  scannerConfig: pass1.scannerConfigHash === pass2.scannerConfigHash,
  normalizedRunConfig: pass1.normalizedRunConfigHash === pass2.normalizedRunConfigHash,
  browserVersion: pass1.browserVersion === pass2.browserVersion,
  nodeVersion: pass1.nodeVersion === pass2.nodeVersion,
  reportToDiskPass1: canonicalJson(pass1.screenshotEntries) === canonicalJson(pass1DiskEntries),
  reportToDiskPass2: canonicalJson(pass2.screenshotEntries) === canonicalJson(pass2DiskEntries),
  screenshotManifest: canonicalJson(manifest1.entries) === canonicalJson(manifest2.entries),
  screenshots: manifest1.entries.length === 104 && manifest2.entries.length === 104,
  pngTotal: manifest1.entries.length + manifest2.entries.length,
}
for (const [name, passes] of Object.entries(agreement)) {
  if (name === 'pngTotal') continue
  check(passes === true, `strict capture agreement failed for ${name}`, failures)
}
check(agreement.pngTotal === 208, `strict capture agreement requires 208 total PNGs, found ${agreement.pngTotal}`, failures)

const servedBuild = buildId ? await collectServedBuild(base, buildId) : { base, status: 'not-attempted-without-local-build-id' }
check(servedBuild.status === 'matched-build-id' || servedBuild.status === 'root-mentions-build-id', `served build does not evidence local .next BUILD_ID ${buildId ?? '(missing)'} (${servedBuild.status})`, failures)

const manualEvidence = {
  status: 'required-not-verified-by-this-script',
  automatedClosure: false,
  required: [
    'Founder authorization R11-AUTH-01 and exact staged-manifest review',
    'Independent CLEAR, design/source/canon, and accessibility/privacy/safety/provider reviews with C0/H0/M0',
    'Per-screen W-007 closure and 104-row coverage/disposition matrix',
    'Affordance, glass, capability-honesty, trust, asset-disposition, and text-resilience audits',
    'Physical-device AT/system Dynamic Type, broad Axe, Figma Tier A, worker-provenance, and any founder waivers',
    'Final evidence package, certificate limitation sentence, and unfamiliar-engineer dry run',
  ],
  note: 'A passing source audit proves only the automated facts recorded here. It does not issue final R11/A+++ closure.',
}

const sourceAudit = {
  schemaVersion: 1,
  verifier: { script: 'balencia-screens/scripts/verify-r11-final.mjs', sha256: readFileHash(path.join(scriptDir, 'verify-r11-final.mjs')) },
  status: failures.length ? 'fail' : 'pass-automated-only',
  automatedFacts: {
    base: { requested: requestedBase, normalized: base, explicitOverride: Boolean(explicitBase), requiredDefault: 'http://localhost:3002' },
    servedBuild,
    registry: {
      canonicalCount: canonicalScreens.length,
      canonicalUniqueCount: canonicalIdSet.size,
      registryCount: registry.ids.length,
      registryUniqueCount: registryIdSet.size,
      duplicateRegistryIds: [...new Set(duplicateRegistryIds)],
      challengeIds,
      referenceIds,
    },
    sourceIntegrity,
  },
  manualEvidence,
  failures,
}

const strictAgreement = {
  schemaVersion: 1,
  verifier: sourceAudit.verifier,
  status: failures.length ? 'fail' : 'pass-automated-only',
  automatedFacts: {
    expectedSha: expectedSha ?? null,
    head,
    base,
    reports: {
      pass1: { path: relativeToRepo(pass1Path), sha256: pass1.reportHash, scannerConfigHash: pass1.scannerHash, scannerConfigDigest: pass1.scannerConfigHash, scannerScriptHash: pass1.scannerScriptHash, runConfigHash: pass1.runConfigHash, normalizedRunConfigDigest: pass1.normalizedRunConfigHash, browserVersion: pass1.browserVersion, nodeVersion: pass1.nodeVersion, counts: pass1.counts },
      pass2: { path: relativeToRepo(pass2Path), sha256: pass2.reportHash, scannerConfigHash: pass2.scannerHash, scannerConfigDigest: pass2.scannerConfigHash, scannerScriptHash: pass2.scannerScriptHash, runConfigHash: pass2.runConfigHash, normalizedRunConfigDigest: pass2.normalizedRunConfigHash, browserVersion: pass2.browserVersion, nodeVersion: pass2.nodeVersion, counts: pass2.counts },
    },
    screenshotManifests: {
      pass1: { directory: relativeToRepo(manifest1.directory), count: manifest1.entries.length, sha256: manifest1.digest, entries: manifest1.entries },
      pass2: { directory: relativeToRepo(manifest2.directory), count: manifest2.entries.length, sha256: manifest2.digest, entries: manifest2.entries },
    },
    agreement,
  },
  manualEvidence,
  failures,
}

if (dryRun) {
  console.log(JSON.stringify({ dryRun: true, sourceAudit, strictAgreement }, null, 2))
} else {
  fs.mkdirSync(evidenceRoot, { recursive: true })
  fs.writeFileSync(path.join(evidenceRoot, 'r11-source-audit.json'), `${JSON.stringify(sourceAudit, null, 2)}\n`)
  fs.writeFileSync(path.join(evidenceRoot, 'r11-strict-agreement.json'), `${JSON.stringify(strictAgreement, null, 2)}\n`)
  console.log(`R11 source audit ${sourceAudit.status}; reports written to ${relativeToRepo(evidenceRoot)}`)
}

if (failures.length) {
  for (const failure of failures) console.error(`R11 FAIL: ${failure}`)
  process.exitCode = 1
} else {
  console.log('R11 automated facts passed. Manual evidence remains required; no final closure is claimed.')
}
