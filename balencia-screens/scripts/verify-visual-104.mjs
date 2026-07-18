import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

// Strict 104-screen visual/a11y harness (REMEDIATION-PLAN.md RW-001).
// Codifies the 2026-07-08 audit's ad-hoc strict pass so every later
// "re-run strict" claim is reproducible. Schema-compatible with
// audit-2026-07-08/evidence/visual-104-pass-strict.json.
//
// Core checks (count toward issues/warnings):
//   issues   — missing phone frame, console errors, page errors, load failure,
//              visible SIA terminology
//   warnings — visible non-native interactive roles, visible small touch
//              targets (<44px native controls or associated control labels),
//              potential visible text overflow
// Instrumentation (separate JSON fields, NOT counted until R1/R4 enforce them):
//   visibleWrongCaseCiaScreens, purpleCounts, interactiveCounts
//
// Flags:
//   --strict            run warning scans + instrumentation (default: core only)
//   --screenshots       capture phone-frame screenshot per screen
//   --only 01,02,03c    audit a subset of screen ids
//   --out <path>        write the JSON report here
//   --shots-dir <path>  screenshot directory (default: alongside --out)
//   --base <url>        base URL (default http://localhost:3001, or
//                       VISUAL_AUDIT_BASE_URL)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)

function argValue(flag) {
  const index = args.indexOf(flag)
  return index !== -1 ? args[index + 1] : undefined
}

const strict = args.includes('--strict')
const captureScreenshots = args.includes('--screenshots')
const only = argValue('--only')?.split(',').map(id => id.trim()).filter(Boolean)
const outPath = argValue('--out')
const baseURL = argValue('--base') || process.env.VISUAL_AUDIT_BASE_URL || 'http://localhost:3001'
const shotsDir = argValue('--shots-dir') || (outPath ? path.join(path.dirname(outPath), 'screenshots') : '/private/tmp/balencia-visual-104')
const auditGitSha = process.env.AUDIT_GIT_SHA?.trim() || null

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function jsonHash(value) {
  return sha256(JSON.stringify(value))
}

function localProductionOrigin(value) {
  let parsed
  try {
    parsed = new URL(value)
  } catch {
    throw new Error(`Invalid --base URL: ${value}`)
  }

  const localHost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1' || parsed.hostname === '::1'
  if (!localHost || parsed.protocol !== 'http:' || parsed.port !== '3002') {
    throw new Error(`Strict mode requires a local production origin on http://localhost:3002 (received ${parsed.origin})`)
  }
  return parsed
}

const baseOrigin = new URL(baseURL).origin
if (strict) {
  localProductionOrigin(baseURL)
  if (!auditGitSha || !/^[0-9a-f]{40}$/i.test(auditGitSha)) {
    throw new Error('Strict mode requires AUDIT_GIT_SHA to be a full 40-character Git commit SHA')
  }
}

// Scanner config is pinned and hashed: a config change invalidates baseline
// comparison (plan §5 R11).
const scannerConfig = {
  // R11 captures run at the declared iPhone CSS viewport. Preserve the
  // historical desktop shell viewport for non-strict exploratory scans.
  viewport: strict ? { width: 390, height: 844 } : { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
  settleMs: 500,
  navigationTimeoutMs: 30000,
  waitUntil: 'networkidle',
  // Baseline-compatible thresholds (reverse-engineered from the 2026-07-08
  // audit evidence; see R0 batch notes). Canon's 44px floor is enforced via
  // the separate smallTargets44 instrumentation field until R3 closes.
  minTargetPx: 40,
  canonTargetPx: 44,
  // Baseline warning set: only checkbox/switch count (audit-compatible).
  // Other non-native roles land in instrumentation.nonNativeRolesExtended.
  warnRoles: ['checkbox', 'switch'],
  // Checkbox/radio/switch glyphs may be smaller than 44px when their native
  // associated label is the actual pointer target. Audit the larger, visible
  // associated label in that case instead of producing a glyph-only warning.
  associatedLabelTargets: true,
  // "Visible" = inside the phone frame's content region, i.e. above the
  // 34px home-indicator clearance band at the frame's bottom edge.
  clipMode: 'phone-frame-content',
  homeIndicatorClearancePx: 34,
  // Overflow scan covers <p> copy elements; +1px slack absorbs sub-pixel
  // rounding of scrollWidth/clientWidth.
  overflowSlackPx: 1,
  // Strict proofs are deliberately serialized. A fresh context/page is then
  // created for each canonical route, preventing any cross-route state.
  concurrency: strict ? 1 : 4,
  serialized: strict,
  fontReadyTimeoutMs: 10000,
  strictLocalProductionOrigin: strict ? baseOrigin : null,
}
const scannerConfigHash = jsonHash(scannerConfig)

function loadScreens() {
  const screensPath = path.join(__dirname, '..', 'src', 'data', 'screens.ts')
  const source = fs.readFileSync(screensPath, 'utf8')
  const match = source.match(/export const screens: ScreenInfo\[\] = \[([\s\S]*?)\n\]/)
  if (!match) throw new Error('Could not parse screens array from src/data/screens.ts')
  return new Function(`return [${match[1]}]`)()
}

const allScreens = loadScreens()
const screens = only ? allScreens.filter(screen => only.includes(screen.id)) : allScreens
if (only && screens.length !== only.length) {
  const found = new Set(screens.map(screen => screen.id))
  throw new Error(`Unknown screen ids in --only: ${only.filter(id => !found.has(id)).join(', ')}`)
}

// `screens.ts` is the canonical registry. Keep both the complete registry and
// any selected subset in source order; never let worker scheduling decide
// capture order in strict evidence.
const canonicalRegistry = allScreens.map(screen => ({ id: screen.id, route: `/screens/${screen.id}` }))
const captureOrder = screens.map(screen => screen.id)
const canonicalRegistryHash = jsonHash(canonicalRegistry)
const captureOrderHash = jsonHash(captureOrder)
const scriptHash = sha256(fs.readFileSync(fileURLToPath(import.meta.url)))

async function launchBrowser() {
  const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (fs.existsSync(chromePath)) return chromium.launch({ executablePath: chromePath })
  try {
    return await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' })
  } catch (channelError) {
    if (process.env.PLAYWRIGHT_CHANNEL) throw channelError
    return chromium.launch()
  }
}

// Runs inside the page. Only touches the subtree under [data-testid="phone-frame"].
function auditPage({ strict, minTargetPx, canonTargetPx, warnRoles, associatedLabelTargets, overflowSlackPx, homeIndicatorClearancePx }) {
  const phone = document.querySelector('[data-testid="phone-frame"]')
  const result = {
    issues: [],
    warnings: [],
    phoneRect: null,
    h1: null,
    bodyTextLength: 0,
    visibleSia: false,
    visibleWrongCaseCia: false,
    purpleCount: 0,
    interactiveCount: 0,
    nonNativeRolesExtended: [],
    smallTargets44: [],
  }
  if (!phone) {
    result.issues.push('Missing phone frame')
    return result
  }

  const rect = phone.getBoundingClientRect()
  result.phoneRect = {
    top: Math.round(rect.top),
    right: Math.round(rect.right),
    bottom: Math.round(rect.bottom),
    left: Math.round(rect.left),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  }
  result.h1 = document.querySelector('h1')?.innerText?.trim().replace(/\s+/g, ' ') ?? null
  const phoneText = phone.innerText || ''
  result.bodyTextLength = phoneText.replace(/\s+/g, ' ').length

  if (/\bSIA\b/.test(phoneText) || /\bSia\b/.test(phoneText)) result.visibleSia = true
  if (/\bCIA\b/.test(phoneText)) result.visibleWrongCaseCia = true

  function hiddenByAria(element) {
    let node = element
    while (node && node !== phone) {
      if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') return true
      node = node.parentElement
    }
    return false
  }

  function rectOf(element) {
    const box = element.getBoundingClientRect()
    if (box.width <= 0 || box.height <= 0) return null
    return { top: box.top, right: box.right, bottom: box.bottom, left: box.left }
  }

  function intersect(a, b) {
    const left = Math.max(a.left, b.left)
    const top = Math.max(a.top, b.top)
    const right = Math.min(a.right, b.right)
    const bottom = Math.min(a.bottom, b.bottom)
    if (right - left <= 1 || bottom - top <= 1) return null
    return { left, top, right, bottom }
  }

  // Clip-visibility: "Visible …" means the element survives every
  // scroll/overflow ancestor clip (below-the-fold content in scroll
  // containers is out of scope) AND lands inside the phone frame's content
  // region — the 390x844 rect minus the home-indicator clearance band.
  function visibleRectOf(element) {
    let visible = rectOf(element)
    if (!visible) return null
    let ancestor = element.parentElement
    while (ancestor && ancestor !== document.documentElement) {
      const style = window.getComputedStyle(ancestor)
      if (/(auto|scroll|hidden|clip)/.test(`${style.overflow} ${style.overflowX} ${style.overflowY}`)) {
        const ancestorRect = rectOf(ancestor)
        if (ancestorRect) {
          visible = intersect(visible, ancestorRect)
          if (!visible) return null
        }
      }
      ancestor = ancestor.parentElement
    }
    const frame = rectOf(phone)
    if (!frame) return null
    const clearance = document.querySelector('[data-testid="home-indicator-clearance"]')
    const clearanceTop = clearance ? clearance.getBoundingClientRect().top : frame.bottom - homeIndicatorClearancePx
    return intersect(visible, { top: frame.top, right: frame.right, bottom: Math.min(frame.bottom, clearanceTop), left: frame.left })
  }

  function isVisible(element) {
    const style = window.getComputedStyle(element)
    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false
    return Boolean(visibleRectOf(element))
  }

  function labelFor(element) {
    const label = element.getAttribute('aria-label') || element.innerText || element.getAttribute('placeholder') || element.tagName
    return label.trim().replace(/\s+/g, ' ').slice(0, 80)
  }

  function effectiveTargetBox(element) {
    const own = element.getBoundingClientRect()
    const role = element.getAttribute('role')
    const type = element.getAttribute('type')
    const labelEligible = element.tagName === 'INPUT'
      && (type === 'checkbox' || type === 'radio' || role === 'switch')
    if (!associatedLabelTargets || !labelEligible || !element.labels?.length) return own

    let effective = own
    for (const label of element.labels) {
      if (!isVisible(label) || hiddenByAria(label)) continue
      const visibleLabel = visibleRectOf(label)
      if (!visibleLabel) continue
      const candidate = {
        width: visibleLabel.right - visibleLabel.left,
        height: visibleLabel.bottom - visibleLabel.top,
      }
      if (candidate.width * candidate.height > effective.width * effective.height) effective = candidate
    }
    return effective
  }

  const INTERACTIVE_ROLES = new Set([
    'button', 'link', 'checkbox', 'radio', 'switch', 'tab', 'menuitem',
    'menuitemcheckbox', 'menuitemradio', 'option', 'slider', 'spinbutton',
    'combobox', 'textbox', 'searchbox',
  ])
  const NATIVE_INTERACTIVE = new Set(['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 'SUMMARY'])

  const everyElement = [...phone.querySelectorAll('*')]
  const warnRoleSet = new Set(warnRoles)
  const nonNativeRoles = []
  const smallTargets = []
  const overflows = []

  for (const element of everyElement) {
    if (!isVisible(element) || hiddenByAria(element)) continue
    const role = element.getAttribute('role')
    const isNative = NATIVE_INTERACTIVE.has(element.tagName)
      && (element.tagName !== 'A' || element.hasAttribute('href'))
    const isRoleInteractive = role && INTERACTIVE_ROLES.has(role)

    if (isNative || isRoleInteractive) result.interactiveCount += 1

    if (strict && isRoleInteractive && !NATIVE_INTERACTIVE.has(element.tagName)) {
      const entry = `${element.tagName.toLowerCase()} role=${role} for ${labelFor(element)}`
      if (warnRoleSet.has(role)) nonNativeRoles.push(entry)
      else result.nonNativeRolesExtended.push(entry)
    }

    if (strict && isNative) {
      const box = effectiveTargetBox(element)
      const width = Math.round(box.width)
      const height = Math.round(box.height)
      const entry = `${labelFor(element)} ${width}x${height}`
      if (width < minTargetPx || height < minTargetPx) smallTargets.push(entry)
      else if (width < canonTargetPx || height < canonTargetPx) result.smallTargets44.push(entry)
    }

    const classAttr = element.getAttribute('class') || ''
    if (strict && (classAttr.includes('royal-purple') || classAttr.includes('7F24FF') || classAttr.includes('7f24ff'))) {
      result.purpleCount += 1
    }
  }

  if (strict) {
    for (const element of everyElement) {
      if (element.tagName !== 'P') continue
      if (!element.innerText || !element.innerText.trim()) continue
      if (!isVisible(element) || hiddenByAria(element)) continue
      if (element.scrollWidth > element.clientWidth + overflowSlackPx) {
        const text = element.innerText.trim().replace(/\s+/g, ' ').slice(0, 80)
        overflows.push(`${text} scrollWidth ${element.scrollWidth} > clientWidth ${element.clientWidth}`)
      }
    }
  }

  if (nonNativeRoles.length) result.warnings.push(`Visible non-native interactive roles: ${nonNativeRoles.join('; ')}`)
  if (smallTargets.length) result.warnings.push(`Visible small touch targets: ${smallTargets.join('; ')}`)
  if (overflows.length) result.warnings.push(`Potential visible text overflow: ${overflows.join('; ')}`)

  return result
}

async function installCapabilityCapture(context) {
  await context.addInitScript(() => {
    const events = []
    Object.defineProperty(window, '__visualAuditCapabilities', {
      configurable: false,
      value: events,
      writable: false,
    })
    const record = name => events.push(name)
    const wrap = (target, method, name) => {
      try {
        const original = target?.[method]
        if (typeof original !== 'function') return
        target[method] = function visualAuditCapabilityWrapper(...params) {
          record(name)
          return original.apply(this, params)
        }
      } catch {
        // Some browser properties are immutable. Network instrumentation still
        // catches their observable effects without changing application code.
      }
    }
    wrap(navigator.geolocation, 'getCurrentPosition', 'geolocation.getCurrentPosition')
    wrap(navigator.geolocation, 'watchPosition', 'geolocation.watchPosition')
    wrap(navigator.mediaDevices, 'getUserMedia', 'mediaDevices.getUserMedia')
    wrap(navigator.mediaDevices, 'getDisplayMedia', 'mediaDevices.getDisplayMedia')
    wrap(navigator.clipboard, 'read', 'clipboard.read')
    wrap(navigator.clipboard, 'readText', 'clipboard.readText')
    wrap(navigator.clipboard, 'write', 'clipboard.write')
    wrap(navigator.clipboard, 'writeText', 'clipboard.writeText')
    wrap(navigator, 'share', 'navigator.share')
    wrap(Notification, 'requestPermission', 'Notification.requestPermission')
    wrap(window, 'open', 'window.open')
  })
}

async function freshContextState(context, origin) {
  const [storageState, cookies] = await Promise.all([
    context.storageState(),
    context.cookies([origin]),
  ])
  return {
    storageState: {
      cookieCount: storageState.cookies.length,
      originCount: storageState.origins.length,
      originNames: storageState.origins.map(entry => entry.origin),
    },
    cookieCount: cookies.length,
    cookieNames: cookies.map(cookie => cookie.name),
  }
}

async function pageStorageState(page, context, origin) {
  const [storage, cookies] = await Promise.all([
    page.evaluate(async () => {
      const inspect = (name, read) => {
        try {
          return { supported: true, values: read(), error: null }
        } catch (error) {
          return { supported: false, values: [], error: String(error) }
        }
      }
      const localStorage = inspect('localStorage', () => Object.keys(window.localStorage).sort())
      const sessionStorage = inspect('sessionStorage', () => Object.keys(window.sessionStorage).sort())
      const indexedDb = await (async () => {
        try {
          if (typeof indexedDB.databases !== 'function') return { supported: false, values: [], error: 'indexedDB.databases unavailable' }
          const databases = await indexedDB.databases()
          return { supported: true, values: databases.map(database => database.name || '(unnamed)').sort(), error: null }
        } catch (error) {
          return { supported: false, values: [], error: String(error) }
        }
      })()
      const cacheStorage = await (async () => {
        try {
          if (!window.caches) return { supported: false, values: [], error: 'Cache Storage unavailable' }
          return { supported: true, values: (await caches.keys()).sort(), error: null }
        } catch (error) {
          return { supported: false, values: [], error: String(error) }
        }
      })()
      return { localStorage, sessionStorage, indexedDb, cacheStorage }
    }),
    context.cookies([origin]),
  ])
  return {
    cookieCount: cookies.length,
    cookieNames: cookies.map(cookie => cookie.name),
    ...storage,
  }
}

function emptyStateFailures(state) {
  const failures = []
  if (state.cookieCount) failures.push(`cookies: ${state.cookieNames.join(', ')}`)
  for (const [label, check] of Object.entries({
    localStorage: state.localStorage,
    sessionStorage: state.sessionStorage,
    IndexedDB: state.indexedDb,
    'Cache Storage': state.cacheStorage,
  })) {
    if (!check) continue
    if (!check.supported) failures.push(`${label} inspection unavailable: ${check.error}`)
    else if (check.values.length) failures.push(`${label}: ${check.values.join(', ')}`)
  }
  return failures
}

async function awaitFontReadiness(page, timeoutMs) {
  return page.evaluate(async timeout => {
    if (!document.fonts) return { supported: false, ready: false, status: 'unavailable', faceCount: 0, error: 'FontFaceSet unavailable' }
    let timer
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error(`font readiness exceeded ${timeout}ms`)), timeout)
        }),
      ])
      return { supported: true, ready: document.fonts.status === 'loaded', status: document.fonts.status, faceCount: document.fonts.size, error: null }
    } catch (error) {
      return { supported: true, ready: false, status: document.fonts.status, faceCount: document.fonts.size, error: String(error) }
    } finally {
      clearTimeout(timer)
    }
  }, timeoutMs)
}

function pngEvidence(filePath) {
  const contents = fs.readFileSync(filePath)
  const signature = '89504e470d0a1a0a'
  if (contents.subarray(0, 8).toString('hex') !== signature) throw new Error(`Screenshot is not a PNG: ${filePath}`)
  return {
    file: path.basename(filePath),
    sha256: sha256(contents),
    width: contents.readUInt32BE(16),
    height: contents.readUInt32BE(20),
    bytes: contents.length,
  }
}

const browser = await launchBrowser()
const browserVersion = browser.version()
if (captureScreenshots) {
  fs.mkdirSync(shotsDir, { recursive: true })
  for (const file of fs.readdirSync(shotsDir)) {
    if (file.endsWith('.png')) fs.unlinkSync(path.join(shotsDir, file))
  }
}

const results = new Array(screens.length)
let cursor = 0

async function worker() {
  while (cursor < screens.length) {
    const index = cursor++
    const screen = screens[index]
    const url = new URL(`/screens/${screen.id}`, baseURL).toString()
    const record = {
      ...screen,
      url,
      consoleMessages: [],
      pageErrors: [],
      issues: [],
      warnings: [],
      phoneRect: null,
      h1: null,
      bodyTextLength: 0,
      fontReadiness: null,
      browserState: null,
      externalRequests: [],
      requestFailures: [],
      capabilityEvents: [],
      screenshot: null,
      proofIsolation: { freshBrowserContext: true, freshPage: true },
    }
    let context

    try {
      // R11 strict evidence gets exactly one context and one page per route.
      // The non-strict worker retains its concurrent compatibility path while
      // still receiving an isolated proof context for each route.
      context = await browser.newContext({
        viewport: scannerConfig.viewport,
        deviceScaleFactor: scannerConfig.deviceScaleFactor,
        reducedMotion: scannerConfig.reducedMotion,
      })
      await installCapabilityCapture(context)
      const beforeState = await freshContextState(context, baseOrigin)
      if (strict && (beforeState.cookieCount || beforeState.storageState.cookieCount || beforeState.storageState.originCount)) {
        record.issues.push(`Fresh browser context was not empty: ${JSON.stringify(beforeState)}`)
      }

      const page = await context.newPage()
      const consoleErrors = []
      const pageErrors = []
      const externalRequests = []
      const requestFailures = []
      page.on('console', message => {
        if (message.type() === 'error') consoleErrors.push(message.text())
      })
      page.on('pageerror', error => pageErrors.push(String(error)))
      page.on('request', request => {
        try {
          const requestURL = new URL(request.url())
          if ((requestURL.protocol === 'http:' || requestURL.protocol === 'https:' || requestURL.protocol === 'ws:' || requestURL.protocol === 'wss:')
            && requestURL.origin !== baseOrigin) {
            externalRequests.push({ url: request.url(), method: request.method(), resourceType: request.resourceType() })
          }
        } catch {
          // Ignore non-URL schemes (e.g. data:), which have no remote origin.
        }
      })
      page.on('requestfailed', request => {
        requestFailures.push({ url: request.url(), failure: request.failure()?.errorText || 'unknown request failure' })
      })

      await page.goto(url, { waitUntil: scannerConfig.waitUntil, timeout: scannerConfig.navigationTimeoutMs })
      await page.waitForTimeout(scannerConfig.settleMs)
      record.fontReadiness = await awaitFontReadiness(page, scannerConfig.fontReadyTimeoutMs)
      if (strict && !record.fontReadiness.ready) record.issues.push(`Fonts were not ready: ${record.fontReadiness.error || record.fontReadiness.status}`)

      const audit = await page.evaluate(auditPage, {
        strict,
        minTargetPx: scannerConfig.minTargetPx,
        canonTargetPx: scannerConfig.canonTargetPx,
        warnRoles: scannerConfig.warnRoles,
        associatedLabelTargets: scannerConfig.associatedLabelTargets,
        overflowSlackPx: scannerConfig.overflowSlackPx,
        homeIndicatorClearancePx: scannerConfig.homeIndicatorClearancePx,
      })
      // Preserve isolation/font failures recorded before the DOM audit.
      record.issues.push(...audit.issues)
      record.warnings.push(...audit.warnings)
      record.phoneRect = audit.phoneRect
      record.h1 = audit.h1
      record.bodyTextLength = audit.bodyTextLength
      record.visibleSia = audit.visibleSia
      if (strict) {
        record.visibleWrongCaseCia = audit.visibleWrongCaseCia
        record.purpleCount = audit.purpleCount
        record.interactiveCount = audit.interactiveCount
        record.nonNativeRolesExtended = audit.nonNativeRolesExtended
        record.smallTargets44 = audit.smallTargets44
      }
      if (audit.visibleSia) record.issues.push('Visible SIA terminology')
      record.consoleMessages = [...consoleErrors]
      record.pageErrors = [...pageErrors]
      record.externalRequests = externalRequests
      record.requestFailures = requestFailures
      record.capabilityEvents = await page.evaluate(() => [...(window.__visualAuditCapabilities || [])])
      const afterState = await pageStorageState(page, context, baseOrigin)
      record.browserState = { before: beforeState, after: afterState }

      if (consoleErrors.length) record.issues.push(`Console errors: ${consoleErrors.join('; ').slice(0, 300)}`)
      if (pageErrors.length) record.issues.push(`Page errors: ${pageErrors.join('; ').slice(0, 300)}`)
      if (strict && externalRequests.length) record.issues.push(`External requests: ${externalRequests.map(request => request.url).join('; ').slice(0, 300)}`)
      if (strict && requestFailures.length) record.issues.push(`Request failures: ${requestFailures.map(request => request.url).join('; ').slice(0, 300)}`)
      if (strict && record.capabilityEvents.length) record.issues.push(`Capability events: ${record.capabilityEvents.join('; ').slice(0, 300)}`)
      const stateFailures = emptyStateFailures(afterState)
      if (strict && stateFailures.length) record.issues.push(`Non-empty browser state: ${stateFailures.join('; ').slice(0, 300)}`)

      if (captureScreenshots) {
        const screenshotPath = path.join(shotsDir, `${screen.id}.png`)
        await page.locator('[data-testid="phone-frame"]').screenshot({ path: screenshotPath })
        record.screenshot = pngEvidence(screenshotPath)
      }
    } catch (error) {
      record.issues.push(`Failed to load: ${error.message}`)
    } finally {
      await context?.close()
    }

    results[index] = record
    const status = record.issues.length ? 'ISSUE' : record.warnings.length ? 'warn' : 'ok'
    console.log(`[${index + 1}/${screens.length}] ${screen.id} ${status}`)
  }

}

const workerCount = Math.min(scannerConfig.concurrency, screens.length)
await Promise.all(Array.from({ length: workerCount }, () => worker()))
await browser.close()

const issueScreens = results.filter(record => record.issues.length)
const warningScreens = results.filter(record => record.warnings.length)
const screenshotManifest = captureScreenshots
  ? results.map(record => ({ id: record.id, route: `/screens/${record.id}`, screenshot: record.screenshot }))
  : null
const screenshotManifestHash = screenshotManifest ? jsonHash(screenshotManifest) : null
const runConfig = {
  strict,
  baseURL,
  baseOrigin,
  auditGitSha,
  captureScreenshots,
  shotsDir: captureScreenshots ? path.resolve(shotsDir) : null,
  requestedOnly: only || null,
  serializedCapture: strict,
  proofIsolation: { freshBrowserContextPerRoute: true, freshPagePerRoute: true },
  canonicalRegistry: {
    screens: canonicalRegistry.length,
    hash: canonicalRegistryHash,
  },
  captureOrder,
  captureOrderHash,
  scannerConfigHash,
}
const runConfigHash = jsonHash(runConfig)

const summary = {
  auditedAt: new Date().toISOString(),
  baseURL,
  screens: results.length,
  issueScreens: issueScreens.length,
  warningScreens: warningScreens.length,
  totalIssues: issueScreens.reduce((sum, record) => sum + record.issues.length, 0),
  totalWarnings: warningScreens.reduce((sum, record) => sum + record.warnings.length, 0),
  missingPhoneFrames: results.filter(record => record.issues.some(issue => issue.startsWith('Missing phone frame'))).map(record => record.id),
  visibleSiaScreens: results.filter(record => record.visibleSia).map(record => record.id),
  consoleErrorScreens: results.filter(record => record.consoleMessages.length).map(record => record.id),
  pageErrorScreens: results.filter(record => record.pageErrors.length).map(record => record.id),
  externalRequestScreens: results.filter(record => record.externalRequests.length).map(record => record.id),
  capabilityEventScreens: results.filter(record => record.capabilityEvents.length).map(record => record.id),
  fontNotReadyScreens: results.filter(record => !record.fontReadiness?.ready).map(record => record.id),
  screenshotDir: captureScreenshots ? path.resolve(shotsDir) : null,
  screenshotManifestHash,
}

const report = {
  summary,
  scanner: {
    script: 'scripts/verify-visual-104.mjs',
    scriptHash,
    strict,
    config: scannerConfig,
    configHash: scannerConfigHash,
    gitSha: auditGitSha,
    browserVersion,
    nodeVersion: process.version,
    runConfig,
    runConfigHash,
  },
  screenshotManifest: screenshotManifest
    ? {
        algorithm: 'sha256',
        entries: screenshotManifest,
        hash: screenshotManifestHash,
      }
    : null,
  // Instrumentation (plan RW-001): separate fields, excluded from
  // issue/warning totals until R1/R4 enforcement batches close.
  instrumentation: strict
    ? {
        visibleWrongCaseCiaScreens: results.filter(record => record.visibleWrongCaseCia).map(record => record.id),
        purpleCounts: Object.fromEntries(results.map(record => [record.id, record.purpleCount])),
        interactiveCounts: Object.fromEntries(results.map(record => [record.id, record.interactiveCount])),
      }
    : null,
  results,
}

if (outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2))
  console.log(`report written to ${outPath}`)
}

console.log(JSON.stringify(summary, null, 2))
for (const record of issueScreens) {
  for (const issue of record.issues) console.error(`ISSUE ${record.id}: ${issue}`)
}
for (const record of warningScreens) {
  for (const warning of record.warnings) console.warn(`warn ${record.id}: ${warning}`)
}

if (issueScreens.length || (strict && warningScreens.length)) process.exitCode = 1
if (results.length !== allScreens.length && !only) process.exitCode = 1
