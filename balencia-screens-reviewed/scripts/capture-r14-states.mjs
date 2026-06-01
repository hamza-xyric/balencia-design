import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const repoRoot = path.resolve(process.cwd(), '..')
const appRoot = path.join(repoRoot, 'balencia-screens')
const appRequire = createRequire(path.join(appRoot, 'package.json'))
const { chromium } = appRequire('playwright')

const baseURL = process.env.A_PLUS_PLUS_BASE_URL || 'http://localhost:3000'
const outputDir = path.join(appRoot, 'output/a-plus-plus-review/R14')
const stateDir = path.join(outputDir, 'states')
fs.mkdirSync(stateDir, { recursive: true })

const routes = [
  { id: '46', name: 'Accountability', route: '/features/accountability', slug: '46-features-accountability' },
  { id: '47', name: 'Competitions', route: '/features/competitions', slug: '47-features-competitions' },
  { id: '48', name: 'Intelligence dashboard', route: '/features/intelligence', slug: '48-features-intelligence' },
  { id: '52', name: 'Stress management', route: '/features/stress', slug: '52-features-stress' },
  { id: '53', name: 'Breathing exercises', route: '/features/breathing', slug: '53-features-breathing' },
]

async function launchBrowser() {
  const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (fs.existsSync(chromePath)) {
    return chromium.launch({ executablePath: chromePath })
  }
  return chromium.launch()
}

async function phoneShot(page, name) {
  const file = path.join(stateDir, `${name}.png`)
  await page.locator('[data-testid="phone-frame"]').screenshot({ path: file })
  return path.relative(repoRoot, file)
}

async function routeShot(page, screen) {
  const phone = path.join(outputDir, `${screen.slug}-phone.png`)
  const full = path.join(outputDir, `${screen.slug}-full.png`)
  await page.locator('[data-testid="phone-frame"]').screenshot({ path: phone })
  await page.screenshot({ path: full })
  return { phone, full }
}

async function collectEvidence(page, screen, consoleErrors) {
  const shots = await routeShot(page, screen)
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
      return label.trim().replace(/\s+/g, ' ').slice(0, 120)
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

    const zoneRects = zones
      .map((element) => ({ name: element.dataset?.testid || element.getAttribute('data-testid') || element.tagName, rect: rectFor(element) }))
      .filter((zone) => zone.rect)
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
      text: (phoneElement?.innerText || document.body.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 1400),
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

  const result = {
    id: screen.id,
    number: screen.id,
    name: screen.name,
    route: screen.route,
    batch: 'R14',
    ok: true,
    url: new URL(screen.route, baseURL).toString(),
    capturedAt: new Date().toISOString(),
    screenshot: shots.phone,
    fullScreenshot: shots.full,
    consoleErrors: [...new Set(consoleErrors)],
    text: evaluated.text,
    controls: evaluated.controls,
    metrics: evaluated.metrics,
  }
  fs.writeFileSync(path.join(outputDir, `${screen.slug}-evidence.json`), JSON.stringify(result, null, 2))
  return result
}

async function go(page, route) {
  await page.goto(new URL(route, baseURL).toString(), { waitUntil: 'networkidle', timeout: 25000 })
  await page.waitForTimeout(300)
}

async function safeClick(locator) {
  await locator.click({ timeout: 5000 })
  await locator.page().waitForTimeout(250)
}

const browser = await launchBrowser()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const consoleErrors = []
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('pageerror', (error) => consoleErrors.push(error.message))

const initial = []
for (const screen of routes) {
  await go(page, screen.route)
  initial.push(await collectEvidence(page, screen, consoleErrors))
}

const interactions = {}

await go(page, '/features/accountability')
interactions.accountability = {}
await safeClick(page.getByRole('button', { name: 'Manage' }))
interactions.accountability.manageBeforeConsentText = await page.getByRole('dialog').innerText()
interactions.accountability.manageBeforeConsent = await phoneShot(page, '46-manage-before-consent')
await safeClick(page.getByRole('button', { name: 'Cancel' }))
await safeClick(page.getByRole('button', { name: 'Configure' }))
interactions.accountability.consentDialogText = await page.getByRole('dialog').innerText()
interactions.accountability.consentDialog = await phoneShot(page, '46-consent-dialog')
await safeClick(page.getByRole('button', { name: 'Save' }))
interactions.accountability.consentConfigured = await phoneShot(page, '46-consent-configured')
await safeClick(page.getByRole('tab', { name: 'Contracts' }))
interactions.accountability.contractsTab = await phoneShot(page, '46-contracts-tab')
await safeClick(page.getByRole('button', { name: 'Review contract' }))
interactions.accountability.contractDialogText = await page.getByRole('dialog').innerText()
interactions.accountability.contractDialog = await phoneShot(page, '46-contract-dialog')
await safeClick(page.getByRole('button', { name: 'Cancel' }))
await safeClick(page.getByRole('tab', { name: 'Triggers' }))
interactions.accountability.triggersTab = await phoneShot(page, '46-triggers-tab')
await safeClick(page.getByRole('button', { name: 'Configure trigger' }))
interactions.accountability.triggerDialogText = await page.getByRole('dialog').innerText()
interactions.accountability.triggerDialog = await phoneShot(page, '46-trigger-dialog')

await go(page, '/features/competitions')
interactions.competitions = {}
await safeClick(page.getByRole('button', { name: 'Active' }))
interactions.competitions.activeFilterText = await page.locator('[data-testid="phone-frame"]').innerText()
interactions.competitions.activeFilter = await phoneShot(page, '47-active-filter')
await safeClick(page.getByRole('button', { name: 'Join now' }))
interactions.competitions.joinDialogText = await page.getByRole('dialog').innerText()
interactions.competitions.joinDialog = await phoneShot(page, '47-join-dialog')
const joinPrivateBefore = await page.getByRole('dialog').innerText()
await safeClick(page.getByRole('button', { name: 'Join private' }))
const joinPrivateAfter = await page.getByRole('dialog').innerText()
interactions.competitions.joinPrivateChangedText = joinPrivateBefore !== joinPrivateAfter
interactions.competitions.joinPrivateAfterClick = await phoneShot(page, '47-join-private-after-click')
await safeClick(page.getByRole('button', { name: 'Remind me' }))
interactions.competitions.remindAfterClick = await phoneShot(page, '47-remind-after-click')
interactions.competitions.remindChangedText = joinPrivateAfter !== await page.getByRole('dialog').innerText()
await safeClick(page.getByRole('button', { name: 'Close' }))
await safeClick(page.getByRole('button', { name: 'My competitions (3)' }))
interactions.competitions.myCompetitionsText = await page.locator('[data-testid="phone-frame"]').innerText()
interactions.competitions.myCompetitions = await phoneShot(page, '47-my-competitions-filter')

await go(page, '/features/intelligence')
interactions.intelligence = {}
await safeClick(page.getByRole('button', { name: '14d' }))
interactions.intelligence.range14d = await phoneShot(page, '48-range-14d')
await safeClick(page.getByRole('button', { name: 'Dismiss' }).first())
interactions.intelligence.dismissedText = await page.locator('[data-testid="phone-frame"]').innerText()
interactions.intelligence.dismissed = await phoneShot(page, '48-dismiss-contradiction')
await safeClick(page.getByRole('button', { name: 'Resolve' }).first())
interactions.intelligence.resolveDialogText = await page.getByRole('dialog').innerText()
interactions.intelligence.resolveDialog = await phoneShot(page, '48-resolve-dialog')
await safeClick(page.getByRole('button', { name: 'Save resolution' }))
interactions.intelligence.resolutionSaved = await phoneShot(page, '48-resolution-saved')
await safeClick(page.getByRole('button', { name: 'More intelligence options' }))
interactions.intelligence.moreDialogText = await page.getByRole('dialog').innerText()
interactions.intelligence.moreDialog = await phoneShot(page, '48-more-dialog')
await safeClick(page.getByRole('button', { name: 'Close' }))
await page.getByText('Recent insights').scrollIntoViewIfNeeded()
await page.waitForTimeout(250)
interactions.intelligence.recentBefore = await phoneShot(page, '48-recent-insights-before-feedback')
const recentButton = page.locator('button[aria-label^="Mark Your sleep quality"]').first()
const recentBefore = await recentButton.getAttribute('aria-pressed')
await safeClick(recentButton)
const recentAfter = await recentButton.getAttribute('aria-pressed')
interactions.intelligence.recentInsightAriaPressedBefore = recentBefore
interactions.intelligence.recentInsightAriaPressedAfter = recentAfter
interactions.intelligence.recentAfter = await phoneShot(page, '48-recent-insights-after-feedback')

await go(page, '/features/stress')
interactions.stress = {}
await page.getByLabel('Stress level').evaluate((element) => {
  element.value = '8'
  element.dispatchEvent(new Event('input', { bubbles: true }))
  element.dispatchEvent(new Event('change', { bubbles: true }))
})
await safeClick(page.getByRole('button', { name: 'Conflict' }))
await page.getByLabel('Optional note').fill('Tight deadline before lunch')
interactions.stress.quickLogFilled = await phoneShot(page, '52-quick-log-filled')
await safeClick(page.getByRole('button', { name: 'Log stress' }))
interactions.stress.loggedText = await page.locator('[role="status"]').innerText()
interactions.stress.logged = await phoneShot(page, '52-logged-success')
await safeClick(page.getByRole('button', { name: 'Undo' }))
interactions.stress.undoText = await page.locator('[role="status"]').innerText()
interactions.stress.undo = await phoneShot(page, '52-undo')
await safeClick(page.getByRole('button', { name: 'Ask SIA' }))
interactions.stress.askSiaText = await page.locator('[role="status"]').innerText()
interactions.stress.askSia = await phoneShot(page, '52-ask-sia')
await safeClick(page.getByRole('button', { name: '14d' }))
interactions.stress.range14d = await phoneShot(page, '52-range-14d')
await safeClick(page.getByTestId('screen-bottom-action').getByRole('button', { name: 'Log' }))
interactions.stress.fabText = await page.locator('[role="status"]').innerText()
interactions.stress.fabLog = await phoneShot(page, '52-fab-log')

await go(page, '/features/breathing')
interactions.breathing = {}
const listBeforeFilter = await page.locator('[data-testid="phone-frame"]').innerText()
await safeClick(page.getByRole('button', { name: 'During stress', exact: true }))
const listAfterFilter = await page.locator('[data-testid="phone-frame"]').innerText()
interactions.breathing.duringStressFilterChangedList = listBeforeFilter !== listAfterFilter
interactions.breathing.duringStressFilter = await phoneShot(page, '53-during-stress-filter')
await safeClick(page.getByRole('button', { name: /Box breathing/ }))
interactions.breathing.activeHasTabBar = await page.locator('[data-testid="tab-bar"]').count()
interactions.breathing.activeSession = await phoneShot(page, '53-active-session')
await safeClick(page.getByRole('button', { name: 'Pause breathing session' }))
interactions.breathing.paused = await phoneShot(page, '53-paused-session')
await safeClick(page.getByRole('button', { name: '5 min' }).or(page.getByRole('button', { name: '3 min' })).last())
interactions.breathing.durationToggled = await phoneShot(page, '53-duration-toggled')
await safeClick(page.getByRole('button', { name: 'Complete and save' }))
interactions.breathing.completedText = await page.locator('[role="status"]').innerText()
interactions.breathing.completed = await phoneShot(page, '53-completed-saved')
interactions.breathing.postSessionDialogCount = await page.getByRole('dialog').count()

await browser.close()

const summary = {
  baseURL,
  capturedAt: new Date().toISOString(),
  consoleErrors: [...new Set(consoleErrors)],
  initialEvidence: initial.map((item) => ({
    id: item.id,
    route: item.route,
    screenshot: path.relative(repoRoot, item.screenshot),
    fullScreenshot: path.relative(repoRoot, item.fullScreenshot),
    smallTargets: item.metrics.smallTargets,
    overlaps: item.metrics.overlaps,
  })),
  interactions,
}

fs.writeFileSync(path.join(stateDir, 'r14-state-capture.json'), JSON.stringify(summary, null, 2))
console.log(`R14 state evidence saved to ${stateDir}`)
if (consoleErrors.length) {
  console.error([...new Set(consoleErrors)].join('\n'))
  process.exitCode = 1
}
