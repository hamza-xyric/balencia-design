import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const repoRoot = path.resolve(process.cwd(), '..')
const appRoot = path.resolve(repoRoot, 'balencia-screens')
const screensFile = path.join(appRoot, 'src/data/screens.ts')
const appRequire = createRequire(path.join(appRoot, 'package.json'))
const { chromium } = appRequire('playwright')

const baseURL = process.env.A_PLUS_PLUS_BASE_URL || process.env.VISUAL_AUDIT_BASE_URL || 'http://localhost:3000'
const outputRoot = path.resolve(
  process.env.A_PLUS_PLUS_OUTPUT_DIR || path.join(appRoot, 'output/a-plus-plus-review'),
)
const viewport = { width: 1440, height: 1000 }

const batchMap = new Map([
  ['01', 'R01'], ['02', 'R01'], ['03', 'R01'], ['03b', 'R01'], ['03c', 'R01'],
  ['03d', 'R02'], ['03e', 'R02'], ['04', 'R02'], ['05', 'R02'], ['05b', 'R02'],
  ['06', 'R03'], ['07', 'R03'], ['08', 'R03'], ['12', 'R03'], ['41', 'R03'],
  ['44', 'R04'], ['45', 'R04'], ['09', 'R04'], ['10', 'R04'], ['11', 'R04'],
  ['51', 'R05'], ['74', 'R05'], ['75', 'R05'], ['76', 'R05'], ['77', 'R05'],
  ['79', 'R06'], ['13', 'R06'], ['14', 'R06'], ['15', 'R06'], ['59', 'R06'],
  ['73', 'R07'], ['85', 'R07'], ['16', 'R07'], ['17', 'R07'], ['18', 'R07'],
  ['19', 'R08'], ['20', 'R08'], ['21', 'R08'], ['22', 'R08'], ['23', 'R08'],
  ['24', 'R09'], ['25', 'R09'], ['49', 'R09'], ['50', 'R09'], ['71', 'R09'],
  ['72', 'R10'], ['84', 'R10'], ['26', 'R10'], ['27', 'R10'], ['28', 'R10'],
  ['29', 'R11'], ['30', 'R11'], ['31', 'R11'], ['32', 'R11'], ['33', 'R11'],
  ['34', 'R12'], ['35', 'R12'], ['36', 'R12'], ['70', 'R12'], ['37', 'R12'],
  ['38', 'R13'], ['39', 'R13'], ['40', 'R13'], ['42', 'R13'], ['43', 'R13'],
  ['46', 'R14'], ['47', 'R14'], ['48', 'R14'], ['52', 'R14'], ['53', 'R14'],
  ['54', 'R15'], ['55', 'R15'], ['56', 'R15'], ['57', 'R15'], ['58', 'R15'],
  ['60', 'R16'], ['61', 'R16'], ['62', 'R16'], ['63', 'R16'], ['64', 'R16'],
  ['65', 'R17'], ['66', 'R17'], ['67', 'R17'], ['68', 'R17'], ['69', 'R17'],
  ['78', 'R18'], ['80', 'R18'], ['81', 'R18'], ['82', 'R18'], ['83', 'R18'],
])

function parseScreens() {
  const source = fs.readFileSync(screensFile, 'utf8')
  const matches = [...source.matchAll(/\{\s*id:\s*'([^']+)'\s*,\s*number:\s*'([^']+)'\s*,\s*name:\s*'([^']+)'\s*,\s*route:\s*'([^']+)'/g)]
  return matches.map((match) => ({
    id: match[1],
    number: match[2],
    name: match[3],
    route: match[4],
    batch: batchMap.get(match[1]) || 'unmapped',
  }))
}

function slugFor(route, id) {
  const routeSlug = route.replace(/^\//, '').replace(/\//g, '-') || 'index'
  return `${id}-${routeSlug}`
}

async function launchBrowser() {
  const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (fs.existsSync(chromePath)) {
    return chromium.launch({ executablePath: chromePath })
  }

  try {
    return await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' })
  } catch (channelError) {
    if (process.env.PLAYWRIGHT_CHANNEL) throw channelError
    return chromium.launch()
  }
}

function summaryMarkdown(results) {
  const rows = results.map((result) => {
    const status = result.ok ? 'OK' : 'FAIL'
    return `| ${result.id} | ${result.name} | \`${result.route}\` | ${result.batch} | ${status} | ${result.consoleErrors.length} | ${result.metrics.smallTargetCount} | ${result.metrics.nestedCount} | ${result.metrics.overlaps.length} | \`${path.relative(appRoot, result.screenshot || '')}\` |`
  })

  return [
    '# A++ Evidence Capture Summary',
    '',
    `- Base URL: \`${baseURL}\``,
    `- Captured: ${new Date().toISOString()}`,
    `- Routes: ${results.length}`,
    '',
    '| ID | Screen | Route | Batch | Status | Console Errors | Small Targets | Nested Controls | Overlaps | Screenshot |',
    '| --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- |',
    ...rows,
    '',
  ].join('\n')
}

const screens = parseScreens()
fs.mkdirSync(outputRoot, { recursive: true })

const browser = await launchBrowser()
const page = await browser.newPage({ viewport })
const results = []
let activeConsoleErrors = []

page.on('console', (message) => {
  if (message.type() === 'error') activeConsoleErrors.push(message.text())
})
page.on('pageerror', (error) => {
  activeConsoleErrors.push(error.message)
})

for (const screen of screens) {
  activeConsoleErrors = []
  const batchDir = path.join(outputRoot, screen.batch)
  fs.mkdirSync(batchDir, { recursive: true })

  const url = new URL(screen.route, baseURL).toString()
  const slug = slugFor(screen.route, screen.id)
  const screenshotPath = path.join(batchDir, `${slug}-phone.png`)
  const fullScreenshotPath = path.join(batchDir, `${slug}-full.png`)

  const result = {
    ...screen,
    ok: false,
    url,
    screenshot: screenshotPath,
    fullScreenshot: fullScreenshotPath,
    consoleErrors: [],
    text: '',
    controls: [],
    metrics: {
      smallTargetCount: 0,
      smallTargets: [],
      nestedCount: 0,
      nested: [],
      overlaps: [],
    },
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 })
    await page.waitForTimeout(350)

    const phone = page.locator('[data-testid="phone-frame"]')
    await phone.screenshot({ path: screenshotPath })
    await page.screenshot({ path: fullScreenshotPath })

    const evaluated = await page.evaluate(() => {
      const phoneElement = document.querySelector('[data-testid="phone-frame"]')
      const tabBar = document.querySelector('[data-testid="tab-bar"]')
      const bottomAction = document.querySelector('[data-testid="screen-bottom-action"]')
      const homeIndicator = document.querySelector('[data-testid="home-indicator"]')
      const composer = document.querySelector('[data-testid="screen-composer"]')
      const zones = [tabBar, bottomAction, homeIndicator, composer].filter(Boolean)

      function rectFor(element) {
        if (!element) return null
        const rect = element.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) return null
        return {
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        }
      }

      function isVisible(element) {
        const style = window.getComputedStyle(element)
        const rect = rectFor(element)
        return Boolean(rect) && style.visibility !== 'hidden' && style.display !== 'none' && Number(style.opacity) !== 0
      }

      function labelFor(element) {
        const label = element.getAttribute('aria-label') ||
          element.getAttribute('placeholder') ||
          element.innerText ||
          element.textContent ||
          element.tagName
        return label.trim().replace(/\s+/g, ' ').slice(0, 100)
      }

      function overlaps(a, b) {
        return a.left < b.right - 4 && a.right > b.left + 4 && a.top < b.bottom - 4 && a.bottom > b.top + 4
      }

      const controlSelector = [
        'a',
        'button',
        'input',
        'textarea',
        'select',
        '[role="button"]',
        '[role="link"]',
        '[role="switch"]',
        '[role="tab"]',
        '[role="slider"]',
        '[role="checkbox"]',
      ].join(',')

      const controls = [...document.querySelectorAll(controlSelector)]
        .filter((element) => !phoneElement || phoneElement.contains(element))
        .filter(isVisible)
        .map((element) => {
          const rect = rectFor(element)
          return {
            label: labelFor(element),
            tag: element.tagName.toLowerCase(),
            role: element.getAttribute('role') || '',
            disabled: Boolean(element.disabled || element.getAttribute('aria-disabled') === 'true'),
            href: element.getAttribute('href') || '',
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          }
        })

      const smallTargets = controls
        .filter((control) => !control.disabled && (control.width < 44 || control.height < 44))
        .map((control) => `${control.label} (${control.width}x${control.height})`)

      const nested = [...document.querySelectorAll('a a, a button, button a, button button, [role="button"] button, [role="button"] a')]
        .filter((element) => !phoneElement || phoneElement.contains(element))
        .filter(isVisible)
        .map(labelFor)

      const zoneRects = zones.map((element) => ({ name: element.dataset?.testid || element.getAttribute('data-testid') || element.tagName, rect: rectFor(element) })).filter((zone) => zone.rect)
      const overlapIssues = [...document.querySelectorAll('a, button, input, textarea, select, h1, h2, h3, p, span, [role="button"]')]
        .filter((element) => !phoneElement || phoneElement.contains(element))
        .filter(isVisible)
        .filter((element) => !zones.some((zone) => zone.contains(element)))
        .flatMap((element) => {
          const rect = rectFor(element)
          if (!rect) return []
          return zoneRects
            .filter((zone) => overlaps(rect, zone.rect))
            .map((zone) => `${labelFor(element)} overlaps ${zone.name}`)
        })

      return {
        text: (phoneElement?.innerText || document.body.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 1000),
        controls,
        metrics: {
          smallTargetCount: smallTargets.length,
          smallTargets,
          nestedCount: nested.length,
          nested,
          overlaps: [...new Set(overlapIssues)],
        },
      }
    })

    result.ok = true
    result.text = evaluated.text
    result.controls = evaluated.controls
    result.metrics = evaluated.metrics
    result.consoleErrors = [...new Set(activeConsoleErrors)]
  } catch (error) {
    result.ok = false
    result.consoleErrors = [...new Set([...activeConsoleErrors, error.message])]
  }

  fs.writeFileSync(path.join(batchDir, `${slug}-evidence.json`), JSON.stringify(result, null, 2))
  results.push(result)
  console.log(`${screen.batch} ${screen.id} ${screen.route} ${result.ok ? 'OK' : 'FAIL'}`)
}

await browser.close()

fs.writeFileSync(path.join(outputRoot, 'route-evidence-results.json'), JSON.stringify(results, null, 2))
fs.writeFileSync(path.join(outputRoot, 'route-evidence-summary.md'), summaryMarkdown(results))

const failures = results.filter((result) => !result.ok)
if (failures.length) {
  console.error(`A++ evidence capture completed with ${failures.length} failed routes`)
  process.exitCode = 1
} else {
  console.log(`A++ evidence capture passed (${results.length} routes captured)`)
  console.log(`A++ evidence saved to ${outputRoot}`)
}
