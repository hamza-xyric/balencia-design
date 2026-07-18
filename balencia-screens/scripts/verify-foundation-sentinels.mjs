import fs from 'node:fs'
import { chromium } from 'playwright'

const baseURL = process.argv[2] || 'http://localhost:3001'
const outPath = process.argv[3]
const chromePath = process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

const browser = await chromium.launch(fs.existsSync(chromePath) ? { executablePath: chromePath } : {})
let motionContext
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
})
const page = await context.newPage()
const consoleErrors = []
const pageErrors = []
page.on('console', message => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('pageerror', error => pageErrors.push(String(error)))

const checks = []
function pass(name, evidence) {
  checks.push({ name, status: 'pass', evidence })
}

async function open(id, query = '') {
  await page.goto(`${baseURL}/screens/${id}${query}`, { waitUntil: 'networkidle' })
  assert(await page.locator('[data-testid="phone-frame"]').count() === 1, `${id}: phone frame missing`)
}

try {
  await open('98')
  const fixtureOrbs = page.locator('[data-cia-state]')
  assert(await fixtureOrbs.count() === 15, '98: expected the 5-state × 3-size CIA grid')
  for (const state of ['idle', 'listening', 'thinking', 'speaking', 'success']) {
    const stateOrbs = page.locator(`[data-cia-state="${state}"]`)
    assert(await stateOrbs.count() === 3, `98: ${state} must render at 24, 32 and 64px`)
  }
  const tiers = await fixtureOrbs.evaluateAll(nodes => nodes.map(node => ({
    state: node.getAttribute('data-cia-state'),
    size: node.getBoundingClientRect().width,
    tier: node.getAttribute('data-cia-size'),
    label: node.getAttribute('aria-label'),
  })))
  for (const fixture of tiers) {
    const expectedTier = fixture.size < 32 ? 'compact' : fixture.size < 64 ? 'standard' : 'hero'
    assert(fixture.tier === expectedTier, `98: ${fixture.state} ${fixture.size}px has wrong size tier`)
    assert(fixture.label === `CIA presence, ${fixture.state}`, `98: ${fixture.state} accessible name mismatch`)
  }
  assert(await page.locator('[data-optical-size]').count() === 36, '98: expected six signature concepts × three sizes × two states')
  const runningAnimations = await fixtureOrbs.locator('svg *').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).animationName !== 'none').length)
  const runningTransitions = await fixtureOrbs.locator('svg *').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).transitionDuration
    .split(',')
    .some(duration => duration.trim() !== '0s')).length)
  assert(runningAnimations === 0, '98: reduced motion must stop every CIA fixture animation')
  assert(runningTransitions === 0, '98: reduced motion must stop every CIA fixture transition')
  pass('CIA state/size/reduced-motion grid', { fixtures: tiers.length, signatureVariants: 36, runningAnimations, runningTransitions })

  const primary = page.getByRole('button', { name: 'Primary action' })
  await primary.hover()
  assert(await primary.evaluate(node => getComputedStyle(node).backgroundColor) === 'rgb(170, 58, 8)', '98: primary hover surface must be #AA3A08')
  await primary.focus()
  assert(await primary.evaluate(node => getComputedStyle(node).boxShadow) !== 'none', '98: primary focus ring missing')
  const reducedTransition = await primary.evaluate(node => getComputedStyle(node).transitionDuration)
  assert(reducedTransition.split(',').every(duration => duration.trim() === '0s'), '98: reduced motion must remove action transitions')
  pass('Action hover/focus/reduced motion', { hover: '#AA3A08', focus: 'paper gap + orange ring', transitionDuration: reducedTransition })

  motionContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'no-preference',
  })
  const motionPage = await motionContext.newPage()
  motionPage.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  motionPage.on('pageerror', error => pageErrors.push(String(error)))
  await motionPage.goto(`${baseURL}/screens/11`, { waitUntil: 'networkidle' })
  const heroOrb = motionPage.locator('[data-cia-state]').first()
  const activeBeforeHide = await heroOrb.locator('svg *').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).animationName !== 'none').length)
  assert(activeBeforeHide > 0, '11: non-reduced CIA orb must have an active animation before visibility pause')
  await motionPage.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await motionPage.waitForFunction(() => document.querySelector('[data-cia-state]')?.getAttribute('data-cia-paused') === 'true')
  assert(await heroOrb.getAttribute('data-cia-paused') === 'true', '11: hidden page must pause the CIA orb')
  const pausedAnimations = await heroOrb.locator('svg *').evaluateAll(nodes => nodes
    .filter(node => getComputedStyle(node).animationName !== 'none')
    .every(node => getComputedStyle(node).animationPlayState === 'paused'))
  assert(pausedAnimations, '11: hidden page must pause computed CIA animation playback')
  await motionPage.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await motionPage.waitForFunction(() => document.querySelector('[data-cia-state]')?.getAttribute('data-cia-paused') !== 'true')
  const resumedAnimations = await heroOrb.locator('svg *').evaluateAll(nodes => nodes
    .filter(node => getComputedStyle(node).animationName !== 'none')
    .every(node => getComputedStyle(node).animationPlayState === 'running'))
  assert(resumedAnimations, '11: visible page must resume computed CIA animation playback')
  pass('Page Visibility pause/resume', { activeBeforeHide, dataCiaPaused: true, computedPaused: true, resumed: true })
  await motionContext.close()
  motionContext = undefined

  await open('12')
  const quickLog = page.getByRole('link', { name: 'Quick log' })
  await quickLog.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Quick log' })
  await dialog.waitFor()
  assert(await page.getByRole('button', { name: 'Close quick log' }).evaluate(node => document.activeElement === node), '12: action sheet must receive initial focus')
  await page.keyboard.press('Shift+Tab')
  assert(await page.getByRole('button', { name: 'Save', exact: true }).evaluate(node => document.activeElement === node), '12: reverse Tab must wrap to Save')
  await page.keyboard.press('Tab')
  assert(await page.getByRole('button', { name: 'Close quick log' }).evaluate(node => document.activeElement === node), '12: forward Tab must wrap to Close')
  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'hidden' })
  assert(await quickLog.evaluate(node => document.activeElement === node), '12: closing the action sheet must restore focus')
  pass('Quick action modal keyboard contract', { initialFocus: 'Close', trap: true, escape: true, focusRestored: true })

  await open('45')
  const energySlider = page.getByRole('slider', { name: 'Energy' })
  const energySliderRoot = energySlider.locator('..')
  await energySlider.focus()
  assert((await energySlider.boundingBox())?.height >= 44, '45: Energy slider must expose a 44px target')
  assert(await energySliderRoot.locator('[data-slider-focus-ring]').evaluate(node => getComputedStyle(node).boxShadow) !== 'none', '45: Energy slider keyboard focus must be visible')
  const initialFillRatio = await energySliderRoot.evaluate(node => {
    const fill = node.querySelector('[data-slider-fill]')
    return fill.getBoundingClientRect().width / node.getBoundingClientRect().width
  })
  assert(Math.abs(initialFillRatio - (6 / 9)) < 0.02, '45: visual slider fill must map the 1–10 range correctly')
  await energySlider.press('Home')
  assert(await energySlider.inputValue() === '1', '45: Home must move Energy to its native minimum')
  const minimumFillWidth = await energySliderRoot.locator('[data-slider-fill]').evaluate(node => node.getBoundingClientRect().width)
  assert(minimumFillWidth <= 1, '45: minimum slider value must render at the start of the track')
  pass('Daily check-in native slider', { targetHeight: 44, visibleFocus: true, initialFillRatio, minimumValue: 1, minimumFillWidth })

  const lifePowerRoutes = ['12', '13', '16', '19']
  for (const id of lifePowerRoutes) {
    await open(id)
    assert(await page.getByRole('img', { name: /Life Power 487\. 10 active domains\./ }).count() === 1, `${id}: Life Power summary mismatch`)
  }
  pass('Life Power sentinels', { routes: lifePowerRoutes, score: 487, domains: 10 })

  await open('43')
  assert(await page.locator('[data-testid="phone-frame"] .hifi-action-primary').count() === 1, '43: paywall must show exactly one primary action')
  assert(await page.getByRole('button', { name: 'Maybe later' }).count() === 1, '43: equal exit missing')
  pass('Paywall action ethics', { primaryActions: 1, equalExit: true })

  await open('09')
  const privacyControls = ['Source', 'Retention', 'Export', 'Revoke', 'Delete']
  for (const label of privacyControls) {
    const control = page.getByRole('link', { name: label, exact: true })
    assert(await control.count() === 1, `09: default ConsentRail must retain ${label}`)
    assert((await control.getAttribute('href'))?.startsWith('/screens/84?control='), `09: ${label} must reach data controls`)
  }
  pass('ConsentRail privacy-safe default', { route: '09', controls: privacyControls })

  assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.join(' | ')}`)
  assert(pageErrors.length === 0, `Page errors: ${pageErrors.join(' | ')}`)

  const report = {
    auditedAt: new Date().toISOString(),
    baseURL,
    reducedMotion: 'reduce',
    checks,
    consoleErrors,
    pageErrors,
    status: 'pass',
  }
  if (outPath) fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify(report, null, 2))
} catch (error) {
  const report = {
    auditedAt: new Date().toISOString(),
    baseURL,
    reducedMotion: 'reduce',
    checks,
    consoleErrors,
    pageErrors,
    status: 'fail',
    error: error instanceof Error ? error.stack || error.message : String(error),
  }
  if (outPath) fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`)
  console.error(JSON.stringify(report, null, 2))
  process.exitCode = 1
} finally {
  if (motionContext) await motionContext.close()
  await browser.close()
}
