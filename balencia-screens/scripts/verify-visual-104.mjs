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
//              targets (<44px native controls), potential visible text overflow
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

// Scanner config is pinned and hashed: a config change invalidates baseline
// comparison (plan §5 R11).
const scannerConfig = {
  viewport: { width: 1440, height: 1000 },
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
  // "Visible" = inside the phone frame's content region, i.e. above the
  // 34px home-indicator clearance band at the frame's bottom edge.
  clipMode: 'phone-frame-content',
  homeIndicatorClearancePx: 34,
  // Overflow scan covers <p> copy elements; +1px slack absorbs sub-pixel
  // rounding of scrollWidth/clientWidth.
  overflowSlackPx: 1,
  concurrency: 4,
}
const scannerConfigHash = crypto
  .createHash('sha256')
  .update(JSON.stringify(scannerConfig))
  .digest('hex')
  .slice(0, 16)

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
function auditPage({ strict, minTargetPx, canonTargetPx, warnRoles, overflowSlackPx, homeIndicatorClearancePx }) {
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
      const box = element.getBoundingClientRect()
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

const browser = await launchBrowser()
if (captureScreenshots) fs.mkdirSync(shotsDir, { recursive: true })

const results = new Array(screens.length)
let cursor = 0

async function worker() {
  const context = await browser.newContext({
    viewport: scannerConfig.viewport,
    deviceScaleFactor: scannerConfig.deviceScaleFactor,
    reducedMotion: scannerConfig.reducedMotion,
  })
  const page = await context.newPage()
  const consoleErrors = []
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  const pageErrors = []
  page.on('pageerror', error => pageErrors.push(String(error)))

  while (cursor < screens.length) {
    const index = cursor++
    const screen = screens[index]
    consoleErrors.length = 0
    pageErrors.length = 0
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
    }

    try {
      await page.goto(url, { waitUntil: scannerConfig.waitUntil, timeout: scannerConfig.navigationTimeoutMs })
      await page.waitForTimeout(scannerConfig.settleMs)
      const audit = await page.evaluate(auditPage, {
        strict,
        minTargetPx: scannerConfig.minTargetPx,
        canonTargetPx: scannerConfig.canonTargetPx,
        warnRoles: scannerConfig.warnRoles,
        overflowSlackPx: scannerConfig.overflowSlackPx,
        homeIndicatorClearancePx: scannerConfig.homeIndicatorClearancePx,
      })
      record.issues = audit.issues
      record.warnings = audit.warnings
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
      if (consoleErrors.length) record.issues.push(`Console errors: ${consoleErrors.join('; ').slice(0, 300)}`)
      if (pageErrors.length) record.issues.push(`Page errors: ${pageErrors.join('; ').slice(0, 300)}`)

      if (captureScreenshots) {
        await page.locator('[data-testid="phone-frame"]').screenshot({
          path: path.join(shotsDir, `${screen.id}.png`),
        })
      }
    } catch (error) {
      record.issues.push(`Failed to load: ${error.message}`)
    }

    results[index] = record
    const status = record.issues.length ? 'ISSUE' : record.warnings.length ? 'warn' : 'ok'
    console.log(`[${index + 1}/${screens.length}] ${screen.id} ${status}`)
  }

  await context.close()
}

const workerCount = Math.min(scannerConfig.concurrency, screens.length)
await Promise.all(Array.from({ length: workerCount }, () => worker()))
await browser.close()

const issueScreens = results.filter(record => record.issues.length)
const warningScreens = results.filter(record => record.warnings.length)

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
  screenshotDir: captureScreenshots ? path.resolve(shotsDir) : null,
}

const report = {
  summary,
  scanner: {
    script: 'scripts/verify-visual-104.mjs',
    strict,
    config: scannerConfig,
    configHash: scannerConfigHash,
    gitSha: process.env.AUDIT_GIT_SHA || null,
  },
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

if (issueScreens.length) process.exitCode = 1
if (results.length !== allScreens.length && !only) process.exitCode = 1
